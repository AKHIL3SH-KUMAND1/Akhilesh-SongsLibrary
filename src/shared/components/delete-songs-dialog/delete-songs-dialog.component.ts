import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/material/material.module';
import { Song } from 'src/models/song.model';

@Component({
  selector: 'app-delete-songs-dialog',
  templateUrl: './delete-songs-dialog.component.html',
  styleUrls: ['./delete-songs-dialog.component.css'],
})
export class DeleteSongsDialogComponent {

  deletedSongs:Song[] = []
  constructor(public dialogRef: MatDialogRef<DeleteSongsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any){
      this.deletedSongs = this.data.deletedSongs
      console.log(this.deletedSongs)
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteSongs(){
    this.dialogRef.close("true");
  }
}
