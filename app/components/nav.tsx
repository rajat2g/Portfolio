import Link from 'next/link'

const navItems = {
  '/': { name: 'Home' },
  '/pages/cv': { name: 'CV' },
  '/pages/publications': { name: 'Publications' },
  '/pages/research': { name: 'Research' },
  '/pages/podcasts': { name: 'Podcasts' },
  '/blog': { name: 'Blog' },
}

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight sticky top-4 z-50">
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div 
          style={{
            backgroundColor: 'rgba(242, 242, 242, 0.7)',
            borderRadius: "100px",
            backdropFilter: "blur(25px)"
          }}
          className="flex flex-row space-x-0 p-1">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="text-[14px] sm:text-[16px] transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-1 sm:px-2 m-1"
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
