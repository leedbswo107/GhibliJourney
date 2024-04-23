const works = document.querySelector('.works');
const slider = document.querySelector('.slider');

// test
const infoDial = document.querySelector('#infoDial');
// const work = document.querySelector('.work');
// const slide = document.querySelector('.slide');
// const test = document.querySelector('.test');
/**
 * rotten tomato score
 * 60% under -> rottenScore2.svg
 * 60% over -> rottenScore1.svg
 */

function getWorks() {
  getData();
}
function renderWorks(jsonData) {
  if (jsonData.length === 0) {
    works.innerHTML = `<li class="noList">검색 결과가 없습니다.</li>`;
    return;
  }
  const bannerHtml = jsonData
    .map((slider) => createBannerImgHtml(slider))
    .join('');
  const worksHtml = jsonData.map((works) => createWorkHtml(works)).join('');
  works.innerHTML = worksHtml;
  slider.innerHTML = bannerHtml;
}
function createBannerImgHtml(slider) {
  return `
  <li class="slide">
  <div class="info">
    <p class="infot">
      <strong>${slider.title}</strong>
      <span>${slider.director}</span>
    </p>
  </div>
  <img src="${slider.movie_banner}" alt="banner" />
  </li>
  `;
}
function createWorkHtml(works) {
  let score = parseInt(works.rt_score);
  let rtScoreImg = '';
  score < 60
    ? (rtScoreImg = '../img/rottenScore2.svg')
    : (rtScoreImg = '../img/rottenScore1.svg');
  return `
  <li class="work">
  <img src="${works.image}" alt="${works.original_title}"/>
  <p class="rtScore">
  <strong>${works.original_title}</strong>
  <span><img src="${rtScoreImg}" alt="" />${score}%</span>
  </p>
  </li>
`;
}

// modal click event area
works.addEventListener('click', (e) => {
  if (e.target.tagName !== 'IMG') return;
  console.log('test');
});
async function getData() {
  const url = new URL('https://ghibliapi.vercel.app/films/');
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
    renderWorks(jsonData);
  } catch (error) {
    console.error(error);
  }
}

// document.addEventListener('DOMContentLoaded', function () {
//   setTimeout(() => {
//     test.innerHTML = 'DOM content has been loaded';
//   }, 3000);
// });
// getData();
getWorks();
