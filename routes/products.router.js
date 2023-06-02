const express = require("express");
const ProductsService  = require("../services/product.service");
const validatorHandlerMiddleware = require("../middlewares/validator.handler");
const { createProductDto, updateProductDto, getProductDto } = require("../schemas/product.dto");


const router = express.Router();

const service = ProductsService;

router.post('/',
    validatorHandlerMiddleware(createProductDto,"body"),
    async (req, res) => {
        const body = req.body;
        const newProduct = await service.create(body)
        res.status(201).json(newProduct)
})

router.patch('/:id',
    validatorHandlerMiddleware(getProductDto,'params'),
    validatorHandlerMiddleware(updateProductDto,'body'),
    async  (req, res,next) => {
        try{
            const {id} = req.params
            const body = req.body;
            const updatedProduct =await service.update(id, body)
            res.json(updatedProduct)
        } catch (err){
            next(err)
        }
    }
)

router.delete('/:id',async (req, res) => {
    const {id} = req.params
    const deletedProduct =await  service.delete(id)
    res.json({
        message:'deleted',
        id,
        deletedProduct
    })
})

router.get('/',async (req, res)=>{
    const products =await  service.find()
    res.json(products)
})

//especifico
router.get('/filter',async (req, res) => {
    res.send("Yo soy un filter")
})
//Especifico antes que dinámico
//dinamico
router.get('/:id',
    validatorHandlerMiddleware(getProductDto,'params'),
    async (req,res,next)=>{
    try {
        const {id} = req.params;
        const product = await service.findOne(id);
        if (product){
            res.status(200).json(product)
        } else{
            res.status(404).json({
                        message:'No se encontró el producto'
                    })
        }
    } catch (err){
        next(err);
    }
})



module.exports = router;