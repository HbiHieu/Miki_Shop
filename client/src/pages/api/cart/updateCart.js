import Cart from 'src/models/Cart';
import connectMongo from 'src/utils/dbConnect';

async function createProduct(req, res) {
  await connectMongo();
  const { method } = req;
  if (method === 'POST') {
    try {
      const { cartId, quantity } = req.body;
      console.log(quantity);
      const updateCart = await Cart.findByIdAndUpdate(cartId, {
        quantity,
      });
      return res.json('success!');
    } catch (error) {
      res.json(error.message);
    }
  }
}

export default createProduct;
