module.exports = function livereload(robot) {

    const listeners = {}; // <moduleKey, <evt : [fn,...]> >
    const _add = robot.addListener;
    const beforeHook = (modKey) => {
        robot.addListener = (evt, fn) => {
            _add.call(robot, evt, fn);
            listeners[modKey] = listeners[modKey] || [];
            listeners[modKey][evt] = listeners[modKey][evt] || [];
            listeners[modKey][evt].push(fn);
        };
    };
    const afterHook = () => {
        robot.addListener = _add;
    };

    const removeOldListeners = (modKey) => {
        Object.keys(listeners[modKey]).forEach(evt => {
            listeners[modKey][evt].forEach(fn => {
                robot.removeListener(evt, fn);
            });
        });
    };

    const execModule = (modKey, module) => {
        beforeHook(modKey);
        module(robot);
        afterHook(modKey);
    };

    const oldModules = {}; // to cache last run `*.biz.js` modules

    // recusively load the *.biz.js module under `./` folder
    const requireContext = require.context('./', true, /\.biz.js/);
    requireContext.keys().forEach(k => {
        const module = requireContext(k);
        oldModules[k] = module;
        execModule(k, module);
    });

    if (module.hot) {
        module.hot.accept(requireContext.id, () => {
            const oldKeysRetain = {};
            Object.keys(oldModules).forEach(k => oldKeysRetain[k] = true);

            const requireContext = require.context('./', true, /\.biz.js/);
            requireContext.keys().forEach(k => {
                delete oldKeysRetain[k];
                const newModule = requireContext(k);
                if (oldModules[k] !== newModule) {
                    removeOldListeners(k);
                    execModule(k, newModule);
                    oldModules[k] = newModule;
                }
            });

            Object.keys(oldKeysRetain).forEach(k => {
                removeOldListeners(k);
                delete oldModules[k];
            });
        });
    }
};