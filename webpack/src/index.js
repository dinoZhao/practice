import './style.css'
import icon from './2.png'
import printMe from './print.js';
console.log("构建成功")
 function component() {
    var element = document.createElement('div');

  printMe()
    // 将图像添加到我们现有的 div。
    var myIcon = new Image();
    myIcon.src = icon;
 
    element.appendChild(myIcon);

    return element;
  }

  document.body.appendChild(component());