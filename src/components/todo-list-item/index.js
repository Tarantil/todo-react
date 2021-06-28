import React from 'react';
import './todo-list-item.css'

const TodoListItem = ({label, onDeleted, onToggleImportant, onToggleDone, done, important}) =>{
		let classNames = '';
		if(done){
			classNames += ' done';
		}
		if(important){
			classNames += ' important';
		}
		return (
			<span className='d-flex align-items-center todo-list-item'>
				<span
					onClick={onToggleDone}
					className={classNames}>
					{label}
				</span>
				<button className="btn btn-outline-danger" onClick={onDeleted}>X</button>
				<button className="btn btn-outline-success m-1" onClick={onToggleImportant}>!!</button>
			</span>
		);
}

export default TodoListItem;
