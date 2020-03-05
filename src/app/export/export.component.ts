import { Component, OnInit } from '@angular/core';

import { SigParser } from '../parsers/sig-parser';
import { FrequencyParser } from '../parsers/frequency-parser';
import { DoseParser } from '../parsers/dose-parser';
import { RouteParser } from '../parsers/route-parser';
import { DurationParser } from '../parsers/duration-parser';
import { IndicationParser } from '../parsers/indication-parser';
import { MethodParser } from '../parsers/method-parser';
//import 'rxjs/add/operator/flatMap';
import { forkJoin } from 'rxjs/observable/forkJoin';


import { SigService } from '../sig.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],
  providers: [
	SigParser,
	FrequencyParser,
	DoseParser,
	RouteParser,
	DurationParser,
	IndicationParser,
	MethodParser,
	SigService
  ]
})
export class ExportComponent implements OnInit {
  sig: any[] = [];
  
  sigStrings: string[] = [];

  constructor(
		private sigParser: SigParser,
		private sigService: SigService
  ) {
	  
	this.sig = [];
	this.sigStrings = [];
	
		this.sigService.getSigs()
			.subscribe(sigs => sigs.forEach(sig => {
				this.sigParser.parse(sig.original_sig);
				var parsedSig = this.sigParser.getSig();
				
				this.sig.push(parsedSig);
				
				var methodExists, doseExists, routeExists, frequencyExists, durationExists, indicationExists;
				methodExists = doseExists = routeExists = frequencyExists = durationExists = indicationExists = 'N';
				//console.log('parsedSig', parsedSig[0].stdText);
				var textSig = '';
				var fhirJson = [];
				
				for (var i = 0; i < parsedSig.length; i++) {
					textSig += (i > 0 ? ', then ' : '') + parsedSig[i].stdText.trim();
					fhirJson.push(parsedSig[i].standardized);
					if (parsedSig[i].method.length > 0) methodExists = 'Y';
					if (parsedSig[i].dose.length > 0) doseExists = 'Y';
					if (parsedSig[i].route.length > 0) routeExists = 'Y';
					if (parsedSig[i].frequency.length > 0) frequencyExists = 'Y';
					if (parsedSig[i].duration.length > 0) durationExists = 'Y';
					if (parsedSig[i].indication.length > 0) indicationExists = 'Y';
				}
				
				sig.generated_sig = textSig;
				sig.generated_fhir_json = JSON.stringify(fhirJson);
				sig.parsed_method_yn = methodExists;
				sig.parsed_dose_yn = doseExists;
				sig.parsed_route_yn = routeExists;
				sig.parsed_frequency_yn = frequencyExists;
				sig.parsed_duration_yn = durationExists;
				sig.parsed_indication_yn = indicationExists;
				
				//console.log('sig', sig);
				
				this.sigService.updateSig(sig)
					.subscribe(sigs => console.log('putSigs', sigs));
				
			})
		);

	//this.sigService.updateSigs();
  }

  ngOnInit() { } 
}