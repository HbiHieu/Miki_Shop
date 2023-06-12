import connectMongo from 'src/utils/dbConnect';
import Feedback from 'src/models/Feedback';

async function createProduct(req, res) {
  await connectMongo();
  const { method } = req;
  if (method === 'POST') {
    console.log(req.body);
    try {
      //const newProduct = new Product(req.body);
      const feedback = await Feedback.create(req.body);
      res.status(201).json(feedback);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }
}

export default createProduct;
