# RN-GMT

# 개인 맛집 선정 어플
 

## Description  

GPS를 활용하여 위치정보 제공 및 사용자와의 위치 비교, 사용자 개개인의 맛집을 선별, 앱 실행 시 위치기반으로 메뉴를 추천하며 종류별 카테고리로 분류하여 추천하는 어플입니다. RN과 SQLite를 통하여 개발하였습니다.


## Features 
  

#### 메인페이지 

- 지금까지 체크해놨던 맛집리스트들을 보여줌 
- 한식, 중식, 일식, 양식 으로 분류하여 볼 수 있음
- 맛집 클릭시 상세정보(별점,후기 등등이 나옴)
![](https://velog.velcdn.com/images/taek_jini/post/d5776390-db58-4a9f-bfa2-9d91e11a779d/image.png)

![](https://velog.velcdn.com/images/taek_jini/post/dacb743a-8cd9-4c0c-8b61-9414de67dbac/image.png)


#### 지도페이지

- Google Map API를 통해 전세계 지도를 보여줌
- 클릭 시 마커가 생기고 맛집을 추가할 때 사용할 수 있음
- 본인 위치를 찾는 버튼과 마커를 맛집위치로 생성하는 버튼 구현
 <p align='center'>
 <img src="https://velog.velcdn.com/images/taek_jini/post/36287171-7a88-4116-97d1-b9216a5cbfbe/image.png")
 </p>

#### 맛집추가 페이지
- 이름,음식종류,사진(갤러리 연동), 위치,후기,별점 등을 기입하여 맛집을 추가할 수 있음
- 사진은 갤러리 권한을 얻어 갤러리에서 가져오고 위치 권한을 얻어 내 위치 찾기를 누를 시 현 위치 마커를 가져오게끔 설계

 <p align='center'>
 <img src="https://user-images.githubusercontent.com/93184838/211484222-67ec2610-0b25-4375-81c9-ccccd954a271.png")
  </p>


## Requirements

### Language

- Frontend
  - Javascript
- Backend
  - Node.js

### Framework

 - React-Native


### Database

 - SQLite

### Library

- Frontend
  - expo (image-picker, location)
  - Styled-components
  - react-navigation
  - Google Maps Static API/Geocoding API
  - @Bootstrap

  
