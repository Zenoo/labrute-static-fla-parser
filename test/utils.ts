type Gender = 'male' | 'female';

const colors = {
  male: {
    skin: [
      '#996600',
      '#eccd57',
      '#cb841b',
      '#d79b75',
      '#fbe6c8',
      '#f8d198',
    ],
    hair: [
      '#784129',
      '#fff9ae',
      '#b85f1d',
      '#4f677d',
      '#df7e37',
      '#fbcd15',
      '#ffaa1e',
      '#952f04',
      '#a2886f',
      '#fff2df',
    ],
    clothing: [
      '#7bad30',
      '#b78104',
      '#bb1111',
      '#559399',
      '#fae31f',
      '#784129',
      '#7a73c8',
      '#fff9ae',
      '#f0dc99',
      '#b6e7a9',
      '#d31818',
      '#b85f1d',
      '#97cbff',
      '#8ba3d7',
      '#df7e37',
      '#d5eaff',
      '#ffaa1e',
      '#cbff97',
      '#ffcc79',
      '#fff2df',
    ],
  },
  female: {
    skin: [
      '#996600',
      '#f8cdc2',
      '#cb841b',
      '#eaaca6',
      '#fbe6c8',
      '#f8d198',
    ],
    hair: [
      '#fff9ae',
      '#b85f1d',
      '#eea2c9',
      '#8e63ad',
      '#fbcd15',
      '#ffaa1e',
      '#952f04',
      '#a2886f',
      '#fff2df',
    ],
    clothing: [
      '#7bad30',
      '#b78104',
      '#bb1111',
      '#559399',
      '#fae31f',
      '#784129',
      '#7a73c8',
      '#fff9ae',
      '#f0dc99',
      '#b6e7a9',
      '#d31818',
      '#b85f1d',
      '#97cbff',
      '#8ba3d7',
      '#df7e37',
      '#d5eaff',
      '#ffaa1e',
      '#cbff97',
      '#ffcc79',
      '#fff2df',
    ],
  },
  special: [
    '#000000',
  ],
};

export const getColor = (gender: Gender, part: string, color: number) => {
  const skinParts = ['col0', 'col0a', 'col0c'];
  const hairParts = ['col1', 'col1a', 'col1b', 'col1c', 'col1d'];
  const clothingParts = ['col2', 'col2a', 'col2b', 'col3', 'col3b', 'col4', 'col4a', 'col4b'];
  let colorArray: string[] = [];

  if (skinParts.includes(part)) colorArray = colors[gender].skin;
  else if (hairParts.includes(part)) colorArray = colors[gender].hair;
  else if (clothingParts.includes(part)) colorArray = colors[gender].clothing;

  const normalColor = colorArray[color];
  if (normalColor) return normalColor;

  return colors.special[99 - color] || '#ffffff';
};

export const readBodyString = (bodyString: string) => ({
  _p1: parseInt(bodyString[0] || '0', 16),
  _p1a: parseInt(bodyString[1] || '0', 16),
  _p1b: parseInt(bodyString[2] || '0', 16),
  _p2: parseInt(bodyString[3] || '0', 16),
  _p3: parseInt(bodyString[4] || '0', 16),
  _p4: parseInt(bodyString[5] || '0', 16),
  _p5: parseInt(bodyString[6] || '0', 16),
  _p6: parseInt(bodyString[7] || '0', 16),
  _p7: parseInt(bodyString[8] || '0', 16),
  _p7b: parseInt(bodyString[9] || '0', 16),
  _p8: parseInt(bodyString[10] || '0', 16),
});

export const readColorString = (
  gender: Gender,
  colorsString: string
) => ({
  _col0: getColor(gender, 'col0', +colorsString.slice(0, 2)),
  _col0a: getColor(gender, 'col0a', +colorsString.slice(2, 4)),
  _col0c: getColor(gender, 'col0c', +colorsString.slice(4, 6)),
  _col1: getColor(gender, 'col1', +colorsString.slice(6, 8)),
  _col1a: getColor(gender, 'col1a', +colorsString.slice(8, 10)),
  _col1b: getColor(gender, 'col1b', +colorsString.slice(10, 12)),
  _col1c: getColor(gender, 'col1c', +colorsString.slice(12, 14)),
  _col1d: getColor(gender, 'col1d', +colorsString.slice(14, 16)),
  _col2: getColor(gender, 'col2', +colorsString.slice(16, 18)),
  _col2a: getColor(gender, 'col2a', +colorsString.slice(18, 20)),
  _col2b: getColor(gender, 'col2b', +colorsString.slice(20, 22)),
  _col3: getColor(gender, 'col3', +colorsString.slice(22, 24)),
  _col3b: getColor(gender, 'col3b', +colorsString.slice(24, 26)),
  _col4: getColor(gender, 'col4', +colorsString.slice(26, 28)),
  _col4a: getColor(gender, 'col4a', +colorsString.slice(28, 30)),
  _col4b: getColor(gender, 'col4b', +colorsString.slice(30, 32)),
});