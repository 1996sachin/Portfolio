import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollToTop from './ScrollToTop'
import AmbientBackground from './AmbientBackground'
import CommandPalette from './CommandPalette'

const Layout = () => {
  const [isCmdOpen, setIsCmdOpen] = useState(false)
  const location = useLocation()
  const routeName = location.pathname === '/' 
    ? 'route-home' 
    : `route-${location.pathname.replace('/', '').replace(/\//g, '-')}`

  useEffect(() => {
    const handleOpenCmd = () => setIsCmdOpen(true)
    window.addEventListener('open-command-palette', handleOpenCmd)
    return () => window.removeEventListener('open-command-palette', handleOpenCmd)
  }, [])

  return (
    <div className={`app-shell ${routeName}`}>
      <ScrollToTop />
      <AmbientBackground />
      <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />
      <Navbar onOpenCommandPalette={() => setIsCmdOpen(true)} />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
