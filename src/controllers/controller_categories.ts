import { Category } from "../db/entities/Products/Category.js";
import { Product } from "../db/entities/Products/Product.js";
import { ProductNS } from "../../@types/type_product.js";

const addCategoryController = async (payload: ProductNS.category) => {
    const category = Category.create(payload)
    await category.save()
    return category
}


export {
    addCategoryController
}