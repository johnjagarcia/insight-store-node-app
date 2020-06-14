import {
  Controller,
  DefaultWorker,
  Singleton,
  jsonResult,
  HTTP_STATUS_CODE,
  textResult,
  ExpectQuery,
} from "fortjs";
import { Summary, Description, Response, Query } from "fortjs-swagger";
import { ProductService } from "../services/ProductService";
import { Product } from "../../../shared/entities/Product";

export class ProductController extends Controller {
  service: ProductService;
  constructor(@Singleton(ProductService) service: ProductService) {
    super();
    this.service = service;
  }

  @Summary("Get products of a order")
  @Description("return all saved products of a order")
  @Query("orderId", "0")
  @Response(HTTP_STATUS_CODE.Ok, [Product])
  @DefaultWorker()
  @ExpectQuery({ orderId: 0 })
  async getDesigns() {
    try {
      const orderId = this.query.orderId;
      const products = await this.service.getOrderProducts(orderId);
      return jsonResult(products, HTTP_STATUS_CODE.Ok);
    } catch (error) {
      return textResult(
        "ERROR_AT_GET_RESOURCES",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }
}
