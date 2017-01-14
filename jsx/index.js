/**
 * Created by Muc on 16/12/22.
 */
import React from 'react';
import ReactDOM from 'react-dom'
import {FontIcon, Avatar ,Paper, TextField} from './lib'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {FontIcon, Avatar, Paper} from 'material-ui'
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.state = {
            count: 0
        }
    }

    mouseEnter() {
        var a = this.state.count;
        this.setState({count: a + 1});
        console.log(this.state.count)
    }

    render() {
        const paperStyle1 = {
            width: 100,
            height: 70,
            margin: 20,
            textAlign: "center",
            display: "inline-block",
            verticalAlign:"top",
            lineHeight:"70px"
        };
        const paperStyle2 = {
            width: 300,
            height: 70,
            margin: 20,
            textAlign: "center",
            display: "inline-block",
            verticalAlign:"top",
            lineHeight:"70px"
        };
        return (
            //<MuiThemeProvider>
            <div>
                <Paper zDepth={5} style={paperStyle1}>
                    <FontIcon className="material-icons" color="#0000ff" hoverColor="#ff0000"
                              onMouseEnter={this.mouseEnter} size={30}>computer</FontIcon>
                </Paper>
                <Paper zDepth={5} style={paperStyle2}>
                    <Avatar style={{marginLeft: 5}}>A</Avatar>字母
                    <Avatar style={{marginLeft: 5}} src="img/焕晴的脸萌.jpg"/>图片
                    <Avatar style={{marginLeft: 5}}
                            icon={<FontIcon className="material-icons">computer</FontIcon>}/>图标
                </Paper>
                <Paper zDepth={5} style={paperStyle2}>
                    <TextField hintText="hintText" floatingLabelText="floatingLabelText" />
                </Paper>
            </div>
            // </MuiThemeProvider>
        )
    }
}
ReactDOM.render(
    <Test/>,
    document.getElementById("knife")
);