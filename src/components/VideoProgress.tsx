import { Slider } from 'antd';
import { memo, useCallback, useState } from 'react';
import { VideoPlayerContext } from '../machine/VideoPlayerContext';
import type { VideoProgressProps } from '../types/types';
import { formatTime } from '../utils/formatTime';

const VideoProgress: React.FC<VideoProgressProps> = ({ videoRef }) => {
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekingTime, setSeekingTime] = useState(0);

  const actorRef = VideoPlayerContext.useActorRef();
  const currentTime = VideoPlayerContext.useSelector((s) => s.context.currentTime);
  const duration = VideoPlayerContext.useSelector((s) => s.context.duration);

  const handleChange = useCallback((value: number) => {
    setIsSeeking(true);
    setSeekingTime(value);
  }, []);

  const handleAfterChange = useCallback(
    (value: number) => {
      const video = videoRef.current;
      if (video) {
        video.currentTime = value;
      }
      actorRef.send({ type: 'SEEK', currentTime: value });
      setIsSeeking(false);
    },
    [actorRef, videoRef],
  );

  return (
    <Slider
      min={0}
      max={duration || 0}
      step={0.1}
      value={isSeeking ? seekingTime : currentTime}
      onChange={handleChange}
      onChangeComplete={handleAfterChange}
      tooltip={{
        formatter: (value) => formatTime(value || 0),
      }}
      style={{
        margin: 0,
      }}
    />
  );
};

export default memo(VideoProgress);
