export class Account {
  Id: number = 0;
  UserId: number = 0;
  Title: string = "";
  Type: string = "";
  Description: string = "";
  Value: number = 0.0;

  Account: string = "";
  Url: string = "";
  constructor(account: string) {
    this.Account = account;
    this.Url = "http://localhost:8080/" + account;
  }

  async getAccounts(): Promise<Account[]> {
    const response = await fetch(this.Url, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json();
    if (response.status === 401) {
      window.location.href = "/signin";
    }
    return data[this.Account];
  }

  async postAccounts(account: Account) {
    await fetch(this.Url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(account),
      credentials: "include",
    });
  }

  async updateAccounts(account: Account) {
    await fetch(this.Url, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(account),
      credentials: "include",
    });
  }

  async deleteAccounts(id: number) {
    await fetch(this.Url, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({ Id: id }),
    });
  }
}