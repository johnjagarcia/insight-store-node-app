import {
  Controller,
  DefaultWorker,
  Singleton,
  jsonResult,
  HTTP_STATUS_CODE,
  Worker,
  HTTP_METHOD,
  Route,
  ExpectBody,
  textResult,
} from "fortjs";
import { Summary, Description, Response, Body } from "fortjs-swagger";
import { plainToClass } from "class-transformer";
import { ShirtColorService } from "../services/ShirtColorService";
import { ShirtColor } from "../../../shared/entities/ShirtColor";
import { CreateShirtColorDto } from "../dto/CreateShirtColorDto";

export class ShirtColorController extends Controller {
  service: ShirtColorService;
  constructor(@Singleton(ShirtColorService) service: ShirtColorService) {
    super();
    this.service = service;
  }

  @Summary("Get shirt colors")
  @Description("return all saved shirt colors")
  @Response(HTTP_STATUS_CODE.Ok, [ShirtColor])
  @DefaultWorker()
  async getColors() {
    try {
      const neighborhoods = await this.service.getShirtColors();
      return jsonResult(neighborhoods, HTTP_STATUS_CODE.Ok);
    } catch (error) {
      return textResult(
        "ERROR_AT_GET_RESOURCES",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }

  @Summary("Create shirt color")
  @Description("Create a new shirt color")
  @Body(CreateShirtColorDto)
  @Response(HTTP_STATUS_CODE.Created, [ShirtColor])
  @Route("/")
  @Worker([HTTP_METHOD.Post])
  @ExpectBody(CreateShirtColorDto)
  async create() {
    try {
      let shirtColor = plainToClass(CreateShirtColorDto, this.body);
      const newShirtColor = await this.service.saveColor(shirtColor);
      return jsonResult(newShirtColor, HTTP_STATUS_CODE.Created);
    } catch (error) {
      return textResult(
        "ERROR_AT_CREATE_RESOURCE",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }
}
