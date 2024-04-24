const logo = document.querySelector('h1 > img');
const loadingBack = document.querySelector('.loadingBack');

const works = document.querySelector('.works');
const slider = document.querySelector('.slider');

const modalBack = document.querySelector('.modalBack');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modalBack .close');

const searchBtn = document.querySelector('.search');
const submitBtn = document.querySelector('.submit');
const searchBack = document.querySelector('.searchBack');
const searchTitle = document.querySelector('.searchTitle');
const searchCloseBtn = document.querySelector('.searchBack .close');

// spacebar: 32, pageup: 33, pagedown: 34,
//  end: 35, home: 36
// left: 37, up: 38, right: 39, down: 40,
const keys = { 32: 1, 33: 1, 34: 1, 35: 1, 36: 1, 37: 1, 38: 1, 39: 1, 40: 1 };
let supportsPassive = false;
try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent =
  'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
function preventDefault(e) {
  e.preventDefault();
}
function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    e.preventDefault();
    return false;
  }
}
async function getWorks() {
  const data = await getData();
  renderWorks(data);
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
  [works.innerHTML, slider.innerHTML] = [worksHtml, bannerHtml];
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
function createModalHtml(works) {
  return `
    <div class="modalBanner">
      <div class="gradient"></div>
      <img src="${works.movie_banner}" alt="test" />
    </div>
    <div class="modalPoster">
      <img
        src="${works.image}"
        alt="포스터"
      />
    </div>
    <p class="detail">
      <strong>${works.title}</strong>
      <span>Date          : ${works.release_date}</span>
      <span>Director      : ${works.director}</span>
      <span>Runtime       : ${works.running_time}</span>
      <span>Rotten Tomato : ${works.rt_score}%</span>
      ${works.description}
    </p>
  `;
}
async function getModalDetail(e) {
  const dataSet = e.target.dataset.id;
  const modalDetail = await getData(dataSet, null);
  const modalHtml = createModalHtml(modalDetail[0]);
  return modalHtml;
}
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}
// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
async function search(value) {
  console.log(value);
  const searchData = await getData(null, value);
  renderWorks(searchData);
}
async function getData(id, search) {
  const url = new URL('https://ghibliapi.vercel.app/films/');
  try {
    if (id) url.searchParams.append('id', id);
    if (search) url.searchParams.append('q', search);

    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error(error);
  }
}
// modal click event area
works.addEventListener('click', async (e) => {
  if (e.target.tagName !== 'IMG') return;
  const modalHtml = await getModalDetail(e);
  modal.innerHTML = modalHtml;
  modalBack.classList.add('on');
  modal.scrollTop = 0;
  disableScroll();
});
modalCloseBtn.addEventListener('click', () => {
  modalBack.classList.remove('on');
  modal.innerHTML.remove;
  enableScroll();
});
searchBtn.addEventListener('click', () => {
  searchBack.classList.add('on');
});
searchCloseBtn.addEventListener('click', () => {
  searchTitle.value = '';
  searchBack.classList.remove('on');
});
submitBtn.addEventListener('click', () => {
  let inputValue = searchTitle.value;
  searchBack.classList.remove('on');
  search(inputValue);
  inputValue = '';
  searchTitle.value = '';
});
logo.addEventListener('click', () => {
  getWorks();
});
document.addEventListener('DOMContentLoaded', function () {
  disableScroll();
  setTimeout(() => {
    loadingBack.classList.add('off');
    enableScroll();
  }, 5000);
});
getWorks();
