import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SkuDbDataSource} from '../datasources';
import {Tipo, TipoRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class TipoRepository extends DefaultCrudRepository<
  Tipo,
  typeof Tipo.prototype.id,
  TipoRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Tipo.prototype.id>;

  constructor(
    @inject('datasources.skuDB') dataSource: SkuDbDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Tipo, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
