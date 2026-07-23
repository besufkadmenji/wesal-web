import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { RemoveTypenameFromVariablesLink } from "@apollo/client/link/remove-typename";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import Cookies from "js-cookie";

const defaultOptions: ApolloClient.DefaultOptions.Input = {
  watchQuery: { fetchPolicy: "no-cache", errorPolicy: "all" },
  query: { fetchPolicy: "no-cache", errorPolicy: "all" },
  mutate: { errorPolicy: "all" },
};

let browserClient: ApolloClient | null = null;

const socketUrl = () => {
  if (process.env.NEXT_PUBLIC_SOCKET) return process.env.NEXT_PUBLIC_SOCKET;
  if (typeof window === "undefined") return "ws://localhost/graphql";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    const parsed = new URL(apiUrl, window.location.origin);
    parsed.protocol = parsed.protocol === "https:" ? "wss:" : "ws:";
    parsed.pathname = `${parsed.pathname.replace(/\/$/, "")}/graphql`;
    return parsed.toString();
  }
  const parsed = new URL("/api/proxy/graphql", window.location.origin);
  parsed.protocol = parsed.protocol === "https:" ? "wss:" : "ws:";
  return parsed.toString();
};

const createApolloClient = (token?: string, url?: string) => {
  const isServer = typeof window === "undefined";
  const httpLink = new HttpLink({
    // Browser traffic must stay behind the authenticated Next proxy. The
    // upstream URL is server-only and is used by middleware/server clients.
    uri: isServer
      ? url ?? process.env.GRAPHQL_API_URL ?? "/api/proxy/graphql"
      : "/api/proxy/graphql",
  });
  const authLink = new SetContextLink(({ headers }) => {
    const browserToken =
      typeof window !== "undefined" ? Cookies.get("token") : undefined;
    const language =
      typeof window !== "undefined" ? Cookies.get("lang") || "ar" : "ar";
    const effectiveToken = token ?? browserToken;
    return {
      headers: {
        ...headers,
        ...(effectiveToken
          ? { authorization: `Bearer ${effectiveToken}` }
          : {}),
        "accept-language": language,
      },
    };
  });
  const httpChain = ApolloLink.from([
    new RemoveTypenameFromVariablesLink(),
    authLink,
    httpLink,
  ]);

  const link =
    isServer
      ? httpChain
      : ApolloLink.split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === "OperationDefinition" &&
              definition.operation === "subscription"
            );
          },
          new GraphQLWsLink(
            createClient({
              url: socketUrl,
              lazy: true,
              keepAlive: 15_000,
              retryAttempts: Infinity,
              shouldRetry: () => true,
              retryWait: async (retries) => {
                const delay = Math.min(1_000 * 2 ** retries, 30_000);
                await new Promise((resolve) =>
                  window.setTimeout(resolve, delay + Math.random() * 500),
                );
              },
              connectionParams: () => {
                const currentToken = Cookies.get("token");
                const language = Cookies.get("lang") || "ar";
                return {
                  ...(currentToken
                    ? { Authorization: `Bearer ${currentToken}` }
                    : {}),
                  "accept-language": language,
                };
              },
              on: {
                connected: () => {
                  window.dispatchEvent(
                    new Event("wesal:graphql-reconnected"),
                  );
                },
              },
            }),
          ),
          httpChain,
        );

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    defaultOptions,
    ssrMode: isServer,
    queryDeduplication: true,
  });
};

/**
 * Browser calls share one HTTP/WebSocket client. Supplying a token or URL
 * always creates an isolated server client for Next proxy/middleware usage.
 */
const client = (token?: string, url?: string) => {
  if (typeof window === "undefined" || token || url) {
    return createApolloClient(token, url);
  }
  browserClient ??= createApolloClient();
  return browserClient;
};

export default client;
