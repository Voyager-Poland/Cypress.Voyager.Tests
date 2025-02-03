# README

## Wymagania wstępne

Aby pracować ze środowiskiem testowym, należy mieć zainstalowaną wersję **Node.js (LTS)**: [Node.js Download](https://nodejs.org/en/download/)

Do pracy z Git wymagane jest posiadanie jednej z poniższych wersji:

- [Git SCM](https://git-scm.com/downloads)
- [GitHub Desktop](https://github.com/apps/desktop)

## Pobranie źródeł

Aby pobrać repozytorium, w terminalu wykonaj komendę:

```sh
 git clone https://github.com/Voyager-Poland/Voyager.Cypress.S3.git
```

## Konfiguracja Visual Studio Code

Visual Studio Code jest zalecanym edytorem do pracy z tym projektem. Jeśli nie masz go jeszcze zainstalowanego, pobierz go tutaj: [Visual Studio Code](https://code.visualstudio.com/).

Po instalacji otwórz program i wykonaj następujące kroki:

1. Otwórz folder projektu w **Visual Studio Code** poprzez **File → Open Folder** i wybierz pobrany katalog repozytorium.
2. Otwórz wbudowany terminal za pomocą skrótu klawiaturowego:
   ```sh
   Ctrl + Shift + `
   ```
3. Upewnij się, że masz zainstalowane rozszerzenia wspierające pracę z **JavaScript/TypeScript** i **Cypress**, np.:
   - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   - [Cypress Snippets](https://marketplace.visualstudio.com/items?itemName=andrew-codes.cypress-snippets)
   - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Instalacja zależności

W katalogu projektu uruchom:

```sh
npm install
```

## Włączenie uprawnień do uruchamiania skryptów w PowerShell

Jeśli podczas uruchamiania skryptów w PowerShell występują problemy z uprawnieniami, wykonaj następujące kroki:

1. Otwórz **PowerShell jako administrator** (kliknij **Start**, wpisz `PowerShell`, kliknij prawym przyciskiem i wybierz **Uruchom jako administrator**).
2. Wykonaj następującą komendę, aby zezwolić na uruchamianie skryptów bez podpisu:
   ```sh
   Set-ExecutionPolicy Unrestricted -Scope CurrentUser
   ```
3. Potwierdź zmianę, wpisując `Y` i naciskając **Enter**.

Aby przywrócić domyślną politykę bezpieczeństwa później, możesz użyć:

```sh
Set-ExecutionPolicy Restricted -Scope CurrentUser
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

Jeśli chcesz nauczyć się więcej o automatyzacji testów z Cypress, polecam kurs **Cypress Automation Testing Framework - Zero To Hero** dostępny na platformie [O’Reilly](https://www.oreilly.com/).

### Autorzy

**Kamil Śledziona**, **Andrzej Świstowski**


