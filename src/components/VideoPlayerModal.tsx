import { Button, Modal, Flex } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import VideoPlayer from './VideoPlayer';
import TitleModal from './TitleModal';
import GroupControlsButtons from './GroupControlsButtons';
import videoMachine from '../machine/machineVideo';
import { useMachine } from '@xstate/react';

const VideoPlayerModal: React.FC = () => {

    const [state, send] = useMachine(videoMachine);
    const isModalOpen = !(state.value === 'closedPlayer');
    const isPlaying = state.value === 'fullScreenPlaying' || state.value === 'miniScreenPlaying';
    const isMiniScreen = state.value === 'miniScreenPlaying' || state.value === 'miniScreenPause';

    const handlePlayer = () => {
        isPlaying ? send({ type: 'stop' }) : send({ type: 'play' })
    };

    const handleScreenSize = () => {
        isMiniScreen ? send({ type: 'fullScreen' }) : send({ type: 'miniScreen' })
    };

    return (
        <Flex
            justify="center"
            align="center"
            style={{
                minHeight: '100vh',
                width: '100%'
            }}
        >
            {!isModalOpen &&
                <Button
                    color="purple"
                    variant="outlined"
                    onClick={() => send({ type: 'toggle' })}
                    icon={<PlayCircleOutlined style={{ fontSize: '50px' }} />}
                    style={{
                        width: '300px',
                        height: '150px',
                        borderWidth: '3px',
                    }}
                />
            }
            <Modal
                title={<TitleModal />}
                closable={{ 'aria-label': 'Custom Close Button' }}
                footer={
                    <
                        GroupControlsButtons
                        handlePlayer={handlePlayer}
                        handleScreenSize={handleScreenSize}
                        isPlaying={isPlaying}
                        isMiniScreen={isMiniScreen}
                    />}
                open={isModalOpen}
                onCancel={() => send({ type: 'toggle' })}
                width={isMiniScreen ? '50vw' : '100vw'}
                styles={{
                    container: {
                        borderRadius: 0,
                    }
                }}
            >
                <VideoPlayer src={state.context.src} isPlaying={isPlaying} />
            </Modal>
        </Flex>
    );
}

export default VideoPlayerModal;