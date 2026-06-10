import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import { usePortfolioContent } from '../context/ContentContext'
import type { PortfolioContent } from '../data/content'

// Form Components
import HeroForm from '../components/admin/HeroForm'
import HighlightsForm from '../components/admin/HighlightsForm'
import NarrativeForm from '../components/admin/NarrativeForm'
import TimelineForm from '../components/admin/TimelineForm'
import ProjectsForm from '../components/admin/ProjectsForm'
import SkillsForm from '../components/admin/SkillsForm'
import ContactForm from '../components/admin/ContactForm'

type EditableSection = keyof PortfolioContent

const apiBaseUrl = import.meta.env.VITE_API_URL ?? ''

const sectionLabels: Record<EditableSection, string> = {
  heroContent: 'Hero',
  aboutHighlights: 'About Highlights',
  narrative: 'About Narrative',
  educationTimeline: 'Education',
  experienceTimeline: 'Experience',
  projectShowcase: 'Projects',
  skillMatrix: 'Skills',
  contactDetails: 'Contact',
}

const editableSections = Object.keys(sectionLabels) as EditableSection[]

const stringifySection = (value: unknown) => JSON.stringify(value, null, 2)

const AdminPage = () => {
  const { content, refreshContent, isLoading, error } = usePortfolioContent()
  const navigate = useNavigate()
  const [token] = useState(() => localStorage.getItem('portfolio_admin_token') ?? '')
  const [activeSection, setActiveSection] = useState<EditableSection>('heroContent')
  const [editMode, setEditMode] = useState<'form' | 'json'>('form')
  
  const [drafts, setDrafts] = useState<PortfolioContent>(content)
  const [jsonDraft, setJsonDraft] = useState(stringifySection(content[activeSection]))
  
  const [status, setStatus] = useState('')
  const [saveError, setSaveError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!token) {
      navigate('/login', { state: { from: { pathname: '/admin' } } })
    }
  }, [token, navigate])

  useEffect(() => {
    setDrafts(content)
  }, [content])

  useEffect(() => {
    setJsonDraft(stringifySection(drafts[activeSection]))
  }, [activeSection, drafts])

  const activeLabel = sectionLabels[activeSection]

  const handleFormChange = (newData: any) => {
    setDrafts((prev) => ({
      ...prev,
      [activeSection]: newData,
    }))
  }

  const handleJsonChange = (val: string) => {
    setJsonDraft(val)
    try {
      const parsed = JSON.parse(val)
      setDrafts((prev) => ({
        ...prev,
        [activeSection]: parsed,
      }))
    } catch {
      // Invalid JSON, wait for user to fix
    }
  }

  const saveContent = async () => {
    setStatus('')
    setSaveError('')

    if (!token) {
      setSaveError('You must be logged in to save changes.')
      navigate('/login')
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch(`${apiBaseUrl}/api/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(drafts),
      })

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('portfolio_admin_token')
          navigate('/login')
          throw new Error('Session expired. Please login again.')
        }
        const data = (await response.json().catch(() => null)) as { message?: string } | null
        throw new Error(data?.message ?? 'Failed to save content.')
      }

      await refreshContent()
      setStatus(`${activeLabel} saved successfully.`)
    } catch (requestError) {
      setSaveError(
        requestError instanceof Error ? requestError.message : 'Failed to save content.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  const resetSection = () => {
    setDrafts((prev) => ({
      ...prev,
      [activeSection]: content[activeSection],
    }))
    setStatus('')
    setSaveError('')
  }

  const handleLogout = () => {
    localStorage.removeItem('portfolio_admin_token')
    navigate('/login')
  }

  const renderForm = () => {
    switch (activeSection) {
      case 'heroContent':
        return <HeroForm data={drafts.heroContent} onChange={handleFormChange} />
      case 'aboutHighlights':
        return <HighlightsForm data={drafts.aboutHighlights} onChange={handleFormChange} />
      case 'narrative':
        return <NarrativeForm data={drafts.narrative} onChange={handleFormChange} />
      case 'educationTimeline':
        return <TimelineForm title="Education" data={drafts.educationTimeline} onChange={handleFormChange} />
      case 'experienceTimeline':
        return <TimelineForm title="Experience" data={drafts.experienceTimeline} onChange={handleFormChange} />
      case 'projectShowcase':
        return <ProjectsForm data={drafts.projectShowcase} onChange={handleFormChange} />
      case 'skillMatrix':
        return <SkillsForm data={drafts.skillMatrix} onChange={handleFormChange} />
      case 'contactDetails':
        return <ContactForm data={drafts.contactDetails} onChange={handleFormChange} />
      default:
        return null
    }
  }

  if (!token) return null

  return (
    <PageWrapper
      eyebrow="Admin"
      title="Portfolio Content Manager"
      description="Update portfolio details from the browser. Use forms or switch to JSON mode."
    >
      <section className="admin-shell">
        <div className="admin-panel admin-sidebar">
          <div className="admin-tabs" role="tablist" aria-label="Editable content sections">
            {editableSections.map((section) => (
              <button
                key={section}
                className={section === activeSection ? 'active' : undefined}
                type="button"
                onClick={() => setActiveSection(section)}
              >
                {sectionLabels[section]}
              </button>
            ))}
          </div>
          
          <button 
            className="btn ghost danger sm" 
            onClick={handleLogout}
            style={{ marginTop: '2rem' }}
          >
            Logout
          </button>
        </div>

        <div className="admin-panel admin-editor">
          <div className="admin-editor-head">
            <div>
              <p className="eyebrow">{activeLabel}</p>
              <h2>Edit {activeLabel} Section</h2>
            </div>
            <div className="admin-actions">
              <button 
                className="btn ghost" 
                type="button" 
                onClick={() => setEditMode(editMode === 'form' ? 'json' : 'form')}
              >
                {editMode === 'form' ? 'Switch to JSON' : 'Switch to Form'}
              </button>
              <button className="btn ghost" type="button" onClick={resetSection}>
                Reset
              </button>
              <button className="btn primary" type="button" onClick={saveContent} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save All Changes'}
              </button>
            </div>
          </div>

          {isLoading && <p className="admin-muted">Loading live content...</p>}
          {error && <p className="admin-warning">{error}</p>}
          {status && <p className="admin-success">{status}</p>}
          {saveError && <p className="admin-error">{saveError}</p>}

          <div className="admin-content-area">
            {editMode === 'json' ? (
              <textarea
                className="json-editor"
                spellCheck={false}
                value={jsonDraft}
                onChange={(e) => handleJsonChange(e.target.value)}
              />
            ) : (
              renderForm()
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default AdminPage
