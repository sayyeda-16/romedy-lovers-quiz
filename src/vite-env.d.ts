/// <reference types="vite/client" />

// We are defining the structure of the JSON here directly,
// instead of importing from a runtime source file (src/types.ts).
// This avoids potential circular dependency issues and is standard for .d.ts files.
declare module '*.json' {
  const value: {
    quotes: {
      quote: string;
      author?: string;
      speaker?: string;
      source?: string;
      type: 'song' | 'book' | 'movie' | 'quote';
    }[];
  };
  export default value;
}