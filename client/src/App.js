/* eslint-disable */

//import logo from './logo.svg';
import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const SERVER_URL = "http://localhost:4000/api/todo";

function App() {
  const [todoList, setTodoList] = useState([]);

  console.log("App Started");

  //   fetch사용
  // const getFetchData = () => {
  //   const option = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   fetch(SERVER_URL, option)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setTodoList(data);
  //     });
  // };

  // axios 사용
  const getFetchData = async () => {
    const response = await axios.get(SERVER_URL);
    setTodoList(response.data);
  };

  useEffect(() => {
    console.log("useEffect started");
    getFetchData;
  }, []);

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   console.log("onSubmitHandler");
  //   const text = e.target.text.value;
  //   const done = e.target.done.checked;
  //   fetch(SERVER_URL, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       text,
  //       done,
  //     }),
  //   }).then(() => {
  //     getFetchData();
  //     e.target.text.value = "";
  //   });
  // };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("onSubmitHandler");
    const text = e.target.text.value;
    const done = false;

    await axios.post(SERVER_URL, { text, done });

    getFetchData();
    e.target.text.value = "";
  };

  const delHandel = (e) => {
    //e.preventDefault();
    console.log("delHandel");
    console.log(e.target.id);

    const delid = e.target.id;
    const fetchUrl = "http://localhost:4000/api/tododel/" + delid;
    console.log("fetchUrl:" + fetchUrl);
    fetch(fetchUrl).then(() => {
      getFetchData();
    });
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form onSubmit={onSubmitHandler}>
        <input type="text" name="text" style={{ width: 300, height: 25 }} />
        &nbsp;
        <input type="submit" value="add" />
      </form>
      <br />
      <form onSubmit={delHandel}>
        {todoList?.map((item, idx) => (
          <div key={idx} class="colorBox2">
            <li>
              {item.text}&nbsp;
              <input type="button" id={item.id} onClick={delHandel} value="X" />
            </li>
          </div>
        ))}
      </form>
    </div>
  );
}

export default App;
