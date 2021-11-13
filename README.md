# My Store

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.14.

## Description of the Project
MyStore is the the final project for the third course of the Udacity Full Stack Javascript Nanodegree.
An Angular application has been build to demonstate the functionality of a simple shopping cart.The application lets the
user view list of available products to purchase, add them to a shopping cart, and ultimately complete the checkout process. There are 5 views in total.

- \product list path. User can see a list of all products. User can add products to cart in this view. When user click on the image, it will take user to the product detail page.
- \product/:productName product item detail page. User can see the detail of a product and add the quantity to cart.
- \cart cart page. On this page an empty list or a list of products is displayed which the user would like to order. Each orderline displays the name ,price and total price. 
On each orderline there are buttons which can be used to increase or decrease the quantity or remove the a product from the cart. The user can click on the 'Empty Cart' 
button to remove all items from the shopping cart or on the 'Checkout' button to start the checkout process. 
- \checkout. On this page the user can supply a name, delivery address, billing andress and payment method. The 'Checkout' button can be used to complete the order.
- \confirmation confirmation page. After a user successfully submitted their payment information, the user will see this page cantaining the details entered on the checkout page and 
total cost of all products ordered.

## Installation
Run `npm install` in a terminal window

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running lint, static code analysis

Run `ng lint` to execute static code analysis.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
