import {Categories, Types} from '../products/products.model';

export class TypesModel {

    typeID: number;
    name: string;
    description: string;
    products: Products[] = [];

    constructor(data) {
        this.typeID = data.type_id;
        this.name = data.name;
        this.description = data.description;
        for (const item of data.products) {
            this.products.push(new Products(item));
        }
    }

}

export class Products {

    productID: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    categoryID: number;
    category: Categories;

    constructor(data) {
        this.productID = data.product_id;
        this.name = data.name;
        this.description = data.description;
        this.quantity = data.quantity;
        this.price = data.price;
        this.categoryID = data.category_fk;
        this.category = new Categories(data.category);
    }

}
