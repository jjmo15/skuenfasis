import {Entity, model, property, hasMany} from '@loopback/repository';
import {CompraProducto} from './compra-producto.model';

@model()
export class Compra extends Entity {
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
  subtotal: number;

  @hasMany(() => CompraProducto)
  compraProductos: CompraProducto[];

  @property({
    type: 'number',
  })
  carritoId?: number;

  constructor(data?: Partial<Compra>) {
    super(data);
  }
}

export interface CompraRelations {
  // describe navigational properties here
}

export type CompraWithRelations = Compra & CompraRelations;
