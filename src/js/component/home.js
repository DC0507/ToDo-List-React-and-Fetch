import React from "react";
import { ToDoList } from "./dynamicToDoList";

export const Home = () => {
	return (
		<div className="container card">
			<h1>To Do List</h1>
			<ToDoList />
		</div>
	);
};
