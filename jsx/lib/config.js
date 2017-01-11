/**
 * Created by Muc on 17/1/2.
 */
import {
    cyan500, cyan700,
    pinkA200, red500, grey100, grey300, grey400, grey500, grey600, grey700,
    transparent, lightWhite, white, darkWhite, lightBlack, black,
    darkBlack, fullBlack,
} from './tools/colors';
import {darken, fade, emphasize, lighten} from './tools/colorManipulator';

export const defaultSetting = {
    spacing: {
        iconSize: 24,
        desktopGutter: 24,
        desktopGutterMore: 32,
        desktopGutterLess: 16,
        desktopGutterMini: 8,
        desktopKeylineIncrement: 64,
        desktopDropDownMenuItemHeight: 32,
        desktopDropDownMenuFontSize: 15,
        desktopDrawerMenuItemHeight: 48,
        desktopSubheaderHeight: 48,
        desktopToolbarHeight: 56,
    },
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: cyan500,
        primary2Color: cyan700,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
};

const palette=defaultSetting.palette;
const spacing=defaultSetting.spacing;
const fontFamily=defaultSetting.fontFamily;

export const avatar = {
    color: palette.canvasColor,
    backgroundColor: emphasize(palette.canvasColor, 0.26),
};

export const paper = {
    color: palette.textColor,
    backgroundColor: palette.canvasColor,
    zDepthShadows: [
        [1, 6, 0.12, 1, 4, 0.12],
        [3, 10, 0.16, 3, 10, 0.23],
        [10, 30, 0.19, 6, 10, 0.23],
        [14, 45, 0.25, 10, 18, 0.22],
        [19, 60, 0.30, 15, 20, 0.22],
    ].map((d) => (
        `0 ${d[0]}px ${d[1]}px ${fade(palette.shadowColor, d[2])},
         0 ${d[3]}px ${d[4]}px ${fade(palette.shadowColor, d[5])}`
    )),
};

export const textField = {
    textColor: palette.textColor,
    hintColor: palette.disabledColor,
    floatingLabelColor: palette.disabledColor,
    disabledTextColor: palette.disabledColor,
    errorColor: red500,
    focusColor: palette.primary1Color,
    backgroundColor: 'transparent',
    borderColor: palette.borderColor,
};