import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const graphqlPath = path.join(root, "src/gql/graphql.ts");
const schemaPath = path.join(root, "src/gql/schema.ts");

const MARKER_START = "// <schema-object-types>";
const MARKER_END = "// </schema-object-types>";

const graphql = fs.readFileSync(graphqlPath, "utf8");
const schema = fs.readFileSync(schemaPath, "utf8");

const existing = new Set(
  [...graphql.matchAll(/^export (?:type |enum |const )?(\w+)/gm)].map(
    (match) => match[1],
  ),
);

const schemaTypeNames = [
  ...schema.matchAll(/^export type (\w+)(?:<[^>]*>)? =/gm),
].map((match) => match[1]);

const skip = new Set([
  "Maybe",
  "InputMaybe",
  "Exact",
  "MakeOptional",
  "MakeMaybe",
  "MakeEmpty",
  "Incremental",
  "Scalars",
  "Query",
  "Mutation",
  "Subscription",
]);

// Only re-export missing object/input types. Enums come from client-preset
// via enumType: 'native' and must not be rewritten by this hook.
const missing = [...new Set(schemaTypeNames)].filter(
  (name) => !existing.has(name) && !skip.has(name),
);

const withoutPrevious = graphql.includes(MARKER_START)
  ? graphql.slice(0, graphql.indexOf(MARKER_START)).trimEnd() + "\n"
  : graphql.endsWith("\n")
    ? graphql
    : `${graphql}\n`;

if (missing.length === 0) {
  fs.writeFileSync(graphqlPath, withoutPrevious);
  console.log("No missing schema object types to re-export.");
  process.exit(0);
}

const block = `${MARKER_START}
// client-preset v6+ omits schema object types; re-export them for app imports.
export type {
  ${missing.join(",\n  ")},
} from './schema';
${MARKER_END}
`;

fs.writeFileSync(graphqlPath, `${withoutPrevious}\n${block}`);
console.log(`Re-exported ${missing.length} schema object types into graphql.ts`);
