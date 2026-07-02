import React, { Fragment, useRef, useState } from "react";
import { JBInfiniteScroll } from "jb-infinite-scroll/react";
import type { Meta, StoryObj } from '@storybook/react';
import type { JBInfiniteScrollWebComponent } from "../dist/jb-infinite-scroll";
import { JBButton } from 'jb-button/react';
import { expect, fn, userEvent, waitFor } from 'storybook/test';
import {
  getContentWrapper,
  getEmptyListWrapper,
  getInfiniteScroll,
  getJBButton,
  getJBButtonNativeButton,
  getLoadingWrapper,
  getSlottedContent,
  isScrolledToBottom,
  scrollContentTo,
  scrollContentToEnd,
} from './test-utils';

const meta = {
  title: "Components/JBInfiniteScroll",
  component: JBInfiniteScroll,
} satisfies Meta<typeof JBInfiniteScroll>;
export default meta;
type Story = StoryObj<typeof meta>;

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
    play: async ({ canvasElement }) => {
      const infiniteScroll = getInfiniteScroll(canvasElement);
      const contentWrapper = getContentWrapper(infiniteScroll);
      const loadingWrapper = getLoadingWrapper(infiniteScroll);
      const content = getSlottedContent(canvasElement);

      expect(content).not.toHaveTextContent('18');

      await scrollContentToEnd(contentWrapper);

      await waitFor(() => {
        expect(loadingWrapper).toHaveClass('--show');
        expect(infiniteScroll.isLoading).toBe(true);
      });

      await waitFor(() => {
        expect(content).toHaveTextContent('18');
        expect(loadingWrapper).not.toHaveClass('--show');
        expect(infiniteScroll.isLoading).toBe(false);
      }, { timeout: 2000 });
    }
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
    play: async ({ canvasElement }) => {
      const infiniteScroll = getInfiniteScroll(canvasElement);
      const contentWrapper = getContentWrapper(infiniteScroll);
      const scrollTo400Button = getJBButton(canvasElement, 'scroll to 400px');
      const scrollToEndButton = getJBButton(canvasElement, 'scroll to end');

      await userEvent.click(getJBButtonNativeButton(scrollTo400Button));

      await waitFor(() => {
        expect(contentWrapper.scrollTop).toBeGreaterThan(250);
      });

      const bottomBeforeLoading = contentWrapper.scrollHeight - contentWrapper.clientHeight;

      await userEvent.click(getJBButtonNativeButton(scrollToEndButton));

      await waitFor(() => {
        expect(contentWrapper.scrollTop).toBeGreaterThanOrEqual(bottomBeforeLoading - 2);
      });
    }
};
export const StickToBottom: Story = {
  render: (args) => {
    const ref = useRef(null);
    const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    return (
      <div>
        <div style={{ height: "10rem", border: "solid 1px #666", overflow: "hidden" }}>
          <JBInfiniteScroll {...args} ref={ref}>
            <div slot="content">
              {
                list.map((item) => {
                  return (<div key={item} style={{ border: 'solid 1px #black', fontSize: '3rem', textAlign: 'center', padding: '2rem' }}>{item}</div>);
                })
              }
            </div>
          </JBInfiniteScroll>

        </div>
        <JBButton size="sm" onClick={() => {
          const i = list.at(-1)!
          setList(l => [...l, ...[i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]]);
        }}>add more content to bottom</JBButton>
      </div>

    );
  },
  args: {
    stickToBottom: true
  },
  play: async ({ canvasElement }) => {
    const infiniteScroll = getInfiniteScroll(canvasElement);
    const contentWrapper = getContentWrapper(infiniteScroll);
    const content = getSlottedContent(canvasElement);
    const addButton = getJBButton(canvasElement, 'add more content to bottom');

    await waitFor(() => {
      expect(isScrolledToBottom(contentWrapper)).toBe(true);
    });

    await userEvent.click(getJBButtonNativeButton(addButton));

    await waitFor(() => {
      expect(content).toHaveTextContent('18');
      expect(isScrolledToBottom(contentWrapper)).toBe(true);
    });
  }
}
export const Empty: Story = {
  args: {
    isListEmpty: true,
    children: <div slot="empty">list is empty</div>,
  },
  play: async ({ canvasElement }) => {
    const infiniteScroll = getInfiniteScroll(canvasElement);
    const contentWrapper = getContentWrapper(infiniteScroll);
    const emptyListWrapper = getEmptyListWrapper(infiniteScroll);

    await waitFor(() => {
      expect(infiniteScroll.isListEmpty).toBe(true);
      expect(contentWrapper).not.toHaveClass('--show');
      expect(emptyListWrapper).toHaveClass('--show');
      expect(canvasElement).toHaveTextContent('list is empty');
    });
  }
};
export const ScrollEventTest: Story = {
  render:ActionTemplate.render,
  args:{
    ...ActionTemplate.args,
    onScroll: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const infiniteScroll = getInfiniteScroll(canvasElement);
    const contentWrapper = getContentWrapper(infiniteScroll);

    await scrollContentTo(contentWrapper, 100);

    await waitFor(() => {
      expect(args.onScroll).toHaveBeenCalled();
    });
  }
}

