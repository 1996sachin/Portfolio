import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import EducationPage from './pages/EducationPage'
import ExperiencePage from './pages/ExperiencePage'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}

export default App
