import { Controller, Get, Post, Body, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { OrderDto } from './newOrder.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly orders: OrderDto[] = [];

  @Get()
  @Render('welcome')
  getHello() {
    return {
      message: this.appService.getHello(),
    };
  }

  @Post()
  Iphone(@Res() response: Response) {
    response.redirect(303, '/order');
  }

  @Get('order')
  @Render('index')
  orderForm() {
    return {
      errors: [],
      data: {},
    };
  }

  @Post('order')
  order(@Body() orderData: OrderDto, @Res() response: Response) {
    const errors: string[] = [];

    if (
      !orderData.name ||
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
      !orderData.securityCode
    ) {
      errors.push('Minden mezőt kötelező megadni!');
    }

    if (
      orderData.couponCode &&
      !/^([A-Z]{2}-\d{4})$/.test(orderData.couponCode)
    ) {
      errors.push('Kuponkód formátuma helytelen!');
    }

    if (!orderData.paymentCardNumber) {
      errors.push('A bankkártya szám megadása kötelező!');
    } else if (
      !/^\d{16}$/.test(orderData.paymentCardNumber.replace(/-/g, ''))
    ) {
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

  @Get('succes')
  @Render('siker')
  orderSuccess() {
    return {
      message: 'Sikeresen leadta  rendelését!',
      ordersCount: this.orders.length,
    };
  }
}
