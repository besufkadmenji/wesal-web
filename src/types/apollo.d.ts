import "@apollo/client";

declare module "@apollo/client" {
  export namespace ApolloClient {
    export namespace DeclareDefaultOptions {
      interface WatchQuery {
        fetchPolicy?: "no-cache";
        errorPolicy?: "all";
      }

      interface Query {
        fetchPolicy?: "no-cache";
        errorPolicy?: "all";
      }

      interface Mutate {
        errorPolicy?: "all";
      }
    }
  }
}
