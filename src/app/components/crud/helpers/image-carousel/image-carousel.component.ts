import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.less']
})
export class ImageCarouselComponent implements OnInit {
	images: Array<any> = [];
	constructor() { 
		this.images = ['assets/carousel/nollep2022.png'];
	}

	ngOnInit() {
	}

}
