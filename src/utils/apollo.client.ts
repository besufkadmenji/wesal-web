import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import Cookies from "js-cookie";

const client = (token?: string, url?: string) => {
  const httpLink = new HttpLink({
    uri: url ?? "/api/proxy/graphql",
  });

  const authLink = new SetContextLink(({ headers }) => {
    console.log("Setting auth headers", Cookies.get("lang"));
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${
          token ?? (typeof window !== "undefined" ? Cookies.get("token") : "")
        }`,
        "accept-language": Cookies.get("lang") || "ar",
      },
    };
  });

  const wsLink =
    typeof window !== "undefined"
      ? new GraphQLWsLink(
          createClient({
            url: process.env.NEXT_PUBLIC_SOCKET ?? "",
          }),
        )
      : authLink.concat(httpLink);

  const defaultOptions: ApolloClient.DefaultOptions = {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  };

  const splitLink = ApolloLink.split(
    ({ query }) => {
      const definition = getMainDefinition(query);

      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    authLink.concat(httpLink),
  );

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
    ssrMode: true,
    queryDeduplication: false,
  });
};

export default client;
