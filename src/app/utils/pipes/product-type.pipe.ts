import {Pipe, PipeTransform} from '@angular/core';
import {conf} from '../conf';

@Pipe({
    name: 'productType',
    pure: false
})
export class ProductTypePipe implements PipeTransform {
    product_keys = conf.product_keys;

    transform(key: string): string {
        if (!key) {
            return '';
        }
        let description = '';
        this.product_keys.forEach((type) => {
            if (type.key === key) {
                description = type.description;
            }
        });
        return description;
    }
}
