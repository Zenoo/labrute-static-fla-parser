import { Symbol } from '../common';
import { Symbol200 } from './Symbol200';
import { Symbol204 } from './Symbol204';

export const Symbol205: Symbol = {
  "type": "symbol",
  "name": "Symbol205",
  "parts": [
    {
      ...Symbol200,
      "colorIdx": "_col3"
    },
    {
      ...Symbol204,
      "partIdx": "_p7"
    }
  ],
  "frames": [
    [
      {
        "type": "symbol",
        "name": "Symbol204",
        "transform": {
          "tx": 2.35,
          "ty": 2.4
        }
      },
      {
        "type": "symbol",
        "name": "Symbol200",
        "transform": {
          "tx": 2.65,
          "ty": -5.9
        }
      }
    ],
    [
      {
        "type": "symbol",
        "name": "Symbol204",
        "transform": {
          "tx": 2.35,
          "ty": 2.4
        }
      },
      {
        "type": "symbol",
        "name": "Symbol200",
        "transform": {
          "tx": 2.65,
          "ty": -5.9
        }
      }
    ]
  ]
};