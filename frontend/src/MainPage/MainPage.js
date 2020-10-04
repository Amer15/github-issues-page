import React, { Component } from 'react';
import Header from '../components/Header/Header';
import IssueList from '../components/IssueList/IssueList';
import Pagination from '../components/Pagination/Pagination';
import './MainPage.css';


const API = process.env.REACT_APP_SERVER_URL;

class MainPage extends Component {
    constructor() {
        super();

        this.state = {
            allIssues: [],
            loading: false,
            searchValue: '',
            currentPage: 1,
            totalIssues: 0,
            issuesPerPage: 5,
            totalFetchedIssues: 0
        }
    }

    loadAllIssues = () => {
        return fetch(`${API}/issues`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                // console.log(data);
                const fetchedIssues = data.issues;
                const fetchedIssuesLength = data.issues.length;
                this.setState({
                    allIssues: fetchedIssues,
                    totalIssues: fetchedIssuesLength,
                    totalFetchedIssues: fetchedIssuesLength
                });
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.loadAllIssues();
    }


    onSearchHandler = (e) => {
        // console.log(e.target.value);
        let searchVal = e.target.value.toLowerCase();
        let count = 0;

        if (this.state.totalIssues > 0) {
            this.state.allIssues.forEach(issue => {
                if (issue.title.toLowerCase().includes(searchVal)) {
                    count++;
                }
            });
        }

          //Update searchValue and totalIssues count to no of matched issues
          this.setState({
            searchValue: e.target.value,
            totalIssues: count
        });
    }


    paginateHandler = number => {
        this.setState({
            currentPage: number
        })
    }

    filterChangeHandler = (type) => {
        if (type !== 'Filters') {
            return fetch(`${API}/issues?state=${type}`)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    // console.log(data);
                    const fetchedIssues = data.issues;
                    const fetchedIssuesLength = data.issues.length;
                    this.setState({
                        allIssues: fetchedIssues,
                        totalIssues: fetchedIssuesLength
                    });
                })
                .catch(err => console.log(err));
        }
        else {
            this.loadAllIssues();
        }
    }



    render() {
        //Calculate Index Of First and Last Issue Per Page
        const indexOfLastIssue = this.state.currentPage * this.state.issuesPerPage;
        const indexofFirstIssue = indexOfLastIssue - this.state.issuesPerPage;
        const currentIssues = this.state.allIssues.slice(indexofFirstIssue, indexOfLastIssue);


        //Loop and render IssueLists
        // let Issues = this.state.allIssues ? currentIssues.map(issue => {
        //     return <IssueList
        //     key={issue._id}
        //     issueId={issue._id}
        //     title={issue.title}
        //     state={issue.state}
        //     postedBy={issue.postedBy} />
        // }) : 'Add Issue';

        //Loop and render IssueLists 
        let Issues = this.state.allIssues ? currentIssues.map(issue => {
            if (this.state.searchValue) {
                if (issue.title.toLowerCase().includes(this.state.searchValue.toLowerCase())) {
                    return <IssueList
                        key={issue._id}
                        issueId={issue._id}
                        state={issue.state}
                        title={issue.title}
                        postedBy={issue.postedBy} />
                }

            }
            else {
                return <IssueList
                    key={issue._id}
                    issueId={issue._id}
                    title={issue.title}
                    state={issue.state}
                    postedBy={issue.postedBy} />
            }
        }) : 'Add Issue';

        //Count for Open and closed Issues
        let openIssueCount = 0;
        let closedIssueCount = 0;
        if (this.state.allIssues) {
            this.state.allIssues.forEach(issue => {
                if (issue.state === 'open') {
                    openIssueCount++;
                }
                else if (issue.state === 'closed') {
                    closedIssueCount++;
                }
            });
        }


        return (
            <div className='main-container'>
                <Header
                    onSearchHandler={this.onSearchHandler}
                    onFilterHandler={this.filterChangeHandler} />
                <div className='Issue-lists'>
                    <div className='issue-count'>
                        <span className='open'>
                            <i className="fa fa-exclamation-circle" aria-hidden="true">
                            </i> {openIssueCount} Open</span>
                        <span className='closed'>
                            <i className="fa fa-check" aria-hidden="true">
                            </i> {closedIssueCount} Closed</span>
                    </div>

                    <ul className='issues'>
                        {Issues}
                    </ul>
                </div>
                <Pagination
                    totalIssues={this.state.totalIssues}
                    issuesPerPage={this.state.issuesPerPage}
                    currentPage={this.state.currentPage}
                    paginate={this.paginateHandler} />
            </div>
        );
    }
}


export default MainPage;
