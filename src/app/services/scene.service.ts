import { Injectable } from '@angular/core';
import { Scene } from 'three';

@Injectable()
export class SceneService {
  
  scene: Scene;

  constructor() {
    this.scene = new Scene();
  }
}
