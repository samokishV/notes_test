import { Response, Request } from 'express';
import * as NoteService from '../services/NoteService';

/**
 * @swagger
 *
 * /notes:
 *   get:
 *     description: Find all notes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: successful operation
 */
export const index = async (req: Request, res: Response) => {
  const data = await NoteService.getAll();
  return res.send(data);
};

/**
 * @swagger
 *
 * /notes/{id}:
 *   get:
 *     description: Find note by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Note id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       404:
 *         description: not found
 */
export const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (! await NoteService.exists(id)) return res.sendStatus(404);

  const data = await NoteService.getOne(id);
  return res.send(data);
};

/**
 * @swagger
 *
 * /notes:
 *   post:
 *     description: Create new note
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: text
 *         description: Note text.
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       422:
 *         description: validation errors
 */
export const create = async (req: Request, res: Response) => {
  const text = req.body.text;

  if(! text) {
    res.status(422).send({ message: 'Text field is required' });
  }

  try {
    const data = await NoteService.create(text);
    return res.send({success: true, data: data});
  } catch (e) {
    return res.send({success: false});
  }
};

/**
 * @swagger
 *
 * /notes/{id}:
 *   put:
 *     description: Update existing note
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Note id.
 *         in: path
 *         required: true
 *         type: string
 *       - name: text
 *         description: Note text.
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       422:
 *         description: validation errors
 */
export const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const text = req.body.text;

  if (! await NoteService.exists(id)) return res.sendStatus(404);

  if(! text) {
    res.status(422).send({ message: 'Text field is required' });
  }

  try {
    const data = await NoteService.update(id, text);

    return res.send({success: true, data: data});
  } catch (e) {
    return res.send({success: false});
  }
};

/**
 * @swagger
 *
 * /notes/{id}:
 *   delete:
 *     description: Delete note by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Note id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       404:
 *         description: not found
 */
export const destroy = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (! await NoteService.exists(id)) return res.sendStatus(404);

  try {
    const result = await NoteService.deleteById(id);
    return res.send({success: true});
  } catch (e) {
    return res.send({success: false});
  }
};



