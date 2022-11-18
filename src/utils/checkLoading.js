import axios from 'axios';

var numberOfAjaxCAllPending = 0;

var loadingStatus = false;
// const [loading, setLoading] = useState(false);
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    numberOfAjaxCAllPending++;
    // show loader
    loadingStatus = true;
    document.body.classList.add('loading-indicator');
    // const loader = `<div class="" style="background-color: rgb(41, 128, 185); width: 100vw; height: 100vh; position: absolute; left: 0px; top: 0px; display: flex; justify-content: center; align-items: center; z-index: 111;"><div class="sl-spinner3"><div class="sl-loader" style="--size:1;"><div class="sl-loader-parent"><div class="sl-circle" style="--bg:#FFFFFF; --border:#FFFFFF50;"></div></div></div><div class="sl-loader-title" style="--cl:#FFFFFF;"><span>spinner-default</span></div></div></div>`;
    // const loaderElement = document.createElement('div');
    // loaderElement.classList.add('loader-wrapper');
    // document.querySelector('#root').appendChild(loaderElement);
    return config;
}, function (error) {
    numberOfAjaxCAllPending--
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    numberOfAjaxCAllPending--;
    // 
    if (numberOfAjaxCAllPending === 0) {
        //hide loader
        document.body.classList.remove('loading-indicator');
        // if (document.querySelector('#root').querySelector('.loader-wrapper'))
        //     document.querySelector('#root').querySelector('.loader-wrapper').remove();
    }
    return response;
}, function (error) {
    numberOfAjaxCAllPending--;
    if (numberOfAjaxCAllPending === 0) {
        //hide loader
        document.body.classList.remove('loading-indicator');
        // if (document.querySelector('#root').querySelector('.loader-wrapper'))
        //     document.querySelector('#root').querySelector('.loader-wrapper').remove();
        // loadingStatus = false;
    }
    return Promise.reject(error);
});
// 


export default loadingStatus;