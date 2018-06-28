require('./index.scss')
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App.jsx';

import('./add.js').then(add=>add)
ReactDOM.render(<App />, document.getElementById('root'));

