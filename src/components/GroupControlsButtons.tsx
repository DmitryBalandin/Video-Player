import { Button } from 'antd';

import {
    CaretRightOutlined ,
    PauseOutlined ,
    ShrinkOutlined,
    ArrowsAltOutlined,
} from '@ant-design/icons';



const GroupControlsButtons: React.FC = () => {
    return (
        <>
        <Button
                variant="outlined"
                shape="circle"
                size="large"
                icon={<ShrinkOutlined />}
           />
           <Button
                variant="outlined"
                shape="circle"
                color='default'
                size="large"
                icon={<PauseOutlined />}
           />
            <Button
                variant="outlined"
                shape="circle"
                size="large"
                icon={<ArrowsAltOutlined />}
           />
           <Button
                variant="outlined"
                shape="circle"
                color='default'
                size="large"
                icon={<CaretRightOutlined />}
           />
        </>
    )
};

export default GroupControlsButtons;