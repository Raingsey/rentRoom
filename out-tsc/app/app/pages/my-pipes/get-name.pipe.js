var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var GetNamePipe = (function () {
    function GetNamePipe() {
    }
    GetNamePipe.prototype.transform = function (value, fieldSearch, valueSearch, fieldReturn) {
        if (value && fieldSearch && valueSearch && fieldReturn) {
            return value.find(function (x) { return x[fieldSearch] === valueSearch; })[fieldReturn];
        }
        return '';
    };
    GetNamePipe = __decorate([
        Pipe({
            name: 'getName'
        })
    ], GetNamePipe);
    return GetNamePipe;
}());
export { GetNamePipe };
//# sourceMappingURL=get-name.pipe.js.map