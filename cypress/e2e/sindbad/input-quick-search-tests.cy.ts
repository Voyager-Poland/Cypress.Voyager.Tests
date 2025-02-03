describe('Cities search ', () => {

	beforeEach(() => {
    cy.viewport(1920, 1080);
		cy.clearAllLocalStorage();
		cy.clearAllCookies();
    cy.visit(Cypress.env('website_adress'));
		let delay: number = +Cypress.env('default_delay');
		cy.wait(delay);
  });

	it('should find cities when typed quickly', () => {
		cy.get('[data-cy="dataInputFrom"]').click();
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').type('akwizgran');
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').type('{enter}');
		cy.wait(500);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('have.value', 'Aachen');
  });

	it('should not suggest any cities when could not find any', () => {
		cy.get('[data-cy="dataInputFrom"]').click();
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').type('awnadnsagasgasd');
		cy.wait(500);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').should('exist');
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').should('not.exist');
  });

	it('should be able to select the same city in the same input', () => {
		cy.get('[data-cy="dataInputFrom"]').click();
		let searchQuery = 'tychy';
		cy.intercept('GET', 'https://citiessubstitute.t.voyager.pl/CitiesSearch/GetCities?query=' + searchQuery + '&lang=PL', {
			statusCode: 200,
			body: [{
				"cityNumber": 541,
        "cityName": "Tychy",
        "country": "PL",
        "region": "województwo śląskie",
        "language": "PL",
        "citySearchQuery": ""
			}],
		}).as('getCity');

		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').type(searchQuery);
		cy.wait('@getCity').its('response.statusCode').should('eq', 200);
		cy.wait(200);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      if (index === 0) {
				expect($el.text()).to.contain('Tychy');
				$el.click();
			} 
    });

		cy.wait(500);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('have.value', 'Tychy');

		cy.get('[data-cy="dataInputFrom"]').click();
		cy.intercept('GET', 'https://citiessubstitute.t.voyager.pl/CitiesSearch/GetCities?query=' + searchQuery + '&lang=PL', {
			statusCode: 200,
			body: [{
				"cityNumber": 541,
        "cityName": "Tychy",
        "country": "PL",
        "region": "województwo śląskie",
        "language": "PL",
        "citySearchQuery": ""
			}],
		}).as('getCityAgain');

		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').type(searchQuery);
		cy.wait('@getCityAgain').its('response.statusCode').should('eq', 200);
		cy.wait(200);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      if (index === 0) {
				expect($el.text()).to.contain('Tychy');
				$el.click();
			} 
    });

		cy.wait(500);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('have.value', 'Tychy');
  });
})