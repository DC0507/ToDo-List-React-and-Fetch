import React, { useState, useEffect } from "react";

export const ToDoList = () => {
	const url = "https://assets.breatheco.de/apis/fake/todos/user/david100";
	const [tasks, setTasks] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		checkUser();
		getTasks();
	}, []);

	useEffect(() => {
		updateTasks();
		deleteAll();
	}, [tasks]);

	const checkUser = async () => {
		const data = await fetch(url, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		});
	};

	const getTasks = async () => {
		const data = await fetch(url);
		const oldTasks = await data.json();
		console.log("GET:", oldTasks);
		setTasks(oldTasks);
	};

	const updateTasks = async () => {
		const data = await fetch(url, {
			method: "PUT",
			body: JSON.stringify(tasks),
			headers: {
				"Content-Type": "application/json"
			}
		});
		console.log("Tasks:", tasks);
	};

	const deleteAll = async () => {
		if (tasks.length == 1) {
			const data = await fetch(url, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			});
		}
	};

	const handleAddTask = async e => {
		if (e.keyCode === 13 && inputValue != "") {
			setTasks([...tasks, { label: inputValue, done: false }]);
			setInputValue("");
		}
	};

	const handleDeleteTask = async k => {
		const newList = tasks.filter((task, i) => i != k);
		setTasks(newList);
	};

	return (
		<div>
			<input
				onChange={e => setInputValue(e.target.value)}
				onKeyUp={handleAddTask}
				type="text"
				placeholder={inputValue === "" ? "Add a new task..." : ""}
				value={inputValue}></input>
			<ul>
				{tasks.map((task, i) => (
					<li onClick={() => handleDeleteTask(i)} key={i}>
						{task.label}
					</li>
				))}
			</ul>
		</div>
	);
};
