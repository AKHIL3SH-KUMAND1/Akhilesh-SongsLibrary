import { Injectable } from '@angular/core';
import { songs } from 'src/assets/songs';
import { Song,SongData } from 'src/models/song.model'
@Injectable({
  providedIn: 'root'
})
export class SongsServices {
  songsList:Array<Song> = songs;
  constructor() { }
  

  //removes all the songs present in the array from the songsList array
  removeSongs(deleteSongs:Song[]){
    deleteSongs.forEach(song=>{
      let index = this.songsList.findIndex(songObj => songObj.id === song.id)
      this.songsList.splice(index,1);
    })
  }

  //adds song to the songsList array
  addSong(songData:SongData){
    console.log(songData);
    let song:Song = {
      id : (Math.random() * 10000).toString(),
      songName:songData.songName,
      artistName:songData.artistName,
      numberOfStreams:songData.numberOfStreams,
      releaseYear:songData.releaseYear,
      durationInSeconds:songData.durationInSeconds
    } 
    this.songsList.push(song);
  }
  

  //return the filtered songs on the basis of song name as well as artist name 
  getFilteredSongs(query: {songName: string, artistName: string}): Song[] {
    return this.songsList.filter((song)=>song.songName.toLowerCase().includes(query.songName.toLowerCase()) && song.artistName.toLowerCase().includes(query.artistName.toLowerCase()) )
  } 

  //compare function 
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  //returns the filtered songs data in the sorted format
  getSortedData(query:{songNameFilter:string,artistNameFilter:string,column:string,dir:string}){
    if(query.dir === 'none'){
      console.log("none")
      console.log(this.songsList[0])
      return this.getFilteredSongs({songName:query.songNameFilter,artistName:query.artistNameFilter});
    }

    const sortedSongs = [...this.getFilteredSongs({songName:query.songNameFilter,artistName:query.artistNameFilter})];
    return sortedSongs.sort((a,b)=>{
      const isAsc = query.dir === 'asc';
      switch (query.column) {
        case 'songName':
          return this.compare(a.songName, b.songName, isAsc);
        case 'artistName':
          return this.compare(a.artistName, b.artistName, isAsc);
        case 'numberOfStreams':
          return this.compare(a.numberOfStreams, b.numberOfStreams, isAsc);
        case 'releaseYear':
          return this.compare(a.releaseYear, b.releaseYear, isAsc);
        case 'durationInSeconds':
          return this.compare(a.durationInSeconds, b.durationInSeconds, isAsc);
        default:
          return 0;
      }
    })
  }

  

}
