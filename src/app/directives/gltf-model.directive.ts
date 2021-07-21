import {
  AfterViewInit,
  Directive,
  forwardRef,
  Input
} from '@angular/core';
import { Group } from 'three';
//import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { Base3DObject } from '../base-classes/base-3d-object';
import { GltfLoader } from '../utils/gltf-loader';

@Directive({
  selector: 'ngthree-gltf-model',
  providers: [ { provide: Base3DObject, useExisting: forwardRef( () => GltfModelDirective ) } ]
})
export class GltfModelDirective extends Base3DObject<Group> implements AfterViewInit {

  @Input() path!: string;

  constructor(private loader: GltfLoader) {
    super();
  }

  ngAfterViewInit() {
    this.object = new Group();

    this.loadModel();

    super.ngAfterViewInit();
  }

  async loadModel() {
    const result = await this.loader.load(this.path);

    if (result) {
      this.object.add(result.scene);
    } else {
      console.log(`Failed to load GLTF model from path: ${this.path}`);
    }
  }

}
