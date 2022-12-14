import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

const database = SQLite.openDatabase('places.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL, 
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL,
            type TEXT NOT NULL,
            star INTEGER NOT NULL,
            review TEXT NOT NULL
        )`,
        [],
        () => {
          resolve(); // 에러가 없을 시 콜백
        },
        (_, error) => {
          // 에러 시 콜백
          reject(error);
        }
      );
    });
  });

  return promise;
};

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places = [];
          //   console.log('페치플레이스', result);
          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  lng: dp.lng,
                },
                dp.type,
                dp.star,
                dp.review,
                dp.id
              )
            );
          }
          resolve(places);
          //   console.log('마지막배열', places);
        },
        (_, error) => {
          reject(error);
          console.log(error);
        }
      );
    });
  });
  return promise;
}

export function insertPlace(place) {
  // DB삽입
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng, type, star, review) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
          place.type,
          place.star,
          place.review,
        ],
        (_, result) => {
          console.log('데이터삽입', result);
          resolve(result);
        }, //
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
