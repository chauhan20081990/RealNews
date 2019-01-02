import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage {

  public news;
  public title: string;

  constructor(private navParams: NavParams, private modalCtrl: ModalController) {
    this.news = navParams.get('news');
    this.title = this.news.source.name.split('.')[0];
  }

  // Function dismiss calling to dismiss the modal
  dismiss() {
    this.modalCtrl.dismiss();
  }

  // Function openInBrowser calling open news link to browser
  openInBrowser() {
    window.open(this.news.url, '_system', 'location=yes');
  }
}
