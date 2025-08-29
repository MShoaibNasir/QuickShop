const Category = require("../Models/Category");

const CreateCategory = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    // validation
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are required" });
    }

    const result = await Category.create({ name, description, status });
    return res.status(201).json({
      message: "Category created successfully!",
      data: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Category name already exists" });
    }
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const categoryList = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json({
      message: "All Category Data Fetch Successfully!",
      data: categories,
    });
  } catch (error) {}
};

const categoryDelete = async (req, res) => {
  try {
    const { _id } = req.body;

    const category = await Category.findByIdAndDelete(_id);

    if (!category) {
      return res.status(404).json({
        message: "Category Not Found!",
      });
    }

    return res.status(200).json({
      message: "Category Deleted Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const categoryShow = async (req, res) => {
  try {
    const { _id } = req.body;

    const category = await Category.findById(_id);

    if (!category) {
      return res.status(404).json({
        message: "Category Not Found!",
      });
    }

    return res.status(200).json({
      message: "Category Get Successfully!",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const categoryUpdate = async (req, res) => {
  try {
    const { _id, name, description } = req.body;

    const category = await Category.findById(_id);

    if (!category) {
      return res.status(404).json({
        message: "Category Not Found!",
      });
    }
    if (name) category.name = name;
    if (description) category.description = description;

    await category.save();

    return res.status(200).json({
      message: "Category Update Successfully!",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  CreateCategory,
  categoryList,
  categoryDelete,
  categoryShow,
  categoryUpdate,
};
