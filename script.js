// Global variables
let cart = [];
let products = [];
let toppings = [];
const API_URL = window.location.origin + '/api';
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDbcY_PrgZC4QqPStY4J0kPBU0IXWFTzUI",
  authDomain: "milanomomo-cc489.firebaseapp.com",
  databaseURL: "https://milanomomo-cc489-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "milanomomo-cc489",
  storageBucket: "milanomomo-cc489.firebasestorage.app",
  messagingSenderId: "216622568116",
  appId: "1:216622568116:web:49e22663e7a63c403abde1",
  measurementId: "G-SGHWDNS9C3"
};
firebase.initializeApp(FIREBASE_CONFIG);
let customizingProduct = null;
let aboutClickCount = 0;
let logoClickCount = 0;

// Fallback products data for local file usage (all products from server.js)
const FALLBACK_PRODUCTS = JSON.parse(`[{"id":1,"name":"Margherita","ingredients":"Pizza mit Tomaten, Mozzarella und frischem Basilikum","sizes":[{"label":"26cm","price":8},{"label":"30cm","price":11},{"label":"32cm","price":17},{"label":"60cm","price":24.5}],"category":"pizza","image":"margherita.jpg","available":true},{"id":2,"name":"Mozzarella","ingredients":"Pizza mit reichlich Mozzarella und Tomaten","sizes":[{"label":"26cm","price":8.5},{"label":"30cm","price":11.5},{"label":"32cm","price":18.5},{"label":"60cm","price":28.5}],"category":"pizza","image":"mozzarella.jpg","available":true},{"id":3,"name":"Formaggi","ingredients":"Pizza mit vier verschiedenen Käsesorten","sizes":[{"label":"26cm","price":8.5},{"label":"30cm","price":11.5},{"label":"32cm","price":18.5},{"label":"60cm","price":28.5}],"category":"pizza","image":"formaggi.jpg","available":true},{"id":4,"name":"Fungi","ingredients":"Pizza mit frischen Champignons","sizes":[{"label":"26cm","price":8.2},{"label":"30cm","price":10.5},{"label":"32cm","price":19},{"label":"60cm","price":28}],"category":"pizza","image":"fungi.jpg","available":true},{"id":5,"name":"Salami","ingredients":"Pizza mit italienischem Salami","sizes":[{"label":"26cm","price":9},{"label":"30cm","price":11.5},{"label":"32cm","price":19.5},{"label":"60cm","price":28}],"category":"pizza","image":"salami.jpg","available":true},{"id":6,"name":"Prosciutto","ingredients":"Pizza mit edlem italienischem Kochschinken","sizes":[{"label":"26cm","price":9},{"label":"30cm","price":11.5},{"label":"32cm","price":19.5},{"label":"60cm","price":28}],"category":"pizza","image":"prosciutto.jpg","available":true},{"id":7,"name":"Salami Fungi","ingredients":"Pizza mit italienischem Salami und frischen Champignons","sizes":[{"label":"26cm","price":9.5},{"label":"30cm","price":11.8},{"label":"32cm","price":20},{"label":"60cm","price":28}],"category":"pizza","image":"salami-fungi.jpg","available":true},{"id":8,"name":"Prosciutto Fungi","ingredients":"Pizza mit Kochschinken und frischen Champignons","sizes":[{"label":"26cm","price":9.5},{"label":"30cm","price":11.8},{"label":"32cm","price":20},{"label":"60cm","price":28}],"category":"pizza","image":"prosciutto-fungi.jpg","available":true},{"id":9,"name":"Prosciutto Salami","ingredients":"Pizza mit Kochschinken und italienischem Salami","sizes":[{"label":"26cm","price":9.5},{"label":"30cm","price":11.8},{"label":"32cm","price":20},{"label":"60cm","price":28}],"category":"pizza","image":"prosciutto-salami.jpg","available":true},{"id":10,"name":"Milano","ingredients":"Pizza mit Kochschinken, Mozzarella und Champignons","sizes":[{"label":"26cm","price":9.5},{"label":"30cm","price":11.8},{"label":"32cm","price":20},{"label":"60cm","price":28}],"category":"pizza","image":"milano.jpg","available":true},{"id":11,"name":"Italia","ingredients":"Pizza mit vielen italienischen Zutaten","sizes":[{"label":"26cm","price":9},{"label":"30cm","price":11.5},{"label":"32cm","price":18.9},{"label":"60cm","price":28}],"category":"pizza","image":"italia.jpg","available":true},{"id":12,"name":"Capri","ingredients":"Pizza mit Tomaten, Mozzarella und Basilikum","sizes":[{"label":"26cm","price":9},{"label":"30cm","price":11.5},{"label":"32cm","price":18.9},{"label":"60cm","price":28}],"category":"pizza","image":"capri.jpg","available":true},{"id":13,"name":"Santorini","ingredients":"Griechische Pizza mit mediterranen Zutaten","sizes":[{"label":"26cm","price":9.9},{"label":"30cm","price":12.5},{"label":"32cm","price":20.5},{"label":"60cm","price":28}],"category":"pizza","image":"santorini.jpg","available":true},{"id":14,"name":"Ilo","ingredients":"Pizza mit exotischer Zutatenkomposition","sizes":[{"label":"26cm","price":10.1},{"label":"30cm","price":12.4},{"label":"32cm","price":20.5},{"label":"60cm","price":28}],"category":"pizza","image":"ilo.jpg","available":true},{"id":15,"name":"Hawaii","ingredients":"Pizza mit Ananas und Schinken","sizes":[{"label":"26cm","price":9.5},{"label":"30cm","price":11.8},{"label":"32cm","price":20},{"label":"60cm","price":28}],"category":"pizza","image":"hawaii.jpg","available":true},{"id":16,"name":"Tonno","ingredients":"Pizza mit hochwertigem Thunfisch und Zwiebeln","sizes":[{"label":"26cm","price":10},{"label":"30cm","price":12.8},{"label":"32cm","price":21.9},{"label":"60cm","price":28.4}],"category":"pizza","image":"tonno.jpg","available":true},{"id":17,"name":"Madridi","ingredients":"Pizza mit spanischem Paprika und Fleisch","sizes":[{"label":"26cm","price":10},{"label":"30cm","price":12.8},{"label":"32cm","price":21.9},{"label":"60cm","price":28.4}],"category":"pizza","image":"madridi.jpg","available":true},{"id":18,"name":"Scampi","ingredients":"Pizza mit frischen Garnelen und Kräutern","sizes":[{"label":"26cm","price":10.5},{"label":"30cm","price":13.3},{"label":"32cm","price":22.4},{"label":"60cm","price":28.9}],"category":"pizza","image":"scampi.jpg","available":true},{"id":19,"name":"Frutti de Mare","ingredients":"Pizza mit verschiedenen Meeresfrüchten","sizes":[{"label":"26cm","price":10.5},{"label":"30cm","price":13.3},{"label":"32cm","price":22.4},{"label":"60cm","price":28.9}],"category":"pizza","image":"frutti-de-mare.jpg","available":true},{"id":20,"name":"Veggie","ingredients":"Pizza mit frischem Gemüse und Kräutern","sizes":[{"label":"26cm","price":10},{"label":"30cm","price":12.5},{"label":"32cm","price":19.7},{"label":"60cm","price":28}],"category":"pizza","image":"veggie.jpg","available":true},{"id":21,"name":"Palermo","ingredients":"Pizza mit sizilianischen Zutaten","sizes":[{"label":"26cm","price":9.5},{"label":"30cm","price":11.8},{"label":"32cm","price":20},{"label":"60cm","price":28}],"category":"pizza","image":"palermo.jpg","available":true},{"id":22,"name":"Hähnchenbrust","ingredients":"Pizza mit zartem Hähnchenfleisch","sizes":[{"label":"26cm","price":10.4},{"label":"30cm","price":12.6},{"label":"32cm","price":18.9},{"label":"60cm","price":28.4}],"category":"pizza","image":"hahnchenbrust.jpg","available":true},{"id":23,"name":"Classico","ingredients":"Pizza mit klassischen italienischen Zutaten","sizes":[{"label":"26cm","price":9.5},{"label":"30cm","price":11.8},{"label":"32cm","price":20},{"label":"60cm","price":28}],"category":"pizza","image":"classico.jpg","available":true},{"id":24,"name":"Miami","ingredients":"Pizza mit tropischem Flair und Fleisch","sizes":[{"label":"26cm","price":9.8},{"label":"30cm","price":12.4},{"label":"32cm","price":20.5},{"label":"60cm","price":28.4}],"category":"pizza","image":"miami.jpg","available":true},{"id":25,"name":"Island","ingredients":"Pizza mit vielfältiger Zutatenauswahl","sizes":[{"label":"26cm","price":10},{"label":"30cm","price":12.5},{"label":"32cm","price":20.6},{"label":"60cm","price":28.8}],"category":"pizza","image":"island.jpg","available":true},{"id":26,"name":"Paris","ingredients":"Pizza mit französischem Raffinement","sizes":[{"label":"26cm","price":11},{"label":"30cm","price":13.8},{"label":"32cm","price":22.9},{"label":"60cm","price":29.4}],"category":"pizza","image":"paris.jpg","available":true},{"id":27,"name":"Rucola","ingredients":"Pizza mit frischer Rucola und Parmesan","sizes":[{"label":"26cm","price":10.5},{"label":"30cm","price":12.3},{"label":"32cm","price":19.9},{"label":"60cm","price":28}],"category":"pizza","image":"rucola.jpg","available":true},{"id":28,"name":"Bacon","ingredients":"Pizza mit knusprigem Speck","sizes":[{"label":"26cm","price":10.5},{"label":"30cm","price":13.3},{"label":"32cm","price":22.4},{"label":"60cm","price":28.9}],"category":"pizza","image":"bacon.jpg","available":true},{"id":29,"name":"Chicken Curry","ingredients":"Pizza mit Hähnchen in Currysoße","sizes":[{"label":"26cm","price":9.5},{"label":"30cm","price":11.8},{"label":"32cm","price":20},{"label":"60cm","price":28}],"category":"pizza","image":"chicken-curry.jpg","available":true},{"id":30,"name":"Istanbul","ingredients":"Pizza mit orientalischen Zutaten und Gewürzen","sizes":[{"label":"26cm","price":9.5},{"label":"30cm","price":12.8},{"label":"32cm","price":18.4},{"label":"60cm","price":28}],"category":"pizza","image":"istanbul.jpg","available":true},{"id":31,"name":"Hot Salami","ingredients":"Pizza mit scharfem italienischem Salami","sizes":[{"label":"26cm","price":9.5},{"label":"30cm","price":11.5},{"label":"32cm","price":19},{"label":"60cm","price":28}],"category":"pizza","image":"hot-salami.jpg","available":true},{"id":33,"name":"Wunsch","ingredients":"Pizza nach Ihrem persönlichen Wunsch","sizes":[{"label":"26cm","price":11},{"label":"30cm","price":14},{"label":"32cm","price":19},{"label":"60cm","price":28.5}],"category":"pizza","image":"wunsch.jpg","available":true},{"id":35,"name":"Pizza Della Casa","ingredients":"Spezialität des Hauses mit Premium-Zutaten","sizes":[{"label":"26cm","price":9.2},{"label":"30cm","price":12.4},{"label":"32cm","price":20.8},{"label":"60cm","price":28.9}],"category":"pizza","image":"pizza-della-casa.jpg","available":true},{"id":37,"name":"Pizza Spezial","ingredients":"Besondere Pizza mit Geheimrezept","sizes":[{"label":"26cm","price":9.8},{"label":"30cm","price":12.1},{"label":"32cm","price":20.5},{"label":"60cm","price":28.1}],"category":"pizza","image":"pizza-spezial.jpg","available":true},{"id":38,"name":"Pizza Hot Dog","ingredients":"Pizza mit Hot Dogs und Zwiebeln","sizes":[{"label":"26cm","price":9.4},{"label":"30cm","price":12.2},{"label":"32cm","price":20.9},{"label":"60cm","price":28.4}],"category":"pizza","image":"pizza-hot-dog.jpg","available":true},{"id":39,"name":"Pizza Sucuk","ingredients":"Pizza mit orientalischer Sucuk-Wurst","sizes":[{"label":"26cm","price":9.5},{"label":"30cm","price":12.5},{"label":"32cm","price":21.9},{"label":"60cm","price":29}],"category":"pizza","image":"pizza-sucuk.jpg","available":true},{"id":40,"name":"Pizza Hot Beef","ingredients":"Pizza mit scharfem Rindfleisch","sizes":[{"label":"26cm","price":8.9},{"label":"30cm","price":12.5},{"label":"32cm","price":20.5},{"label":"60cm","price":28.4}],"category":"pizza","image":"pizza-hot-beef.jpg","available":true},{"id":41,"name":"Pizza Spinat","ingredients":"Pizza mit frischem Spinat und Knoblauch","sizes":[{"label":"26cm","price":9.5},{"label":"30cm","price":11.8},{"label":"32cm","price":20.9},{"label":"60cm","price":28}],"category":"pizza","image":"pizza-spinat.jpg","available":true},{"id":42,"name":"Pizza Luna","ingredients":"Pizza mit romantischen Zutaten","sizes":[{"label":"26cm","price":9.7},{"label":"30cm","price":12.3},{"label":"32cm","price":21.8},{"label":"60cm","price":28.2}],"category":"pizza","image":"pizza-luna.jpg","available":true},{"id":44,"name":"Extra Zutaten","ingredients":"Zusätzliche Toppings pro Zutat","sizes":[{"label":"26cm","price":2.5},{"label":"30cm","price":4},{"label":"32cm","price":3.5},{"label":"60cm","price":6}],"category":"pizza","image":"extra-zutaten.jpg","available":false},{"id":45,"name":"Käse Rand","ingredients":"Käsegefüllter Pizzarand","sizes":[{"label":"26cm","price":3},{"label":"30cm","price":4.5},{"label":"32cm","price":4},{"label":"60cm","price":6.9}],"category":"pizza","image":"kaese-rand.jpg","available":false},{"id":46,"name":"Hamburger","ingredients":"Rindfleisch, Brötchen, Salat, Tomate","price":6.5,"category":"burger","image":"hamburger.jpg","available":true},{"id":47,"name":"Cheeseburger","ingredients":"Rindfleisch, Käse, Brötchen, Salat, Tomate","price":7,"category":"burger","image":"cheeseburger.jpg","available":true},{"id":48,"name":"Chicken Burger","ingredients":"Hähnchenbrust, Brötchen, Salat, Tomate","price":7.5,"category":"burger","image":"chicken-burger.jpg","available":true},{"id":49,"name":"Bacon Burger","ingredients":"Rindfleisch, Speck, Brötchen, Salat, Tomate","price":8,"category":"burger","image":"bacon-burger.jpg","available":true},{"id":50,"name":"Champignon Burger","ingredients":"Rindfleisch, Pilze, Brötchen, Salat, Tomate","price":7.5,"category":"burger","image":"champignon-burger.jpg","available":true},{"id":51,"name":"Crispy Chicken Burger","ingredients":"Hähnchen knusprig, Brötchen, Salat, Tomate","price":8,"category":"burger","image":"crispy-chicken-burger.jpg","available":true},{"id":52,"name":"Italian Burger","ingredients":"Rindfleisch, Mozzarella, Basilikum, Brötchen","price":7.5,"category":"burger","image":"italian-burger.jpg","available":true},{"id":53,"name":"Jumbo Cheeseburger","ingredients":"Doppeltes Rindfleisch, Käse, Brötchen, Salat, Tomate","price":9.5,"category":"burger","image":"jumbo-cheeseburger.jpg","available":true},{"id":54,"name":"Jumbo Hamburger","ingredients":"Doppeltes Rindfleisch, Brötchen, Salat, Tomate","price":9,"category":"burger","image":"jumbo-hamburger.jpg","available":true},{"id":55,"name":"Jumbo Chicken Burger","ingredients":"Doppelte Hähnchenbrust, Brötchen, Salat, Tomate","price":10,"category":"burger","image":"jumbo-chicken-burger.jpg","available":true},{"id":56,"name":"Mexico Burger","ingredients":"Rindfleisch, Jalapeños, Käse, Brötchen, Salat","price":8,"category":"burger","image":"mexico-burger.jpg","available":true},{"id":57,"name":"Chili Cheeseburger","ingredients":"Rindfleisch, Chili, Käse, Brötchen, Salat","price":7.5,"category":"burger","image":"chili-cheeseburger.jpg","available":true},{"id":58,"name":"Menü1: Hamburger","ingredients":"Hamburger + Pommes + Getränk","price":10,"category":"burger","image":"menu1-hamburger.jpg","available":true},{"id":59,"name":"Menü2: Cheeseburger","ingredients":"Cheeseburger + Pommes + Getränk","price":10.5,"category":"burger","image":"menu2-cheeseburger.jpg","available":true},{"id":60,"name":"Menü3: Jumbo Cheeseburger","ingredients":"Jumbo Cheeseburger + Pommes + Getränk","price":12,"category":"burger","image":"menu3-jumbo-cheeseburger.jpg","available":true},{"id":61,"name":"Menü4: Jumbo Chicken","ingredients":"Jumbo Chicken Burger + Pommes + Getränk","price":12.5,"category":"burger","image":"menu4-jumbo-chicken.jpg","available":true},{"id":62,"name":"Croque Madame","ingredients":"Schinken, Käse, Ei, Brot","price":7.5,"category":"croque","image":"croque-madame.jpg","available":true},{"id":63,"name":"Croque Camembert","ingredients":"Camembert, Schinken, Brot","price":8.5,"category":"croque","image":"croque-camembert.jpg","available":true},{"id":64,"name":"Croque Schinken","ingredients":"Schinken, Käse, Brot, Tomaten","price":9,"category":"croque","image":"croque-schinken.jpg","available":true},{"id":65,"name":"Croque Salami Champignons","ingredients":"Salami, Pilze, Käse, Brot","price":9,"category":"croque","image":"croque-salami-champignons.jpg","available":true},{"id":66,"name":"Croque Salami","ingredients":"Salami, Käse, Brot, Tomaten","price":9,"category":"croque","image":"croque-salami.jpg","available":true},{"id":67,"name":"Croque Hawaii","ingredients":"Schinken, Ananas, Käse, Brot","price":8.5,"category":"croque","image":"croque-hawaii.jpg","available":true},{"id":68,"name":"Croque Thunfisch","ingredients":"Thunfisch, Käse, Zwiebeln, Brot","price":10,"category":"croque","image":"croque-thunfisch.jpg","available":true},{"id":69,"name":"Croque Hähnchenbrust","ingredients":"Hähnchenbrust, Käse, Brot, Tomaten","price":9,"category":"croque","image":"croque-hahnchenbrust.jpg","available":true},{"id":70,"name":"Croque Sucuk","ingredients":"Sucuk, Käse, Zwiebeln, Brot","price":8.5,"category":"croque","image":"croque-sucuk.jpg","available":true},{"id":71,"name":"Gemischter Salat","ingredients":"Gemischte Blätter, Tomate, Gurke, Zwiebel","price":5,"category":"salat","image":"gemischter-salat.jpg","available":true},{"id":72,"name":"Thunfisch Salat","ingredients":"Gemischte Blätter, Thunfisch, Tomate, Gurke, Zwiebel","price":6.5,"category":"salat","image":"thunfisch-salat.jpg","available":true},{"id":73,"name":"Miista","ingredients":"Gemischte Blätter, Hühnerbrust, Tomaten, Zwiebel","price":5,"category":"salat","image":"miista-salat.jpg","available":true},{"id":74,"name":"Ma Balla","ingredients":"Gemischte Blätter, Lamm, Tomaten, Zwiebel, Feta","price":5.9,"category":"salat","image":"ma-balla-salat.jpg","available":true},{"id":75,"name":"Tonno","ingredients":"Gemischte Blätter, Thunfisch, Tomate, Gurke, Ei","price":6.5,"category":"salat","image":"tonno-salat.jpg","available":true},{"id":76,"name":"Scampi","ingredients":"Gemischte Blätter, Garnelen, Tomate, Gurke, Zwiebel","price":7.5,"category":"salat","image":"scampi-salat.jpg","available":true},{"id":77,"name":"Chef","ingredients":"Gemischte Blätter, Hühnerbrust, Speck, Ei, Tomaten","price":6.5,"category":"salat","image":"chef-salat.jpg","available":true},{"id":78,"name":"Della Casa","ingredients":"Gemischte Blätter, Schinken, Käse, Tomate, Ei, Zwiebel","price":7,"category":"salat","image":"della-casa-salat.jpg","available":true},{"id":79,"name":"Guken Salat","ingredients":"Gemischte Blätter, Gurke, Tomate, Zwiebelringe","price":7.5,"category":"salat","image":"guken-salat.jpg","available":true},{"id":80,"name":"Gyros","ingredients":"Gemischte Blätter, Gyros, Tomate, Zwiebel, Feta","price":7.5,"category":"salat","image":"gyros-salat.jpg","available":true},{"id":81,"name":"Alla Panna","ingredients":"Pasta, Sahne, Butter, Parmesan","price":7,"category":"pasta","image":"alla-panna.jpg","available":true},{"id":82,"name":"Carbonara","ingredients":"Pasta, Speck, Ei, Sahne, Parmesan","price":7.5,"category":"pasta","image":"carbonara.jpg","available":true},{"id":83,"name":"Pastore","ingredients":"Pasta, Lamm, Tomate, Zwiebel, Parmesan","price":7.5,"category":"pasta","image":"pastore.jpg","available":true},{"id":84,"name":"Toscana","ingredients":"Pasta, Tomate, Knoblauch, Basilikum, Olivenöl","price":7.5,"category":"pasta","image":"toscana.jpg","available":true},{"id":124,"name":"Alla Milano","ingredients":"Pasta, Rindfleisch, Safran, Sahne, Parmesan","price":8,"category":"pasta","image":"alla-milano.jpg","available":true},{"id":125,"name":"Italia","ingredients":"Pasta, Hühnerbrust, Tomate, Basilikum, Mozzarella","price":8.3,"category":"pasta","image":"italia.jpg","available":true},{"id":126,"name":"Della Casa","ingredients":"Pasta, Schinken, Pilze, Sahne, Parmesan","price":8.9,"category":"pasta","image":"della-casa-pasta.jpg","available":true},{"id":127,"name":"Pesto und Put","ingredients":"Pasta, Pesto, Garnelen, Tomaten, Knoblauch","price":8.9,"category":"pasta","image":"pesto-und-put.jpg","available":true},{"id":128,"name":"Bolognese","ingredients":"Pasta, Rindfleisch, Tomate, Zwiebel, Knoblauch","price":7.5,"category":"pasta","image":"bolognese.jpg","available":true},{"id":129,"name":"Scampi","ingredients":"Pasta, Garnelen, Tomate, Knoblauch, Basilikum","price":9.5,"category":"pasta","image":"scampi-pasta.jpg","available":true},{"id":130,"name":"Wunsch","ingredients":"Pasta nach Wunsch mit Sauce nach Wunsch","price":10,"category":"pasta","image":"wunsch.jpg","available":true},{"id":131,"name":"Pasta Classico","ingredients":"Pasta mit klassischer Tomate-Knoblauch-Sauce","price":7.9,"category":"pasta","image":"pasta-classico.jpg","available":true},{"id":132,"name":"Käse überbacken","ingredients":"Zusatz: Käse überbacken für jede Pasta","price":1.5,"category":"pasta","image":"kaese-ueberbacken.jpg","available":true},{"id":133,"name":"Wiener Schnitzel","ingredients":"Kalbfleisch, Panade, Pommes, Salat, Zitrone","price":9,"category":"schnitzel","image":"wiener-schnitzel.jpg","available":true},{"id":134,"name":"Jägerschnitzel","ingredients":"Schweinefleisch, Pilzsauce, Pommes, Salat","price":10.5,"category":"schnitzel","image":"jagerschnitzel.jpg","available":true},{"id":135,"name":"Zigeunerschnitzel","ingredients":"Schweinefleisch, Paprika-Gemüsesauce, Pommes, Salat","price":10.5,"category":"schnitzel","image":"zigeunerschnitzel.jpg","available":true},{"id":136,"name":"Schnitzel Hollandise","ingredients":"Hähnchenbrust, Hollandaise-Sauce, Pommes, Salat","price":10.5,"category":"schnitzel","image":"schnitzel-hollandise.jpg","available":true},{"id":137,"name":"Käsebrötchen","ingredients":"Brötchen, Käse, Butter","price":5.5,"category":"snacks","image":"kaesebrotchen.jpg","available":true},{"id":138,"name":"Pizzabrötchen","ingredients":"Brötchen, Tomaten, Mozzarella, Oregano","price":6,"category":"snacks","image":"pizzabrotchen.jpg","available":true},{"id":139,"name":"American Piyyabrot","ingredients":"Amerikanisches Pita-Brot mit Fleisch und Gemüse","price":7.5,"category":"snacks","image":"american-piyyabrot.jpg","available":true},{"id":140,"name":"Knoblauch Brot","ingredients":"Brot mit Knoblauch, Butter, Petersilie","price":4,"category":"snacks","image":"knoblauch-brot.jpg","available":true},{"id":141,"name":"Käse Knoblauch Brot","ingredients":"Brot mit Knoblauch, Käse, Butter, Petersilie","price":5,"category":"snacks","image":"kaese-knoblauch-brot.jpg","available":true},{"id":142,"name":"Süßkartoffeln-Pommes","ingredients":"Süßkartoffeln, Salz, Öl","price":4.5,"category":"beilagen","image":"susskartoffeln-pommes.jpg","available":true},{"id":143,"name":"Chili Cheese Pommes","ingredients":"Pommes, Käse, Chili-Sauce","price":5,"category":"beilagen","image":"chili-cheese-pommes.jpg","available":true},{"id":144,"name":"Pommes","ingredients":"Kartoffeln, Salz, Öl","price":3,"category":"beilagen","image":"pommes.jpg","available":true},{"id":145,"name":"Country Fries","ingredients":"Kartoffeln mit Schale, Salz, Öl","price":4,"category":"beilagen","image":"country-fries.jpg","available":true},{"id":146,"name":"Twister","ingredients":"Spiralförmige Kartoffelstäbchen, Salz, Öl","price":4,"category":"beilagen","image":"twister.jpg","available":true},{"id":147,"name":"Chili Pommes","ingredients":"Pommes, Chili-Sauce, Zwiebeln","price":5,"category":"beilagen","image":"chili-pommes.jpg","available":true},{"id":148,"name":"Kroketten","ingredients":"Kartoffel-Kroketten, frittiert","price":5,"category":"beilagen","image":"kroketten.jpg","available":true},{"id":149,"name":"Gegrillte Champignons","ingredients":"Champignons, gegrilltes Gemüse, Öl","price":4.5,"category":"beilagen","image":"gegrillte-champignons.jpg","available":true},{"id":150,"name":"Gegrilltes Gemüse","ingredients":"Verschiedenes Gemüse, gegrillte Zucchini, Paprika","price":5,"category":"beilagen","image":"gegrilltes-gemuse.jpg","available":true},{"id":151,"name":"BBQ Pommes","ingredients":"Pommes, BBQ-Sauce","price":5,"category":"beilagen","image":"bbq-pommes.jpg","available":true},{"id":152,"name":"BBQ Twister","ingredients":"Twister, BBQ-Sauce","price":5,"category":"beilagen","image":"bbq-twister.jpg","available":true},{"id":153,"name":"Chili Twister","ingredients":"Twister, Chili-Sauce","price":5,"category":"beilagen","image":"chili-twister.jpg","available":true},{"id":154,"name":"Salami","ingredients":"Salami, Tortilla","category":"snackrolls","image":"salami-roll.jpg","sizes":[{"label":"6 Stück","price":6},{"label":"12 Stück","price":10.5}],"available":true},{"id":155,"name":"Schinken","ingredients":"Schinken, Tortilla","category":"snackrolls","image":"schinken-roll.jpg","sizes":[{"label":"6 Stück","price":6},{"label":"12 Stück","price":10.5}],"available":true},{"id":156,"name":"Thunfisch","ingredients":"Thunfisch, Tortilla","category":"snackrolls","image":"thunfisch-roll.jpg","sizes":[{"label":"6 Stück","price":6.5},{"label":"12 Stück","price":11}],"available":true},{"id":157,"name":"Hähnchen","ingredients":"Hähnchenbrust, Tortilla","category":"snackrolls","image":"hahnchen-roll.jpg","sizes":[{"label":"6 Stück","price":6},{"label":"12 Stück","price":10.5}],"available":true},{"id":158,"name":"Puter","ingredients":"Putenfleisch, Tortilla","category":"snackrolls","image":"puter-roll.jpg","sizes":[{"label":"6 Stück","price":6},{"label":"12 Stück","price":10.5}],"available":true},{"id":159,"name":"Hot Chicken","ingredients":"Hähnchenbrust, Chili, Tortilla","category":"snackrolls","image":"hot-chicken-roll.jpg","sizes":[{"label":"6 Stück","price":6.5},{"label":"12 Stück","price":11}],"available":true},{"id":160,"name":"Hawaii Roll","ingredients":"Hähnchen, Ananas, Tortilla","price":6,"category":"snackrolls","image":"hawaii-roll.jpg","available":true},{"id":161,"name":"Überraschung","ingredients":"Überraschungsmischung, Tortilla","price":19,"category":"snackrolls","image":"uberaschung-roll.jpg","available":true},{"id":162,"name":"Feuerring","ingredients":"Rindfleisch, Chili, scharfe Sauce, Tortilla","price":6.8,"category":"snackrolls","image":"feuerring.jpg","available":true},{"id":163,"name":"Käse Ring+dip","ingredients":"Käse, Dip-Sauce, Tortilla","price":6,"category":"snackrolls","image":"kaese-ring-dip.jpg","available":true},{"id":164,"name":"Cola 1Liter","ingredients":"Kohlensäurehaltiges Erfrischungsgetränk","price":3,"category":"getranke","image":"cola-1l.jpg","available":true},{"id":165,"name":"Cola 0.33L","ingredients":"Kohlensäurehaltiges Erfrischungsgetränk","price":2.5,"category":"getranke","image":"cola-033l.jpg","available":true},{"id":166,"name":"Redbull","ingredients":"Energy Drink","price":2.5,"category":"getranke","image":"redbull.jpg","available":true},{"id":167,"name":"Durstlöscher","ingredients":"Fruchtsaftgetränk","price":2,"category":"getranke","image":"durstloscher.jpg","available":true},{"id":168,"name":"Fanta (0.33l)","ingredients":"Kohlensäurehaltiges Fruchtgetränk","price":2.5,"category":"getranke","image":"fanta-033l.jpg","available":true},{"id":169,"name":"Wasser (0.5l)","ingredients":"Mineralwasser","price":2,"category":"getranke","image":"wasser-05l.jpg","available":true},{"id":170,"name":"A1 Supper Familienangebot","ingredients":"Großes Familienangebot mit Pizzen und Beilagen","price":26.9,"category":"angebote","image":"a1-supper-familienangebot.jpg","available":true},{"id":171,"name":"A2 Pizzblech","ingredients":"Pizza Blech mit verschiedenen Sorten","price":27.9,"category":"angebote","image":"a2-pizzblech.jpg","available":true},{"id":172,"name":"A3 3* Pizza","ingredients":"Drei verschiedene Pizzen","price":22.9,"category":"angebote","image":"a3-3-pizza.jpg","available":true},{"id":173,"name":"Chicken Nuggets","ingredients":"Knusprige Hähnchen-Nuggets","category":"fingerfood","image":"chicken-nuggets.jpg","sizes":[{"label":"6 Stk.","price":6.5},{"label":"12 Stk.","price":8.5}],"available":true},{"id":174,"name":"Chicken Wings","ingredients":"Würzige Hähnchen-Flügel","category":"fingerfood","image":"chicken-wings.jpg","sizes":[{"label":"6 Stk.","price":7},{"label":"12 Stk.","price":10}],"available":true},{"id":175,"name":"Crispy Chicken Fingers","ingredients":"Knusprige Hähnchen-Finger","category":"fingerfood","image":"crispy-chicken-fingers.jpg","sizes":[{"label":"6 Stk.","price":7.5},{"label":"12 Stk.","price":10}],"available":true},{"id":176,"name":"Chili Cheese Nuggets","ingredients":"Hähnchen-Nuggets mit Chili und Käse","category":"fingerfood","image":"chili-cheese-nuggets.jpg","sizes":[{"label":"6 Stk.","price":6.5},{"label":"12 Stk.","price":8.5}],"available":true},{"id":177,"name":"Mozzarella Sticks","ingredients":"Frittierte Mozzarella-Stäbchen","category":"fingerfood","image":"mozzarella-sticks.jpg","sizes":[{"label":"6 Stk.","price":6.5},{"label":"12 Stk.","price":8.5}],"available":true},{"id":178,"name":"Mix-Box","ingredients":"Große Fingerfood Mischbox","price":17.5,"category":"fingerfood","image":"michbox.jpg","available":true},{"id":179,"name":"Curry Wurst","ingredients":"Würstchen mit Curry-Sauce","price":7.9,"category":"fingerfood","image":"curry-wurst.jpg","available":true},{"id":180,"name":"Kania Ketchup","ingredients":"Klassischer Tomaten-Ketchup","price":0.8,"category":"sauces","image":"kania-ketchup.jpg","available":true},{"id":181,"name":"Mayonnaise","ingredients":"Cremige Mayonnaise","price":0.8,"category":"sauces","image":"mayonnaise.jpg","available":true},{"id":182,"name":"American Sauce","ingredients":"Würzige amerikanische Sauce","price":1.5,"category":"sauces","image":"american-sauce.jpg","available":true},{"id":183,"name":"Knoblauch Sauce","ingredients":"Aromatische Knoblauch-Sauce","price":1.5,"category":"sauces","image":"knoblauch-sauce.jpg","available":true}]`);

