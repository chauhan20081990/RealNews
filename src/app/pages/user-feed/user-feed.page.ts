import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { COUNTRY, SOURCE, CATEGORY, LANGUAGE, SORTBY } from '../../service/filter-data';

// Provider
import { FeedService } from '../../service/feed.service';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.page.html',
  styleUrls: ['./user-feed.page.scss'],
})
export class UserFeedPage {

  public country = COUNTRY;
  public source = SOURCE;
  public category = CATEGORY;
  public language = LANGUAGE;
  public sortBy = SORTBY
  public type: string;
  public feedData;

  constructor(private modalCtrl: ModalController, private navParams: NavParams, private feed: FeedService) {
    this.type = navParams.get('type');

    this.setFeedValues();
  }

  // Function setFeedValues calling for setting the default value of feeds
  setFeedValues() {
    this.feedData = {
      country: this.feed.getFeedValue('country'),
      category: this.feed.getFeedValue('category').split(','),
      source: this.feed.getFeedValue('sources').split(','),
      language: this.feed.getFeedValue('language', 'all').split(','),
      sourceTop: this.feed.getFeedValue('sources', 'all').split(','),
      sortBy: this.feed.getFeedValue('sortBy', 'all')
    }
  }

  // Function resetFeed calling for reset the feed values
  resetFeed() {
    this.feed.resetFeedVar();
    this.setFeedValues();
  }

  // Function dismiss calling for dismiss the modal
  public dismiss(query: string = '') {
    this.modalCtrl.dismiss(query);
  }

  // Function selectChange calling on select one option between categor, country and source
  public selectChange(selectType: string) {
    if (selectType == 'country' || selectType == 'category') (this.type == 'top' ? this.feedData.source = '' : '')
    else if (selectType == 'source') (this.type == 'top' ? (this.feedData.country = '', this.feedData.category = '') : '')
  }

  // Function apply calling on feed apply
  public apply() {
    let query = "";
    if (this.type == 'top') {
      query = "country=" + this.feedData.country + '&';
      if (this.feedData.category && this.feedData.category.length) query += "category=" + this.feedData.category.join(',') + '&';
      if (this.feedData.source && this.feedData.source.length) query += "sources=" + this.feedData.source.join(',') + '&';
    } else {
      if (this.feedData.language && this.feedData.language.length) query += "language=" + this.feedData.language.join(',') + '&';
      if (this.feedData.sourceTop && this.feedData.sourceTop.length) query += "sources=" + this.feedData.sourceTop.join(',') + '&';
      if (this.feedData.sortBy) query += "sortBy=" + this.feedData.sortBy + '&';
    }
    this.dismiss(query);
  }

}
