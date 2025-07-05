const { MongoClient } = require('mongodb');

const URI = 'mongodb+srv://apoorvMongo:1U3zu6TZ6IlfDHuK@nodecluster01.urtbvyx.mongodb.net/'

const client = new MongoClient(URI);
const dbName = 'HelloWorld';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('User');

  // READ
  let users = await collection.find({}).toArray();
  console.log('Initial users', users);

  // Insert
  const result = await collection.insertOne({
    firstName: 'Priya',
    lastName: 'Gupta',
    city: 'Mumbai',
    phoneNumber: '9876543210',
  });

  console.log('New user inserted', result);

  users = await collection.find({}).toArray();
  console.log('Updated users after insert', users);

  // Update
  const updateResult = await collection.updateOne(
    { firstName: 'Priya' },
    { $set: { city: 'Delhi' } }
  );

  console.log('Updated user', updateResult);
  users = await collection.find({}).toArray();
  console.log('Updated users after Update', users);

  // Delete
  const deleteResult = await collection.deleteOne({ firstName: 'Priya' });
  console.log('Deleted user', deleteResult);

  users = await collection.find({}).toArray();
  console.log('Updated users after delete', users);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

