import React,{ Component } from 'react';
import {Link} from 'react-router-dom';
import './Header.css';



class Header extends Component{
    onChangeHandler = (e) => {
       this.props.onFilterHandler(e.target.value);
    }

    render(){
        return(
           <div className='header'>
               <div className='search-bar'>
                   <select className='filters' onChange={(e) => this.onChangeHandler(e)}>
                       <option >Filters</option>
                       <option value='open'>Open</option>
                       <option value='closed'>Closed</option>
                   </select>
                   <input 
                   type='text' 
                   placeholder=' search issue'
                   onChange={e => this.props.onSearchHandler(e)}/>
               </div>
               <div className='button-wrapper'>
                <Link to='/add-issue'>
                 <button className='btn'>New issue</button>
                </Link>
               </div>
           </div>
        );
    }
}

export default Header;