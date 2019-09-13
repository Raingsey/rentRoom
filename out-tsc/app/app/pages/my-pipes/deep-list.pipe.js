var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var DeepListPipe = (function () {
    function DeepListPipe() {
    }
    DeepListPipe.prototype.transform = function (value, field) {
        if (field) {
            var arr = field.split('.');
            switch (arr.length) {
                case 1:
                    return value[field];
                case 2:
                    return value[arr[0]][arr[1]];
                case 3:
                    return value[arr[0]][arr[1]][arr[2]];
                default:
                    return '';
            }
        }
        return '';
    };
    DeepListPipe = __decorate([
        Pipe({
            name: 'deepList'
        })
    ], DeepListPipe);
    return DeepListPipe;
}());
export { DeepListPipe };
//# sourceMappingURL=deep-list.pipe.js.map