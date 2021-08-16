global.context = {
  sharedStorage: {
    // eslint-disable-next-line
    set: jest.fn(),
    // eslint-disable-next-line
    get: jest.fn(),
  },
};

global.park = {
  cash: 99999,

  getFlag(flag) {
    if (flag === "noMoney") {
      return true;
    }
  },
};

const tiles = [
  [
    {
      elements: [
        {
          type: "surface",
          hasOwnership: true,
        },
        {
          type: "footpath",
          slopeDirection: null,
        },
      ],
    },
    {
      elements: [
        {
          type: "surface",
          hasOwnership: true,
        },
        {
          type: "footpath",
          slopeDirection: 1,
        },
      ],
    },
  ],
  [
    {
      elements: [
        {
          type: "surface",
          hasOwnership: true,
        },
        {
          type: "footpath",
          slopeDirection: null,
        },
      ],
    },
    {
      elements: [
        {
          type: "surface",
          hasOwnership: true,
        },
        {
          type: "footpath",
          slopeDirection: null,
        },
      ],
    },
  ],
];

global.map = {
  size: {
    x: 2,
    y: 2,
  },
  getTile(x, y) {
    return tiles[x][y];
  },
};
