import { Injectable } from '@angular/core';
import { songs } from 'src/assets/songs';
import { Song,SongData } from 'src/models/song.model'
import { Sort } from '@angular/material/sort';
@Injectable({
  providedIn: 'root'
})
export class SongsServices {
  songsList:Array<Song> = songs;
  constructor() { }
  

  removeSongs(deleteSongs:Song[]){
    deleteSongs.forEach(song=>{
      let index = this.songsList.findIndex(songObj => songObj.id === song.id)
      this.songsList.splice(index,1);
    })
  }

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
  getFilteredSongs(query: {songName: string, artistName: string}): Song[] {
    return this.songsList.filter((song)=>song.songName.toLowerCase().includes(query.songName.toLowerCase()) && song.artistName.toLowerCase().includes(query.artistName.toLowerCase()) )
  } 

  //compare function 
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

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

  // getSongsSortedBySongName(query: {ascending:boolean,descending:boolean}){
  //   let tempSongsList = this.songsList;
  //   return tempSongsList.sort((song1,song2)=>{
  //     let songName1 = song1.songName.toLowerCase();
  //     let songName2 = song2.songName.toLowerCase();
  //     if(songName1>songName2){
  //       if(query.ascending){
  //         return 1;
  //       }
  //       else{
  //         return -1;
  //       }
  //     }
  //     if(songName1<songName2){
  //       if(query.ascending){
  //         return -1;
  //       }
  //       else{
  //         return 1;
  //       }
  //     }
  //     return 0;

  //   })
  // }
  // getSongsSortedByArtistName(query: {ascending:boolean,descending:boolean}){
  //   let tempSongsList = this.songsList;
  //   return tempSongsList.sort((song1,song2)=>{
  //     let artistName1 = song1.artistName.toLowerCase();
  //     let artistName2 = song2.artistName.toLowerCase();
  //     if(artistName1>artistName2){
  //       if(query.ascending){
  //         return 1;
  //       }
  //       else{
  //         return -1;
  //       }
  //     }
  //     if(artistName1<artistName2){
  //       if(query.ascending){
  //         return -1;
  //       }
  //       else{
  //         return 1;
  //       }
  //     }
  //     return 0;

  //   })
  // }
  // getSongsSortedByNoOfStreams(query: {ascending:boolean,descending:boolean}){
  //   let tempSongsList = this.songsList;
  //   return tempSongsList.sort((song1,song2)=>{
  //     let numberOfStreams1 = song1.numberOfStreams;
  //     let numberOfStreams2 = song2.numberOfStreams;
  //     if(numberOfStreams1>numberOfStreams2){
  //       if(query.ascending){
  //         return 1;
  //       }
  //       else{
  //         return -1;
  //       }
  //     }
  //     if(numberOfStreams1<numberOfStreams2){
  //       if(query.ascending){
  //         return -1;
  //       }
  //       else{
  //         return 1;
  //       }
  //     }
  //     return 0;

  //   })
  // }
  // getSongsSortedByReleaseYear(query: {ascending:boolean,descending:boolean}){
  //   let tempSongsList = this.songsList;
  //   return tempSongsList.sort((song1,song2)=>{
  //     let releaseYear1 = song1.releaseYear;
  //     let releaseYear2 = song2.releaseYear;
  //     if(releaseYear1>releaseYear2){
  //       if(query.ascending){
  //         return 1;
  //       }
  //       else{
  //         return -1;
  //       }
  //     }
  //     if(releaseYear1<releaseYear2){
  //       if(query.ascending){
  //         return -1;
  //       }
  //       else{
  //         return 1;
  //       }
  //     }
  //     return 0;

  //   })
  // }
  // getSongsSortedByDuration(query: {ascending:boolean,descending:boolean}){
  //   let tempSongsList = this.songsList;
  //   return tempSongsList.sort((song1,song2)=>{
  //     let duration1 = song1.durationInSeconds;
  //     let duration2 = song2.durationInSeconds;
  //     if(duration1>duration2){
  //       if(query.ascending){
  //         return 1;
  //       }
  //       else{
  //         return -1;
  //       }
  //     }
  //     if(duration1<duration2){
  //       if(query.ascending){
  //         return -1;
  //       }
  //       else{
  //         return 1;
  //       }
  //     }
  //     return 0;

  //   })
  // }

}
