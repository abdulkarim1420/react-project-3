import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import UserProvider from './Pages/Website/Context/UserContext';

import './style.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<Router>
    <UserProvider>
    <App />
    </UserProvider>
</Router>

);


