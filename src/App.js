import React from "react";
import "./styles.css";

let localTasks = [];

const tasksAsString = localStorage.getItem("tasks");
if (tasksAsString) {
  localTasks = JSON.parse(tasksAsString);
}

const date = new Date();
const easyDate = date.toDateString();

export default function App() {
  const [toDo, setToDo] = React.useState(localTasks);
  const [newToDo, setNewToDo] = React.useState("");

  function createNewTask() {
    const newTasks = [...toDo, newToDo];
    const tasksAsString = JSON.stringify(newTasks);

    localStorage.setItem("tasks", tasksAsString);
    setToDo(newTasks);
  }

  function deleteToDo(task) {
    const filterItems = toDo.filter(function(item) {
      return item !== task;
    });
    const tasksAsString = JSON.stringify(filterItems);
    localStorage.setItem("tasks", tasksAsString);

    setToDo(filterItems);
  }

  return (
    <div className="App">
      <p className="date">{easyDate}</p>
      <h1>Todays To-Do</h1>

      <div className="input">
        <input
          placeholder="Today I will..."
          value={newToDo}
          onChange={function(event) {
            const inputElement = event.target;
            const newValue = inputElement.value;

            setNewToDo(newValue);
          }}
        />
      </div>
      <div className="addButton">
        <button className="addTask" type="submit" onClick={createNewTask}>
          add task
        </button>
      </div>
      <hr />
      <ul>
        {toDo.map(toDo => {
          return (
            <li className="listItem">
              {toDo}
              <input type="checkbox" className="check" />
              <button
                className="delete"
                onClick={function() {
                  deleteToDo(toDo);
                }}
              >
                delete!
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
