import express from 'express';
import * as NotesController from './controllers/NotesController';
import { Request, Response } from "express";
import cors from 'cors';

export const start = (app: express.Application) => {
  const jsonParser = express.json();
  app.use(cors());

  app.get( '/notes', NotesController.index);
  app.get('/notes/:id', (req: Request, res: Response) => NotesController.show(req, res));
  app.post('/notes', jsonParser, (req: Request, res: Response) => NotesController.create(req, res));
  app.put('/notes/:id', jsonParser, (req: Request, res: Response) => NotesController.update(req, res));
  app.delete('/notes/:id', (req: Request, res: Response) => NotesController.destroy(req, res));
};
