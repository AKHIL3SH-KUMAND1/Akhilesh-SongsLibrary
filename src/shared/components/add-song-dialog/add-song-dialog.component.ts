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


  //onclick function to close the dialog as well as send the form data to the dialogref
  add(){
    this.dialogRef.close(this.form.value)
  }

  //onclick function to close the dialog without sending any data
  close(){
    this.dialogRef.close()
  }
}
