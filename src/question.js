import inquirer from 'inquirer'
import path from 'path'
import { QuestionConfig } from './config.js'

// 询问问题
export function doQuestion () {
  return inquirer
    .prompt(QuestionConfig)
    .then((answers) => {
      answers.githubDir = path.resolve(process.cwd(), answers.githubDir)

      return answers
    })
    .catch((error) => {
      console.error(error)
    })
}
