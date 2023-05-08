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

/***/ "./src/action/action.ts":
/*!******************************!*\
  !*** ./src/action/action.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Action = void 0;
class Action {
}
exports.Action = Action;


/***/ }),

/***/ "./src/action/altarAction.ts":
/*!***********************************!*\
  !*** ./src/action/altarAction.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AltarAction = void 0;
const messageLog_1 = __webpack_require__(/*! ../utility/messageLog */ "./src/utility/messageLog.ts");
const action_1 = __webpack_require__(/*! ./action */ "./src/action/action.ts");
class AltarAction extends action_1.Action {
    constructor(altar) {
        super();
        this.altar = altar;
    }
    execute(actor, map) {
        messageLog_1.MessageLog.addErrorMessage('Altar Action not implemented', true);
        return false;
    }
}
exports.AltarAction = AltarAction;


/***/ }),

/***/ "./src/action/attackAction.ts":
/*!************************************!*\
  !*** ./src/action/attackAction.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttackAction = void 0;
const emptyBehavior_1 = __webpack_require__(/*! ../behavior/emptyBehavior */ "./src/behavior/emptyBehavior.ts");
const entityFactory_1 = __webpack_require__(/*! ../entity/entityFactory */ "./src/entity/entityFactory.ts");
const names_1 = __webpack_require__(/*! ../entity/names */ "./src/entity/names.ts");
const colors_1 = __webpack_require__(/*! ../utility/colors */ "./src/utility/colors.ts");
const messageLog_1 = __webpack_require__(/*! ../utility/messageLog */ "./src/utility/messageLog.ts");
const action_1 = __webpack_require__(/*! ./action */ "./src/action/action.ts");
class AttackAction extends action_1.Action {
    constructor(otherActor) {
        super();
        this.otherActor = otherActor;
    }
    playerDeath(actor) {
        actor.char = '%';
        actor.fg = colors_1.colorRed;
        actor.bg = colors_1.colorBlack;
        actor.behavior = new emptyBehavior_1.EmptyBehavior();
        messageLog_1.MessageLog.addMessage(`A scary enemy killed you!`, colors_1.colorRed, false);
    }
    execute(actor, map) {
        if (actor.name == names_1.namePlayer) {
            this.playerDeath(actor);
        }
        else if (this.otherActor.name == names_1.namePlayer) {
            this.playerDeath(this.otherActor);
        }
        else {
            console.log('---->', actor.x, actor.y, this.otherActor.x, this.otherActor.y);
            map.removeActor(actor);
            (0, entityFactory_1.spawnCorpse)(map, actor.x, actor.y);
            messageLog_1.MessageLog.addMessage('A scary enemy killed its comrade!', colors_1.colorLightGray, false);
        }
        return true;
    }
}
exports.AttackAction = AttackAction;


/***/ }),

/***/ "./src/action/bumpAction.ts":
/*!**********************************!*\
  !*** ./src/action/bumpAction.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BumpAction = void 0;
const names_1 = __webpack_require__(/*! ../entity/names */ "./src/entity/names.ts");
const altarAction_1 = __webpack_require__(/*! ./altarAction */ "./src/action/altarAction.ts");
const attackAction_1 = __webpack_require__(/*! ./attackAction */ "./src/action/attackAction.ts");
const directionAction_1 = __webpack_require__(/*! ./directionAction */ "./src/action/directionAction.ts");
const moveAction_1 = __webpack_require__(/*! ./moveAction */ "./src/action/moveAction.ts");
class BumpAction extends directionAction_1.DirectionAction {
    constructor(dx, dy) {
        super(dx, dy);
    }
    execute(actor, map) {
        let [x, y] = this.destination(actor);
        const actorAtLocation = map.actorAtLocation(x, y);
        if (actorAtLocation != null) {
            if (actorAtLocation.name == names_1.nameAltar) {
                return (new altarAction_1.AltarAction(actor)).execute(actor, map);
            }
            else {
                return (new attackAction_1.AttackAction(actorAtLocation).execute(actor, map));
            }
        }
        else {
            return (new moveAction_1.MoveAction(this.dx, this.dy)).execute(actor, map);
        }
    }
}
exports.BumpAction = BumpAction;


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
    }
    execute(actor, map) {
        console.error("DirectionAction.execute should not be possible!");
        console.trace();
        return false;
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
const colors_1 = __webpack_require__(/*! ../utility/colors */ "./src/utility/colors.ts");
const messageLog_1 = __webpack_require__(/*! ../utility/messageLog */ "./src/utility/messageLog.ts");
const directionAction_1 = __webpack_require__(/*! ./directionAction */ "./src/action/directionAction.ts");
class MoveAction extends directionAction_1.DirectionAction {
    constructor(dx, dy) {
        super(dx, dy);
    }
    execute(actor, map) {
        let [x, y] = this.destination(actor);
        if (!map.isWalkable(x, y)) {
            messageLog_1.MessageLog.addMessage("That way is blocked", colors_1.colorLightGray, true);
            return false;
        }
        else {
            actor.move(this.dx, this.dy);
            return true;
        }
    }
}
exports.MoveAction = MoveAction;


/***/ }),

/***/ "./src/action/passAction.ts":
/*!**********************************!*\
  !*** ./src/action/passAction.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PassAction = void 0;
class PassAction {
    /**
     * Do nothing.
     * @param actor
     * @param engine
     * @returns
     */
    execute(actor, engine) {
        return false;
    }
}
exports.PassAction = PassAction;


/***/ }),

/***/ "./src/action/pickUpItemAction.ts":
/*!****************************************!*\
  !*** ./src/action/pickUpItemAction.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PickUpItemAction = void 0;
const colors_1 = __webpack_require__(/*! ../utility/colors */ "./src/utility/colors.ts");
const messageLog_1 = __webpack_require__(/*! ../utility/messageLog */ "./src/utility/messageLog.ts");
const action_1 = __webpack_require__(/*! ./action */ "./src/action/action.ts");
class PickUpItemAction extends action_1.Action {
    /**
     * Pick up an item from the game map.
     *
     * @remarks
     * Only render if the item was picked up from the map
     *
     * @param actor
     * @param map
     * @returns whether re-render is required
     */
    execute(actor, map) {
        const item = map.itemAtLocation(actor.x, actor.y);
        if (item == null) {
            messageLog_1.MessageLog.addMessage('Nothing to pick up.', colors_1.colorLightGray, true);
        }
        else if (actor.inventory.addItem(item)) {
            map.removeItem(item);
            messageLog_1.MessageLog.addMessage(`Picked up ${item.name}.`, colors_1.colorLightGray, true);
            return true;
        }
        return false;
    }
}
exports.PickUpItemAction = PickUpItemAction;


/***/ }),

/***/ "./src/behavior/aiBehavior.ts":
/*!************************************!*\
  !*** ./src/behavior/aiBehavior.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AIBehavior = void 0;
const bumpAction_1 = __webpack_require__(/*! ../action/bumpAction */ "./src/action/bumpAction.ts");
const passAction_1 = __webpack_require__(/*! ../action/passAction */ "./src/action/passAction.ts");
const distance_1 = __webpack_require__(/*! ../utility/distance */ "./src/utility/distance.ts");
class AIBehavior {
    constructor(x, y) {
        this.startX = x;
        this.startY = y;
    }
    act(actor, map) {
        // Get target based on distances
        let targetX, targetY;
        if (actor.euclideanDistance(this.startX, this.startY) <= 3 &&
            actor.euclideanDistance(map.player().x, map.player().y) <= 3) {
            targetX = map.player().x;
            targetY = map.player().y;
        }
        else {
            targetX = this.startX;
            targetY = this.startY;
        }
        // get moves towards the target
        const moves = this.getMoves(actor.x, actor.y, targetX, targetY);
        // if their are no moves, do nothing
        if (moves.length == 0) {
            return [new passAction_1.PassAction(), false];
        }
        // ... else, find the move that is closest to the target
        let closestVal = 10000;
        let closestIndex = -1;
        for (let i = 0; i < moves.length; ++i) {
            const newX = actor.x + moves[i][0];
            const newY = actor.y + moves[i][1];
            const dist = (0, distance_1.euclideanDistance)(newX, newY, targetX, targetY);
            if (dist < closestVal) {
                closestVal = dist;
                closestIndex = i;
            }
        }
        return [new bumpAction_1.BumpAction(moves[closestIndex][0], moves[closestIndex][1]), false];
    }
    getMoves(x1, y1, x2, y2) {
        let moves = [];
        const diffX = x1 - x2;
        const diffY = y1 - y2;
        if (diffX == 0 && diffY == 0) {
            return moves;
        }
        if (Math.abs(diffY) > Math.abs(diffX)) {
            if (diffY > 0)
                moves.push([0, -1]);
            else if (diffY < 0)
                moves.push([0, 1]);
            if (diffX > 0)
                moves.push([-1, 0]);
            else if (diffX < 0)
                moves.push([1, 0]);
        }
        else if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0)
                moves.push([-1, 0]);
            else if (diffX < 0)
                moves.push([1, 0]);
            if (diffY > 0)
                moves.push([0, -1]);
            else if (diffY < 0)
                moves.push([0, 1]);
        }
        else if ((diffX + diffY) % 2 == 0) {
            if (diffY > 0)
                moves.push([0, -1]);
            else if (diffY < 0)
                moves.push([0, 1]);
            if (diffX > 0)
                moves.push([-1, 0]);
            else if (diffX < 0)
                moves.push([1, 0]);
        }
        else {
            if (diffX > 0)
                moves.push([-1, 0]);
            else if (diffX < 0)
                moves.push([1, 0]);
            if (diffY > 0)
                moves.push([0, -1]);
            else if (diffY < 0)
                moves.push([0, 1]);
        }
        return moves;
    }
}
exports.AIBehavior = AIBehavior;


/***/ }),

/***/ "./src/behavior/emptyBehavior.ts":
/*!***************************************!*\
  !*** ./src/behavior/emptyBehavior.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmptyBehavior = void 0;
const passAction_1 = __webpack_require__(/*! ../action/passAction */ "./src/action/passAction.ts");
class EmptyBehavior {
    act(actor, map) {
        return [new passAction_1.PassAction(), false];
    }
}
exports.EmptyBehavior = EmptyBehavior;


/***/ }),

/***/ "./src/behavior/playerBehavior.ts":
/*!****************************************!*\
  !*** ./src/behavior/playerBehavior.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayerBehavior = void 0;
const bumpAction_1 = __webpack_require__(/*! ../action/bumpAction */ "./src/action/bumpAction.ts");
const passAction_1 = __webpack_require__(/*! ../action/passAction */ "./src/action/passAction.ts");
const pickUpItemAction_1 = __webpack_require__(/*! ../action/pickUpItemAction */ "./src/action/pickUpItemAction.ts");
const inputManager_1 = __webpack_require__(/*! ../game/inputManager */ "./src/game/inputManager.ts");
class PlayerBehavior {
    constructor() {
        this.turn = 1;
    }
    act(actor, map) {
        let requestAnotherTurn = this.turn % 2 == 0;
        if (inputManager_1.InputManager.isKeyDown(inputManager_1.Key.DOWN) || inputManager_1.InputManager.isKeyDown(inputManager_1.Key.S)) {
            inputManager_1.InputManager.clear();
            ++this.turn;
            return [new bumpAction_1.BumpAction(0, 1), requestAnotherTurn];
        }
        if (inputManager_1.InputManager.isKeyDown(inputManager_1.Key.UP) || inputManager_1.InputManager.isKeyDown(inputManager_1.Key.W)) {
            inputManager_1.InputManager.clear();
            ++this.turn;
            return [new bumpAction_1.BumpAction(0, -1), requestAnotherTurn];
        }
        if (inputManager_1.InputManager.isKeyDown(inputManager_1.Key.LEFT) || inputManager_1.InputManager.isKeyDown(inputManager_1.Key.A)) {
            inputManager_1.InputManager.clear();
            ++this.turn;
            return [new bumpAction_1.BumpAction(-1, 0), requestAnotherTurn];
        }
        if (inputManager_1.InputManager.isKeyDown(inputManager_1.Key.RIGHT) || inputManager_1.InputManager.isKeyDown(inputManager_1.Key.D)) {
            inputManager_1.InputManager.clear();
            ++this.turn;
            return [new bumpAction_1.BumpAction(1, 0), requestAnotherTurn];
        }
        if (inputManager_1.InputManager.isKeyDown(inputManager_1.Key.G)) {
            inputManager_1.InputManager.clear();
            ++this.turn;
            return [new pickUpItemAction_1.PickUpItemAction(), requestAnotherTurn];
        }
        return [new passAction_1.PassAction(), true];
    }
}
exports.PlayerBehavior = PlayerBehavior;


/***/ }),

/***/ "./src/component/baseComponent.ts":
/*!****************************************!*\
  !*** ./src/component/baseComponent.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseComponent = void 0;
class BaseComponent {
    constructor(parent) {
        this.parent = parent;
    }
}
exports.BaseComponent = BaseComponent;


/***/ }),

/***/ "./src/component/inventoryComponent.ts":
/*!*********************************************!*\
  !*** ./src/component/inventoryComponent.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InventoryComponent = void 0;
const messageLog_1 = __webpack_require__(/*! ../utility/messageLog */ "./src/utility/messageLog.ts");
const baseComponent_1 = __webpack_require__(/*! ./baseComponent */ "./src/component/baseComponent.ts");
class InventoryComponent extends baseComponent_1.BaseComponent {
    constructor(parent, capacity) {
        super(parent);
        this.capacity = capacity;
        this.items = [];
    }
    /**
     * Add item to the inventory.
     *
     * @remarks
     * If item added, a nice message is added to the message og. If the inventory
     * is full, then an error message is printed for the player.
     *
     * @param item
     * @returns true if the item was added, else false
     */
    addItem(item) {
        if (this.items.length >= this.capacity) {
            messageLog_1.MessageLog.addErrorMessage("Inventory full.", true);
            return false;
        }
        this.items.push(item);
        return true;
    }
    /**
     * Drop the item back onto the map.
     *
     * @remark
     * If the item has an id of -1, an error message is added to the message log.
     *
     * @param item
     * @param actor
     * @param map
     */
    drop(item, actor, map) {
        if (item.id != -1) {
            this.items.splice(item.id, 1);
            item.x = actor.x;
            item.y = actor.y;
            map.addEntity(item);
        }
        else {
            messageLog_1.MessageLog.addErrorMessage(`${item.name} had invalid id of -1. Contact admin.`, true);
        }
    }
}
exports.InventoryComponent = InventoryComponent;


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
const emptyBehavior_1 = __webpack_require__(/*! ../behavior/emptyBehavior */ "./src/behavior/emptyBehavior.ts");
const colors_1 = __webpack_require__(/*! ../utility/colors */ "./src/utility/colors.ts");
const inventoryComponent_1 = __webpack_require__(/*! ../component/inventoryComponent */ "./src/component/inventoryComponent.ts");
class Actor extends entity_1.Entity {
    constructor(x = 0, y = 0, name = "Unknown Actor", blocksMovement = false, char = "?", fg = colors_1.colorWhite, bg = colors_1.colorBlack, renderOrder = renderOrder_1.RenderOrder.Corpse, behavior = new emptyBehavior_1.EmptyBehavior(), inventorySize = 20) {
        super(x, y, name, blocksMovement, char, fg, bg, renderOrder);
        this.behavior = behavior;
        this.inventory = new inventoryComponent_1.InventoryComponent(this, inventorySize);
    }
    act(map) {
        let [action, requestAnotherTurn] = this.behavior.act(this, map);
        let requestRender = false;
        if (action !== undefined) {
            requestRender = action.execute(this, map);
        }
        return [requestAnotherTurn, requestRender];
    }
}
exports.Actor = Actor;


/***/ }),

/***/ "./src/entity/entity.ts":
/*!******************************!*\
  !*** ./src/entity/entity.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Entity = void 0;
const error_1 = __webpack_require__(/*! ../utility/error */ "./src/utility/error.ts");
const renderOrder_1 = __webpack_require__(/*! ../utility/renderOrder */ "./src/utility/renderOrder.ts");
const distance_1 = __webpack_require__(/*! ../utility/distance */ "./src/utility/distance.ts");
const colors_1 = __webpack_require__(/*! ../utility/colors */ "./src/utility/colors.ts");
class Entity {
    constructor(x = 0, y = 0, name = "Unknown", blocksMovement = false, char = "?", fg = colors_1.colorWhite, bg = colors_1.colorBlack, renderOrder = renderOrder_1.RenderOrder.Corpse) {
        this.id = -1;
        this.x = x;
        this.y = y;
        this.name = name;
        this.blocksMovement = blocksMovement;
        this.char = char;
        this.fg = fg;
        this.bg = bg;
        this.renderOrder = renderOrder;
        (0, error_1.assert)(this.char.length === 1);
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
    render(display) {
        display.draw(this.x, this.y, this.char, this.fg, this.bg);
    }
    euclideanDistance(x, y) {
        return (0, distance_1.euclideanDistance)(this.x, this.y, x, y);
    }
}
exports.Entity = Entity;


/***/ }),

/***/ "./src/entity/entityFactory.ts":
/*!*************************************!*\
  !*** ./src/entity/entityFactory.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.spawnGem = exports.spawnAltar = exports.spawnEnemy = exports.spawnPlayer = exports.spawnCorpse = void 0;
const actor_1 = __webpack_require__(/*! ./actor */ "./src/entity/actor.ts");
const aiBehavior_1 = __webpack_require__(/*! ../behavior/aiBehavior */ "./src/behavior/aiBehavior.ts");
const colors_1 = __webpack_require__(/*! ../utility/colors */ "./src/utility/colors.ts");
const item_1 = __webpack_require__(/*! ./item */ "./src/entity/item.ts");
const renderOrder_1 = __webpack_require__(/*! ../utility/renderOrder */ "./src/utility/renderOrder.ts");
const entity_1 = __webpack_require__(/*! ./entity */ "./src/entity/entity.ts");
const emptyBehavior_1 = __webpack_require__(/*! ../behavior/emptyBehavior */ "./src/behavior/emptyBehavior.ts");
const names_1 = __webpack_require__(/*! ./names */ "./src/entity/names.ts");
// ------------ Entities ------------
function spawnCorpse(map, x, y) {
    const corpse = new entity_1.Entity(x, y, 'Corpse', false, '%', colors_1.colorRed, colors_1.colorBlack, renderOrder_1.RenderOrder.Corpse);
    map.addEntity(corpse);
    return corpse;
}
exports.spawnCorpse = spawnCorpse;
// ------------ Actors ------------
function spawnPlayer(map, x, y) {
    map.player().x = x;
    map.player().y = y;
    return map.player();
}
exports.spawnPlayer = spawnPlayer;
function spawnEnemy(map, x, y) {
    let enemy = new actor_1.Actor();
    enemy.x = x;
    enemy.y = y;
    enemy.name = names_1.nameEnemy;
    enemy.char = 'E';
    enemy.fg = colors_1.colorEnemy;
    enemy.behavior = new aiBehavior_1.AIBehavior(x, y);
    map.addActor(enemy);
    return enemy;
}
exports.spawnEnemy = spawnEnemy;
function spawnAltar(map, x, y) {
    let altar = new actor_1.Actor(x, y, names_1.nameAltar, true, 'A', colors_1.colorDarkGray, colors_1.colorVisible, renderOrder_1.RenderOrder.Item, new emptyBehavior_1.EmptyBehavior(), 0);
    map.addActor(altar);
    return altar;
}
exports.spawnAltar = spawnAltar;
// ------------ Items ------------
function spawnGem(map, x, y) {
    let gem = new item_1.Item(x, y, names_1.nameGem, false, '*', colors_1.colorGem, colors_1.colorBlack, renderOrder_1.RenderOrder.Item, null);
    map.addItem(gem);
    return gem;
}
exports.spawnGem = spawnGem;


/***/ }),

/***/ "./src/entity/item.ts":
/*!****************************!*\
  !*** ./src/entity/item.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Item = void 0;
const entity_1 = __webpack_require__(/*! ./entity */ "./src/entity/entity.ts");
const renderOrder_1 = __webpack_require__(/*! ../utility/renderOrder */ "./src/utility/renderOrder.ts");
const colors_1 = __webpack_require__(/*! ../utility/colors */ "./src/utility/colors.ts");
class Item extends entity_1.Entity {
    constructor(x = 0, y = 0, name = "Unknown Item", blocksMovement = false, char = "?", fg = colors_1.colorWhite, bg = colors_1.colorBlack, renderOrder = renderOrder_1.RenderOrder.Corpse, consumable = null, id = -1) {
        super(x, y, name, blocksMovement, char, fg, bg, renderOrder);
        this.id = id;
    }
}
exports.Item = Item;


/***/ }),

/***/ "./src/entity/names.ts":
/*!*****************************!*\
  !*** ./src/entity/names.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.namePlayer = exports.nameGem = exports.nameEnemy = exports.nameAltar = void 0;
exports.nameAltar = "Altar";
exports.nameEnemy = "Scary Enemy";
exports.nameGem = "Gem";
exports.namePlayer = "You";


/***/ }),

/***/ "./src/game/game.ts":
/*!**************************!*\
  !*** ./src/game/game.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Game = void 0;
const rot_js_1 = __webpack_require__(/*! rot-js */ "./node_modules/rot-js/lib/index.js");
const gameMap_1 = __webpack_require__(/*! ./gameMap */ "./src/game/gameMap.ts");
const inputManager_1 = __webpack_require__(/*! ./inputManager */ "./src/game/inputManager.ts");
const uiFactory_1 = __webpack_require__(/*! ../ui/uiFactory */ "./src/ui/uiFactory.ts");
const roomGenerator_1 = __webpack_require__(/*! ../generation/roomGenerator */ "./src/generation/roomGenerator.ts");
const entityFactory_1 = __webpack_require__(/*! ../entity/entityFactory */ "./src/entity/entityFactory.ts");
const messageLog_1 = __webpack_require__(/*! ../utility/messageLog */ "./src/utility/messageLog.ts");
class Game {
    constructor() {
        this.config = { width: 80, height: 40 };
        this.display = new rot_js_1.Display({
            width: this.config.width,
            height: this.config.height,
        });
        this.map = new gameMap_1.GameMap(this.config.width, this.config.height);
        document.body.appendChild(this.display.getContainer());
        this.delta = 0;
    }
    generateMap() {
        let temp = new roomGenerator_1.RoomGenerator(this.config.width, this.config.height);
        let res = temp.generate();
        this.map = res[0];
        (0, entityFactory_1.spawnPlayer)(this.map, res[1], res[2]);
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
            this.map.computeFOV(this.map.player().x, this.map.player().y);
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
            else {
                // run game and render if requested by the map
                if (this.map.runActors()) {
                    this.render(null, true);
                    if (!this.map.playerIsAlive()) {
                        menu = (0, uiFactory_1.gameOverMenu)(this.config.width, this.config.height, () => {
                            this.map.reset();
                            messageLog_1.MessageLog.clear();
                            menu = (0, uiFactory_1.mainMenu)(this.config.width, this.config.height, () => {
                                this.generateMap();
                                this.render(null, true);
                            });
                        });
                    }
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
const actor_1 = __webpack_require__(/*! ../entity/actor */ "./src/entity/actor.ts");
const precise_shadowcasting_1 = __importDefault(__webpack_require__(/*! rot-js/lib/fov/precise-shadowcasting */ "./node_modules/rot-js/lib/fov/precise-shadowcasting.js"));
const renderOrder_1 = __webpack_require__(/*! ../utility/renderOrder */ "./src/utility/renderOrder.ts");
const playerBehavior_1 = __webpack_require__(/*! ../behavior/playerBehavior */ "./src/behavior/playerBehavior.ts");
const colors_1 = __webpack_require__(/*! ../utility/colors */ "./src/utility/colors.ts");
const names_1 = __webpack_require__(/*! ../entity/names */ "./src/entity/names.ts");
class GameMap {
    constructor(width, height) {
        this.entities = [];
        this.items = [];
        this.actors = [];
        this.entityIds = [];
        this.itemIds = [];
        this.actorIds = [];
        this.actorIndex = 0;
        this.width = width;
        this.height = height;
        this.tiles = Array(this.width * this.height + this.width).fill(tileFactory_1.default.wall);
        this.visible = Array(this.width * this.height + this.width).fill(false);
        this.explored = Array(this.width * this.height + this.width).fill(false);
        this.actors.push(new actor_1.Actor(0, 0, names_1.namePlayer, true, '@', colors_1.colorWhite, colors_1.colorBlack, renderOrder_1.RenderOrder.Actor, new playerBehavior_1.PlayerBehavior()));
    }
    reset() {
        this.tiles = Array(this.width * this.height + this.width).fill(tileFactory_1.default.wall);
        this.visible = Array(this.width * this.height + this.width).fill(false);
        this.explored = Array(this.width * this.height + this.width).fill(false);
        this.player().char = '@';
        this.player().fg = colors_1.colorWhite;
        this.player().bg = colors_1.colorBlack;
        this.player().behavior = new playerBehavior_1.PlayerBehavior();
    }
    /**
     * Get the player
     * @remarks
     * Player is always at the first index of the actors
     *
     * @returns - Actor for the player
     * @beta
     */
    player() {
        return this.actors[0];
    }
    /**
     * Player is alive
     *
     * @remarks
     * The death character is always '%' so that's waht we check for since the game
     * doesn't include something like health.
     *
     * @returns true if the player is alive else false
     * @beta
     */
    playerIsAlive() {
        return this.player().char != '%';
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
        // this.entities.sort((a, b) => {return a.renderOrder.valueOf() - b.renderOrder.valueOf()});
        for (let e of this.entities) {
            if (e == null) {
                continue;
            }
            if (this.visible[this.index(e.x, e.y)]) {
                e.render(display);
            }
        }
        // render items
        for (let e of this.items) {
            if (e == null) {
                continue;
            }
            if (this.visible[this.index(e.x, e.y)]) {
                e.render(display);
            }
        }
        // render actors
        // this.entities.sort((a, b) => {return a.renderOrder.valueOf() - b.renderOrder.valueOf()});
        for (let a of this.actors) {
            if (a == null) {
                continue;
            }
            if (this.visible[this.index(a.x, a.y)]) {
                a.render(display);
            }
        }
    }
    // ---------- Add
    addEntity(entity) {
        (0, error_1.assert)(this.locationOccupied(entity.x, entity.y) == false);
        if (this.entityIds.length > 0) {
            const id = this.entityIds.pop();
            entity.id = id;
            this.entities[id] = entity;
        }
        else {
            entity.id = this.entities.length;
            this.entities.push(entity);
        }
    }
    addActor(actor) {
        (0, error_1.assert)(this.locationOccupied(actor.x, actor.y) == false);
        if (this.actorIds.length > 0) {
            const id = this.actorIds.pop();
            actor.id = id;
            this.actors[id] = actor;
        }
        else {
            actor.id = this.actors.length;
            this.actors.push(actor);
        }
    }
    addItem(item) {
        (0, error_1.assert)(this.locationOccupied(item.x, item.y) == false);
        if (this.itemIds.length > 0) {
            const id = this.itemIds.pop();
            item.id = id;
            this.items[id] = item;
        }
        else {
            item.id = this.items.length;
            this.items.push(item);
        }
    }
    // ---------- Remove
    removeEntity(entity) {
        this.entities[entity.id] = null;
        this.entityIds.push(entity.id);
    }
    removeActor(actor) {
        this.actors[actor.id] = null;
        this.actorIds.push(actor.id);
    }
    removeItem(item) {
        this.items[item.id] = null;
        this.itemIds.push(item.id);
    }
    // ---------- At Location
    entityAtLocation(x, y) {
        for (var entity of this.entities) {
            if (entity == null) {
                continue;
            }
            if (entity.x == x && entity.y == y) {
                return entity;
            }
        }
        return null;
    }
    actorAtLocation(x, y) {
        for (var actor of this.actors) {
            if (actor == null) {
                continue;
            }
            if (actor.x == x && actor.y == y) {
                return actor;
            }
        }
        return null;
    }
    itemAtLocation(x, y) {
        for (var item of this.items) {
            if (item == null) {
                continue;
            }
            if (item.x == x && item.y == y) {
                return item;
            }
        }
        return null;
    }
    locationOccupied(x, y) {
        return this.entityAtLocation(x, y) != null ||
            this.actorAtLocation(x, y) != null ||
            this.itemAtLocation(x, y) != null;
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
    /**
     * Run actors in the game.
     * @returns whether a render is required
     */
    runActors() {
        let shouldRender = false;
        for (; this.actorIndex < this.actors.length; ++this.actorIndex) {
            if (this.actors[this.actorIndex] == null) {
                continue;
            }
            const [requestAnotherTurn, requiresRender] = this.actors[this.actorIndex].act(this);
            shouldRender || (shouldRender = requiresRender);
            if (requestAnotherTurn) {
                // if true, then the act is telling us that the behavior wants another 
                // turn and the loop should end here before other actors can act.
                return shouldRender;
            }
            else if (!this.playerIsAlive()) {
                // if the player is dead, end the loop.
                break;
            }
        }
        this.actorIndex = 0;
        return shouldRender;
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
    Key[Key["G"] = 10] = "G";
    Key[Key["H"] = 11] = "H";
    Key[Key["SPACE"] = 12] = "SPACE";
    Key[Key["ESCAPE"] = 13] = "ESCAPE";
    Key[Key["ENTER"] = 14] = "ENTER";
    Key[Key["INVALID"] = 15] = "INVALID";
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
            case 'g':
                return Key.G;
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

/***/ "./src/generation/baseRoom.ts":
/*!************************************!*\
  !*** ./src/generation/baseRoom.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BASE_ROOM = void 0;
exports.BASE_ROOM = [
    "---------",
    "---------",
    "---------",
    "----A----",
    "---------",
    "---------",
    "---------",
];


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
const baseRoom_1 = __webpack_require__(/*! ./baseRoom */ "./src/generation/baseRoom.ts");
const entityFactory_1 = __webpack_require__(/*! ../entity/entityFactory */ "./src/entity/entityFactory.ts");
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
    getConnectionPoint(other) {
        let x = 0;
        let y = 0;
        /**
         *     1
         *   ┌---┐
         * 2 │   │ 3
         *   └---┘
         *     4
         *
         * There are 4 possible connection points and each if statement goes through
         * them one at a time for simplicity / clarity. This isn't the best way as
         * it naturally favors the ordering, but that can always be improved later.
         */
        if (this.y2 < other.y1) {
            x = Math.round((this.x1 + this.x2) / 2);
            y = this.y1 - 1;
        }
        else if (this.x1 < other.x2) {
            x = this.x1 - 1;
            y = Math.round((this.y1 + this.y2) / 2);
        }
        else if (this.x2 < other.x1) {
            x = this.x2 + 1;
            y = Math.round((this.y1 + this.y2) / 2);
        }
        else {
            x = Math.round((this.x1 + this.x2) / 2);
            y = this.y2;
        }
        return [x, y];
    }
}
function drawTile(map, x, y, tile) {
    switch (tile) {
        case 'X': {
            // default is wall.
            break;
        }
        case '#': {
            map.setTile(x, y, tileFactory_1.default.floor);
            (0, entityFactory_1.spawnEnemy)(map, x, y);
            break;
        }
        case '-': {
            map.setTile(x, y, tileFactory_1.default.floor);
            break;
        }
        case '/': {
            map.setTile(x, y, tileFactory_1.default.forwardSlash);
            break;
        }
        case '\\': {
            map.setTile(x, y, tileFactory_1.default.backwardSlash);
            break;
        }
        case '*': {
            map.setTile(x, y, tileFactory_1.default.floor);
            (0, entityFactory_1.spawnGem)(map, x, y);
            break;
        }
        case 'A': {
            map.setTile(x, y, tileFactory_1.default.floor);
            (0, entityFactory_1.spawnAltar)(map, x, y);
        }
        default: {
            map.setTile(x, y, tileFactory_1.default.floor);
            console.warn(`Unhandled tile type: ${tile}`);
            break;
        }
    }
}
class RoomGenerator extends baselineGenerator_1.BaseLineGenerator {
    generate() {
        let map = new gameMap_1.GameMap(this.width, this.height);
        // We know every room in this dataset has the same dimensions
        const w = levels_1.LEVELS['0_0_0'][0].length; // room width
        const h = levels_1.LEVELS['0_0_0'].length; // room height
        const levelNames = Object.keys(levels_1.LEVELS);
        // Where we store the rooms 
        let rooms = [];
        // The first room is the base room for the player, so we add it to the list
        // to check for collisions...
        const baseRoomX = Math.round((this.width - baseRoom_1.BASE_ROOM[0].length) / 2);
        const baseRoomY = Math.round((this.height - baseRoom_1.BASE_ROOM.length) / 2);
        rooms.push(new Rectangle(baseRoomX, baseRoomY, baseRoom_1.BASE_ROOM[0].length, baseRoom_1.BASE_ROOM.length));
        // ... and then draw the base room
        for (let y = 0; y < baseRoom_1.BASE_ROOM.length; ++y) {
            for (let x = 0; x < baseRoom_1.BASE_ROOM[0].length; ++x) {
                drawTile(map, baseRoomX + x, baseRoomY + y, baseRoom_1.BASE_ROOM[y][x]);
            }
        }
        // generate rectangles to fill in
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
                    drawTile(map, x + xPos, y + yPos, room[y][x]);
                }
            }
            // draw a path between the two rooms
            if (rooms.length > 1) {
                // get the two points in each room to use to connect to each other
                let [x1, y1] = rooms[rooms.length - 2].getConnectionPoint(newRoom);
                let [x2, y2] = newRoom.getConnectionPoint(rooms[rooms.length - 2]);
                // randomly decide how to dig a path to the next room
                if (rot_js_1.RNG.getUniform() > 0.8) {
                    // unlikely to draw a jagged line
                    (0, generationUtility_1.bresenham)(x1, y1, x2, y2, (x, y) => {
                        map.setTile(x, y, tileFactory_1.default.floor);
                    });
                }
                else {
                    // likely to draw a straight line
                    (0, generationUtility_1.straightLineConnection)(x1, y1, x2, y2, (x, y) => {
                        map.setTile(x, y, tileFactory_1.default.floor);
                    });
                }
            }
        }
        // Altar is at the center, so the player position is offset by 1
        const center = rooms[0].center();
        return [map, center[0] + 1, center[1]];
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const colors_1 = __webpack_require__(/*! ../utility/colors */ "./src/utility/colors.ts");
const tile_1 = __webpack_require__(/*! ./tile */ "./src/tile/tile.ts");
let tileFactory = {};
tileFactory.floor = new tile_1.Tile('.', true, colors_1.colorVisible, colors_1.colorBlack, colors_1.colorDarkGray, colors_1.colorBlack);
tileFactory.wall = new tile_1.Tile('#', false, colors_1.colorVisible, colors_1.colorBlack, colors_1.colorDarkGray, colors_1.colorBlack);
tileFactory.downStairs = new tile_1.Tile('>', false, colors_1.colorLightGray, colors_1.colorBlack, colors_1.colorDarkGray, colors_1.colorBlack);
tileFactory.forwardSlash = new tile_1.Tile('/', false, colors_1.colorViolet, colors_1.colorBlack, colors_1.colorIndigo, colors_1.colorBlack);
tileFactory.backwardSlash = new tile_1.Tile('\\', false, colors_1.colorViolet, colors_1.colorBlack, colors_1.colorIndigo, colors_1.colorBlack);
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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.gameOverMenu = exports.mainMenu = exports.helpMenu = void 0;
const inputManager_1 = __webpack_require__(/*! ../game/inputManager */ "./src/game/inputManager.ts");
const colors_1 = __webpack_require__(/*! ../utility/colors */ "./src/utility/colors.ts");
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
    m.addButton(new button_1.Button(width / 2 - 4, height - height / 4 - 4, 8, 3, "Ok", colors_1.colorLightGray, colors_1.colorWhite, colors_1.colorLightGray, colors_1.colorWhite, () => { }));
    m.addText(new text_1.Text(x + 3, y + 3, "WASD or arrow keys to move.", colors_1.colorWhite, colors_1.colorBlack));
    m.addText(new text_1.Text(x + 3, y + 4, "I to inspect.", colors_1.colorWhite, colors_1.colorBlack));
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
    m.addText(new text_1.Text(width / 2 - title.length / 2, height / 2 - 10, title, colors_1.colorYellow, colors_1.colorBlack));
    const attribution = "by Colan F. Biemer";
    m.addText(new text_1.Text(width / 2 - attribution.length / 2, height / 2 - 8, attribution, colors_1.colorLightGray, colors_1.colorBlack));
    const instructions = "Press space to start or h for instructions.";
    m.addText(new text_1.Text(width / 2 - instructions.length / 2, height / 2, instructions, colors_1.colorWhite, colors_1.colorBlack));
    return m;
}
exports.mainMenu = mainMenu;
function gameOverMenu(width, height, callback) {
    const x = width / 4;
    const y = 5;
    let m = new menu_1.Menu(x, y, width / 2, height / 5, "GAME OVER", true, true, () => {
        if (inputManager_1.InputManager.isKeyDown(inputManager_1.Key.H, inputManager_1.Key.ENTER, inputManager_1.Key.ESCAPE)) {
            inputManager_1.InputManager.clear();
            callback();
        }
    });
    m.addButton(new button_1.Button(width / 2 - 4, y + height / 5 - 4, 8, 3, "Ok", colors_1.colorLightGray, colors_1.colorWhite, colors_1.colorLightGray, colors_1.colorWhite, callback));
    const text = 'You failed.';
    m.addText(new text_1.Text(width / 2 - text.length / 2, y + 2, text, colors_1.colorWhite, colors_1.colorBlack));
    return m;
}
exports.gameOverMenu = gameOverMenu;


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
exports.colorGem = exports.colorIndigo = exports.colorViolet = exports.colorEnemy = exports.colorVisible = exports.colorRed = exports.colorYellow = exports.colorLightGray = exports.colorDarkGray = exports.colorBlack = exports.colorWhite = exports.colorError = void 0;
exports.colorError = "rgba(255,40,40,1)";
exports.colorWhite = "rgba(255,255,255,1)";
exports.colorBlack = "rgba(0,0,0,0)";
exports.colorDarkGray = "rgba(70,70,70,1)";
exports.colorLightGray = "rgba(169,169,169,1)";
exports.colorYellow = "rgba(253,164,15,1)";
exports.colorRed = "rgba(255,0,0,1)";
exports.colorVisible = "rgba(250,250,250,1)";
exports.colorEnemy = "rgba(204,0,0,1)";
// `/` and `\` tiles
exports.colorViolet = "rgba(238,130,238,1)";
exports.colorIndigo = "rgba(75,0,130,1)";
// `*` gem item
exports.colorGem = 'rgba(143,255,146,1)';


/***/ }),

/***/ "./src/utility/distance.ts":
/*!*********************************!*\
  !*** ./src/utility/distance.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.manhattanDistance = exports.euclideanDistance = void 0;
function euclideanDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + (Math.pow(y1 - y2, 2)));
}
exports.euclideanDistance = euclideanDistance;
function manhattanDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
exports.manhattanDistance = manhattanDistance;


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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageLog = void 0;
const colors_1 = __webpack_require__(/*! ./colors */ "./src/utility/colors.ts");
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
    static clear() {
        this.messages = [];
        let messages = document.querySelector("#messages");
        messages.innerHTML = '';
    }
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
        MessageLog.addMessage(text, colors_1.colorError, stack);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLGlDQUFpQywrQ0FBSztBQUN0QyxrQkFBa0Isa0JBQWtCO0FBQ3BDO0FBQ087QUFDUCxpQ0FBaUMsK0NBQUs7QUFDdEMsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL1VBO0FBQ087QUFDUDtBQUNPO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkNBQUcsVUFBVTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdklpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtEQUFNO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxrQkFBa0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsa0JBQWtCO0FBQzlDO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtCQUFrQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsUUFBUTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix1REFBVztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1CQUFtQjtBQUMzQztBQUNBO0FBQ0EsK0JBQStCLGtEQUFRO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzVm1DO0FBQ25DLGlFQUFlLEVBQUUsT0FBTyx1REFBRSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNEM0I7QUFDQTtBQUNBO0FBQ2U7QUFDZjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSitCO0FBQ0g7QUFDSztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLHNCQUFzQixpREFBSztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQSx1QkFBdUIsdURBQVc7QUFDbEM7QUFDQTtBQUNBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxpQkFBaUIsNkNBQUc7QUFDcEIsaUJBQWlCLDZDQUFHO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RHNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLG9CQUFvQixnREFBSTtBQUN2Qyx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsc0JBQXNCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RjZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZSx1QkFBdUIsZ0RBQUk7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsc0JBQXNCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzlEcUM7QUFDTjtBQUMvQixpRUFBZSxFQUFFLFFBQVEsNkRBQU8scURBQUUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZJO0FBQ3ZDO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEIsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsVUFBVTtBQUNyQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxLQUFLO0FBQ2hCO0FBQ2U7QUFDZix3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxxQkFBcUIsK0NBQUk7QUFDekIsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzVDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsNkJBQTZCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SU47QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDZSxxQkFBcUIscURBQVM7QUFDN0M7QUFDQTtBQUNBLG1DQUFtQztBQUNuQyxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLE1BQU07QUFDckIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbERpQztBQUNGO0FBQ0U7QUFDakMsaUVBQWUsRUFBRSxNQUFNLDJEQUFPLDJEQUFRLHNEQUFFLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQztBQUMzQjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHNEQUFVO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBLGVBQWUsR0FBRztBQUNsQixlQUFlLE1BQU07QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxHQUFHO0FBQ2xCLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQixpQkFBaUIsTUFBTTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pFdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ2UscUJBQXFCLHFEQUFTO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ2Usb0JBQW9CLHFEQUFTO0FBQzVDO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsTUFBTTtBQUNyQixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QjJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlCQUF5QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsbUJBQW1CO0FBQzNDO0FBQ0E7QUFDQSxtRUFBbUU7QUFDbkUsMENBQTBDLG1CQUFtQjtBQUM3RDtBQUNBO0FBQ0EsNEJBQTRCLG9CQUFvQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFVBQVU7QUFDekIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxnRUFBb0I7QUFDbkM7QUFDQTtBQUNBLGVBQWU7QUFDZixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsSUFBSSxJQUFJO0FBQ25DO0FBQ087QUFDQTtBQUNBO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0Esa0JBQWtCLG9CQUFvQixHQUFHO0FBQ3pDO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixXQUFXLEtBQUs7QUFDaEIsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsTUFBTTtBQUNqQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsS0FBSztBQUNoQjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLElBQUksSUFBSTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyRGE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsY0FBYztBQUNkO0FBQ0E7QUFDQSxjQUFjOzs7Ozs7Ozs7OztBQ0xEO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG1CQUFtQjtBQUNuQixxQkFBcUIsbUJBQU8sQ0FBQywwREFBdUI7QUFDcEQsaUJBQWlCLG1CQUFPLENBQUMsd0NBQVU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7Ozs7Ozs7Ozs7O0FDZk47QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsb0JBQW9CO0FBQ3BCLHdCQUF3QixtQkFBTyxDQUFDLGtFQUEyQjtBQUMzRCx3QkFBd0IsbUJBQU8sQ0FBQyw4REFBeUI7QUFDekQsZ0JBQWdCLG1CQUFPLENBQUMsOENBQWlCO0FBQ3pDLGlCQUFpQixtQkFBTyxDQUFDLGtEQUFtQjtBQUM1QyxxQkFBcUIsbUJBQU8sQ0FBQywwREFBdUI7QUFDcEQsaUJBQWlCLG1CQUFPLENBQUMsd0NBQVU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7Ozs7Ozs7Ozs7O0FDckNQO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQixnQkFBZ0IsbUJBQU8sQ0FBQyw4Q0FBaUI7QUFDekMsc0JBQXNCLG1CQUFPLENBQUMsa0RBQWU7QUFDN0MsdUJBQXVCLG1CQUFPLENBQUMsb0RBQWdCO0FBQy9DLDBCQUEwQixtQkFBTyxDQUFDLDBEQUFtQjtBQUNyRCxxQkFBcUIsbUJBQU8sQ0FBQyxnREFBYztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQzVCTDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qjs7Ozs7Ozs7Ozs7QUNqQlY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsa0JBQWtCO0FBQ2xCLGlCQUFpQixtQkFBTyxDQUFDLGtEQUFtQjtBQUM1QyxxQkFBcUIsbUJBQU8sQ0FBQywwREFBdUI7QUFDcEQsMEJBQTBCLG1CQUFPLENBQUMsMERBQW1CO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQ3RCTDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjs7Ozs7Ozs7Ozs7QUNkTDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx3QkFBd0I7QUFDeEIsaUJBQWlCLG1CQUFPLENBQUMsa0RBQW1CO0FBQzVDLHFCQUFxQixtQkFBTyxDQUFDLDBEQUF1QjtBQUNwRCxpQkFBaUIsbUJBQU8sQ0FBQyx3Q0FBVTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsVUFBVTtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCOzs7Ozs7Ozs7OztBQzlCWDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxrQkFBa0I7QUFDbEIscUJBQXFCLG1CQUFPLENBQUMsd0RBQXNCO0FBQ25ELHFCQUFxQixtQkFBTyxDQUFDLHdEQUFzQjtBQUNuRCxtQkFBbUIsbUJBQU8sQ0FBQyxzREFBcUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQzdGTDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxxQkFBcUI7QUFDckIscUJBQXFCLG1CQUFPLENBQUMsd0RBQXNCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7Ozs7Ozs7Ozs7O0FDVFI7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsc0JBQXNCO0FBQ3RCLHFCQUFxQixtQkFBTyxDQUFDLHdEQUFzQjtBQUNuRCxxQkFBcUIsbUJBQU8sQ0FBQyx3REFBc0I7QUFDbkQsMkJBQTJCLG1CQUFPLENBQUMsb0VBQTRCO0FBQy9ELHVCQUF1QixtQkFBTyxDQUFDLHdEQUFzQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjs7Ozs7Ozs7Ozs7QUN6Q1Q7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7Ozs7Ozs7Ozs7O0FDUlI7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsMEJBQTBCO0FBQzFCLHFCQUFxQixtQkFBTyxDQUFDLDBEQUF1QjtBQUNwRCx3QkFBd0IsbUJBQU8sQ0FBQyx5REFBaUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELFdBQVc7QUFDbEU7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCOzs7Ozs7Ozs7OztBQ25EYjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxhQUFhO0FBQ2IsaUJBQWlCLG1CQUFPLENBQUMsd0NBQVU7QUFDbkMsc0JBQXNCLG1CQUFPLENBQUMsNERBQXdCO0FBQ3RELHdCQUF3QixtQkFBTyxDQUFDLGtFQUEyQjtBQUMzRCxpQkFBaUIsbUJBQU8sQ0FBQyxrREFBbUI7QUFDNUMsNkJBQTZCLG1CQUFPLENBQUMsOEVBQWlDO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGNBQWM7QUFDZCxnQkFBZ0IsbUJBQU8sQ0FBQyxnREFBa0I7QUFDMUMsc0JBQXNCLG1CQUFPLENBQUMsNERBQXdCO0FBQ3RELG1CQUFtQixtQkFBTyxDQUFDLHNEQUFxQjtBQUNoRCxpQkFBaUIsbUJBQU8sQ0FBQyxrREFBbUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYzs7Ozs7Ozs7Ozs7QUMvQkQ7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZ0JBQWdCLEdBQUcsa0JBQWtCLEdBQUcsa0JBQWtCLEdBQUcsbUJBQW1CLEdBQUcsbUJBQW1CO0FBQ3RHLGdCQUFnQixtQkFBTyxDQUFDLHNDQUFTO0FBQ2pDLHFCQUFxQixtQkFBTyxDQUFDLDREQUF3QjtBQUNyRCxpQkFBaUIsbUJBQU8sQ0FBQyxrREFBbUI7QUFDNUMsZUFBZSxtQkFBTyxDQUFDLG9DQUFRO0FBQy9CLHNCQUFzQixtQkFBTyxDQUFDLDREQUF3QjtBQUN0RCxpQkFBaUIsbUJBQU8sQ0FBQyx3Q0FBVTtBQUNuQyx3QkFBd0IsbUJBQU8sQ0FBQyxrRUFBMkI7QUFDM0QsZ0JBQWdCLG1CQUFPLENBQUMsc0NBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCOzs7Ozs7Ozs7OztBQ2pESDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxZQUFZO0FBQ1osaUJBQWlCLG1CQUFPLENBQUMsd0NBQVU7QUFDbkMsc0JBQXNCLG1CQUFPLENBQUMsNERBQXdCO0FBQ3RELGlCQUFpQixtQkFBTyxDQUFDLGtEQUFtQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZOzs7Ozs7Ozs7OztBQ1pDO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQixHQUFHLGVBQWUsR0FBRyxpQkFBaUIsR0FBRyxpQkFBaUI7QUFDNUUsaUJBQWlCO0FBQ2pCLGlCQUFpQjtBQUNqQixlQUFlO0FBQ2Ysa0JBQWtCOzs7Ozs7Ozs7OztBQ05MO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELFlBQVk7QUFDWixpQkFBaUIsbUJBQU8sQ0FBQyxrREFBUTtBQUNqQyxrQkFBa0IsbUJBQU8sQ0FBQyx3Q0FBVztBQUNyQyx1QkFBdUIsbUJBQU8sQ0FBQyxrREFBZ0I7QUFDL0Msb0JBQW9CLG1CQUFPLENBQUMsOENBQWlCO0FBQzdDLHdCQUF3QixtQkFBTyxDQUFDLHNFQUE2QjtBQUM3RCx3QkFBd0IsbUJBQU8sQ0FBQyw4REFBeUI7QUFDekQscUJBQXFCLG1CQUFPLENBQUMsMERBQXVCO0FBQ3BEO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsa0JBQWtCO0FBQzlDLDZCQUE2QixhQUFhO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTs7Ozs7Ozs7Ozs7QUNwR0M7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlO0FBQ2Ysc0NBQXNDLG1CQUFPLENBQUMsc0RBQXFCO0FBQ25FLGdCQUFnQixtQkFBTyxDQUFDLGdEQUFrQjtBQUMxQyxnQkFBZ0IsbUJBQU8sQ0FBQyw4Q0FBaUI7QUFDekMsZ0RBQWdELG1CQUFPLENBQUMsb0dBQXNDO0FBQzlGLHNCQUFzQixtQkFBTyxDQUFDLDREQUF3QjtBQUN0RCx5QkFBeUIsbUJBQU8sQ0FBQyxvRUFBNEI7QUFDN0QsaUJBQWlCLG1CQUFPLENBQUMsa0RBQW1CO0FBQzVDLGdCQUFnQixtQkFBTyxDQUFDLDhDQUFpQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUJBQWlCO0FBQ3JDLHdCQUF3QixnQkFBZ0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLHlEQUF5RDtBQUNsRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMseURBQXlEO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxzQ0FBc0M7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlOzs7Ozs7Ozs7OztBQ3pRRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0IsR0FBRyxXQUFXO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsd0JBQXdCLFdBQVcsS0FBSztBQUN6QztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNkJBQTZCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxJQUFJO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLCtCQUErQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjs7Ozs7Ozs7Ozs7QUNwR2E7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsaUJBQWlCO0FBQ2pCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1hhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7Ozs7Ozs7Ozs7O0FDVFo7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsOEJBQThCLEdBQUcsaUJBQWlCO0FBQ2xELGlCQUFpQixtQkFBTyxDQUFDLGtEQUFRO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7Ozs7Ozs7Ozs7O0FDdkZqQjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxjQUFjO0FBQ2QsY0FBYyxLQUFLOzs7Ozs7Ozs7OztBQ0hOO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QscUJBQXFCO0FBQ3JCLGlCQUFpQixtQkFBTyxDQUFDLGtEQUFRO0FBQ2pDLGtCQUFrQixtQkFBTyxDQUFDLDhDQUFpQjtBQUMzQyw0QkFBNEIsbUJBQU8sQ0FBQyxrRUFBcUI7QUFDekQsaUJBQWlCLG1CQUFPLENBQUMsNENBQVU7QUFDbkMsc0NBQXNDLG1CQUFPLENBQUMsc0RBQXFCO0FBQ25FLDRCQUE0QixtQkFBTyxDQUFDLGtFQUFxQjtBQUN6RCxtQkFBbUIsbUJBQU8sQ0FBQyxnREFBWTtBQUN2Qyx3QkFBd0IsbUJBQU8sQ0FBQyw4REFBeUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsS0FBSztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3RELG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUNBQWlDO0FBQ3pELDRCQUE0QixvQ0FBb0M7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsT0FBTztBQUNuQyxnQ0FBZ0MsT0FBTztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7Ozs7Ozs7Ozs7O0FDOUtSO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7Ozs7Ozs7Ozs7O0FDYkM7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsaUJBQWlCLG1CQUFPLENBQUMsa0RBQW1CO0FBQzVDLGVBQWUsbUJBQU8sQ0FBQyxrQ0FBUTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUNWRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxjQUFjO0FBQ2QsZUFBZSxtQkFBTyxDQUFDLGdDQUFRO0FBQy9CLHVCQUF1QixtQkFBTyxDQUFDLHdEQUFzQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGLEVBQUUsV0FBVyxFQUFFLFVBQVU7QUFDMUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOzs7Ozs7Ozs7OztBQ3BDRDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxZQUFZO0FBQ1osZUFBZSxtQkFBTyxDQUFDLGdDQUFRO0FBQy9CLHVCQUF1QixtQkFBTyxDQUFDLHdEQUFzQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTs7Ozs7Ozs7Ozs7QUNsRkM7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxFQUFFLFNBQVMsR0FBRyxFQUFFLFNBQVMsRUFBRSxVQUFVO0FBQ2xGO0FBQ0E7QUFDQSxZQUFZOzs7Ozs7Ozs7OztBQ2xCQztBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0IsR0FBRyxnQkFBZ0IsR0FBRyxnQkFBZ0I7QUFDMUQsdUJBQXVCLG1CQUFPLENBQUMsd0RBQXNCO0FBQ3JELGlCQUFpQixtQkFBTyxDQUFDLGtEQUFtQjtBQUM1QyxpQkFBaUIsbUJBQU8sQ0FBQyxvQ0FBVTtBQUNuQyxlQUFlLG1CQUFPLENBQUMsZ0NBQVE7QUFDL0IsZUFBZSxtQkFBTyxDQUFDLGdDQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLDZMQUE2TDtBQUM3TDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9COzs7Ozs7Ozs7OztBQ3pEUDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQkFBaUIsR0FBRywwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsRUFBRSxZQUFZLEVBQUUsT0FBTztBQUN0RCxvQkFBb0Isa0JBQWtCO0FBQ3RDLHVDQUF1QyxFQUFFLFlBQVksRUFBRSxVQUFVO0FBQ2pFO0FBQ0EsNENBQTRDLEVBQUUsWUFBWSxFQUFFLFVBQVU7QUFDdEU7QUFDQSxpQkFBaUI7Ozs7Ozs7Ozs7O0FDL0NKO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGdCQUFnQixHQUFHLG1CQUFtQixHQUFHLG1CQUFtQixHQUFHLGtCQUFrQixHQUFHLG9CQUFvQixHQUFHLGdCQUFnQixHQUFHLG1CQUFtQixHQUFHLHNCQUFzQixHQUFHLHFCQUFxQixHQUFHLGtCQUFrQixHQUFHLGtCQUFrQixHQUFHLGtCQUFrQjtBQUNqUSxrQkFBa0I7QUFDbEIsa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUNsQixxQkFBcUI7QUFDckIsc0JBQXNCO0FBQ3RCLG1CQUFtQjtBQUNuQixnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLGtCQUFrQjtBQUNsQjtBQUNBLG1CQUFtQjtBQUNuQixtQkFBbUI7QUFDbkI7QUFDQSxnQkFBZ0I7Ozs7Ozs7Ozs7O0FDaEJIO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHlCQUF5QixHQUFHLHlCQUF5QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EseUJBQXlCOzs7Ozs7Ozs7OztBQ1ZaO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOzs7Ozs7Ozs7OztBQ1REO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQixpQkFBaUIsbUJBQU8sQ0FBQyx5Q0FBVTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxXQUFXLElBQUksV0FBVztBQUM5RCxxQ0FBcUMsWUFBWSxJQUFJLEVBQUU7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjs7Ozs7Ozs7Ozs7QUN4RGE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHdDQUF3QyxtQkFBbUIsS0FBSzs7Ozs7OztVQ1JqRTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7QUNOYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlLG1CQUFPLENBQUMsdUNBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvTWluSGVhcC5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvY29sb3IuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZGlzcGxheS9iYWNrZW5kLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9kaXNwbGF5L2NhbnZhcy5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZGlzcGxheS9kaXNwbGF5LmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9kaXNwbGF5L2hleC5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZGlzcGxheS9yZWN0LmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9kaXNwbGF5L3Rlcm0uanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Rpc3BsYXkvdGlsZS1nbC5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZGlzcGxheS90aWxlLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9lbmdpbmUuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2V2ZW50cXVldWUuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Zvdi9kaXNjcmV0ZS1zaGFkb3djYXN0aW5nLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9mb3YvZm92LmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9mb3YvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Zvdi9wcmVjaXNlLXNoYWRvd2Nhc3RpbmcuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Zvdi9yZWN1cnNpdmUtc2hhZG93Y2FzdGluZy5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2xpZ2h0aW5nLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9tYXAvYXJlbmEuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9jZWxsdWxhci5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL2RpZ2dlci5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL2RpdmlkZWRtYXplLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9tYXAvZHVuZ2Vvbi5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL2VsbGVybWF6ZS5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL2ZlYXR1cmVzLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9tYXAvaWNleW1hemUuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL21hcC5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL3JvZ3VlLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9tYXAvdW5pZm9ybS5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbm9pc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL25vaXNlL25vaXNlLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9ub2lzZS9zaW1wbGV4LmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9wYXRoL2FzdGFyLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9wYXRoL2RpamtzdHJhLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9wYXRoL2luZGV4LmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9wYXRoL3BhdGguanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3JuZy5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvc2NoZWR1bGVyL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvc2NoZWR1bGVyL2luZGV4LmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9zY2hlZHVsZXIvc2NoZWR1bGVyLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9zY2hlZHVsZXIvc2ltcGxlLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9zY2hlZHVsZXIvc3BlZWQuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3N0cmluZ2dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvdGV4dC5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2FjdGlvbi9hY3Rpb24udHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9hY3Rpb24vYWx0YXJBY3Rpb24udHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9hY3Rpb24vYXR0YWNrQWN0aW9uLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvYWN0aW9uL2J1bXBBY3Rpb24udHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9hY3Rpb24vZGlyZWN0aW9uQWN0aW9uLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvYWN0aW9uL21vdmVBY3Rpb24udHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9hY3Rpb24vcGFzc0FjdGlvbi50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2FjdGlvbi9waWNrVXBJdGVtQWN0aW9uLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvYmVoYXZpb3IvYWlCZWhhdmlvci50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2JlaGF2aW9yL2VtcHR5QmVoYXZpb3IudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9iZWhhdmlvci9wbGF5ZXJCZWhhdmlvci50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2NvbXBvbmVudC9iYXNlQ29tcG9uZW50LnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvY29tcG9uZW50L2ludmVudG9yeUNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2VudGl0eS9hY3Rvci50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2VudGl0eS9lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9lbnRpdHkvZW50aXR5RmFjdG9yeS50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2VudGl0eS9pdGVtLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvZW50aXR5L25hbWVzLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvZ2FtZS9nYW1lLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvZ2FtZS9nYW1lTWFwLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvZ2FtZS9pbnB1dE1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9nZW5lcmF0aW9uL2Jhc2VSb29tLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvZ2VuZXJhdGlvbi9iYXNlbGluZUdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2dlbmVyYXRpb24vZ2VuZXJhdGlvblV0aWxpdHkudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9nZW5lcmF0aW9uL2xldmVscy50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2dlbmVyYXRpb24vcm9vbUdlbmVyYXRvci50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL3RpbGUvdGlsZS50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL3RpbGUvdGlsZUZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy91aS9idXR0b24udHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy91aS9tZW51LnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvdWkvdGV4dC50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL3VpL3VpRmFjdG9yeS50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL3VpL3V0aWwudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy91dGlsaXR5L2NvbG9ycy50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL3V0aWxpdHkvZGlzdGFuY2UudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy91dGlsaXR5L2Vycm9yLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvdXRpbGl0eS9tZXNzYWdlTG9nLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvdXRpbGl0eS9yZW5kZXJPcmRlci50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTWluSGVhcCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaGVhcCA9IFtdO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IDA7XG4gICAgfVxuICAgIGxlc3NUaGFuKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEua2V5ID09IGIua2V5ID8gYS50aW1lc3RhbXAgPCBiLnRpbWVzdGFtcCA6IGEua2V5IDwgYi5rZXk7XG4gICAgfVxuICAgIHNoaWZ0KHYpIHtcbiAgICAgICAgdGhpcy5oZWFwID0gdGhpcy5oZWFwLm1hcCgoeyBrZXksIHZhbHVlLCB0aW1lc3RhbXAgfSkgPT4gKHsga2V5OiBrZXkgKyB2LCB2YWx1ZSwgdGltZXN0YW1wIH0pKTtcbiAgICB9XG4gICAgbGVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWFwLmxlbmd0aDtcbiAgICB9XG4gICAgcHVzaCh2YWx1ZSwga2V5KSB7XG4gICAgICAgIHRoaXMudGltZXN0YW1wICs9IDE7XG4gICAgICAgIGNvbnN0IGxvYyA9IHRoaXMubGVuKCk7XG4gICAgICAgIHRoaXMuaGVhcC5wdXNoKHsgdmFsdWUsIHRpbWVzdGFtcDogdGhpcy50aW1lc3RhbXAsIGtleSB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVVcChsb2MpO1xuICAgIH1cbiAgICBwb3AoKSB7XG4gICAgICAgIGlmICh0aGlzLmxlbigpID09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIGVsZW1lbnQgdG8gcG9wXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRvcCA9IHRoaXMuaGVhcFswXTtcbiAgICAgICAgaWYgKHRoaXMubGVuKCkgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLmhlYXBbMF0gPSB0aGlzLmhlYXAucG9wKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURvd24oMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhlYXAucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvcDtcbiAgICB9XG4gICAgZmluZCh2KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW4oKTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodiA9PSB0aGlzLmhlYXBbaV0udmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWFwW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZW1vdmUodikge1xuICAgICAgICBsZXQgaW5kZXggPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuKCk7IGkrKykge1xuICAgICAgICAgICAgaWYgKHYgPT0gdGhpcy5oZWFwW2ldLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxlbigpID4gMSkge1xuICAgICAgICAgICAgbGV0IGxhc3QgPSB0aGlzLmhlYXAucG9wKCk7XG4gICAgICAgICAgICBpZiAobGFzdC52YWx1ZSAhPSB2KSB7IC8vIGlmIHRoZSBsYXN0IG9uZSBpcyBiZWluZyByZW1vdmVkLCBkbyBub3RoaW5nXG4gICAgICAgICAgICAgICAgdGhpcy5oZWFwW2luZGV4XSA9IGxhc3Q7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEb3duKGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFwLnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBwYXJlbnROb2RlKHgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKHggLSAxKSAvIDIpO1xuICAgIH1cbiAgICBsZWZ0Q2hpbGROb2RlKHgpIHtcbiAgICAgICAgcmV0dXJuIDIgKiB4ICsgMTtcbiAgICB9XG4gICAgcmlnaHRDaGlsZE5vZGUoeCkge1xuICAgICAgICByZXR1cm4gMiAqIHggKyAyO1xuICAgIH1cbiAgICBleGlzdE5vZGUoeCkge1xuICAgICAgICByZXR1cm4geCA+PSAwICYmIHggPCB0aGlzLmhlYXAubGVuZ3RoO1xuICAgIH1cbiAgICBzd2FwKHgsIHkpIHtcbiAgICAgICAgY29uc3QgdCA9IHRoaXMuaGVhcFt4XTtcbiAgICAgICAgdGhpcy5oZWFwW3hdID0gdGhpcy5oZWFwW3ldO1xuICAgICAgICB0aGlzLmhlYXBbeV0gPSB0O1xuICAgIH1cbiAgICBtaW5Ob2RlKG51bWJlcnMpIHtcbiAgICAgICAgY29uc3QgdmFsaWRudW1iZXJzID0gbnVtYmVycy5maWx0ZXIodGhpcy5leGlzdE5vZGUuYmluZCh0aGlzKSk7XG4gICAgICAgIGxldCBtaW5pbWFsID0gdmFsaWRudW1iZXJzWzBdO1xuICAgICAgICBmb3IgKGNvbnN0IGkgb2YgdmFsaWRudW1iZXJzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sZXNzVGhhbih0aGlzLmhlYXBbaV0sIHRoaXMuaGVhcFttaW5pbWFsXSkpIHtcbiAgICAgICAgICAgICAgICBtaW5pbWFsID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluaW1hbDtcbiAgICB9XG4gICAgdXBkYXRlVXAoeCkge1xuICAgICAgICBpZiAoeCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlKHgpO1xuICAgICAgICBpZiAodGhpcy5leGlzdE5vZGUocGFyZW50KSAmJiB0aGlzLmxlc3NUaGFuKHRoaXMuaGVhcFt4XSwgdGhpcy5oZWFwW3BhcmVudF0pKSB7XG4gICAgICAgICAgICB0aGlzLnN3YXAoeCwgcGFyZW50KTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVXAocGFyZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVEb3duKHgpIHtcbiAgICAgICAgY29uc3QgbGVmdENoaWxkID0gdGhpcy5sZWZ0Q2hpbGROb2RlKHgpO1xuICAgICAgICBjb25zdCByaWdodENoaWxkID0gdGhpcy5yaWdodENoaWxkTm9kZSh4KTtcbiAgICAgICAgaWYgKCF0aGlzLmV4aXN0Tm9kZShsZWZ0Q2hpbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbSA9IHRoaXMubWluTm9kZShbeCwgbGVmdENoaWxkLCByaWdodENoaWxkXSk7XG4gICAgICAgIGlmIChtICE9IHgpIHtcbiAgICAgICAgICAgIHRoaXMuc3dhcCh4LCBtKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRG93bihtKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWJ1Z1ByaW50KCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmhlYXApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGNsYW1wIH0gZnJvbSBcIi4vdXRpbC5qc1wiO1xuaW1wb3J0IFJORyBmcm9tIFwiLi9ybmcuanNcIjtcbmV4cG9ydCBmdW5jdGlvbiBmcm9tU3RyaW5nKHN0cikge1xuICAgIGxldCBjYWNoZWQsIHI7XG4gICAgaWYgKHN0ciBpbiBDQUNIRSkge1xuICAgICAgICBjYWNoZWQgPSBDQUNIRVtzdHJdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKHN0ci5jaGFyQXQoMCkgPT0gXCIjXCIpIHsgLy8gaGV4IHJnYlxuICAgICAgICAgICAgbGV0IG1hdGNoZWQgPSBzdHIubWF0Y2goL1swLTlhLWZdL2dpKSB8fCBbXTtcbiAgICAgICAgICAgIGxldCB2YWx1ZXMgPSBtYXRjaGVkLm1hcCgoeCkgPT4gcGFyc2VJbnQoeCwgMTYpKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID09IDMpIHtcbiAgICAgICAgICAgICAgICBjYWNoZWQgPSB2YWx1ZXMubWFwKCh4KSA9PiB4ICogMTcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzW2kgKyAxXSArPSAxNiAqIHZhbHVlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FjaGVkID0gdmFsdWVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKChyID0gc3RyLm1hdGNoKC9yZ2JcXCgoWzAtOSwgXSspXFwpL2kpKSkgeyAvLyBkZWNpbWFsIHJnYlxuICAgICAgICAgICAgY2FjaGVkID0gclsxXS5zcGxpdCgvXFxzKixcXHMqLykubWFwKCh4KSA9PiBwYXJzZUludCh4KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8vIGh0bWwgbmFtZVxuICAgICAgICAgICAgY2FjaGVkID0gWzAsIDAsIDBdO1xuICAgICAgICB9XG4gICAgICAgIENBQ0hFW3N0cl0gPSBjYWNoZWQ7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWQuc2xpY2UoKTtcbn1cbi8qKlxuICogQWRkIHR3byBvciBtb3JlIGNvbG9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkKGNvbG9yMSwgLi4uY29sb3JzKSB7XG4gICAgbGV0IHJlc3VsdCA9IGNvbG9yMS5zbGljZSgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sb3JzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICByZXN1bHRbaV0gKz0gY29sb3JzW2pdW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIEFkZCB0d28gb3IgbW9yZSBjb2xvcnMsIE1PRElGSUVTIEZJUlNUIEFSR1VNRU5UXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRfKGNvbG9yMSwgLi4uY29sb3JzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xvcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbG9yMVtpXSArPSBjb2xvcnNbal1baV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yMTtcbn1cbi8qKlxuICogTXVsdGlwbHkgKG1peCkgdHdvIG9yIG1vcmUgY29sb3JzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseShjb2xvcjEsIC4uLmNvbG9ycykge1xuICAgIGxldCByZXN1bHQgPSBjb2xvcjEuc2xpY2UoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbG9ycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldICo9IGNvbG9yc1tqXVtpXSAvIDI1NTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHRbaV0gPSBNYXRoLnJvdW5kKHJlc3VsdFtpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIE11bHRpcGx5IChtaXgpIHR3byBvciBtb3JlIGNvbG9ycywgTU9ESUZJRVMgRklSU1QgQVJHVU1FTlRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5Xyhjb2xvcjEsIC4uLmNvbG9ycykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sb3JzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjb2xvcjFbaV0gKj0gY29sb3JzW2pdW2ldIC8gMjU1O1xuICAgICAgICB9XG4gICAgICAgIGNvbG9yMVtpXSA9IE1hdGgucm91bmQoY29sb3IxW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yMTtcbn1cbi8qKlxuICogSW50ZXJwb2xhdGUgKGJsZW5kKSB0d28gY29sb3JzIHdpdGggYSBnaXZlbiBmYWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludGVycG9sYXRlKGNvbG9yMSwgY29sb3IyLCBmYWN0b3IgPSAwLjUpIHtcbiAgICBsZXQgcmVzdWx0ID0gY29sb3IxLnNsaWNlKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gTWF0aC5yb3VuZChyZXN1bHRbaV0gKyBmYWN0b3IgKiAoY29sb3IyW2ldIC0gY29sb3IxW2ldKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnQgY29uc3QgbGVycCA9IGludGVycG9sYXRlO1xuLyoqXG4gKiBJbnRlcnBvbGF0ZSAoYmxlbmQpIHR3byBjb2xvcnMgd2l0aCBhIGdpdmVuIGZhY3RvciBpbiBIU0wgbW9kZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJwb2xhdGVIU0woY29sb3IxLCBjb2xvcjIsIGZhY3RvciA9IDAuNSkge1xuICAgIGxldCBoc2wxID0gcmdiMmhzbChjb2xvcjEpO1xuICAgIGxldCBoc2wyID0gcmdiMmhzbChjb2xvcjIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGhzbDFbaV0gKz0gZmFjdG9yICogKGhzbDJbaV0gLSBoc2wxW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGhzbDJyZ2IoaHNsMSk7XG59XG5leHBvcnQgY29uc3QgbGVycEhTTCA9IGludGVycG9sYXRlSFNMO1xuLyoqXG4gKiBDcmVhdGUgYSBuZXcgcmFuZG9tIGNvbG9yIGJhc2VkIG9uIHRoaXMgb25lXG4gKiBAcGFyYW0gY29sb3JcbiAqIEBwYXJhbSBkaWZmIFNldCBvZiBzdGFuZGFyZCBkZXZpYXRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21pemUoY29sb3IsIGRpZmYpIHtcbiAgICBpZiAoIShkaWZmIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgIGRpZmYgPSBNYXRoLnJvdW5kKFJORy5nZXROb3JtYWwoMCwgZGlmZikpO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0ID0gY29sb3Iuc2xpY2UoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICByZXN1bHRbaV0gKz0gKGRpZmYgaW5zdGFuY2VvZiBBcnJheSA/IE1hdGgucm91bmQoUk5HLmdldE5vcm1hbCgwLCBkaWZmW2ldKSkgOiBkaWZmKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gUkdCIGNvbG9yIHZhbHVlIHRvIEhTTC4gRXhwZWN0cyAwLi4yNTUgaW5wdXRzLCBwcm9kdWNlcyAwLi4xIG91dHB1dHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZ2IyaHNsKGNvbG9yKSB7XG4gICAgbGV0IHIgPSBjb2xvclswXSAvIDI1NTtcbiAgICBsZXQgZyA9IGNvbG9yWzFdIC8gMjU1O1xuICAgIGxldCBiID0gY29sb3JbMl0gLyAyNTU7XG4gICAgbGV0IG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICBsZXQgaCA9IDAsIHMsIGwgPSAobWF4ICsgbWluKSAvIDI7XG4gICAgaWYgKG1heCA9PSBtaW4pIHtcbiAgICAgICAgcyA9IDA7IC8vIGFjaHJvbWF0aWNcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxldCBkID0gbWF4IC0gbWluO1xuICAgICAgICBzID0gKGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pKTtcbiAgICAgICAgc3dpdGNoIChtYXgpIHtcbiAgICAgICAgICAgIGNhc2UgcjpcbiAgICAgICAgICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGc6XG4gICAgICAgICAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYjpcbiAgICAgICAgICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGggLz0gNjtcbiAgICB9XG4gICAgcmV0dXJuIFtoLCBzLCBsXTtcbn1cbmZ1bmN0aW9uIGh1ZTJyZ2IocCwgcSwgdCkge1xuICAgIGlmICh0IDwgMClcbiAgICAgICAgdCArPSAxO1xuICAgIGlmICh0ID4gMSlcbiAgICAgICAgdCAtPSAxO1xuICAgIGlmICh0IDwgMSAvIDYpXG4gICAgICAgIHJldHVybiBwICsgKHEgLSBwKSAqIDYgKiB0O1xuICAgIGlmICh0IDwgMSAvIDIpXG4gICAgICAgIHJldHVybiBxO1xuICAgIGlmICh0IDwgMiAvIDMpXG4gICAgICAgIHJldHVybiBwICsgKHEgLSBwKSAqICgyIC8gMyAtIHQpICogNjtcbiAgICByZXR1cm4gcDtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gSFNMIGNvbG9yIHZhbHVlIHRvIFJHQi4gRXhwZWN0cyAwLi4xIGlucHV0cywgcHJvZHVjZXMgMC4uMjU1IG91dHB1dHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoc2wycmdiKGNvbG9yKSB7XG4gICAgbGV0IGwgPSBjb2xvclsyXTtcbiAgICBpZiAoY29sb3JbMV0gPT0gMCkge1xuICAgICAgICBsID0gTWF0aC5yb3VuZChsICogMjU1KTtcbiAgICAgICAgcmV0dXJuIFtsLCBsLCBsXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxldCBzID0gY29sb3JbMV07XG4gICAgICAgIGxldCBxID0gKGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHMpO1xuICAgICAgICBsZXQgcCA9IDIgKiBsIC0gcTtcbiAgICAgICAgbGV0IHIgPSBodWUycmdiKHAsIHEsIGNvbG9yWzBdICsgMSAvIDMpO1xuICAgICAgICBsZXQgZyA9IGh1ZTJyZ2IocCwgcSwgY29sb3JbMF0pO1xuICAgICAgICBsZXQgYiA9IGh1ZTJyZ2IocCwgcSwgY29sb3JbMF0gLSAxIC8gMyk7XG4gICAgICAgIHJldHVybiBbTWF0aC5yb3VuZChyICogMjU1KSwgTWF0aC5yb3VuZChnICogMjU1KSwgTWF0aC5yb3VuZChiICogMjU1KV07XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHRvUkdCKGNvbG9yKSB7XG4gICAgbGV0IGNsYW1wZWQgPSBjb2xvci5tYXAoeCA9PiBjbGFtcCh4LCAwLCAyNTUpKTtcbiAgICByZXR1cm4gYHJnYigke2NsYW1wZWQuam9pbihcIixcIil9KWA7XG59XG5leHBvcnQgZnVuY3Rpb24gdG9IZXgoY29sb3IpIHtcbiAgICBsZXQgY2xhbXBlZCA9IGNvbG9yLm1hcCh4ID0+IGNsYW1wKHgsIDAsIDI1NSkudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKSk7XG4gICAgcmV0dXJuIGAjJHtjbGFtcGVkLmpvaW4oXCJcIil9YDtcbn1cbmNvbnN0IENBQ0hFID0ge1xuICAgIFwiYmxhY2tcIjogWzAsIDAsIDBdLFxuICAgIFwibmF2eVwiOiBbMCwgMCwgMTI4XSxcbiAgICBcImRhcmtibHVlXCI6IFswLCAwLCAxMzldLFxuICAgIFwibWVkaXVtYmx1ZVwiOiBbMCwgMCwgMjA1XSxcbiAgICBcImJsdWVcIjogWzAsIDAsIDI1NV0sXG4gICAgXCJkYXJrZ3JlZW5cIjogWzAsIDEwMCwgMF0sXG4gICAgXCJncmVlblwiOiBbMCwgMTI4LCAwXSxcbiAgICBcInRlYWxcIjogWzAsIDEyOCwgMTI4XSxcbiAgICBcImRhcmtjeWFuXCI6IFswLCAxMzksIDEzOV0sXG4gICAgXCJkZWVwc2t5Ymx1ZVwiOiBbMCwgMTkxLCAyNTVdLFxuICAgIFwiZGFya3R1cnF1b2lzZVwiOiBbMCwgMjA2LCAyMDldLFxuICAgIFwibWVkaXVtc3ByaW5nZ3JlZW5cIjogWzAsIDI1MCwgMTU0XSxcbiAgICBcImxpbWVcIjogWzAsIDI1NSwgMF0sXG4gICAgXCJzcHJpbmdncmVlblwiOiBbMCwgMjU1LCAxMjddLFxuICAgIFwiYXF1YVwiOiBbMCwgMjU1LCAyNTVdLFxuICAgIFwiY3lhblwiOiBbMCwgMjU1LCAyNTVdLFxuICAgIFwibWlkbmlnaHRibHVlXCI6IFsyNSwgMjUsIDExMl0sXG4gICAgXCJkb2RnZXJibHVlXCI6IFszMCwgMTQ0LCAyNTVdLFxuICAgIFwiZm9yZXN0Z3JlZW5cIjogWzM0LCAxMzksIDM0XSxcbiAgICBcInNlYWdyZWVuXCI6IFs0NiwgMTM5LCA4N10sXG4gICAgXCJkYXJrc2xhdGVncmF5XCI6IFs0NywgNzksIDc5XSxcbiAgICBcImRhcmtzbGF0ZWdyZXlcIjogWzQ3LCA3OSwgNzldLFxuICAgIFwibGltZWdyZWVuXCI6IFs1MCwgMjA1LCA1MF0sXG4gICAgXCJtZWRpdW1zZWFncmVlblwiOiBbNjAsIDE3OSwgMTEzXSxcbiAgICBcInR1cnF1b2lzZVwiOiBbNjQsIDIyNCwgMjA4XSxcbiAgICBcInJveWFsYmx1ZVwiOiBbNjUsIDEwNSwgMjI1XSxcbiAgICBcInN0ZWVsYmx1ZVwiOiBbNzAsIDEzMCwgMTgwXSxcbiAgICBcImRhcmtzbGF0ZWJsdWVcIjogWzcyLCA2MSwgMTM5XSxcbiAgICBcIm1lZGl1bXR1cnF1b2lzZVwiOiBbNzIsIDIwOSwgMjA0XSxcbiAgICBcImluZGlnb1wiOiBbNzUsIDAsIDEzMF0sXG4gICAgXCJkYXJrb2xpdmVncmVlblwiOiBbODUsIDEwNywgNDddLFxuICAgIFwiY2FkZXRibHVlXCI6IFs5NSwgMTU4LCAxNjBdLFxuICAgIFwiY29ybmZsb3dlcmJsdWVcIjogWzEwMCwgMTQ5LCAyMzddLFxuICAgIFwibWVkaXVtYXF1YW1hcmluZVwiOiBbMTAyLCAyMDUsIDE3MF0sXG4gICAgXCJkaW1ncmF5XCI6IFsxMDUsIDEwNSwgMTA1XSxcbiAgICBcImRpbWdyZXlcIjogWzEwNSwgMTA1LCAxMDVdLFxuICAgIFwic2xhdGVibHVlXCI6IFsxMDYsIDkwLCAyMDVdLFxuICAgIFwib2xpdmVkcmFiXCI6IFsxMDcsIDE0MiwgMzVdLFxuICAgIFwic2xhdGVncmF5XCI6IFsxMTIsIDEyOCwgMTQ0XSxcbiAgICBcInNsYXRlZ3JleVwiOiBbMTEyLCAxMjgsIDE0NF0sXG4gICAgXCJsaWdodHNsYXRlZ3JheVwiOiBbMTE5LCAxMzYsIDE1M10sXG4gICAgXCJsaWdodHNsYXRlZ3JleVwiOiBbMTE5LCAxMzYsIDE1M10sXG4gICAgXCJtZWRpdW1zbGF0ZWJsdWVcIjogWzEyMywgMTA0LCAyMzhdLFxuICAgIFwibGF3bmdyZWVuXCI6IFsxMjQsIDI1MiwgMF0sXG4gICAgXCJjaGFydHJldXNlXCI6IFsxMjcsIDI1NSwgMF0sXG4gICAgXCJhcXVhbWFyaW5lXCI6IFsxMjcsIDI1NSwgMjEyXSxcbiAgICBcIm1hcm9vblwiOiBbMTI4LCAwLCAwXSxcbiAgICBcInB1cnBsZVwiOiBbMTI4LCAwLCAxMjhdLFxuICAgIFwib2xpdmVcIjogWzEyOCwgMTI4LCAwXSxcbiAgICBcImdyYXlcIjogWzEyOCwgMTI4LCAxMjhdLFxuICAgIFwiZ3JleVwiOiBbMTI4LCAxMjgsIDEyOF0sXG4gICAgXCJza3libHVlXCI6IFsxMzUsIDIwNiwgMjM1XSxcbiAgICBcImxpZ2h0c2t5Ymx1ZVwiOiBbMTM1LCAyMDYsIDI1MF0sXG4gICAgXCJibHVldmlvbGV0XCI6IFsxMzgsIDQzLCAyMjZdLFxuICAgIFwiZGFya3JlZFwiOiBbMTM5LCAwLCAwXSxcbiAgICBcImRhcmttYWdlbnRhXCI6IFsxMzksIDAsIDEzOV0sXG4gICAgXCJzYWRkbGVicm93blwiOiBbMTM5LCA2OSwgMTldLFxuICAgIFwiZGFya3NlYWdyZWVuXCI6IFsxNDMsIDE4OCwgMTQzXSxcbiAgICBcImxpZ2h0Z3JlZW5cIjogWzE0NCwgMjM4LCAxNDRdLFxuICAgIFwibWVkaXVtcHVycGxlXCI6IFsxNDcsIDExMiwgMjE2XSxcbiAgICBcImRhcmt2aW9sZXRcIjogWzE0OCwgMCwgMjExXSxcbiAgICBcInBhbGVncmVlblwiOiBbMTUyLCAyNTEsIDE1Ml0sXG4gICAgXCJkYXJrb3JjaGlkXCI6IFsxNTMsIDUwLCAyMDRdLFxuICAgIFwieWVsbG93Z3JlZW5cIjogWzE1NCwgMjA1LCA1MF0sXG4gICAgXCJzaWVubmFcIjogWzE2MCwgODIsIDQ1XSxcbiAgICBcImJyb3duXCI6IFsxNjUsIDQyLCA0Ml0sXG4gICAgXCJkYXJrZ3JheVwiOiBbMTY5LCAxNjksIDE2OV0sXG4gICAgXCJkYXJrZ3JleVwiOiBbMTY5LCAxNjksIDE2OV0sXG4gICAgXCJsaWdodGJsdWVcIjogWzE3MywgMjE2LCAyMzBdLFxuICAgIFwiZ3JlZW55ZWxsb3dcIjogWzE3MywgMjU1LCA0N10sXG4gICAgXCJwYWxldHVycXVvaXNlXCI6IFsxNzUsIDIzOCwgMjM4XSxcbiAgICBcImxpZ2h0c3RlZWxibHVlXCI6IFsxNzYsIDE5NiwgMjIyXSxcbiAgICBcInBvd2RlcmJsdWVcIjogWzE3NiwgMjI0LCAyMzBdLFxuICAgIFwiZmlyZWJyaWNrXCI6IFsxNzgsIDM0LCAzNF0sXG4gICAgXCJkYXJrZ29sZGVucm9kXCI6IFsxODQsIDEzNCwgMTFdLFxuICAgIFwibWVkaXVtb3JjaGlkXCI6IFsxODYsIDg1LCAyMTFdLFxuICAgIFwicm9zeWJyb3duXCI6IFsxODgsIDE0MywgMTQzXSxcbiAgICBcImRhcmtraGFraVwiOiBbMTg5LCAxODMsIDEwN10sXG4gICAgXCJzaWx2ZXJcIjogWzE5MiwgMTkyLCAxOTJdLFxuICAgIFwibWVkaXVtdmlvbGV0cmVkXCI6IFsxOTksIDIxLCAxMzNdLFxuICAgIFwiaW5kaWFucmVkXCI6IFsyMDUsIDkyLCA5Ml0sXG4gICAgXCJwZXJ1XCI6IFsyMDUsIDEzMywgNjNdLFxuICAgIFwiY2hvY29sYXRlXCI6IFsyMTAsIDEwNSwgMzBdLFxuICAgIFwidGFuXCI6IFsyMTAsIDE4MCwgMTQwXSxcbiAgICBcImxpZ2h0Z3JheVwiOiBbMjExLCAyMTEsIDIxMV0sXG4gICAgXCJsaWdodGdyZXlcIjogWzIxMSwgMjExLCAyMTFdLFxuICAgIFwicGFsZXZpb2xldHJlZFwiOiBbMjE2LCAxMTIsIDE0N10sXG4gICAgXCJ0aGlzdGxlXCI6IFsyMTYsIDE5MSwgMjE2XSxcbiAgICBcIm9yY2hpZFwiOiBbMjE4LCAxMTIsIDIxNF0sXG4gICAgXCJnb2xkZW5yb2RcIjogWzIxOCwgMTY1LCAzMl0sXG4gICAgXCJjcmltc29uXCI6IFsyMjAsIDIwLCA2MF0sXG4gICAgXCJnYWluc2Jvcm9cIjogWzIyMCwgMjIwLCAyMjBdLFxuICAgIFwicGx1bVwiOiBbMjIxLCAxNjAsIDIyMV0sXG4gICAgXCJidXJseXdvb2RcIjogWzIyMiwgMTg0LCAxMzVdLFxuICAgIFwibGlnaHRjeWFuXCI6IFsyMjQsIDI1NSwgMjU1XSxcbiAgICBcImxhdmVuZGVyXCI6IFsyMzAsIDIzMCwgMjUwXSxcbiAgICBcImRhcmtzYWxtb25cIjogWzIzMywgMTUwLCAxMjJdLFxuICAgIFwidmlvbGV0XCI6IFsyMzgsIDEzMCwgMjM4XSxcbiAgICBcInBhbGVnb2xkZW5yb2RcIjogWzIzOCwgMjMyLCAxNzBdLFxuICAgIFwibGlnaHRjb3JhbFwiOiBbMjQwLCAxMjgsIDEyOF0sXG4gICAgXCJraGFraVwiOiBbMjQwLCAyMzAsIDE0MF0sXG4gICAgXCJhbGljZWJsdWVcIjogWzI0MCwgMjQ4LCAyNTVdLFxuICAgIFwiaG9uZXlkZXdcIjogWzI0MCwgMjU1LCAyNDBdLFxuICAgIFwiYXp1cmVcIjogWzI0MCwgMjU1LCAyNTVdLFxuICAgIFwic2FuZHlicm93blwiOiBbMjQ0LCAxNjQsIDk2XSxcbiAgICBcIndoZWF0XCI6IFsyNDUsIDIyMiwgMTc5XSxcbiAgICBcImJlaWdlXCI6IFsyNDUsIDI0NSwgMjIwXSxcbiAgICBcIndoaXRlc21va2VcIjogWzI0NSwgMjQ1LCAyNDVdLFxuICAgIFwibWludGNyZWFtXCI6IFsyNDUsIDI1NSwgMjUwXSxcbiAgICBcImdob3N0d2hpdGVcIjogWzI0OCwgMjQ4LCAyNTVdLFxuICAgIFwic2FsbW9uXCI6IFsyNTAsIDEyOCwgMTE0XSxcbiAgICBcImFudGlxdWV3aGl0ZVwiOiBbMjUwLCAyMzUsIDIxNV0sXG4gICAgXCJsaW5lblwiOiBbMjUwLCAyNDAsIDIzMF0sXG4gICAgXCJsaWdodGdvbGRlbnJvZHllbGxvd1wiOiBbMjUwLCAyNTAsIDIxMF0sXG4gICAgXCJvbGRsYWNlXCI6IFsyNTMsIDI0NSwgMjMwXSxcbiAgICBcInJlZFwiOiBbMjU1LCAwLCAwXSxcbiAgICBcImZ1Y2hzaWFcIjogWzI1NSwgMCwgMjU1XSxcbiAgICBcIm1hZ2VudGFcIjogWzI1NSwgMCwgMjU1XSxcbiAgICBcImRlZXBwaW5rXCI6IFsyNTUsIDIwLCAxNDddLFxuICAgIFwib3JhbmdlcmVkXCI6IFsyNTUsIDY5LCAwXSxcbiAgICBcInRvbWF0b1wiOiBbMjU1LCA5OSwgNzFdLFxuICAgIFwiaG90cGlua1wiOiBbMjU1LCAxMDUsIDE4MF0sXG4gICAgXCJjb3JhbFwiOiBbMjU1LCAxMjcsIDgwXSxcbiAgICBcImRhcmtvcmFuZ2VcIjogWzI1NSwgMTQwLCAwXSxcbiAgICBcImxpZ2h0c2FsbW9uXCI6IFsyNTUsIDE2MCwgMTIyXSxcbiAgICBcIm9yYW5nZVwiOiBbMjU1LCAxNjUsIDBdLFxuICAgIFwibGlnaHRwaW5rXCI6IFsyNTUsIDE4MiwgMTkzXSxcbiAgICBcInBpbmtcIjogWzI1NSwgMTkyLCAyMDNdLFxuICAgIFwiZ29sZFwiOiBbMjU1LCAyMTUsIDBdLFxuICAgIFwicGVhY2hwdWZmXCI6IFsyNTUsIDIxOCwgMTg1XSxcbiAgICBcIm5hdmFqb3doaXRlXCI6IFsyNTUsIDIyMiwgMTczXSxcbiAgICBcIm1vY2Nhc2luXCI6IFsyNTUsIDIyOCwgMTgxXSxcbiAgICBcImJpc3F1ZVwiOiBbMjU1LCAyMjgsIDE5Nl0sXG4gICAgXCJtaXN0eXJvc2VcIjogWzI1NSwgMjI4LCAyMjVdLFxuICAgIFwiYmxhbmNoZWRhbG1vbmRcIjogWzI1NSwgMjM1LCAyMDVdLFxuICAgIFwicGFwYXlhd2hpcFwiOiBbMjU1LCAyMzksIDIxM10sXG4gICAgXCJsYXZlbmRlcmJsdXNoXCI6IFsyNTUsIDI0MCwgMjQ1XSxcbiAgICBcInNlYXNoZWxsXCI6IFsyNTUsIDI0NSwgMjM4XSxcbiAgICBcImNvcm5zaWxrXCI6IFsyNTUsIDI0OCwgMjIwXSxcbiAgICBcImxlbW9uY2hpZmZvblwiOiBbMjU1LCAyNTAsIDIwNV0sXG4gICAgXCJmbG9yYWx3aGl0ZVwiOiBbMjU1LCAyNTAsIDI0MF0sXG4gICAgXCJzbm93XCI6IFsyNTUsIDI1MCwgMjUwXSxcbiAgICBcInllbGxvd1wiOiBbMjU1LCAyNTUsIDBdLFxuICAgIFwibGlnaHR5ZWxsb3dcIjogWzI1NSwgMjU1LCAyMjRdLFxuICAgIFwiaXZvcnlcIjogWzI1NSwgMjU1LCAyNDBdLFxuICAgIFwid2hpdGVcIjogWzI1NSwgMjU1LCAyNTVdXG59O1xuIiwiLyoqIERlZmF1bHQgd2l0aCBmb3IgZGlzcGxheSBhbmQgbWFwIGdlbmVyYXRvcnMgKi9cbmV4cG9ydCBsZXQgREVGQVVMVF9XSURUSCA9IDgwO1xuLyoqIERlZmF1bHQgaGVpZ2h0IGZvciBkaXNwbGF5IGFuZCBtYXAgZ2VuZXJhdG9ycyAqL1xuZXhwb3J0IGxldCBERUZBVUxUX0hFSUdIVCA9IDI1O1xuZXhwb3J0IGNvbnN0IERJUlMgPSB7XG4gICAgNDogW1swLCAtMV0sIFsxLCAwXSwgWzAsIDFdLCBbLTEsIDBdXSxcbiAgICA4OiBbWzAsIC0xXSwgWzEsIC0xXSwgWzEsIDBdLCBbMSwgMV0sIFswLCAxXSwgWy0xLCAxXSwgWy0xLCAwXSwgWy0xLCAtMV1dLFxuICAgIDY6IFtbLTEsIC0xXSwgWzEsIC0xXSwgWzIsIDBdLCBbMSwgMV0sIFstMSwgMV0sIFstMiwgMF1dXG59O1xuZXhwb3J0IGNvbnN0IEtFWVMgPSB7XG4gICAgLyoqIENhbmNlbCBrZXkuICovXG4gICAgVktfQ0FOQ0VMOiAzLFxuICAgIC8qKiBIZWxwIGtleS4gKi9cbiAgICBWS19IRUxQOiA2LFxuICAgIC8qKiBCYWNrc3BhY2Uga2V5LiAqL1xuICAgIFZLX0JBQ0tfU1BBQ0U6IDgsXG4gICAgLyoqIFRhYiBrZXkuICovXG4gICAgVktfVEFCOiA5LFxuICAgIC8qKiA1IGtleSBvbiBOdW1wYWQgd2hlbiBOdW1Mb2NrIGlzIHVubG9ja2VkLiBPciBvbiBNYWMsIGNsZWFyIGtleSB3aGljaCBpcyBwb3NpdGlvbmVkIGF0IE51bUxvY2sga2V5LiAqL1xuICAgIFZLX0NMRUFSOiAxMixcbiAgICAvKiogUmV0dXJuL2VudGVyIGtleSBvbiB0aGUgbWFpbiBrZXlib2FyZC4gKi9cbiAgICBWS19SRVRVUk46IDEzLFxuICAgIC8qKiBSZXNlcnZlZCwgYnV0IG5vdCB1c2VkLiAqL1xuICAgIFZLX0VOVEVSOiAxNCxcbiAgICAvKiogU2hpZnQga2V5LiAqL1xuICAgIFZLX1NISUZUOiAxNixcbiAgICAvKiogQ29udHJvbCBrZXkuICovXG4gICAgVktfQ09OVFJPTDogMTcsXG4gICAgLyoqIEFsdCAoT3B0aW9uIG9uIE1hYykga2V5LiAqL1xuICAgIFZLX0FMVDogMTgsXG4gICAgLyoqIFBhdXNlIGtleS4gKi9cbiAgICBWS19QQVVTRTogMTksXG4gICAgLyoqIENhcHMgbG9jay4gKi9cbiAgICBWS19DQVBTX0xPQ0s6IDIwLFxuICAgIC8qKiBFc2NhcGUga2V5LiAqL1xuICAgIFZLX0VTQ0FQRTogMjcsXG4gICAgLyoqIFNwYWNlIGJhci4gKi9cbiAgICBWS19TUEFDRTogMzIsXG4gICAgLyoqIFBhZ2UgVXAga2V5LiAqL1xuICAgIFZLX1BBR0VfVVA6IDMzLFxuICAgIC8qKiBQYWdlIERvd24ga2V5LiAqL1xuICAgIFZLX1BBR0VfRE9XTjogMzQsXG4gICAgLyoqIEVuZCBrZXkuICovXG4gICAgVktfRU5EOiAzNSxcbiAgICAvKiogSG9tZSBrZXkuICovXG4gICAgVktfSE9NRTogMzYsXG4gICAgLyoqIExlZnQgYXJyb3cuICovXG4gICAgVktfTEVGVDogMzcsXG4gICAgLyoqIFVwIGFycm93LiAqL1xuICAgIFZLX1VQOiAzOCxcbiAgICAvKiogUmlnaHQgYXJyb3cuICovXG4gICAgVktfUklHSFQ6IDM5LFxuICAgIC8qKiBEb3duIGFycm93LiAqL1xuICAgIFZLX0RPV046IDQwLFxuICAgIC8qKiBQcmludCBTY3JlZW4ga2V5LiAqL1xuICAgIFZLX1BSSU5UU0NSRUVOOiA0NCxcbiAgICAvKiogSW5zKGVydCkga2V5LiAqL1xuICAgIFZLX0lOU0VSVDogNDUsXG4gICAgLyoqIERlbChldGUpIGtleS4gKi9cbiAgICBWS19ERUxFVEU6IDQ2LFxuICAgIC8qKiovXG4gICAgVktfMDogNDgsXG4gICAgLyoqKi9cbiAgICBWS18xOiA0OSxcbiAgICAvKioqL1xuICAgIFZLXzI6IDUwLFxuICAgIC8qKiovXG4gICAgVktfMzogNTEsXG4gICAgLyoqKi9cbiAgICBWS180OiA1MixcbiAgICAvKioqL1xuICAgIFZLXzU6IDUzLFxuICAgIC8qKiovXG4gICAgVktfNjogNTQsXG4gICAgLyoqKi9cbiAgICBWS183OiA1NSxcbiAgICAvKioqL1xuICAgIFZLXzg6IDU2LFxuICAgIC8qKiovXG4gICAgVktfOTogNTcsXG4gICAgLyoqIENvbG9uICg6KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19DT0xPTjogNTgsXG4gICAgLyoqIFNlbWljb2xvbiAoOykga2V5LiAqL1xuICAgIFZLX1NFTUlDT0xPTjogNTksXG4gICAgLyoqIExlc3MtdGhhbiAoPCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfTEVTU19USEFOOiA2MCxcbiAgICAvKiogRXF1YWxzICg9KSBrZXkuICovXG4gICAgVktfRVFVQUxTOiA2MSxcbiAgICAvKiogR3JlYXRlci10aGFuICg+KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19HUkVBVEVSX1RIQU46IDYyLFxuICAgIC8qKiBRdWVzdGlvbiBtYXJrICg/KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19RVUVTVElPTl9NQVJLOiA2MyxcbiAgICAvKiogQXRtYXJrIChAKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19BVDogNjQsXG4gICAgLyoqKi9cbiAgICBWS19BOiA2NSxcbiAgICAvKioqL1xuICAgIFZLX0I6IDY2LFxuICAgIC8qKiovXG4gICAgVktfQzogNjcsXG4gICAgLyoqKi9cbiAgICBWS19EOiA2OCxcbiAgICAvKioqL1xuICAgIFZLX0U6IDY5LFxuICAgIC8qKiovXG4gICAgVktfRjogNzAsXG4gICAgLyoqKi9cbiAgICBWS19HOiA3MSxcbiAgICAvKioqL1xuICAgIFZLX0g6IDcyLFxuICAgIC8qKiovXG4gICAgVktfSTogNzMsXG4gICAgLyoqKi9cbiAgICBWS19KOiA3NCxcbiAgICAvKioqL1xuICAgIFZLX0s6IDc1LFxuICAgIC8qKiovXG4gICAgVktfTDogNzYsXG4gICAgLyoqKi9cbiAgICBWS19NOiA3NyxcbiAgICAvKioqL1xuICAgIFZLX046IDc4LFxuICAgIC8qKiovXG4gICAgVktfTzogNzksXG4gICAgLyoqKi9cbiAgICBWS19QOiA4MCxcbiAgICAvKioqL1xuICAgIFZLX1E6IDgxLFxuICAgIC8qKiovXG4gICAgVktfUjogODIsXG4gICAgLyoqKi9cbiAgICBWS19TOiA4MyxcbiAgICAvKioqL1xuICAgIFZLX1Q6IDg0LFxuICAgIC8qKiovXG4gICAgVktfVTogODUsXG4gICAgLyoqKi9cbiAgICBWS19WOiA4NixcbiAgICAvKioqL1xuICAgIFZLX1c6IDg3LFxuICAgIC8qKiovXG4gICAgVktfWDogODgsXG4gICAgLyoqKi9cbiAgICBWS19ZOiA4OSxcbiAgICAvKioqL1xuICAgIFZLX1o6IDkwLFxuICAgIC8qKiovXG4gICAgVktfQ09OVEVYVF9NRU5VOiA5MyxcbiAgICAvKiogMCBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFEMDogOTYsXG4gICAgLyoqIDEgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDE6IDk3LFxuICAgIC8qKiAyIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQyOiA5OCxcbiAgICAvKiogMyBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFEMzogOTksXG4gICAgLyoqIDQgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDQ6IDEwMCxcbiAgICAvKiogNSBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFENTogMTAxLFxuICAgIC8qKiA2IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQ2OiAxMDIsXG4gICAgLyoqIDcgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDc6IDEwMyxcbiAgICAvKiogOCBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFEODogMTA0LFxuICAgIC8qKiA5IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQ5OiAxMDUsXG4gICAgLyoqICogb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX01VTFRJUExZOiAxMDYsXG4gICAgLyoqICsgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX0FERDogMTA3LFxuICAgIC8qKiovXG4gICAgVktfU0VQQVJBVE9SOiAxMDgsXG4gICAgLyoqIC0gb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX1NVQlRSQUNUOiAxMDksXG4gICAgLyoqIERlY2ltYWwgcG9pbnQgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX0RFQ0lNQUw6IDExMCxcbiAgICAvKiogLyBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfRElWSURFOiAxMTEsXG4gICAgLyoqIEYxIGtleS4gKi9cbiAgICBWS19GMTogMTEyLFxuICAgIC8qKiBGMiBrZXkuICovXG4gICAgVktfRjI6IDExMyxcbiAgICAvKiogRjMga2V5LiAqL1xuICAgIFZLX0YzOiAxMTQsXG4gICAgLyoqIEY0IGtleS4gKi9cbiAgICBWS19GNDogMTE1LFxuICAgIC8qKiBGNSBrZXkuICovXG4gICAgVktfRjU6IDExNixcbiAgICAvKiogRjYga2V5LiAqL1xuICAgIFZLX0Y2OiAxMTcsXG4gICAgLyoqIEY3IGtleS4gKi9cbiAgICBWS19GNzogMTE4LFxuICAgIC8qKiBGOCBrZXkuICovXG4gICAgVktfRjg6IDExOSxcbiAgICAvKiogRjkga2V5LiAqL1xuICAgIFZLX0Y5OiAxMjAsXG4gICAgLyoqIEYxMCBrZXkuICovXG4gICAgVktfRjEwOiAxMjEsXG4gICAgLyoqIEYxMSBrZXkuICovXG4gICAgVktfRjExOiAxMjIsXG4gICAgLyoqIEYxMiBrZXkuICovXG4gICAgVktfRjEyOiAxMjMsXG4gICAgLyoqIEYxMyBrZXkuICovXG4gICAgVktfRjEzOiAxMjQsXG4gICAgLyoqIEYxNCBrZXkuICovXG4gICAgVktfRjE0OiAxMjUsXG4gICAgLyoqIEYxNSBrZXkuICovXG4gICAgVktfRjE1OiAxMjYsXG4gICAgLyoqIEYxNiBrZXkuICovXG4gICAgVktfRjE2OiAxMjcsXG4gICAgLyoqIEYxNyBrZXkuICovXG4gICAgVktfRjE3OiAxMjgsXG4gICAgLyoqIEYxOCBrZXkuICovXG4gICAgVktfRjE4OiAxMjksXG4gICAgLyoqIEYxOSBrZXkuICovXG4gICAgVktfRjE5OiAxMzAsXG4gICAgLyoqIEYyMCBrZXkuICovXG4gICAgVktfRjIwOiAxMzEsXG4gICAgLyoqIEYyMSBrZXkuICovXG4gICAgVktfRjIxOiAxMzIsXG4gICAgLyoqIEYyMiBrZXkuICovXG4gICAgVktfRjIyOiAxMzMsXG4gICAgLyoqIEYyMyBrZXkuICovXG4gICAgVktfRjIzOiAxMzQsXG4gICAgLyoqIEYyNCBrZXkuICovXG4gICAgVktfRjI0OiAxMzUsXG4gICAgLyoqIE51bSBMb2NrIGtleS4gKi9cbiAgICBWS19OVU1fTE9DSzogMTQ0LFxuICAgIC8qKiBTY3JvbGwgTG9jayBrZXkuICovXG4gICAgVktfU0NST0xMX0xPQ0s6IDE0NSxcbiAgICAvKiogQ2lyY3VtZmxleCAoXikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQ0lSQ1VNRkxFWDogMTYwLFxuICAgIC8qKiBFeGNsYW1hdGlvbiAoISkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfRVhDTEFNQVRJT046IDE2MSxcbiAgICAvKiogRG91YmxlIHF1b3RlICgpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0RPVUJMRV9RVU9URTogMTYyLFxuICAgIC8qKiBIYXNoICgjKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19IQVNIOiAxNjMsXG4gICAgLyoqIERvbGxhciBzaWduICgkKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19ET0xMQVI6IDE2NCxcbiAgICAvKiogUGVyY2VudCAoJSkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfUEVSQ0VOVDogMTY1LFxuICAgIC8qKiBBbXBlcnNhbmQgKCYpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0FNUEVSU0FORDogMTY2LFxuICAgIC8qKiBVbmRlcnNjb3JlIChfKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19VTkRFUlNDT1JFOiAxNjcsXG4gICAgLyoqIE9wZW4gcGFyZW50aGVzaXMgKCgpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX09QRU5fUEFSRU46IDE2OCxcbiAgICAvKiogQ2xvc2UgcGFyZW50aGVzaXMgKCkpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0NMT1NFX1BBUkVOOiAxNjksXG4gICAgLyogQXN0ZXJpc2sgKCopIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0FTVEVSSVNLOiAxNzAsXG4gICAgLyoqIFBsdXMgKCspIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1BMVVM6IDE3MSxcbiAgICAvKiogUGlwZSAofCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfUElQRTogMTcyLFxuICAgIC8qKiBIeXBoZW4tVVMvZG9jcy9NaW51cyAoLSkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfSFlQSEVOX01JTlVTOiAxNzMsXG4gICAgLyoqIE9wZW4gY3VybHkgYnJhY2tldCAoeykga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfT1BFTl9DVVJMWV9CUkFDS0VUOiAxNzQsXG4gICAgLyoqIENsb3NlIGN1cmx5IGJyYWNrZXQgKH0pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0NMT1NFX0NVUkxZX0JSQUNLRVQ6IDE3NSxcbiAgICAvKiogVGlsZGUgKH4pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1RJTERFOiAxNzYsXG4gICAgLyoqIENvbW1hICgsKSBrZXkuICovXG4gICAgVktfQ09NTUE6IDE4OCxcbiAgICAvKiogUGVyaW9kICguKSBrZXkuICovXG4gICAgVktfUEVSSU9EOiAxOTAsXG4gICAgLyoqIFNsYXNoICgvKSBrZXkuICovXG4gICAgVktfU0xBU0g6IDE5MSxcbiAgICAvKiogQmFjayB0aWNrIChgKSBrZXkuICovXG4gICAgVktfQkFDS19RVU9URTogMTkyLFxuICAgIC8qKiBPcGVuIHNxdWFyZSBicmFja2V0IChbKSBrZXkuICovXG4gICAgVktfT1BFTl9CUkFDS0VUOiAyMTksXG4gICAgLyoqIEJhY2sgc2xhc2ggKFxcKSBrZXkuICovXG4gICAgVktfQkFDS19TTEFTSDogMjIwLFxuICAgIC8qKiBDbG9zZSBzcXVhcmUgYnJhY2tldCAoXSkga2V5LiAqL1xuICAgIFZLX0NMT1NFX0JSQUNLRVQ6IDIyMSxcbiAgICAvKiogUXVvdGUgKCcnJykga2V5LiAqL1xuICAgIFZLX1FVT1RFOiAyMjIsXG4gICAgLyoqIE1ldGEga2V5IG9uIExpbnV4LCBDb21tYW5kIGtleSBvbiBNYWMuICovXG4gICAgVktfTUVUQTogMjI0LFxuICAgIC8qKiBBbHRHciBrZXkgb24gTGludXguIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19BTFRHUjogMjI1LFxuICAgIC8qKiBXaW5kb3dzIGxvZ28ga2V5IG9uIFdpbmRvd3MuIE9yIFN1cGVyIG9yIEh5cGVyIGtleSBvbiBMaW51eC4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1dJTjogOTEsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0tBTkE6IDIxLFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19IQU5HVUw6IDIxLFxuICAgIC8qKiDoi7HmlbAga2V5IG9uIEphcGFuZXNlIE1hYyBrZXlib2FyZC4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0VJU1U6IDIyLFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19KVU5KQTogMjMsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0ZJTkFMOiAyNCxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfSEFOSkE6IDI1LFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19LQU5KSTogMjUsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0NPTlZFUlQ6IDI4LFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19OT05DT05WRVJUOiAyOSxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfQUNDRVBUOiAzMCxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfTU9ERUNIQU5HRTogMzEsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX1NFTEVDVDogNDEsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX1BSSU5UOiA0MixcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfRVhFQ1VURTogNDMsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLlx0ICovXG4gICAgVktfU0xFRVA6IDk1XG59O1xuIiwiLyoqXG4gKiBAY2xhc3MgQWJzdHJhY3QgZGlzcGxheSBiYWNrZW5kIG1vZHVsZVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFja2VuZCB7XG4gICAgZ2V0Q29udGFpbmVyKCkgeyByZXR1cm4gbnVsbDsgfVxuICAgIHNldE9wdGlvbnMob3B0aW9ucykgeyB0aGlzLl9vcHRpb25zID0gb3B0aW9uczsgfVxufVxuIiwiaW1wb3J0IEJhY2tlbmQgZnJvbSBcIi4vYmFja2VuZC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzIGV4dGVuZHMgQmFja2VuZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2N0eCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIH1cbiAgICBzY2hlZHVsZShjYikgeyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpOyB9XG4gICAgZ2V0Q29udGFpbmVyKCkgeyByZXR1cm4gdGhpcy5fY3R4LmNhbnZhczsgfVxuICAgIHNldE9wdGlvbnMob3B0cykge1xuICAgICAgICBzdXBlci5zZXRPcHRpb25zKG9wdHMpO1xuICAgICAgICBjb25zdCBzdHlsZSA9IChvcHRzLmZvbnRTdHlsZSA/IGAke29wdHMuZm9udFN0eWxlfSBgIDogYGApO1xuICAgICAgICBjb25zdCBmb250ID0gYCR7c3R5bGV9ICR7b3B0cy5mb250U2l6ZX1weCAke29wdHMuZm9udEZhbWlseX1gO1xuICAgICAgICB0aGlzLl9jdHguZm9udCA9IGZvbnQ7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcbiAgICAgICAgdGhpcy5fY3R4LmZvbnQgPSBmb250O1xuICAgICAgICB0aGlzLl9jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgdGhpcy5fY3R4LnRleHRCYXNlbGluZSA9IFwibWlkZGxlXCI7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gdGhpcy5fb3B0aW9ucy5iZztcbiAgICAgICAgdGhpcy5fY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMuX2N0eC5jYW52YXMud2lkdGgsIHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG4gICAgZXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuX2N0eC5jYW52YXM7XG4gICAgICAgIGxldCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB4IC09IHJlY3QubGVmdDtcbiAgICAgICAgeSAtPSByZWN0LnRvcDtcbiAgICAgICAgeCAqPSBjYW52YXMud2lkdGggLyByZWN0LndpZHRoO1xuICAgICAgICB5ICo9IGNhbnZhcy5oZWlnaHQgLyByZWN0LmhlaWdodDtcbiAgICAgICAgaWYgKHggPCAwIHx8IHkgPCAwIHx8IHggPj0gY2FudmFzLndpZHRoIHx8IHkgPj0gY2FudmFzLmhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIFstMSwgLTFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uKHgsIHkpO1xuICAgIH1cbn1cbiIsImltcG9ydCBIZXggZnJvbSBcIi4vaGV4LmpzXCI7XG5pbXBvcnQgUmVjdCBmcm9tIFwiLi9yZWN0LmpzXCI7XG5pbXBvcnQgVGlsZSBmcm9tIFwiLi90aWxlLmpzXCI7XG5pbXBvcnQgVGlsZUdMIGZyb20gXCIuL3RpbGUtZ2wuanNcIjtcbmltcG9ydCBUZXJtIGZyb20gXCIuL3Rlcm0uanNcIjtcbmltcG9ydCAqIGFzIFRleHQgZnJvbSBcIi4uL3RleHQuanNcIjtcbmltcG9ydCB7IERFRkFVTFRfV0lEVEgsIERFRkFVTFRfSEVJR0hUIH0gZnJvbSBcIi4uL2NvbnN0YW50cy5qc1wiO1xuY29uc3QgQkFDS0VORFMgPSB7XG4gICAgXCJoZXhcIjogSGV4LFxuICAgIFwicmVjdFwiOiBSZWN0LFxuICAgIFwidGlsZVwiOiBUaWxlLFxuICAgIFwidGlsZS1nbFwiOiBUaWxlR0wsXG4gICAgXCJ0ZXJtXCI6IFRlcm1cbn07XG5jb25zdCBERUZBVUxUX09QVElPTlMgPSB7XG4gICAgd2lkdGg6IERFRkFVTFRfV0lEVEgsXG4gICAgaGVpZ2h0OiBERUZBVUxUX0hFSUdIVCxcbiAgICB0cmFuc3Bvc2U6IGZhbHNlLFxuICAgIGxheW91dDogXCJyZWN0XCIsXG4gICAgZm9udFNpemU6IDE1LFxuICAgIHNwYWNpbmc6IDEsXG4gICAgYm9yZGVyOiAwLFxuICAgIGZvcmNlU3F1YXJlUmF0aW86IGZhbHNlLFxuICAgIGZvbnRGYW1pbHk6IFwibW9ub3NwYWNlXCIsXG4gICAgZm9udFN0eWxlOiBcIlwiLFxuICAgIGZnOiBcIiNjY2NcIixcbiAgICBiZzogXCIjMDAwXCIsXG4gICAgdGlsZVdpZHRoOiAzMixcbiAgICB0aWxlSGVpZ2h0OiAzMixcbiAgICB0aWxlTWFwOiB7fSxcbiAgICB0aWxlU2V0OiBudWxsLFxuICAgIHRpbGVDb2xvcml6ZTogZmFsc2Vcbn07XG4vKipcbiAqIEBjbGFzcyBWaXN1YWwgbWFwIGRpc3BsYXlcbiAqL1xubGV0IERpc3BsYXkgPSAvKiogQGNsYXNzICovICgoKSA9PiB7XG4gICAgY2xhc3MgRGlzcGxheSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgICAgICAgICAgdGhpcy5fZGlydHkgPSBmYWxzZTsgLy8gZmFsc2UgPSBub3RoaW5nLCB0cnVlID0gYWxsLCBvYmplY3QgPSBkaXJ0eSBjZWxsc1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUywgb3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLkRFQlVHID0gdGhpcy5ERUJVRy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fdGljayA9IHRoaXMuX3RpY2suYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX2JhY2tlbmQuc2NoZWR1bGUodGhpcy5fdGljayk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlYnVnIGhlbHBlciwgaWRlYWwgYXMgYSBtYXAgZ2VuZXJhdG9yIGNhbGxiYWNrLiBBbHdheXMgYm91bmQgdG8gdGhpcy5cbiAgICAgICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgICAgICogQHBhcmFtIHtpbnR9IHdoYXRcbiAgICAgICAgICovXG4gICAgICAgIERFQlVHKHgsIHksIHdoYXQpIHtcbiAgICAgICAgICAgIGxldCBjb2xvcnMgPSBbdGhpcy5fb3B0aW9ucy5iZywgdGhpcy5fb3B0aW9ucy5mZ107XG4gICAgICAgICAgICB0aGlzLmRyYXcoeCwgeSwgbnVsbCwgbnVsbCwgY29sb3JzW3doYXQgJSBjb2xvcnMubGVuZ3RoXSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFyIHRoZSB3aG9sZSBkaXNwbGF5IChjb3ZlciBpdCB3aXRoIGJhY2tncm91bmQgY29sb3IpXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhcigpIHtcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQHNlZSBST1QuRGlzcGxheVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMud2lkdGggfHwgb3B0aW9ucy5oZWlnaHQgfHwgb3B0aW9ucy5mb250U2l6ZSB8fCBvcHRpb25zLmZvbnRGYW1pbHkgfHwgb3B0aW9ucy5zcGFjaW5nIHx8IG9wdGlvbnMubGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdG9yID0gQkFDS0VORFNbb3B0aW9ucy5sYXlvdXRdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYWNrZW5kID0gbmV3IGN0b3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fYmFja2VuZC5zZXRPcHRpb25zKHRoaXMuX29wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIGN1cnJlbnRseSBzZXQgb3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgZ2V0T3B0aW9ucygpIHsgcmV0dXJuIHRoaXMuX29wdGlvbnM7IH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIERPTSBub2RlIG9mIHRoaXMgZGlzcGxheVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0Q29udGFpbmVyKCkgeyByZXR1cm4gdGhpcy5fYmFja2VuZC5nZXRDb250YWluZXIoKTsgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ29tcHV0ZSB0aGUgbWF4aW11bSB3aWR0aC9oZWlnaHQgdG8gZml0IGludG8gYSBzZXQgb2YgZ2l2ZW4gY29uc3RyYWludHNcbiAgICAgICAgICogQHBhcmFtIHtpbnR9IGF2YWlsV2lkdGggTWF4aW11bSBhbGxvd2VkIHBpeGVsIHdpZHRoXG4gICAgICAgICAqIEBwYXJhbSB7aW50fSBhdmFpbEhlaWdodCBNYXhpbXVtIGFsbG93ZWQgcGl4ZWwgaGVpZ2h0XG4gICAgICAgICAqIEByZXR1cm5zIHtpbnRbMl19IGNlbGxXaWR0aCxjZWxsSGVpZ2h0XG4gICAgICAgICAqL1xuICAgICAgICBjb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tlbmQuY29tcHV0ZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb21wdXRlIHRoZSBtYXhpbXVtIGZvbnQgc2l6ZSB0byBmaXQgaW50byBhIHNldCBvZiBnaXZlbiBjb25zdHJhaW50c1xuICAgICAgICAgKiBAcGFyYW0ge2ludH0gYXZhaWxXaWR0aCBNYXhpbXVtIGFsbG93ZWQgcGl4ZWwgd2lkdGhcbiAgICAgICAgICogQHBhcmFtIHtpbnR9IGF2YWlsSGVpZ2h0IE1heGltdW0gYWxsb3dlZCBwaXhlbCBoZWlnaHRcbiAgICAgICAgICogQHJldHVybnMge2ludH0gZm9udFNpemVcbiAgICAgICAgICovXG4gICAgICAgIGNvbXB1dGVGb250U2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tlbmQuY29tcHV0ZUZvbnRTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBjb21wdXRlVGlsZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IE1hdGguZmxvb3IoYXZhaWxXaWR0aCAvIHRoaXMuX29wdGlvbnMud2lkdGgpO1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9IE1hdGguZmxvb3IoYXZhaWxIZWlnaHQgLyB0aGlzLl9vcHRpb25zLmhlaWdodCk7XG4gICAgICAgICAgICByZXR1cm4gW3dpZHRoLCBoZWlnaHRdO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0IGEgRE9NIGV2ZW50IChtb3VzZSBvciB0b3VjaCkgdG8gbWFwIGNvb3JkaW5hdGVzLiBVc2VzIGZpcnN0IHRvdWNoIGZvciBtdWx0aS10b3VjaC5cbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZSBldmVudFxuICAgICAgICAgKiBAcmV0dXJucyB7aW50WzJdfSAtMSBmb3IgdmFsdWVzIG91dHNpZGUgb2YgdGhlIGNhbnZhc1xuICAgICAgICAgKi9cbiAgICAgICAgZXZlbnRUb1Bvc2l0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCB4LCB5O1xuICAgICAgICAgICAgaWYgKFwidG91Y2hlc1wiIGluIGUpIHtcbiAgICAgICAgICAgICAgICB4ID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgICAgICAgICAgICAgeSA9IGUudG91Y2hlc1swXS5jbGllbnRZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgeCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgICAgICB5ID0gZS5jbGllbnRZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tlbmQuZXZlbnRUb1Bvc2l0aW9uKHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZyB8fCBzdHJpbmdbXX0gY2ggT25lIG9yIG1vcmUgY2hhcnMgKHdpbGwgYmUgb3ZlcmxhcHBpbmcgdGhlbXNlbHZlcylcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IFtmZ10gZm9yZWdyb3VuZCBjb2xvclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2JnXSBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgICAgICAqL1xuICAgICAgICBkcmF3KHgsIHksIGNoLCBmZywgYmcpIHtcbiAgICAgICAgICAgIGlmICghZmcpIHtcbiAgICAgICAgICAgICAgICBmZyA9IHRoaXMuX29wdGlvbnMuZmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWJnKSB7XG4gICAgICAgICAgICAgICAgYmcgPSB0aGlzLl9vcHRpb25zLmJnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGtleSA9IGAke3h9LCR7eX1gO1xuICAgICAgICAgICAgdGhpcy5fZGF0YVtrZXldID0gW3gsIHksIGNoLCBmZywgYmddO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2RpcnR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSAvLyB3aWxsIGFscmVhZHkgcmVkcmF3IGV2ZXJ5dGhpbmcgXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2RpcnR5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlydHkgPSB7fTtcbiAgICAgICAgICAgIH0gLy8gZmlyc3QhXG4gICAgICAgICAgICB0aGlzLl9kaXJ0eVtrZXldID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmcgfHwgc3RyaW5nW119IGNoIE9uZSBvciBtb3JlIGNoYXJzICh3aWxsIGJlIG92ZXJsYXBwaW5nIHRoZW1zZWx2ZXMpXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nIHx8IG51bGx9IFtmZ10gZm9yZWdyb3VuZCBjb2xvclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZyB8fCBudWxsfSBbYmddIGJhY2tncm91bmQgY29sb3JcbiAgICAgICAgICovXG4gICAgICAgIGRyYXdPdmVyKHgsIHksIGNoLCBmZywgYmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke3h9LCR7eX1gO1xuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmcgPSB0aGlzLl9kYXRhW2tleV07XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZ1syXSA9IGNoIHx8IGV4aXN0aW5nWzJdO1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nWzNdID0gZmcgfHwgZXhpc3RpbmdbM107XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdbNF0gPSBiZyB8fCBleGlzdGluZ1s0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhdyh4LCB5LCBjaCwgZmcsIGJnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogRHJhd3MgYSB0ZXh0IGF0IGdpdmVuIHBvc2l0aW9uLiBPcHRpb25hbGx5IHdyYXBzIGF0IGEgbWF4aW11bSBsZW5ndGguIEN1cnJlbnRseSBkb2VzIG5vdCB3b3JrIHdpdGggaGV4IGxheW91dC5cbiAgICAgICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgTWF5IGNvbnRhaW4gY29sb3IvYmFja2dyb3VuZCBmb3JtYXQgc3BlY2lmaWVycywgJWN7bmFtZX0vJWJ7bmFtZX0sIGJvdGggb3B0aW9uYWwuICVje30vJWJ7fSByZXNldHMgdG8gZGVmYXVsdC5cbiAgICAgICAgICogQHBhcmFtIHtpbnR9IFttYXhXaWR0aF0gd3JhcCBhdCB3aGF0IHdpZHRoP1xuICAgICAgICAgKiBAcmV0dXJucyB7aW50fSBsaW5lcyBkcmF3blxuICAgICAgICAgKi9cbiAgICAgICAgZHJhd1RleHQoeCwgeSwgdGV4dCwgbWF4V2lkdGgpIHtcbiAgICAgICAgICAgIGxldCBmZyA9IG51bGw7XG4gICAgICAgICAgICBsZXQgYmcgPSBudWxsO1xuICAgICAgICAgICAgbGV0IGN4ID0geDtcbiAgICAgICAgICAgIGxldCBjeSA9IHk7XG4gICAgICAgICAgICBsZXQgbGluZXMgPSAxO1xuICAgICAgICAgICAgaWYgKCFtYXhXaWR0aCkge1xuICAgICAgICAgICAgICAgIG1heFdpZHRoID0gdGhpcy5fb3B0aW9ucy53aWR0aCAtIHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdG9rZW5zID0gVGV4dC50b2tlbml6ZSh0ZXh0LCBtYXhXaWR0aCk7XG4gICAgICAgICAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkgeyAvLyBpbnRlcnByZXQgdG9rZW5pemVkIG9wY29kZSBzdHJlYW1cbiAgICAgICAgICAgICAgICBsZXQgdG9rZW4gPSB0b2tlbnMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUZXh0LlRZUEVfVEVYVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpc1NwYWNlID0gZmFsc2UsIGlzUHJldlNwYWNlID0gZmFsc2UsIGlzRnVsbFdpZHRoID0gZmFsc2UsIGlzUHJldkZ1bGxXaWR0aCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbi52YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYyA9IHRva2VuLnZhbHVlLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGMgPSB0b2tlbi52YWx1ZS5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMubGF5b3V0ID09PSBcInRlcm1cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2NoID0gY2MgPj4gODtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzQ0pLID0gY2NoID09PSAweDExIHx8IChjY2ggPj0gMHgyZSAmJiBjY2ggPD0gMHg5ZikgfHwgKGNjaCA+PSAweGFjICYmIGNjaCA8PSAweGQ3KSB8fCAoY2MgPj0gMHhBOTYwICYmIGNjIDw9IDB4QTk3Rik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0NKSykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3KGN4ICsgMCwgY3ksIGMsIGZnLCBiZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXcoY3ggKyAxLCBjeSwgXCJcXHRcIiwgZmcsIGJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN4ICs9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBc3NpZ24gdG8gYHRydWVgIHdoZW4gdGhlIGN1cnJlbnQgY2hhciBpcyBmdWxsLXdpZHRoLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRnVsbFdpZHRoID0gKGNjID4gMHhmZjAwICYmIGNjIDwgMHhmZjYxKSB8fCAoY2MgPiAweGZmZGMgJiYgY2MgPCAweGZmZTgpIHx8IGNjID4gMHhmZmVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEN1cnJlbnQgY2hhciBpcyBzcGFjZSwgd2hhdGV2ZXIgZnVsbC13aWR0aCBvciBoYWxmLXdpZHRoIGJvdGggYXJlIE9LLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU3BhY2UgPSAoYy5jaGFyQ29kZUF0KDApID09IDB4MjAgfHwgYy5jaGFyQ29kZUF0KDApID09IDB4MzAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHByZXZpb3VzIGNoYXIgaXMgZnVsbC13aWR0aCBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjdXJyZW50IGNoYXIgaXMgbmV0aGVyIGhhbGYtd2lkdGggbm9yIGEgc3BhY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzUHJldkZ1bGxXaWR0aCAmJiAhaXNGdWxsV2lkdGggJiYgIWlzU3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3grKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IC8vIGFkZCBhbiBleHRyYSBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBjdXJyZW50IGNoYXIgaXMgZnVsbC13aWR0aCBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgcHJldmlvdXMgY2hhciBpcyBub3QgYSBzcGFjZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGdWxsV2lkdGggJiYgIWlzUHJldlNwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAvLyBhZGQgYW4gZXh0cmEgcG9zaXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXcoY3grKywgY3ksIGMsIGZnLCBiZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQcmV2U3BhY2UgPSBpc1NwYWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUHJldkZ1bGxXaWR0aCA9IGlzRnVsbFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVGV4dC5UWVBFX0ZHOlxuICAgICAgICAgICAgICAgICAgICAgICAgZmcgPSB0b2tlbi52YWx1ZSB8fCBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVGV4dC5UWVBFX0JHOlxuICAgICAgICAgICAgICAgICAgICAgICAgYmcgPSB0b2tlbi52YWx1ZSB8fCBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVGV4dC5UWVBFX05FV0xJTkU6XG4gICAgICAgICAgICAgICAgICAgICAgICBjeCA9IHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBjeSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsaW5lcztcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGltZXIgdGljazogdXBkYXRlIGRpcnR5IHBhcnRzXG4gICAgICAgICAqL1xuICAgICAgICBfdGljaygpIHtcbiAgICAgICAgICAgIHRoaXMuX2JhY2tlbmQuc2NoZWR1bGUodGhpcy5fdGljayk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2RpcnR5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2RpcnR5ID09PSB0cnVlKSB7IC8vIGRyYXcgYWxsXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFja2VuZC5jbGVhcigpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkIGluIHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZHJhdyhpZCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0gLy8gcmVkcmF3IGNhY2hlZCBkYXRhIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8vIGRyYXcgb25seSBkaXJ0eSBcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fZGlydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZHJhdyhrZXksIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgV2hhdCB0byBkcmF3XG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbH0gY2xlYXJCZWZvcmUgSXMgaXQgbmVjZXNzYXJ5IHRvIGNsZWFuIGJlZm9yZT9cbiAgICAgICAgICovXG4gICAgICAgIF9kcmF3KGtleSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5fZGF0YVtrZXldO1xuICAgICAgICAgICAgaWYgKGRhdGFbNF0gIT0gdGhpcy5fb3B0aW9ucy5iZykge1xuICAgICAgICAgICAgICAgIGNsZWFyQmVmb3JlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2JhY2tlbmQuZHJhdyhkYXRhLCBjbGVhckJlZm9yZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgRGlzcGxheS5SZWN0ID0gUmVjdDtcbiAgICBEaXNwbGF5LkhleCA9IEhleDtcbiAgICBEaXNwbGF5LlRpbGUgPSBUaWxlO1xuICAgIERpc3BsYXkuVGlsZUdMID0gVGlsZUdMO1xuICAgIERpc3BsYXkuVGVybSA9IFRlcm07XG4gICAgcmV0dXJuIERpc3BsYXk7XG59KSgpO1xuZXhwb3J0IGRlZmF1bHQgRGlzcGxheTtcbiIsImltcG9ydCBDYW52YXMgZnJvbSBcIi4vY2FudmFzLmpzXCI7XG5pbXBvcnQgeyBtb2QgfSBmcm9tIFwiLi4vdXRpbC5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgSGV4YWdvbmFsIGJhY2tlbmRcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhleCBleHRlbmRzIENhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3NwYWNpbmdYID0gMDtcbiAgICAgICAgdGhpcy5fc3BhY2luZ1kgPSAwO1xuICAgICAgICB0aGlzLl9oZXhTaXplID0gMDtcbiAgICB9XG4gICAgZHJhdyhkYXRhLCBjbGVhckJlZm9yZSkge1xuICAgICAgICBsZXQgW3gsIHksIGNoLCBmZywgYmddID0gZGF0YTtcbiAgICAgICAgbGV0IHB4ID0gW1xuICAgICAgICAgICAgKHggKyAxKSAqIHRoaXMuX3NwYWNpbmdYLFxuICAgICAgICAgICAgeSAqIHRoaXMuX3NwYWNpbmdZICsgdGhpcy5faGV4U2l6ZVxuICAgICAgICBdO1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50cmFuc3Bvc2UpIHtcbiAgICAgICAgICAgIHB4LnJldmVyc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBiZztcbiAgICAgICAgICAgIHRoaXMuX2ZpbGwocHhbMF0sIHB4WzFdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IGZnO1xuICAgICAgICBsZXQgY2hhcnMgPSBbXS5jb25jYXQoY2gpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFRleHQoY2hhcnNbaV0sIHB4WzBdLCBNYXRoLmNlaWwocHhbMV0pKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50cmFuc3Bvc2UpIHtcbiAgICAgICAgICAgIGF2YWlsV2lkdGggKz0gYXZhaWxIZWlnaHQ7XG4gICAgICAgICAgICBhdmFpbEhlaWdodCA9IGF2YWlsV2lkdGggLSBhdmFpbEhlaWdodDtcbiAgICAgICAgICAgIGF2YWlsV2lkdGggLT0gYXZhaWxIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fc3BhY2luZ1gpIC0gMTtcbiAgICAgICAgbGV0IGhlaWdodCA9IE1hdGguZmxvb3IoKGF2YWlsSGVpZ2h0IC0gMiAqIHRoaXMuX2hleFNpemUpIC8gdGhpcy5fc3BhY2luZ1kgKyAxKTtcbiAgICAgICAgcmV0dXJuIFt3aWR0aCwgaGVpZ2h0XTtcbiAgICB9XG4gICAgY29tcHV0ZUZvbnRTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRyYW5zcG9zZSkge1xuICAgICAgICAgICAgYXZhaWxXaWR0aCArPSBhdmFpbEhlaWdodDtcbiAgICAgICAgICAgIGF2YWlsSGVpZ2h0ID0gYXZhaWxXaWR0aCAtIGF2YWlsSGVpZ2h0O1xuICAgICAgICAgICAgYXZhaWxXaWR0aCAtPSBhdmFpbEhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaGV4U2l6ZVdpZHRoID0gMiAqIGF2YWlsV2lkdGggLyAoKHRoaXMuX29wdGlvbnMud2lkdGggKyAxKSAqIE1hdGguc3FydCgzKSkgLSAxO1xuICAgICAgICBsZXQgaGV4U2l6ZUhlaWdodCA9IGF2YWlsSGVpZ2h0IC8gKDIgKyAxLjUgKiAodGhpcy5fb3B0aW9ucy5oZWlnaHQgLSAxKSk7XG4gICAgICAgIGxldCBoZXhTaXplID0gTWF0aC5taW4oaGV4U2l6ZVdpZHRoLCBoZXhTaXplSGVpZ2h0KTtcbiAgICAgICAgLy8gY29tcHV0ZSBjaGFyIHJhdGlvXG4gICAgICAgIGxldCBvbGRGb250ID0gdGhpcy5fY3R4LmZvbnQ7XG4gICAgICAgIHRoaXMuX2N0eC5mb250ID0gXCIxMDBweCBcIiArIHRoaXMuX29wdGlvbnMuZm9udEZhbWlseTtcbiAgICAgICAgbGV0IHdpZHRoID0gTWF0aC5jZWlsKHRoaXMuX2N0eC5tZWFzdXJlVGV4dChcIldcIikud2lkdGgpO1xuICAgICAgICB0aGlzLl9jdHguZm9udCA9IG9sZEZvbnQ7XG4gICAgICAgIGxldCByYXRpbyA9IHdpZHRoIC8gMTAwO1xuICAgICAgICBoZXhTaXplID0gTWF0aC5mbG9vcihoZXhTaXplKSArIDE7IC8vIGNsb3Nlc3QgbGFyZ2VyIGhleFNpemVcbiAgICAgICAgLy8gRklYTUUgY2hhciBzaXplIGNvbXB1dGF0aW9uIGRvZXMgbm90IHJlc3BlY3QgdHJhbnNwb3NlZCBoZXhlc1xuICAgICAgICBsZXQgZm9udFNpemUgPSAyICogaGV4U2l6ZSAvICh0aGlzLl9vcHRpb25zLnNwYWNpbmcgKiAoMSArIHJhdGlvIC8gTWF0aC5zcXJ0KDMpKSk7XG4gICAgICAgIC8vIGNsb3Nlc3Qgc21hbGxlciBmb250U2l6ZVxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGZvbnRTaXplKSAtIDE7XG4gICAgfVxuICAgIF9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgICAgbGV0IG5vZGVTaXplO1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50cmFuc3Bvc2UpIHtcbiAgICAgICAgICAgIHggKz0geTtcbiAgICAgICAgICAgIHkgPSB4IC0geTtcbiAgICAgICAgICAgIHggLT0geTtcbiAgICAgICAgICAgIG5vZGVTaXplID0gdGhpcy5fY3R4LmNhbnZhcy53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vZGVTaXplID0gdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNpemUgPSBub2RlU2l6ZSAvIHRoaXMuX29wdGlvbnMuaGVpZ2h0O1xuICAgICAgICB5ID0gTWF0aC5mbG9vcih5IC8gc2l6ZSk7XG4gICAgICAgIGlmIChtb2QoeSwgMikpIHsgLyogb2RkIHJvdyAqL1xuICAgICAgICAgICAgeCAtPSB0aGlzLl9zcGFjaW5nWDtcbiAgICAgICAgICAgIHggPSAxICsgMiAqIE1hdGguZmxvb3IoeCAvICgyICogdGhpcy5fc3BhY2luZ1gpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHggPSAyICogTWF0aC5mbG9vcih4IC8gKDIgKiB0aGlzLl9zcGFjaW5nWCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbeCwgeV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFyZ3VtZW50cyBhcmUgcGl4ZWwgdmFsdWVzLiBJZiBcInRyYW5zcG9zZWRcIiBtb2RlIGlzIGVuYWJsZWQsIHRoZW4gdGhlc2UgdHdvIGFyZSBhbHJlYWR5IHN3YXBwZWQuXG4gICAgICovXG4gICAgX2ZpbGwoY3gsIGN5KSB7XG4gICAgICAgIGxldCBhID0gdGhpcy5faGV4U2l6ZTtcbiAgICAgICAgbGV0IGIgPSB0aGlzLl9vcHRpb25zLmJvcmRlcjtcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5fY3R4O1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRyYW5zcG9zZSkge1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyhjeCAtIGEgKyBiLCBjeSk7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4IC0gYSAvIDIgKyBiLCBjeSArIHRoaXMuX3NwYWNpbmdYIC0gYik7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4ICsgYSAvIDIgLSBiLCBjeSArIHRoaXMuX3NwYWNpbmdYIC0gYik7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4ICsgYSAtIGIsIGN5KTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggKyBhIC8gMiAtIGIsIGN5IC0gdGhpcy5fc3BhY2luZ1ggKyBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggLSBhIC8gMiArIGIsIGN5IC0gdGhpcy5fc3BhY2luZ1ggKyBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggLSBhICsgYiwgY3kpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyhjeCwgY3kgLSBhICsgYik7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4ICsgdGhpcy5fc3BhY2luZ1ggLSBiLCBjeSAtIGEgLyAyICsgYik7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4ICsgdGhpcy5fc3BhY2luZ1ggLSBiLCBjeSArIGEgLyAyIC0gYik7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4LCBjeSArIGEgLSBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggLSB0aGlzLl9zcGFjaW5nWCArIGIsIGN5ICsgYSAvIDIgLSBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggLSB0aGlzLl9zcGFjaW5nWCArIGIsIGN5IC0gYSAvIDIgKyBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3gsIGN5IC0gYSArIGIpO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxuICAgIF91cGRhdGVTaXplKCkge1xuICAgICAgICBjb25zdCBvcHRzID0gdGhpcy5fb3B0aW9ucztcbiAgICAgICAgY29uc3QgY2hhcldpZHRoID0gTWF0aC5jZWlsKHRoaXMuX2N0eC5tZWFzdXJlVGV4dChcIldcIikud2lkdGgpO1xuICAgICAgICB0aGlzLl9oZXhTaXplID0gTWF0aC5mbG9vcihvcHRzLnNwYWNpbmcgKiAob3B0cy5mb250U2l6ZSArIGNoYXJXaWR0aCAvIE1hdGguc3FydCgzKSkgLyAyKTtcbiAgICAgICAgdGhpcy5fc3BhY2luZ1ggPSB0aGlzLl9oZXhTaXplICogTWF0aC5zcXJ0KDMpIC8gMjtcbiAgICAgICAgdGhpcy5fc3BhY2luZ1kgPSB0aGlzLl9oZXhTaXplICogMS41O1xuICAgICAgICBsZXQgeHByb3A7XG4gICAgICAgIGxldCB5cHJvcDtcbiAgICAgICAgaWYgKG9wdHMudHJhbnNwb3NlKSB7XG4gICAgICAgICAgICB4cHJvcCA9IFwiaGVpZ2h0XCI7XG4gICAgICAgICAgICB5cHJvcCA9IFwid2lkdGhcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHhwcm9wID0gXCJ3aWR0aFwiO1xuICAgICAgICAgICAgeXByb3AgPSBcImhlaWdodFwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N0eC5jYW52YXNbeHByb3BdID0gTWF0aC5jZWlsKChvcHRzLndpZHRoICsgMSkgKiB0aGlzLl9zcGFjaW5nWCk7XG4gICAgICAgIHRoaXMuX2N0eC5jYW52YXNbeXByb3BdID0gTWF0aC5jZWlsKChvcHRzLmhlaWdodCAtIDEpICogdGhpcy5fc3BhY2luZ1kgKyAyICogdGhpcy5faGV4U2l6ZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENhbnZhcyBmcm9tIFwiLi9jYW52YXMuanNcIjtcbi8qKlxuICogQGNsYXNzIFJlY3Rhbmd1bGFyIGJhY2tlbmRcbiAqIEBwcml2YXRlXG4gKi9cbmxldCBSZWN0ID0gLyoqIEBjbGFzcyAqLyAoKCkgPT4ge1xuICAgIGNsYXNzIFJlY3QgZXh0ZW5kcyBDYW52YXMge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9zcGFjaW5nWCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9zcGFjaW5nWSA9IDA7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXNDYWNoZSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICAgICAgc3VwZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhc0NhY2hlID0ge307XG4gICAgICAgIH1cbiAgICAgICAgZHJhdyhkYXRhLCBjbGVhckJlZm9yZSkge1xuICAgICAgICAgICAgaWYgKFJlY3QuY2FjaGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kcmF3V2l0aENhY2hlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHJhd05vQ2FjaGUoZGF0YSwgY2xlYXJCZWZvcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9kcmF3V2l0aENhY2hlKGRhdGEpIHtcbiAgICAgICAgICAgIGxldCBbeCwgeSwgY2gsIGZnLCBiZ10gPSBkYXRhO1xuICAgICAgICAgICAgbGV0IGhhc2ggPSBcIlwiICsgY2ggKyBmZyArIGJnO1xuICAgICAgICAgICAgbGV0IGNhbnZhcztcbiAgICAgICAgICAgIGlmIChoYXNoIGluIHRoaXMuX2NhbnZhc0NhY2hlKSB7XG4gICAgICAgICAgICAgICAgY2FudmFzID0gdGhpcy5fY2FudmFzQ2FjaGVbaGFzaF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgYiA9IHRoaXMuX29wdGlvbnMuYm9yZGVyO1xuICAgICAgICAgICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy5fc3BhY2luZ1g7XG4gICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMuX3NwYWNpbmdZO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBiZztcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoYiwgYiwgY2FudmFzLndpZHRoIC0gYiwgY2FudmFzLmhlaWdodCAtIGIpO1xuICAgICAgICAgICAgICAgIGlmIChjaCkge1xuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gZmc7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5fY3R4LmZvbnQ7XG4gICAgICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICAgICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gXCJtaWRkbGVcIjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoYXJzID0gW10uY29uY2F0KGNoKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGNoYXJzW2ldLCB0aGlzLl9zcGFjaW5nWCAvIDIsIE1hdGguY2VpbCh0aGlzLl9zcGFjaW5nWSAvIDIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXNDYWNoZVtoYXNoXSA9IGNhbnZhcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2N0eC5kcmF3SW1hZ2UoY2FudmFzLCB4ICogdGhpcy5fc3BhY2luZ1gsIHkgKiB0aGlzLl9zcGFjaW5nWSk7XG4gICAgICAgIH1cbiAgICAgICAgX2RyYXdOb0NhY2hlKGRhdGEsIGNsZWFyQmVmb3JlKSB7XG4gICAgICAgICAgICBsZXQgW3gsIHksIGNoLCBmZywgYmddID0gZGF0YTtcbiAgICAgICAgICAgIGlmIChjbGVhckJlZm9yZSkge1xuICAgICAgICAgICAgICAgIGxldCBiID0gdGhpcy5fb3B0aW9ucy5ib3JkZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IGJnO1xuICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsUmVjdCh4ICogdGhpcy5fc3BhY2luZ1ggKyBiLCB5ICogdGhpcy5fc3BhY2luZ1kgKyBiLCB0aGlzLl9zcGFjaW5nWCAtIGIsIHRoaXMuX3NwYWNpbmdZIC0gYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IGZnO1xuICAgICAgICAgICAgbGV0IGNoYXJzID0gW10uY29uY2F0KGNoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdHguZmlsbFRleHQoY2hhcnNbaV0sICh4ICsgMC41KSAqIHRoaXMuX3NwYWNpbmdYLCBNYXRoLmNlaWwoKHkgKyAwLjUpICogdGhpcy5fc3BhY2luZ1kpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fc3BhY2luZ1gpO1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9IE1hdGguZmxvb3IoYXZhaWxIZWlnaHQgLyB0aGlzLl9zcGFjaW5nWSk7XG4gICAgICAgICAgICByZXR1cm4gW3dpZHRoLCBoZWlnaHRdO1xuICAgICAgICB9XG4gICAgICAgIGNvbXB1dGVGb250U2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICAgICAgbGV0IGJveFdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fb3B0aW9ucy53aWR0aCk7XG4gICAgICAgICAgICBsZXQgYm94SGVpZ2h0ID0gTWF0aC5mbG9vcihhdmFpbEhlaWdodCAvIHRoaXMuX29wdGlvbnMuaGVpZ2h0KTtcbiAgICAgICAgICAgIC8qIGNvbXB1dGUgY2hhciByYXRpbyAqL1xuICAgICAgICAgICAgbGV0IG9sZEZvbnQgPSB0aGlzLl9jdHguZm9udDtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5mb250ID0gXCIxMDBweCBcIiArIHRoaXMuX29wdGlvbnMuZm9udEZhbWlseTtcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IE1hdGguY2VpbCh0aGlzLl9jdHgubWVhc3VyZVRleHQoXCJXXCIpLndpZHRoKTtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5mb250ID0gb2xkRm9udDtcbiAgICAgICAgICAgIGxldCByYXRpbyA9IHdpZHRoIC8gMTAwO1xuICAgICAgICAgICAgbGV0IHdpZHRoRnJhY3Rpb24gPSByYXRpbyAqIGJveEhlaWdodCAvIGJveFdpZHRoO1xuICAgICAgICAgICAgaWYgKHdpZHRoRnJhY3Rpb24gPiAxKSB7IC8qIHRvbyB3aWRlIHdpdGggY3VycmVudCBhc3BlY3QgcmF0aW8gKi9cbiAgICAgICAgICAgICAgICBib3hIZWlnaHQgPSBNYXRoLmZsb29yKGJveEhlaWdodCAvIHdpZHRoRnJhY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoYm94SGVpZ2h0IC8gdGhpcy5fb3B0aW9ucy5zcGFjaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBfbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbih4LCB5KSB7XG4gICAgICAgICAgICByZXR1cm4gW01hdGguZmxvb3IoeCAvIHRoaXMuX3NwYWNpbmdYKSwgTWF0aC5mbG9vcih5IC8gdGhpcy5fc3BhY2luZ1kpXTtcbiAgICAgICAgfVxuICAgICAgICBfdXBkYXRlU2l6ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9vcHRpb25zO1xuICAgICAgICAgICAgY29uc3QgY2hhcldpZHRoID0gTWF0aC5jZWlsKHRoaXMuX2N0eC5tZWFzdXJlVGV4dChcIldcIikud2lkdGgpO1xuICAgICAgICAgICAgdGhpcy5fc3BhY2luZ1ggPSBNYXRoLmNlaWwob3B0cy5zcGFjaW5nICogY2hhcldpZHRoKTtcbiAgICAgICAgICAgIHRoaXMuX3NwYWNpbmdZID0gTWF0aC5jZWlsKG9wdHMuc3BhY2luZyAqIG9wdHMuZm9udFNpemUpO1xuICAgICAgICAgICAgaWYgKG9wdHMuZm9yY2VTcXVhcmVSYXRpbykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NwYWNpbmdYID0gdGhpcy5fc3BhY2luZ1kgPSBNYXRoLm1heCh0aGlzLl9zcGFjaW5nWCwgdGhpcy5fc3BhY2luZ1kpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY3R4LmNhbnZhcy53aWR0aCA9IG9wdHMud2lkdGggKiB0aGlzLl9zcGFjaW5nWDtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0ID0gb3B0cy5oZWlnaHQgKiB0aGlzLl9zcGFjaW5nWTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSZWN0LmNhY2hlID0gZmFsc2U7XG4gICAgcmV0dXJuIFJlY3Q7XG59KSgpO1xuZXhwb3J0IGRlZmF1bHQgUmVjdDtcbiIsImltcG9ydCBCYWNrZW5kIGZyb20gXCIuL2JhY2tlbmQuanNcIjtcbmltcG9ydCAqIGFzIENvbG9yIGZyb20gXCIuLi9jb2xvci5qc1wiO1xuZnVuY3Rpb24gY2xlYXJUb0Fuc2koYmcpIHtcbiAgICByZXR1cm4gYFxceDFiWzA7NDg7NTske3Rlcm1jb2xvcihiZyl9bVxceDFiWzJKYDtcbn1cbmZ1bmN0aW9uIGNvbG9yVG9BbnNpKGZnLCBiZykge1xuICAgIHJldHVybiBgXFx4MWJbMDszODs1OyR7dGVybWNvbG9yKGZnKX07NDg7NTske3Rlcm1jb2xvcihiZyl9bWA7XG59XG5mdW5jdGlvbiBwb3NpdGlvblRvQW5zaSh4LCB5KSB7XG4gICAgcmV0dXJuIGBcXHgxYlske3kgKyAxfTske3ggKyAxfUhgO1xufVxuZnVuY3Rpb24gdGVybWNvbG9yKGNvbG9yKSB7XG4gICAgY29uc3QgU1JDX0NPTE9SUyA9IDI1Ni4wO1xuICAgIGNvbnN0IERTVF9DT0xPUlMgPSA2LjA7XG4gICAgY29uc3QgQ09MT1JfUkFUSU8gPSBEU1RfQ09MT1JTIC8gU1JDX0NPTE9SUztcbiAgICBsZXQgcmdiID0gQ29sb3IuZnJvbVN0cmluZyhjb2xvcik7XG4gICAgbGV0IHIgPSBNYXRoLmZsb29yKHJnYlswXSAqIENPTE9SX1JBVElPKTtcbiAgICBsZXQgZyA9IE1hdGguZmxvb3IocmdiWzFdICogQ09MT1JfUkFUSU8pO1xuICAgIGxldCBiID0gTWF0aC5mbG9vcihyZ2JbMl0gKiBDT0xPUl9SQVRJTyk7XG4gICAgcmV0dXJuIHIgKiAzNiArIGcgKiA2ICsgYiAqIDEgKyAxNjtcbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlcm0gZXh0ZW5kcyBCYWNrZW5kIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0gWzAsIDBdO1xuICAgICAgICB0aGlzLl9jdXJzb3IgPSBbLTEsIC0xXTtcbiAgICAgICAgdGhpcy5fbGFzdENvbG9yID0gXCJcIjtcbiAgICB9XG4gICAgc2NoZWR1bGUoY2IpIHsgc2V0VGltZW91dChjYiwgMTAwMCAvIDYwKTsgfVxuICAgIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBzdXBlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICBsZXQgc2l6ZSA9IFtvcHRpb25zLndpZHRoLCBvcHRpb25zLmhlaWdodF07XG4gICAgICAgIGxldCBhdmFpbCA9IHRoaXMuY29tcHV0ZVNpemUoKTtcbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0gYXZhaWwubWFwKCh2YWwsIGluZGV4KSA9PiBNYXRoLmZsb29yKCh2YWwgLSBzaXplW2luZGV4XSkgLyAyKSk7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShjbGVhclRvQW5zaSh0aGlzLl9vcHRpb25zLmJnKSk7XG4gICAgfVxuICAgIGRyYXcoZGF0YSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgLy8gZGV0ZXJtaW5lIHdoZXJlIHRvIGRyYXcgd2hhdCB3aXRoIHdoYXQgY29sb3JzXG4gICAgICAgIGxldCBbeCwgeSwgY2gsIGZnLCBiZ10gPSBkYXRhO1xuICAgICAgICAvLyBkZXRlcm1pbmUgaWYgd2UgbmVlZCB0byBtb3ZlIHRoZSB0ZXJtaW5hbCBjdXJzb3JcbiAgICAgICAgbGV0IGR4ID0gdGhpcy5fb2Zmc2V0WzBdICsgeDtcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5fb2Zmc2V0WzFdICsgeTtcbiAgICAgICAgbGV0IHNpemUgPSB0aGlzLmNvbXB1dGVTaXplKCk7XG4gICAgICAgIGlmIChkeCA8IDAgfHwgZHggPj0gc2l6ZVswXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkeSA8IDAgfHwgZHkgPj0gc2l6ZVsxXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkeCAhPT0gdGhpcy5fY3Vyc29yWzBdIHx8IGR5ICE9PSB0aGlzLl9jdXJzb3JbMV0pIHtcbiAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHBvc2l0aW9uVG9BbnNpKGR4LCBkeSkpO1xuICAgICAgICAgICAgdGhpcy5fY3Vyc29yWzBdID0gZHg7XG4gICAgICAgICAgICB0aGlzLl9jdXJzb3JbMV0gPSBkeTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0ZXJtaW5hbHMgYXV0b21hdGljYWxseSBjbGVhciwgYnV0IGlmIHdlJ3JlIGNsZWFyaW5nIHdoZW4gd2UncmVcbiAgICAgICAgLy8gbm90IG90aGVyd2lzZSBwcm92aWRlZCB3aXRoIGEgY2hhcmFjdGVyLCBqdXN0IHVzZSBhIHNwYWNlIGluc3RlYWRcbiAgICAgICAgaWYgKGNsZWFyQmVmb3JlKSB7XG4gICAgICAgICAgICBpZiAoIWNoKSB7XG4gICAgICAgICAgICAgICAgY2ggPSBcIiBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB3ZSdyZSBub3QgY2xlYXJpbmcgYW5kIG5vdCBwcm92aWRlZCB3aXRoIGEgY2hhcmFjdGVyLCBkbyBub3RoaW5nXG4gICAgICAgIGlmICghY2gpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBkZXRlcm1pbmUgaWYgd2UgbmVlZCB0byBjaGFuZ2UgY29sb3JzXG4gICAgICAgIGxldCBuZXdDb2xvciA9IGNvbG9yVG9BbnNpKGZnLCBiZyk7XG4gICAgICAgIGlmIChuZXdDb2xvciAhPT0gdGhpcy5fbGFzdENvbG9yKSB7XG4gICAgICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShuZXdDb2xvcik7XG4gICAgICAgICAgICB0aGlzLl9sYXN0Q29sb3IgPSBuZXdDb2xvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2ggIT0gJ1xcdCcpIHtcbiAgICAgICAgICAgIC8vIHdyaXRlIHRoZSBwcm92aWRlZCBzeW1ib2wgdG8gdGhlIGRpc3BsYXlcbiAgICAgICAgICAgIGxldCBjaGFycyA9IFtdLmNvbmNhdChjaCk7XG4gICAgICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShjaGFyc1swXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXBkYXRlIG91ciBwb3NpdGlvbiwgZ2l2ZW4gdGhhdCB3ZSB3cm90ZSBhIGNoYXJhY3RlclxuICAgICAgICB0aGlzLl9jdXJzb3JbMF0rKztcbiAgICAgICAgaWYgKHRoaXMuX2N1cnNvclswXSA+PSBzaXplWzBdKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJzb3JbMF0gPSAwO1xuICAgICAgICAgICAgdGhpcy5fY3Vyc29yWzFdKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcHV0ZUZvbnRTaXplKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJUZXJtaW5hbCBiYWNrZW5kIGhhcyBubyBub3Rpb24gb2YgZm9udCBzaXplXCIpOyB9XG4gICAgZXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHsgcmV0dXJuIFt4LCB5XTsgfVxuICAgIGNvbXB1dGVTaXplKCkgeyByZXR1cm4gW3Byb2Nlc3Muc3Rkb3V0LmNvbHVtbnMsIHByb2Nlc3Muc3Rkb3V0LnJvd3NdOyB9XG59XG4iLCJpbXBvcnQgQmFja2VuZCBmcm9tIFwiLi9iYWNrZW5kLmpzXCI7XG5pbXBvcnQgKiBhcyBDb2xvciBmcm9tIFwiLi4vY29sb3IuanNcIjtcbi8qKlxuICogQGNsYXNzIFRpbGUgYmFja2VuZFxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsZUdMIGV4dGVuZHMgQmFja2VuZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3VuaWZvcm1zID0ge307XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLl9nbCA9IHRoaXMuX2luaXRXZWJHTCgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBhbGVydChlLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBpc1N1cHBvcnRlZCgpIHtcbiAgICAgICAgcmV0dXJuICEhZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwid2ViZ2wyXCIsIHsgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0cnVlIH0pO1xuICAgIH1cbiAgICBzY2hlZHVsZShjYikgeyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpOyB9XG4gICAgZ2V0Q29udGFpbmVyKCkgeyByZXR1cm4gdGhpcy5fZ2wuY2FudmFzOyB9XG4gICAgc2V0T3B0aW9ucyhvcHRzKSB7XG4gICAgICAgIHN1cGVyLnNldE9wdGlvbnMob3B0cyk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcbiAgICAgICAgbGV0IHRpbGVTZXQgPSB0aGlzLl9vcHRpb25zLnRpbGVTZXQ7XG4gICAgICAgIGlmICh0aWxlU2V0ICYmIFwiY29tcGxldGVcIiBpbiB0aWxlU2V0ICYmICF0aWxlU2V0LmNvbXBsZXRlKSB7XG4gICAgICAgICAgICB0aWxlU2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHRoaXMuX3VwZGF0ZVRleHR1cmUodGlsZVNldCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVGV4dHVyZSh0aWxlU2V0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkcmF3KGRhdGEsIGNsZWFyQmVmb3JlKSB7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9vcHRpb25zO1xuICAgICAgICBsZXQgW3gsIHksIGNoLCBmZywgYmddID0gZGF0YTtcbiAgICAgICAgbGV0IHNjaXNzb3JZID0gZ2wuY2FudmFzLmhlaWdodCAtICh5ICsgMSkgKiBvcHRzLnRpbGVIZWlnaHQ7XG4gICAgICAgIGdsLnNjaXNzb3IoeCAqIG9wdHMudGlsZVdpZHRoLCBzY2lzc29yWSwgb3B0cy50aWxlV2lkdGgsIG9wdHMudGlsZUhlaWdodCk7XG4gICAgICAgIGlmIChjbGVhckJlZm9yZSkge1xuICAgICAgICAgICAgaWYgKG9wdHMudGlsZUNvbG9yaXplKSB7XG4gICAgICAgICAgICAgICAgZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdsLmNsZWFyQ29sb3IoLi4ucGFyc2VDb2xvcihiZykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjaCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjaGFycyA9IFtdLmNvbmNhdChjaCk7XG4gICAgICAgIGxldCBiZ3MgPSBbXS5jb25jYXQoYmcpO1xuICAgICAgICBsZXQgZmdzID0gW10uY29uY2F0KGZnKTtcbiAgICAgICAgZ2wudW5pZm9ybTJmdih0aGlzLl91bmlmb3Jtc1tcInRhcmdldFBvc1JlbFwiXSwgW3gsIHldKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHRpbGUgPSB0aGlzLl9vcHRpb25zLnRpbGVNYXBbY2hhcnNbaV1dO1xuICAgICAgICAgICAgaWYgKCF0aWxlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGFyIFwiJHtjaGFyc1tpXX1cIiBub3QgZm91bmQgaW4gdGlsZU1hcGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2wudW5pZm9ybTFmKHRoaXMuX3VuaWZvcm1zW1wiY29sb3JpemVcIl0sIG9wdHMudGlsZUNvbG9yaXplID8gMSA6IDApO1xuICAgICAgICAgICAgZ2wudW5pZm9ybTJmdih0aGlzLl91bmlmb3Jtc1tcInRpbGVzZXRQb3NBYnNcIl0sIHRpbGUpO1xuICAgICAgICAgICAgaWYgKG9wdHMudGlsZUNvbG9yaXplKSB7XG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTRmdih0aGlzLl91bmlmb3Jtc1tcInRpbnRcIl0sIHBhcnNlQ29sb3IoZmdzW2ldKSk7XG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTRmdih0aGlzLl91bmlmb3Jtc1tcImJnXCJdLCBwYXJzZUNvbG9yKGJnc1tpXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRV9TVFJJUCwgMCwgNCk7XG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPGNoYXJzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRpbGVDb2xvcml6ZSkgeyAvLyBhcHBseSBjb2xvcml6YXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYW52YXMgPSB0aGlzLl9jb2xvckNhbnZhcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLW92ZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZnID0gZmdzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnID0gYmdzW2ldO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMudGlsZVNldCEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsZVswXSwgdGlsZVsxXSwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmcgIT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLWF0b3BcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJnICE9IFwidHJhbnNwYXJlbnRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImRlc3RpbmF0aW9uLW92ZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3R4LmRyYXdJbWFnZShjYW52YXMsIHgqdGlsZVdpZHRoLCB5KnRpbGVIZWlnaHQsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIG5vIGNvbG9yaXppbmcsIGVhc3lcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy50aWxlU2V0ISxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWxlWzBdLCB0aWxlWzFdLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeCp0aWxlV2lkdGgsIHkqdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgKi9cbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgICAgIGdsLmNsZWFyQ29sb3IoLi4ucGFyc2VDb2xvcih0aGlzLl9vcHRpb25zLmJnKSk7XG4gICAgICAgIGdsLnNjaXNzb3IoMCwgMCwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XG4gICAgfVxuICAgIGNvbXB1dGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgIGxldCB3aWR0aCA9IE1hdGguZmxvb3IoYXZhaWxXaWR0aCAvIHRoaXMuX29wdGlvbnMudGlsZVdpZHRoKTtcbiAgICAgICAgbGV0IGhlaWdodCA9IE1hdGguZmxvb3IoYXZhaWxIZWlnaHQgLyB0aGlzLl9vcHRpb25zLnRpbGVIZWlnaHQpO1xuICAgICAgICByZXR1cm4gW3dpZHRoLCBoZWlnaHRdO1xuICAgIH1cbiAgICBjb21wdXRlRm9udFNpemUoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRpbGUgYmFja2VuZCBkb2VzIG5vdCB1bmRlcnN0YW5kIGZvbnQgc2l6ZVwiKTtcbiAgICB9XG4gICAgZXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuX2dsLmNhbnZhcztcbiAgICAgICAgbGV0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHggLT0gcmVjdC5sZWZ0O1xuICAgICAgICB5IC09IHJlY3QudG9wO1xuICAgICAgICB4ICo9IGNhbnZhcy53aWR0aCAvIHJlY3Qud2lkdGg7XG4gICAgICAgIHkgKj0gY2FudmFzLmhlaWdodCAvIHJlY3QuaGVpZ2h0O1xuICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSBjYW52YXMud2lkdGggfHwgeSA+PSBjYW52YXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gWy0xLCAtMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24oeCwgeSk7XG4gICAgfVxuICAgIF9pbml0V2ViR0woKSB7XG4gICAgICAgIGxldCBnbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIndlYmdsMlwiLCB7IHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogdHJ1ZSB9KTtcbiAgICAgICAgd2luZG93LmdsID0gZ2w7XG4gICAgICAgIGxldCBwcm9ncmFtID0gY3JlYXRlUHJvZ3JhbShnbCwgVlMsIEZTKTtcbiAgICAgICAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcbiAgICAgICAgY3JlYXRlUXVhZChnbCk7XG4gICAgICAgIFVOSUZPUk1TLmZvckVhY2gobmFtZSA9PiB0aGlzLl91bmlmb3Jtc1tuYW1lXSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBuYW1lKSk7XG4gICAgICAgIHRoaXMuX3Byb2dyYW0gPSBwcm9ncmFtO1xuICAgICAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgICAgICBnbC5ibGVuZEZ1bmNTZXBhcmF0ZShnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEsIGdsLk9ORSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gICAgICAgIGdsLmVuYWJsZShnbC5TQ0lTU09SX1RFU1QpO1xuICAgICAgICByZXR1cm4gZ2w7XG4gICAgfVxuICAgIF9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIFtNYXRoLmZsb29yKHggLyB0aGlzLl9vcHRpb25zLnRpbGVXaWR0aCksIE1hdGguZmxvb3IoeSAvIHRoaXMuX29wdGlvbnMudGlsZUhlaWdodCldO1xuICAgIH1cbiAgICBfdXBkYXRlU2l6ZSgpIHtcbiAgICAgICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcbiAgICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX29wdGlvbnM7XG4gICAgICAgIGNvbnN0IGNhbnZhc1NpemUgPSBbb3B0cy53aWR0aCAqIG9wdHMudGlsZVdpZHRoLCBvcHRzLmhlaWdodCAqIG9wdHMudGlsZUhlaWdodF07XG4gICAgICAgIGdsLmNhbnZhcy53aWR0aCA9IGNhbnZhc1NpemVbMF07XG4gICAgICAgIGdsLmNhbnZhcy5oZWlnaHQgPSBjYW52YXNTaXplWzFdO1xuICAgICAgICBnbC52aWV3cG9ydCgwLCAwLCBjYW52YXNTaXplWzBdLCBjYW52YXNTaXplWzFdKTtcbiAgICAgICAgZ2wudW5pZm9ybTJmdih0aGlzLl91bmlmb3Jtc1tcInRpbGVTaXplXCJdLCBbb3B0cy50aWxlV2lkdGgsIG9wdHMudGlsZUhlaWdodF0pO1xuICAgICAgICBnbC51bmlmb3JtMmZ2KHRoaXMuX3VuaWZvcm1zW1widGFyZ2V0U2l6ZVwiXSwgY2FudmFzU2l6ZSk7XG4gICAgfVxuICAgIF91cGRhdGVUZXh0dXJlKHRpbGVTZXQpIHtcbiAgICAgICAgY3JlYXRlVGV4dHVyZSh0aGlzLl9nbCwgdGlsZVNldCk7XG4gICAgfVxufVxuY29uc3QgVU5JRk9STVMgPSBbXCJ0YXJnZXRQb3NSZWxcIiwgXCJ0aWxlc2V0UG9zQWJzXCIsIFwidGlsZVNpemVcIiwgXCJ0YXJnZXRTaXplXCIsIFwiY29sb3JpemVcIiwgXCJiZ1wiLCBcInRpbnRcIl07XG5jb25zdCBWUyA9IGBcbiN2ZXJzaW9uIDMwMCBlc1xuXG5pbiB2ZWMyIHRpbGVQb3NSZWw7XG5vdXQgdmVjMiB0aWxlc2V0UG9zUHg7XG5cbnVuaWZvcm0gdmVjMiB0aWxlc2V0UG9zQWJzO1xudW5pZm9ybSB2ZWMyIHRpbGVTaXplO1xudW5pZm9ybSB2ZWMyIHRhcmdldFNpemU7XG51bmlmb3JtIHZlYzIgdGFyZ2V0UG9zUmVsO1xuXG52b2lkIG1haW4oKSB7XG5cdHZlYzIgdGFyZ2V0UG9zUHggPSAodGFyZ2V0UG9zUmVsICsgdGlsZVBvc1JlbCkgKiB0aWxlU2l6ZTtcblx0dmVjMiB0YXJnZXRQb3NOZGMgPSAoKHRhcmdldFBvc1B4IC8gdGFyZ2V0U2l6ZSktMC41KSoyLjA7XG5cdHRhcmdldFBvc05kYy55ICo9IC0xLjA7XG5cblx0Z2xfUG9zaXRpb24gPSB2ZWM0KHRhcmdldFBvc05kYywgMC4wLCAxLjApO1xuXHR0aWxlc2V0UG9zUHggPSB0aWxlc2V0UG9zQWJzICsgdGlsZVBvc1JlbCAqIHRpbGVTaXplO1xufWAudHJpbSgpO1xuY29uc3QgRlMgPSBgXG4jdmVyc2lvbiAzMDAgZXNcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcblxuaW4gdmVjMiB0aWxlc2V0UG9zUHg7XG5vdXQgdmVjNCBmcmFnQ29sb3I7XG51bmlmb3JtIHNhbXBsZXIyRCBpbWFnZTtcbnVuaWZvcm0gYm9vbCBjb2xvcml6ZTtcbnVuaWZvcm0gdmVjNCBiZztcbnVuaWZvcm0gdmVjNCB0aW50O1xuXG52b2lkIG1haW4oKSB7XG5cdGZyYWdDb2xvciA9IHZlYzQoMCwgMCwgMCwgMSk7XG5cblx0dmVjNCB0ZXhlbCA9IHRleGVsRmV0Y2goaW1hZ2UsIGl2ZWMyKHRpbGVzZXRQb3NQeCksIDApO1xuXG5cdGlmIChjb2xvcml6ZSkge1xuXHRcdHRleGVsLnJnYiA9IHRpbnQuYSAqIHRpbnQucmdiICsgKDEuMC10aW50LmEpICogdGV4ZWwucmdiO1xuXHRcdGZyYWdDb2xvci5yZ2IgPSB0ZXhlbC5hKnRleGVsLnJnYiArICgxLjAtdGV4ZWwuYSkqYmcucmdiO1xuXHRcdGZyYWdDb2xvci5hID0gdGV4ZWwuYSArICgxLjAtdGV4ZWwuYSkqYmcuYTtcblx0fSBlbHNlIHtcblx0XHRmcmFnQ29sb3IgPSB0ZXhlbDtcblx0fVxufWAudHJpbSgpO1xuZnVuY3Rpb24gY3JlYXRlUHJvZ3JhbShnbCwgdnNzLCBmc3MpIHtcbiAgICBjb25zdCB2cyA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UodnMsIHZzcyk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcih2cyk7XG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodnMsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyh2cykgfHwgXCJcIik7XG4gICAgfVxuICAgIGNvbnN0IGZzID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XG4gICAgZ2wuc2hhZGVyU291cmNlKGZzLCBmc3MpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoZnMpO1xuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKGZzLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFNoYWRlckluZm9Mb2coZnMpIHx8IFwiXCIpO1xuICAgIH1cbiAgICBjb25zdCBwID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwLCB2cyk7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHAsIGZzKTtcbiAgICBnbC5saW5rUHJvZ3JhbShwKTtcbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocCwgZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihnbC5nZXRQcm9ncmFtSW5mb0xvZyhwKSB8fCBcIlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG59XG5mdW5jdGlvbiBjcmVhdGVRdWFkKGdsKSB7XG4gICAgY29uc3QgcG9zID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMSwgMCwgMCwgMSwgMSwgMV0pO1xuICAgIGNvbnN0IGJ1ZiA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWYpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBwb3MsIGdsLlNUQVRJQ19EUkFXKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSgwKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKDAsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG59XG5mdW5jdGlvbiBjcmVhdGVUZXh0dXJlKGdsLCBkYXRhKSB7XG4gICAgbGV0IHQgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5SRVBFQVQpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLlJFUEVBVCk7XG4gICAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgMCk7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBkYXRhKTtcbiAgICByZXR1cm4gdDtcbn1cbmxldCBjb2xvckNhY2hlID0ge307XG5mdW5jdGlvbiBwYXJzZUNvbG9yKGNvbG9yKSB7XG4gICAgaWYgKCEoY29sb3IgaW4gY29sb3JDYWNoZSkpIHtcbiAgICAgICAgbGV0IHBhcnNlZDtcbiAgICAgICAgaWYgKGNvbG9yID09IFwidHJhbnNwYXJlbnRcIikge1xuICAgICAgICAgICAgcGFyc2VkID0gWzAsIDAsIDAsIDBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbG9yLmluZGV4T2YoXCJyZ2JhXCIpID4gLTEpIHtcbiAgICAgICAgICAgIHBhcnNlZCA9IChjb2xvci5tYXRjaCgvW1xcZC5dKy9nKSB8fCBbXSkubWFwKE51bWJlcik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgICAgIHBhcnNlZFtpXSA9IHBhcnNlZFtpXSAvIDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlZCA9IENvbG9yLmZyb21TdHJpbmcoY29sb3IpLm1hcCgkID0+ICQgLyAyNTUpO1xuICAgICAgICAgICAgcGFyc2VkLnB1c2goMSk7XG4gICAgICAgIH1cbiAgICAgICAgY29sb3JDYWNoZVtjb2xvcl0gPSBwYXJzZWQ7XG4gICAgfVxuICAgIHJldHVybiBjb2xvckNhY2hlW2NvbG9yXTtcbn1cbiIsImltcG9ydCBDYW52YXMgZnJvbSBcIi4vY2FudmFzLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBUaWxlIGJhY2tlbmRcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbGUgZXh0ZW5kcyBDYW52YXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9jb2xvckNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgfVxuICAgIGRyYXcoZGF0YSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgbGV0IFt4LCB5LCBjaCwgZmcsIGJnXSA9IGRhdGE7XG4gICAgICAgIGxldCB0aWxlV2lkdGggPSB0aGlzLl9vcHRpb25zLnRpbGVXaWR0aDtcbiAgICAgICAgbGV0IHRpbGVIZWlnaHQgPSB0aGlzLl9vcHRpb25zLnRpbGVIZWlnaHQ7XG4gICAgICAgIGlmIChjbGVhckJlZm9yZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudGlsZUNvbG9yaXplKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LmNsZWFyUmVjdCh4ICogdGlsZVdpZHRoLCB5ICogdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBiZztcbiAgICAgICAgICAgICAgICB0aGlzLl9jdHguZmlsbFJlY3QoeCAqIHRpbGVXaWR0aCwgeSAqIHRpbGVIZWlnaHQsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjaCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjaGFycyA9IFtdLmNvbmNhdChjaCk7XG4gICAgICAgIGxldCBmZ3MgPSBbXS5jb25jYXQoZmcpO1xuICAgICAgICBsZXQgYmdzID0gW10uY29uY2F0KGJnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHRpbGUgPSB0aGlzLl9vcHRpb25zLnRpbGVNYXBbY2hhcnNbaV1dO1xuICAgICAgICAgICAgaWYgKCF0aWxlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGFyIFwiJHtjaGFyc1tpXX1cIiBub3QgZm91bmQgaW4gdGlsZU1hcGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudGlsZUNvbG9yaXplKSB7IC8vIGFwcGx5IGNvbG9yaXphdGlvblxuICAgICAgICAgICAgICAgIGxldCBjYW52YXMgPSB0aGlzLl9jb2xvckNhbnZhcztcbiAgICAgICAgICAgICAgICBsZXQgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1vdmVyXCI7XG4gICAgICAgICAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBsZXQgZmcgPSBmZ3NbaV07XG4gICAgICAgICAgICAgICAgbGV0IGJnID0gYmdzW2ldO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuX29wdGlvbnMudGlsZVNldCwgdGlsZVswXSwgdGlsZVsxXSwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0LCAwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgIGlmIChmZyAhPSBcInRyYW5zcGFyZW50XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmZztcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1hdG9wXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGJnICE9IFwidHJhbnNwYXJlbnRcIikge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24tb3ZlclwiO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5kcmF3SW1hZ2UoY2FudmFzLCB4ICogdGlsZVdpZHRoLCB5ICogdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvLyBubyBjb2xvcml6aW5nLCBlYXN5XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LmRyYXdJbWFnZSh0aGlzLl9vcHRpb25zLnRpbGVTZXQsIHRpbGVbMF0sIHRpbGVbMV0sIHRpbGVXaWR0aCwgdGlsZUhlaWdodCwgeCAqIHRpbGVXaWR0aCwgeSAqIHRpbGVIZWlnaHQsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcHV0ZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgbGV0IHdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fb3B0aW9ucy50aWxlV2lkdGgpO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gTWF0aC5mbG9vcihhdmFpbEhlaWdodCAvIHRoaXMuX29wdGlvbnMudGlsZUhlaWdodCk7XG4gICAgICAgIHJldHVybiBbd2lkdGgsIGhlaWdodF07XG4gICAgfVxuICAgIGNvbXB1dGVGb250U2l6ZSgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGlsZSBiYWNrZW5kIGRvZXMgbm90IHVuZGVyc3RhbmQgZm9udCBzaXplXCIpO1xuICAgIH1cbiAgICBfbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbih4LCB5KSB7XG4gICAgICAgIHJldHVybiBbTWF0aC5mbG9vcih4IC8gdGhpcy5fb3B0aW9ucy50aWxlV2lkdGgpLCBNYXRoLmZsb29yKHkgLyB0aGlzLl9vcHRpb25zLnRpbGVIZWlnaHQpXTtcbiAgICB9XG4gICAgX3VwZGF0ZVNpemUoKSB7XG4gICAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9vcHRpb25zO1xuICAgICAgICB0aGlzLl9jdHguY2FudmFzLndpZHRoID0gb3B0cy53aWR0aCAqIG9wdHMudGlsZVdpZHRoO1xuICAgICAgICB0aGlzLl9jdHguY2FudmFzLmhlaWdodCA9IG9wdHMuaGVpZ2h0ICogb3B0cy50aWxlSGVpZ2h0O1xuICAgICAgICB0aGlzLl9jb2xvckNhbnZhcy53aWR0aCA9IG9wdHMudGlsZVdpZHRoO1xuICAgICAgICB0aGlzLl9jb2xvckNhbnZhcy5oZWlnaHQgPSBvcHRzLnRpbGVIZWlnaHQ7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgQXN5bmNocm9ub3VzIG1haW4gbG9vcFxuICogQHBhcmFtIHtST1QuU2NoZWR1bGVyfSBzY2hlZHVsZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5naW5lIHtcbiAgICBjb25zdHJ1Y3RvcihzY2hlZHVsZXIpIHtcbiAgICAgICAgdGhpcy5fc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgICAgICB0aGlzLl9sb2NrID0gMTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnQgdGhlIG1haW4gbG9vcC4gV2hlbiB0aGlzIGNhbGwgcmV0dXJucywgdGhlIGxvb3AgaXMgbG9ja2VkLlxuICAgICAqL1xuICAgIHN0YXJ0KCkgeyByZXR1cm4gdGhpcy51bmxvY2soKTsgfVxuICAgIC8qKlxuICAgICAqIEludGVycnVwdCB0aGUgZW5naW5lIGJ5IGFuIGFzeW5jaHJvbm91cyBhY3Rpb25cbiAgICAgKi9cbiAgICBsb2NrKCkge1xuICAgICAgICB0aGlzLl9sb2NrKys7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXN1bWUgZXhlY3V0aW9uIChwYXVzZWQgYnkgYSBwcmV2aW91cyBsb2NrKVxuICAgICAqL1xuICAgIHVubG9jaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NrKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgdW5sb2NrIHVubG9ja2VkIGVuZ2luZVwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb2NrLS07XG4gICAgICAgIHdoaWxlICghdGhpcy5fbG9jaykge1xuICAgICAgICAgICAgbGV0IGFjdG9yID0gdGhpcy5fc2NoZWR1bGVyLm5leHQoKTtcbiAgICAgICAgICAgIGlmICghYWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NrKCk7XG4gICAgICAgICAgICB9IC8qIG5vIGFjdG9ycyAqL1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGFjdG9yLmFjdCgpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQudGhlbikgeyAvKiBhY3RvciByZXR1cm5lZCBhIFwidGhlbmFibGVcIiwgbG9va3MgbGlrZSBhIFByb21pc2UgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmxvY2soKTtcbiAgICAgICAgICAgICAgICByZXN1bHQudGhlbih0aGlzLnVubG9jay5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBNaW5IZWFwIH0gZnJvbSBcIi4vTWluSGVhcC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRRdWV1ZSB7XG4gICAgLyoqXG4gICAgICogQGNsYXNzIEdlbmVyaWMgZXZlbnQgcXVldWU6IHN0b3JlcyBldmVudHMgYW5kIHJldHJpZXZlcyB0aGVtIGJhc2VkIG9uIHRoZWlyIHRpbWVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fdGltZSA9IDA7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBNaW5IZWFwKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IEVsYXBzZWQgdGltZVxuICAgICAqL1xuICAgIGdldFRpbWUoKSB7IHJldHVybiB0aGlzLl90aW1lOyB9XG4gICAgLyoqXG4gICAgICogQ2xlYXIgYWxsIHNjaGVkdWxlZCBldmVudHNcbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gbmV3IE1pbkhlYXAoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gZXZlbnRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZVxuICAgICAqL1xuICAgIGFkZChldmVudCwgdGltZSkge1xuICAgICAgICB0aGlzLl9ldmVudHMucHVzaChldmVudCwgdGltZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvY2F0ZXMgdGhlIG5lYXJlc3QgZXZlbnQsIGFkdmFuY2VzIHRpbWUgaWYgbmVjZXNzYXJ5LiBSZXR1cm5zIHRoYXQgZXZlbnQgYW5kIHJlbW92ZXMgaXQgZnJvbSB0aGUgcXVldWUuXG4gICAgICogQHJldHVybnMgez8gfHwgbnVsbH0gVGhlIGV2ZW50IHByZXZpb3VzbHkgYWRkZWQgYnkgYWRkRXZlbnQsIG51bGwgaWYgbm8gZXZlbnQgYXZhaWxhYmxlXG4gICAgICovXG4gICAgZ2V0KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2V2ZW50cy5sZW4oKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHsga2V5OiB0aW1lLCB2YWx1ZTogZXZlbnQgfSA9IHRoaXMuX2V2ZW50cy5wb3AoKTtcbiAgICAgICAgaWYgKHRpbWUgPiAwKSB7IC8qIGFkdmFuY2UgKi9cbiAgICAgICAgICAgIHRoaXMuX3RpbWUgKz0gdGltZTtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5zaGlmdCgtdGltZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRpbWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBldmVudFxuICAgICAqIEBwYXJhbSB7P30gZXZlbnRcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aW1lXG4gICAgICovXG4gICAgZ2V0RXZlbnRUaW1lKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLl9ldmVudHMuZmluZChldmVudCk7XG4gICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICBjb25zdCB7IGtleSB9ID0gcjtcbiAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFuIGV2ZW50IGZyb20gdGhlIHF1ZXVlXG4gICAgICogQHBhcmFtIHs/fSBldmVudFxuICAgICAqIEByZXR1cm5zIHtib29sfSBzdWNjZXNzP1xuICAgICAqL1xuICAgIHJlbW92ZShldmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzLnJlbW92ZShldmVudCk7XG4gICAgfVxuICAgIDtcbn1cbiIsImltcG9ydCBGT1YgZnJvbSBcIi4vZm92LmpzXCI7XG4vKipcbiAqIEBjbGFzcyBEaXNjcmV0ZSBzaGFkb3djYXN0aW5nIGFsZ29yaXRobS4gT2Jzb2xldGVkIGJ5IFByZWNpc2Ugc2hhZG93Y2FzdGluZy5cbiAqIEBhdWdtZW50cyBST1QuRk9WXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc2NyZXRlU2hhZG93Y2FzdGluZyBleHRlbmRzIEZPViB7XG4gICAgY29tcHV0ZSh4LCB5LCBSLCBjYWxsYmFjaykge1xuICAgICAgICAvKiB0aGlzIHBsYWNlIGlzIGFsd2F5cyB2aXNpYmxlICovXG4gICAgICAgIGNhbGxiYWNrKHgsIHksIDAsIDEpO1xuICAgICAgICAvKiBzdGFuZGluZyBpbiBhIGRhcmsgcGxhY2UuIEZJWE1FIGlzIHRoaXMgYSBnb29kIGlkZWE/ICAqL1xuICAgICAgICBpZiAoIXRoaXMuX2xpZ2h0UGFzc2VzKHgsIHkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLyogc3RhcnQgYW5kIGVuZCBhbmdsZXMgKi9cbiAgICAgICAgbGV0IERBVEEgPSBbXTtcbiAgICAgICAgbGV0IEEsIEIsIGN4LCBjeSwgYmxvY2tzO1xuICAgICAgICAvKiBhbmFseXplIHN1cnJvdW5kaW5nIGNlbGxzIGluIGNvbmNlbnRyaWMgcmluZ3MsIHN0YXJ0aW5nIGZyb20gdGhlIGNlbnRlciAqL1xuICAgICAgICBmb3IgKGxldCByID0gMTsgciA8PSBSOyByKyspIHtcbiAgICAgICAgICAgIGxldCBuZWlnaGJvcnMgPSB0aGlzLl9nZXRDaXJjbGUoeCwgeSwgcik7XG4gICAgICAgICAgICBsZXQgYW5nbGUgPSAzNjAgLyBuZWlnaGJvcnMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjeCA9IG5laWdoYm9yc1tpXVswXTtcbiAgICAgICAgICAgICAgICBjeSA9IG5laWdoYm9yc1tpXVsxXTtcbiAgICAgICAgICAgICAgICBBID0gYW5nbGUgKiAoaSAtIDAuNSk7XG4gICAgICAgICAgICAgICAgQiA9IEEgKyBhbmdsZTtcbiAgICAgICAgICAgICAgICBibG9ja3MgPSAhdGhpcy5fbGlnaHRQYXNzZXMoY3gsIGN5KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlzaWJsZUNvb3JkcyhNYXRoLmZsb29yKEEpLCBNYXRoLmNlaWwoQiksIGJsb2NrcywgREFUQSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soY3gsIGN5LCByLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKERBVEEubGVuZ3RoID09IDIgJiYgREFUQVswXSA9PSAwICYmIERBVEFbMV0gPT0gMzYwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IC8qIGN1dG9mZj8gKi9cbiAgICAgICAgICAgIH0gLyogZm9yIGFsbCBjZWxscyBpbiB0aGlzIHJpbmcgKi9cbiAgICAgICAgfSAvKiBmb3IgYWxsIHJpbmdzICovXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW50fSBBIHN0YXJ0IGFuZ2xlXG4gICAgICogQHBhcmFtIHtpbnR9IEIgZW5kIGFuZ2xlXG4gICAgICogQHBhcmFtIHtib29sfSBibG9ja3MgRG9lcyBjdXJyZW50IGNlbGwgYmxvY2sgdmlzaWJpbGl0eT9cbiAgICAgKiBAcGFyYW0ge2ludFtdW119IERBVEEgc2hhZG93ZWQgYW5nbGUgcGFpcnNcbiAgICAgKi9cbiAgICBfdmlzaWJsZUNvb3JkcyhBLCBCLCBibG9ja3MsIERBVEEpIHtcbiAgICAgICAgaWYgKEEgPCAwKSB7XG4gICAgICAgICAgICBsZXQgdjEgPSB0aGlzLl92aXNpYmxlQ29vcmRzKDAsIEIsIGJsb2NrcywgREFUQSk7XG4gICAgICAgICAgICBsZXQgdjIgPSB0aGlzLl92aXNpYmxlQ29vcmRzKDM2MCArIEEsIDM2MCwgYmxvY2tzLCBEQVRBKTtcbiAgICAgICAgICAgIHJldHVybiB2MSB8fCB2MjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoaW5kZXggPCBEQVRBLmxlbmd0aCAmJiBEQVRBW2luZGV4XSA8IEEpIHtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09IERBVEEubGVuZ3RoKSB7IC8qIGNvbXBsZXRlbHkgbmV3IHNoYWRvdyAqL1xuICAgICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgICAgIERBVEEucHVzaChBLCBCKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGlmIChpbmRleCAlIDIpIHsgLyogdGhpcyBzaGFkb3cgc3RhcnRzIGluIGFuIGV4aXN0aW5nIHNoYWRvdywgb3Igd2l0aGluIGl0cyBlbmRpbmcgYm91bmRhcnkgKi9cbiAgICAgICAgICAgIHdoaWxlIChpbmRleCA8IERBVEEubGVuZ3RoICYmIERBVEFbaW5kZXhdIDwgQikge1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb3VudCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCAlIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgREFUQS5zcGxpY2UoaW5kZXggLSBjb3VudCwgY291bnQsIEIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgREFUQS5zcGxpY2UoaW5kZXggLSBjb3VudCwgY291bnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvKiB0aGlzIHNoYWRvdyBzdGFydHMgb3V0c2lkZSBhbiBleGlzdGluZyBzaGFkb3csIG9yIHdpdGhpbiBhIHN0YXJ0aW5nIGJvdW5kYXJ5ICovXG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPCBEQVRBLmxlbmd0aCAmJiBEQVRBW2luZGV4XSA8IEIpIHtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiB2aXNpYmxlIHdoZW4gb3V0c2lkZSBhbiBleGlzdGluZyBzaGFkb3csIG9yIHdoZW4gb3ZlcmxhcHBpbmcgKi9cbiAgICAgICAgICAgIGlmIChBID09IERBVEFbaW5kZXggLSBjb3VudF0gJiYgY291bnQgPT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgJSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIERBVEEuc3BsaWNlKGluZGV4IC0gY291bnQsIGNvdW50LCBBKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIERBVEEuc3BsaWNlKGluZGV4IC0gY291bnQsIGNvdW50LCBBLCBCKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IERJUlMgfSBmcm9tIFwiLi4vY29uc3RhbnRzLmpzXCI7XG47XG47XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGT1Yge1xuICAgIC8qKlxuICAgICAqIEBjbGFzcyBBYnN0cmFjdCBGT1YgYWxnb3JpdGhtXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlnaHRQYXNzZXNDYWxsYmFjayBEb2VzIHRoZSBsaWdodCBwYXNzIHRocm91Z2ggeCx5P1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiBAcGFyYW0ge2ludH0gW29wdGlvbnMudG9wb2xvZ3k9OF0gNC82LzhcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihsaWdodFBhc3Nlc0NhbGxiYWNrLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5fbGlnaHRQYXNzZXMgPSBsaWdodFBhc3Nlc0NhbGxiYWNrO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7IHRvcG9sb2d5OiA4IH0sIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYWxsIG5laWdoYm9ycyBpbiBhIGNvbmNlbnRyaWMgcmluZ1xuICAgICAqIEBwYXJhbSB7aW50fSBjeCBjZW50ZXIteFxuICAgICAqIEBwYXJhbSB7aW50fSBjeSBjZW50ZXIteVxuICAgICAqIEBwYXJhbSB7aW50fSByIHJhbmdlXG4gICAgICovXG4gICAgX2dldENpcmNsZShjeCwgY3ksIHIpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgZGlycywgY291bnRGYWN0b3IsIHN0YXJ0T2Zmc2V0O1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kpIHtcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBjb3VudEZhY3RvciA9IDE7XG4gICAgICAgICAgICAgICAgc3RhcnRPZmZzZXQgPSBbMCwgMV07XG4gICAgICAgICAgICAgICAgZGlycyA9IFtcbiAgICAgICAgICAgICAgICAgICAgRElSU1s4XVs3XSxcbiAgICAgICAgICAgICAgICAgICAgRElSU1s4XVsxXSxcbiAgICAgICAgICAgICAgICAgICAgRElSU1s4XVszXSxcbiAgICAgICAgICAgICAgICAgICAgRElSU1s4XVs1XVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgZGlycyA9IERJUlNbNl07XG4gICAgICAgICAgICAgICAgY291bnRGYWN0b3IgPSAxO1xuICAgICAgICAgICAgICAgIHN0YXJ0T2Zmc2V0ID0gWy0xLCAxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICBkaXJzID0gRElSU1s0XTtcbiAgICAgICAgICAgICAgICBjb3VudEZhY3RvciA9IDI7XG4gICAgICAgICAgICAgICAgc3RhcnRPZmZzZXQgPSBbLTEsIDFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbmNvcnJlY3QgdG9wb2xvZ3kgZm9yIEZPViBjb21wdXRhdGlvblwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvKiBzdGFydGluZyBuZWlnaGJvciAqL1xuICAgICAgICBsZXQgeCA9IGN4ICsgc3RhcnRPZmZzZXRbMF0gKiByO1xuICAgICAgICBsZXQgeSA9IGN5ICsgc3RhcnRPZmZzZXRbMV0gKiByO1xuICAgICAgICAvKiBjaXJjbGUgKi9cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHIgKiBjb3VudEZhY3RvcjsgaisrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goW3gsIHldKTtcbiAgICAgICAgICAgICAgICB4ICs9IGRpcnNbaV1bMF07XG4gICAgICAgICAgICAgICAgeSArPSBkaXJzW2ldWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IERpc2NyZXRlU2hhZG93Y2FzdGluZyBmcm9tIFwiLi9kaXNjcmV0ZS1zaGFkb3djYXN0aW5nLmpzXCI7XG5pbXBvcnQgUHJlY2lzZVNoYWRvd2Nhc3RpbmcgZnJvbSBcIi4vcHJlY2lzZS1zaGFkb3djYXN0aW5nLmpzXCI7XG5pbXBvcnQgUmVjdXJzaXZlU2hhZG93Y2FzdGluZyBmcm9tIFwiLi9yZWN1cnNpdmUtc2hhZG93Y2FzdGluZy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgeyBEaXNjcmV0ZVNoYWRvd2Nhc3RpbmcsIFByZWNpc2VTaGFkb3djYXN0aW5nLCBSZWN1cnNpdmVTaGFkb3djYXN0aW5nIH07XG4iLCJpbXBvcnQgRk9WIGZyb20gXCIuL2Zvdi5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgUHJlY2lzZSBzaGFkb3djYXN0aW5nIGFsZ29yaXRobVxuICogQGF1Z21lbnRzIFJPVC5GT1ZcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlY2lzZVNoYWRvd2Nhc3RpbmcgZXh0ZW5kcyBGT1Yge1xuICAgIGNvbXB1dGUoeCwgeSwgUiwgY2FsbGJhY2spIHtcbiAgICAgICAgLyogdGhpcyBwbGFjZSBpcyBhbHdheXMgdmlzaWJsZSAqL1xuICAgICAgICBjYWxsYmFjayh4LCB5LCAwLCAxKTtcbiAgICAgICAgLyogc3RhbmRpbmcgaW4gYSBkYXJrIHBsYWNlLiBGSVhNRSBpcyB0aGlzIGEgZ29vZCBpZGVhPyAgKi9cbiAgICAgICAgaWYgKCF0aGlzLl9saWdodFBhc3Nlcyh4LCB5KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8qIGxpc3Qgb2YgYWxsIHNoYWRvd3MgKi9cbiAgICAgICAgbGV0IFNIQURPV1MgPSBbXTtcbiAgICAgICAgbGV0IGN4LCBjeSwgYmxvY2tzLCBBMSwgQTIsIHZpc2liaWxpdHk7XG4gICAgICAgIC8qIGFuYWx5emUgc3Vycm91bmRpbmcgY2VsbHMgaW4gY29uY2VudHJpYyByaW5ncywgc3RhcnRpbmcgZnJvbSB0aGUgY2VudGVyICovXG4gICAgICAgIGZvciAobGV0IHIgPSAxOyByIDw9IFI7IHIrKykge1xuICAgICAgICAgICAgbGV0IG5laWdoYm9ycyA9IHRoaXMuX2dldENpcmNsZSh4LCB5LCByKTtcbiAgICAgICAgICAgIGxldCBuZWlnaGJvckNvdW50ID0gbmVpZ2hib3JzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmVpZ2hib3JDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY3ggPSBuZWlnaGJvcnNbaV1bMF07XG4gICAgICAgICAgICAgICAgY3kgPSBuZWlnaGJvcnNbaV1bMV07XG4gICAgICAgICAgICAgICAgLyogc2hpZnQgaGFsZi1hbi1hbmdsZSBiYWNrd2FyZHMgdG8gbWFpbnRhaW4gY29uc2lzdGVuY3kgb2YgMC10aCBjZWxscyAqL1xuICAgICAgICAgICAgICAgIEExID0gW2kgPyAyICogaSAtIDEgOiAyICogbmVpZ2hib3JDb3VudCAtIDEsIDIgKiBuZWlnaGJvckNvdW50XTtcbiAgICAgICAgICAgICAgICBBMiA9IFsyICogaSArIDEsIDIgKiBuZWlnaGJvckNvdW50XTtcbiAgICAgICAgICAgICAgICBibG9ja3MgPSAhdGhpcy5fbGlnaHRQYXNzZXMoY3gsIGN5KTtcbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5ID0gdGhpcy5fY2hlY2tWaXNpYmlsaXR5KEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAgICAgICAgICAgICBpZiAodmlzaWJpbGl0eSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhjeCwgY3ksIHIsIHZpc2liaWxpdHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoU0hBRE9XUy5sZW5ndGggPT0gMiAmJiBTSEFET1dTWzBdWzBdID09IDAgJiYgU0hBRE9XU1sxXVswXSA9PSBTSEFET1dTWzFdWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IC8qIGN1dG9mZj8gKi9cbiAgICAgICAgICAgIH0gLyogZm9yIGFsbCBjZWxscyBpbiB0aGlzIHJpbmcgKi9cbiAgICAgICAgfSAvKiBmb3IgYWxsIHJpbmdzICovXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW50WzJdfSBBMSBhcmMgc3RhcnRcbiAgICAgKiBAcGFyYW0ge2ludFsyXX0gQTIgYXJjIGVuZFxuICAgICAqIEBwYXJhbSB7Ym9vbH0gYmxvY2tzIERvZXMgY3VycmVudCBhcmMgYmxvY2sgdmlzaWJpbGl0eT9cbiAgICAgKiBAcGFyYW0ge2ludFtdW119IFNIQURPV1MgbGlzdCBvZiBhY3RpdmUgc2hhZG93c1xuICAgICAqL1xuICAgIF9jaGVja1Zpc2liaWxpdHkoQTEsIEEyLCBibG9ja3MsIFNIQURPV1MpIHtcbiAgICAgICAgaWYgKEExWzBdID4gQTJbMF0pIHsgLyogc3BsaXQgaW50byB0d28gc3ViLWFyY3MgKi9cbiAgICAgICAgICAgIGxldCB2MSA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShBMSwgW0ExWzFdLCBBMVsxXV0sIGJsb2NrcywgU0hBRE9XUyk7XG4gICAgICAgICAgICBsZXQgdjIgPSB0aGlzLl9jaGVja1Zpc2liaWxpdHkoWzAsIDFdLCBBMiwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAgICAgICAgIHJldHVybiAodjEgKyB2MikgLyAyO1xuICAgICAgICB9XG4gICAgICAgIC8qIGluZGV4MTogZmlyc3Qgc2hhZG93ID49IEExICovXG4gICAgICAgIGxldCBpbmRleDEgPSAwLCBlZGdlMSA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAoaW5kZXgxIDwgU0hBRE9XUy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBvbGQgPSBTSEFET1dTW2luZGV4MV07XG4gICAgICAgICAgICBsZXQgZGlmZiA9IG9sZFswXSAqIEExWzFdIC0gQTFbMF0gKiBvbGRbMV07XG4gICAgICAgICAgICBpZiAoZGlmZiA+PSAwKSB7IC8qIG9sZCA+PSBBMSAqL1xuICAgICAgICAgICAgICAgIGlmIChkaWZmID09IDAgJiYgIShpbmRleDEgJSAyKSkge1xuICAgICAgICAgICAgICAgICAgICBlZGdlMSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgxKys7XG4gICAgICAgIH1cbiAgICAgICAgLyogaW5kZXgyOiBsYXN0IHNoYWRvdyA8PSBBMiAqL1xuICAgICAgICBsZXQgaW5kZXgyID0gU0hBRE9XUy5sZW5ndGgsIGVkZ2UyID0gZmFsc2U7XG4gICAgICAgIHdoaWxlIChpbmRleDItLSkge1xuICAgICAgICAgICAgbGV0IG9sZCA9IFNIQURPV1NbaW5kZXgyXTtcbiAgICAgICAgICAgIGxldCBkaWZmID0gQTJbMF0gKiBvbGRbMV0gLSBvbGRbMF0gKiBBMlsxXTtcbiAgICAgICAgICAgIGlmIChkaWZmID49IDApIHsgLyogb2xkIDw9IEEyICovXG4gICAgICAgICAgICAgICAgaWYgKGRpZmYgPT0gMCAmJiAoaW5kZXgyICUgMikpIHtcbiAgICAgICAgICAgICAgICAgICAgZWRnZTIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgdmlzaWJsZSA9IHRydWU7XG4gICAgICAgIGlmIChpbmRleDEgPT0gaW5kZXgyICYmIChlZGdlMSB8fCBlZGdlMikpIHsgLyogc3Vic2V0IG9mIGV4aXN0aW5nIHNoYWRvdywgb25lIG9mIHRoZSBlZGdlcyBtYXRjaCAqL1xuICAgICAgICAgICAgdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGVkZ2UxICYmIGVkZ2UyICYmIGluZGV4MSArIDEgPT0gaW5kZXgyICYmIChpbmRleDIgJSAyKSkgeyAvKiBjb21wbGV0ZWx5IGVxdWl2YWxlbnQgd2l0aCBleGlzdGluZyBzaGFkb3cgKi9cbiAgICAgICAgICAgIHZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleDEgPiBpbmRleDIgJiYgKGluZGV4MSAlIDIpKSB7IC8qIHN1YnNldCBvZiBleGlzdGluZyBzaGFkb3csIG5vdCB0b3VjaGluZyAqL1xuICAgICAgICAgICAgdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0gLyogZmFzdCBjYXNlOiBub3QgdmlzaWJsZSAqL1xuICAgICAgICBsZXQgdmlzaWJsZUxlbmd0aDtcbiAgICAgICAgLyogY29tcHV0ZSB0aGUgbGVuZ3RoIG9mIHZpc2libGUgYXJjLCBhZGp1c3QgbGlzdCBvZiBzaGFkb3dzIChpZiBibG9ja2luZykgKi9cbiAgICAgICAgbGV0IHJlbW92ZSA9IGluZGV4MiAtIGluZGV4MSArIDE7XG4gICAgICAgIGlmIChyZW1vdmUgJSAyKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXgxICUgMikgeyAvKiBmaXJzdCBlZGdlIHdpdGhpbiBleGlzdGluZyBzaGFkb3csIHNlY29uZCBvdXRzaWRlICovXG4gICAgICAgICAgICAgICAgbGV0IFAgPSBTSEFET1dTW2luZGV4MV07XG4gICAgICAgICAgICAgICAgdmlzaWJsZUxlbmd0aCA9IChBMlswXSAqIFBbMV0gLSBQWzBdICogQTJbMV0pIC8gKFBbMV0gKiBBMlsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgICAgICAgICBTSEFET1dTLnNwbGljZShpbmRleDEsIHJlbW92ZSwgQTIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvKiBzZWNvbmQgZWRnZSB3aXRoaW4gZXhpc3Rpbmcgc2hhZG93LCBmaXJzdCBvdXRzaWRlICovXG4gICAgICAgICAgICAgICAgbGV0IFAgPSBTSEFET1dTW2luZGV4Ml07XG4gICAgICAgICAgICAgICAgdmlzaWJsZUxlbmd0aCA9IChQWzBdICogQTFbMV0gLSBBMVswXSAqIFBbMV0pIC8gKEExWzFdICogUFsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgICAgICAgICBTSEFET1dTLnNwbGljZShpbmRleDEsIHJlbW92ZSwgQTEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpbmRleDEgJSAyKSB7IC8qIGJvdGggZWRnZXMgd2l0aGluIGV4aXN0aW5nIHNoYWRvd3MgKi9cbiAgICAgICAgICAgICAgICBsZXQgUDEgPSBTSEFET1dTW2luZGV4MV07XG4gICAgICAgICAgICAgICAgbGV0IFAyID0gU0hBRE9XU1tpbmRleDJdO1xuICAgICAgICAgICAgICAgIHZpc2libGVMZW5ndGggPSAoUDJbMF0gKiBQMVsxXSAtIFAxWzBdICogUDJbMV0pIC8gKFAxWzFdICogUDJbMV0pO1xuICAgICAgICAgICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICAgICAgICAgICAgU0hBRE9XUy5zcGxpY2UoaW5kZXgxLCByZW1vdmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvKiBib3RoIGVkZ2VzIG91dHNpZGUgZXhpc3Rpbmcgc2hhZG93cyAqL1xuICAgICAgICAgICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICAgICAgICAgICAgU0hBRE9XUy5zcGxpY2UoaW5kZXgxLCByZW1vdmUsIEExLCBBMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAxOyAvKiB3aG9sZSBhcmMgdmlzaWJsZSEgKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgYXJjTGVuZ3RoID0gKEEyWzBdICogQTFbMV0gLSBBMVswXSAqIEEyWzFdKSAvIChBMVsxXSAqIEEyWzFdKTtcbiAgICAgICAgcmV0dXJuIHZpc2libGVMZW5ndGggLyBhcmNMZW5ndGg7XG4gICAgfVxufVxuIiwiaW1wb3J0IEZPViBmcm9tIFwiLi9mb3YuanNcIjtcbi8qKiBPY3RhbnRzIHVzZWQgZm9yIHRyYW5zbGF0aW5nIHJlY3Vyc2l2ZSBzaGFkb3djYXN0aW5nIG9mZnNldHMgKi9cbmNvbnN0IE9DVEFOVFMgPSBbXG4gICAgWy0xLCAwLCAwLCAxXSxcbiAgICBbMCwgLTEsIDEsIDBdLFxuICAgIFswLCAtMSwgLTEsIDBdLFxuICAgIFstMSwgMCwgMCwgLTFdLFxuICAgIFsxLCAwLCAwLCAtMV0sXG4gICAgWzAsIDEsIC0xLCAwXSxcbiAgICBbMCwgMSwgMSwgMF0sXG4gICAgWzEsIDAsIDAsIDFdXG5dO1xuLyoqXG4gKiBAY2xhc3MgUmVjdXJzaXZlIHNoYWRvd2Nhc3RpbmcgYWxnb3JpdGhtXG4gKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyA0LzggdG9wb2xvZ2llcywgbm90IGhleGFnb25hbC5cbiAqIEJhc2VkIG9uIFBldGVyIEhhcmtpbnMnIGltcGxlbWVudGF0aW9uIG9mIEJqw7ZybiBCZXJnc3Ryw7ZtJ3MgYWxnb3JpdGhtIGRlc2NyaWJlZCBoZXJlOiBodHRwOi8vd3d3LnJvZ3VlYmFzaW4uY29tL2luZGV4LnBocD90aXRsZT1GT1ZfdXNpbmdfcmVjdXJzaXZlX3NoYWRvd2Nhc3RpbmdcbiAqIEBhdWdtZW50cyBST1QuRk9WXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3Vyc2l2ZVNoYWRvd2Nhc3RpbmcgZXh0ZW5kcyBGT1Yge1xuICAgIC8qKlxuICAgICAqIENvbXB1dGUgdmlzaWJpbGl0eSBmb3IgYSAzNjAtZGVncmVlIGNpcmNsZVxuICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgKiBAcGFyYW0ge2ludH0gUiBNYXhpbXVtIHZpc2liaWxpdHkgcmFkaXVzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBjb21wdXRlKHgsIHksIFIsIGNhbGxiYWNrKSB7XG4gICAgICAgIC8vWW91IGNhbiBhbHdheXMgc2VlIHlvdXIgb3duIHRpbGVcbiAgICAgICAgY2FsbGJhY2soeCwgeSwgMCwgMSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT0NUQU5UUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbaV0sIFIsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIHZpc2liaWxpdHkgZm9yIGEgMTgwLWRlZ3JlZSBhcmNcbiAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICogQHBhcmFtIHtpbnR9IFIgTWF4aW11bSB2aXNpYmlsaXR5IHJhZGl1c1xuICAgICAqIEBwYXJhbSB7aW50fSBkaXIgRGlyZWN0aW9uIHRvIGxvb2sgaW4gKGV4cHJlc3NlZCBpbiBhIFJPVC5ESVJTIHZhbHVlKTtcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuICAgIGNvbXB1dGUxODAoeCwgeSwgUiwgZGlyLCBjYWxsYmFjaykge1xuICAgICAgICAvL1lvdSBjYW4gYWx3YXlzIHNlZSB5b3VyIG93biB0aWxlXG4gICAgICAgIGNhbGxiYWNrKHgsIHksIDAsIDEpO1xuICAgICAgICBsZXQgcHJldmlvdXNPY3RhbnQgPSAoZGlyIC0gMSArIDgpICUgODsgLy9OZWVkIHRvIHJldHJpZXZlIHRoZSBwcmV2aW91cyBvY3RhbnQgdG8gcmVuZGVyIGEgZnVsbCAxODAgZGVncmVlc1xuICAgICAgICBsZXQgbmV4dFByZXZpb3VzT2N0YW50ID0gKGRpciAtIDIgKyA4KSAlIDg7IC8vTmVlZCB0byByZXRyaWV2ZSB0aGUgcHJldmlvdXMgdHdvIG9jdGFudHMgdG8gcmVuZGVyIGEgZnVsbCAxODAgZGVncmVlc1xuICAgICAgICBsZXQgbmV4dE9jdGFudCA9IChkaXIgKyAxICsgOCkgJSA4OyAvL05lZWQgdG8gZ3JhYiB0byBuZXh0IG9jdGFudCB0byByZW5kZXIgYSBmdWxsIDE4MCBkZWdyZWVzXG4gICAgICAgIHRoaXMuX3JlbmRlck9jdGFudCh4LCB5LCBPQ1RBTlRTW25leHRQcmV2aW91c09jdGFudF0sIFIsIGNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbcHJldmlvdXNPY3RhbnRdLCBSLCBjYWxsYmFjayk7XG4gICAgICAgIHRoaXMuX3JlbmRlck9jdGFudCh4LCB5LCBPQ1RBTlRTW2Rpcl0sIFIsIGNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbbmV4dE9jdGFudF0sIFIsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgO1xuICAgIC8qKlxuICAgICAqIENvbXB1dGUgdmlzaWJpbGl0eSBmb3IgYSA5MC1kZWdyZWUgYXJjXG4gICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAqIEBwYXJhbSB7aW50fSBSIE1heGltdW0gdmlzaWJpbGl0eSByYWRpdXNcbiAgICAgKiBAcGFyYW0ge2ludH0gZGlyIERpcmVjdGlvbiB0byBsb29rIGluIChleHByZXNzZWQgaW4gYSBST1QuRElSUyB2YWx1ZSk7XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBjb21wdXRlOTAoeCwgeSwgUiwgZGlyLCBjYWxsYmFjaykge1xuICAgICAgICAvL1lvdSBjYW4gYWx3YXlzIHNlZSB5b3VyIG93biB0aWxlXG4gICAgICAgIGNhbGxiYWNrKHgsIHksIDAsIDEpO1xuICAgICAgICBsZXQgcHJldmlvdXNPY3RhbnQgPSAoZGlyIC0gMSArIDgpICUgODsgLy9OZWVkIHRvIHJldHJpZXZlIHRoZSBwcmV2aW91cyBvY3RhbnQgdG8gcmVuZGVyIGEgZnVsbCA5MCBkZWdyZWVzXG4gICAgICAgIHRoaXMuX3JlbmRlck9jdGFudCh4LCB5LCBPQ1RBTlRTW2Rpcl0sIFIsIGNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbcHJldmlvdXNPY3RhbnRdLCBSLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlciBvbmUgb2N0YW50ICg0NS1kZWdyZWUgYXJjKSBvZiB0aGUgdmlld3NoZWRcbiAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICogQHBhcmFtIHtpbnR9IG9jdGFudCBPY3RhbnQgdG8gYmUgcmVuZGVyZWRcbiAgICAgKiBAcGFyYW0ge2ludH0gUiBNYXhpbXVtIHZpc2liaWxpdHkgcmFkaXVzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBfcmVuZGVyT2N0YW50KHgsIHksIG9jdGFudCwgUiwgY2FsbGJhY2spIHtcbiAgICAgICAgLy9SYWRpdXMgaW5jcmVtZW50ZWQgYnkgMSB0byBwcm92aWRlIHNhbWUgY292ZXJhZ2UgYXJlYSBhcyBvdGhlciBzaGFkb3djYXN0aW5nIHJhZGl1c2VzXG4gICAgICAgIHRoaXMuX2Nhc3RWaXNpYmlsaXR5KHgsIHksIDEsIDEuMCwgMC4wLCBSICsgMSwgb2N0YW50WzBdLCBvY3RhbnRbMV0sIG9jdGFudFsyXSwgb2N0YW50WzNdLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFjdHVhbGx5IGNhbGN1bGF0ZXMgdGhlIHZpc2liaWxpdHlcbiAgICAgKiBAcGFyYW0ge2ludH0gc3RhcnRYIFRoZSBzdGFydGluZyBYIGNvb3JkaW5hdGVcbiAgICAgKiBAcGFyYW0ge2ludH0gc3RhcnRZIFRoZSBzdGFydGluZyBZIGNvb3JkaW5hdGVcbiAgICAgKiBAcGFyYW0ge2ludH0gcm93IFRoZSByb3cgdG8gcmVuZGVyXG4gICAgICogQHBhcmFtIHtmbG9hdH0gdmlzU2xvcGVTdGFydCBUaGUgc2xvcGUgdG8gc3RhcnQgYXRcbiAgICAgKiBAcGFyYW0ge2Zsb2F0fSB2aXNTbG9wZUVuZCBUaGUgc2xvcGUgdG8gZW5kIGF0XG4gICAgICogQHBhcmFtIHtpbnR9IHJhZGl1cyBUaGUgcmFkaXVzIHRvIHJlYWNoIG91dCB0b1xuICAgICAqIEBwYXJhbSB7aW50fSB4eFxuICAgICAqIEBwYXJhbSB7aW50fSB4eVxuICAgICAqIEBwYXJhbSB7aW50fSB5eFxuICAgICAqIEBwYXJhbSB7aW50fSB5eVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byB1c2Ugd2hlbiB3ZSBoaXQgYSBibG9jayB0aGF0IGlzIHZpc2libGVcbiAgICAgKi9cbiAgICBfY2FzdFZpc2liaWxpdHkoc3RhcnRYLCBzdGFydFksIHJvdywgdmlzU2xvcGVTdGFydCwgdmlzU2xvcGVFbmQsIHJhZGl1cywgeHgsIHh5LCB5eCwgeXksIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh2aXNTbG9wZVN0YXJ0IDwgdmlzU2xvcGVFbmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gcm93OyBpIDw9IHJhZGl1czsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZHggPSAtaSAtIDE7XG4gICAgICAgICAgICBsZXQgZHkgPSAtaTtcbiAgICAgICAgICAgIGxldCBibG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgbmV3U3RhcnQgPSAwO1xuICAgICAgICAgICAgLy8nUm93JyBjb3VsZCBiZSBjb2x1bW4sIG5hbWVzIGhlcmUgYXNzdW1lIG9jdGFudCAwIGFuZCB3b3VsZCBiZSBmbGlwcGVkIGZvciBoYWxmIHRoZSBvY3RhbnRzXG4gICAgICAgICAgICB3aGlsZSAoZHggPD0gMCkge1xuICAgICAgICAgICAgICAgIGR4ICs9IDE7XG4gICAgICAgICAgICAgICAgLy9UcmFuc2xhdGUgZnJvbSByZWxhdGl2ZSBjb29yZGluYXRlcyB0byBtYXAgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICBsZXQgbWFwWCA9IHN0YXJ0WCArIGR4ICogeHggKyBkeSAqIHh5O1xuICAgICAgICAgICAgICAgIGxldCBtYXBZID0gc3RhcnRZICsgZHggKiB5eCArIGR5ICogeXk7XG4gICAgICAgICAgICAgICAgLy9SYW5nZSBvZiB0aGUgcm93XG4gICAgICAgICAgICAgICAgbGV0IHNsb3BlU3RhcnQgPSAoZHggLSAwLjUpIC8gKGR5ICsgMC41KTtcbiAgICAgICAgICAgICAgICBsZXQgc2xvcGVFbmQgPSAoZHggKyAwLjUpIC8gKGR5IC0gMC41KTtcbiAgICAgICAgICAgICAgICAvL0lnbm9yZSBpZiBub3QgeWV0IGF0IGxlZnQgZWRnZSBvZiBPY3RhbnRcbiAgICAgICAgICAgICAgICBpZiAoc2xvcGVFbmQgPiB2aXNTbG9wZVN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL0RvbmUgaWYgcGFzdCByaWdodCBlZGdlXG4gICAgICAgICAgICAgICAgaWYgKHNsb3BlU3RhcnQgPCB2aXNTbG9wZUVuZCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9JZiBpdCdzIGluIHJhbmdlLCBpdCdzIHZpc2libGVcbiAgICAgICAgICAgICAgICBpZiAoKGR4ICogZHggKyBkeSAqIGR5KSA8IChyYWRpdXMgKiByYWRpdXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG1hcFgsIG1hcFksIGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWJsb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9JZiB0aWxlIGlzIGEgYmxvY2tpbmcgdGlsZSwgY2FzdCBhcm91bmQgaXRcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9saWdodFBhc3NlcyhtYXBYLCBtYXBZKSAmJiBpIDwgcmFkaXVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nhc3RWaXNpYmlsaXR5KHN0YXJ0WCwgc3RhcnRZLCBpICsgMSwgdmlzU2xvcGVTdGFydCwgc2xvcGVTdGFydCwgcmFkaXVzLCB4eCwgeHksIHl4LCB5eSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U3RhcnQgPSBzbG9wZUVuZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9LZWVwIG5hcnJvd2luZyBpZiBzY2FubmluZyBhY3Jvc3MgYSBibG9ja1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2xpZ2h0UGFzc2VzKG1hcFgsIG1hcFkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTdGFydCA9IHNsb3BlRW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9CbG9jayBoYXMgZW5kZWRcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2aXNTbG9wZVN0YXJ0ID0gbmV3U3RhcnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJsb2NrZWQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgUk5HIH0gZnJvbSBcIi4vcm5nLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIERpc3BsYXkgfSBmcm9tIFwiLi9kaXNwbGF5L2Rpc3BsYXkuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3RyaW5nR2VuZXJhdG9yIH0gZnJvbSBcIi4vc3RyaW5nZ2VuZXJhdG9yLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEV2ZW50UXVldWUgfSBmcm9tIFwiLi9ldmVudHF1ZXVlLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFNjaGVkdWxlciB9IGZyb20gXCIuL3NjaGVkdWxlci9pbmRleC5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBGT1YgfSBmcm9tIFwiLi9mb3YvaW5kZXguanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWFwIH0gZnJvbSBcIi4vbWFwL2luZGV4LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE5vaXNlIH0gZnJvbSBcIi4vbm9pc2UvaW5kZXguanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGF0aCB9IGZyb20gXCIuL3BhdGgvaW5kZXguanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRW5naW5lIH0gZnJvbSBcIi4vZW5naW5lLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIExpZ2h0aW5nIH0gZnJvbSBcIi4vbGlnaHRpbmcuanNcIjtcbmV4cG9ydCB7IERFRkFVTFRfV0lEVEgsIERFRkFVTFRfSEVJR0hULCBESVJTLCBLRVlTIH0gZnJvbSBcIi4vY29uc3RhbnRzLmpzXCI7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCIuL3V0aWwuanNcIjtcbmV4cG9ydCBjb25zdCBVdGlsID0gdXRpbDtcbmltcG9ydCAqIGFzIGNvbG9yIGZyb20gXCIuL2NvbG9yLmpzXCI7XG5leHBvcnQgY29uc3QgQ29sb3IgPSBjb2xvcjtcbmltcG9ydCAqIGFzIHRleHQgZnJvbSBcIi4vdGV4dC5qc1wiO1xuZXhwb3J0IGNvbnN0IFRleHQgPSB0ZXh0O1xuIiwiaW1wb3J0ICogYXMgQ29sb3IgZnJvbSBcIi4vY29sb3IuanNcIjtcbjtcbjtcbjtcbjtcbi8qKlxuICogTGlnaHRpbmcgY29tcHV0YXRpb24sIGJhc2VkIG9uIGEgdHJhZGl0aW9uYWwgRk9WIGZvciBtdWx0aXBsZSBsaWdodCBzb3VyY2VzIGFuZCBtdWx0aXBsZSBwYXNzZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpZ2h0aW5nIHtcbiAgICBjb25zdHJ1Y3RvcihyZWZsZWN0aXZpdHlDYWxsYmFjaywgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX3JlZmxlY3Rpdml0eUNhbGxiYWNrID0gcmVmbGVjdGl2aXR5Q2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB7fTtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgcGFzc2VzOiAxLFxuICAgICAgICAgICAgZW1pc3Npb25UaHJlc2hvbGQ6IDEwMCxcbiAgICAgICAgICAgIHJhbmdlOiAxMFxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fbGlnaHRzID0ge307XG4gICAgICAgIHRoaXMuX3JlZmxlY3Rpdml0eUNhY2hlID0ge307XG4gICAgICAgIHRoaXMuX2ZvdkNhY2hlID0ge307XG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRqdXN0IG9wdGlvbnMgYXQgcnVudGltZVxuICAgICAqL1xuICAgIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdXNlZCBGaWVsZC1PZi1WaWV3IGFsZ29cbiAgICAgKi9cbiAgICBzZXRGT1YoZm92KSB7XG4gICAgICAgIHRoaXMuX2ZvdiA9IGZvdjtcbiAgICAgICAgdGhpcy5fZm92Q2FjaGUgPSB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCAob3IgcmVtb3ZlKSBhIGxpZ2h0IHNvdXJjZVxuICAgICAqL1xuICAgIHNldExpZ2h0KHgsIHksIGNvbG9yKSB7XG4gICAgICAgIGxldCBrZXkgPSB4ICsgXCIsXCIgKyB5O1xuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpZ2h0c1trZXldID0gKHR5cGVvZiAoY29sb3IpID09IFwic3RyaW5nXCIgPyBDb2xvci5mcm9tU3RyaW5nKGNvbG9yKSA6IGNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9saWdodHNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBsaWdodCBzb3VyY2VzXG4gICAgICovXG4gICAgY2xlYXJMaWdodHMoKSB7IHRoaXMuX2xpZ2h0cyA9IHt9OyB9XG4gICAgLyoqXG4gICAgICogUmVzZXQgdGhlIHByZS1jb21wdXRlZCB0b3BvbG9neSB2YWx1ZXMuIENhbGwgd2hlbmV2ZXIgdGhlIHVuZGVybHlpbmcgbWFwIGNoYW5nZXMgaXRzIGxpZ2h0LXBhc3NhYmlsaXR5LlxuICAgICAqL1xuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLl9yZWZsZWN0aXZpdHlDYWNoZSA9IHt9O1xuICAgICAgICB0aGlzLl9mb3ZDYWNoZSA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSB0aGUgbGlnaHRpbmdcbiAgICAgKi9cbiAgICBjb21wdXRlKGxpZ2h0aW5nQ2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGRvbmVDZWxscyA9IHt9O1xuICAgICAgICBsZXQgZW1pdHRpbmdDZWxscyA9IHt9O1xuICAgICAgICBsZXQgbGl0Q2VsbHMgPSB7fTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX2xpZ2h0cykgeyAvKiBwcmVwYXJlIGVtaXR0ZXJzIGZvciBmaXJzdCBwYXNzICovXG4gICAgICAgICAgICBsZXQgbGlnaHQgPSB0aGlzLl9saWdodHNba2V5XTtcbiAgICAgICAgICAgIGVtaXR0aW5nQ2VsbHNba2V5XSA9IFswLCAwLCAwXTtcbiAgICAgICAgICAgIENvbG9yLmFkZF8oZW1pdHRpbmdDZWxsc1trZXldLCBsaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9vcHRpb25zLnBhc3NlczsgaSsrKSB7IC8qIG1haW4gbG9vcCAqL1xuICAgICAgICAgICAgdGhpcy5fZW1pdExpZ2h0KGVtaXR0aW5nQ2VsbHMsIGxpdENlbGxzLCBkb25lQ2VsbHMpO1xuICAgICAgICAgICAgaWYgKGkgKyAxID09IHRoaXMuX29wdGlvbnMucGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IC8qIG5vdCBmb3IgdGhlIGxhc3QgcGFzcyAqL1xuICAgICAgICAgICAgZW1pdHRpbmdDZWxscyA9IHRoaXMuX2NvbXB1dGVFbWl0dGVycyhsaXRDZWxscywgZG9uZUNlbGxzKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBsaXRLZXkgaW4gbGl0Q2VsbHMpIHsgLyogbGV0IHRoZSB1c2VyIGtub3cgd2hhdCBhbmQgaG93IGlzIGxpdCAqL1xuICAgICAgICAgICAgbGV0IHBhcnRzID0gbGl0S2V5LnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgIGxldCB4ID0gcGFyc2VJbnQocGFydHNbMF0pO1xuICAgICAgICAgICAgbGV0IHkgPSBwYXJzZUludChwYXJ0c1sxXSk7XG4gICAgICAgICAgICBsaWdodGluZ0NhbGxiYWNrKHgsIHksIGxpdENlbGxzW2xpdEtleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIG9uZSBpdGVyYXRpb24gZnJvbSBhbGwgZW1pdHRpbmcgY2VsbHNcbiAgICAgKiBAcGFyYW0gZW1pdHRpbmdDZWxscyBUaGVzZSBlbWl0IGxpZ2h0XG4gICAgICogQHBhcmFtIGxpdENlbGxzIEFkZCBwcm9qZWN0ZWQgbGlnaHQgdG8gdGhlc2VcbiAgICAgKiBAcGFyYW0gZG9uZUNlbGxzIFRoZXNlIGFscmVhZHkgZW1pdHRlZCwgZm9yYmlkIHRoZW0gZnJvbSBmdXJ0aGVyIGNhbGN1bGF0aW9uc1xuICAgICAqL1xuICAgIF9lbWl0TGlnaHQoZW1pdHRpbmdDZWxscywgbGl0Q2VsbHMsIGRvbmVDZWxscykge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZW1pdHRpbmdDZWxscykge1xuICAgICAgICAgICAgbGV0IHBhcnRzID0ga2V5LnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgIGxldCB4ID0gcGFyc2VJbnQocGFydHNbMF0pO1xuICAgICAgICAgICAgbGV0IHkgPSBwYXJzZUludChwYXJ0c1sxXSk7XG4gICAgICAgICAgICB0aGlzLl9lbWl0TGlnaHRGcm9tQ2VsbCh4LCB5LCBlbWl0dGluZ0NlbGxzW2tleV0sIGxpdENlbGxzKTtcbiAgICAgICAgICAgIGRvbmVDZWxsc1trZXldID0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJlcGFyZSBhIGxpc3Qgb2YgZW1pdHRlcnMgZm9yIG5leHQgcGFzc1xuICAgICAqL1xuICAgIF9jb21wdXRlRW1pdHRlcnMobGl0Q2VsbHMsIGRvbmVDZWxscykge1xuICAgICAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBsaXRDZWxscykge1xuICAgICAgICAgICAgaWYgKGtleSBpbiBkb25lQ2VsbHMpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gLyogYWxyZWFkeSBlbWl0dGVkICovXG4gICAgICAgICAgICBsZXQgY29sb3IgPSBsaXRDZWxsc1trZXldO1xuICAgICAgICAgICAgbGV0IHJlZmxlY3Rpdml0eTtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gdGhpcy5fcmVmbGVjdGl2aXR5Q2FjaGUpIHtcbiAgICAgICAgICAgICAgICByZWZsZWN0aXZpdHkgPSB0aGlzLl9yZWZsZWN0aXZpdHlDYWNoZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcnRzID0ga2V5LnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHBhcnNlSW50KHBhcnRzWzBdKTtcbiAgICAgICAgICAgICAgICBsZXQgeSA9IHBhcnNlSW50KHBhcnRzWzFdKTtcbiAgICAgICAgICAgICAgICByZWZsZWN0aXZpdHkgPSB0aGlzLl9yZWZsZWN0aXZpdHlDYWxsYmFjayh4LCB5KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWZsZWN0aXZpdHlDYWNoZVtrZXldID0gcmVmbGVjdGl2aXR5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlZmxlY3Rpdml0eSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IC8qIHdpbGwgbm90IHJlZmxlY3QgYXQgYWxsICovXG4gICAgICAgICAgICAvKiBjb21wdXRlIGVtaXNzaW9uIGNvbG9yICovXG4gICAgICAgICAgICBsZXQgZW1pc3Npb24gPSBbMCwgMCwgMF07XG4gICAgICAgICAgICBsZXQgaW50ZW5zaXR5ID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcnQgPSBNYXRoLnJvdW5kKGNvbG9yW2ldICogcmVmbGVjdGl2aXR5KTtcbiAgICAgICAgICAgICAgICBlbWlzc2lvbltpXSA9IHBhcnQ7XG4gICAgICAgICAgICAgICAgaW50ZW5zaXR5ICs9IHBhcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW50ZW5zaXR5ID4gdGhpcy5fb3B0aW9ucy5lbWlzc2lvblRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gZW1pc3Npb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBvbmUgaXRlcmF0aW9uIGZyb20gb25lIGNlbGxcbiAgICAgKi9cbiAgICBfZW1pdExpZ2h0RnJvbUNlbGwoeCwgeSwgY29sb3IsIGxpdENlbGxzKSB7XG4gICAgICAgIGxldCBrZXkgPSB4ICsgXCIsXCIgKyB5O1xuICAgICAgICBsZXQgZm92O1xuICAgICAgICBpZiAoa2V5IGluIHRoaXMuX2ZvdkNhY2hlKSB7XG4gICAgICAgICAgICBmb3YgPSB0aGlzLl9mb3ZDYWNoZVtrZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm92ID0gdGhpcy5fdXBkYXRlRk9WKHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGZvdktleSBpbiBmb3YpIHtcbiAgICAgICAgICAgIGxldCBmb3JtRmFjdG9yID0gZm92W2ZvdktleV07XG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgaWYgKGZvdktleSBpbiBsaXRDZWxscykgeyAvKiBhbHJlYWR5IGxpdCAqL1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGxpdENlbGxzW2ZvdktleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLyogbmV3bHkgbGl0ICovXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gWzAsIDAsIDBdO1xuICAgICAgICAgICAgICAgIGxpdENlbGxzW2ZvdktleV0gPSByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtpXSArPSBNYXRoLnJvdW5kKGNvbG9yW2ldICogZm9ybUZhY3Rvcik7XG4gICAgICAgICAgICB9IC8qIGFkZCBsaWdodCBjb2xvciAqL1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIEZPViAoXCJmb3JtIGZhY3RvclwiKSBmb3IgYSBwb3RlbnRpYWwgbGlnaHQgc291cmNlIGF0IFt4LHldXG4gICAgICovXG4gICAgX3VwZGF0ZUZPVih4LCB5KSB7XG4gICAgICAgIGxldCBrZXkxID0geCArIFwiLFwiICsgeTtcbiAgICAgICAgbGV0IGNhY2hlID0ge307XG4gICAgICAgIHRoaXMuX2ZvdkNhY2hlW2tleTFdID0gY2FjaGU7XG4gICAgICAgIGxldCByYW5nZSA9IHRoaXMuX29wdGlvbnMucmFuZ2U7XG4gICAgICAgIGZ1bmN0aW9uIGNiKHgsIHksIHIsIHZpcykge1xuICAgICAgICAgICAgbGV0IGtleTIgPSB4ICsgXCIsXCIgKyB5O1xuICAgICAgICAgICAgbGV0IGZvcm1GYWN0b3IgPSB2aXMgKiAoMSAtIHIgLyByYW5nZSk7XG4gICAgICAgICAgICBpZiAoZm9ybUZhY3RvciA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FjaGVba2V5Ml0gPSBmb3JtRmFjdG9yO1xuICAgICAgICB9XG4gICAgICAgIDtcbiAgICAgICAgdGhpcy5fZm92LmNvbXB1dGUoeCwgeSwgcmFuZ2UsIGNiLmJpbmQodGhpcykpO1xuICAgICAgICByZXR1cm4gY2FjaGU7XG4gICAgfVxufVxuIiwiaW1wb3J0IE1hcCBmcm9tIFwiLi9tYXAuanNcIjtcbi8qKlxuICogQGNsYXNzIFNpbXBsZSBlbXB0eSByZWN0YW5ndWxhciByb29tXG4gKiBAYXVnbWVudHMgUk9ULk1hcFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcmVuYSBleHRlbmRzIE1hcCB7XG4gICAgY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCB3ID0gdGhpcy5fd2lkdGggLSAxO1xuICAgICAgICBsZXQgaCA9IHRoaXMuX2hlaWdodCAtIDE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHc7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPD0gaDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVtcHR5ID0gKGkgJiYgaiAmJiBpIDwgdyAmJiBqIDwgaCk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgZW1wdHkgPyAwIDogMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IE1hcCBmcm9tIFwiLi9tYXAuanNcIjtcbmltcG9ydCB7IERJUlMgfSBmcm9tIFwiLi4vY29uc3RhbnRzLmpzXCI7XG5pbXBvcnQgUk5HIGZyb20gXCIuLi9ybmcuanNcIjtcbjtcbi8qKlxuICogQGNsYXNzIENlbGx1bGFyIGF1dG9tYXRvbiBtYXAgZ2VuZXJhdG9yXG4gKiBAYXVnbWVudHMgUk9ULk1hcFxuICogQHBhcmFtIHtpbnR9IFt3aWR0aD1ST1QuREVGQVVMVF9XSURUSF1cbiAqIEBwYXJhbSB7aW50fSBbaGVpZ2h0PVJPVC5ERUZBVUxUX0hFSUdIVF1cbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gT3B0aW9uc1xuICogQHBhcmFtIHtpbnRbXX0gW29wdGlvbnMuYm9ybl0gTGlzdCBvZiBuZWlnaGJvciBjb3VudHMgZm9yIGEgbmV3IGNlbGwgdG8gYmUgYm9ybiBpbiBlbXB0eSBzcGFjZVxuICogQHBhcmFtIHtpbnRbXX0gW29wdGlvbnMuc3Vydml2ZV0gTGlzdCBvZiBuZWlnaGJvciBjb3VudHMgZm9yIGFuIGV4aXN0aW5nICBjZWxsIHRvIHN1cnZpdmVcbiAqIEBwYXJhbSB7aW50fSBbb3B0aW9ucy50b3BvbG9neV0gVG9wb2xvZ3kgNCBvciA2IG9yIDhcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VsbHVsYXIgZXh0ZW5kcyBNYXAge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcih3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGJvcm46IFs1LCA2LCA3LCA4XSxcbiAgICAgICAgICAgIHN1cnZpdmU6IFs0LCA1LCA2LCA3LCA4XSxcbiAgICAgICAgICAgIHRvcG9sb2d5OiA4XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fZGlycyA9IERJUlNbdGhpcy5fb3B0aW9ucy50b3BvbG9neV07XG4gICAgICAgIHRoaXMuX21hcCA9IHRoaXMuX2ZpbGxNYXAoMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbGwgdGhlIG1hcCB3aXRoIHJhbmRvbSB2YWx1ZXNcbiAgICAgKiBAcGFyYW0ge2Zsb2F0fSBwcm9iYWJpbGl0eSBQcm9iYWJpbGl0eSBmb3IgYSBjZWxsIHRvIGJlY29tZSBhbGl2ZTsgMCA9IGFsbCBlbXB0eSwgMSA9IGFsbCBmdWxsXG4gICAgICovXG4gICAgcmFuZG9taXplKHByb2JhYmlsaXR5KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcFtpXVtqXSA9IChSTkcuZ2V0VW5pZm9ybSgpIDwgcHJvYmFiaWxpdHkgPyAxIDogMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoYW5nZSBvcHRpb25zLlxuICAgICAqIEBzZWUgUk9ULk1hcC5DZWxsdWxhclxuICAgICAqL1xuICAgIHNldE9wdGlvbnMob3B0aW9ucykgeyBPYmplY3QuYXNzaWduKHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpOyB9XG4gICAgc2V0KHgsIHksIHZhbHVlKSB7IHRoaXMuX21hcFt4XVt5XSA9IHZhbHVlOyB9XG4gICAgY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBuZXdNYXAgPSB0aGlzLl9maWxsTWFwKDApO1xuICAgICAgICBsZXQgYm9ybiA9IHRoaXMuX29wdGlvbnMuYm9ybjtcbiAgICAgICAgbGV0IHN1cnZpdmUgPSB0aGlzLl9vcHRpb25zLnN1cnZpdmU7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgIGxldCB3aWR0aFN0ZXAgPSAxO1xuICAgICAgICAgICAgbGV0IHdpZHRoU3RhcnQgPSAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kgPT0gNikge1xuICAgICAgICAgICAgICAgIHdpZHRoU3RlcCA9IDI7XG4gICAgICAgICAgICAgICAgd2lkdGhTdGFydCA9IGogJSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHdpZHRoU3RhcnQ7IGkgPCB0aGlzLl93aWR0aDsgaSArPSB3aWR0aFN0ZXApIHtcbiAgICAgICAgICAgICAgICBsZXQgY3VyID0gdGhpcy5fbWFwW2ldW2pdO1xuICAgICAgICAgICAgICAgIGxldCBuY291bnQgPSB0aGlzLl9nZXROZWlnaGJvcnMoaSwgaik7XG4gICAgICAgICAgICAgICAgaWYgKGN1ciAmJiBzdXJ2aXZlLmluZGV4T2YobmNvdW50KSAhPSAtMSkgeyAvKiBzdXJ2aXZlICovXG4gICAgICAgICAgICAgICAgICAgIG5ld01hcFtpXVtqXSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFjdXIgJiYgYm9ybi5pbmRleE9mKG5jb3VudCkgIT0gLTEpIHsgLyogYm9ybiAqL1xuICAgICAgICAgICAgICAgICAgICBuZXdNYXBbaV1bal0gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYXAgPSBuZXdNYXA7XG4gICAgICAgIGNhbGxiYWNrICYmIHRoaXMuX3NlcnZpY2VDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfVxuICAgIF9zZXJ2aWNlQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgbGV0IHdpZHRoU3RlcCA9IDE7XG4gICAgICAgICAgICBsZXQgd2lkdGhTdGFydCA9IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50b3BvbG9neSA9PSA2KSB7XG4gICAgICAgICAgICAgICAgd2lkdGhTdGVwID0gMjtcbiAgICAgICAgICAgICAgICB3aWR0aFN0YXJ0ID0gaiAlIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gd2lkdGhTdGFydDsgaSA8IHRoaXMuX3dpZHRoOyBpICs9IHdpZHRoU3RlcCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGksIGosIHRoaXMuX21hcFtpXVtqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IG5laWdoYm9yIGNvdW50IGF0IFtpLGpdIGluIHRoaXMuX21hcFxuICAgICAqL1xuICAgIF9nZXROZWlnaGJvcnMoY3gsIGN5KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkaXIgPSB0aGlzLl9kaXJzW2ldO1xuICAgICAgICAgICAgbGV0IHggPSBjeCArIGRpclswXTtcbiAgICAgICAgICAgIGxldCB5ID0gY3kgKyBkaXJbMV07XG4gICAgICAgICAgICBpZiAoeCA8IDAgfHwgeCA+PSB0aGlzLl93aWR0aCB8fCB5IDwgMCB8fCB5ID49IHRoaXMuX2hlaWdodCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0ICs9ICh0aGlzLl9tYXBbeF1beV0gPT0gMSA/IDEgOiAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYWtlIHN1cmUgZXZlcnkgbm9uLXdhbGwgc3BhY2UgaXMgYWNjZXNzaWJsZS5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayB0byBjYWxsIHRvIGRpc3BsYXkgbWFwIHdoZW4gZG9cbiAgICAgKiBAcGFyYW0ge2ludH0gdmFsdWUgdG8gY29uc2lkZXIgZW1wdHkgc3BhY2UgLSBkZWZhdWx0cyB0byAwXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgdG8gY2FsbCB3aGVuIGEgbmV3IGNvbm5lY3Rpb24gaXMgbWFkZVxuICAgICAqL1xuICAgIGNvbm5lY3QoY2FsbGJhY2ssIHZhbHVlLCBjb25uZWN0aW9uQ2FsbGJhY2spIHtcbiAgICAgICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgICAgIHZhbHVlID0gMDtcbiAgICAgICAgbGV0IGFsbEZyZWVTcGFjZSA9IFtdO1xuICAgICAgICBsZXQgbm90Q29ubmVjdGVkID0ge307XG4gICAgICAgIC8vIGZpbmQgYWxsIGZyZWUgc3BhY2VcbiAgICAgICAgbGV0IHdpZHRoU3RlcCA9IDE7XG4gICAgICAgIGxldCB3aWR0aFN0YXJ0cyA9IFswLCAwXTtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kgPT0gNikge1xuICAgICAgICAgICAgd2lkdGhTdGVwID0gMjtcbiAgICAgICAgICAgIHdpZHRoU3RhcnRzID0gWzAsIDFdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5faGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSB3aWR0aFN0YXJ0c1t5ICUgMl07IHggPCB0aGlzLl93aWR0aDsgeCArPSB3aWR0aFN0ZXApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZnJlZVNwYWNlKHgsIHksIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcCA9IFt4LCB5XTtcbiAgICAgICAgICAgICAgICAgICAgbm90Q29ubmVjdGVkW3RoaXMuX3BvaW50S2V5KHApXSA9IHA7XG4gICAgICAgICAgICAgICAgICAgIGFsbEZyZWVTcGFjZS5wdXNoKFt4LCB5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBzdGFydCA9IGFsbEZyZWVTcGFjZVtSTkcuZ2V0VW5pZm9ybUludCgwLCBhbGxGcmVlU3BhY2UubGVuZ3RoIC0gMSldO1xuICAgICAgICBsZXQga2V5ID0gdGhpcy5fcG9pbnRLZXkoc3RhcnQpO1xuICAgICAgICBsZXQgY29ubmVjdGVkID0ge307XG4gICAgICAgIGNvbm5lY3RlZFtrZXldID0gc3RhcnQ7XG4gICAgICAgIGRlbGV0ZSBub3RDb25uZWN0ZWRba2V5XTtcbiAgICAgICAgLy8gZmluZCB3aGF0J3MgY29ubmVjdGVkIHRvIHRoZSBzdGFydGluZyBwb2ludFxuICAgICAgICB0aGlzLl9maW5kQ29ubmVjdGVkKGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkLCBbc3RhcnRdLCBmYWxzZSwgdmFsdWUpO1xuICAgICAgICB3aGlsZSAoT2JqZWN0LmtleXMobm90Q29ubmVjdGVkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBmaW5kIHR3byBwb2ludHMgZnJvbSBub3RDb25uZWN0ZWQgdG8gY29ubmVjdGVkXG4gICAgICAgICAgICBsZXQgcCA9IHRoaXMuX2dldEZyb21Ubyhjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCk7XG4gICAgICAgICAgICBsZXQgZnJvbSA9IHBbMF07IC8vIG5vdENvbm5lY3RlZFxuICAgICAgICAgICAgbGV0IHRvID0gcFsxXTsgLy8gY29ubmVjdGVkXG4gICAgICAgICAgICAvLyBmaW5kIGV2ZXJ5dGhpbmcgY29ubmVjdGVkIHRvIHRoZSBzdGFydGluZyBwb2ludFxuICAgICAgICAgICAgbGV0IGxvY2FsID0ge307XG4gICAgICAgICAgICBsb2NhbFt0aGlzLl9wb2ludEtleShmcm9tKV0gPSBmcm9tO1xuICAgICAgICAgICAgdGhpcy5fZmluZENvbm5lY3RlZChsb2NhbCwgbm90Q29ubmVjdGVkLCBbZnJvbV0sIHRydWUsIHZhbHVlKTtcbiAgICAgICAgICAgIC8vIGNvbm5lY3QgdG8gYSBjb25uZWN0ZWQgY2VsbFxuICAgICAgICAgICAgbGV0IHR1bm5lbEZuID0gKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kgPT0gNiA/IHRoaXMuX3R1bm5lbFRvQ29ubmVjdGVkNiA6IHRoaXMuX3R1bm5lbFRvQ29ubmVjdGVkKTtcbiAgICAgICAgICAgIHR1bm5lbEZuLmNhbGwodGhpcywgdG8sIGZyb20sIGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkLCB2YWx1ZSwgY29ubmVjdGlvbkNhbGxiYWNrKTtcbiAgICAgICAgICAgIC8vIG5vdyBhbGwgb2YgbG9jYWwgaXMgY29ubmVjdGVkXG4gICAgICAgICAgICBmb3IgKGxldCBrIGluIGxvY2FsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBwID0gbG9jYWxba107XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwW3BwWzBdXVtwcFsxXV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWRba10gPSBwcDtcbiAgICAgICAgICAgICAgICBkZWxldGUgbm90Q29ubmVjdGVkW2tdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrICYmIHRoaXMuX3NlcnZpY2VDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmQgcmFuZG9tIHBvaW50cyB0byBjb25uZWN0LiBTZWFyY2ggZm9yIHRoZSBjbG9zZXN0IHBvaW50IGluIHRoZSBsYXJnZXIgc3BhY2UuXG4gICAgICogVGhpcyBpcyB0byBtaW5pbWl6ZSB0aGUgbGVuZ3RoIG9mIHRoZSBwYXNzYWdlIHdoaWxlIG1haW50YWluaW5nIGdvb2QgcGVyZm9ybWFuY2UuXG4gICAgICovXG4gICAgX2dldEZyb21Ubyhjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCkge1xuICAgICAgICBsZXQgZnJvbSA9IFswLCAwXSwgdG8gPSBbMCwgMF0sIGQ7XG4gICAgICAgIGxldCBjb25uZWN0ZWRLZXlzID0gT2JqZWN0LmtleXMoY29ubmVjdGVkKTtcbiAgICAgICAgbGV0IG5vdENvbm5lY3RlZEtleXMgPSBPYmplY3Qua2V5cyhub3RDb25uZWN0ZWQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNvbm5lY3RlZEtleXMubGVuZ3RoIDwgbm90Q29ubmVjdGVkS2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5cyA9IGNvbm5lY3RlZEtleXM7XG4gICAgICAgICAgICAgICAgdG8gPSBjb25uZWN0ZWRba2V5c1tSTkcuZ2V0VW5pZm9ybUludCgwLCBrZXlzLmxlbmd0aCAtIDEpXV07XG4gICAgICAgICAgICAgICAgZnJvbSA9IHRoaXMuX2dldENsb3Nlc3QodG8sIG5vdENvbm5lY3RlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5cyA9IG5vdENvbm5lY3RlZEtleXM7XG4gICAgICAgICAgICAgICAgZnJvbSA9IG5vdENvbm5lY3RlZFtrZXlzW1JORy5nZXRVbmlmb3JtSW50KDAsIGtleXMubGVuZ3RoIC0gMSldXTtcbiAgICAgICAgICAgICAgICB0byA9IHRoaXMuX2dldENsb3Nlc3QoZnJvbSwgY29ubmVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGQgPSAoZnJvbVswXSAtIHRvWzBdKSAqIChmcm9tWzBdIC0gdG9bMF0pICsgKGZyb21bMV0gLSB0b1sxXSkgKiAoZnJvbVsxXSAtIHRvWzFdKTtcbiAgICAgICAgICAgIGlmIChkIDwgNjQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj4+PiBjb25uZWN0ZWQ9XCIgKyB0byArIFwiIG5vdENvbm5lY3RlZD1cIiArIGZyb20gKyBcIiBkaXN0PVwiICsgZCk7XG4gICAgICAgIHJldHVybiBbZnJvbSwgdG9dO1xuICAgIH1cbiAgICBfZ2V0Q2xvc2VzdChwb2ludCwgc3BhY2UpIHtcbiAgICAgICAgbGV0IG1pblBvaW50ID0gbnVsbDtcbiAgICAgICAgbGV0IG1pbkRpc3QgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBrIGluIHNwYWNlKSB7XG4gICAgICAgICAgICBsZXQgcCA9IHNwYWNlW2tdO1xuICAgICAgICAgICAgbGV0IGQgPSAocFswXSAtIHBvaW50WzBdKSAqIChwWzBdIC0gcG9pbnRbMF0pICsgKHBbMV0gLSBwb2ludFsxXSkgKiAocFsxXSAtIHBvaW50WzFdKTtcbiAgICAgICAgICAgIGlmIChtaW5EaXN0ID09IG51bGwgfHwgZCA8IG1pbkRpc3QpIHtcbiAgICAgICAgICAgICAgICBtaW5EaXN0ID0gZDtcbiAgICAgICAgICAgICAgICBtaW5Qb2ludCA9IHA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pblBvaW50O1xuICAgIH1cbiAgICBfZmluZENvbm5lY3RlZChjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCwgc3RhY2ssIGtlZXBOb3RDb25uZWN0ZWQsIHZhbHVlKSB7XG4gICAgICAgIHdoaWxlIChzdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgcCA9IHN0YWNrLnNwbGljZSgwLCAxKVswXTtcbiAgICAgICAgICAgIGxldCB0ZXN0cztcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5ID09IDYpIHtcbiAgICAgICAgICAgICAgICB0ZXN0cyA9IFtcbiAgICAgICAgICAgICAgICAgICAgW3BbMF0gKyAyLCBwWzFdXSxcbiAgICAgICAgICAgICAgICAgICAgW3BbMF0gKyAxLCBwWzFdIC0gMV0sXG4gICAgICAgICAgICAgICAgICAgIFtwWzBdIC0gMSwgcFsxXSAtIDFdLFxuICAgICAgICAgICAgICAgICAgICBbcFswXSAtIDIsIHBbMV1dLFxuICAgICAgICAgICAgICAgICAgICBbcFswXSAtIDEsIHBbMV0gKyAxXSxcbiAgICAgICAgICAgICAgICAgICAgW3BbMF0gKyAxLCBwWzFdICsgMV0sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRlc3RzID0gW1xuICAgICAgICAgICAgICAgICAgICBbcFswXSArIDEsIHBbMV1dLFxuICAgICAgICAgICAgICAgICAgICBbcFswXSAtIDEsIHBbMV1dLFxuICAgICAgICAgICAgICAgICAgICBbcFswXSwgcFsxXSArIDFdLFxuICAgICAgICAgICAgICAgICAgICBbcFswXSwgcFsxXSAtIDFdXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVzdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gdGhpcy5fcG9pbnRLZXkodGVzdHNbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChjb25uZWN0ZWRba2V5XSA9PSBudWxsICYmIHRoaXMuX2ZyZWVTcGFjZSh0ZXN0c1tpXVswXSwgdGVzdHNbaV1bMV0sIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25uZWN0ZWRba2V5XSA9IHRlc3RzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWtlZXBOb3RDb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBub3RDb25uZWN0ZWRba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKHRlc3RzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3R1bm5lbFRvQ29ubmVjdGVkKHRvLCBmcm9tLCBjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCwgdmFsdWUsIGNvbm5lY3Rpb25DYWxsYmFjaykge1xuICAgICAgICBsZXQgYSwgYjtcbiAgICAgICAgaWYgKGZyb21bMF0gPCB0b1swXSkge1xuICAgICAgICAgICAgYSA9IGZyb207XG4gICAgICAgICAgICBiID0gdG87XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhID0gdG87XG4gICAgICAgICAgICBiID0gZnJvbTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCB4eCA9IGFbMF07IHh4IDw9IGJbMF07IHh4KyspIHtcbiAgICAgICAgICAgIHRoaXMuX21hcFt4eF1bYVsxXV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGxldCBwID0gW3h4LCBhWzFdXTtcbiAgICAgICAgICAgIGxldCBwa2V5ID0gdGhpcy5fcG9pbnRLZXkocCk7XG4gICAgICAgICAgICBjb25uZWN0ZWRbcGtleV0gPSBwO1xuICAgICAgICAgICAgZGVsZXRlIG5vdENvbm5lY3RlZFtwa2V5XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29ubmVjdGlvbkNhbGxiYWNrICYmIGFbMF0gPCBiWzBdKSB7XG4gICAgICAgICAgICBjb25uZWN0aW9uQ2FsbGJhY2soYSwgW2JbMF0sIGFbMV1dKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB4IGlzIG5vdyBmaXhlZFxuICAgICAgICBsZXQgeCA9IGJbMF07XG4gICAgICAgIGlmIChmcm9tWzFdIDwgdG9bMV0pIHtcbiAgICAgICAgICAgIGEgPSBmcm9tO1xuICAgICAgICAgICAgYiA9IHRvO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYSA9IHRvO1xuICAgICAgICAgICAgYiA9IGZyb207XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgeXkgPSBhWzFdOyB5eSA8IGJbMV07IHl5KyspIHtcbiAgICAgICAgICAgIHRoaXMuX21hcFt4XVt5eV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGxldCBwID0gW3gsIHl5XTtcbiAgICAgICAgICAgIGxldCBwa2V5ID0gdGhpcy5fcG9pbnRLZXkocCk7XG4gICAgICAgICAgICBjb25uZWN0ZWRbcGtleV0gPSBwO1xuICAgICAgICAgICAgZGVsZXRlIG5vdENvbm5lY3RlZFtwa2V5XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29ubmVjdGlvbkNhbGxiYWNrICYmIGFbMV0gPCBiWzFdKSB7XG4gICAgICAgICAgICBjb25uZWN0aW9uQ2FsbGJhY2soW2JbMF0sIGFbMV1dLCBbYlswXSwgYlsxXV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIF90dW5uZWxUb0Nvbm5lY3RlZDYodG8sIGZyb20sIGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkLCB2YWx1ZSwgY29ubmVjdGlvbkNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBhLCBiO1xuICAgICAgICBpZiAoZnJvbVswXSA8IHRvWzBdKSB7XG4gICAgICAgICAgICBhID0gZnJvbTtcbiAgICAgICAgICAgIGIgPSB0bztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGEgPSB0bztcbiAgICAgICAgICAgIGIgPSBmcm9tO1xuICAgICAgICB9XG4gICAgICAgIC8vIHR1bm5lbCBkaWFnb25hbGx5IHVudGlsIGhvcml6b250YWxseSBsZXZlbFxuICAgICAgICBsZXQgeHggPSBhWzBdO1xuICAgICAgICBsZXQgeXkgPSBhWzFdO1xuICAgICAgICB3aGlsZSAoISh4eCA9PSBiWzBdICYmIHl5ID09IGJbMV0pKSB7XG4gICAgICAgICAgICBsZXQgc3RlcFdpZHRoID0gMjtcbiAgICAgICAgICAgIGlmICh5eSA8IGJbMV0pIHtcbiAgICAgICAgICAgICAgICB5eSsrO1xuICAgICAgICAgICAgICAgIHN0ZXBXaWR0aCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh5eSA+IGJbMV0pIHtcbiAgICAgICAgICAgICAgICB5eS0tO1xuICAgICAgICAgICAgICAgIHN0ZXBXaWR0aCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoeHggPCBiWzBdKSB7XG4gICAgICAgICAgICAgICAgeHggKz0gc3RlcFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoeHggPiBiWzBdKSB7XG4gICAgICAgICAgICAgICAgeHggLT0gc3RlcFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYlsxXSAlIDIpIHtcbiAgICAgICAgICAgICAgICAvLyBXb24ndCBzdGVwIG91dHNpZGUgbWFwIGlmIGRlc3RpbmF0aW9uIG9uIGlzIG1hcCdzIHJpZ2h0IGVkZ2VcbiAgICAgICAgICAgICAgICB4eCAtPSBzdGVwV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBkaXR0byBmb3IgbGVmdCBlZGdlXG4gICAgICAgICAgICAgICAgeHggKz0gc3RlcFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbWFwW3h4XVt5eV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGxldCBwID0gW3h4LCB5eV07XG4gICAgICAgICAgICBsZXQgcGtleSA9IHRoaXMuX3BvaW50S2V5KHApO1xuICAgICAgICAgICAgY29ubmVjdGVkW3BrZXldID0gcDtcbiAgICAgICAgICAgIGRlbGV0ZSBub3RDb25uZWN0ZWRbcGtleV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbm5lY3Rpb25DYWxsYmFjaykge1xuICAgICAgICAgICAgY29ubmVjdGlvbkNhbGxiYWNrKGZyb20sIHRvKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZnJlZVNwYWNlKHgsIHksIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB4ID49IDAgJiYgeCA8IHRoaXMuX3dpZHRoICYmIHkgPj0gMCAmJiB5IDwgdGhpcy5faGVpZ2h0ICYmIHRoaXMuX21hcFt4XVt5XSA9PSB2YWx1ZTtcbiAgICB9XG4gICAgX3BvaW50S2V5KHApIHsgcmV0dXJuIHBbMF0gKyBcIi5cIiArIHBbMV07IH1cbn1cbiIsImltcG9ydCBEdW5nZW9uIGZyb20gXCIuL2R1bmdlb24uanNcIjtcbmltcG9ydCB7IFJvb20sIENvcnJpZG9yIH0gZnJvbSBcIi4vZmVhdHVyZXMuanNcIjtcbmltcG9ydCBSTkcgZnJvbSBcIi4uL3JuZy5qc1wiO1xuaW1wb3J0IHsgRElSUyB9IGZyb20gXCIuLi9jb25zdGFudHMuanNcIjtcbmNvbnN0IEZFQVRVUkVTID0ge1xuICAgIFwicm9vbVwiOiBSb29tLFxuICAgIFwiY29ycmlkb3JcIjogQ29ycmlkb3Jcbn07XG4vKipcbiAqIFJhbmRvbSBkdW5nZW9uIGdlbmVyYXRvciB1c2luZyBodW1hbi1saWtlIGRpZ2dpbmcgcGF0dGVybnMuXG4gKiBIZWF2aWx5IGJhc2VkIG9uIE1pa2UgQW5kZXJzb24ncyBpZGVhcyBmcm9tIHRoZSBcIlR5cmFudFwiIGFsZ28sIG1lbnRpb25lZCBhdFxuICogaHR0cDovL3d3dy5yb2d1ZWJhc2luLnJvZ3VlbGlrZWRldmVsb3BtZW50Lm9yZy9pbmRleC5waHA/dGl0bGU9RHVuZ2Vvbi1CdWlsZGluZ19BbGdvcml0aG0uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpZ2dlciBleHRlbmRzIER1bmdlb24ge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcih3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgcm9vbVdpZHRoOiBbMywgOV0sXG4gICAgICAgICAgICByb29tSGVpZ2h0OiBbMywgNV0sXG4gICAgICAgICAgICBjb3JyaWRvckxlbmd0aDogWzMsIDEwXSxcbiAgICAgICAgICAgIGR1Z1BlcmNlbnRhZ2U6IDAuMixcbiAgICAgICAgICAgIHRpbWVMaW1pdDogMTAwMCAvKiB3ZSBzdG9wIGFmdGVyIHRoaXMgbXVjaCB0aW1lIGhhcyBwYXNzZWQgKG1zZWMpICovXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9mZWF0dXJlcyA9IHtcbiAgICAgICAgICAgIFwicm9vbVwiOiA0LFxuICAgICAgICAgICAgXCJjb3JyaWRvclwiOiA0XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX21hcCA9IFtdO1xuICAgICAgICB0aGlzLl9mZWF0dXJlQXR0ZW1wdHMgPSAyMDsgLyogaG93IG1hbnkgdGltZXMgZG8gd2UgdHJ5IHRvIGNyZWF0ZSBhIGZlYXR1cmUgb24gYSBzdWl0YWJsZSB3YWxsICovXG4gICAgICAgIHRoaXMuX3dhbGxzID0ge307IC8qIHRoZXNlIGFyZSBhdmFpbGFibGUgZm9yIGRpZ2dpbmcgKi9cbiAgICAgICAgdGhpcy5fZHVnID0gMDtcbiAgICAgICAgdGhpcy5fZGlnQ2FsbGJhY2sgPSB0aGlzLl9kaWdDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9jYW5CZUR1Z0NhbGxiYWNrID0gdGhpcy5fY2FuQmVEdWdDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9pc1dhbGxDYWxsYmFjayA9IHRoaXMuX2lzV2FsbENhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX3ByaW9yaXR5V2FsbENhbGxiYWNrID0gdGhpcy5fcHJpb3JpdHlXYWxsQ2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICB9XG4gICAgY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuX3Jvb21zID0gW107XG4gICAgICAgIHRoaXMuX2NvcnJpZG9ycyA9IFtdO1xuICAgICAgICB0aGlzLl9tYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xuICAgICAgICB0aGlzLl93YWxscyA9IHt9O1xuICAgICAgICB0aGlzLl9kdWcgPSAwO1xuICAgICAgICBsZXQgYXJlYSA9ICh0aGlzLl93aWR0aCAtIDIpICogKHRoaXMuX2hlaWdodCAtIDIpO1xuICAgICAgICB0aGlzLl9maXJzdFJvb20oKTtcbiAgICAgICAgbGV0IHQxID0gRGF0ZS5ub3coKTtcbiAgICAgICAgbGV0IHByaW9yaXR5V2FsbHM7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHByaW9yaXR5V2FsbHMgPSAwO1xuICAgICAgICAgICAgbGV0IHQyID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGlmICh0MiAtIHQxID4gdGhpcy5fb3B0aW9ucy50aW1lTGltaXQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIGZpbmQgYSBnb29kIHdhbGwgKi9cbiAgICAgICAgICAgIGxldCB3YWxsID0gdGhpcy5fZmluZFdhbGwoKTtcbiAgICAgICAgICAgIGlmICghd2FsbCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSAvKiBubyBtb3JlIHdhbGxzICovXG4gICAgICAgICAgICBsZXQgcGFydHMgPSB3YWxsLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgIGxldCB4ID0gcGFyc2VJbnQocGFydHNbMF0pO1xuICAgICAgICAgICAgbGV0IHkgPSBwYXJzZUludChwYXJ0c1sxXSk7XG4gICAgICAgICAgICBsZXQgZGlyID0gdGhpcy5fZ2V0RGlnZ2luZ0RpcmVjdGlvbih4LCB5KTtcbiAgICAgICAgICAgIGlmICghZGlyKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IC8qIHRoaXMgd2FsbCBpcyBub3Qgc3VpdGFibGUgKi9cbiAgICAgICAgICAgIC8vXHRcdGNvbnNvbGUubG9nKFwid2FsbFwiLCB4LCB5KTtcbiAgICAgICAgICAgIC8qIHRyeSBhZGRpbmcgYSBmZWF0dXJlICovXG4gICAgICAgICAgICBsZXQgZmVhdHVyZUF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBmZWF0dXJlQXR0ZW1wdHMrKztcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdHJ5RmVhdHVyZSh4LCB5LCBkaXJbMF0sIGRpclsxXSkpIHsgLyogZmVhdHVyZSBhZGRlZCAqL1xuICAgICAgICAgICAgICAgICAgICAvL2lmICh0aGlzLl9yb29tcy5sZW5ndGggKyB0aGlzLl9jb3JyaWRvcnMubGVuZ3RoID09IDIpIHsgdGhpcy5fcm9vbXNbMF0uYWRkRG9vcih4LCB5KTsgfSAvKiBmaXJzdCByb29tIG9maWNpYWxseSBoYXMgZG9vcnMgKi9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlU3Vycm91bmRpbmdXYWxscyh4LCB5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlU3Vycm91bmRpbmdXYWxscyh4IC0gZGlyWzBdLCB5IC0gZGlyWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSB3aGlsZSAoZmVhdHVyZUF0dGVtcHRzIDwgdGhpcy5fZmVhdHVyZUF0dGVtcHRzKTtcbiAgICAgICAgICAgIGZvciAobGV0IGlkIGluIHRoaXMuX3dhbGxzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3dhbGxzW2lkXSA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHlXYWxscysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAodGhpcy5fZHVnIC8gYXJlYSA8IHRoaXMuX29wdGlvbnMuZHVnUGVyY2VudGFnZSB8fCBwcmlvcml0eVdhbGxzKTsgLyogZml4bWUgbnVtYmVyIG9mIHByaW9yaXR5IHdhbGxzICovXG4gICAgICAgIHRoaXMuX2FkZERvb3JzKCk7XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhpLCBqLCB0aGlzLl9tYXBbaV1bal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl93YWxscyA9IHt9O1xuICAgICAgICB0aGlzLl9tYXAgPSBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIF9kaWdDYWxsYmFjayh4LCB5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT0gMCB8fCB2YWx1ZSA9PSAyKSB7IC8qIGVtcHR5ICovXG4gICAgICAgICAgICB0aGlzLl9tYXBbeF1beV0gPSAwO1xuICAgICAgICAgICAgdGhpcy5fZHVnKys7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8qIHdhbGwgKi9cbiAgICAgICAgICAgIHRoaXMuX3dhbGxzW3ggKyBcIixcIiArIHldID0gMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfaXNXYWxsQ2FsbGJhY2soeCwgeSkge1xuICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSB0aGlzLl93aWR0aCB8fCB5ID49IHRoaXMuX2hlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5fbWFwW3hdW3ldID09IDEpO1xuICAgIH1cbiAgICBfY2FuQmVEdWdDYWxsYmFjayh4LCB5KSB7XG4gICAgICAgIGlmICh4IDwgMSB8fCB5IDwgMSB8fCB4ICsgMSA+PSB0aGlzLl93aWR0aCB8fCB5ICsgMSA+PSB0aGlzLl9oZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMuX21hcFt4XVt5XSA9PSAxKTtcbiAgICB9XG4gICAgX3ByaW9yaXR5V2FsbENhbGxiYWNrKHgsIHkpIHsgdGhpcy5fd2FsbHNbeCArIFwiLFwiICsgeV0gPSAyOyB9XG4gICAgO1xuICAgIF9maXJzdFJvb20oKSB7XG4gICAgICAgIGxldCBjeCA9IE1hdGguZmxvb3IodGhpcy5fd2lkdGggLyAyKTtcbiAgICAgICAgbGV0IGN5ID0gTWF0aC5mbG9vcih0aGlzLl9oZWlnaHQgLyAyKTtcbiAgICAgICAgbGV0IHJvb20gPSBSb29tLmNyZWF0ZVJhbmRvbUNlbnRlcihjeCwgY3ksIHRoaXMuX29wdGlvbnMpO1xuICAgICAgICB0aGlzLl9yb29tcy5wdXNoKHJvb20pO1xuICAgICAgICByb29tLmNyZWF0ZSh0aGlzLl9kaWdDYWxsYmFjayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBhIHN1aXRhYmxlIHdhbGxcbiAgICAgKi9cbiAgICBfZmluZFdhbGwoKSB7XG4gICAgICAgIGxldCBwcmlvMSA9IFtdO1xuICAgICAgICBsZXQgcHJpbzIgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWQgaW4gdGhpcy5fd2FsbHMpIHtcbiAgICAgICAgICAgIGxldCBwcmlvID0gdGhpcy5fd2FsbHNbaWRdO1xuICAgICAgICAgICAgaWYgKHByaW8gPT0gMikge1xuICAgICAgICAgICAgICAgIHByaW8yLnB1c2goaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJpbzEucHVzaChpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGFyciA9IChwcmlvMi5sZW5ndGggPyBwcmlvMiA6IHByaW8xKTtcbiAgICAgICAgaWYgKCFhcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSAvKiBubyB3YWxscyA6LyAqL1xuICAgICAgICBsZXQgaWQgPSBSTkcuZ2V0SXRlbShhcnIuc29ydCgpKTsgLy8gc29ydCB0byBtYWtlIHRoZSBvcmRlciBkZXRlcm1pbmlzdGljXG4gICAgICAgIGRlbGV0ZSB0aGlzLl93YWxsc1tpZF07XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJpZXMgYWRkaW5nIGEgZmVhdHVyZVxuICAgICAqIEByZXR1cm5zIHtib29sfSB3YXMgdGhpcyBhIHN1Y2Nlc3NmdWwgdHJ5P1xuICAgICAqL1xuICAgIF90cnlGZWF0dXJlKHgsIHksIGR4LCBkeSkge1xuICAgICAgICBsZXQgZmVhdHVyZU5hbWUgPSBSTkcuZ2V0V2VpZ2h0ZWRWYWx1ZSh0aGlzLl9mZWF0dXJlcyk7XG4gICAgICAgIGxldCBjdG9yID0gRkVBVFVSRVNbZmVhdHVyZU5hbWVdO1xuICAgICAgICBsZXQgZmVhdHVyZSA9IGN0b3IuY3JlYXRlUmFuZG9tQXQoeCwgeSwgZHgsIGR5LCB0aGlzLl9vcHRpb25zKTtcbiAgICAgICAgaWYgKCFmZWF0dXJlLmlzVmFsaWQodGhpcy5faXNXYWxsQ2FsbGJhY2ssIHRoaXMuX2NhbkJlRHVnQ2FsbGJhY2spKSB7XG4gICAgICAgICAgICAvL1x0XHRjb25zb2xlLmxvZyhcIm5vdCB2YWxpZFwiKTtcbiAgICAgICAgICAgIC8vXHRcdGZlYXR1cmUuZGVidWcoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmZWF0dXJlLmNyZWF0ZSh0aGlzLl9kaWdDYWxsYmFjayk7XG4gICAgICAgIC8vXHRmZWF0dXJlLmRlYnVnKCk7XG4gICAgICAgIGlmIChmZWF0dXJlIGluc3RhbmNlb2YgUm9vbSkge1xuICAgICAgICAgICAgdGhpcy5fcm9vbXMucHVzaChmZWF0dXJlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmVhdHVyZSBpbnN0YW5jZW9mIENvcnJpZG9yKSB7XG4gICAgICAgICAgICBmZWF0dXJlLmNyZWF0ZVByaW9yaXR5V2FsbHModGhpcy5fcHJpb3JpdHlXYWxsQ2FsbGJhY2spO1xuICAgICAgICAgICAgdGhpcy5fY29ycmlkb3JzLnB1c2goZmVhdHVyZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIF9yZW1vdmVTdXJyb3VuZGluZ1dhbGxzKGN4LCBjeSkge1xuICAgICAgICBsZXQgZGVsdGFzID0gRElSU1s0XTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWx0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkZWx0YSA9IGRlbHRhc1tpXTtcbiAgICAgICAgICAgIGxldCB4ID0gY3ggKyBkZWx0YVswXTtcbiAgICAgICAgICAgIGxldCB5ID0gY3kgKyBkZWx0YVsxXTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl93YWxsc1t4ICsgXCIsXCIgKyB5XTtcbiAgICAgICAgICAgIHggPSBjeCArIDIgKiBkZWx0YVswXTtcbiAgICAgICAgICAgIHkgPSBjeSArIDIgKiBkZWx0YVsxXTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl93YWxsc1t4ICsgXCIsXCIgKyB5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHZlY3RvciBpbiBcImRpZ2dpbmdcIiBkaXJlY3Rpb24sIG9yIGZhbHNlLCBpZiB0aGlzIGRvZXMgbm90IGV4aXN0IChvciBpcyBub3QgdW5pcXVlKVxuICAgICAqL1xuICAgIF9nZXREaWdnaW5nRGlyZWN0aW9uKGN4LCBjeSkge1xuICAgICAgICBpZiAoY3ggPD0gMCB8fCBjeSA8PSAwIHx8IGN4ID49IHRoaXMuX3dpZHRoIC0gMSB8fCBjeSA+PSB0aGlzLl9oZWlnaHQgLSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgbGV0IGRlbHRhcyA9IERJUlNbNF07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVsdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZGVsdGEgPSBkZWx0YXNbaV07XG4gICAgICAgICAgICBsZXQgeCA9IGN4ICsgZGVsdGFbMF07XG4gICAgICAgICAgICBsZXQgeSA9IGN5ICsgZGVsdGFbMV07XG4gICAgICAgICAgICBpZiAoIXRoaXMuX21hcFt4XVt5XSkgeyAvKiB0aGVyZSBhbHJlYWR5IGlzIGFub3RoZXIgZW1wdHkgbmVpZ2hib3IhICovXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGVsdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyogbm8gZW1wdHkgbmVpZ2hib3IgKi9cbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbLXJlc3VsdFswXSwgLXJlc3VsdFsxXV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmQgZW1wdHkgc3BhY2VzIHN1cnJvdW5kaW5nIHJvb21zLCBhbmQgYXBwbHkgZG9vcnMuXG4gICAgICovXG4gICAgX2FkZERvb3JzKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuX21hcDtcbiAgICAgICAgZnVuY3Rpb24gaXNXYWxsQ2FsbGJhY2soeCwgeSkge1xuICAgICAgICAgICAgcmV0dXJuIChkYXRhW3hdW3ldID09IDEpO1xuICAgICAgICB9XG4gICAgICAgIDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9yb29tcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHJvb20gPSB0aGlzLl9yb29tc1tpXTtcbiAgICAgICAgICAgIHJvb20uY2xlYXJEb29ycygpO1xuICAgICAgICAgICAgcm9vbS5hZGREb29ycyhpc1dhbGxDYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgTWFwIGZyb20gXCIuL21hcC5qc1wiO1xuaW1wb3J0IFJORyBmcm9tIFwiLi4vcm5nLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBSZWN1cnNpdmVseSBkaXZpZGVkIG1hemUsIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTWF6ZV9nZW5lcmF0aW9uX2FsZ29yaXRobSNSZWN1cnNpdmVfZGl2aXNpb25fbWV0aG9kXG4gKiBAYXVnbWVudHMgUk9ULk1hcFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXZpZGVkTWF6ZSBleHRlbmRzIE1hcCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuX3N0YWNrID0gW107XG4gICAgICAgIHRoaXMuX21hcCA9IFtdO1xuICAgIH1cbiAgICBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHcgPSB0aGlzLl93aWR0aDtcbiAgICAgICAgbGV0IGggPSB0aGlzLl9oZWlnaHQ7XG4gICAgICAgIHRoaXMuX21hcCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHc7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fbWFwLnB1c2goW10pO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgYm9yZGVyID0gKGkgPT0gMCB8fCBqID09IDAgfHwgaSArIDEgPT0gdyB8fCBqICsgMSA9PSBoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXBbaV0ucHVzaChib3JkZXIgPyAxIDogMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhY2sgPSBbXG4gICAgICAgICAgICBbMSwgMSwgdyAtIDIsIGggLSAyXVxuICAgICAgICBdO1xuICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdzsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGg7IGorKykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGksIGosIHRoaXMuX21hcFtpXVtqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFwID0gW107XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfcHJvY2VzcygpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuX3N0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHJvb20gPSB0aGlzLl9zdGFjay5zaGlmdCgpOyAvKiBbbGVmdCwgdG9wLCByaWdodCwgYm90dG9tXSAqL1xuICAgICAgICAgICAgdGhpcy5fcGFydGl0aW9uUm9vbShyb29tKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfcGFydGl0aW9uUm9vbShyb29tKSB7XG4gICAgICAgIGxldCBhdmFpbFggPSBbXTtcbiAgICAgICAgbGV0IGF2YWlsWSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gcm9vbVswXSArIDE7IGkgPCByb29tWzJdOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0b3AgPSB0aGlzLl9tYXBbaV1bcm9vbVsxXSAtIDFdO1xuICAgICAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMuX21hcFtpXVtyb29tWzNdICsgMV07XG4gICAgICAgICAgICBpZiAodG9wICYmIGJvdHRvbSAmJiAhKGkgJSAyKSkge1xuICAgICAgICAgICAgICAgIGF2YWlsWC5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGogPSByb29tWzFdICsgMTsgaiA8IHJvb21bM107IGorKykge1xuICAgICAgICAgICAgbGV0IGxlZnQgPSB0aGlzLl9tYXBbcm9vbVswXSAtIDFdW2pdO1xuICAgICAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5fbWFwW3Jvb21bMl0gKyAxXVtqXTtcbiAgICAgICAgICAgIGlmIChsZWZ0ICYmIHJpZ2h0ICYmICEoaiAlIDIpKSB7XG4gICAgICAgICAgICAgICAgYXZhaWxZLnB1c2goaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhdmFpbFgubGVuZ3RoIHx8ICFhdmFpbFkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHggPSBSTkcuZ2V0SXRlbShhdmFpbFgpO1xuICAgICAgICBsZXQgeSA9IFJORy5nZXRJdGVtKGF2YWlsWSk7XG4gICAgICAgIHRoaXMuX21hcFt4XVt5XSA9IDE7XG4gICAgICAgIGxldCB3YWxscyA9IFtdO1xuICAgICAgICBsZXQgdyA9IFtdO1xuICAgICAgICB3YWxscy5wdXNoKHcpOyAvKiBsZWZ0IHBhcnQgKi9cbiAgICAgICAgZm9yIChsZXQgaSA9IHJvb21bMF07IGkgPCB4OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX21hcFtpXVt5XSA9IDE7XG4gICAgICAgICAgICBpZiAoaSAlIDIpXG4gICAgICAgICAgICAgICAgdy5wdXNoKFtpLCB5XSk7XG4gICAgICAgIH1cbiAgICAgICAgdyA9IFtdO1xuICAgICAgICB3YWxscy5wdXNoKHcpOyAvKiByaWdodCBwYXJ0ICovXG4gICAgICAgIGZvciAobGV0IGkgPSB4ICsgMTsgaSA8PSByb29tWzJdOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX21hcFtpXVt5XSA9IDE7XG4gICAgICAgICAgICBpZiAoaSAlIDIpXG4gICAgICAgICAgICAgICAgdy5wdXNoKFtpLCB5XSk7XG4gICAgICAgIH1cbiAgICAgICAgdyA9IFtdO1xuICAgICAgICB3YWxscy5wdXNoKHcpOyAvKiB0b3AgcGFydCAqL1xuICAgICAgICBmb3IgKGxldCBqID0gcm9vbVsxXTsgaiA8IHk7IGorKykge1xuICAgICAgICAgICAgdGhpcy5fbWFwW3hdW2pdID0gMTtcbiAgICAgICAgICAgIGlmIChqICUgMilcbiAgICAgICAgICAgICAgICB3LnB1c2goW3gsIGpdKTtcbiAgICAgICAgfVxuICAgICAgICB3ID0gW107XG4gICAgICAgIHdhbGxzLnB1c2godyk7IC8qIGJvdHRvbSBwYXJ0ICovXG4gICAgICAgIGZvciAobGV0IGogPSB5ICsgMTsgaiA8PSByb29tWzNdOyBqKyspIHtcbiAgICAgICAgICAgIHRoaXMuX21hcFt4XVtqXSA9IDE7XG4gICAgICAgICAgICBpZiAoaiAlIDIpXG4gICAgICAgICAgICAgICAgdy5wdXNoKFt4LCBqXSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNvbGlkID0gUk5HLmdldEl0ZW0od2FsbHMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdhbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdyA9IHdhbGxzW2ldO1xuICAgICAgICAgICAgaWYgKHcgPT0gc29saWQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBob2xlID0gUk5HLmdldEl0ZW0odyk7XG4gICAgICAgICAgICB0aGlzLl9tYXBbaG9sZVswXV1baG9sZVsxXV0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0YWNrLnB1c2goW3Jvb21bMF0sIHJvb21bMV0sIHggLSAxLCB5IC0gMV0pOyAvKiBsZWZ0IHRvcCAqL1xuICAgICAgICB0aGlzLl9zdGFjay5wdXNoKFt4ICsgMSwgcm9vbVsxXSwgcm9vbVsyXSwgeSAtIDFdKTsgLyogcmlnaHQgdG9wICovXG4gICAgICAgIHRoaXMuX3N0YWNrLnB1c2goW3Jvb21bMF0sIHkgKyAxLCB4IC0gMSwgcm9vbVszXV0pOyAvKiBsZWZ0IGJvdHRvbSAqL1xuICAgICAgICB0aGlzLl9zdGFjay5wdXNoKFt4ICsgMSwgeSArIDEsIHJvb21bMl0sIHJvb21bM11dKTsgLyogcmlnaHQgYm90dG9tICovXG4gICAgfVxufVxuIiwiaW1wb3J0IE1hcCBmcm9tIFwiLi9tYXAuanNcIjtcbi8qKlxuICogQGNsYXNzIER1bmdlb24gbWFwOiBoYXMgcm9vbXMgYW5kIGNvcnJpZG9yc1xuICogQGF1Z21lbnRzIFJPVC5NYXBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHVuZ2VvbiBleHRlbmRzIE1hcCB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcih3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5fcm9vbXMgPSBbXTtcbiAgICAgICAgdGhpcy5fY29ycmlkb3JzID0gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZ2VuZXJhdGVkIHJvb21zXG4gICAgICogQHJldHVybnMge1JPVC5NYXAuRmVhdHVyZS5Sb29tW119XG4gICAgICovXG4gICAgZ2V0Um9vbXMoKSB7IHJldHVybiB0aGlzLl9yb29tczsgfVxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZ2VuZXJhdGVkIGNvcnJpZG9yc1xuICAgICAqIEByZXR1cm5zIHtST1QuTWFwLkZlYXR1cmUuQ29ycmlkb3JbXX1cbiAgICAgKi9cbiAgICBnZXRDb3JyaWRvcnMoKSB7IHJldHVybiB0aGlzLl9jb3JyaWRvcnM7IH1cbn1cbiIsImltcG9ydCBNYXAgZnJvbSBcIi4vbWFwLmpzXCI7XG5pbXBvcnQgUk5HIGZyb20gXCIuLi9ybmcuanNcIjtcbi8qKlxuICogSm9pbiBsaXN0cyB3aXRoIFwiaVwiIGFuZCBcImkrMVwiXG4gKi9cbmZ1bmN0aW9uIGFkZFRvTGlzdChpLCBMLCBSKSB7XG4gICAgUltMW2kgKyAxXV0gPSBSW2ldO1xuICAgIExbUltpXV0gPSBMW2kgKyAxXTtcbiAgICBSW2ldID0gaSArIDE7XG4gICAgTFtpICsgMV0gPSBpO1xufVxuLyoqXG4gKiBSZW1vdmUgXCJpXCIgZnJvbSBpdHMgbGlzdFxuICovXG5mdW5jdGlvbiByZW1vdmVGcm9tTGlzdChpLCBMLCBSKSB7XG4gICAgUltMW2ldXSA9IFJbaV07XG4gICAgTFtSW2ldXSA9IExbaV07XG4gICAgUltpXSA9IGk7XG4gICAgTFtpXSA9IGk7XG59XG4vKipcbiAqIE1hemUgZ2VuZXJhdG9yIC0gRWxsZXIncyBhbGdvcml0aG1cbiAqIFNlZSBodHRwOi8vaG9tZXBhZ2VzLmN3aS5ubC9+dHJvbXAvbWF6ZS5odG1sIGZvciBleHBsYW5hdGlvblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGxlck1hemUgZXh0ZW5kcyBNYXAge1xuICAgIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgICBsZXQgbWFwID0gdGhpcy5fZmlsbE1hcCgxKTtcbiAgICAgICAgbGV0IHcgPSBNYXRoLmNlaWwoKHRoaXMuX3dpZHRoIC0gMikgLyAyKTtcbiAgICAgICAgbGV0IHJhbmQgPSA5IC8gMjQ7XG4gICAgICAgIGxldCBMID0gW107XG4gICAgICAgIGxldCBSID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdzsgaSsrKSB7XG4gICAgICAgICAgICBMLnB1c2goaSk7XG4gICAgICAgICAgICBSLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgTC5wdXNoKHcgLSAxKTsgLyogZmFrZSBzdG9wLWJsb2NrIGF0IHRoZSByaWdodCBzaWRlICovXG4gICAgICAgIGxldCBqO1xuICAgICAgICBmb3IgKGogPSAxOyBqICsgMyA8IHRoaXMuX2hlaWdodDsgaiArPSAyKSB7XG4gICAgICAgICAgICAvKiBvbmUgcm93ICovXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHc7IGkrKykge1xuICAgICAgICAgICAgICAgIC8qIGNlbGwgY29vcmRzICh3aWxsIGJlIGFsd2F5cyBlbXB0eSkgKi9cbiAgICAgICAgICAgICAgICBsZXQgeCA9IDIgKiBpICsgMTtcbiAgICAgICAgICAgICAgICBsZXQgeSA9IGo7XG4gICAgICAgICAgICAgICAgbWFwW3hdW3ldID0gMDtcbiAgICAgICAgICAgICAgICAvKiByaWdodCBjb25uZWN0aW9uICovXG4gICAgICAgICAgICAgICAgaWYgKGkgIT0gTFtpICsgMV0gJiYgUk5HLmdldFVuaWZvcm0oKSA+IHJhbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkVG9MaXN0KGksIEwsIFIpO1xuICAgICAgICAgICAgICAgICAgICBtYXBbeCArIDFdW3ldID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyogYm90dG9tIGNvbm5lY3Rpb24gKi9cbiAgICAgICAgICAgICAgICBpZiAoaSAhPSBMW2ldICYmIFJORy5nZXRVbmlmb3JtKCkgPiByYW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIHJlbW92ZSBjb25uZWN0aW9uICovXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUZyb21MaXN0KGksIEwsIFIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLyogY3JlYXRlIGNvbm5lY3Rpb24gKi9cbiAgICAgICAgICAgICAgICAgICAgbWFwW3hdW3kgKyAxXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qIGxhc3Qgcm93ICovXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdzsgaSsrKSB7XG4gICAgICAgICAgICAvKiBjZWxsIGNvb3JkcyAod2lsbCBiZSBhbHdheXMgZW1wdHkpICovXG4gICAgICAgICAgICBsZXQgeCA9IDIgKiBpICsgMTtcbiAgICAgICAgICAgIGxldCB5ID0gajtcbiAgICAgICAgICAgIG1hcFt4XVt5XSA9IDA7XG4gICAgICAgICAgICAvKiByaWdodCBjb25uZWN0aW9uICovXG4gICAgICAgICAgICBpZiAoaSAhPSBMW2kgKyAxXSAmJiAoaSA9PSBMW2ldIHx8IFJORy5nZXRVbmlmb3JtKCkgPiByYW5kKSkge1xuICAgICAgICAgICAgICAgIC8qIGRpZyByaWdodCBhbHNvIGlmIHRoZSBjZWxsIGlzIHNlcGFyYXRlZCwgc28gaXQgZ2V0cyBjb25uZWN0ZWQgdG8gdGhlIHJlc3Qgb2YgbWF6ZSAqL1xuICAgICAgICAgICAgICAgIGFkZFRvTGlzdChpLCBMLCBSKTtcbiAgICAgICAgICAgICAgICBtYXBbeCArIDFdW3ldID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlbW92ZUZyb21MaXN0KGksIEwsIFIpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGksIGosIG1hcFtpXVtqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJORyBmcm9tIFwiLi4vcm5nLmpzXCI7XG47XG4vKipcbiAqIEBjbGFzcyBEdW5nZW9uIGZlYXR1cmU7IGhhcyBvd24gLmNyZWF0ZSgpIG1ldGhvZFxuICovXG5jbGFzcyBGZWF0dXJlIHtcbn1cbi8qKlxuICogQGNsYXNzIFJvb21cbiAqIEBhdWdtZW50cyBST1QuTWFwLkZlYXR1cmVcbiAqIEBwYXJhbSB7aW50fSB4MVxuICogQHBhcmFtIHtpbnR9IHkxXG4gKiBAcGFyYW0ge2ludH0geDJcbiAqIEBwYXJhbSB7aW50fSB5MlxuICogQHBhcmFtIHtpbnR9IFtkb29yWF1cbiAqIEBwYXJhbSB7aW50fSBbZG9vclldXG4gKi9cbmV4cG9ydCBjbGFzcyBSb29tIGV4dGVuZHMgRmVhdHVyZSB7XG4gICAgY29uc3RydWN0b3IoeDEsIHkxLCB4MiwgeTIsIGRvb3JYLCBkb29yWSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl94MSA9IHgxO1xuICAgICAgICB0aGlzLl95MSA9IHkxO1xuICAgICAgICB0aGlzLl94MiA9IHgyO1xuICAgICAgICB0aGlzLl95MiA9IHkyO1xuICAgICAgICB0aGlzLl9kb29ycyA9IHt9O1xuICAgICAgICBpZiAoZG9vclggIT09IHVuZGVmaW5lZCAmJiBkb29yWSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmFkZERvb3IoZG9vclgsIGRvb3JZKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICA7XG4gICAgLyoqXG4gICAgICogUm9vbSBvZiByYW5kb20gc2l6ZSwgd2l0aCBhIGdpdmVuIGRvb3JzIGFuZCBkaXJlY3Rpb25cbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlUmFuZG9tQXQoeCwgeSwgZHgsIGR5LCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBtaW4gPSBvcHRpb25zLnJvb21XaWR0aFswXTtcbiAgICAgICAgbGV0IG1heCA9IG9wdGlvbnMucm9vbVdpZHRoWzFdO1xuICAgICAgICBsZXQgd2lkdGggPSBSTkcuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICAgIG1pbiA9IG9wdGlvbnMucm9vbUhlaWdodFswXTtcbiAgICAgICAgbWF4ID0gb3B0aW9ucy5yb29tSGVpZ2h0WzFdO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gUk5HLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgICBpZiAoZHggPT0gMSkgeyAvKiB0byB0aGUgcmlnaHQgKi9cbiAgICAgICAgICAgIGxldCB5MiA9IHkgLSBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiBoZWlnaHQpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHggKyAxLCB5MiwgeCArIHdpZHRoLCB5MiArIGhlaWdodCAtIDEsIHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkeCA9PSAtMSkgeyAvKiB0byB0aGUgbGVmdCAqL1xuICAgICAgICAgICAgbGV0IHkyID0geSAtIE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIGhlaWdodCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMoeCAtIHdpZHRoLCB5MiwgeCAtIDEsIHkyICsgaGVpZ2h0IC0gMSwgeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGR5ID09IDEpIHsgLyogdG8gdGhlIGJvdHRvbSAqL1xuICAgICAgICAgICAgbGV0IHgyID0geCAtIE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIHdpZHRoKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcyh4MiwgeSArIDEsIHgyICsgd2lkdGggLSAxLCB5ICsgaGVpZ2h0LCB4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZHkgPT0gLTEpIHsgLyogdG8gdGhlIHRvcCAqL1xuICAgICAgICAgICAgbGV0IHgyID0geCAtIE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIHdpZHRoKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcyh4MiwgeSAtIGhlaWdodCwgeDIgKyB3aWR0aCAtIDEsIHkgLSAxLCB4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkeCBvciBkeSBtdXN0IGJlIDEgb3IgLTFcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJvb20gb2YgcmFuZG9tIHNpemUsIHBvc2l0aW9uZWQgYXJvdW5kIGNlbnRlciBjb29yZHNcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlUmFuZG9tQ2VudGVyKGN4LCBjeSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgbWluID0gb3B0aW9ucy5yb29tV2lkdGhbMF07XG4gICAgICAgIGxldCBtYXggPSBvcHRpb25zLnJvb21XaWR0aFsxXTtcbiAgICAgICAgbGV0IHdpZHRoID0gUk5HLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgICBtaW4gPSBvcHRpb25zLnJvb21IZWlnaHRbMF07XG4gICAgICAgIG1heCA9IG9wdGlvbnMucm9vbUhlaWdodFsxXTtcbiAgICAgICAgbGV0IGhlaWdodCA9IFJORy5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcbiAgICAgICAgbGV0IHgxID0gY3ggLSBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiB3aWR0aCk7XG4gICAgICAgIGxldCB5MSA9IGN5IC0gTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogaGVpZ2h0KTtcbiAgICAgICAgbGV0IHgyID0geDEgKyB3aWR0aCAtIDE7XG4gICAgICAgIGxldCB5MiA9IHkxICsgaGVpZ2h0IC0gMTtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHgxLCB5MSwgeDIsIHkyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUm9vbSBvZiByYW5kb20gc2l6ZSB3aXRoaW4gYSBnaXZlbiBkaW1lbnNpb25zXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZVJhbmRvbShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCwgb3B0aW9ucykge1xuICAgICAgICBsZXQgbWluID0gb3B0aW9ucy5yb29tV2lkdGhbMF07XG4gICAgICAgIGxldCBtYXggPSBvcHRpb25zLnJvb21XaWR0aFsxXTtcbiAgICAgICAgbGV0IHdpZHRoID0gUk5HLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgICBtaW4gPSBvcHRpb25zLnJvb21IZWlnaHRbMF07XG4gICAgICAgIG1heCA9IG9wdGlvbnMucm9vbUhlaWdodFsxXTtcbiAgICAgICAgbGV0IGhlaWdodCA9IFJORy5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcbiAgICAgICAgbGV0IGxlZnQgPSBhdmFpbFdpZHRoIC0gd2lkdGggLSAxO1xuICAgICAgICBsZXQgdG9wID0gYXZhaWxIZWlnaHQgLSBoZWlnaHQgLSAxO1xuICAgICAgICBsZXQgeDEgPSAxICsgTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogbGVmdCk7XG4gICAgICAgIGxldCB5MSA9IDEgKyBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiB0b3ApO1xuICAgICAgICBsZXQgeDIgPSB4MSArIHdpZHRoIC0gMTtcbiAgICAgICAgbGV0IHkyID0geTEgKyBoZWlnaHQgLSAxO1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoeDEsIHkxLCB4MiwgeTIpO1xuICAgIH1cbiAgICBhZGREb29yKHgsIHkpIHtcbiAgICAgICAgdGhpcy5fZG9vcnNbeCArIFwiLFwiICsgeV0gPSAxO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn1cbiAgICAgKi9cbiAgICBnZXREb29ycyhjYikge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fZG9vcnMpIHtcbiAgICAgICAgICAgIGxldCBwYXJ0cyA9IGtleS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICBjYihwYXJzZUludChwYXJ0c1swXSksIHBhcnNlSW50KHBhcnRzWzFdKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNsZWFyRG9vcnMoKSB7XG4gICAgICAgIHRoaXMuX2Rvb3JzID0ge307XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGREb29ycyhpc1dhbGxDYWxsYmFjaykge1xuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuX3gxIC0gMTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5feDIgKyAxO1xuICAgICAgICBsZXQgdG9wID0gdGhpcy5feTEgLSAxO1xuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5feTIgKyAxO1xuICAgICAgICBmb3IgKGxldCB4ID0gbGVmdDsgeCA8PSByaWdodDsgeCsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gdG9wOyB5IDw9IGJvdHRvbTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHggIT0gbGVmdCAmJiB4ICE9IHJpZ2h0ICYmIHkgIT0gdG9wICYmIHkgIT0gYm90dG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNXYWxsQ2FsbGJhY2soeCwgeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRG9vcih4LCB5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZGVidWcoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicm9vbVwiLCB0aGlzLl94MSwgdGhpcy5feTEsIHRoaXMuX3gyLCB0aGlzLl95Mik7XG4gICAgfVxuICAgIGlzVmFsaWQoaXNXYWxsQ2FsbGJhY2ssIGNhbkJlRHVnQ2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLl94MSAtIDE7XG4gICAgICAgIGxldCByaWdodCA9IHRoaXMuX3gyICsgMTtcbiAgICAgICAgbGV0IHRvcCA9IHRoaXMuX3kxIC0gMTtcbiAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMuX3kyICsgMTtcbiAgICAgICAgZm9yIChsZXQgeCA9IGxlZnQ7IHggPD0gcmlnaHQ7IHgrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IHRvcDsgeSA8PSBib3R0b207IHkrKykge1xuICAgICAgICAgICAgICAgIGlmICh4ID09IGxlZnQgfHwgeCA9PSByaWdodCB8fCB5ID09IHRvcCB8fCB5ID09IGJvdHRvbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzV2FsbENhbGxiYWNrKHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FuQmVEdWdDYWxsYmFjayh4LCB5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBkaWdDYWxsYmFjayBEaWcgY2FsbGJhY2sgd2l0aCBhIHNpZ25hdHVyZSAoeCwgeSwgdmFsdWUpLiBWYWx1ZXM6IDAgPSBlbXB0eSwgMSA9IHdhbGwsIDIgPSBkb29yLiBNdWx0aXBsZSBkb29ycyBhcmUgYWxsb3dlZC5cbiAgICAgKi9cbiAgICBjcmVhdGUoZGlnQ2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLl94MSAtIDE7XG4gICAgICAgIGxldCByaWdodCA9IHRoaXMuX3gyICsgMTtcbiAgICAgICAgbGV0IHRvcCA9IHRoaXMuX3kxIC0gMTtcbiAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMuX3kyICsgMTtcbiAgICAgICAgbGV0IHZhbHVlID0gMDtcbiAgICAgICAgZm9yIChsZXQgeCA9IGxlZnQ7IHggPD0gcmlnaHQ7IHgrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IHRvcDsgeSA8PSBib3R0b207IHkrKykge1xuICAgICAgICAgICAgICAgIGlmICh4ICsgXCIsXCIgKyB5IGluIHRoaXMuX2Rvb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoeCA9PSBsZWZ0IHx8IHggPT0gcmlnaHQgfHwgeSA9PSB0b3AgfHwgeSA9PSBib3R0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkaWdDYWxsYmFjayh4LCB5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0Q2VudGVyKCkge1xuICAgICAgICByZXR1cm4gW01hdGgucm91bmQoKHRoaXMuX3gxICsgdGhpcy5feDIpIC8gMiksIE1hdGgucm91bmQoKHRoaXMuX3kxICsgdGhpcy5feTIpIC8gMildO1xuICAgIH1cbiAgICBnZXRMZWZ0KCkgeyByZXR1cm4gdGhpcy5feDE7IH1cbiAgICBnZXRSaWdodCgpIHsgcmV0dXJuIHRoaXMuX3gyOyB9XG4gICAgZ2V0VG9wKCkgeyByZXR1cm4gdGhpcy5feTE7IH1cbiAgICBnZXRCb3R0b20oKSB7IHJldHVybiB0aGlzLl95MjsgfVxufVxuLyoqXG4gKiBAY2xhc3MgQ29ycmlkb3JcbiAqIEBhdWdtZW50cyBST1QuTWFwLkZlYXR1cmVcbiAqIEBwYXJhbSB7aW50fSBzdGFydFhcbiAqIEBwYXJhbSB7aW50fSBzdGFydFlcbiAqIEBwYXJhbSB7aW50fSBlbmRYXG4gKiBAcGFyYW0ge2ludH0gZW5kWVxuICovXG5leHBvcnQgY2xhc3MgQ29ycmlkb3IgZXh0ZW5kcyBGZWF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9zdGFydFggPSBzdGFydFg7XG4gICAgICAgIHRoaXMuX3N0YXJ0WSA9IHN0YXJ0WTtcbiAgICAgICAgdGhpcy5fZW5kWCA9IGVuZFg7XG4gICAgICAgIHRoaXMuX2VuZFkgPSBlbmRZO1xuICAgICAgICB0aGlzLl9lbmRzV2l0aEFXYWxsID0gdHJ1ZTtcbiAgICB9XG4gICAgc3RhdGljIGNyZWF0ZVJhbmRvbUF0KHgsIHksIGR4LCBkeSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgbWluID0gb3B0aW9ucy5jb3JyaWRvckxlbmd0aFswXTtcbiAgICAgICAgbGV0IG1heCA9IG9wdGlvbnMuY29ycmlkb3JMZW5ndGhbMV07XG4gICAgICAgIGxldCBsZW5ndGggPSBSTkcuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcyh4LCB5LCB4ICsgZHggKiBsZW5ndGgsIHkgKyBkeSAqIGxlbmd0aCk7XG4gICAgfVxuICAgIGRlYnVnKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImNvcnJpZG9yXCIsIHRoaXMuX3N0YXJ0WCwgdGhpcy5fc3RhcnRZLCB0aGlzLl9lbmRYLCB0aGlzLl9lbmRZKTtcbiAgICB9XG4gICAgaXNWYWxpZChpc1dhbGxDYWxsYmFjaywgY2FuQmVEdWdDYWxsYmFjaykge1xuICAgICAgICBsZXQgc3ggPSB0aGlzLl9zdGFydFg7XG4gICAgICAgIGxldCBzeSA9IHRoaXMuX3N0YXJ0WTtcbiAgICAgICAgbGV0IGR4ID0gdGhpcy5fZW5kWCAtIHN4O1xuICAgICAgICBsZXQgZHkgPSB0aGlzLl9lbmRZIC0gc3k7XG4gICAgICAgIGxldCBsZW5ndGggPSAxICsgTWF0aC5tYXgoTWF0aC5hYnMoZHgpLCBNYXRoLmFicyhkeSkpO1xuICAgICAgICBpZiAoZHgpIHtcbiAgICAgICAgICAgIGR4ID0gZHggLyBNYXRoLmFicyhkeCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGR5KSB7XG4gICAgICAgICAgICBkeSA9IGR5IC8gTWF0aC5hYnMoZHkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBueCA9IGR5O1xuICAgICAgICBsZXQgbnkgPSAtZHg7XG4gICAgICAgIGxldCBvayA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB4ID0gc3ggKyBpICogZHg7XG4gICAgICAgICAgICBsZXQgeSA9IHN5ICsgaSAqIGR5O1xuICAgICAgICAgICAgaWYgKCFjYW5CZUR1Z0NhbGxiYWNrKHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgb2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNXYWxsQ2FsbGJhY2soeCArIG54LCB5ICsgbnkpKSB7XG4gICAgICAgICAgICAgICAgb2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNXYWxsQ2FsbGJhY2soeCAtIG54LCB5IC0gbnkpKSB7XG4gICAgICAgICAgICAgICAgb2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSBpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VuZFggPSB4IC0gZHg7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW5kWSA9IHkgLSBkeTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdGhlIGxlbmd0aCBkZWdlbmVyYXRlZCwgdGhpcyBjb3JyaWRvciBtaWdodCBiZSBpbnZhbGlkXG4gICAgICAgICAqL1xuICAgICAgICAvKiBub3Qgc3VwcG9ydGVkICovXG4gICAgICAgIGlmIChsZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8qIGxlbmd0aCAxIGFsbG93ZWQgb25seSBpZiB0aGUgbmV4dCBzcGFjZSBpcyBlbXB0eSAqL1xuICAgICAgICBpZiAobGVuZ3RoID09IDEgJiYgaXNXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIGR4LCB0aGlzLl9lbmRZICsgZHkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdlIGRvIG5vdCB3YW50IHRoZSBjb3JyaWRvciB0byBjcmFzaCBpbnRvIGEgY29ybmVyIG9mIGEgcm9vbTtcbiAgICAgICAgICogaWYgYW55IG9mIHRoZSBlbmRpbmcgY29ybmVycyBpcyBlbXB0eSwgdGhlIE4rMXRoIGNlbGwgb2YgdGhpcyBjb3JyaWRvciBtdXN0IGJlIGVtcHR5IHRvby5cbiAgICAgICAgICpcbiAgICAgICAgICogU2l0dWF0aW9uOlxuICAgICAgICAgKiAjIyMjIyMjMVxuICAgICAgICAgKiAuLi4uLi4uP1xuICAgICAgICAgKiAjIyMjIyMjMlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgY29ycmlkb3Igd2FzIGR1ZyBmcm9tIGxlZnQgdG8gcmlnaHQuXG4gICAgICAgICAqIDEsIDIgLSBwcm9ibGVtYXRpYyBjb3JuZXJzLCA/ID0gTisxdGggY2VsbCAobm90IGR1ZylcbiAgICAgICAgICovXG4gICAgICAgIGxldCBmaXJzdENvcm5lckJhZCA9ICFpc1dhbGxDYWxsYmFjayh0aGlzLl9lbmRYICsgZHggKyBueCwgdGhpcy5fZW5kWSArIGR5ICsgbnkpO1xuICAgICAgICBsZXQgc2Vjb25kQ29ybmVyQmFkID0gIWlzV2FsbENhbGxiYWNrKHRoaXMuX2VuZFggKyBkeCAtIG54LCB0aGlzLl9lbmRZICsgZHkgLSBueSk7XG4gICAgICAgIHRoaXMuX2VuZHNXaXRoQVdhbGwgPSBpc1dhbGxDYWxsYmFjayh0aGlzLl9lbmRYICsgZHgsIHRoaXMuX2VuZFkgKyBkeSk7XG4gICAgICAgIGlmICgoZmlyc3RDb3JuZXJCYWQgfHwgc2Vjb25kQ29ybmVyQmFkKSAmJiB0aGlzLl9lbmRzV2l0aEFXYWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGRpZ0NhbGxiYWNrIERpZyBjYWxsYmFjayB3aXRoIGEgc2lnbmF0dXJlICh4LCB5LCB2YWx1ZSkuIFZhbHVlczogMCA9IGVtcHR5LlxuICAgICAqL1xuICAgIGNyZWF0ZShkaWdDYWxsYmFjaykge1xuICAgICAgICBsZXQgc3ggPSB0aGlzLl9zdGFydFg7XG4gICAgICAgIGxldCBzeSA9IHRoaXMuX3N0YXJ0WTtcbiAgICAgICAgbGV0IGR4ID0gdGhpcy5fZW5kWCAtIHN4O1xuICAgICAgICBsZXQgZHkgPSB0aGlzLl9lbmRZIC0gc3k7XG4gICAgICAgIGxldCBsZW5ndGggPSAxICsgTWF0aC5tYXgoTWF0aC5hYnMoZHgpLCBNYXRoLmFicyhkeSkpO1xuICAgICAgICBpZiAoZHgpIHtcbiAgICAgICAgICAgIGR4ID0gZHggLyBNYXRoLmFicyhkeCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGR5KSB7XG4gICAgICAgICAgICBkeSA9IGR5IC8gTWF0aC5hYnMoZHkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB4ID0gc3ggKyBpICogZHg7XG4gICAgICAgICAgICBsZXQgeSA9IHN5ICsgaSAqIGR5O1xuICAgICAgICAgICAgZGlnQ2FsbGJhY2soeCwgeSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNyZWF0ZVByaW9yaXR5V2FsbHMocHJpb3JpdHlXYWxsQ2FsbGJhY2spIHtcbiAgICAgICAgaWYgKCF0aGlzLl9lbmRzV2l0aEFXYWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN4ID0gdGhpcy5fc3RhcnRYO1xuICAgICAgICBsZXQgc3kgPSB0aGlzLl9zdGFydFk7XG4gICAgICAgIGxldCBkeCA9IHRoaXMuX2VuZFggLSBzeDtcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5fZW5kWSAtIHN5O1xuICAgICAgICBpZiAoZHgpIHtcbiAgICAgICAgICAgIGR4ID0gZHggLyBNYXRoLmFicyhkeCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGR5KSB7XG4gICAgICAgICAgICBkeSA9IGR5IC8gTWF0aC5hYnMoZHkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBueCA9IGR5O1xuICAgICAgICBsZXQgbnkgPSAtZHg7XG4gICAgICAgIHByaW9yaXR5V2FsbENhbGxiYWNrKHRoaXMuX2VuZFggKyBkeCwgdGhpcy5fZW5kWSArIGR5KTtcbiAgICAgICAgcHJpb3JpdHlXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIG54LCB0aGlzLl9lbmRZICsgbnkpO1xuICAgICAgICBwcmlvcml0eVdhbGxDYWxsYmFjayh0aGlzLl9lbmRYIC0gbngsIHRoaXMuX2VuZFkgLSBueSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IE1hcCBmcm9tIFwiLi9tYXAuanNcIjtcbmltcG9ydCBSTkcgZnJvbSBcIi4uL3JuZy5qc1wiO1xuLyoqXG4gKiBJY2V5J3MgTWF6ZSBnZW5lcmF0b3JcbiAqIFNlZSBodHRwOi8vd3d3LnJvZ3VlYmFzaW4ucm9ndWVsaWtlZGV2ZWxvcG1lbnQub3JnL2luZGV4LnBocD90aXRsZT1TaW1wbGVfbWF6ZSBmb3IgZXhwbGFuYXRpb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWNleU1hemUgZXh0ZW5kcyBNYXAge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIHJlZ3VsYXJpdHkgPSAwKSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLl9yZWd1bGFyaXR5ID0gcmVndWxhcml0eTtcbiAgICAgICAgdGhpcy5fbWFwID0gW107XG4gICAgfVxuICAgIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgICBsZXQgd2lkdGggPSB0aGlzLl93aWR0aDtcbiAgICAgICAgbGV0IGhlaWdodCA9IHRoaXMuX2hlaWdodDtcbiAgICAgICAgbGV0IG1hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XG4gICAgICAgIHdpZHRoIC09ICh3aWR0aCAlIDIgPyAxIDogMik7XG4gICAgICAgIGhlaWdodCAtPSAoaGVpZ2h0ICUgMiA/IDEgOiAyKTtcbiAgICAgICAgbGV0IGN4ID0gMDtcbiAgICAgICAgbGV0IGN5ID0gMDtcbiAgICAgICAgbGV0IG54ID0gMDtcbiAgICAgICAgbGV0IG55ID0gMDtcbiAgICAgICAgbGV0IGRvbmUgPSAwO1xuICAgICAgICBsZXQgYmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICBsZXQgZGlycyA9IFtcbiAgICAgICAgICAgIFswLCAwXSxcbiAgICAgICAgICAgIFswLCAwXSxcbiAgICAgICAgICAgIFswLCAwXSxcbiAgICAgICAgICAgIFswLCAwXVxuICAgICAgICBdO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBjeCA9IDEgKyAyICogTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogKHdpZHRoIC0gMSkgLyAyKTtcbiAgICAgICAgICAgIGN5ID0gMSArIDIgKiBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiAoaGVpZ2h0IC0gMSkgLyAyKTtcbiAgICAgICAgICAgIGlmICghZG9uZSkge1xuICAgICAgICAgICAgICAgIG1hcFtjeF1bY3ldID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbWFwW2N4XVtjeV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yYW5kb21pemUoZGlycyk7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogKHRoaXMuX3JlZ3VsYXJpdHkgKyAxKSkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmFuZG9taXplKGRpcnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbnggPSBjeCArIGRpcnNbaV1bMF0gKiAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgbnkgPSBjeSArIGRpcnNbaV1bMV0gKiAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzRnJlZShtYXAsIG54LCBueSwgd2lkdGgsIGhlaWdodCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBbbnhdW255XSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwW2N4ICsgZGlyc1tpXVswXV1bY3kgKyBkaXJzW2ldWzFdXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ggPSBueDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeSA9IG55O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb25lKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IHdoaWxlICghYmxvY2tlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKGRvbmUgKyAxIDwgd2lkdGggKiBoZWlnaHQgLyA0KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgbWFwW2ldW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYXAgPSBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIF9yYW5kb21pemUoZGlycykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgZGlyc1tpXVswXSA9IDA7XG4gICAgICAgICAgICBkaXJzW2ldWzFdID0gMDtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIDQpKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgZGlyc1swXVswXSA9IC0xO1xuICAgICAgICAgICAgICAgIGRpcnNbMV1bMF0gPSAxO1xuICAgICAgICAgICAgICAgIGRpcnNbMl1bMV0gPSAtMTtcbiAgICAgICAgICAgICAgICBkaXJzWzNdWzFdID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBkaXJzWzNdWzBdID0gLTE7XG4gICAgICAgICAgICAgICAgZGlyc1syXVswXSA9IDE7XG4gICAgICAgICAgICAgICAgZGlyc1sxXVsxXSA9IC0xO1xuICAgICAgICAgICAgICAgIGRpcnNbMF1bMV0gPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGRpcnNbMl1bMF0gPSAtMTtcbiAgICAgICAgICAgICAgICBkaXJzWzNdWzBdID0gMTtcbiAgICAgICAgICAgICAgICBkaXJzWzBdWzFdID0gLTE7XG4gICAgICAgICAgICAgICAgZGlyc1sxXVsxXSA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgZGlyc1sxXVswXSA9IC0xO1xuICAgICAgICAgICAgICAgIGRpcnNbMF1bMF0gPSAxO1xuICAgICAgICAgICAgICAgIGRpcnNbM11bMV0gPSAtMTtcbiAgICAgICAgICAgICAgICBkaXJzWzJdWzFdID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBfaXNGcmVlKG1hcCwgeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAoeCA8IDEgfHwgeSA8IDEgfHwgeCA+PSB3aWR0aCB8fCB5ID49IGhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXBbeF1beV07XG4gICAgfVxufVxuIiwiaW1wb3J0IEFyZW5hIGZyb20gXCIuL2FyZW5hLmpzXCI7XG5pbXBvcnQgVW5pZm9ybSBmcm9tIFwiLi91bmlmb3JtLmpzXCI7XG5pbXBvcnQgQ2VsbHVsYXIgZnJvbSBcIi4vY2VsbHVsYXIuanNcIjtcbmltcG9ydCBEaWdnZXIgZnJvbSBcIi4vZGlnZ2VyLmpzXCI7XG5pbXBvcnQgRWxsZXJNYXplIGZyb20gXCIuL2VsbGVybWF6ZS5qc1wiO1xuaW1wb3J0IERpdmlkZWRNYXplIGZyb20gXCIuL2RpdmlkZWRtYXplLmpzXCI7XG5pbXBvcnQgSWNleU1hemUgZnJvbSBcIi4vaWNleW1hemUuanNcIjtcbmltcG9ydCBSb2d1ZSBmcm9tIFwiLi9yb2d1ZS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgeyBBcmVuYSwgVW5pZm9ybSwgQ2VsbHVsYXIsIERpZ2dlciwgRWxsZXJNYXplLCBEaXZpZGVkTWF6ZSwgSWNleU1hemUsIFJvZ3VlIH07XG4iLCJpbXBvcnQgeyBERUZBVUxUX1dJRFRILCBERUZBVUxUX0hFSUdIVCB9IGZyb20gXCIuLi9jb25zdGFudHMuanNcIjtcbjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcCB7XG4gICAgLyoqXG4gICAgICogQGNsYXNzIEJhc2UgbWFwIGdlbmVyYXRvclxuICAgICAqIEBwYXJhbSB7aW50fSBbd2lkdGg9Uk9ULkRFRkFVTFRfV0lEVEhdXG4gICAgICogQHBhcmFtIHtpbnR9IFtoZWlnaHQ9Uk9ULkRFRkFVTFRfSEVJR0hUXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoID0gREVGQVVMVF9XSURUSCwgaGVpZ2h0ID0gREVGQVVMVF9IRUlHSFQpIHtcbiAgICAgICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgIH1cbiAgICA7XG4gICAgX2ZpbGxNYXAodmFsdWUpIHtcbiAgICAgICAgbGV0IG1hcCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3dpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIG1hcC5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICBtYXBbaV0ucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG59XG4iLCJpbXBvcnQgTWFwIGZyb20gXCIuL21hcC5qc1wiO1xuaW1wb3J0IFJORyBmcm9tIFwiLi4vcm5nLmpzXCI7XG5pbXBvcnQgeyBESVJTIH0gZnJvbSBcIi4uL2NvbnN0YW50cy5qc1wiO1xuLyoqXG4gKiBEdW5nZW9uIGdlbmVyYXRvciB3aGljaCB1c2VzIHRoZSBcIm9yZ2luYWxcIiBSb2d1ZSBkdW5nZW9uIGdlbmVyYXRpb24gYWxnb3JpdGhtLiBTZWUgaHR0cDovL2t1b2kuY29tL35rYW1pa2F6ZS9HYW1lRGVzaWduL2FydDA3X3JvZ3VlX2R1bmdlb24ucGhwXG4gKiBAYXV0aG9yIGh5YWt1Z2VpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvZ3VlIGV4dGVuZHMgTWFwIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLm1hcCA9IFtdO1xuICAgICAgICB0aGlzLnJvb21zID0gW107XG4gICAgICAgIHRoaXMuY29ubmVjdGVkQ2VsbHMgPSBbXTtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgY2VsbFdpZHRoOiAzLFxuICAgICAgICAgICAgY2VsbEhlaWdodDogMyAvLyAgICAgaWUuIGFzIGFuIGFycmF5IHdpdGggbWluLW1heCB2YWx1ZXMgZm9yIGVhY2ggZGlyZWN0aW9uLi4uLlxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICAgICAgLypcbiAgICAgICAgU2V0IHRoZSByb29tIHNpemVzIGFjY29yZGluZyB0byB0aGUgb3Zlci1hbGwgd2lkdGggb2YgdGhlIG1hcCxcbiAgICAgICAgYW5kIHRoZSBjZWxsIHNpemVzLlxuICAgICAgICAqL1xuICAgICAgICBpZiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJyb29tV2lkdGhcIikpIHtcbiAgICAgICAgICAgIG9wdGlvbnNbXCJyb29tV2lkdGhcIl0gPSB0aGlzLl9jYWxjdWxhdGVSb29tU2l6ZSh0aGlzLl93aWR0aCwgb3B0aW9uc1tcImNlbGxXaWR0aFwiXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvcHRpb25zLmhhc093blByb3BlcnR5KFwicm9vbUhlaWdodFwiKSkge1xuICAgICAgICAgICAgb3B0aW9uc1tcInJvb21IZWlnaHRcIl0gPSB0aGlzLl9jYWxjdWxhdGVSb29tU2l6ZSh0aGlzLl9oZWlnaHQsIG9wdGlvbnNbXCJjZWxsSGVpZ2h0XCJdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG4gICAgY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMubWFwID0gdGhpcy5fZmlsbE1hcCgxKTtcbiAgICAgICAgdGhpcy5yb29tcyA9IFtdO1xuICAgICAgICB0aGlzLmNvbm5lY3RlZENlbGxzID0gW107XG4gICAgICAgIHRoaXMuX2luaXRSb29tcygpO1xuICAgICAgICB0aGlzLl9jb25uZWN0Um9vbXMoKTtcbiAgICAgICAgdGhpcy5fY29ubmVjdFVuY29ubmVjdGVkUm9vbXMoKTtcbiAgICAgICAgdGhpcy5fY3JlYXRlUmFuZG9tUm9vbUNvbm5lY3Rpb25zKCk7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVJvb21zKCk7XG4gICAgICAgIHRoaXMuX2NyZWF0ZUNvcnJpZG9ycygpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgdGhpcy5tYXBbaV1bal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX2NhbGN1bGF0ZVJvb21TaXplKHNpemUsIGNlbGwpIHtcbiAgICAgICAgbGV0IG1heCA9IE1hdGguZmxvb3IoKHNpemUgLyBjZWxsKSAqIDAuOCk7XG4gICAgICAgIGxldCBtaW4gPSBNYXRoLmZsb29yKChzaXplIC8gY2VsbCkgKiAwLjI1KTtcbiAgICAgICAgaWYgKG1pbiA8IDIpIHtcbiAgICAgICAgICAgIG1pbiA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1heCA8IDIpIHtcbiAgICAgICAgICAgIG1heCA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFttaW4sIG1heF07XG4gICAgfVxuICAgIF9pbml0Um9vbXMoKSB7XG4gICAgICAgIC8vIGNyZWF0ZSByb29tcyBhcnJheS4gVGhpcyBpcyB0aGUgXCJncmlkXCIgbGlzdCBmcm9tIHRoZSBhbGdvLlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucm9vbXMucHVzaChbXSk7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tc1tpXS5wdXNoKHsgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDAsIFwiaGVpZ2h0XCI6IDAsIFwiY29ubmVjdGlvbnNcIjogW10sIFwiY2VsbHhcIjogaSwgXCJjZWxseVwiOiBqIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9jb25uZWN0Um9vbXMoKSB7XG4gICAgICAgIC8vcGljayByYW5kb20gc3RhcnRpbmcgZ3JpZFxuICAgICAgICBsZXQgY2d4ID0gUk5HLmdldFVuaWZvcm1JbnQoMCwgdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGggLSAxKTtcbiAgICAgICAgbGV0IGNneSA9IFJORy5nZXRVbmlmb3JtSW50KDAsIHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodCAtIDEpO1xuICAgICAgICBsZXQgaWR4O1xuICAgICAgICBsZXQgbmNneDtcbiAgICAgICAgbGV0IG5jZ3k7XG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICBsZXQgcm9vbTtcbiAgICAgICAgbGV0IG90aGVyUm9vbTtcbiAgICAgICAgbGV0IGRpclRvQ2hlY2s7XG4gICAgICAgIC8vIGZpbmQgIHVuY29ubmVjdGVkIG5laWdoYm91ciBjZWxsc1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICAvL2RpclRvQ2hlY2sgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgN107XG4gICAgICAgICAgICBkaXJUb0NoZWNrID0gWzAsIDIsIDQsIDZdO1xuICAgICAgICAgICAgZGlyVG9DaGVjayA9IFJORy5zaHVmZmxlKGRpclRvQ2hlY2spO1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWR4ID0gZGlyVG9DaGVjay5wb3AoKTtcbiAgICAgICAgICAgICAgICBuY2d4ID0gY2d4ICsgRElSU1s4XVtpZHhdWzBdO1xuICAgICAgICAgICAgICAgIG5jZ3kgPSBjZ3kgKyBESVJTWzhdW2lkeF1bMV07XG4gICAgICAgICAgICAgICAgaWYgKG5jZ3ggPCAwIHx8IG5jZ3ggPj0gdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuY2d5IDwgMCB8fCBuY2d5ID49IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcm9vbSA9IHRoaXMucm9vbXNbY2d4XVtjZ3ldO1xuICAgICAgICAgICAgICAgIGlmIChyb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBhcyBsb25nIGFzIHRoaXMgcm9vbSBkb2Vzbid0IGFscmVhZHkgY29vbmVjdCB0byBtZSwgd2UgYXJlIG9rIHdpdGggaXQuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb29tW1wiY29ubmVjdGlvbnNcIl1bMF1bMF0gPT0gbmNneCAmJiByb29tW1wiY29ubmVjdGlvbnNcIl1bMF1bMV0gPT0gbmNneSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3RoZXJSb29tID0gdGhpcy5yb29tc1tuY2d4XVtuY2d5XTtcbiAgICAgICAgICAgICAgICBpZiAob3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl0ucHVzaChbY2d4LCBjZ3ldKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0ZWRDZWxscy5wdXNoKFtuY2d4LCBuY2d5XSk7XG4gICAgICAgICAgICAgICAgICAgIGNneCA9IG5jZ3g7XG4gICAgICAgICAgICAgICAgICAgIGNneSA9IG5jZ3k7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IHdoaWxlIChkaXJUb0NoZWNrLmxlbmd0aCA+IDAgJiYgZm91bmQgPT0gZmFsc2UpO1xuICAgICAgICB9IHdoaWxlIChkaXJUb0NoZWNrLmxlbmd0aCA+IDApO1xuICAgIH1cbiAgICBfY29ubmVjdFVuY29ubmVjdGVkUm9vbXMoKSB7XG4gICAgICAgIC8vV2hpbGUgdGhlcmUgYXJlIHVuY29ubmVjdGVkIHJvb21zLCB0cnkgdG8gY29ubmVjdCB0aGVtIHRvIGEgcmFuZG9tIGNvbm5lY3RlZCBuZWlnaGJvclxuICAgICAgICAvLyhpZiBhIHJvb20gaGFzIG5vIGNvbm5lY3RlZCBuZWlnaGJvcnMgeWV0LCBqdXN0IGtlZXAgY3ljbGluZywgeW91J2xsIGZpbGwgb3V0IHRvIGl0IGV2ZW50dWFsbHkpLlxuICAgICAgICBsZXQgY3cgPSB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aDtcbiAgICAgICAgbGV0IGNoID0gdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0O1xuICAgICAgICB0aGlzLmNvbm5lY3RlZENlbGxzID0gUk5HLnNodWZmbGUodGhpcy5jb25uZWN0ZWRDZWxscyk7XG4gICAgICAgIGxldCByb29tO1xuICAgICAgICBsZXQgb3RoZXJSb29tO1xuICAgICAgICBsZXQgdmFsaWRSb29tO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICByb29tID0gdGhpcy5yb29tc1tpXVtqXTtcbiAgICAgICAgICAgICAgICBpZiAocm9vbVtcImNvbm5lY3Rpb25zXCJdLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXJlY3Rpb25zID0gWzAsIDIsIDQsIDZdO1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25zID0gUk5HLnNodWZmbGUoZGlyZWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkUm9vbSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlySWR4ID0gZGlyZWN0aW9ucy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdJID0gaSArIERJUlNbOF1bZGlySWR4XVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdKID0gaiArIERJUlNbOF1bZGlySWR4XVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdJIDwgMCB8fCBuZXdJID49IGN3IHx8IG5ld0ogPCAwIHx8IG5ld0ogPj0gY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyUm9vbSA9IHRoaXMucm9vbXNbbmV3SV1bbmV3Sl07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZFJvb20gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyUm9vbVtcImNvbm5lY3Rpb25zXCJdLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG90aGVyUm9vbVtcImNvbm5lY3Rpb25zXCJdLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyUm9vbVtcImNvbm5lY3Rpb25zXCJdW2tdWzBdID09IGkgJiYgb3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl1ba11bMV0gPT0gaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZFJvb20gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkUm9vbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IHdoaWxlIChkaXJlY3Rpb25zLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZFJvb20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb21bXCJjb25uZWN0aW9uc1wiXS5wdXNoKFtvdGhlclJvb21bXCJjZWxseFwiXSwgb3RoZXJSb29tW1wiY2VsbHlcIl1dKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0gVW5hYmxlIHRvIGNvbm5lY3Qgcm9vbS5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2NyZWF0ZVJhbmRvbVJvb21Db25uZWN0aW9ucygpIHtcbiAgICAgICAgLy8gRW1wdHkgZm9yIG5vdy5cbiAgICB9XG4gICAgX2NyZWF0ZVJvb21zKCkge1xuICAgICAgICBsZXQgdyA9IHRoaXMuX3dpZHRoO1xuICAgICAgICBsZXQgaCA9IHRoaXMuX2hlaWdodDtcbiAgICAgICAgbGV0IGN3ID0gdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGg7XG4gICAgICAgIGxldCBjaCA9IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodDtcbiAgICAgICAgbGV0IGN3cCA9IE1hdGguZmxvb3IodGhpcy5fd2lkdGggLyBjdyk7XG4gICAgICAgIGxldCBjaHAgPSBNYXRoLmZsb29yKHRoaXMuX2hlaWdodCAvIGNoKTtcbiAgICAgICAgbGV0IHJvb213O1xuICAgICAgICBsZXQgcm9vbWg7XG4gICAgICAgIGxldCByb29tV2lkdGggPSB0aGlzLl9vcHRpb25zW1wicm9vbVdpZHRoXCJdO1xuICAgICAgICBsZXQgcm9vbUhlaWdodCA9IHRoaXMuX29wdGlvbnNbXCJyb29tSGVpZ2h0XCJdO1xuICAgICAgICBsZXQgc3g7XG4gICAgICAgIGxldCBzeTtcbiAgICAgICAgbGV0IG90aGVyUm9vbTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdzsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBzeCA9IGN3cCAqIGk7XG4gICAgICAgICAgICAgICAgc3kgPSBjaHAgKiBqO1xuICAgICAgICAgICAgICAgIGlmIChzeCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN4ID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN5ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc3kgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByb29tdyA9IFJORy5nZXRVbmlmb3JtSW50KHJvb21XaWR0aFswXSwgcm9vbVdpZHRoWzFdKTtcbiAgICAgICAgICAgICAgICByb29taCA9IFJORy5nZXRVbmlmb3JtSW50KHJvb21IZWlnaHRbMF0sIHJvb21IZWlnaHRbMV0pO1xuICAgICAgICAgICAgICAgIGlmIChqID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBvdGhlclJvb20gPSB0aGlzLnJvb21zW2ldW2ogLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHN5IC0gKG90aGVyUm9vbVtcInlcIl0gKyBvdGhlclJvb21bXCJoZWlnaHRcIl0pIDwgMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3krKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJSb29tID0gdGhpcy5yb29tc1tpIC0gMV1bal07XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChzeCAtIChvdGhlclJvb21bXCJ4XCJdICsgb3RoZXJSb29tW1wid2lkdGhcIl0pIDwgMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3grKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgc3hPZmZzZXQgPSBNYXRoLnJvdW5kKFJORy5nZXRVbmlmb3JtSW50KDAsIGN3cCAtIHJvb213KSAvIDIpO1xuICAgICAgICAgICAgICAgIGxldCBzeU9mZnNldCA9IE1hdGgucm91bmQoUk5HLmdldFVuaWZvcm1JbnQoMCwgY2hwIC0gcm9vbWgpIC8gMik7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHN4ICsgc3hPZmZzZXQgKyByb29tdyA+PSB3KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzeE9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3hPZmZzZXQtLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb213LS07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKHN5ICsgc3lPZmZzZXQgKyByb29taCA+PSBoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzeU9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3lPZmZzZXQtLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb21oLS07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3ggPSBzeCArIHN4T2Zmc2V0O1xuICAgICAgICAgICAgICAgIHN5ID0gc3kgKyBzeU9mZnNldDtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb21zW2ldW2pdW1wieFwiXSA9IHN4O1xuICAgICAgICAgICAgICAgIHRoaXMucm9vbXNbaV1bal1bXCJ5XCJdID0gc3k7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tc1tpXVtqXVtcIndpZHRoXCJdID0gcm9vbXc7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tc1tpXVtqXVtcImhlaWdodFwiXSA9IHJvb21oO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGlpID0gc3g7IGlpIDwgc3ggKyByb29tdzsgaWkrKykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqaiA9IHN5OyBqaiA8IHN5ICsgcm9vbWg7IGpqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwW2lpXVtqal0gPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXRXYWxsUG9zaXRpb24oYVJvb20sIGFEaXJlY3Rpb24pIHtcbiAgICAgICAgbGV0IHJ4O1xuICAgICAgICBsZXQgcnk7XG4gICAgICAgIGxldCBkb29yO1xuICAgICAgICBpZiAoYURpcmVjdGlvbiA9PSAxIHx8IGFEaXJlY3Rpb24gPT0gMykge1xuICAgICAgICAgICAgcnggPSBSTkcuZ2V0VW5pZm9ybUludChhUm9vbVtcInhcIl0gKyAxLCBhUm9vbVtcInhcIl0gKyBhUm9vbVtcIndpZHRoXCJdIC0gMik7XG4gICAgICAgICAgICBpZiAoYURpcmVjdGlvbiA9PSAxKSB7XG4gICAgICAgICAgICAgICAgcnkgPSBhUm9vbVtcInlcIl0gLSAyO1xuICAgICAgICAgICAgICAgIGRvb3IgPSByeSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByeSA9IGFSb29tW1wieVwiXSArIGFSb29tW1wiaGVpZ2h0XCJdICsgMTtcbiAgICAgICAgICAgICAgICBkb29yID0gcnkgLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tYXBbcnhdW2Rvb3JdID0gMDsgLy8gaSdtIG5vdCBzZXR0aW5nIGEgc3BlY2lmaWMgJ2Rvb3InIHRpbGUgdmFsdWUgcmlnaHQgbm93LCBqdXN0IGVtcHR5IHNwYWNlLlxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcnkgPSBSTkcuZ2V0VW5pZm9ybUludChhUm9vbVtcInlcIl0gKyAxLCBhUm9vbVtcInlcIl0gKyBhUm9vbVtcImhlaWdodFwiXSAtIDIpO1xuICAgICAgICAgICAgaWYgKGFEaXJlY3Rpb24gPT0gMikge1xuICAgICAgICAgICAgICAgIHJ4ID0gYVJvb21bXCJ4XCJdICsgYVJvb21bXCJ3aWR0aFwiXSArIDE7XG4gICAgICAgICAgICAgICAgZG9vciA9IHJ4IC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJ4ID0gYVJvb21bXCJ4XCJdIC0gMjtcbiAgICAgICAgICAgICAgICBkb29yID0gcnggKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tYXBbZG9vcl1bcnldID0gMDsgLy8gaSdtIG5vdCBzZXR0aW5nIGEgc3BlY2lmaWMgJ2Rvb3InIHRpbGUgdmFsdWUgcmlnaHQgbm93LCBqdXN0IGVtcHR5IHNwYWNlLlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbcngsIHJ5XTtcbiAgICB9XG4gICAgX2RyYXdDb3JyaWRvcihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbikge1xuICAgICAgICBsZXQgeE9mZnNldCA9IGVuZFBvc2l0aW9uWzBdIC0gc3RhcnRQb3NpdGlvblswXTtcbiAgICAgICAgbGV0IHlPZmZzZXQgPSBlbmRQb3NpdGlvblsxXSAtIHN0YXJ0UG9zaXRpb25bMV07XG4gICAgICAgIGxldCB4cG9zID0gc3RhcnRQb3NpdGlvblswXTtcbiAgICAgICAgbGV0IHlwb3MgPSBzdGFydFBvc2l0aW9uWzFdO1xuICAgICAgICBsZXQgdGVtcERpc3Q7XG4gICAgICAgIGxldCB4RGlyO1xuICAgICAgICBsZXQgeURpcjtcbiAgICAgICAgbGV0IG1vdmU7IC8vIDIgZWxlbWVudCBhcnJheSwgZWxlbWVudCAwIGlzIHRoZSBkaXJlY3Rpb24sIGVsZW1lbnQgMSBpcyB0aGUgdG90YWwgdmFsdWUgdG8gbW92ZS5cbiAgICAgICAgbGV0IG1vdmVzID0gW107IC8vIGEgbGlzdCBvZiAyIGVsZW1lbnQgYXJyYXlzXG4gICAgICAgIGxldCB4QWJzID0gTWF0aC5hYnMoeE9mZnNldCk7XG4gICAgICAgIGxldCB5QWJzID0gTWF0aC5hYnMoeU9mZnNldCk7XG4gICAgICAgIGxldCBwZXJjZW50ID0gUk5HLmdldFVuaWZvcm0oKTsgLy8gdXNlZCB0byBzcGxpdCB0aGUgbW92ZSBhdCBkaWZmZXJlbnQgcGxhY2VzIGFsb25nIHRoZSBsb25nIGF4aXNcbiAgICAgICAgbGV0IGZpcnN0SGFsZiA9IHBlcmNlbnQ7XG4gICAgICAgIGxldCBzZWNvbmRIYWxmID0gMSAtIHBlcmNlbnQ7XG4gICAgICAgIHhEaXIgPSB4T2Zmc2V0ID4gMCA/IDIgOiA2O1xuICAgICAgICB5RGlyID0geU9mZnNldCA+IDAgPyA0IDogMDtcbiAgICAgICAgaWYgKHhBYnMgPCB5QWJzKSB7XG4gICAgICAgICAgICAvLyBtb3ZlIGZpcnN0SGFsZiBvZiB0aGUgeSBvZmZzZXRcbiAgICAgICAgICAgIHRlbXBEaXN0ID0gTWF0aC5jZWlsKHlBYnMgKiBmaXJzdEhhbGYpO1xuICAgICAgICAgICAgbW92ZXMucHVzaChbeURpciwgdGVtcERpc3RdKTtcbiAgICAgICAgICAgIC8vIG1vdmUgYWxsIHRoZSB4IG9mZnNldFxuICAgICAgICAgICAgbW92ZXMucHVzaChbeERpciwgeEFic10pO1xuICAgICAgICAgICAgLy8gbW92ZSBzZW5kSGFsZiBvZiB0aGUgIHkgb2Zmc2V0XG4gICAgICAgICAgICB0ZW1wRGlzdCA9IE1hdGguZmxvb3IoeUFicyAqIHNlY29uZEhhbGYpO1xuICAgICAgICAgICAgbW92ZXMucHVzaChbeURpciwgdGVtcERpc3RdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vICBtb3ZlIGZpcnN0SGFsZiBvZiB0aGUgeCBvZmZzZXRcbiAgICAgICAgICAgIHRlbXBEaXN0ID0gTWF0aC5jZWlsKHhBYnMgKiBmaXJzdEhhbGYpO1xuICAgICAgICAgICAgbW92ZXMucHVzaChbeERpciwgdGVtcERpc3RdKTtcbiAgICAgICAgICAgIC8vIG1vdmUgYWxsIHRoZSB5IG9mZnNldFxuICAgICAgICAgICAgbW92ZXMucHVzaChbeURpciwgeUFic10pO1xuICAgICAgICAgICAgLy8gbW92ZSBzZWNvbmRIYWxmIG9mIHRoZSB4IG9mZnNldC5cbiAgICAgICAgICAgIHRlbXBEaXN0ID0gTWF0aC5mbG9vcih4QWJzICogc2Vjb25kSGFsZik7XG4gICAgICAgICAgICBtb3Zlcy5wdXNoKFt4RGlyLCB0ZW1wRGlzdF0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWFwW3hwb3NdW3lwb3NdID0gMDtcbiAgICAgICAgd2hpbGUgKG1vdmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG1vdmUgPSBtb3Zlcy5wb3AoKTtcbiAgICAgICAgICAgIHdoaWxlIChtb3ZlWzFdID4gMCkge1xuICAgICAgICAgICAgICAgIHhwb3MgKz0gRElSU1s4XVttb3ZlWzBdXVswXTtcbiAgICAgICAgICAgICAgICB5cG9zICs9IERJUlNbOF1bbW92ZVswXV1bMV07XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBbeHBvc11beXBvc10gPSAwO1xuICAgICAgICAgICAgICAgIG1vdmVbMV0gPSBtb3ZlWzFdIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfY3JlYXRlQ29ycmlkb3JzKCkge1xuICAgICAgICAvLyBEcmF3IENvcnJpZG9ycyBiZXR3ZWVuIGNvbm5lY3RlZCByb29tc1xuICAgICAgICBsZXQgY3cgPSB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aDtcbiAgICAgICAgbGV0IGNoID0gdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0O1xuICAgICAgICBsZXQgcm9vbTtcbiAgICAgICAgbGV0IGNvbm5lY3Rpb247XG4gICAgICAgIGxldCBvdGhlclJvb207XG4gICAgICAgIGxldCB3YWxsO1xuICAgICAgICBsZXQgb3RoZXJXYWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN3OyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2g7IGorKykge1xuICAgICAgICAgICAgICAgIHJvb20gPSB0aGlzLnJvb21zW2ldW2pdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcm9vbVtcImNvbm5lY3Rpb25zXCJdLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24gPSByb29tW1wiY29ubmVjdGlvbnNcIl1ba107XG4gICAgICAgICAgICAgICAgICAgIG90aGVyUm9vbSA9IHRoaXMucm9vbXNbY29ubmVjdGlvblswXV1bY29ubmVjdGlvblsxXV07XG4gICAgICAgICAgICAgICAgICAgIC8vIGZpZ3VyZSBvdXQgd2hhdCB3YWxsIG91ciBjb3JyaWRvciB3aWxsIHN0YXJ0IG9uZS5cbiAgICAgICAgICAgICAgICAgICAgLy8gZmlndXJlIG91dCB3aGF0IHdhbGwgb3VyIGNvcnJpZG9yIHdpbGwgZW5kIG9uLlxuICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJSb29tW1wiY2VsbHhcIl0gPiByb29tW1wiY2VsbHhcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhbGwgPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJXYWxsID0gNDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvdGhlclJvb21bXCJjZWxseFwiXSA8IHJvb21bXCJjZWxseFwiXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2FsbCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlcldhbGwgPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG90aGVyUm9vbVtcImNlbGx5XCJdID4gcm9vbVtcImNlbGx5XCJdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3YWxsID0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyV2FsbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3YWxsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyV2FsbCA9IDM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZHJhd0NvcnJpZG9yKHRoaXMuX2dldFdhbGxQb3NpdGlvbihyb29tLCB3YWxsKSwgdGhpcy5fZ2V0V2FsbFBvc2l0aW9uKG90aGVyUm9vbSwgb3RoZXJXYWxsKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IER1bmdlb24gZnJvbSBcIi4vZHVuZ2Vvbi5qc1wiO1xuaW1wb3J0IHsgUm9vbSwgQ29ycmlkb3IgfSBmcm9tIFwiLi9mZWF0dXJlcy5qc1wiO1xuaW1wb3J0IFJORyBmcm9tIFwiLi4vcm5nLmpzXCI7XG47XG4vKipcbiAqIEBjbGFzcyBEdW5nZW9uIGdlbmVyYXRvciB3aGljaCB0cmllcyB0byBmaWxsIHRoZSBzcGFjZSBldmVubHkuIEdlbmVyYXRlcyBpbmRlcGVuZGVudCByb29tcyBhbmQgdHJpZXMgdG8gY29ubmVjdCB0aGVtLlxuICogQGF1Z21lbnRzIFJPVC5NYXAuRHVuZ2VvblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbmlmb3JtIGV4dGVuZHMgRHVuZ2VvbiB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcih3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHJvb21XaWR0aDogWzMsIDldLFxuICAgICAgICAgICAgcm9vbUhlaWdodDogWzMsIDVdLFxuICAgICAgICAgICAgcm9vbUR1Z1BlcmNlbnRhZ2U6IDAuMSxcbiAgICAgICAgICAgIHRpbWVMaW1pdDogMTAwMCAvKiB3ZSBzdG9wIGFmdGVyIHRoaXMgbXVjaCB0aW1lIGhhcyBwYXNzZWQgKG1zZWMpICovXG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX21hcCA9IFtdO1xuICAgICAgICB0aGlzLl9kdWcgPSAwO1xuICAgICAgICB0aGlzLl9yb29tQXR0ZW1wdHMgPSAyMDsgLyogbmV3IHJvb20gaXMgY3JlYXRlZCBOLXRpbWVzIHVudGlsIGlzIGNvbnNpZGVyZWQgYXMgaW1wb3NzaWJsZSB0byBnZW5lcmF0ZSAqL1xuICAgICAgICB0aGlzLl9jb3JyaWRvckF0dGVtcHRzID0gMjA7IC8qIGNvcnJpZG9ycyBhcmUgdHJpZWQgTi10aW1lcyB1bnRpbCB0aGUgbGV2ZWwgaXMgY29uc2lkZXJlZCBhcyBpbXBvc3NpYmxlIHRvIGNvbm5lY3QgKi9cbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gW107IC8qIGxpc3Qgb2YgYWxyZWFkeSBjb25uZWN0ZWQgcm9vbXMgKi9cbiAgICAgICAgdGhpcy5fdW5jb25uZWN0ZWQgPSBbXTsgLyogbGlzdCBvZiByZW1haW5pbmcgdW5jb25uZWN0ZWQgcm9vbXMgKi9cbiAgICAgICAgdGhpcy5fZGlnQ2FsbGJhY2sgPSB0aGlzLl9kaWdDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9jYW5CZUR1Z0NhbGxiYWNrID0gdGhpcy5fY2FuQmVEdWdDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9pc1dhbGxDYWxsYmFjayA9IHRoaXMuX2lzV2FsbENhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG1hcC4gSWYgdGhlIHRpbWUgbGltaXQgaGFzIGJlZW4gaGl0LCByZXR1cm5zIG51bGwuXG4gICAgICogQHNlZSBST1QuTWFwI2NyZWF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgICBsZXQgdDEgPSBEYXRlLm5vdygpO1xuICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgbGV0IHQyID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGlmICh0MiAtIHQxID4gdGhpcy5fb3B0aW9ucy50aW1lTGltaXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0gLyogdGltZSBsaW1pdCEgKi9cbiAgICAgICAgICAgIHRoaXMuX21hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XG4gICAgICAgICAgICB0aGlzLl9kdWcgPSAwO1xuICAgICAgICAgICAgdGhpcy5fcm9vbXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3VuY29ubmVjdGVkID0gW107XG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZVJvb21zKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fcm9vbXMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2dlbmVyYXRlQ29ycmlkb3JzKCkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgdGhpcy5fbWFwW2ldW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHN1aXRhYmxlIGFtb3VudCBvZiByb29tc1xuICAgICAqL1xuICAgIF9nZW5lcmF0ZVJvb21zKCkge1xuICAgICAgICBsZXQgdyA9IHRoaXMuX3dpZHRoIC0gMjtcbiAgICAgICAgbGV0IGggPSB0aGlzLl9oZWlnaHQgLSAyO1xuICAgICAgICBsZXQgcm9vbTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgcm9vbSA9IHRoaXMuX2dlbmVyYXRlUm9vbSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2R1ZyAvICh3ICogaCkgPiB0aGlzLl9vcHRpb25zLnJvb21EdWdQZXJjZW50YWdlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IC8qIGFjaGlldmVkIHJlcXVlc3RlZCBhbW91bnQgb2YgZnJlZSBzcGFjZSAqL1xuICAgICAgICB9IHdoaWxlIChyb29tKTtcbiAgICAgICAgLyogZWl0aGVyIGVub3VnaCByb29tcywgb3Igbm90IGFibGUgdG8gZ2VuZXJhdGUgbW9yZSBvZiB0aGVtIDopICovXG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRyeSB0byBnZW5lcmF0ZSBvbmUgcm9vbVxuICAgICAqL1xuICAgIF9nZW5lcmF0ZVJvb20oKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHdoaWxlIChjb3VudCA8IHRoaXMuX3Jvb21BdHRlbXB0cykge1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIGxldCByb29tID0gUm9vbS5jcmVhdGVSYW5kb20odGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCwgdGhpcy5fb3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoIXJvb20uaXNWYWxpZCh0aGlzLl9pc1dhbGxDYWxsYmFjaywgdGhpcy5fY2FuQmVEdWdDYWxsYmFjaykpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvb20uY3JlYXRlKHRoaXMuX2RpZ0NhbGxiYWNrKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb21zLnB1c2gocm9vbSk7XG4gICAgICAgICAgICByZXR1cm4gcm9vbTtcbiAgICAgICAgfVxuICAgICAgICAvKiBubyByb29tIHdhcyBnZW5lcmF0ZWQgaW4gYSBnaXZlbiBudW1iZXIgb2YgYXR0ZW1wdHMgKi9cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBjb25uZWN0b3JzIGJld2VlbiByb29tc1xuICAgICAqIEByZXR1cm5zIHtib29sfSBzdWNjZXNzIFdhcyB0aGlzIGF0dGVtcHQgc3VjY2Vzc2Z1bGw/XG4gICAgICovXG4gICAgX2dlbmVyYXRlQ29ycmlkb3JzKCkge1xuICAgICAgICBsZXQgY250ID0gMDtcbiAgICAgICAgd2hpbGUgKGNudCA8IHRoaXMuX2NvcnJpZG9yQXR0ZW1wdHMpIHtcbiAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgdGhpcy5fY29ycmlkb3JzID0gW107XG4gICAgICAgICAgICAvKiBkaWcgcm9vbXMgaW50byBhIGNsZWFyIG1hcCAqL1xuICAgICAgICAgICAgdGhpcy5fbWFwID0gdGhpcy5fZmlsbE1hcCgxKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcm9vbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcm9vbSA9IHRoaXMuX3Jvb21zW2ldO1xuICAgICAgICAgICAgICAgIHJvb20uY2xlYXJEb29ycygpO1xuICAgICAgICAgICAgICAgIHJvb20uY3JlYXRlKHRoaXMuX2RpZ0NhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3VuY29ubmVjdGVkID0gUk5HLnNodWZmbGUodGhpcy5fcm9vbXMuc2xpY2UoKSk7XG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBbXTtcbiAgICAgICAgICAgIGlmICh0aGlzLl91bmNvbm5lY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0ZWQucHVzaCh0aGlzLl91bmNvbm5lY3RlZC5wb3AoKSk7XG4gICAgICAgICAgICB9IC8qIGZpcnN0IG9uZSBpcyBhbHdheXMgY29ubmVjdGVkICovXG4gICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgIC8qIDEuIHBpY2sgcmFuZG9tIGNvbm5lY3RlZCByb29tICovXG4gICAgICAgICAgICAgICAgbGV0IGNvbm5lY3RlZCA9IFJORy5nZXRJdGVtKHRoaXMuX2Nvbm5lY3RlZCk7XG4gICAgICAgICAgICAgICAgaWYgKCFjb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qIDIuIGZpbmQgY2xvc2VzdCB1bmNvbm5lY3RlZCAqL1xuICAgICAgICAgICAgICAgIGxldCByb29tMSA9IHRoaXMuX2Nsb3Nlc3RSb29tKHRoaXMuX3VuY29ubmVjdGVkLCBjb25uZWN0ZWQpO1xuICAgICAgICAgICAgICAgIGlmICghcm9vbTEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qIDMuIGNvbm5lY3QgaXQgdG8gY2xvc2VzdCBjb25uZWN0ZWQgKi9cbiAgICAgICAgICAgICAgICBsZXQgcm9vbTIgPSB0aGlzLl9jbG9zZXN0Um9vbSh0aGlzLl9jb25uZWN0ZWQsIHJvb20xKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJvb20yKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgb2sgPSB0aGlzLl9jb25uZWN0Um9vbXMocm9vbTEsIHJvb20yKTtcbiAgICAgICAgICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gLyogc3RvcCBjb25uZWN0aW5nLCByZS1zaHVmZmxlICovXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl91bmNvbm5lY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSAvKiBkb25lOyBubyByb29tcyByZW1haW4gKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIDtcbiAgICAvKipcbiAgICAgKiBGb3IgYSBnaXZlbiByb29tLCBmaW5kIHRoZSBjbG9zZXN0IG9uZSBmcm9tIHRoZSBsaXN0XG4gICAgICovXG4gICAgX2Nsb3Nlc3RSb29tKHJvb21zLCByb29tKSB7XG4gICAgICAgIGxldCBkaXN0ID0gSW5maW5pdHk7XG4gICAgICAgIGxldCBjZW50ZXIgPSByb29tLmdldENlbnRlcigpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb29tcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHIgPSByb29tc1tpXTtcbiAgICAgICAgICAgIGxldCBjID0gci5nZXRDZW50ZXIoKTtcbiAgICAgICAgICAgIGxldCBkeCA9IGNbMF0gLSBjZW50ZXJbMF07XG4gICAgICAgICAgICBsZXQgZHkgPSBjWzFdIC0gY2VudGVyWzFdO1xuICAgICAgICAgICAgbGV0IGQgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICAgICAgICAgIGlmIChkIDwgZGlzdCkge1xuICAgICAgICAgICAgICAgIGRpc3QgPSBkO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgX2Nvbm5lY3RSb29tcyhyb29tMSwgcm9vbTIpIHtcbiAgICAgICAgLypcbiAgICAgICAgICAgIHJvb20xLmRlYnVnKCk7XG4gICAgICAgICAgICByb29tMi5kZWJ1ZygpO1xuICAgICAgICAqL1xuICAgICAgICBsZXQgY2VudGVyMSA9IHJvb20xLmdldENlbnRlcigpO1xuICAgICAgICBsZXQgY2VudGVyMiA9IHJvb20yLmdldENlbnRlcigpO1xuICAgICAgICBsZXQgZGlmZlggPSBjZW50ZXIyWzBdIC0gY2VudGVyMVswXTtcbiAgICAgICAgbGV0IGRpZmZZID0gY2VudGVyMlsxXSAtIGNlbnRlcjFbMV07XG4gICAgICAgIGxldCBzdGFydDtcbiAgICAgICAgbGV0IGVuZDtcbiAgICAgICAgbGV0IGRpckluZGV4MSwgZGlySW5kZXgyLCBtaW4sIG1heCwgaW5kZXg7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaWZmWCkgPCBNYXRoLmFicyhkaWZmWSkpIHsgLyogZmlyc3QgdHJ5IGNvbm5lY3Rpbmcgbm9ydGgtc291dGggd2FsbHMgKi9cbiAgICAgICAgICAgIGRpckluZGV4MSA9IChkaWZmWSA+IDAgPyAyIDogMCk7XG4gICAgICAgICAgICBkaXJJbmRleDIgPSAoZGlySW5kZXgxICsgMikgJSA0O1xuICAgICAgICAgICAgbWluID0gcm9vbTIuZ2V0TGVmdCgpO1xuICAgICAgICAgICAgbWF4ID0gcm9vbTIuZ2V0UmlnaHQoKTtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLyogZmlyc3QgdHJ5IGNvbm5lY3RpbmcgZWFzdC13ZXN0IHdhbGxzICovXG4gICAgICAgICAgICBkaXJJbmRleDEgPSAoZGlmZlggPiAwID8gMSA6IDMpO1xuICAgICAgICAgICAgZGlySW5kZXgyID0gKGRpckluZGV4MSArIDIpICUgNDtcbiAgICAgICAgICAgIG1pbiA9IHJvb20yLmdldFRvcCgpO1xuICAgICAgICAgICAgbWF4ID0gcm9vbTIuZ2V0Qm90dG9tKCk7XG4gICAgICAgICAgICBpbmRleCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgc3RhcnQgPSB0aGlzLl9wbGFjZUluV2FsbChyb29tMSwgZGlySW5kZXgxKTsgLyogY29ycmlkb3Igd2lsbCBzdGFydCBoZXJlICovXG4gICAgICAgIGlmICghc3RhcnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRbaW5kZXhdID49IG1pbiAmJiBzdGFydFtpbmRleF0gPD0gbWF4KSB7IC8qIHBvc3NpYmxlIHRvIGNvbm5lY3Qgd2l0aCBzdHJhaWdodCBsaW5lIChJLWxpa2UpICovXG4gICAgICAgICAgICBlbmQgPSBzdGFydC5zbGljZSgpO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gMDtcbiAgICAgICAgICAgIHN3aXRjaCAoZGlySW5kZXgyKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHJvb20yLmdldFRvcCgpIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHJvb20yLmdldFJpZ2h0KCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcm9vbTIuZ2V0Qm90dG9tKCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcm9vbTIuZ2V0TGVmdCgpIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRbKGluZGV4ICsgMSkgJSAyXSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fZGlnTGluZShbc3RhcnQsIGVuZF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0YXJ0W2luZGV4XSA8IG1pbiAtIDEgfHwgc3RhcnRbaW5kZXhdID4gbWF4ICsgMSkgeyAvKiBuZWVkIHRvIHN3aXRjaCB0YXJnZXQgd2FsbCAoTC1saWtlKSAqL1xuICAgICAgICAgICAgbGV0IGRpZmYgPSBzdGFydFtpbmRleF0gLSBjZW50ZXIyW2luZGV4XTtcbiAgICAgICAgICAgIGxldCByb3RhdGlvbiA9IDA7XG4gICAgICAgICAgICBzd2l0Y2ggKGRpckluZGV4Mikge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJvdGF0aW9uID0gKGRpZmYgPCAwID8gMyA6IDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICByb3RhdGlvbiA9IChkaWZmIDwgMCA/IDEgOiAzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXJJbmRleDIgPSAoZGlySW5kZXgyICsgcm90YXRpb24pICUgNDtcbiAgICAgICAgICAgIGVuZCA9IHRoaXMuX3BsYWNlSW5XYWxsKHJvb20yLCBkaXJJbmRleDIpO1xuICAgICAgICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbWlkID0gWzAsIDBdO1xuICAgICAgICAgICAgbWlkW2luZGV4XSA9IHN0YXJ0W2luZGV4XTtcbiAgICAgICAgICAgIGxldCBpbmRleDIgPSAoaW5kZXggKyAxKSAlIDI7XG4gICAgICAgICAgICBtaWRbaW5kZXgyXSA9IGVuZFtpbmRleDJdO1xuICAgICAgICAgICAgdGhpcy5fZGlnTGluZShbc3RhcnQsIG1pZCwgZW5kXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8qIHVzZSBjdXJyZW50IHdhbGwgcGFpciwgYnV0IGFkanVzdCB0aGUgbGluZSBpbiB0aGUgbWlkZGxlIChTLWxpa2UpICovXG4gICAgICAgICAgICBsZXQgaW5kZXgyID0gKGluZGV4ICsgMSkgJSAyO1xuICAgICAgICAgICAgZW5kID0gdGhpcy5fcGxhY2VJbldhbGwocm9vbTIsIGRpckluZGV4Mik7XG4gICAgICAgICAgICBpZiAoIWVuZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBtaWQgPSBNYXRoLnJvdW5kKChlbmRbaW5kZXgyXSArIHN0YXJ0W2luZGV4Ml0pIC8gMik7XG4gICAgICAgICAgICBsZXQgbWlkMSA9IFswLCAwXTtcbiAgICAgICAgICAgIGxldCBtaWQyID0gWzAsIDBdO1xuICAgICAgICAgICAgbWlkMVtpbmRleF0gPSBzdGFydFtpbmRleF07XG4gICAgICAgICAgICBtaWQxW2luZGV4Ml0gPSBtaWQ7XG4gICAgICAgICAgICBtaWQyW2luZGV4XSA9IGVuZFtpbmRleF07XG4gICAgICAgICAgICBtaWQyW2luZGV4Ml0gPSBtaWQ7XG4gICAgICAgICAgICB0aGlzLl9kaWdMaW5lKFtzdGFydCwgbWlkMSwgbWlkMiwgZW5kXSk7XG4gICAgICAgIH1cbiAgICAgICAgcm9vbTEuYWRkRG9vcihzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgICAgICByb29tMi5hZGREb29yKGVuZFswXSwgZW5kWzFdKTtcbiAgICAgICAgaW5kZXggPSB0aGlzLl91bmNvbm5lY3RlZC5pbmRleE9mKHJvb20xKTtcbiAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl91bmNvbm5lY3RlZC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5fY29ubmVjdGVkLnB1c2gocm9vbTEpO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4ID0gdGhpcy5fdW5jb25uZWN0ZWQuaW5kZXhPZihyb29tMik7XG4gICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fdW5jb25uZWN0ZWQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3RlZC5wdXNoKHJvb20yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgX3BsYWNlSW5XYWxsKHJvb20sIGRpckluZGV4KSB7XG4gICAgICAgIGxldCBzdGFydCA9IFswLCAwXTtcbiAgICAgICAgbGV0IGRpciA9IFswLCAwXTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgICAgIHN3aXRjaCAoZGlySW5kZXgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBkaXIgPSBbMSwgMF07XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBbcm9vbS5nZXRMZWZ0KCksIHJvb20uZ2V0VG9wKCkgLSAxXTtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSByb29tLmdldFJpZ2h0KCkgLSByb29tLmdldExlZnQoKSArIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgZGlyID0gWzAsIDFdO1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gW3Jvb20uZ2V0UmlnaHQoKSArIDEsIHJvb20uZ2V0VG9wKCldO1xuICAgICAgICAgICAgICAgIGxlbmd0aCA9IHJvb20uZ2V0Qm90dG9tKCkgLSByb29tLmdldFRvcCgpICsgMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBkaXIgPSBbMSwgMF07XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBbcm9vbS5nZXRMZWZ0KCksIHJvb20uZ2V0Qm90dG9tKCkgKyAxXTtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSByb29tLmdldFJpZ2h0KCkgLSByb29tLmdldExlZnQoKSArIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgZGlyID0gWzAsIDFdO1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gW3Jvb20uZ2V0TGVmdCgpIC0gMSwgcm9vbS5nZXRUb3AoKV07XG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gcm9vbS5nZXRCb3R0b20oKSAtIHJvb20uZ2V0VG9wKCkgKyAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhdmFpbCA9IFtdO1xuICAgICAgICBsZXQgbGFzdEJhZEluZGV4ID0gLTI7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB4ID0gc3RhcnRbMF0gKyBpICogZGlyWzBdO1xuICAgICAgICAgICAgbGV0IHkgPSBzdGFydFsxXSArIGkgKiBkaXJbMV07XG4gICAgICAgICAgICBhdmFpbC5wdXNoKG51bGwpO1xuICAgICAgICAgICAgbGV0IGlzV2FsbCA9ICh0aGlzLl9tYXBbeF1beV0gPT0gMSk7XG4gICAgICAgICAgICBpZiAoaXNXYWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RCYWRJbmRleCAhPSBpIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhdmFpbFtpXSA9IFt4LCB5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsYXN0QmFkSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGlmIChpKSB7XG4gICAgICAgICAgICAgICAgICAgIGF2YWlsW2kgLSAxXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSBhdmFpbC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKCFhdmFpbFtpXSkge1xuICAgICAgICAgICAgICAgIGF2YWlsLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGF2YWlsLmxlbmd0aCA/IFJORy5nZXRJdGVtKGF2YWlsKSA6IG51bGwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaWcgYSBwb2x5bGluZS5cbiAgICAgKi9cbiAgICBfZGlnTGluZShwb2ludHMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzdGFydCA9IHBvaW50c1tpIC0gMV07XG4gICAgICAgICAgICBsZXQgZW5kID0gcG9pbnRzW2ldO1xuICAgICAgICAgICAgbGV0IGNvcnJpZG9yID0gbmV3IENvcnJpZG9yKHN0YXJ0WzBdLCBzdGFydFsxXSwgZW5kWzBdLCBlbmRbMV0pO1xuICAgICAgICAgICAgY29ycmlkb3IuY3JlYXRlKHRoaXMuX2RpZ0NhbGxiYWNrKTtcbiAgICAgICAgICAgIHRoaXMuX2NvcnJpZG9ycy5wdXNoKGNvcnJpZG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZGlnQ2FsbGJhY2soeCwgeSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbWFwW3hdW3ldID0gdmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9kdWcrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBfaXNXYWxsQ2FsbGJhY2soeCwgeSkge1xuICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSB0aGlzLl93aWR0aCB8fCB5ID49IHRoaXMuX2hlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5fbWFwW3hdW3ldID09IDEpO1xuICAgIH1cbiAgICBfY2FuQmVEdWdDYWxsYmFjayh4LCB5KSB7XG4gICAgICAgIGlmICh4IDwgMSB8fCB5IDwgMSB8fCB4ICsgMSA+PSB0aGlzLl93aWR0aCB8fCB5ICsgMSA+PSB0aGlzLl9oZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMuX21hcFt4XVt5XSA9PSAxKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU2ltcGxleCBmcm9tIFwiLi9zaW1wbGV4LmpzXCI7XG5leHBvcnQgZGVmYXVsdCB7IFNpbXBsZXggfTtcbiIsIi8qKlxuICogQmFzZSBub2lzZSBnZW5lcmF0b3JcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9pc2Uge1xufVxuIiwiaW1wb3J0IE5vaXNlIGZyb20gXCIuL25vaXNlLmpzXCI7XG5pbXBvcnQgUk5HIGZyb20gXCIuLi9ybmcuanNcIjtcbmltcG9ydCB7IG1vZCB9IGZyb20gXCIuLi91dGlsLmpzXCI7XG5jb25zdCBGMiA9IDAuNSAqIChNYXRoLnNxcnQoMykgLSAxKTtcbmNvbnN0IEcyID0gKDMgLSBNYXRoLnNxcnQoMykpIC8gNjtcbi8qKlxuICogQSBzaW1wbGUgMmQgaW1wbGVtZW50YXRpb24gb2Ygc2ltcGxleCBub2lzZSBieSBPbmRyZWogWmFyYVxuICpcbiAqIEJhc2VkIG9uIGEgc3BlZWQtaW1wcm92ZWQgc2ltcGxleCBub2lzZSBhbGdvcml0aG0gZm9yIDJELCAzRCBhbmQgNEQgaW4gSmF2YS5cbiAqIFdoaWNoIGlzIGJhc2VkIG9uIGV4YW1wbGUgY29kZSBieSBTdGVmYW4gR3VzdGF2c29uIChzdGVndUBpdG4ubGl1LnNlKS5cbiAqIFdpdGggT3B0aW1pc2F0aW9ucyBieSBQZXRlciBFYXN0bWFuIChwZWFzdG1hbkBkcml6emxlLnN0YW5mb3JkLmVkdSkuXG4gKiBCZXR0ZXIgcmFuayBvcmRlcmluZyBtZXRob2QgYnkgU3RlZmFuIEd1c3RhdnNvbiBpbiAyMDEyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW1wbGV4IGV4dGVuZHMgTm9pc2Uge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBncmFkaWVudHMgUmFuZG9tIGdyYWRpZW50c1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGdyYWRpZW50cyA9IDI1Nikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9ncmFkaWVudHMgPSBbXG4gICAgICAgICAgICBbMCwgLTFdLFxuICAgICAgICAgICAgWzEsIC0xXSxcbiAgICAgICAgICAgIFsxLCAwXSxcbiAgICAgICAgICAgIFsxLCAxXSxcbiAgICAgICAgICAgIFswLCAxXSxcbiAgICAgICAgICAgIFstMSwgMV0sXG4gICAgICAgICAgICBbLTEsIDBdLFxuICAgICAgICAgICAgWy0xLCAtMV1cbiAgICAgICAgXTtcbiAgICAgICAgbGV0IHBlcm11dGF0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyYWRpZW50czsgaSsrKSB7XG4gICAgICAgICAgICBwZXJtdXRhdGlvbnMucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICBwZXJtdXRhdGlvbnMgPSBSTkcuc2h1ZmZsZShwZXJtdXRhdGlvbnMpO1xuICAgICAgICB0aGlzLl9wZXJtcyA9IFtdO1xuICAgICAgICB0aGlzLl9pbmRleGVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMiAqIGdyYWRpZW50czsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9wZXJtcy5wdXNoKHBlcm11dGF0aW9uc1tpICUgZ3JhZGllbnRzXSk7XG4gICAgICAgICAgICB0aGlzLl9pbmRleGVzLnB1c2godGhpcy5fcGVybXNbaV0gJSB0aGlzLl9ncmFkaWVudHMubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQoeGluLCB5aW4pIHtcbiAgICAgICAgbGV0IHBlcm1zID0gdGhpcy5fcGVybXM7XG4gICAgICAgIGxldCBpbmRleGVzID0gdGhpcy5faW5kZXhlcztcbiAgICAgICAgbGV0IGNvdW50ID0gcGVybXMubGVuZ3RoIC8gMjtcbiAgICAgICAgbGV0IG4wID0gMCwgbjEgPSAwLCBuMiA9IDAsIGdpOyAvLyBOb2lzZSBjb250cmlidXRpb25zIGZyb20gdGhlIHRocmVlIGNvcm5lcnNcbiAgICAgICAgLy8gU2tldyB0aGUgaW5wdXQgc3BhY2UgdG8gZGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggY2VsbCB3ZSdyZSBpblxuICAgICAgICBsZXQgcyA9ICh4aW4gKyB5aW4pICogRjI7IC8vIEhhaXJ5IGZhY3RvciBmb3IgMkRcbiAgICAgICAgbGV0IGkgPSBNYXRoLmZsb29yKHhpbiArIHMpO1xuICAgICAgICBsZXQgaiA9IE1hdGguZmxvb3IoeWluICsgcyk7XG4gICAgICAgIGxldCB0ID0gKGkgKyBqKSAqIEcyO1xuICAgICAgICBsZXQgWDAgPSBpIC0gdDsgLy8gVW5za2V3IHRoZSBjZWxsIG9yaWdpbiBiYWNrIHRvICh4LHkpIHNwYWNlXG4gICAgICAgIGxldCBZMCA9IGogLSB0O1xuICAgICAgICBsZXQgeDAgPSB4aW4gLSBYMDsgLy8gVGhlIHgseSBkaXN0YW5jZXMgZnJvbSB0aGUgY2VsbCBvcmlnaW5cbiAgICAgICAgbGV0IHkwID0geWluIC0gWTA7XG4gICAgICAgIC8vIEZvciB0aGUgMkQgY2FzZSwgdGhlIHNpbXBsZXggc2hhcGUgaXMgYW4gZXF1aWxhdGVyYWwgdHJpYW5nbGUuXG4gICAgICAgIC8vIERldGVybWluZSB3aGljaCBzaW1wbGV4IHdlIGFyZSBpbi5cbiAgICAgICAgbGV0IGkxLCBqMTsgLy8gT2Zmc2V0cyBmb3Igc2Vjb25kIChtaWRkbGUpIGNvcm5lciBvZiBzaW1wbGV4IGluIChpLGopIGNvb3Jkc1xuICAgICAgICBpZiAoeDAgPiB5MCkge1xuICAgICAgICAgICAgaTEgPSAxO1xuICAgICAgICAgICAgajEgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvLyBsb3dlciB0cmlhbmdsZSwgWFkgb3JkZXI6ICgwLDApLT4oMSwwKS0+KDEsMSlcbiAgICAgICAgICAgIGkxID0gMDtcbiAgICAgICAgICAgIGoxID0gMTtcbiAgICAgICAgfSAvLyB1cHBlciB0cmlhbmdsZSwgWVggb3JkZXI6ICgwLDApLT4oMCwxKS0+KDEsMSlcbiAgICAgICAgLy8gQSBzdGVwIG9mICgxLDApIGluIChpLGopIG1lYW5zIGEgc3RlcCBvZiAoMS1jLC1jKSBpbiAoeCx5KSwgYW5kXG4gICAgICAgIC8vIGEgc3RlcCBvZiAoMCwxKSBpbiAoaSxqKSBtZWFucyBhIHN0ZXAgb2YgKC1jLDEtYykgaW4gKHgseSksIHdoZXJlXG4gICAgICAgIC8vIGMgPSAoMy1zcXJ0KDMpKS82XG4gICAgICAgIGxldCB4MSA9IHgwIC0gaTEgKyBHMjsgLy8gT2Zmc2V0cyBmb3IgbWlkZGxlIGNvcm5lciBpbiAoeCx5KSB1bnNrZXdlZCBjb29yZHNcbiAgICAgICAgbGV0IHkxID0geTAgLSBqMSArIEcyO1xuICAgICAgICBsZXQgeDIgPSB4MCAtIDEgKyAyICogRzI7IC8vIE9mZnNldHMgZm9yIGxhc3QgY29ybmVyIGluICh4LHkpIHVuc2tld2VkIGNvb3Jkc1xuICAgICAgICBsZXQgeTIgPSB5MCAtIDEgKyAyICogRzI7XG4gICAgICAgIC8vIFdvcmsgb3V0IHRoZSBoYXNoZWQgZ3JhZGllbnQgaW5kaWNlcyBvZiB0aGUgdGhyZWUgc2ltcGxleCBjb3JuZXJzXG4gICAgICAgIGxldCBpaSA9IG1vZChpLCBjb3VudCk7XG4gICAgICAgIGxldCBqaiA9IG1vZChqLCBjb3VudCk7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY29udHJpYnV0aW9uIGZyb20gdGhlIHRocmVlIGNvcm5lcnNcbiAgICAgICAgbGV0IHQwID0gMC41IC0geDAgKiB4MCAtIHkwICogeTA7XG4gICAgICAgIGlmICh0MCA+PSAwKSB7XG4gICAgICAgICAgICB0MCAqPSB0MDtcbiAgICAgICAgICAgIGdpID0gaW5kZXhlc1tpaSArIHBlcm1zW2pqXV07XG4gICAgICAgICAgICBsZXQgZ3JhZCA9IHRoaXMuX2dyYWRpZW50c1tnaV07XG4gICAgICAgICAgICBuMCA9IHQwICogdDAgKiAoZ3JhZFswXSAqIHgwICsgZ3JhZFsxXSAqIHkwKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdDEgPSAwLjUgLSB4MSAqIHgxIC0geTEgKiB5MTtcbiAgICAgICAgaWYgKHQxID49IDApIHtcbiAgICAgICAgICAgIHQxICo9IHQxO1xuICAgICAgICAgICAgZ2kgPSBpbmRleGVzW2lpICsgaTEgKyBwZXJtc1tqaiArIGoxXV07XG4gICAgICAgICAgICBsZXQgZ3JhZCA9IHRoaXMuX2dyYWRpZW50c1tnaV07XG4gICAgICAgICAgICBuMSA9IHQxICogdDEgKiAoZ3JhZFswXSAqIHgxICsgZ3JhZFsxXSAqIHkxKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdDIgPSAwLjUgLSB4MiAqIHgyIC0geTIgKiB5MjtcbiAgICAgICAgaWYgKHQyID49IDApIHtcbiAgICAgICAgICAgIHQyICo9IHQyO1xuICAgICAgICAgICAgZ2kgPSBpbmRleGVzW2lpICsgMSArIHBlcm1zW2pqICsgMV1dO1xuICAgICAgICAgICAgbGV0IGdyYWQgPSB0aGlzLl9ncmFkaWVudHNbZ2ldO1xuICAgICAgICAgICAgbjIgPSB0MiAqIHQyICogKGdyYWRbMF0gKiB4MiArIGdyYWRbMV0gKiB5Mik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIGNvbnRyaWJ1dGlvbnMgZnJvbSBlYWNoIGNvcm5lciB0byBnZXQgdGhlIGZpbmFsIG5vaXNlIHZhbHVlLlxuICAgICAgICAvLyBUaGUgcmVzdWx0IGlzIHNjYWxlZCB0byByZXR1cm4gdmFsdWVzIGluIHRoZSBpbnRlcnZhbCBbLTEsMV0uXG4gICAgICAgIHJldHVybiA3MCAqIChuMCArIG4xICsgbjIpO1xuICAgIH1cbn1cbiIsImltcG9ydCBQYXRoIGZyb20gXCIuL3BhdGguanNcIjtcbi8qKlxuICogQGNsYXNzIFNpbXBsaWZpZWQgQSogYWxnb3JpdGhtOiBhbGwgZWRnZXMgaGF2ZSBhIHZhbHVlIG9mIDFcbiAqIEBhdWdtZW50cyBST1QuUGF0aFxuICogQHNlZSBST1QuUGF0aFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBU3RhciBleHRlbmRzIFBhdGgge1xuICAgIGNvbnN0cnVjdG9yKHRvWCwgdG9ZLCBwYXNzYWJsZUNhbGxiYWNrLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIodG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl90b2RvID0gW107XG4gICAgICAgIHRoaXMuX2RvbmUgPSB7fTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBhIHBhdGggZnJvbSBhIGdpdmVuIHBvaW50XG4gICAgICogQHNlZSBST1QuUGF0aCNjb21wdXRlXG4gICAgICovXG4gICAgY29tcHV0ZShmcm9tWCwgZnJvbVksIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuX3RvZG8gPSBbXTtcbiAgICAgICAgdGhpcy5fZG9uZSA9IHt9O1xuICAgICAgICB0aGlzLl9mcm9tWCA9IGZyb21YO1xuICAgICAgICB0aGlzLl9mcm9tWSA9IGZyb21ZO1xuICAgICAgICB0aGlzLl9hZGQodGhpcy5fdG9YLCB0aGlzLl90b1ksIG51bGwpO1xuICAgICAgICB3aGlsZSAodGhpcy5fdG9kby5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5fdG9kby5zaGlmdCgpO1xuICAgICAgICAgICAgbGV0IGlkID0gaXRlbS54ICsgXCIsXCIgKyBpdGVtLnk7XG4gICAgICAgICAgICBpZiAoaWQgaW4gdGhpcy5fZG9uZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZG9uZVtpZF0gPSBpdGVtO1xuICAgICAgICAgICAgaWYgKGl0ZW0ueCA9PSBmcm9tWCAmJiBpdGVtLnkgPT0gZnJvbVkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBuZWlnaGJvcnMgPSB0aGlzLl9nZXROZWlnaGJvcnMoaXRlbS54LCBpdGVtLnkpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHggPSBuZWlnaGJvclswXTtcbiAgICAgICAgICAgICAgICBsZXQgeSA9IG5laWdoYm9yWzFdO1xuICAgICAgICAgICAgICAgIGxldCBpZCA9IHggKyBcIixcIiArIHk7XG4gICAgICAgICAgICAgICAgaWYgKGlkIGluIHRoaXMuX2RvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2FkZCh4LCB5LCBpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2RvbmVbZnJvbVggKyBcIixcIiArIGZyb21ZXTtcbiAgICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGl0ZW0pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGl0ZW0ueCwgaXRlbS55KTtcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnByZXY7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2FkZCh4LCB5LCBwcmV2KSB7XG4gICAgICAgIGxldCBoID0gdGhpcy5fZGlzdGFuY2UoeCwgeSk7XG4gICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHByZXY6IHByZXYsXG4gICAgICAgICAgICBnOiAocHJldiA/IHByZXYuZyArIDEgOiAwKSxcbiAgICAgICAgICAgIGg6IGhcbiAgICAgICAgfTtcbiAgICAgICAgLyogaW5zZXJ0IGludG8gcHJpb3JpdHkgcXVldWUgKi9cbiAgICAgICAgbGV0IGYgPSBvYmouZyArIG9iai5oO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3RvZG8ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5fdG9kb1tpXTtcbiAgICAgICAgICAgIGxldCBpdGVtRiA9IGl0ZW0uZyArIGl0ZW0uaDtcbiAgICAgICAgICAgIGlmIChmIDwgaXRlbUYgfHwgKGYgPT0gaXRlbUYgJiYgaCA8IGl0ZW0uaCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90b2RvLnNwbGljZShpLCAwLCBvYmopO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90b2RvLnB1c2gob2JqKTtcbiAgICB9XG4gICAgX2Rpc3RhbmNlKHgsIHkpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5KSB7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChNYXRoLmFicyh4IC0gdGhpcy5fZnJvbVgpICsgTWF0aC5hYnMoeSAtIHRoaXMuX2Zyb21ZKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgbGV0IGR4ID0gTWF0aC5hYnMoeCAtIHRoaXMuX2Zyb21YKTtcbiAgICAgICAgICAgICAgICBsZXQgZHkgPSBNYXRoLmFicyh5IC0gdGhpcy5fZnJvbVkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkeSArIE1hdGgubWF4KDAsIChkeCAtIGR5KSAvIDIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLmFicyh4IC0gdGhpcy5fZnJvbVgpLCBNYXRoLmFicyh5IC0gdGhpcy5fZnJvbVkpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBQYXRoIGZyb20gXCIuL3BhdGguanNcIjtcbi8qKlxuICogQGNsYXNzIFNpbXBsaWZpZWQgRGlqa3N0cmEncyBhbGdvcml0aG06IGFsbCBlZGdlcyBoYXZlIGEgdmFsdWUgb2YgMVxuICogQGF1Z21lbnRzIFJPVC5QYXRoXG4gKiBAc2VlIFJPVC5QYXRoXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpamtzdHJhIGV4dGVuZHMgUGF0aCB7XG4gICAgY29uc3RydWN0b3IodG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIodG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9jb21wdXRlZCA9IHt9O1xuICAgICAgICB0aGlzLl90b2RvID0gW107XG4gICAgICAgIHRoaXMuX2FkZCh0b1gsIHRvWSwgbnVsbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgYSBwYXRoIGZyb20gYSBnaXZlbiBwb2ludFxuICAgICAqIEBzZWUgUk9ULlBhdGgjY29tcHV0ZVxuICAgICAqL1xuICAgIGNvbXB1dGUoZnJvbVgsIGZyb21ZLCBjYWxsYmFjaykge1xuICAgICAgICBsZXQga2V5ID0gZnJvbVggKyBcIixcIiArIGZyb21ZO1xuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy5fY29tcHV0ZWQpKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wdXRlKGZyb21YLCBmcm9tWSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMuX2NvbXB1dGVkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5fY29tcHV0ZWRba2V5XTtcbiAgICAgICAgd2hpbGUgKGl0ZW0pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGl0ZW0ueCwgaXRlbS55KTtcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnByZXY7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBhIG5vbi1jYWNoZWQgdmFsdWVcbiAgICAgKi9cbiAgICBfY29tcHV0ZShmcm9tWCwgZnJvbVkpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuX3RvZG8ubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX3RvZG8uc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChpdGVtLnggPT0gZnJvbVggJiYgaXRlbS55ID09IGZyb21ZKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG5laWdoYm9ycyA9IHRoaXMuX2dldE5laWdoYm9ycyhpdGVtLngsIGl0ZW0ueSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBuZWlnaGJvciA9IG5laWdoYm9yc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IG5laWdoYm9yWzBdO1xuICAgICAgICAgICAgICAgIGxldCB5ID0gbmVpZ2hib3JbMV07XG4gICAgICAgICAgICAgICAgbGV0IGlkID0geCArIFwiLFwiICsgeTtcbiAgICAgICAgICAgICAgICBpZiAoaWQgaW4gdGhpcy5fY29tcHV0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfSAvKiBhbHJlYWR5IGRvbmUgKi9cbiAgICAgICAgICAgICAgICB0aGlzLl9hZGQoeCwgeSwgaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2FkZCh4LCB5LCBwcmV2KSB7XG4gICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHByZXY6IHByZXZcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fY29tcHV0ZWRbeCArIFwiLFwiICsgeV0gPSBvYmo7XG4gICAgICAgIHRoaXMuX3RvZG8ucHVzaChvYmopO1xuICAgIH1cbn1cbiIsImltcG9ydCBEaWprc3RyYSBmcm9tIFwiLi9kaWprc3RyYS5qc1wiO1xuaW1wb3J0IEFTdGFyIGZyb20gXCIuL2FzdGFyLmpzXCI7XG5leHBvcnQgZGVmYXVsdCB7IERpamtzdHJhLCBBU3RhciB9O1xuIiwiaW1wb3J0IHsgRElSUyB9IGZyb20gXCIuLi9jb25zdGFudHMuanNcIjtcbi8qKlxuICogQGNsYXNzIEFic3RyYWN0IHBhdGhmaW5kZXJcbiAqIEBwYXJhbSB7aW50fSB0b1ggVGFyZ2V0IFggY29vcmRcbiAqIEBwYXJhbSB7aW50fSB0b1kgVGFyZ2V0IFkgY29vcmRcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHBhc3NhYmxlQ2FsbGJhY2sgQ2FsbGJhY2sgdG8gZGV0ZXJtaW5lIG1hcCBwYXNzYWJpbGl0eVxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtpbnR9IFtvcHRpb25zLnRvcG9sb2d5PThdXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhdGgge1xuICAgIGNvbnN0cnVjdG9yKHRvWCwgdG9ZLCBwYXNzYWJsZUNhbGxiYWNrLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5fdG9YID0gdG9YO1xuICAgICAgICB0aGlzLl90b1kgPSB0b1k7XG4gICAgICAgIHRoaXMuX3Bhc3NhYmxlQ2FsbGJhY2sgPSBwYXNzYWJsZUNhbGxiYWNrO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICB0b3BvbG9neTogOFxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fZGlycyA9IERJUlNbdGhpcy5fb3B0aW9ucy50b3BvbG9neV07XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5ID09IDgpIHsgLyogcmVvcmRlciBkaXJzIGZvciBtb3JlIGFlc3RoZXRpYyByZXN1bHQgKHZlcnRpY2FsL2hvcml6b250YWwgZmlyc3QpICovXG4gICAgICAgICAgICB0aGlzLl9kaXJzID0gW1xuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnNbMF0sXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyc1syXSxcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJzWzRdLFxuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnNbNl0sXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyc1sxXSxcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJzWzNdLFxuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnNbNV0sXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyc1s3XVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZ2V0TmVpZ2hib3JzKGN4LCBjeSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZGlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGRpciA9IHRoaXMuX2RpcnNbaV07XG4gICAgICAgICAgICBsZXQgeCA9IGN4ICsgZGlyWzBdO1xuICAgICAgICAgICAgbGV0IHkgPSBjeSArIGRpclsxXTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fcGFzc2FibGVDYWxsYmFjayh4LCB5KSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW3gsIHldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsIi8qKlxuICogVGhpcyBjb2RlIGlzIGFuIGltcGxlbWVudGF0aW9uIG9mIEFsZWEgYWxnb3JpdGhtOyAoQykgMjAxMCBKb2hhbm5lcyBCYWFnw7hlLlxuICogQWxlYSBpcyBsaWNlbnNlZCBhY2NvcmRpbmcgdG8gdGhlIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTUlUX0xpY2Vuc2UuXG4gKi9cbmNvbnN0IEZSQUMgPSAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvKiAyXi0zMiAqL1xuY2xhc3MgUk5HIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fc2VlZCA9IDA7XG4gICAgICAgIHRoaXMuX3MwID0gMDtcbiAgICAgICAgdGhpcy5fczEgPSAwO1xuICAgICAgICB0aGlzLl9zMiA9IDA7XG4gICAgICAgIHRoaXMuX2MgPSAwO1xuICAgIH1cbiAgICBnZXRTZWVkKCkgeyByZXR1cm4gdGhpcy5fc2VlZDsgfVxuICAgIC8qKlxuICAgICAqIFNlZWQgdGhlIG51bWJlciBnZW5lcmF0b3JcbiAgICAgKi9cbiAgICBzZXRTZWVkKHNlZWQpIHtcbiAgICAgICAgc2VlZCA9IChzZWVkIDwgMSA/IDEgLyBzZWVkIDogc2VlZCk7XG4gICAgICAgIHRoaXMuX3NlZWQgPSBzZWVkO1xuICAgICAgICB0aGlzLl9zMCA9IChzZWVkID4+PiAwKSAqIEZSQUM7XG4gICAgICAgIHNlZWQgPSAoc2VlZCAqIDY5MDY5ICsgMSkgPj4+IDA7XG4gICAgICAgIHRoaXMuX3MxID0gc2VlZCAqIEZSQUM7XG4gICAgICAgIHNlZWQgPSAoc2VlZCAqIDY5MDY5ICsgMSkgPj4+IDA7XG4gICAgICAgIHRoaXMuX3MyID0gc2VlZCAqIEZSQUM7XG4gICAgICAgIHRoaXMuX2MgPSAxO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgUHNldWRvcmFuZG9tIHZhbHVlIFswLDEpLCB1bmlmb3JtbHkgZGlzdHJpYnV0ZWRcbiAgICAgKi9cbiAgICBnZXRVbmlmb3JtKCkge1xuICAgICAgICBsZXQgdCA9IDIwOTE2MzkgKiB0aGlzLl9zMCArIHRoaXMuX2MgKiBGUkFDO1xuICAgICAgICB0aGlzLl9zMCA9IHRoaXMuX3MxO1xuICAgICAgICB0aGlzLl9zMSA9IHRoaXMuX3MyO1xuICAgICAgICB0aGlzLl9jID0gdCB8IDA7XG4gICAgICAgIHRoaXMuX3MyID0gdCAtIHRoaXMuX2M7XG4gICAgICAgIHJldHVybiB0aGlzLl9zMjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGxvd2VyQm91bmQgVGhlIGxvd2VyIGVuZCBvZiB0aGUgcmFuZ2UgdG8gcmV0dXJuIGEgdmFsdWUgZnJvbSwgaW5jbHVzaXZlXG4gICAgICogQHBhcmFtIHVwcGVyQm91bmQgVGhlIHVwcGVyIGVuZCBvZiB0aGUgcmFuZ2UgdG8gcmV0dXJuIGEgdmFsdWUgZnJvbSwgaW5jbHVzaXZlXG4gICAgICogQHJldHVybnMgUHNldWRvcmFuZG9tIHZhbHVlIFtsb3dlckJvdW5kLCB1cHBlckJvdW5kXSwgdXNpbmcgUk9ULlJORy5nZXRVbmlmb3JtKCkgdG8gZGlzdHJpYnV0ZSB0aGUgdmFsdWVcbiAgICAgKi9cbiAgICBnZXRVbmlmb3JtSW50KGxvd2VyQm91bmQsIHVwcGVyQm91bmQpIHtcbiAgICAgICAgbGV0IG1heCA9IE1hdGgubWF4KGxvd2VyQm91bmQsIHVwcGVyQm91bmQpO1xuICAgICAgICBsZXQgbWluID0gTWF0aC5taW4obG93ZXJCb3VuZCwgdXBwZXJCb3VuZCk7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuZ2V0VW5pZm9ybSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1lYW4gTWVhbiB2YWx1ZVxuICAgICAqIEBwYXJhbSBzdGRkZXYgU3RhbmRhcmQgZGV2aWF0aW9uLiB+OTUlIG9mIHRoZSBhYnNvbHV0ZSB2YWx1ZXMgd2lsbCBiZSBsb3dlciB0aGFuIDIqc3RkZGV2LlxuICAgICAqIEByZXR1cm5zIEEgbm9ybWFsbHkgZGlzdHJpYnV0ZWQgcHNldWRvcmFuZG9tIHZhbHVlXG4gICAgICovXG4gICAgZ2V0Tm9ybWFsKG1lYW4gPSAwLCBzdGRkZXYgPSAxKSB7XG4gICAgICAgIGxldCB1LCB2LCByO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICB1ID0gMiAqIHRoaXMuZ2V0VW5pZm9ybSgpIC0gMTtcbiAgICAgICAgICAgIHYgPSAyICogdGhpcy5nZXRVbmlmb3JtKCkgLSAxO1xuICAgICAgICAgICAgciA9IHUgKiB1ICsgdiAqIHY7XG4gICAgICAgIH0gd2hpbGUgKHIgPiAxIHx8IHIgPT0gMCk7XG4gICAgICAgIGxldCBnYXVzcyA9IHUgKiBNYXRoLnNxcnQoLTIgKiBNYXRoLmxvZyhyKSAvIHIpO1xuICAgICAgICByZXR1cm4gbWVhbiArIGdhdXNzICogc3RkZGV2O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBQc2V1ZG9yYW5kb20gdmFsdWUgWzEsMTAwXSBpbmNsdXNpdmUsIHVuaWZvcm1seSBkaXN0cmlidXRlZFxuICAgICAqL1xuICAgIGdldFBlcmNlbnRhZ2UoKSB7XG4gICAgICAgIHJldHVybiAxICsgTWF0aC5mbG9vcih0aGlzLmdldFVuaWZvcm0oKSAqIDEwMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJhbmRvbWx5IHBpY2tlZCBpdGVtLCBudWxsIHdoZW4gbGVuZ3RoPTBcbiAgICAgKi9cbiAgICBnZXRJdGVtKGFycmF5KSB7XG4gICAgICAgIGlmICghYXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXlbTWF0aC5mbG9vcih0aGlzLmdldFVuaWZvcm0oKSAqIGFycmF5Lmxlbmd0aCldO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBOZXcgYXJyYXkgd2l0aCByYW5kb21pemVkIGl0ZW1zXG4gICAgICovXG4gICAgc2h1ZmZsZShhcnJheSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBjbG9uZSA9IGFycmF5LnNsaWNlKCk7XG4gICAgICAgIHdoaWxlIChjbG9uZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGNsb25lLmluZGV4T2YodGhpcy5nZXRJdGVtKGNsb25lKSk7XG4gICAgICAgICAgICByZXN1bHQucHVzaChjbG9uZS5zcGxpY2UoaW5kZXgsIDEpWzBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0YSBrZXk9d2hhdGV2ZXIsIHZhbHVlPXdlaWdodCAocmVsYXRpdmUgcHJvYmFiaWxpdHkpXG4gICAgICogQHJldHVybnMgd2hhdGV2ZXJcbiAgICAgKi9cbiAgICBnZXRXZWlnaHRlZFZhbHVlKGRhdGEpIHtcbiAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgZm9yIChsZXQgaWQgaW4gZGF0YSkge1xuICAgICAgICAgICAgdG90YWwgKz0gZGF0YVtpZF07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJhbmRvbSA9IHRoaXMuZ2V0VW5pZm9ybSgpICogdG90YWw7XG4gICAgICAgIGxldCBpZCwgcGFydCA9IDA7XG4gICAgICAgIGZvciAoaWQgaW4gZGF0YSkge1xuICAgICAgICAgICAgcGFydCArPSBkYXRhW2lkXTtcbiAgICAgICAgICAgIGlmIChyYW5kb20gPCBwYXJ0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIGJ5IHNvbWUgZmxvYXRpbmctcG9pbnQgYW5ub3lhbmNlIHdlIGhhdmVcbiAgICAgICAgLy8gcmFuZG9tID49IHRvdGFsLCBqdXN0IHJldHVybiB0aGUgbGFzdCBpZC5cbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgUk5HIHN0YXRlLiBVc2VmdWwgZm9yIHN0b3JpbmcgdGhlIHN0YXRlIGFuZCByZS1zZXR0aW5nIGl0IHZpYSBzZXRTdGF0ZS5cbiAgICAgKiBAcmV0dXJucyBJbnRlcm5hbCBzdGF0ZVxuICAgICAqL1xuICAgIGdldFN0YXRlKCkgeyByZXR1cm4gW3RoaXMuX3MwLCB0aGlzLl9zMSwgdGhpcy5fczIsIHRoaXMuX2NdOyB9XG4gICAgLyoqXG4gICAgICogU2V0IGEgcHJldmlvdXNseSByZXRyaWV2ZWQgc3RhdGUuXG4gICAgICovXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5fczAgPSBzdGF0ZVswXTtcbiAgICAgICAgdGhpcy5fczEgPSBzdGF0ZVsxXTtcbiAgICAgICAgdGhpcy5fczIgPSBzdGF0ZVsyXTtcbiAgICAgICAgdGhpcy5fYyA9IHN0YXRlWzNdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGNsb25lZCBSTkdcbiAgICAgKi9cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgbGV0IGNsb25lID0gbmV3IFJORygpO1xuICAgICAgICByZXR1cm4gY2xvbmUuc2V0U3RhdGUodGhpcy5nZXRTdGF0ZSgpKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgUk5HKCkuc2V0U2VlZChEYXRlLm5vdygpKTtcbiIsImltcG9ydCBTY2hlZHVsZXIgZnJvbSBcIi4vc2NoZWR1bGVyLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBBY3Rpb24tYmFzZWQgc2NoZWR1bGVyXG4gKiBAYXVnbWVudHMgUk9ULlNjaGVkdWxlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rpb24gZXh0ZW5kcyBTY2hlZHVsZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9kZWZhdWx0RHVyYXRpb24gPSAxOyAvKiBmb3IgbmV3bHkgYWRkZWQgKi9cbiAgICAgICAgdGhpcy5fZHVyYXRpb24gPSB0aGlzLl9kZWZhdWx0RHVyYXRpb247IC8qIGZvciB0aGlzLl9jdXJyZW50ICovXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtXG4gICAgICogQHBhcmFtIHtib29sfSByZXBlYXRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3RpbWU9MV1cbiAgICAgKiBAc2VlIFJPVC5TY2hlZHVsZXIjYWRkXG4gICAgICovXG4gICAgYWRkKGl0ZW0sIHJlcGVhdCwgdGltZSkge1xuICAgICAgICB0aGlzLl9xdWV1ZS5hZGQoaXRlbSwgdGltZSB8fCB0aGlzLl9kZWZhdWx0RHVyYXRpb24pO1xuICAgICAgICByZXR1cm4gc3VwZXIuYWRkKGl0ZW0sIHJlcGVhdCk7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IHRoaXMuX2RlZmF1bHREdXJhdGlvbjtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmNsZWFyKCk7XG4gICAgfVxuICAgIHJlbW92ZShpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtID09IHRoaXMuX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2R1cmF0aW9uID0gdGhpcy5fZGVmYXVsdER1cmF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5yZW1vdmUoaXRlbSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBzZWUgUk9ULlNjaGVkdWxlciNuZXh0XG4gICAgICovXG4gICAgbmV4dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnQgIT09IG51bGwgJiYgdGhpcy5fcmVwZWF0LmluZGV4T2YodGhpcy5fY3VycmVudCkgIT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXVlLmFkZCh0aGlzLl9jdXJyZW50LCB0aGlzLl9kdXJhdGlvbiB8fCB0aGlzLl9kZWZhdWx0RHVyYXRpb24pO1xuICAgICAgICAgICAgdGhpcy5fZHVyYXRpb24gPSB0aGlzLl9kZWZhdWx0RHVyYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1cGVyLm5leHQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IGR1cmF0aW9uIGZvciB0aGUgYWN0aXZlIGl0ZW1cbiAgICAgKi9cbiAgICBzZXREdXJhdGlvbih0aW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IHRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNpbXBsZSBmcm9tIFwiLi9zaW1wbGUuanNcIjtcbmltcG9ydCBTcGVlZCBmcm9tIFwiLi9zcGVlZC5qc1wiO1xuaW1wb3J0IEFjdGlvbiBmcm9tIFwiLi9hY3Rpb24uanNcIjtcbmV4cG9ydCBkZWZhdWx0IHsgU2ltcGxlLCBTcGVlZCwgQWN0aW9uIH07XG4iLCJpbXBvcnQgRXZlbnRRdWV1ZSBmcm9tIFwiLi4vZXZlbnRxdWV1ZS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NoZWR1bGVyIHtcbiAgICAvKipcbiAgICAgKiBAY2xhc3MgQWJzdHJhY3Qgc2NoZWR1bGVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3F1ZXVlID0gbmV3IEV2ZW50UXVldWUoKTtcbiAgICAgICAgdGhpcy5fcmVwZWF0ID0gW107XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAc2VlIFJPVC5FdmVudFF1ZXVlI2dldFRpbWVcbiAgICAgKi9cbiAgICBnZXRUaW1lKCkgeyByZXR1cm4gdGhpcy5fcXVldWUuZ2V0VGltZSgpOyB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBpdGVtXG4gICAgICogQHBhcmFtIHtib29sfSByZXBlYXRcbiAgICAgKi9cbiAgICBhZGQoaXRlbSwgcmVwZWF0KSB7XG4gICAgICAgIGlmIChyZXBlYXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlcGVhdC5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRpbWUgdGhlIGdpdmVuIGl0ZW0gaXMgc2NoZWR1bGVkIGZvclxuICAgICAqIEBwYXJhbSB7P30gaXRlbVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRpbWVcbiAgICAgKi9cbiAgICBnZXRUaW1lT2YoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVldWUuZ2V0RXZlbnRUaW1lKGl0ZW0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhciBhbGwgaXRlbXNcbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fcXVldWUuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fcmVwZWF0ID0gW107XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBudWxsO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgcHJldmlvdXNseSBhZGRlZCBpdGVtXG4gICAgICogQHBhcmFtIHs/fSBpdGVtXG4gICAgICogQHJldHVybnMge2Jvb2x9IHN1Y2Nlc3NmdWw/XG4gICAgICovXG4gICAgcmVtb3ZlKGl0ZW0pIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuX3F1ZXVlLnJlbW92ZShpdGVtKTtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fcmVwZWF0LmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fcmVwZWF0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnQgPT0gaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2NoZWR1bGUgbmV4dCBpdGVtXG4gICAgICogQHJldHVybnMgez99XG4gICAgICovXG4gICAgbmV4dCgpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudCA9IHRoaXMuX3F1ZXVlLmdldCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgICB9XG59XG4iLCJpbXBvcnQgU2NoZWR1bGVyIGZyb20gXCIuL3NjaGVkdWxlci5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgU2ltcGxlIGZhaXIgc2NoZWR1bGVyIChyb3VuZC1yb2JpbiBzdHlsZSlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltcGxlIGV4dGVuZHMgU2NoZWR1bGVyIHtcbiAgICBhZGQoaXRlbSwgcmVwZWF0KSB7XG4gICAgICAgIHRoaXMuX3F1ZXVlLmFkZChpdGVtLCAwKTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFkZChpdGVtLCByZXBlYXQpO1xuICAgIH1cbiAgICBuZXh0KCkge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudCAhPT0gbnVsbCAmJiB0aGlzLl9yZXBlYXQuaW5kZXhPZih0aGlzLl9jdXJyZW50KSAhPSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fcXVldWUuYWRkKHRoaXMuX2N1cnJlbnQsIDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5uZXh0KCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNjaGVkdWxlciBmcm9tIFwiLi9zY2hlZHVsZXIuanNcIjtcbi8qKlxuICogQGNsYXNzIFNwZWVkLWJhc2VkIHNjaGVkdWxlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGVlZCBleHRlbmRzIFNjaGVkdWxlciB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGl0ZW0gYW55dGhpbmcgd2l0aCBcImdldFNwZWVkXCIgbWV0aG9kXG4gICAgICogQHBhcmFtIHtib29sfSByZXBlYXRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3RpbWU9MS9pdGVtLmdldFNwZWVkKCldXG4gICAgICogQHNlZSBST1QuU2NoZWR1bGVyI2FkZFxuICAgICAqL1xuICAgIGFkZChpdGVtLCByZXBlYXQsIHRpbWUpIHtcbiAgICAgICAgdGhpcy5fcXVldWUuYWRkKGl0ZW0sIHRpbWUgIT09IHVuZGVmaW5lZCA/IHRpbWUgOiAxIC8gaXRlbS5nZXRTcGVlZCgpKTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFkZChpdGVtLCByZXBlYXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAc2VlIFJPVC5TY2hlZHVsZXIjbmV4dFxuICAgICAqL1xuICAgIG5leHQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50ICYmIHRoaXMuX3JlcGVhdC5pbmRleE9mKHRoaXMuX2N1cnJlbnQpICE9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9xdWV1ZS5hZGQodGhpcy5fY3VycmVudCwgMSAvIHRoaXMuX2N1cnJlbnQuZ2V0U3BlZWQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1cGVyLm5leHQoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUk5HIGZyb20gXCIuL3JuZy5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgKE1hcmtvdiBwcm9jZXNzKS1iYXNlZCBzdHJpbmcgZ2VuZXJhdG9yLlxuICogQ29waWVkIGZyb20gYSA8YSBocmVmPVwiaHR0cDovL3d3dy5yb2d1ZWJhc2luLnJvZ3VlbGlrZWRldmVsb3BtZW50Lm9yZy9pbmRleC5waHA/dGl0bGU9TmFtZXNfZnJvbV9hX2hpZ2hfb3JkZXJfTWFya292X1Byb2Nlc3NfYW5kX2Ffc2ltcGxpZmllZF9LYXR6X2JhY2stb2ZmX3NjaGVtZVwiPlJvZ3VlQmFzaW4gYXJ0aWNsZTwvYT4uXG4gKiBPZmZlcnMgY29uZmlndXJhYmxlIG9yZGVyIGFuZCBwcmlvci5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RyaW5nR2VuZXJhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB7XG4gICAgICAgICAgICB3b3JkczogZmFsc2UsXG4gICAgICAgICAgICBvcmRlcjogMyxcbiAgICAgICAgICAgIHByaW9yOiAwLjAwMVxuICAgICAgICB9O1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9ib3VuZGFyeSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMCk7XG4gICAgICAgIHRoaXMuX3N1ZmZpeCA9IHRoaXMuX2JvdW5kYXJ5O1xuICAgICAgICB0aGlzLl9wcmVmaXggPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9vcHRpb25zLm9yZGVyOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZWZpeC5wdXNoKHRoaXMuX2JvdW5kYXJ5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcmlvclZhbHVlcyA9IHt9O1xuICAgICAgICB0aGlzLl9wcmlvclZhbHVlc1t0aGlzLl9ib3VuZGFyeV0gPSB0aGlzLl9vcHRpb25zLnByaW9yO1xuICAgICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgbGVhcm5pbmcgZGF0YVxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgICAgIHRoaXMuX3ByaW9yVmFsdWVzID0ge307XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEdlbmVyYXRlZCBzdHJpbmdcbiAgICAgKi9cbiAgICBnZW5lcmF0ZSgpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFt0aGlzLl9zYW1wbGUodGhpcy5fcHJlZml4KV07XG4gICAgICAgIHdoaWxlIChyZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdICE9IHRoaXMuX2JvdW5kYXJ5KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLl9zYW1wbGUocmVzdWx0KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2pvaW4ocmVzdWx0LnNsaWNlKDAsIC0xKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9ic2VydmUgKGxlYXJuKSBhIHN0cmluZyBmcm9tIGEgdHJhaW5pbmcgc2V0XG4gICAgICovXG4gICAgb2JzZXJ2ZShzdHJpbmcpIHtcbiAgICAgICAgbGV0IHRva2VucyA9IHRoaXMuX3NwbGl0KHN0cmluZyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmlvclZhbHVlc1t0b2tlbnNbaV1dID0gdGhpcy5fb3B0aW9ucy5wcmlvcjtcbiAgICAgICAgfVxuICAgICAgICB0b2tlbnMgPSB0aGlzLl9wcmVmaXguY29uY2F0KHRva2VucykuY29uY2F0KHRoaXMuX3N1ZmZpeCk7IC8qIGFkZCBib3VuZGFyeSBzeW1ib2xzICovXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9vcHRpb25zLm9yZGVyOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IHRva2Vucy5zbGljZShpIC0gdGhpcy5fb3B0aW9ucy5vcmRlciwgaSk7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSB0b2tlbnNbaV07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbnRleHQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc3ViY29udGV4dCA9IGNvbnRleHQuc2xpY2Uoaik7XG4gICAgICAgICAgICAgICAgdGhpcy5fb2JzZXJ2ZUV2ZW50KHN1YmNvbnRleHQsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRTdGF0cygpIHtcbiAgICAgICAgbGV0IHBhcnRzID0gW107XG4gICAgICAgIGxldCBwcmlvckNvdW50ID0gT2JqZWN0LmtleXModGhpcy5fcHJpb3JWYWx1ZXMpLmxlbmd0aDtcbiAgICAgICAgcHJpb3JDb3VudC0tOyAvLyBib3VuZGFyeVxuICAgICAgICBwYXJ0cy5wdXNoKFwiZGlzdGluY3Qgc2FtcGxlczogXCIgKyBwcmlvckNvdW50KTtcbiAgICAgICAgbGV0IGRhdGFDb3VudCA9IE9iamVjdC5rZXlzKHRoaXMuX2RhdGEpLmxlbmd0aDtcbiAgICAgICAgbGV0IGV2ZW50Q291bnQgPSAwO1xuICAgICAgICBmb3IgKGxldCBwIGluIHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgIGV2ZW50Q291bnQgKz0gT2JqZWN0LmtleXModGhpcy5fZGF0YVtwXSkubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goXCJkaWN0aW9uYXJ5IHNpemUgKGNvbnRleHRzKTogXCIgKyBkYXRhQ291bnQpO1xuICAgICAgICBwYXJ0cy5wdXNoKFwiZGljdGlvbmFyeSBzaXplIChldmVudHMpOiBcIiArIGV2ZW50Q291bnQpO1xuICAgICAgICByZXR1cm4gcGFydHMuam9pbihcIiwgXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ31cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAgICovXG4gICAgX3NwbGl0KHN0cikge1xuICAgICAgICByZXR1cm4gc3RyLnNwbGl0KHRoaXMuX29wdGlvbnMud29yZHMgPyAvXFxzKy8gOiBcIlwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIF9qb2luKGFycikge1xuICAgICAgICByZXR1cm4gYXJyLmpvaW4odGhpcy5fb3B0aW9ucy53b3JkcyA/IFwiIFwiIDogXCJcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IGNvbnRleHRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAgICAgKi9cbiAgICBfb2JzZXJ2ZUV2ZW50KGNvbnRleHQsIGV2ZW50KSB7XG4gICAgICAgIGxldCBrZXkgPSB0aGlzLl9qb2luKGNvbnRleHQpO1xuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy5fZGF0YSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2RhdGFba2V5XSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5fZGF0YVtrZXldO1xuICAgICAgICBpZiAoIShldmVudCBpbiBkYXRhKSkge1xuICAgICAgICAgICAgZGF0YVtldmVudF0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIGRhdGFbZXZlbnRdKys7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119XG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBfc2FtcGxlKGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dCA9IHRoaXMuX2JhY2tvZmYoY29udGV4dCk7XG4gICAgICAgIGxldCBrZXkgPSB0aGlzLl9qb2luKGNvbnRleHQpO1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuX2RhdGFba2V5XTtcbiAgICAgICAgbGV0IGF2YWlsYWJsZSA9IHt9O1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5wcmlvcikge1xuICAgICAgICAgICAgZm9yIChsZXQgZXZlbnQgaW4gdGhpcy5fcHJpb3JWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVbZXZlbnRdID0gdGhpcy5fcHJpb3JWYWx1ZXNbZXZlbnRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgZXZlbnQgaW4gZGF0YSkge1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVtldmVudF0gKz0gZGF0YVtldmVudF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhdmFpbGFibGUgPSBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSTkcuZ2V0V2VpZ2h0ZWRWYWx1ZShhdmFpbGFibGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICAgKi9cbiAgICBfYmFja29mZihjb250ZXh0KSB7XG4gICAgICAgIGlmIChjb250ZXh0Lmxlbmd0aCA+IHRoaXMuX29wdGlvbnMub3JkZXIpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnNsaWNlKC10aGlzLl9vcHRpb25zLm9yZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb250ZXh0Lmxlbmd0aCA8IHRoaXMuX29wdGlvbnMub3JkZXIpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzLl9wcmVmaXguc2xpY2UoMCwgdGhpcy5fb3B0aW9ucy5vcmRlciAtIGNvbnRleHQubGVuZ3RoKS5jb25jYXQoY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKCEodGhpcy5fam9pbihjb250ZXh0KSBpbiB0aGlzLl9kYXRhKSAmJiBjb250ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cbn1cbiIsIi8qKlxuICogQG5hbWVzcGFjZVxuICogQ29udGFpbnMgdGV4dCB0b2tlbml6YXRpb24gYW5kIGJyZWFraW5nIHJvdXRpbmVzXG4gKi9cbmNvbnN0IFJFX0NPTE9SUyA9IC8lKFtiY10peyhbXn1dKil9L2c7XG4vLyB0b2tlbiB0eXBlc1xuZXhwb3J0IGNvbnN0IFRZUEVfVEVYVCA9IDA7XG5leHBvcnQgY29uc3QgVFlQRV9ORVdMSU5FID0gMTtcbmV4cG9ydCBjb25zdCBUWVBFX0ZHID0gMjtcbmV4cG9ydCBjb25zdCBUWVBFX0JHID0gMztcbi8qKlxuICogTWVhc3VyZSBzaXplIG9mIGEgcmVzdWx0aW5nIHRleHQgYmxvY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lYXN1cmUoc3RyLCBtYXhXaWR0aCkge1xuICAgIGxldCByZXN1bHQgPSB7IHdpZHRoOiAwLCBoZWlnaHQ6IDEgfTtcbiAgICBsZXQgdG9rZW5zID0gdG9rZW5pemUoc3RyLCBtYXhXaWR0aCk7XG4gICAgbGV0IGxpbmVXaWR0aCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgVFlQRV9URVhUOlxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aCArPSB0b2tlbi52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRZUEVfTkVXTElORTpcbiAgICAgICAgICAgICAgICByZXN1bHQuaGVpZ2h0Kys7XG4gICAgICAgICAgICAgICAgcmVzdWx0LndpZHRoID0gTWF0aC5tYXgocmVzdWx0LndpZHRoLCBsaW5lV2lkdGgpO1xuICAgICAgICAgICAgICAgIGxpbmVXaWR0aCA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0LndpZHRoID0gTWF0aC5tYXgocmVzdWx0LndpZHRoLCBsaW5lV2lkdGgpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIENvbnZlcnQgc3RyaW5nIHRvIGEgc2VyaWVzIG9mIGEgZm9ybWF0dGluZyBjb21tYW5kc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdG9rZW5pemUoc3RyLCBtYXhXaWR0aCkge1xuICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAvKiBmaXJzdCB0b2tlbml6YXRpb24gcGFzcyAtIHNwbGl0IHRleHRzIGFuZCBjb2xvciBmb3JtYXR0aW5nIGNvbW1hbmRzICovXG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgc3RyLnJlcGxhY2UoUkVfQ09MT1JTLCBmdW5jdGlvbiAobWF0Y2gsIHR5cGUsIG5hbWUsIGluZGV4KSB7XG4gICAgICAgIC8qIHN0cmluZyBiZWZvcmUgKi9cbiAgICAgICAgbGV0IHBhcnQgPSBzdHIuc3Vic3RyaW5nKG9mZnNldCwgaW5kZXgpO1xuICAgICAgICBpZiAocGFydC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBUWVBFX1RFWFQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHBhcnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8qIGNvbG9yIGNvbW1hbmQgKi9cbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgdHlwZTogKHR5cGUgPT0gXCJjXCIgPyBUWVBFX0ZHIDogVFlQRV9CRyksXG4gICAgICAgICAgICB2YWx1ZTogbmFtZS50cmltKClcbiAgICAgICAgfSk7XG4gICAgICAgIG9mZnNldCA9IGluZGV4ICsgbWF0Y2gubGVuZ3RoO1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9KTtcbiAgICAvKiBsYXN0IHJlbWFpbmluZyBwYXJ0ICovXG4gICAgbGV0IHBhcnQgPSBzdHIuc3Vic3RyaW5nKG9mZnNldCk7XG4gICAgaWYgKHBhcnQubGVuZ3RoKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IFRZUEVfVEVYVCxcbiAgICAgICAgICAgIHZhbHVlOiBwYXJ0XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYnJlYWtMaW5lcyhyZXN1bHQsIG1heFdpZHRoKTtcbn1cbi8qIGluc2VydCBsaW5lIGJyZWFrcyBpbnRvIGZpcnN0LXBhc3MgdG9rZW5pemVkIGRhdGEgKi9cbmZ1bmN0aW9uIGJyZWFrTGluZXModG9rZW5zLCBtYXhXaWR0aCkge1xuICAgIGlmICghbWF4V2lkdGgpIHtcbiAgICAgICAgbWF4V2lkdGggPSBJbmZpbml0eTtcbiAgICB9XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBsaW5lTGVuZ3RoID0gMDtcbiAgICBsZXQgbGFzdFRva2VuV2l0aFNwYWNlID0gLTE7XG4gICAgd2hpbGUgKGkgPCB0b2tlbnMubGVuZ3RoKSB7IC8qIHRha2UgYWxsIHRleHQgdG9rZW5zLCByZW1vdmUgc3BhY2UsIGFwcGx5IGxpbmVicmVha3MgKi9cbiAgICAgICAgbGV0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICBpZiAodG9rZW4udHlwZSA9PSBUWVBFX05FV0xJTkUpIHsgLyogcmVzZXQgKi9cbiAgICAgICAgICAgIGxpbmVMZW5ndGggPSAwO1xuICAgICAgICAgICAgbGFzdFRva2VuV2l0aFNwYWNlID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRva2VuLnR5cGUgIT0gVFlQRV9URVhUKSB7IC8qIHNraXAgbm9uLXRleHQgdG9rZW5zICovXG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvKiByZW1vdmUgc3BhY2VzIGF0IHRoZSBiZWdpbm5pbmcgb2YgbGluZSAqL1xuICAgICAgICB3aGlsZSAobGluZUxlbmd0aCA9PSAwICYmIHRva2VuLnZhbHVlLmNoYXJBdCgwKSA9PSBcIiBcIikge1xuICAgICAgICAgICAgdG9rZW4udmFsdWUgPSB0b2tlbi52YWx1ZS5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH1cbiAgICAgICAgLyogZm9yY2VkIG5ld2xpbmU/IGluc2VydCB0d28gbmV3IHRva2VucyBhZnRlciB0aGlzIG9uZSAqL1xuICAgICAgICBsZXQgaW5kZXggPSB0b2tlbi52YWx1ZS5pbmRleE9mKFwiXFxuXCIpO1xuICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgIHRva2VuLnZhbHVlID0gYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIGksIGluZGV4LCB0cnVlKTtcbiAgICAgICAgICAgIC8qIGlmIHRoZXJlIGFyZSBzcGFjZXMgYXQgdGhlIGVuZCwgd2UgbXVzdCByZW1vdmUgdGhlbSAod2UgZG8gbm90IHdhbnQgdGhlIGxpbmUgdG9vIGxvbmcpICovXG4gICAgICAgICAgICBsZXQgYXJyID0gdG9rZW4udmFsdWUuc3BsaXQoXCJcIik7XG4gICAgICAgICAgICB3aGlsZSAoYXJyLmxlbmd0aCAmJiBhcnJbYXJyLmxlbmd0aCAtIDFdID09IFwiIFwiKSB7XG4gICAgICAgICAgICAgICAgYXJyLnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9rZW4udmFsdWUgPSBhcnIuam9pbihcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICAvKiB0b2tlbiBkZWdlbmVyYXRlZD8gKi9cbiAgICAgICAgaWYgKCF0b2tlbi52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRva2Vucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGluZUxlbmd0aCArIHRva2VuLnZhbHVlLmxlbmd0aCA+IG1heFdpZHRoKSB7IC8qIGxpbmUgdG9vIGxvbmcsIGZpbmQgYSBzdWl0YWJsZSBicmVha2luZyBzcG90ICovXG4gICAgICAgICAgICAvKiBpcyBpdCBwb3NzaWJsZSB0byBicmVhayB3aXRoaW4gdGhpcyB0b2tlbj8gKi9cbiAgICAgICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dEluZGV4ID0gdG9rZW4udmFsdWUuaW5kZXhPZihcIiBcIiwgaW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dEluZGV4ID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobGluZUxlbmd0aCArIG5leHRJbmRleCA+IG1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbmRleCA9IG5leHRJbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkgeyAvKiBicmVhayBhdCBzcGFjZSB3aXRoaW4gdGhpcyBvbmUgKi9cbiAgICAgICAgICAgICAgICB0b2tlbi52YWx1ZSA9IGJyZWFrSW5zaWRlVG9rZW4odG9rZW5zLCBpLCBpbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsYXN0VG9rZW5XaXRoU3BhY2UgIT0gLTEpIHsgLyogaXMgdGhlcmUgYSBwcmV2aW91cyB0b2tlbiB3aGVyZSBhIGJyZWFrIGNhbiBvY2N1cj8gKi9cbiAgICAgICAgICAgICAgICBsZXQgdG9rZW4gPSB0b2tlbnNbbGFzdFRva2VuV2l0aFNwYWNlXTtcbiAgICAgICAgICAgICAgICBsZXQgYnJlYWtJbmRleCA9IHRva2VuLnZhbHVlLmxhc3RJbmRleE9mKFwiIFwiKTtcbiAgICAgICAgICAgICAgICB0b2tlbi52YWx1ZSA9IGJyZWFrSW5zaWRlVG9rZW4odG9rZW5zLCBsYXN0VG9rZW5XaXRoU3BhY2UsIGJyZWFrSW5kZXgsIHRydWUpO1xuICAgICAgICAgICAgICAgIGkgPSBsYXN0VG9rZW5XaXRoU3BhY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLyogZm9yY2UgYnJlYWsgaW4gdGhpcyB0b2tlbiAqL1xuICAgICAgICAgICAgICAgIHRva2VuLnZhbHVlID0gYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIGksIG1heFdpZHRoIC0gbGluZUxlbmd0aCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvKiBsaW5lIG5vdCBsb25nLCBjb250aW51ZSAqL1xuICAgICAgICAgICAgbGluZUxlbmd0aCArPSB0b2tlbi52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAodG9rZW4udmFsdWUuaW5kZXhPZihcIiBcIikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsYXN0VG9rZW5XaXRoU3BhY2UgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGkrKzsgLyogYWR2YW5jZSB0byBuZXh0IHRva2VuICovXG4gICAgfVxuICAgIHRva2Vucy5wdXNoKHsgdHlwZTogVFlQRV9ORVdMSU5FIH0pOyAvKiBpbnNlcnQgZmFrZSBuZXdsaW5lIHRvIGZpeCB0aGUgbGFzdCB0ZXh0IGxpbmUgKi9cbiAgICAvKiByZW1vdmUgdHJhaWxpbmcgc3BhY2UgZnJvbSB0ZXh0IHRva2VucyBiZWZvcmUgbmV3bGluZXMgKi9cbiAgICBsZXQgbGFzdFRleHRUb2tlbiA9IG51bGw7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgVFlQRV9URVhUOlxuICAgICAgICAgICAgICAgIGxhc3RUZXh0VG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVFlQRV9ORVdMSU5FOlxuICAgICAgICAgICAgICAgIGlmIChsYXN0VGV4dFRva2VuKSB7IC8qIHJlbW92ZSB0cmFpbGluZyBzcGFjZSAqL1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXJyID0gbGFzdFRleHRUb2tlbi52YWx1ZS5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGFyci5sZW5ndGggJiYgYXJyW2Fyci5sZW5ndGggLSAxXSA9PSBcIiBcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxhc3RUZXh0VG9rZW4udmFsdWUgPSBhcnIuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGFzdFRleHRUb2tlbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9rZW5zLnBvcCgpOyAvKiByZW1vdmUgZmFrZSB0b2tlbiAqL1xuICAgIHJldHVybiB0b2tlbnM7XG59XG4vKipcbiAqIENyZWF0ZSBuZXcgdG9rZW5zIGFuZCBpbnNlcnQgdGhlbSBpbnRvIHRoZSBzdHJlYW1cbiAqIEBwYXJhbSB7b2JqZWN0W119IHRva2Vuc1xuICogQHBhcmFtIHtpbnR9IHRva2VuSW5kZXggVG9rZW4gYmVpbmcgcHJvY2Vzc2VkXG4gKiBAcGFyYW0ge2ludH0gYnJlYWtJbmRleCBJbmRleCB3aXRoaW4gY3VycmVudCB0b2tlbidzIHZhbHVlXG4gKiBAcGFyYW0ge2Jvb2x9IHJlbW92ZUJyZWFrQ2hhciBEbyB3ZSB3YW50IHRvIHJlbW92ZSB0aGUgYnJlYWtpbmcgY2hhcmFjdGVyP1xuICogQHJldHVybnMge3N0cmluZ30gcmVtYWluaW5nIHVuYnJva2VuIHRva2VuIHZhbHVlXG4gKi9cbmZ1bmN0aW9uIGJyZWFrSW5zaWRlVG9rZW4odG9rZW5zLCB0b2tlbkluZGV4LCBicmVha0luZGV4LCByZW1vdmVCcmVha0NoYXIpIHtcbiAgICBsZXQgbmV3QnJlYWtUb2tlbiA9IHtcbiAgICAgICAgdHlwZTogVFlQRV9ORVdMSU5FXG4gICAgfTtcbiAgICBsZXQgbmV3VGV4dFRva2VuID0ge1xuICAgICAgICB0eXBlOiBUWVBFX1RFWFQsXG4gICAgICAgIHZhbHVlOiB0b2tlbnNbdG9rZW5JbmRleF0udmFsdWUuc3Vic3RyaW5nKGJyZWFrSW5kZXggKyAocmVtb3ZlQnJlYWtDaGFyID8gMSA6IDApKVxuICAgIH07XG4gICAgdG9rZW5zLnNwbGljZSh0b2tlbkluZGV4ICsgMSwgMCwgbmV3QnJlYWtUb2tlbiwgbmV3VGV4dFRva2VuKTtcbiAgICByZXR1cm4gdG9rZW5zW3Rva2VuSW5kZXhdLnZhbHVlLnN1YnN0cmluZygwLCBicmVha0luZGV4KTtcbn1cbiIsIi8qKlxuICogQWx3YXlzIHBvc2l0aXZlIG1vZHVsdXNcbiAqIEBwYXJhbSB4IE9wZXJhbmRcbiAqIEBwYXJhbSBuIE1vZHVsdXNcbiAqIEByZXR1cm5zIHggbW9kdWxvIG5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vZCh4LCBuKSB7XG4gICAgcmV0dXJuICh4ICUgbiArIG4pICUgbjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjbGFtcCh2YWwsIG1pbiA9IDAsIG1heCA9IDEpIHtcbiAgICBpZiAodmFsIDwgbWluKVxuICAgICAgICByZXR1cm4gbWluO1xuICAgIGlmICh2YWwgPiBtYXgpXG4gICAgICAgIHJldHVybiBtYXg7XG4gICAgcmV0dXJuIHZhbDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc3Vic3RyaW5nKDEpO1xufVxuLyoqXG4gKiBGb3JtYXQgYSBzdHJpbmcgaW4gYSBmbGV4aWJsZSB3YXkuIFNjYW5zIGZvciAlcyBzdHJpbmdzIGFuZCByZXBsYWNlcyB0aGVtIHdpdGggYXJndW1lbnRzLiBMaXN0IG9mIHBhdHRlcm5zIGlzIG1vZGlmaWFibGUgdmlhIFN0cmluZy5mb3JtYXQubWFwLlxuICogQHBhcmFtIHtzdHJpbmd9IHRlbXBsYXRlXG4gKiBAcGFyYW0ge2FueX0gW2FyZ3ZdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQodGVtcGxhdGUsIC4uLmFyZ3MpIHtcbiAgICBsZXQgbWFwID0gZm9ybWF0Lm1hcDtcbiAgICBsZXQgcmVwbGFjZXIgPSBmdW5jdGlvbiAobWF0Y2gsIGdyb3VwMSwgZ3JvdXAyLCBpbmRleCkge1xuICAgICAgICBpZiAodGVtcGxhdGUuY2hhckF0KGluZGV4IC0gMSkgPT0gXCIlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaC5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvYmogPSBhcmdzWzBdO1xuICAgICAgICBsZXQgZ3JvdXAgPSBncm91cDEgfHwgZ3JvdXAyO1xuICAgICAgICBsZXQgcGFydHMgPSBncm91cC5zcGxpdChcIixcIik7XG4gICAgICAgIGxldCBuYW1lID0gcGFydHMuc2hpZnQoKSB8fCBcIlwiO1xuICAgICAgICBsZXQgbWV0aG9kID0gbWFwW25hbWUudG9Mb3dlckNhc2UoKV07XG4gICAgICAgIGlmICghbWV0aG9kKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgIH1cbiAgICAgICAgb2JqID0gYXJncy5zaGlmdCgpO1xuICAgICAgICBsZXQgcmVwbGFjZWQgPSBvYmpbbWV0aG9kXS5hcHBseShvYmosIHBhcnRzKTtcbiAgICAgICAgbGV0IGZpcnN0ID0gbmFtZS5jaGFyQXQoMCk7XG4gICAgICAgIGlmIChmaXJzdCAhPSBmaXJzdC50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICByZXBsYWNlZCA9IGNhcGl0YWxpemUocmVwbGFjZWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXBsYWNlZDtcbiAgICB9O1xuICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKC8lKD86KFthLXpdKyl8KD86eyhbXn1dKyl9KSkvZ2ksIHJlcGxhY2VyKTtcbn1cbmZvcm1hdC5tYXAgPSB7XG4gICAgXCJzXCI6IFwidG9TdHJpbmdcIlxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BY3Rpb24gPSB2b2lkIDA7XG5jbGFzcyBBY3Rpb24ge1xufVxuZXhwb3J0cy5BY3Rpb24gPSBBY3Rpb247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQWx0YXJBY3Rpb24gPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlTG9nXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0eS9tZXNzYWdlTG9nXCIpO1xuY29uc3QgYWN0aW9uXzEgPSByZXF1aXJlKFwiLi9hY3Rpb25cIik7XG5jbGFzcyBBbHRhckFjdGlvbiBleHRlbmRzIGFjdGlvbl8xLkFjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoYWx0YXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hbHRhciA9IGFsdGFyO1xuICAgIH1cbiAgICBleGVjdXRlKGFjdG9yLCBtYXApIHtcbiAgICAgICAgbWVzc2FnZUxvZ18xLk1lc3NhZ2VMb2cuYWRkRXJyb3JNZXNzYWdlKCdBbHRhciBBY3Rpb24gbm90IGltcGxlbWVudGVkJywgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5leHBvcnRzLkFsdGFyQWN0aW9uID0gQWx0YXJBY3Rpb247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXR0YWNrQWN0aW9uID0gdm9pZCAwO1xuY29uc3QgZW1wdHlCZWhhdmlvcl8xID0gcmVxdWlyZShcIi4uL2JlaGF2aW9yL2VtcHR5QmVoYXZpb3JcIik7XG5jb25zdCBlbnRpdHlGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi4vZW50aXR5L2VudGl0eUZhY3RvcnlcIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uL2VudGl0eS9uYW1lc1wiKTtcbmNvbnN0IGNvbG9yc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdHkvY29sb3JzXCIpO1xuY29uc3QgbWVzc2FnZUxvZ18xID0gcmVxdWlyZShcIi4uL3V0aWxpdHkvbWVzc2FnZUxvZ1wiKTtcbmNvbnN0IGFjdGlvbl8xID0gcmVxdWlyZShcIi4vYWN0aW9uXCIpO1xuY2xhc3MgQXR0YWNrQWN0aW9uIGV4dGVuZHMgYWN0aW9uXzEuQWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihvdGhlckFjdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMub3RoZXJBY3RvciA9IG90aGVyQWN0b3I7XG4gICAgfVxuICAgIHBsYXllckRlYXRoKGFjdG9yKSB7XG4gICAgICAgIGFjdG9yLmNoYXIgPSAnJSc7XG4gICAgICAgIGFjdG9yLmZnID0gY29sb3JzXzEuY29sb3JSZWQ7XG4gICAgICAgIGFjdG9yLmJnID0gY29sb3JzXzEuY29sb3JCbGFjaztcbiAgICAgICAgYWN0b3IuYmVoYXZpb3IgPSBuZXcgZW1wdHlCZWhhdmlvcl8xLkVtcHR5QmVoYXZpb3IoKTtcbiAgICAgICAgbWVzc2FnZUxvZ18xLk1lc3NhZ2VMb2cuYWRkTWVzc2FnZShgQSBzY2FyeSBlbmVteSBraWxsZWQgeW91IWAsIGNvbG9yc18xLmNvbG9yUmVkLCBmYWxzZSk7XG4gICAgfVxuICAgIGV4ZWN1dGUoYWN0b3IsIG1hcCkge1xuICAgICAgICBpZiAoYWN0b3IubmFtZSA9PSBuYW1lc18xLm5hbWVQbGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyRGVhdGgoYWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMub3RoZXJBY3Rvci5uYW1lID09IG5hbWVzXzEubmFtZVBsYXllcikge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJEZWF0aCh0aGlzLm90aGVyQWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLS0+JywgYWN0b3IueCwgYWN0b3IueSwgdGhpcy5vdGhlckFjdG9yLngsIHRoaXMub3RoZXJBY3Rvci55KTtcbiAgICAgICAgICAgIG1hcC5yZW1vdmVBY3RvcihhY3Rvcik7XG4gICAgICAgICAgICAoMCwgZW50aXR5RmFjdG9yeV8xLnNwYXduQ29ycHNlKShtYXAsIGFjdG9yLngsIGFjdG9yLnkpO1xuICAgICAgICAgICAgbWVzc2FnZUxvZ18xLk1lc3NhZ2VMb2cuYWRkTWVzc2FnZSgnQSBzY2FyeSBlbmVteSBraWxsZWQgaXRzIGNvbXJhZGUhJywgY29sb3JzXzEuY29sb3JMaWdodEdyYXksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5leHBvcnRzLkF0dGFja0FjdGlvbiA9IEF0dGFja0FjdGlvbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CdW1wQWN0aW9uID0gdm9pZCAwO1xuY29uc3QgbmFtZXNfMSA9IHJlcXVpcmUoXCIuLi9lbnRpdHkvbmFtZXNcIik7XG5jb25zdCBhbHRhckFjdGlvbl8xID0gcmVxdWlyZShcIi4vYWx0YXJBY3Rpb25cIik7XG5jb25zdCBhdHRhY2tBY3Rpb25fMSA9IHJlcXVpcmUoXCIuL2F0dGFja0FjdGlvblwiKTtcbmNvbnN0IGRpcmVjdGlvbkFjdGlvbl8xID0gcmVxdWlyZShcIi4vZGlyZWN0aW9uQWN0aW9uXCIpO1xuY29uc3QgbW92ZUFjdGlvbl8xID0gcmVxdWlyZShcIi4vbW92ZUFjdGlvblwiKTtcbmNsYXNzIEJ1bXBBY3Rpb24gZXh0ZW5kcyBkaXJlY3Rpb25BY3Rpb25fMS5EaXJlY3Rpb25BY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKGR4LCBkeSkge1xuICAgICAgICBzdXBlcihkeCwgZHkpO1xuICAgIH1cbiAgICBleGVjdXRlKGFjdG9yLCBtYXApIHtcbiAgICAgICAgbGV0IFt4LCB5XSA9IHRoaXMuZGVzdGluYXRpb24oYWN0b3IpO1xuICAgICAgICBjb25zdCBhY3RvckF0TG9jYXRpb24gPSBtYXAuYWN0b3JBdExvY2F0aW9uKHgsIHkpO1xuICAgICAgICBpZiAoYWN0b3JBdExvY2F0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChhY3RvckF0TG9jYXRpb24ubmFtZSA9PSBuYW1lc18xLm5hbWVBbHRhcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAobmV3IGFsdGFyQWN0aW9uXzEuQWx0YXJBY3Rpb24oYWN0b3IpKS5leGVjdXRlKGFjdG9yLCBtYXApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChuZXcgYXR0YWNrQWN0aW9uXzEuQXR0YWNrQWN0aW9uKGFjdG9yQXRMb2NhdGlvbikuZXhlY3V0ZShhY3RvciwgbWFwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKG5ldyBtb3ZlQWN0aW9uXzEuTW92ZUFjdGlvbih0aGlzLmR4LCB0aGlzLmR5KSkuZXhlY3V0ZShhY3RvciwgbWFwKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuQnVtcEFjdGlvbiA9IEJ1bXBBY3Rpb247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGlyZWN0aW9uQWN0aW9uID0gdm9pZCAwO1xuY2xhc3MgRGlyZWN0aW9uQWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihkeCwgZHkpIHtcbiAgICAgICAgdGhpcy5keCA9IGR4O1xuICAgICAgICB0aGlzLmR5ID0gZHk7XG4gICAgfVxuICAgIGV4ZWN1dGUoYWN0b3IsIG1hcCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRGlyZWN0aW9uQWN0aW9uLmV4ZWN1dGUgc2hvdWxkIG5vdCBiZSBwb3NzaWJsZSFcIik7XG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBkZXN0aW5hdGlvbihhY3Rvcikge1xuICAgICAgICByZXR1cm4gW2FjdG9yLnggKyB0aGlzLmR4LCBhY3Rvci55ICsgdGhpcy5keV07XG4gICAgfVxufVxuZXhwb3J0cy5EaXJlY3Rpb25BY3Rpb24gPSBEaXJlY3Rpb25BY3Rpb247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTW92ZUFjdGlvbiA9IHZvaWQgMDtcbmNvbnN0IGNvbG9yc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdHkvY29sb3JzXCIpO1xuY29uc3QgbWVzc2FnZUxvZ18xID0gcmVxdWlyZShcIi4uL3V0aWxpdHkvbWVzc2FnZUxvZ1wiKTtcbmNvbnN0IGRpcmVjdGlvbkFjdGlvbl8xID0gcmVxdWlyZShcIi4vZGlyZWN0aW9uQWN0aW9uXCIpO1xuY2xhc3MgTW92ZUFjdGlvbiBleHRlbmRzIGRpcmVjdGlvbkFjdGlvbl8xLkRpcmVjdGlvbkFjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoZHgsIGR5KSB7XG4gICAgICAgIHN1cGVyKGR4LCBkeSk7XG4gICAgfVxuICAgIGV4ZWN1dGUoYWN0b3IsIG1hcCkge1xuICAgICAgICBsZXQgW3gsIHldID0gdGhpcy5kZXN0aW5hdGlvbihhY3Rvcik7XG4gICAgICAgIGlmICghbWFwLmlzV2Fsa2FibGUoeCwgeSkpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VMb2dfMS5NZXNzYWdlTG9nLmFkZE1lc3NhZ2UoXCJUaGF0IHdheSBpcyBibG9ja2VkXCIsIGNvbG9yc18xLmNvbG9yTGlnaHRHcmF5LCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFjdG9yLm1vdmUodGhpcy5keCwgdGhpcy5keSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuTW92ZUFjdGlvbiA9IE1vdmVBY3Rpb247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUGFzc0FjdGlvbiA9IHZvaWQgMDtcbmNsYXNzIFBhc3NBY3Rpb24ge1xuICAgIC8qKlxuICAgICAqIERvIG5vdGhpbmcuXG4gICAgICogQHBhcmFtIGFjdG9yXG4gICAgICogQHBhcmFtIGVuZ2luZVxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgZXhlY3V0ZShhY3RvciwgZW5naW5lKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5leHBvcnRzLlBhc3NBY3Rpb24gPSBQYXNzQWN0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlBpY2tVcEl0ZW1BY3Rpb24gPSB2b2lkIDA7XG5jb25zdCBjb2xvcnNfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXR5L2NvbG9yc1wiKTtcbmNvbnN0IG1lc3NhZ2VMb2dfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXR5L21lc3NhZ2VMb2dcIik7XG5jb25zdCBhY3Rpb25fMSA9IHJlcXVpcmUoXCIuL2FjdGlvblwiKTtcbmNsYXNzIFBpY2tVcEl0ZW1BY3Rpb24gZXh0ZW5kcyBhY3Rpb25fMS5BY3Rpb24ge1xuICAgIC8qKlxuICAgICAqIFBpY2sgdXAgYW4gaXRlbSBmcm9tIHRoZSBnYW1lIG1hcC5cbiAgICAgKlxuICAgICAqIEByZW1hcmtzXG4gICAgICogT25seSByZW5kZXIgaWYgdGhlIGl0ZW0gd2FzIHBpY2tlZCB1cCBmcm9tIHRoZSBtYXBcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhY3RvclxuICAgICAqIEBwYXJhbSBtYXBcbiAgICAgKiBAcmV0dXJucyB3aGV0aGVyIHJlLXJlbmRlciBpcyByZXF1aXJlZFxuICAgICAqL1xuICAgIGV4ZWN1dGUoYWN0b3IsIG1hcCkge1xuICAgICAgICBjb25zdCBpdGVtID0gbWFwLml0ZW1BdExvY2F0aW9uKGFjdG9yLngsIGFjdG9yLnkpO1xuICAgICAgICBpZiAoaXRlbSA9PSBudWxsKSB7XG4gICAgICAgICAgICBtZXNzYWdlTG9nXzEuTWVzc2FnZUxvZy5hZGRNZXNzYWdlKCdOb3RoaW5nIHRvIHBpY2sgdXAuJywgY29sb3JzXzEuY29sb3JMaWdodEdyYXksIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFjdG9yLmludmVudG9yeS5hZGRJdGVtKGl0ZW0pKSB7XG4gICAgICAgICAgICBtYXAucmVtb3ZlSXRlbShpdGVtKTtcbiAgICAgICAgICAgIG1lc3NhZ2VMb2dfMS5NZXNzYWdlTG9nLmFkZE1lc3NhZ2UoYFBpY2tlZCB1cCAke2l0ZW0ubmFtZX0uYCwgY29sb3JzXzEuY29sb3JMaWdodEdyYXksIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydHMuUGlja1VwSXRlbUFjdGlvbiA9IFBpY2tVcEl0ZW1BY3Rpb247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQUlCZWhhdmlvciA9IHZvaWQgMDtcbmNvbnN0IGJ1bXBBY3Rpb25fMSA9IHJlcXVpcmUoXCIuLi9hY3Rpb24vYnVtcEFjdGlvblwiKTtcbmNvbnN0IHBhc3NBY3Rpb25fMSA9IHJlcXVpcmUoXCIuLi9hY3Rpb24vcGFzc0FjdGlvblwiKTtcbmNvbnN0IGRpc3RhbmNlXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0eS9kaXN0YW5jZVwiKTtcbmNsYXNzIEFJQmVoYXZpb3Ige1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy5zdGFydFggPSB4O1xuICAgICAgICB0aGlzLnN0YXJ0WSA9IHk7XG4gICAgfVxuICAgIGFjdChhY3RvciwgbWFwKSB7XG4gICAgICAgIC8vIEdldCB0YXJnZXQgYmFzZWQgb24gZGlzdGFuY2VzXG4gICAgICAgIGxldCB0YXJnZXRYLCB0YXJnZXRZO1xuICAgICAgICBpZiAoYWN0b3IuZXVjbGlkZWFuRGlzdGFuY2UodGhpcy5zdGFydFgsIHRoaXMuc3RhcnRZKSA8PSAzICYmXG4gICAgICAgICAgICBhY3Rvci5ldWNsaWRlYW5EaXN0YW5jZShtYXAucGxheWVyKCkueCwgbWFwLnBsYXllcigpLnkpIDw9IDMpIHtcbiAgICAgICAgICAgIHRhcmdldFggPSBtYXAucGxheWVyKCkueDtcbiAgICAgICAgICAgIHRhcmdldFkgPSBtYXAucGxheWVyKCkueTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldFggPSB0aGlzLnN0YXJ0WDtcbiAgICAgICAgICAgIHRhcmdldFkgPSB0aGlzLnN0YXJ0WTtcbiAgICAgICAgfVxuICAgICAgICAvLyBnZXQgbW92ZXMgdG93YXJkcyB0aGUgdGFyZ2V0XG4gICAgICAgIGNvbnN0IG1vdmVzID0gdGhpcy5nZXRNb3ZlcyhhY3Rvci54LCBhY3Rvci55LCB0YXJnZXRYLCB0YXJnZXRZKTtcbiAgICAgICAgLy8gaWYgdGhlaXIgYXJlIG5vIG1vdmVzLCBkbyBub3RoaW5nXG4gICAgICAgIGlmIChtb3Zlcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFtuZXcgcGFzc0FjdGlvbl8xLlBhc3NBY3Rpb24oKSwgZmFsc2VdO1xuICAgICAgICB9XG4gICAgICAgIC8vIC4uLiBlbHNlLCBmaW5kIHRoZSBtb3ZlIHRoYXQgaXMgY2xvc2VzdCB0byB0aGUgdGFyZ2V0XG4gICAgICAgIGxldCBjbG9zZXN0VmFsID0gMTAwMDA7XG4gICAgICAgIGxldCBjbG9zZXN0SW5kZXggPSAtMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb3Zlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgY29uc3QgbmV3WCA9IGFjdG9yLnggKyBtb3Zlc1tpXVswXTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1kgPSBhY3Rvci55ICsgbW92ZXNbaV1bMV07XG4gICAgICAgICAgICBjb25zdCBkaXN0ID0gKDAsIGRpc3RhbmNlXzEuZXVjbGlkZWFuRGlzdGFuY2UpKG5ld1gsIG5ld1ksIHRhcmdldFgsIHRhcmdldFkpO1xuICAgICAgICAgICAgaWYgKGRpc3QgPCBjbG9zZXN0VmFsKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VzdFZhbCA9IGRpc3Q7XG4gICAgICAgICAgICAgICAgY2xvc2VzdEluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW25ldyBidW1wQWN0aW9uXzEuQnVtcEFjdGlvbihtb3Zlc1tjbG9zZXN0SW5kZXhdWzBdLCBtb3Zlc1tjbG9zZXN0SW5kZXhdWzFdKSwgZmFsc2VdO1xuICAgIH1cbiAgICBnZXRNb3Zlcyh4MSwgeTEsIHgyLCB5Mikge1xuICAgICAgICBsZXQgbW92ZXMgPSBbXTtcbiAgICAgICAgY29uc3QgZGlmZlggPSB4MSAtIHgyO1xuICAgICAgICBjb25zdCBkaWZmWSA9IHkxIC0geTI7XG4gICAgICAgIGlmIChkaWZmWCA9PSAwICYmIGRpZmZZID09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBtb3ZlcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZlkpID4gTWF0aC5hYnMoZGlmZlgpKSB7XG4gICAgICAgICAgICBpZiAoZGlmZlkgPiAwKVxuICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goWzAsIC0xXSk7XG4gICAgICAgICAgICBlbHNlIGlmIChkaWZmWSA8IDApXG4gICAgICAgICAgICAgICAgbW92ZXMucHVzaChbMCwgMV0pO1xuICAgICAgICAgICAgaWYgKGRpZmZYID4gMClcbiAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFstMSwgMF0pO1xuICAgICAgICAgICAgZWxzZSBpZiAoZGlmZlggPCAwKVxuICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goWzEsIDBdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpIHtcbiAgICAgICAgICAgIGlmIChkaWZmWCA+IDApXG4gICAgICAgICAgICAgICAgbW92ZXMucHVzaChbLTEsIDBdKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpZmZYIDwgMClcbiAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFsxLCAwXSk7XG4gICAgICAgICAgICBpZiAoZGlmZlkgPiAwKVxuICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goWzAsIC0xXSk7XG4gICAgICAgICAgICBlbHNlIGlmIChkaWZmWSA8IDApXG4gICAgICAgICAgICAgICAgbW92ZXMucHVzaChbMCwgMV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKChkaWZmWCArIGRpZmZZKSAlIDIgPT0gMCkge1xuICAgICAgICAgICAgaWYgKGRpZmZZID4gMClcbiAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFswLCAtMV0pO1xuICAgICAgICAgICAgZWxzZSBpZiAoZGlmZlkgPCAwKVxuICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goWzAsIDFdKTtcbiAgICAgICAgICAgIGlmIChkaWZmWCA+IDApXG4gICAgICAgICAgICAgICAgbW92ZXMucHVzaChbLTEsIDBdKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpZmZYIDwgMClcbiAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFsxLCAwXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZGlmZlggPiAwKVxuICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goWy0xLCAwXSk7XG4gICAgICAgICAgICBlbHNlIGlmIChkaWZmWCA8IDApXG4gICAgICAgICAgICAgICAgbW92ZXMucHVzaChbMSwgMF0pO1xuICAgICAgICAgICAgaWYgKGRpZmZZID4gMClcbiAgICAgICAgICAgICAgICBtb3Zlcy5wdXNoKFswLCAtMV0pO1xuICAgICAgICAgICAgZWxzZSBpZiAoZGlmZlkgPCAwKVxuICAgICAgICAgICAgICAgIG1vdmVzLnB1c2goWzAsIDFdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbW92ZXM7XG4gICAgfVxufVxuZXhwb3J0cy5BSUJlaGF2aW9yID0gQUlCZWhhdmlvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FbXB0eUJlaGF2aW9yID0gdm9pZCAwO1xuY29uc3QgcGFzc0FjdGlvbl8xID0gcmVxdWlyZShcIi4uL2FjdGlvbi9wYXNzQWN0aW9uXCIpO1xuY2xhc3MgRW1wdHlCZWhhdmlvciB7XG4gICAgYWN0KGFjdG9yLCBtYXApIHtcbiAgICAgICAgcmV0dXJuIFtuZXcgcGFzc0FjdGlvbl8xLlBhc3NBY3Rpb24oKSwgZmFsc2VdO1xuICAgIH1cbn1cbmV4cG9ydHMuRW1wdHlCZWhhdmlvciA9IEVtcHR5QmVoYXZpb3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUGxheWVyQmVoYXZpb3IgPSB2b2lkIDA7XG5jb25zdCBidW1wQWN0aW9uXzEgPSByZXF1aXJlKFwiLi4vYWN0aW9uL2J1bXBBY3Rpb25cIik7XG5jb25zdCBwYXNzQWN0aW9uXzEgPSByZXF1aXJlKFwiLi4vYWN0aW9uL3Bhc3NBY3Rpb25cIik7XG5jb25zdCBwaWNrVXBJdGVtQWN0aW9uXzEgPSByZXF1aXJlKFwiLi4vYWN0aW9uL3BpY2tVcEl0ZW1BY3Rpb25cIik7XG5jb25zdCBpbnB1dE1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuLi9nYW1lL2lucHV0TWFuYWdlclwiKTtcbmNsYXNzIFBsYXllckJlaGF2aW9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy50dXJuID0gMTtcbiAgICB9XG4gICAgYWN0KGFjdG9yLCBtYXApIHtcbiAgICAgICAgbGV0IHJlcXVlc3RBbm90aGVyVHVybiA9IHRoaXMudHVybiAlIDIgPT0gMDtcbiAgICAgICAgaWYgKGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LkRPV04pIHx8IGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LlMpKSB7XG4gICAgICAgICAgICBpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuY2xlYXIoKTtcbiAgICAgICAgICAgICsrdGhpcy50dXJuO1xuICAgICAgICAgICAgcmV0dXJuIFtuZXcgYnVtcEFjdGlvbl8xLkJ1bXBBY3Rpb24oMCwgMSksIHJlcXVlc3RBbm90aGVyVHVybl07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LlVQKSB8fCBpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5XKSkge1xuICAgICAgICAgICAgaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmNsZWFyKCk7XG4gICAgICAgICAgICArK3RoaXMudHVybjtcbiAgICAgICAgICAgIHJldHVybiBbbmV3IGJ1bXBBY3Rpb25fMS5CdW1wQWN0aW9uKDAsIC0xKSwgcmVxdWVzdEFub3RoZXJUdXJuXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmlzS2V5RG93bihpbnB1dE1hbmFnZXJfMS5LZXkuTEVGVCkgfHwgaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmlzS2V5RG93bihpbnB1dE1hbmFnZXJfMS5LZXkuQSkpIHtcbiAgICAgICAgICAgIGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5jbGVhcigpO1xuICAgICAgICAgICAgKyt0aGlzLnR1cm47XG4gICAgICAgICAgICByZXR1cm4gW25ldyBidW1wQWN0aW9uXzEuQnVtcEFjdGlvbigtMSwgMCksIHJlcXVlc3RBbm90aGVyVHVybl07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LlJJR0hUKSB8fCBpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5EKSkge1xuICAgICAgICAgICAgaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmNsZWFyKCk7XG4gICAgICAgICAgICArK3RoaXMudHVybjtcbiAgICAgICAgICAgIHJldHVybiBbbmV3IGJ1bXBBY3Rpb25fMS5CdW1wQWN0aW9uKDEsIDApLCByZXF1ZXN0QW5vdGhlclR1cm5dO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5HKSkge1xuICAgICAgICAgICAgaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmNsZWFyKCk7XG4gICAgICAgICAgICArK3RoaXMudHVybjtcbiAgICAgICAgICAgIHJldHVybiBbbmV3IHBpY2tVcEl0ZW1BY3Rpb25fMS5QaWNrVXBJdGVtQWN0aW9uKCksIHJlcXVlc3RBbm90aGVyVHVybl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtuZXcgcGFzc0FjdGlvbl8xLlBhc3NBY3Rpb24oKSwgdHJ1ZV07XG4gICAgfVxufVxuZXhwb3J0cy5QbGF5ZXJCZWhhdmlvciA9IFBsYXllckJlaGF2aW9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJhc2VDb21wb25lbnQgPSB2b2lkIDA7XG5jbGFzcyBCYXNlQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgfVxufVxuZXhwb3J0cy5CYXNlQ29tcG9uZW50ID0gQmFzZUNvbXBvbmVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5JbnZlbnRvcnlDb21wb25lbnQgPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlTG9nXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0eS9tZXNzYWdlTG9nXCIpO1xuY29uc3QgYmFzZUNvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vYmFzZUNvbXBvbmVudFwiKTtcbmNsYXNzIEludmVudG9yeUNvbXBvbmVudCBleHRlbmRzIGJhc2VDb21wb25lbnRfMS5CYXNlQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQsIGNhcGFjaXR5KSB7XG4gICAgICAgIHN1cGVyKHBhcmVudCk7XG4gICAgICAgIHRoaXMuY2FwYWNpdHkgPSBjYXBhY2l0eTtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgaXRlbSB0byB0aGUgaW52ZW50b3J5LlxuICAgICAqXG4gICAgICogQHJlbWFya3NcbiAgICAgKiBJZiBpdGVtIGFkZGVkLCBhIG5pY2UgbWVzc2FnZSBpcyBhZGRlZCB0byB0aGUgbWVzc2FnZSBvZy4gSWYgdGhlIGludmVudG9yeVxuICAgICAqIGlzIGZ1bGwsIHRoZW4gYW4gZXJyb3IgbWVzc2FnZSBpcyBwcmludGVkIGZvciB0aGUgcGxheWVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIGl0ZW1cbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIHRoZSBpdGVtIHdhcyBhZGRlZCwgZWxzZSBmYWxzZVxuICAgICAqL1xuICAgIGFkZEl0ZW0oaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPj0gdGhpcy5jYXBhY2l0eSkge1xuICAgICAgICAgICAgbWVzc2FnZUxvZ18xLk1lc3NhZ2VMb2cuYWRkRXJyb3JNZXNzYWdlKFwiSW52ZW50b3J5IGZ1bGwuXCIsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERyb3AgdGhlIGl0ZW0gYmFjayBvbnRvIHRoZSBtYXAuXG4gICAgICpcbiAgICAgKiBAcmVtYXJrXG4gICAgICogSWYgdGhlIGl0ZW0gaGFzIGFuIGlkIG9mIC0xLCBhbiBlcnJvciBtZXNzYWdlIGlzIGFkZGVkIHRvIHRoZSBtZXNzYWdlIGxvZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpdGVtXG4gICAgICogQHBhcmFtIGFjdG9yXG4gICAgICogQHBhcmFtIG1hcFxuICAgICAqL1xuICAgIGRyb3AoaXRlbSwgYWN0b3IsIG1hcCkge1xuICAgICAgICBpZiAoaXRlbS5pZCAhPSAtMSkge1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaXRlbS5pZCwgMSk7XG4gICAgICAgICAgICBpdGVtLnggPSBhY3Rvci54O1xuICAgICAgICAgICAgaXRlbS55ID0gYWN0b3IueTtcbiAgICAgICAgICAgIG1hcC5hZGRFbnRpdHkoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtZXNzYWdlTG9nXzEuTWVzc2FnZUxvZy5hZGRFcnJvck1lc3NhZ2UoYCR7aXRlbS5uYW1lfSBoYWQgaW52YWxpZCBpZCBvZiAtMS4gQ29udGFjdCBhZG1pbi5gLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuSW52ZW50b3J5Q29tcG9uZW50ID0gSW52ZW50b3J5Q29tcG9uZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFjdG9yID0gdm9pZCAwO1xuY29uc3QgZW50aXR5XzEgPSByZXF1aXJlKFwiLi9lbnRpdHlcIik7XG5jb25zdCByZW5kZXJPcmRlcl8xID0gcmVxdWlyZShcIi4uL3V0aWxpdHkvcmVuZGVyT3JkZXJcIik7XG5jb25zdCBlbXB0eUJlaGF2aW9yXzEgPSByZXF1aXJlKFwiLi4vYmVoYXZpb3IvZW1wdHlCZWhhdmlvclwiKTtcbmNvbnN0IGNvbG9yc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdHkvY29sb3JzXCIpO1xuY29uc3QgaW52ZW50b3J5Q29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50L2ludmVudG9yeUNvbXBvbmVudFwiKTtcbmNsYXNzIEFjdG9yIGV4dGVuZHMgZW50aXR5XzEuRW50aXR5IHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDAsIG5hbWUgPSBcIlVua25vd24gQWN0b3JcIiwgYmxvY2tzTW92ZW1lbnQgPSBmYWxzZSwgY2hhciA9IFwiP1wiLCBmZyA9IGNvbG9yc18xLmNvbG9yV2hpdGUsIGJnID0gY29sb3JzXzEuY29sb3JCbGFjaywgcmVuZGVyT3JkZXIgPSByZW5kZXJPcmRlcl8xLlJlbmRlck9yZGVyLkNvcnBzZSwgYmVoYXZpb3IgPSBuZXcgZW1wdHlCZWhhdmlvcl8xLkVtcHR5QmVoYXZpb3IoKSwgaW52ZW50b3J5U2l6ZSA9IDIwKSB7XG4gICAgICAgIHN1cGVyKHgsIHksIG5hbWUsIGJsb2Nrc01vdmVtZW50LCBjaGFyLCBmZywgYmcsIHJlbmRlck9yZGVyKTtcbiAgICAgICAgdGhpcy5iZWhhdmlvciA9IGJlaGF2aW9yO1xuICAgICAgICB0aGlzLmludmVudG9yeSA9IG5ldyBpbnZlbnRvcnlDb21wb25lbnRfMS5JbnZlbnRvcnlDb21wb25lbnQodGhpcywgaW52ZW50b3J5U2l6ZSk7XG4gICAgfVxuICAgIGFjdChtYXApIHtcbiAgICAgICAgbGV0IFthY3Rpb24sIHJlcXVlc3RBbm90aGVyVHVybl0gPSB0aGlzLmJlaGF2aW9yLmFjdCh0aGlzLCBtYXApO1xuICAgICAgICBsZXQgcmVxdWVzdFJlbmRlciA9IGZhbHNlO1xuICAgICAgICBpZiAoYWN0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlcXVlc3RSZW5kZXIgPSBhY3Rpb24uZXhlY3V0ZSh0aGlzLCBtYXApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbcmVxdWVzdEFub3RoZXJUdXJuLCByZXF1ZXN0UmVuZGVyXTtcbiAgICB9XG59XG5leHBvcnRzLkFjdG9yID0gQWN0b3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRW50aXR5ID0gdm9pZCAwO1xuY29uc3QgZXJyb3JfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXR5L2Vycm9yXCIpO1xuY29uc3QgcmVuZGVyT3JkZXJfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXR5L3JlbmRlck9yZGVyXCIpO1xuY29uc3QgZGlzdGFuY2VfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXR5L2Rpc3RhbmNlXCIpO1xuY29uc3QgY29sb3JzXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0eS9jb2xvcnNcIik7XG5jbGFzcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCwgbmFtZSA9IFwiVW5rbm93blwiLCBibG9ja3NNb3ZlbWVudCA9IGZhbHNlLCBjaGFyID0gXCI/XCIsIGZnID0gY29sb3JzXzEuY29sb3JXaGl0ZSwgYmcgPSBjb2xvcnNfMS5jb2xvckJsYWNrLCByZW5kZXJPcmRlciA9IHJlbmRlck9yZGVyXzEuUmVuZGVyT3JkZXIuQ29ycHNlKSB7XG4gICAgICAgIHRoaXMuaWQgPSAtMTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5ibG9ja3NNb3ZlbWVudCA9IGJsb2Nrc01vdmVtZW50O1xuICAgICAgICB0aGlzLmNoYXIgPSBjaGFyO1xuICAgICAgICB0aGlzLmZnID0gZmc7XG4gICAgICAgIHRoaXMuYmcgPSBiZztcbiAgICAgICAgdGhpcy5yZW5kZXJPcmRlciA9IHJlbmRlck9yZGVyO1xuICAgICAgICAoMCwgZXJyb3JfMS5hc3NlcnQpKHRoaXMuY2hhci5sZW5ndGggPT09IDEpO1xuICAgIH1cbiAgICBtb3ZlKGR4LCBkeSkge1xuICAgICAgICB0aGlzLnggKz0gZHg7XG4gICAgICAgIHRoaXMueSArPSBkeTtcbiAgICB9XG4gICAgcmVuZGVyKGRpc3BsYXkpIHtcbiAgICAgICAgZGlzcGxheS5kcmF3KHRoaXMueCwgdGhpcy55LCB0aGlzLmNoYXIsIHRoaXMuZmcsIHRoaXMuYmcpO1xuICAgIH1cbiAgICBldWNsaWRlYW5EaXN0YW5jZSh4LCB5KSB7XG4gICAgICAgIHJldHVybiAoMCwgZGlzdGFuY2VfMS5ldWNsaWRlYW5EaXN0YW5jZSkodGhpcy54LCB0aGlzLnksIHgsIHkpO1xuICAgIH1cbn1cbmV4cG9ydHMuRW50aXR5ID0gRW50aXR5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNwYXduR2VtID0gZXhwb3J0cy5zcGF3bkFsdGFyID0gZXhwb3J0cy5zcGF3bkVuZW15ID0gZXhwb3J0cy5zcGF3blBsYXllciA9IGV4cG9ydHMuc3Bhd25Db3Jwc2UgPSB2b2lkIDA7XG5jb25zdCBhY3Rvcl8xID0gcmVxdWlyZShcIi4vYWN0b3JcIik7XG5jb25zdCBhaUJlaGF2aW9yXzEgPSByZXF1aXJlKFwiLi4vYmVoYXZpb3IvYWlCZWhhdmlvclwiKTtcbmNvbnN0IGNvbG9yc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdHkvY29sb3JzXCIpO1xuY29uc3QgaXRlbV8xID0gcmVxdWlyZShcIi4vaXRlbVwiKTtcbmNvbnN0IHJlbmRlck9yZGVyXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0eS9yZW5kZXJPcmRlclwiKTtcbmNvbnN0IGVudGl0eV8xID0gcmVxdWlyZShcIi4vZW50aXR5XCIpO1xuY29uc3QgZW1wdHlCZWhhdmlvcl8xID0gcmVxdWlyZShcIi4uL2JlaGF2aW9yL2VtcHR5QmVoYXZpb3JcIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4vbmFtZXNcIik7XG4vLyAtLS0tLS0tLS0tLS0gRW50aXRpZXMgLS0tLS0tLS0tLS0tXG5mdW5jdGlvbiBzcGF3bkNvcnBzZShtYXAsIHgsIHkpIHtcbiAgICBjb25zdCBjb3Jwc2UgPSBuZXcgZW50aXR5XzEuRW50aXR5KHgsIHksICdDb3Jwc2UnLCBmYWxzZSwgJyUnLCBjb2xvcnNfMS5jb2xvclJlZCwgY29sb3JzXzEuY29sb3JCbGFjaywgcmVuZGVyT3JkZXJfMS5SZW5kZXJPcmRlci5Db3Jwc2UpO1xuICAgIG1hcC5hZGRFbnRpdHkoY29ycHNlKTtcbiAgICByZXR1cm4gY29ycHNlO1xufVxuZXhwb3J0cy5zcGF3bkNvcnBzZSA9IHNwYXduQ29ycHNlO1xuLy8gLS0tLS0tLS0tLS0tIEFjdG9ycyAtLS0tLS0tLS0tLS1cbmZ1bmN0aW9uIHNwYXduUGxheWVyKG1hcCwgeCwgeSkge1xuICAgIG1hcC5wbGF5ZXIoKS54ID0geDtcbiAgICBtYXAucGxheWVyKCkueSA9IHk7XG4gICAgcmV0dXJuIG1hcC5wbGF5ZXIoKTtcbn1cbmV4cG9ydHMuc3Bhd25QbGF5ZXIgPSBzcGF3blBsYXllcjtcbmZ1bmN0aW9uIHNwYXduRW5lbXkobWFwLCB4LCB5KSB7XG4gICAgbGV0IGVuZW15ID0gbmV3IGFjdG9yXzEuQWN0b3IoKTtcbiAgICBlbmVteS54ID0geDtcbiAgICBlbmVteS55ID0geTtcbiAgICBlbmVteS5uYW1lID0gbmFtZXNfMS5uYW1lRW5lbXk7XG4gICAgZW5lbXkuY2hhciA9ICdFJztcbiAgICBlbmVteS5mZyA9IGNvbG9yc18xLmNvbG9yRW5lbXk7XG4gICAgZW5lbXkuYmVoYXZpb3IgPSBuZXcgYWlCZWhhdmlvcl8xLkFJQmVoYXZpb3IoeCwgeSk7XG4gICAgbWFwLmFkZEFjdG9yKGVuZW15KTtcbiAgICByZXR1cm4gZW5lbXk7XG59XG5leHBvcnRzLnNwYXduRW5lbXkgPSBzcGF3bkVuZW15O1xuZnVuY3Rpb24gc3Bhd25BbHRhcihtYXAsIHgsIHkpIHtcbiAgICBsZXQgYWx0YXIgPSBuZXcgYWN0b3JfMS5BY3Rvcih4LCB5LCBuYW1lc18xLm5hbWVBbHRhciwgdHJ1ZSwgJ0EnLCBjb2xvcnNfMS5jb2xvckRhcmtHcmF5LCBjb2xvcnNfMS5jb2xvclZpc2libGUsIHJlbmRlck9yZGVyXzEuUmVuZGVyT3JkZXIuSXRlbSwgbmV3IGVtcHR5QmVoYXZpb3JfMS5FbXB0eUJlaGF2aW9yKCksIDApO1xuICAgIG1hcC5hZGRBY3RvcihhbHRhcik7XG4gICAgcmV0dXJuIGFsdGFyO1xufVxuZXhwb3J0cy5zcGF3bkFsdGFyID0gc3Bhd25BbHRhcjtcbi8vIC0tLS0tLS0tLS0tLSBJdGVtcyAtLS0tLS0tLS0tLS1cbmZ1bmN0aW9uIHNwYXduR2VtKG1hcCwgeCwgeSkge1xuICAgIGxldCBnZW0gPSBuZXcgaXRlbV8xLkl0ZW0oeCwgeSwgbmFtZXNfMS5uYW1lR2VtLCBmYWxzZSwgJyonLCBjb2xvcnNfMS5jb2xvckdlbSwgY29sb3JzXzEuY29sb3JCbGFjaywgcmVuZGVyT3JkZXJfMS5SZW5kZXJPcmRlci5JdGVtLCBudWxsKTtcbiAgICBtYXAuYWRkSXRlbShnZW0pO1xuICAgIHJldHVybiBnZW07XG59XG5leHBvcnRzLnNwYXduR2VtID0gc3Bhd25HZW07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSXRlbSA9IHZvaWQgMDtcbmNvbnN0IGVudGl0eV8xID0gcmVxdWlyZShcIi4vZW50aXR5XCIpO1xuY29uc3QgcmVuZGVyT3JkZXJfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXR5L3JlbmRlck9yZGVyXCIpO1xuY29uc3QgY29sb3JzXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0eS9jb2xvcnNcIik7XG5jbGFzcyBJdGVtIGV4dGVuZHMgZW50aXR5XzEuRW50aXR5IHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDAsIG5hbWUgPSBcIlVua25vd24gSXRlbVwiLCBibG9ja3NNb3ZlbWVudCA9IGZhbHNlLCBjaGFyID0gXCI/XCIsIGZnID0gY29sb3JzXzEuY29sb3JXaGl0ZSwgYmcgPSBjb2xvcnNfMS5jb2xvckJsYWNrLCByZW5kZXJPcmRlciA9IHJlbmRlck9yZGVyXzEuUmVuZGVyT3JkZXIuQ29ycHNlLCBjb25zdW1hYmxlID0gbnVsbCwgaWQgPSAtMSkge1xuICAgICAgICBzdXBlcih4LCB5LCBuYW1lLCBibG9ja3NNb3ZlbWVudCwgY2hhciwgZmcsIGJnLCByZW5kZXJPcmRlcik7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICB9XG59XG5leHBvcnRzLkl0ZW0gPSBJdGVtO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm5hbWVQbGF5ZXIgPSBleHBvcnRzLm5hbWVHZW0gPSBleHBvcnRzLm5hbWVFbmVteSA9IGV4cG9ydHMubmFtZUFsdGFyID0gdm9pZCAwO1xuZXhwb3J0cy5uYW1lQWx0YXIgPSBcIkFsdGFyXCI7XG5leHBvcnRzLm5hbWVFbmVteSA9IFwiU2NhcnkgRW5lbXlcIjtcbmV4cG9ydHMubmFtZUdlbSA9IFwiR2VtXCI7XG5leHBvcnRzLm5hbWVQbGF5ZXIgPSBcIllvdVwiO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkdhbWUgPSB2b2lkIDA7XG5jb25zdCByb3RfanNfMSA9IHJlcXVpcmUoXCJyb3QtanNcIik7XG5jb25zdCBnYW1lTWFwXzEgPSByZXF1aXJlKFwiLi9nYW1lTWFwXCIpO1xuY29uc3QgaW5wdXRNYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi9pbnB1dE1hbmFnZXJcIik7XG5jb25zdCB1aUZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuLi91aS91aUZhY3RvcnlcIik7XG5jb25zdCByb29tR2VuZXJhdG9yXzEgPSByZXF1aXJlKFwiLi4vZ2VuZXJhdGlvbi9yb29tR2VuZXJhdG9yXCIpO1xuY29uc3QgZW50aXR5RmFjdG9yeV8xID0gcmVxdWlyZShcIi4uL2VudGl0eS9lbnRpdHlGYWN0b3J5XCIpO1xuY29uc3QgbWVzc2FnZUxvZ18xID0gcmVxdWlyZShcIi4uL3V0aWxpdHkvbWVzc2FnZUxvZ1wiKTtcbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHsgd2lkdGg6IDgwLCBoZWlnaHQ6IDQwIH07XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IG5ldyByb3RfanNfMS5EaXNwbGF5KHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmNvbmZpZy53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5jb25maWcuaGVpZ2h0LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgZ2FtZU1hcF8xLkdhbWVNYXAodGhpcy5jb25maWcud2lkdGgsIHRoaXMuY29uZmlnLmhlaWdodCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5kaXNwbGF5LmdldENvbnRhaW5lcigpKTtcbiAgICAgICAgdGhpcy5kZWx0YSA9IDA7XG4gICAgfVxuICAgIGdlbmVyYXRlTWFwKCkge1xuICAgICAgICBsZXQgdGVtcCA9IG5ldyByb29tR2VuZXJhdG9yXzEuUm9vbUdlbmVyYXRvcih0aGlzLmNvbmZpZy53aWR0aCwgdGhpcy5jb25maWcuaGVpZ2h0KTtcbiAgICAgICAgbGV0IHJlcyA9IHRlbXAuZ2VuZXJhdGUoKTtcbiAgICAgICAgdGhpcy5tYXAgPSByZXNbMF07XG4gICAgICAgICgwLCBlbnRpdHlGYWN0b3J5XzEuc3Bhd25QbGF5ZXIpKHRoaXMubWFwLCByZXNbMV0sIHJlc1syXSk7XG4gICAgfVxuICAgIHNldFVJU2l6ZSgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBjYW52YXMgPSAoX2EgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldENvbnRleHQoJzJkJykuY2FudmFzO1xuICAgICAgICBjb25zdCBsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZXMnKTtcbiAgICAgICAgbG9nLnN0eWxlLmxlZnQgPSBgJHtjYW52YXMub2Zmc2V0TGVmdH1weGA7XG4gICAgICAgIGxvZy5zdHlsZS53aWR0aCA9IGAke2NhbnZhcy53aWR0aH1weGA7XG4gICAgfVxuICAgIHJlbmRlcihtZW51LCBjb21wdXRlRk9WKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheS5jbGVhcigpO1xuICAgICAgICBpZiAoY29tcHV0ZUZPVikge1xuICAgICAgICAgICAgdGhpcy5tYXAuY29tcHV0ZUZPVih0aGlzLm1hcC5wbGF5ZXIoKS54LCB0aGlzLm1hcC5wbGF5ZXIoKS55KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hcC5yZW5kZXIodGhpcy5kaXNwbGF5KTtcbiAgICAgICAgaWYgKG1lbnUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG1lbnUucmVuZGVyKHRoaXMuZGlzcGxheSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIC8vIEdVSSBzZXQgdXAgZm9yIHRoZSBicm93c2VyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJykuYXBwZW5kQ2hpbGQodGhpcy5kaXNwbGF5LmdldENvbnRhaW5lcigpKTtcbiAgICAgICAgdGhpcy5zZXRVSVNpemUoKTtcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5zZXRVSVNpemUpO1xuICAgICAgICAvLyBpbml0aWFsaXplIGdhbWUgZW5naW5lIGRldGFpbHNcbiAgICAgICAgaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmluaXQoKTtcbiAgICAgICAgbGV0IG9sZFRpbWVTdGFtcDtcbiAgICAgICAgbGV0IGZwcztcbiAgICAgICAgLy8gd2Ugc3RhcnQgYXQgdGhlIG1haW4gbWVudVxuICAgICAgICBsZXQgbWVudSA9ICgwLCB1aUZhY3RvcnlfMS5tYWluTWVudSkodGhpcy5jb25maWcud2lkdGgsIHRoaXMuY29uZmlnLmhlaWdodCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZU1hcCgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIobnVsbCwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyB0aGUgbG9vcCBpcyBhIGNhbGxiYWNrIGhhbmRsZWQgYnkgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICBjb25zdCBnYW1lTG9vcCA9ICh0aW1lU3RhbXApID0+IHtcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgbnVtYmVyIG9mIHNlY29uZHMgcGFzc2VkIHNpbmNlIHRoZSBsYXN0IGZyYW1lXG4gICAgICAgICAgICB0aGlzLmRlbHRhID0gKHRpbWVTdGFtcCAtIG9sZFRpbWVTdGFtcCkgLyAxMDAwO1xuICAgICAgICAgICAgb2xkVGltZVN0YW1wID0gdGltZVN0YW1wO1xuICAgICAgICAgICAgZnBzID0gTWF0aC5yb3VuZCgxIC8gdGhpcy5kZWx0YSk7XG4gICAgICAgICAgICBpZiAobWVudSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgbWVudSB0aGVuIGl0IGhhbmRsZXMgaW5wdXRcbiAgICAgICAgICAgICAgICBtZW51LnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChtZW51LnNob3VsZEV4aXQpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVudSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKG1lbnUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWVudS5zaG91bGRSZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIobWVudSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LkgpKSB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBoZWxwIG1lbnVcbiAgICAgICAgICAgICAgICBtZW51ID0gKDAsIHVpRmFjdG9yeV8xLmhlbHBNZW51KSh0aGlzLmNvbmZpZy53aWR0aCwgdGhpcy5jb25maWcuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHJ1biBnYW1lIGFuZCByZW5kZXIgaWYgcmVxdWVzdGVkIGJ5IHRoZSBtYXBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXAucnVuQWN0b3JzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIobnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYXAucGxheWVySXNBbGl2ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51ID0gKDAsIHVpRmFjdG9yeV8xLmdhbWVPdmVyTWVudSkodGhpcy5jb25maWcud2lkdGgsIHRoaXMuY29uZmlnLmhlaWdodCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUxvZ18xLk1lc3NhZ2VMb2cuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51ID0gKDAsIHVpRmFjdG9yeV8xLm1haW5NZW51KSh0aGlzLmNvbmZpZy53aWR0aCwgdGhpcy5jb25maWcuaGVpZ2h0LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVNYXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIobnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuICAgICAgICB9O1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcbiAgICB9XG59XG5leHBvcnRzLkdhbWUgPSBHYW1lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkdhbWVNYXAgPSB2b2lkIDA7XG5jb25zdCB0aWxlRmFjdG9yeV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi90aWxlL3RpbGVGYWN0b3J5XCIpKTtcbmNvbnN0IGVycm9yXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0eS9lcnJvclwiKTtcbmNvbnN0IGFjdG9yXzEgPSByZXF1aXJlKFwiLi4vZW50aXR5L2FjdG9yXCIpO1xuY29uc3QgcHJlY2lzZV9zaGFkb3djYXN0aW5nXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInJvdC1qcy9saWIvZm92L3ByZWNpc2Utc2hhZG93Y2FzdGluZ1wiKSk7XG5jb25zdCByZW5kZXJPcmRlcl8xID0gcmVxdWlyZShcIi4uL3V0aWxpdHkvcmVuZGVyT3JkZXJcIik7XG5jb25zdCBwbGF5ZXJCZWhhdmlvcl8xID0gcmVxdWlyZShcIi4uL2JlaGF2aW9yL3BsYXllckJlaGF2aW9yXCIpO1xuY29uc3QgY29sb3JzXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0eS9jb2xvcnNcIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uL2VudGl0eS9uYW1lc1wiKTtcbmNsYXNzIEdhbWVNYXAge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5lbnRpdGllcyA9IFtdO1xuICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgIHRoaXMuYWN0b3JzID0gW107XG4gICAgICAgIHRoaXMuZW50aXR5SWRzID0gW107XG4gICAgICAgIHRoaXMuaXRlbUlkcyA9IFtdO1xuICAgICAgICB0aGlzLmFjdG9ySWRzID0gW107XG4gICAgICAgIHRoaXMuYWN0b3JJbmRleCA9IDA7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMudGlsZXMgPSBBcnJheSh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQgKyB0aGlzLndpZHRoKS5maWxsKHRpbGVGYWN0b3J5XzEuZGVmYXVsdC53YWxsKTtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gQXJyYXkodGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0ICsgdGhpcy53aWR0aCkuZmlsbChmYWxzZSk7XG4gICAgICAgIHRoaXMuZXhwbG9yZWQgPSBBcnJheSh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQgKyB0aGlzLndpZHRoKS5maWxsKGZhbHNlKTtcbiAgICAgICAgdGhpcy5hY3RvcnMucHVzaChuZXcgYWN0b3JfMS5BY3RvcigwLCAwLCBuYW1lc18xLm5hbWVQbGF5ZXIsIHRydWUsICdAJywgY29sb3JzXzEuY29sb3JXaGl0ZSwgY29sb3JzXzEuY29sb3JCbGFjaywgcmVuZGVyT3JkZXJfMS5SZW5kZXJPcmRlci5BY3RvciwgbmV3IHBsYXllckJlaGF2aW9yXzEuUGxheWVyQmVoYXZpb3IoKSkpO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy50aWxlcyA9IEFycmF5KHRoaXMud2lkdGggKiB0aGlzLmhlaWdodCArIHRoaXMud2lkdGgpLmZpbGwodGlsZUZhY3RvcnlfMS5kZWZhdWx0LndhbGwpO1xuICAgICAgICB0aGlzLnZpc2libGUgPSBBcnJheSh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQgKyB0aGlzLndpZHRoKS5maWxsKGZhbHNlKTtcbiAgICAgICAgdGhpcy5leHBsb3JlZCA9IEFycmF5KHRoaXMud2lkdGggKiB0aGlzLmhlaWdodCArIHRoaXMud2lkdGgpLmZpbGwoZmFsc2UpO1xuICAgICAgICB0aGlzLnBsYXllcigpLmNoYXIgPSAnQCc7XG4gICAgICAgIHRoaXMucGxheWVyKCkuZmcgPSBjb2xvcnNfMS5jb2xvcldoaXRlO1xuICAgICAgICB0aGlzLnBsYXllcigpLmJnID0gY29sb3JzXzEuY29sb3JCbGFjaztcbiAgICAgICAgdGhpcy5wbGF5ZXIoKS5iZWhhdmlvciA9IG5ldyBwbGF5ZXJCZWhhdmlvcl8xLlBsYXllckJlaGF2aW9yKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcGxheWVyXG4gICAgICogQHJlbWFya3NcbiAgICAgKiBQbGF5ZXIgaXMgYWx3YXlzIGF0IHRoZSBmaXJzdCBpbmRleCBvZiB0aGUgYWN0b3JzXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyAtIEFjdG9yIGZvciB0aGUgcGxheWVyXG4gICAgICogQGJldGFcbiAgICAgKi9cbiAgICBwbGF5ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdG9yc1swXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGxheWVyIGlzIGFsaXZlXG4gICAgICpcbiAgICAgKiBAcmVtYXJrc1xuICAgICAqIFRoZSBkZWF0aCBjaGFyYWN0ZXIgaXMgYWx3YXlzICclJyBzbyB0aGF0J3Mgd2FodCB3ZSBjaGVjayBmb3Igc2luY2UgdGhlIGdhbWVcbiAgICAgKiBkb2Vzbid0IGluY2x1ZGUgc29tZXRoaW5nIGxpa2UgaGVhbHRoLlxuICAgICAqXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgcGxheWVyIGlzIGFsaXZlIGVsc2UgZmFsc2VcbiAgICAgKiBAYmV0YVxuICAgICAqL1xuICAgIHBsYXllcklzQWxpdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsYXllcigpLmNoYXIgIT0gJyUnO1xuICAgIH1cbiAgICBpbmRleCh4LCB5KSB7XG4gICAgICAgIHJldHVybiB5ICogdGhpcy53aWR0aCArIHg7XG4gICAgfVxuICAgIGluQm91bmRzKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHkgKiB0aGlzLndpZHRoICsgeCA8IHRoaXMudGlsZXMubGVuZ3RoO1xuICAgIH1cbiAgICBpc1dhbGthYmxlKHgsIHkpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4KHgsIHkpO1xuICAgICAgICBpZiAoaW5kZXggPj0gdGhpcy50aWxlcy5sZW5ndGggfHwgaW5kZXggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudGlsZXNbaW5kZXhdLndhbGthYmxlO1xuICAgIH1cbiAgICBzZXRUaWxlKHgsIHksIHRpbGUpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4KHgsIHkpO1xuICAgICAgICAoMCwgZXJyb3JfMS5hc3NlcnQpKGluZGV4IDwgdGhpcy50aWxlcy5sZW5ndGgpO1xuICAgICAgICB0aGlzLnRpbGVzW2luZGV4XSA9IHRpbGU7XG4gICAgfVxuICAgIHJlbmRlcihkaXNwbGF5KSB7XG4gICAgICAgIGxldCB5O1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgLy8gcmVuZGVyIHRoZSBtYXBcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyArK3kpIHtcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCB0aGlzLndpZHRoOyArK3gpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aWxlID0gdGhpcy50aWxlc1tpbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZVtpbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheS5kcmF3KHgsIHksIHRpbGUuY2hhciwgdGlsZS5pblZpZXdGRywgdGlsZS5pblZpZXdCRyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZXhwbG9yZWRbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXkuZHJhdyh4LCB5LCB0aWxlLmNoYXIsIHRpbGUub3V0T2ZWaWV3RkcsIHRpbGUub3V0T2ZWaWV3QkcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBlbHNlIGRyYXcgbm90aGluZ1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVuZGVyIGVudGl0aWVzXG4gICAgICAgIC8vIHRoaXMuZW50aXRpZXMuc29ydCgoYSwgYikgPT4ge3JldHVybiBhLnJlbmRlck9yZGVyLnZhbHVlT2YoKSAtIGIucmVuZGVyT3JkZXIudmFsdWVPZigpfSk7XG4gICAgICAgIGZvciAobGV0IGUgb2YgdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgaWYgKGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZVt0aGlzLmluZGV4KGUueCwgZS55KV0pIHtcbiAgICAgICAgICAgICAgICBlLnJlbmRlcihkaXNwbGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyByZW5kZXIgaXRlbXNcbiAgICAgICAgZm9yIChsZXQgZSBvZiB0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICBpZiAoZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlW3RoaXMuaW5kZXgoZS54LCBlLnkpXSkge1xuICAgICAgICAgICAgICAgIGUucmVuZGVyKGRpc3BsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHJlbmRlciBhY3RvcnNcbiAgICAgICAgLy8gdGhpcy5lbnRpdGllcy5zb3J0KChhLCBiKSA9PiB7cmV0dXJuIGEucmVuZGVyT3JkZXIudmFsdWVPZigpIC0gYi5yZW5kZXJPcmRlci52YWx1ZU9mKCl9KTtcbiAgICAgICAgZm9yIChsZXQgYSBvZiB0aGlzLmFjdG9ycykge1xuICAgICAgICAgICAgaWYgKGEgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZVt0aGlzLmluZGV4KGEueCwgYS55KV0pIHtcbiAgICAgICAgICAgICAgICBhLnJlbmRlcihkaXNwbGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyAtLS0tLS0tLS0tIEFkZFxuICAgIGFkZEVudGl0eShlbnRpdHkpIHtcbiAgICAgICAgKDAsIGVycm9yXzEuYXNzZXJ0KSh0aGlzLmxvY2F0aW9uT2NjdXBpZWQoZW50aXR5LngsIGVudGl0eS55KSA9PSBmYWxzZSk7XG4gICAgICAgIGlmICh0aGlzLmVudGl0eUlkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IHRoaXMuZW50aXR5SWRzLnBvcCgpO1xuICAgICAgICAgICAgZW50aXR5LmlkID0gaWQ7XG4gICAgICAgICAgICB0aGlzLmVudGl0aWVzW2lkXSA9IGVudGl0eTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVudGl0eS5pZCA9IHRoaXMuZW50aXRpZXMubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5lbnRpdGllcy5wdXNoKGVudGl0eSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYWRkQWN0b3IoYWN0b3IpIHtcbiAgICAgICAgKDAsIGVycm9yXzEuYXNzZXJ0KSh0aGlzLmxvY2F0aW9uT2NjdXBpZWQoYWN0b3IueCwgYWN0b3IueSkgPT0gZmFsc2UpO1xuICAgICAgICBpZiAodGhpcy5hY3Rvcklkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IHRoaXMuYWN0b3JJZHMucG9wKCk7XG4gICAgICAgICAgICBhY3Rvci5pZCA9IGlkO1xuICAgICAgICAgICAgdGhpcy5hY3RvcnNbaWRdID0gYWN0b3I7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhY3Rvci5pZCA9IHRoaXMuYWN0b3JzLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuYWN0b3JzLnB1c2goYWN0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFkZEl0ZW0oaXRlbSkge1xuICAgICAgICAoMCwgZXJyb3JfMS5hc3NlcnQpKHRoaXMubG9jYXRpb25PY2N1cGllZChpdGVtLngsIGl0ZW0ueSkgPT0gZmFsc2UpO1xuICAgICAgICBpZiAodGhpcy5pdGVtSWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gdGhpcy5pdGVtSWRzLnBvcCgpO1xuICAgICAgICAgICAgaXRlbS5pZCA9IGlkO1xuICAgICAgICAgICAgdGhpcy5pdGVtc1tpZF0gPSBpdGVtO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5pZCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIC0tLS0tLS0tLS0gUmVtb3ZlXG4gICAgcmVtb3ZlRW50aXR5KGVudGl0eSkge1xuICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eS5pZF0gPSBudWxsO1xuICAgICAgICB0aGlzLmVudGl0eUlkcy5wdXNoKGVudGl0eS5pZCk7XG4gICAgfVxuICAgIHJlbW92ZUFjdG9yKGFjdG9yKSB7XG4gICAgICAgIHRoaXMuYWN0b3JzW2FjdG9yLmlkXSA9IG51bGw7XG4gICAgICAgIHRoaXMuYWN0b3JJZHMucHVzaChhY3Rvci5pZCk7XG4gICAgfVxuICAgIHJlbW92ZUl0ZW0oaXRlbSkge1xuICAgICAgICB0aGlzLml0ZW1zW2l0ZW0uaWRdID0gbnVsbDtcbiAgICAgICAgdGhpcy5pdGVtSWRzLnB1c2goaXRlbS5pZCk7XG4gICAgfVxuICAgIC8vIC0tLS0tLS0tLS0gQXQgTG9jYXRpb25cbiAgICBlbnRpdHlBdExvY2F0aW9uKHgsIHkpIHtcbiAgICAgICAgZm9yICh2YXIgZW50aXR5IG9mIHRoaXMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIGlmIChlbnRpdHkgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVudGl0eS54ID09IHggJiYgZW50aXR5LnkgPT0geSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGFjdG9yQXRMb2NhdGlvbih4LCB5KSB7XG4gICAgICAgIGZvciAodmFyIGFjdG9yIG9mIHRoaXMuYWN0b3JzKSB7XG4gICAgICAgICAgICBpZiAoYWN0b3IgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFjdG9yLnggPT0geCAmJiBhY3Rvci55ID09IHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGl0ZW1BdExvY2F0aW9uKHgsIHkpIHtcbiAgICAgICAgZm9yICh2YXIgaXRlbSBvZiB0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICBpZiAoaXRlbSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXRlbS54ID09IHggJiYgaXRlbS55ID09IHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgbG9jYXRpb25PY2N1cGllZCh4LCB5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudGl0eUF0TG9jYXRpb24oeCwgeSkgIT0gbnVsbCB8fFxuICAgICAgICAgICAgdGhpcy5hY3RvckF0TG9jYXRpb24oeCwgeSkgIT0gbnVsbCB8fFxuICAgICAgICAgICAgdGhpcy5pdGVtQXRMb2NhdGlvbih4LCB5KSAhPSBudWxsO1xuICAgIH1cbiAgICBjb21wdXRlRk9WKHgsIHkpIHtcbiAgICAgICAgY29uc3QgU0lHSFRfUkFESVVTID0gMTA7XG4gICAgICAgIGNvbnN0IGZvdiA9IG5ldyBwcmVjaXNlX3NoYWRvd2Nhc3RpbmdfMS5kZWZhdWx0KCh4LCB5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5kZXgoeCwgeSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCB0aGlzLnRpbGVzLmxlbmd0aCAmJiBpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGlsZXNbaW5kZXhdLndhbGthYmxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy52aXNpYmxlLmZpbGwoZmFsc2UpO1xuICAgICAgICBmb3YuY29tcHV0ZSh4LCB5LCBTSUdIVF9SQURJVVMsICh4LCB5LCByLCB2aXNpYmlsaXR5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5kZXgoeCwgeSk7XG4gICAgICAgICAgICBpZiAodmlzaWJpbGl0eSA+IDAuMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwbG9yZWRbaW5kZXhdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2libGVbaW5kZXhdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZVtpbmRleF0gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJ1biBhY3RvcnMgaW4gdGhlIGdhbWUuXG4gICAgICogQHJldHVybnMgd2hldGhlciBhIHJlbmRlciBpcyByZXF1aXJlZFxuICAgICAqL1xuICAgIHJ1bkFjdG9ycygpIHtcbiAgICAgICAgbGV0IHNob3VsZFJlbmRlciA9IGZhbHNlO1xuICAgICAgICBmb3IgKDsgdGhpcy5hY3RvckluZGV4IDwgdGhpcy5hY3RvcnMubGVuZ3RoOyArK3RoaXMuYWN0b3JJbmRleCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWN0b3JzW3RoaXMuYWN0b3JJbmRleF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgW3JlcXVlc3RBbm90aGVyVHVybiwgcmVxdWlyZXNSZW5kZXJdID0gdGhpcy5hY3RvcnNbdGhpcy5hY3RvckluZGV4XS5hY3QodGhpcyk7XG4gICAgICAgICAgICBzaG91bGRSZW5kZXIgfHwgKHNob3VsZFJlbmRlciA9IHJlcXVpcmVzUmVuZGVyKTtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0QW5vdGhlclR1cm4pIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0cnVlLCB0aGVuIHRoZSBhY3QgaXMgdGVsbGluZyB1cyB0aGF0IHRoZSBiZWhhdmlvciB3YW50cyBhbm90aGVyIFxuICAgICAgICAgICAgICAgIC8vIHR1cm4gYW5kIHRoZSBsb29wIHNob3VsZCBlbmQgaGVyZSBiZWZvcmUgb3RoZXIgYWN0b3JzIGNhbiBhY3QuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNob3VsZFJlbmRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLnBsYXllcklzQWxpdmUoKSkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBwbGF5ZXIgaXMgZGVhZCwgZW5kIHRoZSBsb29wLlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWN0b3JJbmRleCA9IDA7XG4gICAgICAgIHJldHVybiBzaG91bGRSZW5kZXI7XG4gICAgfVxufVxuZXhwb3J0cy5HYW1lTWFwID0gR2FtZU1hcDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5JbnB1dE1hbmFnZXIgPSBleHBvcnRzLktleSA9IHZvaWQgMDtcbnZhciBLZXk7XG4oZnVuY3Rpb24gKEtleSkge1xuICAgIEtleVtLZXlbXCJMRUZUXCJdID0gMF0gPSBcIkxFRlRcIjtcbiAgICBLZXlbS2V5W1wiUklHSFRcIl0gPSAxXSA9IFwiUklHSFRcIjtcbiAgICBLZXlbS2V5W1wiRE9XTlwiXSA9IDJdID0gXCJET1dOXCI7XG4gICAgS2V5W0tleVtcIlVQXCJdID0gM10gPSBcIlVQXCI7XG4gICAgS2V5W0tleVtcIldcIl0gPSA0XSA9IFwiV1wiO1xuICAgIEtleVtLZXlbXCJBXCJdID0gNV0gPSBcIkFcIjtcbiAgICBLZXlbS2V5W1wiU1wiXSA9IDZdID0gXCJTXCI7XG4gICAgS2V5W0tleVtcIkRcIl0gPSA3XSA9IFwiRFwiO1xuICAgIEtleVtLZXlbXCJRXCJdID0gOF0gPSBcIlFcIjtcbiAgICBLZXlbS2V5W1wiUlwiXSA9IDldID0gXCJSXCI7XG4gICAgS2V5W0tleVtcIkdcIl0gPSAxMF0gPSBcIkdcIjtcbiAgICBLZXlbS2V5W1wiSFwiXSA9IDExXSA9IFwiSFwiO1xuICAgIEtleVtLZXlbXCJTUEFDRVwiXSA9IDEyXSA9IFwiU1BBQ0VcIjtcbiAgICBLZXlbS2V5W1wiRVNDQVBFXCJdID0gMTNdID0gXCJFU0NBUEVcIjtcbiAgICBLZXlbS2V5W1wiRU5URVJcIl0gPSAxNF0gPSBcIkVOVEVSXCI7XG4gICAgS2V5W0tleVtcIklOVkFMSURcIl0gPSAxNV0gPSBcIklOVkFMSURcIjtcbn0pKEtleSA9IGV4cG9ydHMuS2V5IHx8IChleHBvcnRzLktleSA9IHt9KSk7XG4vLyBzdGF0aWMgY2xhc3MgdG8gaGFuZGxlIGlucHV0XG5jbGFzcyBJbnB1dE1hbmFnZXIge1xuICAgIHN0YXRpYyBpbml0KCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKEtleSkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIElucHV0TWFuYWdlci5fa2V5cy5wdXNoKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgSW5wdXRNYW5hZ2VyLm9uS2V5RG93bik7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgSW5wdXRNYW5hZ2VyLm9uS2V5VXApO1xuICAgIH1cbiAgICBzdGF0aWMgaXNLZXlEb3duKC4uLmtleXMpIHtcbiAgICAgICAgZm9yIChsZXQgayBvZiBrZXlzKSB7XG4gICAgICAgICAgICBpZiAoSW5wdXRNYW5hZ2VyLl9rZXlzW2tdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzdGF0aWMga2V5U3RyVG9LZXkoa2V5KSB7XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICBjYXNlICdEb3duJzpcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5ET1dOO1xuICAgICAgICAgICAgY2FzZSAnVXAnOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5VUDtcbiAgICAgICAgICAgIGNhc2UgJ1JpZ2h0JzpcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuUklHSFQ7XG4gICAgICAgICAgICBjYXNlICdMZWZ0JzpcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5MRUZUO1xuICAgICAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5TUEFDRTtcbiAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5FU0NBUEU7XG4gICAgICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LkE7XG4gICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LlM7XG4gICAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LkQ7XG4gICAgICAgICAgICBjYXNlICd3JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5Llc7XG4gICAgICAgICAgICBjYXNlICdyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LlI7XG4gICAgICAgICAgICBjYXNlICdxJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LlE7XG4gICAgICAgICAgICBjYXNlICdnJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5Lkc7XG4gICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5Lkg7XG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5FTlRFUjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBVbmhhbmRsZWQga2V5OiAke2tleX0uYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5JTlZBTElEO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgY29uc3QgayA9IElucHV0TWFuYWdlci5rZXlTdHJUb0tleShldmVudC5rZXkpO1xuICAgICAgICBJbnB1dE1hbmFnZXIuX2tleXNba10gPSB0cnVlO1xuICAgICAgICBpZiAoayA9PSBLZXkuRE9XTiB8fCBrID09IEtleS5VUCB8fCBrID09IEtleS5MRUZUIHx8IGsgPT0gS2V5LlJJR0hUKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc3RhdGljIG9uS2V5VXAoZXZlbnQpIHtcbiAgICAgICAgSW5wdXRNYW5hZ2VyLl9rZXlzW0lucHV0TWFuYWdlci5rZXlTdHJUb0tleShldmVudC5rZXkpXSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHN0YXRpYyBjbGVhcigpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBJbnB1dE1hbmFnZXIuX2tleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIElucHV0TWFuYWdlci5fa2V5c1tpXSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5JbnB1dE1hbmFnZXIgPSBJbnB1dE1hbmFnZXI7XG5JbnB1dE1hbmFnZXIuX2tleXMgPSBbXTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CQVNFX1JPT00gPSB2b2lkIDA7XG5leHBvcnRzLkJBU0VfUk9PTSA9IFtcbiAgICBcIi0tLS0tLS0tLVwiLFxuICAgIFwiLS0tLS0tLS0tXCIsXG4gICAgXCItLS0tLS0tLS1cIixcbiAgICBcIi0tLS1BLS0tLVwiLFxuICAgIFwiLS0tLS0tLS0tXCIsXG4gICAgXCItLS0tLS0tLS1cIixcbiAgICBcIi0tLS0tLS0tLVwiLFxuXTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CYXNlTGluZUdlbmVyYXRvciA9IHZvaWQgMDtcbmNsYXNzIEJhc2VMaW5lR2VuZXJhdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfVxufVxuZXhwb3J0cy5CYXNlTGluZUdlbmVyYXRvciA9IEJhc2VMaW5lR2VuZXJhdG9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnN0cmFpZ2h0TGluZUNvbm5lY3Rpb24gPSBleHBvcnRzLmJyZXNlbmhhbSA9IHZvaWQgMDtcbmNvbnN0IHJvdF9qc18xID0gcmVxdWlyZShcInJvdC1qc1wiKTtcbi8vIEJhc2VkIG9uOiBodHRwOi8vd3d3LnJvZ3VlYmFzaW4uY29tL2luZGV4LnBocC9CcmVzZW5oYW0lMjdzX0xpbmVfQWxnb3JpdGhtXG5mdW5jdGlvbiBicmVzZW5oYW0oeDEsIHkxLCB4MiwgeTIsIGNhbGxiYWNrKSB7XG4gICAgbGV0IHRlbXA7XG4gICAgbGV0IGR4ID0geDIgLSB4MTtcbiAgICBsZXQgZHkgPSB5MiAtIHkxO1xuICAgIC8vIHJvdGF0ZSBpZiB0aGUgbGluZSBpcyBtb3JlIHkgdGhhbiB4IChzdGVlcClcbiAgICBjb25zdCBpc1N0ZWVwID0gTWF0aC5hYnMoZHkpID4gTWF0aC5hYnMoZHgpO1xuICAgIGlmIChpc1N0ZWVwKSB7XG4gICAgICAgIHRlbXAgPSB4MTtcbiAgICAgICAgeDEgPSB5MTtcbiAgICAgICAgeTEgPSB0ZW1wO1xuICAgICAgICB0ZW1wID0geDI7XG4gICAgICAgIHgyID0geTI7XG4gICAgICAgIHkyID0gdGVtcDtcbiAgICB9XG4gICAgLy8gcmVhcnJhbmdlIHNvIHgxIDwgeDIgYnkgc3dhcHBpbmcgcG9pbnRzXG4gICAgbGV0IHN3YXBwZWQgPSB4MSA+IHgyO1xuICAgIGlmIChzd2FwcGVkKSB7XG4gICAgICAgIHRlbXAgPSB4MTtcbiAgICAgICAgeDEgPSB4MjtcbiAgICAgICAgeDIgPSB0ZW1wO1xuICAgICAgICB0ZW1wID0geTE7XG4gICAgICAgIHkxID0geTI7XG4gICAgICAgIHkyID0gdGVtcDtcbiAgICB9XG4gICAgLy8gcmVjYWxjdWxhdGUgdGhlIGRpZmZlcmVuY2VzXG4gICAgZHkgPSB5MiAtIHkxO1xuICAgIGR4ID0geDIgLSB4MTtcbiAgICAvLyBjYWxjdWxhdGUgdGhlIGVycm9yXG4gICAgbGV0IGVycm9yID0gTWF0aC5yb3VuZChkeCAvIDIuMCk7XG4gICAgY29uc3QgeVN0ZXAgPSB5MSA8IHkyID8gMSA6IC0xO1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBib3VuZGluZyBib3ggZ2VuZXJhdGluZyBwb2ludHMgYmV0d2VlbiBzdGFydCBhbmQgZW5kXG4gICAgLy8gYW5kIHVzZSBjYWxsYmFjayB0byBwYXNzIHRoZSBsaW5lLiBOT1RFOiB0aGlzIGRvZXNuJ3Qgd29yayBjb3JyZWN0bHlcbiAgICAvLyBpZiB0aGUgb3JkZXIgbWF0dGVycyBiZWNhdXNlIGBzd2FwcGVkYCBpbmRpY2F0ZXMgdGhhdCB0aGUgb3JkZXIgXG4gICAgLy8gc2hvdWxkIGJlIHJldmVyc2VkIGZvciB0aGUgY29ycmVjdCBvcmRlcmluZyBiZXR3ZWVuIHRoZSBwb2ludHMuXG4gICAgbGV0IHkgPSB5MTtcbiAgICBmb3IgKGxldCB4ID0geDE7IHggPCB4MjsgKyt4KSB7XG4gICAgICAgIGlmIChpc1N0ZWVwKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh5LCB4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIGVycm9yIC09IE1hdGguYWJzKGR5KTtcbiAgICAgICAgaWYgKGVycm9yIDwgMCkge1xuICAgICAgICAgICAgeSArPSB5U3RlcDtcbiAgICAgICAgICAgIGVycm9yICs9IGR4O1xuICAgICAgICAgICAgaWYgKGlzU3RlZXApIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh5LCB4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHgsIHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5icmVzZW5oYW0gPSBicmVzZW5oYW07XG5mdW5jdGlvbiBzdHJhaWdodExpbmVDb25uZWN0aW9uKHgxLCB5MSwgeDIsIHkyLCBjYWxsYmFjaykge1xuICAgIGlmIChyb3RfanNfMS5STkcuZ2V0VW5pZm9ybSgpID49IDAuNSkge1xuICAgICAgICBjb25zdCB4SW5jcmVtZW50ID0geDEgPCB4MiA/IDEgOiAtMTtcbiAgICAgICAgd2hpbGUgKHgxICE9IHgyKSB7XG4gICAgICAgICAgICB4MSArPSB4SW5jcmVtZW50O1xuICAgICAgICAgICAgY2FsbGJhY2soeDEsIHkxKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB5SW5jcmVtZW50ID0geTEgPCB5MiA/IDEgOiAtMTtcbiAgICAgICAgd2hpbGUgKHkxICE9IHkyKSB7XG4gICAgICAgICAgICB5MSArPSB5SW5jcmVtZW50O1xuICAgICAgICAgICAgY2FsbGJhY2soeDEsIHkxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgeUluY3JlbWVudCA9IHkxIDwgeTIgPyAxIDogLTE7XG4gICAgICAgIHdoaWxlICh5MSAhPSB5Mikge1xuICAgICAgICAgICAgeTEgKz0geUluY3JlbWVudDtcbiAgICAgICAgICAgIGNhbGxiYWNrKHgxLCB5MSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeEluY3JlbWVudCA9IHgxIDwgeDIgPyAxIDogLTE7XG4gICAgICAgIHdoaWxlICh4MSAhPSB4Mikge1xuICAgICAgICAgICAgeDEgKz0geEluY3JlbWVudDtcbiAgICAgICAgICAgIGNhbGxiYWNrKHgxLCB5MSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnN0cmFpZ2h0TGluZUNvbm5lY3Rpb24gPSBzdHJhaWdodExpbmVDb25uZWN0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkxFVkVMUyA9IHZvaWQgMDtcbmV4cG9ydHMuTEVWRUxTID0geyBcIjhfMF8wXCI6IFtcIi0tLS0tLS0tLV5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tXi0tLVwiLCBcIi0tLS0tLS0tLS0tXi0tLVwiLCBcIi0tLS0tLS0tLS0tXi0tLVwiLCBcIi0tLS0tLS0tLS0tXi0tXlwiLCBcIi0tLSMtLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tJi0tXlwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS0tLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSotLS0tLS0tLVwiLCBcIiotLS0tLS0tLV5eXl5eXlwiXSwgXCI4XzBfMVwiOiBbXCItLS0tLS0tLS1eXl5eXl5cIiwgXCItLS0tLS0tLS0tLV4tLS1cIiwgXCItLS0tLS0tLS0tLV4tLS1cIiwgXCItLS0tLS0tLS0tLV4tLS1cIiwgXCItLS0tLS0tLS0tLV4tLV5cIiwgXCItLS0jLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLSYtLV5cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tLS1cIiwgXCJcXFxcLy8tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0qLS0tLS0tLS1cIiwgXCIqLS0tLS0tLS1eXl5eXl5cIl0sIFwiOF8xXzBcIjogW1wiLS0tLS0tLS0tLV5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tWC0tXCIsIFwiLS0tLS0tLS0tLS0tWC0tXCIsIFwiLS0tLS0tLS0tLS0tWC0tXCIsIFwiLS0tLS0tLS0tLS0tWC0tXCIsIFwiLS0tIy0tLS0tLS0tWC0jXCIsIFwiLS0tLS0tLS0tLS0tWC0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tWC0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tWC0tXCIsIFwiLS0tLS0tKi0tLS0tLS0tXCIsIFwiKi0tLS0tLS0tLV5eXl5eXCJdLCBcIjhfMV8xXCI6IFtcIi0tLS0tLS0tLS1eXl5eXlwiLCBcIi0tLS0tLS0tLS0tLVgtLVwiLCBcIi0tLS0tLS0tLS0tLVgtLVwiLCBcIi0tLS0tLS0tLS0tLVgtLVwiLCBcIi0tLS0tLS0tLS0tLVgtLVwiLCBcIi0tLSMtLS0tLS0tLVgtI1wiLCBcIi0tLS0tLS0tLS0tLVgtLVwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLVgtLVwiLCBcIlxcXFwvLy0tLS0tLS0tLVgtLVwiLCBcIi0tLS0tLSotLS0tLS0tLVwiLCBcIiotLS0tLS0tLS1eXl5eXlwiXSwgXCI4XzFfMlwiOiBbXCItLS0tLV5eXl5eXl5eXl5cIiwgXCItLS0tLV5eXi0tLS0tXi1cIiwgXCItLS0tLS0tLS0tLS0tXi1cIiwgXCJYLS0tLV5eXi0tLS0tXi1cIiwgXCJYLS0tLV5eXi0tLS0tXi1cIiwgXCJYLS0tLV5eXi0tLS0tLS1cIiwgXCJYLS0tLV5eXi0tLS0tJi1cIiwgXCJYLS0tLV5eXi0tLS0tLS1cIiwgXCJYLS0tLS0tLS0tLS0tLS1cIiwgXCJYLS0tLV5eXi0tWC0tLS1cIiwgXCJYLS0tLV5eXl5eXl5eXl5cIl0sIFwiOV8wXzBcIjogW1wiLS0tLS0tLV5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLSotXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tXl5eXCIsIFwiLS0tLS0tLS0tLV5eXl5eXCIsIFwiLS0tIy0tLS0tLS0tLSYtXCIsIFwiLS0tLS0tLS0tLV5eXl5eXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tXl5eXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLSotXCIsIFwiKi0tLS0tLV5eXl5eXl5eXCJdLCBcIjlfMF8xXCI6IFtcIi0tLS0tLS1eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tLS0qLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLV5eXlwiLCBcIi0tLS0tLS0tLS1eXl5eXlwiLCBcIi0tLSMtLS0tLS0tLS0mLVwiLCBcIi0tLS0tLS0tLS1eXl5eXlwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLV5eXlwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0qLVwiLCBcIiotLS0tLS1eXl5eXl5eXlwiXSwgXCI5XzBfMlwiOiBbXCJeXl5eXl5eLV4tXi1eLS1cIiwgXCItWC0tXi0tLV4tXi1eLS1cIiwgXCItWC0tXi0tLS0tXi1eLS1cIiwgXCItWC0tXi0tLS0tLS1eLS1cIiwgXCItWC0tXi0tLS0tLS0tLS1cIiwgXCItWC0tLS0tLS0tLS0tLS1cIiwgXCItWC0tJi0tLS0tLS0tLS1cIiwgXCItWC0tLS0tLS0tLS1eLS1cIiwgXCItWC0tLS0tLS0tXi1eLS1cIiwgXCItIy0tLS0tLV4tXi1eLS1cIiwgXCJeXl5eXl5eLV4tXi1eLS1cIl0sIFwiN18wXzBcIjogW1wiLS0tLS0tLS0tLV5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tXi0tXCIsIFwiLS0tLS0tLS0tLS0tXi0tXCIsIFwiLS0tLS0tLS0tLS0tXi0tXCIsIFwiLS0tLS0tLS0tLS0tXi0tXCIsIFwiLS0tIy0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tJi0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tKi0tLS0tLS0tXCIsIFwiKi0tLS0tLS0tLV5eXl5eXCJdLCBcIjdfMF8xXCI6IFtcIi0tLS0tLS0tLS1eXl5eXlwiLCBcIi0tLS0tLS0tLS0tLV4tLVwiLCBcIi0tLS0tLS0tLS0tLV4tLVwiLCBcIi0tLS0tLS0tLS0tLV4tLVwiLCBcIi0tLS0tLS0tLS0tLV4tLVwiLCBcIi0tLSMtLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLSYtLVwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS0tLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSotLS0tLS0tLVwiLCBcIiotLS0tLS0tLS1eXl5eXlwiXSwgXCI3XzBfMlwiOiBbXCJYLS0tXl5eLS1eXl4tLS1cIiwgXCItLS0tXl5eLS1eXl4tLS1cIiwgXCJYLS0tXl5eLS1eXl4tLS1cIiwgXCJYLS0tXl5eLS1eXl4tLS1cIiwgXCJYLS0tLSYtLS0tJi0tLS1cIiwgXCIqLS0tXl5eLS0tLS0tLS1cIiwgXCJYLS0tLSotLS1eXl4tLS1cIiwgXCJYLS0tXl5eLS1eXl4tLS1cIiwgXCJYLS0tXl5eLS1eXl4tLS1cIiwgXCItLS0tXl5eLS1eXl4tLS1cIiwgXCJYLS0tXl5eLS1eXl4tLS1cIl0sIFwiMF8wXzBcIjogW1wiLS0tLS0tLS0tLS0tLS0tXCIsIFwiXFxcXFxcXFwtLS0tLS0tLS0tLS0tXCIsIFwiLy8tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLSMtLSYtLSYtLSYtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiJi0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCJdLCBcIjBfMF8xXCI6IFtcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlxcXFxcXFxcLS0tLS0tLS0tLS0tLVwiLCBcIi8vLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0jLS0mLS0mLS0mLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiYtLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiXSwgXCIwXzBfMlwiOiBbXCJYLS0tLS0tLS0tLS0tLS1cIiwgXCJYLS0tLS0tLS0tLS0tLS1cIiwgXCJYLS0tLS0tLS0tLS0tLS1cIiwgXCJYLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLSYtLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYLS0tLS0tLS0tLS0tLS1cIiwgXCJYLS0tLS0tLS0tLS0tLS1cIiwgXCJYLS0tLS0qLS0tLS0tLS1cIiwgXCJYLS0tLS0tLS0tLS0tLS1cIl0sIFwiMF8xXzBcIjogW1wiLS0tLS0tLS0tLVgtLS0tXCIsIFwiXFxcXFxcXFwtLS0tLS0tLVgtLS0tXCIsIFwiLy8tLS0tLS0tLVgtLS0tXCIsIFwiLS0tLS0tLS0tLVgtLS0tXCIsIFwiLS0tLS0tLS0tLVgtLS0tXCIsIFwiLS0tLSMtLSYtLVgtLSYtXCIsIFwiLS0tLS0tLS0tLVgtLS0tXCIsIFwiLS0tLS0tLS0tLVgtLS0tXCIsIFwiJi0tLS0tLS0tLVgtLS0tXCIsIFwiLS0tLS0tLS0tLVgtLS0tXCIsIFwiLS0tLS0tLS0tLSYtLS0tXCJdLCBcIjBfMV8xXCI6IFtcIi0tLS0tLS0tLS1YLS0tLVwiLCBcIlxcXFxcXFxcLS0tLS0tLS1YLS0tLVwiLCBcIi8vLS0tLS0tLS1YLS0tLVwiLCBcIi0tLS0tLS0tLS1YLS0tLVwiLCBcIi0tLS0tLS0tLS1YLS0tLVwiLCBcIi0tLS0jLS0mLS1YLS0mLVwiLCBcIi0tLS0tLS0tLS1YLS0tLVwiLCBcIi0tLS0tLS0tLS1YLS0tLVwiLCBcIiYtLS0tLS0tLS1YLS0tLVwiLCBcIi0tLS0tLS0tLS1YLS0tLVwiLCBcIi0tLS0tLS0tLS0mLS0tLVwiXSwgXCIwXzFfMlwiOiBbXCJYWFgtLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYLS0tLS0tLS0tLS0tLS1cIiwgXCJYLS0tLS0tLS0tLS0tLS1cIiwgXCJYLS0tLS0tLS0tLSYtLS1cIiwgXCJYLS0tLS0tLS0tLS0tLS1cIiwgXCJYLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0qLS0tLS0tLS1cIiwgXCJYWFgtLS0tLS0tLS0tLS1cIl0sIFwiMV8wXzBcIjogW1wiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tIy0tJi0tJi0tJi0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tLS0tLS0tLS0tXCJdLCBcIjFfMF8xXCI6IFtcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSMtLSYtLSYtLSYtLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS0tLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiotLS0tLS0tLS0tLS0tLVwiXSwgXCIxXzBfMlwiOiBbXCJeLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0vL1xcXFxcXFxcLS0tLS1cIiwgXCItLS0tLS1cXFxcXFxcXC8vLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tJi0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLSYtLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0qLS1cIiwgXCJeLS0tLS0tLS0tLS0tLS1cIl0sIFwiN18zXzBcIjogW1wiLS0tLS0tLS1YLS1eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLVgtXCIsIFwiLS0tLS0tLS1YLS0tLVgtXCIsIFwiLS0tLS0tLVhYLS0tLVgtXCIsIFwiLS0tLS0tWFhYLS0tLVgtXCIsIFwiLS0tIy0tWCMmLS0tLVgtXCIsIFwiLS0tLS0tWFhYLS0tLVgtXCIsIFwiL1xcXFxcXFxcLS0tLVhYLS0tLVgtXCIsIFwiXFxcXC8vLS0tLS1YLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLSMtXCIsIFwiKi0tLS0tLS1YLS1eXl5eXCJdLCBcIjdfM18xXCI6IFtcIi0tLS0tLS0tWC0tXl5eXlwiLCBcIi0tLS0tLS0tLS0tLS1YLVwiLCBcIi0tLS0tLS0tWC0tLS1YLVwiLCBcIi0tLS0tLS1YWC0tLS1YLVwiLCBcIi0tLS0tLVhYWC0tLS1YLVwiLCBcIi0tLSMtLVgjJi0tLS1YLVwiLCBcIi0tLS0tLVhYWC0tLS1YLVwiLCBcIi9cXFxcXFxcXC0tLS1YWC0tLS1YLVwiLCBcIlxcXFwvLy0tLS0tWC0tLS1YLVwiLCBcIi0tLS0tLS0tLS0tLS0jLVwiLCBcIiotLS0tLS0tWC0tXl5eXlwiXSwgXCI3XzNfMlwiOiBbXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tXl5eXi1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLy9cIiwgXCItLS0tLS0tLS0tLS0tXFxcXFxcXFxcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tWC0tLS0tXl5eXi1cIiwgXCItLS0tWC0tXl5eXl5eXl5cIiwgXCItLVhYWFhYWFhYWFhYWFhcIl0sIFwiN180XzBcIjogW1wiLS0tLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tLSotLS0tLSotXCIsIFwiLS0tIy0tXl5eLS0tLS0tXCIsIFwiLS0tLS0tLSYtLS0tLS0jXCIsIFwiL1xcXFxcXFxcLS0tXl5eLS1YWFhYXCIsIFwiXFxcXC8vLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tXl5eLS1YWFhYXCIsIFwiKi0tLS0tXl5eLS1YWFhYXCJdLCBcIjdfNF8xXCI6IFtcIi0tLS0tLV5eXi0tWFhYWFwiLCBcIi0tLS0tLV5eXi0tWFhYWFwiLCBcIi0tLS0tLV5eXi0tWFhYWFwiLCBcIi0tLS0tLV5eXi0tWFhYWFwiLCBcIi0tLS0tLS0qLS0tLS0qLVwiLCBcIi0tLSMtLV5eXi0tLS0tLVwiLCBcIi0tLS0tLS0mLS0tLS0tI1wiLCBcIi9cXFxcXFxcXC0tLV5eXi0tWFhYWFwiLCBcIlxcXFwvLy0tLV5eXi0tWFhYWFwiLCBcIi0tLS0tLV5eXi0tWFhYWFwiLCBcIiotLS0tLV5eXi0tWFhYWFwiXSwgXCI3XzRfMlwiOiBbXCItLS1YLS0tLS0tLS0tLS1cIiwgXCItLS1YLS0tLS0tLS0tLS1cIiwgXCItLS1YLS0tXi0tLS0tXi1cIiwgXCItLS1YLS0tXi0tLS0tXi1cIiwgXCItLS0tLS0tXi0tLS0tXi1cIiwgXCItLS0tLS0tXi0tLS0tXi1cIiwgXCItLS0jLSMtIy0jLSMtIy1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIvXFxcXFxcXFxYWFhYWFhYWFhYWFhcIiwgXCJcXFxcLy9YWFhYWFhYWFhYWFhcIl0sIFwiN18yXzBcIjogW1wiLS0tLS0tIy0tLV5eXl5eXCIsIFwiLS0tLS0tWFgtLS0tXi0tXCIsIFwiLS0tLS0tWFgtLS0tXi0tXCIsIFwiLS0tLS0tWFgtLS0tXi0tXCIsIFwiLS0tLS0tWFgtLS0tXi0tXCIsIFwiLS0tIy0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tWFgtLS0tJi0tXCIsIFwiL1xcXFxcXFxcLS0tWFgtLS0tLS0tXCIsIFwiXFxcXC8vLS0tWFgtLS0tLS0tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiKi0tLS0tIy0tLV5eXl5eXCJdLCBcIjdfMl8xXCI6IFtcIi0tLS0tLSMtLS1eXl5eXlwiLCBcIi0tLS0tLVhYLS0tLV4tLVwiLCBcIi0tLS0tLVhYLS0tLV4tLVwiLCBcIi0tLS0tLVhYLS0tLV4tLVwiLCBcIi0tLS0tLVhYLS0tLV4tLVwiLCBcIi0tLSMtLS0tLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLSYtLVwiLCBcIi9cXFxcXFxcXC0tLVhYLS0tLS0tLVwiLCBcIlxcXFwvLy0tLVhYLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIiotLS0tLSMtLS1eXl5eXlwiXSwgXCI4XzNfMFwiOiBbXCItLS0tLS0tLVgtLV5eXl5cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLVgtLS0tWC1cIiwgXCItLS0tLS0tWFgtLS0tWFhcIiwgXCItLS0tLS1YWFgtLS0tWFhcIiwgXCItLS0jLS1YIyYtLS0tKiNcIiwgXCItLS0tLS1YWFgtLS0tWFhcIiwgXCIvXFxcXFxcXFwtLS0tWFgtLS0tWFhcIiwgXCJcXFxcLy8tLS0tLVgtLS0tWC1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIqLS0tLS0tLVgtLV5eXl5cIl0sIFwiOF8zXzFcIjogW1wiLS0tLS0tLS1YLS1eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS1YLS0tLVgtXCIsIFwiLS0tLS0tLVhYLS0tLVhYXCIsIFwiLS0tLS0tWFhYLS0tLVhYXCIsIFwiLS0tIy0tWCMmLS0tLSojXCIsIFwiLS0tLS0tWFhYLS0tLVhYXCIsIFwiL1xcXFxcXFxcLS0tLVhYLS0tLVhYXCIsIFwiXFxcXC8vLS0tLS1YLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tLS1YLS1eXl5eXCJdLCBcIjhfM18yXCI6IFtcIi0tLS0tLS0tLS0tXl5eXlwiLCBcIi0tLS0tLS0tLS0tXl5eXlwiLCBcIl4tLV4tLS0tLS0tLS0tLVwiLCBcIl4tLV4tLS1YWC0tLS0tLVwiLCBcIl4tLV4tLS1YWC0tXl5eXlwiLCBcIl4tLV4tLS1YWC0tXl5eXlwiLCBcIiMtIy0jLS1YWC0tXl5eXlwiLCBcIi0tLS0tLS1YWC0tXl5eXlwiLCBcIi0tLS0tLS1YWC0tXl5eXlwiLCBcIlhYWFhYWFhYWC0tXl5eXlwiLCBcIlhYWFhYWFhYWC0tXl5eXlwiXSwgXCI2XzNfMFwiOiBbXCItLS0tLS0tLS1YLS1eXl5cIiwgXCItLS0tLS0tLS0tLS0tLVhcIiwgXCItLS0tLS0tLS1YLS0tLVhcIiwgXCItLS0tLS0tLVhYLS0tLVhcIiwgXCItLS0tLS0tWFhYLS0tLVhcIiwgXCItLS0jLS0tWCMmLS0tLVhcIiwgXCItLS0tLS0tWFhYLS0tLVhcIiwgXCIvXFxcXFxcXFwtLS0tLVhYLS0tLVhcIiwgXCJcXFxcLy8tLS0tLS1YLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLSNcIiwgXCIqLS0tLS0tLS1YLS1eXl5cIl0sIFwiNl8zXzFcIjogW1wiLS0tLS0tLS0tWC0tXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tWC0tLS1YXCIsIFwiLS0tLS0tLS1YWC0tLS1YXCIsIFwiLS0tLS0tLVhYWC0tLS1YXCIsIFwiLS0tIy0tLVgjJi0tLS1YXCIsIFwiLS0tLS0tLVhYWC0tLS1YXCIsIFwiL1xcXFxcXFxcLS0tLS1YWC0tLS1YXCIsIFwiXFxcXC8vLS0tLS0tWC0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0jXCIsIFwiKi0tLS0tLS0tWC0tXl5eXCJdLCBcIjZfM18yXCI6IFtcIi0tLS0jLS0tWC0tXl5eXlwiLCBcIl5eLS1YWC0tWC0tXl5eXlwiLCBcIl5eLS1YWC0tWC0tXl5eXlwiLCBcIl5eLS1YWC0tWC0tLS0tLVwiLCBcIl5eLS1YWC0tWC0tXl5eXlwiLCBcIl5eLS0tLS0tWC0tXl5eXlwiLCBcIl5eLS1YWC0tWC0tXl5eXlwiLCBcIl5eLS1YWC0tWC0tLS0tLVwiLCBcIl5eLS1YWC0tWC0tXl5eXlwiLCBcIl5eLS1YWC0tWC0tXl5eXlwiLCBcIi0tLS0jLS0tJi0tXl5eXlwiXSwgXCIxNF8xXzBcIjogW1wiLS0tXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS0qXCIsIFwiLS0tLS0tLS1YLS0tLS0tXCIsIFwiLS0tLS0tLVhYLS0tLV5eXCIsIFwiLS0tLS0tWFhYLS1eXl5eXCIsIFwiIy0tLS0tWCMqLS0tLS0mXCIsIFwiLS0tLS0tWFhYLS1eXl5eXCIsIFwiLS0tLS0tLVhYLS0tLV5eXCIsIFwiLS0tLS0tLS1YLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0qXCIsIFwiLS0tXl5eXl5eXl5eXl5eXCJdLCBcIjE0XzFfMVwiOiBbXCItLS1eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tLS0tLSpcIiwgXCItLS0tLS0tLVgtLS0tLS1cIiwgXCItLS0tLS0tWFgtLS0tXl5cIiwgXCItLS0tLS1YWFgtLV5eXl5cIiwgXCIjLS0tLS1YIyotLS0tLSZcIiwgXCItLS0tLS1YWFgtLV5eXl5cIiwgXCItLS0tLS0tWFgtLS0tXl5cIiwgXCItLS0tLS0tLVgtLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLSpcIiwgXCItLS1eXl5eXl5eXl5eXl5cIl0sIFwiMTRfMl8wXCI6IFtcIi0tLV5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLV4tLS0tLS0tLVwiLCBcIi0tLS0tLV4tLS0tWC0tWFwiLCBcIi0tLS0tLV4tLS1YWC0tWFwiLCBcIi0tLS0tLV4tLVhYWC0tWFwiLCBcIiMtLS0tLS0tLVgjKi0tKlwiLCBcIi0tLS0tLSYtLVhYWC0tWFwiLCBcIi0tLS0tLS0tLS1YWC0tWFwiLCBcIi0tLS0tLS0tLS0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLV5eXl5eXl5eXl5eXlwiXSwgXCIxNF8yXzFcIjogW1wiLS0tXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tXi0tLS0tLS0tXCIsIFwiLS0tLS0tXi0tLS1YLS1YXCIsIFwiLS0tLS0tXi0tLVhYLS1YXCIsIFwiLS0tLS0tXi0tWFhYLS1YXCIsIFwiIy0tLS0tLS0tWCMqLS0qXCIsIFwiLS0tLS0tJi0tWFhYLS1YXCIsIFwiLS0tLS0tLS0tLVhYLS1YXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tXl5eXl5eXl5eXl5eXCJdLCBcIjE0XzBfMFwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCImLS0tLS1eLS1eLS1YLS1cIiwgXCItLS0tLS1eLS1eLS1YLS1cIiwgXCJeXi0tLS1eLS1eLS1YLS1cIiwgXCJeXl5eLS1eLS1eLS1YLS1cIiwgXCItLS0tLS0tLS0tLS1YLS1cIiwgXCJeXl5eLS0mLS0mLS1YLS1cIiwgXCJeXi0tLS0tLS0tLS1YLS1cIiwgXCItLS0tLS0tLS0tLS1YLS1cIiwgXCImLS0tLS0tLS0tLS0jLS1cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTRfMF8xXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIiYtLS0tLV4tLV4tLVgtLVwiLCBcIi0tLS0tLV4tLV4tLVgtLVwiLCBcIl5eLS0tLV4tLV4tLVgtLVwiLCBcIl5eXl4tLV4tLV4tLVgtLVwiLCBcIi0tLS0tLS0tLS0tLVgtLVwiLCBcIl5eXl4tLSYtLSYtLVgtLVwiLCBcIl5eLS0tLS0tLS0tLVgtLVwiLCBcIi0tLS0tLS0tLS0tLVgtLVwiLCBcIiYtLS0tLS0tLS0tLSMtLVwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxNF8wXzJcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS1eXi0tLV5eXi0tXCIsIFwiLS0tLS0tLS0tLV5eXi0tXCIsIFwiLS1YLS1eXi0tLS0mLS0tXCIsIFwiKi1YLS1eXi0tLV5eXi0tXCIsIFwiWFhYLS1eXi0tLV5eXi0tXCIsIFwiKi1YLS1eXi0tLV5eXi0tXCIsIFwiLS1YLS1eXi0tLS0mLS0tXCIsIFwiLS0tLS0tLS0tLV5eXi0tXCIsIFwiLS0tLS1eXi0tLV5eXi0tXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjE1XzFfMFwiOiBbXCItXl5eXl5eXl5eXl5eXl5cIiwgXCItXl4tLS0tLS0tLS0tKi1cIiwgXCItXl4tLS0tWC0tLS0tLS1cIiwgXCItXl4tLS1YWC0tLS1eXl5cIiwgXCItLS0tLVhYWC0tXl5eXl5cIiwgXCItXl4tLVgjKi0tLS0tJi1cIiwgXCItLS0tLVhYWC0tXl5eXl5cIiwgXCItXl4tLS1YWC0tLS1eXl5cIiwgXCItXl4tLS0tWC0tLS0tLS1cIiwgXCItXl4tLS0tLS0tLS0tKi1cIiwgXCItXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTVfMV8xXCI6IFtcIi1eXl5eXl5eXl5eXl5eXlwiLCBcIi1eXi0tLS0tLS0tLS0qLVwiLCBcIi1eXi0tLS1YLS0tLS0tLVwiLCBcIi1eXi0tLVhYLS0tLV5eXlwiLCBcIi0tLS0tWFhYLS1eXl5eXlwiLCBcIi1eXi0tWCMqLS0tLS0mLVwiLCBcIi0tLS0tWFhYLS1eXl5eXlwiLCBcIi1eXi0tLVhYLS0tLV5eXlwiLCBcIi1eXi0tLS1YLS0tLS0tLVwiLCBcIi1eXi0tLS0tLS0tLS0qLVwiLCBcIi1eXl5eXl5eXl5eXl5eXlwiXSwgXCIxNV8xXzJcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiI1gtLS0tLS0tLVgtLS0mXCIsIFwiWFgtLS0tLS0tLVgtLV5eXCIsIFwiWC0tLS0tLS0tLVgtLV5eXCIsIFwiLS0tLS0tLS0tLVgtLV5eXCIsIFwiLS0tLS0tLS0tLVgtLV5eXCIsIFwiLS0tLS0tLVgtLVgtLV5eXCIsIFwiLS0tLS0tLVgtLVgtLV5eXCIsIFwiLS0tLS0tLVgtLVgtLV5eXCIsIFwiLS0tLS0tLVgtLSMtLS0mXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjEzXzFfMFwiOiBbXCItLS0tXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tLS0tLSpcIiwgXCItLS0tLS0tLVgtLS0tLS1cIiwgXCItLS0tLS0tWFgtLS0tXl5cIiwgXCItLS0tLS1YWFgtLV5eXl5cIiwgXCIjLS0tLS1YIyotLS0tLSZcIiwgXCItLS0tLS1YWFgtLV5eXl5cIiwgXCItLS0tLS0tWFgtLS0tXl5cIiwgXCItLS0tLS0tLVgtLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLSpcIiwgXCItLS0tXl5eXl5eXl5eXl5cIl0sIFwiMTNfMV8xXCI6IFtcIi0tLS1eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tLS0tKlwiLCBcIi0tLS0tLS0tWC0tLS0tLVwiLCBcIi0tLS0tLS1YWC0tLS1eXlwiLCBcIi0tLS0tLVhYWC0tXl5eXlwiLCBcIiMtLS0tLVgjKi0tLS0tJlwiLCBcIi0tLS0tLVhYWC0tXl5eXlwiLCBcIi0tLS0tLS1YWC0tLS1eXlwiLCBcIi0tLS0tLS0tWC0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tKlwiLCBcIi0tLS1eXl5eXl5eXl5eXlwiXSwgXCIxM18xXzJcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tWC0tLS0mLS0tLS0tXCIsIFwiXi0tLS0tLS1YLS0tLS0tXCIsIFwiXi0tLS0tLS1YLS0tLS0tXCIsIFwiXi0tLS0tLS1YLS1eXl5eXCIsIFwiXi0tLS0tLS1YLS0tLS0tXCIsIFwiXi0tLS0tLS1YLS1eXl5eXCIsIFwiXi0tLS0tLS1YLS0tLS0tXCIsIFwiXi0tLS0tLS1YLS0tLS0tXCIsIFwiLS0tLS0tLS1YLS0tLS0tXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjRfM18wXCI6IFtcIi0tLS0tLSMtLS1YLS1eXlwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi0tLSMtLS0tLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIi9cXFxcXFxcXC0tLVhYLS1YLS0tLVwiLCBcIlxcXFwvLy0tLVhYLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS0tLVwiLCBcIiotLS0tLSMtLS0mLS1eXlwiXSwgXCI0XzNfMVwiOiBbXCItLS0tLS0jLS0tWC0tXl5cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCItLS0jLS0tLS0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCIvXFxcXFxcXFwtLS1YWC0tWC0tLS1cIiwgXCJcXFxcLy8tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCIqLS0tLS0jLS0tJi0tXl5cIl0sIFwiNF8zXzJcIjogW1wiXl4tLS0tWC0tLS1YLS1eXCIsIFwiLS0tLS0tLS0tLS0tLS1eXCIsIFwiLS0tLS0tWC0tLS1YLS1eXCIsIFwiLS0tLS1YWC0tLVhYLS0tXCIsIFwiLS0tLVhYWC0tWFhYLS1eXCIsIFwiLS0tLVgjJi0tWCMmLS1eXCIsIFwiLS0tLVhYWC0tWFhYLS1eXCIsIFwiLS0tLS1YWC0tLVhYLS0tXCIsIFwiLS0tLS0tWC0tLS1YLS1eXCIsIFwiLS0tLS0tLS0tLS0tLS1eXCIsIFwiXl4tLS0tWC0tLS1YLS1eXCJdLCBcIjRfNF8wXCI6IFtcIi0tLS0tLS0tLVhYWF5eXlwiLCBcIi0tLS0tLS0tLS0tLV5eXlwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLVhYWC0tLVwiLCBcIi0tLS0tLS0tLVhYWF5eXlwiLCBcIi0tLSMtLSYtLVhYWF5eXlwiLCBcIi0tLS0tLS0tLVhYWF5eXlwiLCBcIi9cXFxcXFxcXC0tLS0tLVhYWF5eXlwiLCBcIlxcXFwvLy0tLS0tLVhYWF5eXlwiLCBcIi0tLS0tLS0tLVhYWF5eXlwiLCBcIiotLS0tLS0tLVhYWF5eXlwiXSwgXCI0XzRfMVwiOiBbXCItLS0tLS0tLS1YWFheXl5cIiwgXCItLS0tLS0tLS0tLS1eXl5cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS1YWFgtLS1cIiwgXCItLS0tLS0tLS1YWFheXl5cIiwgXCItLS0jLS0mLS1YWFheXl5cIiwgXCItLS0tLS0tLS1YWFheXl5cIiwgXCIvXFxcXFxcXFwtLS0tLS1YWFheXl5cIiwgXCJcXFxcLy8tLS0tLS1YWFheXl5cIiwgXCItLS0tLS0tLS1YWFheXl5cIiwgXCIqLS0tLS0tLS1YWFheXl5cIl0sIFwiNF80XzJcIjogW1wiWFhYXl5eXl4tLS0tLS1YXCIsIFwiWFhYXl5eXl4tLS0tLS1YXCIsIFwiWFhYXl5eXl4tLS0tLS1YXCIsIFwiWFhYXl5eXl4tLS0tLS1YXCIsIFwiWFhYXl5eXl4tLS0tLS1YXCIsIFwiWFhYXl5eXl4tLS0tLS1YXCIsIFwiWFhYLS1eXl4tLS0tLS1YXCIsIFwiWC0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tXl4tLS0tLS0tLS0tXCIsIFwiLVhYXl5eXl4tLS0tLS1YXCIsIFwiWFhYXl5eXl4tLS0tLS1YXCJdLCBcIjRfMl8wXCI6IFtcIi0tLS0tLSMtLS0tLS1eXlwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLSMtLS0tLS0mLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLVhYLS0tLS0tLVwiLCBcIlxcXFwvLy0tLVhYLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIiotLS0tLSMtLS0tLS1eXlwiXSwgXCI0XzJfMVwiOiBbXCItLS0tLS0jLS0tLS0tXl5cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0jLS0tLS0tJi0tLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS1YWC0tLS0tLS1cIiwgXCJcXFxcLy8tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCIqLS0tLS0jLS0tLS0tXl5cIl0sIFwiNV8zXzBcIjogW1wiLS0tLS0tIy0tLVhYWFhYXCIsIFwiLS0tLS0tWFgtLS0tXl5eXCIsIFwiLS0tLS0tWFgtLS0tXl5eXCIsIFwiLS0tLS0tWFgtLS0tXl5eXCIsIFwiLS0tLS0tWFgtLS0tXl5eXCIsIFwiLS0tIy0tLS0tLS0tLSYtXCIsIFwiLS0tLS0tWFgtLS0tXl5eXCIsIFwiL1xcXFxcXFxcLS0tWFgtLS0tXl5eXCIsIFwiXFxcXC8vLS0tWFgtLS0tXl5eXCIsIFwiLS0tLS0tWFgtLS0tXl5eXCIsIFwiKi0tLS0tIy0tLVhYWFhYXCJdLCBcIjVfM18xXCI6IFtcIi0tLS0tLSMtLS1YWFhYWFwiLCBcIi0tLS0tLVhYLS0tLV5eXlwiLCBcIi0tLS0tLVhYLS0tLV5eXlwiLCBcIi0tLS0tLVhYLS0tLV5eXlwiLCBcIi0tLS0tLVhYLS0tLV5eXlwiLCBcIi0tLSMtLS0tLS0tLS0mLVwiLCBcIi0tLS0tLVhYLS0tLV5eXlwiLCBcIi9cXFxcXFxcXC0tLVhYLS0tLV5eXlwiLCBcIlxcXFwvLy0tLVhYLS0tLV5eXlwiLCBcIi0tLS0tLVhYLS0tLV5eXlwiLCBcIiotLS0tLSMtLS1YWFhYWFwiXSwgXCIzXzNfMFwiOiBbXCItLS0tLS0jLS0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tXi1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tXi1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCItLS0jLS0tLS0tWC0tXi1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCIvXFxcXFxcXFwtLS1YWC0tWC0tXi1cIiwgXCJcXFxcLy8tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tXi1cIiwgXCIqLS0tLS0jLS0tJi0tLS1cIl0sIFwiM18zXzFcIjogW1wiLS0tLS0tIy0tLVgtLS0tXCIsIFwiLS0tLS0tWFgtLVgtLV4tXCIsIFwiLS0tLS0tWFgtLVgtLS0tXCIsIFwiLS0tLS0tWFgtLVgtLV4tXCIsIFwiLS0tLS0tWFgtLVgtLS0tXCIsIFwiLS0tIy0tLS0tLVgtLV4tXCIsIFwiLS0tLS0tWFgtLVgtLS0tXCIsIFwiL1xcXFxcXFxcLS0tWFgtLVgtLV4tXCIsIFwiXFxcXC8vLS0tWFgtLVgtLS0tXCIsIFwiLS0tLS0tWFgtLVgtLV4tXCIsIFwiKi0tLS0tIy0tLSYtLS0tXCJdLCBcIjNfM18yXCI6IFtcIlhYWC0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS1YLVwiLCBcIi0tLS0tLS0tXlgtLS1YXlwiLCBcIi0tLS0tLS1eXlhYWFhYXlwiLCBcIi0tLS0tLS0tXlgtLS1YXlwiLCBcIi0tLS0tLS0tLVgtLS1YLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIl4tLS0tLS0tLS8vXFxcXFxcXFwtLVwiLCBcIlhYWC0tLS0tLVxcXFxcXFxcLy8tLVwiXSwgXCIwXzhfMFwiOiBbXCItLS0tIy0tLVgtLVhYWFhcIiwgXCJcXFxcXFxcXC0tWFgtLVgtLVhYWFhcIiwgXCIvLy0tWFgtLVgtLVhYWFhcIiwgXCItLS0tWFgtLVgtLVhYWFhcIiwgXCItLS0tWFgtLVgtLVhYWFhcIiwgXCItLS0tLS0tLVgtLVhYWFhcIiwgXCItLS0tWFgtLVgtLVhYWFhcIiwgXCItLS0tWFgtLVgtLS0tWFhcIiwgXCImLS0tWFgtLVgtLS0tLS1cIiwgXCItLS0tWFgtLVgtLVhYLS1cIiwgXCItLS0tIy0tLSYtLVhYWFhcIl0sIFwiMF84XzFcIjogW1wiLS0tLSMtLS1YLS1YWFhYXCIsIFwiXFxcXFxcXFwtLVhYLS1YLS1YWFhYXCIsIFwiLy8tLVhYLS1YLS1YWFhYXCIsIFwiLS0tLVhYLS1YLS1YWFhYXCIsIFwiLS0tLVhYLS1YLS1YWFhYXCIsIFwiLS0tLS0tLS1YLS1YWFhYXCIsIFwiLS0tLVhYLS1YLS1YWFhYXCIsIFwiLS0tLVhYLS1YLS0tLVhYXCIsIFwiJi0tLVhYLS1YLS0tLS0tXCIsIFwiLS0tLVhYLS1YLS1YWC0tXCIsIFwiLS0tLSMtLS0mLS1YWFhYXCJdLCBcIjBfOF8yXCI6IFtcIlhYWC0tLVhYWFhYWFhYWFwiLCBcIiNYWC0tLS1YWFhYWFhYWFwiLCBcIi1YWC0tLS0tLS1YWFhYWFwiLCBcIi1YWC0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS1YWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS1YWFhYWFwiLCBcIi1YWC0tLS0tLS0tLS0tLVwiLCBcIi1YWC0tLS0tLS1YWFhYWFwiLCBcIi1YWC0tLS1YWFhYWFhYWFwiLCBcIlhYWC0tLVhYWFhYWFhYWFwiXSwgXCIwXzlfMFwiOiBbXCItLS0tIy0tLS1YWFhYWFhcIiwgXCJcXFxcXFxcXC0tWFgtLS1YWFhYWFhcIiwgXCIvLy0tWFgtLS1YWFhYWFhcIiwgXCItLS0tWFgtLS1YWFhYWFhcIiwgXCItLS0tWFgtLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLVhYWFhcIiwgXCItLS0tWFgtLS0tLVhYWFhcIiwgXCItLS0tWFgtLS1YWFhYWFhcIiwgXCImLS0tWFgtLS1YWFhYWFhcIiwgXCItLS0tWFgtLS1YWFhYWFhcIiwgXCItLS0tIy0tLS1YWFhYWFhcIl0sIFwiMF85XzFcIjogW1wiLS0tLSMtLS0tWFhYWFhYXCIsIFwiXFxcXFxcXFwtLVhYLS0tWFhYWFhYXCIsIFwiLy8tLVhYLS0tWFhYWFhYXCIsIFwiLS0tLVhYLS0tWFhYWFhYXCIsIFwiLS0tLVhYLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS1YWFhYXCIsIFwiLS0tLVhYLS0tLS1YWFhYXCIsIFwiLS0tLVhYLS0tWFhYWFhYXCIsIFwiJi0tLVhYLS0tWFhYWFhYXCIsIFwiLS0tLVhYLS0tWFhYWFhYXCIsIFwiLS0tLSMtLS0tWFhYWFhYXCJdLCBcIjBfOV8yXCI6IFtcIi0tLS1YWFhYLS1YWFhYLVwiLCBcIi1YLS1YWFhYLS1YWFhYLVwiLCBcIi1YLS1YWFhYLS1YWFhYLVwiLCBcIi1YLS1YWFhYLS1YWFhYLVwiLCBcIi1YLS1YWFhYLS1YWFhYLVwiLCBcIlhYLS1YWFhYLS1YWFhYLVwiLCBcIi1YLS0tLS0tLS1YWFhYLVwiLCBcIi1YLS0tLS0tLS0tLVhYLVwiLCBcIi1YLS1YWFhYLS0tLS0tLVwiLCBcIi1YLS1YWFhYLS1YWC0tLVwiLCBcIi0tLS1YWFhYLS1YWFhYLVwiXSwgXCIwXzdfMFwiOiBbXCItLS0tIy0tLVgtLS1YWFhcIiwgXCJcXFxcXFxcXC0tWFgtLVgtLS1YWFhcIiwgXCIvLy0tWFgtLVgtLS1YWFhcIiwgXCItLS0tWFgtLVgtLS1YWFhcIiwgXCItLS0tWFgtLVgtLS1YWC1cIiwgXCItLS0tLS0tLVgtLS1YWC1cIiwgXCItLS0tWFgtLVgtLS0tLS1cIiwgXCItLS0tWFgtLVgtLS1YWFhcIiwgXCImLS0tWFgtLVgtLS1YWFhcIiwgXCItLS0tWFgtLVgtLS1YWFhcIiwgXCItLS0tIy0tLSYtLS1YWFhcIl0sIFwiMF83XzFcIjogW1wiLS0tLSMtLS1YLS0tWFhYXCIsIFwiXFxcXFxcXFwtLVhYLS1YLS0tWFhYXCIsIFwiLy8tLVhYLS1YLS0tWFhYXCIsIFwiLS0tLVhYLS1YLS0tWFhYXCIsIFwiLS0tLVhYLS1YLS0tWFgtXCIsIFwiLS0tLS0tLS1YLS0tWFgtXCIsIFwiLS0tLVhYLS1YLS0tLS0tXCIsIFwiLS0tLVhYLS1YLS0tWFhYXCIsIFwiJi0tLVhYLS1YLS0tWFhYXCIsIFwiLS0tLVhYLS1YLS0tWFhYXCIsIFwiLS0tLSMtLS0mLS0tWFhYXCJdLCBcIjBfN18yXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tWFgtLVwiLCBcIi0tLS0tLVhYWC0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tWFgtLVwiLCBcIi0tLS0tLVhYWC0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tWFgtLVwiLCBcIi0tLV4tLVhYWC0tLS0tLVwiLCBcIi0tLV4tLS0tLS0tWFgtLVwiLCBcIi0tLV4tLVhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIxXzhfMFwiOiBbXCItLS0tLS0tLVhYWFhYWFhcIiwgXCItLS0tLS0tLVhYWFhYWFhcIiwgXCItLS0tLS0tLVhYWFhYWFhcIiwgXCItLS0tLS0tLVhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0jLS0tLS0tJi0tWFhcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCIvXFxcXFxcXFwtLS0tLVhYWFhYWFhcIiwgXCJcXFxcLy8tLS0tLVhYWFhYWFhcIiwgXCItLS0tLS0tLVhYWFhYWFhcIiwgXCIqLS0tLS0tLVhYWFhYWFhcIl0sIFwiMV84XzFcIjogW1wiLS0tLS0tLS1YWFhYWFhYXCIsIFwiLS0tLS0tLS1YWFhYWFhYXCIsIFwiLS0tLS0tLS1YWFhYWFhYXCIsIFwiLS0tLS0tLS1YWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tIy0tLS0tLSYtLVhYXCIsIFwiLS0tLS0tLS0tLS0tLVhYXCIsIFwiL1xcXFxcXFxcLS0tLS1YWFhYWFhYXCIsIFwiXFxcXC8vLS0tLS1YWFhYWFhYXCIsIFwiLS0tLS0tLS1YWFhYWFhYXCIsIFwiKi0tLS0tLS1YWFhYWFhYXCJdLCBcIjFfOF8yXCI6IFtcIlhYLS0tLS0tJi0tLS0tLVwiLCBcIlhYLS0tLS0tLS0tLS0tLVwiLCBcIlhYLS0tWFhYWFhYWC0tLVwiLCBcIlhYIy0tWFhYWFhYWC0tLVwiLCBcIlhYLS0tWFhYWFhYWC0tLVwiLCBcIlhYLS0tWFhYWFhYWC0tLVwiLCBcIlhYLS0tLS1YWFgtLS0tLVwiLCBcIlhYWFgtLS1YWFgtIy1YWFwiLCBcIi0tWFgtLS1YWFgtLS1YWFwiLCBcIi0tLS0tLS1YWFgtLS0tLVwiLCBcIi0tLS0tLS1YWFgtLS0tLVwiXSwgXCIzXzEwXzBcIjogW1wiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0jWFhYXCIsIFwiLS0tIy0tLS0mLS0tWFhYXCIsIFwiLS0tLS0tLS0tLS0tLSotXCIsIFwiL1xcXFxcXFxcLS0tWFhYWFhYWFhYXCIsIFwiXFxcXC8vLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiKi0tLS0tWFhYWFhYWFhYXCJdLCBcIjNfMTBfMVwiOiBbXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLSNYWFhcIiwgXCItLS0jLS0tLSYtLS1YWFhcIiwgXCItLS0tLS0tLS0tLS0tKi1cIiwgXCIvXFxcXFxcXFwtLS1YWFhYWFhYWFhcIiwgXCJcXFxcLy8tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCIqLS0tLS1YWFhYWFhYWFhcIl0sIFwiM18xMF8yXCI6IFtcIl5eXi0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFgtLS0mLS0tLVwiLCBcIi0tLS0tWFgtLS0tLS0jLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIl5eXi0tWFhYWFhYWFhYWFwiXSwgXCIzXzExXzBcIjogW1wiLS0tLVhYWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLVhYWFhYWFhYWFhYXCIsIFwiLy8tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tI1hYXCIsIFwiLS0tLS0tLS0tLS0tLVhYXCIsIFwiLS0tLS0tIy0tIy0tLS0qXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiJi0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCJdLCBcIjNfMTFfMVwiOiBbXCItLS0tWFhYWFhYWFhYWFhcIiwgXCJcXFxcXFxcXC0tWFhYWFhYWFhYWFhcIiwgXCIvLy0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0jWFhcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCItLS0tLS0jLS0jLS0tLSpcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCImLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIl0sIFwiM185XzBcIjogW1wiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tIy0tLS0mLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0jLS0jXCIsIFwiL1xcXFxcXFxcLS0tWFhYWFhYWFhYXCIsIFwiXFxcXC8vLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiKi0tLS0tWFhYWFhYWFhYXCJdLCBcIjNfOV8xXCI6IFtcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSMtLS0tJi0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tIy0tI1wiLCBcIi9cXFxcXFxcXC0tLVhYWFhYWFhYWFwiLCBcIlxcXFwvLy0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIiotLS0tLVhYWFhYWFhYWFwiXSwgXCIzXzlfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWC0tXl5cIiwgXCJYLS1YWC0tWFgtLS0tLS1cIiwgXCJYLS1YWC0tWFgtLS0tLS1cIiwgXCJYLS1YWC0tWFgtLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYLS1YWC0tWFgtLS0tLS1cIiwgXCJYLS1YWC0tWFgtLS0tLS1cIiwgXCJYKiZYWComWFgtLS0tLS1cIiwgXCJYWFhYWFhYWFhYWC0tXl5cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiNF8xMF8wXCI6IFtcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIlxcXFxcXFxcLS1YWFhYWFhYWFhYLVwiLCBcIi8vLS1YWFhYWFhYWFhYLVwiLCBcIi0tLS1YWFhYWFhYWFhYLVwiLCBcIi0tLS0tLSotLS0qLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0jLS0tIy0tLVwiLCBcIi0tLS1YWFhYWFhYWFhYLVwiLCBcIiYtLS1YWFhYWFhYWFhYLVwiLCBcIi0tLS1YWFhYWFhYWFhYKlwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiXSwgXCI0XzEwXzFcIjogW1wiLS0tLVhYWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLVhYWFhYWFhYWFgtXCIsIFwiLy8tLVhYWFhYWFhYWFgtXCIsIFwiLS0tLVhYWFhYWFhYWFgtXCIsIFwiLS0tLS0tKi0tLSotLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLSMtLS0jLS0tXCIsIFwiLS0tLVhYWFhYWFhYWFgtXCIsIFwiJi0tLVhYWFhYWFhYWFgtXCIsIFwiLS0tLVhYWFhYWFhYWFgqXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCJdLCBcIjJfMTBfMFwiOiBbXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWC0tLS0tI1hcIiwgXCItLS0jLS1YWC0tJi0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS1YWFhYWFhYWFhcIiwgXCJcXFxcLy8tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCIqLS0tLS1YWFhYWFhYWFhcIl0sIFwiMl8xMF8xXCI6IFtcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYLS0tLS0jWFwiLCBcIi0tLSMtLVhYLS0mLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLVhYWFhYWFhYWFwiLCBcIlxcXFwvLy0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIiotLS0tLVhYWFhYWFhYWFwiXSwgXCIxNV8yXzBcIjogW1wiLS0tXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLV4tLS0tXCIsIFwiLS0tLS0tLVgtLV4tLVgtXCIsIFwiLS0tLS0tWFgtLV4tLVhYXCIsIFwiLS0tLS1YWFgtLV4tLVhYXCIsIFwiIy0tLS1YIyotLS0tLSojXCIsIFwiLS0tLS1YWFgtLSYtLVhYXCIsIFwiLS0tLS0tWFgtLS0tLVhYXCIsIFwiLS0tLS0tLVgtLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tXl5eXl5eXl5eXl5eXCJdLCBcIjE1XzJfMVwiOiBbXCItLS1eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tXi0tLS1cIiwgXCItLS0tLS0tWC0tXi0tWC1cIiwgXCItLS0tLS1YWC0tXi0tWFhcIiwgXCItLS0tLVhYWC0tXi0tWFhcIiwgXCIjLS0tLVgjKi0tLS0tKiNcIiwgXCItLS0tLVhYWC0tJi0tWFhcIiwgXCItLS0tLS1YWC0tLS0tWFhcIiwgXCItLS0tLS0tWC0tLS0tWC1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS1eXl5eXl5eXl5eXl5cIl0sIFwiMTVfMF8wXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIiYtLS0tLS0tLSotLS0tKlwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIl5eLS0tLS0tXl5eLS1eXlwiLCBcIl5eXl4tLV5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLSYtLS0tJlwiLCBcIl5eXl4tLV5eXl5eXl5eXlwiLCBcIl5eLS0tLS0tXl5eLS1eXlwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiYtLS0tLS0tLSotLS0tKlwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxNV8wXzFcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiJi0tLS0tLS0tKi0tLS0qXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiXl4tLS0tLS1eXl4tLV5eXCIsIFwiXl5eXi0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tJi0tLS0mXCIsIFwiXl5eXi0tXl5eXl5eXl5eXCIsIFwiXl4tLS0tLS1eXl4tLV5eXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiJi0tLS0tLS0tKi0tLS0qXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjRfMV8wXCI6IFtcIi0tLS0tLS0tLVgtLV4tXlwiLCBcIi0tLS0tLS0tLVgtLS0tXlwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLSMtLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi9cXFxcXFxcXC0tLS0tLVgtLS0tLVwiLCBcIlxcXFwvLy0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLSotLVgtLS0tXlwiLCBcIiotLS0tLS0tLSYtLV4tXlwiXSwgXCI0XzFfMVwiOiBbXCItLS0tLS0tLS1YLS1eLV5cIiwgXCItLS0tLS0tLS1YLS0tLV5cIiwgXCItLS0tLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0tLS1YLS0tLS1cIiwgXCItLS0jLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0tLS1YLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS0tLS1YLS0tLS1cIiwgXCJcXFxcLy8tLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0qLS1YLS0tLV5cIiwgXCIqLS0tLS0tLS0mLS1eLV5cIl0sIFwiNF8xXzJcIjogW1wiLV5eXi0tLS0tJi0tLV5eXCIsIFwiLV5eXi0tLS0tWC0tLV5eXCIsIFwiLV5eXi0tJi0tWC0tLV5eXCIsIFwiLV5eXi0tLS0tWC0tLV5eXCIsIFwiLV5eXi0tLS0tWC0tLV5eXCIsIFwiLV5eXi0tLS0tWC0tLV5eXCIsIFwiLV5eXi0tLS0tWC0tLV5eXCIsIFwiLV5eXi0tLS0tWC0tLV5eXCIsIFwiLS0mLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiLV5eXi0tLS0tWC0tLV5eXCJdLCBcIjRfMF8wXCI6IFtcIi0tLS0tLS0tLS0tLV4tXlwiLCBcIi0tLS0tLS0tLS0tLS0tXlwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSMtLS0tLSYtLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS0tLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSotLS0tLS0tXlwiLCBcIiotLS0tLS0tLS0tLV4tXlwiXSwgXCI0XzBfMVwiOiBbXCItLS0tLS0tLS0tLS1eLV5cIiwgXCItLS0tLS0tLS0tLS0tLV5cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0jLS0tLS0mLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tLS1cIiwgXCJcXFxcLy8tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0qLS0tLS0tLV5cIiwgXCIqLS0tLS0tLS0tLS1eLV5cIl0sIFwiNF8wXzJcIjogW1wiLS0tLS0tLS0tLS1eXl4tXCIsIFwiLS0tXi0tLS0tLS1eXl4tXCIsIFwiLS0tLS0tLS0tLS1eXl4tXCIsIFwiLS0tXi0tLS0tLS1eXl4tXCIsIFwiLS0tLS0tLS0tLS1eXl4tXCIsIFwiLS0tXi0tLS0tLS0tKi0tXCIsIFwiLS0tLS0tLS0tLS1eXl4tXCIsIFwiLS0tXi0tLS0tLS1eXl4tXCIsIFwiLS0tLS0tLS0tLS1eXl4tXCIsIFwiLS0tXi0tLS0tLS1eXl4tXCIsIFwiLS0tLS0tLS0tLS1eXl4tXCJdLCBcIjVfMV8wXCI6IFtcIi0tLS0tLS0tLVgtLS0tXlwiLCBcIi0tLS0tLS0tLVgtLV4tKlwiLCBcIi0tLS0tLS0tLVgtLS0tXlwiLCBcIi0tLS0tLS0tLVgtLV4tLVwiLCBcIi0tLS0tLS0tLVgtLS0tXlwiLCBcIi0tLSMtLS0tLVgtLV4tJlwiLCBcIi0tLS0tLS0tLVgtLS0tXlwiLCBcIi9cXFxcXFxcXC0tLS0tLVgtLV4tLVwiLCBcIlxcXFwvLy0tLS0tLVgtLS0tXlwiLCBcIi0tLS0tLSotLVgtLV4tKlwiLCBcIiotLS0tLS0tLSYtLS0tXlwiXSwgXCI1XzFfMVwiOiBbXCItLS0tLS0tLS1YLS0tLV5cIiwgXCItLS0tLS0tLS1YLS1eLSpcIiwgXCItLS0tLS0tLS1YLS0tLV5cIiwgXCItLS0tLS0tLS1YLS1eLS1cIiwgXCItLS0tLS0tLS1YLS0tLV5cIiwgXCItLS0jLS0tLS1YLS1eLSZcIiwgXCItLS0tLS0tLS1YLS0tLV5cIiwgXCIvXFxcXFxcXFwtLS0tLS1YLS1eLS1cIiwgXCJcXFxcLy8tLS0tLS1YLS0tLV5cIiwgXCItLS0tLS0qLS1YLS1eLSpcIiwgXCIqLS0tLS0tLS0mLS0tLV5cIl0sIFwiNV8xXzJcIjogW1wiXl5eLS0tLS0jLS1eLV4tXCIsIFwiLS0tLS0tLS1YLS0tLV4tXCIsIFwiLS0tLS0tLS1YLS0tLS0tXCIsIFwiLS0tLS0tLS1YLS0tLS0tXCIsIFwiLS0tLS0tLS1YLS0tLS0tXCIsIFwiLS0tLS0tLS1YLS0tLS0tXCIsIFwiLS0tLS0mLS1YLS0tLS0tXCIsIFwiLS0tLS0tLS1YLS0tLS0tXCIsIFwiLS0tLS0tLS1YLS0tLS0tXCIsIFwiLS0tLS0tLS1YLS0tLV4tXCIsIFwiXl5eLS0tLS1YLS1eLV4tXCJdLCBcIjNfMV8wXCI6IFtcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLSMtLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSMtLS0tLSYtLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS0tLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSotLS0tLS0vL1wiLCBcIiotLS0tLS0tLS0tLS1cXFxcXFxcXFwiXSwgXCIzXzFfMVwiOiBbXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0jLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0jLS0tLS0mLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tLS1cIiwgXCJcXFxcLy8tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0qLS0tLS0tLy9cIiwgXCIqLS0tLS0tLS0tLS0tXFxcXFxcXFxcIl0sIFwiM18xXzJcIjogW1wiXl5eXi0tLS0tLVhYLS0tXCIsIFwiXl5eXi0tLS0tLVhYLS0tXCIsIFwiXl5eXi0tLS0tLVhYLS0tXCIsIFwiXl4tLS0tLSYtLVhYLS0tXCIsIFwiLS0tLS0tLS0tLVhYLS0tXCIsIFwiLS1eXi0tLS0tLVhYLS0tXCIsIFwiXl5eXi0tLS0tLVhYLS0tXCIsIFwiXl5eXi0tLS0tLVhYLS0tXCIsIFwiXl5eXi0tLS0tLS0tLS0tXCIsIFwiXl5eXi0tLS0tLS0tLS0tXCIsIFwiXl5eXi0tLS0tLS0tLS0tXCJdLCBcIjlfNF8wXCI6IFtcIi0tLS1eXl5eXl5eXl5eXlwiLCBcIlxcXFxcXFxcLS0tLS0tLS0tLS0tLVwiLCBcIi8vLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLVgtLVgtLS0tWFwiLCBcIi0tLS0tLVgtLVheLS0tWFwiLCBcIi0tLS0tLVhYWFheXi0tWFwiLCBcIi0tLS0tLVgtLVheLS0tWFwiLCBcIi0tLS0tLVgtLVgtLS0tWFwiLCBcIiYtLS0tLS0tLS8vXFxcXFxcXFwvL1wiLCBcIi0tLS0tLS0tLVxcXFxcXFxcLy9cXFxcXFxcXFwiLCBcIi0tLS1eXl5eXl5eXl5eXlwiXSwgXCI5XzRfMVwiOiBbXCItLS0tXl5eXl5eXl5eXl5cIiwgXCJcXFxcXFxcXC0tLS0tLS0tLS0tLS1cIiwgXCIvLy0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS1YLS1YLS0tLVhcIiwgXCItLS0tLS1YLS1YXi0tLVhcIiwgXCItLS0tLS1YWFhYXl4tLVhcIiwgXCItLS0tLS1YLS1YXi0tLVhcIiwgXCItLS0tLS1YLS1YLS0tLVhcIiwgXCImLS0tLS0tLS0vL1xcXFxcXFxcLy9cIiwgXCItLS0tLS0tLS1cXFxcXFxcXC8vXFxcXFxcXFxcIiwgXCItLS0tXl5eXl5eXl5eXl5cIl0sIFwiOV81XzBcIjogW1wiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiWC0tLS0tLS1YLS1YLS1YXCIsIFwiWFhYLS0tLS1YLS1YLS1YXCIsIFwiLVhYLS0tLS1YLS1YLS1YXCIsIFwiLVhYLS0tLS1YLS1YLSNYXCIsIFwiLVhYLS0tLS1YLS1YLS1YXCIsIFwiI1hYLS0tLS1YLS1YLS1YXCIsIFwiLVhYLS0tLS1YLS1YLS1YXCIsIFwiLVhYLS0tLS0tLS0tLS0tXCIsIFwiLVhYLS0tXl5eXl5eXl5eXCJdLCBcIjlfNV8xXCI6IFtcIi0tLS0tLV5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIlgtLS0tLS0tWC0tWC0tWFwiLCBcIlhYWC0tLS0tWC0tWC0tWFwiLCBcIi1YWC0tLS0tWC0tWC0tWFwiLCBcIi1YWC0tLS0tWC0tWC0jWFwiLCBcIi1YWC0tLS0tWC0tWC0tWFwiLCBcIiNYWC0tLS0tWC0tWC0tWFwiLCBcIi1YWC0tLS0tWC0tWC0tWFwiLCBcIi1YWC0tLS0tLS0tLS0tLVwiLCBcIi1YWC0tLV5eXl5eXl5eXlwiXSwgXCI5XzVfMlwiOiBbXCJeXl5eXl5eXl5eLS1YWFhcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYLS0tLVhYWC0tLS0tLS1cIiwgXCJYXi0tLVgqWC0tLS0tLS1cIiwgXCJYXl4tLVgmLS0tLS0tLS1cIiwgXCJYXi0tLVgqWC0tLS0tLS1cIiwgXCJYLS0tLVhYWC0tLS0tLS1cIiwgXCIvL1xcXFxcXFxcLy9cXFxcXFxcXC0tLS0tLS1cIiwgXCJcXFxcXFxcXC8vXFxcXFxcXFwvLy0tLS0tWFhcIiwgXCJeXl5eXl5eXl5eLS1YWFhcIl0sIFwiOV8zXzBcIjogW1wiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS1YLS0tLS1YXCIsIFwiLS0tLS0tLS1YLS0tLS0tXCIsIFwiLS0tIy0tLS1YLS0tLS0tXCIsIFwiLS0tLS0tLS1YLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tLS1YLS0tLy9cXFxcXCIsIFwiXFxcXC8vLS0tLS1YLS0tXFxcXFxcXFwvXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tXl5eXl5eXl5eXCJdLCBcIjlfM18xXCI6IFtcIi0tLS0tLV5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tWC0tLS0tWFwiLCBcIi0tLS0tLS0tWC0tLS0tLVwiLCBcIi0tLSMtLS0tWC0tLS0tLVwiLCBcIi0tLS0tLS0tWC0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLS0tWC0tLS8vXFxcXFwiLCBcIlxcXFwvLy0tLS0tWC0tLVxcXFxcXFxcL1wiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiotLS0tLV5eXl5eXl5eXlwiXSwgXCI5XzNfMlwiOiBbXCJeXl5eXl5eXl5eXi0tWFhcIiwgXCItLS1YLS0tLSYtLS0tWFhcIiwgXCJeLS0tLS0tLVgtLS0tWFhcIiwgXCJeLS0tLS0tLVgtLS0tWFhcIiwgXCJeLS0tLS0tLVgtLS0tWFhcIiwgXCJeLS0tLS0tLVgtLS0tWFhcIiwgXCJeLS0tLS0tLVgtLS0tWFhcIiwgXCJeLS0tLS0tLVgtLS0tWFhcIiwgXCJeLS0tLS0tLVgtLS0tLS1cIiwgXCItLS0tLS0tLVgtLS0tLS1cIiwgXCJeXl5eXl5eXl5eXi0tLS1cIl0sIFwiMTBfNF8wXCI6IFtcIi0tLS0tLV5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tLS0tJlwiLCBcIlgtLS0tLS0tLS0tWC0tWFwiLCBcIlhYWC0tLS0tLS1YWC0tWFwiLCBcIi1YWC0tLS0tLVhYWC0tWFwiLCBcIi1YWC0tLS0tLVgjKi0tWFwiLCBcIi1YWC0tLS0tLVhYWC0tWFwiLCBcIiNYWC0tLS0tLS1YWC0tWFwiLCBcIi1YWC0tLS0tLS0tWC0tWFwiLCBcIi1YWC0tLS0tLS0tLS0tWFwiLCBcIi1YWC0tLV5eXl5eXl5eXlwiXSwgXCIxMF80XzFcIjogW1wiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS0mXCIsIFwiWC0tLS0tLS0tLS1YLS1YXCIsIFwiWFhYLS0tLS0tLVhYLS1YXCIsIFwiLVhYLS0tLS0tWFhYLS1YXCIsIFwiLVhYLS0tLS0tWCMqLS1YXCIsIFwiLVhYLS0tLS0tWFhYLS1YXCIsIFwiI1hYLS0tLS0tLVhYLS1YXCIsIFwiLVhYLS0tLS0tLS1YLS1YXCIsIFwiLVhYLS0tLS0tLS0tLS1YXCIsIFwiLVhYLS0tXl5eXl5eXl5eXCJdLCBcIjhfNF8wXCI6IFtcIi0tLS0jLS0tXl5eXl5eXlwiLCBcIlxcXFxcXFxcLS1YWC0tLS0tWC0tWFwiLCBcIi8vLS1YWC0tLS0tWC0tWFwiLCBcIi0tLS1YWC0tLS0tWC0tWFwiLCBcIi0tLS1YWC0tLS0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tWC0jWFwiLCBcIi0tLS1YWC0tLS0tWC0tWFwiLCBcIi0tLS1YWC0tLS0tWC0tWFwiLCBcIiYtLS1YWC0tLS0tWC0tWFwiLCBcIi0tLS1YWC0tLS0tLS0tLVwiLCBcIi0tLS0jLS0tXl5eXl5eXlwiXSwgXCI4XzRfMVwiOiBbXCItLS0tIy0tLV5eXl5eXl5cIiwgXCJcXFxcXFxcXC0tWFgtLS0tLVgtLVhcIiwgXCIvLy0tWFgtLS0tLVgtLVhcIiwgXCItLS0tWFgtLS0tLVgtLVhcIiwgXCItLS0tWFgtLS0tLVgtLVhcIiwgXCItLS0tLS0tLS0tLVgtI1hcIiwgXCItLS0tWFgtLS0tLVgtLVhcIiwgXCItLS0tWFgtLS0tLVgtLVhcIiwgXCImLS0tWFgtLS0tLVgtLVhcIiwgXCItLS0tWFgtLS0tLS0tLS1cIiwgXCItLS0tIy0tLV5eXl5eXl5cIl0sIFwiOF80XzJcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLVgtLS0tLS0tLS0tXCIsIFwiLS0tLVheLS0tLV5eXl5eXCIsIFwiWFhYWFheXi0tLS0tLS0tXCIsIFwiKiMqLVheLS0tLV5eXl5eXCIsIFwiLSYtLVgtLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjRfNV8wXCI6IFtcIi0tLS0tLSMtLS1YWFhYWFwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLS0tLVhYLS0tLS1YLVwiLCBcIi0tLS0tLVhYLS0tLS1YWFwiLCBcIi0tLS0tLVhYLS0tLS1YWFwiLCBcIi0tLSMtLS0tLS0tLSYqI1wiLCBcIi0tLS0tLVhYLS0tLS1YWFwiLCBcIi9cXFxcXFxcXC0tLVhYLS0tLS1YWFwiLCBcIlxcXFwvLy0tLVhYLS0tLS1YLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIiotLS0tLSMtLS1YWFhYWFwiXSwgXCI0XzVfMVwiOiBbXCItLS0tLS0jLS0tWFhYWFhcIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tWC1cIiwgXCItLS0tLS1YWC0tLS0tWFhcIiwgXCItLS0tLS1YWC0tLS0tWFhcIiwgXCItLS0jLS0tLS0tLS0mKiNcIiwgXCItLS0tLS1YWC0tLS0tWFhcIiwgXCIvXFxcXFxcXFwtLS1YWC0tLS0tWFhcIiwgXCJcXFxcLy8tLS1YWC0tLS0tWC1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCIqLS0tLS0jLS0tWFhYWFhcIl0sIFwiNF81XzJcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLS1YLS0tLS0tLS1eXl4tXCIsIFwiLS1YLS0tLS0tLS1eXl4tXCIsIFwiLS1YLS0tWFhYLS1eXl4tXCIsIFwiLS1YLS0tWCpYLS0tLS0tXCIsIFwiLSNYLS0tWCYtLS1eXl4tXCIsIFwiLS1YLS0tWCpYLS0tLS0tXCIsIFwiLS1YLS0tWFhYLS1eXl4tXCIsIFwiLS1YLS0tLS0tLS1eXl4tXCIsIFwiLS0tLS0tLS0tLS1eXl4tXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjVfNF8wXCI6IFtcIi0tLS0tLVhYWC0tXl5eXlwiLCBcIi0tLS0tLVhYWC0tLS1eLVwiLCBcIi0tLS0tLVhYWC0tLS1eLVwiLCBcIi0tLS0tLVhYWC0tLS1eLVwiLCBcIi0tLS0tLVhYWC0tLS1eLVwiLCBcIi0tLSMtLVhYWC0tLS0tLVwiLCBcIi0tLS0tLVhYWC0tLS0mLVwiLCBcIi9cXFxcXFxcXC0tLVhYWC0tLS0tLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiotLS0tLVhYWC0tXl5eXlwiXSwgXCI1XzRfMVwiOiBbXCItLS0tLS1YWFgtLV5eXl5cIiwgXCItLS0tLS1YWFgtLS0tXi1cIiwgXCItLS0tLS1YWFgtLS0tXi1cIiwgXCItLS0tLS1YWFgtLS0tXi1cIiwgXCItLS0tLS1YWFgtLS0tXi1cIiwgXCItLS0jLS1YWFgtLS0tLS1cIiwgXCItLS0tLS1YWFgtLS0tJi1cIiwgXCIvXFxcXFxcXFwtLS1YWFgtLS0tLS1cIiwgXCJcXFxcLy8tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIqLS0tLS1YWFgtLV5eXl5cIl0sIFwiM180XzBcIjogW1wiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tLS0tXCIsIFwiLS0tIy0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLS0jXCIsIFwiL1xcXFxcXFxcLS0tLS0tWC0tWFhYXCIsIFwiXFxcXC8vLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tKi0tWC0tWFhYXCIsIFwiKi0tLS0tLS0tJi0tWFhYXCJdLCBcIjNfNF8xXCI6IFtcIi0tLS0tLS0tLVgtLVhYWFwiLCBcIi0tLS0tLS0tLVgtLVhYWFwiLCBcIi0tLS0tLS0tLVgtLVhYWFwiLCBcIi0tLS0tLS0tLVgtLVhYWFwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLSMtLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tI1wiLCBcIi9cXFxcXFxcXC0tLS0tLVgtLVhYWFwiLCBcIlxcXFwvLy0tLS0tLVgtLVhYWFwiLCBcIi0tLS0tLSotLVgtLVhYWFwiLCBcIiotLS0tLS0tLSYtLVhYWFwiXSwgXCIzXzRfMlwiOiBbXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLy9cXFxcXFxcXC0tLy9cXFxcXFxcXC1cIiwgXCItLS0tXFxcXFxcXFwvLy0tXFxcXFxcXFwvLy1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJeLS0tLS0tLS0tLS0tLS1cIiwgXCJeXi0tLS0tLS0tLS0tLS1cIiwgXCJeLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS1YJlgtLS1YJlhcIiwgXCItLS0tLS1YLVgtLS1YLVhcIiwgXCItLS0tLS1YI1gtLS1YI1hcIiwgXCItLS0tLS1YWFgtLS1YWFhcIl0sIFwiOF81XzBcIjogW1wiLS0tLS0jLS0tXl5eXl5eXCIsIFwiLS0tLS1YWC0tLS1eLS1YXCIsIFwiWC0tLS1YWC0tLS1eLS1YXCIsIFwiWFhYLS1YWC0tLS1eLS1YXCIsIFwiLVhYLS1YWC0tLS1eLS1YXCIsIFwiLVhYLS0tLS0tLS0tLS1YXCIsIFwiLVhYLS1YWC0tLS0mLS1YXCIsIFwiI1hYLS1YWC0tLS0tLS1YXCIsIFwiLVhYLS1YWC0tLS0tLS1YXCIsIFwiLVhYLS1YWC0tLS0tLS0jXCIsIFwiLVhYLS0jLS0tXl5eXl5eXCJdLCBcIjhfNV8xXCI6IFtcIi0tLS0tIy0tLV5eXl5eXlwiLCBcIi0tLS0tWFgtLS0tXi0tWFwiLCBcIlgtLS0tWFgtLS0tXi0tWFwiLCBcIlhYWC0tWFgtLS0tXi0tWFwiLCBcIi1YWC0tWFgtLS0tXi0tWFwiLCBcIi1YWC0tLS0tLS0tLS0tWFwiLCBcIi1YWC0tWFgtLS0tJi0tWFwiLCBcIiNYWC0tWFgtLS0tLS0tWFwiLCBcIi1YWC0tWFgtLS0tLS0tWFwiLCBcIi1YWC0tWFgtLS0tLS0tI1wiLCBcIi1YWC0tIy0tLV5eXl5eXlwiXSwgXCIwXzZfMFwiOiBbXCItLS0tIy0tLVgtLVgtLVhcIiwgXCJcXFxcXFxcXC0tWFgtLVgtLVgtLVhcIiwgXCIvLy0tWFgtLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCImLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tIy0tLSYtLSYtLSZcIl0sIFwiMF82XzFcIjogW1wiLS0tLSMtLS1YLS1YLS1YXCIsIFwiXFxcXFxcXFwtLVhYLS1YLS1YLS1YXCIsIFwiLy8tLVhYLS1YLS1YLS1YXCIsIFwiLS0tLVhYLS1YLS1YLS1YXCIsIFwiLS0tLVhYLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiLS0tLVhYLS1YLS1YLS1YXCIsIFwiLS0tLVhYLS1YLS1YLS1YXCIsIFwiJi0tLVhYLS1YLS1YLS1YXCIsIFwiLS0tLVhYLS1YLS1YLS1YXCIsIFwiLS0tLSMtLS0mLS0mLS0mXCJdLCBcIjBfNl8yXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIipYLS1YWC0tLS0tLS0tLVwiLCBcIlhYLS0tLS0tWC0tLVgtLVwiLCBcIi0tLS1YWC0tWC0tLVgtLVwiLCBcIi0tLS0tLS0tWFhYWFgtLVwiLCBcIi0tLS1YWC0tWC0tLVgtLVwiLCBcIi0tLS0tLS0tWC0tLVgtLVwiLCBcIi0tLS1YWC0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIwXzVfMFwiOiBbXCItLS0tIy0tLVgtLVgtLVhcIiwgXCJcXFxcXFxcXC0tWFgtLVgtLVgtLVhcIiwgXCIvLy0tWFgtLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tWFgtLVgtLVgtLS1cIiwgXCImLS0tWFgtLVgtLVgtLS1cIiwgXCItLS0tWFgtLVgtLVgtLVhcIiwgXCItLS0tIy0tLSYtLSYtLVhcIl0sIFwiMF81XzFcIjogW1wiLS0tLSMtLS1YLS1YLS1YXCIsIFwiXFxcXFxcXFwtLVhYLS1YLS1YLS1YXCIsIFwiLy8tLVhYLS1YLS1YLS1YXCIsIFwiLS0tLVhYLS1YLS1YLS1YXCIsIFwiLS0tLVhYLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiLS0tLVhYLS1YLS1YLS1YXCIsIFwiLS0tLVhYLS1YLS1YLS0tXCIsIFwiJi0tLVhYLS1YLS1YLS0tXCIsIFwiLS0tLVhYLS1YLS1YLS1YXCIsIFwiLS0tLSMtLS0mLS0mLS1YXCJdLCBcIjBfNV8yXCI6IFtcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi9cXFxcXFxcXC1YLS0tLVgtLy9cXFxcXFxcXFwiLCBcIlxcXFwvLy1YLS0tLVgtXFxcXFxcXFwvL1wiLCBcIi0tLS1YLS0tLVgtLS0tLVwiLCBcIiYtLS1YLS0tLS0tLS0tLVwiLCBcIlhYWFhYLS0tLS0tLS0tLVwiLCBcIiYtLS1YLS0tLS0tLS0tLVwiLCBcIi0tLS1YLS0tLVgtLS0tLVwiLCBcIi9cXFxcXFxcXC1YLS0tLVgtLy9cXFxcXFxcXFwiLCBcIlxcXFwvLy1YLS0tLVgtXFxcXFxcXFwvL1wiLCBcIi0tLS0tLS0tLVgtLS0tLVwiXSwgXCIxXzZfMFwiOiBbXCItLS0tLS0tLS0tWFhYWFhcIiwgXCItLS0tLS0tLS0tWFhYWFhcIiwgXCItLS0tLS0tLS0tWFhYWFhcIiwgXCItLS0tLS0tLS0tWFhYWFhcIiwgXCItLS0tLS0tLS0tWFhYWFhcIiwgXCItLS0jLS0mLS0tWFhYWFhcIiwgXCItLS0tLS0tLS0tWFhYLS1cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tLS1cIiwgXCJcXFxcLy8tLS0tLS0tLS0tWFhcIiwgXCItLS0tLS0tLS0tWFhYWFhcIiwgXCIqLS0tLS0tLS0tWFhYWFhcIl0sIFwiMV82XzFcIjogW1wiLS0tLS0tLS0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiLS0tIy0tJi0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLVhYWC0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tLVhYXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiKi0tLS0tLS0tLVhYWFhYXCJdLCBcIjFfNl8yXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YLS0tLS0tLVgtLS0tLVwiLCBcIi1YLS1YLS0tLVgtLS0tLVwiLCBcIi1YLS1YLS0tLVgtLS0tLVwiLCBcIi0tLS1YLS0tLVgtLS0tLVwiLCBcIi0tLS1YLS0tLS0tLS0tLVwiLCBcIi0tLS1YLS0tLS0tLS0tL1wiLCBcIi1YLS1YWC0tLS0tLS0tXFxcXFwiLCBcIi1YLS1YWFgtLS0tLS0tLVwiLCBcIi1YLSYqI1gtLSYtLS0tLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIzXzJfMFwiOiBbXCItLS0tLS0jLS0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tXi1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tXi1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0jLS0tLS0tJi0tXi1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS1YWC0tLS0tXi1cIiwgXCJcXFxcLy8tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tXi1cIiwgXCIqLS0tLS0jLS0tLS0tLS1cIl0sIFwiM18yXzFcIjogW1wiLS0tLS0tIy0tLS0tLS0tXCIsIFwiLS0tLS0tWFgtLS0tLV4tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiLS0tLS0tWFgtLS0tLV4tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiLS0tIy0tLS0tLSYtLV4tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tWFgtLS0tLV4tXCIsIFwiXFxcXC8vLS0tWFgtLS0tLS0tXCIsIFwiLS0tLS0tWFgtLS0tLV4tXCIsIFwiKi0tLS0tIy0tLS0tLS0tXCJdLCBcIjNfMF8wXCI6IFtcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0jLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSMtLS0tLSYtLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS0tLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSotLS0tLS0tL1wiLCBcIiotLS0tLS0tLS0tLS0tXFxcXFwiXSwgXCIzXzBfMVwiOiBbXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tIy1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0jLS0tLS0mLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tLS1cIiwgXCJcXFxcLy8tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0qLS0tLS0tLS9cIiwgXCIqLS0tLS0tLS0tLS0tLVxcXFxcIl0sIFwiM18wXzJcIjogW1wiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLSMtLS0tXCIsIFwiKi0tLSMtLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLSMtLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0vL1xcXFxcXFxcLS0tLS0tXCIsIFwiLS0tLS1cXFxcXFxcXC8vLS0tLS0tXCJdLCBcIjJfMV8wXCI6IFtcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLSMtLS0tLVgtLSYtLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi9cXFxcXFxcXC0tLS0tLVgtLS0tLVwiLCBcIlxcXFwvLy0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLSotLVgtLS0tLVwiLCBcIiotLS0tLS0tLSYtLS0tLVwiXSwgXCIyXzFfMVwiOiBbXCItLS0tLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0tLS1YLS0tLS1cIiwgXCItLS0jLS0tLS1YLS0mLS1cIiwgXCItLS0tLS0tLS1YLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS0tLS1YLS0tLS1cIiwgXCJcXFxcLy8tLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0qLS1YLS0tLS1cIiwgXCIqLS0tLS0tLS0mLS0tLS1cIl0sIFwiMV80XzBcIjogW1wiLS0tLS0tLS0tWC0tLVhYXCIsIFwiLS0tLS0tLS0tWC0tLVhYXCIsIFwiLS0tLS0tLS0tWC0tLVhYXCIsIFwiLS0tLS0tLS0tWC0tLVhYXCIsIFwiLS0tLS0tLS0tWC0tLVhYXCIsIFwiLS0tIy0tJi0tWC0tLVhYXCIsIFwiLS0tLS0tLS0tWC0tLVhYXCIsIFwiL1xcXFxcXFxcLS0tLS0tWC0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tLVhYXCIsIFwiKi0tLS0tLS0tJi0tLVhYXCJdLCBcIjFfNF8xXCI6IFtcIi0tLS0tLS0tLVgtLS1YWFwiLCBcIi0tLS0tLS0tLVgtLS1YWFwiLCBcIi0tLS0tLS0tLVgtLS1YWFwiLCBcIi0tLS0tLS0tLVgtLS1YWFwiLCBcIi0tLS0tLS0tLVgtLS1YWFwiLCBcIi0tLSMtLSYtLVgtLS1YWFwiLCBcIi0tLS0tLS0tLVgtLS1YWFwiLCBcIi9cXFxcXFxcXC0tLS0tLVgtLS0tLVwiLCBcIlxcXFwvLy0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS1YWFwiLCBcIiotLS0tLS0tLSYtLS1YWFwiXSwgXCIxXzRfMlwiOiBbXCItLS1YWFgtLVgtLS0tXl5cIiwgXCItLS1YWFgtLVgtLS0tXl5cIiwgXCItLS0tJi0tLVgtLS0tXl5cIiwgXCItLS0tLS0tLVgtLS0tXl5cIiwgXCJYLS1YWFgtLVgtLS0tLS1cIiwgXCJYLS1YWFgtLVgtJi0tLS1cIiwgXCJYLS1YWFgtLVgtLS0tXl5cIiwgXCItLS1YWFgtLVgtLS0tXl5cIiwgXCItLS1YWFgtLVgtLS0tXl5cIiwgXCItLS1YWFgtLVgtLS0tXl5cIiwgXCItLS1YWFgtLS0tLS0tXl5cIl0sIFwiMV81XzBcIjogW1wiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tWFhYXCIsIFwiLS0tIy0tJi0tWC0tWFhYXCIsIFwiLS0tLS0tLS0tWC0tWFhYXCIsIFwiL1xcXFxcXFxcLS0tLS0tWC0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tWC0tLS0tXCIsIFwiLS0tLS0tLS0tWC0tWFgtXCIsIFwiKi0tLS0tLS0tJi0tWFhYXCJdLCBcIjFfNV8xXCI6IFtcIi0tLS0tLS0tLVgtLVhYWFwiLCBcIi0tLS0tLS0tLVgtLVhYWFwiLCBcIi0tLS0tLS0tLVgtLVhYWFwiLCBcIi0tLS0tLS0tLVgtLVhYWFwiLCBcIi0tLS0tLS0tLVgtLVhYWFwiLCBcIi0tLSMtLSYtLVgtLVhYWFwiLCBcIi0tLS0tLS0tLVgtLVhYWFwiLCBcIi9cXFxcXFxcXC0tLS0tLVgtLS0tLVwiLCBcIlxcXFwvLy0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLVhYLVwiLCBcIiotLS0tLS0tLSYtLVhYWFwiXSwgXCIxXzNfMFwiOiBbXCItLS0tLS0tLS1YLS1YLS1cIiwgXCItLS0tLS0tLS1YLS1YLS1cIiwgXCItLS0tLS0tLS1YLS1YLS1cIiwgXCItLS0tLS0tLS1YLS1YLS1cIiwgXCItLS0tLS0tLS1YLS1YLS1cIiwgXCItLS0jLS0mLS1YLS1YLS1cIiwgXCItLS0tLS0tLS1YLS1YLS1cIiwgXCIvXFxcXFxcXFwtLS0tLS1YLS1YLS1cIiwgXCJcXFxcLy8tLS0tLS1YLS1YLS1cIiwgXCItLS0tLS0tLS1YLS1YLS1cIiwgXCIqLS0tLS0tLS0mLS0mLS1cIl0sIFwiMV8zXzFcIjogW1wiLS0tLS0tLS0tWC0tWC0tXCIsIFwiLS0tLS0tLS0tWC0tWC0tXCIsIFwiLS0tLS0tLS0tWC0tWC0tXCIsIFwiLS0tLS0tLS0tWC0tWC0tXCIsIFwiLS0tLS0tLS0tWC0tWC0tXCIsIFwiLS0tIy0tJi0tWC0tWC0tXCIsIFwiLS0tLS0tLS0tWC0tWC0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tWC0tWC0tXCIsIFwiXFxcXC8vLS0tLS0tWC0tWC0tXCIsIFwiLS0tLS0tLS0tWC0tWC0tXCIsIFwiKi0tLS0tLS0tJi0tJi0tXCJdLCBcIjFfM18yXCI6IFtcIi0tLSYtLS0tLS0tLS0tLVwiLCBcIi0tLVgtLVgtLS0tLSMtLVwiLCBcIi0tLVgtLVgtLS0tLS0tLVwiLCBcIi0tLVgtLVgtLS0tLS0tLVwiLCBcIi0tLVgtLVgtLS0tLSotLVwiLCBcIi0tLVgtLVhYWFhYWFhYWFwiLCBcIi0tLVgtLVgtLSYtLSotLVwiLCBcIi0tLVgtLVgtLS0tLS0tLVwiLCBcIi0tLVgtLVgtLS0tLS0tLVwiLCBcIi0tLVgtLVgtLS0tLSMtLVwiLCBcIi0tLVgtLS0tLS0tLS0tLVwiXSwgXCIyXzRfMFwiOiBbXCItLS0tLS0jLS0tWC0tLVhcIiwgXCItLS0tLS1YWC0tWC0tLVhcIiwgXCItLS0tLS1YWC0tWC0tLVhcIiwgXCItLS0tLS1YWC0tWC0tLVhcIiwgXCItLS0tLS1YWC0tWC0tLVhcIiwgXCItLS0jLS0tLS0tWC0tLVhcIiwgXCItLS0tLS1YWC0tWC0tLVhcIiwgXCIvXFxcXFxcXFwtLS1YWC0tWC0tLS1cIiwgXCJcXFxcLy8tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tLVhcIiwgXCIqLS0tLS0jLS0tJi0tLVhcIl0sIFwiMl80XzFcIjogW1wiLS0tLS0tIy0tLVgtLS1YXCIsIFwiLS0tLS0tWFgtLVgtLS1YXCIsIFwiLS0tLS0tWFgtLVgtLS1YXCIsIFwiLS0tLS0tWFgtLVgtLS1YXCIsIFwiLS0tLS0tWFgtLVgtLS1YXCIsIFwiLS0tIy0tLS0tLVgtLS1YXCIsIFwiLS0tLS0tWFgtLVgtLS1YXCIsIFwiL1xcXFxcXFxcLS0tWFgtLVgtLS0tXCIsIFwiXFxcXC8vLS0tWFgtLVgtLS0tXCIsIFwiLS0tLS0tWFgtLVgtLS1YXCIsIFwiKi0tLS0tIy0tLSYtLS1YXCJdLCBcIjJfNF8yXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS1YLVwiLCBcIipYLS0tLS0tLS0tLS1YLVwiLCBcIlhYLS0tLS0tLS0tLS1YLVwiLCBcIi0tLS0tLS0tLS0tLS1YLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tXi0tLS1eLS0tLVwiLCBcIi0tLS0tXi0tLS1eLS0tLVwiLCBcIi0tLS0tXi0tLS1eLS0mLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIwXzRfMFwiOiBbXCItLS0tIy0tLVgtLVgtLS1cIiwgXCJcXFxcXFxcXC0tWFgtLVgtLVgtLS1cIiwgXCIvLy0tWFgtLVgtLVgtLS1cIiwgXCItLS0tWFgtLVgtLVgtLS1cIiwgXCItLS0tWFgtLVgtLVgtLS1cIiwgXCItLS0tLS0tLVgtLVgtLSZcIiwgXCItLS0tWFgtLVgtLVgtLS1cIiwgXCItLS0tWFgtLVgtLVgtLS1cIiwgXCImLS0tWFgtLVgtLVgtLS1cIiwgXCItLS0tWFgtLVgtLVgtLS1cIiwgXCItLS0tIy0tLSYtLSYtLS1cIl0sIFwiMF80XzFcIjogW1wiLS0tLSMtLS1YLS1YLS0tXCIsIFwiXFxcXFxcXFwtLVhYLS1YLS1YLS0tXCIsIFwiLy8tLVhYLS1YLS1YLS0tXCIsIFwiLS0tLVhYLS1YLS1YLS0tXCIsIFwiLS0tLVhYLS1YLS1YLS0tXCIsIFwiLS0tLS0tLS1YLS1YLS0mXCIsIFwiLS0tLVhYLS1YLS1YLS0tXCIsIFwiLS0tLVhYLS1YLS1YLS0tXCIsIFwiJi0tLVhYLS1YLS1YLS0tXCIsIFwiLS0tLVhYLS1YLS1YLS0tXCIsIFwiLS0tLSMtLS0mLS0mLS0tXCJdLCBcIjBfNF8yXCI6IFtcIl4tLS0tLS0tLVhYLS0tLVwiLCBcIi0tLS0tLVgtLVhYLS0tLVwiLCBcIl4tLS0tLVgtLVhYLS0tLVwiLCBcIl4tLVgtLVgtLVhYLS0tLVwiLCBcIl4tLVgtLVgtLS0tLS0tLVwiLCBcIl4tLVhYWFgtLS0tLS0tLVwiLCBcIl4tLVgtLVgtLVhYLS0tLVwiLCBcIl4tLVgtLVgtLVhYLS0tLVwiLCBcIl4tLS0tLVgtLVhYLS0tLVwiLCBcIi0tLS0tLVgtLVhYLS0tLVwiLCBcIl4tLS0tLS0tLVhYLS0tLVwiXSwgXCI3XzFfMFwiOiBbXCItLS0tLS0tLS0tLV5eXl5cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCItLS0jLS0tLS0tLS0tWCNcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tLVhcIiwgXCJcXFxcLy8tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0qLS0tLS0tLS1cIiwgXCIqLS0tLS0tLS0tLV5eXl5cIl0sIFwiN18xXzFcIjogW1wiLS0tLS0tLS0tLS1eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLVhYXCIsIFwiLS0tIy0tLS0tLS0tLVgjXCIsIFwiLS0tLS0tLS0tLS0tLVhYXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLS1YXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tKi0tLS0tLS0tXCIsIFwiKi0tLS0tLS0tLS1eXl5eXCJdLCBcIjdfMV8yXCI6IFtcIlhYWFgtLV5eXl5eLV4tXlwiLCBcIi0tLS0tLS0tXi0tLV4tXlwiLCBcIlgtLS0tLS0tXi0tLS0tXlwiLCBcIlgtLS0tLS0tXi0tLS0tLVwiLCBcIlgtLS0tLS0tXi0tLS0tLVwiLCBcIiomLS0tLS0tLS0tLS0tLVwiLCBcIlgtLS0tLS0tJi0tLS0tLVwiLCBcIlgtLS0tLS0tLS0tLS0tLVwiLCBcIlgtLS0tLS0tLS0tLS0tXlwiLCBcIi0tLS0tLS0tLS0tLV4tXlwiLCBcIlhYWFgtLV5eXl5eLV4tXlwiXSwgXCI2XzBfMFwiOiBbXCItLS0tLS0tLS0tLS1eLS1cIiwgXCItLS0tLS0tLS0tLS1eLS1cIiwgXCItLS0tLS0tLS0tLS1eLS1cIiwgXCItLS0tLS0tLS0tLS1eXl5cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0jLS0tLS0mLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tLS1cIiwgXCJcXFxcLy8tLS0tLS0tLS0tIy1cIiwgXCItLS0tLS0qLS0tLS0tLS1cIiwgXCIqLS0tLS0tLS0tLS0tLS1cIl0sIFwiNl8wXzFcIjogW1wiLS0tLS0tLS0tLS0tXi0tXCIsIFwiLS0tLS0tLS0tLS0tXi0tXCIsIFwiLS0tLS0tLS0tLS0tXi0tXCIsIFwiLS0tLS0tLS0tLS0tXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tIy0tLS0tJi0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tLSMtXCIsIFwiLS0tLS0tKi0tLS0tLS0tXCIsIFwiKi0tLS0tLS0tLS0tLS0tXCJdLCBcIjZfMF8yXCI6IFtcIlgtLV5eXi0tLS1eXl4tLVwiLCBcIi0tLV5eXi0tLS1eXl4tLVwiLCBcIlgtLS0mLS0tLS1eXl4tLVwiLCBcIi0tLV5eXi0tLS1eXl4tLVwiLCBcIlgtLV5eXi0tLS0tJi0tLVwiLCBcIi0tLV5eXi0tLS0tLS0tLVwiLCBcIlgtLV5eXi0tLS1eXl4tLVwiLCBcIi0tLV5eXi0tLS1eXl4tLVwiLCBcIlgtLS0qLS0tLS1eXl4tLVwiLCBcIi0tLV5eXi0tLS1eXl4tLVwiLCBcIlgtLV5eXi0tLS1eXl4tLVwiXSwgXCIxNV8zXzBcIjogW1wiLS1eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tXi0tLS0tXCIsIFwiLS0tLS0tWC0tXi0tLS1YXCIsIFwiLS0tLS1YWC0tXi0tLVhYXCIsIFwiLS0tLVhYWC0tXi0tWFhYXCIsIFwiLS0tLVgjKi0tLS0tWCMqXCIsIFwiLS0tLVhYWC0tJi0tWFhYXCIsIFwiLS0tLS1YWC0tLS0tLVhYXCIsIFwiLS0tLS0tWC0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS1eXl5eXl5eXl5eXl5eXCJdLCBcIjE1XzNfMVwiOiBbXCItLV5eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS1eLS0tLS1cIiwgXCItLS0tLS1YLS1eLS0tLVhcIiwgXCItLS0tLVhYLS1eLS0tWFhcIiwgXCItLS0tWFhYLS1eLS1YWFhcIiwgXCItLS0tWCMqLS0tLS1YIypcIiwgXCItLS0tWFhYLS0mLS1YWFhcIiwgXCItLS0tLVhYLS0tLS0tWFhcIiwgXCItLS0tLS1YLS0tLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLV5eXl5eXl5eXl5eXl5cIl0sIFwiMTVfM18yXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tLV4tLVwiLCBcIi0tLS1YLS0tLS0tLV4tLVwiLCBcIlhYLS1YWC0tLS0tLV4tLVwiLCBcIipYLS1YWFgtLS0tLS0tLVwiLCBcIiYtLS0qI1gtLS0tLS0tLVwiLCBcIipYLS1YWFgtLS0tLS0tLVwiLCBcIlhYLS1YWC0tLS0tLS0tLVwiLCBcIlxcXFxcXFxcLS1YLS0tLVgtLS0tLVwiLCBcIi8vLS0tLS0tLVgtLS0tLVwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxNl8yXzBcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLVgtLVgtLS0tLS0qXCIsIFwiLVgtLVgtLVgtLS0tLS0tXCIsIFwiLVgtLVgtLVgtLS0tLV5eXCIsIFwiLVgtLVgtLVgtLV5eXl5eXCIsIFwiI1gtI1gtI1gtLS0tLS0mXCIsIFwiLVgtLVgtLVgtLV5eXl5eXCIsIFwiLVgtLVgtLVgtLS0tLV5eXCIsIFwiLVgtLVgtLVgtLS0tLS0tXCIsIFwiLVgtLS0tLS0tLS0tLS0qXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjE2XzJfMVwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS0tWC0tWC0tLS0tLSpcIiwgXCItWC0tWC0tWC0tLS0tLS1cIiwgXCItWC0tWC0tWC0tLS0tXl5cIiwgXCItWC0tWC0tWC0tXl5eXl5cIiwgXCIjWC0jWC0jWC0tLS0tLSZcIiwgXCItWC0tWC0tWC0tXl5eXl5cIiwgXCItWC0tWC0tWC0tLS0tXl5cIiwgXCItWC0tWC0tWC0tLS0tLS1cIiwgXCItWC0tLS0tLS0tLS0tLSpcIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiNV8yXzBcIjogW1wiLS0tLS0tIy0tLS1eXl4tXCIsIFwiLS0tLS0tWFgtLS1eXl4tXCIsIFwiLS0tLS0tWFgtLS1eXl4tXCIsIFwiLS0tLS0tWFgtLS1eXl4tXCIsIFwiLS0tLS0tWFgtLS1eXl4tXCIsIFwiLS0tIy0tLS0tLS1eXl4tXCIsIFwiLS0tLS0tWFgtLS1eXl4tXCIsIFwiL1xcXFxcXFxcLS0tWFgtLS1eXl4tXCIsIFwiXFxcXC8vLS0tWFgtLS0tJi0tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiKi0tLS0tIy0tLS1eXl4tXCJdLCBcIjVfMl8xXCI6IFtcIi0tLS0tLSMtLS0tXl5eLVwiLCBcIi0tLS0tLVhYLS0tXl5eLVwiLCBcIi0tLS0tLVhYLS0tXl5eLVwiLCBcIi0tLS0tLVhYLS0tXl5eLVwiLCBcIi0tLS0tLVhYLS0tXl5eLVwiLCBcIi0tLSMtLS0tLS0tXl5eLVwiLCBcIi0tLS0tLVhYLS0tXl5eLVwiLCBcIi9cXFxcXFxcXC0tLVhYLS0tXl5eLVwiLCBcIlxcXFwvLy0tLVhYLS0tLSYtLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIiotLS0tLSMtLS0tXl5eLVwiXSwgXCIxM18wXzBcIjogW1wiLS0tXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tKi0tLS0qXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS1eXl4tLV5eXCIsIFwiLS0tLS0tXl5eXl5eXl5eXCIsIFwiIy0tLS0tLS0tJi0tLS0mXCIsIFwiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS1eXl4tLV5eXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tKi0tLS0qXCIsIFwiLS0tXl5eXl5eXl5eXl5eXCJdLCBcIjEzXzBfMVwiOiBbXCItLS1eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0qLS0tLSpcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLV5eXi0tXl5cIiwgXCItLS0tLS1eXl5eXl5eXl5cIiwgXCIjLS0tLS0tLS0mLS0tLSZcIiwgXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLV5eXi0tXl5cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0qLS0tLSpcIiwgXCItLS1eXl5eXl5eXl5eXl5cIl0sIFwiMTNfMF8yXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIi1eXl5eXl5eXl5eXl5eXlwiLCBcIi1eXl5eXl5eXi0tLS1eXlwiLCBcIi1eXl5eXl4tLS0tLS0tLVwiLCBcIi1eXl4tLS0tLS0tLS0tLVwiLCBcIi0tJi0tLS0tLS0tLS0tLVwiLCBcIi1eXl4tLS0tLS0tLS0tLVwiLCBcIi1eXl5eXl4tLS0tLS0tLVwiLCBcIi1eXl5eXl5eXi0tLS1eXlwiLCBcIi1eXl5eXl5eXl5eXl5eXlwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxMl8wXzBcIjogW1wiLS0tLV5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tKi0tLS0qXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS1eXl4tLV5eXCIsIFwiLS0tLS0tXl5eXl5eXl5eXCIsIFwiIy0tLS0tLS0tJi0tLS0mXCIsIFwiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS1eXl4tLV5eXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tKi0tLS0qXCIsIFwiLS0tLV5eXl5eXl5eXl5eXCJdLCBcIjEyXzBfMVwiOiBbXCItLS0tXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0qLS0tLSpcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLV5eXi0tXl5cIiwgXCItLS0tLS1eXl5eXl5eXl5cIiwgXCIjLS0tLS0tLS0mLS0tLSZcIiwgXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLV5eXi0tXl5cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0qLS0tLSpcIiwgXCItLS0tXl5eXl5eXl5eXl5cIl0sIFwiOV8xXzBcIjogW1wiLS0tLS0tLS1eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLV4tLS0tXCIsIFwiLS0tLS0tLS0tLV4tLVgtXCIsIFwiLS0tLS0tLS0tLV4tLVhYXCIsIFwiLS0tLS0tLS0tLV4tLVhYXCIsIFwiLS0tIy0tLS0tLS0tLSojXCIsIFwiLS0tLS0tLS0tLSYtLVhYXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLVhYXCIsIFwiXFxcXC8vLS0tLS0tLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tLS1eXl5eXl5eXCJdLCBcIjlfMV8xXCI6IFtcIi0tLS0tLS0tXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS1eLS0tLVwiLCBcIi0tLS0tLS0tLS1eLS1YLVwiLCBcIi0tLS0tLS0tLS1eLS1YWFwiLCBcIi0tLS0tLS0tLS1eLS1YWFwiLCBcIi0tLSMtLS0tLS0tLS0qI1wiLCBcIi0tLS0tLS0tLS0mLS1YWFwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS1YWFwiLCBcIlxcXFwvLy0tLS0tLS0tLS1YLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiotLS0tLS0tXl5eXl5eXlwiXSwgXCI5XzFfMlwiOiBbXCJeXl5eXl5eXl5eXi0tLS1cIiwgXCImLS0tLSYtLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJeXi0tXl5eLS0tLS0tWFhcIiwgXCJeXl5eXl5eXl4tLS0tWFhcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCJeXl5eXl5eXl4tLS0tWFhcIiwgXCJeXi0tXl5eLS0tLS0tWFhcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCImLS0tLSYtLS0tLS0tWFhcIiwgXCJeXl5eXl5eXl5eXi0tWFhcIl0sIFwiOV8yXzBcIjogW1wiLS0tLS0tLV5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tIy0tLS0tLS1YLSNYXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS1YLS1YXCIsIFwiXFxcXC8vLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tLV5eXl5eXl5eXCJdLCBcIjlfMl8xXCI6IFtcIi0tLS0tLS1eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tWC0tWFwiLCBcIi0tLSMtLS0tLS0tWC0jWFwiLCBcIi0tLS0tLS0tLS0tWC0tWFwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tWC0tWFwiLCBcIlxcXFwvLy0tLS0tLS0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiotLS0tLS1eXl5eXl5eXlwiXSwgXCIxMF8xXzBcIjogW1wiLS0tLS0tLV5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLV4tLS0tXCIsIFwiLS0tLS0tLS0tLV4tLVgtXCIsIFwiLS0tLS0tLS0tLV4tLVhYXCIsIFwiLS0tLS0tLS0tLV4tLVhYXCIsIFwiLS0tIy0tLS0tLS0tLSojXCIsIFwiLS0tLS0tLS0tLSYtLVhYXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLVhYXCIsIFwiXFxcXC8vLS0tLS0tLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tLV5eXl5eXl5eXCJdLCBcIjEwXzFfMVwiOiBbXCItLS0tLS0tXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tXi0tLS1cIiwgXCItLS0tLS0tLS0tXi0tWC1cIiwgXCItLS0tLS0tLS0tXi0tWFhcIiwgXCItLS0tLS0tLS0tXi0tWFhcIiwgXCItLS0jLS0tLS0tLS0tKiNcIiwgXCItLS0tLS0tLS0tJi0tWFhcIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tWFhcIiwgXCJcXFxcLy8tLS0tLS0tLS0tWC1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIqLS0tLS0tXl5eXl5eXl5cIl0sIFwiNV8wXzBcIjogW1wiLS0tLS0tLS0tLS0tLS1eXCIsIFwiLS0tLS0tLS0tLS0tXi0qXCIsIFwiLS0tLS0tLS0tLS0tLS1eXCIsIFwiLS0tLS0tLS0tLS0tXi0tXCIsIFwiLS0tLS0tLS0tLS0tLS1eXCIsIFwiLS0tIy0tLS0tJi0tXi0mXCIsIFwiLS0tLS0tLS0tLS0tLS1eXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tXi0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS1eXCIsIFwiLS0tLS0tKi0tLS0tXi0qXCIsIFwiKi0tLS0tLS0tLS0tLS1eXCJdLCBcIjVfMF8xXCI6IFtcIi0tLS0tLS0tLS0tLS0tXlwiLCBcIi0tLS0tLS0tLS0tLV4tKlwiLCBcIi0tLS0tLS0tLS0tLS0tXlwiLCBcIi0tLS0tLS0tLS0tLV4tLVwiLCBcIi0tLS0tLS0tLS0tLS0tXlwiLCBcIi0tLSMtLS0tLSYtLV4tJlwiLCBcIi0tLS0tLS0tLS0tLS0tXlwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLV4tLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tXlwiLCBcIi0tLS0tLSotLS0tLV4tKlwiLCBcIiotLS0tLS0tLS0tLS0tXlwiXSwgXCI1XzBfMlwiOiBbXCItLS1eLS0tXi0tLS0tLS1cIiwgXCItXi0qLV4tLS1eLS0tLS1cIiwgXCItLS1eLS0tXi0tLS0tLS1cIiwgXCItXi0tLV4tLS1eLS0tLS1cIiwgXCItLS1eLS0tXi0tLS0tLS1cIiwgXCItXi0mLV4tLS1eLS0tLS1cIiwgXCItLS1eLS0tXi0tLS0tLS1cIiwgXCItXi0tLV4tLS1eLS0tLS1cIiwgXCItLS1eLS0tXi0tLS0tLS1cIiwgXCItXi0qLV4tLS1eLS0tLS1cIiwgXCItLS1eLS0tXi0tLS0tLS1cIl0sIFwiNl80XzBcIjogW1wiLS0tLS0tWFhYLS1eXl5eXCIsIFwiLS0tLS0tWFhYLS0tLS0tXCIsIFwiLS0tLS0tWFhYLS0tLS0tXCIsIFwiLS0tLS0tWFhYLS0tLS1YXCIsIFwiLS0tLS0tWFhYLS0tLVhYXCIsIFwiLS0tIy0tWFhYLS0tLVgjXCIsIFwiLS0tLS0tWFhYLS0tLVhYXCIsIFwiL1xcXFxcXFxcLS0tWFhYLS0tLS1YXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tWFhYLS1eXl5eXCJdLCBcIjZfNF8xXCI6IFtcIi0tLS0tLVhYWC0tXl5eXlwiLCBcIi0tLS0tLVhYWC0tLS0tLVwiLCBcIi0tLS0tLVhYWC0tLS0tLVwiLCBcIi0tLS0tLVhYWC0tLS0tWFwiLCBcIi0tLS0tLVhYWC0tLS1YWFwiLCBcIi0tLSMtLVhYWC0tLS1YI1wiLCBcIi0tLS0tLVhYWC0tLS1YWFwiLCBcIi9cXFxcXFxcXC0tLVhYWC0tLS0tWFwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiotLS0tLVhYWC0tXl5eXlwiXSwgXCI2XzJfMFwiOiBbXCItLS0tLS0jLS0tXl5eLS1cIiwgXCItLS0tLS1YWC0tXl5eLS1cIiwgXCItLS0tLS1YWC0tXl5eLS1cIiwgXCItLS0tLS1YWC0tXl5eLS1cIiwgXCItLS0tLS1YWC0tLSotLS1cIiwgXCItLS0jLS0tLS0tXl5eLS1cIiwgXCItLS0tLS1YWC0tLSYtLS1cIiwgXCIvXFxcXFxcXFwtLS1YWC0tXl5eLS1cIiwgXCJcXFxcLy8tLS1YWC0tXl5eLS1cIiwgXCItLS0tLS1YWC0tXl5eLS1cIiwgXCIqLS0tLS0jLS0tXl5eLS1cIl0sIFwiNl8yXzFcIjogW1wiLS0tLS0tIy0tLV5eXi0tXCIsIFwiLS0tLS0tWFgtLV5eXi0tXCIsIFwiLS0tLS0tWFgtLV5eXi0tXCIsIFwiLS0tLS0tWFgtLV5eXi0tXCIsIFwiLS0tLS0tWFgtLS0qLS0tXCIsIFwiLS0tIy0tLS0tLV5eXi0tXCIsIFwiLS0tLS0tWFgtLS0mLS0tXCIsIFwiL1xcXFxcXFxcLS0tWFgtLV5eXi0tXCIsIFwiXFxcXC8vLS0tWFgtLV5eXi0tXCIsIFwiLS0tLS0tWFgtLV5eXi0tXCIsIFwiKi0tLS0tIy0tLV5eXi0tXCJdLCBcIjJfNl8wXCI6IFtcIi0tLS0tLSMtLS1YLS1YWFwiLCBcIi0tLS0tLVhYLS1YLS1YWFwiLCBcIi0tLS0tLVhYLS1YLS1YWFwiLCBcIi0tLS0tLVhYLS1YLS1YWFwiLCBcIi0tLS0tLVhYLS1YLS1YWFwiLCBcIi0tLSMtLS0tLS1YLS1YWFwiLCBcIi0tLS0tLVhYLS1YLS1YWFwiLCBcIi9cXFxcXFxcXC0tLVhYLS1YLS0tLVwiLCBcIlxcXFwvLy0tLVhYLS1YLS0tLVwiLCBcIi0tLS0tLVhYLS1YLS1YWFwiLCBcIiotLS0tLSMtLS0mLS1YWFwiXSwgXCIyXzZfMVwiOiBbXCItLS0tLS0jLS0tWC0tWFhcIiwgXCItLS0tLS1YWC0tWC0tWFhcIiwgXCItLS0tLS1YWC0tWC0tWFhcIiwgXCItLS0tLS1YWC0tWC0tWFhcIiwgXCItLS0tLS1YWC0tWC0tWFhcIiwgXCItLS0jLS0tLS0tWC0tWFhcIiwgXCItLS0tLS1YWC0tWC0tWFhcIiwgXCIvXFxcXFxcXFwtLS1YWC0tWC0tLS1cIiwgXCJcXFxcLy8tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tWFhcIiwgXCIqLS0tLS0jLS0tJi0tWFhcIl0sIFwiMl82XzJcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVgtLSMtLS0tLS0tLS0tXCIsIFwiLVgtLVgtLS0tLS1YLS0tXCIsIFwiLS0tLVgtLS0tLS1YWC0tXCIsIFwiLS0tLVgtLS0tLS1YWFgtXCIsIFwiLS0tLVgtLS0tLSYqI1gtXCIsIFwiLS0tLVgtLS0tLS1YWFgtXCIsIFwiLS0tLVgtLS0tLS1YWC0tXCIsIFwiLS0tLVgtLS0tLS1YLS0tXCIsIFwiLS0tLVgtLS0tLS0tLS0tXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjJfN18wXCI6IFtcIi0tLS0tLSMtLS1YWFhYWFwiLCBcIi0tLS0tLVhYLS1YWFhYWFwiLCBcIi0tLS0tLVhYLS1YWFhYWFwiLCBcIi0tLS0tLVhYLS1YWFhYWFwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi0tLSMtLS0tLS0tLSYtLVwiLCBcIi0tLS0tLVhYLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLVhYLS1YWFhYWFwiLCBcIlxcXFwvLy0tLVhYLS1YWFhYWFwiLCBcIi0tLS0tLVhYLS1YWFhYWFwiLCBcIiotLS0tLSMtLS1YWFhYWFwiXSwgXCIyXzdfMVwiOiBbXCItLS0tLS0jLS0tWFhYWFhcIiwgXCItLS0tLS1YWC0tWFhYWFhcIiwgXCItLS0tLS1YWC0tWFhYWFhcIiwgXCItLS0tLS1YWC0tWFhYWFhcIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0jLS0tLS0tLS0mLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS1YWC0tWFhYWFhcIiwgXCJcXFxcLy8tLS1YWC0tWFhYWFhcIiwgXCItLS0tLS1YWC0tWFhYWFhcIiwgXCIqLS0tLS0jLS0tWFhYWFhcIl0sIFwiMl83XzJcIjogW1wiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiWFgtLS0tLS0tLS0tLS0tXCIsIFwiWFgtLS0tLS0tLS0tLS0tXCIsIFwiWFgtLS0tLS0tLS0tLS0tXCIsIFwiWFgtLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0jLS0tIy0tLS0jXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCJdLCBcIjJfNV8wXCI6IFtcIi0tLS0tLSMtLS1YLS1YLVwiLCBcIi0tLS0tLVhYLS1YLS1YLVwiLCBcIi0tLS0tLVhYLS1YLS1YLVwiLCBcIi0tLS0tLVhYLS1YLS1YLVwiLCBcIi0tLS0tLVhYLS1YLS1YLVwiLCBcIi0tLSMtLS0tLS1YLS1YLVwiLCBcIi0tLS0tLVhYLS1YLS1YLVwiLCBcIi9cXFxcXFxcXC0tLVhYLS1YLS1YLVwiLCBcIlxcXFwvLy0tLVhYLS1YLS1YLVwiLCBcIi0tLS0tLVhYLS1YLS1YLVwiLCBcIiotLS0tLSMtLS0mLS0mLVwiXSwgXCIyXzVfMVwiOiBbXCItLS0tLS0jLS0tWC0tWC1cIiwgXCItLS0tLS1YWC0tWC0tWC1cIiwgXCItLS0tLS1YWC0tWC0tWC1cIiwgXCItLS0tLS1YWC0tWC0tWC1cIiwgXCItLS0tLS1YWC0tWC0tWC1cIiwgXCItLS0jLS0tLS0tWC0tWC1cIiwgXCItLS0tLS1YWC0tWC0tWC1cIiwgXCIvXFxcXFxcXFwtLS1YWC0tWC0tWC1cIiwgXCJcXFxcLy8tLS1YWC0tWC0tWC1cIiwgXCItLS0tLS1YWC0tWC0tWC1cIiwgXCIqLS0tLS0jLS0tJi0tJi1cIl0sIFwiM182XzBcIjogW1wiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tIy0tLS0tLS0mLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0jXCIsIFwiL1xcXFxcXFxcLS0tLS0tWFhYWFhYXCIsIFwiXFxcXC8vLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tKi0tWFhYWFhYXCIsIFwiKi0tLS0tLS0tWFhYWFhYXCJdLCBcIjNfNl8xXCI6IFtcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSMtLS0tLS0tJi0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tI1wiLCBcIi9cXFxcXFxcXC0tLS0tLVhYWFhYWFwiLCBcIlxcXFwvLy0tLS0tLVhYWFhYWFwiLCBcIi0tLS0tLSotLVhYWFhYWFwiLCBcIiotLS0tLS0tLVhYWFhYWFwiXSwgXCIzXzZfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tWC0tLS0tLS1YLS1cIiwgXCItLS0tWFgtLS0tLS1YWC1cIiwgXCItLS0tWFhYLS0tLS1YWFhcIiwgXCItLS0mKiNYLS0tLSYqI1hcIiwgXCItLS0tWFhYLS0tLS1YWFhcIiwgXCItLS0tWFgtLS0tLS1YWC1cIiwgXCItLS0tWC0tLS0tLS1YLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMV83XzBcIjogW1wiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tIy0tJi0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLVhYXCIsIFwiXFxcXC8vLS0tLS0tLS0tLVhYXCIsIFwiLS0tLS0tLS0tWFgtLS0tXCIsIFwiKi0tLS0tLS0tWFhYWFhYXCJdLCBcIjFfN18xXCI6IFtcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIi0tLSMtLSYtLVhYWFhYWFwiLCBcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS1YWFwiLCBcIlxcXFwvLy0tLS0tLS0tLS1YWFwiLCBcIi0tLS0tLS0tLVhYLS0tLVwiLCBcIiotLS0tLS0tLVhYWFhYWFwiXSwgXCIxXzdfMlwiOiBbXCJYWFhYWFhYLS0tLS0vL1xcXFxcIiwgXCJYWFhYWFhYLS0tLS1cXFxcXFxcXC9cIiwgXCJYWFhYWFhYLS0tLS0tLS1cIiwgXCItWFhYWFhYLS0tLS0tLSNcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLSYtLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItWFhYWFhYLS0tLS0tLS1cIiwgXCJYWFhYWFhYLS0tLSMtLS1cIiwgXCJYWFhYWFhYLS0tLS0tLS1cIiwgXCJYWFhYWFhYLS0tLS0tLS1cIl0sIFwiM181XzBcIjogW1wiLS0tLS0tLS0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tKi0tXCIsIFwiLS0tIy0tJi0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLSMtXCIsIFwiL1xcXFxcXFxcLS0tLS0tLVhYWFhYXCIsIFwiXFxcXC8vLS0tLS0tLVhYWFhYXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiKi0tLS0tLS0tLVhYWFhYXCJdLCBcIjNfNV8xXCI6IFtcIi0tLS0tLS0tLS1YWFhYWFwiLCBcIi0tLS0tLS0tLS1YWFhYWFwiLCBcIi0tLS0tLS0tLS1YWFhYWFwiLCBcIi0tLS0tLS0tLS1YWFhYWFwiLCBcIi0tLS0tLS0tLS0tLSotLVwiLCBcIi0tLSMtLSYtLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0jLVwiLCBcIi9cXFxcXFxcXC0tLS0tLS1YWFhYWFwiLCBcIlxcXFwvLy0tLS0tLS1YWFhYWFwiLCBcIi0tLS0tLS0tLS1YWFhYWFwiLCBcIiotLS0tLS0tLS1YWFhYWFwiXSwgXCIxN180XzBcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLVgtLVgtLVgtLVgtXCIsIFwiLVgtLVgtLVgtLVgtLVgtXCIsIFwiLVgtLVgtLVgtLVgtLVgtXCIsIFwiLVgtLVgtLVgtLVgtLVgtXCIsIFwiI1gtI1gtI1gtI1gtI1gtXCIsIFwiLVgtLVgtLVgtLVgtLVgtXCIsIFwiLVgtLVgtLVgtLVgtLVgtXCIsIFwiLVgtLVgtLVgtLVgtLVgtXCIsIFwiLVgtLS0tLS0tLS0tLS0tXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjE3XzRfMVwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS0tWC0tWC0tWC0tWC1cIiwgXCItWC0tWC0tWC0tWC0tWC1cIiwgXCItWC0tWC0tWC0tWC0tWC1cIiwgXCItWC0tWC0tWC0tWC0tWC1cIiwgXCIjWC0jWC0jWC0jWC0jWC1cIiwgXCItWC0tWC0tWC0tWC0tWC1cIiwgXCItWC0tWC0tWC0tWC0tWC1cIiwgXCItWC0tWC0tWC0tWC0tWC1cIiwgXCItWC0tLS0tLS0tLS0tLS1cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTdfNV8wXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tLS0tJlwiLCBcIi0tLS1YLS0tLS0tWC0tWFwiLCBcIlhYLS1YWC0tLS1YWC0tWFwiLCBcIipYLS1YWFgtLVhYWC0tWFwiLCBcIiYtLS0qI1gtLVgjKi0tWFwiLCBcIipYLS1YWFgtLVhYWC0tWFwiLCBcIlhYLS1YWC0tLS1YWC0tWFwiLCBcIlxcXFxcXFxcLS1YLS0tLS0tWC0tWFwiLCBcIi8vLS0tLS0tLS0tLS0tWFwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxN181XzFcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS0mXCIsIFwiLS0tLVgtLS0tLS1YLS1YXCIsIFwiWFgtLVhYLS0tLVhYLS1YXCIsIFwiKlgtLVhYWC0tWFhYLS1YXCIsIFwiJi0tLSojWC0tWCMqLS1YXCIsIFwiKlgtLVhYWC0tWFhYLS1YXCIsIFwiWFgtLVhYLS0tLVhYLS1YXCIsIFwiXFxcXFxcXFwtLVgtLS0tLS1YLS1YXCIsIFwiLy8tLS0tLS0tLS0tLS1YXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjE3XzNfMFwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tXi0tLS1cIiwgXCItLS0tLS0tWC0tXi0tWC1cIiwgXCItLVgtLS1YWC0tXi0tWFhcIiwgXCIqLVgtLVhYWC0tXi0tWFhcIiwgXCJYWFgtLVgjKi0tLS0tKiNcIiwgXCIqLVgtLVhYWC0tJi0tWFhcIiwgXCItLVgtLS1YWC0tLS0tWFhcIiwgXCItLS0tLS0tWC0tLS0tWC1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTdfM18xXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS1eLS0tLVwiLCBcIi0tLS0tLS1YLS1eLS1YLVwiLCBcIi0tWC0tLVhYLS1eLS1YWFwiLCBcIiotWC0tWFhYLS1eLS1YWFwiLCBcIlhYWC0tWCMqLS0tLS0qI1wiLCBcIiotWC0tWFhYLS0mLS1YWFwiLCBcIi0tWC0tLVhYLS0tLS1YWFwiLCBcIi0tLS0tLS1YLS0tLS1YLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxNl80XzBcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS1YLS1YLS1YLS1YXCIsIFwiLS0tLS1YLS1YLS1YLS1YXCIsIFwiLS1YLS1YLS1YLS1YLS1YXCIsIFwiKi1YLS1YLS1YLS1YLS1YXCIsIFwiWFhYLS1YLSNYLSNYLSNYXCIsIFwiKi1YLS1YLS1YLS1YLS1YXCIsIFwiLS1YLS1YLS1YLS1YLS1YXCIsIFwiLS0tLS1YLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjE2XzRfMVwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS0tLVgtLVgtLVgtLVhcIiwgXCItLS0tLVgtLVgtLVgtLVhcIiwgXCItLVgtLVgtLVgtLVgtLVhcIiwgXCIqLVgtLVgtLVgtLVgtLVhcIiwgXCJYWFgtLVgtI1gtI1gtI1hcIiwgXCIqLVgtLVgtLVgtLVgtLVhcIiwgXCItLVgtLVgtLVgtLVgtLVhcIiwgXCItLS0tLVgtLVgtLVgtLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiNl8xXzBcIjogW1wiLS0tLS0tLS0tLS0tXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiLS0tIy0tLS0tJi0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLS1YXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tKi0tLS0tLS0jXCIsIFwiKi0tLS0tLS0tLS0tXl5eXCJdLCBcIjZfMV8xXCI6IFtcIi0tLS0tLS0tLS0tLV5eXlwiLCBcIi0tLS0tLS0tLS0tLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tWFwiLCBcIi0tLSMtLS0tLSYtLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tWFwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS0tWFwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tWFwiLCBcIi0tLS0tLSotLS0tLS0tI1wiLCBcIiotLS0tLS0tLS0tLV5eXlwiXSwgXCI2XzFfMlwiOiBbXCJYLS1eXi0tLS1eLS0tXi1cIiwgXCJYLS0tLS0tXi0qLV4tLS1cIiwgXCItLS0tLS0tLS1eLS0tXi1cIiwgXCItLS0tLS0tXi0tLV4tLS1cIiwgXCJYLS0tLS0tLS1eLS0tXi1cIiwgXCJYLS0tLS0tXi0mLV4tLS1cIiwgXCJYLS0tLS0tLS1eLS0tXi1cIiwgXCJYLS0tLS0tXi0tLV4tLS1cIiwgXCJYLS0tLS0tLS1eLS0tXi1cIiwgXCJYLS0tLS0tXi0qLV4tLS1cIiwgXCJYLS1eXi0tLS1eLS0tXi1cIl0sIFwiNV81XzBcIjogW1wiLS0tLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tLSotLS1YWFhYXCIsIFwiLS0tIy0tXl5eLS1YWFhYXCIsIFwiLS0tLS0tLSYtLS0tLVhYXCIsIFwiL1xcXFxcXFxcLS0tXl5eLS0tLS0tXCIsIFwiXFxcXC8vLS0tXl5eLS1YWC0tXCIsIFwiLS0tLS0tXl5eLS1YWFhYXCIsIFwiKi0tLS0tXl5eLS1YWFhYXCJdLCBcIjVfNV8xXCI6IFtcIi0tLS0tLV5eXi0tWFhYWFwiLCBcIi0tLS0tLV5eXi0tWFhYWFwiLCBcIi0tLS0tLV5eXi0tWFhYWFwiLCBcIi0tLS0tLV5eXi0tWFhYWFwiLCBcIi0tLS0tLS0qLS0tWFhYWFwiLCBcIi0tLSMtLV5eXi0tWFhYWFwiLCBcIi0tLS0tLS0mLS0tLS1YWFwiLCBcIi9cXFxcXFxcXC0tLV5eXi0tLS0tLVwiLCBcIlxcXFwvLy0tLV5eXi0tWFgtLVwiLCBcIi0tLS0tLV5eXi0tWFhYWFwiLCBcIiotLS0tLV5eXi0tWFhYWFwiXSwgXCI1XzVfMlwiOiBbXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLV4tLS1cIiwgXCItLS1YWC0tLS0tLV4tLS1cIiwgXCItLS1YWC0tLS0tLV4tLS1cIiwgXCItLS1YWC0tLS0tLV4tLS1cIiwgXCIjLS1YWC0tIy0jLSMtIy1cIiwgXCItLS1YWC0tLS0tLS0tLS1cIiwgXCItLS1YWC0tLS0tLS0tLS1cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiNV82XzBcIjogW1wiLS0tLVhYWFhYLS1eXl5eXCIsIFwiXFxcXFxcXFwtLVhYWFhYLS0tLVgtXCIsIFwiLy8tLVhYWFhYLS0tLVgtXCIsIFwiLS0tLVhYWFhYLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLVgtXCIsIFwiLS0tLS0tIy0tLS0tLVgtXCIsIFwiLS0tLVhYWFhYLS0tLVgtXCIsIFwiJi0tLVhYWFhYLS0tLVgtXCIsIFwiLS0tLVhYWFhYLS0tLSMtXCIsIFwiLS0tLVhYWFhYLS1eXl5eXCJdLCBcIjVfNl8xXCI6IFtcIi0tLS1YWFhYWC0tXl5eXlwiLCBcIlxcXFxcXFxcLS1YWFhYWC0tLS1YLVwiLCBcIi8vLS1YWFhYWC0tLS1YLVwiLCBcIi0tLS1YWFhYWC0tLS1YLVwiLCBcIi0tLS0tLS0tLS0tLS1YLVwiLCBcIi0tLS0tLS0tLS0tLS1YLVwiLCBcIi0tLS0tLSMtLS0tLS1YLVwiLCBcIi0tLS1YWFhYWC0tLS1YLVwiLCBcIiYtLS1YWFhYWC0tLS1YLVwiLCBcIi0tLS1YWFhYWC0tLS0jLVwiLCBcIi0tLS1YWFhYWC0tXl5eXlwiXSwgXCI1XzZfMlwiOiBbXCJYWFhYWFheXl4tLV5eXi1cIiwgXCJYWFhYWFheXl4tLV5eXi1cIiwgXCJYWFhYWFheXl4tLV5eXi1cIiwgXCJYWFhYWFheXl4tLV5eXi1cIiwgXCJYWFhYWFheXl4tLV5eXi1cIiwgXCJYWFhYWFheXl4tLV5eXi1cIiwgXCItLS0tWFheXl4tLV5eXi1cIiwgXCItLS0tLS1eXl4tLV5eXi1cIiwgXCJYWFhYLS0tLS0tLS0mLS1cIiwgXCJYWFhYWFgtLS0tLS0tLS1cIiwgXCJYWFhYWFheXl4tLV5eXi1cIl0sIFwiNl81XzBcIjogW1wiLS0tLS1YWFhYLS1eXl5eXCIsIFwiXFxcXFxcXFwtLS1YWFhYLS0tLS0tXCIsIFwiLy8tLS1YWFhYLS0tLVgtXCIsIFwiLS0tLS1YWFhYLS0tLVhYXCIsIFwiLS0tLS0tLS0tLS0tLVhYXCIsIFwiLS0tLS0tLS0tLS0tLSojXCIsIFwiLS0tLS0tLSotLS0tLVhYXCIsIFwiLS0tLS1YWFhYLS0tLVhYXCIsIFwiJi0tLS1YWFhYLS0tLVgtXCIsIFwiLS0tLS1YWFhYLS0tLS0tXCIsIFwiLS0tLS1YWFhYLS1eXl5eXCJdLCBcIjZfNV8xXCI6IFtcIi0tLS0tWFhYWC0tXl5eXlwiLCBcIlxcXFxcXFxcLS0tWFhYWC0tLS0tLVwiLCBcIi8vLS0tWFhYWC0tLS1YLVwiLCBcIi0tLS0tWFhYWC0tLS1YWFwiLCBcIi0tLS0tLS0tLS0tLS1YWFwiLCBcIi0tLS0tLS0tLS0tLS0qI1wiLCBcIi0tLS0tLS0qLS0tLS1YWFwiLCBcIi0tLS0tWFhYWC0tLS1YWFwiLCBcIiYtLS0tWFhYWC0tLS1YLVwiLCBcIi0tLS0tWFhYWC0tLS0tLVwiLCBcIi0tLS0tWFhYWC0tXl5eXlwiXSwgXCI2XzVfMlwiOiBbXCJYXl5YWFhYXl4tLS0tLS1cIiwgXCJYXl5YWFhYXl4tLS1eXl5cIiwgXCJYXl5YWFhYXl4tLS1eXl5cIiwgXCJYXl5YWFhYXl4tLS1eXl5cIiwgXCJYXl5YWFhYXl4tLS1eXl5cIiwgXCJYXl4tLS0tXl4tLS1eXl5cIiwgXCJYLS0tLS0tLS0tLS1eXl5cIiwgXCItLS1YWFhYLS0tLS1eXl5cIiwgXCItXl5YWFhYXl4tLS1eXl5cIiwgXCJYXl5YWFhYXl4tLS1eXl5cIiwgXCJYXl5YWFhYXl4tLS0tLS1cIl0sIFwiMV8xM18wXCI6IFtcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIlxcXFxcXFxcLS1YWFhYWFhYWFhYWFwiLCBcIi8vLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYLS0jWFhYWFwiLCBcIi0tLS1YWFhYLS0tWFhYWFwiLCBcIi0tLS0tLS0tLS0tLSotLVwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIiYtLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiXSwgXCIxXzEzXzFcIjogW1wiLS0tLVhYWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLVhYWFhYWFhYWFhYXCIsIFwiLy8tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFgtLSNYWFhYXCIsIFwiLS0tLVhYWFgtLS1YWFhYXCIsIFwiLS0tLS0tLS0tLS0tKi0tXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiJi0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCJdLCBcIjFfMTNfMlwiOiBbXCJYWFhYWFhYWFhYWFgtLS1cIiwgXCJYWFhYWFhYWFhYWFgtLS1cIiwgXCJYWFhYWFhYWFhYWFgtLS1cIiwgXCJYWFhYWFhYWFhYWFgtLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYWFhYWFhYLS0tLS0tLS1cIiwgXCJYWFhYWFhYLS0jLS0tLS1cIiwgXCJYWFhYWFhYWFhYWFgtLS1cIiwgXCJYWFhYWFhYWFhYWFgtLS1cIiwgXCJYWFhYWFhYWFhYWFgtLS1cIiwgXCJYWFhYWFhYWFhYWFgqLS1cIl0sIFwiMV8xNF8wXCI6IFtcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLSNYWFhYLVwiLCBcIi0tLS1YWFgtLS1YWFhYLVwiLCBcIi0tLS1YWFgtLS0tKi0tLVwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiXSwgXCIxXzE0XzFcIjogW1wiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tI1hYWFgtXCIsIFwiLS0tLVhYWC0tLVhYWFgtXCIsIFwiLS0tLVhYWC0tLS0qLS0tXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCJdLCBcIjFfMTJfMFwiOiBbXCItLS0tWFhYWFhYWFhYWFhcIiwgXCJcXFxcXFxcXC0tWFhYWFhYWFhYWFhcIiwgXCIvLy0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0jWFhYWC1cIiwgXCItLS0tLS0mLS0tWFhYWC1cIiwgXCItLS0tLS0tLS0tLSotLS1cIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCImLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIl0sIFwiMV8xMl8xXCI6IFtcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIlxcXFxcXFxcLS1YWFhYWFhYWFhYWFwiLCBcIi8vLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLSNYWFhYLVwiLCBcIi0tLS0tLSYtLS1YWFhYLVwiLCBcIi0tLS0tLS0tLS0tKi0tLVwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIiYtLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiXSwgXCIxXzEyXzJcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFgqJlhYWFhYWFhYWFhYXCIsIFwiWFgtLVhYWFhYWFhYWFgtXCIsIFwiWFgtLVhYWFhYWFhYWC0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0jLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiWFgtLVhYWFhYWFhYWC0tXCIsIFwiWFgtLVhYWFhYWFhYWFgtXCIsIFwiWFgtLVhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjJfMTNfMFwiOiBbXCItLS0tLVhYWFhYWFhYWFhcIiwgXCItLS0tLVhYWFhYWFhYWFhcIiwgXCJYLS0tLVhYWFhYWFhYWFhcIiwgXCJYWFgtLVhYWFhYWFhYWFhcIiwgXCItWFgtLS0tI1hYWFhYLS1cIiwgXCItWFgtLS0tLVhYWFhYLS1cIiwgXCItWFgtLS0tLS0qLS0tLS1cIiwgXCIjWFgtLVhYWFhYWFhYWFhcIiwgXCItWFgtLVhYWFhYWFhYWFhcIiwgXCItWFgtLVhYWFhYWFhYWFhcIiwgXCItWFgtLVhYWFhYWFhYWFhcIl0sIFwiMl8xM18xXCI6IFtcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIlgtLS0tWFhYWFhYWFhYWFwiLCBcIlhYWC0tWFhYWFhYWFhYWFwiLCBcIi1YWC0tLS0jWFhYWFgtLVwiLCBcIi1YWC0tLS0tWFhYWFgtLVwiLCBcIi1YWC0tLS0tLSotLS0tLVwiLCBcIiNYWC0tWFhYWFhYWFhYWFwiLCBcIi1YWC0tWFhYWFhYWFhYWFwiLCBcIi1YWC0tWFhYWFhYWFhYWFwiLCBcIi1YWC0tWFhYWFhYWFhYWFwiXSwgXCIyXzEzXzJcIjogW1wiWFhYWFhYLS1YWFhYWFhYXCIsIFwiWFhYWFhYLS1YWFhYWFhYXCIsIFwiWFhYWFhYLS1YWFhYWFhYXCIsIFwiWFhYWFhYLS1YWFhYWFhYXCIsIFwiWFhYWC0tLS0tLS0tLSNYXCIsIFwiWFhYWC0tLS0tLS0tLS1YXCIsIFwiLSotLS0tLS0tLSotLS0tXCIsIFwiWFhYWFhYLS1YWFhYWFhYXCIsIFwiWFhYWFhYLS1YWFhYWFhYXCIsIFwiWFhYWFhYLS1YWFhYWFhYXCIsIFwiWFhYWFhYLS1YWFhYWFhYXCJdLCBcIjBfMTNfMFwiOiBbXCItLS0tWFhYWFhYWFhYWFhcIiwgXCJcXFxcXFxcXC0tWFhYWFhYWFhYWFhcIiwgXCIvLy0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tWFhYWFhYWFhcIiwgXCItLS0tLS0tWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCImLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIl0sIFwiMF8xM18xXCI6IFtcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIlxcXFxcXFxcLS1YWFhYWFhYWFhYWFwiLCBcIi8vLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS1YWFhYWFhYWFwiLCBcIi0tLS0tLS1YWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIiYtLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiXSwgXCIwXzEzXzJcIjogW1wiWFhYWFhYWC0tLVhYWFhYXCIsIFwiWFhYWFhYWC0tLVhYWFhYXCIsIFwiWFhYWFhYWC0tLVhYWFhYXCIsIFwiWFhYWFhYWC0tLVhYWFhYXCIsIFwiWFhYWFgtLS0tLVhYWFhYXCIsIFwiWFhYWFgtLS0tLVhYLS0tXCIsIFwiLSotLS0tLS0tLS0tLS0tXCIsIFwiWFhYWFhYWC0tLS0tWFhYXCIsIFwiWFhYWFhYWC0tLVhYWFhYXCIsIFwiWFhYWFhYWC0tLVhYWFhYXCIsIFwiWFhYWFhYWC0tLVhYWFhYXCJdLCBcIjhfNl8wXCI6IFtcIi0tLS0tIy0tLV5eXl5eXlwiLCBcIi0tLS0tWFgtLS0tWC0tWFwiLCBcIlgtLS0tWFgtLS0tWC0tWFwiLCBcIlhYWC0tWFgtLS0tWC0tWFwiLCBcIi1YWC0tWFgtLS0tWC0tWFwiLCBcIi1YWC0tLS0tLS0tWC0jWFwiLCBcIi1YWC0tWFgtLS0tWC0tWFwiLCBcIiNYWC0tWFgtLS0tWC0tWFwiLCBcIi1YWC0tWFgtLS0tWC0tWFwiLCBcIi1YWC0tWFgtLS0tLS0tLVwiLCBcIi1YWC0tIy0tLV5eXl5eXlwiXSwgXCI4XzZfMVwiOiBbXCItLS0tLSMtLS1eXl5eXl5cIiwgXCItLS0tLVhYLS0tLVgtLVhcIiwgXCJYLS0tLVhYLS0tLVgtLVhcIiwgXCJYWFgtLVhYLS0tLVgtLVhcIiwgXCItWFgtLVhYLS0tLVgtLVhcIiwgXCItWFgtLS0tLS0tLVgtI1hcIiwgXCItWFgtLVhYLS0tLVgtLVhcIiwgXCIjWFgtLVhYLS0tLVgtLVhcIiwgXCItWFgtLVhYLS0tLVgtLVhcIiwgXCItWFgtLVhYLS0tLS0tLS1cIiwgXCItWFgtLSMtLS1eXl5eXl5cIl0sIFwiN181XzBcIjogW1wiLS0tLVhYWC0tXl5eXl5eXCIsIFwiXFxcXFxcXFwtLVhYWC0tLS0tLS0tXCIsIFwiLy8tLVhYWC0tLS0tLS1YXCIsIFwiLS0tLVhYWC0tLS0tLVhYXCIsIFwiLS0tLVhYWC0tLS0tWFhYXCIsIFwiLS0tLVhYWC0tLS0tWCMqXCIsIFwiLS0tLVhYWC0tLS0tWFhYXCIsIFwiLS0tLVhYWC0tLS0tLVhYXCIsIFwiJi0tLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLVhYWC0tXl5eXl5eXCJdLCBcIjdfNV8xXCI6IFtcIi0tLS1YWFgtLV5eXl5eXlwiLCBcIlxcXFxcXFxcLS1YWFgtLS0tLS0tLVwiLCBcIi8vLS1YWFgtLS0tLS1YLVwiLCBcIi0tLS1YWFgtLS0tLVhYLVwiLCBcIi0tLS1YWFgtLS0tWFhYLVwiLCBcIi0tLS1YWFgtLS0tWCMqLVwiLCBcIi0tLS1YWFgtLS0tWFhYLVwiLCBcIi0tLS1YWFgtLS0tLVhYLVwiLCBcIiYtLS0tLS0tLS0tLS1YLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS1YWFgtLV5eXl5eXlwiXSwgXCI2XzZfMFwiOiBbXCItLS0tWFhYWFgtLV5eXl5cIiwgXCJcXFxcXFxcXC0tWFhYWFgtLS0tLS1cIiwgXCIvLy0tWFhYWFgtLS0tWC1cIiwgXCItLS0tWFhYWFgtLS0tWFhcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCItLS0tLS0tLS0tLS0tKiNcIiwgXCItLS0tLS0jLS0tLS0tWFhcIiwgXCItLS0tWFhYWFgtLS0tWFhcIiwgXCImLS0tWFhYWFgtLS0tWC1cIiwgXCItLS0tWFhYWFgtLS0tLS1cIiwgXCItLS0tWFhYWFgtLV5eXl5cIl0sIFwiNl82XzFcIjogW1wiLS0tLVhYWFhYLS1eXl5eXCIsIFwiXFxcXFxcXFwtLVhYWFhYLS0tLS0tXCIsIFwiLy8tLVhYWFhYLS0tLVgtXCIsIFwiLS0tLVhYWFhYLS0tLVhYXCIsIFwiLS0tLS0tLS0tLS0tLVhYXCIsIFwiLS0tLS0tLS0tLS0tLSojXCIsIFwiLS0tLS0tIy0tLS0tLVhYXCIsIFwiLS0tLVhYWFhYLS0tLVhYXCIsIFwiJi0tLVhYWFhYLS0tLVgtXCIsIFwiLS0tLVhYWFhYLS0tLS0tXCIsIFwiLS0tLVhYWFhYLS1eXl5eXCJdLCBcIjZfNl8yXCI6IFtcIlhYWFhYWC0tXl4tLV4tLVwiLCBcIlhYWFhYWC0tXl4tLV4tLVwiLCBcIlhYWFhYWC0tXl4tLV4tLVwiLCBcIlhYWFhYWC0tXl4tLV5eXlwiLCBcIlhYWFgtLS0tLS0tLS0tLVwiLCBcIlhYWFgtLS0tXl4tLS0tLVwiLCBcIi0qLS0tLS0tLS0tLS0tLVwiLCBcIlhYWFhYWC0tXl4tLS0tLVwiLCBcIlhYWFhYWC0tXl4tLS0jLVwiLCBcIlhYWFhYWC0tXl4tLS0tLVwiLCBcIlhYWFhYWC0tXl4tLS0tLVwiXSwgXCIyXzNfMFwiOiBbXCItLS0tLS0jLS0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCItLS0jLS0tLS0tWC0tJi1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCIvXFxcXFxcXFwtLS1YWC0tWC0tLS1cIiwgXCJcXFxcLy8tLS1YWC0tWC0tLS1cIiwgXCItLS0tLS1YWC0tWC0tLS1cIiwgXCIqLS0tLS0jLS0tJi0tLS1cIl0sIFwiMl8zXzFcIjogW1wiLS0tLS0tIy0tLVgtLS0tXCIsIFwiLS0tLS0tWFgtLVgtLS0tXCIsIFwiLS0tLS0tWFgtLVgtLS0tXCIsIFwiLS0tLS0tWFgtLVgtLS0tXCIsIFwiLS0tLS0tWFgtLVgtLS0tXCIsIFwiLS0tIy0tLS0tLVgtLSYtXCIsIFwiLS0tLS0tWFgtLVgtLS0tXCIsIFwiL1xcXFxcXFxcLS0tWFgtLVgtLS0tXCIsIFwiXFxcXC8vLS0tWFgtLVgtLS0tXCIsIFwiLS0tLS0tWFgtLVgtLS0tXCIsIFwiKi0tLS0tIy0tLSYtLS0tXCJdLCBcIjJfM18yXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi0tXi0tLS0tLV4tLS0tLVwiLCBcIi0tXi0tLS0tLV4tLS0tLVwiLCBcIi0tLS0tLS0tLV4tLS0tI1wiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tJi0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tI1wiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIyXzJfMFwiOiBbXCItLS0tLS0jLS0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCItLS0jLS0tLS0tJi0tJi1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS1YWC0tLS0tLS1cIiwgXCJcXFxcLy8tLS1YWC0tLS0tLS1cIiwgXCItLS0tLS1YWC0tLS0tLS1cIiwgXCIqLS0tLS0jLS0tLS0tLS1cIl0sIFwiMl8yXzFcIjogW1wiLS0tLS0tIy0tLS0tLS0tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiLS0tIy0tLS0tLSYtLSYtXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tWFgtLS0tLS0tXCIsIFwiXFxcXC8vLS0tWFgtLS0tLS0tXCIsIFwiLS0tLS0tWFgtLS0tLS0tXCIsIFwiKi0tLS0tIy0tLS0tLS0tXCJdLCBcIjJfMl8yXCI6IFtcIl4tLV4tLS0tLS0tLS0tLVwiLCBcIl4tLS0tLS0tLS0tLS0tLVwiLCBcIl4tLS0tLSMtLS0tLS0tLVwiLCBcIl4tLS0tLS0tLVgtLS1YLVwiLCBcIi0tLS0tLS0tLVgtJi1YLVwiLCBcIl4tLS0tLS0tLVhYWFhYLVwiLCBcIi0tLS0tLS0tLVgtLS1YLVwiLCBcIl4tLS0tLS0tLVgtLS1YLVwiLCBcIl4tLS0tLS0tLS0tLS0tLVwiLCBcIl4tLS0tLS0vL1xcXFxcXFxcLS0tLVwiLCBcIl4tLV4tLS1cXFxcXFxcXC8vLS0tLVwiXSwgXCIwXzEwXzBcIjogW1wiLS0tLSMtLS1YWFhYWFhYXCIsIFwiXFxcXFxcXFwtLVhYLS1YWFhYWFhYXCIsIFwiLy8tLVhYLS1YWFhYWFhYXCIsIFwiLS0tLVhYLS1YWFhYWFhYXCIsIFwiLS0tLVhYLS1YWFhYWFhYXCIsIFwiLS0tLS0tLS1YWFhYWFhYXCIsIFwiLS0tLVhYLS1YWFhYWFhYXCIsIFwiLS0tLVhYLS0tLS0tWFhYXCIsIFwiJi0tLVhYLS0tLS0tWFhYXCIsIFwiLS0tLVhYLS1YWC0tLS0tXCIsIFwiLS0tLSMtLS1YWFhYWFhYXCJdLCBcIjBfMTBfMVwiOiBbXCItLS0tIy0tLVhYWFhYWFhcIiwgXCJcXFxcXFxcXC0tWFgtLVhYWFhYWFhcIiwgXCIvLy0tWFgtLVhYWFhYWFhcIiwgXCItLS0tWFgtLVhYWFhYWFhcIiwgXCItLS0tWFgtLVhYWFhYWFhcIiwgXCItLS0tLS0tLVhYWFhYWFhcIiwgXCItLS0tWFgtLVhYWFhYWFhcIiwgXCItLS0tWFgtLS0tLS1YWFhcIiwgXCImLS0tWFgtLS0tLS1YWFhcIiwgXCItLS0tWFgtLVhYLS0tLS1cIiwgXCItLS0tIy0tLVhYWFhYWFhcIl0sIFwiMF8xMF8yXCI6IFtcIi0tLS0mLS0tLSYtLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlhYWFhYWFhYWFhYWFgtLVwiLCBcIlhYWFhYWFhYWFhYWFgtLVwiLCBcIlhYWFhYWFhYWFhYWFgtLVwiLCBcIlhYWFhYWFhYWFhYWFgtLVwiLCBcIlgtLVhYWC0tWFhYLS0tLVwiLCBcIlgtLVhYWC0tWFhYLS0tWFwiLCBcIlgtLVhYWC0tWFhYLS0tWFwiLCBcIlgtLVhYWC0tWFhYLS0tLVwiLCBcIlgtLVhYWC0tWFhYLS0tLVwiXSwgXCIwXzExXzBcIjogW1wiLS0tLS1YWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLS1YWFhYWFhYWFhYXCIsIFwiLy8tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLVhYWFhYXCIsIFwiLS0tLS0tLSMtLVhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiJi0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCJdLCBcIjBfMTFfMVwiOiBbXCItLS0tLVhYWFhYWFhYWFhcIiwgXCJcXFxcXFxcXC0tLVhYWFhYWFhYWFhcIiwgXCIvLy0tLVhYWFhYWFhYWFhcIiwgXCItLS0tLVhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLVhYWFhcIiwgXCItLS0tLS0tKi0tLVhYWFhcIiwgXCItLS0tLVhYWFhYWFhYWFhcIiwgXCImLS0tLVhYWFhYWFhYWFhcIiwgXCItLS0tLVhYWFhYWFhYWFhcIiwgXCItLS0tLVhYWFhYWFhYWFhcIl0sIFwiMF8xMV8yXCI6IFtcIlhYWFhYWFhYLS1YWFhYWFwiLCBcIlhYWFhYWFgtLS1YWFhYWFwiLCBcIlgtLVhYLS0tLS1YWFhYWFwiLCBcIlgtLVhYLS0tLS1YWFhYWFwiLCBcIlgtLVhYLS0tLS1YWFhYWFwiLCBcIi0tLS0tLS0tLS1YWFhYWFwiLCBcIlgtLVhYLS0tLS1YWFgtLVwiLCBcIlgtLVhYLS0tLS0tLS0tLVwiLCBcIlgqJlhYLS0tLS0tLS1YWFwiLCBcIlhYWFhYWFgtLS1YWFhYWFwiLCBcIlhYWFhYWFhYLS1YWFhYWFwiXSwgXCIxXzEwXzBcIjogW1wiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tIy0tLS0mLS1YWFhYXCIsIFwiLS0tLS0tLS0tLS1YWFhYXCIsIFwiL1xcXFxcXFxcLS0tWFhYWFhYWFhYXCIsIFwiXFxcXC8vLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiKi0tLS0tWFhYWFhYWFhYXCJdLCBcIjFfMTBfMVwiOiBbXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0jLS0tLSYtLVhYWFhcIiwgXCItLS0tLS0tLS0tLVhYWFhcIiwgXCIvXFxcXFxcXFwtLS1YWFhYWFhYWFhcIiwgXCJcXFxcLy8tLS1YWFhYWFhYWFhcIiwgXCItLS0tLS1YWFhYWFhYWFhcIiwgXCIqLS0tLS1YWFhYWFhYWFhcIl0sIFwiMV8xMF8yXCI6IFtcIi0tLS0mLS0tLSMtLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlhYWFhYWFhYWCpYWFgtLVwiLCBcIlhYWFhYWFhYWFhYWFgtLVwiLCBcIlhYWFhYWFhYWFhYWFgtLVwiLCBcIlhYWFhYWFhYWFhYWFgtLVwiLCBcIlgtLVhYWC0tWFhYLS0tLVwiLCBcIlgtLVhYWC0tWFhYLS0tWFwiLCBcIlgtLVhYWC0tWFhYLS0tWFwiLCBcIlgtLVhYWC0tWFhYLS0tLVwiLCBcIlgtLVhYWC0tWFhYLS0tLVwiXSwgXCIzXzE0XzBcIjogW1wiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS0tLSNYWFhYLS0jWFhYXCIsIFwiLS0tLS1YWFhYLS0tWFhYXCIsIFwiLS0tLS0tKi0tLS0tLSotXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCJdLCBcIjNfMTRfMVwiOiBbXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLS0tI1hYWFgtLSNYWFhcIiwgXCItLS0tLVhYWFgtLS1YWFhcIiwgXCItLS0tLS0qLS0tLS0tKi1cIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIl0sIFwiM18xNV8wXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLSNYWFhYLS0jWFwiLCBcIi0tLSYtLS1YWFhYLS0tWFwiLCBcIi0tLS0tLS0tKi0tLS0tLVwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIiNYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIzXzE1XzFcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tI1hYWFgtLSNYXCIsIFwiLS0tJi0tLVhYWFgtLS1YXCIsIFwiLS0tLS0tLS0qLS0tLS0tXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiI1hYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjNfMTVfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0qLS0tKi0tLS1cIiwgXCJYWFgtLS0tLS0tLS0tLS1cIiwgXCJYWFgtLS0tIy0tLSMtLS1cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiM18xM18wXCI6IFtcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tI1hYWFhYLS0jWFwiLCBcIiMtLS0tLVhYWFhYLS0tWFwiLCBcIi0tLS0tLS0qLS0tLS0tLVwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiXSwgXCIzXzEzXzFcIjogW1wiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFgtLS0tLSNYWFhYXCIsIFwiIy0tWFgtLS0tLS1YWFhYXCIsIFwiLS0tLS0tLSotLS0tKi0tXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCJdLCBcIjRfMTRfMFwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0jWFhcIiwgXCItLS0mLS0tLS0tLS0tWFhcIiwgXCItLS0tLS0jLS0jLS0tLSpcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCIjWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiNF8xNF8xXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLSNYWFwiLCBcIi0tLSYtLS0tLS0tLS1YWFwiLCBcIi0tLS0tLSMtLSMtLS0tKlwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIiNYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIyXzE0XzBcIjogW1wiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWC0tLS0tI1hYWFgtXCIsIFwiLS1YWC0tLS0tLVhYWFgtXCIsIFwiLS0tLS0tKi0tLS0qLS0tXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCIsIFwiLS1YWFhYWFhYWFhYWFhYXCJdLCBcIjJfMTRfMVwiOiBbXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYLS0tLS0jWFhYWC1cIiwgXCItLVhYLS0tLS0tWFhYWC1cIiwgXCItLS0tLS0qLS0tLSotLS1cIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIiwgXCItLVhYWFhYWFhYWFhYWFhcIl0sIFwiMl8xNF8yXCI6IFtcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFgtLS0tLSNYWFhYLVwiLCBcIi0tWFgtLS0tLS1YWFhYLVwiLCBcIi0tLS0tLSotLS0tKi0tLVwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiLCBcIi0tWFhYWFhYWFhYWFhYWFwiXSwgXCIzXzdfMFwiOiBbXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS0tLSNYWFhcIiwgXCItLS0jLS0mLS0tLS1YWFhcIiwgXCItLS0tLS0tLS0tLS0tKi1cIiwgXCIvXFxcXFxcXFwtLS0tLS1YWFhYWFhcIiwgXCJcXFxcLy8tLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCIqLS0tLS0tLS1YWFhYWFhcIl0sIFwiM183XzFcIjogW1wiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0jWFhYXCIsIFwiLS0tIy0tJi0tLS0tWFhYXCIsIFwiLS0tLS0tLS0tLS0tLSotXCIsIFwiL1xcXFxcXFxcLS0tLS0tWFhYWFhYXCIsIFwiXFxcXC8vLS0tLS0tWFhYWFhYXCIsIFwiLS0tLS0tLS0tWFhYWFhYXCIsIFwiKi0tLS0tLS0tWFhYWFhYXCJdLCBcIjRfNl8wXCI6IFtcIi0tLS0tLS0tWC0tWFhYWFwiLCBcIi0tLS0tLS0tLS0tWFhYWFwiLCBcIi0tLS0tLS0tWC0tWFhYWFwiLCBcIi0tLS0tLS1YWC0tWFhYWFwiLCBcIi0tLS0tLVhYWC0tLS0qLVwiLCBcIi0tLSMtLVgjJi0tLS0tLVwiLCBcIi0tLS0tLVhYWC0tLS0tI1wiLCBcIi9cXFxcXFxcXC0tLS1YWC0tWFhYWFwiLCBcIlxcXFwvLy0tLS0tWC0tWFhYWFwiLCBcIi0tLS0tLS0tLS0tWFhYWFwiLCBcIiotLS0tLS0tWC0tWFhYWFwiXSwgXCI0XzZfMVwiOiBbXCItLS0tLS0tLVgtLVhYWFhcIiwgXCItLS0tLS0tLS0tLVhYWFhcIiwgXCItLS0tLS0tLVgtLVhYWFhcIiwgXCItLS0tLS0tWFgtLVhYWFhcIiwgXCItLS0tLS1YWFgtLS0tKi1cIiwgXCItLS0jLS1YIyYtLS0tLS1cIiwgXCItLS0tLS1YWFgtLS0tLSNcIiwgXCIvXFxcXFxcXFwtLS0tWFgtLVhYWFhcIiwgXCJcXFxcLy8tLS0tLVgtLVhYWFhcIiwgXCItLS0tLS0tLS0tLVhYWFhcIiwgXCIqLS0tLS0tLVgtLVhYWFhcIl0sIFwiN183XzBcIjogW1wiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS0tKi0tLS0tKi0tLSotXCIsIFwiLS1eXl4tLS0tLS0tLS0tXCIsIFwiLS0tJi0tLS0tLSMtLS0jXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCJdLCBcIjdfN18xXCI6IFtcIi0tXl5eLS1YWFhYWFhYWFwiLCBcIi0tXl5eLS1YWFhYWFhYWFwiLCBcIi0tXl5eLS1YWFhYWFhYWFwiLCBcIi0tXl5eLS1YWFhYWFhYWFwiLCBcIi0tLSotLS0tLSotLS0qLVwiLCBcIi0tXl5eLS0tLS0tLS0tLVwiLCBcIi0tLSYtLS0tLS0jLS0tI1wiLCBcIi0tXl5eLS1YWFhYWFhYWFwiLCBcIi0tXl5eLS1YWFhYWFhYWFwiLCBcIi0tXl5eLS1YWFhYWFhYWFwiLCBcIi0tXl5eLS1YWFhYWFhYWFwiXSwgXCI3XzdfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYLS1eXl5eXl5eXi1cIiwgXCJYWC0tLS0tLV5eXi0tLS1cIiwgXCJYWC0tLS0tLS0tLS0tLS1cIiwgXCJYWC0tLS0tLS0tLy9cXFxcXFxcXC1cIiwgXCItLS0tLS0tLS0tXFxcXFxcXFwvLy1cIiwgXCJYWC0tLS0tLS0tLS0tLS1cIiwgXCJYWC0tLS0tLS0tLS0tLS1cIiwgXCJYWC0tLS0tLV5eXi0tLS1cIiwgXCJYWFhYLS1eXl5eXl5eXi1cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiN184XzBcIjogW1wiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLS0qLS0tLS0qLS0tKi0tXCIsIFwiLV5eXi0tLS0tLS0tLS0tXCIsIFwiLS0mLS0tLS0tIy0tLSMtXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCJdLCBcIjdfOF8xXCI6IFtcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi0tKi0tLS0tKi0tLSotLVwiLCBcIi1eXl4tLS0tLS0tLS0tLVwiLCBcIi0tJi0tLS0tLSMtLS0jLVwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiLCBcIi1eXl4tLVhYWFhYWFhYWFwiXSwgXCI3XzZfMFwiOiBbXCItLS0tLVhYLS1eXl5eXl5cIiwgXCItLS0tLVhYLS0tLVgtLVhcIiwgXCJYLS0tLVhYLS0tLVgtLVhcIiwgXCJYWFgtLVhYLS0tLVgtLVhcIiwgXCItWFgtLS0tLS0tLVgtLVhcIiwgXCItWFgtLS0tLS0tLVgtI1hcIiwgXCItWFgtLS0tLS0tLVgtLVhcIiwgXCIjWFgtLVhYLS0tLVgtLVhcIiwgXCItWFgtLVhYLS0tLVgtLVhcIiwgXCItWFgtLVhYLS0tLS0tLS1cIiwgXCItWFgtLVhYLS1eXl5eXl5cIl0sIFwiN182XzFcIjogW1wiLS0tLS1YWC0tXl5eXl5eXCIsIFwiLS0tLS1YWC0tLS1YLS1YXCIsIFwiWC0tLS1YWC0tLS1YLS1YXCIsIFwiWFhYLS1YWC0tLS1YLS1YXCIsIFwiLVhYLS0tLS0tLS1YLS1YXCIsIFwiLVhYLS0tLS0tLS1YLSNYXCIsIFwiLVhYLS0tLS0tLS1YLS1YXCIsIFwiI1hYLS1YWC0tLS1YLS1YXCIsIFwiLVhYLS1YWC0tLS1YLS1YXCIsIFwiLVhYLS1YWC0tLS0tLS0tXCIsIFwiLVhYLS1YWC0tXl5eXl5eXCJdLCBcIjdfNl8yXCI6IFtcIlhYWFhYWC0tXl5eXl5eXlwiLCBcIlhYWFhYWC0tLS0tLS0qLVwiLCBcIlhYWFhYWC0tLS0tLS0tLVwiLCBcIlhYWFhYWC0tLS0tLV5eXlwiLCBcIi0tLS0tLS0tLS1eXl5eXlwiLCBcIlhYWFgtLS0tLS0tLS0mLVwiLCBcIlhYWFgtLS0tLS1eXl5eXlwiLCBcIlhYWFhYWC0tLS0tLV5eXlwiLCBcIlhYWFhYWC0tLS0tLS0tLVwiLCBcIlhYWFhYWC0tLS0tLS0qLVwiLCBcIlhYWFhYWC0tXl5eXl5eXlwiXSwgXCI4XzdfMFwiOiBbXCJYWFhYWFgtLV5eXl5eXl5cIiwgXCItWFhYWFgtLS0tLVgtLVhcIiwgXCItWFhYWFgtLS0tLVgtLVhcIiwgXCItWFhYWFgtLS0tLVgtLVhcIiwgXCItLS0tLS0tLS0tLVgtLVhcIiwgXCItLS0mLS0tLS0tLVgtI1hcIiwgXCItLS0tLS0tLS0tLVgtLVhcIiwgXCItWFhYWFgtLS0tLVgtLVhcIiwgXCItWFhYWFgtLS0tLVgtLVhcIiwgXCIjWFhYWFgtLS0tLS0tLS1cIiwgXCJYWFhYWFgtLV5eXl5eXl5cIl0sIFwiOF83XzFcIjogW1wiWFhYWFhYLS1eXl5eXl5eXCIsIFwiLVhYWFhYLS0tLS1YLS1YXCIsIFwiLVhYWFhYLS0tLS1YLS1YXCIsIFwiLVhYWFhYLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tJi0tLS0tLS1YLSNYXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLVhYWFhYLS0tLS1YLS1YXCIsIFwiLVhYWFhYLS0tLS1YLS1YXCIsIFwiI1hYWFhYLS0tLS0tLS0tXCIsIFwiWFhYWFhYLS1eXl5eXl5eXCJdLCBcIjZfN18wXCI6IFtcIi0tLS0tXl5eLS1YWFhYWFwiLCBcIi0tLS0tXl5eLS1YWFhYWFwiLCBcIlgtLS0tXl5eLS1YWFhYWFwiLCBcIlhYWC0tXl5eLS1YWFhYWFwiLCBcIi1YWC0tLSotLS0tLSNYWFwiLCBcIi1YWC0tXl5eLS0tLS1YWFwiLCBcIi1YWC0tLSYtLS0tLS0tKlwiLCBcIiNYWC0tXl5eLS1YWFhYWFwiLCBcIi1YWC0tXl5eLS1YWFhYWFwiLCBcIi1YWC0tXl5eLS1YWFhYWFwiLCBcIi1YWC0tXl5eLS1YWFhYWFwiXSwgXCI2XzdfMVwiOiBbXCItLS0tLV5eXi0tWFhYWFhcIiwgXCItLS0tLV5eXi0tWFhYWFhcIiwgXCJYLS0tLV5eXi0tWFhYWFhcIiwgXCJYWFgtLV5eXi0tWFhYWFhcIiwgXCItWFgtLS0qLS0tLS0jWFhcIiwgXCItWFgtLV5eXi0tLS0tWFhcIiwgXCItWFgtLS0mLS0tLS0tLSpcIiwgXCIjWFgtLV5eXi0tWFhYWFhcIiwgXCItWFgtLV5eXi0tWFhYWFhcIiwgXCItWFgtLV5eXi0tWFhYWFhcIiwgXCItWFgtLV5eXi0tWFhYWFhcIl0sIFwiNl83XzJcIjogW1wiWFhYWFhYLS1eXl5eXl5eXCIsIFwiWFhYWFhYLS0tLSYtLS0tXCIsIFwiWFhYWFhYLS0tLVgtLS0tXCIsIFwiWFhYWFhYLS0tLVgtLS0tXCIsIFwiLS0tLS0tLS0tLVgtLS0tXCIsIFwiWFhYWC0tLS0tLVgtLS0tXCIsIFwiWFhYWC0tLS0tLVgtLS0tXCIsIFwiWFhYWFhYLS0tLVgtLS0tXCIsIFwiWFhYWFhYLS0tLVgtLS0tXCIsIFwiWFhYWFhYLS0tLVgtLS0tXCIsIFwiWFhYWFhYLS1eXl5eXl5eXCJdLCBcIjEwXzJfMFwiOiBbXCItLS0tLS0tXl5eXl5eXl5cIiwgXCItLS0tLS0tLS1eLS0tLS1cIiwgXCItLS0tLS0tLS1eLS0tLVhcIiwgXCItLS0tLS0tLS1eLS0tWFhcIiwgXCItLS0tLS0tLS1eLS1YWFhcIiwgXCItLS0jLS0tLS0tLS1YIypcIiwgXCItLS0tLS0tLS0mLS1YWFhcIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tWFhcIiwgXCJcXFxcLy8tLS0tLS0tLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIqLS0tLS0tXl5eXl5eXl5cIl0sIFwiMTBfMl8xXCI6IFtcIi0tLS0tLS1eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLV4tLS0tLVwiLCBcIi0tLS0tLS0tLV4tLS0tWFwiLCBcIi0tLS0tLS0tLV4tLS1YWFwiLCBcIi0tLS0tLS0tLV4tLVhYWFwiLCBcIi0tLSMtLS0tLS0tLVgjKlwiLCBcIi0tLS0tLS0tLSYtLVhYWFwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS1YWFwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiotLS0tLS1eXl5eXl5eXlwiXSwgXCIxMF8wXzBcIjogW1wiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS1eLS0tLS0qXCIsIFwiLS0tLS0tLS1eLS0tLS0tXCIsIFwiLS0tLS0tLS1eLS0tLV5eXCIsIFwiLS0tLS0tLS1eLS1eXl5eXCIsIFwiLS0tIy0tLS0tLS0tLS0mXCIsIFwiLS0tLS0tLS0mLS1eXl5eXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLV5eXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0qXCIsIFwiKi0tLS0tXl5eXl5eXl5eXCJdLCBcIjEwXzBfMVwiOiBbXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLV4tLS0tLSpcIiwgXCItLS0tLS0tLV4tLS0tLS1cIiwgXCItLS0tLS0tLV4tLS0tXl5cIiwgXCItLS0tLS0tLV4tLV5eXl5cIiwgXCItLS0jLS0tLS0tLS0tLSZcIiwgXCItLS0tLS0tLSYtLV5eXl5cIiwgXCIvXFxcXFxcXFwtLS0tLS0tLS0tXl5cIiwgXCJcXFxcLy8tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLSpcIiwgXCIqLS0tLS1eXl5eXl5eXl5cIl0sIFwiMTFfMV8wXCI6IFtcIi0tLS0tLV5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS1eLS0tLVwiLCBcIi0tLS0tLS0tLS1eLS1YLVwiLCBcIi0tLS0tLS0tLS1eLS1YWFwiLCBcIi0tLS0tLS0tLS1eLS1YWFwiLCBcIi0tLSMtLS0tLS0tLS0qI1wiLCBcIi0tLS0tLS0tLS0mLS1YWFwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS1YWFwiLCBcIlxcXFwvLy0tLS0tLS0tLS1YLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiotLS0tLV5eXl5eXl5eXlwiXSwgXCIxMV8xXzFcIjogW1wiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLV4tLS0tXCIsIFwiLS0tLS0tLS0tLV4tLVgtXCIsIFwiLS0tLS0tLS0tLV4tLVhYXCIsIFwiLS0tLS0tLS0tLV4tLVhYXCIsIFwiLS0tIy0tLS0tLS0tLSojXCIsIFwiLS0tLS0tLS0tLSYtLVhYXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLVhYXCIsIFwiXFxcXC8vLS0tLS0tLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tXl5eXl5eXl5eXCJdLCBcIjExXzFfMlwiOiBbXCJeXl5eXl5eLS0tLV4tLS1cIiwgXCItLS0tLS0tLS1eLSotXi1cIiwgXCItLS0tWC0tLS0tLV4tLS1cIiwgXCItLS1YWC0tLS1eLS0tXi1cIiwgXCItLVhYWC0tLS0tLV4tLS1cIiwgXCItLVgjKi0tLS1eLSYtXi1cIiwgXCItLVhYWC0tLS0tLV4tLS1cIiwgXCItLS1YWC0tLS1eLS0tXi1cIiwgXCItLS0tWC0tLS0tLV4tLS1cIiwgXCItLS0tLS0tLS1eLSotXi1cIiwgXCJeXl5eXl5eLS0tLV4tLS1cIl0sIFwiMV85XzBcIjogW1wiWFgtLVhYWC0tLS0tLS0tXCIsIFwiWFgtLVhYWC0tLS0tLS0tXCIsIFwiWFgtLVhYWC0tLVhYLS0tXCIsIFwiWFgtLVhYWC0tLVhYWFgtXCIsIFwiWFgtLVhYWC0tLS0tWFgtXCIsIFwiWFhYWFhYWFhYLS0tWFgtXCIsIFwiWFhYWFhYWFhYLS0tWFgtXCIsIFwiWFhYWFhYWFhYLS0tWFgtXCIsIFwiKlhYWFhYWFhYLS0tWFgtXCIsIFwiLS0tLS0tLS0tLS0tWFgtXCIsIFwiIy0tLS0mLS0tLS0tWFgtXCJdLCBcIjFfOV8xXCI6IFtcIlhYLS1YWFgtLS0tLS0tLVwiLCBcIlhYLS1YWFgtLS0tLS0tLVwiLCBcIlhYLS1YWFgtLS1YWC0tLVwiLCBcIlhYLS1YWFgtLS1YWFhYLVwiLCBcIlhYLS1YWFgtLS0tLVhYLVwiLCBcIlhYWFhYWFhYWC0tLVhYLVwiLCBcIlhYWFhYWFhYWC0tLVhYLVwiLCBcIlhYWFhYWFhYWC0tLVhYLVwiLCBcIipYWFhYWFhYWC0tLVhYLVwiLCBcIi0tLS0tLS0tLS0tLVhYLVwiLCBcIiMtLS0tJi0tLS0tLVhYLVwiXSwgXCIxXzlfMlwiOiBbXCItLVhYLS0tLS0tJi0tLS1cIiwgXCItLVhYLS0tLS0tLS0tLS1cIiwgXCItLVhYLS0tWFhYWFhYWFhcIiwgXCItI1hYIy0tWFhYWFhYWFhcIiwgXCItLVhYLS0tWFhYWFhYWFhcIiwgXCItLVhYLS0tWFhYWFhYWFhcIiwgXCItLVhYLS0tLS1YWFgtLVhcIiwgXCJYWFhYWFgtLS1YWFgtLVhcIiwgXCJYWC0tWFgtLS1YWFgtLVhcIiwgXCItLS0tLS0tLS1YWFgtLVhcIiwgXCItLS0tLS0tLS1YWFgtLVhcIl0sIFwiMl84XzBcIjogW1wiWFgtLVhYWC0tLS0tLS0tXCIsIFwiWFgtLVhYWC0tLS0tLS0tXCIsIFwiWFgtLVhYWC0tLVhYLS0tXCIsIFwiWFgtLVhYWC0tLVhYLSMtXCIsIFwiWFgtLVhYWC0tLS0tLS0tXCIsIFwiWFhYWFhYWFhYLS0tLVhYXCIsIFwiWFhYWFhYWFhYLS0tLVhYXCIsIFwiWFhYWFhYWFhYLS0tLVhYXCIsIFwiKlhYWFhYWFhYLS0tLVhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiIy0tLS0mLS0tLS0tLS0tXCJdLCBcIjJfOF8xXCI6IFtcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYKiZYWFhYWFwiLCBcIi0tLS0tLVhYLS1YWFhYWFwiLCBcIi0tLS0tLVhYLS1YWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSMtLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLVhYLS1YWFhYWFwiLCBcIlxcXFwvLy0tLVhYLS1YWFhYWFwiLCBcIi0tLS0tLVhYLS1YWFhYWFwiLCBcIiotLS0tLVhYWFhYWFhYWFwiXSwgXCIwXzNfMFwiOiBbXCItLS0tIy0tLVgtLS0tLS1cIiwgXCJcXFxcXFxcXC0tWFgtLVgtLS0tLS1cIiwgXCIvLy0tWFgtLVgtLS0tLS1cIiwgXCItLS0tWFgtLVgtLS0tLS1cIiwgXCItLS0tWFgtLVgtLS0tLS1cIiwgXCItLS0tLS0tLVgtLSYtLSZcIiwgXCItLS0tWFgtLVgtLS0tLS1cIiwgXCItLS0tWFgtLVgtLS0tLS1cIiwgXCImLS0tWFgtLVgtLS0tLS1cIiwgXCItLS0tWFgtLVgtLS0tLS1cIiwgXCItLS0tIy0tLSYtLS0tLS1cIl0sIFwiMF8zXzFcIjogW1wiLS0tLSMtLS1YLS0tLS0tXCIsIFwiXFxcXFxcXFwtLVhYLS1YLS0tLS0tXCIsIFwiLy8tLVhYLS1YLS0tLS0tXCIsIFwiLS0tLVhYLS1YLS0tLS0tXCIsIFwiLS0tLVhYLS1YLS0tLS0tXCIsIFwiLS0tLS0tLS1YLS0mLS0mXCIsIFwiLS0tLVhYLS1YLS0tLS0tXCIsIFwiLS0tLVhYLS1YLS0tLS0tXCIsIFwiJi0tLVhYLS1YLS0tLS0tXCIsIFwiLS0tLVhYLS1YLS0tLS0tXCIsIFwiLS0tLSMtLS0mLS0tLS0tXCJdLCBcIjBfM18yXCI6IFtcIlgtLS0tLS0tLS0tLS1YWFwiLCBcIlgtLS1eLS0mLS0tLS1YWFwiLCBcIi0tLS0tLS0tLS0tLS1YWFwiLCBcIi0tLS1eLS0tLS0tLS1YWFwiLCBcIlgtLS0tLS0tLS0tLS1YWFwiLCBcIlgtLS1eLS0tLS0tLS0tLVwiLCBcIlgtLS0tLS0tLS0tLS0tJlwiLCBcIlgtLS1eLS0tLS0mLS1YWFwiLCBcIlgtLS0tLS0tLS0tLS1YWFwiLCBcIlgtLS1eLS0tLS0tLS1YWFwiLCBcIlgtLS0tLS0tLS0tLS1YWFwiXSwgXCIzXzhfMFwiOiBbXCJYWC0tLS0tLS0tWFhYLS1cIiwgXCJYWC0tLS0tLS0tWFhYLS1cIiwgXCJYWC0tLVhYLS0tWFhYLS1cIiwgXCJYWC0jLVhYLSMtWFhYLS1cIiwgXCJYWC0tLS0tLS0tWFhYLS1cIiwgXCJYWFhYLS0tLVhYWFhYWFhcIiwgXCJYWFhYLS0tLVhYWFhYWFhcIiwgXCJYWFhYLS0tLVhYWFhYWFhcIiwgXCIqWFhYLS0tLVhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIjLS0tLS0tLS0tLSYtLS1cIl0sIFwiM184XzFcIjogW1wiWFgtLS0tLS0tLVhYWC0tXCIsIFwiWFgtLS0tLS0tLVhYWC0tXCIsIFwiWFgtLS1YWC0tLVhYWC0tXCIsIFwiWFgtIy1YWC0jLVhYWC0tXCIsIFwiWFgtLS0tLS0tLVhYWC0tXCIsIFwiWFhYWC0tLS1YWFhYWFhYXCIsIFwiWFhYWC0tLS1YWFhYWFhYXCIsIFwiWFhYWC0tLS1YWFhYWFhYXCIsIFwiKlhYWC0tLS1YWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiIy0tLS0tLS0tLS0mLS0tXCJdLCBcIjRfOV8wXCI6IFtcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIlxcXFxcXFxcLS1YWFhYWFhYWFgtLVwiLCBcIi8vLS1YWFhYWFhYWFgtLVwiLCBcIi0tLS1YWFhYWFhYWFgtLVwiLCBcIi0tLS0tLSotLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0jLS0jLS0tLVwiLCBcIi0tLS1YWFhYWFhYWFgtLVwiLCBcIiYtLS1YWFhYWFhYWFgtLVwiLCBcIi0tLS1YWFhYWFhYWFgqI1wiLCBcIi0tLS1YWFhYWFhYWFhYWFwiXSwgXCI0XzlfMVwiOiBbXCItLS0tLS0tWFhYWFhYWFhcIiwgXCItLS0tLS0tWFhYWFhYWFhcIiwgXCJYLS0tLS0tWFhYWFhYWFhcIiwgXCJYWFgtLS0tWFhYWFhYWFhcIiwgXCItWFgtLS0tLS0qLS0tKi1cIiwgXCItWFgtLS0tLS0tLS0tLS1cIiwgXCItWFgtLS0tLS0tIy0tLSNcIiwgXCIjWFgtLS0tWFhYWFhYWFhcIiwgXCItWFgtLS0tWFhYWFhYWFhcIiwgXCItWFgtLS0tWFhYWFhYWFhcIiwgXCItWFgtLS0tWFhYWFhYWFhcIl0sIFwiNF85XzJcIjogW1wiWFhYWF5eXl5eWFhYWFgtXCIsIFwiWFhYWF5eXl5eWFhYWFgtXCIsIFwiLS0tLV5eXl5eWFhYWFgtXCIsIFwiLS0tLS0tLS0tWFhYWFgtXCIsIFwiWFhYWC0tLS0tLS1YWFgtXCIsIFwiWFhYWF5eXl5eLS0tLS0tXCIsIFwiWFhYWF5eXl5eWFgtLS0tXCIsIFwiWFhYWF5eXl5eWFhYWFgtXCIsIFwiWFhYWF5eXl5eWFhYWFgtXCIsIFwiWFhYWF5eXl5eWFhYWFgtXCIsIFwiWFhYWF5eXl5eWFhYWFgtXCJdLCBcIjJfOV8wXCI6IFtcIlhYLS1YWFgtLS0tLS0tLVwiLCBcIlhYLS1YWFgtLS0tLS0tLVwiLCBcIlhYLS1YWFgtLS1YWC0tLVwiLCBcIlhYLS1YWFgtIy1YWFhYLVwiLCBcIlhYLS1YWFgtLS0tLVhYLVwiLCBcIlhYWFhYWFhYWC0tLVhYLVwiLCBcIlhYWFhYWFhYWC0tLVhYLVwiLCBcIlhYWFhYWFhYWC0tLVhYLVwiLCBcIipYWFhYWFhYWC0tLVhYLVwiLCBcIi0tLS0tLS0tLS0tLVhYLVwiLCBcIiMtLS0tJi0tLS0tLVhYLVwiXSwgXCIyXzlfMVwiOiBbXCJYWC0tWFhYLS0tLS0tLS1cIiwgXCJYWC0tWFhYLS0tLS0tLS1cIiwgXCJYWC0tWFhYLS0tWFgtLS1cIiwgXCJYWC0tWFhYLSMtWFhYWC1cIiwgXCJYWC0tWFhYLS0tLS1YWC1cIiwgXCJYWFhYWFhYWFgtLS1YWC1cIiwgXCJYWFhYWFhYWFgtLS1YWC1cIiwgXCJYWFhYWFhYWFgtLS1YWC1cIiwgXCIqWFhYWFhYWFgtLS1YWC1cIiwgXCItLS0tLS0tLS0tLS1YWC1cIiwgXCIjLS0tLSYtLS0tLS1YWC1cIl0sIFwiOF8yXzBcIjogW1wiLS0tLS0tLS0tXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tIy0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLy9cXFxcXCIsIFwiXFxcXC8vLS0tLS0tLS0tXFxcXFxcXFwvXCIsIFwiLS0tLS0tKi0tLS0tLS0tXCIsIFwiKi0tLS0tLS0tXl5eXl5eXCJdLCBcIjhfMl8xXCI6IFtcIi0tLS0tLS0tLV5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSMtLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS8vXFxcXFwiLCBcIlxcXFwvLy0tLS0tLS0tLVxcXFxcXFxcL1wiLCBcIi0tLS0tLSotLS0tLS0tLVwiLCBcIiotLS0tLS0tLV5eXl5eXlwiXSwgXCI4XzJfMlwiOiBbXCJeWFheXl5eXl4tLV5eXi1cIiwgXCJeLS1eXl5eXl4tLV5eXi1cIiwgXCItLS0tLS0tLS0tLV5eXi1cIiwgXCItWFgtLS0tLS0tLV5eXi1cIiwgXCJeWFheXl5eXl4tLS0mLS1cIiwgXCJeWFheXl5eXl4tLS0tLS1cIiwgXCJeWFheXl5eXl4tLV5eXi1cIiwgXCJeWFheXl5eXl4tLV5eXi1cIiwgXCJeWFheXl5eXl4tLV5eXi1cIiwgXCJeWFheXl5eXl4tLV5eXi1cIiwgXCJeWFheXl5eXl4tLV5eXi1cIl0sIFwiMF8yXzBcIjogW1wiLS0tLSMtLS0tLS0tLS0tXCIsIFwiXFxcXFxcXFwtLVhYLS0tLS0tLS0tXCIsIFwiLy8tLVhYLS0tLS0tLS0tXCIsIFwiLS0tLVhYLS0tLS0tLS0tXCIsIFwiLS0tLVhYLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0mLS0mLS0mXCIsIFwiLS0tLVhYLS0tLS0tLS0tXCIsIFwiLS0tLVhYLS0tLS0tLS0tXCIsIFwiJi0tLVhYLS0tLS0tLS0tXCIsIFwiLS0tLVhYLS0tLS0tLS0tXCIsIFwiLS0tLSMtLS0tLS0tLS0tXCJdLCBcIjBfMl8xXCI6IFtcIi0tLS0jLS0tLS0tLS0tLVwiLCBcIlxcXFxcXFxcLS1YWC0tLS0tLS0tLVwiLCBcIi8vLS1YWC0tLS0tLS0tLVwiLCBcIi0tLS1YWC0tLS0tLS0tLVwiLCBcIi0tLS1YWC0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tJi0tJi0tJlwiLCBcIi0tLS1YWC0tLS0tLS0tLVwiLCBcIi0tLS1YWC0tLS0tLS0tLVwiLCBcIiYtLS1YWC0tLS0tLS0tLVwiLCBcIi0tLS1YWC0tLS0tLS0tLVwiLCBcIi0tLS0jLS0tLS0tLS0tLVwiXSwgXCIwXzJfMlwiOiBbXCJeLS0tLS0tLS0tLS1YWFhcIiwgXCItLS0tLS0vL1xcXFxcXFxcLS0tWFhcIiwgXCItLS0tLS1cXFxcXFxcXC8vLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tJi0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLSYtLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCJeLS0tLS0tLS0tLS1YWFhcIl0sIFwiMV8yXzBcIjogW1wiLS0tLS0tLS0tLS0tWFgtXCIsIFwiLS0tLS0tLS0tLS0tWFgtXCIsIFwiLS0tLS0tLS0tLS0tWFgtXCIsIFwiLS0tLS0tLS0tLS0tWFgtXCIsIFwiLS0tLS0tLS0tLS0tWFgtXCIsIFwiLS0tIy0tJi0tJi0tWFgtXCIsIFwiLS0tLS0tLS0tLS0tWFgtXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tWFhYXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tLS0tLS0tLS0tXCJdLCBcIjFfMl8xXCI6IFtcIi0tLS0tLS0tLS0tLVhYLVwiLCBcIi0tLS0tLS0tLS0tLVhYLVwiLCBcIi0tLS0tLS0tLS0tLVhYLVwiLCBcIi0tLS0tLS0tLS0tLVhYLVwiLCBcIi0tLS0tLS0tLS0tLVhYLVwiLCBcIi0tLSMtLSYtLSYtLVhYLVwiLCBcIi0tLS0tLS0tLS0tLVhYLVwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLVhYWFwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiotLS0tLS0tLS0tLS0tLVwiXSwgXCIxNF8zXzBcIjogW1wiLS0tXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLVhYLS1YLS1YXCIsIFwiLS0tLS0tWFhYLS1YLS1YXCIsIFwiIy0tLS0tWCMqLS1YLSNYXCIsIFwiLS0tLS0tWFhYLS1YLS1YXCIsIFwiLS0tLS0tLVhYLS1YLS1YXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tXl5eXl5eXl5eXl5eXCJdLCBcIjE0XzNfMVwiOiBbXCItLS1eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tWFgtLVgtLVhcIiwgXCItLS0tLS1YWFgtLVgtLVhcIiwgXCIjLS0tLS1YIyotLVgtI1hcIiwgXCItLS0tLS1YWFgtLVgtLVhcIiwgXCItLS0tLS0tWFgtLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS1eXl5eXl5eXl5eXl5cIl0sIFwiMTRfM18yXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlgtLS0tWFhYLS0tLS0tLVwiLCBcIlheLS0tWCpYLS0tXl5eXlwiLCBcIlheXi0tWCYtLS0tLS0tLVwiLCBcIlheLS0tWCpYLS0tXl5eXlwiLCBcIlgtLS0tWFhYLS0tLS0tLVwiLCBcIi8vXFxcXFxcXFwvL1xcXFxcXFxcLS0tLS0tLVwiLCBcIlxcXFxcXFxcLy9cXFxcXFxcXC8vLS0tLS0tLVwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxM18yXzBcIjogW1wiLS0tLV5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tXi0tLS0tLS0tXCIsIFwiLS0tLS0tXi0tLS1YLS1YXCIsIFwiLS0tLS0tXi0tLVhYLS1YXCIsIFwiLS0tLS0tXi0tWFhYLS1YXCIsIFwiIy0tLS0tLS0tWCMqLS0qXCIsIFwiLS0tLS0tJi0tWFhYLS1YXCIsIFwiLS0tLS0tLS0tLVhYLS1YXCIsIFwiLS0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLV5eXl5eXl5eXl5eXCJdLCBcIjEzXzJfMVwiOiBbXCItLS0tXl5eXl5eXl5eXl5cIiwgXCItLS0tLS1eLS0tLS0tLS1cIiwgXCItLS0tLS1eLS0tLVgtLVhcIiwgXCItLS0tLS1eLS0tWFgtLVhcIiwgXCItLS0tLS1eLS1YWFgtLVhcIiwgXCIjLS0tLS0tLS1YIyotLSpcIiwgXCItLS0tLS0mLS1YWFgtLVhcIiwgXCItLS0tLS0tLS0tWFgtLVhcIiwgXCItLS0tLS0tLS0tLVgtLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tXl5eXl5eXl5eXl5cIl0sIFwiNF84XzBcIjogW1wiWFgtLS0tLS0tLVhYWC0tXCIsIFwiWFgtLS0tLS0tLVhYWC0tXCIsIFwiWFgtLS1YWC0tLVhYWC0tXCIsIFwiWFgtIy1YWC0jLVhYWC0jXCIsIFwiWFgtLS0tLS0tLVhYWC0tXCIsIFwiWFhYWC0tLS1YWFhYWFhYXCIsIFwiWFhYWC0tLS1YWFhYWFhYXCIsIFwiWFhYWC0tLS1YWFhYWFhYXCIsIFwiKlhYWC0tLS1YWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiIy0tLS0tLS0tLS0mLS0tXCJdLCBcIjRfOF8xXCI6IFtcIlhYLS0tLS0tLS1YWFgtLVwiLCBcIlhYLS0tLS0tLS1YWFgtLVwiLCBcIlhYLS0tWFgtLS1YWFgtLVwiLCBcIlhYLSMtWFgtIy1YWFgtI1wiLCBcIlhYLS0tLS0tLS1YWFgtLVwiLCBcIlhYWFgtLS0tWFhYWFhYWFwiLCBcIlhYWFgtLS0tWFhYWFhYWFwiLCBcIlhYWFgtLS0tWFhYWFhYWFwiLCBcIipYWFgtLS0tWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiMtLS0tLS0tLS0tJi0tLVwiXSwgXCI0XzhfMlwiOiBbXCJYWFhYWF5eXi0tXl5YWFhcIiwgXCJYWFhYWF5eXi0tXl5YWFhcIiwgXCJYLS1YWF5eXi0tXl5YWFhcIiwgXCItLS0tLV5eXi0tXl5YWFhcIiwgXCItWFgtLS0tLS0tXl5YWFhcIiwgXCJYWFhYWC0tLS0tXl5YWFhcIiwgXCJYWFhYWF5eXi0tXl5YWFhcIiwgXCJYWFhYWF5eXi0tXl4tLS1cIiwgXCJYWFhYWF5eXi0tLS0tLS1cIiwgXCJYWFhYWF5eXi0tLS1YWFhcIiwgXCJYWFhYWF5eXi0tXl5YWFhcIl0sIFwiMF8xNF8wXCI6IFtcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIiYtLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYLS0tLS0tLS0tLVwiLCBcIi0tLVhYLS1YWFhYWFhYWFwiLCBcIi0tLS0tLS1YWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiXSwgXCIwXzE0XzFcIjogW1wiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiJi0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFgtLS0tLS0tLS0tXCIsIFwiLS0tWFgtLVhYWFhYWFhYXCIsIFwiLS0tLS0tLVhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCJdLCBcIjBfMTRfMlwiOiBbXCJYWFhYWFhYLS1YWFhYWFhcIiwgXCJYWFhYWFhYLS1YWFhYWFhcIiwgXCJYWFhYWFhYLS1YWFhYWFhcIiwgXCJYWFhYWFhYLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCJYWFhYWC0tLS1YWFhYWFhcIiwgXCJYWFhYWC0tLS0tLS0tLS1cIiwgXCJYWFhYWFhYLS0tLS0tLS1cIiwgXCJYWFhYWFhYLS1YWFhYWFhcIiwgXCJYWFhYWFhYLS1YWFhYWFhcIiwgXCJYWFhYWFhYLS1YWFhYWFhcIl0sIFwiMF8xMl8wXCI6IFtcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIlxcXFxcXFxcLS0tWFhYWFhYWFhYWFwiLCBcIi8vLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS1YWFhYWFhYWFwiLCBcIi0tLS0tLS1YWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIiYtLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiXSwgXCIwXzEyXzFcIjogW1wiLS0tLS1YWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLS1YWFhYWFhYWFhYXCIsIFwiLy8tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLVhYWFhYWFhYXCIsIFwiLS0tLS0tLVhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiJi0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCIsIFwiLS0tLS1YWFhYWFhYWFhYXCJdLCBcIjBfMTJfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItWFgtLS0tLS0tWFgqJlhcIiwgXCItWFgtLVhYWC0tWFgtLVhcIiwgXCItWFgtLS0tLS0tWFgtLVhcIiwgXCItLS0tLVhYWC0tLS0tLS1cIiwgXCItWFgtLS0tLS0tWFgtLVhcIiwgXCItWFgtLVhYWC0tWFgtLVhcIiwgXCItWFgtLS0tLS0tWFgtLVhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMTNfM18wXCI6IFtcIi0tLS1eXl5eXl5eXl5eXlwiLCBcIlxcXFxcXFxcLS0tLS0tLS0tLS0tLVwiLCBcIi8vLS0tLS1YLS0tLS0tWFwiLCBcIi0tLS0tLS1YWC0tLS1YWFwiLCBcIi0tLS0tLS1YWFgtLVhYWFwiLCBcIi0tLS0tLS0qI1gtLVgjKlwiLCBcIi0tLS0tLS1YWFgtLVhYWFwiLCBcIi0tLS0tLS1YWC0tLS1YWFwiLCBcIiYtLS0tLS1YLS0tLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS1eXl5eXl5eXl5eXlwiXSwgXCIxM18zXzFcIjogW1wiLS0tLV5eXl5eXl5eXl5eXCIsIFwiXFxcXFxcXFwtLS0tLS0tLS0tLS0tXCIsIFwiLy8tLS0tLVgtLS0tLS1YXCIsIFwiLS0tLS0tLVhYLS0tLVhYXCIsIFwiLS0tLS0tLVhYWC0tWFhYXCIsIFwiLS0tLS0tLSojWC0tWCMqXCIsIFwiLS0tLS0tLVhYWC0tWFhYXCIsIFwiLS0tLS0tLVhYLS0tLVhYXCIsIFwiJi0tLS0tLVgtLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLV5eXl5eXl5eXl5eXCJdLCBcIjEzXzNfMlwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS1YLS1YLS1YLS0mLS1cIiwgXCItLS1YLS1YLS1YLS1YLS1cIiwgXCJYLS0tLS1YLS1YLS1YLS1cIiwgXCJYLS0tLS0tLS1YLS1YLS1cIiwgXCJYLS0tLS0tLS0tLS1YLS1cIiwgXCJYLS0tLS0tLS0tLS1YLS1cIiwgXCJYLS0tLy9cXFxcXFxcXC0tLS1YLS1cIiwgXCItLS0tXFxcXFxcXFwvLy0tLS1YLS1cIiwgXCItLS0tLS0tLS0tLS1YLS1cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTJfMl8wXCI6IFtcIi0tLS1eXl5eXl5eXl5eXlwiLCBcIlxcXFxcXFxcLS0tLV4tLS0tLS0tLVwiLCBcIi8vLS0tLV4tLS0tWC0tWFwiLCBcIi0tLS0tLV4tLS1YWC0tWFwiLCBcIi0tLS0tLV4tLVhYWC0tWFwiLCBcIi0tLS0tLS0tLVgjKi0tKlwiLCBcIi0tLS0tLSYtLVhYWC0tWFwiLCBcIi0tLS0tLS0tLS1YWC0tWFwiLCBcIiYtLS0tLS0tLS0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS1eXl5eXl5eXl5eXlwiXSwgXCIxMl8yXzFcIjogW1wiLS0tLV5eXl5eXl5eXl5eXCIsIFwiXFxcXFxcXFwtLS0tXi0tLS0tLS0tXCIsIFwiLy8tLS0tXi0tLS1YLS1YXCIsIFwiLS0tLS0tXi0tLVhYLS1YXCIsIFwiLS0tLS0tXi0tWFhYLS1YXCIsIFwiLS0tLS0tLS0tWCMqLS0qXCIsIFwiLS0tLS0tJi0tWFhYLS1YXCIsIFwiLS0tLS0tLS0tLVhYLS1YXCIsIFwiJi0tLS0tLS0tLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLV5eXl5eXl5eXl5eXCJdLCBcIjFfMV8wXCI6IFtcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi0tLSMtLSYtLVgtLSYtLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIi9cXFxcXFxcXC0tLS0tLVgtLS0tLVwiLCBcIlxcXFwvLy0tLS0tLVgtLS0tLVwiLCBcIi0tLS0tLS0tLVgtLS0tLVwiLCBcIiotLS0tLS0tLSYtLS0tLVwiXSwgXCIxXzFfMVwiOiBbXCItLS0tLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0tLS1YLS0tLS1cIiwgXCItLS0jLS0mLS1YLS0mLS1cIiwgXCItLS0tLS0tLS1YLS0tLS1cIiwgXCIvXFxcXFxcXFwtLS0tLS1YLS0tLS1cIiwgXCJcXFxcLy8tLS0tLS1YLS0tLS1cIiwgXCItLS0tLS0tLS1YLS0tLS1cIiwgXCIqLS0tLS0tLS0mLS0tLS1cIl0sIFwiMV8xXzJcIjogW1wiLS0tLSYtLV5eLS0tLS0tXCIsIFwiLS0tLVgtLV5eLS0tLS0tXCIsIFwiLS0tLVgtLV5eLS0tLS0tXCIsIFwiLS0tLVgtLV5eLS0tLS0tXCIsIFwiLS0tLVgtLV5eLS0tLS0tXCIsIFwiLS0tLVgtLV5eLS0tLS0tXCIsIFwiLS0tLVgtLV5eLS0tLS0tXCIsIFwiLS0tLVgtLS0tLS0tLS0tXCIsIFwiLS0tLVgtLS0tLS0tLS0tXCIsIFwiLS0tLVgtLV5eLS0tLS0tXCIsIFwiLS0tLVgtLV5eLS0tLS0tXCJdLCBcIjE2XzNfMFwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCImLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tWC0tLS0tLVhcIiwgXCJeXi0tLS0tWFgtLS0tWFhcIiwgXCJeXl5eLS0tWFhYLS1YWFhcIiwgXCItLS0tLS0tKiNYLS1YIypcIiwgXCJeXl5eLS0tWFhYLS1YWFhcIiwgXCJeXi0tLS0tWFgtLS0tWFhcIiwgXCItLS0tLS0tWC0tLS0tLVhcIiwgXCImLS0tLS0tLS0tLS0tLS1cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTZfM18xXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIiYtLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS1YLS0tLS0tWFwiLCBcIl5eLS0tLS1YWC0tLS1YWFwiLCBcIl5eXl4tLS1YWFgtLVhYWFwiLCBcIi0tLS0tLS0qI1gtLVgjKlwiLCBcIl5eXl4tLS1YWFgtLVhYWFwiLCBcIl5eLS0tLS1YWC0tLS1YWFwiLCBcIi0tLS0tLS1YLS0tLS0tWFwiLCBcIiYtLS0tLS0tLS0tLS0tLVwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxNl8zXzJcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLVgtLV5eXCIsIFwiLVgtLVgtLVgtLVgtLV5eXCIsIFwiLVgtLVgtLVgtLVgtLS0mXCIsIFwiLVgtLVgtLVgtLVgtLV5eXCIsIFwiI1gtI1gtI1gtI1gtLV5eXCIsIFwiLVgtLVgtLVgtLVgtLV5eXCIsIFwiLVgtLVgtLVgtLVgtLS0mXCIsIFwiLVgtLVgtLVgtLVgtLV5eXCIsIFwiLVgtLVgtLVgtLS0tLV5eXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjVfOV8wXCI6IFtcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFgtLVwiLCBcIi0tLS1YWFhYWFhYWFgtLVwiLCBcIi0tLS1YWFhYWFhYWFgtLVwiLCBcIi0tLS0tLSotLS0tLS0tLVwiLCBcIiMtLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0jLS0jLS0tLVwiLCBcIi0tLS1YWFhYWFhYWFgtLVwiLCBcIi0tLS1YWFhYWFhYWFgtLVwiLCBcIi0tLS1YWFhYWFhYWFgqI1wiLCBcIi0tLS1YWFhYWFhYWFhYWFwiXSwgXCI1XzlfMVwiOiBbXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWC1cIiwgXCItLS0tWFhYWFhYWFhYWC1cIiwgXCItLS0tWFhYWFhYWFhYWC1cIiwgXCItLS0tLS0qLS0tKi0tLS1cIiwgXCIjLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tIy0tLSMtLS1cIiwgXCItLS0tWFhYWFhYWFhYWC1cIiwgXCItLS0tWFhYWFhYWFhYWC1cIiwgXCItLS0tWFhYWFhYWFhYWCpcIiwgXCItLS0tWFhYWFhYWFhYWFhcIl0sIFwiMV8xMV8wXCI6IFtcIlhYLS1YWFgtLVhYWC0tLVwiLCBcIlhYLS1YWFgtLVhYWC0tLVwiLCBcIlhYLS1YWFgtLVhYWC0tLVwiLCBcIlhYLS1YWFgtLVhYWC0tLVwiLCBcIlhYLS1YWFgtLVhYWC0tLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIipYWFhYWFhYWFhYWFhYLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiMtLS0tJi0tLS0mLS0tLVwiXSwgXCIxXzExXzFcIjogW1wiWFgtLVhYWC0tWFhYLS0tXCIsIFwiWFgtLVhYWC0tWFhYLS0tXCIsIFwiWFgtLVhYWC0tWFhYLS0tXCIsIFwiWFgtLVhYWC0tWFhYLS0tXCIsIFwiWFgtLVhYWC0tWFhYLS0tXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiKlhYWFhYWFhYWFhYWFgtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiIy0tLS0mLS0tLSYtLS0tXCJdLCBcIjFfMTVfMFwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0mLS0tLS1YWFhYWFhcIiwgXCItLS0tLS0jLS1YWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCIjWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMV8xNV8xXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSYtLS0tLVhYWFhYWFwiLCBcIi0tLS0tLSMtLVhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIiNYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIxXzE1XzJcIjogW1wiWFhYWFhYWFhYWFhYWFgtXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiLS0tLS0tLSNYWFhYLS0tXCIsIFwiWFhYWFgtLS1YWFhYLS0tXCIsIFwiWFhYWFgtLS0tKi0tLS0tXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCIsIFwiWFhYWFhYWFhYWFhYWFgtXCJdLCBcIjE0XzRfMFwiOiBbXCJYLS1eXl5eXl5eXl5eXl5cIiwgXCItLS0tLVgtLVgtLVgtLVhcIiwgXCJYLS0tLVgtLVgtLVgtLVhcIiwgXCJYLS0tLVgtLVgtLVgtLVhcIiwgXCJYLS0tLVgtLVgtLVgtLVhcIiwgXCIqLS0tLVgtI1gtI1gtI1hcIiwgXCJYLS0tLVgtLVgtLVgtLVhcIiwgXCJYLS0tLVgtLVgtLVgtLVhcIiwgXCJYLS0tLVgtLVgtLVgtLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYLS1eXl5eXl5eXl5eXl5cIl0sIFwiMTRfNF8xXCI6IFtcIlgtLV5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tWC0tWC0tWC0tWFwiLCBcIlgtLS0tWC0tWC0tWC0tWFwiLCBcIlgtLS0tWC0tWC0tWC0tWFwiLCBcIlgtLS0tWC0tWC0tWC0tWFwiLCBcIiotLS0tWC0jWC0jWC0jWFwiLCBcIlgtLS0tWC0tWC0tWC0tWFwiLCBcIlgtLS0tWC0tWC0tWC0tWFwiLCBcIlgtLS0tWC0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlgtLV5eXl5eXl5eXl5eXlwiXSwgXCIxNF80XzJcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tJi0tXCIsIFwiLS0tLS0tLS0tLS0tWC0tXCIsIFwiWC0tLS1YWFgtLS0tWC0tXCIsIFwiWF4tLS1YKlgtLS0tWC0tXCIsIFwiWF5eLS1YJi0tLS0tWC0tXCIsIFwiWF4tLS1YKlgtLS0tWC0tXCIsIFwiWC0tLS1YWFgtLS0tWC0tXCIsIFwiLy9cXFxcXFxcXC8vXFxcXFxcXFwtLS0tWC0tXCIsIFwiXFxcXFxcXFwvL1xcXFxcXFxcLy8tLS0tWC0tXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjE0XzVfMFwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tLS0tWC1cIiwgXCItLS0tLS0tLS0tLS0tWC1cIiwgXCItLS1YLS0tLVhYWC0tWC1cIiwgXCItLS1YXi0tLVgqWC0tWC1cIiwgXCJYWFhYXl4tLVgmLS0tWC1cIiwgXCItLS1YXi0tLVgqWC0tWC1cIiwgXCItLS1YLS0tLVhYWC0tWC1cIiwgXCItLS0vL1xcXFxcXFxcLy9cXFxcXFxcXC0tWC1cIiwgXCItLS1cXFxcXFxcXC8vXFxcXFxcXFwvLy0tLS1cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTRfNV8xXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tLS1YLVwiLCBcIi0tLS0tLS0tLS0tLS1YLVwiLCBcIi0tLVgtLS0tWFhYLS1YLVwiLCBcIi0tLVheLS0tWCpYLS1YLVwiLCBcIlhYWFheXi0tWCYtLS1YLVwiLCBcIi0tLVheLS0tWCpYLS1YLVwiLCBcIi0tLVgtLS0tWFhYLS1YLVwiLCBcIi0tLS8vXFxcXFxcXFwvL1xcXFxcXFxcLS1YLVwiLCBcIi0tLVxcXFxcXFxcLy9cXFxcXFxcXC8vLS0tLVwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxNF81XzJcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLSYtXCIsIFwiLS0tLS0tLS0tLS0tLVgtXCIsIFwiLS0tWC0tLS1YWFgtLVgtXCIsIFwiLS0tWF4tLS1YKlgtLVgtXCIsIFwiWFhYWF5eLS1YJi0tLVgtXCIsIFwiLS0tWF4tLS1YKlgtLVgtXCIsIFwiLS0tWC0tLS1YWFgtLVgtXCIsIFwiLS0tLy9cXFxcXFxcXC8vXFxcXFxcXFwtLVgtXCIsIFwiLS0tXFxcXFxcXFwvL1xcXFxcXFxcLy8tLVgtXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjE1XzRfMFwiOiBbXCItLV5eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tLS0tLSZcIiwgXCItLS0tLS1YLS0tLVgtLVhcIiwgXCItLS0tLVhYLS0tWFgtLVhcIiwgXCItLS0tWFhYLS1YWFgtLVhcIiwgXCItLS0tWCMqLS1YIyotLVhcIiwgXCItLS0tWFhYLS1YWFgtLVhcIiwgXCItLS0tLVhYLS0tWFgtLVhcIiwgXCItLS0tLS1YLS0tLVgtLVhcIiwgXCItLS0tLS0tLS0tLS0tLVhcIiwgXCItLV5eXl5eXl5eXl5eXl5cIl0sIFwiMTVfNF8xXCI6IFtcIi0tXl5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tLS0tJlwiLCBcIi0tLS0tLVgtLS0tWC0tWFwiLCBcIi0tLS0tWFgtLS1YWC0tWFwiLCBcIi0tLS1YWFgtLVhYWC0tWFwiLCBcIi0tLS1YIyotLVgjKi0tWFwiLCBcIi0tLS1YWFgtLVhYWC0tWFwiLCBcIi0tLS0tWFgtLS1YWC0tWFwiLCBcIi0tLS0tLVgtLS0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tWFwiLCBcIi0tXl5eXl5eXl5eXl5eXlwiXSwgXCIxM180XzBcIjogW1wiLV5eXl5eXl5eXl5eXl5eXCIsIFwiLV5eLS0tLS0tLS0tLS0tXCIsIFwiLV5eLS0tLS0tLS0tLS0tXCIsIFwiLV5eLS1YLS1YLS0tLVhYXCIsIFwiLS0tLS1YLS1YXi0tLVgqXCIsIFwiLV5eLS1YWFhYXl4tLVgmXCIsIFwiLS0tLS1YLS1YXi0tLVgqXCIsIFwiLV5eLS1YLS1YLS0tLVhYXCIsIFwiLV5eLS0tLS0vL1xcXFxcXFxcLy9cXFxcXCIsIFwiLV5eLS0tLS1cXFxcXFxcXC8vXFxcXFxcXFwvXCIsIFwiLV5eXl5eXl5eXl5eXl5eXCJdLCBcIjEzXzRfMVwiOiBbXCItXl5eXl5eXl5eXl5eXl5cIiwgXCItXl4tLS0tLS0tLS0tLS1cIiwgXCItXl4tLS0tLS0tLS0tLS1cIiwgXCItXl4tLVgtLVgtLS0tWFhcIiwgXCItLS0tLVgtLVheLS0tWCpcIiwgXCItXl4tLVhYWFheXi0tWCZcIiwgXCItLS0tLVgtLVheLS0tWCpcIiwgXCItXl4tLVgtLVgtLS0tWFhcIiwgXCItXl4tLS0tLS8vXFxcXFxcXFwvL1xcXFxcIiwgXCItXl4tLS0tLVxcXFxcXFxcLy9cXFxcXFxcXC9cIiwgXCItXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTNfNF8yXCI6IFtcIl5eXl5eXl5eXl5eXl5eLVwiLCBcIi0tLS0tWC0tWC0tWC0tLVwiLCBcIi0tLS0tWC0tWC0tWC0tLVwiLCBcIlhYWC0tLS0tWC0tWC0tLVwiLCBcIlgqWC0tLS0tLS0tWC0tLVwiLCBcIlgmLS0tLS0tLS0tLS0tLVwiLCBcIlgqWC0tLS0tLS0tLS0tLVwiLCBcIlhYWC0tLS8vXFxcXFxcXFwtLS0tLVwiLCBcIi9cXFxcXFxcXC0tLVxcXFxcXFxcLy8tLS0tLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIl5eXl5eXl5eXl5eXl5eLVwiXSwgXCI0XzdfMFwiOiBbXCItLS0tWFheXlhYWFheXl5cIiwgXCJcXFxcXFxcXC0tWFheXlhYWFheXl5cIiwgXCIvLy0tWFheXlhYWFheXl5cIiwgXCItLS0tWFheXlhYWFheXl5cIiwgXCItLS0tWFheXlhYWFheXl5cIiwgXCItLS0tWFheXlhYWFheXl5cIiwgXCItLS0tWFheXi0tWFheXl5cIiwgXCItLS0tWFgtLS0tLS1eXl5cIiwgXCImLS0tLS0tLVhYLS0tLS1cIiwgXCItLS0tLS1eXlhYWFgtLS1cIiwgXCItLS0tWFheXlhYWFheXl5cIl0sIFwiNF83XzFcIjogW1wiLS0tLVhYWFhYWF5eXl5eXCIsIFwiXFxcXFxcXFwtLVhYWFhYWF5eXl5eXCIsIFwiLy8tLVhYWFhYWF5eXl5eXCIsIFwiLS0tLVhYWFhYWF5eXl5eXCIsIFwiLS0tLVhYWFhYWF5eXl5eXCIsIFwiLS0tLVhYWFhYWF5eXl5eXCIsIFwiLS0tLS0tLS1YWF5eXl5eXCIsIFwiLS0tLS0tLS0tLV5eXl5eXCIsIFwiJi0tLVhYWFgtLS0tLS0tXCIsIFwiLS0tLVhYWFhYWC0tLS0tXCIsIFwiLS0tLVhYWFhYWF5eXl5eXCJdLCBcIjNfMTJfMFwiOiBbXCItLS0tWFhYWFhYWFhYWFhcIiwgXCJcXFxcXFxcXC0tWFhYWFhYWFhYWFhcIiwgXCIvLy0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0qLS0tI1hYWFhcIiwgXCItLS0tLS0tLS0tLVhYWFhcIiwgXCItLS0tLS0tIy0tLS0qLS1cIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCImLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIl0sIFwiM18xMl8xXCI6IFtcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIlxcXFxcXFxcLS1YWFhYWFhYWFhYWFwiLCBcIi8vLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS0tLSotLS0jWFhYWFwiLCBcIi0tLS0tLS0tLS0tWFhYWFwiLCBcIi0tLS0tLS0jLS0tLSotLVwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIiYtLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiXSwgXCIzXzEyXzJcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWComWFgtLVhYLS1YWC0tXCIsIFwiWC0tWFgtLVhYLS1YWC0tXCIsIFwiWC0tWFgtLVhYLS1YWC0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiWC0tWFgtLVhYLS1YWC0tXCIsIFwiWC0tWFgtLVhYLS1YWC0tXCIsIFwiWC0tWFgqJlhYKiNYWC0tXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjRfMTNfMFwiOiBbXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS0tLSNYWFhYLS0jWFhcIiwgXCIjLS0tLS1YWFhYLS0tWFhcIiwgXCItLS0tLS0tKi0tLS0tLSpcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIl0sIFwiNF8xM18xXCI6IFtcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tI1hYWFgtLSNYWFwiLCBcIiMtLS0tLVhYWFgtLS1YWFwiLCBcIi0tLS0tLS0qLS0tLS0tKlwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiXSwgXCI1XzEwXzBcIjogW1wiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tKi0tLSotXCIsIFwiIy0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tIy0tLSMtLS0jXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCJdLCBcIjVfMTBfMVwiOiBbXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0qLS0tKi1cIiwgXCIjLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0jLS0tIy0tLSNcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIl0sIFwiNV8xMF8yXCI6IFtcIlhYWFhYWFhYWC0tXl5eXlwiLCBcIlhYWFhYWFhYWC0tLS1YLVwiLCBcIlhYWFhYWFhYWC0tLS1YLVwiLCBcIlhYWFhYWFhYWC0tLS1YLVwiLCBcIi0jWFhYWFgtLS0tLS1YLVwiLCBcIi0tWFhYWC0tLS0tLS1YLVwiLCBcIi0tLSotLS0tLS0tLS1YLVwiLCBcIlhYWFhYWFhYWC0tLS1YLVwiLCBcIlhYWFhYWFhYWC0tLS1YLVwiLCBcIlhYWFhYWFhYWC0tLS0tLVwiLCBcIlhYWFhYWFhYWC0tXl5eXlwiXSwgXCI1XzhfMFwiOiBbXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYLS1eXl5cIiwgXCItLS1YWFhYWFhYLS0tLS1cIiwgXCItLS1YWFhYWFhYLS1eXl5cIiwgXCItLS0tLSotLS0tLS1eXl5cIiwgXCIjLS0tLS0tLS0tLS1eXl5cIiwgXCItLS0tLS0jLS0tLS1eXl5cIiwgXCItLS1YWFhYWFhYLS1eXl5cIiwgXCItLS1YWFhYWFhYLS0tLS1cIiwgXCItLS1YWFhYWFhYLS1eXl5cIiwgXCItLS1YWFhYWFhYWFhYWFhcIl0sIFwiNV84XzFcIjogW1wiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWC0tXl5eXCIsIFwiLS0tWFhYWFhYWC0tXl5eXCIsIFwiLS0tWFhYWFhYWC0tXl5eXCIsIFwiLS0tLS0qLS0tLS0tXl5eXCIsIFwiIy0tLS0tLS0tLS0tLSYtXCIsIFwiLS0tLS0tIy0tLS0tXl5eXCIsIFwiLS0tWFhYWFhYWC0tXl5eXCIsIFwiLS0tWFhYWFhYWC0tXl5eXCIsIFwiLS0tWFhYWFhYWC0tXl5eXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCJdLCBcIjVfOF8yXCI6IFtcIlhYWFhYWFhYLS1YWFhYWFwiLCBcIl5eXl5eXi0tLS1YWFhYWFwiLCBcIl5eXi0tLS0tLS1YWFhYWFwiLCBcIi0tLS0tLS0tLS1YWFhYWFwiLCBcIi0tLy9cXFxcXFxcXC0tLS1YWFhYWFwiLCBcIi0tXFxcXFxcXFwvLy0tLS1YWC0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLVhYWFwiLCBcIl5eXi0tLS0tLS1YWFhYWFwiLCBcIl5eXl5eXi0tLS1YWFhYWFwiLCBcIlhYWFhYWFhYLS1YWFhYWFwiXSwgXCI2XzlfMFwiOiBbXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItLSotLS0tLS0tLSNYWFhcIiwgXCItXl5eLS0tLS0tLS1YWFhcIiwgXCItLSYtLS0tLSMtLS0tKi1cIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIl0sIFwiNl85XzFcIjogW1wiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLS0qLS0tLS0tLS0jWFhYXCIsIFwiLV5eXi0tLS0tLS0tWFhYXCIsIFwiLS0mLS0tLS0jLS0tLSotXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCJdLCBcIjZfOV8yXCI6IFtcIl5eXl5eLS1YWFhYWFhYXlwiLCBcIi0tLS0tLS1YWFhYWFhYXlwiLCBcIi0tLS0tLS1YWFhYWFhYXlwiLCBcIlhYWC0tLS1YWFhYWFhYXlwiLCBcIlgqWC0tLS1YWFhYWFhYXlwiLCBcIlgmLS0tLS1YWFhYWFhYXlwiLCBcIlgqWC0tLS0tLS1YWFhYXlwiLCBcIlhYWC0tLS0tLS0tLS0tXlwiLCBcIi9cXFxcXFxcXC0tLS1YWFgtLS0tLVwiLCBcIlxcXFwvLy0tLS1YWFhYWFhYLVwiLCBcIl5eXl5eLS1YWFhYWFhYXlwiXSwgXCIwXzE2XzBcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tWFgtLS1YWFhYWFhYXCIsIFwiLS0tWFgtLS1YWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiI1hYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjBfMTZfMVwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS1YWC0tLVhYWFhYWFhcIiwgXCItLS1YWC0tLVhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCIjWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMF8xNl8yXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlhYWFhYLS1YWFgtLS0tLVwiLCBcIlhYWFhYLS1YWFgtLSMtLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIwXzE3XzBcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiWFhYWC0tLVhYWFhYWFhYXCIsIFwiWFhYWC0tLVhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjBfMTdfMVwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYWFhYLS0tWFhYWFhYWFhcIiwgXCJYWFhYLS0tWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMF8xNV8wXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSYtLS0tWFgtLVhYWFwiLCBcIi0tLS0tLS0tWFgtLVhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIiNYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIwXzE1XzFcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tJi0tLS1YWC0tWFhYXCIsIFwiLS0tLS0tLS1YWC0tWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiI1hYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjBfMTVfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYWFhYLS0tWFgtLS0tLS1cIiwgXCJYWFhYLS0tWFgtLSMtLS1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIl0sIFwiMV8xNl8wXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tI1hYWFgtLS0tLVwiLCBcIi0tJi0tLVhYWFgtLVhYWFwiLCBcIi0tLS0tLS0qLS0tLVhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIxXzE2XzFcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0jWFhYWC0tLS0tXCIsIFwiLS0mLS0tWFhYWC0tWFhYXCIsIFwiLS0tLS0tLSotLS0tWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjFfMTZfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tLSotLS1cIiwgXCJYWFhYWC0tWFgtLS0tLS1cIiwgXCJYWFhYWC0tWFgtLS0jLS1cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMl8xMl8wXCI6IFtcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIlxcXFxcXFxcLS1YWFhYWFhYWFhYWFwiLCBcIi8vLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLSNYWFhYLVwiLCBcIi0tLS0tLS0tLS1YWFhYLVwiLCBcIi0tLS0tLSMtLS0tKi0tLVwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIiYtLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiXSwgXCIyXzEyXzFcIjogW1wiLS0tLVhYWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLVhYWFhYWFhYWFhYXCIsIFwiLy8tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tI1hYWFgtXCIsIFwiLS0tLS0tLS0tLVhYWFgtXCIsIFwiLS0tLS0tIy0tLS0qLS0tXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiJi0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCJdLCBcIjJfMTFfMFwiOiBbXCJYWC0tWFhYLS1YWFgtLS1cIiwgXCJYWC0tWFhYLS1YWFgtLS1cIiwgXCJYWC0tWFhYLS1YWFgtLS1cIiwgXCJYWC0tWFhYLS1YWFgtIy1cIiwgXCJYWC0tWFhYLS1YWFgtLS1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCJYWFhYWFhYWFhYWFhYWC1cIiwgXCIqWFhYWFhYWFhYWFhYWC1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIjLS0tLSYtLS0tJi0tLS1cIl0sIFwiMl8xMV8xXCI6IFtcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIlxcXFxcXFxcLS0tWFhYWFhYWFhYWFwiLCBcIi8vLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0jWFhYWFwiLCBcIi0tLS0tLS0tLS0tWFhYWFwiLCBcIi0tLS0tLS0jLS0tLSotLVwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIiYtLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiXSwgXCIyXzExXzJcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiXi0tLS0tLS1YWComWFgqXCIsIFwiLS0tWFhYLS1YWC0tWFgtXCIsIFwiXi0tLS0tLS1YWC0tWFgtXCIsIFwiLS0tWFhYLS0tLS0tLS0tXCIsIFwiXi0tLS0tLS1YWC0tWFgtXCIsIFwiLS0tWFhYLS1YWC0tWFgtXCIsIFwiXi0tLS0tLS1YWC0tWFgtXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjRfMTJfMFwiOiBbXCItLS0tLVhYWFhYWFhYWFhcIiwgXCItLS0tLVhYWFhYWFhYWFhcIiwgXCJYLS0tLVhYWFhYWFhYWFhcIiwgXCJYWFgtLVhYWFhYWFhYWFhcIiwgXCItWFgtLS0tKi0tLSNYWFhcIiwgXCItWFgtLS0tLS0tLS1YWFhcIiwgXCItWFgtLS0tLSMtLS0tKi1cIiwgXCIjWFgtLVhYWFhYWFhYWFhcIiwgXCItWFgtLVhYWFhYWFhYWFhcIiwgXCItWFgtLVhYWFhYWFhYWFhcIiwgXCItWFgtLVhYWFhYWFhYWFhcIl0sIFwiNF8xMl8xXCI6IFtcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIi0tLS0tWFhYWFhYWFhYWFwiLCBcIlgtLS0tWFhYWFhYWFhYWFwiLCBcIlhYWC0tWFhYWFhYWFhYWFwiLCBcIi1YWC0tLS0qLS0tI1hYWFwiLCBcIi1YWC0tLS0tLS0tLVhYWFwiLCBcIi1YWC0tLS0tIy0tLS0qLVwiLCBcIiNYWC0tWFhYWFhYWFhYWFwiLCBcIi1YWC0tWFhYWFhYWFhYWFwiLCBcIi1YWC0tWFhYWFhYWFhYWFwiLCBcIi1YWC0tWFhYWFhYWFhYWFwiXSwgXCIxMl8xXzBcIjogW1wiLS0tLV5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tXi0tXi0tLS0tXCIsIFwiLS0tLS0tXi0tXi0tLS1YXCIsIFwiLS0tLS0tXi0tXi0tLVhYXCIsIFwiLS0tLS0tXi0tXi0tWFhYXCIsIFwiIy0tLS0tLS0tLS0tWCMqXCIsIFwiLS0tLS0tJi0tJi0tWFhYXCIsIFwiLS0tLS0tLS0tLS0tLVhYXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLV5eXl5eXl5eXl5eXCJdLCBcIjEyXzFfMVwiOiBbXCItLS0tXl5eXl5eXl5eXl5cIiwgXCItLS0tLS1eLS1eLS0tLS1cIiwgXCItLS0tLS1eLS1eLS0tLVhcIiwgXCItLS0tLS1eLS1eLS0tWFhcIiwgXCItLS0tLS1eLS1eLS1YWFhcIiwgXCIjLS0tLS0tLS0tLS1YIypcIiwgXCItLS0tLS0mLS0mLS1YWFhcIiwgXCItLS0tLS0tLS0tLS0tWFhcIiwgXCItLS0tLS0tLS0tLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tXl5eXl5eXl5eXl5cIl0sIFwiMl8wXzBcIjogW1wiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tIy0tLS0tJi0tJi0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tLS0tXCIsIFwiXFxcXC8vLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tKi0tLS0tLS0tXCIsIFwiKi0tLS0tLS0tLS0tLS0tXCJdLCBcIjJfMF8xXCI6IFtcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLSMtLS0tLSYtLSYtLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLS0tLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSotLS0tLS0tLVwiLCBcIiotLS0tLS0tLS0tLS0tLVwiXSwgXCIyXzBfMlwiOiBbXCJeXi0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLSYtLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0qLS0tLS0tLS1cIiwgXCJeXi0tLS0tLS0tLS0tLS1cIl0sIFwiNV8xM18wXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLSotLS0qLVwiLCBcIi0tLSYtLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSMtLS0jLS0tI1wiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIiNYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI1XzEzXzFcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tKi0tLSotXCIsIFwiLS0tJi0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tIy0tLSMtLS0jXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiI1hYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjVfMTNfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYLS1cIiwgXCJYWFhYWFhYWFhYWFhYLS1cIiwgXCJYWFhYWFhYWFhYWFhYLS1cIiwgXCItLS0tLSotLS0qLS0tLS1cIiwgXCItJi0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0jLS0tIy0tLS1cIiwgXCJYWFhYWFhYWFhYWFhYLS1cIiwgXCJYWFhYWFhYWFhYWFhYLS1cIiwgXCJYWFhYWFhYWFhYWFhYKiNcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiNV8xNF8wXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tKi0tLS0tLSNYWFwiLCBcIi0tLS0tLS0tLS0tLS1YWFwiLCBcIi0tLS0tLSMtLSMtLS0tKlwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIiNYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI1XzE0XzFcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0qLS0tLS0tI1hYXCIsIFwiLS0tLS0tLS0tLS0tLVhYXCIsIFwiLS0tLS0tIy0tIy0tLS0qXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiI1hYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjVfMTRfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLSotLS0qLS0tKi1cIiwgXCItJi0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0jLS0tIy0tLSNcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiNV8xMl8wXCI6IFtcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tKi0tLS0tLSNYWFwiLCBcIiMtLS0tLS0tLS0tLS1YWFwiLCBcIi0tLS0tLSMtLSMtLS0tKlwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiXSwgXCI1XzEyXzFcIjogW1wiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0qLS0tLS0tI1hYXCIsIFwiIy0tLS0tLS0tLS0tLVhYXCIsIFwiLS0tLS0tIy0tIy0tLS0qXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCJdLCBcIjZfMTNfMFwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLSotLS0qLS0tKi1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0jLS0tIy0tLSNcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCIjWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiNl8xM18xXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tKi0tLSotLS0qLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSMtLS0jLS0tI1wiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIiNYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI2XzEzXzJcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0qLS0tKi0tLSotXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tIy0tLSMtLS0jXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiI1hYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjVfN18wXCI6IFtcIi0tLS1YWFhYWFgtLV5eXlwiLCBcIlxcXFxcXFxcLS1YWFhYWFgtLS0tWFwiLCBcIi8vLS1YWFhYWFgtLS0tWFwiLCBcIi0tLS1YWFhYWFgtLS0tWFwiLCBcIi0tLS0tLSotLS0tLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tWFwiLCBcIi0tLS0tLS0jLS0tLS0tWFwiLCBcIi0tLS1YWFhYWFgtLS0tWFwiLCBcIiYtLS1YWFhYWFgtLS0tWFwiLCBcIi0tLS1YWFhYWFgtLS0tI1wiLCBcIi0tLS1YWFhYWFgtLV5eXlwiXSwgXCI1XzdfMVwiOiBbXCItLS0tWFhYWFhYLS1eXl5cIiwgXCJcXFxcXFxcXC0tWFhYWFhYLS0tLVhcIiwgXCIvLy0tWFhYWFhYLS0tLVhcIiwgXCItLS0tWFhYWFhYLS0tLVhcIiwgXCItLS0tLS0qLS0tLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLVhcIiwgXCItLS0tLS0tIy0tLS0tLVhcIiwgXCItLS0tWFhYWFhYLS0tLVhcIiwgXCImLS0tWFhYWFhYLS0tLVhcIiwgXCItLS0tWFhYWFhYLS0tLSNcIiwgXCItLS0tWFhYWFhYLS1eXl5cIl0sIFwiNV83XzJcIjogW1wiXl5eXi0tWFhYWFhYLS1eXCIsIFwiLS0tLS0tWFhYWFhYLS1eXCIsIFwiLS0tLS0tWFhYWFhYLS1eXCIsIFwiWFgtLS0tWFhYWFhYLS0tXCIsIFwiKlgtLS0tLS0tLS0tLS0tXCIsIFwiJi0tLS0tLS1YWC0tLS1eXCIsIFwiKlgtLS0tLS1YWC0tLS1eXCIsIFwiWFgtLS0tWFhYWFhYLS1eXCIsIFwiXFxcXFxcXFwtLS0tWFhYWFhYLS1eXCIsIFwiLy8tLS0tWFhYWFhYLS1eXCIsIFwiXl5eXi0tWFhYWFhYLS1eXCJdLCBcIjEyXzNfMFwiOiBbXCItLS0tLV5eXl5eXl5eXl5cIiwgXCJcXFxcXFxcXC0tLS0tLS0tLS0tLS1cIiwgXCIvLy0tLS0tWC0tLS0tLVhcIiwgXCItLS0tLS0tWFgtLS0tWFhcIiwgXCItLS0tLS0tWFhYLS1YWFhcIiwgXCItLS0tLS0tKiNYLS1YIypcIiwgXCItLS0tLS0tWFhYLS1YWFhcIiwgXCItLS0tLS0tWFgtLS0tWFhcIiwgXCImLS0tLS0tWC0tLS0tLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLV5eXl5eXl5eXl5cIl0sIFwiMTJfM18xXCI6IFtcIi0tLS0tXl5eXl5eXl5eXlwiLCBcIlxcXFxcXFxcLS0tLS0tLS0tLS0tLVwiLCBcIi8vLS0tLS1YLS0tLS0tWFwiLCBcIi0tLS0tLS1YWC0tLS1YWFwiLCBcIi0tLS0tLS1YWFgtLVhYWFwiLCBcIi0tLS0tLS0qI1gtLVgjKlwiLCBcIi0tLS0tLS1YWFgtLVhYWFwiLCBcIi0tLS0tLS1YWC0tLS1YWFwiLCBcIiYtLS0tLS1YLS0tLS0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tXl5eXl5eXl5eXlwiXSwgXCIxMF8zXzBcIjogW1wiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS1YLS1YLS0tXCIsIFwiLS0tLS0tLS1YLS1YLS0tXCIsIFwiLS0tLS0tLS1YLS1YLS0tXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiLS0tIy0tLS1YLSNYLS1YXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiL1xcXFxcXFxcLS0tLS1YLS1YLS0tXCIsIFwiXFxcXC8vLS0tLS1YLS1YLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tXl5eXl5eXl5eXCJdLCBcIjEwXzNfMVwiOiBbXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLVgtLVgtLS1cIiwgXCItLS0tLS0tLVgtLVgtLS1cIiwgXCItLS0tLS0tLVgtLVgtLS1cIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0jLS0tLVgtI1gtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCIvXFxcXFxcXFwtLS0tLVgtLVgtLS1cIiwgXCJcXFxcLy8tLS0tLVgtLVgtLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIqLS0tLS1eXl5eXl5eXl5cIl0sIFwiMTBfM18yXCI6IFtcIl5eXl4tLVhYWFhYWFhYWFwiLCBcIi0jLS0tLS0tXl5eXl5eXlwiLCBcIi1YLS0tLS0tXl5eXl5eXlwiLCBcIi1YLS0tLS0tXl5eXl5eXlwiLCBcIi1YLS0tLS0tXl5eLS0tXlwiLCBcIi1YLS0tLS0tLSYtLS0tLVwiLCBcIi1YLS0tLS0tXl5eLS0tXlwiLCBcIi1YLS0tLS0tXl5eXl5eXlwiLCBcIi1YLS0tLS0tXl5eXl5eXlwiLCBcIi1YLS0tLS0tXl5eXl5eXlwiLCBcIl5eXl4tLVhYWFhYWFhYWFwiXSwgXCIyXzE1XzBcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tI1hYWFgtLS0tXCIsIFwiLS0tJi0tLVhYWFgtLVhYXCIsIFwiLS0tLS0tLS0qLS0tLVhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiLVhYWFhYWFhYWFhYWFhYXCIsIFwiI1hYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjJfMTVfMVwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0jWFhYWC0tLS1cIiwgXCItLS0mLS0tWFhYWC0tWFhcIiwgXCItLS0tLS0tLSotLS0tWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCIjWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMl8xNV8yXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIi0tLS0tLS0jWFhYWC0tLVwiLCBcIlhYLS0tLS0tWFhYWC0tLVwiLCBcIlhYLS0qLS0tLSotLS0tLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIlhYWFhYWFhYWFhYWFhYLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIxMV8wXzBcIjogW1wiLS0tLV5eXl5eXl5eXl5eXCIsIFwiXFxcXFxcXFwtLS0tLS0tKi0tLS0qXCIsIFwiLy8tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS1eXl4tLV5eXCIsIFwiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tJi0tLS0mXCIsIFwiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS1eXl4tLV5eXCIsIFwiJi0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tKi0tLS0qXCIsIFwiLS0tLV5eXl5eXl5eXl5eXCJdLCBcIjExXzBfMVwiOiBbXCItLS0tXl5eXl5eXl5eXl5cIiwgXCJcXFxcXFxcXC0tLS0tLS0qLS0tLSpcIiwgXCIvLy0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLV5eXi0tXl5cIiwgXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0mLS0tLSZcIiwgXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLV5eXi0tXl5cIiwgXCImLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0qLS0tLSpcIiwgXCItLS0tXl5eXl5eXl5eXl5cIl0sIFwiMTFfMF8yXCI6IFtcIl5eXl5eXl5eXi0tXl5eLVwiLCBcIi0tLS0tLVgtLS0tXl5eLVwiLCBcIi0tLS0tLS0tLS0tXl5eLVwiLCBcIi0tLS0tLS0tLS0tLSotLVwiLCBcIi0tLS0tLS0tLS0tXl5eLVwiLCBcIi0tLS0tLS0tLS0tXl5eLVwiLCBcIi0tLS0tLS0tLS0tXl5eLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tWC0tLS0tLS0tXl5eLVwiLCBcIi0tWC0tLS0tLS0tXl5eLVwiLCBcIl5eXl5eXl5eXi0tXl5eLVwiXSwgXCI2XzhfMFwiOiBbXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLS0qLS0tLS0tLS0jWFhcIiwgXCItLV5eXi0tLS0tLS0tWFhcIiwgXCItLS0mLS0tLS0jLS0tLSpcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIiwgXCItLV5eXi0tWFhYWFhYWFhcIl0sIFwiNl84XzFcIjogW1wiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS0tKi0tLS0tLS0tI1hYXCIsIFwiLS1eXl4tLS0tLS0tLVhYXCIsIFwiLS0tJi0tLS0tIy0tLS0qXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCIsIFwiLS1eXl4tLVhYWFhYWFhYXCJdLCBcIjJfMTZfMFwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0tI1hYWFhcIiwgXCItLS1YWFhYWC0tLVhYWFhcIiwgXCItLS1YWFhYWC0tLS0qLS1cIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCIjWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMl8xNl8xXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tLS0jWFhYWFwiLCBcIi0tLVhYWFhYLS0tWFhYWFwiLCBcIi0tLVhYWFhYLS0tLSotLVwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIiNYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIyXzE2XzJcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tLSNYWFhYXCIsIFwiWFhYWFgtLS0tLS1YWFhYXCIsIFwiWFhYWFgtLSotLS0tKi0tXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjJfMTdfMFwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYLS0jWFhYWC1cIiwgXCJYWFhYWFhYLS0tWFhYWC1cIiwgXCItKi0tLS0tLS0tLSotLS1cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiMl8xN18xXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFgtLSNYWFhYLVwiLCBcIlhYWFhYWFgtLS1YWFhYLVwiLCBcIi0qLS0tLS0tLS0tKi0tLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIyXzE3XzJcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFgtLS0jWFhYXCIsIFwiWFhYWFhYWFgtLS0tWFhYXCIsIFwiLSotLS0tLS0tLS0tLSotXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjNfMTZfMFwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tI1hYWFgtLSNYWFhcIiwgXCItJi0tLVhYWFgtLS1YWFhcIiwgXCItLS0tLS0qLS0tLS0tKi1cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiM18xNl8xXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0jWFhYWC0tI1hYWFwiLCBcIi0mLS0tWFhYWC0tLVhYWFwiLCBcIi0tLS0tLSotLS0tLS0qLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIzXzE2XzJcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWC0tLS0tI1hYWFhYXCIsIFwiWFhYWC0tLS0tLVhYWFgtXCIsIFwiLSotLS0tKi0tLS0qLS0tXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjExXzNfMFwiOiBbXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0jLS0tLVgtI1gtI1hcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCIvXFxcXFxcXFwtLS0tLVgtLVgtLVhcIiwgXCJcXFxcLy8tLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCIqLS0tLS1eXl5eXl5eXl5cIl0sIFwiMTFfM18xXCI6IFtcIi0tLS0tLV5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi0tLSMtLS0tWC0jWC0jWFwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIi9cXFxcXFxcXC0tLS0tWC0tWC0tWFwiLCBcIlxcXFwvLy0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiotLS0tLV5eXl5eXl5eXlwiXSwgXCI0XzExXzBcIjogW1wiLS0tLVhYWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLVhYWFhYWFhYWFhYXCIsIFwiLy8tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tKi0tLSotXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tIy0tLSMtLS0jXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiJi0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCJdLCBcIjRfMTFfMVwiOiBbXCItLS0tWFhYWFhYWFhYWFhcIiwgXCJcXFxcXFxcXC0tWFhYWFhYWFhYWFhcIiwgXCIvLy0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tLS0tLS0qLS0tKi1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0jLS0tIy0tLSNcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCImLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIiwgXCItLS0tWFhYWFhYWFhYWFhcIl0sIFwiNF8xMV8yXCI6IFtcIlhYWFhYWFhYWFgtLV5eXlwiLCBcIlhYWFhYWFhYWFgtLS0tWFwiLCBcIlhYWFhYWFhYWFgtLS0tWFwiLCBcIlhYWFhYWFhYWFgtLS0tWFwiLCBcIlhYWFgtLS0tLS0tLS0tWFwiLCBcIlhYWFgtLS0tLS0tLS0tWFwiLCBcIi0qLS0tLSotLS0tLS0tWFwiLCBcIlhYWFhYWFhYWFgtLS0tWFwiLCBcIlhYWFhYWFhYWFgtLS0tWFwiLCBcIlhYWFhYWFhYWFgtLS0tLVwiLCBcIlhYWFhYWFhYWFgtLV5eXlwiXSwgXCIxMV81XzBcIjogW1wiLS0tLS1eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiWC0tLS0tLS1YLS1YLS1YXCIsIFwiWFhYLS0tLS1YLS1YLS1YXCIsIFwiLVhYLS0tLS1YLS1YLS1YXCIsIFwiLVhYLS0tLS1YLSNYLSNYXCIsIFwiLVhYLS0tLS1YLS1YLS1YXCIsIFwiI1hYLS0tLS1YLS1YLS1YXCIsIFwiLVhYLS0tLS1YLS1YLS1YXCIsIFwiLVhYLS0tLS0tLS0tLS0tXCIsIFwiLVhYLS1eXl5eXl5eXl5eXCJdLCBcIjExXzVfMVwiOiBbXCItLS0tLV5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCJYLS0tLS0tLVgtLVgtLVhcIiwgXCJYWFgtLS0tLVgtLVgtLVhcIiwgXCItWFgtLS0tLVgtLVgtLVhcIiwgXCItWFgtLS0tLVgtI1gtI1hcIiwgXCItWFgtLS0tLVgtLVgtLVhcIiwgXCIjWFgtLS0tLVgtLVgtLVhcIiwgXCItWFgtLS0tLVgtLVgtLVhcIiwgXCItWFgtLS0tLS0tLS0tLS1cIiwgXCItWFgtLV5eXl5eXl5eXl5cIl0sIFwiMTFfNV8yXCI6IFtcIlgtLV5eXl5eXl5eXl5eXlwiLCBcIlgtLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tWC0tWC0tLS1YWFwiLCBcIlgtLS0tWC0tWF4tLS1YKlwiLCBcIlgtLS0tWFhYWF5eLS1YJlwiLCBcIlgtLS0tWC0tWF4tLS1YKlwiLCBcIlgtLS0tWC0tWC0tLS1YWFwiLCBcIlgtLS0tLS0tLy9cXFxcXFxcXC8vXFxcXFwiLCBcIlgtLS0tLS0tXFxcXFxcXFwvL1xcXFxcXFxcL1wiLCBcIlgtLV5eXl5eXl5eXl5eXlwiXSwgXCIxMV82XzBcIjogW1wiXl5eXl5eXl5eXi0tWFhYXCIsIFwiLS0tLVgtLVgtLS0tWFhYXCIsIFwiLVgtLVgtLVgtLS0tWFhYXCIsIFwiLVgtLVgtLVgtLS0tWFhYXCIsIFwiLVgtLVgtLVgtLS0tWFhYXCIsIFwiI1gtI1gtI1gtLS0tWFhYXCIsIFwiLVgtLVgtLVgtLS0tWFhYXCIsIFwiLVgtLVgtLVgtLS0tLS0tXCIsIFwiLVgtLVgtLVgtLS0tLS0tXCIsIFwiLVgtLS0tLS0tLS0tWFgtXCIsIFwiXl5eXl5eXl5eXi0tWFhYXCJdLCBcIjExXzZfMVwiOiBbXCJeXl5eXl5eXl5eLS1YWFhcIiwgXCItLS0tWC0tWC0tLS1YWFhcIiwgXCItWC0tWC0tWC0tLS1YWFhcIiwgXCItWC0tWC0tWC0tLS1YWFhcIiwgXCItWC0tWC0tWC0tLS1YWFhcIiwgXCIjWC0jWC0jWC0tLS1YWFhcIiwgXCItWC0tWC0tWC0tLS1YWFhcIiwgXCItWC0tWC0tWC0tLS0tLS1cIiwgXCItWC0tWC0tWC0tLS0tLS1cIiwgXCItWC0tLS0tLS0tLS1YWC1cIiwgXCJeXl5eXl5eXl5eLS1YWFhcIl0sIFwiMTFfNF8wXCI6IFtcIi0tLS1eXl5eXl5eXl5eXlwiLCBcIlxcXFxcXFxcLS0tLS0tLS0tWC0tWFwiLCBcIi8vLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS1YWC0tWC0tWFwiLCBcIi0tLS0tLVhYWC0tWC0tWFwiLCBcIi0tLS0tLVgjKi0tWC0tWFwiLCBcIi0tLS0tLVhYWC0tWC0tWFwiLCBcIi0tLS0tLS1YWC0tWC0tWFwiLCBcIiYtLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS1eXl5eXl5eXl5eXlwiXSwgXCIxMV80XzFcIjogW1wiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiWC0tLS0tLS1YLS0tLS0tXCIsIFwiWFhYLS0tLS1YWC0tLS1YXCIsIFwiLVhYLS0tLS1YWFgtLVhYXCIsIFwiLVhYLS0tLS0qI1gtLVgjXCIsIFwiLVhYLS0tLS1YWFgtLVhYXCIsIFwiI1hYLS0tLS1YWC0tLS1YXCIsIFwiLVhYLS0tLS1YLS0tLS0tXCIsIFwiLVhYLS0tLS0tLS0tLS0tXCIsIFwiLVhYLS0tXl5eXl5eXl5eXCJdLCBcIjExXzRfMlwiOiBbXCJeXl5eXl5eXl5eLS1YWFhcIiwgXCItLS0tLS0tWC0tLS0tLVhcIiwgXCItWC0tWC0tWC0tLS0tLS1cIiwgXCItWC0tWC0tWC0tLS0tLVhcIiwgXCItWC0tWC0tWC0tLS0tLS1cIiwgXCIjWC0jWC0jWC0tLS0tLVhcIiwgXCItWC0tWC0tWC0tLS0tLS1cIiwgXCItWC0tWC0tWC0tLS0tLVhcIiwgXCItWC0tWC0tWC0tLS0tLS1cIiwgXCItWC0tWC0tLS0tLS0tLVhcIiwgXCJeXl5eXl5eXl5eLS1YWFhcIl0sIFwiMTJfNV8wXCI6IFtcIl5eXl5eXl5eXl4tLVhYXlwiLCBcIi0tLS1YLS1YLS0tLVhYXlwiLCBcIi1YLS1YLS1YLS0tLVhYXlwiLCBcIi1YLS1YLS1YLS0tLVhYXlwiLCBcIi1YLS1YLS1YLS0tLVhYXlwiLCBcIiNYLSNYLSNYLS0tLVhYXlwiLCBcIi1YLS1YLS1YLS0tLVhYXlwiLCBcIi1YLS1YLS1YLS0tLS0tXlwiLCBcIi1YLS1YLS1YLS0tLS0tLVwiLCBcIi1YLS0tLS0tLS0tLVhYLVwiLCBcIl5eXl5eXl5eXl4tLVhYXlwiXSwgXCIxMl81XzFcIjogW1wiXl5eXl5eXl5eXi0tWFheXCIsIFwiLS0tLVgtLVgtLS0tWFheXCIsIFwiLVgtLVgtLVgtLS0tWFheXCIsIFwiLVgtLVgtLVgtLS0tWFheXCIsIFwiLVgtLVgtLVgtLS0tWFheXCIsIFwiI1gtI1gtI1gtLS0tWFheXCIsIFwiLVgtLVgtLVgtLS0tWFheXCIsIFwiLVgtLVgtLVgtLS0tLS1eXCIsIFwiLVgtLVgtLVgtLS0tLS0tXCIsIFwiLVgtLS0tLS0tLS0tWFgtXCIsIFwiXl5eXl5eXl5eXi0tWFheXCJdLCBcIjEwXzVfMFwiOiBbXCItLS0tLS1eXl5eXl5eXl5cIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCJYLS0tLS0tLVgtLVgtLVhcIiwgXCJYWFgtLS0tLVgtLVgtLVhcIiwgXCItWFgtLS0tLVgtLVgtLVhcIiwgXCItWFgtLS0tLVgtI1gtI1hcIiwgXCItWFgtLS0tLVgtLVgtLVhcIiwgXCIjWFgtLS0tLVgtLVgtLVhcIiwgXCItWFgtLS0tLVgtLVgtLVhcIiwgXCItWFgtLS0tLS0tLS0tLS1cIiwgXCItWFgtLS1eXl5eXl5eXl5cIl0sIFwiMTBfNV8xXCI6IFtcIi0tLS0tLV5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tWC0tWC0tWFwiLCBcIlgtLS0tLS0tWC0tWC0tWFwiLCBcIlhYWC0tLS0tWC0tWC0tWFwiLCBcIi1YWC0tLS0tWC0tWC0tWFwiLCBcIi1YWC0tLS0tWC0jWC0jWFwiLCBcIi1YWC0tLS0tWC0tWC0tWFwiLCBcIiNYWC0tLS0tWC0tWC0tWFwiLCBcIi1YWC0tLS0tWC0tWC0tWFwiLCBcIi1YWC0tLS0tLS0tLS0tLVwiLCBcIi1YWC0tLV5eXl5eXl5eXlwiXSwgXCI5XzZfMFwiOiBbXCJYWFhYLS1eXl5eXl5eXl5cIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtI1hcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCIjWFhYLS0tLS0tLS0tLS1cIiwgXCJYWFhYLS1eXl5eXl5eXl5cIl0sIFwiOV82XzFcIjogW1wiWFhYWC0tXl5eXl5eXl5eXCIsIFwiLVhYWC0tLS1YLS1YLS1YXCIsIFwiLVhYWC0tLS1YLS1YLS1YXCIsIFwiLVhYWC0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS1YLS1YLSNYXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiLVhYWC0tLS1YLS1YLS1YXCIsIFwiLVhYWC0tLS1YLS1YLS1YXCIsIFwiI1hYWC0tLS0tLS0tLS0tXCIsIFwiWFhYWC0tXl5eXl5eXl5eXCJdLCBcIjlfNl8yXCI6IFtcIl5eXl5eXl5eXl4tLVhYLVwiLCBcIi0tLS0tLS0tLS0tLVhYLVwiLCBcIi0tLS0tLS0tLS0tLVhYLVwiLCBcIlgtLS0tWFhYLS0tLVhYLVwiLCBcIlheLS0tWCpYLS0tLS0tLVwiLCBcIlheXi0tWCYtLS0tLS0tLVwiLCBcIlheLS0tWCpYLS0tLVhYLVwiLCBcIlgtLS0tWFhYLS0tLVhYLVwiLCBcIi8vXFxcXFxcXFwvL1xcXFxcXFxcLS0tLVhYLVwiLCBcIlxcXFxcXFxcLy9cXFxcXFxcXC8vLS0tLVhYLVwiLCBcIl5eXl5eXl5eXl4tLVhYLVwiXSwgXCI5XzdfMFwiOiBbXCJYWFhYLS1eXl5eXl5eXl5cIiwgXCJYWFhYLS0tLVgtLVgtLVhcIiwgXCJYWFhYLS0tLVgtLVgtLVhcIiwgXCJYWFhYLS0tLVgtLVgtLVhcIiwgXCJYWFhYLS0tLVgtLVgtLVhcIiwgXCJYWFhYLS0tLVgtI1gtI1hcIiwgXCJYWFhYLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYWFhYLS1eXl5eXl5eXl5cIl0sIFwiOV83XzFcIjogW1wiWFhYWC0tXl5eXl5eXl5eXCIsIFwiWFhYWC0tLS1YLS1YLS1YXCIsIFwiWFhYWC0tLS1YLS1YLS1YXCIsIFwiWFhYWC0tLS1YLS1YLS1YXCIsIFwiWFhYWC0tLS1YLS1YLS1YXCIsIFwiWFhYWC0tLS1YLSNYLSNYXCIsIFwiWFhYWC0tLS1YLS1YLS1YXCIsIFwiLVhYWC0tLS1YLS1YLS1YXCIsIFwiLVhYWC0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiWFhYWC0tXl5eXl5eXl5eXCJdLCBcIjlfN18yXCI6IFtcIl5eXl5eXl5eXl4tLVhYWFwiLCBcIi0tLS0tLS0tLS0tLVhYWFwiLCBcIi0tLS0tLS0tLS0tLVhYWFwiLCBcIlgtLS0tWFhYLS0tLVhYWFwiLCBcIlheLS0tWCpYLS0tLVhYWFwiLCBcIlheXi0tWCYtLS0tLVhYWFwiLCBcIlheLS0tWCpYLS0tLVhYWFwiLCBcIlgtLS0tWFhYLS0tLS0tWFwiLCBcIi8vXFxcXFxcXFwvL1xcXFxcXFxcLS0tLS0tLVwiLCBcIlxcXFxcXFxcLy9cXFxcXFxcXC8vLS0tLVhYLVwiLCBcIl5eXl5eXl5eXl4tLVhYWFwiXSwgXCIxMF82XzBcIjogW1wiWFhYWC0tXl5eXl5eXl5eXCIsIFwiLVhYWC0tLS1YLS1YLS1YXCIsIFwiLVhYWC0tLS1YLS1YLS1YXCIsIFwiLVhYWC0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiLS0tLS0tLS1YLSNYLSNYXCIsIFwiLS0tLS0tLS1YLS1YLS1YXCIsIFwiLVhYWC0tLS1YLS1YLS1YXCIsIFwiLVhYWC0tLS1YLS1YLS1YXCIsIFwiI1hYWC0tLS0tLS0tLS0tXCIsIFwiWFhYWC0tXl5eXl5eXl5eXCJdLCBcIjEwXzZfMVwiOiBbXCJYWFhYLS1eXl5eXl5eXl5cIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLVgtI1gtI1hcIiwgXCItLS0tLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCItWFhYLS0tLVgtLVgtLVhcIiwgXCIjWFhYLS0tLS0tLS0tLS1cIiwgXCJYWFhYLS1eXl5eXl5eXl5cIl0sIFwiMTBfNl8yXCI6IFtcIl5eXl5eXl5eXl4tLVhYWFwiLCBcIi0tLS0tLS0tLS0tLVhYWFwiLCBcIi0tLS0tLS0tLS0tLVhYWFwiLCBcIlgtLS0tWFhYLS0tLVhYWFwiLCBcIlheLS0tWCpYLS0tLS0tI1wiLCBcIlheXi0tWCYtLS0tLS0tLVwiLCBcIlheLS0tWCpYLS0tLS0tLVwiLCBcIlgtLS0tWFhYLS0tLVhYWFwiLCBcIi8vXFxcXFxcXFwvL1xcXFxcXFxcLS0tLVhYWFwiLCBcIlxcXFxcXFxcLy9cXFxcXFxcXC8vLS0tLVhYWFwiLCBcIl5eXl5eXl5eXl4tLVhYWFwiXSwgXCI3XzlfMFwiOiBbXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItLSotLS0tLSotLS0jWFhcIiwgXCItXl5eLS0tLS0tLS0tWFhcIiwgXCItLSYtLS0tLS0jLS0tLSpcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIiwgXCItXl5eLS1YWFhYWFhYWFhcIl0sIFwiN185XzFcIjogW1wiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLS0qLS0tLS0qLS0tI1hYXCIsIFwiLV5eXi0tLS0tLS0tLVhYXCIsIFwiLS0mLS0tLS0tIy0tLS0qXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCIsIFwiLV5eXi0tWFhYWFhYWFhYXCJdLCBcIjhfOF8wXCI6IFtcIlhYWFhYWFhYLS1eXl5eXlwiLCBcIi1YWFhYWFhYLS0tLS0tLVwiLCBcIi1YWFhYWFhYLS0tLS0tWFwiLCBcIi1YWFhYWFhYLS0tLS1YWFwiLCBcIi0tLS0tLS0tLS0tLVhYWFwiLCBcIi0tLSYtLS0tLS0tLVgjKlwiLCBcIi0tLS0tLSotLS0tLVhYWFwiLCBcIi1YWFhYWFhYLS0tLS1YWFwiLCBcIi1YWFhYWFhYLS0tLS0tWFwiLCBcIiNYWFhYWFhYLS0tLS0tLVwiLCBcIlhYWFhYWFhYLS1eXl5eXlwiXSwgXCI4XzhfMVwiOiBbXCJYWFhYWFhYWC0tXl5eXl5cIiwgXCItWFhYWFhYWC0tLS0tLS1cIiwgXCItWFhYWFhYWC0tLS0tLVhcIiwgXCItWFhYWFhYWC0tLS0tWFhcIiwgXCItLS0tLS0tLS0tLS1YWFhcIiwgXCItLS0mLS0tLS0tLS1YIypcIiwgXCItLS0tLS0qLS0tLS1YWFhcIiwgXCItWFhYWFhYWC0tLS0tWFhcIiwgXCItWFhYWFhYWC0tLS0tLVhcIiwgXCIjWFhYWFhYWC0tLS0tLS1cIiwgXCJYWFhYWFhYWC0tXl5eXl5cIl0sIFwiMTFfMl8wXCI6IFtcIi0tLS0tLV5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tXi0tLS0tLVwiLCBcIi0tLS0tLS0tXi0tLS1YLVwiLCBcIi0tLS0tLS0tXi0tLVhYLVwiLCBcIi0tLS0tLS0tXi0tWFhYLVwiLCBcIi0tLSMtLS0tLS0tWCMqLVwiLCBcIi0tLS0tLS0tJi0tWFhYLVwiLCBcIi9cXFxcXFxcXC0tLS0tLS0tLVhYLVwiLCBcIlxcXFwvLy0tLS0tLS0tLS1YLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIiotLS0tLV5eXl5eXl5eXlwiXSwgXCIxMV8yXzFcIjogW1wiLS0tLS0tXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS1eLS0tLS0tXCIsIFwiLS0tLS0tLS1eLS0tLVgtXCIsIFwiLS0tLS0tLS1eLS0tWFgtXCIsIFwiLS0tLS0tLS1eLS1YWFgtXCIsIFwiLS0tIy0tLS0tLS1YIyotXCIsIFwiLS0tLS0tLS0mLS1YWFgtXCIsIFwiL1xcXFxcXFxcLS0tLS0tLS0tWFgtXCIsIFwiXFxcXC8vLS0tLS0tLS0tLVgtXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiKi0tLS0tXl5eXl5eXl5eXCJdLCBcIjExXzJfMlwiOiBbXCItLS0tXl5eXl5eXl5eXl5cIiwgXCJcXFxcXFxcXC0tLS0tLS0tLV5eXl5cIiwgXCIvLy0tLS0tLVgtLV5eXl5cIiwgXCItLS0tLS0tWFgtLV5eXl5cIiwgXCItLS0tLS1YWFgtLV5eXl5cIiwgXCItLS0tLS1YIyotLS0tLS1cIiwgXCItLS0tLS1YWFgtLV5eXl5cIiwgXCItLS0tLS0tWFgtLV5eXl5cIiwgXCImLS0tLS0tLVgtLV5eXl5cIiwgXCItLS0tLS0tLS0tLV5eXl5cIiwgXCItLS0tXl5eXl5eXl5eXl5cIl0sIFwiNV8xMV8wXCI6IFtcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tKi0tLS0tLSotLVwiLCBcIiMtLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLSMtLSMtLS0jLVwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiLCBcIi0tLVhYWFhYWFhYWFhYWFwiXSwgXCI1XzExXzFcIjogW1wiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0qLS0tLS0tKi0tXCIsIFwiIy0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tIy0tIy0tLSMtXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCJdLCBcIjVfMTFfMlwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFgtLV5eXl5cIiwgXCJYWFhYWFhYWFgtLS0tXl5cIiwgXCJYWFhYWFhYWFgtLS0tLS1cIiwgXCJYWFhYLS0tLS0tLS0tLS1cIiwgXCJYWFhYLS0tLS0tLS0tLS1cIiwgXCItKi0tLS0qLS0tLS0tLS1cIiwgXCJYWFhYWFhYWFgtLS0tLS1cIiwgXCJYWFhYWFhYWFgtLS0tXl5cIiwgXCJYWFhYWFhYWFgtLV5eXl5cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiNl8xMF8wXCI6IFtcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIl4tLS0tLS0tLSotLS0qLVwiLCBcIl5eLS0tLS0tLS0tLS0tLVwiLCBcIl4tLS0tLSMtLS0jLS0tI1wiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiLCBcIi0tLS1YWFhYWFhYWFhYWFwiXSwgXCI2XzEwXzFcIjogW1wiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiXi0tLS0tLS0tKi0tLSotXCIsIFwiXl4tLS0tLS0tLS0tLS0tXCIsIFwiXi0tLS0tIy0tLSMtLS0jXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCIsIFwiLS0tLVhYWFhYWFhYWFhYXCJdLCBcIjZfMTBfMlwiOiBbXCJYWFhYWFhYWC0tXl5eXl5cIiwgXCJYWFhYWFhYWC0tLS1YLS1cIiwgXCJYWFhYWFhYWC0tLS1YLS1cIiwgXCJYWFhYWFhYWC0tLS1YLS1cIiwgXCJYWFhYWFgtLS0tLS1YLS1cIiwgXCJYWFhYWFgtLS0tLS1YLSNcIiwgXCItKi0tLS0tLS0tLS1YLS1cIiwgXCJYWFhYWFhYWC0tLS1YLS1cIiwgXCJYWFhYWFhYWC0tLS1YLS1cIiwgXCJYWFhYWFhYWC0tLS0tLS1cIiwgXCJYWFhYWFhYWC0tXl5eXl5cIl0sIFwiMTBfN18wXCI6IFtcIl5eXl5eXl5eXi0tWFhYWFwiLCBcIi0tLS0tLS0tLS0tWFhYWFwiLCBcIi0tLS1YLS0tLS0tWFhYWFwiLCBcIlhYLS1YWC0tLS0tWFhYWFwiLCBcIipYLS1YWFgtLS0tWFhYWFwiLCBcIiYtLS0qI1gtLS0tWFhYWFwiLCBcIipYLS1YWFgtLS0tWFhYWFwiLCBcIlhYLS1YWC0tLS0tLS1YWFwiLCBcIlxcXFxcXFxcLS1YLS0tLS0tLS0tLVwiLCBcIi8vLS0tLS0tLS0tWFgtLVwiLCBcIl5eXl5eXl5eXi0tWFhYWFwiXSwgXCIxMF83XzFcIjogW1wiXl5eXl5eXl5eLS1YWFhYXCIsIFwiLS0tLS0tLS0tLS1YWFhYXCIsIFwiLS0tLVgtLS0tLS1YWFhYXCIsIFwiWFgtLVhYLS0tLS1YWFhYXCIsIFwiKlgtLVhYWC0tLS1YWFhYXCIsIFwiJi0tLSojWC0tLS1YWFhYXCIsIFwiKlgtLVhYWC0tLS1YWFhYXCIsIFwiWFgtLVhYLS0tLS0tLVhYXCIsIFwiXFxcXFxcXFwtLVgtLS0tLS0tLS0tXCIsIFwiLy8tLS0tLS0tLS1YWC0tXCIsIFwiXl5eXl5eXl5eLS1YWFhYXCJdLCBcIjE1XzVfMFwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItIy0tLS0tLS0tLS0tLS1cIiwgXCItWC0tLS0tLS0tLS0tLS1cIiwgXCItWC0tWC0tLVgtLS0tWFhcIiwgXCItWC0tWC0tLVheLS0tWCpcIiwgXCItWC0tWFhYWFheXi0tWCZcIiwgXCItWC0tWC0tLVheLS0tWCpcIiwgXCItWC0tWC0tLVgtLS0tWFhcIiwgXCItWC0tLS0tLS8vXFxcXFxcXFwvL1xcXFxcIiwgXCItWC0tLS0tLVxcXFxcXFxcLy9cXFxcXFxcXC9cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTVfNV8xXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIi0jLS0tLS0tLS0tLS0tLVwiLCBcIi1YLS0tLS0tLS0tLS0tLVwiLCBcIi1YLS1YLS0tWC0tLS1YWFwiLCBcIi1YLS1YLS0tWF4tLS1YKlwiLCBcIi1YLS1YWFhYWF5eLS1YJlwiLCBcIi1YLS1YLS0tWF4tLS1YKlwiLCBcIi1YLS1YLS0tWC0tLS1YWFwiLCBcIi1YLS0tLS0tLy9cXFxcXFxcXC8vXFxcXFwiLCBcIi1YLS0tLS0tXFxcXFxcXFwvL1xcXFxcXFxcL1wiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxNV81XzJcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tWC0tXCIsIFwiWC0tLS1YWFgtLS1YWC0tXCIsIFwiWF4tLS1YKlgtLVhYWC0tXCIsIFwiWF5eLS1YJi0tLVgjKi0tXCIsIFwiWF4tLS1YKlgtLVhYWC0tXCIsIFwiWC0tLS1YWFgtLS1YWC0tXCIsIFwiLy9cXFxcXFxcXC8vXFxcXFxcXFwtLS0tWC0tXCIsIFwiXFxcXFxcXFwvL1xcXFxcXFxcLy8tLS0tLS0tXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjEyXzRfMFwiOiBbXCItLS0tXl5eXl5eXl5eXl5cIiwgXCJcXFxcXFxcXC0tLS0tLS0tLVgtLVhcIiwgXCIvLy0tLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tWFgtLVgtLVhcIiwgXCItLS0tLS1YWFgtLVgtLVhcIiwgXCItLS0tLS1YIyotLVgtI1hcIiwgXCItLS0tLS1YWFgtLVgtLVhcIiwgXCItLS0tLS0tWFgtLVgtLVhcIiwgXCImLS0tLS0tLVgtLVgtLVhcIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tXl5eXl5eXl5eXl5cIl0sIFwiMTJfNF8xXCI6IFtcIi0tLS1eXl5eXl5eXl5eXlwiLCBcIlxcXFxcXFxcLS0tLS0tLS0tWC0tWFwiLCBcIi8vLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS1YWC0tWC0tWFwiLCBcIi0tLS0tLVhYWC0tWC0tWFwiLCBcIi0tLS0tLVgjKi0tWC0jWFwiLCBcIi0tLS0tLVhYWC0tWC0tWFwiLCBcIi0tLS0tLS1YWC0tWC0tWFwiLCBcIiYtLS0tLS0tWC0tWC0tWFwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS1eXl5eXl5eXl5eXlwiXSwgXCIxMl80XzJcIjogW1wiXl5eXl5eXl5eXi0tXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiLS0tLS0tLS0tLS0tLS1YXCIsIFwiWC0tLS1YWFgtLS0tLS1YXCIsIFwiWF4tLS1YKlgtLS0tLS1YXCIsIFwiWF5eLS1YJi0tLS0tLS1YXCIsIFwiWF4tLS1YKlgtLS0tLS1YXCIsIFwiWC0tLS1YWFgtLS0tLS1YXCIsIFwiLy9cXFxcXFxcXC8vXFxcXFxcXFwtLS0tLS1YXCIsIFwiXFxcXFxcXFwvL1xcXFxcXFxcLy8tLS0tLS0tXCIsIFwiXl5eXl5eXl5eXi0tXl5eXCJdLCBcIjhfOV8wXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIl5eXl5eXi0tWFhYWFhYWFwiLCBcIl5eXi0tLS0tWFhYWFhYWFwiLCBcIi0tLS0tLS0tWFhYWFhYWFwiLCBcIi0tLy9cXFxcXFxcXC0tLS0tLS0qLVwiLCBcIi0tXFxcXFxcXFwvLy0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0jLS0tI1wiLCBcIi0tLS0tLS0tWFhYWFhYWFwiLCBcIl5eXi0tLS0tWFhYWFhYWFwiLCBcIl5eXl5eXi0tWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI4XzlfMVwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJeXl5eXl4tLVhYWFhYWFhcIiwgXCJeXl4tLS0tLVhYWFhYWFhcIiwgXCItLS0tLS0tLVhYWFhYWFhcIiwgXCItLS8vXFxcXFxcXFwtLS0tLS0tKi1cIiwgXCItLVxcXFxcXFxcLy8tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tIy0tLSNcIiwgXCItLS0tLS0tLVhYWFhYWFhcIiwgXCJeXl4tLS0tLVhYWFhYWFhcIiwgXCJeXl5eXl4tLVhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiOF85XzJcIjogW1wiXl5eXi0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiWFgtLS0tWFhYWFhYWFhYXCIsIFwiKlgtLS0tLS0tKi0tLSotXCIsIFwiJi0tLS0tLS0tLS0tLS0tXCIsIFwiKlgtLS0tLS0tLSMtLS0jXCIsIFwiWFgtLS0tWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLS0tWFhYWFhYWFhYXCIsIFwiLy8tLS0tWFhYWFhYWFhYXCIsIFwiXl5eXi0tWFhYWFhYWFhYXCJdLCBcIjlfOF8wXCI6IFtcIl5eXl5eXl4tLVhYWFhYWFwiLCBcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIi0tLS1YLS0tLVhYWFhYWFwiLCBcIi0tLVhYLS0tLVhYWFhYWFwiLCBcIi0tWFhYLS0tLS0tI1hYWFwiLCBcIi0tWCMqLS0tLS0tLVhYWFwiLCBcIi0tWFhYLS0tLS0tLS0qLVwiLCBcIi0tLVhYLS0tLVhYWFhYWFwiLCBcIi0tLS1YLS0tLVhYWFhYWFwiLCBcIi0tLS0tLS0tLVhYWFhYWFwiLCBcIl5eXl5eXl4tLVhYWFhYWFwiXSwgXCI5XzhfMVwiOiBbXCJeXl5eXl5eLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCItLS0tWC0tLS1YWFhYWFhcIiwgXCItLS1YWC0tLS1YWFhYWFhcIiwgXCItLVhYWC0tLS0tLSNYWFhcIiwgXCItLVgjKi0tLS0tLS1YWFhcIiwgXCItLVhYWC0tLS0tLS0tKi1cIiwgXCItLS1YWC0tLS1YWFhYWFhcIiwgXCItLS0tWC0tLS1YWFhYWFhcIiwgXCItLS0tLS0tLS1YWFhYWFhcIiwgXCJeXl5eXl5eLS1YWFhYWFhcIl0sIFwiMTZfNV8wXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tWC0tWC0tWC0tWFwiLCBcIi0tLS0tWC0tWC0tWC0tWFwiLCBcIlhYLS0tWC0tWC0tWC0tWFwiLCBcIipYLS0tWC0tWC0tWC0tWFwiLCBcIiYtLS0tWC0jWC0jWC0jWFwiLCBcIipYLS0tWC0tWC0tWC0tWFwiLCBcIlhYLS0tWC0tWC0tWC0tWFwiLCBcIlxcXFxcXFxcLS0tWC0tWC0tWC0tWFwiLCBcIi8vLS0tLS0tLS0tLS0tLVwiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxNl81XzFcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS1YLS1YLS1YLS1YXCIsIFwiLS0tLS1YLS1YLS1YLS1YXCIsIFwiWFgtLS1YLS1YLS1YLS1YXCIsIFwiKlgtLS1YLS1YLS1YLS1YXCIsIFwiJi0tLS1YLSNYLSNYLSNYXCIsIFwiKlgtLS1YLS1YLS1YLS1YXCIsIFwiWFgtLS1YLS1YLS1YLS1YXCIsIFwiXFxcXFxcXFwtLS1YLS1YLS1YLS1YXCIsIFwiLy8tLS0tLS0tLS0tLS0tXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjdfMTBfMFwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJeXl5eXl4tLVhYWFhYWFhcIiwgXCJeXl4tLS0tLVhYWFhYWFhcIiwgXCItLS0tLS0tLVhYWFhYWFhcIiwgXCItLS8vXFxcXFxcXFwtLS0tI1hYWFhcIiwgXCItLVxcXFxcXFxcLy8tLS0tLVhYWFhcIiwgXCItLS0tLS0tLS0tLS0qLS1cIiwgXCItLS0tLS0tLVhYWFhYWFhcIiwgXCJeXl4tLS0tLVhYWFhYWFhcIiwgXCJeXl5eXl4tLVhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiN18xMF8xXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIl5eXl5eXi0tWFhYWFhYWFwiLCBcIl5eXi0tLS0tWFhYWFhYWFwiLCBcIi0tLS0tLS0tWFhYWFhYWFwiLCBcIi0tLy9cXFxcXFxcXC0tLS0jWFhYWFwiLCBcIi0tXFxcXFxcXFwvLy0tLS0tWFhYWFwiLCBcIi0tLS0tLS0tLS0tLSotLVwiLCBcIi0tLS0tLS0tWFhYWFhYWFwiLCBcIl5eXi0tLS0tWFhYWFhYWFwiLCBcIl5eXl5eXi0tWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI3XzEwXzJcIjogW1wiXl5eXl4tLVhYWFhYWFhYXCIsIFwiLS0tLS0tLVhYWFhYWFhYXCIsIFwiLS0tLS0tLVhYWFhYWFhYXCIsIFwiWFhYLS0tLVhYWFhYWFhYXCIsIFwiWCpYLS0tLS0tI1hYWFhYXCIsIFwiWCYtLS0tLS0tLVhYWFgtXCIsIFwiWCpYLS0tLS0tLS0qLS0tXCIsIFwiWFhYLS0tLVhYWFhYWFhYXCIsIFwiL1xcXFxcXFxcLS0tLVhYWFhYWFhYXCIsIFwiXFxcXC8vLS0tLVhYWFhYWFhYXCIsIFwiXl5eXl4tLVhYWFhYWFhYXCJdLCBcIjRfMTZfMFwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItI1hYWFgtLS0tLSNYWFhcIiwgXCItLVhYWFgtLS0tLS1YWFhcIiwgXCItLS0qLS0tLSotLS0tKi1cIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiNF8xNl8xXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi0jWFhYWC0tLS0tI1hYWFwiLCBcIi0tWFhYWC0tLS0tLVhYWFwiLCBcIi0tLSotLS0tKi0tLS0qLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI2XzExXzBcIjogW1wiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0qLS0tKi0tLSotXCIsIFwiIy0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tIy0tLSMtLS0jXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCIsIFwiLS0tWFhYWFhYWFhYWFhYXCJdLCBcIjZfMTFfMVwiOiBbXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS0tLSotLS0qLS0tKi1cIiwgXCIjLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0jLS0tIy0tLSNcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIiwgXCItLS1YWFhYWFhYWFhYWFhcIl0sIFwiMV8xN18wXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi0tLS0tLS0tI1hYWFhYLVwiLCBcIlhYWFhYWC0tLVhYWFhYLVwiLCBcIlhYWFhYWC0tLS0qLS0tLVwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCIxXzE3XzFcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0tLS0tI1hYWFgtXCIsIFwiWFhYWFhYWC0tLVhYWFgtXCIsIFwiWFhYWFhYWC0tLS0qLS0tXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjE1XzZfMFwiOiBbXCJeXl5eXl5eXl5eXl5eXl5cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCItLS0tLS0tLS0tLS0tLS1cIiwgXCJYWFgtLVgtLVgtLS0tWFhcIiwgXCJYKlgtLVgtLVheLS0tWCpcIiwgXCJYJi0tLVhYWFheXi0tWCZcIiwgXCJYKlgtLVgtLVheLS0tWCpcIiwgXCJYWFgtLVgtLVgtLS0tWFhcIiwgXCIvXFxcXFxcXFwtLS0tLS8vXFxcXFxcXFwvL1xcXFxcIiwgXCJcXFxcLy8tLS0tLVxcXFxcXFxcLy9cXFxcXFxcXC9cIiwgXCJeXl5eXl5eXl5eXl5eXl5cIl0sIFwiMTVfNl8xXCI6IFtcIl5eXl5eXl5eXl5eXl5eXlwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIi0tLS0tLS0tLS0tLS0tLVwiLCBcIlhYWC0tWC0tWC0tLS1YWFwiLCBcIlgqWC0tWC0tWF4tLS1YKlwiLCBcIlgmLS0tWFhYWF5eLS1YJlwiLCBcIlgqWC0tWC0tWF4tLS1YKlwiLCBcIlhYWC0tWC0tWC0tLS1YWFwiLCBcIi9cXFxcXFxcXC0tLS0tLy9cXFxcXFxcXC8vXFxcXFwiLCBcIlxcXFwvLy0tLS0tXFxcXFxcXFwvL1xcXFxcXFxcL1wiLCBcIl5eXl5eXl5eXl5eXl5eXlwiXSwgXCIxNV82XzJcIjogW1wiXl5eXl5eXl5eXl5eXl5eXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiLS0tLS0tLS0tLS0tLS0tXCIsIFwiWFhYLS1YLS1YLS0tLVhYXCIsIFwiWCpYLS1YLS1YXi0tLVgqXCIsIFwiWCYtLS1YWFhYXl4tLVgmXCIsIFwiWCpYLS1YLS1YXi0tLVgqXCIsIFwiWFhYLS1YLS1YLS0tLVhYXCIsIFwiL1xcXFxcXFxcLS0tLS0vL1xcXFxcXFxcLy9cXFxcXCIsIFwiXFxcXC8vLS0tLS1cXFxcXFxcXC8vXFxcXFxcXFwvXCIsIFwiXl5eXl5eXl5eXl5eXl5eXCJdLCBcIjRfMTVfMFwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0jWFhYWC0tLS0tI1hcIiwgXCItLS0tWFhYWC0tLS0tLVhcIiwgXCItLS0tLSotLS0tKi0tLS1cIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCItWFhYWFhYWFhYWFhYWFhcIiwgXCIjWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiNF8xNV8xXCI6IFtcIlhYWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi0tLSNYWFhYLS0jWFhYWFwiLCBcIi0tLS1YWFhYLS0tWFhYWFwiLCBcIi0tLS0tKi0tLS0tLSotLVwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIi1YWFhYWFhYWFhYWFhYWFwiLCBcIiNYWFhYWFhYWFhYWFhYWFwiLCBcIlhYWFhYWFhYWFhYWFhYWFwiXSwgXCI1XzE1XzBcIjogW1wiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiLS0tLS0qLS0tKi0tLSotXCIsIFwiWFgtLS0tLS0tLS0tLS0tXCIsIFwiWFgtLS0tIy0tLSMtLS0jXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCIsIFwiWFhYWFhYWFhYWFhYWFhYXCJdLCBcIjVfMTVfMVwiOiBbXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCItLS0tLSotLS0qLS0tKi1cIiwgXCJYWC0tLS0tLS0tLS0tLS1cIiwgXCJYWC0tLS0jLS0tIy0tLSNcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIiwgXCJYWFhYWFhYWFhYWFhYWFhcIl0sIFwiOF8xMF8wXCI6IFtcIl5eXl4tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIi0tLS0tLVhYWFhYWFhYWFwiLCBcIlhYLS0tLVhYWFhYWFhYWFwiLCBcIipYLS0tLS0tKi0tLSNYWFwiLCBcIiYtLS0tLS0tLS0tLS1YWFwiLCBcIipYLS0tLS0tLSMtLS0tKlwiLCBcIlhYLS0tLVhYWFhYWFhYWFwiLCBcIlxcXFxcXFxcLS0tLVhYWFhYWFhYWFwiLCBcIi8vLS0tLVhYWFhYWFhYWFwiLCBcIl5eXl4tLVhYWFhYWFhYWFwiXSwgXCI4XzEwXzFcIjogW1wiXl5eXi0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiLS0tLS0tWFhYWFhYWFhYXCIsIFwiWFgtLS0tWFhYWFhYWFhYXCIsIFwiKlgtLS0tLS0qLS0tI1hYXCIsIFwiJi0tLS0tLS0tLS0tLVhYXCIsIFwiKlgtLS0tLS0tIy0tLS0qXCIsIFwiWFgtLS0tWFhYWFhYWFhYXCIsIFwiXFxcXFxcXFwtLS0tWFhYWFhYWFhYXCIsIFwiLy8tLS0tWFhYWFhYWFhYXCIsIFwiXl5eXi0tWFhYWFhYWFhYXCJdLCBcIjdfMTFfMFwiOiBbXCJeXl5eXi0tWFhYWFhYWFhcIiwgXCItLS0tLS0tWFhYWFhYWFhcIiwgXCItLS0tLS0tWFhYWFhYWFhcIiwgXCJYWFgtLS0tWFhYWFhYWFhcIiwgXCJYKlgtLS0tWFgtLSNYWFhcIiwgXCJYJi0tLS0tWFgtLS1YWFhcIiwgXCJYKlgtLS0tLS0tLS0tKi1cIiwgXCJYWFgtLS0tWFhYWFhYWFhcIiwgXCIvXFxcXFxcXFwtLS0tWFhYWFhYWFhcIiwgXCJcXFxcLy8tLS0tWFhYWFhYWFhcIiwgXCJeXl5eXi0tWFhYWFhYWFhcIl0sIFwiN18xMV8xXCI6IFtcIl5eXl5eLS1YWFhYWFhYWFwiLCBcIi0tLS0tLS1YWFhYWFhYWFwiLCBcIi0tLS0tLS1YWFhYWFhYWFwiLCBcIlhYWC0tLS1YWFhYWFhYWFwiLCBcIlgqWC0tLS1YWC0tI1hYWFwiLCBcIlgmLS0tLS1YWC0tLVhYWFwiLCBcIlgqWC0tLS0tLS0tLS0qLVwiLCBcIlhYWC0tLS1YWFhYWFhYWFwiLCBcIi9cXFxcXFxcXC0tLS1YWFhYWFhYWFwiLCBcIlxcXFwvLy0tLS1YWFhYWFhYWFwiLCBcIl5eXl5eLS1YWFhYWFhYWFwiXSB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlJvb21HZW5lcmF0b3IgPSB2b2lkIDA7XG5jb25zdCByb3RfanNfMSA9IHJlcXVpcmUoXCJyb3QtanNcIik7XG5jb25zdCBnYW1lTWFwXzEgPSByZXF1aXJlKFwiLi4vZ2FtZS9nYW1lTWFwXCIpO1xuY29uc3QgYmFzZWxpbmVHZW5lcmF0b3JfMSA9IHJlcXVpcmUoXCIuL2Jhc2VsaW5lR2VuZXJhdG9yXCIpO1xuY29uc3QgbGV2ZWxzXzEgPSByZXF1aXJlKFwiLi9sZXZlbHNcIik7XG5jb25zdCB0aWxlRmFjdG9yeV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi90aWxlL3RpbGVGYWN0b3J5XCIpKTtcbmNvbnN0IGdlbmVyYXRpb25VdGlsaXR5XzEgPSByZXF1aXJlKFwiLi9nZW5lcmF0aW9uVXRpbGl0eVwiKTtcbmNvbnN0IGJhc2VSb29tXzEgPSByZXF1aXJlKFwiLi9iYXNlUm9vbVwiKTtcbmNvbnN0IGVudGl0eUZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuLi9lbnRpdHkvZW50aXR5RmFjdG9yeVwiKTtcbmNsYXNzIFJlY3RhbmdsZSB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLngxID0geDtcbiAgICAgICAgdGhpcy54MiA9IHggKyB3aWR0aDtcbiAgICAgICAgdGhpcy55MSA9IHk7XG4gICAgICAgIHRoaXMueTIgPSB5ICsgaGVpZ2h0O1xuICAgIH1cbiAgICBjZW50ZXIoKSB7XG4gICAgICAgIHJldHVybiBbTWF0aC5yb3VuZCgodGhpcy54MSArIHRoaXMueDIpIC8gMiksIE1hdGgucm91bmQoKHRoaXMueTEgKyB0aGlzLnkyKSAvIDIpXTtcbiAgICB9XG4gICAgaW50ZXJzZWN0cyhvdGhlcnMpIHtcbiAgICAgICAgZm9yIChsZXQgb3RoZXIgb2Ygb3RoZXJzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy54MSAtIDEgPD0gb3RoZXIueDIgJiZcbiAgICAgICAgICAgICAgICB0aGlzLngyICsgMSA+PSBvdGhlci54MSAmJlxuICAgICAgICAgICAgICAgIHRoaXMueTEgLSAxIDw9IG90aGVyLnkyICYmXG4gICAgICAgICAgICAgICAgdGhpcy55MiArIDEgPj0gb3RoZXIueTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGdldENvbm5lY3Rpb25Qb2ludChvdGhlcikge1xuICAgICAgICBsZXQgeCA9IDA7XG4gICAgICAgIGxldCB5ID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICAgICAxXG4gICAgICAgICAqICAg4pSMLS0t4pSQXG4gICAgICAgICAqIDIg4pSCICAg4pSCIDNcbiAgICAgICAgICogICDilJQtLS3ilJhcbiAgICAgICAgICogICAgIDRcbiAgICAgICAgICpcbiAgICAgICAgICogVGhlcmUgYXJlIDQgcG9zc2libGUgY29ubmVjdGlvbiBwb2ludHMgYW5kIGVhY2ggaWYgc3RhdGVtZW50IGdvZXMgdGhyb3VnaFxuICAgICAgICAgKiB0aGVtIG9uZSBhdCBhIHRpbWUgZm9yIHNpbXBsaWNpdHkgLyBjbGFyaXR5LiBUaGlzIGlzbid0IHRoZSBiZXN0IHdheSBhc1xuICAgICAgICAgKiBpdCBuYXR1cmFsbHkgZmF2b3JzIHRoZSBvcmRlcmluZywgYnV0IHRoYXQgY2FuIGFsd2F5cyBiZSBpbXByb3ZlZCBsYXRlci5cbiAgICAgICAgICovXG4gICAgICAgIGlmICh0aGlzLnkyIDwgb3RoZXIueTEpIHtcbiAgICAgICAgICAgIHggPSBNYXRoLnJvdW5kKCh0aGlzLngxICsgdGhpcy54MikgLyAyKTtcbiAgICAgICAgICAgIHkgPSB0aGlzLnkxIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLngxIDwgb3RoZXIueDIpIHtcbiAgICAgICAgICAgIHggPSB0aGlzLngxIC0gMTtcbiAgICAgICAgICAgIHkgPSBNYXRoLnJvdW5kKCh0aGlzLnkxICsgdGhpcy55MikgLyAyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLngyIDwgb3RoZXIueDEpIHtcbiAgICAgICAgICAgIHggPSB0aGlzLngyICsgMTtcbiAgICAgICAgICAgIHkgPSBNYXRoLnJvdW5kKCh0aGlzLnkxICsgdGhpcy55MikgLyAyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHggPSBNYXRoLnJvdW5kKCh0aGlzLngxICsgdGhpcy54MikgLyAyKTtcbiAgICAgICAgICAgIHkgPSB0aGlzLnkyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbeCwgeV07XG4gICAgfVxufVxuZnVuY3Rpb24gZHJhd1RpbGUobWFwLCB4LCB5LCB0aWxlKSB7XG4gICAgc3dpdGNoICh0aWxlKSB7XG4gICAgICAgIGNhc2UgJ1gnOiB7XG4gICAgICAgICAgICAvLyBkZWZhdWx0IGlzIHdhbGwuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICcjJzoge1xuICAgICAgICAgICAgbWFwLnNldFRpbGUoeCwgeSwgdGlsZUZhY3RvcnlfMS5kZWZhdWx0LmZsb29yKTtcbiAgICAgICAgICAgICgwLCBlbnRpdHlGYWN0b3J5XzEuc3Bhd25FbmVteSkobWFwLCB4LCB5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJy0nOiB7XG4gICAgICAgICAgICBtYXAuc2V0VGlsZSh4LCB5LCB0aWxlRmFjdG9yeV8xLmRlZmF1bHQuZmxvb3IpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnLyc6IHtcbiAgICAgICAgICAgIG1hcC5zZXRUaWxlKHgsIHksIHRpbGVGYWN0b3J5XzEuZGVmYXVsdC5mb3J3YXJkU2xhc2gpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnXFxcXCc6IHtcbiAgICAgICAgICAgIG1hcC5zZXRUaWxlKHgsIHksIHRpbGVGYWN0b3J5XzEuZGVmYXVsdC5iYWNrd2FyZFNsYXNoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJyonOiB7XG4gICAgICAgICAgICBtYXAuc2V0VGlsZSh4LCB5LCB0aWxlRmFjdG9yeV8xLmRlZmF1bHQuZmxvb3IpO1xuICAgICAgICAgICAgKDAsIGVudGl0eUZhY3RvcnlfMS5zcGF3bkdlbSkobWFwLCB4LCB5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ0EnOiB7XG4gICAgICAgICAgICBtYXAuc2V0VGlsZSh4LCB5LCB0aWxlRmFjdG9yeV8xLmRlZmF1bHQuZmxvb3IpO1xuICAgICAgICAgICAgKDAsIGVudGl0eUZhY3RvcnlfMS5zcGF3bkFsdGFyKShtYXAsIHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIG1hcC5zZXRUaWxlKHgsIHksIHRpbGVGYWN0b3J5XzEuZGVmYXVsdC5mbG9vcik7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYFVuaGFuZGxlZCB0aWxlIHR5cGU6ICR7dGlsZX1gKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuY2xhc3MgUm9vbUdlbmVyYXRvciBleHRlbmRzIGJhc2VsaW5lR2VuZXJhdG9yXzEuQmFzZUxpbmVHZW5lcmF0b3Ige1xuICAgIGdlbmVyYXRlKCkge1xuICAgICAgICBsZXQgbWFwID0gbmV3IGdhbWVNYXBfMS5HYW1lTWFwKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgLy8gV2Uga25vdyBldmVyeSByb29tIGluIHRoaXMgZGF0YXNldCBoYXMgdGhlIHNhbWUgZGltZW5zaW9uc1xuICAgICAgICBjb25zdCB3ID0gbGV2ZWxzXzEuTEVWRUxTWycwXzBfMCddWzBdLmxlbmd0aDsgLy8gcm9vbSB3aWR0aFxuICAgICAgICBjb25zdCBoID0gbGV2ZWxzXzEuTEVWRUxTWycwXzBfMCddLmxlbmd0aDsgLy8gcm9vbSBoZWlnaHRcbiAgICAgICAgY29uc3QgbGV2ZWxOYW1lcyA9IE9iamVjdC5rZXlzKGxldmVsc18xLkxFVkVMUyk7XG4gICAgICAgIC8vIFdoZXJlIHdlIHN0b3JlIHRoZSByb29tcyBcbiAgICAgICAgbGV0IHJvb21zID0gW107XG4gICAgICAgIC8vIFRoZSBmaXJzdCByb29tIGlzIHRoZSBiYXNlIHJvb20gZm9yIHRoZSBwbGF5ZXIsIHNvIHdlIGFkZCBpdCB0byB0aGUgbGlzdFxuICAgICAgICAvLyB0byBjaGVjayBmb3IgY29sbGlzaW9ucy4uLlxuICAgICAgICBjb25zdCBiYXNlUm9vbVggPSBNYXRoLnJvdW5kKCh0aGlzLndpZHRoIC0gYmFzZVJvb21fMS5CQVNFX1JPT01bMF0ubGVuZ3RoKSAvIDIpO1xuICAgICAgICBjb25zdCBiYXNlUm9vbVkgPSBNYXRoLnJvdW5kKCh0aGlzLmhlaWdodCAtIGJhc2VSb29tXzEuQkFTRV9ST09NLmxlbmd0aCkgLyAyKTtcbiAgICAgICAgcm9vbXMucHVzaChuZXcgUmVjdGFuZ2xlKGJhc2VSb29tWCwgYmFzZVJvb21ZLCBiYXNlUm9vbV8xLkJBU0VfUk9PTVswXS5sZW5ndGgsIGJhc2VSb29tXzEuQkFTRV9ST09NLmxlbmd0aCkpO1xuICAgICAgICAvLyAuLi4gYW5kIHRoZW4gZHJhdyB0aGUgYmFzZSByb29tXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgYmFzZVJvb21fMS5CQVNFX1JPT00ubGVuZ3RoOyArK3kpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgYmFzZVJvb21fMS5CQVNFX1JPT01bMF0ubGVuZ3RoOyArK3gpIHtcbiAgICAgICAgICAgICAgICBkcmF3VGlsZShtYXAsIGJhc2VSb29tWCArIHgsIGJhc2VSb29tWSArIHksIGJhc2VSb29tXzEuQkFTRV9ST09NW3ldW3hdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBnZW5lcmF0ZSByZWN0YW5nbGVzIHRvIGZpbGwgaW5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMDsgKytpKSB7XG4gICAgICAgICAgICAvLyBwb3NpdGlvbiBmb3IgdGhlIHJvb21cbiAgICAgICAgICAgIGNvbnN0IHhQb3MgPSAxICsgTWF0aC5yb3VuZChyb3RfanNfMS5STkcuZ2V0VW5pZm9ybSgpICogKHRoaXMud2lkdGggLSB3IC0gMikpO1xuICAgICAgICAgICAgY29uc3QgeVBvcyA9IDEgKyBNYXRoLnJvdW5kKHJvdF9qc18xLlJORy5nZXRVbmlmb3JtKCkgKiAodGhpcy5oZWlnaHQgLSBoIC0gMikpO1xuICAgICAgICAgICAgbGV0IG5ld1Jvb20gPSBuZXcgUmVjdGFuZ2xlKHhQb3MsIHlQb3MsIHcsIGgpO1xuICAgICAgICAgICAgLy8gY2hlY2sgZm9yIGludGVyc2VjdGlvbnNcbiAgICAgICAgICAgIGlmIChuZXdSb29tLmludGVyc2VjdHMocm9vbXMpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBubyBpbnRlcnNlY3Rpb24sIHBsYWNlIHRoZSByb29tIGluIHRoZSBtYXBcbiAgICAgICAgICAgIHJvb21zLnB1c2gobmV3Um9vbSk7XG4gICAgICAgICAgICAvLyBnZXQgYSByb29tIGFuZCBkcmF3IGl0LlxuICAgICAgICAgICAgLy8gTk9URTogcmlnaHQgbm93IHdlIGFyZW4ndCBndWFyYW50ZWVpbmcgYSBwYXRoIGJldHdlZW4gdGhlIHJvb20gYmVjYXVzZVxuICAgICAgICAgICAgLy8gdGhlIHJvb20gaXRzZWxmIG1heSBiZSBibG9ja2luZ1xuICAgICAgICAgICAgY29uc3Qgcm9vbUluZGV4ID0gTWF0aC5mbG9vcihyb3RfanNfMS5STkcuZ2V0VW5pZm9ybSgpICogbGV2ZWxOYW1lcy5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc3Qgcm9vbSA9IGxldmVsc18xLkxFVkVMU1tsZXZlbE5hbWVzW3Jvb21JbmRleF1dO1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBoOyArK3kpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHc7ICsreCkge1xuICAgICAgICAgICAgICAgICAgICBkcmF3VGlsZShtYXAsIHggKyB4UG9zLCB5ICsgeVBvcywgcm9vbVt5XVt4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZHJhdyBhIHBhdGggYmV0d2VlbiB0aGUgdHdvIHJvb21zXG4gICAgICAgICAgICBpZiAocm9vbXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgdHdvIHBvaW50cyBpbiBlYWNoIHJvb20gdG8gdXNlIHRvIGNvbm5lY3QgdG8gZWFjaCBvdGhlclxuICAgICAgICAgICAgICAgIGxldCBbeDEsIHkxXSA9IHJvb21zW3Jvb21zLmxlbmd0aCAtIDJdLmdldENvbm5lY3Rpb25Qb2ludChuZXdSb29tKTtcbiAgICAgICAgICAgICAgICBsZXQgW3gyLCB5Ml0gPSBuZXdSb29tLmdldENvbm5lY3Rpb25Qb2ludChyb29tc1tyb29tcy5sZW5ndGggLSAyXSk7XG4gICAgICAgICAgICAgICAgLy8gcmFuZG9tbHkgZGVjaWRlIGhvdyB0byBkaWcgYSBwYXRoIHRvIHRoZSBuZXh0IHJvb21cbiAgICAgICAgICAgICAgICBpZiAocm90X2pzXzEuUk5HLmdldFVuaWZvcm0oKSA+IDAuOCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB1bmxpa2VseSB0byBkcmF3IGEgamFnZ2VkIGxpbmVcbiAgICAgICAgICAgICAgICAgICAgKDAsIGdlbmVyYXRpb25VdGlsaXR5XzEuYnJlc2VuaGFtKSh4MSwgeTEsIHgyLCB5MiwgKHgsIHkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcC5zZXRUaWxlKHgsIHksIHRpbGVGYWN0b3J5XzEuZGVmYXVsdC5mbG9vcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlrZWx5IHRvIGRyYXcgYSBzdHJhaWdodCBsaW5lXG4gICAgICAgICAgICAgICAgICAgICgwLCBnZW5lcmF0aW9uVXRpbGl0eV8xLnN0cmFpZ2h0TGluZUNvbm5lY3Rpb24pKHgxLCB5MSwgeDIsIHkyLCAoeCwgeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwLnNldFRpbGUoeCwgeSwgdGlsZUZhY3RvcnlfMS5kZWZhdWx0LmZsb29yKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEFsdGFyIGlzIGF0IHRoZSBjZW50ZXIsIHNvIHRoZSBwbGF5ZXIgcG9zaXRpb24gaXMgb2Zmc2V0IGJ5IDFcbiAgICAgICAgY29uc3QgY2VudGVyID0gcm9vbXNbMF0uY2VudGVyKCk7XG4gICAgICAgIHJldHVybiBbbWFwLCBjZW50ZXJbMF0gKyAxLCBjZW50ZXJbMV1dO1xuICAgIH1cbn1cbmV4cG9ydHMuUm9vbUdlbmVyYXRvciA9IFJvb21HZW5lcmF0b3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVGlsZSA9IHZvaWQgMDtcbmNsYXNzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKGNoYXIsIHdhbGthYmxlLCBpblZpZXdGRywgaW5WaWV3QkcsIG91dE9mVmlld0ZHLCBvdXRPZlZpZXdCRykge1xuICAgICAgICB0aGlzLmNoYXIgPSBjaGFyO1xuICAgICAgICB0aGlzLndhbGthYmxlID0gd2Fsa2FibGU7XG4gICAgICAgIHRoaXMuaW5WaWV3RkcgPSBpblZpZXdGRztcbiAgICAgICAgdGhpcy5pblZpZXdCRyA9IGluVmlld0JHO1xuICAgICAgICB0aGlzLm91dE9mVmlld0ZHID0gb3V0T2ZWaWV3Rkc7XG4gICAgICAgIHRoaXMub3V0T2ZWaWV3QkcgPSBvdXRPZlZpZXdCRztcbiAgICB9XG59XG5leHBvcnRzLlRpbGUgPSBUaWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2xvcnNfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXR5L2NvbG9yc1wiKTtcbmNvbnN0IHRpbGVfMSA9IHJlcXVpcmUoXCIuL3RpbGVcIik7XG5sZXQgdGlsZUZhY3RvcnkgPSB7fTtcbnRpbGVGYWN0b3J5LmZsb29yID0gbmV3IHRpbGVfMS5UaWxlKCcuJywgdHJ1ZSwgY29sb3JzXzEuY29sb3JWaXNpYmxlLCBjb2xvcnNfMS5jb2xvckJsYWNrLCBjb2xvcnNfMS5jb2xvckRhcmtHcmF5LCBjb2xvcnNfMS5jb2xvckJsYWNrKTtcbnRpbGVGYWN0b3J5LndhbGwgPSBuZXcgdGlsZV8xLlRpbGUoJyMnLCBmYWxzZSwgY29sb3JzXzEuY29sb3JWaXNpYmxlLCBjb2xvcnNfMS5jb2xvckJsYWNrLCBjb2xvcnNfMS5jb2xvckRhcmtHcmF5LCBjb2xvcnNfMS5jb2xvckJsYWNrKTtcbnRpbGVGYWN0b3J5LmRvd25TdGFpcnMgPSBuZXcgdGlsZV8xLlRpbGUoJz4nLCBmYWxzZSwgY29sb3JzXzEuY29sb3JMaWdodEdyYXksIGNvbG9yc18xLmNvbG9yQmxhY2ssIGNvbG9yc18xLmNvbG9yRGFya0dyYXksIGNvbG9yc18xLmNvbG9yQmxhY2spO1xudGlsZUZhY3RvcnkuZm9yd2FyZFNsYXNoID0gbmV3IHRpbGVfMS5UaWxlKCcvJywgZmFsc2UsIGNvbG9yc18xLmNvbG9yVmlvbGV0LCBjb2xvcnNfMS5jb2xvckJsYWNrLCBjb2xvcnNfMS5jb2xvckluZGlnbywgY29sb3JzXzEuY29sb3JCbGFjayk7XG50aWxlRmFjdG9yeS5iYWNrd2FyZFNsYXNoID0gbmV3IHRpbGVfMS5UaWxlKCdcXFxcJywgZmFsc2UsIGNvbG9yc18xLmNvbG9yVmlvbGV0LCBjb2xvcnNfMS5jb2xvckJsYWNrLCBjb2xvcnNfMS5jb2xvckluZGlnbywgY29sb3JzXzEuY29sb3JCbGFjayk7XG5leHBvcnRzLmRlZmF1bHQgPSB0aWxlRmFjdG9yeTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CdXR0b24gPSB2b2lkIDA7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuY29uc3QgaW5wdXRNYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi4vZ2FtZS9pbnB1dE1hbmFnZXJcIik7XG5jbGFzcyBCdXR0b24ge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHdpZHRoLCBoZWlnaHQsIHRleHQsIHRleHRDb2xvciwgdGV4dEhpZ2hsaWdodGVkQ29sb3IsIGZyYW1lQ29sb3IsIGZyYW1lSGlnaGxpZ2h0ZWRDb2xvciwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICAgICAgdGhpcy50ZXh0Q29sb3IgPSB0ZXh0Q29sb3I7XG4gICAgICAgIHRoaXMudGV4dEhpZ2hsaWdodGVkQ29sb3IgPSB0ZXh0SGlnaGxpZ2h0ZWRDb2xvcjtcbiAgICAgICAgdGhpcy5mcmFtZUNvbG9yID0gZnJhbWVDb2xvcjtcbiAgICAgICAgdGhpcy5mcmFtZUhpZ2hsaWdodGVkQ29sb3IgPSBmcmFtZUhpZ2hsaWdodGVkQ29sb3I7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICByZW5kZXIoZGlzcGxheSkge1xuICAgICAgICAvLyBjaG9vc2UgY29sb3JzIGJhc2VkIG9uIHdoZXRoZXIgb3Igbm90IHRoZSBidXR0b24gaXMgaGlnaGxpZ2h0ZWRcbiAgICAgICAgY29uc3QgZnJhbWVDb2xvciA9IHRoaXMuaGlnaGxpZ2h0ZWQgPyB0aGlzLmZyYW1lSGlnaGxpZ2h0ZWRDb2xvciA6IHRoaXMuZnJhbWVDb2xvcjtcbiAgICAgICAgY29uc3QgdGV4dENvbG9yID0gdGhpcy5oaWdobGlnaHRlZCA/IHRoaXMudGV4dEhpZ2hsaWdodGVkQ29sb3IgOiB0aGlzLnRleHRDb2xvcjtcbiAgICAgICAgLy8gZHJhdyBmcmFtZVxuICAgICAgICAoMCwgdXRpbF8xLmRyYXdGcmFtZSkoZGlzcGxheSwgdGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBmcmFtZUNvbG9yKTtcbiAgICAgICAgLy8gZHJhd0ZyYW1lKGRpc3BsYXksIHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIC8vIGRyYXcgdGV4dCBpbiB0aGUgY2VudGVyIG9mIHRoZSBidXR0b25cbiAgICAgICAgbGV0IGNlbnRlciA9IHRoaXMud2lkdGggLyAyO1xuICAgICAgICBkaXNwbGF5LmRyYXdUZXh0KHRoaXMueCArIGNlbnRlciAtIHRoaXMudGV4dC5sZW5ndGggLyAyLCB0aGlzLnkgKyAxLCBgJWN7JHt0ZXh0Q29sb3J9fSR7dGhpcy50ZXh0fWApO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmhpZ2hsaWdodGVkICYmIGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LkVOVEVSKSkge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5CdXR0b24gPSBCdXR0b247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTWVudSA9IHZvaWQgMDtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5jb25zdCBpbnB1dE1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuLi9nYW1lL2lucHV0TWFuYWdlclwiKTtcbmNsYXNzIE1lbnUge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHdpZHRoLCBoZWlnaHQsIHRpdGxlLCBkcmF3T3V0bGluZSwgZXhpdE9uRXNjYXBlLCB1cGRhdGVDYWxsYmFjaykge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMuZHJhd091dGxpbmUgPSBkcmF3T3V0bGluZTtcbiAgICAgICAgdGhpcy5leGl0T25Fc2NhcGUgPSBleGl0T25Fc2NhcGU7XG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IFtdO1xuICAgICAgICB0aGlzLmJ1dHRvbkluZGV4ID0gMDtcbiAgICAgICAgdGhpcy50ZXh0ID0gW107XG4gICAgICAgIHRoaXMuc2hvdWxkUmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG91bGRFeGl0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXBkYXRlQ2FsbGJhY2sgPSB1cGRhdGVDYWxsYmFjaztcbiAgICAgICAgdGhpcy5jaGlsZE1lbnUgPSBudWxsO1xuICAgIH1cbiAgICBhZGRCdXR0b24oYnV0dG9uKSB7XG4gICAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKGJ1dHRvbik7XG4gICAgICAgIGlmICh0aGlzLmJ1dHRvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbnNbMF0uaGlnaGxpZ2h0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFkZFRleHQodGV4dCkge1xuICAgICAgICB0aGlzLnRleHQucHVzaCh0ZXh0KTtcbiAgICB9XG4gICAgcmVuZGVyKGRpc3BsYXkpIHtcbiAgICAgICAgKDAsIHV0aWxfMS5kcmF3RnJhbWVXaXRoVGl0bGUpKGRpc3BsYXksIHRoaXMudGl0bGUsIHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGlmICh0aGlzLmNoaWxkTWVudSkge1xuICAgICAgICAgICAgdGhpcy5jaGlsZE1lbnUucmVuZGVyKGRpc3BsYXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgYiBvZiB0aGlzLmJ1dHRvbnMpIHtcbiAgICAgICAgICAgICAgICBiLnJlbmRlcihkaXNwbGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IHQgb2YgdGhpcy50ZXh0KSB7XG4gICAgICAgICAgICAgICAgdC5yZW5kZXIoZGlzcGxheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaG91bGRSZW5kZXIgPSBmYWxzZTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5jaGlsZE1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRNZW51LnVwZGF0ZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRNZW51LnNob3VsZEV4aXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkTWVudSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG91bGRSZW5kZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5jbGVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJ1dHRvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LlJJR0hUKSB8fCBpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5EKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uc1t0aGlzLmJ1dHRvbkluZGV4XS5oaWdobGlnaHRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uSW5kZXggPSBNYXRoLm1pbih0aGlzLmJ1dHRvbnMubGVuZ3RoIC0gMSwgdGhpcy5idXR0b25JbmRleCArIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uc1t0aGlzLmJ1dHRvbkluZGV4XS5oaWdobGlnaHRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG91bGRSZW5kZXIgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmlzS2V5RG93bihpbnB1dE1hbmFnZXJfMS5LZXkuTEVGVCkgfHwgaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmlzS2V5RG93bihpbnB1dE1hbmFnZXJfMS5LZXkuQSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnNbdGhpcy5idXR0b25JbmRleF0uaGlnaGxpZ2h0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbkluZGV4ID0gTWF0aC5tYXgoMCwgdGhpcy5idXR0b25JbmRleCAtIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uc1t0aGlzLmJ1dHRvbkluZGV4XS5oaWdobGlnaHRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG91bGRSZW5kZXIgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5idXR0b25zW3RoaXMuYnV0dG9uSW5kZXhdLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmV4aXRPbkVzY2FwZSAmJiBpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5FU0NBUEUpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3VsZEV4aXQgPSB0cnVlO1xuICAgICAgICAgICAgaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLk1lbnUgPSBNZW51O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlRleHQgPSB2b2lkIDA7XG5jbGFzcyBUZXh0IHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB0ZXh0LCBmZywgYmcpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICAgICAgdGhpcy5mZyA9IGZnO1xuICAgICAgICB0aGlzLmJnID0gYmc7XG4gICAgfVxuICAgIHJlbmRlcihkaXNwbGF5KSB7XG4gICAgICAgIC8vIGZvcihsZXQgYyBvZiB0aGlzLnRleHQpIHtcbiAgICAgICAgLy8gICBkaXNwbGF5LmRyYXdPdmVyKHRoaXMueCwgdGhpcy55LCBjLCB0aGlzLmZnLCB0aGlzLmJnKTtcbiAgICAgICAgLy8gfVxuICAgICAgICBkaXNwbGF5LmRyYXdUZXh0KHRoaXMueCwgdGhpcy55LCBgJWN7JHt0aGlzLmZnfX0lYnske3RoaXMuYmd9fSR7dGhpcy50ZXh0fWApO1xuICAgIH1cbn1cbmV4cG9ydHMuVGV4dCA9IFRleHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2FtZU92ZXJNZW51ID0gZXhwb3J0cy5tYWluTWVudSA9IGV4cG9ydHMuaGVscE1lbnUgPSB2b2lkIDA7XG5jb25zdCBpbnB1dE1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuLi9nYW1lL2lucHV0TWFuYWdlclwiKTtcbmNvbnN0IGNvbG9yc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdHkvY29sb3JzXCIpO1xuY29uc3QgYnV0dG9uXzEgPSByZXF1aXJlKFwiLi9idXR0b25cIik7XG5jb25zdCBtZW51XzEgPSByZXF1aXJlKFwiLi9tZW51XCIpO1xuY29uc3QgdGV4dF8xID0gcmVxdWlyZShcIi4vdGV4dFwiKTtcbmZ1bmN0aW9uIGhlbHBNZW51KHdpZHRoLCBoZWlnaHQpIHtcbiAgICBjb25zdCB4ID0gd2lkdGggLyA0O1xuICAgIGNvbnN0IHkgPSBoZWlnaHQgLyA0O1xuICAgIGxldCBtID0gbmV3IG1lbnVfMS5NZW51KHgsIHksIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMiwgXCJIZWxwXCIsIHRydWUsIHRydWUsICgpID0+IHtcbiAgICAgICAgaWYgKGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LkgsIGlucHV0TWFuYWdlcl8xLktleS5FTlRFUiwgaW5wdXRNYW5hZ2VyXzEuS2V5LkVTQ0FQRSkpIHtcbiAgICAgICAgICAgIG0uc2hvdWxkRXhpdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBtLmFkZEJ1dHRvbihuZXcgYnV0dG9uXzEuQnV0dG9uKHdpZHRoIC8gMiAtIDQsIGhlaWdodCAtIGhlaWdodCAvIDQgLSA0LCA4LCAzLCBcIk9rXCIsIGNvbG9yc18xLmNvbG9yTGlnaHRHcmF5LCBjb2xvcnNfMS5jb2xvcldoaXRlLCBjb2xvcnNfMS5jb2xvckxpZ2h0R3JheSwgY29sb3JzXzEuY29sb3JXaGl0ZSwgKCkgPT4geyB9KSk7XG4gICAgbS5hZGRUZXh0KG5ldyB0ZXh0XzEuVGV4dCh4ICsgMywgeSArIDMsIFwiV0FTRCBvciBhcnJvdyBrZXlzIHRvIG1vdmUuXCIsIGNvbG9yc18xLmNvbG9yV2hpdGUsIGNvbG9yc18xLmNvbG9yQmxhY2spKTtcbiAgICBtLmFkZFRleHQobmV3IHRleHRfMS5UZXh0KHggKyAzLCB5ICsgNCwgXCJJIHRvIGluc3BlY3QuXCIsIGNvbG9yc18xLmNvbG9yV2hpdGUsIGNvbG9yc18xLmNvbG9yQmxhY2spKTtcbiAgICByZXR1cm4gbTtcbn1cbmV4cG9ydHMuaGVscE1lbnUgPSBoZWxwTWVudTtcbmZ1bmN0aW9uIG1haW5NZW51KHdpZHRoLCBoZWlnaHQsIGNhbGxiYWNrKSB7XG4gICAgbGV0IG0gPSBuZXcgbWVudV8xLk1lbnUoMCwgMCwgd2lkdGgsIGhlaWdodCwgXCJNYWluIE1lbnVcIiwgdHJ1ZSwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgaWYgKGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LlNQQUNFLCBpbnB1dE1hbmFnZXJfMS5LZXkuRU5URVIpKSB7XG4gICAgICAgICAgICBtLnNob3VsZEV4aXQgPSB0cnVlO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5IKSkge1xuICAgICAgICAgICAgbS5jaGlsZE1lbnUgPSBoZWxwTWVudSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIG0uc2hvdWxkUmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5jbGVhcigpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgdGl0bGUgPSBcIlNjYXJ5IER1bmdlb25cIjtcbiAgICBtLmFkZFRleHQobmV3IHRleHRfMS5UZXh0KHdpZHRoIC8gMiAtIHRpdGxlLmxlbmd0aCAvIDIsIGhlaWdodCAvIDIgLSAxMCwgdGl0bGUsIGNvbG9yc18xLmNvbG9yWWVsbG93LCBjb2xvcnNfMS5jb2xvckJsYWNrKSk7XG4gICAgY29uc3QgYXR0cmlidXRpb24gPSBcImJ5IENvbGFuIEYuIEJpZW1lclwiO1xuICAgIG0uYWRkVGV4dChuZXcgdGV4dF8xLlRleHQod2lkdGggLyAyIC0gYXR0cmlidXRpb24ubGVuZ3RoIC8gMiwgaGVpZ2h0IC8gMiAtIDgsIGF0dHJpYnV0aW9uLCBjb2xvcnNfMS5jb2xvckxpZ2h0R3JheSwgY29sb3JzXzEuY29sb3JCbGFjaykpO1xuICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IFwiUHJlc3Mgc3BhY2UgdG8gc3RhcnQgb3IgaCBmb3IgaW5zdHJ1Y3Rpb25zLlwiO1xuICAgIG0uYWRkVGV4dChuZXcgdGV4dF8xLlRleHQod2lkdGggLyAyIC0gaW5zdHJ1Y3Rpb25zLmxlbmd0aCAvIDIsIGhlaWdodCAvIDIsIGluc3RydWN0aW9ucywgY29sb3JzXzEuY29sb3JXaGl0ZSwgY29sb3JzXzEuY29sb3JCbGFjaykpO1xuICAgIHJldHVybiBtO1xufVxuZXhwb3J0cy5tYWluTWVudSA9IG1haW5NZW51O1xuZnVuY3Rpb24gZ2FtZU92ZXJNZW51KHdpZHRoLCBoZWlnaHQsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgeCA9IHdpZHRoIC8gNDtcbiAgICBjb25zdCB5ID0gNTtcbiAgICBsZXQgbSA9IG5ldyBtZW51XzEuTWVudSh4LCB5LCB3aWR0aCAvIDIsIGhlaWdodCAvIDUsIFwiR0FNRSBPVkVSXCIsIHRydWUsIHRydWUsICgpID0+IHtcbiAgICAgICAgaWYgKGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LkgsIGlucHV0TWFuYWdlcl8xLktleS5FTlRFUiwgaW5wdXRNYW5hZ2VyXzEuS2V5LkVTQ0FQRSkpIHtcbiAgICAgICAgICAgIGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5jbGVhcigpO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIG0uYWRkQnV0dG9uKG5ldyBidXR0b25fMS5CdXR0b24od2lkdGggLyAyIC0gNCwgeSArIGhlaWdodCAvIDUgLSA0LCA4LCAzLCBcIk9rXCIsIGNvbG9yc18xLmNvbG9yTGlnaHRHcmF5LCBjb2xvcnNfMS5jb2xvcldoaXRlLCBjb2xvcnNfMS5jb2xvckxpZ2h0R3JheSwgY29sb3JzXzEuY29sb3JXaGl0ZSwgY2FsbGJhY2spKTtcbiAgICBjb25zdCB0ZXh0ID0gJ1lvdSBmYWlsZWQuJztcbiAgICBtLmFkZFRleHQobmV3IHRleHRfMS5UZXh0KHdpZHRoIC8gMiAtIHRleHQubGVuZ3RoIC8gMiwgeSArIDIsIHRleHQsIGNvbG9yc18xLmNvbG9yV2hpdGUsIGNvbG9yc18xLmNvbG9yQmxhY2spKTtcbiAgICByZXR1cm4gbTtcbn1cbmV4cG9ydHMuZ2FtZU92ZXJNZW51ID0gZ2FtZU92ZXJNZW51O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRyYXdGcmFtZSA9IGV4cG9ydHMuZHJhd0ZyYW1lV2l0aFRpdGxlID0gdm9pZCAwO1xuY29uc3QgdG9wTGVmdCA9ICfilIwnO1xuY29uc3QgdG9wUmlnaHQgPSAn4pSQJztcbmNvbnN0IGJvdHRvbUxlZnQgPSAn4pSUJztcbmNvbnN0IGJvdHRvbVJpZ2h0ID0gJ+KUmCc7XG5jb25zdCB2ZXJ0aWNhbCA9ICfilIInO1xuY29uc3QgaG9yaXpvbnRhbCA9ICfilIAnO1xuY29uc3QgbGVmdFRpdGxlID0gJ+KUpCc7XG5jb25zdCByaWdodFRpdGxlID0gJ+KUnCc7XG5jb25zdCBlbXB0eSA9ICcgJztcbmZ1bmN0aW9uIGRyYXdGcmFtZVdpdGhUaXRsZShkaXNwbGF5LCB0aXRsZSwgeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ib2RpZGRsaWUvanMtcm9ndWUtdHV0b3JpYWwvYmxvYi9tYWluL3NyYy9yZW5kZXItZnVuY3Rpb25zLnRzI0w1NlxuICAgIGNvbnN0IGlubmVyV2lkdGggPSB3aWR0aCAtIDI7XG4gICAgY29uc3QgaW5uZXJIZWlnaHQgPSBoZWlnaHQgLSAyO1xuICAgIGNvbnN0IHJlbWFpbmluZ0FmdGVyVGl0bGUgPSBpbm5lcldpZHRoIC0gKHRpdGxlLmxlbmd0aCArIDIpOyAvLyBhZGRpbmcgdHdvIGJlY2F1c2Ugb2YgdGhlIGJvcmRlcnMgb24gbGVmdCBhbmQgcmlnaHRcbiAgICBjb25zdCBsZWZ0ID0gTWF0aC5mbG9vcihyZW1haW5pbmdBZnRlclRpdGxlIC8gMik7XG4gICAgY29uc3QgdG9wUm93ID0gdG9wTGVmdCArXG4gICAgICAgIGhvcml6b250YWwucmVwZWF0KGxlZnQpICtcbiAgICAgICAgbGVmdFRpdGxlICtcbiAgICAgICAgdGl0bGUgK1xuICAgICAgICByaWdodFRpdGxlICtcbiAgICAgICAgaG9yaXpvbnRhbC5yZXBlYXQocmVtYWluaW5nQWZ0ZXJUaXRsZSAtIGxlZnQpICtcbiAgICAgICAgdG9wUmlnaHQ7XG4gICAgY29uc3QgbWlkZGxlUm93ID0gdmVydGljYWwgKyBlbXB0eS5yZXBlYXQoaW5uZXJXaWR0aCkgKyB2ZXJ0aWNhbDtcbiAgICBjb25zdCBib3R0b21Sb3cgPSBib3R0b21MZWZ0ICsgaG9yaXpvbnRhbC5yZXBlYXQoaW5uZXJXaWR0aCkgKyBib3R0b21SaWdodDtcbiAgICBkaXNwbGF5LmRyYXdUZXh0KHgsIHksIHRvcFJvdyk7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gaW5uZXJIZWlnaHQ7IGkrKykge1xuICAgICAgICBkaXNwbGF5LmRyYXdUZXh0KHgsIHkgKyBpLCBtaWRkbGVSb3cpO1xuICAgIH1cbiAgICBkaXNwbGF5LmRyYXdUZXh0KHgsIHkgKyBoZWlnaHQgLSAxLCBib3R0b21Sb3cpO1xufVxuZXhwb3J0cy5kcmF3RnJhbWVXaXRoVGl0bGUgPSBkcmF3RnJhbWVXaXRoVGl0bGU7XG5mdW5jdGlvbiBkcmF3RnJhbWUoZGlzcGxheSwgeCwgeSwgd2lkdGgsIGhlaWdodCwgZnJhbWVDb2xvcikge1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ib2RpZGRsaWUvanMtcm9ndWUtdHV0b3JpYWwvYmxvYi9tYWluL3NyYy9yZW5kZXItZnVuY3Rpb25zLnRzI0w1NlxuICAgIGNvbnN0IGlubmVyV2lkdGggPSB3aWR0aCAtIDI7XG4gICAgY29uc3QgaW5uZXJIZWlnaHQgPSBoZWlnaHQgLSAyO1xuICAgIGNvbnN0IHRvcFJvdyA9IHRvcExlZnQgKyBob3Jpem9udGFsLnJlcGVhdChpbm5lcldpZHRoKSArIHRvcFJpZ2h0O1xuICAgIGNvbnN0IG1pZGRsZVJvdyA9IHZlcnRpY2FsICsgZW1wdHkucmVwZWF0KGlubmVyV2lkdGgpICsgdmVydGljYWw7XG4gICAgY29uc3QgYm90dG9tUm93ID0gYm90dG9tTGVmdCArIGhvcml6b250YWwucmVwZWF0KGlubmVyV2lkdGgpICsgYm90dG9tUmlnaHQ7XG4gICAgZGlzcGxheS5kcmF3VGV4dCh4LCB5LCBgJWN7JHtmcmFtZUNvbG9yfX0ke3RvcFJvd31gKTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBpbm5lckhlaWdodDsgaSsrKSB7XG4gICAgICAgIGRpc3BsYXkuZHJhd1RleHQoeCwgeSArIGksIGAlY3ske2ZyYW1lQ29sb3J9fSR7bWlkZGxlUm93fWApO1xuICAgIH1cbiAgICBkaXNwbGF5LmRyYXdUZXh0KHgsIHkgKyBoZWlnaHQgLSAxLCBgJWN7JHtmcmFtZUNvbG9yfX0ke2JvdHRvbVJvd31gKTtcbn1cbmV4cG9ydHMuZHJhd0ZyYW1lID0gZHJhd0ZyYW1lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbG9yR2VtID0gZXhwb3J0cy5jb2xvckluZGlnbyA9IGV4cG9ydHMuY29sb3JWaW9sZXQgPSBleHBvcnRzLmNvbG9yRW5lbXkgPSBleHBvcnRzLmNvbG9yVmlzaWJsZSA9IGV4cG9ydHMuY29sb3JSZWQgPSBleHBvcnRzLmNvbG9yWWVsbG93ID0gZXhwb3J0cy5jb2xvckxpZ2h0R3JheSA9IGV4cG9ydHMuY29sb3JEYXJrR3JheSA9IGV4cG9ydHMuY29sb3JCbGFjayA9IGV4cG9ydHMuY29sb3JXaGl0ZSA9IGV4cG9ydHMuY29sb3JFcnJvciA9IHZvaWQgMDtcbmV4cG9ydHMuY29sb3JFcnJvciA9IFwicmdiYSgyNTUsNDAsNDAsMSlcIjtcbmV4cG9ydHMuY29sb3JXaGl0ZSA9IFwicmdiYSgyNTUsMjU1LDI1NSwxKVwiO1xuZXhwb3J0cy5jb2xvckJsYWNrID0gXCJyZ2JhKDAsMCwwLDApXCI7XG5leHBvcnRzLmNvbG9yRGFya0dyYXkgPSBcInJnYmEoNzAsNzAsNzAsMSlcIjtcbmV4cG9ydHMuY29sb3JMaWdodEdyYXkgPSBcInJnYmEoMTY5LDE2OSwxNjksMSlcIjtcbmV4cG9ydHMuY29sb3JZZWxsb3cgPSBcInJnYmEoMjUzLDE2NCwxNSwxKVwiO1xuZXhwb3J0cy5jb2xvclJlZCA9IFwicmdiYSgyNTUsMCwwLDEpXCI7XG5leHBvcnRzLmNvbG9yVmlzaWJsZSA9IFwicmdiYSgyNTAsMjUwLDI1MCwxKVwiO1xuZXhwb3J0cy5jb2xvckVuZW15ID0gXCJyZ2JhKDIwNCwwLDAsMSlcIjtcbi8vIGAvYCBhbmQgYFxcYCB0aWxlc1xuZXhwb3J0cy5jb2xvclZpb2xldCA9IFwicmdiYSgyMzgsMTMwLDIzOCwxKVwiO1xuZXhwb3J0cy5jb2xvckluZGlnbyA9IFwicmdiYSg3NSwwLDEzMCwxKVwiO1xuLy8gYCpgIGdlbSBpdGVtXG5leHBvcnRzLmNvbG9yR2VtID0gJ3JnYmEoMTQzLDI1NSwxNDYsMSknO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1hbmhhdHRhbkRpc3RhbmNlID0gZXhwb3J0cy5ldWNsaWRlYW5EaXN0YW5jZSA9IHZvaWQgMDtcbmZ1bmN0aW9uIGV1Y2xpZGVhbkRpc3RhbmNlKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4MSAtIHgyLCAyKSArIChNYXRoLnBvdyh5MSAtIHkyLCAyKSkpO1xufVxuZXhwb3J0cy5ldWNsaWRlYW5EaXN0YW5jZSA9IGV1Y2xpZGVhbkRpc3RhbmNlO1xuZnVuY3Rpb24gbWFuaGF0dGFuRGlzdGFuY2UoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICByZXR1cm4gTWF0aC5hYnMoeDEgLSB4MikgKyBNYXRoLmFicyh5MSAtIHkyKTtcbn1cbmV4cG9ydHMubWFuaGF0dGFuRGlzdGFuY2UgPSBtYW5oYXR0YW5EaXN0YW5jZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hc3NlcnQgPSB2b2lkIDA7XG5mdW5jdGlvbiBhc3NlcnQoY29uZGl0aW9uKSB7XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignQXNzZXJ0aW9uIGZhaWwhJyk7XG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICB9XG59XG5leHBvcnRzLmFzc2VydCA9IGFzc2VydDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5NZXNzYWdlTG9nID0gdm9pZCAwO1xuY29uc3QgY29sb3JzXzEgPSByZXF1aXJlKFwiLi9jb2xvcnNcIik7XG5jbGFzcyBNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0LCBjb2xvcikge1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHRoaXMuY291bnQgPSAxO1xuICAgIH1cbiAgICBpbmNyZW1lbnRDb3VudCgpIHtcbiAgICAgICAgdGhpcy5jb3VudCArPSAxO1xuICAgIH1cbiAgICBzYW1lVGV4dCh0ZXh0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQgPT09IHRleHQ7XG4gICAgfVxuICAgIGdldFRleHQoKSB7XG4gICAgICAgIGxldCB0ID0gdGhpcy5jb3VudCA+IDEgPyBgJHt0aGlzLnRleHR9IHgoJHt0aGlzLmNvdW50fSlgIDogdGhpcy50ZXh0O1xuICAgICAgICByZXR1cm4gYDx0YWcgc3R5bGU9XCJjb2xvcjogJHt0aGlzLmNvbG9yfTtcIj4ke3R9PC90YWc+YDtcbiAgICB9XG59XG5jbGFzcyBNZXNzYWdlTG9nIHtcbiAgICBzdGF0aWMgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSBbXTtcbiAgICAgICAgbGV0IG1lc3NhZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzYWdlc1wiKTtcbiAgICAgICAgbWVzc2FnZXMuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuICAgIHN0YXRpYyBhZGRNZXNzYWdlKHRleHQsIGNvbG9yLCBzdGFjaykge1xuICAgICAgICBjb25zdCBsZW4gPSBNZXNzYWdlTG9nLm1lc3NhZ2VzLmxlbmd0aDtcbiAgICAgICAgaWYgKHN0YWNrICYmIGxlbiA+IDAgJiYgTWVzc2FnZUxvZy5tZXNzYWdlc1tsZW4gLSAxXS5zYW1lVGV4dCh0ZXh0KSkge1xuICAgICAgICAgICAgTWVzc2FnZUxvZy5tZXNzYWdlc1tsZW4gLSAxXS5pbmNyZW1lbnRDb3VudCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTWVzc2FnZUxvZy5tZXNzYWdlcy5wdXNoKG5ldyBNZXNzYWdlKHRleHQsIGNvbG9yKSk7XG4gICAgICAgIH1cbiAgICAgICAgTWVzc2FnZUxvZy5wcmludCgpO1xuICAgIH1cbiAgICBzdGF0aWMgYWRkRXJyb3JNZXNzYWdlKHRleHQsIHN0YWNrKSB7XG4gICAgICAgIE1lc3NhZ2VMb2cuYWRkTWVzc2FnZSh0ZXh0LCBjb2xvcnNfMS5jb2xvckVycm9yLCBzdGFjayk7XG4gICAgfVxuICAgIHN0YXRpYyBwcmludCgpIHtcbiAgICAgICAgY29uc3QgbWF4TGluZXMgPSA1O1xuICAgICAgICBjb25zdCBsZW4gPSBNZXNzYWdlTG9nLm1lc3NhZ2VzLmxlbmd0aDtcbiAgICAgICAgbGV0IG1lc3NhZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzYWdlc1wiKTtcbiAgICAgICAgbGV0IGxpbmVzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBNZXNzYWdlTG9nLm1lc3NhZ2VzW2xlbiAtIDEgLSBpXTtcbiAgICAgICAgICAgIGxpbmVzLnB1c2gobWVzc2FnZS5nZXRUZXh0KCkpO1xuICAgICAgICAgICAgaWYgKGxpbmVzLmxlbmd0aCA+IG1heExpbmVzKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWVzc2FnZXMuaW5uZXJIVE1MID0gbGluZXMuam9pbihcIlxcblwiKTtcbiAgICB9XG59XG5leHBvcnRzLk1lc3NhZ2VMb2cgPSBNZXNzYWdlTG9nO1xuTWVzc2FnZUxvZy5tZXNzYWdlcyA9IFtdO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlJlbmRlck9yZGVyID0gdm9pZCAwO1xudmFyIFJlbmRlck9yZGVyO1xuKGZ1bmN0aW9uIChSZW5kZXJPcmRlcikge1xuICAgIFJlbmRlck9yZGVyW1JlbmRlck9yZGVyW1wiQ29ycHNlXCJdID0gMF0gPSBcIkNvcnBzZVwiO1xuICAgIFJlbmRlck9yZGVyW1JlbmRlck9yZGVyW1wiSXRlbVwiXSA9IDFdID0gXCJJdGVtXCI7XG4gICAgUmVuZGVyT3JkZXJbUmVuZGVyT3JkZXJbXCJBY3RvclwiXSA9IDJdID0gXCJBY3RvclwiO1xufSkoUmVuZGVyT3JkZXIgPSBleHBvcnRzLlJlbmRlck9yZGVyIHx8IChleHBvcnRzLlJlbmRlck9yZGVyID0ge30pKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBnYW1lXzEgPSByZXF1aXJlKFwiLi9nYW1lL2dhbWVcIik7XG5kb2N1bWVudC5ib2R5Lm9ubG9hZCA9ICgpID0+IHtcbiAgICBsZXQgZ2FtZSA9IG5ldyBnYW1lXzEuR2FtZSgpO1xuICAgIGdhbWUuc3RhcnQoKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=