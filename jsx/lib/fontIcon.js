/**
 * Created by Muc on 16/12/26.
 */
import React from 'react';
import Radium from 'radium';
import transitions from './tools/transitions';
import {defaultSetting} from './config'

class FontIcon extends React.Component {
    render() {
        const {color, hoverColor, size, style, ...others}=this.props;
        const baseStyle = {
            position: 'relative',
            display: 'inline-block',
            verticalAlign:"middle",
            userSelect: 'none',
            transition: transitions.easeOut(),
        };
        const customerStyle = {
            color: color || defaultSetting.palette.textColor,
            fontSize: size || defaultSetting.spacing.iconSize,
            ':hover': {
                color: hoverColor
            }
        };
        return (<span {...others} style={[baseStyle, customerStyle, style]}/>);
    }
}
FontIcon.propTypes = {
    color: React.PropTypes.string,
    hoverColor: React.PropTypes.string,
    style: React.PropTypes.object
};
export default FontIcon = Radium(FontIcon);