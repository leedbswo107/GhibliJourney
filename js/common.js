const works = document.querySelector('.works');
const banner = document.querySelector('.banner');
// const test = document.querySelector('.test');

function getWorks() {
  getData();
}
function renderWorks(jsonData) {
  if (jsonData.length === 0) {
    works.innerHTML = `<li class="noList">검색 결과가 없습니다.</li>`;
    return;
  }
  const worksHtml = jsonData.map((works) => createHtml(works)).join('');
  works.innerHTML = worksHtml;
}
function createHtml(works) {
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
