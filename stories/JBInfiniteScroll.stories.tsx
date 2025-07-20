import React, { Fragment, useRef, useState } from "react";
import { JBInfiniteScroll, Props } from "jb-infinite-scroll/react";
import type { Meta, StoryObj } from '@storybook/react';
import type { JBInfiniteScrollWebComponent } from "../dist/jb-infinite-scroll";
import { JBButton } from 'jb-button/react';
const meta: Meta<Props> = {
  title: "Components/JBInfiniteScroll",
  component: JBInfiniteScroll,
};
export default meta;
type Story = StoryObj<typeof JBInfiniteScroll>;

export const Normal: Story = {
  args: {
    children: <div slot="content">
      <div>item1</div>
      <div>item2</div>
      <div>item3</div>
    </div>,
  }
};



export const ActionTemplate: Story = {
  render:
    (args) => {
      const ref = useRef(null);
      const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      const [isLoading, setIsLoading] = useState(false);
      const [isListEnded, setIsListEnded] = useState(false);
      const onScrollEnd = () => {
        const i = list.at(-1)!;
        if (i > 100) {
          setIsListEnded(true);
        }
        setIsLoading(true);
        setTimeout(() => {
          setList([...list, ...[i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]]);
          setIsLoading(false);
        }, 1000);
      };
      return (
        <div style={{ height: "10rem", border: "solid 1px #666", overflow: "hidden" }}>
          {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
          <JBInfiniteScroll {...args} ref={ref} onScrollEnd={onScrollEnd} isLoading={isLoading} isListEnded={isListEnded} disableCaptureScroll={isLoading}>
            <div slot="content">
              {
                list.map((item) => {
                  return (<div key={item} style={{ border: 'solid 1px #black', fontSize: '3rem', textAlign: 'center', padding: '2rem' }}>{item}</div>);
                })
              }
            </div>
          </JBInfiniteScroll>
        </div>
      );
    },
};

export const ScrollManipulation: Story = {
  render:
    (args) => {
      const ref = useRef<JBInfiniteScrollWebComponent>(null);
      const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      const [isLoading, setIsLoading] = useState(false);
      const [isListEnded, setIsListEnded] = useState(false);
      const onScrollEnd = () => {
        const i = list.at(-1)!;
        if (i > 100) {
          setIsListEnded(true);
        }
        setIsLoading(true);
        setTimeout(() => {
          setList([...list, ...[i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]]);
          setIsLoading(false);
        }, 1000);
      };
      const scrollTo = () => {
        ref.current?.scrollTo({ behavior: 'smooth', top: 400 })
      }
      const scrollToEnd = () => {
        ref.current?.scrollToEnd()
      }
      return (
        <Fragment>
          <div style={{ height: "10rem", border: "solid 1px #666", overflow: "hidden" }}>
            {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
            <JBInfiniteScroll {...args} ref={ref} onScrollEnd={onScrollEnd} isLoading={isLoading} isListEnded={isListEnded} disableCaptureScroll={isLoading}>
              <div slot="content">
                {
                  list.map((item) => {
                    return (<div key={item} style={{ border: 'solid 1px #black', fontSize: '3rem', textAlign: 'center', padding: '2rem' }}>{item}</div>);
                  })
                }
              </div>
            </JBInfiniteScroll>
          </div>
          <div style={{ marginTop: '1rem', 'display': 'flex', gap: '0.5rem' }}>
            <JBButton onClick={scrollToEnd}>scroll to end</JBButton>
            <JBButton onClick={scrollTo} >scroll to 400px</JBButton>
          </div>
        </Fragment>
      );
    },
};

export const Empty: Story = {
  args: {
    isListEmpty: true,
    children: <div slot="empty">list is empty</div>,
  }
};


