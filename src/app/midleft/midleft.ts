import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Readjson } from '../services/readjson';
import { Intdateprice, Inttakeaways, Intmfdetails} from '../interfaces/intdateprice';
import { firstValueFrom, take } from 'rxjs';
import { mymfdata } from '../../assets/mfdetails.json';

@Component({
  selector: 'app-midleft',
  imports: [CommonModule],
  templateUrl: './midleft.html',
  styleUrl: './midleft.css'
})
export class Midleft implements OnInit{
  data: Intdateprice[] = []; // to get Json data from Service
  takeaways: Inttakeaways[] = []; //to populate takeaways
  mfdetails: Intmfdetails[] = []; // to populate mf details
  _mfdata: any;
  _numofdays: number = 30;
  _mfnum: number = 0;
  _beginingtexttoshow = "There is a : ";
  _endingtexttoshow = " chance that your capital is at risk within ";
  _finaltexttoshow = "";
  //Constructor
  constructor(private _filename:Readjson){
  }

  ngOnInit(): void {
    this._mfdata = mymfdata
   // console.log(this.data);
  }


  MFDetails(MfNum:any, Numofdays:any){
    //validation for MF number
      if (!Number.isNaN(Number(MfNum))) {
        //we can move fwd, else we need to provide an error and return
       } else {
        alert("Please enter valid MF number");
        return;
       }
    //Validation for Num of days
      if (!Number.isNaN(Number(Numofdays)) && (Number(Numofdays) >= 2)) {
        //we can move fwd, else we need to provide an error and return
      } else {
        alert("Please enter valid number of days between 2 and 1000");
        return;
      }
      //Check if the file exists or not
      this._filename.setFilename(MfNum);
      //Check if the backend API is giving a response.
      if(this._filename.checkIfExists()){
        alert("Sorry no data received from the backend service.")
      }
      //check the data provided by this API
      this._filename.getData().subscribe(response => {
        if (response === null) {
          alert("Sorry Data does not exist for this MF Code");
          return;
        }
        else {
          console.log (response);
        }
      });
    }
}
