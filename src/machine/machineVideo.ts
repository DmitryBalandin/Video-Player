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
        src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
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