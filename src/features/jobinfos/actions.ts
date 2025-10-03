"use server";

import z from "zod";
import { jobInfoSchema } from "./schema";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { insertJobInfo, updateJobInfo as updateJobInfoDB } from "./db";
import { redirect } from "next/navigation";
import { db } from "@/drizzle/db";
import { and, eq } from "drizzle-orm";
import { JobInfoTable } from "@/drizzle/schema";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { getJobInfoIdTag } from "./dbCache";

export async function createJobInfo(unsafeData: z.infer<typeof jobInfoSchema>) {
  const { userId } = await getCurrentUser();
  if (!userId) {
    return {
      error: true,
      message: "You don't have permission to perform this action",
    };
  }
  const { success, data } = jobInfoSchema.safeParse(unsafeData);

  if (!success) {
    return {
      error: true,
      message: "Invalid data",
    };
  }

  const jobInfo = await insertJobInfo({ ...data, userId });

  redirect(`/app/job-infos/${jobInfo.id}`);
}

export async function updateJobInfo(
  id: string,
  unsafeData: z.infer<typeof jobInfoSchema>
) {
  const { userId } = await getCurrentUser();
  if (userId === null) {
    return {
      error: true,
      message: "You don't have permission to perform this action",
    };
  }
  const { success, data } = jobInfoSchema.safeParse(unsafeData);

  if (!success) {
    return {
      error: true,
      message: "Invalid data",
    };
  }

  const jobInfo = await getJobInfo(id, userId);

  if (jobInfo === null) {
    return {
      error: true,
      message: "Job info not found",
    };
  }

  const updatedJobInfo = await updateJobInfoDB(data, id);

  redirect(`/app/job-infos/${updatedJobInfo.id}`);
}

async function getJobInfo(id: string, userId: string) {
  "use cache";

  cacheTag(getJobInfoIdTag(id));
  return db.query.JobInfoTable.findFirst({
    where: and(eq(JobInfoTable.id, id), eq(JobInfoTable.userId, userId)),
  });
}
