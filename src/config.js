import { store } from './util.js'

// 问题选项
export const QuestionConfig = [
  {
    type: 'input',
    name: 'username',
    message: '输入github用户名',
    default: function () {
      return store.get('username') || ''
    },
    validate: function (input) {
      const done = this.async()
      if (!input) {
        done('github用户名不能为空')
        return
      }
      done(null, true)
    }
  },
  {
    type: 'input',
    name: 'useremail',
    message: '输入github邮箱',
    default: function () {
      return store.get('useremail') || ''
    },
    validate: function (input) {
      const done = this.async()
      if (!input) {
        done('github邮箱不能为空')
        return
      }
      done(null, true)
    }
  },
  {
    type: 'input',
    name: 'githubDir',
    message: 'github目录',
    default: function () {
      return store.get('githubDir') || ''
    },
    validate: function (input) {
      const done = this.async()
      if (!input) {
        done('github目录不能为空')
        return
      }
      done(null, true)
    }
  }
]


