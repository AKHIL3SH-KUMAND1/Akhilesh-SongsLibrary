import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component,Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/material/material.module';
import { SongData } from 'src/models/song.model';
import { AddSongDialogComponent } from './components/add-song-dialog/add-song-dialog.component';
import { DeleteSongsDialogComponent } from './components/delete-songs-dialog/delete-songs-dialog.component';


@NgModule({
  declarations: [
    AddSongDialogComponent,
  DeleteSongsDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ 
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
