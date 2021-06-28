import React, { Component } from 'react';

export default class ItemAdd extends Component{
	state = {
		label: ''
	}
	onLabelChange = (e) => {
		this.setState({
			label: e.target.value
		});
	}
	onSubmit = (e) =>{
		e.preventDefault();
		this.props.onAdd(this.state.label);
		this.setState({
			label: ''
		});
	}
	render(){
		return (
			<form className='mt-5 d-flex' onSubmit={this.onSubmit}>
				<input
				type="text"
				className='form-control'
				onChange={this.onLabelChange}
				placeholder='Type here ...'
				value={this.state.label}/>
				<button className="btn btn-outline-secondary">Add</button>
			</form>
		);
	}
}