const KAESE_RAND_PRICES = {
  0: 2.00,
  1: 2.50,
  2: 4.00,
  3: 4.90
};

const SIZE_SURCHARGE = 0.30;

const FIXED_PRICE_ITEMS = [27, 28, 29, 30, 31];

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  try { await initPizzaDB(); } catch (e) { console.warn('DB init failed:', e); }
  try { await loadProducts(); } catch (e) { console.error('Products load failed:', e); }
  try { await loadToppings(); } catch (e) { console.warn('Toppings load failed:', e); }
  loadCartFromStorage();
  updateCartCount();
  setupNavbarScroll();
  setupCategoryButtons();
  setupAdminAccess();
  setupMobileMenu();
  setupLogoClickListener();
});

// Setup mobile menu toggle
function setupMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

// Setup category buttons
function setupCategoryButtons() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const pizzaSearchContainer = document.getElementById('pizzaSearchContainer');
  const pizzaSearchInput = document.getElementById('pizzaSearchInput');

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Get category and filter products
      const category = button.dataset.category;
      
      // Show/hide pizza search based on category
      if (category === 'pizza') {
        pizzaSearchContainer.style.display = 'flex';
        // Setup search listener
        setupPizzaSearch();
      } else {
        pizzaSearchContainer.style.display = 'flex';
        // Setup search listener for all categories
        setupPizzaSearch();
      }
      
      filterProducts(category);
    });
  });
}

