(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{113:function(e,t,n){},114:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),c=n(20),l=n.n(c),i=n(0),o=n.n(i),s=n(3),u=n(8),p=n(17),m=n(54),d=n(25),f=n(29),b=n(15),g=function(){return r.a.createElement("div",{className:"loading-page-container"},r.a.createElement("div",{className:"page-loader"},r.a.createElement("span",null),r.a.createElement("span",null),r.a.createElement("span",null)),r.a.createElement("p",null,"loading"))},E=function(e){var t=e.screen;return r.a.createElement("div",{className:"front-page-container"},r.a.createElement("div",{className:"logo"},"PlayVi"),r.a.createElement("button",{type:"button",className:"big-text-button",onClick:function(){return t("create")}},"Start a party"),r.a.createElement("button",{type:"button",className:"big-text-button",onClick:function(){return t("join")}},"Join to a party"),r.a.createElement("button",{type:"button",className:"small-text-button",onClick:function(){return t("about")}},"About"),r.a.createElement("button",{type:"button",className:"small-text-button",onClick:function(){return t("how-to")}},"How to use"))},v=function(e){var t=e.placeholder,n=e.getField,c=e.validate,l=e.pattern,i=e.maxlength,o=e.isAlert,s=e.onChange,p=e.onReturnKeyPress,m=e.invalidMessage,d=e.invalidValue,f=e.initialValue,b=Object(a.useRef)(null),g=Object(a.useState)(f),E=Object(u.a)(g,2),v=E[0],h=E[1];Object(a.useEffect)(function(){n(v),c(Boolean(v.length))},[v]);return r.a.createElement("div",{className:"custon-text-input-wrapper"},r.a.createElement("input",{spellCheck:!1,ref:b,type:"text",maxLength:i,pattern:l,className:o?"custom-text-input alert":"custom-text-input",placeholder:t,onChange:function(e){h(e.target.value),s()},defaultValue:f,onKeyDown:function(e){13===e.keyCode&&(b.current.blur(),p())}}),d&&r.a.createElement("span",null,m))};v.defaultProps={maxLength:15,onChange:function(){},invalidValue:!1,invalidMessage:"",initialValue:""};var h=v,y=function(e){var t=e.backAction,n=e.nextAction,a=e.leftButton,c=e.rightButton;return r.a.createElement("div",{className:"navigation-buttons-container"},r.a.createElement("button",{type:"button",className:"big-text-button",onClick:t},a),r.a.createElement("button",{type:"button",className:"big-text-button",onClick:n},c))},A=function(){return r.a.createElement("div",{className:"linear-progress small"},r.a.createElement("div",{className:"bar bar1"}),r.a.createElement("div",{className:"bar bar2"}))},O=function(e){var t=e.screen,n=e.createPlaylist,c=e.playlistData,l=e.loading,i=Object(a.useState)(""),o=Object(u.a)(i,2),s=o[0],p=o[1],m=Object(a.useState)(!1),d=Object(u.a)(m,2),f=d[0],b=d[1],g=Object(a.useState)(!1),E=Object(u.a)(g,2),v=E[0],O=E[1],j=function(){f?n(s):O(!0)};return Object(a.useEffect)(function(){s.length&&O(!1)},[s]),Object(a.useEffect)(function(){null!==c&&t("admin")},[c]),r.a.createElement("div",{className:"create-party-container"},r.a.createElement(h,{getField:function(e){return p(e)},placeholder:"Nickname",validate:function(e){return b(e)},isAlert:v,onReturnKeyPress:l?null:j}),r.a.createElement("p",{className:"info-text"},"Pick a nickname which will appear below the songs you add to the playlist."),r.a.createElement("p",{className:"info-text"},"Note that the party is going to expire after 7 days."),r.a.createElement(y,{leftButton:"Back",rightButton:"Create",backAction:function(){return t("frontpage")},nextAction:l?null:j}),l&&r.a.createElement(A,null))},j=function(e){var t=e.screen,n=e.joinParty,c=e.isPinValid,l=e.loading,i=e.clearParty,o=e.initialPin,s=Object(a.useState)(""),p=Object(u.a)(s,2),m=p[0],d=p[1],f=Object(a.useState)(o),b=Object(u.a)(f,2),g=b[0],E=b[1],v=Object(a.useState)([!1,!1]),O=Object(u.a)(v,2),j=O[0],N=O[1],x=Object(a.useState)([!1,!1]),w=Object(u.a)(x,2),k=w[0],S=w[1],P=Object(a.useState)(!1),C=Object(u.a)(P,2),B=C[0],I=C[1];Object(a.useEffect)(function(){null===c||c||I(!0)},[c]);var D=function(){j[0]&&j[1]?n(g,m):S([!j[0],!j[1]])};return Object(a.useEffect)(function(){g.length&&S(function(e){return[!1,e[1]]}),m.length&&S(function(e){return[e[0],!1]})},[g,m]),Object(a.useEffect)(function(){return""!==o&&N([!0,!1]),I(!1)},[]),r.a.createElement("div",{className:"join-party-container"},r.a.createElement("div",{className:"text-field-wrapper"},r.a.createElement(h,{getField:function(e){return E(e)},placeholder:"PARTY PIN",initialValue:g,pattern:"\\d*",validate:function(e){return N([e,j[1]])},isAlert:k[0],maxlength:4,invalidValue:B,invalidMessage:"Invalid PIN",onChange:function(){return I(!1)}}),r.a.createElement(h,{getField:function(e){return d(e)},placeholder:"Nickname",validate:function(e){return N([j[0],e])},isAlert:k[1],onReturnKeyPress:l?null:D})),r.a.createElement("p",{className:"info-text"},"Pick a nickname which will appear below the songs you add to the playlist."),r.a.createElement(y,{leftButton:"Back",rightButton:"Join",backAction:function(){t("frontpage"),i()},nextAction:l?null:D}),l&&r.a.createElement(A,null))},N=n(28),x=n(5),w=n(6),k=n(10),S=n(7),P=n(9),C=n(55),B=n.n(C),I=function(e){function t(){var e;return Object(x.a)(this,t),(e=Object(k.a)(this,Object(S.a)(t).call(this))).containerEl=r.a.createRef(),e}return Object(P.a)(t,e),Object(w.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.swipeOptions;this.swipe=B()(this.containerEl.current,e)}},{key:"componentWillUnmount",value:function(){this.swipe.kill(),this.swipe=void 0}},{key:"getPos",value:function(){return this.swipe.getPos()}},{key:"getNumSlides",value:function(){return this.swipe.getNumSlides()}},{key:"slide",value:function(){var e;(e=this.swipe).slide.apply(e,arguments)}},{key:"next",value:function(){this.swipe.next()}},{key:"prev",value:function(){this.swipe.prev()}},{key:"render",value:function(){var e=this.props,t=e.id,n=e.className,a=e.style,c=e.children;return r.a.createElement("div",{id:t,ref:this.containerEl,className:"react-swipe-container ".concat(n),style:a.container},r.a.createElement("div",{style:a.wrapper},r.a.Children.map(c,function(e){if(!e)return null;var t=e.props.style?Object(N.a)({},a.child,e.props.style):a.child;return r.a.cloneElement(e,{style:t})})))}}]),t}(a.PureComponent);I.defaultProps={swipeOptions:{},style:{container:{overflow:"hidden",visibility:"hidden",position:"relative"},wrapper:{overflow:"hidden",position:"relative",height:"100%"},child:{float:"left",width:"100%",position:"relative",transitionProperty:"transform"}},className:"",childCount:0};var D=I,R=n(56),U=n.n(R),L=function(e){var t=e.moreButton,n=e.next,c=e.prev,l=e.tabPos,i=Object(a.useState)(0),o=Object(u.a)(i,2),s=o[0],p=o[1],m=function(e){"next"===e?(p(1),n()):"prev"===e&&(p(0),c())};return 0===s&&1===l?p(1):1===s&&0===l&&p(0),r.a.createElement("div",{className:"tab-menu-container"},r.a.createElement("button",{type:"button",className:"tab-button",onClick:function(){return m("prev")}},"Playlist"),r.a.createElement("button",{type:"button",className:"tab-button",onClick:function(){return m("next")}},"Add Songs"),r.a.createElement("button",{type:"button",className:"more-button",onClick:function(){return t()}},r.a.createElement("img",{alt:"more",src:U.a})),r.a.createElement("span",{className:s?"underline slide":"underline"}))},V=n(57),Q=n.n(V),T=function(e){var t=e.id,n=e.info,c=Object(a.useState)(!1),i=Object(u.a)(c,2),o=i[0],s=i[1],m=Object(a.useState)(!1),d=Object(u.a)(m,2),f=d[0],b=d[1],g=function(){s(function(e){return!e})};return Object(a.useEffect)(function(){o?document.querySelector(".root").classList.add("blur"):document.querySelector(".root").classList.remove("blur")},[o]),Object(a.useEffect)(function(){localStorage.getItem("seen-".concat(t))&&b(!0)}),r.a.createElement("div",{className:"info-indicator-container"},r.a.createElement("button",{type:"button",className:f?"attention-indicator remove-animation":"attention-indicator",onClick:g,style:{left:"".concat(-30,"px"),top:"".concat(2,"px")}},"i"),l.a.createPortal(r.a.createElement(p.CSSTransition,{in:o,timeout:350,classNames:"front-page-container",unmountOnExit:!0},r.a.createElement("div",{role:"button",tabIndex:"0",className:"info-modal-container",onClick:g},r.a.createElement("div",{role:"button",tabIndex:"0",className:"info-modal",onClick:function(e){return e.stopPropagation()}},Q()(n),r.a.createElement("button",{type:"button",className:"close-button",onClick:function(){s(function(e){return!e}),b(!0),localStorage.setItem("seen-".concat(t),!0)}},r.a.createElement("span",{role:"img"},"\ud83d\udc4d\ud83c\udffb"))))),document.body))},G=n(22),M=n.n(G),F=function(e){var t=e.userRole,n=e.playlistData,c=n.accessLink,l=n.spotifyName,i=n.pin,p=n.creator,m=e.songs,d=e.firebaseAuth,f=e.firebaseDatabase,g=Object(a.useState)({songId:null,index:null}),E=Object(u.a)(g,2),v=E[0],h=E[1],y='\n    <p>\n      <span style="color: #49DA8B">'.concat(l,"</span> is the auto-generated Spotify playlist for your party.\n    </p>\n    <p>\n      Songs added will appear both under the Playlist tab and the actual playlist in Spotify.\n    </p>\n    <p>\n      Tap on the playlist name to open it with Spotify or tap and hold to copy the link to the playlist.\n    </p>\n  "),A='\n    <p>\n      <span style="color: #49DA8B">'.concat(i,"</span> is the PIN code to join to the party you have created.\n    </p>\n    <p>\n      Share this PIN code with people so that they can contribute to your party playlist.\n    </p>\n  "),O=function(){var e=Object(s.a)(o.a.mark(function e(t){var n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=Object(b.d)(f,"playlist/".concat(i,"/songs/").concat(t)),e.next=4,Object(b.e)(n);case 4:e.next=10;break;case 6:e.prev=6,e.t0=e.catch(0),h({songId:null,index:null}),console.log(e.t0);case 10:case"end":return e.stop()}},e,null,[[0,6]])}));return function(t){return e.apply(this,arguments)}}(),j=function(e){var t=d.currentUser.uid;return t?p.id===t||t===e:null};Object(a.useEffect)(function(){null!==v.songId&&O(v.songId)},[v]),Object(a.useEffect)(function(){h({songId:null,index:null})},[m]);var N=function(e,t){return r.a.createElement("div",{key:e.id,className:"song-wrapper"},r.a.createElement("img",{alt:"album-cover",className:"album-cover",src:e.albumCoverUrl}),r.a.createElement("div",{className:j(e.creator.id)?"text-info short-ellipsis":"text-info"},r.a.createElement("p",null,e.name),r.a.createElement("p",null,e.artists.map(function(t,n){return r.a.createElement("span",{key:t.id},n!==e.artists.length-1?"".concat(t.name,", "):t.name)})),r.a.createElement("p",null,e.creator.username?"Added by ".concat(e.creator.username):"")),function(e,t,n){return j(e)?v.index===n?r.a.createElement("span",{className:"spinner"}):r.a.createElement("button",{type:"button",className:"delete-button",onClick:function(){return h({songId:t,index:n})},style:{backgroundImage:"url(".concat(M.a,")"),backgroundPosition:"center",backgroundSize:"14px 14px",backgroundRepeat:"no-repeat"}}):null}(e.creator.id,e.id,t))};if(m.length)return r.a.createElement("div",{className:"play-list-container"},r.a.createElement("div",{className:"play-list-stats"},r.a.createElement("span",null,m.length>1?"".concat(m.length," songs"):"".concat(m.length," song")),r.a.createElement("span",null,"  -  "),r.a.createElement("span",null,function(){var e=0;return m.map(function(t){return e+=t.duration,null}),function(e){var t=Math.floor(e/6e4),n=(e%6e4/1e3).toFixed(0);return t>60?(t%=60,"".concat(1,":").concat(t<10?"0":"").concat(t," hours")):"".concat(t,":").concat(n<10?"0":"").concat(n," minutes")}(e)}()),r.a.createElement("span",null,"  |  "),r.a.createElement("span",null,function(){var e=[];return m.forEach(function(t){e.includes(t.creator.username)||e.push(t.creator.username)}),e.length>1?"".concat(e.length," contributors"):"".concat(e.length," contributor")}())),r.a.createElement("div",{className:"playlist-songs-container","data-scroll-lock-scrollable":!0},m.map(function(e,t){return N(e,t)})),r.a.createElement("div",{className:"transparent-gradient"}));switch(t){case"participant":return r.a.createElement("div",{className:"play-list-container center"},r.a.createElement("p",null,"The playlist is empty.",r.a.createElement("br",null),"Start adding songs to the playlist."));case"admin":return r.a.createElement("div",{className:"play-list-container center"},r.a.createElement("div",{className:"playlist-name"},r.a.createElement("span",null,r.a.createElement(T,{id:1,info:y}),"PLAYLIST NAME"),r.a.createElement("br",null),r.a.createElement("span",null,r.a.createElement("a",{target:"_new",className:"playlist-link",href:c},l)),r.a.createElement("br",null),r.a.createElement("span",null,"Click on the playlist name to open it in Spotify.")),r.a.createElement("span",{className:"dashed-separator"}),r.a.createElement("div",{className:"party-pin"},r.a.createElement("span",{style:{position:"relative"}},r.a.createElement(T,{id:2,info:A}),"PARTY PIN"),r.a.createElement("br",null),r.a.createElement("span",null,i),r.a.createElement("br",null),r.a.createElement("span",null,"Share this with your friends.")));default:return null}},q=n(23),J=n(58),K=n(59),Y=n.n(K),z=function(e){var t=e.onChange,n=e.onClear,c=e.placeholder,l=Object(a.useRef)(""),i=Object(a.useState)(""),o=Object(u.a)(i,2),s=o[0],p=o[1];return r.a.createElement("div",{className:"search-bar-container"},r.a.createElement("input",{spellCheck:!1,type:"text",ref:l,className:"custom-search-bar",placeholder:c,onChange:function(e){p(e.target.value),t(e.target.value)},onKeyDown:function(e){13===e.keyCode&&l.current.blur()},style:{backgroundImage:"url(".concat(Y.a,")"),backgroundPosition:"10px center",backgroundSize:"18px 18px",backgroundRepeat:"no-repeat"}}),Boolean(s.length)&&r.a.createElement("button",{type:"button",className:"delete-button",onClick:function(){p(""),t(""),n(),l.current.value="",l.current.focus()},style:{backgroundImage:"url(".concat(M.a,")"),backgroundPosition:"center",backgroundSize:"14px 14px",backgroundRepeat:"no-repeat"}}))},X=null,W=function(e){var t,n=e.pin,c=e.songs,l=e.firebaseAuth,i=Object(a.useState)(""),p=Object(u.a)(i,2),m=p[0],f=p[1],g=Object(a.useState)([]),E=Object(u.a)(g,2),v=E[0],h=E[1],y=Object(a.useState)({id:null}),A=Object(u.a)(y,2),O=A[0],j=A[1],N=Object(a.useState)(!1),x=Object(u.a)(N,2),w=x[0],k=x[1],S=Object(a.useState)(!1),P=Object(u.a)(S,2),C=P[0],B=P[1],I=Object(a.useState)(!1),D=Object(u.a)(I,2),R=D[0],U=D[1],L=Object(a.useState)({id:null,index:null}),V=Object(u.a)(L,2),Q=V[0],T=V[1],G=Object(J.useDebounce)(m,300),M=Object(u.a)(G,1)[0],F=Object(q.a)(Object(d.a)(),"europe-west1"),K=Object(q.b)(F,"https://searchsongs-dclj74qtzq-ew.a.run.app/searchsongs"),Y=Object(a.useRef)(null),W=function(){var e=Object(s.a)(o.a.mark(function e(t){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:try{K({q:t,limit:50,offset:0}).then(function(e){var t=e.data;h(t.tracks.items),t.tracks.items.length||U(!0),Y.current.scrollTop=0})}catch(n){console.log(n)}case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),Z=function(){var e=Object(s.a)(o.a.mark(function e(t){var a,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a=l.currentUser,r={creator:{id:a.uid},timestamp:Date.now()},e.next=5,Object(b.f)(Object(b.d)(Object(b.b)(),"playlist/".concat(n,"/songs/").concat(t)),r);case 5:setTimeout(function(){return T({id:null,index:null})},100),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),T({id:null,index:null}),console.log(e.t0);case 12:case"end":return e.stop()}},e,null,[[0,8]])}));return function(t){return e.apply(this,arguments)}}(),H=function(){B(!0),k(!1),clearTimeout(X)},_=function(e){B(!1),O.id===e?(j({id:null}),k(!1)):(j({id:e}),X=setTimeout(function(){return k(!0)},200))};Object(a.useEffect)(function(){if(M.length)try{W(M)}catch(e){console.log(e)}else h([])},[M]);Object(a.useEffect)(function(){null!==Q.id&&Z(Q.id)},[Q]),Object(a.useEffect)(function(){B(!1),j({id:null})},[m]);var $=function(e){return c.some(function(t){return t.id===e})},ee=function(e,n){return r.a.createElement("div",{key:e.id,className:"song-wrapper"},r.a.createElement("button",{type:"button",className:e.preview_url?"album-cover":"album-cover no-click",onClick:function(){return _(e.id)}},O.id===e.id&&C&&r.a.createElement("div",{className:"circle"},r.a.createElement("div",{className:"square"})),e.preview_url&&r.a.createElement("div",{className:"preview-indicator"},O.id===e.id&&w&&r.a.createElement("span",{className:"spinner mini"}),r.a.createElement("div",{className:"arrow"})),r.a.createElement("img",{alt:"album-cover",className:O.id===e.id&&C?"playing":null,src:e.album.images.length?e.album.images[1].url:null})),r.a.createElement("div",{type:"button",className:Q.index===n?"text-info short-ellipsis":"text-info",onClick:$(e.id)?null:function(){return function(e,n){O.id===e&&_(e),clearTimeout(t),t=setTimeout(function(){T({id:e,index:n})},200)}(e.id,n)}},r.a.createElement("p",{className:$(e.id)?"greyed-out":void 0,style:e.preview_url&&{paddingLeft:"17px"}},e.name),r.a.createElement("p",{className:$(e.id)?"greyed-out":void 0},e.artists.map(function(t,n){return r.a.createElement("span",{key:t.id},n!==e.artists.length-1?"".concat(t.name,", "):t.name)})),r.a.createElement("div",{className:O.id===e.id&&C?"playing-song-bar playing":"playing-song-bar"}),O.id===e.id&&r.a.createElement("audio",{src:e.preview_url,autoPlay:!0,onCanPlayThrough:H,onEnded:_})),Q.index===n&&r.a.createElement("span",{className:"spinner"}))};return r.a.createElement("div",{className:"add-song-container"},r.a.createElement(z,{placeholder:"Search a song",onChange:f,onClear:function(){return U(!1)}}),r.a.createElement("div",{ref:Y,className:"songs-container",onScroll:function(){document.querySelector(".custom-search-bar").blur()},"data-scroll-lock-scrollable":!0},m.length?v.map(function(e,t){return ee(e,t)}):r.a.createElement("span",{className:"add-song-message"},"Add a new song to playlist"),R&&r.a.createElement("span",{className:"add-song-message"},"No matching result")),r.a.createElement("div",{className:"transparent-gradient"}))},Z=function(e){var t=e.close,n=e.exit,a=e.playlistData,c=a.accessLink,l=a.spotifyName,i=a.pin;return r.a.createElement("div",{role:"button",tabIndex:"0",className:"sliding-menu-container",onClick:function(e){return e.stopPropagation()}},r.a.createElement("div",{className:"cover",onClick:t,role:"button",tabIndex:"0"}),r.a.createElement("div",{className:"vertical-wrapper"},r.a.createElement("div",{className:"inner-wrapper"},r.a.createElement("p",{className:"header"},"Playlist Name"),r.a.createElement("a",{className:"text",href:c},l)),r.a.createElement("div",{className:"inner-wrapper"},r.a.createElement("p",{className:"header"},"Party PIN"),r.a.createElement("p",{className:"text"},i)),r.a.createElement("div",{className:"inner-wrapper-bottom"},r.a.createElement("button",{type:"button",onClick:n},"Leave the party"))),r.a.createElement("button",{type:"button",className:"close-button",onClick:t},r.a.createElement("img",{alt:"more",src:M.a})))},H=function(e){var t=e.screen,n=e.userRole,c=e.playlistData,l=e.clearParty,i=e.firebaseDatabase,o=e.firebaseAuth,s=Object(a.useRef)(null),m=Object(a.useState)(0),d=Object(u.a)(m,2),f=d[0],b=d[1],g=Object(a.useState)(!1),E=Object(u.a)(g,2),v=E[0],h=E[1];return Object(a.useEffect)(function(){return function(){l()}},[]),r.a.createElement("div",{className:"party-screen-container",onClick:function(){return v&&h(function(e){return!e})}},r.a.createElement(p.CSSTransition,{in:v,timeout:250,classNames:"sliding-menu",unmountOnExit:!0},r.a.createElement(Z,{close:function(){return h(function(e){return!e})},exit:function(){t("frontpage"),localStorage.removeItem("SESSION")},playlistData:c})),r.a.createElement(L,{moreButton:function(){return h(function(e){return!e})},next:function(){return s.current.next()},prev:function(){return s.current.prev()},tabPos:f}),r.a.createElement(D,{key:"swipe",className:v?"carousel blur":"carousel",swipeOptions:{continuous:!1,callback:function(){b(s.current.getPos()),document.querySelector(".custom-search-bar").blur()}},ref:s},r.a.createElement(F,{userRole:n,playlistData:c,songs:c.songs||[],firebaseDatabase:i,firebaseAuth:o}),r.a.createElement(W,{pin:c.pin,songs:c.songs||[],firebaseAuth:o})))},_=function(e){var t=e.screen;return r.a.createElement("div",{className:"about-page-container"},r.a.createElement("p",null,r.a.createElement("b",{className:"app-name"},"PlayVi")," ","makes it easy to collaborate on Spotify playlists mainly for home parties where several people get involved and want to have control on the songs to be played during the event."),r.a.createElement("p",null,"Even people who don\u2019t have a Spotify account can still decide what to be played next!"),r.a.createElement(y,{leftButton:"Back",backAction:function(){return t("frontpage")}}))},$=function(e){var t=e.screen;return r.a.createElement("div",{className:"how-to-page-container"},r.a.createElement("ul",null,r.a.createElement("li",null,"Start a party."),r.a.createElement("li",null,"Share the party pin & app link with people before the actual party."),r.a.createElement("li",null,"Wait for people to add songs."),r.a.createElement("li",null,"When the party day comes, click the playlist name to open & play it in Spotify.")),r.a.createElement("p",null,"For more information refer to"," ",r.a.createElement("a",{href:"https://github.com/dbilgili/PlayVi/blob/master/README.md",rel:"noopener noreferrer",target:"_blank"},"README")," ","file of the Github repo."),r.a.createElement(y,{leftButton:"Back",backAction:function(){return t("frontpage")}}))},ee=(n(113),n(27)),te=function(){var e=Object(a.useState)("loading"),t=Object(u.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)(!1),i=Object(u.a)(l,2),v=i[0],h=i[1],y=Object(a.useState)(""),A=Object(u.a)(y,2),N=A[0],x=A[1],w=Object(a.useState)(null),k=Object(u.a)(w,2),S=k[0],P=k[1],C=Object(a.useState)(null),B=Object(u.a)(C,2),I=B[0],D=B[1],R=Object(d.b)({apiKey:"AIzaSyDxDlBDqLsuFgwEWi9hUO0ebOeC3XyUIEc",authDomain:"playvi.firebaseapp.com",projectId:"playvi",storageBucket:"playvi.appspot.com",messagingSenderId:"815991548965",appId:"1:815991548965:web:7565c1da50cad0e46a63cc",databaseURL:"https://playvi-default-rtdb.europe-west1.firebasedatabase.app"}),U=Object(b.b)(R),L=Object(f.a)(),V=Object(q.a)(Object(d.a)(),"europe-west1"),Q=Object(q.b)(V,"https://createplaylist-dclj74qtzq-ew.a.run.app/createplaylist"),T=function(){},G=function(){var e=Object(s.a)(o.a.mark(function e(t){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return h(!0),e.next=3,J(t);case 3:Q().then(function(e){var t=e.data;P(t),c("admin"),h(!1),K(t.pin)}).catch(function(){h(!1)});case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),M=function(){var e=Object(s.a)(o.a.mark(function e(t,n){var a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return h(!0),D(null),e.next=4,J(n);case 4:a=Object(b.d)(U,"playlist/"+t),Object(b.a)(a).then(function(e){if(e.exists()){var n=e.val();n.songs&&(n.songs=Object.entries(n.songs).map(function(e){return e[1]}).filter(function(e){return e.name})),P(n),c("participant"),h(!1),K(t)}else D(!1),h(!1)}).catch(function(){h(!1)});case 6:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),F=function(){console.log(T),Object(f.c)(L),T(),P(null)};Object(a.useEffect)(function(){Object(m.disablePageScroll)(null),function(){var e=window.location.search.substring(1).split("="),t=e[0],n=e[1];setTimeout(function(){"pin"===t&&void 0!==n?(x(n),c("join")):c("frontpage")},500)}();var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(e,"px")),document.addEventListener("gesturestart",function(e){return e.preventDefault()})},[]);var J=function(){var e=Object(s.a)(o.a.mark(function e(t){var n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(f.b)(L);case 2:return n=e.sent,e.next=5,Object(ee.d)(n.user,{displayName:t});case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),K=function(){var e=Object(s.a)(o.a.mark(function e(t){var n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=Object(b.d)(U,"playlist/"+t),T=Object(b.c)(n,function(e){if(e.exists()){var t=e.val();t.songs&&(t.songs=Object.entries(t.songs).map(function(e){return e[1]}).filter(function(e){return e.name})),console.log(t.songs),P(t)}else F()});case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"App"},"loading"===n&&r.a.createElement(g,null),r.a.createElement(p.CSSTransition,{in:"frontpage"===n,timeout:350,classNames:"front-page-container",unmountOnExit:!0},r.a.createElement(E,{screen:function(e){return c(e)}})),r.a.createElement(p.CSSTransition,{in:"create"===n,timeout:350,classNames:"join-party-container",unmountOnExit:!0},r.a.createElement(O,{screen:function(e){return c(e)},loading:v,clearParty:F,createPlaylist:G,playlistData:S})),r.a.createElement(p.CSSTransition,{in:"join"===n,timeout:350,classNames:"join-party-container",unmountOnExit:!0},r.a.createElement(j,{screen:function(e){return c(e)},loading:v,clearParty:F,joinParty:M,isPinValid:I,initialPin:N})),r.a.createElement(p.CSSTransition,{in:"admin"===n||"participant"===n,timeout:350,classNames:"join-party-container",unmountOnExit:!0},r.a.createElement(H,{screen:function(e){return c(e)},clearParty:F,userRole:n,playlistData:S,firebaseDatabase:U,firebaseAuth:L})),r.a.createElement(p.CSSTransition,{in:"about"===n,timeout:350,classNames:"join-party-container",unmountOnExit:!0},r.a.createElement(_,{screen:function(e){return c(e)}})),r.a.createElement(p.CSSTransition,{in:"how-to"===n,timeout:350,classNames:"join-party-container",unmountOnExit:!0},r.a.createElement($,{screen:function(e){return c(e)}})))};l.a.render(r.a.createElement(te,null),document.getElementById("root"))},22:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFOSURBVHgB7dvLDcIwEIThiAoohf4v0AGlUMIPiFgKQVEe3vWOV4yUG9bOh/I6OMMwC3B+HdfXcRk6ybvr2Pm89sM37s4njx6QI+4xdr4vImc4ekDOcCwiF3DSyAXcL3IFJ4lcwX0j+VycWyKB3Igrue1dEIo83JUOkNUdEUaadUMQad4JIaRbFwSQ7h0IRDabHYFsPrPlQKLOmhaDib7uPQsgcFNzK4IKzqMQajjLYqjiLAqijqsp2g2uAtkPrmQnsi9ciSFSD1digNTFlVQg9XElB5BuuNPwz76kPkXJfJMh82OCzA96Mr+qkfllu6Yo6kiLgqgiLYuhhvQohArSswjRyBYFwpAtBzdHRvyrzWYSeF24z0bgzubWAQGcWxeEcOadEMSZdUMYV92RDnBVSHJvxrvm3045Lsi7IXayIO+W5smCvJvSJwtSfVbwBNL9hozXmOmOAAAAAElFTkSuQmCC"},56:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADQSURBVHgB5ZbRCcMwDEQvmSAjZISO4A3ajTpCskG7QidpN0g2ucrYUJqPRpYpyOSBwGD5xVz8IWADySA1SS388JS6SY2oxK1fNod8cI8JBtz7c0paYu+AAlz7qUtui/pPufbLYqSdoLica38vjivsXBQ9rv0xgBPsnBU9rv1dfAeooBN+7Xv39zg4MYAVdl6KnhV2/u6PATxgR3NB336m0dHKuPeFJvyymFnODCXu/UxzdNEoiQKa8VOXZOwpmtOb8jONlnd+J7rkgwGVePO/ATT8sfY1AxLgAAAAAElFTkSuQmCC"},59:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANoSURBVHgB7ZqNURsxEIWfXYFTQa6DkAq4DkIHcQl0gDuADhwqIKngnAogFeg6gFTwssrJg4eAtPJIOhHrm9mxBx269dNKWv0AjVdZIDEkO/noxT6J2e9nYitnlidno9iD2C/7uVgsHvC/IWL0YtdihsdjxLZiZ3jvOEEGpmcQW+O9kVGQlxhOXbNuxMkVpy5TGvvOFWrEtpzYPefDsLboEYfOxB45P4a1DM6sR5RDviIz3jyGU+sMeM5BtNg85RZTnmLtSfKU0dVp6+qcXYidu++xfJ4l9+E0phjGcSfWIxJOs9w3xmGjuENpIkUZUjjJqTFiBDIsOVvJy66UjtlWu0RibJ3Uj2vXKIFrNW1rZZshGNeVe+SGulzFsED/jhBnQE7kBWvqKJZLUJ8u9MgFdeuf5GOKwq9LhV95ooa6seUOM6FstB6p4bQXEqLDTCgb7gapYXiQ22JmGM5xHpESTgNciB4zwylDDpFkYli6z1Blo6xLdpgZ58MYeKxHArTC7FAPPwLln5CApbKykDMl2QXKk3alLvDciHoIbTUkWVQulZWNqIenQHmHBPzdqLJDufchARVRwt8lGq+yF8YbntJAH3FiqIQRPqASFAnciATshQmN9DWdJ3eB8hEJ2AvzO/BcTcL0gfLQb1GhjZgvqIfzQPkOqaBuSd9jZpR+po1uhrcPa9h22AZ8NEiNVHrDMB1mgrpoSd941O115N2N9/u3VfjXIwesdzNcc3qRvhsdOKCJGjsWlTw+6ag7PlkjJ9RFjWFdB275ouXAGU3UZBeHcUe0ZSKYuhnKYkN8jcRInRfUH+qnPzLxOLZi3DWQLdNdA7mLeK9h6UuL1A96LwWKDms+X6COeV/Wi0Oaq2b3iGcU+y72E9PRy8NBnfvr87Zuu+7pcfwidS1132IOqL8BUQNXKAnrubmp8aG4OMdcVkyJcT5oIri4OHa20k7lKbHvXB34oaGsOM4x27UM8zPwlYVhxP+XF8c5aMPaMD0DPStlxjGPOM7R/QVmw+OxA+sNFVsH8syGccwnzoHTtpvZO3M2gx3eEMv+zd4O3bpnj0kK3584pWjieGjieGjieGjieGjieGjieGjieGjieGjieGjieGjieIgVB6dEjDg4NZTibHCKBMTZ4JR5Q5wNGv+Iszks+wNlma1sSNwuigAAAABJRU5ErkJggg=="},61:function(e,t,n){e.exports=n(114)},85:function(e,t){}},[[61,1,2]]]);
//# sourceMappingURL=main.501bbb5f.chunk.js.map