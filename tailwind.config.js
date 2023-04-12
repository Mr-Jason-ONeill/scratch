const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './sections/*.{liquid,html,js}',
    './templates/**/*.{liquid,html,js}',
    './layout/*.{liquid,html,js}',
    './snippets/*.{liquid,html,js}',
    "./src/scripts/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  safelist: (function () { // function to safelist any classes used in the CMS
    let safeList = [];
    let breakpoints = ['sm:','md:','lg:','xl:','2xl:'];
    let widths = ['full','1/2','1/12','2/12','2.4/12','3/12','4/12','5/12','6/12','7/12','8/12','9/12','10/12','11/12','12/12'];
    let maxWidths = ['sm', 'md','lg','xl','2xl'];
    let justify = ['start', 'center', 'end', 'between'];
    let itemsAlign = ['start', 'center', 'end'];
    let order = ['none','1','2','3','4','5','6','7','8','9','10','11','12'];
    let align = ['left','center','right'];
    let spacingPrefixes = ['-m','m','p','-p','pb','px','-mb','mb','mr','-mr','-mx','ml','pl'];
    let spacing = ['auto','2','4','6','8', '10','12','16','24','32'];
    let cursors = ['pointer'];
    let flexs = ['col', 'col-reverse', 'row', 'row-reverse'];
    let displays = ['block', 'inline-block'];
    let bg = ['primary', 'conception'];
    let textColors = ['white', 'grayHalf', 'conception'];
    let grids = [1, 2, 3, 4, 5];

    // non breakpoint
    grids.forEach(grid => safeList.push('grid-cols-' + grid));
    bg.forEach(bg => safeList.push('bg-' + bg));
    textColors.forEach(textColor => safeList.push('text-' + textColor));
    displays.forEach(display => safeList.push(display));
    flexs.forEach(dir => safeList.push('flex-' + dir));
    cursors.forEach(cursor => safeList.push('cursor-' + cursor));
    widths.forEach(width => safeList.push('w-' + width));
    justify.forEach(justify => safeList.push('justify-' + justify));
    order.forEach(order => safeList.push('order-' + order));
    maxWidths.forEach(maxWidth => safeList.push('max-w-screen-' + maxWidth));
    itemsAlign.forEach(align => safeList.push('items-' + align))
    itemsAlign.forEach(align => safeList.push('self-' + align))
    align.forEach(align => safeList.push('text-' + align))
    spacing.forEach((spacing) => {
      spacingPrefixes.forEach((prefix) => {
        safeList.push(prefix + '-' + spacing);
      })
    })

    // with breakpoints
    breakpoints.forEach(bp => {
      displays.forEach(display => safeList.push(bp + display));
      flexs.forEach(dir => safeList.push(bp + 'flex-' + dir));
      widths.forEach(width => safeList.push(bp + 'w-' + width))
      justify.forEach(justify => safeList.push(bp + 'justify-' + justify))
      order.forEach(order => safeList.push(bp + 'order-' + order))
      align.forEach(align => safeList.push(bp + 'text-' + align))
      itemsAlign.forEach(align => safeList.push(bp + 'items-' + align))

      spacing.forEach((spacing) => {
        spacingPrefixes.forEach((prefix) => {
          safeList.push(bp + prefix + '-' + spacing);
        })
      })
    });

    safeList.push('flex-1');
    safeList.push('bg-gray-100');
    safeList.push('duration-700');    
  
    return safeList;
  })(),
  theme: {
    container: {
      padding: '28px',
      center: true,
    },
    screens: {
      'sm': '640px',
      'md': '960px',
      'lg': '1190px',
      'xl': '1297px',
      '2xl': '1640px',
    },
    fontFamily: {
      header: "'Poppins', sans-serif",
      body: "'Poppins', sans-serif",
      italic: "'Crimson Pro', sans-serif",
    },
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.025em',
      wider: '.08em',
      widest: '.1em',
    },
    extend: {
      colors: {
        black: "#333333",
        yellowLight: "#F0ECE1",
        yellowDark: "#C07859",
        yellowMedium: "#E2BB9E",
        backgroundLight: "#F8F7F5",
        backgroundWarm: "#EFE7D3",
        lightGreyWarm: "#CDCAC2",
        darkGrey: "#655F5F",
        mediumGrey: "#8B8B8B",
        success: "#86AEA5",
        conception: "var(--stages-color-conception)",
        firstTrimester: "var(--stages-color-conception)"
      },
      width: {
        '2.4/12': '20%',
        '12/12': '100%',
      },
      boxShadow: {
        'DEFAULT': '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      borderColor: {
        'DEFAULT': "#CDCAC2",
      }
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
    require('flowbite/plugin'),
    require('@tailwindcss/typography'),
  ],
}