// Setup pizza search functionality
function setupPizzaSearch() {
  const pizzaSearchInput = document.getElementById('pizzaSearchInput');
  
  pizzaSearchInput.removeEventListener('input', handlePizzaSearch);
  pizzaSearchInput.addEventListener('input', handlePizzaSearch);
}

// Handle pizza search input
function handlePizzaSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  if (searchTerm.trim() === '') {
    filterProducts('pizza');
  } else {
    searchPizzas(searchTerm);
  }
}

// Search all products
function searchPizzas(searchTerm) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  const filteredProducts = products.filter(product => {
    const name = product.name.toLowerCase();
    const ingredients = (product.ingredients || '').toLowerCase();
    return name.includes(searchTerm) || ingredients.includes(searchTerm);
  });

  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
        <p style="font-size: 1.2rem; color: var(--text-dark);">
          Keine Gerichte für "${searchTerm}" gefunden.
        </p>
      </div>
    `;
    return;
  }

  filteredProducts.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.1}s`;

    let priceHtml = '';
    if (product.sizes && product.sizes.length > 0) {
      const defaultPrice = product.sizes[0].price;
      priceHtml = `
        <div class="product-size-selector">
          <label>Größe:</label>
          <select class="size-input" onchange="updateProductPrice(this, ${product.id})">
            ${product.sizes.map((size, idx) => `
              <option value="${idx}">
                ${labelToDim(size.label)} - €${size.price.toFixed(2)}
              </option>
            `).join('')}
          </select>
          <p class="product-price" data-product-id="${product.id}">€${defaultPrice.toFixed(2)}</p>
        </div>
      `;
    } else {
      priceHtml = `<p class="product-price">€${product.price.toFixed(2)}</p>`;
    }

    const isAvailable = product.available !== false;
    const outOfStockOverlay = !isAvailable ? `
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); border-radius: 10px; display: flex; align-items: center; justify-content: center; z-index: 10;">
        <div style="background: rgba(255, 255, 255, 0.95); padding: 1.5rem; border-radius: 8px; text-align: center;">
          <p style="font-size: 2rem; margin: 0;">⛔</p>
          <p style="margin: 0.5rem 0 0 0; font-weight: bold; color: #e74c3c;">Nicht Verfügbar</p>
        </div>
      </div>
    ` : '';

    if (!isAvailable) {
      card.style.position = 'relative';
      card.style.opacity = '0.7';
    }

    card.innerHTML = `
      <div class="product-info">
        <div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-ingredients">${product.ingredients}</p>
          ${priceHtml}
        </div>
        <div class="product-controls">
          <div class="quantity-selector">
            <button class="qty-btn" onclick="decreaseQty(this)" ${!isAvailable ? 'disabled' : ''}>−</button>
            <input type="text" class="qty-input" value="1" readonly onkeypress="return false" onpaste="return false" lang="en" ${!isAvailable ? 'disabled' : ''}>
            <button class="qty-btn" onclick="increaseQty(this)" ${!isAvailable ? 'disabled' : ''}>+</button>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})" ${!isAvailable ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
              ${isAvailable ? 'In den Wagen' : '⛔ Nicht Verfügbar'}
            </button>
          </div>
        </div>
      </div>
      ${outOfStockOverlay}
    `;
    
    grid.appendChild(card);
  });
}

// Clear pizza search
function labelToDim(label) {
  if (label === '32cm') return '45*32';
  if (label === '60cm') return '40*60';
  return label;
}

function clearPizzaSearch() {
  document.getElementById('pizzaSearchInput').value = '';
  filterProducts('pizza');
}

// Filter products by category
function filterProducts(category) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  // Filter products based on category
  let filteredProducts = products.filter(product => {
    // If product doesn't have category property, assume it's pizza
    const productCategory = product.category || 'pizza';
    return productCategory === category;
  });

  // If no products found for this category, show placeholder
  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
        <p style="font-size: 1.2rem; color: var(--text-dark);">
          Aktuell keine Produkte in dieser Kategorie verfügbar.
        </p>
      </div>
    `;
    return;
  }

  // Display filtered products
  filteredProducts.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.1}s`;

    // Determine emoji based on category
    let emoji = '🍕'; // default pizza
    switch(category) {
      case 'burger': emoji = '🍔'; break;
      case 'croque': emoji = '🥪'; break;
      case 'salat': emoji = '🥗'; break;
      case 'pasta': emoji = '🍝'; break;
      case 'schnitzel': emoji = '🥩'; break;
      case 'snacks': emoji = '🍟'; break;
      case 'beilagen': emoji = '🍞'; break;
      case 'fingerfood': emoji = '🍗'; break;
      case 'angebote': emoji = '💥'; break;
      case 'getranke': emoji = '🥤'; break;
      case 'snackrolls': emoji = '🌮'; break;
      case 'sauces': emoji = '🍯'; break;
    }

    let priceHtml = '';
    if (product.sizes && product.sizes.length > 0) {
      // Product with sizes
      const defaultPrice = product.sizes[0].price;
      priceHtml = `
        <div class="product-size-selector">
          <label>Größe:</label>
          <select class="size-input" onchange="updateProductPrice(this, ${product.id})">
            ${product.sizes.map((size, idx) => `
              <option value="${idx}">
                ${labelToDim(size.label)} - €${size.price.toFixed(2)}
              </option>
            `).join('')}
          </select>
          <p class="product-price" data-product-id="${product.id}">€${defaultPrice.toFixed(2)}</p>
        </div>
      `;
    } else {
      // Product with single price
      priceHtml = `<p class="product-price">€${product.price.toFixed(2)}</p>`;
    }

    const isAvailable = product.available !== false;
    const outOfStockOverlay = !isAvailable ? `
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); border-radius: 10px; display: flex; align-items: center; justify-content: center; z-index: 10;">
        <div style="background: rgba(255, 255, 255, 0.95); padding: 1.5rem; border-radius: 8px; text-align: center;">
          <p style="font-size: 2rem; margin: 0;">⛔</p>
          <p style="margin: 0.5rem 0 0 0; font-weight: bold; color: #e74c3c;">Nicht Verfügbar</p>
        </div>
      </div>
    ` : '';

    if (!isAvailable) {
      card.style.position = 'relative';
      card.style.opacity = '0.7';
    }

    card.innerHTML = `
      <div class="product-info">
        <div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-ingredients">${product.ingredients}</p>
          ${priceHtml}
        </div>
        <div class="product-controls">
          <div class="quantity-selector">
            <button class="qty-btn" onclick="decreaseQty(this)" ${!isAvailable ? 'disabled' : ''}>−</button>
            <input type="text" class="qty-input" value="1" readonly onkeypress="return false" onpaste="return false" lang="en" ${!isAvailable ? 'disabled' : ''}>
            <button class="qty-btn" onclick="increaseQty(this)" ${!isAvailable ? 'disabled' : ''}>+</button>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})" ${!isAvailable ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
              ${isAvailable ? 'In den Wagen' : '⛔ Nicht Verfügbar'}
            </button>
          </div>
        </div>
      </div>
      ${outOfStockOverlay}
    `;

    grid.appendChild(card);
  });
}

// Navbar scroll effect
function setupNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Load products from API
async function loadProducts() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const response = await fetch(`${API_URL}/products`, { signal: controller.signal });
    clearTimeout(timeout);
    if (!response.ok) throw new Error('API Error');
    products = await response.json();
    displayProducts();
  } catch (error) {
    console.warn('API nicht verfügbar, verwende lokale Produkte:', error);
    products = FALLBACK_PRODUCTS;
    
    try {
      const snapshot = await firebase.database().ref('productsState').once('value');
      const saved = snapshot.val();
      if (saved) {
        products.forEach(p => {
          if (saved[p.id] !== undefined) p.available = saved[p.id].available;
        });
      }
    } catch (e) {
      console.warn('Firebase productsState nicht verfügbar');
    }
    
    displayProducts();
  }
}

// Load toppings from API
async function loadToppings() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const response = await fetch(`${API_URL}/toppings`, { signal: controller.signal });
    clearTimeout(timeout);
    toppings = await response.json();
    console.log('✓ Zutaten geladen:', toppings.length, 'Zutaten');
  } catch (error) {
    console.error('Fehler beim Laden der Zutaten:', error);
    // Fallback toppings if API fails
    toppings = [
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
  }
}

