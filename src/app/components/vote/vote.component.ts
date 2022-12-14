import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../api.service';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

@Component({
  selector: 'vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.less']
})
export class VoteComponent implements OnInit {

	options: Array<string>;
	url: string;
	event: string;
	doneLoading: boolean;
	show: boolean;

	constructor(public http: HttpClient, private apiService: ApiService, private cookieService: CookieService) { 
		this.options = [];
		this.doneLoading = false;
		this.show = false;
	}

	ngOnInit() {
		this.http.get('/assets/event.json')
    	.subscribe((res: any) => {
			let today = moment(new Date());
			let arr = [];
			
			arr = res.filter(e => moment(e.date)
									.add(1, 'day')
									.subtract(5, 'minutes')
									.isAfter(today));
									
			/// Show variable to see if Nollep has started
			this.show = arr.length > 0 ? moment(today).isAfter(res[0].date) : false;

			if(arr.length) {
				this.event = arr[0].event;
			}

			this.doneLoading = true;
		});

		// this.apiService.read().subscribe((res: any[])=> {
		// 	console.log(res);
		// }, (e: any) => console.log("Error " + e));
	}
	
	vote(vote: any) {
		let uuid = this.cookieService.get(this.event);
		let obj = {
			vote: vote,
			event: this.event,
			uuid: uuid
		};

		this.apiService.create(obj).subscribe((res: any)=>{
			console.log("Entry created, ", res);
		});

	}
}
