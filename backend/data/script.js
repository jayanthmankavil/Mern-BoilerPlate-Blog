import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Post from '../models/post.js'; // Adjust the path to your Post model

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Fix for __dirname not defined in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Read the JSON file
const filePath = path.join(__dirname, 'sample_post.json');
const posts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Function to import data
const importData = async () => {
  try {
    await Post.insertMany(posts);
    console.log('Data Imported Successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Run the import function
importData();
