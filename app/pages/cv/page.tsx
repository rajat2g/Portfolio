import fs from "fs";
import path from "path";
import yaml from "js-yaml";

interface Education {
  degree: string;
  institution: string;
  year: string;
  details: string;
}
interface Experience {
  role: string;
  organization: string;
  years: string;
  details: string;
}
interface Publication {
  title: string;
  year: string;
  journal: string;
  details: string;
}
interface Award {
  award: string;
  year: string;
  details: string;
}
interface Skill {
  category: string;
  items: { skill: string }[];
}
interface Service {
  role: string;
  organization: string;
  years: string;
  details: string;
}
interface CVContent {
  title: string;
  description: string;
  education: Education[];
  experience: Experience[];
  publications: Publication[];
  awards: Award[];
  skills: Skill[];
  service: Service[];
}

export default function CVPage() {
  const filePath = path.join(process.cwd(), "app", "content", "cv.md");
  const raw = fs.readFileSync(filePath, "utf-8");
  const match = /^---([\s\S]*?)---/.exec(raw);
  let content: CVContent = {
    title: "",
    description: "",
    education: [],
    experience: [],
    publications: [],
    awards: [],
    skills: [],
    service: [],
  };
  if (match) {
    const parsed = yaml.load(match[1]);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      content = { ...content, ...parsed };
    }
  }
  const { title, description, education, experience, publications, awards, skills, service } = content;
  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">{title}</h1>
      <p className="mb-8 text-neutral-700 dark:text-neutral-300">{description}</p>
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Education</h2>
        <ul>
          {education && education.map((item, idx) => (
            <li key={idx} className="mb-4">
              <div className="font-semibold">{item.degree}</div>
              <div className="text-sm text-neutral-600">{item.institution}, {item.year}</div>
              {item.details && <div className="text-neutral-800 dark:text-neutral-200">{item.details}</div>}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Professional Experience</h2>
        <ul>
          {experience && experience.map((item, idx) => (
            <li key={idx} className="mb-4">
              <div className="font-semibold">{item.role}</div>
              <div className="text-sm text-neutral-600">{item.organization} | {item.years}</div>
              {item.details && <div className="text-neutral-800 dark:text-neutral-200">{item.details}</div>}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Selected Publications</h2>
        <ul>
          {publications && publications.map((item, idx) => (
            <li key={idx} className="mb-4">
              <div className="font-semibold">{item.title} ({item.year})</div>
              <div className="text-sm text-neutral-600">{item.journal}</div>
              {item.details && <div className="text-neutral-800 dark:text-neutral-200">{item.details}</div>}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Awards & Recognition</h2>
        <ul>
          {awards && awards.map((item, idx) => (
            <li key={idx} className="mb-4">
              <div className="font-semibold">{item.award} ({item.year})</div>
              {item.details && <div className="text-neutral-800 dark:text-neutral-200">{item.details}</div>}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Skills & Expertise</h2>
        <ul>
          {skills && skills.map((cat, idx) => (
            <li key={idx} className="mb-4">
              <div className="font-semibold">{cat.category}</div>
              <ul className="list-disc ml-6">
                {cat.items && cat.items.map((s, i) => (
                  <li key={i}>{s.skill}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Professional Service</h2>
        <ul>
          {service && service.map((item, idx) => (
            <li key={idx} className="mb-4">
              <div className="font-semibold">{item.role}</div>
              <div className="text-sm text-neutral-600">{item.organization} {item.years && `| ${item.years}`}</div>
              {item.details && <div className="text-neutral-800 dark:text-neutral-200">{item.details}</div>}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
} 