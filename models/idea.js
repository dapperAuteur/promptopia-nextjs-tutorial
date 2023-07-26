import { Schema, model, models } from "mongoose";

const IdeaSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator is required. It must reference an existing user.'],
  },
  title: {
    type: String,
    required: [true, 'Title is required.']
  },
  description: {
    type: String,
    required: false
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  privateObj: {
    type: Boolean,
    default: false
  },
  assignedDate: {
    type: Date
  },
  createdAt: Date, // default value will be set by mongoose when document created
  updatedAt: Date
});

const Idea = models.Idea || model('Idea', IdeaSchema);

export default Idea;