// Display products
function displayProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Determine emoji based on category
    const productCategory = product.category || 'pizza';
    let emoji = '🍕'; // default pizza
    switch(productCategory) {
      case 'burger': emoji = '🍔'; break;
      case 'croque': emoji = '🥪'; break;
      case 'salat': emoji = '🥗'; break;
      case 'pasta': emoji = '🍝'; break;
      case 'schnitzel': emoji = '🥩'; break;
      case 'snacks': emoji = '🍟'; break;
      case 'beilagen': emoji = '🍞'; break;
      case 'fingerfood': emoji = '🍗'; break;
      case 'angebote': emoji = '💥'; break;
      case 'getranke': emoji = '🥤'; break;
      case 'snackrolls': emoji = '🌮'; break;
      case 'sauces': emoji = '🍯'; break;
    }
    
    let priceHtml = '';
    if (product.sizes && product.sizes.length > 0) {
      // Product with sizes
      const defaultPrice = product.sizes[0].price;
      priceHtml = `
        <div class="product-size-selector">
          <label>Größe:</label>
          <select class="size-input" onchange="updateProductPrice(this, ${product.id})">
            ${product.sizes.map((size, idx) => `
              <option value="${idx}">
                ${labelToDim(size.label)} - €${size.price.toFixed(2)}
              </option>
            `).join('')}
          </select>
          <p class="product-price" data-product-id="${product.id}">€${defaultPrice.toFixed(2)}</p>
        </div>
      `;
    } else {
      // Product with single price
      priceHtml = `<p class="product-price">€${product.price.toFixed(2)}</p>`;
    }

    const isAvailable = product.available !== false;
    const outOfStockOverlay = !isAvailable ? `
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); border-radius: 10px; display: flex; align-items: center; justify-content: center; z-index: 10;">
        <div style="background: rgba(255, 255, 255, 0.95); padding: 1.5rem; border-radius: 8px; text-align: center;">
          <p style="font-size: 2rem; margin: 0;">⛔</p>
          <p style="margin: 0.5rem 0 0 0; font-weight: bold; color: #e74c3c;">Nicht Verfügbar</p>
        </div>
      </div>
    ` : '';

    if (!isAvailable) {
      card.style.position = 'relative';
      card.style.opacity = '0.7';
    }

    card.innerHTML = `
      <div class="product-info">
        <div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-ingredients">${product.ingredients}</p>
          ${priceHtml}
        </div>
        <div class="product-controls">
          <div class="quantity-selector">
            <button class="qty-btn" onclick="decreaseQty(this)" ${!isAvailable ? 'disabled' : ''}>−</button>
            <input type="text" class="qty-input" value="1" readonly onkeypress="return false" onpaste="return false" lang="en" ${!isAvailable ? 'disabled' : ''}>
            <button class="qty-btn" onclick="increaseQty(this)" ${!isAvailable ? 'disabled' : ''}>+</button>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})" ${!isAvailable ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
              ${isAvailable ? 'In den Wagen' : '⛔ Nicht Verfügbar'}
            </button>
          </div>
        </div>
      </div>
      ${outOfStockOverlay}
    `;
    
    grid.appendChild(card);
  });
  
  // Show pizza search container by default
  document.getElementById('pizzaSearchContainer').style.display = 'flex';
  setupPizzaSearch();
}

