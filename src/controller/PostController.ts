import { getConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Post } from "../entity/Post";

export class PostController {
  // private PostRepository = getRepository(Post);

  async all(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    return getConnection().getRepository(Post).find();
  }

  async one(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    return getConnection().getRepository(Post).findOne(request.params.id);
  }

  async save(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    return getConnection().getRepository(Post).save(request.body);
  }

  async remove(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const PostToRemove = await getConnection()
      .getRepository(Post)
      .findOne(request.params.id);
    await getConnection().getRepository(Post).remove(PostToRemove);
  }
}

// export const postController = new PostController();
