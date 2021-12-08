import express from 'express';
import ChirpRouter from './chirps';

let Routes = express.Router();

Routes.use('/chirps/', ChirpRouter);

export default Routes;