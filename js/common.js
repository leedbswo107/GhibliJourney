const works = document.querySelector('.works');
const slider = document.querySelector('.slider');
const modalBack = document.querySelector('.modalBack');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');

async function getWorks() {
  const data = await getData();
  renderWorks(data);
}
function renderWorks(jsonData) {
  if (jsonData.length === 0) {
    works.innerHTML = `<li class="noList">검색 결과가 없습니다.</li>`;
    return;
  }
  console.log(jsonData);
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
  <img src="${works.image}" alt="${works.original_title}" data-id="${works.id}"/>
  <p class="rtScore">
  <strong>${works.original_title}</strong>
  <span><img src="${rtScoreImg}" alt="" />${score}%</span>
  </p>
  </li>
`;
}
function createModal(works) {
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
      <span>${works.release_date}</span>
      <span>${works.people}</span>
      <span>${works.director}</span>
      <span>${works.running_time}</span>
      <span>${works.rt_score}%</span>
      ${works.description}
    </p>
  `;
}
async function getModalDetail(e) {
  const dataSet = e.target.dataset.id;
  const modalDetail = await getData(dataSet);
  const modalHtml = createModal(modalDetail[0]);
  return modalHtml;
}
// modal click event area
works.addEventListener('click', async (e) => {
  if (e.target.tagName !== 'IMG') return;
  const modalHtml = await getModalDetail(e);
  modal.innerHTML = modalHtml;
  modalBack.classList.add('on');
  modal.scrollTop = 0;
});
closeBtn.addEventListener('click', () => {
  modalBack.classList.remove('on');
  modal.innerHTML.remove;
  // modal.innerHTML = '';
});
async function getData(data) {
  const url = new URL('https://ghibliapi.vercel.app/films/');
  try {
    if (data) {
      url.searchParams.append('id', data);
    }
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
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
