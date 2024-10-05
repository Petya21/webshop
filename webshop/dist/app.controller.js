"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const newOrder_dto_1 = require("./newOrder.dto");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
        this.orders = [];
    }
    getHello() {
        return {
            message: this.appService.getHello(),
        };
    }
    Iphone(response) {
        response.redirect(303, '/order');
    }
    orderForm() {
        return {
            errors: [],
            data: {},
        };
    }
    order(orderData, response) {
        const errors = [];
        if (!orderData.name ||
            !orderData.billingCountry ||
            !orderData.billingPostalCode ||
            !orderData.billingCity ||
            !orderData.billingStreet ||
            !orderData.shippingCountry ||
            !orderData.shippingPostalCode ||
            !orderData.shippingCity ||
            !orderData.shippingStreet ||
            !orderData.paymentCardNumber ||
            !orderData.paymentExpirationDate ||
            !orderData.securityCode) {
            errors.push('Minden mezőt kötelező megadni!');
        }
        if (orderData.couponCode &&
            !/^([A-Z]{2}-\d{4})$/.test(orderData.couponCode)) {
            errors.push('Kuponkód formátuma helytelen!');
        }
        if (!orderData.paymentCardNumber) {
            errors.push('A bankkártya szám megadása kötelező!');
        }
        else if (!/^\d{16}$/.test(orderData.paymentCardNumber.replace(/-/g, ''))) {
            errors.push('A bankkártya szám formátuma helytelen!');
        }
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(orderData.paymentExpirationDate)) {
            errors.push('A lejárati dátum formátuma helytelen!');
        }
        if (!/^\d{3}$/.test(orderData.securityCode)) {
            errors.push('A biztonsági kód formátuma helytelen!');
        }
        if (errors.length > 0) {
            response.render('index', {
                errors,
                data: orderData,
            });
            return;
        }
        this.orders.push(orderData);
        response.redirect(303, '/succes');
    }
    orderSuccess() {
        return {
            message: 'Sikeresen leadta  rendelését!',
            ordersCount: this.orders.length,
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('welcome'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "Iphone", null);
__decorate([
    (0, common_1.Get)('order'),
    (0, common_1.Render)('index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "orderForm", null);
__decorate([
    (0, common_1.Post)('order'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newOrder_dto_1.OrderDto, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "order", null);
__decorate([
    (0, common_1.Get)('succes'),
    (0, common_1.Render)('siker'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "orderSuccess", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map