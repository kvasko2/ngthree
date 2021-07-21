import { AfterViewInit, ContentChildren, Directive, QueryList } from '@angular/core';
import { Object3D, PointLightHelper, SpotLightHelper } from 'three';

@Directive()
export abstract class Base3DObject<T extends Object3D> implements AfterViewInit {
  object!: T;
  helper?: PointLightHelper | SpotLightHelper;

  @ContentChildren(Base3DObject, {descendants: true})
  childNodes!: QueryList<Base3DObject<any>>;

  ngAfterViewInit() {
    if (this.childNodes && this.childNodes.length > 1) {
      this.object.add(...this.childNodes.filter(node => node !== this && node.object).map(node => node.helper ? [node.object, node.helper] : node.object).flat());
    }
  }
}