describe('Cities search mobile tests', () => {

	beforeEach(() => {
    cy.viewport(390, 844); //Iphone 12 Pro
		cy.clearAllLocalStorage();
		cy.clearAllCookies();
    cy.visit(Cypress.env('website_adress'));
		let delay: number = +Cypress.env('default_delay');
		cy.wait(delay);
  });

	it('should have correct starting values', () => {
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('have.value', 'Wrocław');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="inputData"]').should('have.value', 'Frankfurt');
  });

	it('should display options from dropdown menu from "From" cities', () => {
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="mobileCitiesView"]').should('not.be.visible');
		cy.get('[data-cy="dataInputFrom"]').click();
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="mobileCitiesView"]').should('be.visible');
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
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="cityOptionMobile"]').should('be.focused');
  });

	it('should display options from dropdown menu from "To" cities', () => {
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesView"]').should('not.be.visible');
		cy.get('[data-cy="dataInputTo"]').click();
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesView"]').should('be.visible');
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
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="cityOptionMobile"]').should('be.focused');
  });

	it('"From" should return to default view when back button "<" is pressed', () => {
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="mobileCitiesView"]').should('not.be.visible');
		cy.get('[data-cy="dataInputFrom"]').click();
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="mobileCitiesView"]').should('be.visible');
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="mobileCitiesViewBackButton"]').should('be.visible');
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="mobileCitiesViewBackButton"]').click();
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="mobileCitiesView"]').should('not.be.visible');
  });

	it('"To" should return to default view when back button "<" is pressed', () => {
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesView"]').should('not.be.visible');
		cy.get('[data-cy="dataInputTo"]').click();
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesView"]').should('be.visible');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesViewBackButton"]').should('be.visible');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesViewBackButton"]').click();
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesView"]').should('not.be.visible');
  });

	it('"From" should return to default view when close button "X" is pressed', () => {
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="mobileCitiesView"]').should('not.be.visible');
		cy.get('[data-cy="dataInputFrom"]').click();
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="mobileCitiesView"]').should('be.visible');
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="mobileCitiesViewCloseButton"]').should('be.visible');
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="mobileCitiesViewCloseButton"]').click();
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="mobileCitiesView"]').should('not.be.visible');
  });

	it('"To" should return to default view when close button "X" is pressed', () => {
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesView"]').should('not.be.visible');
		cy.get('[data-cy="dataInputTo"]').click();
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesView"]').should('be.visible');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesViewCloseButton"]').should('be.visible');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesViewCloseButton"]').click();
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesView"]').should('not.be.visible');
  });

	it('should focus on "Calendar" input after selecting "To" option', () => {
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesView"]').should('not.be.visible');
		cy.get('[data-cy="dataInputTo"]').click();
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesView"]').should('be.visible');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      expect($el).to.exist;
      if (index === 0) {
				expect($el.text()).to.contain('Frankfurt');
				$el.click();
			} 
    });
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="inputData"]').should('have.value', 'Frankfurt');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesView"]').should('not.be.visible');
		cy.get('[data-cy="dataInputCallendar"]').should('be.visible');
  });

	it('pressing switch button switches cities', () => {
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('have.value', 'Wrocław');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="inputData"]').should('have.value', 'Frankfurt');
		cy.get('[data-cy="switchInput"]').click();
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('have.value', 'Frankfurt');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="inputData"]').should('have.value', 'Wrocław');
  });

	it('selecting city in option "From" is saved', () => {
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="mobileCitiesView"]').should('not.be.visible');
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('have.value', 'Wrocław');
		cy.get('[data-cy="dataInputFrom"]').click();
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="mobileCitiesView"]').should('be.visible');
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      expect($el).to.exist;
      if (index === 3) {
				expect($el.text()).to.contain('Łódź');
				$el.click();
			} 
    });
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('have.value', 'Łódź');
		cy.reload();
		cy.wait(500);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('have.value', 'Łódź');
  });

	it('selecting city in option "To" is saved', () => {
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesView"]').should('not.be.visible');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="inputData"]').should('have.value', 'Frankfurt');
		cy.get('[data-cy="dataInputTo"]').click();
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesView"]').should('be.visible');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      expect($el).to.exist;
      if (index === 3) {
				expect($el.text()).to.contain('Mannheim');
				$el.click();
			} 
    });
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="inputData"]').should('have.value', 'Mannheim');
		cy.reload();
		cy.wait(500);
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="inputData"]').should('have.value', 'Mannheim');
  });

	it('swaping cities are saved', () => {
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('have.value', 'Wrocław');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="inputData"]').should('have.value', 'Frankfurt');

		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      expect($el).to.exist;
      if (index === 3) {
				expect($el.text()).to.contain('Łódź');
				$el.click();
			} 
    });
		cy.wait(200);
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      expect($el).to.exist;
      if (index === 3) {
				expect($el.text()).to.contain('Mannheim');
				$el.click();
			} 
    });
		cy.wait(1000);
		cy.get('[data-cy="singleParentBoxCalendar"]').find('[data-cy="mobileCalendarViewCloseButton"]').should('be.visible');
		cy.get('[data-cy="singleParentBoxCalendar"]').find('[data-cy="mobileCalendarViewCloseButton"]').click({force: true});
		cy.wait(500);

		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesView"]').should('not.be.visible');

		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('have.value', 'Łódź');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="inputData"]').should('have.value', 'Mannheim');

		cy.get('[data-cy="switchInput"]').click();

		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('have.value', 'Mannheim');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="inputData"]').should('have.value', 'Łódź');

		cy.reload();
		cy.wait(500);

		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('have.value', 'Mannheim');
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="inputData"]').should('have.value', 'Łódź');
  });

	it('should search for cities for typed name in "From"', () => {
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="mobileCitiesView"]').should('not.be.visible');
		cy.get('[data-cy="dataInputFrom"]').click();
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="mobileCitiesView"]').should('be.visible');
		let searchQuery = 'ahen';
		cy.intercept('GET', 'https://citiessubstitute.t.voyager.pl/CitiesSearch/GetCities?query=' + searchQuery + '&lang=PL', {
			statusCode: 200,
			body: [{
				"cityNumber": 577,
        "cityName": "Aachen",
        "country": "DE",
        "region": "Nadrenia Północna-Westfalia",
        "language": "PL",
        "citySearchQuery": ""
			}],
		}).as('getCity');

		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="cityOptionMobile"]').type(searchQuery);
		cy.wait('@getCity').its('response.statusCode').should('eq', 200);
		cy.wait(200);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      if (index === 0) {
				expect($el.text()).to.contain('Aachen');
				$el.click();
			} 
    });
		cy.wait(500);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('have.value', 'Aachen');
		cy.reload();
		cy.wait(500);
		cy.get('[data-cy="dataInputFrom"]').find('[data-cy="inputData"]').should('have.value', 'Aachen');
  });

	it('should search for cities for typed name in "To"', () => {
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesView"]').should('not.be.visible');
		cy.get('[data-cy="dataInputTo"]').click();
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="mobileCitiesView"]').should('be.visible');
		let searchQuery = 'tych';
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
		
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="cityOptionMobile"]').type(searchQuery);
		cy.wait('@getCity').its('response.statusCode').should('eq', 200);
		cy.wait(200);
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="dropDownCitiesOptions"]').find('[data-cy="cityOptionDesktop"]').each(($el, index) => {
      if (index === 0) {
				expect($el.text()).to.contain('Tychy');
				$el.click();
			} 
    });
		cy.wait(500);
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="inputData"]').should('have.value', 'Tychy');
		cy.reload();
		cy.wait(500);
		cy.get('[data-cy="dataInputTo"]').find('[data-cy="inputData"]').should('have.value', 'Tychy');
  });
})