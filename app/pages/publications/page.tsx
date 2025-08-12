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
    <div style={{ marginTop: "2vh" }}>
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">{title}</h1>
      <p className="mb-4 text-lg text-neutral-700">{description}</p>
      <section className="mb-4">
        <h2 className="text-xl font-bold mb-4">Research Interests</h2>
        <ul className="list-disc pl-6">
          {research_areas && research_areas.map((area, idx) => (
            <li key={idx} className="mb-2 text-neutral-800">{area.area}</li>
          ))}
        </ul>
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Peer-Reviewed Publications</h2>
        <ul>
          {publications && publications.map((item) => (
            <li key={item.link} className="mb-6">
              <a href={item.link} className="text-lg font-semibold hover:underline" target="_blank" rel="noopener noreferrer">{item.title} <svg style={{ display: "inline" }} xmlns="http://www.w3.org/2000/svg" fill="#000000" width="16px" height="16px" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="link-2"><rect width="24" height="24" opacity="0"/><path d="M13.29 9.29l-4 4a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4-4a1 1 0 0 0-1.42-1.42z"/><path d="M12.28 17.4L11 18.67a4.2 4.2 0 0 1-5.58.4 4 4 0 0 1-.27-5.93l1.42-1.43a1 1 0 0 0 0-1.42 1 1 0 0 0-1.42 0l-1.27 1.28a6.15 6.15 0 0 0-.67 8.07 6.06 6.06 0 0 0 9.07.6l1.42-1.42a1 1 0 0 0-1.42-1.42z"/><path d="M19.66 3.22a6.18 6.18 0 0 0-8.13.68L10.45 5a1.09 1.09 0 0 0-.17 1.61 1 1 0 0 0 1.42 0L13 5.3a4.17 4.17 0 0 1 5.57-.4 4 4 0 0 1 .27 5.95l-1.42 1.43a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l1.42-1.42a6.06 6.06 0 0 0-.6-9.06z"/></g></g></svg></a>
              <div className="text-sm text-neutral-600">{item.date}</div>
              <div className="text-neutral-800">{item.description}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
} 