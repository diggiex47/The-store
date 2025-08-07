import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signIn?callbackUrl=/dashboard");
  }

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">User Dashboard</h1>
      <div className="rounded-lg bg-gray-100 p-6 shadow-md">
        <p className="text-lg">
          Welcome back,{" "}
          <strong className="text-blue-600">
            {session.user?.name || "User"}
          </strong>
          !
        </p>
        <p className="mt-2">
          Your email is:{" "}
          <span className="rounded bg-gray-200 p-1 font-mono">
            {session.user?.email}
          </span>
        </p>
        <p className="mt-4 text-sm text-gray-600">
          This is a protected page. You can only see this content because you
          are logged in.
        </p>
      </div>
    </div>
  );
}
