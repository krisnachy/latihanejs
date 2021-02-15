const express = require("express")
//server js
const axios = require("axios")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//instalasi ejs
app.set("view engine", "ejs")
app.get("/", (req, res) => {
    res.render("index", {title: "Homepage"})
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "about"
    })
})

app.get("/news", (req, res) => {
    // res.render("news", {
    //     title: "Berita"
    // })
    const url = "https://berita-indo-api.vercel.app/v1"

    axios.get(`${url}/cnbc-news`)
    .then(result => {
        res.render("news", {
            title: "Berita", news: result.data.data
        })
    })
})

app.get("/corona", (req, res) => {
    const url = "https://api.kawalcorona.com/indonesia/provinsi/";
    axios.get(`${url}`)
    .then(result => {
        res.render("corona", {
            title: "Data Corona",
            corona: result.data
        })
    })
})

app.get("/greet", (req, res) => {
    res.render("greet", {nama: req.query.name})
})

app.listen(3000, () => {
    console.log("SERVER MENYALA")
})