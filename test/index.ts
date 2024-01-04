import * as PIXI from 'pixi.js';
import { Filter, Texture } from 'pixi.js';
import { FramePart, Svg, Symbol } from '../src/common';
import ColorOffsetShader from './ColorOffsetShader';
import { PixiHelper } from './PixiHelper';
import { Symbol752 } from '../src/Symbols/Symbol752';
import { Symbol460 } from '../src/Symbols/Symbol460';

const FEMALE_SYMBOL = Symbol752;
const MALE_SYMBOL = Symbol460;

const SCALE = 1;

const app = new PIXI.Application<HTMLCanvasElement>({
  backgroundColor: 0xfbf7c0,
  width: 200,
  height: 250,
  antialias: true,
  autoDensity: true,
  resolution: window.devicePixelRatio,
});

document.body.appendChild(app.view);
document.body.style.backgroundColor = '#333';

const viewport = app.stage.addChild(new PIXI.Container());
viewport.sortableChildren = true;
app.renderer.render(app.stage);
app.stage.addChild(viewport);

type SvgsToLoad = {
  svg: Svg;
  count: number;
}[];

class Fighter {
  // Setup data
  type: 'male' | 'female';
  #colors: Record<string, string> = {};
  #parts: Record<string, number> = {};
  readonly #editable: boolean;
  
  // PIXI
  readonly container: PIXI.Container;
  readonly symbol: Symbol;

  svgs: PIXI.Sprite[] = [];
  #usedSvgs: Record<string, number> = {};

  constructor(bruteState: BruteState, editable: boolean, x?: number, y?: number) {
    this.type = bruteState.type;
    this.#editable = editable;
    this.#colors = bruteState.colors;
    this.#parts = bruteState.parts;

    const symbolContainer = new PIXI.Container();
    symbolContainer.sortableChildren = true;
    symbolContainer.x = x ?? 0;
    symbolContainer.y = y ?? 0;

    this.container = symbolContainer;
    this.symbol = this.type === 'male' ? MALE_SYMBOL : FEMALE_SYMBOL;

    const svgsToLoad: SvgsToLoad = [];
    this.#initializeContainersAndGetSvgsToLoad(svgsToLoad, this.container, this.symbol.parts, this.symbol.frames?.[0]);

    // Load SVGs
    this.#loadSvgs(svgsToLoad);

    // Display frame
    this.#usedSvgs = {};
    this.#displayFrame(this.container, this.symbol);
  }

  updateBrute(bruteState: BruteState) {
    if (!this.#editable) {
      throw new Error('This fighter is not editable');
    }

    this.#colors = bruteState.colors;
    this.#parts = bruteState.parts;

    // Hide all svgs
    this.svgs.forEach((svg) => svg.visible = false);

    // Display frame
    this.#usedSvgs = {};
    this.#displayFrame(this.container, this.symbol);
  }

