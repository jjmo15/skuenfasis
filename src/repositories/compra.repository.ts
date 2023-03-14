import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SkuDbDataSource} from '../datasources';
import {Compra, CompraRelations, CompraProducto} from '../models';
import {CompraProductoRepository} from './compra-producto.repository';

export class CompraRepository extends DefaultCrudRepository<
  Compra,
  typeof Compra.prototype.id,
  CompraRelations
> {

  public readonly compraProductos: HasManyRepositoryFactory<CompraProducto, typeof Compra.prototype.id>;

  constructor(
    @inject('datasources.skuDB') dataSource: SkuDbDataSource, @repository.getter('CompraProductoRepository') protected compraProductoRepositoryGetter: Getter<CompraProductoRepository>,
  ) {
    super(Compra, dataSource);
    this.compraProductos = this.createHasManyRepositoryFactoryFor('compraProductos', compraProductoRepositoryGetter,);
    this.registerInclusionResolver('compraProductos', this.compraProductos.inclusionResolver);
  }
}
