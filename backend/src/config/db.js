/*
  db.js — MongoDB সংযোগ সহায়ক
  এই ফাংশন `connectDB` পরিবেশভিত্তিক ভ্যারিয়েবল `MONGO_URI` থেকে URI নিয়ে
  Mongoose ব্যবহার করে MongoDB-র সাথে সংযোগ স্থাপন করে। সংযোগে ত্রুটি হলে প্রক্রিয়াটি বন্ধ করা হয়।
*/
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`:) MongoDB Connected: ${conn.connection.host}`);
  } 
  catch(err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
}

export default connectDB;