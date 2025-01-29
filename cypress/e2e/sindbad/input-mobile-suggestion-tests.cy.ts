describe('Cities search desktop tests', () => {

	beforeEach(() => {
    cy.viewport(390, 844); //Iphone 12 Pro
		cy.clearAllLocalStorage();
		cy.clearAllCookies();
    cy.visit('https://s3.t.voyager.pl/');
		cy.wait(1800);
  });

  it('should have correct starting values', () => {
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('have.value', 'Wrocław');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="inputData"]').should('have.value', 'Frankfurt');
  });

	it('should display last selected cities as suggestions in input "To"', () => {
		findThreeFromCitiesAndSelectThemForTo();
  });

	function findThreeFromCitiesAndSelectThemForTo() {
		findAndSelectCityTo("Tychy", 1);
		findAndSelectCityTo("Warszawa", 2);
		findAndSelectCityTo("Aahen", 3);
		cy.wait(500);
		cy.get('[data-cy="dataInputTo"]').click();
		cy.wait(500);
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      // Assert that all elements exist
      expect($el).to.exist;
      // Perform specific checks based on the index
      if (index === 0) expect($el.text()).to.contain('Aahen');
      if (index === 1) expect($el.text()).to.contain('Warszawa');
      if (index === 2) expect($el.text()).to.contain('Tychy');
    });
	}

	it('should display last selected cities as suggestions in input with correct order"To"', () => {
		findAndSelectCityTo("Tychy", 1);
		findAndSelectCityTo("Warszawa", 2);
		findAndSelectCityTo("Aahen", 3);
		findAndSelectCityTo("Warszawa", 4);
		findAndSelectCityTo("Tychy", 5);
		cy.wait(500);
		cy.get('[data-cy="dataInputTo"]').click();
		cy.wait(500);
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      // Assert that all elements exist
      expect($el).to.exist;
      // Perform specific checks based on the index
      if (index === 0) expect($el.text()).to.contain('Tychy');
      if (index === 1) expect($el.text()).to.contain('Warszawa');
      if (index === 2) expect($el.text()).to.contain('Aahen');
    });
  });

	it('should display last selected cities as suggestions in input "From"', () => {
		findThreeFromCitiesAndSelectThemForFrom();
  });

	function findThreeFromCitiesAndSelectThemForFrom() {
		findAndSelectCityFrom("Tychy", 1);
		findAndSelectCityFrom("Warszawa", 2);
		findAndSelectCityFrom("Aahen", 3);
		cy.wait(500);
		cy.get('[data-cy="dataInputFrom"]').click();
		cy.wait(500);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      // Assert that all elements exist
      expect($el).to.exist;
      // Perform specific checks based on the index
      if (index === 0) expect($el.text()).to.contain('Aahen');
      if (index === 1) expect($el.text()).to.contain('Warszawa');
      if (index === 2) expect($el.text()).to.contain('Tychy');
    });
	}

	it('should display last selected cities as suggestions in input with correct order"From"', () => {
		findAndSelectCityFrom("Tychy", 1);
		findAndSelectCityFrom("Warszawa", 2);
		findAndSelectCityFrom("Aahen", 3);
		findAndSelectCityFrom("Warszawa", 4);
		findAndSelectCityFrom("Tychy", 5);
		cy.wait(500);
		cy.get('[data-cy="dataInputFrom"]').click();
		cy.wait(500);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      // Assert that all elements exist
      expect($el).to.exist;
      // Perform specific checks based on the index
      if (index === 0) expect($el.text()).to.contain('Tychy');
      if (index === 1) expect($el.text()).to.contain('Warszawa');
      if (index === 2) expect($el.text()).to.contain('Aahen');
    });
  });

	it('should remove suggestion "From"', () => {
		findThreeFromCitiesAndSelectThemForFrom();
		cy.wait(100);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      expect($el).to.exist;
      if (index === 1) {
				expect($el.text()).to.contain('Warszawa');
				$el.find('[data-cy="removeCitySuggestion"]').click();
			}
    });
		cy.wait(500);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      // Assert that all elements exist
      expect($el).to.exist;
      // Perform specific checks based on the index
      if (index === 0) expect($el.text()).to.contain('Aahen');
      if (index === 1) expect($el.text()).to.contain('Tychy');
    });
  });

	it('should remove suggestion "To"', () => {
		findThreeFromCitiesAndSelectThemForTo();
		cy.wait(100);
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      expect($el).to.exist;
      if (index === 1) {
				expect($el.text()).to.contain('Warszawa');
				$el.find('[data-cy="removeCitySuggestion"]').click();
			}
    });
		cy.wait(500);
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      // Assert that all elements exist
      expect($el).to.exist;
      // Perform specific checks based on the index
      if (index === 0) expect($el.text()).to.contain('Aahen');
      if (index === 1) expect($el.text()).to.contain('Tychy');
    });
  });

	function findAndSelectCityTo(cityName: string, cityCode: number){
		cy.get('[data-cy="dataInputTo"]').click();
		cy.intercept('GET', 'https://citiessubstitute.t.voyager.pl/CitiesSearch/GetCities?query=' + cityName + '&lang=PL', {
			statusCode: 200,
			body: [{
				"cityNumber": cityCode,
        "cityName": cityName,
        "country": "PL",
        "region": "województwo śląskie",
        "language": "PL",
        "citySearchQuery": ""
			}],
		}).as('getCity');

		cy.get('[data-cy="dataInputTo"]').find('[data-cy="cityOptionMobile"]').type(cityName);
		cy.wait('@getCity').its('response.statusCode').should('eq', 200);
		cy.wait(200);
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      if (index === 0) {
				expect($el.text()).to.contain(cityName);
				cy.wrap($el).click();
			} 
    });
		cy.wait(500);
		cy.get('[data-cy="singleParentBoxCalendar"]').find('[data-cy="mobileCalendarViewBackButton"]').should('be.visible');
		cy.get('[data-cy="singleParentBoxCalendar"]').find('[data-cy="mobileCalendarViewBackButton"]').click();
	}

	function findAndSelectCityFrom(cityName: string, cityCode: number){
		cy.get('[data-cy="dataInputFrom"]').click();
		cy.intercept('GET', 'https://citiessubstitute.t.voyager.pl/CitiesSearch/GetCities?query=' + cityName + '&lang=PL', {
			statusCode: 200,
			body: [{
				"cityNumber": cityCode,
        "cityName": cityName,
        "country": "PL",
        "region": "województwo śląskie",
        "language": "PL",
        "citySearchQuery": ""
			}],
		}).as('getCity');

		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="cityOptionMobile"]').type(cityName);
		cy.wait('@getCity').its('response.statusCode').should('eq', 200);
		cy.wait(200);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      if (index === 0) {
				expect($el.text()).to.contain(cityName);
				cy.wrap($el).click();
			} 
    });
		cy.wait(500);
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesViewCloseButton"]').should('be.visible');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesViewCloseButton"]').click();
	}
})