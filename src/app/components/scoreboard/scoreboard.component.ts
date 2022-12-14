import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.less']
})
export class ScoreboardComponent implements OnInit {

  scores: Array<object> = [];
  classImg: string = ''
  showScore: boolean = false;

  token: string = 'EAAGZBxkLdw7MBAJWfDIdpQpql7rV5QnyhFiFX0qynlzGZBuAu02XxDsywLcZAymnghhQHcsIx2S5kJAY3ZCgdSzD8MHBTllksSiDqwu7i4ZAPikSOZBCadxLGPfyYnU2oNZA3D5uEi4ZBC6kY6LM9PPlSfI8vFPmEnG0i68zX5r4iQp7wjvr0cdc7xE9tdB8BoQyyLhj0ukovQZDZD';
  pageId: string = '543660139400375';

  constructor(private http: Http) {  }

  ngOnInit() {
    this.http.get('/assets/score.json')
    .subscribe(res => {

      if(res.json()[0]['class'] === 'Överphösarna') {
        this.scores = this.ophQuotes(res);
        return;
      }

      this.showScore = !this.showScore;

      /// Sort score in ascending order
      this.scores = this.sortByKeys(res.json());

      if(this.scores[0].hasOwnProperty('class')) {

        // let foundSpace = this.scores[0]['class'].indexOf(' ');
        // if(foundSpace !== -1) {
        //   this.classImg = `/assets/Patches/Irl/${this.scores[0]['class'].replace(' ','_')}.png`;
        //   return;
        // }

        /// Get correct class image
        this.classImg = `/assets/Patches/Irl/${this.scores[0]['class']}.png`;

        /// Replace '_' with space
        this.scores.map(e => {
          if(e.hasOwnProperty('class')) {
            e['class'] = e['class'].split('_').join(' ');
          }
        }); 
      }
    }, error => console.log('Failed to load values!', error));
  }

  /// Easy enough so insertion sort can be used
  sortByKeys(values) {
    return values.sort((a, b) => {
      const x = a.score;
      const y = b.score;
      return ((x > y ? -1 : (x < y) ? 1 : 0));
    });
  }

  ophQuotes(res) {
    let tmp = res.json().filter(e => e.class === 'Överphösarna');

    let indexToShow = Math.floor(Math.random() * (tmp.length - 1));

    tmp.map((e, i) => {
      e['isVisible'] = i === indexToShow;
      return e;
    });

    return tmp;
  }

  flavorTextToShow() {
    let indexToShow = Math.floor(Math.random() * (this.scores.length - 1));

    if(this.scores[indexToShow]['isVisible']) {
      this.flavorTextToShow();
      return;
    }

    this.scores.map(e => e['isVisible'] = false);
    this.scores[indexToShow]['isVisible'] = true;
  }

}
