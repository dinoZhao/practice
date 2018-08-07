require('./style/index.scss')
import ReactDOM from 'react-dom';
import React from 'react';
//import App from './App.jsx';
import('./add.js').then(add=>add)
document.getElementById("logo").src='./static/images/logo.png'

//ReactDOM.render(<App />, document.getElementById('root'));




var BB=function(){
	return <div>4444</div>
}

ReactDOM.render( <BB>555555</BB>, document.getElementById('root'));

  