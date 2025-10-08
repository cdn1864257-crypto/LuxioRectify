export interface CountryCities {
  code: string;
  en: string;
  fr: string;
  es: string;
  cities: {
    en: string;
    fr: string;
    es: string;
  }[];
}

export const countriesCities: CountryCities[] = [
  // Europe
  {
    code: "FR",
    en: "France",
    fr: "France",
    es: "Francia",
    cities: [
      { en: "Paris", fr: "Paris", es: "París" },
      { en: "Lyon", fr: "Lyon", es: "Lyon" },
      { en: "Marseille", fr: "Marseille", es: "Marsella" },
      { en: "Toulouse", fr: "Toulouse", es: "Toulouse" },
      { en: "Nice", fr: "Nice", es: "Niza" },
      { en: "Nantes", fr: "Nantes", es: "Nantes" },
      { en: "Strasbourg", fr: "Strasbourg", es: "Estrasburgo" },
      { en: "Montpellier", fr: "Montpellier", es: "Montpellier" },
      { en: "Bordeaux", fr: "Bordeaux", es: "Burdeos" },
      { en: "Lille", fr: "Lille", es: "Lille" }
    ]
  },
  {
    code: "ES",
    en: "Spain",
    fr: "Espagne",
    es: "España",
    cities: [
      { en: "Madrid", fr: "Madrid", es: "Madrid" },
      { en: "Barcelona", fr: "Barcelone", es: "Barcelona" },
      { en: "Valencia", fr: "Valence", es: "Valencia" },
      { en: "Seville", fr: "Séville", es: "Sevilla" },
      { en: "Zaragoza", fr: "Saragosse", es: "Zaragoza" },
      { en: "Málaga", fr: "Málaga", es: "Málaga" },
      { en: "Murcia", fr: "Murcie", es: "Murcia" },
      { en: "Palma", fr: "Palma", es: "Palma" },
      { en: "Las Palmas", fr: "Las Palmas", es: "Las Palmas" },
      { en: "Bilbao", fr: "Bilbao", es: "Bilbao" }
    ]
  },
  {
    code: "IT",
    en: "Italy",
    fr: "Italie",
    es: "Italia",
    cities: [
      { en: "Rome", fr: "Rome", es: "Roma" },
      { en: "Milan", fr: "Milan", es: "Milán" },
      { en: "Naples", fr: "Naples", es: "Nápoles" },
      { en: "Turin", fr: "Turin", es: "Turín" },
      { en: "Palermo", fr: "Palerme", es: "Palermo" },
      { en: "Genoa", fr: "Gênes", es: "Génova" },
      { en: "Bologna", fr: "Bologne", es: "Bolonia" },
      { en: "Florence", fr: "Florence", es: "Florencia" },
      { en: "Bari", fr: "Bari", es: "Bari" },
      { en: "Catania", fr: "Catane", es: "Catania" }
    ]
  },
  {
    code: "DE",
    en: "Germany",
    fr: "Allemagne",
    es: "Alemania",
    cities: [
      { en: "Berlin", fr: "Berlin", es: "Berlín" },
      { en: "Hamburg", fr: "Hambourg", es: "Hamburgo" },
      { en: "Munich", fr: "Munich", es: "Múnich" },
      { en: "Cologne", fr: "Cologne", es: "Colonia" },
      { en: "Frankfurt", fr: "Francfort", es: "Fráncfort" },
      { en: "Stuttgart", fr: "Stuttgart", es: "Stuttgart" },
      { en: "Düsseldorf", fr: "Düsseldorf", es: "Düsseldorf" },
      { en: "Dortmund", fr: "Dortmund", es: "Dortmund" },
      { en: "Essen", fr: "Essen", es: "Essen" },
      { en: "Leipzig", fr: "Leipzig", es: "Leipzig" }
    ]
  },
  {
    code: "GB",
    en: "United Kingdom",
    fr: "Royaume-Uni",
    es: "Reino Unido",
    cities: [
      { en: "London", fr: "Londres", es: "Londres" },
      { en: "Birmingham", fr: "Birmingham", es: "Birmingham" },
      { en: "Manchester", fr: "Manchester", es: "Manchester" },
      { en: "Glasgow", fr: "Glasgow", es: "Glasgow" },
      { en: "Liverpool", fr: "Liverpool", es: "Liverpool" },
      { en: "Edinburgh", fr: "Édimbourg", es: "Edimburgo" },
      { en: "Bristol", fr: "Bristol", es: "Bristol" },
      { en: "Leeds", fr: "Leeds", es: "Leeds" },
      { en: "Sheffield", fr: "Sheffield", es: "Sheffield" },
      { en: "Cardiff", fr: "Cardiff", es: "Cardiff" }
    ]
  },
  {
    code: "PL",
    en: "Poland",
    fr: "Pologne",
    es: "Polonia",
    cities: [
      { en: "Warsaw", fr: "Varsovie", es: "Varsovia" },
      { en: "Kraków", fr: "Cracovie", es: "Cracovia" },
      { en: "Łódź", fr: "Łódź", es: "Łódź" },
      { en: "Wrocław", fr: "Wrocław", es: "Wrocław" },
      { en: "Poznań", fr: "Poznań", es: "Poznań" },
      { en: "Gdańsk", fr: "Gdańsk", es: "Gdansk" },
      { en: "Szczecin", fr: "Szczecin", es: "Szczecin" },
      { en: "Bydgoszcz", fr: "Bydgoszcz", es: "Bydgoszcz" },
      { en: "Lublin", fr: "Lublin", es: "Lublin" },
      { en: "Katowice", fr: "Katowice", es: "Katowice" }
    ]
  },
  {
    code: "PT",
    en: "Portugal",
    fr: "Portugal",
    es: "Portugal",
    cities: [
      { en: "Lisbon", fr: "Lisbonne", es: "Lisboa" },
      { en: "Porto", fr: "Porto", es: "Oporto" },
      { en: "Amadora", fr: "Amadora", es: "Amadora" },
      { en: "Braga", fr: "Braga", es: "Braga" },
      { en: "Setúbal", fr: "Setúbal", es: "Setúbal" },
      { en: "Coimbra", fr: "Coimbra", es: "Coímbra" },
      { en: "Queluz", fr: "Queluz", es: "Queluz" },
      { en: "Funchal", fr: "Funchal", es: "Funchal" },
      { en: "Cacém", fr: "Cacém", es: "Cacém" },
      { en: "Vila Nova de Gaia", fr: "Vila Nova de Gaia", es: "Vila Nova de Gaia" }
    ]
  },
  {
    code: "NL",
    en: "Netherlands",
    fr: "Pays-Bas",
    es: "Países Bajos",
    cities: [
      { en: "Amsterdam", fr: "Amsterdam", es: "Ámsterdam" },
      { en: "Rotterdam", fr: "Rotterdam", es: "Rotterdam" },
      { en: "The Hague", fr: "La Haye", es: "La Haya" },
      { en: "Utrecht", fr: "Utrecht", es: "Utrecht" },
      { en: "Eindhoven", fr: "Eindhoven", es: "Eindhoven" },
      { en: "Tilburg", fr: "Tilburg", es: "Tilburg" },
      { en: "Groningen", fr: "Groningue", es: "Groninga" },
      { en: "Almere", fr: "Almere", es: "Almere" },
      { en: "Breda", fr: "Breda", es: "Breda" },
      { en: "Nijmegen", fr: "Nimègue", es: "Nimega" }
    ]
  },
  {
    code: "BE",
    en: "Belgium",
    fr: "Belgique",
    es: "Bélgica",
    cities: [
      { en: "Brussels", fr: "Bruxelles", es: "Bruselas" },
      { en: "Antwerp", fr: "Anvers", es: "Amberes" },
      { en: "Ghent", fr: "Gand", es: "Gante" },
      { en: "Charleroi", fr: "Charleroi", es: "Charleroi" },
      { en: "Liège", fr: "Liège", es: "Lieja" },
      { en: "Bruges", fr: "Bruges", es: "Brujas" },
      { en: "Namur", fr: "Namur", es: "Namur" },
      { en: "Leuven", fr: "Louvain", es: "Lovaina" },
      { en: "Mons", fr: "Mons", es: "Mons" },
      { en: "Mechelen", fr: "Malines", es: "Malinas" }
    ]
  },
  {
    code: "AT",
    en: "Austria",
    fr: "Autriche",
    es: "Austria",
    cities: [
      { en: "Vienna", fr: "Vienne", es: "Viena" },
      { en: "Graz", fr: "Graz", es: "Graz" },
      { en: "Linz", fr: "Linz", es: "Linz" },
      { en: "Salzburg", fr: "Salzbourg", es: "Salzburgo" },
      { en: "Innsbruck", fr: "Innsbruck", es: "Innsbruck" },
      { en: "Klagenfurt", fr: "Klagenfurt", es: "Klagenfurt" },
      { en: "Villach", fr: "Villach", es: "Villach" },
      { en: "Wels", fr: "Wels", es: "Wels" },
      { en: "Sankt Pölten", fr: "Sankt Pölten", es: "Sankt Pölten" },
      { en: "Dornbirn", fr: "Dornbirn", es: "Dornbirn" }
    ]
  },
  {
    code: "CH",
    en: "Switzerland",
    fr: "Suisse",
    es: "Suiza",
    cities: [
      { en: "Zurich", fr: "Zurich", es: "Zúrich" },
      { en: "Geneva", fr: "Genève", es: "Ginebra" },
      { en: "Basel", fr: "Bâle", es: "Basilea" },
      { en: "Lausanne", fr: "Lausanne", es: "Lausana" },
      { en: "Bern", fr: "Berne", es: "Berna" },
      { en: "Winterthur", fr: "Winterthour", es: "Winterthur" },
      { en: "Lucerne", fr: "Lucerne", es: "Lucerna" },
      { en: "St. Gallen", fr: "Saint-Gall", es: "San Galo" },
      { en: "Lugano", fr: "Lugano", es: "Lugano" },
      { en: "Biel/Bienne", fr: "Bienne", es: "Biel" }
    ]
  },
  {
    code: "SE",
    en: "Sweden",
    fr: "Suède",
    es: "Suecia",
    cities: [
      { en: "Stockholm", fr: "Stockholm", es: "Estocolmo" },
      { en: "Gothenburg", fr: "Göteborg", es: "Gotemburgo" },
      { en: "Malmö", fr: "Malmö", es: "Malmö" },
      { en: "Uppsala", fr: "Uppsala", es: "Uppsala" },
      { en: "Västerås", fr: "Västerås", es: "Västerås" },
      { en: "Örebro", fr: "Örebro", es: "Örebro" },
      { en: "Linköping", fr: "Linköping", es: "Linköping" },
      { en: "Helsingborg", fr: "Helsingborg", es: "Helsingborg" },
      { en: "Jönköping", fr: "Jönköping", es: "Jönköping" },
      { en: "Norrköping", fr: "Norrköping", es: "Norrköping" }
    ]
  },
  {
    code: "NO",
    en: "Norway",
    fr: "Norvège",
    es: "Noruega",
    cities: [
      { en: "Oslo", fr: "Oslo", es: "Oslo" },
      { en: "Bergen", fr: "Bergen", es: "Bergen" },
      { en: "Trondheim", fr: "Trondheim", es: "Trondheim" },
      { en: "Stavanger", fr: "Stavanger", es: "Stavanger" },
      { en: "Drammen", fr: "Drammen", es: "Drammen" },
      { en: "Fredrikstad", fr: "Fredrikstad", es: "Fredrikstad" },
      { en: "Kristiansand", fr: "Kristiansand", es: "Kristiansand" },
      { en: "Sandnes", fr: "Sandnes", es: "Sandnes" },
      { en: "Tromsø", fr: "Tromsø", es: "Tromsø" },
      { en: "Sarpsborg", fr: "Sarpsborg", es: "Sarpsborg" }
    ]
  },
  {
    code: "DK",
    en: "Denmark",
    fr: "Danemark",
    es: "Dinamarca",
    cities: [
      { en: "Copenhagen", fr: "Copenhague", es: "Copenhague" },
      { en: "Aarhus", fr: "Aarhus", es: "Aarhus" },
      { en: "Odense", fr: "Odense", es: "Odense" },
      { en: "Aalborg", fr: "Aalborg", es: "Aalborg" },
      { en: "Esbjerg", fr: "Esbjerg", es: "Esbjerg" },
      { en: "Randers", fr: "Randers", es: "Randers" },
      { en: "Kolding", fr: "Kolding", es: "Kolding" },
      { en: "Horsens", fr: "Horsens", es: "Horsens" },
      { en: "Vejle", fr: "Vejle", es: "Vejle" },
      { en: "Roskilde", fr: "Roskilde", es: "Roskilde" }
    ]
  },
  {
    code: "FI",
    en: "Finland",
    fr: "Finlande",
    es: "Finlandia",
    cities: [
      { en: "Helsinki", fr: "Helsinki", es: "Helsinki" },
      { en: "Espoo", fr: "Espoo", es: "Espoo" },
      { en: "Tampere", fr: "Tampere", es: "Tampere" },
      { en: "Vantaa", fr: "Vantaa", es: "Vantaa" },
      { en: "Oulu", fr: "Oulu", es: "Oulu" },
      { en: "Turku", fr: "Turku", es: "Turku" },
      { en: "Jyväskylä", fr: "Jyväskylä", es: "Jyväskylä" },
      { en: "Lahti", fr: "Lahti", es: "Lahti" },
      { en: "Kuopio", fr: "Kuopio", es: "Kuopio" },
      { en: "Pori", fr: "Pori", es: "Pori" }
    ]
  },
  {
    code: "IE",
    en: "Ireland",
    fr: "Irlande",
    es: "Irlanda",
    cities: [
      { en: "Dublin", fr: "Dublin", es: "Dublín" },
      { en: "Cork", fr: "Cork", es: "Cork" },
      { en: "Limerick", fr: "Limerick", es: "Limerick" },
      { en: "Galway", fr: "Galway", es: "Galway" },
      { en: "Waterford", fr: "Waterford", es: "Waterford" },
      { en: "Drogheda", fr: "Drogheda", es: "Drogheda" },
      { en: "Dundalk", fr: "Dundalk", es: "Dundalk" },
      { en: "Swords", fr: "Swords", es: "Swords" },
      { en: "Bray", fr: "Bray", es: "Bray" },
      { en: "Navan", fr: "Navan", es: "Navan" }
    ]
  },
  {
    code: "CZ",
    en: "Czech Republic",
    fr: "République tchèque",
    es: "República Checa",
    cities: [
      { en: "Prague", fr: "Prague", es: "Praga" },
      { en: "Brno", fr: "Brno", es: "Brno" },
      { en: "Ostrava", fr: "Ostrava", es: "Ostrava" },
      { en: "Plzeň", fr: "Plzeň", es: "Pilsen" },
      { en: "Liberec", fr: "Liberec", es: "Liberec" },
      { en: "Olomouc", fr: "Olomouc", es: "Olomouc" },
      { en: "České Budějovice", fr: "České Budějovice", es: "České Budějovice" },
      { en: "Hradec Králové", fr: "Hradec Králové", es: "Hradec Králové" },
      { en: "Pardubice", fr: "Pardubice", es: "Pardubice" },
      { en: "Zlín", fr: "Zlín", es: "Zlín" }
    ]
  },
  {
    code: "HU",
    en: "Hungary",
    fr: "Hongrie",
    es: "Hungría",
    cities: [
      { en: "Budapest", fr: "Budapest", es: "Budapest" },
      { en: "Debrecen", fr: "Debrecen", es: "Debrecen" },
      { en: "Szeged", fr: "Szeged", es: "Szeged" },
      { en: "Miskolc", fr: "Miskolc", es: "Miskolc" },
      { en: "Pécs", fr: "Pécs", es: "Pécs" },
      { en: "Győr", fr: "Győr", es: "Győr" },
      { en: "Nyíregyháza", fr: "Nyíregyháza", es: "Nyíregyháza" },
      { en: "Kecskemét", fr: "Kecskemét", es: "Kecskemét" },
      { en: "Székesfehérvár", fr: "Székesfehérvár", es: "Székesfehérvár" },
      { en: "Szombathely", fr: "Szombathely", es: "Szombathely" }
    ]
  },
  {
    code: "GR",
    en: "Greece",
    fr: "Grèce",
    es: "Grecia",
    cities: [
      { en: "Athens", fr: "Athènes", es: "Atenas" },
      { en: "Thessaloniki", fr: "Thessalonique", es: "Tesalónica" },
      { en: "Patras", fr: "Patras", es: "Patras" },
      { en: "Heraklion", fr: "Héraklion", es: "Heraclión" },
      { en: "Larissa", fr: "Larissa", es: "Larisa" },
      { en: "Volos", fr: "Volos", es: "Volos" },
      { en: "Rhodes", fr: "Rhodes", es: "Rodas" },
      { en: "Ioannina", fr: "Ioannina", es: "Ioánina" },
      { en: "Chania", fr: "La Canée", es: "La Canea" },
      { en: "Chalcis", fr: "Chalcis", es: "Calcis" }
    ]
  },
  {
    code: "RO",
    en: "Romania",
    fr: "Roumanie",
    es: "Rumania",
    cities: [
      { en: "Bucharest", fr: "Bucarest", es: "Bucarest" },
      { en: "Cluj-Napoca", fr: "Cluj-Napoca", es: "Cluj-Napoca" },
      { en: "Timișoara", fr: "Timișoara", es: "Timișoara" },
      { en: "Iași", fr: "Iași", es: "Iași" },
      { en: "Constanța", fr: "Constanța", es: "Constanza" },
      { en: "Craiova", fr: "Craiova", es: "Craiova" },
      { en: "Brașov", fr: "Brașov", es: "Brașov" },
      { en: "Galați", fr: "Galați", es: "Galați" },
      { en: "Ploiești", fr: "Ploiești", es: "Ploiești" },
      { en: "Oradea", fr: "Oradea", es: "Oradea" }
    ]
  },
  {
    code: "BG",
    en: "Bulgaria",
    fr: "Bulgarie",
    es: "Bulgaria",
    cities: [
      { en: "Sofia", fr: "Sofia", es: "Sofía" },
      { en: "Plovdiv", fr: "Plovdiv", es: "Plovdiv" },
      { en: "Varna", fr: "Varna", es: "Varna" },
      { en: "Burgas", fr: "Burgas", es: "Burgas" },
      { en: "Ruse", fr: "Ruse", es: "Ruse" },
      { en: "Stara Zagora", fr: "Stara Zagora", es: "Stara Zagora" },
      { en: "Pleven", fr: "Pleven", es: "Pleven" },
      { en: "Sliven", fr: "Sliven", es: "Sliven" },
      { en: "Dobrich", fr: "Dobrich", es: "Dobrich" },
      { en: "Shumen", fr: "Shumen", es: "Shumen" }
    ]
  },
  // Americas
  {
    code: "US",
    en: "United States",
    fr: "États-Unis",
    es: "Estados Unidos",
    cities: [
      { en: "New York", fr: "New York", es: "Nueva York" },
      { en: "Los Angeles", fr: "Los Angeles", es: "Los Ángeles" },
      { en: "Chicago", fr: "Chicago", es: "Chicago" },
      { en: "Houston", fr: "Houston", es: "Houston" },
      { en: "Phoenix", fr: "Phoenix", es: "Phoenix" },
      { en: "Philadelphia", fr: "Philadelphie", es: "Filadelfia" },
      { en: "San Antonio", fr: "San Antonio", es: "San Antonio" },
      { en: "San Diego", fr: "San Diego", es: "San Diego" },
      { en: "Dallas", fr: "Dallas", es: "Dallas" },
      { en: "San Jose", fr: "San José", es: "San José" }
    ]
  },
  {
    code: "CA",
    en: "Canada",
    fr: "Canada",
    es: "Canadá",
    cities: [
      { en: "Toronto", fr: "Toronto", es: "Toronto" },
      { en: "Montreal", fr: "Montréal", es: "Montreal" },
      { en: "Vancouver", fr: "Vancouver", es: "Vancouver" },
      { en: "Calgary", fr: "Calgary", es: "Calgary" },
      { en: "Edmonton", fr: "Edmonton", es: "Edmonton" },
      { en: "Ottawa", fr: "Ottawa", es: "Ottawa" },
      { en: "Winnipeg", fr: "Winnipeg", es: "Winnipeg" },
      { en: "Quebec City", fr: "Québec", es: "Ciudad de Quebec" },
      { en: "Hamilton", fr: "Hamilton", es: "Hamilton" },
      { en: "Kitchener", fr: "Kitchener", es: "Kitchener" }
    ]
  },
  {
    code: "MX",
    en: "Mexico",
    fr: "Mexique",
    es: "México",
    cities: [
      { en: "Mexico City", fr: "Mexico", es: "Ciudad de México" },
      { en: "Guadalajara", fr: "Guadalajara", es: "Guadalajara" },
      { en: "Monterrey", fr: "Monterrey", es: "Monterrey" },
      { en: "Puebla", fr: "Puebla", es: "Puebla" },
      { en: "Tijuana", fr: "Tijuana", es: "Tijuana" },
      { en: "León", fr: "León", es: "León" },
      { en: "Juárez", fr: "Juárez", es: "Juárez" },
      { en: "Zapopan", fr: "Zapopan", es: "Zapopan" },
      { en: "Monterrey", fr: "Monterrey", es: "Monterrey" },
      { en: "Mérida", fr: "Mérida", es: "Mérida" }
    ]
  },
  {
    code: "BR",
    en: "Brazil",
    fr: "Brésil",
    es: "Brasil",
    cities: [
      { en: "São Paulo", fr: "São Paulo", es: "São Paulo" },
      { en: "Rio de Janeiro", fr: "Rio de Janeiro", es: "Río de Janeiro" },
      { en: "Brasília", fr: "Brasília", es: "Brasilia" },
      { en: "Salvador", fr: "Salvador", es: "Salvador" },
      { en: "Fortaleza", fr: "Fortaleza", es: "Fortaleza" },
      { en: "Belo Horizonte", fr: "Belo Horizonte", es: "Belo Horizonte" },
      { en: "Manaus", fr: "Manaus", es: "Manaos" },
      { en: "Curitiba", fr: "Curitiba", es: "Curitiba" },
      { en: "Recife", fr: "Recife", es: "Recife" },
      { en: "Porto Alegre", fr: "Porto Alegre", es: "Porto Alegre" }
    ]
  },
  {
    code: "AR",
    en: "Argentina",
    fr: "Argentine",
    es: "Argentina",
    cities: [
      { en: "Buenos Aires", fr: "Buenos Aires", es: "Buenos Aires" },
      { en: "Córdoba", fr: "Córdoba", es: "Córdoba" },
      { en: "Rosario", fr: "Rosario", es: "Rosario" },
      { en: "Mendoza", fr: "Mendoza", es: "Mendoza" },
      { en: "San Miguel de Tucumán", fr: "San Miguel de Tucumán", es: "San Miguel de Tucumán" },
      { en: "La Plata", fr: "La Plata", es: "La Plata" },
      { en: "Mar del Plata", fr: "Mar del Plata", es: "Mar del Plata" },
      { en: "Salta", fr: "Salta", es: "Salta" },
      { en: "Santa Fe", fr: "Santa Fe", es: "Santa Fe" },
      { en: "San Juan", fr: "San Juan", es: "San Juan" }
    ]
  },
  {
    code: "CL",
    en: "Chile",
    fr: "Chili",
    es: "Chile",
    cities: [
      { en: "Santiago", fr: "Santiago", es: "Santiago" },
      { en: "Valparaíso", fr: "Valparaíso", es: "Valparaíso" },
      { en: "Concepción", fr: "Concepción", es: "Concepción" },
      { en: "La Serena", fr: "La Serena", es: "La Serena" },
      { en: "Antofagasta", fr: "Antofagasta", es: "Antofagasta" },
      { en: "Temuco", fr: "Temuco", es: "Temuco" },
      { en: "Rancagua", fr: "Rancagua", es: "Rancagua" },
      { en: "Talca", fr: "Talca", es: "Talca" },
      { en: "Arica", fr: "Arica", es: "Arica" },
      { en: "Chillán", fr: "Chillán", es: "Chillán" }
    ]
  },
  {
    code: "CO",
    en: "Colombia",
    fr: "Colombie",
    es: "Colombia",
    cities: [
      { en: "Bogotá", fr: "Bogota", es: "Bogotá" },
      { en: "Medellín", fr: "Medellín", es: "Medellín" },
      { en: "Cali", fr: "Cali", es: "Cali" },
      { en: "Barranquilla", fr: "Barranquilla", es: "Barranquilla" },
      { en: "Cartagena", fr: "Carthagène", es: "Cartagena" },
      { en: "Cúcuta", fr: "Cúcuta", es: "Cúcuta" },
      { en: "Bucaramanga", fr: "Bucaramanga", es: "Bucaramanga" },
      { en: "Pereira", fr: "Pereira", es: "Pereira" },
      { en: "Santa Marta", fr: "Santa Marta", es: "Santa Marta" },
      { en: "Ibagué", fr: "Ibagué", es: "Ibagué" }
    ]
  },
  // Asia-Pacific
  {
    code: "AU",
    en: "Australia",
    fr: "Australie",
    es: "Australia",
    cities: [
      { en: "Sydney", fr: "Sydney", es: "Sídney" },
      { en: "Melbourne", fr: "Melbourne", es: "Melbourne" },
      { en: "Brisbane", fr: "Brisbane", es: "Brisbane" },
      { en: "Perth", fr: "Perth", es: "Perth" },
      { en: "Adelaide", fr: "Adélaïde", es: "Adelaida" },
      { en: "Gold Coast", fr: "Gold Coast", es: "Gold Coast" },
      { en: "Canberra", fr: "Canberra", es: "Canberra" },
      { en: "Newcastle", fr: "Newcastle", es: "Newcastle" },
      { en: "Wollongong", fr: "Wollongong", es: "Wollongong" },
      { en: "Logan City", fr: "Logan City", es: "Logan City" }
    ]
  },
  {
    code: "NZ",
    en: "New Zealand",
    fr: "Nouvelle-Zélande",
    es: "Nueva Zelanda",
    cities: [
      { en: "Auckland", fr: "Auckland", es: "Auckland" },
      { en: "Wellington", fr: "Wellington", es: "Wellington" },
      { en: "Christchurch", fr: "Christchurch", es: "Christchurch" },
      { en: "Hamilton", fr: "Hamilton", es: "Hamilton" },
      { en: "Tauranga", fr: "Tauranga", es: "Tauranga" },
      { en: "Dunedin", fr: "Dunedin", es: "Dunedin" },
      { en: "Palmerston North", fr: "Palmerston North", es: "Palmerston North" },
      { en: "Napier", fr: "Napier", es: "Napier" },
      { en: "Porirua", fr: "Porirua", es: "Porirua" },
      { en: "New Plymouth", fr: "New Plymouth", es: "New Plymouth" }
    ]
  },
  {
    code: "JP",
    en: "Japan",
    fr: "Japon",
    es: "Japón",
    cities: [
      { en: "Tokyo", fr: "Tokyo", es: "Tokio" },
      { en: "Yokohama", fr: "Yokohama", es: "Yokohama" },
      { en: "Osaka", fr: "Osaka", es: "Osaka" },
      { en: "Nagoya", fr: "Nagoya", es: "Nagoya" },
      { en: "Sapporo", fr: "Sapporo", es: "Sapporo" },
      { en: "Fukuoka", fr: "Fukuoka", es: "Fukuoka" },
      { en: "Kobe", fr: "Kobe", es: "Kobe" },
      { en: "Kyoto", fr: "Kyoto", es: "Kioto" },
      { en: "Kawasaki", fr: "Kawasaki", es: "Kawasaki" },
      { en: "Saitama", fr: "Saitama", es: "Saitama" }
    ]
  },
  {
    code: "KR",
    en: "South Korea",
    fr: "Corée du Sud",
    es: "Corea del Sur",
    cities: [
      { en: "Seoul", fr: "Séoul", es: "Seúl" },
      { en: "Busan", fr: "Busan", es: "Busán" },
      { en: "Incheon", fr: "Incheon", es: "Incheon" },
      { en: "Daegu", fr: "Daegu", es: "Daegu" },
      { en: "Daejeon", fr: "Daejeon", es: "Daejeon" },
      { en: "Gwangju", fr: "Gwangju", es: "Gwangju" },
      { en: "Suwon", fr: "Suwon", es: "Suwon" },
      { en: "Ulsan", fr: "Ulsan", es: "Ulsan" },
      { en: "Changwon", fr: "Changwon", es: "Changwon" },
      { en: "Goyang", fr: "Goyang", es: "Goyang" }
    ]
  },
  {
    code: "CN",
    en: "China",
    fr: "Chine",
    es: "China",
    cities: [
      { en: "Beijing", fr: "Pékin", es: "Pekín" },
      { en: "Shanghai", fr: "Shanghai", es: "Shanghái" },
      { en: "Guangzhou", fr: "Canton", es: "Cantón" },
      { en: "Shenzhen", fr: "Shenzhen", es: "Shenzhen" },
      { en: "Chengdu", fr: "Chengdu", es: "Chengdú" },
      { en: "Chongqing", fr: "Chongqing", es: "Chongqing" },
      { en: "Tianjin", fr: "Tianjin", es: "Tianjín" },
      { en: "Wuhan", fr: "Wuhan", es: "Wuhan" },
      { en: "Hangzhou", fr: "Hangzhou", es: "Hangzhou" },
      { en: "Xi'an", fr: "Xi'an", es: "Xi'an" }
    ]
  },
  {
    code: "IN",
    en: "India",
    fr: "Inde",
    es: "India",
    cities: [
      { en: "Mumbai", fr: "Mumbai", es: "Bombay" },
      { en: "Delhi", fr: "Delhi", es: "Delhi" },
      { en: "Bangalore", fr: "Bangalore", es: "Bangalore" },
      { en: "Hyderabad", fr: "Hyderabad", es: "Hyderabad" },
      { en: "Ahmedabad", fr: "Ahmedabad", es: "Ahmedabad" },
      { en: "Chennai", fr: "Chennai", es: "Chennai" },
      { en: "Kolkata", fr: "Calcutta", es: "Calcuta" },
      { en: "Pune", fr: "Pune", es: "Pune" },
      { en: "Jaipur", fr: "Jaipur", es: "Jaipur" },
      { en: "Surat", fr: "Surat", es: "Surat" }
    ]
  },
  {
    code: "TH",
    en: "Thailand",
    fr: "Thaïlande",
    es: "Tailandia",
    cities: [
      { en: "Bangkok", fr: "Bangkok", es: "Bangkok" },
      { en: "Chiang Mai", fr: "Chiang Mai", es: "Chiang Mai" },
      { en: "Phuket", fr: "Phuket", es: "Phuket" },
      { en: "Pattaya", fr: "Pattaya", es: "Pattaya" },
      { en: "Nonthaburi", fr: "Nonthaburi", es: "Nonthaburi" },
      { en: "Nakhon Ratchasima", fr: "Nakhon Ratchasima", es: "Nakhon Ratchasima" },
      { en: "Khon Kaen", fr: "Khon Kaen", es: "Khon Kaen" },
      { en: "Udon Thani", fr: "Udon Thani", es: "Udon Thani" },
      { en: "Hat Yai", fr: "Hat Yai", es: "Hat Yai" },
      { en: "Pak Kret", fr: "Pak Kret", es: "Pak Kret" }
    ]
  },
  {
    code: "SG",
    en: "Singapore",
    fr: "Singapour",
    es: "Singapur",
    cities: [
      { en: "Singapore", fr: "Singapour", es: "Singapur" }
    ]
  },
  {
    code: "MY",
    en: "Malaysia",
    fr: "Malaisie",
    es: "Malasia",
    cities: [
      { en: "Kuala Lumpur", fr: "Kuala Lumpur", es: "Kuala Lumpur" },
      { en: "George Town", fr: "George Town", es: "George Town" },
      { en: "Ipoh", fr: "Ipoh", es: "Ipoh" },
      { en: "Shah Alam", fr: "Shah Alam", es: "Shah Alam" },
      { en: "Petaling Jaya", fr: "Petaling Jaya", es: "Petaling Jaya" },
      { en: "Johor Bahru", fr: "Johor Bahru", es: "Johor Bahru" },
      { en: "Malacca City", fr: "Malacca", es: "Malaca" },
      { en: "Kota Kinabalu", fr: "Kota Kinabalu", es: "Kota Kinabalu" },
      { en: "Kuching", fr: "Kuching", es: "Kuching" },
      { en: "Seremban", fr: "Seremban", es: "Seremban" }
    ]
  },
  {
    code: "PH",
    en: "Philippines",
    fr: "Philippines",
    es: "Filipinas",
    cities: [
      { en: "Manila", fr: "Manille", es: "Manila" },
      { en: "Quezon City", fr: "Quezon City", es: "Ciudad Quezón" },
      { en: "Davao City", fr: "Davao", es: "Dav ao" },
      { en: "Caloocan", fr: "Caloocan", es: "Caloocan" },
      { en: "Cebu City", fr: "Cebu", es: "Cebú" },
      { en: "Zamboanga City", fr: "Zamboanga", es: "Zamboanga" },
      { en: "Taguig", fr: "Taguig", es: "Taguig" },
      { en: "Antipolo", fr: "Antipolo", es: "Antipolo" },
      { en: "Pasig", fr: "Pasig", es: "Pasig" },
      { en: "Cagayan de Oro", fr: "Cagayan de Oro", es: "Cagayán de Oro" }
    ]
  }
];
