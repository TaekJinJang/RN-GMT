class Place {
  constructor(title, imageUri, address, location, type, star) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // { lat: 0.123456, lng: 127.123 }
    this.id = new Data().toString() + Math.random().toString(); // DB가 없으니 랜덤값으로 만듦
    this.type = type; // 음식 종류 : 한식, 중식, 양식 등등 나누기
    this.star = star; // 별점
  }
}
