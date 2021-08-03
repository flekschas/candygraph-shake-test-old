import { CandyGraph } from 'candygraph';
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = '<canvas id="canvas"></canvas>'

function plot(cg: CandyGraph) {
  // Generate some x & y data.
  const rects = [];
  for (let x = 0; x <= 1; x += 0.1) {
    for (let y = 0; y <= 0.5; y += 0.1) {
      rects.push(x, y, 0.08, 0.08);
    }
  }

  const width = 384;
  const height = 384;

  // Scale the canvas by the device pixel ratio.
  const dpr = window.devicePixelRatio;
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  // Create a viewport. Units are in pixels.
  const viewport = { x: 0, y: 0, width: width * dpr, height: height * dpr };

  const xScale = cg.scale.linear([0, 1], [0, viewport.width]);
  const yScale = cg.scale.linear([0, 1], [0, viewport.height]);

  // Create a coordinate system from two linear scales. Note
  // that we add 32 pixels of padding to the left and bottom
  // of the viewport, and 16 pixels to the top and right.
  const coords = cg.coordinate.cartesian(xScale, yScale);

  // Clear the viewport.
  cg.clear([1, 1, 1, 1]);

  // Render the a line strip representing the x & y data, and axes.
  cg.render(coords, viewport, [
    cg.rects(rects, { colors: [1, 0.5, 0.0, 1.0] }),
  ]);

  // Copy the plot to a new canvas and add it to the document.
  cg.copyTo(viewport, document.getElementById("canvas") as HTMLCanvasElement);
}

const cg = new CandyGraph();
cg.canvas.width = cg.canvas.height = 1024 * window.devicePixelRatio;

plot(cg)