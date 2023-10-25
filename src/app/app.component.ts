import { Component, EventEmitter, Output, OnInit, Inject } from '@angular/core';
import { Song,SongData } from 'src/models/song.model';
import { SongsServices } from 'src/shared/services/songs.service';
import { FormGroup, FormControl } from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddSongDialogComponent } from '../shared/components/add-song-dialog/add-song-dialog.component';
import { DeleteSongsDialogComponent } from 'src/shared/components/delete-songs-dialog/delete-songs-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';

export interface DialogData {
  songName: string;
  artistName: string;
  numberOfStreams: number;
  releaseYear: number;
  durationInSeconds: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'songsLibrary';
  pageIndex: number = 0;
  pageSize: number = 10;
  currentValue = "none";
  displayedSongs: Array<Song> = [];
  allSongs: Array<Song> = [];
  filteredSongs: Array<Song> = [];
  checked : Song[] = []
  deleteDisabled = true;
  direction = {
    'songName' : "none",
    'artistName': "none",
    'numberOfStreams': "none",
    'releaseYear': "none",
    'durationInSeconds': "none",
  }
  form:FormGroup = new FormGroup({
    songName : new FormControl(''),
    artistName : new FormControl(''),
  })
  @Output() page = new EventEmitter<any>;
  onChangePage(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.displaySongs()
  }
  ngOnInit(): void {
    this.filteredSongs = this.allSongs;
    this.form.valueChanges.subscribe(song=>{
      console.log(song)
      this.pageIndex = 0;
      this.pageSize = 10;
      this.filteredSongs = this.songsServices.getFilteredSongs({songName:song.songName,artistName:song.artistName});
      this.displaySongs()
    })
    this.displaySongs()
  }

  constructor(public songsServices: SongsServices,private dialog: MatDialog) {
    this.allSongs = songsServices.songsList;
  }

  displaySongs() {
    this.displayedSongs = [];
    console.log(this.pageIndex)
    console.log(this.pageSize)
    for (let i = (this.pageIndex * this.pageSize); i < (this.pageIndex + 1) * this.pageSize && i < this.filteredSongs.length; i++)
      this.displayedSongs.push(this.filteredSongs[i]);
  }

  calculateDuration(duration: number): string {
    let minutes: number = Math.floor(duration / 60);
    let seconds: number = duration - minutes * 60;
    let result: string =
      (minutes < 10 ? '0' + minutes : minutes) +
      ' : ' +
      (seconds < 10 ? '0' + seconds : seconds);
    return result;
  }

  sortData(column:string,dir:string){
    console.log(column)
    console.log(this.direction['songName'])
    console.log(dir)
    this.filteredSongs = this.songsServices.getSortedData({songNameFilter:this.form.value['songName'],artistNameFilter:this.form.value['artistName'],column:column,dir:dir})
    this.displaySongs()
  }

  openAddDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "800px";
    dialogConfig.height = "300px";
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus = true;
    this.dialog.open(AddSongDialogComponent,dialogConfig) 
    const dialogRef = this.dialog.open(AddSongDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
        data => {
          console.log(data)
          if(data !== undefined){
          this.songsServices.addSong(data)
          }
        }
    ); 
  }

  openDeleteDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "800px";
    dialogConfig.height = "300px";
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus = true;
    dialogConfig.data = {
      deletedSongs : this.checked,
    }
    this.dialog.open(DeleteSongsDialogComponent,dialogConfig) 
    const dialogRef = this.dialog.open(DeleteSongsDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
        data => {
          console.log(data)
          if(data === true){
          this.songsServices.removeSongs(this.checked)
          }
          this.checked = [];
        }
    ); 
  }

  checkBoxClicked(song:Song){
      if(this.checked.find(songVer => songVer.id === song.id)){
        this.checked = this.checked.filter(songVer => songVer.id !== song.id)
      }
      else{
        this.checked.push(song);
      }
      if(this.checked.length > 5 || this.checked.length <= 0){
        this.deleteDisabled = true;
      }else{
        this.deleteDisabled = false;
      }
  }


}
