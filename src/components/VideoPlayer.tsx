import ReactPlayer from 'react-player';
import { type VideoPlayerProps } from '../types/types';

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, isPlaying }) => {
    return (
        <ReactPlayer
            src={src}
            playing={isPlaying}
            muted={true}
            controls={false}
            loop={true}
            width='100%'
            height='100%'
        />
    )
};

export default VideoPlayer;