webpackJsonp([8],{

/***/ "../../../../../src/app/dashboard/dashboard-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_component__ = __webpack_require__("../../../../../src/app/dashboard/dashboard.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__dashboard_component__["a" /* DashboardComponent */],
        data: {
            title: 'Dashboard'
        }
    }
];
var DashboardRoutingModule = (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
        })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());

//# sourceMappingURL=dashboard-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n  <div class=\"card\">\n    <div class=\"card-header\" role=\"tab\" (click)=\"showAccelerationChartData=!showAccelerationChartData\">\n      <h5 class=\"mb-0\">\n        <a>\n          <h4 class=\"card-title mb-0\">Acceleration</h4>\n          <div class=\"small text-muted\">X,Y and Z</div>\n        </a>\n      </h5>\n    </div>\n    <div class=\"card-block\" [hidden]=\"showAccelerationChartData\">\n      <div class=\"chart-wrapper\" style=\"height:300px;margin-top:40px;\">\n        <canvas baseChart class=\"chart\" [datasets]=\"accelerationChartData\" [options]=\"mainChartOptions\" [colors]=\"mainChartColours\"\n          [legend]=\"mainChartLegend\" [chartType]=\"mainChartType\"></canvas>\n      </div>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\" role=\"tab\" (click)=\"showWorldReferenceAccelerationChartData=!showWorldReferenceAccelerationChartData\">\n      <h5 class=\"mb-0\">\n        <a>\n          <h4 class=\"card-title mb-0\">Acceleration in World Reference Frame</h4>\n          <div class=\"small text-muted\">X,Y and Z</div>\n        </a>\n      </h5>\n    </div>\n    <div class=\"card-block\" [hidden]=\"showWorldReferenceAccelerationChartData\">\n      <div class=\"chart-wrapper\" style=\"height:300px;margin-top:40px;\">\n        <canvas baseChart class=\"chart\" [datasets]=\"worldReferenceAccelerationChartData\" [options]=\"mainChartOptions\" [colors]=\"mainChartColours\"\n          [legend]=\"mainChartLegend\" [chartType]=\"mainChartType\"></canvas>\n      </div>\n    </div>\n  </div>\n  <div class=\"card\">\n    <div class=\"card-header\" role=\"tab\" (click)=\"showAngularAccelerationChartData=!showAngularAccelerationChartData\">\n      <h5 class=\"mb-0\">\n        <a>\n          <h4 class=\"card-title mb-0\">Angular Velocity</h4>\n          <div class=\"small text-muted\">Around X,Y and Z</div>\n        </a>\n      </h5>\n    </div>\n    <div class=\"card-block\" [hidden]=\"showAngularAccelerationChartData\">\n      <div class=\"chart-wrapper\" style=\"height:300px;margin-top:40px;\">\n        <canvas baseChart class=\"chart\" [datasets]=\"angularAccelerationChartData\" [options]=\"mainChartOptions\" [colors]=\"mainChartColours\"\n          [legend]=\"mainChartLegend\" [chartType]=\"mainChartType\"></canvas>\n      </div>\n    </div>\n  </div>\n  <!--/.card-->\n  <div class=\"card\">\n    <div class=\"card-header\" role=\"tab\" (click)=\"showWorldReferenceAngularAccelerationChartData=!showWorldReferenceAngularAccelerationChartData\">\n      <h5 class=\"mb-0\">\n        <a>\n          <h4 class=\"card-title mb-0\">Angular Acceleration in World Reference Frame</h4>\n          <div class=\"small text-muted\">Around X,Y and Z</div>\n        </a>\n      </h5>\n    </div>\n    <div class=\"card-block\" [hidden]=\"showWorldReferenceAngularAccelerationChartData\">\n      <div class=\"chart-wrapper\" style=\"height:300px;margin-top:40px;\">\n        <canvas baseChart class=\"chart\" [datasets]=\"worldReferenceAngularAccelerationChartData\" [options]=\"mainChartOptions\" [colors]=\"mainChartColours\"\n          [legend]=\"mainChartLegend\" [chartType]=\"mainChartType\"></canvas>\n      </div>\n    </div>\n  </div>\n  <!--/.card-->\n  <div class=\"card\">\n    <div class=\"card-header\" role=\"tab\" (click)=\"showPositionChartData=!showPositionChartData\">\n      <h5 class=\"mb-0\">\n        <a>\n          <h4 class=\"card-title mb-0\">Height</h4>\n          <div class=\"small text-muted\">in meters</div>\n        </a>\n      </h5>\n    </div>\n    <div class=\"card-block\" [hidden]=\"showPositionChartData\">\n      <div class=\"chart-wrapper\" style=\"height:300px;margin-top:40px;\">\n        <canvas baseChart class=\"chart\" [datasets]=\"positionChartData\" [options]=\"mainChartOptions\" [colors]=\"mainChartColours\" [legend]=\"mainChartLegend\"\n          [chartType]=\"mainChartType\"></canvas>\n      </div>\n    </div>\n  </div>\n  <!--/.card-->\n  <!--<div class=\"card\">\n    <div class=\"card-header\" role=\"tab\" (click)=\"showAccelerationIntegralChartData=!showAccelerationIntegralChartData\">\n      <h5 class=\"mb-0\">\n        <a>\n          <h4 class=\"card-title mb-0\">Acceleration, First Integral (Velocity)</h4>\n          <div class=\"small text-muted\">X,Y and Z</div>\n        </a>\n      </h5>\n    </div>\n    <div class=\"card-block\" [hidden]=\"!showAccelerationIntegralChartData\">\n      <div class=\"chart-wrapper\" style=\"height:300px;margin-top:40px;\">\n        <canvas baseChart class=\"chart\" [datasets]=\"accelerationIntegralChartData\" [options]=\"mainChartOptions\" [colors]=\"mainChartColours\"\n          [legend]=\"mainChartLegend\" [chartType]=\"mainChartType\"></canvas>\n      </div>\n    </div>\n  </div>-->\n  <!--/.card-->\n</div>"

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_fileparser__ = __webpack_require__("../../../../../src/app/shared/fileparser.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_data__ = __webpack_require__("../../../../../src/app/shared/data.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_shared_controls_component__ = __webpack_require__("../../../../../src/app/shared/controls.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DashboardComponent = (function () {
    function DashboardComponent() {
        this.showWorldReferenceAngularAccelerationChartData = false;
        this.showAccelerationChartData = false;
        this.showWorldReferenceAccelerationChartData = false;
        this.showAngularAccelerationChartData = false;
        this.showPositionChartData = false;
        this.showAccelerationIntegralChartData = true;
        this.brandPrimary = '#20a8d8';
        this.brandSuccess = '#4dbd74';
        this.brandInfo = '#63c2de';
        this.brandWarning = '#f8cb00';
        this.brandDanger = '#f86c6b';
        // dropdown buttons
        this.status = { isopen: false };
        this.worldReferenceAccelerationChartData = this.create3DDataArray();
        this.accelerationChartData = this.create3DDataArray();
        this.accelerationIntegralChartData = this.create3DDataArray();
        this.angularAccelerationChartData = this.create3DDataArray();
        this.worldReferenceAngularAccelerationChartData = this.create3DDataArray();
        this.positionChartData = this.create1DDataArray();
        this.quaternionChartData = this.create4DDataArray();
        this.mainChartOptions = {
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: {
                    borderWidth: 2
                },
                point: {
                    radius: 0.2,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                }
            }
        };
        this.mainChartColours = [
            {
                backgroundColor: this.brandInfo,
                borderColor: this.brandInfo,
                pointHoverBackgroundColor: '#fff'
            },
            {
                backgroundColor: this.brandSuccess,
                borderColor: this.brandSuccess,
                pointHoverBackgroundColor: '#fff'
            },
            {
                backgroundColor: this.brandDanger,
                borderColor: this.brandDanger,
                pointHoverBackgroundColor: '#fff'
            }
        ];
        // { // grey
        //   backgroundColor: 'rgba(148,159,177,0.2)',
        //   borderColor: 'rgba(148,159,177,1)',
        //   pointBackgroundColor: 'rgba(148,159,177,1)',
        //   pointBorderColor: '#fff',
        //   pointHoverBackgroundColor: '#fff',
        //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        // },
        this.mainChartLegend = true;
        this.mainChartType = 'scatter';
    }
    DashboardComponent.prototype.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    };
    // convert Hex to RGBA
    DashboardComponent.prototype.convertHex = function (hex, opacity) {
        hex = hex.replace('#', '');
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        var rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
        return rgba;
    };
    DashboardComponent.prototype.refreshDataOnScreen = function () {
        if (this.data.boardReference.newIMUData) {
            this.accelerationChartData[0].data = this.data.boardReference.ax;
            this.accelerationChartData[1].data = this.data.boardReference.ay;
            this.accelerationChartData[2].data = this.data.boardReference.az;
            this.angularAccelerationChartData[0].data = this.data.boardReference.rx;
            this.angularAccelerationChartData[1].data = this.data.boardReference.ry;
            this.angularAccelerationChartData[2].data = this.data.boardReference.rz;
            this.accelerationChartData = this.accelerationChartData.slice();
            this.angularAccelerationChartData = this.angularAccelerationChartData.slice();
        }
        if (this.data.boardReference.newPositionData) {
            this.positionChartData[0].data = this.data.boardReference.z;
            this.positionChartData = this.positionChartData.slice();
        }
        if (this.data.worldReference.newIMUData) {
            this.worldReferenceAccelerationChartData[0].data = this.data.worldReference.ax;
            this.worldReferenceAccelerationChartData[1].data = this.data.worldReference.ay;
            this.worldReferenceAccelerationChartData[2].data = this.data.worldReference.az;
            this.worldReferenceAngularAccelerationChartData[0].data = this.data.worldReference.rx;
            this.worldReferenceAngularAccelerationChartData[1].data = this.data.worldReference.ry;
            this.worldReferenceAngularAccelerationChartData[2].data = this.data.worldReference.rz;
            this.worldReferenceAccelerationChartData = this.worldReferenceAccelerationChartData.slice();
            this.worldReferenceAngularAccelerationChartData = this.worldReferenceAngularAccelerationChartData.slice();
        }
        //TODO - Slice is a hack that forces data re-rendering. However this can be extremely slow.
        //For now, we'll use it but we need to find a better way for chart.js to 
        //only render the changes rather than a full re-render. Look at the following for ideas
        //https://github.com/valor-software/ng2-charts/issues/291
        //This appears to be the fix:
        //https://github.com/valor-software/ng2-charts/pull/563
    };
    DashboardComponent.prototype.asynchronousReadFile = function (inputField) {
        var _this = this;
        var fileName = inputField.files[0];
        if (!fileName) {
            alert("No file selected");
            return;
        }
        this.worldReferenceAccelerationChartData = this.create3DDataArray();
        this.accelerationChartData = this.create3DDataArray();
        this.accelerationIntegralChartData = this.create3DDataArray();
        this.angularAccelerationChartData = this.create3DDataArray();
        this.worldReferenceAngularAccelerationChartData = this.create3DDataArray();
        this.positionChartData = this.create1DDataArray();
        this.quaternionChartData = this.create4DDataArray();
        __WEBPACK_IMPORTED_MODULE_3_app_shared_controls_component__["a" /* ControlsComponent */].Instance.setData(new __WEBPACK_IMPORTED_MODULE_2__shared_data__["a" /* CalculatedData */]());
        this.data = __WEBPACK_IMPORTED_MODULE_3_app_shared_controls_component__["a" /* ControlsComponent */].Instance.getData();
        var reader = new FileReader();
        reader.onload = function (file) {
            var contents = file.target;
            var fileText = contents.result;
            console.log("Loaded file");
            var fp = new __WEBPACK_IMPORTED_MODULE_1__shared_fileparser__["a" /* FileParser */]();
            var callback = function (l) {
                _this.data.loadData(l);
                __WEBPACK_IMPORTED_MODULE_3_app_shared_controls_component__["a" /* ControlsComponent */].Instance.dataChanged();
            };
            var stringLoader = __WEBPACK_IMPORTED_MODULE_1__shared_fileparser__["a" /* FileParser */].parseLines(callback);
            fileText.split('\n').forEach(function (line) {
                stringLoader(line + '\n');
            });
            // var fileArray:string[] = fileText.split('\n');
            // this.runSlowly((l)=>stringLoader(l+'\n'),fileArray,0);
            console.log('Finished loading file');
        };
        reader.readAsText(fileName);
    };
    DashboardComponent.prototype.runSlowly = function (callback, filearray, line) {
        callback(filearray[line]);
        var ref = this;
        if (line < filearray.length - 1) {
            setTimeout(function () { return ref.runSlowly(callback, filearray, line + 1); }, 10);
        }
    };
    DashboardComponent.prototype.triggerFile = function (fileInput) {
        this.asynchronousReadFile(fileInput);
    };
    DashboardComponent.prototype.create1DDataArray = function () {
        return [
            {
                data: [],
                label: 'Z'
            }
        ];
    };
    DashboardComponent.prototype.create3DDataArray = function () {
        return [
            {
                data: [],
                label: 'X'
            },
            {
                data: [],
                label: 'Y'
            },
            {
                data: [],
                label: 'Z'
            }
        ];
    };
    DashboardComponent.prototype.create4DDataArray = function () {
        return [
            {
                data: [],
                label: 'Q0'
            },
            {
                data: [],
                label: 'Q1'
            },
            {
                data: [],
                label: 'Q2'
            },
            {
                data: [],
                label: 'Q3'
            }
        ];
    };
    DashboardComponent.prototype.ngOnInit = function () {
        __WEBPACK_IMPORTED_MODULE_3_app_shared_controls_component__["a" /* ControlsComponent */].Instance.registerDataListener(this);
        this.data = __WEBPACK_IMPORTED_MODULE_3_app_shared_controls_component__["a" /* ControlsComponent */].Instance.getData();
        if (this.data && this.data.boardReference) {
            this.data.boardReference.newIMUData = true;
            this.data.boardReference.newPositionData = true;
            this.data.boardReference.newQuaternionData = true;
            this.data.worldReference.newIMUData = true;
            this.DataUpdated(this.data);
        }
    };
    DashboardComponent.prototype.DataUpdated = function (data) {
        this.data = __WEBPACK_IMPORTED_MODULE_3_app_shared_controls_component__["a" /* ControlsComponent */].Instance.getData();
        this.refreshDataOnScreen();
    };
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/dashboard/dashboard.component.html")
        })
    ], DashboardComponent);
    return DashboardComponent;
}());

//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__ = __webpack_require__("../../../../ng2-charts/ng2-charts.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_dropdown__ = __webpack_require__("../../../../ngx-bootstrap/dropdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_component__ = __webpack_require__("../../../../../src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dashboard_routing_module__ = __webpack_require__("../../../../../src/app/dashboard/dashboard-routing.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__dashboard_routing_module__["a" /* DashboardRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_dropdown__["a" /* BsDropdownModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__dashboard_component__["a" /* DashboardComponent */]]
        })
    ], DashboardModule);
    return DashboardModule;
}());

//# sourceMappingURL=dashboard.module.js.map

/***/ })

});
//# sourceMappingURL=8.chunk.js.map