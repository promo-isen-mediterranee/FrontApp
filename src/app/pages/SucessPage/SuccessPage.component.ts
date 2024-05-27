import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { ActivatedRoute } from '@angular/router';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [ButtonComponent, NgOptimizedImage],
  templateUrl: './SuccessPage.component.html',
  styleUrl: './SuccessPage.component.css',
})
export class SuccessPageComponent {
  @Input()
  text: string = 'Successful';

  @Input()
  link: string = '/home';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.text = params['text'] || this.text;
      this.link = params['link'] || this.link;
    });
  }
}
