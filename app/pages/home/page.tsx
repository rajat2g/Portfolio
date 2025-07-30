export const dynamic = "force-dynamic";
import fs from 'fs';
import path from 'path';

// Type definitions

type WritingItem = {
  title: string;
  date: string;
  link: string;
  description: string;
};
type SpeakingItem = WritingItem;
type PublicationItem = WritingItem;
type Contact = {
  email: string;
  twitter: string;
  linkedin: string;
};
type HomeContent = {
  headline: string;
  description: string;
  writing: WritingItem[];
  speaking: SpeakingItem[];
  publications: PublicationItem[];
  research: string;
  contact: Contact;
};

function getHomeContent(): HomeContent {
  const filePath = path.join(process.cwd(), 'app', 'content', 'home.md');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const match = /^---([\s\S]*?)---/.exec(raw);
  let content: Partial<HomeContent> = {};
  if (match) {
    const frontmatter = match[1];
    // Use a YAML parser for robust parsing
    const yaml = require('js-yaml');
    Object.assign(content, yaml.load(frontmatter));
  }
  return content as HomeContent;
}

export default function Home() {
  const { headline, description, writing, speaking, publications, research, contact } = getHomeContent();
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">{headline}</h1>
      <p className="mb-4">{description}</p>
      <div className="my-8 grid gap-16">
        <div>
          <h2 className="text-xl font-bold mb-4">📝 Recent Writing</h2>
          <ul>
            {writing && writing.map((item) => (
              <li key={item.link} className="mb-4">
                <a href={item.link} className="text-lg font-semibold hover:underline">{item.title}</a>
                <div className="text-sm text-neutral-600">{item.date}</div>
                <div className="text-neutral-800 dark:text-neutral-200">{item.description}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">🗣️ Recent Speaking</h2>
          <ul>
            {speaking && speaking.map((item) => (
              <li key={item.link} className="mb-4">
                <a href={item.link} className="text-lg font-semibold hover:underline" target="_blank" rel="noopener noreferrer">{item.title}</a>
                <div className="text-sm text-neutral-600">{item.date}</div>
                <div className="text-neutral-800 dark:text-neutral-200">{item.description}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">📚 Recent Publications</h2>
          <ul>
            {publications && publications.map((item) => (
              <li key={item.link} className="mb-4">
                <a href={item.link} className="text-lg font-semibold hover:underline" target="_blank" rel="noopener noreferrer">{item.title}</a>
                <div className="text-sm text-neutral-600">{item.date}</div>
                <div className="text-neutral-800 dark:text-neutral-200">{item.description}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">🔬 Research Interests</h2>
          <div className="text-neutral-800 dark:text-neutral-200 whitespace-pre-line">{research}</div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">📬 Get in Touch</h2>
          <div className="flex gap-6">
            <a href={`mailto:${contact.email}`} className="text-link-primary hover:text-link-hover transition-colors">Email</a>
            <a href={contact.twitter} className="text-link-primary hover:text-link-hover transition-colors" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href={contact.linkedin} className="text-link-primary hover:text-link-hover transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
} 