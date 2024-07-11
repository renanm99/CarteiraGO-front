import { Button, Sidebar } from "flowbite-react";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import {
  HiChartPie,
  HiOutlineCurrencyDollar,
  HiUser,
  HiCurrencyDollar,
} from "react-icons/hi";

export function Sidepanel() {
  async function Logout() {
    await fetch("http://carteirago.onrender.com/login", {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    });
    window.location.href = "/seeya";
  }

  return (
    <div
      id="all-side"
      onMouseEnter={() => {
        const sidebutton = document.getElementsByName("sidebutton")[0];
        sidebutton.classList.toggle("translate-x-0");
        const sideside = document.getElementsByName("sideside")[0];
        sideside.classList.toggle("-translate-x-full");
      }}
      onMouseLeave={() => {
        const sidebutton = document.getElementsByName("sidebutton")[0];
        sidebutton.classList.toggle("translate-x-0");
        const sideside = document.getElementsByName("sideside")[0];
        sideside.classList.toggle("-translate-x-full");
      }}
    >
      <div
        name="sidebutton"
        className="transition-transform -translate-x-40 z-50 lg:invisible translate-y-24"
      >
        <Button className="w-44 items-end justify-end" color="gray">
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
        className="w-50 transition-transform z-50 fixed translate-y-1/3 -translate-x-full lg:translate-x-0 md:flex h-auto focus:-translate-x-full"
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
    </div>
  );
}
