import { Camera } from 'three';
import { Base3DObject } from './base-3d-object';

export abstract class BaseCamera<T extends Camera> extends Base3DObject<T> {
  abstract updateAspectRatio(aspect: number): void;
}