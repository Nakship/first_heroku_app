(this.webpackJsonptest=this.webpackJsonptest||[]).push([[0],{42:function(t,n,e){},43:function(t,n,e){"use strict";e.r(n);var c=e(2),r=e(18),o=e.n(r),i=e(8),u=e(4),a=e(0),s=function(t){var n=t.note,e=t.toggleImportance;n.importance;return Object(a.jsxs)("li",{children:[n.content,Object(a.jsx)("button",{onClick:e,children:n.content})]})},j=e(3),l=e.n(j),f="/api/notes",b=function(){return l.a.get(f).then((function(t){return t.data}))},d=function(t){return l.a.post(f,t).then((function(t){return t.data}))},O=function(t,n){return l.a.put("".concat(f,"/").concat(t),n).then((function(t){return t.data}))},h=function(t){var n=t.message;return null==n?null:Object(a.jsx)("div",{className:"error",children:n})},m=function(){return Object(a.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(a.jsx)("br",{}),Object(a.jsx)("em",{children:"Note app, Department of Computer Science, University of Helsinki 2022"})]})},p=function(t){var n=Object(c.useState)([]),e=Object(u.a)(n,2),r=e[0],o=e[1],j=Object(c.useState)(""),l=Object(u.a)(j,2),f=l[0],p=l[1],v=Object(c.useState)(!0),x=Object(u.a)(v,2),g=x[0],S=x[1],y=Object(c.useState)(null),k=Object(u.a)(y,2),w=k[0],N=k[1];Object(c.useEffect)((function(){b().then((function(t){o(t)}))}),[]);var C=g?r:r.filter((function(t){return t.important}));return Object(a.jsxs)("div",{children:[Object(a.jsx)("h1",{children:"Notes"}),Object(a.jsx)(h,{message:w}),Object(a.jsx)("div",{children:Object(a.jsxs)("button",{onClick:function(){return S(!g)},children:[" Show ",g?"important":"all"]})}),Object(a.jsx)("ul",{className:"notes",children:C.map((function(t){return Object(a.jsx)(s,{toggleImportance:function(){return function(t){var n=r.find((function(n){return n.id===t})),e=Object(i.a)(Object(i.a)({},n),{},{important:!n.important});O(t,e).then((function(n){o(r.map((function(e){return e.id!==t?e:n})))})).catch((function(e){N("Note '".concat(n.content,"' was already removed from server")),setTimeout((function(){N(null)}),5e3),o(r.filter((function(n){return n.id!==t})))}))}(t.id)},note:t},t.id)}))}),Object(a.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={content:f,date:(new Date).toISOString(),important:Math.random()<.5};d(n).then((function(t){o(r.concat(t)),p("")}))},children:[Object(a.jsx)("input",{value:f,onChange:function(t){p(t.target.value)}}),Object(a.jsx)("button",{type:"submit",children:"Save"})]}),Object(a.jsx)(m,{})]})};e(42);o.a.render(Object(a.jsx)(p,{}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.02278899.chunk.js.map