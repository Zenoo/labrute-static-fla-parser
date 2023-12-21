import { Symbol } from '../common';
import { Symbol256 } from './Symbol256';
import { Symbol233 } from './Symbol233';
import { Symbol263 } from './Symbol263';

export const Symbol264: Symbol = {
  "type": "symbol",
  "name": "Symbol264",
  "parts": [
    {
      ...Symbol256,
      "colorIdx": "_col4"
    },
    {
      ...Symbol233,
      "colorIdx": "_col0"
    },
    {
      ...Symbol263,
      "partIdx": "_p7"
    }
  ],
  "frames": [
    [
      {
        "type": "symbol",
        "name": "Symbol263",
        "transform": {
          "tx": 3.9,
          "ty": 7.1
        }
      },
      {
        "type": "symbol",
        "name": "Symbol233",
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
        "name": "Symbol263",
        "transform": {
          "tx": 3.9,
          "ty": 7.1
        }
      },
      {
        "type": "symbol",
        "name": "Symbol256",
        "colorOffset": {
          "r": -110,
          "g": -90,
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