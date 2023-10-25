import { Component,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/material/material.module';
import { SongData } from 'src/models/song.model';

@Component({
  selector: 'app-add-song-dialog',
  templateUrl: './add-song-dialog.component.html',
  styleUrls: ['./add-song-dialog.component.css']
})
export class AddSongDialogComponent {
  form = new FormGroup({
    songName : new FormControl('',Validators.required),
    artistName : new FormControl('',Validators.required),
    numberOfStreams : new FormControl(null,Validators.required),
    releaseYear : new FormControl(null,Validators.required),
    durationInSeconds :  new FormControl(null,Validators.required)
  })

  constructor(private dialogRef: MatDialogRef<AddSongDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data:SongData){
      
    }


  add(){
    if(this.form.dirty || this.form.touched){
      this.dialogRef.close()
    }
    this.dialogRef.close(this.form.value)
  }

  close(){
    this.dialogRef.close()
  }
}
