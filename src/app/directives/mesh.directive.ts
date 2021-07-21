import {
  AfterViewInit,
  ContentChild,
  forwardRef,
  Input,
  Directive
} from '@angular/core';
import {
  Mesh,
  MeshStandardMaterial
  //Vector3
} from 'three';

import { Base3DObject } from '../base-classes/base-3d-object';
import { BaseMaterial } from '../base-classes/base-material';
import { BaseGeometry } from '../base-classes/base-geometry';

@Directive({
  selector: 'ngthree-mesh',
  providers: [ { provide: Base3DObject, useExisting: forwardRef( () => MeshDirective ) } ]
})
export class MeshDirective extends Base3DObject<Mesh> implements AfterViewInit {

  @ContentChild(BaseGeometry) geometry!: BaseGeometry<any>;
  @ContentChild(BaseMaterial) material!: BaseMaterial<any>;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    this.object = new Mesh(
      this.geometry.object,
      this.material && this.material.object || new MeshStandardMaterial({color: 0x000000})
    );
    super.ngAfterViewInit();
  }

}
