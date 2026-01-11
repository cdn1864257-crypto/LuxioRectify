
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

async function createTestUser() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MONGODB_URI is not set');
    process.exit(1);
  }

  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db('luxio');
    const usersCollection = db.collection('users');

    const email = 'test@luxio.com';
    const password = 'Password123!';
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      console.log(`User ${email} already exists. Updating password...`);
      const hashedPassword = await bcrypt.hash(password, 10);
      await usersCollection.updateOne(
        { email },
        { 
          $set: { 
            password: hashedPassword,
            isEmailVerified: true,
            updatedAt: new Date()
          } 
        }
      );
    } else {
      console.log(`Creating test user: ${email}`);
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        firstName: 'Test',
        lastName: 'User',
        country: 'France',
        city: 'Paris',
        address: '123 Test St',
        postalCode: '75001',
        phone: '+33123456789',
        email: email,
        password: hashedPassword,
        language: 'fr',
        isEmailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await usersCollection.insertOne(newUser);
    }

    console.log('Test user created/updated successfully!');
    console.log('Email: test@luxio.com');
    console.log('Password: Password123!');
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await client.close();
  }
}

createTestUser();
