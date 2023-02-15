export default function authHeader() {
    const token = localStorage.getItem("JWT");
    if (token) {
      return { Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
  }