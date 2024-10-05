import { Response } from 'express';
import { OrderDto } from './newOrder.dto';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    private readonly orders;
    getHello(): {
        message: string;
    };
    Iphone(response: Response): void;
    orderForm(): {
        errors: any[];
        data: {};
    };
    order(orderData: OrderDto, response: Response): void;
    orderSuccess(): {
        message: string;
        ordersCount: number;
    };
}
