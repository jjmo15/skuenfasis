import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CompraProducto} from '../models';
import {CompraProductoRepository} from '../repositories';

export class CompraProductoController {
  constructor(
    @repository(CompraProductoRepository)
    public compraProductoRepository : CompraProductoRepository,
  ) {}

  @post('/compra-productos')
  @response(200, {
    description: 'CompraProducto model instance',
    content: {'application/json': {schema: getModelSchemaRef(CompraProducto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompraProducto, {
            title: 'NewCompraProducto',
            exclude: ['id'],
          }),
        },
      },
    })
    compraProducto: Omit<CompraProducto, 'id'>,
  ): Promise<CompraProducto> {
    return this.compraProductoRepository.create(compraProducto);
  }

  @get('/compra-productos/count')
  @response(200, {
    description: 'CompraProducto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CompraProducto) where?: Where<CompraProducto>,
  ): Promise<Count> {
    return this.compraProductoRepository.count(where);
  }

  @get('/compra-productos')
  @response(200, {
    description: 'Array of CompraProducto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CompraProducto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CompraProducto) filter?: Filter<CompraProducto>,
  ): Promise<CompraProducto[]> {
    return this.compraProductoRepository.find(filter);
  }

  @patch('/compra-productos')
  @response(200, {
    description: 'CompraProducto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompraProducto, {partial: true}),
        },
      },
    })
    compraProducto: CompraProducto,
    @param.where(CompraProducto) where?: Where<CompraProducto>,
  ): Promise<Count> {
    return this.compraProductoRepository.updateAll(compraProducto, where);
  }

  @get('/compra-productos/{id}')
  @response(200, {
    description: 'CompraProducto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CompraProducto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CompraProducto, {exclude: 'where'}) filter?: FilterExcludingWhere<CompraProducto>
  ): Promise<CompraProducto> {
    return this.compraProductoRepository.findById(id, filter);
  }

  @patch('/compra-productos/{id}')
  @response(204, {
    description: 'CompraProducto PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompraProducto, {partial: true}),
        },
      },
    })
    compraProducto: CompraProducto,
  ): Promise<void> {
    await this.compraProductoRepository.updateById(id, compraProducto);
  }

  @put('/compra-productos/{id}')
  @response(204, {
    description: 'CompraProducto PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() compraProducto: CompraProducto,
  ): Promise<void> {
    await this.compraProductoRepository.replaceById(id, compraProducto);
  }

  @del('/compra-productos/{id}')
  @response(204, {
    description: 'CompraProducto DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.compraProductoRepository.deleteById(id);
  }
}
