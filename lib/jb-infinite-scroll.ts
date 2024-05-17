import HTML from './jb-infinite-scroll.html';
import CSS from './jb-infinite-scroll.scss';
import { Elements } from './Types';
import "jb-loading";

enum stateChangeWaitingBehaviour {
    // when user scroll we lock event call and waith for user to change isloading (good for React or any other ui framework solution)
    forceWait = "FORCE_WAIT",
    // when user scroll we dont lock its event listenr and developer should handle extra scroll by it self (good for pure js solution)
    noWait = "NO_WAIT",
}
export class JBInfiniteScrollWebComponent extends HTMLElement {
    elements!: Elements;
    #isLoading = false;
    //اون فاصله ای که ته لیست میگذاریم تا قبل از رسیدن به انتها ایونت رو کال کنه
    #endPageGap = 0;
    #isLastPage = false;

    #isListEnded = false;
    //used when user scroll and we dont want to capture multiple scroll at one and wait for prev scroll event to finish
    #isWaitingForStateChange = false;
    #disableCaptureScroll = false;
    #isListEmpty = false;
    #stateChangeWaitingBehaviour: stateChangeWaitingBehaviour = stateChangeWaitingBehaviour.forceWait;


    constructor() {
      super();
      this.initWebComponent();
    }
    mapStateChangeWaitingBehaviour(state: string) {
      switch (state) {
        case "FORCE_WAIT":
          return stateChangeWaitingBehaviour.forceWait;
        case "NO_WAIT":
          return stateChangeWaitingBehaviour.noWait;

        default:
          return stateChangeWaitingBehaviour.forceWait;

      }

    }
    set stateChangeWaitingBehaviour(value: string) {
      this.#stateChangeWaitingBehaviour = this.mapStateChangeWaitingBehaviour(value);
    }
    get stateChangeWaitingBehaviour() {
      return this.#stateChangeWaitingBehaviour;
    }
    get disableCaptureScroll() {
      return this.#disableCaptureScroll;
    }

    set disableCaptureScroll(value: boolean) {
      this.#disableCaptureScroll = value;
      this.setIsWaitingForStatChange(false);
    }
    get isListEnded() {
      return this.#isListEnded;
    }
    set isListEnded(value: boolean) {
      this.#isListEnded = value;
      this.setIsWaitingForStatChange(false);

    }
    get isLoading() {
      return this.#isLoading;
    }
    set isLoading(value: boolean) {
      this.#isLoading = value;
      this.setIsWaitingForStatChange(false);
      if (value) {
        this.elements?.loading.classList.add('--show');
      } else {
        this.elements?.loading.classList.remove('--show');
        this.checkEmptyListState();
        this.checkScrollHeight();
      }
    }
    get isListEmpty() {
      return this.#isListEmpty;
    }
    set isListEmpty(value: boolean) {
      this.#isListEmpty = value;
      this.setIsWaitingForStatChange(false);


    }
    get isLastPage() {
      return this.#isLastPage;
    }
    set isLastPage(value: boolean) {
      this.#isLastPage = value;
    }
    checkEmptyListState() {
      if (this.#isListEmpty) {
        this.elements?.emptyListWrapper.classList.add('--show');
        this.elements?.contentWrapper.classList.remove('--show');

      } else {
        this.elements?.contentWrapper.classList.add('--show');
        this.elements?.emptyListWrapper.classList.remove('--show');

      }
    }
    connectedCallback() {
      // standard web component event that called when all of dom is binded
      this.callOnLoadEvent();
      this.initProp();
      this.callOnInitEvent();

    }
    callOnLoadEvent() {
      const event = new CustomEvent('load', { bubbles: true, composed: true });
      this.dispatchEvent(event);
    }
    callOnInitEvent() {
      const event = new CustomEvent('init', { bubbles: true, composed: true });
      this.dispatchEvent(event);
    }
    initWebComponent() {
      const shadowRoot = this.attachShadow({
        mode: 'open'
      });
      const html = `<style>${CSS}</style>` + '\n' + HTML;
      const element = document.createElement('template');
      element.innerHTML = html;
      shadowRoot.appendChild(element.content.cloneNode(true));
      this.elements = {
        loading: shadowRoot.querySelector('.loading-wrapper')!,
        componentWrapper: shadowRoot.querySelector('.Infinite-scroll-component')!,
        contentWrapper: shadowRoot.querySelector('.content-wrapper')!,
        loadingWrapper: shadowRoot.querySelector('.loading-wrapper')!,
        emptyListWrapper: shadowRoot.querySelector('.empty-list-wrapper')!,
      };

    }
    registerEventListener() {
      this.elements.contentWrapper.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
    }
    initProp() {
      this.registerEventListener();
      this.checkScrollHeight();
    }
    checkScrollHeight() {
      //check if our container is bigger than our content we call scroll end event
      const { scrollHeight, clientHeight } = this.elements.contentWrapper;
      if (scrollHeight <= clientHeight && this.canCaptureScroll) {
        this.onScrollEnd();
      }
    }
    onScrollEnd() {        
      this.setIsWaitingForStatChange(true);
      const event = new CustomEvent('scrollEnd');
      this.dispatchEvent(event);
    }
    onScroll() {
      const { scrollTop, scrollHeight, clientHeight } = this.elements.contentWrapper;
      if (scrollTop + clientHeight + this.#endPageGap >= scrollHeight) {
        if (this.canCaptureScroll) {
          this.onScrollEnd();
        }
      }
    }
    setIsWaitingForStatChange(isWaitingstatus: boolean) {

      if (isWaitingstatus) {
        if (this.#stateChangeWaitingBehaviour === stateChangeWaitingBehaviour.forceWait) {
          this.#isWaitingForStateChange = true;
        } else if (this.#stateChangeWaitingBehaviour === stateChangeWaitingBehaviour.noWait) {
          return;
        }
      }
      this.#isWaitingForStateChange = false;



    }
    get canCaptureScroll() {
      if (!(this.#isLoading || this.#isListEmpty || this.#isListEnded || this.#isWaitingForStateChange || this.#disableCaptureScroll)) {
        return true;

      }
      return false;
    }

    static get observedAttributes() {
      return ['is-loading', 'is-list-empty', 'is-list-ended', 'disable-capture-scroll', 'state-change-waiting-behaviour'];
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      // do something when an attribute has changed
      this.onAttributeChange(name, newValue);
    }
    onAttributeChange(name: string, value: string) {
      switch (name) {
        case 'is-loading':
          if (value === 'true') {
            this.isLoading = true;
          } else {
            this.isLoading = false;
          }
          break;
        case 'is-list-empty':
          if (value === 'true') {
            this.isListEmpty = true;
          } else {
            this.isListEmpty = false;

          }
          break;
        case 'is-list-ended':
          if (value === 'true') {
            this.#isListEnded = true;
          } else {
            this.#isListEnded = false;

          }
          break;

        case 'disable-capture-scroll':
          if (value === 'true') {
            this.#disableCaptureScroll = true;
          } else {
            this.#disableCaptureScroll = false;

          }
          break;
        case 'state-change-waiting-behaviour':
          this.#stateChangeWaitingBehaviour = this.mapStateChangeWaitingBehaviour(value);
          break;


      }

    }
}
const myElementNotExists = !customElements.get('jb-infinite-scroll');
if (myElementNotExists) {
  window.customElements.define('jb-infinite-scroll', JBInfiniteScrollWebComponent);
}
