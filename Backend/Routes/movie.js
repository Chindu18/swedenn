import express from 'express'
import { getMovie } from '../controller/movieController.js';

const movieRouter=express.Router();

movieRouter.get('/getmovie',getMovie)


export default movieRouter