import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SkuDbDataSource} from '../datasources';
import {CompraProducto, CompraProductoRelations} from '../models';

export class CompraProductoRepository extends DefaultCrudRepository<
  CompraProducto,
  typeof CompraProducto.prototype.id,
  CompraProductoRelations
> {
  constructor(
    @inject('datasources.skuDB') dataSource: SkuDbDataSource,
  ) {
    super(CompraProducto, dataSource);
  }
}
