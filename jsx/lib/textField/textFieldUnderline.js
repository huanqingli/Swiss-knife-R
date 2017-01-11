/**
 * Created by Muc on 17/1/10.
 */
import React from 'react';
import Radium from 'radium';
import {textField} from '../config'
import transitions from '../tools/transitions';
class TextFieldUnderline extends React.Component{
    render(){
        const {
            disabled,
            disabledStyle,
            error,
            errorStyleColor,
            focus,
            focusStyle,
            style,
        } = this.props;
        const styles = {
            root: {
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                borderBottom: 'solid 1px',
                borderColor: textField.borderColor,
                bottom: 8,
                boxSizing: 'content-box',
                margin: 0,
                position: 'absolute',
                width: '100%',
            },
            disabled: {
                borderBottom: 'dotted 2px',
                borderColor: textField.disabledTextColor,
            },
            focus: {
                borderBottom: 'solid 2px',
                borderColor: textField.focusColor,
                transform: 'scaleX(0)',
                transition: transitions.easeOut(),
            },
            error: {
                borderColor: errorStyleColor ? errorStyleColor : textField.errorColor,
                transform: 'scaleX(1)',
            },
        };
        let underline=[styles.root, style];
        let focusedUnderline = [underline, styles.focus, focusStyle];

        if (disabled) underline = [underline, styles.disabled, disabledStyle];
        if (focus) focusedUnderline = [focusedUnderline, {transform: 'scaleX(1)'}];
        if (error) focusedUnderline = [focusedUnderline, styles.error];
        return (
            <div>
                <hr style={underline} />
                <hr style={focusedUnderline} />
            </div>
        );
    };
}
TextFieldUnderline.defaultProps = {
    disabled: false,
    disabledStyle: {},
    error: false,
    errorStyleColor: "",
    focus: false,
    focusStyle: {},
    style: {},
};
export default TextFieldUnderline = Radium(TextFieldUnderline);