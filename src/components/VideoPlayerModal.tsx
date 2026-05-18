import { Button, Modal, Flex } from 'antd';
import { useSelector } from '@xstate/react';
import { PlayCircleOutlined } from '@ant-design/icons';

import VideoPlayer from './VideoPlayer';
import TitleModal from './TitleModal';
import GroupControlsButtons from './GroupControlsButtons';
import { videoActor } from '../machine/videoActor';

const VideoPlayerModal: React.FC = () => {

  const actor = videoActor;

  const isPlaying = useSelector(actor, (state) => state.matches({ playback: 'playing' }));
  const isDetached = useSelector(actor, (state) => state.matches({ ui: 'detached' }));
  const isMuted = useSelector(actor, (state) => state.matches({ muted: 'muted' }));

  const size = useSelector(actor, (state) => state.context.size);
  const videoSrc = useSelector(actor, (state) => state.context.src);
  const volume = useSelector(actor, (state) => state.context.volume);

  const handleVolumeChange = (newVolume: number) => {
    actor.send({ type: 'SET_VOLUME', volume: newVolume });
  };

  const handlePlayer = () => actor.send({ type: isPlaying ? 'PAUSE' : 'PLAY' })
  const handleScreenSize = () => actor.send({ type: 'TOGGLE_SIZE' });
  const onToggleMute = () => actor.send({ type: 'TOGGLE_MUTE' })


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

            actor.send({ type: 'DETACH' });
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
          actor.send({ type: 'CLOSE_DETACHED' });
        }}
        width={size === 'small' ? 'max(50vw,300px)' : '100vw'}
        styles={{
          container: {
            borderRadius: 0,
          },
        }}
      >
        <VideoPlayer
          src={videoSrc}
          volume={volume}
          handlePlayer={handlePlayer}
          isMuted={isMuted}
        />
      </Modal>
    </Flex>
  );
};

export default VideoPlayerModal;