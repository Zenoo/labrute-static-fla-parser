import { Symbol } from '../common';
import { Symbol134 } from './Symbol134';
import { Symbol113 } from './Symbol113';
import { Symbol132 } from './Symbol132';

export const Symbol135: Symbol = {
  "type": "symbol",
  "name": "Symbol135",
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
      ...Symbol132,
      "partIdx": "_p7"
    }
  ],
  "frames": [
    [
      {
        "type": "symbol",
        "name": "Symbol132",
        "transform": {
          "tx": 0.55,
          "ty": 1.55,
          "a": 0.9969329833984375,
          "d": 0.9969329833984375,
          "b": -0.0749359130859375,
          "c": 0.0749359130859375
        }
      },
      {
        "type": "symbol",
        "name": "Symbol113",
        "transform": {
          "tx": 0,
          "ty": 0
        }
      }
    ],
    [
      {
        "type": "symbol",
        "name": "Symbol132",
        "transform": {
          "tx": 0.55,
          "ty": 1.55,
          "a": 0.9969329833984375,
          "d": 0.9969329833984375,
          "b": -0.0749359130859375,
          "c": 0.0749359130859375
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