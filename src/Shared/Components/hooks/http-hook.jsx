//This is a custom http hook for sending http requests to our backend
//This is created as a hook for reusability, as quite a number of components send http requests
//This has to be a hook instead of a reusable method as state is involved

import { useCallback } from "react";

export const useHttp = () => {
  //useCallback so function doesn't get recreated on rerenders

  //This http request is utilising javascripts fetch api
  //Function is async due to sending http requests which are typically asynchronous
  const sendRequest = useCallback(
    //Set the default parameters which are expected by the fetch api, which is a url, request method (default is set to GET),
    //along with body and headers. Body and headers are null/empty as they not used if the method is GET
    async (url, method = "GET", body = null, headers = {}) => {
      //Try catch as this request can fail
      try {
        // store the response of the request
        //Set the method, body, and headers to the values passed to the function
        const response = await fetch(url, {
          method: method,
          body: body,
          headers: headers,
        });

        //Convert the responseData to a javascript object
        const responseData = await response.json();
        //Basic error handling, checking if the response is successful
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        //Return the response of the http request
        return responseData;
      } catch (err) {
        //log any errors
        console.log(err);
        throw err;
      }
    },
    []
  );
  //return the function which can be then called in other components
  return { sendRequest };
};
