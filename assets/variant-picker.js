if(!customElements.get("variant-picker")){class t extends HTMLElement{constructor(){super(),this.selectors={container:"[data-variant-picker]",productInfo:".m-product-info--wrapper",error:".m-product-form-message",variantIdInput:'[name="id"]',pickerFields:["[data-picker-field]"],optionNodes:[".m-product-option--node"],productSku:"[data-variant-sku]",productAvailability:"[data-availability]",shareUrlInput:"[data-share-url]",stockCountdown:".prod__stock-countdown",productWrapper:".m-main-product--wrapper"},this.container=this.closest(this.selectors.container),this.productWrapper=this.closest(this.selectors.productWrapper),this.productInfo=this.closest(this.selectors.productInfo),this.domNodes=queryDomNodes(this.selectors,this.productInfo)}connectedCallback(){this.setupData()}async setupData(){let t=(window._themeProducts||{})[this.container.dataset.productId];this.productId=this.container.dataset.productId,this.sectionId=this.container.dataset.section,this.productUrl=this.container.dataset.productUrl,this.productHandle=this.container.dataset.productHandle,this.section=this.container.closest(`[data-section-id="${this.sectionId}"]`),this.variantData=this.getVariantData(),this.productData=Object.assign(await this.getProductJson(),t),this.showFeaturedMedia="true"===this.dataset.showFeaturedMedia,this.enableVariantGroupImages="true"===this.container.dataset.enableVariantGroupImages,this.enableVariantGroupImages&&(this.variantGroupImages=this.getVariantGroupImageData());const e=this.productInfo.querySelector(this.selectors.variantIdInput).value;this.currentVariant=this.productData.variants.find((t=>t.id===Number(e))),this.productData.current_variant_id=this.currentVariant&&this.currentVariant.id,this.productData.initialVariant=this.currentVariant,this.currentVariant&&(this.getDataImageVariant(this.currentVariant.id),this.hideSoldOutAndUnavailableOptions(),this.updateButton(!this.currentVariant.available,"",!1)),this.getMediaGallery(),document.addEventListener("matchMobile",(()=>{this.getMediaGallery()})),document.addEventListener("unmatchMobile",(()=>{this.getMediaGallery()})),this.initOptionSwatches(),this.addEventListener("change",this.onVariantChange)}getMediaGallery(){this.mediaGallery=this.section.querySelectorAll("media-gallery"),this.check=setInterval((()=>{this.mediaGallery&&this.mediaGallery.forEach((t=>{"none"!==window.getComputedStyle(t).display&&t.mediaMode&&(clearInterval(this.check),this.layout=t.layout,this.media=t,"slider"===t.mediaMode?(this.slides=t.slider.slides,t.navSlider&&(this.slidesNav=t.navSlider.slides)):this.mediaItems=t.querySelectorAll(".m-product-media--item"),(!this.showFeaturedMedia||this.enableVariantGroupImages&&this.variantGroupImages.enable)&&this.updateMedia())}))}),100)}onVariantChange(){this.getSelectedOptions(),this.getSelectedVariant(),this.updateButton(!0,"",!1),this.updatePickupAvailability(),this.removeErrorMessage(),this.currentVariant?(this.getDataImageVariant(this.currentVariant.id),this.updateMedia(),this.updateBrowserHistory(),this.updateVariantInput(),this.updateProductMeta(),this.updatePrice(),this.updateButton(!this.currentVariant.available,window.MinimogStrings.soldOut),this.hideSoldOutAndUnavailableOptions()):(this.updateButton(!0,"",!0),this.setUnavailable()),window.MinimogEvents.emit(`${this.productId}__VARIANT_CHANGE`,this.currentVariant,this)}getDataImageVariant(t){this.variantGroupImages&&this.variantGroupImages.enable&&(this.currentVariantMedia=this.variantGroupImages.mapping.find((e=>Number(e.id)===t)).media)}getProductJson(){return fetch(this.productUrl+".js").then((t=>{if(t.ok)return t.json();return JSON.parse(this.productWrapper.querySelector("#productData[type='application/json']").textContent)})).catch((t=>{}))}getSelectedVariant(){let t=getVariantFromOptionArray(this.productData,this.options),e=[...this.options];t||(e.pop(),t=getVariantFromOptionArray(this.productData,e),t||(e.pop(),t=getVariantFromOptionArray(this.productData,e)),this.options=[...t.options],this.updateSelectedOptions()),this.currentVariant=t}getSelectedOptions(){const t=Array.from(this.querySelectorAll("[data-picker-field]"));this.options=t.map((t=>"radio"===t.dataset.pickerField?Array.from(t.querySelectorAll("input")).find((t=>t.checked)).value:t.querySelector("select").value))}updateSelectedOptions(){this.domNodes.pickerFields.forEach(((t,e)=>{if(t.dataset.selectedValue!==this.options[e]){const a=t.querySelector(`input[value="${this.options[e].replace(/["\\]/g,"\\$&")}"]`);a&&(a.checked=!0,t.updateSelectedValue())}}))}updateMedia(){if(!this.currentVariant)return;let t=[],e=[],a=0,i=0,s=0,r=0;if(this.variantGroupImages&&this.variantGroupImages.enable)if("slider"===this.media.mediaMode&&this.slides)this.slides.forEach((e=>{const s=e.querySelector("[data-media-id]").dataset.mediaId;this.currentVariantMedia&&this.currentVariantMedia.length>0?(this.currentVariantMedia.includes(s)&&(e.dataset.swiperSlideIndex=a++,e.dataset.index=i++,"0"===e.dataset.swiperSlideIndex&&e.classList.add("swiper-slide-active"),t.push(e)),e.classList.contains("media-type-image")||(e.dataset.swiperSlideIndex=a++,e.dataset.index=i++,t.push(e))):(e.dataset.swiperSlideIndex=a++,e.dataset.index=i++,t.push(e))})),this.media.slider.removeAllSlides(),this.media.slider.appendSlide(t),"layout-7"==this.layout?this.media.slider.slideToLoop(1):this.media.slider.slideToLoop(0),this.media.handleSlideChange(),this.slidesNav&&this.slidesNav.forEach((t=>{const a=t.querySelector("[data-media-id]").dataset.mediaId;this.currentVariantMedia&&this.currentVariantMedia.length>0?(this.currentVariantMedia.includes(a)&&(t.dataset.swiperSlideIndex=s++,t.dataset.index=r++,"0"===t.dataset.swiperSlideIndex&&t.classList.add("swiper-slide-thumb-active"),e.push(t)),t.classList.contains("media-type-image")||(t.dataset.swiperSlideIndex=s++,t.dataset.index=r++,e.push(t))):(t.dataset.swiperSlideIndex=s++,t.dataset.index=r++,t.classList.remove("swiper-slide-thumb-active"),"0"===t.dataset.swiperSlideIndex&&t.classList.add("swiper-slide-thumb-active"),e.push(t))})),this.media.navSlider&&this.media.navSlider.removeAllSlides(),this.media.navSlider&&this.media.navSlider.appendSlide(e),this.media.navSlider&&this.media.navSlider.slideToLoop(0),this.media&&this.media.removeAttribute("data-media-loading"),this.media&&(this.media.firstElementChild.style.opacity=1);else{let e=0;const a=this.media.querySelector(".m-product-media--list");this.mediaItems&&this.mediaItems.forEach((i=>{const s=i.querySelector("[data-media-id]").dataset.mediaId;this.currentVariantMedia&&this.currentVariantMedia.length>0?(this.currentVariantMedia.includes(s)&&(i.dataset.index=e++,t.push(i)),i.classList.contains("media-type-image")||(i.dataset.index=e++,t.push(i))):(i.dataset.index=e++,t.push(i)),a.innerHTML="",t.forEach((t=>{if("layout-2"==this.layout){t.classList.remove("m-col-span-2");0==t.dataset.index%3&&t.classList.add("m-col-span-2")}a.append(t)}))})),this.media&&this.media.removeAttribute("data-media-loading"),this.media&&(this.media.firstElementChild.style.opacity=1)}else{parseInt(this.media&&this.media.dataset.mediaSize)>0&&this.media.setActiveMedia(this.currentVariant)}const n=[];t.length>0&&t.forEach(((t,e)=>{if("image"===t.dataset.mediaType){const e=t.querySelector(".m-product-media").dataset;n.push({src:e.mediaSrc,width:parseInt(e.mediaWidth),height:parseInt(e.mediaHeight),alt:e.mediaAlt,id:t.dataset.index})}else n.push({html:`<div class="pswp__${t.dataset.mediaType}">${t.innerHTML}</div>`,type:t.dataset.mediaType,id:t.dataset.index})})),this.media&&this.media.lightbox&&this.media.lightbox.destroy(),this.media&&this.media.handlePhotoswipe(n),this.media&&this.media.initPhotoswipe()}updateBrowserHistory(){this.currentVariant&&"false"!==this.dataset.updateUrl&&window.history.replaceState({},"",`${this.productUrl}?variant=${this.currentVariant.id}`)}updateVariantInput(){document.querySelectorAll(`#product-form-${this.sectionId}, #product-form-installment`).forEach((t=>{const e=t.querySelector(this.selectors.variantIdInput);e.value=this.currentVariant.id,e.dispatchEvent(new Event("change",{bubbles:!0}))}))}updatePickupAvailability(){const t=this.section.querySelector("pickup-availability");t&&(this.currentVariant&&this.currentVariant.available?t.fetchAvailability(this.currentVariant.id):(t.removeAttribute("available"),t.innerHTML=""))}removeErrorMessage(){const t=this.closest("section");if(!t)return;const e=t.querySelector("product-form");e&&e.handleErrorMessage()}updatePrice(){const t="m-price--on-sale",e="m-price--sold-out",a=this.productInfo.querySelector(".main-product__block-price");if(!a)return;const i=window.MinimogSettings.money_format,{priceWrapper:s,salePrice:r,unitPrice:n,compareAtPrice:d,saleBadge:o,saleAmount:l,unitPriceWrapper:c}=queryDomNodes({priceWrapper:".m-price",salePrice:".m-price-item--sale",compareAtPrice:[".m-price-item--regular"],unitPrice:".m-price__unit",unitPriceWrapper:".m-price__unit-wrapper",saleBadge:".m-price__badge-sale",saleAmount:"[data-saved-price]"},a),{compare_at_price:u,price:h,unit_price_measurement:p}=this.currentVariant,m=s.dataset.saleBadgeType,v=u&&u>h,g=!this.currentVariant.available;if(v?s.classList.add(t):s.classList.remove(t),g?s.classList.add(e):s.classList.remove(e),s&&s.classList.remove("visibility-hidden"),r&&(r.innerHTML=formatMoney(h,i)),d.length&&u>h?d.forEach((t=>t.innerHTML=formatMoney(u,i))):d.forEach((t=>t.innerHTML=formatMoney(h,i))),o&&u>h&&"text"!==m){let t;if("fixed_amount"===m)t=formatMoney(u-h,i);else{const e=100*(u-h)/u;t=Math.round(e)+"%"}l.textContent=t}if(p&&n){c.classList.remove("m:hidden");const t=`<span>${formatMoney(this.currentVariant.unit_price,i)}</span>/<span data-unit-price-base-unit>${this._getBaseUnit()}</span>`;n.innerHTML=t}else c.classList.add("m:hidden")}_getBaseUnit=()=>1===this.currentVariant.unit_price_measurement.reference_value?this.currentVariant.unit_price_measurement.reference_unit:this.currentVariant.unit_price_measurement.reference_value+this.currentVariant.unit_price_measurement.reference_unit;updateButton(t=!0,e,a=!0){const i=document.querySelectorAll(`.product-form-${this.sectionId}`);i&&i.forEach((a=>{const i=a.querySelector('[name="add"]'),s=a.querySelector(".m-product-dynamic-checkout"),r=a.querySelector('[name="add"] > .m-add-to-cart--text');i&&(t?(i.setAttribute("disabled","disabled"),i.classList.add("disabled"),s&&s.classList.add("disabled"),e&&(r.textContent=e)):(i.removeAttribute("disabled"),i.classList.remove("disabled"),s&&s.classList.remove("disabled"),r.textContent=window.MinimogStrings.addToCart))}))}updateProductMeta(){const{available:t,sku:e}=this.currentVariant,{inStock:a,outOfStock:i}=window.MinimogStrings,s=this.section.querySelector(this.selectors.productAvailability),r=this.section.querySelector(this.selectors.productSku);if(r&&(r.textContent=e||"N/A"),s){const e=t?"remove":"add";s.textContent=t?a:i,s.classList[e]("m-product-availability--outofstock")}}setUnavailable(){const t=document.getElementById(`product-form-${this.sectionId}`),e=t.querySelector('[name="add"]'),a=t.querySelector('[name="add"] > span.m-add-to-cart--text'),i=this.section.querySelector(".m-price");e&&(a.textContent=window.MinimogStrings.unavailable,i&&i.classList.add("visibility-hidden"))}hideSoldOutAndUnavailableOptions=()=>{const t="m-product-option--node__soldout",e="m-product-option--node__unavailable",a=this.currentVariant,{optionNodes:i}=this.domNodes,{productData:s,productData:{variants:r,options:{length:n}}}=this;i.forEach((i=>{const{optionPosition:d,value:o}=i.dataset,l=Number(d),c="OPTION"===i.tagName;let u=[];if(l===n){const t=Array.from(a.options);t[n-1]=o,u.push(getVariantFromOptionArray(s,t))}else u=r.filter((t=>t.options[l-1]===o&&t.options[l-2]===a["option"+(l-1)]));if(u=u.filter(Boolean),u.length){i.classList.remove(e),c&&i.removeAttribute("disabled");const a=u.every((t=>!1===t.available))?"add":"remove";i.classList[a](t)}else i.classList.add(e),c&&i.setAttribute("disabled","true")}))};getVariantData(){return this.variantData=this.variantData||JSON.parse(this.container.querySelector('#productVariants[type="application/json"]').textContent),this.variantData}getVariantGroupImageData(){return this.variantGroupImages=this.variantGroupImages||JSON.parse(this.container.querySelector('#variantGroup[type="application/json"]').textContent),this.variantGroupImages}initOptionSwatches(){const{_colorSwatches:t=[],_imageSwatches:e=[]}=window.MinimogSettings;this.domNodes.optionNodes&&this.domNodes.optionNodes.forEach((a=>{const{optionType:i,optionPosition:s,value:r}=a.dataset,n=r.toLowerCase(),d=this.variantData.find((t=>t[`option${s}`]===r)),o=d&&d.featured_image&&d.featured_image.src?getSizedImageUrl(d.featured_image.src,"100x"):null,l=e.find((t=>t.key===n))?e.find((t=>t.key===n)).value:"",c=t.find((t=>t.key===n))?t.find((t=>t.key===n)).value:"";switch((o||l)&&a.querySelector("label")&&a.querySelector("label").classList.add("has-bg-img"),i){case"default":a.querySelector("label").style.backgroundImage=`url(${l||o||""})`,a.querySelector("label").classList.remove("option-loading");break;case"image":a.querySelector("label").style.backgroundImage=`url(${o||l||""})`,a.querySelector("label").classList.remove("option-loading");break;case"color":a.querySelector("label").style.backgroundColor=c||n,l&&(a.querySelector("label").style.backgroundImage=`url(${l})`),a.querySelector("label").classList.remove("option-loading")}}))}}customElements.define("variant-picker",t)}if(!customElements.get("variant-button")){class t extends HTMLElement{constructor(){super(),this.selectedSpan=this.querySelector(".option-label--selected"),this.addEventListener("change",this.updateSelectedValue)}updateSelectedValue(){this.value=Array.from(this.querySelectorAll("input")).find((t=>t.checked)).value,this.setAttribute("data-selected-value",this.value),this.selectedSpan&&(this.selectedSpan.textContent=this.value)}}if(customElements.define("variant-button",t),!customElements.get("variant-select")){class e extends t{constructor(){super()}updateSelectedValue(){this.value=this.querySelector("select").value,this.setAttribute("data-selected-value",this.value),this.selectedSpan&&(this.selectedSpan.textContent=this.value)}}customElements.define("variant-select",e)}if(!customElements.get("variant-image")){class e extends t{constructor(){super()}}customElements.define("variant-image",e)}if(!customElements.get("variant-color")){class e extends t{constructor(){super()}}customElements.define("variant-color",e)}}