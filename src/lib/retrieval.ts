import { knowledgeBase } from "./knowledge";
import type { Citation, KnowledgeDoc } from "./types";

const STOP = new Set([
  "the","a","an","and","or","to","of","in","on","for","with","is","are","be","by",
  "as","at","that","this","it","from","should","can","while","only"
]);

function tokens(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function lexicalScore(query: string, doc: KnowledgeDoc) {
  const q = tokens(query);
  const d = tokens(doc.title + " " + doc.category + " " + doc.content);
  const freq = new Map<string, number>();
  d.forEach((t) => freq.set(t, (freq.get(t) ?? 0) + 1));
  const matched = q.reduce((acc, t) => acc + Math.min(freq.get(t) ?? 0, 3), 0);
  return q.length ? matched / q.length : 0;
}

function hashedVector(text: string, dims = 48) {
  const vec = new Array<number>(dims).fill(0);
  for (const token of tokens(text)) {
    let h = 2166136261;
    for (let i = 0; i < token.length; i++) {
      h ^= token.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const idx = Math.abs(h) % dims;
    vec[idx] += 1;
  }
  const norm = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1;
  return vec.map((v) => v / norm);
}

function cosine(a: number[], b: number[]) {
  return a.reduce((sum, value, i) => sum + value * b[i], 0);
}

export function hybridSearch(query: string, limit = 3): Citation[] {
  const qVec = hashedVector(query);
  return knowledgeBase
    .map((doc) => {
      const lex = lexicalScore(query, doc);
      const sem = cosine(qVec, hashedVector(doc.title + " " + doc.content));
      const score = Math.min(0.99, Math.max(0, lex * 0.62 + sem * 0.38));
      return {
        docId: doc.id,
        title: doc.title,
        snippet: doc.content.slice(0, 180) + (doc.content.length > 180 ? "…" : ""),
        score,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function getKnowledgeBase() {
  return knowledgeBase;
}
