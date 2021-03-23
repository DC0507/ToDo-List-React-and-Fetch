import React, { useState, useEffect } from "react";

export const ToDoList = () => {
	const url = "https://assets.breatheco.de/apis/fake/todos/user/david100";
	const [tasks, setTasks] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(async () => {
		await checkUser();
		getTasks();
	}, []);

	useEffect(() => {
		updateTasks();
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

	const deleteAll = async e => {
		setTasks([]);
		const data = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		});
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
		<>
			<input
				className="my-3"
				type="text"
				onChange={e => setInputValue(e.target.value)}
				onKeyUp={handleAddTask}
				placeholder={inputValue === "" ? "Add a new task..." : ""}
				value={inputValue}
			/>

			<ul className="p-0">
				{tasks.map((task, i) => (
					<li
						className="card bg-success text-left my-3"
						style={{ listStyleType: "none" }}
						onClick={() => handleDeleteTask(i)}
						key={i}>
						{task.label}
					</li>
				))}
			</ul>
			<hr style={{ borderTop: "3px dashed" }} />
			<>
				<button
					type="button"
					className="btn btn-danger w-50 mx-auto"
					onClick={deleteAll}>
					Clear List
				</button>
				<small className="my-3">
					{tasks.length > 0 ? (
						<b>{tasks.length} tasks pendings!!</b>
					) : (
						<b>Nothing to do! Yuju!</b>
					)}
				</small>
			</>
		</>
	);
};
