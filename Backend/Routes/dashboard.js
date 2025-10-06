import express from 'express'
import { getTotalSeats } from '../controller/dashBoardController.js';

const dashboardRouter = express.Router()

dashboardRouter.get('/seats',getTotalSeats)
       

export default dashboardRouter;