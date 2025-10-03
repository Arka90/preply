import { db } from "@/drizzle/db";
import { JobInfoTable } from "@/drizzle/schema";
import { revalidateJobInfosCache } from "./dbCache";
import { eq } from "drizzle-orm";

export async function insertJobInfo(jobData: typeof JobInfoTable.$inferInsert) {
  const [newJobInfo] = await db.insert(JobInfoTable).values(jobData).returning({
    id: JobInfoTable.id,
    userId: JobInfoTable.userId,
  });

  revalidateJobInfosCache(newJobInfo);
  return newJobInfo;
}

export async function updateJobInfo(
  jobData: Partial<typeof JobInfoTable.$inferInsert>,
  id: string
) {
  const [updatedJobInfo] = await db
    .update(JobInfoTable)
    .set(jobData)
    .where(eq(JobInfoTable.id, id))
    .returning({
      id: JobInfoTable.id,
      userId: JobInfoTable.userId,
    });

  revalidateJobInfosCache(updatedJobInfo);
  return updatedJobInfo;
}
