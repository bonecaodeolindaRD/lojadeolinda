const EventEmitter = {
    events: {}, 
    on(event, listener) { 
        if (!this.events[event]) { this.events[event] = { listeners: [] } }
        this.events[event].listeners.push(listener);
    },
    off(event) { 
        delete this.events[event]
    },
    emit(name, ...payload) { 
        for (const listener of this.events[name].listeners) {
            listener.apply(this, payload);
        }
    }
};

export default EventEmitter;