import {Pipe, PipeTransform} from '@angular/core';
import {conf} from '../conf';
@Pipe({
    name: 'unity',
    pure: false
})
export class UnityPipe implements PipeTransform {
    units = conf.units;

    transform(key: string): string {
        if (!key) {
            return '';
        }
        let description = '';
        this.units.forEach((type) => {
            if (type.key === key) {
                description = type.description;
            }
        });
        return description;
    }
}
