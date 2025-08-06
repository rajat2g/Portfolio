import Link from 'next/link'

const navItems = {
  '/': { name: 'Home' },
  '/pages/cv': { name: 'CV' },
  '/pages/publications': { name: 'Publications' },
  // '/pages/research': { name: 'Research' },
  '/pages/podcasts': { name: 'Podcasts' },
  '/blog': { name: 'Blog' },
}

export function Navbar() {
  return (
    <aside style={{
      position: "sticky",
      top: "0px",
      // transform: "translateX(-50%)"
    }}>
      <div style={{
        padding: "24px 0",
        display: "flex",
        justifyContent: "center"
      }}>
        <nav 
          style={{
            backgroundColor: 'rgba(242, 242, 242, 0.7)',
            borderRadius: "100px",
            backdropFilter: "blur(25px)",
            padding: "8px 24px",  
            display: "flex",
            gap: "12px",
            width: "fit-content"
          }}>
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link
                key={path}
                href={path}
              >
                {name}
              </Link>
            )
          })}
        </nav>
        </div>
    </aside>
  )
}
