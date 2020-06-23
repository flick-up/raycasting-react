import Point from 'lib/point';
export default function Map(height) {
  this.height = height;
  this.size = 10;
  this.grid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
}

Map.prototype.isWall = function (point) {
  const gridCoordinates = toGrid(point, this.height);
  return this.isWithinCoordinateBounds(point) && this.grid[gridCoordinates.y][gridCoordinates.x] === 1;
};

Map.prototype.isWithinCoordinateBounds = function (point) {
  const gridCoordinates = toGrid(point, this.height);
  return gridCoordinates.x >= 0 && gridCoordinates.x < this.size && gridCoordinates.y >= 0 && gridCoordinates.y < this.size;
};

// Convert unit coordinates to grid coordinates. Each grid coordinate can be broken up into
// some number of smaller "unit" coordinates.
function toGrid(point, units) {
  return new Point(Math.floor(point.x / units), Math.floor(point.y / units));
}
