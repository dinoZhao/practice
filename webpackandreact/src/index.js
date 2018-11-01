require('./style/index.scss')
import ReactDOM from 'react-dom';
import React from 'react';
//import App from './App.jsx';
import('./add.js').then(add=>add)
document.getElementById("logo").src='./static/images/logo.png'

function CustomTextInput(props) {
  // 这里必须声明 textInput，这样 ref 回调才可以引用它
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={function(val){textInput=val}} />

      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick} 
      />
    </div>
  );  
}
ReactDOM.render(
  <CustomTextInput />,
  document.getElementById('root')
);



