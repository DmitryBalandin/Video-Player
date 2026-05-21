import { createActorContext } from '@xstate/react';
import { machine } from './machineVideo';

export const VideoPlayerContext = createActorContext(machine);
