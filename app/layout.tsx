import './global.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased" style={{ position: "relative" }}>
        <div 
          id="top-fancy-line-block"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            borderBottom: "1px solid #e5e5e5",
            height: "50px",
            paddingLeft: "4vw",
            paddingRight: "4vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          {/* <p className='font-semibold hidden sm:block'>Rajat Gangrade</p> */}
          <Navbar/>
        </div>
        <main 
          className='mx-4 sm:mx-16 md:mx-32 lg:mx-40 xl:mx-72'
          style={{
            paddingTop: "50px",
            paddingBottom: "50px",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {children}
        </main>
        <div 
          id="bottom-fancy-line-block"
          style={{
            height: "50px",
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            zIndex: "100",
            borderTop: "1px solid #e5e5e5"
          }}
        >
        </div>
        <div 
          id="right-fancy-line-block"
          style={{
            position: "absolute",
            bottom: "0",
            top: "0",
            right: "0",
            zIndex: "100",
            borderLeft: "1px solid #e5e5e5",
            width: "3vw"
          }}
        >
        </div>
        <div 
          id="left-fancy-line-block"
          style={{
            position: "absolute",
            bottom: "0",
            top: "0",
            left: "0",
            zIndex: "100",
            borderRight: "1px solid #e5e5e5",
            width: "3vw"
          }}
        >
        </div>
      </body>
    </html>
  )
}
