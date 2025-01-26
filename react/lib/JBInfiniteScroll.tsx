import React, { useState, useRef, useCallback, useEffect, useImperativeHandle } from 'react';
import "jb-infinite-scroll";

// eslint-disable-next-line no-duplicate-imports
import {JBInfiniteScrollWebComponent, StateChangeWaitingBehavior} from "jb-infinite-scroll";
import { useBindEvent } from "../../../../common/hooks/use-event.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'jb-infinite-scroll': JBInfiniteScrollType;
    }
    interface JBInfiniteScrollType extends React.DetailedHTMLProps<React.HTMLAttributes<JBInfiniteScrollWebComponent>, JBInfiniteScrollWebComponent> {
      "class"?: string,
      "type"?: string;
    }
  }
}

const JBInfiniteScroll = React.forwardRef((props: Props, ref:React.ForwardedRef<JBInfiniteScrollWebComponent>) => {
  const element = useRef<JBInfiniteScrollWebComponent>(null);
  const [refChangeCount, refChangeCountSetter] = useState(0);
  useImperativeHandle(
    ref,
    () => (element ? element.current : null),
    [element],
  );
  useEffect(() => {
    refChangeCountSetter(refChangeCount + 1);
  }, [element.current]);

  useEffect(() => {
    element.current?.checkScrollHeight();
  }, [element.current]);

  const onScrollEnd = useCallback((e) => {
    if (props.onScrollEnd) {
      props.onScrollEnd(e);
    }
  }, [props.onScrollEnd]);

  useBindEvent(element, 'scrollEnd', onScrollEnd, true);

  useEffect(() => {
    if (element.current) {
      if (props.isLoading) {
        element.current.setAttribute('is-loading', 'true');
      } else {
        element.current.setAttribute('is-loading', 'false');

      }
    }

  }, [props.isLoading]);
  useEffect(() => {
    if (element.current) {
      if (props.isListEmpty) {
        element.current.setAttribute('is-list-empty', 'true');
      } else {
        element.current.setAttribute('is-list-empty', 'false');

      }
    }

  }, [props.isListEmpty]);
  useEffect(() => {
    if (element.current) {
      if (props.isListEnded) {
        element.current?.setAttribute('is-list-ended', 'true');
      } else {
        element.current?.setAttribute('is-list-ended', 'false');
      }
    }

  }, [props.isListEnded]);
  useEffect(() => {
    if (element.current) {
      if (props.disableCaptureScroll) {
        element.current?.setAttribute('disable-capture-scroll', 'true');
      } else {
        element.current?.setAttribute('disable-capture-scroll', 'false');
      }
    }

  }, [props.disableCaptureScroll]);
  useEffect(() => {
    if (props.stateChangeWaitingBehavior && element.current) {
      element.current?.setAttribute('state-change-waiting-behavior', props.stateChangeWaitingBehavior);
    }
  }, [props.stateChangeWaitingBehavior]);
  return (
    <jb-infinite-scroll ref={element}>{props.children}</jb-infinite-scroll>
  );
});
export type Props = React.PropsWithChildren< {
  stateChangeWaitingBehavior?: StateChangeWaitingBehavior,
  disableCaptureScroll?: boolean,
  isListEmpty?: boolean,
  isLoading?: boolean,
  isListEnded?:boolean,
  onScrollEnd?:(e:CustomEvent)=>void
}>

JBInfiniteScroll.displayName = "JBInfiniteScroll";

export {JBInfiniteScroll, StateChangeWaitingBehavior};