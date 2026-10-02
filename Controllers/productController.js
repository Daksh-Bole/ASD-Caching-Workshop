const productService = require('../services/productService');
const { invalidateCache } = require('../middleware/cache');

function getAllProducts(req, res) {
  const products = productService.getAllProducts();
  res.json(products);
}

function getProductById(req, res) {
  const id = parseInt(req.params.id);
  const product = productService.getProductById(id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
}

function createProduct(req, res) {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  const newProduct = productService.createProduct({ name, price });
  invalidateCache();
  res.status(201).json(newProduct);
}

function updateProduct(req, res) {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  const updated = productService.updateProduct(id, { name, price });
  if (!updated) {
    return res.status(404).json({ error: 'Product not found' });
  }
  invalidateCache();
  res.json(updated);
}

function patchProduct(req, res) {
  const id = parseInt(req.params.id);
  const patched = productService.patchProduct(id, req.body);
  if (!patched) {
    return res.status(404).json({ error: 'Product not found' });
  }
  invalidateCache();
  res.json(patched);
}

function deleteProduct(req, res) {
  const id = parseInt(req.params.id);
  const deleted = productService.deleteProduct(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Product not found' });
  }
  invalidateCache();
  res.json({ message: 'Product deleted', product: deleted });
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};