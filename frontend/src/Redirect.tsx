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
