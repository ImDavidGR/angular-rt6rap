import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../interfaces/character.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient) {}

  searchCharacters(query = '') {
    if (query) {
      return this.http.get<Character[]>(
        `${environment.base_url_api}/characters?name=${query}`
      );
    }

    return this.http.get<Character[]>(
      `${environment.base_url_api}/characters/`
    );
  }
}
