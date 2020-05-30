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
import { Size } from "../../../shared/entities/Size";
import { SizeService } from "../services/SizeService";

export class SizeController extends Controller {
  service: SizeService;
  constructor(@Singleton(SizeService) service: SizeService) {
    super();
    this.service = service;
  }

  @Summary("Get sizes of a category")
  @Description("return all saved sizes of a category")
  @Query("categoryId", "0")
  @Response(HTTP_STATUS_CODE.Ok, [Size])
  @DefaultWorker()
  @ExpectQuery({ categoryId: 0 })
  async getProductTypes() {
    try {
      const categoryId = this.query.categoryId;
      const sizes = await this.service.getSizes(categoryId);
      return jsonResult(sizes, HTTP_STATUS_CODE.Ok);
    } catch (error) {
      return textResult(
        "ERROR_AT_GET_RESOURCES",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }
}
