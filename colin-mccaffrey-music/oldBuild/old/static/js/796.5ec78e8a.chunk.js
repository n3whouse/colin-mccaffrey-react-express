"use strict";(self.webpackChunkcolin_mccaffrey_music=self.webpackChunkcolin_mccaffrey_music||[]).push([[796],{796:(e,t,r)=>{r.r(t),r.d(t,{encodeIntoResult:()=>d,stegaEncodeSourceMap:()=>_,stegaEncodeSourceMap$1:()=>w});var n=r(490);const o=/_key\s*==\s*['"](.*)['"]/;function s(e){if(!Array.isArray(e))throw new Error("Path is not an array");return e.reduce(((e,t,r)=>{const n=typeof t;if("number"===n)return`${e}[${t}]`;if("string"===n)return`${e}${0===r?"":"."}${t}`;if(function(e){return"string"==typeof e?o.test(e.trim()):"object"==typeof e&&"_key"in e}(t)&&t._key)return`${e}[_key=="${t._key}"]`;if(Array.isArray(t)){const[r,n]=t;return`${e}[${r}:${n}]`}throw new Error(`Unsupported path segment \`${JSON.stringify(t)}\``)}),"")}const i={"\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","'":"\\'","\\":"\\\\"},a={"\\f":"\f","\\n":"\n","\\r":"\r","\\t":"\t","\\'":"'","\\\\":"\\"};function u(e){const t=[],r=/\['(.*?)'\]|\[(\d+)\]|\[\?\(@\._key=='(.*?)'\)\]/g;let n;for(;null!==(n=r.exec(e));)if(void 0===n[1])if(void 0===n[2])if(void 0===n[3]);else{const e=n[3].replace(/\\(\\')/g,(e=>a[e]));t.push({_key:e,_index:-1})}else t.push(parseInt(n[2],10));else{const e=n[1].replace(/\\(\\|f|n|r|t|')/g,(e=>a[e]));t.push(e)}return t}function c(e){return e.map((e=>{if("string"==typeof e||"number"==typeof e)return e;if(""!==e._key)return{_key:e._key};if(-1!==e._index)return e._index;throw new Error(`invalid segment:${JSON.stringify(e)}`)}))}function l(e,t){if(!t?.mappings)return;const r=function(e){return`$${e.map((e=>"string"==typeof e?`['${e.replace(/[\f\n\r\t'\\]/g,(e=>i[e]))}']`:"number"==typeof e?`[${e}]`:""!==e._key?`[?(@._key=='${e._key.replace(/['\\]/g,(e=>i[e]))}')]`:`[${e._index}]`)).join("")}`}(e.map((e=>{if("string"==typeof e||"number"==typeof e)return e;if(-1!==e._index)return e._index;throw new Error(`invalid segment:${JSON.stringify(e)}`)})));if(void 0!==t.mappings[r])return{mapping:t.mappings[r],matchedPath:r,pathSuffix:""};const n=Object.entries(t.mappings).filter((e=>{let[t]=e;return r.startsWith(t)})).sort(((e,t)=>{let[r]=e,[n]=t;return n.length-r.length}));if(0==n.length)return;const[o,s]=n[0];return{mapping:s,matchedPath:o,pathSuffix:r.substring(o.length)}}function p(e){return"object"==typeof e&&null!==e}function f(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return function(e){return null!==e&&Array.isArray(e)}(e)?e.map(((e,n)=>{if(p(e)){const o=e._key;if("string"==typeof o)return f(e,t,r.concat({_key:o,_index:n}))}return f(e,t,r.concat(n))})):p(e)?Object.fromEntries(Object.entries(e).map((e=>{let[n,o]=e;return[n,f(o,t,r.concat(n))]}))):t(e,r)}function d(e,t,r){return f(e,((e,n)=>{if("string"!=typeof e)return e;const o=l(n,t);if(!o)return e;const{mapping:s,matchedPath:i}=o;if("value"!==s.type||"documentValue"!==s.source.type)return e;const a=t.documents[s.source.document],c=t.paths[s.source.path],p=u(i),f=u(c).concat(n.slice(p.length));return r({sourcePath:f,sourceDocument:a,resultPath:n,value:e})}))}const h="drafts.";function g(e){const{baseUrl:t,workspace:r="default",tool:n="default",id:o,type:i,path:a,projectId:u,dataset:l}=e;if(!t)throw new Error("baseUrl is required");if(!a)throw new Error("path is required");if(!o)throw new Error("id is required");if("/"!==t&&t.endsWith("/"))throw new Error("baseUrl must not end with a slash");const p="default"===r?void 0:r,f="default"===n?void 0:n,d=function(e){return e.startsWith(h)?e.slice(h.length):e}(o),g=Array.isArray(a)?s(c(a)):a,y=new URLSearchParams({baseUrl:t,id:d,type:i,path:g});p&&y.set("workspace",p),f&&y.set("tool",f),u&&y.set("projectId",u),l&&y.set("dataset",l),o.startsWith(h)&&y.set("isDraft","");const m=["/"===t?"":t];p&&m.push(p);const k=["mode=presentation",`id=${d}`,`type=${i}`,`path=${encodeURIComponent(g)}`];return f&&k.push(`tool=${f}`),m.push("intent","edit",`${k.join(";")}?${y}`),m.join("/")}const y=e=>{let{sourcePath:t,resultPath:r,value:n}=e;if(/^\d{4}-\d{2}-\d{2}/.test(o=n)&&Date.parse(o)||function(e){try{new URL(e,e.startsWith("/")?"https://acme.com":void 0)}catch{return!1}return!0}(n))return!1;var o;const s=t.at(-1);return!("slug"===t.at(-2)&&"current"===s||"string"==typeof s&&(s.startsWith("_")||s.endsWith("Id"))||"number"==typeof s&&"marks"===t.at(-2)||"href"===s&&"number"==typeof t.at(-2)&&"markDefs"===t.at(-3)||"style"===s||"listItem"===s||t.some((e=>"meta"===e||"metadata"===e||"openGraph"===e||"seo"===e))||k(t)||k(r)||"string"==typeof s&&m.has(s))},m=new Set(["color","colour","currency","email","format","gid","hex","href","hsl","hsla","icon","id","index","key","language","layout","link","linkAction","locale","lqip","page","path","ref","rgb","rgba","route","secret","slug","status","tag","template","theme","type","textTheme","unit","url","username","variant","website"]);function k(e){return e.some((e=>"string"==typeof e&&null!==e.match(/type/i)))}const $=20;function _(e,t,r){const{filter:s,logger:i,enabled:a}=r;if(!a){const n="config.enabled must be true, don't call this function otherwise";throw i?.error?.(`[@sanity/client]: ${n}`,{result:e,resultSourceMap:t,config:r}),new TypeError(n)}if(!t)return i?.error?.("[@sanity/client]: Missing Content Source Map from response body",{result:e,resultSourceMap:t,config:r}),e;if(!r.studioUrl){const n="config.studioUrl must be defined";throw i?.error?.(`[@sanity/client]: ${n}`,{result:e,resultSourceMap:t,config:r}),new TypeError(n)}const u={encoded:[],skipped:[]},c=d(e,t,(e=>{let{sourcePath:t,sourceDocument:o,resultPath:a,value:c}=e;if(!1===("function"==typeof s?s({sourcePath:t,resultPath:a,filterDefault:y,sourceDocument:o,value:c}):y({sourcePath:t,resultPath:a,filterDefault:y,sourceDocument:o,value:c})))return i&&u.skipped.push({path:b(t),value:`${c.slice(0,$)}${c.length>$?"...":""}`,length:c.length}),c;i&&u.encoded.push({path:b(t),value:`${c.slice(0,$)}${c.length>$?"...":""}`,length:c.length});const{baseUrl:l,workspace:p,tool:f}=function(e){let t="string"==typeof e?e:e.baseUrl;return"/"!==t&&(t=t.replace(/\/$/,"")),"string"==typeof e?{baseUrl:t}:{...e,baseUrl:t}}("function"==typeof r.studioUrl?r.studioUrl(o):r.studioUrl);if(!l)return c;const{_id:d,_type:h,_projectId:m,_dataset:k}=o;return(0,n.C)(c,{origin:"sanity.io",href:g({baseUrl:l,workspace:p,tool:f,id:d,type:h,path:t,...!r.omitCrossDatasetReferenceData&&{dataset:k,projectId:m}})},!1)}));if(i){const e=u.skipped.length,t=u.encoded.length;if((e||t)&&((i?.groupCollapsed||i.log)?.("[@sanity/client]: Encoding source map into result"),i.log?.(`[@sanity/client]: Paths encoded: ${u.encoded.length}, skipped: ${u.skipped.length}`)),u.encoded.length>0&&(i?.log?.("[@sanity/client]: Table of encoded paths"),(i?.table||i.log)?.(u.encoded)),u.skipped.length>0){const e=new Set;for(const{path:t}of u.skipped)e.add(t.replace(o,"0").replace(/\[\d+\]/g,"[]"));i?.log?.("[@sanity/client]: List of skipped paths",[...e.values()])}(e||t)&&i?.groupEnd?.()}return c}function b(e){return s(c(e))}var w=Object.freeze({__proto__:null,stegaEncodeSourceMap:_})}}]);
//# sourceMappingURL=796.5ec78e8a.chunk.js.map