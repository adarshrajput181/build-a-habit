async function register(username, password) {
  const path = "/api/register";
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return response;
}

async function logIn(username, password) {
  const path = "/api/login";
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });

  return response;
}

async function logOut() {
  const path = "/api/logout";
  const response = await fetch(path, { method: "POST", credentials: "include" });
  return response;
}

async function getUser() {
  const path = "/api/user";
  const response = await fetch(path, {
    credentials: "include",
  });

  return response;
}

export default {
  register,
  logIn,
  logOut,
  getUser,
};
