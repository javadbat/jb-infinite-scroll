//track user interaction and dom change and trigger necessary callbacks
export class Automata {
  #stickToBottom = false;
  get stickToBottom() {
    return this.#stickToBottom;
  }
  set stickToBottom(value: boolean) {
    this.#stickToBottom = value;
    if (value) {
      this.callbacks.scrollToEnd();
      this.init();
    } else {
      // currently automata just handle stickToButton. if any other functionality Added please call init and destruct base on all seated functionality
      this.destruct();
    }
  }
  isUserScrolledTop = false;
  callbacks: {
    scrollToEnd: VoidFunction
  }
  elements: {
    //dom with overflow scroll that we watch
    contentSlot: HTMLSlotElement
    contentWrapper: HTMLDivElement
  }
  private observers: MutationObserver[] = [];

  constructor(callbacks: typeof this.callbacks, elements: typeof this.elements) {
    this.callbacks = callbacks;
    this.elements = elements;
  }
  init() {
    this.elements.contentWrapper.addEventListener('scroll', this.#onScroll, {passive:true});
    this.elements.contentSlot.addEventListener('slotchange', () => {
      const nodes = this.elements.contentSlot.assignedNodes({ flatten: true });
      nodes.forEach(el => {
        if (el.nodeType == Node.ELEMENT_NODE) {
          this.#initObserver(el as HTMLElement);
        }
      })
    },);
  }
  #initObserver(element: HTMLElement) {
    const observerConfig: MutationObserverInit = {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: false
    };
    const observer = new MutationObserver(this.#onMutate.bind(this))
    observer.observe(element, observerConfig);
    this.observers.push(observer);
  }
  destruct() {
    this.#destructObserver();
    this.elements.contentWrapper.removeEventListener('scroll', this.#onScroll)
  }
  #destructObserver() {
    this.observers.forEach((x) => x.disconnect());
  }
  //keep it arrow function for add and remove listener references
  #onScroll = () => {
    //keep track of user scroll behavior
    //TODO: add debounce to scroll calculations
    this.isUserScrolledTop = this.calcIsUserScrolledTop();
  }
  #onMutate(e: MutationRecord[], mutation: MutationObserver) {
    if (e.find(mn => mn.addedNodes !== null)) {
      //when some nodes added to the dom tree
      if (this.stickToBottom && !this.isUserScrolledTop) {
        this.callbacks.scrollToEnd();
      }
    }
  }
  //calculate if user scrolled top 
  calcIsUserScrolledTop() {
    const { scrollTop, scrollHeight, clientHeight } = this.elements.contentWrapper;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    if (distanceFromBottom > 100) {
      return true;
    }
    return false;
  }
}