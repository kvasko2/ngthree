import {
  AfterViewInit,
  Directive,
  forwardRef,
  Input
} from '@angular/core';
import {
  MeshStandardMaterial,
  Color,
  FrontSide,
  Side
} from 'three';

import { BaseMaterial } from '../base-classes/base-material';

@Directive({
  selector: 'ngthree-material',
  providers: [ { provide: BaseMaterial, useExisting: forwardRef( () => MaterialDirective ) } ]
})
export class MaterialDirective extends BaseMaterial<MeshStandardMaterial> implements AfterViewInit {

  @Input() color: string = '#000000';
  @Input() side: Side = FrontSide;
  @Input() transparent = false;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    const color = new Color(this.color);
    this.object = new MeshStandardMaterial({
      color: color,
      side: this.side,
      transparent: this.transparent
    });
  }

}
