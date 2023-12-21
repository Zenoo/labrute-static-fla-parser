import { Symbol } from '../common';
import { Symbol664 } from './Symbol664';
import { Symbol666 } from './Symbol666';

export const Symbol667: Symbol = {
  "type": "symbol",
  "name": "Symbol667",
  "parts": [
    {
      ...Symbol664,
      "colorIdx": "_col2"
    },
    {
      ...Symbol666,
      "colorIdx": "_col3"
    }
  ],
  "frames": [
    [
      {
        "type": "symbol",
        "name": "Symbol664",
        "transform": {
          "tx": 0,
          "ty": 0
        }
      }
    ],
    [
      {
        "type": "symbol",
        "name": "Symbol666",
        "transform": {
          "tx": -4.1,
          "ty": 4.2
        }
      },
      {
        "type": "symbol",
        "name": "Symbol664",
        "transform": {
          "tx": 0,
          "ty": 0
        }
      }
    ]
  ]
};