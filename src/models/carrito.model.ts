import {Entity, model, property, hasMany} from '@loopback/repository';
import {Compra} from './compra.model';

@model()
export class Carrito extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'number',
    required: true,
  })
  precioFinal: number;

  @hasMany(() => Compra)
  compras: Compra[];

  constructor(data?: Partial<Carrito>) {
    super(data);
  }
}

export interface CarritoRelations {
  // describe navigational properties here
}

export type CarritoWithRelations = Carrito & CarritoRelations;
