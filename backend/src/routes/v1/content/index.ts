import express from 'express'
import { handleGetContent, handleCreateContent, handleGetContentById, handleDeleteContentById, handleUpdateContentById, handleMakePublic, handleGetPublicContent } from '../../../controllers/content.js';
const contentRouter = express.Router();

contentRouter.post('/create', handleCreateContent);

contentRouter.get('/all', handleGetContent)

contentRouter.get('/:id', handleGetContentById)

contentRouter.patch('/:id', handleUpdateContentById)

contentRouter.delete('/:id', handleDeleteContentById)

contentRouter.post('/public/:id', handleMakePublic)

contentRouter.get('/public/:id', handleGetPublicContent)

export default contentRouter
