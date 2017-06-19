import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import WxApp from './components/WxApp';

ReactDOM.render(<WxApp />, document.getElementById('root'));
registerServiceWorker();
