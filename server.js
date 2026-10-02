const express = require('express');
const app = express();
const fs = require("fs/promises");
const path = require("path");
const port = 3000;

let Filepath = path.join(__dirname, 'db.json');

let cache = {
    products: [],
   'product/1': {},
   'product/2': {},
   'product/3': {}
};


async function readData(){
    let data = await fs.readFile(Filepath, 'utf8');
    return JSON.parse(data);
}

async function delayReadData() {
    return new Promise((resolve,reject) => {
        setTimeout(async () => {
            let data = await readData();
            resolve(data);
        }, 1500);
    });
}

app.get('/products', async (req, res) => {
    let key = req.url
    let value = cache[key]

    try {
        if (value){
            res.json(value);
            return;
        } 
        let products = await delayReadData();
        return res.json(products);
    } catch (error) {
        console.log(error);
    }
});

app.get('/products/:id', async (req, res) => {
    try{
        let id = Number(req.params.id);
        let products = await readData();
        let product = products.find(p => p.id === id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


