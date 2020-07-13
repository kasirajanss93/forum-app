import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Profile } from "../entity/Profile";

export class ProfileController {
  private profileRepository = getRepository(Profile);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.profileRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.profileRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.profileRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let profileToRemove = await this.profileRepository.findOne(
      request.params.id
    );
    await this.profileRepository.remove(profileToRemove);
  }
}
