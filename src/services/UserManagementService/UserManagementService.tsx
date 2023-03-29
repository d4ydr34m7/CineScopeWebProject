import { SessionManager } from "@/common/SessionManager";
import { UserData } from "@/pages/Registration/UserData";
import { UserManagementState } from "./UserManagementEnum";

export default class UserManagementService {
  async register(data: UserData): Promise<UserManagementState> {
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
      return UserManagementState.UserRegistrationSuccess;
    } else {
      if (response.status === 500 && m === "User already exists") {
        return UserManagementState.UserAlreadyExists;
      }
      return UserManagementState.UserRegistrationFailed;
    }
  }

  async login(
    username: string,
    password: string
  ): Promise<UserManagementState> {
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

    if (response.status === 404) {
      return UserManagementState.UserLoginFailedUserDoesNotExist;
    } else if (response.status === 200) {
      SessionManager.login(body._id);
      return UserManagementState.UserLoginSuccess;
    } else if (response.status === 401) {
      return UserManagementState.UserLoginFailedIncorrectPassword;
    }
    return UserManagementState.UserLoginFailed;
  }

  async getUser(userID: string) {
    const response = await fetch(`http://localhost:3000/users/${userID}`, {
      method: "GET",
    });

    if (response.status === 200) {
      const body = await response.json();
      return body;
    } else {
      return null;
    }
  }

  async updateUser(
    userID: string,
    data: UserData
  ): Promise<UserManagementState> {
    const response = await fetch(`http://localhost:3000/users/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      return UserManagementState.UserUpdatedSuccess;
    } else {
      return UserManagementState.UserUpdatedFailed;
    }
  }

  async deleteUser(userID: string): Promise<UserManagementState> {
    const response = await fetch(`http://localhost:3000/users/${userID}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      return UserManagementState.UserDeletedSuccess;
    } else {
      return UserManagementState.UserDeletedFailed;
    }
  }

  async resetPassword(email: String): Promise<UserManagementState> {
    const response = await fetch(
      "http://localhost:3000/users/reset?email=" + email,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return UserManagementState.PasswordResetSuccess;
    } else if (response.status === 500) {
      return UserManagementState.PasswordResetFailedUserDoesNotExist;
    }

    return UserManagementState.PasswordResetFailed;
  }
}