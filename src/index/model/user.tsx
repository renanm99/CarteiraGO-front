export class User {
  Id: number = 0;
  Fullname: string = "";
  Email: string = "";
  Password: string = "";
  Socialname: string = "";

  async getAccounts(email: string, pass: string): Promise<User> {
    const response = await fetch(
      `http://localhost:8080/login?email=${email}&password=${pass}`,
      {
        method: "POST",
        mode: "cors",
      }
    );
    const data = await response.json();
    return data;
  }

  async postAccounts(user: User) {
    await fetch("http://localhost:8080/user?userid=1", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(user),
    });
  }

  async updateAccounts(user: User) {
    await fetch("http://localhost:8080/user?userid=1&id=" + user.Id, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(user),
    });
  }

  async deleteAccounts(id: number) {
    console.log(id);
    await fetch("http://localhost:8080/user?userid=1&id=" + id, {
      method: "DELETE",
      mode: "cors",
    });
  }
}

//export const localStoragetoken = localStorage.getItem("user");

export async function postLogin(email: string, password: string) {
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    mode: "cors",
    body: `{"Email":"${email}","Password":"${password}"}`,
    credentials: "include",
  });
  const token = await response.json();
  if (token["code"] === 200) {
    //localStorage.setItem("user", email);
    return true;
  }
  return false;
}
