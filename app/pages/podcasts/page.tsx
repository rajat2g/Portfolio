import fs from "fs";
import path from "path";
import yaml from "js-yaml";

interface Appearance {
  title: string;
  date: string;
  link: string;
  host: string;
  description: string;
}
interface Topic {
  topic: string;
  description: string;
}
interface Format {
  format: string;
  description: string;
}
interface Inquiries {
  instructions: string;
  email: string;
}
interface PodcastsContent {
  title: string;
  description: string;
  appearances: Appearance[];
  topics: Topic[];
  formats: Format[];
  inquiries: Inquiries;
}

export default function PodcastsPage() {
  const filePath = path.join(process.cwd(), "content", "podcasts.md");
  const raw = fs.readFileSync(filePath, "utf-8");
  const match = /^---([\s\S]*?)---/.exec(raw);
  let content: PodcastsContent = {
    title: "",
    description: "",
    appearances: [],
    topics: [],
    formats: [],
    inquiries: { instructions: "", email: "" },
  };
  if (match) {
    const parsed = yaml.load(match[1]);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      content = { ...content, ...parsed };
    }
  }
  const { title, description, appearances, topics, formats, inquiries } = content;
  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">{title}</h1>
      <p className="mb-8 text-neutral-700 dark:text-neutral-300">{description}</p>
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Recent Appearances</h2>
        <ul>
          {appearances && appearances.map((item, idx) => (
            <li key={idx} className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                <a href={item.link} className="text-lg font-semibold hover:underline" target="_blank" rel="noopener noreferrer">{item.title}</a>
                <span className="text-sm text-neutral-500">{item.date}</span>
              </div>
              <div className="text-sm text-neutral-600">Host: {item.host}</div>
              <div className="text-neutral-800 dark:text-neutral-200">{item.description}</div>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Speaking Topics</h2>
        <ul>
          {topics && topics.map((item, idx) => (
            <li key={idx} className="mb-2">
              <span className="font-semibold">{item.topic}:</span> {item.description}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Media Formats</h2>
        <ul>
          {formats && formats.map((item, idx) => (
            <li key={idx} className="mb-2">
              <span className="font-semibold">{item.format}:</span> {item.description}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-4">Speaking Inquiries</h2>
        <div className="mb-2 text-neutral-800 dark:text-neutral-200 whitespace-pre-line">{inquiries?.instructions}</div>
        {inquiries?.email && (
          <a href={`mailto:${inquiries.email}`} className="text-link-primary hover:text-link-hover transition-colors">{inquiries.email}</a>
        )}
      </section>
    </main>
  );
} 