import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollToTop from './ScrollToTop'

const Layout = () => {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout

