(self.webpackChunkincremental_incremental=self.webpackChunkincremental_incremental||[]).push([[179],{573:(e,n,l)=>{"use strict";var i=l(963),r=l(252),t=l(262),c=l(577);const a=[],o={};let s=null;function u(e){let n=0;s&&(n=e-s),s=e;for(const e of a){const l=o[e];l.remaining-=n,l.passed+=n,l.remaining<=0&&(e(l.passed),l.passed=0,l.remaining<-l.interval&&(l.remaining=l.interval),l.remaining+=l.interval)}a.length?requestAnimationFrame(u):s=null}function m(e,n){(0,r.bv)((()=>{const l=!a.length;a.push(n),o[n]={interval:e,remaining:e,passed:0},l&&requestAnimationFrame(u)})),(0,r.Ah)((()=>{const e=a.indexOf(n);-1!==e&&(a.splice(e,1),delete o[n])}))}const d={__name:"DotDotDot",setup(e){const n=["",".","..","..."];let l=(0,t.iH)(1),i=(0,r.Fl)((()=>n[l.value]));return m(1e3,(function(){l.value+=1,l.value>3&&(l.value=1)})),(e,n)=>((0,r.wg)(),(0,r.iD)("span",null,(0,c.zw)((0,t.SU)(i)),1))}},k=6e4,f=36e5,p=["","K","M","B","T"];function g(e){let n=e,l=0;for(;n>1e3&&l<p.length;)n/=1e3,l+=1;if(l>=p.length){const l=Math.log10(e);return n=Math.floor(e/Math.pow(10,l-2))/100,`${n}e${l}`}if(l>0){const e=n>0?3-Math.floor(Math.log10(n)):0,l=Math.pow(10,e);if(n=Math.floor(n*l)/l,n=n.toString(),-1===n.indexOf(".")){n+=".";for(let l=0;l<e;l++)n+="0"}}return`${n} ${p[l]}`}function v(e,n){return Math.floor(h(e,n))}function h(e,n){void 0===e&&(n=e,e=0);const l=n-e;return Math.random()*l+e}function w(e){return e[v(0,e.length)]}const S=[],b={};let C=1;function x(){S.sort(((e,n)=>e===n?0:e.remaining===n.remaining?S.indexOf(n)-S.indexOf(e):n.remaining-e.remaining))}function _(e){for(e*=10;e>0&&S.length;){let n=e;n||alert("time has broken"),e-=n;for(const e of S)if(e.remaining-=n,e.remaining<=0){let n=0;for(;e.interval&&e.remaining<=0;)n+=1,e.remaining+=e.interval;e(n),e.interval||S.splice(S.indexOf(e),1)}else e.progress&&e.progress(e.remaining)}}function M(e,n,l){e.remaining=n,e.id=C++,e.progress=l,S.push(e),b[e.id]=e,x()}const U=(0,t.iH)(null),y=[];function D(){const e=JSON.stringify({...U.value,clock:(new Date).getTime()});window.localStorage.incremental_incremental=e}function P(){return U}const F=["Banana","Apple","Orange","Cookie","Lint","Cat","Dog","Cow","Sheep","Elephant","Giraffe","Hamster","Space","Star","Galaxy","Dirt","Molecule","Atom","Computer","Bitcoin","NFT","Incremental","Number","Calculator"],z=["Clicker","Petter","Eater","Finder","Incremental","Combiner","Multiplier","Idle","Singularity","Builder","Skilling","Hero"],L=["Supreme","DX","64","Advance","For Nintendo 3DS","Infinite","Ultra","Perfect","Mania","Mod"];const G=[{minClicks:1e4,maxClicks:1e5,minCostScale:1.01,maxCostScale:1.2,browseTime:6e4,ipScale:1},{minClicks:1e8,maxClicks:1e9,minCostScale:1.1,maxCostScale:1.3,browseTime:3e5,ipScale:1e3},{minClicks:1e12,maxClicks:1e13,minCostScale:1.15,maxCostScale:1.35,browseTime:36e5,ipScale:1e6}],H={clicksPerClick:{baseCost:10,extraScale:1.5,getLevel:e=>e.clicksPerClick-1,onUpgrade(e){e.clicksPerClick+=1},getValue:e=>e.clicksPerClick*e.clicksMultiplier},clicksPerSecond:{baseCost:100,extraScale:.9,getLevel:e=>e.clicksPerSecond,onUpgrade(e){e.clicksPerSecond+=1},getValue:e=>e.clicksPerSecond*e.clicksMultiplier},clickGain:{baseCost:1e3,extraScale:2.1,getLevel:e=>Math.log2(2*e.clicksMultiplier),onUpgrade(e){e.clicksMultiplier*=2},getValue:e=>e.clicksMultiplier}};let q=!1;function B(e){const n=P(),l=e<=2?G[e]:G[2];n.value.browse.isBrowsing||(n.value.browse={isBrowsing:!0,level:e,timeLeft:l.browseTime},M($,l.browseTime,V))}function T(){if(q)return;setTimeout((()=>{q=!1}),100),q=!0;const e=P();if(!e.value.incremental)return;const n=e.value.incremental.clicksPerClick*e.value.incremental.clicksMultiplier;e.value.incremental.clicks+=n,e.value.incremental.clicks>=e.value.incremental.maxClicks&&(e.value.incremental=null)}function O(e){const n=P();if(!n.value.incremental)return;const l=H[e];if(!l)return;const i=A(e);i<=n.value.incremental.clicks&&(n.value.incremental.clicks-=i,l.onUpgrade(n.value.incremental))}function A(e){const n=P();if(!n.value.incremental)return 0;const l=H[e];return l?Math.floor(l.baseCost*Math.pow(n.value.incremental.costScale*l.extraScale,l.getLevel(n.value.incremental))):0}function I(e){const n=P();if(!n.value.incremental)return 0;const l=H[e];return l?+l.getValue(n.value.incremental):0}function N(e){return e.clicks<e.maxClicks?0:Math.floor(Math.log1p(e.clicks/e.maxClicks*3*G[e.level].ipScale))}function $(){const e=P();e.value.browse.isBrowsing=!1,e.value.incremental=function(e){const n=e<=2?G[e]:G[2];return{name:function(){const e=w(F),n=w(z);let l="";return Math.random()<.2&&(l=" "+w(L),Math.random()<.2&&w(L)),`${e} ${n}${l}`}(),clicks:0,maxClicks:v(n.minClicks,n.maxClicks),clicksPerClick:1,clicksPerSecond:0,clicksMultiplier:1,costScale:h(n.minCostScale,n.maxCostScale),level:e}}(e.value.browse.level)}function V(e){P().value.browse.timeLeft=e}function Y(e=1){const n=P();if(n.value.incremental){const l=e*n.value.incremental.clicksPerSecond/10*n.value.incremental.clicksMultiplier;n.value.incremental.clicks+=l}}var Z;Z=e=>{var n;e.browse.isBrowsing&&M($,e.browse.timeLeft,V),(n=Y).remaining=100,n.interval=100,n.id=C++,S.push(n),b[n.id]=n,x()},y.push(Z);const j={key:0},W={key:1},K=(0,r.Uk)(" remaining..."),E={__name:"GameFinder",setup(e){const n=["the web","Steam","Reddit"],l=(0,t.iH)(!0),i=(0,t.iH)(!0),a=P(),o=(0,r.Fl)((()=>function(e,n){let l="";if(e>f){const n=Math.floor(e/f);e-=n*f,l+=n+" hour",n>1&&(l+="s")}if(e>k){const n=Math.floor(e/k);e-=n*k,l&&(l+=" "),l+=n+" minute",1!=n&&(l+="s")}return l&&(l+=" "),l+=function(e,n){return(e/1e3).toLocaleString(void 0,{minimumFractionDigits:1,maximumFractionDigits:1})}(e)+" seconds",l}(a.value.browse.timeLeft)));return(e,s)=>(0,t.SU)(a)?((0,r.wg)(),(0,r.iD)(r.HY,{key:0},[(0,t.SU)(a).browse.isBrowsing?((0,r.wg)(),(0,r.iD)("p",W,[(0,r._)("p",null,[(0,r.Uk)("Searching "+(0,c.zw)(n[(0,t.SU)(a).browse.level])+" for incremental games",1),(0,r.Wm)(d)]),(0,r._)("p",null,[(0,r._)("span",null,(0,c.zw)((0,t.SU)(o)),1),K])])):((0,r.wg)(),(0,r.iD)("p",j,[(0,r._)("button",{class:"finder",onClick:s[0]||(s[0]=()=>(0,t.SU)(B)(0))},'Search the web for "incremental game"'),l.value?((0,r.wg)(),(0,r.iD)("button",{key:0,class:"finder",onClick:s[1]||(s[1]=()=>(0,t.SU)(B)(1))},'Search Steam for "incremental game"')):(0,r.kq)("v-if",!0),i.value?((0,r.wg)(),(0,r.iD)("button",{key:1,class:"finder",onClick:s[2]||(s[2]=()=>(0,t.SU)(B)(2))},"Browse /r/incremental_games")):(0,r.kq)("v-if",!0)]))],64)):(0,r.kq)("v-if",!0)}};l(941);const J=E,R={key:0,class:"upgrades"},X={class:"col"},Q=(0,r._)("h3",null,"Upgrades",-1),ee=["onClick"],ne={key:0,class:"col"},le=(0,r._)("h3",null,"Prestige",-1),ie=["onClick"],re={__name:"GameUpgrades",setup(e){const n=P(),l=(0,t.qj)([{id:"clicksPerClick",label:"Clicks per click",cost:(0,r.Fl)((()=>A("clicksPerClick"))),value:(0,r.Fl)((()=>g(I("clicksPerClick"))+"/click")),classes:(0,r.Fl)((()=>({affordable:A("clicksPerClick")<=n.value.incremental.clicks})))},{id:"clicksPerSecond",label:"Clicks per sec",cost:(0,r.Fl)((()=>A("clicksPerSecond"))),value:(0,r.Fl)((()=>g(I("clicksPerSecond"))+"/sec")),classes:(0,r.Fl)((()=>({affordable:A("clicksPerSecond")<=n.value.incremental.clicks})))},{id:"clickGain",label:"Clicks multiplier",cost:(0,r.Fl)((()=>A("clickGain"))),value:(0,r.Fl)((()=>"x"+g(I("clickGain")))),classes:(0,r.Fl)((()=>({affordable:A("clickGain")<=n.value.incremental.clicks})))}]),i=(0,t.qj)([]);return(e,a)=>(0,t.SU)(n)?((0,r.wg)(),(0,r.iD)("div",R,[(0,r._)("div",X,[Q,((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(l,(e=>((0,r.wg)(),(0,r.iD)("p",{key:e.id},[(0,r._)("button",{class:(0,c.C_)(["upgrade",e.classes]),onClick:()=>(0,t.SU)(O)(e.id)},(0,c.zw)(e.label)+" (Cost: "+(0,c.zw)((0,t.SU)(g)(e.cost))+") (Cur: "+(0,c.zw)(e.value)+")",11,ee)])))),128))]),i.length?((0,r.wg)(),(0,r.iD)("div",ne,[le,((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(i,(e=>((0,r.wg)(),(0,r.iD)("p",{key:e.id},[(0,r._)("button",{class:(0,c.C_)(["upgrade",e.classes]),onClick:()=>(0,t.SU)(O)(e.id)},(0,c.zw)(e.label)+" (Cost: "+(0,c.zw)(e.cost)+") (Cur: "+(0,c.zw)(e.value)+")",11,ie)])))),128))])):(0,r.kq)("v-if",!0)])):(0,r.kq)("v-if",!0)}};l(893);const te=re,ce={class:"bar-outer"},ae={__name:"ProgressBar",props:{color:{type:String,default:"green"},value:{type:Number,required:!0}},setup(e){const n=e,l=(0,r.Fl)((()=>{return{width:300*(e=n.value/100,0,1,e<0?0:e>1?1:e)+"px",backgroundColor:n.color};var e}));return(e,n)=>((0,r.wg)(),(0,r.iD)("div",ce,[(0,r._)("div",{class:"bar-inner",style:(0,c.j5)((0,t.SU)(l))},null,4)]))}};l(821);const oe=ae,se={key:1},ue={class:"complete"},me={__name:"GamePlayer",setup(e){const n=P();return(e,l)=>(0,t.SU)(n)&&(0,t.SU)(n).incremental?((0,r.wg)(),(0,r.iD)(r.HY,{key:0},[(0,r._)("h2",null,(0,c.zw)((0,t.SU)(n).incremental.name),1),(0,r._)("p",null,"Clicks: "+(0,c.zw)((0,t.SU)(g)(Math.floor((0,t.SU)(n).incremental.clicks)))+" / "+(0,c.zw)((0,t.SU)(g)((0,t.SU)(n).incremental.maxClicks)),1),(0,t.SU)(n).incremental.clicks<(0,t.SU)(n).incremental.maxClicks?((0,r.wg)(),(0,r.j4)(oe,{key:0,value:(0,t.SU)(n).incremental.clicks/(0,t.SU)(n).incremental.maxClicks*100},null,8,["value"])):((0,r.wg)(),(0,r.iD)("p",se,[(0,r._)("button",ue,"Complete Game for "+(0,c.zw)((0,t.SU)(N)((0,t.SU)(n).incremental))+" IP",1)])),(0,r._)("p",null,[(0,r._)("button",{class:"clicker",onClick:l[0]||(l[0]=()=>(0,t.SU)(T)())},"Click")]),(0,r.Wm)((0,t.SU)(te))],64)):(0,r.kq)("v-if",!0)}};l(842);const de=me,ke=(0,r._)("h1",null,"Incremental Incremental",-1),fe=(0,r._)("footer",null,[(0,r._)("p",null," Disclaimer: This game is in development. It might not work properly, time scales might be messed up, it is definitely not balanced or fun, etc. In time, these things will change (maybe except the fun part :), so bear with me! "),(0,r._)("p",null,"Any resemblance to other incremental games is unintentional, except where funny."),(0,r._)("p",null,[(0,r.Uk)("© 2022 by Mike Caron. "),(0,r._)("a",{href:"https://github.com/pkmnfrk/incremental_incremental"},"GitHub")])],-1),pe={__name:"App",setup:e=>((0,t.iH)(0),P(),m(5e3,(()=>{D()})),m(0,(e=>{_(e)})),(0,r.bv)((()=>{!function(){const e=window.localStorage.incremental_incremental;let n;try{n=JSON.parse(e)}catch(e){n={}}let l=null;n.clock&&(l=n.clock,delete n.clock),n=function(e={}){return(e={incremental:null,completed:0,...e}).browse={isBrowsing:!1,timeLeft:0,level:0,label:null,...e.browse},e.incremental&&(e.incremental={clicks:0,maxClicks:1,clicksPerClick:1,clicksPerSecond:0,clicksMultiplier:1,costScale:1.1,level:0,...e.incremental},(isNaN(e.incremental.clicks)||"number"!=typeof e.incremental.clicks)&&(e.incremental.clicks=0)),e}(n),U.value=n;for(const e of y)e(n);if(l){const e=(new Date).getTime()-l;console.log("Advancing time by",e),_(e)}D()}()})),(e,n)=>((0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("div",null,[ke,(0,r.Wm)(J),(0,r.Wm)(de)]),fe],64)))};l(148);const ge=pe;(0,i.ri)(ge).mount("#app")},690:(e,n,l)=>{"use strict";l.r(n),l.d(n,{default:()=>a});var i=l(81),r=l.n(i),t=l(645),c=l.n(t)()(r());c.push([e.id,"\nbody {\r\n        background-color: #111;\r\n        color: white;\r\n        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;\n}\nfooter {\r\n        text-align: center;\r\n        max-width: 1000px;\r\n        margin: 0 auto;\n}\nfooter a {\r\n        color: lightblue;\n}\nfooter a:visited {\r\n        color: aqua;\n}\r\n",""]);const a=c},763:(e,n,l)=>{"use strict";l.r(n),l.d(n,{default:()=>a});var i=l(81),r=l.n(i),t=l(645),c=l.n(t)()(r());c.push([e.id,"\n.finder {\r\n        font-size: 18px;\n}\r\n",""]);const a=c},371:(e,n,l)=>{"use strict";l.r(n),l.d(n,{default:()=>a});var i=l(81),r=l.n(i),t=l(645),c=l.n(t)()(r());c.push([e.id,"\n.clicker {\r\n        width: 300px;\r\n        height: 100px;\r\n        font-size: 32px;\n}\n.complete {\r\n        width: 300px;\r\n        height: 25px;\r\n        font-size: 18px;\r\n        background-color: green;\r\n        color: white;\r\n        border: 1px solid white;\r\n        cursor: pointer;\n}\n.complete:hover {\r\n        /* color: red; */\r\n        background-color: limegreen;\n}\r\n",""]);const a=c},446:(e,n,l)=>{"use strict";l.r(n),l.d(n,{default:()=>a});var i=l(81),r=l.n(i),t=l(645),c=l.n(t)()(r());c.push([e.id,"\n.upgrades {\r\n        display: flex;\r\n        flex-direction: row;\n}\n.upgrades .col {\r\n        display: flex;\r\n        flex-direction: column;\r\n        padding: 5px;\n}\n.upgrade {\r\n        font-size: 18px;\r\n        width: 300px;\r\n        height: 50px;\r\n        background-color: #ccc;\r\n        color: #aaa;\n}\n.upgrade.affordable {\r\n        color: black;\r\n        background-color: white;\r\n        cursor:pointer;\n}\n.upgrade.affordable:hover {\r\n        background-color: #ff0;\n}\r\n",""]);const a=c},123:(e,n,l)=>{"use strict";l.r(n),l.d(n,{default:()=>a});var i=l(81),r=l.n(i),t=l(645),c=l.n(t)()(r());c.push([e.id,"\n.bar-outer {\r\n        border: 1px solid white;\r\n        background-color: white;\r\n        width: 300px;\r\n        height: 25px;\n}\n.bar-inner {\r\n        height: 25px;\n}\r\n",""]);const a=c},148:(e,n,l)=>{var i=l(690);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[e.id,i,""]]),i.locals&&(e.exports=i.locals),(0,l(346).Z)("7e8a62ee",i,!1,{})},941:(e,n,l)=>{var i=l(763);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[e.id,i,""]]),i.locals&&(e.exports=i.locals),(0,l(346).Z)("29a6930b",i,!1,{})},842:(e,n,l)=>{var i=l(371);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[e.id,i,""]]),i.locals&&(e.exports=i.locals),(0,l(346).Z)("9f633188",i,!1,{})},893:(e,n,l)=>{var i=l(446);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[e.id,i,""]]),i.locals&&(e.exports=i.locals),(0,l(346).Z)("60618fe8",i,!1,{})},821:(e,n,l)=>{var i=l(123);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[e.id,i,""]]),i.locals&&(e.exports=i.locals),(0,l(346).Z)("a80cb2b2",i,!1,{})}},e=>{e.O(0,[216],(()=>(573,e(e.s=573)))),e.O()}]);