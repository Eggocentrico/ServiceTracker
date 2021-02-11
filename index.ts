import * as express from 'express';
import cors from 'cors';

interface RouterDefinition {
  route: string;
  router: express.Router;
}

class Application {
  private PORT: number;
  private APP: express.Application;
  private MIDDLEWARES: Array<express.RequestHandler>;
  private ROUTERS: Array<RouterDefinition>;

  constructor(PORT: number, MIDDLEWARES: Array<express.RequestHandler>, ROUTERS: Array<RouterDefinition>) {
    this.APP = express();
    this.MIDDLEWARES = MIDDLEWARES;
    this.ROUTERS = ROUTERS;
    this.setup();
  }

  setup () {
    for (let x = 0; x < this.MIDDLEWARES.length; x++)
      this.setupMiddleware(this.MIDDLEWARES[x])
    for (let x = 0; x < this.ROUTERS.length; x++)
      this.setupRouter(this.ROUTERS[x].route, this.ROUTERS[x].router)
  }

  setupMiddleware (middleware: express.RequestHandler) {
    this.APP.use(middleware)
  }

  setupRouter (route: string, router: express.Router) {
    this.APP.use(route, router)
  }

  listen () {
    this.APP.listen(this.PORT, () => {
        console.log(`Listening on port: ${this.PORT}`)
    })
  }

}

const router = express.Router()

const app: Application = new Application(8080, [cors], [{route: '/', router}])
