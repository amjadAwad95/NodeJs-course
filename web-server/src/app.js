// const express = require("express");
// const path = require("path")
// const hbs = require("hbs")
// const geocode = require("./utils/geocode")
// const forecast = require("./utils/forecast")
import express from "express"
import path from "path"
import hbs from "hbs"
import geocode from "./utils/geocode.js"
import forecast from "./utils/forecast.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();


const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "This is a Home page",
        name: "amjad awad"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "This is a about page",
        name: "amjad awad"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "This is a help page",
        name: "amjad awad"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "address not found"
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error });
        }
        forecast(data, (error, data) => {
            if (error) {
                return res.send({ error });
            }
            res.send(data)
        })
    })
})

app.get("/product", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You shoud add a search term"
        });
    }
    res.send({
        product: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("error", {
        error: "The artical not found",
        title: "error page",
        name: "amjad awad"
    })
})

app.get("*", (req, res) => {
    res.render("error", {
        error: "The 404 error",
        title: "error page",
        name: "amjad awad"
    })
})

app.listen(3000, () => {
    console.log("The server run in port 3000")
})