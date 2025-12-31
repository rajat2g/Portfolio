export const dynamic = "force-dynamic";
import Image from "next/image";

// Dummy content (replaces markdown)
const punchlines = [
  "I build clean and scalable web applications.",
  "Focused on performance, UX, and maintainability.",
  "Currently exploring modern frontend architectures.",
];

// Uncomment later if needed
// const featuredProject = [
//   {
//     title: "Sample Project",
//     details: [
//       "Built with modern web technologies",
//       "Optimized for performance and accessibility",
//       "Designed with scalability in mind",
//     ],
//   },
// ];

// const awardsAndRecognition = [
//   {
//     title: "Example Award",
//     details: [
//       "Recognized for technical excellence",
//       "Awarded for impactful contributions",
//     ],
//   },
// ];

export default function Home() {
  return (
    <section>
      <div
        style={{ alignItems: "center" }}
        className="flex flex-col md:flex-row items-start md:items-center gap-8"
      >
        <div>
          <h1 className="mb-4 tracking-tighter text-[28px]">
            <span className="text-gray-500">Hello, I'm</span> Rajat Gangrade.
          </h1>

          {punchlines.map((punchline, index) => (
            <p key={index} className="text-[20px] text-neutral-800 mb-3">
              {punchline}
            </p>
          ))}
        </div>

        <Image
          src="/headshot.jpeg"
          alt="Rajat Gangrade headshot"
          width={1335}
          height={1600}
          priority
          style={{ width: "345px", height: "auto" }}
        />
      </div>

      {/* Featured Project Section (layout preserved) */}
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

      {/* Awards & Recognition Section (layout preserved) */}
      {/* <div className="my-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Awards & Recognition
        </h2>
        <div className="rounded-lg p-6">
          {awardsAndRecognition.map((award, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {award.title}
              </h3>
              <ul className="list-none p-0 m-0">
                {award.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="pl-4 relative text-gray-800 text-base leading-relaxed mb-2"
                  >
                    <span className="absolute left-0 text-gray-500">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
}
