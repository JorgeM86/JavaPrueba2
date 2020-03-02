import {Types} from '../products/products.model';

export class CategoriesModel {

    categoryID: number;
    name: string;
    description: string;
    /*products: Products[] = [];*/

    constructor(data) {
        this.categoryID = data.category_id;
        this.name = data.name;
        this.description = data.description;
        /*for (const item of data.products) {
            this.products.push(new Products(item));
        }*/
    }

}

/*
export class Products {

    productID: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    typeID: number;
    type: Types;

    constructor(data) {
        this.productID = data.product_id;
        this.name = data.name;
        this.description = data.description;
        this.quantity = data.quantity;
        this.price = data.price;
        this.typeID = data.type_fk;
        this.type = new Types(data.type);
    }

}
*/
