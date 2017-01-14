/**
 * Created by Muc on 17/1/7.
 */
import React from 'react';
import Radium from 'radium';
import {defaultSetting, textField} from '../config'
import transitions from '../tools/transitions';
import TextFieldHint from './textFieldHint';
import TextFieldUnderline from './textFieldUnderline'
import TextFieldLabel from './textFieldLabel'

function isValid(value) {
    return value !== '' && value !== undefined && value !== null;
}
const rowsHeight = 24;

class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputBlur = this.handleInputBlur.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.state = {
            isFocused: false,
            errorText: undefined,
            hasValue: false,
        };
    }

    componentWillMount() {
        this.uniqueId = `${this.props.floatingLabelText}-${
            Math.floor(Math.random() * 0xFFFF)}`;
        this.setState({
            errorText: this.props.errorText,
            hasValue: isValid(this.props.value) || isValid(this.props.defaultValue),
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errorText !== this.props.errorText) {
            this.setState({
                errorText: nextProps.errorText,
            });
        }

        if (nextProps.children && nextProps.children.props) {
            nextProps = nextProps.children.props;
        }

        if (nextProps.hasOwnProperty('value')) {
            const hasValue = isValid(nextProps.value);

            this.setState({
                hasValue: hasValue,
            });
        }
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
                color: errorStyleColor || textField.errorColor,
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
                height: "100%",
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
            textarea: {
                marginTop: floatingLabelText ? 36 : 12,
                marginBottom: floatingLabelText ? -36 : -12,
                boxSizing: 'border-box',
                font: 'inherit',
                height: rows * rowsHeight,
                resize: 'none',
            }
        };

        if (this.state.isFocused) {
            styles.floatingLabel.color = textField.focusColor;
        }

        if (floatingLabelText) {
            styles.input.boxSizing = 'border-box';

            if (!multiLine) {
                styles.input.marginTop = 14;
            }

            if (this.state.errorText) {
                styles.error.bottom = !props.multiLine ? styles.error.fontSize + 3 : 3;
            }
        }

        if (this.state.errorText) {
            if (state.isFocused) {
                styles.floatingLabel.color = styles.error.color;
            }
        }
        const inputId = id || this.uniqueId;
        const inputProps = {
            id: inputId,
            ref: (elem) => this.input = elem,
            disabled: disabled,
            onBlur: this.handleInputBlur,
            onChange: this.handleInputChange,
            onFocus: this.handleInputFocus,
        };
        const floatingLabelTextElement = floatingLabelText && (
                <TextFieldLabel
                    style={[styles.floatingLabel, floatingLabelStyle, this.state.isFocused ? floatingLabelFocusStyle : null]}
                    shrinkStyle={floatingLabelShrinkStyle}
                    htmlFor={inputId}
                    shrink={this.state.hasValue || this.state.isFocused || floatingLabelFixed}
                    disabled={disabled}
                >
                    {floatingLabelText}
                </TextFieldLabel>
            );
        let inputElement = multiLine ? (
            <textarea
                style={[styles.input, styles.textarea, styles.inputNative, textareaStyle]}
                rows={rows}
                {...other}
                {...inputProps}
            />
        ) : (
            <input
                type={type}
                style={[styles.inputNative, styles.input, inputStyle]}
                {...other}
                {...inputProps}
            />
        );
        const errorTextElement = this.state.errorText && (
                <div style={styles.error}>
                    {this.state.errorText}
                </div>
            );
        return (<div className={className} style={[styles.base, style]}>

            {floatingLabelTextElement}
            {hintText ?
                <TextFieldHint
                    show={!(this.state.hasValue || (floatingLabelText && !this.state.isFocused)) ||
                    (!this.state.hasValue && floatingLabelText && floatingLabelFixed && !this.state.isFocused)}
                    style={hintStyle}
                    text={hintText}
                /> :
                null
            }
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
            {errorTextElement}

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

TextField.propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    defaultValue: React.PropTypes.any,
    /**
     * Disables the text field if set to true.
     */
    disabled: React.PropTypes.bool,
    /**
     * The style object to use to override error styles.
     */
    errorStyle: React.PropTypes.object,
    /**
     * The error content to display.
     */
    errorText: React.PropTypes.node,
    /**
     * If true, the floating label will float even when there is no value.
     */
    floatingLabelFixed: React.PropTypes.bool,
    /**
     * The style object to use to override floating label styles when focused.
     */
    floatingLabelFocusStyle: React.PropTypes.object,
    /**
     * The style object to use to override floating label styles when shrunk.
     */
    floatingLabelShrinkStyle: React.PropTypes.object,
    /**
     * The style object to use to override floating label styles.
     */
    floatingLabelStyle: React.PropTypes.object,
    /**
     * The content to use for the floating label element.
     */
    floatingLabelText: React.PropTypes.node,
    /**
     * If true, the field receives the property width 100%.
     */
    fullWidth: React.PropTypes.bool,
    /**
     * Override the inline-styles of the TextField's hint text element.
     */
    hintStyle: React.PropTypes.object,
    /**
     * The hint content to display.
     */
    hintText: React.PropTypes.node,
    /**
     * The id prop for the text field.
     */
    id: React.PropTypes.string,
    /**
     * Override the inline-styles of the TextField's input element.
     * When multiLine is false: define the style of the input element.
     * When multiLine is true: define the style of the container of the textarea.
     */
    inputStyle: React.PropTypes.object,
    /**
     * If true, a textarea element will be rendered.
     * The textarea also grows and shrinks according to the number of lines.
     */
    multiLine: React.PropTypes.bool,
    /**
     * Name applied to the input.
     */
    name: React.PropTypes.string,
    /** @ignore */
    onBlur: React.PropTypes.func,
    /**
     * Callback function that is fired when the textfield's value changes.
     *
     * @param {object} event Change event targeting the text field.
     * @param {string} newValue The new value of the text field.
     */
    onChange: React.PropTypes.func,
    /** @ignore */
    onFocus: React.PropTypes.func,
    /**
     * Number of rows to display when multiLine option is set to true.
     */
    rows: React.PropTypes.number,
    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    /**
     * Override the inline-styles of the TextField's textarea element.
     * The TextField use either a textarea or an input,
     * this property has effects only when multiLine is true.
     */
    textareaStyle: React.PropTypes.object,
    /**
     * Specifies the type of input to display
     * such as "password" or "text".
     */
    type: React.PropTypes.string,
    /**
     * Override the inline-styles of the
     * TextField's underline element when disabled.
     */
    underlineDisabledStyle: React.PropTypes.object,
    /**
     * Override the inline-styles of the TextField's
     * underline element when focussed.
     */
    underlineFocusStyle: React.PropTypes.object,
    /**
     * If true, shows the underline for the text field.
     */
    underlineShow: React.PropTypes.bool,
    /**
     * Override the inline-styles of the TextField's underline element.
     */
    underlineStyle: React.PropTypes.object,
    /**
     * The value of the text field.
     */
    value: React.PropTypes.any,
};

export default TextField = Radium(TextField);