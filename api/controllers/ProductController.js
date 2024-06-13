/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    try {
      const { name, description, price } = req.allParams();

      const newProduct = await Product.create({
        name,
        description,
        price
      }).fetch();

      return res.json(newProduct);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  },

  find: async function (req, res) {
    try {
      const products = await Product.find();
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  },

  findOne: async function (req, res) {
    try {
      const productId = req.param('id');
      const product = await Product.findOne({ id: productId });
      if (!product) {
        return res.status(404).json({ error: 'não encontrado' });
      }
      return res.json(product);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  },

  update: async function (req, res) {
    try {
      const productId = req.param('id');
      console.log('productId no controller', productId);
      const updatedProduct = await Product.updateOne({ id: productId }).set(req.body);

      if (!updatedProduct) {
        return res.status(404).json({ error: 'não encontrado' });
      }

      return res.json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  },

  delete: async function (req, res) {
    try {
      const productId = req.param('id');
      const deletedProduct = await Product.destroyOne({ id: productId });
      if (!deletedProduct) {
        return res.status(404).json({ error: 'não encontrado' });
      }
      return res.json(deletedProduct);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  },
};
