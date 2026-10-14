import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicDir = path.join(__dirname, '..', 'public')

const syncResume = () => {
  if (!fs.existsSync(publicDir)) {
    console.log('[sync-resume] public/ directory not found, skipping.')
    return
  }

  const files = fs.readdirSync(publicDir)
  const pdfFiles = files.filter((f) => f.toLowerCase().endsWith('.pdf'))

  if (pdfFiles.length === 0) {
    console.log('[sync-resume] No PDF files found in public/.')
    return
  }

  // Prioritize Sachin_Singh_Resume_2026.pdf as the canonical source
  let latestPdf = null
  const canonicalFile = 'Sachin_Singh_Resume_2026.pdf'

  if (pdfFiles.includes(canonicalFile)) {
    const fullPath = path.join(publicDir, canonicalFile)
    const stats = fs.statSync(fullPath)
    latestPdf = { file: canonicalFile, fullPath, mtime: stats.mtimeMs, size: stats.size }
  } else {
    const pdfWithStats = pdfFiles.map((file) => {
      const fullPath = path.join(publicDir, file)
      const stats = fs.statSync(fullPath)
      return { file, fullPath, mtime: stats.mtimeMs, size: stats.size }
    })
    pdfWithStats.sort((a, b) => b.mtime - a.mtime)
    latestPdf = pdfWithStats[0]
  }

  console.log(`[sync-resume] Latest resume detected: ${latestPdf.file} (${latestPdf.size} bytes)`)

  // Canonical aliases that must always exist
  const aliases = [
    'Sachin_Singh_Resume_2026.pdf',
    'Sachin-Singh_Resume-2026.pdf',
    'Sachin-2026.pdf',
    'Sachin-Singh-Resume.pdf',
    'resume.pdf',
  ]

  aliases.forEach((alias) => {
    const targetPath = path.join(publicDir, alias)
    if (alias !== latestPdf.file || !fs.existsSync(targetPath)) {
      fs.copyFileSync(latestPdf.fullPath, targetPath)
      console.log(`[sync-resume] Synced -> public/${alias}`)
    }
  })

  // Also sync to dist/ if dist exists
  const distDir = path.join(__dirname, '..', 'dist')
  if (fs.existsSync(distDir)) {
    aliases.forEach((alias) => {
      const distTarget = path.join(distDir, alias)
      fs.copyFileSync(latestPdf.fullPath, distTarget)
      console.log(`[sync-resume] Synced -> dist/${alias}`)
    })
  }
}

syncResume()
