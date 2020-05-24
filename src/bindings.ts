import { Container, interfaces } from "inversify";
import { TYPES } from "./constants/types";
import { UserFactory } from "./factories/user.factory";
import { UserService } from "./services/user.service";
import { DatabaseService } from "./services/database.service";
import { AuthMiddleware } from "./middleware/auth.middleware";

export let container = new Container();

container.bind<DatabaseService>(TYPES.DatabaseService).to(DatabaseService).inSingletonScope();

container.bind<UserFactory>(TYPES.UserFactory).to(UserFactory);
container.bind<UserService>(TYPES.UserService).to(UserService);

container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
