(window["webpackJsonpmakecode-data-pipe-popup"]=window["webpackJsonpmakecode-data-pipe-popup"]||[]).push([[0],{10:function(e,t,n){},26:function(e,t,n){e.exports=n(42)},42:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(11),i=n.n(c),o=n(1),u=n(2),s=n(3),p=n(5),l=n(4),d=n(6),f=n(22),b=function(e){return a.a.createElement("div",{className:"break",style:{height:e.height}})},v=n(9),h=n(23);n(10);function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var O=function(e){function t(){return Object(u.a)(this,t),Object(p.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.props.appState.cameras.find((function(t){return t.deviceId===e.props.deviceId}));return a.a.createElement(a.a.Fragment,null,a.a.createElement("input",{type:"checkbox",checked:this.props.active,onChange:function(){return e.onChange()}}),a.a.createElement("label",null,t.label))}},{key:"onChange",value:function(){var e=!this.props.active;this.props.dispatch(h.enableCamera(this.props.tabId,this.props.deviceId,e))}}]),t}(a.a.Component),j=Object(o.b)((function(e,t){var n=e.tabs.find((function(e){return e.tabId===t.tabId}));return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(n,!0).forEach((function(t){Object(v.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({appState:e,active:n.cameras.includes(t.deviceId)},t)}),(function(e){return{dispatch:e}}))(O);function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var g=function(e){function t(){return Object(u.a)(this,t),Object(p.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",null,this.props.title),this.props.appState.cameras.map((function(t,n){return a.a.createElement("div",{key:n},a.a.createElement(j,{tabId:e.props.tabId,deviceId:t.deviceId}),a.a.createElement("br",null))})))}}]),t}(a.a.Component),E=Object(o.b)((function(e,t){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(n,!0).forEach((function(t){Object(v.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({appState:e},t)}),(function(e){return{dispatch:e}}))(g),k=function(e){function t(){return Object(u.a)(this,t),Object(p.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"Tabs"},this.props.appState.tabs.map((function(e,t){return a.a.createElement(E,Object.assign({key:t},e))})))}}]),t}(a.a.Component),w=Object(o.b)((function(e){return{appState:e}}),(function(e){return{dispatch:e}}))(k),P=n(24);function S(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function I(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?S(n,!0).forEach((function(t){Object(v.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):S(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var C=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(p.a)(this,Object(l.a)(t).call(this,e))).videoRef=void 0,n.canvasRef=void 0,n.colorCubeImageRef=void 0,n.videoFrameTimer=void 0,n.state={},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=new Seriously,t=e.source(this.videoRef),n=e.effect("colorcube");n.source=t,t=n,n.cube=this.colorCubeImageRef,e.target(this.canvasRef).source=t,e.go()}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"Camera"},a.a.createElement("div",{key:1},this.props.label),a.a.createElement("div",{key:2},"".concat(this.props.deviceId.substr(0,5),"...")),a.a.createElement("div",{key:3},a.a.createElement("video",{className:"SourceVideo",width:160,height:120,ref:function(t){return e.videoRef=t}})),a.a.createElement("div",{key:4},a.a.createElement("canvas",{className:"SourceCanvas",width:160,height:120,ref:function(t){return e.canvasRef=t}})),a.a.createElement("img",{className:"ColorCubeImage",alt:"",src:"./adjustments/posterize-4-lab.png",ref:function(t){return e.colorCubeImageRef=t}}),a.a.createElement("button",{className:"Button",onClick:function(){return e.toggleVideo()}},this.state.active?"Stop":"Start"))}},{key:"toggleVideo",value:function(){var e=this;if(this.state.active){if(this.videoRef.srcObject)clearInterval(this.videoFrameTimer),delete this.videoFrameTimer,this.videoRef.srcObject.getTracks().forEach((function(e){return e.stop()})),this.videoRef.srcObject=null;this.setState(I({},this.state,{active:!1}))}else{var t={audio:!1,video:{aspectRatio:4/3,deviceId:this.props.deviceId,width:{ideal:160},height:{ideal:120}}};navigator.mediaDevices.getUserMedia(t).then((function(t){e.videoRef.srcObject=t,e.videoRef.play(),e.setState(I({},e.state,{active:!0})),e.videoFrameTimer=setInterval((function(){return e.sendVideoFrame()}),500)})).catch((function(e){return console.log(e)}))}}},{key:"sendVideoFrame",value:function(){chrome.runtime.sendMessage(P.videoFrame(this.props.deviceId,""))}}]),t}(a.a.Component),D=Object(o.b)((function(e,t){return I({appState:e},t)}),(function(e){return{dispatch:e}}))(C),R=function(e){function t(){return Object(u.a)(this,t),Object(p.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"Cameras"},this.props.appState.cameras.map((function(e,t){return a.a.createElement(D,Object.assign({key:t},e))})))}}]),t}(a.a.Component),N=Object(o.b)((function(e){return{appState:e}}),(function(e){return{dispatch:e}}))(R),F=function(e){function t(){return Object(u.a)(this,t),Object(p.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"MainPanel"},a.a.createElement("div",{className:"center"},"MakeCode Data Pipe"),a.a.createElement(b,{height:10}),a.a.createElement("div",null,"Cameras"),a.a.createElement(N,null),a.a.createElement(b,{height:10}),a.a.createElement("div",null,"Tabs"),a.a.createElement(w,null))}}]),t}(a.a.Component),T=Object(o.b)((function(e){return{appState:e}}),(function(e){return{dispatch:e}}))(F),M=function(e){function t(e){var n;return Object(u.a)(this,t),n=Object(p.a)(this,Object(l.a)(t).call(this,e)),navigator.mediaDevices.getUserMedia({audio:!1,video:!0}).then((function(t){t.getTracks().forEach((function(e){return e.stop()})),navigator.mediaDevices.enumerateDevices().then((function(t){var n=t.filter((function(e){return"videoinput"===e.kind})).map((function(e){var t=e.label.match(/([^(]*)/)[1].trim();return{deviceId:e.deviceId,label:t}}));e.dispatch(f.registerCameras(n))}))})),n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return a.a.createElement(T,null)}}]),t}(a.a.Component),V=Object(o.b)((function(e){return{appState:e}}),(function(e){return{dispatch:e}}))(M),x=new(n(25).Store);x.ready().then((function(){i.a.render(a.a.createElement(o.a,{store:x},a.a.createElement(V,null)),document.getElementById("root"))}))}},[[26,1,2]]]);
//# sourceMappingURL=main.8e3e7201.chunk.js.map