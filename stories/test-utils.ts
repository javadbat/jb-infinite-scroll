import type { JBInfiniteScrollWebComponent } from 'jb-infinite-scroll';
import { expect, waitFor } from 'storybook/test';

export function getInfiniteScroll(canvasElement: HTMLElement, index = 0) {
  const infiniteScroll = canvasElement.querySelectorAll<JBInfiniteScrollWebComponent>('jb-infinite-scroll')[index];
  expect(infiniteScroll).toBeTruthy();
  expect(infiniteScroll!.shadowRoot).toBeTruthy();
  return infiniteScroll!;
}

export function getContentWrapper(infiniteScroll: JBInfiniteScrollWebComponent) {
  const contentWrapper = infiniteScroll.shadowRoot?.querySelector<HTMLDivElement>('.content-wrapper');
  expect(contentWrapper).toBeTruthy();
  return contentWrapper!;
}

export function getLoadingWrapper(infiniteScroll: JBInfiniteScrollWebComponent) {
  const loadingWrapper = infiniteScroll.shadowRoot?.querySelector<HTMLDivElement>('.loading-wrapper');
  expect(loadingWrapper).toBeTruthy();
  return loadingWrapper!;
}

export function getEmptyListWrapper(infiniteScroll: JBInfiniteScrollWebComponent) {
  const emptyListWrapper = infiniteScroll.shadowRoot?.querySelector<HTMLDivElement>('.empty-list-wrapper');
  expect(emptyListWrapper).toBeTruthy();
  return emptyListWrapper!;
}

export function getSlottedContent(canvasElement: HTMLElement) {
  const content = canvasElement.querySelector<HTMLElement>('[slot="content"]');
  expect(content).toBeTruthy();
  return content!;
}

export function getJBButton(canvasElement: HTMLElement, text: string) {
  const button = Array.from(canvasElement.querySelectorAll<HTMLElement>('jb-button')).find((item) =>
    item.textContent?.includes(text)
  );
  expect(button).toBeTruthy();
  return button!;
}

export function getJBButtonNativeButton(button: HTMLElement) {
  const nativeButton = button.shadowRoot?.querySelector<HTMLButtonElement>('button');
  expect(nativeButton).toBeTruthy();
  return nativeButton!;
}

export async function scrollContentTo(contentWrapper: HTMLDivElement, top: number) {
  contentWrapper.scrollTo({ top });
  contentWrapper.dispatchEvent(new Event('scroll'));
  await waitFor(() => {
    expect(Math.round(contentWrapper.scrollTop)).toBeGreaterThanOrEqual(Math.max(0, Math.floor(top) - 1));
  });
}

export async function scrollContentToEnd(contentWrapper: HTMLDivElement) {
  const end = contentWrapper.scrollHeight - contentWrapper.clientHeight;
  await scrollContentTo(contentWrapper, end);
}

export function isScrolledToBottom(contentWrapper: HTMLDivElement, tolerance = 2) {
  const distanceFromBottom = contentWrapper.scrollHeight - contentWrapper.clientHeight - contentWrapper.scrollTop;
  return distanceFromBottom <= tolerance;
}
