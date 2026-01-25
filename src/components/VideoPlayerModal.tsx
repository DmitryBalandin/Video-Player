import { useState } from 'react';
import { Button, Modal, Flex } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import VideoPlayer from './VideoPlayer';
import TitleModal from './TitleModal';
import GroupControlsButtons from './GroupControlsButtons';


const VideoPlayerModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
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
                    onClick={showModal}
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
                footer={<GroupControlsButtons />}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                width='50vw'
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