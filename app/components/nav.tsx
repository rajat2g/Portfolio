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
    <nav 
      style={{  
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
  )
}
