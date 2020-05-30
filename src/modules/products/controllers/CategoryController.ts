import {
  Controller,
  DefaultWorker,
  Singleton,
  jsonResult,
  HTTP_STATUS_CODE,
  textResult,
} from "fortjs";
import { Summary, Description, Response } from "fortjs-swagger";
import { CategoryService } from "../services/CategoryService";
import { Category } from "../../../shared/entities/Category";

export class CategoryController extends Controller {
  service: CategoryService;
  constructor(@Singleton(CategoryService) service: CategoryService) {
    super();
    this.service = service;
  }

  @Summary("Get categories")
  @Description("return all saved categories")
  @Response(HTTP_STATUS_CODE.Ok, [Category])
  @DefaultWorker()
  async getProductTypes() {
    try {
      const categories = await this.service.getCategories();
      return jsonResult(categories, HTTP_STATUS_CODE.Ok);
    } catch (error) {
      return textResult(
        "ERROR_AT_GET_RESOURCES",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }
}
