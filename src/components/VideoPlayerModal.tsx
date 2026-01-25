import { useState } from 'react';
import { Button, Modal, Flex, Typography } from 'antd';
import VideoPlayer from './VideoPlayer';
import GroupControlsButtons from './GroupControlsButtons';
const VideoPlayerModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const TitleModal: React.FC = () => {
        return (
            <Typography.Title
                level={5}
                style={{
                    margin: 0,

                    textTransform: 'uppercase'
                }}
            >
                Player
            </Typography.Title>
        )
    }

    const FooterModal: React.FC = () => {
        return (
            <Typography.Title
                level={5}

                style={{
                    margin: 0,

                    textTransform: 'uppercase'
                }}
            >
                Player
            </Typography.Title>
        )
    }

    return (
        <Flex
            justify="center"
            align="center"
            style={{
                minHeight: '100vh',
                width: '100%'
            }}
        >
            {!isModalOpen && (
                <Button type="primary" onClick={showModal}>
                    Open Modsdal
                </Button>
            )}
            <Modal
                title={<TitleModal />}
                closable={{ 'aria-label': 'Custom Close Button' }}
                footer={<GroupControlsButtons />}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                styles={{
                    container: {
                        borderRadius: 0,
                    }
                }}
            >
                <VideoPlayer />
            </Modal>
        </Flex>
    );
}


export default VideoPlayerModal