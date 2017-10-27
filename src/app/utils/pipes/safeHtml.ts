import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeHtml'})
export class SafeHtml {
  constructor(private sanitizer:DomSanitizer){}

  transform(html) {
    // return this.sanitizer.bypassSecurityTrustStyle(style);
    return this.sanitizer.bypassSecurityTrustHtml(html);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }
}