import { BufferGeometry } from 'three';

export abstract class BaseGeometry<T extends BufferGeometry> {
  object!: T;
}
