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
  budget: {
    type: Number,
    required: true,
    default: 1
  },
  ideaStatus: {
    type: String,
    enum: ['Idea','Task','Mini-Project','Project','Closed'],
    default: 'Idea'
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Tasks'
  }],
  miniProjects: [{
    type: Schema.Types.ObjectId,
    ref:'MiniProjects'
  }],
  projects: [{
    type: Schema.Types.ObjectId,
    ref:'Projects'
  }],
  points: {
    type: Number,
    required: [true, 'Points is required. The default is 1.'],
    default: 1
  },
  assignedDate: {
    type: Date
  },
  createdAt: Date, // default value will be set by mongoose when document created
  updatedAt: Date
});

const Idea = models.Idea || model('Idea', IdeaSchema);

export default Idea;