import { ProfileController } from "./controller/ProfileController";

export const Routes = [
  {
    method: "get",
    route: "/users",
    controller: ProfileController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: ProfileController,
    action: "one",
  },
  {
    method: "post",
    route: "/users",
    controller: ProfileController,
    action: "save",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: ProfileController,
    action: "remove",
  },
];
