import { useParams } from "react-router";
import { backendBaseUrl } from "./domain";
import { useEffect, useState } from "react";

const Redirect = () => {
  const { shortCode } = useParams();
  const [isError, setIsError] = useState<boolean>(false);

  const getUrl = async () => {
    try {
      const response = await fetch(backendBaseUrl + "/shorten/" + shortCode);
      const data = await response.json();
      const url = data.url;
      console.log("URL fetched from code is->", url);
      console.log("Before redirect->", backendBaseUrl + "/" + shortCode);
      const res = await fetch(backendBaseUrl + "/shorten/" + shortCode, {
        method: "PUT",
        body: JSON.stringify({ url: url }),
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      setIsError(false);
      return url;
    } catch (e) {
      console.log(e);
      setIsError(true);
      return null;
    }
  };

  useEffect(() => {
    getUrl()
      .then((val) => {
        window.location.href = val;
        // console.log("ok redirect now");
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      {!isError ? (
        <p>You are being redirected to original url.</p>
      ) : (
        <p>Oops an Error occurred.</p>
      )}
    </div>
  );
};

export default Redirect;
