const express=require('express')
const productController = require('../app/module/product/controller/product.controller')
const router=express.Router()

router.post("/createproduct",productController.createProduct)
router.post('/createimage/:id',productController.createimage)
router.post('/adddetails/:id',productController.createProdutDetails)
router.post('/addrating/:id',productController.addrating)
router.get('/productdetails',productController.getallproduct)

module.exports=router