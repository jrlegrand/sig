# Sig

**Website:** [https://parserx.io](https://parserx.io)

**Live demo:** [https://legrand.io/sig](https://legrand.io/sig)

This medication sig parser takes free text sigs (medication instructions) and parses out the following elements:
* Method (take)
* Dose (1 tablet)
* Route (by mouth)
* Frequency (every 12 hours)
* Duration (for 10 days)
* Indication (as needed for pain)

After parsing out these elements, and taking into consideration caveats specific to medication sigs (e.g. if NTE 5 tablets per day exists in the sig, it doesn't parse 5 tablets per day as the dose / frequency -- it parses it as the max dose per day), it re-combines and normalizes the sig into a format that a computer can understand.  It goes even further by converting that normalized, structured sig into the [FHIR Dosage](https://www.hl7.org/fhir/dosage.html) standard resource which can be used to transmit the sig between electronic health records.

NOTE: The parser code has been removed from this repository.  If you would like more information, including licensing information, please contact [hello@parserx.io](mailto:hello@parserx.io).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
