var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';
var DynamicPipe = (function (_super) {
    __extends(DynamicPipe, _super);
    function DynamicPipe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DynamicPipe.prototype.transform = function (value, modifier) {
        console.log(modifier);
        if (!modifier) {
            return value;
        }
        // Evaluate pipe string
        return eval('this.' + modifier + '(\'' + value + '\')');
    };
    // Returns 'enabled' or 'disabled' based on input value
    DynamicPipe.prototype.statusFromBoolean = function (value) {
        switch (value) {
            case 'true':
            case '1':
                return 'enabled';
            default:
                return 'disabled';
        }
    };
    DynamicPipe.prototype.date = function (value) {
        return _super.prototype.transform.call(this, value, 'dd-MMM-yyyy');
    };
    DynamicPipe = __decorate([
        Pipe({
            name: 'dynamic'
        })
    ], DynamicPipe);
    return DynamicPipe;
}(DatePipe));
export { DynamicPipe };
//# sourceMappingURL=dynamic.pipe.js.map