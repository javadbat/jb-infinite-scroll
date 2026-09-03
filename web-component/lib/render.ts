import { i18n } from "jb-core/i18n";
import { dictionary } from "./i18n";

export function renderHTML(): string {
  return /* html */ `
  <div class="infinite-scroll-component">
    <div class="content" part="content">
        <slot name="content"></slot>
        <div class="loading-wrapper" part="loading-wrapper" role="status" aria-live="polite" aria-label="${dictionary.get(i18n, "loadingMoreItems")}">
            <slot name="loading">
                <div class="default-loading">
                    <jb-loading part="default-loading"></jb-loading>
                </div>
            </slot>
        </div>
    </div>
    <div class="empty-list-wrapper" part="empty-list-wrapper" role="status" aria-live="polite">
        <slot name="empty">
        </slot>
    </div>  
  </div>
      `;
}
