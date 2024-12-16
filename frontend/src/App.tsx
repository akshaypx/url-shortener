function App() {
  return (
    <>
      {/* Navbar */}
      <nav className="px-6 py-4 w-full bg-blue-500 flex justify-center items-center">
        <div className="flex justify-between max-w-[900px] w-full text-white">
          <p className="text-xl">Url Shortener</p>
          <a href="#">Github</a>
        </div>
      </nav>

      {/* Body */}
      <main className="w-full py-6 flex flex-col justify-center items-center h-80">
        <p className="text-2xl opacity-80 font-bold">
          Paste your URL to shorten
        </p>
        <form
          action=""
          className="flex flex-col md:flex-row max-w-[900px] w-full p-4 items-start justify-center gap-2"
        >
          <input
            type="text"
            placeholder="https://loooooongwebsite.com/longestever"
            className="p-2 rounded-md border w-full md:max-w-[80%]"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 w-full rounded-md md:max-w-[20%]"
          >
            Shorten!
          </button>
        </form>
      </main>
    </>
  );
}

export default App;
