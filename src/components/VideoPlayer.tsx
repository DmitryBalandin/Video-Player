import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { memo, useCallback, useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { VideoPlayerContext } from '../machine/VideoPlayerContext';
import type { VideoPlayerProps } from '../types/types';
import { throttle } from '../utils/throttle';

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, volume, isMuted, handlePlayer }) => {
  const [isHovered, setIsHovered] = useState(false);
  const actorRef = VideoPlayerContext.useActorRef();
  const isPlaying = VideoPlayerContext.useSelector((state) => state.matches({ playback: 'playing' }));

  const handleTimeUpdate = useMemo(
    () =>
      throttle((e: React.SyntheticEvent<HTMLVideoElement>) => {
        actorRef.send({ type: 'SET_CURRENT_TIME', currentTime: e.currentTarget.currentTime });
      }, 500),
    [actorRef],
  );

  const handleLoadedMetadata = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      actorRef.send({ type: 'SET_DURATION', duration: e.currentTarget.duration });
    },
    [actorRef],
  );

  return (
    <div
      onClick={isPlaying ? handlePlayer : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handlePlayer();
        }
      }}
      role="button"
      tabIndex={0}
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
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
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
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handlePlayer();
            }
          }}
          role="button"
          tabIndex={0}
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

export default memo(VideoPlayer);