// Display placeholder products if API fails
function displayProductsPlaceholder() {
  const defaultProducts = [
    {
      id: 1,
      name: "Margherita",
      ingredients: "Tomate, Mozzarella, Basilikum",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 8.00},
        {label: "30cm", price: 11.00},
        {label: "45×32cm", price: 17.00},
        {label: "40×60cm", price: 24.50}
      ]
    },
    {
      id: 2,
      name: "Mozzarella",
      ingredients: "Tomate, Mozzarella",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 8.50},
        {label: "30cm", price: 11.50},
        {label: "45×32cm", price: 18.50},
        {label: "40×60cm", price: 25.50}
      ]
    },
    {
      id: 3,
      name: "Formaggi",
      ingredients: "Mozzarella, Parmesan, Gorgonzola, Ricotta",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 8.50},
        {label: "30cm", price: 11.50},
        {label: "45×32cm", price: 18.50},
        {label: "40×60cm", price: 25.50}
      ]
    },
    {
      id: 4,
      name: "Fungi",
      ingredients: "Tomate, Mozzarella, Pilze",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 8.20},
        {label: "30cm", price: 10.50},
        {label: "45×32cm", price: 19.00},
        {label: "40×60cm", price: 26.50}
      ]
    },
    {
      id: 5,
      name: "Salami",
      ingredients: "Tomate, Mozzarella, Salami",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.00},
        {label: "30cm", price: 11.50},
        {label: "45×32cm", price: 19.50},
        {label: "40×60cm", price: 27.00}
      ]
    },
    {
      id: 6,
      name: "Prosciutto",
      ingredients: "Tomate, Mozzarella, Prosciutto",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.00},
        {label: "30cm", price: 11.50},
        {label: "45×32cm", price: 19.50},
        {label: "40×60cm", price: 27.00}
      ]
    },
    {
      id: 7,
      name: "Salami Fungi",
      ingredients: "Tomate, Mozzarella, Salami, Pilze",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.50},
        {label: "30cm", price: 11.80},
        {label: "45×32cm", price: 20.00},
        {label: "40×60cm", price: 27.00}
      ]
    },
    {
      id: 8,
      name: "Prosciutto Fungi",
      ingredients: "Tomate, Mozzarella, Prosciutto, Pilze",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.50},
        {label: "30cm", price: 11.80},
        {label: "45×32cm", price: 20.00},
        {label: "40×60cm", price: 27.00}
      ]
    },
    {
      id: 9,
      name: "Prosciutto Salami",
      ingredients: "Tomate, Mozzarella, Prosciutto, Salami",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.50},
        {label: "30cm", price: 11.80},
        {label: "45×32cm", price: 20.00},
        {label: "40×60cm", price: 27.00}
      ]
    },
    {
      id: 10,
      name: "Milano",
      ingredients: "Tomate, Mozzarella, Salami, Schinken, Pilze",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.50},
        {label: "30cm", price: 11.80},
        {label: "45×32cm", price: 20.00},
        {label: "40×60cm", price: 27.00}
      ]
    },
    {
      id: 11,
      name: "Italia",
      ingredients: "Tomate, Mozzarella, Basilikum, Oliven",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.00},
        {label: "30cm", price: 11.50},
        {label: "45×32cm", price: 18.90},
        {label: "40×60cm", price: 26.50}
      ]
    },
    {
      id: 12,
      name: "Capri",
      ingredients: "Tomate, Mozzarella, Kapern, Oliven",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.00},
        {label: "30cm", price: 11.50},
        {label: "45×32cm", price: 18.90},
        {label: "40×60cm", price: 26.50}
      ]
    },
    {
      id: 13,
      name: "Santorini",
      ingredients: "Tomate, Mozzarella, Feta, Oliven, Zwiebeln",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.90},
        {label: "30cm", price: 12.50},
        {label: "45×32cm", price: 20.50},
        {label: "40×60cm", price: 27.50}
      ]
    },
    {
      id: 14,
      name: "Ilo",
      ingredients: "Tomate, Mozzarella, Thunfisch, Zwiebeln",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 10.10},
        {label: "30cm", price: 12.40},
        {label: "45×32cm", price: 20.50},
        {label: "40×60cm", price: 27.50}
      ]
    },
    {
      id: 15,
      name: "Hawaii",
      ingredients: "Tomate, Mozzarella, Schinken, Ananas",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.50},
        {label: "30cm", price: 11.80},
        {label: "45×32cm", price: 20.00},
        {label: "40×60cm", price: 27.50}
      ]
    },
    {
      id: 16,
      name: "Tonno",
      ingredients: "Tomate, Mozzarella, Thunfisch",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 10.00},
        {label: "30cm", price: 12.80},
        {label: "45×32cm", price: 21.90},
        {label: "40×60cm", price: 28.40}
      ]
    },
    {
      id: 17,
      name: "Madridi",
      ingredients: "Tomate, Mozzarella, Chorizo, Paprika",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 10.00},
        {label: "30cm", price: 12.80},
        {label: "45×32cm", price: 21.90},
        {label: "40×60cm", price: 28.40}
      ]
    },
    {
      id: 18,
      name: "Scampi",
      ingredients: "Tomate, Mozzarella, Scampi, Knoblauch",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 10.50},
        {label: "30cm", price: 13.30},
        {label: "45×32cm", price: 22.40},
        {label: "40×60cm", price: 28.90}
      ]
    },
    {
      id: 19,
      name: "Frutti de Mare",
      ingredients: "Tomate, Mozzarella, Meeresfrüchte",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 10.50},
        {label: "30cm", price: 13.30},
        {label: "45×32cm", price: 22.40},
        {label: "40×60cm", price: 28.90}
      ]
    },
    {
      id: 20,
      name: "Veggie",
      ingredients: "Tomate, Mozzarella, Paprika, Pilze, Zwiebeln, Oliven",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 10.00},
        {label: "30cm", price: 12.50},
        {label: "45×32cm", price: 19.70},
        {label: "40×60cm", price: 27.40}
      ]
    },
    {
      id: 21,
      name: "Palermo",
      ingredients: "Tomate, Mozzarella, Auberginen, Zucchini",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.50},
        {label: "30cm", price: 11.80},
        {label: "45×32cm", price: 20.00},
        {label: "40×60cm", price: 27.50}
      ]
    },
    {
      id: 22,
      name: "Hähnchenbrust",
      ingredients: "Tomate, Mozzarella, Hähnchenbrust",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 10.40},
        {label: "30cm", price: 12.60},
        {label: "45×32cm", price: 18.90},
        {label: "40×60cm", price: 28.40}
      ]
    },
    {
      id: 23,
      name: "Classico",
      ingredients: "Tomate, Mozzarella, Salami, Schinken",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.50},
        {label: "30cm", price: 11.80},
        {label: "45×32cm", price: 20.00},
        {label: "40×60cm", price: 27.50}
      ]
    },
    {
      id: 24,
      name: "Miami",
      ingredients: "Tomate, Mozzarella, Lachs, Kapern",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.80},
        {label: "30cm", price: 12.40},
        {label: "45×32cm", price: 20.50},
        {label: "40×60cm", price: 28.40}
      ]
    },
    {
      id: 25,
      name: "Island",
      ingredients: "Tomate, Mozzarella, Lachs, Dill",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 10.00},
        {label: "30cm", price: 12.50},
        {label: "45×32cm", price: 20.60},
        {label: "40×60cm", price: 28.80}
      ]
    },
    {
      id: 26,
      name: "Paris",
      ingredients: "Tomate, Mozzarella, Brie, Walnüsse",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 11.00},
        {label: "30cm", price: 13.80},
        {label: "45×32cm", price: 22.90},
        {label: "40×60cm", price: 29.40}
      ]
    },
    {
      id: 27,
      name: "Rucola",
      ingredients: "Tomate, Mozzarella, Rucola, Parmesan",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 10.50},
        {label: "30cm", price: 12.30},
        {label: "45×32cm", price: 19.90},
        {label: "40×60cm", price: 27.40}
      ]
    },
    {
      id: 28,
      name: "Bacon",
      ingredients: "Tomate, Mozzarella, Bacon",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 10.50},
        {label: "30cm", price: 13.30},
        {label: "45×32cm", price: 22.40},
        {label: "40×60cm", price: 28.90}
      ]
    },
    {
      id: 29,
      name: "Chicken Curry",
      ingredients: "Tomate, Mozzarella, Hähnchen, Curry",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.50},
        {label: "30cm", price: 11.80},
        {label: "45×32cm", price: 20.00},
        {label: "40×60cm", price: 27.50}
      ]
    },
    {
      id: 30,
      name: "Istanbul",
      ingredients: "Tomate, Mozzarella, Döner, Zwiebeln",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.50},
        {label: "30cm", price: 12.80},
        {label: "45×32cm", price: 18.40},
        {label: "40×60cm", price: 26.50}
      ]
    },
    {
      id: 31,
      name: "Hot Salami",
      ingredients: "Tomate, Mozzarella, scharfe Salami",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.50},
        {label: "30cm", price: 11.50},
        {label: "45×32cm", price: 19.00},
        {label: "40×60cm", price: 27.50}
      ]
    },

    {
      id: 33,
      name: "Wunsch",
      ingredients: "Tomate, Mozzarella, nach Wunsch",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 11.00},
        {label: "30cm", price: 14.00},
        {label: "45×32cm", price: 19.00},
        {label: "40×60cm", price: 28.50}
      ]
    },

    {
      id: 35,
      name: "Pizza Della Casa",
      ingredients: "Tomate, Mozzarella, Spezialität des Hauses",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.20},
        {label: "30cm", price: 12.40},
        {label: "45×32cm", price: 20.80},
        {label: "40×60cm", price: 28.90}
      ]
    },

    {
      id: 37,
      name: "Pizza Spezial",
      ingredients: "Tomate, Mozzarella, Spezial-Mix",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.80},
        {label: "30cm", price: 12.10},
        {label: "45×32cm", price: 20.50},
        {label: "40×60cm", price: 28.10}
      ]
    },
    {
      id: 38,
      name: "Pizza Hot Dog",
      ingredients: "Tomate, Mozzarella, Würstchen",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.40},
        {label: "30cm", price: 12.20},
        {label: "45×32cm", price: 20.90},
        {label: "40×60cm", price: 28.40}
      ]
    },
    {
      id: 39,
      name: "Pizza Sucuk",
      ingredients: "Tomate, Mozzarella, Sucuk",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.50},
        {label: "30cm", price: 12.50},
        {label: "45×32cm", price: 21.90},
        {label: "40×60cm", price: 29.00}
      ]
    },
    {
      id: 40,
      name: "Pizza Hot Beef",
      ingredients: "Tomate, Mozzarella, scharfes Rindfleisch",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 8.90},
        {label: "30cm", price: 12.50},
        {label: "45×32cm", price: 20.50},
        {label: "40×60cm", price: 28.40}
      ]
    },
    {
      id: 41,
      name: "Pizza Spinat",
      ingredients: "Tomate, Mozzarella, Spinat",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.50},
        {label: "30cm", price: 11.80},
        {label: "45×32cm", price: 20.90},
        {label: "40×60cm", price: 28.00}
      ]
    },
    {
      id: 42,
      name: "Pizza Luna",
      ingredients: "Tomate, Mozzarella, Mondschein-Spezialität",
      category: "pizza",
      sizes: [
        {label: "26cm", price: 9.70},
        {label: "30cm", price: 12.30},
        {label: "45×32cm", price: 21.80},
        {label: "40×60cm", price: 28.20}
      ]
    },
    {
      id: 46,
      name: "Hamburger",
      ingredients: "Rindfleisch-Patty, Salat, Tomate, Zwiebeln",
      category: "burger",
      price: 6.50
    },
    {
      id: 47,
      name: "Cheeseburger",
      ingredients: "Rindfleisch-Patty, Käse, Salat, Tomate, Zwiebeln",
      category: "burger",
      price: 7.00
    },
    {
      id: 48,
      name: "Chicken Burger",
      ingredients: "Hähnchen-Patty, Salat, Tomate, Mayo",
      category: "burger",
      price: 7.50
    },
    {
      id: 49,
      name: "Bacon Burger",
      ingredients: "Rindfleisch-Patty, Bacon, Käse, Salat, Tomate",
      category: "burger",
      price: 8.00
    },
    {
      id: 50,
      name: "Champignon Burger",
      ingredients: "Rindfleisch-Patty, Pilze, Käse, Salat, Tomate",
      category: "burger",
      price: 7.50
    },
    {
      id: 51,
      name: "Crispy Chicken Burger",
      ingredients: "Knuspriges Hähnchen, Salat, Tomate, Mayo",
      category: "burger",
      price: 8.00
    },
    {
      id: 52,
      name: "Italian Burger",
      ingredients: "Rindfleisch-Patty, Mozzarella, Basilikum, Tomate",
      category: "burger",
      price: 7.50
    },
    {
      id: 53,
      name: "Jumbo Cheeseburger",
      ingredients: "Doppeltes Rindfleisch-Patty, Käse, Salat, Tomate",
      category: "burger",
      price: 9.50
    },
    {
      id: 54,
      name: "Jumbo Hamburger",
      ingredients: "Doppeltes Rindfleisch-Patty, Salat, Tomate, Zwiebeln",
      category: "burger",
      price: 9.00
    },
    {
      id: 55,
      name: "Jumbo Chicken Burger",
      ingredients: "Doppeltes Hähnchen-Patty, Salat, Tomate, Mayo",
      category: "burger",
      price: 10.00
    },
    {
      id: 56,
      name: "Mexico Burger",
      ingredients: "Rindfleisch-Patty, Jalapeños, Käse, Salsa, Salat",
      category: "burger",
      price: 8.00
    },
    {
      id: 57,
      name: "Chili Cheeseburger",
      ingredients: "Rindfleisch-Patty, Chili, Käse, Salat, Tomate",
      category: "burger",
      price: 7.50
    },
    {
      id: 58,
      name: "Menü1: Hamburger",
      ingredients: "Hamburger + Pommes + Getränk",
      category: "burger",
      price: 10.00
    },
    {
      id: 59,
      name: "Menü2: Cheeseburger",
      ingredients: "Cheeseburger + Pommes + Getränk",
      category: "burger",
      price: 10.50
    },
    {
      id: 60,
      name: "Menü3: Jumbo Cheeseburger",
      ingredients: "Jumbo Cheeseburger + Pommes + Getränk",
      category: "burger",
      price: 12.00
    },
    {
      id: 61,
      name: "Menü4: Jumbo Chicken",
      ingredients: "Jumbo Chicken Burger + Pommes + Getränk",
      category: "burger",
      price: 12.50
    },
    {
      id: 62,
      name: "Croque Madame",
      ingredients: "Schinken, Käse, Spiegelei, Bechamelsauce",
      category: "croque",
      price: 7.50
    },
    {
      id: 63,
      name: "Croque Camembert",
      ingredients: "Schinken, Camembert, Bechamelsauce",
      category: "croque",
      price: 8.50
    },
    {
      id: 64,
      name: "Croque Schinken",
      ingredients: "Schinken, Käse, Bechamelsauce",
      category: "croque",
      price: 9.00
    },
    {
      id: 65,
      name: "Croque Salami Champignons",
      ingredients: "Salami, Pilze, Käse, Bechamelsauce",
      category: "croque",
      price: 9.00
    },
    {
      id: 66,
      name: "Croque Salami",
      ingredients: "Salami, Käse, Bechamelsauce",
      category: "croque",
      price: 9.00
    },
    {
      id: 67,
      name: "Croque Hawaii",
      ingredients: "Schinken, Ananas, Käse, Bechamelsauce",
      category: "croque",
      price: 8.50
    },
    {
      id: 68,
      name: "Croque Thunfisch",
      ingredients: "Thunfisch, Käse, Bechamelsauce",
      category: "croque",
      price: 10.00
    },
    {
      id: 69,
      name: "Croque Hähnchenbrust",
      ingredients: "Hähnchenbrust, Käse, Bechamelsauce",
      category: "croque",
      price: 9.00
    },
    {
      id: 70,
      name: "Croque Sucuk",
      ingredients: "Sucuk, Käse, Bechamelsauce",
      category: "croque",
      price: 8.50
    },
    {
      id: 71,
      name: "Gemischter Salat",
      ingredients: "Gemischte Salate, Tomaten, Gurken, Zwiebeln",
      category: "salat",
      price: 5.00
    },
    {
      id: 72,
      name: "Thunfisch Salat",
      ingredients: "Thunfisch, Salat, Tomaten, Zwiebeln, Oliven",
      category: "salat",
      price: 6.50
    },
    {
      id: 73,
      name: "Miista",
      ingredients: "Spezial-Salatmischung nach Art des Hauses",
      category: "salat",
      price: 5.00
    },
    {
      id: 74,
      name: "Ma Balla",
      ingredients: "Italienischer Salat mit Mozzarella",
      category: "salat",
      price: 5.90
    },
    {
      id: 75,
      name: "Tonno",
      ingredients: "Thunfisch, Salat, Kapern, Oliven",
      category: "salat",
      price: 6.50
    },
    {
      id: 76,
      name: "Scampi",
      ingredients: "Scampi, Salat, Tomaten, Knoblauch",
      category: "salat",
      price: 7.50
    },
    {
      id: 77,
      name: "Chef",
      ingredients: "Chef-Salat mit Schinken und Käse",
      category: "salat",
      price: 6.50
    },
    {
      id: 78,
      name: "Della Casa",
      ingredients: "Hausspezialität-Salat",
      category: "salat",
      price: 7.00
    },
    {
      id: 79,
      name: "Guken Salat",
      ingredients: "Gurken-Salat mit Kräutern",
      category: "salat",
      price: 7.50
    },
    {
      id: 80,
      name: "Gyros",
      ingredients: "Gyros, Salat, Tomaten, Zwiebeln, Tzatziki",
      category: "salat",
      price: 7.50
    },
    {
      id: 81,
      name: "Alla Panna",
      ingredients: "Pasta mit Sahnesauce",
      category: "pasta",
      price: 7.00
    },
    {
      id: 82,
      name: "Carbonara",
      ingredients: "Pasta mit Speck, Ei und Parmesan",
      category: "pasta",
      price: 7.50
    },
    {
      id: 83,
      name: "Pastore",
      ingredients: "Pasta mit Hirten-Sauce",
      category: "pasta",
      price: 7.50
    },
    {
      id: 84,
      name: "Toscana",
      ingredients: "Pasta nach toskanischer Art",
      category: "pasta",
      price: 7.50
    },
    {
      id: 85,
      name: "Alla Milano",
      ingredients: "Pasta nach Mailänder Art",
      category: "pasta",
      price: 8.00
    },
    {
      id: 86,
      name: "Italia",
      ingredients: "Pasta nach italienischer Art",
      category: "pasta",
      price: 8.30
    },
    {
      id: 87,
      name: "Della Casa",
      ingredients: "Pasta nach Art des Hauses",
      category: "pasta",
      price: 8.90
    },
    {
      id: 88,
      name: "Pesto und Put",
      ingredients: "Pasta mit Pesto und Pute",
      category: "pasta",
      price: 8.90
    },
    {
      id: 89,
      name: "Bolognese",
      ingredients: "Pasta mit Fleischsauce",
      category: "pasta",
      price: 7.50
    },
    {
      id: 90,
      name: "Scampi",
      ingredients: "Pasta mit Scampi und Knoblauch",
      category: "pasta",
      price: 9.50
    },
    {
      id: 91,
      name: "Wunsch",
      ingredients: "Pasta nach Wunsch",
      category: "pasta",
      price: 10.00
    },
    {
      id: 92,
      name: "Pasta Classico",
      ingredients: "Klassische Pasta",
      category: "pasta",
      price: 7.90
    },
    {
      id: 93,
      name: "Käse überbacken",
      ingredients: "Zusätzlicher Käse überbacken",
      category: "pasta",
      price: 1.50
    },
    {
      id: 94,
      name: "Wiener Schnitzel",
      ingredients: "Klassisches Wiener Schnitzel mit Pommes",
      category: "schnitzel",
      price: 9.00
    },
    {
      id: 95,
      name: "Jägerschnitzel",
      ingredients: "Schnitzel mit Pilzsauce und Pommes",
      category: "schnitzel",
      price: 10.50
    },
    {
      id: 96,
      name: "Zigeunerschnitzel",
      ingredients: "Schnitzel mit Zigeunersauce und Pommes",
      category: "schnitzel",
      price: 10.50
    },
    {
      id: 97,
      name: "Schnitzel Hollandise",
      ingredients: "Schnitzel mit Hollandaise-Sauce und Pommes",
      category: "schnitzel",
      price: 10.50
    },
    {
      id: 98,
      name: "Käsebrötchen",
      ingredients: "Brötchen mit Käse überbacken",
      category: "snacks",
      price: 5.50
    },
    {
      id: 99,
      name: "Pizzabrötchen",
      ingredients: "Brötchen mit Pizzabelag",
      category: "snacks",
      price: 6.00
    },
    {
      id: 100,
      name: "American Pizzabrot",
      ingredients: "Amerikanisches Pizzabrot",
      category: "snacks",
      price: 7.50
    },
    {
      id: 101,
      name: "Knoblauch Brot",
      ingredients: "Brot mit Knoblauchbutter",
      category: "snacks",
      price: 4.00
    },
    {
      id: 102,
      name: "Käse Knoblauch Brot",
      ingredients: "Knoblauchbrot mit Käse überbacken",
      category: "snacks",
      price: 5.00
    },
    {
      id: 103,
      name: "Süsskartoffeln-Pommes",
      ingredients: "Pommes aus Süßkartoffeln",
      category: "beilagen",
      price: 4.50
    },
    {
      id: 104,
      name: "Chili Cheese Pommes",
      ingredients: "Pommes mit Chili und Käse",
      category: "beilagen",
      price: 5.00
    },
    {
      id: 105,
      name: "Pommes",
      ingredients: "Klassische Pommes Frites",
      category: "beilagen",
      price: 3.00
    },
    {
      id: 106,
      name: "Country Fries",
      ingredients: "Pommes nach Länder-Art",
      category: "beilagen",
      price: 4.00
    },
    {
      id: 107,
      name: "Twister",
      ingredients: "Spiralförmige Pommes",
      category: "beilagen",
      price: 4.00
    },
    {
      id: 108,
      name: "Chili Pommes",
      ingredients: "Pommes mit Chili-Sauce",
      category: "beilagen",
      price: 5.00
    },
    {
      id: 109,
      name: "Kroketten",
      ingredients: "Knusprige Kartoffelkroketten",
      category: "beilagen",
      price: 5.00
    },
    {
      id: 110,
      name: "Gegrillte Champignons",
      ingredients: "Frisch gegrillte Pilze",
      category: "beilagen",
      price: 4.50
    },
    {
      id: 111,
      name: "Gegrilltes Gemüse",
      ingredients: "Gemischtes gegrilltes Gemüse",
      category: "beilagen",
      price: 5.00
    },
    {
      id: 112,
      name: "BBQ Pommes",
      ingredients: "Pommes mit BBQ-Sauce",
      category: "beilagen",
      price: 5.00
    },
    {
      id: 113,
      name: "BBQ Twister",
      ingredients: "Twister mit BBQ-Sauce",
      category: "beilagen",
      price: 5.00
    },
    {
      id: 114,
      name: "Chili Twister",
      ingredients: "Twister mit Chili-Sauce",
      category: "beilagen",
      price: 5.00
    },
    {
      id: 115,
      name: "Chicken Nuggets",
      ingredients: "Knusprige Hähnchen-Nuggets",
      category: "fingerfood",
      sizes: [
        {label: "6 Stück", price: 6.50},
        {label: "12 Stück", price: 8.50}
      ]
    },
    {
      id: 116,
      name: "Chicken Wings",
      ingredients: "Gewürzte Hähnchenflügel",
      category: "fingerfood",
      sizes: [
        {label: "6 Stück", price: 7.00},
        {label: "12 Stück", price: 10.00}
      ]
    },
    {
      id: 117,
      name: "Crispy Chicken Fingers",
      ingredients: "Knusprige Hähnchenstreifen",
      category: "fingerfood",
      sizes: [
        {label: "6 Stück", price: 7.50},
        {label: "12 Stück", price: 10.00}
      ]
    },
    {
      id: 118,
      name: "Chili Cheese Nuggets",
      ingredients: "Nuggets mit Chili und Käse",
      category: "fingerfood",
      sizes: [
        {label: "6 Stück", price: 6.50},
        {label: "12 Stück", price: 8.50}
      ]
    },
    {
      id: 119,
      name: "Mozzarella Sticks",
      ingredients: "Panierte Mozzarella-Sticks",
      category: "fingerfood",
      sizes: [
        {label: "6 Stück", price: 6.50},
        {label: "12 Stück", price: 8.50}
      ]
    },
    {
      id: 120,
      name: "Mix-Box",
      ingredients: "Gemischte Fingerfood-Box",
      category: "fingerfood",
      price: 17.50
    },
    {
      id: 121,
      name: "Curry Wurst",
      ingredients: "Bratwurst mit Currysauce",
      category: "fingerfood",
      price: 7.90
    },
    {
      id: 122,
      name: "A1 Super Familienangebot",
      ingredients: "Familienangebot für die ganze Familie",
      category: "angebote",
      price: 26.90
    },
    {
      id: 123,
      name: "A2 Pizzblech",
      ingredients: "Großes Pizzablech",
      category: "angebote",
      price: 27.90
    },
    {
      id: 124,
      name: "A3 3-Pizza",
      ingredients: "3 Pizzen nach Wahl",
      category: "angebote",
      price: 22.90
    },
    {
      id: 125,
      name: "Cola 1 Liter",
      ingredients: "Coca Cola 1 Liter Flasche",
      category: "getranke",
      price: 3.00
    },
    {
      id: 126,
      name: "Cola 0.33L",
      ingredients: "Coca Cola 0.33 Liter Dose",
      category: "getranke",
      price: 2.50
    },
    {
      id: 127,
      name: "Redbull",
      ingredients: "Red Bull Energy Drink",
      category: "getranke",
      price: 2.50
    },
    {
      id: 128,
      name: "Durstlöscher",
      ingredients: "Erfrischungsgetränk",
      category: "getranke",
      price: 2.00
    },
    {
      id: 129,
      name: "Fanta (0.33l)",
      ingredients: "Fanta Orange 0.33 Liter",
      category: "getranke",
      price: 2.50
    },
    {
      id: 130,
      name: "Wasser (0.5l)",
      ingredients: "Mineralwasser 0.5 Liter",
      category: "getranke",
      price: 2.00
    },
    {
      id: 131,
      name: "Salami Rolls",
      ingredients: "Snack Rolls mit Salami",
      category: "snackrolls",
      sizes: [
        {label: "6 Stück", price: 6.00},
        {label: "12 Stück", price: 10.50}
      ]
    },
    {
      id: 132,
      name: "Schinken Rolls",
      ingredients: "Snack Rolls mit Schinken",
      category: "snackrolls",
      sizes: [
        {label: "6 Stück", price: 6.00},
        {label: "12 Stück", price: 10.50}
      ]
    },
    {
      id: 133,
      name: "Thunfisch Rolls",
      ingredients: "Snack Rolls mit Thunfisch",
      category: "snackrolls",
      sizes: [
        {label: "6 Stück", price: 6.50},
        {label: "12 Stück", price: 11.00}
      ]
    },
    {
      id: 134,
      name: "Hähnchen Rolls",
      ingredients: "Snack Rolls mit Hähnchen",
      category: "snackrolls",
      sizes: [
        {label: "6 Stück", price: 6.00},
        {label: "12 Stück", price: 10.50}
      ]
    },
    {
      id: 135,
      name: "Puter Rolls",
      ingredients: "Snack Rolls mit Pute",
      category: "snackrolls",
      sizes: [
        {label: "6 Stück", price: 6.00},
        {label: "12 Stück", price: 10.50}
      ]
    },
    {
      id: 136,
      name: "Hot Chicken Rolls",
      ingredients: "Scharfe Hähnchen Snack Rolls",
      category: "snackrolls",
      sizes: [
        {label: "6 Stück", price: 6.50},
        {label: "12 Stück", price: 11.00}
      ]
    },
    {
      id: 137,
      name: "Hawaii Roll",
      ingredients: "Hawaii Snack Roll",
      category: "snackrolls",
      price: 6.00
    },
    {
      id: 138,
      name: "Überaschung",
      ingredients: "Überraschungs-Mix",
      category: "snackrolls",
      price: 19.00
    },
    {
      id: 139,
      name: "Feuerring",
      ingredients: "Scharfer Ring",
      category: "snackrolls",
      price: 6.80
    },
    {
      id: 140,
      name: "Käse Ring + Dip",
      ingredients: "Käsering mit Dip",
      category: "snackrolls",
      price: 6.00
    },
    {
      id: 141,
      name: "Kania Ketchup",
      ingredients: "Ketchup Sauce",
      category: "sauces",
      price: 0.80
    },
    {
      id: 142,
      name: "Mayonnaise",
      ingredients: "Mayonnaise Sauce",
      category: "sauces",
      price: 0.80
    },
    {
      id: 143,
      name: "American Sauce",
      ingredients: "Amerikanische Sauce",
      category: "sauces",
      price: 1.50
    },
    {
      id: 144,
      name: "Knoblauch Sauce",
      ingredients: "Knoblauchsauce",
      category: "sauces",
      price: 1.50
    }
  ];
  
  products = defaultProducts;
  displayProducts();
}

