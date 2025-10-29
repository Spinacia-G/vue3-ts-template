import type { Plugin, ConfigEnv } from 'vite'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

function getGitInfo() {
  let log = ''
  let user = ''
  let email = ''
  let status = ''
  try {
    log = execSync('git log --oneline -10', { encoding: 'utf-8' })
  } catch (e) {
    log = 'Failed to get git log'
  }
  try {
    user = execSync('git config user.name', { encoding: 'utf-8' }).trim()
    email = execSync('git config user.email', { encoding: 'utf-8' }).trim()
  } catch (e) {
    user = 'Unknown'
    email = 'Unknown'
  }
  try {
    status = execSync('git status --porcelain', { encoding: 'utf-8' }).trim()
    if (!status) status = 'No uncommitted changes'
  } catch (e) {
    status = 'Failed to get uncommitted changes'
  }
  return { log, user, email, status }
}

function readEnvFile(filePath: string) {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8')
  }
  return 'None'
}

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  }
  return `${seconds}s`
}

export default function BuildLogger(): Plugin {
  let startTime: number
  let endTime: number
  let buildCmd: string
  let mode: string = ''
  let envContent: string = ''

  return {
    name: 'vite-plugin-build-logger',
    config(_, configEnv: ConfigEnv) {
      mode = configEnv.mode
      const root = process.cwd()
      const envFiles = [
        path.resolve(root, '.env'),
        path.resolve(root, `.env.${mode}`)
      ]
      envContent = envFiles.map(f => {
        return `File: ${path.basename(f)}\n${readEnvFile(f)}`
      }).join('\n\n')
    },
    buildStart() {
      startTime = Date.now()
      buildCmd = process.argv.join(' ')
    },
    generateBundle(_, bundle) {
      endTime = Date.now()
      const duration = formatDuration(endTime - startTime)
      const { log, user, email, status } = getGitInfo()
      const nodeVersion = process.version
      const lines: string[] = []
      lines.push(`Build start time: ${new Date(startTime).toLocaleString()}`)
      lines.push(`Build end time: ${new Date(endTime).toLocaleString()}`)
      lines.push(`Build duration: ${duration}`)
      lines.push(`Node version: ${nodeVersion}`)
      lines.push(`Build user: ${user} <${email}>\n\n`)
      lines.push(`Build command: ${buildCmd}`)
      lines.push(`Active .env file content:\n${envContent}\n\n\n`)
      lines.push('Last 10 git commits:')
      lines.push(log)
      lines.push('Uncommitted git changes:')
      lines.push(`${status}\n\n`)
      lines.push('Build outputs and size:')
      for (const [fileName, asset] of Object.entries(bundle)) {
        const size = asset.type === 'asset'
          ? asset.source.length
          : asset.code.length
        lines.push(`- ${fileName}: ${(size / 1024).toFixed(2)} KB`)
      }
      const logPath = path.resolve(process.cwd(), 'dist', 'build.log')
      fs.writeFileSync(logPath, lines.join('\n'), 'utf-8')
    },
  }
}
