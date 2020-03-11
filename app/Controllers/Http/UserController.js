'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with User
 */

const User = use('App/Models/User');


class UserController {
  /**
   * Show a list of all User.
   * GET User
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {

    const user = await User.all();
    if (user) {
      return response.status(201).json(user);
    }

    return response.status(400).json({
      message: 'There are currently no registered users'
    });
  }

  /**
   * Render a form to be used for creating a new post.
   * GET User/create
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
   * POST User
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    const userRegister = request.all();
    console.log(userRegister);

    const user = await User.create(userRegister);

    if (user) {
      return response.status(201).json(user);
    }

    return response.status(400).json({
      message: 'error in create user'
    });
  }

  /**
   * Display a single post.
   * GET User/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {

    const id = params.id;
    console.log(id);

    const user = await User.findBy('email', id);

    if (user) {
      return response.status(201).json(user);
    }

    return response.status(400).json({
      message: 'User not found'
    });

  }

  /**
   * Render a form to update an existing post.
   * GET User/:id/edit
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
   * PUT or PATCH User/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const id = params.id;
    console.log(id);

    const userBody = request.body;

    const user = await User.findBy('email', id);

    if (user) {
      await user.merge(userBody);
      // user = userBody;

      await user.save();
      return response.status(201).json(user);
    }

    return response.status(400).json({
      message: 'User not found'
    });
  }

  /**
   * Delete a post with id.
   * DELETE User/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {

    const id = params.id;

    const user = await User.findBy('email', id);

    if (user) {
      await user.delete()

      return response.status(201).json();
    }

    return response.status(400).json({
      message: 'User not found'
    });

  }
}

module.exports = UserController
