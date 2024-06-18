import { Button, Sidebar } from "flowbite-react";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import {
  HiArrowNarrowLeft,
  HiArrowSmRight,
  HiChartPie,
  HiOutlineCurrencyDollar,
  HiUser,
  HiCurrencyDollar,
  HiLogout,
} from "react-icons/hi";

export function Sidepanel() {
  async function Logout() {
    const response = await fetch("http://localhost:8080/login", {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    });
    window.location.href = "/signin";
  }
  return (
    <>
      <div
        name="sidebutton"
        className="transition-transform z-50 md:invisible -translate-x-11 translate-y-24"
      >
        <Button
          className="hover:translate-x-10"
          onClick={() => {
            let arr = document.getElementsByName("sideside")[0].classList;
            arr.toggle("-translate-x-full");
          }}
          color="gray"
        >
          <svg
            className="translate-x-5 text-gray-800 dark:text-white"
            width="20"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m10 16 5-5-5-5"
            />
          </svg>
        </Button>
      </div>
      <Sidebar
        name="sideside"
        aria-label="Default sidebar example"
        className="transition-transform z-50 fixed translate-y-1/3 -translate-x-full md:translate-x-0 md:flex h-auto"
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              href="/expenses"
              icon={HiCurrencyDollar}
              labelColor="dark"
            >
              Expenses
            </Sidebar.Item>
            <Sidebar.Item href="/incomes" icon={HiOutlineCurrencyDollar}>
              Incomes
            </Sidebar.Item>
            <div className="opacity-50">
              <Sidebar.Item href="#" icon={HiUser}>
                Account
              </Sidebar.Item>
            </div>
            {/*
            <Sidebar.Item href="/signin" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            */}
            <div
              className="cursor-pointer"
              onClick={() => {
                Logout();
              }}
            >
              <Sidebar.Item icon={HiOutlineArrowLeftOnRectangle}>
                Log out
              </Sidebar.Item>
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}
