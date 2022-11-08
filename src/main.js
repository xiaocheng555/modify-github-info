import path from 'path'
import shell from 'shelljs'
import { doQuestion } from './question.js'
import { store, exec, eachFiles } from './util.js'
import chalk from 'chalk'

async function run () {
  // 执行询问
  const data = await doQuestion()
  const {
    username,
    useremail,
    githubDir
  } = data
    
  store.set('username', username) // 存储username
  store.set('useremail', useremail) // 存储useremail
  store.set('githubDir', githubDir) // 存储githubDir
  
  const p = []
  eachFiles(githubDir, (isDir, path) => {
    if (isDir) {
      p.push(() => setGitInfo(path, username, useremail).catch(() => {}))
    }
  })
  for (let i = 0; i < p.length; i++) {
    await p[i]()
  }
}

// 设置github信息
async function setGitInfo (dir, username, useremail) {
  shell.cd(dir)
  await exec(`git branch`)
  try {
    await exec(`git config user.name ${username}`)
    await exec(`git config user.email ${useremail}`)
  } catch (err) {
    console.log(err)
  }
}

run()

