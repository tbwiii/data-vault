import { pgTable, PgTableWithColumns } from "drizzle-orm/pg-core";
export default (schema: PgTableWithColumns<any>): any => {
  const blankObject: any = {};

  for (const key in schema) {
    if (schema.hasOwnProperty(key)) {
      blankObject[key] = undefined;
    }
  }

  return blankObject;
};
