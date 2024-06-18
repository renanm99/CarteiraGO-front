export function Navigation() {
  return (
    <nav className="w-full border-gray-200 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-between max-w-screen-xl mx-auto p-4">
        <a
          href="https://flowbite.com"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Carteira Go
          </span>
        </a>
      </div>
    </nav>
  );
}
