import mongoose from 'mongoose';
let isConnected = false; // track db connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    // console.log('isConnected :>> ', isConnected);
  } catch (err) {
    console.log('MONGODB NOT Connected! err :>> ', err);
  }
}
