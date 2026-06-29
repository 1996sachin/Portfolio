import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  defaultPortfolioContent,
  type PortfolioContent,
} from '../data/content'

type ContentContextValue = {
  content: PortfolioContent
  isLoading: boolean
  error: string
  refreshContent: () => Promise<void>
}

const ContentContext = createContext<ContentContextValue | undefined>(undefined)

const apiBaseUrl = '' // Forced empty to use Vite proxy locally

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<PortfolioContent>(defaultPortfolioContent)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const refreshContent = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`${apiBaseUrl}/api/content`)

      if (!response.ok) {
        throw new Error('Content API returned an error.')
      }

      const data = (await response.json()) as PortfolioContent
      setContent({
        ...defaultPortfolioContent,
        ...data,
        heroContent: {
          ...defaultPortfolioContent.heroContent,
          ...data.heroContent,
          cvDownload: {
            ...defaultPortfolioContent.heroContent.cvDownload,
            ...data.heroContent?.cvDownload,
          },
        },
      })
    } catch {
      setContent(defaultPortfolioContent)
      setError('Using built-in content because the content API is unavailable.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void refreshContent()
  }, [])

  const value = useMemo(
    () => ({ content, isLoading, error, refreshContent }),
    [content, isLoading, error],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export const usePortfolioContent = () => {
  const value = useContext(ContentContext)

  if (!value) {
    throw new Error('usePortfolioContent must be used within ContentProvider.')
  }

  return value
}
