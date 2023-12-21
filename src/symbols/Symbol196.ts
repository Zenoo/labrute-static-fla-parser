import { Symbol } from '../common';
import { Symbol134 } from './Symbol134';
import { Symbol113 } from './Symbol113';
import { Symbol195 } from './Symbol195';

export const Symbol196: Symbol = {
  "type": "symbol",
  "name": "Symbol196",
  "parts": [
    {
      ...Symbol134,
      "colorIdx": "_col3"
    },
    {
      ...Symbol113,
      "colorIdx": "_col0"
    },
    {
      ...Symbol195,
      "partIdx": "_p7"
    }
  ],
  "frames": [
    [
      {
        "type": "symbol",
        "name": "Symbol195",
        "transform": {
          "tx": 0.55,
          "ty": 1.55
        }
      },
      {
        "type": "symbol",
        "name": "Symbol113",
        "colorOffset": {
          "r": -16,
          "g": -50,
          "b": -80
        },
        "transform": {
          "tx": 0,
          "ty": 0
        }
      }
    ],
    [
      {
        "type": "symbol",
        "name": "Symbol195",
        "transform": {
          "tx": 0.55,
          "ty": 1.55
        }
      },
      {
        "type": "symbol",
        "name": "Symbol134",
        "colorOffset": {
          "r": -16,
          "g": -50,
          "b": -80
        },
        "transform": {
          "tx": 0,
          "ty": 0
        }
      }
    ]
  ]
};