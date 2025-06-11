import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

import { Sequelize, DataTypes } from "sequelize";

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: console.log
});

const migrateDatabase = async () => {
    try {
        console.log('🔄 Starting database migration...');
        
        // Test connection
        await sequelize.authenticate();
        console.log('✅ Database connection established.');
        
        // Check if userId column already exists
        const [results] = await sequelize.query(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'notes' 
            AND COLUMN_NAME = 'userId' 
            AND TABLE_SCHEMA = '${DB_NAME}'
        `);
        
        if (results.length > 0) {
            console.log('✅ userId column already exists in notes table.');
        } else {
            console.log('📝 Adding userId column to notes table...');
            
            // Add userId column
            await sequelize.query(`
                ALTER TABLE notes 
                ADD COLUMN userId INT NOT NULL DEFAULT 1
            `);
            
            console.log('✅ userId column added successfully.');
            
            // Optional: Update existing notes to belong to first user (id=1)
            console.log('📝 Updating existing notes to belong to user ID 1...');
            await sequelize.query(`
                UPDATE notes 
                SET userId = 1 
                WHERE userId IS NULL OR userId = 0
            `);
            
            console.log('✅ Existing notes updated successfully.');
        }
        
        // Add foreign key constraint if it doesn't exist
        console.log('📝 Adding foreign key constraint...');
        try {
            await sequelize.query(`
                ALTER TABLE notes 
                ADD CONSTRAINT fk_notes_userId 
                FOREIGN KEY (userId) REFERENCES users(id) 
                ON DELETE CASCADE
            `);
            console.log('✅ Foreign key constraint added successfully.');
        } catch (error) {
            if (error.message.includes('Duplicate key name')) {
                console.log('✅ Foreign key constraint already exists.');
            } else {
                console.log('⚠️ Could not add foreign key constraint:', error.message);
            }
        }
        
        console.log('🎉 Database migration completed successfully!');
        
    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        await sequelize.close();
        process.exit();
    }
};

// Run migration
migrateDatabase(); 