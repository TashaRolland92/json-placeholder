import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", completed: false });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users/1/todos?_limit=12')
        .then((response) => {
            const data = response.data;
            setTodos(data);
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
        });
    }, []);

    const toggleCompleted = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleDelete = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        const newTaskData = {
            id: todos.length + 1,
            title: newTask.title,
            completed: newTask.completed,
        };
        setTodos((prevTodos) => [newTaskData, ...prevTodos]);
        setNewTask({ title: "", completed: false });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewTask((prevTask) => ({
            ...prevTask,
            title: value,
        }));
    };

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Link to="/" className="cta">Back</Link>
                    </div>
                    <div className="col-12">
                        <hr />
                        <h1>JSON Todos</h1>
                        <p>See below a dummy list of todos. You can see which tasks have been marked as completed and the tasks that are outstanding. Toggle the tasks to see what happens.</p>
                        <p>Add a new task if you still have more things to do!</p>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <button className="primary-btn accordion-btn mb-3" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? "Close" : "Add Task"}
                        </button>
                        <div className={`accordion-content ${isOpen ? "active" : ""}`}>
                            <form onSubmit={handleAddTask} className="add-task d-flex justify-content-between align-items-center">
                                <input
                                    type="text"
                                    name="title"
                                    id="newTask"
                                    value={newTask.title}
                                    placeholder="Add a new task"
                                    onChange={handleChange}
                                    required
                                />
                                <button className="primary-btn">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <ul className="list-unstyled todo-list">
                            {todos.map((todo) => (
                                <li className={`todo-item ${todo.completed ? "completed" : ""}`} key={todo.id}>
                                    <label className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            name="markAsCompleted"
                                            id="markAsCompleted"
                                            className="checkbox"
                                            checked={todo.completed}
                                            onChange={() => toggleCompleted(todo.id)} />
                                        <span className="checkmark"></span>
                                    </label>
                                    <div className="name-container">
                                        <h2 className="mt-0 me-2">{todo.title}</h2>
                                        <p className="todo-excerpt mb-0">{todo.completed ? 'Completed' : 'Not Completed'} {todo.completed ? '👍' : '👎'}</p>
                                    </div>
                                    <div className="btn-container">
                                        <button className="primary-btn delete" onClick={() => handleDelete(todo.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}