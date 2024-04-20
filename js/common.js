const works = document.querySelector('.works');
const slider = document.querySelector('.slider');
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
  const worksHtml = jsonData.map((works) => createWorksImgHtml(works)).join('');
  // works.innerHTML = worksHtml;
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
function createWorksImgHtml(works) {
  console.log('Score : ', works.rt_score);
  return `
  <li class="work">
  <img src="${works.image}" alt="${works.original_title}"/>
  </li>
`;
}
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
