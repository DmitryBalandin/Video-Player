import {
  ArrowsAltOutlined,
  CaretRightOutlined,
  MutedOutlined,
  PauseOutlined,
  ShrinkOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import { Button, Flex, Slider } from 'antd';
import { memo } from 'react';
import type { GroupControlsButtonsProps } from '../types/types';

const GroupControlsButtons: React.FC<GroupControlsButtonsProps> = ({
  handlePlayer,
  handleScreenSize,
  handleVolumeChange,
  onToggleMute,
  isPlaying,
  isMiniScreen,
  volume,
  isMuted,
}) => {
  return (
    <Flex align="center" justify="end" gap={12}>
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

      <Flex
        align="center"
        gap={8}
        style={{
          minWidth: 120,
        }}
      >
        <Button
          variant="text"
          size="small"
          onClick={onToggleMute}
          icon={isMuted || volume === 0 ? <MutedOutlined /> : <SoundOutlined />}
        />

        <Slider
          min={0}
          max={1}
          step={0.1}
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          style={{
            width: 80,
            margin: 0,
          }}
          tooltip={{
            formatter: (value) => `${Math.round((value || 0) * 100)}%`,
          }}
        />
      </Flex>
    </Flex>
  );
};

export default memo(GroupControlsButtons);
