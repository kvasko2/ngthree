import {
  AfterViewInit,
  ContentChild,
  Directive,
  Input,
  OnDestroy
} from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BaseCamera } from '../base-classes/base-camera';
import { RendererComponent } from '../components/renderer/renderer.component';

@Directive({
  selector: 'ngthree-orbit-controls'
})
export class OrbitControlsDirective implements AfterViewInit, OnDestroy {

  controls!: OrbitControls;

  @ContentChild(BaseCamera) camera!: BaseCamera<any>;
  @ContentChild(RendererComponent) renderer!: RendererComponent;

  @Input() rotateSpeed = 1.0;
  @Input() zoomSpeed = 1.2;

  constructor() { }

  ngAfterViewInit() {
    this.controls = new OrbitControls(this.camera.object, this.renderer.renderer.domElement);
    this.controls.rotateSpeed = this.rotateSpeed;
    this.controls.zoomSpeed = this.zoomSpeed;
    this.controls.addEventListener('change', () => { this.renderer.render(); });
  }

  ngOnDestroy() {
    this.controls.dispose();
  }

}
