import React from 'react';
import ReactDOM from 'react-dom';
import './vendors.jsx';

import CounterComponent from './components/counter/component.jsx';

let app = document.getElementById('app');
ReactDOM.render(<CounterComponent />, app);