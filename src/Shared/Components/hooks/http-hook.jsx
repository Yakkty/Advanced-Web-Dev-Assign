import { useCallback } from "react";

export const useHttp = () => {
  //useCallback so function doesn't get recreated on rerenders
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      try {
        const response = await fetch(url, {
          method: method,
          body: body,
          headers: headers,
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        return responseData;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    []
  );
  return { sendRequest };
};
