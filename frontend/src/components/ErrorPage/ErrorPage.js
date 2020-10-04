import React from 'react';
import { Link } from 'react-router-dom';


const ErrorPage = () => {
    return (
        <>
            <h4>Error 404</h4>
            <h1>Page not found </h1>
            <Link exact to='/'>Go back to Home</Link>
        </>
    );
}


export default ErrorPage;
