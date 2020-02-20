// configurando servidor
const express = require("express")
const server = express()

// configurar servidor para static files
server.use(express.static('public'))

// habilitar body do form
server.use(express.urlencoded({ extended: true }))

// configurar conexão com banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})

// configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})

// configurar a apresentação da página
server.get("/", function (req, res) {
    // const donors = []
    db.query("SELECT id, name, email, blood FROM donors", function (err, result) {
        if (err) return res.send(err.message)

        const donors = result.rows
        return res.render("index.html", { donors })
    })

})

// receber e armazenar dados do cliente
server.post("/", function (req, res) {
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigatórios.")
    }

    const query = `INSERT INTO donors ("name", "email", "blood") VALUES ($1, $2, $3)`

    db.query(query, [name, email, blood], function (err) {
        if (err) return res.send(err.message)

        return res.redirect("/")
    })
})

// iniciar o servidor
server.listen(3000, function () {
    console.log("Started")
})