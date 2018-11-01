import React from 'react';


var chil="pp"
var  element = <h1>Hello, world!{chil}</h1>;


function We(){
	return <h1>Hello, world!{chil}</h1>;
}
function foo(){
	return (
		<div>
		<We/>
		<div>544444</div>
		</div>
	)
}

export default foo;
