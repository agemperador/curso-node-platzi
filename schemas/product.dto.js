const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().positive().integer()
const image = Joi.string().uri()

const createProductDto = Joi.object({
    name: name.required(),
    price: price.required(),
    imagen:image.required()
})

const updateProductDto = Joi.object({
    name: name,
    price: price,
    imagen:image
})

const getProductDto = Joi.object({
    id:id.required(),
})

module.exports = {
    createProductDto,
    updateProductDto,
    getProductDto
}