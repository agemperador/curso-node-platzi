const express = require("express");

const router = express.Router();


router.get('/:categoryId/products/:productId', (req, res)=>{
    const {categoryId, productId} = req.params;
    res.json([
    {
        categoryId,
        productId,
        name:'Category 1',
        products:[]
    }
    ])})


module.exports = router;