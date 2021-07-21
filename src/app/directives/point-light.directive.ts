import {
  AfterViewInit,
  Directive,
  forwardRef,
  Input
} from '@angular/core';
import { Color, PointLight, PointLightHelper/*, PointLightShadow*/ } from 'three';

import { Base3DObject } from '../base-classes/base-3d-object';

@Directive({
  selector: 'ngthree-point-light',
  providers: [ { provide: Base3DObject, useExisting: forwardRef( () => PointLightDirective ) } ]
})
export class PointLightDirective extends Base3DObject<PointLight> implements AfterViewInit {

  @Input() color: Color | string = new Color(0xFFFFFF);
  @Input() intensity: number = 1;
  @Input() distance: number = 0;
  @Input() decay: number = 1;
  @Input() position: number[] = [0, 0, 0];
  @Input() showHelper: boolean = false;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    const [x, y, z] = this.position;
    this.object = new PointLight(this.color, this.intensity, this.distance, this.decay);
    this.object.position.setX(x);
    this.object.position.setY(y);
    this.object.position.setZ(z);

    if (this.showHelper) {
      this.helper = new PointLightHelper(this.object);
    }

    super.ngAfterViewInit();
  }

}