function arabicToEnglish(num) {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let result = num.toString();
  for (let i = 0; i < arabicNumbers.length; i++) {
    result = result.replace(new RegExp(arabicNumbers[i], 'g'), englishNumbers[i]);
  }
  return result;
}

function increaseQty(btn) {
  const input = btn.parentElement.querySelector('.qty-input');
  const currentValue = parseInt(arabicToEnglish(input.value));
  input.value = currentValue + 1;
}

function decreaseQty(btn) {
  const input = btn.parentElement.querySelector('.qty-input');
  const currentValue = parseInt(arabicToEnglish(input.value));
  if (currentValue > 1) {
    input.value = currentValue - 1;
  }
}

// Update product price when size is selected
function updateProductPrice(selectElement, productId) {
  const product = products.find(p => p.id === productId);
  if (!product || !product.sizes) return;

  const selectedIndex = parseInt(selectElement.value);
  const selectedSize = product.sizes[selectedIndex];
  
  // Update the price display
  const priceElement = selectElement.closest('.product-info').querySelector(`[data-product-id="${productId}"]`);
  if (priceElement) {
    priceElement.textContent = `€${selectedSize.price.toFixed(2)}`;
  }
}

// Helper function to check if item is pizza
function isPizza(itemName) {
  const baseName = itemName.split('(')[0].trim();
  const product = products.find(p => p.name === baseName && p.category === 'pizza');
  return product ? true : false;
}

// Open customize modal for pizza
function editCartItem(cartIndex) {
  if (!cart[cartIndex]) return;
  
  const cartItem = cart[cartIndex];
  const product = products.find(p => p.id === cartItem.id);
  if (!product) return;

  // Check if toppings are loaded
  if (!toppings || toppings.length === 0) {
    alert('Zutaten werden noch geladen. Bitte versuchen Sie es erneut.');
    return;
  }

  // Parse size index from cart item name (e.g., "Margherita (26cm)")
  let selectedSizeIndex = 0;
  if (product.sizes && cartItem.name.includes('(')) {
    const sizeMatch = cartItem.name.match(/\(([^)]+)\)/);
    if (sizeMatch) {
      const sizeLabel = sizeMatch[1];
      selectedSizeIndex = product.sizes.findIndex(s => s.label === sizeLabel);
      if (selectedSizeIndex === -1) selectedSizeIndex = 0;
    }
  }

  // Initialize customizing product with cart item data
  customizingProduct = {
    id: cartItem.id,
    cartIndex: cartIndex,
    removedToppings: cartItem.customization?.removedToppings || [],
    addedToppings: cartItem.customization?.addedToppings || [],
    selectedSizeIndex: selectedSizeIndex,
    isEditingCartItem: true
  };

  openCustomizeModalForEdit(product);
}

function openCustomizeModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Check if toppings are loaded
  if (!toppings || toppings.length === 0) {
    alert('Zutaten werden noch geladen. Bitte versuchen Sie es erneut.');
    return;
  }

  let selectedSizeIndex = 0;
  const customizeBtn = event?.target;
  if (customizeBtn) {
    const productCard = customizeBtn.closest('.product-card');
    if (productCard) {
      const sizeSelect = productCard.querySelector('.size-input');
      if (sizeSelect) {
        selectedSizeIndex = parseInt(sizeSelect.value);
      }
    }
  }

  customizingProduct = {
    id: productId,
    removedToppings: [],
    addedToppings: [],
    selectedSizeIndex: selectedSizeIndex,
    isEditingCartItem: false
  };

  const modal = document.getElementById('customizeModal');
  if (!modal) {
    createCustomizeModal();
  }

  const title = document.getElementById('customizeTitle');
  const currentToppings = document.getElementById('currentToppings');
  const availableToppingsList = document.getElementById('availableToppingsList');

  title.textContent = `${product.name} anpassen`;

  currentToppings.innerHTML = ``;

  let sizeSelectHtml = '';
  if (product.sizes && product.sizes.length > 0) {
    sizeSelectHtml = `
      <div style="margin-bottom: 0; padding: 0;">
      </div>
    `;
  }

  const toppingsHtml = toppings.map(topping => {
    let displayPrice = topping.price;
    if (topping.id === 25) {
      displayPrice = KAESE_RAND_PRICES[customizingProduct.selectedSizeIndex];
    } else if (!FIXED_PRICE_ITEMS.includes(topping.id)) {
      displayPrice = topping.price + (SIZE_SURCHARGE * customizingProduct.selectedSizeIndex);
    }
    const isAdded = customizingProduct.addedToppings.includes(topping.id);
    return `
      <button class="topping-btn ${isAdded ? 'active' : ''}" data-topping-id="${topping.id}" onclick="toggleAddTopping(${topping.id})" style="
        ${isAdded ? 'background: #27ae60; color: white; font-weight: bold;' : 'background: #ecf0f1; color: #333;'}
        border: 2px solid #27ae60;
      ">
        ${isAdded ? '✓ ' : '+ '}${topping.name} (€${displayPrice.toFixed(2)})
      </button>
    `;
  }).join('');

  availableToppingsList.innerHTML = `
    ${sizeSelectHtml}
    <div class="toppings-grid">
      ${toppingsHtml}
    </div>
  `;

  document.getElementById('customizeModal').style.display = 'block';
}

// Open customize modal for editing cart item
function openCustomizeModalForEdit(product) {
  const modal = document.getElementById('customizeModal');
  if (!modal) {
    createCustomizeModal();
  }

  const title = document.getElementById('customizeTitle');
  const currentToppings = document.getElementById('currentToppings');
  const availableToppingsList = document.getElementById('availableToppingsList');

  title.textContent = `${product.name} anpassen`;

  currentToppings.innerHTML = ``;

  let sizeSelectHtml = '';
  if (product.sizes && product.sizes.length > 0) {
    sizeSelectHtml = `
      <div style="margin-bottom: 0; padding: 0;">
      </div>
    `;
  }

  const toppingsHtml = toppings.map(topping => {
    let displayPrice = topping.price;
    if (topping.id === 25) {
      displayPrice = KAESE_RAND_PRICES[customizingProduct.selectedSizeIndex];
    } else if (!FIXED_PRICE_ITEMS.includes(topping.id)) {
      displayPrice = topping.price + (SIZE_SURCHARGE * customizingProduct.selectedSizeIndex);
    }
    const isAdded = customizingProduct.addedToppings.includes(topping.id);
    return `
      <button class="topping-btn ${isAdded ? 'active' : ''}" data-topping-id="${topping.id}" onclick="toggleAddTopping(${topping.id})" style="
        ${isAdded ? 'background: #27ae60; color: white; font-weight: bold;' : 'background: #ecf0f1; color: #333;'}
        border: 2px solid #27ae60;
      ">
        ${isAdded ? '✓ ' : '+ '}${topping.name} (€${displayPrice.toFixed(2)})
      </button>
    `;
  }).join('');

  availableToppingsList.innerHTML = `
    ${sizeSelectHtml}
    <div class="toppings-grid">
      ${toppingsHtml}
    </div>
  `;

  document.getElementById('customizeModal').style.display = 'block';
}

// Toggle topping to add
function toggleAddTopping(toppingId) {
  if (!customizingProduct) return;

  const index = customizingProduct.addedToppings.indexOf(toppingId);
  if (index > -1) {
    customizingProduct.addedToppings.splice(index, 1);
  } else {
    customizingProduct.addedToppings.push(toppingId);
  }

  // Update button styles for added toppings
  document.querySelectorAll('[data-topping-id]').forEach(btn => {
    const btnToppingId = parseInt(btn.getAttribute('data-topping-id'));
    const topping = toppings.find(t => t.id === btnToppingId);
    const isAdded = customizingProduct.addedToppings.includes(btnToppingId);
    
    if (isAdded) {
      btn.style.background = '#27ae60';
      btn.style.color = 'white';
      btn.style.fontWeight = 'bold';
      btn.textContent = `✓ ${topping.name} (€${topping.price.toFixed(2)})`;
    } else {
      btn.style.background = '#ecf0f1';
      btn.style.color = '#333';
      btn.style.fontWeight = 'normal';
      btn.textContent = `+ ${topping.name} (€${topping.price.toFixed(2)})`;
    }
  });
}

// Toggle topping to remove
function toggleRemoveTopping(ingredientIdx) {
  if (!customizingProduct) return;

  const index = customizingProduct.removedToppings.indexOf(ingredientIdx);
  if (index > -1) {
    customizingProduct.removedToppings.splice(index, 1);
  } else {
    customizingProduct.removedToppings.push(ingredientIdx);
  }

  // Update button styles for removed toppings
  document.querySelectorAll('[data-ingredient-idx]').forEach(btn => {
    const btnIdx = parseInt(btn.getAttribute('data-ingredient-idx'));
    const isRemoved = customizingProduct.removedToppings.includes(btnIdx);
    
    if (isRemoved) {
      btn.style.background = '#d32f2f';
      btn.style.color = 'white';
      btn.style.fontWeight = 'bold';
      btn.style.textDecoration = 'line-through';
      btn.style.opacity = '0.7';
    } else {
      btn.style.background = '#ffebee';
      btn.style.color = '#e74c3c';
      btn.style.fontWeight = 'normal';
      btn.style.textDecoration = 'none';
      btn.style.opacity = '1';
    }
  });
}

function updateCustomizationSize(selectElement) {
  if (!customizingProduct) return;

  customizingProduct.selectedSizeIndex = parseInt(selectElement.value);

  const product = products.find(p => p.id === customizingProduct.id);
  if (!product) return;

  document.querySelectorAll('[data-topping-id]').forEach(btn => {
    const toppingId = parseInt(btn.getAttribute('data-topping-id'));
    const topping = toppings.find(t => t.id === toppingId);
    
    if (topping) {
      let displayPrice = topping.price;
      if (topping.id === 25) {
        displayPrice = KAESE_RAND_PRICES[customizingProduct.selectedSizeIndex];
      } else if (!FIXED_PRICE_ITEMS.includes(topping.id)) {
        displayPrice = topping.price + (SIZE_SURCHARGE * customizingProduct.selectedSizeIndex);
      }
      
      const isAdded = customizingProduct.addedToppings.includes(toppingId);
      if (isAdded) {
        btn.textContent = `✓ ${topping.name} (€${displayPrice.toFixed(2)})`;
      } else {
        btn.textContent = `+ ${topping.name} (€${displayPrice.toFixed(2)})`;
      }
    }
  });
}

// Close customize modal
function closeCustomizeModal() {
  document.getElementById('customizeModal').style.display = 'none';
  customizingProduct = null;
}

// Create customize modal (HTML)
function createCustomizeModal() {
  if (document.getElementById('customizeModal')) return;

  const modal = document.createElement('div');
  modal.id = 'customizeModal';
  modal.className = 'modal';
  modal.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 3500;
    overflow-y: auto;
    padding: 2rem 0;
  `;

  modal.innerHTML = `
    <div class="modal-content" style="
      background: white;
      border-radius: 10px;
      padding: 2rem;
      max-width: 600px;
      width: 95%;
      margin: 0 auto;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      max-height: 90vh;
    ">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h3 id="customizeTitle" style="margin: 0; flex: 1;">Pizza anpassen</h3>
        <button onclick="closeCustomizeModal()" style="
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
        ">✕</button>
      </div>

      <div id="currentToppings" style="margin-bottom: 1.5rem; max-height: 150px; overflow-y: auto;"></div>

      <div id="availableToppingsList" style="margin-bottom: 1.5rem; flex: 1; overflow-y: auto;"></div>

      <div style="display: flex; gap: 1rem; margin-top: 2rem; flex-shrink: 0;">
        <button onclick="closeCustomizeModal()" style="
          flex: 1;
          padding: 0.75rem;
          border: 2px solid #d35400;
          border-radius: 5px;
          background: white;
          color: #d35400;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
        " onmouseover="this.style.background='#fff5f0'" onmouseout="this.style.background='white'">
          ✕ Abbrechen
        </button>
        <button onclick="confirmCustomization()" style="
          flex: 1;
          padding: 0.75rem;
          border: none;
          border-radius: 5px;
          background: #d35400;
          color: white;
          cursor: pointer;
          font-size: 1rem;
          font-weight: bold;
          transition: all 0.3s ease;
        " onmouseover="this.style.background='#a04000'" onmouseout="this.style.background='#d35400'">
          ✓ Bestätigen & In den Wagen
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeCustomizeModal();
    }
  });
}

