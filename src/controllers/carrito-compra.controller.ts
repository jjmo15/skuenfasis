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
  Carrito,
  Compra,
} from '../models';
import {CarritoRepository} from '../repositories';

export class CarritoCompraController {
  constructor(
    @repository(CarritoRepository) protected carritoRepository: CarritoRepository,
  ) { }

  @get('/carritos/{id}/compras', {
    responses: {
      '200': {
        description: 'Array of Carrito has many Compra',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Compra)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Compra>,
  ): Promise<Compra[]> {
    return this.carritoRepository.compras(id).find(filter);
  }

  @post('/carritos/{id}/compras', {
    responses: {
      '200': {
        description: 'Carrito model instance',
        content: {'application/json': {schema: getModelSchemaRef(Compra)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Carrito.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compra, {
            title: 'NewCompraInCarrito',
            exclude: ['id'],
            optional: ['carritoId']
          }),
        },
      },
    }) compra: Omit<Compra, 'id'>,
  ): Promise<Compra> {
    return this.carritoRepository.compras(id).create(compra);
  }

  @patch('/carritos/{id}/compras', {
    responses: {
      '200': {
        description: 'Carrito.Compra PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compra, {partial: true}),
        },
      },
    })
    compra: Partial<Compra>,
    @param.query.object('where', getWhereSchemaFor(Compra)) where?: Where<Compra>,
  ): Promise<Count> {
    return this.carritoRepository.compras(id).patch(compra, where);
  }

  @del('/carritos/{id}/compras', {
    responses: {
      '200': {
        description: 'Carrito.Compra DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Compra)) where?: Where<Compra>,
  ): Promise<Count> {
    return this.carritoRepository.compras(id).delete(where);
  }
}
