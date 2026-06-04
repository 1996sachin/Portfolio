import { useEffect, useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { usePortfolioContent } from '../context/ContentContext'
import type { PortfolioContent } from '../data/content'

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
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_admin_token') ?? '')
  const [activeSection, setActiveSection] = useState<EditableSection>('heroContent')
  const [drafts, setDrafts] = useState<Record<EditableSection, string>>(
    () =>
      Object.fromEntries(
        editableSections.map((section) => [section, stringifySection(content[section])]),
      ) as Record<EditableSection, string>,
  )
  const [status, setStatus] = useState('')
  const [saveError, setSaveError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setDrafts(
      Object.fromEntries(
        editableSections.map((section) => [section, stringifySection(content[section])]),
      ) as Record<EditableSection, string>,
    )
  }, [content])

  const activeLabel = sectionLabels[activeSection]

  const saveSection = async () => {
    setStatus('')
    setSaveError('')

    if (!token.trim()) {
      setSaveError('Enter your admin token before saving.')
      return
    }

    let nextContent: PortfolioContent

    try {
      nextContent = Object.fromEntries(
        editableSections.map((section) => [section, JSON.parse(drafts[section])]),
      ) as PortfolioContent
    } catch {
      setSaveError(`Fix the JSON in ${activeLabel} before saving.`)
      return
    }

    setIsSaving(true)
    localStorage.setItem('portfolio_admin_token', token.trim())

    try {
      const response = await fetch(`${apiBaseUrl}/api/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.trim()}`,
        },
        body: JSON.stringify(nextContent),
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null
        throw new Error(data?.message ?? 'Failed to save content.')
      }

      await refreshContent()
      setStatus(`${activeLabel} saved.`)
    } catch (requestError) {
      setSaveError(
        requestError instanceof Error ? requestError.message : 'Failed to save content.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  const resetSection = () => {
    setDrafts((currentDrafts) => ({
      ...currentDrafts,
      [activeSection]: stringifySection(content[activeSection]),
    }))
    setStatus('')
    setSaveError('')
  }

  return (
    <PageWrapper
      eyebrow="Admin"
      title="Portfolio Content Manager"
      description="Update portfolio details from the browser. Use valid JSON for each section."
    >
      <section className="admin-shell">
        <div className="admin-panel admin-sidebar">
          <label>
            Admin token
            <input
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Enter ADMIN_TOKEN"
            />
          </label>

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
        </div>

        <div className="admin-panel admin-editor">
          <div className="admin-editor-head">
            <div>
              <p className="eyebrow">{activeLabel}</p>
              <h2>Edit section JSON</h2>
            </div>
            <div className="admin-actions">
              <button className="btn ghost" type="button" onClick={resetSection}>
                Reset
              </button>
              <button className="btn primary" type="button" onClick={saveSection} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {isLoading && <p className="admin-muted">Loading live content...</p>}
          {error && <p className="admin-warning">{error}</p>}
          {status && <p className="admin-success">{status}</p>}
          {saveError && <p className="admin-error">{saveError}</p>}

          <textarea
            className="json-editor"
            spellCheck={false}
            value={drafts[activeSection]}
            onChange={(event) =>
              setDrafts((currentDrafts) => ({
                ...currentDrafts,
                [activeSection]: event.target.value,
              }))
            }
          />
        </div>
      </section>
    </PageWrapper>
  )
}

export default AdminPage
