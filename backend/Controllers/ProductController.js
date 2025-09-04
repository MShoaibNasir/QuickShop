const Product = require("../Models/Product");

const CreateProduct = async (req, res) => {
  try {
    const { name, description, category_id, is_available, status } = req.body;
    const image = req.file ? req.file.filename : null;

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
    const product = await Product.find({});
    return res.status(200).json({
      message: "All Product Data Fetch Successfully!",
      data: product,
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

    const item = await Product.findById(_id);

    if (!item) {
      return res.status(404).json({
        message: "Product Not Found!",
      });
    }

    return res.status(200).json({
      message: "Product Get Successfully!",
      data: item,
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
    const { _id, name, description, category_id, is_available, status } =
      req.body;

    const item = await Product.findById(_id);

    if (!item) {
      return res.status(404).json({
        message: "Product Not Found!",
      });
    }
    const image = req.file ? req.file.filename : null;
    if (name) item.name = name;
    if (description) item.description = description;
    if (category_id) item.category_id = category_id;
    if (is_available) item.is_available = is_available;
    if (status) item.status = status;
    if (image) item.image = image;
    await item.save();

    return res.status(200).json({
      message: "Product Update Successfully!",
      data: item,
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
