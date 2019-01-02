import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { COUNTRY } from './filter-data';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  public topHeadingFeed;
  public allFeed;

  constructor(private storage: Storage) {
    this.setFeedVar();
  }

  // Function resetFeedVar for reset the feed value
  resetFeedVar () {
    this.topHeadingFeed = "country=in&";
    this.allFeed = 'language=en&sources=the-times-of-india,abc-news,news24,time';
  }

  // Function setFeedVar for setting the initial feed value
  setFeedVar() {
    this.storage.get('feed').then(
      feeds => {
        if (feeds) {
          this.topHeadingFeed = feeds.topHeadingFeed;
          this.allFeed = feeds.allFedd;
        } else {
          this.topHeadingFeed = "country=in&";
          this.allFeed = 'language=en&sources=the-times-of-india,abc-news,news24,time&';
        }
      }
    )
  }

  // Function saveFeed for storing the user feed
  saveFeed(feed, type: string = 'top') {
    switch (type) {
      case 'top':
        this.topHeadingFeed = feed;
        break;
      case 'all':
        this.allFeed = feed;
        break;
    }

    this.storage.set('feed', { topHeadingFeed: this.topHeadingFeed, allFedd: this.allFeed });
  }

  // Function getFeedValue for getting feed value
  getFeedValue (name: string, type: string = 'top') {
    let params = (type == 'top' ? new URLSearchParams(this.topHeadingFeed) : new URLSearchParams(this.allFeed));
    return params.has(name) ? params.get(name) : '';
  }
}
