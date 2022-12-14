import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.less']
})
export class ActivityComponent implements OnInit {

	img: string;
	show: boolean = false;
	date: string;

	constructor(public http: HttpClient) {

		this.http.get('/assets/event.json')
    	.subscribe((res: any) => {
			let today = moment(new Date());
			
			this.show = moment(today).isAfter(res[0].date);
			this.date = res[0].date;
		});

		let date = moment(new Date()).format('YYYYMMDD');
		this.img = `assets/activity/${date}.png`;
	}

	ngOnInit() { }

}
