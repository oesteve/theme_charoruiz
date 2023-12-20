customElements.get("media-gallery")||customElements.define("media-gallery",class extends HTMLElement{constructor(){super(),this.selectors={container:".m-main-product--wrapper",slider:".swiper-container",sliderPagination:".swiper-pagination",sliderPrevEl:".swiper-button-prev",sliderNextEl:".swiper-button-next",navSlider:".nav-swiper-container",medias:[".m-product-media--item"],mediaWrapper:".m-product-media--wrapper",mediaZoomIns:[".m-product-media__zoom-in"],videos:[".media-video"],variantIdNode:'[name="id"]',featuredImage:".m-product-media"},this.productSlideCommonConfigs={loop:!0},this.productSlideConfigs={mobile:{autoHeight:!0,loop:!0},"quick-view":{autoHeight:!0},"layout-4":{},"layout-5":{slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,watchSlidesVisibility:!0,breakpoints:{768:{slidesPerView:2,slidesPerGroup:1,spaceBetween:10}}},"layout-6":{},"layout-7":{slidesPerView:3,speed:500,centeredSlides:!0}},this.container=this.closest(this.selectors.container),this.domNodes=queryDomNodes(this.selectors,this),this.enableVideoAutoplay="true"===this.dataset.enableVideoAutoplay,this.enableImageZoom="true"===this.dataset.enableImageZoom,this.enableVariantGroupImages="true"===this.dataset.enableVariantGroupImages,this.onlyMedia="true"===this.dataset.onlyMedia,this.container&&(this.view=this.container.dataset.view||"product-template"),this.section=this.closest(`[data-section-id="${this.sectionId}"]`),this.layout=this.dataset.layout}connectedCallback(){this.checkMediaMode(),document.addEventListener("matchMobile",(()=>{this.checkMediaMode()})),document.addEventListener("unmatchMobile",(()=>{this.checkMediaMode()}))}getProductSliderConfig(e){const t=this.productSlideConfigs[e]||this.productSlideConfigs["layout-4"];return Object.assign({},this.productSlideCommonConfigs,t)}checkMediaMode(){this.visible="none"!==window.getComputedStyle(this).display,this.visible&&this.setupData()}async setupData(){this.productHandle=this.dataset.productHandle,this.productUrl=this.dataset.productUrl,this.productData=await this.getProductJson(this.productUrl);const{productData:e,productData:{variants:t}={}}=this,i=this.container.querySelector(this.selectors.variantIdNode);if(e&&i){let s=Number(i.value);s||(s=e.selected_or_first_available_variant.id);const a=t.find((e=>e.id===s))||t[0];this.productData.initialVariant=a,!this.productData.selected_variant&&i.dataset.selectedVariant&&(this.productData.selected_variant=t.find((e=>e.id===Number(i.dataset.selectedVariant)))),this.init()}}init(){const e=this.container.querySelector("variant-picker");switch(this.view){case"product-template":this.mediaMode="grid-column",this.handlePhotoswipe(),this.initPhotoswipe(),this.initSlider();break;case"featured-product":this.initSlider();break;case"card":case"sticky-atc":this.mediaMode="featured-image";break;case"quick-view":this.mediaMode="featured-image",this.initSlider()}this.handleAutoplayVideo(),e||(this.initPhotoswipe(),this.handleSlideChange(),this.removeAttribute("data-media-loading"),this.firstElementChild.style.opacity=1)}initSlider(){if(!this.domNodes.slider)return;this.mediaMode="slider";const{domNodes:{slider:e,sliderPagination:t,navSlider:i,sliderNextEl:s,sliderPrevEl:a}}=this;let o=0,r={},d={};this.productData.initialVariant&&this.productData.selected_variant&&this.productData.initialVariant.featured_media&&(o=this.productData.initialVariant.featured_media.position-1||0),r={loop:!1,initialSlide:o,slidesPerView:5,freeMode:!0,spaceBetween:"layout-6"===this.layout?5:10,threshold:2,watchSlidesVisibility:!0,watchSlidesProgress:!0,breakpoints:{1024:{direction:"layout-6"===this.layout?"vertical":"horizontal"}},on:{init:()=>i.style.opacity=1}},this.navSlider=i?new MinimogLibs.Swiper(i,r):null;const l=this.navSlider?{thumbs:{swiper:this.navSlider}}:{};d=Object.assign({},this.getProductSliderConfig(this.layout),{initialSlide:o,autoHeight:!0,navigation:{nextEl:s,prevEl:a},threshold:2,loop:!this.enableVariantGroupImages,pagination:{el:t,clickable:!0,type:"bullets"},...l,on:{init:()=>{e.style.opacity=1,this.domNodes=queryDomNodes(this.selectors,this.container)}}}),this.slider=new MinimogLibs.Swiper(e,d),this.enableVariantGroupImages||this.handleSlideChange()}handleSlideChange(){if(!this.slider)return;let e=!0,t="",i=[];this.slider.on("slideChange",(s=>{window.pauseAllMedia(this);try{const{slides:a,activeIndex:o}=s;a[o]&&this.playActiveMedia(a[o]),i=[o],"layout-5"!==this.layout&&"layout-7"!==this.layout||i.push(o+1);for(let e of i){const i=a[e];if(i&&(t=i.dataset.mediaType),"model"===t)break}"model"===t?(this.slider.allowTouchMove=!1,e=!1):(e||(this.slider.allowTouchMove=!0),e=!0)}catch(e){}}))}handleAutoplayVideo(){if("slider"===this.mediaMode){const{slides:e,activeIndex:t}=this.slider,i=e[t],s=i&&i.dataset.mediaType;if("video"===s||"external_video"==s){const e=i.querySelector("deferred-media"),t="true"===e.dataset.autoPlay;e&&t&&e.loadContent(!1)}}else{const e=this.querySelectorAll(".m-product-media--item");e&&e.forEach((e=>{const t=e.dataset.mediaType;if("video"===t||"external_video"===t){const t=e.querySelector("deferred-media"),i="true"===t.dataset.autoPlay;t&&i&&t.loadContent(!1)}}))}}playActiveMedia(e){const t=e.querySelector("deferred-media");if(!t)return;if("true"===t.dataset.autoPlay)if(t.getAttribute("loaded")){const e=t.querySelector("video, model-viewer, iframe");if(e.classList.contains("js-youtube")){const t=e.src.indexOf("?")>-1?"&":"?";e.src+=t+"autoplay=1&mute=1"}else if(e.classList.contains("js-vimeo")){const t=e.src.indexOf("?")>-1?"&":"?";e.src+=t+"autoplay=1&muted=1"}else e.play()}else t.loadContent(!1)}handlePhotoswipe(e=[]){if(!this.enableImageZoom)return;const t=[],i=this.querySelectorAll(".m-product-media--item:not(.swiper-slide-duplicate)");i&&i.forEach(((e,i)=>{if("image"===e.dataset.mediaType){const i=e.querySelector(".m-product-media").dataset;t.push({src:i.mediaSrc,width:parseInt(i.mediaWidth),height:parseInt(i.mediaHeight),alt:i.mediaAlt,id:e.dataset.index})}else t.push({html:`<div class="pswp__${e.dataset.mediaType}">${e.innerHTML}</div>`,type:e.dataset.mediaType,id:e.dataset.index})})),this.lightbox=new MinimogLibs.PhotoSwipeLightbox({dataSource:e.length>0?e:t,bgOpacity:1,close:!1,zoom:!1,arrowNext:!1,arrowPrev:!1,counter:!1,preloader:!1,pswpModule:MinimogLibs.PhotoSwipeLightbox.PhotoSwipe}),this.lightbox.addFilter("thumbEl",((e,t,i)=>{const s=this.querySelector('[data-index="'+t.id+'"]:not(.swiper-slide-duplicate) img');return s||e})),this.lightbox.addFilter("placeholderSrc",((e,t)=>{const i=this.querySelector('[data-index="'+t.data.id+'"]:not(.swiper-slide-duplicate) img');return i?i.src:e})),this.lightbox.on("change",(()=>{if(window.pauseAllMedia(this),this.slider){const e=this.lightbox.pswp.currIndex;this.enableVariantGroupImages?this.slider.slideTo(e,100,!1):this.slider.slideToLoop(e,100,!1)}})),this.lightbox.on("pointerDown",(e=>{"model"===this.lightbox.pswp.currSlide.data.type&&e.preventDefault()}));const s={name:"m-close",order:11,isButton:!0,html:'<svg class="m-svg-icon--large" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>',onClick:(e,t,i)=>{i.close()}},a={name:"m-arrowNext",className:"sf-pswp-button--arrow-next",order:12,isButton:!0,html:'<svg fill="currentColor" width="14px" height="14px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M218.101 38.101L198.302 57.9c-4.686 4.686-4.686 12.284 0 16.971L353.432 230H12c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h341.432l-155.13 155.13c-4.686 4.686-4.686 12.284 0 16.971l19.799 19.799c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L235.071 38.101c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg>',onClick:(e,t,i)=>{i.next()}},o={name:"m-arrowPrev",className:"sf-pswp-button--arrow-prev",order:10,isButton:!0,html:'<svg width="14px" height="14px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M229.9 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L94.569 282H436c6.627 0 12-5.373 12-12v-28c0-6.627-5.373-12-12-12H94.569l155.13-155.13c4.686-4.686 4.686-12.284 0-16.971L229.9 38.101c-4.686-4.686-12.284-4.686-16.971 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971L212.929 473.9c4.686 4.686 12.284 4.686 16.971-.001z"></path></svg>',onClick:(e,t,i)=>{i.prev()}};this.lightbox.on("uiRegister",(()=>{this.lightbox.pswp.ui.registerElement(s),this.onlyMedia||(this.lightbox.pswp.ui.registerElement(o),this.lightbox.pswp.ui.registerElement(a))}))}initPhotoswipe(){this.enableImageZoom&&(this.lightbox.init(),addEventDelegate({selector:this.selectors.medias[0],context:this,handler:(e,t)=>{e.preventDefault();const i=t.classList.contains("media-type-image"),s=e.target.closest(this.selectors.mediaZoomIns[0]);if(i||s){const e=Number(t.dataset.index)||0;this.lightbox.loadAndOpen(e)}}}))}setActiveMedia(e){if(e)if("slider"===this.mediaMode){if(e.featured_media){const t=e.featured_media.position||0;this.slider&&this.slider.wrapperEl&&this.slider.slideToLoop(t-1)}}else if("featured-image"===this.mediaMode){if(e.featured_image){const t=e.featured_image.src,{featuredImage:i}=this.domNodes,s=i.querySelector("img");s&&t&&(s.src=t)}}else if("featured-product"!=this.view&&e&&e.featured_media){const t=this.querySelector(`[data-media-id="${e.featured_media.id}"]`);t&&this.scrollIntoView(t)}}scrollIntoView(e){e.scrollIntoView({behavior:"smooth"})}getProductJson(e){return fetch(e+".js").then((e=>{if(e.ok)return e.json();return JSON.parse(this.container.querySelector("#productData[type='application/json']").textContent)})).catch((e=>{}))}});