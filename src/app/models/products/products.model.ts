export class ProductsModel {

    productID: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    categoryID: number;
    typeID: number;
    category: Categories;
    type: Types;

    constructor(data) {
        this.productID = data.product_id;
        this.name = data.name;
        this.description = data.description;
        this.quantity = data.quantity;
        this.price = data.price;
        this.categoryID = data.category_fk;
        this.typeID = data.type_fk;
        this.type = new Types(data.type);
        this.category = new Categories(data.category);
    }

}

export class Categories {

    name: string;
    description: string;

    constructor(data) {
        this.name = data.name;
        this.description = data.description;
    }

}

export class Types {

    name: string;
    description: string;

    constructor(data) {
        this.name = data.name;
        this.description = data.description;
    }

}
