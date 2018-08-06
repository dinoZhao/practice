import React from 'react';

//class Clock extends React.Component {
//constructor(props) {
//  super(props);
//  this.state = { date: new Date() }
//}
//componentDidMount(){
//  
//setInterval(()=>{
//this.kick()
//}
//,1000)
//}
//componentWillUnmount(){
//
//}
//kick(){
//this.setState({date:new Date()})
//}
//render() {
//  return (
//    <div>{this.state.date.toString()}</div>
//  )
//}
//}
//
//
//export default function () {
//return (
//  <Clock date={new Date()}></Clock>
//);
//}
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
//class foo extends React.Component{
//	render(){
//	return element
//	}
//}
export default foo;
