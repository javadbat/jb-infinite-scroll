import { useEvent } from "jb-core/react";
import { RefObject } from "react";
import type { JBInfiniteScrollEventType, JBInfiniteScrollWebComponent } from 'jb-infinite-scroll';

export type EventProps = {
  /**
   * when component loaded, in most cases component is already loaded before react mount so you dont need this but if you load web-component dynamically with lazy load it will be called after react mount
   */
  onLoad?: (e: JBInfiniteScrollEventType<CustomEvent>) => void,
  /**
 * when all property set and ready to use, in most cases component is already loaded before react mount so you dont need this but if you load web-component dynamically with lazy load it will be called after react mount
 */
  onInit?: (e: JBInfiniteScrollEventType<CustomEvent>) => void,
  /**
   * on user scroll to the end
   */
  onScrollEnd?:(e:JBInfiniteScrollEventType<CustomEvent>)=>void
  onScroll?:(e:JBInfiniteScrollEventType<Event>)=>void

}
export function useEvents(element: RefObject<JBInfiniteScrollWebComponent>, props: EventProps) {
  useEvent(element, 'load', props.onLoad, true);
  useEvent(element, 'init', props.onInit, true);
  useEvent(element, "scroll", props.onScroll);
  useEvent(element, "scrollEnd", props.onScrollEnd, true);
}