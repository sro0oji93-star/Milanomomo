const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// In-memory orders storage (or use file-based storage)
let orders = [];
let orderCounter = 1;

// Available toppings/ingredients for pizza customization
const availableToppings = [
  { id: 1, name: "Mozzarella", price: 1.50 },
  { id: 4, name: "Feta", price: 1.50 },
  { id: 7, name: "Oregano", price: 0.50 },
  { id: 8, name: "Zwiebeln", price: 0.80 },
  { id: 10, name: "Paprika", price: 0.80 },
  { id: 11, name: "Champignons", price: 1.20 },
  { id: 12, name: "Oliven", price: 1.00 },
  { id: 20, name: "Mais", price: 0.80 },
  { id: 25, name: "Käse Ring", price: 0.00 },
  { id: 26, name: "Jalapenos", price: 0.80 },
  { id: 27, name: "Kania Ketchup", price: 0.80 },
  { id: 28, name: "Mayonnaise", price: 0.80 },
  { id: 29, name: "American Sauce", price: 1.50 },
  { id: 30, name: "Knoblauch Sauce", price: 1.50 },
  { id: 31, name: "Chili Sauce", price: 1.50 }
];

// Load products from JSON
let products = [
  // Pizza Section
  {
    id: 1,
    name: "Margherita",
    ingredients: "Pizza mit Tomaten, Mozzarella und frischem Basilikum",
    sizes: [
      { label: "26cm", price: 8.00 },
      { label: "30cm", price: 11.00 },
      { label: "32cm", price: 17.00 },
      { label: "60cm", price: 24.50 }
    ],
    category: "pizza",
    image: "margherita.jpg",
    available: true
  },
  {
    id: 2,
    name: "Mozzarella",
    ingredients: "Pizza mit reichlich Mozzarella und Tomaten",
    sizes: [
      { label: "26cm", price: 8.50 },
      { label: "30cm", price: 11.50 },
      { label: "32cm", price: 18.50 },
      { label: "60cm", price: 28.50 }
    ],
    category: "pizza",
    image: "mozzarella.jpg",
    available: true
  },
  {
    id: 3,
    name: "Formaggi",
    ingredients: "Pizza mit vier verschiedenen Käsesorten",
    sizes: [
      { label: "26cm", price: 8.50 },
      { label: "30cm", price: 11.50 },
      { label: "32cm", price: 18.50 },
      { label: "60cm", price: 28.50 }
    ],
    category: "pizza",
    image: "formaggi.jpg",
    available: true
  },
  {
    id: 4,
    name: "Fungi",
    ingredients: "Pizza mit frischen Champignons",
    sizes: [
      { label: "26cm", price: 8.20 },
      { label: "30cm", price: 10.50 },
      { label: "32cm", price: 19.00 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "fungi.jpg",
    available: true
  },
  {
    id: 5,
    name: "Salami",
    ingredients: "Pizza mit italienischem Salami",
    sizes: [
      { label: "26cm", price: 9.00 },
      { label: "30cm", price: 11.50 },
      { label: "32cm", price: 19.50 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "salami.jpg",
    available: true
  },
  {
    id: 6,
    name: "Prosciutto",
    ingredients: "Pizza mit edlem italienischem Kochschinken",
    sizes: [
      { label: "26cm", price: 9.00 },
      { label: "30cm", price: 11.50 },
      { label: "32cm", price: 19.50 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "prosciutto.jpg",
    available: true
  },
  {
    id: 7,
    name: "Salami Fungi",
    ingredients: "Pizza mit italienischem Salami und frischen Champignons",
    sizes: [
      { label: "26cm", price: 9.50 },
      { label: "30cm", price: 11.80 },
      { label: "32cm", price: 20.00 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "salami-fungi.jpg",
    available: true
  },
  {
    id: 8,
    name: "Prosciutto Fungi",
    ingredients: "Pizza mit Kochschinken und frischen Champignons",
    sizes: [
      { label: "26cm", price: 9.50 },
      { label: "30cm", price: 11.80 },
      { label: "32cm", price: 20.00 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "prosciutto-fungi.jpg",
    available: true
  },
  {
    id: 9,
    name: "Prosciutto Salami",
    ingredients: "Pizza mit Kochschinken und italienischem Salami",
    sizes: [
      { label: "26cm", price: 9.50 },
      { label: "30cm", price: 11.80 },
      { label: "32cm", price: 20.00 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "prosciutto-salami.jpg",
    available: true
  },
  {
    id: 10,
    name: "Milano",
    ingredients: "Pizza mit Kochschinken, Mozzarella und Champignons",
    sizes: [
      { label: "26cm", price: 9.50 },
      { label: "30cm", price: 11.80 },
      { label: "32cm", price: 20.00 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "milano.jpg",
    available: true
  },
  {
    id: 11,
    name: "Italia",
    ingredients: "Pizza mit vielen italienischen Zutaten",
    sizes: [
      { label: "26cm", price: 9.00 },
      { label: "30cm", price: 11.50 },
      { label: "32cm", price: 18.90 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "italia.jpg",
    available: true
  },
  {
    id: 12,
    name: "Capri",
    ingredients: "Pizza mit Tomaten, Mozzarella und Basilikum",
    sizes: [
      { label: "26cm", price: 9.00 },
      { label: "30cm", price: 11.50 },
      { label: "32cm", price: 18.90 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "capri.jpg",
    available: true
  },
  {
    id: 13,
    name: "Santorini",
    ingredients: "Griechische Pizza mit mediterranen Zutaten",
    sizes: [
      { label: "26cm", price: 9.90 },
      { label: "30cm", price: 12.50 },
      { label: "32cm", price: 20.50 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "santorini.jpg",
    available: true
  },
  {
    id: 14,
    name: "Ilo",
    ingredients: "Pizza mit exotischer Zutatenkomposition",
    sizes: [
      { label: "26cm", price: 10.10 },
      { label: "30cm", price: 12.40 },
      { label: "32cm", price: 20.50 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "ilo.jpg",
    available: true
  },
  {
    id: 15,
    name: "Hawaii",
    ingredients: "Pizza mit Ananas und Schinken",
    sizes: [
      { label: "26cm", price: 9.50 },
      { label: "30cm", price: 11.80 },
      { label: "32cm", price: 20.00 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "hawaii.jpg",
    available: true
  },
  {
    id: 16,
    name: "Tonno",
    ingredients: "Pizza mit hochwertigem Thunfisch und Zwiebeln",
    sizes: [
      { label: "26cm", price: 10.00 },
      { label: "30cm", price: 12.80 },
      { label: "32cm", price: 21.90 },
      { label: "60cm", price: 28.40 }
    ],
    category: "pizza",
    image: "tonno.jpg",
    available: true
  },
  {
    id: 17,
    name: "Madridi",
    ingredients: "Pizza mit spanischem Paprika und Fleisch",
    sizes: [
      { label: "26cm", price: 10.00 },
      { label: "30cm", price: 12.80 },
      { label: "32cm", price: 21.90 },
      { label: "60cm", price: 28.40 }
    ],
    category: "pizza",
    image: "madridi.jpg",
    available: true
  },
  {
    id: 18,
    name: "Scampi",
    ingredients: "Pizza mit frischen Garnelen und Kräutern",
    sizes: [
      { label: "26cm", price: 10.50 },
      { label: "30cm", price: 13.30 },
      { label: "32cm", price: 22.40 },
      { label: "60cm", price: 28.90 }
    ],
    category: "pizza",
    image: "scampi.jpg",
    available: true
  },
  {
    id: 19,
    name: "Frutti de Mare",
    ingredients: "Pizza mit verschiedenen Meeresfrüchten",
    sizes: [
      { label: "26cm", price: 10.50 },
      { label: "30cm", price: 13.30 },
      { label: "32cm", price: 22.40 },
      { label: "60cm", price: 28.90 }
    ],
    category: "pizza",
    image: "frutti-de-mare.jpg",
    available: true
  },
  {
    id: 20,
    name: "Veggie",
    ingredients: "Pizza mit frischem Gemüse und Kräutern",
    sizes: [
      { label: "26cm", price: 10.00 },
      { label: "30cm", price: 12.50 },
      { label: "32cm", price: 19.70 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "veggie.jpg",
    available: true
  },
  {
    id: 21,
    name: "Palermo",
    ingredients: "Pizza mit sizilianischen Zutaten",
    sizes: [
      { label: "26cm", price: 9.50 },
      { label: "30cm", price: 11.80 },
      { label: "32cm", price: 20.00 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "palermo.jpg",
    available: true
  },
  {
    id: 22,
    name: "Hähnchenbrust",
    ingredients: "Pizza mit zartem Hähnchenfleisch",
    sizes: [
      { label: "26cm", price: 10.40 },
      { label: "30cm", price: 12.60 },
      { label: "32cm", price: 18.90 },
      { label: "60cm", price: 28.40 }
    ],
    category: "pizza",
    image: "hahnchenbrust.jpg",
    available: true
  },
  {
    id: 23,
    name: "Classico",
    ingredients: "Pizza mit klassischen italienischen Zutaten",
    sizes: [
      { label: "26cm", price: 9.50 },
      { label: "30cm", price: 11.80 },
      { label: "32cm", price: 20.00 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "classico.jpg",
    available: true
  },
  {
    id: 24,
    name: "Miami",
    ingredients: "Pizza mit tropischem Flair und Fleisch",
    sizes: [
      { label: "26cm", price: 9.80 },
      { label: "30cm", price: 12.40 },
      { label: "32cm", price: 20.50 },
      { label: "60cm", price: 28.40 }
    ],
    category: "pizza",
    image: "miami.jpg",
    available: true
  },
  {
    id: 25,
    name: "Island",
    ingredients: "Pizza mit vielfältiger Zutatenauswahl",
    sizes: [
      { label: "26cm", price: 10.00 },
      { label: "30cm", price: 12.50 },
      { label: "32cm", price: 20.60 },
      { label: "60cm", price: 28.80 }
    ],
    category: "pizza",
    image: "island.jpg",
    available: true
  },
  {
    id: 26,
    name: "Paris",
    ingredients: "Pizza mit französischem Raffinement",
    sizes: [
      { label: "26cm", price: 11.00 },
      { label: "30cm", price: 13.80 },
      { label: "32cm", price: 22.90 },
      { label: "60cm", price: 29.40 }
    ],
    category: "pizza",
    image: "paris.jpg",
    available: true
  },
  {
    id: 27,
    name: "Rucola",
    ingredients: "Pizza mit frischer Rucola und Parmesan",
    sizes: [
      { label: "26cm", price: 10.50 },
      { label: "30cm", price: 12.30 },
      { label: "32cm", price: 19.90 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "rucola.jpg",
    available: true
  },
  {
    id: 28,
    name: "Bacon",
    ingredients: "Pizza mit knusprigem Speck",
    sizes: [
      { label: "26cm", price: 10.50 },
      { label: "30cm", price: 13.30 },
      { label: "32cm", price: 22.40 },
      { label: "60cm", price: 28.90 }
    ],
    category: "pizza",
    image: "bacon.jpg",
    available: true
  },
  {
    id: 29,
    name: "Chicken Curry",
    ingredients: "Pizza mit Hähnchen in Currysoße",
    sizes: [
      { label: "26cm", price: 9.50 },
      { label: "30cm", price: 11.80 },
      { label: "32cm", price: 20.00 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "chicken-curry.jpg",
    available: true
  },
  {
    id: 30,
    name: "Istanbul",
    ingredients: "Pizza mit orientalischen Zutaten und Gewürzen",
    sizes: [
      { label: "26cm", price: 9.50 },
      { label: "30cm", price: 12.80 },
      { label: "32cm", price: 18.40 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "istanbul.jpg",
    available: true
  },
  {
    id: 31,
    name: "Hot Salami",
    ingredients: "Pizza mit scharfem italienischem Salami",
    sizes: [
      { label: "26cm", price: 9.50 },
      { label: "30cm", price: 11.50 },
      { label: "32cm", price: 19.00 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "hot-salami.jpg",
    available: true
  },

  {
    id: 33,
    name: "Wunsch",
    ingredients: "Pizza nach Ihrem persönlichen Wunsch",
    sizes: [
      { label: "26cm", price: 11.00 },
      { label: "30cm", price: 14.00 },
      { label: "32cm", price: 19.00 },
      { label: "60cm", price: 28.50 }
    ],
    category: "pizza",
    image: "wunsch.jpg",
    available: true
  },

  {
    id: 35,
    name: "Pizza Della Casa",
    ingredients: "Spezialität des Hauses mit Premium-Zutaten",
    sizes: [
      { label: "26cm", price: 9.20 },
      { label: "30cm", price: 12.40 },
      { label: "32cm", price: 20.80 },
      { label: "60cm", price: 28.90 }
    ],
    category: "pizza",
    image: "pizza-della-casa.jpg",
    available: true
  },

  {
    id: 37,
    name: "Pizza Spezial",
    ingredients: "Besondere Pizza mit Geheimrezept",
    sizes: [
      { label: "26cm", price: 9.80 },
      { label: "30cm", price: 12.10 },
      { label: "32cm", price: 20.50 },
      { label: "60cm", price: 28.10 }
    ],
    category: "pizza",
    image: "pizza-spezial.jpg",
    available: true
  },
  {
    id: 38,
    name: "Pizza Hot Dog",
    ingredients: "Pizza mit Hot Dogs und Zwiebeln",
    sizes: [
      { label: "26cm", price: 9.40 },
      { label: "30cm", price: 12.20 },
      { label: "32cm", price: 20.90 },
      { label: "60cm", price: 28.40 }
    ],
    category: "pizza",
    image: "pizza-hot-dog.jpg",
    available: true
  },
  {
    id: 39,
    name: "Pizza Sucuk",
    ingredients: "Pizza mit orientalischer Sucuk-Wurst",
    sizes: [
      { label: "26cm", price: 9.50 },
      { label: "30cm", price: 12.50 },
      { label: "32cm", price: 21.90 },
      { label: "60cm", price: 29.00 }
    ],
    category: "pizza",
    image: "pizza-sucuk.jpg",
    available: true
  },
  {
    id: 40,
    name: "Pizza Hot Beef",
    ingredients: "Pizza mit scharfem Rindfleisch",
    sizes: [
      { label: "26cm", price: 8.90 },
      { label: "30cm", price: 12.50 },
      { label: "32cm", price: 20.50 },
      { label: "60cm", price: 28.40 }
    ],
    category: "pizza",
    image: "pizza-hot-beef.jpg",
    available: true
  },
  {
    id: 41,
    name: "Pizza Spinat",
    ingredients: "Pizza mit frischem Spinat und Knoblauch",
    sizes: [
      { label: "26cm", price: 9.50 },
      { label: "30cm", price: 11.80 },
      { label: "32cm", price: 20.90 },
      { label: "60cm", price: 28.00 }
    ],
    category: "pizza",
    image: "pizza-spinat.jpg",
    available: true
  },
  {
    id: 42,
    name: "Pizza Luna",
    ingredients: "Pizza mit romantischen Zutaten",
    sizes: [
      { label: "26cm", price: 9.70 },
      { label: "30cm", price: 12.30 },
      { label: "32cm", price: 21.80 },
      { label: "60cm", price: 28.20 }
    ],
    category: "pizza",
    image: "pizza-luna.jpg",
    available: true
  },

  {
    id: 44,
    name: "Extra Zutaten",
    ingredients: "Zusätzliche Toppings pro Zutat",
    sizes: [
      { label: "26cm", price: 2.50 },
      { label: "30cm", price: 4.00 },
      { label: "32cm", price: 3.50 },
      { label: "60cm", price: 6.00 }
    ],
    category: "pizza",
    image: "extra-zutaten.jpg",
    available: true
  },
  {
    id: 45,
    name: "Käse Rand",
    ingredients: "Käsegefüllter Pizzarand",
    sizes: [
      { label: "26cm", price: 3.00 },
      { label: "30cm", price: 4.50 },
      { label: "32cm", price: 4.00 },
      { label: "60cm", price: 6.90 }
    ],
    category: "pizza",
    image: "kaese-rand.jpg",
    available: true
  },
  // Burger Section
  {
    id: 46,
    name: "Hamburger",
    ingredients: "Rindfleisch, Brأ¶tchen, Salat, Tomate",
    price: 6.50,
    category: "burger",
    image: "hamburger.jpg",
    available: true
  },
  {
    id: 47,
    name: "Cheeseburger",
    ingredients: "Rindfleisch, Kأ¤se, Brأ¶tchen, Salat, Tomate",
    price: 7.00,
    category: "burger",
    image: "cheeseburger.jpg",
    available: true
  },
  {
    id: 48,
    name: "Chicken Burger",
    ingredients: "Hأ¤hnchenbrust, Brأ¶tchen, Salat, Tomate",
    price: 7.50,
    category: "burger",
    image: "chicken-burger.jpg",
    available: true
  },
  {
    id: 49,
    name: "Bacon Burger",
    ingredients: "Rindfleisch, Speck, Brأ¶tchen, Salat, Tomate",
    price: 8.00,
    category: "burger",
    image: "bacon-burger.jpg",
    available: true
  },
  {
    id: 50,
    name: "Champignon Burger",
    ingredients: "Rindfleisch, Pilze, Brأ¶tchen, Salat, Tomate",
    price: 7.50,
    category: "burger",
    image: "champignon-burger.jpg",
    available: true
  },
  {
    id: 51,
    name: "Crispy Chicken Burger",
    ingredients: "Hأ¤hnchen knusprig, Brأ¶tchen, Salat, Tomate",
    price: 8.00,
    category: "burger",
    image: "crispy-chicken-burger.jpg",
    available: true
  },
  {
    id: 52,
    name: "Italian Burger",
    ingredients: "Rindfleisch, Mozzarella, Basilikum, Brأ¶tchen",
    price: 7.50,
    category: "burger",
    image: "italian-burger.jpg",
    available: true
  },
  {
    id: 53,
    name: "Jumbo Cheeseburger",
    ingredients: "Doppeltes Rindfleisch, Kأ¤se, Brأ¶tchen, Salat, Tomate",
    price: 9.50,
    category: "burger",
    image: "jumbo-cheeseburger.jpg",
    available: true
  },
  {
    id: 54,
    name: "Jumbo Hamburger",
    ingredients: "Doppeltes Rindfleisch, Brأ¶tchen, Salat, Tomate",
    price: 9.00,
    category: "burger",
    image: "jumbo-hamburger.jpg",
    available: true
  },
  {
    id: 55,
    name: "Jumbo Chicken Burger",
    ingredients: "Doppelte Hأ¤hnchenbrust, Brأ¶tchen, Salat, Tomate",
    price: 10.00,
    category: "burger",
    image: "jumbo-chicken-burger.jpg",
    available: true
  },
  {
    id: 56,
    name: "Mexico Burger",
    ingredients: "Rindfleisch, Jalapeأ±os, Kأ¤se, Brأ¶tchen, Salat",
    price: 8.00,
    category: "burger",
    image: "mexico-burger.jpg",
    available: true
  },
  {
    id: 57,
    name: "Chili Cheeseburger",
    ingredients: "Rindfleisch, Chili, Kأ¤se, Brأ¶tchen, Salat",
    price: 7.50,
    category: "burger",
    image: "chili-cheeseburger.jpg",
    available: true
  },
  {
    id: 58,
    name: "Menأ¼1: Hamburger",
    ingredients: "Hamburger + Pommes + Getrأ¤nk",
    price: 10.00,
    category: "burger",
    image: "menu1-hamburger.jpg",
    available: true
  },
  {
    id: 59,
    name: "Menأ¼2: Cheeseburger",
    ingredients: "Cheeseburger + Pommes + Getrأ¤nk",
    price: 10.50,
    category: "burger",
    image: "menu2-cheeseburger.jpg",
    available: true
  },
  {
    id: 60,
    name: "Menأ¼3: Jumbo Cheeseburger",
    ingredients: "Jumbo Cheeseburger + Pommes + Getrأ¤nk",
    price: 12.00,
    category: "burger",
    image: "menu3-jumbo-cheeseburger.jpg",
    available: true
  },
  {
    id: 61,
    name: "Menأ¼4: Jumbo Chicken",
    ingredients: "Jumbo Chicken Burger + Pommes + Getrأ¤nk",
    price: 12.50,
    category: "burger",
    image: "menu4-jumbo-chicken.jpg",
    available: true
  },
  // Croque Section
  {
    id: 62,
    name: "Croque Madame",
    ingredients: "Schinken, Kأ¤se, Ei, Brot",
    price: 7.50,
    category: "croque",
    image: "croque-madame.jpg",
    available: true
  },
  {
    id: 63,
    name: "Croque Camembert",
    ingredients: "Camembert, Schinken, Brot",
    price: 8.50,
    category: "croque",
    image: "croque-camembert.jpg",
    available: true
  },
  {
    id: 64,
    name: "Croque Schinken",
    ingredients: "Schinken, Kأ¤se, Brot, Tomaten",
    price: 9.00,
    category: "croque",
    image: "croque-schinken.jpg",
    available: true
  },
  {
    id: 65,
    name: "Croque Salami Champignons",
    ingredients: "Salami, Pilze, Kأ¤se, Brot",
    price: 9.00,
    category: "croque",
    image: "croque-salami-champignons.jpg",
    available: true
  },
  {
    id: 66,
    name: "Croque Salami",
    ingredients: "Salami, Kأ¤se, Brot, Tomaten",
    price: 9.00,
    category: "croque",
    image: "croque-salami.jpg",
    available: true
  },
  {
    id: 67,
    name: "Croque Hawaii",
    ingredients: "Schinken, Ananas, Kأ¤se, Brot",
    price: 8.50,
    category: "croque",
    image: "croque-hawaii.jpg",
    available: true
  },
  {
    id: 68,
    name: "Croque Thunfisch",
    ingredients: "Thunfisch, Kأ¤se, Zwiebeln, Brot",
    price: 10.00,
    category: "croque",
    image: "croque-thunfisch.jpg",
    available: true
  },
  {
    id: 69,
    name: "Croque Hأ¤hnchenbrust",
    ingredients: "Hأ¤hnchenbrust, Kأ¤se, Brot, Tomaten",
    price: 9.00,
    category: "croque",
    image: "croque-hahnchenbrust.jpg",
    available: true
  },
  {
    id: 70,
    name: "Croque Sucuk",
    ingredients: "Sucuk, Kأ¤se, Zwiebeln, Brot",
    price: 8.50,
    category: "croque",
    image: "croque-sucuk.jpg",
    available: true
  },
  // Salat Section
  {
    id: 71,
    name: "Gemischter Salat",
    ingredients: "Gemischte Blأ¤tter, Tomate, Gurke, Zwiebel",
    price: 5.00,
    category: "salat",
    image: "gemischter-salat.jpg",
    available: true
  },
  {
    id: 72,
    name: "Thunfisch Salat",
    ingredients: "Gemischte Blأ¤tter, Thunfisch, Tomate, Gurke, Zwiebel",
    price: 6.50,
    category: "salat",
    image: "thunfisch-salat.jpg",
    available: true
  },
  {
    id: 73,
    name: "Miista",
    ingredients: "Gemischte Blأ¤tter, Hأ¼hnerbrust, Tomaten, Zwiebel",
    price: 5.00,
    category: "salat",
    image: "miista-salat.jpg",
    available: true
  },
  {
    id: 74,
    name: "Ma Balla",
    ingredients: "Gemischte Blأ¤tter, Lamm, Tomaten, Zwiebel, Feta",
    price: 5.90,
    category: "salat",
    image: "ma-balla-salat.jpg",
    available: true
  },
  {
    id: 75,
    name: "Tonno",
    ingredients: "Gemischte Blأ¤tter, Thunfisch, Tomate, Gurke, Ei",
    price: 6.50,
    category: "salat",
    image: "tonno-salat.jpg",
    available: true
  },
  {
    id: 76,
    name: "Scampi",
    ingredients: "Gemischte Blأ¤tter, Garnelen, Tomate, Gurke, Zwiebel",
    price: 7.50,
    category: "salat",
    image: "scampi-salat.jpg",
    available: true
  },
  {
    id: 77,
    name: "Chef",
    ingredients: "Gemischte Blأ¤tter, Hأ¼hnerbrust, Speck, Ei, Tomaten",
    price: 6.50,
    category: "salat",
    image: "chef-salat.jpg",
    available: true
  },
  {
    id: 78,
    name: "Della Casa",
    ingredients: "Gemischte Blأ¤tter, Schinken, Kأ¤se, Tomate, Ei, Zwiebel",
    price: 7.00,
    category: "salat",
    image: "della-casa-salat.jpg",
    available: true
  },
  {
    id: 79,
    name: "Guken Salat",
    ingredients: "Gemischte Blأ¤tter, Gurke, Tomate, Zwiebelringe",
    price: 7.50,
    category: "salat",
    image: "guken-salat.jpg",
    available: true
  },
  {
    id: 80,
    name: "Gyros",
    ingredients: "Gemischte Blأ¤tter, Gyros, Tomate, Zwiebel, Feta",
    price: 7.50,
    category: "salat",
    image: "gyros-salat.jpg",
    available: true
  },
  // Pasta Section
  {
    id: 81,
    name: "Alla Panna",
    ingredients: "Pasta, Sahne, Butter, Parmesan",
    price: 7.00,
    category: "pasta",
    image: "alla-panna.jpg",
    available: true
  },
  {
    id: 82,
    name: "Carbonara",
    ingredients: "Pasta, Speck, Ei, Sahne, Parmesan",
    price: 7.50,
    category: "pasta",
    image: "carbonara.jpg",
    available: true
  },
  {
    id: 83,
    name: "Pastore",
    ingredients: "Pasta, Lamm, Tomate, Zwiebel, Parmesan",
    price: 7.50,
    category: "pasta",
    image: "pastore.jpg",
    available: true
  },
  {
    id: 84,
    name: "Toscana",
    ingredients: "Pasta, Tomate, Knoblauch, Basilikum, Olivenأ¶l",
    price: 7.50,
    category: "pasta",
    image: "toscana.jpg",
    available: true
  },
  {
    id: 124,
    name: "Alla Milano",
    ingredients: "Pasta, Rindfleisch, Safran, Sahne, Parmesan",
    price: 8.00,
    category: "pasta",
    image: "alla-milano.jpg",
    available: true
  },
  {
    id: 125,
    name: "Italia",
    ingredients: "Pasta, Hأ¼hnerbrust, Tomate, Basilikum, Mozzarella",
    price: 8.30,
    category: "pasta",
    image: "italia.jpg",
    available: true
  },
  {
    id: 126,
    name: "Della Casa",
    ingredients: "Pasta, Schinken, Pilze, Sahne, Parmesan",
    price: 8.90,
    category: "pasta",
    image: "della-casa-pasta.jpg",
    available: true
  },
  {
    id: 127,
    name: "Pesto und Put",
    ingredients: "Pasta, Pesto, Garnelen, Tomaten, Knoblauch",
    price: 8.90,
    category: "pasta",
    image: "pesto-und-put.jpg",
    available: true
  },
  {
    id: 128,
    name: "Bolognese",
    ingredients: "Pasta, Rindfleisch, Tomate, Zwiebel, Knoblauch",
    price: 7.50,
    category: "pasta",
    image: "bolognese.jpg",
    available: true
  },
  {
    id: 129,
    name: "Scampi",
    ingredients: "Pasta, Garnelen, Tomate, Knoblauch, Basilikum",
    price: 9.50,
    category: "pasta",
    image: "scampi-pasta.jpg",
    available: true
  },
  {
    id: 130,
    name: "Wunsch",
    ingredients: "Pasta nach Wunsch mit Sauce nach Wunsch",
    price: 10.00,
    category: "pasta",
    image: "wunsch.jpg",
    available: true
  },
  {
    id: 131,
    name: "Pasta Classico",
    ingredients: "Pasta mit klassischer Tomate-Knoblauch-Sauce",
    price: 7.90,
    category: "pasta",
    image: "pasta-classico.jpg",
    available: true
  },
  {
    id: 132,
    name: "Kأ¤se أœberbacken",
    ingredients: "Zusatz: Kأ¤se أ¼berbacken fأ¼r jede Pasta",
    price: 1.50,
    category: "pasta",
    image: "kaese-ueberbacken.jpg",
    available: true
  },
  // Schnitzel Section
  {
    id: 133,
    name: "Wiener Schnitzel",
    ingredients: "Kalbfleisch, Panade, Pommes, Salat, Zitrone",
    price: 9.00,
    category: "schnitzel",
    image: "wiener-schnitzel.jpg",
    available: true
  },
  {
    id: 134,
    name: "Jأ¤gerschnitzel",
    ingredients: "Schweinefleisch, Pilzsauce, Pommes, Salat",
    price: 10.50,
    category: "schnitzel",
    image: "jagerschnitzel.jpg",
    available: true
  },
  {
    id: 135,
    name: "Zigeunerschnitzel",
    ingredients: "Schweinefleisch, Paprika-Gemأ¼sesauce, Pommes, Salat",
    price: 10.50,
    category: "schnitzel",
    image: "zigeunerschnitzel.jpg",
    available: true
  },
  {
    id: 136,
    name: "Schnitzel Hollandise",
    ingredients: "Hأ¤hnchenbrust, Hollandaise-Sauce, Pommes, Salat",
    price: 10.50,
    category: "schnitzel",
    image: "schnitzel-hollandise.jpg",
    available: true
  },
  // Snacks Section
  {
    id: 137,
    name: "Kأ¤sebrأ¶tchen",
    ingredients: "Brأ¶tchen, Kأ¤se, Butter",
    price: 5.50,
    category: "snacks",
    image: "kaesebrotchen.jpg",
    available: true
  },
  {
    id: 138,
    name: "Pizzabrأ¶tchen",
    ingredients: "Brأ¶tchen, Tomaten, Mozzarella, Oregano",
    price: 6.00,
    category: "snacks",
    image: "pizzabrotchen.jpg",
    available: true
  },
  {
    id: 139,
    name: "American Piyyabrot",
    ingredients: "Amerikanisches Pita-Brot mit Fleisch und Gemأ¼se",
    price: 7.50,
    category: "snacks",
    image: "american-piyyabrot.jpg",
    available: true
  },
  {
    id: 140,
    name: "Knoblauch Brot",
    ingredients: "Brot mit Knoblauch, Butter, Petersilie",
    price: 4.00,
    category: "snacks",
    image: "knoblauch-brot.jpg",
    available: true
  },
  {
    id: 141,
    name: "Kأ¤se Knoblauch Brot",
    ingredients: "Brot mit Knoblauch, Kأ¤se, Butter, Petersilie",
    price: 5.00,
    category: "snacks",
    image: "kaese-knoblauch-brot.jpg",
    available: true
  },
  // Beilagen Section
  {
    id: 142,
    name: "Sأ¼sskartoffeln-Pommes",
    ingredients: "Sأ¼أںkartoffeln, Salz, أ–l",
    price: 4.50,
    category: "beilagen",
    image: "susskartoffeln-pommes.jpg",
    available: true
  },
  {
    id: 143,
    name: "Chili Cheese Pommes",
    ingredients: "Pommes, Kأ¤se, Chili-Sauce",
    price: 5.00,
    category: "beilagen",
    image: "chili-cheese-pommes.jpg",
    available: true
  },
  {
    id: 144,
    name: "Pommes",
    ingredients: "Kartoffeln, Salz, أ–l",
    price: 3.00,
    category: "beilagen",
    image: "pommes.jpg",
    available: true
  },
  {
    id: 145,
    name: "Country Fries",
    ingredients: "Kartoffeln mit Schale, Salz, أ–l",
    price: 4.00,
    category: "beilagen",
    image: "country-fries.jpg",
    available: true
  },
  {
    id: 146,
    name: "Twister",
    ingredients: "Spiralfأ¶rmige Kartoffelstأ¤bchen, Salz, أ–l",
    price: 4.00,
    category: "beilagen",
    image: "twister.jpg",
    available: true
  },
  {
    id: 147,
    name: "Chili Pommes",
    ingredients: "Pommes, Chili-Sauce, Zwiebeln",
    price: 5.00,
    category: "beilagen",
    image: "chili-pommes.jpg",
    available: true
  },
  {
    id: 148,
    name: "Kroketten",
    ingredients: "Kartoffel-Kroketten, frittiert",
    price: 5.00,
    category: "beilagen",
    image: "kroketten.jpg",
    available: true
  },
  {
    id: 149,
    name: "Gegrillte Champignons",
    ingredients: "Champignons, gegrilltes Gemأ¼se, أ–l",
    price: 4.50,
    category: "beilagen",
    image: "gegrillte-champignons.jpg",
    available: true
  },
  {
    id: 150,
    name: "Gegrilltes Gemأ¼se",
    ingredients: "Verschiedenes Gemأ¼se, gegrillte Zucchini, Paprika",
    price: 5.00,
    category: "beilagen",
    image: "gegrilltes-gemuse.jpg",
    available: true
  },
  {
    id: 151,
    name: "BBQ Pommes",
    ingredients: "Pommes, BBQ-Sauce",
    price: 5.00,
    category: "beilagen",
    image: "bbq-pommes.jpg",
    available: true
  },
  {
    id: 152,
    name: "BBQ Twister",
    ingredients: "Twister, BBQ-Sauce",
    price: 5.00,
    category: "beilagen",
    image: "bbq-twister.jpg",
    available: true
  },
  {
    id: 153,
    name: "Chili Twister",
    ingredients: "Twister, Chili-Sauce",
    price: 5.00,
    category: "beilagen",
    image: "chili-twister.jpg",
    available: true
  },
  // Snack Rolls Section
  {
    id: 154,
    name: "Salami",
    ingredients: "Salami, Tortilla",
    category: "snackrolls",
    image: "salami-roll.jpg",
    sizes: [
      { label: "6 Stأ¼ck", price: 6.00 },
      { label: "12 Stأ¼ck", price: 10.50 }
    ],
    available: true
  },
  {
    id: 155,
    name: "Schinken",
    ingredients: "Schinken, Tortilla",
    category: "snackrolls",
    image: "schinken-roll.jpg",
    sizes: [
      { label: "6 Stأ¼ck", price: 6.00 },
      { label: "12 Stأ¼ck", price: 10.50 }
    ],
    available: true
  },
  {
    id: 156,
    name: "Thunfisch",
    ingredients: "Thunfisch, Tortilla",
    category: "snackrolls",
    image: "thunfisch-roll.jpg",
    sizes: [
      { label: "6 Stأ¼ck", price: 6.50 },
      { label: "12 Stأ¼ck", price: 11.00 }
    ],
    available: true
  },
  {
    id: 157,
    name: "Hأ¤hnchen",
    ingredients: "Hأ¤hnchenbrust, Tortilla",
    category: "snackrolls",
    image: "hahnchen-roll.jpg",
    sizes: [
      { label: "6 Stأ¼ck", price: 6.00 },
      { label: "12 Stأ¼ck", price: 10.50 }
    ],
    available: true
  },
  {
    id: 158,
    name: "Puter",
    ingredients: "Putenfleisch, Tortilla",
    category: "snackrolls",
    image: "puter-roll.jpg",
    sizes: [
      { label: "6 Stأ¼ck", price: 6.00 },
      { label: "12 Stأ¼ck", price: 10.50 }
    ],
    available: true
  },
  {
    id: 159,
    name: "Hot Chicken",
    ingredients: "Hأ¤hnchenbrust, Chili, Tortilla",
    category: "snackrolls",
    image: "hot-chicken-roll.jpg",
    sizes: [
      { label: "6 Stأ¼ck", price: 6.50 },
      { label: "12 Stأ¼ck", price: 11.00 }
    ],
    available: true
  },
  {
    id: 160,
    name: "Hawaii Roll",
    ingredients: "Hأ¤hnchen, Ananas, Tortilla",
    price: 6.00,
    category: "snackrolls",
    image: "hawaii-roll.jpg",
    available: true
  },
  {
    id: 161,
    name: "أœberaschung",
    ingredients: "أœberraschungsmischung, Tortilla",
    price: 19.00,
    category: "snackrolls",
    image: "uberaschung-roll.jpg",
    available: true
  },
  {
    id: 162,
    name: "Feuerring",
    ingredients: "Rindfleisch, Chili, scharfe Sauce, Tortilla",
    price: 6.80,
    category: "snackrolls",
    image: "feuerring.jpg",
    available: true
  },
  {
    id: 163,
    name: "Kأ¤se Ring+dip",
    ingredients: "Kأ¤se, Dip-Sauce, Tortilla",
    price: 6.00,
    category: "snackrolls",
    image: "kaese-ring-dip.jpg",
    available: true
  },
  // Getrأ¤nke Section
  {
    id: 164,
    name: "Cola 1Liter",
    ingredients: "Kohlensأ¤urehaltiges Erfrischungsgetrأ¤nk",
    price: 3.00,
    category: "getranke",
    image: "cola-1l.jpg",
    available: true
  },
  {
    id: 165,
    name: "Cola 0.33L",
    ingredients: "Kohlens��urehaltiges Erfrischungsgetr��nk",
    price: 2.50,
    category: "getranke",
    image: "cola-033l.jpg",
    available: true
  },
  {
    id: 166,
    name: "Redbull",
    ingredients: "Energy Drink",
    price: 2.50,
    category: "getranke",
    image: "redbull.jpg",
    available: true
  },
  {
    id: 167,
    name: "Durstlأ¶scher",
    ingredients: "Fruchtsaftgetrأ¤nk",
    price: 2.00,
    category: "getranke",
    image: "durstloscher.jpg",
    available: true
  },
  {
    id: 168,
    name: "Fanta (0.33l)",
    ingredients: "Kohlensأ¤urehaltiges Fruchtgetrأ¤nk",
    price: 2.50,
    category: "getranke",
    image: "fanta-033l.jpg",
    available: true
  },
  {
    id: 169,
    name: "Wasser (0.5l)",
    ingredients: "Mineralwasser",
    price: 2.00,
    category: "getranke",
    image: "wasser-05l.jpg",
    available: true
  },
   
  {
    id: 170,
    name: "A1 Supper Familienangebot",
    ingredients: "Groأںes Familienangebot mit Pizzen und Beilagen",
    price: 26.90,
    category: "angebote",
    image: "a1-supper-familienangebot.jpg",
    available: true
  },
  {
    id: 171,
    name: "A2 Pizzblech",
    ingredients: "Pizza Blech mit verschiedenen Sorten",
    price: 27.90,
    category: "angebote",
    image: "a2-pizzblech.jpg",
    available: true
  },
  {
    id: 172,
    name: "A3 3* Pizza",
    ingredients: "Drei verschiedene Pizzen",
    price: 22.90,
    category: "angebote",
    image: "a3-3-pizza.jpg",
    available: true
  },
  // Fingerfood Section
  {
    id: 173,
    name: "Chicken Nuggets",
    ingredients: "Knusprige Hأ¤hnchen-Nuggets",
    category: "fingerfood",
    image: "chicken-nuggets.jpg",
    sizes: [
      { label: "6 Stk.", price: 6.50 },
      { label: "12 Stk.", price: 8.50 }
    ],
    available: true
  },
  {
    id: 174,
    name: "Chicken Wings",
    ingredients: "Wأ¼rzige Hأ¤hnchen-Flأ¼gel",
    category: "fingerfood",
    image: "chicken-wings.jpg",
    sizes: [
      { label: "6 Stk.", price: 7.00 },
      { label: "12 Stk.", price: 10.00 }
    ],
    available: true
  },
  {
    id: 175,
    name: "Crispy Chicken Fingers",
    ingredients: "Knusprige Hأ¤hnchen-Finger",
    category: "fingerfood",
    image: "crispy-chicken-fingers.jpg",
    sizes: [
      { label: "6 Stk.", price: 7.50 },
      { label: "12 Stk.", price: 10.00 }
    ],
    available: true
  },
  {
    id: 176,
    name: "Chili Cheese Nuggets",
    ingredients: "Hأ¤hnchen-Nuggets mit Chili und Kأ¤se",
    category: "fingerfood",
    image: "chili-cheese-nuggets.jpg",
    sizes: [
      { label: "6 Stk.", price: 6.50 },
      { label: "12 Stk.", price: 8.50 }
    ],
    available: true
  },
  {
    id: 177,
    name: "Mozzarella Sticks",
    ingredients: "Frittierte Mozzarella-Stأ¤bchen",
    category: "fingerfood",
    image: "mozzarella-sticks.jpg",
    sizes: [
      { label: "6 Stk.", price: 6.50 },
      { label: "12 Stk.", price: 8.50 }
    ],
    available: true
  },
  {
    id: 178,
    name: "Mix-Box",
    ingredients: "Groأںe Fingerfood Mischbox",
    price: 17.50,
    category: "fingerfood",
    image: "michbox.jpg",
    available: true
  },
  {
    id: 179,
    name: "Curry Wurst",
    ingredients: "Wأ¼rstchen mit Curry-Sauce",
    price: 7.90,
    category: "fingerfood",
    image: "curry-wurst.jpg",
    available: true
  },
  // Sauces and Dips Section
  {
    id: 180,
    name: "Kania Ketchup",
    ingredients: "Klassischer Tomaten-Ketchup",
    price: 0.80,
    category: "sauces",
    image: "kania-ketchup.jpg",
    available: true
  },
  {
    id: 181,
    name: "Mayonnaise",
    ingredients: "Cremige Mayonnaise",
    price: 0.80,
    category: "sauces",
    image: "mayonnaise.jpg",
    available: true
  },
  {
    id: 182,
    name: "American Sauce",
    ingredients: "Wأ¼rzige amerikanische Sauce",
    price: 1.50,
    category: "sauces",
    image: "american-sauce.jpg",
    available: true
  },
  {
    id: 183,
    name: "Knoblauch Sauce",
    ingredients: "Aromatische Knoblauch-Sauce",
    price: 1.50,
    category: "sauces",
    image: "knoblauch-sauce.jpg",
    available: true
  }
];

// Routes

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Toggle product availability
app.put('/api/products/:id/availability', (req, res) => {
  const { available } = req.body;
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({ error: "Produkt nicht gefunden" });
  }

  product.available = available;
  res.json(product);
});

// Get available toppings for pizza customization
app.get('/api/toppings', (req, res) => {
  res.json(availableToppings);
});

// Get all orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Create a new order
app.post('/api/orders', (req, res) => {
  const { items, customerName, customerEmail, customerPhone, customerAddress } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: "Bestellung muss mindestens ein Element enthalten" });
  }

  // Check if all items are available
  for (const item of items) {
    const product = products.find(p => p.id === item.id);
    if (!product || !product.available) {
      return res.status(400).json({ 
        error: `Das Produkt "${item.name}" ist leider nicht verfügbar.` 
      });
    }
  }

  const order = {
    id: orderCounter++,
    items,
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    totalPrice: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    status: "Neu",
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  res.status(201).json(order);
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ error: "Bestellung nicht gefunden" });
  }
  res.json(order);
});

// Update order status
app.put('/api/orders/:id', (req, res) => {
  const { status } = req.body;
  const order = orders.find(o => o.id === parseInt(req.params.id));
  
  if (!order) {
    return res.status(404).json({ error: "Bestellung nicht gefunden" });
  }

  order.status = status || order.status;
  res.json(order);
});

// Delete order
app.delete('/api/orders/:id', (req, res) => {
  orders = orders.filter(o => o.id !== parseInt(req.params.id));
  res.json({ message: "Bestellung gelأ¶scht" });
});

// Serve admin page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Milano Pizza Server läuft auf http://localhost:${PORT}`);
});


