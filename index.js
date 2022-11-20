const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


app.get("/characters", async(req, res) =>{
    try {
        let limit=100;
        if (req.query.limit) {
            limit = req.query.limit;
        }

        let skip=0;
        if (req.query.skip) {
            skip = req.query.skip;
        }

        let name="";
        if (req.query.name) {
            name = req.query.name;
        }
        
        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&limit=${limit}&skip=${skip}&name=${name}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
});

app.get("/comics", async(req, res) => {
    try {
        let limit=100;
        if (req.query.limit) {
            limit = req.query.limit;
        }

        let skip=0;
        if (req.query.skip) {
            skip = req.query.skip;
        }

        let title="";
        if (req.query.title) {
            title = req.query.title;
        }
        
        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&limit=${limit}&skip=${skip}&title=${title}`
        )
        res.json(response.data);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
});

app.get("/comics/:characterId", async (req,res) => {
    try {
        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

app.get("/character/:characterId", async (req,res) => {
    try {
        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

app.post("/favorites-characters", async (req,res) => {
    
    if (req.body.favorites){
    const chars = req.body.favorites;
    const result =[];
    
    for(let i=0; i<chars.length; i++){
        try {
            const response = await axios.get(
                `https://lereacteur-marvel-api.herokuapp.com/character/${chars[i]}?apiKey=${process.env.MARVEL_API_KEY}`
            );
            result.push(response.data);
            
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    };
    res.json(result);} else {
        res.status(400).json({message: "missing parameter"});
    }
    
});

app.all("*", (req, res) => {
    res.status(404).json({ message: "Page not found"});
});

app.listen(process.env.PORT, () => {
    console.log("Server started");
});