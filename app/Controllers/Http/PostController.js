'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */

const Posts = use('App/Models/Post');


class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {

    const post = await Posts.all();

    return response.json(post);
  }

  /**
   * Render a form to be used for creating a new post.
   * GET posts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    const postRegister = request.all();
    console.log(postRegister);

    const post = await Posts.create(postRegister);

    if (post) {
      return response.json(post);
    }

    return response.json({
      message: 'Erro ao criar post'
    });
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {

    const id = params.id;

    const post = await Posts.find(id);

    if (post) {
      return response.json(post);
    }

    return response.json({
      message: 'Post não encontrado'
    });

  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {


  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const id = params.id;

    const postBody = request.body;

    const post = await Posts.find(id);

    if (post) {
      post.merge(postBody);
      // post = postBody;

      post.save();
      return response.json(post);
    }

    return response.json({
      message: 'Post não encontrado'
    });
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {

    const id = params.id;

    const post = await Posts.find(id);

    if (post) {
      Posts.delete();

      return response.json();
    }

    return response.json({
      message: 'Post não encontrado'
    });

  }
}

module.exports = PostController
