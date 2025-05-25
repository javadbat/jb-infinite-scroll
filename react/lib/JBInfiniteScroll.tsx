import React, { useRef, useCallback, useEffect, useImperativeHandle } from 'react';
import "jb-infinite-scroll";
import { useJBInfiniteScrollAttribute, JBInfiniteScrollAttributes } from './attributes-hook.js';
// eslint-disable-next-line no-duplicate-imports
import { JBInfiniteScrollWebComponent, StateChangeWaitingBehavior } from "jb-infinite-scroll";
import { EventProps, useEvents } from './events-hook.js';

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

const JBInfiniteScroll = React.forwardRef((props: Props, ref: React.ForwardedRef<JBInfiniteScrollWebComponent>) => {
  const element = useRef<JBInfiniteScrollWebComponent>(null);
  useImperativeHandle(
    ref,
    () => (element ? element.current : undefined),
    [element],
  );

  useJBInfiniteScrollAttribute(element, props);
  useEvents(element, props);

  return (
    <jb-infinite-scroll style={props.style} class={props.className} ref={element}>{props.children}</jb-infinite-scroll>
  );
});

type JBInfiniteScrollProps = {

  className?: string,
  style?: React.CSSProperties,
}
export type Props = JBInfiniteScrollAttributes & EventProps & React.PropsWithChildren<JBInfiniteScrollProps>

JBInfiniteScroll.displayName = "JBInfiniteScroll";

export { JBInfiniteScroll, StateChangeWaitingBehavior };