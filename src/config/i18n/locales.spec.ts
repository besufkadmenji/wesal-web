import ar from "@/config/i18n/locales/ar.json";
import en from "@/config/i18n/locales/en.json";
import { describe, expect, it } from "vitest";

/**
 * S4-48: the Dictionary type comes from en.json, so a key missing from
 * ar.json still compiles and renders blank in Arabic. Keep both in step.
 */
type Tree = { [key: string]: unknown };

const flatten = (tree: Tree, prefix = ""): Map<string, unknown> => {
  const out = new Map<string, unknown>();
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flatten(value as Tree, path).forEach((leaf, leafPath) =>
        out.set(leafPath, leaf),
      );
    } else {
      out.set(path, value);
    }
  }
  return out;
};

const tokens = (value: unknown) =>
  typeof value === "string" ? (value.match(/\{\{?\w+\}?\}/g) ?? []).sort() : [];

const arabic = flatten(ar as Tree);
const english = flatten(en as Tree);

describe("locale files", () => {
  it("have the same keys in Arabic and English", () => {
    const onlyArabic = [...arabic.keys()].filter((key) => !english.has(key));
    const onlyEnglish = [...english.keys()].filter((key) => !arabic.has(key));
    expect({ onlyArabic, onlyEnglish }).toEqual({
      onlyArabic: [],
      onlyEnglish: [],
    });
  });

  it("use the same value types and placeholders", () => {
    const mismatched = [...english.keys()].filter((key) => {
      const a = arabic.get(key);
      const e = english.get(key);
      return (
        Array.isArray(a) !== Array.isArray(e) ||
        typeof a !== typeof e ||
        tokens(a).join() !== tokens(e).join()
      );
    });
    expect(mismatched).toEqual([]);
  });

  it("never leave a string empty in only one language", () => {
    const halfEmpty = [...english.keys()].filter(
      (key) =>
        arabic.has(key) &&
        (english.get(key) === "") !== (arabic.get(key) === ""),
    );
    expect(halfEmpty).toEqual([]);
  });
});
