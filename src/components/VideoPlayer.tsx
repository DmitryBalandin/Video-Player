import ReactPlayer from 'react-player';
import { type VideoPlayerProps } from '../types/types';
import { useSelector } from '@xstate/react';
import { videoActor } from '../machine/videoActor';

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, volume, isMuted, handlePlayer }) => {

    const actor = videoActor
    const isPlaying = useSelector(actor, (state) => state.matches({ playback: 'playing' }));
        
    return (
        
        <ReactPlayer
            src={src}
            onClick={handlePlayer}
            playing={isPlaying}
            muted={isMuted}
            volume={volume}
            controls={false}
            loop={true}
            width='100%'
            height='100%'
        />
    )
};

export default VideoPlayer;