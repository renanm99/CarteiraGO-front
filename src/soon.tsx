export function Soon() {
  return (
    <main className="min-h-screen flex-col items-center justify-between dark:bg-gray-900">
      <section className="flex items-center h-screen p-16 bg-gray-50 dark:bg-gray-700">
        <div className="container flex flex-col items-center ">
          <div className="flex flex-col gap-6 max-w-md text-center">
            <h2 className="font-extrabold text-9xl text-gray-600 dark:text-gray-100"></h2>
            <p className="text-2xl md:text-3xl dark:text-gray-300">
              See you soon!
            </p>
            <a
              href="/signin"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Back to home
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
