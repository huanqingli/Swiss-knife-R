/**
 * Created by Muc on 17/1/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';

class Test extends React.Component{
    constructor(props){
        super(props);
        this.state={
            test:"a"
        };
        this.upData=this.upData.bind(this);
    }
    componentDidMount(){

    }
    upData(){
        console.log(this.state.test);
        this.setState({test:"b"},()=>{console.log(this.state.test);});
        // console.log(this.state.test);
        setTimeout(function () {
            console.log(this.state.test);
        }.bind(this),1000);

    }
    render(){
        return(<div onClick={this.upData}>{this.state.test}</div>)
    }
}

ReactDOM.render(
    <Test/>,
    document.getElementById("test")
);