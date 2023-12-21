import { dts } from "rollup-plugin-dts";

export default {
  input: 'dist/src/Symbols.d.ts',
  output: [{ file: 'dist/Symbols.d.ts', format: 'es' }],
  plugins: [dts()]
};