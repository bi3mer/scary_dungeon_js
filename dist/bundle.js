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
const tileFactory_1 = __importDefault(__webpack_require__(/*! ../tile/tileFactory */ "./src/tile/tileFactory.ts"));
const inputManager_1 = __webpack_require__(/*! ./inputManager */ "./src/game/inputManager.ts");
const actorFactory_1 = __importDefault(__webpack_require__(/*! ../entity/actorFactory */ "./src/entity/actorFactory.ts"));
const uiFactory_1 = __webpack_require__(/*! ../ui/uiFactory */ "./src/ui/uiFactory.ts");
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
        let digger = new rot_js_1.Map.Digger(this.config.width, this.config.height);
        let freeCells = new Array();
        let callback = (x, y, value) => {
            if (value)
                return; // do not store walls
            freeCells.push([x, y]);
            this.map.setTile(x, y, tileFactory_1.default.floor);
        };
        digger.create(callback);
        let [x, y] = freeCells[0];
        this.player.x = x;
        this.player.y = y;
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
        document.getElementById('game').appendChild(this.display.getContainer());
        this.setUISize();
        addEventListener('resize', this.setUISize);
        inputManager_1.InputManager.init();
        this.generateMap();
        this.render(null, true);
        let oldTimeStamp;
        let fps;
        let turnNumber = 1;
        let menu = null;
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
        this.visible = Array(this.width * this.height + this.width).fill(false); // TODO: set to false
        this.explored = Array(this.width * this.height + this.width).fill(false); // TODO: set to false
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
        if (index >= this.tiles.length) {
            return false;
        }
        return this.tiles[y * this.width + x].walkable;
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
        const fov = new precise_shadowcasting_1.default((x, y) => {
            const index = this.index(x, y);
            if (index < this.tiles.length && index >= 0) {
                return this.tiles[index].walkable;
            }
            return false;
        });
        this.visible.fill(false);
        fov.compute(x, y, 10, (x, y, r, visibility) => {
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
    static isKeyDown(k) {
        return InputManager._keys[k];
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
    constructor(x, y, width, height, title, drawOutline, backgroundColor, exitOnEscape) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.title = title;
        this.drawOutline = drawOutline;
        this.backgroundColor = backgroundColor;
        this.exitOnEscape = exitOnEscape;
        this.buttons = [];
        this.buttonIndex = 0;
        this.text = [];
        this.shouldRender = true;
        this.shouldExit = false;
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
        // now we can draw the buttons and text
        for (let b of this.buttons) {
            b.render(display);
        }
        for (let t of this.text) {
            t.render(display);
        }
        this.shouldRender = false;
    }
    update() {
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
    render(displaY) {
        displaY.drawText(this.x, this.y, `%c{${this.fg}}%b{${this.bg}}${this.text}`);
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
exports.helpMenu = void 0;
const colors_1 = __importDefault(__webpack_require__(/*! ../utility/colors */ "./src/utility/colors.ts"));
const button_1 = __webpack_require__(/*! ./button */ "./src/ui/button.ts");
const menu_1 = __webpack_require__(/*! ./menu */ "./src/ui/menu.ts");
const text_1 = __webpack_require__(/*! ./text */ "./src/ui/text.ts");
function helpMenu(width, height) {
    const x = width / 4;
    const y = height / 4;
    let m = new menu_1.Menu(x, y, width / 2, height / 2, "Help", true, "#fff", true);
    m.addButton(new button_1.Button(width / 2 - 4, height - height / 4 - 4, 8, 3, "Ok", colors_1.default.lightGray, colors_1.default.white, colors_1.default.lightGray, colors_1.default.white, () => {
        m.shouldExit = true;
    }));
    m.addText(new text_1.Text(x + 3, y + 3, "WASD or arrow keys to move.", colors_1.default.white, colors_1.default.black));
    m.addText(new text_1.Text(x + 3, y + 4, "I to inspect.", colors_1.default.white, colors_1.default.black));
    return m;
}
exports.helpMenu = helpMenu;


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
    darkGray: "rgba(50,50,50,1)",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLGlDQUFpQywrQ0FBSztBQUN0QyxrQkFBa0Isa0JBQWtCO0FBQ3BDO0FBQ087QUFDUCxpQ0FBaUMsK0NBQUs7QUFDdEMsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL1VBO0FBQ087QUFDUDtBQUNPO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkNBQUcsVUFBVTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdklpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtEQUFNO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxrQkFBa0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsa0JBQWtCO0FBQzlDO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtCQUFrQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7Ozs7Ozs7Ozs7O0FDdERhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx3Q0FBd0MsbUJBQW1CLEtBQUs7Ozs7Ozs7VUNSakU7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7O0FDTmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZUFBZSxtQkFBTyxDQUFDLHVDQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL01pbkhlYXAuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2NvbG9yLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Rpc3BsYXkvYmFja2VuZC5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZGlzcGxheS9jYW52YXMuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Rpc3BsYXkvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZGlzcGxheS9oZXguanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Rpc3BsYXkvcmVjdC5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZGlzcGxheS90ZXJtLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9kaXNwbGF5L3RpbGUtZ2wuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Rpc3BsYXkvdGlsZS5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZW5naW5lLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9ldmVudHF1ZXVlLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9mb3YvZGlzY3JldGUtc2hhZG93Y2FzdGluZy5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZm92L2Zvdi5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZm92L2luZGV4LmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9mb3YvcHJlY2lzZS1zaGFkb3djYXN0aW5nLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9mb3YvcmVjdXJzaXZlLXNoYWRvd2Nhc3RpbmcuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2luZGV4LmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9saWdodGluZy5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL2FyZW5hLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9tYXAvY2VsbHVsYXIuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9kaWdnZXIuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9kaXZpZGVkbWF6ZS5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL2R1bmdlb24uanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9lbGxlcm1hemUuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9mZWF0dXJlcy5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL2ljZXltYXplLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9tYXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9tYXAuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9yb2d1ZS5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL3VuaWZvcm0uanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL25vaXNlL2luZGV4LmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9ub2lzZS9ub2lzZS5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbm9pc2Uvc2ltcGxleC5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvcGF0aC9hc3Rhci5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvcGF0aC9kaWprc3RyYS5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvcGF0aC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvcGF0aC9wYXRoLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9ybmcuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3NjaGVkdWxlci9hY3Rpb24uanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3NjaGVkdWxlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvc2NoZWR1bGVyL3NjaGVkdWxlci5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvc2NoZWR1bGVyL3NpbXBsZS5qcyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvc2NoZWR1bGVyL3NwZWVkLmpzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9zdHJpbmdnZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3RleHQuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3V0aWwuanMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9hY3Rpb24vZGlyZWN0aW9uQWN0aW9uLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvYWN0aW9uL21vdmVBY3Rpb24udHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9iZWhhdmlvci9haUJlaGF2aW9yLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvYmVoYXZpb3IvcGxheWVyQmVoYXZpb3IudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9lbnRpdHkvYWN0b3IudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy9lbnRpdHkvYWN0b3JGYWN0b3J5LnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvZW50aXR5L2VudGl0eS50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2dhbWUvZ2FtZS50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2dhbWUvZ2FtZU1hcC50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL2dhbWUvaW5wdXRNYW5hZ2VyLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvdGlsZS90aWxlLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvdGlsZS90aWxlRmFjdG9yeS50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL3VpL2J1dHRvbi50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL3VpL21lbnUudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy8uL3NyYy91aS90ZXh0LnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvdWkvdWlGYWN0b3J5LnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvdWkvdXRpbC50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL3V0aWxpdHkvY29sb3JzLnRzIiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvdXRpbGl0eS9lcnJvci50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL3V0aWxpdHkvbWVzc2FnZUxvZy50cyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzLy4vc3JjL3V0aWxpdHkvcmVuZGVyT3JkZXIudHMiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zY2FyeV9kdW5nZW9uX2pzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2NhcnlfZHVuZ2Vvbl9qcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NjYXJ5X2R1bmdlb25fanMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE1pbkhlYXAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmhlYXAgPSBbXTtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSAwO1xuICAgIH1cbiAgICBsZXNzVGhhbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLmtleSA9PSBiLmtleSA/IGEudGltZXN0YW1wIDwgYi50aW1lc3RhbXAgOiBhLmtleSA8IGIua2V5O1xuICAgIH1cbiAgICBzaGlmdCh2KSB7XG4gICAgICAgIHRoaXMuaGVhcCA9IHRoaXMuaGVhcC5tYXAoKHsga2V5LCB2YWx1ZSwgdGltZXN0YW1wIH0pID0+ICh7IGtleToga2V5ICsgdiwgdmFsdWUsIHRpbWVzdGFtcCB9KSk7XG4gICAgfVxuICAgIGxlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhcC5sZW5ndGg7XG4gICAgfVxuICAgIHB1c2godmFsdWUsIGtleSkge1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCArPSAxO1xuICAgICAgICBjb25zdCBsb2MgPSB0aGlzLmxlbigpO1xuICAgICAgICB0aGlzLmhlYXAucHVzaCh7IHZhbHVlLCB0aW1lc3RhbXA6IHRoaXMudGltZXN0YW1wLCBrZXkgfSk7XG4gICAgICAgIHRoaXMudXBkYXRlVXAobG9jKTtcbiAgICB9XG4gICAgcG9wKCkge1xuICAgICAgICBpZiAodGhpcy5sZW4oKSA9PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBlbGVtZW50IHRvIHBvcFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0b3AgPSB0aGlzLmhlYXBbMF07XG4gICAgICAgIGlmICh0aGlzLmxlbigpID4gMSkge1xuICAgICAgICAgICAgdGhpcy5oZWFwWzBdID0gdGhpcy5oZWFwLnBvcCgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVEb3duKDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFwLnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b3A7XG4gICAgfVxuICAgIGZpbmQodikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuKCk7IGkrKykge1xuICAgICAgICAgICAgaWYgKHYgPT0gdGhpcy5oZWFwW2ldLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVhcFtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmVtb3ZlKHYpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbigpOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh2ID09IHRoaXMuaGVhcFtpXS52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5sZW4oKSA+IDEpIHtcbiAgICAgICAgICAgIGxldCBsYXN0ID0gdGhpcy5oZWFwLnBvcCgpO1xuICAgICAgICAgICAgaWYgKGxhc3QudmFsdWUgIT0gdikgeyAvLyBpZiB0aGUgbGFzdCBvbmUgaXMgYmVpbmcgcmVtb3ZlZCwgZG8gbm90aGluZ1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhcFtpbmRleF0gPSBsYXN0O1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRG93bihpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGVhcC5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcGFyZW50Tm9kZSh4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCh4IC0gMSkgLyAyKTtcbiAgICB9XG4gICAgbGVmdENoaWxkTm9kZSh4KSB7XG4gICAgICAgIHJldHVybiAyICogeCArIDE7XG4gICAgfVxuICAgIHJpZ2h0Q2hpbGROb2RlKHgpIHtcbiAgICAgICAgcmV0dXJuIDIgKiB4ICsgMjtcbiAgICB9XG4gICAgZXhpc3ROb2RlKHgpIHtcbiAgICAgICAgcmV0dXJuIHggPj0gMCAmJiB4IDwgdGhpcy5oZWFwLmxlbmd0aDtcbiAgICB9XG4gICAgc3dhcCh4LCB5KSB7XG4gICAgICAgIGNvbnN0IHQgPSB0aGlzLmhlYXBbeF07XG4gICAgICAgIHRoaXMuaGVhcFt4XSA9IHRoaXMuaGVhcFt5XTtcbiAgICAgICAgdGhpcy5oZWFwW3ldID0gdDtcbiAgICB9XG4gICAgbWluTm9kZShudW1iZXJzKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkbnVtYmVycyA9IG51bWJlcnMuZmlsdGVyKHRoaXMuZXhpc3ROb2RlLmJpbmQodGhpcykpO1xuICAgICAgICBsZXQgbWluaW1hbCA9IHZhbGlkbnVtYmVyc1swXTtcbiAgICAgICAgZm9yIChjb25zdCBpIG9mIHZhbGlkbnVtYmVycykge1xuICAgICAgICAgICAgaWYgKHRoaXMubGVzc1RoYW4odGhpcy5oZWFwW2ldLCB0aGlzLmhlYXBbbWluaW1hbF0pKSB7XG4gICAgICAgICAgICAgICAgbWluaW1hbCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbmltYWw7XG4gICAgfVxuICAgIHVwZGF0ZVVwKHgpIHtcbiAgICAgICAgaWYgKHggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZSh4KTtcbiAgICAgICAgaWYgKHRoaXMuZXhpc3ROb2RlKHBhcmVudCkgJiYgdGhpcy5sZXNzVGhhbih0aGlzLmhlYXBbeF0sIHRoaXMuaGVhcFtwYXJlbnRdKSkge1xuICAgICAgICAgICAgdGhpcy5zd2FwKHgsIHBhcmVudCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVVwKHBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlRG93bih4KSB7XG4gICAgICAgIGNvbnN0IGxlZnRDaGlsZCA9IHRoaXMubGVmdENoaWxkTm9kZSh4KTtcbiAgICAgICAgY29uc3QgcmlnaHRDaGlsZCA9IHRoaXMucmlnaHRDaGlsZE5vZGUoeCk7XG4gICAgICAgIGlmICghdGhpcy5leGlzdE5vZGUobGVmdENoaWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLm1pbk5vZGUoW3gsIGxlZnRDaGlsZCwgcmlnaHRDaGlsZF0pO1xuICAgICAgICBpZiAobSAhPSB4KSB7XG4gICAgICAgICAgICB0aGlzLnN3YXAoeCwgbSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURvd24obSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVidWdQcmludCgpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5oZWFwKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjbGFtcCB9IGZyb20gXCIuL3V0aWwuanNcIjtcbmltcG9ydCBSTkcgZnJvbSBcIi4vcm5nLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gZnJvbVN0cmluZyhzdHIpIHtcbiAgICBsZXQgY2FjaGVkLCByO1xuICAgIGlmIChzdHIgaW4gQ0FDSEUpIHtcbiAgICAgICAgY2FjaGVkID0gQ0FDSEVbc3RyXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChzdHIuY2hhckF0KDApID09IFwiI1wiKSB7IC8vIGhleCByZ2JcbiAgICAgICAgICAgIGxldCBtYXRjaGVkID0gc3RyLm1hdGNoKC9bMC05YS1mXS9naSkgfHwgW107XG4gICAgICAgICAgICBsZXQgdmFsdWVzID0gbWF0Y2hlZC5tYXAoKHgpID0+IHBhcnNlSW50KHgsIDE2KSk7XG4gICAgICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA9PSAzKSB7XG4gICAgICAgICAgICAgICAgY2FjaGVkID0gdmFsdWVzLm1hcCgoeCkgPT4geCAqIDE3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc1tpICsgMV0gKz0gMTYgKiB2YWx1ZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhY2hlZCA9IHZhbHVlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgociA9IHN0ci5tYXRjaCgvcmdiXFwoKFswLTksIF0rKVxcKS9pKSkpIHsgLy8gZGVjaW1hbCByZ2JcbiAgICAgICAgICAgIGNhY2hlZCA9IHJbMV0uc3BsaXQoL1xccyosXFxzKi8pLm1hcCgoeCkgPT4gcGFyc2VJbnQoeCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvLyBodG1sIG5hbWVcbiAgICAgICAgICAgIGNhY2hlZCA9IFswLCAwLCAwXTtcbiAgICAgICAgfVxuICAgICAgICBDQUNIRVtzdHJdID0gY2FjaGVkO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVkLnNsaWNlKCk7XG59XG4vKipcbiAqIEFkZCB0d28gb3IgbW9yZSBjb2xvcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZChjb2xvcjEsIC4uLmNvbG9ycykge1xuICAgIGxldCByZXN1bHQgPSBjb2xvcjEuc2xpY2UoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbG9ycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldICs9IGNvbG9yc1tqXVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBBZGQgdHdvIG9yIG1vcmUgY29sb3JzLCBNT0RJRklFUyBGSVJTVCBBUkdVTUVOVFxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkXyhjb2xvcjEsIC4uLmNvbG9ycykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sb3JzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjb2xvcjFbaV0gKz0gY29sb3JzW2pdW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2xvcjE7XG59XG4vKipcbiAqIE11bHRpcGx5IChtaXgpIHR3byBvciBtb3JlIGNvbG9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHkoY29sb3IxLCAuLi5jb2xvcnMpIHtcbiAgICBsZXQgcmVzdWx0ID0gY29sb3IxLnNsaWNlKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xvcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHJlc3VsdFtpXSAqPSBjb2xvcnNbal1baV0gLyAyNTU7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0W2ldID0gTWF0aC5yb3VuZChyZXN1bHRbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBNdWx0aXBseSAobWl4KSB0d28gb3IgbW9yZSBjb2xvcnMsIE1PRElGSUVTIEZJUlNUIEFSR1VNRU5UXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseV8oY29sb3IxLCAuLi5jb2xvcnMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbG9ycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29sb3IxW2ldICo9IGNvbG9yc1tqXVtpXSAvIDI1NTtcbiAgICAgICAgfVxuICAgICAgICBjb2xvcjFbaV0gPSBNYXRoLnJvdW5kKGNvbG9yMVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBjb2xvcjE7XG59XG4vKipcbiAqIEludGVycG9sYXRlIChibGVuZCkgdHdvIGNvbG9ycyB3aXRoIGEgZ2l2ZW4gZmFjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcnBvbGF0ZShjb2xvcjEsIGNvbG9yMiwgZmFjdG9yID0gMC41KSB7XG4gICAgbGV0IHJlc3VsdCA9IGNvbG9yMS5zbGljZSgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IE1hdGgucm91bmQocmVzdWx0W2ldICsgZmFjdG9yICogKGNvbG9yMltpXSAtIGNvbG9yMVtpXSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0IGNvbnN0IGxlcnAgPSBpbnRlcnBvbGF0ZTtcbi8qKlxuICogSW50ZXJwb2xhdGUgKGJsZW5kKSB0d28gY29sb3JzIHdpdGggYSBnaXZlbiBmYWN0b3IgaW4gSFNMIG1vZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludGVycG9sYXRlSFNMKGNvbG9yMSwgY29sb3IyLCBmYWN0b3IgPSAwLjUpIHtcbiAgICBsZXQgaHNsMSA9IHJnYjJoc2woY29sb3IxKTtcbiAgICBsZXQgaHNsMiA9IHJnYjJoc2woY29sb3IyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBoc2wxW2ldICs9IGZhY3RvciAqIChoc2wyW2ldIC0gaHNsMVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBoc2wycmdiKGhzbDEpO1xufVxuZXhwb3J0IGNvbnN0IGxlcnBIU0wgPSBpbnRlcnBvbGF0ZUhTTDtcbi8qKlxuICogQ3JlYXRlIGEgbmV3IHJhbmRvbSBjb2xvciBiYXNlZCBvbiB0aGlzIG9uZVxuICogQHBhcmFtIGNvbG9yXG4gKiBAcGFyYW0gZGlmZiBTZXQgb2Ygc3RhbmRhcmQgZGV2aWF0aW9uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9taXplKGNvbG9yLCBkaWZmKSB7XG4gICAgaWYgKCEoZGlmZiBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICBkaWZmID0gTWF0aC5yb3VuZChSTkcuZ2V0Tm9ybWFsKDAsIGRpZmYpKTtcbiAgICB9XG4gICAgbGV0IHJlc3VsdCA9IGNvbG9yLnNsaWNlKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldICs9IChkaWZmIGluc3RhbmNlb2YgQXJyYXkgPyBNYXRoLnJvdW5kKFJORy5nZXROb3JtYWwoMCwgZGlmZltpXSkpIDogZGlmZik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIENvbnZlcnRzIGFuIFJHQiBjb2xvciB2YWx1ZSB0byBIU0wuIEV4cGVjdHMgMC4uMjU1IGlucHV0cywgcHJvZHVjZXMgMC4uMSBvdXRwdXRzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmdiMmhzbChjb2xvcikge1xuICAgIGxldCByID0gY29sb3JbMF0gLyAyNTU7XG4gICAgbGV0IGcgPSBjb2xvclsxXSAvIDI1NTtcbiAgICBsZXQgYiA9IGNvbG9yWzJdIC8gMjU1O1xuICAgIGxldCBtYXggPSBNYXRoLm1heChyLCBnLCBiKSwgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgbGV0IGggPSAwLCBzLCBsID0gKG1heCArIG1pbikgLyAyO1xuICAgIGlmIChtYXggPT0gbWluKSB7XG4gICAgICAgIHMgPSAwOyAvLyBhY2hyb21hdGljXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsZXQgZCA9IG1heCAtIG1pbjtcbiAgICAgICAgcyA9IChsID4gMC41ID8gZCAvICgyIC0gbWF4IC0gbWluKSA6IGQgLyAobWF4ICsgbWluKSk7XG4gICAgICAgIHN3aXRjaCAobWF4KSB7XG4gICAgICAgICAgICBjYXNlIHI6XG4gICAgICAgICAgICAgICAgaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBnOlxuICAgICAgICAgICAgICAgIGggPSAoYiAtIHIpIC8gZCArIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGI6XG4gICAgICAgICAgICAgICAgaCA9IChyIC0gZykgLyBkICsgNDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBoIC89IDY7XG4gICAgfVxuICAgIHJldHVybiBbaCwgcywgbF07XG59XG5mdW5jdGlvbiBodWUycmdiKHAsIHEsIHQpIHtcbiAgICBpZiAodCA8IDApXG4gICAgICAgIHQgKz0gMTtcbiAgICBpZiAodCA+IDEpXG4gICAgICAgIHQgLT0gMTtcbiAgICBpZiAodCA8IDEgLyA2KVxuICAgICAgICByZXR1cm4gcCArIChxIC0gcCkgKiA2ICogdDtcbiAgICBpZiAodCA8IDEgLyAyKVxuICAgICAgICByZXR1cm4gcTtcbiAgICBpZiAodCA8IDIgLyAzKVxuICAgICAgICByZXR1cm4gcCArIChxIC0gcCkgKiAoMiAvIDMgLSB0KSAqIDY7XG4gICAgcmV0dXJuIHA7XG59XG4vKipcbiAqIENvbnZlcnRzIGFuIEhTTCBjb2xvciB2YWx1ZSB0byBSR0IuIEV4cGVjdHMgMC4uMSBpbnB1dHMsIHByb2R1Y2VzIDAuLjI1NSBvdXRwdXRzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaHNsMnJnYihjb2xvcikge1xuICAgIGxldCBsID0gY29sb3JbMl07XG4gICAgaWYgKGNvbG9yWzFdID09IDApIHtcbiAgICAgICAgbCA9IE1hdGgucm91bmQobCAqIDI1NSk7XG4gICAgICAgIHJldHVybiBbbCwgbCwgbF07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBsZXQgcyA9IGNvbG9yWzFdO1xuICAgICAgICBsZXQgcSA9IChsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzKTtcbiAgICAgICAgbGV0IHAgPSAyICogbCAtIHE7XG4gICAgICAgIGxldCByID0gaHVlMnJnYihwLCBxLCBjb2xvclswXSArIDEgLyAzKTtcbiAgICAgICAgbGV0IGcgPSBodWUycmdiKHAsIHEsIGNvbG9yWzBdKTtcbiAgICAgICAgbGV0IGIgPSBodWUycmdiKHAsIHEsIGNvbG9yWzBdIC0gMSAvIDMpO1xuICAgICAgICByZXR1cm4gW01hdGgucm91bmQociAqIDI1NSksIE1hdGgucm91bmQoZyAqIDI1NSksIE1hdGgucm91bmQoYiAqIDI1NSldO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiB0b1JHQihjb2xvcikge1xuICAgIGxldCBjbGFtcGVkID0gY29sb3IubWFwKHggPT4gY2xhbXAoeCwgMCwgMjU1KSk7XG4gICAgcmV0dXJuIGByZ2IoJHtjbGFtcGVkLmpvaW4oXCIsXCIpfSlgO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHRvSGV4KGNvbG9yKSB7XG4gICAgbGV0IGNsYW1wZWQgPSBjb2xvci5tYXAoeCA9PiBjbGFtcCh4LCAwLCAyNTUpLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCBcIjBcIikpO1xuICAgIHJldHVybiBgIyR7Y2xhbXBlZC5qb2luKFwiXCIpfWA7XG59XG5jb25zdCBDQUNIRSA9IHtcbiAgICBcImJsYWNrXCI6IFswLCAwLCAwXSxcbiAgICBcIm5hdnlcIjogWzAsIDAsIDEyOF0sXG4gICAgXCJkYXJrYmx1ZVwiOiBbMCwgMCwgMTM5XSxcbiAgICBcIm1lZGl1bWJsdWVcIjogWzAsIDAsIDIwNV0sXG4gICAgXCJibHVlXCI6IFswLCAwLCAyNTVdLFxuICAgIFwiZGFya2dyZWVuXCI6IFswLCAxMDAsIDBdLFxuICAgIFwiZ3JlZW5cIjogWzAsIDEyOCwgMF0sXG4gICAgXCJ0ZWFsXCI6IFswLCAxMjgsIDEyOF0sXG4gICAgXCJkYXJrY3lhblwiOiBbMCwgMTM5LCAxMzldLFxuICAgIFwiZGVlcHNreWJsdWVcIjogWzAsIDE5MSwgMjU1XSxcbiAgICBcImRhcmt0dXJxdW9pc2VcIjogWzAsIDIwNiwgMjA5XSxcbiAgICBcIm1lZGl1bXNwcmluZ2dyZWVuXCI6IFswLCAyNTAsIDE1NF0sXG4gICAgXCJsaW1lXCI6IFswLCAyNTUsIDBdLFxuICAgIFwic3ByaW5nZ3JlZW5cIjogWzAsIDI1NSwgMTI3XSxcbiAgICBcImFxdWFcIjogWzAsIDI1NSwgMjU1XSxcbiAgICBcImN5YW5cIjogWzAsIDI1NSwgMjU1XSxcbiAgICBcIm1pZG5pZ2h0Ymx1ZVwiOiBbMjUsIDI1LCAxMTJdLFxuICAgIFwiZG9kZ2VyYmx1ZVwiOiBbMzAsIDE0NCwgMjU1XSxcbiAgICBcImZvcmVzdGdyZWVuXCI6IFszNCwgMTM5LCAzNF0sXG4gICAgXCJzZWFncmVlblwiOiBbNDYsIDEzOSwgODddLFxuICAgIFwiZGFya3NsYXRlZ3JheVwiOiBbNDcsIDc5LCA3OV0sXG4gICAgXCJkYXJrc2xhdGVncmV5XCI6IFs0NywgNzksIDc5XSxcbiAgICBcImxpbWVncmVlblwiOiBbNTAsIDIwNSwgNTBdLFxuICAgIFwibWVkaXVtc2VhZ3JlZW5cIjogWzYwLCAxNzksIDExM10sXG4gICAgXCJ0dXJxdW9pc2VcIjogWzY0LCAyMjQsIDIwOF0sXG4gICAgXCJyb3lhbGJsdWVcIjogWzY1LCAxMDUsIDIyNV0sXG4gICAgXCJzdGVlbGJsdWVcIjogWzcwLCAxMzAsIDE4MF0sXG4gICAgXCJkYXJrc2xhdGVibHVlXCI6IFs3MiwgNjEsIDEzOV0sXG4gICAgXCJtZWRpdW10dXJxdW9pc2VcIjogWzcyLCAyMDksIDIwNF0sXG4gICAgXCJpbmRpZ29cIjogWzc1LCAwLCAxMzBdLFxuICAgIFwiZGFya29saXZlZ3JlZW5cIjogWzg1LCAxMDcsIDQ3XSxcbiAgICBcImNhZGV0Ymx1ZVwiOiBbOTUsIDE1OCwgMTYwXSxcbiAgICBcImNvcm5mbG93ZXJibHVlXCI6IFsxMDAsIDE0OSwgMjM3XSxcbiAgICBcIm1lZGl1bWFxdWFtYXJpbmVcIjogWzEwMiwgMjA1LCAxNzBdLFxuICAgIFwiZGltZ3JheVwiOiBbMTA1LCAxMDUsIDEwNV0sXG4gICAgXCJkaW1ncmV5XCI6IFsxMDUsIDEwNSwgMTA1XSxcbiAgICBcInNsYXRlYmx1ZVwiOiBbMTA2LCA5MCwgMjA1XSxcbiAgICBcIm9saXZlZHJhYlwiOiBbMTA3LCAxNDIsIDM1XSxcbiAgICBcInNsYXRlZ3JheVwiOiBbMTEyLCAxMjgsIDE0NF0sXG4gICAgXCJzbGF0ZWdyZXlcIjogWzExMiwgMTI4LCAxNDRdLFxuICAgIFwibGlnaHRzbGF0ZWdyYXlcIjogWzExOSwgMTM2LCAxNTNdLFxuICAgIFwibGlnaHRzbGF0ZWdyZXlcIjogWzExOSwgMTM2LCAxNTNdLFxuICAgIFwibWVkaXVtc2xhdGVibHVlXCI6IFsxMjMsIDEwNCwgMjM4XSxcbiAgICBcImxhd25ncmVlblwiOiBbMTI0LCAyNTIsIDBdLFxuICAgIFwiY2hhcnRyZXVzZVwiOiBbMTI3LCAyNTUsIDBdLFxuICAgIFwiYXF1YW1hcmluZVwiOiBbMTI3LCAyNTUsIDIxMl0sXG4gICAgXCJtYXJvb25cIjogWzEyOCwgMCwgMF0sXG4gICAgXCJwdXJwbGVcIjogWzEyOCwgMCwgMTI4XSxcbiAgICBcIm9saXZlXCI6IFsxMjgsIDEyOCwgMF0sXG4gICAgXCJncmF5XCI6IFsxMjgsIDEyOCwgMTI4XSxcbiAgICBcImdyZXlcIjogWzEyOCwgMTI4LCAxMjhdLFxuICAgIFwic2t5Ymx1ZVwiOiBbMTM1LCAyMDYsIDIzNV0sXG4gICAgXCJsaWdodHNreWJsdWVcIjogWzEzNSwgMjA2LCAyNTBdLFxuICAgIFwiYmx1ZXZpb2xldFwiOiBbMTM4LCA0MywgMjI2XSxcbiAgICBcImRhcmtyZWRcIjogWzEzOSwgMCwgMF0sXG4gICAgXCJkYXJrbWFnZW50YVwiOiBbMTM5LCAwLCAxMzldLFxuICAgIFwic2FkZGxlYnJvd25cIjogWzEzOSwgNjksIDE5XSxcbiAgICBcImRhcmtzZWFncmVlblwiOiBbMTQzLCAxODgsIDE0M10sXG4gICAgXCJsaWdodGdyZWVuXCI6IFsxNDQsIDIzOCwgMTQ0XSxcbiAgICBcIm1lZGl1bXB1cnBsZVwiOiBbMTQ3LCAxMTIsIDIxNl0sXG4gICAgXCJkYXJrdmlvbGV0XCI6IFsxNDgsIDAsIDIxMV0sXG4gICAgXCJwYWxlZ3JlZW5cIjogWzE1MiwgMjUxLCAxNTJdLFxuICAgIFwiZGFya29yY2hpZFwiOiBbMTUzLCA1MCwgMjA0XSxcbiAgICBcInllbGxvd2dyZWVuXCI6IFsxNTQsIDIwNSwgNTBdLFxuICAgIFwic2llbm5hXCI6IFsxNjAsIDgyLCA0NV0sXG4gICAgXCJicm93blwiOiBbMTY1LCA0MiwgNDJdLFxuICAgIFwiZGFya2dyYXlcIjogWzE2OSwgMTY5LCAxNjldLFxuICAgIFwiZGFya2dyZXlcIjogWzE2OSwgMTY5LCAxNjldLFxuICAgIFwibGlnaHRibHVlXCI6IFsxNzMsIDIxNiwgMjMwXSxcbiAgICBcImdyZWVueWVsbG93XCI6IFsxNzMsIDI1NSwgNDddLFxuICAgIFwicGFsZXR1cnF1b2lzZVwiOiBbMTc1LCAyMzgsIDIzOF0sXG4gICAgXCJsaWdodHN0ZWVsYmx1ZVwiOiBbMTc2LCAxOTYsIDIyMl0sXG4gICAgXCJwb3dkZXJibHVlXCI6IFsxNzYsIDIyNCwgMjMwXSxcbiAgICBcImZpcmVicmlja1wiOiBbMTc4LCAzNCwgMzRdLFxuICAgIFwiZGFya2dvbGRlbnJvZFwiOiBbMTg0LCAxMzQsIDExXSxcbiAgICBcIm1lZGl1bW9yY2hpZFwiOiBbMTg2LCA4NSwgMjExXSxcbiAgICBcInJvc3licm93blwiOiBbMTg4LCAxNDMsIDE0M10sXG4gICAgXCJkYXJra2hha2lcIjogWzE4OSwgMTgzLCAxMDddLFxuICAgIFwic2lsdmVyXCI6IFsxOTIsIDE5MiwgMTkyXSxcbiAgICBcIm1lZGl1bXZpb2xldHJlZFwiOiBbMTk5LCAyMSwgMTMzXSxcbiAgICBcImluZGlhbnJlZFwiOiBbMjA1LCA5MiwgOTJdLFxuICAgIFwicGVydVwiOiBbMjA1LCAxMzMsIDYzXSxcbiAgICBcImNob2NvbGF0ZVwiOiBbMjEwLCAxMDUsIDMwXSxcbiAgICBcInRhblwiOiBbMjEwLCAxODAsIDE0MF0sXG4gICAgXCJsaWdodGdyYXlcIjogWzIxMSwgMjExLCAyMTFdLFxuICAgIFwibGlnaHRncmV5XCI6IFsyMTEsIDIxMSwgMjExXSxcbiAgICBcInBhbGV2aW9sZXRyZWRcIjogWzIxNiwgMTEyLCAxNDddLFxuICAgIFwidGhpc3RsZVwiOiBbMjE2LCAxOTEsIDIxNl0sXG4gICAgXCJvcmNoaWRcIjogWzIxOCwgMTEyLCAyMTRdLFxuICAgIFwiZ29sZGVucm9kXCI6IFsyMTgsIDE2NSwgMzJdLFxuICAgIFwiY3JpbXNvblwiOiBbMjIwLCAyMCwgNjBdLFxuICAgIFwiZ2FpbnNib3JvXCI6IFsyMjAsIDIyMCwgMjIwXSxcbiAgICBcInBsdW1cIjogWzIyMSwgMTYwLCAyMjFdLFxuICAgIFwiYnVybHl3b29kXCI6IFsyMjIsIDE4NCwgMTM1XSxcbiAgICBcImxpZ2h0Y3lhblwiOiBbMjI0LCAyNTUsIDI1NV0sXG4gICAgXCJsYXZlbmRlclwiOiBbMjMwLCAyMzAsIDI1MF0sXG4gICAgXCJkYXJrc2FsbW9uXCI6IFsyMzMsIDE1MCwgMTIyXSxcbiAgICBcInZpb2xldFwiOiBbMjM4LCAxMzAsIDIzOF0sXG4gICAgXCJwYWxlZ29sZGVucm9kXCI6IFsyMzgsIDIzMiwgMTcwXSxcbiAgICBcImxpZ2h0Y29yYWxcIjogWzI0MCwgMTI4LCAxMjhdLFxuICAgIFwia2hha2lcIjogWzI0MCwgMjMwLCAxNDBdLFxuICAgIFwiYWxpY2VibHVlXCI6IFsyNDAsIDI0OCwgMjU1XSxcbiAgICBcImhvbmV5ZGV3XCI6IFsyNDAsIDI1NSwgMjQwXSxcbiAgICBcImF6dXJlXCI6IFsyNDAsIDI1NSwgMjU1XSxcbiAgICBcInNhbmR5YnJvd25cIjogWzI0NCwgMTY0LCA5Nl0sXG4gICAgXCJ3aGVhdFwiOiBbMjQ1LCAyMjIsIDE3OV0sXG4gICAgXCJiZWlnZVwiOiBbMjQ1LCAyNDUsIDIyMF0sXG4gICAgXCJ3aGl0ZXNtb2tlXCI6IFsyNDUsIDI0NSwgMjQ1XSxcbiAgICBcIm1pbnRjcmVhbVwiOiBbMjQ1LCAyNTUsIDI1MF0sXG4gICAgXCJnaG9zdHdoaXRlXCI6IFsyNDgsIDI0OCwgMjU1XSxcbiAgICBcInNhbG1vblwiOiBbMjUwLCAxMjgsIDExNF0sXG4gICAgXCJhbnRpcXVld2hpdGVcIjogWzI1MCwgMjM1LCAyMTVdLFxuICAgIFwibGluZW5cIjogWzI1MCwgMjQwLCAyMzBdLFxuICAgIFwibGlnaHRnb2xkZW5yb2R5ZWxsb3dcIjogWzI1MCwgMjUwLCAyMTBdLFxuICAgIFwib2xkbGFjZVwiOiBbMjUzLCAyNDUsIDIzMF0sXG4gICAgXCJyZWRcIjogWzI1NSwgMCwgMF0sXG4gICAgXCJmdWNoc2lhXCI6IFsyNTUsIDAsIDI1NV0sXG4gICAgXCJtYWdlbnRhXCI6IFsyNTUsIDAsIDI1NV0sXG4gICAgXCJkZWVwcGlua1wiOiBbMjU1LCAyMCwgMTQ3XSxcbiAgICBcIm9yYW5nZXJlZFwiOiBbMjU1LCA2OSwgMF0sXG4gICAgXCJ0b21hdG9cIjogWzI1NSwgOTksIDcxXSxcbiAgICBcImhvdHBpbmtcIjogWzI1NSwgMTA1LCAxODBdLFxuICAgIFwiY29yYWxcIjogWzI1NSwgMTI3LCA4MF0sXG4gICAgXCJkYXJrb3JhbmdlXCI6IFsyNTUsIDE0MCwgMF0sXG4gICAgXCJsaWdodHNhbG1vblwiOiBbMjU1LCAxNjAsIDEyMl0sXG4gICAgXCJvcmFuZ2VcIjogWzI1NSwgMTY1LCAwXSxcbiAgICBcImxpZ2h0cGlua1wiOiBbMjU1LCAxODIsIDE5M10sXG4gICAgXCJwaW5rXCI6IFsyNTUsIDE5MiwgMjAzXSxcbiAgICBcImdvbGRcIjogWzI1NSwgMjE1LCAwXSxcbiAgICBcInBlYWNocHVmZlwiOiBbMjU1LCAyMTgsIDE4NV0sXG4gICAgXCJuYXZham93aGl0ZVwiOiBbMjU1LCAyMjIsIDE3M10sXG4gICAgXCJtb2NjYXNpblwiOiBbMjU1LCAyMjgsIDE4MV0sXG4gICAgXCJiaXNxdWVcIjogWzI1NSwgMjI4LCAxOTZdLFxuICAgIFwibWlzdHlyb3NlXCI6IFsyNTUsIDIyOCwgMjI1XSxcbiAgICBcImJsYW5jaGVkYWxtb25kXCI6IFsyNTUsIDIzNSwgMjA1XSxcbiAgICBcInBhcGF5YXdoaXBcIjogWzI1NSwgMjM5LCAyMTNdLFxuICAgIFwibGF2ZW5kZXJibHVzaFwiOiBbMjU1LCAyNDAsIDI0NV0sXG4gICAgXCJzZWFzaGVsbFwiOiBbMjU1LCAyNDUsIDIzOF0sXG4gICAgXCJjb3Juc2lsa1wiOiBbMjU1LCAyNDgsIDIyMF0sXG4gICAgXCJsZW1vbmNoaWZmb25cIjogWzI1NSwgMjUwLCAyMDVdLFxuICAgIFwiZmxvcmFsd2hpdGVcIjogWzI1NSwgMjUwLCAyNDBdLFxuICAgIFwic25vd1wiOiBbMjU1LCAyNTAsIDI1MF0sXG4gICAgXCJ5ZWxsb3dcIjogWzI1NSwgMjU1LCAwXSxcbiAgICBcImxpZ2h0eWVsbG93XCI6IFsyNTUsIDI1NSwgMjI0XSxcbiAgICBcIml2b3J5XCI6IFsyNTUsIDI1NSwgMjQwXSxcbiAgICBcIndoaXRlXCI6IFsyNTUsIDI1NSwgMjU1XVxufTtcbiIsIi8qKiBEZWZhdWx0IHdpdGggZm9yIGRpc3BsYXkgYW5kIG1hcCBnZW5lcmF0b3JzICovXG5leHBvcnQgbGV0IERFRkFVTFRfV0lEVEggPSA4MDtcbi8qKiBEZWZhdWx0IGhlaWdodCBmb3IgZGlzcGxheSBhbmQgbWFwIGdlbmVyYXRvcnMgKi9cbmV4cG9ydCBsZXQgREVGQVVMVF9IRUlHSFQgPSAyNTtcbmV4cG9ydCBjb25zdCBESVJTID0ge1xuICAgIDQ6IFtbMCwgLTFdLCBbMSwgMF0sIFswLCAxXSwgWy0xLCAwXV0sXG4gICAgODogW1swLCAtMV0sIFsxLCAtMV0sIFsxLCAwXSwgWzEsIDFdLCBbMCwgMV0sIFstMSwgMV0sIFstMSwgMF0sIFstMSwgLTFdXSxcbiAgICA2OiBbWy0xLCAtMV0sIFsxLCAtMV0sIFsyLCAwXSwgWzEsIDFdLCBbLTEsIDFdLCBbLTIsIDBdXVxufTtcbmV4cG9ydCBjb25zdCBLRVlTID0ge1xuICAgIC8qKiBDYW5jZWwga2V5LiAqL1xuICAgIFZLX0NBTkNFTDogMyxcbiAgICAvKiogSGVscCBrZXkuICovXG4gICAgVktfSEVMUDogNixcbiAgICAvKiogQmFja3NwYWNlIGtleS4gKi9cbiAgICBWS19CQUNLX1NQQUNFOiA4LFxuICAgIC8qKiBUYWIga2V5LiAqL1xuICAgIFZLX1RBQjogOSxcbiAgICAvKiogNSBrZXkgb24gTnVtcGFkIHdoZW4gTnVtTG9jayBpcyB1bmxvY2tlZC4gT3Igb24gTWFjLCBjbGVhciBrZXkgd2hpY2ggaXMgcG9zaXRpb25lZCBhdCBOdW1Mb2NrIGtleS4gKi9cbiAgICBWS19DTEVBUjogMTIsXG4gICAgLyoqIFJldHVybi9lbnRlciBrZXkgb24gdGhlIG1haW4ga2V5Ym9hcmQuICovXG4gICAgVktfUkVUVVJOOiAxMyxcbiAgICAvKiogUmVzZXJ2ZWQsIGJ1dCBub3QgdXNlZC4gKi9cbiAgICBWS19FTlRFUjogMTQsXG4gICAgLyoqIFNoaWZ0IGtleS4gKi9cbiAgICBWS19TSElGVDogMTYsXG4gICAgLyoqIENvbnRyb2wga2V5LiAqL1xuICAgIFZLX0NPTlRST0w6IDE3LFxuICAgIC8qKiBBbHQgKE9wdGlvbiBvbiBNYWMpIGtleS4gKi9cbiAgICBWS19BTFQ6IDE4LFxuICAgIC8qKiBQYXVzZSBrZXkuICovXG4gICAgVktfUEFVU0U6IDE5LFxuICAgIC8qKiBDYXBzIGxvY2suICovXG4gICAgVktfQ0FQU19MT0NLOiAyMCxcbiAgICAvKiogRXNjYXBlIGtleS4gKi9cbiAgICBWS19FU0NBUEU6IDI3LFxuICAgIC8qKiBTcGFjZSBiYXIuICovXG4gICAgVktfU1BBQ0U6IDMyLFxuICAgIC8qKiBQYWdlIFVwIGtleS4gKi9cbiAgICBWS19QQUdFX1VQOiAzMyxcbiAgICAvKiogUGFnZSBEb3duIGtleS4gKi9cbiAgICBWS19QQUdFX0RPV046IDM0LFxuICAgIC8qKiBFbmQga2V5LiAqL1xuICAgIFZLX0VORDogMzUsXG4gICAgLyoqIEhvbWUga2V5LiAqL1xuICAgIFZLX0hPTUU6IDM2LFxuICAgIC8qKiBMZWZ0IGFycm93LiAqL1xuICAgIFZLX0xFRlQ6IDM3LFxuICAgIC8qKiBVcCBhcnJvdy4gKi9cbiAgICBWS19VUDogMzgsXG4gICAgLyoqIFJpZ2h0IGFycm93LiAqL1xuICAgIFZLX1JJR0hUOiAzOSxcbiAgICAvKiogRG93biBhcnJvdy4gKi9cbiAgICBWS19ET1dOOiA0MCxcbiAgICAvKiogUHJpbnQgU2NyZWVuIGtleS4gKi9cbiAgICBWS19QUklOVFNDUkVFTjogNDQsXG4gICAgLyoqIElucyhlcnQpIGtleS4gKi9cbiAgICBWS19JTlNFUlQ6IDQ1LFxuICAgIC8qKiBEZWwoZXRlKSBrZXkuICovXG4gICAgVktfREVMRVRFOiA0NixcbiAgICAvKioqL1xuICAgIFZLXzA6IDQ4LFxuICAgIC8qKiovXG4gICAgVktfMTogNDksXG4gICAgLyoqKi9cbiAgICBWS18yOiA1MCxcbiAgICAvKioqL1xuICAgIFZLXzM6IDUxLFxuICAgIC8qKiovXG4gICAgVktfNDogNTIsXG4gICAgLyoqKi9cbiAgICBWS181OiA1MyxcbiAgICAvKioqL1xuICAgIFZLXzY6IDU0LFxuICAgIC8qKiovXG4gICAgVktfNzogNTUsXG4gICAgLyoqKi9cbiAgICBWS184OiA1NixcbiAgICAvKioqL1xuICAgIFZLXzk6IDU3LFxuICAgIC8qKiBDb2xvbiAoOikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQ09MT046IDU4LFxuICAgIC8qKiBTZW1pY29sb24gKDspIGtleS4gKi9cbiAgICBWS19TRU1JQ09MT046IDU5LFxuICAgIC8qKiBMZXNzLXRoYW4gKDwpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0xFU1NfVEhBTjogNjAsXG4gICAgLyoqIEVxdWFscyAoPSkga2V5LiAqL1xuICAgIFZLX0VRVUFMUzogNjEsXG4gICAgLyoqIEdyZWF0ZXItdGhhbiAoPikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfR1JFQVRFUl9USEFOOiA2MixcbiAgICAvKiogUXVlc3Rpb24gbWFyayAoPykga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfUVVFU1RJT05fTUFSSzogNjMsXG4gICAgLyoqIEF0bWFyayAoQCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQVQ6IDY0LFxuICAgIC8qKiovXG4gICAgVktfQTogNjUsXG4gICAgLyoqKi9cbiAgICBWS19COiA2NixcbiAgICAvKioqL1xuICAgIFZLX0M6IDY3LFxuICAgIC8qKiovXG4gICAgVktfRDogNjgsXG4gICAgLyoqKi9cbiAgICBWS19FOiA2OSxcbiAgICAvKioqL1xuICAgIFZLX0Y6IDcwLFxuICAgIC8qKiovXG4gICAgVktfRzogNzEsXG4gICAgLyoqKi9cbiAgICBWS19IOiA3MixcbiAgICAvKioqL1xuICAgIFZLX0k6IDczLFxuICAgIC8qKiovXG4gICAgVktfSjogNzQsXG4gICAgLyoqKi9cbiAgICBWS19LOiA3NSxcbiAgICAvKioqL1xuICAgIFZLX0w6IDc2LFxuICAgIC8qKiovXG4gICAgVktfTTogNzcsXG4gICAgLyoqKi9cbiAgICBWS19OOiA3OCxcbiAgICAvKioqL1xuICAgIFZLX086IDc5LFxuICAgIC8qKiovXG4gICAgVktfUDogODAsXG4gICAgLyoqKi9cbiAgICBWS19ROiA4MSxcbiAgICAvKioqL1xuICAgIFZLX1I6IDgyLFxuICAgIC8qKiovXG4gICAgVktfUzogODMsXG4gICAgLyoqKi9cbiAgICBWS19UOiA4NCxcbiAgICAvKioqL1xuICAgIFZLX1U6IDg1LFxuICAgIC8qKiovXG4gICAgVktfVjogODYsXG4gICAgLyoqKi9cbiAgICBWS19XOiA4NyxcbiAgICAvKioqL1xuICAgIFZLX1g6IDg4LFxuICAgIC8qKiovXG4gICAgVktfWTogODksXG4gICAgLyoqKi9cbiAgICBWS19aOiA5MCxcbiAgICAvKioqL1xuICAgIFZLX0NPTlRFWFRfTUVOVTogOTMsXG4gICAgLyoqIDAgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDA6IDk2LFxuICAgIC8qKiAxIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQxOiA5NyxcbiAgICAvKiogMiBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFEMjogOTgsXG4gICAgLyoqIDMgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDM6IDk5LFxuICAgIC8qKiA0IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQ0OiAxMDAsXG4gICAgLyoqIDUgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDU6IDEwMSxcbiAgICAvKiogNiBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFENjogMTAyLFxuICAgIC8qKiA3IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQ3OiAxMDMsXG4gICAgLyoqIDggb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDg6IDEwNCxcbiAgICAvKiogOSBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFEOTogMTA1LFxuICAgIC8qKiAqIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19NVUxUSVBMWTogMTA2LFxuICAgIC8qKiArIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19BREQ6IDEwNyxcbiAgICAvKioqL1xuICAgIFZLX1NFUEFSQVRPUjogMTA4LFxuICAgIC8qKiAtIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19TVUJUUkFDVDogMTA5LFxuICAgIC8qKiBEZWNpbWFsIHBvaW50IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19ERUNJTUFMOiAxMTAsXG4gICAgLyoqIC8gb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX0RJVklERTogMTExLFxuICAgIC8qKiBGMSBrZXkuICovXG4gICAgVktfRjE6IDExMixcbiAgICAvKiogRjIga2V5LiAqL1xuICAgIFZLX0YyOiAxMTMsXG4gICAgLyoqIEYzIGtleS4gKi9cbiAgICBWS19GMzogMTE0LFxuICAgIC8qKiBGNCBrZXkuICovXG4gICAgVktfRjQ6IDExNSxcbiAgICAvKiogRjUga2V5LiAqL1xuICAgIFZLX0Y1OiAxMTYsXG4gICAgLyoqIEY2IGtleS4gKi9cbiAgICBWS19GNjogMTE3LFxuICAgIC8qKiBGNyBrZXkuICovXG4gICAgVktfRjc6IDExOCxcbiAgICAvKiogRjgga2V5LiAqL1xuICAgIFZLX0Y4OiAxMTksXG4gICAgLyoqIEY5IGtleS4gKi9cbiAgICBWS19GOTogMTIwLFxuICAgIC8qKiBGMTAga2V5LiAqL1xuICAgIFZLX0YxMDogMTIxLFxuICAgIC8qKiBGMTEga2V5LiAqL1xuICAgIFZLX0YxMTogMTIyLFxuICAgIC8qKiBGMTIga2V5LiAqL1xuICAgIFZLX0YxMjogMTIzLFxuICAgIC8qKiBGMTMga2V5LiAqL1xuICAgIFZLX0YxMzogMTI0LFxuICAgIC8qKiBGMTQga2V5LiAqL1xuICAgIFZLX0YxNDogMTI1LFxuICAgIC8qKiBGMTUga2V5LiAqL1xuICAgIFZLX0YxNTogMTI2LFxuICAgIC8qKiBGMTYga2V5LiAqL1xuICAgIFZLX0YxNjogMTI3LFxuICAgIC8qKiBGMTcga2V5LiAqL1xuICAgIFZLX0YxNzogMTI4LFxuICAgIC8qKiBGMTgga2V5LiAqL1xuICAgIFZLX0YxODogMTI5LFxuICAgIC8qKiBGMTkga2V5LiAqL1xuICAgIFZLX0YxOTogMTMwLFxuICAgIC8qKiBGMjAga2V5LiAqL1xuICAgIFZLX0YyMDogMTMxLFxuICAgIC8qKiBGMjEga2V5LiAqL1xuICAgIFZLX0YyMTogMTMyLFxuICAgIC8qKiBGMjIga2V5LiAqL1xuICAgIFZLX0YyMjogMTMzLFxuICAgIC8qKiBGMjMga2V5LiAqL1xuICAgIFZLX0YyMzogMTM0LFxuICAgIC8qKiBGMjQga2V5LiAqL1xuICAgIFZLX0YyNDogMTM1LFxuICAgIC8qKiBOdW0gTG9jayBrZXkuICovXG4gICAgVktfTlVNX0xPQ0s6IDE0NCxcbiAgICAvKiogU2Nyb2xsIExvY2sga2V5LiAqL1xuICAgIFZLX1NDUk9MTF9MT0NLOiAxNDUsXG4gICAgLyoqIENpcmN1bWZsZXggKF4pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0NJUkNVTUZMRVg6IDE2MCxcbiAgICAvKiogRXhjbGFtYXRpb24gKCEpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0VYQ0xBTUFUSU9OOiAxNjEsXG4gICAgLyoqIERvdWJsZSBxdW90ZSAoKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19ET1VCTEVfUVVPVEU6IDE2MixcbiAgICAvKiogSGFzaCAoIykga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfSEFTSDogMTYzLFxuICAgIC8qKiBEb2xsYXIgc2lnbiAoJCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfRE9MTEFSOiAxNjQsXG4gICAgLyoqIFBlcmNlbnQgKCUpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1BFUkNFTlQ6IDE2NSxcbiAgICAvKiogQW1wZXJzYW5kICgmKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19BTVBFUlNBTkQ6IDE2NixcbiAgICAvKiogVW5kZXJzY29yZSAoXykga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfVU5ERVJTQ09SRTogMTY3LFxuICAgIC8qKiBPcGVuIHBhcmVudGhlc2lzICgoKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19PUEVOX1BBUkVOOiAxNjgsXG4gICAgLyoqIENsb3NlIHBhcmVudGhlc2lzICgpKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19DTE9TRV9QQVJFTjogMTY5LFxuICAgIC8qIEFzdGVyaXNrICgqKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19BU1RFUklTSzogMTcwLFxuICAgIC8qKiBQbHVzICgrKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19QTFVTOiAxNzEsXG4gICAgLyoqIFBpcGUgKHwpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1BJUEU6IDE3MixcbiAgICAvKiogSHlwaGVuLVVTL2RvY3MvTWludXMgKC0pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0hZUEhFTl9NSU5VUzogMTczLFxuICAgIC8qKiBPcGVuIGN1cmx5IGJyYWNrZXQgKHspIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX09QRU5fQ1VSTFlfQlJBQ0tFVDogMTc0LFxuICAgIC8qKiBDbG9zZSBjdXJseSBicmFja2V0ICh9KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19DTE9TRV9DVVJMWV9CUkFDS0VUOiAxNzUsXG4gICAgLyoqIFRpbGRlICh+KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19USUxERTogMTc2LFxuICAgIC8qKiBDb21tYSAoLCkga2V5LiAqL1xuICAgIFZLX0NPTU1BOiAxODgsXG4gICAgLyoqIFBlcmlvZCAoLikga2V5LiAqL1xuICAgIFZLX1BFUklPRDogMTkwLFxuICAgIC8qKiBTbGFzaCAoLykga2V5LiAqL1xuICAgIFZLX1NMQVNIOiAxOTEsXG4gICAgLyoqIEJhY2sgdGljayAoYCkga2V5LiAqL1xuICAgIFZLX0JBQ0tfUVVPVEU6IDE5MixcbiAgICAvKiogT3BlbiBzcXVhcmUgYnJhY2tldCAoWykga2V5LiAqL1xuICAgIFZLX09QRU5fQlJBQ0tFVDogMjE5LFxuICAgIC8qKiBCYWNrIHNsYXNoIChcXCkga2V5LiAqL1xuICAgIFZLX0JBQ0tfU0xBU0g6IDIyMCxcbiAgICAvKiogQ2xvc2Ugc3F1YXJlIGJyYWNrZXQgKF0pIGtleS4gKi9cbiAgICBWS19DTE9TRV9CUkFDS0VUOiAyMjEsXG4gICAgLyoqIFF1b3RlICgnJycpIGtleS4gKi9cbiAgICBWS19RVU9URTogMjIyLFxuICAgIC8qKiBNZXRhIGtleSBvbiBMaW51eCwgQ29tbWFuZCBrZXkgb24gTWFjLiAqL1xuICAgIFZLX01FVEE6IDIyNCxcbiAgICAvKiogQWx0R3Iga2V5IG9uIExpbnV4LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQUxUR1I6IDIyNSxcbiAgICAvKiogV2luZG93cyBsb2dvIGtleSBvbiBXaW5kb3dzLiBPciBTdXBlciBvciBIeXBlciBrZXkgb24gTGludXguIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19XSU46IDkxLFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19LQU5BOiAyMSxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfSEFOR1VMOiAyMSxcbiAgICAvKiog6Iux5pWwIGtleSBvbiBKYXBhbmVzZSBNYWMga2V5Ym9hcmQuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19FSVNVOiAyMixcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfSlVOSkE6IDIzLFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19GSU5BTDogMjQsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0hBTkpBOiAyNSxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfS0FOSkk6IDI1LFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19DT05WRVJUOiAyOCxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfTk9OQ09OVkVSVDogMjksXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0FDQ0VQVDogMzAsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX01PREVDSEFOR0U6IDMxLFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19TRUxFQ1Q6IDQxLFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19QUklOVDogNDIsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0VYRUNVVEU6IDQzLFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC5cdCAqL1xuICAgIFZLX1NMRUVQOiA5NVxufTtcbiIsIi8qKlxuICogQGNsYXNzIEFic3RyYWN0IGRpc3BsYXkgYmFja2VuZCBtb2R1bGVcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tlbmQge1xuICAgIGdldENvbnRhaW5lcigpIHsgcmV0dXJuIG51bGw7IH1cbiAgICBzZXRPcHRpb25zKG9wdGlvbnMpIHsgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7IH1cbn1cbiIsImltcG9ydCBCYWNrZW5kIGZyb20gXCIuL2JhY2tlbmQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhcyBleHRlbmRzIEJhY2tlbmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9jdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB9XG4gICAgc2NoZWR1bGUoY2IpIHsgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNiKTsgfVxuICAgIGdldENvbnRhaW5lcigpIHsgcmV0dXJuIHRoaXMuX2N0eC5jYW52YXM7IH1cbiAgICBzZXRPcHRpb25zKG9wdHMpIHtcbiAgICAgICAgc3VwZXIuc2V0T3B0aW9ucyhvcHRzKTtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSAob3B0cy5mb250U3R5bGUgPyBgJHtvcHRzLmZvbnRTdHlsZX0gYCA6IGBgKTtcbiAgICAgICAgY29uc3QgZm9udCA9IGAke3N0eWxlfSAke29wdHMuZm9udFNpemV9cHggJHtvcHRzLmZvbnRGYW1pbHl9YDtcbiAgICAgICAgdGhpcy5fY3R4LmZvbnQgPSBmb250O1xuICAgICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG4gICAgICAgIHRoaXMuX2N0eC5mb250ID0gZm9udDtcbiAgICAgICAgdGhpcy5fY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgIHRoaXMuX2N0eC50ZXh0QmFzZWxpbmUgPSBcIm1pZGRsZVwiO1xuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IHRoaXMuX29wdGlvbnMuYmc7XG4gICAgICAgIHRoaXMuX2N0eC5maWxsUmVjdCgwLCAwLCB0aGlzLl9jdHguY2FudmFzLndpZHRoLCB0aGlzLl9jdHguY2FudmFzLmhlaWdodCk7XG4gICAgfVxuICAgIGV2ZW50VG9Qb3NpdGlvbih4LCB5KSB7XG4gICAgICAgIGxldCBjYW52YXMgPSB0aGlzLl9jdHguY2FudmFzO1xuICAgICAgICBsZXQgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgeCAtPSByZWN0LmxlZnQ7XG4gICAgICAgIHkgLT0gcmVjdC50b3A7XG4gICAgICAgIHggKj0gY2FudmFzLndpZHRoIC8gcmVjdC53aWR0aDtcbiAgICAgICAgeSAqPSBjYW52YXMuaGVpZ2h0IC8gcmVjdC5oZWlnaHQ7XG4gICAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID49IGNhbnZhcy53aWR0aCB8fCB5ID49IGNhbnZhcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBbLTEsIC0xXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbih4LCB5KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgSGV4IGZyb20gXCIuL2hleC5qc1wiO1xuaW1wb3J0IFJlY3QgZnJvbSBcIi4vcmVjdC5qc1wiO1xuaW1wb3J0IFRpbGUgZnJvbSBcIi4vdGlsZS5qc1wiO1xuaW1wb3J0IFRpbGVHTCBmcm9tIFwiLi90aWxlLWdsLmpzXCI7XG5pbXBvcnQgVGVybSBmcm9tIFwiLi90ZXJtLmpzXCI7XG5pbXBvcnQgKiBhcyBUZXh0IGZyb20gXCIuLi90ZXh0LmpzXCI7XG5pbXBvcnQgeyBERUZBVUxUX1dJRFRILCBERUZBVUxUX0hFSUdIVCB9IGZyb20gXCIuLi9jb25zdGFudHMuanNcIjtcbmNvbnN0IEJBQ0tFTkRTID0ge1xuICAgIFwiaGV4XCI6IEhleCxcbiAgICBcInJlY3RcIjogUmVjdCxcbiAgICBcInRpbGVcIjogVGlsZSxcbiAgICBcInRpbGUtZ2xcIjogVGlsZUdMLFxuICAgIFwidGVybVwiOiBUZXJtXG59O1xuY29uc3QgREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHdpZHRoOiBERUZBVUxUX1dJRFRILFxuICAgIGhlaWdodDogREVGQVVMVF9IRUlHSFQsXG4gICAgdHJhbnNwb3NlOiBmYWxzZSxcbiAgICBsYXlvdXQ6IFwicmVjdFwiLFxuICAgIGZvbnRTaXplOiAxNSxcbiAgICBzcGFjaW5nOiAxLFxuICAgIGJvcmRlcjogMCxcbiAgICBmb3JjZVNxdWFyZVJhdGlvOiBmYWxzZSxcbiAgICBmb250RmFtaWx5OiBcIm1vbm9zcGFjZVwiLFxuICAgIGZvbnRTdHlsZTogXCJcIixcbiAgICBmZzogXCIjY2NjXCIsXG4gICAgYmc6IFwiIzAwMFwiLFxuICAgIHRpbGVXaWR0aDogMzIsXG4gICAgdGlsZUhlaWdodDogMzIsXG4gICAgdGlsZU1hcDoge30sXG4gICAgdGlsZVNldDogbnVsbCxcbiAgICB0aWxlQ29sb3JpemU6IGZhbHNlXG59O1xuLyoqXG4gKiBAY2xhc3MgVmlzdWFsIG1hcCBkaXNwbGF5XG4gKi9cbmxldCBEaXNwbGF5ID0gLyoqIEBjbGFzcyAqLyAoKCkgPT4ge1xuICAgIGNsYXNzIERpc3BsYXkge1xuICAgICAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0gZmFsc2U7IC8vIGZhbHNlID0gbm90aGluZywgdHJ1ZSA9IGFsbCwgb2JqZWN0ID0gZGlydHkgY2VsbHNcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX09QVElPTlMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5ERUJVRyA9IHRoaXMuREVCVUcuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX3RpY2sgPSB0aGlzLl90aWNrLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9iYWNrZW5kLnNjaGVkdWxlKHRoaXMuX3RpY2spO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWJ1ZyBoZWxwZXIsIGlkZWFsIGFzIGEgbWFwIGdlbmVyYXRvciBjYWxsYmFjay4gQWx3YXlzIGJvdW5kIHRvIHRoaXMuXG4gICAgICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICAgICAqIEBwYXJhbSB7aW50fSB3aGF0XG4gICAgICAgICAqL1xuICAgICAgICBERUJVRyh4LCB5LCB3aGF0KSB7XG4gICAgICAgICAgICBsZXQgY29sb3JzID0gW3RoaXMuX29wdGlvbnMuYmcsIHRoaXMuX29wdGlvbnMuZmddO1xuICAgICAgICAgICAgdGhpcy5kcmF3KHgsIHksIG51bGwsIG51bGwsIGNvbG9yc1t3aGF0ICUgY29sb3JzLmxlbmd0aF0pO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGVhciB0aGUgd2hvbGUgZGlzcGxheSAoY292ZXIgaXQgd2l0aCBiYWNrZ3JvdW5kIGNvbG9yKVxuICAgICAgICAgKi9cbiAgICAgICAgY2xlYXIoKSB7XG4gICAgICAgICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgICAgICAgICB0aGlzLl9kaXJ0eSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBzZWUgUk9ULkRpc3BsYXlcbiAgICAgICAgICovXG4gICAgICAgIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLndpZHRoIHx8IG9wdGlvbnMuaGVpZ2h0IHx8IG9wdGlvbnMuZm9udFNpemUgfHwgb3B0aW9ucy5mb250RmFtaWx5IHx8IG9wdGlvbnMuc3BhY2luZyB8fCBvcHRpb25zLmxheW91dCkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmxheW91dCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3RvciA9IEJBQ0tFTkRTW29wdGlvbnMubGF5b3V0XTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmFja2VuZCA9IG5ldyBjdG9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2JhY2tlbmQuc2V0T3B0aW9ucyh0aGlzLl9vcHRpb25zKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyBjdXJyZW50bHkgc2V0IG9wdGlvbnNcbiAgICAgICAgICovXG4gICAgICAgIGdldE9wdGlvbnMoKSB7IHJldHVybiB0aGlzLl9vcHRpb25zOyB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBET00gbm9kZSBvZiB0aGlzIGRpc3BsYXlcbiAgICAgICAgICovXG4gICAgICAgIGdldENvbnRhaW5lcigpIHsgcmV0dXJuIHRoaXMuX2JhY2tlbmQuZ2V0Q29udGFpbmVyKCk7IH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbXB1dGUgdGhlIG1heGltdW0gd2lkdGgvaGVpZ2h0IHRvIGZpdCBpbnRvIGEgc2V0IG9mIGdpdmVuIGNvbnN0cmFpbnRzXG4gICAgICAgICAqIEBwYXJhbSB7aW50fSBhdmFpbFdpZHRoIE1heGltdW0gYWxsb3dlZCBwaXhlbCB3aWR0aFxuICAgICAgICAgKiBAcGFyYW0ge2ludH0gYXZhaWxIZWlnaHQgTWF4aW11bSBhbGxvd2VkIHBpeGVsIGhlaWdodFxuICAgICAgICAgKiBAcmV0dXJucyB7aW50WzJdfSBjZWxsV2lkdGgsY2VsbEhlaWdodFxuICAgICAgICAgKi9cbiAgICAgICAgY29tcHV0ZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYWNrZW5kLmNvbXB1dGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ29tcHV0ZSB0aGUgbWF4aW11bSBmb250IHNpemUgdG8gZml0IGludG8gYSBzZXQgb2YgZ2l2ZW4gY29uc3RyYWludHNcbiAgICAgICAgICogQHBhcmFtIHtpbnR9IGF2YWlsV2lkdGggTWF4aW11bSBhbGxvd2VkIHBpeGVsIHdpZHRoXG4gICAgICAgICAqIEBwYXJhbSB7aW50fSBhdmFpbEhlaWdodCBNYXhpbXVtIGFsbG93ZWQgcGl4ZWwgaGVpZ2h0XG4gICAgICAgICAqIEByZXR1cm5zIHtpbnR9IGZvbnRTaXplXG4gICAgICAgICAqL1xuICAgICAgICBjb21wdXRlRm9udFNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYWNrZW5kLmNvbXB1dGVGb250U2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgY29tcHV0ZVRpbGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgICAgICBsZXQgd2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9vcHRpb25zLndpZHRoKTtcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSBNYXRoLmZsb29yKGF2YWlsSGVpZ2h0IC8gdGhpcy5fb3B0aW9ucy5oZWlnaHQpO1xuICAgICAgICAgICAgcmV0dXJuIFt3aWR0aCwgaGVpZ2h0XTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydCBhIERPTSBldmVudCAobW91c2Ugb3IgdG91Y2gpIHRvIG1hcCBjb29yZGluYXRlcy4gVXNlcyBmaXJzdCB0b3VjaCBmb3IgbXVsdGktdG91Y2guXG4gICAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGUgZXZlbnRcbiAgICAgICAgICogQHJldHVybnMge2ludFsyXX0gLTEgZm9yIHZhbHVlcyBvdXRzaWRlIG9mIHRoZSBjYW52YXNcbiAgICAgICAgICovXG4gICAgICAgIGV2ZW50VG9Qb3NpdGlvbihlKSB7XG4gICAgICAgICAgICBsZXQgeCwgeTtcbiAgICAgICAgICAgIGlmIChcInRvdWNoZXNcIiBpbiBlKSB7XG4gICAgICAgICAgICAgICAgeCA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xuICAgICAgICAgICAgICAgIHkgPSBlLnRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHggPSBlLmNsaWVudFg7XG4gICAgICAgICAgICAgICAgeSA9IGUuY2xpZW50WTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYWNrZW5kLmV2ZW50VG9Qb3NpdGlvbih4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmcgfHwgc3RyaW5nW119IGNoIE9uZSBvciBtb3JlIGNoYXJzICh3aWxsIGJlIG92ZXJsYXBwaW5nIHRoZW1zZWx2ZXMpXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbZmddIGZvcmVncm91bmQgY29sb3JcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IFtiZ10gYmFja2dyb3VuZCBjb2xvclxuICAgICAgICAgKi9cbiAgICAgICAgZHJhdyh4LCB5LCBjaCwgZmcsIGJnKSB7XG4gICAgICAgICAgICBpZiAoIWZnKSB7XG4gICAgICAgICAgICAgICAgZmcgPSB0aGlzLl9vcHRpb25zLmZnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFiZykge1xuICAgICAgICAgICAgICAgIGJnID0gdGhpcy5fb3B0aW9ucy5iZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBrZXkgPSBgJHt4fSwke3l9YDtcbiAgICAgICAgICAgIHRoaXMuX2RhdGFba2V5XSA9IFt4LCB5LCBjaCwgZmcsIGJnXTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kaXJ0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gLy8gd2lsbCBhbHJlYWR5IHJlZHJhdyBldmVyeXRoaW5nIFxuICAgICAgICAgICAgaWYgKCF0aGlzLl9kaXJ0eSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0ge307XG4gICAgICAgICAgICB9IC8vIGZpcnN0IVxuICAgICAgICAgICAgdGhpcy5fZGlydHlba2V5XSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nIHx8IHN0cmluZ1tdfSBjaCBPbmUgb3IgbW9yZSBjaGFycyAod2lsbCBiZSBvdmVybGFwcGluZyB0aGVtc2VsdmVzKVxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZyB8fCBudWxsfSBbZmddIGZvcmVncm91bmQgY29sb3JcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmcgfHwgbnVsbH0gW2JnXSBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgICAgICAqL1xuICAgICAgICBkcmF3T3Zlcih4LCB5LCBjaCwgZmcsIGJnKSB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt4fSwke3l9YDtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nID0gdGhpcy5fZGF0YVtrZXldO1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdbMl0gPSBjaCB8fCBleGlzdGluZ1syXTtcbiAgICAgICAgICAgICAgICBleGlzdGluZ1szXSA9IGZnIHx8IGV4aXN0aW5nWzNdO1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nWzRdID0gYmcgfHwgZXhpc3RpbmdbNF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXcoeCwgeSwgY2gsIGZnLCBiZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERyYXdzIGEgdGV4dCBhdCBnaXZlbiBwb3NpdGlvbi4gT3B0aW9uYWxseSB3cmFwcyBhdCBhIG1heGltdW0gbGVuZ3RoLiBDdXJyZW50bHkgZG9lcyBub3Qgd29yayB3aXRoIGhleCBsYXlvdXQuXG4gICAgICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IE1heSBjb250YWluIGNvbG9yL2JhY2tncm91bmQgZm9ybWF0IHNwZWNpZmllcnMsICVje25hbWV9LyVie25hbWV9LCBib3RoIG9wdGlvbmFsLiAlY3t9LyVie30gcmVzZXRzIHRvIGRlZmF1bHQuXG4gICAgICAgICAqIEBwYXJhbSB7aW50fSBbbWF4V2lkdGhdIHdyYXAgYXQgd2hhdCB3aWR0aD9cbiAgICAgICAgICogQHJldHVybnMge2ludH0gbGluZXMgZHJhd25cbiAgICAgICAgICovXG4gICAgICAgIGRyYXdUZXh0KHgsIHksIHRleHQsIG1heFdpZHRoKSB7XG4gICAgICAgICAgICBsZXQgZmcgPSBudWxsO1xuICAgICAgICAgICAgbGV0IGJnID0gbnVsbDtcbiAgICAgICAgICAgIGxldCBjeCA9IHg7XG4gICAgICAgICAgICBsZXQgY3kgPSB5O1xuICAgICAgICAgICAgbGV0IGxpbmVzID0gMTtcbiAgICAgICAgICAgIGlmICghbWF4V2lkdGgpIHtcbiAgICAgICAgICAgICAgICBtYXhXaWR0aCA9IHRoaXMuX29wdGlvbnMud2lkdGggLSB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHRva2VucyA9IFRleHQudG9rZW5pemUodGV4dCwgbWF4V2lkdGgpO1xuICAgICAgICAgICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHsgLy8gaW50ZXJwcmV0IHRva2VuaXplZCBvcGNvZGUgc3RyZWFtXG4gICAgICAgICAgICAgICAgbGV0IHRva2VuID0gdG9rZW5zLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0b2tlbi50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVGV4dC5UWVBFX1RFWFQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNTcGFjZSA9IGZhbHNlLCBpc1ByZXZTcGFjZSA9IGZhbHNlLCBpc0Z1bGxXaWR0aCA9IGZhbHNlLCBpc1ByZXZGdWxsV2lkdGggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rZW4udmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2MgPSB0b2tlbi52YWx1ZS5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjID0gdG9rZW4udmFsdWUuY2hhckF0KGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmxheW91dCA9PT0gXCJ0ZXJtXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNjaCA9IGNjID4+IDg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpc0NKSyA9IGNjaCA9PT0gMHgxMSB8fCAoY2NoID49IDB4MmUgJiYgY2NoIDw9IDB4OWYpIHx8IChjY2ggPj0gMHhhYyAmJiBjY2ggPD0gMHhkNykgfHwgKGNjID49IDB4QTk2MCAmJiBjYyA8PSAweEE5N0YpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDSkspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhdyhjeCArIDAsIGN5LCBjLCBmZywgYmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3KGN4ICsgMSwgY3ksIFwiXFx0XCIsIGZnLCBiZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeCArPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXNzaWduIHRvIGB0cnVlYCB3aGVuIHRoZSBjdXJyZW50IGNoYXIgaXMgZnVsbC13aWR0aC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0Z1bGxXaWR0aCA9IChjYyA+IDB4ZmYwMCAmJiBjYyA8IDB4ZmY2MSkgfHwgKGNjID4gMHhmZmRjICYmIGNjIDwgMHhmZmU4KSB8fCBjYyA+IDB4ZmZlZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDdXJyZW50IGNoYXIgaXMgc3BhY2UsIHdoYXRldmVyIGZ1bGwtd2lkdGggb3IgaGFsZi13aWR0aCBib3RoIGFyZSBPSy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1NwYWNlID0gKGMuY2hhckNvZGVBdCgwKSA9PSAweDIwIHx8IGMuY2hhckNvZGVBdCgwKSA9PSAweDMwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBwcmV2aW91cyBjaGFyIGlzIGZ1bGwtd2lkdGggYW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY3VycmVudCBjaGFyIGlzIG5ldGhlciBoYWxmLXdpZHRoIG5vciBhIHNwYWNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1ByZXZGdWxsV2lkdGggJiYgIWlzRnVsbFdpZHRoICYmICFpc1NwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAvLyBhZGQgYW4gZXh0cmEgcG9zaXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgY3VycmVudCBjaGFyIGlzIGZ1bGwtd2lkdGggYW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHByZXZpb3VzIGNoYXIgaXMgbm90IGEgc3BhY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRnVsbFdpZHRoICYmICFpc1ByZXZTcGFjZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gLy8gYWRkIGFuIGV4dHJhIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3KGN4KyssIGN5LCBjLCBmZywgYmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUHJldlNwYWNlID0gaXNTcGFjZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1ByZXZGdWxsV2lkdGggPSBpc0Z1bGxXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFRleHQuVFlQRV9GRzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZnID0gdG9rZW4udmFsdWUgfHwgbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFRleHQuVFlQRV9CRzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJnID0gdG9rZW4udmFsdWUgfHwgbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFRleHQuVFlQRV9ORVdMSU5FOlxuICAgICAgICAgICAgICAgICAgICAgICAgY3ggPSB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgY3krKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGluZXM7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRpbWVyIHRpY2s6IHVwZGF0ZSBkaXJ0eSBwYXJ0c1xuICAgICAgICAgKi9cbiAgICAgICAgX3RpY2soKSB7XG4gICAgICAgICAgICB0aGlzLl9iYWNrZW5kLnNjaGVkdWxlKHRoaXMuX3RpY2spO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9kaXJ0eSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9kaXJ0eSA9PT0gdHJ1ZSkgeyAvLyBkcmF3IGFsbFxuICAgICAgICAgICAgICAgIHRoaXMuX2JhY2tlbmQuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpZCBpbiB0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RyYXcoaWQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9IC8vIHJlZHJhdyBjYWNoZWQgZGF0YSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvLyBkcmF3IG9ubHkgZGlydHkgXG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX2RpcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RyYXcoa2V5LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9kaXJ0eSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFdoYXQgdG8gZHJhd1xuICAgICAgICAgKiBAcGFyYW0ge2Jvb2x9IGNsZWFyQmVmb3JlIElzIGl0IG5lY2Vzc2FyeSB0byBjbGVhbiBiZWZvcmU/XG4gICAgICAgICAqL1xuICAgICAgICBfZHJhdyhrZXksIGNsZWFyQmVmb3JlKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuX2RhdGFba2V5XTtcbiAgICAgICAgICAgIGlmIChkYXRhWzRdICE9IHRoaXMuX29wdGlvbnMuYmcpIHtcbiAgICAgICAgICAgICAgICBjbGVhckJlZm9yZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9iYWNrZW5kLmRyYXcoZGF0YSwgY2xlYXJCZWZvcmUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIERpc3BsYXkuUmVjdCA9IFJlY3Q7XG4gICAgRGlzcGxheS5IZXggPSBIZXg7XG4gICAgRGlzcGxheS5UaWxlID0gVGlsZTtcbiAgICBEaXNwbGF5LlRpbGVHTCA9IFRpbGVHTDtcbiAgICBEaXNwbGF5LlRlcm0gPSBUZXJtO1xuICAgIHJldHVybiBEaXNwbGF5O1xufSkoKTtcbmV4cG9ydCBkZWZhdWx0IERpc3BsYXk7XG4iLCJpbXBvcnQgQ2FudmFzIGZyb20gXCIuL2NhbnZhcy5qc1wiO1xuaW1wb3J0IHsgbW9kIH0gZnJvbSBcIi4uL3V0aWwuanNcIjtcbi8qKlxuICogQGNsYXNzIEhleGFnb25hbCBiYWNrZW5kXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXggZXh0ZW5kcyBDYW52YXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9zcGFjaW5nWCA9IDA7XG4gICAgICAgIHRoaXMuX3NwYWNpbmdZID0gMDtcbiAgICAgICAgdGhpcy5faGV4U2l6ZSA9IDA7XG4gICAgfVxuICAgIGRyYXcoZGF0YSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgbGV0IFt4LCB5LCBjaCwgZmcsIGJnXSA9IGRhdGE7XG4gICAgICAgIGxldCBweCA9IFtcbiAgICAgICAgICAgICh4ICsgMSkgKiB0aGlzLl9zcGFjaW5nWCxcbiAgICAgICAgICAgIHkgKiB0aGlzLl9zcGFjaW5nWSArIHRoaXMuX2hleFNpemVcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJhbnNwb3NlKSB7XG4gICAgICAgICAgICBweC5yZXZlcnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNsZWFyQmVmb3JlKSB7XG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gYmc7XG4gICAgICAgICAgICB0aGlzLl9maWxsKHB4WzBdLCBweFsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjaCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBmZztcbiAgICAgICAgbGV0IGNoYXJzID0gW10uY29uY2F0KGNoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxUZXh0KGNoYXJzW2ldLCBweFswXSwgTWF0aC5jZWlsKHB4WzFdKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcHV0ZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJhbnNwb3NlKSB7XG4gICAgICAgICAgICBhdmFpbFdpZHRoICs9IGF2YWlsSGVpZ2h0O1xuICAgICAgICAgICAgYXZhaWxIZWlnaHQgPSBhdmFpbFdpZHRoIC0gYXZhaWxIZWlnaHQ7XG4gICAgICAgICAgICBhdmFpbFdpZHRoIC09IGF2YWlsSGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGxldCB3aWR0aCA9IE1hdGguZmxvb3IoYXZhaWxXaWR0aCAvIHRoaXMuX3NwYWNpbmdYKSAtIDE7XG4gICAgICAgIGxldCBoZWlnaHQgPSBNYXRoLmZsb29yKChhdmFpbEhlaWdodCAtIDIgKiB0aGlzLl9oZXhTaXplKSAvIHRoaXMuX3NwYWNpbmdZICsgMSk7XG4gICAgICAgIHJldHVybiBbd2lkdGgsIGhlaWdodF07XG4gICAgfVxuICAgIGNvbXB1dGVGb250U2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50cmFuc3Bvc2UpIHtcbiAgICAgICAgICAgIGF2YWlsV2lkdGggKz0gYXZhaWxIZWlnaHQ7XG4gICAgICAgICAgICBhdmFpbEhlaWdodCA9IGF2YWlsV2lkdGggLSBhdmFpbEhlaWdodDtcbiAgICAgICAgICAgIGF2YWlsV2lkdGggLT0gYXZhaWxIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGhleFNpemVXaWR0aCA9IDIgKiBhdmFpbFdpZHRoIC8gKCh0aGlzLl9vcHRpb25zLndpZHRoICsgMSkgKiBNYXRoLnNxcnQoMykpIC0gMTtcbiAgICAgICAgbGV0IGhleFNpemVIZWlnaHQgPSBhdmFpbEhlaWdodCAvICgyICsgMS41ICogKHRoaXMuX29wdGlvbnMuaGVpZ2h0IC0gMSkpO1xuICAgICAgICBsZXQgaGV4U2l6ZSA9IE1hdGgubWluKGhleFNpemVXaWR0aCwgaGV4U2l6ZUhlaWdodCk7XG4gICAgICAgIC8vIGNvbXB1dGUgY2hhciByYXRpb1xuICAgICAgICBsZXQgb2xkRm9udCA9IHRoaXMuX2N0eC5mb250O1xuICAgICAgICB0aGlzLl9jdHguZm9udCA9IFwiMTAwcHggXCIgKyB0aGlzLl9vcHRpb25zLmZvbnRGYW1pbHk7XG4gICAgICAgIGxldCB3aWR0aCA9IE1hdGguY2VpbCh0aGlzLl9jdHgubWVhc3VyZVRleHQoXCJXXCIpLndpZHRoKTtcbiAgICAgICAgdGhpcy5fY3R4LmZvbnQgPSBvbGRGb250O1xuICAgICAgICBsZXQgcmF0aW8gPSB3aWR0aCAvIDEwMDtcbiAgICAgICAgaGV4U2l6ZSA9IE1hdGguZmxvb3IoaGV4U2l6ZSkgKyAxOyAvLyBjbG9zZXN0IGxhcmdlciBoZXhTaXplXG4gICAgICAgIC8vIEZJWE1FIGNoYXIgc2l6ZSBjb21wdXRhdGlvbiBkb2VzIG5vdCByZXNwZWN0IHRyYW5zcG9zZWQgaGV4ZXNcbiAgICAgICAgbGV0IGZvbnRTaXplID0gMiAqIGhleFNpemUgLyAodGhpcy5fb3B0aW9ucy5zcGFjaW5nICogKDEgKyByYXRpbyAvIE1hdGguc3FydCgzKSkpO1xuICAgICAgICAvLyBjbG9zZXN0IHNtYWxsZXIgZm9udFNpemVcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChmb250U2l6ZSkgLSAxO1xuICAgIH1cbiAgICBfbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbih4LCB5KSB7XG4gICAgICAgIGxldCBub2RlU2l6ZTtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJhbnNwb3NlKSB7XG4gICAgICAgICAgICB4ICs9IHk7XG4gICAgICAgICAgICB5ID0geCAtIHk7XG4gICAgICAgICAgICB4IC09IHk7XG4gICAgICAgICAgICBub2RlU2l6ZSA9IHRoaXMuX2N0eC5jYW52YXMud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBub2RlU2l6ZSA9IHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGxldCBzaXplID0gbm9kZVNpemUgLyB0aGlzLl9vcHRpb25zLmhlaWdodDtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoeSAvIHNpemUpO1xuICAgICAgICBpZiAobW9kKHksIDIpKSB7IC8qIG9kZCByb3cgKi9cbiAgICAgICAgICAgIHggLT0gdGhpcy5fc3BhY2luZ1g7XG4gICAgICAgICAgICB4ID0gMSArIDIgKiBNYXRoLmZsb29yKHggLyAoMiAqIHRoaXMuX3NwYWNpbmdYKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB4ID0gMiAqIE1hdGguZmxvb3IoeCAvICgyICogdGhpcy5fc3BhY2luZ1gpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3gsIHldO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcmd1bWVudHMgYXJlIHBpeGVsIHZhbHVlcy4gSWYgXCJ0cmFuc3Bvc2VkXCIgbW9kZSBpcyBlbmFibGVkLCB0aGVuIHRoZXNlIHR3byBhcmUgYWxyZWFkeSBzd2FwcGVkLlxuICAgICAqL1xuICAgIF9maWxsKGN4LCBjeSkge1xuICAgICAgICBsZXQgYSA9IHRoaXMuX2hleFNpemU7XG4gICAgICAgIGxldCBiID0gdGhpcy5fb3B0aW9ucy5ib3JkZXI7XG4gICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuX2N0eDtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50cmFuc3Bvc2UpIHtcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8oY3ggLSBhICsgYiwgY3kpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCAtIGEgLyAyICsgYiwgY3kgKyB0aGlzLl9zcGFjaW5nWCAtIGIpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCArIGEgLyAyIC0gYiwgY3kgKyB0aGlzLl9zcGFjaW5nWCAtIGIpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCArIGEgLSBiLCBjeSk7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4ICsgYSAvIDIgLSBiLCBjeSAtIHRoaXMuX3NwYWNpbmdYICsgYik7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4IC0gYSAvIDIgKyBiLCBjeSAtIHRoaXMuX3NwYWNpbmdYICsgYik7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4IC0gYSArIGIsIGN5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8oY3gsIGN5IC0gYSArIGIpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCArIHRoaXMuX3NwYWNpbmdYIC0gYiwgY3kgLSBhIC8gMiArIGIpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCArIHRoaXMuX3NwYWNpbmdYIC0gYiwgY3kgKyBhIC8gMiAtIGIpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCwgY3kgKyBhIC0gYik7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4IC0gdGhpcy5fc3BhY2luZ1ggKyBiLCBjeSArIGEgLyAyIC0gYik7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4IC0gdGhpcy5fc3BhY2luZ1ggKyBiLCBjeSAtIGEgLyAyICsgYik7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4LCBjeSAtIGEgKyBiKTtcbiAgICAgICAgfVxuICAgICAgICBjdHguZmlsbCgpO1xuICAgIH1cbiAgICBfdXBkYXRlU2l6ZSgpIHtcbiAgICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX29wdGlvbnM7XG4gICAgICAgIGNvbnN0IGNoYXJXaWR0aCA9IE1hdGguY2VpbCh0aGlzLl9jdHgubWVhc3VyZVRleHQoXCJXXCIpLndpZHRoKTtcbiAgICAgICAgdGhpcy5faGV4U2l6ZSA9IE1hdGguZmxvb3Iob3B0cy5zcGFjaW5nICogKG9wdHMuZm9udFNpemUgKyBjaGFyV2lkdGggLyBNYXRoLnNxcnQoMykpIC8gMik7XG4gICAgICAgIHRoaXMuX3NwYWNpbmdYID0gdGhpcy5faGV4U2l6ZSAqIE1hdGguc3FydCgzKSAvIDI7XG4gICAgICAgIHRoaXMuX3NwYWNpbmdZID0gdGhpcy5faGV4U2l6ZSAqIDEuNTtcbiAgICAgICAgbGV0IHhwcm9wO1xuICAgICAgICBsZXQgeXByb3A7XG4gICAgICAgIGlmIChvcHRzLnRyYW5zcG9zZSkge1xuICAgICAgICAgICAgeHByb3AgPSBcImhlaWdodFwiO1xuICAgICAgICAgICAgeXByb3AgPSBcIndpZHRoXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB4cHJvcCA9IFwid2lkdGhcIjtcbiAgICAgICAgICAgIHlwcm9wID0gXCJoZWlnaHRcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdHguY2FudmFzW3hwcm9wXSA9IE1hdGguY2VpbCgob3B0cy53aWR0aCArIDEpICogdGhpcy5fc3BhY2luZ1gpO1xuICAgICAgICB0aGlzLl9jdHguY2FudmFzW3lwcm9wXSA9IE1hdGguY2VpbCgob3B0cy5oZWlnaHQgLSAxKSAqIHRoaXMuX3NwYWNpbmdZICsgMiAqIHRoaXMuX2hleFNpemUpO1xuICAgIH1cbn1cbiIsImltcG9ydCBDYW52YXMgZnJvbSBcIi4vY2FudmFzLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBSZWN0YW5ndWxhciBiYWNrZW5kXG4gKiBAcHJpdmF0ZVxuICovXG5sZXQgUmVjdCA9IC8qKiBAY2xhc3MgKi8gKCgpID0+IHtcbiAgICBjbGFzcyBSZWN0IGV4dGVuZHMgQ2FudmFzIHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5fc3BhY2luZ1ggPSAwO1xuICAgICAgICAgICAgdGhpcy5fc3BhY2luZ1kgPSAwO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzQ2FjaGUgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHN1cGVyLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXNDYWNoZSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGRyYXcoZGF0YSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgICAgIGlmIChSZWN0LmNhY2hlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHJhd1dpdGhDYWNoZShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RyYXdOb0NhY2hlKGRhdGEsIGNsZWFyQmVmb3JlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfZHJhd1dpdGhDYWNoZShkYXRhKSB7XG4gICAgICAgICAgICBsZXQgW3gsIHksIGNoLCBmZywgYmddID0gZGF0YTtcbiAgICAgICAgICAgIGxldCBoYXNoID0gXCJcIiArIGNoICsgZmcgKyBiZztcbiAgICAgICAgICAgIGxldCBjYW52YXM7XG4gICAgICAgICAgICBpZiAoaGFzaCBpbiB0aGlzLl9jYW52YXNDYWNoZSkge1xuICAgICAgICAgICAgICAgIGNhbnZhcyA9IHRoaXMuX2NhbnZhc0NhY2hlW2hhc2hdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGIgPSB0aGlzLl9vcHRpb25zLmJvcmRlcjtcbiAgICAgICAgICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IHRoaXMuX3NwYWNpbmdYO1xuICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLl9zcGFjaW5nWTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gYmc7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGIsIGIsIGNhbnZhcy53aWR0aCAtIGIsIGNhbnZhcy5oZWlnaHQgLSBiKTtcbiAgICAgICAgICAgICAgICBpZiAoY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGZnO1xuICAgICAgICAgICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuX2N0eC5mb250O1xuICAgICAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9IFwibWlkZGxlXCI7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGFycyA9IFtdLmNvbmNhdChjaCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChjaGFyc1tpXSwgdGhpcy5fc3BhY2luZ1ggLyAyLCBNYXRoLmNlaWwodGhpcy5fc3BhY2luZ1kgLyAyKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FudmFzQ2FjaGVbaGFzaF0gPSBjYW52YXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jdHguZHJhd0ltYWdlKGNhbnZhcywgeCAqIHRoaXMuX3NwYWNpbmdYLCB5ICogdGhpcy5fc3BhY2luZ1kpO1xuICAgICAgICB9XG4gICAgICAgIF9kcmF3Tm9DYWNoZShkYXRhLCBjbGVhckJlZm9yZSkge1xuICAgICAgICAgICAgbGV0IFt4LCB5LCBjaCwgZmcsIGJnXSA9IGRhdGE7XG4gICAgICAgICAgICBpZiAoY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgICAgICAgICBsZXQgYiA9IHRoaXMuX29wdGlvbnMuYm9yZGVyO1xuICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBiZztcbiAgICAgICAgICAgICAgICB0aGlzLl9jdHguZmlsbFJlY3QoeCAqIHRoaXMuX3NwYWNpbmdYICsgYiwgeSAqIHRoaXMuX3NwYWNpbmdZICsgYiwgdGhpcy5fc3BhY2luZ1ggLSBiLCB0aGlzLl9zcGFjaW5nWSAtIGIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBmZztcbiAgICAgICAgICAgIGxldCBjaGFycyA9IFtdLmNvbmNhdChjaCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxUZXh0KGNoYXJzW2ldLCAoeCArIDAuNSkgKiB0aGlzLl9zcGFjaW5nWCwgTWF0aC5jZWlsKCh5ICsgMC41KSAqIHRoaXMuX3NwYWNpbmdZKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29tcHV0ZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IE1hdGguZmxvb3IoYXZhaWxXaWR0aCAvIHRoaXMuX3NwYWNpbmdYKTtcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSBNYXRoLmZsb29yKGF2YWlsSGVpZ2h0IC8gdGhpcy5fc3BhY2luZ1kpO1xuICAgICAgICAgICAgcmV0dXJuIFt3aWR0aCwgaGVpZ2h0XTtcbiAgICAgICAgfVxuICAgICAgICBjb21wdXRlRm9udFNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgICAgIGxldCBib3hXaWR0aCA9IE1hdGguZmxvb3IoYXZhaWxXaWR0aCAvIHRoaXMuX29wdGlvbnMud2lkdGgpO1xuICAgICAgICAgICAgbGV0IGJveEhlaWdodCA9IE1hdGguZmxvb3IoYXZhaWxIZWlnaHQgLyB0aGlzLl9vcHRpb25zLmhlaWdodCk7XG4gICAgICAgICAgICAvKiBjb21wdXRlIGNoYXIgcmF0aW8gKi9cbiAgICAgICAgICAgIGxldCBvbGRGb250ID0gdGhpcy5fY3R4LmZvbnQ7XG4gICAgICAgICAgICB0aGlzLl9jdHguZm9udCA9IFwiMTAwcHggXCIgKyB0aGlzLl9vcHRpb25zLmZvbnRGYW1pbHk7XG4gICAgICAgICAgICBsZXQgd2lkdGggPSBNYXRoLmNlaWwodGhpcy5fY3R4Lm1lYXN1cmVUZXh0KFwiV1wiKS53aWR0aCk7XG4gICAgICAgICAgICB0aGlzLl9jdHguZm9udCA9IG9sZEZvbnQ7XG4gICAgICAgICAgICBsZXQgcmF0aW8gPSB3aWR0aCAvIDEwMDtcbiAgICAgICAgICAgIGxldCB3aWR0aEZyYWN0aW9uID0gcmF0aW8gKiBib3hIZWlnaHQgLyBib3hXaWR0aDtcbiAgICAgICAgICAgIGlmICh3aWR0aEZyYWN0aW9uID4gMSkgeyAvKiB0b28gd2lkZSB3aXRoIGN1cnJlbnQgYXNwZWN0IHJhdGlvICovXG4gICAgICAgICAgICAgICAgYm94SGVpZ2h0ID0gTWF0aC5mbG9vcihib3hIZWlnaHQgLyB3aWR0aEZyYWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGJveEhlaWdodCAvIHRoaXMuX29wdGlvbnMuc3BhY2luZyk7XG4gICAgICAgIH1cbiAgICAgICAgX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24oeCwgeSkge1xuICAgICAgICAgICAgcmV0dXJuIFtNYXRoLmZsb29yKHggLyB0aGlzLl9zcGFjaW5nWCksIE1hdGguZmxvb3IoeSAvIHRoaXMuX3NwYWNpbmdZKV07XG4gICAgICAgIH1cbiAgICAgICAgX3VwZGF0ZVNpemUoKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRzID0gdGhpcy5fb3B0aW9ucztcbiAgICAgICAgICAgIGNvbnN0IGNoYXJXaWR0aCA9IE1hdGguY2VpbCh0aGlzLl9jdHgubWVhc3VyZVRleHQoXCJXXCIpLndpZHRoKTtcbiAgICAgICAgICAgIHRoaXMuX3NwYWNpbmdYID0gTWF0aC5jZWlsKG9wdHMuc3BhY2luZyAqIGNoYXJXaWR0aCk7XG4gICAgICAgICAgICB0aGlzLl9zcGFjaW5nWSA9IE1hdGguY2VpbChvcHRzLnNwYWNpbmcgKiBvcHRzLmZvbnRTaXplKTtcbiAgICAgICAgICAgIGlmIChvcHRzLmZvcmNlU3F1YXJlUmF0aW8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGFjaW5nWCA9IHRoaXMuX3NwYWNpbmdZID0gTWF0aC5tYXgodGhpcy5fc3BhY2luZ1gsIHRoaXMuX3NwYWNpbmdZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2N0eC5jYW52YXMud2lkdGggPSBvcHRzLndpZHRoICogdGhpcy5fc3BhY2luZ1g7XG4gICAgICAgICAgICB0aGlzLl9jdHguY2FudmFzLmhlaWdodCA9IG9wdHMuaGVpZ2h0ICogdGhpcy5fc3BhY2luZ1k7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUmVjdC5jYWNoZSA9IGZhbHNlO1xuICAgIHJldHVybiBSZWN0O1xufSkoKTtcbmV4cG9ydCBkZWZhdWx0IFJlY3Q7XG4iLCJpbXBvcnQgQmFja2VuZCBmcm9tIFwiLi9iYWNrZW5kLmpzXCI7XG5pbXBvcnQgKiBhcyBDb2xvciBmcm9tIFwiLi4vY29sb3IuanNcIjtcbmZ1bmN0aW9uIGNsZWFyVG9BbnNpKGJnKSB7XG4gICAgcmV0dXJuIGBcXHgxYlswOzQ4OzU7JHt0ZXJtY29sb3IoYmcpfW1cXHgxYlsySmA7XG59XG5mdW5jdGlvbiBjb2xvclRvQW5zaShmZywgYmcpIHtcbiAgICByZXR1cm4gYFxceDFiWzA7Mzg7NTske3Rlcm1jb2xvcihmZyl9OzQ4OzU7JHt0ZXJtY29sb3IoYmcpfW1gO1xufVxuZnVuY3Rpb24gcG9zaXRpb25Ub0Fuc2koeCwgeSkge1xuICAgIHJldHVybiBgXFx4MWJbJHt5ICsgMX07JHt4ICsgMX1IYDtcbn1cbmZ1bmN0aW9uIHRlcm1jb2xvcihjb2xvcikge1xuICAgIGNvbnN0IFNSQ19DT0xPUlMgPSAyNTYuMDtcbiAgICBjb25zdCBEU1RfQ09MT1JTID0gNi4wO1xuICAgIGNvbnN0IENPTE9SX1JBVElPID0gRFNUX0NPTE9SUyAvIFNSQ19DT0xPUlM7XG4gICAgbGV0IHJnYiA9IENvbG9yLmZyb21TdHJpbmcoY29sb3IpO1xuICAgIGxldCByID0gTWF0aC5mbG9vcihyZ2JbMF0gKiBDT0xPUl9SQVRJTyk7XG4gICAgbGV0IGcgPSBNYXRoLmZsb29yKHJnYlsxXSAqIENPTE9SX1JBVElPKTtcbiAgICBsZXQgYiA9IE1hdGguZmxvb3IocmdiWzJdICogQ09MT1JfUkFUSU8pO1xuICAgIHJldHVybiByICogMzYgKyBnICogNiArIGIgKiAxICsgMTY7XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXJtIGV4dGVuZHMgQmFja2VuZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX29mZnNldCA9IFswLCAwXTtcbiAgICAgICAgdGhpcy5fY3Vyc29yID0gWy0xLCAtMV07XG4gICAgICAgIHRoaXMuX2xhc3RDb2xvciA9IFwiXCI7XG4gICAgfVxuICAgIHNjaGVkdWxlKGNiKSB7IHNldFRpbWVvdXQoY2IsIDEwMDAgLyA2MCk7IH1cbiAgICBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgbGV0IHNpemUgPSBbb3B0aW9ucy53aWR0aCwgb3B0aW9ucy5oZWlnaHRdO1xuICAgICAgICBsZXQgYXZhaWwgPSB0aGlzLmNvbXB1dGVTaXplKCk7XG4gICAgICAgIHRoaXMuX29mZnNldCA9IGF2YWlsLm1hcCgodmFsLCBpbmRleCkgPT4gTWF0aC5mbG9vcigodmFsIC0gc2l6ZVtpbmRleF0pIC8gMikpO1xuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoY2xlYXJUb0Fuc2kodGhpcy5fb3B0aW9ucy5iZykpO1xuICAgIH1cbiAgICBkcmF3KGRhdGEsIGNsZWFyQmVmb3JlKSB7XG4gICAgICAgIC8vIGRldGVybWluZSB3aGVyZSB0byBkcmF3IHdoYXQgd2l0aCB3aGF0IGNvbG9yc1xuICAgICAgICBsZXQgW3gsIHksIGNoLCBmZywgYmddID0gZGF0YTtcbiAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIHdlIG5lZWQgdG8gbW92ZSB0aGUgdGVybWluYWwgY3Vyc29yXG4gICAgICAgIGxldCBkeCA9IHRoaXMuX29mZnNldFswXSArIHg7XG4gICAgICAgIGxldCBkeSA9IHRoaXMuX29mZnNldFsxXSArIHk7XG4gICAgICAgIGxldCBzaXplID0gdGhpcy5jb21wdXRlU2l6ZSgpO1xuICAgICAgICBpZiAoZHggPCAwIHx8IGR4ID49IHNpemVbMF0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZHkgPCAwIHx8IGR5ID49IHNpemVbMV0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZHggIT09IHRoaXMuX2N1cnNvclswXSB8fCBkeSAhPT0gdGhpcy5fY3Vyc29yWzFdKSB7XG4gICAgICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShwb3NpdGlvblRvQW5zaShkeCwgZHkpKTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclswXSA9IGR4O1xuICAgICAgICAgICAgdGhpcy5fY3Vyc29yWzFdID0gZHk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGVybWluYWxzIGF1dG9tYXRpY2FsbHkgY2xlYXIsIGJ1dCBpZiB3ZSdyZSBjbGVhcmluZyB3aGVuIHdlJ3JlXG4gICAgICAgIC8vIG5vdCBvdGhlcndpc2UgcHJvdmlkZWQgd2l0aCBhIGNoYXJhY3RlciwganVzdCB1c2UgYSBzcGFjZSBpbnN0ZWFkXG4gICAgICAgIGlmIChjbGVhckJlZm9yZSkge1xuICAgICAgICAgICAgaWYgKCFjaCkge1xuICAgICAgICAgICAgICAgIGNoID0gXCIgXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgd2UncmUgbm90IGNsZWFyaW5nIGFuZCBub3QgcHJvdmlkZWQgd2l0aCBhIGNoYXJhY3RlciwgZG8gbm90aGluZ1xuICAgICAgICBpZiAoIWNoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIHdlIG5lZWQgdG8gY2hhbmdlIGNvbG9yc1xuICAgICAgICBsZXQgbmV3Q29sb3IgPSBjb2xvclRvQW5zaShmZywgYmcpO1xuICAgICAgICBpZiAobmV3Q29sb3IgIT09IHRoaXMuX2xhc3RDb2xvcikge1xuICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUobmV3Q29sb3IpO1xuICAgICAgICAgICAgdGhpcy5fbGFzdENvbG9yID0gbmV3Q29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoICE9ICdcXHQnKSB7XG4gICAgICAgICAgICAvLyB3cml0ZSB0aGUgcHJvdmlkZWQgc3ltYm9sIHRvIHRoZSBkaXNwbGF5XG4gICAgICAgICAgICBsZXQgY2hhcnMgPSBbXS5jb25jYXQoY2gpO1xuICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoY2hhcnNbMF0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHVwZGF0ZSBvdXIgcG9zaXRpb24sIGdpdmVuIHRoYXQgd2Ugd3JvdGUgYSBjaGFyYWN0ZXJcbiAgICAgICAgdGhpcy5fY3Vyc29yWzBdKys7XG4gICAgICAgIGlmICh0aGlzLl9jdXJzb3JbMF0gPj0gc2l6ZVswXSkge1xuICAgICAgICAgICAgdGhpcy5fY3Vyc29yWzBdID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclsxXSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXB1dGVGb250U2l6ZSgpIHsgdGhyb3cgbmV3IEVycm9yKFwiVGVybWluYWwgYmFja2VuZCBoYXMgbm8gbm90aW9uIG9mIGZvbnQgc2l6ZVwiKTsgfVxuICAgIGV2ZW50VG9Qb3NpdGlvbih4LCB5KSB7IHJldHVybiBbeCwgeV07IH1cbiAgICBjb21wdXRlU2l6ZSgpIHsgcmV0dXJuIFtwcm9jZXNzLnN0ZG91dC5jb2x1bW5zLCBwcm9jZXNzLnN0ZG91dC5yb3dzXTsgfVxufVxuIiwiaW1wb3J0IEJhY2tlbmQgZnJvbSBcIi4vYmFja2VuZC5qc1wiO1xuaW1wb3J0ICogYXMgQ29sb3IgZnJvbSBcIi4uL2NvbG9yLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBUaWxlIGJhY2tlbmRcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbGVHTCBleHRlbmRzIEJhY2tlbmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl91bmlmb3JtcyA9IHt9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5fZ2wgPSB0aGlzLl9pbml0V2ViR0woKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgYWxlcnQoZS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgaXNTdXBwb3J0ZWQoKSB7XG4gICAgICAgIHJldHVybiAhIWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIndlYmdsMlwiLCB7IHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogdHJ1ZSB9KTtcbiAgICB9XG4gICAgc2NoZWR1bGUoY2IpIHsgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNiKTsgfVxuICAgIGdldENvbnRhaW5lcigpIHsgcmV0dXJuIHRoaXMuX2dsLmNhbnZhczsgfVxuICAgIHNldE9wdGlvbnMob3B0cykge1xuICAgICAgICBzdXBlci5zZXRPcHRpb25zKG9wdHMpO1xuICAgICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG4gICAgICAgIGxldCB0aWxlU2V0ID0gdGhpcy5fb3B0aW9ucy50aWxlU2V0O1xuICAgICAgICBpZiAodGlsZVNldCAmJiBcImNvbXBsZXRlXCIgaW4gdGlsZVNldCAmJiAhdGlsZVNldC5jb21wbGV0ZSkge1xuICAgICAgICAgICAgdGlsZVNldC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB0aGlzLl91cGRhdGVUZXh0dXJlKHRpbGVTZXQpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRleHR1cmUodGlsZVNldCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZHJhdyhkYXRhLCBjbGVhckJlZm9yZSkge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuICAgICAgICBjb25zdCBvcHRzID0gdGhpcy5fb3B0aW9ucztcbiAgICAgICAgbGV0IFt4LCB5LCBjaCwgZmcsIGJnXSA9IGRhdGE7XG4gICAgICAgIGxldCBzY2lzc29yWSA9IGdsLmNhbnZhcy5oZWlnaHQgLSAoeSArIDEpICogb3B0cy50aWxlSGVpZ2h0O1xuICAgICAgICBnbC5zY2lzc29yKHggKiBvcHRzLnRpbGVXaWR0aCwgc2Npc3NvclksIG9wdHMudGlsZVdpZHRoLCBvcHRzLnRpbGVIZWlnaHQpO1xuICAgICAgICBpZiAoY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLnRpbGVDb2xvcml6ZSkge1xuICAgICAgICAgICAgICAgIGdsLmNsZWFyQ29sb3IoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbC5jbGVhckNvbG9yKC4uLnBhcnNlQ29sb3IoYmcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2gpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2hhcnMgPSBbXS5jb25jYXQoY2gpO1xuICAgICAgICBsZXQgYmdzID0gW10uY29uY2F0KGJnKTtcbiAgICAgICAgbGV0IGZncyA9IFtdLmNvbmNhdChmZyk7XG4gICAgICAgIGdsLnVuaWZvcm0yZnYodGhpcy5fdW5pZm9ybXNbXCJ0YXJnZXRQb3NSZWxcIl0sIFt4LCB5XSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0aWxlID0gdGhpcy5fb3B0aW9ucy50aWxlTWFwW2NoYXJzW2ldXTtcbiAgICAgICAgICAgIGlmICghdGlsZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hhciBcIiR7Y2hhcnNbaV19XCIgbm90IGZvdW5kIGluIHRpbGVNYXBgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdsLnVuaWZvcm0xZih0aGlzLl91bmlmb3Jtc1tcImNvbG9yaXplXCJdLCBvcHRzLnRpbGVDb2xvcml6ZSA/IDEgOiAwKTtcbiAgICAgICAgICAgIGdsLnVuaWZvcm0yZnYodGhpcy5fdW5pZm9ybXNbXCJ0aWxlc2V0UG9zQWJzXCJdLCB0aWxlKTtcbiAgICAgICAgICAgIGlmIChvcHRzLnRpbGVDb2xvcml6ZSkge1xuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm00ZnYodGhpcy5fdW5pZm9ybXNbXCJ0aW50XCJdLCBwYXJzZUNvbG9yKGZnc1tpXSkpO1xuICAgICAgICAgICAgICAgIGdsLnVuaWZvcm00ZnYodGhpcy5fdW5pZm9ybXNbXCJiZ1wiXSwgcGFyc2VDb2xvcihiZ3NbaV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVfU1RSSVAsIDAsIDQpO1xuICAgICAgICB9XG4gICAgICAgIC8qXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTxjaGFycy5sZW5ndGg7aSsrKSB7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50aWxlQ29sb3JpemUpIHsgLy8gYXBwbHkgY29sb3JpemF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5fY29sb3JDYW52YXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1vdmVyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmZyA9IGZnc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiZyA9IGJnc1tpXTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLnRpbGVTZXQhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVbMF0sIHRpbGVbMV0sIHRpbGVXaWR0aCwgdGlsZUhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZnICE9IFwidHJhbnNwYXJlbnRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1hdG9wXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiZyAhPSBcInRyYW5zcGFyZW50XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1vdmVyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5kcmF3SW1hZ2UoY2FudmFzLCB4KnRpbGVXaWR0aCwgeSp0aWxlSGVpZ2h0LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBubyBjb2xvcml6aW5nLCBlYXN5XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMudGlsZVNldCEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsZVswXSwgdGlsZVsxXSwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgqdGlsZVdpZHRoLCB5KnRpbGVIZWlnaHQsIHRpbGVXaWR0aCwgdGlsZUhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICovXG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuICAgICAgICBnbC5jbGVhckNvbG9yKC4uLnBhcnNlQ29sb3IodGhpcy5fb3B0aW9ucy5iZykpO1xuICAgICAgICBnbC5zY2lzc29yKDAsIDAsIGdsLmNhbnZhcy53aWR0aCwgZ2wuY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpO1xuICAgIH1cbiAgICBjb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICBsZXQgd2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9vcHRpb25zLnRpbGVXaWR0aCk7XG4gICAgICAgIGxldCBoZWlnaHQgPSBNYXRoLmZsb29yKGF2YWlsSGVpZ2h0IC8gdGhpcy5fb3B0aW9ucy50aWxlSGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIFt3aWR0aCwgaGVpZ2h0XTtcbiAgICB9XG4gICAgY29tcHV0ZUZvbnRTaXplKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaWxlIGJhY2tlbmQgZG9lcyBub3QgdW5kZXJzdGFuZCBmb250IHNpemVcIik7XG4gICAgfVxuICAgIGV2ZW50VG9Qb3NpdGlvbih4LCB5KSB7XG4gICAgICAgIGxldCBjYW52YXMgPSB0aGlzLl9nbC5jYW52YXM7XG4gICAgICAgIGxldCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB4IC09IHJlY3QubGVmdDtcbiAgICAgICAgeSAtPSByZWN0LnRvcDtcbiAgICAgICAgeCAqPSBjYW52YXMud2lkdGggLyByZWN0LndpZHRoO1xuICAgICAgICB5ICo9IGNhbnZhcy5oZWlnaHQgLyByZWN0LmhlaWdodDtcbiAgICAgICAgaWYgKHggPCAwIHx8IHkgPCAwIHx8IHggPj0gY2FudmFzLndpZHRoIHx8IHkgPj0gY2FudmFzLmhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIFstMSwgLTFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uKHgsIHkpO1xuICAgIH1cbiAgICBfaW5pdFdlYkdMKCkge1xuICAgICAgICBsZXQgZ2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCJ3ZWJnbDJcIiwgeyBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRydWUgfSk7XG4gICAgICAgIHdpbmRvdy5nbCA9IGdsO1xuICAgICAgICBsZXQgcHJvZ3JhbSA9IGNyZWF0ZVByb2dyYW0oZ2wsIFZTLCBGUyk7XG4gICAgICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG4gICAgICAgIGNyZWF0ZVF1YWQoZ2wpO1xuICAgICAgICBVTklGT1JNUy5mb3JFYWNoKG5hbWUgPT4gdGhpcy5fdW5pZm9ybXNbbmFtZV0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgbmFtZSkpO1xuICAgICAgICB0aGlzLl9wcm9ncmFtID0gcHJvZ3JhbTtcbiAgICAgICAgZ2wuZW5hYmxlKGdsLkJMRU5EKTtcbiAgICAgICAgZ2wuYmxlbmRGdW5jU2VwYXJhdGUoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBLCBnbC5PTkUsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuICAgICAgICBnbC5lbmFibGUoZ2wuU0NJU1NPUl9URVNUKTtcbiAgICAgICAgcmV0dXJuIGdsO1xuICAgIH1cbiAgICBfbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbih4LCB5KSB7XG4gICAgICAgIHJldHVybiBbTWF0aC5mbG9vcih4IC8gdGhpcy5fb3B0aW9ucy50aWxlV2lkdGgpLCBNYXRoLmZsb29yKHkgLyB0aGlzLl9vcHRpb25zLnRpbGVIZWlnaHQpXTtcbiAgICB9XG4gICAgX3VwZGF0ZVNpemUoKSB7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9vcHRpb25zO1xuICAgICAgICBjb25zdCBjYW52YXNTaXplID0gW29wdHMud2lkdGggKiBvcHRzLnRpbGVXaWR0aCwgb3B0cy5oZWlnaHQgKiBvcHRzLnRpbGVIZWlnaHRdO1xuICAgICAgICBnbC5jYW52YXMud2lkdGggPSBjYW52YXNTaXplWzBdO1xuICAgICAgICBnbC5jYW52YXMuaGVpZ2h0ID0gY2FudmFzU2l6ZVsxXTtcbiAgICAgICAgZ2wudmlld3BvcnQoMCwgMCwgY2FudmFzU2l6ZVswXSwgY2FudmFzU2l6ZVsxXSk7XG4gICAgICAgIGdsLnVuaWZvcm0yZnYodGhpcy5fdW5pZm9ybXNbXCJ0aWxlU2l6ZVwiXSwgW29wdHMudGlsZVdpZHRoLCBvcHRzLnRpbGVIZWlnaHRdKTtcbiAgICAgICAgZ2wudW5pZm9ybTJmdih0aGlzLl91bmlmb3Jtc1tcInRhcmdldFNpemVcIl0sIGNhbnZhc1NpemUpO1xuICAgIH1cbiAgICBfdXBkYXRlVGV4dHVyZSh0aWxlU2V0KSB7XG4gICAgICAgIGNyZWF0ZVRleHR1cmUodGhpcy5fZ2wsIHRpbGVTZXQpO1xuICAgIH1cbn1cbmNvbnN0IFVOSUZPUk1TID0gW1widGFyZ2V0UG9zUmVsXCIsIFwidGlsZXNldFBvc0Fic1wiLCBcInRpbGVTaXplXCIsIFwidGFyZ2V0U2l6ZVwiLCBcImNvbG9yaXplXCIsIFwiYmdcIiwgXCJ0aW50XCJdO1xuY29uc3QgVlMgPSBgXG4jdmVyc2lvbiAzMDAgZXNcblxuaW4gdmVjMiB0aWxlUG9zUmVsO1xub3V0IHZlYzIgdGlsZXNldFBvc1B4O1xuXG51bmlmb3JtIHZlYzIgdGlsZXNldFBvc0FicztcbnVuaWZvcm0gdmVjMiB0aWxlU2l6ZTtcbnVuaWZvcm0gdmVjMiB0YXJnZXRTaXplO1xudW5pZm9ybSB2ZWMyIHRhcmdldFBvc1JlbDtcblxudm9pZCBtYWluKCkge1xuXHR2ZWMyIHRhcmdldFBvc1B4ID0gKHRhcmdldFBvc1JlbCArIHRpbGVQb3NSZWwpICogdGlsZVNpemU7XG5cdHZlYzIgdGFyZ2V0UG9zTmRjID0gKCh0YXJnZXRQb3NQeCAvIHRhcmdldFNpemUpLTAuNSkqMi4wO1xuXHR0YXJnZXRQb3NOZGMueSAqPSAtMS4wO1xuXG5cdGdsX1Bvc2l0aW9uID0gdmVjNCh0YXJnZXRQb3NOZGMsIDAuMCwgMS4wKTtcblx0dGlsZXNldFBvc1B4ID0gdGlsZXNldFBvc0FicyArIHRpbGVQb3NSZWwgKiB0aWxlU2l6ZTtcbn1gLnRyaW0oKTtcbmNvbnN0IEZTID0gYFxuI3ZlcnNpb24gMzAwIGVzXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG5cbmluIHZlYzIgdGlsZXNldFBvc1B4O1xub3V0IHZlYzQgZnJhZ0NvbG9yO1xudW5pZm9ybSBzYW1wbGVyMkQgaW1hZ2U7XG51bmlmb3JtIGJvb2wgY29sb3JpemU7XG51bmlmb3JtIHZlYzQgYmc7XG51bmlmb3JtIHZlYzQgdGludDtcblxudm9pZCBtYWluKCkge1xuXHRmcmFnQ29sb3IgPSB2ZWM0KDAsIDAsIDAsIDEpO1xuXG5cdHZlYzQgdGV4ZWwgPSB0ZXhlbEZldGNoKGltYWdlLCBpdmVjMih0aWxlc2V0UG9zUHgpLCAwKTtcblxuXHRpZiAoY29sb3JpemUpIHtcblx0XHR0ZXhlbC5yZ2IgPSB0aW50LmEgKiB0aW50LnJnYiArICgxLjAtdGludC5hKSAqIHRleGVsLnJnYjtcblx0XHRmcmFnQ29sb3IucmdiID0gdGV4ZWwuYSp0ZXhlbC5yZ2IgKyAoMS4wLXRleGVsLmEpKmJnLnJnYjtcblx0XHRmcmFnQ29sb3IuYSA9IHRleGVsLmEgKyAoMS4wLXRleGVsLmEpKmJnLmE7XG5cdH0gZWxzZSB7XG5cdFx0ZnJhZ0NvbG9yID0gdGV4ZWw7XG5cdH1cbn1gLnRyaW0oKTtcbmZ1bmN0aW9uIGNyZWF0ZVByb2dyYW0oZ2wsIHZzcywgZnNzKSB7XG4gICAgY29uc3QgdnMgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgZ2wuc2hhZGVyU291cmNlKHZzLCB2c3MpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIodnMpO1xuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHZzLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFNoYWRlckluZm9Mb2codnMpIHx8IFwiXCIpO1xuICAgIH1cbiAgICBjb25zdCBmcyA9IGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpO1xuICAgIGdsLnNoYWRlclNvdXJjZShmcywgZnNzKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKGZzKTtcbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihmcywgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihnbC5nZXRTaGFkZXJJbmZvTG9nKGZzKSB8fCBcIlwiKTtcbiAgICB9XG4gICAgY29uc3QgcCA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocCwgdnMpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwLCBmcyk7XG4gICAgZ2wubGlua1Byb2dyYW0ocCk7XG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHAsIGdsLkxJTktfU1RBVFVTKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocCkgfHwgXCJcIik7XG4gICAgfVxuICAgIHJldHVybiBwO1xufVxuZnVuY3Rpb24gY3JlYXRlUXVhZChnbCkge1xuICAgIGNvbnN0IHBvcyA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDEsIDAsIDAsIDEsIDEsIDFdKTtcbiAgICBjb25zdCBidWYgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgcG9zLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoMCk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcigwLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xufVxuZnVuY3Rpb24gY3JlYXRlVGV4dHVyZShnbCwgZGF0YSkge1xuICAgIGxldCB0ID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHQpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuUkVQRUFUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5SRVBFQVQpO1xuICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19GTElQX1lfV0VCR0wsIDApO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgZGF0YSk7XG4gICAgcmV0dXJuIHQ7XG59XG5sZXQgY29sb3JDYWNoZSA9IHt9O1xuZnVuY3Rpb24gcGFyc2VDb2xvcihjb2xvcikge1xuICAgIGlmICghKGNvbG9yIGluIGNvbG9yQ2FjaGUpKSB7XG4gICAgICAgIGxldCBwYXJzZWQ7XG4gICAgICAgIGlmIChjb2xvciA9PSBcInRyYW5zcGFyZW50XCIpIHtcbiAgICAgICAgICAgIHBhcnNlZCA9IFswLCAwLCAwLCAwXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2xvci5pbmRleE9mKFwicmdiYVwiKSA+IC0xKSB7XG4gICAgICAgICAgICBwYXJzZWQgPSAoY29sb3IubWF0Y2goL1tcXGQuXSsvZykgfHwgW10pLm1hcChOdW1iZXIpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwYXJzZWRbaV0gPSBwYXJzZWRbaV0gLyAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJzZWQgPSBDb2xvci5mcm9tU3RyaW5nKGNvbG9yKS5tYXAoJCA9PiAkIC8gMjU1KTtcbiAgICAgICAgICAgIHBhcnNlZC5wdXNoKDEpO1xuICAgICAgICB9XG4gICAgICAgIGNvbG9yQ2FjaGVbY29sb3JdID0gcGFyc2VkO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3JDYWNoZVtjb2xvcl07XG59XG4iLCJpbXBvcnQgQ2FudmFzIGZyb20gXCIuL2NhbnZhcy5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgVGlsZSBiYWNrZW5kXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWxlIGV4dGVuZHMgQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fY29sb3JDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIH1cbiAgICBkcmF3KGRhdGEsIGNsZWFyQmVmb3JlKSB7XG4gICAgICAgIGxldCBbeCwgeSwgY2gsIGZnLCBiZ10gPSBkYXRhO1xuICAgICAgICBsZXQgdGlsZVdpZHRoID0gdGhpcy5fb3B0aW9ucy50aWxlV2lkdGg7XG4gICAgICAgIGxldCB0aWxlSGVpZ2h0ID0gdGhpcy5fb3B0aW9ucy50aWxlSGVpZ2h0O1xuICAgICAgICBpZiAoY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRpbGVDb2xvcml6ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5jbGVhclJlY3QoeCAqIHRpbGVXaWR0aCwgeSAqIHRpbGVIZWlnaHQsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gYmc7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxSZWN0KHggKiB0aWxlV2lkdGgsIHkgKiB0aWxlSGVpZ2h0LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY2gpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2hhcnMgPSBbXS5jb25jYXQoY2gpO1xuICAgICAgICBsZXQgZmdzID0gW10uY29uY2F0KGZnKTtcbiAgICAgICAgbGV0IGJncyA9IFtdLmNvbmNhdChiZyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0aWxlID0gdGhpcy5fb3B0aW9ucy50aWxlTWFwW2NoYXJzW2ldXTtcbiAgICAgICAgICAgIGlmICghdGlsZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2hhciBcIiR7Y2hhcnNbaV19XCIgbm90IGZvdW5kIGluIHRpbGVNYXBgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRpbGVDb2xvcml6ZSkgeyAvLyBhcHBseSBjb2xvcml6YXRpb25cbiAgICAgICAgICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5fY29sb3JDYW52YXM7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgbGV0IGZnID0gZmdzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBiZyA9IGJnc1tpXTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLl9vcHRpb25zLnRpbGVTZXQsIHRpbGVbMF0sIHRpbGVbMV0sIHRpbGVXaWR0aCwgdGlsZUhlaWdodCwgMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBpZiAoZmcgIT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZmc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2UtYXRvcFwiO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChiZyAhPSBcInRyYW5zcGFyZW50XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBiZztcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImRlc3RpbmF0aW9uLW92ZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9jdHguZHJhd0ltYWdlKGNhbnZhcywgeCAqIHRpbGVXaWR0aCwgeSAqIHRpbGVIZWlnaHQsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLy8gbm8gY29sb3JpemluZywgZWFzeVxuICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5kcmF3SW1hZ2UodGhpcy5fb3B0aW9ucy50aWxlU2V0LCB0aWxlWzBdLCB0aWxlWzFdLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQsIHggKiB0aWxlV2lkdGgsIHkgKiB0aWxlSGVpZ2h0LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXB1dGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgIGxldCB3aWR0aCA9IE1hdGguZmxvb3IoYXZhaWxXaWR0aCAvIHRoaXMuX29wdGlvbnMudGlsZVdpZHRoKTtcbiAgICAgICAgbGV0IGhlaWdodCA9IE1hdGguZmxvb3IoYXZhaWxIZWlnaHQgLyB0aGlzLl9vcHRpb25zLnRpbGVIZWlnaHQpO1xuICAgICAgICByZXR1cm4gW3dpZHRoLCBoZWlnaHRdO1xuICAgIH1cbiAgICBjb21wdXRlRm9udFNpemUoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRpbGUgYmFja2VuZCBkb2VzIG5vdCB1bmRlcnN0YW5kIGZvbnQgc2l6ZVwiKTtcbiAgICB9XG4gICAgX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24oeCwgeSkge1xuICAgICAgICByZXR1cm4gW01hdGguZmxvb3IoeCAvIHRoaXMuX29wdGlvbnMudGlsZVdpZHRoKSwgTWF0aC5mbG9vcih5IC8gdGhpcy5fb3B0aW9ucy50aWxlSGVpZ2h0KV07XG4gICAgfVxuICAgIF91cGRhdGVTaXplKCkge1xuICAgICAgICBjb25zdCBvcHRzID0gdGhpcy5fb3B0aW9ucztcbiAgICAgICAgdGhpcy5fY3R4LmNhbnZhcy53aWR0aCA9IG9wdHMud2lkdGggKiBvcHRzLnRpbGVXaWR0aDtcbiAgICAgICAgdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQgPSBvcHRzLmhlaWdodCAqIG9wdHMudGlsZUhlaWdodDtcbiAgICAgICAgdGhpcy5fY29sb3JDYW52YXMud2lkdGggPSBvcHRzLnRpbGVXaWR0aDtcbiAgICAgICAgdGhpcy5fY29sb3JDYW52YXMuaGVpZ2h0ID0gb3B0cy50aWxlSGVpZ2h0O1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzIEFzeW5jaHJvbm91cyBtYWluIGxvb3BcbiAqIEBwYXJhbSB7Uk9ULlNjaGVkdWxlcn0gc2NoZWR1bGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZ2luZSB7XG4gICAgY29uc3RydWN0b3Ioc2NoZWR1bGVyKSB7XG4gICAgICAgIHRoaXMuX3NjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICAgICAgdGhpcy5fbG9jayA9IDE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0IHRoZSBtYWluIGxvb3AuIFdoZW4gdGhpcyBjYWxsIHJldHVybnMsIHRoZSBsb29wIGlzIGxvY2tlZC5cbiAgICAgKi9cbiAgICBzdGFydCgpIHsgcmV0dXJuIHRoaXMudW5sb2NrKCk7IH1cbiAgICAvKipcbiAgICAgKiBJbnRlcnJ1cHQgdGhlIGVuZ2luZSBieSBhbiBhc3luY2hyb25vdXMgYWN0aW9uXG4gICAgICovXG4gICAgbG9jaygpIHtcbiAgICAgICAgdGhpcy5fbG9jaysrO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzdW1lIGV4ZWN1dGlvbiAocGF1c2VkIGJ5IGEgcHJldmlvdXMgbG9jaylcbiAgICAgKi9cbiAgICB1bmxvY2soKSB7XG4gICAgICAgIGlmICghdGhpcy5fbG9jaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHVubG9jayB1bmxvY2tlZCBlbmdpbmVcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9jay0tO1xuICAgICAgICB3aGlsZSAoIXRoaXMuX2xvY2spIHtcbiAgICAgICAgICAgIGxldCBhY3RvciA9IHRoaXMuX3NjaGVkdWxlci5uZXh0KCk7XG4gICAgICAgICAgICBpZiAoIWFjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jaygpO1xuICAgICAgICAgICAgfSAvKiBubyBhY3RvcnMgKi9cbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhY3Rvci5hY3QoKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LnRoZW4pIHsgLyogYWN0b3IgcmV0dXJuZWQgYSBcInRoZW5hYmxlXCIsIGxvb2tzIGxpa2UgYSBQcm9taXNlICovXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NrKCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnRoZW4odGhpcy51bmxvY2suYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTWluSGVhcCB9IGZyb20gXCIuL01pbkhlYXAuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50UXVldWUge1xuICAgIC8qKlxuICAgICAqIEBjbGFzcyBHZW5lcmljIGV2ZW50IHF1ZXVlOiBzdG9yZXMgZXZlbnRzIGFuZCByZXRyaWV2ZXMgdGhlbSBiYXNlZCBvbiB0aGVpciB0aW1lXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3RpbWUgPSAwO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBuZXcgTWluSGVhcCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBFbGFwc2VkIHRpbWVcbiAgICAgKi9cbiAgICBnZXRUaW1lKCkgeyByZXR1cm4gdGhpcy5fdGltZTsgfVxuICAgIC8qKlxuICAgICAqIENsZWFyIGFsbCBzY2hlZHVsZWQgZXZlbnRzXG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBNaW5IZWFwKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGV2ZW50XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVcbiAgICAgKi9cbiAgICBhZGQoZXZlbnQsIHRpbWUpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzLnB1c2goZXZlbnQsIHRpbWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb2NhdGVzIHRoZSBuZWFyZXN0IGV2ZW50LCBhZHZhbmNlcyB0aW1lIGlmIG5lY2Vzc2FyeS4gUmV0dXJucyB0aGF0IGV2ZW50IGFuZCByZW1vdmVzIGl0IGZyb20gdGhlIHF1ZXVlLlxuICAgICAqIEByZXR1cm5zIHs/IHx8IG51bGx9IFRoZSBldmVudCBwcmV2aW91c2x5IGFkZGVkIGJ5IGFkZEV2ZW50LCBudWxsIGlmIG5vIGV2ZW50IGF2YWlsYWJsZVxuICAgICAqL1xuICAgIGdldCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9ldmVudHMubGVuKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCB7IGtleTogdGltZSwgdmFsdWU6IGV2ZW50IH0gPSB0aGlzLl9ldmVudHMucG9wKCk7XG4gICAgICAgIGlmICh0aW1lID4gMCkgeyAvKiBhZHZhbmNlICovXG4gICAgICAgICAgICB0aGlzLl90aW1lICs9IHRpbWU7XG4gICAgICAgICAgICB0aGlzLl9ldmVudHMuc2hpZnQoLXRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0aW1lIGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gZXZlbnRcbiAgICAgKiBAcGFyYW0gez99IGV2ZW50XG4gICAgICogQHJldHVybnMge251bWJlcn0gdGltZVxuICAgICAqL1xuICAgIGdldEV2ZW50VGltZShldmVudCkge1xuICAgICAgICBjb25zdCByID0gdGhpcy5fZXZlbnRzLmZpbmQoZXZlbnQpO1xuICAgICAgICBpZiAocikge1xuICAgICAgICAgICAgY29uc3QgeyBrZXkgfSA9IHI7XG4gICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbiBldmVudCBmcm9tIHRoZSBxdWV1ZVxuICAgICAqIEBwYXJhbSB7P30gZXZlbnRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbH0gc3VjY2Vzcz9cbiAgICAgKi9cbiAgICByZW1vdmUoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cy5yZW1vdmUoZXZlbnQpO1xuICAgIH1cbiAgICA7XG59XG4iLCJpbXBvcnQgRk9WIGZyb20gXCIuL2Zvdi5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgRGlzY3JldGUgc2hhZG93Y2FzdGluZyBhbGdvcml0aG0uIE9ic29sZXRlZCBieSBQcmVjaXNlIHNoYWRvd2Nhc3RpbmcuXG4gKiBAYXVnbWVudHMgUk9ULkZPVlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNjcmV0ZVNoYWRvd2Nhc3RpbmcgZXh0ZW5kcyBGT1Yge1xuICAgIGNvbXB1dGUoeCwgeSwgUiwgY2FsbGJhY2spIHtcbiAgICAgICAgLyogdGhpcyBwbGFjZSBpcyBhbHdheXMgdmlzaWJsZSAqL1xuICAgICAgICBjYWxsYmFjayh4LCB5LCAwLCAxKTtcbiAgICAgICAgLyogc3RhbmRpbmcgaW4gYSBkYXJrIHBsYWNlLiBGSVhNRSBpcyB0aGlzIGEgZ29vZCBpZGVhPyAgKi9cbiAgICAgICAgaWYgKCF0aGlzLl9saWdodFBhc3Nlcyh4LCB5KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8qIHN0YXJ0IGFuZCBlbmQgYW5nbGVzICovXG4gICAgICAgIGxldCBEQVRBID0gW107XG4gICAgICAgIGxldCBBLCBCLCBjeCwgY3ksIGJsb2NrcztcbiAgICAgICAgLyogYW5hbHl6ZSBzdXJyb3VuZGluZyBjZWxscyBpbiBjb25jZW50cmljIHJpbmdzLCBzdGFydGluZyBmcm9tIHRoZSBjZW50ZXIgKi9cbiAgICAgICAgZm9yIChsZXQgciA9IDE7IHIgPD0gUjsgcisrKSB7XG4gICAgICAgICAgICBsZXQgbmVpZ2hib3JzID0gdGhpcy5fZ2V0Q2lyY2xlKHgsIHksIHIpO1xuICAgICAgICAgICAgbGV0IGFuZ2xlID0gMzYwIC8gbmVpZ2hib3JzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmVpZ2hib3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY3ggPSBuZWlnaGJvcnNbaV1bMF07XG4gICAgICAgICAgICAgICAgY3kgPSBuZWlnaGJvcnNbaV1bMV07XG4gICAgICAgICAgICAgICAgQSA9IGFuZ2xlICogKGkgLSAwLjUpO1xuICAgICAgICAgICAgICAgIEIgPSBBICsgYW5nbGU7XG4gICAgICAgICAgICAgICAgYmxvY2tzID0gIXRoaXMuX2xpZ2h0UGFzc2VzKGN4LCBjeSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Zpc2libGVDb29yZHMoTWF0aC5mbG9vcihBKSwgTWF0aC5jZWlsKEIpLCBibG9ja3MsIERBVEEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGN4LCBjeSwgciwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChEQVRBLmxlbmd0aCA9PSAyICYmIERBVEFbMF0gPT0gMCAmJiBEQVRBWzFdID09IDM2MCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSAvKiBjdXRvZmY/ICovXG4gICAgICAgICAgICB9IC8qIGZvciBhbGwgY2VsbHMgaW4gdGhpcyByaW5nICovXG4gICAgICAgIH0gLyogZm9yIGFsbCByaW5ncyAqL1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ludH0gQSBzdGFydCBhbmdsZVxuICAgICAqIEBwYXJhbSB7aW50fSBCIGVuZCBhbmdsZVxuICAgICAqIEBwYXJhbSB7Ym9vbH0gYmxvY2tzIERvZXMgY3VycmVudCBjZWxsIGJsb2NrIHZpc2liaWxpdHk/XG4gICAgICogQHBhcmFtIHtpbnRbXVtdfSBEQVRBIHNoYWRvd2VkIGFuZ2xlIHBhaXJzXG4gICAgICovXG4gICAgX3Zpc2libGVDb29yZHMoQSwgQiwgYmxvY2tzLCBEQVRBKSB7XG4gICAgICAgIGlmIChBIDwgMCkge1xuICAgICAgICAgICAgbGV0IHYxID0gdGhpcy5fdmlzaWJsZUNvb3JkcygwLCBCLCBibG9ja3MsIERBVEEpO1xuICAgICAgICAgICAgbGV0IHYyID0gdGhpcy5fdmlzaWJsZUNvb3JkcygzNjAgKyBBLCAzNjAsIGJsb2NrcywgREFUQSk7XG4gICAgICAgICAgICByZXR1cm4gdjEgfHwgdjI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgREFUQS5sZW5ndGggJiYgREFUQVtpbmRleF0gPCBBKSB7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PSBEQVRBLmxlbmd0aCkgeyAvKiBjb21wbGV0ZWx5IG5ldyBzaGFkb3cgKi9cbiAgICAgICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICAgICAgICBEQVRBLnB1c2goQSwgQik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBpZiAoaW5kZXggJSAyKSB7IC8qIHRoaXMgc2hhZG93IHN0YXJ0cyBpbiBhbiBleGlzdGluZyBzaGFkb3csIG9yIHdpdGhpbiBpdHMgZW5kaW5nIGJvdW5kYXJ5ICovXG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPCBEQVRBLmxlbmd0aCAmJiBEQVRBW2luZGV4XSA8IEIpIHtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY291bnQgPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgJSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIERBVEEuc3BsaWNlKGluZGV4IC0gY291bnQsIGNvdW50LCBCKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIERBVEEuc3BsaWNlKGluZGV4IC0gY291bnQsIGNvdW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLyogdGhpcyBzaGFkb3cgc3RhcnRzIG91dHNpZGUgYW4gZXhpc3Rpbmcgc2hhZG93LCBvciB3aXRoaW4gYSBzdGFydGluZyBib3VuZGFyeSAqL1xuICAgICAgICAgICAgd2hpbGUgKGluZGV4IDwgREFUQS5sZW5ndGggJiYgREFUQVtpbmRleF0gPCBCKSB7XG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyogdmlzaWJsZSB3aGVuIG91dHNpZGUgYW4gZXhpc3Rpbmcgc2hhZG93LCBvciB3aGVuIG92ZXJsYXBwaW5nICovXG4gICAgICAgICAgICBpZiAoQSA9PSBEQVRBW2luZGV4IC0gY291bnRdICYmIGNvdW50ID09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ICUgMikge1xuICAgICAgICAgICAgICAgICAgICBEQVRBLnNwbGljZShpbmRleCAtIGNvdW50LCBjb3VudCwgQSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBEQVRBLnNwbGljZShpbmRleCAtIGNvdW50LCBjb3VudCwgQSwgQik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBESVJTIH0gZnJvbSBcIi4uL2NvbnN0YW50cy5qc1wiO1xuO1xuO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRk9WIHtcbiAgICAvKipcbiAgICAgKiBAY2xhc3MgQWJzdHJhY3QgRk9WIGFsZ29yaXRobVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpZ2h0UGFzc2VzQ2FsbGJhY2sgRG9lcyB0aGUgbGlnaHQgcGFzcyB0aHJvdWdoIHgseT9cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAgICogQHBhcmFtIHtpbnR9IFtvcHRpb25zLnRvcG9sb2d5PThdIDQvNi84XG4gICAgICovXG4gICAgY29uc3RydWN0b3IobGlnaHRQYXNzZXNDYWxsYmFjaywgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX2xpZ2h0UGFzc2VzID0gbGlnaHRQYXNzZXNDYWxsYmFjaztcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oeyB0b3BvbG9neTogOCB9LCBvcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFsbCBuZWlnaGJvcnMgaW4gYSBjb25jZW50cmljIHJpbmdcbiAgICAgKiBAcGFyYW0ge2ludH0gY3ggY2VudGVyLXhcbiAgICAgKiBAcGFyYW0ge2ludH0gY3kgY2VudGVyLXlcbiAgICAgKiBAcGFyYW0ge2ludH0gciByYW5nZVxuICAgICAqL1xuICAgIF9nZXRDaXJjbGUoY3gsIGN5LCByKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IGRpcnMsIGNvdW50RmFjdG9yLCBzdGFydE9mZnNldDtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5KSB7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgY291bnRGYWN0b3IgPSAxO1xuICAgICAgICAgICAgICAgIHN0YXJ0T2Zmc2V0ID0gWzAsIDFdO1xuICAgICAgICAgICAgICAgIGRpcnMgPSBbXG4gICAgICAgICAgICAgICAgICAgIERJUlNbOF1bN10sXG4gICAgICAgICAgICAgICAgICAgIERJUlNbOF1bMV0sXG4gICAgICAgICAgICAgICAgICAgIERJUlNbOF1bM10sXG4gICAgICAgICAgICAgICAgICAgIERJUlNbOF1bNV1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIGRpcnMgPSBESVJTWzZdO1xuICAgICAgICAgICAgICAgIGNvdW50RmFjdG9yID0gMTtcbiAgICAgICAgICAgICAgICBzdGFydE9mZnNldCA9IFstMSwgMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgZGlycyA9IERJUlNbNF07XG4gICAgICAgICAgICAgICAgY291bnRGYWN0b3IgPSAyO1xuICAgICAgICAgICAgICAgIHN0YXJ0T2Zmc2V0ID0gWy0xLCAxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW5jb3JyZWN0IHRvcG9sb2d5IGZvciBGT1YgY29tcHV0YXRpb25cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLyogc3RhcnRpbmcgbmVpZ2hib3IgKi9cbiAgICAgICAgbGV0IHggPSBjeCArIHN0YXJ0T2Zmc2V0WzBdICogcjtcbiAgICAgICAgbGV0IHkgPSBjeSArIHN0YXJ0T2Zmc2V0WzFdICogcjtcbiAgICAgICAgLyogY2lyY2xlICovXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByICogY291bnRGYWN0b3I7IGorKykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFt4LCB5XSk7XG4gICAgICAgICAgICAgICAgeCArPSBkaXJzW2ldWzBdO1xuICAgICAgICAgICAgICAgIHkgKz0gZGlyc1tpXVsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsImltcG9ydCBEaXNjcmV0ZVNoYWRvd2Nhc3RpbmcgZnJvbSBcIi4vZGlzY3JldGUtc2hhZG93Y2FzdGluZy5qc1wiO1xuaW1wb3J0IFByZWNpc2VTaGFkb3djYXN0aW5nIGZyb20gXCIuL3ByZWNpc2Utc2hhZG93Y2FzdGluZy5qc1wiO1xuaW1wb3J0IFJlY3Vyc2l2ZVNoYWRvd2Nhc3RpbmcgZnJvbSBcIi4vcmVjdXJzaXZlLXNoYWRvd2Nhc3RpbmcuanNcIjtcbmV4cG9ydCBkZWZhdWx0IHsgRGlzY3JldGVTaGFkb3djYXN0aW5nLCBQcmVjaXNlU2hhZG93Y2FzdGluZywgUmVjdXJzaXZlU2hhZG93Y2FzdGluZyB9O1xuIiwiaW1wb3J0IEZPViBmcm9tIFwiLi9mb3YuanNcIjtcbi8qKlxuICogQGNsYXNzIFByZWNpc2Ugc2hhZG93Y2FzdGluZyBhbGdvcml0aG1cbiAqIEBhdWdtZW50cyBST1QuRk9WXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZWNpc2VTaGFkb3djYXN0aW5nIGV4dGVuZHMgRk9WIHtcbiAgICBjb21wdXRlKHgsIHksIFIsIGNhbGxiYWNrKSB7XG4gICAgICAgIC8qIHRoaXMgcGxhY2UgaXMgYWx3YXlzIHZpc2libGUgKi9cbiAgICAgICAgY2FsbGJhY2soeCwgeSwgMCwgMSk7XG4gICAgICAgIC8qIHN0YW5kaW5nIGluIGEgZGFyayBwbGFjZS4gRklYTUUgaXMgdGhpcyBhIGdvb2QgaWRlYT8gICovXG4gICAgICAgIGlmICghdGhpcy5fbGlnaHRQYXNzZXMoeCwgeSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvKiBsaXN0IG9mIGFsbCBzaGFkb3dzICovXG4gICAgICAgIGxldCBTSEFET1dTID0gW107XG4gICAgICAgIGxldCBjeCwgY3ksIGJsb2NrcywgQTEsIEEyLCB2aXNpYmlsaXR5O1xuICAgICAgICAvKiBhbmFseXplIHN1cnJvdW5kaW5nIGNlbGxzIGluIGNvbmNlbnRyaWMgcmluZ3MsIHN0YXJ0aW5nIGZyb20gdGhlIGNlbnRlciAqL1xuICAgICAgICBmb3IgKGxldCByID0gMTsgciA8PSBSOyByKyspIHtcbiAgICAgICAgICAgIGxldCBuZWlnaGJvcnMgPSB0aGlzLl9nZXRDaXJjbGUoeCwgeSwgcik7XG4gICAgICAgICAgICBsZXQgbmVpZ2hib3JDb3VudCA9IG5laWdoYm9ycy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5laWdoYm9yQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGN4ID0gbmVpZ2hib3JzW2ldWzBdO1xuICAgICAgICAgICAgICAgIGN5ID0gbmVpZ2hib3JzW2ldWzFdO1xuICAgICAgICAgICAgICAgIC8qIHNoaWZ0IGhhbGYtYW4tYW5nbGUgYmFja3dhcmRzIHRvIG1haW50YWluIGNvbnNpc3RlbmN5IG9mIDAtdGggY2VsbHMgKi9cbiAgICAgICAgICAgICAgICBBMSA9IFtpID8gMiAqIGkgLSAxIDogMiAqIG5laWdoYm9yQ291bnQgLSAxLCAyICogbmVpZ2hib3JDb3VudF07XG4gICAgICAgICAgICAgICAgQTIgPSBbMiAqIGkgKyAxLCAyICogbmVpZ2hib3JDb3VudF07XG4gICAgICAgICAgICAgICAgYmxvY2tzID0gIXRoaXMuX2xpZ2h0UGFzc2VzKGN4LCBjeSk7XG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eSA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShBMSwgQTIsIGJsb2NrcywgU0hBRE9XUyk7XG4gICAgICAgICAgICAgICAgaWYgKHZpc2liaWxpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soY3gsIGN5LCByLCB2aXNpYmlsaXR5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKFNIQURPV1MubGVuZ3RoID09IDIgJiYgU0hBRE9XU1swXVswXSA9PSAwICYmIFNIQURPV1NbMV1bMF0gPT0gU0hBRE9XU1sxXVsxXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSAvKiBjdXRvZmY/ICovXG4gICAgICAgICAgICB9IC8qIGZvciBhbGwgY2VsbHMgaW4gdGhpcyByaW5nICovXG4gICAgICAgIH0gLyogZm9yIGFsbCByaW5ncyAqL1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ludFsyXX0gQTEgYXJjIHN0YXJ0XG4gICAgICogQHBhcmFtIHtpbnRbMl19IEEyIGFyYyBlbmRcbiAgICAgKiBAcGFyYW0ge2Jvb2x9IGJsb2NrcyBEb2VzIGN1cnJlbnQgYXJjIGJsb2NrIHZpc2liaWxpdHk/XG4gICAgICogQHBhcmFtIHtpbnRbXVtdfSBTSEFET1dTIGxpc3Qgb2YgYWN0aXZlIHNoYWRvd3NcbiAgICAgKi9cbiAgICBfY2hlY2tWaXNpYmlsaXR5KEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKSB7XG4gICAgICAgIGlmIChBMVswXSA+IEEyWzBdKSB7IC8qIHNwbGl0IGludG8gdHdvIHN1Yi1hcmNzICovXG4gICAgICAgICAgICBsZXQgdjEgPSB0aGlzLl9jaGVja1Zpc2liaWxpdHkoQTEsIFtBMVsxXSwgQTFbMV1dLCBibG9ja3MsIFNIQURPV1MpO1xuICAgICAgICAgICAgbGV0IHYyID0gdGhpcy5fY2hlY2tWaXNpYmlsaXR5KFswLCAxXSwgQTIsIGJsb2NrcywgU0hBRE9XUyk7XG4gICAgICAgICAgICByZXR1cm4gKHYxICsgdjIpIC8gMjtcbiAgICAgICAgfVxuICAgICAgICAvKiBpbmRleDE6IGZpcnN0IHNoYWRvdyA+PSBBMSAqL1xuICAgICAgICBsZXQgaW5kZXgxID0gMCwgZWRnZTEgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKGluZGV4MSA8IFNIQURPV1MubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgb2xkID0gU0hBRE9XU1tpbmRleDFdO1xuICAgICAgICAgICAgbGV0IGRpZmYgPSBvbGRbMF0gKiBBMVsxXSAtIEExWzBdICogb2xkWzFdO1xuICAgICAgICAgICAgaWYgKGRpZmYgPj0gMCkgeyAvKiBvbGQgPj0gQTEgKi9cbiAgICAgICAgICAgICAgICBpZiAoZGlmZiA9PSAwICYmICEoaW5kZXgxICUgMikpIHtcbiAgICAgICAgICAgICAgICAgICAgZWRnZTEgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4MSsrO1xuICAgICAgICB9XG4gICAgICAgIC8qIGluZGV4MjogbGFzdCBzaGFkb3cgPD0gQTIgKi9cbiAgICAgICAgbGV0IGluZGV4MiA9IFNIQURPV1MubGVuZ3RoLCBlZGdlMiA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAoaW5kZXgyLS0pIHtcbiAgICAgICAgICAgIGxldCBvbGQgPSBTSEFET1dTW2luZGV4Ml07XG4gICAgICAgICAgICBsZXQgZGlmZiA9IEEyWzBdICogb2xkWzFdIC0gb2xkWzBdICogQTJbMV07XG4gICAgICAgICAgICBpZiAoZGlmZiA+PSAwKSB7IC8qIG9sZCA8PSBBMiAqL1xuICAgICAgICAgICAgICAgIGlmIChkaWZmID09IDAgJiYgKGluZGV4MiAlIDIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVkZ2UyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZpc2libGUgPSB0cnVlO1xuICAgICAgICBpZiAoaW5kZXgxID09IGluZGV4MiAmJiAoZWRnZTEgfHwgZWRnZTIpKSB7IC8qIHN1YnNldCBvZiBleGlzdGluZyBzaGFkb3csIG9uZSBvZiB0aGUgZWRnZXMgbWF0Y2ggKi9cbiAgICAgICAgICAgIHZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlZGdlMSAmJiBlZGdlMiAmJiBpbmRleDEgKyAxID09IGluZGV4MiAmJiAoaW5kZXgyICUgMikpIHsgLyogY29tcGxldGVseSBlcXVpdmFsZW50IHdpdGggZXhpc3Rpbmcgc2hhZG93ICovXG4gICAgICAgICAgICB2aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXgxID4gaW5kZXgyICYmIChpbmRleDEgJSAyKSkgeyAvKiBzdWJzZXQgb2YgZXhpc3Rpbmcgc2hhZG93LCBub3QgdG91Y2hpbmcgKi9cbiAgICAgICAgICAgIHZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXZpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9IC8qIGZhc3QgY2FzZTogbm90IHZpc2libGUgKi9cbiAgICAgICAgbGV0IHZpc2libGVMZW5ndGg7XG4gICAgICAgIC8qIGNvbXB1dGUgdGhlIGxlbmd0aCBvZiB2aXNpYmxlIGFyYywgYWRqdXN0IGxpc3Qgb2Ygc2hhZG93cyAoaWYgYmxvY2tpbmcpICovXG4gICAgICAgIGxldCByZW1vdmUgPSBpbmRleDIgLSBpbmRleDEgKyAxO1xuICAgICAgICBpZiAocmVtb3ZlICUgMikge1xuICAgICAgICAgICAgaWYgKGluZGV4MSAlIDIpIHsgLyogZmlyc3QgZWRnZSB3aXRoaW4gZXhpc3Rpbmcgc2hhZG93LCBzZWNvbmQgb3V0c2lkZSAqL1xuICAgICAgICAgICAgICAgIGxldCBQID0gU0hBRE9XU1tpbmRleDFdO1xuICAgICAgICAgICAgICAgIHZpc2libGVMZW5ndGggPSAoQTJbMF0gKiBQWzFdIC0gUFswXSAqIEEyWzFdKSAvIChQWzFdICogQTJbMV0pO1xuICAgICAgICAgICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICAgICAgICAgICAgU0hBRE9XUy5zcGxpY2UoaW5kZXgxLCByZW1vdmUsIEEyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLyogc2Vjb25kIGVkZ2Ugd2l0aGluIGV4aXN0aW5nIHNoYWRvdywgZmlyc3Qgb3V0c2lkZSAqL1xuICAgICAgICAgICAgICAgIGxldCBQID0gU0hBRE9XU1tpbmRleDJdO1xuICAgICAgICAgICAgICAgIHZpc2libGVMZW5ndGggPSAoUFswXSAqIEExWzFdIC0gQTFbMF0gKiBQWzFdKSAvIChBMVsxXSAqIFBbMV0pO1xuICAgICAgICAgICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICAgICAgICAgICAgU0hBRE9XUy5zcGxpY2UoaW5kZXgxLCByZW1vdmUsIEExKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoaW5kZXgxICUgMikgeyAvKiBib3RoIGVkZ2VzIHdpdGhpbiBleGlzdGluZyBzaGFkb3dzICovXG4gICAgICAgICAgICAgICAgbGV0IFAxID0gU0hBRE9XU1tpbmRleDFdO1xuICAgICAgICAgICAgICAgIGxldCBQMiA9IFNIQURPV1NbaW5kZXgyXTtcbiAgICAgICAgICAgICAgICB2aXNpYmxlTGVuZ3RoID0gKFAyWzBdICogUDFbMV0gLSBQMVswXSAqIFAyWzFdKSAvIChQMVsxXSAqIFAyWzFdKTtcbiAgICAgICAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgICAgIFNIQURPV1Muc3BsaWNlKGluZGV4MSwgcmVtb3ZlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLyogYm90aCBlZGdlcyBvdXRzaWRlIGV4aXN0aW5nIHNoYWRvd3MgKi9cbiAgICAgICAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgICAgIFNIQURPV1Muc3BsaWNlKGluZGV4MSwgcmVtb3ZlLCBBMSwgQTIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gMTsgLyogd2hvbGUgYXJjIHZpc2libGUhICovXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGFyY0xlbmd0aCA9IChBMlswXSAqIEExWzFdIC0gQTFbMF0gKiBBMlsxXSkgLyAoQTFbMV0gKiBBMlsxXSk7XG4gICAgICAgIHJldHVybiB2aXNpYmxlTGVuZ3RoIC8gYXJjTGVuZ3RoO1xuICAgIH1cbn1cbiIsImltcG9ydCBGT1YgZnJvbSBcIi4vZm92LmpzXCI7XG4vKiogT2N0YW50cyB1c2VkIGZvciB0cmFuc2xhdGluZyByZWN1cnNpdmUgc2hhZG93Y2FzdGluZyBvZmZzZXRzICovXG5jb25zdCBPQ1RBTlRTID0gW1xuICAgIFstMSwgMCwgMCwgMV0sXG4gICAgWzAsIC0xLCAxLCAwXSxcbiAgICBbMCwgLTEsIC0xLCAwXSxcbiAgICBbLTEsIDAsIDAsIC0xXSxcbiAgICBbMSwgMCwgMCwgLTFdLFxuICAgIFswLCAxLCAtMSwgMF0sXG4gICAgWzAsIDEsIDEsIDBdLFxuICAgIFsxLCAwLCAwLCAxXVxuXTtcbi8qKlxuICogQGNsYXNzIFJlY3Vyc2l2ZSBzaGFkb3djYXN0aW5nIGFsZ29yaXRobVxuICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgNC84IHRvcG9sb2dpZXMsIG5vdCBoZXhhZ29uYWwuXG4gKiBCYXNlZCBvbiBQZXRlciBIYXJraW5zJyBpbXBsZW1lbnRhdGlvbiBvZiBCasO2cm4gQmVyZ3N0csO2bSdzIGFsZ29yaXRobSBkZXNjcmliZWQgaGVyZTogaHR0cDovL3d3dy5yb2d1ZWJhc2luLmNvbS9pbmRleC5waHA/dGl0bGU9Rk9WX3VzaW5nX3JlY3Vyc2l2ZV9zaGFkb3djYXN0aW5nXG4gKiBAYXVnbWVudHMgUk9ULkZPVlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN1cnNpdmVTaGFkb3djYXN0aW5nIGV4dGVuZHMgRk9WIHtcbiAgICAvKipcbiAgICAgKiBDb21wdXRlIHZpc2liaWxpdHkgZm9yIGEgMzYwLWRlZ3JlZSBjaXJjbGVcbiAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICogQHBhcmFtIHtpbnR9IFIgTWF4aW11bSB2aXNpYmlsaXR5IHJhZGl1c1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG4gICAgY29tcHV0ZSh4LCB5LCBSLCBjYWxsYmFjaykge1xuICAgICAgICAvL1lvdSBjYW4gYWx3YXlzIHNlZSB5b3VyIG93biB0aWxlXG4gICAgICAgIGNhbGxiYWNrKHgsIHksIDAsIDEpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9DVEFOVFMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlck9jdGFudCh4LCB5LCBPQ1RBTlRTW2ldLCBSLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSB2aXNpYmlsaXR5IGZvciBhIDE4MC1kZWdyZWUgYXJjXG4gICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAqIEBwYXJhbSB7aW50fSBSIE1heGltdW0gdmlzaWJpbGl0eSByYWRpdXNcbiAgICAgKiBAcGFyYW0ge2ludH0gZGlyIERpcmVjdGlvbiB0byBsb29rIGluIChleHByZXNzZWQgaW4gYSBST1QuRElSUyB2YWx1ZSk7XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBjb21wdXRlMTgwKHgsIHksIFIsIGRpciwgY2FsbGJhY2spIHtcbiAgICAgICAgLy9Zb3UgY2FuIGFsd2F5cyBzZWUgeW91ciBvd24gdGlsZVxuICAgICAgICBjYWxsYmFjayh4LCB5LCAwLCAxKTtcbiAgICAgICAgbGV0IHByZXZpb3VzT2N0YW50ID0gKGRpciAtIDEgKyA4KSAlIDg7IC8vTmVlZCB0byByZXRyaWV2ZSB0aGUgcHJldmlvdXMgb2N0YW50IHRvIHJlbmRlciBhIGZ1bGwgMTgwIGRlZ3JlZXNcbiAgICAgICAgbGV0IG5leHRQcmV2aW91c09jdGFudCA9IChkaXIgLSAyICsgOCkgJSA4OyAvL05lZWQgdG8gcmV0cmlldmUgdGhlIHByZXZpb3VzIHR3byBvY3RhbnRzIHRvIHJlbmRlciBhIGZ1bGwgMTgwIGRlZ3JlZXNcbiAgICAgICAgbGV0IG5leHRPY3RhbnQgPSAoZGlyICsgMSArIDgpICUgODsgLy9OZWVkIHRvIGdyYWIgdG8gbmV4dCBvY3RhbnQgdG8gcmVuZGVyIGEgZnVsbCAxODAgZGVncmVlc1xuICAgICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1tuZXh0UHJldmlvdXNPY3RhbnRdLCBSLCBjYWxsYmFjayk7XG4gICAgICAgIHRoaXMuX3JlbmRlck9jdGFudCh4LCB5LCBPQ1RBTlRTW3ByZXZpb3VzT2N0YW50XSwgUiwgY2FsbGJhY2spO1xuICAgICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1tkaXJdLCBSLCBjYWxsYmFjayk7XG4gICAgICAgIHRoaXMuX3JlbmRlck9jdGFudCh4LCB5LCBPQ1RBTlRTW25leHRPY3RhbnRdLCBSLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIDtcbiAgICAvKipcbiAgICAgKiBDb21wdXRlIHZpc2liaWxpdHkgZm9yIGEgOTAtZGVncmVlIGFyY1xuICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgKiBAcGFyYW0ge2ludH0gUiBNYXhpbXVtIHZpc2liaWxpdHkgcmFkaXVzXG4gICAgICogQHBhcmFtIHtpbnR9IGRpciBEaXJlY3Rpb24gdG8gbG9vayBpbiAoZXhwcmVzc2VkIGluIGEgUk9ULkRJUlMgdmFsdWUpO1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG4gICAgY29tcHV0ZTkwKHgsIHksIFIsIGRpciwgY2FsbGJhY2spIHtcbiAgICAgICAgLy9Zb3UgY2FuIGFsd2F5cyBzZWUgeW91ciBvd24gdGlsZVxuICAgICAgICBjYWxsYmFjayh4LCB5LCAwLCAxKTtcbiAgICAgICAgbGV0IHByZXZpb3VzT2N0YW50ID0gKGRpciAtIDEgKyA4KSAlIDg7IC8vTmVlZCB0byByZXRyaWV2ZSB0aGUgcHJldmlvdXMgb2N0YW50IHRvIHJlbmRlciBhIGZ1bGwgOTAgZGVncmVlc1xuICAgICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1tkaXJdLCBSLCBjYWxsYmFjayk7XG4gICAgICAgIHRoaXMuX3JlbmRlck9jdGFudCh4LCB5LCBPQ1RBTlRTW3ByZXZpb3VzT2N0YW50XSwgUiwgY2FsbGJhY2spO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgb25lIG9jdGFudCAoNDUtZGVncmVlIGFyYykgb2YgdGhlIHZpZXdzaGVkXG4gICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAqIEBwYXJhbSB7aW50fSBvY3RhbnQgT2N0YW50IHRvIGJlIHJlbmRlcmVkXG4gICAgICogQHBhcmFtIHtpbnR9IFIgTWF4aW11bSB2aXNpYmlsaXR5IHJhZGl1c1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG4gICAgX3JlbmRlck9jdGFudCh4LCB5LCBvY3RhbnQsIFIsIGNhbGxiYWNrKSB7XG4gICAgICAgIC8vUmFkaXVzIGluY3JlbWVudGVkIGJ5IDEgdG8gcHJvdmlkZSBzYW1lIGNvdmVyYWdlIGFyZWEgYXMgb3RoZXIgc2hhZG93Y2FzdGluZyByYWRpdXNlc1xuICAgICAgICB0aGlzLl9jYXN0VmlzaWJpbGl0eSh4LCB5LCAxLCAxLjAsIDAuMCwgUiArIDEsIG9jdGFudFswXSwgb2N0YW50WzFdLCBvY3RhbnRbMl0sIG9jdGFudFszXSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBY3R1YWxseSBjYWxjdWxhdGVzIHRoZSB2aXNpYmlsaXR5XG4gICAgICogQHBhcmFtIHtpbnR9IHN0YXJ0WCBUaGUgc3RhcnRpbmcgWCBjb29yZGluYXRlXG4gICAgICogQHBhcmFtIHtpbnR9IHN0YXJ0WSBUaGUgc3RhcnRpbmcgWSBjb29yZGluYXRlXG4gICAgICogQHBhcmFtIHtpbnR9IHJvdyBUaGUgcm93IHRvIHJlbmRlclxuICAgICAqIEBwYXJhbSB7ZmxvYXR9IHZpc1Nsb3BlU3RhcnQgVGhlIHNsb3BlIHRvIHN0YXJ0IGF0XG4gICAgICogQHBhcmFtIHtmbG9hdH0gdmlzU2xvcGVFbmQgVGhlIHNsb3BlIHRvIGVuZCBhdFxuICAgICAqIEBwYXJhbSB7aW50fSByYWRpdXMgVGhlIHJhZGl1cyB0byByZWFjaCBvdXQgdG9cbiAgICAgKiBAcGFyYW0ge2ludH0geHhcbiAgICAgKiBAcGFyYW0ge2ludH0geHlcbiAgICAgKiBAcGFyYW0ge2ludH0geXhcbiAgICAgKiBAcGFyYW0ge2ludH0geXlcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gdXNlIHdoZW4gd2UgaGl0IGEgYmxvY2sgdGhhdCBpcyB2aXNpYmxlXG4gICAgICovXG4gICAgX2Nhc3RWaXNpYmlsaXR5KHN0YXJ0WCwgc3RhcnRZLCByb3csIHZpc1Nsb3BlU3RhcnQsIHZpc1Nsb3BlRW5kLCByYWRpdXMsIHh4LCB4eSwgeXgsIHl5LCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodmlzU2xvcGVTdGFydCA8IHZpc1Nsb3BlRW5kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IHJvdzsgaSA8PSByYWRpdXM7IGkrKykge1xuICAgICAgICAgICAgbGV0IGR4ID0gLWkgLSAxO1xuICAgICAgICAgICAgbGV0IGR5ID0gLWk7XG4gICAgICAgICAgICBsZXQgYmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IG5ld1N0YXJ0ID0gMDtcbiAgICAgICAgICAgIC8vJ1JvdycgY291bGQgYmUgY29sdW1uLCBuYW1lcyBoZXJlIGFzc3VtZSBvY3RhbnQgMCBhbmQgd291bGQgYmUgZmxpcHBlZCBmb3IgaGFsZiB0aGUgb2N0YW50c1xuICAgICAgICAgICAgd2hpbGUgKGR4IDw9IDApIHtcbiAgICAgICAgICAgICAgICBkeCArPSAxO1xuICAgICAgICAgICAgICAgIC8vVHJhbnNsYXRlIGZyb20gcmVsYXRpdmUgY29vcmRpbmF0ZXMgdG8gbWFwIGNvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgbGV0IG1hcFggPSBzdGFydFggKyBkeCAqIHh4ICsgZHkgKiB4eTtcbiAgICAgICAgICAgICAgICBsZXQgbWFwWSA9IHN0YXJ0WSArIGR4ICogeXggKyBkeSAqIHl5O1xuICAgICAgICAgICAgICAgIC8vUmFuZ2Ugb2YgdGhlIHJvd1xuICAgICAgICAgICAgICAgIGxldCBzbG9wZVN0YXJ0ID0gKGR4IC0gMC41KSAvIChkeSArIDAuNSk7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3BlRW5kID0gKGR4ICsgMC41KSAvIChkeSAtIDAuNSk7XG4gICAgICAgICAgICAgICAgLy9JZ25vcmUgaWYgbm90IHlldCBhdCBsZWZ0IGVkZ2Ugb2YgT2N0YW50XG4gICAgICAgICAgICAgICAgaWYgKHNsb3BlRW5kID4gdmlzU2xvcGVTdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9Eb25lIGlmIHBhc3QgcmlnaHQgZWRnZVxuICAgICAgICAgICAgICAgIGlmIChzbG9wZVN0YXJ0IDwgdmlzU2xvcGVFbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vSWYgaXQncyBpbiByYW5nZSwgaXQncyB2aXNpYmxlXG4gICAgICAgICAgICAgICAgaWYgKChkeCAqIGR4ICsgZHkgKiBkeSkgPCAocmFkaXVzICogcmFkaXVzKSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhtYXBYLCBtYXBZLCBpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFibG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vSWYgdGlsZSBpcyBhIGJsb2NraW5nIHRpbGUsIGNhc3QgYXJvdW5kIGl0XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbGlnaHRQYXNzZXMobWFwWCwgbWFwWSkgJiYgaSA8IHJhZGl1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYXN0VmlzaWJpbGl0eShzdGFydFgsIHN0YXJ0WSwgaSArIDEsIHZpc1Nsb3BlU3RhcnQsIHNsb3BlU3RhcnQsIHJhZGl1cywgeHgsIHh5LCB5eCwgeXksIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1N0YXJ0ID0gc2xvcGVFbmQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vS2VlcCBuYXJyb3dpbmcgaWYgc2Nhbm5pbmcgYWNyb3NzIGEgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9saWdodFBhc3NlcyhtYXBYLCBtYXBZKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U3RhcnQgPSBzbG9wZUVuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vQmxvY2sgaGFzIGVuZGVkXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmlzU2xvcGVTdGFydCA9IG5ld1N0YXJ0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChibG9ja2VkKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIFJORyB9IGZyb20gXCIuL3JuZy5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBEaXNwbGF5IH0gZnJvbSBcIi4vZGlzcGxheS9kaXNwbGF5LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFN0cmluZ0dlbmVyYXRvciB9IGZyb20gXCIuL3N0cmluZ2dlbmVyYXRvci5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBFdmVudFF1ZXVlIH0gZnJvbSBcIi4vZXZlbnRxdWV1ZS5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTY2hlZHVsZXIgfSBmcm9tIFwiLi9zY2hlZHVsZXIvaW5kZXguanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRk9WIH0gZnJvbSBcIi4vZm92L2luZGV4LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hcCB9IGZyb20gXCIuL21hcC9pbmRleC5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBOb2lzZSB9IGZyb20gXCIuL25vaXNlL2luZGV4LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFBhdGggfSBmcm9tIFwiLi9wYXRoL2luZGV4LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZS5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBMaWdodGluZyB9IGZyb20gXCIuL2xpZ2h0aW5nLmpzXCI7XG5leHBvcnQgeyBERUZBVUxUX1dJRFRILCBERUZBVUxUX0hFSUdIVCwgRElSUywgS0VZUyB9IGZyb20gXCIuL2NvbnN0YW50cy5qc1wiO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwiLi91dGlsLmpzXCI7XG5leHBvcnQgY29uc3QgVXRpbCA9IHV0aWw7XG5pbXBvcnQgKiBhcyBjb2xvciBmcm9tIFwiLi9jb2xvci5qc1wiO1xuZXhwb3J0IGNvbnN0IENvbG9yID0gY29sb3I7XG5pbXBvcnQgKiBhcyB0ZXh0IGZyb20gXCIuL3RleHQuanNcIjtcbmV4cG9ydCBjb25zdCBUZXh0ID0gdGV4dDtcbiIsImltcG9ydCAqIGFzIENvbG9yIGZyb20gXCIuL2NvbG9yLmpzXCI7XG47XG47XG47XG47XG4vKipcbiAqIExpZ2h0aW5nIGNvbXB1dGF0aW9uLCBiYXNlZCBvbiBhIHRyYWRpdGlvbmFsIEZPViBmb3IgbXVsdGlwbGUgbGlnaHQgc291cmNlcyBhbmQgbXVsdGlwbGUgcGFzc2VzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaWdodGluZyB7XG4gICAgY29uc3RydWN0b3IocmVmbGVjdGl2aXR5Q2FsbGJhY2ssIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLl9yZWZsZWN0aXZpdHlDYWxsYmFjayA9IHJlZmxlY3Rpdml0eUNhbGxiYWNrO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0ge307XG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIHBhc3NlczogMSxcbiAgICAgICAgICAgIGVtaXNzaW9uVGhyZXNob2xkOiAxMDAsXG4gICAgICAgICAgICByYW5nZTogMTBcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2xpZ2h0cyA9IHt9O1xuICAgICAgICB0aGlzLl9yZWZsZWN0aXZpdHlDYWNoZSA9IHt9O1xuICAgICAgICB0aGlzLl9mb3ZDYWNoZSA9IHt9O1xuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkanVzdCBvcHRpb25zIGF0IHJ1bnRpbWVcbiAgICAgKi9cbiAgICBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHVzZWQgRmllbGQtT2YtVmlldyBhbGdvXG4gICAgICovXG4gICAgc2V0Rk9WKGZvdikge1xuICAgICAgICB0aGlzLl9mb3YgPSBmb3Y7XG4gICAgICAgIHRoaXMuX2ZvdkNhY2hlID0ge307XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgKG9yIHJlbW92ZSkgYSBsaWdodCBzb3VyY2VcbiAgICAgKi9cbiAgICBzZXRMaWdodCh4LCB5LCBjb2xvcikge1xuICAgICAgICBsZXQga2V5ID0geCArIFwiLFwiICsgeTtcbiAgICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9saWdodHNba2V5XSA9ICh0eXBlb2YgKGNvbG9yKSA9PSBcInN0cmluZ1wiID8gQ29sb3IuZnJvbVN0cmluZyhjb2xvcikgOiBjb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fbGlnaHRzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgbGlnaHQgc291cmNlc1xuICAgICAqL1xuICAgIGNsZWFyTGlnaHRzKCkgeyB0aGlzLl9saWdodHMgPSB7fTsgfVxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRoZSBwcmUtY29tcHV0ZWQgdG9wb2xvZ3kgdmFsdWVzLiBDYWxsIHdoZW5ldmVyIHRoZSB1bmRlcmx5aW5nIG1hcCBjaGFuZ2VzIGl0cyBsaWdodC1wYXNzYWJpbGl0eS5cbiAgICAgKi9cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5fcmVmbGVjdGl2aXR5Q2FjaGUgPSB7fTtcbiAgICAgICAgdGhpcy5fZm92Q2FjaGUgPSB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgdGhlIGxpZ2h0aW5nXG4gICAgICovXG4gICAgY29tcHV0ZShsaWdodGluZ0NhbGxiYWNrKSB7XG4gICAgICAgIGxldCBkb25lQ2VsbHMgPSB7fTtcbiAgICAgICAgbGV0IGVtaXR0aW5nQ2VsbHMgPSB7fTtcbiAgICAgICAgbGV0IGxpdENlbGxzID0ge307XG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9saWdodHMpIHsgLyogcHJlcGFyZSBlbWl0dGVycyBmb3IgZmlyc3QgcGFzcyAqL1xuICAgICAgICAgICAgbGV0IGxpZ2h0ID0gdGhpcy5fbGlnaHRzW2tleV07XG4gICAgICAgICAgICBlbWl0dGluZ0NlbGxzW2tleV0gPSBbMCwgMCwgMF07XG4gICAgICAgICAgICBDb2xvci5hZGRfKGVtaXR0aW5nQ2VsbHNba2V5XSwgbGlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fb3B0aW9ucy5wYXNzZXM7IGkrKykgeyAvKiBtYWluIGxvb3AgKi9cbiAgICAgICAgICAgIHRoaXMuX2VtaXRMaWdodChlbWl0dGluZ0NlbGxzLCBsaXRDZWxscywgZG9uZUNlbGxzKTtcbiAgICAgICAgICAgIGlmIChpICsgMSA9PSB0aGlzLl9vcHRpb25zLnBhc3Nlcykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSAvKiBub3QgZm9yIHRoZSBsYXN0IHBhc3MgKi9cbiAgICAgICAgICAgIGVtaXR0aW5nQ2VsbHMgPSB0aGlzLl9jb21wdXRlRW1pdHRlcnMobGl0Q2VsbHMsIGRvbmVDZWxscyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgbGl0S2V5IGluIGxpdENlbGxzKSB7IC8qIGxldCB0aGUgdXNlciBrbm93IHdoYXQgYW5kIGhvdyBpcyBsaXQgKi9cbiAgICAgICAgICAgIGxldCBwYXJ0cyA9IGxpdEtleS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICBsZXQgeCA9IHBhcnNlSW50KHBhcnRzWzBdKTtcbiAgICAgICAgICAgIGxldCB5ID0gcGFyc2VJbnQocGFydHNbMV0pO1xuICAgICAgICAgICAgbGlnaHRpbmdDYWxsYmFjayh4LCB5LCBsaXRDZWxsc1tsaXRLZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBvbmUgaXRlcmF0aW9uIGZyb20gYWxsIGVtaXR0aW5nIGNlbGxzXG4gICAgICogQHBhcmFtIGVtaXR0aW5nQ2VsbHMgVGhlc2UgZW1pdCBsaWdodFxuICAgICAqIEBwYXJhbSBsaXRDZWxscyBBZGQgcHJvamVjdGVkIGxpZ2h0IHRvIHRoZXNlXG4gICAgICogQHBhcmFtIGRvbmVDZWxscyBUaGVzZSBhbHJlYWR5IGVtaXR0ZWQsIGZvcmJpZCB0aGVtIGZyb20gZnVydGhlciBjYWxjdWxhdGlvbnNcbiAgICAgKi9cbiAgICBfZW1pdExpZ2h0KGVtaXR0aW5nQ2VsbHMsIGxpdENlbGxzLCBkb25lQ2VsbHMpIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGVtaXR0aW5nQ2VsbHMpIHtcbiAgICAgICAgICAgIGxldCBwYXJ0cyA9IGtleS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICBsZXQgeCA9IHBhcnNlSW50KHBhcnRzWzBdKTtcbiAgICAgICAgICAgIGxldCB5ID0gcGFyc2VJbnQocGFydHNbMV0pO1xuICAgICAgICAgICAgdGhpcy5fZW1pdExpZ2h0RnJvbUNlbGwoeCwgeSwgZW1pdHRpbmdDZWxsc1trZXldLCBsaXRDZWxscyk7XG4gICAgICAgICAgICBkb25lQ2VsbHNba2V5XSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByZXBhcmUgYSBsaXN0IG9mIGVtaXR0ZXJzIGZvciBuZXh0IHBhc3NcbiAgICAgKi9cbiAgICBfY29tcHV0ZUVtaXR0ZXJzKGxpdENlbGxzLCBkb25lQ2VsbHMpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbGl0Q2VsbHMpIHtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gZG9uZUNlbGxzKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IC8qIGFscmVhZHkgZW1pdHRlZCAqL1xuICAgICAgICAgICAgbGV0IGNvbG9yID0gbGl0Q2VsbHNba2V5XTtcbiAgICAgICAgICAgIGxldCByZWZsZWN0aXZpdHk7XG4gICAgICAgICAgICBpZiAoa2V5IGluIHRoaXMuX3JlZmxlY3Rpdml0eUNhY2hlKSB7XG4gICAgICAgICAgICAgICAgcmVmbGVjdGl2aXR5ID0gdGhpcy5fcmVmbGVjdGl2aXR5Q2FjaGVba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBwYXJ0cyA9IGtleS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgbGV0IHggPSBwYXJzZUludChwYXJ0c1swXSk7XG4gICAgICAgICAgICAgICAgbGV0IHkgPSBwYXJzZUludChwYXJ0c1sxXSk7XG4gICAgICAgICAgICAgICAgcmVmbGVjdGl2aXR5ID0gdGhpcy5fcmVmbGVjdGl2aXR5Q2FsbGJhY2soeCwgeSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmbGVjdGl2aXR5Q2FjaGVba2V5XSA9IHJlZmxlY3Rpdml0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZWZsZWN0aXZpdHkgPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSAvKiB3aWxsIG5vdCByZWZsZWN0IGF0IGFsbCAqL1xuICAgICAgICAgICAgLyogY29tcHV0ZSBlbWlzc2lvbiBjb2xvciAqL1xuICAgICAgICAgICAgbGV0IGVtaXNzaW9uID0gWzAsIDAsIDBdO1xuICAgICAgICAgICAgbGV0IGludGVuc2l0eSA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBwYXJ0ID0gTWF0aC5yb3VuZChjb2xvcltpXSAqIHJlZmxlY3Rpdml0eSk7XG4gICAgICAgICAgICAgICAgZW1pc3Npb25baV0gPSBwYXJ0O1xuICAgICAgICAgICAgICAgIGludGVuc2l0eSArPSBwYXJ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGludGVuc2l0eSA+IHRoaXMuX29wdGlvbnMuZW1pc3Npb25UaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IGVtaXNzaW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgb25lIGl0ZXJhdGlvbiBmcm9tIG9uZSBjZWxsXG4gICAgICovXG4gICAgX2VtaXRMaWdodEZyb21DZWxsKHgsIHksIGNvbG9yLCBsaXRDZWxscykge1xuICAgICAgICBsZXQga2V5ID0geCArIFwiLFwiICsgeTtcbiAgICAgICAgbGV0IGZvdjtcbiAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9mb3ZDYWNoZSkge1xuICAgICAgICAgICAgZm92ID0gdGhpcy5fZm92Q2FjaGVba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvdiA9IHRoaXMuX3VwZGF0ZUZPVih4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBmb3ZLZXkgaW4gZm92KSB7XG4gICAgICAgICAgICBsZXQgZm9ybUZhY3RvciA9IGZvdltmb3ZLZXldO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgICAgIGlmIChmb3ZLZXkgaW4gbGl0Q2VsbHMpIHsgLyogYWxyZWFkeSBsaXQgKi9cbiAgICAgICAgICAgICAgICByZXN1bHQgPSBsaXRDZWxsc1tmb3ZLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8qIG5ld2x5IGxpdCAqL1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFswLCAwLCAwXTtcbiAgICAgICAgICAgICAgICBsaXRDZWxsc1tmb3ZLZXldID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbaV0gKz0gTWF0aC5yb3VuZChjb2xvcltpXSAqIGZvcm1GYWN0b3IpO1xuICAgICAgICAgICAgfSAvKiBhZGQgbGlnaHQgY29sb3IgKi9cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBGT1YgKFwiZm9ybSBmYWN0b3JcIikgZm9yIGEgcG90ZW50aWFsIGxpZ2h0IHNvdXJjZSBhdCBbeCx5XVxuICAgICAqL1xuICAgIF91cGRhdGVGT1YoeCwgeSkge1xuICAgICAgICBsZXQga2V5MSA9IHggKyBcIixcIiArIHk7XG4gICAgICAgIGxldCBjYWNoZSA9IHt9O1xuICAgICAgICB0aGlzLl9mb3ZDYWNoZVtrZXkxXSA9IGNhY2hlO1xuICAgICAgICBsZXQgcmFuZ2UgPSB0aGlzLl9vcHRpb25zLnJhbmdlO1xuICAgICAgICBmdW5jdGlvbiBjYih4LCB5LCByLCB2aXMpIHtcbiAgICAgICAgICAgIGxldCBrZXkyID0geCArIFwiLFwiICsgeTtcbiAgICAgICAgICAgIGxldCBmb3JtRmFjdG9yID0gdmlzICogKDEgLSByIC8gcmFuZ2UpO1xuICAgICAgICAgICAgaWYgKGZvcm1GYWN0b3IgPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhY2hlW2tleTJdID0gZm9ybUZhY3RvcjtcbiAgICAgICAgfVxuICAgICAgICA7XG4gICAgICAgIHRoaXMuX2Zvdi5jb21wdXRlKHgsIHksIHJhbmdlLCBjYi5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIGNhY2hlO1xuICAgIH1cbn1cbiIsImltcG9ydCBNYXAgZnJvbSBcIi4vbWFwLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBTaW1wbGUgZW1wdHkgcmVjdGFuZ3VsYXIgcm9vbVxuICogQGF1Z21lbnRzIFJPVC5NYXBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJlbmEgZXh0ZW5kcyBNYXAge1xuICAgIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgICBsZXQgdyA9IHRoaXMuX3dpZHRoIC0gMTtcbiAgICAgICAgbGV0IGggPSB0aGlzLl9oZWlnaHQgLSAxO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB3OyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IGg7IGorKykge1xuICAgICAgICAgICAgICAgIGxldCBlbXB0eSA9IChpICYmIGogJiYgaSA8IHcgJiYgaiA8IGgpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGksIGosIGVtcHR5ID8gMCA6IDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCBNYXAgZnJvbSBcIi4vbWFwLmpzXCI7XG5pbXBvcnQgeyBESVJTIH0gZnJvbSBcIi4uL2NvbnN0YW50cy5qc1wiO1xuaW1wb3J0IFJORyBmcm9tIFwiLi4vcm5nLmpzXCI7XG47XG4vKipcbiAqIEBjbGFzcyBDZWxsdWxhciBhdXRvbWF0b24gbWFwIGdlbmVyYXRvclxuICogQGF1Z21lbnRzIFJPVC5NYXBcbiAqIEBwYXJhbSB7aW50fSBbd2lkdGg9Uk9ULkRFRkFVTFRfV0lEVEhdXG4gKiBAcGFyYW0ge2ludH0gW2hlaWdodD1ST1QuREVGQVVMVF9IRUlHSFRdXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIE9wdGlvbnNcbiAqIEBwYXJhbSB7aW50W119IFtvcHRpb25zLmJvcm5dIExpc3Qgb2YgbmVpZ2hib3IgY291bnRzIGZvciBhIG5ldyBjZWxsIHRvIGJlIGJvcm4gaW4gZW1wdHkgc3BhY2VcbiAqIEBwYXJhbSB7aW50W119IFtvcHRpb25zLnN1cnZpdmVdIExpc3Qgb2YgbmVpZ2hib3IgY291bnRzIGZvciBhbiBleGlzdGluZyAgY2VsbCB0byBzdXJ2aXZlXG4gKiBAcGFyYW0ge2ludH0gW29wdGlvbnMudG9wb2xvZ3ldIFRvcG9sb2d5IDQgb3IgNiBvciA4XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENlbGx1bGFyIGV4dGVuZHMgTWFwIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB7XG4gICAgICAgICAgICBib3JuOiBbNSwgNiwgNywgOF0sXG4gICAgICAgICAgICBzdXJ2aXZlOiBbNCwgNSwgNiwgNywgOF0sXG4gICAgICAgICAgICB0b3BvbG9neTogOFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2RpcnMgPSBESVJTW3RoaXMuX29wdGlvbnMudG9wb2xvZ3ldO1xuICAgICAgICB0aGlzLl9tYXAgPSB0aGlzLl9maWxsTWFwKDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaWxsIHRoZSBtYXAgd2l0aCByYW5kb20gdmFsdWVzXG4gICAgICogQHBhcmFtIHtmbG9hdH0gcHJvYmFiaWxpdHkgUHJvYmFiaWxpdHkgZm9yIGEgY2VsbCB0byBiZWNvbWUgYWxpdmU7IDAgPSBhbGwgZW1wdHksIDEgPSBhbGwgZnVsbFxuICAgICAqL1xuICAgIHJhbmRvbWl6ZShwcm9iYWJpbGl0eSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3dpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXBbaV1bal0gPSAoUk5HLmdldFVuaWZvcm0oKSA8IHByb2JhYmlsaXR5ID8gMSA6IDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGFuZ2Ugb3B0aW9ucy5cbiAgICAgKiBAc2VlIFJPVC5NYXAuQ2VsbHVsYXJcbiAgICAgKi9cbiAgICBzZXRPcHRpb25zKG9wdGlvbnMpIHsgT2JqZWN0LmFzc2lnbih0aGlzLl9vcHRpb25zLCBvcHRpb25zKTsgfVxuICAgIHNldCh4LCB5LCB2YWx1ZSkgeyB0aGlzLl9tYXBbeF1beV0gPSB2YWx1ZTsgfVxuICAgIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgICBsZXQgbmV3TWFwID0gdGhpcy5fZmlsbE1hcCgwKTtcbiAgICAgICAgbGV0IGJvcm4gPSB0aGlzLl9vcHRpb25zLmJvcm47XG4gICAgICAgIGxldCBzdXJ2aXZlID0gdGhpcy5fb3B0aW9ucy5zdXJ2aXZlO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgICBsZXQgd2lkdGhTdGVwID0gMTtcbiAgICAgICAgICAgIGxldCB3aWR0aFN0YXJ0ID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5ID09IDYpIHtcbiAgICAgICAgICAgICAgICB3aWR0aFN0ZXAgPSAyO1xuICAgICAgICAgICAgICAgIHdpZHRoU3RhcnQgPSBqICUgMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB3aWR0aFN0YXJ0OyBpIDwgdGhpcy5fd2lkdGg7IGkgKz0gd2lkdGhTdGVwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1ciA9IHRoaXMuX21hcFtpXVtqXTtcbiAgICAgICAgICAgICAgICBsZXQgbmNvdW50ID0gdGhpcy5fZ2V0TmVpZ2hib3JzKGksIGopO1xuICAgICAgICAgICAgICAgIGlmIChjdXIgJiYgc3Vydml2ZS5pbmRleE9mKG5jb3VudCkgIT0gLTEpIHsgLyogc3Vydml2ZSAqL1xuICAgICAgICAgICAgICAgICAgICBuZXdNYXBbaV1bal0gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICghY3VyICYmIGJvcm4uaW5kZXhPZihuY291bnQpICE9IC0xKSB7IC8qIGJvcm4gKi9cbiAgICAgICAgICAgICAgICAgICAgbmV3TWFwW2ldW2pdID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFwID0gbmV3TWFwO1xuICAgICAgICBjYWxsYmFjayAmJiB0aGlzLl9zZXJ2aWNlQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH1cbiAgICBfc2VydmljZUNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgIGxldCB3aWR0aFN0ZXAgPSAxO1xuICAgICAgICAgICAgbGV0IHdpZHRoU3RhcnQgPSAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kgPT0gNikge1xuICAgICAgICAgICAgICAgIHdpZHRoU3RlcCA9IDI7XG4gICAgICAgICAgICAgICAgd2lkdGhTdGFydCA9IGogJSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHdpZHRoU3RhcnQ7IGkgPCB0aGlzLl93aWR0aDsgaSArPSB3aWR0aFN0ZXApIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhpLCBqLCB0aGlzLl9tYXBbaV1bal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBuZWlnaGJvciBjb3VudCBhdCBbaSxqXSBpbiB0aGlzLl9tYXBcbiAgICAgKi9cbiAgICBfZ2V0TmVpZ2hib3JzKGN4LCBjeSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZGlyID0gdGhpcy5fZGlyc1tpXTtcbiAgICAgICAgICAgIGxldCB4ID0gY3ggKyBkaXJbMF07XG4gICAgICAgICAgICBsZXQgeSA9IGN5ICsgZGlyWzFdO1xuICAgICAgICAgICAgaWYgKHggPCAwIHx8IHggPj0gdGhpcy5fd2lkdGggfHwgeSA8IDAgfHwgeSA+PSB0aGlzLl9oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCArPSAodGhpcy5fbWFwW3hdW3ldID09IDEgPyAxIDogMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWFrZSBzdXJlIGV2ZXJ5IG5vbi13YWxsIHNwYWNlIGlzIGFjY2Vzc2libGUuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgdG8gY2FsbCB0byBkaXNwbGF5IG1hcCB3aGVuIGRvXG4gICAgICogQHBhcmFtIHtpbnR9IHZhbHVlIHRvIGNvbnNpZGVyIGVtcHR5IHNwYWNlIC0gZGVmYXVsdHMgdG8gMFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIHRvIGNhbGwgd2hlbiBhIG5ldyBjb25uZWN0aW9uIGlzIG1hZGVcbiAgICAgKi9cbiAgICBjb25uZWN0KGNhbGxiYWNrLCB2YWx1ZSwgY29ubmVjdGlvbkNhbGxiYWNrKSB7XG4gICAgICAgIGlmICghdmFsdWUpXG4gICAgICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICAgIGxldCBhbGxGcmVlU3BhY2UgPSBbXTtcbiAgICAgICAgbGV0IG5vdENvbm5lY3RlZCA9IHt9O1xuICAgICAgICAvLyBmaW5kIGFsbCBmcmVlIHNwYWNlXG4gICAgICAgIGxldCB3aWR0aFN0ZXAgPSAxO1xuICAgICAgICBsZXQgd2lkdGhTdGFydHMgPSBbMCwgMF07XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5ID09IDYpIHtcbiAgICAgICAgICAgIHdpZHRoU3RlcCA9IDI7XG4gICAgICAgICAgICB3aWR0aFN0YXJ0cyA9IFswLCAxXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuX2hlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gd2lkdGhTdGFydHNbeSAlIDJdOyB4IDwgdGhpcy5fd2lkdGg7IHggKz0gd2lkdGhTdGVwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2ZyZWVTcGFjZSh4LCB5LCB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSBbeCwgeV07XG4gICAgICAgICAgICAgICAgICAgIG5vdENvbm5lY3RlZFt0aGlzLl9wb2ludEtleShwKV0gPSBwO1xuICAgICAgICAgICAgICAgICAgICBhbGxGcmVlU3BhY2UucHVzaChbeCwgeV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgc3RhcnQgPSBhbGxGcmVlU3BhY2VbUk5HLmdldFVuaWZvcm1JbnQoMCwgYWxsRnJlZVNwYWNlLmxlbmd0aCAtIDEpXTtcbiAgICAgICAgbGV0IGtleSA9IHRoaXMuX3BvaW50S2V5KHN0YXJ0KTtcbiAgICAgICAgbGV0IGNvbm5lY3RlZCA9IHt9O1xuICAgICAgICBjb25uZWN0ZWRba2V5XSA9IHN0YXJ0O1xuICAgICAgICBkZWxldGUgbm90Q29ubmVjdGVkW2tleV07XG4gICAgICAgIC8vIGZpbmQgd2hhdCdzIGNvbm5lY3RlZCB0byB0aGUgc3RhcnRpbmcgcG9pbnRcbiAgICAgICAgdGhpcy5fZmluZENvbm5lY3RlZChjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCwgW3N0YXJ0XSwgZmFsc2UsIHZhbHVlKTtcbiAgICAgICAgd2hpbGUgKE9iamVjdC5rZXlzKG5vdENvbm5lY3RlZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gZmluZCB0d28gcG9pbnRzIGZyb20gbm90Q29ubmVjdGVkIHRvIGNvbm5lY3RlZFxuICAgICAgICAgICAgbGV0IHAgPSB0aGlzLl9nZXRGcm9tVG8oY29ubmVjdGVkLCBub3RDb25uZWN0ZWQpO1xuICAgICAgICAgICAgbGV0IGZyb20gPSBwWzBdOyAvLyBub3RDb25uZWN0ZWRcbiAgICAgICAgICAgIGxldCB0byA9IHBbMV07IC8vIGNvbm5lY3RlZFxuICAgICAgICAgICAgLy8gZmluZCBldmVyeXRoaW5nIGNvbm5lY3RlZCB0byB0aGUgc3RhcnRpbmcgcG9pbnRcbiAgICAgICAgICAgIGxldCBsb2NhbCA9IHt9O1xuICAgICAgICAgICAgbG9jYWxbdGhpcy5fcG9pbnRLZXkoZnJvbSldID0gZnJvbTtcbiAgICAgICAgICAgIHRoaXMuX2ZpbmRDb25uZWN0ZWQobG9jYWwsIG5vdENvbm5lY3RlZCwgW2Zyb21dLCB0cnVlLCB2YWx1ZSk7XG4gICAgICAgICAgICAvLyBjb25uZWN0IHRvIGEgY29ubmVjdGVkIGNlbGxcbiAgICAgICAgICAgIGxldCB0dW5uZWxGbiA9ICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5ID09IDYgPyB0aGlzLl90dW5uZWxUb0Nvbm5lY3RlZDYgOiB0aGlzLl90dW5uZWxUb0Nvbm5lY3RlZCk7XG4gICAgICAgICAgICB0dW5uZWxGbi5jYWxsKHRoaXMsIHRvLCBmcm9tLCBjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCwgdmFsdWUsIGNvbm5lY3Rpb25DYWxsYmFjayk7XG4gICAgICAgICAgICAvLyBub3cgYWxsIG9mIGxvY2FsIGlzIGNvbm5lY3RlZFxuICAgICAgICAgICAgZm9yIChsZXQgayBpbiBsb2NhbCkge1xuICAgICAgICAgICAgICAgIGxldCBwcCA9IGxvY2FsW2tdO1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcFtwcFswXV1bcHBbMV1dID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgY29ubmVjdGVkW2tdID0gcHA7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG5vdENvbm5lY3RlZFtrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYWxsYmFjayAmJiB0aGlzLl9zZXJ2aWNlQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kIHJhbmRvbSBwb2ludHMgdG8gY29ubmVjdC4gU2VhcmNoIGZvciB0aGUgY2xvc2VzdCBwb2ludCBpbiB0aGUgbGFyZ2VyIHNwYWNlLlxuICAgICAqIFRoaXMgaXMgdG8gbWluaW1pemUgdGhlIGxlbmd0aCBvZiB0aGUgcGFzc2FnZSB3aGlsZSBtYWludGFpbmluZyBnb29kIHBlcmZvcm1hbmNlLlxuICAgICAqL1xuICAgIF9nZXRGcm9tVG8oY29ubmVjdGVkLCBub3RDb25uZWN0ZWQpIHtcbiAgICAgICAgbGV0IGZyb20gPSBbMCwgMF0sIHRvID0gWzAsIDBdLCBkO1xuICAgICAgICBsZXQgY29ubmVjdGVkS2V5cyA9IE9iamVjdC5rZXlzKGNvbm5lY3RlZCk7XG4gICAgICAgIGxldCBub3RDb25uZWN0ZWRLZXlzID0gT2JqZWN0LmtleXMobm90Q29ubmVjdGVkKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjb25uZWN0ZWRLZXlzLmxlbmd0aCA8IG5vdENvbm5lY3RlZEtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleXMgPSBjb25uZWN0ZWRLZXlzO1xuICAgICAgICAgICAgICAgIHRvID0gY29ubmVjdGVkW2tleXNbUk5HLmdldFVuaWZvcm1JbnQoMCwga2V5cy5sZW5ndGggLSAxKV1dO1xuICAgICAgICAgICAgICAgIGZyb20gPSB0aGlzLl9nZXRDbG9zZXN0KHRvLCBub3RDb25uZWN0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleXMgPSBub3RDb25uZWN0ZWRLZXlzO1xuICAgICAgICAgICAgICAgIGZyb20gPSBub3RDb25uZWN0ZWRba2V5c1tSTkcuZ2V0VW5pZm9ybUludCgwLCBrZXlzLmxlbmd0aCAtIDEpXV07XG4gICAgICAgICAgICAgICAgdG8gPSB0aGlzLl9nZXRDbG9zZXN0KGZyb20sIGNvbm5lY3RlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkID0gKGZyb21bMF0gLSB0b1swXSkgKiAoZnJvbVswXSAtIHRvWzBdKSArIChmcm9tWzFdIC0gdG9bMV0pICogKGZyb21bMV0gLSB0b1sxXSk7XG4gICAgICAgICAgICBpZiAoZCA8IDY0KSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCI+Pj4gY29ubmVjdGVkPVwiICsgdG8gKyBcIiBub3RDb25uZWN0ZWQ9XCIgKyBmcm9tICsgXCIgZGlzdD1cIiArIGQpO1xuICAgICAgICByZXR1cm4gW2Zyb20sIHRvXTtcbiAgICB9XG4gICAgX2dldENsb3Nlc3QocG9pbnQsIHNwYWNlKSB7XG4gICAgICAgIGxldCBtaW5Qb2ludCA9IG51bGw7XG4gICAgICAgIGxldCBtaW5EaXN0ID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgayBpbiBzcGFjZSkge1xuICAgICAgICAgICAgbGV0IHAgPSBzcGFjZVtrXTtcbiAgICAgICAgICAgIGxldCBkID0gKHBbMF0gLSBwb2ludFswXSkgKiAocFswXSAtIHBvaW50WzBdKSArIChwWzFdIC0gcG9pbnRbMV0pICogKHBbMV0gLSBwb2ludFsxXSk7XG4gICAgICAgICAgICBpZiAobWluRGlzdCA9PSBudWxsIHx8IGQgPCBtaW5EaXN0KSB7XG4gICAgICAgICAgICAgICAgbWluRGlzdCA9IGQ7XG4gICAgICAgICAgICAgICAgbWluUG9pbnQgPSBwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaW5Qb2ludDtcbiAgICB9XG4gICAgX2ZpbmRDb25uZWN0ZWQoY29ubmVjdGVkLCBub3RDb25uZWN0ZWQsIHN0YWNrLCBrZWVwTm90Q29ubmVjdGVkLCB2YWx1ZSkge1xuICAgICAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IHAgPSBzdGFjay5zcGxpY2UoMCwgMSlbMF07XG4gICAgICAgICAgICBsZXQgdGVzdHM7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50b3BvbG9neSA9PSA2KSB7XG4gICAgICAgICAgICAgICAgdGVzdHMgPSBbXG4gICAgICAgICAgICAgICAgICAgIFtwWzBdICsgMiwgcFsxXV0sXG4gICAgICAgICAgICAgICAgICAgIFtwWzBdICsgMSwgcFsxXSAtIDFdLFxuICAgICAgICAgICAgICAgICAgICBbcFswXSAtIDEsIHBbMV0gLSAxXSxcbiAgICAgICAgICAgICAgICAgICAgW3BbMF0gLSAyLCBwWzFdXSxcbiAgICAgICAgICAgICAgICAgICAgW3BbMF0gLSAxLCBwWzFdICsgMV0sXG4gICAgICAgICAgICAgICAgICAgIFtwWzBdICsgMSwgcFsxXSArIDFdLFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ZXN0cyA9IFtcbiAgICAgICAgICAgICAgICAgICAgW3BbMF0gKyAxLCBwWzFdXSxcbiAgICAgICAgICAgICAgICAgICAgW3BbMF0gLSAxLCBwWzFdXSxcbiAgICAgICAgICAgICAgICAgICAgW3BbMF0sIHBbMV0gKyAxXSxcbiAgICAgICAgICAgICAgICAgICAgW3BbMF0sIHBbMV0gLSAxXVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRlc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IHRoaXMuX3BvaW50S2V5KHRlc3RzW2ldKTtcbiAgICAgICAgICAgICAgICBpZiAoY29ubmVjdGVkW2tleV0gPT0gbnVsbCAmJiB0aGlzLl9mcmVlU3BhY2UodGVzdHNbaV1bMF0sIHRlc3RzW2ldWzFdLCB2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGVkW2tleV0gPSB0ZXN0c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFrZWVwTm90Q29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgbm90Q29ubmVjdGVkW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3RhY2sucHVzaCh0ZXN0c1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF90dW5uZWxUb0Nvbm5lY3RlZCh0bywgZnJvbSwgY29ubmVjdGVkLCBub3RDb25uZWN0ZWQsIHZhbHVlLCBjb25uZWN0aW9uQ2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGEsIGI7XG4gICAgICAgIGlmIChmcm9tWzBdIDwgdG9bMF0pIHtcbiAgICAgICAgICAgIGEgPSBmcm9tO1xuICAgICAgICAgICAgYiA9IHRvO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYSA9IHRvO1xuICAgICAgICAgICAgYiA9IGZyb207XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgeHggPSBhWzBdOyB4eCA8PSBiWzBdOyB4eCsrKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXBbeHhdW2FbMV1dID0gdmFsdWU7XG4gICAgICAgICAgICBsZXQgcCA9IFt4eCwgYVsxXV07XG4gICAgICAgICAgICBsZXQgcGtleSA9IHRoaXMuX3BvaW50S2V5KHApO1xuICAgICAgICAgICAgY29ubmVjdGVkW3BrZXldID0gcDtcbiAgICAgICAgICAgIGRlbGV0ZSBub3RDb25uZWN0ZWRbcGtleV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbm5lY3Rpb25DYWxsYmFjayAmJiBhWzBdIDwgYlswXSkge1xuICAgICAgICAgICAgY29ubmVjdGlvbkNhbGxiYWNrKGEsIFtiWzBdLCBhWzFdXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8geCBpcyBub3cgZml4ZWRcbiAgICAgICAgbGV0IHggPSBiWzBdO1xuICAgICAgICBpZiAoZnJvbVsxXSA8IHRvWzFdKSB7XG4gICAgICAgICAgICBhID0gZnJvbTtcbiAgICAgICAgICAgIGIgPSB0bztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGEgPSB0bztcbiAgICAgICAgICAgIGIgPSBmcm9tO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHl5ID0gYVsxXTsgeXkgPCBiWzFdOyB5eSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXBbeF1beXldID0gdmFsdWU7XG4gICAgICAgICAgICBsZXQgcCA9IFt4LCB5eV07XG4gICAgICAgICAgICBsZXQgcGtleSA9IHRoaXMuX3BvaW50S2V5KHApO1xuICAgICAgICAgICAgY29ubmVjdGVkW3BrZXldID0gcDtcbiAgICAgICAgICAgIGRlbGV0ZSBub3RDb25uZWN0ZWRbcGtleV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbm5lY3Rpb25DYWxsYmFjayAmJiBhWzFdIDwgYlsxXSkge1xuICAgICAgICAgICAgY29ubmVjdGlvbkNhbGxiYWNrKFtiWzBdLCBhWzFdXSwgW2JbMF0sIGJbMV1dKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfdHVubmVsVG9Db25uZWN0ZWQ2KHRvLCBmcm9tLCBjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCwgdmFsdWUsIGNvbm5lY3Rpb25DYWxsYmFjaykge1xuICAgICAgICBsZXQgYSwgYjtcbiAgICAgICAgaWYgKGZyb21bMF0gPCB0b1swXSkge1xuICAgICAgICAgICAgYSA9IGZyb207XG4gICAgICAgICAgICBiID0gdG87XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhID0gdG87XG4gICAgICAgICAgICBiID0gZnJvbTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0dW5uZWwgZGlhZ29uYWxseSB1bnRpbCBob3Jpem9udGFsbHkgbGV2ZWxcbiAgICAgICAgbGV0IHh4ID0gYVswXTtcbiAgICAgICAgbGV0IHl5ID0gYVsxXTtcbiAgICAgICAgd2hpbGUgKCEoeHggPT0gYlswXSAmJiB5eSA9PSBiWzFdKSkge1xuICAgICAgICAgICAgbGV0IHN0ZXBXaWR0aCA9IDI7XG4gICAgICAgICAgICBpZiAoeXkgPCBiWzFdKSB7XG4gICAgICAgICAgICAgICAgeXkrKztcbiAgICAgICAgICAgICAgICBzdGVwV2lkdGggPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoeXkgPiBiWzFdKSB7XG4gICAgICAgICAgICAgICAgeXktLTtcbiAgICAgICAgICAgICAgICBzdGVwV2lkdGggPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHh4IDwgYlswXSkge1xuICAgICAgICAgICAgICAgIHh4ICs9IHN0ZXBXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHh4ID4gYlswXSkge1xuICAgICAgICAgICAgICAgIHh4IC09IHN0ZXBXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJbMV0gJSAyKSB7XG4gICAgICAgICAgICAgICAgLy8gV29uJ3Qgc3RlcCBvdXRzaWRlIG1hcCBpZiBkZXN0aW5hdGlvbiBvbiBpcyBtYXAncyByaWdodCBlZGdlXG4gICAgICAgICAgICAgICAgeHggLT0gc3RlcFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZGl0dG8gZm9yIGxlZnQgZWRnZVxuICAgICAgICAgICAgICAgIHh4ICs9IHN0ZXBXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX21hcFt4eF1beXldID0gdmFsdWU7XG4gICAgICAgICAgICBsZXQgcCA9IFt4eCwgeXldO1xuICAgICAgICAgICAgbGV0IHBrZXkgPSB0aGlzLl9wb2ludEtleShwKTtcbiAgICAgICAgICAgIGNvbm5lY3RlZFtwa2V5XSA9IHA7XG4gICAgICAgICAgICBkZWxldGUgbm90Q29ubmVjdGVkW3BrZXldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25uZWN0aW9uQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb25DYWxsYmFjayhmcm9tLCB0byk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2ZyZWVTcGFjZSh4LCB5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4geCA+PSAwICYmIHggPCB0aGlzLl93aWR0aCAmJiB5ID49IDAgJiYgeSA8IHRoaXMuX2hlaWdodCAmJiB0aGlzLl9tYXBbeF1beV0gPT0gdmFsdWU7XG4gICAgfVxuICAgIF9wb2ludEtleShwKSB7IHJldHVybiBwWzBdICsgXCIuXCIgKyBwWzFdOyB9XG59XG4iLCJpbXBvcnQgRHVuZ2VvbiBmcm9tIFwiLi9kdW5nZW9uLmpzXCI7XG5pbXBvcnQgeyBSb29tLCBDb3JyaWRvciB9IGZyb20gXCIuL2ZlYXR1cmVzLmpzXCI7XG5pbXBvcnQgUk5HIGZyb20gXCIuLi9ybmcuanNcIjtcbmltcG9ydCB7IERJUlMgfSBmcm9tIFwiLi4vY29uc3RhbnRzLmpzXCI7XG5jb25zdCBGRUFUVVJFUyA9IHtcbiAgICBcInJvb21cIjogUm9vbSxcbiAgICBcImNvcnJpZG9yXCI6IENvcnJpZG9yXG59O1xuLyoqXG4gKiBSYW5kb20gZHVuZ2VvbiBnZW5lcmF0b3IgdXNpbmcgaHVtYW4tbGlrZSBkaWdnaW5nIHBhdHRlcm5zLlxuICogSGVhdmlseSBiYXNlZCBvbiBNaWtlIEFuZGVyc29uJ3MgaWRlYXMgZnJvbSB0aGUgXCJUeXJhbnRcIiBhbGdvLCBtZW50aW9uZWQgYXRcbiAqIGh0dHA6Ly93d3cucm9ndWViYXNpbi5yb2d1ZWxpa2VkZXZlbG9wbWVudC5vcmcvaW5kZXgucGhwP3RpdGxlPUR1bmdlb24tQnVpbGRpbmdfQWxnb3JpdGhtLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaWdnZXIgZXh0ZW5kcyBEdW5nZW9uIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIHJvb21XaWR0aDogWzMsIDldLFxuICAgICAgICAgICAgcm9vbUhlaWdodDogWzMsIDVdLFxuICAgICAgICAgICAgY29ycmlkb3JMZW5ndGg6IFszLCAxMF0sXG4gICAgICAgICAgICBkdWdQZXJjZW50YWdlOiAwLjIsXG4gICAgICAgICAgICB0aW1lTGltaXQ6IDEwMDAgLyogd2Ugc3RvcCBhZnRlciB0aGlzIG11Y2ggdGltZSBoYXMgcGFzc2VkIChtc2VjKSAqL1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fZmVhdHVyZXMgPSB7XG4gICAgICAgICAgICBcInJvb21cIjogNCxcbiAgICAgICAgICAgIFwiY29ycmlkb3JcIjogNFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9tYXAgPSBbXTtcbiAgICAgICAgdGhpcy5fZmVhdHVyZUF0dGVtcHRzID0gMjA7IC8qIGhvdyBtYW55IHRpbWVzIGRvIHdlIHRyeSB0byBjcmVhdGUgYSBmZWF0dXJlIG9uIGEgc3VpdGFibGUgd2FsbCAqL1xuICAgICAgICB0aGlzLl93YWxscyA9IHt9OyAvKiB0aGVzZSBhcmUgYXZhaWxhYmxlIGZvciBkaWdnaW5nICovXG4gICAgICAgIHRoaXMuX2R1ZyA9IDA7XG4gICAgICAgIHRoaXMuX2RpZ0NhbGxiYWNrID0gdGhpcy5fZGlnQ2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fY2FuQmVEdWdDYWxsYmFjayA9IHRoaXMuX2NhbkJlRHVnQ2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5faXNXYWxsQ2FsbGJhY2sgPSB0aGlzLl9pc1dhbGxDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9wcmlvcml0eVdhbGxDYWxsYmFjayA9IHRoaXMuX3ByaW9yaXR5V2FsbENhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgICB0aGlzLl9yb29tcyA9IFtdO1xuICAgICAgICB0aGlzLl9jb3JyaWRvcnMgPSBbXTtcbiAgICAgICAgdGhpcy5fbWFwID0gdGhpcy5fZmlsbE1hcCgxKTtcbiAgICAgICAgdGhpcy5fd2FsbHMgPSB7fTtcbiAgICAgICAgdGhpcy5fZHVnID0gMDtcbiAgICAgICAgbGV0IGFyZWEgPSAodGhpcy5fd2lkdGggLSAyKSAqICh0aGlzLl9oZWlnaHQgLSAyKTtcbiAgICAgICAgdGhpcy5fZmlyc3RSb29tKCk7XG4gICAgICAgIGxldCB0MSA9IERhdGUubm93KCk7XG4gICAgICAgIGxldCBwcmlvcml0eVdhbGxzO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBwcmlvcml0eVdhbGxzID0gMDtcbiAgICAgICAgICAgIGxldCB0MiA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBpZiAodDIgLSB0MSA+IHRoaXMuX29wdGlvbnMudGltZUxpbWl0KSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiBmaW5kIGEgZ29vZCB3YWxsICovXG4gICAgICAgICAgICBsZXQgd2FsbCA9IHRoaXMuX2ZpbmRXYWxsKCk7XG4gICAgICAgICAgICBpZiAoIXdhbGwpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gLyogbm8gbW9yZSB3YWxscyAqL1xuICAgICAgICAgICAgbGV0IHBhcnRzID0gd2FsbC5zcGxpdChcIixcIik7XG4gICAgICAgICAgICBsZXQgeCA9IHBhcnNlSW50KHBhcnRzWzBdKTtcbiAgICAgICAgICAgIGxldCB5ID0gcGFyc2VJbnQocGFydHNbMV0pO1xuICAgICAgICAgICAgbGV0IGRpciA9IHRoaXMuX2dldERpZ2dpbmdEaXJlY3Rpb24oeCwgeSk7XG4gICAgICAgICAgICBpZiAoIWRpcikge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSAvKiB0aGlzIHdhbGwgaXMgbm90IHN1aXRhYmxlICovXG4gICAgICAgICAgICAvL1x0XHRjb25zb2xlLmxvZyhcIndhbGxcIiwgeCwgeSk7XG4gICAgICAgICAgICAvKiB0cnkgYWRkaW5nIGEgZmVhdHVyZSAqL1xuICAgICAgICAgICAgbGV0IGZlYXR1cmVBdHRlbXB0cyA9IDA7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgZmVhdHVyZUF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RyeUZlYXR1cmUoeCwgeSwgZGlyWzBdLCBkaXJbMV0pKSB7IC8qIGZlYXR1cmUgYWRkZWQgKi9cbiAgICAgICAgICAgICAgICAgICAgLy9pZiAodGhpcy5fcm9vbXMubGVuZ3RoICsgdGhpcy5fY29ycmlkb3JzLmxlbmd0aCA9PSAyKSB7IHRoaXMuX3Jvb21zWzBdLmFkZERvb3IoeCwgeSk7IH0gLyogZmlyc3Qgcm9vbSBvZmljaWFsbHkgaGFzIGRvb3JzICovXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZVN1cnJvdW5kaW5nV2FsbHMoeCwgeSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZVN1cnJvdW5kaW5nV2FsbHMoeCAtIGRpclswXSwgeSAtIGRpclsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gd2hpbGUgKGZlYXR1cmVBdHRlbXB0cyA8IHRoaXMuX2ZlYXR1cmVBdHRlbXB0cyk7XG4gICAgICAgICAgICBmb3IgKGxldCBpZCBpbiB0aGlzLl93YWxscykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl93YWxsc1tpZF0gPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5V2FsbHMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuX2R1ZyAvIGFyZWEgPCB0aGlzLl9vcHRpb25zLmR1Z1BlcmNlbnRhZ2UgfHwgcHJpb3JpdHlXYWxscyk7IC8qIGZpeG1lIG51bWJlciBvZiBwcmlvcml0eSB3YWxscyAqL1xuICAgICAgICB0aGlzLl9hZGREb29ycygpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgdGhpcy5fbWFwW2ldW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fd2FsbHMgPSB7fTtcbiAgICAgICAgdGhpcy5fbWFwID0gW107XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfZGlnQ2FsbGJhY2soeCwgeSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09IDAgfHwgdmFsdWUgPT0gMikgeyAvKiBlbXB0eSAqL1xuICAgICAgICAgICAgdGhpcy5fbWFwW3hdW3ldID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2R1ZysrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvKiB3YWxsICovXG4gICAgICAgICAgICB0aGlzLl93YWxsc1t4ICsgXCIsXCIgKyB5XSA9IDE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2lzV2FsbENhbGxiYWNrKHgsIHkpIHtcbiAgICAgICAgaWYgKHggPCAwIHx8IHkgPCAwIHx8IHggPj0gdGhpcy5fd2lkdGggfHwgeSA+PSB0aGlzLl9oZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMuX21hcFt4XVt5XSA9PSAxKTtcbiAgICB9XG4gICAgX2NhbkJlRHVnQ2FsbGJhY2soeCwgeSkge1xuICAgICAgICBpZiAoeCA8IDEgfHwgeSA8IDEgfHwgeCArIDEgPj0gdGhpcy5fd2lkdGggfHwgeSArIDEgPj0gdGhpcy5faGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLl9tYXBbeF1beV0gPT0gMSk7XG4gICAgfVxuICAgIF9wcmlvcml0eVdhbGxDYWxsYmFjayh4LCB5KSB7IHRoaXMuX3dhbGxzW3ggKyBcIixcIiArIHldID0gMjsgfVxuICAgIDtcbiAgICBfZmlyc3RSb29tKCkge1xuICAgICAgICBsZXQgY3ggPSBNYXRoLmZsb29yKHRoaXMuX3dpZHRoIC8gMik7XG4gICAgICAgIGxldCBjeSA9IE1hdGguZmxvb3IodGhpcy5faGVpZ2h0IC8gMik7XG4gICAgICAgIGxldCByb29tID0gUm9vbS5jcmVhdGVSYW5kb21DZW50ZXIoY3gsIGN5LCB0aGlzLl9vcHRpb25zKTtcbiAgICAgICAgdGhpcy5fcm9vbXMucHVzaChyb29tKTtcbiAgICAgICAgcm9vbS5jcmVhdGUodGhpcy5fZGlnQ2FsbGJhY2spO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYSBzdWl0YWJsZSB3YWxsXG4gICAgICovXG4gICAgX2ZpbmRXYWxsKCkge1xuICAgICAgICBsZXQgcHJpbzEgPSBbXTtcbiAgICAgICAgbGV0IHByaW8yID0gW107XG4gICAgICAgIGZvciAobGV0IGlkIGluIHRoaXMuX3dhbGxzKSB7XG4gICAgICAgICAgICBsZXQgcHJpbyA9IHRoaXMuX3dhbGxzW2lkXTtcbiAgICAgICAgICAgIGlmIChwcmlvID09IDIpIHtcbiAgICAgICAgICAgICAgICBwcmlvMi5wdXNoKGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHByaW8xLnB1c2goaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBhcnIgPSAocHJpbzIubGVuZ3RoID8gcHJpbzIgOiBwcmlvMSk7XG4gICAgICAgIGlmICghYXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0gLyogbm8gd2FsbHMgOi8gKi9cbiAgICAgICAgbGV0IGlkID0gUk5HLmdldEl0ZW0oYXJyLnNvcnQoKSk7IC8vIHNvcnQgdG8gbWFrZSB0aGUgb3JkZXIgZGV0ZXJtaW5pc3RpY1xuICAgICAgICBkZWxldGUgdGhpcy5fd2FsbHNbaWRdO1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRyaWVzIGFkZGluZyBhIGZlYXR1cmVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbH0gd2FzIHRoaXMgYSBzdWNjZXNzZnVsIHRyeT9cbiAgICAgKi9cbiAgICBfdHJ5RmVhdHVyZSh4LCB5LCBkeCwgZHkpIHtcbiAgICAgICAgbGV0IGZlYXR1cmVOYW1lID0gUk5HLmdldFdlaWdodGVkVmFsdWUodGhpcy5fZmVhdHVyZXMpO1xuICAgICAgICBsZXQgY3RvciA9IEZFQVRVUkVTW2ZlYXR1cmVOYW1lXTtcbiAgICAgICAgbGV0IGZlYXR1cmUgPSBjdG9yLmNyZWF0ZVJhbmRvbUF0KHgsIHksIGR4LCBkeSwgdGhpcy5fb3B0aW9ucyk7XG4gICAgICAgIGlmICghZmVhdHVyZS5pc1ZhbGlkKHRoaXMuX2lzV2FsbENhbGxiYWNrLCB0aGlzLl9jYW5CZUR1Z0NhbGxiYWNrKSkge1xuICAgICAgICAgICAgLy9cdFx0Y29uc29sZS5sb2coXCJub3QgdmFsaWRcIik7XG4gICAgICAgICAgICAvL1x0XHRmZWF0dXJlLmRlYnVnKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZmVhdHVyZS5jcmVhdGUodGhpcy5fZGlnQ2FsbGJhY2spO1xuICAgICAgICAvL1x0ZmVhdHVyZS5kZWJ1ZygpO1xuICAgICAgICBpZiAoZmVhdHVyZSBpbnN0YW5jZW9mIFJvb20pIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb21zLnB1c2goZmVhdHVyZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZlYXR1cmUgaW5zdGFuY2VvZiBDb3JyaWRvcikge1xuICAgICAgICAgICAgZmVhdHVyZS5jcmVhdGVQcmlvcml0eVdhbGxzKHRoaXMuX3ByaW9yaXR5V2FsbENhbGxiYWNrKTtcbiAgICAgICAgICAgIHRoaXMuX2NvcnJpZG9ycy5wdXNoKGZlYXR1cmUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBfcmVtb3ZlU3Vycm91bmRpbmdXYWxscyhjeCwgY3kpIHtcbiAgICAgICAgbGV0IGRlbHRhcyA9IERJUlNbNF07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVsdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZGVsdGEgPSBkZWx0YXNbaV07XG4gICAgICAgICAgICBsZXQgeCA9IGN4ICsgZGVsdGFbMF07XG4gICAgICAgICAgICBsZXQgeSA9IGN5ICsgZGVsdGFbMV07XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fd2FsbHNbeCArIFwiLFwiICsgeV07XG4gICAgICAgICAgICB4ID0gY3ggKyAyICogZGVsdGFbMF07XG4gICAgICAgICAgICB5ID0gY3kgKyAyICogZGVsdGFbMV07XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fd2FsbHNbeCArIFwiLFwiICsgeV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB2ZWN0b3IgaW4gXCJkaWdnaW5nXCIgZGlyZWN0aW9uLCBvciBmYWxzZSwgaWYgdGhpcyBkb2VzIG5vdCBleGlzdCAob3IgaXMgbm90IHVuaXF1ZSlcbiAgICAgKi9cbiAgICBfZ2V0RGlnZ2luZ0RpcmVjdGlvbihjeCwgY3kpIHtcbiAgICAgICAgaWYgKGN4IDw9IDAgfHwgY3kgPD0gMCB8fCBjeCA+PSB0aGlzLl93aWR0aCAtIDEgfHwgY3kgPj0gdGhpcy5faGVpZ2h0IC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgIGxldCBkZWx0YXMgPSBESVJTWzRdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlbHRhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGRlbHRhID0gZGVsdGFzW2ldO1xuICAgICAgICAgICAgbGV0IHggPSBjeCArIGRlbHRhWzBdO1xuICAgICAgICAgICAgbGV0IHkgPSBjeSArIGRlbHRhWzFdO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9tYXBbeF1beV0pIHsgLyogdGhlcmUgYWxyZWFkeSBpcyBhbm90aGVyIGVtcHR5IG5laWdoYm9yISAqL1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRlbHRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qIG5vIGVtcHR5IG5laWdoYm9yICovXG4gICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gWy1yZXN1bHRbMF0sIC1yZXN1bHRbMV1dO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kIGVtcHR5IHNwYWNlcyBzdXJyb3VuZGluZyByb29tcywgYW5kIGFwcGx5IGRvb3JzLlxuICAgICAqL1xuICAgIF9hZGREb29ycygpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLl9tYXA7XG4gICAgICAgIGZ1bmN0aW9uIGlzV2FsbENhbGxiYWNrKHgsIHkpIHtcbiAgICAgICAgICAgIHJldHVybiAoZGF0YVt4XVt5XSA9PSAxKTtcbiAgICAgICAgfVxuICAgICAgICA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcm9vbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByb29tID0gdGhpcy5fcm9vbXNbaV07XG4gICAgICAgICAgICByb29tLmNsZWFyRG9vcnMoKTtcbiAgICAgICAgICAgIHJvb20uYWRkRG9vcnMoaXNXYWxsQ2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IE1hcCBmcm9tIFwiLi9tYXAuanNcIjtcbmltcG9ydCBSTkcgZnJvbSBcIi4uL3JuZy5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgUmVjdXJzaXZlbHkgZGl2aWRlZCBtYXplLCBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01hemVfZ2VuZXJhdGlvbl9hbGdvcml0aG0jUmVjdXJzaXZlX2RpdmlzaW9uX21ldGhvZFxuICogQGF1Z21lbnRzIFJPVC5NYXBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGl2aWRlZE1hemUgZXh0ZW5kcyBNYXAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLl9zdGFjayA9IFtdO1xuICAgICAgICB0aGlzLl9tYXAgPSBbXTtcbiAgICB9XG4gICAgY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCB3ID0gdGhpcy5fd2lkdGg7XG4gICAgICAgIGxldCBoID0gdGhpcy5faGVpZ2h0O1xuICAgICAgICB0aGlzLl9tYXAgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJvcmRlciA9IChpID09IDAgfHwgaiA9PSAwIHx8IGkgKyAxID09IHcgfHwgaiArIDEgPT0gaCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwW2ldLnB1c2goYm9yZGVyID8gMSA6IDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0YWNrID0gW1xuICAgICAgICAgICAgWzEsIDEsIHcgLSAyLCBoIC0gMl1cbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHc7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhpLCBqLCB0aGlzLl9tYXBbaV1bal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hcCA9IFtdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX3Byb2Nlc3MoKSB7XG4gICAgICAgIHdoaWxlICh0aGlzLl9zdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCByb29tID0gdGhpcy5fc3RhY2suc2hpZnQoKTsgLyogW2xlZnQsIHRvcCwgcmlnaHQsIGJvdHRvbV0gKi9cbiAgICAgICAgICAgIHRoaXMuX3BhcnRpdGlvblJvb20ocm9vbSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3BhcnRpdGlvblJvb20ocm9vbSkge1xuICAgICAgICBsZXQgYXZhaWxYID0gW107XG4gICAgICAgIGxldCBhdmFpbFkgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHJvb21bMF0gKyAxOyBpIDwgcm9vbVsyXTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdG9wID0gdGhpcy5fbWFwW2ldW3Jvb21bMV0gLSAxXTtcbiAgICAgICAgICAgIGxldCBib3R0b20gPSB0aGlzLl9tYXBbaV1bcm9vbVszXSArIDFdO1xuICAgICAgICAgICAgaWYgKHRvcCAmJiBib3R0b20gJiYgIShpICUgMikpIHtcbiAgICAgICAgICAgICAgICBhdmFpbFgucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBqID0gcm9vbVsxXSArIDE7IGogPCByb29tWzNdOyBqKyspIHtcbiAgICAgICAgICAgIGxldCBsZWZ0ID0gdGhpcy5fbWFwW3Jvb21bMF0gLSAxXVtqXTtcbiAgICAgICAgICAgIGxldCByaWdodCA9IHRoaXMuX21hcFtyb29tWzJdICsgMV1bal07XG4gICAgICAgICAgICBpZiAobGVmdCAmJiByaWdodCAmJiAhKGogJSAyKSkge1xuICAgICAgICAgICAgICAgIGF2YWlsWS5wdXNoKGopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghYXZhaWxYLmxlbmd0aCB8fCAhYXZhaWxZLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB4ID0gUk5HLmdldEl0ZW0oYXZhaWxYKTtcbiAgICAgICAgbGV0IHkgPSBSTkcuZ2V0SXRlbShhdmFpbFkpO1xuICAgICAgICB0aGlzLl9tYXBbeF1beV0gPSAxO1xuICAgICAgICBsZXQgd2FsbHMgPSBbXTtcbiAgICAgICAgbGV0IHcgPSBbXTtcbiAgICAgICAgd2FsbHMucHVzaCh3KTsgLyogbGVmdCBwYXJ0ICovXG4gICAgICAgIGZvciAobGV0IGkgPSByb29tWzBdOyBpIDwgeDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXBbaV1beV0gPSAxO1xuICAgICAgICAgICAgaWYgKGkgJSAyKVxuICAgICAgICAgICAgICAgIHcucHVzaChbaSwgeV0pO1xuICAgICAgICB9XG4gICAgICAgIHcgPSBbXTtcbiAgICAgICAgd2FsbHMucHVzaCh3KTsgLyogcmlnaHQgcGFydCAqL1xuICAgICAgICBmb3IgKGxldCBpID0geCArIDE7IGkgPD0gcm9vbVsyXTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXBbaV1beV0gPSAxO1xuICAgICAgICAgICAgaWYgKGkgJSAyKVxuICAgICAgICAgICAgICAgIHcucHVzaChbaSwgeV0pO1xuICAgICAgICB9XG4gICAgICAgIHcgPSBbXTtcbiAgICAgICAgd2FsbHMucHVzaCh3KTsgLyogdG9wIHBhcnQgKi9cbiAgICAgICAgZm9yIChsZXQgaiA9IHJvb21bMV07IGogPCB5OyBqKyspIHtcbiAgICAgICAgICAgIHRoaXMuX21hcFt4XVtqXSA9IDE7XG4gICAgICAgICAgICBpZiAoaiAlIDIpXG4gICAgICAgICAgICAgICAgdy5wdXNoKFt4LCBqXSk7XG4gICAgICAgIH1cbiAgICAgICAgdyA9IFtdO1xuICAgICAgICB3YWxscy5wdXNoKHcpOyAvKiBib3R0b20gcGFydCAqL1xuICAgICAgICBmb3IgKGxldCBqID0geSArIDE7IGogPD0gcm9vbVszXTsgaisrKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXBbeF1bal0gPSAxO1xuICAgICAgICAgICAgaWYgKGogJSAyKVxuICAgICAgICAgICAgICAgIHcucHVzaChbeCwgal0pO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzb2xpZCA9IFJORy5nZXRJdGVtKHdhbGxzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3YWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHcgPSB3YWxsc1tpXTtcbiAgICAgICAgICAgIGlmICh3ID09IHNvbGlkKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgaG9sZSA9IFJORy5nZXRJdGVtKHcpO1xuICAgICAgICAgICAgdGhpcy5fbWFwW2hvbGVbMF1dW2hvbGVbMV1dID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdGFjay5wdXNoKFtyb29tWzBdLCByb29tWzFdLCB4IC0gMSwgeSAtIDFdKTsgLyogbGVmdCB0b3AgKi9cbiAgICAgICAgdGhpcy5fc3RhY2sucHVzaChbeCArIDEsIHJvb21bMV0sIHJvb21bMl0sIHkgLSAxXSk7IC8qIHJpZ2h0IHRvcCAqL1xuICAgICAgICB0aGlzLl9zdGFjay5wdXNoKFtyb29tWzBdLCB5ICsgMSwgeCAtIDEsIHJvb21bM11dKTsgLyogbGVmdCBib3R0b20gKi9cbiAgICAgICAgdGhpcy5fc3RhY2sucHVzaChbeCArIDEsIHkgKyAxLCByb29tWzJdLCByb29tWzNdXSk7IC8qIHJpZ2h0IGJvdHRvbSAqL1xuICAgIH1cbn1cbiIsImltcG9ydCBNYXAgZnJvbSBcIi4vbWFwLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBEdW5nZW9uIG1hcDogaGFzIHJvb21zIGFuZCBjb3JyaWRvcnNcbiAqIEBhdWdtZW50cyBST1QuTWFwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIER1bmdlb24gZXh0ZW5kcyBNYXAge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMuX3Jvb21zID0gW107XG4gICAgICAgIHRoaXMuX2NvcnJpZG9ycyA9IFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGdlbmVyYXRlZCByb29tc1xuICAgICAqIEByZXR1cm5zIHtST1QuTWFwLkZlYXR1cmUuUm9vbVtdfVxuICAgICAqL1xuICAgIGdldFJvb21zKCkgeyByZXR1cm4gdGhpcy5fcm9vbXM7IH1cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGdlbmVyYXRlZCBjb3JyaWRvcnNcbiAgICAgKiBAcmV0dXJucyB7Uk9ULk1hcC5GZWF0dXJlLkNvcnJpZG9yW119XG4gICAgICovXG4gICAgZ2V0Q29ycmlkb3JzKCkgeyByZXR1cm4gdGhpcy5fY29ycmlkb3JzOyB9XG59XG4iLCJpbXBvcnQgTWFwIGZyb20gXCIuL21hcC5qc1wiO1xuaW1wb3J0IFJORyBmcm9tIFwiLi4vcm5nLmpzXCI7XG4vKipcbiAqIEpvaW4gbGlzdHMgd2l0aCBcImlcIiBhbmQgXCJpKzFcIlxuICovXG5mdW5jdGlvbiBhZGRUb0xpc3QoaSwgTCwgUikge1xuICAgIFJbTFtpICsgMV1dID0gUltpXTtcbiAgICBMW1JbaV1dID0gTFtpICsgMV07XG4gICAgUltpXSA9IGkgKyAxO1xuICAgIExbaSArIDFdID0gaTtcbn1cbi8qKlxuICogUmVtb3ZlIFwiaVwiIGZyb20gaXRzIGxpc3RcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlRnJvbUxpc3QoaSwgTCwgUikge1xuICAgIFJbTFtpXV0gPSBSW2ldO1xuICAgIExbUltpXV0gPSBMW2ldO1xuICAgIFJbaV0gPSBpO1xuICAgIExbaV0gPSBpO1xufVxuLyoqXG4gKiBNYXplIGdlbmVyYXRvciAtIEVsbGVyJ3MgYWxnb3JpdGhtXG4gKiBTZWUgaHR0cDovL2hvbWVwYWdlcy5jd2kubmwvfnRyb21wL21hemUuaHRtbCBmb3IgZXhwbGFuYXRpb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxsZXJNYXplIGV4dGVuZHMgTWFwIHtcbiAgICBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IG1hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XG4gICAgICAgIGxldCB3ID0gTWF0aC5jZWlsKCh0aGlzLl93aWR0aCAtIDIpIC8gMik7XG4gICAgICAgIGxldCByYW5kID0gOSAvIDI0O1xuICAgICAgICBsZXQgTCA9IFtdO1xuICAgICAgICBsZXQgUiA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHc7IGkrKykge1xuICAgICAgICAgICAgTC5wdXNoKGkpO1xuICAgICAgICAgICAgUi5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICAgIEwucHVzaCh3IC0gMSk7IC8qIGZha2Ugc3RvcC1ibG9jayBhdCB0aGUgcmlnaHQgc2lkZSAqL1xuICAgICAgICBsZXQgajtcbiAgICAgICAgZm9yIChqID0gMTsgaiArIDMgPCB0aGlzLl9oZWlnaHQ7IGogKz0gMikge1xuICAgICAgICAgICAgLyogb25lIHJvdyAqL1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3OyBpKyspIHtcbiAgICAgICAgICAgICAgICAvKiBjZWxsIGNvb3JkcyAod2lsbCBiZSBhbHdheXMgZW1wdHkpICovXG4gICAgICAgICAgICAgICAgbGV0IHggPSAyICogaSArIDE7XG4gICAgICAgICAgICAgICAgbGV0IHkgPSBqO1xuICAgICAgICAgICAgICAgIG1hcFt4XVt5XSA9IDA7XG4gICAgICAgICAgICAgICAgLyogcmlnaHQgY29ubmVjdGlvbiAqL1xuICAgICAgICAgICAgICAgIGlmIChpICE9IExbaSArIDFdICYmIFJORy5nZXRVbmlmb3JtKCkgPiByYW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZFRvTGlzdChpLCBMLCBSKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwW3ggKyAxXVt5XSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qIGJvdHRvbSBjb25uZWN0aW9uICovXG4gICAgICAgICAgICAgICAgaWYgKGkgIT0gTFtpXSAmJiBSTkcuZ2V0VW5pZm9ybSgpID4gcmFuZCkge1xuICAgICAgICAgICAgICAgICAgICAvKiByZW1vdmUgY29ubmVjdGlvbiAqL1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVGcm9tTGlzdChpLCBMLCBSKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIGNyZWF0ZSBjb25uZWN0aW9uICovXG4gICAgICAgICAgICAgICAgICAgIG1hcFt4XVt5ICsgMV0gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKiBsYXN0IHJvdyAqL1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHc7IGkrKykge1xuICAgICAgICAgICAgLyogY2VsbCBjb29yZHMgKHdpbGwgYmUgYWx3YXlzIGVtcHR5KSAqL1xuICAgICAgICAgICAgbGV0IHggPSAyICogaSArIDE7XG4gICAgICAgICAgICBsZXQgeSA9IGo7XG4gICAgICAgICAgICBtYXBbeF1beV0gPSAwO1xuICAgICAgICAgICAgLyogcmlnaHQgY29ubmVjdGlvbiAqL1xuICAgICAgICAgICAgaWYgKGkgIT0gTFtpICsgMV0gJiYgKGkgPT0gTFtpXSB8fCBSTkcuZ2V0VW5pZm9ybSgpID4gcmFuZCkpIHtcbiAgICAgICAgICAgICAgICAvKiBkaWcgcmlnaHQgYWxzbyBpZiB0aGUgY2VsbCBpcyBzZXBhcmF0ZWQsIHNvIGl0IGdldHMgY29ubmVjdGVkIHRvIHRoZSByZXN0IG9mIG1hemUgKi9cbiAgICAgICAgICAgICAgICBhZGRUb0xpc3QoaSwgTCwgUik7XG4gICAgICAgICAgICAgICAgbWFwW3ggKyAxXVt5XSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZW1vdmVGcm9tTGlzdChpLCBMLCBSKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3dpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhpLCBqLCBtYXBbaV1bal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCBSTkcgZnJvbSBcIi4uL3JuZy5qc1wiO1xuO1xuLyoqXG4gKiBAY2xhc3MgRHVuZ2VvbiBmZWF0dXJlOyBoYXMgb3duIC5jcmVhdGUoKSBtZXRob2RcbiAqL1xuY2xhc3MgRmVhdHVyZSB7XG59XG4vKipcbiAqIEBjbGFzcyBSb29tXG4gKiBAYXVnbWVudHMgUk9ULk1hcC5GZWF0dXJlXG4gKiBAcGFyYW0ge2ludH0geDFcbiAqIEBwYXJhbSB7aW50fSB5MVxuICogQHBhcmFtIHtpbnR9IHgyXG4gKiBAcGFyYW0ge2ludH0geTJcbiAqIEBwYXJhbSB7aW50fSBbZG9vclhdXG4gKiBAcGFyYW0ge2ludH0gW2Rvb3JZXVxuICovXG5leHBvcnQgY2xhc3MgUm9vbSBleHRlbmRzIEZlYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKHgxLCB5MSwgeDIsIHkyLCBkb29yWCwgZG9vclkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5feDEgPSB4MTtcbiAgICAgICAgdGhpcy5feTEgPSB5MTtcbiAgICAgICAgdGhpcy5feDIgPSB4MjtcbiAgICAgICAgdGhpcy5feTIgPSB5MjtcbiAgICAgICAgdGhpcy5fZG9vcnMgPSB7fTtcbiAgICAgICAgaWYgKGRvb3JYICE9PSB1bmRlZmluZWQgJiYgZG9vclkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5hZGREb29yKGRvb3JYLCBkb29yWSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgO1xuICAgIC8qKlxuICAgICAqIFJvb20gb2YgcmFuZG9tIHNpemUsIHdpdGggYSBnaXZlbiBkb29ycyBhbmQgZGlyZWN0aW9uXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZVJhbmRvbUF0KHgsIHksIGR4LCBkeSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgbWluID0gb3B0aW9ucy5yb29tV2lkdGhbMF07XG4gICAgICAgIGxldCBtYXggPSBvcHRpb25zLnJvb21XaWR0aFsxXTtcbiAgICAgICAgbGV0IHdpZHRoID0gUk5HLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgICBtaW4gPSBvcHRpb25zLnJvb21IZWlnaHRbMF07XG4gICAgICAgIG1heCA9IG9wdGlvbnMucm9vbUhlaWdodFsxXTtcbiAgICAgICAgbGV0IGhlaWdodCA9IFJORy5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcbiAgICAgICAgaWYgKGR4ID09IDEpIHsgLyogdG8gdGhlIHJpZ2h0ICovXG4gICAgICAgICAgICBsZXQgeTIgPSB5IC0gTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogaGVpZ2h0KTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcyh4ICsgMSwgeTIsIHggKyB3aWR0aCwgeTIgKyBoZWlnaHQgLSAxLCB4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZHggPT0gLTEpIHsgLyogdG8gdGhlIGxlZnQgKi9cbiAgICAgICAgICAgIGxldCB5MiA9IHkgLSBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiBoZWlnaHQpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHggLSB3aWR0aCwgeTIsIHggLSAxLCB5MiArIGhlaWdodCAtIDEsIHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkeSA9PSAxKSB7IC8qIHRvIHRoZSBib3R0b20gKi9cbiAgICAgICAgICAgIGxldCB4MiA9IHggLSBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiB3aWR0aCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMoeDIsIHkgKyAxLCB4MiArIHdpZHRoIC0gMSwgeSArIGhlaWdodCwgeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGR5ID09IC0xKSB7IC8qIHRvIHRoZSB0b3AgKi9cbiAgICAgICAgICAgIGxldCB4MiA9IHggLSBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiB3aWR0aCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMoeDIsIHkgLSBoZWlnaHQsIHgyICsgd2lkdGggLSAxLCB5IC0gMSwgeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZHggb3IgZHkgbXVzdCBiZSAxIG9yIC0xXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSb29tIG9mIHJhbmRvbSBzaXplLCBwb3NpdGlvbmVkIGFyb3VuZCBjZW50ZXIgY29vcmRzXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZVJhbmRvbUNlbnRlcihjeCwgY3ksIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IG1pbiA9IG9wdGlvbnMucm9vbVdpZHRoWzBdO1xuICAgICAgICBsZXQgbWF4ID0gb3B0aW9ucy5yb29tV2lkdGhbMV07XG4gICAgICAgIGxldCB3aWR0aCA9IFJORy5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcbiAgICAgICAgbWluID0gb3B0aW9ucy5yb29tSGVpZ2h0WzBdO1xuICAgICAgICBtYXggPSBvcHRpb25zLnJvb21IZWlnaHRbMV07XG4gICAgICAgIGxldCBoZWlnaHQgPSBSTkcuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICAgIGxldCB4MSA9IGN4IC0gTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogd2lkdGgpO1xuICAgICAgICBsZXQgeTEgPSBjeSAtIE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIGhlaWdodCk7XG4gICAgICAgIGxldCB4MiA9IHgxICsgd2lkdGggLSAxO1xuICAgICAgICBsZXQgeTIgPSB5MSArIGhlaWdodCAtIDE7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcyh4MSwgeTEsIHgyLCB5Mik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJvb20gb2YgcmFuZG9tIHNpemUgd2l0aGluIGEgZ2l2ZW4gZGltZW5zaW9uc1xuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGVSYW5kb20oYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IG1pbiA9IG9wdGlvbnMucm9vbVdpZHRoWzBdO1xuICAgICAgICBsZXQgbWF4ID0gb3B0aW9ucy5yb29tV2lkdGhbMV07XG4gICAgICAgIGxldCB3aWR0aCA9IFJORy5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcbiAgICAgICAgbWluID0gb3B0aW9ucy5yb29tSGVpZ2h0WzBdO1xuICAgICAgICBtYXggPSBvcHRpb25zLnJvb21IZWlnaHRbMV07XG4gICAgICAgIGxldCBoZWlnaHQgPSBSTkcuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICAgIGxldCBsZWZ0ID0gYXZhaWxXaWR0aCAtIHdpZHRoIC0gMTtcbiAgICAgICAgbGV0IHRvcCA9IGF2YWlsSGVpZ2h0IC0gaGVpZ2h0IC0gMTtcbiAgICAgICAgbGV0IHgxID0gMSArIE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIGxlZnQpO1xuICAgICAgICBsZXQgeTEgPSAxICsgTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogdG9wKTtcbiAgICAgICAgbGV0IHgyID0geDEgKyB3aWR0aCAtIDE7XG4gICAgICAgIGxldCB5MiA9IHkxICsgaGVpZ2h0IC0gMTtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHgxLCB5MSwgeDIsIHkyKTtcbiAgICB9XG4gICAgYWRkRG9vcih4LCB5KSB7XG4gICAgICAgIHRoaXMuX2Rvb3JzW3ggKyBcIixcIiArIHldID0gMTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259XG4gICAgICovXG4gICAgZ2V0RG9vcnMoY2IpIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX2Rvb3JzKSB7XG4gICAgICAgICAgICBsZXQgcGFydHMgPSBrZXkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgY2IocGFyc2VJbnQocGFydHNbMF0pLCBwYXJzZUludChwYXJ0c1sxXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjbGVhckRvb3JzKCkge1xuICAgICAgICB0aGlzLl9kb29ycyA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkRG9vcnMoaXNXYWxsQ2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLl94MSAtIDE7XG4gICAgICAgIGxldCByaWdodCA9IHRoaXMuX3gyICsgMTtcbiAgICAgICAgbGV0IHRvcCA9IHRoaXMuX3kxIC0gMTtcbiAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMuX3kyICsgMTtcbiAgICAgICAgZm9yIChsZXQgeCA9IGxlZnQ7IHggPD0gcmlnaHQ7IHgrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IHRvcDsgeSA8PSBib3R0b207IHkrKykge1xuICAgICAgICAgICAgICAgIGlmICh4ICE9IGxlZnQgJiYgeCAhPSByaWdodCAmJiB5ICE9IHRvcCAmJiB5ICE9IGJvdHRvbSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzV2FsbENhbGxiYWNrKHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFkZERvb3IoeCwgeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRlYnVnKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInJvb21cIiwgdGhpcy5feDEsIHRoaXMuX3kxLCB0aGlzLl94MiwgdGhpcy5feTIpO1xuICAgIH1cbiAgICBpc1ZhbGlkKGlzV2FsbENhbGxiYWNrLCBjYW5CZUR1Z0NhbGxiYWNrKSB7XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5feDEgLSAxO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLl94MiArIDE7XG4gICAgICAgIGxldCB0b3AgPSB0aGlzLl95MSAtIDE7XG4gICAgICAgIGxldCBib3R0b20gPSB0aGlzLl95MiArIDE7XG4gICAgICAgIGZvciAobGV0IHggPSBsZWZ0OyB4IDw9IHJpZ2h0OyB4KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSB0b3A7IHkgPD0gYm90dG9tOyB5KyspIHtcbiAgICAgICAgICAgICAgICBpZiAoeCA9PSBsZWZ0IHx8IHggPT0gcmlnaHQgfHwgeSA9PSB0b3AgfHwgeSA9PSBib3R0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1dhbGxDYWxsYmFjayh4LCB5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbkJlRHVnQ2FsbGJhY2soeCwgeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZGlnQ2FsbGJhY2sgRGlnIGNhbGxiYWNrIHdpdGggYSBzaWduYXR1cmUgKHgsIHksIHZhbHVlKS4gVmFsdWVzOiAwID0gZW1wdHksIDEgPSB3YWxsLCAyID0gZG9vci4gTXVsdGlwbGUgZG9vcnMgYXJlIGFsbG93ZWQuXG4gICAgICovXG4gICAgY3JlYXRlKGRpZ0NhbGxiYWNrKSB7XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5feDEgLSAxO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLl94MiArIDE7XG4gICAgICAgIGxldCB0b3AgPSB0aGlzLl95MSAtIDE7XG4gICAgICAgIGxldCBib3R0b20gPSB0aGlzLl95MiArIDE7XG4gICAgICAgIGxldCB2YWx1ZSA9IDA7XG4gICAgICAgIGZvciAobGV0IHggPSBsZWZ0OyB4IDw9IHJpZ2h0OyB4KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSB0b3A7IHkgPD0gYm90dG9tOyB5KyspIHtcbiAgICAgICAgICAgICAgICBpZiAoeCArIFwiLFwiICsgeSBpbiB0aGlzLl9kb29ycykge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHggPT0gbGVmdCB8fCB4ID09IHJpZ2h0IHx8IHkgPT0gdG9wIHx8IHkgPT0gYm90dG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGlnQ2FsbGJhY2soeCwgeSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGdldENlbnRlcigpIHtcbiAgICAgICAgcmV0dXJuIFtNYXRoLnJvdW5kKCh0aGlzLl94MSArIHRoaXMuX3gyKSAvIDIpLCBNYXRoLnJvdW5kKCh0aGlzLl95MSArIHRoaXMuX3kyKSAvIDIpXTtcbiAgICB9XG4gICAgZ2V0TGVmdCgpIHsgcmV0dXJuIHRoaXMuX3gxOyB9XG4gICAgZ2V0UmlnaHQoKSB7IHJldHVybiB0aGlzLl94MjsgfVxuICAgIGdldFRvcCgpIHsgcmV0dXJuIHRoaXMuX3kxOyB9XG4gICAgZ2V0Qm90dG9tKCkgeyByZXR1cm4gdGhpcy5feTI7IH1cbn1cbi8qKlxuICogQGNsYXNzIENvcnJpZG9yXG4gKiBAYXVnbWVudHMgUk9ULk1hcC5GZWF0dXJlXG4gKiBAcGFyYW0ge2ludH0gc3RhcnRYXG4gKiBAcGFyYW0ge2ludH0gc3RhcnRZXG4gKiBAcGFyYW0ge2ludH0gZW5kWFxuICogQHBhcmFtIHtpbnR9IGVuZFlcbiAqL1xuZXhwb3J0IGNsYXNzIENvcnJpZG9yIGV4dGVuZHMgRmVhdHVyZSB7XG4gICAgY29uc3RydWN0b3Ioc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fc3RhcnRYID0gc3RhcnRYO1xuICAgICAgICB0aGlzLl9zdGFydFkgPSBzdGFydFk7XG4gICAgICAgIHRoaXMuX2VuZFggPSBlbmRYO1xuICAgICAgICB0aGlzLl9lbmRZID0gZW5kWTtcbiAgICAgICAgdGhpcy5fZW5kc1dpdGhBV2FsbCA9IHRydWU7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGVSYW5kb21BdCh4LCB5LCBkeCwgZHksIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IG1pbiA9IG9wdGlvbnMuY29ycmlkb3JMZW5ndGhbMF07XG4gICAgICAgIGxldCBtYXggPSBvcHRpb25zLmNvcnJpZG9yTGVuZ3RoWzFdO1xuICAgICAgICBsZXQgbGVuZ3RoID0gUk5HLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoeCwgeSwgeCArIGR4ICogbGVuZ3RoLCB5ICsgZHkgKiBsZW5ndGgpO1xuICAgIH1cbiAgICBkZWJ1ZygpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJjb3JyaWRvclwiLCB0aGlzLl9zdGFydFgsIHRoaXMuX3N0YXJ0WSwgdGhpcy5fZW5kWCwgdGhpcy5fZW5kWSk7XG4gICAgfVxuICAgIGlzVmFsaWQoaXNXYWxsQ2FsbGJhY2ssIGNhbkJlRHVnQ2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHN4ID0gdGhpcy5fc3RhcnRYO1xuICAgICAgICBsZXQgc3kgPSB0aGlzLl9zdGFydFk7XG4gICAgICAgIGxldCBkeCA9IHRoaXMuX2VuZFggLSBzeDtcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5fZW5kWSAtIHN5O1xuICAgICAgICBsZXQgbGVuZ3RoID0gMSArIE1hdGgubWF4KE1hdGguYWJzKGR4KSwgTWF0aC5hYnMoZHkpKTtcbiAgICAgICAgaWYgKGR4KSB7XG4gICAgICAgICAgICBkeCA9IGR4IC8gTWF0aC5hYnMoZHgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkeSkge1xuICAgICAgICAgICAgZHkgPSBkeSAvIE1hdGguYWJzKGR5KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbnggPSBkeTtcbiAgICAgICAgbGV0IG55ID0gLWR4O1xuICAgICAgICBsZXQgb2sgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgeCA9IHN4ICsgaSAqIGR4O1xuICAgICAgICAgICAgbGV0IHkgPSBzeSArIGkgKiBkeTtcbiAgICAgICAgICAgIGlmICghY2FuQmVEdWdDYWxsYmFjayh4LCB5KSkge1xuICAgICAgICAgICAgICAgIG9rID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzV2FsbENhbGxiYWNrKHggKyBueCwgeSArIG55KSkge1xuICAgICAgICAgICAgICAgIG9rID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzV2FsbENhbGxiYWNrKHggLSBueCwgeSAtIG55KSkge1xuICAgICAgICAgICAgICAgIG9rID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gaTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmRYID0geCAtIGR4O1xuICAgICAgICAgICAgICAgIHRoaXMuX2VuZFkgPSB5IC0gZHk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHRoZSBsZW5ndGggZGVnZW5lcmF0ZWQsIHRoaXMgY29ycmlkb3IgbWlnaHQgYmUgaW52YWxpZFxuICAgICAgICAgKi9cbiAgICAgICAgLyogbm90IHN1cHBvcnRlZCAqL1xuICAgICAgICBpZiAobGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKiBsZW5ndGggMSBhbGxvd2VkIG9ubHkgaWYgdGhlIG5leHQgc3BhY2UgaXMgZW1wdHkgKi9cbiAgICAgICAgaWYgKGxlbmd0aCA9PSAxICYmIGlzV2FsbENhbGxiYWNrKHRoaXMuX2VuZFggKyBkeCwgdGhpcy5fZW5kWSArIGR5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXZSBkbyBub3Qgd2FudCB0aGUgY29ycmlkb3IgdG8gY3Jhc2ggaW50byBhIGNvcm5lciBvZiBhIHJvb207XG4gICAgICAgICAqIGlmIGFueSBvZiB0aGUgZW5kaW5nIGNvcm5lcnMgaXMgZW1wdHksIHRoZSBOKzF0aCBjZWxsIG9mIHRoaXMgY29ycmlkb3IgbXVzdCBiZSBlbXB0eSB0b28uXG4gICAgICAgICAqXG4gICAgICAgICAqIFNpdHVhdGlvbjpcbiAgICAgICAgICogIyMjIyMjIzFcbiAgICAgICAgICogLi4uLi4uLj9cbiAgICAgICAgICogIyMjIyMjIzJcbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIGNvcnJpZG9yIHdhcyBkdWcgZnJvbSBsZWZ0IHRvIHJpZ2h0LlxuICAgICAgICAgKiAxLCAyIC0gcHJvYmxlbWF0aWMgY29ybmVycywgPyA9IE4rMXRoIGNlbGwgKG5vdCBkdWcpXG4gICAgICAgICAqL1xuICAgICAgICBsZXQgZmlyc3RDb3JuZXJCYWQgPSAhaXNXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIGR4ICsgbngsIHRoaXMuX2VuZFkgKyBkeSArIG55KTtcbiAgICAgICAgbGV0IHNlY29uZENvcm5lckJhZCA9ICFpc1dhbGxDYWxsYmFjayh0aGlzLl9lbmRYICsgZHggLSBueCwgdGhpcy5fZW5kWSArIGR5IC0gbnkpO1xuICAgICAgICB0aGlzLl9lbmRzV2l0aEFXYWxsID0gaXNXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIGR4LCB0aGlzLl9lbmRZICsgZHkpO1xuICAgICAgICBpZiAoKGZpcnN0Q29ybmVyQmFkIHx8IHNlY29uZENvcm5lckJhZCkgJiYgdGhpcy5fZW5kc1dpdGhBV2FsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBkaWdDYWxsYmFjayBEaWcgY2FsbGJhY2sgd2l0aCBhIHNpZ25hdHVyZSAoeCwgeSwgdmFsdWUpLiBWYWx1ZXM6IDAgPSBlbXB0eS5cbiAgICAgKi9cbiAgICBjcmVhdGUoZGlnQ2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHN4ID0gdGhpcy5fc3RhcnRYO1xuICAgICAgICBsZXQgc3kgPSB0aGlzLl9zdGFydFk7XG4gICAgICAgIGxldCBkeCA9IHRoaXMuX2VuZFggLSBzeDtcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5fZW5kWSAtIHN5O1xuICAgICAgICBsZXQgbGVuZ3RoID0gMSArIE1hdGgubWF4KE1hdGguYWJzKGR4KSwgTWF0aC5hYnMoZHkpKTtcbiAgICAgICAgaWYgKGR4KSB7XG4gICAgICAgICAgICBkeCA9IGR4IC8gTWF0aC5hYnMoZHgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkeSkge1xuICAgICAgICAgICAgZHkgPSBkeSAvIE1hdGguYWJzKGR5KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgeCA9IHN4ICsgaSAqIGR4O1xuICAgICAgICAgICAgbGV0IHkgPSBzeSArIGkgKiBkeTtcbiAgICAgICAgICAgIGRpZ0NhbGxiYWNrKHgsIHksIDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjcmVhdGVQcmlvcml0eVdhbGxzKHByaW9yaXR5V2FsbENhbGxiYWNrKSB7XG4gICAgICAgIGlmICghdGhpcy5fZW5kc1dpdGhBV2FsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzeCA9IHRoaXMuX3N0YXJ0WDtcbiAgICAgICAgbGV0IHN5ID0gdGhpcy5fc3RhcnRZO1xuICAgICAgICBsZXQgZHggPSB0aGlzLl9lbmRYIC0gc3g7XG4gICAgICAgIGxldCBkeSA9IHRoaXMuX2VuZFkgLSBzeTtcbiAgICAgICAgaWYgKGR4KSB7XG4gICAgICAgICAgICBkeCA9IGR4IC8gTWF0aC5hYnMoZHgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkeSkge1xuICAgICAgICAgICAgZHkgPSBkeSAvIE1hdGguYWJzKGR5KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbnggPSBkeTtcbiAgICAgICAgbGV0IG55ID0gLWR4O1xuICAgICAgICBwcmlvcml0eVdhbGxDYWxsYmFjayh0aGlzLl9lbmRYICsgZHgsIHRoaXMuX2VuZFkgKyBkeSk7XG4gICAgICAgIHByaW9yaXR5V2FsbENhbGxiYWNrKHRoaXMuX2VuZFggKyBueCwgdGhpcy5fZW5kWSArIG55KTtcbiAgICAgICAgcHJpb3JpdHlXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCAtIG54LCB0aGlzLl9lbmRZIC0gbnkpO1xuICAgIH1cbn1cbiIsImltcG9ydCBNYXAgZnJvbSBcIi4vbWFwLmpzXCI7XG5pbXBvcnQgUk5HIGZyb20gXCIuLi9ybmcuanNcIjtcbi8qKlxuICogSWNleSdzIE1hemUgZ2VuZXJhdG9yXG4gKiBTZWUgaHR0cDovL3d3dy5yb2d1ZWJhc2luLnJvZ3VlbGlrZWRldmVsb3BtZW50Lm9yZy9pbmRleC5waHA/dGl0bGU9U2ltcGxlX21hemUgZm9yIGV4cGxhbmF0aW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEljZXlNYXplIGV4dGVuZHMgTWFwIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCByZWd1bGFyaXR5ID0gMCkge1xuICAgICAgICBzdXBlcih3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5fcmVndWxhcml0eSA9IHJlZ3VsYXJpdHk7XG4gICAgICAgIHRoaXMuX21hcCA9IFtdO1xuICAgIH1cbiAgICBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5fd2lkdGg7XG4gICAgICAgIGxldCBoZWlnaHQgPSB0aGlzLl9oZWlnaHQ7XG4gICAgICAgIGxldCBtYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xuICAgICAgICB3aWR0aCAtPSAod2lkdGggJSAyID8gMSA6IDIpO1xuICAgICAgICBoZWlnaHQgLT0gKGhlaWdodCAlIDIgPyAxIDogMik7XG4gICAgICAgIGxldCBjeCA9IDA7XG4gICAgICAgIGxldCBjeSA9IDA7XG4gICAgICAgIGxldCBueCA9IDA7XG4gICAgICAgIGxldCBueSA9IDA7XG4gICAgICAgIGxldCBkb25lID0gMDtcbiAgICAgICAgbGV0IGJsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IGRpcnMgPSBbXG4gICAgICAgICAgICBbMCwgMF0sXG4gICAgICAgICAgICBbMCwgMF0sXG4gICAgICAgICAgICBbMCwgMF0sXG4gICAgICAgICAgICBbMCwgMF1cbiAgICAgICAgXTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgY3ggPSAxICsgMiAqIE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqICh3aWR0aCAtIDEpIC8gMik7XG4gICAgICAgICAgICBjeSA9IDEgKyAyICogTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogKGhlaWdodCAtIDEpIC8gMik7XG4gICAgICAgICAgICBpZiAoIWRvbmUpIHtcbiAgICAgICAgICAgICAgICBtYXBbY3hdW2N5XSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW1hcFtjeF1bY3ldKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmFuZG9taXplKGRpcnMpO1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqICh0aGlzLl9yZWd1bGFyaXR5ICsgMSkpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JhbmRvbWl6ZShkaXJzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBibG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG54ID0gY3ggKyBkaXJzW2ldWzBdICogMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG55ID0gY3kgKyBkaXJzW2ldWzFdICogMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0ZyZWUobWFwLCBueCwgbnksIHdpZHRoLCBoZWlnaHQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwW254XVtueV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFtjeCArIGRpcnNbaV1bMF1dW2N5ICsgZGlyc1tpXVsxXV0gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN4ID0gbng7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3kgPSBueTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoIWJsb2NrZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlIChkb25lICsgMSA8IHdpZHRoICogaGVpZ2h0IC8gNCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGksIGosIG1hcFtpXVtqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFwID0gW107XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfcmFuZG9taXplKGRpcnMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIGRpcnNbaV1bMF0gPSAwO1xuICAgICAgICAgICAgZGlyc1tpXVsxXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiA0KSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGRpcnNbMF1bMF0gPSAtMTtcbiAgICAgICAgICAgICAgICBkaXJzWzFdWzBdID0gMTtcbiAgICAgICAgICAgICAgICBkaXJzWzJdWzFdID0gLTE7XG4gICAgICAgICAgICAgICAgZGlyc1szXVsxXSA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgZGlyc1szXVswXSA9IC0xO1xuICAgICAgICAgICAgICAgIGRpcnNbMl1bMF0gPSAxO1xuICAgICAgICAgICAgICAgIGRpcnNbMV1bMV0gPSAtMTtcbiAgICAgICAgICAgICAgICBkaXJzWzBdWzFdID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBkaXJzWzJdWzBdID0gLTE7XG4gICAgICAgICAgICAgICAgZGlyc1szXVswXSA9IDE7XG4gICAgICAgICAgICAgICAgZGlyc1swXVsxXSA9IC0xO1xuICAgICAgICAgICAgICAgIGRpcnNbMV1bMV0gPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGRpcnNbMV1bMF0gPSAtMTtcbiAgICAgICAgICAgICAgICBkaXJzWzBdWzBdID0gMTtcbiAgICAgICAgICAgICAgICBkaXJzWzNdWzFdID0gLTE7XG4gICAgICAgICAgICAgICAgZGlyc1syXVsxXSA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2lzRnJlZShtYXAsIHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKHggPCAxIHx8IHkgPCAxIHx8IHggPj0gd2lkdGggfHwgeSA+PSBoZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwW3hdW3ldO1xuICAgIH1cbn1cbiIsImltcG9ydCBBcmVuYSBmcm9tIFwiLi9hcmVuYS5qc1wiO1xuaW1wb3J0IFVuaWZvcm0gZnJvbSBcIi4vdW5pZm9ybS5qc1wiO1xuaW1wb3J0IENlbGx1bGFyIGZyb20gXCIuL2NlbGx1bGFyLmpzXCI7XG5pbXBvcnQgRGlnZ2VyIGZyb20gXCIuL2RpZ2dlci5qc1wiO1xuaW1wb3J0IEVsbGVyTWF6ZSBmcm9tIFwiLi9lbGxlcm1hemUuanNcIjtcbmltcG9ydCBEaXZpZGVkTWF6ZSBmcm9tIFwiLi9kaXZpZGVkbWF6ZS5qc1wiO1xuaW1wb3J0IEljZXlNYXplIGZyb20gXCIuL2ljZXltYXplLmpzXCI7XG5pbXBvcnQgUm9ndWUgZnJvbSBcIi4vcm9ndWUuanNcIjtcbmV4cG9ydCBkZWZhdWx0IHsgQXJlbmEsIFVuaWZvcm0sIENlbGx1bGFyLCBEaWdnZXIsIEVsbGVyTWF6ZSwgRGl2aWRlZE1hemUsIEljZXlNYXplLCBSb2d1ZSB9O1xuIiwiaW1wb3J0IHsgREVGQVVMVF9XSURUSCwgREVGQVVMVF9IRUlHSFQgfSBmcm9tIFwiLi4vY29uc3RhbnRzLmpzXCI7XG47XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXAge1xuICAgIC8qKlxuICAgICAqIEBjbGFzcyBCYXNlIG1hcCBnZW5lcmF0b3JcbiAgICAgKiBAcGFyYW0ge2ludH0gW3dpZHRoPVJPVC5ERUZBVUxUX1dJRFRIXVxuICAgICAqIEBwYXJhbSB7aW50fSBbaGVpZ2h0PVJPVC5ERUZBVUxUX0hFSUdIVF1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCA9IERFRkFVTFRfV0lEVEgsIGhlaWdodCA9IERFRkFVTFRfSEVJR0hUKSB7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcbiAgICB9XG4gICAgO1xuICAgIF9maWxsTWFwKHZhbHVlKSB7XG4gICAgICAgIGxldCBtYXAgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICBtYXAucHVzaChbXSk7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbWFwW2ldLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgfVxufVxuIiwiaW1wb3J0IE1hcCBmcm9tIFwiLi9tYXAuanNcIjtcbmltcG9ydCBSTkcgZnJvbSBcIi4uL3JuZy5qc1wiO1xuaW1wb3J0IHsgRElSUyB9IGZyb20gXCIuLi9jb25zdGFudHMuanNcIjtcbi8qKlxuICogRHVuZ2VvbiBnZW5lcmF0b3Igd2hpY2ggdXNlcyB0aGUgXCJvcmdpbmFsXCIgUm9ndWUgZHVuZ2VvbiBnZW5lcmF0aW9uIGFsZ29yaXRobS4gU2VlIGh0dHA6Ly9rdW9pLmNvbS9+a2FtaWthemUvR2FtZURlc2lnbi9hcnQwN19yb2d1ZV9kdW5nZW9uLnBocFxuICogQGF1dGhvciBoeWFrdWdlaVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2d1ZSBleHRlbmRzIE1hcCB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcih3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5tYXAgPSBbXTtcbiAgICAgICAgdGhpcy5yb29tcyA9IFtdO1xuICAgICAgICB0aGlzLmNvbm5lY3RlZENlbGxzID0gW107XG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIGNlbGxXaWR0aDogMyxcbiAgICAgICAgICAgIGNlbGxIZWlnaHQ6IDMgLy8gICAgIGllLiBhcyBhbiBhcnJheSB3aXRoIG1pbi1tYXggdmFsdWVzIGZvciBlYWNoIGRpcmVjdGlvbi4uLi5cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICAgIC8qXG4gICAgICAgIFNldCB0aGUgcm9vbSBzaXplcyBhY2NvcmRpbmcgdG8gdGhlIG92ZXItYWxsIHdpZHRoIG9mIHRoZSBtYXAsXG4gICAgICAgIGFuZCB0aGUgY2VsbCBzaXplcy5cbiAgICAgICAgKi9cbiAgICAgICAgaWYgKCFvcHRpb25zLmhhc093blByb3BlcnR5KFwicm9vbVdpZHRoXCIpKSB7XG4gICAgICAgICAgICBvcHRpb25zW1wicm9vbVdpZHRoXCJdID0gdGhpcy5fY2FsY3VsYXRlUm9vbVNpemUodGhpcy5fd2lkdGgsIG9wdGlvbnNbXCJjZWxsV2lkdGhcIl0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShcInJvb21IZWlnaHRcIikpIHtcbiAgICAgICAgICAgIG9wdGlvbnNbXCJyb29tSGVpZ2h0XCJdID0gdGhpcy5fY2FsY3VsYXRlUm9vbVNpemUodGhpcy5faGVpZ2h0LCBvcHRpb25zW1wiY2VsbEhlaWdodFwiXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuICAgIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgICB0aGlzLm1hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XG4gICAgICAgIHRoaXMucm9vbXMgPSBbXTtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRDZWxscyA9IFtdO1xuICAgICAgICB0aGlzLl9pbml0Um9vbXMoKTtcbiAgICAgICAgdGhpcy5fY29ubmVjdFJvb21zKCk7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RVbmNvbm5lY3RlZFJvb21zKCk7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVJhbmRvbVJvb21Db25uZWN0aW9ucygpO1xuICAgICAgICB0aGlzLl9jcmVhdGVSb29tcygpO1xuICAgICAgICB0aGlzLl9jcmVhdGVDb3JyaWRvcnMoKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3dpZHRoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGksIGosIHRoaXMubWFwW2ldW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIF9jYWxjdWxhdGVSb29tU2l6ZShzaXplLCBjZWxsKSB7XG4gICAgICAgIGxldCBtYXggPSBNYXRoLmZsb29yKChzaXplIC8gY2VsbCkgKiAwLjgpO1xuICAgICAgICBsZXQgbWluID0gTWF0aC5mbG9vcigoc2l6ZSAvIGNlbGwpICogMC4yNSk7XG4gICAgICAgIGlmIChtaW4gPCAyKSB7XG4gICAgICAgICAgICBtaW4gPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXggPCAyKSB7XG4gICAgICAgICAgICBtYXggPSAyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbbWluLCBtYXhdO1xuICAgIH1cbiAgICBfaW5pdFJvb21zKCkge1xuICAgICAgICAvLyBjcmVhdGUgcm9vbXMgYXJyYXkuIFRoaXMgaXMgdGhlIFwiZ3JpZFwiIGxpc3QgZnJvbSB0aGUgYWxnby5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnJvb21zLnB1c2goW10pO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vbXNbaV0ucHVzaCh7IFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAwLCBcImhlaWdodFwiOiAwLCBcImNvbm5lY3Rpb25zXCI6IFtdLCBcImNlbGx4XCI6IGksIFwiY2VsbHlcIjogaiB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfY29ubmVjdFJvb21zKCkge1xuICAgICAgICAvL3BpY2sgcmFuZG9tIHN0YXJ0aW5nIGdyaWRcbiAgICAgICAgbGV0IGNneCA9IFJORy5nZXRVbmlmb3JtSW50KDAsIHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoIC0gMSk7XG4gICAgICAgIGxldCBjZ3kgPSBSTkcuZ2V0VW5pZm9ybUludCgwLCB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQgLSAxKTtcbiAgICAgICAgbGV0IGlkeDtcbiAgICAgICAgbGV0IG5jZ3g7XG4gICAgICAgIGxldCBuY2d5O1xuICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgbGV0IHJvb207XG4gICAgICAgIGxldCBvdGhlclJvb207XG4gICAgICAgIGxldCBkaXJUb0NoZWNrO1xuICAgICAgICAvLyBmaW5kICB1bmNvbm5lY3RlZCBuZWlnaGJvdXIgY2VsbHNcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgLy9kaXJUb0NoZWNrID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDddO1xuICAgICAgICAgICAgZGlyVG9DaGVjayA9IFswLCAyLCA0LCA2XTtcbiAgICAgICAgICAgIGRpclRvQ2hlY2sgPSBSTkcuc2h1ZmZsZShkaXJUb0NoZWNrKTtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlkeCA9IGRpclRvQ2hlY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgbmNneCA9IGNneCArIERJUlNbOF1baWR4XVswXTtcbiAgICAgICAgICAgICAgICBuY2d5ID0gY2d5ICsgRElSU1s4XVtpZHhdWzFdO1xuICAgICAgICAgICAgICAgIGlmIChuY2d4IDwgMCB8fCBuY2d4ID49IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobmNneSA8IDAgfHwgbmNneSA+PSB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJvb20gPSB0aGlzLnJvb21zW2NneF1bY2d5XTtcbiAgICAgICAgICAgICAgICBpZiAocm9vbVtcImNvbm5lY3Rpb25zXCJdLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYXMgbG9uZyBhcyB0aGlzIHJvb20gZG9lc24ndCBhbHJlYWR5IGNvb25lY3QgdG8gbWUsIHdlIGFyZSBvayB3aXRoIGl0LlxuICAgICAgICAgICAgICAgICAgICBpZiAocm9vbVtcImNvbm5lY3Rpb25zXCJdWzBdWzBdID09IG5jZ3ggJiYgcm9vbVtcImNvbm5lY3Rpb25zXCJdWzBdWzFdID09IG5jZ3kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG90aGVyUm9vbSA9IHRoaXMucm9vbXNbbmNneF1bbmNneV07XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyUm9vbVtcImNvbm5lY3Rpb25zXCJdLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG90aGVyUm9vbVtcImNvbm5lY3Rpb25zXCJdLnB1c2goW2NneCwgY2d5XSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGVkQ2VsbHMucHVzaChbbmNneCwgbmNneV0pO1xuICAgICAgICAgICAgICAgICAgICBjZ3ggPSBuY2d4O1xuICAgICAgICAgICAgICAgICAgICBjZ3kgPSBuY2d5O1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSB3aGlsZSAoZGlyVG9DaGVjay5sZW5ndGggPiAwICYmIGZvdW5kID09IGZhbHNlKTtcbiAgICAgICAgfSB3aGlsZSAoZGlyVG9DaGVjay5sZW5ndGggPiAwKTtcbiAgICB9XG4gICAgX2Nvbm5lY3RVbmNvbm5lY3RlZFJvb21zKCkge1xuICAgICAgICAvL1doaWxlIHRoZXJlIGFyZSB1bmNvbm5lY3RlZCByb29tcywgdHJ5IHRvIGNvbm5lY3QgdGhlbSB0byBhIHJhbmRvbSBjb25uZWN0ZWQgbmVpZ2hib3JcbiAgICAgICAgLy8oaWYgYSByb29tIGhhcyBubyBjb25uZWN0ZWQgbmVpZ2hib3JzIHlldCwganVzdCBrZWVwIGN5Y2xpbmcsIHlvdSdsbCBmaWxsIG91dCB0byBpdCBldmVudHVhbGx5KS5cbiAgICAgICAgbGV0IGN3ID0gdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGg7XG4gICAgICAgIGxldCBjaCA9IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodDtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRDZWxscyA9IFJORy5zaHVmZmxlKHRoaXMuY29ubmVjdGVkQ2VsbHMpO1xuICAgICAgICBsZXQgcm9vbTtcbiAgICAgICAgbGV0IG90aGVyUm9vbTtcbiAgICAgICAgbGV0IHZhbGlkUm9vbTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgcm9vbSA9IHRoaXMucm9vbXNbaV1bal07XG4gICAgICAgICAgICAgICAgaWYgKHJvb21bXCJjb25uZWN0aW9uc1wiXS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGlyZWN0aW9ucyA9IFswLCAyLCA0LCA2XTtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9ucyA9IFJORy5zaHVmZmxlKGRpcmVjdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB2YWxpZFJvb20gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpcklkeCA9IGRpcmVjdGlvbnMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SSA9IGkgKyBESVJTWzhdW2RpcklkeF1bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SiA9IGogKyBESVJTWzhdW2RpcklkeF1bMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3SSA8IDAgfHwgbmV3SSA+PSBjdyB8fCBuZXdKIDwgMCB8fCBuZXdKID49IGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlclJvb20gPSB0aGlzLnJvb21zW25ld0ldW25ld0pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRSb29tID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXS5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXVtrXVswXSA9PSBpICYmIG90aGVyUm9vbVtcImNvbm5lY3Rpb25zXCJdW2tdWzFdID09IGopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRSb29tID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZFJvb20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSB3aGlsZSAoZGlyZWN0aW9ucy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRSb29tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb29tW1wiY29ubmVjdGlvbnNcIl0ucHVzaChbb3RoZXJSb29tW1wiY2VsbHhcIl0sIG90aGVyUm9vbVtcImNlbGx5XCJdXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tIFVuYWJsZSB0byBjb25uZWN0IHJvb20uXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9jcmVhdGVSYW5kb21Sb29tQ29ubmVjdGlvbnMoKSB7XG4gICAgICAgIC8vIEVtcHR5IGZvciBub3cuXG4gICAgfVxuICAgIF9jcmVhdGVSb29tcygpIHtcbiAgICAgICAgbGV0IHcgPSB0aGlzLl93aWR0aDtcbiAgICAgICAgbGV0IGggPSB0aGlzLl9oZWlnaHQ7XG4gICAgICAgIGxldCBjdyA9IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoO1xuICAgICAgICBsZXQgY2ggPSB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQ7XG4gICAgICAgIGxldCBjd3AgPSBNYXRoLmZsb29yKHRoaXMuX3dpZHRoIC8gY3cpO1xuICAgICAgICBsZXQgY2hwID0gTWF0aC5mbG9vcih0aGlzLl9oZWlnaHQgLyBjaCk7XG4gICAgICAgIGxldCByb29tdztcbiAgICAgICAgbGV0IHJvb21oO1xuICAgICAgICBsZXQgcm9vbVdpZHRoID0gdGhpcy5fb3B0aW9uc1tcInJvb21XaWR0aFwiXTtcbiAgICAgICAgbGV0IHJvb21IZWlnaHQgPSB0aGlzLl9vcHRpb25zW1wicm9vbUhlaWdodFwiXTtcbiAgICAgICAgbGV0IHN4O1xuICAgICAgICBsZXQgc3k7XG4gICAgICAgIGxldCBvdGhlclJvb207XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3c7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjaDsgaisrKSB7XG4gICAgICAgICAgICAgICAgc3ggPSBjd3AgKiBpO1xuICAgICAgICAgICAgICAgIHN5ID0gY2hwICogajtcbiAgICAgICAgICAgICAgICBpZiAoc3ggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzeCA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzeSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN5ID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcm9vbXcgPSBSTkcuZ2V0VW5pZm9ybUludChyb29tV2lkdGhbMF0sIHJvb21XaWR0aFsxXSk7XG4gICAgICAgICAgICAgICAgcm9vbWggPSBSTkcuZ2V0VW5pZm9ybUludChyb29tSGVpZ2h0WzBdLCByb29tSGVpZ2h0WzFdKTtcbiAgICAgICAgICAgICAgICBpZiAoaiA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJSb29tID0gdGhpcy5yb29tc1tpXVtqIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChzeSAtIChvdGhlclJvb21bXCJ5XCJdICsgb3RoZXJSb29tW1wiaGVpZ2h0XCJdKSA8IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN5Kys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG90aGVyUm9vbSA9IHRoaXMucm9vbXNbaSAtIDFdW2pdO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoc3ggLSAob3RoZXJSb29tW1wieFwiXSArIG90aGVyUm9vbVtcIndpZHRoXCJdKSA8IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN4Kys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHN4T2Zmc2V0ID0gTWF0aC5yb3VuZChSTkcuZ2V0VW5pZm9ybUludCgwLCBjd3AgLSByb29tdykgLyAyKTtcbiAgICAgICAgICAgICAgICBsZXQgc3lPZmZzZXQgPSBNYXRoLnJvdW5kKFJORy5nZXRVbmlmb3JtSW50KDAsIGNocCAtIHJvb21oKSAvIDIpO1xuICAgICAgICAgICAgICAgIHdoaWxlIChzeCArIHN4T2Zmc2V0ICsgcm9vbXcgPj0gdykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3hPZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN4T2Zmc2V0LS07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb29tdy0tO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdoaWxlIChzeSArIHN5T2Zmc2V0ICsgcm9vbWggPj0gaCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3lPZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN5T2Zmc2V0LS07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb29taC0tO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN4ID0gc3ggKyBzeE9mZnNldDtcbiAgICAgICAgICAgICAgICBzeSA9IHN5ICsgc3lPZmZzZXQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tc1tpXVtqXVtcInhcIl0gPSBzeDtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb21zW2ldW2pdW1wieVwiXSA9IHN5O1xuICAgICAgICAgICAgICAgIHRoaXMucm9vbXNbaV1bal1bXCJ3aWR0aFwiXSA9IHJvb213O1xuICAgICAgICAgICAgICAgIHRoaXMucm9vbXNbaV1bal1bXCJoZWlnaHRcIl0gPSByb29taDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpaSA9IHN4OyBpaSA8IHN4ICsgcm9vbXc7IGlpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgamogPSBzeTsgamogPCBzeSArIHJvb21oOyBqaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFtpaV1bampdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfZ2V0V2FsbFBvc2l0aW9uKGFSb29tLCBhRGlyZWN0aW9uKSB7XG4gICAgICAgIGxldCByeDtcbiAgICAgICAgbGV0IHJ5O1xuICAgICAgICBsZXQgZG9vcjtcbiAgICAgICAgaWYgKGFEaXJlY3Rpb24gPT0gMSB8fCBhRGlyZWN0aW9uID09IDMpIHtcbiAgICAgICAgICAgIHJ4ID0gUk5HLmdldFVuaWZvcm1JbnQoYVJvb21bXCJ4XCJdICsgMSwgYVJvb21bXCJ4XCJdICsgYVJvb21bXCJ3aWR0aFwiXSAtIDIpO1xuICAgICAgICAgICAgaWYgKGFEaXJlY3Rpb24gPT0gMSkge1xuICAgICAgICAgICAgICAgIHJ5ID0gYVJvb21bXCJ5XCJdIC0gMjtcbiAgICAgICAgICAgICAgICBkb29yID0gcnkgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcnkgPSBhUm9vbVtcInlcIl0gKyBhUm9vbVtcImhlaWdodFwiXSArIDE7XG4gICAgICAgICAgICAgICAgZG9vciA9IHJ5IC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubWFwW3J4XVtkb29yXSA9IDA7IC8vIGknbSBub3Qgc2V0dGluZyBhIHNwZWNpZmljICdkb29yJyB0aWxlIHZhbHVlIHJpZ2h0IG5vdywganVzdCBlbXB0eSBzcGFjZS5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJ5ID0gUk5HLmdldFVuaWZvcm1JbnQoYVJvb21bXCJ5XCJdICsgMSwgYVJvb21bXCJ5XCJdICsgYVJvb21bXCJoZWlnaHRcIl0gLSAyKTtcbiAgICAgICAgICAgIGlmIChhRGlyZWN0aW9uID09IDIpIHtcbiAgICAgICAgICAgICAgICByeCA9IGFSb29tW1wieFwiXSArIGFSb29tW1wid2lkdGhcIl0gKyAxO1xuICAgICAgICAgICAgICAgIGRvb3IgPSByeCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByeCA9IGFSb29tW1wieFwiXSAtIDI7XG4gICAgICAgICAgICAgICAgZG9vciA9IHJ4ICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubWFwW2Rvb3JdW3J5XSA9IDA7IC8vIGknbSBub3Qgc2V0dGluZyBhIHNwZWNpZmljICdkb29yJyB0aWxlIHZhbHVlIHJpZ2h0IG5vdywganVzdCBlbXB0eSBzcGFjZS5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3J4LCByeV07XG4gICAgfVxuICAgIF9kcmF3Q29ycmlkb3Ioc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pIHtcbiAgICAgICAgbGV0IHhPZmZzZXQgPSBlbmRQb3NpdGlvblswXSAtIHN0YXJ0UG9zaXRpb25bMF07XG4gICAgICAgIGxldCB5T2Zmc2V0ID0gZW5kUG9zaXRpb25bMV0gLSBzdGFydFBvc2l0aW9uWzFdO1xuICAgICAgICBsZXQgeHBvcyA9IHN0YXJ0UG9zaXRpb25bMF07XG4gICAgICAgIGxldCB5cG9zID0gc3RhcnRQb3NpdGlvblsxXTtcbiAgICAgICAgbGV0IHRlbXBEaXN0O1xuICAgICAgICBsZXQgeERpcjtcbiAgICAgICAgbGV0IHlEaXI7XG4gICAgICAgIGxldCBtb3ZlOyAvLyAyIGVsZW1lbnQgYXJyYXksIGVsZW1lbnQgMCBpcyB0aGUgZGlyZWN0aW9uLCBlbGVtZW50IDEgaXMgdGhlIHRvdGFsIHZhbHVlIHRvIG1vdmUuXG4gICAgICAgIGxldCBtb3ZlcyA9IFtdOyAvLyBhIGxpc3Qgb2YgMiBlbGVtZW50IGFycmF5c1xuICAgICAgICBsZXQgeEFicyA9IE1hdGguYWJzKHhPZmZzZXQpO1xuICAgICAgICBsZXQgeUFicyA9IE1hdGguYWJzKHlPZmZzZXQpO1xuICAgICAgICBsZXQgcGVyY2VudCA9IFJORy5nZXRVbmlmb3JtKCk7IC8vIHVzZWQgdG8gc3BsaXQgdGhlIG1vdmUgYXQgZGlmZmVyZW50IHBsYWNlcyBhbG9uZyB0aGUgbG9uZyBheGlzXG4gICAgICAgIGxldCBmaXJzdEhhbGYgPSBwZXJjZW50O1xuICAgICAgICBsZXQgc2Vjb25kSGFsZiA9IDEgLSBwZXJjZW50O1xuICAgICAgICB4RGlyID0geE9mZnNldCA+IDAgPyAyIDogNjtcbiAgICAgICAgeURpciA9IHlPZmZzZXQgPiAwID8gNCA6IDA7XG4gICAgICAgIGlmICh4QWJzIDwgeUFicykge1xuICAgICAgICAgICAgLy8gbW92ZSBmaXJzdEhhbGYgb2YgdGhlIHkgb2Zmc2V0XG4gICAgICAgICAgICB0ZW1wRGlzdCA9IE1hdGguY2VpbCh5QWJzICogZmlyc3RIYWxmKTtcbiAgICAgICAgICAgIG1vdmVzLnB1c2goW3lEaXIsIHRlbXBEaXN0XSk7XG4gICAgICAgICAgICAvLyBtb3ZlIGFsbCB0aGUgeCBvZmZzZXRcbiAgICAgICAgICAgIG1vdmVzLnB1c2goW3hEaXIsIHhBYnNdKTtcbiAgICAgICAgICAgIC8vIG1vdmUgc2VuZEhhbGYgb2YgdGhlICB5IG9mZnNldFxuICAgICAgICAgICAgdGVtcERpc3QgPSBNYXRoLmZsb29yKHlBYnMgKiBzZWNvbmRIYWxmKTtcbiAgICAgICAgICAgIG1vdmVzLnB1c2goW3lEaXIsIHRlbXBEaXN0XSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyAgbW92ZSBmaXJzdEhhbGYgb2YgdGhlIHggb2Zmc2V0XG4gICAgICAgICAgICB0ZW1wRGlzdCA9IE1hdGguY2VpbCh4QWJzICogZmlyc3RIYWxmKTtcbiAgICAgICAgICAgIG1vdmVzLnB1c2goW3hEaXIsIHRlbXBEaXN0XSk7XG4gICAgICAgICAgICAvLyBtb3ZlIGFsbCB0aGUgeSBvZmZzZXRcbiAgICAgICAgICAgIG1vdmVzLnB1c2goW3lEaXIsIHlBYnNdKTtcbiAgICAgICAgICAgIC8vIG1vdmUgc2Vjb25kSGFsZiBvZiB0aGUgeCBvZmZzZXQuXG4gICAgICAgICAgICB0ZW1wRGlzdCA9IE1hdGguZmxvb3IoeEFicyAqIHNlY29uZEhhbGYpO1xuICAgICAgICAgICAgbW92ZXMucHVzaChbeERpciwgdGVtcERpc3RdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hcFt4cG9zXVt5cG9zXSA9IDA7XG4gICAgICAgIHdoaWxlIChtb3Zlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBtb3ZlID0gbW92ZXMucG9wKCk7XG4gICAgICAgICAgICB3aGlsZSAobW92ZVsxXSA+IDApIHtcbiAgICAgICAgICAgICAgICB4cG9zICs9IERJUlNbOF1bbW92ZVswXV1bMF07XG4gICAgICAgICAgICAgICAgeXBvcyArPSBESVJTWzhdW21vdmVbMF1dWzFdO1xuICAgICAgICAgICAgICAgIHRoaXMubWFwW3hwb3NdW3lwb3NdID0gMDtcbiAgICAgICAgICAgICAgICBtb3ZlWzFdID0gbW92ZVsxXSAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2NyZWF0ZUNvcnJpZG9ycygpIHtcbiAgICAgICAgLy8gRHJhdyBDb3JyaWRvcnMgYmV0d2VlbiBjb25uZWN0ZWQgcm9vbXNcbiAgICAgICAgbGV0IGN3ID0gdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGg7XG4gICAgICAgIGxldCBjaCA9IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodDtcbiAgICAgICAgbGV0IHJvb207XG4gICAgICAgIGxldCBjb25uZWN0aW9uO1xuICAgICAgICBsZXQgb3RoZXJSb29tO1xuICAgICAgICBsZXQgd2FsbDtcbiAgICAgICAgbGV0IG90aGVyV2FsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdzsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNoOyBqKyspIHtcbiAgICAgICAgICAgICAgICByb29tID0gdGhpcy5yb29tc1tpXVtqXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHJvb21bXCJjb25uZWN0aW9uc1wiXS5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uID0gcm9vbVtcImNvbm5lY3Rpb25zXCJdW2tdO1xuICAgICAgICAgICAgICAgICAgICBvdGhlclJvb20gPSB0aGlzLnJvb21zW2Nvbm5lY3Rpb25bMF1dW2Nvbm5lY3Rpb25bMV1dO1xuICAgICAgICAgICAgICAgICAgICAvLyBmaWd1cmUgb3V0IHdoYXQgd2FsbCBvdXIgY29ycmlkb3Igd2lsbCBzdGFydCBvbmUuXG4gICAgICAgICAgICAgICAgICAgIC8vIGZpZ3VyZSBvdXQgd2hhdCB3YWxsIG91ciBjb3JyaWRvciB3aWxsIGVuZCBvbi5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyUm9vbVtcImNlbGx4XCJdID4gcm9vbVtcImNlbGx4XCJdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3YWxsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyV2FsbCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3RoZXJSb29tW1wiY2VsbHhcIl0gPCByb29tW1wiY2VsbHhcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhbGwgPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJXYWxsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvdGhlclJvb21bXCJjZWxseVwiXSA+IHJvb21bXCJjZWxseVwiXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2FsbCA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlcldhbGwgPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2FsbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlcldhbGwgPSAzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RyYXdDb3JyaWRvcih0aGlzLl9nZXRXYWxsUG9zaXRpb24ocm9vbSwgd2FsbCksIHRoaXMuX2dldFdhbGxQb3NpdGlvbihvdGhlclJvb20sIG90aGVyV2FsbCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBEdW5nZW9uIGZyb20gXCIuL2R1bmdlb24uanNcIjtcbmltcG9ydCB7IFJvb20sIENvcnJpZG9yIH0gZnJvbSBcIi4vZmVhdHVyZXMuanNcIjtcbmltcG9ydCBSTkcgZnJvbSBcIi4uL3JuZy5qc1wiO1xuO1xuLyoqXG4gKiBAY2xhc3MgRHVuZ2VvbiBnZW5lcmF0b3Igd2hpY2ggdHJpZXMgdG8gZmlsbCB0aGUgc3BhY2UgZXZlbmx5LiBHZW5lcmF0ZXMgaW5kZXBlbmRlbnQgcm9vbXMgYW5kIHRyaWVzIHRvIGNvbm5lY3QgdGhlbS5cbiAqIEBhdWdtZW50cyBST1QuTWFwLkR1bmdlb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVW5pZm9ybSBleHRlbmRzIER1bmdlb24ge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB7XG4gICAgICAgICAgICByb29tV2lkdGg6IFszLCA5XSxcbiAgICAgICAgICAgIHJvb21IZWlnaHQ6IFszLCA1XSxcbiAgICAgICAgICAgIHJvb21EdWdQZXJjZW50YWdlOiAwLjEsXG4gICAgICAgICAgICB0aW1lTGltaXQ6IDEwMDAgLyogd2Ugc3RvcCBhZnRlciB0aGlzIG11Y2ggdGltZSBoYXMgcGFzc2VkIChtc2VjKSAqL1xuICAgICAgICB9O1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9tYXAgPSBbXTtcbiAgICAgICAgdGhpcy5fZHVnID0gMDtcbiAgICAgICAgdGhpcy5fcm9vbUF0dGVtcHRzID0gMjA7IC8qIG5ldyByb29tIGlzIGNyZWF0ZWQgTi10aW1lcyB1bnRpbCBpcyBjb25zaWRlcmVkIGFzIGltcG9zc2libGUgdG8gZ2VuZXJhdGUgKi9cbiAgICAgICAgdGhpcy5fY29ycmlkb3JBdHRlbXB0cyA9IDIwOyAvKiBjb3JyaWRvcnMgYXJlIHRyaWVkIE4tdGltZXMgdW50aWwgdGhlIGxldmVsIGlzIGNvbnNpZGVyZWQgYXMgaW1wb3NzaWJsZSB0byBjb25uZWN0ICovXG4gICAgICAgIHRoaXMuX2Nvbm5lY3RlZCA9IFtdOyAvKiBsaXN0IG9mIGFscmVhZHkgY29ubmVjdGVkIHJvb21zICovXG4gICAgICAgIHRoaXMuX3VuY29ubmVjdGVkID0gW107IC8qIGxpc3Qgb2YgcmVtYWluaW5nIHVuY29ubmVjdGVkIHJvb21zICovXG4gICAgICAgIHRoaXMuX2RpZ0NhbGxiYWNrID0gdGhpcy5fZGlnQ2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fY2FuQmVEdWdDYWxsYmFjayA9IHRoaXMuX2NhbkJlRHVnQ2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5faXNXYWxsQ2FsbGJhY2sgPSB0aGlzLl9pc1dhbGxDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBtYXAuIElmIHRoZSB0aW1lIGxpbWl0IGhhcyBiZWVuIGhpdCwgcmV0dXJucyBudWxsLlxuICAgICAqIEBzZWUgUk9ULk1hcCNjcmVhdGVcbiAgICAgKi9cbiAgICBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHQxID0gRGF0ZS5ub3coKTtcbiAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgIGxldCB0MiA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBpZiAodDIgLSB0MSA+IHRoaXMuX29wdGlvbnMudGltZUxpbWl0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9IC8qIHRpbWUgbGltaXQhICovXG4gICAgICAgICAgICB0aGlzLl9tYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xuICAgICAgICAgICAgdGhpcy5fZHVnID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3Jvb21zID0gW107XG4gICAgICAgICAgICB0aGlzLl91bmNvbm5lY3RlZCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fZ2VuZXJhdGVSb29tcygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3Jvb21zLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9nZW5lcmF0ZUNvcnJpZG9ycygpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3dpZHRoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGksIGosIHRoaXMuX21hcFtpXVtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBzdWl0YWJsZSBhbW91bnQgb2Ygcm9vbXNcbiAgICAgKi9cbiAgICBfZ2VuZXJhdGVSb29tcygpIHtcbiAgICAgICAgbGV0IHcgPSB0aGlzLl93aWR0aCAtIDI7XG4gICAgICAgIGxldCBoID0gdGhpcy5faGVpZ2h0IC0gMjtcbiAgICAgICAgbGV0IHJvb207XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHJvb20gPSB0aGlzLl9nZW5lcmF0ZVJvb20oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kdWcgLyAodyAqIGgpID4gdGhpcy5fb3B0aW9ucy5yb29tRHVnUGVyY2VudGFnZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSAvKiBhY2hpZXZlZCByZXF1ZXN0ZWQgYW1vdW50IG9mIGZyZWUgc3BhY2UgKi9cbiAgICAgICAgfSB3aGlsZSAocm9vbSk7XG4gICAgICAgIC8qIGVpdGhlciBlbm91Z2ggcm9vbXMsIG9yIG5vdCBhYmxlIHRvIGdlbmVyYXRlIG1vcmUgb2YgdGhlbSA6KSAqL1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcnkgdG8gZ2VuZXJhdGUgb25lIHJvb21cbiAgICAgKi9cbiAgICBfZ2VuZXJhdGVSb29tKCkge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICB3aGlsZSAoY291bnQgPCB0aGlzLl9yb29tQXR0ZW1wdHMpIHtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICBsZXQgcm9vbSA9IFJvb20uY3JlYXRlUmFuZG9tKHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQsIHRoaXMuX29wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKCFyb29tLmlzVmFsaWQodGhpcy5faXNXYWxsQ2FsbGJhY2ssIHRoaXMuX2NhbkJlRHVnQ2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb29tLmNyZWF0ZSh0aGlzLl9kaWdDYWxsYmFjayk7XG4gICAgICAgICAgICB0aGlzLl9yb29tcy5wdXNoKHJvb20pO1xuICAgICAgICAgICAgcmV0dXJuIHJvb207XG4gICAgICAgIH1cbiAgICAgICAgLyogbm8gcm9vbSB3YXMgZ2VuZXJhdGVkIGluIGEgZ2l2ZW4gbnVtYmVyIG9mIGF0dGVtcHRzICovXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgY29ubmVjdG9ycyBiZXdlZW4gcm9vbXNcbiAgICAgKiBAcmV0dXJucyB7Ym9vbH0gc3VjY2VzcyBXYXMgdGhpcyBhdHRlbXB0IHN1Y2Nlc3NmdWxsP1xuICAgICAqL1xuICAgIF9nZW5lcmF0ZUNvcnJpZG9ycygpIHtcbiAgICAgICAgbGV0IGNudCA9IDA7XG4gICAgICAgIHdoaWxlIChjbnQgPCB0aGlzLl9jb3JyaWRvckF0dGVtcHRzKSB7XG4gICAgICAgICAgICBjbnQrKztcbiAgICAgICAgICAgIHRoaXMuX2NvcnJpZG9ycyA9IFtdO1xuICAgICAgICAgICAgLyogZGlnIHJvb21zIGludG8gYSBjbGVhciBtYXAgKi9cbiAgICAgICAgICAgIHRoaXMuX21hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3Jvb21zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJvb20gPSB0aGlzLl9yb29tc1tpXTtcbiAgICAgICAgICAgICAgICByb29tLmNsZWFyRG9vcnMoKTtcbiAgICAgICAgICAgICAgICByb29tLmNyZWF0ZSh0aGlzLl9kaWdDYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl91bmNvbm5lY3RlZCA9IFJORy5zaHVmZmxlKHRoaXMuX3Jvb21zLnNsaWNlKCkpO1xuICAgICAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gW107XG4gICAgICAgICAgICBpZiAodGhpcy5fdW5jb25uZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdGVkLnB1c2godGhpcy5fdW5jb25uZWN0ZWQucG9wKCkpO1xuICAgICAgICAgICAgfSAvKiBmaXJzdCBvbmUgaXMgYWx3YXlzIGNvbm5lY3RlZCAqL1xuICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAvKiAxLiBwaWNrIHJhbmRvbSBjb25uZWN0ZWQgcm9vbSAqL1xuICAgICAgICAgICAgICAgIGxldCBjb25uZWN0ZWQgPSBSTkcuZ2V0SXRlbSh0aGlzLl9jb25uZWN0ZWQpO1xuICAgICAgICAgICAgICAgIGlmICghY29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKiAyLiBmaW5kIGNsb3Nlc3QgdW5jb25uZWN0ZWQgKi9cbiAgICAgICAgICAgICAgICBsZXQgcm9vbTEgPSB0aGlzLl9jbG9zZXN0Um9vbSh0aGlzLl91bmNvbm5lY3RlZCwgY29ubmVjdGVkKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJvb20xKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKiAzLiBjb25uZWN0IGl0IHRvIGNsb3Nlc3QgY29ubmVjdGVkICovXG4gICAgICAgICAgICAgICAgbGV0IHJvb20yID0gdGhpcy5fY2xvc2VzdFJvb20odGhpcy5fY29ubmVjdGVkLCByb29tMSk7XG4gICAgICAgICAgICAgICAgaWYgKCFyb29tMikge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG9rID0gdGhpcy5fY29ubmVjdFJvb21zKHJvb20xLCByb29tMik7XG4gICAgICAgICAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IC8qIHN0b3AgY29ubmVjdGluZywgcmUtc2h1ZmZsZSAqL1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fdW5jb25uZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gLyogZG9uZTsgbm8gcm9vbXMgcmVtYWluICovXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICA7XG4gICAgLyoqXG4gICAgICogRm9yIGEgZ2l2ZW4gcm9vbSwgZmluZCB0aGUgY2xvc2VzdCBvbmUgZnJvbSB0aGUgbGlzdFxuICAgICAqL1xuICAgIF9jbG9zZXN0Um9vbShyb29tcywgcm9vbSkge1xuICAgICAgICBsZXQgZGlzdCA9IEluZmluaXR5O1xuICAgICAgICBsZXQgY2VudGVyID0gcm9vbS5nZXRDZW50ZXIoKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm9vbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByID0gcm9vbXNbaV07XG4gICAgICAgICAgICBsZXQgYyA9IHIuZ2V0Q2VudGVyKCk7XG4gICAgICAgICAgICBsZXQgZHggPSBjWzBdIC0gY2VudGVyWzBdO1xuICAgICAgICAgICAgbGV0IGR5ID0gY1sxXSAtIGNlbnRlclsxXTtcbiAgICAgICAgICAgIGxldCBkID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgICAgICAgICBpZiAoZCA8IGRpc3QpIHtcbiAgICAgICAgICAgICAgICBkaXN0ID0gZDtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIF9jb25uZWN0Um9vbXMocm9vbTEsIHJvb20yKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAgICByb29tMS5kZWJ1ZygpO1xuICAgICAgICAgICAgcm9vbTIuZGVidWcoKTtcbiAgICAgICAgKi9cbiAgICAgICAgbGV0IGNlbnRlcjEgPSByb29tMS5nZXRDZW50ZXIoKTtcbiAgICAgICAgbGV0IGNlbnRlcjIgPSByb29tMi5nZXRDZW50ZXIoKTtcbiAgICAgICAgbGV0IGRpZmZYID0gY2VudGVyMlswXSAtIGNlbnRlcjFbMF07XG4gICAgICAgIGxldCBkaWZmWSA9IGNlbnRlcjJbMV0gLSBjZW50ZXIxWzFdO1xuICAgICAgICBsZXQgc3RhcnQ7XG4gICAgICAgIGxldCBlbmQ7XG4gICAgICAgIGxldCBkaXJJbmRleDEsIGRpckluZGV4MiwgbWluLCBtYXgsIGluZGV4O1xuICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZlgpIDwgTWF0aC5hYnMoZGlmZlkpKSB7IC8qIGZpcnN0IHRyeSBjb25uZWN0aW5nIG5vcnRoLXNvdXRoIHdhbGxzICovXG4gICAgICAgICAgICBkaXJJbmRleDEgPSAoZGlmZlkgPiAwID8gMiA6IDApO1xuICAgICAgICAgICAgZGlySW5kZXgyID0gKGRpckluZGV4MSArIDIpICUgNDtcbiAgICAgICAgICAgIG1pbiA9IHJvb20yLmdldExlZnQoKTtcbiAgICAgICAgICAgIG1heCA9IHJvb20yLmdldFJpZ2h0KCk7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8qIGZpcnN0IHRyeSBjb25uZWN0aW5nIGVhc3Qtd2VzdCB3YWxscyAqL1xuICAgICAgICAgICAgZGlySW5kZXgxID0gKGRpZmZYID4gMCA/IDEgOiAzKTtcbiAgICAgICAgICAgIGRpckluZGV4MiA9IChkaXJJbmRleDEgKyAyKSAlIDQ7XG4gICAgICAgICAgICBtaW4gPSByb29tMi5nZXRUb3AoKTtcbiAgICAgICAgICAgIG1heCA9IHJvb20yLmdldEJvdHRvbSgpO1xuICAgICAgICAgICAgaW5kZXggPSAxO1xuICAgICAgICB9XG4gICAgICAgIHN0YXJ0ID0gdGhpcy5fcGxhY2VJbldhbGwocm9vbTEsIGRpckluZGV4MSk7IC8qIGNvcnJpZG9yIHdpbGwgc3RhcnQgaGVyZSAqL1xuICAgICAgICBpZiAoIXN0YXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0W2luZGV4XSA+PSBtaW4gJiYgc3RhcnRbaW5kZXhdIDw9IG1heCkgeyAvKiBwb3NzaWJsZSB0byBjb25uZWN0IHdpdGggc3RyYWlnaHQgbGluZSAoSS1saWtlKSAqL1xuICAgICAgICAgICAgZW5kID0gc3RhcnQuc2xpY2UoKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IDA7XG4gICAgICAgICAgICBzd2l0Y2ggKGRpckluZGV4Mikge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSByb29tMi5nZXRUb3AoKSAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSByb29tMi5nZXRSaWdodCgpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHJvb20yLmdldEJvdHRvbSgpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHJvb20yLmdldExlZnQoKSAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kWyhpbmRleCArIDEpICUgMl0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX2RpZ0xpbmUoW3N0YXJ0LCBlbmRdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdGFydFtpbmRleF0gPCBtaW4gLSAxIHx8IHN0YXJ0W2luZGV4XSA+IG1heCArIDEpIHsgLyogbmVlZCB0byBzd2l0Y2ggdGFyZ2V0IHdhbGwgKEwtbGlrZSkgKi9cbiAgICAgICAgICAgIGxldCBkaWZmID0gc3RhcnRbaW5kZXhdIC0gY2VudGVyMltpbmRleF07XG4gICAgICAgICAgICBsZXQgcm90YXRpb24gPSAwO1xuICAgICAgICAgICAgc3dpdGNoIChkaXJJbmRleDIpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICByb3RhdGlvbiA9IChkaWZmIDwgMCA/IDMgOiAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgcm90YXRpb24gPSAoZGlmZiA8IDAgPyAxIDogMyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlySW5kZXgyID0gKGRpckluZGV4MiArIHJvdGF0aW9uKSAlIDQ7XG4gICAgICAgICAgICBlbmQgPSB0aGlzLl9wbGFjZUluV2FsbChyb29tMiwgZGlySW5kZXgyKTtcbiAgICAgICAgICAgIGlmICghZW5kKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG1pZCA9IFswLCAwXTtcbiAgICAgICAgICAgIG1pZFtpbmRleF0gPSBzdGFydFtpbmRleF07XG4gICAgICAgICAgICBsZXQgaW5kZXgyID0gKGluZGV4ICsgMSkgJSAyO1xuICAgICAgICAgICAgbWlkW2luZGV4Ml0gPSBlbmRbaW5kZXgyXTtcbiAgICAgICAgICAgIHRoaXMuX2RpZ0xpbmUoW3N0YXJ0LCBtaWQsIGVuZF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvKiB1c2UgY3VycmVudCB3YWxsIHBhaXIsIGJ1dCBhZGp1c3QgdGhlIGxpbmUgaW4gdGhlIG1pZGRsZSAoUy1saWtlKSAqL1xuICAgICAgICAgICAgbGV0IGluZGV4MiA9IChpbmRleCArIDEpICUgMjtcbiAgICAgICAgICAgIGVuZCA9IHRoaXMuX3BsYWNlSW5XYWxsKHJvb20yLCBkaXJJbmRleDIpO1xuICAgICAgICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbWlkID0gTWF0aC5yb3VuZCgoZW5kW2luZGV4Ml0gKyBzdGFydFtpbmRleDJdKSAvIDIpO1xuICAgICAgICAgICAgbGV0IG1pZDEgPSBbMCwgMF07XG4gICAgICAgICAgICBsZXQgbWlkMiA9IFswLCAwXTtcbiAgICAgICAgICAgIG1pZDFbaW5kZXhdID0gc3RhcnRbaW5kZXhdO1xuICAgICAgICAgICAgbWlkMVtpbmRleDJdID0gbWlkO1xuICAgICAgICAgICAgbWlkMltpbmRleF0gPSBlbmRbaW5kZXhdO1xuICAgICAgICAgICAgbWlkMltpbmRleDJdID0gbWlkO1xuICAgICAgICAgICAgdGhpcy5fZGlnTGluZShbc3RhcnQsIG1pZDEsIG1pZDIsIGVuZF0pO1xuICAgICAgICB9XG4gICAgICAgIHJvb20xLmFkZERvb3Ioc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgcm9vbTIuYWRkRG9vcihlbmRbMF0sIGVuZFsxXSk7XG4gICAgICAgIGluZGV4ID0gdGhpcy5fdW5jb25uZWN0ZWQuaW5kZXhPZihyb29tMSk7XG4gICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fdW5jb25uZWN0ZWQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3RlZC5wdXNoKHJvb20xKTtcbiAgICAgICAgfVxuICAgICAgICBpbmRleCA9IHRoaXMuX3VuY29ubmVjdGVkLmluZGV4T2Yocm9vbTIpO1xuICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3VuY29ubmVjdGVkLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0ZWQucHVzaChyb29tMik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIF9wbGFjZUluV2FsbChyb29tLCBkaXJJbmRleCkge1xuICAgICAgICBsZXQgc3RhcnQgPSBbMCwgMF07XG4gICAgICAgIGxldCBkaXIgPSBbMCwgMF07XG4gICAgICAgIGxldCBsZW5ndGggPSAwO1xuICAgICAgICBzd2l0Y2ggKGRpckluZGV4KSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgZGlyID0gWzEsIDBdO1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gW3Jvb20uZ2V0TGVmdCgpLCByb29tLmdldFRvcCgpIC0gMV07XG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gcm9vbS5nZXRSaWdodCgpIC0gcm9vbS5nZXRMZWZ0KCkgKyAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGRpciA9IFswLCAxXTtcbiAgICAgICAgICAgICAgICBzdGFydCA9IFtyb29tLmdldFJpZ2h0KCkgKyAxLCByb29tLmdldFRvcCgpXTtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSByb29tLmdldEJvdHRvbSgpIC0gcm9vbS5nZXRUb3AoKSArIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgZGlyID0gWzEsIDBdO1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gW3Jvb20uZ2V0TGVmdCgpLCByb29tLmdldEJvdHRvbSgpICsgMV07XG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gcm9vbS5nZXRSaWdodCgpIC0gcm9vbS5nZXRMZWZ0KCkgKyAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGRpciA9IFswLCAxXTtcbiAgICAgICAgICAgICAgICBzdGFydCA9IFtyb29tLmdldExlZnQoKSAtIDEsIHJvb20uZ2V0VG9wKCldO1xuICAgICAgICAgICAgICAgIGxlbmd0aCA9IHJvb20uZ2V0Qm90dG9tKCkgLSByb29tLmdldFRvcCgpICsgMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBsZXQgYXZhaWwgPSBbXTtcbiAgICAgICAgbGV0IGxhc3RCYWRJbmRleCA9IC0yO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgeCA9IHN0YXJ0WzBdICsgaSAqIGRpclswXTtcbiAgICAgICAgICAgIGxldCB5ID0gc3RhcnRbMV0gKyBpICogZGlyWzFdO1xuICAgICAgICAgICAgYXZhaWwucHVzaChudWxsKTtcbiAgICAgICAgICAgIGxldCBpc1dhbGwgPSAodGhpcy5fbWFwW3hdW3ldID09IDEpO1xuICAgICAgICAgICAgaWYgKGlzV2FsbCkge1xuICAgICAgICAgICAgICAgIGlmIChsYXN0QmFkSW5kZXggIT0gaSAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxbaV0gPSBbeCwgeV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGFzdEJhZEluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBpZiAoaSkge1xuICAgICAgICAgICAgICAgICAgICBhdmFpbFtpIC0gMV0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gYXZhaWwubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGlmICghYXZhaWxbaV0pIHtcbiAgICAgICAgICAgICAgICBhdmFpbC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChhdmFpbC5sZW5ndGggPyBSTkcuZ2V0SXRlbShhdmFpbCkgOiBudWxsKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlnIGEgcG9seWxpbmUuXG4gICAgICovXG4gICAgX2RpZ0xpbmUocG9pbnRzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc3RhcnQgPSBwb2ludHNbaSAtIDFdO1xuICAgICAgICAgICAgbGV0IGVuZCA9IHBvaW50c1tpXTtcbiAgICAgICAgICAgIGxldCBjb3JyaWRvciA9IG5ldyBDb3JyaWRvcihzdGFydFswXSwgc3RhcnRbMV0sIGVuZFswXSwgZW5kWzFdKTtcbiAgICAgICAgICAgIGNvcnJpZG9yLmNyZWF0ZSh0aGlzLl9kaWdDYWxsYmFjayk7XG4gICAgICAgICAgICB0aGlzLl9jb3JyaWRvcnMucHVzaChjb3JyaWRvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2RpZ0NhbGxiYWNrKHgsIHksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX21hcFt4XVt5XSA9IHZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fZHVnKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2lzV2FsbENhbGxiYWNrKHgsIHkpIHtcbiAgICAgICAgaWYgKHggPCAwIHx8IHkgPCAwIHx8IHggPj0gdGhpcy5fd2lkdGggfHwgeSA+PSB0aGlzLl9oZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMuX21hcFt4XVt5XSA9PSAxKTtcbiAgICB9XG4gICAgX2NhbkJlRHVnQ2FsbGJhY2soeCwgeSkge1xuICAgICAgICBpZiAoeCA8IDEgfHwgeSA8IDEgfHwgeCArIDEgPj0gdGhpcy5fd2lkdGggfHwgeSArIDEgPj0gdGhpcy5faGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLl9tYXBbeF1beV0gPT0gMSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNpbXBsZXggZnJvbSBcIi4vc2ltcGxleC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgeyBTaW1wbGV4IH07XG4iLCIvKipcbiAqIEJhc2Ugbm9pc2UgZ2VuZXJhdG9yXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vaXNlIHtcbn1cbiIsImltcG9ydCBOb2lzZSBmcm9tIFwiLi9ub2lzZS5qc1wiO1xuaW1wb3J0IFJORyBmcm9tIFwiLi4vcm5nLmpzXCI7XG5pbXBvcnQgeyBtb2QgfSBmcm9tIFwiLi4vdXRpbC5qc1wiO1xuY29uc3QgRjIgPSAwLjUgKiAoTWF0aC5zcXJ0KDMpIC0gMSk7XG5jb25zdCBHMiA9ICgzIC0gTWF0aC5zcXJ0KDMpKSAvIDY7XG4vKipcbiAqIEEgc2ltcGxlIDJkIGltcGxlbWVudGF0aW9uIG9mIHNpbXBsZXggbm9pc2UgYnkgT25kcmVqIFphcmFcbiAqXG4gKiBCYXNlZCBvbiBhIHNwZWVkLWltcHJvdmVkIHNpbXBsZXggbm9pc2UgYWxnb3JpdGhtIGZvciAyRCwgM0QgYW5kIDREIGluIEphdmEuXG4gKiBXaGljaCBpcyBiYXNlZCBvbiBleGFtcGxlIGNvZGUgYnkgU3RlZmFuIEd1c3RhdnNvbiAoc3RlZ3VAaXRuLmxpdS5zZSkuXG4gKiBXaXRoIE9wdGltaXNhdGlvbnMgYnkgUGV0ZXIgRWFzdG1hbiAocGVhc3RtYW5AZHJpenpsZS5zdGFuZm9yZC5lZHUpLlxuICogQmV0dGVyIHJhbmsgb3JkZXJpbmcgbWV0aG9kIGJ5IFN0ZWZhbiBHdXN0YXZzb24gaW4gMjAxMi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltcGxleCBleHRlbmRzIE5vaXNlIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZ3JhZGllbnRzIFJhbmRvbSBncmFkaWVudHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihncmFkaWVudHMgPSAyNTYpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZ3JhZGllbnRzID0gW1xuICAgICAgICAgICAgWzAsIC0xXSxcbiAgICAgICAgICAgIFsxLCAtMV0sXG4gICAgICAgICAgICBbMSwgMF0sXG4gICAgICAgICAgICBbMSwgMV0sXG4gICAgICAgICAgICBbMCwgMV0sXG4gICAgICAgICAgICBbLTEsIDFdLFxuICAgICAgICAgICAgWy0xLCAwXSxcbiAgICAgICAgICAgIFstMSwgLTFdXG4gICAgICAgIF07XG4gICAgICAgIGxldCBwZXJtdXRhdGlvbnMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmFkaWVudHM7IGkrKykge1xuICAgICAgICAgICAgcGVybXV0YXRpb25zLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgcGVybXV0YXRpb25zID0gUk5HLnNodWZmbGUocGVybXV0YXRpb25zKTtcbiAgICAgICAgdGhpcy5fcGVybXMgPSBbXTtcbiAgICAgICAgdGhpcy5faW5kZXhlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIgKiBncmFkaWVudHM7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fcGVybXMucHVzaChwZXJtdXRhdGlvbnNbaSAlIGdyYWRpZW50c10pO1xuICAgICAgICAgICAgdGhpcy5faW5kZXhlcy5wdXNoKHRoaXMuX3Blcm1zW2ldICUgdGhpcy5fZ3JhZGllbnRzLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0KHhpbiwgeWluKSB7XG4gICAgICAgIGxldCBwZXJtcyA9IHRoaXMuX3Blcm1zO1xuICAgICAgICBsZXQgaW5kZXhlcyA9IHRoaXMuX2luZGV4ZXM7XG4gICAgICAgIGxldCBjb3VudCA9IHBlcm1zLmxlbmd0aCAvIDI7XG4gICAgICAgIGxldCBuMCA9IDAsIG4xID0gMCwgbjIgPSAwLCBnaTsgLy8gTm9pc2UgY29udHJpYnV0aW9ucyBmcm9tIHRoZSB0aHJlZSBjb3JuZXJzXG4gICAgICAgIC8vIFNrZXcgdGhlIGlucHV0IHNwYWNlIHRvIGRldGVybWluZSB3aGljaCBzaW1wbGV4IGNlbGwgd2UncmUgaW5cbiAgICAgICAgbGV0IHMgPSAoeGluICsgeWluKSAqIEYyOyAvLyBIYWlyeSBmYWN0b3IgZm9yIDJEXG4gICAgICAgIGxldCBpID0gTWF0aC5mbG9vcih4aW4gKyBzKTtcbiAgICAgICAgbGV0IGogPSBNYXRoLmZsb29yKHlpbiArIHMpO1xuICAgICAgICBsZXQgdCA9IChpICsgaikgKiBHMjtcbiAgICAgICAgbGV0IFgwID0gaSAtIHQ7IC8vIFVuc2tldyB0aGUgY2VsbCBvcmlnaW4gYmFjayB0byAoeCx5KSBzcGFjZVxuICAgICAgICBsZXQgWTAgPSBqIC0gdDtcbiAgICAgICAgbGV0IHgwID0geGluIC0gWDA7IC8vIFRoZSB4LHkgZGlzdGFuY2VzIGZyb20gdGhlIGNlbGwgb3JpZ2luXG4gICAgICAgIGxldCB5MCA9IHlpbiAtIFkwO1xuICAgICAgICAvLyBGb3IgdGhlIDJEIGNhc2UsIHRoZSBzaW1wbGV4IHNoYXBlIGlzIGFuIGVxdWlsYXRlcmFsIHRyaWFuZ2xlLlxuICAgICAgICAvLyBEZXRlcm1pbmUgd2hpY2ggc2ltcGxleCB3ZSBhcmUgaW4uXG4gICAgICAgIGxldCBpMSwgajE7IC8vIE9mZnNldHMgZm9yIHNlY29uZCAobWlkZGxlKSBjb3JuZXIgb2Ygc2ltcGxleCBpbiAoaSxqKSBjb29yZHNcbiAgICAgICAgaWYgKHgwID4geTApIHtcbiAgICAgICAgICAgIGkxID0gMTtcbiAgICAgICAgICAgIGoxID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy8gbG93ZXIgdHJpYW5nbGUsIFhZIG9yZGVyOiAoMCwwKS0+KDEsMCktPigxLDEpXG4gICAgICAgICAgICBpMSA9IDA7XG4gICAgICAgICAgICBqMSA9IDE7XG4gICAgICAgIH0gLy8gdXBwZXIgdHJpYW5nbGUsIFlYIG9yZGVyOiAoMCwwKS0+KDAsMSktPigxLDEpXG4gICAgICAgIC8vIEEgc3RlcCBvZiAoMSwwKSBpbiAoaSxqKSBtZWFucyBhIHN0ZXAgb2YgKDEtYywtYykgaW4gKHgseSksIGFuZFxuICAgICAgICAvLyBhIHN0ZXAgb2YgKDAsMSkgaW4gKGksaikgbWVhbnMgYSBzdGVwIG9mICgtYywxLWMpIGluICh4LHkpLCB3aGVyZVxuICAgICAgICAvLyBjID0gKDMtc3FydCgzKSkvNlxuICAgICAgICBsZXQgeDEgPSB4MCAtIGkxICsgRzI7IC8vIE9mZnNldHMgZm9yIG1pZGRsZSBjb3JuZXIgaW4gKHgseSkgdW5za2V3ZWQgY29vcmRzXG4gICAgICAgIGxldCB5MSA9IHkwIC0gajEgKyBHMjtcbiAgICAgICAgbGV0IHgyID0geDAgLSAxICsgMiAqIEcyOyAvLyBPZmZzZXRzIGZvciBsYXN0IGNvcm5lciBpbiAoeCx5KSB1bnNrZXdlZCBjb29yZHNcbiAgICAgICAgbGV0IHkyID0geTAgLSAxICsgMiAqIEcyO1xuICAgICAgICAvLyBXb3JrIG91dCB0aGUgaGFzaGVkIGdyYWRpZW50IGluZGljZXMgb2YgdGhlIHRocmVlIHNpbXBsZXggY29ybmVyc1xuICAgICAgICBsZXQgaWkgPSBtb2QoaSwgY291bnQpO1xuICAgICAgICBsZXQgamogPSBtb2QoaiwgY291bnQpO1xuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGNvbnRyaWJ1dGlvbiBmcm9tIHRoZSB0aHJlZSBjb3JuZXJzXG4gICAgICAgIGxldCB0MCA9IDAuNSAtIHgwICogeDAgLSB5MCAqIHkwO1xuICAgICAgICBpZiAodDAgPj0gMCkge1xuICAgICAgICAgICAgdDAgKj0gdDA7XG4gICAgICAgICAgICBnaSA9IGluZGV4ZXNbaWkgKyBwZXJtc1tqal1dO1xuICAgICAgICAgICAgbGV0IGdyYWQgPSB0aGlzLl9ncmFkaWVudHNbZ2ldO1xuICAgICAgICAgICAgbjAgPSB0MCAqIHQwICogKGdyYWRbMF0gKiB4MCArIGdyYWRbMV0gKiB5MCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHQxID0gMC41IC0geDEgKiB4MSAtIHkxICogeTE7XG4gICAgICAgIGlmICh0MSA+PSAwKSB7XG4gICAgICAgICAgICB0MSAqPSB0MTtcbiAgICAgICAgICAgIGdpID0gaW5kZXhlc1tpaSArIGkxICsgcGVybXNbamogKyBqMV1dO1xuICAgICAgICAgICAgbGV0IGdyYWQgPSB0aGlzLl9ncmFkaWVudHNbZ2ldO1xuICAgICAgICAgICAgbjEgPSB0MSAqIHQxICogKGdyYWRbMF0gKiB4MSArIGdyYWRbMV0gKiB5MSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHQyID0gMC41IC0geDIgKiB4MiAtIHkyICogeTI7XG4gICAgICAgIGlmICh0MiA+PSAwKSB7XG4gICAgICAgICAgICB0MiAqPSB0MjtcbiAgICAgICAgICAgIGdpID0gaW5kZXhlc1tpaSArIDEgKyBwZXJtc1tqaiArIDFdXTtcbiAgICAgICAgICAgIGxldCBncmFkID0gdGhpcy5fZ3JhZGllbnRzW2dpXTtcbiAgICAgICAgICAgIG4yID0gdDIgKiB0MiAqIChncmFkWzBdICogeDIgKyBncmFkWzFdICogeTIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCBjb250cmlidXRpb25zIGZyb20gZWFjaCBjb3JuZXIgdG8gZ2V0IHRoZSBmaW5hbCBub2lzZSB2YWx1ZS5cbiAgICAgICAgLy8gVGhlIHJlc3VsdCBpcyBzY2FsZWQgdG8gcmV0dXJuIHZhbHVlcyBpbiB0aGUgaW50ZXJ2YWwgWy0xLDFdLlxuICAgICAgICByZXR1cm4gNzAgKiAobjAgKyBuMSArIG4yKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUGF0aCBmcm9tIFwiLi9wYXRoLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBTaW1wbGlmaWVkIEEqIGFsZ29yaXRobTogYWxsIGVkZ2VzIGhhdmUgYSB2YWx1ZSBvZiAxXG4gKiBAYXVnbWVudHMgUk9ULlBhdGhcbiAqIEBzZWUgUk9ULlBhdGhcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQVN0YXIgZXh0ZW5kcyBQYXRoIHtcbiAgICBjb25zdHJ1Y3Rvcih0b1gsIHRvWSwgcGFzc2FibGVDYWxsYmFjaywgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKHRvWCwgdG9ZLCBwYXNzYWJsZUNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fdG9kbyA9IFtdO1xuICAgICAgICB0aGlzLl9kb25lID0ge307XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgYSBwYXRoIGZyb20gYSBnaXZlbiBwb2ludFxuICAgICAqIEBzZWUgUk9ULlBhdGgjY29tcHV0ZVxuICAgICAqL1xuICAgIGNvbXB1dGUoZnJvbVgsIGZyb21ZLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLl90b2RvID0gW107XG4gICAgICAgIHRoaXMuX2RvbmUgPSB7fTtcbiAgICAgICAgdGhpcy5fZnJvbVggPSBmcm9tWDtcbiAgICAgICAgdGhpcy5fZnJvbVkgPSBmcm9tWTtcbiAgICAgICAgdGhpcy5fYWRkKHRoaXMuX3RvWCwgdGhpcy5fdG9ZLCBudWxsKTtcbiAgICAgICAgd2hpbGUgKHRoaXMuX3RvZG8ubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX3RvZG8uc2hpZnQoKTtcbiAgICAgICAgICAgIGxldCBpZCA9IGl0ZW0ueCArIFwiLFwiICsgaXRlbS55O1xuICAgICAgICAgICAgaWYgKGlkIGluIHRoaXMuX2RvbmUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2RvbmVbaWRdID0gaXRlbTtcbiAgICAgICAgICAgIGlmIChpdGVtLnggPT0gZnJvbVggJiYgaXRlbS55ID09IGZyb21ZKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbmVpZ2hib3JzID0gdGhpcy5fZ2V0TmVpZ2hib3JzKGl0ZW0ueCwgaXRlbS55KTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmVpZ2hib3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5laWdoYm9yID0gbmVpZ2hib3JzW2ldO1xuICAgICAgICAgICAgICAgIGxldCB4ID0gbmVpZ2hib3JbMF07XG4gICAgICAgICAgICAgICAgbGV0IHkgPSBuZWlnaGJvclsxXTtcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSB4ICsgXCIsXCIgKyB5O1xuICAgICAgICAgICAgICAgIGlmIChpZCBpbiB0aGlzLl9kb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9hZGQoeCwgeSwgaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9kb25lW2Zyb21YICsgXCIsXCIgKyBmcm9tWV07XG4gICAgICAgIGlmICghaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChpdGVtKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhpdGVtLngsIGl0ZW0ueSk7XG4gICAgICAgICAgICBpdGVtID0gaXRlbS5wcmV2O1xuICAgICAgICB9XG4gICAgfVxuICAgIF9hZGQoeCwgeSwgcHJldikge1xuICAgICAgICBsZXQgaCA9IHRoaXMuX2Rpc3RhbmNlKHgsIHkpO1xuICAgICAgICBsZXQgb2JqID0ge1xuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICBwcmV2OiBwcmV2LFxuICAgICAgICAgICAgZzogKHByZXYgPyBwcmV2LmcgKyAxIDogMCksXG4gICAgICAgICAgICBoOiBoXG4gICAgICAgIH07XG4gICAgICAgIC8qIGluc2VydCBpbnRvIHByaW9yaXR5IHF1ZXVlICovXG4gICAgICAgIGxldCBmID0gb2JqLmcgKyBvYmouaDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl90b2RvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX3RvZG9baV07XG4gICAgICAgICAgICBsZXQgaXRlbUYgPSBpdGVtLmcgKyBpdGVtLmg7XG4gICAgICAgICAgICBpZiAoZiA8IGl0ZW1GIHx8IChmID09IGl0ZW1GICYmIGggPCBpdGVtLmgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG9kby5zcGxpY2UoaSwgMCwgb2JqKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdG9kby5wdXNoKG9iaik7XG4gICAgfVxuICAgIF9kaXN0YW5jZSh4LCB5KSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fb3B0aW9ucy50b3BvbG9neSkge1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHJldHVybiAoTWF0aC5hYnMoeCAtIHRoaXMuX2Zyb21YKSArIE1hdGguYWJzKHkgLSB0aGlzLl9mcm9tWSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIGxldCBkeCA9IE1hdGguYWJzKHggLSB0aGlzLl9mcm9tWCk7XG4gICAgICAgICAgICAgICAgbGV0IGR5ID0gTWF0aC5hYnMoeSAtIHRoaXMuX2Zyb21ZKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZHkgKyBNYXRoLm1heCgwLCAoZHggLSBkeSkgLyAyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5hYnMoeCAtIHRoaXMuX2Zyb21YKSwgTWF0aC5hYnMoeSAtIHRoaXMuX2Zyb21ZKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgUGF0aCBmcm9tIFwiLi9wYXRoLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBTaW1wbGlmaWVkIERpamtzdHJhJ3MgYWxnb3JpdGhtOiBhbGwgZWRnZXMgaGF2ZSBhIHZhbHVlIG9mIDFcbiAqIEBhdWdtZW50cyBST1QuUGF0aFxuICogQHNlZSBST1QuUGF0aFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaWprc3RyYSBleHRlbmRzIFBhdGgge1xuICAgIGNvbnN0cnVjdG9yKHRvWCwgdG9ZLCBwYXNzYWJsZUNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKHRvWCwgdG9ZLCBwYXNzYWJsZUNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fY29tcHV0ZWQgPSB7fTtcbiAgICAgICAgdGhpcy5fdG9kbyA9IFtdO1xuICAgICAgICB0aGlzLl9hZGQodG9YLCB0b1ksIG51bGwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIGEgcGF0aCBmcm9tIGEgZ2l2ZW4gcG9pbnRcbiAgICAgKiBAc2VlIFJPVC5QYXRoI2NvbXB1dGVcbiAgICAgKi9cbiAgICBjb21wdXRlKGZyb21YLCBmcm9tWSwgY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGtleSA9IGZyb21YICsgXCIsXCIgKyBmcm9tWTtcbiAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMuX2NvbXB1dGVkKSkge1xuICAgICAgICAgICAgdGhpcy5fY29tcHV0ZShmcm9tWCwgZnJvbVkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghKGtleSBpbiB0aGlzLl9jb21wdXRlZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2NvbXB1dGVkW2tleV07XG4gICAgICAgIHdoaWxlIChpdGVtKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhpdGVtLngsIGl0ZW0ueSk7XG4gICAgICAgICAgICBpdGVtID0gaXRlbS5wcmV2O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgYSBub24tY2FjaGVkIHZhbHVlXG4gICAgICovXG4gICAgX2NvbXB1dGUoZnJvbVgsIGZyb21ZKSB7XG4gICAgICAgIHdoaWxlICh0aGlzLl90b2RvLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl90b2RvLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoaXRlbS54ID09IGZyb21YICYmIGl0ZW0ueSA9PSBmcm9tWSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBuZWlnaGJvcnMgPSB0aGlzLl9nZXROZWlnaGJvcnMoaXRlbS54LCBpdGVtLnkpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHggPSBuZWlnaGJvclswXTtcbiAgICAgICAgICAgICAgICBsZXQgeSA9IG5laWdoYm9yWzFdO1xuICAgICAgICAgICAgICAgIGxldCBpZCA9IHggKyBcIixcIiArIHk7XG4gICAgICAgICAgICAgICAgaWYgKGlkIGluIHRoaXMuX2NvbXB1dGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH0gLyogYWxyZWFkeSBkb25lICovXG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkKHgsIHksIGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9hZGQoeCwgeSwgcHJldikge1xuICAgICAgICBsZXQgb2JqID0ge1xuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICBwcmV2OiBwcmV2XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2NvbXB1dGVkW3ggKyBcIixcIiArIHldID0gb2JqO1xuICAgICAgICB0aGlzLl90b2RvLnB1c2gob2JqKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgRGlqa3N0cmEgZnJvbSBcIi4vZGlqa3N0cmEuanNcIjtcbmltcG9ydCBBU3RhciBmcm9tIFwiLi9hc3Rhci5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgeyBEaWprc3RyYSwgQVN0YXIgfTtcbiIsImltcG9ydCB7IERJUlMgfSBmcm9tIFwiLi4vY29uc3RhbnRzLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBBYnN0cmFjdCBwYXRoZmluZGVyXG4gKiBAcGFyYW0ge2ludH0gdG9YIFRhcmdldCBYIGNvb3JkXG4gKiBAcGFyYW0ge2ludH0gdG9ZIFRhcmdldCBZIGNvb3JkXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwYXNzYWJsZUNhbGxiYWNrIENhbGxiYWNrIHRvIGRldGVybWluZSBtYXAgcGFzc2FiaWxpdHlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7aW50fSBbb3B0aW9ucy50b3BvbG9neT04XVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXRoIHtcbiAgICBjb25zdHJ1Y3Rvcih0b1gsIHRvWSwgcGFzc2FibGVDYWxsYmFjaywgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX3RvWCA9IHRvWDtcbiAgICAgICAgdGhpcy5fdG9ZID0gdG9ZO1xuICAgICAgICB0aGlzLl9wYXNzYWJsZUNhbGxiYWNrID0gcGFzc2FibGVDYWxsYmFjaztcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgdG9wb2xvZ3k6IDhcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2RpcnMgPSBESVJTW3RoaXMuX29wdGlvbnMudG9wb2xvZ3ldO1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50b3BvbG9neSA9PSA4KSB7IC8qIHJlb3JkZXIgZGlycyBmb3IgbW9yZSBhZXN0aGV0aWMgcmVzdWx0ICh2ZXJ0aWNhbC9ob3Jpem9udGFsIGZpcnN0KSAqL1xuICAgICAgICAgICAgdGhpcy5fZGlycyA9IFtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJzWzBdLFxuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnNbMl0sXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyc1s0XSxcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJzWzZdLFxuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnNbMV0sXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyc1szXSxcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJzWzVdLFxuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnNbN11cbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2dldE5laWdoYm9ycyhjeCwgY3kpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkaXIgPSB0aGlzLl9kaXJzW2ldO1xuICAgICAgICAgICAgbGV0IHggPSBjeCArIGRpclswXTtcbiAgICAgICAgICAgIGxldCB5ID0gY3kgKyBkaXJbMV07XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3Bhc3NhYmxlQ2FsbGJhY2soeCwgeSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFt4LCB5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iLCIvKipcbiAqIFRoaXMgY29kZSBpcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiBBbGVhIGFsZ29yaXRobTsgKEMpIDIwMTAgSm9oYW5uZXMgQmFhZ8O4ZS5cbiAqIEFsZWEgaXMgbGljZW5zZWQgYWNjb3JkaW5nIHRvIHRoZSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01JVF9MaWNlbnNlLlxuICovXG5jb25zdCBGUkFDID0gMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLyogMl4tMzIgKi9cbmNsYXNzIFJORyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3NlZWQgPSAwO1xuICAgICAgICB0aGlzLl9zMCA9IDA7XG4gICAgICAgIHRoaXMuX3MxID0gMDtcbiAgICAgICAgdGhpcy5fczIgPSAwO1xuICAgICAgICB0aGlzLl9jID0gMDtcbiAgICB9XG4gICAgZ2V0U2VlZCgpIHsgcmV0dXJuIHRoaXMuX3NlZWQ7IH1cbiAgICAvKipcbiAgICAgKiBTZWVkIHRoZSBudW1iZXIgZ2VuZXJhdG9yXG4gICAgICovXG4gICAgc2V0U2VlZChzZWVkKSB7XG4gICAgICAgIHNlZWQgPSAoc2VlZCA8IDEgPyAxIC8gc2VlZCA6IHNlZWQpO1xuICAgICAgICB0aGlzLl9zZWVkID0gc2VlZDtcbiAgICAgICAgdGhpcy5fczAgPSAoc2VlZCA+Pj4gMCkgKiBGUkFDO1xuICAgICAgICBzZWVkID0gKHNlZWQgKiA2OTA2OSArIDEpID4+PiAwO1xuICAgICAgICB0aGlzLl9zMSA9IHNlZWQgKiBGUkFDO1xuICAgICAgICBzZWVkID0gKHNlZWQgKiA2OTA2OSArIDEpID4+PiAwO1xuICAgICAgICB0aGlzLl9zMiA9IHNlZWQgKiBGUkFDO1xuICAgICAgICB0aGlzLl9jID0gMTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFBzZXVkb3JhbmRvbSB2YWx1ZSBbMCwxKSwgdW5pZm9ybWx5IGRpc3RyaWJ1dGVkXG4gICAgICovXG4gICAgZ2V0VW5pZm9ybSgpIHtcbiAgICAgICAgbGV0IHQgPSAyMDkxNjM5ICogdGhpcy5fczAgKyB0aGlzLl9jICogRlJBQztcbiAgICAgICAgdGhpcy5fczAgPSB0aGlzLl9zMTtcbiAgICAgICAgdGhpcy5fczEgPSB0aGlzLl9zMjtcbiAgICAgICAgdGhpcy5fYyA9IHQgfCAwO1xuICAgICAgICB0aGlzLl9zMiA9IHQgLSB0aGlzLl9jO1xuICAgICAgICByZXR1cm4gdGhpcy5fczI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBsb3dlckJvdW5kIFRoZSBsb3dlciBlbmQgb2YgdGhlIHJhbmdlIHRvIHJldHVybiBhIHZhbHVlIGZyb20sIGluY2x1c2l2ZVxuICAgICAqIEBwYXJhbSB1cHBlckJvdW5kIFRoZSB1cHBlciBlbmQgb2YgdGhlIHJhbmdlIHRvIHJldHVybiBhIHZhbHVlIGZyb20sIGluY2x1c2l2ZVxuICAgICAqIEByZXR1cm5zIFBzZXVkb3JhbmRvbSB2YWx1ZSBbbG93ZXJCb3VuZCwgdXBwZXJCb3VuZF0sIHVzaW5nIFJPVC5STkcuZ2V0VW5pZm9ybSgpIHRvIGRpc3RyaWJ1dGUgdGhlIHZhbHVlXG4gICAgICovXG4gICAgZ2V0VW5pZm9ybUludChsb3dlckJvdW5kLCB1cHBlckJvdW5kKSB7XG4gICAgICAgIGxldCBtYXggPSBNYXRoLm1heChsb3dlckJvdW5kLCB1cHBlckJvdW5kKTtcbiAgICAgICAgbGV0IG1pbiA9IE1hdGgubWluKGxvd2VyQm91bmQsIHVwcGVyQm91bmQpO1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmdldFVuaWZvcm0oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtZWFuIE1lYW4gdmFsdWVcbiAgICAgKiBAcGFyYW0gc3RkZGV2IFN0YW5kYXJkIGRldmlhdGlvbi4gfjk1JSBvZiB0aGUgYWJzb2x1dGUgdmFsdWVzIHdpbGwgYmUgbG93ZXIgdGhhbiAyKnN0ZGRldi5cbiAgICAgKiBAcmV0dXJucyBBIG5vcm1hbGx5IGRpc3RyaWJ1dGVkIHBzZXVkb3JhbmRvbSB2YWx1ZVxuICAgICAqL1xuICAgIGdldE5vcm1hbChtZWFuID0gMCwgc3RkZGV2ID0gMSkge1xuICAgICAgICBsZXQgdSwgdiwgcjtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgdSA9IDIgKiB0aGlzLmdldFVuaWZvcm0oKSAtIDE7XG4gICAgICAgICAgICB2ID0gMiAqIHRoaXMuZ2V0VW5pZm9ybSgpIC0gMTtcbiAgICAgICAgICAgIHIgPSB1ICogdSArIHYgKiB2O1xuICAgICAgICB9IHdoaWxlIChyID4gMSB8fCByID09IDApO1xuICAgICAgICBsZXQgZ2F1c3MgPSB1ICogTWF0aC5zcXJ0KC0yICogTWF0aC5sb2cocikgLyByKTtcbiAgICAgICAgcmV0dXJuIG1lYW4gKyBnYXVzcyAqIHN0ZGRldjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgUHNldWRvcmFuZG9tIHZhbHVlIFsxLDEwMF0gaW5jbHVzaXZlLCB1bmlmb3JtbHkgZGlzdHJpYnV0ZWRcbiAgICAgKi9cbiAgICBnZXRQZXJjZW50YWdlKCkge1xuICAgICAgICByZXR1cm4gMSArIE1hdGguZmxvb3IodGhpcy5nZXRVbmlmb3JtKCkgKiAxMDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBSYW5kb21seSBwaWNrZWQgaXRlbSwgbnVsbCB3aGVuIGxlbmd0aD0wXG4gICAgICovXG4gICAgZ2V0SXRlbShhcnJheSkge1xuICAgICAgICBpZiAoIWFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5W01hdGguZmxvb3IodGhpcy5nZXRVbmlmb3JtKCkgKiBhcnJheS5sZW5ndGgpXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgTmV3IGFycmF5IHdpdGggcmFuZG9taXplZCBpdGVtc1xuICAgICAqL1xuICAgIHNodWZmbGUoYXJyYXkpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgY2xvbmUgPSBhcnJheS5zbGljZSgpO1xuICAgICAgICB3aGlsZSAoY2xvbmUubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBjbG9uZS5pbmRleE9mKHRoaXMuZ2V0SXRlbShjbG9uZSkpO1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goY2xvbmUuc3BsaWNlKGluZGV4LCAxKVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGEga2V5PXdoYXRldmVyLCB2YWx1ZT13ZWlnaHQgKHJlbGF0aXZlIHByb2JhYmlsaXR5KVxuICAgICAqIEByZXR1cm5zIHdoYXRldmVyXG4gICAgICovXG4gICAgZ2V0V2VpZ2h0ZWRWYWx1ZShkYXRhKSB7XG4gICAgICAgIGxldCB0b3RhbCA9IDA7XG4gICAgICAgIGZvciAobGV0IGlkIGluIGRhdGEpIHtcbiAgICAgICAgICAgIHRvdGFsICs9IGRhdGFbaWRdO1xuICAgICAgICB9XG4gICAgICAgIGxldCByYW5kb20gPSB0aGlzLmdldFVuaWZvcm0oKSAqIHRvdGFsO1xuICAgICAgICBsZXQgaWQsIHBhcnQgPSAwO1xuICAgICAgICBmb3IgKGlkIGluIGRhdGEpIHtcbiAgICAgICAgICAgIHBhcnQgKz0gZGF0YVtpZF07XG4gICAgICAgICAgICBpZiAocmFuZG9tIDwgcGFydCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBieSBzb21lIGZsb2F0aW5nLXBvaW50IGFubm95YW5jZSB3ZSBoYXZlXG4gICAgICAgIC8vIHJhbmRvbSA+PSB0b3RhbCwganVzdCByZXR1cm4gdGhlIGxhc3QgaWQuXG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IFJORyBzdGF0ZS4gVXNlZnVsIGZvciBzdG9yaW5nIHRoZSBzdGF0ZSBhbmQgcmUtc2V0dGluZyBpdCB2aWEgc2V0U3RhdGUuXG4gICAgICogQHJldHVybnMgSW50ZXJuYWwgc3RhdGVcbiAgICAgKi9cbiAgICBnZXRTdGF0ZSgpIHsgcmV0dXJuIFt0aGlzLl9zMCwgdGhpcy5fczEsIHRoaXMuX3MyLCB0aGlzLl9jXTsgfVxuICAgIC8qKlxuICAgICAqIFNldCBhIHByZXZpb3VzbHkgcmV0cmlldmVkIHN0YXRlLlxuICAgICAqL1xuICAgIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuX3MwID0gc3RhdGVbMF07XG4gICAgICAgIHRoaXMuX3MxID0gc3RhdGVbMV07XG4gICAgICAgIHRoaXMuX3MyID0gc3RhdGVbMl07XG4gICAgICAgIHRoaXMuX2MgPSBzdGF0ZVszXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBjbG9uZWQgUk5HXG4gICAgICovXG4gICAgY2xvbmUoKSB7XG4gICAgICAgIGxldCBjbG9uZSA9IG5ldyBSTkcoKTtcbiAgICAgICAgcmV0dXJuIGNsb25lLnNldFN0YXRlKHRoaXMuZ2V0U3RhdGUoKSk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IFJORygpLnNldFNlZWQoRGF0ZS5ub3coKSk7XG4iLCJpbXBvcnQgU2NoZWR1bGVyIGZyb20gXCIuL3NjaGVkdWxlci5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgQWN0aW9uLWJhc2VkIHNjaGVkdWxlclxuICogQGF1Z21lbnRzIFJPVC5TY2hlZHVsZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0aW9uIGV4dGVuZHMgU2NoZWR1bGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZGVmYXVsdER1cmF0aW9uID0gMTsgLyogZm9yIG5ld2x5IGFkZGVkICovXG4gICAgICAgIHRoaXMuX2R1cmF0aW9uID0gdGhpcy5fZGVmYXVsdER1cmF0aW9uOyAvKiBmb3IgdGhpcy5fY3VycmVudCAqL1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaXRlbVxuICAgICAqIEBwYXJhbSB7Ym9vbH0gcmVwZWF0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lPTFdXG4gICAgICogQHNlZSBST1QuU2NoZWR1bGVyI2FkZFxuICAgICAqL1xuICAgIGFkZChpdGVtLCByZXBlYXQsIHRpbWUpIHtcbiAgICAgICAgdGhpcy5fcXVldWUuYWRkKGl0ZW0sIHRpbWUgfHwgdGhpcy5fZGVmYXVsdER1cmF0aW9uKTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFkZChpdGVtLCByZXBlYXQpO1xuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fZHVyYXRpb24gPSB0aGlzLl9kZWZhdWx0RHVyYXRpb247XG4gICAgICAgIHJldHVybiBzdXBlci5jbGVhcigpO1xuICAgIH1cbiAgICByZW1vdmUoaXRlbSkge1xuICAgICAgICBpZiAoaXRlbSA9PSB0aGlzLl9jdXJyZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IHRoaXMuX2RlZmF1bHREdXJhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIucmVtb3ZlKGl0ZW0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAc2VlIFJPVC5TY2hlZHVsZXIjbmV4dFxuICAgICAqL1xuICAgIG5leHQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50ICE9PSBudWxsICYmIHRoaXMuX3JlcGVhdC5pbmRleE9mKHRoaXMuX2N1cnJlbnQpICE9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9xdWV1ZS5hZGQodGhpcy5fY3VycmVudCwgdGhpcy5fZHVyYXRpb24gfHwgdGhpcy5fZGVmYXVsdER1cmF0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuX2R1cmF0aW9uID0gdGhpcy5fZGVmYXVsdER1cmF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5uZXh0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCBkdXJhdGlvbiBmb3IgdGhlIGFjdGl2ZSBpdGVtXG4gICAgICovXG4gICAgc2V0RHVyYXRpb24odGltZSkge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudCkge1xuICAgICAgICAgICAgdGhpcy5fZHVyYXRpb24gPSB0aW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCBTaW1wbGUgZnJvbSBcIi4vc2ltcGxlLmpzXCI7XG5pbXBvcnQgU3BlZWQgZnJvbSBcIi4vc3BlZWQuanNcIjtcbmltcG9ydCBBY3Rpb24gZnJvbSBcIi4vYWN0aW9uLmpzXCI7XG5leHBvcnQgZGVmYXVsdCB7IFNpbXBsZSwgU3BlZWQsIEFjdGlvbiB9O1xuIiwiaW1wb3J0IEV2ZW50UXVldWUgZnJvbSBcIi4uL2V2ZW50cXVldWUuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjaGVkdWxlciB7XG4gICAgLyoqXG4gICAgICogQGNsYXNzIEFic3RyYWN0IHNjaGVkdWxlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9xdWV1ZSA9IG5ldyBFdmVudFF1ZXVlKCk7XG4gICAgICAgIHRoaXMuX3JlcGVhdCA9IFtdO1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHNlZSBST1QuRXZlbnRRdWV1ZSNnZXRUaW1lXG4gICAgICovXG4gICAgZ2V0VGltZSgpIHsgcmV0dXJuIHRoaXMuX3F1ZXVlLmdldFRpbWUoKTsgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gaXRlbVxuICAgICAqIEBwYXJhbSB7Ym9vbH0gcmVwZWF0XG4gICAgICovXG4gICAgYWRkKGl0ZW0sIHJlcGVhdCkge1xuICAgICAgICBpZiAocmVwZWF0KSB7XG4gICAgICAgICAgICB0aGlzLl9yZXBlYXQucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0aW1lIHRoZSBnaXZlbiBpdGVtIGlzIHNjaGVkdWxlZCBmb3JcbiAgICAgKiBAcGFyYW0gez99IGl0ZW1cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aW1lXG4gICAgICovXG4gICAgZ2V0VGltZU9mKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXVlLmdldEV2ZW50VGltZShpdGVtKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYXIgYWxsIGl0ZW1zXG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX3F1ZXVlLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuX3JlcGVhdCA9IFtdO1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIHByZXZpb3VzbHkgYWRkZWQgaXRlbVxuICAgICAqIEBwYXJhbSB7P30gaXRlbVxuICAgICAqIEByZXR1cm5zIHtib29sfSBzdWNjZXNzZnVsP1xuICAgICAqL1xuICAgIHJlbW92ZShpdGVtKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLl9xdWV1ZS5yZW1vdmUoaXRlbSk7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuX3JlcGVhdC5pbmRleE9mKGl0ZW0pO1xuICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlcGVhdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50ID09IGl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNjaGVkdWxlIG5leHQgaXRlbVxuICAgICAqIEByZXR1cm5zIHs/fVxuICAgICAqL1xuICAgIG5leHQoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSB0aGlzLl9xdWV1ZS5nZXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNjaGVkdWxlciBmcm9tIFwiLi9zY2hlZHVsZXIuanNcIjtcbi8qKlxuICogQGNsYXNzIFNpbXBsZSBmYWlyIHNjaGVkdWxlciAocm91bmQtcm9iaW4gc3R5bGUpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXBsZSBleHRlbmRzIFNjaGVkdWxlciB7XG4gICAgYWRkKGl0ZW0sIHJlcGVhdCkge1xuICAgICAgICB0aGlzLl9xdWV1ZS5hZGQoaXRlbSwgMCk7XG4gICAgICAgIHJldHVybiBzdXBlci5hZGQoaXRlbSwgcmVwZWF0KTtcbiAgICB9XG4gICAgbmV4dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnQgIT09IG51bGwgJiYgdGhpcy5fcmVwZWF0LmluZGV4T2YodGhpcy5fY3VycmVudCkgIT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXVlLmFkZCh0aGlzLl9jdXJyZW50LCAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIubmV4dCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBTY2hlZHVsZXIgZnJvbSBcIi4vc2NoZWR1bGVyLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBTcGVlZC1iYXNlZCBzY2hlZHVsZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BlZWQgZXh0ZW5kcyBTY2hlZHVsZXIge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtIGFueXRoaW5nIHdpdGggXCJnZXRTcGVlZFwiIG1ldGhvZFxuICAgICAqIEBwYXJhbSB7Ym9vbH0gcmVwZWF0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lPTEvaXRlbS5nZXRTcGVlZCgpXVxuICAgICAqIEBzZWUgUk9ULlNjaGVkdWxlciNhZGRcbiAgICAgKi9cbiAgICBhZGQoaXRlbSwgcmVwZWF0LCB0aW1lKSB7XG4gICAgICAgIHRoaXMuX3F1ZXVlLmFkZChpdGVtLCB0aW1lICE9PSB1bmRlZmluZWQgPyB0aW1lIDogMSAvIGl0ZW0uZ2V0U3BlZWQoKSk7XG4gICAgICAgIHJldHVybiBzdXBlci5hZGQoaXRlbSwgcmVwZWF0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHNlZSBST1QuU2NoZWR1bGVyI25leHRcbiAgICAgKi9cbiAgICBuZXh0KCkge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudCAmJiB0aGlzLl9yZXBlYXQuaW5kZXhPZih0aGlzLl9jdXJyZW50KSAhPSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fcXVldWUuYWRkKHRoaXMuX2N1cnJlbnQsIDEgLyB0aGlzLl9jdXJyZW50LmdldFNwZWVkKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5uZXh0KCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJORyBmcm9tIFwiLi9ybmcuanNcIjtcbi8qKlxuICogQGNsYXNzIChNYXJrb3YgcHJvY2VzcyktYmFzZWQgc3RyaW5nIGdlbmVyYXRvci5cbiAqIENvcGllZCBmcm9tIGEgPGEgaHJlZj1cImh0dHA6Ly93d3cucm9ndWViYXNpbi5yb2d1ZWxpa2VkZXZlbG9wbWVudC5vcmcvaW5kZXgucGhwP3RpdGxlPU5hbWVzX2Zyb21fYV9oaWdoX29yZGVyX01hcmtvdl9Qcm9jZXNzX2FuZF9hX3NpbXBsaWZpZWRfS2F0el9iYWNrLW9mZl9zY2hlbWVcIj5Sb2d1ZUJhc2luIGFydGljbGU8L2E+LlxuICogT2ZmZXJzIGNvbmZpZ3VyYWJsZSBvcmRlciBhbmQgcHJpb3IuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0cmluZ0dlbmVyYXRvciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0ge1xuICAgICAgICAgICAgd29yZHM6IGZhbHNlLFxuICAgICAgICAgICAgb3JkZXI6IDMsXG4gICAgICAgICAgICBwcmlvcjogMC4wMDFcbiAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fYm91bmRhcnkgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDApO1xuICAgICAgICB0aGlzLl9zdWZmaXggPSB0aGlzLl9ib3VuZGFyeTtcbiAgICAgICAgdGhpcy5fcHJlZml4ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fb3B0aW9ucy5vcmRlcjsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmVmaXgucHVzaCh0aGlzLl9ib3VuZGFyeSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcHJpb3JWYWx1ZXMgPSB7fTtcbiAgICAgICAgdGhpcy5fcHJpb3JWYWx1ZXNbdGhpcy5fYm91bmRhcnldID0gdGhpcy5fb3B0aW9ucy5wcmlvcjtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGxlYXJuaW5nIGRhdGFcbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgICAgICB0aGlzLl9wcmlvclZhbHVlcyA9IHt9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBHZW5lcmF0ZWQgc3RyaW5nXG4gICAgICovXG4gICAgZ2VuZXJhdGUoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbdGhpcy5fc2FtcGxlKHRoaXMuX3ByZWZpeCldO1xuICAgICAgICB3aGlsZSAocmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSAhPSB0aGlzLl9ib3VuZGFyeSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5fc2FtcGxlKHJlc3VsdCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9qb2luKHJlc3VsdC5zbGljZSgwLCAtMSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPYnNlcnZlIChsZWFybikgYSBzdHJpbmcgZnJvbSBhIHRyYWluaW5nIHNldFxuICAgICAqL1xuICAgIG9ic2VydmUoc3RyaW5nKSB7XG4gICAgICAgIGxldCB0b2tlbnMgPSB0aGlzLl9zcGxpdChzdHJpbmcpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fcHJpb3JWYWx1ZXNbdG9rZW5zW2ldXSA9IHRoaXMuX29wdGlvbnMucHJpb3I7XG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5zID0gdGhpcy5fcHJlZml4LmNvbmNhdCh0b2tlbnMpLmNvbmNhdCh0aGlzLl9zdWZmaXgpOyAvKiBhZGQgYm91bmRhcnkgc3ltYm9scyAqL1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fb3B0aW9ucy5vcmRlcjsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSB0b2tlbnMuc2xpY2UoaSAtIHRoaXMuX29wdGlvbnMub3JkZXIsIGkpO1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gdG9rZW5zW2ldO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb250ZXh0Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN1YmNvbnRleHQgPSBjb250ZXh0LnNsaWNlKGopO1xuICAgICAgICAgICAgICAgIHRoaXMuX29ic2VydmVFdmVudChzdWJjb250ZXh0LCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0U3RhdHMoKSB7XG4gICAgICAgIGxldCBwYXJ0cyA9IFtdO1xuICAgICAgICBsZXQgcHJpb3JDb3VudCA9IE9iamVjdC5rZXlzKHRoaXMuX3ByaW9yVmFsdWVzKS5sZW5ndGg7XG4gICAgICAgIHByaW9yQ291bnQtLTsgLy8gYm91bmRhcnlcbiAgICAgICAgcGFydHMucHVzaChcImRpc3RpbmN0IHNhbXBsZXM6IFwiICsgcHJpb3JDb3VudCk7XG4gICAgICAgIGxldCBkYXRhQ291bnQgPSBPYmplY3Qua2V5cyh0aGlzLl9kYXRhKS5sZW5ndGg7XG4gICAgICAgIGxldCBldmVudENvdW50ID0gMDtcbiAgICAgICAgZm9yIChsZXQgcCBpbiB0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgICBldmVudENvdW50ICs9IE9iamVjdC5rZXlzKHRoaXMuX2RhdGFbcF0pLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKFwiZGljdGlvbmFyeSBzaXplIChjb250ZXh0cyk6IFwiICsgZGF0YUNvdW50KTtcbiAgICAgICAgcGFydHMucHVzaChcImRpY3Rpb25hcnkgc2l6ZSAoZXZlbnRzKTogXCIgKyBldmVudENvdW50KTtcbiAgICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oXCIsIFwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9XG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgICAqL1xuICAgIF9zcGxpdChzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5zcGxpdCh0aGlzLl9vcHRpb25zLndvcmRzID8gL1xccysvIDogXCJcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119XG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBfam9pbihhcnIpIHtcbiAgICAgICAgcmV0dXJuIGFyci5qb2luKHRoaXMuX29wdGlvbnMud29yZHMgPyBcIiBcIiA6IFwiXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBjb250ZXh0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50XG4gICAgICovXG4gICAgX29ic2VydmVFdmVudChjb250ZXh0LCBldmVudCkge1xuICAgICAgICBsZXQga2V5ID0gdGhpcy5fam9pbihjb250ZXh0KTtcbiAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMuX2RhdGEpKSB7XG4gICAgICAgICAgICB0aGlzLl9kYXRhW2tleV0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuX2RhdGFba2V5XTtcbiAgICAgICAgaWYgKCEoZXZlbnQgaW4gZGF0YSkpIHtcbiAgICAgICAgICAgIGRhdGFbZXZlbnRdID0gMDtcbiAgICAgICAgfVxuICAgICAgICBkYXRhW2V2ZW50XSsrO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgX3NhbXBsZShjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQgPSB0aGlzLl9iYWNrb2ZmKGNvbnRleHQpO1xuICAgICAgICBsZXQga2V5ID0gdGhpcy5fam9pbihjb250ZXh0KTtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLl9kYXRhW2tleV07XG4gICAgICAgIGxldCBhdmFpbGFibGUgPSB7fTtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMucHJpb3IpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGV2ZW50IGluIHRoaXMuX3ByaW9yVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlW2V2ZW50XSA9IHRoaXMuX3ByaW9yVmFsdWVzW2V2ZW50XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGV2ZW50IGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVbZXZlbnRdICs9IGRhdGFbZXZlbnRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXZhaWxhYmxlID0gZGF0YTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUk5HLmdldFdlaWdodGVkVmFsdWUoYXZhaWxhYmxlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAgICovXG4gICAgX2JhY2tvZmYoY29udGV4dCkge1xuICAgICAgICBpZiAoY29udGV4dC5sZW5ndGggPiB0aGlzLl9vcHRpb25zLm9yZGVyKSB7XG4gICAgICAgICAgICBjb250ZXh0ID0gY29udGV4dC5zbGljZSgtdGhpcy5fb3B0aW9ucy5vcmRlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29udGV4dC5sZW5ndGggPCB0aGlzLl9vcHRpb25zLm9yZGVyKSB7XG4gICAgICAgICAgICBjb250ZXh0ID0gdGhpcy5fcHJlZml4LnNsaWNlKDAsIHRoaXMuX29wdGlvbnMub3JkZXIgLSBjb250ZXh0Lmxlbmd0aCkuY29uY2F0KGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICghKHRoaXMuX2pvaW4oY29udGV4dCkgaW4gdGhpcy5fZGF0YSkgJiYgY29udGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb250ZXh0ID0gY29udGV4dC5zbGljZSgxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBuYW1lc3BhY2VcbiAqIENvbnRhaW5zIHRleHQgdG9rZW5pemF0aW9uIGFuZCBicmVha2luZyByb3V0aW5lc1xuICovXG5jb25zdCBSRV9DT0xPUlMgPSAvJShbYmNdKXsoW159XSopfS9nO1xuLy8gdG9rZW4gdHlwZXNcbmV4cG9ydCBjb25zdCBUWVBFX1RFWFQgPSAwO1xuZXhwb3J0IGNvbnN0IFRZUEVfTkVXTElORSA9IDE7XG5leHBvcnQgY29uc3QgVFlQRV9GRyA9IDI7XG5leHBvcnQgY29uc3QgVFlQRV9CRyA9IDM7XG4vKipcbiAqIE1lYXN1cmUgc2l6ZSBvZiBhIHJlc3VsdGluZyB0ZXh0IGJsb2NrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZWFzdXJlKHN0ciwgbWF4V2lkdGgpIHtcbiAgICBsZXQgcmVzdWx0ID0geyB3aWR0aDogMCwgaGVpZ2h0OiAxIH07XG4gICAgbGV0IHRva2VucyA9IHRva2VuaXplKHN0ciwgbWF4V2lkdGgpO1xuICAgIGxldCBsaW5lV2lkdGggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgc3dpdGNoICh0b2tlbi50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFRZUEVfVEVYVDpcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGggKz0gdG9rZW4udmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUWVBFX05FV0xJTkU6XG4gICAgICAgICAgICAgICAgcmVzdWx0LmhlaWdodCsrO1xuICAgICAgICAgICAgICAgIHJlc3VsdC53aWR0aCA9IE1hdGgubWF4KHJlc3VsdC53aWR0aCwgbGluZVdpZHRoKTtcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGggPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC53aWR0aCA9IE1hdGgubWF4KHJlc3VsdC53aWR0aCwgbGluZVdpZHRoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBDb252ZXJ0IHN0cmluZyB0byBhIHNlcmllcyBvZiBhIGZvcm1hdHRpbmcgY29tbWFuZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRva2VuaXplKHN0ciwgbWF4V2lkdGgpIHtcbiAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgLyogZmlyc3QgdG9rZW5pemF0aW9uIHBhc3MgLSBzcGxpdCB0ZXh0cyBhbmQgY29sb3IgZm9ybWF0dGluZyBjb21tYW5kcyAqL1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIHN0ci5yZXBsYWNlKFJFX0NPTE9SUywgZnVuY3Rpb24gKG1hdGNoLCB0eXBlLCBuYW1lLCBpbmRleCkge1xuICAgICAgICAvKiBzdHJpbmcgYmVmb3JlICovXG4gICAgICAgIGxldCBwYXJ0ID0gc3RyLnN1YnN0cmluZyhvZmZzZXQsIGluZGV4KTtcbiAgICAgICAgaWYgKHBhcnQubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogVFlQRV9URVhULFxuICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJ0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKiBjb2xvciBjb21tYW5kICovXG4gICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6ICh0eXBlID09IFwiY1wiID8gVFlQRV9GRyA6IFRZUEVfQkcpLFxuICAgICAgICAgICAgdmFsdWU6IG5hbWUudHJpbSgpXG4gICAgICAgIH0pO1xuICAgICAgICBvZmZzZXQgPSBpbmRleCArIG1hdGNoLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfSk7XG4gICAgLyogbGFzdCByZW1haW5pbmcgcGFydCAqL1xuICAgIGxldCBwYXJ0ID0gc3RyLnN1YnN0cmluZyhvZmZzZXQpO1xuICAgIGlmIChwYXJ0Lmxlbmd0aCkge1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBUWVBFX1RFWFQsXG4gICAgICAgICAgICB2YWx1ZTogcGFydFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGJyZWFrTGluZXMocmVzdWx0LCBtYXhXaWR0aCk7XG59XG4vKiBpbnNlcnQgbGluZSBicmVha3MgaW50byBmaXJzdC1wYXNzIHRva2VuaXplZCBkYXRhICovXG5mdW5jdGlvbiBicmVha0xpbmVzKHRva2VucywgbWF4V2lkdGgpIHtcbiAgICBpZiAoIW1heFdpZHRoKSB7XG4gICAgICAgIG1heFdpZHRoID0gSW5maW5pdHk7XG4gICAgfVxuICAgIGxldCBpID0gMDtcbiAgICBsZXQgbGluZUxlbmd0aCA9IDA7XG4gICAgbGV0IGxhc3RUb2tlbldpdGhTcGFjZSA9IC0xO1xuICAgIHdoaWxlIChpIDwgdG9rZW5zLmxlbmd0aCkgeyAvKiB0YWtlIGFsbCB0ZXh0IHRva2VucywgcmVtb3ZlIHNwYWNlLCBhcHBseSBsaW5lYnJlYWtzICovXG4gICAgICAgIGxldCB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT0gVFlQRV9ORVdMSU5FKSB7IC8qIHJlc2V0ICovXG4gICAgICAgICAgICBsaW5lTGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGxhc3RUb2tlbldpdGhTcGFjZSA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b2tlbi50eXBlICE9IFRZUEVfVEVYVCkgeyAvKiBza2lwIG5vbi10ZXh0IHRva2VucyAqL1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLyogcmVtb3ZlIHNwYWNlcyBhdCB0aGUgYmVnaW5uaW5nIG9mIGxpbmUgKi9cbiAgICAgICAgd2hpbGUgKGxpbmVMZW5ndGggPT0gMCAmJiB0b2tlbi52YWx1ZS5jaGFyQXQoMCkgPT0gXCIgXCIpIHtcbiAgICAgICAgICAgIHRva2VuLnZhbHVlID0gdG9rZW4udmFsdWUuc3Vic3RyaW5nKDEpO1xuICAgICAgICB9XG4gICAgICAgIC8qIGZvcmNlZCBuZXdsaW5lPyBpbnNlcnQgdHdvIG5ldyB0b2tlbnMgYWZ0ZXIgdGhpcyBvbmUgKi9cbiAgICAgICAgbGV0IGluZGV4ID0gdG9rZW4udmFsdWUuaW5kZXhPZihcIlxcblwiKTtcbiAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICB0b2tlbi52YWx1ZSA9IGJyZWFrSW5zaWRlVG9rZW4odG9rZW5zLCBpLCBpbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgICAvKiBpZiB0aGVyZSBhcmUgc3BhY2VzIGF0IHRoZSBlbmQsIHdlIG11c3QgcmVtb3ZlIHRoZW0gKHdlIGRvIG5vdCB3YW50IHRoZSBsaW5lIHRvbyBsb25nKSAqL1xuICAgICAgICAgICAgbGV0IGFyciA9IHRva2VuLnZhbHVlLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgd2hpbGUgKGFyci5sZW5ndGggJiYgYXJyW2Fyci5sZW5ndGggLSAxXSA9PSBcIiBcIikge1xuICAgICAgICAgICAgICAgIGFyci5wb3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2VuLnZhbHVlID0gYXJyLmpvaW4oXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgLyogdG9rZW4gZGVnZW5lcmF0ZWQ/ICovXG4gICAgICAgIGlmICghdG9rZW4udmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICB0b2tlbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpbmVMZW5ndGggKyB0b2tlbi52YWx1ZS5sZW5ndGggPiBtYXhXaWR0aCkgeyAvKiBsaW5lIHRvbyBsb25nLCBmaW5kIGEgc3VpdGFibGUgYnJlYWtpbmcgc3BvdCAqL1xuICAgICAgICAgICAgLyogaXMgaXQgcG9zc2libGUgdG8gYnJlYWsgd2l0aGluIHRoaXMgdG9rZW4/ICovXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRJbmRleCA9IHRva2VuLnZhbHVlLmluZGV4T2YoXCIgXCIsIGluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRJbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxpbmVMZW5ndGggKyBuZXh0SW5kZXggPiBtYXhXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5kZXggPSBuZXh0SW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHsgLyogYnJlYWsgYXQgc3BhY2Ugd2l0aGluIHRoaXMgb25lICovXG4gICAgICAgICAgICAgICAgdG9rZW4udmFsdWUgPSBicmVha0luc2lkZVRva2VuKHRva2VucywgaSwgaW5kZXgsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobGFzdFRva2VuV2l0aFNwYWNlICE9IC0xKSB7IC8qIGlzIHRoZXJlIGEgcHJldmlvdXMgdG9rZW4gd2hlcmUgYSBicmVhayBjYW4gb2NjdXI/ICovXG4gICAgICAgICAgICAgICAgbGV0IHRva2VuID0gdG9rZW5zW2xhc3RUb2tlbldpdGhTcGFjZV07XG4gICAgICAgICAgICAgICAgbGV0IGJyZWFrSW5kZXggPSB0b2tlbi52YWx1ZS5sYXN0SW5kZXhPZihcIiBcIik7XG4gICAgICAgICAgICAgICAgdG9rZW4udmFsdWUgPSBicmVha0luc2lkZVRva2VuKHRva2VucywgbGFzdFRva2VuV2l0aFNwYWNlLCBicmVha0luZGV4LCB0cnVlKTtcbiAgICAgICAgICAgICAgICBpID0gbGFzdFRva2VuV2l0aFNwYWNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8qIGZvcmNlIGJyZWFrIGluIHRoaXMgdG9rZW4gKi9cbiAgICAgICAgICAgICAgICB0b2tlbi52YWx1ZSA9IGJyZWFrSW5zaWRlVG9rZW4odG9rZW5zLCBpLCBtYXhXaWR0aCAtIGxpbmVMZW5ndGgsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLyogbGluZSBub3QgbG9uZywgY29udGludWUgKi9cbiAgICAgICAgICAgIGxpbmVMZW5ndGggKz0gdG9rZW4udmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlLmluZGV4T2YoXCIgXCIpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgbGFzdFRva2VuV2l0aFNwYWNlID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpKys7IC8qIGFkdmFuY2UgdG8gbmV4dCB0b2tlbiAqL1xuICAgIH1cbiAgICB0b2tlbnMucHVzaCh7IHR5cGU6IFRZUEVfTkVXTElORSB9KTsgLyogaW5zZXJ0IGZha2UgbmV3bGluZSB0byBmaXggdGhlIGxhc3QgdGV4dCBsaW5lICovXG4gICAgLyogcmVtb3ZlIHRyYWlsaW5nIHNwYWNlIGZyb20gdGV4dCB0b2tlbnMgYmVmb3JlIG5ld2xpbmVzICovXG4gICAgbGV0IGxhc3RUZXh0VG9rZW4gPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgc3dpdGNoICh0b2tlbi50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFRZUEVfVEVYVDpcbiAgICAgICAgICAgICAgICBsYXN0VGV4dFRva2VuID0gdG9rZW47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRZUEVfTkVXTElORTpcbiAgICAgICAgICAgICAgICBpZiAobGFzdFRleHRUb2tlbikgeyAvKiByZW1vdmUgdHJhaWxpbmcgc3BhY2UgKi9cbiAgICAgICAgICAgICAgICAgICAgbGV0IGFyciA9IGxhc3RUZXh0VG9rZW4udmFsdWUuc3BsaXQoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChhcnIubGVuZ3RoICYmIGFyclthcnIubGVuZ3RoIC0gMV0gPT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyci5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsYXN0VGV4dFRva2VuLnZhbHVlID0gYXJyLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxhc3RUZXh0VG9rZW4gPSBudWxsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRva2Vucy5wb3AoKTsgLyogcmVtb3ZlIGZha2UgdG9rZW4gKi9cbiAgICByZXR1cm4gdG9rZW5zO1xufVxuLyoqXG4gKiBDcmVhdGUgbmV3IHRva2VucyBhbmQgaW5zZXJ0IHRoZW0gaW50byB0aGUgc3RyZWFtXG4gKiBAcGFyYW0ge29iamVjdFtdfSB0b2tlbnNcbiAqIEBwYXJhbSB7aW50fSB0b2tlbkluZGV4IFRva2VuIGJlaW5nIHByb2Nlc3NlZFxuICogQHBhcmFtIHtpbnR9IGJyZWFrSW5kZXggSW5kZXggd2l0aGluIGN1cnJlbnQgdG9rZW4ncyB2YWx1ZVxuICogQHBhcmFtIHtib29sfSByZW1vdmVCcmVha0NoYXIgRG8gd2Ugd2FudCB0byByZW1vdmUgdGhlIGJyZWFraW5nIGNoYXJhY3Rlcj9cbiAqIEByZXR1cm5zIHtzdHJpbmd9IHJlbWFpbmluZyB1bmJyb2tlbiB0b2tlbiB2YWx1ZVxuICovXG5mdW5jdGlvbiBicmVha0luc2lkZVRva2VuKHRva2VucywgdG9rZW5JbmRleCwgYnJlYWtJbmRleCwgcmVtb3ZlQnJlYWtDaGFyKSB7XG4gICAgbGV0IG5ld0JyZWFrVG9rZW4gPSB7XG4gICAgICAgIHR5cGU6IFRZUEVfTkVXTElORVxuICAgIH07XG4gICAgbGV0IG5ld1RleHRUb2tlbiA9IHtcbiAgICAgICAgdHlwZTogVFlQRV9URVhULFxuICAgICAgICB2YWx1ZTogdG9rZW5zW3Rva2VuSW5kZXhdLnZhbHVlLnN1YnN0cmluZyhicmVha0luZGV4ICsgKHJlbW92ZUJyZWFrQ2hhciA/IDEgOiAwKSlcbiAgICB9O1xuICAgIHRva2Vucy5zcGxpY2UodG9rZW5JbmRleCArIDEsIDAsIG5ld0JyZWFrVG9rZW4sIG5ld1RleHRUb2tlbik7XG4gICAgcmV0dXJuIHRva2Vuc1t0b2tlbkluZGV4XS52YWx1ZS5zdWJzdHJpbmcoMCwgYnJlYWtJbmRleCk7XG59XG4iLCIvKipcbiAqIEFsd2F5cyBwb3NpdGl2ZSBtb2R1bHVzXG4gKiBAcGFyYW0geCBPcGVyYW5kXG4gKiBAcGFyYW0gbiBNb2R1bHVzXG4gKiBAcmV0dXJucyB4IG1vZHVsbyBuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtb2QoeCwgbikge1xuICAgIHJldHVybiAoeCAlIG4gKyBuKSAlIG47XG59XG5leHBvcnQgZnVuY3Rpb24gY2xhbXAodmFsLCBtaW4gPSAwLCBtYXggPSAxKSB7XG4gICAgaWYgKHZhbCA8IG1pbilcbiAgICAgICAgcmV0dXJuIG1pbjtcbiAgICBpZiAodmFsID4gbWF4KVxuICAgICAgICByZXR1cm4gbWF4O1xuICAgIHJldHVybiB2YWw7XG59XG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnN1YnN0cmluZygxKTtcbn1cbi8qKlxuICogRm9ybWF0IGEgc3RyaW5nIGluIGEgZmxleGlibGUgd2F5LiBTY2FucyBmb3IgJXMgc3RyaW5ncyBhbmQgcmVwbGFjZXMgdGhlbSB3aXRoIGFyZ3VtZW50cy4gTGlzdCBvZiBwYXR0ZXJucyBpcyBtb2RpZmlhYmxlIHZpYSBTdHJpbmcuZm9ybWF0Lm1hcC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZW1wbGF0ZVxuICogQHBhcmFtIHthbnl9IFthcmd2XVxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0KHRlbXBsYXRlLCAuLi5hcmdzKSB7XG4gICAgbGV0IG1hcCA9IGZvcm1hdC5tYXA7XG4gICAgbGV0IHJlcGxhY2VyID0gZnVuY3Rpb24gKG1hdGNoLCBncm91cDEsIGdyb3VwMiwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHRlbXBsYXRlLmNoYXJBdChpbmRleCAtIDEpID09IFwiJVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2guc3Vic3RyaW5nKDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb2JqID0gYXJnc1swXTtcbiAgICAgICAgbGV0IGdyb3VwID0gZ3JvdXAxIHx8IGdyb3VwMjtcbiAgICAgICAgbGV0IHBhcnRzID0gZ3JvdXAuc3BsaXQoXCIsXCIpO1xuICAgICAgICBsZXQgbmFtZSA9IHBhcnRzLnNoaWZ0KCkgfHwgXCJcIjtcbiAgICAgICAgbGV0IG1ldGhvZCA9IG1hcFtuYW1lLnRvTG93ZXJDYXNlKCldO1xuICAgICAgICBpZiAoIW1ldGhvZCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgICB9XG4gICAgICAgIG9iaiA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgbGV0IHJlcGxhY2VkID0gb2JqW21ldGhvZF0uYXBwbHkob2JqLCBwYXJ0cyk7XG4gICAgICAgIGxldCBmaXJzdCA9IG5hbWUuY2hhckF0KDApO1xuICAgICAgICBpZiAoZmlyc3QgIT0gZmlyc3QudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgcmVwbGFjZWQgPSBjYXBpdGFsaXplKHJlcGxhY2VkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVwbGFjZWQ7XG4gICAgfTtcbiAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgvJSg/OihbYS16XSspfCg/OnsoW159XSspfSkpL2dpLCByZXBsYWNlcik7XG59XG5mb3JtYXQubWFwID0ge1xuICAgIFwic1wiOiBcInRvU3RyaW5nXCJcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGlyZWN0aW9uQWN0aW9uID0gdm9pZCAwO1xuY2xhc3MgRGlyZWN0aW9uQWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihkeCwgZHkpIHtcbiAgICAgICAgdGhpcy5keCA9IGR4O1xuICAgICAgICB0aGlzLmR5ID0gZHk7XG4gICAgICAgIHRoaXMuY29zdCA9IDE7XG4gICAgfVxuICAgIGV4ZWN1dGUoYWN0b3IsIG1hcCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRGlyZWN0aW9uQWN0aW9uLmV4ZWN1dGUgc2hvdWxkIG5vdCBiZSBwb3NzaWJsZSFcIik7XG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICB9XG4gICAgZGVzdGluYXRpb24oYWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIFthY3Rvci54ICsgdGhpcy5keCwgYWN0b3IueSArIHRoaXMuZHldO1xuICAgIH1cbn1cbmV4cG9ydHMuRGlyZWN0aW9uQWN0aW9uID0gRGlyZWN0aW9uQWN0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1vdmVBY3Rpb24gPSB2b2lkIDA7XG5jb25zdCBtZXNzYWdlTG9nXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0eS9tZXNzYWdlTG9nXCIpO1xuY29uc3QgZGlyZWN0aW9uQWN0aW9uXzEgPSByZXF1aXJlKFwiLi9kaXJlY3Rpb25BY3Rpb25cIik7XG5jbGFzcyBNb3ZlQWN0aW9uIGV4dGVuZHMgZGlyZWN0aW9uQWN0aW9uXzEuRGlyZWN0aW9uQWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihkeCwgZHkpIHtcbiAgICAgICAgc3VwZXIoZHgsIGR5KTtcbiAgICB9XG4gICAgZXhlY3V0ZShhY3RvciwgbWFwKSB7XG4gICAgICAgIGxldCBbeCwgeV0gPSB0aGlzLmRlc3RpbmF0aW9uKGFjdG9yKTtcbiAgICAgICAgaWYgKCFtYXAuaXNXYWxrYWJsZSh4LCB5KSB8fCBtYXAuYWN0b3JBdExvY2F0aW9uKHgsIHkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICBtZXNzYWdlTG9nXzEuTWVzc2FnZUxvZy5hZGRFcnJvck1lc3NhZ2UoXCJUaGF0IHdheSBpcyBibG9ja2VkLlwiLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFjdG9yLm1vdmUodGhpcy5keCwgdGhpcy5keSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLk1vdmVBY3Rpb24gPSBNb3ZlQWN0aW9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkFJQmVoYXZpb3IgPSB2b2lkIDA7XG5jbGFzcyBBSUJlaGF2aW9yIHtcbiAgICBhY3QoYWN0b3IsIG1hcCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgICB9XG59XG5leHBvcnRzLkFJQmVoYXZpb3IgPSBBSUJlaGF2aW9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlBsYXllckJlaGF2aW9yID0gdm9pZCAwO1xuY29uc3QgbW92ZUFjdGlvbl8xID0gcmVxdWlyZShcIi4uL2FjdGlvbi9tb3ZlQWN0aW9uXCIpO1xuY29uc3QgaW5wdXRNYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi4vZ2FtZS9pbnB1dE1hbmFnZXJcIik7XG5jbGFzcyBQbGF5ZXJCZWhhdmlvciB7XG4gICAgYWN0KGFjdG9yLCBtYXApIHtcbiAgICAgICAgaWYgKGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LkRPV04pIHx8IGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LlMpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IG1vdmVBY3Rpb25fMS5Nb3ZlQWN0aW9uKDAsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5VUCkgfHwgaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmlzS2V5RG93bihpbnB1dE1hbmFnZXJfMS5LZXkuVykpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgbW92ZUFjdGlvbl8xLk1vdmVBY3Rpb24oMCwgLTEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5MRUZUKSB8fCBpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5BKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBtb3ZlQWN0aW9uXzEuTW92ZUFjdGlvbigtMSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LlJJR0hUKSB8fCBpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5EKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBtb3ZlQWN0aW9uXzEuTW92ZUFjdGlvbigxLCAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cbmV4cG9ydHMuUGxheWVyQmVoYXZpb3IgPSBQbGF5ZXJCZWhhdmlvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5BY3RvciA9IHZvaWQgMDtcbmNvbnN0IGVudGl0eV8xID0gcmVxdWlyZShcIi4vZW50aXR5XCIpO1xuY29uc3QgcmVuZGVyT3JkZXJfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXR5L3JlbmRlck9yZGVyXCIpO1xuY29uc3QgYWlCZWhhdmlvcl8xID0gcmVxdWlyZShcIi4uL2JlaGF2aW9yL2FpQmVoYXZpb3JcIik7XG5jbGFzcyBBY3RvciBleHRlbmRzIGVudGl0eV8xLkVudGl0eSB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwLCBibG9ja3NNb3ZlbWVudCA9IGZhbHNlLCBjaGFyID0gXCI/XCIsIGZnID0gWzI1NSwgMjU1LCAyNTVdLCBiZyA9IFswLCAwLCAwXSwgcmVuZGVyT3JkZXIgPSByZW5kZXJPcmRlcl8xLlJlbmRlck9yZGVyLkNvcnBzZSwgYmVoYXZpb3IgPSBuZXcgYWlCZWhhdmlvcl8xLkFJQmVoYXZpb3IoKSkge1xuICAgICAgICBzdXBlcih4LCB5LCBibG9ja3NNb3ZlbWVudCwgY2hhciwgZmcsIGJnLCByZW5kZXJPcmRlcik7XG4gICAgICAgIHRoaXMuYmVoYXZpb3IgPSBiZWhhdmlvcjtcbiAgICB9XG4gICAgYWN0KG1hcCkge1xuICAgICAgICBsZXQgYWN0aW9uID0gdGhpcy5iZWhhdmlvci5hY3QodGhpcywgbWFwKTtcbiAgICAgICAgaWYgKGFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhY3Rpb24uZXhlY3V0ZSh0aGlzLCBtYXApO1xuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbi5jb3N0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBzcGF3bih4LCB5LCBtYXApIHtcbiAgICAgICAgbGV0IGNsb25lID0gbmV3IEFjdG9yKHgsIHksIHRoaXMuYmxvY2tzTW92ZW1lbnQsIHRoaXMuY2hhciwgdW5kZWZpbmVkLCAvLyBmZyBzZXQgYWZ0ZXIgdGhlIGZhY3RcbiAgICAgICAgdW5kZWZpbmVkLCAvLyBiZyBzZXQgYWZ0ZXIgdGhlIGZhY3RcbiAgICAgICAgdGhpcy5yZW5kZXJPcmRlciwgdGhpcy5iZWhhdmlvcik7XG4gICAgICAgIGNsb25lLmZnID0gdGhpcy5mZztcbiAgICAgICAgY2xvbmUuYmcgPSB0aGlzLmJnO1xuICAgICAgICBtYXAuYWRkRW50aXR5KGNsb25lKTtcbiAgICAgICAgcmV0dXJuIGNsb25lO1xuICAgIH1cbn1cbmV4cG9ydHMuQWN0b3IgPSBBY3RvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcGxheWVyQmVoYXZpb3JfMSA9IHJlcXVpcmUoXCIuLi9iZWhhdmlvci9wbGF5ZXJCZWhhdmlvclwiKTtcbmNvbnN0IGFjdG9yXzEgPSByZXF1aXJlKFwiLi9hY3RvclwiKTtcbmxldCBhY3RvckZhY3RvcnkgPSB7fTtcbmFjdG9yRmFjdG9yeS5wbGF5ZXIgPSBuZXcgYWN0b3JfMS5BY3RvcigpO1xuYWN0b3JGYWN0b3J5LnBsYXllci5jaGFyID0gJ0AnO1xuYWN0b3JGYWN0b3J5LnBsYXllci5iZWhhdmlvciA9IG5ldyBwbGF5ZXJCZWhhdmlvcl8xLlBsYXllckJlaGF2aW9yKCk7XG5leHBvcnRzLmRlZmF1bHQgPSBhY3RvckZhY3Rvcnk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRW50aXR5ID0gdm9pZCAwO1xuY29uc3QgY29sb3JfMSA9IHJlcXVpcmUoXCJyb3QtanMvbGliL2NvbG9yXCIpO1xuY29uc3QgZXJyb3JfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXR5L2Vycm9yXCIpO1xuY29uc3QgcmVuZGVyT3JkZXJfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXR5L3JlbmRlck9yZGVyXCIpO1xuY2xhc3MgRW50aXR5IHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDAsIGJsb2Nrc01vdmVtZW50ID0gZmFsc2UsIGNoYXIgPSBcIj9cIiwgZmcgPSBbMjU1LCAyNTUsIDI1NV0sIGJnID0gWzAsIDAsIDBdLCByZW5kZXJPcmRlciA9IHJlbmRlck9yZGVyXzEuUmVuZGVyT3JkZXIuQ29ycHNlKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuYmxvY2tzTW92ZW1lbnQgPSBibG9ja3NNb3ZlbWVudDtcbiAgICAgICAgdGhpcy5jaGFyID0gY2hhcjtcbiAgICAgICAgdGhpcy5mZyA9ICgwLCBjb2xvcl8xLnRvUkdCKShmZyk7XG4gICAgICAgIHRoaXMuYmcgPSAoMCwgY29sb3JfMS50b1JHQikoYmcpO1xuICAgICAgICB0aGlzLnJlbmRlck9yZGVyID0gcmVuZGVyT3JkZXI7XG4gICAgICAgICgwLCBlcnJvcl8xLmFzc2VydCkodGhpcy5jaGFyLmxlbmd0aCA9PT0gMSk7XG4gICAgfVxuICAgIC8vID0+IEVudGl0eVxuICAgIHNwYXduKHgsIHksIG1hcCkge1xuICAgICAgICBsZXQgY2xvbmUgPSBuZXcgRW50aXR5KHgsIHksIHRoaXMuYmxvY2tzTW92ZW1lbnQsIHRoaXMuY2hhciwgdW5kZWZpbmVkLCAvLyBmZyBzZXQgYWZ0ZXIgdGhlIGZhY3RcbiAgICAgICAgdW5kZWZpbmVkLCAvLyBiZyBzZXQgYWZ0ZXIgdGhlIGZhY3RcbiAgICAgICAgdGhpcy5yZW5kZXJPcmRlcik7XG4gICAgICAgIGNsb25lLmZnID0gdGhpcy5mZztcbiAgICAgICAgY2xvbmUuYmcgPSB0aGlzLmJnO1xuICAgICAgICBtYXAuYWRkRW50aXR5KGNsb25lKTtcbiAgICAgICAgcmV0dXJuIGNsb25lO1xuICAgIH1cbiAgICBtb3ZlKGR4LCBkeSkge1xuICAgICAgICB0aGlzLnggKz0gZHg7XG4gICAgICAgIHRoaXMueSArPSBkeTtcbiAgICB9XG4gICAgcmVuZGVyKGRpc3BsYXkpIHtcbiAgICAgICAgZGlzcGxheS5kcmF3KHRoaXMueCwgdGhpcy55LCB0aGlzLmNoYXIsIHRoaXMuZmcsIHRoaXMuYmcpO1xuICAgIH1cbn1cbmV4cG9ydHMuRW50aXR5ID0gRW50aXR5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkdhbWUgPSB2b2lkIDA7XG5jb25zdCByb3RfanNfMSA9IHJlcXVpcmUoXCJyb3QtanNcIik7XG5jb25zdCBnYW1lTWFwXzEgPSByZXF1aXJlKFwiLi9nYW1lTWFwXCIpO1xuY29uc3QgdGlsZUZhY3RvcnlfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vdGlsZS90aWxlRmFjdG9yeVwiKSk7XG5jb25zdCBpbnB1dE1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuL2lucHV0TWFuYWdlclwiKTtcbmNvbnN0IGFjdG9yRmFjdG9yeV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9lbnRpdHkvYWN0b3JGYWN0b3J5XCIpKTtcbmNvbnN0IHVpRmFjdG9yeV8xID0gcmVxdWlyZShcIi4uL3VpL3VpRmFjdG9yeVwiKTtcbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHsgd2lkdGg6IDgwLCBoZWlnaHQ6IDQwIH07XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IG5ldyByb3RfanNfMS5EaXNwbGF5KHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmNvbmZpZy53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5jb25maWcuaGVpZ2h0LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgZ2FtZU1hcF8xLkdhbWVNYXAodGhpcy5jb25maWcud2lkdGgsIHRoaXMuY29uZmlnLmhlaWdodCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5kaXNwbGF5LmdldENvbnRhaW5lcigpKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBhY3RvckZhY3RvcnlfMS5kZWZhdWx0LnBsYXllci5zcGF3bigwLCAwLCB0aGlzLm1hcCk7XG4gICAgICAgIHRoaXMuZGVsdGEgPSAwO1xuICAgIH1cbiAgICBnZW5lcmF0ZU1hcCgpIHtcbiAgICAgICAgbGV0IGRpZ2dlciA9IG5ldyByb3RfanNfMS5NYXAuRGlnZ2VyKHRoaXMuY29uZmlnLndpZHRoLCB0aGlzLmNvbmZpZy5oZWlnaHQpO1xuICAgICAgICBsZXQgZnJlZUNlbGxzID0gbmV3IEFycmF5KCk7XG4gICAgICAgIGxldCBjYWxsYmFjayA9ICh4LCB5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlKVxuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gZG8gbm90IHN0b3JlIHdhbGxzXG4gICAgICAgICAgICBmcmVlQ2VsbHMucHVzaChbeCwgeV0pO1xuICAgICAgICAgICAgdGhpcy5tYXAuc2V0VGlsZSh4LCB5LCB0aWxlRmFjdG9yeV8xLmRlZmF1bHQuZmxvb3IpO1xuICAgICAgICB9O1xuICAgICAgICBkaWdnZXIuY3JlYXRlKGNhbGxiYWNrKTtcbiAgICAgICAgbGV0IFt4LCB5XSA9IGZyZWVDZWxsc1swXTtcbiAgICAgICAgdGhpcy5wbGF5ZXIueCA9IHg7XG4gICAgICAgIHRoaXMucGxheWVyLnkgPSB5O1xuICAgICAgICAvLyBjb25zb2xlLndhcm4oJ2JveGVzIG5vdCBwbGFjZWQgeWV0IScpO1xuICAgICAgICAvLyBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyArK2kpIHtcbiAgICAgICAgLy8gICBjb25zdCBpbmRleCA9IE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIGZyZWVDZWxscy5sZW5ndGgpO1xuICAgICAgICAvLyAgIGNvbnN0IGtleSA9IGZyZWVDZWxscy5zcGxpY2UoaW5kZXgsIDEpWzBdOyAvLyBnZXQga2V5IGFuZCByZW1vdmUgaXQgXG4gICAgICAgIC8vICAgdGhpcy5tYXBba2V5XSA9IFwiKlwiO1xuICAgICAgICAvLyB9XG4gICAgfVxuICAgIHNldFVJU2l6ZSgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBjYW52YXMgPSAoX2EgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldENvbnRleHQoJzJkJykuY2FudmFzO1xuICAgICAgICBjb25zdCBsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZXMnKTtcbiAgICAgICAgbG9nLnN0eWxlLmxlZnQgPSBgJHtjYW52YXMub2Zmc2V0TGVmdH1weGA7XG4gICAgICAgIGxvZy5zdHlsZS53aWR0aCA9IGAke2NhbnZhcy53aWR0aH1weGA7XG4gICAgfVxuICAgIHJlbmRlcihtZW51LCBjb21wdXRlRk9WKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheS5jbGVhcigpO1xuICAgICAgICBpZiAoY29tcHV0ZUZPVikge1xuICAgICAgICAgICAgdGhpcy5tYXAuY29tcHV0ZUZPVih0aGlzLnBsYXllci54LCB0aGlzLnBsYXllci55KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hcC5yZW5kZXIodGhpcy5kaXNwbGF5KTtcbiAgICAgICAgaWYgKG1lbnUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG1lbnUucmVuZGVyKHRoaXMuZGlzcGxheSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJykuYXBwZW5kQ2hpbGQodGhpcy5kaXNwbGF5LmdldENvbnRhaW5lcigpKTtcbiAgICAgICAgdGhpcy5zZXRVSVNpemUoKTtcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5zZXRVSVNpemUpO1xuICAgICAgICBpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaW5pdCgpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlTWFwKCk7XG4gICAgICAgIHRoaXMucmVuZGVyKG51bGwsIHRydWUpO1xuICAgICAgICBsZXQgb2xkVGltZVN0YW1wO1xuICAgICAgICBsZXQgZnBzO1xuICAgICAgICBsZXQgdHVybk51bWJlciA9IDE7XG4gICAgICAgIGxldCBtZW51ID0gbnVsbDtcbiAgICAgICAgY29uc3QgZ2FtZUxvb3AgPSAodGltZVN0YW1wKSA9PiB7XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIG51bWJlciBvZiBzZWNvbmRzIHBhc3NlZCBzaW5jZSB0aGUgbGFzdCBmcmFtZVxuICAgICAgICAgICAgdGhpcy5kZWx0YSA9ICh0aW1lU3RhbXAgLSBvbGRUaW1lU3RhbXApIC8gMTAwMDtcbiAgICAgICAgICAgIG9sZFRpbWVTdGFtcCA9IHRpbWVTdGFtcDtcbiAgICAgICAgICAgIGZwcyA9IE1hdGgucm91bmQoMSAvIHRoaXMuZGVsdGEpO1xuICAgICAgICAgICAgaWYgKG1lbnUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhIG1lbnUgdGhlbiBpdCBoYW5kbGVzIGlucHV0XG4gICAgICAgICAgICAgICAgbWVudS51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICBpZiAobWVudS5zaG91bGRFeGl0KSB7XG4gICAgICAgICAgICAgICAgICAgIG1lbnUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcihtZW51LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1lbnUuc2hvdWxkUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKG1lbnUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5IKSkge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgaGVscCBtZW51XG4gICAgICAgICAgICAgICAgbWVudSA9ICgwLCB1aUZhY3RvcnlfMS5oZWxwTWVudSkodGhpcy5jb25maWcud2lkdGgsIHRoaXMuY29uZmlnLmhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0dXJuTnVtYmVyICUgMyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQUkgdHVyblxuICAgICAgICAgICAgICAgIHR1cm5OdW1iZXIgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gcGxheWVyIHR1cm5cbiAgICAgICAgICAgICAgICBjb25zdCBjb3N0ID0gdGhpcy5wbGF5ZXIuYWN0KHRoaXMubWFwKTtcbiAgICAgICAgICAgICAgICBpZiAoY29zdCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKG1lbnUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuICAgICAgICB9O1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcbiAgICB9XG59XG5leHBvcnRzLkdhbWUgPSBHYW1lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkdhbWVNYXAgPSB2b2lkIDA7XG5jb25zdCB0aWxlRmFjdG9yeV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi90aWxlL3RpbGVGYWN0b3J5XCIpKTtcbmNvbnN0IGVycm9yXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0eS9lcnJvclwiKTtcbmNvbnN0IHByZWNpc2Vfc2hhZG93Y2FzdGluZ18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyb3QtanMvbGliL2Zvdi9wcmVjaXNlLXNoYWRvd2Nhc3RpbmdcIikpO1xuY2xhc3MgR2FtZU1hcCB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLnRpbGVzID0gQXJyYXkodGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0ICsgdGhpcy53aWR0aCkuZmlsbCh0aWxlRmFjdG9yeV8xLmRlZmF1bHQud2FsbCk7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IEFycmF5KHRoaXMud2lkdGggKiB0aGlzLmhlaWdodCArIHRoaXMud2lkdGgpLmZpbGwoZmFsc2UpOyAvLyBUT0RPOiBzZXQgdG8gZmFsc2VcbiAgICAgICAgdGhpcy5leHBsb3JlZCA9IEFycmF5KHRoaXMud2lkdGggKiB0aGlzLmhlaWdodCArIHRoaXMud2lkdGgpLmZpbGwoZmFsc2UpOyAvLyBUT0RPOiBzZXQgdG8gZmFsc2VcbiAgICAgICAgdGhpcy5lbnRpdGllcyA9IFtdO1xuICAgICAgICB0aGlzLmFjdG9ycyA9IFtdO1xuICAgIH1cbiAgICBpbmRleCh4LCB5KSB7XG4gICAgICAgIHJldHVybiB5ICogdGhpcy53aWR0aCArIHg7XG4gICAgfVxuICAgIGluQm91bmRzKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHkgKiB0aGlzLndpZHRoICsgeCA8IHRoaXMudGlsZXMubGVuZ3RoO1xuICAgIH1cbiAgICBpc1dhbGthYmxlKHgsIHkpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4KHgsIHkpO1xuICAgICAgICBpZiAoaW5kZXggPj0gdGhpcy50aWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50aWxlc1t5ICogdGhpcy53aWR0aCArIHhdLndhbGthYmxlO1xuICAgIH1cbiAgICBzZXRUaWxlKHgsIHksIHRpbGUpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4KHgsIHkpO1xuICAgICAgICAoMCwgZXJyb3JfMS5hc3NlcnQpKGluZGV4IDwgdGhpcy50aWxlcy5sZW5ndGgpO1xuICAgICAgICB0aGlzLnRpbGVzW2luZGV4XSA9IHRpbGU7XG4gICAgfVxuICAgIHJlbmRlcihkaXNwbGF5KSB7XG4gICAgICAgIGxldCB5O1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgLy8gcmVuZGVyIHRoZSBtYXBcbiAgICAgICAgZm9yICh5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyArK3kpIHtcbiAgICAgICAgICAgIGZvciAoeCA9IDA7IHggPCB0aGlzLndpZHRoOyArK3gpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aWxlID0gdGhpcy50aWxlc1tpbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZVtpbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheS5kcmF3KHgsIHksIHRpbGUuY2hhciwgdGlsZS5pblZpZXdGRywgdGlsZS5pblZpZXdCRyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZXhwbG9yZWRbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXkuZHJhdyh4LCB5LCB0aWxlLmNoYXIsIHRpbGUub3V0T2ZWaWV3RkcsIHRpbGUub3V0T2ZWaWV3QkcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBlbHNlIGRyYXcgbm90aGluZ1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVuZGVyIGVudGl0aWVzXG4gICAgICAgIHRoaXMuZW50aXRpZXMuc29ydCgoYSwgYikgPT4geyByZXR1cm4gYS5yZW5kZXJPcmRlci52YWx1ZU9mKCkgLSBiLnJlbmRlck9yZGVyLnZhbHVlT2YoKTsgfSk7XG4gICAgICAgIGZvciAobGV0IGUgb2YgdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgZS5yZW5kZXIoZGlzcGxheSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVuZGVyIGFjdG9yc1xuICAgICAgICB0aGlzLmVudGl0aWVzLnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGEucmVuZGVyT3JkZXIudmFsdWVPZigpIC0gYi5yZW5kZXJPcmRlci52YWx1ZU9mKCk7IH0pO1xuICAgICAgICBmb3IgKGxldCBhIG9mIHRoaXMuYWN0b3JzKSB7XG4gICAgICAgICAgICBhLnJlbmRlcihkaXNwbGF5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGRFbnRpdHkoZW50aXR5KSB7XG4gICAgICAgICgwLCBlcnJvcl8xLmFzc2VydCkodGhpcy5lbnRpdHlBdExvY2F0aW9uKGVudGl0eS54LCBlbnRpdHkueSkgPT0gbnVsbCk7XG4gICAgICAgICgwLCBlcnJvcl8xLmFzc2VydCkodGhpcy5hY3RvckF0TG9jYXRpb24oZW50aXR5LngsIGVudGl0eS55KSA9PSBudWxsKTtcbiAgICAgICAgdGhpcy5lbnRpdGllcy5wdXNoKGVudGl0eSk7XG4gICAgfVxuICAgIGVudGl0eUF0TG9jYXRpb24oeCwgeSkge1xuICAgICAgICBmb3IgKHZhciBlbnRpdHkgb2YgdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgaWYgKGVudGl0eS54ID09IHggJiYgZW50aXR5LnkgPT0geSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGFkZEFjdG9yKGFjdG9yKSB7XG4gICAgICAgICgwLCBlcnJvcl8xLmFzc2VydCkodGhpcy5lbnRpdHlBdExvY2F0aW9uKGFjdG9yLngsIGFjdG9yLnkpID09IG51bGwpO1xuICAgICAgICAoMCwgZXJyb3JfMS5hc3NlcnQpKHRoaXMuYWN0b3JBdExvY2F0aW9uKGFjdG9yLngsIGFjdG9yLnkpID09IG51bGwpO1xuICAgICAgICB0aGlzLmFjdG9ycy5wdXNoKGFjdG9yKTtcbiAgICB9XG4gICAgYWN0b3JBdExvY2F0aW9uKHgsIHkpIHtcbiAgICAgICAgZm9yICh2YXIgYWN0b3Igb2YgdGhpcy5hY3RvcnMpIHtcbiAgICAgICAgICAgIGlmIChhY3Rvci54ID09IHggJiYgYWN0b3IueSA9PSB5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBsb2NhdGlvbk9jY3VwaWVkKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50aXR5QXRMb2NhdGlvbih4LCB5KSAhPSBudWxsIHx8IHRoaXMuYWN0b3JBdExvY2F0aW9uKHgsIHkpICE9IG51bGw7XG4gICAgfVxuICAgIGNvbXB1dGVGT1YoeCwgeSkge1xuICAgICAgICBjb25zdCBmb3YgPSBuZXcgcHJlY2lzZV9zaGFkb3djYXN0aW5nXzEuZGVmYXVsdCgoeCwgeSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4KHgsIHkpO1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgdGhpcy50aWxlcy5sZW5ndGggJiYgaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRpbGVzW2luZGV4XS53YWxrYWJsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmlzaWJsZS5maWxsKGZhbHNlKTtcbiAgICAgICAgZm92LmNvbXB1dGUoeCwgeSwgMTAsICh4LCB5LCByLCB2aXNpYmlsaXR5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5kZXgoeCwgeSk7XG4gICAgICAgICAgICBpZiAodmlzaWJpbGl0eSA+IDAuMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwbG9yZWRbaW5kZXhdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2libGVbaW5kZXhdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZVtpbmRleF0gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5HYW1lTWFwID0gR2FtZU1hcDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5JbnB1dE1hbmFnZXIgPSBleHBvcnRzLktleSA9IHZvaWQgMDtcbnZhciBLZXk7XG4oZnVuY3Rpb24gKEtleSkge1xuICAgIEtleVtLZXlbXCJMRUZUXCJdID0gMF0gPSBcIkxFRlRcIjtcbiAgICBLZXlbS2V5W1wiUklHSFRcIl0gPSAxXSA9IFwiUklHSFRcIjtcbiAgICBLZXlbS2V5W1wiRE9XTlwiXSA9IDJdID0gXCJET1dOXCI7XG4gICAgS2V5W0tleVtcIlVQXCJdID0gM10gPSBcIlVQXCI7XG4gICAgS2V5W0tleVtcIldcIl0gPSA0XSA9IFwiV1wiO1xuICAgIEtleVtLZXlbXCJBXCJdID0gNV0gPSBcIkFcIjtcbiAgICBLZXlbS2V5W1wiU1wiXSA9IDZdID0gXCJTXCI7XG4gICAgS2V5W0tleVtcIkRcIl0gPSA3XSA9IFwiRFwiO1xuICAgIEtleVtLZXlbXCJRXCJdID0gOF0gPSBcIlFcIjtcbiAgICBLZXlbS2V5W1wiUlwiXSA9IDldID0gXCJSXCI7XG4gICAgS2V5W0tleVtcIkhcIl0gPSAxMF0gPSBcIkhcIjtcbiAgICBLZXlbS2V5W1wiU1BBQ0VcIl0gPSAxMV0gPSBcIlNQQUNFXCI7XG4gICAgS2V5W0tleVtcIkVTQ0FQRVwiXSA9IDEyXSA9IFwiRVNDQVBFXCI7XG4gICAgS2V5W0tleVtcIkVOVEVSXCJdID0gMTNdID0gXCJFTlRFUlwiO1xuICAgIEtleVtLZXlbXCJJTlZBTElEXCJdID0gMTRdID0gXCJJTlZBTElEXCI7XG59KShLZXkgPSBleHBvcnRzLktleSB8fCAoZXhwb3J0cy5LZXkgPSB7fSkpO1xuLy8gc3RhdGljIGNsYXNzIHRvIGhhbmRsZSBpbnB1dFxuY2xhc3MgSW5wdXRNYW5hZ2VyIHtcbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyhLZXkpLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBJbnB1dE1hbmFnZXIuX2tleXMucHVzaChmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIElucHV0TWFuYWdlci5vbktleURvd24pO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIElucHV0TWFuYWdlci5vbktleVVwKTtcbiAgICB9XG4gICAgc3RhdGljIGlzS2V5RG93bihrKSB7XG4gICAgICAgIHJldHVybiBJbnB1dE1hbmFnZXIuX2tleXNba107XG4gICAgfVxuICAgIHN0YXRpYyBrZXlTdHJUb0tleShrZXkpIHtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Rvd24nOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LkRPV047XG4gICAgICAgICAgICBjYXNlICdVcCc6XG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LlVQO1xuICAgICAgICAgICAgY2FzZSAnUmlnaHQnOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5SSUdIVDtcbiAgICAgICAgICAgIGNhc2UgJ0xlZnQnOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LkxFRlQ7XG4gICAgICAgICAgICBjYXNlICcgJzpcbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LlNQQUNFO1xuICAgICAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LkVTQ0FQRTtcbiAgICAgICAgICAgIGNhc2UgJ2EnOlxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuQTtcbiAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuUztcbiAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuRDtcbiAgICAgICAgICAgIGNhc2UgJ3cnOlxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuVztcbiAgICAgICAgICAgIGNhc2UgJ3InOlxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuUjtcbiAgICAgICAgICAgIGNhc2UgJ3EnOlxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuUTtcbiAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuSDtcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LkVOVEVSO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFVuaGFuZGxlZCBrZXk6ICR7a2V5fS5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5LklOVkFMSUQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICBjb25zdCBrID0gSW5wdXRNYW5hZ2VyLmtleVN0clRvS2V5KGV2ZW50LmtleSk7XG4gICAgICAgIElucHV0TWFuYWdlci5fa2V5c1trXSA9IHRydWU7XG4gICAgICAgIGlmIChrID09IEtleS5ET1dOIHx8IGsgPT0gS2V5LlVQIHx8IGsgPT0gS2V5LkxFRlQgfHwgayA9PSBLZXkuUklHSFQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzdGF0aWMgb25LZXlVcChldmVudCkge1xuICAgICAgICBJbnB1dE1hbmFnZXIuX2tleXNbSW5wdXRNYW5hZ2VyLmtleVN0clRvS2V5KGV2ZW50LmtleSldID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc3RhdGljIGNsZWFyKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IElucHV0TWFuYWdlci5fa2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgSW5wdXRNYW5hZ2VyLl9rZXlzW2ldID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLklucHV0TWFuYWdlciA9IElucHV0TWFuYWdlcjtcbklucHV0TWFuYWdlci5fa2V5cyA9IFtdO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlRpbGUgPSB2b2lkIDA7XG5jbGFzcyBUaWxlIHtcbiAgICBjb25zdHJ1Y3RvcihjaGFyLCB3YWxrYWJsZSwgaW5WaWV3RkcsIGluVmlld0JHLCBvdXRPZlZpZXdGRywgb3V0T2ZWaWV3QkcpIHtcbiAgICAgICAgdGhpcy5jaGFyID0gY2hhcjtcbiAgICAgICAgdGhpcy53YWxrYWJsZSA9IHdhbGthYmxlO1xuICAgICAgICB0aGlzLmluVmlld0ZHID0gaW5WaWV3Rkc7XG4gICAgICAgIHRoaXMuaW5WaWV3QkcgPSBpblZpZXdCRztcbiAgICAgICAgdGhpcy5vdXRPZlZpZXdGRyA9IG91dE9mVmlld0ZHO1xuICAgICAgICB0aGlzLm91dE9mVmlld0JHID0gb3V0T2ZWaWV3Qkc7XG4gICAgfVxufVxuZXhwb3J0cy5UaWxlID0gVGlsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29sb3JzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL3V0aWxpdHkvY29sb3JzXCIpKTtcbmNvbnN0IHRpbGVfMSA9IHJlcXVpcmUoXCIuL3RpbGVcIik7XG5sZXQgdGlsZUZhY3RvcnkgPSB7fTtcbnRpbGVGYWN0b3J5LmZsb29yID0gbmV3IHRpbGVfMS5UaWxlKCcuJywgdHJ1ZSwgY29sb3JzXzEuZGVmYXVsdC52aXNpYmxlLCBjb2xvcnNfMS5kZWZhdWx0LmJsYWNrLCBjb2xvcnNfMS5kZWZhdWx0LmRhcmtHcmF5LCBjb2xvcnNfMS5kZWZhdWx0LmJsYWNrKTtcbnRpbGVGYWN0b3J5LndhbGwgPSBuZXcgdGlsZV8xLlRpbGUoJyMnLCBmYWxzZSwgY29sb3JzXzEuZGVmYXVsdC52aXNpYmxlLCBjb2xvcnNfMS5kZWZhdWx0LmJsYWNrLCBjb2xvcnNfMS5kZWZhdWx0LmRhcmtHcmF5LCBjb2xvcnNfMS5kZWZhdWx0LmJsYWNrKTtcbnRpbGVGYWN0b3J5LmRvd25TdGFpcnMgPSBuZXcgdGlsZV8xLlRpbGUoJz4nLCBmYWxzZSwgY29sb3JzXzEuZGVmYXVsdC5saWdodEdyYXksIGNvbG9yc18xLmRlZmF1bHQuYmxhY2ssIGNvbG9yc18xLmRlZmF1bHQuZGFya0dyYXksIGNvbG9yc18xLmRlZmF1bHQuYmxhY2spO1xuZXhwb3J0cy5kZWZhdWx0ID0gdGlsZUZhY3Rvcnk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQnV0dG9uID0gdm9pZCAwO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IGlucHV0TWFuYWdlcl8xID0gcmVxdWlyZShcIi4uL2dhbWUvaW5wdXRNYW5hZ2VyXCIpO1xuY2xhc3MgQnV0dG9uIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3aWR0aCwgaGVpZ2h0LCB0ZXh0LCB0ZXh0Q29sb3IsIHRleHRIaWdobGlnaHRlZENvbG9yLCBmcmFtZUNvbG9yLCBmcmFtZUhpZ2hsaWdodGVkQ29sb3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgICAgIHRoaXMudGV4dENvbG9yID0gdGV4dENvbG9yO1xuICAgICAgICB0aGlzLnRleHRIaWdobGlnaHRlZENvbG9yID0gdGV4dEhpZ2hsaWdodGVkQ29sb3I7XG4gICAgICAgIHRoaXMuZnJhbWVDb2xvciA9IGZyYW1lQ29sb3I7XG4gICAgICAgIHRoaXMuZnJhbWVIaWdobGlnaHRlZENvbG9yID0gZnJhbWVIaWdobGlnaHRlZENvbG9yO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG4gICAgcmVuZGVyKGRpc3BsYXkpIHtcbiAgICAgICAgLy8gY2hvb3NlIGNvbG9ycyBiYXNlZCBvbiB3aGV0aGVyIG9yIG5vdCB0aGUgYnV0dG9uIGlzIGhpZ2hsaWdodGVkXG4gICAgICAgIGNvbnN0IGZyYW1lQ29sb3IgPSB0aGlzLmhpZ2hsaWdodGVkID8gdGhpcy5mcmFtZUhpZ2hsaWdodGVkQ29sb3IgOiB0aGlzLmZyYW1lQ29sb3I7XG4gICAgICAgIGNvbnN0IHRleHRDb2xvciA9IHRoaXMuaGlnaGxpZ2h0ZWQgPyB0aGlzLnRleHRIaWdobGlnaHRlZENvbG9yIDogdGhpcy50ZXh0Q29sb3I7XG4gICAgICAgIC8vIGRyYXcgZnJhbWVcbiAgICAgICAgKDAsIHV0aWxfMS5kcmF3RnJhbWUpKGRpc3BsYXksIHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgZnJhbWVDb2xvcik7XG4gICAgICAgIC8vIGRyYXdGcmFtZShkaXNwbGF5LCB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICAvLyBkcmF3IHRleHQgaW4gdGhlIGNlbnRlciBvZiB0aGUgYnV0dG9uXG4gICAgICAgIGxldCBjZW50ZXIgPSB0aGlzLndpZHRoIC8gMjtcbiAgICAgICAgZGlzcGxheS5kcmF3VGV4dCh0aGlzLnggKyBjZW50ZXIgLSB0aGlzLnRleHQubGVuZ3RoIC8gMiwgdGhpcy55ICsgMSwgYCVjeyR7dGV4dENvbG9yfX0ke3RoaXMudGV4dH1gKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5oaWdobGlnaHRlZCAmJiBpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5FTlRFUikpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1lbnUgPSB2b2lkIDA7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuY29uc3QgaW5wdXRNYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi4vZ2FtZS9pbnB1dE1hbmFnZXJcIik7XG5jbGFzcyBNZW51IHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCB3aWR0aCwgaGVpZ2h0LCB0aXRsZSwgZHJhd091dGxpbmUsIGJhY2tncm91bmRDb2xvciwgZXhpdE9uRXNjYXBlKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5kcmF3T3V0bGluZSA9IGRyYXdPdXRsaW5lO1xuICAgICAgICB0aGlzLmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgdGhpcy5leGl0T25Fc2NhcGUgPSBleGl0T25Fc2NhcGU7XG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IFtdO1xuICAgICAgICB0aGlzLmJ1dHRvbkluZGV4ID0gMDtcbiAgICAgICAgdGhpcy50ZXh0ID0gW107XG4gICAgICAgIHRoaXMuc2hvdWxkUmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG91bGRFeGl0ID0gZmFsc2U7XG4gICAgfVxuICAgIGFkZEJ1dHRvbihidXR0b24pIHtcbiAgICAgICAgdGhpcy5idXR0b25zLnB1c2goYnV0dG9uKTtcbiAgICAgICAgaWYgKHRoaXMuYnV0dG9ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uc1swXS5oaWdobGlnaHRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYWRkVGV4dCh0ZXh0KSB7XG4gICAgICAgIHRoaXMudGV4dC5wdXNoKHRleHQpO1xuICAgIH1cbiAgICByZW5kZXIoZGlzcGxheSkge1xuICAgICAgICAoMCwgdXRpbF8xLmRyYXdGcmFtZVdpdGhUaXRsZSkoZGlzcGxheSwgdGhpcy50aXRsZSwgdGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgLy8gbm93IHdlIGNhbiBkcmF3IHRoZSBidXR0b25zIGFuZCB0ZXh0XG4gICAgICAgIGZvciAobGV0IGIgb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICAgICAgICBiLnJlbmRlcihkaXNwbGF5KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCB0IG9mIHRoaXMudGV4dCkge1xuICAgICAgICAgICAgdC5yZW5kZXIoZGlzcGxheSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaG91bGRSZW5kZXIgPSBmYWxzZTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5idXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChpbnB1dE1hbmFnZXJfMS5JbnB1dE1hbmFnZXIuaXNLZXlEb3duKGlucHV0TWFuYWdlcl8xLktleS5SSUdIVCkgfHwgaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmlzS2V5RG93bihpbnB1dE1hbmFnZXJfMS5LZXkuRCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnNbdGhpcy5idXR0b25JbmRleF0uaGlnaGxpZ2h0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbkluZGV4ID0gTWF0aC5taW4odGhpcy5idXR0b25zLmxlbmd0aCAtIDEsIHRoaXMuYnV0dG9uSW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnNbdGhpcy5idXR0b25JbmRleF0uaGlnaGxpZ2h0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdWxkUmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LkxFRlQpIHx8IGlucHV0TWFuYWdlcl8xLklucHV0TWFuYWdlci5pc0tleURvd24oaW5wdXRNYW5hZ2VyXzEuS2V5LkEpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25zW3RoaXMuYnV0dG9uSW5kZXhdLmhpZ2hsaWdodGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25JbmRleCA9IE1hdGgubWF4KDAsIHRoaXMuYnV0dG9uSW5kZXggLSAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbnNbdGhpcy5idXR0b25JbmRleF0uaGlnaGxpZ2h0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdWxkUmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYnV0dG9uc1t0aGlzLmJ1dHRvbkluZGV4XS51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5leGl0T25Fc2NhcGUgJiYgaW5wdXRNYW5hZ2VyXzEuSW5wdXRNYW5hZ2VyLmlzS2V5RG93bihpbnB1dE1hbmFnZXJfMS5LZXkuRVNDQVBFKSkge1xuICAgICAgICAgICAgdGhpcy5zaG91bGRFeGl0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuTWVudSA9IE1lbnU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVGV4dCA9IHZvaWQgMDtcbmNsYXNzIFRleHQge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIHRleHQsIGZnLCBiZykge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICB0aGlzLmZnID0gZmc7XG4gICAgICAgIHRoaXMuYmcgPSBiZztcbiAgICB9XG4gICAgcmVuZGVyKGRpc3BsYVkpIHtcbiAgICAgICAgZGlzcGxhWS5kcmF3VGV4dCh0aGlzLngsIHRoaXMueSwgYCVjeyR7dGhpcy5mZ319JWJ7JHt0aGlzLmJnfX0ke3RoaXMudGV4dH1gKTtcbiAgICB9XG59XG5leHBvcnRzLlRleHQgPSBUZXh0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmhlbHBNZW51ID0gdm9pZCAwO1xuY29uc3QgY29sb3JzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL3V0aWxpdHkvY29sb3JzXCIpKTtcbmNvbnN0IGJ1dHRvbl8xID0gcmVxdWlyZShcIi4vYnV0dG9uXCIpO1xuY29uc3QgbWVudV8xID0gcmVxdWlyZShcIi4vbWVudVwiKTtcbmNvbnN0IHRleHRfMSA9IHJlcXVpcmUoXCIuL3RleHRcIik7XG5mdW5jdGlvbiBoZWxwTWVudSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgY29uc3QgeCA9IHdpZHRoIC8gNDtcbiAgICBjb25zdCB5ID0gaGVpZ2h0IC8gNDtcbiAgICBsZXQgbSA9IG5ldyBtZW51XzEuTWVudSh4LCB5LCB3aWR0aCAvIDIsIGhlaWdodCAvIDIsIFwiSGVscFwiLCB0cnVlLCBcIiNmZmZcIiwgdHJ1ZSk7XG4gICAgbS5hZGRCdXR0b24obmV3IGJ1dHRvbl8xLkJ1dHRvbih3aWR0aCAvIDIgLSA0LCBoZWlnaHQgLSBoZWlnaHQgLyA0IC0gNCwgOCwgMywgXCJPa1wiLCBjb2xvcnNfMS5kZWZhdWx0LmxpZ2h0R3JheSwgY29sb3JzXzEuZGVmYXVsdC53aGl0ZSwgY29sb3JzXzEuZGVmYXVsdC5saWdodEdyYXksIGNvbG9yc18xLmRlZmF1bHQud2hpdGUsICgpID0+IHtcbiAgICAgICAgbS5zaG91bGRFeGl0ID0gdHJ1ZTtcbiAgICB9KSk7XG4gICAgbS5hZGRUZXh0KG5ldyB0ZXh0XzEuVGV4dCh4ICsgMywgeSArIDMsIFwiV0FTRCBvciBhcnJvdyBrZXlzIHRvIG1vdmUuXCIsIGNvbG9yc18xLmRlZmF1bHQud2hpdGUsIGNvbG9yc18xLmRlZmF1bHQuYmxhY2spKTtcbiAgICBtLmFkZFRleHQobmV3IHRleHRfMS5UZXh0KHggKyAzLCB5ICsgNCwgXCJJIHRvIGluc3BlY3QuXCIsIGNvbG9yc18xLmRlZmF1bHQud2hpdGUsIGNvbG9yc18xLmRlZmF1bHQuYmxhY2spKTtcbiAgICByZXR1cm4gbTtcbn1cbmV4cG9ydHMuaGVscE1lbnUgPSBoZWxwTWVudTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kcmF3RnJhbWUgPSBleHBvcnRzLmRyYXdGcmFtZVdpdGhUaXRsZSA9IHZvaWQgMDtcbmNvbnN0IHRvcExlZnQgPSAn4pSMJztcbmNvbnN0IHRvcFJpZ2h0ID0gJ+KUkCc7XG5jb25zdCBib3R0b21MZWZ0ID0gJ+KUlCc7XG5jb25zdCBib3R0b21SaWdodCA9ICfilJgnO1xuY29uc3QgdmVydGljYWwgPSAn4pSCJztcbmNvbnN0IGhvcml6b250YWwgPSAn4pSAJztcbmNvbnN0IGxlZnRUaXRsZSA9ICfilKQnO1xuY29uc3QgcmlnaHRUaXRsZSA9ICfilJwnO1xuY29uc3QgZW1wdHkgPSAnICc7XG5mdW5jdGlvbiBkcmF3RnJhbWVXaXRoVGl0bGUoZGlzcGxheSwgdGl0bGUsIHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYm9kaWRkbGllL2pzLXJvZ3VlLXR1dG9yaWFsL2Jsb2IvbWFpbi9zcmMvcmVuZGVyLWZ1bmN0aW9ucy50cyNMNTZcbiAgICBjb25zdCBpbm5lcldpZHRoID0gd2lkdGggLSAyO1xuICAgIGNvbnN0IGlubmVySGVpZ2h0ID0gaGVpZ2h0IC0gMjtcbiAgICBjb25zdCByZW1haW5pbmdBZnRlclRpdGxlID0gaW5uZXJXaWR0aCAtICh0aXRsZS5sZW5ndGggKyAyKTsgLy8gYWRkaW5nIHR3byBiZWNhdXNlIG9mIHRoZSBib3JkZXJzIG9uIGxlZnQgYW5kIHJpZ2h0XG4gICAgY29uc3QgbGVmdCA9IE1hdGguZmxvb3IocmVtYWluaW5nQWZ0ZXJUaXRsZSAvIDIpO1xuICAgIGNvbnN0IHRvcFJvdyA9IHRvcExlZnQgK1xuICAgICAgICBob3Jpem9udGFsLnJlcGVhdChsZWZ0KSArXG4gICAgICAgIGxlZnRUaXRsZSArXG4gICAgICAgIHRpdGxlICtcbiAgICAgICAgcmlnaHRUaXRsZSArXG4gICAgICAgIGhvcml6b250YWwucmVwZWF0KHJlbWFpbmluZ0FmdGVyVGl0bGUgLSBsZWZ0KSArXG4gICAgICAgIHRvcFJpZ2h0O1xuICAgIGNvbnN0IG1pZGRsZVJvdyA9IHZlcnRpY2FsICsgZW1wdHkucmVwZWF0KGlubmVyV2lkdGgpICsgdmVydGljYWw7XG4gICAgY29uc3QgYm90dG9tUm93ID0gYm90dG9tTGVmdCArIGhvcml6b250YWwucmVwZWF0KGlubmVyV2lkdGgpICsgYm90dG9tUmlnaHQ7XG4gICAgZGlzcGxheS5kcmF3VGV4dCh4LCB5LCB0b3BSb3cpO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGlubmVySGVpZ2h0OyBpKyspIHtcbiAgICAgICAgZGlzcGxheS5kcmF3VGV4dCh4LCB5ICsgaSwgbWlkZGxlUm93KTtcbiAgICB9XG4gICAgZGlzcGxheS5kcmF3VGV4dCh4LCB5ICsgaGVpZ2h0IC0gMSwgYm90dG9tUm93KTtcbn1cbmV4cG9ydHMuZHJhd0ZyYW1lV2l0aFRpdGxlID0gZHJhd0ZyYW1lV2l0aFRpdGxlO1xuZnVuY3Rpb24gZHJhd0ZyYW1lKGRpc3BsYXksIHgsIHksIHdpZHRoLCBoZWlnaHQsIGZyYW1lQ29sb3IpIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYm9kaWRkbGllL2pzLXJvZ3VlLXR1dG9yaWFsL2Jsb2IvbWFpbi9zcmMvcmVuZGVyLWZ1bmN0aW9ucy50cyNMNTZcbiAgICBjb25zdCBpbm5lcldpZHRoID0gd2lkdGggLSAyO1xuICAgIGNvbnN0IGlubmVySGVpZ2h0ID0gaGVpZ2h0IC0gMjtcbiAgICBjb25zdCB0b3BSb3cgPSB0b3BMZWZ0ICsgaG9yaXpvbnRhbC5yZXBlYXQoaW5uZXJXaWR0aCkgKyB0b3BSaWdodDtcbiAgICBjb25zdCBtaWRkbGVSb3cgPSB2ZXJ0aWNhbCArIGVtcHR5LnJlcGVhdChpbm5lcldpZHRoKSArIHZlcnRpY2FsO1xuICAgIGNvbnN0IGJvdHRvbVJvdyA9IGJvdHRvbUxlZnQgKyBob3Jpem9udGFsLnJlcGVhdChpbm5lcldpZHRoKSArIGJvdHRvbVJpZ2h0O1xuICAgIGRpc3BsYXkuZHJhd1RleHQoeCwgeSwgYCVjeyR7ZnJhbWVDb2xvcn19JHt0b3BSb3d9YCk7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gaW5uZXJIZWlnaHQ7IGkrKykge1xuICAgICAgICBkaXNwbGF5LmRyYXdUZXh0KHgsIHkgKyBpLCBgJWN7JHtmcmFtZUNvbG9yfX0ke21pZGRsZVJvd31gKTtcbiAgICB9XG4gICAgZGlzcGxheS5kcmF3VGV4dCh4LCB5ICsgaGVpZ2h0IC0gMSwgYCVjeyR7ZnJhbWVDb2xvcn19JHtib3R0b21Sb3d9YCk7XG59XG5leHBvcnRzLmRyYXdGcmFtZSA9IGRyYXdGcmFtZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICAgIGVycm9yOiBcInJnYmEoMjU1LDQwLDQwLDEpXCIsXG4gICAgd2hpdGU6IFwicmdiYSgyNTUsMjU1LDI1NSwxKVwiLFxuICAgIGJsYWNrOiBcInJnYmEoMCwwLDAsMClcIixcbiAgICBkYXJrR3JheTogXCJyZ2JhKDUwLDUwLDUwLDEpXCIsXG4gICAgbGlnaHRHcmF5OiBcInJnYmEoMTY5LDE2OSwxNjksMSlcIixcbiAgICB5ZWxsb3c6IFwicmdiYSgyNTMsMTY0LDE1LDEpXCIsXG4gICAgdmlzaWJsZTogXCJyZ2JhKDI1MCwyNTAsMjUwLDEpXCIsXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmFzc2VydCA9IHZvaWQgMDtcbmZ1bmN0aW9uIGFzc2VydChjb25kaXRpb24pIHtcbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdBc3NlcnRpb24gZmFpbCEnKTtcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgIH1cbn1cbmV4cG9ydHMuYXNzZXJ0ID0gYXNzZXJ0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1lc3NhZ2VMb2cgPSB2b2lkIDA7XG5jb25zdCBjb2xvcnNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9jb2xvcnNcIikpO1xuY2xhc3MgTWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3IodGV4dCwgY29sb3IpIHtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLmNvdW50ID0gMTtcbiAgICB9XG4gICAgaW5jcmVtZW50Q291bnQoKSB7XG4gICAgICAgIHRoaXMuY291bnQgKz0gMTtcbiAgICB9XG4gICAgc2FtZVRleHQodGV4dCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0ID09PSB0ZXh0O1xuICAgIH1cbiAgICBnZXRUZXh0KCkge1xuICAgICAgICBsZXQgdCA9IHRoaXMuY291bnQgPiAxID8gYCR7dGhpcy50ZXh0fSB4KCR7dGhpcy5jb3VudH0pYCA6IHRoaXMudGV4dDtcbiAgICAgICAgcmV0dXJuIGA8dGFnIHN0eWxlPVwiY29sb3I6ICR7dGhpcy5jb2xvcn07XCI+JHt0fTwvdGFnPmA7XG4gICAgfVxufVxuY2xhc3MgTWVzc2FnZUxvZyB7XG4gICAgc3RhdGljIGFkZE1lc3NhZ2UodGV4dCwgY29sb3IsIHN0YWNrKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IE1lc3NhZ2VMb2cubWVzc2FnZXMubGVuZ3RoO1xuICAgICAgICBpZiAoc3RhY2sgJiYgbGVuID4gMCAmJiBNZXNzYWdlTG9nLm1lc3NhZ2VzW2xlbiAtIDFdLnNhbWVUZXh0KHRleHQpKSB7XG4gICAgICAgICAgICBNZXNzYWdlTG9nLm1lc3NhZ2VzW2xlbiAtIDFdLmluY3JlbWVudENvdW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBNZXNzYWdlTG9nLm1lc3NhZ2VzLnB1c2gobmV3IE1lc3NhZ2UodGV4dCwgY29sb3IpKTtcbiAgICAgICAgfVxuICAgICAgICBNZXNzYWdlTG9nLnByaW50KCk7XG4gICAgfVxuICAgIHN0YXRpYyBhZGRFcnJvck1lc3NhZ2UodGV4dCwgc3RhY2spIHtcbiAgICAgICAgTWVzc2FnZUxvZy5hZGRNZXNzYWdlKHRleHQsIGNvbG9yc18xLmRlZmF1bHQuZXJyb3IsIHN0YWNrKTtcbiAgICB9XG4gICAgc3RhdGljIHByaW50KCkge1xuICAgICAgICBjb25zdCBtYXhMaW5lcyA9IDU7XG4gICAgICAgIGNvbnN0IGxlbiA9IE1lc3NhZ2VMb2cubWVzc2FnZXMubGVuZ3RoO1xuICAgICAgICBsZXQgbWVzc2FnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lc3NhZ2VzXCIpO1xuICAgICAgICBsZXQgbGluZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IE1lc3NhZ2VMb2cubWVzc2FnZXNbbGVuIC0gMSAtIGldO1xuICAgICAgICAgICAgbGluZXMucHVzaChtZXNzYWdlLmdldFRleHQoKSk7XG4gICAgICAgICAgICBpZiAobGluZXMubGVuZ3RoID4gbWF4TGluZXMpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtZXNzYWdlcy5pbm5lckhUTUwgPSBsaW5lcy5qb2luKFwiXFxuXCIpO1xuICAgIH1cbn1cbmV4cG9ydHMuTWVzc2FnZUxvZyA9IE1lc3NhZ2VMb2c7XG5NZXNzYWdlTG9nLm1lc3NhZ2VzID0gW107XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUmVuZGVyT3JkZXIgPSB2b2lkIDA7XG52YXIgUmVuZGVyT3JkZXI7XG4oZnVuY3Rpb24gKFJlbmRlck9yZGVyKSB7XG4gICAgUmVuZGVyT3JkZXJbUmVuZGVyT3JkZXJbXCJDb3Jwc2VcIl0gPSAwXSA9IFwiQ29ycHNlXCI7XG4gICAgUmVuZGVyT3JkZXJbUmVuZGVyT3JkZXJbXCJJdGVtXCJdID0gMV0gPSBcIkl0ZW1cIjtcbiAgICBSZW5kZXJPcmRlcltSZW5kZXJPcmRlcltcIkFjdG9yXCJdID0gMl0gPSBcIkFjdG9yXCI7XG59KShSZW5kZXJPcmRlciA9IGV4cG9ydHMuUmVuZGVyT3JkZXIgfHwgKGV4cG9ydHMuUmVuZGVyT3JkZXIgPSB7fSkpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGdhbWVfMSA9IHJlcXVpcmUoXCIuL2dhbWUvZ2FtZVwiKTtcbmRvY3VtZW50LmJvZHkub25sb2FkID0gKCkgPT4ge1xuICAgIGxldCBnYW1lID0gbmV3IGdhbWVfMS5HYW1lKCk7XG4gICAgZ2FtZS5zdGFydCgpO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==