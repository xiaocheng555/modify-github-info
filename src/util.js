import fs from 'fs-extra'
import path from 'path'
import cp from 'child_process'

// 运行命令
export function exec (command) {
  return new Promise((resolve, reject) => {
    const child = cp.exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error)
        return
      }
      resolve(stdout, stderr)
    })
    child.stdout.on('data', data => {
      console.log(data)
    })
  })
}

// 存储
export const store = {
  data: null,
  file: path.resolve(process.cwd(), 'src/data.json'),
  get (key) {
    if (!this.data) {
      try {
        this.data = fs.readJsonSync(this.file) || {}
      } catch (err) {
        this.data = {}
      }
    }
    return this.data[key]
  },
  set (key, val) {
    this.data[key] = val
    fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2))
  }
}

// 遍历目录下文件
export function eachFiles (dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const pathname = path.join(dir, file)
    const stat = fs.statSync(pathname)
    if (stat.isDirectory()) {
      callback(true, pathname)
    } else {
      callback(false, pathname)
    }
  })
}