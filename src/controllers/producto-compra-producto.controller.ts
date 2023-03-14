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
  Producto,
  CompraProducto,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoCompraProductoController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/compra-productos', {
    responses: {
      '200': {
        description: 'Array of Producto has many CompraProducto',
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
    return this.productoRepository.compraProductos(id).find(filter);
  }

  @post('/productos/{id}/compra-productos', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(CompraProducto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompraProducto, {
            title: 'NewCompraProductoInProducto',
            exclude: ['id'],
            optional: ['productoId']
          }),
        },
      },
    }) compraProducto: Omit<CompraProducto, 'id'>,
  ): Promise<CompraProducto> {
    return this.productoRepository.compraProductos(id).create(compraProducto);
  }

  @patch('/productos/{id}/compra-productos', {
    responses: {
      '200': {
        description: 'Producto.CompraProducto PATCH success count',
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
    return this.productoRepository.compraProductos(id).patch(compraProducto, where);
  }

  @del('/productos/{id}/compra-productos', {
    responses: {
      '200': {
        description: 'Producto.CompraProducto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CompraProducto)) where?: Where<CompraProducto>,
  ): Promise<Count> {
    return this.productoRepository.compraProductos(id).delete(where);
  }
}
