class Dashboard {
  Category: string = "";
  Value: number = 0.0;
  Datetime: Date = new Date();
  Type: string = "";
}

export class Account {
  Id: number = 0;
  UserId: number = 0;
  Title: string = "";
  Category: string = "";
  Description: string = "";
  Value: number = 0.0;

  Account: string = "";
  Url: string = "";
  constructor(account: string) {
    this.Account = account;
    this.Url = "https://banded-arcana-428116-d2.uc.r.appspot.com/" + account;
  }

  async getAccounts(): Promise<Account[]> {
    const response = await fetch(this.Url, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: { Account: this.Account },
    });
    const data = await response.json();
    if (response.status === 401) {
      window.location.href = "/signin";
    }
    return data["accounts"];
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
      credentials: "omit",
      headers: { Account: this.Account },
      body: JSON.stringify({ Id: id }),
    });
  }

  async getDashboard(): Promise<Dashboard[]> {
    const response = await fetch(
      "https://banded-arcana-428116-d2.uc.r.appspot.com/Dash",
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: { Account: this.Account },
      }
    );
    const data = await response.json();
    if (response.status === 401) {
      window.location.href = "/signin";
    }
    return data["dashboard"];
  }
}
