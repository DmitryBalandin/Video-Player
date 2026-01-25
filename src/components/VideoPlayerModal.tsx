import { useState } from 'react';
import { Button, Modal, Flex } from 'antd';
import VideoPlayer from './VideoPlayer';

const VideoPlayerModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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
            {!isModalOpen && (
                <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>
            )}
            <Modal
                title="Basic Modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <VideoPlayer />
            </Modal>
        </Flex>
    );
}


export default VideoPlayerModal