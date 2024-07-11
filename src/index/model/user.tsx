export class User {
  Id: number = 0;
  Fullname: string = "";
  Email: string = "";
  Password: string = "";
  Socialname: string = "";
  Url: string = "";
  constructor() {
    this.Url = "http://carteirago.onrender.com";
  }
  async getAccounts(email: string, pass: string): Promise<User> {
    const response = await fetch(
      `${this.Url}/login?email=${email}&password=${pass}`,
      {
        method: "POST",
        mode: "cors",
      }
    );
    const data = await response.json();
    return data;
  }

  async postAccounts(user: User) {
    const response = await fetch(`${this.Url}/user`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(user),
    });
    return response;
  }

  async updateAccounts(user: User) {
    await fetch(`${this.Url}/user`, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(user),
    });
  }

  async deleteAccounts(id: number) {
    await fetch(`${this.Url}/user`, {
      method: "DELETE",
      mode: "cors",
    });
  }
}

//export const localStoragetoken = localStorage.getItem("user");

export async function postLogin(email: string, password: string) {
  const response = await fetch(
    "http://carteirago.onrender.com/login",
    {
      method: "POST",
      mode: "cors",
      body: `{"Email":"${email}","Password":"${password}"}`,
      credentials: "include",
    }
  );
  const token = await response.json();
  if (token["code"] === 200) {
    //localStorage.setItem("user", email);
    return true;
  }
  return false;
}
