export type Svg = {
  type: 'svg';
  name: string;
  svg: string;
  offset: {
    x: number;
    y: number;
  };
  scale?: number;
};

export type FramePart = {
  type: 'symbol' | 'svg';
  name: string;
  transform?: {
    tx?: number;
    ty?: number;
    a?: number;
    d?: number;
    b?: number;
    c?: number;
  };
  colorOffset?: {
    r: number;
    g: number;
    b: number;
  };
  alpha?: number;
  maskedBy?: number;
};

export type Symbol = {
  // Main symbol
  type: 'symbol';
  name: string;
  parts?: (Symbol | Svg)[];
  frames?: FramePart[][]
  // Sub symbol
  partIdx?: string;
  colorIdx?: string;
}