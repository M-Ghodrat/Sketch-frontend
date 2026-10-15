/**
 * Organic, hand-drawn style starter sketch for the canvas.
 * Draws naturally curved pencil-like strokes instead of geometric circles.
 */

export function renderHandDrawnDoll(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  // Clean white canvas background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.strokeStyle = '#27272a';
  ctx.fillStyle = '#27272a';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const scale = width / 500;
  const cx = width / 2;
  const cy = height / 2;

  // Natural hand-drawn line helper
  const drawSketchLine = (points: [number, number][], lineWidth = 3.5) => {
    if (points.length < 2) return;
    ctx.lineWidth = lineWidth * scale;
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length - 1; i++) {
      const xc = (points[i][0] + points[i + 1][0]) / 2;
      const yc = (points[i][1] + points[i + 1][1]) / 2;
      ctx.quadraticCurveTo(points[i][0], points[i][1], xc, yc);
    }
    ctx.lineTo(points[points.length - 1][0], points[points.length - 1][1]);
    ctx.stroke();
  };

  // 1. Organic Head Outline (soft, rounded, handcrafted jawline)
  drawSketchLine([
    [cx - 75 * scale, cy - 60 * scale],
    [cx - 88 * scale, cy - 10 * scale],
    [cx - 70 * scale, cy + 45 * scale],
    [cx - 30 * scale, cy + 62 * scale],
    [cx + 30 * scale, cy + 62 * scale],
    [cx + 70 * scale, cy + 45 * scale],
    [cx + 88 * scale, cy - 10 * scale],
    [cx + 75 * scale, cy - 60 * scale],
    [cx + 40 * scale, cy - 105 * scale],
    [cx - 40 * scale, cy - 105 * scale],
    [cx - 75 * scale, cy - 60 * scale],
  ], 4);

  // 2. Left Ear with inner fold
  drawSketchLine([
    [cx - 50 * scale, cy - 98 * scale],
    [cx - 82 * scale, cy - 145 * scale],
    [cx - 48 * scale, cy - 165 * scale],
    [cx - 24 * scale, cy - 105 * scale],
  ], 3.5);
  // Inner ear sketch line
  drawSketchLine([
    [cx - 62 * scale, cy - 110 * scale],
    [cx - 70 * scale, cy - 138 * scale],
    [cx - 48 * scale, cy - 145 * scale],
    [cx - 38 * scale, cy - 115 * scale],
  ], 2);

  // 3. Right Ear with inner fold
  drawSketchLine([
    [cx + 24 * scale, cy - 105 * scale],
    [cx + 48 * scale, cy - 165 * scale],
    [cx + 82 * scale, cy - 145 * scale],
    [cx + 50 * scale, cy - 98 * scale],
  ], 3.5);
  // Inner ear sketch line
  drawSketchLine([
    [cx + 38 * scale, cy - 115 * scale],
    [cx + 48 * scale, cy - 145 * scale],
    [cx + 70 * scale, cy - 138 * scale],
    [cx + 62 * scale, cy - 110 * scale],
  ], 2);

  // 4. Soft Chubby Body (organic pear shape)
  drawSketchLine([
    [cx - 42 * scale, cy + 58 * scale],
    [cx - 78 * scale, cy + 95 * scale],
    [cx - 85 * scale, cy + 145 * scale],
    [cx - 45 * scale, cy + 185 * scale],
    [cx + 45 * scale, cy + 185 * scale],
    [cx + 85 * scale, cy + 145 * scale],
    [cx + 78 * scale, cy + 95 * scale],
    [cx + 42 * scale, cy + 58 * scale],
  ], 4);

  // 5. Hand-drawn Left Arm (tucked in cozy pose)
  drawSketchLine([
    [cx - 65 * scale, cy + 85 * scale],
    [cx - 95 * scale, cy + 110 * scale],
    [cx - 88 * scale, cy + 138 * scale],
    [cx - 60 * scale, cy + 128 * scale],
    [cx - 52 * scale, cy + 105 * scale],
  ], 3.5);

  // 6. Hand-drawn Right Arm
  drawSketchLine([
    [cx + 52 * scale, cy + 105 * scale],
    [cx + 60 * scale, cy + 128 * scale],
    [cx + 88 * scale, cy + 138 * scale],
    [cx + 95 * scale, cy + 110 * scale],
    [cx + 65 * scale, cy + 85 * scale],
  ], 3.5);

  // 7. Left Foot (soft chubby amigurumi paw)
  drawSketchLine([
    [cx - 62 * scale, cy + 165 * scale],
    [cx - 75 * scale, cy + 188 * scale],
    [cx - 55 * scale, cy + 205 * scale],
    [cx - 20 * scale, cy + 195 * scale],
    [cx - 15 * scale, cy + 175 * scale],
  ], 3.5);

  // 8. Right Foot
  drawSketchLine([
    [cx + 15 * scale, cy + 175 * scale],
    [cx + 20 * scale, cy + 195 * scale],
    [cx + 55 * scale, cy + 205 * scale],
    [cx + 75 * scale, cy + 188 * scale],
    [cx + 62 * scale, cy + 165 * scale],
  ], 3.5);

  // 9. Hand-drawn Snout / Muzzle oval
  drawSketchLine([
    [cx - 28 * scale, cy - 2 * scale],
    [cx - 32 * scale, cy + 18 * scale],
    [cx, cy + 30 * scale],
    [cx + 32 * scale, cy + 18 * scale],
    [cx + 28 * scale, cy - 2 * scale],
    [cx, cy - 10 * scale],
    [cx - 28 * scale, cy - 2 * scale],
  ], 2.5);

  // 10. Cute Embroidered Nose
  ctx.beginPath();
  ctx.ellipse(cx, cy + 5 * scale, 9 * scale, 6 * scale, 0, 0, Math.PI * 2);
  ctx.fill();

  // 11. Stitched Smile
  drawSketchLine([
    [cx, cy + 11 * scale],
    [cx, cy + 19 * scale],
  ], 2.5);
  drawSketchLine([
    [cx - 12 * scale, cy + 16 * scale],
    [cx - 6 * scale, cy + 22 * scale],
    [cx, cy + 19 * scale],
    [cx + 6 * scale, cy + 22 * scale],
    [cx + 12 * scale, cy + 16 * scale],
  ], 2.5);

  // 12. Friendly Hand-Drawn Eyes with light catch
  ctx.beginPath();
  ctx.arc(cx - 35 * scale, cy - 18 * scale, 6.5 * scale, 0, Math.PI * 2);
  ctx.arc(cx + 35 * scale, cy - 18 * scale, 6.5 * scale, 0, Math.PI * 2);
  ctx.fill();

  // White catch-light in eyes
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx - 37 * scale, cy - 20 * scale, 2 * scale, 0, Math.PI * 2);
  ctx.arc(cx + 33 * scale, cy - 20 * scale, 2 * scale, 0, Math.PI * 2);
  ctx.fill();

  // 13. Tummy patch outline
  drawSketchLine([
    [cx - 30 * scale, cy + 85 * scale],
    [cx - 42 * scale, cy + 125 * scale],
    [cx, cy + 155 * scale],
    [cx + 42 * scale, cy + 125 * scale],
    [cx + 30 * scale, cy + 85 * scale],
  ], 2);

  ctx.restore();
}