// Confirm customization and add to cart
function confirmCustomization() {
  if (!customizingProduct) return;

  const product = products.find(p => p.id === customizingProduct.id);
  if (!product) return;

  const productControls = event.target.closest('.product-controls') || 
                          document.querySelector(`button[onclick*="addToCart(${product.id})"]`)?.closest('.product-controls');
  
  let quantity = 1;
  let price = product.price;
  let sizeLabel = '';
  let selectedSizeIndex = customizingProduct.selectedSizeIndex;

  // Get quantity from product card if visible
  if (productControls) {
    const qtyInput = productControls.querySelector('.qty-input');
    if (qtyInput) quantity = parseInt(qtyInput.value);

    // Get selected size if available
    if (product.sizes && product.sizes.length > 0) {
      const sizeSelect = productControls.closest('.product-card')?.querySelector('.size-input');
      if (sizeSelect) {
        selectedSizeIndex = parseInt(sizeSelect.value);
      }
    }
  }
  
  if (product.sizes && product.sizes.length > 0 && selectedSizeIndex >= 0) {
    const selectedSize = product.sizes[selectedSizeIndex];
    price = selectedSize.price;
    sizeLabel = ` (${labelToDim(selectedSize.label)})`;
  } else if (product.sizes && product.sizes.length > 0) {
    price = product.sizes[0].price;
    sizeLabel = ` (${product.sizes[0].label})`;
  }

  // Calculate additional price for toppings
  let additionalPrice = 0;
  const addedToppingNames = [];
  customizingProduct.addedToppings.forEach(toppingId => {
    const topping = toppings.find(t => t.id === toppingId);
    if (topping) {
      let toppingPrice = topping.price;
      if (topping.id === 25) {
        toppingPrice = KAESE_RAND_PRICES[selectedSizeIndex];
      } else if (!FIXED_PRICE_ITEMS.includes(topping.id)) {
        toppingPrice = topping.price + (SIZE_SURCHARGE * selectedSizeIndex);
      }
      additionalPrice += toppingPrice;
      addedToppingNames.push(topping.name);
    }
  });

  // Get removed ingredients names
  const ingredientsList = product.ingredients.split(',').map(ing => ing.trim());
  const removedToppingNames = customizingProduct.removedToppings.map(idx => ingredientsList[idx]);

  const finalPrice = price + additionalPrice;
  const customizationKey = `${customizingProduct.addedToppings.join(',')}_${customizingProduct.removedToppings.join(',')}`;
  const cartItemKey = `${product.id}_${sizeLabel}_custom_${customizationKey}`;
  
  if (customizingProduct.isEditingCartItem) {
    const cartIndex = customizingProduct.cartIndex;
    if (cart[cartIndex]) {
      cart[cartIndex].name = product.name + sizeLabel;
      cart[cartIndex].price = finalPrice;
      cart[cartIndex].customization = {
        addedToppings: customizingProduct.addedToppings,
        addedToppingNames: addedToppingNames,
        removedToppings: customizingProduct.removedToppings,
        removedToppingNames: removedToppingNames,
        addedPrice: additionalPrice
      };
    }
  } else {
    const existingItem = cart.find(item => item.cartKey === cartItemKey);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        cartKey: cartItemKey,
        name: product.name + sizeLabel,
        price: finalPrice,
        quantity: quantity,
        customization: {
          addedToppings: customizingProduct.addedToppings,
          addedToppingNames: addedToppingNames,
          removedToppings: customizingProduct.removedToppings,
          removedToppingNames: removedToppingNames,
          addedPrice: additionalPrice
        }
      });
    }
  }

  saveCartToStorage();
  updateCartCount();
  
  const wasEditingCartItem = customizingProduct.isEditingCartItem;
  closeCustomizeModal();
  
  let notificationText = `✓ ${product.name}`;
  if (addedToppingNames.length > 0 || removedToppingNames.length > 0) {
    notificationText += ' mit ';
    if (addedToppingNames.length > 0) {
      notificationText += `+${addedToppingNames.length} Zutaten`;
    }
    if (removedToppingNames.length > 0) {
      if (addedToppingNames.length > 0) {
        notificationText += ' & ';
      }
      notificationText += `-${removedToppingNames.length} Zutaten`;
    }
  }
  notificationText += wasEditingCartItem ? ' aktualisiert!' : ' hinzugefügt!';
  showNotification(notificationText);
  
  openCart();
}

function updateOpenCartDisplay() {
  const modal = document.getElementById('cartModal');
  if (modal && modal.style.display === 'block') {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      
      let customizationHtml = '';
      if (item.customization) {
        let customizationParts = [];
        
        if (item.customization.addedToppingNames && item.customization.addedToppingNames.length > 0) {
          customizationParts.push(`<span style="color: #27ae60;">➕ ${item.customization.addedToppingNames.join(', ')}</span>`);
        }
        
        if (item.customization.removedToppingNames && item.customization.removedToppingNames.length > 0) {
          customizationParts.push(`<span style="color: #e74c3c;">➖ ${item.customization.removedToppingNames.join(', ')}</span>`);
        }
        
        if (customizationParts.length > 0) {
          const priceText = item.customization.addedPrice > 0 ? ` (+€${item.customization.addedPrice.toFixed(2)})` : '';
          customizationHtml = `
            <p style="font-size: 0.85rem; margin: 0.5rem 0 0 0;">
              ${customizationParts.join(' | ')}${priceText}
            </p>
          `;
        }
      }
      
      cartItem.innerHTML = `
        <div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <p class="cart-item-name" style="margin: 0;">${item.name}</p>
            ${isPizza(item.name) ? `<button class="edit-note-btn" onclick="editCartItem(${index})" style="padding: 2px 5px; background: transparent; color: #8338ec; border: 1px solid #8338ec; border-radius: 3px; cursor: pointer; font-size: 0.75rem; font-weight: bold;">⚙️ Anpassen</button>` : ''}
            <button class="edit-note-btn" onclick="toggleNoteField(event)" style="padding: 2px 5px; background: transparent; color: #c67c4e; border: 1px solid #c67c4e; border-radius: 3px; cursor: pointer; font-size: 0.75rem; font-weight: bold;">✏️</button>
          </div>
          <div style="display: flex; align-items: center; gap: 10px; margin: 0.5rem 0;">
            <button class="qty-btn" onclick="decreaseCartQty(${index})">−</button>
            <span style="min-width: 30px; text-align: center; font-weight: bold;">Menge: ${item.quantity}</span>
            <button class="qty-btn" onclick="increaseCartQty(${index})">+</button>
          </div>
          ${customizationHtml}
          <textarea 
            placeholder="Notiz hinzufügen..." 
            style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-size: 0.85rem; resize: vertical; min-height: 60px; display: none; margin-top: 0.5rem;"
            class="note-field"
            onchange="updateItemNote(${index}, this.value)"
          >${item.note || ''}</textarea>
        </div>
        <p class="cart-item-price">€${itemTotal.toFixed(2)}</p>
      `;
      cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `€${total.toFixed(2)}`;
  }
}

// Add to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  if (product.available === false) {
    showNotification('⛔ Dieses Produkt ist nicht verfügbar!');
    return;
  }

  const productControls = event.target.closest('.product-controls');
  const qtyInput = productControls.querySelector('.qty-input');
  const quantity = parseInt(qtyInput.value);

  let price = product.price;
  let itemName = product.name;
  let sizeLabel = '';

  // Check if product has sizes
  if (product.sizes && product.sizes.length > 0) {
    const sizeSelect = productControls.closest('.product-card').querySelector('.size-input');
    if (sizeSelect) {
      const selectedIndex = parseInt(sizeSelect.value);
      const selectedSize = product.sizes[selectedIndex];
      price = selectedSize.price;
      sizeLabel = ` (${labelToDim(selectedSize.label)})`;
      itemName = product.name + sizeLabel;
    }
  }

  // Create unique key for cart item (product id + size if available)
  const cartItemKey = product.sizes ? `${productId}_${sizeLabel}` : productId.toString();
  const existingItem = cart.find(item => item.cartKey === cartItemKey || (item.id === productId && !product.sizes));
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      cartKey: cartItemKey,
      name: itemName,
      price: price,
      quantity: quantity
    });
  }

  saveCartToStorage();
  updateCartCount();
  
  // Reset quantity
  qtyInput.value = 1;
  
  // Show feedback
  showNotification('✓ Zur Wagen hinzugefügt!');
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--primary-red);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 5px;
    z-index: 3000;
    animation: slideInLeft 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2000);
}

// Update cart count
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = count;
}

// Save cart to localStorage
function saveCartToStorage() {
  localStorage.setItem('milanoPizzaCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromStorage() {
  const saved = localStorage.getItem('milanoPizzaCart');
  cart = saved ? JSON.parse(saved) : [];
}

// Open cart
document.addEventListener('click', (e) => {
  if (e.target.closest('.cart-link')) {
    openCart();
  }
});

function openCart() {
  const modal = document.getElementById('cartModal');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; padding: 2rem;">Ihr Wagen ist leer</p>';
  } else {
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      
      let customizationHtml = '';
      if (item.customization) {
        let customizationParts = [];
        
        if (item.customization.addedToppingNames && item.customization.addedToppingNames.length > 0) {
          customizationParts.push(`<span style="color: #27ae60;">➕ ${item.customization.addedToppingNames.join(', ')}</span>`);
        }
        
        if (item.customization.removedToppingNames && item.customization.removedToppingNames.length > 0) {
          customizationParts.push(`<span style="color: #e74c3c;">➖ ${item.customization.removedToppingNames.join(', ')}</span>`);
        }
        
        if (customizationParts.length > 0) {
          const priceText = item.customization.addedPrice > 0 ? ` (+€${item.customization.addedPrice.toFixed(2)})` : '';
          customizationHtml = `
            <p style="font-size: 0.85rem; margin: 0.5rem 0 0 0;">
              ${customizationParts.join(' | ')}${priceText}
            </p>
          `;
        }
      }
      
      cartItem.innerHTML = `
        <div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <p class="cart-item-name" style="margin: 0;">${item.name}</p>
            ${isPizza(item.name) ? `<button class="edit-note-btn" onclick="editCartItem(${index})" style="padding: 2px 5px; background: transparent; color: #8338ec; border: 1px solid #8338ec; border-radius: 3px; cursor: pointer; font-size: 0.75rem; font-weight: bold;">⚙️ Anpassen</button>` : ''}
            <button class="edit-note-btn" onclick="toggleNoteField(event)" style="padding: 2px 5px; background: transparent; color: #c67c4e; border: 1px solid #c67c4e; border-radius: 3px; cursor: pointer; font-size: 0.75rem; font-weight: bold;">✏️</button>
          </div>
          <div style="display: flex; align-items: center; gap: 10px; margin: 0.5rem 0;">
            <button class="qty-btn" onclick="decreaseCartQty(${index})">−</button>
            <span style="min-width: 30px; text-align: center; font-weight: bold;">Menge: ${item.quantity}</span>
            <button class="qty-btn" onclick="increaseCartQty(${index})">+</button>
          </div>
          ${customizationHtml}
          <textarea 
            placeholder="Notiz hinzufügen..." 
            style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-size: 0.85rem; resize: vertical; min-height: 60px; display: none; margin-top: 0.5rem;"
            class="note-field"
            onchange="updateItemNote(${index}, this.value)"
          >${item.note || ''}</textarea>
        </div>
        <p class="cart-item-price">€${itemTotal.toFixed(2)}</p>
      `;
      cartItems.appendChild(cartItem);
    });
  }

  updateCartTotal();
  modal.style.display = 'block';
}

// Update cart total
function updateCartTotal() {
  const cartItems = document.getElementById('cartItems');
  let total = 0;
  
  const cartElements = cartItems.querySelectorAll('.cart-item-price');
  cartElements.forEach(element => {
    const priceText = element.textContent.replace('€', '').trim();
    total += parseFloat(priceText) || 0;
  });
  
  document.getElementById('itemsTotal').textContent = `€${total.toFixed(2)}`;
  document.getElementById('cartTotal').textContent = `€${total.toFixed(2)}`;
}

// Close cart
function closeCart() {
  document.getElementById('cartModal').style.display = 'none';
}

// Update item note
function updateItemNote(index, note) {
  if (cart[index]) {
    cart[index].note = note;
    saveCartToStorage();
  }
}

// Toggle note field visibility
function toggleNoteField(event) {
  const cartItem = event.target.closest('.cart-item');
  const textarea = cartItem ? cartItem.querySelector('.note-field') : null;
  if (textarea) {
    if (textarea.style.display === 'none') {
      textarea.style.display = 'block';
      textarea.focus();
      textarea.style.borderColor = '#c67c4e';
      textarea.style.boxShadow = '0 0 5px rgba(198, 124, 78, 0.3)';
    } else {
      textarea.style.display = 'none';
    }
  }
}

// Increase cart item quantity
function increaseCartQty(index) {
  if (cart[index]) {
    cart[index].quantity += 1;
    saveCartToStorage();
    updateCartCount();
    openCart();
  }
}

// Decrease cart item quantity
function decreaseCartQty(index) {
  if (cart[index]) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
      saveCartToStorage();
      updateCartCount();
      openCart();
    } else {
      cart.splice(index, 1);
      saveCartToStorage();
      updateCartCount();
      openCart();
    }
  }
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCartToStorage();
  updateCartCount();
  openCart();
}

