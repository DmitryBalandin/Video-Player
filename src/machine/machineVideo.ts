import { assign, raise, setup } from 'xstate';
import type { VideoContext, VideoEvents, VideoStates } from '../types/types';

const actions = {
  playVideo: () => {
    console.log('[ACTION] playVideo');
  },
  pauseVideo: () => {
    console.log('[ACTION] pauseVideo');
  },
  notifyDetach: () => {
    console.log('[ACTION] notifyDetach – плеер оторван');
  },
  notifyClose: () => {
    console.log('[ACTION] notifyClose – оторванный плеер закрыт');
  },
  setVolume: () => {
    console.log(`[ACTION] setVolume:`);
  },
  muteVideo: () => {
    console.log('[ACTION] muteVideo');
  },

  unmuteVideo: () => {
    console.log('[ACTION] unmuteVideo');
  },
};

export const machine = setup({
  types: {} as {
    context: VideoContext;
    events: VideoEvents;
    states: VideoStates;
  },
  actions,
}).createMachine({
  id: 'videoPlayer',
  type: 'parallel',
  context: {
    src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    size: 'large',
    volume: 0,
  },
  states: {
    playback: {
      initial: 'paused',
      states: {
        playing: {
          entry: 'playVideo',
          on: {
            PAUSE: 'paused',
          },
        },
        paused: {
          entry: 'pauseVideo',
          on: {
            PLAY: 'playing',
          },
        },
      },
    },
    muted: {
      initial: 'unmuted',
      states: {
        muted: {
          entry: 'muteVideo',
          on: {
            UNMUTE: 'unmuted',
            TOGGLE_MUTE: 'unmuted',
          },
        },

        unmuted: {
          entry: 'unmuteVideo',

          on: {
            MUTE: 'muted',
            TOGGLE_MUTE: 'muted',
          },
        },
      },
    },
    ui: {
      initial: 'inline',
      states: {
        inline: {
          on: {
            DETACH: {
              target: 'detached',
            },
          },
        },

        detached: {
          on: {
            CLOSE_DETACHED: {
              target: 'inline',
              actions: raise(() => ({
                type: 'PAUSE',
              })),
            },
          },
        },
      },
    },
  },
  on: {
    TOGGLE_SIZE: {
      actions: assign({
        size: ({ context }) => (context.size === 'small' ? 'large' : 'small'),
      }),
    },
    SET_VOLUME: {
      actions: [
        assign({ volume: ({ event }) => event.volume }),
        raise(() => ({
          type: 'UNMUTE',
        })),
        'setVolume',
      ],
    },
  },
});
