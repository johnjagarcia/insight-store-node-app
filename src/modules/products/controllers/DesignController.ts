import {
  Controller,
  DefaultWorker,
  Singleton,
  jsonResult,
  HTTP_STATUS_CODE,
  textResult,
  Route,
  Worker,
  HTTP_METHOD,
  ExpectBody,
} from "fortjs";
import { Summary, Description, Response, Body } from "fortjs-swagger";
import { DesignService } from "../services/DesignService";
import { Design } from "../../../shared/entities/Design";
import { CreateDesignDto } from "../dto/CreateDesignDto";
import { plainToClass } from "class-transformer";

export class DesignController extends Controller {
  service: DesignService;
  constructor(@Singleton(DesignService) service: DesignService) {
    super();
    this.service = service;
  }

  @Summary("Get designs")
  @Description("return all saved designs")
  @Response(HTTP_STATUS_CODE.Ok, [Design])
  @DefaultWorker()
  async getDesigns() {
    try {
      const categories = await this.service.getDesigns();
      return jsonResult(categories, HTTP_STATUS_CODE.Ok);
    } catch (error) {
      return textResult(
        "ERROR_AT_GET_RESOURCES",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }

  @Summary("Create design")
  @Description("Create a new design")
  @Body(CreateDesignDto)
  @Response(HTTP_STATUS_CODE.Created, [Design])
  @Route("/")
  @Worker([HTTP_METHOD.Post])
  @ExpectBody(CreateDesignDto)
  async create() {
    try {
      let design = plainToClass(CreateDesignDto, this.body);
      const newDesign = await this.service.saveDesign(design);
      return jsonResult(newDesign, HTTP_STATUS_CODE.Created);
    } catch (error) {
      return textResult(
        "ERROR_AT_CREATE_RESOURCE",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }
}
