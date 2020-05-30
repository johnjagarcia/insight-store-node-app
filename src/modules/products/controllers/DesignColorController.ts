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
import { plainToClass } from "class-transformer";
import { DesignColorService } from "../services/DesignColorService";
import { DesignColor } from "../../../shared/entities/DesignColor";
import { CreateDesignColorDto } from "../dto/CreateDesignColorDto";

export class DesignColorController extends Controller {
  service: DesignColorService;
  constructor(@Singleton(DesignColorService) service: DesignColorService) {
    super();
    this.service = service;
  }

  @Summary("Get design colors")
  @Description("return all saved design colors")
  @Response(HTTP_STATUS_CODE.Ok, [DesignColor])
  @DefaultWorker()
  async getDesignColors() {
    try {
      const designs = await this.service.getDesignColors();
      return jsonResult(designs, HTTP_STATUS_CODE.Ok);
    } catch (error) {
      return textResult(
        "ERROR_AT_GET_RESOURCES",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }

  @Summary("Create design color")
  @Description("Create a new design color")
  @Body(CreateDesignColorDto)
  @Response(HTTP_STATUS_CODE.Created, [DesignColor])
  @Route("/")
  @Worker([HTTP_METHOD.Post])
  @ExpectBody(CreateDesignColorDto)
  async create() {
    try {
      let designColor = plainToClass(CreateDesignColorDto, this.body);
      const newDesignColor = await this.service.saveDesignColor(designColor);
      return jsonResult(newDesignColor, HTTP_STATUS_CODE.Created);
    } catch (error) {
      return textResult(
        "ERROR_AT_CREATE_RESOURCE",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }
}
