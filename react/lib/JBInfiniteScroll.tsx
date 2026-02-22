'use client';
import React, { useRef, useImperativeHandle } from 'react';
import "jb-infinite-scroll";
import { useJBInfiniteScrollAttribute, type JBInfiniteScrollAttributes } from './attributes-hook.js';
import { type JBInfiniteScrollWebComponent, StateChangeWaitingBehavior } from "jb-infinite-scroll";
import { type EventProps, useEvents } from './events-hook.js';
import type { JBElementStandardProps } from 'jb-core/react';

declare module "react" {
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

const JBInfiniteScroll = React.forwardRef((props: Props, ref: React.ForwardedRef<JBInfiniteScrollWebComponent>) => {
  const element = useRef<JBInfiniteScrollWebComponent>(null);
  useImperativeHandle(
    ref,
    () => (element ? element.current : undefined),
    [element],
  );
  const {onInit,onLoad,onScroll,onScrollEnd, disableCaptureScroll,isListEmpty,isListEnded,stateChangeWaitingBehavior,isLoading,stickToBottom, children, ...otherProps} = props;
  useJBInfiniteScrollAttribute(element, {disableCaptureScroll,isListEmpty,isListEnded,stateChangeWaitingBehavior,isLoading,stickToBottom,});
  useEvents(element, {onInit,onLoad,onScroll,onScrollEnd});

  return (
    <jb-infinite-scroll ref={element} {...otherProps}>{children}</jb-infinite-scroll>
  );
});

export type Props = JBInfiniteScrollAttributes & EventProps & React.PropsWithChildren<JBElementStandardProps<JBInfiniteScrollWebComponent, keyof JBInfiniteScrollAttributes & EventProps>>

JBInfiniteScroll.displayName = "JBInfiniteScroll";

export { JBInfiniteScroll, StateChangeWaitingBehavior };