class Megamenu{constructor(e){this.selectors={announcementBar:".m-announcement-bar",hamburgerButtons:".m-hamburger-box",desktopMenuItems:[".m-menu__item"],desktopSubMenus:".m-mega-menu",headerMobile:".m-header__mobile",menuDrawer:"#m-menu-drawer",menuDrawerContent:".m-menu-drawer__content",menu:".m-menu-mobile",menuItems:[".m-menu-mobile__item"],megaMenuMobile:[".m-megamenu-mobile"],backDrop:".m-menu-drawer__backdrop"},this.menuSelectors={subMenu:".m-mega-menu"},this.activeDesktopMenuItem=null,this.sliders={},this.container=e,this.transitionDuration=0,this.domNodes=queryDomNodes(this.selectors),this.menuData=[...this.domNodes.desktopMenuItems].map((e=>({header:e.closest("header"),item:e,...queryDomNodes(this.menuSelectors,e),active:!1}))),this.init(),MinimogTheme=MinimogTheme||{},MinimogTheme.headerSliders=this.sliders}init(){this.domNodes.hamburgerButtons.addEventListener("click",(e=>{this.domNodes.hamburgerButtons.classList.contains("active")?this.closeMenu():this.openMenu(),this.domNodes.hamburgerButtons.classList.toggle("active")})),this.domNodes.backDrop.addEventListener("click",(e=>{this.closeMenu()})),this.initMobileMegaMenu(),this.initDesktopMegaMenu(),MinimogEvents.subscribe(MinimogTheme.pubSubEvents.openCartDrawer,(()=>{this.closeMenu()})),MinimogEvents.subscribe(MinimogTheme.pubSubEvents.openSearchPopup,(()=>{this.closeMenu()}))}initDesktopMegaMenu(){[...this.menuData].forEach((e=>{const{item:t,subMenu:s}=e;if(s){const t=s.querySelector(".m-mega-product-list");t&&(window&&window.__sfWindowLoaded?e.productsBannerSlider=this.initProductsBanner(t):window.addEventListener("load",(()=>{e.productsBannerSlider=this.initProductsBanner(t)})))}}))}closeDesktopSubmenu=e=>{const t=this.menuData[e],{header:s}=t;s&&s.classList.remove("show-menu")};initProductsBanner(e){const t=e.closest("header"),s=e.closest(".m-menu__item"),i=t&&`.${t.dataset.screen}`||"",n=e.dataset.id,o=document.querySelector(`.m-product-list-${n}`).dataset.column;let a;if(a=new MinimogLibs.Swiper(`${i} .m-product-list-${n}`,{slidesPerView:1,loop:!1,autoplay:!1,breakpoints:{1200:{slidesPerView:o},992:{slidesPerView:o>=2?2:o}}}),this.sliders[s.dataset.index]=a,a){const e=document.querySelector(`#m-slider-controls-${n} .m-slider-controls__button-prev`),t=document.querySelector(`#m-slider-controls-${n} .m-slider-controls__button-next`);e&&e.addEventListener("click",(()=>a.slidePrev())),t&&t.addEventListener("click",(()=>a.slideNext()))}}initMobileMegaMenu(){[...this.domNodes.menuItems].forEach((e=>{const t=e.querySelector(".m-megamenu-mobile"),s=e.querySelector(".m-menu-mobile__back-button");t&&addEventDelegate({context:e,selector:"[data-toggle-submenu]",handler:(e,s)=>{e.preventDefault();const i=s.dataset.toggleSubmenu,n=e.target.parentNode;e.target.classList.contains("m-menu-mobile__back-button")||n.classList.contains("m-menu-mobile__back-button")||this.openSubMenu(t,i)}}),s&&(addEventDelegate({context:e,selector:"[data-toggle-submenu]",handler:(e,s)=>{e.preventDefault();const i=s.dataset.toggleSubmenu,n=e.target.parentNode;e.target.classList.contains("m-menu-mobile__back-button")||n.classList.contains("m-menu-mobile__back-button")||this.openSubMenu(t,i)}}),s.addEventListener("click",(e=>{const s=e.target.dataset.level;this.closeSubMenu(t,s)})))})),this.setMenuHeight(),document.addEventListener("matchMobile",(()=>this.setMenuHeight())),document.addEventListener("unmatchMobile",(()=>this.setMenuHeight()))}openMenu(){document.documentElement.classList.add("prevent-scroll"),this.domNodes.menuDrawer.classList.add("open")}closeMenu(){const{menuDrawer:e,menu:t,megaMenuMobile:s,hamburgerButtons:i}=this.domNodes;setTimeout((()=>{s.forEach((e=>{e.classList.remove("open")})),t.classList.remove("m-submenu-open","m-submenu-open--level-1","m-submenu-open--level-2"),e.classList.remove("open"),document.documentElement.classList.remove("prevent-scroll"),i.classList.remove("active")}),this.transitionDuration)}openSubMenu(e,t){let s=`m-submenu-open--level-${t}`;this.domNodes.menuDrawerContent.classList.add("open-submenu"),this.domNodes.menu.classList.add("m-submenu-open"),this.domNodes.menu.classList.add(s),e.classList.add("open")}closeSubMenu(e,t){let s=`m-submenu-open--level-${t}`;"1"===t&&this.domNodes.menu.classList.remove("m-submenu-open"),this.domNodes.menu.classList.remove(s),e.classList.remove("open"),this.domNodes.menuDrawerContent.classList.remove("open-submenu")}setMenuHeight(){const{menuDrawer:e,headerMobile:t}=this.domNodes,s=t.getBoundingClientRect().bottom,i=window.innerHeight-s;e.style.setProperty("--menu-drawer-height",`${i}px`)}}class SiteNav{constructor(e){this.selectors={menuItems:[".m-menu .m-menu__item"],dropdowns:[".m-mega-menu"],subMenu:".m-mega-menu",overlay:".m-header__overlay",swiper:".swiper-container"},this.classes={slideFromRight:"slide-from-right",slideReveal:"slide-reveal",active:"m-mega-active"},this.headerSticky=!1,e&&(this.container=e,this.domNodes=queryDomNodes(this.selectors,this.container),this.activeIndex=-1,this.lastActiveIndex=-1,this.visited=!1,this.timeoutEnter=null,this.timeoutLeave=null,this.attachEvents())}attachEvents=()=>{this.domNodes.menuItems.forEach(((e,t)=>{e.addEventListener("mouseenter",(e=>this.onMenuItemEnter(e,t))),e.addEventListener("mouseleave",(e=>this.onMenuItemLeave(e,t)))}))};initDropdownSize=()=>{this.container&&this.container.style.setProperty("--sf-dropdown-width",this.windowWidth()),this.container&&this.container.style.setProperty("--sf-dropdown-height",this.windowHeight())};onMenuItemEnter=(e,t)=>{const{target:s}=e;s.classList.contains("m-menu__item--mega")&&(clearTimeout(this.timeoutLeave),this.activeIndex=s.dataset&&Number(s.dataset.index),this.headerSticky=this.container&&"true"===this.container.dataset.sticky,this.reInitSlider(s),this.container&&this.visited?this.container.classList.remove(this.classes.slideReveal):this.container.classList.add(this.classes.slideReveal),this.visited=!0,this.lastActiveIndex>=0&&this.activeIndex>=0&&(this.container&&this.lastActiveIndex<this.activeIndex?this.container.classList.add(this.classes.slideFromRight):this.lastActiveIndex>this.activeIndex&&this.container.classList.remove(this.classes.slideFromRight)),this.getElementBoundingRect(s).then((e=>{e&&(this.container&&this.container.style.setProperty("--sf-dropdown-width",e.width),this.container&&this.container.style.setProperty("--sf-dropdown-height",e.height)),this.timeoutEnter=setTimeout((()=>{this.activeIndex===Number(s.dataset.index)&&(this.container&&this.container.classList.add(this.classes.active),s.closest(".m-menu__item").classList.add("m-menu__item--active"))}),120)})))};onMenuItemLeave=(e,t)=>{this.activeIndex=-1,this.lastActiveIndex=t,e.target.closest(".m-menu__item").classList.remove("m-menu__item--active"),this.timeoutLeave=setTimeout((()=>{(-1===this.activeIndex||this.activeIndex<0)&&(this.visited=!1),this.resetMegaMenu(e.target)}),80)};reInitSlider=e=>{if(!e.querySelector(this.selectors.swiper))return;const t=e.dataset.index,s=MinimogTheme&&MinimogTheme.headerSliders[t];s&&s.update()};getElementBoundingRect=async e=>{const t=e.querySelector(this.selectors.subMenu);if(t){const e=t.getBoundingClientRect();return{width:e.width,height:e.height,left:e.left,top:e.top}}};resetMegaMenu=()=>{this.activeIndex=-1,clearTimeout(this.timeoutEnter),this.container&&this.container.classList.remove(this.classes.active,this.classes.slideFromRight,this.classes.slideReveal,"sf-header--bg-black","sf-header--bg-white")};windowWidth=()=>window.innerWidth;windowHeight=()=>window.innerHeight;destroy=()=>{this.domNodes.menuItems.forEach(((e,t)=>{e.removeEventListener("mouseenter",(e=>this.onMenuItemEnter(e,t))),e.removeEventListener("mouseleave",(e=>this.onMenuItemLeave(e,t)))}))}}