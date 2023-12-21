import { Symbol } from '../common';
import { Symbol565 } from './Symbol565';
import { Symbol175 } from './Symbol175';
import { Symbol174 } from './Symbol174';

export const Symbol566: Symbol = {
  "type": "symbol",
  "name": "Symbol566",
  "parts": [
    {
      ...Symbol565,
      "partIdx": "_p1"
    },
    {
      ...Symbol175
    },
    {
      ...Symbol174,
      "partIdx": "_p1"
    }
  ],
  "frames": [
    [
      {
        "type": "symbol",
        "name": "Symbol174",
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
        "name": "Symbol175",
        "transform": {
          "tx": 0,
          "ty": 0
        }
      }
    ],
    [
      {
        "type": "symbol",
        "name": "Symbol565",
        "transform": {
          "tx": -13.15,
          "ty": -19.4
        }
      }
    ]
  ]
};