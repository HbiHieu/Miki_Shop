import dbConnect from 'src/utils/dbConnect';
import Product from 'src/models/Product';

async function getProducts(req, res) {
  await dbConnect();
  const { method } = req;
  if (method === 'GET') {
    try {
      const slug = req.query.slug;
      const product = await Product.find({ slug });
      if (product) {
        return res.status(200).json({ product });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default getProducts;
