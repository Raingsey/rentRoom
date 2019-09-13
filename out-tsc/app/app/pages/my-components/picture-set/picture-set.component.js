var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
var PictureBlogComponent = (function () {
    function PictureBlogComponent() {
        this.set_title = '';
        this.bg_color = 'rgba(0,0,0,0.04)';
        this.border_color = '0d1120';
        this.showContent = true;
    }
    PictureBlogComponent.prototype.ngOnInit = function () {
    };
    PictureBlogComponent.prototype.toggleContent = function () {
        this.showContent = !this.showContent;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PictureBlogComponent.prototype, "set_title", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PictureBlogComponent.prototype, "bg_color", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PictureBlogComponent.prototype, "border_color", void 0);
    PictureBlogComponent = __decorate([
        Component({
            selector: 'app-picture-blog',
            templateUrl: './picture-set.component.html',
            styleUrls: ['./picture-set.component.scss'],
            animations: [
                trigger('enterAnimation', [
                    transition(':enter', [
                        style({ transform: 'translateY(100%)', opacity: 0 }),
                        animate('500ms', style({ transform: 'translateY(0)', opacity: 1 }))
                    ]),
                    transition(':leave', [
                        style({ transform: 'translateY(0)', opacity: 1 }),
                        animate('500ms', style({ transform: 'translateY(100%)', opacity: 0 }))
                    ])
                ]),
                trigger('slideIn', [
                    state('*', style({ 'overflow-y': 'auto', 'overflow-x': 'hidden' })),
                    state('void', style({ 'overflow-y': 'auto', 'overflow-x': 'hidden' })),
                    transition('* => void', [
                        style({ height: '*' }),
                        animate(250, style({ height: 0 }))
                    ]),
                    transition('void => *', [
                        style({ height: '0' }),
                        animate(250, style({ height: '*' }))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [])
    ], PictureBlogComponent);
    return PictureBlogComponent;
}());
export { PictureBlogComponent };
//# sourceMappingURL=picture-set.component.js.map