import { Schema, model, models } from 'mongoose';

const MiniProjectSchema = Schema({
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
  miniProjectStatus: {
    type: String,
    enum: ['open','scheduled','in-progress','done']
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  ideas: [{
    type: Schema.Types.ObjectId,
    ref: 'Idea',
  }],
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Tasks'
  }],
  projects: [{
    type: Schema.Types.ObjectId,
    ref:'Projects'
  }],
  points: {
    type: Number,
    required: [true, 'Points is required. The default is 1.'],
    default: 1,
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

const MiniProject = models.MiniProject || model('MiniProject', MiniProjectSchema);

export default MiniProject;