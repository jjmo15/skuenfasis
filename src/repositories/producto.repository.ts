import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SkuDbDataSource} from '../datasources';
import {Producto, ProductoRelations, CompraProducto} from '../models';
import {CompraProductoRepository} from './compra-producto.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly compraProductos: HasManyRepositoryFactory<CompraProducto, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.skuDB') dataSource: SkuDbDataSource, @repository.getter('CompraProductoRepository') protected compraProductoRepositoryGetter: Getter<CompraProductoRepository>,
  ) {
    super(Producto, dataSource);
    this.compraProductos = this.createHasManyRepositoryFactoryFor('compraProductos', compraProductoRepositoryGetter,);
    this.registerInclusionResolver('compraProductos', this.compraProductos.inclusionResolver);
  }
}
