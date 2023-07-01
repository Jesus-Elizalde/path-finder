import { GridNode, GridGraph } from "../types";

const calculateManhattanDistance = (nodeA: GridNode, nodeB: GridNode) => {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
};

const reconstructPath = (
  cameFrom: Map<GridNode, GridNode>,
  current: GridNode
) => {
  const path: GridNode[] = [current];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current)!;
    path.unshift(current);
  }
  return path;
};

const aStar = (
  graph: GridGraph,
  start: GridNode,
  finish: GridNode
): GridNode[] => {
  const openSet: GridNode[] = [start];
  const cameFrom: Map<GridNode, GridNode> = new Map();
  const gScore: Map<GridNode, number> = new Map();
  const fScore: Map<GridNode, number> = new Map();

  gScore.set(start, 0);
  fScore.set(start, calculateManhattanDistance(start, finish));

  while (openSet.length > 0) {
    openSet.sort((a, b) => fScore.get(a)! - fScore.get(b)!);
    const current = openSet[0];

    if (current === finish) {
      return reconstructPath(cameFrom, current);
    }

    openSet.shift();
    const neighbors = graph.getNeighbors(current);

    for (const neighbor of neighbors) {
      const tentativeGScore = gScore.get(current)! + 1;

      if (!gScore.has(neighbor) || tentativeGScore < gScore.get(neighbor)!) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);
        fScore.set(
          neighbor,
          tentativeGScore + calculateManhattanDistance(neighbor, finish)
        );

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return []; // No path found
};

export default aStar;
