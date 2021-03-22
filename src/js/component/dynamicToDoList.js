import React, { useState, useEffect } from "react";

export const ToDoList = () => {
	const url = "https://assets.breatheco.de/apis/fake/todos/user/david100";
	const [tempTasks, setTempTasks] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		checkUser();
		getTasks();
	}, []);

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
		console.log(oldTasks);
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
	};

	const handleAddTask = async e => {
		if (e.keyCode === 13 && inputValue != "") {
			await setTasks([...tasks, { label: inputValue, done: false }]);
			await setInputValue("");
			await updateTasks();
		}
	};

	const handleDeleteTask = async k => {
		const newList = await tasks.filter((task, i) => i != k);
		await setTasks(newList);
		await updateTasks();
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
