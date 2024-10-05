export class OrderDto {
  name: string;
  billingCountry: string;
  billingPostalCode: string;
  billingCity: string;
  billingStreet: string;
  billingHouseNumber: string;
  shippingCountry: string;
  shippingPostalCode: string;
  shippingCity: string;
  shippingStreet: string;
  shippingHouseNumber: string;
  couponCode?: string;
  paymentCardNumber: string;
  paymentExpirationDate: string;
  securityCode: string;
}
