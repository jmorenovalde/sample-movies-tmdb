import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(value: number): string {
    if (!value || value <= 5) return 'bad';
    if (value <= 6) return 'not-bad';
    if (value <= 7) return 'good';
    if (value <= 8) return 'very-good';
    return 'excellent';
  }
}
