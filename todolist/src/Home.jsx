import React, { useEffect, useState } from "react";
import Create from "./Create";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/get")
      .then((result) => {
        setTodos(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put("http://localhost:4000/update/" + id)
      .then((result) => location.reload())
      .catch((err) => console.log(err));
  };

  const handleClick = (id) => {
    axios
      .delete("http://localhost:4000/delete/" + id)
      .then((result) => location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h2>ToDo List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No Records</h2>
        </div>
      ) : (
        todos.map((todo) => {
          return (
            <div className="todo" key={todo._id}>
              <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                {todo.done ? (
                  <BsFillCheckCircleFill className="icon" />
                ) : (
                  <BsCircleFill className="icon" />
                )}

                {<p className={todo.done ? "line_through" : ""}>{todo.task}</p>}
              </div>
              <BsFillTrashFill
                className="icon"
                onClick={() => handleClick(todo._id)}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
