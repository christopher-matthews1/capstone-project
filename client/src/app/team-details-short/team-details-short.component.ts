import { Component, OnInit } from '@angular/core';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-team-details-short',
  templateUrl: './team-details-short.component.html',
  styleUrls: ['./team-details-short.component.css']
})
export class TeamDetailsShortComponent implements OnInit {

  constructor(private scrollService: ScrollService) { }

  ngOnInit(): void {
  }

  scrollToContent() {
    this.scrollService.scrollToContent();
}

}
