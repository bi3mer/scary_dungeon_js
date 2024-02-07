var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/clingo-wasm/dist/clingo.web.js
var require_clingo_web = __commonJS((exports, module) => {
  (function(e, r) {
    typeof exports == "object" && typeof module == "object" ? module.exports = r() : typeof define == "function" && define.amd ? define([], r) : typeof exports == "object" ? exports.clingo = r() : e.clingo = r();
  })(self, () => (() => {
    var e = { 147: function(e2, r2, t2) {
      var n = this && this.__awaiter || function(e3, r3, t3, n2) {
        return new (t3 || (t3 = Promise))(function(o2, i2) {
          function a2(e4) {
            try {
              u(n2.next(e4));
            } catch (e5) {
              i2(e5);
            }
          }
          function s(e4) {
            try {
              u(n2.throw(e4));
            } catch (e5) {
              i2(e5);
            }
          }
          function u(e4) {
            var r4;
            e4.done ? o2(e4.value) : (r4 = e4.value, r4 instanceof t3 ? r4 : new t3(function(e5) {
              e5(r4);
            })).then(a2, s);
          }
          u((n2 = n2.apply(e3, r3 || [])).next());
        });
      }, o = this && this.__importDefault || function(e3) {
        return e3 && e3.__esModule ? e3 : { default: e3 };
      };
      Object.defineProperty(r2, "__esModule", { value: true }), r2.init = r2.run = undefined;
      const i = new (o(t2(791))).default;
      function a(...e3) {
        return n(this, undefined, undefined, function* () {
          return new Promise((r3, t3) => {
            i.onmessage = (e4) => {
              const { data: t4 } = e4;
              r3(t4);
            };
            const n2 = { type: "run", args: e3 };
            i.postMessage(n2);
          });
        });
      }
      r2.run = a, r2.init = function(e3) {
        return n(this, undefined, undefined, function* () {
          return new Promise((r3, t3) => {
            i.onmessage = (e4) => {
              r3(e4.data);
            };
            const n2 = { type: "init", wasmUrl: e3 };
            i.postMessage(n2);
          });
        });
      }, r2.default = a;
    }, 791: (e2, r2, t2) => {
      t2.r(r2), t2.d(r2, { default: () => i });
      var n = t2(477), o = t2.n(n);
      function i() {
        return o()('(()=>{var e={758:(e,r,t)=>{"use strict";t.r(r),t.d(r,{Module:()=>o}),e=t.hmd(e);var n,o=(n=(n="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0)||"/index.js",function(e){var r,o;(e=void 0!==(e=e||{})?e:{}).ready=new Promise((function(e,t){r=e,o=t}));var i,a,s,u,c,l,f=Object.assign({},e),d=[],h="./this.program",m=(e,r)=>{throw r},p="object"==typeof window,w="function"==typeof importScripts,v="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,g="";v?(g=w?t(606).dirname(g)+"/":"//",l=()=>{c||(u=t(351),c=t(606))},i=function(e,r){return l(),e=c.normalize(e),u.readFileSync(e,r?void 0:"utf8")},s=e=>{var r=i(e,!0);return r.buffer||(r=new Uint8Array(r)),r},a=(e,r,t)=>{l(),e=c.normalize(e),u.readFile(e,(function(e,n){e?t(e):r(n.buffer)}))},process.argv.length>1&&(h=process.argv[1].replace(/\\\\/g,"/")),d=process.argv.slice(2),process.on("uncaughtException",(function(e){if(!(e instanceof ne))throw e})),process.on("unhandledRejection",(function(e){throw e})),m=(e,r)=>{if(Y())throw process.exitCode=e,r;var t;(t=r)instanceof ne||E("exiting due to exception: "+t),process.exit(e)},e.inspect=function(){return"[Emscripten Module object]"}):(p||w)&&(w?g=self.location.href:"undefined"!=typeof document&&document.currentScript&&(g=document.currentScript.src),n&&(g=n),g=0!==g.indexOf("blob:")?g.substr(0,g.replace(/[?#].*/,"").lastIndexOf("/")+1):"",i=e=>{var r=new XMLHttpRequest;return r.open("GET",e,!1),r.send(null),r.responseText},w&&(s=e=>{var r=new XMLHttpRequest;return r.open("GET",e,!1),r.responseType="arraybuffer",r.send(null),new Uint8Array(r.response)}),a=(e,r,t)=>{var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer",n.onload=()=>{200==n.status||0==n.status&&n.response?r(n.response):t()},n.onerror=t,n.send(null)});var y=e.print||console.log.bind(console),E=e.printErr||console.warn.bind(console);Object.assign(e,f),f=null,e.arguments&&(d=e.arguments),e.thisProgram&&(h=e.thisProgram),e.quit&&(m=e.quit);var _,b=0;e.wasmBinary&&(_=e.wasmBinary);var k,S=e.noExitRuntime||!0;"object"!=typeof WebAssembly&&Q("no native wasm support detected");var D,M,F,A,P,x,T,R=!1,O="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function j(e,r,t){for(var n=r+t,o=r;e[o]&&!(o>=n);)++o;if(o-r>16&&e.buffer&&O)return O.decode(e.subarray(r,o));for(var i="";r<o;){var a=e[r++];if(128&a){var s=63&e[r++];if(192!=(224&a)){var u=63&e[r++];if((a=224==(240&a)?(15&a)<<12|s<<6|u:(7&a)<<18|s<<12|u<<6|63&e[r++])<65536)i+=String.fromCharCode(a);else{var c=a-65536;i+=String.fromCharCode(55296|c>>10,56320|1023&c)}}else i+=String.fromCharCode((31&a)<<6|s)}else i+=String.fromCharCode(a)}return i}function z(e,r){return e?j(A,e,r):""}function N(e,r,t,n){if(!(n>0))return 0;for(var o=t,i=t+n-1,a=0;a<e.length;++a){var s=e.charCodeAt(a);if(s>=55296&&s<=57343&&(s=65536+((1023&s)<<10)|1023&e.charCodeAt(++a)),s<=127){if(t>=i)break;r[t++]=s}else if(s<=2047){if(t+1>=i)break;r[t++]=192|s>>6,r[t++]=128|63&s}else if(s<=65535){if(t+2>=i)break;r[t++]=224|s>>12,r[t++]=128|s>>6&63,r[t++]=128|63&s}else{if(t+3>=i)break;r[t++]=240|s>>18,r[t++]=128|s>>12&63,r[t++]=128|s>>6&63,r[t++]=128|63&s}}return r[t]=0,t-o}function B(e){for(var r=0,t=0;t<e.length;++t){var n=e.charCodeAt(t);n<=127?r++:n<=2047?r+=2:n>=55296&&n<=57343?(r+=4,++t):r+=3}return r}function I(r){M=r,e.HEAP8=F=new Int8Array(r),e.HEAP16=P=new Int16Array(r),e.HEAP32=x=new Int32Array(r),e.HEAPU8=A=new Uint8Array(r),e.HEAPU16=new Uint16Array(r),e.HEAPU32=T=new Uint32Array(r),e.HEAPF32=new Float32Array(r),e.HEAPF64=new Float64Array(r)}e.INITIAL_MEMORY;var C,L=[],U=[],H=[];function Y(){return S}var W,q,G,X,V=0,K=null,$=null;function J(r){V++,e.monitorRunDependencies&&e.monitorRunDependencies(V)}function Z(r){if(V--,e.monitorRunDependencies&&e.monitorRunDependencies(V),0==V&&(null!==K&&(clearInterval(K),K=null),$)){var t=$;$=null,t()}}function Q(r){e.onAbort&&e.onAbort(r),E(r="Aborted("+r+")"),R=!0,D=1,r+=". Build with -sASSERTIONS for more info.";var t=new WebAssembly.RuntimeError(r);throw o(t),t}function ee(e){return e.startsWith("data:application/octet-stream;base64,")}function re(e){return e.startsWith("file://")}function te(e){try{if(e==W&&_)return new Uint8Array(_);if(s)return s(e);throw"both async and sync fetching of the wasm failed"}catch(e){Q(e)}}function ne(e){this.name="ExitStatus",this.message="Program terminated with exit("+e+")",this.status=e}function oe(r){for(;r.length>0;)r.shift()(e)}function ie(e,r){F.set(e,r)}ee(W="clingo.wasm")||(q=W,W=e.locateFile?e.locateFile(q,g):g+q);var ae=[];function se(e){var r=ae[e];return r||(e>=ae.length&&(ae.length=e+1),ae[e]=r=C.get(e)),r}var ue=[];function ce(e){this.excPtr=e,this.ptr=e-24,this.set_type=function(e){T[this.ptr+4>>2]=e},this.get_type=function(){return T[this.ptr+4>>2]},this.set_destructor=function(e){T[this.ptr+8>>2]=e},this.get_destructor=function(){return T[this.ptr+8>>2]},this.set_refcount=function(e){x[this.ptr>>2]=e},this.set_caught=function(e){e=e?1:0,F[this.ptr+12>>0]=e},this.get_caught=function(){return 0!=F[this.ptr+12>>0]},this.set_rethrown=function(e){e=e?1:0,F[this.ptr+13>>0]=e},this.get_rethrown=function(){return 0!=F[this.ptr+13>>0]},this.init=function(e,r){this.set_adjusted_ptr(0),this.set_type(e),this.set_destructor(r),this.set_refcount(0),this.set_caught(!1),this.set_rethrown(!1)},this.add_ref=function(){var e=x[this.ptr>>2];x[this.ptr>>2]=e+1},this.release_ref=function(){var e=x[this.ptr>>2];return x[this.ptr>>2]=e-1,1===e},this.set_adjusted_ptr=function(e){T[this.ptr+16>>2]=e},this.get_adjusted_ptr=function(){return T[this.ptr+16>>2]},this.get_exception_ptr=function(){if(Ce(this.get_type()))return T[this.excPtr>>2];var e=this.get_adjusted_ptr();return 0!==e?e:this.excPtr}}var le={isAbs:e=>"/"===e.charAt(0),splitPath:e=>/^(\\/?|)([\\s\\S]*?)((?:\\.{1,2}|[^\\/]+?|)(\\.[^.\\/]*|))(?:[\\/]*)$/.exec(e).slice(1),normalizeArray:(e,r)=>{for(var t=0,n=e.length-1;n>=0;n--){var o=e[n];"."===o?e.splice(n,1):".."===o?(e.splice(n,1),t++):t&&(e.splice(n,1),t--)}if(r)for(;t;t--)e.unshift("..");return e},normalize:e=>{var r=le.isAbs(e),t="/"===e.substr(-1);return(e=le.normalizeArray(e.split("/").filter((e=>!!e)),!r).join("/"))||r||(e="."),e&&t&&(e+="/"),(r?"/":"")+e},dirname:e=>{var r=le.splitPath(e),t=r[0],n=r[1];return t||n?(n&&(n=n.substr(0,n.length-1)),t+n):"."},basename:e=>{if("/"===e)return"/";var r=(e=(e=le.normalize(e)).replace(/\\/$/,"")).lastIndexOf("/");return-1===r?e:e.substr(r+1)},join:function(){var e=Array.prototype.slice.call(arguments,0);return le.normalize(e.join("/"))},join2:(e,r)=>le.normalize(e+"/"+r)},fe={resolve:function(){for(var e="",r=!1,t=arguments.length-1;t>=-1&&!r;t--){var n=t>=0?arguments[t]:we.cwd();if("string"!=typeof n)throw new TypeError("Arguments to path.resolve must be strings");if(!n)return"";e=n+"/"+e,r=le.isAbs(n)}return(r?"/":"")+(e=le.normalizeArray(e.split("/").filter((e=>!!e)),!r).join("/"))||"."},relative:(e,r)=>{function t(e){for(var r=0;r<e.length&&""===e[r];r++);for(var t=e.length-1;t>=0&&""===e[t];t--);return r>t?[]:e.slice(r,t-r+1)}e=fe.resolve(e).substr(1),r=fe.resolve(r).substr(1);for(var n=t(e.split("/")),o=t(r.split("/")),i=Math.min(n.length,o.length),a=i,s=0;s<i;s++)if(n[s]!==o[s]){a=s;break}var u=[];for(s=a;s<n.length;s++)u.push("..");return(u=u.concat(o.slice(a))).join("/")}};function de(e,r,t){var n=t>0?t:B(e)+1,o=new Array(n),i=N(e,o,0,o.length);return r&&(o.length=i),o}var he={ttys:[],init:function(){},shutdown:function(){},register:function(e,r){he.ttys[e]={input:[],output:[],ops:r},we.registerDevice(e,he.stream_ops)},stream_ops:{open:function(e){var r=he.ttys[e.node.rdev];if(!r)throw new we.ErrnoError(43);e.tty=r,e.seekable=!1},close:function(e){e.tty.ops.flush(e.tty)},flush:function(e){e.tty.ops.flush(e.tty)},read:function(e,r,t,n,o){if(!e.tty||!e.tty.ops.get_char)throw new we.ErrnoError(60);for(var i=0,a=0;a<n;a++){var s;try{s=e.tty.ops.get_char(e.tty)}catch(e){throw new we.ErrnoError(29)}if(void 0===s&&0===i)throw new we.ErrnoError(6);if(null==s)break;i++,r[t+a]=s}return i&&(e.node.timestamp=Date.now()),i},write:function(e,r,t,n,o){if(!e.tty||!e.tty.ops.put_char)throw new we.ErrnoError(60);try{for(var i=0;i<n;i++)e.tty.ops.put_char(e.tty,r[t+i])}catch(e){throw new we.ErrnoError(29)}return n&&(e.node.timestamp=Date.now()),i}},default_tty_ops:{get_char:function(e){if(!e.input.length){var r=null;if(v){var t=Buffer.alloc(256),n=0;try{n=u.readSync(process.stdin.fd,t,0,256,-1)}catch(e){if(!e.toString().includes("EOF"))throw e;n=0}r=n>0?t.slice(0,n).toString("utf-8"):null}else"undefined"!=typeof window&&"function"==typeof window.prompt?null!==(r=window.prompt("Input: "))&&(r+="\\n"):"function"==typeof readline&&null!==(r=readline())&&(r+="\\n");if(!r)return null;e.input=de(r,!0)}return e.input.shift()},put_char:function(e,r){null===r||10===r?(y(j(e.output,0)),e.output=[]):0!=r&&e.output.push(r)},flush:function(e){e.output&&e.output.length>0&&(y(j(e.output,0)),e.output=[])}},default_tty1_ops:{put_char:function(e,r){null===r||10===r?(E(j(e.output,0)),e.output=[]):0!=r&&e.output.push(r)},flush:function(e){e.output&&e.output.length>0&&(E(j(e.output,0)),e.output=[])}}};function me(e){Q()}var pe={ops_table:null,mount:function(e){return pe.createNode(null,"/",16895,0)},createNode:function(e,r,t,n){if(we.isBlkdev(t)||we.isFIFO(t))throw new we.ErrnoError(63);pe.ops_table||(pe.ops_table={dir:{node:{getattr:pe.node_ops.getattr,setattr:pe.node_ops.setattr,lookup:pe.node_ops.lookup,mknod:pe.node_ops.mknod,rename:pe.node_ops.rename,unlink:pe.node_ops.unlink,rmdir:pe.node_ops.rmdir,readdir:pe.node_ops.readdir,symlink:pe.node_ops.symlink},stream:{llseek:pe.stream_ops.llseek}},file:{node:{getattr:pe.node_ops.getattr,setattr:pe.node_ops.setattr},stream:{llseek:pe.stream_ops.llseek,read:pe.stream_ops.read,write:pe.stream_ops.write,allocate:pe.stream_ops.allocate,mmap:pe.stream_ops.mmap,msync:pe.stream_ops.msync}},link:{node:{getattr:pe.node_ops.getattr,setattr:pe.node_ops.setattr,readlink:pe.node_ops.readlink},stream:{}},chrdev:{node:{getattr:pe.node_ops.getattr,setattr:pe.node_ops.setattr},stream:we.chrdev_stream_ops}});var o=we.createNode(e,r,t,n);return we.isDir(o.mode)?(o.node_ops=pe.ops_table.dir.node,o.stream_ops=pe.ops_table.dir.stream,o.contents={}):we.isFile(o.mode)?(o.node_ops=pe.ops_table.file.node,o.stream_ops=pe.ops_table.file.stream,o.usedBytes=0,o.contents=null):we.isLink(o.mode)?(o.node_ops=pe.ops_table.link.node,o.stream_ops=pe.ops_table.link.stream):we.isChrdev(o.mode)&&(o.node_ops=pe.ops_table.chrdev.node,o.stream_ops=pe.ops_table.chrdev.stream),o.timestamp=Date.now(),e&&(e.contents[r]=o,e.timestamp=o.timestamp),o},getFileDataAsTypedArray:function(e){return e.contents?e.contents.subarray?e.contents.subarray(0,e.usedBytes):new Uint8Array(e.contents):new Uint8Array(0)},expandFileStorage:function(e,r){var t=e.contents?e.contents.length:0;if(!(t>=r)){r=Math.max(r,t*(t<1048576?2:1.125)>>>0),0!=t&&(r=Math.max(r,256));var n=e.contents;e.contents=new Uint8Array(r),e.usedBytes>0&&e.contents.set(n.subarray(0,e.usedBytes),0)}},resizeFileStorage:function(e,r){if(e.usedBytes!=r)if(0==r)e.contents=null,e.usedBytes=0;else{var t=e.contents;e.contents=new Uint8Array(r),t&&e.contents.set(t.subarray(0,Math.min(r,e.usedBytes))),e.usedBytes=r}},node_ops:{getattr:function(e){var r={};return r.dev=we.isChrdev(e.mode)?e.id:1,r.ino=e.id,r.mode=e.mode,r.nlink=1,r.uid=0,r.gid=0,r.rdev=e.rdev,we.isDir(e.mode)?r.size=4096:we.isFile(e.mode)?r.size=e.usedBytes:we.isLink(e.mode)?r.size=e.link.length:r.size=0,r.atime=new Date(e.timestamp),r.mtime=new Date(e.timestamp),r.ctime=new Date(e.timestamp),r.blksize=4096,r.blocks=Math.ceil(r.size/r.blksize),r},setattr:function(e,r){void 0!==r.mode&&(e.mode=r.mode),void 0!==r.timestamp&&(e.timestamp=r.timestamp),void 0!==r.size&&pe.resizeFileStorage(e,r.size)},lookup:function(e,r){throw we.genericErrors[44]},mknod:function(e,r,t,n){return pe.createNode(e,r,t,n)},rename:function(e,r,t){if(we.isDir(e.mode)){var n;try{n=we.lookupNode(r,t)}catch(e){}if(n)for(var o in n.contents)throw new we.ErrnoError(55)}delete e.parent.contents[e.name],e.parent.timestamp=Date.now(),e.name=t,r.contents[t]=e,r.timestamp=e.parent.timestamp,e.parent=r},unlink:function(e,r){delete e.contents[r],e.timestamp=Date.now()},rmdir:function(e,r){var t=we.lookupNode(e,r);for(var n in t.contents)throw new we.ErrnoError(55);delete e.contents[r],e.timestamp=Date.now()},readdir:function(e){var r=[".",".."];for(var t in e.contents)e.contents.hasOwnProperty(t)&&r.push(t);return r},symlink:function(e,r,t){var n=pe.createNode(e,r,41471,0);return n.link=t,n},readlink:function(e){if(!we.isLink(e.mode))throw new we.ErrnoError(28);return e.link}},stream_ops:{read:function(e,r,t,n,o){var i=e.node.contents;if(o>=e.node.usedBytes)return 0;var a=Math.min(e.node.usedBytes-o,n);if(a>8&&i.subarray)r.set(i.subarray(o,o+a),t);else for(var s=0;s<a;s++)r[t+s]=i[o+s];return a},write:function(e,r,t,n,o,i){if(r.buffer===F.buffer&&(i=!1),!n)return 0;var a=e.node;if(a.timestamp=Date.now(),r.subarray&&(!a.contents||a.contents.subarray)){if(i)return a.contents=r.subarray(t,t+n),a.usedBytes=n,n;if(0===a.usedBytes&&0===o)return a.contents=r.slice(t,t+n),a.usedBytes=n,n;if(o+n<=a.usedBytes)return a.contents.set(r.subarray(t,t+n),o),n}if(pe.expandFileStorage(a,o+n),a.contents.subarray&&r.subarray)a.contents.set(r.subarray(t,t+n),o);else for(var s=0;s<n;s++)a.contents[o+s]=r[t+s];return a.usedBytes=Math.max(a.usedBytes,o+n),n},llseek:function(e,r,t){var n=r;if(1===t?n+=e.position:2===t&&we.isFile(e.node.mode)&&(n+=e.node.usedBytes),n<0)throw new we.ErrnoError(28);return n},allocate:function(e,r,t){pe.expandFileStorage(e.node,r+t),e.node.usedBytes=Math.max(e.node.usedBytes,r+t)},mmap:function(e,r,t,n,o){if(!we.isFile(e.node.mode))throw new we.ErrnoError(43);var i,a,s=e.node.contents;if(2&o||s.buffer!==M){if((t>0||t+r<s.length)&&(s=s.subarray?s.subarray(t,t+r):Array.prototype.slice.call(s,t,t+r)),a=!0,!(i=me()))throw new we.ErrnoError(48);F.set(s,i)}else a=!1,i=s.byteOffset;return{ptr:i,allocated:a}},msync:function(e,r,t,n,o){if(!we.isFile(e.node.mode))throw new we.ErrnoError(43);return 2&o||pe.stream_ops.write(e,r,0,n,t,!1),0}}};var we={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:!1,ignorePermissions:!0,ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,lookupPath:(e,r={})=>{if(!(e=fe.resolve(we.cwd(),e)))return{path:"",node:null};if((r=Object.assign({follow_mount:!0,recurse_count:0},r)).recurse_count>8)throw new we.ErrnoError(32);for(var t=le.normalizeArray(e.split("/").filter((e=>!!e)),!1),n=we.root,o="/",i=0;i<t.length;i++){var a=i===t.length-1;if(a&&r.parent)break;if(n=we.lookupNode(n,t[i]),o=le.join2(o,t[i]),we.isMountpoint(n)&&(!a||a&&r.follow_mount)&&(n=n.mounted.root),!a||r.follow)for(var s=0;we.isLink(n.mode);){var u=we.readlink(o);if(o=fe.resolve(le.dirname(o),u),n=we.lookupPath(o,{recurse_count:r.recurse_count+1}).node,s++>40)throw new we.ErrnoError(32)}}return{path:o,node:n}},getPath:e=>{for(var r;;){if(we.isRoot(e)){var t=e.mount.mountpoint;return r?"/"!==t[t.length-1]?t+"/"+r:t+r:t}r=r?e.name+"/"+r:e.name,e=e.parent}},hashName:(e,r)=>{for(var t=0,n=0;n<r.length;n++)t=(t<<5)-t+r.charCodeAt(n)|0;return(e+t>>>0)%we.nameTable.length},hashAddNode:e=>{var r=we.hashName(e.parent.id,e.name);e.name_next=we.nameTable[r],we.nameTable[r]=e},hashRemoveNode:e=>{var r=we.hashName(e.parent.id,e.name);if(we.nameTable[r]===e)we.nameTable[r]=e.name_next;else for(var t=we.nameTable[r];t;){if(t.name_next===e){t.name_next=e.name_next;break}t=t.name_next}},lookupNode:(e,r)=>{var t=we.mayLookup(e);if(t)throw new we.ErrnoError(t,e);for(var n=we.hashName(e.id,r),o=we.nameTable[n];o;o=o.name_next){var i=o.name;if(o.parent.id===e.id&&i===r)return o}return we.lookup(e,r)},createNode:(e,r,t,n)=>{var o=new we.FSNode(e,r,t,n);return we.hashAddNode(o),o},destroyNode:e=>{we.hashRemoveNode(e)},isRoot:e=>e===e.parent,isMountpoint:e=>!!e.mounted,isFile:e=>32768==(61440&e),isDir:e=>16384==(61440&e),isLink:e=>40960==(61440&e),isChrdev:e=>8192==(61440&e),isBlkdev:e=>24576==(61440&e),isFIFO:e=>4096==(61440&e),isSocket:e=>49152==(49152&e),flagModes:{r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090},modeStringToFlags:e=>{var r=we.flagModes[e];if(void 0===r)throw new Error("Unknown file open mode: "+e);return r},flagsToPermissionString:e=>{var r=["r","w","rw"][3&e];return 512&e&&(r+="w"),r},nodePermissions:(e,r)=>we.ignorePermissions||(!r.includes("r")||292&e.mode)&&(!r.includes("w")||146&e.mode)&&(!r.includes("x")||73&e.mode)?0:2,mayLookup:e=>we.nodePermissions(e,"x")||(e.node_ops.lookup?0:2),mayCreate:(e,r)=>{try{return we.lookupNode(e,r),20}catch(e){}return we.nodePermissions(e,"wx")},mayDelete:(e,r,t)=>{var n;try{n=we.lookupNode(e,r)}catch(e){return e.errno}var o=we.nodePermissions(e,"wx");if(o)return o;if(t){if(!we.isDir(n.mode))return 54;if(we.isRoot(n)||we.getPath(n)===we.cwd())return 10}else if(we.isDir(n.mode))return 31;return 0},mayOpen:(e,r)=>e?we.isLink(e.mode)?32:we.isDir(e.mode)&&("r"!==we.flagsToPermissionString(r)||512&r)?31:we.nodePermissions(e,we.flagsToPermissionString(r)):44,MAX_OPEN_FDS:4096,nextfd:(e=0,r=we.MAX_OPEN_FDS)=>{for(var t=e;t<=r;t++)if(!we.streams[t])return t;throw new we.ErrnoError(33)},getStream:e=>we.streams[e],createStream:(e,r,t)=>{we.FSStream||(we.FSStream=function(){this.shared={}},we.FSStream.prototype={},Object.defineProperties(we.FSStream.prototype,{object:{get:function(){return this.node},set:function(e){this.node=e}},isRead:{get:function(){return 1!=(2097155&this.flags)}},isWrite:{get:function(){return 0!=(2097155&this.flags)}},isAppend:{get:function(){return 1024&this.flags}},flags:{get:function(){return this.shared.flags},set:function(e){this.shared.flags=e}},position:{get:function(){return this.shared.position},set:function(e){this.shared.position=e}}})),e=Object.assign(new we.FSStream,e);var n=we.nextfd(r,t);return e.fd=n,we.streams[n]=e,e},closeStream:e=>{we.streams[e]=null},chrdev_stream_ops:{open:e=>{var r=we.getDevice(e.node.rdev);e.stream_ops=r.stream_ops,e.stream_ops.open&&e.stream_ops.open(e)},llseek:()=>{throw new we.ErrnoError(70)}},major:e=>e>>8,minor:e=>255&e,makedev:(e,r)=>e<<8|r,registerDevice:(e,r)=>{we.devices[e]={stream_ops:r}},getDevice:e=>we.devices[e],getMounts:e=>{for(var r=[],t=[e];t.length;){var n=t.pop();r.push(n),t.push.apply(t,n.mounts)}return r},syncfs:(e,r)=>{"function"==typeof e&&(r=e,e=!1),we.syncFSRequests++,we.syncFSRequests>1&&E("warning: "+we.syncFSRequests+" FS.syncfs operations in flight at once, probably just doing extra work");var t=we.getMounts(we.root.mount),n=0;function o(e){return we.syncFSRequests--,r(e)}function i(e){if(e)return i.errored?void 0:(i.errored=!0,o(e));++n>=t.length&&o(null)}t.forEach((r=>{if(!r.type.syncfs)return i(null);r.type.syncfs(r,e,i)}))},mount:(e,r,t)=>{var n,o="/"===t,i=!t;if(o&&we.root)throw new we.ErrnoError(10);if(!o&&!i){var a=we.lookupPath(t,{follow_mount:!1});if(t=a.path,n=a.node,we.isMountpoint(n))throw new we.ErrnoError(10);if(!we.isDir(n.mode))throw new we.ErrnoError(54)}var s={type:e,opts:r,mountpoint:t,mounts:[]},u=e.mount(s);return u.mount=s,s.root=u,o?we.root=u:n&&(n.mounted=s,n.mount&&n.mount.mounts.push(s)),u},unmount:e=>{var r=we.lookupPath(e,{follow_mount:!1});if(!we.isMountpoint(r.node))throw new we.ErrnoError(28);var t=r.node,n=t.mounted,o=we.getMounts(n);Object.keys(we.nameTable).forEach((e=>{for(var r=we.nameTable[e];r;){var t=r.name_next;o.includes(r.mount)&&we.destroyNode(r),r=t}})),t.mounted=null;var i=t.mount.mounts.indexOf(n);t.mount.mounts.splice(i,1)},lookup:(e,r)=>e.node_ops.lookup(e,r),mknod:(e,r,t)=>{var n=we.lookupPath(e,{parent:!0}).node,o=le.basename(e);if(!o||"."===o||".."===o)throw new we.ErrnoError(28);var i=we.mayCreate(n,o);if(i)throw new we.ErrnoError(i);if(!n.node_ops.mknod)throw new we.ErrnoError(63);return n.node_ops.mknod(n,o,r,t)},create:(e,r)=>(r=void 0!==r?r:438,r&=4095,r|=32768,we.mknod(e,r,0)),mkdir:(e,r)=>(r=void 0!==r?r:511,r&=1023,r|=16384,we.mknod(e,r,0)),mkdirTree:(e,r)=>{for(var t=e.split("/"),n="",o=0;o<t.length;++o)if(t[o]){n+="/"+t[o];try{we.mkdir(n,r)}catch(e){if(20!=e.errno)throw e}}},mkdev:(e,r,t)=>(void 0===t&&(t=r,r=438),r|=8192,we.mknod(e,r,t)),symlink:(e,r)=>{if(!fe.resolve(e))throw new we.ErrnoError(44);var t=we.lookupPath(r,{parent:!0}).node;if(!t)throw new we.ErrnoError(44);var n=le.basename(r),o=we.mayCreate(t,n);if(o)throw new we.ErrnoError(o);if(!t.node_ops.symlink)throw new we.ErrnoError(63);return t.node_ops.symlink(t,n,e)},rename:(e,r)=>{var t,n,o=le.dirname(e),i=le.dirname(r),a=le.basename(e),s=le.basename(r);if(t=we.lookupPath(e,{parent:!0}).node,n=we.lookupPath(r,{parent:!0}).node,!t||!n)throw new we.ErrnoError(44);if(t.mount!==n.mount)throw new we.ErrnoError(75);var u,c=we.lookupNode(t,a),l=fe.relative(e,i);if("."!==l.charAt(0))throw new we.ErrnoError(28);if("."!==(l=fe.relative(r,o)).charAt(0))throw new we.ErrnoError(55);try{u=we.lookupNode(n,s)}catch(e){}if(c!==u){var f=we.isDir(c.mode),d=we.mayDelete(t,a,f);if(d)throw new we.ErrnoError(d);if(d=u?we.mayDelete(n,s,f):we.mayCreate(n,s))throw new we.ErrnoError(d);if(!t.node_ops.rename)throw new we.ErrnoError(63);if(we.isMountpoint(c)||u&&we.isMountpoint(u))throw new we.ErrnoError(10);if(n!==t&&(d=we.nodePermissions(t,"w")))throw new we.ErrnoError(d);we.hashRemoveNode(c);try{t.node_ops.rename(c,n,s)}catch(e){throw e}finally{we.hashAddNode(c)}}},rmdir:e=>{var r=we.lookupPath(e,{parent:!0}).node,t=le.basename(e),n=we.lookupNode(r,t),o=we.mayDelete(r,t,!0);if(o)throw new we.ErrnoError(o);if(!r.node_ops.rmdir)throw new we.ErrnoError(63);if(we.isMountpoint(n))throw new we.ErrnoError(10);r.node_ops.rmdir(r,t),we.destroyNode(n)},readdir:e=>{var r=we.lookupPath(e,{follow:!0}).node;if(!r.node_ops.readdir)throw new we.ErrnoError(54);return r.node_ops.readdir(r)},unlink:e=>{var r=we.lookupPath(e,{parent:!0}).node;if(!r)throw new we.ErrnoError(44);var t=le.basename(e),n=we.lookupNode(r,t),o=we.mayDelete(r,t,!1);if(o)throw new we.ErrnoError(o);if(!r.node_ops.unlink)throw new we.ErrnoError(63);if(we.isMountpoint(n))throw new we.ErrnoError(10);r.node_ops.unlink(r,t),we.destroyNode(n)},readlink:e=>{var r=we.lookupPath(e).node;if(!r)throw new we.ErrnoError(44);if(!r.node_ops.readlink)throw new we.ErrnoError(28);return fe.resolve(we.getPath(r.parent),r.node_ops.readlink(r))},stat:(e,r)=>{var t=we.lookupPath(e,{follow:!r}).node;if(!t)throw new we.ErrnoError(44);if(!t.node_ops.getattr)throw new we.ErrnoError(63);return t.node_ops.getattr(t)},lstat:e=>we.stat(e,!0),chmod:(e,r,t)=>{var n;if(!(n="string"==typeof e?we.lookupPath(e,{follow:!t}).node:e).node_ops.setattr)throw new we.ErrnoError(63);n.node_ops.setattr(n,{mode:4095&r|-4096&n.mode,timestamp:Date.now()})},lchmod:(e,r)=>{we.chmod(e,r,!0)},fchmod:(e,r)=>{var t=we.getStream(e);if(!t)throw new we.ErrnoError(8);we.chmod(t.node,r)},chown:(e,r,t,n)=>{var o;if(!(o="string"==typeof e?we.lookupPath(e,{follow:!n}).node:e).node_ops.setattr)throw new we.ErrnoError(63);o.node_ops.setattr(o,{timestamp:Date.now()})},lchown:(e,r,t)=>{we.chown(e,r,t,!0)},fchown:(e,r,t)=>{var n=we.getStream(e);if(!n)throw new we.ErrnoError(8);we.chown(n.node,r,t)},truncate:(e,r)=>{if(r<0)throw new we.ErrnoError(28);var t;if(!(t="string"==typeof e?we.lookupPath(e,{follow:!0}).node:e).node_ops.setattr)throw new we.ErrnoError(63);if(we.isDir(t.mode))throw new we.ErrnoError(31);if(!we.isFile(t.mode))throw new we.ErrnoError(28);var n=we.nodePermissions(t,"w");if(n)throw new we.ErrnoError(n);t.node_ops.setattr(t,{size:r,timestamp:Date.now()})},ftruncate:(e,r)=>{var t=we.getStream(e);if(!t)throw new we.ErrnoError(8);if(0==(2097155&t.flags))throw new we.ErrnoError(28);we.truncate(t.node,r)},utime:(e,r,t)=>{var n=we.lookupPath(e,{follow:!0}).node;n.node_ops.setattr(n,{timestamp:Math.max(r,t)})},open:(r,t,n)=>{if(""===r)throw new we.ErrnoError(44);var o;if(n=void 0===n?438:n,n=64&(t="string"==typeof t?we.modeStringToFlags(t):t)?4095&n|32768:0,"object"==typeof r)o=r;else{r=le.normalize(r);try{o=we.lookupPath(r,{follow:!(131072&t)}).node}catch(e){}}var i=!1;if(64&t)if(o){if(128&t)throw new we.ErrnoError(20)}else o=we.mknod(r,n,0),i=!0;if(!o)throw new we.ErrnoError(44);if(we.isChrdev(o.mode)&&(t&=-513),65536&t&&!we.isDir(o.mode))throw new we.ErrnoError(54);if(!i){var a=we.mayOpen(o,t);if(a)throw new we.ErrnoError(a)}512&t&&!i&&we.truncate(o,0),t&=-131713;var s=we.createStream({node:o,path:we.getPath(o),flags:t,seekable:!0,position:0,stream_ops:o.stream_ops,ungotten:[],error:!1});return s.stream_ops.open&&s.stream_ops.open(s),!e.logReadFiles||1&t||(we.readFiles||(we.readFiles={}),r in we.readFiles||(we.readFiles[r]=1)),s},close:e=>{if(we.isClosed(e))throw new we.ErrnoError(8);e.getdents&&(e.getdents=null);try{e.stream_ops.close&&e.stream_ops.close(e)}catch(e){throw e}finally{we.closeStream(e.fd)}e.fd=null},isClosed:e=>null===e.fd,llseek:(e,r,t)=>{if(we.isClosed(e))throw new we.ErrnoError(8);if(!e.seekable||!e.stream_ops.llseek)throw new we.ErrnoError(70);if(0!=t&&1!=t&&2!=t)throw new we.ErrnoError(28);return e.position=e.stream_ops.llseek(e,r,t),e.ungotten=[],e.position},read:(e,r,t,n,o)=>{if(n<0||o<0)throw new we.ErrnoError(28);if(we.isClosed(e))throw new we.ErrnoError(8);if(1==(2097155&e.flags))throw new we.ErrnoError(8);if(we.isDir(e.node.mode))throw new we.ErrnoError(31);if(!e.stream_ops.read)throw new we.ErrnoError(28);var i=void 0!==o;if(i){if(!e.seekable)throw new we.ErrnoError(70)}else o=e.position;var a=e.stream_ops.read(e,r,t,n,o);return i||(e.position+=a),a},write:(e,r,t,n,o,i)=>{if(n<0||o<0)throw new we.ErrnoError(28);if(we.isClosed(e))throw new we.ErrnoError(8);if(0==(2097155&e.flags))throw new we.ErrnoError(8);if(we.isDir(e.node.mode))throw new we.ErrnoError(31);if(!e.stream_ops.write)throw new we.ErrnoError(28);e.seekable&&1024&e.flags&&we.llseek(e,0,2);var a=void 0!==o;if(a){if(!e.seekable)throw new we.ErrnoError(70)}else o=e.position;var s=e.stream_ops.write(e,r,t,n,o,i);return a||(e.position+=s),s},allocate:(e,r,t)=>{if(we.isClosed(e))throw new we.ErrnoError(8);if(r<0||t<=0)throw new we.ErrnoError(28);if(0==(2097155&e.flags))throw new we.ErrnoError(8);if(!we.isFile(e.node.mode)&&!we.isDir(e.node.mode))throw new we.ErrnoError(43);if(!e.stream_ops.allocate)throw new we.ErrnoError(138);e.stream_ops.allocate(e,r,t)},mmap:(e,r,t,n,o)=>{if(0!=(2&n)&&0==(2&o)&&2!=(2097155&e.flags))throw new we.ErrnoError(2);if(1==(2097155&e.flags))throw new we.ErrnoError(2);if(!e.stream_ops.mmap)throw new we.ErrnoError(43);return e.stream_ops.mmap(e,r,t,n,o)},msync:(e,r,t,n,o)=>e&&e.stream_ops.msync?e.stream_ops.msync(e,r,t,n,o):0,munmap:e=>0,ioctl:(e,r,t)=>{if(!e.stream_ops.ioctl)throw new we.ErrnoError(59);return e.stream_ops.ioctl(e,r,t)},readFile:(e,r={})=>{if(r.flags=r.flags||0,r.encoding=r.encoding||"binary","utf8"!==r.encoding&&"binary"!==r.encoding)throw new Error(\'Invalid encoding type "\'+r.encoding+\'"\');var t,n=we.open(e,r.flags),o=we.stat(e).size,i=new Uint8Array(o);return we.read(n,i,0,o,0),"utf8"===r.encoding?t=j(i,0):"binary"===r.encoding&&(t=i),we.close(n),t},writeFile:(e,r,t={})=>{t.flags=t.flags||577;var n=we.open(e,t.flags,t.mode);if("string"==typeof r){var o=new Uint8Array(B(r)+1),i=N(r,o,0,o.length);we.write(n,o,0,i,void 0,t.canOwn)}else{if(!ArrayBuffer.isView(r))throw new Error("Unsupported data type");we.write(n,r,0,r.byteLength,void 0,t.canOwn)}we.close(n)},cwd:()=>we.currentPath,chdir:e=>{var r=we.lookupPath(e,{follow:!0});if(null===r.node)throw new we.ErrnoError(44);if(!we.isDir(r.node.mode))throw new we.ErrnoError(54);var t=we.nodePermissions(r.node,"x");if(t)throw new we.ErrnoError(t);we.currentPath=r.path},createDefaultDirectories:()=>{we.mkdir("/tmp"),we.mkdir("/home"),we.mkdir("/home/web_user")},createDefaultDevices:()=>{we.mkdir("/dev"),we.registerDevice(we.makedev(1,3),{read:()=>0,write:(e,r,t,n,o)=>n}),we.mkdev("/dev/null",we.makedev(1,3)),he.register(we.makedev(5,0),he.default_tty_ops),he.register(we.makedev(6,0),he.default_tty1_ops),we.mkdev("/dev/tty",we.makedev(5,0)),we.mkdev("/dev/tty1",we.makedev(6,0));var e=function(){if("object"==typeof crypto&&"function"==typeof crypto.getRandomValues){var e=new Uint8Array(1);return()=>(crypto.getRandomValues(e),e[0])}if(v)try{var r=t(85);return()=>r.randomBytes(1)[0]}catch(e){}return()=>Q("randomDevice")}();we.createDevice("/dev","random",e),we.createDevice("/dev","urandom",e),we.mkdir("/dev/shm"),we.mkdir("/dev/shm/tmp")},createSpecialDirectories:()=>{we.mkdir("/proc");var e=we.mkdir("/proc/self");we.mkdir("/proc/self/fd"),we.mount({mount:()=>{var r=we.createNode(e,"fd",16895,73);return r.node_ops={lookup:(e,r)=>{var t=+r,n=we.getStream(t);if(!n)throw new we.ErrnoError(8);var o={parent:null,mount:{mountpoint:"fake"},node_ops:{readlink:()=>n.path}};return o.parent=o,o}},r}},{},"/proc/self/fd")},createStandardStreams:()=>{e.stdin?we.createDevice("/dev","stdin",e.stdin):we.symlink("/dev/tty","/dev/stdin"),e.stdout?we.createDevice("/dev","stdout",null,e.stdout):we.symlink("/dev/tty","/dev/stdout"),e.stderr?we.createDevice("/dev","stderr",null,e.stderr):we.symlink("/dev/tty1","/dev/stderr"),we.open("/dev/stdin",0),we.open("/dev/stdout",1),we.open("/dev/stderr",1)},ensureErrnoError:()=>{we.ErrnoError||(we.ErrnoError=function(e,r){this.node=r,this.setErrno=function(e){this.errno=e},this.setErrno(e),this.message="FS error"},we.ErrnoError.prototype=new Error,we.ErrnoError.prototype.constructor=we.ErrnoError,[44].forEach((e=>{we.genericErrors[e]=new we.ErrnoError(e),we.genericErrors[e].stack="<generic error, no stack>"})))},staticInit:()=>{we.ensureErrnoError(),we.nameTable=new Array(4096),we.mount(pe,{},"/"),we.createDefaultDirectories(),we.createDefaultDevices(),we.createSpecialDirectories(),we.filesystems={MEMFS:pe}},init:(r,t,n)=>{we.init.initialized=!0,we.ensureErrnoError(),e.stdin=r||e.stdin,e.stdout=t||e.stdout,e.stderr=n||e.stderr,we.createStandardStreams()},quit:()=>{we.init.initialized=!1;for(var e=0;e<we.streams.length;e++){var r=we.streams[e];r&&we.close(r)}},getMode:(e,r)=>{var t=0;return e&&(t|=365),r&&(t|=146),t},findObject:(e,r)=>{var t=we.analyzePath(e,r);return t.exists?t.object:null},analyzePath:(e,r)=>{try{e=(n=we.lookupPath(e,{follow:!r})).path}catch(e){}var t={isRoot:!1,exists:!1,error:0,name:null,path:null,object:null,parentExists:!1,parentPath:null,parentObject:null};try{var n=we.lookupPath(e,{parent:!0});t.parentExists=!0,t.parentPath=n.path,t.parentObject=n.node,t.name=le.basename(e),n=we.lookupPath(e,{follow:!r}),t.exists=!0,t.path=n.path,t.object=n.node,t.name=n.node.name,t.isRoot="/"===n.path}catch(e){t.error=e.errno}return t},createPath:(e,r,t,n)=>{e="string"==typeof e?e:we.getPath(e);for(var o=r.split("/").reverse();o.length;){var i=o.pop();if(i){var a=le.join2(e,i);try{we.mkdir(a)}catch(e){}e=a}}return a},createFile:(e,r,t,n,o)=>{var i=le.join2("string"==typeof e?e:we.getPath(e),r),a=we.getMode(n,o);return we.create(i,a)},createDataFile:(e,r,t,n,o,i)=>{var a=r;e&&(e="string"==typeof e?e:we.getPath(e),a=r?le.join2(e,r):e);var s=we.getMode(n,o),u=we.create(a,s);if(t){if("string"==typeof t){for(var c=new Array(t.length),l=0,f=t.length;l<f;++l)c[l]=t.charCodeAt(l);t=c}we.chmod(u,146|s);var d=we.open(u,577);we.write(d,t,0,t.length,0,i),we.close(d),we.chmod(u,s)}return u},createDevice:(e,r,t,n)=>{var o=le.join2("string"==typeof e?e:we.getPath(e),r),i=we.getMode(!!t,!!n);we.createDevice.major||(we.createDevice.major=64);var a=we.makedev(we.createDevice.major++,0);return we.registerDevice(a,{open:e=>{e.seekable=!1},close:e=>{n&&n.buffer&&n.buffer.length&&n(10)},read:(e,r,n,o,i)=>{for(var a=0,s=0;s<o;s++){var u;try{u=t()}catch(e){throw new we.ErrnoError(29)}if(void 0===u&&0===a)throw new we.ErrnoError(6);if(null==u)break;a++,r[n+s]=u}return a&&(e.node.timestamp=Date.now()),a},write:(e,r,t,o,i)=>{for(var a=0;a<o;a++)try{n(r[t+a])}catch(e){throw new we.ErrnoError(29)}return o&&(e.node.timestamp=Date.now()),a}}),we.mkdev(o,i,a)},forceLoadFile:e=>{if(e.isDevice||e.isFolder||e.link||e.contents)return!0;if("undefined"!=typeof XMLHttpRequest)throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");if(!i)throw new Error("Cannot load without read() or XMLHttpRequest.");try{e.contents=de(i(e.url),!0),e.usedBytes=e.contents.length}catch(e){throw new we.ErrnoError(29)}},createLazyFile:(e,r,t,n,o)=>{function i(){this.lengthKnown=!1,this.chunks=[]}if(i.prototype.get=function(e){if(!(e>this.length-1||e<0)){var r=e%this.chunkSize,t=e/this.chunkSize|0;return this.getter(t)[r]}},i.prototype.setDataGetter=function(e){this.getter=e},i.prototype.cacheLength=function(){var e=new XMLHttpRequest;if(e.open("HEAD",t,!1),e.send(null),!(e.status>=200&&e.status<300||304===e.status))throw new Error("Couldn\'t load "+t+". Status: "+e.status);var r,n=Number(e.getResponseHeader("Content-length")),o=(r=e.getResponseHeader("Accept-Ranges"))&&"bytes"===r,i=(r=e.getResponseHeader("Content-Encoding"))&&"gzip"===r,a=1048576;o||(a=n);var s=this;s.setDataGetter((e=>{var r=e*a,o=(e+1)*a-1;if(o=Math.min(o,n-1),void 0===s.chunks[e]&&(s.chunks[e]=((e,r)=>{if(e>r)throw new Error("invalid range ("+e+", "+r+") or no bytes requested!");if(r>n-1)throw new Error("only "+n+" bytes available! programmer error!");var o=new XMLHttpRequest;if(o.open("GET",t,!1),n!==a&&o.setRequestHeader("Range","bytes="+e+"-"+r),o.responseType="arraybuffer",o.overrideMimeType&&o.overrideMimeType("text/plain; charset=x-user-defined"),o.send(null),!(o.status>=200&&o.status<300||304===o.status))throw new Error("Couldn\'t load "+t+". Status: "+o.status);return void 0!==o.response?new Uint8Array(o.response||[]):de(o.responseText||"",!0)})(r,o)),void 0===s.chunks[e])throw new Error("doXHR failed!");return s.chunks[e]})),!i&&n||(a=n=1,n=this.getter(0).length,a=n,y("LazyFiles on gzip forces download of the whole file when length is accessed")),this._length=n,this._chunkSize=a,this.lengthKnown=!0},"undefined"!=typeof XMLHttpRequest){if(!w)throw"Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";var a=new i;Object.defineProperties(a,{length:{get:function(){return this.lengthKnown||this.cacheLength(),this._length}},chunkSize:{get:function(){return this.lengthKnown||this.cacheLength(),this._chunkSize}}});var s={isDevice:!1,contents:a}}else s={isDevice:!1,url:t};var u=we.createFile(e,r,s,n,o);s.contents?u.contents=s.contents:s.url&&(u.contents=null,u.url=s.url),Object.defineProperties(u,{usedBytes:{get:function(){return this.contents.length}}});var c={};function l(e,r,t,n,o){var i=e.node.contents;if(o>=i.length)return 0;var a=Math.min(i.length-o,n);if(i.slice)for(var s=0;s<a;s++)r[t+s]=i[o+s];else for(s=0;s<a;s++)r[t+s]=i.get(o+s);return a}return Object.keys(u.stream_ops).forEach((e=>{var r=u.stream_ops[e];c[e]=function(){return we.forceLoadFile(u),r.apply(null,arguments)}})),c.read=(e,r,t,n,o)=>(we.forceLoadFile(u),l(e,r,t,n,o)),c.mmap=(e,r,t,n,o)=>{we.forceLoadFile(u);var i=me();if(!i)throw new we.ErrnoError(48);return l(e,F,i,r,t),{ptr:i,allocated:!0}},u.stream_ops=c,u},createPreloadedFile:(e,r,t,n,o,i,s,u,c,l)=>{var f=r?fe.resolve(le.join2(e,r)):e;function d(t){function a(t){l&&l(),u||we.createDataFile(e,r,t,n,o,c),i&&i(),Z()}Browser.handledByPreloadPlugin(t,f,a,(()=>{s&&s(),Z()}))||a(t)}J(),"string"==typeof t?function(e,r,t,n){var o=n?"":"al "+e;a(e,(t=>{t||Q(\'Loading data file "\'+e+\'" failed (no arrayBuffer).\'),r(new Uint8Array(t)),o&&Z()}),(r=>{if(!t)throw\'Loading data file "\'+e+\'" failed.\';t()})),o&&J()}(t,(e=>d(e)),s):d(t)},indexedDB:()=>window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,DB_NAME:()=>"EM_FS_"+window.location.pathname,DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:(e,r,t)=>{r=r||(()=>{}),t=t||(()=>{});var n=we.indexedDB();try{var o=n.open(we.DB_NAME(),we.DB_VERSION)}catch(e){return t(e)}o.onupgradeneeded=()=>{y("creating db"),o.result.createObjectStore(we.DB_STORE_NAME)},o.onsuccess=()=>{var n=o.result.transaction([we.DB_STORE_NAME],"readwrite"),i=n.objectStore(we.DB_STORE_NAME),a=0,s=0,u=e.length;function c(){0==s?r():t()}e.forEach((e=>{var r=i.put(we.analyzePath(e).object.contents,e);r.onsuccess=()=>{++a+s==u&&c()},r.onerror=()=>{s++,a+s==u&&c()}})),n.onerror=t},o.onerror=t},loadFilesFromDB:(e,r,t)=>{r=r||(()=>{}),t=t||(()=>{});var n=we.indexedDB();try{var o=n.open(we.DB_NAME(),we.DB_VERSION)}catch(e){return t(e)}o.onupgradeneeded=t,o.onsuccess=()=>{var n=o.result;try{var i=n.transaction([we.DB_STORE_NAME],"readonly")}catch(e){return void t(e)}var a=i.objectStore(we.DB_STORE_NAME),s=0,u=0,c=e.length;function l(){0==u?r():t()}e.forEach((e=>{var r=a.get(e);r.onsuccess=()=>{we.analyzePath(e).exists&&we.unlink(e),we.createDataFile(le.dirname(e),le.basename(e),r.result,!0,!0,!0),++s+u==c&&l()},r.onerror=()=>{u++,s+u==c&&l()}})),i.onerror=t},o.onerror=t}},ve={DEFAULT_POLLMASK:5,calculateAt:function(e,r,t){if(le.isAbs(r))return r;var n;if(-100===e)n=we.cwd();else{var o=we.getStream(e);if(!o)throw new we.ErrnoError(8);n=o.path}if(0==r.length){if(!t)throw new we.ErrnoError(44);return n}return le.join2(n,r)},doStat:function(e,r,t){try{var n=e(r)}catch(e){if(e&&e.node&&le.normalize(r)!==le.normalize(we.getPath(e.node)))return-54;throw e}return x[t>>2]=n.dev,x[t+8>>2]=n.ino,x[t+12>>2]=n.mode,x[t+16>>2]=n.nlink,x[t+20>>2]=n.uid,x[t+24>>2]=n.gid,x[t+28>>2]=n.rdev,X=[n.size>>>0,(G=n.size,+Math.abs(G)>=1?G>0?(0|Math.min(+Math.floor(G/4294967296),4294967295))>>>0:~~+Math.ceil((G-+(~~G>>>0))/4294967296)>>>0:0)],x[t+40>>2]=X[0],x[t+44>>2]=X[1],x[t+48>>2]=4096,x[t+52>>2]=n.blocks,X=[Math.floor(n.atime.getTime()/1e3)>>>0,(G=Math.floor(n.atime.getTime()/1e3),+Math.abs(G)>=1?G>0?(0|Math.min(+Math.floor(G/4294967296),4294967295))>>>0:~~+Math.ceil((G-+(~~G>>>0))/4294967296)>>>0:0)],x[t+56>>2]=X[0],x[t+60>>2]=X[1],x[t+64>>2]=0,X=[Math.floor(n.mtime.getTime()/1e3)>>>0,(G=Math.floor(n.mtime.getTime()/1e3),+Math.abs(G)>=1?G>0?(0|Math.min(+Math.floor(G/4294967296),4294967295))>>>0:~~+Math.ceil((G-+(~~G>>>0))/4294967296)>>>0:0)],x[t+72>>2]=X[0],x[t+76>>2]=X[1],x[t+80>>2]=0,X=[Math.floor(n.ctime.getTime()/1e3)>>>0,(G=Math.floor(n.ctime.getTime()/1e3),+Math.abs(G)>=1?G>0?(0|Math.min(+Math.floor(G/4294967296),4294967295))>>>0:~~+Math.ceil((G-+(~~G>>>0))/4294967296)>>>0:0)],x[t+88>>2]=X[0],x[t+92>>2]=X[1],x[t+96>>2]=0,X=[n.ino>>>0,(G=n.ino,+Math.abs(G)>=1?G>0?(0|Math.min(+Math.floor(G/4294967296),4294967295))>>>0:~~+Math.ceil((G-+(~~G>>>0))/4294967296)>>>0:0)],x[t+104>>2]=X[0],x[t+108>>2]=X[1],0},doMsync:function(e,r,t,n,o){var i=A.slice(e,e+t);we.msync(r,i,o,t,n)},varargs:void 0,get:function(){return ve.varargs+=4,x[ve.varargs-4>>2]},getStr:function(e){return z(e)},getStreamFromFD:function(e){var r=we.getStream(e);if(!r)throw new we.ErrnoError(8);return r}};function ge(e){return x[Oe()>>2]=e,e}function ye(e){return T[e>>2]+4294967296*x[e+4>>2]}function Ee(e){var r=B(e)+1,t=Re(r);return t&&N(e,F,t,r),t}function _e(e){try{return k.grow(e-M.byteLength+65535>>>16),I(k.buffer),1}catch(e){}}var be={};function ke(){if(!ke.strings){var e={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"==typeof navigator&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:h||"./this.program"};for(var r in be)void 0===be[r]?delete e[r]:e[r]=be[r];var t=[];for(var r in e)t.push(r+"="+e[r]);ke.strings=t}return ke.strings}function Se(r){D=r,Y()||(e.onExit&&e.onExit(r),R=!0),m(r,new ne(r))}function De(e){return e%4==0&&(e%100!=0||e%400==0)}var Me=[31,29,31,30,31,30,31,31,30,31,30,31],Fe=[31,28,31,30,31,30,31,31,30,31,30,31];function Ae(e,r,t,n){var o=x[n+40>>2],i={tm_sec:x[n>>2],tm_min:x[n+4>>2],tm_hour:x[n+8>>2],tm_mday:x[n+12>>2],tm_mon:x[n+16>>2],tm_year:x[n+20>>2],tm_wday:x[n+24>>2],tm_yday:x[n+28>>2],tm_isdst:x[n+32>>2],tm_gmtoff:x[n+36>>2],tm_zone:o?z(o):""},a=z(t),s={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var u in s)a=a.replace(new RegExp(u,"g"),s[u]);var c=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],l=["January","February","March","April","May","June","July","August","September","October","November","December"];function f(e,r,t){for(var n="number"==typeof e?e.toString():e||"";n.length<r;)n=t[0]+n;return n}function d(e,r){return f(e,r,"0")}function h(e,r){function t(e){return e<0?-1:e>0?1:0}var n;return 0===(n=t(e.getFullYear()-r.getFullYear()))&&0===(n=t(e.getMonth()-r.getMonth()))&&(n=t(e.getDate()-r.getDate())),n}function m(e){switch(e.getDay()){case 0:return new Date(e.getFullYear()-1,11,29);case 1:return e;case 2:return new Date(e.getFullYear(),0,3);case 3:return new Date(e.getFullYear(),0,2);case 4:return new Date(e.getFullYear(),0,1);case 5:return new Date(e.getFullYear()-1,11,31);case 6:return new Date(e.getFullYear()-1,11,30)}}function p(e){var r=function(e,r){for(var t=new Date(e.getTime());r>0;){var n=De(t.getFullYear()),o=t.getMonth(),i=(n?Me:Fe)[o];if(!(r>i-t.getDate()))return t.setDate(t.getDate()+r),t;r-=i-t.getDate()+1,t.setDate(1),o<11?t.setMonth(o+1):(t.setMonth(0),t.setFullYear(t.getFullYear()+1))}return t}(new Date(e.tm_year+1900,0,1),e.tm_yday),t=new Date(r.getFullYear(),0,4),n=new Date(r.getFullYear()+1,0,4),o=m(t),i=m(n);return h(o,r)<=0?h(i,r)<=0?r.getFullYear()+1:r.getFullYear():r.getFullYear()-1}var w={"%a":function(e){return c[e.tm_wday].substring(0,3)},"%A":function(e){return c[e.tm_wday]},"%b":function(e){return l[e.tm_mon].substring(0,3)},"%B":function(e){return l[e.tm_mon]},"%C":function(e){return d((e.tm_year+1900)/100|0,2)},"%d":function(e){return d(e.tm_mday,2)},"%e":function(e){return f(e.tm_mday,2," ")},"%g":function(e){return p(e).toString().substring(2)},"%G":function(e){return p(e)},"%H":function(e){return d(e.tm_hour,2)},"%I":function(e){var r=e.tm_hour;return 0==r?r=12:r>12&&(r-=12),d(r,2)},"%j":function(e){return d(e.tm_mday+function(e,r){for(var t=0,n=0;n<=r;t+=e[n++]);return t}(De(e.tm_year+1900)?Me:Fe,e.tm_mon-1),3)},"%m":function(e){return d(e.tm_mon+1,2)},"%M":function(e){return d(e.tm_min,2)},"%n":function(){return"\\n"},"%p":function(e){return e.tm_hour>=0&&e.tm_hour<12?"AM":"PM"},"%S":function(e){return d(e.tm_sec,2)},"%t":function(){return"\\t"},"%u":function(e){return e.tm_wday||7},"%U":function(e){var r=e.tm_yday+7-e.tm_wday;return d(Math.floor(r/7),2)},"%V":function(e){var r=Math.floor((e.tm_yday+7-(e.tm_wday+6)%7)/7);if((e.tm_wday+371-e.tm_yday-2)%7<=2&&r++,r){if(53==r){var t=(e.tm_wday+371-e.tm_yday)%7;4==t||3==t&&De(e.tm_year)||(r=1)}}else{r=52;var n=(e.tm_wday+7-e.tm_yday-1)%7;(4==n||5==n&&De(e.tm_year%400-1))&&r++}return d(r,2)},"%w":function(e){return e.tm_wday},"%W":function(e){var r=e.tm_yday+7-(e.tm_wday+6)%7;return d(Math.floor(r/7),2)},"%y":function(e){return(e.tm_year+1900).toString().substring(2)},"%Y":function(e){return e.tm_year+1900},"%z":function(e){var r=e.tm_gmtoff,t=r>=0;return r=(r=Math.abs(r)/60)/60*100+r%60,(t?"+":"-")+String("0000"+r).slice(-4)},"%Z":function(e){return e.tm_zone},"%%":function(){return"%"}};for(var u in a=a.replace(/%%/g,"\\0\\0"),w)a.includes(u)&&(a=a.replace(new RegExp(u,"g"),w[u](i)));var v=de(a=a.replace(/\\0\\0/g,"%"),!1);return v.length>r?0:(ie(v,e),v.length-1)}var Pe=function(e,r,t,n){e||(e=this),this.parent=e,this.mount=e.mount,this.mounted=null,this.id=we.nextInode++,this.name=r,this.mode=t,this.node_ops={},this.stream_ops={},this.rdev=n};Object.defineProperties(Pe.prototype,{read:{get:function(){return 365==(365&this.mode)},set:function(e){e?this.mode|=365:this.mode&=-366}},write:{get:function(){return 146==(146&this.mode)},set:function(e){e?this.mode|=146:this.mode&=-147}},isFolder:{get:function(){return we.isDir(this.mode)}},isDevice:{get:function(){return we.isChrdev(this.mode)}}}),we.FSNode=Pe,we.staticInit();var xe,Te={q:function(e,r){se(e)(r)},a:function(e){return Re(e+24)+24},C:function(){var e=ue.pop();e||Q("no exception to throw");var r=e.excPtr;throw e.get_rethrown()||(ue.push(e),e.set_rethrown(!0),e.set_caught(!1)),r},b:function(e,r,t){throw new ce(e).init(r,t),e},z:function(e,r,t){try{var n=ve.getStreamFromFD(e);if(n.fd===r)return-28;var o=we.getStream(r);return o&&we.close(o),we.createStream(n,r,r+1).fd}catch(e){if(void 0===we||!(e instanceof we.ErrnoError))throw e;return-e.errno}},g:function(e,r,t){ve.varargs=t;try{var n=ve.getStreamFromFD(e);switch(r){case 0:return(o=ve.get())<0?-28:we.createStream(n,o).fd;case 1:case 2:case 6:case 7:return 0;case 3:return n.flags;case 4:var o=ve.get();return n.flags|=o,0;case 5:return o=ve.get(),P[o+0>>1]=2,0;case 16:case 8:default:return-28;case 9:return ge(28),-1}}catch(e){if(void 0===we||!(e instanceof we.ErrnoError))throw e;return-e.errno}},B:function(e,r,t){ve.varargs=t;try{var n=ve.getStreamFromFD(e);switch(r){case 21509:case 21505:case 21510:case 21511:case 21512:case 21506:case 21507:case 21508:case 21523:case 21524:return n.tty?0:-59;case 21519:if(!n.tty)return-59;var o=ve.get();return x[o>>2]=0,0;case 21520:return n.tty?-28:-59;case 21531:return o=ve.get(),we.ioctl(n,r,o);default:return-28}}catch(e){if(void 0===we||!(e instanceof we.ErrnoError))throw e;return-e.errno}},u:function(e,r){try{return e=ve.getStr(e),ve.doStat(we.lstat,e,r)}catch(e){if(void 0===we||!(e instanceof we.ErrnoError))throw e;return-e.errno}},l:function(e,r,t,n){ve.varargs=n;try{r=ve.getStr(r),r=ve.calculateAt(e,r);var o=n?ve.get():0;return we.open(r,t,o).fd}catch(e){if(void 0===we||!(e instanceof we.ErrnoError))throw e;return-e.errno}},v:function(e,r,t,n){try{return r=ve.getStr(r),n=ve.getStr(n),r=ve.calculateAt(e,r),n=ve.calculateAt(t,n),we.rename(r,n),0}catch(e){if(void 0===we||!(e instanceof we.ErrnoError))throw e;return-e.errno}},w:function(e){try{return e=ve.getStr(e),we.rmdir(e),0}catch(e){if(void 0===we||!(e instanceof we.ErrnoError))throw e;return-e.errno}},j:function(e,r,t){try{return r=ve.getStr(r),r=ve.calculateAt(e,r),0===t?we.unlink(r):512===t?we.rmdir(r):Q("Invalid flags passed to unlinkat"),0}catch(e){if(void 0===we||!(e instanceof we.ErrnoError))throw e;return-e.errno}},d:function(){return Date.now()},D:function(){return!0},s:function(){throw 1/0},E:function(e,r){var t=new Date(1e3*ye(e));x[r>>2]=t.getUTCSeconds(),x[r+4>>2]=t.getUTCMinutes(),x[r+8>>2]=t.getUTCHours(),x[r+12>>2]=t.getUTCDate(),x[r+16>>2]=t.getUTCMonth(),x[r+20>>2]=t.getUTCFullYear()-1900,x[r+24>>2]=t.getUTCDay();var n=Date.UTC(t.getUTCFullYear(),0,1,0,0,0,0),o=(t.getTime()-n)/864e5|0;x[r+28>>2]=o},F:function(e,r){var t=new Date(1e3*ye(e));x[r>>2]=t.getSeconds(),x[r+4>>2]=t.getMinutes(),x[r+8>>2]=t.getHours(),x[r+12>>2]=t.getDate(),x[r+16>>2]=t.getMonth(),x[r+20>>2]=t.getFullYear()-1900,x[r+24>>2]=t.getDay();var n=new Date(t.getFullYear(),0,1),o=(t.getTime()-n.getTime())/864e5|0;x[r+28>>2]=o,x[r+36>>2]=-60*t.getTimezoneOffset();var i=new Date(t.getFullYear(),6,1).getTimezoneOffset(),a=n.getTimezoneOffset(),s=0|(i!=a&&t.getTimezoneOffset()==Math.min(a,i));x[r+32>>2]=s},G:function(e){var r=new Date(x[e+20>>2]+1900,x[e+16>>2],x[e+12>>2],x[e+8>>2],x[e+4>>2],x[e>>2],0),t=x[e+32>>2],n=r.getTimezoneOffset(),o=new Date(r.getFullYear(),0,1),i=new Date(r.getFullYear(),6,1).getTimezoneOffset(),a=o.getTimezoneOffset(),s=Math.min(a,i);if(t<0)x[e+32>>2]=Number(i!=a&&s==n);else if(t>0!=(s==n)){var u=Math.max(a,i),c=t>0?s:u;r.setTime(r.getTime()+6e4*(c-n))}x[e+24>>2]=r.getDay();var l=(r.getTime()-o.getTime())/864e5|0;return x[e+28>>2]=l,x[e>>2]=r.getSeconds(),x[e+4>>2]=r.getMinutes(),x[e+8>>2]=r.getHours(),x[e+12>>2]=r.getDate(),x[e+16>>2]=r.getMonth(),r.getTime()/1e3|0},H:function e(r,t,n){e.called||(e.called=!0,function(e,r,t){var n=(new Date).getFullYear(),o=new Date(n,0,1),i=new Date(n,6,1),a=o.getTimezoneOffset(),s=i.getTimezoneOffset(),u=Math.max(a,s);function c(e){var r=e.toTimeString().match(/\\(([A-Za-z ]+)\\)$/);return r?r[1]:"GMT"}x[e>>2]=60*u,x[r>>2]=Number(a!=s);var l=c(o),f=c(i),d=Ee(l),h=Ee(f);s<a?(T[t>>2]=d,T[t+4>>2]=h):(T[t>>2]=h,T[t+4>>2]=d)}(r,t,n))},c:function(){Q("")},i:function(e){setTimeout((function(){!function(e){if(!R)try{e()}catch(e){!function(e){if(e instanceof ne||"unwind"==e)return D;m(1,e)}(e)}}((function(){je(14)}))}),1e3*e)},I:function(e,r,t){A.copyWithin(e,r,r+t)},t:function(e){var r,t=A.length,n=2147483648;if((e>>>=0)>n)return!1;for(var o=1;o<=4;o*=2){var i=t*(1+.2/o);if(i=Math.min(i,e+100663296),_e(Math.min(n,(r=Math.max(e,i))+(65536-r%65536)%65536)))return!0}return!1},x:function(e,r){var t=0;return ke().forEach((function(n,o){var i=r+t;T[e+4*o>>2]=i,function(e,r,t){for(var n=0;n<e.length;++n)F[r++>>0]=e.charCodeAt(n);F[r>>0]=0}(n,i),t+=n.length+1})),0},y:function(e,r){var t=ke();T[e>>2]=t.length;var n=0;return t.forEach((function(e){n+=e.length+1})),T[r>>2]=n,0},K:function(e,r){D=e,Se(e)},f:function(e){try{var r=ve.getStreamFromFD(e);return we.close(r),0}catch(e){if(void 0===we||!(e instanceof we.ErrnoError))throw e;return e.errno}},A:function(e,r,t,n){try{var o=function(e,r,t,n){for(var o=0,i=0;i<t;i++){var a=T[r>>2],s=T[r+4>>2];r+=8;var u=we.read(e,F,a,s,undefined);if(u<0)return-1;if(o+=u,u<s)break}return o}(ve.getStreamFromFD(e),r,t);return x[n>>2]=o,0}catch(e){if(void 0===we||!(e instanceof we.ErrnoError))throw e;return e.errno}},p:function(e,r,t,n,o){try{var i=(u=t)+2097152>>>0<4194305-!!(s=r)?(s>>>0)+4294967296*u:NaN;if(isNaN(i))return 61;var a=ve.getStreamFromFD(e);return we.llseek(a,i,n),X=[a.position>>>0,(G=a.position,+Math.abs(G)>=1?G>0?(0|Math.min(+Math.floor(G/4294967296),4294967295))>>>0:~~+Math.ceil((G-+(~~G>>>0))/4294967296)>>>0:0)],x[o>>2]=X[0],x[o+4>>2]=X[1],a.getdents&&0===i&&0===n&&(a.getdents=null),0}catch(e){if(void 0===we||!(e instanceof we.ErrnoError))throw e;return e.errno}var s,u},k:function(e,r,t,n){try{var o=function(e,r,t,n){for(var o=0,i=0;i<t;i++){var a=T[r>>2],s=T[r+4>>2];r+=8;var u=we.write(e,F,a,s,undefined);if(u<0)return-1;o+=u}return o}(ve.getStreamFromFD(e),r,t);return T[n>>2]=o,0}catch(e){if(void 0===we||!(e instanceof we.ErrnoError))throw e;return e.errno}},h:function(){return b},o:function(e,r,t){var n=Ne();try{se(e)(r,t)}catch(e){if(Be(n),e!==e+0)throw e;ze(1,0)}},J:Se,e:function(e){b=e},n:Ae,r:function(e,r,t,n){return Ae(e,r,t,n)},m:function(e){if(v){if(!e)return 1;var r=z(e);if(!r.length)return 0;var n=t(654).spawnSync(r,[],{shell:!0,stdio:"inherit"}),o=(e,r)=>e<<8|r;return null===n.status?o(0,(e=>{switch(e){case"SIGHUP":return 1;case"SIGINT":return 2;case"SIGQUIT":return 3;case"SIGFPE":return 8;case"SIGKILL":return 9;case"SIGALRM":return 14;case"SIGTERM":return 15}return 2})(n.signal)):o(n.status,0)}return e?(ge(52),-1):0}},Re=(function(){var r={a:Te};function t(r,t){var n,o=r.exports;e.asm=o,I((k=e.asm.L).buffer),C=e.asm.O,n=e.asm.M,U.unshift(n),Z()}function n(e){t(e.instance)}function i(e){return function(){if(!_&&(p||w)){if("function"==typeof fetch&&!re(W))return fetch(W,{credentials:"same-origin"}).then((function(e){if(!e.ok)throw"failed to load wasm binary file at \'"+W+"\'";return e.arrayBuffer()})).catch((function(){return te(W)}));if(a)return new Promise((function(e,r){a(W,(function(r){e(new Uint8Array(r))}),r)}))}return Promise.resolve().then((function(){return te(W)}))}().then((function(e){return WebAssembly.instantiate(e,r)})).then((function(e){return e})).then(e,(function(e){E("failed to asynchronously prepare wasm: "+e),Q(e)}))}if(J(),e.instantiateWasm)try{return e.instantiateWasm(r,t)}catch(e){return E("Module.instantiateWasm callback failed with error: "+e),!1}(_||"function"!=typeof WebAssembly.instantiateStreaming||ee(W)||re(W)||v||"function"!=typeof fetch?i(n):fetch(W,{credentials:"same-origin"}).then((function(e){return WebAssembly.instantiateStreaming(e,r).then(n,(function(e){return E("wasm streaming compile failed: "+e),E("falling back to ArrayBuffer instantiation"),i(n)}))}))).catch(o)}(),e.___wasm_call_ctors=function(){return(e.___wasm_call_ctors=e.asm.M).apply(null,arguments)},e._run=function(){return(e._run=e.asm.N).apply(null,arguments)},e._memset=function(){return(e._memset=e.asm.P).apply(null,arguments)},e._malloc=function(){return(Re=e._malloc=e.asm.Q).apply(null,arguments)}),Oe=e.___errno_location=function(){return(Oe=e.___errno_location=e.asm.R).apply(null,arguments)},je=e._raise=function(){return(je=e._raise=e.asm.S).apply(null,arguments)},ze=e._setThrew=function(){return(ze=e._setThrew=e.asm.T).apply(null,arguments)},Ne=e.stackSave=function(){return(Ne=e.stackSave=e.asm.U).apply(null,arguments)},Be=e.stackRestore=function(){return(Be=e.stackRestore=e.asm.V).apply(null,arguments)},Ie=e.stackAlloc=function(){return(Ie=e.stackAlloc=e.asm.W).apply(null,arguments)},Ce=e.___cxa_is_pointer_type=function(){return(Ce=e.___cxa_is_pointer_type=e.asm.X).apply(null,arguments)};function Le(t){function n(){xe||(xe=!0,e.calledRun=!0,R||(e.noFSInit||we.init.initialized||we.init(),we.ignorePermissions=!1,he.init(),oe(U),r(e),e.onRuntimeInitialized&&e.onRuntimeInitialized(),function(){if(e.postRun)for("function"==typeof e.postRun&&(e.postRun=[e.postRun]);e.postRun.length;)r=e.postRun.shift(),H.unshift(r);var r;oe(H)}()))}t=t||d,V>0||(function(){if(e.preRun)for("function"==typeof e.preRun&&(e.preRun=[e.preRun]);e.preRun.length;)r=e.preRun.shift(),L.unshift(r);var r;oe(L)}(),V>0||(e.setStatus?(e.setStatus("Running..."),setTimeout((function(){setTimeout((function(){e.setStatus("")}),1),n()}),1)):n()))}if(e.ccall=function(r,t,n,o,i){var a={string:e=>{var r=0;if(null!=e&&0!==e){var t=1+(e.length<<2);!function(e,r,t){N(e,A,r,t)}(e,r=Ie(t),t)}return r},array:e=>{var r=Ie(e.length);return ie(e,r),r}},s=function(r){return e["_"+r]}(r),u=[],c=0;if(o)for(var l=0;l<o.length;l++){var f=a[n[l]];f?(0===c&&(c=Ne()),u[l]=f(o[l])):u[l]=o[l]}var d=s.apply(null,u);return function(e){return 0!==c&&Be(c),function(e){return"string"===t?z(e):"boolean"===t?Boolean(e):e}(e)}(d)},$=function e(){xe||Le(),xe||($=e)},e.preInit)for("function"==typeof e.preInit&&(e.preInit=[e.preInit]);e.preInit.length>0;)e.preInit.pop()();return Le(),e.ready});"object"==typeof exports?e.exports=o:"function"==typeof define&&t.amdO?define([],(function(){return o})):"object"==typeof exports&&(exports.Module=o)},86:(e,r,t)=>{"use strict";t.d(r,{Z:()=>n});const n="/dist/clingo.wasm"},354:function(e,r,t){"use strict";var n=this&&this.__awaiter||function(e,r,t,n){return new(t||(t=Promise))((function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function s(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var r;e.done?o(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(a,s)}u((n=n.apply(e,r||[])).next())}))};Object.defineProperty(r,"__esModule",{value:!0}),r.init=r.Runner=void 0;const o=t(758);class i{constructor(e={}){this.extraParams=e,this.results=[],this.errors=[]}init(){return n(this,void 0,void 0,(function*(){if(console.info("Initialize Clingo"),!this.clingo){const e=Object.assign({print:e=>this.results.push(e),printErr:e=>this.errors.push(e)},this.extraParams);o.Module?this.clingo=yield(0,o.Module)(e):this.clingo=yield t(758)(e)}}))}run(e,r=1,t=[]){this.results=[],this.errors=[];try{this.clingo.ccall("run","number",["string","string"],[e,`--outf=2 ${t.join(" ")} ${r}`])}catch(e){return{Result:"ERROR",Error:this.errors.join("\\n")}}const n=JSON.parse(this.results.join(""));return delete n.Input,n.Warnings=this.errors.join("\\n").split("\\n\\n"),n}}r.Runner=i,r.init=function(e={}){return n(this,void 0,void 0,(function*(){const r=new i(e);return yield r.init(),r.run.bind(r)}))}},800:function(e,r,t){"use strict";var n=this&&this.__awaiter||function(e,r,t,n){return new(t||(t=Promise))((function(o,i){function a(e){try{u(n.next(e))}catch(e){i(e)}}function s(e){try{u(n.throw(e))}catch(e){i(e)}}function u(e){var r;e.done?o(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(a,s)}u((n=n.apply(e,r||[])).next())}))};Object.defineProperty(r,"__esModule",{value:!0});const o=t(354),i=t(86).Z;let a;function s(e){return n(this,void 0,void 0,(function*(){a=yield(0,o.init)({locateFile:r=>e||(r.endsWith(".wasm")?`${location.origin}/${i}`:r)})}))}addEventListener("message",(e=>n(void 0,void 0,void 0,(function*(){const r=e.data;if(console.info("Message",r),"run"===r.type){a||(yield s());const e=a(...r.args);postMessage(e,void 0)}else"init"===r.type&&(yield s(r.wasmUrl),postMessage(null,void 0))})))),r.default=null},654:()=>{},85:()=>{},351:()=>{},606:()=>{}},r={};function t(n){var o=r[n];if(void 0!==o)return o.exports;var i=r[n]={id:n,loaded:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}t.amdO={},t.d=(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t(800)})();', "Worker", undefined, t2.p + "clingo.web.worker.js");
      }
    }, 477: (e2) => {
      e2.exports = function(e3, r2, t2, n) {
        var o = self || window;
        try {
          try {
            var i;
            try {
              i = new o.Blob([e3]);
            } catch (r3) {
              (i = new (o.BlobBuilder || o.WebKitBlobBuilder || o.MozBlobBuilder || o.MSBlobBuilder)).append(e3), i = i.getBlob();
            }
            var a = o.URL || o.webkitURL, s = a.createObjectURL(i), u = new o[r2](s, t2);
            return a.revokeObjectURL(s), u;
          } catch (n2) {
            return new o[r2]("data:application/javascript,".concat(encodeURIComponent(e3)), t2);
          }
        } catch (e4) {
          if (!n)
            throw Error("Inline worker is not supported");
          return new o[r2](n, t2);
        }
      };
    } }, r = {};
    function t(n) {
      var o = r[n];
      if (o !== undefined)
        return o.exports;
      var i = r[n] = { exports: {} };
      return e[n].call(i.exports, i, i.exports, t), i.exports;
    }
    return t.n = (e2) => {
      var r2 = e2 && e2.__esModule ? () => e2.default : () => e2;
      return t.d(r2, { a: r2 }), r2;
    }, t.d = (e2, r2) => {
      for (var n in r2)
        t.o(r2, n) && !t.o(e2, n) && Object.defineProperty(e2, n, { enumerable: true, get: r2[n] });
    }, t.g = function() {
      if (typeof globalThis == "object")
        return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e2) {
        if (typeof window == "object")
          return window;
      }
    }(), t.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t.r = (e2) => {
      typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
    }, (() => {
      var e2;
      t.g.importScripts && (e2 = t.g.location + "");
      var r2 = t.g.document;
      if (!e2 && r2 && (r2.currentScript && (e2 = r2.currentScript.src), !e2)) {
        var n = r2.getElementsByTagName("script");
        n.length && (e2 = n[n.length - 1].src);
      }
      if (!e2)
        throw new Error("Automatic publicPath is not supported in this browser");
      e2 = e2.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/"), t.p = e2;
    })(), t(147);
  })());
});

// node_modules/rot-js/lib/rng.js
var FRAC = 0.00000000023283064365386964;

class RNG {
  constructor() {
    this._seed = 0;
    this._s0 = 0;
    this._s1 = 0;
    this._s2 = 0;
    this._c = 0;
  }
  getSeed() {
    return this._seed;
  }
  setSeed(seed) {
    seed = seed < 1 ? 1 / seed : seed;
    this._seed = seed;
    this._s0 = (seed >>> 0) * FRAC;
    seed = seed * 69069 + 1 >>> 0;
    this._s1 = seed * FRAC;
    seed = seed * 69069 + 1 >>> 0;
    this._s2 = seed * FRAC;
    this._c = 1;
    return this;
  }
  getUniform() {
    let t = 2091639 * this._s0 + this._c * FRAC;
    this._s0 = this._s1;
    this._s1 = this._s2;
    this._c = t | 0;
    this._s2 = t - this._c;
    return this._s2;
  }
  getUniformInt(lowerBound, upperBound) {
    let max = Math.max(lowerBound, upperBound);
    let min = Math.min(lowerBound, upperBound);
    return Math.floor(this.getUniform() * (max - min + 1)) + min;
  }
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
  getPercentage() {
    return 1 + Math.floor(this.getUniform() * 100);
  }
  getItem(array) {
    if (!array.length) {
      return null;
    }
    return array[Math.floor(this.getUniform() * array.length)];
  }
  shuffle(array) {
    let result = [];
    let clone = array.slice();
    while (clone.length) {
      let index = clone.indexOf(this.getItem(clone));
      result.push(clone.splice(index, 1)[0]);
    }
    return result;
  }
  getWeightedValue(data) {
    let total = 0;
    for (let id2 in data) {
      total += data[id2];
    }
    let random = this.getUniform() * total;
    let id, part = 0;
    for (id in data) {
      part += data[id];
      if (random < part) {
        return id;
      }
    }
    return id;
  }
  getState() {
    return [this._s0, this._s1, this._s2, this._c];
  }
  setState(state) {
    this._s0 = state[0];
    this._s1 = state[1];
    this._s2 = state[2];
    this._c = state[3];
    return this;
  }
  clone() {
    let clone = new RNG;
    return clone.setState(this.getState());
  }
}
var rng_default = new RNG().setSeed(Date.now());
// node_modules/rot-js/lib/display/backend.js
class Backend {
  getContainer() {
    return null;
  }
  setOptions(options) {
    this._options = options;
  }
}

// node_modules/rot-js/lib/display/canvas.js
class Canvas extends Backend {
  constructor() {
    super();
    this._ctx = document.createElement("canvas").getContext("2d");
  }
  schedule(cb) {
    requestAnimationFrame(cb);
  }
  getContainer() {
    return this._ctx.canvas;
  }
  setOptions(opts) {
    super.setOptions(opts);
    const style = opts.fontStyle ? `${opts.fontStyle} ` : ``;
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

// node_modules/rot-js/lib/util.js
function mod(x, n) {
  return (x % n + n) % n;
}
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substring(1);
}
function format(template, ...args) {
  let map = format.map;
  let replacer = function(match, group1, group2, index) {
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
  s: "toString"
};

// node_modules/rot-js/lib/display/hex.js
class Hex extends Canvas {
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
    for (let i = 0;i < chars.length; i++) {
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
    let oldFont = this._ctx.font;
    this._ctx.font = "100px " + this._options.fontFamily;
    let width = Math.ceil(this._ctx.measureText("W").width);
    this._ctx.font = oldFont;
    let ratio = width / 100;
    hexSize = Math.floor(hexSize) + 1;
    let fontSize = 2 * hexSize / (this._options.spacing * (1 + ratio / Math.sqrt(3)));
    return Math.ceil(fontSize) - 1;
  }
  _normalizedEventToPosition(x, y) {
    let nodeSize;
    if (this._options.transpose) {
      x += y;
      y = x - y;
      x -= y;
      nodeSize = this._ctx.canvas.width;
    } else {
      nodeSize = this._ctx.canvas.height;
    }
    let size = nodeSize / this._options.height;
    y = Math.floor(y / size);
    if (mod(y, 2)) {
      x -= this._spacingX;
      x = 1 + 2 * Math.floor(x / (2 * this._spacingX));
    } else {
      x = 2 * Math.floor(x / (2 * this._spacingX));
    }
    return [x, y];
  }
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
    } else {
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
    } else {
      xprop = "width";
      yprop = "height";
    }
    this._ctx.canvas[xprop] = Math.ceil((opts.width + 1) * this._spacingX);
    this._ctx.canvas[yprop] = Math.ceil((opts.height - 1) * this._spacingY + 2 * this._hexSize);
  }
}

// node_modules/rot-js/lib/display/rect.js
var Rect = (() => {
  class Rect2 extends Canvas {
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
      if (Rect2.cache) {
        this._drawWithCache(data);
      } else {
        this._drawNoCache(data, clearBefore);
      }
    }
    _drawWithCache(data) {
      let [x, y, ch, fg, bg] = data;
      let hash = "" + ch + fg + bg;
      let canvas3;
      if (hash in this._canvasCache) {
        canvas3 = this._canvasCache[hash];
      } else {
        let b = this._options.border;
        canvas3 = document.createElement("canvas");
        let ctx = canvas3.getContext("2d");
        canvas3.width = this._spacingX;
        canvas3.height = this._spacingY;
        ctx.fillStyle = bg;
        ctx.fillRect(b, b, canvas3.width - b, canvas3.height - b);
        if (ch) {
          ctx.fillStyle = fg;
          ctx.font = this._ctx.font;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          let chars = [].concat(ch);
          for (let i = 0;i < chars.length; i++) {
            ctx.fillText(chars[i], this._spacingX / 2, Math.ceil(this._spacingY / 2));
          }
        }
        this._canvasCache[hash] = canvas3;
      }
      this._ctx.drawImage(canvas3, x * this._spacingX, y * this._spacingY);
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
      for (let i = 0;i < chars.length; i++) {
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
      let oldFont = this._ctx.font;
      this._ctx.font = "100px " + this._options.fontFamily;
      let width = Math.ceil(this._ctx.measureText("W").width);
      this._ctx.font = oldFont;
      let ratio = width / 100;
      let widthFraction = ratio * boxHeight / boxWidth;
      if (widthFraction > 1) {
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
  Rect2.cache = false;
  return Rect2;
})();
var rect_default = Rect;

// node_modules/rot-js/lib/display/tile.js
class Tile extends Canvas {
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
      } else {
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
    for (let i = 0;i < chars.length; i++) {
      let tile = this._options.tileMap[chars[i]];
      if (!tile) {
        throw new Error(`Char "${chars[i]}" not found in tileMap`);
      }
      if (this._options.tileColorize) {
        let canvas4 = this._colorCanvas;
        let context = canvas4.getContext("2d");
        context.globalCompositeOperation = "source-over";
        context.clearRect(0, 0, tileWidth, tileHeight);
        let fg2 = fgs[i];
        let bg2 = bgs[i];
        context.drawImage(this._options.tileSet, tile[0], tile[1], tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);
        if (fg2 != "transparent") {
          context.fillStyle = fg2;
          context.globalCompositeOperation = "source-atop";
          context.fillRect(0, 0, tileWidth, tileHeight);
        }
        if (bg2 != "transparent") {
          context.fillStyle = bg2;
          context.globalCompositeOperation = "destination-over";
          context.fillRect(0, 0, tileWidth, tileHeight);
        }
        this._ctx.drawImage(canvas4, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
      } else {
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

// node_modules/rot-js/lib/color.js
function fromString(str) {
  let cached, r;
  if (str in CACHE) {
    cached = CACHE[str];
  } else {
    if (str.charAt(0) == "#") {
      let matched = str.match(/[0-9a-f]/gi) || [];
      let values = matched.map((x) => parseInt(x, 16));
      if (values.length == 3) {
        cached = values.map((x) => x * 17);
      } else {
        for (let i = 0;i < 3; i++) {
          values[i + 1] += 16 * values[i];
          values.splice(i, 1);
        }
        cached = values;
      }
    } else if (r = str.match(/rgb\(([0-9, ]+)\)/i)) {
      cached = r[1].split(/\s*,\s*/).map((x) => parseInt(x));
    } else {
      cached = [0, 0, 0];
    }
    CACHE[str] = cached;
  }
  return cached.slice();
}
function interpolate(color1, color2, factor = 0.5) {
  let result = color1.slice();
  for (let i = 0;i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return result;
}
var CACHE = {
  black: [0, 0, 0],
  navy: [0, 0, 128],
  darkblue: [0, 0, 139],
  mediumblue: [0, 0, 205],
  blue: [0, 0, 255],
  darkgreen: [0, 100, 0],
  green: [0, 128, 0],
  teal: [0, 128, 128],
  darkcyan: [0, 139, 139],
  deepskyblue: [0, 191, 255],
  darkturquoise: [0, 206, 209],
  mediumspringgreen: [0, 250, 154],
  lime: [0, 255, 0],
  springgreen: [0, 255, 127],
  aqua: [0, 255, 255],
  cyan: [0, 255, 255],
  midnightblue: [25, 25, 112],
  dodgerblue: [30, 144, 255],
  forestgreen: [34, 139, 34],
  seagreen: [46, 139, 87],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  limegreen: [50, 205, 50],
  mediumseagreen: [60, 179, 113],
  turquoise: [64, 224, 208],
  royalblue: [65, 105, 225],
  steelblue: [70, 130, 180],
  darkslateblue: [72, 61, 139],
  mediumturquoise: [72, 209, 204],
  indigo: [75, 0, 130],
  darkolivegreen: [85, 107, 47],
  cadetblue: [95, 158, 160],
  cornflowerblue: [100, 149, 237],
  mediumaquamarine: [102, 205, 170],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  slateblue: [106, 90, 205],
  olivedrab: [107, 142, 35],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  mediumslateblue: [123, 104, 238],
  lawngreen: [124, 252, 0],
  chartreuse: [127, 255, 0],
  aquamarine: [127, 255, 212],
  maroon: [128, 0, 0],
  purple: [128, 0, 128],
  olive: [128, 128, 0],
  gray: [128, 128, 128],
  grey: [128, 128, 128],
  skyblue: [135, 206, 235],
  lightskyblue: [135, 206, 250],
  blueviolet: [138, 43, 226],
  darkred: [139, 0, 0],
  darkmagenta: [139, 0, 139],
  saddlebrown: [139, 69, 19],
  darkseagreen: [143, 188, 143],
  lightgreen: [144, 238, 144],
  mediumpurple: [147, 112, 216],
  darkviolet: [148, 0, 211],
  palegreen: [152, 251, 152],
  darkorchid: [153, 50, 204],
  yellowgreen: [154, 205, 50],
  sienna: [160, 82, 45],
  brown: [165, 42, 42],
  darkgray: [169, 169, 169],
  darkgrey: [169, 169, 169],
  lightblue: [173, 216, 230],
  greenyellow: [173, 255, 47],
  paleturquoise: [175, 238, 238],
  lightsteelblue: [176, 196, 222],
  powderblue: [176, 224, 230],
  firebrick: [178, 34, 34],
  darkgoldenrod: [184, 134, 11],
  mediumorchid: [186, 85, 211],
  rosybrown: [188, 143, 143],
  darkkhaki: [189, 183, 107],
  silver: [192, 192, 192],
  mediumvioletred: [199, 21, 133],
  indianred: [205, 92, 92],
  peru: [205, 133, 63],
  chocolate: [210, 105, 30],
  tan: [210, 180, 140],
  lightgray: [211, 211, 211],
  lightgrey: [211, 211, 211],
  palevioletred: [216, 112, 147],
  thistle: [216, 191, 216],
  orchid: [218, 112, 214],
  goldenrod: [218, 165, 32],
  crimson: [220, 20, 60],
  gainsboro: [220, 220, 220],
  plum: [221, 160, 221],
  burlywood: [222, 184, 135],
  lightcyan: [224, 255, 255],
  lavender: [230, 230, 250],
  darksalmon: [233, 150, 122],
  violet: [238, 130, 238],
  palegoldenrod: [238, 232, 170],
  lightcoral: [240, 128, 128],
  khaki: [240, 230, 140],
  aliceblue: [240, 248, 255],
  honeydew: [240, 255, 240],
  azure: [240, 255, 255],
  sandybrown: [244, 164, 96],
  wheat: [245, 222, 179],
  beige: [245, 245, 220],
  whitesmoke: [245, 245, 245],
  mintcream: [245, 255, 250],
  ghostwhite: [248, 248, 255],
  salmon: [250, 128, 114],
  antiquewhite: [250, 235, 215],
  linen: [250, 240, 230],
  lightgoldenrodyellow: [250, 250, 210],
  oldlace: [253, 245, 230],
  red: [255, 0, 0],
  fuchsia: [255, 0, 255],
  magenta: [255, 0, 255],
  deeppink: [255, 20, 147],
  orangered: [255, 69, 0],
  tomato: [255, 99, 71],
  hotpink: [255, 105, 180],
  coral: [255, 127, 80],
  darkorange: [255, 140, 0],
  lightsalmon: [255, 160, 122],
  orange: [255, 165, 0],
  lightpink: [255, 182, 193],
  pink: [255, 192, 203],
  gold: [255, 215, 0],
  peachpuff: [255, 218, 185],
  navajowhite: [255, 222, 173],
  moccasin: [255, 228, 181],
  bisque: [255, 228, 196],
  mistyrose: [255, 228, 225],
  blanchedalmond: [255, 235, 205],
  papayawhip: [255, 239, 213],
  lavenderblush: [255, 240, 245],
  seashell: [255, 245, 238],
  cornsilk: [255, 248, 220],
  lemonchiffon: [255, 250, 205],
  floralwhite: [255, 250, 240],
  snow: [255, 250, 250],
  yellow: [255, 255, 0],
  lightyellow: [255, 255, 224],
  ivory: [255, 255, 240],
  white: [255, 255, 255]
};

// node_modules/rot-js/lib/display/tile-gl.js
var createProgram = function(gl, vss, fss) {
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
};
var createQuad = function(gl) {
  const pos = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
};
var createTexture = function(gl, data) {
  let t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
  return t;
};
var parseColor = function(color) {
  if (!(color in colorCache)) {
    let parsed;
    if (color == "transparent") {
      parsed = [0, 0, 0, 0];
    } else if (color.indexOf("rgba") > -1) {
      parsed = (color.match(/[\d.]+/g) || []).map(Number);
      for (let i = 0;i < 3; i++) {
        parsed[i] = parsed[i] / 255;
      }
    } else {
      parsed = fromString(color).map(($) => $ / 255);
      parsed.push(1);
    }
    colorCache[color] = parsed;
  }
  return colorCache[color];
};

class TileGL extends Backend {
  constructor() {
    super();
    this._uniforms = {};
    try {
      this._gl = this._initWebGL();
    } catch (e) {
      alert(e.message);
    }
  }
  static isSupported() {
    return !!document.createElement("canvas").getContext("webgl2", { preserveDrawingBuffer: true });
  }
  schedule(cb) {
    requestAnimationFrame(cb);
  }
  getContainer() {
    return this._gl.canvas;
  }
  setOptions(opts) {
    super.setOptions(opts);
    this._updateSize();
    let tileSet = this._options.tileSet;
    if (tileSet && "complete" in tileSet && !tileSet.complete) {
      tileSet.addEventListener("load", () => this._updateTexture(tileSet));
    } else {
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
      } else {
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
    for (let i = 0;i < chars.length; i++) {
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
    let canvas4 = this._gl.canvas;
    let rect = canvas4.getBoundingClientRect();
    x -= rect.left;
    y -= rect.top;
    x *= canvas4.width / rect.width;
    y *= canvas4.height / rect.height;
    if (x < 0 || y < 0 || x >= canvas4.width || y >= canvas4.height) {
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
    UNIFORMS.forEach((name) => this._uniforms[name] = gl.getUniformLocation(program, name));
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
var UNIFORMS = ["targetPosRel", "tilesetPosAbs", "tileSize", "targetSize", "colorize", "bg", "tint"];
var VS = `
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
var FS = `
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
var colorCache = {};

// node_modules/rot-js/lib/display/term.js
var clearToAnsi = function(bg) {
  return `\x1B[0;48;5;${termcolor(bg)}m\x1B[2J`;
};
var colorToAnsi = function(fg, bg) {
  return `\x1B[0;38;5;${termcolor(fg)};48;5;${termcolor(bg)}m`;
};
var positionToAnsi = function(x, y) {
  return `\x1B[${y + 1};${x + 1}H`;
};
var termcolor = function(color) {
  const SRC_COLORS = 256;
  const DST_COLORS = 6;
  const COLOR_RATIO = DST_COLORS / SRC_COLORS;
  let rgb = fromString(color);
  let r = Math.floor(rgb[0] * COLOR_RATIO);
  let g = Math.floor(rgb[1] * COLOR_RATIO);
  let b = Math.floor(rgb[2] * COLOR_RATIO);
  return r * 36 + g * 6 + b * 1 + 16;
};

class Term extends Backend {
  constructor() {
    super();
    this._offset = [0, 0];
    this._cursor = [-1, -1];
    this._lastColor = "";
  }
  schedule(cb) {
    setTimeout(cb, 1000 / 60);
  }
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
    let [x, y, ch, fg, bg] = data;
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
    if (clearBefore) {
      if (!ch) {
        ch = " ";
      }
    }
    if (!ch) {
      return;
    }
    let newColor = colorToAnsi(fg, bg);
    if (newColor !== this._lastColor) {
      process.stdout.write(newColor);
      this._lastColor = newColor;
    }
    if (ch != "\t") {
      let chars = [].concat(ch);
      process.stdout.write(chars[0]);
    }
    this._cursor[0]++;
    if (this._cursor[0] >= size[0]) {
      this._cursor[0] = 0;
      this._cursor[1]++;
    }
  }
  computeFontSize() {
    throw new Error("Terminal backend has no notion of font size");
  }
  eventToPosition(x, y) {
    return [x, y];
  }
  computeSize() {
    return [process.stdout.columns, process.stdout.rows];
  }
}

// node_modules/rot-js/lib/text.js
function tokenize(str, maxWidth) {
  let result = [];
  let offset = 0;
  str.replace(RE_COLORS, function(match, type, name, index) {
    let part2 = str.substring(offset, index);
    if (part2.length) {
      result.push({
        type: TYPE_TEXT,
        value: part2
      });
    }
    result.push({
      type: type == "c" ? TYPE_FG : TYPE_BG,
      value: name.trim()
    });
    offset = index + match.length;
    return "";
  });
  let part = str.substring(offset);
  if (part.length) {
    result.push({
      type: TYPE_TEXT,
      value: part
    });
  }
  return breakLines(result, maxWidth);
}
var breakLines = function(tokens, maxWidth) {
  if (!maxWidth) {
    maxWidth = Infinity;
  }
  let i = 0;
  let lineLength = 0;
  let lastTokenWithSpace = -1;
  while (i < tokens.length) {
    let token = tokens[i];
    if (token.type == TYPE_NEWLINE) {
      lineLength = 0;
      lastTokenWithSpace = -1;
    }
    if (token.type != TYPE_TEXT) {
      i++;
      continue;
    }
    while (lineLength == 0 && token.value.charAt(0) == " ") {
      token.value = token.value.substring(1);
    }
    let index = token.value.indexOf("\n");
    if (index != -1) {
      token.value = breakInsideToken(tokens, i, index, true);
      let arr = token.value.split("");
      while (arr.length && arr[arr.length - 1] == " ") {
        arr.pop();
      }
      token.value = arr.join("");
    }
    if (!token.value.length) {
      tokens.splice(i, 1);
      continue;
    }
    if (lineLength + token.value.length > maxWidth) {
      let index2 = -1;
      while (true) {
        let nextIndex = token.value.indexOf(" ", index2 + 1);
        if (nextIndex == -1) {
          break;
        }
        if (lineLength + nextIndex > maxWidth) {
          break;
        }
        index2 = nextIndex;
      }
      if (index2 != -1) {
        token.value = breakInsideToken(tokens, i, index2, true);
      } else if (lastTokenWithSpace != -1) {
        let token2 = tokens[lastTokenWithSpace];
        let breakIndex = token2.value.lastIndexOf(" ");
        token2.value = breakInsideToken(tokens, lastTokenWithSpace, breakIndex, true);
        i = lastTokenWithSpace;
      } else {
        token.value = breakInsideToken(tokens, i, maxWidth - lineLength, false);
      }
    } else {
      lineLength += token.value.length;
      if (token.value.indexOf(" ") != -1) {
        lastTokenWithSpace = i;
      }
    }
    i++;
  }
  tokens.push({ type: TYPE_NEWLINE });
  let lastTextToken = null;
  for (let i2 = 0;i2 < tokens.length; i2++) {
    let token = tokens[i2];
    switch (token.type) {
      case TYPE_TEXT:
        lastTextToken = token;
        break;
      case TYPE_NEWLINE:
        if (lastTextToken) {
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
  tokens.pop();
  return tokens;
};
var breakInsideToken = function(tokens, tokenIndex, breakIndex, removeBreakChar) {
  let newBreakToken = {
    type: TYPE_NEWLINE
  };
  let newTextToken = {
    type: TYPE_TEXT,
    value: tokens[tokenIndex].value.substring(breakIndex + (removeBreakChar ? 1 : 0))
  };
  tokens.splice(tokenIndex + 1, 0, newBreakToken, newTextToken);
  return tokens[tokenIndex].value.substring(0, breakIndex);
};
var RE_COLORS = /%([bc]){([^}]*)}/g;
var TYPE_TEXT = 0;
var TYPE_NEWLINE = 1;
var TYPE_FG = 2;
var TYPE_BG = 3;

// node_modules/rot-js/lib/constants.js
var DEFAULT_WIDTH = 80;
var DEFAULT_HEIGHT = 25;
var DIRS = {
  4: [[0, -1], [1, 0], [0, 1], [-1, 0]],
  8: [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]],
  6: [[-1, -1], [1, -1], [2, 0], [1, 1], [-1, 1], [-2, 0]]
};

// node_modules/rot-js/lib/display/display.js
var BACKENDS = {
  hex: Hex,
  rect: rect_default,
  tile: Tile,
  "tile-gl": TileGL,
  term: Term
};
var DEFAULT_OPTIONS = {
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
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
var Display = (() => {

  class Display2 {
    constructor(options = {}) {
      this._data = {};
      this._dirty = false;
      this._options = {};
      options = Object.assign({}, DEFAULT_OPTIONS, options);
      this.setOptions(options);
      this.DEBUG = this.DEBUG.bind(this);
      this._tick = this._tick.bind(this);
      this._backend.schedule(this._tick);
    }
    DEBUG(x, y, what) {
      let colors = [this._options.bg, this._options.fg];
      this.draw(x, y, null, null, colors[what % colors.length]);
    }
    clear() {
      this._data = {};
      this._dirty = true;
    }
    setOptions(options) {
      Object.assign(this._options, options);
      if (options.width || options.height || options.fontSize || options.fontFamily || options.spacing || options.layout) {
        if (options.layout) {
          let ctor = BACKENDS[options.layout];
          this._backend = new ctor;
        }
        this._backend.setOptions(this._options);
        this._dirty = true;
      }
      return this;
    }
    getOptions() {
      return this._options;
    }
    getContainer() {
      return this._backend.getContainer();
    }
    computeSize(availWidth, availHeight) {
      return this._backend.computeSize(availWidth, availHeight);
    }
    computeFontSize(availWidth, availHeight) {
      return this._backend.computeFontSize(availWidth, availHeight);
    }
    computeTileSize(availWidth, availHeight) {
      let width = Math.floor(availWidth / this._options.width);
      let height = Math.floor(availHeight / this._options.height);
      return [width, height];
    }
    eventToPosition(e) {
      let x, y;
      if ("touches" in e) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }
      return this._backend.eventToPosition(x, y);
    }
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
      }
      if (!this._dirty) {
        this._dirty = {};
      }
      this._dirty[key] = true;
    }
    drawOver(x, y, ch, fg, bg) {
      const key = `${x},${y}`;
      const existing = this._data[key];
      if (existing) {
        existing[2] = ch || existing[2];
        existing[3] = fg || existing[3];
        existing[4] = bg || existing[4];
      } else {
        this.draw(x, y, ch, fg, bg);
      }
    }
    drawText(x, y, text, maxWidth) {
      let fg = null;
      let bg = null;
      let cx = x;
      let cy = y;
      let lines = 1;
      if (!maxWidth) {
        maxWidth = this._options.width - x;
      }
      let tokens = tokenize(text, maxWidth);
      while (tokens.length) {
        let token = tokens.shift();
        switch (token.type) {
          case TYPE_TEXT:
            let isSpace = false, isPrevSpace = false, isFullWidth = false, isPrevFullWidth = false;
            for (let i = 0;i < token.value.length; i++) {
              let cc = token.value.charCodeAt(i);
              let c = token.value.charAt(i);
              if (this._options.layout === "term") {
                let cch = cc >> 8;
                let isCJK = cch === 17 || cch >= 46 && cch <= 159 || cch >= 172 && cch <= 215 || cc >= 43360 && cc <= 43391;
                if (isCJK) {
                  this.draw(cx + 0, cy, c, fg, bg);
                  this.draw(cx + 1, cy, "\t", fg, bg);
                  cx += 2;
                  continue;
                }
              }
              isFullWidth = cc > 65280 && cc < 65377 || cc > 65500 && cc < 65512 || cc > 65518;
              isSpace = c.charCodeAt(0) == 32 || c.charCodeAt(0) == 12288;
              if (isPrevFullWidth && !isFullWidth && !isSpace) {
                cx++;
              }
              if (isFullWidth && !isPrevSpace) {
                cx++;
              }
              this.draw(cx++, cy, c, fg, bg);
              isPrevSpace = isSpace;
              isPrevFullWidth = isFullWidth;
            }
            break;
          case TYPE_FG:
            fg = token.value || null;
            break;
          case TYPE_BG:
            bg = token.value || null;
            break;
          case TYPE_NEWLINE:
            cx = x;
            cy++;
            lines++;
            break;
        }
      }
      return lines;
    }
    _tick() {
      this._backend.schedule(this._tick);
      if (!this._dirty) {
        return;
      }
      if (this._dirty === true) {
        this._backend.clear();
        for (let id in this._data) {
          this._draw(id, false);
        }
      } else {
        for (let key in this._dirty) {
          this._draw(key, true);
        }
      }
      this._dirty = false;
    }
    _draw(key, clearBefore) {
      let data = this._data[key];
      if (data[4] != this._options.bg) {
        clearBefore = true;
      }
      this._backend.draw(data, clearBefore);
    }
  }
  Display2.Rect = rect_default;
  Display2.Hex = Hex;
  Display2.Tile = Tile;
  Display2.TileGL = TileGL;
  Display2.Term = Term;
  return Display2;
})();
var display_default = Display;
// node_modules/rot-js/lib/fov/fov.js
class FOV {
  constructor(lightPassesCallback, options = {}) {
    this._lightPasses = lightPassesCallback;
    this._options = Object.assign({ topology: 8 }, options);
  }
  _getCircle(cx, cy, r) {
    let result = [];
    let dirs, countFactor, startOffset;
    switch (this._options.topology) {
      case 4:
        countFactor = 1;
        startOffset = [0, 1];
        dirs = [
          DIRS[8][7],
          DIRS[8][1],
          DIRS[8][3],
          DIRS[8][5]
        ];
        break;
      case 6:
        dirs = DIRS[6];
        countFactor = 1;
        startOffset = [-1, 1];
        break;
      case 8:
        dirs = DIRS[4];
        countFactor = 2;
        startOffset = [-1, 1];
        break;
      default:
        throw new Error("Incorrect topology for FOV computation");
        break;
    }
    let x = cx + startOffset[0] * r;
    let y = cy + startOffset[1] * r;
    for (let i = 0;i < dirs.length; i++) {
      for (let j = 0;j < r * countFactor; j++) {
        result.push([x, y]);
        x += dirs[i][0];
        y += dirs[i][1];
      }
    }
    return result;
  }
}

// node_modules/rot-js/lib/fov/precise-shadowcasting.js
class PreciseShadowcasting extends FOV {
  compute(x, y, R, callback) {
    callback(x, y, 0, 1);
    if (!this._lightPasses(x, y)) {
      return;
    }
    let SHADOWS = [];
    let cx, cy, blocks, A1, A2, visibility;
    for (let r = 1;r <= R; r++) {
      let neighbors = this._getCircle(x, y, r);
      let neighborCount = neighbors.length;
      for (let i = 0;i < neighborCount; i++) {
        cx = neighbors[i][0];
        cy = neighbors[i][1];
        A1 = [i ? 2 * i - 1 : 2 * neighborCount - 1, 2 * neighborCount];
        A2 = [2 * i + 1, 2 * neighborCount];
        blocks = !this._lightPasses(cx, cy);
        visibility = this._checkVisibility(A1, A2, blocks, SHADOWS);
        if (visibility) {
          callback(cx, cy, r, visibility);
        }
        if (SHADOWS.length == 2 && SHADOWS[0][0] == 0 && SHADOWS[1][0] == SHADOWS[1][1]) {
          return;
        }
      }
    }
  }
  _checkVisibility(A1, A2, blocks, SHADOWS) {
    if (A1[0] > A2[0]) {
      let v1 = this._checkVisibility(A1, [A1[1], A1[1]], blocks, SHADOWS);
      let v2 = this._checkVisibility([0, 1], A2, blocks, SHADOWS);
      return (v1 + v2) / 2;
    }
    let index1 = 0, edge1 = false;
    while (index1 < SHADOWS.length) {
      let old = SHADOWS[index1];
      let diff = old[0] * A1[1] - A1[0] * old[1];
      if (diff >= 0) {
        if (diff == 0 && !(index1 % 2)) {
          edge1 = true;
        }
        break;
      }
      index1++;
    }
    let index2 = SHADOWS.length, edge2 = false;
    while (index2--) {
      let old = SHADOWS[index2];
      let diff = A2[0] * old[1] - old[0] * A2[1];
      if (diff >= 0) {
        if (diff == 0 && index2 % 2) {
          edge2 = true;
        }
        break;
      }
    }
    let visible = true;
    if (index1 == index2 && (edge1 || edge2)) {
      visible = false;
    } else if (edge1 && edge2 && index1 + 1 == index2 && index2 % 2) {
      visible = false;
    } else if (index1 > index2 && index1 % 2) {
      visible = false;
    }
    if (!visible) {
      return 0;
    }
    let visibleLength;
    let remove = index2 - index1 + 1;
    if (remove % 2) {
      if (index1 % 2) {
        let P = SHADOWS[index1];
        visibleLength = (A2[0] * P[1] - P[0] * A2[1]) / (P[1] * A2[1]);
        if (blocks) {
          SHADOWS.splice(index1, remove, A2);
        }
      } else {
        let P = SHADOWS[index2];
        visibleLength = (P[0] * A1[1] - A1[0] * P[1]) / (A1[1] * P[1]);
        if (blocks) {
          SHADOWS.splice(index1, remove, A1);
        }
      }
    } else {
      if (index1 % 2) {
        let P1 = SHADOWS[index1];
        let P2 = SHADOWS[index2];
        visibleLength = (P2[0] * P1[1] - P1[0] * P2[1]) / (P1[1] * P2[1]);
        if (blocks) {
          SHADOWS.splice(index1, remove);
        }
      } else {
        if (blocks) {
          SHADOWS.splice(index1, remove, A1, A2);
        }
        return 1;
      }
    }
    let arcLength = (A2[0] * A1[1] - A1[0] * A2[1]) / (A1[1] * A2[1]);
    return visibleLength / arcLength;
  }
}
// node_modules/rot-js/lib/noise/simplex.js
var F2 = 0.5 * (Math.sqrt(3) - 1);
var G2 = (3 - Math.sqrt(3)) / 6;
// src/tile/tile.ts
class Tile2 {
  char;
  walkable;
  blockFoV;
  constructor(char, walkable, blockFoV) {
    this.char = char;
    this.walkable = walkable;
    this.blockFoV = blockFoV;
  }
}

// src/tile/tileFactory.ts
var tileFactory = {};
tileFactory.floor = new Tile2(".", true, false);
tileFactory.decoratedFloor = new Tile2(",", true, false);
tileFactory.wall = new Tile2("#", false, true);
tileFactory.tombstone = new Tile2("T", false, true);
tileFactory.grave = new Tile2("t", false, true);
tileFactory.anvil = new Tile2("X", false, true);
tileFactory.bottomMiddleWall = new Tile2("~", false, true);
tileFactory.downStairs = new Tile2(">", false, false);
tileFactory.forwardSlash = new Tile2("/", false, true);
tileFactory.backwardSlash = new Tile2("\\", false, true);
tileFactory.altarWall = new Tile2("g", false, true);
tileFactory.altarWallSolved = new Tile2("G", false, true);
tileFactory.openedChest = new Tile2("c", false, false);
var tileFactory_default = tileFactory;

// src/utility/error.ts
function assert(condition) {
  if (!condition) {
    console.error("Assertion fail!");
    console.trace();
  }
}

// src/utility/renderOrder.ts
var RenderOrder;
(function(RenderOrder2) {
  RenderOrder2[RenderOrder2["Corpse"] = 0] = "Corpse";
  RenderOrder2[RenderOrder2["Item"] = 1] = "Item";
  RenderOrder2[RenderOrder2["Actor"] = 2] = "Actor";
})(RenderOrder || (RenderOrder = {}));

// src/utility/distance.ts
function euclideanDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

// src/utility/colors.ts
var colorError = "rgba(255,40,40,1)";
var colorWhite = "rgba(255,255,255,1)";
var colorBlack = "rgba(0,0,0,1)";
var colorDarkGray = "rgba(70,70,70,1)";
var colorLightGray = "rgba(169,169,169,1)";
var colorYellow = "rgba(253,164,15,1)";
var colorRed = "rgba(255,0,0,1)";
var colorGreen = "rgba(0,255,0,1)";
var colorTransparent = "rgba(0,0,0,0)";
var colorEnemy = "rgba(204,0,0,1)";
var colorViolet = "rgba(238,130,238,1)";
var colorPotion = "rgba(143,255,146,1)";
var colorStunScroll = "rgba(158, 173, 200, 1)";
var colorConfusionScroll = "rgba(64,224,208,1)";
var colorLightningScroll = "rgba(80,200,255,1)";

// src/entity/entity.ts
class Entity {
  id;
  pos;
  name;
  blocksMovement;
  char;
  fg;
  bg;
  renderOrder;
  constructor(pos, name = "Unknown", blocksMovement = false, char = "?", fg = colorWhite, bg = colorBlack, renderOrder2 = RenderOrder.Corpse) {
    this.id = -1;
    this.pos = pos.copy();
    this.name = name;
    this.blocksMovement = blocksMovement;
    this.char = char;
    this.fg = fg;
    this.bg = bg;
    this.renderOrder = renderOrder2;
    assert(this.char.length === 1);
  }
  move(dPos) {
    this.pos.x += dPos.x;
    this.pos.y += dPos.y;
  }
  render(display, playerPos, midX, midY, visibility, maxDist) {
    const x = midX + this.pos.x - playerPos.x;
    const y = midY + this.pos.y - playerPos.y;
    if (playerPos.equals(this.pos)) {
      display.draw(x, y, this.char, colorTransparent, "rgba(234,165,108,1");
    } else {
      const dist = playerPos.unSquaredEuclideanDistance(this.pos);
      const M = dist / maxDist;
      const fg = `rgba(0,0,0,${M})`;
      const bg = interpolate([234, 165, 108], [0, 0, 0], M);
      const bgRGBA = `rgba(${bg[0]},${bg[1]},${bg[2]},${1 - M})`;
      display.draw(x, y, this.char, fg, bgRGBA);
    }
  }
  euclideanDistance(pos) {
    return euclideanDistance(this.pos.x, this.pos.y, pos.x, pos.y);
  }
}

// src/action/passAction.ts
class PassAction {
  execute(actor, engine) {
    return false;
  }
}

// src/behavior/emptyBehavior.ts
class EmptyBehavior {
  act(actor, map8) {
    return [new PassAction, false];
  }
}

// src/utility/messageLog.ts
class Message {
  text;
  color;
  count;
  constructor(text, color2) {
    this.text = text;
    this.color = color2;
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
  static messages = [];
  static clear() {
    this.messages = [];
    let messages = document.querySelector("#messages");
    messages.innerHTML = "";
  }
  static addMessage(text, color2, stack) {
    const len = MessageLog.messages.length;
    if (stack && len > 0 && MessageLog.messages[len - 1].sameText(text)) {
      MessageLog.messages[len - 1].incrementCount();
    } else {
      MessageLog.messages.push(new Message(text, color2));
    }
    MessageLog.print();
  }
  static addErrorMessage(text, stack) {
    MessageLog.addMessage(text, colorError, stack);
  }
  static print() {
    const maxLines = 5;
    const len = MessageLog.messages.length;
    let messages = document.querySelector("#messages");
    let lines = [];
    for (var i = 0;i < len; ++i) {
      const message = MessageLog.messages[len - 1 - i];
      lines.push(message.getText());
      if (lines.length > maxLines) {
        break;
      }
    }
    messages.innerHTML = lines.join("\n");
  }
}

// src/component/baseComponent.ts
class BaseComponent {
  parent;
  constructor(parent) {
    this.parent = parent;
  }
}

// src/component/inventoryComponent.ts
class InventoryComponent extends BaseComponent {
  capacity;
  items;
  constructor(parent, capacity) {
    super(parent);
    this.capacity = capacity;
    this.items = [];
  }
  addItem(item) {
    if (this.items.length >= this.capacity) {
      MessageLog.addErrorMessage("Inventory full.", true);
      return false;
    }
    this.items.push(item);
    return true;
  }
  drop(item, actor, map8) {
    if (item.id !== -1) {
      this.items.splice(item.id, 1);
      item.pos.x = actor.pos.x;
      item.pos.y = actor.pos.y;
      map8.addItem(item);
    } else {
      MessageLog.addErrorMessage(`${item.name} had invalid id of -1. Contact admin.`, true);
    }
  }
  getCount(name) {
    let count = 0;
    for (let item of this.items) {
      count += Number(item.name == name);
    }
    return count;
  }
  destroyItemsWithName(name) {
    this.items = this.items.filter((i) => {
      return i.name !== name;
    });
  }
  destroyItemWithID(id) {
    this.items = this.items.filter((item) => {
      return item.id !== id;
    });
  }
}

// src/entity/actor.ts
class Actor extends Entity {
  behavior;
  inventory;
  constructor(pos, name = "Unknown Actor", blocksMovement = false, char = "?", fg = colorWhite, bg = colorBlack, renderOrder3 = RenderOrder.Corpse, behavior = new EmptyBehavior, inventorySize = 20) {
    super(pos, name, blocksMovement, char, fg, bg, renderOrder3);
    this.behavior = behavior;
    this.inventory = new InventoryComponent(this, inventorySize);
  }
  act(map8) {
    let [action2, requestAnotherTurn] = this.behavior.act(this, map8);
    let requestRender = false;
    if (action2 !== undefined) {
      requestRender = action2.execute(this, map8);
    }
    return [requestAnotherTurn, requestRender];
  }
}

// src/entity/names.ts
var nameAltar = "Altar";
var nameEnemy = "Scary Enemy";
var namePlayer = "You";
var nameMauledCorpse = "Mauled Corpse";
var nameLightningCorpse = "Charred Corpse";
var namePotion = "Potion";
var nameStunScroll = "Stun Scroll";
var nameConfusionScroll = "Confusion Scroll";
var nameLightningScroll = "Lightning Scroll";
var nameReturnToAltarScroll = "Return to Altar Scroll";

// src/utility/point.ts
class Point {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  copy() {
    return new Point(this.x, this.y);
  }
  add(other) {
    return new Point(this.x + other.x, this.y + other.y);
  }
  addScalar(n) {
    this.x += n;
    this.y += n;
  }
  subtract(other) {
    return new Point(this.x - other.y, this.y - other.y);
  }
  subtractScalar(n) {
    this.x -= n;
    this.y -= n;
  }
  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
  euclideanDistance(other) {
    return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
  }
  unSquaredEuclideanDistance(other) {
    return Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2);
  }
  manhattanDistance(other) {
    return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
  }
}

// src/utility/sound.ts
class Sound {
  static sounds = [];
  static numSounds = 0;
  static init() {
    this.sounds.push(new Audio("assets/thunder.wav"));
    this.sounds.push(new Audio("assets/teleport_sound.mp3"));
    this.sounds.push(new Audio("assets/game_start.wav"));
    this.sounds.push(new Audio("assets/unlock_altar.wav"));
    this.sounds.push(new Audio("assets/enemyKillEnemySound.wav"));
    this.sounds.push(new Audio("assets/stun_sound.wav"));
    this.sounds.push(new Audio("assets/confusion_sound.wav"));
    this.sounds.push(new Audio("assets/chest_open_1.wav"));
    this.sounds.push(new Audio("assets/chest_open_2.wav"));
    this.numSounds = this.sounds.length;
  }
  static isLoaded() {
    for (let i = 0;i < this.numSounds; ++i) {
      if (!this.sounds[i].readyState) {
        return false;
      }
    }
    return true;
  }
  static playThunder() {
    this.sounds[0].currentTime = 0.15;
    this.sounds[0].play();
  }
  static playTeleport() {
    this.sounds[1].currentTime = 0.2;
    this.sounds[1].play();
  }
  static playGameStart() {
    this.sounds[2].currentTime = 0.1;
    this.sounds[2].play();
  }
  static playUnlockAltar() {
    this.sounds[3].currentTime = 0.05;
    this.sounds[3].play();
  }
  static playEnemyKillEnemy() {
    this.sounds[4].currentTime = 0.1;
    this.sounds[4].play();
  }
  static playStun() {
    this.sounds[5].currentTime = 0.05;
    this.sounds[5].play();
  }
  static playConfusion() {
    this.sounds[6].currentTime = 0.05;
    this.sounds[6].play();
  }
  static playChestOpen() {
    if (Math.random() <= 0.5) {
      this.sounds[7].currentTime = 0;
      this.sounds[7].play();
    } else {
      this.sounds[8].currentTime = 0;
      this.sounds[8].play();
    }
  }
}

// src/action/action.ts
class Action2 {
}

// src/action/altarAction.ts
class AltarAction extends Action2 {
  altar;
  constructor(altar) {
    super();
    this.altar = altar;
  }
  unlockAltar(actor, map8) {
    const requiredPotionCount = map8.requiredPotions();
    const playerPotionCount = actor.inventory.getCount(namePotion);
    const shouldRender = playerPotionCount == requiredPotionCount;
    if (shouldRender) {
      Sound.playUnlockAltar();
      map8.altar().char = "A";
      let pos = map8.altar().pos.copy();
      pos.y--;
      map8.setTile(pos, tileFactory_default.altarWallSolved);
      MessageLog.addMessage("The fountain filled up!", colorGreen, false);
      MessageLog.addMessage("In the distance, you hear a door open...", colorWhite, false);
      MessageLog.addErrorMessage("There is no door... Nothing opened up, step through the fountain", true);
      this.altar.fg = colorGreen;
      this.altar.bg = colorLightGray;
      actor.inventory.destroyItemsWithName(namePotion);
    } else {
      const left = requiredPotionCount - actor.inventory.getCount(namePotion);
      let m;
      if (left === 1) {
        m = `The fountain seems empty. It looks like it would take a potion more to fill it.`;
      } else {
        m = `The fountain seems empty. It looks like it would take ${left} potions to fill it.`;
      }
      MessageLog.addMessage(m, colorLightGray, true);
    }
    return shouldRender;
  }
  stepThroughAltar(actor, map8) {
    Sound.playGameStart();
    MessageLog.addMessage("You step into the next level of the prison...", colorWhite, false);
    map8.markLevelComplete();
    return true;
  }
  execute(actor, map8) {
    if (actor.name !== namePlayer) {
      return false;
    }
    if (this.altar.fg === colorGreen) {
      return this.stepThroughAltar(actor, map8);
    } else {
      return this.unlockAltar(actor, map8);
    }
  }
}

// src/utility/pathfinding.ts
function bfs(start, target, map8) {
  let frontier = [[start, []]];
  let seen = new Seen;
  while (frontier.length > 0) {
    let [point2, moves] = frontier.shift();
    if (seen.has(point2)) {
      continue;
    } else {
      seen.add(point2);
    }
    let m;
    for (let i = 0;i < MOVES_LENGTH; ++i) {
      m = MOVES[i];
      let newPos = point2.add(m);
      if (newPos.equals(target)) {
        moves.push(m);
        return moves;
      }
      if (map8.isWalkable(newPos)) {
        let newMoves = [...moves];
        newMoves.push(m);
        frontier.push([newPos, newMoves]);
      }
    }
  }
  return [];
}
var MOVES = [
  new Point(1, 0),
  new Point(0, 1),
  new Point(0, -1),
  new Point(-1, 0)
];
var MOVES_LENGTH = MOVES.length;

class Seen {
  values = [];
  add(p) {
    this.values.push(p);
  }
  has(p) {
    const size = this.values.length;
    for (let i = 0;i < size; ++i) {
      if (this.values[i].equals(p)) {
        return true;
      }
    }
    return false;
  }
}

// src/behavior/aiBehavior.ts
class AIBehavior {
  startPos;
  constructor(startPos) {
    this.startPos = startPos.copy();
  }
  act(actor, map8) {
    if (actor.euclideanDistance(this.startPos) <= 3 && actor.euclideanDistance(map8.player().pos) <= 3) {
      return this.moveTowardsPlayer(map8.player().pos.x, map8.player().pos.y, actor);
    } else if (!actor.pos.equals(this.startPos)) {
      return this.moveBackToStart(actor, map8);
    }
    return [new PassAction, false];
  }
  moveTowardsPlayer(targetX, targetY, actor) {
    const moves = this.getMoves(actor.pos.x, actor.pos.y, targetX, targetY);
    if (moves.length === 0) {
      return [new PassAction, false];
    }
    let closestVal = 1e4;
    let closestIndex = -1;
    for (let i = 0;i < moves.length; ++i) {
      const newX = actor.pos.x + moves[i][0];
      const newY = actor.pos.y + moves[i][1];
      const dist = euclideanDistance(newX, newY, targetX, targetY);
      if (dist < closestVal) {
        closestVal = dist;
        closestIndex = i;
      }
    }
    return [new BumpAction(new Point(moves[closestIndex][0], moves[closestIndex][1])), false];
  }
  moveBackToStart(actor, map8) {
    const path3 = bfs(actor.pos, this.startPos, map8);
    if (path3.length === 0) {
      return [new PassAction, false];
    }
    return [new BumpAction(path3[0]), false];
  }
  getMoves(x1, y1, x2, y2) {
    let moves = [];
    const diffX = x1 - x2;
    const diffY = y1 - y2;
    if (diffX === 0 && diffY === 0) {
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
    } else if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0)
        moves.push([-1, 0]);
      else if (diffX < 0)
        moves.push([1, 0]);
      if (diffY > 0)
        moves.push([0, -1]);
      else if (diffY < 0)
        moves.push([0, 1]);
    } else if ((diffX + diffY) % 2 == 0) {
      if (diffY > 0)
        moves.push([0, -1]);
      else if (diffY < 0)
        moves.push([0, 1]);
      if (diffX > 0)
        moves.push([-1, 0]);
      else if (diffX < 0)
        moves.push([1, 0]);
    } else {
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

// src/entity/item.ts
class Item extends Entity {
  id;
  onConsume;
  constructor(pos, name = "Unknown Item", blocksMovement = false, char = "?", fg = colorWhite, bg = colorBlack, renderOrder4 = RenderOrder.Corpse, onConsume, id = -1) {
    super(pos, name, blocksMovement, char, fg, bg, renderOrder4);
    this.id = id;
    this.onConsume = onConsume;
  }
}

// src/config.ts
class Config {
  static width = 35;
  static height = 20;
  static padding = 7;
  static sightRadius = 6;
  static screenWidth = 800;
  static screenHeight = 600;
  static canvasOffsetLeft = 0;
  static canvasOffsetTop = 0;
  static tileWidth = 10;
  static tileHeight = 8;
}

// src/game/inputManager.ts
var Key;
(function(Key2) {
  Key2[Key2["LEFT"] = 0] = "LEFT";
  Key2[Key2["RIGHT"] = 1] = "RIGHT";
  Key2[Key2["DOWN"] = 2] = "DOWN";
  Key2[Key2["UP"] = 3] = "UP";
  Key2[Key2["A"] = 4] = "A";
  Key2[Key2["D"] = 5] = "D";
  Key2[Key2["E"] = 6] = "E";
  Key2[Key2["G"] = 7] = "G";
  Key2[Key2["H"] = 8] = "H";
  Key2[Key2["I"] = 9] = "I";
  Key2[Key2["Q"] = 10] = "Q";
  Key2[Key2["R"] = 11] = "R";
  Key2[Key2["S"] = 12] = "S";
  Key2[Key2["W"] = 13] = "W";
  Key2[Key2["SPACE"] = 14] = "SPACE";
  Key2[Key2["ESCAPE"] = 15] = "ESCAPE";
  Key2[Key2["ENTER"] = 16] = "ENTER";
  Key2[Key2["INVALID"] = 17] = "INVALID";
})(Key || (Key = {}));

class InputManager {
  static _keys = [];
  static mousePosition = new Point(0, 0);
  static init() {
    for (let i = 0;i < Object.keys(Key).length; ++i) {
      InputManager._keys.push(false);
    }
    window.addEventListener("keydown", InputManager.onKeyDown);
    window.addEventListener("keyup", InputManager.onKeyUp);
    window.addEventListener("mousemove", (ev) => {
      this.mousePosition.x = ev.clientX - Config.canvasOffsetLeft;
      this.mousePosition.y = ev.clientY - Config.canvasOffsetTop;
    });
  }
  static isKeyDown(...keys) {
    const size = keys.length;
    for (let i = 0;i < size; ++i) {
      if (InputManager._keys[keys[i]]) {
        return true;
      }
    }
    return false;
  }
  static keyStrToKey(key) {
    switch (key) {
      case "Down":
      case "ArrowDown":
        return Key.DOWN;
      case "Up":
      case "ArrowUp":
        return Key.UP;
      case "Right":
      case "ArrowRight":
        return Key.RIGHT;
      case "Left":
      case "ArrowLeft":
        return Key.LEFT;
      case " ":
      case "Space":
        return Key.SPACE;
      case "Escape":
        return Key.ESCAPE;
      case "a":
        return Key.A;
      case "e":
        return Key.E;
      case "s":
        return Key.S;
      case "d":
        return Key.D;
      case "w":
        return Key.W;
      case "r":
        return Key.R;
      case "q":
        return Key.Q;
      case "g":
        return Key.G;
      case "h":
        return Key.H;
      case "i":
        return Key.I;
      case "Enter":
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
    for (let i = 0;i < InputManager._keys.length; ++i) {
      InputManager._keys[i] = false;
    }
  }
  static onMouseMove(ev) {
  }
}

// src/animation/animationManager.ts
class AnimationManager {
  static animation = null;
  static shouldRender = false;
  static shouldComputeFOV = false;
  static getShouldRender() {
    const temp = this.shouldRender;
    this.shouldRender = false;
    return temp;
  }
  static requestRender() {
    this.shouldRender = true;
  }
  static setAnimation(animation) {
    this.animation = animation;
  }
  static animationIsRunning() {
    return this.animation !== null;
  }
  static update(dt, ctx) {
    AnimationManager.shouldComputeFOV = false;
    if (this.animation !== null && this.animation.update(dt, ctx)) {
      this.animation = null;
      InputManager.clear();
    }
  }
}

// src/animation/animation.ts
class Animation {
  onComplete;
  constructor(onCompleteCallback) {
    this.onComplete = onCompleteCallback;
  }
  update(dt, ctx) {
    if (this.animationUpdate(dt, ctx)) {
      this.onComplete();
      return true;
    }
    return false;
  }
}

// src/animation/lightningAnimation.ts
class LightningAnimation extends Animation {
  elapsed = 0;
  lightningAnimationTime = 0.25;
  flashAnimationTime = 0.55;
  lightningPath = [];
  playedSound = false;
  constructor(target, playerPosition, onCompleteCallback) {
    super(onCompleteCallback);
    target = target.copy();
    target.x = (Math.round(Config.width / 2) + target.x - playerPosition.x) * Config.tileWidth + Config.tileWidth / 2;
    target.y = (Math.round(Config.height / 2) + target.y - playerPosition.y) * Config.tileHeight + Config.tileHeight / 2;
    const SIZE = 2;
    this.lightningPath.push(target);
    let turnedLeft = false;
    let turnedRight = false;
    while (target.y > 0) {
      target = target.copy();
      if (turnedLeft) {
        if (target.x > SIZE && Math.random() < 0.5) {
          target.x -= SIZE;
        } else {
          target.y -= SIZE;
          turnedLeft = false;
        }
      } else if (turnedRight) {
        if (target.x < Config.width - SIZE && Math.random() < 0.5) {
          target.x += SIZE;
        } else {
          target.y -= SIZE;
          turnedRight = false;
        }
      } else {
        const r = Math.random();
        if (target.x > SIZE && r < 0.33) {
          target.x -= SIZE;
          turnedLeft = true;
        } else if (target.x < Config.screenWidth - SIZE && r < 0.66) {
          target.x += SIZE;
          turnedRight = true;
        } else {
          target.y -= SIZE;
        }
      }
      this.lightningPath.push(target);
    }
  }
  animationUpdate(dt, ctx) {
    this.elapsed += dt;
    ctx.strokeStyle = colorLightningScroll;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.lightningPath[0].x, this.lightningPath[0].y);
    if (!this.playedSound) {
      Sound.playThunder();
      this.playedSound = true;
    }
    if (this.elapsed < this.lightningAnimationTime) {
      ctx.strokeStyle = colorWhite;
      for (let i = 1;i < this.lightningPath.length; ++i) {
        ctx.lineTo(this.lightningPath[i].x, this.lightningPath[i].y);
      }
      ctx.stroke();
      ctx.closePath();
      return false;
    }
    if (this.elapsed < this.lightningAnimationTime + this.flashAnimationTime) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${1 - this.elapsed / (this.lightningAnimationTime + this.flashAnimationTime)})`;
      for (let i = 1;i < this.lightningPath.length; ++i) {
        ctx.lineTo(this.lightningPath[i].x, this.lightningPath[i].y);
      }
      ctx.stroke();
      ctx.closePath();
      return false;
    }
    return true;
  }
}

// src/action/lightningAction.ts
class LightningAction extends Action2 {
  constructor() {
    super(...arguments);
  }
  execute(actor, map8) {
    const a = map8.nearestActorInVision(actor.pos);
    if (a === null) {
      MessageLog.addMessage(`You don't see anything to strike with your ${nameLightningScroll}.`, colorLightGray, true);
      return false;
    }
    if (a.name === nameAltar) {
      let l = new LightningAnimation(a.pos, map8.player().pos, () => {
        MessageLog.addMessage(`The lightning struck the altar! But, it didn't do anything. Maybe find the potions.`, colorLightGray, true);
      });
      AnimationManager.setAnimation(l);
      return true;
    }
    if (map8.positionVisible(a.pos)) {
      map8.removeActor(a);
      spawnCorpse(map8, a.pos, nameLightningCorpse);
      AnimationManager.requestRender();
      let l = new LightningAnimation(a.pos, map8.player().pos, () => {
        MessageLog.addMessage(`${a.name} was slain by lightning!`, colorLightningScroll, false);
      });
      AnimationManager.setAnimation(l);
      return true;
    }
    MessageLog.addMessage(`You don't see anything to strike with your ${nameLightningScroll}.`, colorLightGray, true);
    return false;
  }
}

// src/animation/returnToAltarAnimation.ts
class ReturnToAltarAnimation extends Animation {
  middleCallback;
  animationTime = 0;
  totalAnimationTime = 0.8;
  constructor(middleCallback, onCompleteCallback) {
    super(onCompleteCallback);
    this.middleCallback = middleCallback;
    Sound.playTeleport();
  }
  animationUpdate(dt, ctx) {
    if (this.animationTime >= this.totalAnimationTime) {
      return true;
    }
    this.animationTime += dt;
    const x = this.animationTime / this.totalAnimationTime;
    const opacity = -Math.pow(2 * x - 1, 2) + 1;
    if (this.middleCallback !== null && x >= 0.49 && x <= 0.51) {
      this.middleCallback();
      AnimationManager.shouldComputeFOV = true;
      this.middleCallback = null;
    }
    ctx.beginPath();
    ctx.strokeStyle = `rgba(0,0,0,${opacity})`;
    ctx.fillStyle = `rgba(0,0,0,${opacity})`;
    ctx.fillRect(0, 0, Config.screenWidth, Config.screenHeight);
    ctx.stroke();
    return false;
  }
}

// src/action/returnToAltarAction.ts
class ReturnToAltarAction extends Action2 {
  constructor() {
    super(...arguments);
  }
  execute(actor, map8) {
    MessageLog.addMessage("You activated the scroll...", colorViolet, false);
    AnimationManager.setAnimation(new ReturnToAltarAnimation(() => {
      actor.pos = map8.altar().pos.copy();
      ++actor.pos.y;
    }, () => {
      AnimationManager.requestRender();
      MessageLog.addMessage("You teleported back to the altar!", colorViolet, false);
    }));
    return true;
  }
}

// src/animation/stunAnimation.ts
class StunAnimation extends Animation {
  elapsed = 0;
  animationTime = 0.3;
  start;
  end;
  constructor(playerPosition, target, onCompleteCallback) {
    super(onCompleteCallback);
    this.start = new Point((Math.round(Config.width / 2) + target.x - playerPosition.x) * Config.tileWidth + Config.tileWidth / 2, (Math.round(Config.height / 2) + target.y - playerPosition.y) * Config.tileHeight + Config.tileHeight / 2);
    this.end = new Point(Math.round(Config.width / 2) * Config.tileWidth + Config.tileWidth / 2, Math.round(Config.height / 2) * Config.tileHeight + Config.tileHeight / 2);
    Sound.playStun();
  }
  animationUpdate(dt, ctx) {
    this.elapsed += dt;
    ctx.lineWidth = 4;
    ctx.strokeStyle = `rgba(255, 255, 255, 1)`;
    ctx.beginPath();
    ctx.lineTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
    return this.elapsed > this.animationTime;
  }
}

// src/behavior/stunBehavior.ts
class StunBehavior {
  previousBehavior;
  previousBGColor;
  stunDuration;
  constructor(actor, stunDuration) {
    this.previousBehavior = actor.behavior;
    this.previousBGColor = actor.bg;
    this.stunDuration = stunDuration;
    actor.behavior = this;
    actor.bg = colorStunScroll;
  }
  act(actor, map8) {
    if (this.stunDuration <= 0) {
      actor.behavior = this.previousBehavior;
      actor.bg = this.previousBGColor;
      return actor.behavior.act(actor, map8);
    }
    this.stunDuration--;
    return [new PassAction, false];
  }
}

// src/action/stunAction.ts
class StunAction extends Action2 {
  constructor() {
    super(...arguments);
  }
  execute(actor, map8) {
    const a = map8.nearestActorInVision(actor.pos);
    if (a === null) {
      MessageLog.addMessage(`You don't see anything to strike with your ${nameStunScroll}.`, colorStunScroll, true);
      return false;
    }
    if (a.name === nameAltar) {
      MessageLog.addMessage(`The ${nameStunScroll} doesn't effect the ${nameAltar}!`, colorStunScroll, true);
      return false;
    }
    new StunBehavior(a, 4);
    let animation4 = new StunAnimation(map8.player().pos, a.pos, () => {
    });
    AnimationManager.setAnimation(animation4);
    return true;
  }
}

// src/animation/confusionAnimation.ts
class ConfusionAnimation extends Animation {
  elapsed = 0;
  animationTime = 0.5;
  start;
  constructor(playerPosition, target, onCompleteCallback) {
    super(onCompleteCallback);
    this.start = new Point((Math.round(Config.width / 2) + target.x - playerPosition.x) * Config.tileWidth + Config.tileWidth / 2, (Math.round(Config.height / 2) + target.y - playerPosition.y) * Config.tileHeight + Config.tileHeight / 2);
    Sound.playConfusion();
  }
  animationUpdate(dt, ctx) {
    this.elapsed += dt;
    const temp = ctx.font;
    ctx.font = `${Math.round(42 * this.elapsed / this.animationTime)}px serif`;
    ctx.fillStyle = colorConfusionScroll;
    ctx.fillText("?", this.start.x + Config.tileWidth, this.start.y, 100);
    ctx.fillText("?", this.start.x - Config.tileWidth, this.start.y, 100);
    ctx.fillText("?", this.start.x, this.start.y - Config.tileHeight, 100);
    ctx.font = temp;
    return this.elapsed > this.animationTime;
  }
}

// src/utility/random.ts
function choice(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// src/behavior/confusionBehavior.ts
class ConfusionBehavior {
  previousBehavior;
  previousBGColor;
  duration;
  constructor(actor, duration) {
    this.previousBehavior = actor.behavior;
    this.previousBGColor = actor.bg;
    this.duration = duration;
    actor.behavior = this;
    actor.bg = colorConfusionScroll;
  }
  act(actor, map8) {
    if (this.duration <= 0) {
      actor.behavior = this.previousBehavior;
      actor.bg = this.previousBGColor;
      return actor.behavior.act(actor, map8);
    }
    this.duration--;
    const actions = [
      [new BumpAction(new Point(0, 1)), false],
      [new BumpAction(new Point(0, -1)), false],
      [new BumpAction(new Point(1, 0)), false],
      [new BumpAction(new Point(-1, 0)), false],
      [new PassAction, false]
    ];
    return choice(actions);
  }
}

// src/action/confusionScrollAction.ts
class ConfusionScrollAction extends Action2 {
  constructor() {
    super(...arguments);
  }
  execute(actor, map8) {
    const a = map8.nearestActorInVision(actor.pos);
    if (a === null) {
      MessageLog.addMessage(`You don't see anything to confuse with your ${nameConfusionScroll}.`, colorConfusionScroll, true);
      return false;
    }
    if (a.name === nameAltar) {
      MessageLog.addMessage(`The ${nameConfusionScroll} doesn't effect the ${nameAltar}!`, colorConfusionScroll, true);
      return false;
    }
    new ConfusionBehavior(a, 6);
    let animation5 = new ConfusionAnimation(map8.player().pos, a.pos, () => {
    });
    AnimationManager.setAnimation(animation5);
    return true;
  }
}

// src/entity/entityFactory.ts
function spawnCorpse(map8, pos, name) {
  const corpse = new Entity(pos, name, false, "%", colorRed, colorTransparent, RenderOrder.Corpse);
  map8.addEntity(corpse);
  return corpse;
}
function spawnPlayer(map8, pos) {
  map8.player().pos = pos;
  map8.player().id = 0;
  return map8.player();
}
function spawnEnemy(map8, pos) {
  let enemy = new Actor(pos);
  enemy.name = nameEnemy;
  enemy.char = "E";
  enemy.fg = colorEnemy;
  enemy.bg = colorTransparent;
  enemy.behavior = new AIBehavior(pos);
  map8.addActor(enemy);
  return enemy;
}
function spawnAltar(map8, pos) {
  map8.altar().char = "a";
  map8.altar().pos = pos;
  map8.altar().fg = colorDarkGray;
  map8.altar().bg = colorTransparent;
  map8.altar().behavior = new EmptyBehavior;
  const gargoylePosition = pos.copy();
  gargoylePosition.y--;
  map8.setTile(gargoylePosition, tileFactory_default.altarWall);
  return map8.altar();
}
function spawnPotion(map8, pos) {
  let portion = new Item(pos, namePotion, true, "s", colorPotion, colorTransparent, RenderOrder.Item, (map9, actor2) => {
    MessageLog.addMessage(`The potion is scary.`, colorPotion, true);
    return false;
  });
  map8.addItem(portion);
  return portion;
}
function spawnLightningScroll(map8, pos) {
  let scroll = new Item(pos, nameLightningScroll, true, "s", colorLightningScroll, colorTransparent, RenderOrder.Item, (map9, actor2) => {
    return new LightningAction().execute(actor2, map9);
  });
  map8.addItem(scroll);
  return scroll;
}
function spawnReturnToAltarScroll(map8, pos) {
  let scroll = new Item(pos, nameReturnToAltarScroll, true, "s", colorViolet, colorBlack, RenderOrder.Item, (map9, actor2) => {
    return new ReturnToAltarAction().execute(actor2, map9);
  });
  map8.addItem(scroll);
  return scroll;
}
function spawnStunScroll(map8, pos) {
  let scroll = new Item(pos, nameStunScroll, true, "s", colorStunScroll, colorTransparent, RenderOrder.Item, (map9, actor2) => {
    return new StunAction().execute(actor2, map9);
  });
  map8.addItem(scroll);
  return scroll;
}
function spawnConfusionScroll(map8, pos) {
  let scroll = new Item(pos, nameConfusionScroll, true, "s", colorConfusionScroll, colorTransparent, RenderOrder.Item, (map9, actor2) => {
    return new ConfusionScrollAction().execute(actor2, map9);
  });
  map8.addItem(scroll);
  return scroll;
}

// src/action/attackAction.ts
class AttackAction extends Action2 {
  otherActor;
  constructor(otherActor) {
    super();
    this.otherActor = otherActor;
  }
  playerDeath(actor2) {
    Sound.playEnemyKillEnemy();
    actor2.char = "%";
    actor2.fg = colorRed;
    actor2.bg = colorBlack;
    actor2.behavior = new EmptyBehavior;
    MessageLog.addMessage(`A scary enemy killed you!`, colorRed, false);
  }
  execute(actor2, map8) {
    if (actor2.name === namePlayer) {
      this.playerDeath(actor2);
    } else if (this.otherActor.name === namePlayer) {
      this.playerDeath(this.otherActor);
    } else {
      Sound.playEnemyKillEnemy();
      map8.removeActor(actor2);
      spawnCorpse(map8, actor2.pos, nameMauledCorpse);
      MessageLog.addMessage(`A ${actor2.name} was killed its comrade!`, colorLightGray, false);
    }
    return true;
  }
}

// src/action/directionAction.ts
class DirectionAction {
  dPos;
  constructor(dPos) {
    this.dPos = dPos;
  }
  execute(actor2, map8) {
    console.error("DirectionAction.execute should not be possible!");
    console.trace();
    return false;
  }
  destination(actor2) {
    return new Point(actor2.pos.x + this.dPos.x, actor2.pos.y + this.dPos.y);
  }
}

// src/action/moveAction.ts
class MoveAction extends DirectionAction {
  constructor(dPos) {
    super(dPos);
  }
  execute(actor2, map8) {
    let pos = this.destination(actor2);
    if (!map8.isWalkable(pos)) {
      MessageLog.addMessage("That way is blocked", colorLightGray, true);
      return false;
    } else {
      actor2.move(this.dPos);
      return true;
    }
  }
}

// src/action/openChestAction.ts
class OpenChestAction extends Action2 {
  chestPos;
  constructor(chestPos) {
    super();
    this.chestPos = chestPos;
  }
  execute(actor2, map8) {
    const item2 = map8.itemAtLocation(this.chestPos);
    if (item2 === null) {
      console.error("OpenChestAction called on invalid chest.");
    } else if (actor2.inventory.addItem(item2)) {
      Sound.playChestOpen();
      map8.removeItem(item2);
      map8.setTile(this.chestPos, tileFactory_default.openedChest);
      MessageLog.addMessage(`Picked up ${item2.name}.`, colorLightGray, true);
      return true;
    }
    return false;
  }
}

// src/action/bumpAction.ts
class BumpAction extends DirectionAction {
  constructor(dPos) {
    super(dPos);
  }
  execute(actor2, map8) {
    let pos = this.destination(actor2);
    const actorAtLocation = map8.actorAtLocation(pos);
    if (actorAtLocation !== null) {
      if (actorAtLocation.name === nameAltar) {
        return new AltarAction(actorAtLocation).execute(actor2, map8);
      } else {
        return new AttackAction(actorAtLocation).execute(actor2, map8);
      }
    }
    const itemAtLocation = map8.itemAtLocation(pos);
    if (itemAtLocation !== null) {
      if (actor2.name === namePlayer) {
        return new OpenChestAction(pos).execute(actor2, map8);
      } else if (itemAtLocation.blocksMovement) {
        return new PassAction().execute(actor2, map8);
      }
    }
    return new MoveAction(new Point(this.dPos.x, this.dPos.y)).execute(actor2, map8);
  }
}

// src/action/pickUpItemAction.ts
class PickUpItemAction extends Action2 {
  constructor() {
    super(...arguments);
  }
  execute(actor2, map8) {
    const item2 = map8.itemAtLocation(actor2.pos);
    if (item2 === null) {
      let entity5 = map8.entityAtLocation(actor2.pos);
      if (entity5 === null) {
        MessageLog.addMessage("Nothing to pick up.", colorLightGray, true);
      } else if (entity5.name.includes("Corpse")) {
        MessageLog.addMessage(`You are on top of a ${entity5.name}.`, colorLightGray, true);
      } else {
        MessageLog.addMessage("Nothing to pick up.", colorLightGray, true);
      }
    } else if (actor2.inventory.addItem(item2)) {
      map8.removeItem(item2);
      map8.addEntity(new Entity(actor2.pos, "Opened Chest", true, "c", colorTransparent, colorTransparent, RenderOrder.Corpse));
      MessageLog.addMessage(`Picked up ${item2.name}.`, colorLightGray, true);
      return true;
    }
    return false;
  }
}

// src/behavior/playerBehavior.ts
class PlayerBehavior {
  turn = 1;
  act(actor2, map8) {
    let requestAnotherTurn = this.turn % 2 == 0;
    if (InputManager.isKeyDown(Key.DOWN) || InputManager.isKeyDown(Key.S)) {
      InputManager.clear();
      ++this.turn;
      return [new BumpAction(new Point(0, 1)), requestAnotherTurn];
    }
    if (InputManager.isKeyDown(Key.UP) || InputManager.isKeyDown(Key.W)) {
      InputManager.clear();
      ++this.turn;
      return [new BumpAction(new Point(0, -1)), requestAnotherTurn];
    }
    if (InputManager.isKeyDown(Key.LEFT) || InputManager.isKeyDown(Key.A)) {
      InputManager.clear();
      ++this.turn;
      return [new BumpAction(new Point(-1, 0)), requestAnotherTurn];
    }
    if (InputManager.isKeyDown(Key.RIGHT) || InputManager.isKeyDown(Key.D)) {
      InputManager.clear();
      ++this.turn;
      return [new BumpAction(new Point(1, 0)), requestAnotherTurn];
    }
    if (InputManager.isKeyDown(Key.E)) {
      InputManager.clear();
      ++this.turn;
      return [new PickUpItemAction, requestAnotherTurn];
    }
    return [new PassAction, true];
  }
}

// src/generation/rooms.ts
var START_ROOM = [
  "--------a",
  "---------",
  "---------",
  "-&-------",
  "---------",
  "---------",
  "---------"
];
var POTION_ROOMS = [
  [
    "---------",
    "---------",
    "---X-X---",
    "----*----",
    "---X-X---",
    "---------",
    "---------"
  ],
  [
    "---------",
    "---XXXX--",
    "---------",
    "----*----",
    "--#------",
    "---XXXX--",
    "---------"
  ],
  [
    "#-------#",
    "---------",
    "---XXX---",
    "---X*X---",
    "---------",
    "---------",
    "#-------#"
  ]
];
var ROOMS = [
  [
    "---------",
    "---------",
    "--#-XXX--",
    "----&XX--",
    "----XXX--",
    "---------",
    "---------"
  ],
  [
    "---------",
    "---------",
    "---------",
    "----#----",
    "---------",
    "---------",
    "---------"
  ],
  [
    "---------",
    "---------",
    "----&----",
    "----#----",
    "----&----",
    "---------",
    "---------"
  ],
  [
    "---------",
    "---------",
    "----#----",
    "----&----",
    "----#----",
    "---------",
    "---------"
  ],
  [
    "---------",
    "--XX-XX#-",
    "--X---X--",
    "--X-&-X--",
    "--X---X--",
    "-#XX-XX--",
    "---------"
  ]
];

// src/game/gameMap.ts
class GameMap {
  rows;
  cols;
  roomRows;
  roomCols;
  tiles;
  visible;
  explored;
  potionCount = 0;
  entities = [];
  items = [];
  actors = [];
  entityIds = [];
  itemIds = [];
  actorIds = [];
  actorIndex = 0;
  playerWon = false;
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.roomRows = START_ROOM.length + Config.padding;
    this.roomCols = START_ROOM[0].length + Config.padding;
    this.tiles = Array(this.rows * this.cols * this.roomRows * this.roomCols).fill(tileFactory_default.wall);
    this.visible = Array(this.tiles.length).fill(0);
    this.explored = Array(this.tiles.length).fill(false);
    this.actors.push(new Actor(new Point(0, 0), namePlayer, true, "@", colorWhite, colorBlack, RenderOrder.Actor, new PlayerBehavior));
    this.actors.push(new Actor(new Point(0, 0), nameAltar, true, "A", colorDarkGray, colorBlack, RenderOrder.Actor, new EmptyBehavior));
  }
  width() {
    return this.cols * this.roomCols;
  }
  height() {
    return this.rows * this.roomRows;
  }
  reset() {
    this.tiles = Array(this.rows * this.cols * this.roomRows * this.roomCols).fill(tileFactory_default.wall);
    this.visible = Array(this.tiles.length).fill(0);
    this.explored = Array(this.tiles.length).fill(false);
    this.potionCount = 0;
    this.player().char = "@";
    this.player().fg = colorWhite;
    this.player().bg = colorBlack;
    this.player().behavior = new PlayerBehavior;
    this.altar().fg = colorDarkGray;
    this.altar().bg = colorBlack;
    this.altar().behavior = new EmptyBehavior;
  }
  player() {
    return this.actors[0];
  }
  altar() {
    return this.actors[1];
  }
  playerIsAlive() {
    return this.player().char != "%";
  }
  requiredPotions() {
    return this.potionCount;
  }
  index(pos) {
    return pos.y * (this.cols * this.roomCols) + pos.x;
  }
  inBounds(pos) {
    return pos.y * (this.cols * this.roomCols) + pos.x < this.tiles.length;
  }
  isWalkable(pos) {
    const index = this.index(pos);
    if (index >= this.tiles.length || index < 0) {
      return false;
    }
    return this.tiles[index].walkable;
  }
  setTile(pos, tile3) {
    const index = this.index(pos);
    assert(index < this.tiles.length);
    this.tiles[index] = tile3;
  }
  render(display) {
    const maxDist = Config.sightRadius * Config.sightRadius;
    let y;
    let x;
    const playerPosition = this.player().pos;
    const midX = Math.round(Config.width / 2);
    const midY = Math.round(Config.height / 2);
    let worldPosition = new Point(0, 0);
    for (y = -midY;y < midY; ++y) {
      const worldY = playerPosition.y + y;
      if (worldY < 0) {
        continue;
      }
      worldPosition.y = worldY;
      for (x = -midX;x < midX; ++x) {
        const worldX = playerPosition.x + x;
        if (worldX < 0) {
          continue;
        }
        worldPosition.x = worldX;
        let index = this.index(worldPosition);
        if (index >= this.visible.length) {
          continue;
        }
        const tile3 = this.tiles[index];
        const visibility = this.visible[index];
        const p = new Point(worldX, worldY);
        if (visibility > 0.1) {
          if (playerPosition.equals(p)) {
            display.draw(x + midX, y + midY, tile3.char, `rgba(0,0,0,0})`, colorTransparent);
          } else {
            const dist = playerPosition.unSquaredEuclideanDistance(p);
            const color2 = `rgba(0,0,0,${Math.min(0.9, dist / maxDist)})`;
            display.draw(x + midX, y + midY, tile3.char, color2, color2);
          }
        } else if (this.explored[index]) {
          display.draw(x + midX, y + midY, tile3.char, `rgba(0,0,0,${0.9})`, colorTransparent);
        }
      }
    }
    let e;
    let i;
    const entitiesLength = this.entities.length;
    for (i = 0;i < entitiesLength; ++i) {
      e = this.entities[i];
      if (e !== null && this.positionVisible(e.pos)) {
        e.render(display, playerPosition, midX, midY, this.visible[this.index(e.pos)], maxDist);
      }
    }
    let item2;
    const itemsLength = this.items.length;
    for (i = 0;i < itemsLength; ++i) {
      item2 = this.items[i];
      if (item2 !== null && this.positionVisible(item2.pos)) {
        item2.render(display, playerPosition, midX, midY, this.visible[this.index(item2.pos)], maxDist);
      }
    }
    let actor3;
    const actorsLength = this.actors.length;
    for (i = 0;i < actorsLength; ++i) {
      actor3 = this.actors[i];
      if (actor3 !== null && this.positionVisible(actor3.pos)) {
        actor3.render(display, playerPosition, midX, midY, this.visible[this.index(actor3.pos)], maxDist);
      }
    }
  }
  addEntity(entity5) {
    assert(this.locationOccupied(entity5.pos) === false);
    if (this.entityIds.length > 0) {
      const id = this.entityIds.pop();
      entity5.id = id;
      this.entities[id] = entity5;
    } else {
      entity5.id = this.entities.length;
      this.entities.push(entity5);
    }
  }
  addActor(actor3) {
    assert(this.locationOccupied(actor3.pos) === false);
    if (this.actorIds.length > 0) {
      const id = this.actorIds.pop();
      actor3.id = id;
      this.actors[id] = actor3;
    } else {
      actor3.id = this.actors.length;
      this.actors.push(actor3);
    }
  }
  addItem(item2) {
    assert(this.locationOccupied(item2.pos) === false);
    if (item2.name === namePotion) {
      ++this.potionCount;
    }
    if (this.itemIds.length > 0) {
      const id = this.itemIds.pop();
      item2.id = id;
      this.items[id] = item2;
    } else {
      item2.id = this.items.length;
      this.items.push(item2);
    }
  }
  removeEntity(entity5) {
    this.entities[entity5.id] = null;
    this.entityIds.push(entity5.id);
  }
  removeActor(actor3) {
    this.actors[actor3.id] = null;
    this.actorIds.push(actor3.id);
  }
  removeItem(item2) {
    this.items[item2.id] = null;
    this.itemIds.push(item2.id);
  }
  entityAtLocation(pos) {
    const size = this.entities.length;
    let e;
    for (let i = 0;i < size; ++i) {
      e = this.entities[i];
      if (e !== null && e.pos.equals(pos)) {
        return e;
      }
    }
    return null;
  }
  actorAtLocation(pos) {
    const size = this.actors.length;
    let a;
    for (let i = 0;i < size; ++i) {
      a = this.actors[i];
      if (a !== null && a.pos.equals(pos)) {
        return a;
      }
    }
    return null;
  }
  itemAtLocation(pos) {
    const size = this.items.length;
    let item2;
    for (let i = 0;i < size; ++i) {
      item2 = this.items[i];
      if (item2 !== null && item2.pos.equals(pos)) {
        return item2;
      }
    }
    return null;
  }
  locationOccupied(pos) {
    return this.entityAtLocation(pos) !== null || this.actorAtLocation(pos) !== null || this.itemAtLocation(pos) !== null;
  }
  nearestActor(pos) {
    let closestActor = null;
    let closestDistance = 1e6;
    let a;
    let dist;
    const size = this.actors.length;
    for (let i = 0;i < size; ++i) {
      a = this.actors[i];
      if (a !== null && !a.pos.equals(pos)) {
        dist = pos.euclideanDistance(a.pos);
        if (dist < closestDistance) {
          closestDistance = dist;
          closestActor = a;
        }
      }
    }
    return closestActor;
  }
  nearestActorInVision(pos) {
    let closestActor = null;
    let closestDistance = 1e6;
    let dist;
    let a;
    let size = this.actors.length;
    for (let i = 0;i < size; ++i) {
      a = this.actors[i];
      if (a !== null && !a.pos.equals(pos) && this.positionVisible(a.pos)) {
        dist = pos.euclideanDistance(a.pos);
        if (dist < closestDistance) {
          closestActor = a;
          closestDistance = dist;
        }
      }
    }
    return closestActor;
  }
  positionVisible(pos) {
    const index = this.index(pos);
    if (index < 0 || index >= this.visible.length) {
      return false;
    }
    return this.visible[index] !== 0;
  }
  computeFOV() {
    const fov4 = new PreciseShadowcasting((x, y) => {
      const index = this.index(new Point(x, y));
      if (index < this.tiles.length && index >= 0) {
        return !this.tiles[index].blockFoV;
      }
      return false;
    });
    this.visible.fill(0);
    fov4.compute(this.player().pos.x, this.player().pos.y, Config.sightRadius, (x, y, r, visibility) => {
      const index = this.index(new Point(x, y));
      this.visible[index] = visibility;
      if (visibility === 1) {
        this.explored[index] = true;
      }
    });
  }
  runActors() {
    let shouldRender = false;
    for (;this.actorIndex < this.actors.length; ++this.actorIndex) {
      if (this.actors[this.actorIndex] === null) {
        continue;
      }
      const [requestAnotherTurn, requiresRender] = this.actors[this.actorIndex].act(this);
      shouldRender ||= requiresRender;
      if (requestAnotherTurn) {
        return shouldRender;
      } else if (!this.playerIsAlive()) {
        break;
      }
    }
    this.actorIndex = 0;
    return shouldRender;
  }
  markLevelComplete() {
    this.playerWon = true;
  }
  levelComplete() {
    return this.playerWon;
  }
  getWallNeighbors(point11) {
    return [
      !this.isWalkable(new Point(point11.x, point11.y - 1)),
      !this.isWalkable(new Point(point11.x, point11.y + 1)),
      !this.isWalkable(new Point(point11.x - 1, point11.y)),
      !this.isWalkable(new Point(point11.x + 1, point11.y))
    ];
  }
}

// src/ui/button.ts
class Button {
  highlighted;
  x;
  y;
  width;
  height;
  text;
  textColor;
  textHighlightedColor;
  frameColor;
  frameHighlightedColor;
  renderFunction;
  callback;
  constructor(x, y, width, height, text, textColor, textHighlightedColor, frameColor, frameHighlightedColor, centered, callback) {
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
    if (centered) {
      this.renderFunction = this.renderCenter;
    } else {
      this.renderFunction = this.renderRegular;
    }
  }
  render(ctx) {
    ctx.font = `20px monospace`;
    this.renderFunction(ctx);
  }
  renderCenter(ctx) {
    const frameColor = this.highlighted ? this.frameHighlightedColor : this.frameColor;
    const textColor = this.highlighted ? this.textHighlightedColor : this.textColor;
    const measurements = ctx.measureText(this.text);
    const fontHeight = measurements.fontBoundingBoxAscent + measurements.fontBoundingBoxDescent;
    ctx.fillStyle = colorBlack;
    ctx.strokeStyle = frameColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    const textX = (this.x + this.x + this.width) / 2;
    const textY = this.y + this.height / 2 + fontHeight / 4;
    ctx.fillStyle = textColor;
    ctx.strokeStyle = colorBlack;
    ctx.fillText(this.text, textX, textY);
  }
  renderRegular(ctx) {
    const frameColor = this.highlighted ? this.frameHighlightedColor : this.frameColor;
    const textColor = this.highlighted ? this.textHighlightedColor : this.textColor;
    ctx.fillStyle = colorBlack;
    ctx.strokeStyle = frameColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = textColor;
    ctx.strokeStyle = colorBlack;
    ctx.fillText(this.text, this.x, this.y);
  }
  update() {
    if (this.highlighted && InputManager.isKeyDown(Key.ENTER, Key.SPACE)) {
      this.callback();
    }
  }
}

// src/ui/text.ts
class Text {
  x;
  y;
  text;
  color;
  font;
  center;
  splitText;
  constructor(x, y, text, color2, center, fontSize = 12) {
    this.x = x;
    this.y = y;
    this.color = color2;
    this.font = `${fontSize}px monospace`;
    this.center = center;
    if (text.includes("\n")) {
      this.splitText = text.split("\n");
    } else {
      this.text = text;
    }
  }
  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    if (this.text !== undefined) {
      if (this.center) {
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x, this.y);
      } else {
        ctx.textAlign = "left";
        ctx.fillText(this.text, this.x, this.y);
      }
    } else if (this.center) {
      ctx.textAlign = "center";
      for (let i = 0;i < this.splitText.length; ++i) {
        const measurements = ctx.measureText(this.splitText[i]);
        const yIncrement = measurements.fontBoundingBoxAscent + measurements.fontBoundingBoxDescent;
        ctx.fillText(this.splitText[i], this.x - measurements.width / 2, this.y + yIncrement * i);
      }
    } else {
      ctx.textAlign = "left";
      const measurements = ctx.measureText("A");
      const yIncrement = measurements.fontBoundingBoxAscent + measurements.fontBoundingBoxDescent;
      for (let i = 0;i < this.splitText.length; ++i) {
        ctx.fillText(this.splitText[i], this.x, this.y + yIncrement * i);
      }
    }
  }
}

// src/ui/menu.ts
class Menu {
  x;
  y;
  width;
  height;
  title;
  exitOnEscape;
  drawOutline;
  buttons;
  buttonIndex;
  text;
  shouldRender;
  shouldExit;
  buttonsLeftToRight;
  updateCallback;
  childMenu;
  constructor(x, y, width, height, title, drawOutline, exitOnEscape, buttonsLeftToRight, updateCallback) {
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
    this.buttonsLeftToRight = buttonsLeftToRight;
    this.shouldRender = true;
    this.shouldExit = false;
    this.updateCallback = updateCallback;
    this.childMenu = null;
    this.text.push(new Text(this.x + width / 2, this.y + 30, this.title, colorWhite, true, 20));
  }
  addButton(button) {
    this.buttons.push(button);
    if (this.buttons.length === 1) {
      this.buttons[0].highlighted = true;
    }
  }
  addText(text2) {
    this.text.push(text2);
  }
  clear(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    ctx.clearRect(0, 0, Config.screenWidth, Config.screenHeight);
  }
  render(ctx) {
    this.drawFrame(ctx);
    if (this.childMenu) {
      this.childMenu.render(ctx);
    } else {
      let i;
      const buttonsSize = this.buttons.length;
      for (i = 0;i < buttonsSize; ++i) {
        this.buttons[i].render(ctx);
      }
      const textsSize = this.text.length;
      for (i = 0;i < textsSize; ++i) {
        this.text[i].render(ctx);
      }
    }
    this.shouldRender = false;
  }
  update(ctx) {
    if (this.childMenu) {
      this.childMenu.update(ctx);
      if (this.childMenu.shouldExit) {
        this.childMenu.clear(ctx);
        this.childMenu = null;
        this.shouldRender = true;
        InputManager.clear();
      } else {
        return;
      }
    }
    if (this.buttons.length > 0) {
      if (this.buttonsLeftToRight) {
        if (InputManager.isKeyDown(Key.RIGHT) || InputManager.isKeyDown(Key.D)) {
          this.buttons[this.buttonIndex].highlighted = false;
          this.buttonIndex = Math.min(this.buttons.length - 1, this.buttonIndex + 1);
          this.buttons[this.buttonIndex].highlighted = true;
          this.shouldRender = true;
          InputManager.clear();
        } else if (InputManager.isKeyDown(Key.LEFT) || InputManager.isKeyDown(Key.A)) {
          this.buttons[this.buttonIndex].highlighted = false;
          this.buttonIndex = Math.max(0, this.buttonIndex - 1);
          this.buttons[this.buttonIndex].highlighted = true;
          this.shouldRender = true;
          InputManager.clear();
        }
      } else {
        if (InputManager.isKeyDown(Key.DOWN) || InputManager.isKeyDown(Key.S)) {
          this.buttons[this.buttonIndex].highlighted = false;
          this.buttonIndex = Math.min(this.buttons.length - 1, this.buttonIndex + 1);
          this.buttons[this.buttonIndex].highlighted = true;
          this.shouldRender = true;
          InputManager.clear();
        } else if (InputManager.isKeyDown(Key.UP) || InputManager.isKeyDown(Key.W)) {
          this.buttons[this.buttonIndex].highlighted = false;
          this.buttonIndex = Math.max(0, this.buttonIndex - 1);
          this.buttons[this.buttonIndex].highlighted = true;
          this.shouldRender = true;
          InputManager.clear();
        }
      }
      this.buttons[this.buttonIndex].update();
    }
    if (this.exitOnEscape && InputManager.isKeyDown(Key.ESCAPE)) {
      this.shouldExit = true;
      InputManager.clear();
    } else {
      this.updateCallback();
    }
  }
  drawFrame(ctx) {
    ctx.strokeStyle = colorWhite;
    ctx.fillStyle = colorBlack;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

// src/ui/uiFactory.ts
function helpMenu() {
  const x = Config.screenWidth / 4;
  const y = Config.screenHeight / 4;
  let m = new Menu(x, y, Config.screenWidth / 2, Config.screenHeight / 2, "Help Menu", true, true, false, () => {
    if (InputManager.isKeyDown(Key.H, Key.ENTER, Key.ESCAPE)) {
      m.shouldExit = true;
    }
  });
  m.addButton(new Button(Config.screenWidth / 2, Config.screenHeight - 5 * Config.screenHeight / 16, Config.screenWidth * 0.03, Config.screenHeight * 0.05, "Ok", colorLightGray, colorWhite, colorLightGray, colorWhite, true, () => {
  }));
  const startY = y + 70;
  m.addText(new Text(x + 20, startY, "- WASD or arrow keys to move.", colorWhite, false, 15));
  m.addText(new Text(x + 20, startY + 15, "- E to interact.", colorWhite, false, 15));
  m.addText(new Text(x + 20, startY + 30, "- Q to open your inventory.", colorWhite, false, 15));
  m.addText(new Text(x + 20, startY + 60, "Your goal is to collect potions to get to the next level in\nthe prison.", colorWhite, false, 15));
  m.addText(new Text(x + 20, startY + 105, "Make sure to avoid the enemies, they move every third turn\nand kill you on contact.", colorWhite, false, 15));
  return m;
}
function mainMenu(callback) {
  let m = new Menu(0, 0, Config.screenWidth, Config.screenHeight, "", true, false, false, () => {
    if (InputManager.isKeyDown(Key.SPACE, Key.ENTER)) {
      Sound.playGameStart();
      m.shouldExit = true;
      callback();
    } else if (InputManager.isKeyDown(Key.H)) {
      m.childMenu = helpMenu();
      m.shouldRender = true;
      InputManager.clear();
    }
  });
  const title = "Sisyphus's Dungeon";
  m.addText(new Text(Config.screenWidth / 2, Config.screenHeight / 4, title, colorYellow, true, 50));
  const attribution = "by Colan F. Biemer";
  m.addText(new Text(Config.screenWidth / 2, Config.screenHeight / 4 + 40, attribution, colorLightGray, true, 20));
  const instructions = "Press enter to start or h for instructions.";
  m.addText(new Text(Config.screenWidth / 2, Config.screenHeight / 2, instructions, colorWhite, true, 20));
  return m;
}
function gameOverMenu(callback) {
  const x = Config.screenWidth * 0.4;
  const y = Config.screenHeight / 4;
  const w = Config.screenWidth * 0.2;
  const h = Config.screenHeight / 8;
  let m = new Menu(x, y, w, h, "GAME OVER", true, true, false, () => {
    if (InputManager.isKeyDown(Key.H, Key.ENTER, Key.ESCAPE)) {
      InputManager.clear();
      callback();
    }
  });
  m.addButton(new Button(x + w / 2.5, y + h / 2, Config.screenWidth * 0.03, Config.screenHeight * 0.05, "Ok", colorLightGray, colorWhite, colorLightGray, colorWhite, true, callback));
  return m;
}
function inventoryMenu(map8, player) {
  const inventory = player.inventory;
  const size = inventory.items.length;
  let m;
  const x = Config.screenWidth * 0.1;
  const y = Config.screenHeight * 0.02;
  const w = Config.screenWidth * 0.3;
  if (size === 0) {
    m = new Menu(x, y, w, Config.screenHeight * 0.07, "Inventory Empty", true, true, true, () => {
      if (InputManager.isKeyDown(Key.Q, Key.ESCAPE)) {
        InputManager.clear();
        m.shouldExit = true;
      }
    });
  } else {
    let items = {};
    let item2;
    const size2 = inventory.items.length;
    for (let i = 0;i < size2; ++i) {
      item2 = inventory.items[i];
      if (item2.name in items) {
        ++items[item2.name][1];
      } else {
        items[item2.name] = [item2, 1];
      }
    }
    const itemWidth = Config.screenWidth * 0.26;
    const itemHeight = Config.screenHeight * 0.07;
    const paddingW = Config.screenWidth * 0.02;
    const paddingH = Config.screenHeight * 0.02;
    const h = Config.screenHeight * 0.08 + paddingH + (itemHeight + paddingH) * Object.keys(items).length;
    m = new Menu(x, y, w, h, "Inventory", true, true, false, () => {
      if (InputManager.isKeyDown(Key.Q, Key.ESCAPE)) {
        InputManager.clear();
        m.shouldExit = true;
      }
    });
    let curY = y + Config.screenHeight * 0.08;
    for (let key in items) {
      let name;
      if (items[key][1] === 1) {
        name = key;
      } else {
        name = `${key} x${items[key][1]}`;
      }
      m.addButton(new Button(x + paddingW, curY, itemWidth, itemHeight, name, colorDarkGray, colorWhite, colorDarkGray, colorWhite, true, () => {
        if (items[key][0].onConsume(map8, map8.player())) {
          inventory.destroyItemWithID(items[key][0].id);
        }
        m.shouldExit = true;
      }));
      curY += itemHeight + paddingH;
    }
  }
  return m;
}

// src/generation/generationUtility.ts
function bresenham(p1, p2, callback) {
  let temp;
  let dx = p2.x - p1.x;
  let dy = p2.y - p1.y;
  const isSteep = Math.abs(dy) > Math.abs(dx);
  if (isSteep) {
    temp = p1.x;
    p1.x = p1.y;
    p1.y = temp;
    temp = p2.x;
    p2.x = p2.y;
    p2.y = temp;
  }
  let swapped = p1.x > p2.x;
  if (swapped) {
    temp = p1.x;
    p1.x = p2.x;
    p2.x = temp;
    temp = p1.y;
    p1.y = p2.y;
    p2.y = temp;
  }
  dy = p2.y - p1.y;
  dx = p2.x - p1.x;
  let error3 = Math.round(dx / 2);
  const yStep = p1.y < p2.y ? 1 : -1;
  let y = p1.y;
  for (let x = p1.x;x < p2.x; ++x) {
    if (isSteep) {
      callback(new Point(y, x));
    } else {
      callback(new Point(x, y));
    }
    error3 -= Math.abs(dy);
    if (error3 < 0) {
      y += yStep;
      error3 += dx;
      if (isSteep) {
        callback(new Point(y, x));
      } else {
        callback(new Point(x, y));
      }
    }
  }
}

// src/generation/levels.ts
var LEVELS = { "8_0_0": ["---------^^^^^^", "-----------^---", "-----------^---", "-----------^---", "-----------^--^", "---#-----------", "-----------&--^", "/\\\\------------", "\\//------------", "------*--------", "*--------^^^^^^"], "8_0_1": ["---------^^^^^^", "-----------^---", "-----------^---", "-----------^---", "-----------^--^", "---#-----------", "-----------&--^", "/\\\\------------", "\\//------------", "------*--------", "*--------^^^^^^"], "8_1_0": ["----------^^^^^", "------------X--", "------------X--", "------------X--", "------------X--", "---#--------X-#", "------------X--", "/\\\\---------X--", "\\//---------X--", "------*--------", "*---------^^^^^"], "8_1_1": ["----------^^^^^", "------------X--", "------------X--", "------------X--", "------------X--", "---#--------X-#", "------------X--", "/\\\\---------X--", "\\//---------X--", "------*--------", "*---------^^^^^"], "8_1_2": ["-----^^^^^^^^^^", "-----^^^-----^-", "-------------^-", "X----^^^-----^-", "X----^^^-----^-", "X----^^^-------", "X----^^^-----&-", "X----^^^-------", "X--------------", "X----^^^--X----", "X----^^^^^^^^^^"], "9_0_0": ["-------^^^^^^^^", "-------------*-", "---------------", "------------^^^", "----------^^^^^", "---#---------&-", "----------^^^^^", "/\\\\---------^^^", "\\//------------", "-------------*-", "*------^^^^^^^^"], "9_0_1": ["-------^^^^^^^^", "-------------*-", "---------------", "------------^^^", "----------^^^^^", "---#---------&-", "----------^^^^^", "/\\\\---------^^^", "\\//------------", "-------------*-", "*------^^^^^^^^"], "9_0_2": ["^^^^^^^-^-^-^--", "-X--^---^-^-^--", "-X--^-----^-^--", "-X--^-------^--", "-X--^----------", "-X-------------", "-X--&----------", "-X----------^--", "-X--------^-^--", "-#------^-^-^--", "^^^^^^^-^-^-^--"], "7_0_0": ["----------^^^^^", "------------^--", "------------^--", "------------^--", "------------^--", "---#-----------", "------------&--", "/\\\\------------", "\\//------------", "------*--------", "*---------^^^^^"], "7_0_1": ["----------^^^^^", "------------^--", "------------^--", "------------^--", "------------^--", "---#-----------", "------------&--", "/\\\\------------", "\\//------------", "------*--------", "*---------^^^^^"], "7_0_2": ["X---^^^--^^^---", "----^^^--^^^---", "X---^^^--^^^---", "X---^^^--^^^---", "X----&----&----", "*---^^^--------", "X----*---^^^---", "X---^^^--^^^---", "X---^^^--^^^---", "----^^^--^^^---", "X---^^^--^^^---"], "0_0_0": ["---------------", "\\\\-------------", "//-------------", "---------------", "---------------", "----#--&--&--&-", "---------------", "---------------", "&--------------", "---------------", "---------------"], "0_0_1": ["---------------", "\\\\-------------", "//-------------", "---------------", "---------------", "----#--&--&--&-", "---------------", "---------------", "&--------------", "---------------", "---------------"], "0_0_2": ["X--------------", "X--------------", "X--------------", "X--------------", "---------------", "-----------&---", "---------------", "X--------------", "X--------------", "X-----*--------", "X--------------"], "0_1_0": ["----------X----", "\\\\--------X----", "//--------X----", "----------X----", "----------X----", "----#--&--X--&-", "----------X----", "----------X----", "&---------X----", "----------X----", "----------&----"], "0_1_1": ["----------X----", "\\\\--------X----", "//--------X----", "----------X----", "----------X----", "----#--&--X--&-", "----------X----", "----------X----", "&---------X----", "----------X----", "----------&----"], "0_1_2": ["XXX------------", "---------------", "---------------", "X--------------", "X--------------", "X----------&---", "X--------------", "X--------------", "---------------", "------*--------", "XXX------------"], "1_0_0": ["---------------", "---------------", "---------------", "---------------", "---------------", "---#--&--&--&--", "---------------", "/\\\\------------", "\\//------------", "---------------", "*--------------"], "1_0_1": ["---------------", "---------------", "---------------", "---------------", "---------------", "---#--&--&--&--", "---------------", "/\\\\------------", "\\//------------", "---------------", "*--------------"], "1_0_2": ["^--------------", "------//\\\\-----", "------\\\\//-----", "---------------", "---------------", "----&----------", "---------------", "---------------", "--------&------", "------------*--", "^--------------"], "7_3_0": ["--------X--^^^^", "-------------X-", "--------X----X-", "-------XX----X-", "------XXX----X-", "---#--X#&----X-", "------XXX----X-", "/\\\\----XX----X-", "\\//-----X----X-", "-------------#-", "*-------X--^^^^"], "7_3_1": ["--------X--^^^^", "-------------X-", "--------X----X-", "-------XX----X-", "------XXX----X-", "---#--X#&----X-", "------XXX----X-", "/\\\\----XX----X-", "\\//-----X----X-", "-------------#-", "*-------X--^^^^"], "7_3_2": ["--XXXXXXXXXXXXX", "-------^^^^^^^^", "----------^^^^-", "---------------", "-------------//", "-------------\\\\", "---------------", "---------------", "----X-----^^^^-", "----X--^^^^^^^^", "--XXXXXXXXXXXXX"], "7_4_0": ["------^^^--XXXX", "------^^^--XXXX", "------^^^--XXXX", "------^^^--XXXX", "-------*-----*-", "---#--^^^------", "-------&------#", "/\\\\---^^^--XXXX", "\\//---^^^--XXXX", "------^^^--XXXX", "*-----^^^--XXXX"], "7_4_1": ["------^^^--XXXX", "------^^^--XXXX", "------^^^--XXXX", "------^^^--XXXX", "-------*-----*-", "---#--^^^------", "-------&------#", "/\\\\---^^^--XXXX", "\\//---^^^--XXXX", "------^^^--XXXX", "*-----^^^--XXXX"], "7_4_2": ["---X-----------", "---X-----------", "---X---^-----^-", "---X---^-----^-", "-------^-----^-", "-------^-----^-", "---#-#-#-#-#-#-", "---------------", "---------------", "/\\\\XXXXXXXXXXXX", "\\//XXXXXXXXXXXX"], "7_2_0": ["------#---^^^^^", "------XX----^--", "------XX----^--", "------XX----^--", "------XX----^--", "---#-----------", "------XX----&--", "/\\\\---XX-------", "\\//---XX-------", "------XX-------", "*-----#---^^^^^"], "7_2_1": ["------#---^^^^^", "------XX----^--", "------XX----^--", "------XX----^--", "------XX----^--", "---#-----------", "------XX----&--", "/\\\\---XX-------", "\\//---XX-------", "------XX-------", "*-----#---^^^^^"], "8_3_0": ["--------X--^^^^", "---------------", "--------X----X-", "-------XX----XX", "------XXX----XX", "---#--X#&----*#", "------XXX----XX", "/\\\\----XX----XX", "\\//-----X----X-", "---------------", "*-------X--^^^^"], "8_3_1": ["--------X--^^^^", "---------------", "--------X----X-", "-------XX----XX", "------XXX----XX", "---#--X#&----*#", "------XXX----XX", "/\\\\----XX----XX", "\\//-----X----X-", "---------------", "*-------X--^^^^"], "8_3_2": ["-----------^^^^", "-----------^^^^", "^--^-----------", "^--^---XX------", "^--^---XX--^^^^", "^--^---XX--^^^^", "#-#-#--XX--^^^^", "-------XX--^^^^", "-------XX--^^^^", "XXXXXXXXX--^^^^", "XXXXXXXXX--^^^^"], "6_3_0": ["---------X--^^^", "--------------X", "---------X----X", "--------XX----X", "-------XXX----X", "---#---X#&----X", "-------XXX----X", "/\\\\-----XX----X", "\\//------X----X", "--------------#", "*--------X--^^^"], "6_3_1": ["---------X--^^^", "--------------X", "---------X----X", "--------XX----X", "-------XXX----X", "---#---X#&----X", "-------XXX----X", "/\\\\-----XX----X", "\\//------X----X", "--------------#", "*--------X--^^^"], "6_3_2": ["----#---X--^^^^", "^^--XX--X--^^^^", "^^--XX--X--^^^^", "^^--XX--X------", "^^--XX--X--^^^^", "^^------X--^^^^", "^^--XX--X--^^^^", "^^--XX--X------", "^^--XX--X--^^^^", "^^--XX--X--^^^^", "----#---&--^^^^"], "14_1_0": ["---^^^^^^^^^^^^", "--------------*", "--------X------", "-------XX----^^", "------XXX--^^^^", "#-----X#*-----&", "------XXX--^^^^", "-------XX----^^", "--------X------", "--------------*", "---^^^^^^^^^^^^"], "14_1_1": ["---^^^^^^^^^^^^", "--------------*", "--------X------", "-------XX----^^", "------XXX--^^^^", "#-----X#*-----&", "------XXX--^^^^", "-------XX----^^", "--------X------", "--------------*", "---^^^^^^^^^^^^"], "14_2_0": ["---^^^^^^^^^^^^", "------^--------", "------^----X--X", "------^---XX--X", "------^--XXX--X", "#--------X#*--*", "------&--XXX--X", "----------XX--X", "-----------X--X", "---------------", "---^^^^^^^^^^^^"], "14_2_1": ["---^^^^^^^^^^^^", "------^--------", "------^----X--X", "------^---XX--X", "------^--XXX--X", "#--------X#*--*", "------&--XXX--X", "----------XX--X", "-----------X--X", "---------------", "---^^^^^^^^^^^^"], "14_0_0": ["^^^^^^^^^^^^^^^", "&-----^--^--X--", "------^--^--X--", "^^----^--^--X--", "^^^^--^--^--X--", "------------X--", "^^^^--&--&--X--", "^^----------X--", "------------X--", "&-----------#--", "^^^^^^^^^^^^^^^"], "14_0_1": ["^^^^^^^^^^^^^^^", "&-----^--^--X--", "------^--^--X--", "^^----^--^--X--", "^^^^--^--^--X--", "------------X--", "^^^^--&--&--X--", "^^----------X--", "------------X--", "&-----------#--", "^^^^^^^^^^^^^^^"], "14_0_2": ["^^^^^^^^^^^^^^^", "-----^^---^^^--", "----------^^^--", "--X--^^----&---", "*-X--^^---^^^--", "XXX--^^---^^^--", "*-X--^^---^^^--", "--X--^^----&---", "----------^^^--", "-----^^---^^^--", "^^^^^^^^^^^^^^^"], "15_1_0": ["-^^^^^^^^^^^^^^", "-^^----------*-", "-^^----X-------", "-^^---XX----^^^", "-----XXX--^^^^^", "-^^--X#*-----&-", "-----XXX--^^^^^", "-^^---XX----^^^", "-^^----X-------", "-^^----------*-", "-^^^^^^^^^^^^^^"], "15_1_1": ["-^^^^^^^^^^^^^^", "-^^----------*-", "-^^----X-------", "-^^---XX----^^^", "-----XXX--^^^^^", "-^^--X#*-----&-", "-----XXX--^^^^^", "-^^---XX----^^^", "-^^----X-------", "-^^----------*-", "-^^^^^^^^^^^^^^"], "15_1_2": ["^^^^^^^^^^^^^^^", "#X--------X---&", "XX--------X--^^", "X---------X--^^", "----------X--^^", "----------X--^^", "-------X--X--^^", "-------X--X--^^", "-------X--X--^^", "-------X--#---&", "^^^^^^^^^^^^^^^"], "13_1_0": ["----^^^^^^^^^^^", "--------------*", "--------X------", "-------XX----^^", "------XXX--^^^^", "#-----X#*-----&", "------XXX--^^^^", "-------XX----^^", "--------X------", "--------------*", "----^^^^^^^^^^^"], "13_1_1": ["----^^^^^^^^^^^", "--------------*", "--------X------", "-------XX----^^", "------XXX--^^^^", "#-----X#*-----&", "------XXX--^^^^", "-------XX----^^", "--------X------", "--------------*", "----^^^^^^^^^^^"], "13_1_2": ["^^^^^^^^^^^^^^^", "---X----&------", "^-------X------", "^-------X------", "^-------X--^^^^", "^-------X------", "^-------X--^^^^", "^-------X------", "^-------X------", "--------X------", "^^^^^^^^^^^^^^^"], "4_3_0": ["------#---X--^^", "------XX--X----", "------XX--X----", "------XX--X----", "------XX--X----", "---#------X----", "------XX--X----", "/\\\\---XX--X----", "\\//---XX--X----", "------XX--X----", "*-----#---&--^^"], "4_3_1": ["------#---X--^^", "------XX--X----", "------XX--X----", "------XX--X----", "------XX--X----", "---#------X----", "------XX--X----", "/\\\\---XX--X----", "\\//---XX--X----", "------XX--X----", "*-----#---&--^^"], "4_3_2": ["^^----X----X--^", "--------------^", "------X----X--^", "-----XX---XX---", "----XXX--XXX--^", "----X#&--X#&--^", "----XXX--XXX--^", "-----XX---XX---", "------X----X--^", "--------------^", "^^----X----X--^"], "4_4_0": ["---------XXX^^^", "------------^^^", "---------------", "---------XXX---", "---------XXX^^^", "---#--&--XXX^^^", "---------XXX^^^", "/\\\\------XXX^^^", "\\//------XXX^^^", "---------XXX^^^", "*--------XXX^^^"], "4_4_1": ["---------XXX^^^", "------------^^^", "---------------", "---------XXX---", "---------XXX^^^", "---#--&--XXX^^^", "---------XXX^^^", "/\\\\------XXX^^^", "\\//------XXX^^^", "---------XXX^^^", "*--------XXX^^^"], "4_4_2": ["XXX^^^^^------X", "XXX^^^^^------X", "XXX^^^^^------X", "XXX^^^^^------X", "XXX^^^^^------X", "XXX^^^^^------X", "XXX--^^^------X", "X--------------", "---^^----------", "-XX^^^^^------X", "XXX^^^^^------X"], "4_2_0": ["------#------^^", "------XX-------", "------XX-------", "------XX-------", "------XX-------", "---#------&----", "------XX-------", "/\\\\---XX-------", "\\//---XX-------", "------XX-------", "*-----#------^^"], "4_2_1": ["------#------^^", "------XX-------", "------XX-------", "------XX-------", "------XX-------", "---#------&----", "------XX-------", "/\\\\---XX-------", "\\//---XX-------", "------XX-------", "*-----#------^^"], "5_3_0": ["------#---XXXXX", "------XX----^^^", "------XX----^^^", "------XX----^^^", "------XX----^^^", "---#---------&-", "------XX----^^^", "/\\\\---XX----^^^", "\\//---XX----^^^", "------XX----^^^", "*-----#---XXXXX"], "5_3_1": ["------#---XXXXX", "------XX----^^^", "------XX----^^^", "------XX----^^^", "------XX----^^^", "---#---------&-", "------XX----^^^", "/\\\\---XX----^^^", "\\//---XX----^^^", "------XX----^^^", "*-----#---XXXXX"], "3_3_0": ["------#---X----", "------XX--X--^-", "------XX--X----", "------XX--X--^-", "------XX--X----", "---#------X--^-", "------XX--X----", "/\\\\---XX--X--^-", "\\//---XX--X----", "------XX--X--^-", "*-----#---&----"], "3_3_1": ["------#---X----", "------XX--X--^-", "------XX--X----", "------XX--X--^-", "------XX--X----", "---#------X--^-", "------XX--X----", "/\\\\---XX--X--^-", "\\//---XX--X----", "------XX--X--^-", "*-----#---&----"], "3_3_2": ["XXX------------", "---------------", "---------------", "---------X---X-", "--------^X---X^", "-------^^XXXXX^", "--------^X---X^", "---------X---X-", "---------------", "^--------//\\\\--", "XXX------\\\\//--"], "0_8_0": ["----#---X--XXXX", "\\\\--XX--X--XXXX", "//--XX--X--XXXX", "----XX--X--XXXX", "----XX--X--XXXX", "--------X--XXXX", "----XX--X--XXXX", "----XX--X----XX", "&---XX--X------", "----XX--X--XX--", "----#---&--XXXX"], "0_8_1": ["----#---X--XXXX", "\\\\--XX--X--XXXX", "//--XX--X--XXXX", "----XX--X--XXXX", "----XX--X--XXXX", "--------X--XXXX", "----XX--X--XXXX", "----XX--X----XX", "&---XX--X------", "----XX--X--XX--", "----#---&--XXXX"], "0_8_2": ["XXX---XXXXXXXXX", "#XX----XXXXXXXX", "-XX-------XXXXX", "-XX------------", "----------XXXXX", "---------------", "----------XXXXX", "-XX------------", "-XX-------XXXXX", "-XX----XXXXXXXX", "XXX---XXXXXXXXX"], "0_9_0": ["----#----XXXXXX", "\\\\--XX---XXXXXX", "//--XX---XXXXXX", "----XX---XXXXXX", "----XX---------", "-----------XXXX", "----XX-----XXXX", "----XX---XXXXXX", "&---XX---XXXXXX", "----XX---XXXXXX", "----#----XXXXXX"], "0_9_1": ["----#----XXXXXX", "\\\\--XX---XXXXXX", "//--XX---XXXXXX", "----XX---XXXXXX", "----XX---------", "-----------XXXX", "----XX-----XXXX", "----XX---XXXXXX", "&---XX---XXXXXX", "----XX---XXXXXX", "----#----XXXXXX"], "0_9_2": ["----XXXX--XXXX-", "-X--XXXX--XXXX-", "-X--XXXX--XXXX-", "-X--XXXX--XXXX-", "-X--XXXX--XXXX-", "XX--XXXX--XXXX-", "-X--------XXXX-", "-X----------XX-", "-X--XXXX-------", "-X--XXXX--XX---", "----XXXX--XXXX-"], "0_7_0": ["----#---X---XXX", "\\\\--XX--X---XXX", "//--XX--X---XXX", "----XX--X---XXX", "----XX--X---XX-", "--------X---XX-", "----XX--X------", "----XX--X---XXX", "&---XX--X---XXX", "----XX--X---XXX", "----#---&---XXX"], "0_7_1": ["----#---X---XXX", "\\\\--XX--X---XXX", "//--XX--X---XXX", "----XX--X---XXX", "----XX--X---XX-", "--------X---XX-", "----XX--X------", "----XX--X---XXX", "&---XX--X---XXX", "----XX--X---XXX", "----#---&---XXX"], "0_7_2": ["XXXXXXXXXXXXXXX", "------XXXXXXXXX", "-----------XX--", "------XXX------", "-----------XX--", "------XXX------", "-----------XX--", "---^--XXX------", "---^-------XX--", "---^--XXXXXXXXX", "XXXXXXXXXXXXXXX"], "1_8_0": ["--------XXXXXXX", "--------XXXXXXX", "--------XXXXXXX", "--------XXXXXXX", "---------------", "---#------&--XX", "-------------XX", "/\\\\-----XXXXXXX", "\\//-----XXXXXXX", "--------XXXXXXX", "*-------XXXXXXX"], "1_8_1": ["--------XXXXXXX", "--------XXXXXXX", "--------XXXXXXX", "--------XXXXXXX", "---------------", "---#------&--XX", "-------------XX", "/\\\\-----XXXXXXX", "\\//-----XXXXXXX", "--------XXXXXXX", "*-------XXXXXXX"], "1_8_2": ["XX------&------", "XX-------------", "XX---XXXXXXX---", "XX#--XXXXXXX---", "XX---XXXXXXX---", "XX---XXXXXXX---", "XX-----XXX-----", "XXXX---XXX-#-XX", "--XX---XXX---XX", "-------XXX-----", "-------XXX-----"], "3_10_0": ["------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "-----------#XXX", "---#----&---XXX", "-------------*-", "/\\\\---XXXXXXXXX", "\\//---XXXXXXXXX", "------XXXXXXXXX", "*-----XXXXXXXXX"], "3_10_1": ["------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "-----------#XXX", "---#----&---XXX", "-------------*-", "/\\\\---XXXXXXXXX", "\\//---XXXXXXXXX", "------XXXXXXXXX", "*-----XXXXXXXXX"], "3_10_2": ["^^^--XXXXXXXXXX", "-----XXXXXXXXXX", "-----XXXXXXXXXX", "-----XXXXXXXXXX", "-----XX---&----", "-----XX------#-", "---------------", "-----XXXXXXXXXX", "-----XXXXXXXXXX", "-----XXXXXXXXXX", "^^^--XXXXXXXXXX"], "3_11_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "------------#XX", "-------------XX", "------#--#----*", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "3_11_1": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "------------#XX", "-------------XX", "------#--#----*", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "3_9_0": ["------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "---------------", "---#----&------", "-----------#--#", "/\\\\---XXXXXXXXX", "\\//---XXXXXXXXX", "------XXXXXXXXX", "*-----XXXXXXXXX"], "3_9_1": ["------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "---------------", "---#----&------", "-----------#--#", "/\\\\---XXXXXXXXX", "\\//---XXXXXXXXX", "------XXXXXXXXX", "*-----XXXXXXXXX"], "3_9_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXX--^^", "X--XX--XX------", "X--XX--XX------", "X--XX--XX------", "---------------", "X--XX--XX------", "X--XX--XX------", "X*&XX*&XX------", "XXXXXXXXXXX--^^", "XXXXXXXXXXXXXXX"], "4_10_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXX-", "//--XXXXXXXXXX-", "----XXXXXXXXXX-", "------*---*----", "---------------", "-------#---#---", "----XXXXXXXXXX-", "&---XXXXXXXXXX-", "----XXXXXXXXXX*", "----XXXXXXXXXXX"], "4_10_1": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXX-", "//--XXXXXXXXXX-", "----XXXXXXXXXX-", "------*---*----", "---------------", "-------#---#---", "----XXXXXXXXXX-", "&---XXXXXXXXXX-", "----XXXXXXXXXX*", "----XXXXXXXXXXX"], "2_10_0": ["------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XX-----#X", "---#--XX--&---X", "---------------", "/\\\\---XXXXXXXXX", "\\//---XXXXXXXXX", "------XXXXXXXXX", "*-----XXXXXXXXX"], "2_10_1": ["------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XX-----#X", "---#--XX--&---X", "---------------", "/\\\\---XXXXXXXXX", "\\//---XXXXXXXXX", "------XXXXXXXXX", "*-----XXXXXXXXX"], "15_2_0": ["---^^^^^^^^^^^^", "----------^----", "-------X--^--X-", "------XX--^--XX", "-----XXX--^--XX", "#----X#*-----*#", "-----XXX--&--XX", "------XX-----XX", "-------X-----X-", "---------------", "---^^^^^^^^^^^^"], "15_2_1": ["---^^^^^^^^^^^^", "----------^----", "-------X--^--X-", "------XX--^--XX", "-----XXX--^--XX", "#----X#*-----*#", "-----XXX--&--XX", "------XX-----XX", "-------X-----X-", "---------------", "---^^^^^^^^^^^^"], "15_0_0": ["^^^^^^^^^^^^^^^", "&--------*----*", "---------------", "^^------^^^--^^", "^^^^--^^^^^^^^^", "---------&----&", "^^^^--^^^^^^^^^", "^^------^^^--^^", "---------------", "&--------*----*", "^^^^^^^^^^^^^^^"], "15_0_1": ["^^^^^^^^^^^^^^^", "&--------*----*", "---------------", "^^------^^^--^^", "^^^^--^^^^^^^^^", "---------&----&", "^^^^--^^^^^^^^^", "^^------^^^--^^", "---------------", "&--------*----*", "^^^^^^^^^^^^^^^"], "4_1_0": ["---------X--^-^", "---------X----^", "---------X-----", "---------X-----", "---------X-----", "---#-----X-----", "---------X-----", "/\\\\------X-----", "\\//------X-----", "------*--X----^", "*--------&--^-^"], "4_1_1": ["---------X--^-^", "---------X----^", "---------X-----", "---------X-----", "---------X-----", "---#-----X-----", "---------X-----", "/\\\\------X-----", "\\//------X-----", "------*--X----^", "*--------&--^-^"], "4_1_2": ["-^^^-----&---^^", "-^^^-----X---^^", "-^^^--&--X---^^", "-^^^-----X---^^", "-^^^-----X---^^", "-^^^-----X---^^", "-^^^-----X---^^", "-^^^-----X---^^", "--&------X-----", "---------X-----", "-^^^-----X---^^"], "4_0_0": ["------------^-^", "--------------^", "---------------", "---------------", "---------------", "---#-----&-----", "---------------", "/\\\\------------", "\\//------------", "------*-------^", "*-----------^-^"], "4_0_1": ["------------^-^", "--------------^", "---------------", "---------------", "---------------", "---#-----&-----", "---------------", "/\\\\------------", "\\//------------", "------*-------^", "*-----------^-^"], "4_0_2": ["-----------^^^-", "---^-------^^^-", "-----------^^^-", "---^-------^^^-", "-----------^^^-", "---^--------*--", "-----------^^^-", "---^-------^^^-", "-----------^^^-", "---^-------^^^-", "-----------^^^-"], "5_1_0": ["---------X----^", "---------X--^-*", "---------X----^", "---------X--^--", "---------X----^", "---#-----X--^-&", "---------X----^", "/\\\\------X--^--", "\\//------X----^", "------*--X--^-*", "*--------&----^"], "5_1_1": ["---------X----^", "---------X--^-*", "---------X----^", "---------X--^--", "---------X----^", "---#-----X--^-&", "---------X----^", "/\\\\------X--^--", "\\//------X----^", "------*--X--^-*", "*--------&----^"], "5_1_2": ["^^^-----#--^-^-", "--------X----^-", "--------X------", "--------X------", "--------X------", "--------X------", "-----&--X------", "--------X------", "--------X------", "--------X----^-", "^^^-----X--^-^-"], "3_1_0": ["---------------", "---------------", "------------#--", "---------------", "---------------", "---#-----&-----", "---------------", "/\\\\------------", "\\//------------", "------*------//", "*------------\\\\"], "3_1_1": ["---------------", "---------------", "------------#--", "---------------", "---------------", "---#-----&-----", "---------------", "/\\\\------------", "\\//------------", "------*------//", "*------------\\\\"], "3_1_2": ["^^^^------XX---", "^^^^------XX---", "^^^^------XX---", "^^-----&--XX---", "----------XX---", "--^^------XX---", "^^^^------XX---", "^^^^------XX---", "^^^^-----------", "^^^^-----------", "^^^^-----------"], "9_4_0": ["----^^^^^^^^^^^", "\\\\-------------", "//-------------", "------X--X----X", "------X--X^---X", "------XXXX^^--X", "------X--X^---X", "------X--X----X", "&--------//\\\\//", "---------\\\\//\\\\", "----^^^^^^^^^^^"], "9_4_1": ["----^^^^^^^^^^^", "\\\\-------------", "//-------------", "------X--X----X", "------X--X^---X", "------XXXX^^--X", "------X--X^---X", "------X--X----X", "&--------//\\\\//", "---------\\\\//\\\\", "----^^^^^^^^^^^"], "9_5_0": ["------^^^^^^^^^", "--------X--X--X", "X-------X--X--X", "XXX-----X--X--X", "-XX-----X--X--X", "-XX-----X--X-#X", "-XX-----X--X--X", "#XX-----X--X--X", "-XX-----X--X--X", "-XX------------", "-XX---^^^^^^^^^"], "9_5_1": ["------^^^^^^^^^", "--------X--X--X", "X-------X--X--X", "XXX-----X--X--X", "-XX-----X--X--X", "-XX-----X--X-#X", "-XX-----X--X--X", "#XX-----X--X--X", "-XX-----X--X--X", "-XX------------", "-XX---^^^^^^^^^"], "9_5_2": ["^^^^^^^^^^--XXX", "-------------XX", "---------------", "X----XXX-------", "X^---X*X-------", "X^^--X&--------", "X^---X*X-------", "X----XXX-------", "//\\\\//\\\\-------", "\\\\//\\\\//-----XX", "^^^^^^^^^^--XXX"], "9_3_0": ["------^^^^^^^^^", "--------X--X--X", "--------X--X--X", "--------X-----X", "--------X------", "---#----X------", "--------X------", "/\\\\-----X---//\\", "\\//-----X---\\\\/", "---------------", "*-----^^^^^^^^^"], "9_3_1": ["------^^^^^^^^^", "--------X--X--X", "--------X--X--X", "--------X-----X", "--------X------", "---#----X------", "--------X------", "/\\\\-----X---//\\", "\\//-----X---\\\\/", "---------------", "*-----^^^^^^^^^"], "9_3_2": ["^^^^^^^^^^^--XX", "---X----&----XX", "^-------X----XX", "^-------X----XX", "^-------X----XX", "^-------X----XX", "^-------X----XX", "^-------X----XX", "^-------X------", "--------X------", "^^^^^^^^^^^----"], "10_4_0": ["------^^^^^^^^^", "--------------&", "X----------X--X", "XXX-------XX--X", "-XX------XXX--X", "-XX------X#*--X", "-XX------XXX--X", "#XX-------XX--X", "-XX--------X--X", "-XX-----------X", "-XX---^^^^^^^^^"], "10_4_1": ["------^^^^^^^^^", "--------------&", "X----------X--X", "XXX-------XX--X", "-XX------XXX--X", "-XX------X#*--X", "-XX------XXX--X", "#XX-------XX--X", "-XX--------X--X", "-XX-----------X", "-XX---^^^^^^^^^"], "8_4_0": ["----#---^^^^^^^", "\\\\--XX-----X--X", "//--XX-----X--X", "----XX-----X--X", "----XX-----X--X", "-----------X-#X", "----XX-----X--X", "----XX-----X--X", "&---XX-----X--X", "----XX---------", "----#---^^^^^^^"], "8_4_1": ["----#---^^^^^^^", "\\\\--XX-----X--X", "//--XX-----X--X", "----XX-----X--X", "----XX-----X--X", "-----------X-#X", "----XX-----X--X", "----XX-----X--X", "&---XX-----X--X", "----XX---------", "----#---^^^^^^^"], "8_4_2": ["XXXXXXXXXXXXXXX", "---------------", "---------------", "----X----------", "----X^----^^^^^", "XXXXX^^--------", "*#*-X^----^^^^^", "-&--X----------", "---------------", "---------------", "XXXXXXXXXXXXXXX"], "4_5_0": ["------#---XXXXX", "------XX-------", "------XX-----X-", "------XX-----XX", "------XX-----XX", "---#--------&*#", "------XX-----XX", "/\\\\---XX-----XX", "\\//---XX-----X-", "------XX-------", "*-----#---XXXXX"], "4_5_1": ["------#---XXXXX", "------XX-------", "------XX-----X-", "------XX-----XX", "------XX-----XX", "---#--------&*#", "------XX-----XX", "/\\\\---XX-----XX", "\\//---XX-----X-", "------XX-------", "*-----#---XXXXX"], "4_5_2": ["XXXXXXXXXXXXXXX", "--X--------^^^-", "--X--------^^^-", "--X---XXX--^^^-", "--X---X*X------", "-#X---X&---^^^-", "--X---X*X------", "--X---XXX--^^^-", "--X--------^^^-", "-----------^^^-", "XXXXXXXXXXXXXXX"], "5_4_0": ["------XXX--^^^^", "------XXX----^-", "------XXX----^-", "------XXX----^-", "------XXX----^-", "---#--XXX------", "------XXX----&-", "/\\\\---XXX------", "\\//------------", "---------------", "*-----XXX--^^^^"], "5_4_1": ["------XXX--^^^^", "------XXX----^-", "------XXX----^-", "------XXX----^-", "------XXX----^-", "---#--XXX------", "------XXX----&-", "/\\\\---XXX------", "\\//------------", "---------------", "*-----XXX--^^^^"], "3_4_0": ["---------X--XXX", "---------X--XXX", "---------X--XXX", "---------X--XXX", "---------X-----", "---#-----X-----", "---------X----#", "/\\\\------X--XXX", "\\//------X--XXX", "------*--X--XXX", "*--------&--XXX"], "3_4_1": ["---------X--XXX", "---------X--XXX", "---------X--XXX", "---------X--XXX", "---------X-----", "---#-----X-----", "---------X----#", "/\\\\------X--XXX", "\\//------X--XXX", "------*--X--XXX", "*--------&--XXX"], "3_4_2": ["---------------", "----//\\\\--//\\\\-", "----\\\\//--\\\\//-", "---------------", "^--------------", "^^-------------", "^--------------", "------X&X---X&X", "------X-X---X-X", "------X#X---X#X", "------XXX---XXX"], "8_5_0": ["-----#---^^^^^^", "-----XX----^--X", "X----XX----^--X", "XXX--XX----^--X", "-XX--XX----^--X", "-XX-----------X", "-XX--XX----&--X", "#XX--XX-------X", "-XX--XX-------X", "-XX--XX-------#", "-XX--#---^^^^^^"], "8_5_1": ["-----#---^^^^^^", "-----XX----^--X", "X----XX----^--X", "XXX--XX----^--X", "-XX--XX----^--X", "-XX-----------X", "-XX--XX----&--X", "#XX--XX-------X", "-XX--XX-------X", "-XX--XX-------#", "-XX--#---^^^^^^"], "0_6_0": ["----#---X--X--X", "\\\\--XX--X--X--X", "//--XX--X--X--X", "----XX--X--X--X", "----XX--X--X--X", "--------X--X--X", "----XX--X--X--X", "----XX--X--X--X", "&---XX--X--X--X", "----XX--X--X--X", "----#---&--&--&"], "0_6_1": ["----#---X--X--X", "\\\\--XX--X--X--X", "//--XX--X--X--X", "----XX--X--X--X", "----XX--X--X--X", "--------X--X--X", "----XX--X--X--X", "----XX--X--X--X", "&---XX--X--X--X", "----XX--X--X--X", "----#---&--&--&"], "0_6_2": ["XXXXXXXXXXXXXXX", "---------------", "*X--XX---------", "XX------X---X--", "----XX--X---X--", "--------XXXXX--", "----XX--X---X--", "--------X---X--", "----XX---------", "---------------", "XXXXXXXXXXXXXXX"], "0_5_0": ["----#---X--X--X", "\\\\--XX--X--X--X", "//--XX--X--X--X", "----XX--X--X--X", "----XX--X--X--X", "--------X--X--X", "----XX--X--X--X", "----XX--X--X---", "&---XX--X--X---", "----XX--X--X--X", "----#---&--&--X"], "0_5_1": ["----#---X--X--X", "\\\\--XX--X--X--X", "//--XX--X--X--X", "----XX--X--X--X", "----XX--X--X--X", "--------X--X--X", "----XX--X--X--X", "----XX--X--X---", "&---XX--X--X---", "----XX--X--X--X", "----#---&--&--X"], "0_5_2": ["---------X-----", "/\\\\-X----X-//\\\\", "\\//-X----X-\\\\//", "----X----X-----", "&---X----------", "XXXXX----------", "&---X----------", "----X----X-----", "/\\\\-X----X-//\\\\", "\\//-X----X-\\\\//", "---------X-----"], "1_6_0": ["----------XXXXX", "----------XXXXX", "----------XXXXX", "----------XXXXX", "----------XXXXX", "---#--&---XXXXX", "----------XXX--", "/\\\\------------", "\\//----------XX", "----------XXXXX", "*---------XXXXX"], "1_6_1": ["----------XXXXX", "----------XXXXX", "----------XXXXX", "----------XXXXX", "----------XXXXX", "---#--&---XXXXX", "----------XXX--", "/\\\\------------", "\\//----------XX", "----------XXXXX", "*---------XXXXX"], "1_6_2": ["XXXXXXXXXXXXXXX", "-X-------X-----", "-X--X----X-----", "-X--X----X-----", "----X----X-----", "----X----------", "----X---------/", "-X--XX--------\\", "-X--XXX--------", "-X-&*#X--&-----", "XXXXXXXXXXXXXXX"], "3_2_0": ["------#--------", "------XX-----^-", "------XX-------", "------XX-----^-", "------XX-------", "---#------&--^-", "------XX-------", "/\\\\---XX-----^-", "\\//---XX-------", "------XX-----^-", "*-----#--------"], "3_2_1": ["------#--------", "------XX-----^-", "------XX-------", "------XX-----^-", "------XX-------", "---#------&--^-", "------XX-------", "/\\\\---XX-----^-", "\\//---XX-------", "------XX-----^-", "*-----#--------"], "3_0_0": ["---------------", "---------------", "-------------#-", "---------------", "---------------", "---#-----&-----", "---------------", "/\\\\------------", "\\//------------", "------*-------/", "*-------------\\"], "3_0_1": ["---------------", "---------------", "-------------#-", "---------------", "---------------", "---#-----&-----", "---------------", "/\\\\------------", "\\//------------", "------*-------/", "*-------------\\"], "3_0_2": ["---------------", "----------#----", "*---#----------", "---------------", "---------------", "---------------", "-------#-------", "---------------", "---------------", "-----//\\\\------", "-----\\\\//------"], "2_1_0": ["---------X-----", "---------X-----", "---------X-----", "---------X-----", "---------X-----", "---#-----X--&--", "---------X-----", "/\\\\------X-----", "\\//------X-----", "------*--X-----", "*--------&-----"], "2_1_1": ["---------X-----", "---------X-----", "---------X-----", "---------X-----", "---------X-----", "---#-----X--&--", "---------X-----", "/\\\\------X-----", "\\//------X-----", "------*--X-----", "*--------&-----"], "1_4_0": ["---------X---XX", "---------X---XX", "---------X---XX", "---------X---XX", "---------X---XX", "---#--&--X---XX", "---------X---XX", "/\\\\------X-----", "\\//------X-----", "---------X---XX", "*--------&---XX"], "1_4_1": ["---------X---XX", "---------X---XX", "---------X---XX", "---------X---XX", "---------X---XX", "---#--&--X---XX", "---------X---XX", "/\\\\------X-----", "\\//------X-----", "---------X---XX", "*--------&---XX"], "1_4_2": ["---XXX--X----^^", "---XXX--X----^^", "----&---X----^^", "--------X----^^", "X--XXX--X------", "X--XXX--X-&----", "X--XXX--X----^^", "---XXX--X----^^", "---XXX--X----^^", "---XXX--X----^^", "---XXX-------^^"], "1_5_0": ["---------X--XXX", "---------X--XXX", "---------X--XXX", "---------X--XXX", "---------X--XXX", "---#--&--X--XXX", "---------X--XXX", "/\\\\------X-----", "\\//------X-----", "---------X--XX-", "*--------&--XXX"], "1_5_1": ["---------X--XXX", "---------X--XXX", "---------X--XXX", "---------X--XXX", "---------X--XXX", "---#--&--X--XXX", "---------X--XXX", "/\\\\------X-----", "\\//------X-----", "---------X--XX-", "*--------&--XXX"], "1_3_0": ["---------X--X--", "---------X--X--", "---------X--X--", "---------X--X--", "---------X--X--", "---#--&--X--X--", "---------X--X--", "/\\\\------X--X--", "\\//------X--X--", "---------X--X--", "*--------&--&--"], "1_3_1": ["---------X--X--", "---------X--X--", "---------X--X--", "---------X--X--", "---------X--X--", "---#--&--X--X--", "---------X--X--", "/\\\\------X--X--", "\\//------X--X--", "---------X--X--", "*--------&--&--"], "1_3_2": ["---&-----------", "---X--X-----#--", "---X--X--------", "---X--X--------", "---X--X-----*--", "---X--XXXXXXXXX", "---X--X--&--*--", "---X--X--------", "---X--X--------", "---X--X-----#--", "---X-----------"], "2_4_0": ["------#---X---X", "------XX--X---X", "------XX--X---X", "------XX--X---X", "------XX--X---X", "---#------X---X", "------XX--X---X", "/\\\\---XX--X----", "\\//---XX--X----", "------XX--X---X", "*-----#---&---X"], "2_4_1": ["------#---X---X", "------XX--X---X", "------XX--X---X", "------XX--X---X", "------XX--X---X", "---#------X---X", "------XX--X---X", "/\\\\---XX--X----", "\\//---XX--X----", "------XX--X---X", "*-----#---&---X"], "2_4_2": ["XXXXXXXXXXXXXXX", "-------------X-", "*X-----------X-", "XX-----------X-", "-------------X-", "---------------", "---------------", "-----^----^----", "-----^----^----", "-----^----^--&-", "XXXXXXXXXXXXXXX"], "0_4_0": ["----#---X--X---", "\\\\--XX--X--X---", "//--XX--X--X---", "----XX--X--X---", "----XX--X--X---", "--------X--X--&", "----XX--X--X---", "----XX--X--X---", "&---XX--X--X---", "----XX--X--X---", "----#---&--&---"], "0_4_1": ["----#---X--X---", "\\\\--XX--X--X---", "//--XX--X--X---", "----XX--X--X---", "----XX--X--X---", "--------X--X--&", "----XX--X--X---", "----XX--X--X---", "&---XX--X--X---", "----XX--X--X---", "----#---&--&---"], "0_4_2": ["^--------XX----", "------X--XX----", "^-----X--XX----", "^--X--X--XX----", "^--X--X--------", "^--XXXX--------", "^--X--X--XX----", "^--X--X--XX----", "^-----X--XX----", "------X--XX----", "^--------XX----"], "7_1_0": ["-----------^^^^", "---------------", "---------------", "--------------X", "-------------XX", "---#---------X#", "-------------XX", "/\\\\-----------X", "\\//------------", "------*--------", "*----------^^^^"], "7_1_1": ["-----------^^^^", "---------------", "---------------", "--------------X", "-------------XX", "---#---------X#", "-------------XX", "/\\\\-----------X", "\\//------------", "------*--------", "*----------^^^^"], "7_1_2": ["XXXX--^^^^^-^-^", "--------^---^-^", "X-------^-----^", "X-------^------", "X-------^------", "*&-------------", "X-------&------", "X--------------", "X-------------^", "------------^-^", "XXXX--^^^^^-^-^"], "6_0_0": ["------------^--", "------------^--", "------------^--", "------------^^^", "---------------", "---#-----&-----", "---------------", "/\\\\------------", "\\//----------#-", "------*--------", "*--------------"], "6_0_1": ["------------^--", "------------^--", "------------^--", "------------^^^", "---------------", "---#-----&-----", "---------------", "/\\\\------------", "\\//----------#-", "------*--------", "*--------------"], "6_0_2": ["X--^^^----^^^--", "---^^^----^^^--", "X---&-----^^^--", "---^^^----^^^--", "X--^^^-----&---", "---^^^---------", "X--^^^----^^^--", "---^^^----^^^--", "X---*-----^^^--", "---^^^----^^^--", "X--^^^----^^^--"], "15_3_0": ["--^^^^^^^^^^^^^", "---------^-----", "------X--^----X", "-----XX--^---XX", "----XXX--^--XXX", "----X#*-----X#*", "----XXX--&--XXX", "-----XX------XX", "------X-------X", "---------------", "--^^^^^^^^^^^^^"], "15_3_1": ["--^^^^^^^^^^^^^", "---------^-----", "------X--^----X", "-----XX--^---XX", "----XXX--^--XXX", "----X#*-----X#*", "----XXX--&--XXX", "-----XX------XX", "------X-------X", "---------------", "--^^^^^^^^^^^^^"], "15_3_2": ["^^^^^^^^^^^^^^^", "------------^--", "----X-------^--", "XX--XX------^--", "*X--XXX--------", "&---*#X--------", "*X--XXX--------", "XX--XX---------", "\\\\--X----X-----", "//-------X-----", "^^^^^^^^^^^^^^^"], "16_2_0": ["^^^^^^^^^^^^^^^", "----X--X------*", "-X--X--X-------", "-X--X--X-----^^", "-X--X--X--^^^^^", "#X-#X-#X------&", "-X--X--X--^^^^^", "-X--X--X-----^^", "-X--X--X-------", "-X------------*", "^^^^^^^^^^^^^^^"], "16_2_1": ["^^^^^^^^^^^^^^^", "----X--X------*", "-X--X--X-------", "-X--X--X-----^^", "-X--X--X--^^^^^", "#X-#X-#X------&", "-X--X--X--^^^^^", "-X--X--X-----^^", "-X--X--X-------", "-X------------*", "^^^^^^^^^^^^^^^"], "5_2_0": ["------#----^^^-", "------XX---^^^-", "------XX---^^^-", "------XX---^^^-", "------XX---^^^-", "---#-------^^^-", "------XX---^^^-", "/\\\\---XX---^^^-", "\\//---XX----&--", "------XX-------", "*-----#----^^^-"], "5_2_1": ["------#----^^^-", "------XX---^^^-", "------XX---^^^-", "------XX---^^^-", "------XX---^^^-", "---#-------^^^-", "------XX---^^^-", "/\\\\---XX---^^^-", "\\//---XX----&--", "------XX-------", "*-----#----^^^-"], "13_0_0": ["---^^^^^^^^^^^^", "---------*----*", "---------------", "--------^^^--^^", "------^^^^^^^^^", "#--------&----&", "------^^^^^^^^^", "--------^^^--^^", "---------------", "---------*----*", "---^^^^^^^^^^^^"], "13_0_1": ["---^^^^^^^^^^^^", "---------*----*", "---------------", "--------^^^--^^", "------^^^^^^^^^", "#--------&----&", "------^^^^^^^^^", "--------^^^--^^", "---------------", "---------*----*", "---^^^^^^^^^^^^"], "13_0_2": ["^^^^^^^^^^^^^^^", "-^^^^^^^^^^^^^^", "-^^^^^^^^----^^", "-^^^^^^--------", "-^^^-----------", "--&------------", "-^^^-----------", "-^^^^^^--------", "-^^^^^^^^----^^", "-^^^^^^^^^^^^^^", "^^^^^^^^^^^^^^^"], "12_0_0": ["----^^^^^^^^^^^", "---------*----*", "---------------", "--------^^^--^^", "------^^^^^^^^^", "#--------&----&", "------^^^^^^^^^", "--------^^^--^^", "---------------", "---------*----*", "----^^^^^^^^^^^"], "12_0_1": ["----^^^^^^^^^^^", "---------*----*", "---------------", "--------^^^--^^", "------^^^^^^^^^", "#--------&----&", "------^^^^^^^^^", "--------^^^--^^", "---------------", "---------*----*", "----^^^^^^^^^^^"], "9_1_0": ["--------^^^^^^^", "----------^----", "----------^--X-", "----------^--XX", "----------^--XX", "---#---------*#", "----------&--XX", "/\\\\----------XX", "\\//----------X-", "---------------", "*-------^^^^^^^"], "9_1_1": ["--------^^^^^^^", "----------^----", "----------^--X-", "----------^--XX", "----------^--XX", "---#---------*#", "----------&--XX", "/\\\\----------XX", "\\//----------X-", "---------------", "*-------^^^^^^^"], "9_1_2": ["^^^^^^^^^^^----", "&----&---------", "---------------", "^^--^^^------XX", "^^^^^^^^^----XX", "-------------XX", "^^^^^^^^^----XX", "^^--^^^------XX", "-------------XX", "&----&-------XX", "^^^^^^^^^^^--XX"], "9_2_0": ["-------^^^^^^^^", "-----------X--X", "-----------X--X", "-----------X--X", "-----------X--X", "---#-------X-#X", "-----------X--X", "/\\\\--------X--X", "\\//--------X--X", "---------------", "*------^^^^^^^^"], "9_2_1": ["-------^^^^^^^^", "-----------X--X", "-----------X--X", "-----------X--X", "-----------X--X", "---#-------X-#X", "-----------X--X", "/\\\\--------X--X", "\\//--------X--X", "---------------", "*------^^^^^^^^"], "10_1_0": ["-------^^^^^^^^", "----------^----", "----------^--X-", "----------^--XX", "----------^--XX", "---#---------*#", "----------&--XX", "/\\\\----------XX", "\\//----------X-", "---------------", "*------^^^^^^^^"], "10_1_1": ["-------^^^^^^^^", "----------^----", "----------^--X-", "----------^--XX", "----------^--XX", "---#---------*#", "----------&--XX", "/\\\\----------XX", "\\//----------X-", "---------------", "*------^^^^^^^^"], "5_0_0": ["--------------^", "------------^-*", "--------------^", "------------^--", "--------------^", "---#-----&--^-&", "--------------^", "/\\\\---------^--", "\\//-----------^", "------*-----^-*", "*-------------^"], "5_0_1": ["--------------^", "------------^-*", "--------------^", "------------^--", "--------------^", "---#-----&--^-&", "--------------^", "/\\\\---------^--", "\\//-----------^", "------*-----^-*", "*-------------^"], "5_0_2": ["---^---^-------", "-^-*-^---^-----", "---^---^-------", "-^---^---^-----", "---^---^-------", "-^-&-^---^-----", "---^---^-------", "-^---^---^-----", "---^---^-------", "-^-*-^---^-----", "---^---^-------"], "6_4_0": ["------XXX--^^^^", "------XXX------", "------XXX------", "------XXX-----X", "------XXX----XX", "---#--XXX----X#", "------XXX----XX", "/\\\\---XXX-----X", "\\//------------", "---------------", "*-----XXX--^^^^"], "6_4_1": ["------XXX--^^^^", "------XXX------", "------XXX------", "------XXX-----X", "------XXX----XX", "---#--XXX----X#", "------XXX----XX", "/\\\\---XXX-----X", "\\//------------", "---------------", "*-----XXX--^^^^"], "6_2_0": ["------#---^^^--", "------XX--^^^--", "------XX--^^^--", "------XX--^^^--", "------XX---*---", "---#------^^^--", "------XX---&---", "/\\\\---XX--^^^--", "\\//---XX--^^^--", "------XX--^^^--", "*-----#---^^^--"], "6_2_1": ["------#---^^^--", "------XX--^^^--", "------XX--^^^--", "------XX--^^^--", "------XX---*---", "---#------^^^--", "------XX---&---", "/\\\\---XX--^^^--", "\\//---XX--^^^--", "------XX--^^^--", "*-----#---^^^--"], "2_6_0": ["------#---X--XX", "------XX--X--XX", "------XX--X--XX", "------XX--X--XX", "------XX--X--XX", "---#------X--XX", "------XX--X--XX", "/\\\\---XX--X----", "\\//---XX--X----", "------XX--X--XX", "*-----#---&--XX"], "2_6_1": ["------#---X--XX", "------XX--X--XX", "------XX--X--XX", "------XX--X--XX", "------XX--X--XX", "---#------X--XX", "------XX--X--XX", "/\\\\---XX--X----", "\\//---XX--X----", "------XX--X--XX", "*-----#---&--XX"], "2_6_2": ["XXXXXXXXXXXXXXX", "-X--#----------", "-X--X------X---", "----X------XX--", "----X------XXX-", "----X-----&*#X-", "----X------XXX-", "----X------XX--", "----X------X---", "----X----------", "XXXXXXXXXXXXXXX"], "2_7_0": ["------#---XXXXX", "------XX--XXXXX", "------XX--XXXXX", "------XX--XXXXX", "------XX-------", "---#--------&--", "------XX-------", "/\\\\---XX--XXXXX", "\\//---XX--XXXXX", "------XX--XXXXX", "*-----#---XXXXX"], "2_7_1": ["------#---XXXXX", "------XX--XXXXX", "------XX--XXXXX", "------XX--XXXXX", "------XX-------", "---#--------&--", "------XX-------", "/\\\\---XX--XXXXX", "\\//---XX--XXXXX", "------XX--XXXXX", "*-----#---XXXXX"], "2_7_2": ["-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "XX-------------", "XX-------------", "XX-------------", "XX-------------", "-----#---#----#", "---------------", "---------------"], "2_5_0": ["------#---X--X-", "------XX--X--X-", "------XX--X--X-", "------XX--X--X-", "------XX--X--X-", "---#------X--X-", "------XX--X--X-", "/\\\\---XX--X--X-", "\\//---XX--X--X-", "------XX--X--X-", "*-----#---&--&-"], "2_5_1": ["------#---X--X-", "------XX--X--X-", "------XX--X--X-", "------XX--X--X-", "------XX--X--X-", "---#------X--X-", "------XX--X--X-", "/\\\\---XX--X--X-", "\\//---XX--X--X-", "------XX--X--X-", "*-----#---&--&-"], "3_6_0": ["---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------------", "---#-------&---", "--------------#", "/\\\\------XXXXXX", "\\//------XXXXXX", "------*--XXXXXX", "*--------XXXXXX"], "3_6_1": ["---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------------", "---#-------&---", "--------------#", "/\\\\------XXXXXX", "\\//------XXXXXX", "------*--XXXXXX", "*--------XXXXXX"], "3_6_2": ["XXXXXXXXXXXXXXX", "---------------", "----X-------X--", "----XX------XX-", "----XXX-----XXX", "---&*#X----&*#X", "----XXX-----XXX", "----XX------XX-", "----X-------X--", "---------------", "XXXXXXXXXXXXXXX"], "1_7_0": ["---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---#--&--XXXXXX", "---------XXXXXX", "/\\\\----------XX", "\\//----------XX", "---------XX----", "*--------XXXXXX"], "1_7_1": ["---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---#--&--XXXXXX", "---------XXXXXX", "/\\\\----------XX", "\\//----------XX", "---------XX----", "*--------XXXXXX"], "1_7_2": ["XXXXXXX-----//\\", "XXXXXXX-----\\\\/", "XXXXXXX--------", "-XXXXXX-------#", "---------------", "--&------------", "---------------", "-XXXXXX--------", "XXXXXXX----#---", "XXXXXXX--------", "XXXXXXX--------"], "3_5_0": ["----------XXXXX", "----------XXXXX", "----------XXXXX", "----------XXXXX", "------------*--", "---#--&--------", "-------------#-", "/\\\\-------XXXXX", "\\//-------XXXXX", "----------XXXXX", "*---------XXXXX"], "3_5_1": ["----------XXXXX", "----------XXXXX", "----------XXXXX", "----------XXXXX", "------------*--", "---#--&--------", "-------------#-", "/\\\\-------XXXXX", "\\//-------XXXXX", "----------XXXXX", "*---------XXXXX"], "17_4_0": ["^^^^^^^^^^^^^^^", "----X--X--X--X-", "-X--X--X--X--X-", "-X--X--X--X--X-", "-X--X--X--X--X-", "#X-#X-#X-#X-#X-", "-X--X--X--X--X-", "-X--X--X--X--X-", "-X--X--X--X--X-", "-X-------------", "^^^^^^^^^^^^^^^"], "17_4_1": ["^^^^^^^^^^^^^^^", "----X--X--X--X-", "-X--X--X--X--X-", "-X--X--X--X--X-", "-X--X--X--X--X-", "#X-#X-#X-#X-#X-", "-X--X--X--X--X-", "-X--X--X--X--X-", "-X--X--X--X--X-", "-X-------------", "^^^^^^^^^^^^^^^"], "17_5_0": ["^^^^^^^^^^^^^^^", "--------------&", "----X------X--X", "XX--XX----XX--X", "*X--XXX--XXX--X", "&---*#X--X#*--X", "*X--XXX--XXX--X", "XX--XX----XX--X", "\\\\--X------X--X", "//------------X", "^^^^^^^^^^^^^^^"], "17_5_1": ["^^^^^^^^^^^^^^^", "--------------&", "----X------X--X", "XX--XX----XX--X", "*X--XXX--XXX--X", "&---*#X--X#*--X", "*X--XXX--XXX--X", "XX--XX----XX--X", "\\\\--X------X--X", "//------------X", "^^^^^^^^^^^^^^^"], "17_3_0": ["^^^^^^^^^^^^^^^", "----------^----", "-------X--^--X-", "--X---XX--^--XX", "*-X--XXX--^--XX", "XXX--X#*-----*#", "*-X--XXX--&--XX", "--X---XX-----XX", "-------X-----X-", "---------------", "^^^^^^^^^^^^^^^"], "17_3_1": ["^^^^^^^^^^^^^^^", "----------^----", "-------X--^--X-", "--X---XX--^--XX", "*-X--XXX--^--XX", "XXX--X#*-----*#", "*-X--XXX--&--XX", "--X---XX-----XX", "-------X-----X-", "---------------", "^^^^^^^^^^^^^^^"], "16_4_0": ["^^^^^^^^^^^^^^^", "-----X--X--X--X", "-----X--X--X--X", "--X--X--X--X--X", "*-X--X--X--X--X", "XXX--X-#X-#X-#X", "*-X--X--X--X--X", "--X--X--X--X--X", "-----X--X--X--X", "---------------", "^^^^^^^^^^^^^^^"], "16_4_1": ["^^^^^^^^^^^^^^^", "-----X--X--X--X", "-----X--X--X--X", "--X--X--X--X--X", "*-X--X--X--X--X", "XXX--X-#X-#X-#X", "*-X--X--X--X--X", "--X--X--X--X--X", "-----X--X--X--X", "---------------", "^^^^^^^^^^^^^^^"], "6_1_0": ["------------^^^", "--------------X", "--------------X", "--------------X", "--------------X", "---#-----&----X", "--------------X", "/\\\\-----------X", "\\//-----------X", "------*-------#", "*-----------^^^"], "6_1_1": ["------------^^^", "--------------X", "--------------X", "--------------X", "--------------X", "---#-----&----X", "--------------X", "/\\\\-----------X", "\\//-----------X", "------*-------#", "*-----------^^^"], "6_1_2": ["X--^^----^---^-", "X------^-*-^---", "---------^---^-", "-------^---^---", "X--------^---^-", "X------^-&-^---", "X--------^---^-", "X------^---^---", "X--------^---^-", "X------^-*-^---", "X--^^----^---^-"], "5_5_0": ["------^^^--XXXX", "------^^^--XXXX", "------^^^--XXXX", "------^^^--XXXX", "-------*---XXXX", "---#--^^^--XXXX", "-------&-----XX", "/\\\\---^^^------", "\\//---^^^--XX--", "------^^^--XXXX", "*-----^^^--XXXX"], "5_5_1": ["------^^^--XXXX", "------^^^--XXXX", "------^^^--XXXX", "------^^^--XXXX", "-------*---XXXX", "---#--^^^--XXXX", "-------&-----XX", "/\\\\---^^^------", "\\//---^^^--XX--", "------^^^--XXXX", "*-----^^^--XXXX"], "5_5_2": ["---------------", "---------------", "-----------^---", "---XX------^---", "---XX------^---", "---XX------^---", "#--XX--#-#-#-#-", "---XX----------", "---XX----------", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_6_0": ["----XXXXX--^^^^", "\\\\--XXXXX----X-", "//--XXXXX----X-", "----XXXXX----X-", "-------------X-", "-------------X-", "------#------X-", "----XXXXX----X-", "&---XXXXX----X-", "----XXXXX----#-", "----XXXXX--^^^^"], "5_6_1": ["----XXXXX--^^^^", "\\\\--XXXXX----X-", "//--XXXXX----X-", "----XXXXX----X-", "-------------X-", "-------------X-", "------#------X-", "----XXXXX----X-", "&---XXXXX----X-", "----XXXXX----#-", "----XXXXX--^^^^"], "5_6_2": ["XXXXXX^^^--^^^-", "XXXXXX^^^--^^^-", "XXXXXX^^^--^^^-", "XXXXXX^^^--^^^-", "XXXXXX^^^--^^^-", "XXXXXX^^^--^^^-", "----XX^^^--^^^-", "------^^^--^^^-", "XXXX--------&--", "XXXXXX---------", "XXXXXX^^^--^^^-"], "6_5_0": ["-----XXXX--^^^^", "\\\\---XXXX------", "//---XXXX----X-", "-----XXXX----XX", "-------------XX", "-------------*#", "-------*-----XX", "-----XXXX----XX", "&----XXXX----X-", "-----XXXX------", "-----XXXX--^^^^"], "6_5_1": ["-----XXXX--^^^^", "\\\\---XXXX------", "//---XXXX----X-", "-----XXXX----XX", "-------------XX", "-------------*#", "-------*-----XX", "-----XXXX----XX", "&----XXXX----X-", "-----XXXX------", "-----XXXX--^^^^"], "6_5_2": ["X^^XXXX^^------", "X^^XXXX^^---^^^", "X^^XXXX^^---^^^", "X^^XXXX^^---^^^", "X^^XXXX^^---^^^", "X^^----^^---^^^", "X-----------^^^", "---XXXX-----^^^", "-^^XXXX^^---^^^", "X^^XXXX^^---^^^", "X^^XXXX^^------"], "1_13_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXX--#XXXX", "----XXXX---XXXX", "------------*--", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "1_13_1": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXX--#XXXX", "----XXXX---XXXX", "------------*--", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "1_13_2": ["XXXXXXXXXXXX---", "XXXXXXXXXXXX---", "XXXXXXXXXXXX---", "XXXXXXXXXXXX---", "---------------", "XXXXXXX--------", "XXXXXXX--#-----", "XXXXXXXXXXXX---", "XXXXXXXXXXXX---", "XXXXXXXXXXXX---", "XXXXXXXXXXXX*--"], "1_14_0": ["--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "---------#XXXX-", "----XXX---XXXX-", "----XXX----*---", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX"], "1_14_1": ["--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "---------#XXXX-", "----XXX---XXXX-", "----XXX----*---", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX"], "1_12_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "---------#XXXX-", "------&---XXXX-", "-----------*---", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "1_12_1": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "---------#XXXX-", "------&---XXXX-", "-----------*---", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "1_12_2": ["XXXXXXXXXXXXXXX", "XX*&XXXXXXXXXXX", "XX--XXXXXXXXXX-", "XX--XXXXXXXXX--", "---------------", "-----------#---", "---------------", "XX--XXXXXXXXX--", "XX--XXXXXXXXXX-", "XX--XXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_13_0": ["-----XXXXXXXXXX", "-----XXXXXXXXXX", "X----XXXXXXXXXX", "XXX--XXXXXXXXXX", "-XX----#XXXXX--", "-XX-----XXXXX--", "-XX------*-----", "#XX--XXXXXXXXXX", "-XX--XXXXXXXXXX", "-XX--XXXXXXXXXX", "-XX--XXXXXXXXXX"], "2_13_1": ["-----XXXXXXXXXX", "-----XXXXXXXXXX", "X----XXXXXXXXXX", "XXX--XXXXXXXXXX", "-XX----#XXXXX--", "-XX-----XXXXX--", "-XX------*-----", "#XX--XXXXXXXXXX", "-XX--XXXXXXXXXX", "-XX--XXXXXXXXXX", "-XX--XXXXXXXXXX"], "2_13_2": ["XXXXXX--XXXXXXX", "XXXXXX--XXXXXXX", "XXXXXX--XXXXXXX", "XXXXXX--XXXXXXX", "XXXX---------#X", "XXXX----------X", "-*--------*----", "XXXXXX--XXXXXXX", "XXXXXX--XXXXXXX", "XXXXXX--XXXXXXX", "XXXXXX--XXXXXXX"], "0_13_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "---------------", "-------XXXXXXXX", "-------XXXXXXXX", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "0_13_1": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "---------------", "-------XXXXXXXX", "-------XXXXXXXX", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "0_13_2": ["XXXXXXX---XXXXX", "XXXXXXX---XXXXX", "XXXXXXX---XXXXX", "XXXXXXX---XXXXX", "XXXXX-----XXXXX", "XXXXX-----XX---", "-*-------------", "XXXXXXX-----XXX", "XXXXXXX---XXXXX", "XXXXXXX---XXXXX", "XXXXXXX---XXXXX"], "8_6_0": ["-----#---^^^^^^", "-----XX----X--X", "X----XX----X--X", "XXX--XX----X--X", "-XX--XX----X--X", "-XX--------X-#X", "-XX--XX----X--X", "#XX--XX----X--X", "-XX--XX----X--X", "-XX--XX--------", "-XX--#---^^^^^^"], "8_6_1": ["-----#---^^^^^^", "-----XX----X--X", "X----XX----X--X", "XXX--XX----X--X", "-XX--XX----X--X", "-XX--------X-#X", "-XX--XX----X--X", "#XX--XX----X--X", "-XX--XX----X--X", "-XX--XX--------", "-XX--#---^^^^^^"], "7_5_0": ["----XXX--^^^^^^", "\\\\--XXX--------", "//--XXX-------X", "----XXX------XX", "----XXX-----XXX", "----XXX-----X#*", "----XXX-----XXX", "----XXX------XX", "&-------------X", "---------------", "----XXX--^^^^^^"], "7_5_1": ["----XXX--^^^^^^", "\\\\--XXX--------", "//--XXX------X-", "----XXX-----XX-", "----XXX----XXX-", "----XXX----X#*-", "----XXX----XXX-", "----XXX-----XX-", "&------------X-", "---------------", "----XXX--^^^^^^"], "6_6_0": ["----XXXXX--^^^^", "\\\\--XXXXX------", "//--XXXXX----X-", "----XXXXX----XX", "-------------XX", "-------------*#", "------#------XX", "----XXXXX----XX", "&---XXXXX----X-", "----XXXXX------", "----XXXXX--^^^^"], "6_6_1": ["----XXXXX--^^^^", "\\\\--XXXXX------", "//--XXXXX----X-", "----XXXXX----XX", "-------------XX", "-------------*#", "------#------XX", "----XXXXX----XX", "&---XXXXX----X-", "----XXXXX------", "----XXXXX--^^^^"], "6_6_2": ["XXXXXX--^^--^--", "XXXXXX--^^--^--", "XXXXXX--^^--^--", "XXXXXX--^^--^^^", "XXXX-----------", "XXXX----^^-----", "-*-------------", "XXXXXX--^^-----", "XXXXXX--^^---#-", "XXXXXX--^^-----", "XXXXXX--^^-----"], "2_3_0": ["------#---X----", "------XX--X----", "------XX--X----", "------XX--X----", "------XX--X----", "---#------X--&-", "------XX--X----", "/\\\\---XX--X----", "\\//---XX--X----", "------XX--X----", "*-----#---&----"], "2_3_1": ["------#---X----", "------XX--X----", "------XX--X----", "------XX--X----", "------XX--X----", "---#------X--&-", "------XX--X----", "/\\\\---XX--X----", "\\//---XX--X----", "------XX--X----", "*-----#---&----"], "2_3_2": ["XXXXXXXXXXXXXXX", "--^------^-----", "--^------^-----", "---------^----#", "---------------", "-----&---------", "---------------", "--------------#", "---------------", "---------------", "XXXXXXXXXXXXXXX"], "2_2_0": ["------#--------", "------XX-------", "------XX-------", "------XX-------", "------XX-------", "---#------&--&-", "------XX-------", "/\\\\---XX-------", "\\//---XX-------", "------XX-------", "*-----#--------"], "2_2_1": ["------#--------", "------XX-------", "------XX-------", "------XX-------", "------XX-------", "---#------&--&-", "------XX-------", "/\\\\---XX-------", "\\//---XX-------", "------XX-------", "*-----#--------"], "2_2_2": ["^--^-----------", "^--------------", "^-----#--------", "^--------X---X-", "---------X-&-X-", "^--------XXXXX-", "---------X---X-", "^--------X---X-", "^--------------", "^------//\\\\----", "^--^---\\\\//----"], "0_10_0": ["----#---XXXXXXX", "\\\\--XX--XXXXXXX", "//--XX--XXXXXXX", "----XX--XXXXXXX", "----XX--XXXXXXX", "--------XXXXXXX", "----XX--XXXXXXX", "----XX------XXX", "&---XX------XXX", "----XX--XX-----", "----#---XXXXXXX"], "0_10_1": ["----#---XXXXXXX", "\\\\--XX--XXXXXXX", "//--XX--XXXXXXX", "----XX--XXXXXXX", "----XX--XXXXXXX", "--------XXXXXXX", "----XX--XXXXXXX", "----XX------XXX", "&---XX------XXX", "----XX--XX-----", "----#---XXXXXXX"], "0_10_2": ["----&----&-----", "---------------", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX--", "X--XXX--XXX----", "X--XXX--XXX---X", "X--XXX--XXX---X", "X--XXX--XXX----", "X--XXX--XXX----"], "0_11_0": ["-----XXXXXXXXXX", "\\\\---XXXXXXXXXX", "//---XXXXXXXXXX", "-----XXXXXXXXXX", "---------------", "----------XXXXX", "-------#--XXXXX", "-----XXXXXXXXXX", "&----XXXXXXXXXX", "-----XXXXXXXXXX", "-----XXXXXXXXXX"], "0_11_1": ["-----XXXXXXXXXX", "\\\\---XXXXXXXXXX", "//---XXXXXXXXXX", "-----XXXXXXXXXX", "---------------", "-----------XXXX", "-------*---XXXX", "-----XXXXXXXXXX", "&----XXXXXXXXXX", "-----XXXXXXXXXX", "-----XXXXXXXXXX"], "0_11_2": ["XXXXXXXX--XXXXX", "XXXXXXX---XXXXX", "X--XX-----XXXXX", "X--XX-----XXXXX", "X--XX-----XXXXX", "----------XXXXX", "X--XX-----XXX--", "X--XX----------", "X*&XX--------XX", "XXXXXXX---XXXXX", "XXXXXXXX--XXXXX"], "1_10_0": ["------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "---------------", "---#----&--XXXX", "-----------XXXX", "/\\\\---XXXXXXXXX", "\\//---XXXXXXXXX", "------XXXXXXXXX", "*-----XXXXXXXXX"], "1_10_1": ["------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "---------------", "---#----&--XXXX", "-----------XXXX", "/\\\\---XXXXXXXXX", "\\//---XXXXXXXXX", "------XXXXXXXXX", "*-----XXXXXXXXX"], "1_10_2": ["----&----#-----", "---------------", "XXXXXXXXX*XXX--", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX--", "X--XXX--XXX----", "X--XXX--XXX---X", "X--XXX--XXX---X", "X--XXX--XXX----", "X--XXX--XXX----"], "3_14_0": ["--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "----#XXXX--#XXX", "-----XXXX---XXX", "------*------*-", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX"], "3_14_1": ["--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "----#XXXX--#XXX", "-----XXXX---XXX", "------*------*-", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX"], "3_15_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "------#XXXX--#X", "---&---XXXX---X", "--------*------", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "3_15_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "------#XXXX--#X", "---&---XXXX---X", "--------*------", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "3_15_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "------*---*----", "XXX------------", "XXX----#---#---", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "3_13_0": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----#XXXXX--#X", "#-----XXXXX---X", "-------*-------", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "3_13_1": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XX-----#XXXX", "#--XX------XXXX", "-------*----*--", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "4_14_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "------------#XX", "---&---------XX", "------#--#----*", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "4_14_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "------------#XX", "---&---------XX", "------#--#----*", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_14_0": ["--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XX-----#XXXX-", "--XX------XXXX-", "------*----*---", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX"], "2_14_1": ["--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XX-----#XXXX-", "--XX------XXXX-", "------*----*---", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX"], "2_14_2": ["--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XX-----#XXXX-", "--XX------XXXX-", "------*----*---", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX", "--XXXXXXXXXXXXX"], "3_7_0": ["---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "-----------#XXX", "---#--&-----XXX", "-------------*-", "/\\\\------XXXXXX", "\\//------XXXXXX", "---------XXXXXX", "*--------XXXXXX"], "3_7_1": ["---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "---------XXXXXX", "-----------#XXX", "---#--&-----XXX", "-------------*-", "/\\\\------XXXXXX", "\\//------XXXXXX", "---------XXXXXX", "*--------XXXXXX"], "4_6_0": ["--------X--XXXX", "-----------XXXX", "--------X--XXXX", "-------XX--XXXX", "------XXX----*-", "---#--X#&------", "------XXX-----#", "/\\\\----XX--XXXX", "\\//-----X--XXXX", "-----------XXXX", "*-------X--XXXX"], "4_6_1": ["--------X--XXXX", "-----------XXXX", "--------X--XXXX", "-------XX--XXXX", "------XXX----*-", "---#--X#&------", "------XXX-----#", "/\\\\----XX--XXXX", "\\//-----X--XXXX", "-----------XXXX", "*-------X--XXXX"], "7_7_0": ["--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "---*-----*---*-", "--^^^----------", "---&------#---#", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX"], "7_7_1": ["--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "---*-----*---*-", "--^^^----------", "---&------#---#", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX"], "7_7_2": ["XXXXXXXXXXXXXXX", "XXXX--^^^^^^^^-", "XX------^^^----", "XX-------------", "XX--------//\\\\-", "----------\\\\//-", "XX-------------", "XX-------------", "XX------^^^----", "XXXX--^^^^^^^^-", "XXXXXXXXXXXXXXX"], "7_8_0": ["-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "--*-----*---*--", "-^^^-----------", "--&------#---#-", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX"], "7_8_1": ["-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "--*-----*---*--", "-^^^-----------", "--&------#---#-", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX"], "7_6_0": ["-----XX--^^^^^^", "-----XX----X--X", "X----XX----X--X", "XXX--XX----X--X", "-XX--------X--X", "-XX--------X-#X", "-XX--------X--X", "#XX--XX----X--X", "-XX--XX----X--X", "-XX--XX--------", "-XX--XX--^^^^^^"], "7_6_1": ["-----XX--^^^^^^", "-----XX----X--X", "X----XX----X--X", "XXX--XX----X--X", "-XX--------X--X", "-XX--------X-#X", "-XX--------X--X", "#XX--XX----X--X", "-XX--XX----X--X", "-XX--XX--------", "-XX--XX--^^^^^^"], "7_6_2": ["XXXXXX--^^^^^^^", "XXXXXX-------*-", "XXXXXX---------", "XXXXXX------^^^", "----------^^^^^", "XXXX---------&-", "XXXX------^^^^^", "XXXXXX------^^^", "XXXXXX---------", "XXXXXX-------*-", "XXXXXX--^^^^^^^"], "8_7_0": ["XXXXXX--^^^^^^^", "-XXXXX-----X--X", "-XXXXX-----X--X", "-XXXXX-----X--X", "-----------X--X", "---&-------X-#X", "-----------X--X", "-XXXXX-----X--X", "-XXXXX-----X--X", "#XXXXX---------", "XXXXXX--^^^^^^^"], "8_7_1": ["XXXXXX--^^^^^^^", "-XXXXX-----X--X", "-XXXXX-----X--X", "-XXXXX-----X--X", "-----------X--X", "---&-------X-#X", "-----------X--X", "-XXXXX-----X--X", "-XXXXX-----X--X", "#XXXXX---------", "XXXXXX--^^^^^^^"], "6_7_0": ["-----^^^--XXXXX", "-----^^^--XXXXX", "X----^^^--XXXXX", "XXX--^^^--XXXXX", "-XX---*-----#XX", "-XX--^^^-----XX", "-XX---&-------*", "#XX--^^^--XXXXX", "-XX--^^^--XXXXX", "-XX--^^^--XXXXX", "-XX--^^^--XXXXX"], "6_7_1": ["-----^^^--XXXXX", "-----^^^--XXXXX", "X----^^^--XXXXX", "XXX--^^^--XXXXX", "-XX---*-----#XX", "-XX--^^^-----XX", "-XX---&-------*", "#XX--^^^--XXXXX", "-XX--^^^--XXXXX", "-XX--^^^--XXXXX", "-XX--^^^--XXXXX"], "6_7_2": ["XXXXXX--^^^^^^^", "XXXXXX----&----", "XXXXXX----X----", "XXXXXX----X----", "----------X----", "XXXX------X----", "XXXX------X----", "XXXXXX----X----", "XXXXXX----X----", "XXXXXX----X----", "XXXXXX--^^^^^^^"], "10_2_0": ["-------^^^^^^^^", "---------^-----", "---------^----X", "---------^---XX", "---------^--XXX", "---#--------X#*", "---------&--XXX", "/\\\\----------XX", "\\//-----------X", "---------------", "*------^^^^^^^^"], "10_2_1": ["-------^^^^^^^^", "---------^-----", "---------^----X", "---------^---XX", "---------^--XXX", "---#--------X#*", "---------&--XXX", "/\\\\----------XX", "\\//-----------X", "---------------", "*------^^^^^^^^"], "10_0_0": ["------^^^^^^^^^", "--------^-----*", "--------^------", "--------^----^^", "--------^--^^^^", "---#----------&", "--------&--^^^^", "/\\\\----------^^", "\\//------------", "--------------*", "*-----^^^^^^^^^"], "10_0_1": ["------^^^^^^^^^", "--------^-----*", "--------^------", "--------^----^^", "--------^--^^^^", "---#----------&", "--------&--^^^^", "/\\\\----------^^", "\\//------------", "--------------*", "*-----^^^^^^^^^"], "11_1_0": ["------^^^^^^^^^", "----------^----", "----------^--X-", "----------^--XX", "----------^--XX", "---#---------*#", "----------&--XX", "/\\\\----------XX", "\\//----------X-", "---------------", "*-----^^^^^^^^^"], "11_1_1": ["------^^^^^^^^^", "----------^----", "----------^--X-", "----------^--XX", "----------^--XX", "---#---------*#", "----------&--XX", "/\\\\----------XX", "\\//----------X-", "---------------", "*-----^^^^^^^^^"], "11_1_2": ["^^^^^^^----^---", "---------^-*-^-", "----X------^---", "---XX----^---^-", "--XXX------^---", "--X#*----^-&-^-", "--XXX------^---", "---XX----^---^-", "----X------^---", "---------^-*-^-", "^^^^^^^----^---"], "1_9_0": ["XX--XXX--------", "XX--XXX--------", "XX--XXX---XX---", "XX--XXX---XXXX-", "XX--XXX-----XX-", "XXXXXXXXX---XX-", "XXXXXXXXX---XX-", "XXXXXXXXX---XX-", "*XXXXXXXX---XX-", "------------XX-", "#----&------XX-"], "1_9_1": ["XX--XXX--------", "XX--XXX--------", "XX--XXX---XX---", "XX--XXX---XXXX-", "XX--XXX-----XX-", "XXXXXXXXX---XX-", "XXXXXXXXX---XX-", "XXXXXXXXX---XX-", "*XXXXXXXX---XX-", "------------XX-", "#----&------XX-"], "1_9_2": ["--XX------&----", "--XX-----------", "--XX---XXXXXXXX", "-#XX#--XXXXXXXX", "--XX---XXXXXXXX", "--XX---XXXXXXXX", "--XX-----XXX--X", "XXXXXX---XXX--X", "XX--XX---XXX--X", "---------XXX--X", "---------XXX--X"], "2_8_0": ["XX--XXX--------", "XX--XXX--------", "XX--XXX---XX---", "XX--XXX---XX-#-", "XX--XXX--------", "XXXXXXXXX----XX", "XXXXXXXXX----XX", "XXXXXXXXX----XX", "*XXXXXXXX----XX", "---------------", "#----&---------"], "2_8_1": ["------XXXXXXXXX", "------XX*&XXXXX", "------XX--XXXXX", "------XX--XXXXX", "---------------", "---#-----------", "---------------", "/\\\\---XX--XXXXX", "\\//---XX--XXXXX", "------XX--XXXXX", "*-----XXXXXXXXX"], "0_3_0": ["----#---X------", "\\\\--XX--X------", "//--XX--X------", "----XX--X------", "----XX--X------", "--------X--&--&", "----XX--X------", "----XX--X------", "&---XX--X------", "----XX--X------", "----#---&------"], "0_3_1": ["----#---X------", "\\\\--XX--X------", "//--XX--X------", "----XX--X------", "----XX--X------", "--------X--&--&", "----XX--X------", "----XX--X------", "&---XX--X------", "----XX--X------", "----#---&------"], "0_3_2": ["X------------XX", "X---^--&-----XX", "-------------XX", "----^--------XX", "X------------XX", "X---^----------", "X-------------&", "X---^-----&--XX", "X------------XX", "X---^--------XX", "X------------XX"], "3_8_0": ["XX--------XXX--", "XX--------XXX--", "XX---XX---XXX--", "XX-#-XX-#-XXX--", "XX--------XXX--", "XXXX----XXXXXXX", "XXXX----XXXXXXX", "XXXX----XXXXXXX", "*XXX----XXXXXXX", "---------------", "#----------&---"], "3_8_1": ["XX--------XXX--", "XX--------XXX--", "XX---XX---XXX--", "XX-#-XX-#-XXX--", "XX--------XXX--", "XXXX----XXXXXXX", "XXXX----XXXXXXX", "XXXX----XXXXXXX", "*XXX----XXXXXXX", "---------------", "#----------&---"], "4_9_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXX--", "//--XXXXXXXXX--", "----XXXXXXXXX--", "------*--------", "---------------", "-------#--#----", "----XXXXXXXXX--", "&---XXXXXXXXX--", "----XXXXXXXXX*#", "----XXXXXXXXXXX"], "4_9_1": ["-------XXXXXXXX", "-------XXXXXXXX", "X------XXXXXXXX", "XXX----XXXXXXXX", "-XX------*---*-", "-XX------------", "-XX-------#---#", "#XX----XXXXXXXX", "-XX----XXXXXXXX", "-XX----XXXXXXXX", "-XX----XXXXXXXX"], "4_9_2": ["XXXX^^^^^XXXXX-", "XXXX^^^^^XXXXX-", "----^^^^^XXXXX-", "---------XXXXX-", "XXXX-------XXX-", "XXXX^^^^^------", "XXXX^^^^^XX----", "XXXX^^^^^XXXXX-", "XXXX^^^^^XXXXX-", "XXXX^^^^^XXXXX-", "XXXX^^^^^XXXXX-"], "2_9_0": ["XX--XXX--------", "XX--XXX--------", "XX--XXX---XX---", "XX--XXX-#-XXXX-", "XX--XXX-----XX-", "XXXXXXXXX---XX-", "XXXXXXXXX---XX-", "XXXXXXXXX---XX-", "*XXXXXXXX---XX-", "------------XX-", "#----&------XX-"], "2_9_1": ["XX--XXX--------", "XX--XXX--------", "XX--XXX---XX---", "XX--XXX-#-XXXX-", "XX--XXX-----XX-", "XXXXXXXXX---XX-", "XXXXXXXXX---XX-", "XXXXXXXXX---XX-", "*XXXXXXXX---XX-", "------------XX-", "#----&------XX-"], "8_2_0": ["---------^^^^^^", "-----------X--X", "-----------X--X", "--------------X", "---------------", "---#-----------", "---------------", "/\\\\---------//\\", "\\//---------\\\\/", "------*--------", "*--------^^^^^^"], "8_2_1": ["---------^^^^^^", "-----------X--X", "-----------X--X", "--------------X", "---------------", "---#-----------", "---------------", "/\\\\---------//\\", "\\//---------\\\\/", "------*--------", "*--------^^^^^^"], "8_2_2": ["^XX^^^^^^--^^^-", "^--^^^^^^--^^^-", "-----------^^^-", "-XX--------^^^-", "^XX^^^^^^---&--", "^XX^^^^^^------", "^XX^^^^^^--^^^-", "^XX^^^^^^--^^^-", "^XX^^^^^^--^^^-", "^XX^^^^^^--^^^-", "^XX^^^^^^--^^^-"], "0_2_0": ["----#----------", "\\\\--XX---------", "//--XX---------", "----XX---------", "----XX---------", "--------&--&--&", "----XX---------", "----XX---------", "&---XX---------", "----XX---------", "----#----------"], "0_2_1": ["----#----------", "\\\\--XX---------", "//--XX---------", "----XX---------", "----XX---------", "--------&--&--&", "----XX---------", "----XX---------", "&---XX---------", "----XX---------", "----#----------"], "0_2_2": ["^-----------XXX", "------//\\\\---XX", "------\\\\//----X", "---------------", "---------------", "----&----------", "---------------", "---------------", "--------&-----X", "-------------XX", "^-----------XXX"], "1_2_0": ["------------XX-", "------------XX-", "------------XX-", "------------XX-", "------------XX-", "---#--&--&--XX-", "------------XX-", "/\\\\---------XXX", "\\//-----------X", "---------------", "*--------------"], "1_2_1": ["------------XX-", "------------XX-", "------------XX-", "------------XX-", "------------XX-", "---#--&--&--XX-", "------------XX-", "/\\\\---------XXX", "\\//-----------X", "---------------", "*--------------"], "14_3_0": ["---^^^^^^^^^^^^", "-----------X--X", "--------X--X--X", "-------XX--X--X", "------XXX--X--X", "#-----X#*--X-#X", "------XXX--X--X", "-------XX--X--X", "--------X--X--X", "---------------", "---^^^^^^^^^^^^"], "14_3_1": ["---^^^^^^^^^^^^", "-----------X--X", "--------X--X--X", "-------XX--X--X", "------XXX--X--X", "#-----X#*--X-#X", "------XXX--X--X", "-------XX--X--X", "--------X--X--X", "---------------", "---^^^^^^^^^^^^"], "14_3_2": ["^^^^^^^^^^^^^^^", "---------------", "---------------", "X----XXX-------", "X^---X*X---^^^^", "X^^--X&--------", "X^---X*X---^^^^", "X----XXX-------", "//\\\\//\\\\-------", "\\\\//\\\\//-------", "^^^^^^^^^^^^^^^"], "13_2_0": ["----^^^^^^^^^^^", "------^--------", "------^----X--X", "------^---XX--X", "------^--XXX--X", "#--------X#*--*", "------&--XXX--X", "----------XX--X", "-----------X--X", "---------------", "----^^^^^^^^^^^"], "13_2_1": ["----^^^^^^^^^^^", "------^--------", "------^----X--X", "------^---XX--X", "------^--XXX--X", "#--------X#*--*", "------&--XXX--X", "----------XX--X", "-----------X--X", "---------------", "----^^^^^^^^^^^"], "4_8_0": ["XX--------XXX--", "XX--------XXX--", "XX---XX---XXX--", "XX-#-XX-#-XXX-#", "XX--------XXX--", "XXXX----XXXXXXX", "XXXX----XXXXXXX", "XXXX----XXXXXXX", "*XXX----XXXXXXX", "---------------", "#----------&---"], "4_8_1": ["XX--------XXX--", "XX--------XXX--", "XX---XX---XXX--", "XX-#-XX-#-XXX-#", "XX--------XXX--", "XXXX----XXXXXXX", "XXXX----XXXXXXX", "XXXX----XXXXXXX", "*XXX----XXXXXXX", "---------------", "#----------&---"], "4_8_2": ["XXXXX^^^--^^XXX", "XXXXX^^^--^^XXX", "X--XX^^^--^^XXX", "-----^^^--^^XXX", "-XX-------^^XXX", "XXXXX-----^^XXX", "XXXXX^^^--^^XXX", "XXXXX^^^--^^---", "XXXXX^^^-------", "XXXXX^^^----XXX", "XXXXX^^^--^^XXX"], "0_14_0": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "&--XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XX----------", "---XX--XXXXXXXX", "-------XXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "0_14_1": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "&--XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XX----------", "---XX--XXXXXXXX", "-------XXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "0_14_2": ["XXXXXXX--XXXXXX", "XXXXXXX--XXXXXX", "XXXXXXX--XXXXXX", "XXXXXXX--XXXXXX", "---------XXXXXX", "XXXXX----XXXXXX", "XXXXX----------", "XXXXXXX--------", "XXXXXXX--XXXXXX", "XXXXXXX--XXXXXX", "XXXXXXX--XXXXXX"], "0_12_0": ["-----XXXXXXXXXX", "\\\\---XXXXXXXXXX", "//---XXXXXXXXXX", "-----XXXXXXXXXX", "---------------", "-------XXXXXXXX", "-------XXXXXXXX", "-----XXXXXXXXXX", "&----XXXXXXXXXX", "-----XXXXXXXXXX", "-----XXXXXXXXXX"], "0_12_1": ["-----XXXXXXXXXX", "\\\\---XXXXXXXXXX", "//---XXXXXXXXXX", "-----XXXXXXXXXX", "---------------", "-------XXXXXXXX", "-------XXXXXXXX", "-----XXXXXXXXXX", "&----XXXXXXXXXX", "-----XXXXXXXXXX", "-----XXXXXXXXXX"], "0_12_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-XX-------XX*&X", "-XX--XXX--XX--X", "-XX-------XX--X", "-----XXX-------", "-XX-------XX--X", "-XX--XXX--XX--X", "-XX-------XX--X", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "13_3_0": ["----^^^^^^^^^^^", "\\\\-------------", "//-----X------X", "-------XX----XX", "-------XXX--XXX", "-------*#X--X#*", "-------XXX--XXX", "-------XX----XX", "&------X------X", "---------------", "----^^^^^^^^^^^"], "13_3_1": ["----^^^^^^^^^^^", "\\\\-------------", "//-----X------X", "-------XX----XX", "-------XXX--XXX", "-------*#X--X#*", "-------XXX--XXX", "-------XX----XX", "&------X------X", "---------------", "----^^^^^^^^^^^"], "13_3_2": ["^^^^^^^^^^^^^^^", "---X--X--X--&--", "---X--X--X--X--", "X-----X--X--X--", "X--------X--X--", "X-----------X--", "X-----------X--", "X---//\\\\----X--", "----\\\\//----X--", "------------X--", "^^^^^^^^^^^^^^^"], "12_2_0": ["----^^^^^^^^^^^", "\\\\----^--------", "//----^----X--X", "------^---XX--X", "------^--XXX--X", "---------X#*--*", "------&--XXX--X", "----------XX--X", "&----------X--X", "---------------", "----^^^^^^^^^^^"], "12_2_1": ["----^^^^^^^^^^^", "\\\\----^--------", "//----^----X--X", "------^---XX--X", "------^--XXX--X", "---------X#*--*", "------&--XXX--X", "----------XX--X", "&----------X--X", "---------------", "----^^^^^^^^^^^"], "1_1_0": ["---------X-----", "---------X-----", "---------X-----", "---------X-----", "---------X-----", "---#--&--X--&--", "---------X-----", "/\\\\------X-----", "\\//------X-----", "---------X-----", "*--------&-----"], "1_1_1": ["---------X-----", "---------X-----", "---------X-----", "---------X-----", "---------X-----", "---#--&--X--&--", "---------X-----", "/\\\\------X-----", "\\//------X-----", "---------X-----", "*--------&-----"], "1_1_2": ["----&--^^------", "----X--^^------", "----X--^^------", "----X--^^------", "----X--^^------", "----X--^^------", "----X--^^------", "----X----------", "----X----------", "----X--^^------", "----X--^^------"], "16_3_0": ["^^^^^^^^^^^^^^^", "&--------------", "-------X------X", "^^-----XX----XX", "^^^^---XXX--XXX", "-------*#X--X#*", "^^^^---XXX--XXX", "^^-----XX----XX", "-------X------X", "&--------------", "^^^^^^^^^^^^^^^"], "16_3_1": ["^^^^^^^^^^^^^^^", "&--------------", "-------X------X", "^^-----XX----XX", "^^^^---XXX--XXX", "-------*#X--X#*", "^^^^---XXX--XXX", "^^-----XX----XX", "-------X------X", "&--------------", "^^^^^^^^^^^^^^^"], "16_3_2": ["^^^^^^^^^^^^^^^", "----------X--^^", "-X--X--X--X--^^", "-X--X--X--X---&", "-X--X--X--X--^^", "#X-#X-#X-#X--^^", "-X--X--X--X--^^", "-X--X--X--X---&", "-X--X--X--X--^^", "-X--X--X-----^^", "^^^^^^^^^^^^^^^"], "5_9_0": ["----XXXXXXXXXXX", "----XXXXXXXXX--", "----XXXXXXXXX--", "----XXXXXXXXX--", "------*--------", "#--------------", "-------#--#----", "----XXXXXXXXX--", "----XXXXXXXXX--", "----XXXXXXXXX*#", "----XXXXXXXXXXX"], "5_9_1": ["----XXXXXXXXXXX", "----XXXXXXXXXX-", "----XXXXXXXXXX-", "----XXXXXXXXXX-", "------*---*----", "#--------------", "-------#---#---", "----XXXXXXXXXX-", "----XXXXXXXXXX-", "----XXXXXXXXXX*", "----XXXXXXXXXXX"], "1_11_0": ["XX--XXX--XXX---", "XX--XXX--XXX---", "XX--XXX--XXX---", "XX--XXX--XXX---", "XX--XXX--XXX---", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "*XXXXXXXXXXXXX-", "---------------", "#----&----&----"], "1_11_1": ["XX--XXX--XXX---", "XX--XXX--XXX---", "XX--XXX--XXX---", "XX--XXX--XXX---", "XX--XXX--XXX---", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "*XXXXXXXXXXXXX-", "---------------", "#----&----&----"], "1_15_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---------------", "---&-----XXXXXX", "------#--XXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "1_15_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---------------", "---&-----XXXXXX", "------#--XXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "1_15_2": ["XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "-------#XXXX---", "XXXXX---XXXX---", "XXXXX----*-----", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-"], "14_4_0": ["X--^^^^^^^^^^^^", "-----X--X--X--X", "X----X--X--X--X", "X----X--X--X--X", "X----X--X--X--X", "*----X-#X-#X-#X", "X----X--X--X--X", "X----X--X--X--X", "X----X--X--X--X", "---------------", "X--^^^^^^^^^^^^"], "14_4_1": ["X--^^^^^^^^^^^^", "-----X--X--X--X", "X----X--X--X--X", "X----X--X--X--X", "X----X--X--X--X", "*----X-#X-#X-#X", "X----X--X--X--X", "X----X--X--X--X", "X----X--X--X--X", "---------------", "X--^^^^^^^^^^^^"], "14_4_2": ["^^^^^^^^^^^^^^^", "------------&--", "------------X--", "X----XXX----X--", "X^---X*X----X--", "X^^--X&-----X--", "X^---X*X----X--", "X----XXX----X--", "//\\\\//\\\\----X--", "\\\\//\\\\//----X--", "^^^^^^^^^^^^^^^"], "14_5_0": ["^^^^^^^^^^^^^^^", "-------------X-", "-------------X-", "---X----XXX--X-", "---X^---X*X--X-", "XXXX^^--X&---X-", "---X^---X*X--X-", "---X----XXX--X-", "---//\\\\//\\\\--X-", "---\\\\//\\\\//----", "^^^^^^^^^^^^^^^"], "14_5_1": ["^^^^^^^^^^^^^^^", "-------------X-", "-------------X-", "---X----XXX--X-", "---X^---X*X--X-", "XXXX^^--X&---X-", "---X^---X*X--X-", "---X----XXX--X-", "---//\\\\//\\\\--X-", "---\\\\//\\\\//----", "^^^^^^^^^^^^^^^"], "14_5_2": ["^^^^^^^^^^^^^^^", "-------------&-", "-------------X-", "---X----XXX--X-", "---X^---X*X--X-", "XXXX^^--X&---X-", "---X^---X*X--X-", "---X----XXX--X-", "---//\\\\//\\\\--X-", "---\\\\//\\\\//--X-", "^^^^^^^^^^^^^^^"], "15_4_0": ["--^^^^^^^^^^^^^", "--------------&", "------X----X--X", "-----XX---XX--X", "----XXX--XXX--X", "----X#*--X#*--X", "----XXX--XXX--X", "-----XX---XX--X", "------X----X--X", "--------------X", "--^^^^^^^^^^^^^"], "15_4_1": ["--^^^^^^^^^^^^^", "--------------&", "------X----X--X", "-----XX---XX--X", "----XXX--XXX--X", "----X#*--X#*--X", "----XXX--XXX--X", "-----XX---XX--X", "------X----X--X", "--------------X", "--^^^^^^^^^^^^^"], "13_4_0": ["-^^^^^^^^^^^^^^", "-^^------------", "-^^------------", "-^^--X--X----XX", "-----X--X^---X*", "-^^--XXXX^^--X&", "-----X--X^---X*", "-^^--X--X----XX", "-^^-----//\\\\//\\", "-^^-----\\\\//\\\\/", "-^^^^^^^^^^^^^^"], "13_4_1": ["-^^^^^^^^^^^^^^", "-^^------------", "-^^------------", "-^^--X--X----XX", "-----X--X^---X*", "-^^--XXXX^^--X&", "-----X--X^---X*", "-^^--X--X----XX", "-^^-----//\\\\//\\", "-^^-----\\\\//\\\\/", "-^^^^^^^^^^^^^^"], "13_4_2": ["^^^^^^^^^^^^^^-", "-----X--X--X---", "-----X--X--X---", "XXX-----X--X---", "X*X--------X---", "X&-------------", "X*X------------", "XXX---//\\\\-----", "/\\\\---\\\\//-----", "\\//------------", "^^^^^^^^^^^^^^-"], "4_7_0": ["----XX^^XXXX^^^", "\\\\--XX^^XXXX^^^", "//--XX^^XXXX^^^", "----XX^^XXXX^^^", "----XX^^XXXX^^^", "----XX^^XXXX^^^", "----XX^^--XX^^^", "----XX------^^^", "&-------XX-----", "------^^XXXX---", "----XX^^XXXX^^^"], "4_7_1": ["----XXXXXX^^^^^", "\\\\--XXXXXX^^^^^", "//--XXXXXX^^^^^", "----XXXXXX^^^^^", "----XXXXXX^^^^^", "----XXXXXX^^^^^", "--------XX^^^^^", "----------^^^^^", "&---XXXX-------", "----XXXXXX-----", "----XXXXXX^^^^^"], "3_12_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "------*---#XXXX", "-----------XXXX", "-------#----*--", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "3_12_1": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "------*---#XXXX", "-----------XXXX", "-------#----*--", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "3_12_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "X*&XX--XX--XX--", "X--XX--XX--XX--", "X--XX--XX--XX--", "---------------", "X--XX--XX--XX--", "X--XX--XX--XX--", "X--XX*&XX*#XX--", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "4_13_0": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----#XXXX--#XX", "#-----XXXX---XX", "-------*------*", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "4_13_1": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----#XXXX--#XX", "#-----XXXX---XX", "-------*------*", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "5_10_0": ["----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "---------*---*-", "#--------------", "------#---#---#", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "5_10_1": ["----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "---------*---*-", "#--------------", "------#---#---#", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "5_10_2": ["XXXXXXXXX--^^^^", "XXXXXXXXX----X-", "XXXXXXXXX----X-", "XXXXXXXXX----X-", "-#XXXXX------X-", "--XXXX-------X-", "---*---------X-", "XXXXXXXXX----X-", "XXXXXXXXX----X-", "XXXXXXXXX------", "XXXXXXXXX--^^^^"], "5_8_0": ["---XXXXXXXXXXXX", "---XXXXXXX--^^^", "---XXXXXXX-----", "---XXXXXXX--^^^", "-----*------^^^", "#-----------^^^", "------#-----^^^", "---XXXXXXX--^^^", "---XXXXXXX-----", "---XXXXXXX--^^^", "---XXXXXXXXXXXX"], "5_8_1": ["---XXXXXXXXXXXX", "---XXXXXXX--^^^", "---XXXXXXX--^^^", "---XXXXXXX--^^^", "-----*------^^^", "#------------&-", "------#-----^^^", "---XXXXXXX--^^^", "---XXXXXXX--^^^", "---XXXXXXX--^^^", "---XXXXXXXXXXXX"], "5_8_2": ["XXXXXXXX--XXXXX", "^^^^^^----XXXXX", "^^^-------XXXXX", "----------XXXXX", "--//\\\\----XXXXX", "--\\\\//----XX---", "---------------", "------------XXX", "^^^-------XXXXX", "^^^^^^----XXXXX", "XXXXXXXX--XXXXX"], "6_9_0": ["-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "--*--------#XXX", "-^^^--------XXX", "--&-----#----*-", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX"], "6_9_1": ["-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "--*--------#XXX", "-^^^--------XXX", "--&-----#----*-", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX"], "6_9_2": ["^^^^^--XXXXXXX^", "-------XXXXXXX^", "-------XXXXXXX^", "XXX----XXXXXXX^", "X*X----XXXXXXX^", "X&-----XXXXXXX^", "X*X-------XXXX^", "XXX-----------^", "/\\\\----XXX-----", "\\//----XXXXXXX-", "^^^^^--XXXXXXX^"], "0_16_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---------------", "---XX---XXXXXXX", "---XX---XXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "0_16_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---------------", "---XX---XXXXXXX", "---XX---XXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "0_16_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "---------------", "XXXXX--XXX-----", "XXXXX--XXX--#--", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "0_17_0": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "---------------", "XXXX---XXXXXXXX", "XXXX---XXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "0_17_1": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "---------------", "XXXX---XXXXXXXX", "XXXX---XXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "0_15_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---------------", "---&----XX--XXX", "--------XX--XXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "0_15_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---------------", "---&----XX--XXX", "--------XX--XXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "0_15_2": ["XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "---------------", "XXXX---XX------", "XXXX---XX--#---", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-"], "1_16_0": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-----#XXXX-----", "--&---XXXX--XXX", "-------*----XXX", "-XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "1_16_1": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-----#XXXX-----", "--&---XXXX--XXX", "-------*----XXX", "-XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "1_16_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-----------*---", "XXXXX--XX------", "XXXXX--XX---#--", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_12_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "---------#XXXX-", "----------XXXX-", "------#----*---", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "2_12_1": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "---------#XXXX-", "----------XXXX-", "------#----*---", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "2_11_0": ["XX--XXX--XXX---", "XX--XXX--XXX---", "XX--XXX--XXX---", "XX--XXX--XXX-#-", "XX--XXX--XXX---", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "*XXXXXXXXXXXXX-", "---------------", "#----&----&----"], "2_11_1": ["-----XXXXXXXXXX", "\\\\---XXXXXXXXXX", "//---XXXXXXXXXX", "-----XXXXXXXXXX", "----------#XXXX", "-----------XXXX", "-------#----*--", "-----XXXXXXXXXX", "&----XXXXXXXXXX", "-----XXXXXXXXXX", "-----XXXXXXXXXX"], "2_11_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "^-------XX*&XX*", "---XXX--XX--XX-", "^-------XX--XX-", "---XXX---------", "^-------XX--XX-", "---XXX--XX--XX-", "^-------XX--XX-", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "4_12_0": ["-----XXXXXXXXXX", "-----XXXXXXXXXX", "X----XXXXXXXXXX", "XXX--XXXXXXXXXX", "-XX----*---#XXX", "-XX---------XXX", "-XX-----#----*-", "#XX--XXXXXXXXXX", "-XX--XXXXXXXXXX", "-XX--XXXXXXXXXX", "-XX--XXXXXXXXXX"], "4_12_1": ["-----XXXXXXXXXX", "-----XXXXXXXXXX", "X----XXXXXXXXXX", "XXX--XXXXXXXXXX", "-XX----*---#XXX", "-XX---------XXX", "-XX-----#----*-", "#XX--XXXXXXXXXX", "-XX--XXXXXXXXXX", "-XX--XXXXXXXXXX", "-XX--XXXXXXXXXX"], "12_1_0": ["----^^^^^^^^^^^", "------^--^-----", "------^--^----X", "------^--^---XX", "------^--^--XXX", "#-----------X#*", "------&--&--XXX", "-------------XX", "--------------X", "---------------", "----^^^^^^^^^^^"], "12_1_1": ["----^^^^^^^^^^^", "------^--^-----", "------^--^----X", "------^--^---XX", "------^--^--XXX", "#-----------X#*", "------&--&--XXX", "-------------XX", "--------------X", "---------------", "----^^^^^^^^^^^"], "2_0_0": ["---------------", "---------------", "---------------", "---------------", "---------------", "---#-----&--&--", "---------------", "/\\\\------------", "\\//------------", "------*--------", "*--------------"], "2_0_1": ["---------------", "---------------", "---------------", "---------------", "---------------", "---#-----&--&--", "---------------", "/\\\\------------", "\\//------------", "------*--------", "*--------------"], "2_0_2": ["^^-------------", "---------------", "---------------", "---------------", "---------------", "-----------&---", "---------------", "---------------", "---------------", "------*--------", "^^-------------"], "5_13_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---------*---*-", "---&-----------", "------#---#---#", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_13_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---------*---*-", "---&-----------", "------#---#---#", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_13_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX--", "-----*---*-----", "-&-------------", "------#---#----", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX--", "XXXXXXXXXXXXX*#", "XXXXXXXXXXXXXXX"], "5_14_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-----*------#XX", "-------------XX", "------#--#----*", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_14_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-----*------#XX", "-------------XX", "------#--#----*", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_14_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-----*---*---*-", "-&-------------", "------#---#---#", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_12_0": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----*------#XX", "#------------XX", "------#--#----*", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "5_12_1": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----*------#XX", "#------------XX", "------#--#----*", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "6_13_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-----*---*---*-", "---------------", "------#---#---#", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "6_13_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-----*---*---*-", "---------------", "------#---#---#", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "6_13_2": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-----*---*---*-", "---------------", "------#---#---#", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_7_0": ["----XXXXXX--^^^", "\\\\--XXXXXX----X", "//--XXXXXX----X", "----XXXXXX----X", "------*-------X", "--------------X", "-------#------X", "----XXXXXX----X", "&---XXXXXX----X", "----XXXXXX----#", "----XXXXXX--^^^"], "5_7_1": ["----XXXXXX--^^^", "\\\\--XXXXXX----X", "//--XXXXXX----X", "----XXXXXX----X", "------*-------X", "--------------X", "-------#------X", "----XXXXXX----X", "&---XXXXXX----X", "----XXXXXX----#", "----XXXXXX--^^^"], "5_7_2": ["^^^^--XXXXXX--^", "------XXXXXX--^", "------XXXXXX--^", "XX----XXXXXX---", "*X-------------", "&-------XX----^", "*X------XX----^", "XX----XXXXXX--^", "\\\\----XXXXXX--^", "//----XXXXXX--^", "^^^^--XXXXXX--^"], "12_3_0": ["-----^^^^^^^^^^", "\\\\-------------", "//-----X------X", "-------XX----XX", "-------XXX--XXX", "-------*#X--X#*", "-------XXX--XXX", "-------XX----XX", "&------X------X", "---------------", "-----^^^^^^^^^^"], "12_3_1": ["-----^^^^^^^^^^", "\\\\-------------", "//-----X------X", "-------XX----XX", "-------XXX--XXX", "-------*#X--X#*", "-------XXX--XXX", "-------XX----XX", "&------X------X", "---------------", "-----^^^^^^^^^^"], "10_3_0": ["------^^^^^^^^^", "--------X--X---", "--------X--X---", "--------X--X---", "--------X--X--X", "---#----X-#X--X", "--------X--X--X", "/\\\\-----X--X---", "\\//-----X--X---", "---------------", "*-----^^^^^^^^^"], "10_3_1": ["------^^^^^^^^^", "--------X--X---", "--------X--X---", "--------X--X---", "--------X--X--X", "---#----X-#X--X", "--------X--X--X", "/\\\\-----X--X---", "\\//-----X--X---", "---------------", "*-----^^^^^^^^^"], "10_3_2": ["^^^^--XXXXXXXXX", "-#------^^^^^^^", "-X------^^^^^^^", "-X------^^^^^^^", "-X------^^^---^", "-X-------&-----", "-X------^^^---^", "-X------^^^^^^^", "-X------^^^^^^^", "-X------^^^^^^^", "^^^^--XXXXXXXXX"], "2_15_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "------#XXXX----", "---&---XXXX--XX", "--------*----XX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_15_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "------#XXXX----", "---&---XXXX--XX", "--------*----XX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_15_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "-------#XXXX---", "XX------XXXX---", "XX--*----*-----", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXX-", "XXXXXXXXXXXXXXX"], "11_0_0": ["----^^^^^^^^^^^", "\\\\-------*----*", "//-------------", "--------^^^--^^", "------^^^^^^^^^", "---------&----&", "------^^^^^^^^^", "--------^^^--^^", "&--------------", "---------*----*", "----^^^^^^^^^^^"], "11_0_1": ["----^^^^^^^^^^^", "\\\\-------*----*", "//-------------", "--------^^^--^^", "------^^^^^^^^^", "---------&----&", "------^^^^^^^^^", "--------^^^--^^", "&--------------", "---------*----*", "----^^^^^^^^^^^"], "11_0_2": ["^^^^^^^^^--^^^-", "------X----^^^-", "-----------^^^-", "------------*--", "-----------^^^-", "-----------^^^-", "-----------^^^-", "---------------", "--X--------^^^-", "--X--------^^^-", "^^^^^^^^^--^^^-"], "6_8_0": ["--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "---*--------#XX", "--^^^--------XX", "---&-----#----*", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX"], "6_8_1": ["--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "---*--------#XX", "--^^^--------XX", "---&-----#----*", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX", "--^^^--XXXXXXXX"], "2_16_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "----------#XXXX", "---XXXXX---XXXX", "---XXXXX----*--", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_16_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "----------#XXXX", "---XXXXX---XXXX", "---XXXXX----*--", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_16_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "----------#XXXX", "XXXXX------XXXX", "XXXXX--*----*--", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_17_0": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXX--#XXXX-", "XXXXXXX---XXXX-", "-*---------*---", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_17_1": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXX--#XXXX-", "XXXXXXX---XXXX-", "-*---------*---", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "2_17_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXX---#XXX", "XXXXXXXX----XXX", "-*-----------*-", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "3_16_0": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "----#XXXX--#XXX", "-&---XXXX---XXX", "------*------*-", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "3_16_1": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "----#XXXX--#XXX", "-&---XXXX---XXX", "------*------*-", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "3_16_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXX-----#XXXXX", "XXXX------XXXX-", "-*----*----*---", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "11_3_0": ["------^^^^^^^^^", "--------X--X--X", "--------X--X--X", "--------X--X--X", "--------X--X--X", "---#----X-#X-#X", "--------X--X--X", "/\\\\-----X--X--X", "\\//-----X--X--X", "---------------", "*-----^^^^^^^^^"], "11_3_1": ["------^^^^^^^^^", "--------X--X--X", "--------X--X--X", "--------X--X--X", "--------X--X--X", "---#----X-#X-#X", "--------X--X--X", "/\\\\-----X--X--X", "\\//-----X--X--X", "---------------", "*-----^^^^^^^^^"], "4_11_0": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "---------*---*-", "---------------", "------#---#---#", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "4_11_1": ["----XXXXXXXXXXX", "\\\\--XXXXXXXXXXX", "//--XXXXXXXXXXX", "----XXXXXXXXXXX", "---------*---*-", "---------------", "------#---#---#", "----XXXXXXXXXXX", "&---XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "4_11_2": ["XXXXXXXXXX--^^^", "XXXXXXXXXX----X", "XXXXXXXXXX----X", "XXXXXXXXXX----X", "XXXX----------X", "XXXX----------X", "-*----*-------X", "XXXXXXXXXX----X", "XXXXXXXXXX----X", "XXXXXXXXXX-----", "XXXXXXXXXX--^^^"], "11_5_0": ["-----^^^^^^^^^^", "--------X--X--X", "X-------X--X--X", "XXX-----X--X--X", "-XX-----X--X--X", "-XX-----X-#X-#X", "-XX-----X--X--X", "#XX-----X--X--X", "-XX-----X--X--X", "-XX------------", "-XX--^^^^^^^^^^"], "11_5_1": ["-----^^^^^^^^^^", "--------X--X--X", "X-------X--X--X", "XXX-----X--X--X", "-XX-----X--X--X", "-XX-----X-#X-#X", "-XX-----X--X--X", "#XX-----X--X--X", "-XX-----X--X--X", "-XX------------", "-XX--^^^^^^^^^^"], "11_5_2": ["X--^^^^^^^^^^^^", "X--------------", "---------------", "-----X--X----XX", "X----X--X^---X*", "X----XXXX^^--X&", "X----X--X^---X*", "X----X--X----XX", "X-------//\\\\//\\", "X-------\\\\//\\\\/", "X--^^^^^^^^^^^^"], "11_6_0": ["^^^^^^^^^^--XXX", "----X--X----XXX", "-X--X--X----XXX", "-X--X--X----XXX", "-X--X--X----XXX", "#X-#X-#X----XXX", "-X--X--X----XXX", "-X--X--X-------", "-X--X--X-------", "-X----------XX-", "^^^^^^^^^^--XXX"], "11_6_1": ["^^^^^^^^^^--XXX", "----X--X----XXX", "-X--X--X----XXX", "-X--X--X----XXX", "-X--X--X----XXX", "#X-#X-#X----XXX", "-X--X--X----XXX", "-X--X--X-------", "-X--X--X-------", "-X----------XX-", "^^^^^^^^^^--XXX"], "11_4_0": ["----^^^^^^^^^^^", "\\\\---------X--X", "//------X--X--X", "-------XX--X--X", "------XXX--X--X", "------X#*--X--X", "------XXX--X--X", "-------XX--X--X", "&-------X--X--X", "---------------", "----^^^^^^^^^^^"], "11_4_1": ["------^^^^^^^^^", "---------------", "X-------X------", "XXX-----XX----X", "-XX-----XXX--XX", "-XX-----*#X--X#", "-XX-----XXX--XX", "#XX-----XX----X", "-XX-----X------", "-XX------------", "-XX---^^^^^^^^^"], "11_4_2": ["^^^^^^^^^^--XXX", "-------X------X", "-X--X--X-------", "-X--X--X------X", "-X--X--X-------", "#X-#X-#X------X", "-X--X--X-------", "-X--X--X------X", "-X--X--X-------", "-X--X---------X", "^^^^^^^^^^--XXX"], "12_5_0": ["^^^^^^^^^^--XX^", "----X--X----XX^", "-X--X--X----XX^", "-X--X--X----XX^", "-X--X--X----XX^", "#X-#X-#X----XX^", "-X--X--X----XX^", "-X--X--X------^", "-X--X--X-------", "-X----------XX-", "^^^^^^^^^^--XX^"], "12_5_1": ["^^^^^^^^^^--XX^", "----X--X----XX^", "-X--X--X----XX^", "-X--X--X----XX^", "-X--X--X----XX^", "#X-#X-#X----XX^", "-X--X--X----XX^", "-X--X--X------^", "-X--X--X-------", "-X----------XX-", "^^^^^^^^^^--XX^"], "10_5_0": ["------^^^^^^^^^", "--------X--X--X", "X-------X--X--X", "XXX-----X--X--X", "-XX-----X--X--X", "-XX-----X-#X-#X", "-XX-----X--X--X", "#XX-----X--X--X", "-XX-----X--X--X", "-XX------------", "-XX---^^^^^^^^^"], "10_5_1": ["------^^^^^^^^^", "--------X--X--X", "X-------X--X--X", "XXX-----X--X--X", "-XX-----X--X--X", "-XX-----X-#X-#X", "-XX-----X--X--X", "#XX-----X--X--X", "-XX-----X--X--X", "-XX------------", "-XX---^^^^^^^^^"], "9_6_0": ["XXXX--^^^^^^^^^", "-XXX----X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "--------X--X--X", "--------X--X-#X", "--------X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "#XXX-----------", "XXXX--^^^^^^^^^"], "9_6_1": ["XXXX--^^^^^^^^^", "-XXX----X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "--------X--X--X", "--------X--X-#X", "--------X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "#XXX-----------", "XXXX--^^^^^^^^^"], "9_6_2": ["^^^^^^^^^^--XX-", "------------XX-", "------------XX-", "X----XXX----XX-", "X^---X*X-------", "X^^--X&--------", "X^---X*X----XX-", "X----XXX----XX-", "//\\\\//\\\\----XX-", "\\\\//\\\\//----XX-", "^^^^^^^^^^--XX-"], "9_7_0": ["XXXX--^^^^^^^^^", "XXXX----X--X--X", "XXXX----X--X--X", "XXXX----X--X--X", "XXXX----X--X--X", "XXXX----X-#X-#X", "XXXX----X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "---------------", "XXXX--^^^^^^^^^"], "9_7_1": ["XXXX--^^^^^^^^^", "XXXX----X--X--X", "XXXX----X--X--X", "XXXX----X--X--X", "XXXX----X--X--X", "XXXX----X-#X-#X", "XXXX----X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "---------------", "XXXX--^^^^^^^^^"], "9_7_2": ["^^^^^^^^^^--XXX", "------------XXX", "------------XXX", "X----XXX----XXX", "X^---X*X----XXX", "X^^--X&-----XXX", "X^---X*X----XXX", "X----XXX------X", "//\\\\//\\\\-------", "\\\\//\\\\//----XX-", "^^^^^^^^^^--XXX"], "10_6_0": ["XXXX--^^^^^^^^^", "-XXX----X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "--------X--X--X", "--------X-#X-#X", "--------X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "#XXX-----------", "XXXX--^^^^^^^^^"], "10_6_1": ["XXXX--^^^^^^^^^", "-XXX----X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "--------X--X--X", "--------X-#X-#X", "--------X--X--X", "-XXX----X--X--X", "-XXX----X--X--X", "#XXX-----------", "XXXX--^^^^^^^^^"], "10_6_2": ["^^^^^^^^^^--XXX", "------------XXX", "------------XXX", "X----XXX----XXX", "X^---X*X------#", "X^^--X&--------", "X^---X*X-------", "X----XXX----XXX", "//\\\\//\\\\----XXX", "\\\\//\\\\//----XXX", "^^^^^^^^^^--XXX"], "7_9_0": ["-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "--*-----*---#XX", "-^^^---------XX", "--&------#----*", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX"], "7_9_1": ["-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "--*-----*---#XX", "-^^^---------XX", "--&------#----*", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX", "-^^^--XXXXXXXXX"], "8_8_0": ["XXXXXXXX--^^^^^", "-XXXXXXX-------", "-XXXXXXX------X", "-XXXXXXX-----XX", "------------XXX", "---&--------X#*", "------*-----XXX", "-XXXXXXX-----XX", "-XXXXXXX------X", "#XXXXXXX-------", "XXXXXXXX--^^^^^"], "8_8_1": ["XXXXXXXX--^^^^^", "-XXXXXXX-------", "-XXXXXXX------X", "-XXXXXXX-----XX", "------------XXX", "---&--------X#*", "------*-----XXX", "-XXXXXXX-----XX", "-XXXXXXX------X", "#XXXXXXX-------", "XXXXXXXX--^^^^^"], "11_2_0": ["------^^^^^^^^^", "--------^------", "--------^----X-", "--------^---XX-", "--------^--XXX-", "---#-------X#*-", "--------&--XXX-", "/\\\\---------XX-", "\\//----------X-", "---------------", "*-----^^^^^^^^^"], "11_2_1": ["------^^^^^^^^^", "--------^------", "--------^----X-", "--------^---XX-", "--------^--XXX-", "---#-------X#*-", "--------&--XXX-", "/\\\\---------XX-", "\\//----------X-", "---------------", "*-----^^^^^^^^^"], "11_2_2": ["----^^^^^^^^^^^", "\\\\---------^^^^", "//------X--^^^^", "-------XX--^^^^", "------XXX--^^^^", "------X#*------", "------XXX--^^^^", "-------XX--^^^^", "&-------X--^^^^", "-----------^^^^", "----^^^^^^^^^^^"], "5_11_0": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----*------*--", "#--------------", "------#--#---#-", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "5_11_1": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----*------*--", "#--------------", "------#--#---#-", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "5_11_2": ["XXXXXXXXXXXXXXX", "XXXXXXXXX--^^^^", "XXXXXXXXX----^^", "XXXXXXXXX------", "XXXX-----------", "XXXX-----------", "-*----*--------", "XXXXXXXXX------", "XXXXXXXXX----^^", "XXXXXXXXX--^^^^", "XXXXXXXXXXXXXXX"], "6_10_0": ["----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "^--------*---*-", "^^-------------", "^-----#---#---#", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "6_10_1": ["----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "^--------*---*-", "^^-------------", "^-----#---#---#", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX", "----XXXXXXXXXXX"], "6_10_2": ["XXXXXXXX--^^^^^", "XXXXXXXX----X--", "XXXXXXXX----X--", "XXXXXXXX----X--", "XXXXXX------X--", "XXXXXX------X-#", "-*----------X--", "XXXXXXXX----X--", "XXXXXXXX----X--", "XXXXXXXX-------", "XXXXXXXX--^^^^^"], "10_7_0": ["^^^^^^^^^--XXXX", "-----------XXXX", "----X------XXXX", "XX--XX-----XXXX", "*X--XXX----XXXX", "&---*#X----XXXX", "*X--XXX----XXXX", "XX--XX-------XX", "\\\\--X----------", "//---------XX--", "^^^^^^^^^--XXXX"], "10_7_1": ["^^^^^^^^^--XXXX", "-----------XXXX", "----X------XXXX", "XX--XX-----XXXX", "*X--XXX----XXXX", "&---*#X----XXXX", "*X--XXX----XXXX", "XX--XX-------XX", "\\\\--X----------", "//---------XX--", "^^^^^^^^^--XXXX"], "15_5_0": ["^^^^^^^^^^^^^^^", "-#-------------", "-X-------------", "-X--X---X----XX", "-X--X---X^---X*", "-X--XXXXX^^--X&", "-X--X---X^---X*", "-X--X---X----XX", "-X------//\\\\//\\", "-X------\\\\//\\\\/", "^^^^^^^^^^^^^^^"], "15_5_1": ["^^^^^^^^^^^^^^^", "-#-------------", "-X-------------", "-X--X---X----XX", "-X--X---X^---X*", "-X--XXXXX^^--X&", "-X--X---X^---X*", "-X--X---X----XX", "-X------//\\\\//\\", "-X------\\\\//\\\\/", "^^^^^^^^^^^^^^^"], "15_5_2": ["^^^^^^^^^^^^^^^", "---------------", "------------X--", "X----XXX---XX--", "X^---X*X--XXX--", "X^^--X&---X#*--", "X^---X*X--XXX--", "X----XXX---XX--", "//\\\\//\\\\----X--", "\\\\//\\\\//-------", "^^^^^^^^^^^^^^^"], "12_4_0": ["----^^^^^^^^^^^", "\\\\---------X--X", "//------X--X--X", "-------XX--X--X", "------XXX--X--X", "------X#*--X-#X", "------XXX--X--X", "-------XX--X--X", "&-------X--X--X", "---------------", "----^^^^^^^^^^^"], "12_4_1": ["----^^^^^^^^^^^", "\\\\---------X--X", "//------X--X--X", "-------XX--X--X", "------XXX--X--X", "------X#*--X-#X", "------XXX--X--X", "-------XX--X--X", "&-------X--X--X", "---------------", "----^^^^^^^^^^^"], "12_4_2": ["^^^^^^^^^^--^^^", "--------------X", "--------------X", "X----XXX------X", "X^---X*X------X", "X^^--X&-------X", "X^---X*X------X", "X----XXX------X", "//\\\\//\\\\------X", "\\\\//\\\\//-------", "^^^^^^^^^^--^^^"], "8_9_0": ["XXXXXXXXXXXXXXX", "^^^^^^--XXXXXXX", "^^^-----XXXXXXX", "--------XXXXXXX", "--//\\\\-------*-", "--\\\\//---------", "----------#---#", "--------XXXXXXX", "^^^-----XXXXXXX", "^^^^^^--XXXXXXX", "XXXXXXXXXXXXXXX"], "8_9_1": ["XXXXXXXXXXXXXXX", "^^^^^^--XXXXXXX", "^^^-----XXXXXXX", "--------XXXXXXX", "--//\\\\-------*-", "--\\\\//---------", "----------#---#", "--------XXXXXXX", "^^^-----XXXXXXX", "^^^^^^--XXXXXXX", "XXXXXXXXXXXXXXX"], "8_9_2": ["^^^^--XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "XX----XXXXXXXXX", "*X-------*---*-", "&--------------", "*X--------#---#", "XX----XXXXXXXXX", "\\\\----XXXXXXXXX", "//----XXXXXXXXX", "^^^^--XXXXXXXXX"], "9_8_0": ["^^^^^^^--XXXXXX", "---------XXXXXX", "----X----XXXXXX", "---XX----XXXXXX", "--XXX------#XXX", "--X#*-------XXX", "--XXX--------*-", "---XX----XXXXXX", "----X----XXXXXX", "---------XXXXXX", "^^^^^^^--XXXXXX"], "9_8_1": ["^^^^^^^--XXXXXX", "---------XXXXXX", "----X----XXXXXX", "---XX----XXXXXX", "--XXX------#XXX", "--X#*-------XXX", "--XXX--------*-", "---XX----XXXXXX", "----X----XXXXXX", "---------XXXXXX", "^^^^^^^--XXXXXX"], "16_5_0": ["^^^^^^^^^^^^^^^", "-----X--X--X--X", "-----X--X--X--X", "XX---X--X--X--X", "*X---X--X--X--X", "&----X-#X-#X-#X", "*X---X--X--X--X", "XX---X--X--X--X", "\\\\---X--X--X--X", "//-------------", "^^^^^^^^^^^^^^^"], "16_5_1": ["^^^^^^^^^^^^^^^", "-----X--X--X--X", "-----X--X--X--X", "XX---X--X--X--X", "*X---X--X--X--X", "&----X-#X-#X-#X", "*X---X--X--X--X", "XX---X--X--X--X", "\\\\---X--X--X--X", "//-------------", "^^^^^^^^^^^^^^^"], "7_10_0": ["XXXXXXXXXXXXXXX", "^^^^^^--XXXXXXX", "^^^-----XXXXXXX", "--------XXXXXXX", "--//\\\\----#XXXX", "--\\\\//-----XXXX", "------------*--", "--------XXXXXXX", "^^^-----XXXXXXX", "^^^^^^--XXXXXXX", "XXXXXXXXXXXXXXX"], "7_10_1": ["XXXXXXXXXXXXXXX", "^^^^^^--XXXXXXX", "^^^-----XXXXXXX", "--------XXXXXXX", "--//\\\\----#XXXX", "--\\\\//-----XXXX", "------------*--", "--------XXXXXXX", "^^^-----XXXXXXX", "^^^^^^--XXXXXXX", "XXXXXXXXXXXXXXX"], "7_10_2": ["^^^^^--XXXXXXXX", "-------XXXXXXXX", "-------XXXXXXXX", "XXX----XXXXXXXX", "X*X------#XXXXX", "X&--------XXXX-", "X*X--------*---", "XXX----XXXXXXXX", "/\\\\----XXXXXXXX", "\\//----XXXXXXXX", "^^^^^--XXXXXXXX"], "4_16_0": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-#XXXX-----#XXX", "--XXXX------XXX", "---*----*----*-", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "4_16_1": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-#XXXX-----#XXX", "--XXXX------XXX", "---*----*----*-", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "6_11_0": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----*---*---*-", "#--------------", "------#---#---#", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "6_11_1": ["---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "-----*---*---*-", "#--------------", "------#---#---#", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX", "---XXXXXXXXXXXX"], "1_17_0": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "--------#XXXXX-", "XXXXXX---XXXXX-", "XXXXXX----*----", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "1_17_1": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "---------#XXXX-", "XXXXXXX---XXXX-", "XXXXXXX----*---", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "15_6_0": ["^^^^^^^^^^^^^^^", "---------------", "---------------", "XXX--X--X----XX", "X*X--X--X^---X*", "X&---XXXX^^--X&", "X*X--X--X^---X*", "XXX--X--X----XX", "/\\\\-----//\\\\//\\", "\\//-----\\\\//\\\\/", "^^^^^^^^^^^^^^^"], "15_6_1": ["^^^^^^^^^^^^^^^", "---------------", "---------------", "XXX--X--X----XX", "X*X--X--X^---X*", "X&---XXXX^^--X&", "X*X--X--X^---X*", "XXX--X--X----XX", "/\\\\-----//\\\\//\\", "\\//-----\\\\//\\\\/", "^^^^^^^^^^^^^^^"], "15_6_2": ["^^^^^^^^^^^^^^^", "---------------", "---------------", "XXX--X--X----XX", "X*X--X--X^---X*", "X&---XXXX^^--X&", "X*X--X--X^---X*", "XXX--X--X----XX", "/\\\\-----//\\\\//\\", "\\//-----\\\\//\\\\/", "^^^^^^^^^^^^^^^"], "4_15_0": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---#XXXX-----#X", "----XXXX------X", "-----*----*----", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "4_15_1": ["XXXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "---#XXXX--#XXXX", "----XXXX---XXXX", "-----*------*--", "-XXXXXXXXXXXXXX", "-XXXXXXXXXXXXXX", "#XXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_15_0": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-----*---*---*-", "XX-------------", "XX----#---#---#", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "5_15_1": ["XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "-----*---*---*-", "XX-------------", "XX----#---#---#", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX", "XXXXXXXXXXXXXXX"], "8_10_0": ["^^^^--XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "XX----XXXXXXXXX", "*X------*---#XX", "&------------XX", "*X-------#----*", "XX----XXXXXXXXX", "\\\\----XXXXXXXXX", "//----XXXXXXXXX", "^^^^--XXXXXXXXX"], "8_10_1": ["^^^^--XXXXXXXXX", "------XXXXXXXXX", "------XXXXXXXXX", "XX----XXXXXXXXX", "*X------*---#XX", "&------------XX", "*X-------#----*", "XX----XXXXXXXXX", "\\\\----XXXXXXXXX", "//----XXXXXXXXX", "^^^^--XXXXXXXXX"], "7_11_0": ["^^^^^--XXXXXXXX", "-------XXXXXXXX", "-------XXXXXXXX", "XXX----XXXXXXXX", "X*X----XX--#XXX", "X&-----XX---XXX", "X*X----------*-", "XXX----XXXXXXXX", "/\\\\----XXXXXXXX", "\\//----XXXXXXXX", "^^^^^--XXXXXXXX"], "7_11_1": ["^^^^^--XXXXXXXX", "-------XXXXXXXX", "-------XXXXXXXX", "XXX----XXXXXXXX", "X*X----XX--#XXX", "X&-----XX---XXX", "X*X----------*-", "XXX----XXXXXXXX", "/\\\\----XXXXXXXX", "\\//----XXXXXXXX", "^^^^^--XXXXXXXX"] };

// src/generation/levelGenerator.ts
class LevelGenerator {
  map;
  width;
  height;
  roomWidth;
  roomHeight;
  levelNames;
  widthMultiplier;
  heightMultiplier;
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.roomWidth = LEVELS["0_0_0"][0].length;
    this.roomHeight = LEVELS["0_0_0"].length;
    this.levelNames = Object.keys(LEVELS);
    this.roomWidth = START_ROOM[0].length;
    this.roomHeight = START_ROOM.length;
    this.widthMultiplier = this.roomWidth + Config.padding;
    this.heightMultiplier = this.roomHeight + Config.padding;
    this.map = new GameMap(width * this.widthMultiplier, height * this.heightMultiplier);
  }
  setTile(pos, tile3) {
    switch (tile3) {
      case "X": {
        break;
      }
      case "~":
        this.map.setTile(pos, tileFactory_default.bottomMiddleWall);
        break;
      case "T":
        this.map.setTile(pos, tileFactory_default.tombstone);
        break;
      case "t":
        this.map.setTile(pos, tileFactory_default.grave);
        break;
      case "x":
        this.map.setTile(pos, tileFactory_default.anvil);
        break;
      case "#": {
        this.map.setTile(pos, tileFactory_default.floor);
        spawnEnemy(this.map, pos);
        break;
      }
      case "-": {
        this.map.setTile(pos, tileFactory_default.floor);
        break;
      }
      case ",": {
        this.map.setTile(pos, tileFactory_default.decoratedFloor);
        break;
      }
      case "/": {
        this.map.setTile(pos, tileFactory_default.forwardSlash);
        break;
      }
      case "\\": {
        this.map.setTile(pos, tileFactory_default.backwardSlash);
        break;
      }
      case "*": {
        this.map.setTile(pos, tileFactory_default.floor);
        spawnPotion(this.map, pos);
        break;
      }
      case "a": {
        this.map.setTile(pos, tileFactory_default.floor);
        spawnAltar(this.map, pos);
        break;
      }
      case "&": {
        this.map.setTile(pos, tileFactory_default.floor);
        choice([
          spawnStunScroll,
          spawnConfusionScroll,
          spawnLightningScroll,
          spawnReturnToAltarScroll
        ])(this.map, pos);
        break;
      }
      default: {
        this.map.setTile(pos, tileFactory_default.floor);
        console.warn(`Unhandled tile type: ${tile3}`);
        break;
      }
    }
  }
  setRoom(room, startX, startY) {
    for (let y = 0;y < room.length; ++y) {
      for (let x = 0;x < room[0].length; ++x) {
        const char = room[y][x];
        this.setTile(new Point(startX + x, startY + y), char);
      }
    }
  }
  decorate() {
    let p = new Point(0, 0);
    for (let y = 0;y < this.map.height(); ++y) {
      p.y = y;
      for (let x = 0;x < this.map.height(); ++x) {
        p.x = x;
        if (!this.map.isWalkable(p)) {
          const [up, down, left, right] = this.map.getWallNeighbors(p);
          if (!up && down && left && right) {
            this.setTile(p, "~");
          } else if (!up && !down && !left && !right) {
            this.setTile(p, choice(["T", "t", "x"]));
          }
        } else if (Math.random() < 0.05) {
          this.setTile(p, ",");
        }
      }
    }
  }
}

// src/generation/room.ts
class Room2 {
  x1;
  y1;
  x2;
  y2;
  constructor(x, y, width, height) {
    this.x1 = x;
    this.x2 = x + width;
    this.y1 = y;
    this.y2 = y + height;
  }
  center() {
    return new Point(Math.round((this.x1 + this.x2) / 2), Math.round((this.y1 + this.y2) / 2));
  }
  intersects(others) {
    const size = others.length;
    let other;
    for (let i = 0;i < size; ++i) {
      other = others[i];
      if (this.x1 - 1 <= other.x2 && this.x2 + 1 >= other.x1 && this.y1 - 1 <= other.y2 && this.y2 + 1 >= other.y1) {
        return true;
      }
    }
    return false;
  }
  left() {
    return new Point(this.x1, Math.floor((this.y1 + this.y2) / 2));
  }
  right() {
    return new Point(this.x2, Math.floor((this.y1 + this.y2) / 2));
  }
  up() {
    return new Point(Math.floor((this.x1 + this.x2) / 2), this.y1);
  }
  down() {
    return new Point(Math.floor((this.x1 + this.x2) / 2), this.y2);
  }
}

// src/utility/clingoSolver.ts
var import_clingo_wasm = __toESM(require_clingo_web(), 1);

// src/generation/layoutLP.ts
var LP = `
%%%%%%%%%%%%%% Problem Definition %%%%%%%%%%%%%%
%%% #const width=9.
%%% #const height=9.
%%% #const gems=3.
#const dist=(width+height)/4.

param("width",width).
param("height",height).

col(1..width).
row(1..height).

start((1,1)).
finish((width,height)).

% define grid of tiles
tile((X,Y)) :- col(X), row(Y).

% define adjacency
adj((X1,Y1),(X2,Y2)) :- tile((X1,Y1)), tile((X2,Y2)), |X1-X2|+|Y1-Y2| == 1.

% define tile types
type(wall).
type(gem).
type(altar).
type(room).

% tiles have at most one named sprite
1 { sprite(T,P) : type(P) } 1 :- tile(T).

% there is exactly one altar and two gems in the whole level
:- not 1 { sprite(T,altar) } 1.
:- not gems { sprite(T,gem) } gems.

% Note this is an implication rule so it is excluding sets. So the one below
% is excluding solutions where walls don't occur at least 50% of the time.
% style : at least half of the map has wall sprites
:- not (width*height)/2 { sprite(T,wall) }.


%%%%%%%%%%%%%% Reachability %%%%%%%%%%%%%%
% 1 ==> initial
touch(T,1) :- start(T).

% 2 ==> after picking up gem
{ touch(T2,2) : adj(T1, T2) } :- touch(T1,1), sprite(T1, gem).

% 3 ==> after putting gem in altar
{ touch(T2,3) : adj(T1, T2) } :- touch(T1,2), sprite(T1, altar).

% general move with the past state
{ touch(T2,S) : adj(T1, T2) } :- touch(T1,S).

% You can't touch a wall.
:- sprite(T1, wall), touch(T1, S).

% The level must be beatable.
completed :- finish(T), touch(T, 3).
:- not completed.

%%%%%%%%%%%%%% Style %%%%%%%%%%%%%%
% Altars have no surrounding walls for two steps
0 { sprite(T2, wall) : adj(T1,T2) } 0 :- sprite(T1, altar).
0 { sprite(T3, wall) : adj(T1,T2), adj(T2,T3) } 0 :- sprite(T1, altar).

% Distance between altar and key must be reasonably large
|X1-X2|+|Y1-Y2| > dist :- sprite((X1, Y1), altar), sprite((X2, Y2), gem).

% Distance between gems must be reasonably large
|X1-X2|+|Y1-Y2| > dist :- X1 != X2, sprite((X1, Y1), gem), sprite((X2, Y2), gem).
|X1-X2|+|Y1-Y2| > dist :- Y1 != Y2, sprite((X1, Y1), gem), sprite((X2, Y2), gem).

% All non-wall tiles must be reachable
:- tile(T1), not touch(T1, 1), not sprite(T1, wall).
:- tile(T1), not touch(T1, 2), not sprite(T1, wall).
:- tile(T1), not touch(T1, 3), not sprite(T1, wall).

#show sprite/2.
`;

// src/utility/clingoSolver.ts
class ClingoSolver {
  static async init() {
    await import_clingo_wasm.init("https://cdn.jsdelivr.net/npm/clingo-wasm@0.1.1/dist/clingo.wasm");
  }
  static async get(width, height, potions) {
    const asp = `#const width=${width}.\n#const height=${height}.\n#const gems=${potions}.\n${LP}`;
    let result = await import_clingo_wasm.run(asp, undefined, [`--seed=${rng_default.getUniformInt(0, 1e4)}`, "--rand-freq=1"]);
    const satisfiable = result.Result == "SATISFIABLE";
    if (satisfiable) {
      let sprites = [];
      for (let solution of result.Call[0]["Witnesses"][0]["Value"]) {
        solution = solution.substring(8);
        solution = solution.substring(0, solution.length - 1);
        let split = solution.split(",");
        const x = parseInt(split[0]) - 1;
        const y = parseInt(split[1].substring(0, split[1].length - 1)) - 1;
        sprites.push([x, y, split[2]]);
      }
      return [false, sprites];
    } else {
      console.error(result);
      return [true, []];
    }
  }
}

// src/game/progression.ts
class Progression {
  static potions = -1;
  static getLayout(level, callback) {
    if (level === 1) {
      callback(Progression.tutorial());
      return;
    }
    if (this.potions === -1) {
      this.potions = level;
    }
    let w, h;
    const r = Math.random();
    if (r <= 0.45) {
      w = level * 3;
      h = level * 2;
    } else if (r <= 0.9) {
      w = level * 2;
      h = level * 3;
    } else {
      w = level * 3;
      h = level * 3;
    }
    ClingoSolver.get(w, h, this.potions).then((result) => {
      if (result[0]) {
        console.error(`Generation failed for level ${this.potions}, increase the map size.`);
        this.getLayout(level + 1, callback);
      } else {
        this.potions = -1;
        callback(result[1]);
      }
    });
  }
  static tutorial() {
    const layout = [
      [1, 1, "altar"],
      [1, 2, "gem"],
      [1, 0, "room"],
      [2, 1, "room"],
      [0, 1, "room"]
    ];
    return layout;
  }
}

// src/generation/mainGenerator.ts
class MainGenerator extends LevelGenerator {
  constructor() {
    super(...arguments);
  }
  getRoom(type) {
    switch (type) {
      case "gem": {
        return POTION_ROOMS[rng_default.getUniformInt(0, POTION_ROOMS.length - 1)];
      }
      case "altar": {
        return START_ROOM;
      }
      case "room": {
        return ROOMS[rng_default.getUniformInt(0, ROOMS.length - 1)];
      }
      case "wall": {
        return;
      }
      default: {
        MessageLog.addErrorMessage(`Unhandled room type for generation "${type}". Please contact admin.`, true);
        return;
      }
    }
  }
  fillInLayout(layout, callback) {
    let playerPos = new Point(0, 0);
    let rooms4 = {};
    for (let i = 0;i < layout.length; ++i) {
      let [x, y, type] = layout[i];
      let room2 = this.getRoom(type);
      if (room2 === undefined) {
        continue;
      }
      const roomX = x * this.widthMultiplier + rng_default.getUniformInt(2, Config.padding - 2);
      const roomY = y * this.heightMultiplier + rng_default.getUniformInt(2, Config.padding - 2);
      this.setRoom(room2, roomX, roomY);
      rooms4[`${x},${y}`] = new Room2(roomX, roomY, this.roomWidth, this.roomHeight);
      if (type === "altar") {
        const center = rooms4[`${x},${y}`].center();
        playerPos.x = center.x;
        playerPos.y = center.y;
      }
    }
    for (let key in rooms4) {
      let [_x, _y] = key.split(",");
      let x = parseInt(_x);
      let y = parseInt(_y);
      let newK = `${x},${y + 1}`;
      if (newK in rooms4) {
        let p1 = rooms4[key].down();
        let p2 = rooms4[newK].up();
        bresenham(p1, p2, (drawPos) => {
          this.map.setTile(drawPos, tileFactory_default.floor);
        });
      }
      newK = `${x + 1},${y}`;
      if (newK in rooms4) {
        let p1 = rooms4[key].right();
        let p2 = rooms4[newK].left();
        bresenham(p1, p2, (drawPos) => {
          this.map.setTile(drawPos, tileFactory_default.floor);
        });
      }
    }
    callback(playerPos);
  }
  generate(level, callback) {
    Progression.getLayout(level, (layout) => {
      this.fillInLayout(layout, callback);
    });
  }
}

// src/game/game.ts
class Game {
  level;
  gameDisplay;
  uiCanvas;
  uiCtx;
  map;
  config;
  delta;
  mapGenerating;
  constructor(tileSet) {
    this.config = { roomCols: 5, roomRows: 5 };
    this.uiCanvas = document.createElement("canvas");
    this.uiCanvas.setAttribute("id", "uiCanvas");
    this.uiCtx = this.uiCanvas.getContext("2d");
    this.gameDisplay = new display_default({
      width: Config.width,
      height: Config.height,
      layout: "tile-gl",
      tileWidth: 32,
      tileHeight: 32,
      bg: colorBlack,
      tileSet,
      tileColorize: true,
      tileMap: {
        "@": [128, 224],
        s: [160, 224],
        c: [224, 224],
        "#": [128, 96],
        ".": [0, 128],
        ",": [192, 96],
        g: [224, 32],
        G: [256, 32],
        a: [224, 64],
        A: [256, 64],
        E: [64, 320],
        "*": [192, 288],
        "%": [0, 288],
        X: [64, 192],
        T: [128, 160],
        t: [160, 160],
        "~": [64, 64]
      }
    });
    this.map = new GameMap(Config.width, Config.height);
    this.gameDisplay.getContainer().setAttribute("id", "gameCanvas");
    document.getElementById("game").appendChild(this.uiCanvas);
    document.getElementById("game").appendChild(this.gameDisplay.getContainer());
    this.delta = 0;
    this.mapGenerating = false;
    this.level = 1;
  }
  generateMap() {
    this.mapGenerating = true;
    let generator = new MainGenerator(this.config.roomRows, this.config.roomRows);
    generator.generate(this.level, (playerPos) => {
      generator.decorate();
      if (this.level === 1) {
        this.map = generator.map;
        spawnPlayer(this.map, playerPos);
      } else {
        generator.map.player().pos = playerPos;
        generator.map.player().inventory = this.map.player().inventory;
        this.map = generator.map;
      }
      this.render(null, true);
      this.mapGenerating = false;
    });
  }
  setUISize() {
    const log = document.getElementById("messages");
    const gameCanvas = document.getElementById("gameCanvas");
    Config.canvasOffsetLeft = gameCanvas.offsetLeft;
    Config.canvasOffsetTop = gameCanvas.offsetTop;
    log.style.left = `${gameCanvas.offsetLeft}px`;
    log.style.width = `${gameCanvas.width}px`;
    Config.screenHeight = gameCanvas.height;
    Config.screenWidth = gameCanvas.width;
    Config.tileHeight = gameCanvas.height / Config.height;
    Config.tileWidth = gameCanvas.width / Config.width;
    this.uiCanvas.width = Config.screenWidth;
    this.uiCanvas.height = Config.screenHeight;
    const style = window.getComputedStyle(gameCanvas);
    this.uiCanvas.style.marginLeft = style.marginLeft;
    this.uiCanvas.style.marginRight = style.marginRight;
    this.uiCanvas.style.marginTop = style.marginTop;
    this.uiCanvas.style.marginBottom = style.marginBottom;
  }
  render(menu2, computeFOV) {
    this.gameDisplay.clear();
    this.uiCtx.clearRect(0, 0, Config.screenWidth, Config.screenHeight);
    if (computeFOV) {
      this.map.computeFOV();
    }
    this.map.render(this.gameDisplay);
    if (menu2 !== null) {
      menu2.render(this.uiCtx);
    }
  }
  start() {
    document.getElementById("game").appendChild(this.gameDisplay.getContainer());
    this.setUISize();
    let oldTimeStamp;
    let fps;
    let handlingAnimation = true;
    let menu2 = mainMenu(() => {
      this.generateMap();
    });
    addEventListener("resize", () => {
      this.setUISize();
      this.render(menu2, false);
    });
    const gameLoop = (timeStamp) => {
      this.delta = (timeStamp - oldTimeStamp) / 1000;
      oldTimeStamp = timeStamp;
      fps = Math.round(1 / this.delta);
      if (handlingAnimation === true && !AnimationManager.animationIsRunning()) {
        handlingAnimation = false;
        this.uiCtx.clearRect(0, 0, Config.screenWidth, Config.screenHeight);
        if (AnimationManager.getShouldRender()) {
          this.render(menu2, true);
        }
      }
      if (this.mapGenerating) {
      } else if (AnimationManager.animationIsRunning()) {
        if (AnimationManager.getShouldRender()) {
          this.render(null, AnimationManager.shouldComputeFOV);
        }
        AnimationManager.update(this.delta, this.uiCtx);
        handlingAnimation = true;
      } else if (menu2 !== null) {
        menu2.update(this.uiCtx);
        if (menu2.shouldExit) {
          menu2.clear(this.uiCtx);
          menu2 = null;
          InputManager.clear();
        } else if (menu2.shouldRender) {
          this.render(menu2, false);
        }
      } else if (InputManager.isKeyDown(Key.H)) {
        menu2 = helpMenu();
        this.render(menu2, false);
        InputManager.clear();
      } else if (InputManager.isKeyDown(Key.Q)) {
        menu2 = inventoryMenu(this.map, this.map.player());
        this.render(menu2, false);
        InputManager.clear();
      } else if (this.map.levelComplete()) {
        ++this.level;
        this.generateMap();
      } else {
        if (this.map.runActors()) {
          this.render(null, true);
          if (!this.map.playerIsAlive()) {
            this.level = 1;
            menu2 = gameOverMenu(() => {
              this.map.reset();
              MessageLog.clear();
              menu2 = mainMenu(() => {
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

// src/index.ts
document.body.onload = () => {
  MessageLog.addMessage("Loading...", colorWhite, true);
  Sound.init();
  InputManager.init();
  const tileSet = document.createElement("img");
  tileSet.src = "assets/tilemap-kenney_tiny-dungeon_32_32.png";
  ClingoSolver.init().then(() => {
    const loader = () => {
      if (Sound.isLoaded() && tileSet.complete) {
        MessageLog.clear();
        new Game(tileSet).start();
      } else {
        MessageLog.addMessage("Loading...", colorWhite, true);
        window.requestAnimationFrame(loader);
      }
    };
    window.requestAnimationFrame(loader);
  });
};
