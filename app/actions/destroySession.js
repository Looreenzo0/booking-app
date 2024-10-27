"use server";
import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

async function destroySession() {
  // Retrieve the session cookie
  const sessionCookie = cookies().get("appwrite-session");
  console.log("Session value:", sessionCookie);
  if (!sessionCookie) {
    return {
      error: "No session cookie found",
    };
  }

  try {
    const { account } = await createSessionClient(sessionCookie.value);
    // Delete current cookie
    await account.deleteSession("current");

    // Clear session cookie
    cookies().delete("appwrite-session");

    return { success: true };
  } catch (error) {
    console.error("Error deleting session:", error);
    return {
      error: "Error deleting session: " + (error.message || "Unknown error"),
    };
  }
}

export default destroySession;
