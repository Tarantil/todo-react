import React from 'react';

const AppHeader = ({todo = 0, done = 0}) =>{
	return (
		<div className="d-flex justify-content-between align-items-center mb-2">
			<h1>My Todo List</h1>
			<span>{todo} more to do, {done} done</span>
		</div>
	);
};
export default AppHeader;
