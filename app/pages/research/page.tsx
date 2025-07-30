import fs from "fs";
import path from "path";
import yaml from "js-yaml";

interface Interest {
  interest: string;
  details: string;
}
interface Project {
  title: string;
  years: string;
  details: string;
  link?: string;
}
interface Methodology {
  method: string;
  details: string;
}
interface Collaboration {
  type: string;
  partners: { partner: string }[];
}
interface Impact {
  metric: string;
  value: string;
}
interface ResearchContent {
  title: string;
  description: string;
  interests: Interest[];
  current_projects: Project[];
  completed_projects: Project[];
  methodology: Methodology[];
  collaborations: Collaboration[];
  impact: Impact[];
}

export default function ResearchPage() {
  const filePath = path.join(process.cwd(), "content", "research.md");
  const raw = fs.readFileSync(filePath, "utf-8");
  const match = /^---([\s\S]*?)---/.exec(raw);
  let content: ResearchContent = {
    title: "",
    description: "",
    interests: [],
    current_projects: [],
    completed_projects: [],
    methodology: [],
    collaborations: [],
    impact: [],
  };
  if (match) {
    const parsed = yaml.load(match[1]);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      content = { ...content, ...parsed };
    }
  }
  const { title, description, interests, current_projects, completed_projects, methodology, collaborations, impact } = content;
  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">{title}</h1>
      <p className="mb-8 text-neutral-700 dark:text-neutral-300">{description}</p>
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Research Interests</h2>
        <ul>
          {interests && interests.map((item, idx) => (
            <li key={idx} className="mb-2">
              <span className="font-semibold">{item.interest}:</span> {item.details}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Current Projects</h2>
        <ul>
          {current_projects && current_projects.map((item, idx) => (
            <li key={idx} className="mb-4">
              <div className="font-semibold">{item.title} <span className="text-sm text-neutral-500">({item.years})</span></div>
              <div className="text-neutral-800 dark:text-neutral-200">{item.details}</div>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Completed Projects</h2>
        <ul>
          {completed_projects && completed_projects.map((item, idx) => (
            <li key={idx} className="mb-4">
              <div className="font-semibold">
                {item.title} <span className="text-sm text-neutral-500">({item.years})</span>
                {item.link && (
                  <a href={item.link} className="ml-2 text-link-primary hover:text-link-hover transition-colors" target="_blank" rel="noopener noreferrer">[Read more]</a>
                )}
              </div>
              <div className="text-neutral-800 dark:text-neutral-200">{item.details}</div>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Research Methodology</h2>
        <ul>
          {methodology && methodology.map((item, idx) => (
            <li key={idx} className="mb-2">
              <span className="font-semibold">{item.method}:</span> {item.details}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Collaborations</h2>
        <ul>
          {collaborations && collaborations.map((item, idx) => (
            <li key={idx} className="mb-4">
              <div className="font-semibold">{item.type}</div>
              <ul className="list-disc ml-6">
                {item.partners && item.partners.map((p, i) => (
                  <li key={i}>{p.partner}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Research Impact</h2>
        <ul>
          {impact && impact.map((item, idx) => (
            <li key={idx} className="mb-2">
              <span className="font-semibold">{item.metric}:</span> {item.value}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
} 