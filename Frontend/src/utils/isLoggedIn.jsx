import axios from "axios";

const isLoggedIn = async () => {
  try {
    await axios.get("https://gpt-clone-zoro.onrender.com/api/auth/me", {
      withCredentials: true,
    });
    return true;
  } catch {
    console.log("Not logged in (401)");
    return false;
  }
};

export default isLoggedIn;
