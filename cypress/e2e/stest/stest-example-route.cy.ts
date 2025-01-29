import 'cypress-plugin-tab'

describe('Cities search desktop tests', () => {
	beforeEach(() => {
		cy.viewport(1920, 1080);
		cy.clearAllLocalStorage();
		cy.clearAllCookies();
		cy.visit('https://stest.voyager.pl/pl/home');
		cy.wait(300);
	});

	it('should have correct starting values', () => {
		let redirectUrl = '';
		cy.get('#cityFrom').click();
		cy.get('#cityFrom').type('OPOLE');
	 	cy.get('#cityFrom').tab();
		cy.get('.MiastoD > .input-group > .ngui-auto-complete-wrapper > .form-control').click();
		cy.get('.MiastoD > .input-group > .ngui-auto-complete-wrapper > .form-control').type('AACHEN');
	 	cy.get('.MiastoD > .input-group > .ngui-auto-complete-wrapper > .form-control').tab();
		cy.get('#SzukajPolaczen > .ng-fa-icon > .svg-inline--fa').click();
		cy.get('.btn > :nth-child(5)').click();
		cy.get('#affixCart > app-cart > #basketBox > .cart-order > .buyButton-box > .btn').click();
		cy.get('.Blokowane > .form-control').type('JAN');
		cy.get('.col-md-5 > .form-control').clear();
		cy.get('.col-md-5 > .form-control').type('KOWALSKI');
		cy.get('.pt-20 > :nth-child(1) > .form-control').type('12afab2b2aba2b@voyager.pl');
		cy.get('.intl-tel-input > #phone').type('111 111 111');
		cy.get('#ZapiszPasazerow > .d-block').click();
		cy.get('.py-1 > span').click();
		
		cy.intercept('POST', '/api/Sale/Reservation').as('postRequest');

		cy.get('.col-8 > .btn > span').click();

		cy.wait('@postRequest').then((interception) => {
		cy.log("interception: ", interception);
			if (interception.response){
				redirectUrl = interception.response.body.orderData.paymentUrl;
				cy.visit(redirectUrl);
			}
		});

		cy.origin('https://epaytest.voyager.pl', () => {
			cy.get('input[value="« powrót"]').click();
		})

		cy.contains('button', 'zrezygnować z płatności').click();
	});
})