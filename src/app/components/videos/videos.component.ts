import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.less']
})
export class VideosComponent implements OnInit {

  videos: any;
  constructor(private http: Http, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.http.get('/assets/videos.json')
    .subscribe(res => {
    this.videos = res.json();
    })
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
