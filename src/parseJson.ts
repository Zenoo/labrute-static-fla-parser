import { FramePart, Svg, Symbol } from './common';
import fs from 'fs';

type Json = {
  elements?: [DOMSymbolItem];
};

type DOMSymbolItem = {
  name: 'DOMSymbolItem';
  attributes?: {
    xmlns?: string;
    ['xmlns:xsi']?: string;
    name?: string;
    lastModified?: string;
  };
  elements?: [timeline];
};

type timeline = {
  name: 'timeline';
  elements?: [DOMTimeline];
};

type DOMTimeline = {
  name: 'DOMTimeline';
  attributes?: {
    name?: string;
  };
  elements?: [layers];
};

type layers = {
  name: 'layers';
  elements?: [DOMLayer];
};

type DOMLayer = {
  name: 'DOMLayer';
  attributes?: {
    name?: string;
    color?: string;
    current?: string;
    isSelected?: string;
  };
  elements?: [frames];
};

type frames = {
  name: 'frames';
  elements?: DOMFrame[];
};

type DOMFrame = {
  name: 'DOMFrame';
  attributes?: {
    index?: string;
    keyMode?: string;
    duration?: string;
    motionTweenScale?: string;
  };
  elements?: (elements | ActionScript)[];
};

type elements = {
  name: 'elements';
  elements?: [DOMShape | DOMSymbolInstance];
};

type ActionScript = {
  name: 'ActionScript';
  elements?: [script];
};

type script = {
  name: 'script';
};

type DOMShape = {
  name: 'DOMShape';
  attributes?: {
    isFloating?: string;
  };
  elements?: (fills | strokes | edges)[];
};

type fills = {
  name: 'fills';
  elements?: FillStyle[];
};

type FillStyle = {
  name: 'FillStyle';
  attributes?: {
    index?: string;
  };
  elements?: [SolidColor | RadialGradient];
};

type SolidColor = {
  name: 'SolidColor';
  attributes?: {
    color?: string;
    alpha?: string;
  };
};

type RadialGradient = {
  name: 'RadialGradient';
  attributes?: {
    focalPointRatio?: string;
  };
  elements?: (matrix | GradientEntry)[];
};

type matrix = {
  name: 'matrix';
  elements?: [Matrix];
};

type Matrix = {
  name: 'Matrix';
  attributes?: {
    a?: string;
    b?: string;
    c?: string;
    d?: string;
    tx?: string;
    ty?: string;
  };
};

type strokes = {
  name: 'strokes';
  elements?: StrokeStyle[];
};

type StrokeStyle = {
  name: 'StrokeStyle';
  attributes?: {
    index?: string;
  };
  elements?: [SolidStroke];
};

type SolidStroke = {
  name: 'SolidStroke';
  attributes?: {
    scaleMode?: string;
    weight?: string;
  };
  elements?: [fill];
};

type fill = {
  name: 'fill';
  elements?: [SolidColor];
};

type edges = {
  name: 'edges';
  elements?: Edge[];
};

type Edge = {
  name: 'Edge';
  attributes?: {
    fillStyle0?: string;
    fillStyle1?: string;
    strokeStyle?: string;
    edges?: string;
  };
};

type GradientEntry = {
  name: 'GradientEntry';
  attributes?: {
    color?: string;
    alpha?: string;
    ratio?: string;
  };
};

type DOMSymbolInstance = {
  name: 'DOMSymbolInstance',
  attributes?: {
    libraryItemName?: string;
    name?: string;
    centerPoint3DX?: string;
    centerPoint3DY?: string;
  };
  elements?: (matrix | transformationPoint | color)[];
};

type transformationPoint = {
  name: 'transformationPoint';
  elements?: [Point];
};

type Point = {
  name: 'Point';
};

type color = {
  name: 'color';
  elements?: [Color];
};

type Color = {
  name: 'Color';
  attributes?: {
    redOffset?: string;
    greenOffset?: string;
    blueOffset?: string;
    alphaMultiplier?: string;
  };
};

