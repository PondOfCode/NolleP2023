import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../../../globals';

@Component({
	selector: 'mobile-menu',
	templateUrl: './mobile-menu.component.html',
	styleUrls: ['./mobile-menu.component.less']
})
export class MobileMenuComponent implements OnInit {
	isExpanded: boolean;

	constructor(private globals: Globals) { 
	this.isExpanded = false;
	}

	ngOnInit() {  }
}
