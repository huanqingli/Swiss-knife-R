/**
 * Created by Muc on 17/1/14.
 */
import React from 'react';
import Radium from 'radium';
import transitions from '../tools/transitions';
import {textField} from '../config'


const TextFieldHint = (props) => {
        const {
            show,
            style,
            text,
        } = props;
        const baseStyle={
            position: 'absolute',
            opacity: show ? 1 : 0,
            color: textField.hintColor,
            transition: transitions.easeOut(),
            bottom: 12,
        };
        return(<div style={[baseStyle,style]}>
            {text}
        </div>)
};

TextFieldHint.propTypes = {
    show: React.PropTypes.bool,
    style: React.PropTypes.object,
    text: React.PropTypes.node,
};

TextFieldHint.defaultProps = {
    show: true,
};

//noinspection JSAnnotator
export default TextFieldHint = Radium(TextFieldHint);