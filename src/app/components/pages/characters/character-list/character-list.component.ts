import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { take } from 'rxjs/operators';
import { Character } from 'src/app/shared/interfaces/character.interface';
import { CharacterService } from 'src/app/shared/services/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  private query!: string;

  constructor(
    private characterSvc: CharacterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.getDataFromService();
    this.getCharactersByQuery();
  }

  private getCharactersByQuery(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      console.log(params);
      this.query = params['q'];
      this.getDataFromService();
    });
  }

  private getDataFromService(): void {
    this.characterSvc
      .searchCharacters(this.query)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res?.length) {
          this.characters = [...res];
        }
      });
  }
}
