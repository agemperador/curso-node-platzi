const express = require("express");

const router = express.Router();
router.get('/',(req,res)=>{
    const {limit, offset} = req.query;
    if (limit && offset){
        res.json([{
            limit,
            offset,
            name:'User 1'
        }])
    }else{
        res.send("No params or limits specified")
    }
})


module.exports = router;