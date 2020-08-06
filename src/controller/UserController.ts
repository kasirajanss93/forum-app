import { getConnectionManager, getRepository, getManager } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {
  private _userRepository = getConnectionManager()
    .get(process.env.NODE_ENV === "" ? "default" : process.env.NODE_ENV)
    .getRepository(User);

  async all(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const users = await this._userRepository.find();

      return response.send(users);
    } catch (err) {
      next(err);
    }
  }

  async one(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = await this._userRepository.findOne(request.params.id);
      if (!user) {
        return response
          .status(404)
          .json({ status: 404, error: "User not found" });
      }
      return response.send(user);
    } catch (err) {
      next(err);
    }
  }

  async save(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = await this._userRepository.save(request.body);
      return response.send(user);
    } catch (err) {
      next(err);
    }
  }

  async remove(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userToRemove = await this._userRepository.findOne(
        request.params.id
      );
      if (!userToRemove) {
        return response
          .status(404)
          .json({ status: 404, error: "User not found" });
      }
      const user = await this._userRepository.remove(userToRemove);
      return response.status(204).send({});
    } catch (err) {
      next(err);
    }
  }
}
