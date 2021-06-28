import React, { Component } from 'react';

export default class SearchPanel extends Component{
	state = {
		term: ''
	}
	inputSearch = (e) =>{
		const term = e.target.value
		this.setState({term})
		this.props.searchItem(term);
	}
	render(){
		return (
				<input type="text" placeholder='search' className='form-control' onChange={this.inputSearch} value={this.state.term}/>
		);
	}
}
