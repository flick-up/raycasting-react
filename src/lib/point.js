
export default function Point(x, y){
  this.x = x;
  this.y = y;
}

Point.prototype.add = function(x, y){
  return new Point(this.x + x, this.y + y);
};

Point.prototype.distance = function (anotherDistance){
  return Math.hypot(this.x - anotherDistance.x, this.y - anotherDistance.y);
};
