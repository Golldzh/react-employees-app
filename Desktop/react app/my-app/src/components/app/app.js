import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import Employeeslist from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'Gulzhan D.', salary: 2000, increase: false, rise: false, id: 1},
        {name: 'Bayan A.', salary: 5000, increase: false, rise: false, id: 2},
        {name: 'Assel A.', salary: 3000, increase: false, rise: false, id: 3},
      ],
      term: '',
      filter: ''
    }
    this.maxId = 4;
  }
  deleteItem = (id) => {
    this.setState(({data}) => {
        return {
          data: data.filter(item => item.id !== id)
        }
    })
  }
  addItem = (name, salary) => {
    const newItem = {
        name, 
        salary,
        increase: false,
        rise: false,
        id: this.maxId++
    }
    this.setState(({data}) => {
        const newArr = [...data, newItem];
        return {
            data: newArr
        }
    });
  } 

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item;
      })
    }))
  }
  // onToggleIncrease = (id) => {
  //   this.setState(({data}) => {
  //     const index = data.findIndex(elem => elem.id === id);
  //     const old = data[index];
  //     const newItem = {...old, increase: !old.increase};
  //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
  //     return {
  //       data: newArr
  //     }
  //   })
  // }
  // onToggleRise = (id) => {
  //   this.setState(({data}) => ({
  //     data: data.map(item => {
  //       if (item.id === id) {
  //         return {...item, rise: !item.rise}
  //       }
  //       return item;
  //     })
  //   }))
  // }

  searchEmp = (items, term) => {
    if(term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case  'moreThen1000':
        return items.filter(item => item.salary>1000);
      default:
        return items;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter});
  }
  onChangeSalary = (id, value) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, salary: value.replace(/\D/g, '')}
        }
        return item;
      })
    }))
  }
  render() {
    const {data,term, filter} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);
    return (
      <div className="app">
        <AppInfo
          employees={employees}
          increased={increased}/>
        <div className="search-panel">
          <SearchPanel 
          onUpdateSearch={this.onUpdateSearch}/>
          <AppFilter filter={filter}
          onFilterSelect={this.onFilterSelect}/> 
        </div>
        <Employeeslist 
        data={visibleData}
        onDelete={this.deleteItem}
        onToggleProp={this.onToggleProp}
        onChangeSalary={this.onChangeSalary}/>
        <EmployeesAddForm 
          onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;