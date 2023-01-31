import fs from "fs";
import path from "path";
import matter from "gray-matter";

import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

import rehypeHighlight from "rehype-highlight";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkToc from "remark-toc";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";

const postsDirectory = path.join(process.cwd(), "docs");

type PostHeader = { date: string; title?: string };

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as PostHeader),
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export type PostData = {
  id: string;
  contentHtml: string;
} & Record<string, any>;

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  let contentHtml = "";
  try {
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkFrontmatter)
      .use(remarkToc)
      .use(remarkRehype)
      .use(rehypeDocument, { title: "Contents" })
      .use(rehypeFormat)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(matterResult.content);

    contentHtml = processedContent.value.toString();
  } catch (e) {
    console.log("render markdown Error:", e);
    contentHtml = "<h1>render Markdown Error</h1>";
  }

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
