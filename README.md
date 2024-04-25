# GhibliJourney

-

## :gem: 사용한 기술

![html5](https://img.shields.io/badge/html5-E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white)
![css3](https://img.shields.io/badge/css3-1572B6.svg?&style=for-the-badge&logo=css3&logoColor=white)
![javascript](https://img.shields.io/badge/javascript-F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=white)
![swiper](https://img.shields.io/badge/swiper-6332F6.svg?&style=for-the-badge&logo=swiper&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837.svg?&style=for-the-badge&logo=npm&logoColor=white)

## :airplane: 결과

<img src="./img/result.jpeg" width="100%"/>

## :clipboard: 구현할 기능 목록

- 반응형 디자인
- 자동 슬라이드 효과
- api를 활용한 데이터 제어
- 작품 클릭시 상세 정보 modal 출력
- 작품 호버시 제목 및 로튼토마토 지수 출력

## :warning: 해결해야하는 부분

| 문제 사진 | 문제 내용                                                                                                                                               | 해결                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
|           | 포스터를 클릭하면 해당 포스터가 나타내는 영화의 상세정보를 modal에서 확인해야하는데 클릭 이벤트와 render 는 별도로 있기에 데이터를 별도로 연결해야한다. | api에 id 를 dataset에 주어 포스터를 클릭하면 그 값을 전달해 디테일에 접근하게 해결 |
|           | api에서 가져온 배너 이미지의 사이즈가 동일하지 않다.                                                                                                    | api 데이터에는 직접 접근을 할 수 없기에                                            |

## :file_folder: 파일 구조 및 파일명

- :open_file_folder: petSuppliesWebClone
  - :memo: index.html
  - :open_file_folder: img
  - :open_file_folder: js
    - :memo: common.js
  - :open_file_folder: css
    - :memo: style.css
    - :memo: my_reset.css

## :book: 커밋 컨벤션

- 자주 사용하는 태그 종류
  - feat : 새로운 기능을 추가하는 경우
  - fix : 버그를 고친경우
  - docs : 문서를 수정한 경우
  - style : 코드 포맷 변경, 세미콜론 누락, 코드 수정이 없는경우
  - refactor : 코드 리펙토링
  - test : 테스트 코드. 리펙토링 테스트 코드를 추가했을 때
  - chore : 빌드 업무 수정, 패키지 매니저 수정
  - design : CSS 등 사용자가 UI 디자인을 변경했을 때
  - rename : 파일명(or 폴더명) 을 수정한 경우
  - remove : 코드(파일) 의 삭제가 있을 때. "Clean", "Eliminate" 를 사용하기도 함
- 기타 태그 타입들
  - add : 코드나 테스트, 예제, 문서등의 추가 생성이 있는경우
  - Improve : 향상이 있는 경우. 호환성, 검증 기능, 접근성 등이 될수 있습니다.
  - implement : 코드가 추가된 정도보다 더 주목할만한 구현체를 완성시켰을 때
  - move : 코드의 이동이 있는경우
  - updated : 계정이나 버전 업데이트가 있을 때 사용. 주로 코드보다는 문서나, 리소스, 라이브러리등에 사용합니다.
  - comment : 필요한 주석 추가 및 변경

## 참고 사이트

[swiper] <https://swiperjs.com/>  
[api] <https://ghibliapi.vercel.app/>  
[mdn] <https://developer.mozilla.org/ko/>  
[rotten tomatoes] <https://www.rottentomatoes.com/>
