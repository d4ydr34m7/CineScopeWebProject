import { Data } from "@/pages/Registration/Data";

export default class UserManagementService {
  async register(data: Data) {
    console.log(data);
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const body = await response.json();
    let m = body.message;

    if (response.status === 200) {
      return "Registration successful";
    } else {
      if (response.status === 500 && m === "User already exists") {
        return "User already exists";
      }
      return "Registration failed";
    }
  }

  async login(username: string, password: string) {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const body = await response.json();
    let m = body.message;

    if (response.status === 404) {
      return "User not found";
    } else if (response.status === 200) {
      return "Login successful";
    } else if (response.status === 401) {
      return "Incorrect password";
    }
    return "Login Successful";
  }
}
