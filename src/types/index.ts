export type GridNode = {
  row: number;
  col: number;
};

export type GridGraph = {
  getNeighbors: (node: GridNode) => GridNode[];
};
