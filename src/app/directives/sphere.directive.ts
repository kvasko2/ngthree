import {
  AfterViewInit,
  ComponentFactoryResolver,
  Directive,
  forwardRef,
  Input
} from '@angular/core';
import { SphereBufferGeometry } from 'three';

import { BaseGeometry } from '../base-classes/base-geometry';

@Directive({
  selector: 'ngthree-sphere',
  providers: [ { provide: BaseGeometry, useExisting: forwardRef( () => SphereDirective ) } ]
})
export class SphereDirective extends BaseGeometry<SphereBufferGeometry> implements AfterViewInit {

  @Input() radius = 1;
  @Input() widthSegments = 16;
  @Input() heightSegments = 16;

  constructor() { 
    super();
  }

  ngAfterViewInit() {
    this.object = new SphereBufferGeometry(
      this.radius,
      this.widthSegments,
      this.heightSegments
    )
  }

}
