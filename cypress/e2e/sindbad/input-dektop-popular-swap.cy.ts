describe('Cities search desktop tests', () => {

	beforeEach(() => {
    cy.viewport(1920, 1080);
		cy.clearAllLocalStorage();
		cy.clearAllCookies();
    cy.visit('https://s3.t.voyager.pl/');
		cy.wait(1800);
  });

  it('should have correct starting values', () => {
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('have.value', 'Wrocław');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="inputData"]').should('have.value', 'Frankfurt');
  });

	it('should suggest popular starting cities for PL lang', () => {
		cy.get('[data-cy="dataInputFrom"]').click();
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      // Assert that all elements exist
      expect($el).to.exist;
      // Perform specific checks based on the index
      if (index === 0) expect($el.text()).to.contain('Wrocław');
      if (index === 1) expect($el.text()).to.contain('Warszawa');
      if (index === 2) expect($el.text()).to.contain('Poznań');
      if (index === 3) expect($el.text()).to.contain('Łódź');
      if (index === 4) expect($el.text()).to.contain('Kraków');
    });
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('be.focused');
  });

	it('should suggest popular destination cities for PL lang', () => {
		cy.get('[data-cy="dataInputTo"]').click();
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      // Assert that all elements exist
      expect($el).to.exist;
      // Perform specific checks based on the index
      if (index === 0) expect($el.text()).to.contain('Frankfurt');
      if (index === 1) expect($el.text()).to.contain('Hamburg');
      if (index === 2) expect($el.text()).to.contain('Monachium');
      if (index === 3) expect($el.text()).to.contain('Mannheim');
      if (index === 4) expect($el.text()).to.contain('Paryż');
    });
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="inputData"]').should('be.focused');
  });

	it('should show popular forein starting countries when cities swap', () => {
		cy.get('[data-cy="switchInput"]').click();
		cy.wait(100);
		cy.get('[data-cy="dataInputTo"]').click();
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      // Assert that all elements exist
      expect($el).to.exist;
      // Perform specific checks based on the index
      if (index === 0) expect($el.text()).to.contain('Wrocław');
      if (index === 1) expect($el.text()).to.contain('Warszawa');
      if (index === 2) expect($el.text()).to.contain('Poznań');
      if (index === 3) expect($el.text()).to.contain('Łódź');
      if (index === 4) expect($el.text()).to.contain('Kraków');
    });
		cy.get('[data-cy="dataInputFrom"]').click();
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      // Assert that all elements exist
      expect($el).to.exist;
      // Perform specific checks based on the index
      if (index === 0) expect($el.text()).to.contain('Frankfurt');
      if (index === 1) expect($el.text()).to.contain('Hamburg');
      if (index === 2) expect($el.text()).to.contain('Monachium');
      if (index === 3) expect($el.text()).to.contain('Mannheim');
      if (index === 4) expect($el.text()).to.contain('Paryż');
    });
  });

	it('should show popular forein starting countries when a forein country is picked in starting input and after selecting a city from local country should again display same cities', () => {
		cy.get('[data-cy="dataInputFrom"]').click();
		let cityName = 'Monachium';
		cy.intercept('GET', 'https://citiessubstitute.t.voyager.pl/CitiesSearch/GetCities?query=' + cityName + '&lang=PL', {
			statusCode: 200,
			body: [{
				"cityNumber": '662',
        "cityName": cityName,
        "country": "DE",
        "region": "Bawaria",
        "language": "PL",
        "citySearchQuery": ""
			}],
		}).as('getCity');

		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').type(cityName);
		cy.wait('@getCity').its('response.statusCode').should('eq', 200);
		cy.wait(200);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      if (index === 0) {
				expect($el.text()).to.contain(cityName);
				cy.wrap($el).click();
			} 
    });
		cy.wait(200);
		cy.get('[data-cy="dataInputFrom"]').click();
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      // Assert that all elements exist
      expect($el).to.exist;
      // Perform specific checks based on the index
      if (index === 0) expect($el.text()).to.contain('Hamburg');
      if (index === 1) expect($el.text()).to.contain('Monachium');
      if (index === 2) expect($el.text()).to.contain('Mannheim');
      if (index === 3) expect($el.text()).to.contain('Paryż');
    });
		cy.wait(100);
		cy.get('[data-cy="dataInputTo"]').click();
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      // Assert that all elements exist
      expect($el).to.exist;
      // Perform specific checks based on the index
      if (index === 0) expect($el.text()).to.contain('Wrocław');
      if (index === 1) expect($el.text()).to.contain('Warszawa');
      if (index === 2) expect($el.text()).to.contain('Poznań');
      if (index === 3) expect($el.text()).to.contain('Łódź');
      if (index === 4) expect($el.text()).to.contain('Kraków');
    });
  });

	it('should show popular forein starting countries when a forein country is picked in starting input', () => {
		cy.get('[data-cy="dataInputFrom"]').click();
		let cityName = 'Monachium';
		cy.intercept('GET', 'https://citiessubstitute.t.voyager.pl/CitiesSearch/GetCities?query=' + cityName + '&lang=PL', {
			statusCode: 200,
			body: [{
				"cityNumber": '662',
        "cityName": cityName,
        "country": "DE",
        "region": "Bawaria",
        "language": "PL",
        "citySearchQuery": ""
			}],
		}).as('getCity');

		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').type(cityName);
		cy.wait('@getCity').its('response.statusCode').should('eq', 200);
		cy.wait(200);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      if (index === 0) {
				expect($el.text()).to.contain(cityName);
				cy.wrap($el).click();
			} 
    });
		cy.wait(200);
		cy.get('[data-cy="dataInputFrom"]').click();
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      // Assert that all elements exist
      expect($el).to.exist;
      // Perform specific checks based on the index
      if (index === 0) expect($el.text()).to.contain('Hamburg');
      if (index === 1) expect($el.text()).to.contain('Monachium');
      if (index === 2) expect($el.text()).to.contain('Mannheim');
      if (index === 3) expect($el.text()).to.contain('Paryż');
    });
		cy.wait(100);
		cy.get('[data-cy="dataInputTo"]').click();
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      // Assert that all elements exist
      expect($el).to.exist;
      // Perform specific checks based on the index
      if (index === 0) expect($el.text()).to.contain('Wrocław');
      if (index === 1) expect($el.text()).to.contain('Warszawa');
      if (index === 2) expect($el.text()).to.contain('Poznań');
      if (index === 3) expect($el.text()).to.contain('Łódź');
      if (index === 4) expect($el.text()).to.contain('Kraków');
    });

		cy.get('[data-cy="dataInputFrom"]').click();
		let newCityName = 'Katowice';
		cy.intercept('GET', 'https://citiessubstitute.t.voyager.pl/CitiesSearch/GetCities?query=' + newCityName + '&lang=PL', {
			statusCode: 200,
			body: [{
				"cityNumber": '391',
        "cityName": newCityName,
        "country": "PL",
        "region": "województwo śląskie",
        "language": "PL",
        "citySearchQuery": ""
			}],
		}).as('getCity');
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').clear();
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').type(newCityName);
		cy.wait('@getCity').its('response.statusCode').should('eq', 200);
		cy.wait(200);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      if (index === 0) {
				expect($el.text()).to.contain(newCityName);
				cy.wrap($el).click();
			} 
    });
		cy.wait(100);
		cy.get('[data-cy="dataInputFrom"]').click();
		cy.wait(100);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      expect($el).to.exist;
      if (index === 1) {
				expect($el.text()).to.contain(cityName);
				$el.find('[data-cy="removeCitySuggestion"]').click();
			}
    });
		cy.wait(100);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      // Assert that all elements exist
      expect($el).to.exist;
      // Perform specific checks based on the index
      if (index === 0) expect($el.text()).to.contain('Wrocław');
      if (index === 1) expect($el.text()).to.contain('Warszawa');
      if (index === 2) expect($el.text()).to.contain('Poznań');
      if (index === 3) expect($el.text()).to.contain('Łódź');
      if (index === 4) expect($el.text()).to.contain('Kraków');
    });
  });
})