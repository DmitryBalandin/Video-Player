export interface VideoContext {
    src: string;
}

export type VideoEvents =
    | { type: 'toggle' }
    | { type: 'key.escape' }
    | { type: 'play' }
    | { type: 'stop' }
    | { type: 'miniScreen' }
    | { type: 'fullScreen' };

export type VideoStates =
    | { value: 'closedPlayer'; context: VideoContext }
    | { value: 'openPlayer'; context: VideoContext }
    | { value: 'fullScreenPlaying'; context: VideoContext }
    | { value: 'fullScreenPause'; context: VideoContext }
    | { value: 'miniScreenPlaying'; context: VideoContext }
    | { value: 'miniScreenPause'; context: VideoContext };

export interface VideoPlayerProps {
    src: string;
    isPlaying: boolean;
};

export interface GroupControlsButtonsProps {
    handlePlayer: () => void;
    handleScreenSize: () => void;
    isPlaying: boolean;
    isMiniScreen: boolean;
};