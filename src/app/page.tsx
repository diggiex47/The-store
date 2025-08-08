// src/app/page.tsx
import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";
import Link from "next/link";
import PublicPage from "./publicPage/page";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return (
   <div>
    <PublicPage></PublicPage>
   </div>
  );
}
