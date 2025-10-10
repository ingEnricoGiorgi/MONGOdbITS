require('dotenv').config(); // <-- legge il file .env
const { MongoClient } = require('mongodb');
const fs = require('fs');

(async () => {
  const uri = process.env.MONGO_URI; // <-- richiama la variabile
  const dbName = process.env.DB_NAME || 'miodb';
  const collectionName = process.env.COLLECTION || 'europe_population';

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection(collectionName);

    const raw = fs.readFileSync('europe_population.json', 'utf8');
    const docs = JSON.parse(raw);

    const result = await col.insertMany(docs);
    console.log(`✅ Inseriti ${result.insertedCount} documenti`);
  } catch (err) {
    console.error('❌ Errore:', err.message);
  } finally {
    await client.close();
  }
})();
