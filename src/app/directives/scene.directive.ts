import { AfterViewInit, Directive, forwardRef } from '@angular/core';
import { Scene } from 'three';

import { Base3DObject } from '../base-classes/base-3d-object';

@Directive({
  selector: 'ngthree-scene',
  // Documentation link, just in case this changes soon - https://angular.io/guide/dependency-injection-navtree#find-a-parent-by-its-class-interface
  providers: [{provide: Base3DObject, useExisting: forwardRef(() => SceneDirective)}]
})
export class SceneDirective extends Base3DObject<Scene> implements AfterViewInit {

  object!: Scene;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    this.object = new Scene();
    super.ngAfterViewInit();
    console.log('scene: ', this.object);
  }
}
