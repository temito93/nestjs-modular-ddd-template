export class GetAllOrdersVo {
  readonly orders: string[];

  constructor(params: { orders: string[] }) {
    this.orders = params.orders;
  }
}
