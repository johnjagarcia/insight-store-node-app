import {
  Controller,
  DefaultWorker,
  Singleton,
  jsonResult,
  HTTP_STATUS_CODE,
  textResult,
} from "fortjs";
import { ProductTypeService } from "../services/ProductTypeService";
import { Summary, Description, Response } from "fortjs-swagger";
import { ProductType } from "../../../shared/entities/ProductType";

export class ProductTypeController extends Controller {
  service: ProductTypeService;
  constructor(@Singleton(ProductTypeService) service: ProductTypeService) {
    super();
    this.service = service;
  }

  @Summary("Get product types")
  @Description("return all saved product types")
  @Response(HTTP_STATUS_CODE.Ok, [ProductType])
  @DefaultWorker()
  async getProductTypes() {
    try {
      const productTypes = await this.service.getProductTypes();
      return jsonResult(productTypes, HTTP_STATUS_CODE.Ok);
    } catch (error) {
      return textResult(
        "ERROR_AT_GET_RESOURCES",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }
}
