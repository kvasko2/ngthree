import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgThreeRoutingModule } from './ngthree-routing.module';
import { NgThreeComponent } from './ngthree.component';
import { ScrollingCanvasComponent } from './components/scrolling-canvas/scrolling-canvas.component';
import { SceneDirective } from './directives/scene.directive';
import { RendererComponent } from './components/renderer/renderer.component';
import { PerspectiveCameraDirective } from './directives/perspective-camera.directive';
import { SphereDirective } from './directives/sphere.directive';
import { MaterialDirective } from './directives/material.directive';
import { MeshDirective } from './directives/mesh.directive';
import { TestSceneComponent } from './components/test-scene/test-scene.component';
import { PointLightDirective } from './directives/point-light.directive';
import { AmbientLightDirective } from './directives/ambient-light.directive';
import { OrbitControlsDirective } from './directives/orbit-controls.directive';
import { GltfModelDirective } from './directives/gltf-model.directive';

@NgModule({
  declarations: [
    NgThreeComponent,
    ScrollingCanvasComponent,
    SceneDirective,
    RendererComponent,
    PerspectiveCameraDirective,
    SphereDirective,
    MaterialDirective,
    MeshDirective,
    TestSceneComponent,
    PointLightDirective,
    AmbientLightDirective,
    OrbitControlsDirective,
    GltfModelDirective
  ],
  imports: [
    BrowserModule,
    NgThreeRoutingModule
  ],
  providers: [],
  bootstrap: [NgThreeComponent]
})
export class NgThreeModule { }
