import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Post } from "../entity/Post";

export class PostController {
  private PostRepository = getRepository(Post);

  async all(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    return this.PostRepository.find();
  }

  async one(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    return this.PostRepository.findOne(request.params.id);
  }

  async save(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    return this.PostRepository.save(request.body);
  }

  async remove(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const PostToRemove = await this.PostRepository.findOne(request.params.id);
    await this.PostRepository.remove(PostToRemove);
  }
}
