import fs from 'fs'
import path from 'path'
import JSZip from 'jszip'
import { PluginOption } from 'vite'

export interface Options {
  outFileName?: string
  outDescribe?: string
}

function timeZoneOffset(date: Date): Date {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
}

function generateTimeSuffix(): string {
  const time = new Date()
  const timeArr = [
    (time.getFullYear() + '').substring(2),
    (time.getMonth() + 1 + '').padStart(2, '0'),
    (time.getDate() + '').padStart(2, '0'),
    (time.getHours() + '').padStart(2, '0'),
    (time.getMinutes() + '').padStart(2, '0')
  ]
  return timeArr.join('')
}

export default function zipPack(options?: Options): PluginOption {
  const inDir = 'dist'
  const outDir = 'release'
  const suffix = options?.outDescribe
    ? `${generateTimeSuffix()}_${options.outDescribe}`
    : generateTimeSuffix()
  const outFileName = `${options?.outFileName || 'prod'}_${suffix}.zip`

  function addFilesToZipArchive(zip: JSZip | null, inDir: string) {
    const listOfFiles = fs.readdirSync(inDir)

    listOfFiles.forEach(fileName => {
      const filePath = path.join(inDir, fileName)
      const file = fs.statSync(filePath)
      const timeZoneOffsetDate = timeZoneOffset(new Date(file.mtime))

      if (file?.isDirectory()) {
        zip!.file(fileName, null, {
          dir: true,
          date: timeZoneOffsetDate
        })
        const dir = zip!.folder(fileName)
        addFilesToZipArchive(dir, filePath)
      } else {
        zip!.file(fileName, fs.readFileSync(filePath), {
          date: timeZoneOffsetDate
        })
      }
    })
  }

  function createZipArchive(zip: JSZip | null) {
    // @ts-ignore
    zip.root = ''

    zip!
      .generateAsync({
        type: 'nodebuffer',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 9
        }
      })
      .then(file => {
        const fileName = path.join(outDir, outFileName)
        if (fs.existsSync(fileName)) {
          fs.unlinkSync(fileName)
        }
        fs.writeFileSync(fileName, file)
      })
  }

  return {
    name: 'vite-plugin-zip-pack',
    apply: 'build',
    closeBundle() {
      try {
        console.log(`start zip pack from ${inDir}`)
        if (fs.existsSync(inDir)) {
          if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir)
          }
          const zip = new JSZip()
          addFilesToZipArchive(zip, inDir)
          createZipArchive(zip)
          console.log(`complete zip pack in ${outDir}/${outFileName}`)
        } else {
          console.error(`no such folder as ${inDir}`)
        }
      } catch (error) {
        if (error) {
          console.log(`${error}`)
        }
        console.log(`failed to zip pack`)
      }
    }
  }
}
