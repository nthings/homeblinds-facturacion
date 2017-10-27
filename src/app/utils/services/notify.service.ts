import {Injectable} from '@angular/core';

declare var $: any;

@Injectable()
// Expose the JQuery Notify. This way JQuery is not called in components directly (and it's more beautiful)
export class NotifyService {
    constructor() {
    }

    public success(icon: String, message: String) {
        $.notify({
            icon: icon,
            message: message
        }, {
            type: 'success',
            timer: 1000,
            placement: {
                from: 'top',
                align: 'right'
            }
        });
    }

    public error(icon: String, message: String) {
        $.notify({
            icon: icon,
            message: message
        }, {
            type: 'danger',
            timer: 1000,
            placement: {
                from: 'top',
                align: 'right'
            }
        });
    }

    public warning(icon: String, message: String) {
        $.notify({
            icon: icon,
            message: message
        }, {
            type: 'warning',
            timer: 1000,
            placement: {
                from: 'top',
                align: 'right'
            }
        });
    }

    public info(icon: String, message: String) {
        $.notify({
            icon: icon,
            message: message
        }, {
            type: 'info',
            timer: 1000,
            placement: {
                from: 'top',
                align: 'right'
            }
        });
    }

    public custom(options) {
        $.notify({
            icon: options.icon,
            message: options.message
        }, {
            type: options.type,
            timer: options.timer,
            placement: {
                from: options.from,
                align: options.align
            }
        });
    }
}
