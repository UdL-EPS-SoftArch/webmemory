import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../player.service';
import { Player } from '../player';

@Component({
  selector: 'app-player-detail',
  templateUrl: './user-detail.component.html'
})
export class PlayerDetailComponent implements OnInit {
  public user: Player = new Player();

  constructor(private route: ActivatedRoute,
              private playerService: PlayerService,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.playerService.get(id).subscribe(
      player => this.user = player);
  }

  public delete() {
    this.playerService.delete(this.user).subscribe(
      () => this.router.navigate(['users']));
  }
}
