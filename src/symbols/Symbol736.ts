import { Symbol } from '../common';
import { Symbol729 } from './Symbol729';
import { Symbol735 } from './Symbol735';

export const Symbol736: Symbol = {
  "type": "symbol",
  "name": "Symbol736",
  "parts": [
    {
      ...Symbol729,
      "colorIdx": "_col0"
    },
    {
      ...Symbol735,
      "partIdx": "_p7"
    }
  ],
  "frames": [
    [
      {
        "type": "symbol",
        "name": "Symbol735",
        "transform": {
          "tx": 0.55,
          "ty": 1.55
        }
      },
      {
        "type": "symbol",
        "name": "Symbol729",
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