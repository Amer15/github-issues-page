import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AddIssue.css';

const API = process.env.REACT_APP_SERVER_URL;

class AddIssue extends Component {
    constructor() {
        super();

        this.state = {
            title: '',
            issue: '',
            postedBy: '',
            state: 'open',
            url: 'none',
            loading: false
        }
    }


    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    onSubmitHandler = (e) => {
        e.preventDefault();

        //TODO: Add validation check before adding Issue
        if (this.state.title === '' || this.state.title.length < 5) {
            console.log('Title should not be empty or less than 5 characters');
        }

        if (this.state.issue === '' || this.state.issue.length < 5) {
            console.log('Issue should not be empty or less than 5 characters');
        }

        if (this.state.postedBy === '' || this.state.postedBy.length < 5) {
            console.log('postedBy should not be empty or less than 5 characters');
        }

        this.setState({
            loading: true
        });

        const obj = {
            title: this.state.title,
            issue: this.state.issue,
            postedBy: this.state.postedBy,
            url: this.state.url,
            state: this.state.state
        }

        fetch(`${API}/add-issue`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            this.setState({
                title: '',
                issue: '',
                postedBy: '',
                state: 'open',
                url: 'none',
                loading: false
            });

            this.props.history.push('/')

        })
            .catch(error => {
                console.log(error);
                this.setState({
                    title: '',
                    issue: '',
                    postedBy: '',
                    state: 'open',
                    url: 'none',
                    loading: false
                })
            });

    }




    render() {
        let btnText = this.state.loading ? 'Submitting...' : 'Submit new issue';
        return (
            <div className='main-addissue-container'>
                <div className='addissue-container'>
                    <div className='input-fileds'>
                        <input
                            type='text'
                            placeholder='Title'
                            name='title'
                            autoComplete='off'
                            value={this.state.title}
                            onChange={(e) => this.onChangeHandler(e)} />
                        <p>Write issue</p>
                        <textarea
                            cols=''
                            rows='10'
                            name='issue'
                            placeholder='Leave a comment'
                            value={this.state.issue}
                            onChange={this.onChangeHandler}></textarea>
                        <br />
                        <input
                            type='text'
                            placeholder='enter your name'
                            name='postedBy'
                            value={this.state.postedBy}
                            onChange={(e) => this.onChangeHandler(e)} />
                    </div>
                    <div className='btns-container'>
                        <Link to='/'>
                            <button className='back-btn'>Back to home</button>
                        </Link>
                        <button
                            type='submit'
                            className='add-btn'
                            onClick={e => this.onSubmitHandler(e)}>{btnText}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddIssue;