// Some symbols XML call different SVGs, this is a map in their order of appearance
const SVGLinks: Record<number, number[] | undefined> = {
  9: [1, 8],
  11: [10],
  13: [12],
  16: [15],
  20: [20],
  22: [22],
  25: [24],
  27: [26],
  29: [28],
  32: [31],
  33: [30],
  38: [37],
  40: [39],
  43: [42],
  51: [51],
  57: [45, 46, 47, 48, 49, 50, 52, 53, 54, 55, 56],
  58: [58],
  61: [60],
  65: [65],
  71: [70],
  72: [72],
  73: [73],
  75: [75],
  78: [77],
  80: [79],
  82: [81],
  84: [83],
  87: [86],
  89: [88],
  96: [95],
  98: [98],
  102: [101],
  103: [103],
  104: [100],
  106: [105],
  108: [107],
  112: [112],
  114: [114],
  116: [116],
  119: [118],
  122: [121],
  124: [123],
  126: [125],
  128: [127],
  131: [130],
  132: [120, 129],
  134: [133],
  140: [139],
  142: [141],
  144: [143],
  147: [146],
  150: [149],
  152: [151, 148],
  154: [153],
  156: [155],
  158: [158],
  161: [157, 160],
  167: [166],
  169: [168],
  172: [171],
  173: [173],
  174: [170],
  175: [175],
  177: [176],
  182: [181],
  184: [183],
  187: [186],
  189: [188],
  191: [190],
  193: [192],
  195: [185, 194],
  199: [199],
  201: [201],
  209: [208],
  211: [210],
  213: [212],
  216: [215],
  219: [218, 217],
  221: [220],
  223: [222],
  227: [224, 226],
  232: [232],
  235: [234],
  237: [236],
  239: [238],
  242: [241],
  244: [244],
  247: [246],
  248: [243],
  249: [249],
  252: [251],
  254: [253],
  256: [255],
  258: [257],
  259: [259],
  261: [260],
  263: [240],
  268: [267],
  270: [269],
  272: [271],
  276: [275],
  277: [277],
  278: [278],
  281: [280],
  283: [282],
  285: [284],
  288: [287],
  291: [290],
  293: [292, 289],
  295: [294],
  297: [296],
  299: [298],
  301: [300],
  303: [302],
  305: [304],
  307: [306],
  308: [308],
  312: [312],
  315: [314],
  317: [316, 310, 311],
  320: [319],
  322: [321],
  324: [323],
  326: [325],
  328: [318],
  333: [332],
  336: [335],
  337: [337],
  338: [334],
  340: [339],
  343: [341, 342],
  345: [344],
  347: [346],
  351: [350],
  354: [353],
  356: [355],
  359: [358],
  361: [360],
  363: [362],
  364: [357],
  366: [365],
  368: [367],
  371: [370],
  373: [372],
  375: [374],
  377: [376],
  379: [378],
  382: [380, 381],
  385: [384],
  387: [386],
  390: [389],
  392: [391],
  394: [393],
  396: [395],
  398: [397],
  399: [352, 369, 383, 388],
  402: [401],
  404: [403],
  407: [406],
  417: [416],
  419: [418],
  421: [420],
  425: [424],
  427: [426, 423],
  430: [428, 422],
  435: [434],
  437: [436],
  439: [438],
  441: [440],
  443: [442],
  445: [444],
  447: [446],
  449: [448],
  451: [450],
  453: [452],
  455: [454],
  462: [461],
  464: [463],
  465: [465],
  467: [466],
  469: [468],
  475: [474],
  477: [476],
  480: [479],
  490: [489],
  494: [493],
  496: [495],
  505: [504],
  507: [506],
  509: [508],
  517: [516],
  520: [519],
  522: [521],
  525: [524],
  527: [526],
  529: [528],
  536: [535],
  538: [537],
  540: [539],
  543: [542],
  546: [545],
  548: [547],
  550: [549],
  551: [544],
  555: [555],
  558: [557],
  560: [559],
  562: [561],
  564: [563],
  570: [569],
  573: [572],
  575: [574],
  578: [577],
  580: [579],
  583: [582],
  584: [581],
  592: [591],
  593: [593],
  603: [602],
  604: [601],
  610: [609],
  613: [612],
  615: [614],
  617: [616],
  619: [618],
  622: [621],
  623: [620],
  625: [624],
  628: [627],
  630: [629],
  632: [631],
  634: [633],
  635: [626, 611],
  641: [641],
  643: [643],
  645: [644],
  646: [646],
  649: [648],
  652: [651],
  654: [653],
  657: [656],
  659: [659],
  662: [662],
  664: [663],
  666: [665],
  669: [668],
  672: [671],
  674: [673],
  676: [661, 670],
  681: [680],
  685: [684],
  687: [686],
  689: [688],
  691: [690],
  693: [692],
  695: [695],
  698: [697],
  699: [699],
  703: [702],
  705: [704],
  707: [706],
  709: [708],
  711: [710],
  715: [714],
  717: [716],
  720: [719],
  729: [728],
  732: [731],
  734: [733],
  741: [740],
  743: [742],
  745: [744],
  747: [746],
  748: [739],
};

