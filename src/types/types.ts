export interface VideoContext {
    src: string;
    size: 'small' | 'large';
    volume: number
}

export type VideoEvents =
    | { type: 'PLAY' }
    | { type: 'PAUSE' }
    | { type: 'TOGGLE_SIZE' }
    | { type: 'DETACH' }       // оторвать плеер
    | { type: 'CLOSE_DETACHED' }
    | { type: 'SET_VOLUME'; volume: number }
    | { type: 'MUTE' }
    | { type: 'UNMUTE' }
    | { type: 'TOGGLE_MUTE' };

export type VideoStates = {
    playback: 'playing' | 'paused';
    ui: 'inline' | 'detached';
    muted: 'muted' | 'unmuted';
}

export interface VideoPlayerProps {
    src: string;
    volume: number;
    isMuted: boolean;
    handlePlayer: () => void;
};

export interface GroupControlsButtonsProps {
    handlePlayer: () => void;
    handleScreenSize: () => void;
    handleVolumeChange: (volume: number) => void;
    onToggleMute: () => void;
    isPlaying: boolean;
    isMiniScreen: boolean;
    volume: number;
    isMuted: boolean;
};