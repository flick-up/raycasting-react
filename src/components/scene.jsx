import React, { useMemo } from 'react';
import Column from './grid-column';

export default function Scene({
  height,
  mapHeight,
  player,
  rays,
  resolution,
  width,
}) {
  const containerStyles = useMemo(() => ({ ...styles.container, height, width }), [height, width]);

  return (
    <div style={containerStyles}>
      <div style={styles.ceiling} />
      <div style={styles.floor} />
      {rays.map((ray, index) => (
        <Column
          color="#424242"
          distance={adjustDistance(ray, player)}
          key={index} // eslint-disable-line react/no-array-index-key
          mapHeight={mapHeight}
          number={index}
          resolution={resolution}
          screenHeight={height}
          screenWidth={width}
        />
      ))}
    </div>
  );
}

// Correct for a fishbowl-effect resulting from mixing polar and cartesian coordinates.
function adjustDistance(ray, player) {
  return ray.distance * Math.cos(ray.angle - player.direction);
}

const styles = {
  container: {
    border: '1.15px solid rgb(45,45,45)',
    borderRadius: '6px',
    boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ceiling: {
    backgroundColor: '#e3f2fd',
    borderTopLeftRadius: 'inherit',
    borderTopRightRadius: 'inherit',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '50%',
    top: 0,
  },
  floor: {
    backgroundColor: '#607d8b',
    borderBottomLeftRadius: 'inherit',
    borderBottomRightRadius: 'inherit',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: '50%',
  },
};
