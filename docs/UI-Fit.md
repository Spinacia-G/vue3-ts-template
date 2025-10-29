## UI-Fit

1. config `font-size` in `src/styles/reset.css`

```css
html {
  text-size-adjust: none;
  font-size: calc(1 / 1920 * 100vw);
  /* font-size: calc(1 / 1080 * 100vh) */
}

body {
  font-size: 16rem;
}
```

2. update tailwindcss theme variables in `src/styles/tailwind.css`

- reference: https://tailwindcss.com/docs/theme#default-theme-variable-reference

```css
@theme {
  --spacing: 1rem;

  --text-xs: 12rem;
  --text-sm: 14rem;
  --text-base: 16rem;
  --text-lg: 18rem;
  --text-xl: 20rem;
  --text-2xl: 24rem;
  --text-3xl: 30rem;
  --text-4xl: 36rem;
  --text-5xl: 48rem;
  --text-6xl: 60rem;
  --text-7xl: 72rem;
  --text-8xl: 96rem;
  --text-9xl: 128rem;

  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;

  --radius-xs: 2rem;
  --radius-sm: 4rem;
  --radius-md: 6rem;
  --radius-lg: 8rem;
  --radius-xl: 12rem;
  --radius-2xl: 16rem;
  --radius-3xl: 24rem;
  --radius-4xl: 32rem;

  --shadow-2xs: 0 1rem rgb(0 0 0 / 0.05);
  --shadow-xs: 0 1rem 2rem 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1rem 3rem 0 rgb(0 0 0 / 0.1), 0 1rem 2rem -1rem rgb(0 0 0 / 0.1);
  --shadow-md: 0 4rem 6rem -1rem rgb(0 0 0 / 0.1), 0 2rem 4rem -2rem rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10rem 15rem -3rem rgb(0 0 0 / 0.1), 0 4rem 6rem -4rem rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20rem 25rem -5rem rgb(0 0 0 / 0.1), 0 8rem 10rem -6rem rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25rem 50rem -12rem rgb(0 0 0 / 0.25);

  --inset-shadow-2xs: inset 0 1rem rgb(0 0 0 / 0.05);
  --inset-shadow-xs: inset 0 1rem 1rem rgb(0 0 0 / 0.05);
  --inset-shadow-sm: inset 0 2rem 4rem rgb(0 0 0 / 0.05);

  --drop-shadow-xs: 0 1rem 1rem rgb(0 0 0 / 0.05);
  --drop-shadow-sm: 0 1rem 2rem rgb(0 0 0 / 0.15);
  --drop-shadow-md: 0 3rem 3rem rgb(0 0 0 / 0.12);
  --drop-shadow-lg: 0 4rem 4rem rgb(0 0 0 / 0.15);
  --drop-shadow-xl: 0 9rem 7rem rgb(0 0 0 / 0.1);
  --drop-shadow-2xl: 0 25rem 25rem rgb(0 0 0 / 0.15);

  --text-shadow-2xs: 0 1rem 0 rgb(0 0 0 / 0.15);
  --text-shadow-xs: 0 1rem 1rem rgb(0 0 0 / 0.2);
  --text-shadow-sm:
    0 1rem 0 rgb(0 0 0 / 0.075), 0 1rem 1rem rgb(0 0 0 / 0.075), 0 2rem 2rem rgb(0 0 0 / 0.075);
  --text-shadow-md:
    0 1rem 1rem rgb(0 0 0 / 0.1), 0 1rem 2rem rgb(0 0 0 / 0.1), 0 2rem 4rem rgb(0 0 0 / 0.1);
  --text-shadow-lg:
    0 1rem 2rem rgb(0 0 0 / 0.1), 0 3rem 2rem rgb(0 0 0 / 0.1), 0 4rem 8rem rgb(0 0 0 / 0.1);

  --blur-xs: 4rem;
  --blur-sm: 8rem;
  --blur-md: 12rem;
  --blur-lg: 16rem;
  --blur-xl: 24rem;
  --blur-2xl: 40rem;
  --blur-3xl: 64rem;

  --perspective-dramatic: 100rem;
  --perspective-near: 300rem;
  --perspective-normal: 500rem;
  --perspective-midrange: 800rem;
  --perspective-distant: 1200rem;
}
```

3. use `rem` unit in components

```vue
<template>
  <!-- width: 100rem; border-width: 1rem; -->
  <div class="w-100 border-[1rem]"></div>
</template>
```
