import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search',
    pure: false
})
export class SearchPipe implements PipeTransform {
    transform(items: any[], searchText: String, searchField: any): any[] {
        if (!items) return [];
        if(!searchText) return items;
        searchText = searchText.toUpperCase();
        
        return items.filter(it => {
          return it[searchField].toUpperCase().includes(searchText);
        });
    }
}
