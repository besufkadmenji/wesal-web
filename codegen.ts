import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema:
    process.env.GRAPHQL_SCHEMA_URL ??
    "https://wesal-api.testing3000.cloud/graphql",
  documents: ["src/**/*.ts", "!src/gql/**"],
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
      config: {
        skipTypename: true,
        // Runtime enums so app code can use ContractSignatureType.CustomerAcceptance, etc.
        enumType: "native",
      },
    },
    // client-preset v6 no longer emits schema object types (Provider, User, …).
    // Generate them separately and re-export the ones apps still import.
    "src/gql/schema.ts": {
      plugins: ["typescript"],
      config: {
        skipTypename: true,
        enumType: "native",
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
  hooks: {
    afterAllFileWrite: ["node ./scripts/reexport-missing-schema-types.mjs"],
  },
};

export default config;