import { Alert, DarkThemeToggle } from "flowbite-react";
import { Navigation } from "./navigation";
import { User } from "../index/model/user";

export function NewLogin() {
  async function Register(event) {
    event.preventDefault();
    const user = new User();

    const dados = new FormData(event.target);

    // Do a bit of work to convert the entries to a plain JS object
    const value = Object.fromEntries(dados.entries());

    if (value.password !== value.confirm) {
      const alert = document.getElementsByName("alert-warning")[0];
      if (alert.classList.contains("hidden")) {
        alert.classList.toggle("hidden");
      }
      return;
    }
    user.Fullname = value.name;
    user.Email = value.email;
    user.Password = value.password;

    //console.log(user);
    const response = await user.postAccounts(user);
    let data: any;
    try {
      data = await response.json();
      if (data.code == 409) {
        const alertRegistered = document.getElementsByName(
          "alert-alredy-registered"
        )[0];
        if (alertRegistered.classList.contains("hidden")) {
          alertRegistered.classList.toggle("hidden");
        }
        return;
      }
    } catch (err) {
      window.location.href = "/signin";
    }
  }

  return (
    <main className="min-h-screen flex-col items-center justify-between dark:bg-gray-900">
      <div className="float-right">
        <DarkThemeToggle />
      </div>
      <Navigation />
      <form
        className="max-w-sm mx-auto"
        onSubmit={(e) => {
          Register(e);
        }}
      >
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name:
          </label>
          <input
            name="name"
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John Smith"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email:
          </label>
          <input
            name="email"
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password:
          </label>
          <input
            name="password"
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Confirm password:
          </label>
          <input
            name="confirm"
            type="password"
            id="confirm-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create
        </button>
      </form>
      <div className="flex flex-col items-center p-3 dark:text-gray-300">
        <label className="items-center">
          Already have an account?{" "}
          <a href="/signin" className="hover:underline">
            Sign in →
          </a>
        </label>
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
          Passwords doesn't match!
        </Alert>
        <Alert
          name="alert-alredy-registered"
          color="warning"
          className="hidden"
          rounded
          onDismiss={() => {
            document
              .getElementsByName("alert-alredy-registered")[0]
              .classList.toggle("hidden");
          }}
        >
          User already registered!
        </Alert>
      </div>
    </main>
  );
}
