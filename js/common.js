const logo = document.querySelector('h1 > img');
const loadingBack = document.querySelector('.loadingBack');

const works = document.querySelector('.works');
const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('.slide');

const modalBack = document.querySelector('.modalBack');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modalBack .close');

const searchBtn = document.querySelector('.search');
const submitBtn = document.querySelector('.submit');
const searchBack = document.querySelector('.searchBack');
const searchTitle = document.querySelector('.searchTitle');
const searchCloseBtn = document.querySelector('.searchBack .close');

const wrap = document.querySelector('body');

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
  let swiper = new Swiper('.slideWrap', {
    effect: 'fade',
    spaceBetween: 30,
    slidesPerView: 1,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
}
function createBannerImgHtml(slider) {
  return `
  <li class="swiper-slide">
    <div class="card">
      <div class="info">
        <p class="infoIn">
          <strong>${slider.title}</strong>
          <span>${slider.director}</span>
        </p>
      </div>
      <img src="${slider.movie_banner}" alt="banner" />
    </div>
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
      <img src="${works.movie_banner}" alt="${works.original_title}" />
    </div>
    <div class="modalPoster">
      <img
        src="${works.image}"
        alt="${works.original_title} poster"
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
    <div class="modalBottomImg">
      <img src="./img/modalBottom.png" alt="modalBottom" />
    </div>
    
  `;
}
async function getModalDetail(e) {
  const dataSet = e.target.dataset.id;
  const modalDetail = await getData(dataSet, null);
  const modalHtml = createModalHtml(modalDetail[0]);
  return modalHtml;
}
async function search(value) {
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
  wrap.classList.add('on');
});
modalCloseBtn.addEventListener('click', () => {
  modalBack.classList.remove('on');
  modal.innerHTML.remove;
  wrap.classList.remove('on');
});
searchBtn.addEventListener('click', () => {
  searchBack.classList.add('on');
  wrap.classList.add('on');
});
searchCloseBtn.addEventListener('click', () => {
  searchTitle.value = '';
  searchBack.classList.remove('on');
  wrap.classList.remove('on');
});
submitBtn.addEventListener('click', () => {
  let inputValue = searchTitle.value;
  searchBack.classList.remove('on');
  search(inputValue);
  inputValue = '';
  searchTitle.value = '';
  wrap.classList.remove('on');
});
logo.addEventListener('click', () => {
  getWorks();
});
document.addEventListener('DOMContentLoaded', function () {
  wrap.classList.add('on');
  setTimeout(() => {
    loadingBack.classList.add('off');
    wrap.classList.remove('on');
  }, 3000);
});
getWorks();
