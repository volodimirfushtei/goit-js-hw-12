import{a as g,S as h,i as p}from"./assets/vendor-ee72e1a4.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const y="/goit-js-hw-12/assets/bi_x-octagon-4f06a8ee.svg",u="/goit-js-hw-12/assets/closebi_x-lg-de5d3efc.svg";let m=1;const v=15,L="45065033-34b48c3d2ea0e7ba665d8e642";async function b(s){if(!s)throw new Error("Search query is required");try{const i=(await g.get("https:/pixabay.com/api/",{params:{key:L,q:s,page:m,per_page:v}})).data;return m++,i}catch(t){throw console.error("Error fetching images:",t),t}}function E(s){const t=document.getElementById("image-container");if(t.innerHTML="",s.length>0){const i=s.map(e=>`
      <li class="gallery-link">
        <a class="card-link" href="${e.largeImageURL}" data-lightbox="gallery" data-title="${e.tags}">
          <div class="card">
            <img class="image" src="${e.webformatURL}" alt="${e.tags}">
            <div class="card-points">
              <div class="card-text"><p>Likes: ${e.likes}</p></div>
              <div class="card-text"><p>Views: ${e.views}</p></div>
              <div class="card-text"><p>Comments: ${e.comments}</p></div>
              <div class="card-text"><p>Downloads: ${e.downloads}</p></div>
            </div>
          </div>
        </a>
      </li>
    `);t.innerHTML=i.join(""),new h('[data-lightbox="gallery"]').refresh()}else t.innerHTML=""}document.addEventListener("DOMContentLoaded",function(){const s=document.querySelector("#search-form");document.getElementById("loader"),s.addEventListener("submit",i);function t(r,l,n=3e3){p.show({position:"topRight",message:r,backgroundColor:"#EF4040",messageColor:"#fff",messageSize:"16",maxWidth:432,iconUrl:y,timeout:n,class:"iziToast-custom",onOpening:function(w,f){const d=document.createElement("div");d.className="custom-icon",d.style.backgroundImage=`url(${l})`,f.querySelector(".iziToast-message").appendChild(d)}})}function i(r){r.preventDefault();const l=document.querySelector("#search-input").value.trim();l?(e(),o(),b(l).then(n=>{c(),n.hits&&n.hits.length>0?E(n.hits):a()}).catch(n=>{c(),console.error("Error searching images:",n),t(n.message,u,3e3),e()})):a(),s.reset()}function a(){t("Sorry, there are no images matching your search query. Please try again!",u,3e3),e()}function e(){const r=document.getElementById("image-container");r.innerHTML=""}function o(){const r=document.getElementById("loader");r?r.classList.add("visible"):console.error("Loader not found")}function c(){const r=document.getElementById("loader");r?r.classList.remove("visible"):console.error("Loader not found")}});
//# sourceMappingURL=commonHelpers.js.map
