import { Symbol } from '../common';
import { Symbol211 } from './Symbol211';
import { Symbol213 } from './Symbol213';

export const Symbol599: Symbol = {
  "type": "symbol",
  "name": "Symbol599",
  "parts": [
    {
      ...Symbol211,
      "colorIdx": "_col3"
    },
    {
      ...Symbol213,
      "colorIdx": "_col2"
    }
  ],
  "frames": [
    [
      {
        "type": "symbol",
        "name": "Symbol211",
        "transform": {
          "tx": 0,
          "ty": 1.25
        }
      }
    ],
    [
      {
        "type": "symbol",
        "name": "Symbol213",
        "transform": {
          "tx": 0,
          "ty": 9.5,
          "a": 1.1502838134765625,
          "d": 1.2355804443359375,
          "b": -0.335205078125,
          "c": 0
        }
      },
      {
        "type": "symbol",
        "name": "Symbol211",
        "transform": {
          "tx": 0,
          "ty": 1.25
        }
      }
    ]
  ]
};