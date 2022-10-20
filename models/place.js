export class Place {
  constructor(title, imageUri, location, review, type, star) {
    this.title = title;
    this.imageUri = imageUri;
    this.location = { lat: location.lat, lng: location.lng }; // { lat: 0.123456, lng: 127.123 }
    this.address = location.address;
    this.review = review;
    this.id = Math.random().toString(); // DB가 없으니 랜덤값으로 만듦
    // this.id = new Data().toString() + Math.random().toString(); // DB가 없으니 랜덤값으로 만듦
    this.type = type; // 음식 종류 : 한식, 중식, 양식 등등 나누기
    this.star = star; // 별점
  }
}
