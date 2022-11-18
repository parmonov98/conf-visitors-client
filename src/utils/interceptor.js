import axios from 'axios';

// axios.interceptors.request.use(function (config) {
//
//     // spinning start to show
//     // UPDATE: Add this code to show global loading indicator
//     document.body.classList.add('loading-indicator');
//     const loader = `<div class="loader-wrapper" style="background-color: rgb(41, 128, 185); width: 100vw; height: 100vh; position: absolute; left: 0px; top: 0px; display: flex; justify-content: center; align-items: center; z-index: 111;"><div class="sl-spinner3"><div class="sl-loader" style="--size:1;"><div class="sl-loader-parent"><div class="sl-circle" style="--bg:#FFFFFF; --border:#FFFFFF50;"></div></div></div><div class="sl-loader-title" style="--cl:#FFFFFF;"><span>spinner-default</span></div></div></div>`;
//     document.body.appendChild(loader);
//
//     return config
// }, function (error) {
//     return Promise.reject(error);
// });
//
// axios.interceptors.response.use(function (response) {
//
//     // spinning hide
//     // UPDATE: Add this code to hide global loading indicator
//     document.body.classList.remove('loading-indicator');
//     document.body.querySelector('.loader-wrapper').remove();
//     return response;
// }, function (error) {
//     return Promise.reject(error);
// });