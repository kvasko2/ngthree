import { AfterViewInit, Component, NgZone, ViewChild } from '@angular/core';

import { RendererComponent } from '../renderer/renderer.component';

@Component({
  selector: 'ngthree-test-scene',
  templateUrl: './test-scene.component.html',
  styleUrls: ['./test-scene.component.scss']
})
export class TestSceneComponent implements AfterViewInit {

  @ViewChild(RendererComponent) renderer!: RendererComponent;

  constructor(private readonly zone: NgZone) { }

  ngAfterViewInit() {
    // This supposedly might improve performance
    this.zone.runOutsideAngular( _ => {
      const animate = () => {
        requestAnimationFrame(animate);
        this.renderer.render();
      }
      animate();
    });
  }

}
