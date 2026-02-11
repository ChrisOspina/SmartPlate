"use Server";
import { checkUser } from "@/lib/checkUser";

export async function checkAuth() {
  const user = await checkUser();

  if (!user) {
    throw new Error("Unauthorized");
  }
  console.log("user authenticated");
  return user;
}
