import mongoose, { Document, Model, Schema } from "mongoose";

export interface IFeedback extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  category: "Bug" | "Improvement" | "Feature";
  upvoters: mongoose.Schema.Types.ObjectId[];
}

const feedbackSchema = new Schema<IFeedback>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["Bug", "Improvement", "Feature"],
      required: true,
    },
    upvoters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Feedback: Model<IFeedback> = mongoose.model<IFeedback>(
  "Feedback",
  feedbackSchema
);

export default Feedback;
