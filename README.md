# Shopping Assistant App

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
   1. [Prerequisites](#prerequisites)
   2. [Installation](#installation)
5. [File Structure](#file-structure)
6. [Usage](#usage)
   1. [App.js](#appjs)
   2. [apiService.js](#apiservicejs)
   3. [SpeechSynthesizer.js](#speechsynthesizerjs)
   4. [SpeechRecognizer.js](#speechrecognizerjs)
   5. [PurchaseConfirmation](#purchaseconfirmation)
   6. [ProductList](#productlist)
   7. [ProductCard](#productcard)
   8. [ChatDisplay](#chatdisplay)
   9. [Cart](#cart)
   10. [ChatSubtitle](#chatsubtitle)
   11. [Title](#title)
   12. [ToggleContrast](#togglecontrast)

## Introduction

This is a shopping assistant application that utilizes voice recognition and voice synthesis to make your shopping experience easier.

## Features

- Voice recognition for taking user queries
- Voice synthesis to read out product information
- Search products from various stores
- Add products to cart and make a purchase

## Tech Stack

- React.js
- Axios
- Microsoft Cognitive Services (Speech SDK)

## Getting Started

### Prerequisites

- Node.js
- npm
- Microsoft Cognitive Services API key

### Installation

1. Clone the repo: `git clone https://github.com/your-username/your-project-name.git`
2. Navigate to the project directory: `cd your-project-name`
3. Install dependencies: `npm install`
4. Set up your environment variables for Microsoft Cognitive Services API key in `.env`

## File Structure

- `App.js`: Main application file, responsible for orchestrating the other components and maintaining state.
- `apiService.js`: Contains logic for API calls.
- `SpeechSynthesizer.js`: Handles the voice synthesis part of the app, using Microsoft Cognitive Services.
- `SpeechRecognizer.js`: Manages the voice recognition feature, also powered by Microsoft Cognitive Services.
- `PurchaseConfirmation.js`: Provides a UI for confirming a successful purchase and restarting the shopping process.
- `ProductList.js`: Displays the list of available products, leverages the `ProductCard` component for each product.
- `ProductCard.js`: Provides a detailed view of a single product, including its properties and an "Add to Cart" button.
- `ChatDisplay.js`: Manages the display of chat messages and products, with the ability to add products to the cart directly from the chat interface.
- `Cart`: lorem ipsum
- `ChatSubtitle.js`: Gives voice-assistant instructions and tips to users on how to interact with the shopping assistant.
- `Title`: lorem ipsum
- `ToggleContrast`: lorem ipsum

## Usage

### App.js

The main application file. It imports and uses other custom React components, and handles application state.

### apiService.js

Responsible for making API calls to the backend service and transforming the response.

### SpeechSynthesizer.js

Handles the voice synthesis functionality, capable of converting text information to speech using Microsoft Cognitive Services.

### SpeechRecognizer.js

The `SpeechRecognizer.js` file manages the voice recognition feature. It uses Microsoft Cognitive Services' Speech SDK to perform voice recognition in Portuguese (`pt-BR`). The component utilizes React's `useState`, `useEffect`, and `useRef` hooks for state management and side effects.

### PurchaseConfirmation

The `PurchaseConfirmation.js` file provides a UI for confirming a successful purchase and restarting the shopping process. It uses React's `useEffect` and `useRef` hooks to automatically focus on the button for restarting the shopping process.

### ProductList

The `ProductList.js` file displays a list of available products using the `ProductCard` component. It checks if the `products` array is empty and displays a message if no products are available. The `ProductList` component uses PropTypes for type-checking and expects an array of products and a function `onAddToCart` as props.

### ProductCard

The `ProductCard.js` component provides a detailed view of a single product, including its properties and an "Add to Cart" button. It is responsible for displaying the product name, description, store, price, distance, and a link to view the product. The component uses PropTypes for type-checking and requires a product object and a function `onAddToCart` as props.

### ChatDisplay

The `ChatDisplay.js` component manages the display of chat messages and products. It uses React's `useEffect` and `useRef` hooks for state management and side effects like scrolling. Messages can be of two types: text and product. For each message, it either renders it as text or as a product card, based on its type. The `ProductCard` component is leveraged to display products and offers the option to add them to the cart directly.

### Cart

The 'Cart.js' component serves as the management layer for the shopping cart within the application. Utilizing React's functional component model, it tracks the products added to the cart, counts items, displays the last item added, and calculates the total cart value.

### ChatSubtitle

The `ChatSubtitle.js` component provides guidelines and instructions to the user for interacting with the voice assistant. It lays out step-by-step tips on how to activate the voice assistant and how to formulate voice queries for shopping.

### Title

The Title.js component acts as the branding element in the application, presenting the logo as part of the user interface. It makes use of a CSS class to style the container and the logo itself. This component doesn't rely on any internal state or props, making it a straightforward static component.

### ToggleContrast

The ToggleContrast.js component introduces accessibility features to the application by allowing users to switch to a high-contrast theme. It is built using React functional components and leverages the useState and useEffect hooks to manage state and side-effects, respectively.
