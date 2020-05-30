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
import { OrderService } from "../services/OrderService";
import { Summary, Description, Response, Body, Query } from "fortjs-swagger";
import { plainToClass } from "class-transformer";
import { CreateOrderDto } from "../dto/CreateOrderDto";
import { Order } from "../../../shared/entities/Order";
import { StatusService } from "../../products/services/StatusService";
import { ProductService } from "../../products/services/ProductService";

export class OrderController extends Controller {
  service: OrderService;
  constructor(@Singleton(OrderService) service: OrderService) {
    super();
    this.service = service;
  }

  @Summary("Get orders")
  @Description("return orders according to filters")
  @Query("registerDate", "yyyy-mm-dd")
  @Response(HTTP_STATUS_CODE.Ok, [Order])
  @DefaultWorker()
  async getCouriers() {
    try {
      const registerDate = this.query.registerDate;
      const status = this.query.status;
      const customerName = this.query.customerName;

      const orders = await this.service.getOrders(
        registerDate,
        status,
        customerName
      );
      return jsonResult(orders, HTTP_STATUS_CODE.Ok);
    } catch (error) {
      return textResult(
        "ERROR_AT_GET_RESOURCES",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }

  @Summary("Create order")
  @Description("Create a new order")
  @Body(CreateOrderDto)
  @Response(HTTP_STATUS_CODE.Created, [Order])
  @Route("/")
  @Worker([HTTP_METHOD.Post])
  @ExpectBody(CreateOrderDto)
  async create(
    @Singleton(StatusService) statusService: StatusService,
    @Singleton(ProductService) productService: ProductService
  ) {
    try {
      let order = plainToClass(CreateOrderDto, this.body);
      const newOrder = await this.service.registerOrder(
        order,
        statusService,
        productService
      );
      return jsonResult(newOrder, HTTP_STATUS_CODE.Created);
    } catch (error) {
      console.log("error :>> ", error);
      return textResult(
        "ERROR_AT_CREATE_RESOURCE",
        HTTP_STATUS_CODE.InternalServerError
      );
    }
  }
}
