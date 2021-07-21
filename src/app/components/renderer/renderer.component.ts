import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import {
  AfterViewInit,
  Component,
  ContentChild, 
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import { Color, WebGLRenderer } from 'three';

import { SceneDirective } from '../../directives/scene.directive';
import { BaseCamera } from '../../base-classes/base-camera';

@Component({
  selector: 'ngthree-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss']
})
export class RendererComponent implements AfterViewInit {
  renderer!: WebGLRenderer;

  @ViewChild('canvas') canvasRef!: ElementRef;
  get canvas(): HTMLCanvasElement { return this.canvasRef.nativeElement; }

  @ContentChild(SceneDirective) scene!: SceneDirective;
  @ContentChild(BaseCamera) camera!: BaseCamera<any>;

  @Input() color: string | number | Color = 0x000000;
  @Input() alpha = 1;

  constructor() { }

  ngAfterViewInit(): void {
    this.renderer = new WebGLRenderer( {canvas: this.canvas, antialias: true, alpha: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(this.color, this.alpha);
    this.renderer.autoClear = true;

    addEventListener('resize', () => { this.renderer.setSize(window.innerWidth, window.innerHeight); });
  }

  render() {
    this.renderer.render ( this.scene.object, this.camera.object );
  }
}
