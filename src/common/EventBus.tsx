type EventCallback = (data: any) => void;

const EventBus = {
  on(event: string, callback: EventCallback) {
    document.addEventListener(event, (e: Event) => {
      if (e instanceof CustomEvent) {
        callback(e.detail);
      }
    });
  },
  dispatch(event: string, data: any) {
    const customEvent = new CustomEvent(event, { detail: data });
    document.dispatchEvent(customEvent);
  },
  remove(event: string, callback: EventCallback) {
    document.removeEventListener(event, (callback as unknown) as EventListener);
  },
};

export default EventBus;
