import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { ToastController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { catchError, map, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private hitApiFlag: boolean = true;
  private apiKey: string;
  private loading: HTMLIonLoadingElement = undefined;
  private apiURL: string;

  constructor(
    private network: Network,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private http: HttpClient
  ) { }

  public async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }

  private async showLoader() {
    this.loading = await this.loadingCtrl.create({
      spinner: "circles",
    });
    await this.loading.present();
  }

  private hideLoader() {
    this.loading.dismiss();
  }

  public getData(url, queryData, type = 'news', loader: boolean = true) {
    this.apiURL = type == 'news' ? 'https://newsapi.org/v2/' : 'https://free.currencyconverterapi.com/api/v6/';
    this.apiKey = type == 'news' ? "&apiKey=37519607c999405d91179880bff95665" : '';
    if (this.hitApiFlag) {
      this.hitApiFlag = false;
      if (this.network.type == 'none') {
        this.showToast('No network, Please check your connection.');
        this.hitApiFlag = true;
        return;
      }

      if (loader) this.showLoader();
      return this.http.get<any>(this.apiURL + url + '?' + queryData + this.apiKey).pipe(
        timeout(20000),
        map(result => {
          this.hitApiFlag = true;
          if (loader) this.hideLoader();
          if (result.status != "ok") {
            this.showToast(result.message);
          }
          return result;
        }),
        catchError(err => {
          this.hitApiFlag = true;
          if (loader) this.hideLoader();
          this.showToast(err.error.message);
          throw 'error in source. Details: ' + JSON.stringify(err);
        })
      )
    }
  }

}
