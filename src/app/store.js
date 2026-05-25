export function createAppStore({ initialRoute = null, ui = {} } = {}) {
    let state = {
        route: initialRoute,
        ui: {
            sidebarCollapsed: false,
            ...ui
        }
    };

    const listeners = new Set();

    const getSnapshot = () => ({
        route: state.route,
        ui: { ...state.ui }
    });

    const setRoute = (route) => {
        if (!route || route.key === state.route?.key) {
            state = {
                ...state,
                route
            };
        } else {
            state = {
                ...state,
                route
            };
        }
        notify();
    };

    const setSidebarCollapsed = (collapsed) => {
        state = {
            ...state,
            ui: {
                ...state.ui,
                sidebarCollapsed: Boolean(collapsed)
            }
        };
        notify();
    };

    const toggleSidebar = () => {
        setSidebarCollapsed(!state.ui.sidebarCollapsed);
    };

    const subscribe = (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

    const notify = () => {
        const snapshot = getSnapshot();
        listeners.forEach((listener) => listener(snapshot));
    };

    return {
        getSnapshot,
        setRoute,
        setSidebarCollapsed,
        toggleSidebar,
        subscribe
    };
}