// Print cart
function printCart() {
  const now = new Date();
  const date = now.toLocaleDateString('de-DE');
  const time = now.toLocaleTimeString('de-DE');
  
  let printContent = `
    <html>
    <head>
      <title>Rechnung</title>
      <style>
        * {
          margin: 0;
          padding: 0;
        }
        @media print {
          body {
            margin: 0;
            padding: 0;
            width: 80mm;
          }
          @page {
            size: 80mm auto;
            margin: 0;
          }
        }
        body {
          font-family: 'Courier New', monospace;
          color: #000000;
          background: white;
          display: flex;
          justify-content: center;
          padding: 20px 0;
        }
        html {
          background: #f0f0f0;
          display: flex;
          justify-content: center;
        }
        .header {
          text-align: center;
          margin-bottom: 15px;
          border-bottom: 2px solid #8b5a2b;
          padding: 10px 0;
        }
        .header h1 {
          margin: 0;
          color: #8b5a2b;
          font-size: 18px;
          font-weight: bold;
        }
        .header p {
          margin: 3px 0;
          color: #000000;
          font-size: 10px;
        }
        .invoice-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 10px;
        }
        .invoice-details {
          margin-bottom: 10px;
        }
        .wrapper {
          width: 80mm;
          margin: 0 auto;
        }
        .items-container {
          margin-bottom: 10px;
          padding: 0 5px;
        }
        .item-row {
          border: 1px solid #ddd;
          margin-bottom: 10px;
          padding: 8px;
          border-radius: 3px;
          background-color: #f9f9f9;
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 6px;
          border-bottom: 1px solid #c67c4e;
          padding-bottom: 6px;
        }
        .item-name {
          font-weight: bold;
          font-size: 11px;
          color: #000000;
          flex: 1;
          word-break: break-word;
        }
        .item-qty {
          text-align: center;
          width: 40px;
          font-weight: bold;
          font-size: 10px;
        }
        .item-price {
          text-align: right;
          width: 50px;
          font-weight: bold;
          color: #d35400;
          font-size: 10px;
        }
        .item-details {
          font-size: 10px;
          margin-top: 6px;
        }
        .ingredients {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 4px;
        }
        .ingredient-tag {
          background-color: #e8f4f8;
          padding: 2px 5px;
          border-radius: 10px;
          font-size: 9px;
          color: #000000;
          border: 1px solid #c67c4e;
          white-space: nowrap;
        }
        .added {
          background-color: #e8f8e8;
          border-color: #000000;
          color: #000000;
        }
        .removed {
          background-color: #f8e8e8;
          border-color: #000000;
          color: #000000;
        }
        .note-section {
          margin-top: 6px;
          padding-top: 6px;
          border-top: 1px dashed #ddd;
          font-size: 9px;
          color: #000000;
          font-style: italic;
          word-break: break-word;
        }
        .summary {
          background-color: #f5f0e8;
          border: 2px solid #8b5a2b;
          padding: 10px;
          border-radius: 3px;
          margin: 10px 5px 0;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          font-size: 10px;
          color: #000000;
        }
        .summary-total {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-weight: bold;
          color: #000000;
          border-top: 2px solid #8b5a2b;
          padding-top: 8px;
        }
        .footer {
          text-align: center;
          margin-top: 15px;
          padding: 10px 5px 0;
          border-top: 1px solid #ddd;
          font-size: 9px;
          color: #000000;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>Milano Pizza</h1>
          <p>Rechnung / Bestellbestätigung</p>
          <p>Datum: ${date} | Uhrzeit: ${time}</p>
        </div>
  `;
  
  let total = 0;
  
  printContent += '<div class="items-container">';
  
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    let customizationHtml = '';
    if (item.customization) {
      if (item.customization.addedToppingNames && item.customization.addedToppingNames.length > 0) {
        customizationHtml += item.customization.addedToppingNames.map(t => 
          `<span class="ingredient-tag added">➕ ${t}</span>`
        ).join('');
      }
      if (item.customization.removedToppingNames && item.customization.removedToppingNames.length > 0) {
        customizationHtml += item.customization.removedToppingNames.map(t => 
          `<span class="ingredient-tag removed">➖ ${t}</span>`
        ).join('');
      }
    }
    
    let ingredientsHtml = '';
    if (item.ingredients) {
      const ingredients = item.ingredients.split(',').map(i => i.trim());
      ingredientsHtml = ingredients.map(ing => 
        `<span class="ingredient-tag">${ing}</span>`
      ).join('');
    }
    
    let noteHtml = '';
    if (item.note) {
      noteHtml = `<div class="note-section">📝 Notiz: ${item.note}</div>`;
    }
    
    printContent += `
      <div class="item-row">
        <div class="item-header">
          <div class="item-name">${item.name}</div>
          <div class="item-qty">x${item.quantity}</div>
          <div class="item-price">€${itemTotal.toFixed(2)}</div>
        </div>
        <div class="item-details">
          ${ingredientsHtml ? `<div class="ingredients">${ingredientsHtml}</div>` : ''}
          ${customizationHtml ? `<div class="ingredients">${customizationHtml}</div>` : ''}
        </div>
        ${noteHtml}
      </div>
    `;
  });
  
  printContent += '</div>';
  
  const deliveryFee = parseFloat(document.getElementById('deliveryFee').value) || 0;
  const grandTotal = total + deliveryFee;
  
  printContent += `
    <div class="summary">
      <div class="summary-row">
        <span>Artikel:</span>
        <span>€${total.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Lieferkosten:</span>
        <span>€${deliveryFee.toFixed(2)}</span>
      </div>
      <div class="summary-total">
        <span>GESAMTBETRAG:</span>
        <span>€${grandTotal.toFixed(2)}</span>
      </div>
    </div>
    
    <div class="footer">
      <p>Vielen Dank für Ihre Bestellung!</p>
      <p>Milano Pizza | Hauptstraße 8, 29574 Ebstorf</p>
      <p>Tel: +49(0)5822-9416789</p>
    </div>
      </div>
    </body>
    </html>
  `;
  
  const printWindow = window.open('', '', 'height=800,width=900');
  printWindow.document.write(printContent);
  printWindow.document.close();
  setTimeout(() => printWindow.print(), 250);
}

// Clear cart
function clearCart() {
  if (cart.length === 0) {
    showNotification('Wagen ist bereits leer');
    return;
  }
  if (confirm('Möchten Sie wirklich alle Artikel löschen?')) {
    cart = [];
    saveCartToStorage();
    updateCartTotal();
    updateCartCount();
    openCart();
    showNotification('Wagen wurde geleert');
  }
}

// Send order to admin
async function sendToAdmin() {
  if (cart.length === 0) {
    showNotification('Wagen ist leer');
    return;
  }

  const name = document.getElementById('cartCustomerName').value.trim();
  if (!name) {
    showNotification('Bitte geben Sie Ihren Namen ein');
    return;
  }

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const orderData = {
    id: Date.now(),
    items: cart.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      ingredients: item.ingredients || '',
      customization: item.customization || null,
      note: item.note || ''
    })),
    total: totalPrice,
    customerName: name,
    timestamp: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    status: 'Neu'
  };

  try {
    await firebase.database().ref('orders').push(orderData);

    showNotification('✓ Bestellung wurde gesendet!');
    cart = [];
    saveCartToStorage();
    updateCartCount();
    closeCart();
  } catch (error) {
    console.error('Error sending order:', error);
    showNotification('Fehler beim Senden der Bestellung');
  }
}

// Close checkout
function closeCheckout() {
  document.getElementById('checkoutModal').style.display = 'none';
}

// IndexedDB setup
let pizzaDb;
const DB_NAME = 'MilanoPizzaDB';
const STORE_NAME = 'orders';

async function initPizzaDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      pizzaDb = request.result;
      resolve(pizzaDb);
    };
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

// Submit order
async function submitOrder(event) {
  event.preventDefault();

  const customerName = document.getElementById('customerName').value;
  const customerPhone = document.getElementById('customerPhone').value;
  const customerAddress = document.getElementById('customerAddress').value;

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const orderId = Date.now();

  const orderData = {
    id: orderId,
    items: cart.map(item => ({
      ...item,
      note: item.note || ''
    })),
    customerName,
    customerPhone,
    customerAddress,
    totalPrice,
    status: 'Neu',
    createdAt: new Date().toISOString()
  };

  try {
    await firebase.database().ref('orders').push(orderData);
    closeCheckout();
    showOrderSuccess(orderData);
    cart = [];
    saveCartToStorage();
    updateCartCount();
  } catch (error) {
    console.error('Error sending order:', error);
    showNotification('Fehler beim Senden der Bestellung');
  }
}

// Show order success
function showOrderSuccess(order) {
  const modal = document.getElementById('successModal');
  const message = document.getElementById('successMessage');
  
  message.innerHTML = `
    <p><strong>Bestellnummer:</strong> #${order.id}</p>
    <p><strong>Gesamtbetrag:</strong> €${order.totalPrice.toFixed(2)}</p>
    <p><strong>Lieferadresse:</strong> ${order.customerAddress}</p>
    <p style="margin-top: 1rem;">
      Vielen Dank für Ihre Bestellung!
    </p>
  `;
  
  modal.style.display = 'block';
}

// Close success
function closeSuccess() {
  document.getElementById('successModal').style.display = 'none';
}

// Close modal on background click
window.onclick = function(event) {
  const cartModal = document.getElementById('cartModal');
  const checkoutModal = document.getElementById('checkoutModal');
  const successModal = document.getElementById('successModal');

  if (event.target === cartModal) {
    cartModal.style.display = 'none';
  }
  if (event.target === checkoutModal) {
    checkoutModal.style.display = 'none';
  }
  if (event.target === successModal) {
    successModal.style.display = 'none';
  }
};

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.review-bubble').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// Setup admin access
function setupAdminAccess() {
  const aboutLink = document.querySelector('a[href="#about"]');
  if (aboutLink) {
    aboutLink.addEventListener('click', (e) => {
      aboutClickCount++;
      if (aboutClickCount >= 8) {
        e.preventDefault();
        window.location.href = 'admin.html';
        aboutClickCount = 0;
      }
    });
  }
}

function setupLogoClickListener() {
  // Logo click functionality disabled
}

// Admin functions
const ADMIN_PASSWORD = 'jihad123';

function openAdminPanel() {
  document.getElementById('adminLoginModal').style.display = 'block';
  document.getElementById('adminPassword').focus();
  document.getElementById('adminPassword').value = '';
  document.getElementById('adminErrorMsg').style.display = 'none';
}

function closeAdminLogin() {
  document.getElementById('adminLoginModal').style.display = 'none';
  document.getElementById('adminPassword').value = '';
  document.getElementById('adminErrorMsg').style.display = 'none';
}

function closeAdminPanel() {
  document.getElementById('adminPanelModal').style.display = 'none';
  document.getElementById('adminPassword').value = '';
}

function openAdminSettings() {
  const modal = document.createElement('div');
  modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000;';
  modal.innerHTML = `
    <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); max-width: 400px; width: 90%; text-align: center;">
      <h3 style="margin-bottom: 1.5rem; color: #1a0f2e; font-size: 1.3rem;">⚙️ Admin Einstellungen</h3>
      <button onclick="
        this.parentElement.parentElement.style.display='none';
        this.parentElement.parentElement.remove();
        document.getElementById('adminPanelModal').style.display='none';
        window.location.hash = '#home';
        window.scrollTo(0, 0);
      " style="width: 100%; padding: 0.8rem; margin-bottom: 0.5rem; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: all 0.3s;" onmouseover="this.style.background='#c0392b';" onmouseout="this.style.background='#e74c3c';">🚪 Abmelden</button>
      <button onclick="this.parentElement.parentElement.style.display='none'; this.parentElement.parentElement.remove();" style="width: 100%; padding: 0.8rem; background: #95a5a6; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: all 0.3s;" onmouseover="this.style.background='#7f8c8d';" onmouseout="this.style.background='#95a5a6';">❌ Schließen</button>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

function handleAdminPasswordKeypress(event) {
  if (event.key === 'Enter') {
    verifyAdminPassword();
  }
}

function verifyAdminPassword() {
  const password = document.getElementById('adminPassword').value;
  const errorMsg = document.getElementById('adminErrorMsg');
  
  if (password === ADMIN_PASSWORD) {
    document.getElementById('adminLoginModal').style.display = 'none';
    document.getElementById('adminPanelModal').style.display = 'block';
    document.getElementById('adminPassword').value = '';
    errorMsg.style.display = 'none';
    loadAdminProducts();
  } else {
    errorMsg.style.display = 'block';
    document.getElementById('adminPassword').value = '';
    setTimeout(() => {
      errorMsg.style.display = 'none';
    }, 3000);
  }
}

async function loadAdminProducts() {
  try {
    let allProducts = [];
    
    // Try to fetch from API first
    if (products && products.length > 0) {
      allProducts = products;
    } else {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error('API Error');
      allProducts = await response.json();
    }
    
    if (allProducts.length === 0) {
      throw new Error('Keine Produkte verfügbar');
    }
    
    displayAdminProducts(allProducts);
  } catch (error) {
    console.error('Fehler beim Laden der Produkte:', error);
    const tbody = document.getElementById('adminProductsList');
    tbody.innerHTML = '<tr><td colspan="2" style="text-align: center; padding: 2rem; color: #e74c3c; border-bottom: 1px solid #eee;">❌ Fehler beim Laden der Produkte. Bitte versuchen Sie es später erneut.</td></tr>';
  }
}

function displayAdminProducts(allProducts, searchTerm = '') {
  const tbody = document.getElementById('adminProductsList');
  tbody.innerHTML = '';

  const filtered = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="2" style="text-align: center; padding: 2rem; color: #999; border-bottom: 1px solid #eee;">Keine Produkte gefunden</td></tr>';
    return;
  }

  filtered.forEach((product, idx) => {
    const row = document.createElement('tr');
    row.style.cssText = `border-bottom: 1px solid #eee; background-color: ${idx % 2 === 0 ? '#ffffff' : '#f9f9f9'}; transition: background-color 0.2s;`;
    row.onmouseover = () => row.style.backgroundColor = '#f0f0f0';
    row.onmouseout = () => row.style.backgroundColor = idx % 2 === 0 ? '#ffffff' : '#f9f9f9';
    
    const isAvailable = product.available !== false;
    const bgColor = isAvailable ? '#27ae60' : '#e74c3c';
    const statusText = isAvailable ? '✅ Verfügbar' : '❌ Nicht Verfügbar';
    
    row.innerHTML = `
      <td style="padding: 1rem; text-align: left; border: none; font-weight: 500; color: #1a0f2e;">${product.name}</td>
      <td style="padding: 1rem; text-align: center; border: none;">
        <button onclick="toggleAdminProductAvailability(${product.id}, ${!isAvailable})" 
                style="padding: 0.6rem 1.2rem; background: ${bgColor}; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 0.9rem; transition: all 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.2)';"
                onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)';">
          ${statusText}
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function toggleAdminProductAvailability(productId, available) {
  try {
    const product = products.find(p => p.id === productId);
    if (!product) throw new Error('Produkt nicht gefunden');

    product.available = available;
    localStorage.setItem('productsState', JSON.stringify(products));
    
    displayAdminProducts(products);
    
    const currentCategory = document.querySelector('.category-btn.active')?.dataset.category || 'pizza';
    filterProducts(currentCategory);

    fetch(`${API_URL}/products/${productId}/availability`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ available })
    }).catch(e => console.warn('API nicht verfügbar'));
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Produkts:', error);
    alert('Fehler beim Aktualisieren des Produkts');
  }
}

// Setup search for admin products
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const searchInput = document.getElementById('adminProductSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        if (products && products.length > 0) {
          displayAdminProducts(products, e.target.value);
        }
      });
    }
  }, 100);
});

// Close admin modals on background click
window.addEventListener('click', function(event) {
  const adminLoginModal = document.getElementById('adminLoginModal');
  const adminPanelModal = document.getElementById('adminPanelModal');

  if (event.target === adminLoginModal) {
    adminLoginModal.style.display = 'none';
  }
  if (event.target === adminPanelModal) {
    adminPanelModal.style.display = 'none';
  }
});

