import { Typography } from 'antd';
import { memo } from 'react';
import { VideoPlayerContext } from '../machine/VideoPlayerContext';

const formatTime = (s: number) => {
  if (!Number.isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

const TitleModal: React.FC = () => {
  const currentTime = VideoPlayerContext.useSelector((s) => s.context.currentTime);
  const duration = VideoPlayerContext.useSelector((s) => s.context.duration);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Typography.Title level={5} style={{ margin: 0, textTransform: 'uppercase' }}>
        Player
      </Typography.Title>
      <Typography.Text type="secondary">
        {formatTime(currentTime)} / {formatTime(duration)}
      </Typography.Text>
    </div>
  );
};

export default memo(TitleModal);
