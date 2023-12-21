import { Symbol } from '../common';
import { Symbol402 } from './Symbol402';
import { Symbol408 } from './Symbol408';

export const Symbol409: Symbol = {
  "type": "symbol",
  "name": "Symbol409",
  "parts": [
    {
      ...Symbol402,
      "colorIdx": "_col0"
    },
    {
      ...Symbol408,
      "partIdx": "_p7"
    }
  ],
  "frames": [
    [
      {
        "type": "symbol",
        "name": "Symbol408",
        "transform": {
          "tx": -2.75,
          "ty": 7.6
        }
      },
      {
        "type": "symbol",
        "name": "Symbol402",
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