import { useState } from "react";
import { PacmanLoader } from "react-spinners";
import { backendBaseUrl, frontendBaseUrl } from "./domain";
import { useNavigate } from "react-router";

function App() {
  const [longUrl, setLongUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<
    "idle" | "pending" | "success" | "failed"
  >("idle");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const [isLoadingDetails, setIsLoadingDetails] = useState<
    "idle" | "pending" | "success" | "failed"
  >("idle");

  const navigate = useNavigate();

  const getShortUrl = async (longUrl: string) => {
    try {
      setIsLoading("pending");
      const res = await fetch(`${backendBaseUrl}/shorten`, {
        method: "POST",
        body: JSON.stringify({
          url: longUrl,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setIsLoading("success");
        return data;
      } else {
        setIsLoading("failed");
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const exp =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const regex = new RegExp(exp);
    if (longUrl.match(regex)) {
      getShortUrl(longUrl)
        .then((val) => setShortUrl(frontendBaseUrl + "/" + val.shortCode))
        .catch((e) => console.log("Show toast error", e));
    } else {
      //show toast for validation
      console.log("todo:show error toast");
    }
  };

  const copyToClipboard = (e: any) => {
    e.preventDefault();
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  const getUrlDetails = async () => {
    console.log(
      backendBaseUrl + "/shorten" + longUrl.substring(frontendBaseUrl.length)
    );
    const response = await fetch(
      backendBaseUrl + "/shorten" + longUrl.substring(frontendBaseUrl.length)
    );
    const data = await response.json();
    const clicks = data.numberOfClicks || 0;
    setIsLoadingDetails(() => {
      setNumberOfClicks(clicks);
      return "success";
    });
  };

  const handleGetStats = (e: any) => {
    e.preventDefault();
    getUrlDetails();
  };

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

      {shortUrl.length == 0 ? (
        isLoading == "pending" ? (
          <PacmanLoader />
        ) : (
          <div className="w-full py-6 flex flex-col justify-center items-center h-80">
            <p className="text-2xl opacity-80 font-bold">
              Paste your URL to shorten
            </p>
            <form
              onSubmit={
                longUrl.includes(frontendBaseUrl)
                  ? handleGetStats
                  : handleSubmit
              }
              className="flex flex-col md:flex-row max-w-[900px] w-full p-4 items-start justify-center gap-2"
            >
              <input
                type="text"
                placeholder="https://loooooongwebsite.com/longestever"
                className="p-2 rounded-md border w-full md:max-w-[80%]"
                defaultValue={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
              />
              {longUrl.includes(frontendBaseUrl) ? (
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 w-full rounded-md md:max-w-[20%]"
                >
                  Get Stats
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 w-full rounded-md md:max-w-[20%]"
                >
                  Shorten!
                </button>
              )}
            </form>
            {isLoadingDetails == "success" && (
              <p>This URL has been clicked {numberOfClicks} times</p>
            )}
          </div>
        )
      ) : (
        <div className="flex flex-col justify-center items-center p-4 gap-2">
          <p>This is your short URL:</p>
          <br />
          <div className="flex gap-2 justify-center items-center">
            <a className="underline text-blue-600" href={shortUrl}>
              {shortUrl}
            </a>
            <button
              onClick={copyToClipboard}
              className="bg-gray-600 text-white px-4 py-2 rounded-md"
              disabled={copied}
            >
              {copied ? "Done" : "Copy"}
            </button>
            <button
              onClick={() => navigate("/home")}
              className="bg-gray-600 text-white px-4 py-2 rounded-md"
              disabled={copied}
            >
              Try Again?
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
