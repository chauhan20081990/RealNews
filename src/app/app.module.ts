import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms';
 
// Providers
import { Network } from '@ionic-native/network/ngx';
import { HttpService } from './service/http.service';

// Page
import { NewsDetailPage } from './pages/news-detail/news-detail.page';
import { UserFeedPage } from './pages/user-feed/user-feed.page'

@NgModule({
  declarations: [
    AppComponent,
    NewsDetailPage,
    UserFeedPage
  ],
  entryComponents: [
    NewsDetailPage,
    UserFeedPage
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({
      mode: 'ios',
      backButtonText: ''
    }), 
    IonicStorageModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Network,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
