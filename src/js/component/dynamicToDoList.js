import React, { useState } from "react";
import { useEffect } from "react/cjs/react.production.min";

export const ToDoList = () => {
	let [tasks, setTasks] = useState([]);
	let [inputValue, setInputValue] = useState("");
	//const [listLength, setListLength] = useState(0);

	const addTask = e => {
		if (e.keyCode === 13 && inputValue !== "") {
			const newTask = [tasks.length + 1, inputValue];
			setTasks([...tasks, newTask]);
			setInputValue("");
		}
	};

	const deleteTask = k => {
		const newTasks = tasks.filter(task => task[0] !== k);
		setTasks(newTasks);
	};

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
							onClick={() => deleteTask(task[0])}
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
					<b>{tasks.length} tasks pendings!!</b>
				) : (
					<b>Nothing to do! Yuju!</b>
				)}
			</small>
		</>
	);
};
