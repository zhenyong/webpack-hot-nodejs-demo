/**
 * Auto attach/detach all listeners under `biz/*.biz.js`
 * @param add addEventListener function
 * @param remove addEventListener function
 */
module.exports = function attachEventListeners(add, remove) {
    /*
     Suppose here source code of `a.biz.js`

     ```
     {
     evt: 'hello',
     fn() { console.log('Hello World!') }
     }
     ```

     if you modify the `fn()`, it will invoke as:

     ```
     handle(
     { evt: 'hello', fn() { console.log('Hello World!')  },
     { evt: 'hello', fn() { console.log('The New One Hello World!')  },
     )
     ```

     if you remove `a.biz.js`, it will invoke as:

     ```
     handle(
     null,
     { evt: 'hello', fn() { console.log('Hello World!')  },
     )
     ```

     if you add a new *.biz.js, it will invoke as:

     ```
     handle(
     { evt: ..., fn: ...  }, // the new one
     null
     )
     ```
     */
    const handle = (newModule, oldModule) => {
        newModule && add && add(newModule.evt, newModule.fn);
        oldModule && remove && remove(oldModule.evt, oldModule.fn);
    };

    const oldModules = {}; // to cache last run `*.biz.js` modules

    // recusively load the *.biz.js module under `./` folder
    const requireContext = require.context('./', true, /\.biz.js/);
    requireContext.keys().forEach(k => {
        const module = requireContext(k);
        oldModules[k] = module;
        handle(module, null);
    });

    if (module.hot) {
        module.hot.accept(requireContext.id, () => {
            // copy for old modules key
            // for checking which old module（file）has been removed
            const oldKeysRetain = {};
            Object.keys(oldModules).forEach(k => oldKeysRetain[k] = true);

            const requireContext = require.context('./', true, /\.biz.js/);
            requireContext.keys().forEach(k => {
                delete oldKeysRetain[k];
                const newModule = requireContext(k);
                if (oldModules[k] !== newModule) {
                    handle(newModule, oldModules[k]);
                    oldModules[k] = newModule;
                }
            });

            Object.keys(oldKeysRetain).forEach(k => {
                handle(null, oldModules[k]);
                delete oldModules[k];
            });
        });
    }
};