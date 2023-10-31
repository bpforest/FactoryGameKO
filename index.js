const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/:version', (req, res) => {
    let version = req.params
    fs.readdir(__dirname + "/public/assets/patches", (err, files) => {
        if (err) {
            console.error('폴더를 읽을 수 없습니다.', err)
            return
        }
        if (files.includes(`${version["version"]}.md`)) {
            console.log(`버전 요청됨: ${version["version"]}`)
            res.sendFile(__dirname + "/public/index.html")
        } else {
            res.sendFile(__dirname + "/public/404.html")
        }
    })
})

app.listen(port, () => {
    console.log(`${port} 포트에서 서버 실행 중`)
})