import { readFileSync } from "node:fs";
import path from "node:path";
import ClientInit from "./client-init";

const source = readFileSync(path.join(process.cwd(), "src", "home.html"), "utf8");

const bodyMarkup =
  source
    .match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]
    ?.replace(
      /<script[^>]*src="\/src\/main\.js"[^>]*><\/script>/i,
      "",
    ) ?? "";

export default function HomePage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: bodyMarkup }} />
      <ClientInit />
    </>
  );
}
