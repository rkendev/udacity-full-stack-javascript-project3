export class OrderInfo {

  constructor(
    public id: number,
    public name: string,
    public deliveryAddres: string,
    public billingAddres: string,
    public state: string,
    public paymentMethod: string
  ) {  }

}
