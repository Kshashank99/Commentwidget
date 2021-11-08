import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { useState } from "react";
// const App = () => {
// 	const [name, setName] = useState("");
// 	const [pwd, setPwd] = useState("");

// 	const handle = () => {
// 		localStorage.setItem("Name", name);
// 		localStorage.setItem("Password", pwd);
// 	};
// 	const remove = () => {
// 		localStorage.removeItem("Name");
// 		localStorage.removeItem("Password");
// 	};
// 	return (
// 		<div className='App'>
// 			<h1>Name of the user:</h1>
// 			<input
// 				placeholder='Name'
// 				value={name}
// 				onChange={(e) => setName(e.target.value)}
// 			/>
// 			<h1>Password of the user:</h1>
// 			<input
// 				type='password'
// 				placeholder='Password'
// 				value={pwd}
// 				onChange={(e) => setPwd(e.target.value)}
// 			/>
// 			<div>
// 				<button onClick={handle}>Done</button>
// 			</div>
// 			{localStorage.getItem("Name") && (
// 				<div>
// 					Name: <p>{localStorage.getItem("Name")}</p>
// 				</div>
// 			)}
// 			{localStorage.getItem("Password") && (
// 				<div>
// 					Password: <p>{localStorage.getItem("Password")}</p>
// 				</div>
// 			)}
// 			<div>
// 				<button onClick={remove}>Remove</button>
// 			</div>
// 		</div>
// 	);
// };

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
