const express = require("express");
const app = express();
const port = 3000;

app.get('/',(req,res)=>{
    res.send("Server online")
})

app.get('/nueva-ruta',(req,res)=>{
    res.send("Hola, soy una nueva ruta");
})

app.get('/products',(req, res)=>{
    res.json([
    {
        name:'Product 1',
        price:1000
    },
    {
        name:'Product 2',
        price:2000
    }
])
})

app.get('/product/:id',(req,res)=>{
    const {id} = req.params;
    res.json({
        id,
        name:`Product 2`,
        price:1000
    })
})

app.get('/categories/:categoryId/products/:productId', (req, res)=>{
    const {categoryId, productId} = req.params;
    res.json([
    {
        categoryId,
        productId,
        name:'Category 1',
        products:[]
    }
    ])})

app.listen(port, ()=>{
    console.log(`Puerto ${port}`);
})