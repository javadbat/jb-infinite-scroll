import { JBInfiniteScrollWebComponent, type StateChangeWaitingBehavior} from "jb-infinite-scroll";
import { type ValidationItem } from "jb-validation";
import { RefObject, useEffect } from "react";

export type JBInfiniteScrollAttributes = {
  stateChangeWaitingBehavior?: StateChangeWaitingBehavior,
  disableCaptureScroll?: boolean,
  isEmpty?: boolean,
  isLoading?: boolean,
  hasMore?:boolean,
  stickToBottom?:boolean,
}
export function useJBInfiniteScrollAttribute(element: RefObject<JBInfiniteScrollWebComponent|null>, props: JBInfiniteScrollAttributes) {
    useEffect(() => {
    if (element.current && typeof props.isLoading == "boolean") {
      if (props.isLoading) {
        element.current.setAttribute('is-loading', 'true');
      } else {
        element.current.setAttribute('is-loading', 'false');
      }
    }

  }, [element.current, props.isLoading]);

  useEffect(() => {
    if (element.current && typeof props.isEmpty == "boolean") {
      if (props.isEmpty) {
        element.current.setAttribute('is-empty', 'true');
      } else {
        element.current.setAttribute('is-empty', 'false');

      }
    }

  }, [element.current, props.isEmpty]);

  useEffect(() => {
    if (element.current && typeof props.hasMore == "boolean") {
      if (props.hasMore) {
        element.current?.setAttribute('has-more', 'true');
      } else {
        element.current?.setAttribute('has-more', 'false');
      }
    }

  }, [element.current, props.hasMore]);

  useEffect(() => {
    if (element.current && typeof props.disableCaptureScroll == "boolean") {
      if (props.disableCaptureScroll) {
        element.current?.setAttribute('disable-capture-scroll', 'true');
      } else {
        element.current?.setAttribute('disable-capture-scroll', 'false');
      }
    }

  }, [element.current, props.disableCaptureScroll]);

    useEffect(() => {
    if (element.current) {
      if (props.stickToBottom) {
        element.current?.setAttribute('stick-to-bottom', '');
      } else {
        element.current?.removeAttribute('stick-to-bottom');
      }
    }
  }, [element.current, props.stickToBottom]);

  useEffect(() => {
    if (props.stateChangeWaitingBehavior && element.current) {
      element.current?.setAttribute('state-change-waiting-behavior', props.stateChangeWaitingBehavior);
    }
  }, [element.current, props.stateChangeWaitingBehavior]);
}
