// scripts/seedData.js - Local MongoDB database seeder for GCT Bhakkar CIT Portal
import mongoose from 'mongoose';
import { 
  COLLEGE_INFO, 
  TIMETABLES, 
  COURSES, 
  INITIAL_ASSIGNMENTS, 
  INITIAL_ATTENDANCE, 
  ANNOUNCEMENTS, 
  FACULTY_DIRECTORY 
} from '../src/data/portalData.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gct_portal';

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB at:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('Connected! Seeding collections...');

    const db = mongoose.connection.db;

    // Clear existing collections
    await db.collection('college_info').deleteMany({});
    await db.collection('timetables').deleteMany({});
    await db.collection('courses').deleteMany({});
    await db.collection('assignments').deleteMany({});
    await db.collection('attendance').deleteMany({});
    await db.collection('announcements').deleteMany({});
    await db.collection('faculty').deleteMany({});

    // Insert seeds
    await db.collection('college_info').insertOne(COLLEGE_INFO);
    await db.collection('timetables').insertMany(TIMETABLES);
    await db.collection('courses').insertMany(COURSES);
    await db.collection('assignments').insertMany(INITIAL_ASSIGNMENTS);
    await db.collection('attendance').insertMany(INITIAL_ATTENDANCE);
    await db.collection('announcements').insertMany(ANNOUNCEMENTS);
    await db.collection('faculty').insertMany(FACULTY_DIRECTORY);

    console.log('MongoDB successfully seeded with official GCT Bhakkar CIT portal records!');
    process.exit(0);
  } catch (err) {
    console.error('Database seeding error:', err);
    process.exit(1);
  }
}

seedDatabase();
