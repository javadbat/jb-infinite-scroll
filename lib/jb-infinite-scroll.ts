import HTML from './jb-infinite-scroll.html';
import CSS from './jb-infinite-scroll.scss';
import { Elements, StateChangeWaitingBehavior } from './types.js';
import "jb-loading";

export * from "./types.js";

export class JBInfiniteScrollWebComponent extends HTMLElement {
  elements!: Elements;
  #isLoading = false;
  //the amount of space that we listen to for trigger refresh 
  #endPageGap = 0;

  #isListEnded = false;
  //used when user scroll and we dont want to capture multiple scroll at one and wait for prev scroll event to finish
  #isWaitingForStateChange = false;
  #disableCaptureScroll = false;
  // if user set empty state from outside (change to manual mode)
  #externalIsListEmpty: boolean | null = null;
  #internals: ElementInternals;
  get #isListEmpty() {
    if (this.#externalIsListEmpty !== null) {
      return this.#externalIsListEmpty;
    }
  }
  #stateChangeWaitingBehavior: StateChangeWaitingBehavior = StateChangeWaitingBehavior.forceWait;

  constructor() {
    super();
    if (typeof this.attachInternals == "function") {
      //some browser dont support attachInternals
      this.#internals = this.attachInternals();
    }
    this.#initWebComponent();
  }
  #mapStateChangeWaitingBehavior(state: string) {
    switch (state) {
      case "FORCE_WAIT":
        return StateChangeWaitingBehavior.forceWait;
      case "NO_WAIT":
        return StateChangeWaitingBehavior.noWait;

      default:
        return StateChangeWaitingBehavior.forceWait;

    }

  }
  set stateChangeWaitingBehavior(value: string) {
    this.#stateChangeWaitingBehavior = this.#mapStateChangeWaitingBehavior(value);
  }
  get stateChangeWaitingBehavior() {
    return this.#stateChangeWaitingBehavior;
  }
  get disableCaptureScroll() {
    return this.#disableCaptureScroll;
  }

  set disableCaptureScroll(value: boolean) {
    this.#disableCaptureScroll = value;
    this.#setIsWaitingForStatChange(false);
  }
  get isListEnded() {
    return this.#isListEnded;
  }
  set isListEnded(value: boolean) {
    this.#isListEnded = value;
    this.#setIsWaitingForStatChange(false);

  }
  get isLoading() {
    return this.#isLoading;
  }
  set isLoading(value: boolean) {
    this.#isLoading = value;
    this.#setIsWaitingForStatChange(false);
    if (value) {
      this.elements?.loading.classList.add('--show');
      (this.#internals as any).states?.add("loading");
    } else {
      this.elements?.loading.classList.remove('--show');
      (this.#internals as any).states?.delete("loading");
      this.#checkEmptyListState();
      this.#checkScrollHeight();
    }
  }
  get isListEmpty() {
    return this.#externalIsListEmpty;
  }
  set isListEmpty(value: boolean) {
    this.#externalIsListEmpty = value;
    if(value){
      (this.#internals as any).states?.add("empty");
    }else{
      (this.#internals as any).states?.delete("empty");
    }
    this.#setIsWaitingForStatChange(false);
    this.#checkEmptyListState();

  }
  #checkEmptyListState() {
    if (this.#isListEmpty) {
      this.elements?.emptyListWrapper.classList.add('--show');
      this.elements?.contentWrapper.classList.remove('--show');

    } else {
      this.elements?.contentWrapper.classList.add('--show');
      this.elements?.emptyListWrapper.classList.remove('--show');

    }
  }
  connectedCallback() {
    // standard web component event that called when all of dom is bounded
    this.callOnLoadEvent();
    this.#initProp();
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
  #initWebComponent() {
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
    } as const;

  }
  #registerEventListener() {
    this.elements.contentWrapper.addEventListener('scroll', this.#onScroll.bind(this), { passive: true });
  }
  #initProp() {
    this.#registerEventListener();
    this.#checkScrollHeight();
  }
  #checkScrollHeight() {
    //check if our container is bigger than our content we call scroll end event
    const { scrollHeight, clientHeight } = this.elements.contentWrapper;
    if (scrollHeight <= clientHeight && this.canCaptureScroll) {
      this.#onScrollEnd();
    }
  }
  #onScrollEnd() {
    this.#setIsWaitingForStatChange(true);
    const event = new CustomEvent('scrollEnd');
    this.dispatchEvent(event);
  }
  #onScroll() {
    const { scrollTop, scrollHeight, clientHeight } = this.elements.contentWrapper;
    if (scrollTop + clientHeight + this.#endPageGap >= scrollHeight) {
      if (this.canCaptureScroll) {
        this.#onScrollEnd();
      }
    }
  }
  #setIsWaitingForStatChange(isWaitingStatus: boolean) {

    if (isWaitingStatus) {
      if (this.#stateChangeWaitingBehavior === StateChangeWaitingBehavior.forceWait) {
        this.#isWaitingForStateChange = true;
      } else if (this.#stateChangeWaitingBehavior === StateChangeWaitingBehavior.noWait) {
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
    return ['is-loading', 'is-list-empty', 'is-list-ended', 'disable-capture-scroll', 'state-change-waiting-behavior'];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // do something when an attribute has changed
    this.#onAttributeChange(name, newValue);
  }
  #onAttributeChange(name: string, value: string) {
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
      case 'state-change-waiting-behavior':
        this.#stateChangeWaitingBehavior = this.#mapStateChangeWaitingBehavior(value);
        break;


    }

  }
}
const myElementNotExists = !customElements.get('jb-infinite-scroll');
if (myElementNotExists) {
  window.customElements.define('jb-infinite-scroll', JBInfiniteScrollWebComponent);
}
