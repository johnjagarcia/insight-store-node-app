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
import { CourierService } from "../services/CourierService";
import { Summary, Description, Response, Body } from "fortjs-swagger";
import { plainToClass } from "class-transformer";
import { CreateCourierDto } from "../dto/CreateCourierDto";
import { Courier } from "../../../shared/entities/Courier";

export class CourierController extends Controller {
  service: CourierService;
  constructor(@Singleton(CourierService) service: CourierService) {
    super();
    this.service = service;
  }

  @Summary("Get couriers")
  @Description("return all saved couriers")
  @Response(HTTP_STATUS_CODE.Ok, [Courier])
  @DefaultWorker()
  async getCouriers() {
    try {
      const couriers = await this.service.getCouriers();
      return jsonResult(couriers, HTTP_STATUS_CODE.Ok);
    } catch (error) {
      return textResult(
        "ERROR_AT_GET_RESOURCES",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }

  @Summary("Create courier")
  @Description("Create a new courier")
  @Body(CreateCourierDto)
  @Response(HTTP_STATUS_CODE.Created, [Courier])
  @Route("/")
  @Worker([HTTP_METHOD.Post])
  @ExpectBody(CreateCourierDto)
  async create() {
    try {
      let courier = plainToClass(CreateCourierDto, this.body);
      const newCourier = await this.service.saveCourier(courier);
      return jsonResult(newCourier, HTTP_STATUS_CODE.Created);
    } catch (error) {
      return textResult(
        "ERROR_AT_CREATE_RESOURCE",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }
}
