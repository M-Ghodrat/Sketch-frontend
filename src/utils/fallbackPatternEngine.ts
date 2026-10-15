import { CrochetPattern } from '../types/crochet';

interface PatternOptions {
  description: string;
  yarnWeight: string;
  hookSize: string;
  skillLevel: string;
  sketchColors?: string[];
}

export function generateFallbackCrochetPattern(options: PatternOptions): CrochetPattern {
  const desc = (options.description || '').toLowerCase();
  const hook = options.hookSize || '3.5 mm (E-4)';
  const weight = options.yarnWeight || 'Worsted Weight (Medium 4)';
  const level = (options.skillLevel as CrochetPattern['difficulty']) || 'Easy';

  // Determine character archetype
  let type: 'bear' | 'bunny' | 'cat' | 'mushroom' | 'dino' | 'general' = 'bear';
  if (desc.includes('bunny') || desc.includes('rabbit') || desc.includes('hare')) {
    type = 'bunny';
  } else if (desc.includes('cat') || desc.includes('kitten') || desc.includes('kitty')) {
    type = 'cat';
  } else if (desc.includes('mushroom') || desc.includes('toadstool') || desc.includes('fungus')) {
    type = 'mushroom';
  } else if (desc.includes('dino') || desc.includes('dinosaur') || desc.includes('dragon')) {
    type = 'dino';
  } else if (desc.includes('bear') || desc.includes('teddy') || desc.includes('panda')) {
    type = 'bear';
  } else if (desc.trim().length > 0) {
    type = 'general';
  }

  // Titles & Names
  const titles = {
    bear: 'Barnaby the Forest Bear',
    bunny: 'Pipkin the Floppy Bunny',
    cat: 'Mochi the Chubby Calico',
    mushroom: 'Sprout the Mushroom Sprite',
    dino: 'Pickle the Pocket Dinosaur',
    general: 'Artisan Woolen Amigurumi Friend',
  };

  const title = options.description.trim()
    ? options.description.split(',')[0].slice(0, 40)
    : titles[type];

  // Colors based on archetype and user description
  let mainColorName = 'Honey Wool';
  let mainColorHex = '#92400E';
  let secondaryColorName = 'Cream Ecru';
  let secondaryColorHex = '#FAF5EE';
  let accentColorName = 'Moss Sage';
  let accentColorHex = '#4D7C0F';

  if (type === 'bunny') {
    mainColorName = 'Soft Lilac / Lavender';
    mainColorHex = '#E9D5FF';
    secondaryColorName = 'Pure White';
    secondaryColorHex = '#FFFFFF';
    accentColorName = 'Carrot Orange';
    accentColorHex = '#F97316';
  } else if (type === 'cat') {
    mainColorName = 'Butterscotch Ginger';
    mainColorHex = '#D97706';
    secondaryColorName = 'Vanilla Cream';
    secondaryColorHex = '#FAF5EE';
    accentColorName = 'Rosy Pink';
    accentColorHex = '#FDA4AF';
  } else if (type === 'mushroom') {
    mainColorName = 'Strawberry Red';
    mainColorHex = '#EF4444';
    secondaryColorName = 'Natural Ecru';
    secondaryColorHex = '#FAF5EE';
    accentColorName = 'Forest Green';
    accentColorHex = '#166534';
  } else if (type === 'dino') {
    mainColorName = 'Sage Mint Green';
    mainColorHex = '#A7F3D0';
    secondaryColorName = 'Mustard Gold';
    secondaryColorHex = '#EAB308';
    accentColorName = 'Teal Pop';
    accentColorHex = '#06B6D4';
  }

  const sections = [];

  // 1. Head
  sections.push({
    id: 'sec-head',
    partName: 'Head',
    color: mainColorName,
    notes: 'Worked continuously in rounds. Use a stitch marker on the first stitch of each round.',
    rounds: [
      { id: 'h-1', roundNumber: 'Rnd 1', instruction: 'Make a Magic Ring, 6 sc into ring', stitchCount: 6, notes: 'Pull tail tightly to close hole' },
      { id: 'h-2', roundNumber: 'Rnd 2', instruction: '2 sc in each st around (6 inc)', stitchCount: 12 },
      { id: 'h-3', roundNumber: 'Rnd 3', instruction: '[1 sc, inc] repeat 6 times', stitchCount: 18 },
      { id: 'h-4', roundNumber: 'Rnd 4', instruction: '[2 sc, inc] repeat 6 times', stitchCount: 24 },
      { id: 'h-5', roundNumber: 'Rnd 5', instruction: '[3 sc, inc] repeat 6 times', stitchCount: 30 },
      { id: 'h-6', roundNumber: 'Rnd 6', instruction: '[4 sc, inc] repeat 6 times', stitchCount: 36 },
      { id: 'h-7', roundNumber: 'Rnds 7-12', instruction: 'Sc in each st around (6 rounds even)', stitchCount: 36, notes: 'Insert 9mm safety eyes between Rnds 9 and 10, approx 7 sts apart' },
      { id: 'h-8', roundNumber: 'Rnd 13', instruction: '[4 sc, dec] repeat 6 times', stitchCount: 30, notes: 'Use invisible decrease (dec)' },
      { id: 'h-9', roundNumber: 'Rnd 14', instruction: '[3 sc, dec] repeat 6 times', stitchCount: 24, notes: 'Firmly stuff head with fiberfill' },
      { id: 'h-10', roundNumber: 'Rnd 15', instruction: '[2 sc, dec] repeat 6 times', stitchCount: 18 },
      { id: 'h-11', roundNumber: 'Rnd 16', instruction: '[1 sc, dec] repeat 6 times', stitchCount: 12 },
      { id: 'h-12', roundNumber: 'Rnd 17', instruction: '6 dec around, sl st to first st and fasten off leaving 20cm tail', stitchCount: 6, notes: 'Weave yarn needle through front loops of remaining 6 sts and pull closed' },
    ],
  });

  // 2. Body
  sections.push({
    id: 'sec-body',
    partName: 'Body',
    color: mainColorName,
    notes: 'Worked from bottom up to neck.',
    rounds: [
      { id: 'b-1', roundNumber: 'Rnd 1', instruction: '6 sc in Magic Ring', stitchCount: 6 },
      { id: 'b-2', roundNumber: 'Rnd 2', instruction: '6 inc around', stitchCount: 12 },
      { id: 'b-3', roundNumber: 'Rnd 3', instruction: '[1 sc, inc] repeat 6 times', stitchCount: 18 },
      { id: 'b-4', roundNumber: 'Rnd 4', instruction: '[2 sc, inc] repeat 6 times', stitchCount: 24 },
      { id: 'b-5', roundNumber: 'Rnd 5', instruction: '[3 sc, inc] repeat 6 times', stitchCount: 30 },
      { id: 'b-6', roundNumber: 'Rnds 6-9', instruction: 'Sc in each st around (4 rounds)', stitchCount: 30 },
      { id: 'b-7', roundNumber: 'Rnd 10', instruction: '[3 sc, dec] repeat 6 times', stitchCount: 24 },
      { id: 'b-8', roundNumber: 'Rnds 11-12', instruction: 'Sc in each st around (2 rounds)', stitchCount: 24, notes: 'Start stuffing firmly' },
      { id: 'b-9', roundNumber: 'Rnd 13', instruction: '[2 sc, dec] repeat 6 times', stitchCount: 18 },
      { id: 'b-10', roundNumber: 'Rnd 14', instruction: 'Sc in each st around', stitchCount: 18 },
      { id: 'b-11', roundNumber: 'Rnd 15', instruction: '[1 sc, dec] repeat 6 times, fasten off leaving long sewing tail', stitchCount: 12, notes: 'Stuff firmly to create a steady base' },
    ],
  });

  // 3. Ears / Features
  if (type === 'bunny') {
    sections.push({
      id: 'sec-ears',
      partName: 'Floppy Ears (Make 2)',
      color: mainColorName,
      notes: 'Do not stuff ears. Flatten before sewing.',
      rounds: [
        { id: 'e-1', roundNumber: 'Rnd 1', instruction: '6 sc in Magic Ring', stitchCount: 6 },
        { id: 'e-2', roundNumber: 'Rnd 2', instruction: '[1 sc, inc] repeat 3 times', stitchCount: 9 },
        { id: 'e-3', roundNumber: 'Rnd 3', instruction: '[2 sc, inc] repeat 3 times', stitchCount: 12 },
        { id: 'e-4', roundNumber: 'Rnds 4-10', instruction: 'Sc in each st around (7 rounds)', stitchCount: 12 },
        { id: 'e-5', roundNumber: 'Rnd 11', instruction: '[2 sc, dec] repeat 3 times', stitchCount: 9 },
        { id: 'e-6', roundNumber: 'Rnds 12-14', instruction: 'Sc in each st around (3 rounds), fasten off with tail', stitchCount: 9 },
      ],
    });
  } else if (type === 'cat') {
    sections.push({
      id: 'sec-ears',
      partName: 'Pointed Ears (Make 2)',
      color: mainColorName,
      notes: 'Triangular perky ears. Lightly press flat.',
      rounds: [
        { id: 'e-1', roundNumber: 'Rnd 1', instruction: '4 sc in Magic Ring', stitchCount: 4 },
        { id: 'e-2', roundNumber: 'Rnd 2', instruction: '[1 sc, inc] repeat 2 times', stitchCount: 6 },
        { id: 'e-3', roundNumber: 'Rnd 3', instruction: '[1 sc, inc] repeat 3 times', stitchCount: 9 },
        { id: 'e-4', roundNumber: 'Rnd 4', instruction: '[2 sc, inc] repeat 3 times', stitchCount: 12 },
        { id: 'e-5', roundNumber: 'Rnd 5', instruction: 'Sc in each st around, fasten off leaving tail', stitchCount: 12 },
      ],
    });
  } else if (type === 'mushroom') {
    sections.push({
      id: 'sec-cap',
      partName: 'Mushroom Cap',
      color: mainColorName,
      notes: 'Worked in rich red yarn. Add cream embroidered spots after finishing.',
      rounds: [
        { id: 'c-1', roundNumber: 'Rnd 1', instruction: '6 sc in Magic Ring', stitchCount: 6 },
        { id: 'c-2', roundNumber: 'Rnd 2', instruction: '6 inc around', stitchCount: 12 },
        { id: 'c-3', roundNumber: 'Rnd 3', instruction: '[1 sc, inc] repeat 6 times', stitchCount: 18 },
        { id: 'c-4', roundNumber: 'Rnd 4', instruction: '[2 sc, inc] repeat 6 times', stitchCount: 24 },
        { id: 'c-5', roundNumber: 'Rnd 5', instruction: '[3 sc, inc] repeat 6 times', stitchCount: 30 },
        { id: 'c-6', roundNumber: 'Rnd 6', instruction: '[4 sc, inc] repeat 6 times', stitchCount: 36 },
        { id: 'c-7', roundNumber: 'Rnd 7', instruction: '[5 sc, inc] repeat 6 times', stitchCount: 42 },
        { id: 'c-8', roundNumber: 'Rnds 8-11', instruction: 'Sc in each st around (4 rounds)', stitchCount: 42 },
        { id: 'c-9', roundNumber: 'Rnd 12', instruction: 'In Front Loops Only: [6 sc, inc] repeat 6 times, fasten off', stitchCount: 48, notes: 'Creates the flared mushroom rim' },
      ],
    });
  } else {
    // Bear Ears
    sections.push({
      id: 'sec-ears',
      partName: 'Bear Ears (Make 2)',
      color: mainColorName,
      notes: 'Do not stuff ears. Pin to sides of head between Rnds 4 and 8.',
      rounds: [
        { id: 'e-1', roundNumber: 'Rnd 1', instruction: '6 sc in Magic Ring', stitchCount: 6 },
        { id: 'e-2', roundNumber: 'Rnd 2', instruction: '6 inc around', stitchCount: 12 },
        { id: 'e-3', roundNumber: 'Rnds 3-4', instruction: 'Sc in each st around (2 rounds)', stitchCount: 12 },
        { id: 'e-4', roundNumber: 'Rnd 5', instruction: '[2 sc, dec] repeat 3 times, fasten off leaving long tail', stitchCount: 9 },
      ],
    });
  }

  // 4. Arms
  sections.push({
    id: 'sec-arms',
    partName: 'Arms (Make 2)',
    color: mainColorName,
    notes: 'Lightly stuff lower half only; leave upper half flat for natural sewing.',
    rounds: [
      { id: 'a-1', roundNumber: 'Rnd 1', instruction: '6 sc in Magic Ring', stitchCount: 6 },
      { id: 'a-2', roundNumber: 'Rnd 2', instruction: '[1 sc, inc] repeat 3 times', stitchCount: 9 },
      { id: 'a-3', roundNumber: 'Rnds 3-7', instruction: 'Sc in each st around (5 rounds)', stitchCount: 9 },
      { id: 'a-4', roundNumber: 'Rnd 8', instruction: '1 dec, 7 sc', stitchCount: 8 },
      { id: 'a-5', roundNumber: 'Rnd 9', instruction: 'Sc in each st around, press flat and sc 4 through both layers to close', stitchCount: 4, notes: 'Fasten off with long tail' },
    ],
  });

  // 5. Legs
  sections.push({
    id: 'sec-legs',
    partName: 'Legs / Feet (Make 2)',
    color: mainColorName,
    notes: 'Firmly stuffed at the base to help your doll sit comfortably.',
    rounds: [
      { id: 'l-1', roundNumber: 'Rnd 1', instruction: '6 sc in Magic Ring', stitchCount: 6 },
      { id: 'l-2', roundNumber: 'Rnd 2', instruction: '6 inc around', stitchCount: 12 },
      { id: 'l-3', roundNumber: 'Rnd 3', instruction: '[1 sc, inc] repeat 6 times', stitchCount: 18 },
      { id: 'l-4', roundNumber: 'Rnds 4-5', instruction: 'Sc in each st around (2 rounds)', stitchCount: 18 },
      { id: 'l-5', roundNumber: 'Rnd 6', instruction: '3 sc, 6 dec, 3 sc', stitchCount: 12, notes: 'Shapes the front foot arch' },
      { id: 'l-6', roundNumber: 'Rnds 7-9', instruction: 'Sc in each st around (3 rounds)', stitchCount: 12 },
      { id: 'l-7', roundNumber: 'Rnd 10', instruction: '[2 sc, dec] repeat 3 times, fasten off leaving tail', stitchCount: 9 },
    ],
  });

  // 6. Accessories / Snout
  if (type === 'bear') {
    sections.push({
      id: 'sec-snout',
      partName: 'Snout & Scarf',
      color: secondaryColorName,
      notes: 'Snout worked in cream; scarf worked in accent yarn.',
      rounds: [
        { id: 'sn-1', roundNumber: 'Snout Rnd 1', instruction: '6 sc in Magic Ring with Cream yarn', stitchCount: 6 },
        { id: 'sn-2', roundNumber: 'Snout Rnd 2', instruction: '6 inc around', stitchCount: 12 },
        { id: 'sn-3', roundNumber: 'Snout Rnd 3', instruction: 'Sc in each st around, sl st and fasten off', stitchCount: 12, notes: 'Embroider a small nose & mouth with black embroidery floss' },
        { id: 'sc-1', roundNumber: 'Scarf Row 1', instruction: 'With Accent yarn, ch 45. Starting in 2nd ch from hook, hdc across all chains', stitchCount: 44, notes: 'Fasten off and fringe ends' },
      ],
    });
  }

  return {
    dollTitle: title,
    dollSummary: `A handcrafted amigurumi wool yarn doll inspired by your custom sketch${options.description ? ` (${options.description})` : ''}. Features classic tight single-crochet shaping, balanced circular increases, and soft woolen texture.`,
    difficulty: level,
    estimatedTime: '4 - 6 hours',
    finishedSize: 'approx. 18 cm (7 inches) sitting height',
    gauge: '6 sc x 6 rows = 2.5 cm (1 inch) with chosen hook',
    hookSize: hook,
    yarnWeight: weight,
    yarnColors: [
      {
        name: mainColorName,
        hex: mainColorHex,
        approxYardage: '85 - 100 meters (1 skein)',
        purpose: 'Main head, body, arms, legs, and outer ears',
      },
      {
        name: secondaryColorName,
        hex: secondaryColorHex,
        approxYardage: '25 meters',
        purpose: 'Muzzle, inner ear highlights, tummy patch',
      },
      {
        name: accentColorName,
        hex: accentColorHex,
        approxYardage: '15 meters',
        purpose: 'Little scarf, bow, cap spots or collar details',
      },
      {
        name: 'Soft Black',
        hex: '#18181B',
        approxYardage: '2 meters',
        purpose: 'Embroidered nose, mouth line, and whisker accents',
      },
    ],
    materials: [
      `${weight} Wool Yarn (colors as specified)`,
      `${hook} Crochet Hook`,
      'Pair of 8mm or 9mm black safety eyes',
      'High-grade polyester fiberfill stuffing',
      'Yarn tapestry needle for seaming and embroidery',
      'Locking stitch markers',
      'Straight pins for positioning limbs before sewing',
    ],
    abbreviations: [
      { abbr: 'MR', full: 'Magic Ring', tip: 'Adjustable loop to start circular rounds without a hole' },
      { abbr: 'sc', full: 'Single Crochet', tip: 'Insert hook, yarn over, pull through, yarn over, pull through 2 loops' },
      { abbr: 'inc', full: 'Increase', tip: 'Work 2 single crochets into the same stitch' },
      { abbr: 'dec', full: 'Invisible Decrease', tip: 'Insert hook into front loops of next 2 sts only, yo, pull through both, yo, pull through 2' },
      { abbr: 'ch', full: 'Chain', tip: 'Standard chain stitch for starting foundation' },
      { abbr: 'sl st', full: 'Slip Stitch', tip: 'Used to join or fasten off neatly' },
      { abbr: 'BLO', full: 'Back Loop Only', tip: 'Work stitch into back loop of previous round' },
      { abbr: 'FLO', full: 'Front Loop Only', tip: 'Work stitch into front loop of previous round' },
      { abbr: '[X sts]', full: 'Stitch Count', tip: 'Total number of stitches you should have at the end of the round' },
    ],
    sections,
    assemblyInstructions: [
      {
        stepNumber: 1,
        title: 'Stuffing & Shaping Head',
        description: 'Stuff the head firmly with fiberfill, smoothing out any lumps toward the cheeks. Do not overstuff the neck opening so it stays flat.',
        tips: 'Insert safety eyes before closing beyond Round 14.',
      },
      {
        stepNumber: 2,
        title: 'Attaching Muzzle & Embroidering Face',
        description: 'Pin the snout or muzzle centered horizontally between the safety eyes (approx Rnds 10-14). Sew around using the cream yarn tail, lightly stuffing just before finishing. Embroider an inverted triangle for the nose and a vertical line down to a small mouth.',
        tips: 'Keep tension even on embroidery floss so stitches sink naturally into the wool fibers.',
      },
      {
        stepNumber: 3,
        title: 'Sewing Ears & Head Details',
        description: 'Position ears symmetrically on top of the head between Rounds 4 and 8. Use sewing pins to check angle and alignment from the front. Whip-stitch through both the head stitches and the open ear base.',
      },
      {
        stepNumber: 4,
        title: 'Joining Head to Body',
        description: 'Align the 12 open neck stitches of the body with the base of the head. Add extra stuffing to the neck seam so the head stands upright without wobbling. Whip-stitch every corresponding stitch tightly.',
        tips: 'Take a stitch into the body, then a stitch into the head, pulling firmly every 3 stitches.',
      },
      {
        stepNumber: 5,
        title: 'Attaching Arms & Legs',
        description: 'Pin arms on each side of the body just below the neck seam (Rnd 13 of body). Pin legs at the lower sides (Rnds 4-6) so your doll can sit stably on a table or shelf.',
      },
      {
        stepNumber: 6,
        title: 'Finishing Touches & Accessories',
        description: 'Wrap the little crocheted scarf around the neck or attach the custom accessories from your sketch. Weave in all loose yarn ends inside the doll body.',
        tips: 'Lightly dab dry pink blush powder on the cheeks with a cotton swab for a sweet kawaii finish.',
      },
    ],
    specialStitchesAndTips: [
      'Invisible Decrease: When crocheting in rounds, always use the invisible decrease (inserting hook into front loops only of 2 stitches). It prevents holes and keeps the woolen fabric dense so fiberfill never shows through.',
      'Magic Ring Start: Start every spherical part with a Magic Ring. Pull the yarn tail tight and secure with a knot inside the work.',
      'Yarn Under vs Yarn Over: For the cleanest, cross-like "X" stitches typical of Japanese amigurumi, try "yarn under" instead of "yarn over" on your first pull-through.',
      'Even Stuffing: Tear fiberfill into small cloud-like tufts rather than stuffing one big wad. This creates a smooth, round silhouette without lumps.',
    ],
  };
}
