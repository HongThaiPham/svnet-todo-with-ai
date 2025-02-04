"use server";

import { signIn, signOut } from "@/auth";

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/my-board",
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/", // Redirect to the home page after sign out
  });
}
