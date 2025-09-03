const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    // FIX: Parse the error response and log it correctly.
    const errorData = await res.json().catch(() => ({
      message: "Login failed: Server response was not valid JSON.",
    }));

    console.error("Login API error:", errorData); // Log the actual error object.
    throw new Error(errorData.message || "Login failed");
  }

  // If login is successful, return the JSON data.
  const responseData = await res.json();
  console.log("Login successful, response data:", responseData);
  return responseData;
}

export async function signup(username, email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
     credentials: 'include', //for adding cookies to request
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({ message: "Signup failed" }));
    throw new Error(errorData.message || "Signup failed");
  }
  return res.json();
}

export async function getMe() {
  const res = await fetch(`${API_URL}/api/auth/me`);
  if (!res.ok) {
    throw new Error("Not authenticated");
  }
  return res.json();
}
