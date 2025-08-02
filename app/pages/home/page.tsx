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
  const filePath = path.join(process.cwd(), 'content', 'home.md');
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
      <h1 style={{
        fontSize:  "28px"
      }} className="mb-8 tracking-tighter"><span style={{ color: "rgb(128, 128, 128)" }}>Hello, I'm</span> Rajat Gangrade.</h1>
      
      <p className="text-[24px] mb-8 text-neutral-800 dark:text-neutral-200">
        UCA award-winning tunneling engineer blending innovation, safety, and impact.
      </p>
      
      <p className="text-[24px] text-neutral-800 dark:text-neutral-200">
        Recognized for advancing tunnel design through technical excellence and practical solutions.
      </p>
      
      {/* Project Section */}
      <div style={{ marginTop: '48px', marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: 'rgb(51, 51, 51)'
        }} className="dark:text-neutral-200">
          Featured Project
        </h2>
        
        <div style={{
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '16px'
        }} className="dark:bg-neutral-900 dark:border-neutral-800">
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '12px',
            color: 'rgb(51, 51, 51)'
          }} className="dark:text-neutral-200">
            West Seattle Ballard Link Extension (WSBLE), Seattle, WA, USA
          </h3>
          
          <ul style={{
            listStyle: 'none',
            padding: '0',
            margin: '0'
          }}>
            <li style={{
              marginBottom: '8px',
              paddingLeft: '16px',
              position: 'relative',
              color: 'rgb(51, 51, 51)',
              fontSize: '16px',
              lineHeight: '1.5'
            }} className="dark:text-neutral-200">
              <span style={{
                position: 'absolute',
                left: '0',
                color: 'rgb(128, 128, 128)'
              }}>•</span>
              Interpreted geotechnical and hydrogeological data to inform tunnel design.
            </li>
            <li style={{
              marginBottom: '8px',
              paddingLeft: '16px',
              position: 'relative',
              color: 'rgb(51, 51, 51)',
              fontSize: '16px',
              lineHeight: '1.5'
            }} className="dark:text-neutral-200">
              <span style={{
                position: 'absolute',
                left: '0',
                color: 'rgb(128, 128, 128)'
              }}>•</span>
              Reviewed GIRs and GERs to assess subsurface conditions.
            </li>
            <li style={{
              marginBottom: '8px',
              paddingLeft: '16px',
              position: 'relative',
              color: 'rgb(51, 51, 51)',
              fontSize: '16px',
              lineHeight: '1.5'
            }} className="dark:text-neutral-200">
              <span style={{
                position: 'absolute',
                left: '0',
                color: 'rgb(128, 128, 128)'
              }}>•</span>
              Conducted stability and buoyancy analyses for station structures.
            </li>
            <li style={{
              marginBottom: '8px',
              paddingLeft: '16px',
              position: 'relative',
              color: 'rgb(51, 51, 51)',
              fontSize: '16px',
              lineHeight: '1.5'
            }} className="dark:text-neutral-200">
              <span style={{
                position: 'absolute',
                left: '0',
                color: 'rgb(128, 128, 128)'
              }}>•</span>
              Developed FEM-based constitutive models to evaluate tunneling impacts on infrastructure.
            </li>
            <li style={{
              marginBottom: '8px',
              paddingLeft: '16px',
              position: 'relative',
              color: 'rgb(51, 51, 51)',
              fontSize: '16px',
              lineHeight: '1.5'
            }} className="dark:text-neutral-200">
              <span style={{
                position: 'absolute',
                left: '0',
                color: 'rgb(128, 128, 128)'
              }}>•</span>
              Assessed effects of tunneling on ~800 existing facilities.
            </li>
            <li style={{
              marginBottom: '8px',
              paddingLeft: '16px',
              position: 'relative',
              color: 'rgb(51, 51, 51)',
              fontSize: '16px',
              lineHeight: '1.5'
            }} className="dark:text-neutral-200">
              <span style={{
                position: 'absolute',
                left: '0',
                color: 'rgb(128, 128, 128)'
              }}>•</span>
              Evaluated SOE designs for stations and cut-cover portals.
            </li>
            <li style={{
              marginBottom: '0',
              paddingLeft: '16px',
              position: 'relative',
              color: 'rgb(51, 51, 51)',
              fontSize: '16px',
              lineHeight: '1.5'
            }} className="dark:text-neutral-200">
              <span style={{
                position: 'absolute',
                left: '0',
                color: 'rgb(128, 128, 128)'
              }}>•</span>
              Reviewed and optimized vertical alignment for cost-effective design.
            </li>
          </ul>
        </div>
      </div>
      
      {/* Awards Section */}
      <div style={{ marginTop: '48px', marginBottom: '48px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '0px',
          color: 'rgb(51, 51, 51)'
        }} className="dark:text-neutral-200">
          Awards & Recognition
        </h2>
        
        <div style={{
          borderRadius: '8px',
          padding: '24px'
        }} className="dark:bg-neutral-900 dark:border-neutral-800">
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
            color: 'rgb(51, 51, 51)'
          }} className="dark:text-neutral-200">
            Underground Construction Association (UCA) Young Member Award, 2024
          </h3>
          
          <p style={{
            marginBottom: '16px',
            color: 'rgb(51, 51, 51)',
            fontSize: '16px',
            lineHeight: '1.6'
          }} className="dark:text-neutral-200">
            Award for outstanding contributions to the tunneling community, demonstrating exceptional technical accomplishments, innovative ideas, and a commitment to improving industry practices.
          </p>
          
          <p style={{
            marginBottom: '0',
            color: 'rgb(51, 51, 51)',
            fontSize: '16px',
            lineHeight: '1.6'
          }} className="dark:text-neutral-200">
            Recognized for driving technical and commercial success, advocating for safety, and making tangible differences in the field.
          </p>
        </div>
      </div>
      
      {/* <p className="mb-4">{description}</p> */}
      {/* <div className="my-8 grid gap-16">
        <div>
          <h2 className="text-xl font-bold mb-4">📝 Recent Writing</h2>
          <ul>
            {writing && writing.map((item) => (
              <li key={item.link} className="mb-4">
                <a href={item.link} className="text-lg font-semibold hover:underline">{item.title}</a>
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
      </div> */}
    </section>
  );
} 