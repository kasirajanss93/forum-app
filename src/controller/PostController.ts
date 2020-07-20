import { getConnectionManager, getRepository, getManager } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Post } from "../entity/Post";

export class PostController {
  private _postRepository = getConnectionManager()
    .get(process.env.NODE_ENV === "" ? "default" : process.env.NODE_ENV)
    .getRepository(Post);

  async all(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      return this._postRepository.find();
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
      const post = await this._postRepository.findOne(request.params.id);
      if (!post) {
        return response
          .status(404)
          .json({ status: 404, error: "Post not found" });
      }
      return post;
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
      return this._postRepository.save(request.body);
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
      const postToRemove = await this._postRepository.findOne(
        request.params.id
      );
      if (!postToRemove) {
        return response
          .status(404)
          .json({ status: 404, error: "Post not found" });
      }
      const post = await this._postRepository.remove(postToRemove);

      return response.status(204).send();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

// export const postController = new PostController();
