import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const guestsPath = join(__dirname, '../src/utils/guests.ts')
const raw = readFileSync(guestsPath, 'utf-8')

const re = /"([^"]+)":\s*\{\s*name:\s*"([^"]+)"/g
const base = 'https://bodahyg.netlify.app'
const lines = []
let m
while ((m = re.exec(raw)) !== null) {
  const [, key, name] = m
  lines.push(`${name}\n${base}/invite/${key}\n`)
}
writeFileSync(join(__dirname, '../invite-links.md'), lines.join('\n'), 'utf-8')
console.log('Wrote invite-links.md with', lines.length, 'entries')
