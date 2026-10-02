const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'db.json');

function getAllProducts() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function getProductById(id) {
  const products = getAllProducts();
  return products.find((p) => p.id === id) || null;
}
function addProduct(product) {
  const products = getAllProducts();
  const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = { id: newId, ...product };
  products.push(newProduct);
  fs.writeFileSync(filePath, JSON.stringify(products));
  return newProduct;
}

function updateProduct(id, updatedFields) {
  const products = getAllProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { id, ...updatedFields };
  fs.writeFileSync(filePath, JSON.stringify(products));
  return products[index];
}

function patchProduct(id, updatedFields) {
  const products = getAllProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updatedFields };
  fs.writeFileSync(filePath, JSON.stringify(products));
  return products[index];
}

function deleteProduct(id) {
  const products = getAllProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const deleted = products.splice(index, 1)[0];
  fs.writeFileSync(filePath, JSON.stringify(products));
  return deleted;
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};