/**
 * 4-Way BFS Flood Fill for HTML5 Canvas
 * Fills connected pixels of similar color with a new target color
 */

function hexToRgba(hex: string): [number, number, number, number] {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map((char) => char + char).join('');
  }
  const num = parseInt(c, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255, 255];
}

function colorMatch(
  data: Uint8ClampedArray,
  idx: number,
  targetColor: [number, number, number, number],
  tolerance = 32
): boolean {
  return (
    Math.abs(data[idx] - targetColor[0]) <= tolerance &&
    Math.abs(data[idx + 1] - targetColor[1]) <= tolerance &&
    Math.abs(data[idx + 2] - targetColor[2]) <= tolerance &&
    Math.abs(data[idx + 3] - targetColor[3]) <= tolerance
  );
}

export function floodFillCanvas(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  fillColorHex: string,
  tolerance = 35
): void {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const x = Math.floor(startX);
  const y = Math.floor(startY);

  if (x < 0 || x >= width || y < 0 || y >= height) return;

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const startIndex = (y * width + x) * 4;
  const startColor: [number, number, number, number] = [
    data[startIndex],
    data[startIndex + 1],
    data[startIndex + 2],
    data[startIndex + 3],
  ];

  const fillColor = hexToRgba(fillColorHex);

  // If already the same color, no-op
  if (
    Math.abs(startColor[0] - fillColor[0]) < 5 &&
    Math.abs(startColor[1] - fillColor[1]) < 5 &&
    Math.abs(startColor[2] - fillColor[2]) < 5 &&
    Math.abs(startColor[3] - fillColor[3]) < 5
  ) {
    return;
  }

  // BFS Queue using Uint16Array for performance
  const queue: number[] = [x, y];
  const visited = new Uint8Array(width * height);
  visited[y * width + x] = 1;

  while (queue.length > 0) {
    const curY = queue.pop()!;
    const curX = queue.pop()!;

    const idx = (curY * width + curX) * 4;
    data[idx] = fillColor[0];
    data[idx + 1] = fillColor[1];
    data[idx + 2] = fillColor[2];
    data[idx + 3] = fillColor[3];

    // Check 4 neighbors (Up, Down, Left, Right)
    const neighbors = [
      [curX + 1, curY],
      [curX - 1, curY],
      [curX, curY + 1],
      [curX, curY - 1],
    ];

    for (let i = 0; i < 4; i++) {
      const nx = neighbors[i][0];
      const ny = neighbors[i][1];

      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const vIndex = ny * width + nx;
        if (!visited[vIndex]) {
          const nIdx = vIndex * 4;
          if (colorMatch(data, nIdx, startColor, tolerance)) {
            visited[vIndex] = 1;
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
}
