import MarkdownIt from "markdown-it";
import Shiki from "@shikijs/markdown-it";
import { codeToHtml } from "shiki";
import DOMPurify from "isomorphic-dompurify";

export async function parseMarkdown(content: string): Promise<string> {
  const md = new MarkdownIt();

  md.use(
    await Shiki({
      themes: {
        light: "material-theme-lighter",
        dark: "material-theme-darker",
      },
    }),
  );

  const raw = md.render(content);

  return DOMPurify.sanitize(raw);
}
