const Marzipano = require('marzipano');

import Hotspot from './Hotspot';

/**
 * Virtual reality 360 player library
 */
export default class VR360Player {
  constructor(dom: HTMLElement) {

    const hotspot = new Hotspot(0, 0);
    hotspot.pitch = 10;

    setTimeout(() => {
      hotspot.pitch = 200;
    }, 2000)

    // Create viewer.
    var viewer = new Marzipano.Viewer(dom);

    // Create source.
    var source = Marzipano.ImageUrlSource.fromString(
      "//www.marzipano.net/media/cubemap/{f}.jpg"
    );

    // Create geometry.
    var geometry = new Marzipano.CubeGeometry([{ tileSize: 1024, size: 1024 }]);

    // Create view.
    var limiter = Marzipano.RectilinearView.limit.traditional(4096, 100 * Math.PI / 180);
    var view = new Marzipano.RectilinearView(null, limiter);

    // Create scene.
    var scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    });

    // Display scene.
    scene.switchTo();
  }
}