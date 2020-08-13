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
      const posts = await this._postRepository.find();

      return response.send(posts);
    } catch (err) {
      return response.status(500).json({ status: 500, error: err.message });
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
      return response.send(post);
    } catch (err) {
      return response.status(500).json({ status: 500, error: err.message });
    }
  }

  async save(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const post = await this._postRepository.save(request.body);
      return response.send(post);
    } catch (err) {
      return response.status(500).json({ status: 500, error: err.message });
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
      return response.status(204).send({});
    } catch (err) {
      return response.status(500).json({ status: 500, error: err.message });
    }
  }
}

// export const postController = new PostController();
