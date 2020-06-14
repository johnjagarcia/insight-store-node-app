import { Wall } from "fortjs";
import cors from "cors";

export class CorsWall extends Wall {
  async onIncoming() {
    const result = await this.callMiddleWare(cors());
  }

  callMiddleWare(middleWare) {
    return new Promise((res, rej) => {
      middleWare(this.request, this.response, res);
    });
  }
}
