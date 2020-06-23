import Point from 'lib/point';
import Ray from 'lib/ray';

const stepdist = 1.4;
const rotateSpeed = 0.025;

export default function Player(x, y, direction){
  this.position = new Point(x, y);
  this.direction = direction;
}

// Determine the distance to nearby walls the user is able to see
// by casting rays.

// The resolution being the number of rays to cast
// The field of view etc

Player.prototype.castRays = function (map, fov, resolution){
  // If FOV is 60 and res = 320, there is 60 / 320 degrees between
  // the rays
  const angleBetween = fov / resolution;

  // Players direction is the center of the screen. Left edge of the screen is
  // half the field of view to the left
  // Angle increases as you turn counter-clockwise. Add to players current direction
  const start = this.direction + fov / 2;

  // Create an array of angle for each ray from left sweeping to the right of screen
  // edge
  const angles = new Array(resolution).fill(0).map((_, index) => start - index * angleBetween);

  return angles.map(angle => new Ray(map, angle, this.position));
};

Player.prototype.turnRight = function (time) {
  this.direction -= rotateSpeed * time / 16;
};

Player.prototype.turnLeft = function (time){
  this.direction += rotateSpeed * time / 16;
};

Player.prototype.moveForward = function (map, time){
  const dX = stepdist * (time / 16) * Math.cos(this.direction);
  const dY = stepdist * (time / 16) * Math.sin(this.direction);

  this.position = this.position.add(
    adjustDelta(map, this.position.add(dX, 0), dX),
    adjustDelta(map, this.position.add(0, -dY), -dY),
  );
};

Player.prototype.moveBackward = function (map, time){
  const dx = stepdist * (time / 16) * Math.cos(this.direction);
  const dy = stepdist * (time / 16) * Math.sin(this.direction);

  this.position = this.position.add(
    adjustDelta(map, this.position.add(-dx, 0), -dx),
    adjustDelta(map, this.position.add(0, dy), dy),
  );
};

// Step to the left, same as stepping forward but rotated 90 deg to the left
Player.prototype.moveLeft = function (map, time){
  const dx = stepdist * (time / 16) * Math.cos(this.direction + Math.PI / 2);
  const dy = stepdist * (time / 16) * Math.sin(this.direction + Math.PI / 2);

   this.position = this.position.add(
     adjustDelta(map, this.position.add(dx, 0), dx),
     adjustDelta(map, this.position.add(0, -dy), -dy),
   );
};

// Step to the right, which is the same as stepping backward but rotated 90 degrees to the left.
Player.prototype.moveRight = function (map, time){
  const dx = stepdist * (time / 16) * Math.cos(this.direction + Math.PI / 2);
  const dy = stepdist * (time / 16) * Math.sin(this.direction + Math.PI / 2);

   this.position = this.position.add(
     adjustDelta(map, this.position.add(-dx, 0), -dx),
     adjustDelta(map, this.position.add(0, dy), dy),
   );
};

function adjustDelta(map, wall, delta){
  return map.isWall(wall) ? 0 : delta;
}
