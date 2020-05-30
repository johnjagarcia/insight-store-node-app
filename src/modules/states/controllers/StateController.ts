import {
  Controller,
  DefaultWorker,
  Singleton,
  jsonResult,
  HTTP_STATUS_CODE,
  textResult,
} from "fortjs";
import { StateService } from "../services/StateService";
import { Summary, Description, Response } from "fortjs-swagger";
import { State } from "../../../shared/entities/State";

export class StateController extends Controller {
  service: StateService;
  constructor(@Singleton(StateService) service: StateService) {
    super();
    this.service = service;
  }

  @Summary("Get states")
  @Description("return all saved states")
  @Response(HTTP_STATUS_CODE.Ok, [State])
  @DefaultWorker()
  async getProductTypes() {
    try {
      const states = await this.service.getStates();
      return jsonResult(states, HTTP_STATUS_CODE.Ok);
    } catch (error) {
      return textResult(
        "ERROR_AT_GET_RESOURCES",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }
}
