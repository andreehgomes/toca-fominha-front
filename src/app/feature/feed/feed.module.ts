import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { FeedRoutingModule } from './feed-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule, 
    FeedRoutingModule,
    MatSidenavModule
  ],
})
export class FeedModule {}
