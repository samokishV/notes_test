import * as repository from './repository';
import { Notes } from "../models/Notes";

export const exists = async (id: number) => {
  const data = await getOne(id);

  if(data) {
    return true;
  }
};

export const getAll = async () => {
  const NotesRepository = repository.getRepository(Notes);
  return await NotesRepository.find({});
};

export const getOne = async (id: number) => {
  const NotesRepository = repository.getRepository(Notes);
  return await NotesRepository.findOne({id: id});
};

export const create = async (text: string) => {
  const NotesRepository = repository.getRepository(Notes);
  const note =  NotesRepository.create({ text: text });
  return  await NotesRepository.save(note);
};

export const update = async (id: number, text: string) => {
  const NotesRepository = repository.getRepository(Notes);
  const note = await NotesRepository.update(id,{ text: text });
  return await NotesRepository.save(note);
};

export const deleteById = async (id: number) => {
  const NotesRepository = repository.getRepository(Notes);
  return await NotesRepository.delete(id);
};
