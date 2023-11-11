export default function authHeader() {
    const accessJwt = localStorage.getItem("accessToken");
    if (accessJwt) {
      return { Authorization: 'Bearer ' + accessJwt };
    } else {
      return {};
    }
  }