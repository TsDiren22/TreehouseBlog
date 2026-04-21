import { Fragment } from "react";

const KEYWORDS = [
  "const","let","var","function","return","if","else","for","while",
  "import","from","export","default","class","new","async","await",
  "true","false","null","undefined","type","interface","this","of",
  "in","as","extends","implements","try","catch","throw","break","continue",
];

const KW_RE = `\\b(?:${KEYWORDS.join("|")})\\b`;

// Priority-ordered alternation; first matching branch wins at each position.
const TOKEN_RE = new RegExp(
  [
    "(\\/\\/[^\\n]*)",
    "(\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*'|`(?:\\\\.|[^`\\\\])*`)",
    `(${KW_RE})`,
    "(\\b\\d+(?:\\.\\d+)?\\b)",
    "([a-zA-Z_$][\\w$]*(?=\\s*\\())",
    "([a-zA-Z_$][\\w$]*)",
  ].join("|"),
  "g"
);

type Tok =
  | { kind: "text"; value: string }
  | { kind: "com" | "str" | "kw" | "num" | "fn" | "var"; value: string };

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;

  while ((m = TOKEN_RE.exec(src)) !== null) {
    if (m.index > last) {
      out.push({ kind: "text", value: src.slice(last, m.index) });
    }
    const kind: Tok["kind"] =
      m[1] ? "com" :
      m[2] ? "str" :
      m[3] ? "kw"  :
      m[4] ? "num" :
      m[5] ? "fn"  : "var";
    out.push({ kind, value: m[0] });
    last = TOKEN_RE.lastIndex;
  }
  if (last < src.length) out.push({ kind: "text", value: src.slice(last) });
  return out;
}

type Props = {
  code: string;
  filename?: string;
  lang?: string;
};

export function CodeBlock({
  code,
  filename = "treehouse.ts",
  lang = "typescript",
}: Props) {
  const tokens = tokenize(code.trim());

  return (
    <figure className="earth-code">
      <figcaption className="earth-head">
        <span className="dot" style={{ background: "#C17B5E" }} />
        <span className="dot" style={{ background: "#8AA581" }} />
        <span className="dot" style={{ background: "#E2B86C" }} />
        <span className="ml-2">{filename}</span>
        <span className="ml-auto opacity-70">{lang}</span>
      </figcaption>

      <pre>
        <code>
          {tokens.map((t, i) =>
            t.kind === "text" ? (
              <Fragment key={i}>{t.value}</Fragment>
            ) : (
              <span key={i} className={`tok tok-${t.kind}`}>
                {t.value}
              </span>
            )
          )}
        </code>
      </pre>
    </figure>
  );
}

export default CodeBlock;
