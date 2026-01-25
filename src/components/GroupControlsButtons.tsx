import { Button } from 'antd';
import {
    CaretRightOutlined,
    PauseOutlined,
    ShrinkOutlined,
    ArrowsAltOutlined,
} from '@ant-design/icons';
import { type GroupControlsButtonsProps } from '../types/types';

const GroupControlsButtons: React.FC<GroupControlsButtonsProps> = ({ handlePlayer, handleScreenSize, isPlaying, isMiniScreen }) => {
    return (
        <>
            <Button
                variant="outlined"
                shape="circle"
                size="large"
                onClick={handleScreenSize}
                icon={isMiniScreen ? <ArrowsAltOutlined /> : <ShrinkOutlined />}
            />
            <Button
                variant="outlined"
                shape="circle"
                color={isPlaying ? 'blue' : 'default'}
                size="large"
                onClick={handlePlayer}
                icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
            />
        </>
    )
};

export default GroupControlsButtons;