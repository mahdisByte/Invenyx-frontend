export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return token && role;
};

export const isAdmin = () => {
  return localStorage.getItem("role") === "admin";
};

export const isUser = () => {
  return localStorage.getItem("role") === "user";
};


export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("name");
};