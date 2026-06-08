import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollToTop from './ScrollToTop'
import ThreeDSpace from './ThreeDSpace'
import CustomCursor from './CustomCursor'

const Layout = () => {
  const location = useLocation()
  const routeName = location.pathname === '/' 
    ? 'route-home' 
    : `route-${location.pathname.replace('/', '').replace(/\//g, '-')}`

  return (
    <div className={`app-shell ${routeName}`}>
      <ScrollToTop />
      <CustomCursor />
      <div className="noise-overlay" />
      <ThreeDSpace />
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout

