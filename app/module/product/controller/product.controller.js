const productdetail = require("../model/product.details");
const productImagemodel = require("../model/product.image");
const productmodel = require("../model/product.model");
const mongoose=require('mongoose');
const ratingmodel = require("../model/product.rating");
class product {
  async createProduct(req, res) {
    try {
      const { name, size } = req.body;
      if (!name || !size) {
        return res
          .status(400)
          .json({ status: false, message: "Name  and size required" });
      }
      const productexist = await productmodel.findOne({ name });
      if (productexist) {
        return res
          .status(400)
          .json({
            status: false,
            message: "Product already exist with the same name",
          });
      }
      const product = { name, size };
      const productdata = await productmodel.create(product);
      if (productdata) {
        return res.status(201).json({ status: true, message: productdata });
      }
      return res
        .status(400)
        .json({ status: false, message: "Someting went wrong" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  async createProdutDetails(req, res) {
    try {
      const productId = req.params.id;
      if (!productId) {
        return res
          .status(400)
          .jaon({ status: false, message: "prdocut id is required" });
      }
      const { color, price } = req.body;
      if (!color || !price) {
        return res
          .status(400)
          .json({ status: false, messae: "Please enter all the fields" });
      }
      const productdetailsdata = {
        productId: new mongoose.Types.ObjectId(productId),
        color,
        price,
      };
      const existproductdetails = await productdetail.findOne({ productId });
      if (existproductdetails) {
        return res
          .status(400)
          .json({ status: false, message: "Product details already exist" });
      }
      const savedetails = await productdetail.create(productdetailsdata);
      if (savedetails) {
        return res
          .status(201)
          .json({
            status: true,
            message: "product details added successfully",
          });
      }
      return res
        .status(400)
        .json({ status: false, message: "something went wrong" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  async createimage(req, res) {
    try {
      const productId = req.params.id;
      const { image } = req.body;
      if (!productId || !image) {
        return res
          .status(400)
          .json({ status: false, message: "Please enter required fields" });
      }
      const productimagedata = {
        productId: new mongoose.Types.ObjectId(productId),
        image,
      };
      const productdata = await productImagemodel.create(productimagedata);
      if (productdata) {
        return res
          .status(201)
          .json({ status: true, message: "product image added successfully" });
      }
      return res
        .status(400)
        .json({ status: false, message: "something went wrong" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  async addrating(req, res) {
    try {
      const productId = req.params.id;
      const { ratedby, rating } = req.body;

      if (!productId || !ratedby || !rating) {
        return res
          .status(400)
          .json({ status: false, message: "please enter all required field" });
      }
      const ratingdata = {
        productId: new mongoose.Types.ObjectId(productId),
        ratedby,
        rating,
      };
      const data = await ratingmodel.create(ratingdata);
      if (data) {
        return res
          .status(201)
          .json({ status: true, message: "rating added successfully" });
      }
      return res
        .status(400)
        .json({ status: false, message: "something went wrong" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  async getallproduct(req, res) {
    try {
      const productdata = await productmodel.aggregate([
        {
          $lookup: {
            from: "productdetails",
            localField: "_id",
            foreignField: "productId",
            as: "productinfo",
          },
        },
        {
          $lookup: {
            from: "productimagemodels",
            localField: "_id",
            foreignField: "productId",
            as: "productimageinfo",
          },
        },
        {
          $lookup: {
            from: "ratingmodels",
            localField: "_id",
            foreignField: "productId",
            as: "productratinginfo",
          },
        },
        {
          $addFields: {
            productDetail: { $arrayElemAt: ["$productinfo", 0] },
            productImage: { $arrayElemAt: ["$productimageinfo", 0] },
            productRating: { $arrayElemAt: ["$productratinginfo", 0] },
            avgrating: {
              $round: [
                {
                  $avg: {
                    $map: {
                      input: "$productratinginfo",
                      as: "item",
                      in: { $toDouble: "$$item.rating" },
                    },
                  },
                },
                1,
              ],
            },
          },
        },
        {
          $project: {
            name: 1,
            color: "$productinfo.color",
            price: "$productinfo.price",
            image: "$productimageinfo.image",
            ratedby: "$productratinginfo.rating",
            avgrating: 1,
          },
        },
      ]);
      if (productdata) {
        return res.status(200).json({ status: true, message: productdata });
      }
      return res
        .status(400)
        .json({ status: false, message: "something went wrong" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, message: error.message });
    }
  }
}
module.exports=new product()