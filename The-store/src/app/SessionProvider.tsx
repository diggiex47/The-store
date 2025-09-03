// This file is used to provide the session context to the entire application.
// It allows components to access the user session and authentication state.
// The root layout wraps the main content in a `SessionProvider` to ensure that the session is available throughout the app
// we are using this file to use the session provider as because in the root layout (src/app/layout.tsx) is the server component and we 
// cannot use the session provider in the server component so we are using this file to use the session provider as a client component
// and then we will import this file in the root layout (src/app/layout.tsx)
// and wrap the main content in the `SessionProvider` to ensure that the session is available
// throughout the app.

"use client";

import { SessionProvider as Provider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export default function SessionProvider({ children }: Props) {
  return <Provider>{children}</Provider>;
}

// export { SessionProvider as default } from "next-auth/react";