  #initializeContainersAndGetSvgsToLoad = (
    svgsToLoad: SvgsToLoad,
    symbolContainer: PIXI.Container,
    parts: Symbol['parts'],
    frame: FramePart[] = [],
  ) => {
    frame.forEach((framePart, i) => {
      const symbol = parts?.find(p => p.name === framePart.name);

      if (!symbol) {
        throw new Error(`Part ${framePart.name} not found in symbol ${symbolContainer.name}`);
      }

      // SVG
      if (symbol.type === 'svg') {
        const existingSvg = svgsToLoad.find(s => s.svg.name === symbol.name);
        if (existingSvg) {
          existingSvg.count++;
        } else {
          svgsToLoad.push({
            svg: symbol,
            count: 1,
          });
        }
      } else {
        // Symbol

        const container = new PIXI.Container();
        container.sortableChildren = true;
        container.name = symbol.name;
        container.visible = false;
        container.zIndex = frame.length - i;

        symbolContainer.addChild(container);

        // Get frames to load
        let framesToLoad: number[] = [];

        // If symbol has partIdx
        if (symbol.partIdx) {
          // If editable, load all frames
          if (this.#editable) {
            framesToLoad = symbol.frames?.map((_, i) => i) ?? [];
          } else {
            // Else load only the corresponding frame
            const partValue = this.#parts[symbol.partIdx];

            if (partValue === undefined) {
              throw new Error(`Part ${symbol.partIdx} not found in fighter config`);
            }

            framesToLoad = [partValue];
          }
        } else {
          // Load only the first frame
          framesToLoad = [0];
        }

        // For each frame, load the corresponding SVGs
        for (const frameIdx of framesToLoad) {
          const frame = symbol.frames?.[frameIdx];
          if (!frame) {
            continue;
          }

          this.#initializeContainersAndGetSvgsToLoad(svgsToLoad, container, symbol.parts, frame);
        }
      }
    });
  }

  #loadSvgs = (svgsToLoad: SvgsToLoad) => {
    for (const svgToLoad of svgsToLoad) {
      const svg = svgToLoad.svg;

      for (let i = 0; i < svgToLoad.count; i++) {
        // Custom scale
        let customScale = svg.scale ?? 1;
        const size = SCALE;

        const svgSprite = new PIXI.Sprite(Texture.from(svg.svg, {
          resourceOptions: { scale: size * customScale }
        }));
        svgSprite.name = svg.name;
        svgSprite.scale.set(1 / customScale);
        svgSprite.visible = false;

        // Apply offset
        if (svg.offset) {
          svgSprite.x = -(svg.offset.x ?? 0) * size;
          svgSprite.y = -(svg.offset.y ?? 0) * size;
        }

        this.container.addChild(svgSprite);
        this.svgs.push(svgSprite);
      }
    }
  }

  #displayFrame = (
    symbolContainer: PIXI.Container,
    symbol: Symbol | Svg,
    colorIdx?: string,
    zIndex?: number,
  ) => {
    if (symbol.type === 'svg') {
      const sprite = this.svgs.filter(s => s.name === symbol.name)[this.#usedSvgs[symbol.name] ?? 0];
  
      if (!sprite) {
        throw new Error(`Sprite ${symbol.name} not found`);
      }

      // Hide 45
      if (symbol.name === 'Symbol45') {
        sprite.visible = false;
        return;
      }
  
      // Set visibility
      sprite.visible = true;
  
      // Apply color
      if (colorIdx) {
        const color = this.#colors[colorIdx];
        if (!color) {
          throw new Error(`Color ${colorIdx} not found`);
        }
  
        sprite.tint = parseInt(color.replace('#', ''), 16);
      }
  
      // Add to current container
      sprite.zIndex = zIndex ?? 0;
      symbolContainer.addChild(sprite);
  
      // Increment used count
      if (this.#usedSvgs[symbol.name]) {
        this.#usedSvgs[symbol.name]++;
      } else {
        this.#usedSvgs[symbol.name] = 1;
      }
    } else {
      const usedSymbols: string[] = [];
  
      // Get frame to load
      let frameToLoad: number;
  
      // If symbol has partIdx, only load the corresponding frame
      if (symbol.partIdx) {
        const partValue = this.#parts[symbol.partIdx];
  
        if (partValue === undefined) {
          throw new Error(`Part ${symbol.partIdx} not found in fighter config`);
        }
  
        frameToLoad = partValue;
      } else {
        // Else load the first frame
        frameToLoad = 0;
      }
  
      const frameParts = symbol.frames?.[frameToLoad] ?? [];
      const usedContainers: Record<string, number> = {};
  
      for (let i = 0; i < frameParts.length; i++) {
        const framePart = frameParts[i];
  
        // Count identic symbols already used
        const identicSymbolsCount = usedSymbols.filter(s => s === framePart.name).length;
  
        // Get corresponding symbol
        const framePartSymbol = symbol.parts?.filter(p => p.name === framePart.name)[identicSymbolsCount];
  
        if (!framePartSymbol) {
          throw new Error(`Part ${framePart.name} not found in symbol ${symbol.name}`);
        }
  
        if (framePartSymbol.type === 'svg') {
          this.#displayFrame(
            symbolContainer,
            framePartSymbol,
            colorIdx,
            frameParts.length - i,
          );
          continue;
        }
  
        // Get corresponding container
        const framePartContainer = symbolContainer.children
          .filter((child) => child instanceof PIXI.Container && child.name === framePart.name)
        [usedContainers[framePart.name] ?? 0] as PIXI.Container | undefined;
  
        if (!framePartContainer) {
          throw new Error(`Container ${framePart.name} not found`);
        }
  
        // Apply transform
        if (framePart.transform) {
          const size = SCALE;
          framePartContainer.transform.setFromMatrix(PixiHelper.matrixFromObject(framePart.transform, size));
        }
  
        // Apply color offset
        if (framePart.colorOffset) {
          const ignored = [
            '',
            'Symbol514',
          ];
          if (!ignored.includes(framePart.name)) {
            console.log(`Color offset for ${framePart.name}`)
            framePartContainer.filters = [new Filter(undefined, ColorOffsetShader, {
              offset: new Float32Array([
                framePart.colorOffset.r ?? 0,
                framePart.colorOffset.g ?? 0,
                framePart.colorOffset.b ?? 0
              ]),
              mult: new Float32Array([1, 1, 1])
            })];
          }
        }
  
        // Apply alpha
        if (framePart.alpha) {
          framePartContainer.alpha = framePart.alpha;
        }
  
        // Apply masking
        if (framePart.maskedBy) {
          console.log(`Masking ${framePart.name} with ${framePart.maskedBy}`);
          // Get mask sprite
          const maskSprite = this.svgs.find((svg) => svg.name === `Symbol${framePart.maskedBy}`);
          if (!maskSprite) {
            throw new Error(`Mask sprite Symbol${framePart.maskedBy} not found`);
          }
  
          framePartContainer.addChild(maskSprite);
          framePartContainer.mask = maskSprite;
        }
  
        // Apply visibility
        framePartContainer.visible = true;
        if (usedContainers[framePart.name]) {
          usedContainers[framePart.name]++;
        } else {
          usedContainers[framePart.name] = 1;
        }
  
        // Handle children
        this.#displayFrame(framePartContainer, framePartSymbol, framePartSymbol.colorIdx ?? colorIdx);
      }
    }
  }
}

