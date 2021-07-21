import { AfterViewInit, Directive, forwardRef, Input } from '@angular/core';
import { PerspectiveCamera } from 'three';

import { BaseCamera } from '../base-classes/base-camera';

@Directive({
  selector: 'ngthree-perspective-camera',
  providers: [{provide: BaseCamera, useExisting: forwardRef(() => PerspectiveCameraDirective)}]
})
export class PerspectiveCameraDirective extends BaseCamera<PerspectiveCamera> implements AfterViewInit {

  // Perspective camera properties
  @Input() fov!: number;
  @Input() near!: number;
  @Input() far!: number;
  @Input() position: number[] = [0, 0, 0];

  constructor() { 
    super();
  }

  ngAfterViewInit() {
    const [x, y, z] = this.position;
    this.object = new PerspectiveCamera(this.fov, undefined, this.near, this.far);
    this.object.position.setX(x);
    this.object.position.setY(y);
    this.object.position.setZ(z);
    this.updateAspectRatio(window.innerWidth / window.innerHeight);

    addEventListener('resize', () => { this.updateAspectRatio(window.innerWidth / window.innerHeight); });
  }

  updateAspectRatio(aspect: number) {
    this.object.aspect = aspect;
    this.object.updateProjectionMatrix();
  }

}
