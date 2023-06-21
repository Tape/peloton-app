import { parse } from "papaparse";

export type ParsingComplete = (arg0: string[][]) => void;

export const parseCsv = (file: File, onComplete: ParsingComplete) => {
  parse<string[]>(file, {
    complete(results) {
      onComplete(results.data.slice(1));
    },
  });
};
