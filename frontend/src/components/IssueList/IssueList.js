import React from 'react';
import { Link } from 'react-router-dom';
import './IssueList.css';


const IssueList = props => {
  return(
      <li className='issueList'>
          <h4>
          {props.state === 'open' ? <i className="fa fa-exclamation-circle" style={{'color':'#5ebd74'}} aria-hidden="true"></i> : <i className="fa fa-check" style={{'color': 'salmon'}} aria-hidden="true"></i>}   
           <Link className='nav-link' to={`/issue/${props.issueId}`}>{props.title}</Link>
          </h4>
          <p>opened by {props.postedBy}</p>
      </li>
  )
};


export default IssueList;