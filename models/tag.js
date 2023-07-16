import {Schema, model, models} from 'mongoose';

const TagSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  prompts: [{
    type: Schema.Types.ObjectId,
    ref: 'Prompt'
  }]
});

const Tag = models.Tag || model('Tag', TagSchema);

export default Tag;