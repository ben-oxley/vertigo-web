import {Data} from './data';

export type DataListener = (added: Data[], remove: Data[]) => void;
