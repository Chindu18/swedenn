import express from 'express'
import { getTotalSeats,updatePaymentStatus,pendingMoney,getTotalShows} from '../controller/dashBoardController.js';

const dashboardRouter = express.Router()

dashboardRouter.get('/seats',getTotalSeats);
dashboardRouter.get('/pending',pendingMoney)
dashboardRouter.put('/booking/:bookingId/status', updatePaymentStatus);
dashboardRouter.get('/totalshow',getTotalShows)

       

export default dashboardRouter;