type BruteState = {
  type: 'male' | 'female';
  colors: Record<string, string>;
  parts: Record<string, number>;
};

const fighter = new Fighter({
  type: 'female',
  colors: {
    _col0: '#eaaca6',  // Skin
    _col0a: '#eaaca6',  // Face
    _col0c: '#eaaca6',  // Ear
    _col1: '#ffaa1e',  // Hair
    _col1a: '#ffaa1e', // Hair back
    _col1b: '#ffaa1e', // Hair back 2
    _col1c: '#ffaa1e', // Hair front
    _col1d: '#ffaa1e', // Eyebrows
    _col3: '#bb1111',  // Primary (includes eyes)
    _col2: '#ffffff',  // Secondary
    _col2b: '#7a73c8', // Accent 1
    _col3b: '#fae31f', // Accent 2
    _col2a: '#fff9ae', // Accent 3
    _col4: '#559399',  // Shirt
    _col4a: '#00ff00', // Shoes accent ?
    _col4b: '#0000ff', // ??
  },
  //p2:6,p3:10,p4:4,p7:6,p1:1,p1a:0,p1b:0,p6:1,p8:3,p7b:0,p5:1
  parts: {
    _p2: 0,  // Body size (small = 0, big = 7) (male only, 0 for females)
    _p3: 1,  // Hair [0-11] 12 = no head
    _p4: 0,  // (male) Beard [0-4] 5 = nothing / (female) Front hair [0-2] 3 = nothing
    _p7: 4,  // Main clothing [0-6] 7 = naked
    _p1: 1,  // Armor variation [0-1]
    _p1a: 1, // [0-1] 0=belt, 1=nothing
    _p1b: 0, // 0=roman belt, 1=nothing
    _p6: 0,  // (male) 0=shorts, 1=trousers / (female) 0=shorts, 1=nothing
    _p8: 1,  // [0-4] Supposed to be shoes but doesn't change anything ??
    _p7b: 0, // Shoes underside (2 = visible, others = hidden)
    _p5: 1,  // 0=Nothing, 1=Shirt.
  },
}, false, 60, 20);

console.log(`SVG count: ${fighter.svgs.length}`);

viewport.addChild(fighter.container);

declare global {
  interface Window { fighter: Fighter; }
}
window.fighter = fighter;