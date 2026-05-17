import { createActor } from 'xstate';
import { machine } from './machineVideo';

export const videoActor = createActor(machine);