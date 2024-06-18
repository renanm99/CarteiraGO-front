export class Income {
  Id: number = 0;
  UserId: number = 0;
  Title: string = "";
  Type: string = "";
  Description: string = "";
  Value: number = 0.0;

  async getAccounts(): Promise<Income[]> {
    const response = await fetch("http://localhost:8080/incomes", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json();
    if (response.status === 401) {
      window.location.href = "/signin";
    }
    return data["incomes"];
  }

  async postAccounts(income: Income) {
    await fetch("http://localhost:8080/incomes?userid=1", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(income),
      credentials: "include",
    });
  }

  async updateAccounts(income: Income) {
    await fetch("http://localhost:8080/incomes?userid=1&id=" + income.Id, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(income),
      credentials: "include",
    });
  }

  async deleteAccounts(id: number) {
    await fetch("http://localhost:8080/incomes?userid=1&id=" + id, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    });
  }
}
