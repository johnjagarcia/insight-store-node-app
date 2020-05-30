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
import { NeighborhoodService } from "../services/NeighborhoodService";
import { Summary, Description, Response, Body, Query } from "fortjs-swagger";
import { plainToClass } from "class-transformer";
import { CreateNeighborhoodDto } from "../dto/CreateNeighborhoodDto";
import { Neighborhood } from "../../../shared/entities/Neighborhood";

export class NeighborhoodController extends Controller {
  service: NeighborhoodService;
  constructor(@Singleton(NeighborhoodService) service: NeighborhoodService) {
    super();
    this.service = service;
  }

  @Summary("Get neighborhoods of a town")
  @Description("return all saved neighborhoods that belongs to a town")
  @Query("townId", "0")
  @Response(HTTP_STATUS_CODE.Ok, [Neighborhood])
  @DefaultWorker()
  @ExpectQuery({ townId: 0 })
  async getProductTypes() {
    try {
      const townId = this.query.townId;
      const neighborhoods = await this.service.getNeighborhoods(townId);
      return jsonResult(neighborhoods, HTTP_STATUS_CODE.Ok);
    } catch (error) {
      return textResult(
        "ERROR_AT_GET_RESOURCES",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }

  @Summary("Create neighborhood")
  @Description("Create a new neighborhood")
  @Body(CreateNeighborhoodDto)
  @Response(HTTP_STATUS_CODE.Created, [Neighborhood])
  @Route("/")
  @Worker([HTTP_METHOD.Post])
  @ExpectBody(CreateNeighborhoodDto)
  async create() {
    try {
      let neighborhood = plainToClass(CreateNeighborhoodDto, this.body);
      const newTown = await this.service.saveNeighborhood(neighborhood);
      return jsonResult(newTown, HTTP_STATUS_CODE.Created);
    } catch (error) {
      return textResult(
        "ERROR_AT_CREATE_RESOURCE",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }
}
