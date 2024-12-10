require('dotenv').config();
const mysqldump = require('mysqldump')

// Your database list you want to backup
const db = [
    { dbName: 'exemple_db1' },
    { dbName: 'exemple_db2' },
];

(async () => {
    try {
        for (const database of db) {
            console.log(`Starting backup for : ${database.dbName}`);
            await mysqldump({
                connection: {
                    host: process.env.DB_HOST,
                    port: process.env.DB_PORT,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: database.dbName,
                },
                dumpToFile: `${process.env.BACKUP_PATH}backup_${database.dbName}.sql`,
            });
            console.log(`Backup completed for : ${database.dbName}`);
        }
        console.log('All backups are completed.');
    } catch (error) {
        console.error('An error occurred during the dump :', error.message);
    }
})();