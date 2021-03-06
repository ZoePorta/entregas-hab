function pageLayout(title, content) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>${title}</title>
    
    <link rel="stylesheet" href="/css/style.css" />
  </head>
  <body>
    <header>
      <h1><a href="/">Pokedex!</a></h1>
    </header>

      ${content}
  
    </body>
  </html>
  `;
}

function frontPage() {
  return `
  <section>
    <form action="/search" method="GET">
      <fieldset>
        <label for="query">Busca tu pokemon</label>
        <input type="search" name="query" id="query" /> 
      </fieldset>
      <button>Buscar</button>
    </form>
  </section>
  `;
}

function searchResults(results) {
  if (results.length === 0) {
    return errorPage("No results");
  }
  const htmlResults = results.map((result) => {
    const { english, japanese } = result.name;
    return `<li>
    <a href="/pokemon/${result.id}">
    ${english}/${japanese}</a>
    (${result.type.join(", ")})</li>`;
  });

  return `
  <section>
<ul>
  ${htmlResults.join("")}
</ul>
  </section>
  `;
}

function fichaPokemon(pokemon) {
  const { id, name, type, base } = pokemon;
  const stadisticsArray = Object.entries(base).map((item) => item.join(": "));
  const stadisticsLis = stadisticsArray.map((item) => `<li>${item}</li>`);
  let photoName = `${id}`;
  while (photoName.length < 3) {
    photoName = "0" + photoName;
  }

  return `<ul>
  <li><img src="/images/${photoName}.png"></img></li>
  <li><strong>Nombre en inglés:</strong> ${name.english}</li>
  <li><strong>Nombre en japonés:</strong> ${name.japanese}</li>
  <li><strong>Tipos:</strong> ${type.join(", ")}</li>
  <li><strong>Estadísticas:</strong> 
  <ul>
  ${stadisticsLis.join("")}
  </ul></li>
  </ul>`;
}

function errorPage(message) {
  return `
    <section class="error">
      <p>${message}</p>
      <a href="/">Volver a la portada</a>
    </section>
  `;
}

module.exports = {
  pageLayout,
  frontPage,
  errorPage,
  searchResults,
  fichaPokemon,
};