// Some symbols XML define their own SVG in multiple DOMShapes, list them here to override the parts later
const XMLExportingThemselves: number[] = [
  51,
  103,
  116,
  173,
  201,
  244,
  249,
  259,
  277,
  278,
  308,
  312,
  555,
  593,
  641,
  643,
  646,
  659,
  662,
  695,
  699,
];

const customSvgScale: Record<number, number> = {
  // Jacket
  267: 4,
  280: 4,
  // Female eyes
  341: 4,
  342: 4,
  337: 4,
  344: 4,
  346: 4,
  // Female upper arm
  58: 1.5,
  // Female lower arm
  728: 1.5,
  // Female hair
  697: 1.5,
  // Female shoulder pads
  72: 2,
  73: 4,
  75: 1.5,
  // Female ear
  686: 1.5,
  // Male eyes
  334: 4,
  335: 4,
  339: 4,
  // Male special jacket
  269: 4,
  282: 4,
  // Male hair
  374: 4,
  376: 4,
};

// Some parts only have one frame even though they depend on a partIdx, so ignore them
const ignoreParts: number[] = [
  409,
  431,
  725,
  736,
];

const getSvg = (symbolName: string, svgIndex: number): Svg => {
  const name = symbolName.split(' ').join('');
  let svgNumber = +name.replace('Symbol', '');
  let svg = '';

  // Check if svg is in the links
  const svgLink = SVGLinks[svgNumber]?.[svgIndex];

  if (!svgLink) {
    // Missing SVG link
    throw new Error(`Missing SVG links for ${name}`);
  } else {
    svgNumber = svgLink;
  }

  try {
    // Get the svg file
    svg = fs.readFileSync(`./src/svg/${svgNumber}.svg`, 'utf8');
  } catch (error) {
    throw new Error(`SVG ${svgLink} not found for ${name}. Export it and rerun the script.`);
  }

  const svgScale = customSvgScale[svgNumber] ?? 1;
  const strokeWidth = 1 / svgScale;

  // Set every stroke-width to 1 (scaled)
  svg = svg.replace(/stroke-width="[^"]+"/g, `stroke-width="${strokeWidth}"`);

  // Increase svg width by 2 (scaled)
  svg = svg.replace(/width="([^"]+)px"/, (_, width) => `width="${+width + (strokeWidth * 2)}px"`);

  // Increase svg height by 2 (scaled)
  svg = svg.replace(/height="([^"]+)px"/, (_, height) => `height="${+height + (strokeWidth * 2)}px"`);

  // Increase tx and ty by 1 (scaled)
  svg = svg.replace(/<g transform="matrix\(1.0, 0.0, 0.0, 1.0, ([^,]+), ([^,]+)\)">/, (_, tx, ty) => `<g transform="matrix(1.0, 0.0, 0.0, 1.0, ${+tx + strokeWidth}, ${+ty + strokeWidth})">`);

  // Get the offset values from the svg file
  const offset = svg.match(/<g transform="matrix\(1.0, 0.0, 0.0, 1.0, (.*), (.*)\)">/);

  const object: Svg = {
    type: 'svg',
    name: `Symbol${svgNumber}`,
    svg,
    offset: {
      x: offset ? +offset[1] : 0,
      y: offset ? +offset[2] : 0,
    },
  };

  // Custom scale
  if (customSvgScale[svgNumber]) {
    object.scale = customSvgScale[svgNumber];
  }

  return object;
};

