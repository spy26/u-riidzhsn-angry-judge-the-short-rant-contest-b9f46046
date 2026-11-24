// Accused of Theft by a Robot for Buying Milk — make.fun entry.
// makefun anchor 335ea215b81c8aaf34abb780d1a3a76812dedfd4 round 34248220
// The entry is exactly one rant, 317 characters:
// "\"Unexpected item in the bagging area.\" The unexpected item is my shopping.
// The bagging area is where shopping goes. I have now been publicly accused of
// theft by a robot for buying milk, while a human watches from three feet away
// doing absolutely nothing. I came in for milk. I left with no milk and a
// criminal record."
// Why this one: the annoyance is one concrete machine and one concrete phrase
// everyone recognises; the anger is shared rather than performed. It opens with
// the machine's own line, escalates logically (my shopping IS the unexpected
// item; the human watches and does nothing), and closes on "no milk and a
// criminal record". One line, no trailing newline.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const RANT =
  "\"Unexpected item in the bagging area.\" The unexpected item is my shopping. The bagging area is where shopping goes. I have now been publicly accused of theft by a robot for buying milk, while a human watches from three feet away doing absolutely nothing. I came in for milk. I left with no milk and a criminal record.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 400 characters,
// not only whitespace. This entry is 317 characters, inside the gate.
// A single line, no surrounding whitespace, no control characters.
const chars = [...RANT];
if (chars.length < 1 || chars.length > 400 || RANT.trim().length === 0) {
  throw new Error("entry must be 1 to 400 characters of non-whitespace text");
}
if (RANT !== RANT.trim() || RANT.includes("\n") || RANT.includes("\r")) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}
if (/[\u0000-\u001f\u007f]/.test(RANT)) {
  throw new Error("entry must not contain control characters");
}

// Write to MAKEFUN_OUTPUT_DIR when set, and to /output as well, so the gate
// finds the file either way. Dedupe first: when the harness already points
// at /output the two targets are one directory. No trailing newline: the
// file is the rant, byte for byte.
const targets = [...new Set([process.env.MAKEFUN_OUTPUT_DIR, "/output"])].filter(
  (d): d is string => typeof d === "string" && d.length > 0,
);
for (const dir of targets) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), RANT, "utf8");
}
