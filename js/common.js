const logo = document.querySelector('h1 > img');
const loadingBack = document.querySelector('.loadingBack');

const dirSelect = document.querySelector('#dirSelect');

const works = document.querySelector('.works');
const slider = document.querySelector('.slider');

const modalBack = document.querySelector('.modalBack');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modalBack .close');

const submitBtn = document.querySelector('.submit');
const searchBtn = document.querySelector('.search');
const searchBack = document.querySelector('.searchBack');
const searchTitle = document.querySelector('.searchTitle');
const searchCloseBtn = document.querySelector('.searchBack .close');

const wrap = document.querySelector('body');

const BASE_URL = 'https://ghibliapi.vercel.app/films/';

console.log(slider.children);

async function getWorks() {
  const data = await getData();
  renderWorks(data);
}
function renderWorks(jsonData) {
  if (jsonData.length === 0) {
    works.innerHTML = `<li class="noList">검색 결과가 없습니다.</li>`;
    return;
  }
  const bannerHtml = jsonData.map(createBannerImgHtml).join('');
  const worksHtml = jsonData.map(createWorkHtml).join('');
  [works.innerHTML, slider.innerHTML] = [worksHtml, bannerHtml];
  initializeSwiper();
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
  const rtScoreImg =
    score < 60 ? '../img/rottenScore2.svg' : '../img/rottenScore1.svg';
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
function initializeSwiper() {
  const swiper = new Swiper('.slideWrap', {
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
  const modalDetail = await getData(dataSet);
  return createModalHtml(modalDetail[0]);
}
async function search(value) {
  const searchData = await getData(null, value);
  renderWorks(searchData);
}
async function selectDirector(value) {
  const searchDirector = await getData(null, null, value);
  renderWorks(searchDirector);
}
async function getData(id, search, director) {
  const url = new URL(`${BASE_URL}`);
  if (id) url.searchParams.append('id', id);
  if (search) url.searchParams.append('q', search);
  if (director) url.searchParams.append('director', director);
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

function toggleModalBack() {
  modalBack.classList.toggle('on');
  wrap.classList.toggle('on');
}

function toggleSearchBack() {
  searchTitle.value = '';
  searchBack.classList.toggle('on');
  wrap.classList.toggle('on');
}

function handleSearch() {
  const inputValue = searchTitle.value;
  toggleSearchBack();
  search(inputValue);
}
function handleSelect(e) {
  const selectedValue = e.target.value;
  selectedValue === 'all'
    ? selectDirector(null)
    : selectDirector(selectedValue);
}

function handleLogoClick() {
  getWorks();
}
function handleModalClose() {
  modalBack.classList.remove('on');
  modal.innerHTML = '';
  wrap.classList.remove('on');
}
// modal click event area
works.addEventListener('click', async (e) => {
  if (e.target.tagName !== 'IMG') return;
  const modalHtml = await getModalDetail(e);
  modal.innerHTML = modalHtml;
  toggleModalBack();
  modal.scrollTop = 0;
});
modalCloseBtn.addEventListener('click', () => handleModalClose());
searchBtn.addEventListener('click', () => toggleSearchBack());
searchCloseBtn.addEventListener('click', () => toggleSearchBack());
submitBtn.addEventListener('click', () => handleSearch());
logo.addEventListener('click', () => handleLogoClick());
dirSelect.addEventListener('change', (e) => handleSelect(e));

window.addEventListener('load', () => {
  wrap.classList.add('on');
  setTimeout(() => {
    loadingBack.classList.add('off');
    wrap.classList.remove('on');
  }, 3000);
});
getWorks();
