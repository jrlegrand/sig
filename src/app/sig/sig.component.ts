import { Component, OnInit } from '@angular/core';
import {  
  FormBuilder,  
  FormGroup, 
  FormControl,  
  Validators,  
  AbstractControl  
} from '@angular/forms';

import { SigParser } from '../parsers/sig-parser';
import { FrequencyParser } from '../parsers/frequency-parser';
import { DoseParser } from '../parsers/dose-parser';
import { RouteParser } from '../parsers/route-parser';
import { DurationParser } from '../parsers/duration-parser';
import { IndicationParser } from '../parsers/indication-parser';
import { MethodParser } from '../parsers/method-parser';

@Component({
  selector: 'app-sig',
  templateUrl: './sig.component.html',
  styleUrls: ['./sig.component.css'],
  providers: [
	SigParser,
	FrequencyParser,
	DoseParser,
	RouteParser,
	DurationParser,
	IndicationParser,
	MethodParser
  ]
})
export class SigComponent implements OnInit {
  sigForm: FormGroup;
  sigControl: AbstractControl;
  
  sig: any[] = [];
  
  inputStrings: string[] = [];
  sigStrings: string[] = [];

  constructor(
		private fb: FormBuilder,
		private sigParser: SigParser
  ) {
	  
    this.sigForm = fb.group({
      'sigControl':  ''
	  // weird sigs to figure out:
	  // Take 2 tablets on day 1 and 1 tablet on days 2-5 (tricky part is the 'and')
	  // 3 tabs p.o. x 1 with food on day 1. Thereafter, 1 tab p.o. t.i.d. with food to complete a 5 day course (tricky part is the 5 day course, and 'thereafter')
	  // Take 1 tablet (25 mg total) by mouth nightly. Start with 1 tablet (25mg) by mouth before bed. Increase by 1 tablet every 5 days until a maximum of 5 tablets (125mg) by mouth (tricky part is increase by x tablet)
    });

    this.sigControl = this.sigForm.controls['sigControl'];
	  
    this.sigControl.valueChanges.subscribe(
      (value: string) => {
		this.inputStrings = value.split('\n');
		this.sig = [];
		
		this.inputStrings.forEach((s, i) => {
			this.sigParser.parse(s);
			this.sig.push(this.sigParser.getSig());
			console.log(this.sig);
		});

		}
    );

	/*
	this.sigString = this.sigControl.value;
	this.sigParser.parse(this.sigString);
	this.sig = this.sigParser.getSig();
	*/
  }

  ngOnInit() { } 
}