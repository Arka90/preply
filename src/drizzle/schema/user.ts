import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { JobInfoTable } from "./jobInfo";

export const UsersTable = pgTable("users", {
  id: varchar().primaryKey(),
  email: varchar().notNull().unique(),
  name: varchar().notNull(),
  image: varchar().notNull(),
  createdAt,
  updatedAt,
});

export const userRelations = relations(UsersTable, ({ many }) => ({
  jobInfos: many(JobInfoTable),
}));
