import React from 'react'

export class Title extends React.Component{
	
  render(){

  	let path=this.props.text.split('/');
  	//console.log(path);
  	if(path[1].length>0){
	    return(
		    <div className={this.props.show?"cornerTitle show":"cornerTitle hide"}>
				<span>|</span>
				<span>{path[1]}</span>
				<span>|</span>			
		    </div>
	   	);
	}else return <div/>;
  }
}

export class CopyRight extends React.Component{
	render(){
		return(
			<div className="copyright">Copyright &copy; MERLIN'S MUSTACHE LAB</div>					
			
		);
	}
}