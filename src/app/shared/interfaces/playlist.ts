import {Music} from "./music";

export interface Playlist {
  id: number,
  name: string,
  songs: Music[]
}
