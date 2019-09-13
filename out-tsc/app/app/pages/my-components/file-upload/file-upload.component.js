var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
var FileUploadComponent = (function () {
    function FileUploadComponent() {
        this.files = [];
        this.urls = [];
        this.btnUploadClass = 'hide';
        this.setTitle = '';
        this.onUpload = new EventEmitter();
    }
    FileUploadComponent.prototype.getFile = function (event) {
        var _this = this;
        if (event.target.files.length > 0) {
            var _loop_1 = function (i) {
                var reader = new FileReader();
                this_1.files.push(event.target.files[i]);
                reader.onload = function (events) {
                    var file = {
                        name: event.target.files[i].name,
                        size: event.target.files[i].size,
                        content: events.target.result
                    };
                    _this.urls.push(file);
                    // events.target.result
                };
                reader.readAsDataURL(event.target.files[i]);
            };
            var this_1 = this;
            for (var i = 0; i < event.target.files.length; i++) {
                _loop_1(i);
            }
        }
    };
    FileUploadComponent.prototype.removeImage = function (index) {
        this.files.splice(index, 1);
        this.urls.splice(index, 1);
    };
    FileUploadComponent.prototype.uploadFile = function () {
        this.onUpload.emit(this.files);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileUploadComponent.prototype, "btnUploadClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileUploadComponent.prototype, "setTitle", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FileUploadComponent.prototype, "onUpload", void 0);
    FileUploadComponent = __decorate([
        Component({
            selector: 'app-file-upload',
            templateUrl: './file-upload.component.html',
            styleUrls: ['./file-upload.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], FileUploadComponent);
    return FileUploadComponent;
}());
export { FileUploadComponent };
//# sourceMappingURL=file-upload.component.js.map