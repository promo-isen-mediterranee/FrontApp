import { Component, Input, OnInit, SecurityContext } from "@angular/core";
import { ButtonComponent } from "../../components/button/button.component";
import { ActivatedRoute } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [ButtonComponent, NgOptimizedImage, MatIcon],
  templateUrl: './SuccessPage.component.html',
  styleUrl: './SuccessPage.component.css',
})
export class SuccessPageComponent implements OnInit{
  @Input()
  text: string = 'Successful';

  @Input()
  link: string = '/home';
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.text = params['text'] || this.text;
      this.link = this.sanitizer.sanitize(SecurityContext.URL, params['link'] || this.link) ?? (params['link'] || this.link);
    });
  }
}
