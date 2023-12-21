import { Symbol } from '../common';
import { Symbol510 } from './Symbol510';
import { Symbol106 } from './Symbol106';
import { Symbol104 } from './Symbol104';

export const Symbol511: Symbol = {
  "type": "symbol",
  "name": "Symbol511",
  "parts": [
    {
      ...Symbol510,
      "partIdx": "_p1"
    },
    {
      ...Symbol106
    },
    {
      ...Symbol104,
      "partIdx": "_p1"
    }
  ],
  "frames": [
    [
      {
        "type": "symbol",
        "name": "Symbol104",
        "transform": {
          "tx": 0,
          "ty": 0
        }
      }
    ],
    [],
    [
      {
        "type": "symbol",
        "name": "Symbol106",
        "transform": {
          "tx": 25.4,
          "ty": -3.4
        }
      }
    ],
    [
      {
        "type": "symbol",
        "name": "Symbol510",
        "transform": {
          "tx": -13.15,
          "ty": -19.4
        }
      }
    ]
  ]
};