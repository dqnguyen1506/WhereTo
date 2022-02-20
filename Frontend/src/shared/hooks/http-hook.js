import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]); //variable that will be stored across re-render cycle

  //function never get re-created => avoid inefficent infinite loops
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      //abort controller to cancel http requests modifying states that's unmounted already
      // (i.e., switch to login while all users request is still pulling data)
      //avoid an error
      const httpAbortCtrll = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrll); //add the abort controller for this specific http request

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrll.signal, //connect this request to abort controller
        });

        const responseData = await response.json();

        //delete this request's abort contrroller b/c request went through successfullly
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrll
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    //cleanup function RIGHT BEFORE this component or the outer component(s) that uses it unmounts
    return () => {
      //aborts all request
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
