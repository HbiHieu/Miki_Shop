import { Schema, models, model } from 'mongoose';

const FeedbackSchema = new Schema(
  {
    rating: { type: Number, require: true },
    content: { type: String, require: true },
    images: { type: Array, default: [] },
    userId: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
    targetId: { type: Schema.Types.ObjectId, ref: 'Feedback' },
    repComment: { type: Array, default: [] },
  },
  {
    timestamps: true,
  },
);

export default models.Feedback || model('Feedback', FeedbackSchema);
