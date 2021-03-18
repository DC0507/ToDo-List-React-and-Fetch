import React from "react";
import { ToDoList } from "./dynamicToDoList";

export const Home = () => {
	return (
		<div className="container card text-center bg-dark text-white w-25 mt-5">
			<h1>To Do List</h1>
			<ToDoList />
		</div>
	);
};
