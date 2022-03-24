const API_KEY = 'f36184a7957445a382ad24af237cba3e';

const choiseEl = document.querySelector('.header__country-list');
const newsList = document.querySelector('.news__list');

const choices = new Choices(choiseEl, {
  searchEnabled: false,
  itemSelectText: '',
});

const getData = async url => {
  const response = await fetch(url, {
    headers: {
      'X-Api-Key': API_KEY,
    },
  });

  return response.json();
};

const renderCard = data => {
  newsList.innerHTML = '';
  console.log(data);
  data.forEach((news, i) => {
    const card = document.createElement('li');
    card.className = 'news__item card-news';
    card.innerHTML = `
    <img src=${
      news.urlToImage ? news.urlToImage : 'img/photo-plug.jpg'
    } alt="Продажи китайских смартфонов в России выросли в два раза" />
    <h3 class="card-news__title">
      <a class="card-news__link" href=${news.url}>${news.title}</a>
    </h3>
    <p class="card-news__description">
     ${news.description ? news.description : ''}
    </p>
    <div class="card-news__data">
      <time class="card-news__time" datetime="${news.publishedAt}"> <span>16/03/2022</span> 11:06 </time>
      <div class="card-news__author">${news.author ? news.author : 'Инкогнито'}</div>
    </div>

    `;

    newsList.insertAdjacentElement('beforeend', card);
  });
};

const loadNews = async () => {
  const url = ` https://newsapi.org/v2/top-headlines?country=ru`;
  const data = await getData(url);
  renderCard(data.articles);
};
loadNews();
