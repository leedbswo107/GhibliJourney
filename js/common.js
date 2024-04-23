const works = document.querySelector('.works');
const slider = document.querySelector('.slider');

// test
const infoDial = document.querySelector('#infoDial');
const modalBack = document.querySelector('.modalBack');
const modal = document.querySelector('.modal');
const btnClose = document.querySelector('.close');

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
  // const modalHtml = jsonData.map((works) => createModal(works).join(''));
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
  <img src="${works.image}" alt="${works.original_title}" data-id="${works.id}"/>
  <p class="rtScore">
  <strong>${works.original_title}</strong>
  <span><img src="${rtScoreImg}" alt="" />${score}%</span>
  </p>
  </li>
`;
}
function createModal(works) {
  getData();
  console.log();
  return `
  <div class="modal">
    <div class="modalBanner">
      <div class="gradient"></div>
      <img src="./img/bannertest.webp" alt="test" />
    </div>
    <div class="modalPoster">
      <img
        src="https://upload.wikimedia.org/wikipedia/ko/b/bc/%EC%84%BC%EA%B3%BC_%EC%B9%98%ED%9E%88%EB%A1%9C%EC%9D%98_%ED%96%89%EB%B0%A9%EB%B6%88%EB%AA%85_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg"
        alt="포스터"
      />
    </div>
    <p class="detail">
      <strong>센과 치히로의 행방불명</strong>
      <span>year</span>
      <span>character</span>
      <span>director</span>
      <span>runtime</span>
      <span>rtScore</span>
      description
    </p>
    <div class="close">
      <span></span>
      <span></span>
    </div>
  </div>
  `;
}

// modal click event area
works.addEventListener('click', (e) => {
  if (e.target.tagName !== 'IMG') return;
  modal.classList.add('on');
  modalBack.classList.add('on');
  modal.scrollTop = 0;
});
btnClose.addEventListener('click', () => {
  modal.classList.remove('on');
  modalBack.classList.remove('on');
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
