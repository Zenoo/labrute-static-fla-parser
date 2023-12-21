import { Symbol } from '../common';
import { Symbol536 } from './Symbol536';
import { Symbol538 } from './Symbol538';

export const Symbol600: Symbol = {
  "type": "symbol",
  "name": "Symbol600",
  "parts": [
    {
      ...Symbol536,
      "colorIdx": "_col2"
    },
    {
      ...Symbol538,
      "colorIdx": "_col2"
    }
  ],
  "frames": [
    [
      {
        "type": "symbol",
        "name": "Symbol538",
        "transform": {
          "tx": 0.15,
          "ty": 3.9
        }
      }
    ],
    [
      {
        "type": "symbol",
        "name": "Symbol536",
        "transform": {
          "tx": 0.1,
          "ty": 3.8,
          "a": 1.01190185546875,
          "d": 1.01190185546875
        }
      }
    ]
  ]
};