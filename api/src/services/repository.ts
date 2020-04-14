import { getConnection } from "typeorm";

export const getRepository = (ModelName: any) => {
    const connection = getConnection();
    return connection.getRepository(ModelName);
};

