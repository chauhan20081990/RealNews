import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, InfiniteScroll, Refresher } from '@ionic/angular';

// Providers
import { HttpService } from '../../service/http.service';
import { FeedService } from '../../service/feed.service';

// Pages
import { NewsDetailPage } from '../news-detail/news-detail.page';
import { UserFeedPage } from '../user-feed/user-feed.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  @ViewChild(Refresher) refresher: Refresher;
  public newsArr: Array<any> = [];
  public newsFlag: string;
  public page: number = 1;

  constructor(private http: HttpService, private modalCtrl: ModalController, private feed: FeedService) { }

  ngOnInit() {
    this.newsFlag = "Fetching news...";
    this.getNews('init');
  }

  // Function refreshNews calling ionRefresh event
  public refreshNews(): void {
    this.newsFlag = "Fetching news...";
    this.page = 1;
    this.getNews('refresher');
  }

  // Function getNews calling for getting news from server
  public getNews(type: string): void {
    this.http.getData('top-headlines', this.feed.topHeadingFeed + 'page=' + this.page).subscribe(
      result => {
        if(type == 'refresher') this.refresher.complete();
        if(type == 'more') this.infiniteScroll.complete();
        if (result.status == "ok") {
          result.articles = result.articles.map(item => {
            if(item.urlToImage && item.urlToImage.indexOf('?') != -1)
            item.urlToImage = item.urlToImage + '&w=695';
            return item;
          });
          if (this.newsArr.length && type != 'refresher') this.newsArr = this.newsArr.concat(result.articles);
          else this.newsArr = result.articles;
          if (type == 'init' || type == 'refresher') {
            if (this.newsArr.length) this.newsFlag = "";
            else this.newsFlag = "No news found.";
          } else if (type == 'more') {
            if (this.newsArr.length == result.totalResults) {
              this.infiniteScroll.disabled = true;
            }
          }
        } else this.newsFlag = "No news found.";
      }, error => {
        this.newsFlag = "No news found."
        if(type == 'refresher') this.refresher.complete();
        if(type == 'more') this.infiniteScroll.complete();
      }
    )
  }

  // Function newsDetails calling for open detail page
  public async newsDetails(index) {
    const modal = await this.modalCtrl.create({
      component: NewsDetailPage,
      componentProps: { news: this.newsArr[index] }
    });
    return await modal.present();
  }

  // Function openUserFeed calling for open userFeed page
  public async openUserFeed() {
    const modal = await this.modalCtrl.create({
      component: UserFeedPage,
      componentProps: { type: 'top' }
    })

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.feed.saveFeed(data.data);
        this.page = 1;
        this.newsArr = [];
        this.infiniteScroll.disabled = false;
        this.getNews('init');
      }
    })

    return await modal.present();
  }

  // Function loadData calling on ionInfinite event
  public loadData(event):void {
    this.page++;
    this.getNews('more');
  }
}
