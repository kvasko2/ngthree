import { Injectable } from '@angular/core';
// Add below later for decoding compressed models
/*import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';*/
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable({ providedIn: 'root' })
export class GltfLoader {
  private loader: GLTFLoader;

  constructor() {
    // Add below later for decoding compressed models
    /*const dracoLoader = new DRACOLoader()
      .setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/')
      .setWorkerLimit(2);*/

    this.loader = new GLTFLoader();//.setDRACOLoader(dracoLoader).setMeshoptDecoder(MeshoptDecoder);
  }

  load(url: string) {
    return this.loader.loadAsync(url);
  }
}