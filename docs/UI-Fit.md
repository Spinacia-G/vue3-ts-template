## UI-Fit

1. `plugins/postcss-px-to-vh.ts`

```typescript
import type { Plugin } from 'postcss';

interface Options {
  designHeight?: number;
  unitPrecision?: number;
  propList?: string[];
  selectorBlackList?: (string | RegExp)[];
  minPixelValue?: number;
  replace?: boolean;
}

function postcssCustomPxToVh(options: Options = {}): Plugin {
  const defaults = {
    designHeight: 1080,
    unitPrecision: 5,
    propList: ['*'],
    selectorBlackList: [],
    minPixelValue: 1,
    replace: true
  };

  const opts = { ...defaults, ...options };

  return {
    postcssPlugin: 'postcss-custom-px-to-vh',

    Declaration(decl) {
      if (!shouldProcessProp(decl.prop, opts.propList)) {
        return;
      }

      // @ts-ignore
      if (isInSelectorBlackList(decl.parent?.selector || '', opts.selectorBlackList)) {
        return;
      }

      const newValue = transformPxToVh(decl.value, opts);

      if (newValue !== decl.value) {
        if (opts.replace) {
          decl.value = newValue;
        } else {
          decl.cloneBefore({ value: newValue });
        }
      }
    }
  };

  function shouldProcessProp(prop: string, propList: string[]): boolean {
    if (propList.indexOf('*') !== -1) return true;
    if (propList.indexOf(prop) !== -1) return true;

    return propList.some(item => {
      if (item.indexOf('*') !== -1) {
        return prop.indexOf(item.replace('*', '')) !== -1;
      }
      return false;
    });
  }

  function isInSelectorBlackList(selector: string, blackList: (string | RegExp)[]): boolean {
    if (!selector || !blackList.length) return false;

    return blackList.some(item => {
      if (typeof item === 'string') {
        return selector.indexOf(item) !== -1;
      } else if (item instanceof RegExp) {
        return item.test(selector);
      }
      return false;
    });
  }

  function transformPxToVh(value: string, opts: Required<Options>): string {
    const pxRegex = /(\d*\.?\d+)px/gi;

    return value.replace(pxRegex, (match, pxValue) => {
      const pixels = parseFloat(pxValue);

      if (pixels < opts.minPixelValue) {
        return match;
      }

      const vhValue = (pixels / opts.designHeight) * 100;
      const formattedVh = parseFloat(vhValue.toFixed(opts.unitPrecision));

      return `${formattedVh}vh`;
    });
  }
}

postcssCustomPxToVh.postcss = true;

export default postcssCustomPxToVh;
```

2. config design height in `.env`

```bash
VITE_DESIGN_HEIGHT=1080
```

3. use the plugin in `vite.config.ts`

```typescript
import postcssCustomPxToVh from './plugins/postcss-px-to-vh';
// inside defineConfig({ ... })
css: {
  postcss: {
    plugins: [
      // if you have other postcss plugins, keep them here, such as autoprefixer
      // autoprefixer(),
      postcssCustomPxToVh({
        designHeight: Number(env.VITE_DESIGN_HEIGHT),
        unitPrecision: 5,
        propList: ['*'],
        minPixelValue: 1,
        replace: true
      })
    ]
  }
}
```

4. config `font-size` in `src/styles/reset.css`

```css
html {
  font-size: calc(16 / 1080 * 100vh);
}

body {
  font-size: 1rem;
}
```

5. use `px` unit in stylesheets, it will be converted to `vh` unit automatically

```vue
<template>
  <!-- width: 1rem; box-shadow: 0 0 0.009vh #fff; -->
  <div class="w-4 shadow-[0_0_10px_#fff]"></div>
</template>

<style>
  .sample-class {
    /* height: 0.009vh; */
    height: 10px;
  }
</style>
```
