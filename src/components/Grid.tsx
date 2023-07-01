import React, { useState } from "react";

const Grid: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [startPoint, setStartPoint] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [finishPoint, setFinishPoint] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [obstacles, setObstacles] = useState<{ row: number; col: number }[]>(
    []
  );

  const createGrid = () => {
    // Create a 2D array representing the grid
    const newGrid: number[][] = [];
    for (let row = 0; row < numRows; row++) {
      const newRow: number[] = [];
      for (let col = 0; col < numCols; col++) {
        newRow.push(0); // 0 represents an empty cell
      }
      newGrid.push(newRow);
    }
    setGrid(newGrid);
  };

  const handleCellClick = (row: number, col: number) => {
    // If start point is not set, set the clicked cell as the start point
    if (!startPoint) {
      setStartPoint({ row, col });
      return;
    }

    // If finish point is not set, set the clicked cell as the finish point
    if (!finishPoint) {
      setFinishPoint({ row, col });
      return;
    }

    // Otherwise, toggle obstacles on the clicked cell
    const obstacleIndex = obstacles.findIndex(
      (obstacle) => obstacle.row === row && obstacle.col === col
    );
    if (obstacleIndex === -1) {
      setObstacles([...obstacles, { row, col }]);
    } else {
      setObstacles(obstacles.filter((_, index) => index !== obstacleIndex));
    }
  };

  const handleStartPointSelection = (row: number, col: number) => {
    setStartPoint({ row, col });
  };

  const handleFinishPointSelection = (row: number, col: number) => {
    setFinishPoint({ row, col });
  };

  const handleObstaclePlacement = (row: number, col: number) => {
    const obstacleIndex = obstacles.findIndex(
      (obstacle) => obstacle.row === row && obstacle.col === col
    );
    if (obstacleIndex === -1) {
      setObstacles([...obstacles, { row, col }]);
    } else {
      setObstacles(obstacles.filter((_, index) => index !== obstacleIndex));
    }
  };

  const handlePathFinding = () => {
    // Implement the path-finding algorithm logic here
  };

  return (
    <div>
      <button onClick={createGrid}>Create Grid</button>
      <div className="grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${
                startPoint?.row === rowIndex && startPoint?.col === colIndex
                  ? "start"
                  : ""
              } ${
                finishPoint?.row === rowIndex && finishPoint?.col === colIndex
                  ? "finish"
                  : ""
              } ${
                obstacles.some(
                  (obstacle) =>
                    obstacle.row === rowIndex && obstacle.col === colIndex
                )
                  ? "obstacle"
                  : ""
              }`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      <div>
        <button onClick={handlePathFinding}>Find Path</button>
      </div>
    </div>
  );
};

export default Grid;
