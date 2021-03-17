import React, { useState } from "react";

export const ToDoList = () => {
	let [taskList, setTaskList] = useState([]);
	let [inputValue, setInputValue] = useState("");
	//const [listLength, setListLength] = useState(0);

	function updateTask(task) {
		setTaskList(taskList.concat(<li>{task}</li>));
	}

	return (
		<div>
			<input
				type="text"
				onKeyUp={e => updateTask(e.target.inputValue)}
				value={inputValue}
			/>
			{taskList}
		</div>
	);
};
