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
  useImperativeHandle(
    ref,
    () => (element ? element.current : null),
    [element],
  );

  const onScrollEnd = useCallback((e:CustomEvent) => {
    if (typeof props.onScrollEnd == "function") {
      props.onScrollEnd(e);
    }
  }, [props.onScrollEnd]);

  useBindEvent(element, 'scrollEnd', onScrollEnd, true);

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
    if (props.stateChangeWaitingBehavior && element.current) {
      element.current?.setAttribute('state-change-waiting-behavior', props.stateChangeWaitingBehavior);
    }
  }, [element.current, props.stateChangeWaitingBehavior]);
  return (
    <jb-infinite-scroll class={props.className} ref={element}>{props.children}</jb-infinite-scroll>
  );
});

export type Props = React.PropsWithChildren< {
  stateChangeWaitingBehavior?: StateChangeWaitingBehavior,
  disableCaptureScroll?: boolean,
  isListEmpty?: boolean,
  isLoading?: boolean,
  isListEnded?:boolean,
  className?:string
  onScrollEnd?:(e:CustomEvent)=>void
}>

JBInfiniteScroll.displayName = "JBInfiniteScroll";

export {JBInfiniteScroll, StateChangeWaitingBehavior};