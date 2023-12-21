import { Symbol } from '../common';
import { Symbol21 } from './Symbol21';
import { Symbol430 } from './Symbol430';

export const Symbol431: Symbol = {
  "type": "symbol",
  "name": "Symbol431",
  "parts": [
    {
      ...Symbol21,
      "colorIdx": "_col0"
    },
    {
      ...Symbol430,
      "partIdx": "_p7"
    }
  ],
  "frames": [
    [
      {
        "type": "symbol",
        "name": "Symbol430",
        "transform": {
          "tx": 0.55,
          "ty": 1.55
        }
      },
      {
        "type": "symbol",
        "name": "Symbol21",
        "colorOffset": {
          "r": -16,
          "g": -50,
          "b": -80
        },
        "transform": {
          "tx": 1.4,
          "ty": -12.45,
          "a": 0.9917755126953125,
          "d": 0.9917755126953125,
          "b": 0.122100830078125,
          "c": -0.122100830078125
        }
      }
    ]
  ]
};