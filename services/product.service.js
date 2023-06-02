const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");


class ProductsService {


    constructor() {
        this.products = []
        this.generate()
        
    }

    async generate (){
        const limit = 100;
        for (let i = 0; i < limit; i++){
            this.products.push({
                id: faker.string.uuid(),
                name:faker.commerce.productName(),
                price:parseInt(faker.commerce.price()),
                image: faker.image.url(),
                isBlocked:faker.datatype.boolean()
            })
        }
    }

    async create (data){
        const newProduct = {
            id: faker.string.uuid(),
            ...data
        }
        this.products.push(newProduct)
        return newProduct;
    }

    async find(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                            resolve(this.products);
                        }, 1000);
                    })
    }

    async findOne(id){
        const product =  this.products.find((p)=>p.id === id);
        if (!product) {
            throw boom.notFound("product not found");
        }
        if (product.isBlocked){
            throw boom.forbidden("product is blocked");
        }
        return product;
    }
    async update(id,modifiedProduct){
        const index = this.products.findIndex((p)=>p.id === id);
        if (index === -1) {
            throw boom.notFound("product not found")
        }
        this.products[index] = {...this.products[index], ...modifiedProduct};
        return this.products[index];
    }
    async delete(id){
        const index = this.products.findIndex((p)=>p.id === id);
        if (index === -1) {
            throw boom.notFound("product not found");
        }
        return this.products.splice(index, 1);
    }
}

module.exports = new ProductsService();