import connectMongo from 'src/utils/dbConnect';
import Feedback from 'src/models/Feedback';

async function createProduct(req, res) {
  await connectMongo();
  const { method } = req;
  if (method === 'DELETE') {
    try {
      const ids = req.body.id;
      ids.map(async (item) => {
        return await Feedback.deleteOne({ _id: item });
      });
      res.status(200).json('remove success');
    } catch (error) {
      res.json(error.message);
    }
  }
}

export default createProduct;
