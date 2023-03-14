import {Entity, model, property, hasMany} from '@loopback/repository';
import {CompraProducto} from './compra-producto.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  inventario: number;

  @property({
    type: 'number',
    required: true,
  })
  precio_unitario: number;

  @property({
    type: 'number',
    required: true,
  })
  unidad_disponible: number;

  @property({
    type: 'number',
  })
  tipoId?: number;

  @hasMany(() => CompraProducto)
  compraProductos: CompraProducto[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
