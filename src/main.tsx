import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import { NewLogin } from "./login/newLogin";
import { ErrorPage } from "./error";
import { LoginInput } from "./login/loginInput";
import { ExpensesPage } from "./index/expensesPage";
import { IncomesPage } from "./index/incomesPage";
import { DashboardPage } from "./index/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/expenses",
    element: <ExpensesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/incomes",
    element: <IncomesPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/signin",
    element: <LoginInput />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <NewLogin />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  <RouterProvider router={router} />
  //</React.StrictMode>
);
