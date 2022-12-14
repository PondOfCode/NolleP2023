import { Injectable } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Injectable()
export class Globals {
	title: string;
	year: number;

	/// Menu Buttons
	/// https://getbootstrap.com/docs/4.0/components/buttons/
	/// FILL:    primary | secondary | success | danger | warning | info | light | dark
	/// OUTLINE: outline-primary | outline-secondary | outline-success | outline-danger | outline-warning | outline-info | outline-light | outline-dark
	buttonOne: string;
	buttonTwo: string;

	constructor(private ts: Title) {
		this.title = 'Nolleperioden';
		this.year = new Date().getFullYear();
		this.ts.setTitle(`Nollep ${this.year}`);

		this.buttonOne = 'btn-primary'
		this.buttonTwo = 'btn-outline-primary'
	}
}