import React from 'react';
import './Pagination.css';



const Pagination = ({ issuesPerPage, totalIssues, paginate, currentPage }) => {
    //Taking numbers of Pages in Array
    let pageNumbers = [];

    //Pushing num of Page numbers in array
    for (let i = 1; i <= Math.ceil(totalIssues / issuesPerPage); i++) {
        pageNumbers.push(i);
    }

    const pagination = (number) => {
        paginate(number);
    }

    const previousPageHandler = () => {
      if(currentPage > 1){
        paginate(--currentPage);
      }
    }

    const nextPageHandler = () => {
        if(currentPage < pageNumbers[pageNumbers.length - 1]){
          paginate(++currentPage);
        }
      }


    return (
        <div className='pageNumbers-container'>
            <button className={currentPage > 1 ? 'pageNav-Btn' : 'pageNav-Btn-not-allowed'} onClick={previousPageHandler}><i className="fa fa-chevron-left" aria-hidden="true"></i> Previous</button>
            {pageNumbers.length > 0 ? (
                pageNumbers.map((number, index) => {
                    return (
                        <a 
                        href='#' 
                        key={index}
                        onClick={() => pagination(number)} 
                        className='pageNumber'>
                            {number}
                        </a>);
                })
            ) : null}
            <button className={ currentPage < pageNumbers[pageNumbers.length - 1] ? 'pageNav-Btn' : 'pageNav-Btn-not-allowed'} onClick={nextPageHandler}>Next <i class="fa fa-chevron-right"></i></button>
        </div>
    );
}

export default Pagination;
