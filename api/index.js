const express = require("express");
const cors  = require("cors");
const routerApi = require("./routes");
const { logErrorsMiddleware, errorHandlerMiddleware, boomErrorHandlerMiddleware } = require("./middlewares/error.handler");


const app = express();
const whiteList = ['http://localhost:8080',"https://curso-node-platzi-hkklui584-agemperador.vercel.app"] //'otros dominios'
const options = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000;


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json')

app.use('api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('api/',(req,res)=>{
    res.send("Server online")
})

app.get('api/nueva-ruta',(req,res)=>{
    res.send("Hola, soy una nueva ruta");
})

routerApi(app)

app.use(logErrorsMiddleware);
app.use(boomErrorHandlerMiddleware);
app.use(errorHandlerMiddleware)

app.listen(port, ()=>{
    console.log(`Puerto ${port}`);
})