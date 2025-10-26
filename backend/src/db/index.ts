import mongooes from 'mongoose';

export const connectToDatabase = async (DB_URI: string) => {
    try {
        await mongooes.connect(`${DB_URI}second_brain`);
        console.log('Connected to database successfully');
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
}
