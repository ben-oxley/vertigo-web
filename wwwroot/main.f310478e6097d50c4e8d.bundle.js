webpackJsonp([12],{0:function(e,t,n){e.exports=n("cDNt")},"345u":function(e,t,n){"use strict";var a=n("/oeL");n.d(t,"a",function(){return c});var o=this&&this.__decorate||function(e,t,n,a){var o,r=arguments.length,i=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,a);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(i=(r<3?o(i):r>3?o(t,n,i):o(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i},r=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},i=function(){function e(e){this.el=e}return e.prototype.toggle=function(){this.el.nativeElement.classList.toggle("open")},e=o([n.i(a.Directive)({selector:"[appNavDropdown]"}),r("design:paramtypes",["function"==typeof(t=void 0!==a.ElementRef&&a.ElementRef)&&t||Object])],e);var t}(),s=function(){function e(e){this.dropdown=e}return e.prototype.toggleOpen=function(e){e.preventDefault(),this.dropdown.toggle()},o([n.i(a.HostListener)("click",["$event"]),r("design:type",Function),r("design:paramtypes",[Object]),r("design:returntype",void 0)],e.prototype,"toggleOpen",null),e=o([n.i(a.Directive)({selector:"[appNavDropdownToggle]"}),r("design:paramtypes",[i])],e)}(),c=[i,s]},"7mm+":function(e,t,n){"use strict";var a=n("/oeL");n.d(t,"a",function(){return d});var o=this&&this.__decorate||function(e,t,n,a){var o,r=arguments.length,i=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,a);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(i=(r<3?o(i):r>3?o(t,n,i):o(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i},r=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},i=function(){function e(){}return e.prototype.toggleOpen=function(e){e.preventDefault(),document.querySelector("body").classList.toggle("sidebar-hidden")},o([n.i(a.HostListener)("click",["$event"]),r("design:type",Function),r("design:paramtypes",[Object]),r("design:returntype",void 0)],e.prototype,"toggleOpen",null),e=o([n.i(a.Directive)({selector:"[appSidebarToggler]"}),r("design:paramtypes",[])],e)}(),s=function(){function e(){}return e.prototype.toggleOpen=function(e){e.preventDefault(),document.querySelector("body").classList.toggle("sidebar-minimized")},o([n.i(a.HostListener)("click",["$event"]),r("design:type",Function),r("design:paramtypes",[Object]),r("design:returntype",void 0)],e.prototype,"toggleOpen",null),e=o([n.i(a.Directive)({selector:"[appSidebarMinimizer]"}),r("design:paramtypes",[])],e)}(),c=function(){function e(){}return e.prototype.hasClass=function(e,t){return new RegExp("(\\s|^)"+t+"(\\s|$)").test(e.className)},e.prototype.toggleOpen=function(e){e.preventDefault(),document.querySelector("body").classList.toggle("sidebar-mobile-show")},o([n.i(a.HostListener)("click",["$event"]),r("design:type",Function),r("design:paramtypes",[Object]),r("design:returntype",void 0)],e.prototype,"toggleOpen",null),e=o([n.i(a.Directive)({selector:"[appMobileSidebarToggler]"}),r("design:paramtypes",[])],e)}(),l=function(){function e(){}return e.prototype.hasClass=function(e,t){return new RegExp("(\\s|^)"+t+"(\\s|$)").test(e.className)},e.prototype.toggleClass=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(this.hasClass(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}else e.className+=" "+t},e.prototype.toggleOpen=function(e){e.preventDefault(),this.hasClass(document.querySelector("body"),"sidebar-off-canvas")&&this.toggleClass(document.querySelector("body"),"sidebar-opened")},o([n.i(a.HostListener)("click",["$event"]),r("design:type",Function),r("design:paramtypes",[Object]),r("design:returntype",void 0)],e.prototype,"toggleOpen",null),e=o([n.i(a.Directive)({selector:"[appSidebarClose]"}),r("design:paramtypes",[])],e)}(),d=[i,s,l,c]},"8Sw2":function(e,t,n){function a(e){return n(o(e))}function o(e){var t=r[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var r={"./af":"FQor","./af.js":"FQor","./ar":"EcI0","./ar-dz":"cw72","./ar-dz.js":"cw72","./ar-kw":"fu+8","./ar-kw.js":"fu+8","./ar-ly":"7CVz","./ar-ly.js":"7CVz","./ar-ma":"1dFW","./ar-ma.js":"1dFW","./ar-sa":"UxV2","./ar-sa.js":"UxV2","./ar-tn":"nm31","./ar-tn.js":"nm31","./ar.js":"EcI0","./az":"EbpX","./az.js":"EbpX","./be":"SQlX","./be.js":"SQlX","./bg":"R3V+","./bg.js":"R3V+","./bn":"cAX3","./bn.js":"cAX3","./bo":"dHgA","./bo.js":"dHgA","./br":"W7ww","./br.js":"W7ww","./bs":"lZ6K","./bs.js":"lZ6K","./ca":"udbC","./ca.js":"udbC","./cs":"oSQb","./cs.js":"oSQb","./cv":"yPEm","./cv.js":"yPEm","./cy":"PpYB","./cy.js":"PpYB","./da":"oiZG","./da.js":"oiZG","./de":"LYe6","./de-at":"KOG5","./de-at.js":"KOG5","./de-ch":"o3JY","./de-ch.js":"o3JY","./de.js":"LYe6","./dv":"OkYT","./dv.js":"OkYT","./el":"QFnp","./el.js":"QFnp","./en-au":"dBGl","./en-au.js":"dBGl","./en-ca":"vv0C","./en-ca.js":"vv0C","./en-gb":"IoCy","./en-gb.js":"IoCy","./en-ie":"qVAg","./en-ie.js":"qVAg","./en-nz":"FbT0","./en-nz.js":"FbT0","./eo":"y/6j","./eo.js":"y/6j","./es":"ivpd","./es-do":"DBbP","./es-do.js":"DBbP","./es.js":"ivpd","./et":"FrUj","./et.js":"FrUj","./eu":"LAVD","./eu.js":"LAVD","./fa":"J2cK","./fa.js":"J2cK","./fi":"5FCP","./fi.js":"5FCP","./fo":"jIZb","./fo.js":"jIZb","./fr":"Lq8I","./fr-ca":"ICRA","./fr-ca.js":"ICRA","./fr-ch":"QWmo","./fr-ch.js":"QWmo","./fr.js":"Lq8I","./fy":"Fbnp","./fy.js":"Fbnp","./gd":"zhFu","./gd.js":"zhFu","./gl":"o10m","./gl.js":"o10m","./gom-latn":"UoXv","./gom-latn.js":"UoXv","./he":"gbvS","./he.js":"gbvS","./hi":"+UQz","./hi.js":"+UQz","./hr":"qGYH","./hr.js":"qGYH","./hu":"hGGh","./hu.js":"hGGh","./hy-am":"1AR5","./hy-am.js":"1AR5","./id":"Ie9h","./id.js":"Ie9h","./is":"piS+","./is.js":"piS+","./it":"5P9/","./it.js":"5P9/","./ja":"3cRe","./ja.js":"3cRe","./jv":"vwCJ","./jv.js":"vwCJ","./ka":"R7aq","./ka.js":"R7aq","./kk":"d8hV","./kk.js":"d8hV","./km":"nCdc","./km.js":"nCdc","./kn":"5K8n","./kn.js":"5K8n","./ko":"1jN3","./ko.js":"1jN3","./ky":"74/W","./ky.js":"74/W","./lb":"XAyT","./lb.js":"XAyT","./lo":"w/Mz","./lo.js":"w/Mz","./lt":"IetG","./lt.js":"IetG","./lv":"CRPd","./lv.js":"CRPd","./me":"1mee","./me.js":"1mee","./mi":"yRr3","./mi.js":"yRr3","./mk":"bfn1","./mk.js":"bfn1","./ml":"r1ky","./ml.js":"r1ky","./mr":"+K6p","./mr.js":"+K6p","./ms":"asMk","./ms-my":"IcWU","./ms-my.js":"IcWU","./ms.js":"asMk","./my":"Isng","./my.js":"Isng","./nb":"FjNp","./nb.js":"FjNp","./ne":"P9zQ","./ne.js":"P9zQ","./nl":"pejQ","./nl-be":"c3/i","./nl-be.js":"c3/i","./nl.js":"pejQ","./nn":"ALD8","./nn.js":"ALD8","./pa-in":"1YTd","./pa-in.js":"1YTd","./pl":"Gs99","./pl.js":"Gs99","./pt":"eunO","./pt-br":"uHKL","./pt-br.js":"uHKL","./pt.js":"eunO","./ro":"1FZw","./ro.js":"1FZw","./ru":"Cy48","./ru.js":"Cy48","./sd":"+28k","./sd.js":"+28k","./se":"EiHj","./se.js":"EiHj","./si":"77bI","./si.js":"77bI","./sk":"BgyH","./sk.js":"BgyH","./sl":"K7sG","./sl.js":"K7sG","./sq":"pwQJ","./sq.js":"pwQJ","./sr":"N0T2","./sr-cyrl":"9OoP","./sr-cyrl.js":"9OoP","./sr.js":"N0T2","./ss":"Mh9L","./ss.js":"Mh9L","./sv":"YZAt","./sv.js":"YZAt","./sw":"/7jV","./sw.js":"/7jV","./ta":"VKBt","./ta.js":"VKBt","./te":"TIcV","./te.js":"TIcV","./tet":"BlC1","./tet.js":"BlC1","./th":"Zi3L","./th.js":"Zi3L","./tl-ph":"D4Y9","./tl-ph.js":"D4Y9","./tlh":"muBP","./tlh.js":"muBP","./tr":"82s3","./tr.js":"82s3","./tzl":"vjXv","./tzl.js":"vjXv","./tzm":"Vhfe","./tzm-latn":"m0Pg","./tzm-latn.js":"m0Pg","./tzm.js":"Vhfe","./uk":"Y3Ex","./uk.js":"Y3Ex","./ur":"4DIg","./ur.js":"4DIg","./uz":"wDue","./uz-latn":"Li28","./uz-latn.js":"Li28","./uz.js":"wDue","./vi":"UbP6","./vi.js":"UbP6","./x-pseudo":"fQLM","./x-pseudo.js":"fQLM","./yo":"evMD","./yo.js":"evMD","./zh-cn":"DV5H","./zh-cn.js":"DV5H","./zh-hk":"iEKH","./zh-hk.js":"iEKH","./zh-tw":"X9uL","./zh-tw.js":"X9uL"};a.keys=function(){return Object.keys(r)},a.resolve=o,e.exports=a,a.id="8Sw2"},L4sf:function(e,t,n){"use strict";var a=n("/oeL");n.d(t,"a",function(){return r});var o=this&&this.__decorate||function(e,t,n,a){var o,r=arguments.length,i=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,a);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(i=(r<3?o(i):r>3?o(t,n,i):o(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i},r=function(){function e(){this.disabled=!1,this.status={isopen:!1}}return e.prototype.toggled=function(e){console.log("Dropdown is now: ",e)},e.prototype.toggleDropdown=function(e){e.preventDefault(),e.stopPropagation(),this.status.isopen=!this.status.isopen},e.prototype.ngOnInit=function(){},e=o([n.i(a.Component)({selector:"app-dashboard",template:n("xfcI")})],e)}()},"aR8+":function(e,t,n){"use strict";var a=n("fc+i"),o=n("/oeL"),r=n("qbdv"),i=n("wQAS"),s=n("ZBFC"),c=n("lTiK"),l=n("345u"),d=n("5vUY"),u=(n.n(d),n("7mm+")),p=n("z4Ee"),f=n("lB00"),h=n("diGR"),b=n("jHMo"),g=n("L4sf"),v=n("zXYl");n.d(t,"a",function(){return y});var m=this&&this.__decorate||function(e,t,n,a){var o,r=arguments.length,i=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,a);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(i=(r<3?o(i):r>3?o(t,n,i):o(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i},y=function(){function e(){}return e=m([n.i(o.NgModule)({imports:[a.a,b.a,s.a.forRoot(),c.a.forRoot(),d.ChartsModule],declarations:[i.a,g.a,v.a,l.a,f.a,h.a,u.a,p.a],providers:[{provide:r.a,useClass:r.b}],bootstrap:[i.a]})],e)}()},cDNt:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("/oeL"),o=n("Qa4U"),r=n("aR8+");n("p5Ee").a.production&&n.i(a.enableProdMode)(),n.i(o.a)().bootstrapModule(r.a)},diGR:function(e,t,n){"use strict";var a=n("/oeL"),o=n("UhLR"),r=(n.n(o),n("83H0")),i=(n.n(r),n("qe2C"));n.n(i);n.d(t,"a",function(){return l});var s=this&&this.__decorate||function(e,t,n,a){var o,r=arguments.length,i=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,a);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(i=(r<3?o(i):r>3?o(t,n,i):o(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i},c=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},l=function(){var e=t=function(){if(this.dataListeners=[],this.dataPointListeners=[],this.index=0,this.accelerationChartData=this.create3DDataArray(),this.sliderMin=0,this.sliderMax=0,this.originalLineDraw=r.Chart.controllers.line.prototype.draw,this.mainChartOptions={animation:!1,responsive:!0,maintainAspectRatio:!1,elements:{line:{borderWidth:2},point:{radius:.2,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}},scales:{xAxes:[{display:!0,id:"x-axis-1"}],yAxes:[{display:!1,id:"y-axis-1"}]},tooltips:{enabled:!1},annotation:{annotations:[{drawTime:"afterDraw",id:"vline",type:"line",mode:"vertical",scaleID:"x-axis-1",value:0,borderColor:"black",borderWidth:1}]}},this.brandPrimary="#20a8d8",this.brandSuccess="#4dbd74",this.brandInfo="#63c2de",this.brandWarning="#f8cb00",this.brandDanger="#f86c6b",this.mainChartColours=[{backgroundColor:"transparent",borderColor:this.brandInfo,pointHoverBackgroundColor:"#fff"},{backgroundColor:"transparent",borderColor:this.brandSuccess,pointHoverBackgroundColor:"#fff"},{backgroundColor:"transparent",borderColor:this.brandDanger,pointHoverBackgroundColor:"#fff"}],this.mainChartLegend=!1,this.mainChartType="scatter",this.registerDataListener(this),this.registerDataPointListener(this),void 0!=t.Instance)throw new Error("Cannot have two instances of the ControlsComponent class.");t.Instance=this};return e.prototype.ngOnInit=function(){this.registerDataListener(this),this.registerDataPointListener(this),this.data=t.Instance.getData(),this.DataUpdated(this.data)},e.prototype.drawLine=function(e){var t=this.chart,n=this.chartLayer.nativeElement;n.width=n.clientWidth;var a=n.getContext("2d");if(e){var o=t.chart.scales["x-axis-1"],r=t.chart.scales["y-axis-1"];a.clearRect(0,0,1e4,1e4),a.save(),a.beginPath(),a.moveTo(o.getPixelForValue(e),r.top),a.strokeStyle="#ff0000",a.lineTo(o.getPixelForValue(e),r.bottom),a.stroke(),a.restore()}},e.prototype.DataPointUpdated=function(e){this.data=t.Instance.getData(),this.drawLine(this.data.boardReference.az[e].x)},e.prototype.DataUpdated=function(e){this.data=t.Instance.getData(),void 0!==this.data&&(this.accelerationChartData[0].data=this.data.boardReference.ax,this.accelerationChartData[1].data=this.data.boardReference.ay,this.accelerationChartData[2].data=this.data.boardReference.az,this.accelerationChartData=this.accelerationChartData.slice(),this.sliderMax=this.data.boardReference.ax.length-1)},e.prototype.chartClicked=function(e){if(e.active.length>0){var t=e.active[0]._index;console.log("Point: "+t),this.index=e.active[0]._index,this.DataPointUpdated(this.index)}},e.prototype.getData=function(){return this.data},e.prototype.setData=function(e){this.data=e,this.dataChanged()},e.prototype.registerDataListener=function(e){this.dataListeners.push(e)},e.prototype.registerDataPointListener=function(e){this.dataPointListeners.push(e)},e.prototype.setIndex=function(e){this.index=e,this.dataPointChanged()},e.prototype.dataChanged=function(){var e=this;this.dataListeners.forEach(function(t){return t.DataUpdated(e.data)})},e.prototype.dataPointChanged=function(){var e=this;this.dataPointListeners.forEach(function(t){return t.DataPointUpdated(e.index)})},e.prototype.create3DDataArray=function(){return[{data:[],label:"X"},{data:[],label:"Y"},{data:[],label:"Z"}]},s([n.i(a.ViewChild)(o.BaseChartDirective),c("design:type","function"==typeof(i=void 0!==o.BaseChartDirective&&o.BaseChartDirective)&&i||Object)],e.prototype,"chart",void 0),s([n.i(a.ViewChild)("chartLayer"),c("design:type",Object)],e.prototype,"chartLayer",void 0),e=t=s([n.i(a.Component)({selector:"app-controls",template:'\n  <div style="height:100px; position: relative;">\n    <canvas baseChart style="position: absolute; left: 0; top: 0; z-index: 0;" class="chart" [datasets]="accelerationChartData" [options]="mainChartOptions" [colors]="mainChartColours" [legend]="mainChartLegend" [chartType]="mainChartType" (chartClick)="chartClicked($event)"></canvas>\n    <canvas #chartLayer height = 100px style="height:100px; width:100%; position: absolute; left: 0; top: 0; z-index: 1;"></canvas>\n  </div>\n  \n  <div class="row" style="padding:10px">\n    <div class="col-sm-12 col-lg-12">\n      <input type="range" (input)="setIndex($event.target.value)"  [min]="sliderMin" [max]="sliderMax" class="slider" id="myRange">\n    </div>\n  </div>\n',styles:["\n/* The slider itself */\n.slider {\n  width: 100%; /* Full-width */\n  height: 30px; /* Specified height */\n  background: #d3d3d3; /* Grey background */\n  outline: none; /* Remove outline */\n  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */\n  -webkit-transition: .2s; /* 0.2 seconds transition on hover */\n  transition: opacity .2s;\n}\n\n.btn {\n  -webkit-appearance: none;  /* Override default CSS styles */\n  appearance: none;\n  height: 30px; /* Specified height */\n  background: #d3d3d3; /* Grey background */\n  outline: none; /* Remove outline */\n  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */\n  -webkit-transition: .2s; /* 0.2 seconds transition on hover */\n  transition: opacity .2s;\n}\n\n/* Mouse-over effects */\n.slider:hover {\n  opacity: 1; /* Fully shown on mouse-over */\n}\n"]}),c("design:paramtypes",[])],e);var t,i}()},jHMo:function(e,t,n){"use strict";var a=n("/oeL"),o=n("BkNc"),r=n("L4sf"),i=n("zXYl");n.d(t,"a",function(){return l});var s=this&&this.__decorate||function(e,t,n,a){var o,r=arguments.length,i=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,a);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(i=(r<3?o(i):r>3?o(t,n,i):o(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i},c=[{path:"",redirectTo:"loader",pathMatch:"full"},{path:"",component:r.a,data:{title:"Home"},children:[{path:"dashboard",loadChildren:"./dashboard/dashboard.module#DashboardModule"},{path:"loader",loadChildren:"./loader/loader.module#LoaderModule"},{path:"map",loadChildren:"./map/map.module#MapModule"},{path:"3d",loadChildren:"./threed/threed.module#ThreeDModule"},{path:"bluetooth",loadChildren:"./bluetooth/bluetooth.module#BluetoothModule"},{path:"components",loadChildren:"./components/components.module#ComponentsModule"},{path:"icons",loadChildren:"./icons/icons.module#IconsModule"},{path:"widgets",loadChildren:"./widgets/widgets.module#WidgetsModule"},{path:"charts",loadChildren:"./chartjs/chartjs.module#ChartJSModule"}]},{path:"pages",component:i.a,data:{title:"Pages"},children:[{path:"",loadChildren:"./pages/pages.module#PagesModule"}]}],l=function(){function e(){}return e=s([n.i(a.NgModule)({imports:[o.a.forRoot(c)],exports:[o.a]})],e)}()},lB00:function(e,t,n){"use strict";var a=n("/oeL"),o=n("BkNc"),r=n("gbhw");n.n(r);n.d(t,"a",function(){return c});var i=this&&this.__decorate||function(e,t,n,a){var o,r=arguments.length,i=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,a);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(i=(r<3?o(i):r>3?o(t,n,i):o(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i},s=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},c=function(){function e(e,t){var n=this;this.router=e,this.route=t,this.router.events.filter(function(e){return e instanceof o.b}).subscribe(function(e){n.breadcrumbs=[];var t=n.route.root,a="";do{var o=t.children;t=null,o.forEach(function(e){if("primary"===e.outlet){var o=e.snapshot;a+="/"+o.url.map(function(e){return e.path}).join("/"),n.breadcrumbs.push({label:e.snapshot.data,url:a}),t=e}})}while(t)})}return e=i([n.i(a.Component)({selector:"app-breadcrumbs",template:'\n  <ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs" let-last = last>\n    <li class="breadcrumb-item"\n        *ngIf="breadcrumb.label.title&&breadcrumb.url.substring(breadcrumb.url.length-1) == \'/\'||breadcrumb.label.title&&last"\n        [ngClass]="{active: last}">\n      <a *ngIf="!last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</a>\n      <span *ngIf="last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</span>\n    </li>\n  </ng-template>'}),s("design:paramtypes",["function"==typeof(t=void 0!==o.c&&o.c)&&t||Object,"function"==typeof(r=void 0!==o.d&&o.d)&&r||Object])],e);var t,r}()},n7du:function(e,t,n){function a(e){var t=o[e];return t?Promise.all(t.slice(1).map(n.e)).then(function(){return n(t[0])}):Promise.reject(new Error("Cannot find module '"+e+"'."))}var o={"./bluetooth/bluetooth.module":["ywHH",0,10],"./chartjs/chartjs.module":["PttT",9],"./components/components.module":["n68r",2],"./dashboard/dashboard.module":["0IaF",0,8],"./icons/icons.module":["FDAj",5],"./loader/loader.module":["wICi",0,6],"./map/map.module":["aHcY",1],"./pages/pages.module":["ejh0",3],"./threed/threed.module":["6Kng",4],"./widgets/widgets.module":["5Gbs",7]};a.keys=function(){return Object.keys(o)},e.exports=a,a.id="n7du"},p5Ee:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a={production:!1}},wQAS:function(e,t,n){"use strict";var a=n("/oeL");n.d(t,"a",function(){return r});var o=this&&this.__decorate||function(e,t,n,a){var o,r=arguments.length,i=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,a);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(i=(r<3?o(i):r>3?o(t,n,i):o(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i},r=function(){function e(){}return e=o([n.i(a.Component)({selector:"body",template:"<router-outlet></router-outlet>"})],e)}()},xfcI:function(e,t){e.exports='<header class="app-header navbar">\n  <button class="navbar-toggler d-lg-none" type="button" appMobileSidebarToggler>&#9776;</button>\n  <a class="navbar-brand" href="#"></a>\n  <ul class="nav navbar-nav d-md-down-none">\n    <li class="nav-item">\n      <a class="nav-link navbar-toggler" href="#" appSidebarToggler>&#9776;</a>\n    </li>\n    <li class="nav-item px-3">\n      <a class="nav-link" href="#">Dashboard</a>\n    </li>\n  </ul>\n</header>\n\n<div class="app-body">\n  <div class="sidebar">\n    <nav class="sidebar-nav">\n      <ul class="nav">\n        <li class="nav-item">\n          <a class="nav-link" routerLinkActive="active" [routerLink]="[\'/loader\']"><i class="icon-cloud-upload"></i> Load File </a>\n        </li>\n        <li class="nav-item">\n          <a class="nav-link" routerLinkActive="active" [routerLink]="[\'/dashboard\']"><i class="icon-graph"></i> Graphs </a>\n        </li>\n        <li class="nav-item">\n          <a class="nav-link" routerLinkActive="active" [routerLink]="[\'/map\']"><i class="icon-map"></i> Map</a>\n        </li>\n        <li class="nav-item">\n          <a class="nav-link" routerLinkActive="active" [routerLink]="[\'/3d\']"><i class="icon-globe"></i> 3D</a>\n        </li>\n       \x3c!-- <li class="nav-item">\n          <a class="nav-link" routerLinkActive="active" [routerLink]="[\'/bluetooth\']"><i class="fa fa-bluetooth" aria-hidden="true"> </i> Bluetooth</a>\n        </li>--\x3e\n      </ul>\n    </nav>\n  </div>\n\n  \x3c!-- Main content --\x3e\n  <main class="main">\n\n    \x3c!-- Breadcrumb --\x3e\n    <ol class="breadcrumb">\n      <app-breadcrumbs></app-breadcrumbs>\n      \n      \x3c!-- Breadcrumb Menu--\x3e\n      <li class="breadcrumb-menu d-md-down-none">\n      </li>\n      <li><app-controls></app-controls></li>\n\n    </ol>\n\n\n    <div class="container-fluid">\n      <router-outlet></router-outlet>\n    </div>\x3c!-- /.conainer-fluid --\x3e\n  </main>\n\n \n</div>\n\n<footer class="app-footer">\n  <span class="float-right">Powered by <a href="http://coreui.io">CoreUI</a></span>\n</footer>\n'},z4Ee:function(e,t,n){"use strict";var a=n("/oeL");n.d(t,"a",function(){return i});var o=this&&this.__decorate||function(e,t,n,a){var o,r=arguments.length,i=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,a);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(i=(r<3?o(i):r>3?o(t,n,i):o(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i},r=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},i=function(){function e(){}return e.prototype.toggleOpen=function(e){e.preventDefault(),document.querySelector("body").classList.toggle("aside-menu-hidden")},o([n.i(a.HostListener)("click",["$event"]),r("design:type",Function),r("design:paramtypes",[Object]),r("design:returntype",void 0)],e.prototype,"toggleOpen",null),e=o([n.i(a.Directive)({selector:"[appAsideMenuToggler]"}),r("design:paramtypes",[])],e)}()},zXYl:function(e,t,n){"use strict";var a=n("/oeL");n.d(t,"a",function(){return i});var o=this&&this.__decorate||function(e,t,n,a){var o,r=arguments.length,i=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,a);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(i=(r<3?o(i):r>3?o(t,n,i):o(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i},r=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},i=function(){function e(){}return e.prototype.ngOnInit=function(){},e=o([n.i(a.Component)({selector:"app-dashboard",template:"<router-outlet></router-outlet>"}),r("design:paramtypes",[])],e)}()}},[0]);