# README

## Wymagania wstępne

Aby pracować ze środowiskiem testowym, należy mieć zainstalowaną wersję **Node.js (LTS)**: [Node.js Download](https://nodejs.org/en/download/)

Do pracy z Git wymagane jest posiadanie jednej z poniższych wersji:

- [Git SCM](https://git-scm.com/downloads)
- [GitHub Desktop](https://github.com/apps/desktop)

## Pobranie źródeł

Aby pobrać repozytorium, w terminalu wykonaj komendę:

```sh
 git clone https://github.com/Voyager-Poland/Cypress.Voyager.Tests.git
```

Następnie otwórz **Visual Studio Code**, a następnie terminal skrótem:

```sh
Ctrl + Shift + `
```

## Instalacja zależności

W katalogu projektu uruchom:

```sh
npm install
```

## Uruchomienie programu okienkowego Cypress

Aby uruchomić Cypress w trybie okienkowym, użyj jednej z poniższych komend:

```sh
npx cypress open
```

LUB

```sh
npm run cy:open
```

W oknie aplikacji wybierz odpowiednie testy do uruchomienia.

Aby zakończyć działanie programu, naciśnij **Ctrl + C**.

## Uruchomienie testów

### Uruchomienie wszystkich testów

```sh
npx cypress run
```

### Uruchomienie pojedynczego testu

Aby uruchomić konkretny test, wykonaj komendę:

```sh
npx cypress run --spec "./cypress/e2e/sindbad/input-dektop-popular-swap.cy.ts"
```

## Dodatkowe informacje

Więcej informacji na temat Cypress znajdziesz na stronie: [Cypress.io](https://www.cypress.io/)

### Autor

**Kamil Śledziona**

