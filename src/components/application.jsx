import React, { useState } from 'react';
import ApplicationMap from 'components/map';
import Minimap from 'components/mini-map';
import Player from 'lib/player';
import Scene from 'components/scene';
import useCastRays from 'hooks/with-use-cast-rays';
import { fromDegrees } from 'lib/radians';

const fov = fromDegrees(60);
const map = new ApplicationMap(64);
const player = new Player(160, 160, fromDegrees(0));
const resolution = 320;

export default function Application(){
  const [showMinimap, setShowMinimap] = useState(true);
  const rays = useCastRays(player, map, fov, resolution);

  return (
    <div style={styles.container}>
      <h3>Raycasting React Experiment</h3>
      <div>
        <Scene
          height={480}
          mapHeight={map.height}
          player={player}
          rays={rays}
          resolution={resolution}
          width={840}
        />
        <div>
          <span>Move your player using the W, A, S, D, ←, and → Keys!</span>
          <div>
            <label htmlFor="show_minimap">
              Show minimap
              <input id="show_minimap" onChange={() => setShowMinimap(!showMinimap)} type="checkbox" checked={showMinimap} />
            </label>
          </div>
        {/*Show minimap*/}
        </div>
      </div>
      {showMinimap && (
        <Minimap
          fov={fov}
          map={map}
          player={player}
          rays={rays}
          resolution={resolution}
          size={250}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '50px',
  },
};
