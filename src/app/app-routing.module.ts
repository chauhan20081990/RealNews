import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'NewsDetail', loadChildren: './pages/news-detail/news-detail.module#NewsDetailPageModule' },
  { path: 'UserFeed', loadChildren: './pages/user-feed/user-feed.module#UserFeedPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
