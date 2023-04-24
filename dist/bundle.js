/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/rot-js/lib/MinHeap.js":
/*!********************************************!*\
  !*** ./node_modules/rot-js/lib/MinHeap.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MinHeap": () => (/* binding */ MinHeap)
/* harmony export */ });
class MinHeap {
    constructor() {
        this.heap = [];
        this.timestamp = 0;
    }
    lessThan(a, b) {
        return a.key == b.key ? a.timestamp < b.timestamp : a.key < b.key;
    }
    shift(v) {
        this.heap = this.heap.map(({ key, value, timestamp }) => ({ key: key + v, value, timestamp }));
    }
    len() {
        return this.heap.length;
    }
    push(value, key) {
        this.timestamp += 1;
        const loc = this.len();
        this.heap.push({ value, timestamp: this.timestamp, key });
        this.updateUp(loc);
    }
    pop() {
        if (this.len() == 0) {
            throw new Error("no element to pop");
        }
        const top = this.heap[0];
        if (this.len() > 1) {
            this.heap[0] = this.heap.pop();
            this.updateDown(0);
        }
        else {
            this.heap.pop();
        }
        return top;
    }
    find(v) {
        for (let i = 0; i < this.len(); i++) {
            if (v == this.heap[i].value) {
                return this.heap[i];
            }
        }
        return null;
    }
    remove(v) {
        let index = null;
        for (let i = 0; i < this.len(); i++) {
            if (v == this.heap[i].value) {
                index = i;
            }
        }
        if (index === null) {
            return false;
        }
        if (this.len() > 1) {
            let last = this.heap.pop();
            if (last.value != v) { // if the last one is being removed, do nothing
                this.heap[index] = last;
                this.updateDown(index);
            }
            return true;
        }
        else {
            this.heap.pop();
        }
        return true;
    }
    parentNode(x) {
        return Math.floor((x - 1) / 2);
    }
    leftChildNode(x) {
        return 2 * x + 1;
    }
    rightChildNode(x) {
        return 2 * x + 2;
    }
    existNode(x) {
        return x >= 0 && x < this.heap.length;
    }
    swap(x, y) {
        const t = this.heap[x];
        this.heap[x] = this.heap[y];
        this.heap[y] = t;
    }
    minNode(numbers) {
        const validnumbers = numbers.filter(this.existNode.bind(this));
        let minimal = validnumbers[0];
        for (const i of validnumbers) {
            if (this.lessThan(this.heap[i], this.heap[minimal])) {
                minimal = i;
            }
        }
        return minimal;
    }
    updateUp(x) {
        if (x == 0) {
            return;
        }
        const parent = this.parentNode(x);
        if (this.existNode(parent) && this.lessThan(this.heap[x], this.heap[parent])) {
            this.swap(x, parent);
            this.updateUp(parent);
        }
    }
    updateDown(x) {
        const leftChild = this.leftChildNode(x);
        const rightChild = this.rightChildNode(x);
        if (!this.existNode(leftChild)) {
            return;
        }
        const m = this.minNode([x, leftChild, rightChild]);
        if (m != x) {
            this.swap(x, m);
            this.updateDown(m);
        }
    }
    debugPrint() {
        console.log(this.heap);
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/color.js":
/*!******************************************!*\
  !*** ./node_modules/rot-js/lib/color.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "add_": () => (/* binding */ add_),
/* harmony export */   "fromString": () => (/* binding */ fromString),
/* harmony export */   "hsl2rgb": () => (/* binding */ hsl2rgb),
/* harmony export */   "interpolate": () => (/* binding */ interpolate),
/* harmony export */   "interpolateHSL": () => (/* binding */ interpolateHSL),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "lerpHSL": () => (/* binding */ lerpHSL),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "multiply_": () => (/* binding */ multiply_),
/* harmony export */   "randomize": () => (/* binding */ randomize),
/* harmony export */   "rgb2hsl": () => (/* binding */ rgb2hsl),
/* harmony export */   "toHex": () => (/* binding */ toHex),
/* harmony export */   "toRGB": () => (/* binding */ toRGB)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./node_modules/rot-js/lib/util.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/rot-js/lib/rng.js");


function fromString(str) {
    let cached, r;
    if (str in CACHE) {
        cached = CACHE[str];
    }
    else {
        if (str.charAt(0) == "#") { // hex rgb
            let matched = str.match(/[0-9a-f]/gi) || [];
            let values = matched.map((x) => parseInt(x, 16));
            if (values.length == 3) {
                cached = values.map((x) => x * 17);
            }
            else {
                for (let i = 0; i < 3; i++) {
                    values[i + 1] += 16 * values[i];
                    values.splice(i, 1);
                }
                cached = values;
            }
        }
        else if ((r = str.match(/rgb\(([0-9, ]+)\)/i))) { // decimal rgb
            cached = r[1].split(/\s*,\s*/).map((x) => parseInt(x));
        }
        else { // html name
            cached = [0, 0, 0];
        }
        CACHE[str] = cached;
    }
    return cached.slice();
}
/**
 * Add two or more colors
 */
function add(color1, ...colors) {
    let result = color1.slice();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < colors.length; j++) {
            result[i] += colors[j][i];
        }
    }
    return result;
}
/**
 * Add two or more colors, MODIFIES FIRST ARGUMENT
 */
function add_(color1, ...colors) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < colors.length; j++) {
            color1[i] += colors[j][i];
        }
    }
    return color1;
}
/**
 * Multiply (mix) two or more colors
 */
function multiply(color1, ...colors) {
    let result = color1.slice();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < colors.length; j++) {
            result[i] *= colors[j][i] / 255;
        }
        result[i] = Math.round(result[i]);
    }
    return result;
}
/**
 * Multiply (mix) two or more colors, MODIFIES FIRST ARGUMENT
 */
function multiply_(color1, ...colors) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < colors.length; j++) {
            color1[i] *= colors[j][i] / 255;
        }
        color1[i] = Math.round(color1[i]);
    }
    return color1;
}
/**
 * Interpolate (blend) two colors with a given factor
 */
function interpolate(color1, color2, factor = 0.5) {
    let result = color1.slice();
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
}
const lerp = interpolate;
/**
 * Interpolate (blend) two colors with a given factor in HSL mode
 */
function interpolateHSL(color1, color2, factor = 0.5) {
    let hsl1 = rgb2hsl(color1);
    let hsl2 = rgb2hsl(color2);
    for (let i = 0; i < 3; i++) {
        hsl1[i] += factor * (hsl2[i] - hsl1[i]);
    }
    return hsl2rgb(hsl1);
}
const lerpHSL = interpolateHSL;
/**
 * Create a new random color based on this one
 * @param color
 * @param diff Set of standard deviations
 */
function randomize(color, diff) {
    if (!(diff instanceof Array)) {
        diff = Math.round(_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getNormal(0, diff));
    }
    let result = color.slice();
    for (let i = 0; i < 3; i++) {
        result[i] += (diff instanceof Array ? Math.round(_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getNormal(0, diff[i])) : diff);
    }
    return result;
}
/**
 * Converts an RGB color value to HSL. Expects 0..255 inputs, produces 0..1 outputs.
 */
function rgb2hsl(color) {
    let r = color[0] / 255;
    let g = color[1] / 255;
    let b = color[2] / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;
    if (max == min) {
        s = 0; // achromatic
    }
    else {
        let d = max - min;
        s = (l > 0.5 ? d / (2 - max - min) : d / (max + min));
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [h, s, l];
}
function hue2rgb(p, q, t) {
    if (t < 0)
        t += 1;
    if (t > 1)
        t -= 1;
    if (t < 1 / 6)
        return p + (q - p) * 6 * t;
    if (t < 1 / 2)
        return q;
    if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
/**
 * Converts an HSL color value to RGB. Expects 0..1 inputs, produces 0..255 outputs.
 */
function hsl2rgb(color) {
    let l = color[2];
    if (color[1] == 0) {
        l = Math.round(l * 255);
        return [l, l, l];
    }
    else {
        let s = color[1];
        let q = (l < 0.5 ? l * (1 + s) : l + s - l * s);
        let p = 2 * l - q;
        let r = hue2rgb(p, q, color[0] + 1 / 3);
        let g = hue2rgb(p, q, color[0]);
        let b = hue2rgb(p, q, color[0] - 1 / 3);
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
}
function toRGB(color) {
    let clamped = color.map(x => (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.clamp)(x, 0, 255));
    return `rgb(${clamped.join(",")})`;
}
function toHex(color) {
    let clamped = color.map(x => (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.clamp)(x, 0, 255).toString(16).padStart(2, "0"));
    return `#${clamped.join("")}`;
}
const CACHE = {
    "black": [0, 0, 0],
    "navy": [0, 0, 128],
    "darkblue": [0, 0, 139],
    "mediumblue": [0, 0, 205],
    "blue": [0, 0, 255],
    "darkgreen": [0, 100, 0],
    "green": [0, 128, 0],
    "teal": [0, 128, 128],
    "darkcyan": [0, 139, 139],
    "deepskyblue": [0, 191, 255],
    "darkturquoise": [0, 206, 209],
    "mediumspringgreen": [0, 250, 154],
    "lime": [0, 255, 0],
    "springgreen": [0, 255, 127],
    "aqua": [0, 255, 255],
    "cyan": [0, 255, 255],
    "midnightblue": [25, 25, 112],
    "dodgerblue": [30, 144, 255],
    "forestgreen": [34, 139, 34],
    "seagreen": [46, 139, 87],
    "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79],
    "limegreen": [50, 205, 50],
    "mediumseagreen": [60, 179, 113],
    "turquoise": [64, 224, 208],
    "royalblue": [65, 105, 225],
    "steelblue": [70, 130, 180],
    "darkslateblue": [72, 61, 139],
    "mediumturquoise": [72, 209, 204],
    "indigo": [75, 0, 130],
    "darkolivegreen": [85, 107, 47],
    "cadetblue": [95, 158, 160],
    "cornflowerblue": [100, 149, 237],
    "mediumaquamarine": [102, 205, 170],
    "dimgray": [105, 105, 105],
    "dimgrey": [105, 105, 105],
    "slateblue": [106, 90, 205],
    "olivedrab": [107, 142, 35],
    "slategray": [112, 128, 144],
    "slategrey": [112, 128, 144],
    "lightslategray": [119, 136, 153],
    "lightslategrey": [119, 136, 153],
    "mediumslateblue": [123, 104, 238],
    "lawngreen": [124, 252, 0],
    "chartreuse": [127, 255, 0],
    "aquamarine": [127, 255, 212],
    "maroon": [128, 0, 0],
    "purple": [128, 0, 128],
    "olive": [128, 128, 0],
    "gray": [128, 128, 128],
    "grey": [128, 128, 128],
    "skyblue": [135, 206, 235],
    "lightskyblue": [135, 206, 250],
    "blueviolet": [138, 43, 226],
    "darkred": [139, 0, 0],
    "darkmagenta": [139, 0, 139],
    "saddlebrown": [139, 69, 19],
    "darkseagreen": [143, 188, 143],
    "lightgreen": [144, 238, 144],
    "mediumpurple": [147, 112, 216],
    "darkviolet": [148, 0, 211],
    "palegreen": [152, 251, 152],
    "darkorchid": [153, 50, 204],
    "yellowgreen": [154, 205, 50],
    "sienna": [160, 82, 45],
    "brown": [165, 42, 42],
    "darkgray": [169, 169, 169],
    "darkgrey": [169, 169, 169],
    "lightblue": [173, 216, 230],
    "greenyellow": [173, 255, 47],
    "paleturquoise": [175, 238, 238],
    "lightsteelblue": [176, 196, 222],
    "powderblue": [176, 224, 230],
    "firebrick": [178, 34, 34],
    "darkgoldenrod": [184, 134, 11],
    "mediumorchid": [186, 85, 211],
    "rosybrown": [188, 143, 143],
    "darkkhaki": [189, 183, 107],
    "silver": [192, 192, 192],
    "mediumvioletred": [199, 21, 133],
    "indianred": [205, 92, 92],
    "peru": [205, 133, 63],
    "chocolate": [210, 105, 30],
    "tan": [210, 180, 140],
    "lightgray": [211, 211, 211],
    "lightgrey": [211, 211, 211],
    "palevioletred": [216, 112, 147],
    "thistle": [216, 191, 216],
    "orchid": [218, 112, 214],
    "goldenrod": [218, 165, 32],
    "crimson": [220, 20, 60],
    "gainsboro": [220, 220, 220],
    "plum": [221, 160, 221],
    "burlywood": [222, 184, 135],
    "lightcyan": [224, 255, 255],
    "lavender": [230, 230, 250],
    "darksalmon": [233, 150, 122],
    "violet": [238, 130, 238],
    "palegoldenrod": [238, 232, 170],
    "lightcoral": [240, 128, 128],
    "khaki": [240, 230, 140],
    "aliceblue": [240, 248, 255],
    "honeydew": [240, 255, 240],
    "azure": [240, 255, 255],
    "sandybrown": [244, 164, 96],
    "wheat": [245, 222, 179],
    "beige": [245, 245, 220],
    "whitesmoke": [245, 245, 245],
    "mintcream": [245, 255, 250],
    "ghostwhite": [248, 248, 255],
    "salmon": [250, 128, 114],
    "antiquewhite": [250, 235, 215],
    "linen": [250, 240, 230],
    "lightgoldenrodyellow": [250, 250, 210],
    "oldlace": [253, 245, 230],
    "red": [255, 0, 0],
    "fuchsia": [255, 0, 255],
    "magenta": [255, 0, 255],
    "deeppink": [255, 20, 147],
    "orangered": [255, 69, 0],
    "tomato": [255, 99, 71],
    "hotpink": [255, 105, 180],
    "coral": [255, 127, 80],
    "darkorange": [255, 140, 0],
    "lightsalmon": [255, 160, 122],
    "orange": [255, 165, 0],
    "lightpink": [255, 182, 193],
    "pink": [255, 192, 203],
    "gold": [255, 215, 0],
    "peachpuff": [255, 218, 185],
    "navajowhite": [255, 222, 173],
    "moccasin": [255, 228, 181],
    "bisque": [255, 228, 196],
    "mistyrose": [255, 228, 225],
    "blanchedalmond": [255, 235, 205],
    "papayawhip": [255, 239, 213],
    "lavenderblush": [255, 240, 245],
    "seashell": [255, 245, 238],
    "cornsilk": [255, 248, 220],
    "lemonchiffon": [255, 250, 205],
    "floralwhite": [255, 250, 240],
    "snow": [255, 250, 250],
    "yellow": [255, 255, 0],
    "lightyellow": [255, 255, 224],
    "ivory": [255, 255, 240],
    "white": [255, 255, 255]
};


/***/ }),

/***/ "./node_modules/rot-js/lib/constants.js":
/*!**********************************************!*\
  !*** ./node_modules/rot-js/lib/constants.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_HEIGHT": () => (/* binding */ DEFAULT_HEIGHT),
/* harmony export */   "DEFAULT_WIDTH": () => (/* binding */ DEFAULT_WIDTH),
/* harmony export */   "DIRS": () => (/* binding */ DIRS),
/* harmony export */   "KEYS": () => (/* binding */ KEYS)
/* harmony export */ });
/** Default with for display and map generators */
let DEFAULT_WIDTH = 80;
/** Default height for display and map generators */
let DEFAULT_HEIGHT = 25;
const DIRS = {
    4: [[0, -1], [1, 0], [0, 1], [-1, 0]],
    8: [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]],
    6: [[-1, -1], [1, -1], [2, 0], [1, 1], [-1, 1], [-2, 0]]
};
const KEYS = {
    /** Cancel key. */
    VK_CANCEL: 3,
    /** Help key. */
    VK_HELP: 6,
    /** Backspace key. */
    VK_BACK_SPACE: 8,
    /** Tab key. */
    VK_TAB: 9,
    /** 5 key on Numpad when NumLock is unlocked. Or on Mac, clear key which is positioned at NumLock key. */
    VK_CLEAR: 12,
    /** Return/enter key on the main keyboard. */
    VK_RETURN: 13,
    /** Reserved, but not used. */
    VK_ENTER: 14,
    /** Shift key. */
    VK_SHIFT: 16,
    /** Control key. */
    VK_CONTROL: 17,
    /** Alt (Option on Mac) key. */
    VK_ALT: 18,
    /** Pause key. */
    VK_PAUSE: 19,
    /** Caps lock. */
    VK_CAPS_LOCK: 20,
    /** Escape key. */
    VK_ESCAPE: 27,
    /** Space bar. */
    VK_SPACE: 32,
    /** Page Up key. */
    VK_PAGE_UP: 33,
    /** Page Down key. */
    VK_PAGE_DOWN: 34,
    /** End key. */
    VK_END: 35,
    /** Home key. */
    VK_HOME: 36,
    /** Left arrow. */
    VK_LEFT: 37,
    /** Up arrow. */
    VK_UP: 38,
    /** Right arrow. */
    VK_RIGHT: 39,
    /** Down arrow. */
    VK_DOWN: 40,
    /** Print Screen key. */
    VK_PRINTSCREEN: 44,
    /** Ins(ert) key. */
    VK_INSERT: 45,
    /** Del(ete) key. */
    VK_DELETE: 46,
    /***/
    VK_0: 48,
    /***/
    VK_1: 49,
    /***/
    VK_2: 50,
    /***/
    VK_3: 51,
    /***/
    VK_4: 52,
    /***/
    VK_5: 53,
    /***/
    VK_6: 54,
    /***/
    VK_7: 55,
    /***/
    VK_8: 56,
    /***/
    VK_9: 57,
    /** Colon (:) key. Requires Gecko 15.0 */
    VK_COLON: 58,
    /** Semicolon (;) key. */
    VK_SEMICOLON: 59,
    /** Less-than (<) key. Requires Gecko 15.0 */
    VK_LESS_THAN: 60,
    /** Equals (=) key. */
    VK_EQUALS: 61,
    /** Greater-than (>) key. Requires Gecko 15.0 */
    VK_GREATER_THAN: 62,
    /** Question mark (?) key. Requires Gecko 15.0 */
    VK_QUESTION_MARK: 63,
    /** Atmark (@) key. Requires Gecko 15.0 */
    VK_AT: 64,
    /***/
    VK_A: 65,
    /***/
    VK_B: 66,
    /***/
    VK_C: 67,
    /***/
    VK_D: 68,
    /***/
    VK_E: 69,
    /***/
    VK_F: 70,
    /***/
    VK_G: 71,
    /***/
    VK_H: 72,
    /***/
    VK_I: 73,
    /***/
    VK_J: 74,
    /***/
    VK_K: 75,
    /***/
    VK_L: 76,
    /***/
    VK_M: 77,
    /***/
    VK_N: 78,
    /***/
    VK_O: 79,
    /***/
    VK_P: 80,
    /***/
    VK_Q: 81,
    /***/
    VK_R: 82,
    /***/
    VK_S: 83,
    /***/
    VK_T: 84,
    /***/
    VK_U: 85,
    /***/
    VK_V: 86,
    /***/
    VK_W: 87,
    /***/
    VK_X: 88,
    /***/
    VK_Y: 89,
    /***/
    VK_Z: 90,
    /***/
    VK_CONTEXT_MENU: 93,
    /** 0 on the numeric keypad. */
    VK_NUMPAD0: 96,
    /** 1 on the numeric keypad. */
    VK_NUMPAD1: 97,
    /** 2 on the numeric keypad. */
    VK_NUMPAD2: 98,
    /** 3 on the numeric keypad. */
    VK_NUMPAD3: 99,
    /** 4 on the numeric keypad. */
    VK_NUMPAD4: 100,
    /** 5 on the numeric keypad. */
    VK_NUMPAD5: 101,
    /** 6 on the numeric keypad. */
    VK_NUMPAD6: 102,
    /** 7 on the numeric keypad. */
    VK_NUMPAD7: 103,
    /** 8 on the numeric keypad. */
    VK_NUMPAD8: 104,
    /** 9 on the numeric keypad. */
    VK_NUMPAD9: 105,
    /** * on the numeric keypad. */
    VK_MULTIPLY: 106,
    /** + on the numeric keypad. */
    VK_ADD: 107,
    /***/
    VK_SEPARATOR: 108,
    /** - on the numeric keypad. */
    VK_SUBTRACT: 109,
    /** Decimal point on the numeric keypad. */
    VK_DECIMAL: 110,
    /** / on the numeric keypad. */
    VK_DIVIDE: 111,
    /** F1 key. */
    VK_F1: 112,
    /** F2 key. */
    VK_F2: 113,
    /** F3 key. */
    VK_F3: 114,
    /** F4 key. */
    VK_F4: 115,
    /** F5 key. */
    VK_F5: 116,
    /** F6 key. */
    VK_F6: 117,
    /** F7 key. */
    VK_F7: 118,
    /** F8 key. */
    VK_F8: 119,
    /** F9 key. */
    VK_F9: 120,
    /** F10 key. */
    VK_F10: 121,
    /** F11 key. */
    VK_F11: 122,
    /** F12 key. */
    VK_F12: 123,
    /** F13 key. */
    VK_F13: 124,
    /** F14 key. */
    VK_F14: 125,
    /** F15 key. */
    VK_F15: 126,
    /** F16 key. */
    VK_F16: 127,
    /** F17 key. */
    VK_F17: 128,
    /** F18 key. */
    VK_F18: 129,
    /** F19 key. */
    VK_F19: 130,
    /** F20 key. */
    VK_F20: 131,
    /** F21 key. */
    VK_F21: 132,
    /** F22 key. */
    VK_F22: 133,
    /** F23 key. */
    VK_F23: 134,
    /** F24 key. */
    VK_F24: 135,
    /** Num Lock key. */
    VK_NUM_LOCK: 144,
    /** Scroll Lock key. */
    VK_SCROLL_LOCK: 145,
    /** Circumflex (^) key. Requires Gecko 15.0 */
    VK_CIRCUMFLEX: 160,
    /** Exclamation (!) key. Requires Gecko 15.0 */
    VK_EXCLAMATION: 161,
    /** Double quote () key. Requires Gecko 15.0 */
    VK_DOUBLE_QUOTE: 162,
    /** Hash (#) key. Requires Gecko 15.0 */
    VK_HASH: 163,
    /** Dollar sign ($) key. Requires Gecko 15.0 */
    VK_DOLLAR: 164,
    /** Percent (%) key. Requires Gecko 15.0 */
    VK_PERCENT: 165,
    /** Ampersand (&) key. Requires Gecko 15.0 */
    VK_AMPERSAND: 166,
    /** Underscore (_) key. Requires Gecko 15.0 */
    VK_UNDERSCORE: 167,
    /** Open parenthesis (() key. Requires Gecko 15.0 */
    VK_OPEN_PAREN: 168,
    /** Close parenthesis ()) key. Requires Gecko 15.0 */
    VK_CLOSE_PAREN: 169,
    /* Asterisk (*) key. Requires Gecko 15.0 */
    VK_ASTERISK: 170,
    /** Plus (+) key. Requires Gecko 15.0 */
    VK_PLUS: 171,
    /** Pipe (|) key. Requires Gecko 15.0 */
    VK_PIPE: 172,
    /** Hyphen-US/docs/Minus (-) key. Requires Gecko 15.0 */
    VK_HYPHEN_MINUS: 173,
    /** Open curly bracket ({) key. Requires Gecko 15.0 */
    VK_OPEN_CURLY_BRACKET: 174,
    /** Close curly bracket (}) key. Requires Gecko 15.0 */
    VK_CLOSE_CURLY_BRACKET: 175,
    /** Tilde (~) key. Requires Gecko 15.0 */
    VK_TILDE: 176,
    /** Comma (,) key. */
    VK_COMMA: 188,
    /** Period (.) key. */
    VK_PERIOD: 190,
    /** Slash (/) key. */
    VK_SLASH: 191,
    /** Back tick (`) key. */
    VK_BACK_QUOTE: 192,
    /** Open square bracket ([) key. */
    VK_OPEN_BRACKET: 219,
    /** Back slash (\) key. */
    VK_BACK_SLASH: 220,
    /** Close square bracket (]) key. */
    VK_CLOSE_BRACKET: 221,
    /** Quote (''') key. */
    VK_QUOTE: 222,
    /** Meta key on Linux, Command key on Mac. */
    VK_META: 224,
    /** AltGr key on Linux. Requires Gecko 15.0 */
    VK_ALTGR: 225,
    /** Windows logo key on Windows. Or Super or Hyper key on Linux. Requires Gecko 15.0 */
    VK_WIN: 91,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_KANA: 21,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_HANGUL: 21,
    /** 英数 key on Japanese Mac keyboard. Requires Gecko 15.0 */
    VK_EISU: 22,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_JUNJA: 23,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_FINAL: 24,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_HANJA: 25,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_KANJI: 25,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_CONVERT: 28,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_NONCONVERT: 29,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_ACCEPT: 30,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_MODECHANGE: 31,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_SELECT: 41,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_PRINT: 42,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_EXECUTE: 43,
    /** Linux support for this keycode was added in Gecko 4.0.	 */
    VK_SLEEP: 95
};


/***/ }),

/***/ "./node_modules/rot-js/lib/display/backend.js":
/*!****************************************************!*\
  !*** ./node_modules/rot-js/lib/display/backend.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Backend)
/* harmony export */ });
/**
 * @class Abstract display backend module
 * @private
 */
class Backend {
    getContainer() { return null; }
    setOptions(options) { this._options = options; }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/display/canvas.js":
/*!***************************************************!*\
  !*** ./node_modules/rot-js/lib/display/canvas.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Canvas)
/* harmony export */ });
/* harmony import */ var _backend_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./backend.js */ "./node_modules/rot-js/lib/display/backend.js");

class Canvas extends _backend_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this._ctx = document.createElement("canvas").getContext("2d");
    }
    schedule(cb) { requestAnimationFrame(cb); }
    getContainer() { return this._ctx.canvas; }
    setOptions(opts) {
        super.setOptions(opts);
        const style = (opts.fontStyle ? `${opts.fontStyle} ` : ``);
        const font = `${style} ${opts.fontSize}px ${opts.fontFamily}`;
        this._ctx.font = font;
        this._updateSize();
        this._ctx.font = font;
        this._ctx.textAlign = "center";
        this._ctx.textBaseline = "middle";
    }
    clear() {
        this._ctx.fillStyle = this._options.bg;
        this._ctx.fillRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    }
    eventToPosition(x, y) {
        let canvas = this._ctx.canvas;
        let rect = canvas.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;
        x *= canvas.width / rect.width;
        y *= canvas.height / rect.height;
        if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
            return [-1, -1];
        }
        return this._normalizedEventToPosition(x, y);
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/display/display.js":
/*!****************************************************!*\
  !*** ./node_modules/rot-js/lib/display/display.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _hex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hex.js */ "./node_modules/rot-js/lib/display/hex.js");
/* harmony import */ var _rect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rect.js */ "./node_modules/rot-js/lib/display/rect.js");
/* harmony import */ var _tile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tile.js */ "./node_modules/rot-js/lib/display/tile.js");
/* harmony import */ var _tile_gl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tile-gl.js */ "./node_modules/rot-js/lib/display/tile-gl.js");
/* harmony import */ var _term_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./term.js */ "./node_modules/rot-js/lib/display/term.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../text.js */ "./node_modules/rot-js/lib/text.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants.js */ "./node_modules/rot-js/lib/constants.js");







const BACKENDS = {
    "hex": _hex_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    "rect": _rect_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    "tile": _tile_js__WEBPACK_IMPORTED_MODULE_2__["default"],
    "tile-gl": _tile_gl_js__WEBPACK_IMPORTED_MODULE_3__["default"],
    "term": _term_js__WEBPACK_IMPORTED_MODULE_4__["default"]
};
const DEFAULT_OPTIONS = {
    width: _constants_js__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_WIDTH,
    height: _constants_js__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_HEIGHT,
    transpose: false,
    layout: "rect",
    fontSize: 15,
    spacing: 1,
    border: 0,
    forceSquareRatio: false,
    fontFamily: "monospace",
    fontStyle: "",
    fg: "#ccc",
    bg: "#000",
    tileWidth: 32,
    tileHeight: 32,
    tileMap: {},
    tileSet: null,
    tileColorize: false
};
/**
 * @class Visual map display
 */
let Display = /** @class */ (() => {
    class Display {
        constructor(options = {}) {
            this._data = {};
            this._dirty = false; // false = nothing, true = all, object = dirty cells
            this._options = {};
            options = Object.assign({}, DEFAULT_OPTIONS, options);
            this.setOptions(options);
            this.DEBUG = this.DEBUG.bind(this);
            this._tick = this._tick.bind(this);
            this._backend.schedule(this._tick);
        }
        /**
         * Debug helper, ideal as a map generator callback. Always bound to this.
         * @param {int} x
         * @param {int} y
         * @param {int} what
         */
        DEBUG(x, y, what) {
            let colors = [this._options.bg, this._options.fg];
            this.draw(x, y, null, null, colors[what % colors.length]);
        }
        /**
         * Clear the whole display (cover it with background color)
         */
        clear() {
            this._data = {};
            this._dirty = true;
        }
        /**
         * @see ROT.Display
         */
        setOptions(options) {
            Object.assign(this._options, options);
            if (options.width || options.height || options.fontSize || options.fontFamily || options.spacing || options.layout) {
                if (options.layout) {
                    let ctor = BACKENDS[options.layout];
                    this._backend = new ctor();
                }
                this._backend.setOptions(this._options);
                this._dirty = true;
            }
            return this;
        }
        /**
         * Returns currently set options
         */
        getOptions() { return this._options; }
        /**
         * Returns the DOM node of this display
         */
        getContainer() { return this._backend.getContainer(); }
        /**
         * Compute the maximum width/height to fit into a set of given constraints
         * @param {int} availWidth Maximum allowed pixel width
         * @param {int} availHeight Maximum allowed pixel height
         * @returns {int[2]} cellWidth,cellHeight
         */
        computeSize(availWidth, availHeight) {
            return this._backend.computeSize(availWidth, availHeight);
        }
        /**
         * Compute the maximum font size to fit into a set of given constraints
         * @param {int} availWidth Maximum allowed pixel width
         * @param {int} availHeight Maximum allowed pixel height
         * @returns {int} fontSize
         */
        computeFontSize(availWidth, availHeight) {
            return this._backend.computeFontSize(availWidth, availHeight);
        }
        computeTileSize(availWidth, availHeight) {
            let width = Math.floor(availWidth / this._options.width);
            let height = Math.floor(availHeight / this._options.height);
            return [width, height];
        }
        /**
         * Convert a DOM event (mouse or touch) to map coordinates. Uses first touch for multi-touch.
         * @param {Event} e event
         * @returns {int[2]} -1 for values outside of the canvas
         */
        eventToPosition(e) {
            let x, y;
            if ("touches" in e) {
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            }
            else {
                x = e.clientX;
                y = e.clientY;
            }
            return this._backend.eventToPosition(x, y);
        }
        /**
         * @param {int} x
         * @param {int} y
         * @param {string || string[]} ch One or more chars (will be overlapping themselves)
         * @param {string} [fg] foreground color
         * @param {string} [bg] background color
         */
        draw(x, y, ch, fg, bg) {
            if (!fg) {
                fg = this._options.fg;
            }
            if (!bg) {
                bg = this._options.bg;
            }
            let key = `${x},${y}`;
            this._data[key] = [x, y, ch, fg, bg];
            if (this._dirty === true) {
                return;
            } // will already redraw everything 
            if (!this._dirty) {
                this._dirty = {};
            } // first!
            this._dirty[key] = true;
        }
        /**
         * @param {int} x
         * @param {int} y
         * @param {string || string[]} ch One or more chars (will be overlapping themselves)
         * @param {string || null} [fg] foreground color
         * @param {string || null} [bg] background color
         */
        drawOver(x, y, ch, fg, bg) {
            const key = `${x},${y}`;
            const existing = this._data[key];
            if (existing) {
                existing[2] = ch || existing[2];
                existing[3] = fg || existing[3];
                existing[4] = bg || existing[4];
            }
            else {
                this.draw(x, y, ch, fg, bg);
            }
        }
        /**
         * Draws a text at given position. Optionally wraps at a maximum length. Currently does not work with hex layout.
         * @param {int} x
         * @param {int} y
         * @param {string} text May contain color/background format specifiers, %c{name}/%b{name}, both optional. %c{}/%b{} resets to default.
         * @param {int} [maxWidth] wrap at what width?
         * @returns {int} lines drawn
         */
        drawText(x, y, text, maxWidth) {
            let fg = null;
            let bg = null;
            let cx = x;
            let cy = y;
            let lines = 1;
            if (!maxWidth) {
                maxWidth = this._options.width - x;
            }
            let tokens = _text_js__WEBPACK_IMPORTED_MODULE_5__.tokenize(text, maxWidth);
            while (tokens.length) { // interpret tokenized opcode stream
                let token = tokens.shift();
                switch (token.type) {
                    case _text_js__WEBPACK_IMPORTED_MODULE_5__.TYPE_TEXT:
                        let isSpace = false, isPrevSpace = false, isFullWidth = false, isPrevFullWidth = false;
                        for (let i = 0; i < token.value.length; i++) {
                            let cc = token.value.charCodeAt(i);
                            let c = token.value.charAt(i);
                            if (this._options.layout === "term") {
                                let cch = cc >> 8;
                                let isCJK = cch === 0x11 || (cch >= 0x2e && cch <= 0x9f) || (cch >= 0xac && cch <= 0xd7) || (cc >= 0xA960 && cc <= 0xA97F);
                                if (isCJK) {
                                    this.draw(cx + 0, cy, c, fg, bg);
                                    this.draw(cx + 1, cy, "\t", fg, bg);
                                    cx += 2;
                                    continue;
                                }
                            }
                            // Assign to `true` when the current char is full-width.
                            isFullWidth = (cc > 0xff00 && cc < 0xff61) || (cc > 0xffdc && cc < 0xffe8) || cc > 0xffee;
                            // Current char is space, whatever full-width or half-width both are OK.
                            isSpace = (c.charCodeAt(0) == 0x20 || c.charCodeAt(0) == 0x3000);
                            // The previous char is full-width and
                            // current char is nether half-width nor a space.
                            if (isPrevFullWidth && !isFullWidth && !isSpace) {
                                cx++;
                            } // add an extra position
                            // The current char is full-width and
                            // the previous char is not a space.
                            if (isFullWidth && !isPrevSpace) {
                                cx++;
                            } // add an extra position
                            this.draw(cx++, cy, c, fg, bg);
                            isPrevSpace = isSpace;
                            isPrevFullWidth = isFullWidth;
                        }
                        break;
                    case _text_js__WEBPACK_IMPORTED_MODULE_5__.TYPE_FG:
                        fg = token.value || null;
                        break;
                    case _text_js__WEBPACK_IMPORTED_MODULE_5__.TYPE_BG:
                        bg = token.value || null;
                        break;
                    case _text_js__WEBPACK_IMPORTED_MODULE_5__.TYPE_NEWLINE:
                        cx = x;
                        cy++;
                        lines++;
                        break;
                }
            }
            return lines;
        }
        /**
         * Timer tick: update dirty parts
         */
        _tick() {
            this._backend.schedule(this._tick);
            if (!this._dirty) {
                return;
            }
            if (this._dirty === true) { // draw all
                this._backend.clear();
                for (let id in this._data) {
                    this._draw(id, false);
                } // redraw cached data 
            }
            else { // draw only dirty 
                for (let key in this._dirty) {
                    this._draw(key, true);
                }
            }
            this._dirty = false;
        }
        /**
         * @param {string} key What to draw
         * @param {bool} clearBefore Is it necessary to clean before?
         */
        _draw(key, clearBefore) {
            let data = this._data[key];
            if (data[4] != this._options.bg) {
                clearBefore = true;
            }
            this._backend.draw(data, clearBefore);
        }
    }
    Display.Rect = _rect_js__WEBPACK_IMPORTED_MODULE_1__["default"];
    Display.Hex = _hex_js__WEBPACK_IMPORTED_MODULE_0__["default"];
    Display.Tile = _tile_js__WEBPACK_IMPORTED_MODULE_2__["default"];
    Display.TileGL = _tile_gl_js__WEBPACK_IMPORTED_MODULE_3__["default"];
    Display.Term = _term_js__WEBPACK_IMPORTED_MODULE_4__["default"];
    return Display;
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Display);


/***/ }),

/***/ "./node_modules/rot-js/lib/display/hex.js":
/*!************************************************!*\
  !*** ./node_modules/rot-js/lib/display/hex.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Hex)
/* harmony export */ });
/* harmony import */ var _canvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas.js */ "./node_modules/rot-js/lib/display/canvas.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util.js */ "./node_modules/rot-js/lib/util.js");


/**
 * @class Hexagonal backend
 * @private
 */
class Hex extends _canvas_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this._spacingX = 0;
        this._spacingY = 0;
        this._hexSize = 0;
    }
    draw(data, clearBefore) {
        let [x, y, ch, fg, bg] = data;
        let px = [
            (x + 1) * this._spacingX,
            y * this._spacingY + this._hexSize
        ];
        if (this._options.transpose) {
            px.reverse();
        }
        if (clearBefore) {
            this._ctx.fillStyle = bg;
            this._fill(px[0], px[1]);
        }
        if (!ch) {
            return;
        }
        this._ctx.fillStyle = fg;
        let chars = [].concat(ch);
        for (let i = 0; i < chars.length; i++) {
            this._ctx.fillText(chars[i], px[0], Math.ceil(px[1]));
        }
    }
    computeSize(availWidth, availHeight) {
        if (this._options.transpose) {
            availWidth += availHeight;
            availHeight = availWidth - availHeight;
            availWidth -= availHeight;
        }
        let width = Math.floor(availWidth / this._spacingX) - 1;
        let height = Math.floor((availHeight - 2 * this._hexSize) / this._spacingY + 1);
        return [width, height];
    }
    computeFontSize(availWidth, availHeight) {
        if (this._options.transpose) {
            availWidth += availHeight;
            availHeight = availWidth - availHeight;
            availWidth -= availHeight;
        }
        let hexSizeWidth = 2 * availWidth / ((this._options.width + 1) * Math.sqrt(3)) - 1;
        let hexSizeHeight = availHeight / (2 + 1.5 * (this._options.height - 1));
        let hexSize = Math.min(hexSizeWidth, hexSizeHeight);
        // compute char ratio
        let oldFont = this._ctx.font;
        this._ctx.font = "100px " + this._options.fontFamily;
        let width = Math.ceil(this._ctx.measureText("W").width);
        this._ctx.font = oldFont;
        let ratio = width / 100;
        hexSize = Math.floor(hexSize) + 1; // closest larger hexSize
        // FIXME char size computation does not respect transposed hexes
        let fontSize = 2 * hexSize / (this._options.spacing * (1 + ratio / Math.sqrt(3)));
        // closest smaller fontSize
        return Math.ceil(fontSize) - 1;
    }
    _normalizedEventToPosition(x, y) {
        let nodeSize;
        if (this._options.transpose) {
            x += y;
            y = x - y;
            x -= y;
            nodeSize = this._ctx.canvas.width;
        }
        else {
            nodeSize = this._ctx.canvas.height;
        }
        let size = nodeSize / this._options.height;
        y = Math.floor(y / size);
        if ((0,_util_js__WEBPACK_IMPORTED_MODULE_1__.mod)(y, 2)) { /* odd row */
            x -= this._spacingX;
            x = 1 + 2 * Math.floor(x / (2 * this._spacingX));
        }
        else {
            x = 2 * Math.floor(x / (2 * this._spacingX));
        }
        return [x, y];
    }
    /**
     * Arguments are pixel values. If "transposed" mode is enabled, then these two are already swapped.
     */
    _fill(cx, cy) {
        let a = this._hexSize;
        let b = this._options.border;
        const ctx = this._ctx;
        ctx.beginPath();
        if (this._options.transpose) {
            ctx.moveTo(cx - a + b, cy);
            ctx.lineTo(cx - a / 2 + b, cy + this._spacingX - b);
            ctx.lineTo(cx + a / 2 - b, cy + this._spacingX - b);
            ctx.lineTo(cx + a - b, cy);
            ctx.lineTo(cx + a / 2 - b, cy - this._spacingX + b);
            ctx.lineTo(cx - a / 2 + b, cy - this._spacingX + b);
            ctx.lineTo(cx - a + b, cy);
        }
        else {
            ctx.moveTo(cx, cy - a + b);
            ctx.lineTo(cx + this._spacingX - b, cy - a / 2 + b);
            ctx.lineTo(cx + this._spacingX - b, cy + a / 2 - b);
            ctx.lineTo(cx, cy + a - b);
            ctx.lineTo(cx - this._spacingX + b, cy + a / 2 - b);
            ctx.lineTo(cx - this._spacingX + b, cy - a / 2 + b);
            ctx.lineTo(cx, cy - a + b);
        }
        ctx.fill();
    }
    _updateSize() {
        const opts = this._options;
        const charWidth = Math.ceil(this._ctx.measureText("W").width);
        this._hexSize = Math.floor(opts.spacing * (opts.fontSize + charWidth / Math.sqrt(3)) / 2);
        this._spacingX = this._hexSize * Math.sqrt(3) / 2;
        this._spacingY = this._hexSize * 1.5;
        let xprop;
        let yprop;
        if (opts.transpose) {
            xprop = "height";
            yprop = "width";
        }
        else {
            xprop = "width";
            yprop = "height";
        }
        this._ctx.canvas[xprop] = Math.ceil((opts.width + 1) * this._spacingX);
        this._ctx.canvas[yprop] = Math.ceil((opts.height - 1) * this._spacingY + 2 * this._hexSize);
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/display/rect.js":
/*!*************************************************!*\
  !*** ./node_modules/rot-js/lib/display/rect.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _canvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas.js */ "./node_modules/rot-js/lib/display/canvas.js");

/**
 * @class Rectangular backend
 * @private
 */
let Rect = /** @class */ (() => {
    class Rect extends _canvas_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
        constructor() {
            super();
            this._spacingX = 0;
            this._spacingY = 0;
            this._canvasCache = {};
        }
        setOptions(options) {
            super.setOptions(options);
            this._canvasCache = {};
        }
        draw(data, clearBefore) {
            if (Rect.cache) {
                this._drawWithCache(data);
            }
            else {
                this._drawNoCache(data, clearBefore);
            }
        }
        _drawWithCache(data) {
            let [x, y, ch, fg, bg] = data;
            let hash = "" + ch + fg + bg;
            let canvas;
            if (hash in this._canvasCache) {
                canvas = this._canvasCache[hash];
            }
            else {
                let b = this._options.border;
                canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.width = this._spacingX;
                canvas.height = this._spacingY;
                ctx.fillStyle = bg;
                ctx.fillRect(b, b, canvas.width - b, canvas.height - b);
                if (ch) {
                    ctx.fillStyle = fg;
                    ctx.font = this._ctx.font;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    let chars = [].concat(ch);
                    for (let i = 0; i < chars.length; i++) {
                        ctx.fillText(chars[i], this._spacingX / 2, Math.ceil(this._spacingY / 2));
                    }
                }
                this._canvasCache[hash] = canvas;
            }
            this._ctx.drawImage(canvas, x * this._spacingX, y * this._spacingY);
        }
        _drawNoCache(data, clearBefore) {
            let [x, y, ch, fg, bg] = data;
            if (clearBefore) {
                let b = this._options.border;
                this._ctx.fillStyle = bg;
                this._ctx.fillRect(x * this._spacingX + b, y * this._spacingY + b, this._spacingX - b, this._spacingY - b);
            }
            if (!ch) {
                return;
            }
            this._ctx.fillStyle = fg;
            let chars = [].concat(ch);
            for (let i = 0; i < chars.length; i++) {
                this._ctx.fillText(chars[i], (x + 0.5) * this._spacingX, Math.ceil((y + 0.5) * this._spacingY));
            }
        }
        computeSize(availWidth, availHeight) {
            let width = Math.floor(availWidth / this._spacingX);
            let height = Math.floor(availHeight / this._spacingY);
            return [width, height];
        }
        computeFontSize(availWidth, availHeight) {
            let boxWidth = Math.floor(availWidth / this._options.width);
            let boxHeight = Math.floor(availHeight / this._options.height);
            /* compute char ratio */
            let oldFont = this._ctx.font;
            this._ctx.font = "100px " + this._options.fontFamily;
            let width = Math.ceil(this._ctx.measureText("W").width);
            this._ctx.font = oldFont;
            let ratio = width / 100;
            let widthFraction = ratio * boxHeight / boxWidth;
            if (widthFraction > 1) { /* too wide with current aspect ratio */
                boxHeight = Math.floor(boxHeight / widthFraction);
            }
            return Math.floor(boxHeight / this._options.spacing);
        }
        _normalizedEventToPosition(x, y) {
            return [Math.floor(x / this._spacingX), Math.floor(y / this._spacingY)];
        }
        _updateSize() {
            const opts = this._options;
            const charWidth = Math.ceil(this._ctx.measureText("W").width);
            this._spacingX = Math.ceil(opts.spacing * charWidth);
            this._spacingY = Math.ceil(opts.spacing * opts.fontSize);
            if (opts.forceSquareRatio) {
                this._spacingX = this._spacingY = Math.max(this._spacingX, this._spacingY);
            }
            this._ctx.canvas.width = opts.width * this._spacingX;
            this._ctx.canvas.height = opts.height * this._spacingY;
        }
    }
    Rect.cache = false;
    return Rect;
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rect);


/***/ }),

/***/ "./node_modules/rot-js/lib/display/term.js":
/*!*************************************************!*\
  !*** ./node_modules/rot-js/lib/display/term.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Term)
/* harmony export */ });
/* harmony import */ var _backend_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./backend.js */ "./node_modules/rot-js/lib/display/backend.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.js */ "./node_modules/rot-js/lib/color.js");


function clearToAnsi(bg) {
    return `\x1b[0;48;5;${termcolor(bg)}m\x1b[2J`;
}
function colorToAnsi(fg, bg) {
    return `\x1b[0;38;5;${termcolor(fg)};48;5;${termcolor(bg)}m`;
}
function positionToAnsi(x, y) {
    return `\x1b[${y + 1};${x + 1}H`;
}
function termcolor(color) {
    const SRC_COLORS = 256.0;
    const DST_COLORS = 6.0;
    const COLOR_RATIO = DST_COLORS / SRC_COLORS;
    let rgb = _color_js__WEBPACK_IMPORTED_MODULE_1__.fromString(color);
    let r = Math.floor(rgb[0] * COLOR_RATIO);
    let g = Math.floor(rgb[1] * COLOR_RATIO);
    let b = Math.floor(rgb[2] * COLOR_RATIO);
    return r * 36 + g * 6 + b * 1 + 16;
}
class Term extends _backend_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this._offset = [0, 0];
        this._cursor = [-1, -1];
        this._lastColor = "";
    }
    schedule(cb) { setTimeout(cb, 1000 / 60); }
    setOptions(options) {
        super.setOptions(options);
        let size = [options.width, options.height];
        let avail = this.computeSize();
        this._offset = avail.map((val, index) => Math.floor((val - size[index]) / 2));
    }
    clear() {
        process.stdout.write(clearToAnsi(this._options.bg));
    }
    draw(data, clearBefore) {
        // determine where to draw what with what colors
        let [x, y, ch, fg, bg] = data;
        // determine if we need to move the terminal cursor
        let dx = this._offset[0] + x;
        let dy = this._offset[1] + y;
        let size = this.computeSize();
        if (dx < 0 || dx >= size[0]) {
            return;
        }
        if (dy < 0 || dy >= size[1]) {
            return;
        }
        if (dx !== this._cursor[0] || dy !== this._cursor[1]) {
            process.stdout.write(positionToAnsi(dx, dy));
            this._cursor[0] = dx;
            this._cursor[1] = dy;
        }
        // terminals automatically clear, but if we're clearing when we're
        // not otherwise provided with a character, just use a space instead
        if (clearBefore) {
            if (!ch) {
                ch = " ";
            }
        }
        // if we're not clearing and not provided with a character, do nothing
        if (!ch) {
            return;
        }
        // determine if we need to change colors
        let newColor = colorToAnsi(fg, bg);
        if (newColor !== this._lastColor) {
            process.stdout.write(newColor);
            this._lastColor = newColor;
        }
        if (ch != '\t') {
            // write the provided symbol to the display
            let chars = [].concat(ch);
            process.stdout.write(chars[0]);
        }
        // update our position, given that we wrote a character
        this._cursor[0]++;
        if (this._cursor[0] >= size[0]) {
            this._cursor[0] = 0;
            this._cursor[1]++;
        }
    }
    computeFontSize() { throw new Error("Terminal backend has no notion of font size"); }
    eventToPosition(x, y) { return [x, y]; }
    computeSize() { return [process.stdout.columns, process.stdout.rows]; }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/display/tile-gl.js":
/*!****************************************************!*\
  !*** ./node_modules/rot-js/lib/display/tile-gl.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TileGL)
/* harmony export */ });
/* harmony import */ var _backend_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./backend.js */ "./node_modules/rot-js/lib/display/backend.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.js */ "./node_modules/rot-js/lib/color.js");


/**
 * @class Tile backend
 * @private
 */
class TileGL extends _backend_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this._uniforms = {};
        try {
            this._gl = this._initWebGL();
        }
        catch (e) {
            alert(e.message);
        }
    }
    static isSupported() {
        return !!document.createElement("canvas").getContext("webgl2", { preserveDrawingBuffer: true });
    }
    schedule(cb) { requestAnimationFrame(cb); }
    getContainer() { return this._gl.canvas; }
    setOptions(opts) {
        super.setOptions(opts);
        this._updateSize();
        let tileSet = this._options.tileSet;
        if (tileSet && "complete" in tileSet && !tileSet.complete) {
            tileSet.addEventListener("load", () => this._updateTexture(tileSet));
        }
        else {
            this._updateTexture(tileSet);
        }
    }
    draw(data, clearBefore) {
        const gl = this._gl;
        const opts = this._options;
        let [x, y, ch, fg, bg] = data;
        let scissorY = gl.canvas.height - (y + 1) * opts.tileHeight;
        gl.scissor(x * opts.tileWidth, scissorY, opts.tileWidth, opts.tileHeight);
        if (clearBefore) {
            if (opts.tileColorize) {
                gl.clearColor(0, 0, 0, 0);
            }
            else {
                gl.clearColor(...parseColor(bg));
            }
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        if (!ch) {
            return;
        }
        let chars = [].concat(ch);
        let bgs = [].concat(bg);
        let fgs = [].concat(fg);
        gl.uniform2fv(this._uniforms["targetPosRel"], [x, y]);
        for (let i = 0; i < chars.length; i++) {
            let tile = this._options.tileMap[chars[i]];
            if (!tile) {
                throw new Error(`Char "${chars[i]}" not found in tileMap`);
            }
            gl.uniform1f(this._uniforms["colorize"], opts.tileColorize ? 1 : 0);
            gl.uniform2fv(this._uniforms["tilesetPosAbs"], tile);
            if (opts.tileColorize) {
                gl.uniform4fv(this._uniforms["tint"], parseColor(fgs[i]));
                gl.uniform4fv(this._uniforms["bg"], parseColor(bgs[i]));
            }
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
        /*
        
        
                for (let i=0;i<chars.length;i++) {
        
                    if (this._options.tileColorize) { // apply colorization
                        let canvas = this._colorCanvas;
                        let context = canvas.getContext("2d") as CanvasRenderingContext2D;
                        context.globalCompositeOperation = "source-over";
                        context.clearRect(0, 0, tileWidth, tileHeight);
        
                        let fg = fgs[i];
                        let bg = bgs[i];
        
                        context.drawImage(
                            this._options.tileSet!,
                            tile[0], tile[1], tileWidth, tileHeight,
                            0, 0, tileWidth, tileHeight
                        );
        
                        if (fg != "transparent") {
                            context.fillStyle = fg;
                            context.globalCompositeOperation = "source-atop";
                            context.fillRect(0, 0, tileWidth, tileHeight);
                        }
        
                        if (bg != "transparent") {
                            context.fillStyle = bg;
                            context.globalCompositeOperation = "destination-over";
                            context.fillRect(0, 0, tileWidth, tileHeight);
                        }
        
                        this._ctx.drawImage(canvas, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
                    } else { // no colorizing, easy
                        this._ctx.drawImage(
                            this._options.tileSet!,
                            tile[0], tile[1], tileWidth, tileHeight,
                            x*tileWidth, y*tileHeight, tileWidth, tileHeight
                        );
                    }
                }
        
        */
    }
    clear() {
        const gl = this._gl;
        gl.clearColor(...parseColor(this._options.bg));
        gl.scissor(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
    computeSize(availWidth, availHeight) {
        let width = Math.floor(availWidth / this._options.tileWidth);
        let height = Math.floor(availHeight / this._options.tileHeight);
        return [width, height];
    }
    computeFontSize() {
        throw new Error("Tile backend does not understand font size");
    }
    eventToPosition(x, y) {
        let canvas = this._gl.canvas;
        let rect = canvas.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;
        x *= canvas.width / rect.width;
        y *= canvas.height / rect.height;
        if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
            return [-1, -1];
        }
        return this._normalizedEventToPosition(x, y);
    }
    _initWebGL() {
        let gl = document.createElement("canvas").getContext("webgl2", { preserveDrawingBuffer: true });
        window.gl = gl;
        let program = createProgram(gl, VS, FS);
        gl.useProgram(program);
        createQuad(gl);
        UNIFORMS.forEach(name => this._uniforms[name] = gl.getUniformLocation(program, name));
        this._program = program;
        gl.enable(gl.BLEND);
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.SCISSOR_TEST);
        return gl;
    }
    _normalizedEventToPosition(x, y) {
        return [Math.floor(x / this._options.tileWidth), Math.floor(y / this._options.tileHeight)];
    }
    _updateSize() {
        const gl = this._gl;
        const opts = this._options;
        const canvasSize = [opts.width * opts.tileWidth, opts.height * opts.tileHeight];
        gl.canvas.width = canvasSize[0];
        gl.canvas.height = canvasSize[1];
        gl.viewport(0, 0, canvasSize[0], canvasSize[1]);
        gl.uniform2fv(this._uniforms["tileSize"], [opts.tileWidth, opts.tileHeight]);
        gl.uniform2fv(this._uniforms["targetSize"], canvasSize);
    }
    _updateTexture(tileSet) {
        createTexture(this._gl, tileSet);
    }
}
const UNIFORMS = ["targetPosRel", "tilesetPosAbs", "tileSize", "targetSize", "colorize", "bg", "tint"];
const VS = `
#version 300 es

in vec2 tilePosRel;
out vec2 tilesetPosPx;

uniform vec2 tilesetPosAbs;
uniform vec2 tileSize;
uniform vec2 targetSize;
uniform vec2 targetPosRel;

void main() {
	vec2 targetPosPx = (targetPosRel + tilePosRel) * tileSize;
	vec2 targetPosNdc = ((targetPosPx / targetSize)-0.5)*2.0;
	targetPosNdc.y *= -1.0;

	gl_Position = vec4(targetPosNdc, 0.0, 1.0);
	tilesetPosPx = tilesetPosAbs + tilePosRel * tileSize;
}`.trim();
const FS = `
#version 300 es
precision highp float;

in vec2 tilesetPosPx;
out vec4 fragColor;
uniform sampler2D image;
uniform bool colorize;
uniform vec4 bg;
uniform vec4 tint;

void main() {
	fragColor = vec4(0, 0, 0, 1);

	vec4 texel = texelFetch(image, ivec2(tilesetPosPx), 0);

	if (colorize) {
		texel.rgb = tint.a * tint.rgb + (1.0-tint.a) * texel.rgb;
		fragColor.rgb = texel.a*texel.rgb + (1.0-texel.a)*bg.rgb;
		fragColor.a = texel.a + (1.0-texel.a)*bg.a;
	} else {
		fragColor = texel;
	}
}`.trim();
function createProgram(gl, vss, fss) {
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vss);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(vs) || "");
    }
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fss);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(fs) || "");
    }
    const p = gl.createProgram();
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(p) || "");
    }
    return p;
}
function createQuad(gl) {
    const pos = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
}
function createTexture(gl, data) {
    let t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
    return t;
}
let colorCache = {};
function parseColor(color) {
    if (!(color in colorCache)) {
        let parsed;
        if (color == "transparent") {
            parsed = [0, 0, 0, 0];
        }
        else if (color.indexOf("rgba") > -1) {
            parsed = (color.match(/[\d.]+/g) || []).map(Number);
            for (let i = 0; i < 3; i++) {
                parsed[i] = parsed[i] / 255;
            }
        }
        else {
            parsed = _color_js__WEBPACK_IMPORTED_MODULE_1__.fromString(color).map($ => $ / 255);
            parsed.push(1);
        }
        colorCache[color] = parsed;
    }
    return colorCache[color];
}


/***/ }),

/***/ "./node_modules/rot-js/lib/display/tile.js":
/*!*************************************************!*\
  !*** ./node_modules/rot-js/lib/display/tile.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Tile)
/* harmony export */ });
/* harmony import */ var _canvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas.js */ "./node_modules/rot-js/lib/display/canvas.js");

/**
 * @class Tile backend
 * @private
 */
class Tile extends _canvas_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this._colorCanvas = document.createElement("canvas");
    }
    draw(data, clearBefore) {
        let [x, y, ch, fg, bg] = data;
        let tileWidth = this._options.tileWidth;
        let tileHeight = this._options.tileHeight;
        if (clearBefore) {
            if (this._options.tileColorize) {
                this._ctx.clearRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            }
            else {
                this._ctx.fillStyle = bg;
                this._ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            }
        }
        if (!ch) {
            return;
        }
        let chars = [].concat(ch);
        let fgs = [].concat(fg);
        let bgs = [].concat(bg);
        for (let i = 0; i < chars.length; i++) {
            let tile = this._options.tileMap[chars[i]];
            if (!tile) {
                throw new Error(`Char "${chars[i]}" not found in tileMap`);
            }
            if (this._options.tileColorize) { // apply colorization
                let canvas = this._colorCanvas;
                let context = canvas.getContext("2d");
                context.globalCompositeOperation = "source-over";
                context.clearRect(0, 0, tileWidth, tileHeight);
                let fg = fgs[i];
                let bg = bgs[i];
                context.drawImage(this._options.tileSet, tile[0], tile[1], tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);
                if (fg != "transparent") {
                    context.fillStyle = fg;
                    context.globalCompositeOperation = "source-atop";
                    context.fillRect(0, 0, tileWidth, tileHeight);
                }
                if (bg != "transparent") {
                    context.fillStyle = bg;
                    context.globalCompositeOperation = "destination-over";
                    context.fillRect(0, 0, tileWidth, tileHeight);
                }
                this._ctx.drawImage(canvas, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            }
            else { // no colorizing, easy
                this._ctx.drawImage(this._options.tileSet, tile[0], tile[1], tileWidth, tileHeight, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            }
        }
    }
    computeSize(availWidth, availHeight) {
        let width = Math.floor(availWidth / this._options.tileWidth);
        let height = Math.floor(availHeight / this._options.tileHeight);
        return [width, height];
    }
    computeFontSize() {
        throw new Error("Tile backend does not understand font size");
    }
    _normalizedEventToPosition(x, y) {
        return [Math.floor(x / this._options.tileWidth), Math.floor(y / this._options.tileHeight)];
    }
    _updateSize() {
        const opts = this._options;
        this._ctx.canvas.width = opts.width * opts.tileWidth;
        this._ctx.canvas.height = opts.height * opts.tileHeight;
        this._colorCanvas.width = opts.tileWidth;
        this._colorCanvas.height = opts.tileHeight;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/engine.js":
/*!*******************************************!*\
  !*** ./node_modules/rot-js/lib/engine.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Engine)
/* harmony export */ });
/**
 * @class Asynchronous main loop
 * @param {ROT.Scheduler} scheduler
 */
class Engine {
    constructor(scheduler) {
        this._scheduler = scheduler;
        this._lock = 1;
    }
    /**
     * Start the main loop. When this call returns, the loop is locked.
     */
    start() { return this.unlock(); }
    /**
     * Interrupt the engine by an asynchronous action
     */
    lock() {
        this._lock++;
        return this;
    }
    /**
     * Resume execution (paused by a previous lock)
     */
    unlock() {
        if (!this._lock) {
            throw new Error("Cannot unlock unlocked engine");
        }
        this._lock--;
        while (!this._lock) {
            let actor = this._scheduler.next();
            if (!actor) {
                return this.lock();
            } /* no actors */
            let result = actor.act();
            if (result && result.then) { /* actor returned a "thenable", looks like a Promise */
                this.lock();
                result.then(this.unlock.bind(this));
            }
        }
        return this;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/eventqueue.js":
/*!***********************************************!*\
  !*** ./node_modules/rot-js/lib/eventqueue.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventQueue)
/* harmony export */ });
/* harmony import */ var _MinHeap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MinHeap.js */ "./node_modules/rot-js/lib/MinHeap.js");

class EventQueue {
    /**
     * @class Generic event queue: stores events and retrieves them based on their time
     */
    constructor() {
        this._time = 0;
        this._events = new _MinHeap_js__WEBPACK_IMPORTED_MODULE_0__.MinHeap();
    }
    /**
     * @returns {number} Elapsed time
     */
    getTime() { return this._time; }
    /**
     * Clear all scheduled events
     */
    clear() {
        this._events = new _MinHeap_js__WEBPACK_IMPORTED_MODULE_0__.MinHeap();
        return this;
    }
    /**
     * @param {?} event
     * @param {number} time
     */
    add(event, time) {
        this._events.push(event, time);
    }
    /**
     * Locates the nearest event, advances time if necessary. Returns that event and removes it from the queue.
     * @returns {? || null} The event previously added by addEvent, null if no event available
     */
    get() {
        if (!this._events.len()) {
            return null;
        }
        let { key: time, value: event } = this._events.pop();
        if (time > 0) { /* advance */
            this._time += time;
            this._events.shift(-time);
        }
        return event;
    }
    /**
     * Get the time associated with the given event
     * @param {?} event
     * @returns {number} time
     */
    getEventTime(event) {
        const r = this._events.find(event);
        if (r) {
            const { key } = r;
            return key;
        }
        return undefined;
    }
    /**
     * Remove an event from the queue
     * @param {?} event
     * @returns {bool} success?
     */
    remove(event) {
        return this._events.remove(event);
    }
    ;
}


/***/ }),

/***/ "./node_modules/rot-js/lib/fov/discrete-shadowcasting.js":
/*!***************************************************************!*\
  !*** ./node_modules/rot-js/lib/fov/discrete-shadowcasting.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DiscreteShadowcasting)
/* harmony export */ });
/* harmony import */ var _fov_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fov.js */ "./node_modules/rot-js/lib/fov/fov.js");

/**
 * @class Discrete shadowcasting algorithm. Obsoleted by Precise shadowcasting.
 * @augments ROT.FOV
 */
class DiscreteShadowcasting extends _fov_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    compute(x, y, R, callback) {
        /* this place is always visible */
        callback(x, y, 0, 1);
        /* standing in a dark place. FIXME is this a good idea?  */
        if (!this._lightPasses(x, y)) {
            return;
        }
        /* start and end angles */
        let DATA = [];
        let A, B, cx, cy, blocks;
        /* analyze surrounding cells in concentric rings, starting from the center */
        for (let r = 1; r <= R; r++) {
            let neighbors = this._getCircle(x, y, r);
            let angle = 360 / neighbors.length;
            for (let i = 0; i < neighbors.length; i++) {
                cx = neighbors[i][0];
                cy = neighbors[i][1];
                A = angle * (i - 0.5);
                B = A + angle;
                blocks = !this._lightPasses(cx, cy);
                if (this._visibleCoords(Math.floor(A), Math.ceil(B), blocks, DATA)) {
                    callback(cx, cy, r, 1);
                }
                if (DATA.length == 2 && DATA[0] == 0 && DATA[1] == 360) {
                    return;
                } /* cutoff? */
            } /* for all cells in this ring */
        } /* for all rings */
    }
    /**
     * @param {int} A start angle
     * @param {int} B end angle
     * @param {bool} blocks Does current cell block visibility?
     * @param {int[][]} DATA shadowed angle pairs
     */
    _visibleCoords(A, B, blocks, DATA) {
        if (A < 0) {
            let v1 = this._visibleCoords(0, B, blocks, DATA);
            let v2 = this._visibleCoords(360 + A, 360, blocks, DATA);
            return v1 || v2;
        }
        let index = 0;
        while (index < DATA.length && DATA[index] < A) {
            index++;
        }
        if (index == DATA.length) { /* completely new shadow */
            if (blocks) {
                DATA.push(A, B);
            }
            return true;
        }
        let count = 0;
        if (index % 2) { /* this shadow starts in an existing shadow, or within its ending boundary */
            while (index < DATA.length && DATA[index] < B) {
                index++;
                count++;
            }
            if (count == 0) {
                return false;
            }
            if (blocks) {
                if (count % 2) {
                    DATA.splice(index - count, count, B);
                }
                else {
                    DATA.splice(index - count, count);
                }
            }
            return true;
        }
        else { /* this shadow starts outside an existing shadow, or within a starting boundary */
            while (index < DATA.length && DATA[index] < B) {
                index++;
                count++;
            }
            /* visible when outside an existing shadow, or when overlapping */
            if (A == DATA[index - count] && count == 1) {
                return false;
            }
            if (blocks) {
                if (count % 2) {
                    DATA.splice(index - count, count, A);
                }
                else {
                    DATA.splice(index - count, count, A, B);
                }
            }
            return true;
        }
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/fov/fov.js":
/*!********************************************!*\
  !*** ./node_modules/rot-js/lib/fov/fov.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FOV)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./node_modules/rot-js/lib/constants.js");

;
;
class FOV {
    /**
     * @class Abstract FOV algorithm
     * @param {function} lightPassesCallback Does the light pass through x,y?
     * @param {object} [options]
     * @param {int} [options.topology=8] 4/6/8
     */
    constructor(lightPassesCallback, options = {}) {
        this._lightPasses = lightPassesCallback;
        this._options = Object.assign({ topology: 8 }, options);
    }
    /**
     * Return all neighbors in a concentric ring
     * @param {int} cx center-x
     * @param {int} cy center-y
     * @param {int} r range
     */
    _getCircle(cx, cy, r) {
        let result = [];
        let dirs, countFactor, startOffset;
        switch (this._options.topology) {
            case 4:
                countFactor = 1;
                startOffset = [0, 1];
                dirs = [
                    _constants_js__WEBPACK_IMPORTED_MODULE_0__.DIRS[8][7],
                    _constants_js__WEBPACK_IMPORTED_MODULE_0__.DIRS[8][1],
                    _constants_js__WEBPACK_IMPORTED_MODULE_0__.DIRS[8][3],
                    _constants_js__WEBPACK_IMPORTED_MODULE_0__.DIRS[8][5]
                ];
                break;
            case 6:
                dirs = _constants_js__WEBPACK_IMPORTED_MODULE_0__.DIRS[6];
                countFactor = 1;
                startOffset = [-1, 1];
                break;
            case 8:
                dirs = _constants_js__WEBPACK_IMPORTED_MODULE_0__.DIRS[4];
                countFactor = 2;
                startOffset = [-1, 1];
                break;
            default:
                throw new Error("Incorrect topology for FOV computation");
                break;
        }
        /* starting neighbor */
        let x = cx + startOffset[0] * r;
        let y = cy + startOffset[1] * r;
        /* circle */
        for (let i = 0; i < dirs.length; i++) {
            for (let j = 0; j < r * countFactor; j++) {
                result.push([x, y]);
                x += dirs[i][0];
                y += dirs[i][1];
            }
        }
        return result;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/fov/index.js":
/*!**********************************************!*\
  !*** ./node_modules/rot-js/lib/fov/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _discrete_shadowcasting_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./discrete-shadowcasting.js */ "./node_modules/rot-js/lib/fov/discrete-shadowcasting.js");
/* harmony import */ var _precise_shadowcasting_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./precise-shadowcasting.js */ "./node_modules/rot-js/lib/fov/precise-shadowcasting.js");
/* harmony import */ var _recursive_shadowcasting_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./recursive-shadowcasting.js */ "./node_modules/rot-js/lib/fov/recursive-shadowcasting.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ DiscreteShadowcasting: _discrete_shadowcasting_js__WEBPACK_IMPORTED_MODULE_0__["default"], PreciseShadowcasting: _precise_shadowcasting_js__WEBPACK_IMPORTED_MODULE_1__["default"], RecursiveShadowcasting: _recursive_shadowcasting_js__WEBPACK_IMPORTED_MODULE_2__["default"] });


/***/ }),

/***/ "./node_modules/rot-js/lib/fov/precise-shadowcasting.js":
/*!**************************************************************!*\
  !*** ./node_modules/rot-js/lib/fov/precise-shadowcasting.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PreciseShadowcasting)
/* harmony export */ });
/* harmony import */ var _fov_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fov.js */ "./node_modules/rot-js/lib/fov/fov.js");

/**
 * @class Precise shadowcasting algorithm
 * @augments ROT.FOV
 */
class PreciseShadowcasting extends _fov_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    compute(x, y, R, callback) {
        /* this place is always visible */
        callback(x, y, 0, 1);
        /* standing in a dark place. FIXME is this a good idea?  */
        if (!this._lightPasses(x, y)) {
            return;
        }
        /* list of all shadows */
        let SHADOWS = [];
        let cx, cy, blocks, A1, A2, visibility;
        /* analyze surrounding cells in concentric rings, starting from the center */
        for (let r = 1; r <= R; r++) {
            let neighbors = this._getCircle(x, y, r);
            let neighborCount = neighbors.length;
            for (let i = 0; i < neighborCount; i++) {
                cx = neighbors[i][0];
                cy = neighbors[i][1];
                /* shift half-an-angle backwards to maintain consistency of 0-th cells */
                A1 = [i ? 2 * i - 1 : 2 * neighborCount - 1, 2 * neighborCount];
                A2 = [2 * i + 1, 2 * neighborCount];
                blocks = !this._lightPasses(cx, cy);
                visibility = this._checkVisibility(A1, A2, blocks, SHADOWS);
                if (visibility) {
                    callback(cx, cy, r, visibility);
                }
                if (SHADOWS.length == 2 && SHADOWS[0][0] == 0 && SHADOWS[1][0] == SHADOWS[1][1]) {
                    return;
                } /* cutoff? */
            } /* for all cells in this ring */
        } /* for all rings */
    }
    /**
     * @param {int[2]} A1 arc start
     * @param {int[2]} A2 arc end
     * @param {bool} blocks Does current arc block visibility?
     * @param {int[][]} SHADOWS list of active shadows
     */
    _checkVisibility(A1, A2, blocks, SHADOWS) {
        if (A1[0] > A2[0]) { /* split into two sub-arcs */
            let v1 = this._checkVisibility(A1, [A1[1], A1[1]], blocks, SHADOWS);
            let v2 = this._checkVisibility([0, 1], A2, blocks, SHADOWS);
            return (v1 + v2) / 2;
        }
        /* index1: first shadow >= A1 */
        let index1 = 0, edge1 = false;
        while (index1 < SHADOWS.length) {
            let old = SHADOWS[index1];
            let diff = old[0] * A1[1] - A1[0] * old[1];
            if (diff >= 0) { /* old >= A1 */
                if (diff == 0 && !(index1 % 2)) {
                    edge1 = true;
                }
                break;
            }
            index1++;
        }
        /* index2: last shadow <= A2 */
        let index2 = SHADOWS.length, edge2 = false;
        while (index2--) {
            let old = SHADOWS[index2];
            let diff = A2[0] * old[1] - old[0] * A2[1];
            if (diff >= 0) { /* old <= A2 */
                if (diff == 0 && (index2 % 2)) {
                    edge2 = true;
                }
                break;
            }
        }
        let visible = true;
        if (index1 == index2 && (edge1 || edge2)) { /* subset of existing shadow, one of the edges match */
            visible = false;
        }
        else if (edge1 && edge2 && index1 + 1 == index2 && (index2 % 2)) { /* completely equivalent with existing shadow */
            visible = false;
        }
        else if (index1 > index2 && (index1 % 2)) { /* subset of existing shadow, not touching */
            visible = false;
        }
        if (!visible) {
            return 0;
        } /* fast case: not visible */
        let visibleLength;
        /* compute the length of visible arc, adjust list of shadows (if blocking) */
        let remove = index2 - index1 + 1;
        if (remove % 2) {
            if (index1 % 2) { /* first edge within existing shadow, second outside */
                let P = SHADOWS[index1];
                visibleLength = (A2[0] * P[1] - P[0] * A2[1]) / (P[1] * A2[1]);
                if (blocks) {
                    SHADOWS.splice(index1, remove, A2);
                }
            }
            else { /* second edge within existing shadow, first outside */
                let P = SHADOWS[index2];
                visibleLength = (P[0] * A1[1] - A1[0] * P[1]) / (A1[1] * P[1]);
                if (blocks) {
                    SHADOWS.splice(index1, remove, A1);
                }
            }
        }
        else {
            if (index1 % 2) { /* both edges within existing shadows */
                let P1 = SHADOWS[index1];
                let P2 = SHADOWS[index2];
                visibleLength = (P2[0] * P1[1] - P1[0] * P2[1]) / (P1[1] * P2[1]);
                if (blocks) {
                    SHADOWS.splice(index1, remove);
                }
            }
            else { /* both edges outside existing shadows */
                if (blocks) {
                    SHADOWS.splice(index1, remove, A1, A2);
                }
                return 1; /* whole arc visible! */
            }
        }
        let arcLength = (A2[0] * A1[1] - A1[0] * A2[1]) / (A1[1] * A2[1]);
        return visibleLength / arcLength;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/fov/recursive-shadowcasting.js":
/*!****************************************************************!*\
  !*** ./node_modules/rot-js/lib/fov/recursive-shadowcasting.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RecursiveShadowcasting)
/* harmony export */ });
/* harmony import */ var _fov_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fov.js */ "./node_modules/rot-js/lib/fov/fov.js");

/** Octants used for translating recursive shadowcasting offsets */
const OCTANTS = [
    [-1, 0, 0, 1],
    [0, -1, 1, 0],
    [0, -1, -1, 0],
    [-1, 0, 0, -1],
    [1, 0, 0, -1],
    [0, 1, -1, 0],
    [0, 1, 1, 0],
    [1, 0, 0, 1]
];
/**
 * @class Recursive shadowcasting algorithm
 * Currently only supports 4/8 topologies, not hexagonal.
 * Based on Peter Harkins' implementation of Björn Bergström's algorithm described here: http://www.roguebasin.com/index.php?title=FOV_using_recursive_shadowcasting
 * @augments ROT.FOV
 */
class RecursiveShadowcasting extends _fov_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * Compute visibility for a 360-degree circle
     * @param {int} x
     * @param {int} y
     * @param {int} R Maximum visibility radius
     * @param {function} callback
     */
    compute(x, y, R, callback) {
        //You can always see your own tile
        callback(x, y, 0, 1);
        for (let i = 0; i < OCTANTS.length; i++) {
            this._renderOctant(x, y, OCTANTS[i], R, callback);
        }
    }
    /**
     * Compute visibility for a 180-degree arc
     * @param {int} x
     * @param {int} y
     * @param {int} R Maximum visibility radius
     * @param {int} dir Direction to look in (expressed in a ROT.DIRS value);
     * @param {function} callback
     */
    compute180(x, y, R, dir, callback) {
        //You can always see your own tile
        callback(x, y, 0, 1);
        let previousOctant = (dir - 1 + 8) % 8; //Need to retrieve the previous octant to render a full 180 degrees
        let nextPreviousOctant = (dir - 2 + 8) % 8; //Need to retrieve the previous two octants to render a full 180 degrees
        let nextOctant = (dir + 1 + 8) % 8; //Need to grab to next octant to render a full 180 degrees
        this._renderOctant(x, y, OCTANTS[nextPreviousOctant], R, callback);
        this._renderOctant(x, y, OCTANTS[previousOctant], R, callback);
        this._renderOctant(x, y, OCTANTS[dir], R, callback);
        this._renderOctant(x, y, OCTANTS[nextOctant], R, callback);
    }
    ;
    /**
     * Compute visibility for a 90-degree arc
     * @param {int} x
     * @param {int} y
     * @param {int} R Maximum visibility radius
     * @param {int} dir Direction to look in (expressed in a ROT.DIRS value);
     * @param {function} callback
     */
    compute90(x, y, R, dir, callback) {
        //You can always see your own tile
        callback(x, y, 0, 1);
        let previousOctant = (dir - 1 + 8) % 8; //Need to retrieve the previous octant to render a full 90 degrees
        this._renderOctant(x, y, OCTANTS[dir], R, callback);
        this._renderOctant(x, y, OCTANTS[previousOctant], R, callback);
    }
    /**
     * Render one octant (45-degree arc) of the viewshed
     * @param {int} x
     * @param {int} y
     * @param {int} octant Octant to be rendered
     * @param {int} R Maximum visibility radius
     * @param {function} callback
     */
    _renderOctant(x, y, octant, R, callback) {
        //Radius incremented by 1 to provide same coverage area as other shadowcasting radiuses
        this._castVisibility(x, y, 1, 1.0, 0.0, R + 1, octant[0], octant[1], octant[2], octant[3], callback);
    }
    /**
     * Actually calculates the visibility
     * @param {int} startX The starting X coordinate
     * @param {int} startY The starting Y coordinate
     * @param {int} row The row to render
     * @param {float} visSlopeStart The slope to start at
     * @param {float} visSlopeEnd The slope to end at
     * @param {int} radius The radius to reach out to
     * @param {int} xx
     * @param {int} xy
     * @param {int} yx
     * @param {int} yy
     * @param {function} callback The callback to use when we hit a block that is visible
     */
    _castVisibility(startX, startY, row, visSlopeStart, visSlopeEnd, radius, xx, xy, yx, yy, callback) {
        if (visSlopeStart < visSlopeEnd) {
            return;
        }
        for (let i = row; i <= radius; i++) {
            let dx = -i - 1;
            let dy = -i;
            let blocked = false;
            let newStart = 0;
            //'Row' could be column, names here assume octant 0 and would be flipped for half the octants
            while (dx <= 0) {
                dx += 1;
                //Translate from relative coordinates to map coordinates
                let mapX = startX + dx * xx + dy * xy;
                let mapY = startY + dx * yx + dy * yy;
                //Range of the row
                let slopeStart = (dx - 0.5) / (dy + 0.5);
                let slopeEnd = (dx + 0.5) / (dy - 0.5);
                //Ignore if not yet at left edge of Octant
                if (slopeEnd > visSlopeStart) {
                    continue;
                }
                //Done if past right edge
                if (slopeStart < visSlopeEnd) {
                    break;
                }
                //If it's in range, it's visible
                if ((dx * dx + dy * dy) < (radius * radius)) {
                    callback(mapX, mapY, i, 1);
                }
                if (!blocked) {
                    //If tile is a blocking tile, cast around it
                    if (!this._lightPasses(mapX, mapY) && i < radius) {
                        blocked = true;
                        this._castVisibility(startX, startY, i + 1, visSlopeStart, slopeStart, radius, xx, xy, yx, yy, callback);
                        newStart = slopeEnd;
                    }
                }
                else {
                    //Keep narrowing if scanning across a block
                    if (!this._lightPasses(mapX, mapY)) {
                        newStart = slopeEnd;
                        continue;
                    }
                    //Block has ended
                    blocked = false;
                    visSlopeStart = newStart;
                }
            }
            if (blocked) {
                break;
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/index.js":
/*!******************************************!*\
  !*** ./node_modules/rot-js/lib/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Color": () => (/* binding */ Color),
/* harmony export */   "DEFAULT_HEIGHT": () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_11__.DEFAULT_HEIGHT),
/* harmony export */   "DEFAULT_WIDTH": () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_11__.DEFAULT_WIDTH),
/* harmony export */   "DIRS": () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_11__.DIRS),
/* harmony export */   "Display": () => (/* reexport safe */ _display_display_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "Engine": () => (/* reexport safe */ _engine_js__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "EventQueue": () => (/* reexport safe */ _eventqueue_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "FOV": () => (/* reexport safe */ _fov_index_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "KEYS": () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_11__.KEYS),
/* harmony export */   "Lighting": () => (/* reexport safe */ _lighting_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "Map": () => (/* reexport safe */ _map_index_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "Noise": () => (/* reexport safe */ _noise_index_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "Path": () => (/* reexport safe */ _path_index_js__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   "RNG": () => (/* reexport safe */ _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "Scheduler": () => (/* reexport safe */ _scheduler_index_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "StringGenerator": () => (/* reexport safe */ _stringgenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "Text": () => (/* binding */ Text),
/* harmony export */   "Util": () => (/* binding */ Util)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/rot-js/lib/rng.js");
/* harmony import */ var _display_display_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display/display.js */ "./node_modules/rot-js/lib/display/display.js");
/* harmony import */ var _stringgenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringgenerator.js */ "./node_modules/rot-js/lib/stringgenerator.js");
/* harmony import */ var _eventqueue_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventqueue.js */ "./node_modules/rot-js/lib/eventqueue.js");
/* harmony import */ var _scheduler_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scheduler/index.js */ "./node_modules/rot-js/lib/scheduler/index.js");
/* harmony import */ var _fov_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fov/index.js */ "./node_modules/rot-js/lib/fov/index.js");
/* harmony import */ var _map_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./map/index.js */ "./node_modules/rot-js/lib/map/index.js");
/* harmony import */ var _noise_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./noise/index.js */ "./node_modules/rot-js/lib/noise/index.js");
/* harmony import */ var _path_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./path/index.js */ "./node_modules/rot-js/lib/path/index.js");
/* harmony import */ var _engine_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./engine.js */ "./node_modules/rot-js/lib/engine.js");
/* harmony import */ var _lighting_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lighting.js */ "./node_modules/rot-js/lib/lighting.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./constants.js */ "./node_modules/rot-js/lib/constants.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./util.js */ "./node_modules/rot-js/lib/util.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./color.js */ "./node_modules/rot-js/lib/color.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./text.js */ "./node_modules/rot-js/lib/text.js");













const Util = _util_js__WEBPACK_IMPORTED_MODULE_12__;

const Color = _color_js__WEBPACK_IMPORTED_MODULE_13__;

const Text = _text_js__WEBPACK_IMPORTED_MODULE_14__;


/***/ }),

/***/ "./node_modules/rot-js/lib/lighting.js":
/*!*********************************************!*\
  !*** ./node_modules/rot-js/lib/lighting.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Lighting)
/* harmony export */ });
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color.js */ "./node_modules/rot-js/lib/color.js");

;
;
;
;
/**
 * Lighting computation, based on a traditional FOV for multiple light sources and multiple passes.
 */
class Lighting {
    constructor(reflectivityCallback, options = {}) {
        this._reflectivityCallback = reflectivityCallback;
        this._options = {};
        options = Object.assign({
            passes: 1,
            emissionThreshold: 100,
            range: 10
        }, options);
        this._lights = {};
        this._reflectivityCache = {};
        this._fovCache = {};
        this.setOptions(options);
    }
    /**
     * Adjust options at runtime
     */
    setOptions(options) {
        Object.assign(this._options, options);
        if (options && options.range) {
            this.reset();
        }
        return this;
    }
    /**
     * Set the used Field-Of-View algo
     */
    setFOV(fov) {
        this._fov = fov;
        this._fovCache = {};
        return this;
    }
    /**
     * Set (or remove) a light source
     */
    setLight(x, y, color) {
        let key = x + "," + y;
        if (color) {
            this._lights[key] = (typeof (color) == "string" ? _color_js__WEBPACK_IMPORTED_MODULE_0__.fromString(color) : color);
        }
        else {
            delete this._lights[key];
        }
        return this;
    }
    /**
     * Remove all light sources
     */
    clearLights() { this._lights = {}; }
    /**
     * Reset the pre-computed topology values. Call whenever the underlying map changes its light-passability.
     */
    reset() {
        this._reflectivityCache = {};
        this._fovCache = {};
        return this;
    }
    /**
     * Compute the lighting
     */
    compute(lightingCallback) {
        let doneCells = {};
        let emittingCells = {};
        let litCells = {};
        for (let key in this._lights) { /* prepare emitters for first pass */
            let light = this._lights[key];
            emittingCells[key] = [0, 0, 0];
            _color_js__WEBPACK_IMPORTED_MODULE_0__.add_(emittingCells[key], light);
        }
        for (let i = 0; i < this._options.passes; i++) { /* main loop */
            this._emitLight(emittingCells, litCells, doneCells);
            if (i + 1 == this._options.passes) {
                continue;
            } /* not for the last pass */
            emittingCells = this._computeEmitters(litCells, doneCells);
        }
        for (let litKey in litCells) { /* let the user know what and how is lit */
            let parts = litKey.split(",");
            let x = parseInt(parts[0]);
            let y = parseInt(parts[1]);
            lightingCallback(x, y, litCells[litKey]);
        }
        return this;
    }
    /**
     * Compute one iteration from all emitting cells
     * @param emittingCells These emit light
     * @param litCells Add projected light to these
     * @param doneCells These already emitted, forbid them from further calculations
     */
    _emitLight(emittingCells, litCells, doneCells) {
        for (let key in emittingCells) {
            let parts = key.split(",");
            let x = parseInt(parts[0]);
            let y = parseInt(parts[1]);
            this._emitLightFromCell(x, y, emittingCells[key], litCells);
            doneCells[key] = 1;
        }
        return this;
    }
    /**
     * Prepare a list of emitters for next pass
     */
    _computeEmitters(litCells, doneCells) {
        let result = {};
        for (let key in litCells) {
            if (key in doneCells) {
                continue;
            } /* already emitted */
            let color = litCells[key];
            let reflectivity;
            if (key in this._reflectivityCache) {
                reflectivity = this._reflectivityCache[key];
            }
            else {
                let parts = key.split(",");
                let x = parseInt(parts[0]);
                let y = parseInt(parts[1]);
                reflectivity = this._reflectivityCallback(x, y);
                this._reflectivityCache[key] = reflectivity;
            }
            if (reflectivity == 0) {
                continue;
            } /* will not reflect at all */
            /* compute emission color */
            let emission = [0, 0, 0];
            let intensity = 0;
            for (let i = 0; i < 3; i++) {
                let part = Math.round(color[i] * reflectivity);
                emission[i] = part;
                intensity += part;
            }
            if (intensity > this._options.emissionThreshold) {
                result[key] = emission;
            }
        }
        return result;
    }
    /**
     * Compute one iteration from one cell
     */
    _emitLightFromCell(x, y, color, litCells) {
        let key = x + "," + y;
        let fov;
        if (key in this._fovCache) {
            fov = this._fovCache[key];
        }
        else {
            fov = this._updateFOV(x, y);
        }
        for (let fovKey in fov) {
            let formFactor = fov[fovKey];
            let result;
            if (fovKey in litCells) { /* already lit */
                result = litCells[fovKey];
            }
            else { /* newly lit */
                result = [0, 0, 0];
                litCells[fovKey] = result;
            }
            for (let i = 0; i < 3; i++) {
                result[i] += Math.round(color[i] * formFactor);
            } /* add light color */
        }
        return this;
    }
    /**
     * Compute FOV ("form factor") for a potential light source at [x,y]
     */
    _updateFOV(x, y) {
        let key1 = x + "," + y;
        let cache = {};
        this._fovCache[key1] = cache;
        let range = this._options.range;
        function cb(x, y, r, vis) {
            let key2 = x + "," + y;
            let formFactor = vis * (1 - r / range);
            if (formFactor == 0) {
                return;
            }
            cache[key2] = formFactor;
        }
        ;
        this._fov.compute(x, y, range, cb.bind(this));
        return cache;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/arena.js":
/*!**********************************************!*\
  !*** ./node_modules/rot-js/lib/map/arena.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Arena)
/* harmony export */ });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/rot-js/lib/map/map.js");

/**
 * @class Simple empty rectangular room
 * @augments ROT.Map
 */
class Arena extends _map_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    create(callback) {
        let w = this._width - 1;
        let h = this._height - 1;
        for (let i = 0; i <= w; i++) {
            for (let j = 0; j <= h; j++) {
                let empty = (i && j && i < w && j < h);
                callback(i, j, empty ? 0 : 1);
            }
        }
        return this;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/cellular.js":
/*!*************************************************!*\
  !*** ./node_modules/rot-js/lib/map/cellular.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cellular)
/* harmony export */ });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/rot-js/lib/map/map.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants.js */ "./node_modules/rot-js/lib/constants.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");



;
/**
 * @class Cellular automaton map generator
 * @augments ROT.Map
 * @param {int} [width=ROT.DEFAULT_WIDTH]
 * @param {int} [height=ROT.DEFAULT_HEIGHT]
 * @param {object} [options] Options
 * @param {int[]} [options.born] List of neighbor counts for a new cell to be born in empty space
 * @param {int[]} [options.survive] List of neighbor counts for an existing  cell to survive
 * @param {int} [options.topology] Topology 4 or 6 or 8
 */
class Cellular extends _map_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(width, height, options = {}) {
        super(width, height);
        this._options = {
            born: [5, 6, 7, 8],
            survive: [4, 5, 6, 7, 8],
            topology: 8
        };
        this.setOptions(options);
        this._dirs = _constants_js__WEBPACK_IMPORTED_MODULE_1__.DIRS[this._options.topology];
        this._map = this._fillMap(0);
    }
    /**
     * Fill the map with random values
     * @param {float} probability Probability for a cell to become alive; 0 = all empty, 1 = all full
     */
    randomize(probability) {
        for (let i = 0; i < this._width; i++) {
            for (let j = 0; j < this._height; j++) {
                this._map[i][j] = (_rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUniform() < probability ? 1 : 0);
            }
        }
        return this;
    }
    /**
     * Change options.
     * @see ROT.Map.Cellular
     */
    setOptions(options) { Object.assign(this._options, options); }
    set(x, y, value) { this._map[x][y] = value; }
    create(callback) {
        let newMap = this._fillMap(0);
        let born = this._options.born;
        let survive = this._options.survive;
        for (let j = 0; j < this._height; j++) {
            let widthStep = 1;
            let widthStart = 0;
            if (this._options.topology == 6) {
                widthStep = 2;
                widthStart = j % 2;
            }
            for (let i = widthStart; i < this._width; i += widthStep) {
                let cur = this._map[i][j];
                let ncount = this._getNeighbors(i, j);
                if (cur && survive.indexOf(ncount) != -1) { /* survive */
                    newMap[i][j] = 1;
                }
                else if (!cur && born.indexOf(ncount) != -1) { /* born */
                    newMap[i][j] = 1;
                }
            }
        }
        this._map = newMap;
        callback && this._serviceCallback(callback);
    }
    _serviceCallback(callback) {
        for (let j = 0; j < this._height; j++) {
            let widthStep = 1;
            let widthStart = 0;
            if (this._options.topology == 6) {
                widthStep = 2;
                widthStart = j % 2;
            }
            for (let i = widthStart; i < this._width; i += widthStep) {
                callback(i, j, this._map[i][j]);
            }
        }
    }
    /**
     * Get neighbor count at [i,j] in this._map
     */
    _getNeighbors(cx, cy) {
        let result = 0;
        for (let i = 0; i < this._dirs.length; i++) {
            let dir = this._dirs[i];
            let x = cx + dir[0];
            let y = cy + dir[1];
            if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
                continue;
            }
            result += (this._map[x][y] == 1 ? 1 : 0);
        }
        return result;
    }
    /**
     * Make sure every non-wall space is accessible.
     * @param {function} callback to call to display map when do
     * @param {int} value to consider empty space - defaults to 0
     * @param {function} callback to call when a new connection is made
     */
    connect(callback, value, connectionCallback) {
        if (!value)
            value = 0;
        let allFreeSpace = [];
        let notConnected = {};
        // find all free space
        let widthStep = 1;
        let widthStarts = [0, 0];
        if (this._options.topology == 6) {
            widthStep = 2;
            widthStarts = [0, 1];
        }
        for (let y = 0; y < this._height; y++) {
            for (let x = widthStarts[y % 2]; x < this._width; x += widthStep) {
                if (this._freeSpace(x, y, value)) {
                    let p = [x, y];
                    notConnected[this._pointKey(p)] = p;
                    allFreeSpace.push([x, y]);
                }
            }
        }
        let start = allFreeSpace[_rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUniformInt(0, allFreeSpace.length - 1)];
        let key = this._pointKey(start);
        let connected = {};
        connected[key] = start;
        delete notConnected[key];
        // find what's connected to the starting point
        this._findConnected(connected, notConnected, [start], false, value);
        while (Object.keys(notConnected).length > 0) {
            // find two points from notConnected to connected
            let p = this._getFromTo(connected, notConnected);
            let from = p[0]; // notConnected
            let to = p[1]; // connected
            // find everything connected to the starting point
            let local = {};
            local[this._pointKey(from)] = from;
            this._findConnected(local, notConnected, [from], true, value);
            // connect to a connected cell
            let tunnelFn = (this._options.topology == 6 ? this._tunnelToConnected6 : this._tunnelToConnected);
            tunnelFn.call(this, to, from, connected, notConnected, value, connectionCallback);
            // now all of local is connected
            for (let k in local) {
                let pp = local[k];
                this._map[pp[0]][pp[1]] = value;
                connected[k] = pp;
                delete notConnected[k];
            }
        }
        callback && this._serviceCallback(callback);
    }
    /**
     * Find random points to connect. Search for the closest point in the larger space.
     * This is to minimize the length of the passage while maintaining good performance.
     */
    _getFromTo(connected, notConnected) {
        let from = [0, 0], to = [0, 0], d;
        let connectedKeys = Object.keys(connected);
        let notConnectedKeys = Object.keys(notConnected);
        for (let i = 0; i < 5; i++) {
            if (connectedKeys.length < notConnectedKeys.length) {
                let keys = connectedKeys;
                to = connected[keys[_rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUniformInt(0, keys.length - 1)]];
                from = this._getClosest(to, notConnected);
            }
            else {
                let keys = notConnectedKeys;
                from = notConnected[keys[_rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUniformInt(0, keys.length - 1)]];
                to = this._getClosest(from, connected);
            }
            d = (from[0] - to[0]) * (from[0] - to[0]) + (from[1] - to[1]) * (from[1] - to[1]);
            if (d < 64) {
                break;
            }
        }
        // console.log(">>> connected=" + to + " notConnected=" + from + " dist=" + d);
        return [from, to];
    }
    _getClosest(point, space) {
        let minPoint = null;
        let minDist = null;
        for (let k in space) {
            let p = space[k];
            let d = (p[0] - point[0]) * (p[0] - point[0]) + (p[1] - point[1]) * (p[1] - point[1]);
            if (minDist == null || d < minDist) {
                minDist = d;
                minPoint = p;
            }
        }
        return minPoint;
    }
    _findConnected(connected, notConnected, stack, keepNotConnected, value) {
        while (stack.length > 0) {
            let p = stack.splice(0, 1)[0];
            let tests;
            if (this._options.topology == 6) {
                tests = [
                    [p[0] + 2, p[1]],
                    [p[0] + 1, p[1] - 1],
                    [p[0] - 1, p[1] - 1],
                    [p[0] - 2, p[1]],
                    [p[0] - 1, p[1] + 1],
                    [p[0] + 1, p[1] + 1],
                ];
            }
            else {
                tests = [
                    [p[0] + 1, p[1]],
                    [p[0] - 1, p[1]],
                    [p[0], p[1] + 1],
                    [p[0], p[1] - 1]
                ];
            }
            for (let i = 0; i < tests.length; i++) {
                let key = this._pointKey(tests[i]);
                if (connected[key] == null && this._freeSpace(tests[i][0], tests[i][1], value)) {
                    connected[key] = tests[i];
                    if (!keepNotConnected) {
                        delete notConnected[key];
                    }
                    stack.push(tests[i]);
                }
            }
        }
    }
    _tunnelToConnected(to, from, connected, notConnected, value, connectionCallback) {
        let a, b;
        if (from[0] < to[0]) {
            a = from;
            b = to;
        }
        else {
            a = to;
            b = from;
        }
        for (let xx = a[0]; xx <= b[0]; xx++) {
            this._map[xx][a[1]] = value;
            let p = [xx, a[1]];
            let pkey = this._pointKey(p);
            connected[pkey] = p;
            delete notConnected[pkey];
        }
        if (connectionCallback && a[0] < b[0]) {
            connectionCallback(a, [b[0], a[1]]);
        }
        // x is now fixed
        let x = b[0];
        if (from[1] < to[1]) {
            a = from;
            b = to;
        }
        else {
            a = to;
            b = from;
        }
        for (let yy = a[1]; yy < b[1]; yy++) {
            this._map[x][yy] = value;
            let p = [x, yy];
            let pkey = this._pointKey(p);
            connected[pkey] = p;
            delete notConnected[pkey];
        }
        if (connectionCallback && a[1] < b[1]) {
            connectionCallback([b[0], a[1]], [b[0], b[1]]);
        }
    }
    _tunnelToConnected6(to, from, connected, notConnected, value, connectionCallback) {
        let a, b;
        if (from[0] < to[0]) {
            a = from;
            b = to;
        }
        else {
            a = to;
            b = from;
        }
        // tunnel diagonally until horizontally level
        let xx = a[0];
        let yy = a[1];
        while (!(xx == b[0] && yy == b[1])) {
            let stepWidth = 2;
            if (yy < b[1]) {
                yy++;
                stepWidth = 1;
            }
            else if (yy > b[1]) {
                yy--;
                stepWidth = 1;
            }
            if (xx < b[0]) {
                xx += stepWidth;
            }
            else if (xx > b[0]) {
                xx -= stepWidth;
            }
            else if (b[1] % 2) {
                // Won't step outside map if destination on is map's right edge
                xx -= stepWidth;
            }
            else {
                // ditto for left edge
                xx += stepWidth;
            }
            this._map[xx][yy] = value;
            let p = [xx, yy];
            let pkey = this._pointKey(p);
            connected[pkey] = p;
            delete notConnected[pkey];
        }
        if (connectionCallback) {
            connectionCallback(from, to);
        }
    }
    _freeSpace(x, y, value) {
        return x >= 0 && x < this._width && y >= 0 && y < this._height && this._map[x][y] == value;
    }
    _pointKey(p) { return p[0] + "." + p[1]; }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/digger.js":
/*!***********************************************!*\
  !*** ./node_modules/rot-js/lib/map/digger.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Digger)
/* harmony export */ });
/* harmony import */ var _dungeon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dungeon.js */ "./node_modules/rot-js/lib/map/dungeon.js");
/* harmony import */ var _features_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./features.js */ "./node_modules/rot-js/lib/map/features.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants.js */ "./node_modules/rot-js/lib/constants.js");




const FEATURES = {
    "room": _features_js__WEBPACK_IMPORTED_MODULE_1__.Room,
    "corridor": _features_js__WEBPACK_IMPORTED_MODULE_1__.Corridor
};
/**
 * Random dungeon generator using human-like digging patterns.
 * Heavily based on Mike Anderson's ideas from the "Tyrant" algo, mentioned at
 * http://www.roguebasin.roguelikedevelopment.org/index.php?title=Dungeon-Building_Algorithm.
 */
class Digger extends _dungeon_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(width, height, options = {}) {
        super(width, height);
        this._options = Object.assign({
            roomWidth: [3, 9],
            roomHeight: [3, 5],
            corridorLength: [3, 10],
            dugPercentage: 0.2,
            timeLimit: 1000 /* we stop after this much time has passed (msec) */
        }, options);
        this._features = {
            "room": 4,
            "corridor": 4
        };
        this._map = [];
        this._featureAttempts = 20; /* how many times do we try to create a feature on a suitable wall */
        this._walls = {}; /* these are available for digging */
        this._dug = 0;
        this._digCallback = this._digCallback.bind(this);
        this._canBeDugCallback = this._canBeDugCallback.bind(this);
        this._isWallCallback = this._isWallCallback.bind(this);
        this._priorityWallCallback = this._priorityWallCallback.bind(this);
    }
    create(callback) {
        this._rooms = [];
        this._corridors = [];
        this._map = this._fillMap(1);
        this._walls = {};
        this._dug = 0;
        let area = (this._width - 2) * (this._height - 2);
        this._firstRoom();
        let t1 = Date.now();
        let priorityWalls;
        do {
            priorityWalls = 0;
            let t2 = Date.now();
            if (t2 - t1 > this._options.timeLimit) {
                break;
            }
            /* find a good wall */
            let wall = this._findWall();
            if (!wall) {
                break;
            } /* no more walls */
            let parts = wall.split(",");
            let x = parseInt(parts[0]);
            let y = parseInt(parts[1]);
            let dir = this._getDiggingDirection(x, y);
            if (!dir) {
                continue;
            } /* this wall is not suitable */
            //		console.log("wall", x, y);
            /* try adding a feature */
            let featureAttempts = 0;
            do {
                featureAttempts++;
                if (this._tryFeature(x, y, dir[0], dir[1])) { /* feature added */
                    //if (this._rooms.length + this._corridors.length == 2) { this._rooms[0].addDoor(x, y); } /* first room oficially has doors */
                    this._removeSurroundingWalls(x, y);
                    this._removeSurroundingWalls(x - dir[0], y - dir[1]);
                    break;
                }
            } while (featureAttempts < this._featureAttempts);
            for (let id in this._walls) {
                if (this._walls[id] > 1) {
                    priorityWalls++;
                }
            }
        } while (this._dug / area < this._options.dugPercentage || priorityWalls); /* fixme number of priority walls */
        this._addDoors();
        if (callback) {
            for (let i = 0; i < this._width; i++) {
                for (let j = 0; j < this._height; j++) {
                    callback(i, j, this._map[i][j]);
                }
            }
        }
        this._walls = {};
        this._map = [];
        return this;
    }
    _digCallback(x, y, value) {
        if (value == 0 || value == 2) { /* empty */
            this._map[x][y] = 0;
            this._dug++;
        }
        else { /* wall */
            this._walls[x + "," + y] = 1;
        }
    }
    _isWallCallback(x, y) {
        if (x < 0 || y < 0 || x >= this._width || y >= this._height) {
            return false;
        }
        return (this._map[x][y] == 1);
    }
    _canBeDugCallback(x, y) {
        if (x < 1 || y < 1 || x + 1 >= this._width || y + 1 >= this._height) {
            return false;
        }
        return (this._map[x][y] == 1);
    }
    _priorityWallCallback(x, y) { this._walls[x + "," + y] = 2; }
    ;
    _firstRoom() {
        let cx = Math.floor(this._width / 2);
        let cy = Math.floor(this._height / 2);
        let room = _features_js__WEBPACK_IMPORTED_MODULE_1__.Room.createRandomCenter(cx, cy, this._options);
        this._rooms.push(room);
        room.create(this._digCallback);
    }
    /**
     * Get a suitable wall
     */
    _findWall() {
        let prio1 = [];
        let prio2 = [];
        for (let id in this._walls) {
            let prio = this._walls[id];
            if (prio == 2) {
                prio2.push(id);
            }
            else {
                prio1.push(id);
            }
        }
        let arr = (prio2.length ? prio2 : prio1);
        if (!arr.length) {
            return null;
        } /* no walls :/ */
        let id = _rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].getItem(arr.sort()); // sort to make the order deterministic
        delete this._walls[id];
        return id;
    }
    /**
     * Tries adding a feature
     * @returns {bool} was this a successful try?
     */
    _tryFeature(x, y, dx, dy) {
        let featureName = _rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].getWeightedValue(this._features);
        let ctor = FEATURES[featureName];
        let feature = ctor.createRandomAt(x, y, dx, dy, this._options);
        if (!feature.isValid(this._isWallCallback, this._canBeDugCallback)) {
            //		console.log("not valid");
            //		feature.debug();
            return false;
        }
        feature.create(this._digCallback);
        //	feature.debug();
        if (feature instanceof _features_js__WEBPACK_IMPORTED_MODULE_1__.Room) {
            this._rooms.push(feature);
        }
        if (feature instanceof _features_js__WEBPACK_IMPORTED_MODULE_1__.Corridor) {
            feature.createPriorityWalls(this._priorityWallCallback);
            this._corridors.push(feature);
        }
        return true;
    }
    _removeSurroundingWalls(cx, cy) {
        let deltas = _constants_js__WEBPACK_IMPORTED_MODULE_3__.DIRS[4];
        for (let i = 0; i < deltas.length; i++) {
            let delta = deltas[i];
            let x = cx + delta[0];
            let y = cy + delta[1];
            delete this._walls[x + "," + y];
            x = cx + 2 * delta[0];
            y = cy + 2 * delta[1];
            delete this._walls[x + "," + y];
        }
    }
    /**
     * Returns vector in "digging" direction, or false, if this does not exist (or is not unique)
     */
    _getDiggingDirection(cx, cy) {
        if (cx <= 0 || cy <= 0 || cx >= this._width - 1 || cy >= this._height - 1) {
            return null;
        }
        let result = null;
        let deltas = _constants_js__WEBPACK_IMPORTED_MODULE_3__.DIRS[4];
        for (let i = 0; i < deltas.length; i++) {
            let delta = deltas[i];
            let x = cx + delta[0];
            let y = cy + delta[1];
            if (!this._map[x][y]) { /* there already is another empty neighbor! */
                if (result) {
                    return null;
                }
                result = delta;
            }
        }
        /* no empty neighbor */
        if (!result) {
            return null;
        }
        return [-result[0], -result[1]];
    }
    /**
     * Find empty spaces surrounding rooms, and apply doors.
     */
    _addDoors() {
        let data = this._map;
        function isWallCallback(x, y) {
            return (data[x][y] == 1);
        }
        ;
        for (let i = 0; i < this._rooms.length; i++) {
            let room = this._rooms[i];
            room.clearDoors();
            room.addDoors(isWallCallback);
        }
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/dividedmaze.js":
/*!****************************************************!*\
  !*** ./node_modules/rot-js/lib/map/dividedmaze.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DividedMaze)
/* harmony export */ });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/rot-js/lib/map/map.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");


/**
 * @class Recursively divided maze, http://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method
 * @augments ROT.Map
 */
class DividedMaze extends _map_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this._stack = [];
        this._map = [];
    }
    create(callback) {
        let w = this._width;
        let h = this._height;
        this._map = [];
        for (let i = 0; i < w; i++) {
            this._map.push([]);
            for (let j = 0; j < h; j++) {
                let border = (i == 0 || j == 0 || i + 1 == w || j + 1 == h);
                this._map[i].push(border ? 1 : 0);
            }
        }
        this._stack = [
            [1, 1, w - 2, h - 2]
        ];
        this._process();
        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {
                callback(i, j, this._map[i][j]);
            }
        }
        this._map = [];
        return this;
    }
    _process() {
        while (this._stack.length) {
            let room = this._stack.shift(); /* [left, top, right, bottom] */
            this._partitionRoom(room);
        }
    }
    _partitionRoom(room) {
        let availX = [];
        let availY = [];
        for (let i = room[0] + 1; i < room[2]; i++) {
            let top = this._map[i][room[1] - 1];
            let bottom = this._map[i][room[3] + 1];
            if (top && bottom && !(i % 2)) {
                availX.push(i);
            }
        }
        for (let j = room[1] + 1; j < room[3]; j++) {
            let left = this._map[room[0] - 1][j];
            let right = this._map[room[2] + 1][j];
            if (left && right && !(j % 2)) {
                availY.push(j);
            }
        }
        if (!availX.length || !availY.length) {
            return;
        }
        let x = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getItem(availX);
        let y = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getItem(availY);
        this._map[x][y] = 1;
        let walls = [];
        let w = [];
        walls.push(w); /* left part */
        for (let i = room[0]; i < x; i++) {
            this._map[i][y] = 1;
            if (i % 2)
                w.push([i, y]);
        }
        w = [];
        walls.push(w); /* right part */
        for (let i = x + 1; i <= room[2]; i++) {
            this._map[i][y] = 1;
            if (i % 2)
                w.push([i, y]);
        }
        w = [];
        walls.push(w); /* top part */
        for (let j = room[1]; j < y; j++) {
            this._map[x][j] = 1;
            if (j % 2)
                w.push([x, j]);
        }
        w = [];
        walls.push(w); /* bottom part */
        for (let j = y + 1; j <= room[3]; j++) {
            this._map[x][j] = 1;
            if (j % 2)
                w.push([x, j]);
        }
        let solid = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getItem(walls);
        for (let i = 0; i < walls.length; i++) {
            let w = walls[i];
            if (w == solid) {
                continue;
            }
            let hole = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getItem(w);
            this._map[hole[0]][hole[1]] = 0;
        }
        this._stack.push([room[0], room[1], x - 1, y - 1]); /* left top */
        this._stack.push([x + 1, room[1], room[2], y - 1]); /* right top */
        this._stack.push([room[0], y + 1, x - 1, room[3]]); /* left bottom */
        this._stack.push([x + 1, y + 1, room[2], room[3]]); /* right bottom */
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/dungeon.js":
/*!************************************************!*\
  !*** ./node_modules/rot-js/lib/map/dungeon.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dungeon)
/* harmony export */ });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/rot-js/lib/map/map.js");

/**
 * @class Dungeon map: has rooms and corridors
 * @augments ROT.Map
 */
class Dungeon extends _map_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(width, height) {
        super(width, height);
        this._rooms = [];
        this._corridors = [];
    }
    /**
     * Get all generated rooms
     * @returns {ROT.Map.Feature.Room[]}
     */
    getRooms() { return this._rooms; }
    /**
     * Get all generated corridors
     * @returns {ROT.Map.Feature.Corridor[]}
     */
    getCorridors() { return this._corridors; }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/ellermaze.js":
/*!**************************************************!*\
  !*** ./node_modules/rot-js/lib/map/ellermaze.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EllerMaze)
/* harmony export */ });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/rot-js/lib/map/map.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");


/**
 * Join lists with "i" and "i+1"
 */
function addToList(i, L, R) {
    R[L[i + 1]] = R[i];
    L[R[i]] = L[i + 1];
    R[i] = i + 1;
    L[i + 1] = i;
}
/**
 * Remove "i" from its list
 */
function removeFromList(i, L, R) {
    R[L[i]] = R[i];
    L[R[i]] = L[i];
    R[i] = i;
    L[i] = i;
}
/**
 * Maze generator - Eller's algorithm
 * See http://homepages.cwi.nl/~tromp/maze.html for explanation
 */
class EllerMaze extends _map_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    create(callback) {
        let map = this._fillMap(1);
        let w = Math.ceil((this._width - 2) / 2);
        let rand = 9 / 24;
        let L = [];
        let R = [];
        for (let i = 0; i < w; i++) {
            L.push(i);
            R.push(i);
        }
        L.push(w - 1); /* fake stop-block at the right side */
        let j;
        for (j = 1; j + 3 < this._height; j += 2) {
            /* one row */
            for (let i = 0; i < w; i++) {
                /* cell coords (will be always empty) */
                let x = 2 * i + 1;
                let y = j;
                map[x][y] = 0;
                /* right connection */
                if (i != L[i + 1] && _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniform() > rand) {
                    addToList(i, L, R);
                    map[x + 1][y] = 0;
                }
                /* bottom connection */
                if (i != L[i] && _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniform() > rand) {
                    /* remove connection */
                    removeFromList(i, L, R);
                }
                else {
                    /* create connection */
                    map[x][y + 1] = 0;
                }
            }
        }
        /* last row */
        for (let i = 0; i < w; i++) {
            /* cell coords (will be always empty) */
            let x = 2 * i + 1;
            let y = j;
            map[x][y] = 0;
            /* right connection */
            if (i != L[i + 1] && (i == L[i] || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniform() > rand)) {
                /* dig right also if the cell is separated, so it gets connected to the rest of maze */
                addToList(i, L, R);
                map[x + 1][y] = 0;
            }
            removeFromList(i, L, R);
        }
        for (let i = 0; i < this._width; i++) {
            for (let j = 0; j < this._height; j++) {
                callback(i, j, map[i][j]);
            }
        }
        return this;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/features.js":
/*!*************************************************!*\
  !*** ./node_modules/rot-js/lib/map/features.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Corridor": () => (/* binding */ Corridor),
/* harmony export */   "Room": () => (/* binding */ Room)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");

;
/**
 * @class Dungeon feature; has own .create() method
 */
class Feature {
}
/**
 * @class Room
 * @augments ROT.Map.Feature
 * @param {int} x1
 * @param {int} y1
 * @param {int} x2
 * @param {int} y2
 * @param {int} [doorX]
 * @param {int} [doorY]
 */
class Room extends Feature {
    constructor(x1, y1, x2, y2, doorX, doorY) {
        super();
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
        this._doors = {};
        if (doorX !== undefined && doorY !== undefined) {
            this.addDoor(doorX, doorY);
        }
    }
    ;
    /**
     * Room of random size, with a given doors and direction
     */
    static createRandomAt(x, y, dx, dy, options) {
        let min = options.roomWidth[0];
        let max = options.roomWidth[1];
        let width = _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniformInt(min, max);
        min = options.roomHeight[0];
        max = options.roomHeight[1];
        let height = _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniformInt(min, max);
        if (dx == 1) { /* to the right */
            let y2 = y - Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniform() * height);
            return new this(x + 1, y2, x + width, y2 + height - 1, x, y);
        }
        if (dx == -1) { /* to the left */
            let y2 = y - Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniform() * height);
            return new this(x - width, y2, x - 1, y2 + height - 1, x, y);
        }
        if (dy == 1) { /* to the bottom */
            let x2 = x - Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniform() * width);
            return new this(x2, y + 1, x2 + width - 1, y + height, x, y);
        }
        if (dy == -1) { /* to the top */
            let x2 = x - Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniform() * width);
            return new this(x2, y - height, x2 + width - 1, y - 1, x, y);
        }
        throw new Error("dx or dy must be 1 or -1");
    }
    /**
     * Room of random size, positioned around center coords
     */
    static createRandomCenter(cx, cy, options) {
        let min = options.roomWidth[0];
        let max = options.roomWidth[1];
        let width = _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniformInt(min, max);
        min = options.roomHeight[0];
        max = options.roomHeight[1];
        let height = _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniformInt(min, max);
        let x1 = cx - Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniform() * width);
        let y1 = cy - Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniform() * height);
        let x2 = x1 + width - 1;
        let y2 = y1 + height - 1;
        return new this(x1, y1, x2, y2);
    }
    /**
     * Room of random size within a given dimensions
     */
    static createRandom(availWidth, availHeight, options) {
        let min = options.roomWidth[0];
        let max = options.roomWidth[1];
        let width = _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniformInt(min, max);
        min = options.roomHeight[0];
        max = options.roomHeight[1];
        let height = _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniformInt(min, max);
        let left = availWidth - width - 1;
        let top = availHeight - height - 1;
        let x1 = 1 + Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniform() * left);
        let y1 = 1 + Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniform() * top);
        let x2 = x1 + width - 1;
        let y2 = y1 + height - 1;
        return new this(x1, y1, x2, y2);
    }
    addDoor(x, y) {
        this._doors[x + "," + y] = 1;
        return this;
    }
    /**
     * @param {function}
     */
    getDoors(cb) {
        for (let key in this._doors) {
            let parts = key.split(",");
            cb(parseInt(parts[0]), parseInt(parts[1]));
        }
        return this;
    }
    clearDoors() {
        this._doors = {};
        return this;
    }
    addDoors(isWallCallback) {
        let left = this._x1 - 1;
        let right = this._x2 + 1;
        let top = this._y1 - 1;
        let bottom = this._y2 + 1;
        for (let x = left; x <= right; x++) {
            for (let y = top; y <= bottom; y++) {
                if (x != left && x != right && y != top && y != bottom) {
                    continue;
                }
                if (isWallCallback(x, y)) {
                    continue;
                }
                this.addDoor(x, y);
            }
        }
        return this;
    }
    debug() {
        console.log("room", this._x1, this._y1, this._x2, this._y2);
    }
    isValid(isWallCallback, canBeDugCallback) {
        let left = this._x1 - 1;
        let right = this._x2 + 1;
        let top = this._y1 - 1;
        let bottom = this._y2 + 1;
        for (let x = left; x <= right; x++) {
            for (let y = top; y <= bottom; y++) {
                if (x == left || x == right || y == top || y == bottom) {
                    if (!isWallCallback(x, y)) {
                        return false;
                    }
                }
                else {
                    if (!canBeDugCallback(x, y)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    /**
     * @param {function} digCallback Dig callback with a signature (x, y, value). Values: 0 = empty, 1 = wall, 2 = door. Multiple doors are allowed.
     */
    create(digCallback) {
        let left = this._x1 - 1;
        let right = this._x2 + 1;
        let top = this._y1 - 1;
        let bottom = this._y2 + 1;
        let value = 0;
        for (let x = left; x <= right; x++) {
            for (let y = top; y <= bottom; y++) {
                if (x + "," + y in this._doors) {
                    value = 2;
                }
                else if (x == left || x == right || y == top || y == bottom) {
                    value = 1;
                }
                else {
                    value = 0;
                }
                digCallback(x, y, value);
            }
        }
    }
    getCenter() {
        return [Math.round((this._x1 + this._x2) / 2), Math.round((this._y1 + this._y2) / 2)];
    }
    getLeft() { return this._x1; }
    getRight() { return this._x2; }
    getTop() { return this._y1; }
    getBottom() { return this._y2; }
}
/**
 * @class Corridor
 * @augments ROT.Map.Feature
 * @param {int} startX
 * @param {int} startY
 * @param {int} endX
 * @param {int} endY
 */
class Corridor extends Feature {
    constructor(startX, startY, endX, endY) {
        super();
        this._startX = startX;
        this._startY = startY;
        this._endX = endX;
        this._endY = endY;
        this._endsWithAWall = true;
    }
    static createRandomAt(x, y, dx, dy, options) {
        let min = options.corridorLength[0];
        let max = options.corridorLength[1];
        let length = _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniformInt(min, max);
        return new this(x, y, x + dx * length, y + dy * length);
    }
    debug() {
        console.log("corridor", this._startX, this._startY, this._endX, this._endY);
    }
    isValid(isWallCallback, canBeDugCallback) {
        let sx = this._startX;
        let sy = this._startY;
        let dx = this._endX - sx;
        let dy = this._endY - sy;
        let length = 1 + Math.max(Math.abs(dx), Math.abs(dy));
        if (dx) {
            dx = dx / Math.abs(dx);
        }
        if (dy) {
            dy = dy / Math.abs(dy);
        }
        let nx = dy;
        let ny = -dx;
        let ok = true;
        for (let i = 0; i < length; i++) {
            let x = sx + i * dx;
            let y = sy + i * dy;
            if (!canBeDugCallback(x, y)) {
                ok = false;
            }
            if (!isWallCallback(x + nx, y + ny)) {
                ok = false;
            }
            if (!isWallCallback(x - nx, y - ny)) {
                ok = false;
            }
            if (!ok) {
                length = i;
                this._endX = x - dx;
                this._endY = y - dy;
                break;
            }
        }
        /**
         * If the length degenerated, this corridor might be invalid
         */
        /* not supported */
        if (length == 0) {
            return false;
        }
        /* length 1 allowed only if the next space is empty */
        if (length == 1 && isWallCallback(this._endX + dx, this._endY + dy)) {
            return false;
        }
        /**
         * We do not want the corridor to crash into a corner of a room;
         * if any of the ending corners is empty, the N+1th cell of this corridor must be empty too.
         *
         * Situation:
         * #######1
         * .......?
         * #######2
         *
         * The corridor was dug from left to right.
         * 1, 2 - problematic corners, ? = N+1th cell (not dug)
         */
        let firstCornerBad = !isWallCallback(this._endX + dx + nx, this._endY + dy + ny);
        let secondCornerBad = !isWallCallback(this._endX + dx - nx, this._endY + dy - ny);
        this._endsWithAWall = isWallCallback(this._endX + dx, this._endY + dy);
        if ((firstCornerBad || secondCornerBad) && this._endsWithAWall) {
            return false;
        }
        return true;
    }
    /**
     * @param {function} digCallback Dig callback with a signature (x, y, value). Values: 0 = empty.
     */
    create(digCallback) {
        let sx = this._startX;
        let sy = this._startY;
        let dx = this._endX - sx;
        let dy = this._endY - sy;
        let length = 1 + Math.max(Math.abs(dx), Math.abs(dy));
        if (dx) {
            dx = dx / Math.abs(dx);
        }
        if (dy) {
            dy = dy / Math.abs(dy);
        }
        for (let i = 0; i < length; i++) {
            let x = sx + i * dx;
            let y = sy + i * dy;
            digCallback(x, y, 0);
        }
        return true;
    }
    createPriorityWalls(priorityWallCallback) {
        if (!this._endsWithAWall) {
            return;
        }
        let sx = this._startX;
        let sy = this._startY;
        let dx = this._endX - sx;
        let dy = this._endY - sy;
        if (dx) {
            dx = dx / Math.abs(dx);
        }
        if (dy) {
            dy = dy / Math.abs(dy);
        }
        let nx = dy;
        let ny = -dx;
        priorityWallCallback(this._endX + dx, this._endY + dy);
        priorityWallCallback(this._endX + nx, this._endY + ny);
        priorityWallCallback(this._endX - nx, this._endY - ny);
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/iceymaze.js":
/*!*************************************************!*\
  !*** ./node_modules/rot-js/lib/map/iceymaze.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IceyMaze)
/* harmony export */ });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/rot-js/lib/map/map.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");


/**
 * Icey's Maze generator
 * See http://www.roguebasin.roguelikedevelopment.org/index.php?title=Simple_maze for explanation
 */
class IceyMaze extends _map_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(width, height, regularity = 0) {
        super(width, height);
        this._regularity = regularity;
        this._map = [];
    }
    create(callback) {
        let width = this._width;
        let height = this._height;
        let map = this._fillMap(1);
        width -= (width % 2 ? 1 : 2);
        height -= (height % 2 ? 1 : 2);
        let cx = 0;
        let cy = 0;
        let nx = 0;
        let ny = 0;
        let done = 0;
        let blocked = false;
        let dirs = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        do {
            cx = 1 + 2 * Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniform() * (width - 1) / 2);
            cy = 1 + 2 * Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniform() * (height - 1) / 2);
            if (!done) {
                map[cx][cy] = 0;
            }
            if (!map[cx][cy]) {
                this._randomize(dirs);
                do {
                    if (Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniform() * (this._regularity + 1)) == 0) {
                        this._randomize(dirs);
                    }
                    blocked = true;
                    for (let i = 0; i < 4; i++) {
                        nx = cx + dirs[i][0] * 2;
                        ny = cy + dirs[i][1] * 2;
                        if (this._isFree(map, nx, ny, width, height)) {
                            map[nx][ny] = 0;
                            map[cx + dirs[i][0]][cy + dirs[i][1]] = 0;
                            cx = nx;
                            cy = ny;
                            blocked = false;
                            done++;
                            break;
                        }
                    }
                } while (!blocked);
            }
        } while (done + 1 < width * height / 4);
        for (let i = 0; i < this._width; i++) {
            for (let j = 0; j < this._height; j++) {
                callback(i, j, map[i][j]);
            }
        }
        this._map = [];
        return this;
    }
    _randomize(dirs) {
        for (let i = 0; i < 4; i++) {
            dirs[i][0] = 0;
            dirs[i][1] = 0;
        }
        switch (Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniform() * 4)) {
            case 0:
                dirs[0][0] = -1;
                dirs[1][0] = 1;
                dirs[2][1] = -1;
                dirs[3][1] = 1;
                break;
            case 1:
                dirs[3][0] = -1;
                dirs[2][0] = 1;
                dirs[1][1] = -1;
                dirs[0][1] = 1;
                break;
            case 2:
                dirs[2][0] = -1;
                dirs[3][0] = 1;
                dirs[0][1] = -1;
                dirs[1][1] = 1;
                break;
            case 3:
                dirs[1][0] = -1;
                dirs[0][0] = 1;
                dirs[3][1] = -1;
                dirs[2][1] = 1;
                break;
        }
    }
    _isFree(map, x, y, width, height) {
        if (x < 1 || y < 1 || x >= width || y >= height) {
            return false;
        }
        return map[x][y];
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/index.js":
/*!**********************************************!*\
  !*** ./node_modules/rot-js/lib/map/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _arena_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arena.js */ "./node_modules/rot-js/lib/map/arena.js");
/* harmony import */ var _uniform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uniform.js */ "./node_modules/rot-js/lib/map/uniform.js");
/* harmony import */ var _cellular_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cellular.js */ "./node_modules/rot-js/lib/map/cellular.js");
/* harmony import */ var _digger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./digger.js */ "./node_modules/rot-js/lib/map/digger.js");
/* harmony import */ var _ellermaze_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ellermaze.js */ "./node_modules/rot-js/lib/map/ellermaze.js");
/* harmony import */ var _dividedmaze_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dividedmaze.js */ "./node_modules/rot-js/lib/map/dividedmaze.js");
/* harmony import */ var _iceymaze_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./iceymaze.js */ "./node_modules/rot-js/lib/map/iceymaze.js");
/* harmony import */ var _rogue_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rogue.js */ "./node_modules/rot-js/lib/map/rogue.js");








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ Arena: _arena_js__WEBPACK_IMPORTED_MODULE_0__["default"], Uniform: _uniform_js__WEBPACK_IMPORTED_MODULE_1__["default"], Cellular: _cellular_js__WEBPACK_IMPORTED_MODULE_2__["default"], Digger: _digger_js__WEBPACK_IMPORTED_MODULE_3__["default"], EllerMaze: _ellermaze_js__WEBPACK_IMPORTED_MODULE_4__["default"], DividedMaze: _dividedmaze_js__WEBPACK_IMPORTED_MODULE_5__["default"], IceyMaze: _iceymaze_js__WEBPACK_IMPORTED_MODULE_6__["default"], Rogue: _rogue_js__WEBPACK_IMPORTED_MODULE_7__["default"] });


/***/ }),

/***/ "./node_modules/rot-js/lib/map/map.js":
/*!********************************************!*\
  !*** ./node_modules/rot-js/lib/map/map.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Map)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./node_modules/rot-js/lib/constants.js");

;
class Map {
    /**
     * @class Base map generator
     * @param {int} [width=ROT.DEFAULT_WIDTH]
     * @param {int} [height=ROT.DEFAULT_HEIGHT]
     */
    constructor(width = _constants_js__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_WIDTH, height = _constants_js__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_HEIGHT) {
        this._width = width;
        this._height = height;
    }
    ;
    _fillMap(value) {
        let map = [];
        for (let i = 0; i < this._width; i++) {
            map.push([]);
            for (let j = 0; j < this._height; j++) {
                map[i].push(value);
            }
        }
        return map;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/rogue.js":
/*!**********************************************!*\
  !*** ./node_modules/rot-js/lib/map/rogue.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Rogue)
/* harmony export */ });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/rot-js/lib/map/map.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants.js */ "./node_modules/rot-js/lib/constants.js");



/**
 * Dungeon generator which uses the "orginal" Rogue dungeon generation algorithm. See http://kuoi.com/~kamikaze/GameDesign/art07_rogue_dungeon.php
 * @author hyakugei
 */
class Rogue extends _map_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(width, height, options) {
        super(width, height);
        this.map = [];
        this.rooms = [];
        this.connectedCells = [];
        options = Object.assign({
            cellWidth: 3,
            cellHeight: 3 //     ie. as an array with min-max values for each direction....
        }, options);
        /*
        Set the room sizes according to the over-all width of the map,
        and the cell sizes.
        */
        if (!options.hasOwnProperty("roomWidth")) {
            options["roomWidth"] = this._calculateRoomSize(this._width, options["cellWidth"]);
        }
        if (!options.hasOwnProperty("roomHeight")) {
            options["roomHeight"] = this._calculateRoomSize(this._height, options["cellHeight"]);
        }
        this._options = options;
    }
    create(callback) {
        this.map = this._fillMap(1);
        this.rooms = [];
        this.connectedCells = [];
        this._initRooms();
        this._connectRooms();
        this._connectUnconnectedRooms();
        this._createRandomRoomConnections();
        this._createRooms();
        this._createCorridors();
        if (callback) {
            for (let i = 0; i < this._width; i++) {
                for (let j = 0; j < this._height; j++) {
                    callback(i, j, this.map[i][j]);
                }
            }
        }
        return this;
    }
    _calculateRoomSize(size, cell) {
        let max = Math.floor((size / cell) * 0.8);
        let min = Math.floor((size / cell) * 0.25);
        if (min < 2) {
            min = 2;
        }
        if (max < 2) {
            max = 2;
        }
        return [min, max];
    }
    _initRooms() {
        // create rooms array. This is the "grid" list from the algo.
        for (let i = 0; i < this._options.cellWidth; i++) {
            this.rooms.push([]);
            for (let j = 0; j < this._options.cellHeight; j++) {
                this.rooms[i].push({ "x": 0, "y": 0, "width": 0, "height": 0, "connections": [], "cellx": i, "celly": j });
            }
        }
    }
    _connectRooms() {
        //pick random starting grid
        let cgx = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniformInt(0, this._options.cellWidth - 1);
        let cgy = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniformInt(0, this._options.cellHeight - 1);
        let idx;
        let ncgx;
        let ncgy;
        let found = false;
        let room;
        let otherRoom;
        let dirToCheck;
        // find  unconnected neighbour cells
        do {
            //dirToCheck = [0, 1, 2, 3, 4, 5, 6, 7];
            dirToCheck = [0, 2, 4, 6];
            dirToCheck = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].shuffle(dirToCheck);
            do {
                found = false;
                idx = dirToCheck.pop();
                ncgx = cgx + _constants_js__WEBPACK_IMPORTED_MODULE_2__.DIRS[8][idx][0];
                ncgy = cgy + _constants_js__WEBPACK_IMPORTED_MODULE_2__.DIRS[8][idx][1];
                if (ncgx < 0 || ncgx >= this._options.cellWidth) {
                    continue;
                }
                if (ncgy < 0 || ncgy >= this._options.cellHeight) {
                    continue;
                }
                room = this.rooms[cgx][cgy];
                if (room["connections"].length > 0) {
                    // as long as this room doesn't already coonect to me, we are ok with it.
                    if (room["connections"][0][0] == ncgx && room["connections"][0][1] == ncgy) {
                        break;
                    }
                }
                otherRoom = this.rooms[ncgx][ncgy];
                if (otherRoom["connections"].length == 0) {
                    otherRoom["connections"].push([cgx, cgy]);
                    this.connectedCells.push([ncgx, ncgy]);
                    cgx = ncgx;
                    cgy = ncgy;
                    found = true;
                }
            } while (dirToCheck.length > 0 && found == false);
        } while (dirToCheck.length > 0);
    }
    _connectUnconnectedRooms() {
        //While there are unconnected rooms, try to connect them to a random connected neighbor
        //(if a room has no connected neighbors yet, just keep cycling, you'll fill out to it eventually).
        let cw = this._options.cellWidth;
        let ch = this._options.cellHeight;
        this.connectedCells = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].shuffle(this.connectedCells);
        let room;
        let otherRoom;
        let validRoom;
        for (let i = 0; i < this._options.cellWidth; i++) {
            for (let j = 0; j < this._options.cellHeight; j++) {
                room = this.rooms[i][j];
                if (room["connections"].length == 0) {
                    let directions = [0, 2, 4, 6];
                    directions = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].shuffle(directions);
                    validRoom = false;
                    do {
                        let dirIdx = directions.pop();
                        let newI = i + _constants_js__WEBPACK_IMPORTED_MODULE_2__.DIRS[8][dirIdx][0];
                        let newJ = j + _constants_js__WEBPACK_IMPORTED_MODULE_2__.DIRS[8][dirIdx][1];
                        if (newI < 0 || newI >= cw || newJ < 0 || newJ >= ch) {
                            continue;
                        }
                        otherRoom = this.rooms[newI][newJ];
                        validRoom = true;
                        if (otherRoom["connections"].length == 0) {
                            break;
                        }
                        for (let k = 0; k < otherRoom["connections"].length; k++) {
                            if (otherRoom["connections"][k][0] == i && otherRoom["connections"][k][1] == j) {
                                validRoom = false;
                                break;
                            }
                        }
                        if (validRoom) {
                            break;
                        }
                    } while (directions.length);
                    if (validRoom) {
                        room["connections"].push([otherRoom["cellx"], otherRoom["celly"]]);
                    }
                    else {
                        console.log("-- Unable to connect room.");
                    }
                }
            }
        }
    }
    _createRandomRoomConnections() {
        // Empty for now.
    }
    _createRooms() {
        let w = this._width;
        let h = this._height;
        let cw = this._options.cellWidth;
        let ch = this._options.cellHeight;
        let cwp = Math.floor(this._width / cw);
        let chp = Math.floor(this._height / ch);
        let roomw;
        let roomh;
        let roomWidth = this._options["roomWidth"];
        let roomHeight = this._options["roomHeight"];
        let sx;
        let sy;
        let otherRoom;
        for (let i = 0; i < cw; i++) {
            for (let j = 0; j < ch; j++) {
                sx = cwp * i;
                sy = chp * j;
                if (sx == 0) {
                    sx = 1;
                }
                if (sy == 0) {
                    sy = 1;
                }
                roomw = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniformInt(roomWidth[0], roomWidth[1]);
                roomh = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniformInt(roomHeight[0], roomHeight[1]);
                if (j > 0) {
                    otherRoom = this.rooms[i][j - 1];
                    while (sy - (otherRoom["y"] + otherRoom["height"]) < 3) {
                        sy++;
                    }
                }
                if (i > 0) {
                    otherRoom = this.rooms[i - 1][j];
                    while (sx - (otherRoom["x"] + otherRoom["width"]) < 3) {
                        sx++;
                    }
                }
                let sxOffset = Math.round(_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniformInt(0, cwp - roomw) / 2);
                let syOffset = Math.round(_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniformInt(0, chp - roomh) / 2);
                while (sx + sxOffset + roomw >= w) {
                    if (sxOffset) {
                        sxOffset--;
                    }
                    else {
                        roomw--;
                    }
                }
                while (sy + syOffset + roomh >= h) {
                    if (syOffset) {
                        syOffset--;
                    }
                    else {
                        roomh--;
                    }
                }
                sx = sx + sxOffset;
                sy = sy + syOffset;
                this.rooms[i][j]["x"] = sx;
                this.rooms[i][j]["y"] = sy;
                this.rooms[i][j]["width"] = roomw;
                this.rooms[i][j]["height"] = roomh;
                for (let ii = sx; ii < sx + roomw; ii++) {
                    for (let jj = sy; jj < sy + roomh; jj++) {
                        this.map[ii][jj] = 0;
                    }
                }
            }
        }
    }
    _getWallPosition(aRoom, aDirection) {
        let rx;
        let ry;
        let door;
        if (aDirection == 1 || aDirection == 3) {
            rx = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniformInt(aRoom["x"] + 1, aRoom["x"] + aRoom["width"] - 2);
            if (aDirection == 1) {
                ry = aRoom["y"] - 2;
                door = ry + 1;
            }
            else {
                ry = aRoom["y"] + aRoom["height"] + 1;
                door = ry - 1;
            }
            this.map[rx][door] = 0; // i'm not setting a specific 'door' tile value right now, just empty space.
        }
        else {
            ry = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniformInt(aRoom["y"] + 1, aRoom["y"] + aRoom["height"] - 2);
            if (aDirection == 2) {
                rx = aRoom["x"] + aRoom["width"] + 1;
                door = rx - 1;
            }
            else {
                rx = aRoom["x"] - 2;
                door = rx + 1;
            }
            this.map[door][ry] = 0; // i'm not setting a specific 'door' tile value right now, just empty space.
        }
        return [rx, ry];
    }
    _drawCorridor(startPosition, endPosition) {
        let xOffset = endPosition[0] - startPosition[0];
        let yOffset = endPosition[1] - startPosition[1];
        let xpos = startPosition[0];
        let ypos = startPosition[1];
        let tempDist;
        let xDir;
        let yDir;
        let move; // 2 element array, element 0 is the direction, element 1 is the total value to move.
        let moves = []; // a list of 2 element arrays
        let xAbs = Math.abs(xOffset);
        let yAbs = Math.abs(yOffset);
        let percent = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniform(); // used to split the move at different places along the long axis
        let firstHalf = percent;
        let secondHalf = 1 - percent;
        xDir = xOffset > 0 ? 2 : 6;
        yDir = yOffset > 0 ? 4 : 0;
        if (xAbs < yAbs) {
            // move firstHalf of the y offset
            tempDist = Math.ceil(yAbs * firstHalf);
            moves.push([yDir, tempDist]);
            // move all the x offset
            moves.push([xDir, xAbs]);
            // move sendHalf of the  y offset
            tempDist = Math.floor(yAbs * secondHalf);
            moves.push([yDir, tempDist]);
        }
        else {
            //  move firstHalf of the x offset
            tempDist = Math.ceil(xAbs * firstHalf);
            moves.push([xDir, tempDist]);
            // move all the y offset
            moves.push([yDir, yAbs]);
            // move secondHalf of the x offset.
            tempDist = Math.floor(xAbs * secondHalf);
            moves.push([xDir, tempDist]);
        }
        this.map[xpos][ypos] = 0;
        while (moves.length > 0) {
            move = moves.pop();
            while (move[1] > 0) {
                xpos += _constants_js__WEBPACK_IMPORTED_MODULE_2__.DIRS[8][move[0]][0];
                ypos += _constants_js__WEBPACK_IMPORTED_MODULE_2__.DIRS[8][move[0]][1];
                this.map[xpos][ypos] = 0;
                move[1] = move[1] - 1;
            }
        }
    }
    _createCorridors() {
        // Draw Corridors between connected rooms
        let cw = this._options.cellWidth;
        let ch = this._options.cellHeight;
        let room;
        let connection;
        let otherRoom;
        let wall;
        let otherWall;
        for (let i = 0; i < cw; i++) {
            for (let j = 0; j < ch; j++) {
                room = this.rooms[i][j];
                for (let k = 0; k < room["connections"].length; k++) {
                    connection = room["connections"][k];
                    otherRoom = this.rooms[connection[0]][connection[1]];
                    // figure out what wall our corridor will start one.
                    // figure out what wall our corridor will end on.
                    if (otherRoom["cellx"] > room["cellx"]) {
                        wall = 2;
                        otherWall = 4;
                    }
                    else if (otherRoom["cellx"] < room["cellx"]) {
                        wall = 4;
                        otherWall = 2;
                    }
                    else if (otherRoom["celly"] > room["celly"]) {
                        wall = 3;
                        otherWall = 1;
                    }
                    else {
                        wall = 1;
                        otherWall = 3;
                    }
                    this._drawCorridor(this._getWallPosition(room, wall), this._getWallPosition(otherRoom, otherWall));
                }
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/uniform.js":
/*!************************************************!*\
  !*** ./node_modules/rot-js/lib/map/uniform.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Uniform)
/* harmony export */ });
/* harmony import */ var _dungeon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dungeon.js */ "./node_modules/rot-js/lib/map/dungeon.js");
/* harmony import */ var _features_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./features.js */ "./node_modules/rot-js/lib/map/features.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");



;
/**
 * @class Dungeon generator which tries to fill the space evenly. Generates independent rooms and tries to connect them.
 * @augments ROT.Map.Dungeon
 */
class Uniform extends _dungeon_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(width, height, options) {
        super(width, height);
        this._options = {
            roomWidth: [3, 9],
            roomHeight: [3, 5],
            roomDugPercentage: 0.1,
            timeLimit: 1000 /* we stop after this much time has passed (msec) */
        };
        Object.assign(this._options, options);
        this._map = [];
        this._dug = 0;
        this._roomAttempts = 20; /* new room is created N-times until is considered as impossible to generate */
        this._corridorAttempts = 20; /* corridors are tried N-times until the level is considered as impossible to connect */
        this._connected = []; /* list of already connected rooms */
        this._unconnected = []; /* list of remaining unconnected rooms */
        this._digCallback = this._digCallback.bind(this);
        this._canBeDugCallback = this._canBeDugCallback.bind(this);
        this._isWallCallback = this._isWallCallback.bind(this);
    }
    /**
     * Create a map. If the time limit has been hit, returns null.
     * @see ROT.Map#create
     */
    create(callback) {
        let t1 = Date.now();
        while (1) {
            let t2 = Date.now();
            if (t2 - t1 > this._options.timeLimit) {
                return null;
            } /* time limit! */
            this._map = this._fillMap(1);
            this._dug = 0;
            this._rooms = [];
            this._unconnected = [];
            this._generateRooms();
            if (this._rooms.length < 2) {
                continue;
            }
            if (this._generateCorridors()) {
                break;
            }
        }
        if (callback) {
            for (let i = 0; i < this._width; i++) {
                for (let j = 0; j < this._height; j++) {
                    callback(i, j, this._map[i][j]);
                }
            }
        }
        return this;
    }
    /**
     * Generates a suitable amount of rooms
     */
    _generateRooms() {
        let w = this._width - 2;
        let h = this._height - 2;
        let room;
        do {
            room = this._generateRoom();
            if (this._dug / (w * h) > this._options.roomDugPercentage) {
                break;
            } /* achieved requested amount of free space */
        } while (room);
        /* either enough rooms, or not able to generate more of them :) */
    }
    /**
     * Try to generate one room
     */
    _generateRoom() {
        let count = 0;
        while (count < this._roomAttempts) {
            count++;
            let room = _features_js__WEBPACK_IMPORTED_MODULE_1__.Room.createRandom(this._width, this._height, this._options);
            if (!room.isValid(this._isWallCallback, this._canBeDugCallback)) {
                continue;
            }
            room.create(this._digCallback);
            this._rooms.push(room);
            return room;
        }
        /* no room was generated in a given number of attempts */
        return null;
    }
    /**
     * Generates connectors beween rooms
     * @returns {bool} success Was this attempt successfull?
     */
    _generateCorridors() {
        let cnt = 0;
        while (cnt < this._corridorAttempts) {
            cnt++;
            this._corridors = [];
            /* dig rooms into a clear map */
            this._map = this._fillMap(1);
            for (let i = 0; i < this._rooms.length; i++) {
                let room = this._rooms[i];
                room.clearDoors();
                room.create(this._digCallback);
            }
            this._unconnected = _rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].shuffle(this._rooms.slice());
            this._connected = [];
            if (this._unconnected.length) {
                this._connected.push(this._unconnected.pop());
            } /* first one is always connected */
            while (1) {
                /* 1. pick random connected room */
                let connected = _rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].getItem(this._connected);
                if (!connected) {
                    break;
                }
                /* 2. find closest unconnected */
                let room1 = this._closestRoom(this._unconnected, connected);
                if (!room1) {
                    break;
                }
                /* 3. connect it to closest connected */
                let room2 = this._closestRoom(this._connected, room1);
                if (!room2) {
                    break;
                }
                let ok = this._connectRooms(room1, room2);
                if (!ok) {
                    break;
                } /* stop connecting, re-shuffle */
                if (!this._unconnected.length) {
                    return true;
                } /* done; no rooms remain */
            }
        }
        return false;
    }
    ;
    /**
     * For a given room, find the closest one from the list
     */
    _closestRoom(rooms, room) {
        let dist = Infinity;
        let center = room.getCenter();
        let result = null;
        for (let i = 0; i < rooms.length; i++) {
            let r = rooms[i];
            let c = r.getCenter();
            let dx = c[0] - center[0];
            let dy = c[1] - center[1];
            let d = dx * dx + dy * dy;
            if (d < dist) {
                dist = d;
                result = r;
            }
        }
        return result;
    }
    _connectRooms(room1, room2) {
        /*
            room1.debug();
            room2.debug();
        */
        let center1 = room1.getCenter();
        let center2 = room2.getCenter();
        let diffX = center2[0] - center1[0];
        let diffY = center2[1] - center1[1];
        let start;
        let end;
        let dirIndex1, dirIndex2, min, max, index;
        if (Math.abs(diffX) < Math.abs(diffY)) { /* first try connecting north-south walls */
            dirIndex1 = (diffY > 0 ? 2 : 0);
            dirIndex2 = (dirIndex1 + 2) % 4;
            min = room2.getLeft();
            max = room2.getRight();
            index = 0;
        }
        else { /* first try connecting east-west walls */
            dirIndex1 = (diffX > 0 ? 1 : 3);
            dirIndex2 = (dirIndex1 + 2) % 4;
            min = room2.getTop();
            max = room2.getBottom();
            index = 1;
        }
        start = this._placeInWall(room1, dirIndex1); /* corridor will start here */
        if (!start) {
            return false;
        }
        if (start[index] >= min && start[index] <= max) { /* possible to connect with straight line (I-like) */
            end = start.slice();
            let value = 0;
            switch (dirIndex2) {
                case 0:
                    value = room2.getTop() - 1;
                    break;
                case 1:
                    value = room2.getRight() + 1;
                    break;
                case 2:
                    value = room2.getBottom() + 1;
                    break;
                case 3:
                    value = room2.getLeft() - 1;
                    break;
            }
            end[(index + 1) % 2] = value;
            this._digLine([start, end]);
        }
        else if (start[index] < min - 1 || start[index] > max + 1) { /* need to switch target wall (L-like) */
            let diff = start[index] - center2[index];
            let rotation = 0;
            switch (dirIndex2) {
                case 0:
                case 1:
                    rotation = (diff < 0 ? 3 : 1);
                    break;
                case 2:
                case 3:
                    rotation = (diff < 0 ? 1 : 3);
                    break;
            }
            dirIndex2 = (dirIndex2 + rotation) % 4;
            end = this._placeInWall(room2, dirIndex2);
            if (!end) {
                return false;
            }
            let mid = [0, 0];
            mid[index] = start[index];
            let index2 = (index + 1) % 2;
            mid[index2] = end[index2];
            this._digLine([start, mid, end]);
        }
        else { /* use current wall pair, but adjust the line in the middle (S-like) */
            let index2 = (index + 1) % 2;
            end = this._placeInWall(room2, dirIndex2);
            if (!end) {
                return false;
            }
            let mid = Math.round((end[index2] + start[index2]) / 2);
            let mid1 = [0, 0];
            let mid2 = [0, 0];
            mid1[index] = start[index];
            mid1[index2] = mid;
            mid2[index] = end[index];
            mid2[index2] = mid;
            this._digLine([start, mid1, mid2, end]);
        }
        room1.addDoor(start[0], start[1]);
        room2.addDoor(end[0], end[1]);
        index = this._unconnected.indexOf(room1);
        if (index != -1) {
            this._unconnected.splice(index, 1);
            this._connected.push(room1);
        }
        index = this._unconnected.indexOf(room2);
        if (index != -1) {
            this._unconnected.splice(index, 1);
            this._connected.push(room2);
        }
        return true;
    }
    _placeInWall(room, dirIndex) {
        let start = [0, 0];
        let dir = [0, 0];
        let length = 0;
        switch (dirIndex) {
            case 0:
                dir = [1, 0];
                start = [room.getLeft(), room.getTop() - 1];
                length = room.getRight() - room.getLeft() + 1;
                break;
            case 1:
                dir = [0, 1];
                start = [room.getRight() + 1, room.getTop()];
                length = room.getBottom() - room.getTop() + 1;
                break;
            case 2:
                dir = [1, 0];
                start = [room.getLeft(), room.getBottom() + 1];
                length = room.getRight() - room.getLeft() + 1;
                break;
            case 3:
                dir = [0, 1];
                start = [room.getLeft() - 1, room.getTop()];
                length = room.getBottom() - room.getTop() + 1;
                break;
        }
        let avail = [];
        let lastBadIndex = -2;
        for (let i = 0; i < length; i++) {
            let x = start[0] + i * dir[0];
            let y = start[1] + i * dir[1];
            avail.push(null);
            let isWall = (this._map[x][y] == 1);
            if (isWall) {
                if (lastBadIndex != i - 1) {
                    avail[i] = [x, y];
                }
            }
            else {
                lastBadIndex = i;
                if (i) {
                    avail[i - 1] = null;
                }
            }
        }
        for (let i = avail.length - 1; i >= 0; i--) {
            if (!avail[i]) {
                avail.splice(i, 1);
            }
        }
        return (avail.length ? _rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].getItem(avail) : null);
    }
    /**
     * Dig a polyline.
     */
    _digLine(points) {
        for (let i = 1; i < points.length; i++) {
            let start = points[i - 1];
            let end = points[i];
            let corridor = new _features_js__WEBPACK_IMPORTED_MODULE_1__.Corridor(start[0], start[1], end[0], end[1]);
            corridor.create(this._digCallback);
            this._corridors.push(corridor);
        }
    }
    _digCallback(x, y, value) {
        this._map[x][y] = value;
        if (value == 0) {
            this._dug++;
        }
    }
    _isWallCallback(x, y) {
        if (x < 0 || y < 0 || x >= this._width || y >= this._height) {
            return false;
        }
        return (this._map[x][y] == 1);
    }
    _canBeDugCallback(x, y) {
        if (x < 1 || y < 1 || x + 1 >= this._width || y + 1 >= this._height) {
            return false;
        }
        return (this._map[x][y] == 1);
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/noise/index.js":
/*!************************************************!*\
  !*** ./node_modules/rot-js/lib/noise/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _simplex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./simplex.js */ "./node_modules/rot-js/lib/noise/simplex.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ Simplex: _simplex_js__WEBPACK_IMPORTED_MODULE_0__["default"] });


/***/ }),

/***/ "./node_modules/rot-js/lib/noise/noise.js":
/*!************************************************!*\
  !*** ./node_modules/rot-js/lib/noise/noise.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Noise)
/* harmony export */ });
/**
 * Base noise generator
 */
class Noise {
}


/***/ }),

/***/ "./node_modules/rot-js/lib/noise/simplex.js":
/*!**************************************************!*\
  !*** ./node_modules/rot-js/lib/noise/simplex.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Simplex)
/* harmony export */ });
/* harmony import */ var _noise_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./noise.js */ "./node_modules/rot-js/lib/noise/noise.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util.js */ "./node_modules/rot-js/lib/util.js");



const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;
/**
 * A simple 2d implementation of simplex noise by Ondrej Zara
 *
 * Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
 * Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 */
class Simplex extends _noise_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * @param gradients Random gradients
     */
    constructor(gradients = 256) {
        super();
        this._gradients = [
            [0, -1],
            [1, -1],
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 1],
            [-1, 0],
            [-1, -1]
        ];
        let permutations = [];
        for (let i = 0; i < gradients; i++) {
            permutations.push(i);
        }
        permutations = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].shuffle(permutations);
        this._perms = [];
        this._indexes = [];
        for (let i = 0; i < 2 * gradients; i++) {
            this._perms.push(permutations[i % gradients]);
            this._indexes.push(this._perms[i] % this._gradients.length);
        }
    }
    get(xin, yin) {
        let perms = this._perms;
        let indexes = this._indexes;
        let count = perms.length / 2;
        let n0 = 0, n1 = 0, n2 = 0, gi; // Noise contributions from the three corners
        // Skew the input space to determine which simplex cell we're in
        let s = (xin + yin) * F2; // Hairy factor for 2D
        let i = Math.floor(xin + s);
        let j = Math.floor(yin + s);
        let t = (i + j) * G2;
        let X0 = i - t; // Unskew the cell origin back to (x,y) space
        let Y0 = j - t;
        let x0 = xin - X0; // The x,y distances from the cell origin
        let y0 = yin - Y0;
        // For the 2D case, the simplex shape is an equilateral triangle.
        // Determine which simplex we are in.
        let i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
        if (x0 > y0) {
            i1 = 1;
            j1 = 0;
        }
        else { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
            i1 = 0;
            j1 = 1;
        } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
        // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
        // c = (3-sqrt(3))/6
        let x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
        let y1 = y0 - j1 + G2;
        let x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
        let y2 = y0 - 1 + 2 * G2;
        // Work out the hashed gradient indices of the three simplex corners
        let ii = (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.mod)(i, count);
        let jj = (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.mod)(j, count);
        // Calculate the contribution from the three corners
        let t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 >= 0) {
            t0 *= t0;
            gi = indexes[ii + perms[jj]];
            let grad = this._gradients[gi];
            n0 = t0 * t0 * (grad[0] * x0 + grad[1] * y0);
        }
        let t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 >= 0) {
            t1 *= t1;
            gi = indexes[ii + i1 + perms[jj + j1]];
            let grad = this._gradients[gi];
            n1 = t1 * t1 * (grad[0] * x1 + grad[1] * y1);
        }
        let t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 >= 0) {
            t2 *= t2;
            gi = indexes[ii + 1 + perms[jj + 1]];
            let grad = this._gradients[gi];
            n2 = t2 * t2 * (grad[0] * x2 + grad[1] * y2);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 70 * (n0 + n1 + n2);
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/path/astar.js":
/*!***********************************************!*\
  !*** ./node_modules/rot-js/lib/path/astar.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AStar)
/* harmony export */ });
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./path.js */ "./node_modules/rot-js/lib/path/path.js");

/**
 * @class Simplified A* algorithm: all edges have a value of 1
 * @augments ROT.Path
 * @see ROT.Path
 */
class AStar extends _path_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(toX, toY, passableCallback, options = {}) {
        super(toX, toY, passableCallback, options);
        this._todo = [];
        this._done = {};
    }
    /**
     * Compute a path from a given point
     * @see ROT.Path#compute
     */
    compute(fromX, fromY, callback) {
        this._todo = [];
        this._done = {};
        this._fromX = fromX;
        this._fromY = fromY;
        this._add(this._toX, this._toY, null);
        while (this._todo.length) {
            let item = this._todo.shift();
            let id = item.x + "," + item.y;
            if (id in this._done) {
                continue;
            }
            this._done[id] = item;
            if (item.x == fromX && item.y == fromY) {
                break;
            }
            let neighbors = this._getNeighbors(item.x, item.y);
            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];
                let x = neighbor[0];
                let y = neighbor[1];
                let id = x + "," + y;
                if (id in this._done) {
                    continue;
                }
                this._add(x, y, item);
            }
        }
        let item = this._done[fromX + "," + fromY];
        if (!item) {
            return;
        }
        while (item) {
            callback(item.x, item.y);
            item = item.prev;
        }
    }
    _add(x, y, prev) {
        let h = this._distance(x, y);
        let obj = {
            x: x,
            y: y,
            prev: prev,
            g: (prev ? prev.g + 1 : 0),
            h: h
        };
        /* insert into priority queue */
        let f = obj.g + obj.h;
        for (let i = 0; i < this._todo.length; i++) {
            let item = this._todo[i];
            let itemF = item.g + item.h;
            if (f < itemF || (f == itemF && h < item.h)) {
                this._todo.splice(i, 0, obj);
                return;
            }
        }
        this._todo.push(obj);
    }
    _distance(x, y) {
        switch (this._options.topology) {
            case 4:
                return (Math.abs(x - this._fromX) + Math.abs(y - this._fromY));
                break;
            case 6:
                let dx = Math.abs(x - this._fromX);
                let dy = Math.abs(y - this._fromY);
                return dy + Math.max(0, (dx - dy) / 2);
                break;
            case 8:
                return Math.max(Math.abs(x - this._fromX), Math.abs(y - this._fromY));
                break;
        }
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/path/dijkstra.js":
/*!**************************************************!*\
  !*** ./node_modules/rot-js/lib/path/dijkstra.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dijkstra)
/* harmony export */ });
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./path.js */ "./node_modules/rot-js/lib/path/path.js");

/**
 * @class Simplified Dijkstra's algorithm: all edges have a value of 1
 * @augments ROT.Path
 * @see ROT.Path
 */
class Dijkstra extends _path_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(toX, toY, passableCallback, options) {
        super(toX, toY, passableCallback, options);
        this._computed = {};
        this._todo = [];
        this._add(toX, toY, null);
    }
    /**
     * Compute a path from a given point
     * @see ROT.Path#compute
     */
    compute(fromX, fromY, callback) {
        let key = fromX + "," + fromY;
        if (!(key in this._computed)) {
            this._compute(fromX, fromY);
        }
        if (!(key in this._computed)) {
            return;
        }
        let item = this._computed[key];
        while (item) {
            callback(item.x, item.y);
            item = item.prev;
        }
    }
    /**
     * Compute a non-cached value
     */
    _compute(fromX, fromY) {
        while (this._todo.length) {
            let item = this._todo.shift();
            if (item.x == fromX && item.y == fromY) {
                return;
            }
            let neighbors = this._getNeighbors(item.x, item.y);
            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];
                let x = neighbor[0];
                let y = neighbor[1];
                let id = x + "," + y;
                if (id in this._computed) {
                    continue;
                } /* already done */
                this._add(x, y, item);
            }
        }
    }
    _add(x, y, prev) {
        let obj = {
            x: x,
            y: y,
            prev: prev
        };
        this._computed[x + "," + y] = obj;
        this._todo.push(obj);
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/path/index.js":
/*!***********************************************!*\
  !*** ./node_modules/rot-js/lib/path/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dijkstra_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dijkstra.js */ "./node_modules/rot-js/lib/path/dijkstra.js");
/* harmony import */ var _astar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./astar.js */ "./node_modules/rot-js/lib/path/astar.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ Dijkstra: _dijkstra_js__WEBPACK_IMPORTED_MODULE_0__["default"], AStar: _astar_js__WEBPACK_IMPORTED_MODULE_1__["default"] });


/***/ }),

/***/ "./node_modules/rot-js/lib/path/path.js":
/*!**********************************************!*\
  !*** ./node_modules/rot-js/lib/path/path.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Path)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./node_modules/rot-js/lib/constants.js");

/**
 * @class Abstract pathfinder
 * @param {int} toX Target X coord
 * @param {int} toY Target Y coord
 * @param {function} passableCallback Callback to determine map passability
 * @param {object} [options]
 * @param {int} [options.topology=8]
 */
class Path {
    constructor(toX, toY, passableCallback, options = {}) {
        this._toX = toX;
        this._toY = toY;
        this._passableCallback = passableCallback;
        this._options = Object.assign({
            topology: 8
        }, options);
        this._dirs = _constants_js__WEBPACK_IMPORTED_MODULE_0__.DIRS[this._options.topology];
        if (this._options.topology == 8) { /* reorder dirs for more aesthetic result (vertical/horizontal first) */
            this._dirs = [
                this._dirs[0],
                this._dirs[2],
                this._dirs[4],
                this._dirs[6],
                this._dirs[1],
                this._dirs[3],
                this._dirs[5],
                this._dirs[7]
            ];
        }
    }
    _getNeighbors(cx, cy) {
        let result = [];
        for (let i = 0; i < this._dirs.length; i++) {
            let dir = this._dirs[i];
            let x = cx + dir[0];
            let y = cy + dir[1];
            if (!this._passableCallback(x, y)) {
                continue;
            }
            result.push([x, y]);
        }
        return result;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/rng.js":
/*!****************************************!*\
  !*** ./node_modules/rot-js/lib/rng.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */
const FRAC = 2.3283064365386963e-10; /* 2^-32 */
class RNG {
    constructor() {
        this._seed = 0;
        this._s0 = 0;
        this._s1 = 0;
        this._s2 = 0;
        this._c = 0;
    }
    getSeed() { return this._seed; }
    /**
     * Seed the number generator
     */
    setSeed(seed) {
        seed = (seed < 1 ? 1 / seed : seed);
        this._seed = seed;
        this._s0 = (seed >>> 0) * FRAC;
        seed = (seed * 69069 + 1) >>> 0;
        this._s1 = seed * FRAC;
        seed = (seed * 69069 + 1) >>> 0;
        this._s2 = seed * FRAC;
        this._c = 1;
        return this;
    }
    /**
     * @returns Pseudorandom value [0,1), uniformly distributed
     */
    getUniform() {
        let t = 2091639 * this._s0 + this._c * FRAC;
        this._s0 = this._s1;
        this._s1 = this._s2;
        this._c = t | 0;
        this._s2 = t - this._c;
        return this._s2;
    }
    /**
     * @param lowerBound The lower end of the range to return a value from, inclusive
     * @param upperBound The upper end of the range to return a value from, inclusive
     * @returns Pseudorandom value [lowerBound, upperBound], using ROT.RNG.getUniform() to distribute the value
     */
    getUniformInt(lowerBound, upperBound) {
        let max = Math.max(lowerBound, upperBound);
        let min = Math.min(lowerBound, upperBound);
        return Math.floor(this.getUniform() * (max - min + 1)) + min;
    }
    /**
     * @param mean Mean value
     * @param stddev Standard deviation. ~95% of the absolute values will be lower than 2*stddev.
     * @returns A normally distributed pseudorandom value
     */
    getNormal(mean = 0, stddev = 1) {
        let u, v, r;
        do {
            u = 2 * this.getUniform() - 1;
            v = 2 * this.getUniform() - 1;
            r = u * u + v * v;
        } while (r > 1 || r == 0);
        let gauss = u * Math.sqrt(-2 * Math.log(r) / r);
        return mean + gauss * stddev;
    }
    /**
     * @returns Pseudorandom value [1,100] inclusive, uniformly distributed
     */
    getPercentage() {
        return 1 + Math.floor(this.getUniform() * 100);
    }
    /**
     * @returns Randomly picked item, null when length=0
     */
    getItem(array) {
        if (!array.length) {
            return null;
        }
        return array[Math.floor(this.getUniform() * array.length)];
    }
    /**
     * @returns New array with randomized items
     */
    shuffle(array) {
        let result = [];
        let clone = array.slice();
        while (clone.length) {
            let index = clone.indexOf(this.getItem(clone));
            result.push(clone.splice(index, 1)[0]);
        }
        return result;
    }
    /**
     * @param data key=whatever, value=weight (relative probability)
     * @returns whatever
     */
    getWeightedValue(data) {
        let total = 0;
        for (let id in data) {
            total += data[id];
        }
        let random = this.getUniform() * total;
        let id, part = 0;
        for (id in data) {
            part += data[id];
            if (random < part) {
                return id;
            }
        }
        // If by some floating-point annoyance we have
        // random >= total, just return the last id.
        return id;
    }
    /**
     * Get RNG state. Useful for storing the state and re-setting it via setState.
     * @returns Internal state
     */
    getState() { return [this._s0, this._s1, this._s2, this._c]; }
    /**
     * Set a previously retrieved state.
     */
    setState(state) {
        this._s0 = state[0];
        this._s1 = state[1];
        this._s2 = state[2];
        this._c = state[3];
        return this;
    }
    /**
     * Returns a cloned RNG
     */
    clone() {
        let clone = new RNG();
        return clone.setState(this.getState());
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new RNG().setSeed(Date.now()));


/***/ }),

/***/ "./node_modules/rot-js/lib/scheduler/action.js":
/*!*****************************************************!*\
  !*** ./node_modules/rot-js/lib/scheduler/action.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Action)
/* harmony export */ });
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/rot-js/lib/scheduler/scheduler.js");

/**
 * @class Action-based scheduler
 * @augments ROT.Scheduler
 */
class Action extends _scheduler_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this._defaultDuration = 1; /* for newly added */
        this._duration = this._defaultDuration; /* for this._current */
    }
    /**
     * @param {object} item
     * @param {bool} repeat
     * @param {number} [time=1]
     * @see ROT.Scheduler#add
     */
    add(item, repeat, time) {
        this._queue.add(item, time || this._defaultDuration);
        return super.add(item, repeat);
    }
    clear() {
        this._duration = this._defaultDuration;
        return super.clear();
    }
    remove(item) {
        if (item == this._current) {
            this._duration = this._defaultDuration;
        }
        return super.remove(item);
    }
    /**
     * @see ROT.Scheduler#next
     */
    next() {
        if (this._current !== null && this._repeat.indexOf(this._current) != -1) {
            this._queue.add(this._current, this._duration || this._defaultDuration);
            this._duration = this._defaultDuration;
        }
        return super.next();
    }
    /**
     * Set duration for the active item
     */
    setDuration(time) {
        if (this._current) {
            this._duration = time;
        }
        return this;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/scheduler/index.js":
/*!****************************************************!*\
  !*** ./node_modules/rot-js/lib/scheduler/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _simple_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./simple.js */ "./node_modules/rot-js/lib/scheduler/simple.js");
/* harmony import */ var _speed_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./speed.js */ "./node_modules/rot-js/lib/scheduler/speed.js");
/* harmony import */ var _action_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action.js */ "./node_modules/rot-js/lib/scheduler/action.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ Simple: _simple_js__WEBPACK_IMPORTED_MODULE_0__["default"], Speed: _speed_js__WEBPACK_IMPORTED_MODULE_1__["default"], Action: _action_js__WEBPACK_IMPORTED_MODULE_2__["default"] });


/***/ }),

/***/ "./node_modules/rot-js/lib/scheduler/scheduler.js":
/*!********************************************************!*\
  !*** ./node_modules/rot-js/lib/scheduler/scheduler.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Scheduler)
/* harmony export */ });
/* harmony import */ var _eventqueue_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../eventqueue.js */ "./node_modules/rot-js/lib/eventqueue.js");

class Scheduler {
    /**
     * @class Abstract scheduler
     */
    constructor() {
        this._queue = new _eventqueue_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this._repeat = [];
        this._current = null;
    }
    /**
     * @see ROT.EventQueue#getTime
     */
    getTime() { return this._queue.getTime(); }
    /**
     * @param {?} item
     * @param {bool} repeat
     */
    add(item, repeat) {
        if (repeat) {
            this._repeat.push(item);
        }
        return this;
    }
    /**
     * Get the time the given item is scheduled for
     * @param {?} item
     * @returns {number} time
     */
    getTimeOf(item) {
        return this._queue.getEventTime(item);
    }
    /**
     * Clear all items
     */
    clear() {
        this._queue.clear();
        this._repeat = [];
        this._current = null;
        return this;
    }
    /**
     * Remove a previously added item
     * @param {?} item
     * @returns {bool} successful?
     */
    remove(item) {
        let result = this._queue.remove(item);
        let index = this._repeat.indexOf(item);
        if (index != -1) {
            this._repeat.splice(index, 1);
        }
        if (this._current == item) {
            this._current = null;
        }
        return result;
    }
    /**
     * Schedule next item
     * @returns {?}
     */
    next() {
        this._current = this._queue.get();
        return this._current;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/scheduler/simple.js":
/*!*****************************************************!*\
  !*** ./node_modules/rot-js/lib/scheduler/simple.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Simple)
/* harmony export */ });
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/rot-js/lib/scheduler/scheduler.js");

/**
 * @class Simple fair scheduler (round-robin style)
 */
class Simple extends _scheduler_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    add(item, repeat) {
        this._queue.add(item, 0);
        return super.add(item, repeat);
    }
    next() {
        if (this._current !== null && this._repeat.indexOf(this._current) != -1) {
            this._queue.add(this._current, 0);
        }
        return super.next();
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/scheduler/speed.js":
/*!****************************************************!*\
  !*** ./node_modules/rot-js/lib/scheduler/speed.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Speed)
/* harmony export */ });
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/rot-js/lib/scheduler/scheduler.js");

/**
 * @class Speed-based scheduler
 */
class Speed extends _scheduler_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * @param {object} item anything with "getSpeed" method
     * @param {bool} repeat
     * @param {number} [time=1/item.getSpeed()]
     * @see ROT.Scheduler#add
     */
    add(item, repeat, time) {
        this._queue.add(item, time !== undefined ? time : 1 / item.getSpeed());
        return super.add(item, repeat);
    }
    /**
     * @see ROT.Scheduler#next
     */
    next() {
        if (this._current && this._repeat.indexOf(this._current) != -1) {
            this._queue.add(this._current, 1 / this._current.getSpeed());
        }
        return super.next();
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/stringgenerator.js":
/*!****************************************************!*\
  !*** ./node_modules/rot-js/lib/stringgenerator.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StringGenerator)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/rot-js/lib/rng.js");

/**
 * @class (Markov process)-based string generator.
 * Copied from a <a href="http://www.roguebasin.roguelikedevelopment.org/index.php?title=Names_from_a_high_order_Markov_Process_and_a_simplified_Katz_back-off_scheme">RogueBasin article</a>.
 * Offers configurable order and prior.
 */
class StringGenerator {
    constructor(options) {
        this._options = {
            words: false,
            order: 3,
            prior: 0.001
        };
        Object.assign(this._options, options);
        this._boundary = String.fromCharCode(0);
        this._suffix = this._boundary;
        this._prefix = [];
        for (let i = 0; i < this._options.order; i++) {
            this._prefix.push(this._boundary);
        }
        this._priorValues = {};
        this._priorValues[this._boundary] = this._options.prior;
        this._data = {};
    }
    /**
     * Remove all learning data
     */
    clear() {
        this._data = {};
        this._priorValues = {};
    }
    /**
     * @returns {string} Generated string
     */
    generate() {
        let result = [this._sample(this._prefix)];
        while (result[result.length - 1] != this._boundary) {
            result.push(this._sample(result));
        }
        return this._join(result.slice(0, -1));
    }
    /**
     * Observe (learn) a string from a training set
     */
    observe(string) {
        let tokens = this._split(string);
        for (let i = 0; i < tokens.length; i++) {
            this._priorValues[tokens[i]] = this._options.prior;
        }
        tokens = this._prefix.concat(tokens).concat(this._suffix); /* add boundary symbols */
        for (let i = this._options.order; i < tokens.length; i++) {
            let context = tokens.slice(i - this._options.order, i);
            let event = tokens[i];
            for (let j = 0; j < context.length; j++) {
                let subcontext = context.slice(j);
                this._observeEvent(subcontext, event);
            }
        }
    }
    getStats() {
        let parts = [];
        let priorCount = Object.keys(this._priorValues).length;
        priorCount--; // boundary
        parts.push("distinct samples: " + priorCount);
        let dataCount = Object.keys(this._data).length;
        let eventCount = 0;
        for (let p in this._data) {
            eventCount += Object.keys(this._data[p]).length;
        }
        parts.push("dictionary size (contexts): " + dataCount);
        parts.push("dictionary size (events): " + eventCount);
        return parts.join(", ");
    }
    /**
     * @param {string}
     * @returns {string[]}
     */
    _split(str) {
        return str.split(this._options.words ? /\s+/ : "");
    }
    /**
     * @param {string[]}
     * @returns {string}
     */
    _join(arr) {
        return arr.join(this._options.words ? " " : "");
    }
    /**
     * @param {string[]} context
     * @param {string} event
     */
    _observeEvent(context, event) {
        let key = this._join(context);
        if (!(key in this._data)) {
            this._data[key] = {};
        }
        let data = this._data[key];
        if (!(event in data)) {
            data[event] = 0;
        }
        data[event]++;
    }
    /**
     * @param {string[]}
     * @returns {string}
     */
    _sample(context) {
        context = this._backoff(context);
        let key = this._join(context);
        let data = this._data[key];
        let available = {};
        if (this._options.prior) {
            for (let event in this._priorValues) {
                available[event] = this._priorValues[event];
            }
            for (let event in data) {
                available[event] += data[event];
            }
        }
        else {
            available = data;
        }
        return _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getWeightedValue(available);
    }
    /**
     * @param {string[]}
     * @returns {string[]}
     */
    _backoff(context) {
        if (context.length > this._options.order) {
            context = context.slice(-this._options.order);
        }
        else if (context.length < this._options.order) {
            context = this._prefix.slice(0, this._options.order - context.length).concat(context);
        }
        while (!(this._join(context) in this._data) && context.length > 0) {
            context = context.slice(1);
        }
        return context;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/text.js":
/*!*****************************************!*\
  !*** ./node_modules/rot-js/lib/text.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TYPE_BG": () => (/* binding */ TYPE_BG),
/* harmony export */   "TYPE_FG": () => (/* binding */ TYPE_FG),
/* harmony export */   "TYPE_NEWLINE": () => (/* binding */ TYPE_NEWLINE),
/* harmony export */   "TYPE_TEXT": () => (/* binding */ TYPE_TEXT),
/* harmony export */   "measure": () => (/* binding */ measure),
/* harmony export */   "tokenize": () => (/* binding */ tokenize)
/* harmony export */ });
/**
 * @namespace
 * Contains text tokenization and breaking routines
 */
const RE_COLORS = /%([bc]){([^}]*)}/g;
// token types
const TYPE_TEXT = 0;
const TYPE_NEWLINE = 1;
const TYPE_FG = 2;
const TYPE_BG = 3;
/**
 * Measure size of a resulting text block
 */
function measure(str, maxWidth) {
    let result = { width: 0, height: 1 };
    let tokens = tokenize(str, maxWidth);
    let lineWidth = 0;
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        switch (token.type) {
            case TYPE_TEXT:
                lineWidth += token.value.length;
                break;
            case TYPE_NEWLINE:
                result.height++;
                result.width = Math.max(result.width, lineWidth);
                lineWidth = 0;
                break;
        }
    }
    result.width = Math.max(result.width, lineWidth);
    return result;
}
/**
 * Convert string to a series of a formatting commands
 */
function tokenize(str, maxWidth) {
    let result = [];
    /* first tokenization pass - split texts and color formatting commands */
    let offset = 0;
    str.replace(RE_COLORS, function (match, type, name, index) {
        /* string before */
        let part = str.substring(offset, index);
        if (part.length) {
            result.push({
                type: TYPE_TEXT,
                value: part
            });
        }
        /* color command */
        result.push({
            type: (type == "c" ? TYPE_FG : TYPE_BG),
            value: name.trim()
        });
        offset = index + match.length;
        return "";
    });
    /* last remaining part */
    let part = str.substring(offset);
    if (part.length) {
        result.push({
            type: TYPE_TEXT,
            value: part
        });
    }
    return breakLines(result, maxWidth);
}
/* insert line breaks into first-pass tokenized data */
function breakLines(tokens, maxWidth) {
    if (!maxWidth) {
        maxWidth = Infinity;
    }
    let i = 0;
    let lineLength = 0;
    let lastTokenWithSpace = -1;
    while (i < tokens.length) { /* take all text tokens, remove space, apply linebreaks */
        let token = tokens[i];
        if (token.type == TYPE_NEWLINE) { /* reset */
            lineLength = 0;
            lastTokenWithSpace = -1;
        }
        if (token.type != TYPE_TEXT) { /* skip non-text tokens */
            i++;
            continue;
        }
        /* remove spaces at the beginning of line */
        while (lineLength == 0 && token.value.charAt(0) == " ") {
            token.value = token.value.substring(1);
        }
        /* forced newline? insert two new tokens after this one */
        let index = token.value.indexOf("\n");
        if (index != -1) {
            token.value = breakInsideToken(tokens, i, index, true);
            /* if there are spaces at the end, we must remove them (we do not want the line too long) */
            let arr = token.value.split("");
            while (arr.length && arr[arr.length - 1] == " ") {
                arr.pop();
            }
            token.value = arr.join("");
        }
        /* token degenerated? */
        if (!token.value.length) {
            tokens.splice(i, 1);
            continue;
        }
        if (lineLength + token.value.length > maxWidth) { /* line too long, find a suitable breaking spot */
            /* is it possible to break within this token? */
            let index = -1;
            while (1) {
                let nextIndex = token.value.indexOf(" ", index + 1);
                if (nextIndex == -1) {
                    break;
                }
                if (lineLength + nextIndex > maxWidth) {
                    break;
                }
                index = nextIndex;
            }
            if (index != -1) { /* break at space within this one */
                token.value = breakInsideToken(tokens, i, index, true);
            }
            else if (lastTokenWithSpace != -1) { /* is there a previous token where a break can occur? */
                let token = tokens[lastTokenWithSpace];
                let breakIndex = token.value.lastIndexOf(" ");
                token.value = breakInsideToken(tokens, lastTokenWithSpace, breakIndex, true);
                i = lastTokenWithSpace;
            }
            else { /* force break in this token */
                token.value = breakInsideToken(tokens, i, maxWidth - lineLength, false);
            }
        }
        else { /* line not long, continue */
            lineLength += token.value.length;
            if (token.value.indexOf(" ") != -1) {
                lastTokenWithSpace = i;
            }
        }
        i++; /* advance to next token */
    }
    tokens.push({ type: TYPE_NEWLINE }); /* insert fake newline to fix the last text line */
    /* remove trailing space from text tokens before newlines */
    let lastTextToken = null;
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        switch (token.type) {
            case TYPE_TEXT:
                lastTextToken = token;
                break;
            case TYPE_NEWLINE:
                if (lastTextToken) { /* remove trailing space */
                    let arr = lastTextToken.value.split("");
                    while (arr.length && arr[arr.length - 1] == " ") {
                        arr.pop();
                    }
                    lastTextToken.value = arr.join("");
                }
                lastTextToken = null;
                break;
        }
    }
    tokens.pop(); /* remove fake token */
    return tokens;
}
/**
 * Create new tokens and insert them into the stream
 * @param {object[]} tokens
 * @param {int} tokenIndex Token being processed
 * @param {int} breakIndex Index within current token's value
 * @param {bool} removeBreakChar Do we want to remove the breaking character?
 * @returns {string} remaining unbroken token value
 */
function breakInsideToken(tokens, tokenIndex, breakIndex, removeBreakChar) {
    let newBreakToken = {
        type: TYPE_NEWLINE
    };
    let newTextToken = {
        type: TYPE_TEXT,
        value: tokens[tokenIndex].value.substring(breakIndex + (removeBreakChar ? 1 : 0))
    };
    tokens.splice(tokenIndex + 1, 0, newBreakToken, newTextToken);
    return tokens[tokenIndex].value.substring(0, breakIndex);
}


/***/ }),

/***/ "./node_modules/rot-js/lib/util.js":
/*!*****************************************!*\
  !*** ./node_modules/rot-js/lib/util.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "capitalize": () => (/* binding */ capitalize),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "format": () => (/* binding */ format),
/* harmony export */   "mod": () => (/* binding */ mod)
/* harmony export */ });
/**
 * Always positive modulus
 * @param x Operand
 * @param n Modulus
 * @returns x modulo n
 */
function mod(x, n) {
    return (x % n + n) % n;
}
function clamp(val, min = 0, max = 1) {
    if (val < min)
        return min;
    if (val > max)
        return max;
    return val;
}
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}
/**
 * Format a string in a flexible way. Scans for %s strings and replaces them with arguments. List of patterns is modifiable via String.format.map.
 * @param {string} template
 * @param {any} [argv]
 */
function format(template, ...args) {
    let map = format.map;
    let replacer = function (match, group1, group2, index) {
        if (template.charAt(index - 1) == "%") {
            return match.substring(1);
        }
        if (!args.length) {
            return match;
        }
        let obj = args[0];
        let group = group1 || group2;
        let parts = group.split(",");
        let name = parts.shift() || "";
        let method = map[name.toLowerCase()];
        if (!method) {
            return match;
        }
        obj = args.shift();
        let replaced = obj[method].apply(obj, parts);
        let first = name.charAt(0);
        if (first != first.toLowerCase()) {
            replaced = capitalize(replaced);
        }
        return replaced;
    };
    return template.replace(/%(?:([a-z]+)|(?:{([^}]+)}))/gi, replacer);
}
format.map = {
    "s": "toString"
};


/***/ }),

/***/ "./src/action/directionAction.ts":
/*!***************************************!*\
  !*** ./src/action/directionAction.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DirectionAction = void 0;
class DirectionAction {
    constructor(dx, dy) {
        this.dx = dx;
        this.dy = dy;
        this.cost = 1;
    }
    execute(actor, map) {
        console.error("DirectionAction.execute should not be possible!");
        console.trace();
    }
    destination(actor) {
        return [actor.x + this.dx, actor.y + this.dy];
    }
}
exports.DirectionAction = DirectionAction;


/***/ }),

/***/ "./src/action/moveAction.ts":
/*!**********************************!*\
  !*** ./src/action/moveAction.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MoveAction = void 0;
const messageLog_1 = __webpack_require__(/*! ../utility/messageLog */ "./src/utility/messageLog.ts");
const directionAction_1 = __webpack_require__(/*! ./directionAction */ "./src/action/directionAction.ts");
class MoveAction extends directionAction_1.DirectionAction {
    constructor(dx, dy) {
        super(dx, dy);
    }
    execute(actor, map) {
        let [x, y] = this.destination(actor);
        if (!map.isWalkable(x, y) || map.actorAtLocation(x, y) !== null) {
            messageLog_1.MessageLog.addErrorMessage("That way is blocked.", true);
        }
        else {
            actor.move(this.dx, this.dy);
        }
    }
}
exports.MoveAction = MoveAction;


/***/ }),

/***/ "./src/behavior/aiBehavior.ts":
/*!************************************!*\
  !*** ./src/behavior/aiBehavior.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AIBehavior = void 0;
class AIBehavior {
    act(actor, map) {
        throw new Error("Method not implemented.");
    }
}
exports.AIBehavior = AIBehavior;


/***/ }),

/***/ "./src/behavior/playerBehavior.ts":
/*!****************************************!*\
  !*** ./src/behavior/playerBehavior.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayerBehavior = void 0;
const moveAction_1 = __webpack_require__(/*! ../action/moveAction */ "./src/action/moveAction.ts");
const inputManager_1 = __webpack_require__(/*! ../game/inputManager */ "./src/game/inputManager.ts");
class PlayerBehavior {
    act(actor, map) {
        if (inputManager_1.InputManager.isKeyDown(inputManager_1.Key.DOWN) || inputManager_1.InputManager.isKeyDown(inputManager_1.Key.S)) {
            return new moveAction_1.MoveAction(0, 1);
        }
        if (inputManager_1.InputManager.isKeyDown(inputManager_1.Key.UP) || inputManager_1.InputManager.isKeyDown(inputManager_1.Key.W)) {
            return new moveAction_1.MoveAction(0, -1);
        }
        if (inputManager_1.InputManager.isKeyDown(inputManager_1.Key.LEFT) || inputManager_1.InputManager.isKeyDown(inputManager_1.Key.A)) {
            return new moveAction_1.MoveAction(-1, 0);
        }
        if (inputManager_1.InputManager.isKeyDown(inputManager_1.Key.RIGHT) || inputManager_1.InputManager.isKeyDown(inputManager_1.Key.D)) {
            return new moveAction_1.MoveAction(1, 0);
        }
        return undefined;
    }
}
exports.PlayerBehavior = PlayerBehavior;


/***/ }),

/***/ "./src/entity/actor.ts":
/*!*****************************!*\
  !*** ./src/entity/actor.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Actor = void 0;
const entity_1 = __webpack_require__(/*! ./entity */ "./src/entity/entity.ts");
const renderOrder_1 = __webpack_require__(/*! ../utility/renderOrder */ "./src/utility/renderOrder.ts");
const aiBehavior_1 = __webpack_require__(/*! ../behavior/aiBehavior */ "./src/behavior/aiBehavior.ts");
class Actor extends entity_1.Entity {
    constructor(x = 0, y = 0, blocksMovement = false, char = "?", fg = [255, 255, 255], bg = [0, 0, 0], renderOrder = renderOrder_1.RenderOrder.Corpse, behavior = new aiBehavior_1.AIBehavior()) {
        super(x, y, blocksMovement, char, fg, bg, renderOrder);
        this.behavior = behavior;
    }
    act(map) {
        let action = this.behavior.act(this, map);
        if (action !== undefined) {
            action.execute(this, map);
            return action.cost;
        }
        return 0;
    }
    spawn(x, y, map) {
        let clone = new Actor(x, y, this.blocksMovement, this.char, undefined, // fg set after the fact
        undefined, // bg set after the fact
        this.renderOrder, this.behavior);
        clone.fg = this.fg;
        clone.bg = this.bg;
        map.addEntity(clone);
        return clone;
    }
}
exports.Actor = Actor;


/***/ }),

/***/ "./src/entity/actorFactory.ts":
/*!************************************!*\
  !*** ./src/entity/actorFactory.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const playerBehavior_1 = __webpack_require__(/*! ../behavior/playerBehavior */ "./src/behavior/playerBehavior.ts");
const actor_1 = __webpack_require__(/*! ./actor */ "./src/entity/actor.ts");
let actorFactory = {};
actorFactory.player = new actor_1.Actor();
actorFactory.player.char = '@';
actorFactory.player.behavior = new playerBehavior_1.PlayerBehavior();
exports["default"] = actorFactory;


/***/ }),

/***/ "./src/entity/entity.ts":
/*!******************************!*\
  !*** ./src/entity/entity.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Entity = void 0;
const color_1 = __webpack_require__(/*! rot-js/lib/color */ "./node_modules/rot-js/lib/color.js");
const error_1 = __webpack_require__(/*! ../utility/error */ "./src/utility/error.ts");
const renderOrder_1 = __webpack_require__(/*! ../utility/renderOrder */ "./src/utility/renderOrder.ts");
class Entity {
    constructor(x = 0, y = 0, blocksMovement = false, char = "?", fg = [255, 255, 255], bg = [0, 0, 0], renderOrder = renderOrder_1.RenderOrder.Corpse) {
        this.x = x;
        this.y = y;
        this.blocksMovement = blocksMovement;
        this.char = char;
        this.fg = (0, color_1.toRGB)(fg);
        this.bg = (0, color_1.toRGB)(bg);
        this.renderOrder = renderOrder;
        (0, error_1.assert)(this.char.length === 1);
    }
    // => Entity
    spawn(x, y, map) {
        let clone = new Entity(x, y, this.blocksMovement, this.char, undefined, // fg set after the fact
        undefined, // bg set after the fact
        this.renderOrder);
        clone.fg = this.fg;
        clone.bg = this.bg;
        map.addEntity(clone);
        return clone;
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
    render(display) {
        display.draw(this.x, this.y, this.char, this.fg, this.bg);
    }
}
exports.Entity = Entity;


/***/ }),

/***/ "./src/game/game.ts":
/*!**************************!*\
  !*** ./src/game/game.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Game = void 0;
const rot_js_1 = __webpack_require__(/*! rot-js */ "./node_modules/rot-js/lib/index.js");
const gameMap_1 = __webpack_require__(/*! ./gameMap */ "./src/game/gameMap.ts");
const inputManager_1 = __webpack_require__(/*! ./inputManager */ "./src/game/inputManager.ts");
const actorFactory_1 = __importDefault(__webpack_require__(/*! ../entity/actorFactory */ "./src/entity/actorFactory.ts"));
const uiFactory_1 = __webpack_require__(/*! ../ui/uiFactory */ "./src/ui/uiFactory.ts");
const roomGenerator_1 = __webpack_require__(/*! ../generation/roomGenerator */ "./src/generation/roomGenerator.ts");
class Game {
    constructor() {
        this.config = { width: 80, height: 40 };
        this.display = new rot_js_1.Display({
            width: this.config.width,
            height: this.config.height,
        });
        this.map = new gameMap_1.GameMap(this.config.width, this.config.height);
        document.body.appendChild(this.display.getContainer());
        this.player = actorFactory_1.default.player.spawn(0, 0, this.map);
        this.delta = 0;
    }
    generateMap() {
        let temp = new roomGenerator_1.RoomGenerator(this.config.width, this.config.height);
        let res = temp.generate();
        this.map = res[0];
        this.player.x = res[1];
        this.player.y = res[2];
        this.map.addActor(this.player);
        // let digger = new Map.Digger(this.config.width, this.config.height);
        // let freeCells: [number, number][] = new Array();
        // let callback = (x: number, y: number, value: number) => {
        //   if (value) return; // do not store walls
        //   freeCells.push([x, y]);
        //   this.map.setTile(x, y, tileFactory.floor);
        // }
        // digger.create(callback);
        // let [x,y] = freeCells[0];
        // this.player.x = x;
        // this.player.y = y;
        // console.warn('boxes not placed yet!');
        // for (var i = 0; i < 10; ++i) {
        //   const index = Math.floor(RNG.getUniform() * freeCells.length);
        //   const key = freeCells.splice(index, 1)[0]; // get key and remove it 
        //   this.map[key] = "*";
        // }
    }
    setUISize() {
        var _a;
        const canvas = (_a = document.querySelector('canvas')) === null || _a === void 0 ? void 0 : _a.getContext('2d').canvas;
        const log = document.getElementById('messages');
        log.style.left = `${canvas.offsetLeft}px`;
        log.style.width = `${canvas.width}px`;
    }
    render(menu, computeFOV) {
        this.display.clear();
        if (computeFOV) {
            this.map.computeFOV(this.player.x, this.player.y);
        }
        this.map.render(this.display);
        if (menu !== null) {
            menu.render(this.display);
        }
    }
    start() {
        // GUI set up for the browser
        document.getElementById('game').appendChild(this.display.getContainer());
        this.setUISize();
        addEventListener('resize', this.setUISize);
        // initialize game engine details
        inputManager_1.InputManager.init();
        let oldTimeStamp;
        let fps;
        let turnNumber = 1;
        // we start at the main menu
        let menu = (0, uiFactory_1.mainMenu)(this.config.width, this.config.height, () => {
            this.generateMap();
            this.render(null, true);
        });
        // the loop is a callback handled by window.requestAnimationFrame
        const gameLoop = (timeStamp) => {
            // Calculate the number of seconds passed since the last frame
            this.delta = (timeStamp - oldTimeStamp) / 1000;
            oldTimeStamp = timeStamp;
            fps = Math.round(1 / this.delta);
            if (menu !== null) {
                // if there is a menu then it handles input
                menu.update();
                if (menu.shouldExit) {
                    menu = null;
                    this.render(menu, false);
                }
                else if (menu.shouldRender) {
                    this.render(menu, false);
                }
            }
            else if (inputManager_1.InputManager.isKeyDown(inputManager_1.Key.H)) {
                // Create the help menu
                menu = (0, uiFactory_1.helpMenu)(this.config.width, this.config.height);
            }
            else if (turnNumber % 3 == 0) {
                // AI turn
                turnNumber = 1;
            }
            else {
                // player turn
                const cost = this.player.act(this.map);
                if (cost > 0) {
                    inputManager_1.InputManager.clear();
                    this.render(menu, true);
                }
            }
            window.requestAnimationFrame(gameLoop);
        };
        window.requestAnimationFrame(gameLoop);
    }
}
exports.Game = Game;


/***/ }),

/***/ "./src/game/gameMap.ts":
/*!*****************************!*\
  !*** ./src/game/gameMap.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameMap = void 0;
const tileFactory_1 = __importDefault(__webpack_require__(/*! ../tile/tileFactory */ "./src/tile/tileFactory.ts"));
const error_1 = __webpack_require__(/*! ../utility/error */ "./src/utility/error.ts");
const precise_shadowcasting_1 = __importDefault(__webpack_require__(/*! rot-js/lib/fov/precise-shadowcasting */ "./node_modules/rot-js/lib/fov/precise-shadowcasting.js"));
class GameMap {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tiles = Array(this.width * this.height + this.width).fill(tileFactory_1.default.wall);
        this.visible = Array(this.width * this.height + this.width).fill(false);
        this.explored = Array(this.width * this.height + this.width).fill(true);
        this.entities = [];
        this.actors = [];
    }
    index(x, y) {
        return y * this.width + x;
    }
    inBounds(x, y) {
        return y * this.width + x < this.tiles.length;
    }
    isWalkable(x, y) {
        const index = this.index(x, y);
        if (index >= this.tiles.length || index < 0) {
            return false;
        }
        return this.tiles[index].walkable;
    }
    setTile(x, y, tile) {
        const index = this.index(x, y);
        (0, error_1.assert)(index < this.tiles.length);
        this.tiles[index] = tile;
    }
    render(display) {
        let y;
        let x;
        let index = 0;
        // render the map
        for (y = 0; y < this.height; ++y) {
            for (x = 0; x < this.width; ++x) {
                const tile = this.tiles[index];
                if (this.visible[index]) {
                    display.draw(x, y, tile.char, tile.inViewFG, tile.inViewBG);
                }
                else if (this.explored[index]) {
                    display.draw(x, y, tile.char, tile.outOfViewFG, tile.outOfViewBG);
                }
                // else draw nothing
                index++;
            }
        }
        // render entities
        this.entities.sort((a, b) => { return a.renderOrder.valueOf() - b.renderOrder.valueOf(); });
        for (let e of this.entities) {
            e.render(display);
        }
        // render actors
        this.entities.sort((a, b) => { return a.renderOrder.valueOf() - b.renderOrder.valueOf(); });
        for (let a of this.actors) {
            a.render(display);
        }
    }
    addEntity(entity) {
        (0, error_1.assert)(this.entityAtLocation(entity.x, entity.y) == null);
        (0, error_1.assert)(this.actorAtLocation(entity.x, entity.y) == null);
        this.entities.push(entity);
    }
    entityAtLocation(x, y) {
        for (var entity of this.entities) {
            if (entity.x == x && entity.y == y) {
                return entity;
            }
        }
        return null;
    }
    addActor(actor) {
        (0, error_1.assert)(this.entityAtLocation(actor.x, actor.y) == null);
        (0, error_1.assert)(this.actorAtLocation(actor.x, actor.y) == null);
        this.actors.push(actor);
    }
    actorAtLocation(x, y) {
        for (var actor of this.actors) {
            if (actor.x == x && actor.y == y) {
                return actor;
            }
        }
        return null;
    }
    locationOccupied(x, y) {
        return this.entityAtLocation(x, y) != null || this.actorAtLocation(x, y) != null;
    }
    computeFOV(x, y) {
        const SIGHT_RADIUS = 10;
        const fov = new precise_shadowcasting_1.default((x, y) => {
            const index = this.index(x, y);
            if (index < this.tiles.length && index >= 0) {
                return this.tiles[index].walkable;
            }
            return false;
        });
        this.visible.fill(false);
        fov.compute(x, y, SIGHT_RADIUS, (x, y, r, visibility) => {
            const index = this.index(x, y);
            if (visibility > 0.0) {
                this.explored[index] = true;
                this.visible[index] = true;
            }
            else {
                this.visible[index] = false;
            }
        });
    }
}
exports.GameMap = GameMap;


/***/ }),

/***/ "./src/game/inputManager.ts":
/*!**********************************!*\
  !*** ./src/game/inputManager.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InputManager = exports.Key = void 0;
var Key;
(function (Key) {
    Key[Key["LEFT"] = 0] = "LEFT";
    Key[Key["RIGHT"] = 1] = "RIGHT";
    Key[Key["DOWN"] = 2] = "DOWN";
    Key[Key["UP"] = 3] = "UP";
    Key[Key["W"] = 4] = "W";
    Key[Key["A"] = 5] = "A";
    Key[Key["S"] = 6] = "S";
    Key[Key["D"] = 7] = "D";
    Key[Key["Q"] = 8] = "Q";
    Key[Key["R"] = 9] = "R";
    Key[Key["H"] = 10] = "H";
    Key[Key["SPACE"] = 11] = "SPACE";
    Key[Key["ESCAPE"] = 12] = "ESCAPE";
    Key[Key["ENTER"] = 13] = "ENTER";
    Key[Key["INVALID"] = 14] = "INVALID";
})(Key = exports.Key || (exports.Key = {}));
// static class to handle input
class InputManager {
    static init() {
        for (let i = 0; i < Object.keys(Key).length; ++i) {
            InputManager._keys.push(false);
        }
        window.addEventListener("keydown", InputManager.onKeyDown);
        window.addEventListener("keyup", InputManager.onKeyUp);
    }
    static isKeyDown(...keys) {
        for (let k of keys) {
            if (InputManager._keys[k]) {
                return true;
            }
        }
        return false;
    }
    static keyStrToKey(key) {
        switch (key) {
            case 'Down':
            case 'ArrowDown':
                return Key.DOWN;
            case 'Up':
            case 'ArrowUp':
                return Key.UP;
            case 'Right':
            case 'ArrowRight':
                return Key.RIGHT;
            case 'Left':
            case 'ArrowLeft':
                return Key.LEFT;
            case ' ':
            case 'Space':
                return Key.SPACE;
            case 'Escape':
                return Key.ESCAPE;
            case 'a':
                return Key.A;
            case 's':
                return Key.S;
            case 'd':
                return Key.D;
            case 'w':
                return Key.W;
            case 'r':
                return Key.R;
            case 'q':
                return Key.Q;
            case 'h':
                return Key.H;
            case 'Enter':
                return Key.ENTER;
            default:
                console.warn(`Unhandled key: ${key}.`);
                return Key.INVALID;
        }
    }
    static onKeyDown(event) {
        const k = InputManager.keyStrToKey(event.key);
        InputManager._keys[k] = true;
        if (k == Key.DOWN || k == Key.UP || k == Key.LEFT || k == Key.RIGHT) {
            event.preventDefault();
        }
        return false;
    }
    static onKeyUp(event) {
        InputManager._keys[InputManager.keyStrToKey(event.key)] = false;
        return false;
    }
    static clear() {
        for (let i = 0; i < InputManager._keys.length; ++i) {
            InputManager._keys[i] = false;
        }
    }
}
exports.InputManager = InputManager;
InputManager._keys = [];


/***/ }),

/***/ "./src/generation/baselineGenerator.ts":
/*!*********************************************!*\
  !*** ./src/generation/baselineGenerator.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseLineGenerator = void 0;
class BaseLineGenerator {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
exports.BaseLineGenerator = BaseLineGenerator;


/***/ }),

/***/ "./src/generation/generationUtility.ts":
/*!*********************************************!*\
  !*** ./src/generation/generationUtility.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.straightLineConnection = exports.bresenham = void 0;
const rot_js_1 = __webpack_require__(/*! rot-js */ "./node_modules/rot-js/lib/index.js");
// Based on: http://www.roguebasin.com/index.php/Bresenham%27s_Line_Algorithm
function bresenham(x1, y1, x2, y2, callback) {
    let temp;
    let dx = x2 - x1;
    let dy = y2 - y1;
    // rotate if the line is more y than x (steep)
    const isSteep = Math.abs(dy) > Math.abs(dx);
    if (isSteep) {
        temp = x1;
        x1 = y1;
        y1 = temp;
        temp = x2;
        x2 = y2;
        y2 = temp;
    }
    // rearrange so x1 < x2 by swapping points
    let swapped = x1 > x2;
    if (swapped) {
        temp = x1;
        x1 = x2;
        x2 = temp;
        temp = y1;
        y1 = y2;
        y2 = temp;
    }
    // recalculate the differences
    dy = y2 - y1;
    dx = x2 - x1;
    // calculate the error
    let error = Math.round(dx / 2.0);
    const yStep = y1 < y2 ? 1 : -1;
    // Iterate over bounding box generating points between start and end
    // and use callback to pass the line. NOTE: this doesn't work correctly
    // if the order matters because `swapped` indicates that the order 
    // should be reversed for the correct ordering between the points.
    let y = y1;
    for (let x = x1; x < x2; ++x) {
        if (isSteep) {
            callback(y, x);
        }
        else {
            callback(x, y);
        }
        error -= Math.abs(dy);
        if (error < 0) {
            y += yStep;
            error += dx;
            if (isSteep) {
                callback(y, x);
            }
            else {
                callback(x, y);
            }
        }
    }
}
exports.bresenham = bresenham;
function straightLineConnection(x1, y1, x2, y2, callback) {
    if (rot_js_1.RNG.getUniform() >= 0.5) {
        const xIncrement = x1 < x2 ? 1 : -1;
        while (x1 != x2) {
            x1 += xIncrement;
            callback(x1, y1);
        }
        const yIncrement = y1 < y2 ? 1 : -1;
        while (y1 != y2) {
            y1 += yIncrement;
            callback(x1, y1);
        }
    }
    else {
        const yIncrement = y1 < y2 ? 1 : -1;
        while (y1 != y2) {
            y1 += yIncrement;
            callback(x1, y1);
        }
        const xIncrement = x1 < x2 ? 1 : -1;
        while (x1 != x2) {
            x1 += xIncrement;
            callback(x1, y1);
        }
    }
}
exports.straightLineConnection = straightLineConnection;


/***/ }),

/***/ "./src/generation/levels.ts":
/*!**********************************!*\
  !*** ./src/generation/levels.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LEVELS = void 0;
exports.LEVELS = { "8_0_0": ["---------^^^^^^", "-----------^---", "-----------^---", "-----------^---", "-----------^--^", "---#-----------", "-----------&--^", "/\\\\------------", "\\//------------", "------*--------", "*--------^^^^^^"], "8_0_1": ["---------^^^^^^", "-----------^---", "-----------^---", "-----------^---", "-----------^--^", "---#-----------", "-----------&--^", "/\\\\------------", "\\//------------", "------*--------", "*--------^^^^^^"], "8_1_0": ["----------^^^^^", "------------X--", "------------X--", "------------X--", "------------X--", "---#--------X-#", "------------X--", "/\\\\---------X--", "\\//---------X--", "------*--------", "*---------^^^^^"], "8_1_1": ["----------^^^^^", "------------X--", "------------X--", "------------X--", "------------X--", "---#--------X-#", "------------X--", "/\\\\---------X--", "\\//---------X--", "------*--------", "*---------^^^^^"], "8_1_2": ["-----^^^^^^^^^^", "-----^^^-----^-", "-------------^-", "X----^^^-----^-", "X----^^^-----^-", "X----^^^-------", "X----^^^-----&-", "X----^^^-------", "X--------------", "X----^^^--X----", "X----^^^^^^^^^^"], "9_0_0": ["-------^^^^^^^^", "-------------*-", "---------------", "------------^^^", "----------^^^^^", "---#---------&-", "----------^^^^^", "/\\\\---------^^^", "\\//------------", "-------------*-", "*------^^^^^^^^"], "9_0_1": ["-------^^^^^^^^", "-------------*-", "---------------", "------------^^^", "----------^^^^^", "---#---------&-", "----------^^^^^", "/\\\\---------^^^", "\\//------------", "-------------*-", "*------^^^^^^^^"], "9_0_2": ["^^^^^^^-^-^-^--", "-X--^---^-^-^--", "-X--^-----^-^--", "-X--^-------^--", "-X--^----------", "-X-------------", "-X--&----------", "-X----------^--", "-X--------^-^--", "-#------^-^-^--", "^^^^^^^-^-^-^--"], "7_0_0": ["----------^^^^^", "------------^--", "------------^--", "------------^--", "------------^--", "---#-----------", "------------&--", "/\\\\------------", "\\//------------", "------*--------", "*---------^^^^^"], "7_0_1": ["----------^^^^^", "------------^--", "------------^--", "------------^--", "------------^--", "---#-----------", "------------&--", "/\\\\------------", "\\//------------", "------*--------", "*---------^^^^^"], "7_0_2": ["X---^^^--^^^---", "----^^^--^^^---", "X---^^^--^^^---", "X---^^^--^^^---", "X----&----&----", "*---^^^--------", "X----*---^^^---", "X---^^^--^^^---", "X---^^^--^^^---", "----^^^--^^^---", "X---^^^--^^^---"], "0_0_0": ["---------------", "\\\\-------------", "//-------------", "---------------", "---------------", "----#--&--&--&-", "---------------", "---------------", "&--------------", "---------------", "---------------"], "0_0_1": ["---------------", "\\\\-------------", "//-------------", "---------------", "---------------", "----#--&--&--&-", "---------------", "---------------", "&--------------", "---------------", "---------------"], "0_0_2": ["X--------------", "X--------------", "X--------------", "X--------------", "---------------", "-----------&---", "---------------", "X--------------", "X--------------", "X-----*--------", "X--------------"], "0_1_0": ["----------X----", "\\\\--------X----", "//--------X----", "----------X----", "----------X----", "----#--&--X--&-", "----------X----", "----------X----", "&---------X----", "----------X----", "----------&----"], "0_1_1": ["----------X----", "\\\\--------X----", "//--------X----", "----------X----", "----------X----", "----#--&--X--&-", "----------X----", "----------X----", "&---------X----", "----------X----", "----------&----"], "0_1_2": ["XXX------------", "---------------", "---------------", "X--------------", "X--------------", "X----------&---", "X--------------", "X--------------", "---------------", "------*--------", "XXX------------"], "1_0_0": ["---------------", "---------------", "---------------", "---------------", "---------------", "---#--&--&--&--", "---------------", "/\\\\------------", "\\//------------", "---------------", "*--------------"], "1_0_1": ["---------------", "---------------", "---------------", "---------------", "---------------", "---#--&--&--&--", "---------------", "/\\\\------------", "\\//------------", "---------------", "*--------------"], "1_0_2": ["^--------------", "------//\\\\-----", "------\\\\//-----", "---------------", "---------------", "----&----------", "---------------", "---------------", "--------&------", "------------*--", "^--------------"], "7_3_0": ["--------X--^^^^", "-------------X-", "--------X----X-", "-------XX----X-", "------XXX----X-", "---#--X#&----X-", "------XXX----X-", "/\\\\----XX----X-", "\\//-----X----X-", "-------------#-", "*-------X--^^^^"], "7_3_1": ["--------X--^^^^", "-------------X-", "--------X----X-", "-------XX----X-", "------XXX----X-", "---#--X#&----X-", "------XXX----X-", "/\\\\----XX----X-", "\\//-----X----X-", "-------------#-", "*-------X--^^^^"], "7_3_2": ["--XXXXXXXXXXXXX", "-------^^^^^^^^", "----------^^^^-", "---------------", "-------------//", "-------------\\\\", "---------------", "---------------", "----X-----^^^^-", "----X--^^^^^^^^", "--XXXXXXXXXXXXX"], "7_4_0": ["------^^^--XXXX", "------^^^--XXXX", "------^^^--XXXX", "------^^^--XXXX", "-------*-----*-", "---#--^^^------", "-------&------#", "/\\\\---^^^--XXXX", "\\//---^^^--XXXX", "------^^^--XXXX", "*-----^^^--XXXX"], "7_4_1": ["------^^^--XXXX", "------^^^--XXXX", "------^^^--XXXX", "------^^^--XXXX", "-------*-----*-", "---#--^^^------", "-------&------#", "/\\\\---^^^--XXXX", "\\//---^^^--XXXX", "------^^^--XXXX", "*-----^^^--XXXX"], "7_4_2": ["---X-----------", "---X-----------", "---X---^-----^-", "---X---^-----^-", "-------^-----^-", "-------^-----^-", "---#-#-#-#-#-#-", "---------------", "---------------", "/\\\\XXXXXXXXXXXX", "\\//XXXXXXXXXXXX"], "7_2_0": ["------#---^^^^^", "------XX----^--", "------XX----^--", "------XX----^--", "------XX----^--", "---#-----------", "------XX----&--", "/\\\\---XX-------", "\\//---XX-------", "------XX-------", "*-----#---^^^^^"], "7_2_1": ["------#---^^^^^", "------XX----^--", "------XX----^--", "------XX----^--", "------XX----^--", "---#-----------", "------XX----&--", "/\\\\---XX-------", "\\//---XX-------", "------XX-------", "*-----#---^^^^^"], "8_3_0": ["--------X--^^^^", "---------------", "--------X----X-", "-------XX----XX", "------XXX----XX", "---#--X#&----*#", "------XXX----XX", "/\\\\----XX----XX", "\\//-----X----X-", "---------------", "*-------X--^^^^"], "8_3_1": ["--------X--^^^^", "---------------", "--------X----X-", "-------XX----XX", "------XXX----XX", "---#--X#&----*#", "------XXX----XX", "/\\\\----XX----XX", "\\//-----X----X-", "---------------", "*-------X--^^^^"], "8_3_2": ["-----------^^^^", "-----------^^^^", "^--^-----------", "^--^---XX------", "^--^---XX--^^^^", "^--^---XX--^^^^", "#-#-#--XX--^^^^", "-------XX--^^^^", "-------XX--^^^^", "XXXXXXXXX--^^^^", "XXXXXXXXX--^^^^"], "6_3_0": ["---------X--^^^", "--------------X", "---------X----X", "--------XX----X", "-------XXX----X", "---#---X#&----X", "-------XXX----X", "/\\\\-----XX----X", "\\//------X----X", "--------------#", "*--------X--^^^"], "6_3_1": ["---------X--^^^", "--------------X", "---------X----X", "--------XX----X", "-------XXX----X", "---#---X#&----X", "-------XXX----X", "/\\\\-----XX----X", "\\//------X----X", "--------------#", "*--------X--^^^"], "6_3_2": ["----#---X--^^^^", "^^--XX--X--^^^^", "^^--XX--X--^^^^", "^^--XX--X------", "^^--XX--X--^^^^", "^^------X--^^^^", "^^--XX--X--^^^^", "^^--XX--X------", "^^--XX--X--^^^^", "^^--XX--X--^^^^", "----#---&--^^^^"], "14_1_0": ["---^^^^^^^^^^^^", "--------------*", "--------X------", "-------XX----^^", "------XXX--^^^^", "#-----X#*-----&", "------XXX--^^^^", "-------XX----^^", "--------X------", "--------------*", "---^^^^^^^^^^^^"], "14_1_1": ["---^^^^^^^^^^^^", "--------------*", "--------X------", "-------XX----^^", "------XXX--^^^^", "#-----X#*-----&", "------XXX--^^^^", "-------XX----^^", "--------X------", "--------------*", "---^^^^^^^^^^^^"], "14_2_0": ["---^^^^^^^^^^^^", "------^--------", "------^----X--X", "------^---XX--X", "------^--XXX--X", "#--------X#*--*", "------&--XXX--X", "----------XX--X", "-----------X--X", "---------------", "---^^^^^^^^^^^^"], "14_2_1": ["---^^^^^^^^^^^^", "------^--------", "------^----X--X", "------^---XX--X", "------^--XXX--X", "#--------X#*--*", "------&--XXX--X", "----------XX--X", "-----------X--X", "---------------", "---^^^^^^^^^^^^"], "14_0_0": ["^^^^^^^^^^^^^^^", "&-----^--^--X--", "------^--^--X--", "^^----^--^--X--", "^^^^--^--^--X--", "------------X--", "^^^^--&--&--X--", "^^----------X--", "------------X--", "&-----------#--", "^^^^^^^^^^^^^^^"], "14_0_1": ["^^^^^^^^^^^^^^^", "&-----^--^--X--", "------^--^--X--", "^^----^--^--X--", "^^^^--^--^--X--", "------------X--", "^^^^--&--&--X--", "^^----------X--", "------------X--", "&-----------#--", "^^^^^^^^^^^^^^^"], "14_0_2": ["^^^^^^^^^^^^^^^", "-----^^---^^^--", "----------^^^--", "--X--^^----&---", "*-X--^^---^^^--", "XXX--^^---^^^--", "*-X--^^---^^^--", "--X--^^----&---", "----------^^^--", "-----^^---^^^--", "^^^^^^^^^^^^^^^"], "15_1_0": ["-^^^^^^^^^^^^^^", "-^^----------*-", "-^^----X-------", "-^^---XX----^^^", "-----XXX--^^^^^", "-^^--X#*-----&-", "-----XXX--^^^^^", "-^^---XX----^^^", "-^^----X-------", "-^^----------*-", "-^^^^^^^^^^^^^^"], "15_1_1": ["-^^^^^^^^^^^^^^", "-^^----------*-", "-^^----X-------", "-^^---XX----^^^", "-----XXX--^^^^^", "-^^--X#*-----&-", "-----XXX--^^^^^", "-^^---XX----^^^", "-^^----X-------", "-^^----------*-", "-^^^^^^^^^^^^^^"], "15_1_2": ["^^^^^^^^^^^^^^^", "#X--------X---&", "XX--------X--^^", "X---------X--^^", "----------X--^^", "----------X--^^", "-------X--X--^^", "-------X--X--^^", "-------X--X--^^", "-------X--#---&", "^^^^^^^^^^^^^^^"], "13_1_0": ["----^^^^^^^^^^^", "--------------*", "--------X------", "-------XX----^^", "------XXX--^^^^", "#-----X#*-----&", "------XXX--^^^^", "-------XX----^^", "--------X------", "--------------*", "----^^^^^^^^^^^"], "13_1_1": ["----^^^^^^^^^^^", "--------------*", "--------X------", "-------XX----^^", "------XXX--^^^^", "#-----X#*-----&", "------XXX--^^^^", "-------XX----^^", "--------X------", "--------------*", "----^^^^^^^^^^^"], "13_1_2": ["^^^^^^^^^^^^^^^", "---X----&------", "^-------X------", "^-------X------", "^-------X--^^^^", "^-------X------", "^-------X--^^^^", "^-------X------", "^-------X------", "--------X------", "^^^^^^^^^^^^^^^"], "4_3_0": ["------#---X--^^", "------XX--X----", "------XX--X----", "------XX--X----", "------XX--X----", "---#------X----", "------XX--X----", "/\\\\---XX--X----", "\\//---XX--X----", "------XX--X----", "*-----#---&--^^"], "4_3_1": ["------#---X--^^", "------XX--X----", "------XX--X----", "------XX--X----", "------XX--X----", "---#------X----", "------XX--X----", "/\\\\---XX--X----", "\\//---XX--X----", "------XX--X----", "*-----#---&--^^"], "4_3_2": ["^^----X----X--^", "--------------^", "------X----X--^", "-----XX---XX---", "----XXX--XXX--^", "----X#&--X#&--^", "----XXX--XXX--^", "-----XX---XX---", "------X----X--^", "--------------^", "^^----X----X--^"], "4_4_0": ["---------XXX^^^", "------------^^^", "---------------", "---------XXX---", "---------XXX^^^", "---#--&--XXX^^^", "---------XXX^^^", "/\\\\------XXX^^^", "\\//------XXX^^^", "---------XXX^^^", "*--------XXX^^^"], "4_4_1": ["---------XXX^^^", "------------^^^", "---------------", "---------XXX---", "---------XXX^^^", "---#--&--XXX^^^", "---------XXX^^^", "/\\\\------XXX^^^", "\\//------XXX^^^", "---------XXX^^^", "*--------XXX^^^"], "4_4_2": ["XXX^^^^^------X", "XXX^^^^^------X", "XXX^^^^^------X", "XXX^^^^^------X", "XXX^^^^^------X", "XXX^^^^^------X", "XXX--^^^------X", "X--------------", "---^^----------", "-XX^^^^^------X", "XXX^^^^^------X"], "4_2_0": ["------#------^^", "------XX-------", "------XX-------", "------XX-------", "------XX-------", "---#------&----", "------XX-------", "/\\\\---XX-------", "\\//---XX-------", "------XX-------", "*-----#------^^"], "4_2_1": ["------#------^^", "------XX-------", "------XX-------", "------XX-------", "------XX-------", "---#------&----", "------XX-------", "/\\\\---XX-------", "\\//---XX-------", "------XX-------", "*-----#------^^"], "5_3_0": ["------#---XXXXX", "------XX----^^^", "------XX----^^^", "------XX----^^^", "------XX----^^^", "---#---------&-", "------XX----^^^", "/\\\\---XX----^^^", "\\//---XX----^^^", "------XX----^^^", "*-----#---XXXXX"], "5_3_1": ["------#---XXXXX", "------XX----^^^", "------XX----^^^", "------XX----^^^", "------XX----^^^", "---#---------&-", "------XX----^^^", "/\\\\---XX----^^^", "\\//---XX----^^^", "------XX----^^^", "*-----#---XXXXX"], "3_3_0": ["------#---X----", "------XX--X--^-", "------XX--X----", "------XX--X--^-", "------XX--X----", "---#------X--^-", "------XX--X----", "/\\\\---XX--X--^-", "\\//---XX--X----", "------XX--X--^-", "*-----#---&----"], "3_3_1": ["------#---X----", "------XX--X--^-", "------XX--X----", "------XX--X--^-", "------XX--X----", "---#------X--^-", "------XX--X----", "/\\\\---XX--X--^-", "\\//---XX--X----", "------XX--X--^-", "*-----#---&----"], "3_3_2": ["XXX------------", "---------------", "---------------", "---------X---X-", "--------^X---X^", "-------^^XXXXX^", "--------^X---X^", "---------X---X-", "---------------", "^--------//\\\\--", "XXX------\\\\//--"], "0_8_0": ["----#---X--XXXX", "\\\\--XX--X--XXXX", "//--XX--X--XXXX", "----XX--X--XXXX", "----XX--X--XXXX", "--------X--XXXX", "----XX--X--XXXX", "----XX--X----XX", "&---XX--X------", "----XX--X--XX--", "----#---&--XXXX"], "0_8_1": ["----#---X--XXXX", "\\\\--XX--X--XXXX", "//--XX--X--XXXX", "----XX--X--XXXX", "----XX--X--XXXX", "--------X--XXXX", "----XX--X--XXXX", "----XX--X----XX", "&---XX--X------", "----XX--X--XX--", "----#---&--XXXX"], "0_8_2": ["XXX---XXXXXXXXX", "#XX----XXXXXXXX", "-XX-------XXXXX", "-XX------------", "----------XXXXX", "---------------", "----------XXXXX", "-XX------------", "-XX-------XXXXX", "-XX----XXXXXXXX", "XXX---XXXXXXXXX"], "0_9_0": ["----#----XXXXXX", "\\\\--XX---XXXXXX", "//--XX---XXXXXX", "----XX---XXXXXX", "----XX---------", "-----------XXXX", "----XX-----XXXX", "----XX---XXXXXX", "&---XX---XXXXXX", "----XX---XXXXXX", "----#----XXXXXX"], "0_9_1": ["----#----XXXXXX", "\\\\--XX---XXXXXX", "//--XX---XXXXXX", "----XX---XXXXXX", "----XX---------", "-----------XXXX", "----XX-----XXXX", "----XX---XXXXXX", "&---XX---XXXXXX", "----XX---XXXXXX", "----#----XXXXXX"], "0_9_2": ["----XXXX--XXXX-", "-X--XXXX--XXXX-", "-X--XXXX--XXXX-", "-X--XXXX--XXXX-", "-X--XXXX--XXXX-", "XX--XXXX--XXXX-", "-X--------XXXX-", "-X----------XX-", "-X--XXXX-------", "-X--XXXX--XX---", "----XXXX--XXXX-"], "0_7_0": ["----#---X---XXX", "\\\\--XX--X---XXX", "//--XX--X---XXX", "----XX--X---XXX", "----XX--X---XX-", "--------X---XX-", "----XX--X------", "----XX--X---XXX", "&---XX--X---XXX", "----XX--X---XXX", "----#---&---XXX"], "0_7_1": ["----#---X---XXX", "\\\\--XX--X---XXX", "//--XX--X---XXX", "----XX--X---XXX", "----XX--X---XX-", "--------X---XX-", "----XX--X------", "----XX--X---XXX", "&---XX--X---XXX", "----XX--X---XXX", "----#---&---XXX"], "0_7_2": ["XXXXXXXXXXXXXXX", "------XXXXXXXXX", "-----------XX--", "------XXX------", "-----------XX--", "------XXX------", "-----------XX--", "---^--XXX------", "---^-------XX--", "---^--XXXXXXXXX", "XXXXXXXXXXXXXXX"], "1_8_0": ["--------XXXXXXX", "--------XXXXXXX", "--------XXXXXXX", "--------XXXXXXX", "---------------", "---#------&--XX", "-------------XX", "/\\\\-----XXXXXXX", "\\//-----XXXXXXX", "--------XXXXXXX", "*-------XXXXXXX"], "1_8_1": ["--------XXXXXXX", "--------XXXXXXX", "--------XXXXXXX", "--------XXXXXXX", "---------------", "---#------&--XX", "-------------XX", "/\\\\-----XXXXXXX", "\\//-----XXXXXXX", "--------XXXXXXX", "*-------XXXXXXX"], "1_8_2": ["XX------&------", "XX-------------", "XX---XXXXXXX---", "XX#--XXXXXXX---", "XX---XXXXXXX---", "XX---XXXXXXX---", "XX-----XXX-----", "XXXX---XXX-#-XX", "--XX---XXX---XX", "-------XXX-----", "-------XXX-----"], "3_10_0": ["------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "-----------#XXX", "---#----&---XXX", "-------------*-", "/\\\\---XXXXXXXXX", "\\//---XXXXXXXXX", "------XXXXXXXXX", "*-----XXXXXXXXX"], "3_10_1": ["------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "-----------#XXX", "---#----&---XXX", "-------------*-", "/\\\\---XXXXXXXXX", "\\//---XXXXXXXXX", "------XXXXXXXXX", "*-----XXXXXXXXX"], "3_10_2": ["^^^--XXXXXXXXXX", "-----XXXXXXXXXX", "-----XXXXXXXXXX", "-----XXXXXXXXXX", "-----XX---&----", "-----XX------#-", "---------------", "-----XXXXXXXXXX", "-----XXXXXXXXXX", "-----XXXXXXXXXX", "^^^--XXXXXXXXXX"], "3_11_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "------------#XX", "-------------XX", "------#--#----*", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "3_11_1": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "------------#XX", "-------------XX", "------#--#----*", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "3_9_0": ["------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "---------------", "---#----&------", "-----------#--#", "/\\\\---XXXXXXXXX", "\\//---XXXXXXXXX", "------XXXXXXXXX", "*-----XXXXXXXXX"], "3_9_1": ["------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "---------------", "---#----&------", "-----------#--#", "/\\\\---XXXXXXXXX", "\\//---XXXXXXXXX", "------XXXXXXXXX", "*-----XXXXXXXXX"], "3_9_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXX--^^", "X--XX--XX------", "X--XX--XX------", "X--XX--XX------", "---------------", "X--XX--XX------", "X--XX--XX------", "X*&XX*&XX------", "XXXXXXXXXXX--^^", "XXXXXXXXXXXXXXX"], "4_10_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXX-", "//--XXXXXXXXXX-", "----XXXXXXXXXX-", "------*---*----", "---------------", "-------#---#---", "----XXXXXXXXXX-", "&---XXXXXXXXXX-", "----XXXXXXXXXX*", "----XXXXXXXXXXX"], "4_10_1": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXX-", "//--XXXXXXXXXX-", "----XXXXXXXXXX-", "------*---*----", "---------------", "-------#---#---", "----XXXXXXXXXX-", "&---XXXXXXXXXX-", "----XXXXXXXXXX*", "----XXXXXXXXXXX"], "2_10_0": ["------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XX-----#X", "---#--XX--&---X", "---------------", "/\\\\---XXXXXXXXX", "\\//---XXXXXXXXX", "------XXXXXXXXX", "*-----XXXXXXXXX"], "2_10_1": ["------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XX-----#X", "---#--XX--&---X", "---------------", "/\\\\---XXXXXXXXX", "\\//---XXXXXXXXX", "------XXXXXXXXX", "*-----XXXXXXXXX"], "15_2_0": ["---^^^^^^^^^^^^", "----------^----", "-------X--^--X-", "------XX--^--XX", "-----XXX--^--XX", "#----X#*-----*#", "-----XXX--&--XX", "------XX-----XX", "-------X-----X-", "---------------", "---^^^^^^^^^^^^"], "15_2_1": ["---^^^^^^^^^^^^", "----------^----", "-------X--^--X-", "------XX--^--XX", "-----XXX--^--XX", "#----X#*-----*#", "-----XXX--&--XX", "------XX-----XX", "-------X-----X-", "---------------", "---^^^^^^^^^^^^"], "15_0_0": ["^^^^^^^^^^^^^^^", "&--------*----*", "---------------", "^^------^^^--^^", "^^^^--^^^^^^^^^", "---------&----&", "^^^^--^^^^^^^^^", "^^------^^^--^^", "---------------", "&--------*----*", "^^^^^^^^^^^^^^^"], "15_0_1": ["^^^^^^^^^^^^^^^", "&--------*----*", "---------------", "^^------^^^--^^", "^^^^--^^^^^^^^^", "---------&----&", "^^^^--^^^^^^^^^", "^^------^^^--^^", "---------------", "&--------*----*", "^^^^^^^^^^^^^^^"], "4_1_0": ["---------X--^-^", "---------X----^", "---------X-----", "---------X-----", "---------X-----", "---#-----X-----", "---------X-----", "/\\\\------X-----", "\\//------X-----", "------*--X----^", "*--------&--^-^"], "4_1_1": ["---------X--^-^", "---------X----^", "---------X-----", "---------X-----", "---------X-----", "---#-----X-----", "---------X-----", "/\\\\------X-----", "\\//------X-----", "------*--X----^", "*--------&--^-^"], "4_1_2": ["-^^^-----&---^^", "-^^^-----X---^^", "-^^^--&--X---^^", "-^^^-----X---^^", "-^^^-----X---^^", "-^^^-----X---^^", "-^^^-----X---^^", "-^^^-----X---^^", "--&------X-----", "---------X-----", "-^^^-----X---^^"], "4_0_0": ["------------^-^", "--------------^", "---------------", "---------------", "---------------", "---#-----&-----", "---------------", "/\\\\------------", "\\//------------", "------*-------^", "*-----------^-^"], "4_0_1": ["------------^-^", "--------------^", "---------------", "---------------", "---------------", "---#-----&-----", "---------------", "/\\\\------------", "\\//------------", "------*-------^", "*-----------^-^"], "4_0_2": ["-----------^^^-", "---^-------^^^-", "-----------^^^-", "---^-------^^^-", "-----------^^^-", "---^--------*--", "-----------^^^-", "---^-------^^^-", "-----------^^^-", "---^-------^^^-", "-----------^^^-"], "5_1_0": ["---------X----^", "---------X--^-*", "---------X----^", "---------X--^--", "---------X----^", "---#-----X--^-&", "---------X----^", "/\\\\------X--^--", "\\//------X----^", "------*--X--^-*", "*--------&----^"], "5_1_1": ["---------X----^", "---------X--^-*", "---------X----^", "---------X--^--", "---------X----^", "---#-----X--^-&", "---------X----^", "/\\\\------X--^--", "\\//------X----^", "------*--X--^-*", "*--------&----^"], "5_1_2": ["^^^-----#--^-^-", "--------X----^-", "--------X------", "--------X------", "--------X------", "--------X------", "-----&--X------", "--------X------", "--------X------", "--------X----^-", "^^^-----X--^-^-"], "3_1_0": ["---------------", "---------------", "------------#--", "---------------", "---------------", "---#-----&-----", "---------------", "/\\\\------------", "\\//------------", "------*------//", "*------------\\\\"], "3_1_1": ["---------------", "---------------", "------------#--", "---------------", "---------------", "---#-----&-----", "---------------", "/\\\\------------", "\\//------------", "------*------//", "*------------\\\\"], "3_1_2": ["^^^^------XX---", "^^^^------XX---", "^^^^------XX---", "^^-----&--XX---", "----------XX---", "--^^------XX---", "^^^^------XX---", "^^^^------XX---", "^^^^-----------", "^^^^-----------", "^^^^-----------"], "9_4_0": ["----^^^^^^^^^^^", "\\\\-------------", "//-------------", "------X--X----X", "------X--X^---X", "------XXXX^^--X", "------X--X^---X", "------X--X----X", "&--------//\\\\//", "---------\\\\//\\\\", "----^^^^^^^^^^^"], "9_4_1": ["----^^^^^^^^^^^", "\\\\-------------", "//-------------", "------X--X----X", "------X--X^---X", "------XXXX^^--X", "------X--X^---X", "------X--X----X", "&--------//\\\\//", "---------\\\\//\\\\", "----^^^^^^^^^^^"], "9_5_0": ["------^^^^^^^^^", "--------X--X--X", "X-------X--X--X", "XXX-----X--X--X", "-XX-----X--X--X", "-XX-----X--X-#X", "-XX-----X--X--X", "#XX-----X--X--X", "-XX-----X--X--X", "-XX------------", "-XX---^^^^^^^^^"], "9_5_1": ["------^^^^^^^^^", "--------X--X--X", "X-------X--X--X", "XXX-----X--X--X", "-XX-----X--X--X", "-XX-----X--X-#X", "-XX-----X--X--X", "#XX-----X--X--X", "-XX-----X--X--X", "-XX------------", "-XX---^^^^^^^^^"], "9_5_2": ["^^^^^^^^^^--XXX", "-------------XX", "---------------", "X----XXX-------", "X^---X*X-------", "X^^--X&--------", "X^---X*X-------", "X----XXX-------", "//\\\\//\\\\-------", "\\\\//\\\\//-----XX", "^^^^^^^^^^--XXX"], "9_3_0": ["------^^^^^^^^^", "--------X--X--X", "--------X--X--X", "--------X-----X", "--------X------", "---#----X------", "--------X------", "/\\\\-----X---//\\", "\\//-----X---\\\\/", "---------------", "*-----^^^^^^^^^"], "9_3_1": ["------^^^^^^^^^", "--------X--X--X", "--------X--X--X", "--------X-----X", "--------X------", "---#----X------", "--------X------", "/\\\\-----X---//\\", "\\//-----X---\\\\/", "---------------", "*-----^^^^^^^^^"], "9_3_2": ["^^^^^^^^^^^--XX", "---X----&----XX", "^-------X----XX", "^-------X----XX", "^-------X----XX", "^-------X----XX", "^-------X----XX", "^-------X----XX", "^-------X------", "--------X------", "^^^^^^^^^^^----"], "10_4_0": ["------^^^^^^^^^", "--------------&", "X----------X--X", "XXX-------XX--X", "-XX------XXX--X", "-XX------X#*--X", "-XX------XXX--X", "#XX-------XX--X", "-XX--------X--X", "-XX-----------X", "-XX---^^^^^^^^^"], "10_4_1": ["------^^^^^^^^^", "--------------&", "X----------X--X", "XXX-------XX--X", "-XX------XXX--X", "-XX------X#*--X", "-XX------XXX--X", "#XX-------XX--X", "-XX--------X--X", "-XX-----------X", "-XX---^^^^^^^^^"], "8_4_0": ["----#---^^^^^^^", "\\\\--XX-----X--X", "//--XX-----X--X", "----XX-----X--X", "----XX-----X--X", "-----------X-#X", "----XX-----X--X", "----XX-----X--X", "&---XX-----X--X", "----XX---------", "----#---^^^^^^^"], "8_4_1": ["----#---^^^^^^^", "\\\\--XX-----X--X", "//--XX-----X--X", "----XX-----X--X", "----XX-----X--X", "-----------X-#X", "----XX-----X--X", "----XX-----X--X", "&---XX-----X--X", "----XX---------", "----#---^^^^^^^"], "8_4_2": ["XXXXXXXXXXXXXXX", "---------------", "---------------", "----X----------", "----X^----^^^^^", "XXXXX^^--------", "*#*-X^----^^^^^", "-&--X----------", "---------------", "---------------", "XXXXXXXXXXXXXXX"], "4_5_0": ["------#---XXXXX", "------XX-------", "------XX-----X-", "------XX-----XX", "------XX-----XX", "---#--------&*#", "------XX-----XX", "/\\\\---XX-----XX", "\\//---XX-----X-", "------XX-------", "*-----#---XXXXX"], "4_5_1": ["------#---XXXXX", "------XX-------", "------XX-----X-", "------XX-----XX", "------XX-----XX", "---#--------&*#", "------XX-----XX", "/\\\\---XX-----XX", "\\//---XX-----X-", "------XX-------", "*-----#---XXXXX"], "4_5_2": ["XXXXXXXXXXXXXXX", "--X--------^^^-", "--X--------^^^-", "--X---XXX--^^^-", "--X---X*X------", "-#X---X&---^^^-", "--X---X*X------", "--X---XXX--^^^-", "--X--------^^^-", "-----------^^^-", "XXXXXXXXXXXXXXX"], "5_4_0": ["------XXX--^^^^", "------XXX----^-", "------XXX----^-", "------XXX----^-", "------XXX----^-", "---#--XXX------", "------XXX----&-", "/\\\\---XXX------", "\\//------------", "---------------", "*-----XXX--^^^^"], "5_4_1": ["------XXX--^^^^", "------XXX----^-", "------XXX----^-", "------XXX----^-", "------XXX----^-", "---#--XXX------", "------XXX----&-", "/\\\\---XXX------", "\\//------------", "---------------", "*-----XXX--^^^^"], "3_4_0": ["---------X--XXX", "---------X--XXX", "---------X--XXX", "---------X--XXX", "---------X-----", "---#-----X-----", "---------X----#", "/\\\\------X--XXX", "\\//------X--XXX", "------*--X--XXX", "*--------&--XXX"], "3_4_1": ["---------X--XXX", "---------X--XXX", "---------X--XXX", "---------X--XXX", "---------X-----", "---#-----X-----", "---------X----#", "/\\\\------X--XXX", "\\//------X--XXX", "------*--X--XXX", "*--------&--XXX"], "3_4_2": ["---------------", "----//\\\\--//\\\\-", "----\\\\//--\\\\//-", "---------------", "^--------------", "^^-------------", "^--------------", "------X&X---X&X", "------X-X---X-X", "------X#X---X#X", "------XXX---XXX"], "8_5_0": ["-----#---^^^^^^", "-----XX----^--X", "X----XX----^--X", "XXX--XX----^--X", "-XX--XX----^--X", "-XX-----------X", "-XX--XX----&--X", "#XX--XX-------X", "-XX--XX-------X", "-XX--XX-------#", "-XX--#---^^^^^^"], "8_5_1": ["-----#---^^^^^^", "-----XX----^--X", "X----XX----^--X", "XXX--XX----^--X", "-XX--XX----^--X", "-XX-----------X", "-XX--XX----&--X", "#XX--XX-------X", "-XX--XX-------X", "-XX--XX-------#", "-XX--#---^^^^^^"], "0_6_0": ["----#---X--X--X", "\\\\--XX--X--X--X", "//--XX--X--X--X", "----XX--X--X--X", "----XX--X--X--X", "--------X--X--X", "----XX--X--X--X", "----XX--X--X--X", "&---XX--X--X--X", "----XX--X--X--X", "----#---&--&--&"], "0_6_1": ["----#---X--X--X", "\\\\--XX--X--X--X", "//--XX--X--X--X", "----XX--X--X--X", "----XX--X--X--X", "--------X--X--X", "----XX--X--X--X", "----XX--X--X--X", "&---XX--X--X--X", "----XX--X--X--X", "----#---&--&--&"], "0_6_2": ["XXXXXXXXXXXXXXX", "---------------", "*X--XX---------", "XX------X---X--", "----XX--X---X--", "--------XXXXX--", "----XX--X---X--", "--------X---X--", "----XX---------", "---------------", "XXXXXXXXXXXXXXX"], "0_5_0": ["----#---X--X--X", "\\\\--XX--X--X--X", "//--XX--X--X--X", "----XX--X--X--X", "----XX--X--X--X", "--------X--X--X", "----XX--X--X--X", "----XX--X--X---", "&---XX--X--X---", "----XX--X--X--X", "----#---&--&--X"], "0_5_1": ["----#---X--X--X", "\\\\--XX--X--X--X", "//--XX--X--X--X", "----XX--X--X--X", "----XX--X--X--X", "--------X--X--X", "----XX--X--X--X", "----XX--X--X---", "&---XX--X--X---", "----XX--X--X--X", "----#---&--&--X"], "0_5_2": ["---------X-----", "/\\\\-X----X-//\\\\", "\\//-X----X-\\\\//", "----X----X-----", "&---X----------", "XXXXX----------", "&---X----------", "----X----X-----", "/\\\\-X----X-//\\\\", "\\//-X----X-\\\\//", "---------X-----"], "1_6_0": ["----------XXXXX", "----------XXXXX", "----------XXXXX", "----------XXXXX", "----------XXXXX", "---#--&---XXXXX", "----------XXX--", "/\\\\------------", "\\//----------XX", "----------XXXXX", "*---------XXXXX"], "1_6_1": ["----------XXXXX", "----------XXXXX", "----------XXXXX", "----------XXXXX", "----------XXXXX", "---#--&---XXXXX", "----------XXX--", "/\\\\------------", "\\//----------XX", "----------XXXXX", "*---------XXXXX"], "1_6_2": ["XXXXXXXXXXXXXXX", "-X-------X-----", "-X--X----X-----", "-X--X----X-----", "----X----X-----", "----X----------", "----X---------/", "-X--XX--------\\", "-X--XXX--------", "-X-&*#X--&-----", "XXXXXXXXXXXXXXX"], "3_2_0": ["------#--------", "------XX-----^-", "------XX-------", "------XX-----^-", "------XX-------", "---#------&--^-", "------XX-------", "/\\\\---XX-----^-", "\\//---XX-------", "------XX-----^-", "*-----#--------"], "3_2_1": ["------#--------", "------XX-----^-", "------XX-------", "------XX-----^-", "------XX-------", "---#------&--^-", "------XX-------", "/\\\\---XX-----^-", "\\//---XX-------", "------XX-----^-", "*-----#--------"], "3_0_0": ["---------------", "---------------", "-------------#-", "---------------", "---------------", "---#-----&-----", "---------------", "/\\\\------------", "\\//------------", "------*-------/", "*-------------\\"], "3_0_1": ["---------------", "---------------", "-------------#-", "---------------", "---------------", "---#-----&-----", "---------------", "/\\\\------------", "\\//------------", "------*-------/", "*-------------\\"], "3_0_2": ["---------------", "----------#----", "*---#----------", "---------------", "---------------", "---------------", "-------#-------", "---------------", "---------------", "-----//\\\\------", "-----\\\\//------"], "2_1_0": ["---------X-----", "---------X-----", "---------X-----", "---------X-----", "---------X-----", "---#-----X--&--", "---------X-----", "/\\\\------X-----", "\\//------X-----", "------*--X-----", "*--------&-----"], "2_1_1": ["---------X-----", "---------X-----", "---------X-----", "---------X-----", "---------X-----", "---#-----X--&--", "---------X-----", "/\\\\------X-----", "\\//------X-----", "------*--X-----", "*--------&-----"], "1_4_0": ["---------X---XX", "---------X---XX", "---------X---XX", "---------X---XX", "---------X---XX", "---#--&--X---XX", "---------X---XX", "/\\\\------X-----", "\\//------X-----", "---------X---XX", "*--------&---XX"], "1_4_1": ["---------X---XX", "---------X---XX", "---------X---XX", "---------X---XX", "---------X---XX", "---#--&--X---XX", "---------X---XX", "/\\\\------X-----", "\\//------X-----", "---------X---XX", "*--------&---XX"], "1_4_2": ["---XXX--X----^^", "---XXX--X----^^", "----&---X----^^", "--------X----^^", "X--XXX--X------", "X--XXX--X-&----", "X--XXX--X----^^", "---XXX--X----^^", "---XXX--X----^^", "---XXX--X----^^", "---XXX-------^^"], "1_5_0": ["---------X--XXX", "---------X--XXX", "---------X--XXX", "---------X--XXX", "---------X--XXX", "---#--&--X--XXX", "---------X--XXX", "/\\\\------X-----", "\\//------X-----", "---------X--XX-", "*--------&--XXX"], "1_5_1": ["---------X--XXX", "---------X--XXX", "---------X--XXX", "---------X--XXX", "---------X--XXX", "---#--&--X--XXX", "---------X--XXX", "/\\\\------X-----", "\\//------X-----", "---------X--XX-", "*--------&--XXX"], "1_3_0": ["---------X--X--", "---------X--X--", "---------X--X--", "---------X--X--", "---------X--X--", "---#--&--X--X--", "---------X--X--", "/\\\\------X--X--", "\\//------X--X--", "---------X--X--", "*--------&--&--"], "1_3_1": ["---------X--X--", "---------X--X--", "---------X--X--", "---------X--X--", "---------X--X--", "---#--&--X--X--", "---------X--X--", "/\\\\------X--X--", "\\//------X--X--", "---------X--X--", "*--------&--&--"], "1_3_2": ["---&-----------", "---X--X-----#--", "---X--X--------", "---X--X--------", "---X--X-----*--", "---X--XXXXXXXXX", "---X--X--&--*--", "---X--X--------", "---X--X--------", "---X--X-----#--", "---X-----------"], "2_4_0": ["------#---X---X", "------XX--X---X", "------XX--X---X", "------XX--X---X", "------XX--X---X", "---#------X---X", "------XX--X---X", "/\\\\---XX--X----", "\\//---XX--X----", "------XX--X---X", "*-----#---&---X"], "2_4_1": ["------#---X---X", "------XX--X---X", "------XX--X---X", "------XX--X---X", "------XX--X---X", "---#------X---X", "------XX--X---X", "/\\\\---XX--X----", "\\//---XX--X----", "------XX--X---X", "*-----#---&---X"], "2_4_2": ["XXXXXXXXXXXXXXX", "-------------X-", "*X-----------X-", "XX-----------X-", "-------------X-", "---------------", "---------------", "-----^----^----", "-----^----^----", "-----^----^--&-", "XXXXXXXXXXXXXXX"], "0_4_0": ["----#---X--X---", "\\\\--XX--X--X---", "//--XX--X--X---", "----XX--X--X---", "----XX--X--X---", "--------X--X--&", "----XX--X--X---", "----XX--X--X---", "&---XX--X--X---", "----XX--X--X---", "----#---&--&---"], "0_4_1": ["----#---X--X---", "\\\\--XX--X--X---", "//--XX--X--X---", "----XX--X--X---", "----XX--X--X---", "--------X--X--&", "----XX--X--X---", "----XX--X--X---", "&---XX--X--X---", "----XX--X--X---", "----#---&--&---"], "0_4_2": ["^--------XX----", "------X--XX----", "^-----X--XX----", "^--X--X--XX----", "^--X--X--------", "^--XXXX--------", "^--X--X--XX----", "^--X--X--XX----", "^-----X--XX----", "------X--XX----", "^--------XX----"], "7_1_0": ["-----------^^^^", "---------------", "---------------", "--------------X", "-------------XX", "---#---------X#", "-------------XX", "/\\\\-----------X", "\\//------------", "------*--------", "*----------^^^^"], "7_1_1": ["-----------^^^^", "---------------", "---------------", "--------------X", "-------------XX", "---#---------X#", "-------------XX", "/\\\\-----------X", "\\//------------", "------*--------", "*----------^^^^"], "7_1_2": ["XXXX--^^^^^-^-^", "--------^---^-^", "X-------^-----^", "X-------^------", "X-------^------", "*&-------------", "X-------&------", "X--------------", "X-------------^", "------------^-^", "XXXX--^^^^^-^-^"], "6_0_0": ["------------^--", "------------^--", "------------^--", "------------^^^", "---------------", "---#-----&-----", "---------------", "/\\\\------------", "\\//----------#-", "------*--------", "*--------------"], "6_0_1": ["------------^--", "------------^--", "------------^--", "------------^^^", "---------------", "---#-----&-----", "---------------", "/\\\\------------", "\\//----------#-", "------*--------", "*--------------"], "6_0_2": ["X--^^^----^^^--", "---^^^----^^^--", "X---&-----^^^--", "---^^^----^^^--", "X--^^^-----&---", "---^^^---------", "X--^^^----^^^--", "---^^^----^^^--", "X---*-----^^^--", "---^^^----^^^--", "X--^^^----^^^--"], "15_3_0": ["--^^^^^^^^^^^^^", "---------^-----", "------X--^----X", "-----XX--^---XX", "----XXX--^--XXX", "----X#*-----X#*", "----XXX--&--XXX", "-----XX------XX", "------X-------X", "---------------", "--^^^^^^^^^^^^^"], "15_3_1": ["--^^^^^^^^^^^^^", "---------^-----", "------X--^----X", "-----XX--^---XX", "----XXX--^--XXX", "----X#*-----X#*", "----XXX--&--XXX", "-----XX------XX", "------X-------X", "---------------", "--^^^^^^^^^^^^^"], "15_3_2": ["^^^^^^^^^^^^^^^", "------------^--", "----X-------^--", "XX--XX------^--", "*X--XXX--------", "&---*#X--------", "*X--XXX--------", "XX--XX---------", "\\\\--X----X-----", "//-------X-----", "^^^^^^^^^^^^^^^"], "16_2_0": ["^^^^^^^^^^^^^^^", "----X--X------*", "-X--X--X-------", "-X--X--X-----^^", "-X--X--X--^^^^^", "#X-#X-#X------&", "-X--X--X--^^^^^", "-X--X--X-----^^", "-X--X--X-------", "-X------------*", "^^^^^^^^^^^^^^^"], "16_2_1": ["^^^^^^^^^^^^^^^", "----X--X------*", "-X--X--X-------", "-X--X--X-----^^", "-X--X--X--^^^^^", "#X-#X-#X------&", "-X--X--X--^^^^^", "-X--X--X-----^^", "-X--X--X-------", "-X------------*", "^^^^^^^^^^^^^^^"], "5_2_0": ["------#----^^^-", "------XX---^^^-", "------XX---^^^-", "------XX---^^^-", "------XX---^^^-", "---#-------^^^-", "------XX---^^^-", "/\\\\---XX---^^^-", "\\//---XX----&--", "------XX-------", "*-----#----^^^-"], "5_2_1": ["------#----^^^-", "------XX---^^^-", "------XX---^^^-", "------XX---^^^-", "------XX---^^^-", "---#-------^^^-", "------XX---^^^-", "/\\\\---XX---^^^-", "\\//---XX----&--", "------XX-------", "*-----#----^^^-"], "13_0_0": ["---^^^^^^^^^^^^", "---------*----*", "---------------", "--------^^^--^^", "------^^^^^^^^^", "#--------&----&", "------^^^^^^^^^", "--------^^^--^^", "---------------", "---------*----*", "---^^^^^^^^^^^^"], "13_0_1": ["---^^^^^^^^^^^^", "---------*----*", "---------------", "--------^^^--^^", "------^^^^^^^^^", "#--------&----&", "------^^^^^^^^^", "--------^^^--^^", "---------------", "---------*----*", "---^^^^^^^^^^^^"], "13_0_2": ["^^^^^^^^^^^^^^^", "-^^^^^^^^^^^^^^", "-^^^^^^^^----^^", "-^^^^^^--------", "-^^^-----------", "--&------------", "-^^^-----------", "-^^^^^^--------", "-^^^^^^^^----^^", "-^^^^^^^^^^^^^^", "^^^^^^^^^^^^^^^"], "12_0_0": ["----^^^^^^^^^^^", "---------*----*", "---------------", "--------^^^--^^", "------^^^^^^^^^", "#--------&----&", "------^^^^^^^^^", "--------^^^--^^", "---------------", "---------*----*", "----^^^^^^^^^^^"], "12_0_1": ["----^^^^^^^^^^^", "---------*----*", "---------------", "--------^^^--^^", "------^^^^^^^^^", "#--------&----&", "------^^^^^^^^^", "--------^^^--^^", "---------------", "---------*----*", "----^^^^^^^^^^^"], "9_1_0": ["--------^^^^^^^", "----------^----", "----------^--X-", "----------^--XX", "----------^--XX", "---#---------*#", "----------&--XX", "/\\\\----------XX", "\\//----------X-", "---------------", "*-------^^^^^^^"], "9_1_1": ["--------^^^^^^^", "----------^----", "----------^--X-", "----------^--XX", "----------^--XX", "---#---------*#", "----------&--XX", "/\\\\----------XX", "\\//----------X-", "---------------", "*-------^^^^^^^"], "9_1_2": ["^^^^^^^^^^^----", "&----&---------", "---------------", "^^--^^^------XX", "^^^^^^^^^----XX", "-------------XX", "^^^^^^^^^----XX", "^^--^^^------XX", "-------------XX", "&----&-------XX", "^^^^^^^^^^^--XX"], "9_2_0": ["-------^^^^^^^^", "-----------X--X", "-----------X--X", "-----------X--X", "-----------X--X", "---#-------X-#X", "-----------X--X", "/\\\\--------X--X", "\\//--------X--X", "---------------", "*------^^^^^^^^"], "9_2_1": ["-------^^^^^^^^", "-----------X--X", "-----------X--X", "-----------X--X", "-----------X--X", "---#-------X-#X", "-----------X--X", "/\\\\--------X--X", "\\//--------X--X", "---------------", "*------^^^^^^^^"], "10_1_0": ["-------^^^^^^^^", "----------^----", "----------^--X-", "----------^--XX", "----------^--XX", "---#---------*#", "----------&--XX", "/\\\\----------XX", "\\//----------X-", "---------------", "*------^^^^^^^^"], "10_1_1": ["-------^^^^^^^^", "----------^----", "----------^--X-", "----------^--XX", "----------^--XX", "---#---------*#", "----------&--XX", "/\\\\----------XX", "\\//----------X-", "---------------", "*------^^^^^^^^"], "5_0_0": ["--------------^", "------------^-*", "--------------^", "------------^--", "--------------^", "---#-----&--^-&", "--------------^", "/\\\\---------^--", "\\//-----------^", "------*-----^-*", "*-------------^"], "5_0_1": ["--------------^", "------------^-*", "--------------^", "------------^--", "--------------^", "---#-----&--^-&", "--------------^", "/\\\\---------^--", "\\//-----------^", "------*-----^-*", "*-------------^"], "5_0_2": ["---^---^-------", "-^-*-^---^-----", "---^---^-------", "-^---^---^-----", "---^---^-------", "-^-&-^---^-----", "---^---^-------", "-^---^---^-----", "---^---^-------", "-^-*-^---^-----", "---^---^-------"], "6_4_0": ["------XXX--^^^^", "------XXX------", "------XXX------", "------XXX-----X", "------XXX----XX", "---#--XXX----X#", "------XXX----XX", "/\\\\---XXX-----X", "\\//------------", "---------------", "*-----XXX--^^^^"], "6_4_1": ["------XXX--^^^^", "------XXX------", "------XXX------", "------XXX-----X", "------XXX----XX", "---#--XXX----X#", "------XXX----XX", "/\\\\---XXX-----X", "\\//------------", "---------------", "*-----XXX--^^^^"], "6_2_0": ["------#---^^^--", "------XX--^^^--", "------XX--^^^--", "------XX--^^^--", "------XX---*---", "---#------^^^--", "------XX---&---", "/\\\\---XX--^^^--", "\\//---XX--^^^--", "------XX--^^^--", "*-----#---^^^--"], "6_2_1": ["------#---^^^--", "------XX--^^^--", "------XX--^^^--", "------XX--^^^--", "------XX---*---", "---#------^^^--", "------XX---&---", "/\\\\---XX--^^^--", "\\//---XX--^^^--", "------XX--^^^--", "*-----#---^^^--"], "2_6_0": ["------#---X--XX", "------XX--X--XX", "------XX--X--XX", "------XX--X--XX", "------XX--X--XX", "---#------X--XX", "------XX--X--XX", "/\\\\---XX--X----", "\\//---XX--X----", "------XX--X--XX", "*-----#---&--XX"], "2_6_1": ["------#---X--XX", "------XX--X--XX", "------XX--X--XX", "------XX--X--XX", "------XX--X--XX", "---#------X--XX", "------XX--X--XX", "/\\\\---XX--X----", "\\//---XX--X----", "------XX--X--XX", "*-----#---&--XX"], "2_6_2": ["XXXXXXXXXXXXXXX", "-X--#----------", "-X--X------X---", "----X------XX--", "----X------XXX-", "----X-----&*#X-", "----X------XXX-", "----X------XX--", "----X------X---", "----X----------", "XXXXXXXXXXXXXXX"], "2_7_0": ["------#---XXXXX", "------XX--XXXXX", "------XX--XXXXX", "------XX--XXXXX", "------XX-------", "---#--------&--", "------XX-------", "/\\\\---XX--XXXXX", "\\//---XX--XXXXX", "------XX--XXXXX", "*-----#---XXXXX"], "2_7_1": ["------#---XXXXX", "------XX--XXXXX", "------XX--XXXXX", "------XX--XXXXX", "------XX-------", "---#--------&--", "------XX-------", "/\\\\---XX--XXXXX", "\\//---XX--XXXXX", "------XX--XXXXX", "*-----#---XXXXX"], "2_7_2": ["-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "XX-------------", "XX-------------", "XX-------------", "XX-------------", "-----#---#----#", "---------------", "---------------"], "2_5_0": ["------#---X--X-", "------XX--X--X-", "------XX--X--X-", "------XX--X--X-", "------XX--X--X-", "---#------X--X-", "------XX--X--X-", "/\\\\---XX--X--X-", "\\//---XX--X--X-", "------XX--X--X-", "*-----#---&--&-"], "2_5_1": ["------#---X--X-", "------XX--X--X-", "------XX--X--X-", "------XX--X--X-", "------XX--X--X-", "---#------X--X-", "------XX--X--X-", "/\\\\---XX--X--X-", "\\//---XX--X--X-", "------XX--X--X-", "*-----#---&--&-"], "3_6_0": ["---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------------", "---#-------&---", "--------------#", "/\\\\------XXXXXX", "\\//------XXXXXX", "------*--XXXXXX", "*--------XXXXXX"], "3_6_1": ["---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------------", "---#-------&---", "--------------#", "/\\\\------XXXXXX", "\\//------XXXXXX", "------*--XXXXXX", "*--------XXXXXX"], "3_6_2": ["XXXXXXXXXXXXXXX", "---------------", "----X-------X--", "----XX------XX-", "----XXX-----XXX", "---&*#X----&*#X", "----XXX-----XXX", "----XX------XX-", "----X-------X--", "---------------", "XXXXXXXXXXXXXXX"], "1_7_0": ["---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---#--&--XXXXXX", "---------XXXXXX", "/\\\\----------XX", "\\//----------XX", "---------XX----", "*--------XXXXXX"], "1_7_1": ["---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---#--&--XXXXXX", "---------XXXXXX", "/\\\\----------XX", "\\//----------XX", "---------XX----", "*--------XXXXXX"], "1_7_2": ["XXXXXXX-----//\\", "XXXXXXX-----\\\\/", "XXXXXXX--------", "-XXXXXX-------#", "---------------", "--&------------", "---------------", "-XXXXXX--------", "XXXXXXX----#---", "XXXXXXX--------", "XXXXXXX--------"], "3_5_0": ["----------XXXXX", "----------XXXXX", "----------XXXXX", "----------XXXXX", "------------*--", "---#--&--------", "-------------#-", "/\\\\-------XXXXX", "\\//-------XXXXX", "----------XXXXX", "*---------XXXXX"], "3_5_1": ["----------XXXXX", "----------XXXXX", "----------XXXXX", "----------XXXXX", "------------*--", "---#--&--------", "-------------#-", "/\\\\-------XXXXX", "\\//-------XXXXX", "----------XXXXX", "*---------XXXXX"], "17_4_0": ["^^^^^^^^^^^^^^^", "----X--X--X--X-", "-X--X--X--X--X-", "-X--X--X--X--X-", "-X--X--X--X--X-", "#X-#X-#X-#X-#X-", "-X--X--X--X--X-", "-X--X--X--X--X-", "-X--X--X--X--X-", "-X-------------", "^^^^^^^^^^^^^^^"], "17_4_1": ["^^^^^^^^^^^^^^^", "----X--X--X--X-", "-X--X--X--X--X-", "-X--X--X--X--X-", "-X--X--X--X--X-", "#X-#X-#X-#X-#X-", "-X--X--X--X--X-", "-X--X--X--X--X-", "-X--X--X--X--X-", "-X-------------", "^^^^^^^^^^^^^^^"], "17_5_0": ["^^^^^^^^^^^^^^^", "--------------&", "----X------X--X", "XX--XX----XX--X", "*X--XXX--XXX--X", "&---*#X--X#*--X", "*X--XXX--XXX--X", "XX--XX----XX--X", "\\\\--X------X--X", "//------------X", "^^^^^^^^^^^^^^^"], "17_5_1": ["^^^^^^^^^^^^^^^", "--------------&", "----X------X--X", "XX--XX----XX--X", "*X--XXX--XXX--X", "&---*#X--X#*--X", "*X--XXX--XXX--X", "XX--XX----XX--X", "\\\\--X------X--X", "//------------X", "^^^^^^^^^^^^^^^"], "17_3_0": ["^^^^^^^^^^^^^^^", "----------^----", "-------X--^--X-", "--X---XX--^--XX", "*-X--XXX--^--XX", "XXX--X#*-----*#", "*-X--XXX--&--XX", "--X---XX-----XX", "-------X-----X-", "---------------", "^^^^^^^^^^^^^^^"], "17_3_1": ["^^^^^^^^^^^^^^^", "----------^----", "-------X--^--X-", "--X---XX--^--XX", "*-X--XXX--^--XX", "XXX--X#*-----*#", "*-X--XXX--&--XX", "--X---XX-----XX", "-------X-----X-", "---------------", "^^^^^^^^^^^^^^^"], "16_4_0": ["^^^^^^^^^^^^^^^", "-----X--X--X--X", "-----X--X--X--X", "--X--X--X--X--X", "*-X--X--X--X--X", "XXX--X-#X-#X-#X", "*-X--X--X--X--X", "--X--X--X--X--X", "-----X--X--X--X", "---------------", "^^^^^^^^^^^^^^^"], "16_4_1": ["^^^^^^^^^^^^^^^", "-----X--X--X--X", "-----X--X--X--X", "--X--X--X--X--X", "*-X--X--X--X--X", "XXX--X-#X-#X-#X", "*-X--X--X--X--X", "--X--X--X--X--X", "-----X--X--X--X", "---------------", "^^^^^^^^^^^^^^^"], "6_1_0": ["------------^^^", "--------------X", "--------------X", "--------------X", "--------------X", "---#-----&----X", "--------------X", "/\\\\-----------X", "\\//-----------X", "------*-------#", "*-----------^^^"], "6_1_1": ["------------^^^", "--------------X", "--------------X", "--------------X", "--------------X", "---#-----&----X", "--------------X", "/\\\\-----------X", "\\//-----------X", "------*-------#", "*-----------^^^"], "6_1_2": ["X--^^----^---^-", "X------^-*-^---", "---------^---^-", "-------^---^---", "X--------^---^-", "X------^-&-^---", "X--------^---^-", "X------^---^---", "X--------^---^-", "X------^-*-^---", "X--^^----^---^-"], "5_5_0": ["------^^^--XXXX", "------^^^--XXXX", "------^^^--XXXX", "------^^^--XXXX", "-------*---XXXX", "---#--^^^--XXXX", "-------&-----XX", "/\\\\---^^^------", "\\//---^^^--XX--", "------^^^--XXXX", "*-----^^^--XXXX"], "5_5_1": ["------^^^--XXXX", "------^^^--XXXX", "------^^^--XXXX", "------^^^--XXXX", "-------*---XXXX", "---#--^^^--XXXX", "-------&-----XX", "/\\\\---^^^------", "\\//---^^^--XX--", "------^^^--XXXX", "*-----^^^--XXXX"], "5_5_2": ["---------------", "---------------", "-----------^---", "---XX------^---", "---XX------^---", "---XX------^---", "#--XX--#-#-#-#-", "---XX----------", "---XX----------", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_6_0": ["----XXXXX--^^^^", "\\\\--XXXXX----X-", "//--XXXXX----X-", "----XXXXX----X-", "-------------X-", "-------------X-", "------#------X-", "----XXXXX----X-", "&---XXXXX----X-", "----XXXXX----#-", "----XXXXX--^^^^"], "5_6_1": ["----XXXXX--^^^^", "\\\\--XXXXX----X-", "//--XXXXX----X-", "----XXXXX----X-", "-------------X-", "-------------X-", "------#------X-", "----XXXXX----X-", "&---XXXXX----X-", "----XXXXX----#-", "----XXXXX--^^^^"], "5_6_2": ["XXXXXX^^^--^^^-", "XXXXXX^^^--^^^-", "XXXXXX^^^--^^^-", "XXXXXX^^^--^^^-", "XXXXXX^^^--^^^-", "XXXXXX^^^--^^^-", "----XX^^^--^^^-", "------^^^--^^^-", "XXXX--------&--", "XXXXXX---------", "XXXXXX^^^--^^^-"], "6_5_0": ["-----XXXX--^^^^", "\\\\---XXXX------", "//---XXXX----X-", "-----XXXX----XX", "-------------XX", "-------------*#", "-------*-----XX", "-----XXXX----XX", "&----XXXX----X-", "-----XXXX------", "-----XXXX--^^^^"], "6_5_1": ["-----XXXX--^^^^", "\\\\---XXXX------", "//---XXXX----X-", "-----XXXX----XX", "-------------XX", "-------------*#", "-------*-----XX", "-----XXXX----XX", "&----XXXX----X-", "-----XXXX------", "-----XXXX--^^^^"], "6_5_2": ["X^^XXXX^^------", "X^^XXXX^^---^^^", "X^^XXXX^^---^^^", "X^^XXXX^^---^^^", "X^^XXXX^^---^^^", "X^^----^^---^^^", "X-----------^^^", "---XXXX-----^^^", "-^^XXXX^^---^^^", "X^^XXXX^^---^^^", "X^^XXXX^^------"], "1_13_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXX--#XXXX", "----XXXX---XXXX", "------------*--", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "1_13_1": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXX--#XXXX", "----XXXX---XXXX", "------------*--", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "1_13_2": ["XXXXXXXXXXXX---", "XXXXXXXXXXXX---", "XXXXXXXXXXXX---", "XXXXXXXXXXXX---", "---------------", "XXXXXXX--------", "XXXXXXX--#-----", "XXXXXXXXXXXX---", "XXXXXXXXXXXX---", "XXXXXXXXXXXX---", "XXXXXXXXXXXX*--"], "1_14_0": ["--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "---------#XXXX-", "----XXX---XXXX-", "----XXX----*---", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX"], "1_14_1": ["--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "---------#XXXX-", "----XXX---XXXX-", "----XXX----*---", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX"], "1_12_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "---------#XXXX-", "------&---XXXX-", "-----------*---", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "1_12_1": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "---------#XXXX-", "------&---XXXX-", "-----------*---", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "1_12_2": ["XXXXXXXXXXXXXXX", "XX*&XXXXXXXXXXX", "XX--XXXXXXXXXX-", "XX--XXXXXXXXX--", "---------------", "-----------#---", "---------------", "XX--XXXXXXXXX--", "XX--XXXXXXXXXX-", "XX--XXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_13_0": ["-----XXXXXXXXXX", "-----XXXXXXXXXX", "X----XXXXXXXXXX", "XXX--XXXXXXXXXX", "-XX----#XXXXX--", "-XX-----XXXXX--", "-XX------*-----", "#XX--XXXXXXXXXX", "-XX--XXXXXXXXXX", "-XX--XXXXXXXXXX", "-XX--XXXXXXXXXX"], "2_13_1": ["-----XXXXXXXXXX", "-----XXXXXXXXXX", "X----XXXXXXXXXX", "XXX--XXXXXXXXXX", "-XX----#XXXXX--", "-XX-----XXXXX--", "-XX------*-----", "#XX--XXXXXXXXXX", "-XX--XXXXXXXXXX", "-XX--XXXXXXXXXX", "-XX--XXXXXXXXXX"], "2_13_2": ["XXXXXX--XXXXXXX", "XXXXXX--XXXXXXX", "XXXXXX--XXXXXXX", "XXXXXX--XXXXXXX", "XXXX---------#X", "XXXX----------X", "-*--------*----", "XXXXXX--XXXXXXX", "XXXXXX--XXXXXXX", "XXXXXX--XXXXXXX", "XXXXXX--XXXXXXX"], "0_13_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "---------------", "-------XXXXXXXX", "-------XXXXXXXX", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "0_13_1": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "---------------", "-------XXXXXXXX", "-------XXXXXXXX", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "0_13_2": ["XXXXXXX---XXXXX", "XXXXXXX---XXXXX", "XXXXXXX---XXXXX", "XXXXXXX---XXXXX", "XXXXX-----XXXXX", "XXXXX-----XX---", "-*-------------", "XXXXXXX-----XXX", "XXXXXXX---XXXXX", "XXXXXXX---XXXXX", "XXXXXXX---XXXXX"], "8_6_0": ["-----#---^^^^^^", "-----XX----X--X", "X----XX----X--X", "XXX--XX----X--X", "-XX--XX----X--X", "-XX--------X-#X", "-XX--XX----X--X", "#XX--XX----X--X", "-XX--XX----X--X", "-XX--XX--------", "-XX--#---^^^^^^"], "8_6_1": ["-----#---^^^^^^", "-----XX----X--X", "X----XX----X--X", "XXX--XX----X--X", "-XX--XX----X--X", "-XX--------X-#X", "-XX--XX----X--X", "#XX--XX----X--X", "-XX--XX----X--X", "-XX--XX--------", "-XX--#---^^^^^^"], "7_5_0": ["----XXX--^^^^^^", "\\\\--XXX--------", "//--XXX-------X", "----XXX------XX", "----XXX-----XXX", "----XXX-----X#*", "----XXX-----XXX", "----XXX------XX", "&-------------X", "---------------", "----XXX--^^^^^^"], "7_5_1": ["----XXX--^^^^^^", "\\\\--XXX--------", "//--XXX------X-", "----XXX-----XX-", "----XXX----XXX-", "----XXX----X#*-", "----XXX----XXX-", "----XXX-----XX-", "&------------X-", "---------------", "----XXX--^^^^^^"], "6_6_0": ["----XXXXX--^^^^", "\\\\--XXXXX------", "//--XXXXX----X-", "----XXXXX----XX", "-------------XX", "-------------*#", "------#------XX", "----XXXXX----XX", "&---XXXXX----X-", "----XXXXX------", "----XXXXX--^^^^"], "6_6_1": ["----XXXXX--^^^^", "\\\\--XXXXX------", "//--XXXXX----X-", "----XXXXX----XX", "-------------XX", "-------------*#", "------#------XX", "----XXXXX----XX", "&---XXXXX----X-", "----XXXXX------", "----XXXXX--^^^^"], "6_6_2": ["XXXXXX--^^--^--", "XXXXXX--^^--^--", "XXXXXX--^^--^--", "XXXXXX--^^--^^^", "XXXX-----------", "XXXX----^^-----", "-*-------------", "XXXXXX--^^-----", "XXXXXX--^^---#-", "XXXXXX--^^-----", "XXXXXX--^^-----"], "2_3_0": ["------#---X----", "------XX--X----", "------XX--X----", "------XX--X----", "------XX--X----", "---#------X--&-", "------XX--X----", "/\\\\---XX--X----", "\\//---XX--X----", "------XX--X----", "*-----#---&----"], "2_3_1": ["------#---X----", "------XX--X----", "------XX--X----", "------XX--X----", "------XX--X----", "---#------X--&-", "------XX--X----", "/\\\\---XX--X----", "\\//---XX--X----", "------XX--X----", "*-----#---&----"], "2_3_2": ["XXXXXXXXXXXXXXX", "--^------^-----", "--^------^-----", "---------^----#", "---------------", "-----&---------", "---------------", "--------------#", "---------------", "---------------", "XXXXXXXXXXXXXXX"], "2_2_0": ["------#--------", "------XX-------", "------XX-------", "------XX-------", "------XX-------", "---#------&--&-", "------XX-------", "/\\\\---XX-------", "\\//---XX-------", "------XX-------", "*-----#--------"], "2_2_1": ["------#--------", "------XX-------", "------XX-------", "------XX-------", "------XX-------", "---#------&--&-", "------XX-------", "/\\\\---XX-------", "\\//---XX-------", "------XX-------", "*-----#--------"], "2_2_2": ["^--^-----------", "^--------------", "^-----#--------", "^--------X---X-", "---------X-&-X-", "^--------XXXXX-", "---------X---X-", "^--------X---X-", "^--------------", "^------//\\\\----", "^--^---\\\\//----"], "0_10_0": ["----#---XXXXXXX", "\\\\--XX--XXXXXXX", "//--XX--XXXXXXX", "----XX--XXXXXXX", "----XX--XXXXXXX", "--------XXXXXXX", "----XX--XXXXXXX", "----XX------XXX", "&---XX------XXX", "----XX--XX-----", "----#---XXXXXXX"], "0_10_1": ["----#---XXXXXXX", "\\\\--XX--XXXXXXX", "//--XX--XXXXXXX", "----XX--XXXXXXX", "----XX--XXXXXXX", "--------XXXXXXX", "----XX--XXXXXXX", "----XX------XXX", "&---XX------XXX", "----XX--XX-----", "----#---XXXXXXX"], "0_10_2": ["----&----&-----", "---------------", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX--", "X--XXX--XXX----", "X--XXX--XXX---X", "X--XXX--XXX---X", "X--XXX--XXX----", "X--XXX--XXX----"], "0_11_0": ["-----XXXXXXXXXX", "\\\\---XXXXXXXXXX", "//---XXXXXXXXXX", "-----XXXXXXXXXX", "---------------", "----------XXXXX", "-------#--XXXXX", "-----XXXXXXXXXX", "&----XXXXXXXXXX", "-----XXXXXXXXXX", "-----XXXXXXXXXX"], "0_11_1": ["-----XXXXXXXXXX", "\\\\---XXXXXXXXXX", "//---XXXXXXXXXX", "-----XXXXXXXXXX", "---------------", "-----------XXXX", "-------*---XXXX", "-----XXXXXXXXXX", "&----XXXXXXXXXX", "-----XXXXXXXXXX", "-----XXXXXXXXXX"], "0_11_2": ["XXXXXXXX--XXXXX", "XXXXXXX---XXXXX", "X--XX-----XXXXX", "X--XX-----XXXXX", "X--XX-----XXXXX", "----------XXXXX", "X--XX-----XXX--", "X--XX----------", "X*&XX--------XX", "XXXXXXX---XXXXX", "XXXXXXXX--XXXXX"], "1_10_0": ["------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "---------------", "---#----&--XXXX", "-----------XXXX", "/\\\\---XXXXXXXXX", "\\//---XXXXXXXXX", "------XXXXXXXXX", "*-----XXXXXXXXX"], "1_10_1": ["------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "---------------", "---#----&--XXXX", "-----------XXXX", "/\\\\---XXXXXXXXX", "\\//---XXXXXXXXX", "------XXXXXXXXX", "*-----XXXXXXXXX"], "1_10_2": ["----&----#-----", "---------------", "XXXXXXXXX*XXX--", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX--", "X--XXX--XXX----", "X--XXX--XXX---X", "X--XXX--XXX---X", "X--XXX--XXX----", "X--XXX--XXX----"], "3_14_0": ["--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "----#XXXX--#XXX", "-----XXXX---XXX", "------*------*-", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX"], "3_14_1": ["--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "----#XXXX--#XXX", "-----XXXX---XXX", "------*------*-", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX"], "3_15_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "------#XXXX--#X", "---&---XXXX---X", "--------*------", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "3_15_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "------#XXXX--#X", "---&---XXXX---X", "--------*------", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "3_15_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "------*---*----", "XXX------------", "XXX----#---#---", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "3_13_0": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----#XXXXX--#X", "#-----XXXXX---X", "-------*-------", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "3_13_1": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XX-----#XXXX", "#--XX------XXXX", "-------*----*--", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "4_14_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "------------#XX", "---&---------XX", "------#--#----*", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "4_14_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "------------#XX", "---&---------XX", "------#--#----*", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_14_0": ["--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XX-----#XXXX-", "--XX------XXXX-", "------*----*---", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX"], "2_14_1": ["--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XX-----#XXXX-", "--XX------XXXX-", "------*----*---", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX"], "2_14_2": ["--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XX-----#XXXX-", "--XX------XXXX-", "------*----*---", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX"], "3_7_0": ["---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "-----------#XXX", "---#--&-----XXX", "-------------*-", "/\\\\------XXXXXX", "\\//------XXXXXX", "---------XXXXXX", "*--------XXXXXX"], "3_7_1": ["---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "-----------#XXX", "---#--&-----XXX", "-------------*-", "/\\\\------XXXXXX", "\\//------XXXXXX", "---------XXXXXX", "*--------XXXXXX"], "4_6_0": ["--------X--XXXX", "-----------XXXX", "--------X--XXXX", "-------XX--XXXX", "------XXX----*-", "---#--X#&------", "------XXX-----#", "/\\\\----XX--XXXX", "\\//-----X--XXXX", "-----------XXXX", "*-------X--XXXX"], "4_6_1": ["--------X--XXXX", "-----------XXXX", "--------X--XXXX", "-------XX--XXXX", "------XXX----*-", "---#--X#&------", "------XXX-----#", "/\\\\----XX--XXXX", "\\//-----X--XXXX", "-----------XXXX", "*-------X--XXXX"], "7_7_0": ["--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "---*-----*---*-", "--^^^----------", "---&------#---#", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX"], "7_7_1": ["--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "---*-----*---*-", "--^^^----------", "---&------#---#", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX"], "7_7_2": ["XXXXXXXXXXXXXXX", "XXXX--^^^^^^^^-", "XX------^^^----", "XX-------------", "XX--------//\\\\-", "----------\\\\//-", "XX-------------", "XX-------------", "XX------^^^----", "XXXX--^^^^^^^^-", "XXXXXXXXXXXXXXX"], "7_8_0": ["-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "--*-----*---*--", "-^^^-----------", "--&------#---#-", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX"], "7_8_1": ["-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "--*-----*---*--", "-^^^-----------", "--&------#---#-", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX"], "7_6_0": ["-----XX--^^^^^^", "-----XX----X--X", "X----XX----X--X", "XXX--XX----X--X", "-XX--------X--X", "-XX--------X-#X", "-XX--------X--X", "#XX--XX----X--X", "-XX--XX----X--X", "-XX--XX--------", "-XX--XX--^^^^^^"], "7_6_1": ["-----XX--^^^^^^", "-----XX----X--X", "X----XX----X--X", "XXX--XX----X--X", "-XX--------X--X", "-XX--------X-#X", "-XX--------X--X", "#XX--XX----X--X", "-XX--XX----X--X", "-XX--XX--------", "-XX--XX--^^^^^^"], "7_6_2": ["XXXXXX--^^^^^^^", "XXXXXX-------*-", "XXXXXX---------", "XXXXXX------^^^", "----------^^^^^", "XXXX---------&-", "XXXX------^^^^^", "XXXXXX------^^^", "XXXXXX---------", "XXXXXX-------*-", "XXXXXX--^^^^^^^"], "8_7_0": ["XXXXXX--^^^^^^^", "-XXXXX-----X--X", "-XXXXX-----X--X", "-XXXXX-----X--X", "-----------X--X", "---&-------X-#X", "-----------X--X", "-XXXXX-----X--X", "-XXXXX-----X--X", "#XXXXX---------", "XXXXXX--^^^^^^^"], "8_7_1": ["XXXXXX--^^^^^^^", "-XXXXX-----X--X", "-XXXXX-----X--X", "-XXXXX-----X--X", "-----------X--X", "---&-------X-#X", "-----------X--X", "-XXXXX-----X--X", "-XXXXX-----X--X", "#XXXXX---------", "XXXXXX--^^^^^^^"], "6_7_0": ["-----^^^--XXXXX", "-----^^^--XXXXX", "X----^^^--XXXXX", "XXX--^^^--XXXXX", "-XX---*-----#XX", "-XX--^^^-----XX", "-XX---&-------*", "#XX--^^^--XXXXX", "-XX--^^^--XXXXX", "-XX--^^^--XXXXX", "-XX--^^^--XXXXX"], "6_7_1": ["-----^^^--XXXXX", "-----^^^--XXXXX", "X----^^^--XXXXX", "XXX--^^^--XXXXX", "-XX---*-----#XX", "-XX--^^^-----XX", "-XX---&-------*", "#XX--^^^--XXXXX", "-XX--^^^--XXXXX", "-XX--^^^--XXXXX", "-XX--^^^--XXXXX"], "6_7_2": ["XXXXXX--^^^^^^^", "XXXXXX----&----", "XXXXXX----X----", "XXXXXX----X----", "----------X----", "XXXX------X----", "XXXX------X----", "XXXXXX----X----", "XXXXXX----X----", "XXXXXX----X----", "XXXXXX--^^^^^^^"], "10_2_0": ["-------^^^^^^^^", "---------^-----", "---------^----X", "---------^---XX", "---------^--XXX", "---#--------X#*", "---------&--XXX", "/\\\\----------XX", "\\//-----------X", "---------------", "*------^^^^^^^^"], "10_2_1": ["-------^^^^^^^^", "---------^-----", "---------^----X", "---------^---XX", "---------^--XXX", "---#--------X#*", "---------&--XXX", "/\\\\----------XX", "\\//-----------X", "---------------", "*------^^^^^^^^"], "10_0_0": ["------^^^^^^^^^", "--------^-----*", "--------^------", "--------^----^^", "--------^--^^^^", "---#----------&", "--------&--^^^^", "/\\\\----------^^", "\\//------------", "--------------*", "*-----^^^^^^^^^"], "10_0_1": ["------^^^^^^^^^", "--------^-----*", "--------^------", "--------^----^^", "--------^--^^^^", "---#----------&", "--------&--^^^^", "/\\\\----------^^", "\\//------------", "--------------*", "*-----^^^^^^^^^"], "11_1_0": ["------^^^^^^^^^", "----------^----", "----------^--X-", "----------^--XX", "----------^--XX", "---#---------*#", "----------&--XX", "/\\\\----------XX", "\\//----------X-", "---------------", "*-----^^^^^^^^^"], "11_1_1": ["------^^^^^^^^^", "----------^----", "----------^--X-", "----------^--XX", "----------^--XX", "---#---------*#", "----------&--XX", "/\\\\----------XX", "\\//----------X-", "---------------", "*-----^^^^^^^^^"], "11_1_2": ["^^^^^^^----^---", "---------^-*-^-", "----X------^---", "---XX----^---^-", "--XXX------^---", "--X#*----^-&-^-", "--XXX------^---", "---XX----^---^-", "----X------^---", "---------^-*-^-", "^^^^^^^----^---"], "1_9_0": ["XX--XXX--------", "XX--XXX--------", "XX--XXX---XX---", "XX--XXX---XXXX-", "XX--XXX-----XX-", "XXXXXXXXX---XX-", "XXXXXXXXX---XX-", "XXXXXXXXX---XX-", "*XXXXXXXX---XX-", "------------XX-", "#----&------XX-"], "1_9_1": ["XX--XXX--------", "XX--XXX--------", "XX--XXX---XX---", "XX--XXX---XXXX-", "XX--XXX-----XX-", "XXXXXXXXX---XX-", "XXXXXXXXX---XX-", "XXXXXXXXX---XX-", "*XXXXXXXX---XX-", "------------XX-", "#----&------XX-"], "1_9_2": ["--XX------&----", "--XX-----------", "--XX---XXXXXXXX", "-#XX#--XXXXXXXX", "--XX---XXXXXXXX", "--XX---XXXXXXXX", "--XX-----XXX--X", "XXXXXX---XXX--X", "XX--XX---XXX--X", "---------XXX--X", "---------XXX--X"], "2_8_0": ["XX--XXX--------", "XX--XXX--------", "XX--XXX---XX---", "XX--XXX---XX-#-", "XX--XXX--------", "XXXXXXXXX----XX", "XXXXXXXXX----XX", "XXXXXXXXX----XX", "*XXXXXXXX----XX", "---------------", "#----&---------"], "2_8_1": ["------XXXXXXXXX", "------XX*&XXXXX", "------XX--XXXXX", "------XX--XXXXX", "---------------", "---#-----------", "---------------", "/\\\\---XX--XXXXX", "\\//---XX--XXXXX", "------XX--XXXXX", "*-----XXXXXXXXX"], "0_3_0": ["----#---X------", "\\\\--XX--X------", "//--XX--X------", "----XX--X------", "----XX--X------", "--------X--&--&", "----XX--X------", "----XX--X------", "&---XX--X------", "----XX--X------", "----#---&------"], "0_3_1": ["----#---X------", "\\\\--XX--X------", "//--XX--X------", "----XX--X------", "----XX--X------", "--------X--&--&", "----XX--X------", "----XX--X------", "&---XX--X------", "----XX--X------", "----#---&------"], "0_3_2": ["X------------XX", "X---^--&-----XX", "-------------XX", "----^--------XX", "X------------XX", "X---^----------", "X-------------&", "X---^-----&--XX", "X------------XX", "X---^--------XX", "X------------XX"], "3_8_0": ["XX--------XXX--", "XX--------XXX--", "XX---XX---XXX--", "XX-#-XX-#-XXX--", "XX--------XXX--", "XXXX----XXXXXXX", "XXXX----XXXXXXX", "XXXX----XXXXXXX", "*XXX----XXXXXXX", "---------------", "#----------&---"], "3_8_1": ["XX--------XXX--", "XX--------XXX--", "XX---XX---XXX--", "XX-#-XX-#-XXX--", "XX--------XXX--", "XXXX----XXXXXXX", "XXXX----XXXXXXX", "XXXX----XXXXXXX", "*XXX----XXXXXXX", "---------------", "#----------&---"], "4_9_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXX--", "//--XXXXXXXXX--", "----XXXXXXXXX--", "------*--------", "---------------", "-------#--#----", "----XXXXXXXXX--", "&---XXXXXXXXX--", "----XXXXXXXXX*#", "----XXXXXXXXXXX"], "4_9_1": ["-------XXXXXXXX", "-------XXXXXXXX", "X------XXXXXXXX", "XXX----XXXXXXXX", "-XX------*---*-", "-XX------------", "-XX-------#---#", "#XX----XXXXXXXX", "-XX----XXXXXXXX", "-XX----XXXXXXXX", "-XX----XXXXXXXX"], "4_9_2": ["XXXX^^^^^XXXXX-", "XXXX^^^^^XXXXX-", "----^^^^^XXXXX-", "---------XXXXX-", "XXXX-------XXX-", "XXXX^^^^^------", "XXXX^^^^^XX----", "XXXX^^^^^XXXXX-", "XXXX^^^^^XXXXX-", "XXXX^^^^^XXXXX-", "XXXX^^^^^XXXXX-"], "2_9_0": ["XX--XXX--------", "XX--XXX--------", "XX--XXX---XX---", "XX--XXX-#-XXXX-", "XX--XXX-----XX-", "XXXXXXXXX---XX-", "XXXXXXXXX---XX-", "XXXXXXXXX---XX-", "*XXXXXXXX---XX-", "------------XX-", "#----&------XX-"], "2_9_1": ["XX--XXX--------", "XX--XXX--------", "XX--XXX---XX---", "XX--XXX-#-XXXX-", "XX--XXX-----XX-", "XXXXXXXXX---XX-", "XXXXXXXXX---XX-", "XXXXXXXXX---XX-", "*XXXXXXXX---XX-", "------------XX-", "#----&------XX-"], "8_2_0": ["---------^^^^^^", "-----------X--X", "-----------X--X", "--------------X", "---------------", "---#-----------", "---------------", "/\\\\---------//\\", "\\//---------\\\\/", "------*--------", "*--------^^^^^^"], "8_2_1": ["---------^^^^^^", "-----------X--X", "-----------X--X", "--------------X", "---------------", "---#-----------", "---------------", "/\\\\---------//\\", "\\//---------\\\\/", "------*--------", "*--------^^^^^^"], "8_2_2": ["^XX^^^^^^--^^^-", "^--^^^^^^--^^^-", "-----------^^^-", "-XX--------^^^-", "^XX^^^^^^---&--", "^XX^^^^^^------", "^XX^^^^^^--^^^-", "^XX^^^^^^--^^^-", "^XX^^^^^^--^^^-", "^XX^^^^^^--^^^-", "^XX^^^^^^--^^^-"], "0_2_0": ["----#----------", "\\\\--XX---------", "//--XX---------", "----XX---------", "----XX---------", "--------&--&--&", "----XX---------", "----XX---------", "&---XX---------", "----XX---------", "----#----------"], "0_2_1": ["----#----------", "\\\\--XX---------", "//--XX---------", "----XX---------", "----XX---------", "--------&--&--&", "----XX---------", "----XX---------", "&---XX---------", "----XX---------", "----#----------"], "0_2_2": ["^-----------XXX", "------//\\\\---XX", "------\\\\//----X", "---------------", "---------------", "----&----------", "---------------", "---------------", "--------&-----X", "-------------XX", "^-----------XXX"], "1_2_0": ["------------XX-", "------------XX-", "------------XX-", "------------XX-", "------------XX-", "---#--&--&--XX-", "------------XX-", "/\\\\---------XXX", "\\//-----------X", "---------------", "*--------------"], "1_2_1": ["------------XX-", "------------XX-", "------------XX-", "------------XX-", "------------XX-", "---#--&--&--XX-", "------------XX-", "/\\\\---------XXX", "\\//-----------X", "---------------", "*--------------"], "14_3_0": ["---^^^^^^^^^^^^", "-----------X--X", "--------X--X--X", "-------XX--X--X", "------XXX--X--X", "#-----X#*--X-#X", "------XXX--X--X", "-------XX--X--X", "--------X--X--X", "---------------", "---^^^^^^^^^^^^"], "14_3_1": ["---^^^^^^^^^^^^", "-----------X--X", "--------X--X--X", "-------XX--X--X", "------XXX--X--X", "#-----X#*--X-#X", "------XXX--X--X", "-------XX--X--X", "--------X--X--X", "---------------", "---^^^^^^^^^^^^"], "14_3_2": ["^^^^^^^^^^^^^^^", "---------------", "---------------", "X----XXX-------", "X^---X*X---^^^^", "X^^--X&--------", "X^---X*X---^^^^", "X----XXX-------", "//\\\\//\\\\-------", "\\\\//\\\\//-------", "^^^^^^^^^^^^^^^"], "13_2_0": ["----^^^^^^^^^^^", "------^--------", "------^----X--X", "------^---XX--X", "------^--XXX--X", "#--------X#*--*", "------&--XXX--X", "----------XX--X", "-----------X--X", "---------------", "----^^^^^^^^^^^"], "13_2_1": ["----^^^^^^^^^^^", "------^--------", "------^----X--X", "------^---XX--X", "------^--XXX--X", "#--------X#*--*", "------&--XXX--X", "----------XX--X", "-----------X--X", "---------------", "----^^^^^^^^^^^"], "4_8_0": ["XX--------XXX--", "XX--------XXX--", "XX---XX---XXX--", "XX-#-XX-#-XXX-#", "XX--------XXX--", "XXXX----XXXXXXX", "XXXX----XXXXXXX", "XXXX----XXXXXXX", "*XXX----XXXXXXX", "---------------", "#----------&---"], "4_8_1": ["XX--------XXX--", "XX--------XXX--", "XX---XX---XXX--", "XX-#-XX-#-XXX-#", "XX--------XXX--", "XXXX----XXXXXXX", "XXXX----XXXXXXX", "XXXX----XXXXXXX", "*XXX----XXXXXXX", "---------------", "#----------&---"], "4_8_2": ["XXXXX^^^--^^XXX", "XXXXX^^^--^^XXX", "X--XX^^^--^^XXX", "-----^^^--^^XXX", "-XX-------^^XXX", "XXXXX-----^^XXX", "XXXXX^^^--^^XXX", "XXXXX^^^--^^---", "XXXXX^^^-------", "XXXXX^^^----XXX", "XXXXX^^^--^^XXX"], "0_14_0": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "&--XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XX----------", "---XX--XXXXXXXX", "-------XXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "0_14_1": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "&--XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XX----------", "---XX--XXXXXXXX", "-------XXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "0_14_2": ["XXXXXXX--XXXXXX", "XXXXXXX--XXXXXX", "XXXXXXX--XXXXXX", "XXXXXXX--XXXXXX", "---------XXXXXX", "XXXXX----XXXXXX", "XXXXX----------", "XXXXXXX--------", "XXXXXXX--XXXXXX", "XXXXXXX--XXXXXX", "XXXXXXX--XXXXXX"], "0_12_0": ["-----XXXXXXXXXX", "\\\\---XXXXXXXXXX", "//---XXXXXXXXXX", "-----XXXXXXXXXX", "---------------", "-------XXXXXXXX", "-------XXXXXXXX", "-----XXXXXXXXXX", "&----XXXXXXXXXX", "-----XXXXXXXXXX", "-----XXXXXXXXXX"], "0_12_1": ["-----XXXXXXXXXX", "\\\\---XXXXXXXXXX", "//---XXXXXXXXXX", "-----XXXXXXXXXX", "---------------", "-------XXXXXXXX", "-------XXXXXXXX", "-----XXXXXXXXXX", "&----XXXXXXXXXX", "-----XXXXXXXXXX", "-----XXXXXXXXXX"], "0_12_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-XX-------XX*&X", "-XX--XXX--XX--X", "-XX-------XX--X", "-----XXX-------", "-XX-------XX--X", "-XX--XXX--XX--X", "-XX-------XX--X", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "13_3_0": ["----^^^^^^^^^^^", "\\\\-------------", "//-----X------X", "-------XX----XX", "-------XXX--XXX", "-------*#X--X#*", "-------XXX--XXX", "-------XX----XX", "&------X------X", "---------------", "----^^^^^^^^^^^"], "13_3_1": ["----^^^^^^^^^^^", "\\\\-------------", "//-----X------X", "-------XX----XX", "-------XXX--XXX", "-------*#X--X#*", "-------XXX--XXX", "-------XX----XX", "&------X------X", "---------------", "----^^^^^^^^^^^"], "13_3_2": ["^^^^^^^^^^^^^^^", "---X--X--X--&--", "---X--X--X--X--", "X-----X--X--X--", "X--------X--X--", "X-----------X--", "X-----------X--", "X---//\\\\----X--", "----\\\\//----X--", "------------X--", "^^^^^^^^^^^^^^^"], "12_2_0": ["----^^^^^^^^^^^", "\\\\----^--------", "//----^----X--X", "------^---XX--X", "------^--XXX--X", "---------X#*--*", "------&--XXX--X", "----------XX--X", "&----------X--X", "---------------", "----^^^^^^^^^^^"], "12_2_1": ["----^^^^^^^^^^^", "\\\\----^--------", "//----^----X--X", "------^---XX--X", "------^--XXX--X", "---------X#*--*", "------&--XXX--X", "----------XX--X", "&----------X--X", "---------------", "----^^^^^^^^^^^"], "1_1_0": ["---------X-----", "---------X-----", "---------X-----", "---------X-----", "---------X-----", "---#--&--X--&--", "---------X-----", "/\\\\------X-----", "\\//------X-----", "---------X-----", "*--------&-----"], "1_1_1": ["---------X-----", "---------X-----", "---------X-----", "---------X-----", "---------X-----", "---#--&--X--&--", "---------X-----", "/\\\\------X-----", "\\//------X-----", "---------X-----", "*--------&-----"], "1_1_2": ["----&--^^------", "----X--^^------", "----X--^^------", "----X--^^------", "----X--^^------", "----X--^^------", "----X--^^------", "----X----------", "----X----------", "----X--^^------", "----X--^^------"], "16_3_0": ["^^^^^^^^^^^^^^^", "&--------------", "-------X------X", "^^-----XX----XX", "^^^^---XXX--XXX", "-------*#X--X#*", "^^^^---XXX--XXX", "^^-----XX----XX", "-------X------X", "&--------------", "^^^^^^^^^^^^^^^"], "16_3_1": ["^^^^^^^^^^^^^^^", "&--------------", "-------X------X", "^^-----XX----XX", "^^^^---XXX--XXX", "-------*#X--X#*", "^^^^---XXX--XXX", "^^-----XX----XX", "-------X------X", "&--------------", "^^^^^^^^^^^^^^^"], "16_3_2": ["^^^^^^^^^^^^^^^", "----------X--^^", "-X--X--X--X--^^", "-X--X--X--X---&", "-X--X--X--X--^^", "#X-#X-#X-#X--^^", "-X--X--X--X--^^", "-X--X--X--X---&", "-X--X--X--X--^^", "-X--X--X-----^^", "^^^^^^^^^^^^^^^"], "5_9_0": ["----XXXXXXXXXXX", "----XXXXXXXXX--", "----XXXXXXXXX--", "----XXXXXXXXX--", "------*--------", "#--------------", "-------#--#----", "----XXXXXXXXX--", "----XXXXXXXXX--", "----XXXXXXXXX*#", "----XXXXXXXXXXX"], "5_9_1": ["----XXXXXXXXXXX", "----XXXXXXXXXX-", "----XXXXXXXXXX-", "----XXXXXXXXXX-", "------*---*----", "#--------------", "-------#---#---", "----XXXXXXXXXX-", "----XXXXXXXXXX-", "----XXXXXXXXXX*", "----XXXXXXXXXXX"], "1_11_0": ["XX--XXX--XXX---", "XX--XXX--XXX---", "XX--XXX--XXX---", "XX--XXX--XXX---", "XX--XXX--XXX---", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "*XXXXXXXXXXXXX-", "---------------", "#----&----&----"], "1_11_1": ["XX--XXX--XXX---", "XX--XXX--XXX---", "XX--XXX--XXX---", "XX--XXX--XXX---", "XX--XXX--XXX---", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "*XXXXXXXXXXXXX-", "---------------", "#----&----&----"], "1_15_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---------------", "---&-----XXXXXX", "------#--XXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "1_15_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---------------", "---&-----XXXXXX", "------#--XXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "1_15_2": ["XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "-------#XXXX---", "XXXXX---XXXX---", "XXXXX----*-----", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-"], "14_4_0": ["X--^^^^^^^^^^^^", "-----X--X--X--X", "X----X--X--X--X", "X----X--X--X--X", "X----X--X--X--X", "*----X-#X-#X-#X", "X----X--X--X--X", "X----X--X--X--X", "X----X--X--X--X", "---------------", "X--^^^^^^^^^^^^"], "14_4_1": ["X--^^^^^^^^^^^^", "-----X--X--X--X", "X----X--X--X--X", "X----X--X--X--X", "X----X--X--X--X", "*----X-#X-#X-#X", "X----X--X--X--X", "X----X--X--X--X", "X----X--X--X--X", "---------------", "X--^^^^^^^^^^^^"], "14_4_2": ["^^^^^^^^^^^^^^^", "------------&--", "------------X--", "X----XXX----X--", "X^---X*X----X--", "X^^--X&-----X--", "X^---X*X----X--", "X----XXX----X--", "//\\\\//\\\\----X--", "\\\\//\\\\//----X--", "^^^^^^^^^^^^^^^"], "14_5_0": ["^^^^^^^^^^^^^^^", "-------------X-", "-------------X-", "---X----XXX--X-", "---X^---X*X--X-", "XXXX^^--X&---X-", "---X^---X*X--X-", "---X----XXX--X-", "---//\\\\//\\\\--X-", "---\\\\//\\\\//----", "^^^^^^^^^^^^^^^"], "14_5_1": ["^^^^^^^^^^^^^^^", "-------------X-", "-------------X-", "---X----XXX--X-", "---X^---X*X--X-", "XXXX^^--X&---X-", "---X^---X*X--X-", "---X----XXX--X-", "---//\\\\//\\\\--X-", "---\\\\//\\\\//----", "^^^^^^^^^^^^^^^"], "14_5_2": ["^^^^^^^^^^^^^^^", "-------------&-", "-------------X-", "---X----XXX--X-", "---X^---X*X--X-", "XXXX^^--X&---X-", "---X^---X*X--X-", "---X----XXX--X-", "---//\\\\//\\\\--X-", "---\\\\//\\\\//--X-", "^^^^^^^^^^^^^^^"], "15_4_0": ["--^^^^^^^^^^^^^", "--------------&", "------X----X--X", "-----XX---XX--X", "----XXX--XXX--X", "----X#*--X#*--X", "----XXX--XXX--X", "-----XX---XX--X", "------X----X--X", "--------------X", "--^^^^^^^^^^^^^"], "15_4_1": ["--^^^^^^^^^^^^^", "--------------&", "------X----X--X", "-----XX---XX--X", "----XXX--XXX--X", "----X#*--X#*--X", "----XXX--XXX--X", "-----XX---XX--X", "------X----X--X", "--------------X", "--^^^^^^^^^^^^^"], "13_4_0": ["-^^^^^^^^^^^^^^", "-^^------------", "-^^------------", "-^^--X--X----XX", "-----X--X^---X*", "-^^--XXXX^^--X&", "-----X--X^---X*", "-^^--X--X----XX", "-^^-----//\\\\//\\", "-^^-----\\\\//\\\\/", "-^^^^^^^^^^^^^^"], "13_4_1": ["-^^^^^^^^^^^^^^", "-^^------------", "-^^------------", "-^^--X--X----XX", "-----X--X^---X*", "-^^--XXXX^^--X&", "-----X--X^---X*", "-^^--X--X----XX", "-^^-----//\\\\//\\", "-^^-----\\\\//\\\\/", "-^^^^^^^^^^^^^^"], "13_4_2": ["^^^^^^^^^^^^^^-", "-----X--X--X---", "-----X--X--X---", "XXX-----X--X---", "X*X--------X---", "X&-------------", "X*X------------", "XXX---//\\\\-----", "/\\\\---\\\\//-----", "\\//------------", "^^^^^^^^^^^^^^-"], "4_7_0": ["----XX^^XXXX^^^", "\\\\--XX^^XXXX^^^", "//--XX^^XXXX^^^", "----XX^^XXXX^^^", "----XX^^XXXX^^^", "----XX^^XXXX^^^", "----XX^^--XX^^^", "----XX------^^^", "&-------XX-----", "------^^XXXX---", "----XX^^XXXX^^^"], "4_7_1": ["----XXXXXX^^^^^", "\\\\--XXXXXX^^^^^", "//--XXXXXX^^^^^", "----XXXXXX^^^^^", "----XXXXXX^^^^^", "----XXXXXX^^^^^", "--------XX^^^^^", "----------^^^^^", "&---XXXX-------", "----XXXXXX-----", "----XXXXXX^^^^^"], "3_12_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "------*---#XXXX", "-----------XXXX", "-------#----*--", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "3_12_1": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "------*---#XXXX", "-----------XXXX", "-------#----*--", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "3_12_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "X*&XX--XX--XX--", "X--XX--XX--XX--", "X--XX--XX--XX--", "---------------", "X--XX--XX--XX--", "X--XX--XX--XX--", "X--XX*&XX*#XX--", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "4_13_0": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----#XXXX--#XX", "#-----XXXX---XX", "-------*------*", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "4_13_1": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----#XXXX--#XX", "#-----XXXX---XX", "-------*------*", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "5_10_0": ["----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "---------*---*-", "#--------------", "------#---#---#", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "5_10_1": ["----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "---------*---*-", "#--------------", "------#---#---#", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "5_10_2": ["XXXXXXXXX--^^^^", "XXXXXXXXX----X-", "XXXXXXXXX----X-", "XXXXXXXXX----X-", "-#XXXXX------X-", "--XXXX-------X-", "---*---------X-", "XXXXXXXXX----X-", "XXXXXXXXX----X-", "XXXXXXXXX------", "XXXXXXXXX--^^^^"], "5_8_0": ["---XXXXXXXXXXXX", "---XXXXXXX--^^^", "---XXXXXXX-----", "---XXXXXXX--^^^", "-----*------^^^", "#-----------^^^", "------#-----^^^", "---XXXXXXX--^^^", "---XXXXXXX-----", "---XXXXXXX--^^^", "---XXXXXXXXXXXX"], "5_8_1": ["---XXXXXXXXXXXX", "---XXXXXXX--^^^", "---XXXXXXX--^^^", "---XXXXXXX--^^^", "-----*------^^^", "#------------&-", "------#-----^^^", "---XXXXXXX--^^^", "---XXXXXXX--^^^", "---XXXXXXX--^^^", "---XXXXXXXXXXXX"], "5_8_2": ["XXXXXXXX--XXXXX", "^^^^^^----XXXXX", "^^^-------XXXXX", "----------XXXXX", "--//\\\\----XXXXX", "--\\\\//----XX---", "---------------", "------------XXX", "^^^-------XXXXX", "^^^^^^----XXXXX", "XXXXXXXX--XXXXX"], "6_9_0": ["-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "--*--------#XXX", "-^^^--------XXX", "--&-----#----*-", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX"], "6_9_1": ["-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "--*--------#XXX", "-^^^--------XXX", "--&-----#----*-", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX"], "6_9_2": ["^^^^^--XXXXXXX^", "-------XXXXXXX^", "-------XXXXXXX^", "XXX----XXXXXXX^", "X*X----XXXXXXX^", "X&-----XXXXXXX^", "X*X-------XXXX^", "XXX-----------^", "/\\\\----XXX-----", "\\//----XXXXXXX-", "^^^^^--XXXXXXX^"], "0_16_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---------------", "---XX---XXXXXXX", "---XX---XXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "0_16_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---------------", "---XX---XXXXXXX", "---XX---XXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "0_16_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "---------------", "XXXXX--XXX-----", "XXXXX--XXX--#--", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "0_17_0": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "---------------", "XXXX---XXXXXXXX", "XXXX---XXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "0_17_1": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "---------------", "XXXX---XXXXXXXX", "XXXX---XXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "0_15_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---------------", "---&----XX--XXX", "--------XX--XXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "0_15_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---------------", "---&----XX--XXX", "--------XX--XXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "0_15_2": ["XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "---------------", "XXXX---XX------", "XXXX---XX--#---", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-"], "1_16_0": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-----#XXXX-----", "--&---XXXX--XXX", "-------*----XXX", "-XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "1_16_1": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-----#XXXX-----", "--&---XXXX--XXX", "-------*----XXX", "-XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "1_16_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-----------*---", "XXXXX--XX------", "XXXXX--XX---#--", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_12_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "---------#XXXX-", "----------XXXX-", "------#----*---", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "2_12_1": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "---------#XXXX-", "----------XXXX-", "------#----*---", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "2_11_0": ["XX--XXX--XXX---", "XX--XXX--XXX---", "XX--XXX--XXX---", "XX--XXX--XXX-#-", "XX--XXX--XXX---", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "*XXXXXXXXXXXXX-", "---------------", "#----&----&----"], "2_11_1": ["-----XXXXXXXXXX", "\\\\---XXXXXXXXXX", "//---XXXXXXXXXX", "-----XXXXXXXXXX", "----------#XXXX", "-----------XXXX", "-------#----*--", "-----XXXXXXXXXX", "&----XXXXXXXXXX", "-----XXXXXXXXXX", "-----XXXXXXXXXX"], "2_11_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "^-------XX*&XX*", "---XXX--XX--XX-", "^-------XX--XX-", "---XXX---------", "^-------XX--XX-", "---XXX--XX--XX-", "^-------XX--XX-", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "4_12_0": ["-----XXXXXXXXXX", "-----XXXXXXXXXX", "X----XXXXXXXXXX", "XXX--XXXXXXXXXX", "-XX----*---#XXX", "-XX---------XXX", "-XX-----#----*-", "#XX--XXXXXXXXXX", "-XX--XXXXXXXXXX", "-XX--XXXXXXXXXX", "-XX--XXXXXXXXXX"], "4_12_1": ["-----XXXXXXXXXX", "-----XXXXXXXXXX", "X----XXXXXXXXXX", "XXX--XXXXXXXXXX", "-XX----*---#XXX", "-XX---------XXX", "-XX-----#----*-", "#XX--XXXXXXXXXX", "-XX--XXXXXXXXXX", "-XX--XXXXXXXXXX", "-XX--XXXXXXXXXX"], "12_1_0": ["----^^^^^^^^^^^", "------^--^-----", "------^--^----X", "------^--^---XX", "------^--^--XXX", "#-----------X#*", "------&--&--XXX", "-------------XX", "--------------X", "---------------", "----^^^^^^^^^^^"], "12_1_1": ["----^^^^^^^^^^^", "------^--^-----", "------^--^----X", "------^--^---XX", "------^--^--XXX", "#-----------X#*", "------&--&--XXX", "-------------XX", "--------------X", "---------------", "----^^^^^^^^^^^"], "2_0_0": ["---------------", "---------------", "---------------", "---------------", "---------------", "---#-----&--&--", "---------------", "/\\\\------------", "\\//------------", "------*--------", "*--------------"], "2_0_1": ["---------------", "---------------", "---------------", "---------------", "---------------", "---#-----&--&--", "---------------", "/\\\\------------", "\\//------------", "------*--------", "*--------------"], "2_0_2": ["^^-------------", "---------------", "---------------", "---------------", "---------------", "-----------&---", "---------------", "---------------", "---------------", "------*--------", "^^-------------"], "5_13_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---------*---*-", "---&-----------", "------#---#---#", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_13_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---------*---*-", "---&-----------", "------#---#---#", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_13_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX--", "-----*---*-----", "-&-------------", "------#---#----", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX*#", "XXXXXXXXXXXXXXX"], "5_14_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-----*------#XX", "-------------XX", "------#--#----*", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_14_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-----*------#XX", "-------------XX", "------#--#----*", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_14_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-----*---*---*-", "-&-------------", "------#---#---#", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_12_0": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----*------#XX", "#------------XX", "------#--#----*", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "5_12_1": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----*------#XX", "#------------XX", "------#--#----*", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "6_13_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-----*---*---*-", "---------------", "------#---#---#", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "6_13_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-----*---*---*-", "---------------", "------#---#---#", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "6_13_2": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-----*---*---*-", "---------------", "------#---#---#", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_7_0": ["----XXXXXX--^^^", "\\\\--XXXXXX----X", "//--XXXXXX----X", "----XXXXXX----X", "------*-------X", "--------------X", "-------#------X", "----XXXXXX----X", "&---XXXXXX----X", "----XXXXXX----#", "----XXXXXX--^^^"], "5_7_1": ["----XXXXXX--^^^", "\\\\--XXXXXX----X", "//--XXXXXX----X", "----XXXXXX----X", "------*-------X", "--------------X", "-------#------X", "----XXXXXX----X", "&---XXXXXX----X", "----XXXXXX----#", "----XXXXXX--^^^"], "5_7_2": ["^^^^--XXXXXX--^", "------XXXXXX--^", "------XXXXXX--^", "XX----XXXXXX---", "*X-------------", "&-------XX----^", "*X------XX----^", "XX----XXXXXX--^", "\\\\----XXXXXX--^", "//----XXXXXX--^", "^^^^--XXXXXX--^"], "12_3_0": ["-----^^^^^^^^^^", "\\\\-------------", "//-----X------X", "-------XX----XX", "-------XXX--XXX", "-------*#X--X#*", "-------XXX--XXX", "-------XX----XX", "&------X------X", "---------------", "-----^^^^^^^^^^"], "12_3_1": ["-----^^^^^^^^^^", "\\\\-------------", "//-----X------X", "-------XX----XX", "-------XXX--XXX", "-------*#X--X#*", "-------XXX--XXX", "-------XX----XX", "&------X------X", "---------------", "-----^^^^^^^^^^"], "10_3_0": ["------^^^^^^^^^", "--------X--X---", "--------X--X---", "--------X--X---", "--------X--X--X", "---#----X-#X--X", "--------X--X--X", "/\\\\-----X--X---", "\\//-----X--X---", "---------------", "*-----^^^^^^^^^"], "10_3_1": ["------^^^^^^^^^", "--------X--X---", "--------X--X---", "--------X--X---", "--------X--X--X", "---#----X-#X--X", "--------X--X--X", "/\\\\-----X--X---", "\\//-----X--X---", "---------------", "*-----^^^^^^^^^"], "10_3_2": ["^^^^--XXXXXXXXX", "-#------^^^^^^^", "-X------^^^^^^^", "-X------^^^^^^^", "-X------^^^---^", "-X-------&-----", "-X------^^^---^", "-X------^^^^^^^", "-X------^^^^^^^", "-X------^^^^^^^", "^^^^--XXXXXXXXX"], "2_15_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "------#XXXX----", "---&---XXXX--XX", "--------*----XX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_15_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "------#XXXX----", "---&---XXXX--XX", "--------*----XX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_15_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "-------#XXXX---", "XX------XXXX---", "XX--*----*-----", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXXX"], "11_0_0": ["----^^^^^^^^^^^", "\\\\-------*----*", "//-------------", "--------^^^--^^", "------^^^^^^^^^", "---------&----&", "------^^^^^^^^^", "--------^^^--^^", "&--------------", "---------*----*", "----^^^^^^^^^^^"], "11_0_1": ["----^^^^^^^^^^^", "\\\\-------*----*", "//-------------", "--------^^^--^^", "------^^^^^^^^^", "---------&----&", "------^^^^^^^^^", "--------^^^--^^", "&--------------", "---------*----*", "----^^^^^^^^^^^"], "11_0_2": ["^^^^^^^^^--^^^-", "------X----^^^-", "-----------^^^-", "------------*--", "-----------^^^-", "-----------^^^-", "-----------^^^-", "---------------", "--X--------^^^-", "--X--------^^^-", "^^^^^^^^^--^^^-"], "6_8_0": ["--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "---*--------#XX", "--^^^--------XX", "---&-----#----*", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX"], "6_8_1": ["--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "---*--------#XX", "--^^^--------XX", "---&-----#----*", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX"], "2_16_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "----------#XXXX", "---XXXXX---XXXX", "---XXXXX----*--", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_16_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "----------#XXXX", "---XXXXX---XXXX", "---XXXXX----*--", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_16_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "----------#XXXX", "XXXXX------XXXX", "XXXXX--*----*--", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_17_0": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXX--#XXXX-", "XXXXXXX---XXXX-", "-*---------*---", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_17_1": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXX--#XXXX-", "XXXXXXX---XXXX-", "-*---------*---", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_17_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXX---#XXX", "XXXXXXXX----XXX", "-*-----------*-", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "3_16_0": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "----#XXXX--#XXX", "-&---XXXX---XXX", "------*------*-", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "3_16_1": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "----#XXXX--#XXX", "-&---XXXX---XXX", "------*------*-", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "3_16_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXX-----#XXXXX", "XXXX------XXXX-", "-*----*----*---", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "11_3_0": ["------^^^^^^^^^", "--------X--X--X", "--------X--X--X", "--------X--X--X", "--------X--X--X", "---#----X-#X-#X", "--------X--X--X", "/\\\\-----X--X--X", "\\//-----X--X--X", "---------------", "*-----^^^^^^^^^"], "11_3_1": ["------^^^^^^^^^", "--------X--X--X", "--------X--X--X", "--------X--X--X", "--------X--X--X", "---#----X-#X-#X", "--------X--X--X", "/\\\\-----X--X--X", "\\//-----X--X--X", "---------------", "*-----^^^^^^^^^"], "4_11_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "---------*---*-", "---------------", "------#---#---#", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "4_11_1": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "---------*---*-", "---------------", "------#---#---#", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "4_11_2": ["XXXXXXXXXX--^^^", "XXXXXXXXXX----X", "XXXXXXXXXX----X", "XXXXXXXXXX----X", "XXXX----------X", "XXXX----------X", "-*----*-------X", "XXXXXXXXXX----X", "XXXXXXXXXX----X", "XXXXXXXXXX-----", "XXXXXXXXXX--^^^"], "11_5_0": ["-----^^^^^^^^^^", "--------X--X--X", "X-------X--X--X", "XXX-----X--X--X", "-XX-----X--X--X", "-XX-----X-#X-#X", "-XX-----X--X--X", "#XX-----X--X--X", "-XX-----X--X--X", "-XX------------", "-XX--^^^^^^^^^^"], "11_5_1": ["-----^^^^^^^^^^", "--------X--X--X", "X-------X--X--X", "XXX-----X--X--X", "-XX-----X--X--X", "-XX-----X-#X-#X", "-XX-----X--X--X", "#XX-----X--X--X", "-XX-----X--X--X", "-XX------------", "-XX--^^^^^^^^^^"], "11_5_2": ["X--^^^^^^^^^^^^", "X--------------", "---------------", "-----X--X----XX", "X----X--X^---X*", "X----XXXX^^--X&", "X----X--X^---X*", "X----X--X----XX", "X-------//\\\\//\\", "X-------\\\\//\\\\/", "X--^^^^^^^^^^^^"], "11_6_0": ["^^^^^^^^^^--XXX", "----X--X----XXX", "-X--X--X----XXX", "-X--X--X----XXX", "-X--X--X----XXX", "#X-#X-#X----XXX", "-X--X--X----XXX", "-X--X--X-------", "-X--X--X-------", "-X----------XX-", "^^^^^^^^^^--XXX"], "11_6_1": ["^^^^^^^^^^--XXX", "----X--X----XXX", "-X--X--X----XXX", "-X--X--X----XXX", "-X--X--X----XXX", "#X-#X-#X----XXX", "-X--X--X----XXX", "-X--X--X-------", "-X--X--X-------", "-X----------XX-", "^^^^^^^^^^--XXX"], "11_4_0": ["----^^^^^^^^^^^", "\\\\---------X--X", "//------X--X--X", "-------XX--X--X", "------XXX--X--X", "------X#*--X--X", "------XXX--X--X", "-------XX--X--X", "&-------X--X--X", "---------------", "----^^^^^^^^^^^"], "11_4_1": ["------^^^^^^^^^", "---------------", "X-------X------", "XXX-----XX----X", "-XX-----XXX--XX", "-XX-----*#X--X#", "-XX-----XXX--XX", "#XX-----XX----X", "-XX-----X------", "-XX------------", "-XX---^^^^^^^^^"], "11_4_2": ["^^^^^^^^^^--XXX", "-------X------X", "-X--X--X-------", "-X--X--X------X", "-X--X--X-------", "#X-#X-#X------X", "-X--X--X-------", "-X--X--X------X", "-X--X--X-------", "-X--X---------X", "^^^^^^^^^^--XXX"], "12_5_0": ["^^^^^^^^^^--XX^", "----X--X----XX^", "-X--X--X----XX^", "-X--X--X----XX^", "-X--X--X----XX^", "#X-#X-#X----XX^", "-X--X--X----XX^", "-X--X--X------^", "-X--X--X-------", "-X----------XX-", "^^^^^^^^^^--XX^"], "12_5_1": ["^^^^^^^^^^--XX^", "----X--X----XX^", "-X--X--X----XX^", "-X--X--X----XX^", "-X--X--X----XX^", "#X-#X-#X----XX^", "-X--X--X----XX^", "-X--X--X------^", "-X--X--X-------", "-X----------XX-", "^^^^^^^^^^--XX^"], "10_5_0": ["------^^^^^^^^^", "--------X--X--X", "X-------X--X--X", "XXX-----X--X--X", "-XX-----X--X--X", "-XX-----X-#X-#X", "-XX-----X--X--X", "#XX-----X--X--X", "-XX-----X--X--X", "-XX------------", "-XX---^^^^^^^^^"], "10_5_1": ["------^^^^^^^^^", "--------X--X--X", "X-------X--X--X", "XXX-----X--X--X", "-XX-----X--X--X", "-XX-----X-#X-#X", "-XX-----X--X--X", "#XX-----X--X--X", "-XX-----X--X--X", "-XX------------", "-XX---^^^^^^^^^"], "9_6_0": ["XXXX--^^^^^^^^^", "-XXX----X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "--------X--X--X", "--------X--X-#X", "--------X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "#XXX-----------", "XXXX--^^^^^^^^^"], "9_6_1": ["XXXX--^^^^^^^^^", "-XXX----X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "--------X--X--X", "--------X--X-#X", "--------X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "#XXX-----------", "XXXX--^^^^^^^^^"], "9_6_2": ["^^^^^^^^^^--XX-", "------------XX-", "------------XX-", "X----XXX----XX-", "X^---X*X-------", "X^^--X&--------", "X^---X*X----XX-", "X----XXX----XX-", "//\\\\//\\\\----XX-", "\\\\//\\\\//----XX-", "^^^^^^^^^^--XX-"], "9_7_0": ["XXXX--^^^^^^^^^", "XXXX----X--X--X", "XXXX----X--X--X", "XXXX----X--X--X", "XXXX----X--X--X", "XXXX----X-#X-#X", "XXXX----X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "---------------", "XXXX--^^^^^^^^^"], "9_7_1": ["XXXX--^^^^^^^^^", "XXXX----X--X--X", "XXXX----X--X--X", "XXXX----X--X--X", "XXXX----X--X--X", "XXXX----X-#X-#X", "XXXX----X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "---------------", "XXXX--^^^^^^^^^"], "9_7_2": ["^^^^^^^^^^--XXX", "------------XXX", "------------XXX", "X----XXX----XXX", "X^---X*X----XXX", "X^^--X&-----XXX", "X^---X*X----XXX", "X----XXX------X", "//\\\\//\\\\-------", "\\\\//\\\\//----XX-", "^^^^^^^^^^--XXX"], "10_6_0": ["XXXX--^^^^^^^^^", "-XXX----X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "--------X--X--X", "--------X-#X-#X", "--------X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "#XXX-----------", "XXXX--^^^^^^^^^"], "10_6_1": ["XXXX--^^^^^^^^^", "-XXX----X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "--------X--X--X", "--------X-#X-#X", "--------X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "#XXX-----------", "XXXX--^^^^^^^^^"], "10_6_2": ["^^^^^^^^^^--XXX", "------------XXX", "------------XXX", "X----XXX----XXX", "X^---X*X------#", "X^^--X&--------", "X^---X*X-------", "X----XXX----XXX", "//\\\\//\\\\----XXX", "\\\\//\\\\//----XXX", "^^^^^^^^^^--XXX"], "7_9_0": ["-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "--*-----*---#XX", "-^^^---------XX", "--&------#----*", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX"], "7_9_1": ["-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "--*-----*---#XX", "-^^^---------XX", "--&------#----*", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX"], "8_8_0": ["XXXXXXXX--^^^^^", "-XXXXXXX-------", "-XXXXXXX------X", "-XXXXXXX-----XX", "------------XXX", "---&--------X#*", "------*-----XXX", "-XXXXXXX-----XX", "-XXXXXXX------X", "#XXXXXXX-------", "XXXXXXXX--^^^^^"], "8_8_1": ["XXXXXXXX--^^^^^", "-XXXXXXX-------", "-XXXXXXX------X", "-XXXXXXX-----XX", "------------XXX", "---&--------X#*", "------*-----XXX", "-XXXXXXX-----XX", "-XXXXXXX------X", "#XXXXXXX-------", "XXXXXXXX--^^^^^"], "11_2_0": ["------^^^^^^^^^", "--------^------", "--------^----X-", "--------^---XX-", "--------^--XXX-", "---#-------X#*-", "--------&--XXX-", "/\\\\---------XX-", "\\//----------X-", "---------------", "*-----^^^^^^^^^"], "11_2_1": ["------^^^^^^^^^", "--------^------", "--------^----X-", "--------^---XX-", "--------^--XXX-", "---#-------X#*-", "--------&--XXX-", "/\\\\---------XX-", "\\//----------X-", "---------------", "*-----^^^^^^^^^"], "11_2_2": ["----^^^^^^^^^^^", "\\\\---------^^^^", "//------X--^^^^", "-------XX--^^^^", "------XXX--^^^^", "------X#*------", "------XXX--^^^^", "-------XX--^^^^", "&-------X--^^^^", "-----------^^^^", "----^^^^^^^^^^^"], "5_11_0": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----*------*--", "#--------------", "------#--#---#-", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "5_11_1": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----*------*--", "#--------------", "------#--#---#-", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "5_11_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXX--^^^^", "XXXXXXXXX----^^", "XXXXXXXXX------", "XXXX-----------", "XXXX-----------", "-*----*--------", "XXXXXXXXX------", "XXXXXXXXX----^^", "XXXXXXXXX--^^^^", "XXXXXXXXXXXXXXX"], "6_10_0": ["----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "^--------*---*-", "^^-------------", "^-----#---#---#", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "6_10_1": ["----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "^--------*---*-", "^^-------------", "^-----#---#---#", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "6_10_2": ["XXXXXXXX--^^^^^", "XXXXXXXX----X--", "XXXXXXXX----X--", "XXXXXXXX----X--", "XXXXXX------X--", "XXXXXX------X-#", "-*----------X--", "XXXXXXXX----X--", "XXXXXXXX----X--", "XXXXXXXX-------", "XXXXXXXX--^^^^^"], "10_7_0": ["^^^^^^^^^--XXXX", "-----------XXXX", "----X------XXXX", "XX--XX-----XXXX", "*X--XXX----XXXX", "&---*#X----XXXX", "*X--XXX----XXXX", "XX--XX-------XX", "\\\\--X----------", "//---------XX--", "^^^^^^^^^--XXXX"], "10_7_1": ["^^^^^^^^^--XXXX", "-----------XXXX", "----X------XXXX", "XX--XX-----XXXX", "*X--XXX----XXXX", "&---*#X----XXXX", "*X--XXX----XXXX", "XX--XX-------XX", "\\\\--X----------", "//---------XX--", "^^^^^^^^^--XXXX"], "15_5_0": ["^^^^^^^^^^^^^^^", "-#-------------", "-X-------------", "-X--X---X----XX", "-X--X---X^---X*", "-X--XXXXX^^--X&", "-X--X---X^---X*", "-X--X---X----XX", "-X------//\\\\//\\", "-X------\\\\//\\\\/", "^^^^^^^^^^^^^^^"], "15_5_1": ["^^^^^^^^^^^^^^^", "-#-------------", "-X-------------", "-X--X---X----XX", "-X--X---X^---X*", "-X--XXXXX^^--X&", "-X--X---X^---X*", "-X--X---X----XX", "-X------//\\\\//\\", "-X------\\\\//\\\\/", "^^^^^^^^^^^^^^^"], "15_5_2": ["^^^^^^^^^^^^^^^", "---------------", "------------X--", "X----XXX---XX--", "X^---X*X--XXX--", "X^^--X&---X#*--", "X^---X*X--XXX--", "X----XXX---XX--", "//\\\\//\\\\----X--", "\\\\//\\\\//-------", "^^^^^^^^^^^^^^^"], "12_4_0": ["----^^^^^^^^^^^", "\\\\---------X--X", "//------X--X--X", "-------XX--X--X", "------XXX--X--X", "------X#*--X-#X", "------XXX--X--X", "-------XX--X--X", "&-------X--X--X", "---------------", "----^^^^^^^^^^^"], "12_4_1": ["----^^^^^^^^^^^", "\\\\---------X--X", "//------X--X--X", "-------XX--X--X", "------XXX--X--X", "------X#*--X-#X", "------XXX--X--X", "-------XX--X--X", "&-------X--X--X", "---------------", "----^^^^^^^^^^^"], "12_4_2": ["^^^^^^^^^^--^^^", "--------------X", "--------------X", "X----XXX------X", "X^---X*X------X", "X^^--X&-------X", "X^---X*X------X", "X----XXX------X", "//\\\\//\\\\------X", "\\\\//\\\\//-------", "^^^^^^^^^^--^^^"], "8_9_0": ["XXXXXXXXXXXXXXX", "^^^^^^--XXXXXXX", "^^^-----XXXXXXX", "--------XXXXXXX", "--//\\\\-------*-", "--\\\\//---------", "----------#---#", "--------XXXXXXX", "^^^-----XXXXXXX", "^^^^^^--XXXXXXX", "XXXXXXXXXXXXXXX"], "8_9_1": ["XXXXXXXXXXXXXXX", "^^^^^^--XXXXXXX", "^^^-----XXXXXXX", "--------XXXXXXX", "--//\\\\-------*-", "--\\\\//---------", "----------#---#", "--------XXXXXXX", "^^^-----XXXXXXX", "^^^^^^--XXXXXXX", "XXXXXXXXXXXXXXX"], "8_9_2": ["^^^^--XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "XX----XXXXXXXXX", "*X-------*---*-", "&--------------", "*X--------#---#", "XX----XXXXXXXXX", "\\\\----XXXXXXXXX", "//----XXXXXXXXX", "^^^^--XXXXXXXXX"], "9_8_0": ["^^^^^^^--XXXXXX", "---------XXXXXX", "----X----XXXXXX", "---XX----XXXXXX", "--XXX------#XXX", "--X#*-------XXX", "--XXX--------*-", "---XX----XXXXXX", "----X----XXXXXX", "---------XXXXXX", "^^^^^^^--XXXXXX"], "9_8_1": ["^^^^^^^--XXXXXX", "---------XXXXXX", "----X----XXXXXX", "---XX----XXXXXX", "--XXX------#XXX", "--X#*-------XXX", "--XXX--------*-", "---XX----XXXXXX", "----X----XXXXXX", "---------XXXXXX", "^^^^^^^--XXXXXX"], "16_5_0": ["^^^^^^^^^^^^^^^", "-----X--X--X--X", "-----X--X--X--X", "XX---X--X--X--X", "*X---X--X--X--X", "&----X-#X-#X-#X", "*X---X--X--X--X", "XX---X--X--X--X", "\\\\---X--X--X--X", "//-------------", "^^^^^^^^^^^^^^^"], "16_5_1": ["^^^^^^^^^^^^^^^", "-----X--X--X--X", "-----X--X--X--X", "XX---X--X--X--X", "*X---X--X--X--X", "&----X-#X-#X-#X", "*X---X--X--X--X", "XX---X--X--X--X", "\\\\---X--X--X--X", "//-------------", "^^^^^^^^^^^^^^^"], "7_10_0": ["XXXXXXXXXXXXXXX", "^^^^^^--XXXXXXX", "^^^-----XXXXXXX", "--------XXXXXXX", "--//\\\\----#XXXX", "--\\\\//-----XXXX", "------------*--", "--------XXXXXXX", "^^^-----XXXXXXX", "^^^^^^--XXXXXXX", "XXXXXXXXXXXXXXX"], "7_10_1": ["XXXXXXXXXXXXXXX", "^^^^^^--XXXXXXX", "^^^-----XXXXXXX", "--------XXXXXXX", "--//\\\\----#XXXX", "--\\\\//-----XXXX", "------------*--", "--------XXXXXXX", "^^^-----XXXXXXX", "^^^^^^--XXXXXXX", "XXXXXXXXXXXXXXX"], "7_10_2": ["^^^^^--XXXXXXXX", "-------XXXXXXXX", "-------XXXXXXXX", "XXX----XXXXXXXX", "X*X------#XXXXX", "X&--------XXXX-", "X*X--------*---", "XXX----XXXXXXXX", "/\\\\----XXXXXXXX", "\\//----XXXXXXXX", "^^^^^--XXXXXXXX"], "4_16_0": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-#XXXX-----#XXX", "--XXXX------XXX", "---*----*----*-", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "4_16_1": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-#XXXX-----#XXX", "--XXXX------XXX", "---*----*----*-", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "6_11_0": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----*---*---*-", "#--------------", "------#---#---#", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "6_11_1": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----*---*---*-", "#--------------", "------#---#---#", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "1_17_0": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "--------#XXXXX-", "XXXXXX---XXXXX-", "XXXXXX----*----", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "1_17_1": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "---------#XXXX-", "XXXXXXX---XXXX-", "XXXXXXX----*---", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "15_6_0": ["^^^^^^^^^^^^^^^", "---------------", "---------------", "XXX--X--X----XX", "X*X--X--X^---X*", "X&---XXXX^^--X&", "X*X--X--X^---X*", "XXX--X--X----XX", "/\\\\-----//\\\\//\\", "\\//-----\\\\//\\\\/", "^^^^^^^^^^^^^^^"], "15_6_1": ["^^^^^^^^^^^^^^^", "---------------", "---------------", "XXX--X--X----XX", "X*X--X--X^---X*", "X&---XXXX^^--X&", "X*X--X--X^---X*", "XXX--X--X----XX", "/\\\\-----//\\\\//\\", "\\//-----\\\\//\\\\/", "^^^^^^^^^^^^^^^"], "15_6_2": ["^^^^^^^^^^^^^^^", "---------------", "---------------", "XXX--X--X----XX", "X*X--X--X^---X*", "X&---XXXX^^--X&", "X*X--X--X^---X*", "XXX--X--X----XX", "/\\\\-----//\\\\//\\", "\\//-----\\\\//\\\\/", "^^^^^^^^^^^^^^^"], "4_15_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---#XXXX-----#X", "----XXXX------X", "-----*----*----", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "4_15_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---#XXXX--#XXXX", "----XXXX---XXXX", "-----*------*--", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_15_0": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-----*---*---*-", "XX-------------", "XX----#---#---#", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_15_1": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-----*---*---*-", "XX-------------", "XX----#---#---#", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "8_10_0": ["^^^^--XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "XX----XXXXXXXXX", "*X------*---#XX", "&------------XX", "*X-------#----*", "XX----XXXXXXXXX", "\\\\----XXXXXXXXX", "//----XXXXXXXXX", "^^^^--XXXXXXXXX"], "8_10_1": ["^^^^--XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "XX----XXXXXXXXX", "*X------*---#XX", "&------------XX", "*X-------#----*", "XX----XXXXXXXXX", "\\\\----XXXXXXXXX", "//----XXXXXXXXX", "^^^^--XXXXXXXXX"], "7_11_0": ["^^^^^--XXXXXXXX", "-------XXXXXXXX", "-------XXXXXXXX", "XXX----XXXXXXXX", "X*X----XX--#XXX", "X&-----XX---XXX", "X*X----------*-", "XXX----XXXXXXXX", "/\\\\----XXXXXXXX", "\\//----XXXXXXXX", "^^^^^--XXXXXXXX"], "7_11_1": ["^^^^^--XXXXXXXX", "-------XXXXXXXX", "-------XXXXXXXX", "XXX----XXXXXXXX", "X*X----XX--#XXX", "X&-----XX---XXX", "X*X----------*-", "XXX----XXXXXXXX", "/\\\\----XXXXXXXX", "\\//----XXXXXXXX", "^^^^^--XXXXXXXX"] };


/***/ }),

/***/ "./src/generation/roomGenerator.ts":
/*!*****************************************!*\
  !*** ./src/generation/roomGenerator.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomGenerator = void 0;
const rot_js_1 = __webpack_require__(/*! rot-js */ "./node_modules/rot-js/lib/index.js");
const gameMap_1 = __webpack_require__(/*! ../game/gameMap */ "./src/game/gameMap.ts");
const baselineGenerator_1 = __webpack_require__(/*! ./baselineGenerator */ "./src/generation/baselineGenerator.ts");
const levels_1 = __webpack_require__(/*! ./levels */ "./src/generation/levels.ts");
const tileFactory_1 = __importDefault(__webpack_require__(/*! ../tile/tileFactory */ "./src/tile/tileFactory.ts"));
const generationUtility_1 = __webpack_require__(/*! ./generationUtility */ "./src/generation/generationUtility.ts");
class Rectangle {
    constructor(x, y, width, height) {
        this.x1 = x;
        this.x2 = x + width;
        this.y1 = y;
        this.y2 = y + height;
    }
    center() {
        return [Math.round((this.x1 + this.x2) / 2), Math.round((this.y1 + this.y2) / 2)];
    }
    intersects(others) {
        for (let other of others) {
            if (this.x1 - 1 <= other.x2 &&
                this.x2 + 1 >= other.x1 &&
                this.y1 - 1 <= other.y2 &&
                this.y2 + 1 >= other.y1) {
                return true;
            }
        }
        return false;
    }
}
class RoomGenerator extends baselineGenerator_1.BaseLineGenerator {
    generate() {
        let map = new gameMap_1.GameMap(this.width, this.height);
        // We know every room in this dataset has the same dimensions
        const w = levels_1.LEVELS['0_0_0'][0].length; // room width
        const h = levels_1.LEVELS['0_0_0'].length; // room height
        const levelNames = Object.keys(levels_1.LEVELS);
        // generate rectangles to fill in
        let rooms = [];
        for (let i = 0; i < 30; ++i) {
            // position for the room
            const xPos = 1 + Math.round(rot_js_1.RNG.getUniform() * (this.width - w - 2));
            const yPos = 1 + Math.round(rot_js_1.RNG.getUniform() * (this.height - h - 2));
            let newRoom = new Rectangle(xPos, yPos, w, h);
            // check for intersections
            if (newRoom.intersects(rooms)) {
                continue;
            }
            // if no intersection, place the room in the map
            rooms.push(newRoom);
            // get a room and draw it.
            // NOTE: right now we aren't guaranteeing a path between the room because
            // the room itself may be blocking
            const roomIndex = Math.floor(rot_js_1.RNG.getUniform() * levelNames.length);
            const room = levels_1.LEVELS[levelNames[roomIndex]];
            for (let y = 0; y < h; ++y) {
                for (let x = 0; x < w; ++x) {
                    switch (room[y][x]) {
                        case 'X': {
                            // default is wall.
                            break;
                        }
                        case '-': {
                            map.setTile(x + xPos, y + yPos, tileFactory_1.default.floor);
                        }
                        default: {
                            map.setTile(x + xPos, y + yPos, tileFactory_1.default.floor);
                            console.warn(`Unhandled tile type: ${room[y][x]}`);
                            break;
                        }
                    }
                }
            }
            // draw a path between the two rooms
            if (rooms.length > 1) {
                let [x1, y1] = rooms[rooms.length - 2].center();
                let [x2, y2] = newRoom.center();
                if (rot_js_1.RNG.getUniform() > 0.8) {
                    (0, generationUtility_1.bresenham)(x1, y1, x2, y2, (x, y) => {
                        map.setTile(x, y, tileFactory_1.default.floor);
                    });
                }
                else {
                    (0, generationUtility_1.straightLineConnection)(x1, y1, x2, y2, (x, y) => {
                        map.setTile(x, y, tileFactory_1.default.floor);
                    });
                }
            }
        }
        const center = rooms[rooms.length - 1].center();
        return [map, center[0], center[1]];
    }
}
exports.RoomGenerator = RoomGenerator;


/***/ }),

/***/ "./src/tile/tile.ts":
/*!**************************!*\
  !*** ./src/tile/tile.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tile = void 0;
class Tile {
    constructor(char, walkable, inViewFG, inViewBG, outOfViewFG, outOfViewBG) {
        this.char = char;
        this.walkable = walkable;
        this.inViewFG = inViewFG;
        this.inViewBG = inViewBG;
        this.outOfViewFG = outOfViewFG;
        this.outOfViewBG = outOfViewBG;
    }
}
exports.Tile = Tile;


/***/ }),

/***/ "./src/tile/tileFactory.ts":
/*!*********************************!*\
  !*** ./src/tile/tileFactory.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const colors_1 = __importDefault(__webpack_require__(/*! ../utility/colors */ "./src/utility/colors.ts"));
const tile_1 = __webpack_require__(/*! ./tile */ "./src/tile/tile.ts");
let tileFactory = {};
tileFactory.floor = new tile_1.Tile('.', true, colors_1.default.visible, colors_1.default.black, colors_1.default.darkGray, colors_1.default.black);
tileFactory.wall = new tile_1.Tile('#', false, colors_1.default.visible, colors_1.default.black, colors_1.default.darkGray, colors_1.default.black);
tileFactory.downStairs = new tile_1.Tile('>', false, colors_1.default.lightGray, colors_1.default.black, colors_1.default.darkGray, colors_1.default.black);
exports["default"] = tileFactory;


/***/ }),

/***/ "./src/ui/button.ts":
/*!**************************!*\
  !*** ./src/ui/button.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Button = void 0;
const util_1 = __webpack_require__(/*! ./util */ "./src/ui/util.ts");
const inputManager_1 = __webpack_require__(/*! ../game/inputManager */ "./src/game/inputManager.ts");
class Button {
    constructor(x, y, width, height, text, textColor, textHighlightedColor, frameColor, frameHighlightedColor, callback) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.textColor = textColor;
        this.textHighlightedColor = textHighlightedColor;
        this.frameColor = frameColor;
        this.frameHighlightedColor = frameHighlightedColor;
        this.highlighted = false;
        this.callback = callback;
    }
    render(display) {
        // choose colors based on whether or not the button is highlighted
        const frameColor = this.highlighted ? this.frameHighlightedColor : this.frameColor;
        const textColor = this.highlighted ? this.textHighlightedColor : this.textColor;
        // draw frame
        (0, util_1.drawFrame)(display, this.x, this.y, this.width, this.height, frameColor);
        // drawFrame(display, this.x, this.y, this.width, this.height);
        // draw text in the center of the button
        let center = this.width / 2;
        display.drawText(this.x + center - this.text.length / 2, this.y + 1, `%c{${textColor}}${this.text}`);
    }
    update() {
        if (this.highlighted && inputManager_1.InputManager.isKeyDown(inputManager_1.Key.ENTER)) {
            this.callback();
        }
    }
}
exports.Button = Button;


/***/ }),

/***/ "./src/ui/menu.ts":
/*!************************!*\
  !*** ./src/ui/menu.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Menu = void 0;
const util_1 = __webpack_require__(/*! ./util */ "./src/ui/util.ts");
const inputManager_1 = __webpack_require__(/*! ../game/inputManager */ "./src/game/inputManager.ts");
class Menu {
    constructor(x, y, width, height, title, drawOutline, exitOnEscape, updateCallback) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.title = title;
        this.drawOutline = drawOutline;
        this.exitOnEscape = exitOnEscape;
        this.buttons = [];
        this.buttonIndex = 0;
        this.text = [];
        this.shouldRender = true;
        this.shouldExit = false;
        this.updateCallback = updateCallback;
        this.childMenu = null;
    }
    addButton(button) {
        this.buttons.push(button);
        if (this.buttons.length === 1) {
            this.buttons[0].highlighted = true;
        }
    }
    addText(text) {
        this.text.push(text);
    }
    render(display) {
        (0, util_1.drawFrameWithTitle)(display, this.title, this.x, this.y, this.width, this.height);
        if (this.childMenu) {
            this.childMenu.render(display);
        }
        else {
            for (let b of this.buttons) {
                b.render(display);
            }
            for (let t of this.text) {
                t.render(display);
            }
        }
        this.shouldRender = false;
    }
    update() {
        if (this.childMenu) {
            this.childMenu.update();
            if (this.childMenu.shouldExit) {
                this.childMenu = null;
                this.shouldRender = true;
                inputManager_1.InputManager.clear();
            }
            else {
                return;
            }
        }
        if (this.buttons.length > 0) {
            if (inputManager_1.InputManager.isKeyDown(inputManager_1.Key.RIGHT) || inputManager_1.InputManager.isKeyDown(inputManager_1.Key.D)) {
                this.buttons[this.buttonIndex].highlighted = false;
                this.buttonIndex = Math.min(this.buttons.length - 1, this.buttonIndex + 1);
                this.buttons[this.buttonIndex].highlighted = true;
                this.shouldRender = true;
            }
            else if (inputManager_1.InputManager.isKeyDown(inputManager_1.Key.LEFT) || inputManager_1.InputManager.isKeyDown(inputManager_1.Key.A)) {
                this.buttons[this.buttonIndex].highlighted = false;
                this.buttonIndex = Math.max(0, this.buttonIndex - 1);
                this.buttons[this.buttonIndex].highlighted = true;
                this.shouldRender = true;
            }
            this.buttons[this.buttonIndex].update();
        }
        if (this.exitOnEscape && inputManager_1.InputManager.isKeyDown(inputManager_1.Key.ESCAPE)) {
            this.shouldExit = true;
            inputManager_1.InputManager.clear();
        }
        else {
            this.updateCallback();
        }
    }
}
exports.Menu = Menu;


/***/ }),

/***/ "./src/ui/text.ts":
/*!************************!*\
  !*** ./src/ui/text.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Text = void 0;
class Text {
    constructor(x, y, text, fg, bg) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.fg = fg;
        this.bg = bg;
    }
    render(display) {
        // for(let c of this.text) {
        //   display.drawOver(this.x, this.y, c, this.fg, this.bg);
        // }
        display.drawText(this.x, this.y, `%c{${this.fg}}%b{${this.bg}}${this.text}`);
    }
}
exports.Text = Text;


/***/ }),

/***/ "./src/ui/uiFactory.ts":
/*!*****************************!*\
  !*** ./src/ui/uiFactory.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mainMenu = exports.helpMenu = void 0;
const inputManager_1 = __webpack_require__(/*! ../game/inputManager */ "./src/game/inputManager.ts");
const colors_1 = __importDefault(__webpack_require__(/*! ../utility/colors */ "./src/utility/colors.ts"));
const button_1 = __webpack_require__(/*! ./button */ "./src/ui/button.ts");
const menu_1 = __webpack_require__(/*! ./menu */ "./src/ui/menu.ts");
const text_1 = __webpack_require__(/*! ./text */ "./src/ui/text.ts");
function helpMenu(width, height) {
    const x = width / 4;
    const y = height / 4;
    let m = new menu_1.Menu(x, y, width / 2, height / 2, "Help", true, true, () => {
        if (inputManager_1.InputManager.isKeyDown(inputManager_1.Key.H, inputManager_1.Key.ENTER, inputManager_1.Key.ESCAPE)) {
            m.shouldExit = true;
        }
    });
    m.addButton(new button_1.Button(width / 2 - 4, height - height / 4 - 4, 8, 3, "Ok", colors_1.default.lightGray, colors_1.default.white, colors_1.default.lightGray, colors_1.default.white, () => { }));
    m.addText(new text_1.Text(x + 3, y + 3, "WASD or arrow keys to move.", colors_1.default.white, colors_1.default.black));
    m.addText(new text_1.Text(x + 3, y + 4, "I to inspect.", colors_1.default.white, colors_1.default.black));
    return m;
}
exports.helpMenu = helpMenu;
function mainMenu(width, height, callback) {
    let m = new menu_1.Menu(0, 0, width, height, "Main Menu", true, false, () => {
        if (inputManager_1.InputManager.isKeyDown(inputManager_1.Key.SPACE, inputManager_1.Key.ENTER)) {
            m.shouldExit = true;
            callback();
        }
        else if (inputManager_1.InputManager.isKeyDown(inputManager_1.Key.H)) {
            m.childMenu = helpMenu(width, height);
            m.shouldRender = true;
            inputManager_1.InputManager.clear();
        }
    });
    const title = "Scary Dungeon";
    m.addText(new text_1.Text(width / 2 - title.length / 2, height / 2 - 10, title, colors_1.default.yellow, colors_1.default.black));
    const attribution = "by Colan F. Biemer";
    m.addText(new text_1.Text(width / 2 - attribution.length / 2, height / 2 - 8, attribution, colors_1.default.lightGray, colors_1.default.black));
    const instructions = "Press space to start or h for instructions.";
    m.addText(new text_1.Text(width / 2 - instructions.length / 2, height / 2, instructions, colors_1.default.white, colors_1.default.black));
    return m;
}
exports.mainMenu = mainMenu;


/***/ }),

/***/ "./src/ui/util.ts":
/*!************************!*\
  !*** ./src/ui/util.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.drawFrame = exports.drawFrameWithTitle = void 0;
const topLeft = '┌';
const topRight = '┐';
const bottomLeft = '└';
const bottomRight = '┘';
const vertical = '│';
const horizontal = '─';
const leftTitle = '┤';
const rightTitle = '├';
const empty = ' ';
function drawFrameWithTitle(display, title, x, y, width, height) {
    // https://github.com/bodiddlie/js-rogue-tutorial/blob/main/src/render-functions.ts#L56
    const innerWidth = width - 2;
    const innerHeight = height - 2;
    const remainingAfterTitle = innerWidth - (title.length + 2); // adding two because of the borders on left and right
    const left = Math.floor(remainingAfterTitle / 2);
    const topRow = topLeft +
        horizontal.repeat(left) +
        leftTitle +
        title +
        rightTitle +
        horizontal.repeat(remainingAfterTitle - left) +
        topRight;
    const middleRow = vertical + empty.repeat(innerWidth) + vertical;
    const bottomRow = bottomLeft + horizontal.repeat(innerWidth) + bottomRight;
    display.drawText(x, y, topRow);
    for (let i = 1; i <= innerHeight; i++) {
        display.drawText(x, y + i, middleRow);
    }
    display.drawText(x, y + height - 1, bottomRow);
}
exports.drawFrameWithTitle = drawFrameWithTitle;
function drawFrame(display, x, y, width, height, frameColor) {
    // https://github.com/bodiddlie/js-rogue-tutorial/blob/main/src/render-functions.ts#L56
    const innerWidth = width - 2;
    const innerHeight = height - 2;
    const topRow = topLeft + horizontal.repeat(innerWidth) + topRight;
    const middleRow = vertical + empty.repeat(innerWidth) + vertical;
    const bottomRow = bottomLeft + horizontal.repeat(innerWidth) + bottomRight;
    display.drawText(x, y, `%c{${frameColor}}${topRow}`);
    for (let i = 1; i <= innerHeight; i++) {
        display.drawText(x, y + i, `%c{${frameColor}}${middleRow}`);
    }
    display.drawText(x, y + height - 1, `%c{${frameColor}}${bottomRow}`);
}
exports.drawFrame = drawFrame;


/***/ }),

/***/ "./src/utility/colors.ts":
/*!*******************************!*\
  !*** ./src/utility/colors.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = {
    error: "rgba(255,40,40,1)",
    white: "rgba(255,255,255,1)",
    black: "rgba(0,0,0,0)",
    darkGray: "rgba(70,70,70,1)",
    lightGray: "rgba(169,169,169,1)",
    yellow: "rgba(253,164,15,1)",
    visible: "rgba(250,250,250,1)",
};


/***/ }),

/***/ "./src/utility/error.ts":
/*!******************************!*\
  !*** ./src/utility/error.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assert = void 0;
function assert(condition) {
    if (!condition) {
        console.error('Assertion fail!');
        console.trace();
    }
}
exports.assert = assert;


/***/ }),

/***/ "./src/utility/messageLog.ts":
/*!***********************************!*\
  !*** ./src/utility/messageLog.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageLog = void 0;
const colors_1 = __importDefault(__webpack_require__(/*! ./colors */ "./src/utility/colors.ts"));
class Message {
    constructor(text, color) {
        this.text = text;
        this.color = color;
        this.count = 1;
    }
    incrementCount() {
        this.count += 1;
    }
    sameText(text) {
        return this.text === text;
    }
    getText() {
        let t = this.count > 1 ? `${this.text} x(${this.count})` : this.text;
        return `<tag style="color: ${this.color};">${t}</tag>`;
    }
}
class MessageLog {
    static addMessage(text, color, stack) {
        const len = MessageLog.messages.length;
        if (stack && len > 0 && MessageLog.messages[len - 1].sameText(text)) {
            MessageLog.messages[len - 1].incrementCount();
        }
        else {
            MessageLog.messages.push(new Message(text, color));
        }
        MessageLog.print();
    }
    static addErrorMessage(text, stack) {
        MessageLog.addMessage(text, colors_1.default.error, stack);
    }
    static print() {
        const maxLines = 5;
        const len = MessageLog.messages.length;
        let messages = document.querySelector("#messages");
        let lines = [];
        for (var i = 0; i < len; ++i) {
            const message = MessageLog.messages[len - 1 - i];
            lines.push(message.getText());
            if (lines.length > maxLines) {
                break;
            }
        }
        messages.innerHTML = lines.join("\n");
    }
}
exports.MessageLog = MessageLog;
MessageLog.messages = [];


/***/ }),

/***/ "./src/utility/renderOrder.ts":
/*!************************************!*\
  !*** ./src/utility/renderOrder.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RenderOrder = void 0;
var RenderOrder;
(function (RenderOrder) {
    RenderOrder[RenderOrder["Corpse"] = 0] = "Corpse";
    RenderOrder[RenderOrder["Item"] = 1] = "Item";
    RenderOrder[RenderOrder["Actor"] = 2] = "Actor";
})(RenderOrder = exports.RenderOrder || (exports.RenderOrder = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const game_1 = __webpack_require__(/*! ./game/game */ "./src/game/game.ts");
document.body.onload = () => {
    let game = new game_1.Game();
    game.start();
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLGlDQUFpQywrQ0FBSztBQUN0QyxrQkFBa0Isa0JBQWtCO0FBQ3BDO0FBQ087QUFDUCxpQ0FBaUMsK0NBQUs7QUFDdEMsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL1VBO0FBQ087QUFDUDtBQUNPO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkNBQUcsVUFBVTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdklpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtEQUFNO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxrQkFBa0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsa0JBQWtCO0FBQzlDO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtCQUFrQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0Esb0NBQW9DLFdBQVcsSUFBSSxXQUFXO0FBQzlELHFDQUFxQyxZQUFZLElBQUksRUFBRTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7Ozs7Ozs7Ozs7O0FDdERhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx3Q0FBd0MsbUJBQW1CLEtBQUs7Ozs7Ozs7VUNSakU7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7O0FDTmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZUFBZSxtQkFBTyxDQUFDLHVDQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL01pbkhlYXAuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2NvbG9yLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Rpc3BsYXkvYmFja2VuZC5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZGlzcGxheS9jYW52YXMuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Rpc3BsYXkvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZGlzcGxheS9oZXguanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Rpc3BsYXkvcmVjdC5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZGlzcGxheS90ZXJtLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9kaXNwbGF5L3RpbGUtZ2wuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Rpc3BsYXkvdGlsZS5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZW5naW5lLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9ldmVudHF1ZXVlLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9mb3YvZGlzY3JldGUtc2hhZG93Y2FzdGluZy5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZm92L2Zvdi5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZm92L2luZGV4LmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9mb3YvcHJlY2lzZS1zaGFkb3djYXN0aW5nLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9mb3YvcmVjdXJzaXZlLXNoYWRvd2Nhc3RpbmcuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2luZGV4LmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9saWdodGluZy5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL2FyZW5hLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9tYXAvY2VsbHVsYXIuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9kaWdnZXIuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9kaXZpZGVkbWF6ZS5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL2R1bmdlb24uanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9lbGxlcm1hemUuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9mZWF0dXJlcy5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL2ljZXltYXplLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9tYXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9tYXAuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9yb2d1ZS5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL3VuaWZvcm0uanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL25vaXNlL2luZGV4LmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9ub2lzZS9ub2lzZS5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbm9pc2Uvc2ltcGxleC5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvcGF0aC9hc3Rhci5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvcGF0aC9kaWprc3RyYS5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvcGF0aC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvcGF0aC9wYXRoLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9ybmcuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3NjaGVkdWxlci9hY3Rpb24uanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3NjaGVkdWxlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvc2NoZWR1bGVyL3NjaGVkdWxlci5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvc2NoZWR1bGVyL3NpbXBsZS5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvc2NoZWR1bGVyL3NwZWVkLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9zdHJpbmdnZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3RleHQuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3V0aWwuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9hY3Rpb24vZGlyZWN0aW9uQWN0aW9uLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvYWN0aW9uL21vdmVBY3Rpb24udHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9iZWhhdmlvci9haUJlaGF2aW9yLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvYmVoYXZpb3IvcGxheWVyQmVoYXZpb3IudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9lbnRpdHkvYWN0b3IudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9lbnRpdHkvYWN0b3JGYWN0b3J5LnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvZW50aXR5L2VudGl0eS50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2dhbWUvZ2FtZS50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2dhbWUvZ2FtZU1hcC50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2dhbWUvaW5wdXRNYW5hZ2VyLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvZ2VuZXJhdGlvbi9iYXNlbGluZUdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2dlbmVyYXRpb24vZ2VuZXJhdGlvblV0aWxpdHkudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9nZW5lcmF0aW9uL2xldmVscy50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2dlbmVyYXRpb24vcm9vbUdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL3RpbGUvdGlsZS50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL3RpbGUvdGlsZUZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy91aS9idXR0b24udHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy91aS9tZW51LnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvdWkvdGV4dC50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL3VpL3VpRmFjdG9yeS50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL3VpL3V0aWwudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy91dGlsaXR5L2NvbG9ycy50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL3V0aWxpdHkvZXJyb3IudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy91dGlsaXR5L21lc3NhZ2VMb2cudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy91dGlsaXR5L3JlbmRlck9yZGVyLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNaW5IZWFwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5oZWFwID0gW107XG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gMDtcbiAgICB9XG4gICAgbGVzc1RoYW4oYSwgYikge1xuICAgICAgICByZXR1cm4gYS5rZXkgPT0gYi5rZXkgPyBhLnRpbWVzdGFtcCA8IGIudGltZXN0YW1wIDogYS5rZXkgPCBiLmtleTtcbiAgICB9XG4gICAgc2hpZnQodikge1xuICAgICAgICB0aGlzLmhlYXAgPSB0aGlzLmhlYXAubWFwKCh7IGtleSwgdmFsdWUsIHRpbWVzdGFtcCB9KSA9PiAoeyBrZXk6IGtleSArIHYsIHZhbHVlLCB0aW1lc3RhbXAgfSkpO1xuICAgIH1cbiAgICBsZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlYXAubGVuZ3RoO1xuICAgIH1cbiAgICBwdXNoKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgKz0gMTtcbiAgICAgICAgY29uc3QgbG9jID0gdGhpcy5sZW4oKTtcbiAgICAgICAgdGhpcy5oZWFwLnB1c2goeyB2YWx1ZSwgdGltZXN0YW1wOiB0aGlzLnRpbWVzdGFtcCwga2V5IH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZVVwKGxvYyk7XG4gICAgfVxuICAgIHBvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMubGVuKCkgPT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gZWxlbWVudCB0byBwb3BcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdG9wID0gdGhpcy5oZWFwWzBdO1xuICAgICAgICBpZiAodGhpcy5sZW4oKSA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhcFswXSA9IHRoaXMuaGVhcC5wb3AoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRG93bigwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGVhcC5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9wO1xuICAgIH1cbiAgICBmaW5kKHYpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbigpOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh2ID09IHRoaXMuaGVhcFtpXS52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlYXBbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJlbW92ZSh2KSB7XG4gICAgICAgIGxldCBpbmRleCA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW4oKTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodiA9PSB0aGlzLmhlYXBbaV0udmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubGVuKCkgPiAxKSB7XG4gICAgICAgICAgICBsZXQgbGFzdCA9IHRoaXMuaGVhcC5wb3AoKTtcbiAgICAgICAgICAgIGlmIChsYXN0LnZhbHVlICE9IHYpIHsgLy8gaWYgdGhlIGxhc3Qgb25lIGlzIGJlaW5nIHJlbW92ZWQsIGRvIG5vdGhpbmdcbiAgICAgICAgICAgICAgICB0aGlzLmhlYXBbaW5kZXhdID0gbGFzdDtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURvd24oaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhlYXAucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHBhcmVudE5vZGUoeCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoeCAtIDEpIC8gMik7XG4gICAgfVxuICAgIGxlZnRDaGlsZE5vZGUoeCkge1xuICAgICAgICByZXR1cm4gMiAqIHggKyAxO1xuICAgIH1cbiAgICByaWdodENoaWxkTm9kZSh4KSB7XG4gICAgICAgIHJldHVybiAyICogeCArIDI7XG4gICAgfVxuICAgIGV4aXN0Tm9kZSh4KSB7XG4gICAgICAgIHJldHVybiB4ID49IDAgJiYgeCA8IHRoaXMuaGVhcC5sZW5ndGg7XG4gICAgfVxuICAgIHN3YXAoeCwgeSkge1xuICAgICAgICBjb25zdCB0ID0gdGhpcy5oZWFwW3hdO1xuICAgICAgICB0aGlzLmhlYXBbeF0gPSB0aGlzLmhlYXBbeV07XG4gICAgICAgIHRoaXMuaGVhcFt5XSA9IHQ7XG4gICAgfVxuICAgIG1pbk5vZGUobnVtYmVycykge1xuICAgICAgICBjb25zdCB2YWxpZG51bWJlcnMgPSBudW1iZXJzLmZpbHRlcih0aGlzLmV4aXN0Tm9kZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgbGV0IG1pbmltYWwgPSB2YWxpZG51bWJlcnNbMF07XG4gICAgICAgIGZvciAoY29uc3QgaSBvZiB2YWxpZG51bWJlcnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxlc3NUaGFuKHRoaXMuaGVhcFtpXSwgdGhpcy5oZWFwW21pbmltYWxdKSkge1xuICAgICAgICAgICAgICAgIG1pbmltYWwgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaW5pbWFsO1xuICAgIH1cbiAgICB1cGRhdGVVcCh4KSB7XG4gICAgICAgIGlmICh4ID09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUoeCk7XG4gICAgICAgIGlmICh0aGlzLmV4aXN0Tm9kZShwYXJlbnQpICYmIHRoaXMubGVzc1RoYW4odGhpcy5oZWFwW3hdLCB0aGlzLmhlYXBbcGFyZW50XSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3dhcCh4LCBwYXJlbnQpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVVcChwYXJlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZURvd24oeCkge1xuICAgICAgICBjb25zdCBsZWZ0Q2hpbGQgPSB0aGlzLmxlZnRDaGlsZE5vZGUoeCk7XG4gICAgICAgIGNvbnN0IHJpZ2h0Q2hpbGQgPSB0aGlzLnJpZ2h0Q2hpbGROb2RlKHgpO1xuICAgICAgICBpZiAoIXRoaXMuZXhpc3ROb2RlKGxlZnRDaGlsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtID0gdGhpcy5taW5Ob2RlKFt4LCBsZWZ0Q2hpbGQsIHJpZ2h0Q2hpbGRdKTtcbiAgICAgICAgaWYgKG0gIT0geCkge1xuICAgICAgICAgICAgdGhpcy5zd2FwKHgsIG0pO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVEb3duKG0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlYnVnUHJpbnQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaGVhcCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY2xhbXAgfSBmcm9tIFwiLi91dGlsLmpzXCI7XG5pbXBvcnQgUk5HIGZyb20gXCIuL3JuZy5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21TdHJpbmcoc3RyKSB7XG4gICAgbGV0IGNhY2hlZCwgcjtcbiAgICBpZiAoc3RyIGluIENBQ0hFKSB7XG4gICAgICAgIGNhY2hlZCA9IENBQ0hFW3N0cl07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoc3RyLmNoYXJBdCgwKSA9PSBcIiNcIikgeyAvLyBoZXggcmdiXG4gICAgICAgICAgICBsZXQgbWF0Y2hlZCA9IHN0ci5tYXRjaCgvWzAtOWEtZl0vZ2kpIHx8IFtdO1xuICAgICAgICAgICAgbGV0IHZhbHVlcyA9IG1hdGNoZWQubWFwKCh4KSA9PiBwYXJzZUludCh4LCAxNikpO1xuICAgICAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPT0gMykge1xuICAgICAgICAgICAgICAgIGNhY2hlZCA9IHZhbHVlcy5tYXAoKHgpID0+IHggKiAxNyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbaSArIDFdICs9IDE2ICogdmFsdWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYWNoZWQgPSB2YWx1ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKHIgPSBzdHIubWF0Y2goL3JnYlxcKChbMC05LCBdKylcXCkvaSkpKSB7IC8vIGRlY2ltYWwgcmdiXG4gICAgICAgICAgICBjYWNoZWQgPSByWzFdLnNwbGl0KC9cXHMqLFxccyovKS5tYXAoKHgpID0+IHBhcnNlSW50KHgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy8gaHRtbCBuYW1lXG4gICAgICAgICAgICBjYWNoZWQgPSBbMCwgMCwgMF07XG4gICAgICAgIH1cbiAgICAgICAgQ0FDSEVbc3RyXSA9IGNhY2hlZDtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZC5zbGljZSgpO1xufVxuLyoqXG4gKiBBZGQgdHdvIG9yIG1vcmUgY29sb3JzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGQoY29sb3IxLCAuLi5jb2xvcnMpIHtcbiAgICBsZXQgcmVzdWx0ID0gY29sb3IxLnNsaWNlKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xvcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHJlc3VsdFtpXSArPSBjb2xvcnNbal1baV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogQWRkIHR3byBvciBtb3JlIGNvbG9ycywgTU9ESUZJRVMgRklSU1QgQVJHVU1FTlRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZF8oY29sb3IxLCAuLi5jb2xvcnMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbG9ycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29sb3IxW2ldICs9IGNvbG9yc1tqXVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29sb3IxO1xufVxuLyoqXG4gKiBNdWx0aXBseSAobWl4KSB0d28gb3IgbW9yZSBjb2xvcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5KGNvbG9yMSwgLi4uY29sb3JzKSB7XG4gICAgbGV0IHJlc3VsdCA9IGNvbG9yMS5zbGljZSgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sb3JzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICByZXN1bHRbaV0gKj0gY29sb3JzW2pdW2ldIC8gMjU1O1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdFtpXSA9IE1hdGgucm91bmQocmVzdWx0W2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogTXVsdGlwbHkgKG1peCkgdHdvIG9yIG1vcmUgY29sb3JzLCBNT0RJRklFUyBGSVJTVCBBUkdVTUVOVFxuICovXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHlfKGNvbG9yMSwgLi4uY29sb3JzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xvcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbG9yMVtpXSAqPSBjb2xvcnNbal1baV0gLyAyNTU7XG4gICAgICAgIH1cbiAgICAgICAgY29sb3IxW2ldID0gTWF0aC5yb3VuZChjb2xvcjFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3IxO1xufVxuLyoqXG4gKiBJbnRlcnBvbGF0ZSAoYmxlbmQpIHR3byBjb2xvcnMgd2l0aCBhIGdpdmVuIGZhY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJwb2xhdGUoY29sb3IxLCBjb2xvcjIsIGZhY3RvciA9IDAuNSkge1xuICAgIGxldCByZXN1bHQgPSBjb2xvcjEuc2xpY2UoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICByZXN1bHRbaV0gPSBNYXRoLnJvdW5kKHJlc3VsdFtpXSArIGZhY3RvciAqIChjb2xvcjJbaV0gLSBjb2xvcjFbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBjb25zdCBsZXJwID0gaW50ZXJwb2xhdGU7XG4vKipcbiAqIEludGVycG9sYXRlIChibGVuZCkgdHdvIGNvbG9ycyB3aXRoIGEgZ2l2ZW4gZmFjdG9yIGluIEhTTCBtb2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcnBvbGF0ZUhTTChjb2xvcjEsIGNvbG9yMiwgZmFjdG9yID0gMC41KSB7XG4gICAgbGV0IGhzbDEgPSByZ2IyaHNsKGNvbG9yMSk7XG4gICAgbGV0IGhzbDIgPSByZ2IyaHNsKGNvbG9yMik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgaHNsMVtpXSArPSBmYWN0b3IgKiAoaHNsMltpXSAtIGhzbDFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gaHNsMnJnYihoc2wxKTtcbn1cbmV4cG9ydCBjb25zdCBsZXJwSFNMID0gaW50ZXJwb2xhdGVIU0w7XG4vKipcbiAqIENyZWF0ZSBhIG5ldyByYW5kb20gY29sb3IgYmFzZWQgb24gdGhpcyBvbmVcbiAqIEBwYXJhbSBjb2xvclxuICogQHBhcmFtIGRpZmYgU2V0IG9mIHN0YW5kYXJkIGRldmlhdGlvbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbWl6ZShjb2xvciwgZGlmZikge1xuICAgIGlmICghKGRpZmYgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgZGlmZiA9IE1hdGgucm91bmQoUk5HLmdldE5vcm1hbCgwLCBkaWZmKSk7XG4gICAgfVxuICAgIGxldCByZXN1bHQgPSBjb2xvci5zbGljZSgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIHJlc3VsdFtpXSArPSAoZGlmZiBpbnN0YW5jZW9mIEFycmF5ID8gTWF0aC5yb3VuZChSTkcuZ2V0Tm9ybWFsKDAsIGRpZmZbaV0pKSA6IGRpZmYpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbiBSR0IgY29sb3IgdmFsdWUgdG8gSFNMLiBFeHBlY3RzIDAuLjI1NSBpbnB1dHMsIHByb2R1Y2VzIDAuLjEgb3V0cHV0cy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJnYjJoc2woY29sb3IpIHtcbiAgICBsZXQgciA9IGNvbG9yWzBdIC8gMjU1O1xuICAgIGxldCBnID0gY29sb3JbMV0gLyAyNTU7XG4gICAgbGV0IGIgPSBjb2xvclsyXSAvIDI1NTtcbiAgICBsZXQgbWF4ID0gTWF0aC5tYXgociwgZywgYiksIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgIGxldCBoID0gMCwgcywgbCA9IChtYXggKyBtaW4pIC8gMjtcbiAgICBpZiAobWF4ID09IG1pbikge1xuICAgICAgICBzID0gMDsgLy8gYWNocm9tYXRpY1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbGV0IGQgPSBtYXggLSBtaW47XG4gICAgICAgIHMgPSAobCA+IDAuNSA/IGQgLyAoMiAtIG1heCAtIG1pbikgOiBkIC8gKG1heCArIG1pbikpO1xuICAgICAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgICAgICAgY2FzZSByOlxuICAgICAgICAgICAgICAgIGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZzpcbiAgICAgICAgICAgICAgICBoID0gKGIgLSByKSAvIGQgKyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBiOlxuICAgICAgICAgICAgICAgIGggPSAociAtIGcpIC8gZCArIDQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaCAvPSA2O1xuICAgIH1cbiAgICByZXR1cm4gW2gsIHMsIGxdO1xufVxuZnVuY3Rpb24gaHVlMnJnYihwLCBxLCB0KSB7XG4gICAgaWYgKHQgPCAwKVxuICAgICAgICB0ICs9IDE7XG4gICAgaWYgKHQgPiAxKVxuICAgICAgICB0IC09IDE7XG4gICAgaWYgKHQgPCAxIC8gNilcbiAgICAgICAgcmV0dXJuIHAgKyAocSAtIHApICogNiAqIHQ7XG4gICAgaWYgKHQgPCAxIC8gMilcbiAgICAgICAgcmV0dXJuIHE7XG4gICAgaWYgKHQgPCAyIC8gMylcbiAgICAgICAgcmV0dXJuIHAgKyAocSAtIHApICogKDIgLyAzIC0gdCkgKiA2O1xuICAgIHJldHVybiBwO1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbiBIU0wgY29sb3IgdmFsdWUgdG8gUkdCLiBFeHBlY3RzIDAuLjEgaW5wdXRzLCBwcm9kdWNlcyAwLi4yNTUgb3V0cHV0cy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhzbDJyZ2IoY29sb3IpIHtcbiAgICBsZXQgbCA9IGNvbG9yWzJdO1xuICAgIGlmIChjb2xvclsxXSA9PSAwKSB7XG4gICAgICAgIGwgPSBNYXRoLnJvdW5kKGwgKiAyNTUpO1xuICAgICAgICByZXR1cm4gW2wsIGwsIGxdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbGV0IHMgPSBjb2xvclsxXTtcbiAgICAgICAgbGV0IHEgPSAobCA8IDAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogcyk7XG4gICAgICAgIGxldCBwID0gMiAqIGwgLSBxO1xuICAgICAgICBsZXQgciA9IGh1ZTJyZ2IocCwgcSwgY29sb3JbMF0gKyAxIC8gMyk7XG4gICAgICAgIGxldCBnID0gaHVlMnJnYihwLCBxLCBjb2xvclswXSk7XG4gICAgICAgIGxldCBiID0gaHVlMnJnYihwLCBxLCBjb2xvclswXSAtIDEgLyAzKTtcbiAgICAgICAgcmV0dXJuIFtNYXRoLnJvdW5kKHIgKiAyNTUpLCBNYXRoLnJvdW5kKGcgKiAyNTUpLCBNYXRoLnJvdW5kKGIgKiAyNTUpXTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gdG9SR0IoY29sb3IpIHtcbiAgICBsZXQgY2xhbXBlZCA9IGNvbG9yLm1hcCh4ID0+IGNsYW1wKHgsIDAsIDI1NSkpO1xuICAgIHJldHVybiBgcmdiKCR7Y2xhbXBlZC5qb2luKFwiLFwiKX0pYDtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0b0hleChjb2xvcikge1xuICAgIGxldCBjbGFtcGVkID0gY29sb3IubWFwKHggPT4gY2xhbXAoeCwgMCwgMjU1KS50b1N0cmluZygxNikucGFkU3RhcnQoMiwgXCIwXCIpKTtcbiAgICByZXR1cm4gYCMke2NsYW1wZWQuam9pbihcIlwiKX1gO1xufVxuY29uc3QgQ0FDSEUgPSB7XG4gICAgXCJibGFja1wiOiBbMCwgMCwgMF0sXG4gICAgXCJuYXZ5XCI6IFswLCAwLCAxMjhdLFxuICAgIFwiZGFya2JsdWVcIjogWzAsIDAsIDEzOV0sXG4gICAgXCJtZWRpdW1ibHVlXCI6IFswLCAwLCAyMDVdLFxuICAgIFwiYmx1ZVwiOiBbMCwgMCwgMjU1XSxcbiAgICBcImRhcmtncmVlblwiOiBbMCwgMTAwLCAwXSxcbiAgICBcImdyZWVuXCI6IFswLCAxMjgsIDBdLFxuICAgIFwidGVhbFwiOiBbMCwgMTI4LCAxMjhdLFxuICAgIFwiZGFya2N5YW5cIjogWzAsIDEzOSwgMTM5XSxcbiAgICBcImRlZXBza3libHVlXCI6IFswLCAxOTEsIDI1NV0sXG4gICAgXCJkYXJrdHVycXVvaXNlXCI6IFswLCAyMDYsIDIwOV0sXG4gICAgXCJtZWRpdW1zcHJpbmdncmVlblwiOiBbMCwgMjUwLCAxNTRdLFxuICAgIFwibGltZVwiOiBbMCwgMjU1LCAwXSxcbiAgICBcInNwcmluZ2dyZWVuXCI6IFswLCAyNTUsIDEyN10sXG4gICAgXCJhcXVhXCI6IFswLCAyNTUsIDI1NV0sXG4gICAgXCJjeWFuXCI6IFswLCAyNTUsIDI1NV0sXG4gICAgXCJtaWRuaWdodGJsdWVcIjogWzI1LCAyNSwgMTEyXSxcbiAgICBcImRvZGdlcmJsdWVcIjogWzMwLCAxNDQsIDI1NV0sXG4gICAgXCJmb3Jlc3RncmVlblwiOiBbMzQsIDEzOSwgMzRdLFxuICAgIFwic2VhZ3JlZW5cIjogWzQ2LCAxMzksIDg3XSxcbiAgICBcImRhcmtzbGF0ZWdyYXlcIjogWzQ3LCA3OSwgNzldLFxuICAgIFwiZGFya3NsYXRlZ3JleVwiOiBbNDcsIDc5LCA3OV0sXG4gICAgXCJsaW1lZ3JlZW5cIjogWzUwLCAyMDUsIDUwXSxcbiAgICBcIm1lZGl1bXNlYWdyZWVuXCI6IFs2MCwgMTc5LCAxMTNdLFxuICAgIFwidHVycXVvaXNlXCI6IFs2NCwgMjI0LCAyMDhdLFxuICAgIFwicm95YWxibHVlXCI6IFs2NSwgMTA1LCAyMjVdLFxuICAgIFwic3RlZWxibHVlXCI6IFs3MCwgMTMwLCAxODBdLFxuICAgIFwiZGFya3NsYXRlYmx1ZVwiOiBbNzIsIDYxLCAxMzldLFxuICAgIFwibWVkaXVtdHVycXVvaXNlXCI6IFs3MiwgMjA5LCAyMDRdLFxuICAgIFwiaW5kaWdvXCI6IFs3NSwgMCwgMTMwXSxcbiAgICBcImRhcmtvbGl2ZWdyZWVuXCI6IFs4NSwgMTA3LCA0N10sXG4gICAgXCJjYWRldGJsdWVcIjogWzk1LCAxNTgsIDE2MF0sXG4gICAgXCJjb3JuZmxvd2VyYmx1ZVwiOiBbMTAwLCAxNDksIDIzN10sXG4gICAgXCJtZWRpdW1hcXVhbWFyaW5lXCI6IFsxMDIsIDIwNSwgMTcwXSxcbiAgICBcImRpbWdyYXlcIjogWzEwNSwgMTA1LCAxMDVdLFxuICAgIFwiZGltZ3JleVwiOiBbMTA1LCAxMDUsIDEwNV0sXG4gICAgXCJzbGF0ZWJsdWVcIjogWzEwNiwgOTAsIDIwNV0sXG4gICAgXCJvbGl2ZWRyYWJcIjogWzEwNywgMTQyLCAzNV0sXG4gICAgXCJzbGF0ZWdyYXlcIjogWzExMiwgMTI4LCAxNDRdLFxuICAgIFwic2xhdGVncmV5XCI6IFsxMTIsIDEyOCwgMTQ0XSxcbiAgICBcImxpZ2h0c2xhdGVncmF5XCI6IFsxMTksIDEzNiwgMTUzXSxcbiAgICBcImxpZ2h0c2xhdGVncmV5XCI6IFsxMTksIDEzNiwgMTUzXSxcbiAgICBcIm1lZGl1bXNsYXRlYmx1ZVwiOiBbMTIzLCAxMDQsIDIzOF0sXG4gICAgXCJsYXduZ3JlZW5cIjogWzEyNCwgMjUyLCAwXSxcbiAgICBcImNoYXJ0cmV1c2VcIjogWzEyNywgMjU1LCAwXSxcbiAgICBcImFxdWFtYXJpbmVcIjogWzEyNywgMjU1LCAyMTJdLFxuICAgIFwibWFyb29uXCI6IFsxMjgsIDAsIDBdLFxuICAgIFwicHVycGxlXCI6IFsxMjgsIDAsIDEyOF0sXG4gICAgXCJvbGl2ZVwiOiBbMTI4LCAxMjgsIDBdLFxuICAgIFwiZ3JheVwiOiBbMTI4LCAxMjgsIDEyOF0sXG4gICAgXCJncmV5XCI6IFsxMjgsIDEyOCwgMTI4XSxcbiAgICBcInNreWJsdWVcIjogWzEzNSwgMjA2LCAyMzVdLFxuICAgIFwibGlnaHRza3libHVlXCI6IFsxMzUsIDIwNiwgMjUwXSxcbiAgICBcImJsdWV2aW9sZXRcIjogWzEzOCwgNDMsIDIyNl0sXG4gICAgXCJkYXJrcmVkXCI6IFsxMzksIDAsIDBdLFxuICAgIFwiZGFya21hZ2VudGFcIjogWzEzOSwgMCwgMTM5XSxcbiAgICBcInNhZGRsZWJyb3duXCI6IFsxMzksIDY5LCAxOV0sXG4gICAgXCJkYXJrc2VhZ3JlZW5cIjogWzE0MywgMTg4LCAxNDNdLFxuICAgIFwibGlnaHRncmVlblwiOiBbMTQ0LCAyMzgsIDE0NF0sXG4gICAgXCJtZWRpdW1wdXJwbGVcIjogWzE0NywgMTEyLCAyMTZdLFxuICAgIFwiZGFya3Zpb2xldFwiOiBbMTQ4LCAwLCAyMTFdLFxuICAgIFwicGFsZWdyZWVuXCI6IFsxNTIsIDI1MSwgMTUyXSxcbiAgICBcImRhcmtvcmNoaWRcIjogWzE1MywgNTAsIDIwNF0sXG4gICAgXCJ5ZWxsb3dncmVlblwiOiBbMTU0LCAyMDUsIDUwXSxcbiAgICBcInNpZW5uYVwiOiBbMTYwLCA4MiwgNDVdLFxuICAgIFwiYnJvd25cIjogWzE2NSwgNDIsIDQyXSxcbiAgICBcImRhcmtncmF5XCI6IFsxNjksIDE2OSwgMTY5XSxcbiAgICBcImRhcmtncmV5XCI6IFsxNjksIDE2OSwgMTY5XSxcbiAgICBcImxpZ2h0Ymx1ZVwiOiBbMTczLCAyMTYsIDIzMF0sXG4gICAgXCJncmVlbnllbGxvd1wiOiBbMTczLCAyNTUsIDQ3XSxcbiAgICBcInBhbGV0dXJxdW9pc2VcIjogWzE3NSwgMjM4LCAyMzhdLFxuICAgIFwibGlnaHRzdGVlbGJsdWVcIjogWzE3NiwgMTk2LCAyMjJdLFxuICAgIFwicG93ZGVyYmx1ZVwiOiBbMTc2LCAyMjQsIDIzMF0sXG4gICAgXCJmaXJlYnJpY2tcIjogWzE3OCwgMzQsIDM0XSxcbiAgICBcImRhcmtnb2xkZW5yb2RcIjogWzE4NCwgMTM0LCAxMV0sXG4gICAgXCJtZWRpdW1vcmNoaWRcIjogWzE4NiwgODUsIDIxMV0sXG4gICAgXCJyb3N5YnJvd25cIjogWzE4OCwgMTQzLCAxNDNdLFxuICAgIFwiZGFya2toYWtpXCI6IFsxODksIDE4MywgMTA3XSxcbiAgICBcInNpbHZlclwiOiBbMTkyLCAxOTIsIDE5Ml0sXG4gICAgXCJtZWRpdW12aW9sZXRyZWRcIjogWzE5OSwgMjEsIDEzM10sXG4gICAgXCJpbmRpYW5yZWRcIjogWzIwNSwgOTIsIDkyXSxcbiAgICBcInBlcnVcIjogWzIwNSwgMTMzLCA2M10sXG4gICAgXCJjaG9jb2xhdGVcIjogWzIxMCwgMTA1LCAzMF0sXG4gICAgXCJ0YW5cIjogWzIxMCwgMTgwLCAxNDBdLFxuICAgIFwibGlnaHRncmF5XCI6IFsyMTEsIDIxMSwgMjExXSxcbiAgICBcImxpZ2h0Z3JleVwiOiBbMjExLCAyMTEsIDIxMV0sXG4gICAgXCJwYWxldmlvbGV0cmVkXCI6IFsyMTYsIDExMiwgMTQ3XSxcbiAgICBcInRoaXN0bGVcIjogWzIxNiwgMTkxLCAyMTZdLFxuICAgIFwib3JjaGlkXCI6IFsyMTgsIDExMiwgMjE0XSxcbiAgICBcImdvbGRlbnJvZFwiOiBbMjE4LCAxNjUsIDMyXSxcbiAgICBcImNyaW1zb25cIjogWzIyMCwgMjAsIDYwXSxcbiAgICBcImdhaW5zYm9yb1wiOiBbMjIwLCAyMjAsIDIyMF0sXG4gICAgXCJwbHVtXCI6IFsyMjEsIDE2MCwgMjIxXSxcbiAgICBcImJ1cmx5d29vZFwiOiBbMjIyLCAxODQsIDEzNV0sXG4gICAgXCJsaWdodGN5YW5cIjogWzIyNCwgMjU1LCAyNTVdLFxuICAgIFwibGF2ZW5kZXJcIjogWzIzMCwgMjMwLCAyNTBdLFxuICAgIFwiZGFya3NhbG1vblwiOiBbMjMzLCAxNTAsIDEyMl0sXG4gICAgXCJ2aW9sZXRcIjogWzIzOCwgMTMwLCAyMzhdLFxuICAgIFwicGFsZWdvbGRlbnJvZFwiOiBbMjM4LCAyMzIsIDE3MF0sXG4gICAgXCJsaWdodGNvcmFsXCI6IFsyNDAsIDEyOCwgMTI4XSxcbiAgICBcImtoYWtpXCI6IFsyNDAsIDIzMCwgMTQwXSxcbiAgICBcImFsaWNlYmx1ZVwiOiBbMjQwLCAyNDgsIDI1NV0sXG4gICAgXCJob25leWRld1wiOiBbMjQwLCAyNTUsIDI0MF0sXG4gICAgXCJhenVyZVwiOiBbMjQwLCAyNTUsIDI1NV0sXG4gICAgXCJzYW5keWJyb3duXCI6IFsyNDQsIDE2NCwgOTZdLFxuICAgIFwid2hlYXRcIjogWzI0NSwgMjIyLCAxNzldLFxuICAgIFwiYmVpZ2VcIjogWzI0NSwgMjQ1LCAyMjBdLFxuICAgIFwid2hpdGVzbW9rZVwiOiBbMjQ1LCAyNDUsIDI0NV0sXG4gICAgXCJtaW50Y3JlYW1cIjogWzI0NSwgMjU1LCAyNTBdLFxuICAgIFwiZ2hvc3R3aGl0ZVwiOiBbMjQ4LCAyNDgsIDI1NV0sXG4gICAgXCJzYWxtb25cIjogWzI1MCwgMTI4LCAxMTRdLFxuICAgIFwiYW50aXF1ZXdoaXRlXCI6IFsyNTAsIDIzNSwgMjE1XSxcbiAgICBcImxpbmVuXCI6IFsyNTAsIDI0MCwgMjMwXSxcbiAgICBcImxpZ2h0Z29sZGVucm9keWVsbG93XCI6IFsyNTAsIDI1MCwgMjEwXSxcbiAgICBcIm9sZGxhY2VcIjogWzI1MywgMjQ1LCAyMzBdLFxuICAgIFwicmVkXCI6IFsyNTUsIDAsIDBdLFxuICAgIFwiZnVjaHNpYVwiOiBbMjU1LCAwLCAyNTVdLFxuICAgIFwibWFnZW50YVwiOiBbMjU1LCAwLCAyNTVdLFxuICAgIFwiZGVlcHBpbmtcIjogWzI1NSwgMjAsIDE0N10sXG4gICAgXCJvcmFuZ2VyZWRcIjogWzI1NSwgNjksIDBdLFxuICAgIFwidG9tYXRvXCI6IFsyNTUsIDk5LCA3MV0sXG4gICAgXCJob3RwaW5rXCI6IFsyNTUsIDEwNSwgMTgwXSxcbiAgICBcImNvcmFsXCI6IFsyNTUsIDEyNywgODBdLFxuICAgIFwiZGFya29yYW5nZVwiOiBbMjU1LCAxNDAsIDBdLFxuICAgIFwibGlnaHRzYWxtb25cIjogWzI1NSwgMTYwLCAxMjJdLFxuICAgIFwib3JhbmdlXCI6IFsyNTUsIDE2NSwgMF0sXG4gICAgXCJsaWdodHBpbmtcIjogWzI1NSwgMTgyLCAxOTNdLFxuICAgIFwicGlua1wiOiBbMjU1LCAxOTIsIDIwM10sXG4gICAgXCJnb2xkXCI6IFsyNTUsIDIxNSwgMF0sXG4gICAgXCJwZWFjaHB1ZmZcIjogWzI1NSwgMjE4LCAxODVdLFxuICAgIFwibmF2YWpvd2hpdGVcIjogWzI1NSwgMjIyLCAxNzNdLFxuICAgIFwibW9jY2FzaW5cIjogWzI1NSwgMjI4LCAxODFdLFxuICAgIFwiYmlzcXVlXCI6IFsyNTUsIDIyOCwgMTk2XSxcbiAgICBcIm1pc3R5cm9zZVwiOiBbMjU1LCAyMjgsIDIyNV0sXG4gICAgXCJibGFuY2hlZGFsbW9uZFwiOiBbMjU1LCAyMzUsIDIwNV0sXG4gICAgXCJwYXBheWF3aGlwXCI6IFsyNTUsIDIzOSwgMjEzXSxcbiAgICBcImxhdmVuZGVyYmx1c2hcIjogWzI1NSwgMjQwLCAyNDVdLFxuICAgIFwic2Vhc2hlbGxcIjogWzI1NSwgMjQ1LCAyMzhdLFxuICAgIFwiY29ybnNpbGtcIjogWzI1NSwgMjQ4LCAyMjBdLFxuICAgIFwibGVtb25jaGlmZm9uXCI6IFsyNTUsIDI1MCwgMjA1XSxcbiAgICBcImZsb3JhbHdoaXRlXCI6IFsyNTUsIDI1MCwgMjQwXSxcbiAgICBcInNub3dcIjogWzI1NSwgMjUwLCAyNTBdLFxuICAgIFwieWVsbG93XCI6IFsyNTUsIDI1NSwgMF0sXG4gICAgXCJsaWdodHllbGxvd1wiOiBbMjU1LCAyNTUsIDIyNF0sXG4gICAgXCJpdm9yeVwiOiBbMjU1LCAyNTUsIDI0MF0sXG4gICAgXCJ3aGl0ZVwiOiBbMjU1LCAyNTUsIDI1NV1cbn07XG4iLCIvKiogRGVmYXVsdCB3aXRoIGZvciBkaXNwbGF5IGFuZCBtYXAgZ2VuZXJhdG9ycyAqL1xuZXhwb3J0IGxldCBERUZBVUxUX1dJRFRIID0gODA7XG4vKiogRGVmYXVsdCBoZWlnaHQgZm9yIGRpc3BsYXkgYW5kIG1hcCBnZW5lcmF0b3JzICovXG5leHBvcnQgbGV0IERFRkFVTFRfSEVJR0hUID0gMjU7XG5leHBvcnQgY29uc3QgRElSUyA9IHtcbiAgICA0OiBbWzAsIC0xXSwgWzEsIDBdLCBbMCwgMV0sIFstMSwgMF1dLFxuICAgIDg6IFtbMCwgLTFdLCBbMSwgLTFdLCBbMSwgMF0sIFsxLCAxXSwgWzAsIDFdLCBbLTEsIDFdLCBbLTEsIDBdLCBbLTEsIC0xXV0sXG4gICAgNjogW1stMSwgLTFdLCBbMSwgLTFdLCBbMiwgMF0sIFsxLCAxXSwgWy0xLCAxXSwgWy0yLCAwXV1cbn07XG5leHBvcnQgY29uc3QgS0VZUyA9IHtcbiAgICAvKiogQ2FuY2VsIGtleS4gKi9cbiAgICBWS19DQU5DRUw6IDMsXG4gICAgLyoqIEhlbHAga2V5LiAqL1xuICAgIFZLX0hFTFA6IDYsXG4gICAgLyoqIEJhY2tzcGFjZSBrZXkuICovXG4gICAgVktfQkFDS19TUEFDRTogOCxcbiAgICAvKiogVGFiIGtleS4gKi9cbiAgICBWS19UQUI6IDksXG4gICAgLyoqIDUga2V5IG9uIE51bXBhZCB3aGVuIE51bUxvY2sgaXMgdW5sb2NrZWQuIE9yIG9uIE1hYywgY2xlYXIga2V5IHdoaWNoIGlzIHBvc2l0aW9uZWQgYXQgTnVtTG9jayBrZXkuICovXG4gICAgVktfQ0xFQVI6IDEyLFxuICAgIC8qKiBSZXR1cm4vZW50ZXIga2V5IG9uIHRoZSBtYWluIGtleWJvYXJkLiAqL1xuICAgIFZLX1JFVFVSTjogMTMsXG4gICAgLyoqIFJlc2VydmVkLCBidXQgbm90IHVzZWQuICovXG4gICAgVktfRU5URVI6IDE0LFxuICAgIC8qKiBTaGlmdCBrZXkuICovXG4gICAgVktfU0hJRlQ6IDE2LFxuICAgIC8qKiBDb250cm9sIGtleS4gKi9cbiAgICBWS19DT05UUk9MOiAxNyxcbiAgICAvKiogQWx0IChPcHRpb24gb24gTWFjKSBrZXkuICovXG4gICAgVktfQUxUOiAxOCxcbiAgICAvKiogUGF1c2Uga2V5LiAqL1xuICAgIFZLX1BBVVNFOiAxOSxcbiAgICAvKiogQ2FwcyBsb2NrLiAqL1xuICAgIFZLX0NBUFNfTE9DSzogMjAsXG4gICAgLyoqIEVzY2FwZSBrZXkuICovXG4gICAgVktfRVNDQVBFOiAyNyxcbiAgICAvKiogU3BhY2UgYmFyLiAqL1xuICAgIFZLX1NQQUNFOiAzMixcbiAgICAvKiogUGFnZSBVcCBrZXkuICovXG4gICAgVktfUEFHRV9VUDogMzMsXG4gICAgLyoqIFBhZ2UgRG93biBrZXkuICovXG4gICAgVktfUEFHRV9ET1dOOiAzNCxcbiAgICAvKiogRW5kIGtleS4gKi9cbiAgICBWS19FTkQ6IDM1LFxuICAgIC8qKiBIb21lIGtleS4gKi9cbiAgICBWS19IT01FOiAzNixcbiAgICAvKiogTGVmdCBhcnJvdy4gKi9cbiAgICBWS19MRUZUOiAzNyxcbiAgICAvKiogVXAgYXJyb3cuICovXG4gICAgVktfVVA6IDM4LFxuICAgIC8qKiBSaWdodCBhcnJvdy4gKi9cbiAgICBWS19SSUdIVDogMzksXG4gICAgLyoqIERvd24gYXJyb3cuICovXG4gICAgVktfRE9XTjogNDAsXG4gICAgLyoqIFByaW50IFNjcmVlbiBrZXkuICovXG4gICAgVktfUFJJTlRTQ1JFRU46IDQ0LFxuICAgIC8qKiBJbnMoZXJ0KSBrZXkuICovXG4gICAgVktfSU5TRVJUOiA0NSxcbiAgICAvKiogRGVsKGV0ZSkga2V5LiAqL1xuICAgIFZLX0RFTEVURTogNDYsXG4gICAgLyoqKi9cbiAgICBWS18wOiA0OCxcbiAgICAvKioqL1xuICAgIFZLXzE6IDQ5LFxuICAgIC8qKiovXG4gICAgVktfMjogNTAsXG4gICAgLyoqKi9cbiAgICBWS18zOiA1MSxcbiAgICAvKioqL1xuICAgIFZLXzQ6IDUyLFxuICAgIC8qKiovXG4gICAgVktfNTogNTMsXG4gICAgLyoqKi9cbiAgICBWS182OiA1NCxcbiAgICAvKioqL1xuICAgIFZLXzc6IDU1LFxuICAgIC8qKiovXG4gICAgVktfODogNTYsXG4gICAgLyoqKi9cbiAgICBWS185OiA1NyxcbiAgICAvKiogQ29sb24gKDopIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0NPTE9OOiA1OCxcbiAgICAvKiogU2VtaWNvbG9uICg7KSBrZXkuICovXG4gICAgVktfU0VNSUNPTE9OOiA1OSxcbiAgICAvKiogTGVzcy10aGFuICg8KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19MRVNTX1RIQU46IDYwLFxuICAgIC8qKiBFcXVhbHMgKD0pIGtleS4gKi9cbiAgICBWS19FUVVBTFM6IDYxLFxuICAgIC8qKiBHcmVhdGVyLXRoYW4gKD4pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0dSRUFURVJfVEhBTjogNjIsXG4gICAgLyoqIFF1ZXN0aW9uIG1hcmsgKD8pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1FVRVNUSU9OX01BUks6IDYzLFxuICAgIC8qKiBBdG1hcmsgKEApIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0FUOiA2NCxcbiAgICAvKioqL1xuICAgIFZLX0E6IDY1LFxuICAgIC8qKiovXG4gICAgVktfQjogNjYsXG4gICAgLyoqKi9cbiAgICBWS19DOiA2NyxcbiAgICAvKioqL1xuICAgIFZLX0Q6IDY4LFxuICAgIC8qKiovXG4gICAgVktfRTogNjksXG4gICAgLyoqKi9cbiAgICBWS19GOiA3MCxcbiAgICAvKioqL1xuICAgIFZLX0c6IDcxLFxuICAgIC8qKiovXG4gICAgVktfSDogNzIsXG4gICAgLyoqKi9cbiAgICBWS19JOiA3MyxcbiAgICAvKioqL1xuICAgIFZLX0o6IDc0LFxuICAgIC8qKiovXG4gICAgVktfSzogNzUsXG4gICAgLyoqKi9cbiAgICBWS19MOiA3NixcbiAgICAvKioqL1xuICAgIFZLX006IDc3LFxuICAgIC8qKiovXG4gICAgVktfTjogNzgsXG4gICAgLyoqKi9cbiAgICBWS19POiA3OSxcbiAgICAvKioqL1xuICAgIFZLX1A6IDgwLFxuICAgIC8qKiovXG4gICAgVktfUTogODEsXG4gICAgLyoqKi9cbiAgICBWS19SOiA4MixcbiAgICAvKioqL1xuICAgIFZLX1M6IDgzLFxuICAgIC8qKiovXG4gICAgVktfVDogODQsXG4gICAgLyoqKi9cbiAgICBWS19VOiA4NSxcbiAgICAvKioqL1xuICAgIFZLX1Y6IDg2LFxuICAgIC8qKiovXG4gICAgVktfVzogODcsXG4gICAgLyoqKi9cbiAgICBWS19YOiA4OCxcbiAgICAvKioqL1xuICAgIFZLX1k6IDg5LFxuICAgIC8qKiovXG4gICAgVktfWjogOTAsXG4gICAgLyoqKi9cbiAgICBWS19DT05URVhUX01FTlU6IDkzLFxuICAgIC8qKiAwIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQwOiA5NixcbiAgICAvKiogMSBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFEMTogOTcsXG4gICAgLyoqIDIgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDI6IDk4LFxuICAgIC8qKiAzIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQzOiA5OSxcbiAgICAvKiogNCBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFENDogMTAwLFxuICAgIC8qKiA1IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQ1OiAxMDEsXG4gICAgLyoqIDYgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDY6IDEwMixcbiAgICAvKiogNyBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFENzogMTAzLFxuICAgIC8qKiA4IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQ4OiAxMDQsXG4gICAgLyoqIDkgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDk6IDEwNSxcbiAgICAvKiogKiBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTVVMVElQTFk6IDEwNixcbiAgICAvKiogKyBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfQUREOiAxMDcsXG4gICAgLyoqKi9cbiAgICBWS19TRVBBUkFUT1I6IDEwOCxcbiAgICAvKiogLSBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfU1VCVFJBQ1Q6IDEwOSxcbiAgICAvKiogRGVjaW1hbCBwb2ludCBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfREVDSU1BTDogMTEwLFxuICAgIC8qKiAvIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19ESVZJREU6IDExMSxcbiAgICAvKiogRjEga2V5LiAqL1xuICAgIFZLX0YxOiAxMTIsXG4gICAgLyoqIEYyIGtleS4gKi9cbiAgICBWS19GMjogMTEzLFxuICAgIC8qKiBGMyBrZXkuICovXG4gICAgVktfRjM6IDExNCxcbiAgICAvKiogRjQga2V5LiAqL1xuICAgIFZLX0Y0OiAxMTUsXG4gICAgLyoqIEY1IGtleS4gKi9cbiAgICBWS19GNTogMTE2LFxuICAgIC8qKiBGNiBrZXkuICovXG4gICAgVktfRjY6IDExNyxcbiAgICAvKiogRjcga2V5LiAqL1xuICAgIFZLX0Y3OiAxMTgsXG4gICAgLyoqIEY4IGtleS4gKi9cbiAgICBWS19GODogMTE5LFxuICAgIC8qKiBGOSBrZXkuICovXG4gICAgVktfRjk6IDEyMCxcbiAgICAvKiogRjEwIGtleS4gKi9cbiAgICBWS19GMTA6IDEyMSxcbiAgICAvKiogRjExIGtleS4gKi9cbiAgICBWS19GMTE6IDEyMixcbiAgICAvKiogRjEyIGtleS4gKi9cbiAgICBWS19GMTI6IDEyMyxcbiAgICAvKiogRjEzIGtleS4gKi9cbiAgICBWS19GMTM6IDEyNCxcbiAgICAvKiogRjE0IGtleS4gKi9cbiAgICBWS19GMTQ6IDEyNSxcbiAgICAvKiogRjE1IGtleS4gKi9cbiAgICBWS19GMTU6IDEyNixcbiAgICAvKiogRjE2IGtleS4gKi9cbiAgICBWS19GMTY6IDEyNyxcbiAgICAvKiogRjE3IGtleS4gKi9cbiAgICBWS19GMTc6IDEyOCxcbiAgICAvKiogRjE4IGtleS4gKi9cbiAgICBWS19GMTg6IDEyOSxcbiAgICAvKiogRjE5IGtleS4gKi9cbiAgICBWS19GMTk6IDEzMCxcbiAgICAvKiogRjIwIGtleS4gKi9cbiAgICBWS19GMjA6IDEzMSxcbiAgICAvKiogRjIxIGtleS4gKi9cbiAgICBWS19GMjE6IDEzMixcbiAgICAvKiogRjIyIGtleS4gKi9cbiAgICBWS19GMjI6IDEzMyxcbiAgICAvKiogRjIzIGtleS4gKi9cbiAgICBWS19GMjM6IDEzNCxcbiAgICAvKiogRjI0IGtleS4gKi9cbiAgICBWS19GMjQ6IDEzNSxcbiAgICAvKiogTnVtIExvY2sga2V5LiAqL1xuICAgIFZLX05VTV9MT0NLOiAxNDQsXG4gICAgLyoqIFNjcm9sbCBMb2NrIGtleS4gKi9cbiAgICBWS19TQ1JPTExfTE9DSzogMTQ1LFxuICAgIC8qKiBDaXJjdW1mbGV4ICheKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19DSVJDVU1GTEVYOiAxNjAsXG4gICAgLyoqIEV4Y2xhbWF0aW9uICghKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19FWENMQU1BVElPTjogMTYxLFxuICAgIC8qKiBEb3VibGUgcXVvdGUgKCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfRE9VQkxFX1FVT1RFOiAxNjIsXG4gICAgLyoqIEhhc2ggKCMpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0hBU0g6IDE2MyxcbiAgICAvKiogRG9sbGFyIHNpZ24gKCQpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0RPTExBUjogMTY0LFxuICAgIC8qKiBQZXJjZW50ICglKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19QRVJDRU5UOiAxNjUsXG4gICAgLyoqIEFtcGVyc2FuZCAoJikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQU1QRVJTQU5EOiAxNjYsXG4gICAgLyoqIFVuZGVyc2NvcmUgKF8pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1VOREVSU0NPUkU6IDE2NyxcbiAgICAvKiogT3BlbiBwYXJlbnRoZXNpcyAoKCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfT1BFTl9QQVJFTjogMTY4LFxuICAgIC8qKiBDbG9zZSBwYXJlbnRoZXNpcyAoKSkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQ0xPU0VfUEFSRU46IDE2OSxcbiAgICAvKiBBc3RlcmlzayAoKikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQVNURVJJU0s6IDE3MCxcbiAgICAvKiogUGx1cyAoKykga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfUExVUzogMTcxLFxuICAgIC8qKiBQaXBlICh8KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19QSVBFOiAxNzIsXG4gICAgLyoqIEh5cGhlbi1VUy9kb2NzL01pbnVzICgtKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19IWVBIRU5fTUlOVVM6IDE3MyxcbiAgICAvKiogT3BlbiBjdXJseSBicmFja2V0ICh7KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19PUEVOX0NVUkxZX0JSQUNLRVQ6IDE3NCxcbiAgICAvKiogQ2xvc2UgY3VybHkgYnJhY2tldCAofSkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQ0xPU0VfQ1VSTFlfQlJBQ0tFVDogMTc1LFxuICAgIC8qKiBUaWxkZSAofikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfVElMREU6IDE3NixcbiAgICAvKiogQ29tbWEgKCwpIGtleS4gKi9cbiAgICBWS19DT01NQTogMTg4LFxuICAgIC8qKiBQZXJpb2QgKC4pIGtleS4gKi9cbiAgICBWS19QRVJJT0Q6IDE5MCxcbiAgICAvKiogU2xhc2ggKC8pIGtleS4gKi9cbiAgICBWS19TTEFTSDogMTkxLFxuICAgIC8qKiBCYWNrIHRpY2sgKGApIGtleS4gKi9cbiAgICBWS19CQUNLX1FVT1RFOiAxOTIsXG4gICAgLyoqIE9wZW4gc3F1YXJlIGJyYWNrZXQgKFspIGtleS4gKi9cbiAgICBWS19PUEVOX0JSQUNLRVQ6IDIxOSxcbiAgICAvKiogQmFjayBzbGFzaCAoXFwpIGtleS4gKi9cbiAgICBWS19CQUNLX1NMQVNIOiAyMjAsXG4gICAgLyoqIENsb3NlIHNxdWFyZSBicmFja2V0IChdKSBrZXkuICovXG4gICAgVktfQ0xPU0VfQlJBQ0tFVDogMjIxLFxuICAgIC8qKiBRdW90ZSAoJycnKSBrZXkuICovXG4gICAgVktfUVVPVEU6IDIyMixcbiAgICAvKiogTWV0YSBrZXkgb24gTGludXgsIENvbW1hbmQga2V5IG9uIE1hYy4gKi9cbiAgICBWS19NRVRBOiAyMjQsXG4gICAgLyoqIEFsdEdyIGtleSBvbiBMaW51eC4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0FMVEdSOiAyMjUsXG4gICAgLyoqIFdpbmRvd3MgbG9nbyBrZXkgb24gV2luZG93cy4gT3IgU3VwZXIgb3IgSHlwZXIga2V5IG9uIExpbnV4LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfV0lOOiA5MSxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfS0FOQTogMjEsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0hBTkdVTDogMjEsXG4gICAgLyoqIOiLseaVsCBrZXkgb24gSmFwYW5lc2UgTWFjIGtleWJvYXJkLiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfRUlTVTogMjIsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0pVTkpBOiAyMyxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfRklOQUw6IDI0LFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19IQU5KQTogMjUsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0tBTkpJOiAyNSxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfQ09OVkVSVDogMjgsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX05PTkNPTlZFUlQ6IDI5LFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19BQ0NFUFQ6IDMwLFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19NT0RFQ0hBTkdFOiAzMSxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfU0VMRUNUOiA0MSxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfUFJJTlQ6IDQyLFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19FWEVDVVRFOiA0MyxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuXHQgKi9cbiAgICBWS19TTEVFUDogOTVcbn07XG4iLCIvKipcbiAqIEBjbGFzcyBBYnN0cmFjdCBkaXNwbGF5IGJhY2tlbmQgbW9kdWxlXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWNrZW5kIHtcbiAgICBnZXRDb250YWluZXIoKSB7IHJldHVybiBudWxsOyB9XG4gICAgc2V0T3B0aW9ucyhvcHRpb25zKSB7IHRoaXMuX29wdGlvbnMgPSBvcHRpb25zOyB9XG59XG4iLCJpbXBvcnQgQmFja2VuZCBmcm9tIFwiLi9iYWNrZW5kLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXMgZXh0ZW5kcyBCYWNrZW5kIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fY3R4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgfVxuICAgIHNjaGVkdWxlKGNiKSB7IHJlcXVlc3RBbmltYXRpb25GcmFtZShjYik7IH1cbiAgICBnZXRDb250YWluZXIoKSB7IHJldHVybiB0aGlzLl9jdHguY2FudmFzOyB9XG4gICAgc2V0T3B0aW9ucyhvcHRzKSB7XG4gICAgICAgIHN1cGVyLnNldE9wdGlvbnMob3B0cyk7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gKG9wdHMuZm9udFN0eWxlID8gYCR7b3B0cy5mb250U3R5bGV9IGAgOiBgYCk7XG4gICAgICAgIGNvbnN0IGZvbnQgPSBgJHtzdHlsZX0gJHtvcHRzLmZvbnRTaXplfXB4ICR7b3B0cy5mb250RmFtaWx5fWA7XG4gICAgICAgIHRoaXMuX2N0eC5mb250ID0gZm9udDtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgICAgICB0aGlzLl9jdHguZm9udCA9IGZvbnQ7XG4gICAgICAgIHRoaXMuX2N0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICB0aGlzLl9jdHgudGV4dEJhc2VsaW5lID0gXCJtaWRkbGVcIjtcbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSB0aGlzLl9vcHRpb25zLmJnO1xuICAgICAgICB0aGlzLl9jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5fY3R4LmNhbnZhcy53aWR0aCwgdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQpO1xuICAgIH1cbiAgICBldmVudFRvUG9zaXRpb24oeCwgeSkge1xuICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5fY3R4LmNhbnZhcztcbiAgICAgICAgbGV0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHggLT0gcmVjdC5sZWZ0O1xuICAgICAgICB5IC09IHJlY3QudG9wO1xuICAgICAgICB4ICo9IGNhbnZhcy53aWR0aCAvIHJlY3Qud2lkdGg7XG4gICAgICAgIHkgKj0gY2FudmFzLmhlaWdodCAvIHJlY3QuaGVpZ2h0O1xuICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSBjYW52YXMud2lkdGggfHwgeSA+PSBjYW52YXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gWy0xLCAtMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24oeCwgeSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEhleCBmcm9tIFwiLi9oZXguanNcIjtcbmltcG9ydCBSZWN0IGZyb20gXCIuL3JlY3QuanNcIjtcbmltcG9ydCBUaWxlIGZyb20gXCIuL3RpbGUuanNcIjtcbmltcG9ydCBUaWxlR0wgZnJvbSBcIi4vdGlsZS1nbC5qc1wiO1xuaW1wb3J0IFRlcm0gZnJvbSBcIi4vdGVybS5qc1wiO1xuaW1wb3J0ICogYXMgVGV4dCBmcm9tIFwiLi4vdGV4dC5qc1wiO1xuaW1wb3J0IHsgREVGQVVMVF9XSURUSCwgREVGQVVMVF9IRUlHSFQgfSBmcm9tIFwiLi4vY29uc3RhbnRzLmpzXCI7XG5jb25zdCBCQUNLRU5EUyA9IHtcbiAgICBcImhleFwiOiBIZXgsXG4gICAgXCJyZWN0XCI6IFJlY3QsXG4gICAgXCJ0aWxlXCI6IFRpbGUsXG4gICAgXCJ0aWxlLWdsXCI6IFRpbGVHTCxcbiAgICBcInRlcm1cIjogVGVybVxufTtcbmNvbnN0IERFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICB3aWR0aDogREVGQVVMVF9XSURUSCxcbiAgICBoZWlnaHQ6IERFRkFVTFRfSEVJR0hULFxuICAgIHRyYW5zcG9zZTogZmFsc2UsXG4gICAgbGF5b3V0OiBcInJlY3RcIixcbiAgICBmb250U2l6ZTogMTUsXG4gICAgc3BhY2luZzogMSxcbiAgICBib3JkZXI6IDAsXG4gICAgZm9yY2VTcXVhcmVSYXRpbzogZmFsc2UsXG4gICAgZm9udEZhbWlseTogXCJtb25vc3BhY2VcIixcbiAgICBmb250U3R5bGU6IFwiXCIsXG4gICAgZmc6IFwiI2NjY1wiLFxuICAgIGJnOiBcIiMwMDBcIixcbiAgICB0aWxlV2lkdGg6IDMyLFxuICAgIHRpbGVIZWlnaHQ6IDMyLFxuICAgIHRpbGVNYXA6IHt9LFxuICAgIHRpbGVTZXQ6IG51bGwsXG4gICAgdGlsZUNvbG9yaXplOiBmYWxzZVxufTtcbi8qKlxuICogQGNsYXNzIFZpc3VhbCBtYXAgZGlzcGxheVxuICovXG5sZXQgRGlzcGxheSA9IC8qKiBAY2xhc3MgKi8gKCgpID0+IHtcbiAgICBjbGFzcyBEaXNwbGF5IHtcbiAgICAgICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgICAgICAgICB0aGlzLl9kaXJ0eSA9IGZhbHNlOyAvLyBmYWxzZSA9IG5vdGhpbmcsIHRydWUgPSBhbGwsIG9iamVjdCA9IGRpcnR5IGNlbGxzXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0ge307XG4gICAgICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9PUFRJT05TLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuREVCVUcgPSB0aGlzLkRFQlVHLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl90aWNrID0gdGhpcy5fdGljay5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fYmFja2VuZC5zY2hlZHVsZSh0aGlzLl90aWNrKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogRGVidWcgaGVscGVyLCBpZGVhbCBhcyBhIG1hcCBnZW5lcmF0b3IgY2FsbGJhY2suIEFsd2F5cyBib3VuZCB0byB0aGlzLlxuICAgICAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAgICAgKiBAcGFyYW0ge2ludH0gd2hhdFxuICAgICAgICAgKi9cbiAgICAgICAgREVCVUcoeCwgeSwgd2hhdCkge1xuICAgICAgICAgICAgbGV0IGNvbG9ycyA9IFt0aGlzLl9vcHRpb25zLmJnLCB0aGlzLl9vcHRpb25zLmZnXTtcbiAgICAgICAgICAgIHRoaXMuZHJhdyh4LCB5LCBudWxsLCBudWxsLCBjb2xvcnNbd2hhdCAlIGNvbG9ycy5sZW5ndGhdKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ2xlYXIgdGhlIHdob2xlIGRpc3BsYXkgKGNvdmVyIGl0IHdpdGggYmFja2dyb3VuZCBjb2xvcilcbiAgICAgICAgICovXG4gICAgICAgIGNsZWFyKCkge1xuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgICAgICAgICAgdGhpcy5fZGlydHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc2VlIFJPVC5EaXNwbGF5XG4gICAgICAgICAqL1xuICAgICAgICBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy53aWR0aCB8fCBvcHRpb25zLmhlaWdodCB8fCBvcHRpb25zLmZvbnRTaXplIHx8IG9wdGlvbnMuZm9udEZhbWlseSB8fCBvcHRpb25zLnNwYWNpbmcgfHwgb3B0aW9ucy5sYXlvdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5sYXlvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN0b3IgPSBCQUNLRU5EU1tvcHRpb25zLmxheW91dF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2JhY2tlbmQgPSBuZXcgY3RvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9iYWNrZW5kLnNldE9wdGlvbnModGhpcy5fb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgY3VycmVudGx5IHNldCBvcHRpb25zXG4gICAgICAgICAqL1xuICAgICAgICBnZXRPcHRpb25zKCkgeyByZXR1cm4gdGhpcy5fb3B0aW9uczsgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgRE9NIG5vZGUgb2YgdGhpcyBkaXNwbGF5XG4gICAgICAgICAqL1xuICAgICAgICBnZXRDb250YWluZXIoKSB7IHJldHVybiB0aGlzLl9iYWNrZW5kLmdldENvbnRhaW5lcigpOyB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb21wdXRlIHRoZSBtYXhpbXVtIHdpZHRoL2hlaWdodCB0byBmaXQgaW50byBhIHNldCBvZiBnaXZlbiBjb25zdHJhaW50c1xuICAgICAgICAgKiBAcGFyYW0ge2ludH0gYXZhaWxXaWR0aCBNYXhpbXVtIGFsbG93ZWQgcGl4ZWwgd2lkdGhcbiAgICAgICAgICogQHBhcmFtIHtpbnR9IGF2YWlsSGVpZ2h0IE1heGltdW0gYWxsb3dlZCBwaXhlbCBoZWlnaHRcbiAgICAgICAgICogQHJldHVybnMge2ludFsyXX0gY2VsbFdpZHRoLGNlbGxIZWlnaHRcbiAgICAgICAgICovXG4gICAgICAgIGNvbXB1dGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFja2VuZC5jb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbXB1dGUgdGhlIG1heGltdW0gZm9udCBzaXplIHRvIGZpdCBpbnRvIGEgc2V0IG9mIGdpdmVuIGNvbnN0cmFpbnRzXG4gICAgICAgICAqIEBwYXJhbSB7aW50fSBhdmFpbFdpZHRoIE1heGltdW0gYWxsb3dlZCBwaXhlbCB3aWR0aFxuICAgICAgICAgKiBAcGFyYW0ge2ludH0gYXZhaWxIZWlnaHQgTWF4aW11bSBhbGxvd2VkIHBpeGVsIGhlaWdodFxuICAgICAgICAgKiBAcmV0dXJucyB7aW50fSBmb250U2l6ZVxuICAgICAgICAgKi9cbiAgICAgICAgY29tcHV0ZUZvbnRTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFja2VuZC5jb21wdXRlRm9udFNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbXB1dGVUaWxlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fb3B0aW9ucy53aWR0aCk7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gTWF0aC5mbG9vcihhdmFpbEhlaWdodCAvIHRoaXMuX29wdGlvbnMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHJldHVybiBbd2lkdGgsIGhlaWdodF07XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnQgYSBET00gZXZlbnQgKG1vdXNlIG9yIHRvdWNoKSB0byBtYXAgY29vcmRpbmF0ZXMuIFVzZXMgZmlyc3QgdG91Y2ggZm9yIG11bHRpLXRvdWNoLlxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBlIGV2ZW50XG4gICAgICAgICAqIEByZXR1cm5zIHtpbnRbMl19IC0xIGZvciB2YWx1ZXMgb3V0c2lkZSBvZiB0aGUgY2FudmFzXG4gICAgICAgICAqL1xuICAgICAgICBldmVudFRvUG9zaXRpb24oZSkge1xuICAgICAgICAgICAgbGV0IHgsIHk7XG4gICAgICAgICAgICBpZiAoXCJ0b3VjaGVzXCIgaW4gZSkge1xuICAgICAgICAgICAgICAgIHggPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgICAgICAgICAgICB5ID0gZS50b3VjaGVzWzBdLmNsaWVudFk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB4ID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgICAgIHkgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFja2VuZC5ldmVudFRvUG9zaXRpb24oeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nIHx8IHN0cmluZ1tdfSBjaCBPbmUgb3IgbW9yZSBjaGFycyAod2lsbCBiZSBvdmVybGFwcGluZyB0aGVtc2VsdmVzKVxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2ZnXSBmb3JlZ3JvdW5kIGNvbG9yXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYmddIGJhY2tncm91bmQgY29sb3JcbiAgICAgICAgICovXG4gICAgICAgIGRyYXcoeCwgeSwgY2gsIGZnLCBiZykge1xuICAgICAgICAgICAgaWYgKCFmZykge1xuICAgICAgICAgICAgICAgIGZnID0gdGhpcy5fb3B0aW9ucy5mZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYmcpIHtcbiAgICAgICAgICAgICAgICBiZyA9IHRoaXMuX29wdGlvbnMuYmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQga2V5ID0gYCR7eH0sJHt5fWA7XG4gICAgICAgICAgICB0aGlzLl9kYXRhW2tleV0gPSBbeCwgeSwgY2gsIGZnLCBiZ107XG4gICAgICAgICAgICBpZiAodGhpcy5fZGlydHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IC8vIHdpbGwgYWxyZWFkeSByZWRyYXcgZXZlcnl0aGluZyBcbiAgICAgICAgICAgIGlmICghdGhpcy5fZGlydHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJ0eSA9IHt9O1xuICAgICAgICAgICAgfSAvLyBmaXJzdCFcbiAgICAgICAgICAgIHRoaXMuX2RpcnR5W2tleV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZyB8fCBzdHJpbmdbXX0gY2ggT25lIG9yIG1vcmUgY2hhcnMgKHdpbGwgYmUgb3ZlcmxhcHBpbmcgdGhlbXNlbHZlcylcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmcgfHwgbnVsbH0gW2ZnXSBmb3JlZ3JvdW5kIGNvbG9yXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nIHx8IG51bGx9IFtiZ10gYmFja2dyb3VuZCBjb2xvclxuICAgICAgICAgKi9cbiAgICAgICAgZHJhd092ZXIoeCwgeSwgY2gsIGZnLCBiZykge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7eH0sJHt5fWA7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZyA9IHRoaXMuX2RhdGFba2V5XTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nWzJdID0gY2ggfHwgZXhpc3RpbmdbMl07XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdbM10gPSBmZyB8fCBleGlzdGluZ1szXTtcbiAgICAgICAgICAgICAgICBleGlzdGluZ1s0XSA9IGJnIHx8IGV4aXN0aW5nWzRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3KHgsIHksIGNoLCBmZywgYmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEcmF3cyBhIHRleHQgYXQgZ2l2ZW4gcG9zaXRpb24uIE9wdGlvbmFsbHkgd3JhcHMgYXQgYSBtYXhpbXVtIGxlbmd0aC4gQ3VycmVudGx5IGRvZXMgbm90IHdvcmsgd2l0aCBoZXggbGF5b3V0LlxuICAgICAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBNYXkgY29udGFpbiBjb2xvci9iYWNrZ3JvdW5kIGZvcm1hdCBzcGVjaWZpZXJzLCAlY3tuYW1lfS8lYntuYW1lfSwgYm90aCBvcHRpb25hbC4gJWN7fS8lYnt9IHJlc2V0cyB0byBkZWZhdWx0LlxuICAgICAgICAgKiBAcGFyYW0ge2ludH0gW21heFdpZHRoXSB3cmFwIGF0IHdoYXQgd2lkdGg/XG4gICAgICAgICAqIEByZXR1cm5zIHtpbnR9IGxpbmVzIGRyYXduXG4gICAgICAgICAqL1xuICAgICAgICBkcmF3VGV4dCh4LCB5LCB0ZXh0LCBtYXhXaWR0aCkge1xuICAgICAgICAgICAgbGV0IGZnID0gbnVsbDtcbiAgICAgICAgICAgIGxldCBiZyA9IG51bGw7XG4gICAgICAgICAgICBsZXQgY3ggPSB4O1xuICAgICAgICAgICAgbGV0IGN5ID0geTtcbiAgICAgICAgICAgIGxldCBsaW5lcyA9IDE7XG4gICAgICAgICAgICBpZiAoIW1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgbWF4V2lkdGggPSB0aGlzLl9vcHRpb25zLndpZHRoIC0geDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0b2tlbnMgPSBUZXh0LnRva2VuaXplKHRleHQsIG1heFdpZHRoKTtcbiAgICAgICAgICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7IC8vIGludGVycHJldCB0b2tlbml6ZWQgb3Bjb2RlIHN0cmVhbVxuICAgICAgICAgICAgICAgIGxldCB0b2tlbiA9IHRva2Vucy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodG9rZW4udHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFRleHQuVFlQRV9URVhUOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzU3BhY2UgPSBmYWxzZSwgaXNQcmV2U3BhY2UgPSBmYWxzZSwgaXNGdWxsV2lkdGggPSBmYWxzZSwgaXNQcmV2RnVsbFdpZHRoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2VuLnZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNjID0gdG9rZW4udmFsdWUuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IHRva2VuLnZhbHVlLmNoYXJBdChpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5sYXlvdXQgPT09IFwidGVybVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjY2ggPSBjYyA+PiA4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNDSksgPSBjY2ggPT09IDB4MTEgfHwgKGNjaCA+PSAweDJlICYmIGNjaCA8PSAweDlmKSB8fCAoY2NoID49IDB4YWMgJiYgY2NoIDw9IDB4ZDcpIHx8IChjYyA+PSAweEE5NjAgJiYgY2MgPD0gMHhBOTdGKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ0pLKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXcoY3ggKyAwLCBjeSwgYywgZmcsIGJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhdyhjeCArIDEsIGN5LCBcIlxcdFwiLCBmZywgYmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ggKz0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFzc2lnbiB0byBgdHJ1ZWAgd2hlbiB0aGUgY3VycmVudCBjaGFyIGlzIGZ1bGwtd2lkdGguXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNGdWxsV2lkdGggPSAoY2MgPiAweGZmMDAgJiYgY2MgPCAweGZmNjEpIHx8IChjYyA+IDB4ZmZkYyAmJiBjYyA8IDB4ZmZlOCkgfHwgY2MgPiAweGZmZWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3VycmVudCBjaGFyIGlzIHNwYWNlLCB3aGF0ZXZlciBmdWxsLXdpZHRoIG9yIGhhbGYtd2lkdGggYm90aCBhcmUgT0suXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTcGFjZSA9IChjLmNoYXJDb2RlQXQoMCkgPT0gMHgyMCB8fCBjLmNoYXJDb2RlQXQoMCkgPT0gMHgzMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgcHJldmlvdXMgY2hhciBpcyBmdWxsLXdpZHRoIGFuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGN1cnJlbnQgY2hhciBpcyBuZXRoZXIgaGFsZi13aWR0aCBub3IgYSBzcGFjZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNQcmV2RnVsbFdpZHRoICYmICFpc0Z1bGxXaWR0aCAmJiAhaXNTcGFjZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gLy8gYWRkIGFuIGV4dHJhIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGN1cnJlbnQgY2hhciBpcyBmdWxsLXdpZHRoIGFuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBwcmV2aW91cyBjaGFyIGlzIG5vdCBhIHNwYWNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0Z1bGxXaWR0aCAmJiAhaXNQcmV2U3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3grKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IC8vIGFkZCBhbiBleHRyYSBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhdyhjeCsrLCBjeSwgYywgZmcsIGJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1ByZXZTcGFjZSA9IGlzU3BhY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQcmV2RnVsbFdpZHRoID0gaXNGdWxsV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUZXh0LlRZUEVfRkc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmZyA9IHRva2VuLnZhbHVlIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUZXh0LlRZUEVfQkc6XG4gICAgICAgICAgICAgICAgICAgICAgICBiZyA9IHRva2VuLnZhbHVlIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUZXh0LlRZUEVfTkVXTElORTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGN4ID0geDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN5Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lcysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxpbmVzO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaW1lciB0aWNrOiB1cGRhdGUgZGlydHkgcGFydHNcbiAgICAgICAgICovXG4gICAgICAgIF90aWNrKCkge1xuICAgICAgICAgICAgdGhpcy5fYmFja2VuZC5zY2hlZHVsZSh0aGlzLl90aWNrKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZGlydHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fZGlydHkgPT09IHRydWUpIHsgLy8gZHJhdyBhbGxcbiAgICAgICAgICAgICAgICB0aGlzLl9iYWNrZW5kLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaWQgaW4gdGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kcmF3KGlkLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSAvLyByZWRyYXcgY2FjaGVkIGRhdGEgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLy8gZHJhdyBvbmx5IGRpcnR5IFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9kaXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kcmF3KGtleSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZGlydHkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBXaGF0IHRvIGRyYXdcbiAgICAgICAgICogQHBhcmFtIHtib29sfSBjbGVhckJlZm9yZSBJcyBpdCBuZWNlc3NhcnkgdG8gY2xlYW4gYmVmb3JlP1xuICAgICAgICAgKi9cbiAgICAgICAgX2RyYXcoa2V5LCBjbGVhckJlZm9yZSkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLl9kYXRhW2tleV07XG4gICAgICAgICAgICBpZiAoZGF0YVs0XSAhPSB0aGlzLl9vcHRpb25zLmJnKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJCZWZvcmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYmFja2VuZC5kcmF3KGRhdGEsIGNsZWFyQmVmb3JlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBEaXNwbGF5LlJlY3QgPSBSZWN0O1xuICAgIERpc3BsYXkuSGV4ID0gSGV4O1xuICAgIERpc3BsYXkuVGlsZSA9IFRpbGU7XG4gICAgRGlzcGxheS5UaWxlR0wgPSBUaWxlR0w7XG4gICAgRGlzcGxheS5UZXJtID0gVGVybTtcbiAgICByZXR1cm4gRGlzcGxheTtcbn0pKCk7XG5leHBvcnQgZGVmYXVsdCBEaXNwbGF5O1xuIiwiaW1wb3J0IENhbnZhcyBmcm9tIFwiLi9jYW52YXMuanNcIjtcbmltcG9ydCB7IG1vZCB9IGZyb20gXCIuLi91dGlsLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBIZXhhZ29uYWwgYmFja2VuZFxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGV4IGV4dGVuZHMgQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fc3BhY2luZ1ggPSAwO1xuICAgICAgICB0aGlzLl9zcGFjaW5nWSA9IDA7XG4gICAgICAgIHRoaXMuX2hleFNpemUgPSAwO1xuICAgIH1cbiAgICBkcmF3KGRhdGEsIGNsZWFyQmVmb3JlKSB7XG4gICAgICAgIGxldCBbeCwgeSwgY2gsIGZnLCBiZ10gPSBkYXRhO1xuICAgICAgICBsZXQgcHggPSBbXG4gICAgICAgICAgICAoeCArIDEpICogdGhpcy5fc3BhY2luZ1gsXG4gICAgICAgICAgICB5ICogdGhpcy5fc3BhY2luZ1kgKyB0aGlzLl9oZXhTaXplXG4gICAgICAgIF07XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRyYW5zcG9zZSkge1xuICAgICAgICAgICAgcHgucmV2ZXJzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjbGVhckJlZm9yZSkge1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IGJnO1xuICAgICAgICAgICAgdGhpcy5fZmlsbChweFswXSwgcHhbMV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2gpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gZmc7XG4gICAgICAgIGxldCBjaGFycyA9IFtdLmNvbmNhdChjaCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsVGV4dChjaGFyc1tpXSwgcHhbMF0sIE1hdGguY2VpbChweFsxXSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXB1dGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRyYW5zcG9zZSkge1xuICAgICAgICAgICAgYXZhaWxXaWR0aCArPSBhdmFpbEhlaWdodDtcbiAgICAgICAgICAgIGF2YWlsSGVpZ2h0ID0gYXZhaWxXaWR0aCAtIGF2YWlsSGVpZ2h0O1xuICAgICAgICAgICAgYXZhaWxXaWR0aCAtPSBhdmFpbEhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgd2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9zcGFjaW5nWCkgLSAxO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gTWF0aC5mbG9vcigoYXZhaWxIZWlnaHQgLSAyICogdGhpcy5faGV4U2l6ZSkgLyB0aGlzLl9zcGFjaW5nWSArIDEpO1xuICAgICAgICByZXR1cm4gW3dpZHRoLCBoZWlnaHRdO1xuICAgIH1cbiAgICBjb21wdXRlRm9udFNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJhbnNwb3NlKSB7XG4gICAgICAgICAgICBhdmFpbFdpZHRoICs9IGF2YWlsSGVpZ2h0O1xuICAgICAgICAgICAgYXZhaWxIZWlnaHQgPSBhdmFpbFdpZHRoIC0gYXZhaWxIZWlnaHQ7XG4gICAgICAgICAgICBhdmFpbFdpZHRoIC09IGF2YWlsSGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGxldCBoZXhTaXplV2lkdGggPSAyICogYXZhaWxXaWR0aCAvICgodGhpcy5fb3B0aW9ucy53aWR0aCArIDEpICogTWF0aC5zcXJ0KDMpKSAtIDE7XG4gICAgICAgIGxldCBoZXhTaXplSGVpZ2h0ID0gYXZhaWxIZWlnaHQgLyAoMiArIDEuNSAqICh0aGlzLl9vcHRpb25zLmhlaWdodCAtIDEpKTtcbiAgICAgICAgbGV0IGhleFNpemUgPSBNYXRoLm1pbihoZXhTaXplV2lkdGgsIGhleFNpemVIZWlnaHQpO1xuICAgICAgICAvLyBjb21wdXRlIGNoYXIgcmF0aW9cbiAgICAgICAgbGV0IG9sZEZvbnQgPSB0aGlzLl9jdHguZm9udDtcbiAgICAgICAgdGhpcy5fY3R4LmZvbnQgPSBcIjEwMHB4IFwiICsgdGhpcy5fb3B0aW9ucy5mb250RmFtaWx5O1xuICAgICAgICBsZXQgd2lkdGggPSBNYXRoLmNlaWwodGhpcy5fY3R4Lm1lYXN1cmVUZXh0KFwiV1wiKS53aWR0aCk7XG4gICAgICAgIHRoaXMuX2N0eC5mb250ID0gb2xkRm9udDtcbiAgICAgICAgbGV0IHJhdGlvID0gd2lkdGggLyAxMDA7XG4gICAgICAgIGhleFNpemUgPSBNYXRoLmZsb29yKGhleFNpemUpICsgMTsgLy8gY2xvc2VzdCBsYXJnZXIgaGV4U2l6ZVxuICAgICAgICAvLyBGSVhNRSBjaGFyIHNpemUgY29tcHV0YXRpb24gZG9lcyBub3QgcmVzcGVjdCB0cmFuc3Bvc2VkIGhleGVzXG4gICAgICAgIGxldCBmb250U2l6ZSA9IDIgKiBoZXhTaXplIC8gKHRoaXMuX29wdGlvbnMuc3BhY2luZyAqICgxICsgcmF0aW8gLyBNYXRoLnNxcnQoMykpKTtcbiAgICAgICAgLy8gY2xvc2VzdCBzbWFsbGVyIGZvbnRTaXplXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoZm9udFNpemUpIC0gMTtcbiAgICB9XG4gICAgX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24oeCwgeSkge1xuICAgICAgICBsZXQgbm9kZVNpemU7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRyYW5zcG9zZSkge1xuICAgICAgICAgICAgeCArPSB5O1xuICAgICAgICAgICAgeSA9IHggLSB5O1xuICAgICAgICAgICAgeCAtPSB5O1xuICAgICAgICAgICAgbm9kZVNpemUgPSB0aGlzLl9jdHguY2FudmFzLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9kZVNpemUgPSB0aGlzLl9jdHguY2FudmFzLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2l6ZSA9IG5vZGVTaXplIC8gdGhpcy5fb3B0aW9ucy5oZWlnaHQ7XG4gICAgICAgIHkgPSBNYXRoLmZsb29yKHkgLyBzaXplKTtcbiAgICAgICAgaWYgKG1vZCh5LCAyKSkgeyAvKiBvZGQgcm93ICovXG4gICAgICAgICAgICB4IC09IHRoaXMuX3NwYWNpbmdYO1xuICAgICAgICAgICAgeCA9IDEgKyAyICogTWF0aC5mbG9vcih4IC8gKDIgKiB0aGlzLl9zcGFjaW5nWCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeCA9IDIgKiBNYXRoLmZsb29yKHggLyAoMiAqIHRoaXMuX3NwYWNpbmdYKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt4LCB5XTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXJndW1lbnRzIGFyZSBwaXhlbCB2YWx1ZXMuIElmIFwidHJhbnNwb3NlZFwiIG1vZGUgaXMgZW5hYmxlZCwgdGhlbiB0aGVzZSB0d28gYXJlIGFscmVhZHkgc3dhcHBlZC5cbiAgICAgKi9cbiAgICBfZmlsbChjeCwgY3kpIHtcbiAgICAgICAgbGV0IGEgPSB0aGlzLl9oZXhTaXplO1xuICAgICAgICBsZXQgYiA9IHRoaXMuX29wdGlvbnMuYm9yZGVyO1xuICAgICAgICBjb25zdCBjdHggPSB0aGlzLl9jdHg7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJhbnNwb3NlKSB7XG4gICAgICAgICAgICBjdHgubW92ZVRvKGN4IC0gYSArIGIsIGN5KTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggLSBhIC8gMiArIGIsIGN5ICsgdGhpcy5fc3BhY2luZ1ggLSBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggKyBhIC8gMiAtIGIsIGN5ICsgdGhpcy5fc3BhY2luZ1ggLSBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggKyBhIC0gYiwgY3kpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCArIGEgLyAyIC0gYiwgY3kgLSB0aGlzLl9zcGFjaW5nWCArIGIpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCAtIGEgLyAyICsgYiwgY3kgLSB0aGlzLl9zcGFjaW5nWCArIGIpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCAtIGEgKyBiLCBjeSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjdHgubW92ZVRvKGN4LCBjeSAtIGEgKyBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggKyB0aGlzLl9zcGFjaW5nWCAtIGIsIGN5IC0gYSAvIDIgKyBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggKyB0aGlzLl9zcGFjaW5nWCAtIGIsIGN5ICsgYSAvIDIgLSBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3gsIGN5ICsgYSAtIGIpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCAtIHRoaXMuX3NwYWNpbmdYICsgYiwgY3kgKyBhIC8gMiAtIGIpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCAtIHRoaXMuX3NwYWNpbmdYICsgYiwgY3kgLSBhIC8gMiArIGIpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCwgY3kgLSBhICsgYik7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG4gICAgX3VwZGF0ZVNpemUoKSB7XG4gICAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9vcHRpb25zO1xuICAgICAgICBjb25zdCBjaGFyV2lkdGggPSBNYXRoLmNlaWwodGhpcy5fY3R4Lm1lYXN1cmVUZXh0KFwiV1wiKS53aWR0aCk7XG4gICAgICAgIHRoaXMuX2hleFNpemUgPSBNYXRoLmZsb29yKG9wdHMuc3BhY2luZyAqIChvcHRzLmZvbnRTaXplICsgY2hhcldpZHRoIC8gTWF0aC5zcXJ0KDMpKSAvIDIpO1xuICAgICAgICB0aGlzLl9zcGFjaW5nWCA9IHRoaXMuX2hleFNpemUgKiBNYXRoLnNxcnQoMykgLyAyO1xuICAgICAgICB0aGlzLl9zcGFjaW5nWSA9IHRoaXMuX2hleFNpemUgKiAxLjU7XG4gICAgICAgIGxldCB4cHJvcDtcbiAgICAgICAgbGV0IHlwcm9wO1xuICAgICAgICBpZiAob3B0cy50cmFuc3Bvc2UpIHtcbiAgICAgICAgICAgIHhwcm9wID0gXCJoZWlnaHRcIjtcbiAgICAgICAgICAgIHlwcm9wID0gXCJ3aWR0aFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeHByb3AgPSBcIndpZHRoXCI7XG4gICAgICAgICAgICB5cHJvcCA9IFwiaGVpZ2h0XCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3R4LmNhbnZhc1t4cHJvcF0gPSBNYXRoLmNlaWwoKG9wdHMud2lkdGggKyAxKSAqIHRoaXMuX3NwYWNpbmdYKTtcbiAgICAgICAgdGhpcy5fY3R4LmNhbnZhc1t5cHJvcF0gPSBNYXRoLmNlaWwoKG9wdHMuaGVpZ2h0IC0gMSkgKiB0aGlzLl9zcGFjaW5nWSArIDIgKiB0aGlzLl9oZXhTaXplKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ2FudmFzIGZyb20gXCIuL2NhbnZhcy5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgUmVjdGFuZ3VsYXIgYmFja2VuZFxuICogQHByaXZhdGVcbiAqL1xubGV0IFJlY3QgPSAvKiogQGNsYXNzICovICgoKSA9PiB7XG4gICAgY2xhc3MgUmVjdCBleHRlbmRzIENhbnZhcyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3NwYWNpbmdYID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3NwYWNpbmdZID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhc0NhY2hlID0ge307XG4gICAgICAgIH1cbiAgICAgICAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgICAgICBzdXBlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzQ2FjaGUgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBkcmF3KGRhdGEsIGNsZWFyQmVmb3JlKSB7XG4gICAgICAgICAgICBpZiAoUmVjdC5jYWNoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RyYXdXaXRoQ2FjaGUoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kcmF3Tm9DYWNoZShkYXRhLCBjbGVhckJlZm9yZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX2RyYXdXaXRoQ2FjaGUoZGF0YSkge1xuICAgICAgICAgICAgbGV0IFt4LCB5LCBjaCwgZmcsIGJnXSA9IGRhdGE7XG4gICAgICAgICAgICBsZXQgaGFzaCA9IFwiXCIgKyBjaCArIGZnICsgYmc7XG4gICAgICAgICAgICBsZXQgY2FudmFzO1xuICAgICAgICAgICAgaWYgKGhhc2ggaW4gdGhpcy5fY2FudmFzQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICBjYW52YXMgPSB0aGlzLl9jYW52YXNDYWNoZVtoYXNoXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBiID0gdGhpcy5fb3B0aW9ucy5ib3JkZXI7XG4gICAgICAgICAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSB0aGlzLl9zcGFjaW5nWDtcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5fc3BhY2luZ1k7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGJnO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdChiLCBiLCBjYW52YXMud2lkdGggLSBiLCBjYW52YXMuaGVpZ2h0IC0gYik7XG4gICAgICAgICAgICAgICAgaWYgKGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBmZztcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLl9jdHguZm9udDtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgICAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSBcIm1pZGRsZVwiO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hhcnMgPSBbXS5jb25jYXQoY2gpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoY2hhcnNbaV0sIHRoaXMuX3NwYWNpbmdYIC8gMiwgTWF0aC5jZWlsKHRoaXMuX3NwYWNpbmdZIC8gMikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbnZhc0NhY2hlW2hhc2hdID0gY2FudmFzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY3R4LmRyYXdJbWFnZShjYW52YXMsIHggKiB0aGlzLl9zcGFjaW5nWCwgeSAqIHRoaXMuX3NwYWNpbmdZKTtcbiAgICAgICAgfVxuICAgICAgICBfZHJhd05vQ2FjaGUoZGF0YSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgICAgIGxldCBbeCwgeSwgY2gsIGZnLCBiZ10gPSBkYXRhO1xuICAgICAgICAgICAgaWYgKGNsZWFyQmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGIgPSB0aGlzLl9vcHRpb25zLmJvcmRlcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gYmc7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxSZWN0KHggKiB0aGlzLl9zcGFjaW5nWCArIGIsIHkgKiB0aGlzLl9zcGFjaW5nWSArIGIsIHRoaXMuX3NwYWNpbmdYIC0gYiwgdGhpcy5fc3BhY2luZ1kgLSBiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gZmc7XG4gICAgICAgICAgICBsZXQgY2hhcnMgPSBbXS5jb25jYXQoY2gpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsVGV4dChjaGFyc1tpXSwgKHggKyAwLjUpICogdGhpcy5fc3BhY2luZ1gsIE1hdGguY2VpbCgoeSArIDAuNSkgKiB0aGlzLl9zcGFjaW5nWSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbXB1dGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgICAgICBsZXQgd2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9zcGFjaW5nWCk7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gTWF0aC5mbG9vcihhdmFpbEhlaWdodCAvIHRoaXMuX3NwYWNpbmdZKTtcbiAgICAgICAgICAgIHJldHVybiBbd2lkdGgsIGhlaWdodF07XG4gICAgICAgIH1cbiAgICAgICAgY29tcHV0ZUZvbnRTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgICAgICBsZXQgYm94V2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9vcHRpb25zLndpZHRoKTtcbiAgICAgICAgICAgIGxldCBib3hIZWlnaHQgPSBNYXRoLmZsb29yKGF2YWlsSGVpZ2h0IC8gdGhpcy5fb3B0aW9ucy5oZWlnaHQpO1xuICAgICAgICAgICAgLyogY29tcHV0ZSBjaGFyIHJhdGlvICovXG4gICAgICAgICAgICBsZXQgb2xkRm9udCA9IHRoaXMuX2N0eC5mb250O1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZvbnQgPSBcIjEwMHB4IFwiICsgdGhpcy5fb3B0aW9ucy5mb250RmFtaWx5O1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gTWF0aC5jZWlsKHRoaXMuX2N0eC5tZWFzdXJlVGV4dChcIldcIikud2lkdGgpO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZvbnQgPSBvbGRGb250O1xuICAgICAgICAgICAgbGV0IHJhdGlvID0gd2lkdGggLyAxMDA7XG4gICAgICAgICAgICBsZXQgd2lkdGhGcmFjdGlvbiA9IHJhdGlvICogYm94SGVpZ2h0IC8gYm94V2lkdGg7XG4gICAgICAgICAgICBpZiAod2lkdGhGcmFjdGlvbiA+IDEpIHsgLyogdG9vIHdpZGUgd2l0aCBjdXJyZW50IGFzcGVjdCByYXRpbyAqL1xuICAgICAgICAgICAgICAgIGJveEhlaWdodCA9IE1hdGguZmxvb3IoYm94SGVpZ2h0IC8gd2lkdGhGcmFjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihib3hIZWlnaHQgLyB0aGlzLl9vcHRpb25zLnNwYWNpbmcpO1xuICAgICAgICB9XG4gICAgICAgIF9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgICAgICAgIHJldHVybiBbTWF0aC5mbG9vcih4IC8gdGhpcy5fc3BhY2luZ1gpLCBNYXRoLmZsb29yKHkgLyB0aGlzLl9zcGFjaW5nWSldO1xuICAgICAgICB9XG4gICAgICAgIF91cGRhdGVTaXplKCkge1xuICAgICAgICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX29wdGlvbnM7XG4gICAgICAgICAgICBjb25zdCBjaGFyV2lkdGggPSBNYXRoLmNlaWwodGhpcy5fY3R4Lm1lYXN1cmVUZXh0KFwiV1wiKS53aWR0aCk7XG4gICAgICAgICAgICB0aGlzLl9zcGFjaW5nWCA9IE1hdGguY2VpbChvcHRzLnNwYWNpbmcgKiBjaGFyV2lkdGgpO1xuICAgICAgICAgICAgdGhpcy5fc3BhY2luZ1kgPSBNYXRoLmNlaWwob3B0cy5zcGFjaW5nICogb3B0cy5mb250U2l6ZSk7XG4gICAgICAgICAgICBpZiAob3B0cy5mb3JjZVNxdWFyZVJhdGlvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BhY2luZ1ggPSB0aGlzLl9zcGFjaW5nWSA9IE1hdGgubWF4KHRoaXMuX3NwYWNpbmdYLCB0aGlzLl9zcGFjaW5nWSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jdHguY2FudmFzLndpZHRoID0gb3B0cy53aWR0aCAqIHRoaXMuX3NwYWNpbmdYO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQgPSBvcHRzLmhlaWdodCAqIHRoaXMuX3NwYWNpbmdZO1xuICAgICAgICB9XG4gICAgfVxuICAgIFJlY3QuY2FjaGUgPSBmYWxzZTtcbiAgICByZXR1cm4gUmVjdDtcbn0pKCk7XG5leHBvcnQgZGVmYXVsdCBSZWN0O1xuIiwiaW1wb3J0IEJhY2tlbmQgZnJvbSBcIi4vYmFja2VuZC5qc1wiO1xuaW1wb3J0ICogYXMgQ29sb3IgZnJvbSBcIi4uL2NvbG9yLmpzXCI7XG5mdW5jdGlvbiBjbGVhclRvQW5zaShiZykge1xuICAgIHJldHVybiBgXFx4MWJbMDs0ODs1OyR7dGVybWNvbG9yKGJnKX1tXFx4MWJbMkpgO1xufVxuZnVuY3Rpb24gY29sb3JUb0Fuc2koZmcsIGJnKSB7XG4gICAgcmV0dXJuIGBcXHgxYlswOzM4OzU7JHt0ZXJtY29sb3IoZmcpfTs0ODs1OyR7dGVybWNvbG9yKGJnKX1tYDtcbn1cbmZ1bmN0aW9uIHBvc2l0aW9uVG9BbnNpKHgsIHkpIHtcbiAgICByZXR1cm4gYFxceDFiWyR7eSArIDF9OyR7eCArIDF9SGA7XG59XG5mdW5jdGlvbiB0ZXJtY29sb3IoY29sb3IpIHtcbiAgICBjb25zdCBTUkNfQ09MT1JTID0gMjU2LjA7XG4gICAgY29uc3QgRFNUX0NPTE9SUyA9IDYuMDtcbiAgICBjb25zdCBDT0xPUl9SQVRJTyA9IERTVF9DT0xPUlMgLyBTUkNfQ09MT1JTO1xuICAgIGxldCByZ2IgPSBDb2xvci5mcm9tU3RyaW5nKGNvbG9yKTtcbiAgICBsZXQgciA9IE1hdGguZmxvb3IocmdiWzBdICogQ09MT1JfUkFUSU8pO1xuICAgIGxldCBnID0gTWF0aC5mbG9vcihyZ2JbMV0gKiBDT0xPUl9SQVRJTyk7XG4gICAgbGV0IGIgPSBNYXRoLmZsb29yKHJnYlsyXSAqIENPTE9SX1JBVElPKTtcbiAgICByZXR1cm4gciAqIDM2ICsgZyAqIDYgKyBiICogMSArIDE2O1xufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVybSBleHRlbmRzIEJhY2tlbmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9vZmZzZXQgPSBbMCwgMF07XG4gICAgICAgIHRoaXMuX2N1cnNvciA9IFstMSwgLTFdO1xuICAgICAgICB0aGlzLl9sYXN0Q29sb3IgPSBcIlwiO1xuICAgIH1cbiAgICBzY2hlZHVsZShjYikgeyBzZXRUaW1lb3V0KGNiLCAxMDAwIC8gNjApOyB9XG4gICAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIGxldCBzaXplID0gW29wdGlvbnMud2lkdGgsIG9wdGlvbnMuaGVpZ2h0XTtcbiAgICAgICAgbGV0IGF2YWlsID0gdGhpcy5jb21wdXRlU2l6ZSgpO1xuICAgICAgICB0aGlzLl9vZmZzZXQgPSBhdmFpbC5tYXAoKHZhbCwgaW5kZXgpID0+IE1hdGguZmxvb3IoKHZhbCAtIHNpemVbaW5kZXhdKSAvIDIpKTtcbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGNsZWFyVG9BbnNpKHRoaXMuX29wdGlvbnMuYmcpKTtcbiAgICB9XG4gICAgZHJhdyhkYXRhLCBjbGVhckJlZm9yZSkge1xuICAgICAgICAvLyBkZXRlcm1pbmUgd2hlcmUgdG8gZHJhdyB3aGF0IHdpdGggd2hhdCBjb2xvcnNcbiAgICAgICAgbGV0IFt4LCB5LCBjaCwgZmcsIGJnXSA9IGRhdGE7XG4gICAgICAgIC8vIGRldGVybWluZSBpZiB3ZSBuZWVkIHRvIG1vdmUgdGhlIHRlcm1pbmFsIGN1cnNvclxuICAgICAgICBsZXQgZHggPSB0aGlzLl9vZmZzZXRbMF0gKyB4O1xuICAgICAgICBsZXQgZHkgPSB0aGlzLl9vZmZzZXRbMV0gKyB5O1xuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuY29tcHV0ZVNpemUoKTtcbiAgICAgICAgaWYgKGR4IDwgMCB8fCBkeCA+PSBzaXplWzBdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGR5IDwgMCB8fCBkeSA+PSBzaXplWzFdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGR4ICE9PSB0aGlzLl9jdXJzb3JbMF0gfHwgZHkgIT09IHRoaXMuX2N1cnNvclsxXSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUocG9zaXRpb25Ub0Fuc2koZHgsIGR5KSk7XG4gICAgICAgICAgICB0aGlzLl9jdXJzb3JbMF0gPSBkeDtcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclsxXSA9IGR5O1xuICAgICAgICB9XG4gICAgICAgIC8vIHRlcm1pbmFscyBhdXRvbWF0aWNhbGx5IGNsZWFyLCBidXQgaWYgd2UncmUgY2xlYXJpbmcgd2hlbiB3ZSdyZVxuICAgICAgICAvLyBub3Qgb3RoZXJ3aXNlIHByb3ZpZGVkIHdpdGggYSBjaGFyYWN0ZXIsIGp1c3QgdXNlIGEgc3BhY2UgaW5zdGVhZFxuICAgICAgICBpZiAoY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgICAgIGlmICghY2gpIHtcbiAgICAgICAgICAgICAgICBjaCA9IFwiIFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHdlJ3JlIG5vdCBjbGVhcmluZyBhbmQgbm90IHByb3ZpZGVkIHdpdGggYSBjaGFyYWN0ZXIsIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKCFjaCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRldGVybWluZSBpZiB3ZSBuZWVkIHRvIGNoYW5nZSBjb2xvcnNcbiAgICAgICAgbGV0IG5ld0NvbG9yID0gY29sb3JUb0Fuc2koZmcsIGJnKTtcbiAgICAgICAgaWYgKG5ld0NvbG9yICE9PSB0aGlzLl9sYXN0Q29sb3IpIHtcbiAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG5ld0NvbG9yKTtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RDb2xvciA9IG5ld0NvbG9yO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaCAhPSAnXFx0Jykge1xuICAgICAgICAgICAgLy8gd3JpdGUgdGhlIHByb3ZpZGVkIHN5bWJvbCB0byB0aGUgZGlzcGxheVxuICAgICAgICAgICAgbGV0IGNoYXJzID0gW10uY29uY2F0KGNoKTtcbiAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGNoYXJzWzBdKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cGRhdGUgb3VyIHBvc2l0aW9uLCBnaXZlbiB0aGF0IHdlIHdyb3RlIGEgY2hhcmFjdGVyXG4gICAgICAgIHRoaXMuX2N1cnNvclswXSsrO1xuICAgICAgICBpZiAodGhpcy5fY3Vyc29yWzBdID49IHNpemVbMF0pIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclswXSA9IDA7XG4gICAgICAgICAgICB0aGlzLl9jdXJzb3JbMV0rKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wdXRlRm9udFNpemUoKSB7IHRocm93IG5ldyBFcnJvcihcIlRlcm1pbmFsIGJhY2tlbmQgaGFzIG5vIG5vdGlvbiBvZiBmb250IHNpemVcIik7IH1cbiAgICBldmVudFRvUG9zaXRpb24oeCwgeSkgeyByZXR1cm4gW3gsIHldOyB9XG4gICAgY29tcHV0ZVNpemUoKSB7IHJldHVybiBbcHJvY2Vzcy5zdGRvdXQuY29sdW1ucywgcHJvY2Vzcy5zdGRvdXQucm93c107IH1cbn1cbiIsImltcG9ydCBCYWNrZW5kIGZyb20gXCIuL2JhY2tlbmQuanNcIjtcbmltcG9ydCAqIGFzIENvbG9yIGZyb20gXCIuLi9jb2xvci5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgVGlsZSBiYWNrZW5kXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWxlR0wgZXh0ZW5kcyBCYWNrZW5kIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fdW5pZm9ybXMgPSB7fTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuX2dsID0gdGhpcy5faW5pdFdlYkdMKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGFsZXJ0KGUubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGlzU3VwcG9ydGVkKCkge1xuICAgICAgICByZXR1cm4gISFkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCJ3ZWJnbDJcIiwgeyBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRydWUgfSk7XG4gICAgfVxuICAgIHNjaGVkdWxlKGNiKSB7IHJlcXVlc3RBbmltYXRpb25GcmFtZShjYik7IH1cbiAgICBnZXRDb250YWluZXIoKSB7IHJldHVybiB0aGlzLl9nbC5jYW52YXM7IH1cbiAgICBzZXRPcHRpb25zKG9wdHMpIHtcbiAgICAgICAgc3VwZXIuc2V0T3B0aW9ucyhvcHRzKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgICAgICBsZXQgdGlsZVNldCA9IHRoaXMuX29wdGlvbnMudGlsZVNldDtcbiAgICAgICAgaWYgKHRpbGVTZXQgJiYgXCJjb21wbGV0ZVwiIGluIHRpbGVTZXQgJiYgIXRpbGVTZXQuY29tcGxldGUpIHtcbiAgICAgICAgICAgIHRpbGVTZXQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4gdGhpcy5fdXBkYXRlVGV4dHVyZSh0aWxlU2V0KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVUZXh0dXJlKHRpbGVTZXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRyYXcoZGF0YSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcbiAgICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX29wdGlvbnM7XG4gICAgICAgIGxldCBbeCwgeSwgY2gsIGZnLCBiZ10gPSBkYXRhO1xuICAgICAgICBsZXQgc2Npc3NvclkgPSBnbC5jYW52YXMuaGVpZ2h0IC0gKHkgKyAxKSAqIG9wdHMudGlsZUhlaWdodDtcbiAgICAgICAgZ2wuc2Npc3Nvcih4ICogb3B0cy50aWxlV2lkdGgsIHNjaXNzb3JZLCBvcHRzLnRpbGVXaWR0aCwgb3B0cy50aWxlSGVpZ2h0KTtcbiAgICAgICAgaWYgKGNsZWFyQmVmb3JlKSB7XG4gICAgICAgICAgICBpZiAob3B0cy50aWxlQ29sb3JpemUpIHtcbiAgICAgICAgICAgICAgICBnbC5jbGVhckNvbG9yKDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2wuY2xlYXJDb2xvciguLi5wYXJzZUNvbG9yKGJnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNoYXJzID0gW10uY29uY2F0KGNoKTtcbiAgICAgICAgbGV0IGJncyA9IFtdLmNvbmNhdChiZyk7XG4gICAgICAgIGxldCBmZ3MgPSBbXS5jb25jYXQoZmcpO1xuICAgICAgICBnbC51bmlmb3JtMmZ2KHRoaXMuX3VuaWZvcm1zW1widGFyZ2V0UG9zUmVsXCJdLCBbeCwgeV0pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRoaXMuX29wdGlvbnMudGlsZU1hcFtjaGFyc1tpXV07XG4gICAgICAgICAgICBpZiAoIXRpbGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoYXIgXCIke2NoYXJzW2ldfVwiIG5vdCBmb3VuZCBpbiB0aWxlTWFwYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnbC51bmlmb3JtMWYodGhpcy5fdW5pZm9ybXNbXCJjb2xvcml6ZVwiXSwgb3B0cy50aWxlQ29sb3JpemUgPyAxIDogMCk7XG4gICAgICAgICAgICBnbC51bmlmb3JtMmZ2KHRoaXMuX3VuaWZvcm1zW1widGlsZXNldFBvc0Fic1wiXSwgdGlsZSk7XG4gICAgICAgICAgICBpZiAob3B0cy50aWxlQ29sb3JpemUpIHtcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtNGZ2KHRoaXMuX3VuaWZvcm1zW1widGludFwiXSwgcGFyc2VDb2xvcihmZ3NbaV0pKTtcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtNGZ2KHRoaXMuX3VuaWZvcm1zW1wiYmdcIl0sIHBhcnNlQ29sb3IoYmdzW2ldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFX1NUUklQLCAwLCA0KTtcbiAgICAgICAgfVxuICAgICAgICAvKlxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8Y2hhcnMubGVuZ3RoO2krKykge1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudGlsZUNvbG9yaXplKSB7IC8vIGFwcGx5IGNvbG9yaXphdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuX2NvbG9yQ2FudmFzO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmcgPSBmZ3NbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmcgPSBiZ3NbaV07XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy50aWxlU2V0ISxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWxlWzBdLCB0aWxlWzFdLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyAhPSBcInRyYW5zcGFyZW50XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGZnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2UtYXRvcFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmcgIT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBiZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24tb3ZlclwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdHguZHJhd0ltYWdlKGNhbnZhcywgeCp0aWxlV2lkdGgsIHkqdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gbm8gY29sb3JpemluZywgZWFzeVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLnRpbGVTZXQhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVbMF0sIHRpbGVbMV0sIHRpbGVXaWR0aCwgdGlsZUhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4KnRpbGVXaWR0aCwgeSp0aWxlSGVpZ2h0LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAqL1xuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcbiAgICAgICAgZ2wuY2xlYXJDb2xvciguLi5wYXJzZUNvbG9yKHRoaXMuX29wdGlvbnMuYmcpKTtcbiAgICAgICAgZ2wuc2Npc3NvcigwLCAwLCBnbC5jYW52YXMud2lkdGgsIGdsLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcbiAgICB9XG4gICAgY29tcHV0ZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgbGV0IHdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fb3B0aW9ucy50aWxlV2lkdGgpO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gTWF0aC5mbG9vcihhdmFpbEhlaWdodCAvIHRoaXMuX29wdGlvbnMudGlsZUhlaWdodCk7XG4gICAgICAgIHJldHVybiBbd2lkdGgsIGhlaWdodF07XG4gICAgfVxuICAgIGNvbXB1dGVGb250U2l6ZSgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGlsZSBiYWNrZW5kIGRvZXMgbm90IHVuZGVyc3RhbmQgZm9udCBzaXplXCIpO1xuICAgIH1cbiAgICBldmVudFRvUG9zaXRpb24oeCwgeSkge1xuICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5fZ2wuY2FudmFzO1xuICAgICAgICBsZXQgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgeCAtPSByZWN0LmxlZnQ7XG4gICAgICAgIHkgLT0gcmVjdC50b3A7XG4gICAgICAgIHggKj0gY2FudmFzLndpZHRoIC8gcmVjdC53aWR0aDtcbiAgICAgICAgeSAqPSBjYW52YXMuaGVpZ2h0IC8gcmVjdC5oZWlnaHQ7XG4gICAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID49IGNhbnZhcy53aWR0aCB8fCB5ID49IGNhbnZhcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBbLTEsIC0xXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbih4LCB5KTtcbiAgICB9XG4gICAgX2luaXRXZWJHTCgpIHtcbiAgICAgICAgbGV0IGdsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwid2ViZ2wyXCIsIHsgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0cnVlIH0pO1xuICAgICAgICB3aW5kb3cuZ2wgPSBnbDtcbiAgICAgICAgbGV0IHByb2dyYW0gPSBjcmVhdGVQcm9ncmFtKGdsLCBWUywgRlMpO1xuICAgICAgICBnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuICAgICAgICBjcmVhdGVRdWFkKGdsKTtcbiAgICAgICAgVU5JRk9STVMuZm9yRWFjaChuYW1lID0+IHRoaXMuX3VuaWZvcm1zW25hbWVdID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIG5hbWUpKTtcbiAgICAgICAgdGhpcy5fcHJvZ3JhbSA9IHByb2dyYW07XG4gICAgICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XG4gICAgICAgIGdsLmJsZW5kRnVuY1NlcGFyYXRlKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSwgZ2wuT05FLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcbiAgICAgICAgZ2wuZW5hYmxlKGdsLlNDSVNTT1JfVEVTVCk7XG4gICAgICAgIHJldHVybiBnbDtcbiAgICB9XG4gICAgX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24oeCwgeSkge1xuICAgICAgICByZXR1cm4gW01hdGguZmxvb3IoeCAvIHRoaXMuX29wdGlvbnMudGlsZVdpZHRoKSwgTWF0aC5mbG9vcih5IC8gdGhpcy5fb3B0aW9ucy50aWxlSGVpZ2h0KV07XG4gICAgfVxuICAgIF91cGRhdGVTaXplKCkge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuICAgICAgICBjb25zdCBvcHRzID0gdGhpcy5fb3B0aW9ucztcbiAgICAgICAgY29uc3QgY2FudmFzU2l6ZSA9IFtvcHRzLndpZHRoICogb3B0cy50aWxlV2lkdGgsIG9wdHMuaGVpZ2h0ICogb3B0cy50aWxlSGVpZ2h0XTtcbiAgICAgICAgZ2wuY2FudmFzLndpZHRoID0gY2FudmFzU2l6ZVswXTtcbiAgICAgICAgZ2wuY2FudmFzLmhlaWdodCA9IGNhbnZhc1NpemVbMV07XG4gICAgICAgIGdsLnZpZXdwb3J0KDAsIDAsIGNhbnZhc1NpemVbMF0sIGNhbnZhc1NpemVbMV0pO1xuICAgICAgICBnbC51bmlmb3JtMmZ2KHRoaXMuX3VuaWZvcm1zW1widGlsZVNpemVcIl0sIFtvcHRzLnRpbGVXaWR0aCwgb3B0cy50aWxlSGVpZ2h0XSk7XG4gICAgICAgIGdsLnVuaWZvcm0yZnYodGhpcy5fdW5pZm9ybXNbXCJ0YXJnZXRTaXplXCJdLCBjYW52YXNTaXplKTtcbiAgICB9XG4gICAgX3VwZGF0ZVRleHR1cmUodGlsZVNldCkge1xuICAgICAgICBjcmVhdGVUZXh0dXJlKHRoaXMuX2dsLCB0aWxlU2V0KTtcbiAgICB9XG59XG5jb25zdCBVTklGT1JNUyA9IFtcInRhcmdldFBvc1JlbFwiLCBcInRpbGVzZXRQb3NBYnNcIiwgXCJ0aWxlU2l6ZVwiLCBcInRhcmdldFNpemVcIiwgXCJjb2xvcml6ZVwiLCBcImJnXCIsIFwidGludFwiXTtcbmNvbnN0IFZTID0gYFxuI3ZlcnNpb24gMzAwIGVzXG5cbmluIHZlYzIgdGlsZVBvc1JlbDtcbm91dCB2ZWMyIHRpbGVzZXRQb3NQeDtcblxudW5pZm9ybSB2ZWMyIHRpbGVzZXRQb3NBYnM7XG51bmlmb3JtIHZlYzIgdGlsZVNpemU7XG51bmlmb3JtIHZlYzIgdGFyZ2V0U2l6ZTtcbnVuaWZvcm0gdmVjMiB0YXJnZXRQb3NSZWw7XG5cbnZvaWQgbWFpbigpIHtcblx0dmVjMiB0YXJnZXRQb3NQeCA9ICh0YXJnZXRQb3NSZWwgKyB0aWxlUG9zUmVsKSAqIHRpbGVTaXplO1xuXHR2ZWMyIHRhcmdldFBvc05kYyA9ICgodGFyZ2V0UG9zUHggLyB0YXJnZXRTaXplKS0wLjUpKjIuMDtcblx0dGFyZ2V0UG9zTmRjLnkgKj0gLTEuMDtcblxuXHRnbF9Qb3NpdGlvbiA9IHZlYzQodGFyZ2V0UG9zTmRjLCAwLjAsIDEuMCk7XG5cdHRpbGVzZXRQb3NQeCA9IHRpbGVzZXRQb3NBYnMgKyB0aWxlUG9zUmVsICogdGlsZVNpemU7XG59YC50cmltKCk7XG5jb25zdCBGUyA9IGBcbiN2ZXJzaW9uIDMwMCBlc1xucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xuXG5pbiB2ZWMyIHRpbGVzZXRQb3NQeDtcbm91dCB2ZWM0IGZyYWdDb2xvcjtcbnVuaWZvcm0gc2FtcGxlcjJEIGltYWdlO1xudW5pZm9ybSBib29sIGNvbG9yaXplO1xudW5pZm9ybSB2ZWM0IGJnO1xudW5pZm9ybSB2ZWM0IHRpbnQ7XG5cbnZvaWQgbWFpbigpIHtcblx0ZnJhZ0NvbG9yID0gdmVjNCgwLCAwLCAwLCAxKTtcblxuXHR2ZWM0IHRleGVsID0gdGV4ZWxGZXRjaChpbWFnZSwgaXZlYzIodGlsZXNldFBvc1B4KSwgMCk7XG5cblx0aWYgKGNvbG9yaXplKSB7XG5cdFx0dGV4ZWwucmdiID0gdGludC5hICogdGludC5yZ2IgKyAoMS4wLXRpbnQuYSkgKiB0ZXhlbC5yZ2I7XG5cdFx0ZnJhZ0NvbG9yLnJnYiA9IHRleGVsLmEqdGV4ZWwucmdiICsgKDEuMC10ZXhlbC5hKSpiZy5yZ2I7XG5cdFx0ZnJhZ0NvbG9yLmEgPSB0ZXhlbC5hICsgKDEuMC10ZXhlbC5hKSpiZy5hO1xuXHR9IGVsc2Uge1xuXHRcdGZyYWdDb2xvciA9IHRleGVsO1xuXHR9XG59YC50cmltKCk7XG5mdW5jdGlvbiBjcmVhdGVQcm9ncmFtKGdsLCB2c3MsIGZzcykge1xuICAgIGNvbnN0IHZzID0gZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xuICAgIGdsLnNoYWRlclNvdXJjZSh2cywgdnNzKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHZzKTtcbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcih2cywgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihnbC5nZXRTaGFkZXJJbmZvTG9nKHZzKSB8fCBcIlwiKTtcbiAgICB9XG4gICAgY29uc3QgZnMgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UoZnMsIGZzcyk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihmcyk7XG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoZnMsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyhmcykgfHwgXCJcIik7XG4gICAgfVxuICAgIGNvbnN0IHAgPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHAsIHZzKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocCwgZnMpO1xuICAgIGdsLmxpbmtQcm9ncmFtKHApO1xuICAgIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwLCBnbC5MSU5LX1NUQVRVUykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFByb2dyYW1JbmZvTG9nKHApIHx8IFwiXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVF1YWQoZ2wpIHtcbiAgICBjb25zdCBwb3MgPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAxLCAwLCAwLCAxLCAxLCAxXSk7XG4gICAgY29uc3QgYnVmID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1Zik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHBvcywgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KDApO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoMCwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVRleHR1cmUoZ2wsIGRhdGEpIHtcbiAgICBsZXQgdCA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0KTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLlJFUEVBVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuUkVQRUFUKTtcbiAgICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCAwKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIGRhdGEpO1xuICAgIHJldHVybiB0O1xufVxubGV0IGNvbG9yQ2FjaGUgPSB7fTtcbmZ1bmN0aW9uIHBhcnNlQ29sb3IoY29sb3IpIHtcbiAgICBpZiAoIShjb2xvciBpbiBjb2xvckNhY2hlKSkge1xuICAgICAgICBsZXQgcGFyc2VkO1xuICAgICAgICBpZiAoY29sb3IgPT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICAgICAgICBwYXJzZWQgPSBbMCwgMCwgMCwgMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29sb3IuaW5kZXhPZihcInJnYmFcIikgPiAtMSkge1xuICAgICAgICAgICAgcGFyc2VkID0gKGNvbG9yLm1hdGNoKC9bXFxkLl0rL2cpIHx8IFtdKS5tYXAoTnVtYmVyKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkW2ldID0gcGFyc2VkW2ldIC8gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyc2VkID0gQ29sb3IuZnJvbVN0cmluZyhjb2xvcikubWFwKCQgPT4gJCAvIDI1NSk7XG4gICAgICAgICAgICBwYXJzZWQucHVzaCgxKTtcbiAgICAgICAgfVxuICAgICAgICBjb2xvckNhY2hlW2NvbG9yXSA9IHBhcnNlZDtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yQ2FjaGVbY29sb3JdO1xufVxuIiwiaW1wb3J0IENhbnZhcyBmcm9tIFwiLi9jYW52YXMuanNcIjtcbi8qKlxuICogQGNsYXNzIFRpbGUgYmFja2VuZFxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsZSBleHRlbmRzIENhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2NvbG9yQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICB9XG4gICAgZHJhdyhkYXRhLCBjbGVhckJlZm9yZSkge1xuICAgICAgICBsZXQgW3gsIHksIGNoLCBmZywgYmddID0gZGF0YTtcbiAgICAgICAgbGV0IHRpbGVXaWR0aCA9IHRoaXMuX29wdGlvbnMudGlsZVdpZHRoO1xuICAgICAgICBsZXQgdGlsZUhlaWdodCA9IHRoaXMuX29wdGlvbnMudGlsZUhlaWdodDtcbiAgICAgICAgaWYgKGNsZWFyQmVmb3JlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50aWxlQ29sb3JpemUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdHguY2xlYXJSZWN0KHggKiB0aWxlV2lkdGgsIHkgKiB0aWxlSGVpZ2h0LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IGJnO1xuICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsUmVjdCh4ICogdGlsZVdpZHRoLCB5ICogdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNoYXJzID0gW10uY29uY2F0KGNoKTtcbiAgICAgICAgbGV0IGZncyA9IFtdLmNvbmNhdChmZyk7XG4gICAgICAgIGxldCBiZ3MgPSBbXS5jb25jYXQoYmcpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRoaXMuX29wdGlvbnMudGlsZU1hcFtjaGFyc1tpXV07XG4gICAgICAgICAgICBpZiAoIXRpbGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoYXIgXCIke2NoYXJzW2ldfVwiIG5vdCBmb3VuZCBpbiB0aWxlTWFwYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50aWxlQ29sb3JpemUpIHsgLy8gYXBwbHkgY29sb3JpemF0aW9uXG4gICAgICAgICAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuX2NvbG9yQ2FudmFzO1xuICAgICAgICAgICAgICAgIGxldCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLW92ZXJcIjtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgIGxldCBmZyA9IGZnc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgYmcgPSBiZ3NbaV07XG4gICAgICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5fb3B0aW9ucy50aWxlU2V0LCB0aWxlWzBdLCB0aWxlWzFdLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQsIDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgaWYgKGZnICE9IFwidHJhbnNwYXJlbnRcIikge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGZnO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLWF0b3BcIjtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYmcgIT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1vdmVyXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LmRyYXdJbWFnZShjYW52YXMsIHggKiB0aWxlV2lkdGgsIHkgKiB0aWxlSGVpZ2h0LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8vIG5vIGNvbG9yaXppbmcsIGVhc3lcbiAgICAgICAgICAgICAgICB0aGlzLl9jdHguZHJhd0ltYWdlKHRoaXMuX29wdGlvbnMudGlsZVNldCwgdGlsZVswXSwgdGlsZVsxXSwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0LCB4ICogdGlsZVdpZHRoLCB5ICogdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICBsZXQgd2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9vcHRpb25zLnRpbGVXaWR0aCk7XG4gICAgICAgIGxldCBoZWlnaHQgPSBNYXRoLmZsb29yKGF2YWlsSGVpZ2h0IC8gdGhpcy5fb3B0aW9ucy50aWxlSGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIFt3aWR0aCwgaGVpZ2h0XTtcbiAgICB9XG4gICAgY29tcHV0ZUZvbnRTaXplKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaWxlIGJhY2tlbmQgZG9lcyBub3QgdW5kZXJzdGFuZCBmb250IHNpemVcIik7XG4gICAgfVxuICAgIF9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIFtNYXRoLmZsb29yKHggLyB0aGlzLl9vcHRpb25zLnRpbGVXaWR0aCksIE1hdGguZmxvb3IoeSAvIHRoaXMuX29wdGlvbnMudGlsZUhlaWdodCldO1xuICAgIH1cbiAgICBfdXBkYXRlU2l6ZSgpIHtcbiAgICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX29wdGlvbnM7XG4gICAgICAgIHRoaXMuX2N0eC5jYW52YXMud2lkdGggPSBvcHRzLndpZHRoICogb3B0cy50aWxlV2lkdGg7XG4gICAgICAgIHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0ID0gb3B0cy5oZWlnaHQgKiBvcHRzLnRpbGVIZWlnaHQ7XG4gICAgICAgIHRoaXMuX2NvbG9yQ2FudmFzLndpZHRoID0gb3B0cy50aWxlV2lkdGg7XG4gICAgICAgIHRoaXMuX2NvbG9yQ2FudmFzLmhlaWdodCA9IG9wdHMudGlsZUhlaWdodDtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyBBc3luY2hyb25vdXMgbWFpbiBsb29wXG4gKiBAcGFyYW0ge1JPVC5TY2hlZHVsZXJ9IHNjaGVkdWxlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmdpbmUge1xuICAgIGNvbnN0cnVjdG9yKHNjaGVkdWxlcikge1xuICAgICAgICB0aGlzLl9zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIHRoaXMuX2xvY2sgPSAxO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFydCB0aGUgbWFpbiBsb29wLiBXaGVuIHRoaXMgY2FsbCByZXR1cm5zLCB0aGUgbG9vcCBpcyBsb2NrZWQuXG4gICAgICovXG4gICAgc3RhcnQoKSB7IHJldHVybiB0aGlzLnVubG9jaygpOyB9XG4gICAgLyoqXG4gICAgICogSW50ZXJydXB0IHRoZSBlbmdpbmUgYnkgYW4gYXN5bmNocm9ub3VzIGFjdGlvblxuICAgICAqL1xuICAgIGxvY2soKSB7XG4gICAgICAgIHRoaXMuX2xvY2srKztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc3VtZSBleGVjdXRpb24gKHBhdXNlZCBieSBhIHByZXZpb3VzIGxvY2spXG4gICAgICovXG4gICAgdW5sb2NrKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2xvY2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCB1bmxvY2sgdW5sb2NrZWQgZW5naW5lXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvY2stLTtcbiAgICAgICAgd2hpbGUgKCF0aGlzLl9sb2NrKSB7XG4gICAgICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLl9zY2hlZHVsZXIubmV4dCgpO1xuICAgICAgICAgICAgaWYgKCFhY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2soKTtcbiAgICAgICAgICAgIH0gLyogbm8gYWN0b3JzICovXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYWN0b3IuYWN0KCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC50aGVuKSB7IC8qIGFjdG9yIHJldHVybmVkIGEgXCJ0aGVuYWJsZVwiLCBsb29rcyBsaWtlIGEgUHJvbWlzZSAqL1xuICAgICAgICAgICAgICAgIHRoaXMubG9jaygpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC50aGVuKHRoaXMudW5sb2NrLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE1pbkhlYXAgfSBmcm9tIFwiLi9NaW5IZWFwLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFF1ZXVlIHtcbiAgICAvKipcbiAgICAgKiBAY2xhc3MgR2VuZXJpYyBldmVudCBxdWV1ZTogc3RvcmVzIGV2ZW50cyBhbmQgcmV0cmlldmVzIHRoZW0gYmFzZWQgb24gdGhlaXIgdGltZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl90aW1lID0gMDtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gbmV3IE1pbkhlYXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMge251bWJlcn0gRWxhcHNlZCB0aW1lXG4gICAgICovXG4gICAgZ2V0VGltZSgpIHsgcmV0dXJuIHRoaXMuX3RpbWU7IH1cbiAgICAvKipcbiAgICAgKiBDbGVhciBhbGwgc2NoZWR1bGVkIGV2ZW50c1xuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBuZXcgTWluSGVhcCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBldmVudFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lXG4gICAgICovXG4gICAgYWRkKGV2ZW50LCB0aW1lKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKGV2ZW50LCB0aW1lKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9jYXRlcyB0aGUgbmVhcmVzdCBldmVudCwgYWR2YW5jZXMgdGltZSBpZiBuZWNlc3NhcnkuIFJldHVybnMgdGhhdCBldmVudCBhbmQgcmVtb3ZlcyBpdCBmcm9tIHRoZSBxdWV1ZS5cbiAgICAgKiBAcmV0dXJucyB7PyB8fCBudWxsfSBUaGUgZXZlbnQgcHJldmlvdXNseSBhZGRlZCBieSBhZGRFdmVudCwgbnVsbCBpZiBubyBldmVudCBhdmFpbGFibGVcbiAgICAgKi9cbiAgICBnZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5fZXZlbnRzLmxlbigpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgeyBrZXk6IHRpbWUsIHZhbHVlOiBldmVudCB9ID0gdGhpcy5fZXZlbnRzLnBvcCgpO1xuICAgICAgICBpZiAodGltZSA+IDApIHsgLyogYWR2YW5jZSAqL1xuICAgICAgICAgICAgdGhpcy5fdGltZSArPSB0aW1lO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLnNoaWZ0KC10aW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdGltZSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIGV2ZW50XG4gICAgICogQHBhcmFtIHs/fSBldmVudFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRpbWVcbiAgICAgKi9cbiAgICBnZXRFdmVudFRpbWUoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgciA9IHRoaXMuX2V2ZW50cy5maW5kKGV2ZW50KTtcbiAgICAgICAgaWYgKHIpIHtcbiAgICAgICAgICAgIGNvbnN0IHsga2V5IH0gPSByO1xuICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYW4gZXZlbnQgZnJvbSB0aGUgcXVldWVcbiAgICAgKiBAcGFyYW0gez99IGV2ZW50XG4gICAgICogQHJldHVybnMge2Jvb2x9IHN1Y2Nlc3M/XG4gICAgICovXG4gICAgcmVtb3ZlKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudHMucmVtb3ZlKGV2ZW50KTtcbiAgICB9XG4gICAgO1xufVxuIiwiaW1wb3J0IEZPViBmcm9tIFwiLi9mb3YuanNcIjtcbi8qKlxuICogQGNsYXNzIERpc2NyZXRlIHNoYWRvd2Nhc3RpbmcgYWxnb3JpdGhtLiBPYnNvbGV0ZWQgYnkgUHJlY2lzZSBzaGFkb3djYXN0aW5nLlxuICogQGF1Z21lbnRzIFJPVC5GT1ZcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzY3JldGVTaGFkb3djYXN0aW5nIGV4dGVuZHMgRk9WIHtcbiAgICBjb21wdXRlKHgsIHksIFIsIGNhbGxiYWNrKSB7XG4gICAgICAgIC8qIHRoaXMgcGxhY2UgaXMgYWx3YXlzIHZpc2libGUgKi9cbiAgICAgICAgY2FsbGJhY2soeCwgeSwgMCwgMSk7XG4gICAgICAgIC8qIHN0YW5kaW5nIGluIGEgZGFyayBwbGFjZS4gRklYTUUgaXMgdGhpcyBhIGdvb2QgaWRlYT8gICovXG4gICAgICAgIGlmICghdGhpcy5fbGlnaHRQYXNzZXMoeCwgeSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvKiBzdGFydCBhbmQgZW5kIGFuZ2xlcyAqL1xuICAgICAgICBsZXQgREFUQSA9IFtdO1xuICAgICAgICBsZXQgQSwgQiwgY3gsIGN5LCBibG9ja3M7XG4gICAgICAgIC8qIGFuYWx5emUgc3Vycm91bmRpbmcgY2VsbHMgaW4gY29uY2VudHJpYyByaW5ncywgc3RhcnRpbmcgZnJvbSB0aGUgY2VudGVyICovXG4gICAgICAgIGZvciAobGV0IHIgPSAxOyByIDw9IFI7IHIrKykge1xuICAgICAgICAgICAgbGV0IG5laWdoYm9ycyA9IHRoaXMuX2dldENpcmNsZSh4LCB5LCByKTtcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IDM2MCAvIG5laWdoYm9ycy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGN4ID0gbmVpZ2hib3JzW2ldWzBdO1xuICAgICAgICAgICAgICAgIGN5ID0gbmVpZ2hib3JzW2ldWzFdO1xuICAgICAgICAgICAgICAgIEEgPSBhbmdsZSAqIChpIC0gMC41KTtcbiAgICAgICAgICAgICAgICBCID0gQSArIGFuZ2xlO1xuICAgICAgICAgICAgICAgIGJsb2NrcyA9ICF0aGlzLl9saWdodFBhc3NlcyhjeCwgY3kpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aXNpYmxlQ29vcmRzKE1hdGguZmxvb3IoQSksIE1hdGguY2VpbChCKSwgYmxvY2tzLCBEQVRBKSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhjeCwgY3ksIHIsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoREFUQS5sZW5ndGggPT0gMiAmJiBEQVRBWzBdID09IDAgJiYgREFUQVsxXSA9PSAzNjApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gLyogY3V0b2ZmPyAqL1xuICAgICAgICAgICAgfSAvKiBmb3IgYWxsIGNlbGxzIGluIHRoaXMgcmluZyAqL1xuICAgICAgICB9IC8qIGZvciBhbGwgcmluZ3MgKi9cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtpbnR9IEEgc3RhcnQgYW5nbGVcbiAgICAgKiBAcGFyYW0ge2ludH0gQiBlbmQgYW5nbGVcbiAgICAgKiBAcGFyYW0ge2Jvb2x9IGJsb2NrcyBEb2VzIGN1cnJlbnQgY2VsbCBibG9jayB2aXNpYmlsaXR5P1xuICAgICAqIEBwYXJhbSB7aW50W11bXX0gREFUQSBzaGFkb3dlZCBhbmdsZSBwYWlyc1xuICAgICAqL1xuICAgIF92aXNpYmxlQ29vcmRzKEEsIEIsIGJsb2NrcywgREFUQSkge1xuICAgICAgICBpZiAoQSA8IDApIHtcbiAgICAgICAgICAgIGxldCB2MSA9IHRoaXMuX3Zpc2libGVDb29yZHMoMCwgQiwgYmxvY2tzLCBEQVRBKTtcbiAgICAgICAgICAgIGxldCB2MiA9IHRoaXMuX3Zpc2libGVDb29yZHMoMzYwICsgQSwgMzYwLCBibG9ja3MsIERBVEEpO1xuICAgICAgICAgICAgcmV0dXJuIHYxIHx8IHYyO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChpbmRleCA8IERBVEEubGVuZ3RoICYmIERBVEFbaW5kZXhdIDwgQSkge1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT0gREFUQS5sZW5ndGgpIHsgLyogY29tcGxldGVseSBuZXcgc2hhZG93ICovXG4gICAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgREFUQS5wdXNoKEEsIEIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgaWYgKGluZGV4ICUgMikgeyAvKiB0aGlzIHNoYWRvdyBzdGFydHMgaW4gYW4gZXhpc3Rpbmcgc2hhZG93LCBvciB3aXRoaW4gaXRzIGVuZGluZyBib3VuZGFyeSAqL1xuICAgICAgICAgICAgd2hpbGUgKGluZGV4IDwgREFUQS5sZW5ndGggJiYgREFUQVtpbmRleF0gPCBCKSB7XG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvdW50ID09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ICUgMikge1xuICAgICAgICAgICAgICAgICAgICBEQVRBLnNwbGljZShpbmRleCAtIGNvdW50LCBjb3VudCwgQik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBEQVRBLnNwbGljZShpbmRleCAtIGNvdW50LCBjb3VudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8qIHRoaXMgc2hhZG93IHN0YXJ0cyBvdXRzaWRlIGFuIGV4aXN0aW5nIHNoYWRvdywgb3Igd2l0aGluIGEgc3RhcnRpbmcgYm91bmRhcnkgKi9cbiAgICAgICAgICAgIHdoaWxlIChpbmRleCA8IERBVEEubGVuZ3RoICYmIERBVEFbaW5kZXhdIDwgQikge1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIHZpc2libGUgd2hlbiBvdXRzaWRlIGFuIGV4aXN0aW5nIHNoYWRvdywgb3Igd2hlbiBvdmVybGFwcGluZyAqL1xuICAgICAgICAgICAgaWYgKEEgPT0gREFUQVtpbmRleCAtIGNvdW50XSAmJiBjb3VudCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCAlIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgREFUQS5zcGxpY2UoaW5kZXggLSBjb3VudCwgY291bnQsIEEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgREFUQS5zcGxpY2UoaW5kZXggLSBjb3VudCwgY291bnQsIEEsIEIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRElSUyB9IGZyb20gXCIuLi9jb25zdGFudHMuanNcIjtcbjtcbjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZPViB7XG4gICAgLyoqXG4gICAgICogQGNsYXNzIEFic3RyYWN0IEZPViBhbGdvcml0aG1cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaWdodFBhc3Nlc0NhbGxiYWNrIERvZXMgdGhlIGxpZ2h0IHBhc3MgdGhyb3VnaCB4LHk/XG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgICAqIEBwYXJhbSB7aW50fSBbb3B0aW9ucy50b3BvbG9neT04XSA0LzYvOFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGxpZ2h0UGFzc2VzQ2FsbGJhY2ssIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLl9saWdodFBhc3NlcyA9IGxpZ2h0UGFzc2VzQ2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHsgdG9wb2xvZ3k6IDggfSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbGwgbmVpZ2hib3JzIGluIGEgY29uY2VudHJpYyByaW5nXG4gICAgICogQHBhcmFtIHtpbnR9IGN4IGNlbnRlci14XG4gICAgICogQHBhcmFtIHtpbnR9IGN5IGNlbnRlci15XG4gICAgICogQHBhcmFtIHtpbnR9IHIgcmFuZ2VcbiAgICAgKi9cbiAgICBfZ2V0Q2lyY2xlKGN4LCBjeSwgcikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBkaXJzLCBjb3VudEZhY3Rvciwgc3RhcnRPZmZzZXQ7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fb3B0aW9ucy50b3BvbG9neSkge1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIGNvdW50RmFjdG9yID0gMTtcbiAgICAgICAgICAgICAgICBzdGFydE9mZnNldCA9IFswLCAxXTtcbiAgICAgICAgICAgICAgICBkaXJzID0gW1xuICAgICAgICAgICAgICAgICAgICBESVJTWzhdWzddLFxuICAgICAgICAgICAgICAgICAgICBESVJTWzhdWzFdLFxuICAgICAgICAgICAgICAgICAgICBESVJTWzhdWzNdLFxuICAgICAgICAgICAgICAgICAgICBESVJTWzhdWzVdXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICBkaXJzID0gRElSU1s2XTtcbiAgICAgICAgICAgICAgICBjb3VudEZhY3RvciA9IDE7XG4gICAgICAgICAgICAgICAgc3RhcnRPZmZzZXQgPSBbLTEsIDFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgIGRpcnMgPSBESVJTWzRdO1xuICAgICAgICAgICAgICAgIGNvdW50RmFjdG9yID0gMjtcbiAgICAgICAgICAgICAgICBzdGFydE9mZnNldCA9IFstMSwgMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluY29ycmVjdCB0b3BvbG9neSBmb3IgRk9WIGNvbXB1dGF0aW9uXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8qIHN0YXJ0aW5nIG5laWdoYm9yICovXG4gICAgICAgIGxldCB4ID0gY3ggKyBzdGFydE9mZnNldFswXSAqIHI7XG4gICAgICAgIGxldCB5ID0gY3kgKyBzdGFydE9mZnNldFsxXSAqIHI7XG4gICAgICAgIC8qIGNpcmNsZSAqL1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgciAqIGNvdW50RmFjdG9yOyBqKyspIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChbeCwgeV0pO1xuICAgICAgICAgICAgICAgIHggKz0gZGlyc1tpXVswXTtcbiAgICAgICAgICAgICAgICB5ICs9IGRpcnNbaV1bMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iLCJpbXBvcnQgRGlzY3JldGVTaGFkb3djYXN0aW5nIGZyb20gXCIuL2Rpc2NyZXRlLXNoYWRvd2Nhc3RpbmcuanNcIjtcbmltcG9ydCBQcmVjaXNlU2hhZG93Y2FzdGluZyBmcm9tIFwiLi9wcmVjaXNlLXNoYWRvd2Nhc3RpbmcuanNcIjtcbmltcG9ydCBSZWN1cnNpdmVTaGFkb3djYXN0aW5nIGZyb20gXCIuL3JlY3Vyc2l2ZS1zaGFkb3djYXN0aW5nLmpzXCI7XG5leHBvcnQgZGVmYXVsdCB7IERpc2NyZXRlU2hhZG93Y2FzdGluZywgUHJlY2lzZVNoYWRvd2Nhc3RpbmcsIFJlY3Vyc2l2ZVNoYWRvd2Nhc3RpbmcgfTtcbiIsImltcG9ydCBGT1YgZnJvbSBcIi4vZm92LmpzXCI7XG4vKipcbiAqIEBjbGFzcyBQcmVjaXNlIHNoYWRvd2Nhc3RpbmcgYWxnb3JpdGhtXG4gKiBAYXVnbWVudHMgUk9ULkZPVlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVjaXNlU2hhZG93Y2FzdGluZyBleHRlbmRzIEZPViB7XG4gICAgY29tcHV0ZSh4LCB5LCBSLCBjYWxsYmFjaykge1xuICAgICAgICAvKiB0aGlzIHBsYWNlIGlzIGFsd2F5cyB2aXNpYmxlICovXG4gICAgICAgIGNhbGxiYWNrKHgsIHksIDAsIDEpO1xuICAgICAgICAvKiBzdGFuZGluZyBpbiBhIGRhcmsgcGxhY2UuIEZJWE1FIGlzIHRoaXMgYSBnb29kIGlkZWE/ICAqL1xuICAgICAgICBpZiAoIXRoaXMuX2xpZ2h0UGFzc2VzKHgsIHkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLyogbGlzdCBvZiBhbGwgc2hhZG93cyAqL1xuICAgICAgICBsZXQgU0hBRE9XUyA9IFtdO1xuICAgICAgICBsZXQgY3gsIGN5LCBibG9ja3MsIEExLCBBMiwgdmlzaWJpbGl0eTtcbiAgICAgICAgLyogYW5hbHl6ZSBzdXJyb3VuZGluZyBjZWxscyBpbiBjb25jZW50cmljIHJpbmdzLCBzdGFydGluZyBmcm9tIHRoZSBjZW50ZXIgKi9cbiAgICAgICAgZm9yIChsZXQgciA9IDE7IHIgPD0gUjsgcisrKSB7XG4gICAgICAgICAgICBsZXQgbmVpZ2hib3JzID0gdGhpcy5fZ2V0Q2lyY2xlKHgsIHksIHIpO1xuICAgICAgICAgICAgbGV0IG5laWdoYm9yQ291bnQgPSBuZWlnaGJvcnMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWlnaGJvckNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBjeCA9IG5laWdoYm9yc1tpXVswXTtcbiAgICAgICAgICAgICAgICBjeSA9IG5laWdoYm9yc1tpXVsxXTtcbiAgICAgICAgICAgICAgICAvKiBzaGlmdCBoYWxmLWFuLWFuZ2xlIGJhY2t3YXJkcyB0byBtYWludGFpbiBjb25zaXN0ZW5jeSBvZiAwLXRoIGNlbGxzICovXG4gICAgICAgICAgICAgICAgQTEgPSBbaSA/IDIgKiBpIC0gMSA6IDIgKiBuZWlnaGJvckNvdW50IC0gMSwgMiAqIG5laWdoYm9yQ291bnRdO1xuICAgICAgICAgICAgICAgIEEyID0gWzIgKiBpICsgMSwgMiAqIG5laWdoYm9yQ291bnRdO1xuICAgICAgICAgICAgICAgIGJsb2NrcyA9ICF0aGlzLl9saWdodFBhc3NlcyhjeCwgY3kpO1xuICAgICAgICAgICAgICAgIHZpc2liaWxpdHkgPSB0aGlzLl9jaGVja1Zpc2liaWxpdHkoQTEsIEEyLCBibG9ja3MsIFNIQURPV1MpO1xuICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGN4LCBjeSwgciwgdmlzaWJpbGl0eSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChTSEFET1dTLmxlbmd0aCA9PSAyICYmIFNIQURPV1NbMF1bMF0gPT0gMCAmJiBTSEFET1dTWzFdWzBdID09IFNIQURPV1NbMV1bMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gLyogY3V0b2ZmPyAqL1xuICAgICAgICAgICAgfSAvKiBmb3IgYWxsIGNlbGxzIGluIHRoaXMgcmluZyAqL1xuICAgICAgICB9IC8qIGZvciBhbGwgcmluZ3MgKi9cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtpbnRbMl19IEExIGFyYyBzdGFydFxuICAgICAqIEBwYXJhbSB7aW50WzJdfSBBMiBhcmMgZW5kXG4gICAgICogQHBhcmFtIHtib29sfSBibG9ja3MgRG9lcyBjdXJyZW50IGFyYyBibG9jayB2aXNpYmlsaXR5P1xuICAgICAqIEBwYXJhbSB7aW50W11bXX0gU0hBRE9XUyBsaXN0IG9mIGFjdGl2ZSBzaGFkb3dzXG4gICAgICovXG4gICAgX2NoZWNrVmlzaWJpbGl0eShBMSwgQTIsIGJsb2NrcywgU0hBRE9XUykge1xuICAgICAgICBpZiAoQTFbMF0gPiBBMlswXSkgeyAvKiBzcGxpdCBpbnRvIHR3byBzdWItYXJjcyAqL1xuICAgICAgICAgICAgbGV0IHYxID0gdGhpcy5fY2hlY2tWaXNpYmlsaXR5KEExLCBbQTFbMV0sIEExWzFdXSwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAgICAgICAgIGxldCB2MiA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShbMCwgMV0sIEEyLCBibG9ja3MsIFNIQURPV1MpO1xuICAgICAgICAgICAgcmV0dXJuICh2MSArIHYyKSAvIDI7XG4gICAgICAgIH1cbiAgICAgICAgLyogaW5kZXgxOiBmaXJzdCBzaGFkb3cgPj0gQTEgKi9cbiAgICAgICAgbGV0IGluZGV4MSA9IDAsIGVkZ2UxID0gZmFsc2U7XG4gICAgICAgIHdoaWxlIChpbmRleDEgPCBTSEFET1dTLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IG9sZCA9IFNIQURPV1NbaW5kZXgxXTtcbiAgICAgICAgICAgIGxldCBkaWZmID0gb2xkWzBdICogQTFbMV0gLSBBMVswXSAqIG9sZFsxXTtcbiAgICAgICAgICAgIGlmIChkaWZmID49IDApIHsgLyogb2xkID49IEExICovXG4gICAgICAgICAgICAgICAgaWYgKGRpZmYgPT0gMCAmJiAhKGluZGV4MSAlIDIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVkZ2UxID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRleDErKztcbiAgICAgICAgfVxuICAgICAgICAvKiBpbmRleDI6IGxhc3Qgc2hhZG93IDw9IEEyICovXG4gICAgICAgIGxldCBpbmRleDIgPSBTSEFET1dTLmxlbmd0aCwgZWRnZTIgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKGluZGV4Mi0tKSB7XG4gICAgICAgICAgICBsZXQgb2xkID0gU0hBRE9XU1tpbmRleDJdO1xuICAgICAgICAgICAgbGV0IGRpZmYgPSBBMlswXSAqIG9sZFsxXSAtIG9sZFswXSAqIEEyWzFdO1xuICAgICAgICAgICAgaWYgKGRpZmYgPj0gMCkgeyAvKiBvbGQgPD0gQTIgKi9cbiAgICAgICAgICAgICAgICBpZiAoZGlmZiA9PSAwICYmIChpbmRleDIgJSAyKSkge1xuICAgICAgICAgICAgICAgICAgICBlZGdlMiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCB2aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgaWYgKGluZGV4MSA9PSBpbmRleDIgJiYgKGVkZ2UxIHx8IGVkZ2UyKSkgeyAvKiBzdWJzZXQgb2YgZXhpc3Rpbmcgc2hhZG93LCBvbmUgb2YgdGhlIGVkZ2VzIG1hdGNoICovXG4gICAgICAgICAgICB2aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZWRnZTEgJiYgZWRnZTIgJiYgaW5kZXgxICsgMSA9PSBpbmRleDIgJiYgKGluZGV4MiAlIDIpKSB7IC8qIGNvbXBsZXRlbHkgZXF1aXZhbGVudCB3aXRoIGV4aXN0aW5nIHNoYWRvdyAqL1xuICAgICAgICAgICAgdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluZGV4MSA+IGluZGV4MiAmJiAoaW5kZXgxICUgMikpIHsgLyogc3Vic2V0IG9mIGV4aXN0aW5nIHNoYWRvdywgbm90IHRvdWNoaW5nICovXG4gICAgICAgICAgICB2aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2aXNpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSAvKiBmYXN0IGNhc2U6IG5vdCB2aXNpYmxlICovXG4gICAgICAgIGxldCB2aXNpYmxlTGVuZ3RoO1xuICAgICAgICAvKiBjb21wdXRlIHRoZSBsZW5ndGggb2YgdmlzaWJsZSBhcmMsIGFkanVzdCBsaXN0IG9mIHNoYWRvd3MgKGlmIGJsb2NraW5nKSAqL1xuICAgICAgICBsZXQgcmVtb3ZlID0gaW5kZXgyIC0gaW5kZXgxICsgMTtcbiAgICAgICAgaWYgKHJlbW92ZSAlIDIpIHtcbiAgICAgICAgICAgIGlmIChpbmRleDEgJSAyKSB7IC8qIGZpcnN0IGVkZ2Ugd2l0aGluIGV4aXN0aW5nIHNoYWRvdywgc2Vjb25kIG91dHNpZGUgKi9cbiAgICAgICAgICAgICAgICBsZXQgUCA9IFNIQURPV1NbaW5kZXgxXTtcbiAgICAgICAgICAgICAgICB2aXNpYmxlTGVuZ3RoID0gKEEyWzBdICogUFsxXSAtIFBbMF0gKiBBMlsxXSkgLyAoUFsxXSAqIEEyWzFdKTtcbiAgICAgICAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgICAgIFNIQURPV1Muc3BsaWNlKGluZGV4MSwgcmVtb3ZlLCBBMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8qIHNlY29uZCBlZGdlIHdpdGhpbiBleGlzdGluZyBzaGFkb3csIGZpcnN0IG91dHNpZGUgKi9cbiAgICAgICAgICAgICAgICBsZXQgUCA9IFNIQURPV1NbaW5kZXgyXTtcbiAgICAgICAgICAgICAgICB2aXNpYmxlTGVuZ3RoID0gKFBbMF0gKiBBMVsxXSAtIEExWzBdICogUFsxXSkgLyAoQTFbMV0gKiBQWzFdKTtcbiAgICAgICAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgICAgIFNIQURPV1Muc3BsaWNlKGluZGV4MSwgcmVtb3ZlLCBBMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGluZGV4MSAlIDIpIHsgLyogYm90aCBlZGdlcyB3aXRoaW4gZXhpc3Rpbmcgc2hhZG93cyAqL1xuICAgICAgICAgICAgICAgIGxldCBQMSA9IFNIQURPV1NbaW5kZXgxXTtcbiAgICAgICAgICAgICAgICBsZXQgUDIgPSBTSEFET1dTW2luZGV4Ml07XG4gICAgICAgICAgICAgICAgdmlzaWJsZUxlbmd0aCA9IChQMlswXSAqIFAxWzFdIC0gUDFbMF0gKiBQMlsxXSkgLyAoUDFbMV0gKiBQMlsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgICAgICAgICBTSEFET1dTLnNwbGljZShpbmRleDEsIHJlbW92ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8qIGJvdGggZWRnZXMgb3V0c2lkZSBleGlzdGluZyBzaGFkb3dzICovXG4gICAgICAgICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgICAgICAgICBTSEFET1dTLnNwbGljZShpbmRleDEsIHJlbW92ZSwgQTEsIEEyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7IC8qIHdob2xlIGFyYyB2aXNpYmxlISAqL1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBhcmNMZW5ndGggPSAoQTJbMF0gKiBBMVsxXSAtIEExWzBdICogQTJbMV0pIC8gKEExWzFdICogQTJbMV0pO1xuICAgICAgICByZXR1cm4gdmlzaWJsZUxlbmd0aCAvIGFyY0xlbmd0aDtcbiAgICB9XG59XG4iLCJpbXBvcnQgRk9WIGZyb20gXCIuL2Zvdi5qc1wiO1xuLyoqIE9jdGFudHMgdXNlZCBmb3IgdHJhbnNsYXRpbmcgcmVjdXJzaXZlIHNoYWRvd2Nhc3Rpbmcgb2Zmc2V0cyAqL1xuY29uc3QgT0NUQU5UUyA9IFtcbiAgICBbLTEsIDAsIDAsIDFdLFxuICAgIFswLCAtMSwgMSwgMF0sXG4gICAgWzAsIC0xLCAtMSwgMF0sXG4gICAgWy0xLCAwLCAwLCAtMV0sXG4gICAgWzEsIDAsIDAsIC0xXSxcbiAgICBbMCwgMSwgLTEsIDBdLFxuICAgIFswLCAxLCAxLCAwXSxcbiAgICBbMSwgMCwgMCwgMV1cbl07XG4vKipcbiAqIEBjbGFzcyBSZWN1cnNpdmUgc2hhZG93Y2FzdGluZyBhbGdvcml0aG1cbiAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIDQvOCB0b3BvbG9naWVzLCBub3QgaGV4YWdvbmFsLlxuICogQmFzZWQgb24gUGV0ZXIgSGFya2lucycgaW1wbGVtZW50YXRpb24gb2YgQmrDtnJuIEJlcmdzdHLDtm0ncyBhbGdvcml0aG0gZGVzY3JpYmVkIGhlcmU6IGh0dHA6Ly93d3cucm9ndWViYXNpbi5jb20vaW5kZXgucGhwP3RpdGxlPUZPVl91c2luZ19yZWN1cnNpdmVfc2hhZG93Y2FzdGluZ1xuICogQGF1Z21lbnRzIFJPVC5GT1ZcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdXJzaXZlU2hhZG93Y2FzdGluZyBleHRlbmRzIEZPViB7XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSB2aXNpYmlsaXR5IGZvciBhIDM2MC1kZWdyZWUgY2lyY2xlXG4gICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAqIEBwYXJhbSB7aW50fSBSIE1heGltdW0gdmlzaWJpbGl0eSByYWRpdXNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuICAgIGNvbXB1dGUoeCwgeSwgUiwgY2FsbGJhY2spIHtcbiAgICAgICAgLy9Zb3UgY2FuIGFsd2F5cyBzZWUgeW91ciBvd24gdGlsZVxuICAgICAgICBjYWxsYmFjayh4LCB5LCAwLCAxKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBPQ1RBTlRTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1tpXSwgUiwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgdmlzaWJpbGl0eSBmb3IgYSAxODAtZGVncmVlIGFyY1xuICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgKiBAcGFyYW0ge2ludH0gUiBNYXhpbXVtIHZpc2liaWxpdHkgcmFkaXVzXG4gICAgICogQHBhcmFtIHtpbnR9IGRpciBEaXJlY3Rpb24gdG8gbG9vayBpbiAoZXhwcmVzc2VkIGluIGEgUk9ULkRJUlMgdmFsdWUpO1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG4gICAgY29tcHV0ZTE4MCh4LCB5LCBSLCBkaXIsIGNhbGxiYWNrKSB7XG4gICAgICAgIC8vWW91IGNhbiBhbHdheXMgc2VlIHlvdXIgb3duIHRpbGVcbiAgICAgICAgY2FsbGJhY2soeCwgeSwgMCwgMSk7XG4gICAgICAgIGxldCBwcmV2aW91c09jdGFudCA9IChkaXIgLSAxICsgOCkgJSA4OyAvL05lZWQgdG8gcmV0cmlldmUgdGhlIHByZXZpb3VzIG9jdGFudCB0byByZW5kZXIgYSBmdWxsIDE4MCBkZWdyZWVzXG4gICAgICAgIGxldCBuZXh0UHJldmlvdXNPY3RhbnQgPSAoZGlyIC0gMiArIDgpICUgODsgLy9OZWVkIHRvIHJldHJpZXZlIHRoZSBwcmV2aW91cyB0d28gb2N0YW50cyB0byByZW5kZXIgYSBmdWxsIDE4MCBkZWdyZWVzXG4gICAgICAgIGxldCBuZXh0T2N0YW50ID0gKGRpciArIDEgKyA4KSAlIDg7IC8vTmVlZCB0byBncmFiIHRvIG5leHQgb2N0YW50IHRvIHJlbmRlciBhIGZ1bGwgMTgwIGRlZ3JlZXNcbiAgICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbbmV4dFByZXZpb3VzT2N0YW50XSwgUiwgY2FsbGJhY2spO1xuICAgICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1twcmV2aW91c09jdGFudF0sIFIsIGNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbZGlyXSwgUiwgY2FsbGJhY2spO1xuICAgICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1tuZXh0T2N0YW50XSwgUiwgY2FsbGJhY2spO1xuICAgIH1cbiAgICA7XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSB2aXNpYmlsaXR5IGZvciBhIDkwLWRlZ3JlZSBhcmNcbiAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICogQHBhcmFtIHtpbnR9IFIgTWF4aW11bSB2aXNpYmlsaXR5IHJhZGl1c1xuICAgICAqIEBwYXJhbSB7aW50fSBkaXIgRGlyZWN0aW9uIHRvIGxvb2sgaW4gKGV4cHJlc3NlZCBpbiBhIFJPVC5ESVJTIHZhbHVlKTtcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuICAgIGNvbXB1dGU5MCh4LCB5LCBSLCBkaXIsIGNhbGxiYWNrKSB7XG4gICAgICAgIC8vWW91IGNhbiBhbHdheXMgc2VlIHlvdXIgb3duIHRpbGVcbiAgICAgICAgY2FsbGJhY2soeCwgeSwgMCwgMSk7XG4gICAgICAgIGxldCBwcmV2aW91c09jdGFudCA9IChkaXIgLSAxICsgOCkgJSA4OyAvL05lZWQgdG8gcmV0cmlldmUgdGhlIHByZXZpb3VzIG9jdGFudCB0byByZW5kZXIgYSBmdWxsIDkwIGRlZ3JlZXNcbiAgICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbZGlyXSwgUiwgY2FsbGJhY2spO1xuICAgICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1twcmV2aW91c09jdGFudF0sIFIsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIG9uZSBvY3RhbnQgKDQ1LWRlZ3JlZSBhcmMpIG9mIHRoZSB2aWV3c2hlZFxuICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgKiBAcGFyYW0ge2ludH0gb2N0YW50IE9jdGFudCB0byBiZSByZW5kZXJlZFxuICAgICAqIEBwYXJhbSB7aW50fSBSIE1heGltdW0gdmlzaWJpbGl0eSByYWRpdXNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuICAgIF9yZW5kZXJPY3RhbnQoeCwgeSwgb2N0YW50LCBSLCBjYWxsYmFjaykge1xuICAgICAgICAvL1JhZGl1cyBpbmNyZW1lbnRlZCBieSAxIHRvIHByb3ZpZGUgc2FtZSBjb3ZlcmFnZSBhcmVhIGFzIG90aGVyIHNoYWRvd2Nhc3RpbmcgcmFkaXVzZXNcbiAgICAgICAgdGhpcy5fY2FzdFZpc2liaWxpdHkoeCwgeSwgMSwgMS4wLCAwLjAsIFIgKyAxLCBvY3RhbnRbMF0sIG9jdGFudFsxXSwgb2N0YW50WzJdLCBvY3RhbnRbM10sIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWN0dWFsbHkgY2FsY3VsYXRlcyB0aGUgdmlzaWJpbGl0eVxuICAgICAqIEBwYXJhbSB7aW50fSBzdGFydFggVGhlIHN0YXJ0aW5nIFggY29vcmRpbmF0ZVxuICAgICAqIEBwYXJhbSB7aW50fSBzdGFydFkgVGhlIHN0YXJ0aW5nIFkgY29vcmRpbmF0ZVxuICAgICAqIEBwYXJhbSB7aW50fSByb3cgVGhlIHJvdyB0byByZW5kZXJcbiAgICAgKiBAcGFyYW0ge2Zsb2F0fSB2aXNTbG9wZVN0YXJ0IFRoZSBzbG9wZSB0byBzdGFydCBhdFxuICAgICAqIEBwYXJhbSB7ZmxvYXR9IHZpc1Nsb3BlRW5kIFRoZSBzbG9wZSB0byBlbmQgYXRcbiAgICAgKiBAcGFyYW0ge2ludH0gcmFkaXVzIFRoZSByYWRpdXMgdG8gcmVhY2ggb3V0IHRvXG4gICAgICogQHBhcmFtIHtpbnR9IHh4XG4gICAgICogQHBhcmFtIHtpbnR9IHh5XG4gICAgICogQHBhcmFtIHtpbnR9IHl4XG4gICAgICogQHBhcmFtIHtpbnR9IHl5XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHVzZSB3aGVuIHdlIGhpdCBhIGJsb2NrIHRoYXQgaXMgdmlzaWJsZVxuICAgICAqL1xuICAgIF9jYXN0VmlzaWJpbGl0eShzdGFydFgsIHN0YXJ0WSwgcm93LCB2aXNTbG9wZVN0YXJ0LCB2aXNTbG9wZUVuZCwgcmFkaXVzLCB4eCwgeHksIHl4LCB5eSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHZpc1Nsb3BlU3RhcnQgPCB2aXNTbG9wZUVuZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSByb3c7IGkgPD0gcmFkaXVzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkeCA9IC1pIC0gMTtcbiAgICAgICAgICAgIGxldCBkeSA9IC1pO1xuICAgICAgICAgICAgbGV0IGJsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBuZXdTdGFydCA9IDA7XG4gICAgICAgICAgICAvLydSb3cnIGNvdWxkIGJlIGNvbHVtbiwgbmFtZXMgaGVyZSBhc3N1bWUgb2N0YW50IDAgYW5kIHdvdWxkIGJlIGZsaXBwZWQgZm9yIGhhbGYgdGhlIG9jdGFudHNcbiAgICAgICAgICAgIHdoaWxlIChkeCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgZHggKz0gMTtcbiAgICAgICAgICAgICAgICAvL1RyYW5zbGF0ZSBmcm9tIHJlbGF0aXZlIGNvb3JkaW5hdGVzIHRvIG1hcCBjb29yZGluYXRlc1xuICAgICAgICAgICAgICAgIGxldCBtYXBYID0gc3RhcnRYICsgZHggKiB4eCArIGR5ICogeHk7XG4gICAgICAgICAgICAgICAgbGV0IG1hcFkgPSBzdGFydFkgKyBkeCAqIHl4ICsgZHkgKiB5eTtcbiAgICAgICAgICAgICAgICAvL1JhbmdlIG9mIHRoZSByb3dcbiAgICAgICAgICAgICAgICBsZXQgc2xvcGVTdGFydCA9IChkeCAtIDAuNSkgLyAoZHkgKyAwLjUpO1xuICAgICAgICAgICAgICAgIGxldCBzbG9wZUVuZCA9IChkeCArIDAuNSkgLyAoZHkgLSAwLjUpO1xuICAgICAgICAgICAgICAgIC8vSWdub3JlIGlmIG5vdCB5ZXQgYXQgbGVmdCBlZGdlIG9mIE9jdGFudFxuICAgICAgICAgICAgICAgIGlmIChzbG9wZUVuZCA+IHZpc1Nsb3BlU3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vRG9uZSBpZiBwYXN0IHJpZ2h0IGVkZ2VcbiAgICAgICAgICAgICAgICBpZiAoc2xvcGVTdGFydCA8IHZpc1Nsb3BlRW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL0lmIGl0J3MgaW4gcmFuZ2UsIGl0J3MgdmlzaWJsZVxuICAgICAgICAgICAgICAgIGlmICgoZHggKiBkeCArIGR5ICogZHkpIDwgKHJhZGl1cyAqIHJhZGl1cykpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobWFwWCwgbWFwWSwgaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghYmxvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAvL0lmIHRpbGUgaXMgYSBibG9ja2luZyB0aWxlLCBjYXN0IGFyb3VuZCBpdFxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2xpZ2h0UGFzc2VzKG1hcFgsIG1hcFkpICYmIGkgPCByYWRpdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FzdFZpc2liaWxpdHkoc3RhcnRYLCBzdGFydFksIGkgKyAxLCB2aXNTbG9wZVN0YXJ0LCBzbG9wZVN0YXJ0LCByYWRpdXMsIHh4LCB4eSwgeXgsIHl5LCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTdGFydCA9IHNsb3BlRW5kO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL0tlZXAgbmFycm93aW5nIGlmIHNjYW5uaW5nIGFjcm9zcyBhIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbGlnaHRQYXNzZXMobWFwWCwgbWFwWSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1N0YXJ0ID0gc2xvcGVFbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL0Jsb2NrIGhhcyBlbmRlZFxuICAgICAgICAgICAgICAgICAgICBibG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZpc1Nsb3BlU3RhcnQgPSBuZXdTdGFydDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmxvY2tlZCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBSTkcgfSBmcm9tIFwiLi9ybmcuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRGlzcGxheSB9IGZyb20gXCIuL2Rpc3BsYXkvZGlzcGxheS5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTdHJpbmdHZW5lcmF0b3IgfSBmcm9tIFwiLi9zdHJpbmdnZW5lcmF0b3IuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRXZlbnRRdWV1ZSB9IGZyb20gXCIuL2V2ZW50cXVldWUuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2NoZWR1bGVyIH0gZnJvbSBcIi4vc2NoZWR1bGVyL2luZGV4LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEZPViB9IGZyb20gXCIuL2Zvdi9pbmRleC5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXAgfSBmcm9tIFwiLi9tYXAvaW5kZXguanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTm9pc2UgfSBmcm9tIFwiLi9ub2lzZS9pbmRleC5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQYXRoIH0gZnJvbSBcIi4vcGF0aC9pbmRleC5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmUuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTGlnaHRpbmcgfSBmcm9tIFwiLi9saWdodGluZy5qc1wiO1xuZXhwb3J0IHsgREVGQVVMVF9XSURUSCwgREVGQVVMVF9IRUlHSFQsIERJUlMsIEtFWVMgfSBmcm9tIFwiLi9jb25zdGFudHMuanNcIjtcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcIi4vdXRpbC5qc1wiO1xuZXhwb3J0IGNvbnN0IFV0aWwgPSB1dGlsO1xuaW1wb3J0ICogYXMgY29sb3IgZnJvbSBcIi4vY29sb3IuanNcIjtcbmV4cG9ydCBjb25zdCBDb2xvciA9IGNvbG9yO1xuaW1wb3J0ICogYXMgdGV4dCBmcm9tIFwiLi90ZXh0LmpzXCI7XG5leHBvcnQgY29uc3QgVGV4dCA9IHRleHQ7XG4iLCJpbXBvcnQgKiBhcyBDb2xvciBmcm9tIFwiLi9jb2xvci5qc1wiO1xuO1xuO1xuO1xuO1xuLyoqXG4gKiBMaWdodGluZyBjb21wdXRhdGlvbiwgYmFzZWQgb24gYSB0cmFkaXRpb25hbCBGT1YgZm9yIG11bHRpcGxlIGxpZ2h0IHNvdXJjZXMgYW5kIG11bHRpcGxlIHBhc3Nlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlnaHRpbmcge1xuICAgIGNvbnN0cnVjdG9yKHJlZmxlY3Rpdml0eUNhbGxiYWNrLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5fcmVmbGVjdGl2aXR5Q2FsbGJhY2sgPSByZWZsZWN0aXZpdHlDYWxsYmFjaztcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHt9O1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBwYXNzZXM6IDEsXG4gICAgICAgICAgICBlbWlzc2lvblRocmVzaG9sZDogMTAwLFxuICAgICAgICAgICAgcmFuZ2U6IDEwXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9saWdodHMgPSB7fTtcbiAgICAgICAgdGhpcy5fcmVmbGVjdGl2aXR5Q2FjaGUgPSB7fTtcbiAgICAgICAgdGhpcy5fZm92Q2FjaGUgPSB7fTtcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGp1c3Qgb3B0aW9ucyBhdCBydW50aW1lXG4gICAgICovXG4gICAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMucmFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB1c2VkIEZpZWxkLU9mLVZpZXcgYWxnb1xuICAgICAqL1xuICAgIHNldEZPVihmb3YpIHtcbiAgICAgICAgdGhpcy5fZm92ID0gZm92O1xuICAgICAgICB0aGlzLl9mb3ZDYWNoZSA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IChvciByZW1vdmUpIGEgbGlnaHQgc291cmNlXG4gICAgICovXG4gICAgc2V0TGlnaHQoeCwgeSwgY29sb3IpIHtcbiAgICAgICAgbGV0IGtleSA9IHggKyBcIixcIiArIHk7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgICAgdGhpcy5fbGlnaHRzW2tleV0gPSAodHlwZW9mIChjb2xvcikgPT0gXCJzdHJpbmdcIiA/IENvbG9yLmZyb21TdHJpbmcoY29sb3IpIDogY29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2xpZ2h0c1trZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGxpZ2h0IHNvdXJjZXNcbiAgICAgKi9cbiAgICBjbGVhckxpZ2h0cygpIHsgdGhpcy5fbGlnaHRzID0ge307IH1cbiAgICAvKipcbiAgICAgKiBSZXNldCB0aGUgcHJlLWNvbXB1dGVkIHRvcG9sb2d5IHZhbHVlcy4gQ2FsbCB3aGVuZXZlciB0aGUgdW5kZXJseWluZyBtYXAgY2hhbmdlcyBpdHMgbGlnaHQtcGFzc2FiaWxpdHkuXG4gICAgICovXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuX3JlZmxlY3Rpdml0eUNhY2hlID0ge307XG4gICAgICAgIHRoaXMuX2ZvdkNhY2hlID0ge307XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIHRoZSBsaWdodGluZ1xuICAgICAqL1xuICAgIGNvbXB1dGUobGlnaHRpbmdDYWxsYmFjaykge1xuICAgICAgICBsZXQgZG9uZUNlbGxzID0ge307XG4gICAgICAgIGxldCBlbWl0dGluZ0NlbGxzID0ge307XG4gICAgICAgIGxldCBsaXRDZWxscyA9IHt9O1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fbGlnaHRzKSB7IC8qIHByZXBhcmUgZW1pdHRlcnMgZm9yIGZpcnN0IHBhc3MgKi9cbiAgICAgICAgICAgIGxldCBsaWdodCA9IHRoaXMuX2xpZ2h0c1trZXldO1xuICAgICAgICAgICAgZW1pdHRpbmdDZWxsc1trZXldID0gWzAsIDAsIDBdO1xuICAgICAgICAgICAgQ29sb3IuYWRkXyhlbWl0dGluZ0NlbGxzW2tleV0sIGxpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX29wdGlvbnMucGFzc2VzOyBpKyspIHsgLyogbWFpbiBsb29wICovXG4gICAgICAgICAgICB0aGlzLl9lbWl0TGlnaHQoZW1pdHRpbmdDZWxscywgbGl0Q2VsbHMsIGRvbmVDZWxscyk7XG4gICAgICAgICAgICBpZiAoaSArIDEgPT0gdGhpcy5fb3B0aW9ucy5wYXNzZXMpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gLyogbm90IGZvciB0aGUgbGFzdCBwYXNzICovXG4gICAgICAgICAgICBlbWl0dGluZ0NlbGxzID0gdGhpcy5fY29tcHV0ZUVtaXR0ZXJzKGxpdENlbGxzLCBkb25lQ2VsbHMpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGxpdEtleSBpbiBsaXRDZWxscykgeyAvKiBsZXQgdGhlIHVzZXIga25vdyB3aGF0IGFuZCBob3cgaXMgbGl0ICovXG4gICAgICAgICAgICBsZXQgcGFydHMgPSBsaXRLZXkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgbGV0IHggPSBwYXJzZUludChwYXJ0c1swXSk7XG4gICAgICAgICAgICBsZXQgeSA9IHBhcnNlSW50KHBhcnRzWzFdKTtcbiAgICAgICAgICAgIGxpZ2h0aW5nQ2FsbGJhY2soeCwgeSwgbGl0Q2VsbHNbbGl0S2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgb25lIGl0ZXJhdGlvbiBmcm9tIGFsbCBlbWl0dGluZyBjZWxsc1xuICAgICAqIEBwYXJhbSBlbWl0dGluZ0NlbGxzIFRoZXNlIGVtaXQgbGlnaHRcbiAgICAgKiBAcGFyYW0gbGl0Q2VsbHMgQWRkIHByb2plY3RlZCBsaWdodCB0byB0aGVzZVxuICAgICAqIEBwYXJhbSBkb25lQ2VsbHMgVGhlc2UgYWxyZWFkeSBlbWl0dGVkLCBmb3JiaWQgdGhlbSBmcm9tIGZ1cnRoZXIgY2FsY3VsYXRpb25zXG4gICAgICovXG4gICAgX2VtaXRMaWdodChlbWl0dGluZ0NlbGxzLCBsaXRDZWxscywgZG9uZUNlbGxzKSB7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBlbWl0dGluZ0NlbGxzKSB7XG4gICAgICAgICAgICBsZXQgcGFydHMgPSBrZXkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgbGV0IHggPSBwYXJzZUludChwYXJ0c1swXSk7XG4gICAgICAgICAgICBsZXQgeSA9IHBhcnNlSW50KHBhcnRzWzFdKTtcbiAgICAgICAgICAgIHRoaXMuX2VtaXRMaWdodEZyb21DZWxsKHgsIHksIGVtaXR0aW5nQ2VsbHNba2V5XSwgbGl0Q2VsbHMpO1xuICAgICAgICAgICAgZG9uZUNlbGxzW2tleV0gPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcmVwYXJlIGEgbGlzdCBvZiBlbWl0dGVycyBmb3IgbmV4dCBwYXNzXG4gICAgICovXG4gICAgX2NvbXB1dGVFbWl0dGVycyhsaXRDZWxscywgZG9uZUNlbGxzKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB7fTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGxpdENlbGxzKSB7XG4gICAgICAgICAgICBpZiAoa2V5IGluIGRvbmVDZWxscykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSAvKiBhbHJlYWR5IGVtaXR0ZWQgKi9cbiAgICAgICAgICAgIGxldCBjb2xvciA9IGxpdENlbGxzW2tleV07XG4gICAgICAgICAgICBsZXQgcmVmbGVjdGl2aXR5O1xuICAgICAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9yZWZsZWN0aXZpdHlDYWNoZSkge1xuICAgICAgICAgICAgICAgIHJlZmxlY3Rpdml0eSA9IHRoaXMuX3JlZmxlY3Rpdml0eUNhY2hlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFydHMgPSBrZXkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgICAgIGxldCB4ID0gcGFyc2VJbnQocGFydHNbMF0pO1xuICAgICAgICAgICAgICAgIGxldCB5ID0gcGFyc2VJbnQocGFydHNbMV0pO1xuICAgICAgICAgICAgICAgIHJlZmxlY3Rpdml0eSA9IHRoaXMuX3JlZmxlY3Rpdml0eUNhbGxiYWNrKHgsIHkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlZmxlY3Rpdml0eUNhY2hlW2tleV0gPSByZWZsZWN0aXZpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVmbGVjdGl2aXR5ID09IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gLyogd2lsbCBub3QgcmVmbGVjdCBhdCBhbGwgKi9cbiAgICAgICAgICAgIC8qIGNvbXB1dGUgZW1pc3Npb24gY29sb3IgKi9cbiAgICAgICAgICAgIGxldCBlbWlzc2lvbiA9IFswLCAwLCAwXTtcbiAgICAgICAgICAgIGxldCBpbnRlbnNpdHkgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFydCA9IE1hdGgucm91bmQoY29sb3JbaV0gKiByZWZsZWN0aXZpdHkpO1xuICAgICAgICAgICAgICAgIGVtaXNzaW9uW2ldID0gcGFydDtcbiAgICAgICAgICAgICAgICBpbnRlbnNpdHkgKz0gcGFydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbnRlbnNpdHkgPiB0aGlzLl9vcHRpb25zLmVtaXNzaW9uVGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBlbWlzc2lvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIG9uZSBpdGVyYXRpb24gZnJvbSBvbmUgY2VsbFxuICAgICAqL1xuICAgIF9lbWl0TGlnaHRGcm9tQ2VsbCh4LCB5LCBjb2xvciwgbGl0Q2VsbHMpIHtcbiAgICAgICAgbGV0IGtleSA9IHggKyBcIixcIiArIHk7XG4gICAgICAgIGxldCBmb3Y7XG4gICAgICAgIGlmIChrZXkgaW4gdGhpcy5fZm92Q2FjaGUpIHtcbiAgICAgICAgICAgIGZvdiA9IHRoaXMuX2ZvdkNhY2hlW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3YgPSB0aGlzLl91cGRhdGVGT1YoeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgZm92S2V5IGluIGZvdikge1xuICAgICAgICAgICAgbGV0IGZvcm1GYWN0b3IgPSBmb3ZbZm92S2V5XTtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBpZiAoZm92S2V5IGluIGxpdENlbGxzKSB7IC8qIGFscmVhZHkgbGl0ICovXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbGl0Q2VsbHNbZm92S2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvKiBuZXdseSBsaXQgKi9cbiAgICAgICAgICAgICAgICByZXN1bHQgPSBbMCwgMCwgMF07XG4gICAgICAgICAgICAgICAgbGl0Q2VsbHNbZm92S2V5XSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2ldICs9IE1hdGgucm91bmQoY29sb3JbaV0gKiBmb3JtRmFjdG9yKTtcbiAgICAgICAgICAgIH0gLyogYWRkIGxpZ2h0IGNvbG9yICovXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgRk9WIChcImZvcm0gZmFjdG9yXCIpIGZvciBhIHBvdGVudGlhbCBsaWdodCBzb3VyY2UgYXQgW3gseV1cbiAgICAgKi9cbiAgICBfdXBkYXRlRk9WKHgsIHkpIHtcbiAgICAgICAgbGV0IGtleTEgPSB4ICsgXCIsXCIgKyB5O1xuICAgICAgICBsZXQgY2FjaGUgPSB7fTtcbiAgICAgICAgdGhpcy5fZm92Q2FjaGVba2V5MV0gPSBjYWNoZTtcbiAgICAgICAgbGV0IHJhbmdlID0gdGhpcy5fb3B0aW9ucy5yYW5nZTtcbiAgICAgICAgZnVuY3Rpb24gY2IoeCwgeSwgciwgdmlzKSB7XG4gICAgICAgICAgICBsZXQga2V5MiA9IHggKyBcIixcIiArIHk7XG4gICAgICAgICAgICBsZXQgZm9ybUZhY3RvciA9IHZpcyAqICgxIC0gciAvIHJhbmdlKTtcbiAgICAgICAgICAgIGlmIChmb3JtRmFjdG9yID09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWNoZVtrZXkyXSA9IGZvcm1GYWN0b3I7XG4gICAgICAgIH1cbiAgICAgICAgO1xuICAgICAgICB0aGlzLl9mb3YuY29tcHV0ZSh4LCB5LCByYW5nZSwgY2IuYmluZCh0aGlzKSk7XG4gICAgICAgIHJldHVybiBjYWNoZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTWFwIGZyb20gXCIuL21hcC5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgU2ltcGxlIGVtcHR5IHJlY3Rhbmd1bGFyIHJvb21cbiAqIEBhdWdtZW50cyBST1QuTWFwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFyZW5hIGV4dGVuZHMgTWFwIHtcbiAgICBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHcgPSB0aGlzLl93aWR0aCAtIDE7XG4gICAgICAgIGxldCBoID0gdGhpcy5faGVpZ2h0IC0gMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdzsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZW1wdHkgPSAoaSAmJiBqICYmIGkgPCB3ICYmIGogPCBoKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhpLCBqLCBlbXB0eSA/IDAgOiAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgTWFwIGZyb20gXCIuL21hcC5qc1wiO1xuaW1wb3J0IHsgRElSUyB9IGZyb20gXCIuLi9jb25zdGFudHMuanNcIjtcbmltcG9ydCBSTkcgZnJvbSBcIi4uL3JuZy5qc1wiO1xuO1xuLyoqXG4gKiBAY2xhc3MgQ2VsbHVsYXIgYXV0b21hdG9uIG1hcCBnZW5lcmF0b3JcbiAqIEBhdWdtZW50cyBST1QuTWFwXG4gKiBAcGFyYW0ge2ludH0gW3dpZHRoPVJPVC5ERUZBVUxUX1dJRFRIXVxuICogQHBhcmFtIHtpbnR9IFtoZWlnaHQ9Uk9ULkRFRkFVTFRfSEVJR0hUXVxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSBPcHRpb25zXG4gKiBAcGFyYW0ge2ludFtdfSBbb3B0aW9ucy5ib3JuXSBMaXN0IG9mIG5laWdoYm9yIGNvdW50cyBmb3IgYSBuZXcgY2VsbCB0byBiZSBib3JuIGluIGVtcHR5IHNwYWNlXG4gKiBAcGFyYW0ge2ludFtdfSBbb3B0aW9ucy5zdXJ2aXZlXSBMaXN0IG9mIG5laWdoYm9yIGNvdW50cyBmb3IgYW4gZXhpc3RpbmcgIGNlbGwgdG8gc3Vydml2ZVxuICogQHBhcmFtIHtpbnR9IFtvcHRpb25zLnRvcG9sb2d5XSBUb3BvbG9neSA0IG9yIDYgb3IgOFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDZWxsdWxhciBleHRlbmRzIE1hcCB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0ge1xuICAgICAgICAgICAgYm9ybjogWzUsIDYsIDcsIDhdLFxuICAgICAgICAgICAgc3Vydml2ZTogWzQsIDUsIDYsIDcsIDhdLFxuICAgICAgICAgICAgdG9wb2xvZ3k6IDhcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9kaXJzID0gRElSU1t0aGlzLl9vcHRpb25zLnRvcG9sb2d5XTtcbiAgICAgICAgdGhpcy5fbWFwID0gdGhpcy5fZmlsbE1hcCgwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmlsbCB0aGUgbWFwIHdpdGggcmFuZG9tIHZhbHVlc1xuICAgICAqIEBwYXJhbSB7ZmxvYXR9IHByb2JhYmlsaXR5IFByb2JhYmlsaXR5IGZvciBhIGNlbGwgdG8gYmVjb21lIGFsaXZlOyAwID0gYWxsIGVtcHR5LCAxID0gYWxsIGZ1bGxcbiAgICAgKi9cbiAgICByYW5kb21pemUocHJvYmFiaWxpdHkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwW2ldW2pdID0gKFJORy5nZXRVbmlmb3JtKCkgPCBwcm9iYWJpbGl0eSA/IDEgOiAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hhbmdlIG9wdGlvbnMuXG4gICAgICogQHNlZSBST1QuTWFwLkNlbGx1bGFyXG4gICAgICovXG4gICAgc2V0T3B0aW9ucyhvcHRpb25zKSB7IE9iamVjdC5hc3NpZ24odGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7IH1cbiAgICBzZXQoeCwgeSwgdmFsdWUpIHsgdGhpcy5fbWFwW3hdW3ldID0gdmFsdWU7IH1cbiAgICBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IG5ld01hcCA9IHRoaXMuX2ZpbGxNYXAoMCk7XG4gICAgICAgIGxldCBib3JuID0gdGhpcy5fb3B0aW9ucy5ib3JuO1xuICAgICAgICBsZXQgc3Vydml2ZSA9IHRoaXMuX29wdGlvbnMuc3Vydml2ZTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgbGV0IHdpZHRoU3RlcCA9IDE7XG4gICAgICAgICAgICBsZXQgd2lkdGhTdGFydCA9IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50b3BvbG9neSA9PSA2KSB7XG4gICAgICAgICAgICAgICAgd2lkdGhTdGVwID0gMjtcbiAgICAgICAgICAgICAgICB3aWR0aFN0YXJ0ID0gaiAlIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gd2lkdGhTdGFydDsgaSA8IHRoaXMuX3dpZHRoOyBpICs9IHdpZHRoU3RlcCkge1xuICAgICAgICAgICAgICAgIGxldCBjdXIgPSB0aGlzLl9tYXBbaV1bal07XG4gICAgICAgICAgICAgICAgbGV0IG5jb3VudCA9IHRoaXMuX2dldE5laWdoYm9ycyhpLCBqKTtcbiAgICAgICAgICAgICAgICBpZiAoY3VyICYmIHN1cnZpdmUuaW5kZXhPZihuY291bnQpICE9IC0xKSB7IC8qIHN1cnZpdmUgKi9cbiAgICAgICAgICAgICAgICAgICAgbmV3TWFwW2ldW2pdID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIWN1ciAmJiBib3JuLmluZGV4T2YobmNvdW50KSAhPSAtMSkgeyAvKiBib3JuICovXG4gICAgICAgICAgICAgICAgICAgIG5ld01hcFtpXVtqXSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hcCA9IG5ld01hcDtcbiAgICAgICAgY2FsbGJhY2sgJiYgdGhpcy5fc2VydmljZUNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgX3NlcnZpY2VDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgICBsZXQgd2lkdGhTdGVwID0gMTtcbiAgICAgICAgICAgIGxldCB3aWR0aFN0YXJ0ID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5ID09IDYpIHtcbiAgICAgICAgICAgICAgICB3aWR0aFN0ZXAgPSAyO1xuICAgICAgICAgICAgICAgIHdpZHRoU3RhcnQgPSBqICUgMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB3aWR0aFN0YXJ0OyBpIDwgdGhpcy5fd2lkdGg7IGkgKz0gd2lkdGhTdGVwKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgdGhpcy5fbWFwW2ldW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgbmVpZ2hib3IgY291bnQgYXQgW2ksal0gaW4gdGhpcy5fbWFwXG4gICAgICovXG4gICAgX2dldE5laWdoYm9ycyhjeCwgY3kpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZGlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGRpciA9IHRoaXMuX2RpcnNbaV07XG4gICAgICAgICAgICBsZXQgeCA9IGN4ICsgZGlyWzBdO1xuICAgICAgICAgICAgbGV0IHkgPSBjeSArIGRpclsxXTtcbiAgICAgICAgICAgIGlmICh4IDwgMCB8fCB4ID49IHRoaXMuX3dpZHRoIHx8IHkgPCAwIHx8IHkgPj0gdGhpcy5faGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgKz0gKHRoaXMuX21hcFt4XVt5XSA9PSAxID8gMSA6IDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ha2Ugc3VyZSBldmVyeSBub24td2FsbCBzcGFjZSBpcyBhY2Nlc3NpYmxlLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIHRvIGNhbGwgdG8gZGlzcGxheSBtYXAgd2hlbiBkb1xuICAgICAqIEBwYXJhbSB7aW50fSB2YWx1ZSB0byBjb25zaWRlciBlbXB0eSBzcGFjZSAtIGRlZmF1bHRzIHRvIDBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayB0byBjYWxsIHdoZW4gYSBuZXcgY29ubmVjdGlvbiBpcyBtYWRlXG4gICAgICovXG4gICAgY29ubmVjdChjYWxsYmFjaywgdmFsdWUsIGNvbm5lY3Rpb25DYWxsYmFjaykge1xuICAgICAgICBpZiAoIXZhbHVlKVxuICAgICAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgICBsZXQgYWxsRnJlZVNwYWNlID0gW107XG4gICAgICAgIGxldCBub3RDb25uZWN0ZWQgPSB7fTtcbiAgICAgICAgLy8gZmluZCBhbGwgZnJlZSBzcGFjZVxuICAgICAgICBsZXQgd2lkdGhTdGVwID0gMTtcbiAgICAgICAgbGV0IHdpZHRoU3RhcnRzID0gWzAsIDBdO1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50b3BvbG9neSA9PSA2KSB7XG4gICAgICAgICAgICB3aWR0aFN0ZXAgPSAyO1xuICAgICAgICAgICAgd2lkdGhTdGFydHMgPSBbMCwgMV07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLl9oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IHdpZHRoU3RhcnRzW3kgJSAyXTsgeCA8IHRoaXMuX3dpZHRoOyB4ICs9IHdpZHRoU3RlcCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9mcmVlU3BhY2UoeCwgeSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwID0gW3gsIHldO1xuICAgICAgICAgICAgICAgICAgICBub3RDb25uZWN0ZWRbdGhpcy5fcG9pbnRLZXkocCldID0gcDtcbiAgICAgICAgICAgICAgICAgICAgYWxsRnJlZVNwYWNlLnB1c2goW3gsIHldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0YXJ0ID0gYWxsRnJlZVNwYWNlW1JORy5nZXRVbmlmb3JtSW50KDAsIGFsbEZyZWVTcGFjZS5sZW5ndGggLSAxKV07XG4gICAgICAgIGxldCBrZXkgPSB0aGlzLl9wb2ludEtleShzdGFydCk7XG4gICAgICAgIGxldCBjb25uZWN0ZWQgPSB7fTtcbiAgICAgICAgY29ubmVjdGVkW2tleV0gPSBzdGFydDtcbiAgICAgICAgZGVsZXRlIG5vdENvbm5lY3RlZFtrZXldO1xuICAgICAgICAvLyBmaW5kIHdoYXQncyBjb25uZWN0ZWQgdG8gdGhlIHN0YXJ0aW5nIHBvaW50XG4gICAgICAgIHRoaXMuX2ZpbmRDb25uZWN0ZWQoY29ubmVjdGVkLCBub3RDb25uZWN0ZWQsIFtzdGFydF0sIGZhbHNlLCB2YWx1ZSk7XG4gICAgICAgIHdoaWxlIChPYmplY3Qua2V5cyhub3RDb25uZWN0ZWQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIGZpbmQgdHdvIHBvaW50cyBmcm9tIG5vdENvbm5lY3RlZCB0byBjb25uZWN0ZWRcbiAgICAgICAgICAgIGxldCBwID0gdGhpcy5fZ2V0RnJvbVRvKGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkKTtcbiAgICAgICAgICAgIGxldCBmcm9tID0gcFswXTsgLy8gbm90Q29ubmVjdGVkXG4gICAgICAgICAgICBsZXQgdG8gPSBwWzFdOyAvLyBjb25uZWN0ZWRcbiAgICAgICAgICAgIC8vIGZpbmQgZXZlcnl0aGluZyBjb25uZWN0ZWQgdG8gdGhlIHN0YXJ0aW5nIHBvaW50XG4gICAgICAgICAgICBsZXQgbG9jYWwgPSB7fTtcbiAgICAgICAgICAgIGxvY2FsW3RoaXMuX3BvaW50S2V5KGZyb20pXSA9IGZyb207XG4gICAgICAgICAgICB0aGlzLl9maW5kQ29ubmVjdGVkKGxvY2FsLCBub3RDb25uZWN0ZWQsIFtmcm9tXSwgdHJ1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgLy8gY29ubmVjdCB0byBhIGNvbm5lY3RlZCBjZWxsXG4gICAgICAgICAgICBsZXQgdHVubmVsRm4gPSAodGhpcy5fb3B0aW9ucy50b3BvbG9neSA9PSA2ID8gdGhpcy5fdHVubmVsVG9Db25uZWN0ZWQ2IDogdGhpcy5fdHVubmVsVG9Db25uZWN0ZWQpO1xuICAgICAgICAgICAgdHVubmVsRm4uY2FsbCh0aGlzLCB0bywgZnJvbSwgY29ubmVjdGVkLCBub3RDb25uZWN0ZWQsIHZhbHVlLCBjb25uZWN0aW9uQ2FsbGJhY2spO1xuICAgICAgICAgICAgLy8gbm93IGFsbCBvZiBsb2NhbCBpcyBjb25uZWN0ZWRcbiAgICAgICAgICAgIGZvciAobGV0IGsgaW4gbG9jYWwpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHAgPSBsb2NhbFtrXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXBbcHBbMF1dW3BwWzFdXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFtrXSA9IHBwO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBub3RDb25uZWN0ZWRba107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2sgJiYgdGhpcy5fc2VydmljZUNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmluZCByYW5kb20gcG9pbnRzIHRvIGNvbm5lY3QuIFNlYXJjaCBmb3IgdGhlIGNsb3Nlc3QgcG9pbnQgaW4gdGhlIGxhcmdlciBzcGFjZS5cbiAgICAgKiBUaGlzIGlzIHRvIG1pbmltaXplIHRoZSBsZW5ndGggb2YgdGhlIHBhc3NhZ2Ugd2hpbGUgbWFpbnRhaW5pbmcgZ29vZCBwZXJmb3JtYW5jZS5cbiAgICAgKi9cbiAgICBfZ2V0RnJvbVRvKGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkKSB7XG4gICAgICAgIGxldCBmcm9tID0gWzAsIDBdLCB0byA9IFswLCAwXSwgZDtcbiAgICAgICAgbGV0IGNvbm5lY3RlZEtleXMgPSBPYmplY3Qua2V5cyhjb25uZWN0ZWQpO1xuICAgICAgICBsZXQgbm90Q29ubmVjdGVkS2V5cyA9IE9iamVjdC5rZXlzKG5vdENvbm5lY3RlZCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY29ubmVjdGVkS2V5cy5sZW5ndGggPCBub3RDb25uZWN0ZWRLZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxldCBrZXlzID0gY29ubmVjdGVkS2V5cztcbiAgICAgICAgICAgICAgICB0byA9IGNvbm5lY3RlZFtrZXlzW1JORy5nZXRVbmlmb3JtSW50KDAsIGtleXMubGVuZ3RoIC0gMSldXTtcbiAgICAgICAgICAgICAgICBmcm9tID0gdGhpcy5fZ2V0Q2xvc2VzdCh0bywgbm90Q29ubmVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBrZXlzID0gbm90Q29ubmVjdGVkS2V5cztcbiAgICAgICAgICAgICAgICBmcm9tID0gbm90Q29ubmVjdGVkW2tleXNbUk5HLmdldFVuaWZvcm1JbnQoMCwga2V5cy5sZW5ndGggLSAxKV1dO1xuICAgICAgICAgICAgICAgIHRvID0gdGhpcy5fZ2V0Q2xvc2VzdChmcm9tLCBjb25uZWN0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZCA9IChmcm9tWzBdIC0gdG9bMF0pICogKGZyb21bMF0gLSB0b1swXSkgKyAoZnJvbVsxXSAtIHRvWzFdKSAqIChmcm9tWzFdIC0gdG9bMV0pO1xuICAgICAgICAgICAgaWYgKGQgPCA2NCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPj4+IGNvbm5lY3RlZD1cIiArIHRvICsgXCIgbm90Q29ubmVjdGVkPVwiICsgZnJvbSArIFwiIGRpc3Q9XCIgKyBkKTtcbiAgICAgICAgcmV0dXJuIFtmcm9tLCB0b107XG4gICAgfVxuICAgIF9nZXRDbG9zZXN0KHBvaW50LCBzcGFjZSkge1xuICAgICAgICBsZXQgbWluUG9pbnQgPSBudWxsO1xuICAgICAgICBsZXQgbWluRGlzdCA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGsgaW4gc3BhY2UpIHtcbiAgICAgICAgICAgIGxldCBwID0gc3BhY2Vba107XG4gICAgICAgICAgICBsZXQgZCA9IChwWzBdIC0gcG9pbnRbMF0pICogKHBbMF0gLSBwb2ludFswXSkgKyAocFsxXSAtIHBvaW50WzFdKSAqIChwWzFdIC0gcG9pbnRbMV0pO1xuICAgICAgICAgICAgaWYgKG1pbkRpc3QgPT0gbnVsbCB8fCBkIDwgbWluRGlzdCkge1xuICAgICAgICAgICAgICAgIG1pbkRpc3QgPSBkO1xuICAgICAgICAgICAgICAgIG1pblBvaW50ID0gcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluUG9pbnQ7XG4gICAgfVxuICAgIF9maW5kQ29ubmVjdGVkKGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkLCBzdGFjaywga2VlcE5vdENvbm5lY3RlZCwgdmFsdWUpIHtcbiAgICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBwID0gc3RhY2suc3BsaWNlKDAsIDEpWzBdO1xuICAgICAgICAgICAgbGV0IHRlc3RzO1xuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kgPT0gNikge1xuICAgICAgICAgICAgICAgIHRlc3RzID0gW1xuICAgICAgICAgICAgICAgICAgICBbcFswXSArIDIsIHBbMV1dLFxuICAgICAgICAgICAgICAgICAgICBbcFswXSArIDEsIHBbMV0gLSAxXSxcbiAgICAgICAgICAgICAgICAgICAgW3BbMF0gLSAxLCBwWzFdIC0gMV0sXG4gICAgICAgICAgICAgICAgICAgIFtwWzBdIC0gMiwgcFsxXV0sXG4gICAgICAgICAgICAgICAgICAgIFtwWzBdIC0gMSwgcFsxXSArIDFdLFxuICAgICAgICAgICAgICAgICAgICBbcFswXSArIDEsIHBbMV0gKyAxXSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGVzdHMgPSBbXG4gICAgICAgICAgICAgICAgICAgIFtwWzBdICsgMSwgcFsxXV0sXG4gICAgICAgICAgICAgICAgICAgIFtwWzBdIC0gMSwgcFsxXV0sXG4gICAgICAgICAgICAgICAgICAgIFtwWzBdLCBwWzFdICsgMV0sXG4gICAgICAgICAgICAgICAgICAgIFtwWzBdLCBwWzFdIC0gMV1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBrZXkgPSB0aGlzLl9wb2ludEtleSh0ZXN0c1tpXSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbm5lY3RlZFtrZXldID09IG51bGwgJiYgdGhpcy5fZnJlZVNwYWNlKHRlc3RzW2ldWzBdLCB0ZXN0c1tpXVsxXSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3RlZFtrZXldID0gdGVzdHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICgha2VlcE5vdENvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG5vdENvbm5lY3RlZFtrZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2godGVzdHNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfdHVubmVsVG9Db25uZWN0ZWQodG8sIGZyb20sIGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkLCB2YWx1ZSwgY29ubmVjdGlvbkNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBhLCBiO1xuICAgICAgICBpZiAoZnJvbVswXSA8IHRvWzBdKSB7XG4gICAgICAgICAgICBhID0gZnJvbTtcbiAgICAgICAgICAgIGIgPSB0bztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGEgPSB0bztcbiAgICAgICAgICAgIGIgPSBmcm9tO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHh4ID0gYVswXTsgeHggPD0gYlswXTsgeHgrKykge1xuICAgICAgICAgICAgdGhpcy5fbWFwW3h4XVthWzFdXSA9IHZhbHVlO1xuICAgICAgICAgICAgbGV0IHAgPSBbeHgsIGFbMV1dO1xuICAgICAgICAgICAgbGV0IHBrZXkgPSB0aGlzLl9wb2ludEtleShwKTtcbiAgICAgICAgICAgIGNvbm5lY3RlZFtwa2V5XSA9IHA7XG4gICAgICAgICAgICBkZWxldGUgbm90Q29ubmVjdGVkW3BrZXldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25uZWN0aW9uQ2FsbGJhY2sgJiYgYVswXSA8IGJbMF0pIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb25DYWxsYmFjayhhLCBbYlswXSwgYVsxXV0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHggaXMgbm93IGZpeGVkXG4gICAgICAgIGxldCB4ID0gYlswXTtcbiAgICAgICAgaWYgKGZyb21bMV0gPCB0b1sxXSkge1xuICAgICAgICAgICAgYSA9IGZyb207XG4gICAgICAgICAgICBiID0gdG87XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhID0gdG87XG4gICAgICAgICAgICBiID0gZnJvbTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCB5eSA9IGFbMV07IHl5IDwgYlsxXTsgeXkrKykge1xuICAgICAgICAgICAgdGhpcy5fbWFwW3hdW3l5XSA9IHZhbHVlO1xuICAgICAgICAgICAgbGV0IHAgPSBbeCwgeXldO1xuICAgICAgICAgICAgbGV0IHBrZXkgPSB0aGlzLl9wb2ludEtleShwKTtcbiAgICAgICAgICAgIGNvbm5lY3RlZFtwa2V5XSA9IHA7XG4gICAgICAgICAgICBkZWxldGUgbm90Q29ubmVjdGVkW3BrZXldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25uZWN0aW9uQ2FsbGJhY2sgJiYgYVsxXSA8IGJbMV0pIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb25DYWxsYmFjayhbYlswXSwgYVsxXV0sIFtiWzBdLCBiWzFdXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3R1bm5lbFRvQ29ubmVjdGVkNih0bywgZnJvbSwgY29ubmVjdGVkLCBub3RDb25uZWN0ZWQsIHZhbHVlLCBjb25uZWN0aW9uQ2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGEsIGI7XG4gICAgICAgIGlmIChmcm9tWzBdIDwgdG9bMF0pIHtcbiAgICAgICAgICAgIGEgPSBmcm9tO1xuICAgICAgICAgICAgYiA9IHRvO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYSA9IHRvO1xuICAgICAgICAgICAgYiA9IGZyb207XG4gICAgICAgIH1cbiAgICAgICAgLy8gdHVubmVsIGRpYWdvbmFsbHkgdW50aWwgaG9yaXpvbnRhbGx5IGxldmVsXG4gICAgICAgIGxldCB4eCA9IGFbMF07XG4gICAgICAgIGxldCB5eSA9IGFbMV07XG4gICAgICAgIHdoaWxlICghKHh4ID09IGJbMF0gJiYgeXkgPT0gYlsxXSkpIHtcbiAgICAgICAgICAgIGxldCBzdGVwV2lkdGggPSAyO1xuICAgICAgICAgICAgaWYgKHl5IDwgYlsxXSkge1xuICAgICAgICAgICAgICAgIHl5Kys7XG4gICAgICAgICAgICAgICAgc3RlcFdpZHRoID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHl5ID4gYlsxXSkge1xuICAgICAgICAgICAgICAgIHl5LS07XG4gICAgICAgICAgICAgICAgc3RlcFdpZHRoID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh4eCA8IGJbMF0pIHtcbiAgICAgICAgICAgICAgICB4eCArPSBzdGVwV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh4eCA+IGJbMF0pIHtcbiAgICAgICAgICAgICAgICB4eCAtPSBzdGVwV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiWzFdICUgMikge1xuICAgICAgICAgICAgICAgIC8vIFdvbid0IHN0ZXAgb3V0c2lkZSBtYXAgaWYgZGVzdGluYXRpb24gb24gaXMgbWFwJ3MgcmlnaHQgZWRnZVxuICAgICAgICAgICAgICAgIHh4IC09IHN0ZXBXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGRpdHRvIGZvciBsZWZ0IGVkZ2VcbiAgICAgICAgICAgICAgICB4eCArPSBzdGVwV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9tYXBbeHhdW3l5XSA9IHZhbHVlO1xuICAgICAgICAgICAgbGV0IHAgPSBbeHgsIHl5XTtcbiAgICAgICAgICAgIGxldCBwa2V5ID0gdGhpcy5fcG9pbnRLZXkocCk7XG4gICAgICAgICAgICBjb25uZWN0ZWRbcGtleV0gPSBwO1xuICAgICAgICAgICAgZGVsZXRlIG5vdENvbm5lY3RlZFtwa2V5XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29ubmVjdGlvbkNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjb25uZWN0aW9uQ2FsbGJhY2soZnJvbSwgdG8pO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9mcmVlU3BhY2UoeCwgeSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHggPj0gMCAmJiB4IDwgdGhpcy5fd2lkdGggJiYgeSA+PSAwICYmIHkgPCB0aGlzLl9oZWlnaHQgJiYgdGhpcy5fbWFwW3hdW3ldID09IHZhbHVlO1xuICAgIH1cbiAgICBfcG9pbnRLZXkocCkgeyByZXR1cm4gcFswXSArIFwiLlwiICsgcFsxXTsgfVxufVxuIiwiaW1wb3J0IER1bmdlb24gZnJvbSBcIi4vZHVuZ2Vvbi5qc1wiO1xuaW1wb3J0IHsgUm9vbSwgQ29ycmlkb3IgfSBmcm9tIFwiLi9mZWF0dXJlcy5qc1wiO1xuaW1wb3J0IFJORyBmcm9tIFwiLi4vcm5nLmpzXCI7XG5pbXBvcnQgeyBESVJTIH0gZnJvbSBcIi4uL2NvbnN0YW50cy5qc1wiO1xuY29uc3QgRkVBVFVSRVMgPSB7XG4gICAgXCJyb29tXCI6IFJvb20sXG4gICAgXCJjb3JyaWRvclwiOiBDb3JyaWRvclxufTtcbi8qKlxuICogUmFuZG9tIGR1bmdlb24gZ2VuZXJhdG9yIHVzaW5nIGh1bWFuLWxpa2UgZGlnZ2luZyBwYXR0ZXJucy5cbiAqIEhlYXZpbHkgYmFzZWQgb24gTWlrZSBBbmRlcnNvbidzIGlkZWFzIGZyb20gdGhlIFwiVHlyYW50XCIgYWxnbywgbWVudGlvbmVkIGF0XG4gKiBodHRwOi8vd3d3LnJvZ3VlYmFzaW4ucm9ndWVsaWtlZGV2ZWxvcG1lbnQub3JnL2luZGV4LnBocD90aXRsZT1EdW5nZW9uLUJ1aWxkaW5nX0FsZ29yaXRobS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlnZ2VyIGV4dGVuZHMgRHVuZ2VvbiB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICByb29tV2lkdGg6IFszLCA5XSxcbiAgICAgICAgICAgIHJvb21IZWlnaHQ6IFszLCA1XSxcbiAgICAgICAgICAgIGNvcnJpZG9yTGVuZ3RoOiBbMywgMTBdLFxuICAgICAgICAgICAgZHVnUGVyY2VudGFnZTogMC4yLFxuICAgICAgICAgICAgdGltZUxpbWl0OiAxMDAwIC8qIHdlIHN0b3AgYWZ0ZXIgdGhpcyBtdWNoIHRpbWUgaGFzIHBhc3NlZCAobXNlYykgKi9cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2ZlYXR1cmVzID0ge1xuICAgICAgICAgICAgXCJyb29tXCI6IDQsXG4gICAgICAgICAgICBcImNvcnJpZG9yXCI6IDRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fbWFwID0gW107XG4gICAgICAgIHRoaXMuX2ZlYXR1cmVBdHRlbXB0cyA9IDIwOyAvKiBob3cgbWFueSB0aW1lcyBkbyB3ZSB0cnkgdG8gY3JlYXRlIGEgZmVhdHVyZSBvbiBhIHN1aXRhYmxlIHdhbGwgKi9cbiAgICAgICAgdGhpcy5fd2FsbHMgPSB7fTsgLyogdGhlc2UgYXJlIGF2YWlsYWJsZSBmb3IgZGlnZ2luZyAqL1xuICAgICAgICB0aGlzLl9kdWcgPSAwO1xuICAgICAgICB0aGlzLl9kaWdDYWxsYmFjayA9IHRoaXMuX2RpZ0NhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2NhbkJlRHVnQ2FsbGJhY2sgPSB0aGlzLl9jYW5CZUR1Z0NhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2lzV2FsbENhbGxiYWNrID0gdGhpcy5faXNXYWxsQ2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fcHJpb3JpdHlXYWxsQ2FsbGJhY2sgPSB0aGlzLl9wcmlvcml0eVdhbGxDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fcm9vbXMgPSBbXTtcbiAgICAgICAgdGhpcy5fY29ycmlkb3JzID0gW107XG4gICAgICAgIHRoaXMuX21hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XG4gICAgICAgIHRoaXMuX3dhbGxzID0ge307XG4gICAgICAgIHRoaXMuX2R1ZyA9IDA7XG4gICAgICAgIGxldCBhcmVhID0gKHRoaXMuX3dpZHRoIC0gMikgKiAodGhpcy5faGVpZ2h0IC0gMik7XG4gICAgICAgIHRoaXMuX2ZpcnN0Um9vbSgpO1xuICAgICAgICBsZXQgdDEgPSBEYXRlLm5vdygpO1xuICAgICAgICBsZXQgcHJpb3JpdHlXYWxscztcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgcHJpb3JpdHlXYWxscyA9IDA7XG4gICAgICAgICAgICBsZXQgdDIgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKHQyIC0gdDEgPiB0aGlzLl9vcHRpb25zLnRpbWVMaW1pdCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyogZmluZCBhIGdvb2Qgd2FsbCAqL1xuICAgICAgICAgICAgbGV0IHdhbGwgPSB0aGlzLl9maW5kV2FsbCgpO1xuICAgICAgICAgICAgaWYgKCF3YWxsKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IC8qIG5vIG1vcmUgd2FsbHMgKi9cbiAgICAgICAgICAgIGxldCBwYXJ0cyA9IHdhbGwuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgbGV0IHggPSBwYXJzZUludChwYXJ0c1swXSk7XG4gICAgICAgICAgICBsZXQgeSA9IHBhcnNlSW50KHBhcnRzWzFdKTtcbiAgICAgICAgICAgIGxldCBkaXIgPSB0aGlzLl9nZXREaWdnaW5nRGlyZWN0aW9uKHgsIHkpO1xuICAgICAgICAgICAgaWYgKCFkaXIpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gLyogdGhpcyB3YWxsIGlzIG5vdCBzdWl0YWJsZSAqL1xuICAgICAgICAgICAgLy9cdFx0Y29uc29sZS5sb2coXCJ3YWxsXCIsIHgsIHkpO1xuICAgICAgICAgICAgLyogdHJ5IGFkZGluZyBhIGZlYXR1cmUgKi9cbiAgICAgICAgICAgIGxldCBmZWF0dXJlQXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGZlYXR1cmVBdHRlbXB0cysrO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90cnlGZWF0dXJlKHgsIHksIGRpclswXSwgZGlyWzFdKSkgeyAvKiBmZWF0dXJlIGFkZGVkICovXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKHRoaXMuX3Jvb21zLmxlbmd0aCArIHRoaXMuX2NvcnJpZG9ycy5sZW5ndGggPT0gMikgeyB0aGlzLl9yb29tc1swXS5hZGREb29yKHgsIHkpOyB9IC8qIGZpcnN0IHJvb20gb2ZpY2lhbGx5IGhhcyBkb29ycyAqL1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVTdXJyb3VuZGluZ1dhbGxzKHgsIHkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVTdXJyb3VuZGluZ1dhbGxzKHggLSBkaXJbMF0sIHkgLSBkaXJbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IHdoaWxlIChmZWF0dXJlQXR0ZW1wdHMgPCB0aGlzLl9mZWF0dXJlQXR0ZW1wdHMpO1xuICAgICAgICAgICAgZm9yIChsZXQgaWQgaW4gdGhpcy5fd2FsbHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fd2FsbHNbaWRdID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eVdhbGxzKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICh0aGlzLl9kdWcgLyBhcmVhIDwgdGhpcy5fb3B0aW9ucy5kdWdQZXJjZW50YWdlIHx8IHByaW9yaXR5V2FsbHMpOyAvKiBmaXhtZSBudW1iZXIgb2YgcHJpb3JpdHkgd2FsbHMgKi9cbiAgICAgICAgdGhpcy5fYWRkRG9vcnMoKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3dpZHRoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGksIGosIHRoaXMuX21hcFtpXVtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3dhbGxzID0ge307XG4gICAgICAgIHRoaXMuX21hcCA9IFtdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX2RpZ0NhbGxiYWNrKHgsIHksIHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PSAwIHx8IHZhbHVlID09IDIpIHsgLyogZW1wdHkgKi9cbiAgICAgICAgICAgIHRoaXMuX21hcFt4XVt5XSA9IDA7XG4gICAgICAgICAgICB0aGlzLl9kdWcrKztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLyogd2FsbCAqL1xuICAgICAgICAgICAgdGhpcy5fd2FsbHNbeCArIFwiLFwiICsgeV0gPSAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9pc1dhbGxDYWxsYmFjayh4LCB5KSB7XG4gICAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID49IHRoaXMuX3dpZHRoIHx8IHkgPj0gdGhpcy5faGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLl9tYXBbeF1beV0gPT0gMSk7XG4gICAgfVxuICAgIF9jYW5CZUR1Z0NhbGxiYWNrKHgsIHkpIHtcbiAgICAgICAgaWYgKHggPCAxIHx8IHkgPCAxIHx8IHggKyAxID49IHRoaXMuX3dpZHRoIHx8IHkgKyAxID49IHRoaXMuX2hlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5fbWFwW3hdW3ldID09IDEpO1xuICAgIH1cbiAgICBfcHJpb3JpdHlXYWxsQ2FsbGJhY2soeCwgeSkgeyB0aGlzLl93YWxsc1t4ICsgXCIsXCIgKyB5XSA9IDI7IH1cbiAgICA7XG4gICAgX2ZpcnN0Um9vbSgpIHtcbiAgICAgICAgbGV0IGN4ID0gTWF0aC5mbG9vcih0aGlzLl93aWR0aCAvIDIpO1xuICAgICAgICBsZXQgY3kgPSBNYXRoLmZsb29yKHRoaXMuX2hlaWdodCAvIDIpO1xuICAgICAgICBsZXQgcm9vbSA9IFJvb20uY3JlYXRlUmFuZG9tQ2VudGVyKGN4LCBjeSwgdGhpcy5fb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3Jvb21zLnB1c2gocm9vbSk7XG4gICAgICAgIHJvb20uY3JlYXRlKHRoaXMuX2RpZ0NhbGxiYWNrKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGEgc3VpdGFibGUgd2FsbFxuICAgICAqL1xuICAgIF9maW5kV2FsbCgpIHtcbiAgICAgICAgbGV0IHByaW8xID0gW107XG4gICAgICAgIGxldCBwcmlvMiA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpZCBpbiB0aGlzLl93YWxscykge1xuICAgICAgICAgICAgbGV0IHByaW8gPSB0aGlzLl93YWxsc1tpZF07XG4gICAgICAgICAgICBpZiAocHJpbyA9PSAyKSB7XG4gICAgICAgICAgICAgICAgcHJpbzIucHVzaChpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcmlvMS5wdXNoKGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgYXJyID0gKHByaW8yLmxlbmd0aCA/IHByaW8yIDogcHJpbzEpO1xuICAgICAgICBpZiAoIWFyci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IC8qIG5vIHdhbGxzIDovICovXG4gICAgICAgIGxldCBpZCA9IFJORy5nZXRJdGVtKGFyci5zb3J0KCkpOyAvLyBzb3J0IHRvIG1ha2UgdGhlIG9yZGVyIGRldGVybWluaXN0aWNcbiAgICAgICAgZGVsZXRlIHRoaXMuX3dhbGxzW2lkXTtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmllcyBhZGRpbmcgYSBmZWF0dXJlXG4gICAgICogQHJldHVybnMge2Jvb2x9IHdhcyB0aGlzIGEgc3VjY2Vzc2Z1bCB0cnk/XG4gICAgICovXG4gICAgX3RyeUZlYXR1cmUoeCwgeSwgZHgsIGR5KSB7XG4gICAgICAgIGxldCBmZWF0dXJlTmFtZSA9IFJORy5nZXRXZWlnaHRlZFZhbHVlKHRoaXMuX2ZlYXR1cmVzKTtcbiAgICAgICAgbGV0IGN0b3IgPSBGRUFUVVJFU1tmZWF0dXJlTmFtZV07XG4gICAgICAgIGxldCBmZWF0dXJlID0gY3Rvci5jcmVhdGVSYW5kb21BdCh4LCB5LCBkeCwgZHksIHRoaXMuX29wdGlvbnMpO1xuICAgICAgICBpZiAoIWZlYXR1cmUuaXNWYWxpZCh0aGlzLl9pc1dhbGxDYWxsYmFjaywgdGhpcy5fY2FuQmVEdWdDYWxsYmFjaykpIHtcbiAgICAgICAgICAgIC8vXHRcdGNvbnNvbGUubG9nKFwibm90IHZhbGlkXCIpO1xuICAgICAgICAgICAgLy9cdFx0ZmVhdHVyZS5kZWJ1ZygpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZlYXR1cmUuY3JlYXRlKHRoaXMuX2RpZ0NhbGxiYWNrKTtcbiAgICAgICAgLy9cdGZlYXR1cmUuZGVidWcoKTtcbiAgICAgICAgaWYgKGZlYXR1cmUgaW5zdGFuY2VvZiBSb29tKSB7XG4gICAgICAgICAgICB0aGlzLl9yb29tcy5wdXNoKGZlYXR1cmUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmZWF0dXJlIGluc3RhbmNlb2YgQ29ycmlkb3IpIHtcbiAgICAgICAgICAgIGZlYXR1cmUuY3JlYXRlUHJpb3JpdHlXYWxscyh0aGlzLl9wcmlvcml0eVdhbGxDYWxsYmFjayk7XG4gICAgICAgICAgICB0aGlzLl9jb3JyaWRvcnMucHVzaChmZWF0dXJlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgX3JlbW92ZVN1cnJvdW5kaW5nV2FsbHMoY3gsIGN5KSB7XG4gICAgICAgIGxldCBkZWx0YXMgPSBESVJTWzRdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlbHRhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGRlbHRhID0gZGVsdGFzW2ldO1xuICAgICAgICAgICAgbGV0IHggPSBjeCArIGRlbHRhWzBdO1xuICAgICAgICAgICAgbGV0IHkgPSBjeSArIGRlbHRhWzFdO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3dhbGxzW3ggKyBcIixcIiArIHldO1xuICAgICAgICAgICAgeCA9IGN4ICsgMiAqIGRlbHRhWzBdO1xuICAgICAgICAgICAgeSA9IGN5ICsgMiAqIGRlbHRhWzFdO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3dhbGxzW3ggKyBcIixcIiArIHldO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdmVjdG9yIGluIFwiZGlnZ2luZ1wiIGRpcmVjdGlvbiwgb3IgZmFsc2UsIGlmIHRoaXMgZG9lcyBub3QgZXhpc3QgKG9yIGlzIG5vdCB1bmlxdWUpXG4gICAgICovXG4gICAgX2dldERpZ2dpbmdEaXJlY3Rpb24oY3gsIGN5KSB7XG4gICAgICAgIGlmIChjeCA8PSAwIHx8IGN5IDw9IDAgfHwgY3ggPj0gdGhpcy5fd2lkdGggLSAxIHx8IGN5ID49IHRoaXMuX2hlaWdodCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICBsZXQgZGVsdGFzID0gRElSU1s0XTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWx0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkZWx0YSA9IGRlbHRhc1tpXTtcbiAgICAgICAgICAgIGxldCB4ID0gY3ggKyBkZWx0YVswXTtcbiAgICAgICAgICAgIGxldCB5ID0gY3kgKyBkZWx0YVsxXTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fbWFwW3hdW3ldKSB7IC8qIHRoZXJlIGFscmVhZHkgaXMgYW5vdGhlciBlbXB0eSBuZWlnaGJvciEgKi9cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkZWx0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKiBubyBlbXB0eSBuZWlnaGJvciAqL1xuICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFstcmVzdWx0WzBdLCAtcmVzdWx0WzFdXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmluZCBlbXB0eSBzcGFjZXMgc3Vycm91bmRpbmcgcm9vbXMsIGFuZCBhcHBseSBkb29ycy5cbiAgICAgKi9cbiAgICBfYWRkRG9vcnMoKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5fbWFwO1xuICAgICAgICBmdW5jdGlvbiBpc1dhbGxDYWxsYmFjayh4LCB5KSB7XG4gICAgICAgICAgICByZXR1cm4gKGRhdGFbeF1beV0gPT0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3Jvb21zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcm9vbSA9IHRoaXMuX3Jvb21zW2ldO1xuICAgICAgICAgICAgcm9vbS5jbGVhckRvb3JzKCk7XG4gICAgICAgICAgICByb29tLmFkZERvb3JzKGlzV2FsbENhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBNYXAgZnJvbSBcIi4vbWFwLmpzXCI7XG5pbXBvcnQgUk5HIGZyb20gXCIuLi9ybmcuanNcIjtcbi8qKlxuICogQGNsYXNzIFJlY3Vyc2l2ZWx5IGRpdmlkZWQgbWF6ZSwgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NYXplX2dlbmVyYXRpb25fYWxnb3JpdGhtI1JlY3Vyc2l2ZV9kaXZpc2lvbl9tZXRob2RcbiAqIEBhdWdtZW50cyBST1QuTWFwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpdmlkZWRNYXplIGV4dGVuZHMgTWFwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5fc3RhY2sgPSBbXTtcbiAgICAgICAgdGhpcy5fbWFwID0gW107XG4gICAgfVxuICAgIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgICBsZXQgdyA9IHRoaXMuX3dpZHRoO1xuICAgICAgICBsZXQgaCA9IHRoaXMuX2hlaWdodDtcbiAgICAgICAgdGhpcy5fbWFwID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdzsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAucHVzaChbXSk7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGg7IGorKykge1xuICAgICAgICAgICAgICAgIGxldCBib3JkZXIgPSAoaSA9PSAwIHx8IGogPT0gMCB8fCBpICsgMSA9PSB3IHx8IGogKyAxID09IGgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcFtpXS5wdXNoKGJvcmRlciA/IDEgOiAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdGFjayA9IFtcbiAgICAgICAgICAgIFsxLCAxLCB3IC0gMiwgaCAtIDJdXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3OyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaDsgaisrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgdGhpcy5fbWFwW2ldW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYXAgPSBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIF9wcm9jZXNzKCkge1xuICAgICAgICB3aGlsZSAodGhpcy5fc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgcm9vbSA9IHRoaXMuX3N0YWNrLnNoaWZ0KCk7IC8qIFtsZWZ0LCB0b3AsIHJpZ2h0LCBib3R0b21dICovXG4gICAgICAgICAgICB0aGlzLl9wYXJ0aXRpb25Sb29tKHJvb20pO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9wYXJ0aXRpb25Sb29tKHJvb20pIHtcbiAgICAgICAgbGV0IGF2YWlsWCA9IFtdO1xuICAgICAgICBsZXQgYXZhaWxZID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSByb29tWzBdICsgMTsgaSA8IHJvb21bMl07IGkrKykge1xuICAgICAgICAgICAgbGV0IHRvcCA9IHRoaXMuX21hcFtpXVtyb29tWzFdIC0gMV07XG4gICAgICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5fbWFwW2ldW3Jvb21bM10gKyAxXTtcbiAgICAgICAgICAgIGlmICh0b3AgJiYgYm90dG9tICYmICEoaSAlIDIpKSB7XG4gICAgICAgICAgICAgICAgYXZhaWxYLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaiA9IHJvb21bMV0gKyAxOyBqIDwgcm9vbVszXTsgaisrKSB7XG4gICAgICAgICAgICBsZXQgbGVmdCA9IHRoaXMuX21hcFtyb29tWzBdIC0gMV1bal07XG4gICAgICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLl9tYXBbcm9vbVsyXSArIDFdW2pdO1xuICAgICAgICAgICAgaWYgKGxlZnQgJiYgcmlnaHQgJiYgIShqICUgMikpIHtcbiAgICAgICAgICAgICAgICBhdmFpbFkucHVzaChqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWF2YWlsWC5sZW5ndGggfHwgIWF2YWlsWS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgeCA9IFJORy5nZXRJdGVtKGF2YWlsWCk7XG4gICAgICAgIGxldCB5ID0gUk5HLmdldEl0ZW0oYXZhaWxZKTtcbiAgICAgICAgdGhpcy5fbWFwW3hdW3ldID0gMTtcbiAgICAgICAgbGV0IHdhbGxzID0gW107XG4gICAgICAgIGxldCB3ID0gW107XG4gICAgICAgIHdhbGxzLnB1c2godyk7IC8qIGxlZnQgcGFydCAqL1xuICAgICAgICBmb3IgKGxldCBpID0gcm9vbVswXTsgaSA8IHg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fbWFwW2ldW3ldID0gMTtcbiAgICAgICAgICAgIGlmIChpICUgMilcbiAgICAgICAgICAgICAgICB3LnB1c2goW2ksIHldKTtcbiAgICAgICAgfVxuICAgICAgICB3ID0gW107XG4gICAgICAgIHdhbGxzLnB1c2godyk7IC8qIHJpZ2h0IHBhcnQgKi9cbiAgICAgICAgZm9yIChsZXQgaSA9IHggKyAxOyBpIDw9IHJvb21bMl07IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fbWFwW2ldW3ldID0gMTtcbiAgICAgICAgICAgIGlmIChpICUgMilcbiAgICAgICAgICAgICAgICB3LnB1c2goW2ksIHldKTtcbiAgICAgICAgfVxuICAgICAgICB3ID0gW107XG4gICAgICAgIHdhbGxzLnB1c2godyk7IC8qIHRvcCBwYXJ0ICovXG4gICAgICAgIGZvciAobGV0IGogPSByb29tWzFdOyBqIDwgeTsgaisrKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXBbeF1bal0gPSAxO1xuICAgICAgICAgICAgaWYgKGogJSAyKVxuICAgICAgICAgICAgICAgIHcucHVzaChbeCwgal0pO1xuICAgICAgICB9XG4gICAgICAgIHcgPSBbXTtcbiAgICAgICAgd2FsbHMucHVzaCh3KTsgLyogYm90dG9tIHBhcnQgKi9cbiAgICAgICAgZm9yIChsZXQgaiA9IHkgKyAxOyBqIDw9IHJvb21bM107IGorKykge1xuICAgICAgICAgICAgdGhpcy5fbWFwW3hdW2pdID0gMTtcbiAgICAgICAgICAgIGlmIChqICUgMilcbiAgICAgICAgICAgICAgICB3LnB1c2goW3gsIGpdKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc29saWQgPSBSTkcuZ2V0SXRlbSh3YWxscyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2FsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB3ID0gd2FsbHNbaV07XG4gICAgICAgICAgICBpZiAodyA9PSBzb2xpZCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGhvbGUgPSBSTkcuZ2V0SXRlbSh3KTtcbiAgICAgICAgICAgIHRoaXMuX21hcFtob2xlWzBdXVtob2xlWzFdXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhY2sucHVzaChbcm9vbVswXSwgcm9vbVsxXSwgeCAtIDEsIHkgLSAxXSk7IC8qIGxlZnQgdG9wICovXG4gICAgICAgIHRoaXMuX3N0YWNrLnB1c2goW3ggKyAxLCByb29tWzFdLCByb29tWzJdLCB5IC0gMV0pOyAvKiByaWdodCB0b3AgKi9cbiAgICAgICAgdGhpcy5fc3RhY2sucHVzaChbcm9vbVswXSwgeSArIDEsIHggLSAxLCByb29tWzNdXSk7IC8qIGxlZnQgYm90dG9tICovXG4gICAgICAgIHRoaXMuX3N0YWNrLnB1c2goW3ggKyAxLCB5ICsgMSwgcm9vbVsyXSwgcm9vbVszXV0pOyAvKiByaWdodCBib3R0b20gKi9cbiAgICB9XG59XG4iLCJpbXBvcnQgTWFwIGZyb20gXCIuL21hcC5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgRHVuZ2VvbiBtYXA6IGhhcyByb29tcyBhbmQgY29ycmlkb3JzXG4gKiBAYXVnbWVudHMgUk9ULk1hcFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEdW5nZW9uIGV4dGVuZHMgTWFwIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLl9yb29tcyA9IFtdO1xuICAgICAgICB0aGlzLl9jb3JyaWRvcnMgPSBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBnZW5lcmF0ZWQgcm9vbXNcbiAgICAgKiBAcmV0dXJucyB7Uk9ULk1hcC5GZWF0dXJlLlJvb21bXX1cbiAgICAgKi9cbiAgICBnZXRSb29tcygpIHsgcmV0dXJuIHRoaXMuX3Jvb21zOyB9XG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBnZW5lcmF0ZWQgY29ycmlkb3JzXG4gICAgICogQHJldHVybnMge1JPVC5NYXAuRmVhdHVyZS5Db3JyaWRvcltdfVxuICAgICAqL1xuICAgIGdldENvcnJpZG9ycygpIHsgcmV0dXJuIHRoaXMuX2NvcnJpZG9yczsgfVxufVxuIiwiaW1wb3J0IE1hcCBmcm9tIFwiLi9tYXAuanNcIjtcbmltcG9ydCBSTkcgZnJvbSBcIi4uL3JuZy5qc1wiO1xuLyoqXG4gKiBKb2luIGxpc3RzIHdpdGggXCJpXCIgYW5kIFwiaSsxXCJcbiAqL1xuZnVuY3Rpb24gYWRkVG9MaXN0KGksIEwsIFIpIHtcbiAgICBSW0xbaSArIDFdXSA9IFJbaV07XG4gICAgTFtSW2ldXSA9IExbaSArIDFdO1xuICAgIFJbaV0gPSBpICsgMTtcbiAgICBMW2kgKyAxXSA9IGk7XG59XG4vKipcbiAqIFJlbW92ZSBcImlcIiBmcm9tIGl0cyBsaXN0XG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUZyb21MaXN0KGksIEwsIFIpIHtcbiAgICBSW0xbaV1dID0gUltpXTtcbiAgICBMW1JbaV1dID0gTFtpXTtcbiAgICBSW2ldID0gaTtcbiAgICBMW2ldID0gaTtcbn1cbi8qKlxuICogTWF6ZSBnZW5lcmF0b3IgLSBFbGxlcidzIGFsZ29yaXRobVxuICogU2VlIGh0dHA6Ly9ob21lcGFnZXMuY3dpLm5sL350cm9tcC9tYXplLmh0bWwgZm9yIGV4cGxhbmF0aW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsbGVyTWF6ZSBleHRlbmRzIE1hcCB7XG4gICAgY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBtYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xuICAgICAgICBsZXQgdyA9IE1hdGguY2VpbCgodGhpcy5fd2lkdGggLSAyKSAvIDIpO1xuICAgICAgICBsZXQgcmFuZCA9IDkgLyAyNDtcbiAgICAgICAgbGV0IEwgPSBbXTtcbiAgICAgICAgbGV0IFIgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3OyBpKyspIHtcbiAgICAgICAgICAgIEwucHVzaChpKTtcbiAgICAgICAgICAgIFIucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICBMLnB1c2godyAtIDEpOyAvKiBmYWtlIHN0b3AtYmxvY2sgYXQgdGhlIHJpZ2h0IHNpZGUgKi9cbiAgICAgICAgbGV0IGo7XG4gICAgICAgIGZvciAoaiA9IDE7IGogKyAzIDwgdGhpcy5faGVpZ2h0OyBqICs9IDIpIHtcbiAgICAgICAgICAgIC8qIG9uZSByb3cgKi9cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLyogY2VsbCBjb29yZHMgKHdpbGwgYmUgYWx3YXlzIGVtcHR5KSAqL1xuICAgICAgICAgICAgICAgIGxldCB4ID0gMiAqIGkgKyAxO1xuICAgICAgICAgICAgICAgIGxldCB5ID0gajtcbiAgICAgICAgICAgICAgICBtYXBbeF1beV0gPSAwO1xuICAgICAgICAgICAgICAgIC8qIHJpZ2h0IGNvbm5lY3Rpb24gKi9cbiAgICAgICAgICAgICAgICBpZiAoaSAhPSBMW2kgKyAxXSAmJiBSTkcuZ2V0VW5pZm9ybSgpID4gcmFuZCkge1xuICAgICAgICAgICAgICAgICAgICBhZGRUb0xpc3QoaSwgTCwgUik7XG4gICAgICAgICAgICAgICAgICAgIG1hcFt4ICsgMV1beV0gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKiBib3R0b20gY29ubmVjdGlvbiAqL1xuICAgICAgICAgICAgICAgIGlmIChpICE9IExbaV0gJiYgUk5HLmdldFVuaWZvcm0oKSA+IHJhbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgLyogcmVtb3ZlIGNvbm5lY3Rpb24gKi9cbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRnJvbUxpc3QoaSwgTCwgUik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKiBjcmVhdGUgY29ubmVjdGlvbiAqL1xuICAgICAgICAgICAgICAgICAgICBtYXBbeF1beSArIDFdID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyogbGFzdCByb3cgKi9cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3OyBpKyspIHtcbiAgICAgICAgICAgIC8qIGNlbGwgY29vcmRzICh3aWxsIGJlIGFsd2F5cyBlbXB0eSkgKi9cbiAgICAgICAgICAgIGxldCB4ID0gMiAqIGkgKyAxO1xuICAgICAgICAgICAgbGV0IHkgPSBqO1xuICAgICAgICAgICAgbWFwW3hdW3ldID0gMDtcbiAgICAgICAgICAgIC8qIHJpZ2h0IGNvbm5lY3Rpb24gKi9cbiAgICAgICAgICAgIGlmIChpICE9IExbaSArIDFdICYmIChpID09IExbaV0gfHwgUk5HLmdldFVuaWZvcm0oKSA+IHJhbmQpKSB7XG4gICAgICAgICAgICAgICAgLyogZGlnIHJpZ2h0IGFsc28gaWYgdGhlIGNlbGwgaXMgc2VwYXJhdGVkLCBzbyBpdCBnZXRzIGNvbm5lY3RlZCB0byB0aGUgcmVzdCBvZiBtYXplICovXG4gICAgICAgICAgICAgICAgYWRkVG9MaXN0KGksIEwsIFIpO1xuICAgICAgICAgICAgICAgIG1hcFt4ICsgMV1beV0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVtb3ZlRnJvbUxpc3QoaSwgTCwgUik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgbWFwW2ldW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgUk5HIGZyb20gXCIuLi9ybmcuanNcIjtcbjtcbi8qKlxuICogQGNsYXNzIER1bmdlb24gZmVhdHVyZTsgaGFzIG93biAuY3JlYXRlKCkgbWV0aG9kXG4gKi9cbmNsYXNzIEZlYXR1cmUge1xufVxuLyoqXG4gKiBAY2xhc3MgUm9vbVxuICogQGF1Z21lbnRzIFJPVC5NYXAuRmVhdHVyZVxuICogQHBhcmFtIHtpbnR9IHgxXG4gKiBAcGFyYW0ge2ludH0geTFcbiAqIEBwYXJhbSB7aW50fSB4MlxuICogQHBhcmFtIHtpbnR9IHkyXG4gKiBAcGFyYW0ge2ludH0gW2Rvb3JYXVxuICogQHBhcmFtIHtpbnR9IFtkb29yWV1cbiAqL1xuZXhwb3J0IGNsYXNzIFJvb20gZXh0ZW5kcyBGZWF0dXJlIHtcbiAgICBjb25zdHJ1Y3Rvcih4MSwgeTEsIHgyLCB5MiwgZG9vclgsIGRvb3JZKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3gxID0geDE7XG4gICAgICAgIHRoaXMuX3kxID0geTE7XG4gICAgICAgIHRoaXMuX3gyID0geDI7XG4gICAgICAgIHRoaXMuX3kyID0geTI7XG4gICAgICAgIHRoaXMuX2Rvb3JzID0ge307XG4gICAgICAgIGlmIChkb29yWCAhPT0gdW5kZWZpbmVkICYmIGRvb3JZICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkRG9vcihkb29yWCwgZG9vclkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIDtcbiAgICAvKipcbiAgICAgKiBSb29tIG9mIHJhbmRvbSBzaXplLCB3aXRoIGEgZ2l2ZW4gZG9vcnMgYW5kIGRpcmVjdGlvblxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGVSYW5kb21BdCh4LCB5LCBkeCwgZHksIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IG1pbiA9IG9wdGlvbnMucm9vbVdpZHRoWzBdO1xuICAgICAgICBsZXQgbWF4ID0gb3B0aW9ucy5yb29tV2lkdGhbMV07XG4gICAgICAgIGxldCB3aWR0aCA9IFJORy5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcbiAgICAgICAgbWluID0gb3B0aW9ucy5yb29tSGVpZ2h0WzBdO1xuICAgICAgICBtYXggPSBvcHRpb25zLnJvb21IZWlnaHRbMV07XG4gICAgICAgIGxldCBoZWlnaHQgPSBSTkcuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICAgIGlmIChkeCA9PSAxKSB7IC8qIHRvIHRoZSByaWdodCAqL1xuICAgICAgICAgICAgbGV0IHkyID0geSAtIE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIGhlaWdodCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMoeCArIDEsIHkyLCB4ICsgd2lkdGgsIHkyICsgaGVpZ2h0IC0gMSwgeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGR4ID09IC0xKSB7IC8qIHRvIHRoZSBsZWZ0ICovXG4gICAgICAgICAgICBsZXQgeTIgPSB5IC0gTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogaGVpZ2h0KTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcyh4IC0gd2lkdGgsIHkyLCB4IC0gMSwgeTIgKyBoZWlnaHQgLSAxLCB4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZHkgPT0gMSkgeyAvKiB0byB0aGUgYm90dG9tICovXG4gICAgICAgICAgICBsZXQgeDIgPSB4IC0gTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogd2lkdGgpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHgyLCB5ICsgMSwgeDIgKyB3aWR0aCAtIDEsIHkgKyBoZWlnaHQsIHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkeSA9PSAtMSkgeyAvKiB0byB0aGUgdG9wICovXG4gICAgICAgICAgICBsZXQgeDIgPSB4IC0gTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogd2lkdGgpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHgyLCB5IC0gaGVpZ2h0LCB4MiArIHdpZHRoIC0gMSwgeSAtIDEsIHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImR4IG9yIGR5IG11c3QgYmUgMSBvciAtMVwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUm9vbSBvZiByYW5kb20gc2l6ZSwgcG9zaXRpb25lZCBhcm91bmQgY2VudGVyIGNvb3Jkc1xuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGVSYW5kb21DZW50ZXIoY3gsIGN5LCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBtaW4gPSBvcHRpb25zLnJvb21XaWR0aFswXTtcbiAgICAgICAgbGV0IG1heCA9IG9wdGlvbnMucm9vbVdpZHRoWzFdO1xuICAgICAgICBsZXQgd2lkdGggPSBSTkcuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICAgIG1pbiA9IG9wdGlvbnMucm9vbUhlaWdodFswXTtcbiAgICAgICAgbWF4ID0gb3B0aW9ucy5yb29tSGVpZ2h0WzFdO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gUk5HLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgICBsZXQgeDEgPSBjeCAtIE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIHdpZHRoKTtcbiAgICAgICAgbGV0IHkxID0gY3kgLSBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiBoZWlnaHQpO1xuICAgICAgICBsZXQgeDIgPSB4MSArIHdpZHRoIC0gMTtcbiAgICAgICAgbGV0IHkyID0geTEgKyBoZWlnaHQgLSAxO1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoeDEsIHkxLCB4MiwgeTIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSb29tIG9mIHJhbmRvbSBzaXplIHdpdGhpbiBhIGdpdmVuIGRpbWVuc2lvbnNcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlUmFuZG9tKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0LCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBtaW4gPSBvcHRpb25zLnJvb21XaWR0aFswXTtcbiAgICAgICAgbGV0IG1heCA9IG9wdGlvbnMucm9vbVdpZHRoWzFdO1xuICAgICAgICBsZXQgd2lkdGggPSBSTkcuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICAgIG1pbiA9IG9wdGlvbnMucm9vbUhlaWdodFswXTtcbiAgICAgICAgbWF4ID0gb3B0aW9ucy5yb29tSGVpZ2h0WzFdO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gUk5HLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgICBsZXQgbGVmdCA9IGF2YWlsV2lkdGggLSB3aWR0aCAtIDE7XG4gICAgICAgIGxldCB0b3AgPSBhdmFpbEhlaWdodCAtIGhlaWdodCAtIDE7XG4gICAgICAgIGxldCB4MSA9IDEgKyBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiBsZWZ0KTtcbiAgICAgICAgbGV0IHkxID0gMSArIE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIHRvcCk7XG4gICAgICAgIGxldCB4MiA9IHgxICsgd2lkdGggLSAxO1xuICAgICAgICBsZXQgeTIgPSB5MSArIGhlaWdodCAtIDE7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcyh4MSwgeTEsIHgyLCB5Mik7XG4gICAgfVxuICAgIGFkZERvb3IoeCwgeSkge1xuICAgICAgICB0aGlzLl9kb29yc1t4ICsgXCIsXCIgKyB5XSA9IDE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufVxuICAgICAqL1xuICAgIGdldERvb3JzKGNiKSB7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9kb29ycykge1xuICAgICAgICAgICAgbGV0IHBhcnRzID0ga2V5LnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgIGNiKHBhcnNlSW50KHBhcnRzWzBdKSwgcGFyc2VJbnQocGFydHNbMV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2xlYXJEb29ycygpIHtcbiAgICAgICAgdGhpcy5fZG9vcnMgPSB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZERvb3JzKGlzV2FsbENhbGxiYWNrKSB7XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5feDEgLSAxO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLl94MiArIDE7XG4gICAgICAgIGxldCB0b3AgPSB0aGlzLl95MSAtIDE7XG4gICAgICAgIGxldCBib3R0b20gPSB0aGlzLl95MiArIDE7XG4gICAgICAgIGZvciAobGV0IHggPSBsZWZ0OyB4IDw9IHJpZ2h0OyB4KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSB0b3A7IHkgPD0gYm90dG9tOyB5KyspIHtcbiAgICAgICAgICAgICAgICBpZiAoeCAhPSBsZWZ0ICYmIHggIT0gcmlnaHQgJiYgeSAhPSB0b3AgJiYgeSAhPSBib3R0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc1dhbGxDYWxsYmFjayh4LCB5KSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hZGREb29yKHgsIHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBkZWJ1ZygpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJyb29tXCIsIHRoaXMuX3gxLCB0aGlzLl95MSwgdGhpcy5feDIsIHRoaXMuX3kyKTtcbiAgICB9XG4gICAgaXNWYWxpZChpc1dhbGxDYWxsYmFjaywgY2FuQmVEdWdDYWxsYmFjaykge1xuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuX3gxIC0gMTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5feDIgKyAxO1xuICAgICAgICBsZXQgdG9wID0gdGhpcy5feTEgLSAxO1xuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5feTIgKyAxO1xuICAgICAgICBmb3IgKGxldCB4ID0gbGVmdDsgeCA8PSByaWdodDsgeCsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gdG9wOyB5IDw9IGJvdHRvbTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHggPT0gbGVmdCB8fCB4ID09IHJpZ2h0IHx8IHkgPT0gdG9wIHx8IHkgPT0gYm90dG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNXYWxsQ2FsbGJhY2soeCwgeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjYW5CZUR1Z0NhbGxiYWNrKHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGRpZ0NhbGxiYWNrIERpZyBjYWxsYmFjayB3aXRoIGEgc2lnbmF0dXJlICh4LCB5LCB2YWx1ZSkuIFZhbHVlczogMCA9IGVtcHR5LCAxID0gd2FsbCwgMiA9IGRvb3IuIE11bHRpcGxlIGRvb3JzIGFyZSBhbGxvd2VkLlxuICAgICAqL1xuICAgIGNyZWF0ZShkaWdDYWxsYmFjaykge1xuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuX3gxIC0gMTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5feDIgKyAxO1xuICAgICAgICBsZXQgdG9wID0gdGhpcy5feTEgLSAxO1xuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5feTIgKyAxO1xuICAgICAgICBsZXQgdmFsdWUgPSAwO1xuICAgICAgICBmb3IgKGxldCB4ID0gbGVmdDsgeCA8PSByaWdodDsgeCsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gdG9wOyB5IDw9IGJvdHRvbTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHggKyBcIixcIiArIHkgaW4gdGhpcy5fZG9vcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh4ID09IGxlZnQgfHwgeCA9PSByaWdodCB8fCB5ID09IHRvcCB8fCB5ID09IGJvdHRvbSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRpZ0NhbGxiYWNrKHgsIHksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRDZW50ZXIoKSB7XG4gICAgICAgIHJldHVybiBbTWF0aC5yb3VuZCgodGhpcy5feDEgKyB0aGlzLl94MikgLyAyKSwgTWF0aC5yb3VuZCgodGhpcy5feTEgKyB0aGlzLl95MikgLyAyKV07XG4gICAgfVxuICAgIGdldExlZnQoKSB7IHJldHVybiB0aGlzLl94MTsgfVxuICAgIGdldFJpZ2h0KCkgeyByZXR1cm4gdGhpcy5feDI7IH1cbiAgICBnZXRUb3AoKSB7IHJldHVybiB0aGlzLl95MTsgfVxuICAgIGdldEJvdHRvbSgpIHsgcmV0dXJuIHRoaXMuX3kyOyB9XG59XG4vKipcbiAqIEBjbGFzcyBDb3JyaWRvclxuICogQGF1Z21lbnRzIFJPVC5NYXAuRmVhdHVyZVxuICogQHBhcmFtIHtpbnR9IHN0YXJ0WFxuICogQHBhcmFtIHtpbnR9IHN0YXJ0WVxuICogQHBhcmFtIHtpbnR9IGVuZFhcbiAqIEBwYXJhbSB7aW50fSBlbmRZXG4gKi9cbmV4cG9ydCBjbGFzcyBDb3JyaWRvciBleHRlbmRzIEZlYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3N0YXJ0WCA9IHN0YXJ0WDtcbiAgICAgICAgdGhpcy5fc3RhcnRZID0gc3RhcnRZO1xuICAgICAgICB0aGlzLl9lbmRYID0gZW5kWDtcbiAgICAgICAgdGhpcy5fZW5kWSA9IGVuZFk7XG4gICAgICAgIHRoaXMuX2VuZHNXaXRoQVdhbGwgPSB0cnVlO1xuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlUmFuZG9tQXQoeCwgeSwgZHgsIGR5LCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBtaW4gPSBvcHRpb25zLmNvcnJpZG9yTGVuZ3RoWzBdO1xuICAgICAgICBsZXQgbWF4ID0gb3B0aW9ucy5jb3JyaWRvckxlbmd0aFsxXTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IFJORy5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHgsIHksIHggKyBkeCAqIGxlbmd0aCwgeSArIGR5ICogbGVuZ3RoKTtcbiAgICB9XG4gICAgZGVidWcoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29ycmlkb3JcIiwgdGhpcy5fc3RhcnRYLCB0aGlzLl9zdGFydFksIHRoaXMuX2VuZFgsIHRoaXMuX2VuZFkpO1xuICAgIH1cbiAgICBpc1ZhbGlkKGlzV2FsbENhbGxiYWNrLCBjYW5CZUR1Z0NhbGxiYWNrKSB7XG4gICAgICAgIGxldCBzeCA9IHRoaXMuX3N0YXJ0WDtcbiAgICAgICAgbGV0IHN5ID0gdGhpcy5fc3RhcnRZO1xuICAgICAgICBsZXQgZHggPSB0aGlzLl9lbmRYIC0gc3g7XG4gICAgICAgIGxldCBkeSA9IHRoaXMuX2VuZFkgLSBzeTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IDEgKyBNYXRoLm1heChNYXRoLmFicyhkeCksIE1hdGguYWJzKGR5KSk7XG4gICAgICAgIGlmIChkeCkge1xuICAgICAgICAgICAgZHggPSBkeCAvIE1hdGguYWJzKGR4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZHkpIHtcbiAgICAgICAgICAgIGR5ID0gZHkgLyBNYXRoLmFicyhkeSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG54ID0gZHk7XG4gICAgICAgIGxldCBueSA9IC1keDtcbiAgICAgICAgbGV0IG9rID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHggPSBzeCArIGkgKiBkeDtcbiAgICAgICAgICAgIGxldCB5ID0gc3kgKyBpICogZHk7XG4gICAgICAgICAgICBpZiAoIWNhbkJlRHVnQ2FsbGJhY2soeCwgeSkpIHtcbiAgICAgICAgICAgICAgICBvayA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc1dhbGxDYWxsYmFjayh4ICsgbngsIHkgKyBueSkpIHtcbiAgICAgICAgICAgICAgICBvayA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc1dhbGxDYWxsYmFjayh4IC0gbngsIHkgLSBueSkpIHtcbiAgICAgICAgICAgICAgICBvayA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgICAgICAgIGxlbmd0aCA9IGk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW5kWCA9IHggLSBkeDtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmRZID0geSAtIGR5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0aGUgbGVuZ3RoIGRlZ2VuZXJhdGVkLCB0aGlzIGNvcnJpZG9yIG1pZ2h0IGJlIGludmFsaWRcbiAgICAgICAgICovXG4gICAgICAgIC8qIG5vdCBzdXBwb3J0ZWQgKi9cbiAgICAgICAgaWYgKGxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyogbGVuZ3RoIDEgYWxsb3dlZCBvbmx5IGlmIHRoZSBuZXh0IHNwYWNlIGlzIGVtcHR5ICovXG4gICAgICAgIGlmIChsZW5ndGggPT0gMSAmJiBpc1dhbGxDYWxsYmFjayh0aGlzLl9lbmRYICsgZHgsIHRoaXMuX2VuZFkgKyBkeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogV2UgZG8gbm90IHdhbnQgdGhlIGNvcnJpZG9yIHRvIGNyYXNoIGludG8gYSBjb3JuZXIgb2YgYSByb29tO1xuICAgICAgICAgKiBpZiBhbnkgb2YgdGhlIGVuZGluZyBjb3JuZXJzIGlzIGVtcHR5LCB0aGUgTisxdGggY2VsbCBvZiB0aGlzIGNvcnJpZG9yIG11c3QgYmUgZW1wdHkgdG9vLlxuICAgICAgICAgKlxuICAgICAgICAgKiBTaXR1YXRpb246XG4gICAgICAgICAqICMjIyMjIyMxXG4gICAgICAgICAqIC4uLi4uLi4/XG4gICAgICAgICAqICMjIyMjIyMyXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBjb3JyaWRvciB3YXMgZHVnIGZyb20gbGVmdCB0byByaWdodC5cbiAgICAgICAgICogMSwgMiAtIHByb2JsZW1hdGljIGNvcm5lcnMsID8gPSBOKzF0aCBjZWxsIChub3QgZHVnKVxuICAgICAgICAgKi9cbiAgICAgICAgbGV0IGZpcnN0Q29ybmVyQmFkID0gIWlzV2FsbENhbGxiYWNrKHRoaXMuX2VuZFggKyBkeCArIG54LCB0aGlzLl9lbmRZICsgZHkgKyBueSk7XG4gICAgICAgIGxldCBzZWNvbmRDb3JuZXJCYWQgPSAhaXNXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIGR4IC0gbngsIHRoaXMuX2VuZFkgKyBkeSAtIG55KTtcbiAgICAgICAgdGhpcy5fZW5kc1dpdGhBV2FsbCA9IGlzV2FsbENhbGxiYWNrKHRoaXMuX2VuZFggKyBkeCwgdGhpcy5fZW5kWSArIGR5KTtcbiAgICAgICAgaWYgKChmaXJzdENvcm5lckJhZCB8fCBzZWNvbmRDb3JuZXJCYWQpICYmIHRoaXMuX2VuZHNXaXRoQVdhbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZGlnQ2FsbGJhY2sgRGlnIGNhbGxiYWNrIHdpdGggYSBzaWduYXR1cmUgKHgsIHksIHZhbHVlKS4gVmFsdWVzOiAwID0gZW1wdHkuXG4gICAgICovXG4gICAgY3JlYXRlKGRpZ0NhbGxiYWNrKSB7XG4gICAgICAgIGxldCBzeCA9IHRoaXMuX3N0YXJ0WDtcbiAgICAgICAgbGV0IHN5ID0gdGhpcy5fc3RhcnRZO1xuICAgICAgICBsZXQgZHggPSB0aGlzLl9lbmRYIC0gc3g7XG4gICAgICAgIGxldCBkeSA9IHRoaXMuX2VuZFkgLSBzeTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IDEgKyBNYXRoLm1heChNYXRoLmFicyhkeCksIE1hdGguYWJzKGR5KSk7XG4gICAgICAgIGlmIChkeCkge1xuICAgICAgICAgICAgZHggPSBkeCAvIE1hdGguYWJzKGR4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZHkpIHtcbiAgICAgICAgICAgIGR5ID0gZHkgLyBNYXRoLmFicyhkeSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHggPSBzeCArIGkgKiBkeDtcbiAgICAgICAgICAgIGxldCB5ID0gc3kgKyBpICogZHk7XG4gICAgICAgICAgICBkaWdDYWxsYmFjayh4LCB5LCAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY3JlYXRlUHJpb3JpdHlXYWxscyhwcmlvcml0eVdhbGxDYWxsYmFjaykge1xuICAgICAgICBpZiAoIXRoaXMuX2VuZHNXaXRoQVdhbGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3ggPSB0aGlzLl9zdGFydFg7XG4gICAgICAgIGxldCBzeSA9IHRoaXMuX3N0YXJ0WTtcbiAgICAgICAgbGV0IGR4ID0gdGhpcy5fZW5kWCAtIHN4O1xuICAgICAgICBsZXQgZHkgPSB0aGlzLl9lbmRZIC0gc3k7XG4gICAgICAgIGlmIChkeCkge1xuICAgICAgICAgICAgZHggPSBkeCAvIE1hdGguYWJzKGR4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZHkpIHtcbiAgICAgICAgICAgIGR5ID0gZHkgLyBNYXRoLmFicyhkeSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG54ID0gZHk7XG4gICAgICAgIGxldCBueSA9IC1keDtcbiAgICAgICAgcHJpb3JpdHlXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIGR4LCB0aGlzLl9lbmRZICsgZHkpO1xuICAgICAgICBwcmlvcml0eVdhbGxDYWxsYmFjayh0aGlzLl9lbmRYICsgbngsIHRoaXMuX2VuZFkgKyBueSk7XG4gICAgICAgIHByaW9yaXR5V2FsbENhbGxiYWNrKHRoaXMuX2VuZFggLSBueCwgdGhpcy5fZW5kWSAtIG55KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTWFwIGZyb20gXCIuL21hcC5qc1wiO1xuaW1wb3J0IFJORyBmcm9tIFwiLi4vcm5nLmpzXCI7XG4vKipcbiAqIEljZXkncyBNYXplIGdlbmVyYXRvclxuICogU2VlIGh0dHA6Ly93d3cucm9ndWViYXNpbi5yb2d1ZWxpa2VkZXZlbG9wbWVudC5vcmcvaW5kZXgucGhwP3RpdGxlPVNpbXBsZV9tYXplIGZvciBleHBsYW5hdGlvblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJY2V5TWF6ZSBleHRlbmRzIE1hcCB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgcmVndWxhcml0eSA9IDApIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMuX3JlZ3VsYXJpdHkgPSByZWd1bGFyaXR5O1xuICAgICAgICB0aGlzLl9tYXAgPSBbXTtcbiAgICB9XG4gICAgY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMuX3dpZHRoO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gdGhpcy5faGVpZ2h0O1xuICAgICAgICBsZXQgbWFwID0gdGhpcy5fZmlsbE1hcCgxKTtcbiAgICAgICAgd2lkdGggLT0gKHdpZHRoICUgMiA/IDEgOiAyKTtcbiAgICAgICAgaGVpZ2h0IC09IChoZWlnaHQgJSAyID8gMSA6IDIpO1xuICAgICAgICBsZXQgY3ggPSAwO1xuICAgICAgICBsZXQgY3kgPSAwO1xuICAgICAgICBsZXQgbnggPSAwO1xuICAgICAgICBsZXQgbnkgPSAwO1xuICAgICAgICBsZXQgZG9uZSA9IDA7XG4gICAgICAgIGxldCBibG9ja2VkID0gZmFsc2U7XG4gICAgICAgIGxldCBkaXJzID0gW1xuICAgICAgICAgICAgWzAsIDBdLFxuICAgICAgICAgICAgWzAsIDBdLFxuICAgICAgICAgICAgWzAsIDBdLFxuICAgICAgICAgICAgWzAsIDBdXG4gICAgICAgIF07XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGN4ID0gMSArIDIgKiBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiAod2lkdGggLSAxKSAvIDIpO1xuICAgICAgICAgICAgY3kgPSAxICsgMiAqIE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIChoZWlnaHQgLSAxKSAvIDIpO1xuICAgICAgICAgICAgaWYgKCFkb25lKSB7XG4gICAgICAgICAgICAgICAgbWFwW2N4XVtjeV0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFtYXBbY3hdW2N5XSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JhbmRvbWl6ZShkaXJzKTtcbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiAodGhpcy5fcmVndWxhcml0eSArIDEpKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yYW5kb21pemUoZGlycyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYmxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBueCA9IGN4ICsgZGlyc1tpXVswXSAqIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBueSA9IGN5ICsgZGlyc1tpXVsxXSAqIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNGcmVlKG1hcCwgbngsIG55LCB3aWR0aCwgaGVpZ2h0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFtueF1bbnldID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBbY3ggKyBkaXJzW2ldWzBdXVtjeSArIGRpcnNbaV1bMV1dID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeCA9IG54O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN5ID0gbnk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKCFibG9ja2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoZG9uZSArIDEgPCB3aWR0aCAqIGhlaWdodCAvIDQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3dpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhpLCBqLCBtYXBbaV1bal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hcCA9IFtdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX3JhbmRvbWl6ZShkaXJzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICBkaXJzW2ldWzBdID0gMDtcbiAgICAgICAgICAgIGRpcnNbaV1bMV0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogNCkpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBkaXJzWzBdWzBdID0gLTE7XG4gICAgICAgICAgICAgICAgZGlyc1sxXVswXSA9IDE7XG4gICAgICAgICAgICAgICAgZGlyc1syXVsxXSA9IC0xO1xuICAgICAgICAgICAgICAgIGRpcnNbM11bMV0gPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGRpcnNbM11bMF0gPSAtMTtcbiAgICAgICAgICAgICAgICBkaXJzWzJdWzBdID0gMTtcbiAgICAgICAgICAgICAgICBkaXJzWzFdWzFdID0gLTE7XG4gICAgICAgICAgICAgICAgZGlyc1swXVsxXSA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgZGlyc1syXVswXSA9IC0xO1xuICAgICAgICAgICAgICAgIGRpcnNbM11bMF0gPSAxO1xuICAgICAgICAgICAgICAgIGRpcnNbMF1bMV0gPSAtMTtcbiAgICAgICAgICAgICAgICBkaXJzWzFdWzFdID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBkaXJzWzFdWzBdID0gLTE7XG4gICAgICAgICAgICAgICAgZGlyc1swXVswXSA9IDE7XG4gICAgICAgICAgICAgICAgZGlyc1szXVsxXSA9IC0xO1xuICAgICAgICAgICAgICAgIGRpcnNbMl1bMV0gPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9pc0ZyZWUobWFwLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGlmICh4IDwgMSB8fCB5IDwgMSB8fCB4ID49IHdpZHRoIHx8IHkgPj0gaGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcFt4XVt5XTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQXJlbmEgZnJvbSBcIi4vYXJlbmEuanNcIjtcbmltcG9ydCBVbmlmb3JtIGZyb20gXCIuL3VuaWZvcm0uanNcIjtcbmltcG9ydCBDZWxsdWxhciBmcm9tIFwiLi9jZWxsdWxhci5qc1wiO1xuaW1wb3J0IERpZ2dlciBmcm9tIFwiLi9kaWdnZXIuanNcIjtcbmltcG9ydCBFbGxlck1hemUgZnJvbSBcIi4vZWxsZXJtYXplLmpzXCI7XG5pbXBvcnQgRGl2aWRlZE1hemUgZnJvbSBcIi4vZGl2aWRlZG1hemUuanNcIjtcbmltcG9ydCBJY2V5TWF6ZSBmcm9tIFwiLi9pY2V5bWF6ZS5qc1wiO1xuaW1wb3J0IFJvZ3VlIGZyb20gXCIuL3JvZ3VlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCB7IEFyZW5hLCBVbmlmb3JtLCBDZWxsdWxhciwgRGlnZ2VyLCBFbGxlck1hemUsIERpdmlkZWRNYXplLCBJY2V5TWF6ZSwgUm9ndWUgfTtcbiIsImltcG9ydCB7IERFRkFVTFRfV0lEVEgsIERFRkFVTFRfSEVJR0hUIH0gZnJvbSBcIi4uL2NvbnN0YW50cy5qc1wiO1xuO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwIHtcbiAgICAvKipcbiAgICAgKiBAY2xhc3MgQmFzZSBtYXAgZ2VuZXJhdG9yXG4gICAgICogQHBhcmFtIHtpbnR9IFt3aWR0aD1ST1QuREVGQVVMVF9XSURUSF1cbiAgICAgKiBAcGFyYW0ge2ludH0gW2hlaWdodD1ST1QuREVGQVVMVF9IRUlHSFRdXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2lkdGggPSBERUZBVUxUX1dJRFRILCBoZWlnaHQgPSBERUZBVUxUX0hFSUdIVCkge1xuICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfVxuICAgIDtcbiAgICBfZmlsbE1hcCh2YWx1ZSkge1xuICAgICAgICBsZXQgbWFwID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xuICAgICAgICAgICAgbWFwLnB1c2goW10pO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgIG1hcFtpXS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cbn1cbiIsImltcG9ydCBNYXAgZnJvbSBcIi4vbWFwLmpzXCI7XG5pbXBvcnQgUk5HIGZyb20gXCIuLi9ybmcuanNcIjtcbmltcG9ydCB7IERJUlMgfSBmcm9tIFwiLi4vY29uc3RhbnRzLmpzXCI7XG4vKipcbiAqIER1bmdlb24gZ2VuZXJhdG9yIHdoaWNoIHVzZXMgdGhlIFwib3JnaW5hbFwiIFJvZ3VlIGR1bmdlb24gZ2VuZXJhdGlvbiBhbGdvcml0aG0uIFNlZSBodHRwOi8va3VvaS5jb20vfmthbWlrYXplL0dhbWVEZXNpZ24vYXJ0MDdfcm9ndWVfZHVuZ2Vvbi5waHBcbiAqIEBhdXRob3IgaHlha3VnZWlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9ndWUgZXh0ZW5kcyBNYXAge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMubWFwID0gW107XG4gICAgICAgIHRoaXMucm9vbXMgPSBbXTtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRDZWxscyA9IFtdO1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBjZWxsV2lkdGg6IDMsXG4gICAgICAgICAgICBjZWxsSGVpZ2h0OiAzIC8vICAgICBpZS4gYXMgYW4gYXJyYXkgd2l0aCBtaW4tbWF4IHZhbHVlcyBmb3IgZWFjaCBkaXJlY3Rpb24uLi4uXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgICAvKlxuICAgICAgICBTZXQgdGhlIHJvb20gc2l6ZXMgYWNjb3JkaW5nIHRvIHRoZSBvdmVyLWFsbCB3aWR0aCBvZiB0aGUgbWFwLFxuICAgICAgICBhbmQgdGhlIGNlbGwgc2l6ZXMuXG4gICAgICAgICovXG4gICAgICAgIGlmICghb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShcInJvb21XaWR0aFwiKSkge1xuICAgICAgICAgICAgb3B0aW9uc1tcInJvb21XaWR0aFwiXSA9IHRoaXMuX2NhbGN1bGF0ZVJvb21TaXplKHRoaXMuX3dpZHRoLCBvcHRpb25zW1wiY2VsbFdpZHRoXCJdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJyb29tSGVpZ2h0XCIpKSB7XG4gICAgICAgICAgICBvcHRpb25zW1wicm9vbUhlaWdodFwiXSA9IHRoaXMuX2NhbGN1bGF0ZVJvb21TaXplKHRoaXMuX2hlaWdodCwgb3B0aW9uc1tcImNlbGxIZWlnaHRcIl0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgICBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5tYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xuICAgICAgICB0aGlzLnJvb21zID0gW107XG4gICAgICAgIHRoaXMuY29ubmVjdGVkQ2VsbHMgPSBbXTtcbiAgICAgICAgdGhpcy5faW5pdFJvb21zKCk7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RSb29tcygpO1xuICAgICAgICB0aGlzLl9jb25uZWN0VW5jb25uZWN0ZWRSb29tcygpO1xuICAgICAgICB0aGlzLl9jcmVhdGVSYW5kb21Sb29tQ29ubmVjdGlvbnMoKTtcbiAgICAgICAgdGhpcy5fY3JlYXRlUm9vbXMoKTtcbiAgICAgICAgdGhpcy5fY3JlYXRlQ29ycmlkb3JzKCk7XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhpLCBqLCB0aGlzLm1hcFtpXVtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfY2FsY3VsYXRlUm9vbVNpemUoc2l6ZSwgY2VsbCkge1xuICAgICAgICBsZXQgbWF4ID0gTWF0aC5mbG9vcigoc2l6ZSAvIGNlbGwpICogMC44KTtcbiAgICAgICAgbGV0IG1pbiA9IE1hdGguZmxvb3IoKHNpemUgLyBjZWxsKSAqIDAuMjUpO1xuICAgICAgICBpZiAobWluIDwgMikge1xuICAgICAgICAgICAgbWluID0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF4IDwgMikge1xuICAgICAgICAgICAgbWF4ID0gMjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW21pbiwgbWF4XTtcbiAgICB9XG4gICAgX2luaXRSb29tcygpIHtcbiAgICAgICAgLy8gY3JlYXRlIHJvb21zIGFycmF5LiBUaGlzIGlzIHRoZSBcImdyaWRcIiBsaXN0IGZyb20gdGhlIGFsZ28uXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5yb29tcy5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb21zW2ldLnB1c2goeyBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMCwgXCJoZWlnaHRcIjogMCwgXCJjb25uZWN0aW9uc1wiOiBbXSwgXCJjZWxseFwiOiBpLCBcImNlbGx5XCI6IGogfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2Nvbm5lY3RSb29tcygpIHtcbiAgICAgICAgLy9waWNrIHJhbmRvbSBzdGFydGluZyBncmlkXG4gICAgICAgIGxldCBjZ3ggPSBSTkcuZ2V0VW5pZm9ybUludCgwLCB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aCAtIDEpO1xuICAgICAgICBsZXQgY2d5ID0gUk5HLmdldFVuaWZvcm1JbnQoMCwgdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0IC0gMSk7XG4gICAgICAgIGxldCBpZHg7XG4gICAgICAgIGxldCBuY2d4O1xuICAgICAgICBsZXQgbmNneTtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIGxldCByb29tO1xuICAgICAgICBsZXQgb3RoZXJSb29tO1xuICAgICAgICBsZXQgZGlyVG9DaGVjaztcbiAgICAgICAgLy8gZmluZCAgdW5jb25uZWN0ZWQgbmVpZ2hib3VyIGNlbGxzXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIC8vZGlyVG9DaGVjayA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3XTtcbiAgICAgICAgICAgIGRpclRvQ2hlY2sgPSBbMCwgMiwgNCwgNl07XG4gICAgICAgICAgICBkaXJUb0NoZWNrID0gUk5HLnNodWZmbGUoZGlyVG9DaGVjayk7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZHggPSBkaXJUb0NoZWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIG5jZ3ggPSBjZ3ggKyBESVJTWzhdW2lkeF1bMF07XG4gICAgICAgICAgICAgICAgbmNneSA9IGNneSArIERJUlNbOF1baWR4XVsxXTtcbiAgICAgICAgICAgICAgICBpZiAobmNneCA8IDAgfHwgbmNneCA+PSB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5jZ3kgPCAwIHx8IG5jZ3kgPj0gdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByb29tID0gdGhpcy5yb29tc1tjZ3hdW2NneV07XG4gICAgICAgICAgICAgICAgaWYgKHJvb21bXCJjb25uZWN0aW9uc1wiXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFzIGxvbmcgYXMgdGhpcyByb29tIGRvZXNuJ3QgYWxyZWFkeSBjb29uZWN0IHRvIG1lLCB3ZSBhcmUgb2sgd2l0aCBpdC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvb21bXCJjb25uZWN0aW9uc1wiXVswXVswXSA9PSBuY2d4ICYmIHJvb21bXCJjb25uZWN0aW9uc1wiXVswXVsxXSA9PSBuY2d5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvdGhlclJvb20gPSB0aGlzLnJvb21zW25jZ3hdW25jZ3ldO1xuICAgICAgICAgICAgICAgIGlmIChvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXS5wdXNoKFtjZ3gsIGNneV0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RlZENlbGxzLnB1c2goW25jZ3gsIG5jZ3ldKTtcbiAgICAgICAgICAgICAgICAgICAgY2d4ID0gbmNneDtcbiAgICAgICAgICAgICAgICAgICAgY2d5ID0gbmNneTtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gd2hpbGUgKGRpclRvQ2hlY2subGVuZ3RoID4gMCAmJiBmb3VuZCA9PSBmYWxzZSk7XG4gICAgICAgIH0gd2hpbGUgKGRpclRvQ2hlY2subGVuZ3RoID4gMCk7XG4gICAgfVxuICAgIF9jb25uZWN0VW5jb25uZWN0ZWRSb29tcygpIHtcbiAgICAgICAgLy9XaGlsZSB0aGVyZSBhcmUgdW5jb25uZWN0ZWQgcm9vbXMsIHRyeSB0byBjb25uZWN0IHRoZW0gdG8gYSByYW5kb20gY29ubmVjdGVkIG5laWdoYm9yXG4gICAgICAgIC8vKGlmIGEgcm9vbSBoYXMgbm8gY29ubmVjdGVkIG5laWdoYm9ycyB5ZXQsIGp1c3Qga2VlcCBjeWNsaW5nLCB5b3UnbGwgZmlsbCBvdXQgdG8gaXQgZXZlbnR1YWxseSkuXG4gICAgICAgIGxldCBjdyA9IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoO1xuICAgICAgICBsZXQgY2ggPSB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQ7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkQ2VsbHMgPSBSTkcuc2h1ZmZsZSh0aGlzLmNvbm5lY3RlZENlbGxzKTtcbiAgICAgICAgbGV0IHJvb207XG4gICAgICAgIGxldCBvdGhlclJvb207XG4gICAgICAgIGxldCB2YWxpZFJvb207XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGg7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgIHJvb20gPSB0aGlzLnJvb21zW2ldW2pdO1xuICAgICAgICAgICAgICAgIGlmIChyb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpcmVjdGlvbnMgPSBbMCwgMiwgNCwgNl07XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbnMgPSBSTkcuc2h1ZmZsZShkaXJlY3Rpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRSb29tID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXJJZHggPSBkaXJlY3Rpb25zLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0kgPSBpICsgRElSU1s4XVtkaXJJZHhdWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0ogPSBqICsgRElSU1s4XVtkaXJJZHhdWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0kgPCAwIHx8IG5ld0kgPj0gY3cgfHwgbmV3SiA8IDAgfHwgbmV3SiA+PSBjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJSb29tID0gdGhpcy5yb29tc1tuZXdJXVtuZXdKXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkUm9vbSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgb3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl1ba11bMF0gPT0gaSAmJiBvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXVtrXVsxXSA9PSBqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkUm9vbSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRSb29tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKGRpcmVjdGlvbnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkUm9vbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9vbVtcImNvbm5lY3Rpb25zXCJdLnB1c2goW290aGVyUm9vbVtcImNlbGx4XCJdLCBvdGhlclJvb21bXCJjZWxseVwiXV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLSBVbmFibGUgdG8gY29ubmVjdCByb29tLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfY3JlYXRlUmFuZG9tUm9vbUNvbm5lY3Rpb25zKCkge1xuICAgICAgICAvLyBFbXB0eSBmb3Igbm93LlxuICAgIH1cbiAgICBfY3JlYXRlUm9vbXMoKSB7XG4gICAgICAgIGxldCB3ID0gdGhpcy5fd2lkdGg7XG4gICAgICAgIGxldCBoID0gdGhpcy5faGVpZ2h0O1xuICAgICAgICBsZXQgY3cgPSB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aDtcbiAgICAgICAgbGV0IGNoID0gdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0O1xuICAgICAgICBsZXQgY3dwID0gTWF0aC5mbG9vcih0aGlzLl93aWR0aCAvIGN3KTtcbiAgICAgICAgbGV0IGNocCA9IE1hdGguZmxvb3IodGhpcy5faGVpZ2h0IC8gY2gpO1xuICAgICAgICBsZXQgcm9vbXc7XG4gICAgICAgIGxldCByb29taDtcbiAgICAgICAgbGV0IHJvb21XaWR0aCA9IHRoaXMuX29wdGlvbnNbXCJyb29tV2lkdGhcIl07XG4gICAgICAgIGxldCByb29tSGVpZ2h0ID0gdGhpcy5fb3B0aW9uc1tcInJvb21IZWlnaHRcIl07XG4gICAgICAgIGxldCBzeDtcbiAgICAgICAgbGV0IHN5O1xuICAgICAgICBsZXQgb3RoZXJSb29tO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN3OyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2g7IGorKykge1xuICAgICAgICAgICAgICAgIHN4ID0gY3dwICogaTtcbiAgICAgICAgICAgICAgICBzeSA9IGNocCAqIGo7XG4gICAgICAgICAgICAgICAgaWYgKHN4ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc3ggPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3kgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzeSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJvb213ID0gUk5HLmdldFVuaWZvcm1JbnQocm9vbVdpZHRoWzBdLCByb29tV2lkdGhbMV0pO1xuICAgICAgICAgICAgICAgIHJvb21oID0gUk5HLmdldFVuaWZvcm1JbnQocm9vbUhlaWdodFswXSwgcm9vbUhlaWdodFsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKGogPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG90aGVyUm9vbSA9IHRoaXMucm9vbXNbaV1baiAtIDFdO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoc3kgLSAob3RoZXJSb29tW1wieVwiXSArIG90aGVyUm9vbVtcImhlaWdodFwiXSkgPCAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzeSsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBvdGhlclJvb20gPSB0aGlzLnJvb21zW2kgLSAxXVtqXTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHN4IC0gKG90aGVyUm9vbVtcInhcIl0gKyBvdGhlclJvb21bXCJ3aWR0aFwiXSkgPCAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzeCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBzeE9mZnNldCA9IE1hdGgucm91bmQoUk5HLmdldFVuaWZvcm1JbnQoMCwgY3dwIC0gcm9vbXcpIC8gMik7XG4gICAgICAgICAgICAgICAgbGV0IHN5T2Zmc2V0ID0gTWF0aC5yb3VuZChSTkcuZ2V0VW5pZm9ybUludCgwLCBjaHAgLSByb29taCkgLyAyKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoc3ggKyBzeE9mZnNldCArIHJvb213ID49IHcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN4T2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzeE9mZnNldC0tO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9vbXctLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aGlsZSAoc3kgKyBzeU9mZnNldCArIHJvb21oID49IGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN5T2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzeU9mZnNldC0tO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9vbWgtLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzeCA9IHN4ICsgc3hPZmZzZXQ7XG4gICAgICAgICAgICAgICAgc3kgPSBzeSArIHN5T2Zmc2V0O1xuICAgICAgICAgICAgICAgIHRoaXMucm9vbXNbaV1bal1bXCJ4XCJdID0gc3g7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tc1tpXVtqXVtcInlcIl0gPSBzeTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb21zW2ldW2pdW1wid2lkdGhcIl0gPSByb29tdztcbiAgICAgICAgICAgICAgICB0aGlzLnJvb21zW2ldW2pdW1wiaGVpZ2h0XCJdID0gcm9vbWg7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaWkgPSBzeDsgaWkgPCBzeCArIHJvb213OyBpaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGpqID0gc3k7IGpqIDwgc3kgKyByb29taDsgamorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBbaWldW2pqXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2dldFdhbGxQb3NpdGlvbihhUm9vbSwgYURpcmVjdGlvbikge1xuICAgICAgICBsZXQgcng7XG4gICAgICAgIGxldCByeTtcbiAgICAgICAgbGV0IGRvb3I7XG4gICAgICAgIGlmIChhRGlyZWN0aW9uID09IDEgfHwgYURpcmVjdGlvbiA9PSAzKSB7XG4gICAgICAgICAgICByeCA9IFJORy5nZXRVbmlmb3JtSW50KGFSb29tW1wieFwiXSArIDEsIGFSb29tW1wieFwiXSArIGFSb29tW1wid2lkdGhcIl0gLSAyKTtcbiAgICAgICAgICAgIGlmIChhRGlyZWN0aW9uID09IDEpIHtcbiAgICAgICAgICAgICAgICByeSA9IGFSb29tW1wieVwiXSAtIDI7XG4gICAgICAgICAgICAgICAgZG9vciA9IHJ5ICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJ5ID0gYVJvb21bXCJ5XCJdICsgYVJvb21bXCJoZWlnaHRcIl0gKyAxO1xuICAgICAgICAgICAgICAgIGRvb3IgPSByeSAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1hcFtyeF1bZG9vcl0gPSAwOyAvLyBpJ20gbm90IHNldHRpbmcgYSBzcGVjaWZpYyAnZG9vcicgdGlsZSB2YWx1ZSByaWdodCBub3csIGp1c3QgZW1wdHkgc3BhY2UuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByeSA9IFJORy5nZXRVbmlmb3JtSW50KGFSb29tW1wieVwiXSArIDEsIGFSb29tW1wieVwiXSArIGFSb29tW1wiaGVpZ2h0XCJdIC0gMik7XG4gICAgICAgICAgICBpZiAoYURpcmVjdGlvbiA9PSAyKSB7XG4gICAgICAgICAgICAgICAgcnggPSBhUm9vbVtcInhcIl0gKyBhUm9vbVtcIndpZHRoXCJdICsgMTtcbiAgICAgICAgICAgICAgICBkb29yID0gcnggLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcnggPSBhUm9vbVtcInhcIl0gLSAyO1xuICAgICAgICAgICAgICAgIGRvb3IgPSByeCArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1hcFtkb29yXVtyeV0gPSAwOyAvLyBpJ20gbm90IHNldHRpbmcgYSBzcGVjaWZpYyAnZG9vcicgdGlsZSB2YWx1ZSByaWdodCBub3csIGp1c3QgZW1wdHkgc3BhY2UuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtyeCwgcnldO1xuICAgIH1cbiAgICBfZHJhd0NvcnJpZG9yKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKSB7XG4gICAgICAgIGxldCB4T2Zmc2V0ID0gZW5kUG9zaXRpb25bMF0gLSBzdGFydFBvc2l0aW9uWzBdO1xuICAgICAgICBsZXQgeU9mZnNldCA9IGVuZFBvc2l0aW9uWzFdIC0gc3RhcnRQb3NpdGlvblsxXTtcbiAgICAgICAgbGV0IHhwb3MgPSBzdGFydFBvc2l0aW9uWzBdO1xuICAgICAgICBsZXQgeXBvcyA9IHN0YXJ0UG9zaXRpb25bMV07XG4gICAgICAgIGxldCB0ZW1wRGlzdDtcbiAgICAgICAgbGV0IHhEaXI7XG4gICAgICAgIGxldCB5RGlyO1xuICAgICAgICBsZXQgbW92ZTsgLy8gMiBlbGVtZW50IGFycmF5LCBlbGVtZW50IDAgaXMgdGhlIGRpcmVjdGlvbiwgZWxlbWVudCAxIGlzIHRoZSB0b3RhbCB2YWx1ZSB0byBtb3ZlLlxuICAgICAgICBsZXQgbW92ZXMgPSBbXTsgLy8gYSBsaXN0IG9mIDIgZWxlbWVudCBhcnJheXNcbiAgICAgICAgbGV0IHhBYnMgPSBNYXRoLmFicyh4T2Zmc2V0KTtcbiAgICAgICAgbGV0IHlBYnMgPSBNYXRoLmFicyh5T2Zmc2V0KTtcbiAgICAgICAgbGV0IHBlcmNlbnQgPSBSTkcuZ2V0VW5pZm9ybSgpOyAvLyB1c2VkIHRvIHNwbGl0IHRoZSBtb3ZlIGF0IGRpZmZlcmVudCBwbGFjZXMgYWxvbmcgdGhlIGxvbmcgYXhpc1xuICAgICAgICBsZXQgZmlyc3RIYWxmID0gcGVyY2VudDtcbiAgICAgICAgbGV0IHNlY29uZEhhbGYgPSAxIC0gcGVyY2VudDtcbiAgICAgICAgeERpciA9IHhPZmZzZXQgPiAwID8gMiA6IDY7XG4gICAgICAgIHlEaXIgPSB5T2Zmc2V0ID4gMCA/IDQgOiAwO1xuICAgICAgICBpZiAoeEFicyA8IHlBYnMpIHtcbiAgICAgICAgICAgIC8vIG1vdmUgZmlyc3RIYWxmIG9mIHRoZSB5IG9mZnNldFxuICAgICAgICAgICAgdGVtcERpc3QgPSBNYXRoLmNlaWwoeUFicyAqIGZpcnN0SGFsZik7XG4gICAgICAgICAgICBtb3Zlcy5wdXNoKFt5RGlyLCB0ZW1wRGlzdF0pO1xuICAgICAgICAgICAgLy8gbW92ZSBhbGwgdGhlIHggb2Zmc2V0XG4gICAgICAgICAgICBtb3Zlcy5wdXNoKFt4RGlyLCB4QWJzXSk7XG4gICAgICAgICAgICAvLyBtb3ZlIHNlbmRIYWxmIG9mIHRoZSAgeSBvZmZzZXRcbiAgICAgICAgICAgIHRlbXBEaXN0ID0gTWF0aC5mbG9vcih5QWJzICogc2Vjb25kSGFsZik7XG4gICAgICAgICAgICBtb3Zlcy5wdXNoKFt5RGlyLCB0ZW1wRGlzdF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gIG1vdmUgZmlyc3RIYWxmIG9mIHRoZSB4IG9mZnNldFxuICAgICAgICAgICAgdGVtcERpc3QgPSBNYXRoLmNlaWwoeEFicyAqIGZpcnN0SGFsZik7XG4gICAgICAgICAgICBtb3Zlcy5wdXNoKFt4RGlyLCB0ZW1wRGlzdF0pO1xuICAgICAgICAgICAgLy8gbW92ZSBhbGwgdGhlIHkgb2Zmc2V0XG4gICAgICAgICAgICBtb3Zlcy5wdXNoKFt5RGlyLCB5QWJzXSk7XG4gICAgICAgICAgICAvLyBtb3ZlIHNlY29uZEhhbGYgb2YgdGhlIHggb2Zmc2V0LlxuICAgICAgICAgICAgdGVtcERpc3QgPSBNYXRoLmZsb29yKHhBYnMgKiBzZWNvbmRIYWxmKTtcbiAgICAgICAgICAgIG1vdmVzLnB1c2goW3hEaXIsIHRlbXBEaXN0XSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXBbeHBvc11beXBvc10gPSAwO1xuICAgICAgICB3aGlsZSAobW92ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbW92ZSA9IG1vdmVzLnBvcCgpO1xuICAgICAgICAgICAgd2hpbGUgKG1vdmVbMV0gPiAwKSB7XG4gICAgICAgICAgICAgICAgeHBvcyArPSBESVJTWzhdW21vdmVbMF1dWzBdO1xuICAgICAgICAgICAgICAgIHlwb3MgKz0gRElSU1s4XVttb3ZlWzBdXVsxXTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFt4cG9zXVt5cG9zXSA9IDA7XG4gICAgICAgICAgICAgICAgbW92ZVsxXSA9IG1vdmVbMV0gLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9jcmVhdGVDb3JyaWRvcnMoKSB7XG4gICAgICAgIC8vIERyYXcgQ29ycmlkb3JzIGJldHdlZW4gY29ubmVjdGVkIHJvb21zXG4gICAgICAgIGxldCBjdyA9IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoO1xuICAgICAgICBsZXQgY2ggPSB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQ7XG4gICAgICAgIGxldCByb29tO1xuICAgICAgICBsZXQgY29ubmVjdGlvbjtcbiAgICAgICAgbGV0IG90aGVyUm9vbTtcbiAgICAgICAgbGV0IHdhbGw7XG4gICAgICAgIGxldCBvdGhlcldhbGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3c7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjaDsgaisrKSB7XG4gICAgICAgICAgICAgICAgcm9vbSA9IHRoaXMucm9vbXNbaV1bal07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbiA9IHJvb21bXCJjb25uZWN0aW9uc1wiXVtrXTtcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJSb29tID0gdGhpcy5yb29tc1tjb25uZWN0aW9uWzBdXVtjb25uZWN0aW9uWzFdXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmlndXJlIG91dCB3aGF0IHdhbGwgb3VyIGNvcnJpZG9yIHdpbGwgc3RhcnQgb25lLlxuICAgICAgICAgICAgICAgICAgICAvLyBmaWd1cmUgb3V0IHdoYXQgd2FsbCBvdXIgY29ycmlkb3Igd2lsbCBlbmQgb24uXG4gICAgICAgICAgICAgICAgICAgIGlmIChvdGhlclJvb21bXCJjZWxseFwiXSA+IHJvb21bXCJjZWxseFwiXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2FsbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlcldhbGwgPSA0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG90aGVyUm9vbVtcImNlbGx4XCJdIDwgcm9vbVtcImNlbGx4XCJdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3YWxsID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyV2FsbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3RoZXJSb29tW1wiY2VsbHlcIl0gPiByb29tW1wiY2VsbHlcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhbGwgPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJXYWxsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhbGwgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJXYWxsID0gMztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kcmF3Q29ycmlkb3IodGhpcy5fZ2V0V2FsbFBvc2l0aW9uKHJvb20sIHdhbGwpLCB0aGlzLl9nZXRXYWxsUG9zaXRpb24ob3RoZXJSb29tLCBvdGhlcldhbGwpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgRHVuZ2VvbiBmcm9tIFwiLi9kdW5nZW9uLmpzXCI7XG5pbXBvcnQgeyBSb29tLCBDb3JyaWRvciB9IGZyb20gXCIuL2ZlYXR1cmVzLmpzXCI7XG5pbXBvcnQgUk5HIGZyb20gXCIuLi9ybmcuanNcIjtcbjtcbi8qKlxuICogQGNsYXNzIER1bmdlb24gZ2VuZXJhdG9yIHdoaWNoIHRyaWVzIHRvIGZpbGwgdGhlIHNwYWNlIGV2ZW5seS4gR2VuZXJhdGVzIGluZGVwZW5kZW50IHJvb21zIGFuZCB0cmllcyB0byBjb25uZWN0IHRoZW0uXG4gKiBAYXVnbWVudHMgUk9ULk1hcC5EdW5nZW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVuaWZvcm0gZXh0ZW5kcyBEdW5nZW9uIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0ge1xuICAgICAgICAgICAgcm9vbVdpZHRoOiBbMywgOV0sXG4gICAgICAgICAgICByb29tSGVpZ2h0OiBbMywgNV0sXG4gICAgICAgICAgICByb29tRHVnUGVyY2VudGFnZTogMC4xLFxuICAgICAgICAgICAgdGltZUxpbWl0OiAxMDAwIC8qIHdlIHN0b3AgYWZ0ZXIgdGhpcyBtdWNoIHRpbWUgaGFzIHBhc3NlZCAobXNlYykgKi9cbiAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fbWFwID0gW107XG4gICAgICAgIHRoaXMuX2R1ZyA9IDA7XG4gICAgICAgIHRoaXMuX3Jvb21BdHRlbXB0cyA9IDIwOyAvKiBuZXcgcm9vbSBpcyBjcmVhdGVkIE4tdGltZXMgdW50aWwgaXMgY29uc2lkZXJlZCBhcyBpbXBvc3NpYmxlIHRvIGdlbmVyYXRlICovXG4gICAgICAgIHRoaXMuX2NvcnJpZG9yQXR0ZW1wdHMgPSAyMDsgLyogY29ycmlkb3JzIGFyZSB0cmllZCBOLXRpbWVzIHVudGlsIHRoZSBsZXZlbCBpcyBjb25zaWRlcmVkIGFzIGltcG9zc2libGUgdG8gY29ubmVjdCAqL1xuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBbXTsgLyogbGlzdCBvZiBhbHJlYWR5IGNvbm5lY3RlZCByb29tcyAqL1xuICAgICAgICB0aGlzLl91bmNvbm5lY3RlZCA9IFtdOyAvKiBsaXN0IG9mIHJlbWFpbmluZyB1bmNvbm5lY3RlZCByb29tcyAqL1xuICAgICAgICB0aGlzLl9kaWdDYWxsYmFjayA9IHRoaXMuX2RpZ0NhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2NhbkJlRHVnQ2FsbGJhY2sgPSB0aGlzLl9jYW5CZUR1Z0NhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2lzV2FsbENhbGxiYWNrID0gdGhpcy5faXNXYWxsQ2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbWFwLiBJZiB0aGUgdGltZSBsaW1pdCBoYXMgYmVlbiBoaXQsIHJldHVybnMgbnVsbC5cbiAgICAgKiBAc2VlIFJPVC5NYXAjY3JlYXRlXG4gICAgICovXG4gICAgY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCB0MSA9IERhdGUubm93KCk7XG4gICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBsZXQgdDIgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKHQyIC0gdDEgPiB0aGlzLl9vcHRpb25zLnRpbWVMaW1pdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSAvKiB0aW1lIGxpbWl0ISAqL1xuICAgICAgICAgICAgdGhpcy5fbWFwID0gdGhpcy5fZmlsbE1hcCgxKTtcbiAgICAgICAgICAgIHRoaXMuX2R1ZyA9IDA7XG4gICAgICAgICAgICB0aGlzLl9yb29tcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fdW5jb25uZWN0ZWQgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2dlbmVyYXRlUm9vbXMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yb29tcy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fZ2VuZXJhdGVDb3JyaWRvcnMoKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhpLCBqLCB0aGlzLl9tYXBbaV1bal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgc3VpdGFibGUgYW1vdW50IG9mIHJvb21zXG4gICAgICovXG4gICAgX2dlbmVyYXRlUm9vbXMoKSB7XG4gICAgICAgIGxldCB3ID0gdGhpcy5fd2lkdGggLSAyO1xuICAgICAgICBsZXQgaCA9IHRoaXMuX2hlaWdodCAtIDI7XG4gICAgICAgIGxldCByb29tO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICByb29tID0gdGhpcy5fZ2VuZXJhdGVSb29tKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fZHVnIC8gKHcgKiBoKSA+IHRoaXMuX29wdGlvbnMucm9vbUR1Z1BlcmNlbnRhZ2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gLyogYWNoaWV2ZWQgcmVxdWVzdGVkIGFtb3VudCBvZiBmcmVlIHNwYWNlICovXG4gICAgICAgIH0gd2hpbGUgKHJvb20pO1xuICAgICAgICAvKiBlaXRoZXIgZW5vdWdoIHJvb21zLCBvciBub3QgYWJsZSB0byBnZW5lcmF0ZSBtb3JlIG9mIHRoZW0gOikgKi9cbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJ5IHRvIGdlbmVyYXRlIG9uZSByb29tXG4gICAgICovXG4gICAgX2dlbmVyYXRlUm9vbSgpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgd2hpbGUgKGNvdW50IDwgdGhpcy5fcm9vbUF0dGVtcHRzKSB7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgbGV0IHJvb20gPSBSb29tLmNyZWF0ZVJhbmRvbSh0aGlzLl93aWR0aCwgdGhpcy5faGVpZ2h0LCB0aGlzLl9vcHRpb25zKTtcbiAgICAgICAgICAgIGlmICghcm9vbS5pc1ZhbGlkKHRoaXMuX2lzV2FsbENhbGxiYWNrLCB0aGlzLl9jYW5CZUR1Z0NhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm9vbS5jcmVhdGUodGhpcy5fZGlnQ2FsbGJhY2spO1xuICAgICAgICAgICAgdGhpcy5fcm9vbXMucHVzaChyb29tKTtcbiAgICAgICAgICAgIHJldHVybiByb29tO1xuICAgICAgICB9XG4gICAgICAgIC8qIG5vIHJvb20gd2FzIGdlbmVyYXRlZCBpbiBhIGdpdmVuIG51bWJlciBvZiBhdHRlbXB0cyAqL1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGNvbm5lY3RvcnMgYmV3ZWVuIHJvb21zXG4gICAgICogQHJldHVybnMge2Jvb2x9IHN1Y2Nlc3MgV2FzIHRoaXMgYXR0ZW1wdCBzdWNjZXNzZnVsbD9cbiAgICAgKi9cbiAgICBfZ2VuZXJhdGVDb3JyaWRvcnMoKSB7XG4gICAgICAgIGxldCBjbnQgPSAwO1xuICAgICAgICB3aGlsZSAoY250IDwgdGhpcy5fY29ycmlkb3JBdHRlbXB0cykge1xuICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICB0aGlzLl9jb3JyaWRvcnMgPSBbXTtcbiAgICAgICAgICAgIC8qIGRpZyByb29tcyBpbnRvIGEgY2xlYXIgbWFwICovXG4gICAgICAgICAgICB0aGlzLl9tYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9yb29tcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCByb29tID0gdGhpcy5fcm9vbXNbaV07XG4gICAgICAgICAgICAgICAgcm9vbS5jbGVhckRvb3JzKCk7XG4gICAgICAgICAgICAgICAgcm9vbS5jcmVhdGUodGhpcy5fZGlnQ2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdW5jb25uZWN0ZWQgPSBSTkcuc2h1ZmZsZSh0aGlzLl9yb29tcy5zbGljZSgpKTtcbiAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3RlZCA9IFtdO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3VuY29ubmVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3RlZC5wdXNoKHRoaXMuX3VuY29ubmVjdGVkLnBvcCgpKTtcbiAgICAgICAgICAgIH0gLyogZmlyc3Qgb25lIGlzIGFsd2F5cyBjb25uZWN0ZWQgKi9cbiAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgLyogMS4gcGljayByYW5kb20gY29ubmVjdGVkIHJvb20gKi9cbiAgICAgICAgICAgICAgICBsZXQgY29ubmVjdGVkID0gUk5HLmdldEl0ZW0odGhpcy5fY29ubmVjdGVkKTtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyogMi4gZmluZCBjbG9zZXN0IHVuY29ubmVjdGVkICovXG4gICAgICAgICAgICAgICAgbGV0IHJvb20xID0gdGhpcy5fY2xvc2VzdFJvb20odGhpcy5fdW5jb25uZWN0ZWQsIGNvbm5lY3RlZCk7XG4gICAgICAgICAgICAgICAgaWYgKCFyb29tMSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyogMy4gY29ubmVjdCBpdCB0byBjbG9zZXN0IGNvbm5lY3RlZCAqL1xuICAgICAgICAgICAgICAgIGxldCByb29tMiA9IHRoaXMuX2Nsb3Nlc3RSb29tKHRoaXMuX2Nvbm5lY3RlZCwgcm9vbTEpO1xuICAgICAgICAgICAgICAgIGlmICghcm9vbTIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBvayA9IHRoaXMuX2Nvbm5lY3RSb29tcyhyb29tMSwgcm9vbTIpO1xuICAgICAgICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSAvKiBzdG9wIGNvbm5lY3RpbmcsIHJlLXNodWZmbGUgKi9cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3VuY29ubmVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IC8qIGRvbmU7IG5vIHJvb21zIHJlbWFpbiAqL1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgO1xuICAgIC8qKlxuICAgICAqIEZvciBhIGdpdmVuIHJvb20sIGZpbmQgdGhlIGNsb3Nlc3Qgb25lIGZyb20gdGhlIGxpc3RcbiAgICAgKi9cbiAgICBfY2xvc2VzdFJvb20ocm9vbXMsIHJvb20pIHtcbiAgICAgICAgbGV0IGRpc3QgPSBJbmZpbml0eTtcbiAgICAgICAgbGV0IGNlbnRlciA9IHJvb20uZ2V0Q2VudGVyKCk7XG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvb21zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgciA9IHJvb21zW2ldO1xuICAgICAgICAgICAgbGV0IGMgPSByLmdldENlbnRlcigpO1xuICAgICAgICAgICAgbGV0IGR4ID0gY1swXSAtIGNlbnRlclswXTtcbiAgICAgICAgICAgIGxldCBkeSA9IGNbMV0gLSBjZW50ZXJbMV07XG4gICAgICAgICAgICBsZXQgZCA9IGR4ICogZHggKyBkeSAqIGR5O1xuICAgICAgICAgICAgaWYgKGQgPCBkaXN0KSB7XG4gICAgICAgICAgICAgICAgZGlzdCA9IGQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBfY29ubmVjdFJvb21zKHJvb20xLCByb29tMikge1xuICAgICAgICAvKlxuICAgICAgICAgICAgcm9vbTEuZGVidWcoKTtcbiAgICAgICAgICAgIHJvb20yLmRlYnVnKCk7XG4gICAgICAgICovXG4gICAgICAgIGxldCBjZW50ZXIxID0gcm9vbTEuZ2V0Q2VudGVyKCk7XG4gICAgICAgIGxldCBjZW50ZXIyID0gcm9vbTIuZ2V0Q2VudGVyKCk7XG4gICAgICAgIGxldCBkaWZmWCA9IGNlbnRlcjJbMF0gLSBjZW50ZXIxWzBdO1xuICAgICAgICBsZXQgZGlmZlkgPSBjZW50ZXIyWzFdIC0gY2VudGVyMVsxXTtcbiAgICAgICAgbGV0IHN0YXJ0O1xuICAgICAgICBsZXQgZW5kO1xuICAgICAgICBsZXQgZGlySW5kZXgxLCBkaXJJbmRleDIsIG1pbiwgbWF4LCBpbmRleDtcbiAgICAgICAgaWYgKE1hdGguYWJzKGRpZmZYKSA8IE1hdGguYWJzKGRpZmZZKSkgeyAvKiBmaXJzdCB0cnkgY29ubmVjdGluZyBub3J0aC1zb3V0aCB3YWxscyAqL1xuICAgICAgICAgICAgZGlySW5kZXgxID0gKGRpZmZZID4gMCA/IDIgOiAwKTtcbiAgICAgICAgICAgIGRpckluZGV4MiA9IChkaXJJbmRleDEgKyAyKSAlIDQ7XG4gICAgICAgICAgICBtaW4gPSByb29tMi5nZXRMZWZ0KCk7XG4gICAgICAgICAgICBtYXggPSByb29tMi5nZXRSaWdodCgpO1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvKiBmaXJzdCB0cnkgY29ubmVjdGluZyBlYXN0LXdlc3Qgd2FsbHMgKi9cbiAgICAgICAgICAgIGRpckluZGV4MSA9IChkaWZmWCA+IDAgPyAxIDogMyk7XG4gICAgICAgICAgICBkaXJJbmRleDIgPSAoZGlySW5kZXgxICsgMikgJSA0O1xuICAgICAgICAgICAgbWluID0gcm9vbTIuZ2V0VG9wKCk7XG4gICAgICAgICAgICBtYXggPSByb29tMi5nZXRCb3R0b20oKTtcbiAgICAgICAgICAgIGluZGV4ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBzdGFydCA9IHRoaXMuX3BsYWNlSW5XYWxsKHJvb20xLCBkaXJJbmRleDEpOyAvKiBjb3JyaWRvciB3aWxsIHN0YXJ0IGhlcmUgKi9cbiAgICAgICAgaWYgKCFzdGFydCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydFtpbmRleF0gPj0gbWluICYmIHN0YXJ0W2luZGV4XSA8PSBtYXgpIHsgLyogcG9zc2libGUgdG8gY29ubmVjdCB3aXRoIHN0cmFpZ2h0IGxpbmUgKEktbGlrZSkgKi9cbiAgICAgICAgICAgIGVuZCA9IHN0YXJ0LnNsaWNlKCk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSAwO1xuICAgICAgICAgICAgc3dpdGNoIChkaXJJbmRleDIpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcm9vbTIuZ2V0VG9wKCkgLSAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcm9vbTIuZ2V0UmlnaHQoKSArIDE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSByb29tMi5nZXRCb3R0b20oKSArIDE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSByb29tMi5nZXRMZWZ0KCkgLSAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFsoaW5kZXggKyAxKSAlIDJdID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9kaWdMaW5lKFtzdGFydCwgZW5kXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RhcnRbaW5kZXhdIDwgbWluIC0gMSB8fCBzdGFydFtpbmRleF0gPiBtYXggKyAxKSB7IC8qIG5lZWQgdG8gc3dpdGNoIHRhcmdldCB3YWxsIChMLWxpa2UpICovXG4gICAgICAgICAgICBsZXQgZGlmZiA9IHN0YXJ0W2luZGV4XSAtIGNlbnRlcjJbaW5kZXhdO1xuICAgICAgICAgICAgbGV0IHJvdGF0aW9uID0gMDtcbiAgICAgICAgICAgIHN3aXRjaCAoZGlySW5kZXgyKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcm90YXRpb24gPSAoZGlmZiA8IDAgPyAzIDogMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHJvdGF0aW9uID0gKGRpZmYgPCAwID8gMSA6IDMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpckluZGV4MiA9IChkaXJJbmRleDIgKyByb3RhdGlvbikgJSA0O1xuICAgICAgICAgICAgZW5kID0gdGhpcy5fcGxhY2VJbldhbGwocm9vbTIsIGRpckluZGV4Mik7XG4gICAgICAgICAgICBpZiAoIWVuZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBtaWQgPSBbMCwgMF07XG4gICAgICAgICAgICBtaWRbaW5kZXhdID0gc3RhcnRbaW5kZXhdO1xuICAgICAgICAgICAgbGV0IGluZGV4MiA9IChpbmRleCArIDEpICUgMjtcbiAgICAgICAgICAgIG1pZFtpbmRleDJdID0gZW5kW2luZGV4Ml07XG4gICAgICAgICAgICB0aGlzLl9kaWdMaW5lKFtzdGFydCwgbWlkLCBlbmRdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLyogdXNlIGN1cnJlbnQgd2FsbCBwYWlyLCBidXQgYWRqdXN0IHRoZSBsaW5lIGluIHRoZSBtaWRkbGUgKFMtbGlrZSkgKi9cbiAgICAgICAgICAgIGxldCBpbmRleDIgPSAoaW5kZXggKyAxKSAlIDI7XG4gICAgICAgICAgICBlbmQgPSB0aGlzLl9wbGFjZUluV2FsbChyb29tMiwgZGlySW5kZXgyKTtcbiAgICAgICAgICAgIGlmICghZW5kKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG1pZCA9IE1hdGgucm91bmQoKGVuZFtpbmRleDJdICsgc3RhcnRbaW5kZXgyXSkgLyAyKTtcbiAgICAgICAgICAgIGxldCBtaWQxID0gWzAsIDBdO1xuICAgICAgICAgICAgbGV0IG1pZDIgPSBbMCwgMF07XG4gICAgICAgICAgICBtaWQxW2luZGV4XSA9IHN0YXJ0W2luZGV4XTtcbiAgICAgICAgICAgIG1pZDFbaW5kZXgyXSA9IG1pZDtcbiAgICAgICAgICAgIG1pZDJbaW5kZXhdID0gZW5kW2luZGV4XTtcbiAgICAgICAgICAgIG1pZDJbaW5kZXgyXSA9IG1pZDtcbiAgICAgICAgICAgIHRoaXMuX2RpZ0xpbmUoW3N0YXJ0LCBtaWQxLCBtaWQyLCBlbmRdKTtcbiAgICAgICAgfVxuICAgICAgICByb29tMS5hZGREb29yKHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgIHJvb20yLmFkZERvb3IoZW5kWzBdLCBlbmRbMV0pO1xuICAgICAgICBpbmRleCA9IHRoaXMuX3VuY29ubmVjdGVkLmluZGV4T2Yocm9vbTEpO1xuICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3VuY29ubmVjdGVkLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0ZWQucHVzaChyb29tMSk7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZXggPSB0aGlzLl91bmNvbm5lY3RlZC5pbmRleE9mKHJvb20yKTtcbiAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl91bmNvbm5lY3RlZC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5fY29ubmVjdGVkLnB1c2gocm9vbTIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBfcGxhY2VJbldhbGwocm9vbSwgZGlySW5kZXgpIHtcbiAgICAgICAgbGV0IHN0YXJ0ID0gWzAsIDBdO1xuICAgICAgICBsZXQgZGlyID0gWzAsIDBdO1xuICAgICAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICAgICAgc3dpdGNoIChkaXJJbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGRpciA9IFsxLCAwXTtcbiAgICAgICAgICAgICAgICBzdGFydCA9IFtyb29tLmdldExlZnQoKSwgcm9vbS5nZXRUb3AoKSAtIDFdO1xuICAgICAgICAgICAgICAgIGxlbmd0aCA9IHJvb20uZ2V0UmlnaHQoKSAtIHJvb20uZ2V0TGVmdCgpICsgMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBkaXIgPSBbMCwgMV07XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBbcm9vbS5nZXRSaWdodCgpICsgMSwgcm9vbS5nZXRUb3AoKV07XG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gcm9vbS5nZXRCb3R0b20oKSAtIHJvb20uZ2V0VG9wKCkgKyAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGRpciA9IFsxLCAwXTtcbiAgICAgICAgICAgICAgICBzdGFydCA9IFtyb29tLmdldExlZnQoKSwgcm9vbS5nZXRCb3R0b20oKSArIDFdO1xuICAgICAgICAgICAgICAgIGxlbmd0aCA9IHJvb20uZ2V0UmlnaHQoKSAtIHJvb20uZ2V0TGVmdCgpICsgMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBkaXIgPSBbMCwgMV07XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBbcm9vbS5nZXRMZWZ0KCkgLSAxLCByb29tLmdldFRvcCgpXTtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSByb29tLmdldEJvdHRvbSgpIC0gcm9vbS5nZXRUb3AoKSArIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGF2YWlsID0gW107XG4gICAgICAgIGxldCBsYXN0QmFkSW5kZXggPSAtMjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHggPSBzdGFydFswXSArIGkgKiBkaXJbMF07XG4gICAgICAgICAgICBsZXQgeSA9IHN0YXJ0WzFdICsgaSAqIGRpclsxXTtcbiAgICAgICAgICAgIGF2YWlsLnB1c2gobnVsbCk7XG4gICAgICAgICAgICBsZXQgaXNXYWxsID0gKHRoaXMuX21hcFt4XVt5XSA9PSAxKTtcbiAgICAgICAgICAgIGlmIChpc1dhbGwpIHtcbiAgICAgICAgICAgICAgICBpZiAobGFzdEJhZEluZGV4ICE9IGkgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGF2YWlsW2ldID0gW3gsIHldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxhc3RCYWRJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgaWYgKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxbaSAtIDFdID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IGF2YWlsLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAoIWF2YWlsW2ldKSB7XG4gICAgICAgICAgICAgICAgYXZhaWwuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoYXZhaWwubGVuZ3RoID8gUk5HLmdldEl0ZW0oYXZhaWwpIDogbnVsbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpZyBhIHBvbHlsaW5lLlxuICAgICAqL1xuICAgIF9kaWdMaW5lKHBvaW50cykge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHN0YXJ0ID0gcG9pbnRzW2kgLSAxXTtcbiAgICAgICAgICAgIGxldCBlbmQgPSBwb2ludHNbaV07XG4gICAgICAgICAgICBsZXQgY29ycmlkb3IgPSBuZXcgQ29ycmlkb3Ioc3RhcnRbMF0sIHN0YXJ0WzFdLCBlbmRbMF0sIGVuZFsxXSk7XG4gICAgICAgICAgICBjb3JyaWRvci5jcmVhdGUodGhpcy5fZGlnQ2FsbGJhY2spO1xuICAgICAgICAgICAgdGhpcy5fY29ycmlkb3JzLnB1c2goY29ycmlkb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9kaWdDYWxsYmFjayh4LCB5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9tYXBbeF1beV0gPSB2YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2R1ZysrO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9pc1dhbGxDYWxsYmFjayh4LCB5KSB7XG4gICAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID49IHRoaXMuX3dpZHRoIHx8IHkgPj0gdGhpcy5faGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLl9tYXBbeF1beV0gPT0gMSk7XG4gICAgfVxuICAgIF9jYW5CZUR1Z0NhbGxiYWNrKHgsIHkpIHtcbiAgICAgICAgaWYgKHggPCAxIHx8IHkgPCAxIHx8IHggKyAxID49IHRoaXMuX3dpZHRoIHx8IHkgKyAxID49IHRoaXMuX2hlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5fbWFwW3hdW3ldID09IDEpO1xuICAgIH1cbn1cbiIsImltcG9ydCBTaW1wbGV4IGZyb20gXCIuL3NpbXBsZXguanNcIjtcbmV4cG9ydCBkZWZhdWx0IHsgU2ltcGxleCB9O1xuIiwiLyoqXG4gKiBCYXNlIG5vaXNlIGdlbmVyYXRvclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb2lzZSB7XG59XG4iLCJpbXBvcnQgTm9pc2UgZnJvbSBcIi4vbm9pc2UuanNcIjtcbmltcG9ydCBSTkcgZnJvbSBcIi4uL3JuZy5qc1wiO1xuaW1wb3J0IHsgbW9kIH0gZnJvbSBcIi4uL3V0aWwuanNcIjtcbmNvbnN0IEYyID0gMC41ICogKE1hdGguc3FydCgzKSAtIDEpO1xuY29uc3QgRzIgPSAoMyAtIE1hdGguc3FydCgzKSkgLyA2O1xuLyoqXG4gKiBBIHNpbXBsZSAyZCBpbXBsZW1lbnRhdGlvbiBvZiBzaW1wbGV4IG5vaXNlIGJ5IE9uZHJlaiBaYXJhXG4gKlxuICogQmFzZWQgb24gYSBzcGVlZC1pbXByb3ZlZCBzaW1wbGV4IG5vaXNlIGFsZ29yaXRobSBmb3IgMkQsIDNEIGFuZCA0RCBpbiBKYXZhLlxuICogV2hpY2ggaXMgYmFzZWQgb24gZXhhbXBsZSBjb2RlIGJ5IFN0ZWZhbiBHdXN0YXZzb24gKHN0ZWd1QGl0bi5saXUuc2UpLlxuICogV2l0aCBPcHRpbWlzYXRpb25zIGJ5IFBldGVyIEVhc3RtYW4gKHBlYXN0bWFuQGRyaXp6bGUuc3RhbmZvcmQuZWR1KS5cbiAqIEJldHRlciByYW5rIG9yZGVyaW5nIG1ldGhvZCBieSBTdGVmYW4gR3VzdGF2c29uIGluIDIwMTIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXBsZXggZXh0ZW5kcyBOb2lzZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGdyYWRpZW50cyBSYW5kb20gZ3JhZGllbnRzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZ3JhZGllbnRzID0gMjU2KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2dyYWRpZW50cyA9IFtcbiAgICAgICAgICAgIFswLCAtMV0sXG4gICAgICAgICAgICBbMSwgLTFdLFxuICAgICAgICAgICAgWzEsIDBdLFxuICAgICAgICAgICAgWzEsIDFdLFxuICAgICAgICAgICAgWzAsIDFdLFxuICAgICAgICAgICAgWy0xLCAxXSxcbiAgICAgICAgICAgIFstMSwgMF0sXG4gICAgICAgICAgICBbLTEsIC0xXVxuICAgICAgICBdO1xuICAgICAgICBsZXQgcGVybXV0YXRpb25zID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JhZGllbnRzOyBpKyspIHtcbiAgICAgICAgICAgIHBlcm11dGF0aW9ucy5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICAgIHBlcm11dGF0aW9ucyA9IFJORy5zaHVmZmxlKHBlcm11dGF0aW9ucyk7XG4gICAgICAgIHRoaXMuX3Blcm1zID0gW107XG4gICAgICAgIHRoaXMuX2luZGV4ZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyICogZ3JhZGllbnRzOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX3Blcm1zLnB1c2gocGVybXV0YXRpb25zW2kgJSBncmFkaWVudHNdKTtcbiAgICAgICAgICAgIHRoaXMuX2luZGV4ZXMucHVzaCh0aGlzLl9wZXJtc1tpXSAlIHRoaXMuX2dyYWRpZW50cy5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCh4aW4sIHlpbikge1xuICAgICAgICBsZXQgcGVybXMgPSB0aGlzLl9wZXJtcztcbiAgICAgICAgbGV0IGluZGV4ZXMgPSB0aGlzLl9pbmRleGVzO1xuICAgICAgICBsZXQgY291bnQgPSBwZXJtcy5sZW5ndGggLyAyO1xuICAgICAgICBsZXQgbjAgPSAwLCBuMSA9IDAsIG4yID0gMCwgZ2k7IC8vIE5vaXNlIGNvbnRyaWJ1dGlvbnMgZnJvbSB0aGUgdGhyZWUgY29ybmVyc1xuICAgICAgICAvLyBTa2V3IHRoZSBpbnB1dCBzcGFjZSB0byBkZXRlcm1pbmUgd2hpY2ggc2ltcGxleCBjZWxsIHdlJ3JlIGluXG4gICAgICAgIGxldCBzID0gKHhpbiArIHlpbikgKiBGMjsgLy8gSGFpcnkgZmFjdG9yIGZvciAyRFxuICAgICAgICBsZXQgaSA9IE1hdGguZmxvb3IoeGluICsgcyk7XG4gICAgICAgIGxldCBqID0gTWF0aC5mbG9vcih5aW4gKyBzKTtcbiAgICAgICAgbGV0IHQgPSAoaSArIGopICogRzI7XG4gICAgICAgIGxldCBYMCA9IGkgLSB0OyAvLyBVbnNrZXcgdGhlIGNlbGwgb3JpZ2luIGJhY2sgdG8gKHgseSkgc3BhY2VcbiAgICAgICAgbGV0IFkwID0gaiAtIHQ7XG4gICAgICAgIGxldCB4MCA9IHhpbiAtIFgwOyAvLyBUaGUgeCx5IGRpc3RhbmNlcyBmcm9tIHRoZSBjZWxsIG9yaWdpblxuICAgICAgICBsZXQgeTAgPSB5aW4gLSBZMDtcbiAgICAgICAgLy8gRm9yIHRoZSAyRCBjYXNlLCB0aGUgc2ltcGxleCBzaGFwZSBpcyBhbiBlcXVpbGF0ZXJhbCB0cmlhbmdsZS5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggd2UgYXJlIGluLlxuICAgICAgICBsZXQgaTEsIGoxOyAvLyBPZmZzZXRzIGZvciBzZWNvbmQgKG1pZGRsZSkgY29ybmVyIG9mIHNpbXBsZXggaW4gKGksaikgY29vcmRzXG4gICAgICAgIGlmICh4MCA+IHkwKSB7XG4gICAgICAgICAgICBpMSA9IDE7XG4gICAgICAgICAgICBqMSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8vIGxvd2VyIHRyaWFuZ2xlLCBYWSBvcmRlcjogKDAsMCktPigxLDApLT4oMSwxKVxuICAgICAgICAgICAgaTEgPSAwO1xuICAgICAgICAgICAgajEgPSAxO1xuICAgICAgICB9IC8vIHVwcGVyIHRyaWFuZ2xlLCBZWCBvcmRlcjogKDAsMCktPigwLDEpLT4oMSwxKVxuICAgICAgICAvLyBBIHN0ZXAgb2YgKDEsMCkgaW4gKGksaikgbWVhbnMgYSBzdGVwIG9mICgxLWMsLWMpIGluICh4LHkpLCBhbmRcbiAgICAgICAgLy8gYSBzdGVwIG9mICgwLDEpIGluIChpLGopIG1lYW5zIGEgc3RlcCBvZiAoLWMsMS1jKSBpbiAoeCx5KSwgd2hlcmVcbiAgICAgICAgLy8gYyA9ICgzLXNxcnQoMykpLzZcbiAgICAgICAgbGV0IHgxID0geDAgLSBpMSArIEcyOyAvLyBPZmZzZXRzIGZvciBtaWRkbGUgY29ybmVyIGluICh4LHkpIHVuc2tld2VkIGNvb3Jkc1xuICAgICAgICBsZXQgeTEgPSB5MCAtIGoxICsgRzI7XG4gICAgICAgIGxldCB4MiA9IHgwIC0gMSArIDIgKiBHMjsgLy8gT2Zmc2V0cyBmb3IgbGFzdCBjb3JuZXIgaW4gKHgseSkgdW5za2V3ZWQgY29vcmRzXG4gICAgICAgIGxldCB5MiA9IHkwIC0gMSArIDIgKiBHMjtcbiAgICAgICAgLy8gV29yayBvdXQgdGhlIGhhc2hlZCBncmFkaWVudCBpbmRpY2VzIG9mIHRoZSB0aHJlZSBzaW1wbGV4IGNvcm5lcnNcbiAgICAgICAgbGV0IGlpID0gbW9kKGksIGNvdW50KTtcbiAgICAgICAgbGV0IGpqID0gbW9kKGosIGNvdW50KTtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjb250cmlidXRpb24gZnJvbSB0aGUgdGhyZWUgY29ybmVyc1xuICAgICAgICBsZXQgdDAgPSAwLjUgLSB4MCAqIHgwIC0geTAgKiB5MDtcbiAgICAgICAgaWYgKHQwID49IDApIHtcbiAgICAgICAgICAgIHQwICo9IHQwO1xuICAgICAgICAgICAgZ2kgPSBpbmRleGVzW2lpICsgcGVybXNbampdXTtcbiAgICAgICAgICAgIGxldCBncmFkID0gdGhpcy5fZ3JhZGllbnRzW2dpXTtcbiAgICAgICAgICAgIG4wID0gdDAgKiB0MCAqIChncmFkWzBdICogeDAgKyBncmFkWzFdICogeTApO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0MSA9IDAuNSAtIHgxICogeDEgLSB5MSAqIHkxO1xuICAgICAgICBpZiAodDEgPj0gMCkge1xuICAgICAgICAgICAgdDEgKj0gdDE7XG4gICAgICAgICAgICBnaSA9IGluZGV4ZXNbaWkgKyBpMSArIHBlcm1zW2pqICsgajFdXTtcbiAgICAgICAgICAgIGxldCBncmFkID0gdGhpcy5fZ3JhZGllbnRzW2dpXTtcbiAgICAgICAgICAgIG4xID0gdDEgKiB0MSAqIChncmFkWzBdICogeDEgKyBncmFkWzFdICogeTEpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0MiA9IDAuNSAtIHgyICogeDIgLSB5MiAqIHkyO1xuICAgICAgICBpZiAodDIgPj0gMCkge1xuICAgICAgICAgICAgdDIgKj0gdDI7XG4gICAgICAgICAgICBnaSA9IGluZGV4ZXNbaWkgKyAxICsgcGVybXNbamogKyAxXV07XG4gICAgICAgICAgICBsZXQgZ3JhZCA9IHRoaXMuX2dyYWRpZW50c1tnaV07XG4gICAgICAgICAgICBuMiA9IHQyICogdDIgKiAoZ3JhZFswXSAqIHgyICsgZ3JhZFsxXSAqIHkyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgY29udHJpYnV0aW9ucyBmcm9tIGVhY2ggY29ybmVyIHRvIGdldCB0aGUgZmluYWwgbm9pc2UgdmFsdWUuXG4gICAgICAgIC8vIFRoZSByZXN1bHQgaXMgc2NhbGVkIHRvIHJldHVybiB2YWx1ZXMgaW4gdGhlIGludGVydmFsIFstMSwxXS5cbiAgICAgICAgcmV0dXJuIDcwICogKG4wICsgbjEgKyBuMik7XG4gICAgfVxufVxuIiwiaW1wb3J0IFBhdGggZnJvbSBcIi4vcGF0aC5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgU2ltcGxpZmllZCBBKiBhbGdvcml0aG06IGFsbCBlZGdlcyBoYXZlIGEgdmFsdWUgb2YgMVxuICogQGF1Z21lbnRzIFJPVC5QYXRoXG4gKiBAc2VlIFJPVC5QYXRoXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFTdGFyIGV4dGVuZHMgUGF0aCB7XG4gICAgY29uc3RydWN0b3IodG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcih0b1gsIHRvWSwgcGFzc2FibGVDYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3RvZG8gPSBbXTtcbiAgICAgICAgdGhpcy5fZG9uZSA9IHt9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIGEgcGF0aCBmcm9tIGEgZ2l2ZW4gcG9pbnRcbiAgICAgKiBAc2VlIFJPVC5QYXRoI2NvbXB1dGVcbiAgICAgKi9cbiAgICBjb21wdXRlKGZyb21YLCBmcm9tWSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fdG9kbyA9IFtdO1xuICAgICAgICB0aGlzLl9kb25lID0ge307XG4gICAgICAgIHRoaXMuX2Zyb21YID0gZnJvbVg7XG4gICAgICAgIHRoaXMuX2Zyb21ZID0gZnJvbVk7XG4gICAgICAgIHRoaXMuX2FkZCh0aGlzLl90b1gsIHRoaXMuX3RvWSwgbnVsbCk7XG4gICAgICAgIHdoaWxlICh0aGlzLl90b2RvLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl90b2RvLnNoaWZ0KCk7XG4gICAgICAgICAgICBsZXQgaWQgPSBpdGVtLnggKyBcIixcIiArIGl0ZW0ueTtcbiAgICAgICAgICAgIGlmIChpZCBpbiB0aGlzLl9kb25lKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9kb25lW2lkXSA9IGl0ZW07XG4gICAgICAgICAgICBpZiAoaXRlbS54ID09IGZyb21YICYmIGl0ZW0ueSA9PSBmcm9tWSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG5laWdoYm9ycyA9IHRoaXMuX2dldE5laWdoYm9ycyhpdGVtLngsIGl0ZW0ueSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBuZWlnaGJvciA9IG5laWdoYm9yc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IG5laWdoYm9yWzBdO1xuICAgICAgICAgICAgICAgIGxldCB5ID0gbmVpZ2hib3JbMV07XG4gICAgICAgICAgICAgICAgbGV0IGlkID0geCArIFwiLFwiICsgeTtcbiAgICAgICAgICAgICAgICBpZiAoaWQgaW4gdGhpcy5fZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkKHgsIHksIGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5fZG9uZVtmcm9tWCArIFwiLFwiICsgZnJvbVldO1xuICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoaXRlbSkge1xuICAgICAgICAgICAgY2FsbGJhY2soaXRlbS54LCBpdGVtLnkpO1xuICAgICAgICAgICAgaXRlbSA9IGl0ZW0ucHJldjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfYWRkKHgsIHksIHByZXYpIHtcbiAgICAgICAgbGV0IGggPSB0aGlzLl9kaXN0YW5jZSh4LCB5KTtcbiAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgcHJldjogcHJldixcbiAgICAgICAgICAgIGc6IChwcmV2ID8gcHJldi5nICsgMSA6IDApLFxuICAgICAgICAgICAgaDogaFxuICAgICAgICB9O1xuICAgICAgICAvKiBpbnNlcnQgaW50byBwcmlvcml0eSBxdWV1ZSAqL1xuICAgICAgICBsZXQgZiA9IG9iai5nICsgb2JqLmg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fdG9kby5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl90b2RvW2ldO1xuICAgICAgICAgICAgbGV0IGl0ZW1GID0gaXRlbS5nICsgaXRlbS5oO1xuICAgICAgICAgICAgaWYgKGYgPCBpdGVtRiB8fCAoZiA9PSBpdGVtRiAmJiBoIDwgaXRlbS5oKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvZG8uc3BsaWNlKGksIDAsIG9iaik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RvZG8ucHVzaChvYmopO1xuICAgIH1cbiAgICBfZGlzdGFuY2UoeCwgeSkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kpIHtcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gKE1hdGguYWJzKHggLSB0aGlzLl9mcm9tWCkgKyBNYXRoLmFicyh5IC0gdGhpcy5fZnJvbVkpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICBsZXQgZHggPSBNYXRoLmFicyh4IC0gdGhpcy5fZnJvbVgpO1xuICAgICAgICAgICAgICAgIGxldCBkeSA9IE1hdGguYWJzKHkgLSB0aGlzLl9mcm9tWSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGR5ICsgTWF0aC5tYXgoMCwgKGR4IC0gZHkpIC8gMik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGguYWJzKHggLSB0aGlzLl9mcm9tWCksIE1hdGguYWJzKHkgLSB0aGlzLl9mcm9tWSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFBhdGggZnJvbSBcIi4vcGF0aC5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgU2ltcGxpZmllZCBEaWprc3RyYSdzIGFsZ29yaXRobTogYWxsIGVkZ2VzIGhhdmUgYSB2YWx1ZSBvZiAxXG4gKiBAYXVnbWVudHMgUk9ULlBhdGhcbiAqIEBzZWUgUk9ULlBhdGhcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlqa3N0cmEgZXh0ZW5kcyBQYXRoIHtcbiAgICBjb25zdHJ1Y3Rvcih0b1gsIHRvWSwgcGFzc2FibGVDYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICBzdXBlcih0b1gsIHRvWSwgcGFzc2FibGVDYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2NvbXB1dGVkID0ge307XG4gICAgICAgIHRoaXMuX3RvZG8gPSBbXTtcbiAgICAgICAgdGhpcy5fYWRkKHRvWCwgdG9ZLCBudWxsKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBhIHBhdGggZnJvbSBhIGdpdmVuIHBvaW50XG4gICAgICogQHNlZSBST1QuUGF0aCNjb21wdXRlXG4gICAgICovXG4gICAgY29tcHV0ZShmcm9tWCwgZnJvbVksIGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBrZXkgPSBmcm9tWCArIFwiLFwiICsgZnJvbVk7XG4gICAgICAgIGlmICghKGtleSBpbiB0aGlzLl9jb21wdXRlZCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXB1dGUoZnJvbVgsIGZyb21ZKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy5fY29tcHV0ZWQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9jb21wdXRlZFtrZXldO1xuICAgICAgICB3aGlsZSAoaXRlbSkge1xuICAgICAgICAgICAgY2FsbGJhY2soaXRlbS54LCBpdGVtLnkpO1xuICAgICAgICAgICAgaXRlbSA9IGl0ZW0ucHJldjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIGEgbm9uLWNhY2hlZCB2YWx1ZVxuICAgICAqL1xuICAgIF9jb21wdXRlKGZyb21YLCBmcm9tWSkge1xuICAgICAgICB3aGlsZSAodGhpcy5fdG9kby5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5fdG9kby5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKGl0ZW0ueCA9PSBmcm9tWCAmJiBpdGVtLnkgPT0gZnJvbVkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbmVpZ2hib3JzID0gdGhpcy5fZ2V0TmVpZ2hib3JzKGl0ZW0ueCwgaXRlbS55KTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmVpZ2hib3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5laWdoYm9yID0gbmVpZ2hib3JzW2ldO1xuICAgICAgICAgICAgICAgIGxldCB4ID0gbmVpZ2hib3JbMF07XG4gICAgICAgICAgICAgICAgbGV0IHkgPSBuZWlnaGJvclsxXTtcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSB4ICsgXCIsXCIgKyB5O1xuICAgICAgICAgICAgICAgIGlmIChpZCBpbiB0aGlzLl9jb21wdXRlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9IC8qIGFscmVhZHkgZG9uZSAqL1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZCh4LCB5LCBpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfYWRkKHgsIHksIHByZXYpIHtcbiAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgcHJldjogcHJldlxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9jb21wdXRlZFt4ICsgXCIsXCIgKyB5XSA9IG9iajtcbiAgICAgICAgdGhpcy5fdG9kby5wdXNoKG9iaik7XG4gICAgfVxufVxuIiwiaW1wb3J0IERpamtzdHJhIGZyb20gXCIuL2RpamtzdHJhLmpzXCI7XG5pbXBvcnQgQVN0YXIgZnJvbSBcIi4vYXN0YXIuanNcIjtcbmV4cG9ydCBkZWZhdWx0IHsgRGlqa3N0cmEsIEFTdGFyIH07XG4iLCJpbXBvcnQgeyBESVJTIH0gZnJvbSBcIi4uL2NvbnN0YW50cy5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgQWJzdHJhY3QgcGF0aGZpbmRlclxuICogQHBhcmFtIHtpbnR9IHRvWCBUYXJnZXQgWCBjb29yZFxuICogQHBhcmFtIHtpbnR9IHRvWSBUYXJnZXQgWSBjb29yZFxuICogQHBhcmFtIHtmdW5jdGlvbn0gcGFzc2FibGVDYWxsYmFjayBDYWxsYmFjayB0byBkZXRlcm1pbmUgbWFwIHBhc3NhYmlsaXR5XG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge2ludH0gW29wdGlvbnMudG9wb2xvZ3k9OF1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF0aCB7XG4gICAgY29uc3RydWN0b3IodG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLl90b1ggPSB0b1g7XG4gICAgICAgIHRoaXMuX3RvWSA9IHRvWTtcbiAgICAgICAgdGhpcy5fcGFzc2FibGVDYWxsYmFjayA9IHBhc3NhYmxlQ2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIHRvcG9sb2d5OiA4XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9kaXJzID0gRElSU1t0aGlzLl9vcHRpb25zLnRvcG9sb2d5XTtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kgPT0gOCkgeyAvKiByZW9yZGVyIGRpcnMgZm9yIG1vcmUgYWVzdGhldGljIHJlc3VsdCAodmVydGljYWwvaG9yaXpvbnRhbCBmaXJzdCkgKi9cbiAgICAgICAgICAgIHRoaXMuX2RpcnMgPSBbXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyc1swXSxcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJzWzJdLFxuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnNbNF0sXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyc1s2XSxcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJzWzFdLFxuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnNbM10sXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyc1s1XSxcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJzWzddXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXROZWlnaGJvcnMoY3gsIGN5KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZGlyID0gdGhpcy5fZGlyc1tpXTtcbiAgICAgICAgICAgIGxldCB4ID0gY3ggKyBkaXJbMF07XG4gICAgICAgICAgICBsZXQgeSA9IGN5ICsgZGlyWzFdO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9wYXNzYWJsZUNhbGxiYWNrKHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChbeCwgeV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBUaGlzIGNvZGUgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgQWxlYSBhbGdvcml0aG07IChDKSAyMDEwIEpvaGFubmVzIEJhYWfDuGUuXG4gKiBBbGVhIGlzIGxpY2Vuc2VkIGFjY29yZGluZyB0byB0aGUgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NSVRfTGljZW5zZS5cbiAqL1xuY29uc3QgRlJBQyA9IDIuMzI4MzA2NDM2NTM4Njk2M2UtMTA7IC8qIDJeLTMyICovXG5jbGFzcyBSTkcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9zZWVkID0gMDtcbiAgICAgICAgdGhpcy5fczAgPSAwO1xuICAgICAgICB0aGlzLl9zMSA9IDA7XG4gICAgICAgIHRoaXMuX3MyID0gMDtcbiAgICAgICAgdGhpcy5fYyA9IDA7XG4gICAgfVxuICAgIGdldFNlZWQoKSB7IHJldHVybiB0aGlzLl9zZWVkOyB9XG4gICAgLyoqXG4gICAgICogU2VlZCB0aGUgbnVtYmVyIGdlbmVyYXRvclxuICAgICAqL1xuICAgIHNldFNlZWQoc2VlZCkge1xuICAgICAgICBzZWVkID0gKHNlZWQgPCAxID8gMSAvIHNlZWQgOiBzZWVkKTtcbiAgICAgICAgdGhpcy5fc2VlZCA9IHNlZWQ7XG4gICAgICAgIHRoaXMuX3MwID0gKHNlZWQgPj4+IDApICogRlJBQztcbiAgICAgICAgc2VlZCA9IChzZWVkICogNjkwNjkgKyAxKSA+Pj4gMDtcbiAgICAgICAgdGhpcy5fczEgPSBzZWVkICogRlJBQztcbiAgICAgICAgc2VlZCA9IChzZWVkICogNjkwNjkgKyAxKSA+Pj4gMDtcbiAgICAgICAgdGhpcy5fczIgPSBzZWVkICogRlJBQztcbiAgICAgICAgdGhpcy5fYyA9IDE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBQc2V1ZG9yYW5kb20gdmFsdWUgWzAsMSksIHVuaWZvcm1seSBkaXN0cmlidXRlZFxuICAgICAqL1xuICAgIGdldFVuaWZvcm0oKSB7XG4gICAgICAgIGxldCB0ID0gMjA5MTYzOSAqIHRoaXMuX3MwICsgdGhpcy5fYyAqIEZSQUM7XG4gICAgICAgIHRoaXMuX3MwID0gdGhpcy5fczE7XG4gICAgICAgIHRoaXMuX3MxID0gdGhpcy5fczI7XG4gICAgICAgIHRoaXMuX2MgPSB0IHwgMDtcbiAgICAgICAgdGhpcy5fczIgPSB0IC0gdGhpcy5fYztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3MyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbG93ZXJCb3VuZCBUaGUgbG93ZXIgZW5kIG9mIHRoZSByYW5nZSB0byByZXR1cm4gYSB2YWx1ZSBmcm9tLCBpbmNsdXNpdmVcbiAgICAgKiBAcGFyYW0gdXBwZXJCb3VuZCBUaGUgdXBwZXIgZW5kIG9mIHRoZSByYW5nZSB0byByZXR1cm4gYSB2YWx1ZSBmcm9tLCBpbmNsdXNpdmVcbiAgICAgKiBAcmV0dXJucyBQc2V1ZG9yYW5kb20gdmFsdWUgW2xvd2VyQm91bmQsIHVwcGVyQm91bmRdLCB1c2luZyBST1QuUk5HLmdldFVuaWZvcm0oKSB0byBkaXN0cmlidXRlIHRoZSB2YWx1ZVxuICAgICAqL1xuICAgIGdldFVuaWZvcm1JbnQobG93ZXJCb3VuZCwgdXBwZXJCb3VuZCkge1xuICAgICAgICBsZXQgbWF4ID0gTWF0aC5tYXgobG93ZXJCb3VuZCwgdXBwZXJCb3VuZCk7XG4gICAgICAgIGxldCBtaW4gPSBNYXRoLm1pbihsb3dlckJvdW5kLCB1cHBlckJvdW5kKTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5nZXRVbmlmb3JtKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWVhbiBNZWFuIHZhbHVlXG4gICAgICogQHBhcmFtIHN0ZGRldiBTdGFuZGFyZCBkZXZpYXRpb24uIH45NSUgb2YgdGhlIGFic29sdXRlIHZhbHVlcyB3aWxsIGJlIGxvd2VyIHRoYW4gMipzdGRkZXYuXG4gICAgICogQHJldHVybnMgQSBub3JtYWxseSBkaXN0cmlidXRlZCBwc2V1ZG9yYW5kb20gdmFsdWVcbiAgICAgKi9cbiAgICBnZXROb3JtYWwobWVhbiA9IDAsIHN0ZGRldiA9IDEpIHtcbiAgICAgICAgbGV0IHUsIHYsIHI7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHUgPSAyICogdGhpcy5nZXRVbmlmb3JtKCkgLSAxO1xuICAgICAgICAgICAgdiA9IDIgKiB0aGlzLmdldFVuaWZvcm0oKSAtIDE7XG4gICAgICAgICAgICByID0gdSAqIHUgKyB2ICogdjtcbiAgICAgICAgfSB3aGlsZSAociA+IDEgfHwgciA9PSAwKTtcbiAgICAgICAgbGV0IGdhdXNzID0gdSAqIE1hdGguc3FydCgtMiAqIE1hdGgubG9nKHIpIC8gcik7XG4gICAgICAgIHJldHVybiBtZWFuICsgZ2F1c3MgKiBzdGRkZXY7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFBzZXVkb3JhbmRvbSB2YWx1ZSBbMSwxMDBdIGluY2x1c2l2ZSwgdW5pZm9ybWx5IGRpc3RyaWJ1dGVkXG4gICAgICovXG4gICAgZ2V0UGVyY2VudGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIDEgKyBNYXRoLmZsb29yKHRoaXMuZ2V0VW5pZm9ybSgpICogMTAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgUmFuZG9tbHkgcGlja2VkIGl0ZW0sIG51bGwgd2hlbiBsZW5ndGg9MFxuICAgICAqL1xuICAgIGdldEl0ZW0oYXJyYXkpIHtcbiAgICAgICAgaWYgKCFhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheVtNYXRoLmZsb29yKHRoaXMuZ2V0VW5pZm9ybSgpICogYXJyYXkubGVuZ3RoKV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIE5ldyBhcnJheSB3aXRoIHJhbmRvbWl6ZWQgaXRlbXNcbiAgICAgKi9cbiAgICBzaHVmZmxlKGFycmF5KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IGNsb25lID0gYXJyYXkuc2xpY2UoKTtcbiAgICAgICAgd2hpbGUgKGNsb25lLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gY2xvbmUuaW5kZXhPZih0aGlzLmdldEl0ZW0oY2xvbmUpKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNsb25lLnNwbGljZShpbmRleCwgMSlbMF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRhIGtleT13aGF0ZXZlciwgdmFsdWU9d2VpZ2h0IChyZWxhdGl2ZSBwcm9iYWJpbGl0eSlcbiAgICAgKiBAcmV0dXJucyB3aGF0ZXZlclxuICAgICAqL1xuICAgIGdldFdlaWdodGVkVmFsdWUoZGF0YSkge1xuICAgICAgICBsZXQgdG90YWwgPSAwO1xuICAgICAgICBmb3IgKGxldCBpZCBpbiBkYXRhKSB7XG4gICAgICAgICAgICB0b3RhbCArPSBkYXRhW2lkXTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmFuZG9tID0gdGhpcy5nZXRVbmlmb3JtKCkgKiB0b3RhbDtcbiAgICAgICAgbGV0IGlkLCBwYXJ0ID0gMDtcbiAgICAgICAgZm9yIChpZCBpbiBkYXRhKSB7XG4gICAgICAgICAgICBwYXJ0ICs9IGRhdGFbaWRdO1xuICAgICAgICAgICAgaWYgKHJhbmRvbSA8IHBhcnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgYnkgc29tZSBmbG9hdGluZy1wb2ludCBhbm5veWFuY2Ugd2UgaGF2ZVxuICAgICAgICAvLyByYW5kb20gPj0gdG90YWwsIGp1c3QgcmV0dXJuIHRoZSBsYXN0IGlkLlxuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBSTkcgc3RhdGUuIFVzZWZ1bCBmb3Igc3RvcmluZyB0aGUgc3RhdGUgYW5kIHJlLXNldHRpbmcgaXQgdmlhIHNldFN0YXRlLlxuICAgICAqIEByZXR1cm5zIEludGVybmFsIHN0YXRlXG4gICAgICovXG4gICAgZ2V0U3RhdGUoKSB7IHJldHVybiBbdGhpcy5fczAsIHRoaXMuX3MxLCB0aGlzLl9zMiwgdGhpcy5fY107IH1cbiAgICAvKipcbiAgICAgKiBTZXQgYSBwcmV2aW91c2x5IHJldHJpZXZlZCBzdGF0ZS5cbiAgICAgKi9cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLl9zMCA9IHN0YXRlWzBdO1xuICAgICAgICB0aGlzLl9zMSA9IHN0YXRlWzFdO1xuICAgICAgICB0aGlzLl9zMiA9IHN0YXRlWzJdO1xuICAgICAgICB0aGlzLl9jID0gc3RhdGVbM107XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgY2xvbmVkIFJOR1xuICAgICAqL1xuICAgIGNsb25lKCkge1xuICAgICAgICBsZXQgY2xvbmUgPSBuZXcgUk5HKCk7XG4gICAgICAgIHJldHVybiBjbG9uZS5zZXRTdGF0ZSh0aGlzLmdldFN0YXRlKCkpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBSTkcoKS5zZXRTZWVkKERhdGUubm93KCkpO1xuIiwiaW1wb3J0IFNjaGVkdWxlciBmcm9tIFwiLi9zY2hlZHVsZXIuanNcIjtcbi8qKlxuICogQGNsYXNzIEFjdGlvbi1iYXNlZCBzY2hlZHVsZXJcbiAqIEBhdWdtZW50cyBST1QuU2NoZWR1bGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdGlvbiBleHRlbmRzIFNjaGVkdWxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2RlZmF1bHREdXJhdGlvbiA9IDE7IC8qIGZvciBuZXdseSBhZGRlZCAqL1xuICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IHRoaXMuX2RlZmF1bHREdXJhdGlvbjsgLyogZm9yIHRoaXMuX2N1cnJlbnQgKi9cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGl0ZW1cbiAgICAgKiBAcGFyYW0ge2Jvb2x9IHJlcGVhdFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbdGltZT0xXVxuICAgICAqIEBzZWUgUk9ULlNjaGVkdWxlciNhZGRcbiAgICAgKi9cbiAgICBhZGQoaXRlbSwgcmVwZWF0LCB0aW1lKSB7XG4gICAgICAgIHRoaXMuX3F1ZXVlLmFkZChpdGVtLCB0aW1lIHx8IHRoaXMuX2RlZmF1bHREdXJhdGlvbik7XG4gICAgICAgIHJldHVybiBzdXBlci5hZGQoaXRlbSwgcmVwZWF0KTtcbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX2R1cmF0aW9uID0gdGhpcy5fZGVmYXVsdER1cmF0aW9uO1xuICAgICAgICByZXR1cm4gc3VwZXIuY2xlYXIoKTtcbiAgICB9XG4gICAgcmVtb3ZlKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0gPT0gdGhpcy5fY3VycmVudCkge1xuICAgICAgICAgICAgdGhpcy5fZHVyYXRpb24gPSB0aGlzLl9kZWZhdWx0RHVyYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1cGVyLnJlbW92ZShpdGVtKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHNlZSBST1QuU2NoZWR1bGVyI25leHRcbiAgICAgKi9cbiAgICBuZXh0KCkge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudCAhPT0gbnVsbCAmJiB0aGlzLl9yZXBlYXQuaW5kZXhPZih0aGlzLl9jdXJyZW50KSAhPSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fcXVldWUuYWRkKHRoaXMuX2N1cnJlbnQsIHRoaXMuX2R1cmF0aW9uIHx8IHRoaXMuX2RlZmF1bHREdXJhdGlvbik7XG4gICAgICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IHRoaXMuX2RlZmF1bHREdXJhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIubmV4dCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgZHVyYXRpb24gZm9yIHRoZSBhY3RpdmUgaXRlbVxuICAgICAqL1xuICAgIHNldER1cmF0aW9uKHRpbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2R1cmF0aW9uID0gdGltZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgU2ltcGxlIGZyb20gXCIuL3NpbXBsZS5qc1wiO1xuaW1wb3J0IFNwZWVkIGZyb20gXCIuL3NwZWVkLmpzXCI7XG5pbXBvcnQgQWN0aW9uIGZyb20gXCIuL2FjdGlvbi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgeyBTaW1wbGUsIFNwZWVkLCBBY3Rpb24gfTtcbiIsImltcG9ydCBFdmVudFF1ZXVlIGZyb20gXCIuLi9ldmVudHF1ZXVlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2hlZHVsZXIge1xuICAgIC8qKlxuICAgICAqIEBjbGFzcyBBYnN0cmFjdCBzY2hlZHVsZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fcXVldWUgPSBuZXcgRXZlbnRRdWV1ZSgpO1xuICAgICAgICB0aGlzLl9yZXBlYXQgPSBbXTtcbiAgICAgICAgdGhpcy5fY3VycmVudCA9IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBzZWUgUk9ULkV2ZW50UXVldWUjZ2V0VGltZVxuICAgICAqL1xuICAgIGdldFRpbWUoKSB7IHJldHVybiB0aGlzLl9xdWV1ZS5nZXRUaW1lKCk7IH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGl0ZW1cbiAgICAgKiBAcGFyYW0ge2Jvb2x9IHJlcGVhdFxuICAgICAqL1xuICAgIGFkZChpdGVtLCByZXBlYXQpIHtcbiAgICAgICAgaWYgKHJlcGVhdCkge1xuICAgICAgICAgICAgdGhpcy5fcmVwZWF0LnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdGltZSB0aGUgZ2l2ZW4gaXRlbSBpcyBzY2hlZHVsZWQgZm9yXG4gICAgICogQHBhcmFtIHs/fSBpdGVtXG4gICAgICogQHJldHVybnMge251bWJlcn0gdGltZVxuICAgICAqL1xuICAgIGdldFRpbWVPZihpdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWV1ZS5nZXRFdmVudFRpbWUoaXRlbSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFyIGFsbCBpdGVtc1xuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9xdWV1ZS5jbGVhcigpO1xuICAgICAgICB0aGlzLl9yZXBlYXQgPSBbXTtcbiAgICAgICAgdGhpcy5fY3VycmVudCA9IG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBwcmV2aW91c2x5IGFkZGVkIGl0ZW1cbiAgICAgKiBAcGFyYW0gez99IGl0ZW1cbiAgICAgKiBAcmV0dXJucyB7Ym9vbH0gc3VjY2Vzc2Z1bD9cbiAgICAgKi9cbiAgICByZW1vdmUoaXRlbSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5fcXVldWUucmVtb3ZlKGl0ZW0pO1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9yZXBlYXQuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXBlYXQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY3VycmVudCA9PSBpdGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTY2hlZHVsZSBuZXh0IGl0ZW1cbiAgICAgKiBAcmV0dXJucyB7P31cbiAgICAgKi9cbiAgICBuZXh0KCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gdGhpcy5fcXVldWUuZ2V0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICAgIH1cbn1cbiIsImltcG9ydCBTY2hlZHVsZXIgZnJvbSBcIi4vc2NoZWR1bGVyLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBTaW1wbGUgZmFpciBzY2hlZHVsZXIgKHJvdW5kLXJvYmluIHN0eWxlKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW1wbGUgZXh0ZW5kcyBTY2hlZHVsZXIge1xuICAgIGFkZChpdGVtLCByZXBlYXQpIHtcbiAgICAgICAgdGhpcy5fcXVldWUuYWRkKGl0ZW0sIDApO1xuICAgICAgICByZXR1cm4gc3VwZXIuYWRkKGl0ZW0sIHJlcGVhdCk7XG4gICAgfVxuICAgIG5leHQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50ICE9PSBudWxsICYmIHRoaXMuX3JlcGVhdC5pbmRleE9mKHRoaXMuX2N1cnJlbnQpICE9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9xdWV1ZS5hZGQodGhpcy5fY3VycmVudCwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1cGVyLm5leHQoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU2NoZWR1bGVyIGZyb20gXCIuL3NjaGVkdWxlci5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgU3BlZWQtYmFzZWQgc2NoZWR1bGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwZWVkIGV4dGVuZHMgU2NoZWR1bGVyIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaXRlbSBhbnl0aGluZyB3aXRoIFwiZ2V0U3BlZWRcIiBtZXRob2RcbiAgICAgKiBAcGFyYW0ge2Jvb2x9IHJlcGVhdFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbdGltZT0xL2l0ZW0uZ2V0U3BlZWQoKV1cbiAgICAgKiBAc2VlIFJPVC5TY2hlZHVsZXIjYWRkXG4gICAgICovXG4gICAgYWRkKGl0ZW0sIHJlcGVhdCwgdGltZSkge1xuICAgICAgICB0aGlzLl9xdWV1ZS5hZGQoaXRlbSwgdGltZSAhPT0gdW5kZWZpbmVkID8gdGltZSA6IDEgLyBpdGVtLmdldFNwZWVkKCkpO1xuICAgICAgICByZXR1cm4gc3VwZXIuYWRkKGl0ZW0sIHJlcGVhdCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBzZWUgUk9ULlNjaGVkdWxlciNuZXh0XG4gICAgICovXG4gICAgbmV4dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnQgJiYgdGhpcy5fcmVwZWF0LmluZGV4T2YodGhpcy5fY3VycmVudCkgIT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXVlLmFkZCh0aGlzLl9jdXJyZW50LCAxIC8gdGhpcy5fY3VycmVudC5nZXRTcGVlZCgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIubmV4dCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBSTkcgZnJvbSBcIi4vcm5nLmpzXCI7XG4vKipcbiAqIEBjbGFzcyAoTWFya292IHByb2Nlc3MpLWJhc2VkIHN0cmluZyBnZW5lcmF0b3IuXG4gKiBDb3BpZWQgZnJvbSBhIDxhIGhyZWY9XCJodHRwOi8vd3d3LnJvZ3VlYmFzaW4ucm9ndWVsaWtlZGV2ZWxvcG1lbnQub3JnL2luZGV4LnBocD90aXRsZT1OYW1lc19mcm9tX2FfaGlnaF9vcmRlcl9NYXJrb3ZfUHJvY2Vzc19hbmRfYV9zaW1wbGlmaWVkX0thdHpfYmFjay1vZmZfc2NoZW1lXCI+Um9ndWVCYXNpbiBhcnRpY2xlPC9hPi5cbiAqIE9mZmVycyBjb25maWd1cmFibGUgb3JkZXIgYW5kIHByaW9yLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHJpbmdHZW5lcmF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHdvcmRzOiBmYWxzZSxcbiAgICAgICAgICAgIG9yZGVyOiAzLFxuICAgICAgICAgICAgcHJpb3I6IDAuMDAxXG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2JvdW5kYXJ5ID0gU3RyaW5nLmZyb21DaGFyQ29kZSgwKTtcbiAgICAgICAgdGhpcy5fc3VmZml4ID0gdGhpcy5fYm91bmRhcnk7XG4gICAgICAgIHRoaXMuX3ByZWZpeCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX29wdGlvbnMub3JkZXI7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fcHJlZml4LnB1c2godGhpcy5fYm91bmRhcnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ByaW9yVmFsdWVzID0ge307XG4gICAgICAgIHRoaXMuX3ByaW9yVmFsdWVzW3RoaXMuX2JvdW5kYXJ5XSA9IHRoaXMuX29wdGlvbnMucHJpb3I7XG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBsZWFybmluZyBkYXRhXG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICAgICAgdGhpcy5fcHJpb3JWYWx1ZXMgPSB7fTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ30gR2VuZXJhdGVkIHN0cmluZ1xuICAgICAqL1xuICAgIGdlbmVyYXRlKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW3RoaXMuX3NhbXBsZSh0aGlzLl9wcmVmaXgpXTtcbiAgICAgICAgd2hpbGUgKHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0gIT0gdGhpcy5fYm91bmRhcnkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuX3NhbXBsZShyZXN1bHQpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fam9pbihyZXN1bHQuc2xpY2UoMCwgLTEpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT2JzZXJ2ZSAobGVhcm4pIGEgc3RyaW5nIGZyb20gYSB0cmFpbmluZyBzZXRcbiAgICAgKi9cbiAgICBvYnNlcnZlKHN0cmluZykge1xuICAgICAgICBsZXQgdG9rZW5zID0gdGhpcy5fc3BsaXQoc3RyaW5nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX3ByaW9yVmFsdWVzW3Rva2Vuc1tpXV0gPSB0aGlzLl9vcHRpb25zLnByaW9yO1xuICAgICAgICB9XG4gICAgICAgIHRva2VucyA9IHRoaXMuX3ByZWZpeC5jb25jYXQodG9rZW5zKS5jb25jYXQodGhpcy5fc3VmZml4KTsgLyogYWRkIGJvdW5kYXJ5IHN5bWJvbHMgKi9cbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX29wdGlvbnMub3JkZXI7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gdG9rZW5zLnNsaWNlKGkgLSB0aGlzLl9vcHRpb25zLm9yZGVyLCBpKTtcbiAgICAgICAgICAgIGxldCBldmVudCA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29udGV4dC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGxldCBzdWJjb250ZXh0ID0gY29udGV4dC5zbGljZShqKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vYnNlcnZlRXZlbnQoc3ViY29udGV4dCwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGdldFN0YXRzKCkge1xuICAgICAgICBsZXQgcGFydHMgPSBbXTtcbiAgICAgICAgbGV0IHByaW9yQ291bnQgPSBPYmplY3Qua2V5cyh0aGlzLl9wcmlvclZhbHVlcykubGVuZ3RoO1xuICAgICAgICBwcmlvckNvdW50LS07IC8vIGJvdW5kYXJ5XG4gICAgICAgIHBhcnRzLnB1c2goXCJkaXN0aW5jdCBzYW1wbGVzOiBcIiArIHByaW9yQ291bnQpO1xuICAgICAgICBsZXQgZGF0YUNvdW50ID0gT2JqZWN0LmtleXModGhpcy5fZGF0YSkubGVuZ3RoO1xuICAgICAgICBsZXQgZXZlbnRDb3VudCA9IDA7XG4gICAgICAgIGZvciAobGV0IHAgaW4gdGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgZXZlbnRDb3VudCArPSBPYmplY3Qua2V5cyh0aGlzLl9kYXRhW3BdKS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChcImRpY3Rpb25hcnkgc2l6ZSAoY29udGV4dHMpOiBcIiArIGRhdGFDb3VudCk7XG4gICAgICAgIHBhcnRzLnB1c2goXCJkaWN0aW9uYXJ5IHNpemUgKGV2ZW50cyk6IFwiICsgZXZlbnRDb3VudCk7XG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiLCBcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICAgKi9cbiAgICBfc3BsaXQoc3RyKSB7XG4gICAgICAgIHJldHVybiBzdHIuc3BsaXQodGhpcy5fb3B0aW9ucy53b3JkcyA/IC9cXHMrLyA6IFwiXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgX2pvaW4oYXJyKSB7XG4gICAgICAgIHJldHVybiBhcnIuam9pbih0aGlzLl9vcHRpb25zLndvcmRzID8gXCIgXCIgOiBcIlwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gY29udGV4dFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgICAqL1xuICAgIF9vYnNlcnZlRXZlbnQoY29udGV4dCwgZXZlbnQpIHtcbiAgICAgICAgbGV0IGtleSA9IHRoaXMuX2pvaW4oY29udGV4dCk7XG4gICAgICAgIGlmICghKGtleSBpbiB0aGlzLl9kYXRhKSkge1xuICAgICAgICAgICAgdGhpcy5fZGF0YVtrZXldID0ge307XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLl9kYXRhW2tleV07XG4gICAgICAgIGlmICghKGV2ZW50IGluIGRhdGEpKSB7XG4gICAgICAgICAgICBkYXRhW2V2ZW50XSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YVtldmVudF0rKztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIF9zYW1wbGUoY29udGV4dCkge1xuICAgICAgICBjb250ZXh0ID0gdGhpcy5fYmFja29mZihjb250ZXh0KTtcbiAgICAgICAgbGV0IGtleSA9IHRoaXMuX2pvaW4oY29udGV4dCk7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5fZGF0YVtrZXldO1xuICAgICAgICBsZXQgYXZhaWxhYmxlID0ge307XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnByaW9yKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBldmVudCBpbiB0aGlzLl9wcmlvclZhbHVlcykge1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVtldmVudF0gPSB0aGlzLl9wcmlvclZhbHVlc1tldmVudF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBldmVudCBpbiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlW2V2ZW50XSArPSBkYXRhW2V2ZW50XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF2YWlsYWJsZSA9IGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJORy5nZXRXZWlnaHRlZFZhbHVlKGF2YWlsYWJsZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119XG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgICAqL1xuICAgIF9iYWNrb2ZmKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gdGhpcy5fb3B0aW9ucy5vcmRlcikge1xuICAgICAgICAgICAgY29udGV4dCA9IGNvbnRleHQuc2xpY2UoLXRoaXMuX29wdGlvbnMub3JkZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbnRleHQubGVuZ3RoIDwgdGhpcy5fb3B0aW9ucy5vcmRlcikge1xuICAgICAgICAgICAgY29udGV4dCA9IHRoaXMuX3ByZWZpeC5zbGljZSgwLCB0aGlzLl9vcHRpb25zLm9yZGVyIC0gY29udGV4dC5sZW5ndGgpLmNvbmNhdChjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoISh0aGlzLl9qb2luKGNvbnRleHQpIGluIHRoaXMuX2RhdGEpICYmIGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29udGV4dCA9IGNvbnRleHQuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAbmFtZXNwYWNlXG4gKiBDb250YWlucyB0ZXh0IHRva2VuaXphdGlvbiBhbmQgYnJlYWtpbmcgcm91dGluZXNcbiAqL1xuY29uc3QgUkVfQ09MT1JTID0gLyUoW2JjXSl7KFtefV0qKX0vZztcbi8vIHRva2VuIHR5cGVzXG5leHBvcnQgY29uc3QgVFlQRV9URVhUID0gMDtcbmV4cG9ydCBjb25zdCBUWVBFX05FV0xJTkUgPSAxO1xuZXhwb3J0IGNvbnN0IFRZUEVfRkcgPSAyO1xuZXhwb3J0IGNvbnN0IFRZUEVfQkcgPSAzO1xuLyoqXG4gKiBNZWFzdXJlIHNpemUgb2YgYSByZXN1bHRpbmcgdGV4dCBibG9ja1xuICovXG5leHBvcnQgZnVuY3Rpb24gbWVhc3VyZShzdHIsIG1heFdpZHRoKSB7XG4gICAgbGV0IHJlc3VsdCA9IHsgd2lkdGg6IDAsIGhlaWdodDogMSB9O1xuICAgIGxldCB0b2tlbnMgPSB0b2tlbml6ZShzdHIsIG1heFdpZHRoKTtcbiAgICBsZXQgbGluZVdpZHRoID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgIHN3aXRjaCAodG9rZW4udHlwZSkge1xuICAgICAgICAgICAgY2FzZSBUWVBFX1RFWFQ6XG4gICAgICAgICAgICAgICAgbGluZVdpZHRoICs9IHRva2VuLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVFlQRV9ORVdMSU5FOlxuICAgICAgICAgICAgICAgIHJlc3VsdC5oZWlnaHQrKztcbiAgICAgICAgICAgICAgICByZXN1bHQud2lkdGggPSBNYXRoLm1heChyZXN1bHQud2lkdGgsIGxpbmVXaWR0aCk7XG4gICAgICAgICAgICAgICAgbGluZVdpZHRoID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQud2lkdGggPSBNYXRoLm1heChyZXN1bHQud2lkdGgsIGxpbmVXaWR0aCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogQ29udmVydCBzdHJpbmcgdG8gYSBzZXJpZXMgb2YgYSBmb3JtYXR0aW5nIGNvbW1hbmRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2tlbml6ZShzdHIsIG1heFdpZHRoKSB7XG4gICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgIC8qIGZpcnN0IHRva2VuaXphdGlvbiBwYXNzIC0gc3BsaXQgdGV4dHMgYW5kIGNvbG9yIGZvcm1hdHRpbmcgY29tbWFuZHMgKi9cbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBzdHIucmVwbGFjZShSRV9DT0xPUlMsIGZ1bmN0aW9uIChtYXRjaCwgdHlwZSwgbmFtZSwgaW5kZXgpIHtcbiAgICAgICAgLyogc3RyaW5nIGJlZm9yZSAqL1xuICAgICAgICBsZXQgcGFydCA9IHN0ci5zdWJzdHJpbmcob2Zmc2V0LCBpbmRleCk7XG4gICAgICAgIGlmIChwYXJ0Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IFRZUEVfVEVYVCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogcGFydFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLyogY29sb3IgY29tbWFuZCAqL1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiAodHlwZSA9PSBcImNcIiA/IFRZUEVfRkcgOiBUWVBFX0JHKSxcbiAgICAgICAgICAgIHZhbHVlOiBuYW1lLnRyaW0oKVxuICAgICAgICB9KTtcbiAgICAgICAgb2Zmc2V0ID0gaW5kZXggKyBtYXRjaC5sZW5ndGg7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH0pO1xuICAgIC8qIGxhc3QgcmVtYWluaW5nIHBhcnQgKi9cbiAgICBsZXQgcGFydCA9IHN0ci5zdWJzdHJpbmcob2Zmc2V0KTtcbiAgICBpZiAocGFydC5sZW5ndGgpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgdHlwZTogVFlQRV9URVhULFxuICAgICAgICAgICAgdmFsdWU6IHBhcnRcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBicmVha0xpbmVzKHJlc3VsdCwgbWF4V2lkdGgpO1xufVxuLyogaW5zZXJ0IGxpbmUgYnJlYWtzIGludG8gZmlyc3QtcGFzcyB0b2tlbml6ZWQgZGF0YSAqL1xuZnVuY3Rpb24gYnJlYWtMaW5lcyh0b2tlbnMsIG1heFdpZHRoKSB7XG4gICAgaWYgKCFtYXhXaWR0aCkge1xuICAgICAgICBtYXhXaWR0aCA9IEluZmluaXR5O1xuICAgIH1cbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxpbmVMZW5ndGggPSAwO1xuICAgIGxldCBsYXN0VG9rZW5XaXRoU3BhY2UgPSAtMTtcbiAgICB3aGlsZSAoaSA8IHRva2Vucy5sZW5ndGgpIHsgLyogdGFrZSBhbGwgdGV4dCB0b2tlbnMsIHJlbW92ZSBzcGFjZSwgYXBwbHkgbGluZWJyZWFrcyAqL1xuICAgICAgICBsZXQgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgIGlmICh0b2tlbi50eXBlID09IFRZUEVfTkVXTElORSkgeyAvKiByZXNldCAqL1xuICAgICAgICAgICAgbGluZUxlbmd0aCA9IDA7XG4gICAgICAgICAgICBsYXN0VG9rZW5XaXRoU3BhY2UgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9rZW4udHlwZSAhPSBUWVBFX1RFWFQpIHsgLyogc2tpcCBub24tdGV4dCB0b2tlbnMgKi9cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8qIHJlbW92ZSBzcGFjZXMgYXQgdGhlIGJlZ2lubmluZyBvZiBsaW5lICovXG4gICAgICAgIHdoaWxlIChsaW5lTGVuZ3RoID09IDAgJiYgdG9rZW4udmFsdWUuY2hhckF0KDApID09IFwiIFwiKSB7XG4gICAgICAgICAgICB0b2tlbi52YWx1ZSA9IHRva2VuLnZhbHVlLnN1YnN0cmluZygxKTtcbiAgICAgICAgfVxuICAgICAgICAvKiBmb3JjZWQgbmV3bGluZT8gaW5zZXJ0IHR3byBuZXcgdG9rZW5zIGFmdGVyIHRoaXMgb25lICovXG4gICAgICAgIGxldCBpbmRleCA9IHRva2VuLnZhbHVlLmluZGV4T2YoXCJcXG5cIik7XG4gICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgdG9rZW4udmFsdWUgPSBicmVha0luc2lkZVRva2VuKHRva2VucywgaSwgaW5kZXgsIHRydWUpO1xuICAgICAgICAgICAgLyogaWYgdGhlcmUgYXJlIHNwYWNlcyBhdCB0aGUgZW5kLCB3ZSBtdXN0IHJlbW92ZSB0aGVtICh3ZSBkbyBub3Qgd2FudCB0aGUgbGluZSB0b28gbG9uZykgKi9cbiAgICAgICAgICAgIGxldCBhcnIgPSB0b2tlbi52YWx1ZS5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgIHdoaWxlIChhcnIubGVuZ3RoICYmIGFyclthcnIubGVuZ3RoIC0gMV0gPT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgICBhcnIucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbi52YWx1ZSA9IGFyci5qb2luKFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8qIHRva2VuIGRlZ2VuZXJhdGVkPyAqL1xuICAgICAgICBpZiAoIXRva2VuLnZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgdG9rZW5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaW5lTGVuZ3RoICsgdG9rZW4udmFsdWUubGVuZ3RoID4gbWF4V2lkdGgpIHsgLyogbGluZSB0b28gbG9uZywgZmluZCBhIHN1aXRhYmxlIGJyZWFraW5nIHNwb3QgKi9cbiAgICAgICAgICAgIC8qIGlzIGl0IHBvc3NpYmxlIHRvIGJyZWFrIHdpdGhpbiB0aGlzIHRva2VuPyAqL1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgIGxldCBuZXh0SW5kZXggPSB0b2tlbi52YWx1ZS5pbmRleE9mKFwiIFwiLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsaW5lTGVuZ3RoICsgbmV4dEluZGV4ID4gbWF4V2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluZGV4ID0gbmV4dEluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7IC8qIGJyZWFrIGF0IHNwYWNlIHdpdGhpbiB0aGlzIG9uZSAqL1xuICAgICAgICAgICAgICAgIHRva2VuLnZhbHVlID0gYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIGksIGluZGV4LCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGxhc3RUb2tlbldpdGhTcGFjZSAhPSAtMSkgeyAvKiBpcyB0aGVyZSBhIHByZXZpb3VzIHRva2VuIHdoZXJlIGEgYnJlYWsgY2FuIG9jY3VyPyAqL1xuICAgICAgICAgICAgICAgIGxldCB0b2tlbiA9IHRva2Vuc1tsYXN0VG9rZW5XaXRoU3BhY2VdO1xuICAgICAgICAgICAgICAgIGxldCBicmVha0luZGV4ID0gdG9rZW4udmFsdWUubGFzdEluZGV4T2YoXCIgXCIpO1xuICAgICAgICAgICAgICAgIHRva2VuLnZhbHVlID0gYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIGxhc3RUb2tlbldpdGhTcGFjZSwgYnJlYWtJbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgaSA9IGxhc3RUb2tlbldpdGhTcGFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvKiBmb3JjZSBicmVhayBpbiB0aGlzIHRva2VuICovXG4gICAgICAgICAgICAgICAgdG9rZW4udmFsdWUgPSBicmVha0luc2lkZVRva2VuKHRva2VucywgaSwgbWF4V2lkdGggLSBsaW5lTGVuZ3RoLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8qIGxpbmUgbm90IGxvbmcsIGNvbnRpbnVlICovXG4gICAgICAgICAgICBsaW5lTGVuZ3RoICs9IHRva2VuLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZS5pbmRleE9mKFwiIFwiKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIGxhc3RUb2tlbldpdGhTcGFjZSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaSsrOyAvKiBhZHZhbmNlIHRvIG5leHQgdG9rZW4gKi9cbiAgICB9XG4gICAgdG9rZW5zLnB1c2goeyB0eXBlOiBUWVBFX05FV0xJTkUgfSk7IC8qIGluc2VydCBmYWtlIG5ld2xpbmUgdG8gZml4IHRoZSBsYXN0IHRleHQgbGluZSAqL1xuICAgIC8qIHJlbW92ZSB0cmFpbGluZyBzcGFjZSBmcm9tIHRleHQgdG9rZW5zIGJlZm9yZSBuZXdsaW5lcyAqL1xuICAgIGxldCBsYXN0VGV4dFRva2VuID0gbnVsbDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgIHN3aXRjaCAodG9rZW4udHlwZSkge1xuICAgICAgICAgICAgY2FzZSBUWVBFX1RFWFQ6XG4gICAgICAgICAgICAgICAgbGFzdFRleHRUb2tlbiA9IHRva2VuO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUWVBFX05FV0xJTkU6XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RUZXh0VG9rZW4pIHsgLyogcmVtb3ZlIHRyYWlsaW5nIHNwYWNlICovXG4gICAgICAgICAgICAgICAgICAgIGxldCBhcnIgPSBsYXN0VGV4dFRva2VuLnZhbHVlLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoYXJyLmxlbmd0aCAmJiBhcnJbYXJyLmxlbmd0aCAtIDFdID09IFwiIFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGFzdFRleHRUb2tlbi52YWx1ZSA9IGFyci5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYXN0VGV4dFRva2VuID0gbnVsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b2tlbnMucG9wKCk7IC8qIHJlbW92ZSBmYWtlIHRva2VuICovXG4gICAgcmV0dXJuIHRva2Vucztcbn1cbi8qKlxuICogQ3JlYXRlIG5ldyB0b2tlbnMgYW5kIGluc2VydCB0aGVtIGludG8gdGhlIHN0cmVhbVxuICogQHBhcmFtIHtvYmplY3RbXX0gdG9rZW5zXG4gKiBAcGFyYW0ge2ludH0gdG9rZW5JbmRleCBUb2tlbiBiZWluZyBwcm9jZXNzZWRcbiAqIEBwYXJhbSB7aW50fSBicmVha0luZGV4IEluZGV4IHdpdGhpbiBjdXJyZW50IHRva2VuJ3MgdmFsdWVcbiAqIEBwYXJhbSB7Ym9vbH0gcmVtb3ZlQnJlYWtDaGFyIERvIHdlIHdhbnQgdG8gcmVtb3ZlIHRoZSBicmVha2luZyBjaGFyYWN0ZXI/XG4gKiBAcmV0dXJucyB7c3RyaW5nfSByZW1haW5pbmcgdW5icm9rZW4gdG9rZW4gdmFsdWVcbiAqL1xuZnVuY3Rpb24gYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIHRva2VuSW5kZXgsIGJyZWFrSW5kZXgsIHJlbW92ZUJyZWFrQ2hhcikge1xuICAgIGxldCBuZXdCcmVha1Rva2VuID0ge1xuICAgICAgICB0eXBlOiBUWVBFX05FV0xJTkVcbiAgICB9O1xuICAgIGxldCBuZXdUZXh0VG9rZW4gPSB7XG4gICAgICAgIHR5cGU6IFRZUEVfVEVYVCxcbiAgICAgICAgdmFsdWU6IHRva2Vuc1t0b2tlbkluZGV4XS52YWx1ZS5zdWJzdHJpbmcoYnJlYWtJbmRleCArIChyZW1vdmVCcmVha0NoYXIgPyAxIDogMCkpXG4gICAgfTtcbiAgICB0b2tlbnMuc3BsaWNlKHRva2VuSW5kZXggKyAxLCAwLCBuZXdCcmVha1Rva2VuLCBuZXdUZXh0VG9rZW4pO1xuICAgIHJldHVybiB0b2tlbnNbdG9rZW5JbmRleF0udmFsdWUuc3Vic3RyaW5nKDAsIGJyZWFrSW5kZXgpO1xufVxuIiwiLyoqXG4gKiBBbHdheXMgcG9zaXRpdmUgbW9kdWx1c1xuICogQHBhcmFtIHggT3BlcmFuZFxuICogQHBhcmFtIG4gTW9kdWx1c1xuICogQHJldHVybnMgeCBtb2R1bG8gblxuICovXG5leHBvcnQgZnVuY3Rpb24gbW9kKHgsIG4pIHtcbiAgICByZXR1cm4gKHggJSBuICsgbikgJSBuO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wKHZhbCwgbWluID0gMCwgbWF4ID0gMSkge1xuICAgIGlmICh2YWwgPCBtaW4pXG4gICAgICAgIHJldHVybiBtaW47XG4gICAgaWYgKHZhbCA+IG1heClcbiAgICAgICAgcmV0dXJuIG1heDtcbiAgICByZXR1cm4gdmFsO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zdWJzdHJpbmcoMSk7XG59XG4vKipcbiAqIEZvcm1hdCBhIHN0cmluZyBpbiBhIGZsZXhpYmxlIHdheS4gU2NhbnMgZm9yICVzIHN0cmluZ3MgYW5kIHJlcGxhY2VzIHRoZW0gd2l0aCBhcmd1bWVudHMuIExpc3Qgb2YgcGF0dGVybnMgaXMgbW9kaWZpYWJsZSB2aWEgU3RyaW5nLmZvcm1hdC5tYXAuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGVtcGxhdGVcbiAqIEBwYXJhbSB7YW55fSBbYXJndl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdCh0ZW1wbGF0ZSwgLi4uYXJncykge1xuICAgIGxldCBtYXAgPSBmb3JtYXQubWFwO1xuICAgIGxldCByZXBsYWNlciA9IGZ1bmN0aW9uIChtYXRjaCwgZ3JvdXAxLCBncm91cDIsIGluZGV4KSB7XG4gICAgICAgIGlmICh0ZW1wbGF0ZS5jaGFyQXQoaW5kZXggLSAxKSA9PSBcIiVcIikge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoLnN1YnN0cmluZygxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9iaiA9IGFyZ3NbMF07XG4gICAgICAgIGxldCBncm91cCA9IGdyb3VwMSB8fCBncm91cDI7XG4gICAgICAgIGxldCBwYXJ0cyA9IGdyb3VwLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgbGV0IG5hbWUgPSBwYXJ0cy5zaGlmdCgpIHx8IFwiXCI7XG4gICAgICAgIGxldCBtZXRob2QgPSBtYXBbbmFtZS50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgaWYgKCFtZXRob2QpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgfVxuICAgICAgICBvYmogPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgIGxldCByZXBsYWNlZCA9IG9ialttZXRob2RdLmFwcGx5KG9iaiwgcGFydHMpO1xuICAgICAgICBsZXQgZmlyc3QgPSBuYW1lLmNoYXJBdCgwKTtcbiAgICAgICAgaWYgKGZpcnN0ICE9IGZpcnN0LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIHJlcGxhY2VkID0gY2FwaXRhbGl6ZShyZXBsYWNlZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcGxhY2VkO1xuICAgIH07XG4gICAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UoLyUoPzooW2Etel0rKXwoPzp7KFtefV0rKX0pKS9naSwgcmVwbGFjZXIpO1xufVxuZm9ybWF0Lm1hcCA9IHtcbiAgICBcInNcIjogXCJ0b1N0cmluZ1wiXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRpcmVjdGlvbkFjdGlvbiA9IHZvaWQgMDtcbmNsYXNzIERpcmVjdGlvbkFjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoZHgsIGR5KSB7XG4gICAgICAgIHRoaXMuZHggPSBkeDtcbiAgICAgICAgdGhpcy5keSA9IGR5O1xuICAgICAgICB0aGlzLmNvc3QgPSAxO1xuICAgIH1cbiAgICBleGVjdXRlKGFjdG9yLCBtYXApIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkRpcmVjdGlvbkFjdGlvbi5leGVjdXRlIHNob3VsZCBub3QgYmUgcG9zc2libGUhXCIpO1xuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgfVxuICAgIGRlc3RpbmF0aW9uKGFjdG9yKSB7XG4gICAgICAgIHJldHVybiBbYWN0b3IueCArIHRoaXMuZHgsIGFjdG9yLnkgKyB0aGlzLmR5XTtcbiAgICB9XG59XG5leHBvcnRzLkRpcmVjdGlvbkFjdGlvbiA9IERpcmVjdGlvbkFjdGlvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Nb3ZlQWN0aW9uID0gdm9pZCAwO1xuY29uc3QgbWVzc2FnZUxvZ18xID0gcmVxdWlyZShcIi4uL3V0aWxpdHkvbWVzc2FnZUxvZ1wiKTtcbmNvbnN0IGRpcmVjdGlvbkFjdGlvbl8xID0gcmVxdWlyZShcIi4vZGlyZWN0aW9uQWN0aW9uXCIpO1xuY2xhc3MgTW92ZUFjdGlvbiBleHRlbmRzIGRpcmVjdGlvbkFjdGlvbl8xLkRpcmVjdGlvbkFjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoZHgsIGR5KSB7XG4gICAgICAgIHN1cGVyKGR4LCBkeSk7XG4gICAgfVxuICAgIGV4ZWN1dGUoYWN0b3IsIG1hcCkge1xuICAgICAgICBsZXQgW3gsIHldID0gdGhpcy5kZXN0aW5hdGlvbihhY3Rvcik7XG4gICAgICAgIGlmICghbWFwLmlzV2Fsa2FibGUoeCwgeSkgfHwgbWFwLmFjdG9yQXRMb2NhdGlvbih4LCB5KSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbWVzc2FnZUxvZ18xLk1lc3NhZ2VMb2cuYWRkRXJyb3JNZXNzYWdlKFwiVGhhdCB3YXkgaXMgYmxvY2tlZC5cIiwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhY3Rvci5tb3ZlKHRoaXMuZHgsIHRoaXMuZHkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5Nb3ZlQWN0aW9uID0gTW92ZUFjdGlvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BSUJlaGF2aW9yID0gdm9pZCAwO1xuY2xhc3MgQUlCZWhhdmlvciB7XG4gICAgYWN0KGFjdG9yLCBtYXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gICAgfVxufVxuZXhwb3J0cy5BSUJlaGF2aW9yID0gQUlCZWhhdmlvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5QbGF5ZXJCZWhhdmlvciA9IHZvaWQgMDtcbmNvbnN0IG1vdmVBY3Rpb25fMSA9IHJlcXVpcmUoXCIuLi9hY3Rpb24vbW92ZUFjdGlvblwiKTtcbmNvbnN0IGlucHV0TWFuYWdlcl8xID0gcmVxdWlyZShcIi4uL2dhbWUvaW5wdXRNYW5hZ2VyXCIpO1xuY2xhc3MgUGxheWVyQmVoYXZpb3Ige1xuICAgIGFjdChhY3RvciwgbWFwKSB7XG4gICAgICAgIGlmIChpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5ET1dOKSB8fCBpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5TKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBtb3ZlQWN0aW9uXzEuTW92ZUFjdGlvbigwLCAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmlzS2V5RG93bihpbnB1dE1hbmFnZXJfMS5LZXkuVVApIHx8IGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LlcpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IG1vdmVBY3Rpb25fMS5Nb3ZlQWN0aW9uKDAsIC0xKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmlzS2V5RG93bihpbnB1dE1hbmFnZXJfMS5LZXkuTEVGVCkgfHwgaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmlzS2V5RG93bihpbnB1dE1hbmFnZXJfMS5LZXkuQSkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgbW92ZUFjdGlvbl8xLk1vdmVBY3Rpb24oLTEsIDApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5SSUdIVCkgfHwgaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmlzS2V5RG93bihpbnB1dE1hbmFnZXJfMS5LZXkuRCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgbW92ZUFjdGlvbl8xLk1vdmVBY3Rpb24oMSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5leHBvcnRzLlBsYXllckJlaGF2aW9yID0gUGxheWVyQmVoYXZpb3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQWN0b3IgPSB2b2lkIDA7XG5jb25zdCBlbnRpdHlfMSA9IHJlcXVpcmUoXCIuL2VudGl0eVwiKTtcbmNvbnN0IHJlbmRlck9yZGVyXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0eS9yZW5kZXJPcmRlclwiKTtcbmNvbnN0IGFpQmVoYXZpb3JfMSA9IHJlcXVpcmUoXCIuLi9iZWhhdmlvci9haUJlaGF2aW9yXCIpO1xuY2xhc3MgQWN0b3IgZXh0ZW5kcyBlbnRpdHlfMS5FbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCwgYmxvY2tzTW92ZW1lbnQgPSBmYWxzZSwgY2hhciA9IFwiP1wiLCBmZyA9IFsyNTUsIDI1NSwgMjU1XSwgYmcgPSBbMCwgMCwgMF0sIHJlbmRlck9yZGVyID0gcmVuZGVyT3JkZXJfMS5SZW5kZXJPcmRlci5Db3Jwc2UsIGJlaGF2aW9yID0gbmV3IGFpQmVoYXZpb3JfMS5BSUJlaGF2aW9yKCkpIHtcbiAgICAgICAgc3VwZXIoeCwgeSwgYmxvY2tzTW92ZW1lbnQsIGNoYXIsIGZnLCBiZywgcmVuZGVyT3JkZXIpO1xuICAgICAgICB0aGlzLmJlaGF2aW9yID0gYmVoYXZpb3I7XG4gICAgfVxuICAgIGFjdChtYXApIHtcbiAgICAgICAgbGV0IGFjdGlvbiA9IHRoaXMuYmVoYXZpb3IuYWN0KHRoaXMsIG1hcCk7XG4gICAgICAgIGlmIChhY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYWN0aW9uLmV4ZWN1dGUodGhpcywgbWFwKTtcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb24uY29zdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgc3Bhd24oeCwgeSwgbWFwKSB7XG4gICAgICAgIGxldCBjbG9uZSA9IG5ldyBBY3Rvcih4LCB5LCB0aGlzLmJsb2Nrc01vdmVtZW50LCB0aGlzLmNoYXIsIHVuZGVmaW5lZCwgLy8gZmcgc2V0IGFmdGVyIHRoZSBmYWN0XG4gICAgICAgIHVuZGVmaW5lZCwgLy8gYmcgc2V0IGFmdGVyIHRoZSBmYWN0XG4gICAgICAgIHRoaXMucmVuZGVyT3JkZXIsIHRoaXMuYmVoYXZpb3IpO1xuICAgICAgICBjbG9uZS5mZyA9IHRoaXMuZmc7XG4gICAgICAgIGNsb25lLmJnID0gdGhpcy5iZztcbiAgICAgICAgbWFwLmFkZEVudGl0eShjbG9uZSk7XG4gICAgICAgIHJldHVybiBjbG9uZTtcbiAgICB9XG59XG5leHBvcnRzLkFjdG9yID0gQWN0b3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHBsYXllckJlaGF2aW9yXzEgPSByZXF1aXJlKFwiLi4vYmVoYXZpb3IvcGxheWVyQmVoYXZpb3JcIik7XG5jb25zdCBhY3Rvcl8xID0gcmVxdWlyZShcIi4vYWN0b3JcIik7XG5sZXQgYWN0b3JGYWN0b3J5ID0ge307XG5hY3RvckZhY3RvcnkucGxheWVyID0gbmV3IGFjdG9yXzEuQWN0b3IoKTtcbmFjdG9yRmFjdG9yeS5wbGF5ZXIuY2hhciA9ICdAJztcbmFjdG9yRmFjdG9yeS5wbGF5ZXIuYmVoYXZpb3IgPSBuZXcgcGxheWVyQmVoYXZpb3JfMS5QbGF5ZXJCZWhhdmlvcigpO1xuZXhwb3J0cy5kZWZhdWx0ID0gYWN0b3JGYWN0b3J5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkVudGl0eSA9IHZvaWQgMDtcbmNvbnN0IGNvbG9yXzEgPSByZXF1aXJlKFwicm90LWpzL2xpYi9jb2xvclwiKTtcbmNvbnN0IGVycm9yXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0eS9lcnJvclwiKTtcbmNvbnN0IHJlbmRlck9yZGVyXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0eS9yZW5kZXJPcmRlclwiKTtcbmNsYXNzIEVudGl0eSB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwLCBibG9ja3NNb3ZlbWVudCA9IGZhbHNlLCBjaGFyID0gXCI/XCIsIGZnID0gWzI1NSwgMjU1LCAyNTVdLCBiZyA9IFswLCAwLCAwXSwgcmVuZGVyT3JkZXIgPSByZW5kZXJPcmRlcl8xLlJlbmRlck9yZGVyLkNvcnBzZSkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLmJsb2Nrc01vdmVtZW50ID0gYmxvY2tzTW92ZW1lbnQ7XG4gICAgICAgIHRoaXMuY2hhciA9IGNoYXI7XG4gICAgICAgIHRoaXMuZmcgPSAoMCwgY29sb3JfMS50b1JHQikoZmcpO1xuICAgICAgICB0aGlzLmJnID0gKDAsIGNvbG9yXzEudG9SR0IpKGJnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJPcmRlciA9IHJlbmRlck9yZGVyO1xuICAgICAgICAoMCwgZXJyb3JfMS5hc3NlcnQpKHRoaXMuY2hhci5sZW5ndGggPT09IDEpO1xuICAgIH1cbiAgICAvLyA9PiBFbnRpdHlcbiAgICBzcGF3bih4LCB5LCBtYXApIHtcbiAgICAgICAgbGV0IGNsb25lID0gbmV3IEVudGl0eSh4LCB5LCB0aGlzLmJsb2Nrc01vdmVtZW50LCB0aGlzLmNoYXIsIHVuZGVmaW5lZCwgLy8gZmcgc2V0IGFmdGVyIHRoZSBmYWN0XG4gICAgICAgIHVuZGVmaW5lZCwgLy8gYmcgc2V0IGFmdGVyIHRoZSBmYWN0XG4gICAgICAgIHRoaXMucmVuZGVyT3JkZXIpO1xuICAgICAgICBjbG9uZS5mZyA9IHRoaXMuZmc7XG4gICAgICAgIGNsb25lLmJnID0gdGhpcy5iZztcbiAgICAgICAgbWFwLmFkZEVudGl0eShjbG9uZSk7XG4gICAgICAgIHJldHVybiBjbG9uZTtcbiAgICB9XG4gICAgbW92ZShkeCwgZHkpIHtcbiAgICAgICAgdGhpcy54ICs9IGR4O1xuICAgICAgICB0aGlzLnkgKz0gZHk7XG4gICAgfVxuICAgIHJlbmRlcihkaXNwbGF5KSB7XG4gICAgICAgIGRpc3BsYXkuZHJhdyh0aGlzLngsIHRoaXMueSwgdGhpcy5jaGFyLCB0aGlzLmZnLCB0aGlzLmJnKTtcbiAgICB9XG59XG5leHBvcnRzLkVudGl0eSA9IEVudGl0eTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5HYW1lID0gdm9pZCAwO1xuY29uc3Qgcm90X2pzXzEgPSByZXF1aXJlKFwicm90LWpzXCIpO1xuY29uc3QgZ2FtZU1hcF8xID0gcmVxdWlyZShcIi4vZ2FtZU1hcFwiKTtcbmNvbnN0IGlucHV0TWFuYWdlcl8xID0gcmVxdWlyZShcIi4vaW5wdXRNYW5hZ2VyXCIpO1xuY29uc3QgYWN0b3JGYWN0b3J5XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL2VudGl0eS9hY3RvckZhY3RvcnlcIikpO1xuY29uc3QgdWlGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi4vdWkvdWlGYWN0b3J5XCIpO1xuY29uc3Qgcm9vbUdlbmVyYXRvcl8xID0gcmVxdWlyZShcIi4uL2dlbmVyYXRpb24vcm9vbUdlbmVyYXRvclwiKTtcbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHsgd2lkdGg6IDgwLCBoZWlnaHQ6IDQwIH07XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IG5ldyByb3RfanNfMS5EaXNwbGF5KHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmNvbmZpZy53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5jb25maWcuaGVpZ2h0LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgZ2FtZU1hcF8xLkdhbWVNYXAodGhpcy5jb25maWcud2lkdGgsIHRoaXMuY29uZmlnLmhlaWdodCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5kaXNwbGF5LmdldENvbnRhaW5lcigpKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBhY3RvckZhY3RvcnlfMS5kZWZhdWx0LnBsYXllci5zcGF3bigwLCAwLCB0aGlzLm1hcCk7XG4gICAgICAgIHRoaXMuZGVsdGEgPSAwO1xuICAgIH1cbiAgICBnZW5lcmF0ZU1hcCgpIHtcbiAgICAgICAgbGV0IHRlbXAgPSBuZXcgcm9vbUdlbmVyYXRvcl8xLlJvb21HZW5lcmF0b3IodGhpcy5jb25maWcud2lkdGgsIHRoaXMuY29uZmlnLmhlaWdodCk7XG4gICAgICAgIGxldCByZXMgPSB0ZW1wLmdlbmVyYXRlKCk7XG4gICAgICAgIHRoaXMubWFwID0gcmVzWzBdO1xuICAgICAgICB0aGlzLnBsYXllci54ID0gcmVzWzFdO1xuICAgICAgICB0aGlzLnBsYXllci55ID0gcmVzWzJdO1xuICAgICAgICB0aGlzLm1hcC5hZGRBY3Rvcih0aGlzLnBsYXllcik7XG4gICAgICAgIC8vIGxldCBkaWdnZXIgPSBuZXcgTWFwLkRpZ2dlcih0aGlzLmNvbmZpZy53aWR0aCwgdGhpcy5jb25maWcuaGVpZ2h0KTtcbiAgICAgICAgLy8gbGV0IGZyZWVDZWxsczogW251bWJlciwgbnVtYmVyXVtdID0gbmV3IEFycmF5KCk7XG4gICAgICAgIC8vIGxldCBjYWxsYmFjayA9ICh4OiBudW1iZXIsIHk6IG51bWJlciwgdmFsdWU6IG51bWJlcikgPT4ge1xuICAgICAgICAvLyAgIGlmICh2YWx1ZSkgcmV0dXJuOyAvLyBkbyBub3Qgc3RvcmUgd2FsbHNcbiAgICAgICAgLy8gICBmcmVlQ2VsbHMucHVzaChbeCwgeV0pO1xuICAgICAgICAvLyAgIHRoaXMubWFwLnNldFRpbGUoeCwgeSwgdGlsZUZhY3RvcnkuZmxvb3IpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGRpZ2dlci5jcmVhdGUoY2FsbGJhY2spO1xuICAgICAgICAvLyBsZXQgW3gseV0gPSBmcmVlQ2VsbHNbMF07XG4gICAgICAgIC8vIHRoaXMucGxheWVyLnggPSB4O1xuICAgICAgICAvLyB0aGlzLnBsYXllci55ID0geTtcbiAgICAgICAgLy8gY29uc29sZS53YXJuKCdib3hlcyBub3QgcGxhY2VkIHlldCEnKTtcbiAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgKytpKSB7XG4gICAgICAgIC8vICAgY29uc3QgaW5kZXggPSBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiBmcmVlQ2VsbHMubGVuZ3RoKTtcbiAgICAgICAgLy8gICBjb25zdCBrZXkgPSBmcmVlQ2VsbHMuc3BsaWNlKGluZGV4LCAxKVswXTsgLy8gZ2V0IGtleSBhbmQgcmVtb3ZlIGl0IFxuICAgICAgICAvLyAgIHRoaXMubWFwW2tleV0gPSBcIipcIjtcbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICBzZXRVSVNpemUoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgY2FudmFzID0gKF9hID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRDb250ZXh0KCcyZCcpLmNhbnZhcztcbiAgICAgICAgY29uc3QgbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2VzJyk7XG4gICAgICAgIGxvZy5zdHlsZS5sZWZ0ID0gYCR7Y2FudmFzLm9mZnNldExlZnR9cHhgO1xuICAgICAgICBsb2cuc3R5bGUud2lkdGggPSBgJHtjYW52YXMud2lkdGh9cHhgO1xuICAgIH1cbiAgICByZW5kZXIobWVudSwgY29tcHV0ZUZPVikge1xuICAgICAgICB0aGlzLmRpc3BsYXkuY2xlYXIoKTtcbiAgICAgICAgaWYgKGNvbXB1dGVGT1YpIHtcbiAgICAgICAgICAgIHRoaXMubWFwLmNvbXB1dGVGT1YodGhpcy5wbGF5ZXIueCwgdGhpcy5wbGF5ZXIueSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXAucmVuZGVyKHRoaXMuZGlzcGxheSk7XG4gICAgICAgIGlmIChtZW51ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBtZW51LnJlbmRlcih0aGlzLmRpc3BsYXkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICAvLyBHVUkgc2V0IHVwIGZvciB0aGUgYnJvd3NlclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpLmFwcGVuZENoaWxkKHRoaXMuZGlzcGxheS5nZXRDb250YWluZXIoKSk7XG4gICAgICAgIHRoaXMuc2V0VUlTaXplKCk7XG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuc2V0VUlTaXplKTtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBnYW1lIGVuZ2luZSBkZXRhaWxzXG4gICAgICAgIGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pbml0KCk7XG4gICAgICAgIGxldCBvbGRUaW1lU3RhbXA7XG4gICAgICAgIGxldCBmcHM7XG4gICAgICAgIGxldCB0dXJuTnVtYmVyID0gMTtcbiAgICAgICAgLy8gd2Ugc3RhcnQgYXQgdGhlIG1haW4gbWVudVxuICAgICAgICBsZXQgbWVudSA9ICgwLCB1aUZhY3RvcnlfMS5tYWluTWVudSkodGhpcy5jb25maWcud2lkdGgsIHRoaXMuY29uZmlnLmhlaWdodCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZU1hcCgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIobnVsbCwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyB0aGUgbG9vcCBpcyBhIGNhbGxiYWNrIGhhbmRsZWQgYnkgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICBjb25zdCBnYW1lTG9vcCA9ICh0aW1lU3RhbXApID0+IHtcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgbnVtYmVyIG9mIHNlY29uZHMgcGFzc2VkIHNpbmNlIHRoZSBsYXN0IGZyYW1lXG4gICAgICAgICAgICB0aGlzLmRlbHRhID0gKHRpbWVTdGFtcCAtIG9sZFRpbWVTdGFtcCkgLyAxMDAwO1xuICAgICAgICAgICAgb2xkVGltZVN0YW1wID0gdGltZVN0YW1wO1xuICAgICAgICAgICAgZnBzID0gTWF0aC5yb3VuZCgxIC8gdGhpcy5kZWx0YSk7XG4gICAgICAgICAgICBpZiAobWVudSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgbWVudSB0aGVuIGl0IGhhbmRsZXMgaW5wdXRcbiAgICAgICAgICAgICAgICBtZW51LnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChtZW51LnNob3VsZEV4aXQpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVudSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKG1lbnUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWVudS5zaG91bGRSZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIobWVudSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LkgpKSB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBoZWxwIG1lbnVcbiAgICAgICAgICAgICAgICBtZW51ID0gKDAsIHVpRmFjdG9yeV8xLmhlbHBNZW51KSh0aGlzLmNvbmZpZy53aWR0aCwgdGhpcy5jb25maWcuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR1cm5OdW1iZXIgJSAzID09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBBSSB0dXJuXG4gICAgICAgICAgICAgICAgdHVybk51bWJlciA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBwbGF5ZXIgdHVyblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvc3QgPSB0aGlzLnBsYXllci5hY3QodGhpcy5tYXApO1xuICAgICAgICAgICAgICAgIGlmIChjb3N0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIobWVudSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG4gICAgICAgIH07XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuICAgIH1cbn1cbmV4cG9ydHMuR2FtZSA9IEdhbWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuR2FtZU1hcCA9IHZvaWQgMDtcbmNvbnN0IHRpbGVGYWN0b3J5XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL3RpbGUvdGlsZUZhY3RvcnlcIikpO1xuY29uc3QgZXJyb3JfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXR5L2Vycm9yXCIpO1xuY29uc3QgcHJlY2lzZV9zaGFkb3djYXN0aW5nXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJvdC1qcy9saWIvZm92L3ByZWNpc2Utc2hhZG93Y2FzdGluZ1wiKSk7XG5jbGFzcyBHYW1lTWFwIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMudGlsZXMgPSBBcnJheSh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQgKyB0aGlzLndpZHRoKS5maWxsKHRpbGVGYWN0b3J5XzEuZGVmYXVsdC53YWxsKTtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gQXJyYXkodGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0ICsgdGhpcy53aWR0aCkuZmlsbChmYWxzZSk7XG4gICAgICAgIHRoaXMuZXhwbG9yZWQgPSBBcnJheSh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQgKyB0aGlzLndpZHRoKS5maWxsKHRydWUpO1xuICAgICAgICB0aGlzLmVudGl0aWVzID0gW107XG4gICAgICAgIHRoaXMuYWN0b3JzID0gW107XG4gICAgfVxuICAgIGluZGV4KHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHkgKiB0aGlzLndpZHRoICsgeDtcbiAgICB9XG4gICAgaW5Cb3VuZHMoeCwgeSkge1xuICAgICAgICByZXR1cm4geSAqIHRoaXMud2lkdGggKyB4IDwgdGhpcy50aWxlcy5sZW5ndGg7XG4gICAgfVxuICAgIGlzV2Fsa2FibGUoeCwgeSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5kZXgoeCwgeSk7XG4gICAgICAgIGlmIChpbmRleCA+PSB0aGlzLnRpbGVzLmxlbmd0aCB8fCBpbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50aWxlc1tpbmRleF0ud2Fsa2FibGU7XG4gICAgfVxuICAgIHNldFRpbGUoeCwgeSwgdGlsZSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5kZXgoeCwgeSk7XG4gICAgICAgICgwLCBlcnJvcl8xLmFzc2VydCkoaW5kZXggPCB0aGlzLnRpbGVzLmxlbmd0aCk7XG4gICAgICAgIHRoaXMudGlsZXNbaW5kZXhdID0gdGlsZTtcbiAgICB9XG4gICAgcmVuZGVyKGRpc3BsYXkpIHtcbiAgICAgICAgbGV0IHk7XG4gICAgICAgIGxldCB4O1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAvLyByZW5kZXIgdGhlIG1hcFxuICAgICAgICBmb3IgKHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7ICsreSkge1xuICAgICAgICAgICAgZm9yICh4ID0gMDsgeCA8IHRoaXMud2lkdGg7ICsreCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbGUgPSB0aGlzLnRpbGVzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlW2luZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5LmRyYXcoeCwgeSwgdGlsZS5jaGFyLCB0aWxlLmluVmlld0ZHLCB0aWxlLmluVmlld0JHKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5leHBsb3JlZFtpbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheS5kcmF3KHgsIHksIHRpbGUuY2hhciwgdGlsZS5vdXRPZlZpZXdGRywgdGlsZS5vdXRPZlZpZXdCRyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGVsc2UgZHJhdyBub3RoaW5nXG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyByZW5kZXIgZW50aXRpZXNcbiAgICAgICAgdGhpcy5lbnRpdGllcy5zb3J0KChhLCBiKSA9PiB7IHJldHVybiBhLnJlbmRlck9yZGVyLnZhbHVlT2YoKSAtIGIucmVuZGVyT3JkZXIudmFsdWVPZigpOyB9KTtcbiAgICAgICAgZm9yIChsZXQgZSBvZiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICBlLnJlbmRlcihkaXNwbGF5KTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZW5kZXIgYWN0b3JzXG4gICAgICAgIHRoaXMuZW50aXRpZXMuc29ydCgoYSwgYikgPT4geyByZXR1cm4gYS5yZW5kZXJPcmRlci52YWx1ZU9mKCkgLSBiLnJlbmRlck9yZGVyLnZhbHVlT2YoKTsgfSk7XG4gICAgICAgIGZvciAobGV0IGEgb2YgdGhpcy5hY3RvcnMpIHtcbiAgICAgICAgICAgIGEucmVuZGVyKGRpc3BsYXkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFkZEVudGl0eShlbnRpdHkpIHtcbiAgICAgICAgKDAsIGVycm9yXzEuYXNzZXJ0KSh0aGlzLmVudGl0eUF0TG9jYXRpb24oZW50aXR5LngsIGVudGl0eS55KSA9PSBudWxsKTtcbiAgICAgICAgKDAsIGVycm9yXzEuYXNzZXJ0KSh0aGlzLmFjdG9yQXRMb2NhdGlvbihlbnRpdHkueCwgZW50aXR5LnkpID09IG51bGwpO1xuICAgICAgICB0aGlzLmVudGl0aWVzLnB1c2goZW50aXR5KTtcbiAgICB9XG4gICAgZW50aXR5QXRMb2NhdGlvbih4LCB5KSB7XG4gICAgICAgIGZvciAodmFyIGVudGl0eSBvZiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICBpZiAoZW50aXR5LnggPT0geCAmJiBlbnRpdHkueSA9PSB5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudGl0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgYWRkQWN0b3IoYWN0b3IpIHtcbiAgICAgICAgKDAsIGVycm9yXzEuYXNzZXJ0KSh0aGlzLmVudGl0eUF0TG9jYXRpb24oYWN0b3IueCwgYWN0b3IueSkgPT0gbnVsbCk7XG4gICAgICAgICgwLCBlcnJvcl8xLmFzc2VydCkodGhpcy5hY3RvckF0TG9jYXRpb24oYWN0b3IueCwgYWN0b3IueSkgPT0gbnVsbCk7XG4gICAgICAgIHRoaXMuYWN0b3JzLnB1c2goYWN0b3IpO1xuICAgIH1cbiAgICBhY3RvckF0TG9jYXRpb24oeCwgeSkge1xuICAgICAgICBmb3IgKHZhciBhY3RvciBvZiB0aGlzLmFjdG9ycykge1xuICAgICAgICAgICAgaWYgKGFjdG9yLnggPT0geCAmJiBhY3Rvci55ID09IHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGxvY2F0aW9uT2NjdXBpZWQoeCwgeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHlBdExvY2F0aW9uKHgsIHkpICE9IG51bGwgfHwgdGhpcy5hY3RvckF0TG9jYXRpb24oeCwgeSkgIT0gbnVsbDtcbiAgICB9XG4gICAgY29tcHV0ZUZPVih4LCB5KSB7XG4gICAgICAgIGNvbnN0IFNJR0hUX1JBRElVUyA9IDEwO1xuICAgICAgICBjb25zdCBmb3YgPSBuZXcgcHJlY2lzZV9zaGFkb3djYXN0aW5nXzEuZGVmYXVsdCgoeCwgeSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4KHgsIHkpO1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgdGhpcy50aWxlcy5sZW5ndGggJiYgaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRpbGVzW2luZGV4XS53YWxrYWJsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmlzaWJsZS5maWxsKGZhbHNlKTtcbiAgICAgICAgZm92LmNvbXB1dGUoeCwgeSwgU0lHSFRfUkFESVVTLCAoeCwgeSwgciwgdmlzaWJpbGl0eSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4KHgsIHkpO1xuICAgICAgICAgICAgaWYgKHZpc2liaWxpdHkgPiAwLjApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGxvcmVkW2luZGV4XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlW2luZGV4XSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2libGVbaW5kZXhdID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuR2FtZU1hcCA9IEdhbWVNYXA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSW5wdXRNYW5hZ2VyID0gZXhwb3J0cy5LZXkgPSB2b2lkIDA7XG52YXIgS2V5O1xuKGZ1bmN0aW9uIChLZXkpIHtcbiAgICBLZXlbS2V5W1wiTEVGVFwiXSA9IDBdID0gXCJMRUZUXCI7XG4gICAgS2V5W0tleVtcIlJJR0hUXCJdID0gMV0gPSBcIlJJR0hUXCI7XG4gICAgS2V5W0tleVtcIkRPV05cIl0gPSAyXSA9IFwiRE9XTlwiO1xuICAgIEtleVtLZXlbXCJVUFwiXSA9IDNdID0gXCJVUFwiO1xuICAgIEtleVtLZXlbXCJXXCJdID0gNF0gPSBcIldcIjtcbiAgICBLZXlbS2V5W1wiQVwiXSA9IDVdID0gXCJBXCI7XG4gICAgS2V5W0tleVtcIlNcIl0gPSA2XSA9IFwiU1wiO1xuICAgIEtleVtLZXlbXCJEXCJdID0gN10gPSBcIkRcIjtcbiAgICBLZXlbS2V5W1wiUVwiXSA9IDhdID0gXCJRXCI7XG4gICAgS2V5W0tleVtcIlJcIl0gPSA5XSA9IFwiUlwiO1xuICAgIEtleVtLZXlbXCJIXCJdID0gMTBdID0gXCJIXCI7XG4gICAgS2V5W0tleVtcIlNQQUNFXCJdID0gMTFdID0gXCJTUEFDRVwiO1xuICAgIEtleVtLZXlbXCJFU0NBUEVcIl0gPSAxMl0gPSBcIkVTQ0FQRVwiO1xuICAgIEtleVtLZXlbXCJFTlRFUlwiXSA9IDEzXSA9IFwiRU5URVJcIjtcbiAgICBLZXlbS2V5W1wiSU5WQUxJRFwiXSA9IDE0XSA9IFwiSU5WQUxJRFwiO1xufSkoS2V5ID0gZXhwb3J0cy5LZXkgfHwgKGV4cG9ydHMuS2V5ID0ge30pKTtcbi8vIHN0YXRpYyBjbGFzcyB0byBoYW5kbGUgaW5wdXRcbmNsYXNzIElucHV0TWFuYWdlciB7XG4gICAgc3RhdGljIGluaXQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXMoS2V5KS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgSW5wdXRNYW5hZ2VyLl9rZXlzLnB1c2goZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBJbnB1dE1hbmFnZXIub25LZXlEb3duKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBJbnB1dE1hbmFnZXIub25LZXlVcCk7XG4gICAgfVxuICAgIHN0YXRpYyBpc0tleURvd24oLi4ua2V5cykge1xuICAgICAgICBmb3IgKGxldCBrIG9mIGtleXMpIHtcbiAgICAgICAgICAgIGlmIChJbnB1dE1hbmFnZXIuX2tleXNba10pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHN0YXRpYyBrZXlTdHJUb0tleShrZXkpIHtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Rvd24nOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LkRPV047XG4gICAgICAgICAgICBjYXNlICdVcCc6XG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LlVQO1xuICAgICAgICAgICAgY2FzZSAnUmlnaHQnOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5SSUdIVDtcbiAgICAgICAgICAgIGNhc2UgJ0xlZnQnOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LkxFRlQ7XG4gICAgICAgICAgICBjYXNlICcgJzpcbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LlNQQUNFO1xuICAgICAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LkVTQ0FQRTtcbiAgICAgICAgICAgIGNhc2UgJ2EnOlxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuQTtcbiAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuUztcbiAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuRDtcbiAgICAgICAgICAgIGNhc2UgJ3cnOlxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuVztcbiAgICAgICAgICAgIGNhc2UgJ3InOlxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuUjtcbiAgICAgICAgICAgIGNhc2UgJ3EnOlxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuUTtcbiAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuSDtcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LkVOVEVSO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFVuaGFuZGxlZCBrZXk6ICR7a2V5fS5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LklOVkFMSUQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICBjb25zdCBrID0gSW5wdXRNYW5hZ2VyLmtleVN0clRvS2V5KGV2ZW50LmtleSk7XG4gICAgICAgIElucHV0TWFuYWdlci5fa2V5c1trXSA9IHRydWU7XG4gICAgICAgIGlmIChrID09IEtleS5ET1dOIHx8IGsgPT0gS2V5LlVQIHx8IGsgPT0gS2V5LkxFRlQgfHwgayA9PSBLZXkuUklHSFQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzdGF0aWMgb25LZXlVcChldmVudCkge1xuICAgICAgICBJbnB1dE1hbmFnZXIuX2tleXNbSW5wdXRNYW5hZ2VyLmtleVN0clRvS2V5KGV2ZW50LmtleSldID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc3RhdGljIGNsZWFyKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IElucHV0TWFuYWdlci5fa2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgSW5wdXRNYW5hZ2VyLl9rZXlzW2ldID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLklucHV0TWFuYWdlciA9IElucHV0TWFuYWdlcjtcbklucHV0TWFuYWdlci5fa2V5cyA9IFtdO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJhc2VMaW5lR2VuZXJhdG9yID0gdm9pZCAwO1xuY2xhc3MgQmFzZUxpbmVHZW5lcmF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB9XG59XG5leHBvcnRzLkJhc2VMaW5lR2VuZXJhdG9yID0gQmFzZUxpbmVHZW5lcmF0b3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc3RyYWlnaHRMaW5lQ29ubmVjdGlvbiA9IGV4cG9ydHMuYnJlc2VuaGFtID0gdm9pZCAwO1xuY29uc3Qgcm90X2pzXzEgPSByZXF1aXJlKFwicm90LWpzXCIpO1xuLy8gQmFzZWQgb246IGh0dHA6Ly93d3cucm9ndWViYXNpbi5jb20vaW5kZXgucGhwL0JyZXNlbmhhbSUyN3NfTGluZV9BbGdvcml0aG1cbmZ1bmN0aW9uIGJyZXNlbmhhbSh4MSwgeTEsIHgyLCB5MiwgY2FsbGJhY2spIHtcbiAgICBsZXQgdGVtcDtcbiAgICBsZXQgZHggPSB4MiAtIHgxO1xuICAgIGxldCBkeSA9IHkyIC0geTE7XG4gICAgLy8gcm90YXRlIGlmIHRoZSBsaW5lIGlzIG1vcmUgeSB0aGFuIHggKHN0ZWVwKVxuICAgIGNvbnN0IGlzU3RlZXAgPSBNYXRoLmFicyhkeSkgPiBNYXRoLmFicyhkeCk7XG4gICAgaWYgKGlzU3RlZXApIHtcbiAgICAgICAgdGVtcCA9IHgxO1xuICAgICAgICB4MSA9IHkxO1xuICAgICAgICB5MSA9IHRlbXA7XG4gICAgICAgIHRlbXAgPSB4MjtcbiAgICAgICAgeDIgPSB5MjtcbiAgICAgICAgeTIgPSB0ZW1wO1xuICAgIH1cbiAgICAvLyByZWFycmFuZ2Ugc28geDEgPCB4MiBieSBzd2FwcGluZyBwb2ludHNcbiAgICBsZXQgc3dhcHBlZCA9IHgxID4geDI7XG4gICAgaWYgKHN3YXBwZWQpIHtcbiAgICAgICAgdGVtcCA9IHgxO1xuICAgICAgICB4MSA9IHgyO1xuICAgICAgICB4MiA9IHRlbXA7XG4gICAgICAgIHRlbXAgPSB5MTtcbiAgICAgICAgeTEgPSB5MjtcbiAgICAgICAgeTIgPSB0ZW1wO1xuICAgIH1cbiAgICAvLyByZWNhbGN1bGF0ZSB0aGUgZGlmZmVyZW5jZXNcbiAgICBkeSA9IHkyIC0geTE7XG4gICAgZHggPSB4MiAtIHgxO1xuICAgIC8vIGNhbGN1bGF0ZSB0aGUgZXJyb3JcbiAgICBsZXQgZXJyb3IgPSBNYXRoLnJvdW5kKGR4IC8gMi4wKTtcbiAgICBjb25zdCB5U3RlcCA9IHkxIDwgeTIgPyAxIDogLTE7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGJvdW5kaW5nIGJveCBnZW5lcmF0aW5nIHBvaW50cyBiZXR3ZWVuIHN0YXJ0IGFuZCBlbmRcbiAgICAvLyBhbmQgdXNlIGNhbGxiYWNrIHRvIHBhc3MgdGhlIGxpbmUuIE5PVEU6IHRoaXMgZG9lc24ndCB3b3JrIGNvcnJlY3RseVxuICAgIC8vIGlmIHRoZSBvcmRlciBtYXR0ZXJzIGJlY2F1c2UgYHN3YXBwZWRgIGluZGljYXRlcyB0aGF0IHRoZSBvcmRlciBcbiAgICAvLyBzaG91bGQgYmUgcmV2ZXJzZWQgZm9yIHRoZSBjb3JyZWN0IG9yZGVyaW5nIGJldHdlZW4gdGhlIHBvaW50cy5cbiAgICBsZXQgeSA9IHkxO1xuICAgIGZvciAobGV0IHggPSB4MTsgeCA8IHgyOyArK3gpIHtcbiAgICAgICAgaWYgKGlzU3RlZXApIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHksIHgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3IgLT0gTWF0aC5hYnMoZHkpO1xuICAgICAgICBpZiAoZXJyb3IgPCAwKSB7XG4gICAgICAgICAgICB5ICs9IHlTdGVwO1xuICAgICAgICAgICAgZXJyb3IgKz0gZHg7XG4gICAgICAgICAgICBpZiAoaXNTdGVlcCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHksIHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soeCwgeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmJyZXNlbmhhbSA9IGJyZXNlbmhhbTtcbmZ1bmN0aW9uIHN0cmFpZ2h0TGluZUNvbm5lY3Rpb24oeDEsIHkxLCB4MiwgeTIsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHJvdF9qc18xLlJORy5nZXRVbmlmb3JtKCkgPj0gMC41KSB7XG4gICAgICAgIGNvbnN0IHhJbmNyZW1lbnQgPSB4MSA8IHgyID8gMSA6IC0xO1xuICAgICAgICB3aGlsZSAoeDEgIT0geDIpIHtcbiAgICAgICAgICAgIHgxICs9IHhJbmNyZW1lbnQ7XG4gICAgICAgICAgICBjYWxsYmFjayh4MSwgeTEpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHlJbmNyZW1lbnQgPSB5MSA8IHkyID8gMSA6IC0xO1xuICAgICAgICB3aGlsZSAoeTEgIT0geTIpIHtcbiAgICAgICAgICAgIHkxICs9IHlJbmNyZW1lbnQ7XG4gICAgICAgICAgICBjYWxsYmFjayh4MSwgeTEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCB5SW5jcmVtZW50ID0geTEgPCB5MiA/IDEgOiAtMTtcbiAgICAgICAgd2hpbGUgKHkxICE9IHkyKSB7XG4gICAgICAgICAgICB5MSArPSB5SW5jcmVtZW50O1xuICAgICAgICAgICAgY2FsbGJhY2soeDEsIHkxKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB4SW5jcmVtZW50ID0geDEgPCB4MiA/IDEgOiAtMTtcbiAgICAgICAgd2hpbGUgKHgxICE9IHgyKSB7XG4gICAgICAgICAgICB4MSArPSB4SW5jcmVtZW50O1xuICAgICAgICAgICAgY2FsbGJhY2soeDEsIHkxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuc3RyYWlnaHRMaW5lQ29ubmVjdGlvbiA9IHN0cmFpZ2h0TGluZUNvbm5lY3Rpb247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTEVWRUxTID0gdm9pZCAwO1xuZXhwb3J0cy5MRVZFTFMgPSB7IFwiOF8wXzBcIjogW1wiLS0tLS0tLS0tXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS1eLS0tXCIsIFwiLS0tLS0tLS0tLS1eLS0tXCIsIFwiLS0tLS0tLS0tLS1eLS0tXCIsIFwiLS0tLS0tLS0tLS1eLS1eXCIsIFwiLS0tIy0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0mLS1eXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tKi0tLS0tLS0tXCIsIFwiKi0tLS0tLS0tXl5eXl5eXCJdLCBcIjhfMF8xXCI6IFtcIi0tLS0tLS0tLV5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tXi0tLVwiLCBcIi0tLS0tLS0tLS0tXi0tLVwiLCBcIi0tLS0tLS0tLS0tXi0tLVwiLCBcIi0tLS0tLS0tLS0tXi0tXlwiLCBcIi0tLSMtLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tJi0tXlwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS0tLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSotLS0tLS0tLVwiLCBcIiotLS0tLS0tLV5eXl5eXlwiXSwgXCI4XzFfMFwiOiBbXCItLS0tLS0tLS0tXl5eXl5cIiwgXCItLS0tLS0tLS0tLS1YLS1cIiwgXCItLS0tLS0tLS0tLS1YLS1cIiwgXCItLS0tLS0tLS0tLS1YLS1cIiwgXCItLS0tLS0tLS0tLS1YLS1cIiwgXCItLS0jLS0tLS0tLS1YLSNcIiwgXCItLS0tLS0tLS0tLS1YLS1cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS1YLS1cIiwgXCJcXFxcLy8tLS0tLS0tLS1YLS1cIiwgXCItLS0tLS0qLS0tLS0tLS1cIiwgXCIqLS0tLS0tLS0tXl5eXl5cIl0sIFwiOF8xXzFcIjogW1wiLS0tLS0tLS0tLV5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tWC0tXCIsIFwiLS0tLS0tLS0tLS0tWC0tXCIsIFwiLS0tLS0tLS0tLS0tWC0tXCIsIFwiLS0tLS0tLS0tLS0tWC0tXCIsIFwiLS0tIy0tLS0tLS0tWC0jXCIsIFwiLS0tLS0tLS0tLS0tWC0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tWC0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tWC0tXCIsIFwiLS0tLS0tKi0tLS0tLS0tXCIsIFwiKi0tLS0tLS0tLV5eXl5eXCJdLCBcIjhfMV8yXCI6IFtcIi0tLS0tXl5eXl5eXl5eXlwiLCBcIi0tLS0tXl5eLS0tLS1eLVwiLCBcIi0tLS0tLS0tLS0tLS1eLVwiLCBcIlgtLS0tXl5eLS0tLS1eLVwiLCBcIlgtLS0tXl5eLS0tLS1eLVwiLCBcIlgtLS0tXl5eLS0tLS0tLVwiLCBcIlgtLS0tXl5eLS0tLS0mLVwiLCBcIlgtLS0tXl5eLS0tLS0tLVwiLCBcIlgtLS0tLS0tLS0tLS0tLVwiLCBcIlgtLS0tXl5eLS1YLS0tLVwiLCBcIlgtLS0tXl5eXl5eXl5eXlwiXSwgXCI5XzBfMFwiOiBbXCItLS0tLS0tXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tLS0tKi1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS1eXl5cIiwgXCItLS0tLS0tLS0tXl5eXl5cIiwgXCItLS0jLS0tLS0tLS0tJi1cIiwgXCItLS0tLS0tLS0tXl5eXl5cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS1eXl5cIiwgXCJcXFxcLy8tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tKi1cIiwgXCIqLS0tLS0tXl5eXl5eXl5cIl0sIFwiOV8wXzFcIjogW1wiLS0tLS0tLV5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLSotXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tXl5eXCIsIFwiLS0tLS0tLS0tLV5eXl5eXCIsIFwiLS0tIy0tLS0tLS0tLSYtXCIsIFwiLS0tLS0tLS0tLV5eXl5eXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tXl5eXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLSotXCIsIFwiKi0tLS0tLV5eXl5eXl5eXCJdLCBcIjlfMF8yXCI6IFtcIl5eXl5eXl4tXi1eLV4tLVwiLCBcIi1YLS1eLS0tXi1eLV4tLVwiLCBcIi1YLS1eLS0tLS1eLV4tLVwiLCBcIi1YLS1eLS0tLS0tLV4tLVwiLCBcIi1YLS1eLS0tLS0tLS0tLVwiLCBcIi1YLS0tLS0tLS0tLS0tLVwiLCBcIi1YLS0mLS0tLS0tLS0tLVwiLCBcIi1YLS0tLS0tLS0tLV4tLVwiLCBcIi1YLS0tLS0tLS1eLV4tLVwiLCBcIi0jLS0tLS0tXi1eLV4tLVwiLCBcIl5eXl5eXl4tXi1eLV4tLVwiXSwgXCI3XzBfMFwiOiBbXCItLS0tLS0tLS0tXl5eXl5cIiwgXCItLS0tLS0tLS0tLS1eLS1cIiwgXCItLS0tLS0tLS0tLS1eLS1cIiwgXCItLS0tLS0tLS0tLS1eLS1cIiwgXCItLS0tLS0tLS0tLS1eLS1cIiwgXCItLS0jLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0mLS1cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tLS1cIiwgXCJcXFxcLy8tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0qLS0tLS0tLS1cIiwgXCIqLS0tLS0tLS0tXl5eXl5cIl0sIFwiN18wXzFcIjogW1wiLS0tLS0tLS0tLV5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tXi0tXCIsIFwiLS0tLS0tLS0tLS0tXi0tXCIsIFwiLS0tLS0tLS0tLS0tXi0tXCIsIFwiLS0tLS0tLS0tLS0tXi0tXCIsIFwiLS0tIy0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tJi0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tKi0tLS0tLS0tXCIsIFwiKi0tLS0tLS0tLV5eXl5eXCJdLCBcIjdfMF8yXCI6IFtcIlgtLS1eXl4tLV5eXi0tLVwiLCBcIi0tLS1eXl4tLV5eXi0tLVwiLCBcIlgtLS1eXl4tLV5eXi0tLVwiLCBcIlgtLS1eXl4tLV5eXi0tLVwiLCBcIlgtLS0tJi0tLS0mLS0tLVwiLCBcIiotLS1eXl4tLS0tLS0tLVwiLCBcIlgtLS0tKi0tLV5eXi0tLVwiLCBcIlgtLS1eXl4tLV5eXi0tLVwiLCBcIlgtLS1eXl4tLV5eXi0tLVwiLCBcIi0tLS1eXl4tLV5eXi0tLVwiLCBcIlgtLS1eXl4tLV5eXi0tLVwiXSwgXCIwXzBfMFwiOiBbXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJcXFxcXFxcXC0tLS0tLS0tLS0tLS1cIiwgXCIvLy0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tIy0tJi0tJi0tJi1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCImLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIl0sIFwiMF8wXzFcIjogW1wiLS0tLS0tLS0tLS0tLS0tXCIsIFwiXFxcXFxcXFwtLS0tLS0tLS0tLS0tXCIsIFwiLy8tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLSMtLSYtLSYtLSYtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiJi0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCJdLCBcIjBfMF8yXCI6IFtcIlgtLS0tLS0tLS0tLS0tLVwiLCBcIlgtLS0tLS0tLS0tLS0tLVwiLCBcIlgtLS0tLS0tLS0tLS0tLVwiLCBcIlgtLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tJi0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlgtLS0tLS0tLS0tLS0tLVwiLCBcIlgtLS0tLS0tLS0tLS0tLVwiLCBcIlgtLS0tLSotLS0tLS0tLVwiLCBcIlgtLS0tLS0tLS0tLS0tLVwiXSwgXCIwXzFfMFwiOiBbXCItLS0tLS0tLS0tWC0tLS1cIiwgXCJcXFxcXFxcXC0tLS0tLS0tWC0tLS1cIiwgXCIvLy0tLS0tLS0tWC0tLS1cIiwgXCItLS0tLS0tLS0tWC0tLS1cIiwgXCItLS0tLS0tLS0tWC0tLS1cIiwgXCItLS0tIy0tJi0tWC0tJi1cIiwgXCItLS0tLS0tLS0tWC0tLS1cIiwgXCItLS0tLS0tLS0tWC0tLS1cIiwgXCImLS0tLS0tLS0tWC0tLS1cIiwgXCItLS0tLS0tLS0tWC0tLS1cIiwgXCItLS0tLS0tLS0tJi0tLS1cIl0sIFwiMF8xXzFcIjogW1wiLS0tLS0tLS0tLVgtLS0tXCIsIFwiXFxcXFxcXFwtLS0tLS0tLVgtLS0tXCIsIFwiLy8tLS0tLS0tLVgtLS0tXCIsIFwiLS0tLS0tLS0tLVgtLS0tXCIsIFwiLS0tLS0tLS0tLVgtLS0tXCIsIFwiLS0tLSMtLSYtLVgtLSYtXCIsIFwiLS0tLS0tLS0tLVgtLS0tXCIsIFwiLS0tLS0tLS0tLVgtLS0tXCIsIFwiJi0tLS0tLS0tLVgtLS0tXCIsIFwiLS0tLS0tLS0tLVgtLS0tXCIsIFwiLS0tLS0tLS0tLSYtLS0tXCJdLCBcIjBfMV8yXCI6IFtcIlhYWC0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlgtLS0tLS0tLS0tLS0tLVwiLCBcIlgtLS0tLS0tLS0tLS0tLVwiLCBcIlgtLS0tLS0tLS0tJi0tLVwiLCBcIlgtLS0tLS0tLS0tLS0tLVwiLCBcIlgtLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSotLS0tLS0tLVwiLCBcIlhYWC0tLS0tLS0tLS0tLVwiXSwgXCIxXzBfMFwiOiBbXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0jLS0mLS0mLS0mLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tLS1cIiwgXCJcXFxcLy8tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIqLS0tLS0tLS0tLS0tLS1cIl0sIFwiMV8wXzFcIjogW1wiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tIy0tJi0tJi0tJi0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tLS0tLS0tLS0tXCJdLCBcIjFfMF8yXCI6IFtcIl4tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS8vXFxcXFxcXFwtLS0tLVwiLCBcIi0tLS0tLVxcXFxcXFxcLy8tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0mLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tJi0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLSotLVwiLCBcIl4tLS0tLS0tLS0tLS0tLVwiXSwgXCI3XzNfMFwiOiBbXCItLS0tLS0tLVgtLV5eXl5cIiwgXCItLS0tLS0tLS0tLS0tWC1cIiwgXCItLS0tLS0tLVgtLS0tWC1cIiwgXCItLS0tLS0tWFgtLS0tWC1cIiwgXCItLS0tLS1YWFgtLS0tWC1cIiwgXCItLS0jLS1YIyYtLS0tWC1cIiwgXCItLS0tLS1YWFgtLS0tWC1cIiwgXCIvXFxcXFxcXFwtLS0tWFgtLS0tWC1cIiwgXCJcXFxcLy8tLS0tLVgtLS0tWC1cIiwgXCItLS0tLS0tLS0tLS0tIy1cIiwgXCIqLS0tLS0tLVgtLV5eXl5cIl0sIFwiN18zXzFcIjogW1wiLS0tLS0tLS1YLS1eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLVgtXCIsIFwiLS0tLS0tLS1YLS0tLVgtXCIsIFwiLS0tLS0tLVhYLS0tLVgtXCIsIFwiLS0tLS0tWFhYLS0tLVgtXCIsIFwiLS0tIy0tWCMmLS0tLVgtXCIsIFwiLS0tLS0tWFhYLS0tLVgtXCIsIFwiL1xcXFxcXFxcLS0tLVhYLS0tLVgtXCIsIFwiXFxcXC8vLS0tLS1YLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLSMtXCIsIFwiKi0tLS0tLS1YLS1eXl5eXCJdLCBcIjdfM18yXCI6IFtcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS1eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS1eXl5eLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0vL1wiLCBcIi0tLS0tLS0tLS0tLS1cXFxcXFxcXFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS1YLS0tLS1eXl5eLVwiLCBcIi0tLS1YLS1eXl5eXl5eXlwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiXSwgXCI3XzRfMFwiOiBbXCItLS0tLS1eXl4tLVhYWFhcIiwgXCItLS0tLS1eXl4tLVhYWFhcIiwgXCItLS0tLS1eXl4tLVhYWFhcIiwgXCItLS0tLS1eXl4tLVhYWFhcIiwgXCItLS0tLS0tKi0tLS0tKi1cIiwgXCItLS0jLS1eXl4tLS0tLS1cIiwgXCItLS0tLS0tJi0tLS0tLSNcIiwgXCIvXFxcXFxcXFwtLS1eXl4tLVhYWFhcIiwgXCJcXFxcLy8tLS1eXl4tLVhYWFhcIiwgXCItLS0tLS1eXl4tLVhYWFhcIiwgXCIqLS0tLS1eXl4tLVhYWFhcIl0sIFwiN180XzFcIjogW1wiLS0tLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tLSotLS0tLSotXCIsIFwiLS0tIy0tXl5eLS0tLS0tXCIsIFwiLS0tLS0tLSYtLS0tLS0jXCIsIFwiL1xcXFxcXFxcLS0tXl5eLS1YWFhYXCIsIFwiXFxcXC8vLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tXl5eLS1YWFhYXCIsIFwiKi0tLS0tXl5eLS1YWFhYXCJdLCBcIjdfNF8yXCI6IFtcIi0tLVgtLS0tLS0tLS0tLVwiLCBcIi0tLVgtLS0tLS0tLS0tLVwiLCBcIi0tLVgtLS1eLS0tLS1eLVwiLCBcIi0tLVgtLS1eLS0tLS1eLVwiLCBcIi0tLS0tLS1eLS0tLS1eLVwiLCBcIi0tLS0tLS1eLS0tLS1eLVwiLCBcIi0tLSMtIy0jLSMtIy0jLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi9cXFxcXFxcXFhYWFhYWFhYWFhYWFwiLCBcIlxcXFwvL1hYWFhYWFhYWFhYWFwiXSwgXCI3XzJfMFwiOiBbXCItLS0tLS0jLS0tXl5eXl5cIiwgXCItLS0tLS1YWC0tLS1eLS1cIiwgXCItLS0tLS1YWC0tLS1eLS1cIiwgXCItLS0tLS1YWC0tLS1eLS1cIiwgXCItLS0tLS1YWC0tLS1eLS1cIiwgXCItLS0jLS0tLS0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0mLS1cIiwgXCIvXFxcXFxcXFwtLS1YWC0tLS0tLS1cIiwgXCJcXFxcLy8tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCIqLS0tLS0jLS0tXl5eXl5cIl0sIFwiN18yXzFcIjogW1wiLS0tLS0tIy0tLV5eXl5eXCIsIFwiLS0tLS0tWFgtLS0tXi0tXCIsIFwiLS0tLS0tWFgtLS0tXi0tXCIsIFwiLS0tLS0tWFgtLS0tXi0tXCIsIFwiLS0tLS0tWFgtLS0tXi0tXCIsIFwiLS0tIy0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tWFgtLS0tJi0tXCIsIFwiL1xcXFxcXFxcLS0tWFgtLS0tLS0tXCIsIFwiXFxcXC8vLS0tWFgtLS0tLS0tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiKi0tLS0tIy0tLV5eXl5eXCJdLCBcIjhfM18wXCI6IFtcIi0tLS0tLS0tWC0tXl5eXlwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tWC0tLS1YLVwiLCBcIi0tLS0tLS1YWC0tLS1YWFwiLCBcIi0tLS0tLVhYWC0tLS1YWFwiLCBcIi0tLSMtLVgjJi0tLS0qI1wiLCBcIi0tLS0tLVhYWC0tLS1YWFwiLCBcIi9cXFxcXFxcXC0tLS1YWC0tLS1YWFwiLCBcIlxcXFwvLy0tLS0tWC0tLS1YLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiotLS0tLS0tWC0tXl5eXlwiXSwgXCI4XzNfMVwiOiBbXCItLS0tLS0tLVgtLV5eXl5cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLVgtLS0tWC1cIiwgXCItLS0tLS0tWFgtLS0tWFhcIiwgXCItLS0tLS1YWFgtLS0tWFhcIiwgXCItLS0jLS1YIyYtLS0tKiNcIiwgXCItLS0tLS1YWFgtLS0tWFhcIiwgXCIvXFxcXFxcXFwtLS0tWFgtLS0tWFhcIiwgXCJcXFxcLy8tLS0tLVgtLS0tWC1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIqLS0tLS0tLVgtLV5eXl5cIl0sIFwiOF8zXzJcIjogW1wiLS0tLS0tLS0tLS1eXl5eXCIsIFwiLS0tLS0tLS0tLS1eXl5eXCIsIFwiXi0tXi0tLS0tLS0tLS0tXCIsIFwiXi0tXi0tLVhYLS0tLS0tXCIsIFwiXi0tXi0tLVhYLS1eXl5eXCIsIFwiXi0tXi0tLVhYLS1eXl5eXCIsIFwiIy0jLSMtLVhYLS1eXl5eXCIsIFwiLS0tLS0tLVhYLS1eXl5eXCIsIFwiLS0tLS0tLVhYLS1eXl5eXCIsIFwiWFhYWFhYWFhYLS1eXl5eXCIsIFwiWFhYWFhYWFhYLS1eXl5eXCJdLCBcIjZfM18wXCI6IFtcIi0tLS0tLS0tLVgtLV5eXlwiLCBcIi0tLS0tLS0tLS0tLS0tWFwiLCBcIi0tLS0tLS0tLVgtLS0tWFwiLCBcIi0tLS0tLS0tWFgtLS0tWFwiLCBcIi0tLS0tLS1YWFgtLS0tWFwiLCBcIi0tLSMtLS1YIyYtLS0tWFwiLCBcIi0tLS0tLS1YWFgtLS0tWFwiLCBcIi9cXFxcXFxcXC0tLS0tWFgtLS0tWFwiLCBcIlxcXFwvLy0tLS0tLVgtLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tI1wiLCBcIiotLS0tLS0tLVgtLV5eXlwiXSwgXCI2XzNfMVwiOiBbXCItLS0tLS0tLS1YLS1eXl5cIiwgXCItLS0tLS0tLS0tLS0tLVhcIiwgXCItLS0tLS0tLS1YLS0tLVhcIiwgXCItLS0tLS0tLVhYLS0tLVhcIiwgXCItLS0tLS0tWFhYLS0tLVhcIiwgXCItLS0jLS0tWCMmLS0tLVhcIiwgXCItLS0tLS0tWFhYLS0tLVhcIiwgXCIvXFxcXFxcXFwtLS0tLVhYLS0tLVhcIiwgXCJcXFxcLy8tLS0tLS1YLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLSNcIiwgXCIqLS0tLS0tLS1YLS1eXl5cIl0sIFwiNl8zXzJcIjogW1wiLS0tLSMtLS1YLS1eXl5eXCIsIFwiXl4tLVhYLS1YLS1eXl5eXCIsIFwiXl4tLVhYLS1YLS1eXl5eXCIsIFwiXl4tLVhYLS1YLS0tLS0tXCIsIFwiXl4tLVhYLS1YLS1eXl5eXCIsIFwiXl4tLS0tLS1YLS1eXl5eXCIsIFwiXl4tLVhYLS1YLS1eXl5eXCIsIFwiXl4tLVhYLS1YLS0tLS0tXCIsIFwiXl4tLVhYLS1YLS1eXl5eXCIsIFwiXl4tLVhYLS1YLS1eXl5eXCIsIFwiLS0tLSMtLS0mLS1eXl5eXCJdLCBcIjE0XzFfMFwiOiBbXCItLS1eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tLS0tLSpcIiwgXCItLS0tLS0tLVgtLS0tLS1cIiwgXCItLS0tLS0tWFgtLS0tXl5cIiwgXCItLS0tLS1YWFgtLV5eXl5cIiwgXCIjLS0tLS1YIyotLS0tLSZcIiwgXCItLS0tLS1YWFgtLV5eXl5cIiwgXCItLS0tLS0tWFgtLS0tXl5cIiwgXCItLS0tLS0tLVgtLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLSpcIiwgXCItLS1eXl5eXl5eXl5eXl5cIl0sIFwiMTRfMV8xXCI6IFtcIi0tLV5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tLS0tKlwiLCBcIi0tLS0tLS0tWC0tLS0tLVwiLCBcIi0tLS0tLS1YWC0tLS1eXlwiLCBcIi0tLS0tLVhYWC0tXl5eXlwiLCBcIiMtLS0tLVgjKi0tLS0tJlwiLCBcIi0tLS0tLVhYWC0tXl5eXlwiLCBcIi0tLS0tLS1YWC0tLS1eXlwiLCBcIi0tLS0tLS0tWC0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tKlwiLCBcIi0tLV5eXl5eXl5eXl5eXlwiXSwgXCIxNF8yXzBcIjogW1wiLS0tXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tXi0tLS0tLS0tXCIsIFwiLS0tLS0tXi0tLS1YLS1YXCIsIFwiLS0tLS0tXi0tLVhYLS1YXCIsIFwiLS0tLS0tXi0tWFhYLS1YXCIsIFwiIy0tLS0tLS0tWCMqLS0qXCIsIFwiLS0tLS0tJi0tWFhYLS1YXCIsIFwiLS0tLS0tLS0tLVhYLS1YXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tXl5eXl5eXl5eXl5eXCJdLCBcIjE0XzJfMVwiOiBbXCItLS1eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS1eLS0tLS0tLS1cIiwgXCItLS0tLS1eLS0tLVgtLVhcIiwgXCItLS0tLS1eLS0tWFgtLVhcIiwgXCItLS0tLS1eLS1YWFgtLVhcIiwgXCIjLS0tLS0tLS1YIyotLSpcIiwgXCItLS0tLS0mLS1YWFgtLVhcIiwgXCItLS0tLS0tLS0tWFgtLVhcIiwgXCItLS0tLS0tLS0tLVgtLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS1eXl5eXl5eXl5eXl5cIl0sIFwiMTRfMF8wXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIiYtLS0tLV4tLV4tLVgtLVwiLCBcIi0tLS0tLV4tLV4tLVgtLVwiLCBcIl5eLS0tLV4tLV4tLVgtLVwiLCBcIl5eXl4tLV4tLV4tLVgtLVwiLCBcIi0tLS0tLS0tLS0tLVgtLVwiLCBcIl5eXl4tLSYtLSYtLVgtLVwiLCBcIl5eLS0tLS0tLS0tLVgtLVwiLCBcIi0tLS0tLS0tLS0tLVgtLVwiLCBcIiYtLS0tLS0tLS0tLSMtLVwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxNF8wXzFcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiJi0tLS0tXi0tXi0tWC0tXCIsIFwiLS0tLS0tXi0tXi0tWC0tXCIsIFwiXl4tLS0tXi0tXi0tWC0tXCIsIFwiXl5eXi0tXi0tXi0tWC0tXCIsIFwiLS0tLS0tLS0tLS0tWC0tXCIsIFwiXl5eXi0tJi0tJi0tWC0tXCIsIFwiXl4tLS0tLS0tLS0tWC0tXCIsIFwiLS0tLS0tLS0tLS0tWC0tXCIsIFwiJi0tLS0tLS0tLS0tIy0tXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjE0XzBfMlwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS0tLV5eLS0tXl5eLS1cIiwgXCItLS0tLS0tLS0tXl5eLS1cIiwgXCItLVgtLV5eLS0tLSYtLS1cIiwgXCIqLVgtLV5eLS0tXl5eLS1cIiwgXCJYWFgtLV5eLS0tXl5eLS1cIiwgXCIqLVgtLV5eLS0tXl5eLS1cIiwgXCItLVgtLV5eLS0tLSYtLS1cIiwgXCItLS0tLS0tLS0tXl5eLS1cIiwgXCItLS0tLV5eLS0tXl5eLS1cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTVfMV8wXCI6IFtcIi1eXl5eXl5eXl5eXl5eXlwiLCBcIi1eXi0tLS0tLS0tLS0qLVwiLCBcIi1eXi0tLS1YLS0tLS0tLVwiLCBcIi1eXi0tLVhYLS0tLV5eXlwiLCBcIi0tLS0tWFhYLS1eXl5eXlwiLCBcIi1eXi0tWCMqLS0tLS0mLVwiLCBcIi0tLS0tWFhYLS1eXl5eXlwiLCBcIi1eXi0tLVhYLS0tLV5eXlwiLCBcIi1eXi0tLS1YLS0tLS0tLVwiLCBcIi1eXi0tLS0tLS0tLS0qLVwiLCBcIi1eXl5eXl5eXl5eXl5eXlwiXSwgXCIxNV8xXzFcIjogW1wiLV5eXl5eXl5eXl5eXl5eXCIsIFwiLV5eLS0tLS0tLS0tLSotXCIsIFwiLV5eLS0tLVgtLS0tLS0tXCIsIFwiLV5eLS0tWFgtLS0tXl5eXCIsIFwiLS0tLS1YWFgtLV5eXl5eXCIsIFwiLV5eLS1YIyotLS0tLSYtXCIsIFwiLS0tLS1YWFgtLV5eXl5eXCIsIFwiLV5eLS0tWFgtLS0tXl5eXCIsIFwiLV5eLS0tLVgtLS0tLS0tXCIsIFwiLV5eLS0tLS0tLS0tLSotXCIsIFwiLV5eXl5eXl5eXl5eXl5eXCJdLCBcIjE1XzFfMlwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCIjWC0tLS0tLS0tWC0tLSZcIiwgXCJYWC0tLS0tLS0tWC0tXl5cIiwgXCJYLS0tLS0tLS0tWC0tXl5cIiwgXCItLS0tLS0tLS0tWC0tXl5cIiwgXCItLS0tLS0tLS0tWC0tXl5cIiwgXCItLS0tLS0tWC0tWC0tXl5cIiwgXCItLS0tLS0tWC0tWC0tXl5cIiwgXCItLS0tLS0tWC0tWC0tXl5cIiwgXCItLS0tLS0tWC0tIy0tLSZcIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTNfMV8wXCI6IFtcIi0tLS1eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tLS0tKlwiLCBcIi0tLS0tLS0tWC0tLS0tLVwiLCBcIi0tLS0tLS1YWC0tLS1eXlwiLCBcIi0tLS0tLVhYWC0tXl5eXlwiLCBcIiMtLS0tLVgjKi0tLS0tJlwiLCBcIi0tLS0tLVhYWC0tXl5eXlwiLCBcIi0tLS0tLS1YWC0tLS1eXlwiLCBcIi0tLS0tLS0tWC0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tKlwiLCBcIi0tLS1eXl5eXl5eXl5eXlwiXSwgXCIxM18xXzFcIjogW1wiLS0tLV5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS0qXCIsIFwiLS0tLS0tLS1YLS0tLS0tXCIsIFwiLS0tLS0tLVhYLS0tLV5eXCIsIFwiLS0tLS0tWFhYLS1eXl5eXCIsIFwiIy0tLS0tWCMqLS0tLS0mXCIsIFwiLS0tLS0tWFhYLS1eXl5eXCIsIFwiLS0tLS0tLVhYLS0tLV5eXCIsIFwiLS0tLS0tLS1YLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0qXCIsIFwiLS0tLV5eXl5eXl5eXl5eXCJdLCBcIjEzXzFfMlwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS1YLS0tLSYtLS0tLS1cIiwgXCJeLS0tLS0tLVgtLS0tLS1cIiwgXCJeLS0tLS0tLVgtLS0tLS1cIiwgXCJeLS0tLS0tLVgtLV5eXl5cIiwgXCJeLS0tLS0tLVgtLS0tLS1cIiwgXCJeLS0tLS0tLVgtLV5eXl5cIiwgXCJeLS0tLS0tLVgtLS0tLS1cIiwgXCJeLS0tLS0tLVgtLS0tLS1cIiwgXCItLS0tLS0tLVgtLS0tLS1cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiNF8zXzBcIjogW1wiLS0tLS0tIy0tLVgtLV5eXCIsIFwiLS0tLS0tWFgtLVgtLS0tXCIsIFwiLS0tLS0tWFgtLVgtLS0tXCIsIFwiLS0tLS0tWFgtLVgtLS0tXCIsIFwiLS0tLS0tWFgtLVgtLS0tXCIsIFwiLS0tIy0tLS0tLVgtLS0tXCIsIFwiLS0tLS0tWFgtLVgtLS0tXCIsIFwiL1xcXFxcXFxcLS0tWFgtLVgtLS0tXCIsIFwiXFxcXC8vLS0tWFgtLVgtLS0tXCIsIFwiLS0tLS0tWFgtLVgtLS0tXCIsIFwiKi0tLS0tIy0tLSYtLV5eXCJdLCBcIjRfM18xXCI6IFtcIi0tLS0tLSMtLS1YLS1eXlwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi0tLSMtLS0tLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi9cXFxcXFxcXC0tLVhYLS1YLS0tLVwiLCBcIlxcXFwvLy0tLVhYLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIiotLS0tLSMtLS0mLS1eXlwiXSwgXCI0XzNfMlwiOiBbXCJeXi0tLS1YLS0tLVgtLV5cIiwgXCItLS0tLS0tLS0tLS0tLV5cIiwgXCItLS0tLS1YLS0tLVgtLV5cIiwgXCItLS0tLVhYLS0tWFgtLS1cIiwgXCItLS0tWFhYLS1YWFgtLV5cIiwgXCItLS0tWCMmLS1YIyYtLV5cIiwgXCItLS0tWFhYLS1YWFgtLV5cIiwgXCItLS0tLVhYLS0tWFgtLS1cIiwgXCItLS0tLS1YLS0tLVgtLV5cIiwgXCItLS0tLS0tLS0tLS0tLV5cIiwgXCJeXi0tLS1YLS0tLVgtLV5cIl0sIFwiNF80XzBcIjogW1wiLS0tLS0tLS0tWFhYXl5eXCIsIFwiLS0tLS0tLS0tLS0tXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tWFhYLS0tXCIsIFwiLS0tLS0tLS0tWFhYXl5eXCIsIFwiLS0tIy0tJi0tWFhYXl5eXCIsIFwiLS0tLS0tLS0tWFhYXl5eXCIsIFwiL1xcXFxcXFxcLS0tLS0tWFhYXl5eXCIsIFwiXFxcXC8vLS0tLS0tWFhYXl5eXCIsIFwiLS0tLS0tLS0tWFhYXl5eXCIsIFwiKi0tLS0tLS0tWFhYXl5eXCJdLCBcIjRfNF8xXCI6IFtcIi0tLS0tLS0tLVhYWF5eXlwiLCBcIi0tLS0tLS0tLS0tLV5eXlwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLVhYWC0tLVwiLCBcIi0tLS0tLS0tLVhYWF5eXlwiLCBcIi0tLSMtLSYtLVhYWF5eXlwiLCBcIi0tLS0tLS0tLVhYWF5eXlwiLCBcIi9cXFxcXFxcXC0tLS0tLVhYWF5eXlwiLCBcIlxcXFwvLy0tLS0tLVhYWF5eXlwiLCBcIi0tLS0tLS0tLVhYWF5eXlwiLCBcIiotLS0tLS0tLVhYWF5eXlwiXSwgXCI0XzRfMlwiOiBbXCJYWFheXl5eXi0tLS0tLVhcIiwgXCJYWFheXl5eXi0tLS0tLVhcIiwgXCJYWFheXl5eXi0tLS0tLVhcIiwgXCJYWFheXl5eXi0tLS0tLVhcIiwgXCJYWFheXl5eXi0tLS0tLVhcIiwgXCJYWFheXl5eXi0tLS0tLVhcIiwgXCJYWFgtLV5eXi0tLS0tLVhcIiwgXCJYLS0tLS0tLS0tLS0tLS1cIiwgXCItLS1eXi0tLS0tLS0tLS1cIiwgXCItWFheXl5eXi0tLS0tLVhcIiwgXCJYWFheXl5eXi0tLS0tLVhcIl0sIFwiNF8yXzBcIjogW1wiLS0tLS0tIy0tLS0tLV5eXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiLS0tIy0tLS0tLSYtLS0tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tWFgtLS0tLS0tXCIsIFwiXFxcXC8vLS0tWFgtLS0tLS0tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiKi0tLS0tIy0tLS0tLV5eXCJdLCBcIjRfMl8xXCI6IFtcIi0tLS0tLSMtLS0tLS1eXlwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLSMtLS0tLS0mLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLVhYLS0tLS0tLVwiLCBcIlxcXFwvLy0tLVhYLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIiotLS0tLSMtLS0tLS1eXlwiXSwgXCI1XzNfMFwiOiBbXCItLS0tLS0jLS0tWFhYWFhcIiwgXCItLS0tLS1YWC0tLS1eXl5cIiwgXCItLS0tLS1YWC0tLS1eXl5cIiwgXCItLS0tLS1YWC0tLS1eXl5cIiwgXCItLS0tLS1YWC0tLS1eXl5cIiwgXCItLS0jLS0tLS0tLS0tJi1cIiwgXCItLS0tLS1YWC0tLS1eXl5cIiwgXCIvXFxcXFxcXFwtLS1YWC0tLS1eXl5cIiwgXCJcXFxcLy8tLS1YWC0tLS1eXl5cIiwgXCItLS0tLS1YWC0tLS1eXl5cIiwgXCIqLS0tLS0jLS0tWFhYWFhcIl0sIFwiNV8zXzFcIjogW1wiLS0tLS0tIy0tLVhYWFhYXCIsIFwiLS0tLS0tWFgtLS0tXl5eXCIsIFwiLS0tLS0tWFgtLS0tXl5eXCIsIFwiLS0tLS0tWFgtLS0tXl5eXCIsIFwiLS0tLS0tWFgtLS0tXl5eXCIsIFwiLS0tIy0tLS0tLS0tLSYtXCIsIFwiLS0tLS0tWFgtLS0tXl5eXCIsIFwiL1xcXFxcXFxcLS0tWFgtLS0tXl5eXCIsIFwiXFxcXC8vLS0tWFgtLS0tXl5eXCIsIFwiLS0tLS0tWFgtLS0tXl5eXCIsIFwiKi0tLS0tIy0tLVhYWFhYXCJdLCBcIjNfM18wXCI6IFtcIi0tLS0tLSMtLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS1eLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS1eLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi0tLSMtLS0tLS1YLS1eLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi9cXFxcXFxcXC0tLVhYLS1YLS1eLVwiLCBcIlxcXFwvLy0tLVhYLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS1eLVwiLCBcIiotLS0tLSMtLS0mLS0tLVwiXSwgXCIzXzNfMVwiOiBbXCItLS0tLS0jLS0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tXi1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tXi1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCItLS0jLS0tLS0tWC0tXi1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCIvXFxcXFxcXFwtLS1YWC0tWC0tXi1cIiwgXCJcXFxcLy8tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tXi1cIiwgXCIqLS0tLS0jLS0tJi0tLS1cIl0sIFwiM18zXzJcIjogW1wiWFhYLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLVgtXCIsIFwiLS0tLS0tLS1eWC0tLVheXCIsIFwiLS0tLS0tLV5eWFhYWFheXCIsIFwiLS0tLS0tLS1eWC0tLVheXCIsIFwiLS0tLS0tLS0tWC0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiXi0tLS0tLS0tLy9cXFxcXFxcXC0tXCIsIFwiWFhYLS0tLS0tXFxcXFxcXFwvLy0tXCJdLCBcIjBfOF8wXCI6IFtcIi0tLS0jLS0tWC0tWFhYWFwiLCBcIlxcXFxcXFxcLS1YWC0tWC0tWFhYWFwiLCBcIi8vLS1YWC0tWC0tWFhYWFwiLCBcIi0tLS1YWC0tWC0tWFhYWFwiLCBcIi0tLS1YWC0tWC0tWFhYWFwiLCBcIi0tLS0tLS0tWC0tWFhYWFwiLCBcIi0tLS1YWC0tWC0tWFhYWFwiLCBcIi0tLS1YWC0tWC0tLS1YWFwiLCBcIiYtLS1YWC0tWC0tLS0tLVwiLCBcIi0tLS1YWC0tWC0tWFgtLVwiLCBcIi0tLS0jLS0tJi0tWFhYWFwiXSwgXCIwXzhfMVwiOiBbXCItLS0tIy0tLVgtLVhYWFhcIiwgXCJcXFxcXFxcXC0tWFgtLVgtLVhYWFhcIiwgXCIvLy0tWFgtLVgtLVhYWFhcIiwgXCItLS0tWFgtLVgtLVhYWFhcIiwgXCItLS0tWFgtLVgtLVhYWFhcIiwgXCItLS0tLS0tLVgtLVhYWFhcIiwgXCItLS0tWFgtLVgtLVhYWFhcIiwgXCItLS0tWFgtLVgtLS0tWFhcIiwgXCImLS0tWFgtLVgtLS0tLS1cIiwgXCItLS0tWFgtLVgtLVhYLS1cIiwgXCItLS0tIy0tLSYtLVhYWFhcIl0sIFwiMF84XzJcIjogW1wiWFhYLS0tWFhYWFhYWFhYXCIsIFwiI1hYLS0tLVhYWFhYWFhYXCIsIFwiLVhYLS0tLS0tLVhYWFhYXCIsIFwiLVhYLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiLVhYLS0tLS0tLS0tLS0tXCIsIFwiLVhYLS0tLS0tLVhYWFhYXCIsIFwiLVhYLS0tLVhYWFhYWFhYXCIsIFwiWFhYLS0tWFhYWFhYWFhYXCJdLCBcIjBfOV8wXCI6IFtcIi0tLS0jLS0tLVhYWFhYWFwiLCBcIlxcXFxcXFxcLS1YWC0tLVhYWFhYWFwiLCBcIi8vLS1YWC0tLVhYWFhYWFwiLCBcIi0tLS1YWC0tLVhYWFhYWFwiLCBcIi0tLS1YWC0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tWFhYWFwiLCBcIi0tLS1YWC0tLS0tWFhYWFwiLCBcIi0tLS1YWC0tLVhYWFhYWFwiLCBcIiYtLS1YWC0tLVhYWFhYWFwiLCBcIi0tLS1YWC0tLVhYWFhYWFwiLCBcIi0tLS0jLS0tLVhYWFhYWFwiXSwgXCIwXzlfMVwiOiBbXCItLS0tIy0tLS1YWFhYWFhcIiwgXCJcXFxcXFxcXC0tWFgtLS1YWFhYWFhcIiwgXCIvLy0tWFgtLS1YWFhYWFhcIiwgXCItLS0tWFgtLS1YWFhYWFhcIiwgXCItLS0tWFgtLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLVhYWFhcIiwgXCItLS0tWFgtLS0tLVhYWFhcIiwgXCItLS0tWFgtLS1YWFhYWFhcIiwgXCImLS0tWFgtLS1YWFhYWFhcIiwgXCItLS0tWFgtLS1YWFhYWFhcIiwgXCItLS0tIy0tLS1YWFhYWFhcIl0sIFwiMF85XzJcIjogW1wiLS0tLVhYWFgtLVhYWFgtXCIsIFwiLVgtLVhYWFgtLVhYWFgtXCIsIFwiLVgtLVhYWFgtLVhYWFgtXCIsIFwiLVgtLVhYWFgtLVhYWFgtXCIsIFwiLVgtLVhYWFgtLVhYWFgtXCIsIFwiWFgtLVhYWFgtLVhYWFgtXCIsIFwiLVgtLS0tLS0tLVhYWFgtXCIsIFwiLVgtLS0tLS0tLS0tWFgtXCIsIFwiLVgtLVhYWFgtLS0tLS0tXCIsIFwiLVgtLVhYWFgtLVhYLS0tXCIsIFwiLS0tLVhYWFgtLVhYWFgtXCJdLCBcIjBfN18wXCI6IFtcIi0tLS0jLS0tWC0tLVhYWFwiLCBcIlxcXFxcXFxcLS1YWC0tWC0tLVhYWFwiLCBcIi8vLS1YWC0tWC0tLVhYWFwiLCBcIi0tLS1YWC0tWC0tLVhYWFwiLCBcIi0tLS1YWC0tWC0tLVhYLVwiLCBcIi0tLS0tLS0tWC0tLVhYLVwiLCBcIi0tLS1YWC0tWC0tLS0tLVwiLCBcIi0tLS1YWC0tWC0tLVhYWFwiLCBcIiYtLS1YWC0tWC0tLVhYWFwiLCBcIi0tLS1YWC0tWC0tLVhYWFwiLCBcIi0tLS0jLS0tJi0tLVhYWFwiXSwgXCIwXzdfMVwiOiBbXCItLS0tIy0tLVgtLS1YWFhcIiwgXCJcXFxcXFxcXC0tWFgtLVgtLS1YWFhcIiwgXCIvLy0tWFgtLVgtLS1YWFhcIiwgXCItLS0tWFgtLVgtLS1YWFhcIiwgXCItLS0tWFgtLVgtLS1YWC1cIiwgXCItLS0tLS0tLVgtLS1YWC1cIiwgXCItLS0tWFgtLVgtLS0tLS1cIiwgXCItLS0tWFgtLVgtLS1YWFhcIiwgXCImLS0tWFgtLVgtLS1YWFhcIiwgXCItLS0tWFgtLVgtLS1YWFhcIiwgXCItLS0tIy0tLSYtLS1YWFhcIl0sIFwiMF83XzJcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS1YWC0tXCIsIFwiLS0tLS0tWFhYLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS1YWC0tXCIsIFwiLS0tLS0tWFhYLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS1YWC0tXCIsIFwiLS0tXi0tWFhYLS0tLS0tXCIsIFwiLS0tXi0tLS0tLS1YWC0tXCIsIFwiLS0tXi0tWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjFfOF8wXCI6IFtcIi0tLS0tLS0tWFhYWFhYWFwiLCBcIi0tLS0tLS0tWFhYWFhYWFwiLCBcIi0tLS0tLS0tWFhYWFhYWFwiLCBcIi0tLS0tLS0tWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSMtLS0tLS0mLS1YWFwiLCBcIi0tLS0tLS0tLS0tLS1YWFwiLCBcIi9cXFxcXFxcXC0tLS0tWFhYWFhYWFwiLCBcIlxcXFwvLy0tLS0tWFhYWFhYWFwiLCBcIi0tLS0tLS0tWFhYWFhYWFwiLCBcIiotLS0tLS0tWFhYWFhYWFwiXSwgXCIxXzhfMVwiOiBbXCItLS0tLS0tLVhYWFhYWFhcIiwgXCItLS0tLS0tLVhYWFhYWFhcIiwgXCItLS0tLS0tLVhYWFhYWFhcIiwgXCItLS0tLS0tLVhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0jLS0tLS0tJi0tWFhcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCIvXFxcXFxcXFwtLS0tLVhYWFhYWFhcIiwgXCJcXFxcLy8tLS0tLVhYWFhYWFhcIiwgXCItLS0tLS0tLVhYWFhYWFhcIiwgXCIqLS0tLS0tLVhYWFhYWFhcIl0sIFwiMV84XzJcIjogW1wiWFgtLS0tLS0mLS0tLS0tXCIsIFwiWFgtLS0tLS0tLS0tLS0tXCIsIFwiWFgtLS1YWFhYWFhYLS0tXCIsIFwiWFgjLS1YWFhYWFhYLS0tXCIsIFwiWFgtLS1YWFhYWFhYLS0tXCIsIFwiWFgtLS1YWFhYWFhYLS0tXCIsIFwiWFgtLS0tLVhYWC0tLS0tXCIsIFwiWFhYWC0tLVhYWC0jLVhYXCIsIFwiLS1YWC0tLVhYWC0tLVhYXCIsIFwiLS0tLS0tLVhYWC0tLS0tXCIsIFwiLS0tLS0tLVhYWC0tLS0tXCJdLCBcIjNfMTBfMFwiOiBbXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLSNYWFhcIiwgXCItLS0jLS0tLSYtLS1YWFhcIiwgXCItLS0tLS0tLS0tLS0tKi1cIiwgXCIvXFxcXFxcXFwtLS1YWFhYWFhYWFhcIiwgXCJcXFxcLy8tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCIqLS0tLS1YWFhYWFhYWFhcIl0sIFwiM18xMF8xXCI6IFtcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tI1hYWFwiLCBcIi0tLSMtLS0tJi0tLVhYWFwiLCBcIi0tLS0tLS0tLS0tLS0qLVwiLCBcIi9cXFxcXFxcXC0tLVhYWFhYWFhYWFwiLCBcIlxcXFwvLy0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIiotLS0tLVhYWFhYWFhYWFwiXSwgXCIzXzEwXzJcIjogW1wiXl5eLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWC0tLSYtLS0tXCIsIFwiLS0tLS1YWC0tLS0tLSMtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiXl5eLS1YWFhYWFhYWFhYXCJdLCBcIjNfMTFfMFwiOiBbXCItLS0tWFhYWFhYWFhYWFhcIiwgXCJcXFxcXFxcXC0tWFhYWFhYWFhYWFhcIiwgXCIvLy0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0jWFhcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCItLS0tLS0jLS0jLS0tLSpcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCImLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIl0sIFwiM18xMV8xXCI6IFtcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIlxcXFxcXFxcLS1YWFhYWFhYWFhYWFwiLCBcIi8vLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLSNYWFwiLCBcIi0tLS0tLS0tLS0tLS1YWFwiLCBcIi0tLS0tLSMtLSMtLS0tKlwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIiYtLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiXSwgXCIzXzlfMFwiOiBbXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0jLS0tLSYtLS0tLS1cIiwgXCItLS0tLS0tLS0tLSMtLSNcIiwgXCIvXFxcXFxcXFwtLS1YWFhYWFhYWFhcIiwgXCJcXFxcLy8tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCIqLS0tLS1YWFhYWFhYWFhcIl0sIFwiM185XzFcIjogW1wiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tIy0tLS0mLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0jLS0jXCIsIFwiL1xcXFxcXFxcLS0tWFhYWFhYWFhYXCIsIFwiXFxcXC8vLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiKi0tLS0tWFhYWFhYWFhYXCJdLCBcIjNfOV8yXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYLS1eXlwiLCBcIlgtLVhYLS1YWC0tLS0tLVwiLCBcIlgtLVhYLS1YWC0tLS0tLVwiLCBcIlgtLVhYLS1YWC0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlgtLVhYLS1YWC0tLS0tLVwiLCBcIlgtLVhYLS1YWC0tLS0tLVwiLCBcIlgqJlhYKiZYWC0tLS0tLVwiLCBcIlhYWFhYWFhYWFhYLS1eXlwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI0XzEwXzBcIjogW1wiLS0tLVhYWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLVhYWFhYWFhYWFgtXCIsIFwiLy8tLVhYWFhYWFhYWFgtXCIsIFwiLS0tLVhYWFhYWFhYWFgtXCIsIFwiLS0tLS0tKi0tLSotLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLSMtLS0jLS0tXCIsIFwiLS0tLVhYWFhYWFhYWFgtXCIsIFwiJi0tLVhYWFhYWFhYWFgtXCIsIFwiLS0tLVhYWFhYWFhYWFgqXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCJdLCBcIjRfMTBfMVwiOiBbXCItLS0tWFhYWFhYWFhYWFhcIiwgXCJcXFxcXFxcXC0tWFhYWFhYWFhYWC1cIiwgXCIvLy0tWFhYWFhYWFhYWC1cIiwgXCItLS0tWFhYWFhYWFhYWC1cIiwgXCItLS0tLS0qLS0tKi0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tIy0tLSMtLS1cIiwgXCItLS0tWFhYWFhYWFhYWC1cIiwgXCImLS0tWFhYWFhYWFhYWC1cIiwgXCItLS0tWFhYWFhYWFhYWCpcIiwgXCItLS0tWFhYWFhYWFhYWFhcIl0sIFwiMl8xMF8wXCI6IFtcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYLS0tLS0jWFwiLCBcIi0tLSMtLVhYLS0mLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLVhYWFhYWFhYWFwiLCBcIlxcXFwvLy0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIiotLS0tLVhYWFhYWFhYWFwiXSwgXCIyXzEwXzFcIjogW1wiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFgtLS0tLSNYXCIsIFwiLS0tIy0tWFgtLSYtLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tWFhYWFhYWFhYXCIsIFwiXFxcXC8vLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiKi0tLS0tWFhYWFhYWFhYXCJdLCBcIjE1XzJfMFwiOiBbXCItLS1eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tXi0tLS1cIiwgXCItLS0tLS0tWC0tXi0tWC1cIiwgXCItLS0tLS1YWC0tXi0tWFhcIiwgXCItLS0tLVhYWC0tXi0tWFhcIiwgXCIjLS0tLVgjKi0tLS0tKiNcIiwgXCItLS0tLVhYWC0tJi0tWFhcIiwgXCItLS0tLS1YWC0tLS0tWFhcIiwgXCItLS0tLS0tWC0tLS0tWC1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS1eXl5eXl5eXl5eXl5cIl0sIFwiMTVfMl8xXCI6IFtcIi0tLV5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS1eLS0tLVwiLCBcIi0tLS0tLS1YLS1eLS1YLVwiLCBcIi0tLS0tLVhYLS1eLS1YWFwiLCBcIi0tLS0tWFhYLS1eLS1YWFwiLCBcIiMtLS0tWCMqLS0tLS0qI1wiLCBcIi0tLS0tWFhYLS0mLS1YWFwiLCBcIi0tLS0tLVhYLS0tLS1YWFwiLCBcIi0tLS0tLS1YLS0tLS1YLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLV5eXl5eXl5eXl5eXlwiXSwgXCIxNV8wXzBcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiJi0tLS0tLS0tKi0tLS0qXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiXl4tLS0tLS1eXl4tLV5eXCIsIFwiXl5eXi0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tJi0tLS0mXCIsIFwiXl5eXi0tXl5eXl5eXl5eXCIsIFwiXl4tLS0tLS1eXl4tLV5eXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiJi0tLS0tLS0tKi0tLS0qXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjE1XzBfMVwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCImLS0tLS0tLS0qLS0tLSpcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJeXi0tLS0tLV5eXi0tXl5cIiwgXCJeXl5eLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0mLS0tLSZcIiwgXCJeXl5eLS1eXl5eXl5eXl5cIiwgXCJeXi0tLS0tLV5eXi0tXl5cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCImLS0tLS0tLS0qLS0tLSpcIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiNF8xXzBcIjogW1wiLS0tLS0tLS0tWC0tXi1eXCIsIFwiLS0tLS0tLS0tWC0tLS1eXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiLS0tIy0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tWC0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tKi0tWC0tLS1eXCIsIFwiKi0tLS0tLS0tJi0tXi1eXCJdLCBcIjRfMV8xXCI6IFtcIi0tLS0tLS0tLVgtLV4tXlwiLCBcIi0tLS0tLS0tLVgtLS0tXlwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLSMtLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi9cXFxcXFxcXC0tLS0tLVgtLS0tLVwiLCBcIlxcXFwvLy0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLSotLVgtLS0tXlwiLCBcIiotLS0tLS0tLSYtLV4tXlwiXSwgXCI0XzFfMlwiOiBbXCItXl5eLS0tLS0mLS0tXl5cIiwgXCItXl5eLS0tLS1YLS0tXl5cIiwgXCItXl5eLS0mLS1YLS0tXl5cIiwgXCItXl5eLS0tLS1YLS0tXl5cIiwgXCItXl5eLS0tLS1YLS0tXl5cIiwgXCItXl5eLS0tLS1YLS0tXl5cIiwgXCItXl5eLS0tLS1YLS0tXl5cIiwgXCItXl5eLS0tLS1YLS0tXl5cIiwgXCItLSYtLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0tLS1YLS0tLS1cIiwgXCItXl5eLS0tLS1YLS0tXl5cIl0sIFwiNF8wXzBcIjogW1wiLS0tLS0tLS0tLS0tXi1eXCIsIFwiLS0tLS0tLS0tLS0tLS1eXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tIy0tLS0tJi0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tKi0tLS0tLS1eXCIsIFwiKi0tLS0tLS0tLS0tXi1eXCJdLCBcIjRfMF8xXCI6IFtcIi0tLS0tLS0tLS0tLV4tXlwiLCBcIi0tLS0tLS0tLS0tLS0tXlwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSMtLS0tLSYtLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS0tLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSotLS0tLS0tXlwiLCBcIiotLS0tLS0tLS0tLV4tXlwiXSwgXCI0XzBfMlwiOiBbXCItLS0tLS0tLS0tLV5eXi1cIiwgXCItLS1eLS0tLS0tLV5eXi1cIiwgXCItLS0tLS0tLS0tLV5eXi1cIiwgXCItLS1eLS0tLS0tLV5eXi1cIiwgXCItLS0tLS0tLS0tLV5eXi1cIiwgXCItLS1eLS0tLS0tLS0qLS1cIiwgXCItLS0tLS0tLS0tLV5eXi1cIiwgXCItLS1eLS0tLS0tLV5eXi1cIiwgXCItLS0tLS0tLS0tLV5eXi1cIiwgXCItLS1eLS0tLS0tLV5eXi1cIiwgXCItLS0tLS0tLS0tLV5eXi1cIl0sIFwiNV8xXzBcIjogW1wiLS0tLS0tLS0tWC0tLS1eXCIsIFwiLS0tLS0tLS0tWC0tXi0qXCIsIFwiLS0tLS0tLS0tWC0tLS1eXCIsIFwiLS0tLS0tLS0tWC0tXi0tXCIsIFwiLS0tLS0tLS0tWC0tLS1eXCIsIFwiLS0tIy0tLS0tWC0tXi0mXCIsIFwiLS0tLS0tLS0tWC0tLS1eXCIsIFwiL1xcXFxcXFxcLS0tLS0tWC0tXi0tXCIsIFwiXFxcXC8vLS0tLS0tWC0tLS1eXCIsIFwiLS0tLS0tKi0tWC0tXi0qXCIsIFwiKi0tLS0tLS0tJi0tLS1eXCJdLCBcIjVfMV8xXCI6IFtcIi0tLS0tLS0tLVgtLS0tXlwiLCBcIi0tLS0tLS0tLVgtLV4tKlwiLCBcIi0tLS0tLS0tLVgtLS0tXlwiLCBcIi0tLS0tLS0tLVgtLV4tLVwiLCBcIi0tLS0tLS0tLVgtLS0tXlwiLCBcIi0tLSMtLS0tLVgtLV4tJlwiLCBcIi0tLS0tLS0tLVgtLS0tXlwiLCBcIi9cXFxcXFxcXC0tLS0tLVgtLV4tLVwiLCBcIlxcXFwvLy0tLS0tLVgtLS0tXlwiLCBcIi0tLS0tLSotLVgtLV4tKlwiLCBcIiotLS0tLS0tLSYtLS0tXlwiXSwgXCI1XzFfMlwiOiBbXCJeXl4tLS0tLSMtLV4tXi1cIiwgXCItLS0tLS0tLVgtLS0tXi1cIiwgXCItLS0tLS0tLVgtLS0tLS1cIiwgXCItLS0tLS0tLVgtLS0tLS1cIiwgXCItLS0tLS0tLVgtLS0tLS1cIiwgXCItLS0tLS0tLVgtLS0tLS1cIiwgXCItLS0tLSYtLVgtLS0tLS1cIiwgXCItLS0tLS0tLVgtLS0tLS1cIiwgXCItLS0tLS0tLVgtLS0tLS1cIiwgXCItLS0tLS0tLVgtLS0tXi1cIiwgXCJeXl4tLS0tLVgtLV4tXi1cIl0sIFwiM18xXzBcIjogW1wiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tIy0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tIy0tLS0tJi0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tKi0tLS0tLS8vXCIsIFwiKi0tLS0tLS0tLS0tLVxcXFxcXFxcXCJdLCBcIjNfMV8xXCI6IFtcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLSMtLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSMtLS0tLSYtLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS0tLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSotLS0tLS0vL1wiLCBcIiotLS0tLS0tLS0tLS1cXFxcXFxcXFwiXSwgXCIzXzFfMlwiOiBbXCJeXl5eLS0tLS0tWFgtLS1cIiwgXCJeXl5eLS0tLS0tWFgtLS1cIiwgXCJeXl5eLS0tLS0tWFgtLS1cIiwgXCJeXi0tLS0tJi0tWFgtLS1cIiwgXCItLS0tLS0tLS0tWFgtLS1cIiwgXCItLV5eLS0tLS0tWFgtLS1cIiwgXCJeXl5eLS0tLS0tWFgtLS1cIiwgXCJeXl5eLS0tLS0tWFgtLS1cIiwgXCJeXl5eLS0tLS0tLS0tLS1cIiwgXCJeXl5eLS0tLS0tLS0tLS1cIiwgXCJeXl5eLS0tLS0tLS0tLS1cIl0sIFwiOV80XzBcIjogW1wiLS0tLV5eXl5eXl5eXl5eXCIsIFwiXFxcXFxcXFwtLS0tLS0tLS0tLS0tXCIsIFwiLy8tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tWC0tWC0tLS1YXCIsIFwiLS0tLS0tWC0tWF4tLS1YXCIsIFwiLS0tLS0tWFhYWF5eLS1YXCIsIFwiLS0tLS0tWC0tWF4tLS1YXCIsIFwiLS0tLS0tWC0tWC0tLS1YXCIsIFwiJi0tLS0tLS0tLy9cXFxcXFxcXC8vXCIsIFwiLS0tLS0tLS0tXFxcXFxcXFwvL1xcXFxcXFxcXCIsIFwiLS0tLV5eXl5eXl5eXl5eXCJdLCBcIjlfNF8xXCI6IFtcIi0tLS1eXl5eXl5eXl5eXlwiLCBcIlxcXFxcXFxcLS0tLS0tLS0tLS0tLVwiLCBcIi8vLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLVgtLVgtLS0tWFwiLCBcIi0tLS0tLVgtLVheLS0tWFwiLCBcIi0tLS0tLVhYWFheXi0tWFwiLCBcIi0tLS0tLVgtLVheLS0tWFwiLCBcIi0tLS0tLVgtLVgtLS0tWFwiLCBcIiYtLS0tLS0tLS8vXFxcXFxcXFwvL1wiLCBcIi0tLS0tLS0tLVxcXFxcXFxcLy9cXFxcXFxcXFwiLCBcIi0tLS1eXl5eXl5eXl5eXlwiXSwgXCI5XzVfMFwiOiBbXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCJYLS0tLS0tLVgtLVgtLVhcIiwgXCJYWFgtLS0tLVgtLVgtLVhcIiwgXCItWFgtLS0tLVgtLVgtLVhcIiwgXCItWFgtLS0tLVgtLVgtI1hcIiwgXCItWFgtLS0tLVgtLVgtLVhcIiwgXCIjWFgtLS0tLVgtLVgtLVhcIiwgXCItWFgtLS0tLVgtLVgtLVhcIiwgXCItWFgtLS0tLS0tLS0tLS1cIiwgXCItWFgtLS1eXl5eXl5eXl5cIl0sIFwiOV81XzFcIjogW1wiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiWC0tLS0tLS1YLS1YLS1YXCIsIFwiWFhYLS0tLS1YLS1YLS1YXCIsIFwiLVhYLS0tLS1YLS1YLS1YXCIsIFwiLVhYLS0tLS1YLS1YLSNYXCIsIFwiLVhYLS0tLS1YLS1YLS1YXCIsIFwiI1hYLS0tLS1YLS1YLS1YXCIsIFwiLVhYLS0tLS1YLS1YLS1YXCIsIFwiLVhYLS0tLS0tLS0tLS0tXCIsIFwiLVhYLS0tXl5eXl5eXl5eXCJdLCBcIjlfNV8yXCI6IFtcIl5eXl5eXl5eXl4tLVhYWFwiLCBcIi0tLS0tLS0tLS0tLS1YWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlgtLS0tWFhYLS0tLS0tLVwiLCBcIlheLS0tWCpYLS0tLS0tLVwiLCBcIlheXi0tWCYtLS0tLS0tLVwiLCBcIlheLS0tWCpYLS0tLS0tLVwiLCBcIlgtLS0tWFhYLS0tLS0tLVwiLCBcIi8vXFxcXFxcXFwvL1xcXFxcXFxcLS0tLS0tLVwiLCBcIlxcXFxcXFxcLy9cXFxcXFxcXC8vLS0tLS1YWFwiLCBcIl5eXl5eXl5eXl4tLVhYWFwiXSwgXCI5XzNfMFwiOiBbXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLVgtLS0tLVhcIiwgXCItLS0tLS0tLVgtLS0tLS1cIiwgXCItLS0jLS0tLVgtLS0tLS1cIiwgXCItLS0tLS0tLVgtLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS0tLVgtLS0vL1xcXFxcIiwgXCJcXFxcLy8tLS0tLVgtLS1cXFxcXFxcXC9cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIqLS0tLS1eXl5eXl5eXl5cIl0sIFwiOV8zXzFcIjogW1wiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS1YLS0tLS1YXCIsIFwiLS0tLS0tLS1YLS0tLS0tXCIsIFwiLS0tIy0tLS1YLS0tLS0tXCIsIFwiLS0tLS0tLS1YLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tLS1YLS0tLy9cXFxcXCIsIFwiXFxcXC8vLS0tLS1YLS0tXFxcXFxcXFwvXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tXl5eXl5eXl5eXCJdLCBcIjlfM18yXCI6IFtcIl5eXl5eXl5eXl5eLS1YWFwiLCBcIi0tLVgtLS0tJi0tLS1YWFwiLCBcIl4tLS0tLS0tWC0tLS1YWFwiLCBcIl4tLS0tLS0tWC0tLS1YWFwiLCBcIl4tLS0tLS0tWC0tLS1YWFwiLCBcIl4tLS0tLS0tWC0tLS1YWFwiLCBcIl4tLS0tLS0tWC0tLS1YWFwiLCBcIl4tLS0tLS0tWC0tLS1YWFwiLCBcIl4tLS0tLS0tWC0tLS0tLVwiLCBcIi0tLS0tLS0tWC0tLS0tLVwiLCBcIl5eXl5eXl5eXl5eLS0tLVwiXSwgXCIxMF80XzBcIjogW1wiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS0mXCIsIFwiWC0tLS0tLS0tLS1YLS1YXCIsIFwiWFhYLS0tLS0tLVhYLS1YXCIsIFwiLVhYLS0tLS0tWFhYLS1YXCIsIFwiLVhYLS0tLS0tWCMqLS1YXCIsIFwiLVhYLS0tLS0tWFhYLS1YXCIsIFwiI1hYLS0tLS0tLVhYLS1YXCIsIFwiLVhYLS0tLS0tLS1YLS1YXCIsIFwiLVhYLS0tLS0tLS0tLS1YXCIsIFwiLVhYLS0tXl5eXl5eXl5eXCJdLCBcIjEwXzRfMVwiOiBbXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tLS0tLSZcIiwgXCJYLS0tLS0tLS0tLVgtLVhcIiwgXCJYWFgtLS0tLS0tWFgtLVhcIiwgXCItWFgtLS0tLS1YWFgtLVhcIiwgXCItWFgtLS0tLS1YIyotLVhcIiwgXCItWFgtLS0tLS1YWFgtLVhcIiwgXCIjWFgtLS0tLS0tWFgtLVhcIiwgXCItWFgtLS0tLS0tLVgtLVhcIiwgXCItWFgtLS0tLS0tLS0tLVhcIiwgXCItWFgtLS1eXl5eXl5eXl5cIl0sIFwiOF80XzBcIjogW1wiLS0tLSMtLS1eXl5eXl5eXCIsIFwiXFxcXFxcXFwtLVhYLS0tLS1YLS1YXCIsIFwiLy8tLVhYLS0tLS1YLS1YXCIsIFwiLS0tLVhYLS0tLS1YLS1YXCIsIFwiLS0tLVhYLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS1YLSNYXCIsIFwiLS0tLVhYLS0tLS1YLS1YXCIsIFwiLS0tLVhYLS0tLS1YLS1YXCIsIFwiJi0tLVhYLS0tLS1YLS1YXCIsIFwiLS0tLVhYLS0tLS0tLS0tXCIsIFwiLS0tLSMtLS1eXl5eXl5eXCJdLCBcIjhfNF8xXCI6IFtcIi0tLS0jLS0tXl5eXl5eXlwiLCBcIlxcXFxcXFxcLS1YWC0tLS0tWC0tWFwiLCBcIi8vLS1YWC0tLS0tWC0tWFwiLCBcIi0tLS1YWC0tLS0tWC0tWFwiLCBcIi0tLS1YWC0tLS0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tWC0jWFwiLCBcIi0tLS1YWC0tLS0tWC0tWFwiLCBcIi0tLS1YWC0tLS0tWC0tWFwiLCBcIiYtLS1YWC0tLS0tWC0tWFwiLCBcIi0tLS1YWC0tLS0tLS0tLVwiLCBcIi0tLS0jLS0tXl5eXl5eXlwiXSwgXCI4XzRfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tWC0tLS0tLS0tLS1cIiwgXCItLS0tWF4tLS0tXl5eXl5cIiwgXCJYWFhYWF5eLS0tLS0tLS1cIiwgXCIqIyotWF4tLS0tXl5eXl5cIiwgXCItJi0tWC0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiNF81XzBcIjogW1wiLS0tLS0tIy0tLVhYWFhYXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiLS0tLS0tWFgtLS0tLVgtXCIsIFwiLS0tLS0tWFgtLS0tLVhYXCIsIFwiLS0tLS0tWFgtLS0tLVhYXCIsIFwiLS0tIy0tLS0tLS0tJiojXCIsIFwiLS0tLS0tWFgtLS0tLVhYXCIsIFwiL1xcXFxcXFxcLS0tWFgtLS0tLVhYXCIsIFwiXFxcXC8vLS0tWFgtLS0tLVgtXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiKi0tLS0tIy0tLVhYWFhYXCJdLCBcIjRfNV8xXCI6IFtcIi0tLS0tLSMtLS1YWFhYWFwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS1YLVwiLCBcIi0tLS0tLVhYLS0tLS1YWFwiLCBcIi0tLS0tLVhYLS0tLS1YWFwiLCBcIi0tLSMtLS0tLS0tLSYqI1wiLCBcIi0tLS0tLVhYLS0tLS1YWFwiLCBcIi9cXFxcXFxcXC0tLVhYLS0tLS1YWFwiLCBcIlxcXFwvLy0tLVhYLS0tLS1YLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIiotLS0tLSMtLS1YWFhYWFwiXSwgXCI0XzVfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItLVgtLS0tLS0tLV5eXi1cIiwgXCItLVgtLS0tLS0tLV5eXi1cIiwgXCItLVgtLS1YWFgtLV5eXi1cIiwgXCItLVgtLS1YKlgtLS0tLS1cIiwgXCItI1gtLS1YJi0tLV5eXi1cIiwgXCItLVgtLS1YKlgtLS0tLS1cIiwgXCItLVgtLS1YWFgtLV5eXi1cIiwgXCItLVgtLS0tLS0tLV5eXi1cIiwgXCItLS0tLS0tLS0tLV5eXi1cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiNV80XzBcIjogW1wiLS0tLS0tWFhYLS1eXl5eXCIsIFwiLS0tLS0tWFhYLS0tLV4tXCIsIFwiLS0tLS0tWFhYLS0tLV4tXCIsIFwiLS0tLS0tWFhYLS0tLV4tXCIsIFwiLS0tLS0tWFhYLS0tLV4tXCIsIFwiLS0tIy0tWFhYLS0tLS0tXCIsIFwiLS0tLS0tWFhYLS0tLSYtXCIsIFwiL1xcXFxcXFxcLS0tWFhYLS0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tWFhYLS1eXl5eXCJdLCBcIjVfNF8xXCI6IFtcIi0tLS0tLVhYWC0tXl5eXlwiLCBcIi0tLS0tLVhYWC0tLS1eLVwiLCBcIi0tLS0tLVhYWC0tLS1eLVwiLCBcIi0tLS0tLVhYWC0tLS1eLVwiLCBcIi0tLS0tLVhYWC0tLS1eLVwiLCBcIi0tLSMtLVhYWC0tLS0tLVwiLCBcIi0tLS0tLVhYWC0tLS0mLVwiLCBcIi9cXFxcXFxcXC0tLVhYWC0tLS0tLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiotLS0tLVhYWC0tXl5eXlwiXSwgXCIzXzRfMFwiOiBbXCItLS0tLS0tLS1YLS1YWFhcIiwgXCItLS0tLS0tLS1YLS1YWFhcIiwgXCItLS0tLS0tLS1YLS1YWFhcIiwgXCItLS0tLS0tLS1YLS1YWFhcIiwgXCItLS0tLS0tLS1YLS0tLS1cIiwgXCItLS0jLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0tLS1YLS0tLSNcIiwgXCIvXFxcXFxcXFwtLS0tLS1YLS1YWFhcIiwgXCJcXFxcLy8tLS0tLS1YLS1YWFhcIiwgXCItLS0tLS0qLS1YLS1YWFhcIiwgXCIqLS0tLS0tLS0mLS1YWFhcIl0sIFwiM180XzFcIjogW1wiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiLS0tIy0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLS0jXCIsIFwiL1xcXFxcXFxcLS0tLS0tWC0tWFhYXCIsIFwiXFxcXC8vLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tKi0tWC0tWFhYXCIsIFwiKi0tLS0tLS0tJi0tWFhYXCJdLCBcIjNfNF8yXCI6IFtcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0vL1xcXFxcXFxcLS0vL1xcXFxcXFxcLVwiLCBcIi0tLS1cXFxcXFxcXC8vLS1cXFxcXFxcXC8vLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIl4tLS0tLS0tLS0tLS0tLVwiLCBcIl5eLS0tLS0tLS0tLS0tLVwiLCBcIl4tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLVgmWC0tLVgmWFwiLCBcIi0tLS0tLVgtWC0tLVgtWFwiLCBcIi0tLS0tLVgjWC0tLVgjWFwiLCBcIi0tLS0tLVhYWC0tLVhYWFwiXSwgXCI4XzVfMFwiOiBbXCItLS0tLSMtLS1eXl5eXl5cIiwgXCItLS0tLVhYLS0tLV4tLVhcIiwgXCJYLS0tLVhYLS0tLV4tLVhcIiwgXCJYWFgtLVhYLS0tLV4tLVhcIiwgXCItWFgtLVhYLS0tLV4tLVhcIiwgXCItWFgtLS0tLS0tLS0tLVhcIiwgXCItWFgtLVhYLS0tLSYtLVhcIiwgXCIjWFgtLVhYLS0tLS0tLVhcIiwgXCItWFgtLVhYLS0tLS0tLVhcIiwgXCItWFgtLVhYLS0tLS0tLSNcIiwgXCItWFgtLSMtLS1eXl5eXl5cIl0sIFwiOF81XzFcIjogW1wiLS0tLS0jLS0tXl5eXl5eXCIsIFwiLS0tLS1YWC0tLS1eLS1YXCIsIFwiWC0tLS1YWC0tLS1eLS1YXCIsIFwiWFhYLS1YWC0tLS1eLS1YXCIsIFwiLVhYLS1YWC0tLS1eLS1YXCIsIFwiLVhYLS0tLS0tLS0tLS1YXCIsIFwiLVhYLS1YWC0tLS0mLS1YXCIsIFwiI1hYLS1YWC0tLS0tLS1YXCIsIFwiLVhYLS1YWC0tLS0tLS1YXCIsIFwiLVhYLS1YWC0tLS0tLS0jXCIsIFwiLVhYLS0jLS0tXl5eXl5eXCJdLCBcIjBfNl8wXCI6IFtcIi0tLS0jLS0tWC0tWC0tWFwiLCBcIlxcXFxcXFxcLS1YWC0tWC0tWC0tWFwiLCBcIi8vLS1YWC0tWC0tWC0tWFwiLCBcIi0tLS1YWC0tWC0tWC0tWFwiLCBcIi0tLS1YWC0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS1YWC0tWC0tWC0tWFwiLCBcIi0tLS1YWC0tWC0tWC0tWFwiLCBcIiYtLS1YWC0tWC0tWC0tWFwiLCBcIi0tLS1YWC0tWC0tWC0tWFwiLCBcIi0tLS0jLS0tJi0tJi0tJlwiXSwgXCIwXzZfMVwiOiBbXCItLS0tIy0tLVgtLVgtLVhcIiwgXCJcXFxcXFxcXC0tWFgtLVgtLVgtLVhcIiwgXCIvLy0tWFgtLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCImLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tIy0tLSYtLSYtLSZcIl0sIFwiMF82XzJcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKlgtLVhYLS0tLS0tLS0tXCIsIFwiWFgtLS0tLS1YLS0tWC0tXCIsIFwiLS0tLVhYLS1YLS0tWC0tXCIsIFwiLS0tLS0tLS1YWFhYWC0tXCIsIFwiLS0tLVhYLS1YLS0tWC0tXCIsIFwiLS0tLS0tLS1YLS0tWC0tXCIsIFwiLS0tLVhYLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjBfNV8wXCI6IFtcIi0tLS0jLS0tWC0tWC0tWFwiLCBcIlxcXFxcXFxcLS1YWC0tWC0tWC0tWFwiLCBcIi8vLS1YWC0tWC0tWC0tWFwiLCBcIi0tLS1YWC0tWC0tWC0tWFwiLCBcIi0tLS1YWC0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS1YWC0tWC0tWC0tWFwiLCBcIi0tLS1YWC0tWC0tWC0tLVwiLCBcIiYtLS1YWC0tWC0tWC0tLVwiLCBcIi0tLS1YWC0tWC0tWC0tWFwiLCBcIi0tLS0jLS0tJi0tJi0tWFwiXSwgXCIwXzVfMVwiOiBbXCItLS0tIy0tLVgtLVgtLVhcIiwgXCJcXFxcXFxcXC0tWFgtLVgtLVgtLVhcIiwgXCIvLy0tWFgtLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLS1cIiwgXCImLS0tWFgtLVgtLVgtLS1cIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tIy0tLSYtLSYtLVhcIl0sIFwiMF81XzJcIjogW1wiLS0tLS0tLS0tWC0tLS0tXCIsIFwiL1xcXFxcXFxcLVgtLS0tWC0vL1xcXFxcXFxcXCIsIFwiXFxcXC8vLVgtLS0tWC1cXFxcXFxcXC8vXCIsIFwiLS0tLVgtLS0tWC0tLS0tXCIsIFwiJi0tLVgtLS0tLS0tLS0tXCIsIFwiWFhYWFgtLS0tLS0tLS0tXCIsIFwiJi0tLVgtLS0tLS0tLS0tXCIsIFwiLS0tLVgtLS0tWC0tLS0tXCIsIFwiL1xcXFxcXFxcLVgtLS0tWC0vL1xcXFxcXFxcXCIsIFwiXFxcXC8vLVgtLS0tWC1cXFxcXFxcXC8vXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCJdLCBcIjFfNl8wXCI6IFtcIi0tLS0tLS0tLS1YWFhYWFwiLCBcIi0tLS0tLS0tLS1YWFhYWFwiLCBcIi0tLS0tLS0tLS1YWFhYWFwiLCBcIi0tLS0tLS0tLS1YWFhYWFwiLCBcIi0tLS0tLS0tLS1YWFhYWFwiLCBcIi0tLSMtLSYtLS1YWFhYWFwiLCBcIi0tLS0tLS0tLS1YWFgtLVwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS0tLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS1YWFwiLCBcIi0tLS0tLS0tLS1YWFhYWFwiLCBcIiotLS0tLS0tLS1YWFhYWFwiXSwgXCIxXzZfMVwiOiBbXCItLS0tLS0tLS0tWFhYWFhcIiwgXCItLS0tLS0tLS0tWFhYWFhcIiwgXCItLS0tLS0tLS0tWFhYWFhcIiwgXCItLS0tLS0tLS0tWFhYWFhcIiwgXCItLS0tLS0tLS0tWFhYWFhcIiwgXCItLS0jLS0mLS0tWFhYWFhcIiwgXCItLS0tLS0tLS0tWFhYLS1cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tLS1cIiwgXCJcXFxcLy8tLS0tLS0tLS0tWFhcIiwgXCItLS0tLS0tLS0tWFhYWFhcIiwgXCIqLS0tLS0tLS0tWFhYWFhcIl0sIFwiMV82XzJcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVgtLS0tLS0tWC0tLS0tXCIsIFwiLVgtLVgtLS0tWC0tLS0tXCIsIFwiLVgtLVgtLS0tWC0tLS0tXCIsIFwiLS0tLVgtLS0tWC0tLS0tXCIsIFwiLS0tLVgtLS0tLS0tLS0tXCIsIFwiLS0tLVgtLS0tLS0tLS0vXCIsIFwiLVgtLVhYLS0tLS0tLS1cXFxcXCIsIFwiLVgtLVhYWC0tLS0tLS0tXCIsIFwiLVgtJiojWC0tJi0tLS0tXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjNfMl8wXCI6IFtcIi0tLS0tLSMtLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS1eLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS1eLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLSMtLS0tLS0mLS1eLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLVhYLS0tLS1eLVwiLCBcIlxcXFwvLy0tLVhYLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS1eLVwiLCBcIiotLS0tLSMtLS0tLS0tLVwiXSwgXCIzXzJfMVwiOiBbXCItLS0tLS0jLS0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tXi1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tXi1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0jLS0tLS0tJi0tXi1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS1YWC0tLS0tXi1cIiwgXCJcXFxcLy8tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tXi1cIiwgXCIqLS0tLS0jLS0tLS0tLS1cIl0sIFwiM18wXzBcIjogW1wiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLSMtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tIy0tLS0tJi0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tKi0tLS0tLS0vXCIsIFwiKi0tLS0tLS0tLS0tLS1cXFxcXCJdLCBcIjNfMF8xXCI6IFtcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0jLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSMtLS0tLSYtLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS0tLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSotLS0tLS0tL1wiLCBcIiotLS0tLS0tLS0tLS0tXFxcXFwiXSwgXCIzXzBfMlwiOiBbXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tIy0tLS1cIiwgXCIqLS0tIy0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tIy0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS8vXFxcXFxcXFwtLS0tLS1cIiwgXCItLS0tLVxcXFxcXFxcLy8tLS0tLS1cIl0sIFwiMl8xXzBcIjogW1wiLS0tLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiLS0tIy0tLS0tWC0tJi0tXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tWC0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tKi0tWC0tLS0tXCIsIFwiKi0tLS0tLS0tJi0tLS0tXCJdLCBcIjJfMV8xXCI6IFtcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLSMtLS0tLVgtLSYtLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi9cXFxcXFxcXC0tLS0tLVgtLS0tLVwiLCBcIlxcXFwvLy0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLSotLVgtLS0tLVwiLCBcIiotLS0tLS0tLSYtLS0tLVwiXSwgXCIxXzRfMFwiOiBbXCItLS0tLS0tLS1YLS0tWFhcIiwgXCItLS0tLS0tLS1YLS0tWFhcIiwgXCItLS0tLS0tLS1YLS0tWFhcIiwgXCItLS0tLS0tLS1YLS0tWFhcIiwgXCItLS0tLS0tLS1YLS0tWFhcIiwgXCItLS0jLS0mLS1YLS0tWFhcIiwgXCItLS0tLS0tLS1YLS0tWFhcIiwgXCIvXFxcXFxcXFwtLS0tLS1YLS0tLS1cIiwgXCJcXFxcLy8tLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0tLS1YLS0tWFhcIiwgXCIqLS0tLS0tLS0mLS0tWFhcIl0sIFwiMV80XzFcIjogW1wiLS0tLS0tLS0tWC0tLVhYXCIsIFwiLS0tLS0tLS0tWC0tLVhYXCIsIFwiLS0tLS0tLS0tWC0tLVhYXCIsIFwiLS0tLS0tLS0tWC0tLVhYXCIsIFwiLS0tLS0tLS0tWC0tLVhYXCIsIFwiLS0tIy0tJi0tWC0tLVhYXCIsIFwiLS0tLS0tLS0tWC0tLVhYXCIsIFwiL1xcXFxcXFxcLS0tLS0tWC0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLVhYXCIsIFwiKi0tLS0tLS0tJi0tLVhYXCJdLCBcIjFfNF8yXCI6IFtcIi0tLVhYWC0tWC0tLS1eXlwiLCBcIi0tLVhYWC0tWC0tLS1eXlwiLCBcIi0tLS0mLS0tWC0tLS1eXlwiLCBcIi0tLS0tLS0tWC0tLS1eXlwiLCBcIlgtLVhYWC0tWC0tLS0tLVwiLCBcIlgtLVhYWC0tWC0mLS0tLVwiLCBcIlgtLVhYWC0tWC0tLS1eXlwiLCBcIi0tLVhYWC0tWC0tLS1eXlwiLCBcIi0tLVhYWC0tWC0tLS1eXlwiLCBcIi0tLVhYWC0tWC0tLS1eXlwiLCBcIi0tLVhYWC0tLS0tLS1eXlwiXSwgXCIxXzVfMFwiOiBbXCItLS0tLS0tLS1YLS1YWFhcIiwgXCItLS0tLS0tLS1YLS1YWFhcIiwgXCItLS0tLS0tLS1YLS1YWFhcIiwgXCItLS0tLS0tLS1YLS1YWFhcIiwgXCItLS0tLS0tLS1YLS1YWFhcIiwgXCItLS0jLS0mLS1YLS1YWFhcIiwgXCItLS0tLS0tLS1YLS1YWFhcIiwgXCIvXFxcXFxcXFwtLS0tLS1YLS0tLS1cIiwgXCJcXFxcLy8tLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0tLS1YLS1YWC1cIiwgXCIqLS0tLS0tLS0mLS1YWFhcIl0sIFwiMV81XzFcIjogW1wiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tIy0tJi0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tWFhYXCIsIFwiL1xcXFxcXFxcLS0tLS0tWC0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tWFgtXCIsIFwiKi0tLS0tLS0tJi0tWFhYXCJdLCBcIjFfM18wXCI6IFtcIi0tLS0tLS0tLVgtLVgtLVwiLCBcIi0tLS0tLS0tLVgtLVgtLVwiLCBcIi0tLS0tLS0tLVgtLVgtLVwiLCBcIi0tLS0tLS0tLVgtLVgtLVwiLCBcIi0tLS0tLS0tLVgtLVgtLVwiLCBcIi0tLSMtLSYtLVgtLVgtLVwiLCBcIi0tLS0tLS0tLVgtLVgtLVwiLCBcIi9cXFxcXFxcXC0tLS0tLVgtLVgtLVwiLCBcIlxcXFwvLy0tLS0tLVgtLVgtLVwiLCBcIi0tLS0tLS0tLVgtLVgtLVwiLCBcIiotLS0tLS0tLSYtLSYtLVwiXSwgXCIxXzNfMVwiOiBbXCItLS0tLS0tLS1YLS1YLS1cIiwgXCItLS0tLS0tLS1YLS1YLS1cIiwgXCItLS0tLS0tLS1YLS1YLS1cIiwgXCItLS0tLS0tLS1YLS1YLS1cIiwgXCItLS0tLS0tLS1YLS1YLS1cIiwgXCItLS0jLS0mLS1YLS1YLS1cIiwgXCItLS0tLS0tLS1YLS1YLS1cIiwgXCIvXFxcXFxcXFwtLS0tLS1YLS1YLS1cIiwgXCJcXFxcLy8tLS0tLS1YLS1YLS1cIiwgXCItLS0tLS0tLS1YLS1YLS1cIiwgXCIqLS0tLS0tLS0mLS0mLS1cIl0sIFwiMV8zXzJcIjogW1wiLS0tJi0tLS0tLS0tLS0tXCIsIFwiLS0tWC0tWC0tLS0tIy0tXCIsIFwiLS0tWC0tWC0tLS0tLS0tXCIsIFwiLS0tWC0tWC0tLS0tLS0tXCIsIFwiLS0tWC0tWC0tLS0tKi0tXCIsIFwiLS0tWC0tWFhYWFhYWFhYXCIsIFwiLS0tWC0tWC0tJi0tKi0tXCIsIFwiLS0tWC0tWC0tLS0tLS0tXCIsIFwiLS0tWC0tWC0tLS0tLS0tXCIsIFwiLS0tWC0tWC0tLS0tIy0tXCIsIFwiLS0tWC0tLS0tLS0tLS0tXCJdLCBcIjJfNF8wXCI6IFtcIi0tLS0tLSMtLS1YLS0tWFwiLCBcIi0tLS0tLVhYLS1YLS0tWFwiLCBcIi0tLS0tLVhYLS1YLS0tWFwiLCBcIi0tLS0tLVhYLS1YLS0tWFwiLCBcIi0tLS0tLVhYLS1YLS0tWFwiLCBcIi0tLSMtLS0tLS1YLS0tWFwiLCBcIi0tLS0tLVhYLS1YLS0tWFwiLCBcIi9cXFxcXFxcXC0tLVhYLS1YLS0tLVwiLCBcIlxcXFwvLy0tLVhYLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS0tWFwiLCBcIiotLS0tLSMtLS0mLS0tWFwiXSwgXCIyXzRfMVwiOiBbXCItLS0tLS0jLS0tWC0tLVhcIiwgXCItLS0tLS1YWC0tWC0tLVhcIiwgXCItLS0tLS1YWC0tWC0tLVhcIiwgXCItLS0tLS1YWC0tWC0tLVhcIiwgXCItLS0tLS1YWC0tWC0tLVhcIiwgXCItLS0jLS0tLS0tWC0tLVhcIiwgXCItLS0tLS1YWC0tWC0tLVhcIiwgXCIvXFxcXFxcXFwtLS1YWC0tWC0tLS1cIiwgXCJcXFxcLy8tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tLVhcIiwgXCIqLS0tLS0jLS0tJi0tLVhcIl0sIFwiMl80XzJcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLVgtXCIsIFwiKlgtLS0tLS0tLS0tLVgtXCIsIFwiWFgtLS0tLS0tLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS1eLS0tLV4tLS0tXCIsIFwiLS0tLS1eLS0tLV4tLS0tXCIsIFwiLS0tLS1eLS0tLV4tLSYtXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjBfNF8wXCI6IFtcIi0tLS0jLS0tWC0tWC0tLVwiLCBcIlxcXFxcXFxcLS1YWC0tWC0tWC0tLVwiLCBcIi8vLS1YWC0tWC0tWC0tLVwiLCBcIi0tLS1YWC0tWC0tWC0tLVwiLCBcIi0tLS1YWC0tWC0tWC0tLVwiLCBcIi0tLS0tLS0tWC0tWC0tJlwiLCBcIi0tLS1YWC0tWC0tWC0tLVwiLCBcIi0tLS1YWC0tWC0tWC0tLVwiLCBcIiYtLS1YWC0tWC0tWC0tLVwiLCBcIi0tLS1YWC0tWC0tWC0tLVwiLCBcIi0tLS0jLS0tJi0tJi0tLVwiXSwgXCIwXzRfMVwiOiBbXCItLS0tIy0tLVgtLVgtLS1cIiwgXCJcXFxcXFxcXC0tWFgtLVgtLVgtLS1cIiwgXCIvLy0tWFgtLVgtLVgtLS1cIiwgXCItLS0tWFgtLVgtLVgtLS1cIiwgXCItLS0tWFgtLVgtLVgtLS1cIiwgXCItLS0tLS0tLVgtLVgtLSZcIiwgXCItLS0tWFgtLVgtLVgtLS1cIiwgXCItLS0tWFgtLVgtLVgtLS1cIiwgXCImLS0tWFgtLVgtLVgtLS1cIiwgXCItLS0tWFgtLVgtLVgtLS1cIiwgXCItLS0tIy0tLSYtLSYtLS1cIl0sIFwiMF80XzJcIjogW1wiXi0tLS0tLS0tWFgtLS0tXCIsIFwiLS0tLS0tWC0tWFgtLS0tXCIsIFwiXi0tLS0tWC0tWFgtLS0tXCIsIFwiXi0tWC0tWC0tWFgtLS0tXCIsIFwiXi0tWC0tWC0tLS0tLS0tXCIsIFwiXi0tWFhYWC0tLS0tLS0tXCIsIFwiXi0tWC0tWC0tWFgtLS0tXCIsIFwiXi0tWC0tWC0tWFgtLS0tXCIsIFwiXi0tLS0tWC0tWFgtLS0tXCIsIFwiLS0tLS0tWC0tWFgtLS0tXCIsIFwiXi0tLS0tLS0tWFgtLS0tXCJdLCBcIjdfMV8wXCI6IFtcIi0tLS0tLS0tLS0tXl5eXlwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS1YWFwiLCBcIi0tLSMtLS0tLS0tLS1YI1wiLCBcIi0tLS0tLS0tLS0tLS1YWFwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS0tWFwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSotLS0tLS0tLVwiLCBcIiotLS0tLS0tLS0tXl5eXlwiXSwgXCI3XzFfMVwiOiBbXCItLS0tLS0tLS0tLV5eXl5cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCItLS0jLS0tLS0tLS0tWCNcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tLVhcIiwgXCJcXFxcLy8tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0qLS0tLS0tLS1cIiwgXCIqLS0tLS0tLS0tLV5eXl5cIl0sIFwiN18xXzJcIjogW1wiWFhYWC0tXl5eXl4tXi1eXCIsIFwiLS0tLS0tLS1eLS0tXi1eXCIsIFwiWC0tLS0tLS1eLS0tLS1eXCIsIFwiWC0tLS0tLS1eLS0tLS0tXCIsIFwiWC0tLS0tLS1eLS0tLS0tXCIsIFwiKiYtLS0tLS0tLS0tLS0tXCIsIFwiWC0tLS0tLS0mLS0tLS0tXCIsIFwiWC0tLS0tLS0tLS0tLS0tXCIsIFwiWC0tLS0tLS0tLS0tLS1eXCIsIFwiLS0tLS0tLS0tLS0tXi1eXCIsIFwiWFhYWC0tXl5eXl4tXi1eXCJdLCBcIjZfMF8wXCI6IFtcIi0tLS0tLS0tLS0tLV4tLVwiLCBcIi0tLS0tLS0tLS0tLV4tLVwiLCBcIi0tLS0tLS0tLS0tLV4tLVwiLCBcIi0tLS0tLS0tLS0tLV5eXlwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSMtLS0tLSYtLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS0tLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS0jLVwiLCBcIi0tLS0tLSotLS0tLS0tLVwiLCBcIiotLS0tLS0tLS0tLS0tLVwiXSwgXCI2XzBfMVwiOiBbXCItLS0tLS0tLS0tLS1eLS1cIiwgXCItLS0tLS0tLS0tLS1eLS1cIiwgXCItLS0tLS0tLS0tLS1eLS1cIiwgXCItLS0tLS0tLS0tLS1eXl5cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0jLS0tLS0mLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tLS1cIiwgXCJcXFxcLy8tLS0tLS0tLS0tIy1cIiwgXCItLS0tLS0qLS0tLS0tLS1cIiwgXCIqLS0tLS0tLS0tLS0tLS1cIl0sIFwiNl8wXzJcIjogW1wiWC0tXl5eLS0tLV5eXi0tXCIsIFwiLS0tXl5eLS0tLV5eXi0tXCIsIFwiWC0tLSYtLS0tLV5eXi0tXCIsIFwiLS0tXl5eLS0tLV5eXi0tXCIsIFwiWC0tXl5eLS0tLS0mLS0tXCIsIFwiLS0tXl5eLS0tLS0tLS0tXCIsIFwiWC0tXl5eLS0tLV5eXi0tXCIsIFwiLS0tXl5eLS0tLV5eXi0tXCIsIFwiWC0tLSotLS0tLV5eXi0tXCIsIFwiLS0tXl5eLS0tLV5eXi0tXCIsIFwiWC0tXl5eLS0tLV5eXi0tXCJdLCBcIjE1XzNfMFwiOiBbXCItLV5eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS1eLS0tLS1cIiwgXCItLS0tLS1YLS1eLS0tLVhcIiwgXCItLS0tLVhYLS1eLS0tWFhcIiwgXCItLS0tWFhYLS1eLS1YWFhcIiwgXCItLS0tWCMqLS0tLS1YIypcIiwgXCItLS0tWFhYLS0mLS1YWFhcIiwgXCItLS0tLVhYLS0tLS0tWFhcIiwgXCItLS0tLS1YLS0tLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLV5eXl5eXl5eXl5eXl5cIl0sIFwiMTVfM18xXCI6IFtcIi0tXl5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLV4tLS0tLVwiLCBcIi0tLS0tLVgtLV4tLS0tWFwiLCBcIi0tLS0tWFgtLV4tLS1YWFwiLCBcIi0tLS1YWFgtLV4tLVhYWFwiLCBcIi0tLS1YIyotLS0tLVgjKlwiLCBcIi0tLS1YWFgtLSYtLVhYWFwiLCBcIi0tLS0tWFgtLS0tLS1YWFwiLCBcIi0tLS0tLVgtLS0tLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tXl5eXl5eXl5eXl5eXlwiXSwgXCIxNV8zXzJcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tXi0tXCIsIFwiLS0tLVgtLS0tLS0tXi0tXCIsIFwiWFgtLVhYLS0tLS0tXi0tXCIsIFwiKlgtLVhYWC0tLS0tLS0tXCIsIFwiJi0tLSojWC0tLS0tLS0tXCIsIFwiKlgtLVhYWC0tLS0tLS0tXCIsIFwiWFgtLVhYLS0tLS0tLS0tXCIsIFwiXFxcXFxcXFwtLVgtLS0tWC0tLS0tXCIsIFwiLy8tLS0tLS0tWC0tLS0tXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjE2XzJfMFwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS0tWC0tWC0tLS0tLSpcIiwgXCItWC0tWC0tWC0tLS0tLS1cIiwgXCItWC0tWC0tWC0tLS0tXl5cIiwgXCItWC0tWC0tWC0tXl5eXl5cIiwgXCIjWC0jWC0jWC0tLS0tLSZcIiwgXCItWC0tWC0tWC0tXl5eXl5cIiwgXCItWC0tWC0tWC0tLS0tXl5cIiwgXCItWC0tWC0tWC0tLS0tLS1cIiwgXCItWC0tLS0tLS0tLS0tLSpcIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTZfMl8xXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIi0tLS1YLS1YLS0tLS0tKlwiLCBcIi1YLS1YLS1YLS0tLS0tLVwiLCBcIi1YLS1YLS1YLS0tLS1eXlwiLCBcIi1YLS1YLS1YLS1eXl5eXlwiLCBcIiNYLSNYLSNYLS0tLS0tJlwiLCBcIi1YLS1YLS1YLS1eXl5eXlwiLCBcIi1YLS1YLS1YLS0tLS1eXlwiLCBcIi1YLS1YLS1YLS0tLS0tLVwiLCBcIi1YLS0tLS0tLS0tLS0tKlwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCI1XzJfMFwiOiBbXCItLS0tLS0jLS0tLV5eXi1cIiwgXCItLS0tLS1YWC0tLV5eXi1cIiwgXCItLS0tLS1YWC0tLV5eXi1cIiwgXCItLS0tLS1YWC0tLV5eXi1cIiwgXCItLS0tLS1YWC0tLV5eXi1cIiwgXCItLS0jLS0tLS0tLV5eXi1cIiwgXCItLS0tLS1YWC0tLV5eXi1cIiwgXCIvXFxcXFxcXFwtLS1YWC0tLV5eXi1cIiwgXCJcXFxcLy8tLS1YWC0tLS0mLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCIqLS0tLS0jLS0tLV5eXi1cIl0sIFwiNV8yXzFcIjogW1wiLS0tLS0tIy0tLS1eXl4tXCIsIFwiLS0tLS0tWFgtLS1eXl4tXCIsIFwiLS0tLS0tWFgtLS1eXl4tXCIsIFwiLS0tLS0tWFgtLS1eXl4tXCIsIFwiLS0tLS0tWFgtLS1eXl4tXCIsIFwiLS0tIy0tLS0tLS1eXl4tXCIsIFwiLS0tLS0tWFgtLS1eXl4tXCIsIFwiL1xcXFxcXFxcLS0tWFgtLS1eXl4tXCIsIFwiXFxcXC8vLS0tWFgtLS0tJi0tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiKi0tLS0tIy0tLS1eXl4tXCJdLCBcIjEzXzBfMFwiOiBbXCItLS1eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0qLS0tLSpcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLV5eXi0tXl5cIiwgXCItLS0tLS1eXl5eXl5eXl5cIiwgXCIjLS0tLS0tLS0mLS0tLSZcIiwgXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLV5eXi0tXl5cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0qLS0tLSpcIiwgXCItLS1eXl5eXl5eXl5eXl5cIl0sIFwiMTNfMF8xXCI6IFtcIi0tLV5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLSotLS0tKlwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tXl5eLS1eXlwiLCBcIi0tLS0tLV5eXl5eXl5eXlwiLCBcIiMtLS0tLS0tLSYtLS0tJlwiLCBcIi0tLS0tLV5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tXl5eLS1eXlwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLSotLS0tKlwiLCBcIi0tLV5eXl5eXl5eXl5eXlwiXSwgXCIxM18wXzJcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLV5eXl5eXl5eXl5eXl5eXCIsIFwiLV5eXl5eXl5eLS0tLV5eXCIsIFwiLV5eXl5eXi0tLS0tLS0tXCIsIFwiLV5eXi0tLS0tLS0tLS0tXCIsIFwiLS0mLS0tLS0tLS0tLS0tXCIsIFwiLV5eXi0tLS0tLS0tLS0tXCIsIFwiLV5eXl5eXi0tLS0tLS0tXCIsIFwiLV5eXl5eXl5eLS0tLV5eXCIsIFwiLV5eXl5eXl5eXl5eXl5eXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjEyXzBfMFwiOiBbXCItLS0tXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0qLS0tLSpcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLV5eXi0tXl5cIiwgXCItLS0tLS1eXl5eXl5eXl5cIiwgXCIjLS0tLS0tLS0mLS0tLSZcIiwgXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLV5eXi0tXl5cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0qLS0tLSpcIiwgXCItLS0tXl5eXl5eXl5eXl5cIl0sIFwiMTJfMF8xXCI6IFtcIi0tLS1eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLSotLS0tKlwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tXl5eLS1eXlwiLCBcIi0tLS0tLV5eXl5eXl5eXlwiLCBcIiMtLS0tLS0tLSYtLS0tJlwiLCBcIi0tLS0tLV5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tXl5eLS1eXlwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLSotLS0tKlwiLCBcIi0tLS1eXl5eXl5eXl5eXlwiXSwgXCI5XzFfMFwiOiBbXCItLS0tLS0tLV5eXl5eXl5cIiwgXCItLS0tLS0tLS0tXi0tLS1cIiwgXCItLS0tLS0tLS0tXi0tWC1cIiwgXCItLS0tLS0tLS0tXi0tWFhcIiwgXCItLS0tLS0tLS0tXi0tWFhcIiwgXCItLS0jLS0tLS0tLS0tKiNcIiwgXCItLS0tLS0tLS0tJi0tWFhcIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tWFhcIiwgXCJcXFxcLy8tLS0tLS0tLS0tWC1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIqLS0tLS0tLV5eXl5eXl5cIl0sIFwiOV8xXzFcIjogW1wiLS0tLS0tLS1eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLV4tLS0tXCIsIFwiLS0tLS0tLS0tLV4tLVgtXCIsIFwiLS0tLS0tLS0tLV4tLVhYXCIsIFwiLS0tLS0tLS0tLV4tLVhYXCIsIFwiLS0tIy0tLS0tLS0tLSojXCIsIFwiLS0tLS0tLS0tLSYtLVhYXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLVhYXCIsIFwiXFxcXC8vLS0tLS0tLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tLS1eXl5eXl5eXCJdLCBcIjlfMV8yXCI6IFtcIl5eXl5eXl5eXl5eLS0tLVwiLCBcIiYtLS0tJi0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIl5eLS1eXl4tLS0tLS1YWFwiLCBcIl5eXl5eXl5eXi0tLS1YWFwiLCBcIi0tLS0tLS0tLS0tLS1YWFwiLCBcIl5eXl5eXl5eXi0tLS1YWFwiLCBcIl5eLS1eXl4tLS0tLS1YWFwiLCBcIi0tLS0tLS0tLS0tLS1YWFwiLCBcIiYtLS0tJi0tLS0tLS1YWFwiLCBcIl5eXl5eXl5eXl5eLS1YWFwiXSwgXCI5XzJfMFwiOiBbXCItLS0tLS0tXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tLVgtLVhcIiwgXCItLS0tLS0tLS0tLVgtLVhcIiwgXCItLS0tLS0tLS0tLVgtLVhcIiwgXCItLS0tLS0tLS0tLVgtLVhcIiwgXCItLS0jLS0tLS0tLVgtI1hcIiwgXCItLS0tLS0tLS0tLVgtLVhcIiwgXCIvXFxcXFxcXFwtLS0tLS0tLVgtLVhcIiwgXCJcXFxcLy8tLS0tLS0tLVgtLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIqLS0tLS0tXl5eXl5eXl5cIl0sIFwiOV8yXzFcIjogW1wiLS0tLS0tLV5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tIy0tLS0tLS1YLSNYXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS1YLS1YXCIsIFwiXFxcXC8vLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tLV5eXl5eXl5eXCJdLCBcIjEwXzFfMFwiOiBbXCItLS0tLS0tXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tXi0tLS1cIiwgXCItLS0tLS0tLS0tXi0tWC1cIiwgXCItLS0tLS0tLS0tXi0tWFhcIiwgXCItLS0tLS0tLS0tXi0tWFhcIiwgXCItLS0jLS0tLS0tLS0tKiNcIiwgXCItLS0tLS0tLS0tJi0tWFhcIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tWFhcIiwgXCJcXFxcLy8tLS0tLS0tLS0tWC1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIqLS0tLS0tXl5eXl5eXl5cIl0sIFwiMTBfMV8xXCI6IFtcIi0tLS0tLS1eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS1eLS0tLVwiLCBcIi0tLS0tLS0tLS1eLS1YLVwiLCBcIi0tLS0tLS0tLS1eLS1YWFwiLCBcIi0tLS0tLS0tLS1eLS1YWFwiLCBcIi0tLSMtLS0tLS0tLS0qI1wiLCBcIi0tLS0tLS0tLS0mLS1YWFwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS1YWFwiLCBcIlxcXFwvLy0tLS0tLS0tLS1YLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiotLS0tLS1eXl5eXl5eXlwiXSwgXCI1XzBfMFwiOiBbXCItLS0tLS0tLS0tLS0tLV5cIiwgXCItLS0tLS0tLS0tLS1eLSpcIiwgXCItLS0tLS0tLS0tLS0tLV5cIiwgXCItLS0tLS0tLS0tLS1eLS1cIiwgXCItLS0tLS0tLS0tLS0tLV5cIiwgXCItLS0jLS0tLS0mLS1eLSZcIiwgXCItLS0tLS0tLS0tLS0tLV5cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS1eLS1cIiwgXCJcXFxcLy8tLS0tLS0tLS0tLV5cIiwgXCItLS0tLS0qLS0tLS1eLSpcIiwgXCIqLS0tLS0tLS0tLS0tLV5cIl0sIFwiNV8wXzFcIjogW1wiLS0tLS0tLS0tLS0tLS1eXCIsIFwiLS0tLS0tLS0tLS0tXi0qXCIsIFwiLS0tLS0tLS0tLS0tLS1eXCIsIFwiLS0tLS0tLS0tLS0tXi0tXCIsIFwiLS0tLS0tLS0tLS0tLS1eXCIsIFwiLS0tIy0tLS0tJi0tXi0mXCIsIFwiLS0tLS0tLS0tLS0tLS1eXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tXi0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS1eXCIsIFwiLS0tLS0tKi0tLS0tXi0qXCIsIFwiKi0tLS0tLS0tLS0tLS1eXCJdLCBcIjVfMF8yXCI6IFtcIi0tLV4tLS1eLS0tLS0tLVwiLCBcIi1eLSotXi0tLV4tLS0tLVwiLCBcIi0tLV4tLS1eLS0tLS0tLVwiLCBcIi1eLS0tXi0tLV4tLS0tLVwiLCBcIi0tLV4tLS1eLS0tLS0tLVwiLCBcIi1eLSYtXi0tLV4tLS0tLVwiLCBcIi0tLV4tLS1eLS0tLS0tLVwiLCBcIi1eLS0tXi0tLV4tLS0tLVwiLCBcIi0tLV4tLS1eLS0tLS0tLVwiLCBcIi1eLSotXi0tLV4tLS0tLVwiLCBcIi0tLV4tLS1eLS0tLS0tLVwiXSwgXCI2XzRfMFwiOiBbXCItLS0tLS1YWFgtLV5eXl5cIiwgXCItLS0tLS1YWFgtLS0tLS1cIiwgXCItLS0tLS1YWFgtLS0tLS1cIiwgXCItLS0tLS1YWFgtLS0tLVhcIiwgXCItLS0tLS1YWFgtLS0tWFhcIiwgXCItLS0jLS1YWFgtLS0tWCNcIiwgXCItLS0tLS1YWFgtLS0tWFhcIiwgXCIvXFxcXFxcXFwtLS1YWFgtLS0tLVhcIiwgXCJcXFxcLy8tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIqLS0tLS1YWFgtLV5eXl5cIl0sIFwiNl80XzFcIjogW1wiLS0tLS0tWFhYLS1eXl5eXCIsIFwiLS0tLS0tWFhYLS0tLS0tXCIsIFwiLS0tLS0tWFhYLS0tLS0tXCIsIFwiLS0tLS0tWFhYLS0tLS1YXCIsIFwiLS0tLS0tWFhYLS0tLVhYXCIsIFwiLS0tIy0tWFhYLS0tLVgjXCIsIFwiLS0tLS0tWFhYLS0tLVhYXCIsIFwiL1xcXFxcXFxcLS0tWFhYLS0tLS1YXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tWFhYLS1eXl5eXCJdLCBcIjZfMl8wXCI6IFtcIi0tLS0tLSMtLS1eXl4tLVwiLCBcIi0tLS0tLVhYLS1eXl4tLVwiLCBcIi0tLS0tLVhYLS1eXl4tLVwiLCBcIi0tLS0tLVhYLS1eXl4tLVwiLCBcIi0tLS0tLVhYLS0tKi0tLVwiLCBcIi0tLSMtLS0tLS1eXl4tLVwiLCBcIi0tLS0tLVhYLS0tJi0tLVwiLCBcIi9cXFxcXFxcXC0tLVhYLS1eXl4tLVwiLCBcIlxcXFwvLy0tLVhYLS1eXl4tLVwiLCBcIi0tLS0tLVhYLS1eXl4tLVwiLCBcIiotLS0tLSMtLS1eXl4tLVwiXSwgXCI2XzJfMVwiOiBbXCItLS0tLS0jLS0tXl5eLS1cIiwgXCItLS0tLS1YWC0tXl5eLS1cIiwgXCItLS0tLS1YWC0tXl5eLS1cIiwgXCItLS0tLS1YWC0tXl5eLS1cIiwgXCItLS0tLS1YWC0tLSotLS1cIiwgXCItLS0jLS0tLS0tXl5eLS1cIiwgXCItLS0tLS1YWC0tLSYtLS1cIiwgXCIvXFxcXFxcXFwtLS1YWC0tXl5eLS1cIiwgXCJcXFxcLy8tLS1YWC0tXl5eLS1cIiwgXCItLS0tLS1YWC0tXl5eLS1cIiwgXCIqLS0tLS0jLS0tXl5eLS1cIl0sIFwiMl82XzBcIjogW1wiLS0tLS0tIy0tLVgtLVhYXCIsIFwiLS0tLS0tWFgtLVgtLVhYXCIsIFwiLS0tLS0tWFgtLVgtLVhYXCIsIFwiLS0tLS0tWFgtLVgtLVhYXCIsIFwiLS0tLS0tWFgtLVgtLVhYXCIsIFwiLS0tIy0tLS0tLVgtLVhYXCIsIFwiLS0tLS0tWFgtLVgtLVhYXCIsIFwiL1xcXFxcXFxcLS0tWFgtLVgtLS0tXCIsIFwiXFxcXC8vLS0tWFgtLVgtLS0tXCIsIFwiLS0tLS0tWFgtLVgtLVhYXCIsIFwiKi0tLS0tIy0tLSYtLVhYXCJdLCBcIjJfNl8xXCI6IFtcIi0tLS0tLSMtLS1YLS1YWFwiLCBcIi0tLS0tLVhYLS1YLS1YWFwiLCBcIi0tLS0tLVhYLS1YLS1YWFwiLCBcIi0tLS0tLVhYLS1YLS1YWFwiLCBcIi0tLS0tLVhYLS1YLS1YWFwiLCBcIi0tLSMtLS0tLS1YLS1YWFwiLCBcIi0tLS0tLVhYLS1YLS1YWFwiLCBcIi9cXFxcXFxcXC0tLVhYLS1YLS0tLVwiLCBcIlxcXFwvLy0tLVhYLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS1YWFwiLCBcIiotLS0tLSMtLS0mLS1YWFwiXSwgXCIyXzZfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItWC0tIy0tLS0tLS0tLS1cIiwgXCItWC0tWC0tLS0tLVgtLS1cIiwgXCItLS0tWC0tLS0tLVhYLS1cIiwgXCItLS0tWC0tLS0tLVhYWC1cIiwgXCItLS0tWC0tLS0tJiojWC1cIiwgXCItLS0tWC0tLS0tLVhYWC1cIiwgXCItLS0tWC0tLS0tLVhYLS1cIiwgXCItLS0tWC0tLS0tLVgtLS1cIiwgXCItLS0tWC0tLS0tLS0tLS1cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMl83XzBcIjogW1wiLS0tLS0tIy0tLVhYWFhYXCIsIFwiLS0tLS0tWFgtLVhYWFhYXCIsIFwiLS0tLS0tWFgtLVhYWFhYXCIsIFwiLS0tLS0tWFgtLVhYWFhYXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiLS0tIy0tLS0tLS0tJi0tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tWFgtLVhYWFhYXCIsIFwiXFxcXC8vLS0tWFgtLVhYWFhYXCIsIFwiLS0tLS0tWFgtLVhYWFhYXCIsIFwiKi0tLS0tIy0tLVhYWFhYXCJdLCBcIjJfN18xXCI6IFtcIi0tLS0tLSMtLS1YWFhYWFwiLCBcIi0tLS0tLVhYLS1YWFhYWFwiLCBcIi0tLS0tLVhYLS1YWFhYWFwiLCBcIi0tLS0tLVhYLS1YWFhYWFwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLSMtLS0tLS0tLSYtLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLVhYLS1YWFhYWFwiLCBcIlxcXFwvLy0tLVhYLS1YWFhYWFwiLCBcIi0tLS0tLVhYLS1YWFhYWFwiLCBcIiotLS0tLSMtLS1YWFhYWFwiXSwgXCIyXzdfMlwiOiBbXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCJYWC0tLS0tLS0tLS0tLS1cIiwgXCJYWC0tLS0tLS0tLS0tLS1cIiwgXCJYWC0tLS0tLS0tLS0tLS1cIiwgXCJYWC0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLSMtLS0jLS0tLSNcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIl0sIFwiMl81XzBcIjogW1wiLS0tLS0tIy0tLVgtLVgtXCIsIFwiLS0tLS0tWFgtLVgtLVgtXCIsIFwiLS0tLS0tWFgtLVgtLVgtXCIsIFwiLS0tLS0tWFgtLVgtLVgtXCIsIFwiLS0tLS0tWFgtLVgtLVgtXCIsIFwiLS0tIy0tLS0tLVgtLVgtXCIsIFwiLS0tLS0tWFgtLVgtLVgtXCIsIFwiL1xcXFxcXFxcLS0tWFgtLVgtLVgtXCIsIFwiXFxcXC8vLS0tWFgtLVgtLVgtXCIsIFwiLS0tLS0tWFgtLVgtLVgtXCIsIFwiKi0tLS0tIy0tLSYtLSYtXCJdLCBcIjJfNV8xXCI6IFtcIi0tLS0tLSMtLS1YLS1YLVwiLCBcIi0tLS0tLVhYLS1YLS1YLVwiLCBcIi0tLS0tLVhYLS1YLS1YLVwiLCBcIi0tLS0tLVhYLS1YLS1YLVwiLCBcIi0tLS0tLVhYLS1YLS1YLVwiLCBcIi0tLSMtLS0tLS1YLS1YLVwiLCBcIi0tLS0tLVhYLS1YLS1YLVwiLCBcIi9cXFxcXFxcXC0tLVhYLS1YLS1YLVwiLCBcIlxcXFwvLy0tLVhYLS1YLS1YLVwiLCBcIi0tLS0tLVhYLS1YLS1YLVwiLCBcIiotLS0tLSMtLS0mLS0mLVwiXSwgXCIzXzZfMFwiOiBbXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0jLS0tLS0tLSYtLS1cIiwgXCItLS0tLS0tLS0tLS0tLSNcIiwgXCIvXFxcXFxcXFwtLS0tLS1YWFhYWFhcIiwgXCJcXFxcLy8tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0qLS1YWFhYWFhcIiwgXCIqLS0tLS0tLS1YWFhYWFhcIl0sIFwiM182XzFcIjogW1wiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tIy0tLS0tLS0mLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0jXCIsIFwiL1xcXFxcXFxcLS0tLS0tWFhYWFhYXCIsIFwiXFxcXC8vLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tKi0tWFhYWFhYXCIsIFwiKi0tLS0tLS0tWFhYWFhYXCJdLCBcIjNfNl8yXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS1YLS0tLS0tLVgtLVwiLCBcIi0tLS1YWC0tLS0tLVhYLVwiLCBcIi0tLS1YWFgtLS0tLVhYWFwiLCBcIi0tLSYqI1gtLS0tJiojWFwiLCBcIi0tLS1YWFgtLS0tLVhYWFwiLCBcIi0tLS1YWC0tLS0tLVhYLVwiLCBcIi0tLS1YLS0tLS0tLVgtLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIxXzdfMFwiOiBbXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0jLS0mLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tWFhcIiwgXCJcXFxcLy8tLS0tLS0tLS0tWFhcIiwgXCItLS0tLS0tLS1YWC0tLS1cIiwgXCIqLS0tLS0tLS1YWFhYWFhcIl0sIFwiMV83XzFcIjogW1wiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tIy0tJi0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLVhYXCIsIFwiXFxcXC8vLS0tLS0tLS0tLVhYXCIsIFwiLS0tLS0tLS0tWFgtLS0tXCIsIFwiKi0tLS0tLS0tWFhYWFhYXCJdLCBcIjFfN18yXCI6IFtcIlhYWFhYWFgtLS0tLS8vXFxcXFwiLCBcIlhYWFhYWFgtLS0tLVxcXFxcXFxcL1wiLCBcIlhYWFhYWFgtLS0tLS0tLVwiLCBcIi1YWFhYWFgtLS0tLS0tI1wiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tJi0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi1YWFhYWFgtLS0tLS0tLVwiLCBcIlhYWFhYWFgtLS0tIy0tLVwiLCBcIlhYWFhYWFgtLS0tLS0tLVwiLCBcIlhYWFhYWFgtLS0tLS0tLVwiXSwgXCIzXzVfMFwiOiBbXCItLS0tLS0tLS0tWFhYWFhcIiwgXCItLS0tLS0tLS0tWFhYWFhcIiwgXCItLS0tLS0tLS0tWFhYWFhcIiwgXCItLS0tLS0tLS0tWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0qLS1cIiwgXCItLS0jLS0mLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tIy1cIiwgXCIvXFxcXFxcXFwtLS0tLS0tWFhYWFhcIiwgXCJcXFxcLy8tLS0tLS0tWFhYWFhcIiwgXCItLS0tLS0tLS0tWFhYWFhcIiwgXCIqLS0tLS0tLS0tWFhYWFhcIl0sIFwiM181XzFcIjogW1wiLS0tLS0tLS0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tKi0tXCIsIFwiLS0tIy0tJi0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLSMtXCIsIFwiL1xcXFxcXFxcLS0tLS0tLVhYWFhYXCIsIFwiXFxcXC8vLS0tLS0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiKi0tLS0tLS0tLVhYWFhYXCJdLCBcIjE3XzRfMFwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS0tWC0tWC0tWC0tWC1cIiwgXCItWC0tWC0tWC0tWC0tWC1cIiwgXCItWC0tWC0tWC0tWC0tWC1cIiwgXCItWC0tWC0tWC0tWC0tWC1cIiwgXCIjWC0jWC0jWC0jWC0jWC1cIiwgXCItWC0tWC0tWC0tWC0tWC1cIiwgXCItWC0tWC0tWC0tWC0tWC1cIiwgXCItWC0tWC0tWC0tWC0tWC1cIiwgXCItWC0tLS0tLS0tLS0tLS1cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTdfNF8xXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIi0tLS1YLS1YLS1YLS1YLVwiLCBcIi1YLS1YLS1YLS1YLS1YLVwiLCBcIi1YLS1YLS1YLS1YLS1YLVwiLCBcIi1YLS1YLS1YLS1YLS1YLVwiLCBcIiNYLSNYLSNYLSNYLSNYLVwiLCBcIi1YLS1YLS1YLS1YLS1YLVwiLCBcIi1YLS1YLS1YLS1YLS1YLVwiLCBcIi1YLS1YLS1YLS1YLS1YLVwiLCBcIi1YLS0tLS0tLS0tLS0tLVwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxN181XzBcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS0mXCIsIFwiLS0tLVgtLS0tLS1YLS1YXCIsIFwiWFgtLVhYLS0tLVhYLS1YXCIsIFwiKlgtLVhYWC0tWFhYLS1YXCIsIFwiJi0tLSojWC0tWCMqLS1YXCIsIFwiKlgtLVhYWC0tWFhYLS1YXCIsIFwiWFgtLVhYLS0tLVhYLS1YXCIsIFwiXFxcXFxcXFwtLVgtLS0tLS1YLS1YXCIsIFwiLy8tLS0tLS0tLS0tLS1YXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjE3XzVfMVwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tLS0tLSZcIiwgXCItLS0tWC0tLS0tLVgtLVhcIiwgXCJYWC0tWFgtLS0tWFgtLVhcIiwgXCIqWC0tWFhYLS1YWFgtLVhcIiwgXCImLS0tKiNYLS1YIyotLVhcIiwgXCIqWC0tWFhYLS1YWFgtLVhcIiwgXCJYWC0tWFgtLS0tWFgtLVhcIiwgXCJcXFxcXFxcXC0tWC0tLS0tLVgtLVhcIiwgXCIvLy0tLS0tLS0tLS0tLVhcIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTdfM18wXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS1eLS0tLVwiLCBcIi0tLS0tLS1YLS1eLS1YLVwiLCBcIi0tWC0tLVhYLS1eLS1YWFwiLCBcIiotWC0tWFhYLS1eLS1YWFwiLCBcIlhYWC0tWCMqLS0tLS0qI1wiLCBcIiotWC0tWFhYLS0mLS1YWFwiLCBcIi0tWC0tLVhYLS0tLS1YWFwiLCBcIi0tLS0tLS1YLS0tLS1YLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxN18zXzFcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLV4tLS0tXCIsIFwiLS0tLS0tLVgtLV4tLVgtXCIsIFwiLS1YLS0tWFgtLV4tLVhYXCIsIFwiKi1YLS1YWFgtLV4tLVhYXCIsIFwiWFhYLS1YIyotLS0tLSojXCIsIFwiKi1YLS1YWFgtLSYtLVhYXCIsIFwiLS1YLS0tWFgtLS0tLVhYXCIsIFwiLS0tLS0tLVgtLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjE2XzRfMFwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS0tLVgtLVgtLVgtLVhcIiwgXCItLS0tLVgtLVgtLVgtLVhcIiwgXCItLVgtLVgtLVgtLVgtLVhcIiwgXCIqLVgtLVgtLVgtLVgtLVhcIiwgXCJYWFgtLVgtI1gtI1gtI1hcIiwgXCIqLVgtLVgtLVgtLVgtLVhcIiwgXCItLVgtLVgtLVgtLVgtLVhcIiwgXCItLS0tLVgtLVgtLVgtLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTZfNF8xXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tWC0tWC0tWC0tWFwiLCBcIi0tLS0tWC0tWC0tWC0tWFwiLCBcIi0tWC0tWC0tWC0tWC0tWFwiLCBcIiotWC0tWC0tWC0tWC0tWFwiLCBcIlhYWC0tWC0jWC0jWC0jWFwiLCBcIiotWC0tWC0tWC0tWC0tWFwiLCBcIi0tWC0tWC0tWC0tWC0tWFwiLCBcIi0tLS0tWC0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCI2XzFfMFwiOiBbXCItLS0tLS0tLS0tLS1eXl5cIiwgXCItLS0tLS0tLS0tLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLVhcIiwgXCItLS0jLS0tLS0mLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLVhcIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tLVhcIiwgXCJcXFxcLy8tLS0tLS0tLS0tLVhcIiwgXCItLS0tLS0qLS0tLS0tLSNcIiwgXCIqLS0tLS0tLS0tLS1eXl5cIl0sIFwiNl8xXzFcIjogW1wiLS0tLS0tLS0tLS0tXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiLS0tIy0tLS0tJi0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLS1YXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tKi0tLS0tLS0jXCIsIFwiKi0tLS0tLS0tLS0tXl5eXCJdLCBcIjZfMV8yXCI6IFtcIlgtLV5eLS0tLV4tLS1eLVwiLCBcIlgtLS0tLS1eLSotXi0tLVwiLCBcIi0tLS0tLS0tLV4tLS1eLVwiLCBcIi0tLS0tLS1eLS0tXi0tLVwiLCBcIlgtLS0tLS0tLV4tLS1eLVwiLCBcIlgtLS0tLS1eLSYtXi0tLVwiLCBcIlgtLS0tLS0tLV4tLS1eLVwiLCBcIlgtLS0tLS1eLS0tXi0tLVwiLCBcIlgtLS0tLS0tLV4tLS1eLVwiLCBcIlgtLS0tLS1eLSotXi0tLVwiLCBcIlgtLV5eLS0tLV4tLS1eLVwiXSwgXCI1XzVfMFwiOiBbXCItLS0tLS1eXl4tLVhYWFhcIiwgXCItLS0tLS1eXl4tLVhYWFhcIiwgXCItLS0tLS1eXl4tLVhYWFhcIiwgXCItLS0tLS1eXl4tLVhYWFhcIiwgXCItLS0tLS0tKi0tLVhYWFhcIiwgXCItLS0jLS1eXl4tLVhYWFhcIiwgXCItLS0tLS0tJi0tLS0tWFhcIiwgXCIvXFxcXFxcXFwtLS1eXl4tLS0tLS1cIiwgXCJcXFxcLy8tLS1eXl4tLVhYLS1cIiwgXCItLS0tLS1eXl4tLVhYWFhcIiwgXCIqLS0tLS1eXl4tLVhYWFhcIl0sIFwiNV81XzFcIjogW1wiLS0tLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tLSotLS1YWFhYXCIsIFwiLS0tIy0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tLSYtLS0tLVhYXCIsIFwiL1xcXFxcXFxcLS0tXl5eLS0tLS0tXCIsIFwiXFxcXC8vLS0tXl5eLS1YWC0tXCIsIFwiLS0tLS0tXl5eLS1YWFhYXCIsIFwiKi0tLS0tXl5eLS1YWFhYXCJdLCBcIjVfNV8yXCI6IFtcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tXi0tLVwiLCBcIi0tLVhYLS0tLS0tXi0tLVwiLCBcIi0tLVhYLS0tLS0tXi0tLVwiLCBcIi0tLVhYLS0tLS0tXi0tLVwiLCBcIiMtLVhYLS0jLSMtIy0jLVwiLCBcIi0tLVhYLS0tLS0tLS0tLVwiLCBcIi0tLVhYLS0tLS0tLS0tLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI1XzZfMFwiOiBbXCItLS0tWFhYWFgtLV5eXl5cIiwgXCJcXFxcXFxcXC0tWFhYWFgtLS0tWC1cIiwgXCIvLy0tWFhYWFgtLS0tWC1cIiwgXCItLS0tWFhYWFgtLS0tWC1cIiwgXCItLS0tLS0tLS0tLS0tWC1cIiwgXCItLS0tLS0tLS0tLS0tWC1cIiwgXCItLS0tLS0jLS0tLS0tWC1cIiwgXCItLS0tWFhYWFgtLS0tWC1cIiwgXCImLS0tWFhYWFgtLS0tWC1cIiwgXCItLS0tWFhYWFgtLS0tIy1cIiwgXCItLS0tWFhYWFgtLV5eXl5cIl0sIFwiNV82XzFcIjogW1wiLS0tLVhYWFhYLS1eXl5eXCIsIFwiXFxcXFxcXFwtLVhYWFhYLS0tLVgtXCIsIFwiLy8tLVhYWFhYLS0tLVgtXCIsIFwiLS0tLVhYWFhYLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLVgtXCIsIFwiLS0tLS0tIy0tLS0tLVgtXCIsIFwiLS0tLVhYWFhYLS0tLVgtXCIsIFwiJi0tLVhYWFhYLS0tLVgtXCIsIFwiLS0tLVhYWFhYLS0tLSMtXCIsIFwiLS0tLVhYWFhYLS1eXl5eXCJdLCBcIjVfNl8yXCI6IFtcIlhYWFhYWF5eXi0tXl5eLVwiLCBcIlhYWFhYWF5eXi0tXl5eLVwiLCBcIlhYWFhYWF5eXi0tXl5eLVwiLCBcIlhYWFhYWF5eXi0tXl5eLVwiLCBcIlhYWFhYWF5eXi0tXl5eLVwiLCBcIlhYWFhYWF5eXi0tXl5eLVwiLCBcIi0tLS1YWF5eXi0tXl5eLVwiLCBcIi0tLS0tLV5eXi0tXl5eLVwiLCBcIlhYWFgtLS0tLS0tLSYtLVwiLCBcIlhYWFhYWC0tLS0tLS0tLVwiLCBcIlhYWFhYWF5eXi0tXl5eLVwiXSwgXCI2XzVfMFwiOiBbXCItLS0tLVhYWFgtLV5eXl5cIiwgXCJcXFxcXFxcXC0tLVhYWFgtLS0tLS1cIiwgXCIvLy0tLVhYWFgtLS0tWC1cIiwgXCItLS0tLVhYWFgtLS0tWFhcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCItLS0tLS0tLS0tLS0tKiNcIiwgXCItLS0tLS0tKi0tLS0tWFhcIiwgXCItLS0tLVhYWFgtLS0tWFhcIiwgXCImLS0tLVhYWFgtLS0tWC1cIiwgXCItLS0tLVhYWFgtLS0tLS1cIiwgXCItLS0tLVhYWFgtLV5eXl5cIl0sIFwiNl81XzFcIjogW1wiLS0tLS1YWFhYLS1eXl5eXCIsIFwiXFxcXFxcXFwtLS1YWFhYLS0tLS0tXCIsIFwiLy8tLS1YWFhYLS0tLVgtXCIsIFwiLS0tLS1YWFhYLS0tLVhYXCIsIFwiLS0tLS0tLS0tLS0tLVhYXCIsIFwiLS0tLS0tLS0tLS0tLSojXCIsIFwiLS0tLS0tLSotLS0tLVhYXCIsIFwiLS0tLS1YWFhYLS0tLVhYXCIsIFwiJi0tLS1YWFhYLS0tLVgtXCIsIFwiLS0tLS1YWFhYLS0tLS0tXCIsIFwiLS0tLS1YWFhYLS1eXl5eXCJdLCBcIjZfNV8yXCI6IFtcIlheXlhYWFheXi0tLS0tLVwiLCBcIlheXlhYWFheXi0tLV5eXlwiLCBcIlheXlhYWFheXi0tLV5eXlwiLCBcIlheXlhYWFheXi0tLV5eXlwiLCBcIlheXlhYWFheXi0tLV5eXlwiLCBcIlheXi0tLS1eXi0tLV5eXlwiLCBcIlgtLS0tLS0tLS0tLV5eXlwiLCBcIi0tLVhYWFgtLS0tLV5eXlwiLCBcIi1eXlhYWFheXi0tLV5eXlwiLCBcIlheXlhYWFheXi0tLV5eXlwiLCBcIlheXlhYWFheXi0tLS0tLVwiXSwgXCIxXzEzXzBcIjogW1wiLS0tLVhYWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLVhYWFhYWFhYWFhYXCIsIFwiLy8tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFgtLSNYWFhYXCIsIFwiLS0tLVhYWFgtLS1YWFhYXCIsIFwiLS0tLS0tLS0tLS0tKi0tXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiJi0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCJdLCBcIjFfMTNfMVwiOiBbXCItLS0tWFhYWFhYWFhYWFhcIiwgXCJcXFxcXFxcXC0tWFhYWFhYWFhYWFhcIiwgXCIvLy0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWC0tI1hYWFhcIiwgXCItLS0tWFhYWC0tLVhYWFhcIiwgXCItLS0tLS0tLS0tLS0qLS1cIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCImLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIl0sIFwiMV8xM18yXCI6IFtcIlhYWFhYWFhYWFhYWC0tLVwiLCBcIlhYWFhYWFhYWFhYWC0tLVwiLCBcIlhYWFhYWFhYWFhYWC0tLVwiLCBcIlhYWFhYWFhYWFhYWC0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlhYWFhYWFgtLS0tLS0tLVwiLCBcIlhYWFhYWFgtLSMtLS0tLVwiLCBcIlhYWFhYWFhYWFhYWC0tLVwiLCBcIlhYWFhYWFhYWFhYWC0tLVwiLCBcIlhYWFhYWFhYWFhYWC0tLVwiLCBcIlhYWFhYWFhYWFhYWCotLVwiXSwgXCIxXzE0XzBcIjogW1wiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tI1hYWFgtXCIsIFwiLS0tLVhYWC0tLVhYWFgtXCIsIFwiLS0tLVhYWC0tLS0qLS0tXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCJdLCBcIjFfMTRfMVwiOiBbXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0jWFhYWC1cIiwgXCItLS0tWFhYLS0tWFhYWC1cIiwgXCItLS0tWFhYLS0tLSotLS1cIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIl0sIFwiMV8xMl8wXCI6IFtcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIlxcXFxcXFxcLS1YWFhYWFhYWFhYWFwiLCBcIi8vLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLSNYWFhYLVwiLCBcIi0tLS0tLSYtLS1YWFhYLVwiLCBcIi0tLS0tLS0tLS0tKi0tLVwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIiYtLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiXSwgXCIxXzEyXzFcIjogW1wiLS0tLVhYWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLVhYWFhYWFhYWFhYXCIsIFwiLy8tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tI1hYWFgtXCIsIFwiLS0tLS0tJi0tLVhYWFgtXCIsIFwiLS0tLS0tLS0tLS0qLS0tXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiJi0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCJdLCBcIjFfMTJfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWComWFhYWFhYWFhYWFhcIiwgXCJYWC0tWFhYWFhYWFhYWC1cIiwgXCJYWC0tWFhYWFhYWFhYLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLSMtLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYWC0tWFhYWFhYWFhYLS1cIiwgXCJYWC0tWFhYWFhYWFhYWC1cIiwgXCJYWC0tWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMl8xM18wXCI6IFtcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIlgtLS0tWFhYWFhYWFhYWFwiLCBcIlhYWC0tWFhYWFhYWFhYWFwiLCBcIi1YWC0tLS0jWFhYWFgtLVwiLCBcIi1YWC0tLS0tWFhYWFgtLVwiLCBcIi1YWC0tLS0tLSotLS0tLVwiLCBcIiNYWC0tWFhYWFhYWFhYWFwiLCBcIi1YWC0tWFhYWFhYWFhYWFwiLCBcIi1YWC0tWFhYWFhYWFhYWFwiLCBcIi1YWC0tWFhYWFhYWFhYWFwiXSwgXCIyXzEzXzFcIjogW1wiLS0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiWC0tLS1YWFhYWFhYWFhYXCIsIFwiWFhYLS1YWFhYWFhYWFhYXCIsIFwiLVhYLS0tLSNYWFhYWC0tXCIsIFwiLVhYLS0tLS1YWFhYWC0tXCIsIFwiLVhYLS0tLS0tKi0tLS0tXCIsIFwiI1hYLS1YWFhYWFhYWFhYXCIsIFwiLVhYLS1YWFhYWFhYWFhYXCIsIFwiLVhYLS1YWFhYWFhYWFhYXCIsIFwiLVhYLS1YWFhYWFhYWFhYXCJdLCBcIjJfMTNfMlwiOiBbXCJYWFhYWFgtLVhYWFhYWFhcIiwgXCJYWFhYWFgtLVhYWFhYWFhcIiwgXCJYWFhYWFgtLVhYWFhYWFhcIiwgXCJYWFhYWFgtLVhYWFhYWFhcIiwgXCJYWFhYLS0tLS0tLS0tI1hcIiwgXCJYWFhYLS0tLS0tLS0tLVhcIiwgXCItKi0tLS0tLS0tKi0tLS1cIiwgXCJYWFhYWFgtLVhYWFhYWFhcIiwgXCJYWFhYWFgtLVhYWFhYWFhcIiwgXCJYWFhYWFgtLVhYWFhYWFhcIiwgXCJYWFhYWFgtLVhYWFhYWFhcIl0sIFwiMF8xM18wXCI6IFtcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIlxcXFxcXFxcLS1YWFhYWFhYWFhYWFwiLCBcIi8vLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS1YWFhYWFhYWFwiLCBcIi0tLS0tLS1YWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIiYtLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiXSwgXCIwXzEzXzFcIjogW1wiLS0tLVhYWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLVhYWFhYWFhYWFhYXCIsIFwiLy8tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLVhYWFhYWFhYXCIsIFwiLS0tLS0tLVhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiJi0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCJdLCBcIjBfMTNfMlwiOiBbXCJYWFhYWFhYLS0tWFhYWFhcIiwgXCJYWFhYWFhYLS0tWFhYWFhcIiwgXCJYWFhYWFhYLS0tWFhYWFhcIiwgXCJYWFhYWFhYLS0tWFhYWFhcIiwgXCJYWFhYWC0tLS0tWFhYWFhcIiwgXCJYWFhYWC0tLS0tWFgtLS1cIiwgXCItKi0tLS0tLS0tLS0tLS1cIiwgXCJYWFhYWFhYLS0tLS1YWFhcIiwgXCJYWFhYWFhYLS0tWFhYWFhcIiwgXCJYWFhYWFhYLS0tWFhYWFhcIiwgXCJYWFhYWFhYLS0tWFhYWFhcIl0sIFwiOF82XzBcIjogW1wiLS0tLS0jLS0tXl5eXl5eXCIsIFwiLS0tLS1YWC0tLS1YLS1YXCIsIFwiWC0tLS1YWC0tLS1YLS1YXCIsIFwiWFhYLS1YWC0tLS1YLS1YXCIsIFwiLVhYLS1YWC0tLS1YLS1YXCIsIFwiLVhYLS0tLS0tLS1YLSNYXCIsIFwiLVhYLS1YWC0tLS1YLS1YXCIsIFwiI1hYLS1YWC0tLS1YLS1YXCIsIFwiLVhYLS1YWC0tLS1YLS1YXCIsIFwiLVhYLS1YWC0tLS0tLS0tXCIsIFwiLVhYLS0jLS0tXl5eXl5eXCJdLCBcIjhfNl8xXCI6IFtcIi0tLS0tIy0tLV5eXl5eXlwiLCBcIi0tLS0tWFgtLS0tWC0tWFwiLCBcIlgtLS0tWFgtLS0tWC0tWFwiLCBcIlhYWC0tWFgtLS0tWC0tWFwiLCBcIi1YWC0tWFgtLS0tWC0tWFwiLCBcIi1YWC0tLS0tLS0tWC0jWFwiLCBcIi1YWC0tWFgtLS0tWC0tWFwiLCBcIiNYWC0tWFgtLS0tWC0tWFwiLCBcIi1YWC0tWFgtLS0tWC0tWFwiLCBcIi1YWC0tWFgtLS0tLS0tLVwiLCBcIi1YWC0tIy0tLV5eXl5eXlwiXSwgXCI3XzVfMFwiOiBbXCItLS0tWFhYLS1eXl5eXl5cIiwgXCJcXFxcXFxcXC0tWFhYLS0tLS0tLS1cIiwgXCIvLy0tWFhYLS0tLS0tLVhcIiwgXCItLS0tWFhYLS0tLS0tWFhcIiwgXCItLS0tWFhYLS0tLS1YWFhcIiwgXCItLS0tWFhYLS0tLS1YIypcIiwgXCItLS0tWFhYLS0tLS1YWFhcIiwgXCItLS0tWFhYLS0tLS0tWFhcIiwgXCImLS0tLS0tLS0tLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tWFhYLS1eXl5eXl5cIl0sIFwiN181XzFcIjogW1wiLS0tLVhYWC0tXl5eXl5eXCIsIFwiXFxcXFxcXFwtLVhYWC0tLS0tLS0tXCIsIFwiLy8tLVhYWC0tLS0tLVgtXCIsIFwiLS0tLVhYWC0tLS0tWFgtXCIsIFwiLS0tLVhYWC0tLS1YWFgtXCIsIFwiLS0tLVhYWC0tLS1YIyotXCIsIFwiLS0tLVhYWC0tLS1YWFgtXCIsIFwiLS0tLVhYWC0tLS0tWFgtXCIsIFwiJi0tLS0tLS0tLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLVhYWC0tXl5eXl5eXCJdLCBcIjZfNl8wXCI6IFtcIi0tLS1YWFhYWC0tXl5eXlwiLCBcIlxcXFxcXFxcLS1YWFhYWC0tLS0tLVwiLCBcIi8vLS1YWFhYWC0tLS1YLVwiLCBcIi0tLS1YWFhYWC0tLS1YWFwiLCBcIi0tLS0tLS0tLS0tLS1YWFwiLCBcIi0tLS0tLS0tLS0tLS0qI1wiLCBcIi0tLS0tLSMtLS0tLS1YWFwiLCBcIi0tLS1YWFhYWC0tLS1YWFwiLCBcIiYtLS1YWFhYWC0tLS1YLVwiLCBcIi0tLS1YWFhYWC0tLS0tLVwiLCBcIi0tLS1YWFhYWC0tXl5eXlwiXSwgXCI2XzZfMVwiOiBbXCItLS0tWFhYWFgtLV5eXl5cIiwgXCJcXFxcXFxcXC0tWFhYWFgtLS0tLS1cIiwgXCIvLy0tWFhYWFgtLS0tWC1cIiwgXCItLS0tWFhYWFgtLS0tWFhcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCItLS0tLS0tLS0tLS0tKiNcIiwgXCItLS0tLS0jLS0tLS0tWFhcIiwgXCItLS0tWFhYWFgtLS0tWFhcIiwgXCImLS0tWFhYWFgtLS0tWC1cIiwgXCItLS0tWFhYWFgtLS0tLS1cIiwgXCItLS0tWFhYWFgtLV5eXl5cIl0sIFwiNl82XzJcIjogW1wiWFhYWFhYLS1eXi0tXi0tXCIsIFwiWFhYWFhYLS1eXi0tXi0tXCIsIFwiWFhYWFhYLS1eXi0tXi0tXCIsIFwiWFhYWFhYLS1eXi0tXl5eXCIsIFwiWFhYWC0tLS0tLS0tLS0tXCIsIFwiWFhYWC0tLS1eXi0tLS0tXCIsIFwiLSotLS0tLS0tLS0tLS0tXCIsIFwiWFhYWFhYLS1eXi0tLS0tXCIsIFwiWFhYWFhYLS1eXi0tLSMtXCIsIFwiWFhYWFhYLS1eXi0tLS0tXCIsIFwiWFhYWFhYLS1eXi0tLS0tXCJdLCBcIjJfM18wXCI6IFtcIi0tLS0tLSMtLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi0tLSMtLS0tLS1YLS0mLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi9cXFxcXFxcXC0tLVhYLS1YLS0tLVwiLCBcIlxcXFwvLy0tLVhYLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIiotLS0tLSMtLS0mLS0tLVwiXSwgXCIyXzNfMVwiOiBbXCItLS0tLS0jLS0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCItLS0jLS0tLS0tWC0tJi1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCIvXFxcXFxcXFwtLS1YWC0tWC0tLS1cIiwgXCJcXFxcLy8tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCIqLS0tLS0jLS0tJi0tLS1cIl0sIFwiMl8zXzJcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLS1eLS0tLS0tXi0tLS0tXCIsIFwiLS1eLS0tLS0tXi0tLS0tXCIsIFwiLS0tLS0tLS0tXi0tLS0jXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0mLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0jXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjJfMl8wXCI6IFtcIi0tLS0tLSMtLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLSMtLS0tLS0mLS0mLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLVhYLS0tLS0tLVwiLCBcIlxcXFwvLy0tLVhYLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIiotLS0tLSMtLS0tLS0tLVwiXSwgXCIyXzJfMVwiOiBbXCItLS0tLS0jLS0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0jLS0tLS0tJi0tJi1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS1YWC0tLS0tLS1cIiwgXCJcXFxcLy8tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCIqLS0tLS0jLS0tLS0tLS1cIl0sIFwiMl8yXzJcIjogW1wiXi0tXi0tLS0tLS0tLS0tXCIsIFwiXi0tLS0tLS0tLS0tLS0tXCIsIFwiXi0tLS0tIy0tLS0tLS0tXCIsIFwiXi0tLS0tLS0tWC0tLVgtXCIsIFwiLS0tLS0tLS0tWC0mLVgtXCIsIFwiXi0tLS0tLS0tWFhYWFgtXCIsIFwiLS0tLS0tLS0tWC0tLVgtXCIsIFwiXi0tLS0tLS0tWC0tLVgtXCIsIFwiXi0tLS0tLS0tLS0tLS0tXCIsIFwiXi0tLS0tLS8vXFxcXFxcXFwtLS0tXCIsIFwiXi0tXi0tLVxcXFxcXFxcLy8tLS0tXCJdLCBcIjBfMTBfMFwiOiBbXCItLS0tIy0tLVhYWFhYWFhcIiwgXCJcXFxcXFxcXC0tWFgtLVhYWFhYWFhcIiwgXCIvLy0tWFgtLVhYWFhYWFhcIiwgXCItLS0tWFgtLVhYWFhYWFhcIiwgXCItLS0tWFgtLVhYWFhYWFhcIiwgXCItLS0tLS0tLVhYWFhYWFhcIiwgXCItLS0tWFgtLVhYWFhYWFhcIiwgXCItLS0tWFgtLS0tLS1YWFhcIiwgXCImLS0tWFgtLS0tLS1YWFhcIiwgXCItLS0tWFgtLVhYLS0tLS1cIiwgXCItLS0tIy0tLVhYWFhYWFhcIl0sIFwiMF8xMF8xXCI6IFtcIi0tLS0jLS0tWFhYWFhYWFwiLCBcIlxcXFxcXFxcLS1YWC0tWFhYWFhYWFwiLCBcIi8vLS1YWC0tWFhYWFhYWFwiLCBcIi0tLS1YWC0tWFhYWFhYWFwiLCBcIi0tLS1YWC0tWFhYWFhYWFwiLCBcIi0tLS0tLS0tWFhYWFhYWFwiLCBcIi0tLS1YWC0tWFhYWFhYWFwiLCBcIi0tLS1YWC0tLS0tLVhYWFwiLCBcIiYtLS1YWC0tLS0tLVhYWFwiLCBcIi0tLS1YWC0tWFgtLS0tLVwiLCBcIi0tLS0jLS0tWFhYWFhYWFwiXSwgXCIwXzEwXzJcIjogW1wiLS0tLSYtLS0tJi0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiWFhYWFhYWFhYWFhYWC0tXCIsIFwiWFhYWFhYWFhYWFhYWC0tXCIsIFwiWFhYWFhYWFhYWFhYWC0tXCIsIFwiWFhYWFhYWFhYWFhYWC0tXCIsIFwiWC0tWFhYLS1YWFgtLS0tXCIsIFwiWC0tWFhYLS1YWFgtLS1YXCIsIFwiWC0tWFhYLS1YWFgtLS1YXCIsIFwiWC0tWFhYLS1YWFgtLS0tXCIsIFwiWC0tWFhYLS1YWFgtLS0tXCJdLCBcIjBfMTFfMFwiOiBbXCItLS0tLVhYWFhYWFhYWFhcIiwgXCJcXFxcXFxcXC0tLVhYWFhYWFhYWFhcIiwgXCIvLy0tLVhYWFhYWFhYWFhcIiwgXCItLS0tLVhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tWFhYWFhcIiwgXCItLS0tLS0tIy0tWFhYWFhcIiwgXCItLS0tLVhYWFhYWFhYWFhcIiwgXCImLS0tLVhYWFhYWFhYWFhcIiwgXCItLS0tLVhYWFhYWFhYWFhcIiwgXCItLS0tLVhYWFhYWFhYWFhcIl0sIFwiMF8xMV8xXCI6IFtcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIlxcXFxcXFxcLS0tWFhYWFhYWFhYWFwiLCBcIi8vLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tWFhYWFwiLCBcIi0tLS0tLS0qLS0tWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIiYtLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiXSwgXCIwXzExXzJcIjogW1wiWFhYWFhYWFgtLVhYWFhYXCIsIFwiWFhYWFhYWC0tLVhYWFhYXCIsIFwiWC0tWFgtLS0tLVhYWFhYXCIsIFwiWC0tWFgtLS0tLVhYWFhYXCIsIFwiWC0tWFgtLS0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiWC0tWFgtLS0tLVhYWC0tXCIsIFwiWC0tWFgtLS0tLS0tLS0tXCIsIFwiWComWFgtLS0tLS0tLVhYXCIsIFwiWFhYWFhYWC0tLVhYWFhYXCIsIFwiWFhYWFhYWFgtLVhYWFhYXCJdLCBcIjFfMTBfMFwiOiBbXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0jLS0tLSYtLVhYWFhcIiwgXCItLS0tLS0tLS0tLVhYWFhcIiwgXCIvXFxcXFxcXFwtLS1YWFhYWFhYWFhcIiwgXCJcXFxcLy8tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCIqLS0tLS1YWFhYWFhYWFhcIl0sIFwiMV8xMF8xXCI6IFtcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSMtLS0tJi0tWFhYWFwiLCBcIi0tLS0tLS0tLS0tWFhYWFwiLCBcIi9cXFxcXFxcXC0tLVhYWFhYWFhYWFwiLCBcIlxcXFwvLy0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIiotLS0tLVhYWFhYWFhYWFwiXSwgXCIxXzEwXzJcIjogW1wiLS0tLSYtLS0tIy0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiWFhYWFhYWFhYKlhYWC0tXCIsIFwiWFhYWFhYWFhYWFhYWC0tXCIsIFwiWFhYWFhYWFhYWFhYWC0tXCIsIFwiWFhYWFhYWFhYWFhYWC0tXCIsIFwiWC0tWFhYLS1YWFgtLS0tXCIsIFwiWC0tWFhYLS1YWFgtLS1YXCIsIFwiWC0tWFhYLS1YWFgtLS1YXCIsIFwiWC0tWFhYLS1YWFgtLS0tXCIsIFwiWC0tWFhYLS1YWFgtLS0tXCJdLCBcIjNfMTRfMFwiOiBbXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLS0tI1hYWFgtLSNYWFhcIiwgXCItLS0tLVhYWFgtLS1YWFhcIiwgXCItLS0tLS0qLS0tLS0tKi1cIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIl0sIFwiM18xNF8xXCI6IFtcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0jWFhYWC0tI1hYWFwiLCBcIi0tLS0tWFhYWC0tLVhYWFwiLCBcIi0tLS0tLSotLS0tLS0qLVwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiXSwgXCIzXzE1XzBcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tI1hYWFgtLSNYXCIsIFwiLS0tJi0tLVhYWFgtLS1YXCIsIFwiLS0tLS0tLS0qLS0tLS0tXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiI1hYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjNfMTVfMVwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0jWFhYWC0tI1hcIiwgXCItLS0mLS0tWFhYWC0tLVhcIiwgXCItLS0tLS0tLSotLS0tLS1cIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCIjWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiM18xNV8yXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLSotLS0qLS0tLVwiLCBcIlhYWC0tLS0tLS0tLS0tLVwiLCBcIlhYWC0tLS0jLS0tIy0tLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIzXzEzXzBcIjogW1wiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0jWFhYWFgtLSNYXCIsIFwiIy0tLS0tWFhYWFgtLS1YXCIsIFwiLS0tLS0tLSotLS0tLS0tXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCJdLCBcIjNfMTNfMVwiOiBbXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWC0tLS0tI1hYWFhcIiwgXCIjLS1YWC0tLS0tLVhYWFhcIiwgXCItLS0tLS0tKi0tLS0qLS1cIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIl0sIFwiNF8xNF8wXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLSNYWFwiLCBcIi0tLSYtLS0tLS0tLS1YWFwiLCBcIi0tLS0tLSMtLSMtLS0tKlwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIiNYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI0XzE0XzFcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tI1hYXCIsIFwiLS0tJi0tLS0tLS0tLVhYXCIsIFwiLS0tLS0tIy0tIy0tLS0qXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiI1hYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjJfMTRfMFwiOiBbXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYLS0tLS0jWFhYWC1cIiwgXCItLVhYLS0tLS0tWFhYWC1cIiwgXCItLS0tLS0qLS0tLSotLS1cIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIl0sIFwiMl8xNF8xXCI6IFtcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFgtLS0tLSNYWFhYLVwiLCBcIi0tWFgtLS0tLS1YWFhYLVwiLCBcIi0tLS0tLSotLS0tKi0tLVwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiXSwgXCIyXzE0XzJcIjogW1wiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWC0tLS0tI1hYWFgtXCIsIFwiLS1YWC0tLS0tLVhYWFgtXCIsIFwiLS0tLS0tKi0tLS0qLS0tXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCJdLCBcIjNfN18wXCI6IFtcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tI1hYWFwiLCBcIi0tLSMtLSYtLS0tLVhYWFwiLCBcIi0tLS0tLS0tLS0tLS0qLVwiLCBcIi9cXFxcXFxcXC0tLS0tLVhYWFhYWFwiLCBcIlxcXFwvLy0tLS0tLVhYWFhYWFwiLCBcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIiotLS0tLS0tLVhYWFhYWFwiXSwgXCIzXzdfMVwiOiBbXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS0tLSNYWFhcIiwgXCItLS0jLS0mLS0tLS1YWFhcIiwgXCItLS0tLS0tLS0tLS0tKi1cIiwgXCIvXFxcXFxcXFwtLS0tLS1YWFhYWFhcIiwgXCJcXFxcLy8tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCIqLS0tLS0tLS1YWFhYWFhcIl0sIFwiNF82XzBcIjogW1wiLS0tLS0tLS1YLS1YWFhYXCIsIFwiLS0tLS0tLS0tLS1YWFhYXCIsIFwiLS0tLS0tLS1YLS1YWFhYXCIsIFwiLS0tLS0tLVhYLS1YWFhYXCIsIFwiLS0tLS0tWFhYLS0tLSotXCIsIFwiLS0tIy0tWCMmLS0tLS0tXCIsIFwiLS0tLS0tWFhYLS0tLS0jXCIsIFwiL1xcXFxcXFxcLS0tLVhYLS1YWFhYXCIsIFwiXFxcXC8vLS0tLS1YLS1YWFhYXCIsIFwiLS0tLS0tLS0tLS1YWFhYXCIsIFwiKi0tLS0tLS1YLS1YWFhYXCJdLCBcIjRfNl8xXCI6IFtcIi0tLS0tLS0tWC0tWFhYWFwiLCBcIi0tLS0tLS0tLS0tWFhYWFwiLCBcIi0tLS0tLS0tWC0tWFhYWFwiLCBcIi0tLS0tLS1YWC0tWFhYWFwiLCBcIi0tLS0tLVhYWC0tLS0qLVwiLCBcIi0tLSMtLVgjJi0tLS0tLVwiLCBcIi0tLS0tLVhYWC0tLS0tI1wiLCBcIi9cXFxcXFxcXC0tLS1YWC0tWFhYWFwiLCBcIlxcXFwvLy0tLS0tWC0tWFhYWFwiLCBcIi0tLS0tLS0tLS0tWFhYWFwiLCBcIiotLS0tLS0tWC0tWFhYWFwiXSwgXCI3XzdfMFwiOiBbXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLS0qLS0tLS0qLS0tKi1cIiwgXCItLV5eXi0tLS0tLS0tLS1cIiwgXCItLS0mLS0tLS0tIy0tLSNcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIl0sIFwiN183XzFcIjogW1wiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS0tKi0tLS0tKi0tLSotXCIsIFwiLS1eXl4tLS0tLS0tLS0tXCIsIFwiLS0tJi0tLS0tLSMtLS0jXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCJdLCBcIjdfN18yXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFgtLV5eXl5eXl5eLVwiLCBcIlhYLS0tLS0tXl5eLS0tLVwiLCBcIlhYLS0tLS0tLS0tLS0tLVwiLCBcIlhYLS0tLS0tLS0vL1xcXFxcXFxcLVwiLCBcIi0tLS0tLS0tLS1cXFxcXFxcXC8vLVwiLCBcIlhYLS0tLS0tLS0tLS0tLVwiLCBcIlhYLS0tLS0tLS0tLS0tLVwiLCBcIlhYLS0tLS0tXl5eLS0tLVwiLCBcIlhYWFgtLV5eXl5eXl5eLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI3XzhfMFwiOiBbXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItLSotLS0tLSotLS0qLS1cIiwgXCItXl5eLS0tLS0tLS0tLS1cIiwgXCItLSYtLS0tLS0jLS0tIy1cIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIl0sIFwiN184XzFcIjogW1wiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLS0qLS0tLS0qLS0tKi0tXCIsIFwiLV5eXi0tLS0tLS0tLS0tXCIsIFwiLS0mLS0tLS0tIy0tLSMtXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCJdLCBcIjdfNl8wXCI6IFtcIi0tLS0tWFgtLV5eXl5eXlwiLCBcIi0tLS0tWFgtLS0tWC0tWFwiLCBcIlgtLS0tWFgtLS0tWC0tWFwiLCBcIlhYWC0tWFgtLS0tWC0tWFwiLCBcIi1YWC0tLS0tLS0tWC0tWFwiLCBcIi1YWC0tLS0tLS0tWC0jWFwiLCBcIi1YWC0tLS0tLS0tWC0tWFwiLCBcIiNYWC0tWFgtLS0tWC0tWFwiLCBcIi1YWC0tWFgtLS0tWC0tWFwiLCBcIi1YWC0tWFgtLS0tLS0tLVwiLCBcIi1YWC0tWFgtLV5eXl5eXlwiXSwgXCI3XzZfMVwiOiBbXCItLS0tLVhYLS1eXl5eXl5cIiwgXCItLS0tLVhYLS0tLVgtLVhcIiwgXCJYLS0tLVhYLS0tLVgtLVhcIiwgXCJYWFgtLVhYLS0tLVgtLVhcIiwgXCItWFgtLS0tLS0tLVgtLVhcIiwgXCItWFgtLS0tLS0tLVgtI1hcIiwgXCItWFgtLS0tLS0tLVgtLVhcIiwgXCIjWFgtLVhYLS0tLVgtLVhcIiwgXCItWFgtLVhYLS0tLVgtLVhcIiwgXCItWFgtLVhYLS0tLS0tLS1cIiwgXCItWFgtLVhYLS1eXl5eXl5cIl0sIFwiN182XzJcIjogW1wiWFhYWFhYLS1eXl5eXl5eXCIsIFwiWFhYWFhYLS0tLS0tLSotXCIsIFwiWFhYWFhYLS0tLS0tLS0tXCIsIFwiWFhYWFhYLS0tLS0tXl5eXCIsIFwiLS0tLS0tLS0tLV5eXl5eXCIsIFwiWFhYWC0tLS0tLS0tLSYtXCIsIFwiWFhYWC0tLS0tLV5eXl5eXCIsIFwiWFhYWFhYLS0tLS0tXl5eXCIsIFwiWFhYWFhYLS0tLS0tLS0tXCIsIFwiWFhYWFhYLS0tLS0tLSotXCIsIFwiWFhYWFhYLS1eXl5eXl5eXCJdLCBcIjhfN18wXCI6IFtcIlhYWFhYWC0tXl5eXl5eXlwiLCBcIi1YWFhYWC0tLS0tWC0tWFwiLCBcIi1YWFhYWC0tLS0tWC0tWFwiLCBcIi1YWFhYWC0tLS0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tWC0tWFwiLCBcIi0tLSYtLS0tLS0tWC0jWFwiLCBcIi0tLS0tLS0tLS0tWC0tWFwiLCBcIi1YWFhYWC0tLS0tWC0tWFwiLCBcIi1YWFhYWC0tLS0tWC0tWFwiLCBcIiNYWFhYWC0tLS0tLS0tLVwiLCBcIlhYWFhYWC0tXl5eXl5eXlwiXSwgXCI4XzdfMVwiOiBbXCJYWFhYWFgtLV5eXl5eXl5cIiwgXCItWFhYWFgtLS0tLVgtLVhcIiwgXCItWFhYWFgtLS0tLVgtLVhcIiwgXCItWFhYWFgtLS0tLVgtLVhcIiwgXCItLS0tLS0tLS0tLVgtLVhcIiwgXCItLS0mLS0tLS0tLVgtI1hcIiwgXCItLS0tLS0tLS0tLVgtLVhcIiwgXCItWFhYWFgtLS0tLVgtLVhcIiwgXCItWFhYWFgtLS0tLVgtLVhcIiwgXCIjWFhYWFgtLS0tLS0tLS1cIiwgXCJYWFhYWFgtLV5eXl5eXl5cIl0sIFwiNl83XzBcIjogW1wiLS0tLS1eXl4tLVhYWFhYXCIsIFwiLS0tLS1eXl4tLVhYWFhYXCIsIFwiWC0tLS1eXl4tLVhYWFhYXCIsIFwiWFhYLS1eXl4tLVhYWFhYXCIsIFwiLVhYLS0tKi0tLS0tI1hYXCIsIFwiLVhYLS1eXl4tLS0tLVhYXCIsIFwiLVhYLS0tJi0tLS0tLS0qXCIsIFwiI1hYLS1eXl4tLVhYWFhYXCIsIFwiLVhYLS1eXl4tLVhYWFhYXCIsIFwiLVhYLS1eXl4tLVhYWFhYXCIsIFwiLVhYLS1eXl4tLVhYWFhYXCJdLCBcIjZfN18xXCI6IFtcIi0tLS0tXl5eLS1YWFhYWFwiLCBcIi0tLS0tXl5eLS1YWFhYWFwiLCBcIlgtLS0tXl5eLS1YWFhYWFwiLCBcIlhYWC0tXl5eLS1YWFhYWFwiLCBcIi1YWC0tLSotLS0tLSNYWFwiLCBcIi1YWC0tXl5eLS0tLS1YWFwiLCBcIi1YWC0tLSYtLS0tLS0tKlwiLCBcIiNYWC0tXl5eLS1YWFhYWFwiLCBcIi1YWC0tXl5eLS1YWFhYWFwiLCBcIi1YWC0tXl5eLS1YWFhYWFwiLCBcIi1YWC0tXl5eLS1YWFhYWFwiXSwgXCI2XzdfMlwiOiBbXCJYWFhYWFgtLV5eXl5eXl5cIiwgXCJYWFhYWFgtLS0tJi0tLS1cIiwgXCJYWFhYWFgtLS0tWC0tLS1cIiwgXCJYWFhYWFgtLS0tWC0tLS1cIiwgXCItLS0tLS0tLS0tWC0tLS1cIiwgXCJYWFhYLS0tLS0tWC0tLS1cIiwgXCJYWFhYLS0tLS0tWC0tLS1cIiwgXCJYWFhYWFgtLS0tWC0tLS1cIiwgXCJYWFhYWFgtLS0tWC0tLS1cIiwgXCJYWFhYWFgtLS0tWC0tLS1cIiwgXCJYWFhYWFgtLV5eXl5eXl5cIl0sIFwiMTBfMl8wXCI6IFtcIi0tLS0tLS1eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLV4tLS0tLVwiLCBcIi0tLS0tLS0tLV4tLS0tWFwiLCBcIi0tLS0tLS0tLV4tLS1YWFwiLCBcIi0tLS0tLS0tLV4tLVhYWFwiLCBcIi0tLSMtLS0tLS0tLVgjKlwiLCBcIi0tLS0tLS0tLSYtLVhYWFwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS1YWFwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiotLS0tLS1eXl5eXl5eXlwiXSwgXCIxMF8yXzFcIjogW1wiLS0tLS0tLV5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tXi0tLS0tXCIsIFwiLS0tLS0tLS0tXi0tLS1YXCIsIFwiLS0tLS0tLS0tXi0tLVhYXCIsIFwiLS0tLS0tLS0tXi0tWFhYXCIsIFwiLS0tIy0tLS0tLS0tWCMqXCIsIFwiLS0tLS0tLS0tJi0tWFhYXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLVhYXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tLV5eXl5eXl5eXCJdLCBcIjEwXzBfMFwiOiBbXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLV4tLS0tLSpcIiwgXCItLS0tLS0tLV4tLS0tLS1cIiwgXCItLS0tLS0tLV4tLS0tXl5cIiwgXCItLS0tLS0tLV4tLV5eXl5cIiwgXCItLS0jLS0tLS0tLS0tLSZcIiwgXCItLS0tLS0tLSYtLV5eXl5cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tXl5cIiwgXCJcXFxcLy8tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLSpcIiwgXCIqLS0tLS1eXl5eXl5eXl5cIl0sIFwiMTBfMF8xXCI6IFtcIi0tLS0tLV5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tXi0tLS0tKlwiLCBcIi0tLS0tLS0tXi0tLS0tLVwiLCBcIi0tLS0tLS0tXi0tLS1eXlwiLCBcIi0tLS0tLS0tXi0tXl5eXlwiLCBcIi0tLSMtLS0tLS0tLS0tJlwiLCBcIi0tLS0tLS0tJi0tXl5eXlwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS1eXlwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tKlwiLCBcIiotLS0tLV5eXl5eXl5eXlwiXSwgXCIxMV8xXzBcIjogW1wiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLV4tLS0tXCIsIFwiLS0tLS0tLS0tLV4tLVgtXCIsIFwiLS0tLS0tLS0tLV4tLVhYXCIsIFwiLS0tLS0tLS0tLV4tLVhYXCIsIFwiLS0tIy0tLS0tLS0tLSojXCIsIFwiLS0tLS0tLS0tLSYtLVhYXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLVhYXCIsIFwiXFxcXC8vLS0tLS0tLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tXl5eXl5eXl5eXCJdLCBcIjExXzFfMVwiOiBbXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tXi0tLS1cIiwgXCItLS0tLS0tLS0tXi0tWC1cIiwgXCItLS0tLS0tLS0tXi0tWFhcIiwgXCItLS0tLS0tLS0tXi0tWFhcIiwgXCItLS0jLS0tLS0tLS0tKiNcIiwgXCItLS0tLS0tLS0tJi0tWFhcIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tWFhcIiwgXCJcXFxcLy8tLS0tLS0tLS0tWC1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIqLS0tLS1eXl5eXl5eXl5cIl0sIFwiMTFfMV8yXCI6IFtcIl5eXl5eXl4tLS0tXi0tLVwiLCBcIi0tLS0tLS0tLV4tKi1eLVwiLCBcIi0tLS1YLS0tLS0tXi0tLVwiLCBcIi0tLVhYLS0tLV4tLS1eLVwiLCBcIi0tWFhYLS0tLS0tXi0tLVwiLCBcIi0tWCMqLS0tLV4tJi1eLVwiLCBcIi0tWFhYLS0tLS0tXi0tLVwiLCBcIi0tLVhYLS0tLV4tLS1eLVwiLCBcIi0tLS1YLS0tLS0tXi0tLVwiLCBcIi0tLS0tLS0tLV4tKi1eLVwiLCBcIl5eXl5eXl4tLS0tXi0tLVwiXSwgXCIxXzlfMFwiOiBbXCJYWC0tWFhYLS0tLS0tLS1cIiwgXCJYWC0tWFhYLS0tLS0tLS1cIiwgXCJYWC0tWFhYLS0tWFgtLS1cIiwgXCJYWC0tWFhYLS0tWFhYWC1cIiwgXCJYWC0tWFhYLS0tLS1YWC1cIiwgXCJYWFhYWFhYWFgtLS1YWC1cIiwgXCJYWFhYWFhYWFgtLS1YWC1cIiwgXCJYWFhYWFhYWFgtLS1YWC1cIiwgXCIqWFhYWFhYWFgtLS1YWC1cIiwgXCItLS0tLS0tLS0tLS1YWC1cIiwgXCIjLS0tLSYtLS0tLS1YWC1cIl0sIFwiMV85XzFcIjogW1wiWFgtLVhYWC0tLS0tLS0tXCIsIFwiWFgtLVhYWC0tLS0tLS0tXCIsIFwiWFgtLVhYWC0tLVhYLS0tXCIsIFwiWFgtLVhYWC0tLVhYWFgtXCIsIFwiWFgtLVhYWC0tLS0tWFgtXCIsIFwiWFhYWFhYWFhYLS0tWFgtXCIsIFwiWFhYWFhYWFhYLS0tWFgtXCIsIFwiWFhYWFhYWFhYLS0tWFgtXCIsIFwiKlhYWFhYWFhYLS0tWFgtXCIsIFwiLS0tLS0tLS0tLS0tWFgtXCIsIFwiIy0tLS0mLS0tLS0tWFgtXCJdLCBcIjFfOV8yXCI6IFtcIi0tWFgtLS0tLS0mLS0tLVwiLCBcIi0tWFgtLS0tLS0tLS0tLVwiLCBcIi0tWFgtLS1YWFhYWFhYWFwiLCBcIi0jWFgjLS1YWFhYWFhYWFwiLCBcIi0tWFgtLS1YWFhYWFhYWFwiLCBcIi0tWFgtLS1YWFhYWFhYWFwiLCBcIi0tWFgtLS0tLVhYWC0tWFwiLCBcIlhYWFhYWC0tLVhYWC0tWFwiLCBcIlhYLS1YWC0tLVhYWC0tWFwiLCBcIi0tLS0tLS0tLVhYWC0tWFwiLCBcIi0tLS0tLS0tLVhYWC0tWFwiXSwgXCIyXzhfMFwiOiBbXCJYWC0tWFhYLS0tLS0tLS1cIiwgXCJYWC0tWFhYLS0tLS0tLS1cIiwgXCJYWC0tWFhYLS0tWFgtLS1cIiwgXCJYWC0tWFhYLS0tWFgtIy1cIiwgXCJYWC0tWFhYLS0tLS0tLS1cIiwgXCJYWFhYWFhYWFgtLS0tWFhcIiwgXCJYWFhYWFhYWFgtLS0tWFhcIiwgXCJYWFhYWFhYWFgtLS0tWFhcIiwgXCIqWFhYWFhYWFgtLS0tWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIjLS0tLSYtLS0tLS0tLS1cIl0sIFwiMl84XzFcIjogW1wiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFgqJlhYWFhYXCIsIFwiLS0tLS0tWFgtLVhYWFhYXCIsIFwiLS0tLS0tWFgtLVhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tIy0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tWFgtLVhYWFhYXCIsIFwiXFxcXC8vLS0tWFgtLVhYWFhYXCIsIFwiLS0tLS0tWFgtLVhYWFhYXCIsIFwiKi0tLS0tWFhYWFhYWFhYXCJdLCBcIjBfM18wXCI6IFtcIi0tLS0jLS0tWC0tLS0tLVwiLCBcIlxcXFxcXFxcLS1YWC0tWC0tLS0tLVwiLCBcIi8vLS1YWC0tWC0tLS0tLVwiLCBcIi0tLS1YWC0tWC0tLS0tLVwiLCBcIi0tLS1YWC0tWC0tLS0tLVwiLCBcIi0tLS0tLS0tWC0tJi0tJlwiLCBcIi0tLS1YWC0tWC0tLS0tLVwiLCBcIi0tLS1YWC0tWC0tLS0tLVwiLCBcIiYtLS1YWC0tWC0tLS0tLVwiLCBcIi0tLS1YWC0tWC0tLS0tLVwiLCBcIi0tLS0jLS0tJi0tLS0tLVwiXSwgXCIwXzNfMVwiOiBbXCItLS0tIy0tLVgtLS0tLS1cIiwgXCJcXFxcXFxcXC0tWFgtLVgtLS0tLS1cIiwgXCIvLy0tWFgtLVgtLS0tLS1cIiwgXCItLS0tWFgtLVgtLS0tLS1cIiwgXCItLS0tWFgtLVgtLS0tLS1cIiwgXCItLS0tLS0tLVgtLSYtLSZcIiwgXCItLS0tWFgtLVgtLS0tLS1cIiwgXCItLS0tWFgtLVgtLS0tLS1cIiwgXCImLS0tWFgtLVgtLS0tLS1cIiwgXCItLS0tWFgtLVgtLS0tLS1cIiwgXCItLS0tIy0tLSYtLS0tLS1cIl0sIFwiMF8zXzJcIjogW1wiWC0tLS0tLS0tLS0tLVhYXCIsIFwiWC0tLV4tLSYtLS0tLVhYXCIsIFwiLS0tLS0tLS0tLS0tLVhYXCIsIFwiLS0tLV4tLS0tLS0tLVhYXCIsIFwiWC0tLS0tLS0tLS0tLVhYXCIsIFwiWC0tLV4tLS0tLS0tLS0tXCIsIFwiWC0tLS0tLS0tLS0tLS0mXCIsIFwiWC0tLV4tLS0tLSYtLVhYXCIsIFwiWC0tLS0tLS0tLS0tLVhYXCIsIFwiWC0tLV4tLS0tLS0tLVhYXCIsIFwiWC0tLS0tLS0tLS0tLVhYXCJdLCBcIjNfOF8wXCI6IFtcIlhYLS0tLS0tLS1YWFgtLVwiLCBcIlhYLS0tLS0tLS1YWFgtLVwiLCBcIlhYLS0tWFgtLS1YWFgtLVwiLCBcIlhYLSMtWFgtIy1YWFgtLVwiLCBcIlhYLS0tLS0tLS1YWFgtLVwiLCBcIlhYWFgtLS0tWFhYWFhYWFwiLCBcIlhYWFgtLS0tWFhYWFhYWFwiLCBcIlhYWFgtLS0tWFhYWFhYWFwiLCBcIipYWFgtLS0tWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiMtLS0tLS0tLS0tJi0tLVwiXSwgXCIzXzhfMVwiOiBbXCJYWC0tLS0tLS0tWFhYLS1cIiwgXCJYWC0tLS0tLS0tWFhYLS1cIiwgXCJYWC0tLVhYLS0tWFhYLS1cIiwgXCJYWC0jLVhYLSMtWFhYLS1cIiwgXCJYWC0tLS0tLS0tWFhYLS1cIiwgXCJYWFhYLS0tLVhYWFhYWFhcIiwgXCJYWFhYLS0tLVhYWFhYWFhcIiwgXCJYWFhYLS0tLVhYWFhYWFhcIiwgXCIqWFhYLS0tLVhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIjLS0tLS0tLS0tLSYtLS1cIl0sIFwiNF85XzBcIjogW1wiLS0tLVhYWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLVhYWFhYWFhYWC0tXCIsIFwiLy8tLVhYWFhYWFhYWC0tXCIsIFwiLS0tLVhYWFhYWFhYWC0tXCIsIFwiLS0tLS0tKi0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLSMtLSMtLS0tXCIsIFwiLS0tLVhYWFhYWFhYWC0tXCIsIFwiJi0tLVhYWFhYWFhYWC0tXCIsIFwiLS0tLVhYWFhYWFhYWCojXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCJdLCBcIjRfOV8xXCI6IFtcIi0tLS0tLS1YWFhYWFhYWFwiLCBcIi0tLS0tLS1YWFhYWFhYWFwiLCBcIlgtLS0tLS1YWFhYWFhYWFwiLCBcIlhYWC0tLS1YWFhYWFhYWFwiLCBcIi1YWC0tLS0tLSotLS0qLVwiLCBcIi1YWC0tLS0tLS0tLS0tLVwiLCBcIi1YWC0tLS0tLS0jLS0tI1wiLCBcIiNYWC0tLS1YWFhYWFhYWFwiLCBcIi1YWC0tLS1YWFhYWFhYWFwiLCBcIi1YWC0tLS1YWFhYWFhYWFwiLCBcIi1YWC0tLS1YWFhYWFhYWFwiXSwgXCI0XzlfMlwiOiBbXCJYWFhYXl5eXl5YWFhYWC1cIiwgXCJYWFhYXl5eXl5YWFhYWC1cIiwgXCItLS0tXl5eXl5YWFhYWC1cIiwgXCItLS0tLS0tLS1YWFhYWC1cIiwgXCJYWFhYLS0tLS0tLVhYWC1cIiwgXCJYWFhYXl5eXl4tLS0tLS1cIiwgXCJYWFhYXl5eXl5YWC0tLS1cIiwgXCJYWFhYXl5eXl5YWFhYWC1cIiwgXCJYWFhYXl5eXl5YWFhYWC1cIiwgXCJYWFhYXl5eXl5YWFhYWC1cIiwgXCJYWFhYXl5eXl5YWFhYWC1cIl0sIFwiMl85XzBcIjogW1wiWFgtLVhYWC0tLS0tLS0tXCIsIFwiWFgtLVhYWC0tLS0tLS0tXCIsIFwiWFgtLVhYWC0tLVhYLS0tXCIsIFwiWFgtLVhYWC0jLVhYWFgtXCIsIFwiWFgtLVhYWC0tLS0tWFgtXCIsIFwiWFhYWFhYWFhYLS0tWFgtXCIsIFwiWFhYWFhYWFhYLS0tWFgtXCIsIFwiWFhYWFhYWFhYLS0tWFgtXCIsIFwiKlhYWFhYWFhYLS0tWFgtXCIsIFwiLS0tLS0tLS0tLS0tWFgtXCIsIFwiIy0tLS0mLS0tLS0tWFgtXCJdLCBcIjJfOV8xXCI6IFtcIlhYLS1YWFgtLS0tLS0tLVwiLCBcIlhYLS1YWFgtLS0tLS0tLVwiLCBcIlhYLS1YWFgtLS1YWC0tLVwiLCBcIlhYLS1YWFgtIy1YWFhYLVwiLCBcIlhYLS1YWFgtLS0tLVhYLVwiLCBcIlhYWFhYWFhYWC0tLVhYLVwiLCBcIlhYWFhYWFhYWC0tLVhYLVwiLCBcIlhYWFhYWFhYWC0tLVhYLVwiLCBcIipYWFhYWFhYWC0tLVhYLVwiLCBcIi0tLS0tLS0tLS0tLVhYLVwiLCBcIiMtLS0tJi0tLS0tLVhYLVwiXSwgXCI4XzJfMFwiOiBbXCItLS0tLS0tLS1eXl5eXl5cIiwgXCItLS0tLS0tLS0tLVgtLVhcIiwgXCItLS0tLS0tLS0tLVgtLVhcIiwgXCItLS0tLS0tLS0tLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0jLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0vL1xcXFxcIiwgXCJcXFxcLy8tLS0tLS0tLS1cXFxcXFxcXC9cIiwgXCItLS0tLS0qLS0tLS0tLS1cIiwgXCIqLS0tLS0tLS1eXl5eXl5cIl0sIFwiOF8yXzFcIjogW1wiLS0tLS0tLS0tXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tIy0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLy9cXFxcXCIsIFwiXFxcXC8vLS0tLS0tLS0tXFxcXFxcXFwvXCIsIFwiLS0tLS0tKi0tLS0tLS0tXCIsIFwiKi0tLS0tLS0tXl5eXl5eXCJdLCBcIjhfMl8yXCI6IFtcIl5YWF5eXl5eXi0tXl5eLVwiLCBcIl4tLV5eXl5eXi0tXl5eLVwiLCBcIi0tLS0tLS0tLS0tXl5eLVwiLCBcIi1YWC0tLS0tLS0tXl5eLVwiLCBcIl5YWF5eXl5eXi0tLSYtLVwiLCBcIl5YWF5eXl5eXi0tLS0tLVwiLCBcIl5YWF5eXl5eXi0tXl5eLVwiLCBcIl5YWF5eXl5eXi0tXl5eLVwiLCBcIl5YWF5eXl5eXi0tXl5eLVwiLCBcIl5YWF5eXl5eXi0tXl5eLVwiLCBcIl5YWF5eXl5eXi0tXl5eLVwiXSwgXCIwXzJfMFwiOiBbXCItLS0tIy0tLS0tLS0tLS1cIiwgXCJcXFxcXFxcXC0tWFgtLS0tLS0tLS1cIiwgXCIvLy0tWFgtLS0tLS0tLS1cIiwgXCItLS0tWFgtLS0tLS0tLS1cIiwgXCItLS0tWFgtLS0tLS0tLS1cIiwgXCItLS0tLS0tLSYtLSYtLSZcIiwgXCItLS0tWFgtLS0tLS0tLS1cIiwgXCItLS0tWFgtLS0tLS0tLS1cIiwgXCImLS0tWFgtLS0tLS0tLS1cIiwgXCItLS0tWFgtLS0tLS0tLS1cIiwgXCItLS0tIy0tLS0tLS0tLS1cIl0sIFwiMF8yXzFcIjogW1wiLS0tLSMtLS0tLS0tLS0tXCIsIFwiXFxcXFxcXFwtLVhYLS0tLS0tLS0tXCIsIFwiLy8tLVhYLS0tLS0tLS0tXCIsIFwiLS0tLVhYLS0tLS0tLS0tXCIsIFwiLS0tLVhYLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0mLS0mLS0mXCIsIFwiLS0tLVhYLS0tLS0tLS0tXCIsIFwiLS0tLVhYLS0tLS0tLS0tXCIsIFwiJi0tLVhYLS0tLS0tLS0tXCIsIFwiLS0tLVhYLS0tLS0tLS0tXCIsIFwiLS0tLSMtLS0tLS0tLS0tXCJdLCBcIjBfMl8yXCI6IFtcIl4tLS0tLS0tLS0tLVhYWFwiLCBcIi0tLS0tLS8vXFxcXFxcXFwtLS1YWFwiLCBcIi0tLS0tLVxcXFxcXFxcLy8tLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0mLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tJi0tLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS1YWFwiLCBcIl4tLS0tLS0tLS0tLVhYWFwiXSwgXCIxXzJfMFwiOiBbXCItLS0tLS0tLS0tLS1YWC1cIiwgXCItLS0tLS0tLS0tLS1YWC1cIiwgXCItLS0tLS0tLS0tLS1YWC1cIiwgXCItLS0tLS0tLS0tLS1YWC1cIiwgXCItLS0tLS0tLS0tLS1YWC1cIiwgXCItLS0jLS0mLS0mLS1YWC1cIiwgXCItLS0tLS0tLS0tLS1YWC1cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS1YWFhcIiwgXCJcXFxcLy8tLS0tLS0tLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIqLS0tLS0tLS0tLS0tLS1cIl0sIFwiMV8yXzFcIjogW1wiLS0tLS0tLS0tLS0tWFgtXCIsIFwiLS0tLS0tLS0tLS0tWFgtXCIsIFwiLS0tLS0tLS0tLS0tWFgtXCIsIFwiLS0tLS0tLS0tLS0tWFgtXCIsIFwiLS0tLS0tLS0tLS0tWFgtXCIsIFwiLS0tIy0tJi0tJi0tWFgtXCIsIFwiLS0tLS0tLS0tLS0tWFgtXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tWFhYXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tLS0tLS0tLS0tXCJdLCBcIjE0XzNfMFwiOiBbXCItLS1eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tWFgtLVgtLVhcIiwgXCItLS0tLS1YWFgtLVgtLVhcIiwgXCIjLS0tLS1YIyotLVgtI1hcIiwgXCItLS0tLS1YWFgtLVgtLVhcIiwgXCItLS0tLS0tWFgtLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS1eXl5eXl5eXl5eXl5cIl0sIFwiMTRfM18xXCI6IFtcIi0tLV5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tWC0tWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS1YWC0tWC0tWFwiLCBcIi0tLS0tLVhYWC0tWC0tWFwiLCBcIiMtLS0tLVgjKi0tWC0jWFwiLCBcIi0tLS0tLVhYWC0tWC0tWFwiLCBcIi0tLS0tLS1YWC0tWC0tWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLV5eXl5eXl5eXl5eXlwiXSwgXCIxNF8zXzJcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiWC0tLS1YWFgtLS0tLS0tXCIsIFwiWF4tLS1YKlgtLS1eXl5eXCIsIFwiWF5eLS1YJi0tLS0tLS0tXCIsIFwiWF4tLS1YKlgtLS1eXl5eXCIsIFwiWC0tLS1YWFgtLS0tLS0tXCIsIFwiLy9cXFxcXFxcXC8vXFxcXFxcXFwtLS0tLS0tXCIsIFwiXFxcXFxcXFwvL1xcXFxcXFxcLy8tLS0tLS0tXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjEzXzJfMFwiOiBbXCItLS0tXl5eXl5eXl5eXl5cIiwgXCItLS0tLS1eLS0tLS0tLS1cIiwgXCItLS0tLS1eLS0tLVgtLVhcIiwgXCItLS0tLS1eLS0tWFgtLVhcIiwgXCItLS0tLS1eLS1YWFgtLVhcIiwgXCIjLS0tLS0tLS1YIyotLSpcIiwgXCItLS0tLS0mLS1YWFgtLVhcIiwgXCItLS0tLS0tLS0tWFgtLVhcIiwgXCItLS0tLS0tLS0tLVgtLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tXl5eXl5eXl5eXl5cIl0sIFwiMTNfMl8xXCI6IFtcIi0tLS1eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLV4tLS0tLS0tLVwiLCBcIi0tLS0tLV4tLS0tWC0tWFwiLCBcIi0tLS0tLV4tLS1YWC0tWFwiLCBcIi0tLS0tLV4tLVhYWC0tWFwiLCBcIiMtLS0tLS0tLVgjKi0tKlwiLCBcIi0tLS0tLSYtLVhYWC0tWFwiLCBcIi0tLS0tLS0tLS1YWC0tWFwiLCBcIi0tLS0tLS0tLS0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS1eXl5eXl5eXl5eXlwiXSwgXCI0XzhfMFwiOiBbXCJYWC0tLS0tLS0tWFhYLS1cIiwgXCJYWC0tLS0tLS0tWFhYLS1cIiwgXCJYWC0tLVhYLS0tWFhYLS1cIiwgXCJYWC0jLVhYLSMtWFhYLSNcIiwgXCJYWC0tLS0tLS0tWFhYLS1cIiwgXCJYWFhYLS0tLVhYWFhYWFhcIiwgXCJYWFhYLS0tLVhYWFhYWFhcIiwgXCJYWFhYLS0tLVhYWFhYWFhcIiwgXCIqWFhYLS0tLVhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIjLS0tLS0tLS0tLSYtLS1cIl0sIFwiNF84XzFcIjogW1wiWFgtLS0tLS0tLVhYWC0tXCIsIFwiWFgtLS0tLS0tLVhYWC0tXCIsIFwiWFgtLS1YWC0tLVhYWC0tXCIsIFwiWFgtIy1YWC0jLVhYWC0jXCIsIFwiWFgtLS0tLS0tLVhYWC0tXCIsIFwiWFhYWC0tLS1YWFhYWFhYXCIsIFwiWFhYWC0tLS1YWFhYWFhYXCIsIFwiWFhYWC0tLS1YWFhYWFhYXCIsIFwiKlhYWC0tLS1YWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiIy0tLS0tLS0tLS0mLS0tXCJdLCBcIjRfOF8yXCI6IFtcIlhYWFhYXl5eLS1eXlhYWFwiLCBcIlhYWFhYXl5eLS1eXlhYWFwiLCBcIlgtLVhYXl5eLS1eXlhYWFwiLCBcIi0tLS0tXl5eLS1eXlhYWFwiLCBcIi1YWC0tLS0tLS1eXlhYWFwiLCBcIlhYWFhYLS0tLS1eXlhYWFwiLCBcIlhYWFhYXl5eLS1eXlhYWFwiLCBcIlhYWFhYXl5eLS1eXi0tLVwiLCBcIlhYWFhYXl5eLS0tLS0tLVwiLCBcIlhYWFhYXl5eLS0tLVhYWFwiLCBcIlhYWFhYXl5eLS1eXlhYWFwiXSwgXCIwXzE0XzBcIjogW1wiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiJi0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFgtLS0tLS0tLS0tXCIsIFwiLS0tWFgtLVhYWFhYWFhYXCIsIFwiLS0tLS0tLVhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCJdLCBcIjBfMTRfMVwiOiBbXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCImLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWC0tLS0tLS0tLS1cIiwgXCItLS1YWC0tWFhYWFhYWFhcIiwgXCItLS0tLS0tWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIl0sIFwiMF8xNF8yXCI6IFtcIlhYWFhYWFgtLVhYWFhYWFwiLCBcIlhYWFhYWFgtLVhYWFhYWFwiLCBcIlhYWFhYWFgtLVhYWFhYWFwiLCBcIlhYWFhYWFgtLVhYWFhYWFwiLCBcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIlhYWFhYLS0tLVhYWFhYWFwiLCBcIlhYWFhYLS0tLS0tLS0tLVwiLCBcIlhYWFhYWFgtLS0tLS0tLVwiLCBcIlhYWFhYWFgtLVhYWFhYWFwiLCBcIlhYWFhYWFgtLVhYWFhYWFwiLCBcIlhYWFhYWFgtLVhYWFhYWFwiXSwgXCIwXzEyXzBcIjogW1wiLS0tLS1YWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLS1YWFhYWFhYWFhYXCIsIFwiLy8tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLVhYWFhYWFhYXCIsIFwiLS0tLS0tLVhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiJi0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCJdLCBcIjBfMTJfMVwiOiBbXCItLS0tLVhYWFhYWFhYWFhcIiwgXCJcXFxcXFxcXC0tLVhYWFhYWFhYWFhcIiwgXCIvLy0tLVhYWFhYWFhYWFhcIiwgXCItLS0tLVhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tWFhYWFhYWFhcIiwgXCItLS0tLS0tWFhYWFhYWFhcIiwgXCItLS0tLVhYWFhYWFhYWFhcIiwgXCImLS0tLVhYWFhYWFhYWFhcIiwgXCItLS0tLVhYWFhYWFhYWFhcIiwgXCItLS0tLVhYWFhYWFhYWFhcIl0sIFwiMF8xMl8yXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWC0tLS0tLS1YWComWFwiLCBcIi1YWC0tWFhYLS1YWC0tWFwiLCBcIi1YWC0tLS0tLS1YWC0tWFwiLCBcIi0tLS0tWFhYLS0tLS0tLVwiLCBcIi1YWC0tLS0tLS1YWC0tWFwiLCBcIi1YWC0tWFhYLS1YWC0tWFwiLCBcIi1YWC0tLS0tLS1YWC0tWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIxM18zXzBcIjogW1wiLS0tLV5eXl5eXl5eXl5eXCIsIFwiXFxcXFxcXFwtLS0tLS0tLS0tLS0tXCIsIFwiLy8tLS0tLVgtLS0tLS1YXCIsIFwiLS0tLS0tLVhYLS0tLVhYXCIsIFwiLS0tLS0tLVhYWC0tWFhYXCIsIFwiLS0tLS0tLSojWC0tWCMqXCIsIFwiLS0tLS0tLVhYWC0tWFhYXCIsIFwiLS0tLS0tLVhYLS0tLVhYXCIsIFwiJi0tLS0tLVgtLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLV5eXl5eXl5eXl5eXCJdLCBcIjEzXzNfMVwiOiBbXCItLS0tXl5eXl5eXl5eXl5cIiwgXCJcXFxcXFxcXC0tLS0tLS0tLS0tLS1cIiwgXCIvLy0tLS0tWC0tLS0tLVhcIiwgXCItLS0tLS0tWFgtLS0tWFhcIiwgXCItLS0tLS0tWFhYLS1YWFhcIiwgXCItLS0tLS0tKiNYLS1YIypcIiwgXCItLS0tLS0tWFhYLS1YWFhcIiwgXCItLS0tLS0tWFgtLS0tWFhcIiwgXCImLS0tLS0tWC0tLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tXl5eXl5eXl5eXl5cIl0sIFwiMTNfM18yXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIi0tLVgtLVgtLVgtLSYtLVwiLCBcIi0tLVgtLVgtLVgtLVgtLVwiLCBcIlgtLS0tLVgtLVgtLVgtLVwiLCBcIlgtLS0tLS0tLVgtLVgtLVwiLCBcIlgtLS0tLS0tLS0tLVgtLVwiLCBcIlgtLS0tLS0tLS0tLVgtLVwiLCBcIlgtLS0vL1xcXFxcXFxcLS0tLVgtLVwiLCBcIi0tLS1cXFxcXFxcXC8vLS0tLVgtLVwiLCBcIi0tLS0tLS0tLS0tLVgtLVwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxMl8yXzBcIjogW1wiLS0tLV5eXl5eXl5eXl5eXCIsIFwiXFxcXFxcXFwtLS0tXi0tLS0tLS0tXCIsIFwiLy8tLS0tXi0tLS1YLS1YXCIsIFwiLS0tLS0tXi0tLVhYLS1YXCIsIFwiLS0tLS0tXi0tWFhYLS1YXCIsIFwiLS0tLS0tLS0tWCMqLS0qXCIsIFwiLS0tLS0tJi0tWFhYLS1YXCIsIFwiLS0tLS0tLS0tLVhYLS1YXCIsIFwiJi0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLV5eXl5eXl5eXl5eXCJdLCBcIjEyXzJfMVwiOiBbXCItLS0tXl5eXl5eXl5eXl5cIiwgXCJcXFxcXFxcXC0tLS1eLS0tLS0tLS1cIiwgXCIvLy0tLS1eLS0tLVgtLVhcIiwgXCItLS0tLS1eLS0tWFgtLVhcIiwgXCItLS0tLS1eLS1YWFgtLVhcIiwgXCItLS0tLS0tLS1YIyotLSpcIiwgXCItLS0tLS0mLS1YWFgtLVhcIiwgXCItLS0tLS0tLS0tWFgtLVhcIiwgXCImLS0tLS0tLS0tLVgtLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tXl5eXl5eXl5eXl5cIl0sIFwiMV8xXzBcIjogW1wiLS0tLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiLS0tIy0tJi0tWC0tJi0tXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tWC0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiKi0tLS0tLS0tJi0tLS0tXCJdLCBcIjFfMV8xXCI6IFtcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLSMtLSYtLVgtLSYtLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi9cXFxcXFxcXC0tLS0tLVgtLS0tLVwiLCBcIlxcXFwvLy0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIiotLS0tLS0tLSYtLS0tLVwiXSwgXCIxXzFfMlwiOiBbXCItLS0tJi0tXl4tLS0tLS1cIiwgXCItLS0tWC0tXl4tLS0tLS1cIiwgXCItLS0tWC0tXl4tLS0tLS1cIiwgXCItLS0tWC0tXl4tLS0tLS1cIiwgXCItLS0tWC0tXl4tLS0tLS1cIiwgXCItLS0tWC0tXl4tLS0tLS1cIiwgXCItLS0tWC0tXl4tLS0tLS1cIiwgXCItLS0tWC0tLS0tLS0tLS1cIiwgXCItLS0tWC0tLS0tLS0tLS1cIiwgXCItLS0tWC0tXl4tLS0tLS1cIiwgXCItLS0tWC0tXl4tLS0tLS1cIl0sIFwiMTZfM18wXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIiYtLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS1YLS0tLS0tWFwiLCBcIl5eLS0tLS1YWC0tLS1YWFwiLCBcIl5eXl4tLS1YWFgtLVhYWFwiLCBcIi0tLS0tLS0qI1gtLVgjKlwiLCBcIl5eXl4tLS1YWFgtLVhYWFwiLCBcIl5eLS0tLS1YWC0tLS1YWFwiLCBcIi0tLS0tLS1YLS0tLS0tWFwiLCBcIiYtLS0tLS0tLS0tLS0tLVwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxNl8zXzFcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiJi0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLVgtLS0tLS1YXCIsIFwiXl4tLS0tLVhYLS0tLVhYXCIsIFwiXl5eXi0tLVhYWC0tWFhYXCIsIFwiLS0tLS0tLSojWC0tWCMqXCIsIFwiXl5eXi0tLVhYWC0tWFhYXCIsIFwiXl4tLS0tLVhYLS0tLVhYXCIsIFwiLS0tLS0tLVgtLS0tLS1YXCIsIFwiJi0tLS0tLS0tLS0tLS0tXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjE2XzNfMlwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tWC0tXl5cIiwgXCItWC0tWC0tWC0tWC0tXl5cIiwgXCItWC0tWC0tWC0tWC0tLSZcIiwgXCItWC0tWC0tWC0tWC0tXl5cIiwgXCIjWC0jWC0jWC0jWC0tXl5cIiwgXCItWC0tWC0tWC0tWC0tXl5cIiwgXCItWC0tWC0tWC0tWC0tLSZcIiwgXCItWC0tWC0tWC0tWC0tXl5cIiwgXCItWC0tWC0tWC0tLS0tXl5cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiNV85XzBcIjogW1wiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWC0tXCIsIFwiLS0tLVhYWFhYWFhYWC0tXCIsIFwiLS0tLVhYWFhYWFhYWC0tXCIsIFwiLS0tLS0tKi0tLS0tLS0tXCIsIFwiIy0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLSMtLSMtLS0tXCIsIFwiLS0tLVhYWFhYWFhYWC0tXCIsIFwiLS0tLVhYWFhYWFhYWC0tXCIsIFwiLS0tLVhYWFhYWFhYWCojXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCJdLCBcIjVfOV8xXCI6IFtcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYLVwiLCBcIi0tLS1YWFhYWFhYWFhYLVwiLCBcIi0tLS1YWFhYWFhYWFhYLVwiLCBcIi0tLS0tLSotLS0qLS0tLVwiLCBcIiMtLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0jLS0tIy0tLVwiLCBcIi0tLS1YWFhYWFhYWFhYLVwiLCBcIi0tLS1YWFhYWFhYWFhYLVwiLCBcIi0tLS1YWFhYWFhYWFhYKlwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiXSwgXCIxXzExXzBcIjogW1wiWFgtLVhYWC0tWFhYLS0tXCIsIFwiWFgtLVhYWC0tWFhYLS0tXCIsIFwiWFgtLVhYWC0tWFhYLS0tXCIsIFwiWFgtLVhYWC0tWFhYLS0tXCIsIFwiWFgtLVhYWC0tWFhYLS0tXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiKlhYWFhYWFhYWFhYWFgtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiIy0tLS0mLS0tLSYtLS0tXCJdLCBcIjFfMTFfMVwiOiBbXCJYWC0tWFhYLS1YWFgtLS1cIiwgXCJYWC0tWFhYLS1YWFgtLS1cIiwgXCJYWC0tWFhYLS1YWFgtLS1cIiwgXCJYWC0tWFhYLS1YWFgtLS1cIiwgXCJYWC0tWFhYLS1YWFgtLS1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCIqWFhYWFhYWFhYWFhYWC1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIjLS0tLSYtLS0tJi0tLS1cIl0sIFwiMV8xNV8wXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSYtLS0tLVhYWFhYWFwiLCBcIi0tLS0tLSMtLVhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIiNYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIxXzE1XzFcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tJi0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tIy0tWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiI1hYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjFfMTVfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCItLS0tLS0tI1hYWFgtLS1cIiwgXCJYWFhYWC0tLVhYWFgtLS1cIiwgXCJYWFhYWC0tLS0qLS0tLS1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIl0sIFwiMTRfNF8wXCI6IFtcIlgtLV5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tWC0tWC0tWC0tWFwiLCBcIlgtLS0tWC0tWC0tWC0tWFwiLCBcIlgtLS0tWC0tWC0tWC0tWFwiLCBcIlgtLS0tWC0tWC0tWC0tWFwiLCBcIiotLS0tWC0jWC0jWC0jWFwiLCBcIlgtLS0tWC0tWC0tWC0tWFwiLCBcIlgtLS0tWC0tWC0tWC0tWFwiLCBcIlgtLS0tWC0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlgtLV5eXl5eXl5eXl5eXlwiXSwgXCIxNF80XzFcIjogW1wiWC0tXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS1YLS1YLS1YLS1YXCIsIFwiWC0tLS1YLS1YLS1YLS1YXCIsIFwiWC0tLS1YLS1YLS1YLS1YXCIsIFwiWC0tLS1YLS1YLS1YLS1YXCIsIFwiKi0tLS1YLSNYLSNYLSNYXCIsIFwiWC0tLS1YLS1YLS1YLS1YXCIsIFwiWC0tLS1YLS1YLS1YLS1YXCIsIFwiWC0tLS1YLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiWC0tXl5eXl5eXl5eXl5eXCJdLCBcIjE0XzRfMlwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tLS0mLS1cIiwgXCItLS0tLS0tLS0tLS1YLS1cIiwgXCJYLS0tLVhYWC0tLS1YLS1cIiwgXCJYXi0tLVgqWC0tLS1YLS1cIiwgXCJYXl4tLVgmLS0tLS1YLS1cIiwgXCJYXi0tLVgqWC0tLS1YLS1cIiwgXCJYLS0tLVhYWC0tLS1YLS1cIiwgXCIvL1xcXFxcXFxcLy9cXFxcXFxcXC0tLS1YLS1cIiwgXCJcXFxcXFxcXC8vXFxcXFxcXFwvLy0tLS1YLS1cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTRfNV8wXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tLS1YLVwiLCBcIi0tLS0tLS0tLS0tLS1YLVwiLCBcIi0tLVgtLS0tWFhYLS1YLVwiLCBcIi0tLVheLS0tWCpYLS1YLVwiLCBcIlhYWFheXi0tWCYtLS1YLVwiLCBcIi0tLVheLS0tWCpYLS1YLVwiLCBcIi0tLVgtLS0tWFhYLS1YLVwiLCBcIi0tLS8vXFxcXFxcXFwvL1xcXFxcXFxcLS1YLVwiLCBcIi0tLVxcXFxcXFxcLy9cXFxcXFxcXC8vLS0tLVwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxNF81XzFcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLVgtXCIsIFwiLS0tWC0tLS1YWFgtLVgtXCIsIFwiLS0tWF4tLS1YKlgtLVgtXCIsIFwiWFhYWF5eLS1YJi0tLVgtXCIsIFwiLS0tWF4tLS1YKlgtLVgtXCIsIFwiLS0tWC0tLS1YWFgtLVgtXCIsIFwiLS0tLy9cXFxcXFxcXC8vXFxcXFxcXFwtLVgtXCIsIFwiLS0tXFxcXFxcXFwvL1xcXFxcXFxcLy8tLS0tXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjE0XzVfMlwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tLS0tJi1cIiwgXCItLS0tLS0tLS0tLS0tWC1cIiwgXCItLS1YLS0tLVhYWC0tWC1cIiwgXCItLS1YXi0tLVgqWC0tWC1cIiwgXCJYWFhYXl4tLVgmLS0tWC1cIiwgXCItLS1YXi0tLVgqWC0tWC1cIiwgXCItLS1YLS0tLVhYWC0tWC1cIiwgXCItLS0vL1xcXFxcXFxcLy9cXFxcXFxcXC0tWC1cIiwgXCItLS1cXFxcXFxcXC8vXFxcXFxcXFwvLy0tWC1cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTVfNF8wXCI6IFtcIi0tXl5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tLS0tJlwiLCBcIi0tLS0tLVgtLS0tWC0tWFwiLCBcIi0tLS0tWFgtLS1YWC0tWFwiLCBcIi0tLS1YWFgtLVhYWC0tWFwiLCBcIi0tLS1YIyotLVgjKi0tWFwiLCBcIi0tLS1YWFgtLVhYWC0tWFwiLCBcIi0tLS0tWFgtLS1YWC0tWFwiLCBcIi0tLS0tLVgtLS0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tWFwiLCBcIi0tXl5eXl5eXl5eXl5eXlwiXSwgXCIxNV80XzFcIjogW1wiLS1eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS0mXCIsIFwiLS0tLS0tWC0tLS1YLS1YXCIsIFwiLS0tLS1YWC0tLVhYLS1YXCIsIFwiLS0tLVhYWC0tWFhYLS1YXCIsIFwiLS0tLVgjKi0tWCMqLS1YXCIsIFwiLS0tLVhYWC0tWFhYLS1YXCIsIFwiLS0tLS1YWC0tLVhYLS1YXCIsIFwiLS0tLS0tWC0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiLS1eXl5eXl5eXl5eXl5eXCJdLCBcIjEzXzRfMFwiOiBbXCItXl5eXl5eXl5eXl5eXl5cIiwgXCItXl4tLS0tLS0tLS0tLS1cIiwgXCItXl4tLS0tLS0tLS0tLS1cIiwgXCItXl4tLVgtLVgtLS0tWFhcIiwgXCItLS0tLVgtLVheLS0tWCpcIiwgXCItXl4tLVhYWFheXi0tWCZcIiwgXCItLS0tLVgtLVheLS0tWCpcIiwgXCItXl4tLVgtLVgtLS0tWFhcIiwgXCItXl4tLS0tLS8vXFxcXFxcXFwvL1xcXFxcIiwgXCItXl4tLS0tLVxcXFxcXFxcLy9cXFxcXFxcXC9cIiwgXCItXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTNfNF8xXCI6IFtcIi1eXl5eXl5eXl5eXl5eXlwiLCBcIi1eXi0tLS0tLS0tLS0tLVwiLCBcIi1eXi0tLS0tLS0tLS0tLVwiLCBcIi1eXi0tWC0tWC0tLS1YWFwiLCBcIi0tLS0tWC0tWF4tLS1YKlwiLCBcIi1eXi0tWFhYWF5eLS1YJlwiLCBcIi0tLS0tWC0tWF4tLS1YKlwiLCBcIi1eXi0tWC0tWC0tLS1YWFwiLCBcIi1eXi0tLS0tLy9cXFxcXFxcXC8vXFxcXFwiLCBcIi1eXi0tLS0tXFxcXFxcXFwvL1xcXFxcXFxcL1wiLCBcIi1eXl5eXl5eXl5eXl5eXlwiXSwgXCIxM180XzJcIjogW1wiXl5eXl5eXl5eXl5eXl4tXCIsIFwiLS0tLS1YLS1YLS1YLS0tXCIsIFwiLS0tLS1YLS1YLS1YLS0tXCIsIFwiWFhYLS0tLS1YLS1YLS0tXCIsIFwiWCpYLS0tLS0tLS1YLS0tXCIsIFwiWCYtLS0tLS0tLS0tLS0tXCIsIFwiWCpYLS0tLS0tLS0tLS0tXCIsIFwiWFhYLS0tLy9cXFxcXFxcXC0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tXFxcXFxcXFwvLy0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiXl5eXl5eXl5eXl5eXl4tXCJdLCBcIjRfN18wXCI6IFtcIi0tLS1YWF5eWFhYWF5eXlwiLCBcIlxcXFxcXFxcLS1YWF5eWFhYWF5eXlwiLCBcIi8vLS1YWF5eWFhYWF5eXlwiLCBcIi0tLS1YWF5eWFhYWF5eXlwiLCBcIi0tLS1YWF5eWFhYWF5eXlwiLCBcIi0tLS1YWF5eWFhYWF5eXlwiLCBcIi0tLS1YWF5eLS1YWF5eXlwiLCBcIi0tLS1YWC0tLS0tLV5eXlwiLCBcIiYtLS0tLS0tWFgtLS0tLVwiLCBcIi0tLS0tLV5eWFhYWC0tLVwiLCBcIi0tLS1YWF5eWFhYWF5eXlwiXSwgXCI0XzdfMVwiOiBbXCItLS0tWFhYWFhYXl5eXl5cIiwgXCJcXFxcXFxcXC0tWFhYWFhYXl5eXl5cIiwgXCIvLy0tWFhYWFhYXl5eXl5cIiwgXCItLS0tWFhYWFhYXl5eXl5cIiwgXCItLS0tWFhYWFhYXl5eXl5cIiwgXCItLS0tWFhYWFhYXl5eXl5cIiwgXCItLS0tLS0tLVhYXl5eXl5cIiwgXCItLS0tLS0tLS0tXl5eXl5cIiwgXCImLS0tWFhYWC0tLS0tLS1cIiwgXCItLS0tWFhYWFhYLS0tLS1cIiwgXCItLS0tWFhYWFhYXl5eXl5cIl0sIFwiM18xMl8wXCI6IFtcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIlxcXFxcXFxcLS1YWFhYWFhYWFhYWFwiLCBcIi8vLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS0tLSotLS0jWFhYWFwiLCBcIi0tLS0tLS0tLS0tWFhYWFwiLCBcIi0tLS0tLS0jLS0tLSotLVwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIiYtLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiXSwgXCIzXzEyXzFcIjogW1wiLS0tLVhYWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLVhYWFhYWFhYWFhYXCIsIFwiLy8tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tKi0tLSNYWFhYXCIsIFwiLS0tLS0tLS0tLS1YWFhYXCIsIFwiLS0tLS0tLSMtLS0tKi0tXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiJi0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCJdLCBcIjNfMTJfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYKiZYWC0tWFgtLVhYLS1cIiwgXCJYLS1YWC0tWFgtLVhYLS1cIiwgXCJYLS1YWC0tWFgtLVhYLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYLS1YWC0tWFgtLVhYLS1cIiwgXCJYLS1YWC0tWFgtLVhYLS1cIiwgXCJYLS1YWComWFgqI1hYLS1cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiNF8xM18wXCI6IFtcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tI1hYWFgtLSNYWFwiLCBcIiMtLS0tLVhYWFgtLS1YWFwiLCBcIi0tLS0tLS0qLS0tLS0tKlwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiXSwgXCI0XzEzXzFcIjogW1wiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0jWFhYWC0tI1hYXCIsIFwiIy0tLS0tWFhYWC0tLVhYXCIsIFwiLS0tLS0tLSotLS0tLS0qXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCJdLCBcIjVfMTBfMFwiOiBbXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0qLS0tKi1cIiwgXCIjLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0jLS0tIy0tLSNcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIl0sIFwiNV8xMF8xXCI6IFtcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLSotLS0qLVwiLCBcIiMtLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSMtLS0jLS0tI1wiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiXSwgXCI1XzEwXzJcIjogW1wiWFhYWFhYWFhYLS1eXl5eXCIsIFwiWFhYWFhYWFhYLS0tLVgtXCIsIFwiWFhYWFhYWFhYLS0tLVgtXCIsIFwiWFhYWFhYWFhYLS0tLVgtXCIsIFwiLSNYWFhYWC0tLS0tLVgtXCIsIFwiLS1YWFhYLS0tLS0tLVgtXCIsIFwiLS0tKi0tLS0tLS0tLVgtXCIsIFwiWFhYWFhYWFhYLS0tLVgtXCIsIFwiWFhYWFhYWFhYLS0tLVgtXCIsIFwiWFhYWFhYWFhYLS0tLS0tXCIsIFwiWFhYWFhYWFhYLS1eXl5eXCJdLCBcIjVfOF8wXCI6IFtcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFgtLV5eXlwiLCBcIi0tLVhYWFhYWFgtLS0tLVwiLCBcIi0tLVhYWFhYWFgtLV5eXlwiLCBcIi0tLS0tKi0tLS0tLV5eXlwiLCBcIiMtLS0tLS0tLS0tLV5eXlwiLCBcIi0tLS0tLSMtLS0tLV5eXlwiLCBcIi0tLVhYWFhYWFgtLV5eXlwiLCBcIi0tLVhYWFhYWFgtLS0tLVwiLCBcIi0tLVhYWFhYWFgtLV5eXlwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiXSwgXCI1XzhfMVwiOiBbXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYLS1eXl5cIiwgXCItLS1YWFhYWFhYLS1eXl5cIiwgXCItLS1YWFhYWFhYLS1eXl5cIiwgXCItLS0tLSotLS0tLS1eXl5cIiwgXCIjLS0tLS0tLS0tLS0tJi1cIiwgXCItLS0tLS0jLS0tLS1eXl5cIiwgXCItLS1YWFhYWFhYLS1eXl5cIiwgXCItLS1YWFhYWFhYLS1eXl5cIiwgXCItLS1YWFhYWFhYLS1eXl5cIiwgXCItLS1YWFhYWFhYWFhYWFhcIl0sIFwiNV84XzJcIjogW1wiWFhYWFhYWFgtLVhYWFhYXCIsIFwiXl5eXl5eLS0tLVhYWFhYXCIsIFwiXl5eLS0tLS0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiLS0vL1xcXFxcXFxcLS0tLVhYWFhYXCIsIFwiLS1cXFxcXFxcXC8vLS0tLVhYLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tWFhYXCIsIFwiXl5eLS0tLS0tLVhYWFhYXCIsIFwiXl5eXl5eLS0tLVhYWFhYXCIsIFwiWFhYWFhYWFgtLVhYWFhYXCJdLCBcIjZfOV8wXCI6IFtcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi0tKi0tLS0tLS0tI1hYWFwiLCBcIi1eXl4tLS0tLS0tLVhYWFwiLCBcIi0tJi0tLS0tIy0tLS0qLVwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiXSwgXCI2XzlfMVwiOiBbXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItLSotLS0tLS0tLSNYWFhcIiwgXCItXl5eLS0tLS0tLS1YWFhcIiwgXCItLSYtLS0tLSMtLS0tKi1cIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIl0sIFwiNl85XzJcIjogW1wiXl5eXl4tLVhYWFhYWFheXCIsIFwiLS0tLS0tLVhYWFhYWFheXCIsIFwiLS0tLS0tLVhYWFhYWFheXCIsIFwiWFhYLS0tLVhYWFhYWFheXCIsIFwiWCpYLS0tLVhYWFhYWFheXCIsIFwiWCYtLS0tLVhYWFhYWFheXCIsIFwiWCpYLS0tLS0tLVhYWFheXCIsIFwiWFhYLS0tLS0tLS0tLS1eXCIsIFwiL1xcXFxcXFxcLS0tLVhYWC0tLS0tXCIsIFwiXFxcXC8vLS0tLVhYWFhYWFgtXCIsIFwiXl5eXl4tLVhYWFhYWFheXCJdLCBcIjBfMTZfMFwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS1YWC0tLVhYWFhYWFhcIiwgXCItLS1YWC0tLVhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCIjWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMF8xNl8xXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLVhYLS0tWFhYWFhYWFwiLCBcIi0tLVhYLS0tWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIiNYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIwXzE2XzJcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiWFhYWFgtLVhYWC0tLS0tXCIsIFwiWFhYWFgtLVhYWC0tIy0tXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjBfMTdfMFwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYWFhYLS0tWFhYWFhYWFhcIiwgXCJYWFhYLS0tWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMF8xN18xXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlhYWFgtLS1YWFhYWFhYWFwiLCBcIlhYWFgtLS1YWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIwXzE1XzBcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tJi0tLS1YWC0tWFhYXCIsIFwiLS0tLS0tLS1YWC0tWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiI1hYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjBfMTVfMVwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0mLS0tLVhYLS1YWFhcIiwgXCItLS0tLS0tLVhYLS1YWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCIjWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMF8xNV8yXCI6IFtcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlhYWFgtLS1YWC0tLS0tLVwiLCBcIlhYWFgtLS1YWC0tIy0tLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiXSwgXCIxXzE2XzBcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0jWFhYWC0tLS0tXCIsIFwiLS0mLS0tWFhYWC0tWFhYXCIsIFwiLS0tLS0tLSotLS0tWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjFfMTZfMVwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLSNYWFhYLS0tLS1cIiwgXCItLSYtLS1YWFhYLS1YWFhcIiwgXCItLS0tLS0tKi0tLS1YWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMV8xNl8yXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tKi0tLVwiLCBcIlhYWFhYLS1YWC0tLS0tLVwiLCBcIlhYWFhYLS1YWC0tLSMtLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIyXzEyXzBcIjogW1wiLS0tLVhYWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLVhYWFhYWFhYWFhYXCIsIFwiLy8tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tI1hYWFgtXCIsIFwiLS0tLS0tLS0tLVhYWFgtXCIsIFwiLS0tLS0tIy0tLS0qLS0tXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiJi0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCJdLCBcIjJfMTJfMVwiOiBbXCItLS0tWFhYWFhYWFhYWFhcIiwgXCJcXFxcXFxcXC0tWFhYWFhYWFhYWFhcIiwgXCIvLy0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0jWFhYWC1cIiwgXCItLS0tLS0tLS0tWFhYWC1cIiwgXCItLS0tLS0jLS0tLSotLS1cIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCImLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIl0sIFwiMl8xMV8wXCI6IFtcIlhYLS1YWFgtLVhYWC0tLVwiLCBcIlhYLS1YWFgtLVhYWC0tLVwiLCBcIlhYLS1YWFgtLVhYWC0tLVwiLCBcIlhYLS1YWFgtLVhYWC0jLVwiLCBcIlhYLS1YWFgtLVhYWC0tLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIipYWFhYWFhYWFhYWFhYLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiMtLS0tJi0tLS0mLS0tLVwiXSwgXCIyXzExXzFcIjogW1wiLS0tLS1YWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLS1YWFhYWFhYWFhYXCIsIFwiLy8tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLSNYWFhYXCIsIFwiLS0tLS0tLS0tLS1YWFhYXCIsIFwiLS0tLS0tLSMtLS0tKi0tXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiJi0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCJdLCBcIjJfMTFfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJeLS0tLS0tLVhYKiZYWCpcIiwgXCItLS1YWFgtLVhYLS1YWC1cIiwgXCJeLS0tLS0tLVhYLS1YWC1cIiwgXCItLS1YWFgtLS0tLS0tLS1cIiwgXCJeLS0tLS0tLVhYLS1YWC1cIiwgXCItLS1YWFgtLVhYLS1YWC1cIiwgXCJeLS0tLS0tLVhYLS1YWC1cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiNF8xMl8wXCI6IFtcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIlgtLS0tWFhYWFhYWFhYWFwiLCBcIlhYWC0tWFhYWFhYWFhYWFwiLCBcIi1YWC0tLS0qLS0tI1hYWFwiLCBcIi1YWC0tLS0tLS0tLVhYWFwiLCBcIi1YWC0tLS0tIy0tLS0qLVwiLCBcIiNYWC0tWFhYWFhYWFhYWFwiLCBcIi1YWC0tWFhYWFhYWFhYWFwiLCBcIi1YWC0tWFhYWFhYWFhYWFwiLCBcIi1YWC0tWFhYWFhYWFhYWFwiXSwgXCI0XzEyXzFcIjogW1wiLS0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiWC0tLS1YWFhYWFhYWFhYXCIsIFwiWFhYLS1YWFhYWFhYWFhYXCIsIFwiLVhYLS0tLSotLS0jWFhYXCIsIFwiLVhYLS0tLS0tLS0tWFhYXCIsIFwiLVhYLS0tLS0jLS0tLSotXCIsIFwiI1hYLS1YWFhYWFhYWFhYXCIsIFwiLVhYLS1YWFhYWFhYWFhYXCIsIFwiLVhYLS1YWFhYWFhYWFhYXCIsIFwiLVhYLS1YWFhYWFhYWFhYXCJdLCBcIjEyXzFfMFwiOiBbXCItLS0tXl5eXl5eXl5eXl5cIiwgXCItLS0tLS1eLS1eLS0tLS1cIiwgXCItLS0tLS1eLS1eLS0tLVhcIiwgXCItLS0tLS1eLS1eLS0tWFhcIiwgXCItLS0tLS1eLS1eLS1YWFhcIiwgXCIjLS0tLS0tLS0tLS1YIypcIiwgXCItLS0tLS0mLS0mLS1YWFhcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCItLS0tLS0tLS0tLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tXl5eXl5eXl5eXl5cIl0sIFwiMTJfMV8xXCI6IFtcIi0tLS1eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLV4tLV4tLS0tLVwiLCBcIi0tLS0tLV4tLV4tLS0tWFwiLCBcIi0tLS0tLV4tLV4tLS1YWFwiLCBcIi0tLS0tLV4tLV4tLVhYWFwiLCBcIiMtLS0tLS0tLS0tLVgjKlwiLCBcIi0tLS0tLSYtLSYtLVhYWFwiLCBcIi0tLS0tLS0tLS0tLS1YWFwiLCBcIi0tLS0tLS0tLS0tLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS1eXl5eXl5eXl5eXlwiXSwgXCIyXzBfMFwiOiBbXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0jLS0tLS0mLS0mLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tLS1cIiwgXCJcXFxcLy8tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0qLS0tLS0tLS1cIiwgXCIqLS0tLS0tLS0tLS0tLS1cIl0sIFwiMl8wXzFcIjogW1wiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tIy0tLS0tJi0tJi0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tKi0tLS0tLS0tXCIsIFwiKi0tLS0tLS0tLS0tLS0tXCJdLCBcIjJfMF8yXCI6IFtcIl5eLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tJi0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSotLS0tLS0tLVwiLCBcIl5eLS0tLS0tLS0tLS0tLVwiXSwgXCI1XzEzXzBcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tKi0tLSotXCIsIFwiLS0tJi0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tIy0tLSMtLS0jXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiI1hYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjVfMTNfMVwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0qLS0tKi1cIiwgXCItLS0mLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0jLS0tIy0tLSNcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCIjWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiNV8xM18yXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFgtLVwiLCBcIlhYWFhYWFhYWFhYWFgtLVwiLCBcIlhYWFhYWFhYWFhYWFgtLVwiLCBcIi0tLS0tKi0tLSotLS0tLVwiLCBcIi0mLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSMtLS0jLS0tLVwiLCBcIlhYWFhYWFhYWFhYWFgtLVwiLCBcIlhYWFhYWFhYWFhYWFgtLVwiLCBcIlhYWFhYWFhYWFhYWFgqI1wiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI1XzE0XzBcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0qLS0tLS0tI1hYXCIsIFwiLS0tLS0tLS0tLS0tLVhYXCIsIFwiLS0tLS0tIy0tIy0tLS0qXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiI1hYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjVfMTRfMVwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLSotLS0tLS0jWFhcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCItLS0tLS0jLS0jLS0tLSpcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCIjWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiNV8xNF8yXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tKi0tLSotLS0qLVwiLCBcIi0mLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSMtLS0jLS0tI1wiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI1XzEyXzBcIjogW1wiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0qLS0tLS0tI1hYXCIsIFwiIy0tLS0tLS0tLS0tLVhYXCIsIFwiLS0tLS0tIy0tIy0tLS0qXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCJdLCBcIjVfMTJfMVwiOiBbXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS0tLSotLS0tLS0jWFhcIiwgXCIjLS0tLS0tLS0tLS0tWFhcIiwgXCItLS0tLS0jLS0jLS0tLSpcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIl0sIFwiNl8xM18wXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tKi0tLSotLS0qLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSMtLS0jLS0tI1wiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIiNYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI2XzEzXzFcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0qLS0tKi0tLSotXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tIy0tLSMtLS0jXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiI1hYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjZfMTNfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLSotLS0qLS0tKi1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0jLS0tIy0tLSNcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCIjWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiNV83XzBcIjogW1wiLS0tLVhYWFhYWC0tXl5eXCIsIFwiXFxcXFxcXFwtLVhYWFhYWC0tLS1YXCIsIFwiLy8tLVhYWFhYWC0tLS1YXCIsIFwiLS0tLVhYWFhYWC0tLS1YXCIsIFwiLS0tLS0tKi0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tLSMtLS0tLS1YXCIsIFwiLS0tLVhYWFhYWC0tLS1YXCIsIFwiJi0tLVhYWFhYWC0tLS1YXCIsIFwiLS0tLVhYWFhYWC0tLS0jXCIsIFwiLS0tLVhYWFhYWC0tXl5eXCJdLCBcIjVfN18xXCI6IFtcIi0tLS1YWFhYWFgtLV5eXlwiLCBcIlxcXFxcXFxcLS1YWFhYWFgtLS0tWFwiLCBcIi8vLS1YWFhYWFgtLS0tWFwiLCBcIi0tLS1YWFhYWFgtLS0tWFwiLCBcIi0tLS0tLSotLS0tLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tWFwiLCBcIi0tLS0tLS0jLS0tLS0tWFwiLCBcIi0tLS1YWFhYWFgtLS0tWFwiLCBcIiYtLS1YWFhYWFgtLS0tWFwiLCBcIi0tLS1YWFhYWFgtLS0tI1wiLCBcIi0tLS1YWFhYWFgtLV5eXlwiXSwgXCI1XzdfMlwiOiBbXCJeXl5eLS1YWFhYWFgtLV5cIiwgXCItLS0tLS1YWFhYWFgtLV5cIiwgXCItLS0tLS1YWFhYWFgtLV5cIiwgXCJYWC0tLS1YWFhYWFgtLS1cIiwgXCIqWC0tLS0tLS0tLS0tLS1cIiwgXCImLS0tLS0tLVhYLS0tLV5cIiwgXCIqWC0tLS0tLVhYLS0tLV5cIiwgXCJYWC0tLS1YWFhYWFgtLV5cIiwgXCJcXFxcXFxcXC0tLS1YWFhYWFgtLV5cIiwgXCIvLy0tLS1YWFhYWFgtLV5cIiwgXCJeXl5eLS1YWFhYWFgtLV5cIl0sIFwiMTJfM18wXCI6IFtcIi0tLS0tXl5eXl5eXl5eXlwiLCBcIlxcXFxcXFxcLS0tLS0tLS0tLS0tLVwiLCBcIi8vLS0tLS1YLS0tLS0tWFwiLCBcIi0tLS0tLS1YWC0tLS1YWFwiLCBcIi0tLS0tLS1YWFgtLVhYWFwiLCBcIi0tLS0tLS0qI1gtLVgjKlwiLCBcIi0tLS0tLS1YWFgtLVhYWFwiLCBcIi0tLS0tLS1YWC0tLS1YWFwiLCBcIiYtLS0tLS1YLS0tLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tXl5eXl5eXl5eXlwiXSwgXCIxMl8zXzFcIjogW1wiLS0tLS1eXl5eXl5eXl5eXCIsIFwiXFxcXFxcXFwtLS0tLS0tLS0tLS0tXCIsIFwiLy8tLS0tLVgtLS0tLS1YXCIsIFwiLS0tLS0tLVhYLS0tLVhYXCIsIFwiLS0tLS0tLVhYWC0tWFhYXCIsIFwiLS0tLS0tLSojWC0tWCMqXCIsIFwiLS0tLS0tLVhYWC0tWFhYXCIsIFwiLS0tLS0tLVhYLS0tLVhYXCIsIFwiJi0tLS0tLVgtLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS1eXl5eXl5eXl5eXCJdLCBcIjEwXzNfMFwiOiBbXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLVgtLVgtLS1cIiwgXCItLS0tLS0tLVgtLVgtLS1cIiwgXCItLS0tLS0tLVgtLVgtLS1cIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0jLS0tLVgtI1gtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCIvXFxcXFxcXFwtLS0tLVgtLVgtLS1cIiwgXCJcXFxcLy8tLS0tLVgtLVgtLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIqLS0tLS1eXl5eXl5eXl5cIl0sIFwiMTBfM18xXCI6IFtcIi0tLS0tLV5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tWC0tWC0tLVwiLCBcIi0tLS0tLS0tWC0tWC0tLVwiLCBcIi0tLS0tLS0tWC0tWC0tLVwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi0tLSMtLS0tWC0jWC0tWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi9cXFxcXFxcXC0tLS0tWC0tWC0tLVwiLCBcIlxcXFwvLy0tLS0tWC0tWC0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiotLS0tLV5eXl5eXl5eXlwiXSwgXCIxMF8zXzJcIjogW1wiXl5eXi0tWFhYWFhYWFhYXCIsIFwiLSMtLS0tLS1eXl5eXl5eXCIsIFwiLVgtLS0tLS1eXl5eXl5eXCIsIFwiLVgtLS0tLS1eXl5eXl5eXCIsIFwiLVgtLS0tLS1eXl4tLS1eXCIsIFwiLVgtLS0tLS0tJi0tLS0tXCIsIFwiLVgtLS0tLS1eXl4tLS1eXCIsIFwiLVgtLS0tLS1eXl5eXl5eXCIsIFwiLVgtLS0tLS1eXl5eXl5eXCIsIFwiLVgtLS0tLS1eXl5eXl5eXCIsIFwiXl5eXi0tWFhYWFhYWFhYXCJdLCBcIjJfMTVfMFwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0jWFhYWC0tLS1cIiwgXCItLS0mLS0tWFhYWC0tWFhcIiwgXCItLS0tLS0tLSotLS0tWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCIjWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMl8xNV8xXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLSNYWFhYLS0tLVwiLCBcIi0tLSYtLS1YWFhYLS1YWFwiLCBcIi0tLS0tLS0tKi0tLS1YWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIiNYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIyXzE1XzJcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiLS0tLS0tLSNYWFhYLS0tXCIsIFwiWFgtLS0tLS1YWFhYLS0tXCIsIFwiWFgtLSotLS0tKi0tLS0tXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjExXzBfMFwiOiBbXCItLS0tXl5eXl5eXl5eXl5cIiwgXCJcXFxcXFxcXC0tLS0tLS0qLS0tLSpcIiwgXCIvLy0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLV5eXi0tXl5cIiwgXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0mLS0tLSZcIiwgXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLV5eXi0tXl5cIiwgXCImLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0qLS0tLSpcIiwgXCItLS0tXl5eXl5eXl5eXl5cIl0sIFwiMTFfMF8xXCI6IFtcIi0tLS1eXl5eXl5eXl5eXlwiLCBcIlxcXFxcXFxcLS0tLS0tLSotLS0tKlwiLCBcIi8vLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tXl5eLS1eXlwiLCBcIi0tLS0tLV5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLSYtLS0tJlwiLCBcIi0tLS0tLV5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tXl5eLS1eXlwiLCBcIiYtLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLSotLS0tKlwiLCBcIi0tLS1eXl5eXl5eXl5eXlwiXSwgXCIxMV8wXzJcIjogW1wiXl5eXl5eXl5eLS1eXl4tXCIsIFwiLS0tLS0tWC0tLS1eXl4tXCIsIFwiLS0tLS0tLS0tLS1eXl4tXCIsIFwiLS0tLS0tLS0tLS0tKi0tXCIsIFwiLS0tLS0tLS0tLS1eXl4tXCIsIFwiLS0tLS0tLS0tLS1eXl4tXCIsIFwiLS0tLS0tLS0tLS1eXl4tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS1YLS0tLS0tLS1eXl4tXCIsIFwiLS1YLS0tLS0tLS1eXl4tXCIsIFwiXl5eXl5eXl5eLS1eXl4tXCJdLCBcIjZfOF8wXCI6IFtcIi0tXl5eLS1YWFhYWFhYWFwiLCBcIi0tXl5eLS1YWFhYWFhYWFwiLCBcIi0tXl5eLS1YWFhYWFhYWFwiLCBcIi0tXl5eLS1YWFhYWFhYWFwiLCBcIi0tLSotLS0tLS0tLSNYWFwiLCBcIi0tXl5eLS0tLS0tLS1YWFwiLCBcIi0tLSYtLS0tLSMtLS0tKlwiLCBcIi0tXl5eLS1YWFhYWFhYWFwiLCBcIi0tXl5eLS1YWFhYWFhYWFwiLCBcIi0tXl5eLS1YWFhYWFhYWFwiLCBcIi0tXl5eLS1YWFhYWFhYWFwiXSwgXCI2XzhfMVwiOiBbXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLS0qLS0tLS0tLS0jWFhcIiwgXCItLV5eXi0tLS0tLS0tWFhcIiwgXCItLS0mLS0tLS0jLS0tLSpcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIl0sIFwiMl8xNl8wXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0jWFhYWFwiLCBcIi0tLVhYWFhYLS0tWFhYWFwiLCBcIi0tLVhYWFhYLS0tLSotLVwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIiNYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIyXzE2XzFcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLSNYWFhYXCIsIFwiLS0tWFhYWFgtLS1YWFhYXCIsIFwiLS0tWFhYWFgtLS0tKi0tXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiI1hYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjJfMTZfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tI1hYWFhcIiwgXCJYWFhYWC0tLS0tLVhYWFhcIiwgXCJYWFhYWC0tKi0tLS0qLS1cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMl8xN18wXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFgtLSNYWFhYLVwiLCBcIlhYWFhYWFgtLS1YWFhYLVwiLCBcIi0qLS0tLS0tLS0tKi0tLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIyXzE3XzFcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWC0tI1hYWFgtXCIsIFwiWFhYWFhYWC0tLVhYWFgtXCIsIFwiLSotLS0tLS0tLS0qLS0tXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjJfMTdfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWC0tLSNYWFhcIiwgXCJYWFhYWFhYWC0tLS1YWFhcIiwgXCItKi0tLS0tLS0tLS0tKi1cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiM18xNl8wXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0jWFhYWC0tI1hYWFwiLCBcIi0mLS0tWFhYWC0tLVhYWFwiLCBcIi0tLS0tLSotLS0tLS0qLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIzXzE2XzFcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLSNYWFhYLS0jWFhYXCIsIFwiLSYtLS1YWFhYLS0tWFhYXCIsIFwiLS0tLS0tKi0tLS0tLSotXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjNfMTZfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYLS0tLS0jWFhYWFhcIiwgXCJYWFhYLS0tLS0tWFhYWC1cIiwgXCItKi0tLS0qLS0tLSotLS1cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMTFfM18wXCI6IFtcIi0tLS0tLV5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi0tLSMtLS0tWC0jWC0jWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi9cXFxcXFxcXC0tLS0tWC0tWC0tWFwiLCBcIlxcXFwvLy0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiotLS0tLV5eXl5eXl5eXlwiXSwgXCIxMV8zXzFcIjogW1wiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiLS0tIy0tLS1YLSNYLSNYXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiL1xcXFxcXFxcLS0tLS1YLS1YLS1YXCIsIFwiXFxcXC8vLS0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tXl5eXl5eXl5eXCJdLCBcIjRfMTFfMFwiOiBbXCItLS0tWFhYWFhYWFhYWFhcIiwgXCJcXFxcXFxcXC0tWFhYWFhYWFhYWFhcIiwgXCIvLy0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0qLS0tKi1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0jLS0tIy0tLSNcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCImLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIl0sIFwiNF8xMV8xXCI6IFtcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIlxcXFxcXFxcLS1YWFhYWFhYWFhYWFwiLCBcIi8vLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLSotLS0qLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSMtLS0jLS0tI1wiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIiYtLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiXSwgXCI0XzExXzJcIjogW1wiWFhYWFhYWFhYWC0tXl5eXCIsIFwiWFhYWFhYWFhYWC0tLS1YXCIsIFwiWFhYWFhYWFhYWC0tLS1YXCIsIFwiWFhYWFhYWFhYWC0tLS1YXCIsIFwiWFhYWC0tLS0tLS0tLS1YXCIsIFwiWFhYWC0tLS0tLS0tLS1YXCIsIFwiLSotLS0tKi0tLS0tLS1YXCIsIFwiWFhYWFhYWFhYWC0tLS1YXCIsIFwiWFhYWFhYWFhYWC0tLS1YXCIsIFwiWFhYWFhYWFhYWC0tLS0tXCIsIFwiWFhYWFhYWFhYWC0tXl5eXCJdLCBcIjExXzVfMFwiOiBbXCItLS0tLV5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCJYLS0tLS0tLVgtLVgtLVhcIiwgXCJYWFgtLS0tLVgtLVgtLVhcIiwgXCItWFgtLS0tLVgtLVgtLVhcIiwgXCItWFgtLS0tLVgtI1gtI1hcIiwgXCItWFgtLS0tLVgtLVgtLVhcIiwgXCIjWFgtLS0tLVgtLVgtLVhcIiwgXCItWFgtLS0tLVgtLVgtLVhcIiwgXCItWFgtLS0tLS0tLS0tLS1cIiwgXCItWFgtLV5eXl5eXl5eXl5cIl0sIFwiMTFfNV8xXCI6IFtcIi0tLS0tXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIlgtLS0tLS0tWC0tWC0tWFwiLCBcIlhYWC0tLS0tWC0tWC0tWFwiLCBcIi1YWC0tLS0tWC0tWC0tWFwiLCBcIi1YWC0tLS0tWC0jWC0jWFwiLCBcIi1YWC0tLS0tWC0tWC0tWFwiLCBcIiNYWC0tLS0tWC0tWC0tWFwiLCBcIi1YWC0tLS0tWC0tWC0tWFwiLCBcIi1YWC0tLS0tLS0tLS0tLVwiLCBcIi1YWC0tXl5eXl5eXl5eXlwiXSwgXCIxMV81XzJcIjogW1wiWC0tXl5eXl5eXl5eXl5eXCIsIFwiWC0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS1YLS1YLS0tLVhYXCIsIFwiWC0tLS1YLS1YXi0tLVgqXCIsIFwiWC0tLS1YWFhYXl4tLVgmXCIsIFwiWC0tLS1YLS1YXi0tLVgqXCIsIFwiWC0tLS1YLS1YLS0tLVhYXCIsIFwiWC0tLS0tLS0vL1xcXFxcXFxcLy9cXFxcXCIsIFwiWC0tLS0tLS1cXFxcXFxcXC8vXFxcXFxcXFwvXCIsIFwiWC0tXl5eXl5eXl5eXl5eXCJdLCBcIjExXzZfMFwiOiBbXCJeXl5eXl5eXl5eLS1YWFhcIiwgXCItLS0tWC0tWC0tLS1YWFhcIiwgXCItWC0tWC0tWC0tLS1YWFhcIiwgXCItWC0tWC0tWC0tLS1YWFhcIiwgXCItWC0tWC0tWC0tLS1YWFhcIiwgXCIjWC0jWC0jWC0tLS1YWFhcIiwgXCItWC0tWC0tWC0tLS1YWFhcIiwgXCItWC0tWC0tWC0tLS0tLS1cIiwgXCItWC0tWC0tWC0tLS0tLS1cIiwgXCItWC0tLS0tLS0tLS1YWC1cIiwgXCJeXl5eXl5eXl5eLS1YWFhcIl0sIFwiMTFfNl8xXCI6IFtcIl5eXl5eXl5eXl4tLVhYWFwiLCBcIi0tLS1YLS1YLS0tLVhYWFwiLCBcIi1YLS1YLS1YLS0tLVhYWFwiLCBcIi1YLS1YLS1YLS0tLVhYWFwiLCBcIi1YLS1YLS1YLS0tLVhYWFwiLCBcIiNYLSNYLSNYLS0tLVhYWFwiLCBcIi1YLS1YLS1YLS0tLVhYWFwiLCBcIi1YLS1YLS1YLS0tLS0tLVwiLCBcIi1YLS1YLS1YLS0tLS0tLVwiLCBcIi1YLS0tLS0tLS0tLVhYLVwiLCBcIl5eXl5eXl5eXl4tLVhYWFwiXSwgXCIxMV80XzBcIjogW1wiLS0tLV5eXl5eXl5eXl5eXCIsIFwiXFxcXFxcXFwtLS0tLS0tLS1YLS1YXCIsIFwiLy8tLS0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLVhYLS1YLS1YXCIsIFwiLS0tLS0tWFhYLS1YLS1YXCIsIFwiLS0tLS0tWCMqLS1YLS1YXCIsIFwiLS0tLS0tWFhYLS1YLS1YXCIsIFwiLS0tLS0tLVhYLS1YLS1YXCIsIFwiJi0tLS0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLV5eXl5eXl5eXl5eXCJdLCBcIjExXzRfMVwiOiBbXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYLS0tLS0tLVgtLS0tLS1cIiwgXCJYWFgtLS0tLVhYLS0tLVhcIiwgXCItWFgtLS0tLVhYWC0tWFhcIiwgXCItWFgtLS0tLSojWC0tWCNcIiwgXCItWFgtLS0tLVhYWC0tWFhcIiwgXCIjWFgtLS0tLVhYLS0tLVhcIiwgXCItWFgtLS0tLVgtLS0tLS1cIiwgXCItWFgtLS0tLS0tLS0tLS1cIiwgXCItWFgtLS1eXl5eXl5eXl5cIl0sIFwiMTFfNF8yXCI6IFtcIl5eXl5eXl5eXl4tLVhYWFwiLCBcIi0tLS0tLS1YLS0tLS0tWFwiLCBcIi1YLS1YLS1YLS0tLS0tLVwiLCBcIi1YLS1YLS1YLS0tLS0tWFwiLCBcIi1YLS1YLS1YLS0tLS0tLVwiLCBcIiNYLSNYLSNYLS0tLS0tWFwiLCBcIi1YLS1YLS1YLS0tLS0tLVwiLCBcIi1YLS1YLS1YLS0tLS0tWFwiLCBcIi1YLS1YLS1YLS0tLS0tLVwiLCBcIi1YLS1YLS0tLS0tLS0tWFwiLCBcIl5eXl5eXl5eXl4tLVhYWFwiXSwgXCIxMl81XzBcIjogW1wiXl5eXl5eXl5eXi0tWFheXCIsIFwiLS0tLVgtLVgtLS0tWFheXCIsIFwiLVgtLVgtLVgtLS0tWFheXCIsIFwiLVgtLVgtLVgtLS0tWFheXCIsIFwiLVgtLVgtLVgtLS0tWFheXCIsIFwiI1gtI1gtI1gtLS0tWFheXCIsIFwiLVgtLVgtLVgtLS0tWFheXCIsIFwiLVgtLVgtLVgtLS0tLS1eXCIsIFwiLVgtLVgtLVgtLS0tLS0tXCIsIFwiLVgtLS0tLS0tLS0tWFgtXCIsIFwiXl5eXl5eXl5eXi0tWFheXCJdLCBcIjEyXzVfMVwiOiBbXCJeXl5eXl5eXl5eLS1YWF5cIiwgXCItLS0tWC0tWC0tLS1YWF5cIiwgXCItWC0tWC0tWC0tLS1YWF5cIiwgXCItWC0tWC0tWC0tLS1YWF5cIiwgXCItWC0tWC0tWC0tLS1YWF5cIiwgXCIjWC0jWC0jWC0tLS1YWF5cIiwgXCItWC0tWC0tWC0tLS1YWF5cIiwgXCItWC0tWC0tWC0tLS0tLV5cIiwgXCItWC0tWC0tWC0tLS0tLS1cIiwgXCItWC0tLS0tLS0tLS1YWC1cIiwgXCJeXl5eXl5eXl5eLS1YWF5cIl0sIFwiMTBfNV8wXCI6IFtcIi0tLS0tLV5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIlgtLS0tLS0tWC0tWC0tWFwiLCBcIlhYWC0tLS0tWC0tWC0tWFwiLCBcIi1YWC0tLS0tWC0tWC0tWFwiLCBcIi1YWC0tLS0tWC0jWC0jWFwiLCBcIi1YWC0tLS0tWC0tWC0tWFwiLCBcIiNYWC0tLS0tWC0tWC0tWFwiLCBcIi1YWC0tLS0tWC0tWC0tWFwiLCBcIi1YWC0tLS0tLS0tLS0tLVwiLCBcIi1YWC0tLV5eXl5eXl5eXlwiXSwgXCIxMF81XzFcIjogW1wiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiWC0tLS0tLS1YLS1YLS1YXCIsIFwiWFhYLS0tLS1YLS1YLS1YXCIsIFwiLVhYLS0tLS1YLS1YLS1YXCIsIFwiLVhYLS0tLS1YLSNYLSNYXCIsIFwiLVhYLS0tLS1YLS1YLS1YXCIsIFwiI1hYLS0tLS1YLS1YLS1YXCIsIFwiLVhYLS0tLS1YLS1YLS1YXCIsIFwiLVhYLS0tLS0tLS0tLS0tXCIsIFwiLVhYLS0tXl5eXl5eXl5eXCJdLCBcIjlfNl8wXCI6IFtcIlhYWFgtLV5eXl5eXl5eXlwiLCBcIi1YWFgtLS0tWC0tWC0tWFwiLCBcIi1YWFgtLS0tWC0tWC0tWFwiLCBcIi1YWFgtLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tWC0tWC0jWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi1YWFgtLS0tWC0tWC0tWFwiLCBcIi1YWFgtLS0tWC0tWC0tWFwiLCBcIiNYWFgtLS0tLS0tLS0tLVwiLCBcIlhYWFgtLV5eXl5eXl5eXlwiXSwgXCI5XzZfMVwiOiBbXCJYWFhYLS1eXl5eXl5eXl5cIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtI1hcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCIjWFhYLS0tLS0tLS0tLS1cIiwgXCJYWFhYLS1eXl5eXl5eXl5cIl0sIFwiOV82XzJcIjogW1wiXl5eXl5eXl5eXi0tWFgtXCIsIFwiLS0tLS0tLS0tLS0tWFgtXCIsIFwiLS0tLS0tLS0tLS0tWFgtXCIsIFwiWC0tLS1YWFgtLS0tWFgtXCIsIFwiWF4tLS1YKlgtLS0tLS0tXCIsIFwiWF5eLS1YJi0tLS0tLS0tXCIsIFwiWF4tLS1YKlgtLS0tWFgtXCIsIFwiWC0tLS1YWFgtLS0tWFgtXCIsIFwiLy9cXFxcXFxcXC8vXFxcXFxcXFwtLS0tWFgtXCIsIFwiXFxcXFxcXFwvL1xcXFxcXFxcLy8tLS0tWFgtXCIsIFwiXl5eXl5eXl5eXi0tWFgtXCJdLCBcIjlfN18wXCI6IFtcIlhYWFgtLV5eXl5eXl5eXlwiLCBcIlhYWFgtLS0tWC0tWC0tWFwiLCBcIlhYWFgtLS0tWC0tWC0tWFwiLCBcIlhYWFgtLS0tWC0tWC0tWFwiLCBcIlhYWFgtLS0tWC0tWC0tWFwiLCBcIlhYWFgtLS0tWC0jWC0jWFwiLCBcIlhYWFgtLS0tWC0tWC0tWFwiLCBcIi1YWFgtLS0tWC0tWC0tWFwiLCBcIi1YWFgtLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlhYWFgtLV5eXl5eXl5eXlwiXSwgXCI5XzdfMVwiOiBbXCJYWFhYLS1eXl5eXl5eXl5cIiwgXCJYWFhYLS0tLVgtLVgtLVhcIiwgXCJYWFhYLS0tLVgtLVgtLVhcIiwgXCJYWFhYLS0tLVgtLVgtLVhcIiwgXCJYWFhYLS0tLVgtLVgtLVhcIiwgXCJYWFhYLS0tLVgtI1gtI1hcIiwgXCJYWFhYLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYWFhYLS1eXl5eXl5eXl5cIl0sIFwiOV83XzJcIjogW1wiXl5eXl5eXl5eXi0tWFhYXCIsIFwiLS0tLS0tLS0tLS0tWFhYXCIsIFwiLS0tLS0tLS0tLS0tWFhYXCIsIFwiWC0tLS1YWFgtLS0tWFhYXCIsIFwiWF4tLS1YKlgtLS0tWFhYXCIsIFwiWF5eLS1YJi0tLS0tWFhYXCIsIFwiWF4tLS1YKlgtLS0tWFhYXCIsIFwiWC0tLS1YWFgtLS0tLS1YXCIsIFwiLy9cXFxcXFxcXC8vXFxcXFxcXFwtLS0tLS0tXCIsIFwiXFxcXFxcXFwvL1xcXFxcXFxcLy8tLS0tWFgtXCIsIFwiXl5eXl5eXl5eXi0tWFhYXCJdLCBcIjEwXzZfMFwiOiBbXCJYWFhYLS1eXl5eXl5eXl5cIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLVgtI1gtI1hcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCIjWFhYLS0tLS0tLS0tLS1cIiwgXCJYWFhYLS1eXl5eXl5eXl5cIl0sIFwiMTBfNl8xXCI6IFtcIlhYWFgtLV5eXl5eXl5eXlwiLCBcIi1YWFgtLS0tWC0tWC0tWFwiLCBcIi1YWFgtLS0tWC0tWC0tWFwiLCBcIi1YWFgtLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tWC0jWC0jWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi1YWFgtLS0tWC0tWC0tWFwiLCBcIi1YWFgtLS0tWC0tWC0tWFwiLCBcIiNYWFgtLS0tLS0tLS0tLVwiLCBcIlhYWFgtLV5eXl5eXl5eXlwiXSwgXCIxMF82XzJcIjogW1wiXl5eXl5eXl5eXi0tWFhYXCIsIFwiLS0tLS0tLS0tLS0tWFhYXCIsIFwiLS0tLS0tLS0tLS0tWFhYXCIsIFwiWC0tLS1YWFgtLS0tWFhYXCIsIFwiWF4tLS1YKlgtLS0tLS0jXCIsIFwiWF5eLS1YJi0tLS0tLS0tXCIsIFwiWF4tLS1YKlgtLS0tLS0tXCIsIFwiWC0tLS1YWFgtLS0tWFhYXCIsIFwiLy9cXFxcXFxcXC8vXFxcXFxcXFwtLS0tWFhYXCIsIFwiXFxcXFxcXFwvL1xcXFxcXFxcLy8tLS0tWFhYXCIsIFwiXl5eXl5eXl5eXi0tWFhYXCJdLCBcIjdfOV8wXCI6IFtcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi0tKi0tLS0tKi0tLSNYWFwiLCBcIi1eXl4tLS0tLS0tLS1YWFwiLCBcIi0tJi0tLS0tLSMtLS0tKlwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiXSwgXCI3XzlfMVwiOiBbXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItLSotLS0tLSotLS0jWFhcIiwgXCItXl5eLS0tLS0tLS0tWFhcIiwgXCItLSYtLS0tLS0jLS0tLSpcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIl0sIFwiOF84XzBcIjogW1wiWFhYWFhYWFgtLV5eXl5eXCIsIFwiLVhYWFhYWFgtLS0tLS0tXCIsIFwiLVhYWFhYWFgtLS0tLS1YXCIsIFwiLVhYWFhYWFgtLS0tLVhYXCIsIFwiLS0tLS0tLS0tLS0tWFhYXCIsIFwiLS0tJi0tLS0tLS0tWCMqXCIsIFwiLS0tLS0tKi0tLS0tWFhYXCIsIFwiLVhYWFhYWFgtLS0tLVhYXCIsIFwiLVhYWFhYWFgtLS0tLS1YXCIsIFwiI1hYWFhYWFgtLS0tLS0tXCIsIFwiWFhYWFhYWFgtLV5eXl5eXCJdLCBcIjhfOF8xXCI6IFtcIlhYWFhYWFhYLS1eXl5eXlwiLCBcIi1YWFhYWFhYLS0tLS0tLVwiLCBcIi1YWFhYWFhYLS0tLS0tWFwiLCBcIi1YWFhYWFhYLS0tLS1YWFwiLCBcIi0tLS0tLS0tLS0tLVhYWFwiLCBcIi0tLSYtLS0tLS0tLVgjKlwiLCBcIi0tLS0tLSotLS0tLVhYWFwiLCBcIi1YWFhYWFhYLS0tLS1YWFwiLCBcIi1YWFhYWFhYLS0tLS0tWFwiLCBcIiNYWFhYWFhYLS0tLS0tLVwiLCBcIlhYWFhYWFhYLS1eXl5eXlwiXSwgXCIxMV8yXzBcIjogW1wiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS1eLS0tLS0tXCIsIFwiLS0tLS0tLS1eLS0tLVgtXCIsIFwiLS0tLS0tLS1eLS0tWFgtXCIsIFwiLS0tLS0tLS1eLS1YWFgtXCIsIFwiLS0tIy0tLS0tLS1YIyotXCIsIFwiLS0tLS0tLS0mLS1YWFgtXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tWFgtXCIsIFwiXFxcXC8vLS0tLS0tLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tXl5eXl5eXl5eXCJdLCBcIjExXzJfMVwiOiBbXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLV4tLS0tLS1cIiwgXCItLS0tLS0tLV4tLS0tWC1cIiwgXCItLS0tLS0tLV4tLS1YWC1cIiwgXCItLS0tLS0tLV4tLVhYWC1cIiwgXCItLS0jLS0tLS0tLVgjKi1cIiwgXCItLS0tLS0tLSYtLVhYWC1cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS1YWC1cIiwgXCJcXFxcLy8tLS0tLS0tLS0tWC1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIqLS0tLS1eXl5eXl5eXl5cIl0sIFwiMTFfMl8yXCI6IFtcIi0tLS1eXl5eXl5eXl5eXlwiLCBcIlxcXFxcXFxcLS0tLS0tLS0tXl5eXlwiLCBcIi8vLS0tLS0tWC0tXl5eXlwiLCBcIi0tLS0tLS1YWC0tXl5eXlwiLCBcIi0tLS0tLVhYWC0tXl5eXlwiLCBcIi0tLS0tLVgjKi0tLS0tLVwiLCBcIi0tLS0tLVhYWC0tXl5eXlwiLCBcIi0tLS0tLS1YWC0tXl5eXlwiLCBcIiYtLS0tLS0tWC0tXl5eXlwiLCBcIi0tLS0tLS0tLS0tXl5eXlwiLCBcIi0tLS1eXl5eXl5eXl5eXlwiXSwgXCI1XzExXzBcIjogW1wiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0qLS0tLS0tKi0tXCIsIFwiIy0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tIy0tIy0tLSMtXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCJdLCBcIjVfMTFfMVwiOiBbXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS0tLSotLS0tLS0qLS1cIiwgXCIjLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0jLS0jLS0tIy1cIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIl0sIFwiNV8xMV8yXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWC0tXl5eXlwiLCBcIlhYWFhYWFhYWC0tLS1eXlwiLCBcIlhYWFhYWFhYWC0tLS0tLVwiLCBcIlhYWFgtLS0tLS0tLS0tLVwiLCBcIlhYWFgtLS0tLS0tLS0tLVwiLCBcIi0qLS0tLSotLS0tLS0tLVwiLCBcIlhYWFhYWFhYWC0tLS0tLVwiLCBcIlhYWFhYWFhYWC0tLS1eXlwiLCBcIlhYWFhYWFhYWC0tXl5eXlwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI2XzEwXzBcIjogW1wiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiXi0tLS0tLS0tKi0tLSotXCIsIFwiXl4tLS0tLS0tLS0tLS0tXCIsIFwiXi0tLS0tIy0tLSMtLS0jXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCJdLCBcIjZfMTBfMVwiOiBbXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCJeLS0tLS0tLS0qLS0tKi1cIiwgXCJeXi0tLS0tLS0tLS0tLS1cIiwgXCJeLS0tLS0jLS0tIy0tLSNcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIl0sIFwiNl8xMF8yXCI6IFtcIlhYWFhYWFhYLS1eXl5eXlwiLCBcIlhYWFhYWFhYLS0tLVgtLVwiLCBcIlhYWFhYWFhYLS0tLVgtLVwiLCBcIlhYWFhYWFhYLS0tLVgtLVwiLCBcIlhYWFhYWC0tLS0tLVgtLVwiLCBcIlhYWFhYWC0tLS0tLVgtI1wiLCBcIi0qLS0tLS0tLS0tLVgtLVwiLCBcIlhYWFhYWFhYLS0tLVgtLVwiLCBcIlhYWFhYWFhYLS0tLVgtLVwiLCBcIlhYWFhYWFhYLS0tLS0tLVwiLCBcIlhYWFhYWFhYLS1eXl5eXlwiXSwgXCIxMF83XzBcIjogW1wiXl5eXl5eXl5eLS1YWFhYXCIsIFwiLS0tLS0tLS0tLS1YWFhYXCIsIFwiLS0tLVgtLS0tLS1YWFhYXCIsIFwiWFgtLVhYLS0tLS1YWFhYXCIsIFwiKlgtLVhYWC0tLS1YWFhYXCIsIFwiJi0tLSojWC0tLS1YWFhYXCIsIFwiKlgtLVhYWC0tLS1YWFhYXCIsIFwiWFgtLVhYLS0tLS0tLVhYXCIsIFwiXFxcXFxcXFwtLVgtLS0tLS0tLS0tXCIsIFwiLy8tLS0tLS0tLS1YWC0tXCIsIFwiXl5eXl5eXl5eLS1YWFhYXCJdLCBcIjEwXzdfMVwiOiBbXCJeXl5eXl5eXl4tLVhYWFhcIiwgXCItLS0tLS0tLS0tLVhYWFhcIiwgXCItLS0tWC0tLS0tLVhYWFhcIiwgXCJYWC0tWFgtLS0tLVhYWFhcIiwgXCIqWC0tWFhYLS0tLVhYWFhcIiwgXCImLS0tKiNYLS0tLVhYWFhcIiwgXCIqWC0tWFhYLS0tLVhYWFhcIiwgXCJYWC0tWFgtLS0tLS0tWFhcIiwgXCJcXFxcXFxcXC0tWC0tLS0tLS0tLS1cIiwgXCIvLy0tLS0tLS0tLVhYLS1cIiwgXCJeXl5eXl5eXl4tLVhYWFhcIl0sIFwiMTVfNV8wXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIi0jLS0tLS0tLS0tLS0tLVwiLCBcIi1YLS0tLS0tLS0tLS0tLVwiLCBcIi1YLS1YLS0tWC0tLS1YWFwiLCBcIi1YLS1YLS0tWF4tLS1YKlwiLCBcIi1YLS1YWFhYWF5eLS1YJlwiLCBcIi1YLS1YLS0tWF4tLS1YKlwiLCBcIi1YLS1YLS0tWC0tLS1YWFwiLCBcIi1YLS0tLS0tLy9cXFxcXFxcXC8vXFxcXFwiLCBcIi1YLS0tLS0tXFxcXFxcXFwvL1xcXFxcXFxcL1wiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxNV81XzFcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLSMtLS0tLS0tLS0tLS0tXCIsIFwiLVgtLS0tLS0tLS0tLS0tXCIsIFwiLVgtLVgtLS1YLS0tLVhYXCIsIFwiLVgtLVgtLS1YXi0tLVgqXCIsIFwiLVgtLVhYWFhYXl4tLVgmXCIsIFwiLVgtLVgtLS1YXi0tLVgqXCIsIFwiLVgtLVgtLS1YLS0tLVhYXCIsIFwiLVgtLS0tLS0vL1xcXFxcXFxcLy9cXFxcXCIsIFwiLVgtLS0tLS1cXFxcXFxcXC8vXFxcXFxcXFwvXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjE1XzVfMlwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS1YLS1cIiwgXCJYLS0tLVhYWC0tLVhYLS1cIiwgXCJYXi0tLVgqWC0tWFhYLS1cIiwgXCJYXl4tLVgmLS0tWCMqLS1cIiwgXCJYXi0tLVgqWC0tWFhYLS1cIiwgXCJYLS0tLVhYWC0tLVhYLS1cIiwgXCIvL1xcXFxcXFxcLy9cXFxcXFxcXC0tLS1YLS1cIiwgXCJcXFxcXFxcXC8vXFxcXFxcXFwvLy0tLS0tLS1cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTJfNF8wXCI6IFtcIi0tLS1eXl5eXl5eXl5eXlwiLCBcIlxcXFxcXFxcLS0tLS0tLS0tWC0tWFwiLCBcIi8vLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS1YWC0tWC0tWFwiLCBcIi0tLS0tLVhYWC0tWC0tWFwiLCBcIi0tLS0tLVgjKi0tWC0jWFwiLCBcIi0tLS0tLVhYWC0tWC0tWFwiLCBcIi0tLS0tLS1YWC0tWC0tWFwiLCBcIiYtLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS1eXl5eXl5eXl5eXlwiXSwgXCIxMl80XzFcIjogW1wiLS0tLV5eXl5eXl5eXl5eXCIsIFwiXFxcXFxcXFwtLS0tLS0tLS1YLS1YXCIsIFwiLy8tLS0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLVhYLS1YLS1YXCIsIFwiLS0tLS0tWFhYLS1YLS1YXCIsIFwiLS0tLS0tWCMqLS1YLSNYXCIsIFwiLS0tLS0tWFhYLS1YLS1YXCIsIFwiLS0tLS0tLVhYLS1YLS1YXCIsIFwiJi0tLS0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLV5eXl5eXl5eXl5eXCJdLCBcIjEyXzRfMlwiOiBbXCJeXl5eXl5eXl5eLS1eXl5cIiwgXCItLS0tLS0tLS0tLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLVhcIiwgXCJYLS0tLVhYWC0tLS0tLVhcIiwgXCJYXi0tLVgqWC0tLS0tLVhcIiwgXCJYXl4tLVgmLS0tLS0tLVhcIiwgXCJYXi0tLVgqWC0tLS0tLVhcIiwgXCJYLS0tLVhYWC0tLS0tLVhcIiwgXCIvL1xcXFxcXFxcLy9cXFxcXFxcXC0tLS0tLVhcIiwgXCJcXFxcXFxcXC8vXFxcXFxcXFwvLy0tLS0tLS1cIiwgXCJeXl5eXl5eXl5eLS1eXl5cIl0sIFwiOF85XzBcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiXl5eXl5eLS1YWFhYWFhYXCIsIFwiXl5eLS0tLS1YWFhYWFhYXCIsIFwiLS0tLS0tLS1YWFhYWFhYXCIsIFwiLS0vL1xcXFxcXFxcLS0tLS0tLSotXCIsIFwiLS1cXFxcXFxcXC8vLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLSMtLS0jXCIsIFwiLS0tLS0tLS1YWFhYWFhYXCIsIFwiXl5eLS0tLS1YWFhYWFhYXCIsIFwiXl5eXl5eLS1YWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjhfOV8xXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIl5eXl5eXi0tWFhYWFhYWFwiLCBcIl5eXi0tLS0tWFhYWFhYWFwiLCBcIi0tLS0tLS0tWFhYWFhYWFwiLCBcIi0tLy9cXFxcXFxcXC0tLS0tLS0qLVwiLCBcIi0tXFxcXFxcXFwvLy0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0jLS0tI1wiLCBcIi0tLS0tLS0tWFhYWFhYWFwiLCBcIl5eXi0tLS0tWFhYWFhYWFwiLCBcIl5eXl5eXi0tWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI4XzlfMlwiOiBbXCJeXl5eLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCJYWC0tLS1YWFhYWFhYWFhcIiwgXCIqWC0tLS0tLS0qLS0tKi1cIiwgXCImLS0tLS0tLS0tLS0tLS1cIiwgXCIqWC0tLS0tLS0tIy0tLSNcIiwgXCJYWC0tLS1YWFhYWFhYWFhcIiwgXCJcXFxcXFxcXC0tLS1YWFhYWFhYWFhcIiwgXCIvLy0tLS1YWFhYWFhYWFhcIiwgXCJeXl5eLS1YWFhYWFhYWFhcIl0sIFwiOV84XzBcIjogW1wiXl5eXl5eXi0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLVgtLS0tWFhYWFhYXCIsIFwiLS0tWFgtLS0tWFhYWFhYXCIsIFwiLS1YWFgtLS0tLS0jWFhYXCIsIFwiLS1YIyotLS0tLS0tWFhYXCIsIFwiLS1YWFgtLS0tLS0tLSotXCIsIFwiLS0tWFgtLS0tWFhYWFhYXCIsIFwiLS0tLVgtLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiXl5eXl5eXi0tWFhYWFhYXCJdLCBcIjlfOF8xXCI6IFtcIl5eXl5eXl4tLVhYWFhYWFwiLCBcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIi0tLS1YLS0tLVhYWFhYWFwiLCBcIi0tLVhYLS0tLVhYWFhYWFwiLCBcIi0tWFhYLS0tLS0tI1hYWFwiLCBcIi0tWCMqLS0tLS0tLVhYWFwiLCBcIi0tWFhYLS0tLS0tLS0qLVwiLCBcIi0tLVhYLS0tLVhYWFhYWFwiLCBcIi0tLS1YLS0tLVhYWFhYWFwiLCBcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIl5eXl5eXl4tLVhYWFhYWFwiXSwgXCIxNl81XzBcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS1YLS1YLS1YLS1YXCIsIFwiLS0tLS1YLS1YLS1YLS1YXCIsIFwiWFgtLS1YLS1YLS1YLS1YXCIsIFwiKlgtLS1YLS1YLS1YLS1YXCIsIFwiJi0tLS1YLSNYLSNYLSNYXCIsIFwiKlgtLS1YLS1YLS1YLS1YXCIsIFwiWFgtLS1YLS1YLS1YLS1YXCIsIFwiXFxcXFxcXFwtLS1YLS1YLS1YLS1YXCIsIFwiLy8tLS0tLS0tLS0tLS0tXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjE2XzVfMVwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS0tLVgtLVgtLVgtLVhcIiwgXCItLS0tLVgtLVgtLVgtLVhcIiwgXCJYWC0tLVgtLVgtLVgtLVhcIiwgXCIqWC0tLVgtLVgtLVgtLVhcIiwgXCImLS0tLVgtI1gtI1gtI1hcIiwgXCIqWC0tLVgtLVgtLVgtLVhcIiwgXCJYWC0tLVgtLVgtLVgtLVhcIiwgXCJcXFxcXFxcXC0tLVgtLVgtLVgtLVhcIiwgXCIvLy0tLS0tLS0tLS0tLS1cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiN18xMF8wXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIl5eXl5eXi0tWFhYWFhYWFwiLCBcIl5eXi0tLS0tWFhYWFhYWFwiLCBcIi0tLS0tLS0tWFhYWFhYWFwiLCBcIi0tLy9cXFxcXFxcXC0tLS0jWFhYWFwiLCBcIi0tXFxcXFxcXFwvLy0tLS0tWFhYWFwiLCBcIi0tLS0tLS0tLS0tLSotLVwiLCBcIi0tLS0tLS0tWFhYWFhYWFwiLCBcIl5eXi0tLS0tWFhYWFhYWFwiLCBcIl5eXl5eXi0tWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI3XzEwXzFcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiXl5eXl5eLS1YWFhYWFhYXCIsIFwiXl5eLS0tLS1YWFhYWFhYXCIsIFwiLS0tLS0tLS1YWFhYWFhYXCIsIFwiLS0vL1xcXFxcXFxcLS0tLSNYWFhYXCIsIFwiLS1cXFxcXFxcXC8vLS0tLS1YWFhYXCIsIFwiLS0tLS0tLS0tLS0tKi0tXCIsIFwiLS0tLS0tLS1YWFhYWFhYXCIsIFwiXl5eLS0tLS1YWFhYWFhYXCIsIFwiXl5eXl5eLS1YWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjdfMTBfMlwiOiBbXCJeXl5eXi0tWFhYWFhYWFhcIiwgXCItLS0tLS0tWFhYWFhYWFhcIiwgXCItLS0tLS0tWFhYWFhYWFhcIiwgXCJYWFgtLS0tWFhYWFhYWFhcIiwgXCJYKlgtLS0tLS0jWFhYWFhcIiwgXCJYJi0tLS0tLS0tWFhYWC1cIiwgXCJYKlgtLS0tLS0tLSotLS1cIiwgXCJYWFgtLS0tWFhYWFhYWFhcIiwgXCIvXFxcXFxcXFwtLS0tWFhYWFhYWFhcIiwgXCJcXFxcLy8tLS0tWFhYWFhYWFhcIiwgXCJeXl5eXi0tWFhYWFhYWFhcIl0sIFwiNF8xNl8wXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi0jWFhYWC0tLS0tI1hYWFwiLCBcIi0tWFhYWC0tLS0tLVhYWFwiLCBcIi0tLSotLS0tKi0tLS0qLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI0XzE2XzFcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLSNYWFhYLS0tLS0jWFhYXCIsIFwiLS1YWFhYLS0tLS0tWFhYXCIsIFwiLS0tKi0tLS0qLS0tLSotXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjZfMTFfMFwiOiBbXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS0tLSotLS0qLS0tKi1cIiwgXCIjLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0jLS0tIy0tLSNcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIl0sIFwiNl8xMV8xXCI6IFtcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tKi0tLSotLS0qLVwiLCBcIiMtLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSMtLS0jLS0tI1wiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiXSwgXCIxXzE3XzBcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0jWFhYWFgtXCIsIFwiWFhYWFhYLS0tWFhYWFgtXCIsIFwiWFhYWFhYLS0tLSotLS0tXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjFfMTdfMVwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0jWFhYWC1cIiwgXCJYWFhYWFhYLS0tWFhYWC1cIiwgXCJYWFhYWFhYLS0tLSotLS1cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMTVfNl8wXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlhYWC0tWC0tWC0tLS1YWFwiLCBcIlgqWC0tWC0tWF4tLS1YKlwiLCBcIlgmLS0tWFhYWF5eLS1YJlwiLCBcIlgqWC0tWC0tWF4tLS1YKlwiLCBcIlhYWC0tWC0tWC0tLS1YWFwiLCBcIi9cXFxcXFxcXC0tLS0tLy9cXFxcXFxcXC8vXFxcXFwiLCBcIlxcXFwvLy0tLS0tXFxcXFxcXFwvL1xcXFxcXFxcL1wiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxNV82XzFcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiWFhYLS1YLS1YLS0tLVhYXCIsIFwiWCpYLS1YLS1YXi0tLVgqXCIsIFwiWCYtLS1YWFhYXl4tLVgmXCIsIFwiWCpYLS1YLS1YXi0tLVgqXCIsIFwiWFhYLS1YLS1YLS0tLVhYXCIsIFwiL1xcXFxcXFxcLS0tLS0vL1xcXFxcXFxcLy9cXFxcXCIsIFwiXFxcXC8vLS0tLS1cXFxcXFxcXC8vXFxcXFxcXFwvXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjE1XzZfMlwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYWFgtLVgtLVgtLS0tWFhcIiwgXCJYKlgtLVgtLVheLS0tWCpcIiwgXCJYJi0tLVhYWFheXi0tWCZcIiwgXCJYKlgtLVgtLVheLS0tWCpcIiwgXCJYWFgtLVgtLVgtLS0tWFhcIiwgXCIvXFxcXFxcXFwtLS0tLS8vXFxcXFxcXFwvL1xcXFxcIiwgXCJcXFxcLy8tLS0tLVxcXFxcXFxcLy9cXFxcXFxcXC9cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiNF8xNV8wXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi0tLSNYWFhYLS0tLS0jWFwiLCBcIi0tLS1YWFhYLS0tLS0tWFwiLCBcIi0tLS0tKi0tLS0qLS0tLVwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIiNYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI0XzE1XzFcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tI1hYWFgtLSNYWFhYXCIsIFwiLS0tLVhYWFgtLS1YWFhYXCIsIFwiLS0tLS0qLS0tLS0tKi0tXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiI1hYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjVfMTVfMFwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLSotLS0qLS0tKi1cIiwgXCJYWC0tLS0tLS0tLS0tLS1cIiwgXCJYWC0tLS0jLS0tIy0tLSNcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiNV8xNV8xXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tKi0tLSotLS0qLVwiLCBcIlhYLS0tLS0tLS0tLS0tLVwiLCBcIlhYLS0tLSMtLS0jLS0tI1wiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI4XzEwXzBcIjogW1wiXl5eXi0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiWFgtLS0tWFhYWFhYWFhYXCIsIFwiKlgtLS0tLS0qLS0tI1hYXCIsIFwiJi0tLS0tLS0tLS0tLVhYXCIsIFwiKlgtLS0tLS0tIy0tLS0qXCIsIFwiWFgtLS0tWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLS0tWFhYWFhYWFhYXCIsIFwiLy8tLS0tWFhYWFhYWFhYXCIsIFwiXl5eXi0tWFhYWFhYWFhYXCJdLCBcIjhfMTBfMVwiOiBbXCJeXl5eLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCJYWC0tLS1YWFhYWFhYWFhcIiwgXCIqWC0tLS0tLSotLS0jWFhcIiwgXCImLS0tLS0tLS0tLS0tWFhcIiwgXCIqWC0tLS0tLS0jLS0tLSpcIiwgXCJYWC0tLS1YWFhYWFhYWFhcIiwgXCJcXFxcXFxcXC0tLS1YWFhYWFhYWFhcIiwgXCIvLy0tLS1YWFhYWFhYWFhcIiwgXCJeXl5eLS1YWFhYWFhYWFhcIl0sIFwiN18xMV8wXCI6IFtcIl5eXl5eLS1YWFhYWFhYWFwiLCBcIi0tLS0tLS1YWFhYWFhYWFwiLCBcIi0tLS0tLS1YWFhYWFhYWFwiLCBcIlhYWC0tLS1YWFhYWFhYWFwiLCBcIlgqWC0tLS1YWC0tI1hYWFwiLCBcIlgmLS0tLS1YWC0tLVhYWFwiLCBcIlgqWC0tLS0tLS0tLS0qLVwiLCBcIlhYWC0tLS1YWFhYWFhYWFwiLCBcIi9cXFxcXFxcXC0tLS1YWFhYWFhYWFwiLCBcIlxcXFwvLy0tLS1YWFhYWFhYWFwiLCBcIl5eXl5eLS1YWFhYWFhYWFwiXSwgXCI3XzExXzFcIjogW1wiXl5eXl4tLVhYWFhYWFhYXCIsIFwiLS0tLS0tLVhYWFhYWFhYXCIsIFwiLS0tLS0tLVhYWFhYWFhYXCIsIFwiWFhYLS0tLVhYWFhYWFhYXCIsIFwiWCpYLS0tLVhYLS0jWFhYXCIsIFwiWCYtLS0tLVhYLS0tWFhYXCIsIFwiWCpYLS0tLS0tLS0tLSotXCIsIFwiWFhYLS0tLVhYWFhYWFhYXCIsIFwiL1xcXFxcXFxcLS0tLVhYWFhYWFhYXCIsIFwiXFxcXC8vLS0tLVhYWFhYWFhYXCIsIFwiXl5eXl4tLVhYWFhYWFhYXCJdIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUm9vbUdlbmVyYXRvciA9IHZvaWQgMDtcbmNvbnN0IHJvdF9qc18xID0gcmVxdWlyZShcInJvdC1qc1wiKTtcbmNvbnN0IGdhbWVNYXBfMSA9IHJlcXVpcmUoXCIuLi9nYW1lL2dhbWVNYXBcIik7XG5jb25zdCBiYXNlbGluZUdlbmVyYXRvcl8xID0gcmVxdWlyZShcIi4vYmFzZWxpbmVHZW5lcmF0b3JcIik7XG5jb25zdCBsZXZlbHNfMSA9IHJlcXVpcmUoXCIuL2xldmVsc1wiKTtcbmNvbnN0IHRpbGVGYWN0b3J5XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL3RpbGUvdGlsZUZhY3RvcnlcIikpO1xuY29uc3QgZ2VuZXJhdGlvblV0aWxpdHlfMSA9IHJlcXVpcmUoXCIuL2dlbmVyYXRpb25VdGlsaXR5XCIpO1xuY2xhc3MgUmVjdGFuZ2xlIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMueDEgPSB4O1xuICAgICAgICB0aGlzLngyID0geCArIHdpZHRoO1xuICAgICAgICB0aGlzLnkxID0geTtcbiAgICAgICAgdGhpcy55MiA9IHkgKyBoZWlnaHQ7XG4gICAgfVxuICAgIGNlbnRlcigpIHtcbiAgICAgICAgcmV0dXJuIFtNYXRoLnJvdW5kKCh0aGlzLngxICsgdGhpcy54MikgLyAyKSwgTWF0aC5yb3VuZCgodGhpcy55MSArIHRoaXMueTIpIC8gMildO1xuICAgIH1cbiAgICBpbnRlcnNlY3RzKG90aGVycykge1xuICAgICAgICBmb3IgKGxldCBvdGhlciBvZiBvdGhlcnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLngxIC0gMSA8PSBvdGhlci54MiAmJlxuICAgICAgICAgICAgICAgIHRoaXMueDIgKyAxID49IG90aGVyLngxICYmXG4gICAgICAgICAgICAgICAgdGhpcy55MSAtIDEgPD0gb3RoZXIueTIgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnkyICsgMSA+PSBvdGhlci55MSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5jbGFzcyBSb29tR2VuZXJhdG9yIGV4dGVuZHMgYmFzZWxpbmVHZW5lcmF0b3JfMS5CYXNlTGluZUdlbmVyYXRvciB7XG4gICAgZ2VuZXJhdGUoKSB7XG4gICAgICAgIGxldCBtYXAgPSBuZXcgZ2FtZU1hcF8xLkdhbWVNYXAodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICAvLyBXZSBrbm93IGV2ZXJ5IHJvb20gaW4gdGhpcyBkYXRhc2V0IGhhcyB0aGUgc2FtZSBkaW1lbnNpb25zXG4gICAgICAgIGNvbnN0IHcgPSBsZXZlbHNfMS5MRVZFTFNbJzBfMF8wJ11bMF0ubGVuZ3RoOyAvLyByb29tIHdpZHRoXG4gICAgICAgIGNvbnN0IGggPSBsZXZlbHNfMS5MRVZFTFNbJzBfMF8wJ10ubGVuZ3RoOyAvLyByb29tIGhlaWdodFxuICAgICAgICBjb25zdCBsZXZlbE5hbWVzID0gT2JqZWN0LmtleXMobGV2ZWxzXzEuTEVWRUxTKTtcbiAgICAgICAgLy8gZ2VuZXJhdGUgcmVjdGFuZ2xlcyB0byBmaWxsIGluXG4gICAgICAgIGxldCByb29tcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMwOyArK2kpIHtcbiAgICAgICAgICAgIC8vIHBvc2l0aW9uIGZvciB0aGUgcm9vbVxuICAgICAgICAgICAgY29uc3QgeFBvcyA9IDEgKyBNYXRoLnJvdW5kKHJvdF9qc18xLlJORy5nZXRVbmlmb3JtKCkgKiAodGhpcy53aWR0aCAtIHcgLSAyKSk7XG4gICAgICAgICAgICBjb25zdCB5UG9zID0gMSArIE1hdGgucm91bmQocm90X2pzXzEuUk5HLmdldFVuaWZvcm0oKSAqICh0aGlzLmhlaWdodCAtIGggLSAyKSk7XG4gICAgICAgICAgICBsZXQgbmV3Um9vbSA9IG5ldyBSZWN0YW5nbGUoeFBvcywgeVBvcywgdywgaCk7XG4gICAgICAgICAgICAvLyBjaGVjayBmb3IgaW50ZXJzZWN0aW9uc1xuICAgICAgICAgICAgaWYgKG5ld1Jvb20uaW50ZXJzZWN0cyhyb29tcykpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIG5vIGludGVyc2VjdGlvbiwgcGxhY2UgdGhlIHJvb20gaW4gdGhlIG1hcFxuICAgICAgICAgICAgcm9vbXMucHVzaChuZXdSb29tKTtcbiAgICAgICAgICAgIC8vIGdldCBhIHJvb20gYW5kIGRyYXcgaXQuXG4gICAgICAgICAgICAvLyBOT1RFOiByaWdodCBub3cgd2UgYXJlbid0IGd1YXJhbnRlZWluZyBhIHBhdGggYmV0d2VlbiB0aGUgcm9vbSBiZWNhdXNlXG4gICAgICAgICAgICAvLyB0aGUgcm9vbSBpdHNlbGYgbWF5IGJlIGJsb2NraW5nXG4gICAgICAgICAgICBjb25zdCByb29tSW5kZXggPSBNYXRoLmZsb29yKHJvdF9qc18xLlJORy5nZXRVbmlmb3JtKCkgKiBsZXZlbE5hbWVzLmxlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCByb29tID0gbGV2ZWxzXzEuTEVWRUxTW2xldmVsTmFtZXNbcm9vbUluZGV4XV07XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGg7ICsreSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdzsgKyt4KSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocm9vbVt5XVt4XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnWCc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IGlzIHdhbGwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICctJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcC5zZXRUaWxlKHggKyB4UG9zLCB5ICsgeVBvcywgdGlsZUZhY3RvcnlfMS5kZWZhdWx0LmZsb29yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAuc2V0VGlsZSh4ICsgeFBvcywgeSArIHlQb3MsIHRpbGVGYWN0b3J5XzEuZGVmYXVsdC5mbG9vcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBVbmhhbmRsZWQgdGlsZSB0eXBlOiAke3Jvb21beV1beF19YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBkcmF3IGEgcGF0aCBiZXR3ZWVuIHRoZSB0d28gcm9vbXNcbiAgICAgICAgICAgIGlmIChyb29tcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgbGV0IFt4MSwgeTFdID0gcm9vbXNbcm9vbXMubGVuZ3RoIC0gMl0uY2VudGVyKCk7XG4gICAgICAgICAgICAgICAgbGV0IFt4MiwgeTJdID0gbmV3Um9vbS5jZW50ZXIoKTtcbiAgICAgICAgICAgICAgICBpZiAocm90X2pzXzEuUk5HLmdldFVuaWZvcm0oKSA+IDAuOCkge1xuICAgICAgICAgICAgICAgICAgICAoMCwgZ2VuZXJhdGlvblV0aWxpdHlfMS5icmVzZW5oYW0pKHgxLCB5MSwgeDIsIHkyLCAoeCwgeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwLnNldFRpbGUoeCwgeSwgdGlsZUZhY3RvcnlfMS5kZWZhdWx0LmZsb29yKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAoMCwgZ2VuZXJhdGlvblV0aWxpdHlfMS5zdHJhaWdodExpbmVDb25uZWN0aW9uKSh4MSwgeTEsIHgyLCB5MiwgKHgsIHkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcC5zZXRUaWxlKHgsIHksIHRpbGVGYWN0b3J5XzEuZGVmYXVsdC5mbG9vcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjZW50ZXIgPSByb29tc1tyb29tcy5sZW5ndGggLSAxXS5jZW50ZXIoKTtcbiAgICAgICAgcmV0dXJuIFttYXAsIGNlbnRlclswXSwgY2VudGVyWzFdXTtcbiAgICB9XG59XG5leHBvcnRzLlJvb21HZW5lcmF0b3IgPSBSb29tR2VuZXJhdG9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlRpbGUgPSB2b2lkIDA7XG5jbGFzcyBUaWxlIHtcbiAgICBjb25zdHJ1Y3RvcihjaGFyLCB3YWxrYWJsZSwgaW5WaWV3RkcsIGluVmlld0JHLCBvdXRPZlZpZXdGRywgb3V0T2ZWaWV3QkcpIHtcbiAgICAgICAgdGhpcy5jaGFyID0gY2hhcjtcbiAgICAgICAgdGhpcy53YWxrYWJsZSA9IHdhbGthYmxlO1xuICAgICAgICB0aGlzLmluVmlld0ZHID0gaW5WaWV3Rkc7XG4gICAgICAgIHRoaXMuaW5WaWV3QkcgPSBpblZpZXdCRztcbiAgICAgICAgdGhpcy5vdXRPZlZpZXdGRyA9IG91dE9mVmlld0ZHO1xuICAgICAgICB0aGlzLm91dE9mVmlld0JHID0gb3V0T2ZWaWV3Qkc7XG4gICAgfVxufVxuZXhwb3J0cy5UaWxlID0gVGlsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29sb3JzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL3V0aWxpdHkvY29sb3JzXCIpKTtcbmNvbnN0IHRpbGVfMSA9IHJlcXVpcmUoXCIuL3RpbGVcIik7XG5sZXQgdGlsZUZhY3RvcnkgPSB7fTtcbnRpbGVGYWN0b3J5LmZsb29yID0gbmV3IHRpbGVfMS5UaWxlKCcuJywgdHJ1ZSwgY29sb3JzXzEuZGVmYXVsdC52aXNpYmxlLCBjb2xvcnNfMS5kZWZhdWx0LmJsYWNrLCBjb2xvcnNfMS5kZWZhdWx0LmRhcmtHcmF5LCBjb2xvcnNfMS5kZWZhdWx0LmJsYWNrKTtcbnRpbGVGYWN0b3J5LndhbGwgPSBuZXcgdGlsZV8xLlRpbGUoJyMnLCBmYWxzZSwgY29sb3JzXzEuZGVmYXVsdC52aXNpYmxlLCBjb2xvcnNfMS5kZWZhdWx0LmJsYWNrLCBjb2xvcnNfMS5kZWZhdWx0LmRhcmtHcmF5LCBjb2xvcnNfMS5kZWZhdWx0LmJsYWNrKTtcbnRpbGVGYWN0b3J5LmRvd25TdGFpcnMgPSBuZXcgdGlsZV8xLlRpbGUoJz4nLCBmYWxzZSwgY29sb3JzXzEuZGVmYXVsdC5saWdodEdyYXksIGNvbG9yc18xLmRlZmF1bHQuYmxhY2ssIGNvbG9yc18xLmRlZmF1bHQuZGFya0dyYXksIGNvbG9yc18xLmRlZmF1bHQuYmxhY2spO1xuZXhwb3J0cy5kZWZhdWx0ID0gdGlsZUZhY3Rvcnk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQnV0dG9uID0gdm9pZCAwO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IGlucHV0TWFuYWdlcl8xID0gcmVxdWlyZShcIi4uL2dhbWUvaW5wdXRNYW5hZ2VyXCIpO1xuY2xhc3MgQnV0dG9uIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3aWR0aCwgaGVpZ2h0LCB0ZXh0LCB0ZXh0Q29sb3IsIHRleHRIaWdobGlnaHRlZENvbG9yLCBmcmFtZUNvbG9yLCBmcmFtZUhpZ2hsaWdodGVkQ29sb3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgICAgIHRoaXMudGV4dENvbG9yID0gdGV4dENvbG9yO1xuICAgICAgICB0aGlzLnRleHRIaWdobGlnaHRlZENvbG9yID0gdGV4dEhpZ2hsaWdodGVkQ29sb3I7XG4gICAgICAgIHRoaXMuZnJhbWVDb2xvciA9IGZyYW1lQ29sb3I7XG4gICAgICAgIHRoaXMuZnJhbWVIaWdobGlnaHRlZENvbG9yID0gZnJhbWVIaWdobGlnaHRlZENvbG9yO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG4gICAgcmVuZGVyKGRpc3BsYXkpIHtcbiAgICAgICAgLy8gY2hvb3NlIGNvbG9ycyBiYXNlZCBvbiB3aGV0aGVyIG9yIG5vdCB0aGUgYnV0dG9uIGlzIGhpZ2hsaWdodGVkXG4gICAgICAgIGNvbnN0IGZyYW1lQ29sb3IgPSB0aGlzLmhpZ2hsaWdodGVkID8gdGhpcy5mcmFtZUhpZ2hsaWdodGVkQ29sb3IgOiB0aGlzLmZyYW1lQ29sb3I7XG4gICAgICAgIGNvbnN0IHRleHRDb2xvciA9IHRoaXMuaGlnaGxpZ2h0ZWQgPyB0aGlzLnRleHRIaWdobGlnaHRlZENvbG9yIDogdGhpcy50ZXh0Q29sb3I7XG4gICAgICAgIC8vIGRyYXcgZnJhbWVcbiAgICAgICAgKDAsIHV0aWxfMS5kcmF3RnJhbWUpKGRpc3BsYXksIHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgZnJhbWVDb2xvcik7XG4gICAgICAgIC8vIGRyYXdGcmFtZShkaXNwbGF5LCB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICAvLyBkcmF3IHRleHQgaW4gdGhlIGNlbnRlciBvZiB0aGUgYnV0dG9uXG4gICAgICAgIGxldCBjZW50ZXIgPSB0aGlzLndpZHRoIC8gMjtcbiAgICAgICAgZGlzcGxheS5kcmF3VGV4dCh0aGlzLnggKyBjZW50ZXIgLSB0aGlzLnRleHQubGVuZ3RoIC8gMiwgdGhpcy55ICsgMSwgYCVjeyR7dGV4dENvbG9yfX0ke3RoaXMudGV4dH1gKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5oaWdobGlnaHRlZCAmJiBpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5FTlRFUikpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1lbnUgPSB2b2lkIDA7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuY29uc3QgaW5wdXRNYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi4vZ2FtZS9pbnB1dE1hbmFnZXJcIik7XG5jbGFzcyBNZW51IHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3aWR0aCwgaGVpZ2h0LCB0aXRsZSwgZHJhd091dGxpbmUsIGV4aXRPbkVzY2FwZSwgdXBkYXRlQ2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmRyYXdPdXRsaW5lID0gZHJhd091dGxpbmU7XG4gICAgICAgIHRoaXMuZXhpdE9uRXNjYXBlID0gZXhpdE9uRXNjYXBlO1xuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5idXR0b25JbmRleCA9IDA7XG4gICAgICAgIHRoaXMudGV4dCA9IFtdO1xuICAgICAgICB0aGlzLnNob3VsZFJlbmRlciA9IHRydWU7XG4gICAgICAgIHRoaXMuc2hvdWxkRXhpdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVwZGF0ZUNhbGxiYWNrID0gdXBkYXRlQ2FsbGJhY2s7XG4gICAgICAgIHRoaXMuY2hpbGRNZW51ID0gbnVsbDtcbiAgICB9XG4gICAgYWRkQnV0dG9uKGJ1dHRvbikge1xuICAgICAgICB0aGlzLmJ1dHRvbnMucHVzaChidXR0b24pO1xuICAgICAgICBpZiAodGhpcy5idXR0b25zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5idXR0b25zWzBdLmhpZ2hsaWdodGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGRUZXh0KHRleHQpIHtcbiAgICAgICAgdGhpcy50ZXh0LnB1c2godGV4dCk7XG4gICAgfVxuICAgIHJlbmRlcihkaXNwbGF5KSB7XG4gICAgICAgICgwLCB1dGlsXzEuZHJhd0ZyYW1lV2l0aFRpdGxlKShkaXNwbGF5LCB0aGlzLnRpdGxlLCB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBpZiAodGhpcy5jaGlsZE1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRNZW51LnJlbmRlcihkaXNwbGF5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGIgb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICAgICAgICAgICAgYi5yZW5kZXIoZGlzcGxheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCB0IG9mIHRoaXMudGV4dCkge1xuICAgICAgICAgICAgICAgIHQucmVuZGVyKGRpc3BsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvdWxkUmVuZGVyID0gZmFsc2U7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRNZW51KSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkTWVudS51cGRhdGUoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkTWVudS5zaG91bGRFeGl0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZE1lbnUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdWxkUmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5idXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5SSUdIVCkgfHwgaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmlzS2V5RG93bihpbnB1dE1hbmFnZXJfMS5LZXkuRCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnNbdGhpcy5idXR0b25JbmRleF0uaGlnaGxpZ2h0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbkluZGV4ID0gTWF0aC5taW4odGhpcy5idXR0b25zLmxlbmd0aCAtIDEsIHRoaXMuYnV0dG9uSW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnNbdGhpcy5idXR0b25JbmRleF0uaGlnaGxpZ2h0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdWxkUmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LkxFRlQpIHx8IGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LkEpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25zW3RoaXMuYnV0dG9uSW5kZXhdLmhpZ2hsaWdodGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25JbmRleCA9IE1hdGgubWF4KDAsIHRoaXMuYnV0dG9uSW5kZXggLSAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnNbdGhpcy5idXR0b25JbmRleF0uaGlnaGxpZ2h0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdWxkUmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYnV0dG9uc1t0aGlzLmJ1dHRvbkluZGV4XS51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5leGl0T25Fc2NhcGUgJiYgaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmlzS2V5RG93bihpbnB1dE1hbmFnZXJfMS5LZXkuRVNDQVBFKSkge1xuICAgICAgICAgICAgdGhpcy5zaG91bGRFeGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5NZW51ID0gTWVudTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UZXh0ID0gdm9pZCAwO1xuY2xhc3MgVGV4dCB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgdGV4dCwgZmcsIGJnKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgICAgIHRoaXMuZmcgPSBmZztcbiAgICAgICAgdGhpcy5iZyA9IGJnO1xuICAgIH1cbiAgICByZW5kZXIoZGlzcGxheSkge1xuICAgICAgICAvLyBmb3IobGV0IGMgb2YgdGhpcy50ZXh0KSB7XG4gICAgICAgIC8vICAgZGlzcGxheS5kcmF3T3Zlcih0aGlzLngsIHRoaXMueSwgYywgdGhpcy5mZywgdGhpcy5iZyk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgZGlzcGxheS5kcmF3VGV4dCh0aGlzLngsIHRoaXMueSwgYCVjeyR7dGhpcy5mZ319JWJ7JHt0aGlzLmJnfX0ke3RoaXMudGV4dH1gKTtcbiAgICB9XG59XG5leHBvcnRzLlRleHQgPSBUZXh0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1haW5NZW51ID0gZXhwb3J0cy5oZWxwTWVudSA9IHZvaWQgMDtcbmNvbnN0IGlucHV0TWFuYWdlcl8xID0gcmVxdWlyZShcIi4uL2dhbWUvaW5wdXRNYW5hZ2VyXCIpO1xuY29uc3QgY29sb3JzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL3V0aWxpdHkvY29sb3JzXCIpKTtcbmNvbnN0IGJ1dHRvbl8xID0gcmVxdWlyZShcIi4vYnV0dG9uXCIpO1xuY29uc3QgbWVudV8xID0gcmVxdWlyZShcIi4vbWVudVwiKTtcbmNvbnN0IHRleHRfMSA9IHJlcXVpcmUoXCIuL3RleHRcIik7XG5mdW5jdGlvbiBoZWxwTWVudSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgY29uc3QgeCA9IHdpZHRoIC8gNDtcbiAgICBjb25zdCB5ID0gaGVpZ2h0IC8gNDtcbiAgICBsZXQgbSA9IG5ldyBtZW51XzEuTWVudSh4LCB5LCB3aWR0aCAvIDIsIGhlaWdodCAvIDIsIFwiSGVscFwiLCB0cnVlLCB0cnVlLCAoKSA9PiB7XG4gICAgICAgIGlmIChpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5ILCBpbnB1dE1hbmFnZXJfMS5LZXkuRU5URVIsIGlucHV0TWFuYWdlcl8xLktleS5FU0NBUEUpKSB7XG4gICAgICAgICAgICBtLnNob3VsZEV4aXQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgbS5hZGRCdXR0b24obmV3IGJ1dHRvbl8xLkJ1dHRvbih3aWR0aCAvIDIgLSA0LCBoZWlnaHQgLSBoZWlnaHQgLyA0IC0gNCwgOCwgMywgXCJPa1wiLCBjb2xvcnNfMS5kZWZhdWx0LmxpZ2h0R3JheSwgY29sb3JzXzEuZGVmYXVsdC53aGl0ZSwgY29sb3JzXzEuZGVmYXVsdC5saWdodEdyYXksIGNvbG9yc18xLmRlZmF1bHQud2hpdGUsICgpID0+IHsgfSkpO1xuICAgIG0uYWRkVGV4dChuZXcgdGV4dF8xLlRleHQoeCArIDMsIHkgKyAzLCBcIldBU0Qgb3IgYXJyb3cga2V5cyB0byBtb3ZlLlwiLCBjb2xvcnNfMS5kZWZhdWx0LndoaXRlLCBjb2xvcnNfMS5kZWZhdWx0LmJsYWNrKSk7XG4gICAgbS5hZGRUZXh0KG5ldyB0ZXh0XzEuVGV4dCh4ICsgMywgeSArIDQsIFwiSSB0byBpbnNwZWN0LlwiLCBjb2xvcnNfMS5kZWZhdWx0LndoaXRlLCBjb2xvcnNfMS5kZWZhdWx0LmJsYWNrKSk7XG4gICAgcmV0dXJuIG07XG59XG5leHBvcnRzLmhlbHBNZW51ID0gaGVscE1lbnU7XG5mdW5jdGlvbiBtYWluTWVudSh3aWR0aCwgaGVpZ2h0LCBjYWxsYmFjaykge1xuICAgIGxldCBtID0gbmV3IG1lbnVfMS5NZW51KDAsIDAsIHdpZHRoLCBoZWlnaHQsIFwiTWFpbiBNZW51XCIsIHRydWUsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgIGlmIChpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5TUEFDRSwgaW5wdXRNYW5hZ2VyXzEuS2V5LkVOVEVSKSkge1xuICAgICAgICAgICAgbS5zaG91bGRFeGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmlzS2V5RG93bihpbnB1dE1hbmFnZXJfMS5LZXkuSCkpIHtcbiAgICAgICAgICAgIG0uY2hpbGRNZW51ID0gaGVscE1lbnUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICBtLnNob3VsZFJlbmRlciA9IHRydWU7XG4gICAgICAgICAgICBpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHRpdGxlID0gXCJTY2FyeSBEdW5nZW9uXCI7XG4gICAgbS5hZGRUZXh0KG5ldyB0ZXh0XzEuVGV4dCh3aWR0aCAvIDIgLSB0aXRsZS5sZW5ndGggLyAyLCBoZWlnaHQgLyAyIC0gMTAsIHRpdGxlLCBjb2xvcnNfMS5kZWZhdWx0LnllbGxvdywgY29sb3JzXzEuZGVmYXVsdC5ibGFjaykpO1xuICAgIGNvbnN0IGF0dHJpYnV0aW9uID0gXCJieSBDb2xhbiBGLiBCaWVtZXJcIjtcbiAgICBtLmFkZFRleHQobmV3IHRleHRfMS5UZXh0KHdpZHRoIC8gMiAtIGF0dHJpYnV0aW9uLmxlbmd0aCAvIDIsIGhlaWdodCAvIDIgLSA4LCBhdHRyaWJ1dGlvbiwgY29sb3JzXzEuZGVmYXVsdC5saWdodEdyYXksIGNvbG9yc18xLmRlZmF1bHQuYmxhY2spKTtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBcIlByZXNzIHNwYWNlIHRvIHN0YXJ0IG9yIGggZm9yIGluc3RydWN0aW9ucy5cIjtcbiAgICBtLmFkZFRleHQobmV3IHRleHRfMS5UZXh0KHdpZHRoIC8gMiAtIGluc3RydWN0aW9ucy5sZW5ndGggLyAyLCBoZWlnaHQgLyAyLCBpbnN0cnVjdGlvbnMsIGNvbG9yc18xLmRlZmF1bHQud2hpdGUsIGNvbG9yc18xLmRlZmF1bHQuYmxhY2spKTtcbiAgICByZXR1cm4gbTtcbn1cbmV4cG9ydHMubWFpbk1lbnUgPSBtYWluTWVudTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kcmF3RnJhbWUgPSBleHBvcnRzLmRyYXdGcmFtZVdpdGhUaXRsZSA9IHZvaWQgMDtcbmNvbnN0IHRvcExlZnQgPSAn4pSMJztcbmNvbnN0IHRvcFJpZ2h0ID0gJ+KUkCc7XG5jb25zdCBib3R0b21MZWZ0ID0gJ+KUlCc7XG5jb25zdCBib3R0b21SaWdodCA9ICfilJgnO1xuY29uc3QgdmVydGljYWwgPSAn4pSCJztcbmNvbnN0IGhvcml6b250YWwgPSAn4pSAJztcbmNvbnN0IGxlZnRUaXRsZSA9ICfilKQnO1xuY29uc3QgcmlnaHRUaXRsZSA9ICfilJwnO1xuY29uc3QgZW1wdHkgPSAnICc7XG5mdW5jdGlvbiBkcmF3RnJhbWVXaXRoVGl0bGUoZGlzcGxheSwgdGl0bGUsIHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYm9kaWRkbGllL2pzLXJvZ3VlLXR1dG9yaWFsL2Jsb2IvbWFpbi9zcmMvcmVuZGVyLWZ1bmN0aW9ucy50cyNMNTZcbiAgICBjb25zdCBpbm5lcldpZHRoID0gd2lkdGggLSAyO1xuICAgIGNvbnN0IGlubmVySGVpZ2h0ID0gaGVpZ2h0IC0gMjtcbiAgICBjb25zdCByZW1haW5pbmdBZnRlclRpdGxlID0gaW5uZXJXaWR0aCAtICh0aXRsZS5sZW5ndGggKyAyKTsgLy8gYWRkaW5nIHR3byBiZWNhdXNlIG9mIHRoZSBib3JkZXJzIG9uIGxlZnQgYW5kIHJpZ2h0XG4gICAgY29uc3QgbGVmdCA9IE1hdGguZmxvb3IocmVtYWluaW5nQWZ0ZXJUaXRsZSAvIDIpO1xuICAgIGNvbnN0IHRvcFJvdyA9IHRvcExlZnQgK1xuICAgICAgICBob3Jpem9udGFsLnJlcGVhdChsZWZ0KSArXG4gICAgICAgIGxlZnRUaXRsZSArXG4gICAgICAgIHRpdGxlICtcbiAgICAgICAgcmlnaHRUaXRsZSArXG4gICAgICAgIGhvcml6b250YWwucmVwZWF0KHJlbWFpbmluZ0FmdGVyVGl0bGUgLSBsZWZ0KSArXG4gICAgICAgIHRvcFJpZ2h0O1xuICAgIGNvbnN0IG1pZGRsZVJvdyA9IHZlcnRpY2FsICsgZW1wdHkucmVwZWF0KGlubmVyV2lkdGgpICsgdmVydGljYWw7XG4gICAgY29uc3QgYm90dG9tUm93ID0gYm90dG9tTGVmdCArIGhvcml6b250YWwucmVwZWF0KGlubmVyV2lkdGgpICsgYm90dG9tUmlnaHQ7XG4gICAgZGlzcGxheS5kcmF3VGV4dCh4LCB5LCB0b3BSb3cpO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGlubmVySGVpZ2h0OyBpKyspIHtcbiAgICAgICAgZGlzcGxheS5kcmF3VGV4dCh4LCB5ICsgaSwgbWlkZGxlUm93KTtcbiAgICB9XG4gICAgZGlzcGxheS5kcmF3VGV4dCh4LCB5ICsgaGVpZ2h0IC0gMSwgYm90dG9tUm93KTtcbn1cbmV4cG9ydHMuZHJhd0ZyYW1lV2l0aFRpdGxlID0gZHJhd0ZyYW1lV2l0aFRpdGxlO1xuZnVuY3Rpb24gZHJhd0ZyYW1lKGRpc3BsYXksIHgsIHksIHdpZHRoLCBoZWlnaHQsIGZyYW1lQ29sb3IpIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYm9kaWRkbGllL2pzLXJvZ3VlLXR1dG9yaWFsL2Jsb2IvbWFpbi9zcmMvcmVuZGVyLWZ1bmN0aW9ucy50cyNMNTZcbiAgICBjb25zdCBpbm5lcldpZHRoID0gd2lkdGggLSAyO1xuICAgIGNvbnN0IGlubmVySGVpZ2h0ID0gaGVpZ2h0IC0gMjtcbiAgICBjb25zdCB0b3BSb3cgPSB0b3BMZWZ0ICsgaG9yaXpvbnRhbC5yZXBlYXQoaW5uZXJXaWR0aCkgKyB0b3BSaWdodDtcbiAgICBjb25zdCBtaWRkbGVSb3cgPSB2ZXJ0aWNhbCArIGVtcHR5LnJlcGVhdChpbm5lcldpZHRoKSArIHZlcnRpY2FsO1xuICAgIGNvbnN0IGJvdHRvbVJvdyA9IGJvdHRvbUxlZnQgKyBob3Jpem9udGFsLnJlcGVhdChpbm5lcldpZHRoKSArIGJvdHRvbVJpZ2h0O1xuICAgIGRpc3BsYXkuZHJhd1RleHQoeCwgeSwgYCVjeyR7ZnJhbWVDb2xvcn19JHt0b3BSb3d9YCk7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gaW5uZXJIZWlnaHQ7IGkrKykge1xuICAgICAgICBkaXNwbGF5LmRyYXdUZXh0KHgsIHkgKyBpLCBgJWN7JHtmcmFtZUNvbG9yfX0ke21pZGRsZVJvd31gKTtcbiAgICB9XG4gICAgZGlzcGxheS5kcmF3VGV4dCh4LCB5ICsgaGVpZ2h0IC0gMSwgYCVjeyR7ZnJhbWVDb2xvcn19JHtib3R0b21Sb3d9YCk7XG59XG5leHBvcnRzLmRyYXdGcmFtZSA9IGRyYXdGcmFtZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICAgIGVycm9yOiBcInJnYmEoMjU1LDQwLDQwLDEpXCIsXG4gICAgd2hpdGU6IFwicmdiYSgyNTUsMjU1LDI1NSwxKVwiLFxuICAgIGJsYWNrOiBcInJnYmEoMCwwLDAsMClcIixcbiAgICBkYXJrR3JheTogXCJyZ2JhKDcwLDcwLDcwLDEpXCIsXG4gICAgbGlnaHRHcmF5OiBcInJnYmEoMTY5LDE2OSwxNjksMSlcIixcbiAgICB5ZWxsb3c6IFwicmdiYSgyNTMsMTY0LDE1LDEpXCIsXG4gICAgdmlzaWJsZTogXCJyZ2JhKDI1MCwyNTAsMjUwLDEpXCIsXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFzc2VydCA9IHZvaWQgMDtcbmZ1bmN0aW9uIGFzc2VydChjb25kaXRpb24pIHtcbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdBc3NlcnRpb24gZmFpbCEnKTtcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgIH1cbn1cbmV4cG9ydHMuYXNzZXJ0ID0gYXNzZXJ0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1lc3NhZ2VMb2cgPSB2b2lkIDA7XG5jb25zdCBjb2xvcnNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9jb2xvcnNcIikpO1xuY2xhc3MgTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IodGV4dCwgY29sb3IpIHtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLmNvdW50ID0gMTtcbiAgICB9XG4gICAgaW5jcmVtZW50Q291bnQoKSB7XG4gICAgICAgIHRoaXMuY291bnQgKz0gMTtcbiAgICB9XG4gICAgc2FtZVRleHQodGV4dCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0ID09PSB0ZXh0O1xuICAgIH1cbiAgICBnZXRUZXh0KCkge1xuICAgICAgICBsZXQgdCA9IHRoaXMuY291bnQgPiAxID8gYCR7dGhpcy50ZXh0fSB4KCR7dGhpcy5jb3VudH0pYCA6IHRoaXMudGV4dDtcbiAgICAgICAgcmV0dXJuIGA8dGFnIHN0eWxlPVwiY29sb3I6ICR7dGhpcy5jb2xvcn07XCI+JHt0fTwvdGFnPmA7XG4gICAgfVxufVxuY2xhc3MgTWVzc2FnZUxvZyB7XG4gICAgc3RhdGljIGFkZE1lc3NhZ2UodGV4dCwgY29sb3IsIHN0YWNrKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IE1lc3NhZ2VMb2cubWVzc2FnZXMubGVuZ3RoO1xuICAgICAgICBpZiAoc3RhY2sgJiYgbGVuID4gMCAmJiBNZXNzYWdlTG9nLm1lc3NhZ2VzW2xlbiAtIDFdLnNhbWVUZXh0KHRleHQpKSB7XG4gICAgICAgICAgICBNZXNzYWdlTG9nLm1lc3NhZ2VzW2xlbiAtIDFdLmluY3JlbWVudENvdW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBNZXNzYWdlTG9nLm1lc3NhZ2VzLnB1c2gobmV3IE1lc3NhZ2UodGV4dCwgY29sb3IpKTtcbiAgICAgICAgfVxuICAgICAgICBNZXNzYWdlTG9nLnByaW50KCk7XG4gICAgfVxuICAgIHN0YXRpYyBhZGRFcnJvck1lc3NhZ2UodGV4dCwgc3RhY2spIHtcbiAgICAgICAgTWVzc2FnZUxvZy5hZGRNZXNzYWdlKHRleHQsIGNvbG9yc18xLmRlZmF1bHQuZXJyb3IsIHN0YWNrKTtcbiAgICB9XG4gICAgc3RhdGljIHByaW50KCkge1xuICAgICAgICBjb25zdCBtYXhMaW5lcyA9IDU7XG4gICAgICAgIGNvbnN0IGxlbiA9IE1lc3NhZ2VMb2cubWVzc2FnZXMubGVuZ3RoO1xuICAgICAgICBsZXQgbWVzc2FnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lc3NhZ2VzXCIpO1xuICAgICAgICBsZXQgbGluZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IE1lc3NhZ2VMb2cubWVzc2FnZXNbbGVuIC0gMSAtIGldO1xuICAgICAgICAgICAgbGluZXMucHVzaChtZXNzYWdlLmdldFRleHQoKSk7XG4gICAgICAgICAgICBpZiAobGluZXMubGVuZ3RoID4gbWF4TGluZXMpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtZXNzYWdlcy5pbm5lckhUTUwgPSBsaW5lcy5qb2luKFwiXFxuXCIpO1xuICAgIH1cbn1cbmV4cG9ydHMuTWVzc2FnZUxvZyA9IE1lc3NhZ2VMb2c7XG5NZXNzYWdlTG9nLm1lc3NhZ2VzID0gW107XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUmVuZGVyT3JkZXIgPSB2b2lkIDA7XG52YXIgUmVuZGVyT3JkZXI7XG4oZnVuY3Rpb24gKFJlbmRlck9yZGVyKSB7XG4gICAgUmVuZGVyT3JkZXJbUmVuZGVyT3JkZXJbXCJDb3Jwc2VcIl0gPSAwXSA9IFwiQ29ycHNlXCI7XG4gICAgUmVuZGVyT3JkZXJbUmVuZGVyT3JkZXJbXCJJdGVtXCJdID0gMV0gPSBcIkl0ZW1cIjtcbiAgICBSZW5kZXJPcmRlcltSZW5kZXJPcmRlcltcIkFjdG9yXCJdID0gMl0gPSBcIkFjdG9yXCI7XG59KShSZW5kZXJPcmRlciA9IGV4cG9ydHMuUmVuZGVyT3JkZXIgfHwgKGV4cG9ydHMuUmVuZGVyT3JkZXIgPSB7fSkpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGdhbWVfMSA9IHJlcXVpcmUoXCIuL2dhbWUvZ2FtZVwiKTtcbmRvY3VtZW50LmJvZHkub25sb2FkID0gKCkgPT4ge1xuICAgIGxldCBnYW1lID0gbmV3IGdhbWVfMS5HYW1lKCk7XG4gICAgZ2FtZS5zdGFydCgpO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==