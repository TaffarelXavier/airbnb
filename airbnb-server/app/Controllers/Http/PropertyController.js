"use strict";

const Property = use("App/Models/Property");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with properties
 */
class PropertyController {
  /**
   * Show a list of all properties.
   * GET properties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const { latitude, longitude } = request.all();

    const properties = Property.query()
      .with('images')
      .nearBy(latitude, longitude, 10)
      .fetch();

    return properties;
  }

  /**
   * Create/save a new property.
   * POST properties
   * @param  {} {auth
   * @param  {} request
   * @param  {} response}
   */
  async store({ auth, request, response }) {
    const { id } = auth.user
    const data = request.only([
      'title',
      'address',
      'latitude',
      'longitude',
      'price'
    ])
  
    const property = await Property.create({ ...data, user_id: id })
  
    return property
  }

  /**
   * Display a single property.
   * GET properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const property = await Property.findOrFail(params.id);

    await property.load("images");

    return property;
  }

  /**
   *
   */
  async update({ params, auth, request, response }) {

    const property = await Property.findOrFail(params.id)

    const data = request.only([
      'title',
      'address',
      'latitude',
      'longitude',
      'price'
    ])
  
    property.merge(data)
  
    await property.save()
  
    return property
  }

  /**
   * @param  {} {params
   * @param  {} auth
   * @param  {} response}
   */
  async destroy({ params, auth, response }) {
    const property = await Property.findOrFail(params.id);

    if (property.user_id !== auth.user.id) {
      return response.status(401).send({ error: "Not authorized" });
    }

    await property.delete();
  }
}

module.exports = PropertyController;
