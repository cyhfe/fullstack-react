const fs = require('fs')
const path = require('path')
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const { json, urlencoded } = require('body-parser')
const morgan = require('morgan')

const app = express()

//disable the X-Powered-By header. 默认启用,会返回有关服务器信息的header
app.disable('x-powered-by')

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/', express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  next()
})

const DATA_FILE = path.join(__dirname, 'data.json')

// 查
app.get('/api/timers', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.json(JSON.parse(data))
  })
})

// 新增
app.post('/api/timers', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const timers = JSON.parse(data)
    const newTimer = {
      id: uuidv4(),
      title: req.body.title,
      project: req.body.project,
      elapsed: 0,
    }
    timers.push(newTimer)
    fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
      res.json(timers)
    })
  })
})

app.listen(3000, () => {
  console.log('server runing in port 3000')
})