const parseSymbol = (symbolItem?: DOMSymbolItem): Symbol => {
  if (!symbolItem) {
    throw new Error('No symbolItem');
  }

  const symbolName = symbolItem.attributes?.name || '';
  const symbolNumber = +symbolName.replace('Symbol', '');

  let svgIndex = 0;

  const result: Symbol = {
    type: 'symbol',
    name: (symbolItem.attributes?.name || '').split(' ').join(''),
    parts: [],
    frames: [],
  };

  if (!result.frames) {
    throw new Error('No frames');
  }

  // Check if an override exists
  const override = XMLExportingThemselves.find((number) => number === symbolNumber);
  if (override) {
    const svg = getSvg(`Symbol${override}`, svgIndex);

    // Store part details
    result.parts?.push(svg);

    // Store part frame details
    result.frames[0] = [{
      type: 'svg',
      name: svg.name,
    }];

    return result;
  }

  const layers = symbolItem.elements?.[0].elements?.[0].elements?.[0].elements;

  // Go through all layers
  for (const layer of layers || []) {
    const frames = layer.elements?.[0].elements;

    if (!frames) {
      continue;
    }

    for (const frame of frames || []) {
      const elements = frame.elements?.find((element) => element.name === 'elements')?.elements as (DOMShape | DOMSymbolInstance)[] | undefined;

      for (const element of elements || []) {
        const index = frame.attributes?.index ? +frame.attributes.index : 0;

        // Sub symbol
        if (element.name === 'DOMSymbolInstance') {
          const colors = element.elements?.find((element) => element.name === 'color')?.elements?.[0] as Color | undefined;
          const matrix = element.elements?.find((element) => element.name === 'matrix')?.elements?.[0] as Matrix | undefined;

          const customIndex = element.attributes?.name;
          let partIdx = customIndex ? customIndex.startsWith('_p') ? customIndex : undefined : undefined;
          const colorIdx = customIndex ? customIndex.startsWith('_col') ? customIndex : undefined : undefined;

          // Check if part is ignored
          if (ignoreParts.includes(+(element.attributes?.libraryItemName || '').split(' ')[1])) {
            partIdx = undefined;
          }

          // Store part details
          result.parts?.push({
            type: 'symbol',
            name: (element.attributes?.libraryItemName || '').split(' ').join(''),
            partIdx,
            colorIdx,
          });

          // Store part frame details
          if (!result.frames[index]) {
            result.frames[index] = [];
          }

          const frameData = {
            type: 'symbol' as const,
            name: (element.attributes?.libraryItemName || '').split(' ').join(''),
            colorOffset: colors ? {
              r: +(colors.attributes?.redOffset || 0),
              g: +(colors.attributes?.greenOffset || 0),
              b: +(colors.attributes?.blueOffset || 0),
            } : undefined,
            alpha: (colors && colors.attributes?.alphaMultiplier) ? +colors.attributes.alphaMultiplier : undefined,
            transform: matrix ? {
              tx: matrix.attributes?.tx ? +matrix.attributes.tx : undefined,
              ty: matrix.attributes?.ty ? +matrix.attributes.ty : undefined,
              a: matrix.attributes?.a ? +matrix.attributes.a : undefined,
              d: matrix.attributes?.d ? +matrix.attributes.d : undefined,
              b: matrix.attributes?.b ? +matrix.attributes.b : undefined,
              c: matrix.attributes?.c ? +matrix.attributes.c : undefined,
            } : undefined,
          };
          result.frames[index].push(frameData);

          // Add to next frames if duration exists
          const duration = frame.attributes?.duration;
          if (duration) {
            for (let i = 1; i < +duration; i++) {
              if (!result.frames[index + i]) {
                result.frames[index + i] = [];
              }
              result.frames[index + i].push(frameData);
            }
          }

          continue;
        }

        if (element.name === 'DOMShape') {
          // Svg
          const svgName = symbolItem.attributes?.name || '';

          const svg = getSvg(svgName, svgIndex);

          // Store part details
          result.parts?.push(svg);

          // Store part frame details
          if (!result.frames[index]) {
            result.frames[index] = [];
          }

          const svgObject = {
            type: 'svg',
            name: svg.name,
          } as FramePart;

          result.frames[index].push(svgObject);

          // Add to next frames if duration exists
          const duration = frame.attributes?.duration;
          if (duration) {
            for (let i = 1; i < +duration; i++) {
              if (!result.frames[index + i]) {
                result.frames[index + i] = [];
              }
              result.frames[index + i].push(svgObject);
            }
          }

          svgIndex++;
        }
      }
    }
  }

  // Special case for 57 (weapons), add mask to every symbol except 44 and 45
  if (symbolNumber === 57) {
    for (const frame of result.frames) {
      for (const part of frame) {
        if (part.name !== 'Symbol44' && part.name !== 'Symbol45') {
          part.maskedBy = 45;
        }
      }
    }
  }

  // Revert parts
  if (result.parts) {
    result.parts.reverse();
  }

  // Initialize empty frames
  for (let i = 0; i < result.frames.length; i++) {
    if (!result.frames[i]) {
      result.frames[i] = [];
    }
  }

  return result;
};

export const parseJson = (jsonString: string): Symbol => {
  const json: Json = JSON.parse(jsonString);
  const symbol = parseSymbol(json.elements?.[0]);

  return symbol;
};