const {
  createProducts,
  updateProducts,
  getAllProducts,
  getProductsById,
  deleteProducts,
} = require("../service/product-service");
const { verifyAuthToken } = require("../service/common-service");
const { failAction, successAction } = require("../utils/response");

const createProduct = async (req, res) => {
  try {
    const { userId, name, price, type } = req.body;
    const imageUrl = req.file ? req.file.path : "";

    const data = {
      userId: userId,
      name: name,
      price: price,
      type: type,
    };
    const result = await createProducts(data, imageUrl);
    res.status(200).json(successAction(result, "Success!"));
  } catch (error) {
    res.status(400).json(failAction(error));
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, type } = req.body;
    const productId = req.params.id;
    const imageUrl = req.file ? req.file.path : "";

    const data = {
      name: name,
      price: price,
      type: type,
      image: imageUrl,
    };
    const result = await updateProducts(productId, data);
    res.status(200).json(successAction(result, "Product updated successfully"));
  } catch (error) {
    res.status(400).json(failAction(error));
  }
};

const getProducts = async (req, res) => {
  const params = req.query;
  try {
    const authData = await verifyAuthToken(req.headers?.authorization);
    const result = await getAllProducts(authData.id, params);
    res.status(200).json(successAction(result, "Success!"));
  } catch (error) {
    res.status(400).json(failAction(error));
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await getProductsById(id);
    res.status(200).json(successAction(result, "Success!"));
  } catch (error) {
    res.status(400).json(failAction(error));
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await deleteProducts(productId);
    res.status(200).json(successAction(result, "Success!"));
  } catch (error) {
    res.status(400).json(failAction(error));
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  getProductById,
  deleteProduct,
};
