import {Entity, model, property} from '@loopback/repository';

@model()
export class CompraProducto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  descuento: number;

  @property({
    type: 'number',
  })
  productoId?: number;

  @property({
    type: 'number',
  })
  compraId?: number;

  constructor(data?: Partial<CompraProducto>) {
    super(data);
  }
}

export interface CompraProductoRelations {
  // describe navigational properties here
}

export type CompraProductoWithRelations = CompraProducto & CompraProductoRelations;
