import React, { useState, useEffect } from "react";

export const ToDoList = () => {
	let [tasks, setTasks] = useState([]);
	let [inputValue, setInputValue] = useState("");
	let [tasksToSend, setTasksToSend] = useState([]);
	let [genKey, setGenKey] = useState(0);

	let todos;
	const url = "https://assets.breatheco.de/apis/fake/todos/user/dc0507";

	useEffect(() => {
		fetch(url, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(r => {
			//r.ok
			//	? console.log("User created successfully!")
			//	: console.log("User already exists!");
			fetch(url, {
				method: "GET",
				body: JSON.stringify(todos),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(r => r.json())
				.then(body => {
					setTasksToSend(body);
					setTasks(body.map(task => task.label));
				});
		});
	});

	//console.log("tasktosend:", tasksToSend);
	const addTask = e => {
		if (e.keyCode === 13 && inputValue !== "") {
			setGenKey(genKey + 1);
			const newTask = [genKey, inputValue];
			const newTaskToSend = { label: inputValue, done: false };
			setTasks([...tasks, newTask]);
			setTasksToSend([...tasksToSend, newTaskToSend]);
			setInputValue("");
			//console.log(tasks);
		}
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(tasksToSend),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(r => {
			r.ok
				? console.log("Data is updated!")
				: console.log("Error!! Data couldn't be updated!");
		});
	};

	const deleteTask = k => {
		const newTasks = tasks.filter(task => task[0] !== k);
		setTasks(newTasks);
		const newTasksToSend = newTasks.map(task => ({
			label: task[1],
			done: false
		}));
		setTasksToSend(newTasksToSend);
		//console.log(tasks);
	};
	console.log(tasks);
	console.log(tasksToSend);
	return (
		<>
			<input
				className="my-3"
				type="text"
				onChange={e => setInputValue(e.target.value)}
				value={inputValue}
				onKeyDown={addTask}
				placeholder={inputValue === "" ? "Add a new task..." : ""}
			/>

			<ul className="p-0">
				{tasks.map(task => (
					<>
						<li
							className="card bg-success text-left"
							onClick={e => deleteTask(task[0])}
							key={task[0]}
							style={{ listStyleType: "none" }}>
							{task[1]}
						</li>
						<hr />
					</>
				))}
			</ul>
			<hr style={{ borderTop: "3px dashed" }} />
			<small className="mb-3">
				{tasks.length > 0 ? (
					<b>{tasks.length} task(s) pending!!</b>
				) : (
					<b>Nothing to do! Yuju!</b>
				)}
			</small>
		</>
	);
};
