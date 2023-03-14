import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SkuDbDataSource} from '../datasources';
import {Carrito, CarritoRelations, Compra} from '../models';
import {CompraRepository} from './compra.repository';

export class CarritoRepository extends DefaultCrudRepository<
  Carrito,
  typeof Carrito.prototype.id,
  CarritoRelations
> {

  public readonly compras: HasManyRepositoryFactory<Compra, typeof Carrito.prototype.id>;

  constructor(
    @inject('datasources.skuDB') dataSource: SkuDbDataSource, @repository.getter('CompraRepository') protected compraRepositoryGetter: Getter<CompraRepository>,
  ) {
    super(Carrito, dataSource);
    this.compras = this.createHasManyRepositoryFactoryFor('compras', compraRepositoryGetter,);
    this.registerInclusionResolver('compras', this.compras.inclusionResolver);
  }
}
