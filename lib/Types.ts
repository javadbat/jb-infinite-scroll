export type Elements = {
    loading: HTMLDivElement,
    contentWrapper: HTMLDivElement,
    componentWrapper: HTMLDivElement,
    emptyListWrapper: HTMLDivElement,
    loadingWrapper: HTMLDivElement,
}

export enum StateChangeWaitingBehavior {
    // when user scroll we lock event call and wait for user to change isLoading (good for React or any other ui framework solution)
    forceWait = "FORCE_WAIT",
    // when user scroll we dont lock its event listener and developer should handle extra scroll by it self (good for pure js solution)
    noWait = "NO_WAIT",
}