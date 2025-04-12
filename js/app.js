document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("news-container");

  async function fetchNews() {
    try {
      const response = await fetch("https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=9&apikey=2e1b28a7f49c07f7bd76ee2f64f86fdf");
      
      if (!response.ok) {
        throw new Error("Erro ao carregar notícias.");
      }
      
      const data = await response.json();
      displayNews(data.articles);
      
    } catch (error) {
      console.error(error);
      newsContainer.innerHTML = `<p class="text-danger">Erro ao carregar notícias. Tente novamente mais tarde.</p>`;
    }
  }

  function displayNews(articles) {
    newsContainer.innerHTML = ""; // Limpa o container antes de adicionar
    articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "card m-3";
      card.style.width = "18rem";

      card.innerHTML = `
        <img src="${article.image || 'https://via.placeholder.com/286x180'}" class="card-img-top" alt="Imagem da notícia">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${article.title}</h5>
          <p class="card-text">${article.description || ''}</p>
          <a href="${article.url}" target="_blank" class="btn btn-primary mt-auto">Leia mais</a>
        </div>
      `;
      
      newsContainer.appendChild(card);
    });
  }

  fetchNews();
});


  
  
  