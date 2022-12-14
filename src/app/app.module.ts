import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule }            from '@ng-bootstrap/ng-bootstrap';
import { HttpModule }           from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule }     from '@angular/common/http';
import { CookieService }        from 'ngx-cookie-service';
// import { nib } from '../../node_modules/nib';

import { Globals } from '../globals'

import { AppComponent }           from './app.component';
import { HomeComponent }          from './components/home/home.component';
import { VoteComponent }          from './components/vote/vote.component';
import { ScoreboardComponent }    from './components/scoreboard/scoreboard.component';
import { NewStudentComponent }    from './components/new-student/new-student.component';
import { CrudComponent }          from './components/crud/crud.component';
import { ActivityComponent }      from './components/activity/activity.component';
import { SocialMediasComponent }  from './components/crud/helpers/social-medias/social-medias.component';
import { MobileMenuComponent }    from './components/crud/helpers/mobile-menu/mobile-menu.component';
import { ImageCarouselComponent } from './components/crud/helpers/image-carousel/image-carousel.component';
import { LetterToNollanComponent } from './components/letter-to-nollan/letter-to-nollan.component';
import { MemoryComponent } from './components/games/memory/memory.component';
import { VideosComponent } from './components/videos/videos.component';
// import { TitleComponent }         from './components/crud/helpers/title/title.component';


// import {RoutesArray} from './../app.routes';

/**
 * ROUTES
 */
const appRoutes: Routes = [
  { path: 'home',             component: HomeComponent },
  { path: 'new-student',      component: NewStudentComponent },
  { path: 'vote',             component: VoteComponent },
  { path: 'scoreboard',       component: ScoreboardComponent },
  { path: 'activity',         component: ActivityComponent },
  { path: 'letter-to-nollan', component: LetterToNollanComponent },
  { path: 'memory',           component: MemoryComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'videos',            component: VideosComponent},
  { path: '**',               component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VoteComponent,
    ScoreboardComponent,
    NewStudentComponent,
    CrudComponent,
    ActivityComponent,
    SocialMediasComponent,
    MobileMenuComponent,
    ImageCarouselComponent,
    LetterToNollanComponent,
    MemoryComponent,
    VideosComponent
    // TitleComponent
  ],
  imports: [
    NgbModule.forRoot(), // Bootstrap module
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // debugging purposes only
    ),
    HttpModule,
    HttpClientModule
  ],
  providers: [{
      provide: LocationStrategy, 
      useClass: HashLocationStrategy,
    },
    Globals,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
