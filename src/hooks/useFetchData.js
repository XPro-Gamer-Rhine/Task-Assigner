import { useState, useEffect } from "react";

const useFetchData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const UseFetchusers = () => {
    let myHeaders = new Headers();
    myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch("https://devza.com/tests/tasks/listusers", requestOptions)
      .then((response) => response.json())
      .then((result) => setUsers(result.users))
      .catch((error) => setError(error));
    if (users === undefined || users === null) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    UseFetchusers();
  }, []);

  return [users, loading, error];
};

export default useFetchData;
