import { headers } from "next/headers";
import { auth } from "../auth";

export async function getCurrentUser(request?: Request) {
  try {
    const headersList = await headers();

    const headersObj = new Headers();
    headersList.forEach((value, key) => {
      headersObj.set(key, value);
    });

    const session = await auth.api.getSession({
      headers: headersObj,
    });

    // Check if session exists but is invalid/expired
    if (!session) {
      return {
        success: false,
        error: "No active session found",
        user: null,
        isLoading: false,
      };
    }

    // Check if session has user data
    if (!session.user) {
      return {
        success: false,
        error: "Session exists but no user data found",
        user: null,
        isLoading: false,
      };
    }

    // Session is valid - return user data
    return {
      success: true,
      user: {
        ...session.user,
      },
      isLoading: false,
    };
  } catch (error) {
    console.error("Unexpected error in getCurrentUser:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while fetching user session",
      user: null,
      isLoading: false,
    };
  }
}
