/**
 * Created by Muc on 17/1/2.
 */
import React from 'react';
import Radium from 'radium';
import {avatar} from './config'

class Avatar extends React.Component {
    render() {
        const {
            color,
            backgroundColor,
            size,
            icon,
            src,
            style,
            ...other
        } = this.props;
        const baseStyle = {
            userSelect: 'none',
            verticalAlign:"middle",
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
        };
        const customerStyle = {
            color: color || avatar.color,
            backgroundColor: backgroundColor || avatar.backgroundColor,
            fontSize: size / 2,
            height: size,
            width: size,
        };
        const iconStyle = {
            color: color || avatar.color,
            width: size * 0.6,
            height: size * 0.6,
            fontSize: size * 0.6,
            margin: size * 0.2,
        };
        if (src) {
            return (
                <img
                    style={[baseStyle, customerStyle, style]}
                    {...other}
                    src={src}
                />
            );
        } else {
            return (
                <div
                    {...other}
                    style={[baseStyle, customerStyle, style]}
                >
                    {icon && React.cloneElement(icon, {
                        style: [icon.props.style, iconStyle]
                    })}
                    {this.props.children}
                </div>
            );
        }
    }
}
Avatar.defaultProps = {
    size: 40
};
Avatar.propTypes = {
    backgroundColor: React.PropTypes.string,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    color: React.PropTypes.string,
    icon: React.PropTypes.element,
    size: React.PropTypes.number,
    src: React.PropTypes.string,
    style: React.PropTypes.object,
};
export default Avatar = Radium(Avatar);