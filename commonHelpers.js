import{a as b,S as E,i as w}from"./assets/vendor-ee72e1a4.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(r){if(r.ep)return;r.ep=!0;const t=n(r);fetch(r.href,t)}})();const I="/goit-js-hw-12/assets/bi_x-octagon-4f06a8ee.svg",u="/goit-js-hw-12/assets/closebi_x-lg-de5d3efc.svg";async function p(e,o=1,n=15){const s="45065033-34b48c3d2ea0e7ba665d8e642",r="https://pixabay.com/api/",t={key:s,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:n};try{return(await b.get(r,{params:t})).data.hits}catch(a){return x(a),[]}}function x(e){if(e.response)switch(e.response.status){case 404:console.error("Images not found"),alert("Images not found");break;case 500:console.error("Server error"),alert("Server error");break;default:console.error(`Error: ${e.response.status}`),alert(`Error: ${e.response.status}`)}else e.request?(console.error("Check your internet connection:"),alert("Internet connection lost !")):(console.error("Error setting",e.message),alert("Error setting"))}function h(e){const o=document.getElementById("image-container");if(Array.from(o.querySelectorAll(".gallery-link")),e.length>0){const s=e.map(t=>`
      <li class="gallery-link">
        <a class="card-link" href="${t.largeImageURL}" data-lightbox="gallery" data-title="${t.tags}">
          <div class="card">
          <div id="loader" class="loader" aria-live="polite" role="status"></div>
            <img class="image" src="${t.webformatURL}" alt="${t.tags}">
            <div class="card-points">
              <div class="card-text"><p>Likes: ${t.likes}</p></div>
              <div class="card-text"><p>Views: ${t.views}</p></div>
              <div class="card-text"><p>Comments: ${t.comments}</p></div>
              <div class="card-text"><p>Downloads: ${t.downloads}</p></div>
            </div>
          </div>
        </a>
      </li>
    `).join("");o.innerHTML+=s,new E('[data-lightbox="gallery"]').refresh()}document.querySelectorAll(".image").forEach(s=>{s.onload=()=>{s.previousElementSibling.style.display="none"}})}const y=document.querySelector("#search-form");document.getElementById("loader");const i=document.getElementById("loadButton"),L=document.getElementById("image-container");let c="",l=1;const v=15;function g(e,o,n=3e3){w.show({position:"topRight",message:e,backgroundColor:"#EF4040",messageColor:"#fff",messageSize:"16",maxWidth:432,iconUrl:I,timeout:n,class:"iziToast-custom",onOpening:function(s,r){const t=document.createElement("div");t.className="custom-icon",t.style.backgroundImage=`url(${o})`,r.querySelector(".iziToast-message").appendChild(t)}})}async function S(e){if(e.preventDefault(),c=document.querySelector("#search-input").value.trim(),c){l=1,d();try{const o=await p(c,l,v);o.length>0?(h(o),i.style.display="block"):m()}catch(o){console.error("Error searching images:",o),g(o.message,u,3e3),d()}}else m();y.reset()}function m(){g("Sorry, there are no images matching your search query. Please try again!",u,3e3),d()}function d(){L.innerHTML=""}async function q(){try{const e=await p(c,l,v);e.length>0?(h(e),setTimeout(f,500),f(),l++,i.style.display="block"):(i.style.display="none",g("We're sorry, but you've reached the end of search results.",u,3e3))}catch(e){console.error("Error fetching images:",e),i.textContent="Failed to load more"}}y.addEventListener("submit",S);i.addEventListener("click",q);function C(){const e=document.querySelector(".card");return e?e.getBoundingClientRect().height:0}function f(){const e=C();e>0&&window.scrollBy({top:2*e,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
