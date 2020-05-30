import { ProductTypeController } from "./modules/products/controllers/ProductTypeController";
import { StateController } from "./modules/states/controllers/StateController";
import { ParentRoute } from "fortjs";
import { TownController } from "./modules/towns/controllers/TownController";
import { NeighborhoodController } from "./modules/neighborhoods/controllers/NeighborhoodController";
import { ShirtColorController } from "./modules/products/controllers/ShirtColorController";
import { SizeController } from "./modules/products/controllers/SizeController";
import { CategoryController } from "./modules/products/controllers/CategoryController";
import { DesignController } from "./modules/products/controllers/DesignController";
import { DesignColorController } from "./modules/products/controllers/DesignColorController";
import { CustomerController } from "./modules/customers/controllers/CustomerController";
import { CourierController } from "./modules/couriers/controllers/CourierController";
import { OrderController } from "./modules/orders/controllers/OrderController";

export const routes: ParentRoute[] = [
  {
    path: "/api/product-types",
    controller: ProductTypeController,
  },
  {
    path: "/api/states",
    controller: StateController,
  },
  {
    path: "/api/towns",
    controller: TownController,
  },
  {
    path: "/api/neighborhoods",
    controller: NeighborhoodController,
  },
  {
    path: "/api/shirt-colors",
    controller: ShirtColorController,
  },
  {
    path: "/api/sizes",
    controller: SizeController,
  },
  {
    path: "/api/categories",
    controller: CategoryController,
  },
  {
    path: "/api/designs",
    controller: DesignController,
  },
  {
    path: "/api/design-colors",
    controller: DesignColorController,
  },
  {
    path: "/api/customers",
    controller: CustomerController,
  },
  {
    path: "/api/couriers",
    controller: CourierController,
  },
  {
    path: "/api/orders",
    controller: OrderController,
  },
];
