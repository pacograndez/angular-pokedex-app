import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'codePokedex',
  standalone: true,
})
export class CodePokedexPipe implements PipeTransform {
  transform(id: string): string {
    return '#' + id.padStart(4, '0');
  }
}
