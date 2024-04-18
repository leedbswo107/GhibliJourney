// const test = document.querySelector('.test');
function getLatestNews() {
  getData();
}
async function getData() {
  const url = new URL('https://ghibliapi.vercel.app/films/');
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
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
getLatestNews();
