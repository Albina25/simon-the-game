(function(){"use strict";var q={5545:function(q,t,e){var A=e(7195),i=function(){var q=this,t=q._self._c;return t("div",{staticClass:"app"},[t("h1",{staticClass:"title"},[q._v("Simon The Game")]),t("p",[q._v("Запомни и повтори последовательность")]),t("playing-field")],1)},s=[],n=function(){var q=this,t=q._self._c;return t("div",{staticClass:"playing-field"},[t("audio",{attrs:{src:e(4968),id:"audio-beep"}}),t("audio",{attrs:{src:e(9606),id:"audio-lost"}}),t("p",[q._v("Раунд: "+q._s(q.formatedRound))]),t("div",{staticClass:"field"},q._l(q.cells,(function(e){return t("div",{key:e.id,class:["cell",!0===e.randomSelected?"filed-cell-active":""],attrs:{id:e.id},on:{click:function(t){return q.selectByUser(e.id)}}})})),0),t("div",{staticClass:"action"},[t("p",[q._v(q._s(q.textStage))]),t("button",{class:["btn","btn-start","waitingStart"===this.gameStatus||"lost"===this.gameStatus?"":"btn-start_disabled"],attrs:{disabled:"repeat"===this.gameStatus||"member"===this.gameStatus},on:{click:q.start}},[q._v(" Старт ")])]),t("div",{staticClass:"difficult-wrapper"},[t("button",{class:["btn","btn-difficult",1500===this.delay?"btn-difficult--active":""],attrs:{id:"slow"},on:{click:function(t){return q.checkDifficult("slow")}}},[q._v(" Легий ")]),t("button",{class:["btn","btn-difficult",1e3===this.delay?"btn-difficult--active":""],attrs:{id:"normal"},on:{click:function(t){return q.checkDifficult("normal")}}},[q._v(" Средний ")]),t("button",{class:["btn","btn-difficult",400===this.delay?"btn-difficult--active":""],attrs:{id:"fast"},on:{click:function(t){return q.checkDifficult("fast")}}},[q._v(" Сложный ")])])])},l=[],a=(e(7658),{name:"PlayingField",data(){return{round:0,numberOfCells:4,cells:[],delay:1500,sequence:[],playing:!1,selected:[],color:["green","blue","yellow","red"],gameStatus:"waitingStart"}},mounted(){this.gameStatus="waitingStart",this.createPlayingField()},computed:{formatedRound(){return this.round?this.round:"-"},textStage(){return this.round===this.sequence.length&&"repeat"===this.gameStatus?"Повторите последовательность.":"remember"===this.gameStatus?"Запомните последовательность.":"lost"===this.gameStatus?"Вы проиграли. Желаете повторить?":'Нажмите "Старт", чтобы начать.'}},methods:{start(){this.round=1,this.createPlayingField(),this.nextRound(this.round),this.gameStatus="remember"},colorize(q){let t;return t=0===q?"green":1===q?"red":2===q?"yellow":"blue",t},createPlayingField(){this.cells=[],this.sequence=[];for(let q=0;q<this.numberOfCells;q++){const t=this.colorize(q);this.cells.push({id:"cell-"+q,color:t,randomSelected:!1})}},colorCell(q){q.forEach((q=>{const t=document.getElementById(`${q.id}`);console.log(t),t.classList.add(`cell_${q.color}`)}))},checkDifficult(q){switch(q){case"slow":this.delay=1500;break;case"normal":this.delay=1e3;break;case"fast":this.delay=400;break}this.createPlayingField(),this.round=0,this.gameStatus="waitingStart"},nextRound(q){const t=this.delay*(q+1);this.getRandomCells(q),setTimeout((()=>{this.gameStatus="repeat"}),t)},getRandomCells(q){this.gameStatus="remember";let t=1,e=setInterval((()=>{const A=this.getRandomInt(this.numberOfCells);this.cells[A].randomSelected=!0,this.sequence.push(this.cells[A].id),this.turnAudio("audio-beep"),setTimeout((()=>{this.cells[A].randomSelected=!1}),this.delay-10),t===q&&clearInterval(e),t++}),this.delay)},getRandomInt(q){return Math.floor(Math.random()*q)},selectByUser(q){if("repeat"!==this.gameStatus)return;this.turnAudio("audio-beep");const t=document.getElementById(`${q}`);t.classList.add("filed-cell-active"),setTimeout((()=>{t.classList.remove("filed-cell-active")}),this.delay-10),this.selected.push(q),this.checkResult()},turnAudio(q){let t=document.getElementById(q);t.currentTime=0,t.play()},checkResult(){if(this.selected!==this.sequence){const q=this.selected[this.selected.length-1],t=this.selected.indexOf(q);q!=this.sequence[t]&&(this.turnAudio("audio-lost"),this.selected=[],this.gameStatus="lost"),q===this.sequence[t]&&this.sequence.length===this.selected.length&&(this.round++,this.selected=[],this.createPlayingField(),this.nextRound(this.round))}}}}),r=a,o=e(1001),c=(0,o.Z)(r,n,l,!1,null,"9bfd337e",null),u=c.exports,d={name:"App",components:{PlayingField:u}},g=d,f=(0,o.Z)(g,i,s,!1,null,"00603597",null),h=f.exports;A.ZP.config.productionTip=!1,new A.ZP({render:q=>q(h)}).$mount("#app")},4968:function(q){q.exports="data:audio/mpeg;base64,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RHigTETUDbUpUo1i6EnSxJbp1MqzGkxxt+tXi7mq71L/+1LE7ANMPHD+DhhqiXIgYAmxiXlqYkZuAt8sV4ofLk3wCDQ6NogoJyxCZWk0kKk0KFC0SppIZGnSFPIFUTSK5EOGXI2AaRGYrqXlV8o6k5UtlXBl5WjBVgRES2Rc6JlQ41jEJU86y5u5laktiKbr7hEnK3o4qcpYAAAkReCZLlQvDqN1OKlTLaGry0AYSanlqfKkkeiDJkTEjlots/nFLNgkWidZISg2EgK1QFInToVBYHSR6kJjAKlAsPT6QkAipFrH8sSPO0+sBN6/6kxBTf/7UsTqg0vQdwBNmGbJdRJgBbSM2UUzLjk3qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTeqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//tSxOqDS8Cq/k0Ya8GGGB8BlIz4qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45N6qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+1LE6IPKwG7kR7zBQAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7UsT/g8AAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"},9606:function(q,t,e){q.exports=e.p+"media/lost.8b4575bc.mp3"}},t={};function e(A){var i=t[A];if(void 0!==i)return i.exports;var s=t[A]={exports:{}};return q[A](s,s.exports,e),s.exports}e.m=q,function(){var q=[];e.O=function(t,A,i,s){if(!A){var n=1/0;for(o=0;o<q.length;o++){A=q[o][0],i=q[o][1],s=q[o][2];for(var l=!0,a=0;a<A.length;a++)(!1&s||n>=s)&&Object.keys(e.O).every((function(q){return e.O[q](A[a])}))?A.splice(a--,1):(l=!1,s<n&&(n=s));if(l){q.splice(o--,1);var r=i();void 0!==r&&(t=r)}}return t}s=s||0;for(var o=q.length;o>0&&q[o-1][2]>s;o--)q[o]=q[o-1];q[o]=[A,i,s]}}(),function(){e.n=function(q){var t=q&&q.__esModule?function(){return q["default"]}:function(){return q};return e.d(t,{a:t}),t}}(),function(){e.d=function(q,t){for(var A in t)e.o(t,A)&&!e.o(q,A)&&Object.defineProperty(q,A,{enumerable:!0,get:t[A]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(q){if("object"===typeof window)return window}}()}(),function(){e.o=function(q,t){return Object.prototype.hasOwnProperty.call(q,t)}}(),function(){e.p="/simon-the-game/"}(),function(){var q={143:0};e.O.j=function(t){return 0===q[t]};var t=function(t,A){var i,s,n=A[0],l=A[1],a=A[2],r=0;if(n.some((function(t){return 0!==q[t]}))){for(i in l)e.o(l,i)&&(e.m[i]=l[i]);if(a)var o=a(e)}for(t&&t(A);r<n.length;r++)s=n[r],e.o(q,s)&&q[s]&&q[s][0](),q[s]=0;return e.O(o)},A=self["webpackChunkgame_repeat_after_me"]=self["webpackChunkgame_repeat_after_me"]||[];A.forEach(t.bind(null,0)),A.push=t.bind(null,A.push.bind(A))}();var A=e.O(void 0,[998],(function(){return e(5545)}));A=e.O(A)})();
//# sourceMappingURL=app.8aa74fa5.js.map