import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as $ from 'jquery';
import * as moment from 'moment';

interface Card{
	phosare: string
 	card: string
	choosen: boolean
}

@Component({
  selector: 'memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.less']
})

export class MemoryComponent implements OnInit {

	cards: Array<Card>;
	showCards: Array<Card>;
	correct: number;
	choosen: Card;
	loaded: boolean;
	ended:  boolean;
	victoryText: string;
	show: boolean;
	startTimestamp: string;

	constructor(private http: Http) {
		this.loaded = false;
		this.correct = 0;
		this.ended  = false;
		this.victoryText = '';
		this.showCards = [];
		this.show = false;

		this.http.get('assets/memory.json')
		.subscribe(res => {
			let tmp = res.json()

			if(tmp[0].closed) {
				return
			}
			this.cards = res.json();
			this.cards.shift(); //Removes closed from the array of cards
			this.show = true;
			this.chooseCard();
			this.start();
			this.loaded = true;
		});
	}

	ngOnInit() {
	}

	_reset() {
		this.correct = 0;
		this.ended  = false;

		this.cards.map((e: Card) => delete e.choosen);
		this.chooseCard();
		this.start();
	}

	chooseCard(event = undefined, card: string = '') {
		let regex = /[a-z]/g;
		let id = event !== undefined ? event.target.id.replace(regex, '') : undefined;
		id = `box${id}`;
		let tmp = this.cards.filter((e: Card) => Object(e).hasOwnProperty('choosen'));

		/// Answered correct
		let correctBool = false;
		if(this.choosen && !this.ended) {
			correctBool = card === this.choosen.card;
		}

		if(tmp.length >= 1) {
			this.answerHandling(correctBool, id);
		}
		
		if(tmp.length === this.cards.length) {
			/// 100% Correct Answers
			if(this.correct === this.cards.length) {
				this.victoryText = 'Bra jobbat!';
				this.ended = true;
			}
			/// Partialy Correct Answers
			else {
				this.victoryText = 'Du fick delvis rätt';
				this.ended = true;
			}

			return;
		}
		
		/// Filter out already picked cards
		tmp = this.cards.filter((e: Card) => !Object(e).hasOwnProperty('choosen'));

		/// Pick a card
		let i = Math.floor(Math.random() * Math.floor(tmp.length));
		this.choosen = tmp[i];

		/// Random Cards to show
		let tmpCards = [];
		let choosenCardsIndex = [];
		while(tmpCards.length < 3) {
			i = Math.floor(Math.random() * Math.floor(this.cards.length));
			let unique = choosenCardsIndex.find(e => e === i);

			if(this.cards[i].phosare !== this.choosen.phosare && !unique) {
				choosenCardsIndex.push(i);
				tmpCards.push(this.cards[i]);
			}
		}
		let where =  Math.floor(Math.random() * Math.floor(4));
		tmpCards.splice(where, 0, this.choosen);
		this.showCards = tmpCards;

		/// Update Card
		this.cards.map<any>((cur: Card, i: number) => {
			if(cur.phosare === this.choosen.phosare) {
				cur.choosen = true;
			}
		});
	}

	answerHandling(bool: boolean = false, id: string = '') {
		let text = '#fff';
		let selector = '.score';

		if(bool) {
			this.correct++;
			text = 'green';
		}
		else {
			text = 'red';
		}

		$(selector).css({'z-index': '2', 'color': text});
		$(selector).addClass('appear');

		$(selector).on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
			$(this).removeClass('appear');
			$(this).css({'z-index': '-2'});
		});
	}

	start() {
		this.startTimestamp = this.getTimestampMili();
	}

	getTimer() {
		let diff = parseInt(this.getTimestampMili()) - parseInt(this.startTimestamp);
		let timer = moment.duration(diff, 'milliseconds');
		let format = moment(diff)
						.format('mm:ss:SSS')
						.split(':')
						.filter(e => e !== '00')
						.join(':');

		return format;
	}

	getTimestampMili() {
		return moment(new Date()).format('x');
	}
}
