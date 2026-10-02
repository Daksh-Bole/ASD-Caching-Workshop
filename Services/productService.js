const database = require('../database/database');

function getAllProducts() {
  return database.getAllProducts();
}

function getProductById(id) {
  return database.getProductById(id);
}

function createProduct(productData) {
  return database.addProduct(productData);
}

function updateProduct(id, productData) {
  return database.updateProduct(id, productData);
}

function patchProduct(id, productData) {
  return database.patchProduct(id, productData);
}

function deleteProduct(id) {
  return database.deleteProduct(id);
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};