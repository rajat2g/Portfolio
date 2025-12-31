import Link from "next/link";

const navItems = {
  "/": { name: "Home" },
  "/pages/cv": { name: "CV" },
  "/pages/publications": { name: "Publications" },
  // '/pages/research': { name: 'Research' },
  "/pages/talks": { name: "Talks" },
  "/blog": { name: "Blog" },
  "/awards": { name: "Awards and Honors" },
};

export function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "12px",
        width: "fit-content",
      }}
    >
      {Object.entries(navItems).map(([path, { name }]) => {
        return (
          <Link key={path} href={path}>
            {name}
          </Link>
        );
      })}
    </nav>
  );
}
