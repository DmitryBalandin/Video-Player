import ReactPlayer from 'react-player';
import { useSelector } from '@xstate/react';
import { useState } from 'react';
import { Button } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, } from '@ant-design/icons';

import { videoActor } from '../machine/videoActor';
import { type VideoPlayerProps } from '../types/types';

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, volume, isMuted, handlePlayer }) => {

  const actor = videoActor
  const isPlaying = useSelector(actor, (state) => state.matches({ playback: 'playing' }));

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={isPlaying ? handlePlayer : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
      }}
    >
      <ReactPlayer
        src={src}
        playing={isPlaying}
        muted={isMuted}
        volume={volume}
        controls={false}
        loop
        width="100%"
        height="100%"
      />

      {isPlaying && isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            background: 'rgba(0,0,0,0.15)',
           
            transition: '0.2s',
            pointerEvents: 'none',
          }}
        >
          <PauseCircleOutlined
            style={{
              fontSize: 80,
              color: 'white',

              opacity: 0.6,
              transform: 'scale(1.05)',
              transition: '0.2s',
            }}
          />
        </div>
      )}

      {!isPlaying && (
        <div
          onClick={handlePlayer}
          style={{
            position: 'absolute',
            inset: 0,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            background: 'rgba(0,0,0,0.25)',
            cursor: 'pointer',
            transition: '0.2s',
            backdropFilter: 'blur(5px)',
          }}
        >
          <Button
            type="text"
            shape="circle"
            icon={
              <PlayCircleOutlined
                style={{
                  fontSize: 80,
                  color: 'white',
                  opacity: '0.6',
                  transition: '0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            }
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;