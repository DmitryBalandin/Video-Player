import { createMachine } from "xstate";
import {type VideoContext, type VideoEvents, type VideoStates } from "../types/types";

const videoMachine = createMachine({
    id: 'player',
    types: {} as {
        context: VideoContext;
        events: VideoEvents;
        states: VideoStates;
    },
    context: {
        src: 'https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8'
    },
    initial: 'closedPlayer',
    states: {
        closedPlayer: {
            on: {
                toggle: 'openPlayer'
            }
        },
        openPlayer: {
            on: {
                toggle: 'closedPlayer',
                'key.escape': 'closedPlayer',
                play: 'fullScreenPlaying',
                miniScreen: 'miniScreenPause'
            },
        },
        fullScreenPlaying: {
            on: {
                stop: 'fullScreenPause',
                toggle: 'closedPlayer',
                miniScreen: 'miniScreenPlaying'
            }
        },
        fullScreenPause: {
            on: {
                play: 'fullScreenPlaying',
                toggle: 'closedPlayer',
                miniScreen: 'miniScreenPause'
            }
        },
        miniScreenPlaying: {
            on: {
                stop: 'miniScreenPause',
                toggle: 'closedPlayer',
                fullScreen: 'fullScreenPlaying'
            }
        },
        miniScreenPause: {
            on: {
                play: 'miniScreenPlaying',
                toggle: 'closedPlayer',
                fullScreen: 'fullScreenPause'
            }
        }
    }
})

export default videoMachine;