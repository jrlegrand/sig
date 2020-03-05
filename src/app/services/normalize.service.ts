import { Injectable } from '@angular/core';

@Injectable()
export class NormalizeService {

	private regexOneToTwentyfour: string = 'one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|twentyone|twenty one|twenty-one|twentytwo|twenty two|twenty-two|twentythree|twenty three|twenty-three|twentyfour|twenty four|twenty-four';
	// NOTE: keep the x-y at the beginning and x at the end so that it finds the x-y first without stopping
	private regexRange: string = '(?:(?:' + this.regexOneToTwentyfour + '|(?:(?:\\d+\\s*)*(?:\\.|/|,))?\\d+)\\s*(?:to|-|or)\\s*(?:' + this.regexOneToTwentyfour + '|(?:(?:\\d+\\s*)*(?:\\.|/|,))?\\d+)|(?:(?:\\d+\\s*)*(?:\\.|/|,))?\\d+|(?:' + this.regexOneToTwentyfour + '))';
	
	private regexDaysOfWeek: string = 'monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon\\b|tue\\b|tues\\b|wed\\b|thu\\b|thur\\b|thurs\\b|fri\\b|sat\\b|sun\\b|m\\b|tu\\b|w\\b|th\\b|t\\b|f\\b|sa\\b|su\\b|s\\b';
	
	/* https://www.hl7.org/fhir/valueset-days-of-week.html
	Code	Display	Definition
	mon	Monday	Monday
	tue	Tuesday	Tuesday
	wed	Wednesday	Wednesday
	thu	Thursday	Thursday
	fri	Friday	Friday
	sat	Saturday	Saturday
	sun	Sunday	Sunday
	*/	
	private dayOfWeek: any[] = [
		{ code: 'mon', display: 'monday', synonyms: [ 'monday', 'mon', 'mo', 'm' ] },
		{ code: 'tue', display: 'tuesday', synonyms: [ 'tuesday', 'tues', 'tue', 'tu' ] },
		{ code: 'wed', display: 'wednesday', synonyms: [ 'wednesday', 'weds', 'wed', 'wd', 'w' ] },
		{ code: 'thu', display: 'thursday', synonyms: [ 'thursday', 'thurs', 'thu', 'th' ] },
		{ code: 'fri', display: 'friday', synonyms: [ 'friday', 'fri', 'fr', 'f' ] },
		{ code: 'sat', display: 'saturday', synonyms: [ 'saturday', 'sat', 'sa' ] },
		{ code: 'sun', display: 'sunday', synonyms: [ 'sunday', 'sun', 'su' ] }
	];
	
	// TODO: make all of the ac / pc / hs / etc
	/* https://www.hl7.org/fhir/valueset-event-timing.html
	Code	System	Display	Definition
	MORN	http://hl7.org/fhir/event-timing	Morning	event occurs during the morning
	AFT	http://hl7.org/fhir/event-timing	Afternoon	event occurs during the afternoon
	EVE	http://hl7.org/fhir/event-timing	Evening	event occurs during the evening
	NIGHT	http://hl7.org/fhir/event-timing	Night	event occurs during the night
	
	PHS	http://hl7.org/fhir/event-timing	After Sleep	event occurs [offset] after subject goes to sleep
	HS	http://hl7.org/fhir/v3/TimingEvent	HS	Description: Prior to beginning a regular period of extended sleep (this would exclude naps). Note that this might occur at different times of day depending on a person's regular sleep schedule.
	WAKE	http://hl7.org/fhir/v3/TimingEvent	WAKE	Description: Upon waking up from a regular period of sleep, in order to start regular activities (this would exclude waking up from a nap or temporarily waking up during a period of sleep) Usage Notes: e.g. Take pulse rate on waking in management of thyrotoxicosis. Take BP on waking in management of hypertension Take basal body temperature on waking in establishing date of ovulation
	
	C	http://hl7.org/fhir/v3/TimingEvent	C	Description: meal (from lat. ante cibus)
	CM	http://hl7.org/fhir/v3/TimingEvent	CM	Description: breakfast (from lat. cibus matutinus)
	CD	http://hl7.org/fhir/v3/TimingEvent	CD	Description: lunch (from lat. cibus diurnus)
	CV	http://hl7.org/fhir/v3/TimingEvent	CV	Description: dinner (from lat. cibus vespertinus)
	
	AC	http://hl7.org/fhir/v3/TimingEvent	AC	before meal (from lat. ante cibus)
	ACM	http://hl7.org/fhir/v3/TimingEvent	ACM	before breakfast (from lat. ante cibus matutinus)
	ACD	http://hl7.org/fhir/v3/TimingEvent	ACD	before lunch (from lat. ante cibus diurnus)
	ACV	http://hl7.org/fhir/v3/TimingEvent	ACV	before dinner (from lat. ante cibus vespertinus)
	
	PC	http://hl7.org/fhir/v3/TimingEvent	PC	after meal (from lat. post cibus)
	PCM	http://hl7.org/fhir/v3/TimingEvent	PCM	after breakfast (from lat. post cibus matutinus)
	PCD	http://hl7.org/fhir/v3/TimingEvent	PCD	after lunch (from lat. post cibus diurnus)
	PCV	http://hl7.org/fhir/v3/TimingEvent	PCV	after dinner (from lat. post cibus vespertinus)
	*/
	// pattern: new RegExp('(with|before|after)\\s*(breakfast|lunch|dinner|meals|each meal)', 'ig'),	
	private when: any[] = [
		{ code: 'morn', display: 'morning', synonyms: [ 'morning', 'morn', 'am', 'a.m.' ] },
		{ code: 'aft', display: 'afternoon', synonyms: [ 'afternoon', 'aft', 'pm', 'p.m.' ] },
		{ code: 'eve', display: 'evening', synonyms: [ 'evening', 'eve' ] },
		{ code: 'night', display: 'night', synonyms: [ 'nightly', 'night', 'hs', 'h.s.' ] },		
		{ code: 'c', display: 'with meal', synonyms: [ 'with meal' ] },		
		{ code: 'cm', display: 'with breakfast', synonyms: [ 'withbreakfast', '\\bcm\\b', 'c\\.m\\.' ] },		
		{ code: 'cd', display: 'with lunch', synonyms: [ 'withlunch', '\\bcd\\b', 'c\\.d\\.' ] },		
		{ code: 'cv', display: 'with dinner', synonyms: [ 'withdinner', '\\bcv\\b', 'c\\.v\\.' ] },		
		{ code: 'ac', display: 'before meal', synonyms: [ 'beforemeal', '\\bac\\b', 'a\\.c\\.' ] },		
		{ code: 'acm', display: 'before breakfast', synonyms: [ 'beforebreakfast', '\\bacm\\b', 'a\\.c\\.m\\.' ] },		
		{ code: 'acd', display: 'before lunch', synonyms: [ 'beforelunch', '\\bacd\\b', 'a\\.c\\.d\\.' ] },		
		{ code: 'acv', display: 'before dinner', synonyms: [ 'beforedinner', '\\bacv\\b', 'a\\.c\\.v\\.' ] },		
		{ code: 'pc', display: 'after meal', synonyms: [ 'aftermeal', '\\bpc\\b', 'p\\.c\\.' ] },		
		{ code: 'pcm', display: 'after breakfast', synonyms: [ 'afterbreakfast', '\\bpcm\\b', 'p\\.c\\.m\\.' ] },		
		{ code: 'pcd', display: 'after lunch', synonyms: [ 'afterlunch', '\\bpcd\\b', 'p\\.c\\.d\\.' ] },		
		{ code: 'pcv', display: 'after dinner', synonyms: [ 'afterdinner', '\\bpcv\\b', 'p\\.c\\.v\\.' ] },		
	];

