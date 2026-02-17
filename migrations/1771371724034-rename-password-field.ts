import { Connection } from 'mongoose';

export async function up (connection: Connection): Promise<void> {
  try {
    console.log('>>> Starting Migration: Rename passwordHashed to password');
    const collection = connection.db?.collection('users');
    console.log('collection', collection);
    const result = await collection?.updateMany(
      { passwordHashed: { $exists: true } },
        [
          { $set: { password: "$passwordHashed" } }, // Set 'password' to 'passwordHashed' value
          { $unset: "passwordHashed" }               // Remove 'passwordHashed'
        ]
    );

    console.log(`>>> Migration Success: Updated ${result?.modifiedCount} documents.`);
    if (result?.matchedCount === 0) {
    console.warn('>>> WARNING: No documents found with "passwordHashed". Check collection name!');
  }
  } catch (error) {
    console.error('>>> Migration Failed!');
    console.error(error);
    throw error; 
  }
}

export async function down (connection: Connection): Promise<void> {
  try {
    const collection = connection.db?.collection('users');
    await collection?.updateMany(
      { password: { $exists: true } },
    [
      { $set: { passwordHashed: "$password" } },
      { $unset: "password" }
    ]
    );
    console.log('>>> Rollback Success: Renamed password back to passwordHashed');
  } catch (error) {
    console.error('>>> Rollback Failed!');
    throw error;
  }
}
