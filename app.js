const express = require('express')
const mapping = require('./mapping')

const app = express()
const PORT = process.env.PORT || 4891

app.get('/*', (req, res) => {
    const method = req.method
    const path = req.url
    const match = mapping.filter((m) => m.method === method && m.path === path)[0]

    if (match) {
        const status = match.status
        const body = match.body
        console.log(`Serving ${method} ${path} with status ${status} and content from ${body}`)
        res.send(require(`./responses/${body}`))
    } else {
        console.log(`No serving for ${method} ${path}`)
        res.send('')
    }
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
