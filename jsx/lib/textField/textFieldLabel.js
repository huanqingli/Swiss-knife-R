/**
 * Created by Muc on 17/1/14.
 */
import React from 'react';
import Radium from 'radium';
import transitions from '../tools/transitions';

const TextFieldLabel = (props) => {
    const {
        className,
        style,
        children,
        htmlFor,
    } = props;

    const defaultStyles = {
        position: 'absolute',
        lineHeight: '22px',
        top: 38,
        transition: transitions.easeOut(),
        zIndex: 1, // Needed to display label above Chrome's autocomplete field background
        transform: 'scale(1) translate(0, 0)',
        transformOrigin: 'left top',
        pointerEvents: 'auto',
        userSelect: 'none',
    };

    const shrinkStyles = props.shrink ? Object.assign({
        transform: 'scale(0.75) translate(0, -28px)',
        pointerEvents: 'none',
    }, props.shrinkStyle) : null;

    return (
        <label
            className={className}
            style={[defaultStyles,style,shrinkStyles]}
            htmlFor={htmlFor}
        >
            {children}
        </label>
    );
};

TextFieldLabel.propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    /**
     * Disables the label if set to true.
     */
    disabled: React.PropTypes.bool,
    /**
     * The id of the target element that this label should refer to.
     */
    htmlFor: React.PropTypes.string,
    /**
     * Callback function for when the label is selected via a touch tap.
     *
     * @param {object} event TouchTap event targeting the text field label.
     */
    shrink: React.PropTypes.bool,
    shrinkStyle: React.PropTypes.object,
    style: React.PropTypes.object,
};

TextFieldLabel.defaultProps = {
    disabled: false,
    shrink: false,
};

//noinspection JSAnnotator
export default TextFieldLabel = Radium(TextFieldLabel);