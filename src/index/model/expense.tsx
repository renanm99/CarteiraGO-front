export class Expense {
  Id: number = 0;
  UserId: number = 0;
  Title: string = "";
  Type: string = "";
  Description: string = "";
  Value: number = 0.0;

  async getAccounts(): Promise<Expense[]> {
    const response = await fetch("http://localhost:8080/expenses", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const data = await response.json();
    if (response.status === 401) {
      window.location.href = "/signin";
    }
    return data["expenses"];
  }

  async postAccounts(expense: Expense) {
    await fetch("http://localhost:8080/expenses", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(expense),
      credentials: "include",
    });
  }

  async updateAccounts(expense: Expense) {
    await fetch("http://localhost:8080/expenses", {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(expense),
      credentials: "include",
    });
  }

  async deleteAccounts(id: number) {
    await fetch("http://localhost:8080/expenses", {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify("Id:" + id),
    });
  }
}
