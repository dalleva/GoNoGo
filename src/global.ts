import { Options as ToastOptions } from 'angular2-notifications';

export const GlobalVariables = Object.freeze({

    BROWSER_REQUIREMENTS_NOT_STRICT: Object.freeze({ msie: '12', safari: '7', chrome: '59' }),

    TOAST_OPTIONS: Object.freeze({
            position: ['bottom', 'right'],
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            timeOut: 5000,
            lastOnBottom: true
        } as ToastOptions),

    IMAGES_PATH: 'assets/images/'

});
