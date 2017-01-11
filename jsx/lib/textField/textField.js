/**
 * Created by Muc on 17/1/7.
 */
import React from 'react';
import Radium from 'radium';
import {defaultSetting, textField} from '../config'
import transitions from '../tools/transitions';
import TextFieldUnderline from './textFieldUnderline'

function isValid(value) {
    return value !== '' && value !== undefined && value !== null;
}

class TextField extends React.Component {
    constructor(props){
        super(props);
        this.handleInputBlur=this.handleInputBlur.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleInputFocus=this.handleInputFocus.bind(this);
        this.state = {
            isFocused: false,
            errorText: undefined,
            hasValue: false,
        };
    }
    componentWillMount() {
        this.uniqueId = `${this.props.floatingLabelText}-${
            Math.floor(Math.random() * 0xFFFF)}`;
    }

    handleInputBlur(event) {
        this.setState({isFocused: false});
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    };

    handleInputChange(event) {
        this.setState({hasValue: isValid(event.target.value)});
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    };

    handleInputFocus(event) {
        if (this.props.disabled) {
            return;
        }
        this.setState({isFocused: true});
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    };

    render() {
        const {
            children,
            className,
            disabled,
            errorStyleColor,
            errorText, // eslint-disable-line no-unused-vars
            floatingLabelFixed,
            floatingLabelFocusStyle,
            floatingLabelShrinkStyle,
            floatingLabelStyle,
            floatingLabelText,
            fullWidth, // eslint-disable-line no-unused-vars
            hintText,
            hintStyle,
            id,
            inputStyle,
            multiLine,
            onBlur, // eslint-disable-line no-unused-vars
            onChange, // eslint-disable-line no-unused-vars
            onFocus, // eslint-disable-line no-unused-vars
            style,
            type,
            underlineDisabledStyle,
            underlineFocusStyle,
            underlineShow,
            underlineStyle,
            rows,
            rowsMax,
            textareaStyle,
            ...other
        } = this.props;
        const styles = {
            base: {
                fontSize: 16,
                lineHeight: '24px',
                width: fullWidth ? '100%' : 256,
                height: (rows - 1) * 24 + (floatingLabelText ? 72 : 48),
                display: 'inline-block',
                position: 'relative',
                backgroundColor: textField.backgroundColor,
                fontFamily: defaultSetting.fontFamily,
                transition: transitions.easeOut('200ms', 'height'),
                cursor: disabled ? 'not-allowed' : 'auto',
            },
            error: {
                position: 'relative',
                bottom: 2,
                fontSize: 12,
                lineHeight: '12px',
                color: textField.errorColor,
                transition: transitions.easeOut(),
            },
            floatingLabel: {
                color: disabled ? textField.disabledTextColor : textField.floatingLabelColor,
                pointerEvents: 'none',
            },
            input: {
                padding: 0,
                position: 'relative',
                width: '100%',
                height:"100%",
                border: 'none',
                outline: 'none',
                backgroundColor: 'rgba(0,0,0,0)',
                color: disabled ? textField.disabledTextColor : textField.textColor,
                cursor: 'inherit',
                font: 'inherit',
                WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated style).
            },
            inputNative: {
                appearance: 'textfield', // Improve type search style.
            },
        };
        const inputId = id || this.uniqueId;
        const inputProps = {
            id: inputId,
            ref: (elem) => this.input = elem,
            disabled: disabled,
            onBlur: this.handleInputBlur,
            onChange: this.handleInputChange,
            onFocus: this.handleInputFocus,
        };
        let inputElement = multiLine ? (
            <EnhancedTextarea
                style={childStyleMerged}
                textareaStyle={Object.assign(styles.textarea, styles.inputNative, textareaStyle)}
                rows={rows}
                rowsMax={rowsMax}
                {...other}
                {...inputProps}
                onHeightChange={this.handleHeightChange}
            />
        ) : (
            <input
                type={type}
                style={[styles.inputNative, styles.input, inputStyle]}
                {...other}
                {...inputProps}
            />
        );
        return (<div className={className} style={[styles.base,style]}>

            {inputElement}
            {underlineShow ?
                <TextFieldUnderline
                    disabled={disabled}
                    disabledStyle={underlineDisabledStyle}
                    error={!!this.state.errorText}
                    errorStyleColor={errorStyleColor}
                    focus={this.state.isFocused}
                    focusStyle={underlineFocusStyle}
                    style={underlineStyle}
                /> :
                null
            }

        </div>)
    }
}
TextField.defaultProps = {
    disabled: false,
    floatingLabelFixed: false,
    multiLine: false,
    fullWidth: false,
    type: 'text',
    underlineShow: true,
    rows: 1,
};
export default TextField = Radium(TextField);