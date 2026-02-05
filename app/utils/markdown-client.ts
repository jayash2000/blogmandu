import MarkdownIt from "markdown-it";
import DOMPurify from "isomorphic-dompurify";

const md = new MarkdownIt({
  html: false,
  linkify: true,
  // typographer: true,
  breaks: true,
});

export const parseMarkdownClient = async (content: string) => {
  const raw = md.render(content);
  return DOMPurify.sanitize(raw);
};
