'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with auths
 */

const User = use('App/Models/User');

const Mail = use('Mail');

class AuthController {
  /**
   * Show a list of all auths.
   * GET auths
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new auth.
   * GET auths/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  async login({ auth, request, response }) {
    const { email, password } = request.all();


    const user = await User.findBy('email', email);

    if (!user) {
      return response.status(401).json({ message: 'invalid email or password' });
    }

    const token = await auth.attempt(email, password, true)

    if (!token) {
      return response.status(401).json({ message: 'invalid email or password' });
    }

    return response.status(201).json(token);

  }

  /**
   * Create/save a new auth.
   * POST auths
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const register = request.only(['name', 'apelido', 'email', 'password', 'phone', 'avatar']);

    console.log('11111', register.email);

    const valid = await User.findBy('email', register.email);

    console.log(valid);

    if (valid !== null) {
      return response.status(400).json({ message: 'Email já cadastrado' });
    }

    const user = await User.create(register);
    console.log(user);

    return response.status(201).json(user);
  }

  /**
   * Display a single auth.
   * GET auths/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing auth.
   * GET auths/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async forgot({ request, response }) {
    const { email } = request.all();

    const user = await User.findBy('email', email);

    // console.log(user);


    if (user) {

      await Mail.send('welcome', { name: user.name }, (message) => {
        message
          .to(user.email)
          .from('jefferson14489@gmail.com')
          .subject('Welcome to yardstick')
      });

      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: user.email,
        from: 'test@example.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: 'emails.welcome',
      };
      sgMail.send(msg);

      return response.status(201).json({
        message: 'New password email sent'
      });
    }

    return response.status(400).json({
      message: 'Email not found'
    });
  }

  /**
   * Update auth details.
   * PUT or PATCH auths/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a auth with id.
   * DELETE auths/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {


  }
}

module.exports = AuthController
