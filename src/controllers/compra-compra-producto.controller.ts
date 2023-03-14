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
  Compra,
  CompraProducto,
} from '../models';
import {CompraRepository} from '../repositories';

export class CompraCompraProductoController {
  constructor(
    @repository(CompraRepository) protected compraRepository: CompraRepository,
  ) { }

  @get('/compras/{id}/compra-productos', {
    responses: {
      '200': {
        description: 'Array of Compra has many CompraProducto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CompraProducto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CompraProducto>,
  ): Promise<CompraProducto[]> {
    return this.compraRepository.compraProductos(id).find(filter);
  }

  @post('/compras/{id}/compra-productos', {
    responses: {
      '200': {
        description: 'Compra model instance',
        content: {'application/json': {schema: getModelSchemaRef(CompraProducto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Compra.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompraProducto, {
            title: 'NewCompraProductoInCompra',
            exclude: ['id'],
            optional: ['compraId']
          }),
        },
      },
    }) compraProducto: Omit<CompraProducto, 'id'>,
  ): Promise<CompraProducto> {
    return this.compraRepository.compraProductos(id).create(compraProducto);
  }

  @patch('/compras/{id}/compra-productos', {
    responses: {
      '200': {
        description: 'Compra.CompraProducto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompraProducto, {partial: true}),
        },
      },
    })
    compraProducto: Partial<CompraProducto>,
    @param.query.object('where', getWhereSchemaFor(CompraProducto)) where?: Where<CompraProducto>,
  ): Promise<Count> {
    return this.compraRepository.compraProductos(id).patch(compraProducto, where);
  }

  @del('/compras/{id}/compra-productos', {
    responses: {
      '200': {
        description: 'Compra.CompraProducto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CompraProducto)) where?: Where<CompraProducto>,
  ): Promise<Count> {
    return this.compraRepository.compraProductos(id).delete(where);
  }
}
