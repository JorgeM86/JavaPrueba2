export class ReceiptsModel {

    receiptID: number;
    totalPrice: number;
    totalQuantity: number;
    productID: number;
    date: string;
    product: any;

    constructor(data) {
        this.receiptID = data.receipt_id;
        this.totalPrice = data.total_price;
        this.totalQuantity = data.total_quantity;
        this.productID = data.product_fk;
        this.date = data.date;
        this.product = data.product;
    }

}
