import { Material } from 'three';

export abstract class BaseMaterial<T extends Material> {
  object!: T;
}