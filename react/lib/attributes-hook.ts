import { JBInfiniteScrollWebComponent, type StateChangeWaitingBehavior} from "jb-infinite-scroll";
import { type ValidationItem } from "jb-validation";
import { RefObject, useEffect } from "react";

export type JBInfiniteScrollAttributes = {
  stateChangeWaitingBehavior?: StateChangeWaitingBehavior,
  disableCaptureScroll?: boolean,
  isListEmpty?: boolean,
  isLoading?: boolean,
  isListEnded?:boolean,
  stickToBottom?:boolean,
}
export function useJBInfiniteScrollAttribute(element: RefObject<JBInfiniteScrollWebComponent>, props: JBInfiniteScrollAttributes) {
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
    if (element.current, typeof props.isListEmpty == "boolean") {
      if (props.isListEmpty) {
        element.current.setAttribute('is-list-empty', 'true');
      } else {
        element.current.setAttribute('is-list-empty', 'false');

      }
    }

  }, [element.current, props.isListEmpty]);

  useEffect(() => {
    if (element.current && typeof props.isListEnded == "boolean") {
      if (props.isListEnded) {
        element.current?.setAttribute('is-list-ended', 'true');
      } else {
        element.current?.setAttribute('is-list-ended', 'false');
      }
    }

  }, [element.current, props.isListEnded]);

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