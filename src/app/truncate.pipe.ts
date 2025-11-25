import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, showFull: boolean): string {
    const maxLength = 100;  // Set the character limit
    if (!value) return '';

    if (showFull) {
      return value;  // Show full comment if 'showFull' is true
    }

    // Truncate the comment and add '...'
    return value.length > maxLength ? value.substring(0, maxLength) + '...' : value;
  }
}
