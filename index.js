const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/:version', (req, res) => {
    const version = req.params.version
    const rel = req.query.rel
    if (rel) {
        console.log(`버전: ${version}, 릴리즈: ${rel}`)
        res.sendFile(__dirname + "/public/index.html")
    } else {
        console.log(`버전: ${version}, 릴리즈 요청 없음`)
        res.sendFile(__dirname + "/public/404.html")
    }
})

app.listen(port, () => {
    console.log(`${port} 포트에서 서버 실행 중`)
})