	// NOTE: periodUnit 'day' should include pretty much all of 'when' array
	/* https://www.hl7.org/fhir/valueset-units-of-time.html
	Code	Display	Definition
	s	second	second
	min	minute	minute
	h	hour	hour
	d	day	day
	wk	week	week
	mo	month	month
	a	year	year
	*/
	private periodUnit: any[] = [
		{ code: 'd', display: 'day', synonyms: [ 'daily', 'nightly', 'days', 'day', 'd\\b', 'morning', 'morn', 'am', 'a.m.', 'afternoon', 'aft', 'pm', 'p.m.', 'evening', 'eve', 'night', 'hs', 'h.s.' ] },
		{ code: 'wk', display: 'week', synonyms: [ 'weekly', 'weeks', 'week', 'wk', 'w\\b' ] },
		{ code: 'mo', display: 'month', synonyms: [ 'monthly', 'months', 'month', 'mon', 'mo' ] },
		{ code: 'h', display: 'hour', synonyms: [ 'hourly', 'hours', 'hour', 'hrs', 'hr', 'h\\b' ] },
		{ code: 'min', display: 'minute', synonyms: [ 'minutes', 'minute', 'mins', 'min', 'm\\b' ] },
		{ code: 's', display: 'second', synonyms: [ 'seconds', 'second', 'secs', 'sec', 's\\b' ] },
		{ code: 'a', display: 'year', synonyms: [ 'yearly', 'years', 'year', 'yrs', 'yr', 'y\\b' ] },			
	];

	// TODO: associate these common codings with each structured frequency
	/* https://www.hl7.org/fhir/valueset-timing-abbreviation.html
	Code	Display	Definition
	BID	BID	Two times a day at institution specified time
	TID	TID	Three times a day at institution specified time
	QID	QID	Four times a day at institution specified time
	AM	AM	Every morning at institution specified times
	PM	PM	Every afternoon at institution specified times
	QD	QD	Every Day at institution specified times
	QOD	QOD	Every Other Day at institution specified times
	Q4H	Q4H	Every 4 hours at institution specified times
	Q6H	Q6H	Every 6 Hours at institution specified times
	*/

	constructor() { }
	
	getRegexRange() { return this.regexRange; }
	
	getRegexDaysOfWeek() { return this.regexDaysOfWeek; }
	
	getCode(o: any[], s: string) {
		var r = o.find(i => new RegExp('(?:\\b' + i.synonyms.join('|') + '\\b)', 'ig').exec(s) ? true : false);
		return r ? r.code : r;		
	}
 
	getDisplayFromCode(o: any[], s: string) {
		var r = o.find(i => i.code == s);
		return r ? r.display : r;	
	}
 
	getWhen(s: string) {
		return this.getCode(this.when, s);
	}
	
	getWhenDisplayFromCode(s: string) {
		return this.getDisplayFromCode(this.when, s);
	}
	
	getPeriodUnit(s: string) {
		return this.getCode(this.periodUnit, s);
	}
	
	getPeriodUnitDisplayFromCode(s: string) {
		return this.getDisplayFromCode(this.periodUnit, s);
	}
	
	getDayOfWeek(s: string) {
		return this.getCode(this.dayOfWeek, s);
	}
}
