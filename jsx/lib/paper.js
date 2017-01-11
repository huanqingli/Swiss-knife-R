/**
 * Created by Muc on 17/1/2.
 */
import React from 'react';
import Radium from 'radium';
import {defaultSetting, paper} from './config'
import transitions from './tools/transitions';
import propTypes from './tools/propTypes';

class Paper extends React.Component {
    render() {
        const {
            circle,
            rounded,
            style,
            transitionEnabled,
            zDepth,
            ...other
        } = this.props;
        const baseStyle = {
            color: paper.color,
            backgroundColor: paper.backgroundColor,
            boxSizing: 'border-box',
            fontFamily: defaultSetting.fontFamily,
            //WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
        };
        const customerStyle = {
            transition: transitionEnabled && transitions.easeOut(),
            boxShadow: paper.zDepthShadows[zDepth - 1], // No shadow for 0 depth papers
            borderRadius: circle ? '50%' : rounded ? '2px' : '0px',
        };
        return (<div {...other} style={[baseStyle, customerStyle, style]}/>)
    }
}
Paper.defaultProps = {
    circle: false,
    rounded: true,
    transitionEnabled: true,
    zDepth: 1,
};
Paper.propTypes = {
    circle: React.PropTypes.bool,
    rounded: React.PropTypes.bool,
    style: React.PropTypes.object,
    transitionEnabled: React.PropTypes.bool,
    zDepth: propTypes.zDepth,
};
export default Paper = Radium(Paper);