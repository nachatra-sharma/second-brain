import express from 'express'
import { handleGetContent, handleCreateContent, handleGetContentById, handleDeleteContentById, handleUpdateContentById } from '../../../controllers/content.js';
const contentRouter = express.Router();

contentRouter.post('/create', handleCreateContent);

contentRouter.get('/all', handleGetContent)

contentRouter.get('/:id', handleGetContentById)

contentRouter.patch('/:id', handleUpdateContentById)

contentRouter.delete('/:id', handleDeleteContentById)



export default contentRouter
