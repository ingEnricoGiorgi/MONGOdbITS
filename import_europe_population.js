const { MongoClient } = require('mongodb');
const fs = require('fs');

(async () => {
  const uri = 'mongodb+srv://enricogiorgi92_db_user:sqKgWNNBMS9VY0Lt@cluster0.6dhmk95.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('miodb');
    const col = db.collection('europe');

    const filePath = 'C:\\Users\\ITS_allievo\\Desktop\\Enrico G\\github\\MongoDBvsCode\\europe_population.json';
    const data = fs.readFileSync(filePath, 'utf8');
    const documents = JSON.parse(data);

    const result = await col.insertMany(documents);
    console.log(`Inseriti ${result.insertedCount} documenti.`);
  } catch (err) {
    console.error('Errore:', err.message);
  } finally {
    await client.close();
  }
})();
