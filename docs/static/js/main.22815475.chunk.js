(this["webpackJsonpjigsaw-writer"]=this["webpackJsonpjigsaw-writer"]||[]).push([[0],{177:function(e,t,o){},178:function(e,t,o){},179:function(e,t,o){},351:function(e,t,o){"use strict";o.r(t);var n=o(0),a=o.n(n),r=o(24),i=o.n(r),H=(o(177),o(51)),l=o(72),c=o(73),s=o(171),_=o(167),T=o(168),R=(o(178),o(179),o(76)),u=o.n(R),A=o(98),v=o(55),G=o(36),d=/([aeiou]|R[aeiou]?|\?[aeiou]?|[^aeiou][aeiou]?)(!?)/g,P=function(){function e(){Object(l.a)(this,e)}return Object(c.a)(e,null,[{key:"mapStatesToProps",value:function(e){return{workflows:e.workflows}}}]),e}();P.syllableSplitter=function(e){return e.replace(/[^a-z?! ]gi/,"").replace(/[^r]/gi,(function(e){return e.toLocaleLowerCase("en-gb")})).split(" ").map((function(e){return e.split(d).filter((function(e){return e.length})).reduce((function(e,t,o,n){var a=new Set(["a","e","i","o","u"]);return"!"===t||("!"===n[o+1]?e.push(a.has(t)?"?"+t+"!":t+"!"):e.push(a.has(t)?"?"+t:t)),e}),[])}))};var h=function(){function e(){Object(l.a)(this,e)}return Object(c.a)(e,null,[{key:"debugDraw",value:function(t,o,n){e.horizontalBaseSpan(t,5,0,o),e.b(t,0,5,0,o),e.g(t,1,5,0,o),e.m(t,2,5,0,o),e.f(t,3,5,0,o),e.s(t,4,5,0,o),e.horizontalBaseSpan(t,5,1,o),e.p(t,0,5,1,o),e.k(t,1,5,1,o),e.j(t,2,5,1,o),e.r(t,3,5,1,o),e.z(t,4,5,1,o),e.horizontalBaseSpan(t,5,2,o),e.d(t,0,5,2,o),e.h(t,1,5,2,o),e.n(t,2,5,2,o),e.l(t,3,5,2,o),e.w(t,4,5,2,o),e.horizontalBaseSpan(t,5,3,o),e.t(t,0,5,3,o),e.glottal(t,1,5,3,o),e.c(t,2,5,3,o),e.R(t,3,5,3,o),e.y(t,4,5,3,o),e.horizontalBaseSpan(t,5,4,o)}},{key:"verticalBase",value:function(t,o,n,a,r){var i=r/2+(n-2*o)*e.GRAPH_HALF_WIDTH,H=2*a*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP;t.beginPath(),t.moveTo(i,H),t.lineTo(i,H+2*e.GRAPH_HALF_HEIGHT),t.lineWidth=e.GRAPH_STROKE_WIDTH,t.stroke()}},{key:"horizontalBase",value:function(t,o,n,a,r){var i=r/2+(n-2*o)*e.GRAPH_HALF_WIDTH,H=2*a*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP;t.beginPath(),t.moveTo(i,H),t.lineTo(i+2*e.GRAPH_HALF_WIDTH,H),t.lineWidth=e.GRAPH_STROKE_WIDTH,t.stroke()}},{key:"horizontalBaseSpan",value:function(t,o,n,a){var r=a/2-o*e.GRAPH_HALF_WIDTH,i=2*n*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP;t.beginPath(),t.moveTo(r,i),t.lineTo(r+2*o*e.GRAPH_HALF_WIDTH+1,i),t.lineWidth=e.GRAPH_STROKE_WIDTH,t.stroke()}},{key:"b",value:function(t,o,n,a,r){e.roundedMiddle(t,o,n,a,r,!0)}},{key:"d",value:function(t,o,n,a,r){e.roundedMiddle(t,o,n,a,r,!1)}},{key:"roundedMiddle",value:function(t,o,n,a,r){var i=!(arguments.length>5&&void 0!==arguments[5])||arguments[5];e.verticalBase(t,o,n,a,r);var H=r/2+(n-2*o)*e.GRAPH_HALF_WIDTH,l=2*a*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP,c=e.GRAPH_CURVE_HEIGHT,s=H-e.GRAPH_STROKE_WIDTH,_=l+e.GRAPH_HALF_HEIGHT-c/2;t.clearRect(s,_,2*e.GRAPH_STROKE_WIDTH,c);var T=2,R=s+T;t.beginPath(),t.moveTo(i?R:R+1,_),t.bezierCurveTo((i?21:-21)+R,-18+_,(i?17:-17)+R,29+_,R,e.GRAPH_CURVE_HEIGHT+_+1),t.stroke()}},{key:"g",value:function(t,o,n,a,r){e.roundedBottom(t,o,n,a,r,!0)}},{key:"h",value:function(t,o,n,a,r){e.roundedBottom(t,o,n,a,r,!1)}},{key:"roundedBottom",value:function(t,o,n,a,r){var i=!(arguments.length>5&&void 0!==arguments[5])||arguments[5];e.verticalBase(t,o,n,a,r);var H=r/2+(n-2*o)*e.GRAPH_HALF_WIDTH,l=2*a*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP,c=H-e.GRAPH_STROKE_WIDTH,s=l+2*e.GRAPH_HALF_HEIGHT-e.GRAPH_CURVE_HEIGHT-2;t.clearRect(c,s,2*e.GRAPH_STROKE_WIDTH,e.GRAPH_CURVE_HEIGHT);var _=2,T=c+_;t.beginPath(),t.moveTo(i?T:T+1,s),t.bezierCurveTo((i?21:-21)+T,-18+s,(i?17:-17)+T,21+s,T,e.GRAPH_CURVE_HEIGHT+s+1),t.stroke()}},{key:"m",value:function(t,o,n,a,r){e.roundedTop(t,o,n,a,r,!0)}},{key:"n",value:function(t,o,n,a,r){e.roundedTop(t,o,n,a,r,!1)}},{key:"roundedTop",value:function(t,o,n,a,r){var i=!(arguments.length>5&&void 0!==arguments[5])||arguments[5];e.verticalBase(t,o,n,a,r);var H=r/2+(n-2*o)*e.GRAPH_HALF_WIDTH,l=2*a*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP,c=H-e.GRAPH_STROKE_WIDTH,s=l+2;t.clearRect(c,s,2*e.GRAPH_STROKE_WIDTH,e.GRAPH_CURVE_HEIGHT);var _=2,T=c+_;t.beginPath(),t.moveTo(i?T:T+1,s-2),t.bezierCurveTo((i?21:-21)+T,-2+s,(i?17:-17)+T,29+s,T,e.GRAPH_CURVE_HEIGHT+s+1),t.stroke()}},{key:"f",value:function(t,o,n,a,r){e.roundedDouble(t,o,n,a,r,!0)}},{key:"l",value:function(t,o,n,a,r){e.roundedDouble(t,o,n,a,r,!1)}},{key:"roundedDouble",value:function(t,o,n,a,r){var i=!(arguments.length>5&&void 0!==arguments[5])||arguments[5];e.verticalBase(t,o,n,a,r);var H=r/2+(n-2*o)*e.GRAPH_HALF_WIDTH,l=2*a*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP,c=e.GRAPH_CURVE_HEIGHT,s=H-e.GRAPH_STROKE_WIDTH,_=l+e.GRAPH_HALF_HEIGHT/2-c/2+2;t.clearRect(s,_,2*e.GRAPH_STROKE_WIDTH,c);var T=2,R=s+T;t.beginPath(),t.moveTo(i?R:R+1,_),t.bezierCurveTo((i?21:-21)+R,-18+_,(i?17:-17)+R,29+_,R,e.GRAPH_CURVE_HEIGHT+_+1),t.stroke();var u=l+3*e.GRAPH_HALF_HEIGHT/2-c/2-2;t.clearRect(s,u,2*e.GRAPH_STROKE_WIDTH,c);var A=2,v=s+A;t.beginPath(),t.moveTo(i?v:v+1,u),t.bezierCurveTo((i?21:-21)+v,-18+u,(i?17:-17)+v,29+u,v,e.GRAPH_CURVE_HEIGHT+u+1),t.stroke()}},{key:"s",value:function(t,o,n,a,r){e.verticalBase(t,o,n,a,r);var i=r/2+(n-2*o)*e.GRAPH_HALF_WIDTH,H=2*a*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP,l=e.GRAPH_CURVE_HEIGHT,c=i-e.GRAPH_STROKE_WIDTH,s=H+e.GRAPH_HALF_HEIGHT/2;t.clearRect(c,s,2*e.GRAPH_STROKE_WIDTH,2.5*l);var _=i-e.GRAPH_STROKE_WIDTH,T=H+e.GRAPH_HALF_HEIGHT/2,R=_+2;t.beginPath(),t.moveTo(R,T+1),t.bezierCurveTo(21+R,-18+T,17+R,29+T,R,e.GRAPH_CURVE_HEIGHT+T+1);var u=i-e.GRAPH_STROKE_WIDTH+2,A=H+3*e.GRAPH_HALF_HEIGHT/2-1.6*l,v=u+2;t.bezierCurveTo(-21+v,-18+A,-17+v,29+A,v,e.GRAPH_CURVE_HEIGHT+A+1),t.stroke()}},{key:"w",value:function(t,o,n,a,r){e.roundedInverted(t,o,n,a,r,!0)}},{key:"y",value:function(t,o,n,a,r){e.roundedInverted(t,o,n,a,r,!1)}},{key:"roundedInverted",value:function(t,o,n,a,r){var i=!(arguments.length>5&&void 0!==arguments[5])||arguments[5];e.verticalBase(t,o,n,a,r);var H=r/2+(n-2*o)*e.GRAPH_HALF_WIDTH,l=2*a*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP,c=2.5*e.GRAPH_CURVE_HEIGHT,s=H-e.GRAPH_STROKE_WIDTH,_=l+e.GRAPH_HALF_HEIGHT-c/2;if(t.clearRect(s,_,2*e.GRAPH_STROKE_WIDTH,c),t.beginPath(),i?(t.moveTo(s+2,_),t.lineTo(s+2+.5*c,_)):(t.moveTo(s+3,_),t.lineTo(s+3-.5*c,_)),i?(t.moveTo(s+2,_+c),t.lineTo(s+2+.5*c,_+c)):(t.moveTo(s+3,_+c),t.lineTo(s+3-.5*c,_+c)),i){var T=s+2+.5*c,R=_;t.moveTo(T,R),t.bezierCurveTo(T-.5*c,R,T-.5*c,R+c,s+2+.5*c,_+c)}else{var u=s+3-.5*c,A=_;t.moveTo(u,A),t.bezierCurveTo(u+.5*c,A,u+.5*c,A+c,s+3-.5*c,_+c)}t.stroke()}},{key:"p",value:function(t,o,n,a,r){e.pointyMiddle(t,o,n,a,r,!0)}},{key:"t",value:function(t,o,n,a,r){e.pointyMiddle(t,o,n,a,r,!1)}},{key:"pointyMiddle",value:function(t,o,n,a,r){var i=!(arguments.length>5&&void 0!==arguments[5])||arguments[5];e.verticalBase(t,o,n,a,r);var H=r/2+(n-2*o)*e.GRAPH_HALF_WIDTH,l=2*a*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP,c=1.75*e.GRAPH_CURVE_HEIGHT,s=H-e.GRAPH_STROKE_WIDTH,_=l+e.GRAPH_HALF_HEIGHT-c/2;t.clearRect(s,_,2*e.GRAPH_STROKE_WIDTH,c);var T=i?s+.75*c:s-.75*c;t.beginPath(),t.moveTo(s+3,_),t.lineTo(T,_+c/2+1),t.stroke(),t.beginPath(),t.moveTo(T,_+c/2+1),t.lineTo(s+3,_+c+1),t.stroke()}},{key:"k",value:function(t,o,n,a,r){e.pointyBottom(t,o,n,a,r,!0)}},{key:"glottal",value:function(t,o,n,a,r){e.pointyBottom(t,o,n,a,r,!1)}},{key:"pointyBottom",value:function(t,o,n,a,r){var i=!(arguments.length>5&&void 0!==arguments[5])||arguments[5];e.verticalBase(t,o,n,a,r);var H=r/2+(n-2*o)*e.GRAPH_HALF_WIDTH,l=2*a*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP,c=1.75*e.GRAPH_CURVE_HEIGHT,s=H-e.GRAPH_STROKE_WIDTH,_=l+e.GRAPH_HALF_HEIGHT+.65*c-3;t.clearRect(s,_,2*e.GRAPH_STROKE_WIDTH,c);var T=i?s+.75*c:s-.75*c;t.beginPath(),t.moveTo(s+3,_),t.lineTo(T,_+c/2+1),t.stroke(),t.beginPath(),t.moveTo(T,_+c/2+1),t.lineTo(s+3,_+c+1),t.stroke()}},{key:"j",value:function(t,o,n,a,r){e.pointyTop(t,o,n,a,r,!0)}},{key:"c",value:function(t,o,n,a,r){e.pointyTop(t,o,n,a,r,!1)}},{key:"pointyTop",value:function(t,o,n,a,r){var i=!(arguments.length>5&&void 0!==arguments[5])||arguments[5];e.verticalBase(t,o,n,a,r);var H=r/2+(n-2*o)*e.GRAPH_HALF_WIDTH,l=2*a*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP,c=1.75*e.GRAPH_CURVE_HEIGHT,s=H-e.GRAPH_STROKE_WIDTH,_=l+e.GRAPH_HALF_HEIGHT-1.65*c+3;t.clearRect(s,_,2*e.GRAPH_STROKE_WIDTH,c);var T=i?s+.75*c:s-.75*c;t.beginPath(),t.moveTo(s+3,_),t.lineTo(T,_+c/2+1),t.stroke(),t.beginPath(),t.moveTo(T,_+c/2+1),t.lineTo(s+3,_+c+1),t.stroke()}},{key:"r",value:function(t,o,n,a,r){e.pointyDouble(t,o,n,a,r,!0)}},{key:"R",value:function(t,o,n,a,r){e.pointyDouble(t,o,n,a,r,!1)}},{key:"pointyDouble",value:function(t,o,n,a,r){var i=!(arguments.length>5&&void 0!==arguments[5])||arguments[5];e.verticalBase(t,o,n,a,r);var H=r/2+(n-2*o)*e.GRAPH_HALF_WIDTH,l=2*a*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP,c=1.75*e.GRAPH_CURVE_HEIGHT,s=H-e.GRAPH_STROKE_WIDTH,_=l+e.GRAPH_HALF_HEIGHT-1.25*c+3;t.clearRect(s,_,2*e.GRAPH_STROKE_WIDTH,c);var T=i?s+.75*c:s-.75*c;t.beginPath(),t.moveTo(s+3,_),t.lineTo(T,_+c/2+1),t.stroke(),t.beginPath(),t.moveTo(T,_+c/2+1),t.lineTo(s+3,_+c+1),t.stroke();var R=l+e.GRAPH_HALF_HEIGHT;t.clearRect(s,R,2*e.GRAPH_STROKE_WIDTH,c);var u=i?s+.75*c:s-.75*c;t.beginPath(),t.moveTo(s+3,R),t.lineTo(u,R+c/2+1),t.stroke(),t.beginPath(),t.moveTo(u,R+c/2+1),t.lineTo(s+3,R+c+1),t.stroke()}},{key:"z",value:function(t,o,n,a,r){e.verticalBase(t,o,n,a,r);var i=r/2+(n-2*o)*e.GRAPH_HALF_WIDTH,H=2*a*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP,l=1.75*e.GRAPH_CURVE_HEIGHT,c=i-e.GRAPH_STROKE_WIDTH,s=H+e.GRAPH_HALF_HEIGHT-l+2;t.clearRect(c,s+2,2*e.GRAPH_STROKE_WIDTH,1.5*l),t.beginPath(),t.moveTo(c+2,s),t.lineTo(c+l,s),t.lineTo(c-l+3,s+1.5*l+3),t.lineTo(c+4,s+1.5*l+3),t.stroke()}},{key:"a",value:function(t,o,n,a,r){e.roundedMiddleUpDown(t,o+1,n,a+1,r,!0)}},{key:"o",value:function(t,o,n,a,r){e.roundedMiddleUpDown(t,o+1,n,a+1,r,!1)}},{key:"roundedMiddleUpDown",value:function(t,o,n,a,r){var i=!(arguments.length>5&&void 0!==arguments[5])||arguments[5];e.horizontalBase(t,o,n,a,r);var H=r/2+(n-2*o)*e.GRAPH_HALF_WIDTH,l=2*a*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP,c=H+e.GRAPH_HALF_WIDTH-e.GRAPH_CURVE_WIDTH/2,s=l;t.clearRect(c,s-e.GRAPH_STROKE_WIDTH/2-1,e.GRAPH_CURVE_WIDTH,e.GRAPH_STROKE_WIDTH+1);var _=c+1,T=i?s+1:s-1,R=_+e.GRAPH_CURVE_WIDTH-3,u=T;t.beginPath(),t.moveTo(_,T),t.bezierCurveTo(_-12,T+(i?-18:18),R+12,u+(i?-21:21),R,u),t.stroke()}},{key:"e!",value:function(t,o,n,a,r){e.pointYMiddleUpDown(t,o+1,n,a+1,r,!0)}},{key:"u",value:function(t,o,n,a,r){e.pointYMiddleUpDown(t,o+1,n,a+1,r,!1)}},{key:"pointYMiddleUpDown",value:function(t,o,n,a,r){var i=!(arguments.length>5&&void 0!==arguments[5])||arguments[5];e.horizontalBase(t,o,n,a,r);var H=r/2+(n-2*o)*e.GRAPH_HALF_WIDTH,l=2*a*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP,c=H+e.GRAPH_HALF_WIDTH-e.GRAPH_CURVE_WIDTH/2,s=l;t.clearRect(c,s-e.GRAPH_STROKE_WIDTH/2-1,e.GRAPH_CURVE_WIDTH,e.GRAPH_STROKE_WIDTH+1);var _=e.GRAPH_CURVE_WIDTH/2,T=c,R=i?s+1:s-1,u=T+_,A=R+(i?-_:_),v=T+e.GRAPH_CURVE_WIDTH,G=R;t.beginPath(),t.moveTo(T,R),t.lineTo(u,A),t.lineTo(v,G),t.stroke()}},{key:"e",value:function(t,o,n,a,r){o++,a++,e.horizontalBase(t,o,n,a,r);var i=e.GRAPH_CURVE_WIDTH,H=r/2+(n-2*o)*e.GRAPH_HALF_WIDTH,l=2*a*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP,c=H+e.GRAPH_HALF_WIDTH-i,s=l;function _(o,n){var a=c+1+n,r=o?s+1:s-1,i=a+e.GRAPH_CURVE_WIDTH-3,H=r;t.moveTo(a,r),t.bezierCurveTo(a-12,r+(o?-18:18),i+12,H+(o?-21:21),i,H)}t.clearRect(c,s-e.GRAPH_STROKE_WIDTH/2-1,2*i-2,e.GRAPH_STROKE_WIDTH+1),t.beginPath(),_(!1,0),_(!0,e.GRAPH_CURVE_WIDTH-2),t.stroke()}},{key:"i",value:function(t,o,n,a,r){o++,a++,e.horizontalBase(t,o,n,a,r);var i=e.GRAPH_CURVE_WIDTH,H=e.GRAPH_CURVE_WIDTH/2,l=r/2+(n-2*o)*e.GRAPH_HALF_WIDTH,c=2*a*e.GRAPH_HALF_HEIGHT+e.MARGIN_TOP,s=l+e.GRAPH_HALF_WIDTH-i,_=c;t.clearRect(s,_-e.GRAPH_STROKE_WIDTH/2-1,2*i-2,e.GRAPH_STROKE_WIDTH+1);var T=s,R=_,u=T+H,A=R+H,v=u+i,G=A-i,d=v+H,P=R;t.beginPath(),t.moveTo(T,R),t.lineTo(u,A),t.lineTo(v,G),t.lineTo(d,P),t.stroke()}}]),e}();h.GRAPH_HALF_WIDTH=48,h.GRAPH_HALF_HEIGHT=35,h.GRAPH_STROKE_WIDTH=3,h.GRAPH_CURVE_HEIGHT=12,h.GRAPH_CURVE_WIDTH=24,h.MARGIN_TOP=12,h.DRAWER={b:h.b,g:h.g,m:h.m,f:h.f,s:h.s,p:h.p,k:h.k,j:h.j,r:h.r,z:h.z,d:h.d,h:h.h,n:h.n,l:h.l,w:h.w,t:h.t,"?":h.glottal,c:h.c,R:h.R,y:h.y,a:h.a,o:h.o,"e!":h["e!"],u:h.u,e:h.e,i:h.i};var I,b=o(157),E=o(358),O=o(359),j=o(354),f=o(355),p=o(356),g=o(357),W=o(57),D=o.n(W);!function(e){e[e.SetTextValue=0]="SetTextValue"}(I||(I={}));var y=o(101),k=o.n(y),m=o(6);function w(e){var t=E.a.useForm(),o=Object(T.a)(t,1)[0];return Object(n.useEffect)((function(){o.setFieldsValue({text:e.workflows.text})}),[o,e.workflows.text]),Object(m.jsx)(E.a,{layout:"vertical",form:o,onValuesChange:function(t,o){return e.dispatch((n=o.text,{type:I.SetTextValue,payload:n}));var n},children:Object(m.jsx)(E.a.Item,{label:"Your text:",name:"text",children:Object(m.jsx)(O.a,{placeholder:"input placeholder"})})})}function x(e){var t=Object(n.useRef)(null),o=e.width;return Object(n.useEffect)((function(){if(t&&t.current){var o=t.current.getContext("2d");if(o){o.clearRect(0,0,600,600),o.strokeStyle="#111120";for(var n=P.syllableSplitter(e.workflows.text),a=n.length,r=0;r<a;r++){var i=n[r];i.length&&h.horizontalBase(o,r+1,a,0,600);for(var H=0;H<i.length;H++){var l=i[H],c=l.slice(0,1),s=h.DRAWER[c];s?s(o,r,a,H,600):(o.strokeStyle="maroon",h.verticalBase(o,r,a,H,600),o.strokeStyle="#111120");var _=l.slice(1),T=h.DRAWER[_];T?T(o,r,a,H,600):h.horizontalBase(o,r+1,a,H+1,600)}var R=n[r-1]&&n[r-1].length,u=n[r].length;if(n[r-1]&&R-u>0)for(var A=R-u,v=u;v<u+A;v++)h.verticalBase(o,r,a,v,600)}for(var G=n[n.length-1],d=0;d<G.length;d++)h.verticalBase(o,a,a,d,600)}}}),[e.workflows.text]),Object(m.jsx)("canvas",{style:{width:"100%",height:"auto"},ref:t,width:o,height:o})}v.b.add(G.d,G.e,G.b,G.h,G.k,G.a,G.f,G.g,G.i,G.c,G.l,G.j);var F=function(e){Object(s.a)(o,e);var t=Object(_.a)(o);function o(){var e;Object(l.a)(this,o);for(var n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).canvasRef=void 0,e}return Object(c.a)(o,[{key:"render",value:function(){var e=P.syllableSplitter(this.props.workflows.text);return Object(m.jsx)("div",{className:"App",children:Object(m.jsxs)(u.a,{style:{height:"100%"},children:[Object(m.jsx)(R.Header,{style:{position:"fixed",zIndex:1,width:"100%"},children:Object(m.jsxs)("div",{className:"big centered",children:[Object(m.jsx)(b.a,{icon:"puzzle-piece",width:20}),Object(m.jsxs)("span",{className:"brand",children:[Object(m.jsx)("span",{className:"red",children:"J"}),Object(m.jsx)("span",{className:"orange",children:"i"}),Object(m.jsx)("span",{className:"yellow",children:"g"}),Object(m.jsx)("span",{className:"green",children:"s"}),Object(m.jsx)("span",{className:"blue",children:"a"}),Object(m.jsx)("span",{className:"purple",children:"w"})]}),"Writer | ",Object(m.jsx)("span",{className:"thin",children:"Write in Jigsaw Script"})]})}),Object(m.jsx)(R.Content,{className:"content",style:{marginTop:100},children:Object(m.jsxs)(j.a,{gutter:24,children:[Object(m.jsxs)(f.a,{span:24,sm:12,children:[Object(m.jsx)(D.a,{level:4,children:"Fill in your words!"}),Object(m.jsx)(p.a,{}),Object(m.jsx)(w,Object(H.a)({},this.props)),Object(m.jsx)(p.a,{}),Object(m.jsx)(D.a,{level:4,children:"Your syllables:"}),Object(m.jsx)(g.b,{bordered:!0,dataSource:e,renderItem:function(e){return Object(m.jsx)(g.b.Item,{className:"beans",children:e.map((function(e,t){return Object(m.jsx)("span",{className:e.endsWith("!")&&!e.endsWith("e!")?"error":"",children:e},t)}))})}})]}),Object(m.jsxs)(f.a,{span:24,sm:12,children:[Object(m.jsx)(D.a,{level:4,children:"Jigsaw Output"}),Object(m.jsx)(x,Object(H.a)(Object(H.a)({},this.props),{},{width:Math.max(600,e.length*h.GRAPH_HALF_WIDTH*2.1)}))]})]})}),Object(m.jsxs)(R.Content,{className:"content",children:[Object(m.jsx)(D.a,{level:4,children:"What is Jigsaw Script?"}),Object(m.jsxs)(k.a,{children:["Jigsaw Script is a ",Object(m.jsx)("a",{href:"https://neographilia.wordpress.com/writing-systems/#logosyllabary",children:"logosyllabary"})," script to write words in Jigsaw. Here are the basic rules:"]}),Object(m.jsx)(k.a,{children:Object(m.jsxs)("ol",{children:[Object(m.jsx)("li",{children:"Words are grouped into columns."}),Object(m.jsx)("li",{children:"Writing order is from top to bottom, right to left."}),Object(m.jsx)("li",{children:"Consonants are placed at the right side of the Jigsaw"}),Object(m.jsx)("li",{children:"Vowels are placed at the bottom side of the Jigsaw"})]})}),Object(m.jsx)(p.a,{}),Object(m.jsx)(D.a,{level:4,children:"What is Jigsaw Script for?"}),Object(m.jsx)(k.a,{children:"Jigsaw script is just mainly a hobby of mine, but from a linguistic perspective, Jigsaw is very suitable for monosyllabic language with little-to-no amount of dipthongs, e.g. ae, ou, etc."}),Object(m.jsx)(p.a,{}),Object(m.jsx)(D.a,{level:4,children:"What are the letters?"})]})]})})}}]),o}(a.a.Component),S=Object(A.b)(P.mapStatesToProps)(F),L=o(169),C={text:""},V=Object(L.a)({reducer:{workflows:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0;switch(null===t||void 0===t?void 0:t.type){case I.SetTextValue:return Object(H.a)(Object(H.a)({},e),{},{text:t.payload});default:return Object(H.a)({},e)}}}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(m.jsx)(a.a.StrictMode,{children:Object(m.jsx)(A.a,{store:V,children:Object(m.jsx)(S,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[351,1,2]]]);
//# sourceMappingURL=main.22815475.chunk.js.map