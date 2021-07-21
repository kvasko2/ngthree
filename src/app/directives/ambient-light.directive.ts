import {
  AfterViewInit,
  Directive,
  forwardRef,
  Input
} from '@angular/core';
import { AmbientLight, Color } from 'three';

import { Base3DObject } from '../base-classes/base-3d-object';

@Directive({
  selector: 'ngthree-ambient-light',
  providers: [ { provide: Base3DObject, useExisting: forwardRef( () => AmbientLightDirective ) } ]
})
export class AmbientLightDirective extends Base3DObject<AmbientLight> implements AfterViewInit {

  @Input() color: Color | string = new Color(0xFFFFFF);

  constructor() {
    super();
  }

  ngAfterViewInit() {
    this.object = new AmbientLight(this.color);

    super.ngAfterViewInit();
  }

}
