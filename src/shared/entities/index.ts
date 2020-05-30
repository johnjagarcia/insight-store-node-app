import { ProductType } from "./ProductType";
import { Neighborhood } from "./Neighborhood";
import { Town } from "./Town";
import { State } from "./State";
import { ShirtColor } from "./ShirtColor";
import { Size } from "./Size";
import { CategorySize } from "./CategorySize";
import { Category } from "./Category";
import { DesignColor } from "./DesignColor";
import { Order } from "./Order";
import { OrderLog } from "./OrderLog";
import { Product } from "./Product";
import { Design } from "./Design";
import { Customer } from "./Customer";
import { OrderStatus } from "./OrderStatus";
import { ProductDesignColor } from "./ProductDesignColor";
import { Courier } from "./Courier";

const entities = [
  Category,
  CategorySize,
  Courier,
  Customer,
  Design,
  DesignColor,
  Neighborhood,
  Order,
  OrderLog,
  OrderStatus,
  Product,
  ProductDesignColor,
  ProductType,
  ShirtColor,
  Size,
  State,
  Town,
];

export default entities;
