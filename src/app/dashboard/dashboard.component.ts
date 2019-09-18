import { Component, OnInit, ElementRef ,ViewChild} from '@angular/core';  
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  
import { NotesService } from './../services/notes.service';
import { Note } from './../note';
import { FOODITEMS } from '../fooditems';
import { Items } from '../items';
import { BEVERAGEITEMS } from '../beverageitems';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit {
  fItems = FOODITEMS;
  bItems = BEVERAGEITEMS;
  selectedItems: Items;
  selectedBItems: Items;
  errMessage: String;
  note: Note = new Note();
  notes: Array<Note> = [];
  userDisplayName = ' ';
  constructor(private noteService: NotesService) { }
  ngOnInit() {
    this.userDisplayName = sessionStorage.getItem('loggedUser');
    console.log('user',this.userDisplayName);
    console.log('Food',this.fItems);
    console.log('Beverages',this.bItems);
    this.noteService.getNotes().subscribe(
      notes => this.notes = notes,
      err => this.errMessage = err.message
    );
  }
  onSelectFood(ffitem: Items): void {
    this.selectedItems = ffitem;
    
  }
  onSelectBeverage(bbitem: Items): void {
    this.selectedBItems = bbitem;
  }
  takeNotes() {
    if (this.note.title && this.note.text) {
      this.notes.push(this.note);
      this.noteService.addNote(this.note).subscribe(
        data => { },
        err => {
          const index: number =
            this.notes.findIndex(note => note.title === this.note.title);
          this.notes.splice(index, 1);
          this.errMessage = err.message;
        }
      );
      this.note = new Note();
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }
  public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }
}
