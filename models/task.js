import { Schema, model, models } from 'mongoose';

const TaskSchema = Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator is required. It must reference an existing user.'],
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
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
  taskStatus: {
    type: String,
    enum: ['open','scheduled','in-progress','done'],
    default: "open",
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  ideas: [{
    type: Schema.Types.ObjectId,
    ref:'Ideas'
  }],
  points: {
    type: Number,
    required: [true, 'Points is required. The default is 1.'],
    default: 1,
  },
  privateObj: {
    type: Boolean,
    default: false
  },
  assignedDate: {
    type: Date
  },
  dueDate: {
    type: Date
  },
  createdAt: Date, // default value will be set by mongoose when document created
  updatedAt: Date
});

const Task = models.Task || model('Task', TaskSchema);

export default Task;