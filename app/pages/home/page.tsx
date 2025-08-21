export const dynamic = "force-dynamic";
import fs from 'fs';
import path from 'path';
import Image from 'next/image';

// Type definitions
type FeaturedProjectItem = {
  title: string;
  details: string[];
};

type AwardItem = {
  title: string;
  details?: string[];
};

type HomeContent = {
  punchline1: string;
  punchline2: string;
  punchline3: string;
  punchline4: string;
  punchline5: string;
  featuredProject: FeaturedProjectItem[];
  awardsAndRecognition?: AwardItem[];
};

function getHomeContent(): HomeContent {
  const filePath = path.join(process.cwd(), 'content', 'home.md');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const match = /^---([\s\S]*?)---/.exec(raw);
  let content: Partial<HomeContent> = {};
  if (match) {
    const frontmatter = match[1];
    const yaml = require('js-yaml');
    Object.assign(content, yaml.load(frontmatter));
  }
  return content as HomeContent;
}

export default function Home() {
  const { punchline1, punchline2, punchline3, punchline4, punchline5, featuredProject, awardsAndRecognition } = getHomeContent();
  
  return (
    <section>
      <div style={{alignItems: "center" }} className="flex flex-col md:flex-row items-start md:items-center gap-8">
        <div>
          <h1 className="mb-4 tracking-tighter text-[28px]">
            <span className="text-gray-500">Hello, I'm</span> Rajat Gangrade.
          </h1>
          <p className="text-[20px] text-neutral-800 mb-3">
            {punchline1}
          </p>
          <p className="text-[20px] text-neutral-800 mb-3">
            {punchline2}
          </p>
          <p className="text-[20px] text-neutral-800 mb-3">
            {punchline3}
          </p>
          <p className="text-[20px] text-neutral-800 mb-3">
            {punchline4}
          </p>
          <p className="text-[20px] text-neutral-800">
            {punchline5}
          </p>
        </div>
          <Image
            src="/headshot.jpeg"
            alt="Rajat Gangrade headshot"
            width={1335}
            height={1600}
            priority
            style={{ width: '345px', height: 'auto' }}
          />
      </div>
      
      {/* Featured Project Section */}
      {/* <div className="my-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Featured Project
        </h2>
        
        <div className="rounded-lg p-6">
          {featuredProject.map((project, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {project.title}
              </h3>
              <ul className="list-none p-0 m-0">
                {project.details.map((point, pointIndex) => (
                  <li 
                    key={pointIndex}
                    className="mb-2 pl-4 relative text-gray-800 text-base leading-relaxed"
                  >
                    <span className="absolute left-0 text-gray-500">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div> */}
      
      {/* Awards & Recognition Section */}
      {/* {awardsAndRecognition && awardsAndRecognition.length > 0 && (
        <div className="my-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Awards & Recognition
          </h2>
          <div className="rounded-lg p-6">
            {awardsAndRecognition.map((award, index) => (
              <div key={index} className={index !== awardsAndRecognition.length - 1 ? 'mb-8' : ''}>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {award.title}
                </h3>
                {award.details && Array.isArray(award.details) && (
                  <ul className="list-none p-0 m-0">
                    {award.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className={`pl-4 relative text-gray-800 text-base leading-relaxed ${
                          detailIndex !== award.details!.length - 1 ? 'mb-2' : ''
                        }`}
                      >
                        <span className="absolute left-0 text-gray-500">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )} */}
    </section>
  );
} 