import { Symbol } from '../common';
import { Symbol21 } from './Symbol21';
import { Symbol33 } from './Symbol33';
import { Symbol32 } from './Symbol32';

export const Symbol429: Symbol = {
  "type": "symbol",
  "name": "Symbol429",
  "parts": [
    {
      ...Symbol21,
      "colorIdx": "_col2"
    },
    {
      ...Symbol33,
      "partIdx": "_p1"
    },
    {
      ...Symbol32,
      "colorIdx": "_col3"
    }
  ],
  "frames": [
    [
      {
        "type": "symbol",
        "name": "Symbol33",
        "transform": {
          "tx": 0.1,
          "ty": 5
        }
      },
      {
        "type": "symbol",
        "name": "Symbol21",
        "colorOffset": {
          "r": -110,
          "g": -90,
          "b": -80
        },
        "transform": {
          "tx": 1.4,
          "ty": -12.5,
          "a": 1.0095672607421875,
          "d": 0.9970703125,
          "b": 0.124298095703125,
          "c": -0.1227569580078125
        }
      }
    ],
    [
      {
        "type": "symbol",
        "name": "Symbol32",
        "transform": {
          "tx": 7.15,
          "ty": -5.6
        }
      },
      {
        "type": "symbol",
        "name": "Symbol33",
        "transform": {
          "tx": 0.1,
          "ty": 5
        }
      },
      {
        "type": "symbol",
        "name": "Symbol21",
        "colorOffset": {
          "r": -110,
          "g": -90,
          "b": -80
        },
        "transform": {
          "tx": 1.4,
          "ty": -12.5,
          "a": 1.0095672607421875,
          "d": 0.9970703125,
          "b": 0.124298095703125,
          "c": -0.1227569580078125
        }
      }
    ]
  ]
};