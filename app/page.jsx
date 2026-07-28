import source from "../index.html?raw";
import ClientInit from "./client-init";

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