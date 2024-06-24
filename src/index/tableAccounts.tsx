import { Alert, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Account } from "./model/account";

interface account {
  Id: number;
  UserId: number;
  Title: string;
  Category: string;
  Description: string;
  Value: number;
  Account: string;
}

export function TableShowAccounts({ accountType }: { accountType: string }) {
  const [accounts, setAccounts] = useState<account[]>([]);
  const [error, setError] = useState<string | null>(null);

  const account = new Account(accountType);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await account.getAccounts();
        if (data) setAccounts(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return "error: " + error;
  }

  function insertNewline(newData: account) {
    const newline = document.getElementsByName("newLine");
    newline[0].value = "";
    newline[1].value = "";
    newline[2].value = "";
    newline[3].value = "";

    const alert = document.getElementsByName("alert-warning")[0];
    if (
      newData.Title !== "" &&
      newData.Description !== "" &&
      newData.Category !== "" &&
      newData.Value > 0
    ) {
      setAccounts([...accounts, newData]);
      try {
        account.postAccounts(newData);
      } catch (err) {
        setError(err.message);
      }
      if (error) {
        console.log("error: " + error);
      }
    } else {
      if (alert.classList.contains("hidden")) {
        alert.classList.toggle("hidden");
      }
    }
  }

  function EditLine(id: number, i: number) {
    const arr = document.getElementsByName("editLine-" + id);
    const data = [];
    for (let i = 0; i < arr.length; i++) {
      !arr[i].value
        ? data.push(arr[i].getAttribute("placeholder"))
        : data.push(arr[i].value);
      arr[i].value = "";
    }
    if (!(Number(data[3]) > 0)) {
      data[3] = 0;
    }
    const accountData = {
      Id: id,
      UserId: 0,
      Title: data[0],
      Description: data[1],
      Category: data[2],
      Value: Number(data[3]),
      Account: account.Account,
    };

    const editAccount = [
      // Items before the insertion point:
      ...accounts.slice(0, i),
      // New item:
      accountData,
      // Items after the insertion point:
      ...accounts.slice(i + 1),
    ];
    setAccounts(editAccount);
    account.updateAccounts(accountData);
  }

  function DeleteLine(id: number) {
    account.deleteAccounts(id);
  }

  return (
    <div className="max-w-screen p-4">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Value</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
          <Table.HeadCell />
        </Table.Head>
        <Table.Body className="divide-y">
          {accounts.map(function (account, i) {
            return (
              <React.Fragment key={account.Id}>
                <Table.Row
                  key={"tableshow" + account.Id}
                  name={"tableshow" + account.Id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {account.Title}
                  </Table.Cell>
                  <Table.Cell>{account.Description}</Table.Cell>
                  <Table.Cell>{account.Category}</Table.Cell>
                  <Table.Cell>R${account.Value}</Table.Cell>
                  <Table.Cell>
                    <a
                      onClick={() => {
                        document
                          .getElementsByName("tableshow" + account.Id)[0]
                          .classList.toggle("hidden");
                        document
                          .getElementsByName("tableedit" + account.Id)[0]
                          .classList.toggle("hidden");
                      }}
                      className="cursor-pointer font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      onClick={() => {
                        setAccounts(
                          accounts.filter((a) => a.Id !== account.Id)
                        );
                        DeleteLine(account.Id);
                      }}
                      className="cursor-pointer font-medium text-red-600 hover:underline dark:text-cyan-500"
                    >
                      Delete
                    </a>
                  </Table.Cell>
                </Table.Row>
                {/*hidden edit form*/}
                {/*hidden edit form*/}
                {/*hidden edit form*/}
                <Table.Row
                  key={"tableedit" + account.Id}
                  name={"tableedit" + account.Id}
                  className="bg-green-100 hover:bg-green-200 hidden dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <input
                      name={"editLine-" + account.Id}
                      className="border-2 w-full md:max-w-full"
                      placeholder={account.Title}
                      onChange={() => {}}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {
                      <input
                        name={"editLine-" + account.Id}
                        className="border-2 w-full md:max-w-full"
                        placeholder={account.Description}
                        onChange={() => {}}
                      />
                    }
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      name={"editLine-" + account.Id}
                      className="border-2 w-full md:max-w-full"
                      placeholder={account.Category}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      name={"editLine-" + account.Id}
                      className="border-2 w-full md:max-w-full"
                      placeholder={account.Value}
                      onChange={() => {}}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      onClick={() => {
                        EditLine(account.Id, i);
                        document
                          .getElementsByName("tableshow" + account.Id)[0]
                          .classList.toggle("hidden");
                        document
                          .getElementsByName("tableedit" + account.Id)[0]
                          .classList.toggle("hidden");
                      }}
                      className="cursor-pointer font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Save
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      onClick={() => {
                        document
                          .getElementsByName("tableshow" + account.Id)[0]
                          .classList.toggle("hidden");
                        document
                          .getElementsByName("tableedit" + account.Id)[0]
                          .classList.toggle("hidden");
                      }}
                      className="flex justify-center cursor-pointer font-medium text-red-800 hover:underline dark:text-cyan-500"
                    >
                      X
                    </a>
                  </Table.Cell>
                </Table.Row>
              </React.Fragment>
            );
          })}
          {/* Nova linha de inserção */}
          {/* Nova linha de inserção */}
          {/* Nova linha de inserção */}
          <Table.Row className="bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <input className="border-2 w-full md:max-w-full" name="newLine" />
            </Table.Cell>
            <Table.Cell>
              <input className="border-2 w-full md:max-w-full" name="newLine" />
            </Table.Cell>
            <Table.Cell>
              <input
                list="category-name"
                className="border-2 w-full md:max-w-full"
                name="newLine"
              />
              <datalist id="category-name">
                {[...new Set(accounts.map((data) => data.Category))].map(
                  (data, i) => {
                    return <option key={"option-" + i} value={data} />;
                  }
                )}
              </datalist>
            </Table.Cell>
            <Table.Cell>
              <input className="border-2 w-full md:max-w-full" name="newLine" />
            </Table.Cell>
            <Table.Cell>
              <button
                type="submit"
                onClick={() => {
                  const arr = document.getElementsByName("newLine");
                  const data = [];
                  for (let i = 0; i < arr.length; i++) {
                    data.push(arr[i].value);
                  }
                  insertNewline({
                    Id: accounts.length + 1,
                    UserId: 1,
                    Title: data[0],
                    Description: data[1],
                    Category: data[2],
                    Value: Number(data[3]),
                    Account: account.Account,
                  });
                }}
                className="cursor-pointer font-bold text-lg text-green-600 hover:underline dark:text-cyan-500"
              >
                +
              </button>
            </Table.Cell>
            <Table.Cell />
          </Table.Row>
        </Table.Body>
      </Table>
      <div className="w-10/12 md:w-1/2 z-50 fixed pt-3">
        <Alert
          name="alert-warning"
          color="warning"
          className="hidden"
          rounded
          onDismiss={() => {
            document
              .getElementsByName("alert-warning")[0]
              .classList.toggle("hidden");
          }}
        >
          <span className="font-medium">Info alert!</span> Change a few things
          up and try submitting again.
        </Alert>
        <Alert
          name="alert-success"
          color="success"
          className="hidden"
          onDismiss={() => {
            document
              .getElementsByName("alert-success")[0]
              .classList.toggle("hidden");
          }}
        >
          <span className="font-medium">Info alert!</span> Saved.
        </Alert>
      </div>
    </div>
  );
}
