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
import { CustomerService } from "../services/CustomerService";
import { Summary, Description, Response, Body, Query } from "fortjs-swagger";
import { plainToClass } from "class-transformer";
import { CreateCustomerDto } from "../dto/CreateCustomerDto";
import { Customer } from "../../../shared/entities/Customer";

export class CustomerController extends Controller {
  service: CustomerService;
  constructor(@Singleton(CustomerService) service: CustomerService) {
    super();
    this.service = service;
  }

  @Summary("Get customers")
  @Description("return all saved customers")
  @Response(HTTP_STATUS_CODE.Ok, [Customer])
  @DefaultWorker()
  async getProductTypes() {
    try {
      const customers = await this.service.getCustomers();
      return jsonResult(customers, HTTP_STATUS_CODE.Ok);
    } catch (error) {
      return textResult(
        "ERROR_AT_GET_RESOURCES",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }

  @Summary("Create customer")
  @Description("Create a new customer")
  @Body(CreateCustomerDto)
  @Response(HTTP_STATUS_CODE.Created, [Customer])
  @Route("/")
  @Worker([HTTP_METHOD.Post])
  @ExpectBody(CreateCustomerDto)
  async create() {
    try {
      let customer = plainToClass(CreateCustomerDto, this.body);
      const newCustomer = await this.service.saveCustomer(customer);
      return jsonResult(newCustomer, HTTP_STATUS_CODE.Created);
    } catch (error) {
      return textResult(
        "ERROR_AT_CREATE_RESOURCE",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }
}
