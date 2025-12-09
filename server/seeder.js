const mongoose = require('mongoose');
const dotenv = require('dotenv');
// We remove the missing './config/db' import
const products = require('./data/products');
const Product = require('./models/ProductModel');

dotenv.config();

const importData = async () => {
  try {
    // connect directly using mongoose
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected...');

    // 1. Clear existing data
    await Product.deleteMany();
    console.log('🗑️ Old Data Cleared');

    // 2. Insert new data
    await Product.insertMany(products);
    console.log('✅ Sample Data Imported Successfully!');

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();