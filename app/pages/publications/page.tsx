import { Metadata } from "next";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Publications",
};

type PublicationItem = {
  title: string;
  date: string;
  link: string;
  description: string;
};
type ResearchArea = {
  area: string;
};
type PublicationsContent = {
  title: string;
  description: string;
  publications: PublicationItem[];
  research_areas: ResearchArea[];
};

function getPublicationsContent(): PublicationsContent {
  const filePath = path.join(process.cwd(), "content/publications.md");
  const raw = fs.readFileSync(filePath, "utf-8");
  const match = /^---([\s\S]*?)---/.exec(raw);
  let content: Partial<PublicationsContent> = {};
  if (match) {
    const frontmatter = match[1];
    const yaml = require("js-yaml");
    Object.assign(content, yaml.load(frontmatter));
  }
  return content as PublicationsContent;
}

export default function PublicationsPage() {
  const { title, description, publications, research_areas } = getPublicationsContent();
  return (
    <main className="">
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">{title}</h1>
      <p className="mb-4 text-lg text-neutral-700 dark:text-neutral-300">{description}</p>
      <section className="mb-4">
        <h2 className="text-xl font-bold mb-4">Research Interests</h2>
        <ul className="list-disc pl-6">
          {research_areas && research_areas.map((area, idx) => (
            <li key={idx} className="mb-2 text-neutral-800 dark:text-neutral-200">{area.area}</li>
          ))}
        </ul>
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Peer-Reviewed Publications</h2>
        <ul>
          {publications && publications.map((item) => (
            <li key={item.link} className="mb-6">
              <a href={item.link} className="text-lg font-semibold hover:underline" target="_blank" rel="noopener noreferrer">{item.title}</a>
              <div className="text-sm text-neutral-600">{item.date}</div>
              <div className="text-neutral-800 dark:text-neutral-200">{item.description}</div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
} 