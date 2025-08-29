const Product = require("../Models/Product");

const CreateProduct = async (req, res) => {
  try {
    const { name, description, image, category_id, is_available, status } =
      req.body;
    // validation
    if (
      !name ||
      !description ||
      !image ||
      !category_id ||
      !is_available ||
      !status
    ) {
      return res.status(400).json({ message: "All Data Are Required" });
    }

    const result = await Product.create({
      name,
      description,
      image,
      category_id,
      is_available,
      status,
    });
    return res.status(201).json({
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Product name already exists" });
    }
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const ProductList = async (req, res) => {
  try {
    const categories = await Product.find({});
    return res.status(200).json({
      message: "All Product Data Fetch Successfully!",
      data: categories,
    });
  } catch (error) {}
};

const ProductDelete = async (req, res) => {
  try {
    const { _id } = req.body;

    const Product = await Product.findByIdAndDelete(_id);

    if (!Product) {
      return res.status(404).json({
        message: "Product Not Found!",
      });
    }

    return res.status(200).json({
      message: "Product Deleted Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const ProductShow = async (req, res) => {
  try {
    const { _id } = req.body;

    const Product = await Product.findById(_id);

    if (!Product) {
      return res.status(404).json({
        message: "Product Not Found!",
      });
    }

    return res.status(200).json({
      message: "Product Get Successfully!",
      data: Product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const ProductUpdate = async (req, res) => {
  try {
    const { _id, name, description } = req.body;

    const Product = await Product.findById(_id);

    if (!Product) {
      return res.status(404).json({
        message: "Product Not Found!",
      });
    }
    if (name) Product.name = name;
    if (description) Product.description = description;

    await Product.save();

    return res.status(200).json({
      message: "Product Update Successfully!",
      data: Product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  CreateProduct,
  ProductList,
  ProductDelete,
  ProductShow,
  ProductUpdate,
};
