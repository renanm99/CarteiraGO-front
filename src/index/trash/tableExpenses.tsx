import { Alert, Table } from "flowbite-react";
import {
  deleteExpenses,
  getExpenses,
  postExpenses,
  updateExpenses,
} from "../api/apiObjetcs";
import React, { useEffect, useState } from "react";

interface expense {
  Id: number;
  UserId: number;
  Title: string;
  Type: string;
  Description: string;
  Value: number;
}

export function TableShowExpenses() {
  const [expenses, setExpenses] = useState<expense[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getExpenses();
        if (data) setExpenses(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, []);
  if (error) {
    return "error: " + error;
  }

  function insertNewline(newData: expense) {
    const newline = document.getElementsByName("newLine");
    newline[0].value = "";
    newline[1].value = "";
    newline[2].value = "";
    newline[3].value = "";

    const alert = document.getElementsByName("alert-warning")[0];
    if (
      newData.Title !== "" &&
      newData.Description !== "" &&
      newData.Type !== "" &&
      newData.Value > 0
    ) {
      setExpenses([...expenses, newData]);
      try {
        postExpenses(newData);
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
    const expenseData = {
      Id: id,
      UserId: 0,
      Title: data[0],
      Description: data[1],
      Type: data[2],
      Value: Number(data[3]),
    };

    const editExpense = [
      // Items before the insertion point:
      ...expenses.slice(0, i),
      // New item:
      expenseData,
      // Items after the insertion point:
      ...expenses.slice(i + 1),
    ];
    setExpenses(editExpense);
    updateExpenses(expenseData);
  }

  function DeleteLine(id: number) {}

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
          {expenses.map(function (expense, i) {
            return (
              <React.Fragment key={expense.Id}>
                <Table.Row
                  key={"tableshow" + expense.Id}
                  name={"tableshow" + expense.Id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {expense.Title}
                  </Table.Cell>
                  <Table.Cell>{expense.Description}</Table.Cell>
                  <Table.Cell>{expense.Type}</Table.Cell>
                  <Table.Cell>R${expense.Value}</Table.Cell>
                  <Table.Cell>
                    <a
                      onClick={() => {
                        document
                          .getElementsByName("tableshow" + expense.Id)[0]
                          .classList.toggle("hidden");
                        document
                          .getElementsByName("tableedit" + expense.Id)[0]
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
                        setExpenses(
                          expenses.filter((a) => a.Id !== expense.Id)
                        );
                        deleteExpenses(expense.Id);
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
                  key={"tableedit" + expense.Id}
                  name={"tableedit" + expense.Id}
                  className="bg-green-100 hover:bg-green-200 hidden dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <input
                      name={"editLine-" + expense.Id}
                      className="border-2 w-full md:max-w-full"
                      placeholder={expense.Title}
                      onChange={() => {}}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {
                      <input
                        name={"editLine-" + expense.Id}
                        className="border-2 w-full md:max-w-full"
                        placeholder={expense.Description}
                        onChange={() => {}}
                      />
                    }
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      name={"editLine-" + expense.Id}
                      className="border-2 w-full md:max-w-full"
                      placeholder={expense.Type}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      name={"editLine-" + expense.Id}
                      className="border-2 w-full md:max-w-full"
                      placeholder={expense.Value}
                      onChange={() => {}}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      onClick={() => {
                        EditLine(expense.Id, i);
                        document
                          .getElementsByName("tableshow" + expense.Id)[0]
                          .classList.toggle("hidden");
                        document
                          .getElementsByName("tableedit" + expense.Id)[0]
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
                          .getElementsByName("tableshow" + expense.Id)[0]
                          .classList.toggle("hidden");
                        document
                          .getElementsByName("tableedit" + expense.Id)[0]
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
              <input className="border-2 w-full md:max-w-full" name="newLine" />
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
                  console.log(data);
                  insertNewline({
                    Id: expenses.length + 1,
                    UserId: 1,
                    Title: data[0],
                    Description: data[1],
                    Type: data[2],
                    Value: Number(data[3]),
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
