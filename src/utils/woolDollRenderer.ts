/**
 * Generates an amigurumi crochet wool visual design representation
 * from the user's sketch with authentic woolen yarn texture overlay,
 * soft lighting, and plush crafting studio atmosphere.
 */

export function createWoolDollRender(sketchDataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const size = 600;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(sketchDataUrl);
        return;
      }

      // 1. Warm cozy craft studio background
      const bgGrad = ctx.createRadialGradient(
        size / 2,
        size / 2 - 40,
        50,
        size / 2,
        size / 2,
        size * 0.75
      );
      bgGrad.addColorStop(0, '#FFFDF8');
      bgGrad.addColorStop(0.6, '#F8F1E5');
      bgGrad.addColorStop(1, '#E9DECE');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, size, size);

      // Subtle wooden craft table surface at bottom
      const tableGrad = ctx.createLinearGradient(0, size - 90, 0, size);
      tableGrad.addColorStop(0, 'rgba(215, 195, 170, 0.4)');
      tableGrad.addColorStop(1, 'rgba(180, 155, 125, 0.6)');
      ctx.fillStyle = tableGrad;
      ctx.fillRect(0, size - 90, size, 90);

      // Soft drop shadow for doll on the table
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(size / 2, size - 85, size * 0.32, 22, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(70, 50, 30, 0.18)';
      ctx.filter = 'blur(12px)';
      ctx.fill();
      ctx.restore();

      // 2. Draw user's colored sketch with plush amigurumi softness
      ctx.save();
      const padding = 70;
      const dw = size - padding * 2;
      const dh = size - padding * 2;
      ctx.drawImage(img, padding, padding - 15, dw, dh);
      ctx.restore();

      // 3. Overlay authentic woolen yarn micro-stitches texture
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = '#2d1b09';
      ctx.lineWidth = 1;
      const step = 6;
      for (let y = padding; y < size - padding; y += step) {
        for (let x = padding; x < size - padding; x += step) {
          // Alternating tiny "v" crochet single stitches
          ctx.beginPath();
          ctx.moveTo(x - 2, y - 2);
          ctx.lineTo(x, y + 2);
          ctx.lineTo(x + 2, y - 2);
          ctx.stroke();
        }
      }
      ctx.restore();

      // 4. Soft woolen fibrous fuzz on edges
      ctx.save();
      ctx.globalAlpha = 0.05;
      const radialShine = ctx.createRadialGradient(
        size * 0.35,
        size * 0.3,
        20,
        size / 2,
        size / 2,
        size * 0.45
      );
      radialShine.addColorStop(0, '#ffffff');
      radialShine.addColorStop(1, 'transparent');
      ctx.fillStyle = radialShine;
      ctx.fillRect(0, 0, size, size);
      ctx.restore();

      // 5. Handcrafted watermark badge
      ctx.save();
      ctx.fillStyle = 'rgba(120, 80, 40, 0.7)';
      ctx.font = '600 12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('🧶 Amigurumi Wool Design', size - 24, size - 20);
      ctx.restore();

      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = () => {
      resolve(sketchDataUrl);
    };

    img.src = sketchDataUrl;
  });
}
