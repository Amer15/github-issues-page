import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './IssuePage.css';


const API = process.env.REACT_APP_SERVER_URL;

class IssuePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        //   console.log('DID MOUNT') 
        const issueId = this.props.match.params.id;
        fetch(`${API}/issue/${issueId}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({
                    data: data
                });
            })
            .catch(err => console.log(err));
    }

    onIssueCloseHandler = (stateType) => {
        const issueId = this.props.match.params.id;
        let obj = { state: stateType };
        return fetch(`${API}/issue/close-issue/${issueId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.error) {
                    console.log('something went wrong', data.error);
                }
                
                const newData = {...this.state.data};
                newData.state = stateType;
                this.setState({
                    data: newData
                });
            })
            .catch(err => console.log(err));
    }

    deleteIssueHandler = () => {
        if (window.confirm('Are you sure, you want to delete this issue?')) {
            const issueId = this.props.match.params.id;
            return fetch(`${API}/delete-issue/${issueId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if (data.error) {
                        console.log('something went wrong', data.error);
                    }

                    this.props.history.push('/');
                })
                .catch(err => console.log(err));
        }
        else {
            console.log('You have cancelled deletion');
        }
    }


    render() {
        let postedBy = this.state.data ? this.state.data.postedBy : 'loading...';
        let issue = this.state.data ? this.state.data.issue : 'loading...';
        let state = this.state.data ? this.state.data.state : 'loading...';
        let updateBtn = 'loading...';
        if (this.state.data) {
            if (this.state.data.state === 'open') {
             updateBtn =    <button
                    className='closeIssue-btn'
                    onClick={() => this.onIssueCloseHandler('closed')}>Close Issue</button>
            }
            else {
            updateBtn  =   <button
                    className='openIssue-btn'
                    onClick={() => this.onIssueCloseHandler('open')}>Open Issue</button>
            }
        }
        return (
            <div className='issue-page-container'>
                <div className='issue-container'>
                    <div>
                        <h1>Issue Page</h1>
                        <h5>opened by {postedBy}</h5>
                        <h5>state : {state}</h5>
                        <p>Issue: {issue}</p>
                    </div>
                    <div className='btn-container'>
                        <Link to={`/update-issue/${this.props.match.params.id}`}>
                            <button className='update-btn'>Update</button>
                        </Link>
                        {updateBtn}
                        <button
                            className='delete-btn'
                            onClick={this.deleteIssueHandler}>Delete</button>
                    </div>
                </div>
                <br />
                <Link to='/'>
                    <button className='back-btn'>Back to home</button>
                </Link>
            </div>
        );
    }
}


export default IssuePage;
