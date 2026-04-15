/*
  server.js — ব্যাকএন্ড এন্ট্রি পয়েন্ট
  এই ফাইলটি Express অ্যাপ্লিকেশনকে প্রদত্ত পোর্টে চালু করে।
  সার্ভার চালু হলে `connectDB()` কল করে MongoDB-র সাথে সংযোগ স্থাপন করা হয়।
  এখানে কোডের কার্যকারিতায় কোনো পরিবর্তন করা হয়নি — শুধুমাত্র মন্তব্য যোগ করা হয়েছে।
*/
import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`:) Server running on port ${PORT}`);
});