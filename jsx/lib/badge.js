/**
 * Created by Muc on 17/1/15.
 */
import React from 'react';
import Radium from 'radium';
import {badge} from './config'

class Badge extends React.Component {
    render() {
        const {
            badgeContent,
            badgeStyle,
            children,
            primary, // eslint-disable-line no-unused-vars
            secondary, // eslint-disable-line no-unused-vars
            style,
            ...other
        } = this.props;

        const radius = 12;
        const radius2x = Math.floor(2 * radius);
        let badgeBackgroundColor;
        let badgeTextColor;
        if (primary) {
            badgeBackgroundColor = badge.primaryColor;
            badgeTextColor = badge.primaryTextColor;
        } else if (secondary) {
            badgeBackgroundColor = badge.secondaryColor;
            badgeTextColor = badge.secondaryTextColor;
        } else {
            badgeBackgroundColor = badge.color;
            badgeTextColor = badge.textColor;
        }

        const styles={
            root: {
                position: 'relative',
                display: 'inline-block',
                padding: `${radius2x}px ${radius2x}px ${radius}px ${radius}px`,
                lineHeight: "normal",//防止继承line-height引发的样式偏离预期
            },
            badge: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                right: 0,
                fontWeight: badge.fontWeight,
                fontSize: radius,
                width: radius2x,
                height: radius2x,
                borderRadius: '50%',
                backgroundColor: badgeBackgroundColor,
                color: badgeTextColor,
            },
        };

        return (
            <div {...other} style={[styles.root, style]}>
                {children}
                <span style={[styles.badge, badgeStyle]}>
                    {badgeContent}
                </span>
            </div>
        );
    }
}
Badge.defaultProps = {
    primary: false,
    secondary: false,
};
Badge.propTypes = {
    /**
     * This is the content rendered within the badge.
     */
    badgeContent: React.PropTypes.node.isRequired,
    /**
     * Override the inline-styles of the badge element.
     */
    badgeStyle: React.PropTypes.object,
    /**
     * The badge will be added relativelty to this node.
     */
    children: React.PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,
    /**
     * If true, the badge will use the primary badge colors.
     */
    primary: React.PropTypes.bool,
    /**
     * If true, the badge will use the secondary badge colors.
     */
    secondary: React.PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
};

export default Badge = Radium(Badge);