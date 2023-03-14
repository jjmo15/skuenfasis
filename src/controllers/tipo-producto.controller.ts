import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Tipo,
  Producto,
} from '../models';
import {TipoRepository} from '../repositories';

export class TipoProductoController {
  constructor(
    @repository(TipoRepository) protected tipoRepository: TipoRepository,
  ) { }

  @get('/tipos/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Tipo has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.tipoRepository.productos(id).find(filter);
  }

  @post('/tipos/{id}/productos', {
    responses: {
      '200': {
        description: 'Tipo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tipo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInTipo',
            exclude: ['id'],
            optional: ['tipoId']
          }),
        },
      },
    }) producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.tipoRepository.productos(id).create(producto);
  }

  @patch('/tipos/{id}/productos', {
    responses: {
      '200': {
        description: 'Tipo.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.tipoRepository.productos(id).patch(producto, where);
  }

  @del('/tipos/{id}/productos', {
    responses: {
      '200': {
        description: 'Tipo.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.tipoRepository.productos(id).delete(where);
  }
}
