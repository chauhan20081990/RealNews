import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  public currencies;
  public selectedCur: string;
  public convertedCur: string;
  public amount: string;
  public convertedVal: number;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getData('currencies', '', 'currency').subscribe(
      result => {
        this.currencies = result.results;
        console.log(result.results.ALL);
      }, error => console.log(error)
    )
  }

  // Function convert for converting the value
  public convert() {
    if(!this.amount || !(/^\d+$/.test(this.amount))) {
      this.http.showToast('Please enter valid amount.');
      return;
    }
    if(!this.selectedCur) {
      this.http.showToast('Please select currency.');
      return;
    }
    
    this.http.getData('convert', 'q=' + this.selectedCur + '_INR&compact=y', 'currency').subscribe(
      result => {
        this.convertedVal = result[this.selectedCur + '_INR'].val * (+this.amount);
        this.convertedCur = this.selectedCur;
      }, error => console.log(error)
    )
  }

}
