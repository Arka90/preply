import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { JobInfoTable } from "./jobInfo";
import { relations } from "drizzle-orm";
import { UsersTable } from "./user";
import { QuestionTable } from "./question";

export const InterviewTable = pgTable("interviews", {
  id,
  jobInfoId: uuid()
    .references(() => JobInfoTable.id, { onDelete: "cascade" })
    .notNull(),
  duration: varchar().notNull(),
  humeChatId: varchar(),
  feedback: varchar(),
  createdAt,
  updatedAt,
});

export const interviewRelations = relations(
  InterviewTable,
  ({ one, many }) => ({
    user: one(UsersTable, {
      fields: [InterviewTable.jobInfoId],
      references: [UsersTable.id],
    }),
    questions: many(QuestionTable),
    interviews: many(InterviewTable),
  })
);
