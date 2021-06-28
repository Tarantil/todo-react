import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemAdd from '../item-add';
import ItemStatusFilter from '../item-status-filter';
export default class App extends Component{
	maxItem = 100;
	state = {
		todoData: [
			this.createTodoItem('Drink'),
			this.createTodoItem('Work'),
			this.createTodoItem('Learn'),
			this.createTodoItem('Dream'),
		],
		term: '',
		filter: 'all' //active, all, done
	}
	createTodoItem(label){
		return {
			label,
			important: false,
			done: false,
			id: this.maxItem++
		}
	}
	deleteItem = (id) =>{
		this.setState(({todoData})=>{
			const idx = todoData.findIndex((el) => el.id === id);
			const todoDataFormated = [ ...todoData.slice(0, idx), ...todoData.slice(idx+1)];
			return{
				todoData: todoDataFormated
			};
		});
	};
	addItem = (text) =>{
		const newItem = this.createTodoItem(text)
		this.setState(({todoData})=>{
			const todoDataFormated = [ ...todoData, newItem];
			return{
				todoData: todoDataFormated
			};
		});
	}
	onToggle(arr, id, propName){
			const idx = arr.findIndex((el) => el.id === id);
			const oldItem = arr[idx];
			const newItem = {...oldItem, [propName]: !oldItem[propName]}
			return [ ...arr.slice(0, idx), newItem, ...arr.slice(idx+1)];
	}
	onToggleImportant = (id) =>{
		this.setState(({todoData})=>{
			return{
				todoData: this.onToggle(todoData, id, 'important')
			};
		})
	}
	onToggleDone = (id) =>{
		this.setState(({todoData})=>{
			return{
				todoData: this.onToggle(todoData, id, 'done')
			};
		})
	}
	searchItem = (term) =>{
		this.setState({term});
	}
	addFilter = (filter) =>{
		this.setState({filter});
	}
	search = (items, term) =>{
		if(term.length === 0){
			return items;
		}
		return items.filter((item)=>{
			return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
		})
	}
	filter = (items, filter) =>{
		switch(filter){
			case 'all':
				return items;
			case 'active':
				return items.filter((el)=>!el.done);
			case 'done':
				return items.filter((el)=>el.done);
			default:
				return items;
		}
	}
	render(){
		const {todoData, term, filter} =this.state;
		const visibleItems = this.filter(this.search(todoData, term), filter);
		const doneCount = todoData.filter((el)=>el.done).length;
		const todoCount = todoData.length-doneCount;
		return (
			<div className='container'>
				<AppHeader todo={todoCount} done={doneCount}/>
				<div className="d-flex">
					<SearchPanel searchItem={this.searchItem} />
					<ItemStatusFilter filter={filter} addFilter={this.addFilter}/>
				</div>
				<TodoList
				todos={visibleItems}
				onDeleted={this.deleteItem}
				onToggleImportant={this.onToggleImportant}
				onToggleDone={this.onToggleDone}/>
				<ItemAdd onAdd={this.addItem}/>
			</div>
		);
	}
}

