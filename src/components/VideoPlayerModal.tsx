import { PlayCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Modal } from 'antd';
import { useCallback } from 'react';
import { VideoPlayerContext } from '../machine/VideoPlayerContext';
import GroupControlsButtons from './GroupControlsButtons';
import TitleModal from './TitleModal';
import VideoPlayer from './VideoPlayer';

const VideoPlayerModal: React.FC = () => {
  const actorRef = VideoPlayerContext.useActorRef();

  const isPlaying = VideoPlayerContext.useSelector((state) => state.matches({ playback: 'playing' }));
  const isDetached = VideoPlayerContext.useSelector((state) => state.matches({ ui: 'detached' }));
  const isMuted = VideoPlayerContext.useSelector((state) => state.matches({ muted: 'muted' }));

  const size = VideoPlayerContext.useSelector((state) => state.context.size);
  const videoSrc = VideoPlayerContext.useSelector((state) => state.context.src);
  const volume = VideoPlayerContext.useSelector((state) => state.context.volume);

  const handleVolumeChange = useCallback(
    (newVolume: number) => {
      actorRef.send({ type: 'SET_VOLUME', volume: newVolume });
    },
    [actorRef],
  );

  const handlePlayer = useCallback(() => actorRef.send({ type: isPlaying ? 'PAUSE' : 'PLAY' }), [actorRef, isPlaying]);

  const handleScreenSize = useCallback(() => actorRef.send({ type: 'TOGGLE_SIZE' }), [actorRef]);

  const onToggleMute = useCallback(() => actorRef.send({ type: 'TOGGLE_MUTE' }), [actorRef]);

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {!isDetached && (
        <Button
          color="purple"
          variant="outlined"
          onClick={() => {
            actorRef.send({ type: 'DETACH' });
          }}
          icon={<PlayCircleOutlined style={{ fontSize: '50px' }} />}
          style={{
            width: '300px',
            height: '150px',
            borderWidth: '3px',
          }}
        />
      )}

      <Modal
        title={<TitleModal />}
        closable={{ 'aria-label': 'Custom Close Button' }}
        footer={
          <GroupControlsButtons
            handlePlayer={handlePlayer}
            handleScreenSize={handleScreenSize}
            handleVolumeChange={handleVolumeChange}
            onToggleMute={onToggleMute}
            isPlaying={isPlaying}
            isMiniScreen={size === 'small'}
            isMuted={isMuted}
            volume={volume}
          />
        }
        open={isDetached}
        onCancel={() => {
          actorRef.send({ type: 'CLOSE_DETACHED' });
        }}
        width={size === 'small' ? 'max(50vw,300px)' : '100vw'}
        styles={{
          container: {
            borderRadius: 0,
          },
        }}
      >
        <VideoPlayer src={videoSrc} volume={volume} handlePlayer={handlePlayer} isMuted={isMuted} />
      </Modal>
    </Flex>
  );
};

export default VideoPlayerModal;
