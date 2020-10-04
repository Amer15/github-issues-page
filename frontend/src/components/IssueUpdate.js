import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const API = process.env.REACT_APP_SERVER_URL;

class IssueUpdate extends Component {
    constructor() {
        super();

        this.state = {
            title: '',
            issue: '',
            postedBy: '',
            state: '',
            url: '',
            loading: false
        }
    }

    componentDidMount() {
        //   console.log('DID MOUNT') ;
        this.setState({
            loading: true
        });

        const issueId = this.props.match.params.id;
        fetch(`${API}/issue/${issueId}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                //    console.log(data);
                this.setState({
                    title: data.title,
                    issue: data.issue,
                    postedBy: data.postedBy,
                    state: data.state,
                    url: data.url,
                    loading: false
                })
            })
            .catch(err => console.log(err));
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    onSubmitHandler = (e) => {
        e.preventDefault();

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

        // console.log(obj);

        const id = this.props.match.params.id;

        return fetch(`${API}/update-issue/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    this.setState({
                        title: '',
                        issue: '',
                        postedBy: '',
                        state: '',
                        url: '',
                        loading: false
                    });
                }
                this.setState({
                    title: '',
                    issue: '',
                    postedBy: '',
                    state: '',
                    url: '',
                    loading: false
                });

                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    loading: false
                });

                console.log(err);
            });
    }



    render() {
        let btnText = this.state.loading ? 'Updating...' : 'Update issue';
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
                        <Link to={`/issue/${this.props.match.params.id}`}>
                            <button className='back-btn'>Back to issue</button>
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


export default IssueUpdate;