class MAskQuestion extends HTMLElement{constructor(){super(),this.selectors={openButton:"[data-open-ask-question]",content:".m-form-ask-question",container:".m-product-addon",formSuccess:".form-ask__success"}}connectedCallback(){this.domNodes=queryDomNodes(this.selectors,this),this.container=document.querySelector(this.selectors.container),this.domNodes.content&&this.domNodes.content.innerHTML&&(this.content=this.domNodes.content.innerHTML,this.init())}init(){this.showSuccessMessage(),this.modal=new MinimogTheme.Modal,addEventDelegate({selector:this.selectors.openButton,handler:e=>{if(e.preventDefault(),this.content){const e=document.createElement("DIV");e.innerHTML=this.content,this.modal.appendChild(e),this.modal.setWidth("500px"),this.modal.setSizes("m-form-ask-question"),this.container.classList.remove("m:hidden"),this.modal.open()}}})}showSuccessMessage(){const e=this.container.querySelector(this.selectors.formSuccess);e&&(MinimogTheme.Notification.show({target:document.body,method:"appendChild",type:"success",message:e.dataset.message,delay:2e3,sticky:!0}),setTimeout((()=>{const e=window.location.origin+window.location.pathname;window.history.replaceState({},document.title,e)}),2500))}}customElements.define("m-ask-question",MAskQuestion);