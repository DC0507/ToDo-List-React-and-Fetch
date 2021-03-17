import React, { useState } from "react";
import { useEffect } from "react/cjs/react.production.min";

export const ToDoList = () => {
	let [tasks, setTasks] = useState([]);
	let [inputValue, setInputValue] = useState("");
	//const [listLength, setListLength] = useState(0);

	const addTask = () => {
		const newTask = [tasks.length + 1, inputValue];

		//setTasks(tasks.concat(inputValue));
		setTasks([...tasks, newTask]);
	};

	const deleteTask = k => {
		const newTasks = tasks.filter(task => task[0] !== k);
		setTasks(newTasks);
	};

	return (
		<>
			<input
				type="text"
				onChange={e => setInputValue(e.target.value)}
				value={inputValue}
				onKeyDown={addTask}
			/>

			<ul>
				{tasks.map(task => (
					<>
						<li
							onClick={() => deleteTask(task[0])}
							key={task[0]}
							style={{ listStyleType: "none" }}>
							{task[1]}
						</li>
						<hr />
					</>
				))}
			</ul>
			<small>
				<b>{tasks.length} tasks pendings!!</b>
			</small>
		</>
	);
};
