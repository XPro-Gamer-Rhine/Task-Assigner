import { useState, useEffect } from "react";

const useListTasks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleListTask = () => {
    let myHeaders = new Headers();
    myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch("https://devza.com/tests/tasks/list", requestOptions)
      .then((response) => response.json(), setLoading(true))
      .then((result) => setData(result.tasks), setLoading(false))
      .catch((error) => setError(error));
    if (data === undefined || data === null || data.length <= 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };
  data
    .sort((a, b) => {
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    })
    .reverse();


  useEffect(() => {
    handleListTask();
  }, [data]);

  return [data, loading, error];
};

export default useListTasks;
