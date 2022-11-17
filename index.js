const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

//NE PAS OUBLIER LE GITIGNORE !!!!!!!!!!!!


app.get("/characters", async(req, res) =>{
    try {
        let limit=100;
        if (req.query.limit) {
            limit = req.query.limit;
        }

        let skip=0;
        if (req.query.skip) {
            limit = req.query.skip;
        }

        let name="";
        if (req.query.name) {
            limit = req.query.name;
        }

        
        const response = await axios.get(
            `https:\\https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&limit=${limit}&skip=${skip}&name=${name}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
});

app.all("*", (req, res) => {
    res.status(404).json({ message: "Page not found"});
});

app.listen(4000, () => {
    console.log("Server started");
});