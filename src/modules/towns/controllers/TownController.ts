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
  ExpectQuery,
} from "fortjs";
import { TownService } from "../services/TownService";
import { Summary, Description, Response, Body, Query } from "fortjs-swagger";
import { Town } from "../../../shared/entities/Town";
import { CreateTownDto } from "../dto/CreateTownDto";
import { plainToClass } from "class-transformer";

export class TownController extends Controller {
  service: TownService;
  constructor(@Singleton(TownService) service: TownService) {
    super();
    this.service = service;
  }

  @Summary("Get towns of a state")
  @Description("return all saved towns belongs to a state")
  @Query("stateId", "0")
  @Response(HTTP_STATUS_CODE.Ok, [Town])
  @DefaultWorker()
  @ExpectQuery({ stateId: 0 })
  async getProductTypes() {
    try {
      const stateId = this.query.stateId;
      const towns = await this.service.getTowns(stateId);
      return jsonResult(towns, HTTP_STATUS_CODE.Ok);
    } catch (error) {
      return textResult(
        "ERROR_AT_GET_RESOURCES",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }

  @Summary("Create town")
  @Description("Create a new town")
  @Body(CreateTownDto)
  @Response(HTTP_STATUS_CODE.Created, [Town])
  @Route("/")
  @Worker([HTTP_METHOD.Post])
  @ExpectBody(CreateTownDto)
  async create() {
    try {
      let town = plainToClass(CreateTownDto, this.body);
      const newTown = await this.service.saveTown(town);
      return jsonResult(newTown, HTTP_STATUS_CODE.Created);
    } catch (error) {
      return textResult(
        "ERROR_AT_CREATE_RESOURCE",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }
}
