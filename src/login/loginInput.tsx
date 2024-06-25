import { Alert } from "flowbite-react";
import { Navigation } from "./navigation";
import { postLogin } from "../index/model/user";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect } from "react";

export function LoginInput() {
  useEffect(() => {
    async function fetchData() {
      await Checklgn();
    }
    fetchData();
  });

  async function Checklgn() {
    const response = await fetch("https://carteirago.rj.r.appspot.com/signin", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    /*
    if (response.status === 401) {
      window.location.href = "/signin";
    }
      */

    if (response.status === 200) {
      window.location.href = "/";
    }
  }

  async function Login(event) {
    event.preventDefault();
    if (
      localStorage.getItem("user") === "" ||
      localStorage.getItem("user") === null
    ) {
      const dados = new FormData(event.target);

      // Do a bit of work to convert the entries to a plain JS object
      const value = Object.fromEntries(dados.entries());

      const ok = await postLogin(
        value.email.toString(),
        value.password.toString()
      );
      if (!ok) {
        const alert = document.getElementsByName("alert-warning")[0];
        if (alert.classList.contains("hidden")) {
          alert.classList.toggle("hidden");
        }
      } else {
        window.location.href = "/";
      }
      return;
    }
  }

  return (
    <main className="min-h-screen p-4 flex-col items-center justify-between dark:bg-gray-900">
      <Navigation />
      <form
        className="max-w-sm mx-auto"
        onSubmit={(e) => {
          Login(e);
        }}
      >
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@carteira.com"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <div className="flex">
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            <span
              className="flex items-center -translate-x-8"
              onClick={(e) => {
                const pass = document.getElementsByName("password")[0];
                const eye = document.getElementsByName("eye")[0];
                const neye = document.getElementsByName("neye")[0];
                pass.type = "password";
                if (eye.classList.toggle("hidden")) pass.type = "text";
                neye.classList.toggle("hidden");
              }}
            >
              <FaEye name="eye" className="block" />
              <FaEyeSlash name="neye" className="hidden" />
            </span>
          </div>
        </div>

        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Remember me
          </label>
        </div>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Submit
        </button>
      </form>
      <div className="flex flex-col items-center p-3 dark:text-gray-300">
        <label className="items-center">
          New here?{" "}
          <a href="/signup" className="hover:underline">
            Create an account →
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
          Email or password incorrect.
        </Alert>
      </div>
    </main>
  );
}
