import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import moment from "moment";
import { TiDelete } from "react-icons/ti";



function App() {
	const [input, setInput] = useState("");
	const [todos, setTodos] = useState([]);

	const Toast = Swal.mixin({
		toast: true,
		position: "top",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
	});


	const submitTodo = async (event) => {
		event.preventDefault();
		await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/todo/add-todo`, {
			'input': input
		}).then(function (response) {
			setInput("");
			Toast.fire({
				icon: "success",
				title: response.data.message
			});
		}).catch(function (error) {
			Toast.fire({
				icon: "error",
				title: "Todo Added failed"
			});
		});

		getAllTodos();
	}



	// Function to fetch todos
	const getAllTodos = async () => {
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/todo/todos`);
			setTodos(res.data.todos);   // Updates state with fetched todos
		} catch (error) {
			console.error("Error fetching todos:", error);
		}
	};
	// Call getAllTodos on component mount
	useEffect(() => {
		getAllTodos();
	}, []); // Empty dependency array ensures this runs only once when the component mounts

	const completeTodo = async (id) => {
		await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/todo/complete-todo/${id}`, {
			'input': input
		}).then(function (response) {
			getAllTodos();
			Toast.fire({
				icon: "success",
				title: response.data.message
			});
		}).catch(function (error) {
			Toast.fire({
				icon: "error",
				title: "Todo Added failed"
			});
		});
	}


	const trashTodo = async (id) => {
		await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/todo/trash-todo/${id}`, {
			'input': input
		}).then(function (response) {
			getAllTodos();
			Toast.fire({
				icon: "success",
				title: response.data.message
			});
		}).catch(function (error) {
			Toast.fire({
				icon: "error",
				title: "Todo Added failed"
			});
		});
	}


	return (
		<>
			<div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
				<div className="px-4 py-2">
					<h1 className="text-gray-800 font-bold text-2xl uppercase">To-Do List</h1>
				</div>
				<form className="w-full max-w-sm mx-auto px-4 py-2" onSubmit={submitTodo}>
					<div className="flex items-center border-b-2 border-teal-500 py-2">
						<input value={input} onChange={e => setInput(e.target.value)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Add a task" />
						<button onClick={(e) => { submitTodo(e) }} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
							Add
						</button>
					</div>
				</form>

				<ul className="divide-y overflow-y-auto h-auto divide-gray-200 px-4">
					{todos.map((todo) => (
						<li className="py-4 flex justify-between" key={todo._id} >
							<div className="flex items-center" onClick={() => { completeTodo(todo._id) }} >
								<input id={`todo${todo._id}`} name={`todo${todo._id}`} type="checkbox" className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" />
								<label htmlFor={`todo${todo._id}`} className="ml-3 block text-gray-900">
									<span className={`text-lg font-medium ${todo.is_complete ? 'line-through' : ''}`}>{todo.input}</span>
									<span className="ml-4 text-sm font-light text-gray-500">{moment(todo.createdAt).format("DD MMM YYYY hh:mm A")}</span>
								</label>
							</div>
							<div onClick={() => trashTodo(todo._id)}>
								<TiDelete className='w-8 h-8 cursor-pointer text-rose-500' />
							</div>
						</li>
					))}
				</ul>
			</div >
		</>
	);
}

export default App;
