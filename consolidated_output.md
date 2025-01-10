### Directory Structure

```
update/
├── tailwind.config.js (12 lines)
│   ├── public/
│   │   ├── simplify-logo.png
│   │   │   ├── jobs/
│   │   │   │   ├── VirtualTable.jsx (56 lines)
│   │   │   │   ├── ActionButton.jsx (55 lines)
│   │   │   │   ├── SectionHeader.jsx (58 lines)
│   │   │   │   ├── FilterSection.jsx (135 lines)
│   │   │   │   ├── FilterModal.jsx (216 lines)
│   │   │   │   ├── SortSection.jsx (98 lines)
│   │   │   │   ├── JobsTable.jsx (199 lines)
│   │   │   │   ├── SearchBar.jsx (76 lines)
│   │   │   │   └── SortModal.jsx (95 lines)
│   │   │   ├── common/
│   │   │   │   ├── Icons.jsx (75 lines)
│   │   │   │   ├── TableHeader.jsx (34 lines)
│   │   │   │   ├── Button.jsx (35 lines)
│   │   │   │   ├── Tooltip.jsx (14 lines)
│   │   │   │   ├── Badge.jsx (19 lines)
│   │   │   │   ├── IconButton.jsx (54 lines)
│   │   │   │   └── Modal.jsx (58 lines)
│   │   │   └── layout/
│   │   │       ├── Navbar.jsx (47 lines)
│   │   │       ├── Footer.jsx (0 lines)
│   │   │       ├── Layout.jsx (14 lines)
│   │   │       └── AuthRequired.jsx (26 lines)
│   │   ├── data/
│   │   │   └── users.json (14 lines)
│   │   ├── pages/
│   │   │   ├── Jobs.jsx (300 lines)
│   │   │   ├── Home.jsx (15 lines)
│   │   │   ├── Profile.jsx (129 lines)
│   │   │   ├── Login.jsx (90 lines)
│   │   │   └── Analytics.jsx (177 lines)
│   │   ├── config/
│   │   │   └── index.js (33 lines)
│   │   ├── hooks/
│   │   │   ├── useTableManager.js (144 lines)
│   │   │   ├── useJobs.js (56 lines)
│   │   │   ├── useDragAndDrop.js (31 lines)
│   │   │   └── useApplications.js (62 lines)
│   │   ├── utils/
│   │   │   ├── auth.js (23 lines)
│   │   │   ├── filters.js (56 lines)
│   │   │   ├── api.js (59 lines)
│   │   │   └── sorts.js (37 lines)
│   │   ├── context/
│   │   │   ├── ApplicationContext.jsx (94 lines)
│   │   │   └── AuthContext.jsx (44 lines)
│   │   └── components/
│   │       └── ProtectedRoute.jsx (28 lines)
│   └── src/
│       ├── vite.config.js (22 lines)
│       ├── index.css (3 lines)
│       ├── main.jsx (10 lines)
│       └── App.jsx (68 lines)
├── .env (1 lines)
├── package-lock.json (3224 lines)
├── postcss.config.js (8 lines)
├── index.html (14 lines)
└── package.json (28 lines)

```

### update/tailwind.config.js

```
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
```

### update/.env

```
VITE_API_URL=http://localhost:3000
```

### update/package-lock.json

```
{
  "name": "update",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "update",
      "version": "1.0.0",
      "license": "ISC",
      "dependencies": {
        "@headlessui/react": "^2.2.0",
        "@heroicons/react": "^2.2.0",
        "@vitejs/plugin-react": "^4.3.4",
        "classnames": "^2.5.1",
        "react": "^19.0.0",
        "react-dom": "^19.0.0",
        "react-router-dom": "^7.1.1",
        "vite": "^6.0.7"
      },
      "devDependencies": {
        "autoprefixer": "^10.4.20",
        "postcss": "^8.4.49",
        "tailwindcss": "^3.4.17"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
      "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@ampproject/remapping": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/@ampproject/remapping/-/remapping-2.3.0.tgz",
      "integrity": "sha512-30iZtAPgz+LTIYoeivqYo853f02jBYSd5uGnGpkFV0M3xOt9aN73erkgYAmZU43x4VfqcnLxW9Kpg3R5LC4YYw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.26.2",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.26.2.tgz",
      "integrity": "sha512-RJlIHRueQgwWitWgF8OdFYGZX328Ax5BCemNGlqHfplnRT9ESi8JkFlvaVYbS+UubVY6dpv87Fs2u5M29iNFVQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.25.9",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.0.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.26.3",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.26.3.tgz",
      "integrity": "sha512-nHIxvKPniQXpmQLb0vhY3VaFb3S0YrTAwpOWJZh1wn3oJPjJk9Asva204PsBdmAE8vpzfHudT8DB0scYvy9q0g==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.26.0",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.26.0.tgz",
      "integrity": "sha512-i1SLeK+DzNnQ3LL/CswPCa/E5u4lh1k6IAEphON8F+cXt0t9euTshDru0q7/IqMa1PMPz5RnHuHscF8/ZJsStg==",
      "license": "MIT",
      "dependencies": {
        "@ampproject/remapping": "^2.2.0",
        "@babel/code-frame": "^7.26.0",
        "@babel/generator": "^7.26.0",
        "@babel/helper-compilation-targets": "^7.25.9",
        "@babel/helper-module-transforms": "^7.26.0",
        "@babel/helpers": "^7.26.0",
        "@babel/parser": "^7.26.0",
        "@babel/template": "^7.25.9",
        "@babel/traverse": "^7.25.9",
        "@babel/types": "^7.26.0",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.26.3",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.26.3.tgz",
      "integrity": "sha512-6FF/urZvD0sTeO7k6/B15pMLC4CHUv1426lzr3N01aHJTl046uCAh9LXW/fzeXXjPNCJ6iABW5XaWOsIZB93aQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.26.3",
        "@babel/types": "^7.26.3",
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.25",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.25.9",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.25.9.tgz",
      "integrity": "sha512-j9Db8Suy6yV/VHa4qzrj9yZfZxhLWQdVnRlXxmKLYlhWUVB1sB2G5sxuWYXk/whHD9iW76PmNzxZ4UCnTQTVEQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.25.9",
        "@babel/helper-validator-option": "^7.25.9",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.25.9",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.25.9.tgz",
      "integrity": "sha512-tnUA4RsrmflIM6W6RFTLFSXITtl0wKjgpnLgXyowocVPrbYrLUXSBXDgTs8BlbmIzIdlBySRQjINYs2BAkiLtw==",
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.25.9",
        "@babel/types": "^7.25.9"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.26.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.26.0.tgz",
      "integrity": "sha512-xO+xu6B5K2czEnQye6BHA7DolFFmS3LB7stHZFaOLb1pAwO1HWLS8fXA+eh0A2yIvltPVmx3eNNDBJA2SLHXFw==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.25.9",
        "@babel/helper-validator-identifier": "^7.25.9",
        "@babel/traverse": "^7.25.9"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.25.9",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.25.9.tgz",
      "integrity": "sha512-kSMlyUVdWe25rEsRGviIgOWnoT/nfABVWlqt9N19/dIPWViAOW2s9wznP5tURbs/IDuNk4gPy3YdYRgH3uxhBw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.25.9",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.25.9.tgz",
      "integrity": "sha512-4A/SCr/2KLd5jrtOMFzaKjVtAei3+2r/NChoBNoZ3EyP/+GlhoaEGoWOZUmFmoITP7zOJyHIMm+DYRd8o3PvHA==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.25.9",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.25.9.tgz",
      "integrity": "sha512-Ed61U6XJc3CVRfkERJWDz4dJwKe7iLmmJsbOGu9wSloNSFttHV0I8g6UAgb7qnK5ly5bGLPd4oXZlxCdANBOWQ==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.25.9",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.25.9.tgz",
      "integrity": "sha512-e/zv1co8pp55dNdEcCynfj9X7nyUKUXoUEwfXqaZt0omVOmDe9oOTdKStH4GmAw6zxMFs50ZayuMfHDKlO7Tfw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.26.0",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.26.0.tgz",
      "integrity": "sha512-tbhNuIxNcVb21pInl3ZSjksLCvgdZy9KwJ8brv993QtIVKJBBkYXz4q4ZbAv31GdnC+R90np23L5FbEBlthAEw==",
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.25.9",
        "@babel/types": "^7.26.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.26.3",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.26.3.tgz",
      "integrity": "sha512-WJ/CvmY8Mea8iDXo6a7RK2wbmJITT5fN3BEkRuFlxVyNx8jOKIIhmC4fSkTcPcf8JyavbBwIe6OpiCOBXt/IcA==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.26.3"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-self": {
      "version": "7.25.9",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.25.9.tgz",
      "integrity": "sha512-y8quW6p0WHkEhmErnfe58r7x0A70uKphQm8Sp8cV7tjNQwK56sNVK0M73LK3WuYmsuyrftut4xAkjjgU0twaMg==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.25.9"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-source": {
      "version": "7.25.9",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.25.9.tgz",
      "integrity": "sha512-+iqjT8xmXhhYv4/uiYd8FNQsraMFZIfxVSqxxVSZP0WbbSAWvBXAul0m/zu+7Vv4O/3WtApy9pmaTMiumEZgfg==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.25.9"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.25.9",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.25.9.tgz",
      "integrity": "sha512-9DGttpmPvIxBb/2uwpVo3dqJ+O6RooAFOS+lB+xDqoE2PVCE8nfoHMdZLpfCQRLwvohzXISPZcgxt80xLfsuwg==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.25.9",
        "@babel/parser": "^7.25.9",
        "@babel/types": "^7.25.9"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.26.4",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.26.4.tgz",
      "integrity": "sha512-fH+b7Y4p3yqvApJALCPJcwb0/XaOSgtK4pzV6WVjPR5GLFQBRI7pfoX2V2iM48NXvX07NUxxm1Vw98YjqTcU5w==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.26.2",
        "@babel/generator": "^7.26.3",
        "@babel/parser": "^7.26.3",
        "@babel/template": "^7.25.9",
        "@babel/types": "^7.26.3",
        "debug": "^4.3.1",
        "globals": "^11.1.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.26.3",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.26.3.tgz",
      "integrity": "sha512-vN5p+1kl59GVKMvTHt55NzzmYVxprfJD+ql7U9NFIfKCBkYE55LYtS+WtPlaYOyzydrKI8Nezd+aZextrd+FMA==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.25.9",
        "@babel/helper-validator-identifier": "^7.25.9"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.24.2.tgz",
      "integrity": "sha512-thpVCb/rhxE/BnMLQ7GReQLLN8q9qbHmI55F4489/ByVg2aQaQ6kbcLb6FHkocZzQhxc4gx0sCk0tJkKBFzDhA==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.24.2.tgz",
      "integrity": "sha512-tmwl4hJkCfNHwFB3nBa8z1Uy3ypZpxqxfTQOcHX+xRByyYgunVbZ9MzUUfb0RxaHIMnbHagwAxuTL+tnNM+1/Q==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.24.2.tgz",
      "integrity": "sha512-cNLgeqCqV8WxfcTIOeL4OAtSmL8JjcN6m09XIgro1Wi7cF4t/THaWEa7eL5CMoMBdjoHOTh/vwTO/o2TRXIyzg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.24.2.tgz",
      "integrity": "sha512-B6Q0YQDqMx9D7rvIcsXfmJfvUYLoP722bgfBlO5cGvNVb5V/+Y7nhBE3mHV9OpxBf4eAS2S68KZztiPaWq4XYw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.24.2.tgz",
      "integrity": "sha512-kj3AnYWc+CekmZnS5IPu9D+HWtUI49hbnyqk0FLEJDbzCIQt7hg7ucF1SQAilhtYpIujfaHr6O0UHlzzSPdOeA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.24.2.tgz",
      "integrity": "sha512-WeSrmwwHaPkNR5H3yYfowhZcbriGqooyu3zI/3GGpF8AyUdsrrP0X6KumITGA9WOyiJavnGZUwPGvxvwfWPHIA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.24.2.tgz",
      "integrity": "sha512-UN8HXjtJ0k/Mj6a9+5u6+2eZ2ERD7Edt1Q9IZiB5UZAIdPnVKDoG7mdTVGhHJIeEml60JteamR3qhsr1r8gXvg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.24.2.tgz",
      "integrity": "sha512-TvW7wE/89PYW+IevEJXZ5sF6gJRDY/14hyIGFXdIucxCsbRmLUcjseQu1SyTko+2idmCw94TgyaEZi9HUSOe3Q==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.24.2.tgz",
      "integrity": "sha512-n0WRM/gWIdU29J57hJyUdIsk0WarGd6To0s+Y+LwvlC55wt+GT/OgkwoXCXvIue1i1sSNWblHEig00GBWiJgfA==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.24.2.tgz",
      "integrity": "sha512-7HnAD6074BW43YvvUmE/35Id9/NB7BeX5EoNkK9obndmZBUk8xmJJeU7DwmUeN7tkysslb2eSl6CTrYz6oEMQg==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.24.2.tgz",
      "integrity": "sha512-sfv0tGPQhcZOgTKO3oBE9xpHuUqguHvSo4jl+wjnKwFpapx+vUDcawbwPNuBIAYdRAvIDBfZVvXprIj3HA+Ugw==",
      "cpu": [
        "ia32"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.24.2.tgz",
      "integrity": "sha512-CN9AZr8kEndGooS35ntToZLTQLHEjtVB5n7dl8ZcTZMonJ7CCfStrYhrzF97eAecqVbVJ7APOEe18RPI4KLhwQ==",
      "cpu": [
        "loong64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.24.2.tgz",
      "integrity": "sha512-iMkk7qr/wl3exJATwkISxI7kTcmHKE+BlymIAbHO8xanq/TjHaaVThFF6ipWzPHryoFsesNQJPE/3wFJw4+huw==",
      "cpu": [
        "mips64el"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.24.2.tgz",
      "integrity": "sha512-shsVrgCZ57Vr2L8mm39kO5PPIb+843FStGt7sGGoqiiWYconSxwTiuswC1VJZLCjNiMLAMh34jg4VSEQb+iEbw==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.24.2.tgz",
      "integrity": "sha512-4eSFWnU9Hhd68fW16GD0TINewo1L6dRrB+oLNNbYyMUAeOD2yCK5KXGK1GH4qD/kT+bTEXjsyTCiJGHPZ3eM9Q==",
      "cpu": [
        "riscv64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.24.2.tgz",
      "integrity": "sha512-S0Bh0A53b0YHL2XEXC20bHLuGMOhFDO6GN4b3YjRLK//Ep3ql3erpNcPlEFed93hsQAjAQDNsvcK+hV90FubSw==",
      "cpu": [
        "s390x"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.24.2.tgz",
      "integrity": "sha512-8Qi4nQcCTbLnK9WoMjdC9NiTG6/E38RNICU6sUNqK0QFxCYgoARqVqxdFmWkdonVsvGqWhmm7MO0jyTqLqwj0Q==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-arm64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.24.2.tgz",
      "integrity": "sha512-wuLK/VztRRpMt9zyHSazyCVdCXlpHkKm34WUyinD2lzK07FAHTq0KQvZZlXikNWkDGoT6x3TD51jKQ7gMVpopw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.24.2.tgz",
      "integrity": "sha512-VefFaQUc4FMmJuAxmIHgUmfNiLXY438XrL4GDNV1Y1H/RW3qow68xTwjZKfj/+Plp9NANmzbH5R40Meudu8mmw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-arm64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.24.2.tgz",
      "integrity": "sha512-YQbi46SBct6iKnszhSvdluqDmxCJA+Pu280Av9WICNwQmMxV7nLRHZfjQzwbPs3jeWnuAhE9Jy0NrnJ12Oz+0A==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.24.2.tgz",
      "integrity": "sha512-+iDS6zpNM6EnJyWv0bMGLWSWeXGN/HTaF/LXHXHwejGsVi+ooqDfMCCTerNFxEkM3wYVcExkeGXNqshc9iMaOA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.24.2.tgz",
      "integrity": "sha512-hTdsW27jcktEvpwNHJU4ZwWFGkz2zRJUz8pvddmXPtXDzVKTTINmlmga3ZzwcuMpUvLw7JkLy9QLKyGpD2Yxig==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.24.2.tgz",
      "integrity": "sha512-LihEQ2BBKVFLOC9ZItT9iFprsE9tqjDjnbulhHoFxYQtQfai7qfluVODIYxt1PgdoyQkz23+01rzwNwYfutxUQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.24.2.tgz",
      "integrity": "sha512-q+iGUwfs8tncmFC9pcnD5IvRHAzmbwQ3GPS5/ceCyHdjXubwQWI12MKWSNSMYLJMq23/IUCvJMS76PDqXe1fxA==",
      "cpu": [
        "ia32"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.24.2.tgz",
      "integrity": "sha512-7VTgWzgMGvup6aSqDPLiW5zHaxYJGTO4OokMjIlrCtf+VpEL+cXKtCvg723iguPYI5oaUNdS+/V7OU2gvXVWEg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@floating-ui/core": {
      "version": "1.6.9",
      "resolved": "https://registry.npmjs.org/@floating-ui/core/-/core-1.6.9.tgz",
      "integrity": "sha512-uMXCuQ3BItDUbAMhIXw7UPXRfAlOAvZzdK9BWpE60MCn+Svt3aLn9jsPTi/WNGlRUu2uI0v5S7JiIUsbsvh3fw==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/utils": "^0.2.9"
      }
    },
    "node_modules/@floating-ui/dom": {
      "version": "1.6.13",
      "resolved": "https://registry.npmjs.org/@floating-ui/dom/-/dom-1.6.13.tgz",
      "integrity": "sha512-umqzocjDgNRGTuO7Q8CU32dkHkECqI8ZdMZ5Swb6QAM0t5rnlrN3lGo1hdpscRd3WS8T6DKYK4ephgIH9iRh3w==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/core": "^1.6.0",
        "@floating-ui/utils": "^0.2.9"
      }
    },
    "node_modules/@floating-ui/react": {
      "version": "0.26.28",
      "resolved": "https://registry.npmjs.org/@floating-ui/react/-/react-0.26.28.tgz",
      "integrity": "sha512-yORQuuAtVpiRjpMhdc0wJj06b9JFjrYF4qp96j++v2NBpbi6SEGF7donUJ3TMieerQ6qVkAv1tgr7L4r5roTqw==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/react-dom": "^2.1.2",
        "@floating-ui/utils": "^0.2.8",
        "tabbable": "^6.0.0"
      },
      "peerDependencies": {
        "react": ">=16.8.0",
        "react-dom": ">=16.8.0"
      }
    },
    "node_modules/@floating-ui/react-dom": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/@floating-ui/react-dom/-/react-dom-2.1.2.tgz",
      "integrity": "sha512-06okr5cgPzMNBy+Ycse2A6udMi4bqwW/zgBF/rwjcNqWkyr82Mcg8b0vjX8OJpZFy/FKjJmw6wV7t44kK6kW7A==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/dom": "^1.0.0"
      },
      "peerDependencies": {
        "react": ">=16.8.0",
        "react-dom": ">=16.8.0"
      }
    },
    "node_modules/@floating-ui/utils": {
      "version": "0.2.9",
      "resolved": "https://registry.npmjs.org/@floating-ui/utils/-/utils-0.2.9.tgz",
      "integrity": "sha512-MDWhGtE+eHw5JW7lq4qhc5yRLS11ERl1c7Z6Xd0a58DozHES6EnNNwUWbMiG4J9Cgj053Bhk8zvlhFYKVhULwg==",
      "license": "MIT"
    },
    "node_modules/@headlessui/react": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/@headlessui/react/-/react-2.2.0.tgz",
      "integrity": "sha512-RzCEg+LXsuI7mHiSomsu/gBJSjpupm6A1qIZ5sWjd7JhARNlMiSA4kKfJpCKwU9tE+zMRterhhrP74PvfJrpXQ==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/react": "^0.26.16",
        "@react-aria/focus": "^3.17.1",
        "@react-aria/interactions": "^3.21.3",
        "@tanstack/react-virtual": "^3.8.1"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "react": "^18 || ^19 || ^19.0.0-rc",
        "react-dom": "^18 || ^19 || ^19.0.0-rc"
      }
    },
    "node_modules/@heroicons/react": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/@heroicons/react/-/react-2.2.0.tgz",
      "integrity": "sha512-LMcepvRaS9LYHJGsF0zzmgKCUim/X3N/DQKc4jepAXJ7l8QxJ1PmxJzqplF2Z3FE4PqBAIGyJAQ/w4B5dsqbtQ==",
      "license": "MIT",
      "peerDependencies": {
        "react": ">= 16 || ^19.0.0-rc"
      }
    },
    "node_modules/@isaacs/cliui": {
      "version": "8.0.2",
      "resolved": "https://registry.npmjs.org/@isaacs/cliui/-/cliui-8.0.2.tgz",
      "integrity": "sha512-O8jcjabXaleOG9DQ0+ARXWZBTfnP4WNAqzuiJK7ll44AmxGKv/J2M4TPjxjY3znBCfvBXFzucm1twdyFybFqEA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "string-width": "^5.1.2",
        "string-width-cjs": "npm:string-width@^4.2.0",
        "strip-ansi": "^7.0.1",
        "strip-ansi-cjs": "npm:strip-ansi@^6.0.1",
        "wrap-ansi": "^8.1.0",
        "wrap-ansi-cjs": "npm:wrap-ansi@^7.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.8",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.8.tgz",
      "integrity": "sha512-imAbBGkb+ebQyxKgzv5Hu2nmROxoDOXHh80evxdoXNOrvAnVx7zimzc1Oo5h9RlfV4vPXaE2iM5pOFbvOCClWA==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/set-array": "^1.2.1",
        "@jridgewell/sourcemap-codec": "^1.4.10",
        "@jridgewell/trace-mapping": "^0.3.24"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/set-array": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@jridgewell/set-array/-/set-array-1.2.1.tgz",
      "integrity": "sha512-R8gLRTZeyp03ymzP/6Lil/28tGeGEzhx1q2k703KGWRAI1VdvPIXdG70VJc2pAMw3NA6JKL5hhFu1sJX0Mnn/A==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.0.tgz",
      "integrity": "sha512-gv3ZRaISU3fjPAgNsriBRqGWQL6quFx04YMPW/zD8XMLsU32mhCCbfbO6KZFLjvYpCZ8zyDEgqsgf+PwPaM7GQ==",
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.25",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.25.tgz",
      "integrity": "sha512-vNk6aEwybGtawWmy/PzwnGDOjCkLWSD2wqvjGGAgOAwCGWySYXfYoxt00IJkTF+8Lb57DwOb3Aa0o9CApepiYQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@pkgjs/parseargs": {
      "version": "0.11.0",
      "resolved": "https://registry.npmjs.org/@pkgjs/parseargs/-/parseargs-0.11.0.tgz",
      "integrity": "sha512-+1VkjdD0QBLPodGrJUeqarH8VAIvQODIbwh9XpP5Syisf7YoQgsJKPNFoqqLQlu+VQ/tVSshMR6loPMn8U+dPg==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=14"
      }
    },
    "node_modules/@react-aria/focus": {
      "version": "3.19.0",
      "resolved": "https://registry.npmjs.org/@react-aria/focus/-/focus-3.19.0.tgz",
      "integrity": "sha512-hPF9EXoUQeQl1Y21/rbV2H4FdUR2v+4/I0/vB+8U3bT1CJ+1AFj1hc/rqx2DqEwDlEwOHN+E4+mRahQmlybq0A==",
      "license": "Apache-2.0",
      "dependencies": {
        "@react-aria/interactions": "^3.22.5",
        "@react-aria/utils": "^3.26.0",
        "@react-types/shared": "^3.26.0",
        "@swc/helpers": "^0.5.0",
        "clsx": "^2.0.0"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0-rc.1 || ^18.0.0 || ^19.0.0-rc.1"
      }
    },
    "node_modules/@react-aria/interactions": {
      "version": "3.22.5",
      "resolved": "https://registry.npmjs.org/@react-aria/interactions/-/interactions-3.22.5.tgz",
      "integrity": "sha512-kMwiAD9E0TQp+XNnOs13yVJghiy8ET8L0cbkeuTgNI96sOAp/63EJ1FSrDf17iD8sdjt41LafwX/dKXW9nCcLQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@react-aria/ssr": "^3.9.7",
        "@react-aria/utils": "^3.26.0",
        "@react-types/shared": "^3.26.0",
        "@swc/helpers": "^0.5.0"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0-rc.1 || ^18.0.0 || ^19.0.0-rc.1"
      }
    },
    "node_modules/@react-aria/ssr": {
      "version": "3.9.7",
      "resolved": "https://registry.npmjs.org/@react-aria/ssr/-/ssr-3.9.7.tgz",
      "integrity": "sha512-GQygZaGlmYjmYM+tiNBA5C6acmiDWF52Nqd40bBp0Znk4M4hP+LTmI0lpI1BuKMw45T8RIhrAsICIfKwZvi2Gg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@swc/helpers": "^0.5.0"
      },
      "engines": {
        "node": ">= 12"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0-rc.1 || ^18.0.0 || ^19.0.0-rc.1"
      }
    },
    "node_modules/@react-aria/utils": {
      "version": "3.26.0",
      "resolved": "https://registry.npmjs.org/@react-aria/utils/-/utils-3.26.0.tgz",
      "integrity": "sha512-LkZouGSjjQ0rEqo4XJosS4L3YC/zzQkfRM3KoqK6fUOmUJ9t0jQ09WjiF+uOoG9u+p30AVg3TrZRUWmoTS+koQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@react-aria/ssr": "^3.9.7",
        "@react-stately/utils": "^3.10.5",
        "@react-types/shared": "^3.26.0",
        "@swc/helpers": "^0.5.0",
        "clsx": "^2.0.0"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0-rc.1 || ^18.0.0 || ^19.0.0-rc.1"
      }
    },
    "node_modules/@react-stately/utils": {
      "version": "3.10.5",
      "resolved": "https://registry.npmjs.org/@react-stately/utils/-/utils-3.10.5.tgz",
      "integrity": "sha512-iMQSGcpaecghDIh3mZEpZfoFH3ExBwTtuBEcvZ2XnGzCgQjeYXcMdIUwAfVQLXFTdHUHGF6Gu6/dFrYsCzySBQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "@swc/helpers": "^0.5.0"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0-rc.1 || ^18.0.0 || ^19.0.0-rc.1"
      }
    },
    "node_modules/@react-types/shared": {
      "version": "3.26.0",
      "resolved": "https://registry.npmjs.org/@react-types/shared/-/shared-3.26.0.tgz",
      "integrity": "sha512-6FuPqvhmjjlpEDLTiYx29IJCbCNWPlsyO+ZUmCUXzhUv2ttShOXfw8CmeHWHftT/b2KweAWuzqSlfeXPR76jpw==",
      "license": "Apache-2.0",
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0-rc.1 || ^18.0.0 || ^19.0.0-rc.1"
      }
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.30.1.tgz",
      "integrity": "sha512-pSWY+EVt3rJ9fQ3IqlrEUtXh3cGqGtPDH1FQlNZehO2yYxCHEX1SPsz1M//NXwYfbTlcKr9WObLnJX9FsS9K1Q==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.30.1.tgz",
      "integrity": "sha512-/NA2qXxE3D/BRjOJM8wQblmArQq1YoBVJjrjoTSBS09jgUisq7bqxNHJ8kjCHeV21W/9WDGwJEWSN0KQ2mtD/w==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.30.1.tgz",
      "integrity": "sha512-r7FQIXD7gB0WJ5mokTUgUWPl0eYIH0wnxqeSAhuIwvnnpjdVB8cRRClyKLQr7lgzjctkbp5KmswWszlwYln03Q==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.30.1.tgz",
      "integrity": "sha512-x78BavIwSH6sqfP2xeI1hd1GpHL8J4W2BXcVM/5KYKoAD3nNsfitQhvWSw+TFtQTLZ9OmlF+FEInEHyubut2OA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.30.1.tgz",
      "integrity": "sha512-HYTlUAjbO1z8ywxsDFWADfTRfTIIy/oUlfIDmlHYmjUP2QRDTzBuWXc9O4CXM+bo9qfiCclmHk1x4ogBjOUpUQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.30.1.tgz",
      "integrity": "sha512-1MEdGqogQLccphhX5myCJqeGNYTNcmTyaic9S7CG3JhwuIByJ7J05vGbZxsizQthP1xpVx7kd3o31eOogfEirw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.30.1.tgz",
      "integrity": "sha512-PaMRNBSqCx7K3Wc9QZkFx5+CX27WFpAMxJNiYGAXfmMIKC7jstlr32UhTgK6T07OtqR+wYlWm9IxzennjnvdJg==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.30.1.tgz",
      "integrity": "sha512-B8Rcyj9AV7ZlEFqvB5BubG5iO6ANDsRKlhIxySXcF1axXYUyqwBok+XZPgIYGBgs7LDXfWfifxhw0Ik57T0Yug==",
      "cpu": [
        "arm"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.30.1.tgz",
      "integrity": "sha512-hqVyueGxAj3cBKrAI4aFHLV+h0Lv5VgWZs9CUGqr1z0fZtlADVV1YPOij6AhcK5An33EXaxnDLmJdQikcn5NEw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.30.1.tgz",
      "integrity": "sha512-i4Ab2vnvS1AE1PyOIGp2kXni69gU2DAUVt6FSXeIqUCPIR3ZlheMW3oP2JkukDfu3PsexYRbOiJrY+yVNSk9oA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loongarch64-gnu": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loongarch64-gnu/-/rollup-linux-loongarch64-gnu-4.30.1.tgz",
      "integrity": "sha512-fARcF5g296snX0oLGkVxPmysetwUk2zmHcca+e9ObOovBR++9ZPOhqFUM61UUZ2EYpXVPN1redgqVoBB34nTpQ==",
      "cpu": [
        "loong64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-powerpc64le-gnu": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-powerpc64le-gnu/-/rollup-linux-powerpc64le-gnu-4.30.1.tgz",
      "integrity": "sha512-GLrZraoO3wVT4uFXh67ElpwQY0DIygxdv0BNW9Hkm3X34wu+BkqrDrkcsIapAY+N2ATEbvak0XQ9gxZtCIA5Rw==",
      "cpu": [
        "ppc64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.30.1.tgz",
      "integrity": "sha512-0WKLaAUUHKBtll0wvOmh6yh3S0wSU9+yas923JIChfxOaaBarmb/lBKPF0w/+jTVozFnOXJeRGZ8NvOxvk/jcw==",
      "cpu": [
        "riscv64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.30.1.tgz",
      "integrity": "sha512-GWFs97Ruxo5Bt+cvVTQkOJ6TIx0xJDD/bMAOXWJg8TCSTEK8RnFeOeiFTxKniTc4vMIaWvCplMAFBt9miGxgkA==",
      "cpu": [
        "s390x"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.30.1.tgz",
      "integrity": "sha512-UtgGb7QGgXDIO+tqqJ5oZRGHsDLO8SlpE4MhqpY9Llpzi5rJMvrK6ZGhsRCST2abZdBqIBeXW6WPD5fGK5SDwg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.30.1.tgz",
      "integrity": "sha512-V9U8Ey2UqmQsBT+xTOeMzPzwDzyXmnAoO4edZhL7INkwQcaW1Ckv3WJX3qrrp/VHaDkEWIBWhRwP47r8cdrOow==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.30.1.tgz",
      "integrity": "sha512-WabtHWiPaFF47W3PkHnjbmWawnX/aE57K47ZDT1BXTS5GgrBUEpvOzq0FI0V/UYzQJgdb8XlhVNH8/fwV8xDjw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.30.1.tgz",
      "integrity": "sha512-pxHAU+Zv39hLUTdQQHUVHf4P+0C47y/ZloorHpzs2SXMRqeAWmGghzAhfOlzFHHwjvgokdFAhC4V+6kC1lRRfw==",
      "cpu": [
        "ia32"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.30.1.tgz",
      "integrity": "sha512-D6qjsXGcvhTjv0kI4fU8tUuBDF/Ueee4SVX79VfNDXZa64TfCW1Slkb6Z7O1p7vflqZjcmOVdZlqf8gvJxc6og==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@swc/helpers": {
      "version": "0.5.15",
      "resolved": "https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.15.tgz",
      "integrity": "sha512-JQ5TuMi45Owi4/BIMAJBoSQoOJu12oOk/gADqlcUL9JEdHB8vyjUSsxqeNXnmXHjYKMi2WcYtezGEEhqUI/E2g==",
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.8.0"
      }
    },
    "node_modules/@tanstack/react-virtual": {
      "version": "3.11.2",
      "resolved": "https://registry.npmjs.org/@tanstack/react-virtual/-/react-virtual-3.11.2.tgz",
      "integrity": "sha512-OuFzMXPF4+xZgx8UzJha0AieuMihhhaWG0tCqpp6tDzlFwOmNBPYMuLOtMJ1Tr4pXLHmgjcWhG6RlknY2oNTdQ==",
      "license": "MIT",
      "dependencies": {
        "@tanstack/virtual-core": "3.11.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/tannerlinsley"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/@tanstack/virtual-core": {
      "version": "3.11.2",
      "resolved": "https://registry.npmjs.org/@tanstack/virtual-core/-/virtual-core-3.11.2.tgz",
      "integrity": "sha512-vTtpNt7mKCiZ1pwU9hfKPhpdVO2sVzFQsxoVBGtOSHxlrRRzYr8iQ2TlwbAcRYCcEiZ9ECAM8kBzH0v2+VzfKw==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/tannerlinsley"
      }
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.5",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz",
      "integrity": "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==",
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.6.8",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.6.8.tgz",
      "integrity": "sha512-ASsj+tpEDsEiFr1arWrlN6V3mdfjRMZt6LtK/Vp/kreFLnr5QH5+DhvD5nINYZXzwJvXeGq+05iUXcAzVrqWtw==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.4.tgz",
      "integrity": "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A==",
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.20.6",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.20.6.tgz",
      "integrity": "sha512-r1bzfrm0tomOI8g1SzvCaQHo6Lcv6zu0EA+W2kHrt8dyrHQxGzBBL4kdkzIS+jBMV+EYcMAEAqXqYaLJq5rOZg==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.20.7"
      }
    },
    "node_modules/@types/cookie": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/@types/cookie/-/cookie-0.6.0.tgz",
      "integrity": "sha512-4Kh9a6B2bQciAhf7FSuMRRkUWecJgJu9nPnx3yzpsfXX/c50REIqpHY4C82bXP90qrLtXtkDxTZosYO3UpOwlA==",
      "license": "MIT"
    },
    "node_modules/@types/estree": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.6.tgz",
      "integrity": "sha512-AYnb1nQyY49te+VRAVgmzfcgjYS91mY5P0TKUDCLEM+gNnA+3T6rWITXRLYCpahpqSQbN5cE+gHpnPyXjHWxcw==",
      "license": "MIT"
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "4.3.4",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-4.3.4.tgz",
      "integrity": "sha512-SCCPBJtYLdE8PX/7ZQAs1QAZ8Jqwih+0VBLum1EGqmCCQal+MIUqLCzj3ZUy8ufbC0cAM4LRlSTm7IQJwWT4ug==",
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.26.0",
        "@babel/plugin-transform-react-jsx-self": "^7.25.9",
        "@babel/plugin-transform-react-jsx-source": "^7.25.9",
        "@types/babel__core": "^7.20.5",
        "react-refresh": "^0.14.2"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "peerDependencies": {
        "vite": "^4.2.0 || ^5.0.0 || ^6.0.0"
      }
    },
    "node_modules/ansi-regex": {
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.1.0.tgz",
      "integrity": "sha512-7HSX4QQb4CspciLpVFwyRe79O3xsIZDDLER21kERQ71oaPodF8jL725AgJMFAYbooIqolJoRLuM81SpeUkpkvA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-regex?sponsor=1"
      }
    },
    "node_modules/ansi-styles": {
      "version": "6.2.1",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-6.2.1.tgz",
      "integrity": "sha512-bN798gFfQX+viw3R7yrGWRqnrN2oRkEkUjjl4JNn4E8GxxbjtG3FbrEIIY3l8/hrwUwIeCZvi4QuOTP4MErVug==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/any-promise": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
      "integrity": "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/arg": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
      "integrity": "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/autoprefixer": {
      "version": "10.4.20",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.4.20.tgz",
      "integrity": "sha512-XY25y5xSv/wEoqzDyXXME4AFfkZI0P23z6Fs3YgymDnKJkCGOnkL0iTxCa85UTqaSgfcqyf3UA6+c7wUvx/16g==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.23.3",
        "caniuse-lite": "^1.0.30001646",
        "fraction.js": "^4.3.7",
        "normalize-range": "^0.1.2",
        "picocolors": "^1.0.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/brace-expansion": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.0.1.tgz",
      "integrity": "sha512-XnAIvQ8eM+kC6aULx6wuQiwVsnzsi9d3WxzV3FpWTGA19F621kwdbsAcFKXgKUHZWsy+mY6iL1sHTxWEFCytDA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.24.4",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.24.4.tgz",
      "integrity": "sha512-KDi1Ny1gSePi1vm0q4oxSF8b4DR44GF4BbmS2YdhPLOEqd8pDviZOGH/GsmRwoWJ2+5Lr085X7naowMwKHDG1A==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "caniuse-lite": "^1.0.30001688",
        "electron-to-chromium": "^1.5.73",
        "node-releases": "^2.0.19",
        "update-browserslist-db": "^1.1.1"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/camelcase-css": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz",
      "integrity": "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001690",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001690.tgz",
      "integrity": "sha512-5ExiE3qQN6oF8Clf8ifIDcMRCRE/dMGcETG/XGMD8/XiXm6HXQgQTh1yZYLXXpSOsEUlJm1Xr7kGULZTuGtP/w==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/chokidar/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/classnames": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/classnames/-/classnames-2.5.1.tgz",
      "integrity": "sha512-saHYOzhIQs6wy2sVxTM6bUDsQO4F50V9RQ22qBpEdCW+I+/Wmke2HOl6lS6dTpdxVhb88/I6+Hs+438c3lfUow==",
      "license": "MIT"
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/commander": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
      "integrity": "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "license": "MIT"
    },
    "node_modules/cookie": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-1.0.2.tgz",
      "integrity": "sha512-9Kr/j4O16ISv8zBBhJoi4bXOYNTkFLOqSL3UDB0njXxCXNezjeyVrJyGOWtgfs/q2km1gwBcfH8q1yEGoMYunA==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "cssesc": "bin/cssesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/debug": {
      "version": "4.4.0",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.0.tgz",
      "integrity": "sha512-6WTZ/IxCY/T6BALoZHaE4ctp9xm+Z5kY/pzYaCHRFeyVhojxlrm+46y68HA6hr0TcwEssoxNiDEUJQjfPZ/RYA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/didyoumean": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
      "integrity": "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/eastasianwidth": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/eastasianwidth/-/eastasianwidth-0.2.0.tgz",
      "integrity": "sha512-I88TYZWc9XiYHRQ4/3c5rjjfgkjhLyW2luGIheGERbNQ6OY7yTybanSpDXZa8y7VUP9YmDcYa+eyq4ca7iLqWA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.79",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.79.tgz",
      "integrity": "sha512-nYOxJNxQ9Om4EC88BE4pPoNI8xwSFf8pU/BAeOl4Hh/b/i6V4biTAzwV7pXi3ARKeoYO5JZKMIXTryXSVer5RA==",
      "license": "ISC"
    },
    "node_modules/emoji-regex": {
      "version": "9.2.2",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-9.2.2.tgz",
      "integrity": "sha512-L18DaJsXSUk2+42pv8mLs5jJT2hqFkFE4j21wOmgbUqsZ2hL72NsUU785g9RXgo3s0ZNgVl42TiHp3ZtOv/Vyg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/esbuild": {
      "version": "0.24.2",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.24.2.tgz",
      "integrity": "sha512-+9egpBW8I3CD5XPe0n6BfT5fxLzxrlDzqydF3aviG+9ni1lDC/OvMHcxqEFV0+LANZG5R1bFMWfUrjVsdwxJvA==",
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.24.2",
        "@esbuild/android-arm": "0.24.2",
        "@esbuild/android-arm64": "0.24.2",
        "@esbuild/android-x64": "0.24.2",
        "@esbuild/darwin-arm64": "0.24.2",
        "@esbuild/darwin-x64": "0.24.2",
        "@esbuild/freebsd-arm64": "0.24.2",
        "@esbuild/freebsd-x64": "0.24.2",
        "@esbuild/linux-arm": "0.24.2",
        "@esbuild/linux-arm64": "0.24.2",
        "@esbuild/linux-ia32": "0.24.2",
        "@esbuild/linux-loong64": "0.24.2",
        "@esbuild/linux-mips64el": "0.24.2",
        "@esbuild/linux-ppc64": "0.24.2",
        "@esbuild/linux-riscv64": "0.24.2",
        "@esbuild/linux-s390x": "0.24.2",
        "@esbuild/linux-x64": "0.24.2",
        "@esbuild/netbsd-arm64": "0.24.2",
        "@esbuild/netbsd-x64": "0.24.2",
        "@esbuild/openbsd-arm64": "0.24.2",
        "@esbuild/openbsd-x64": "0.24.2",
        "@esbuild/sunos-x64": "0.24.2",
        "@esbuild/win32-arm64": "0.24.2",
        "@esbuild/win32-ia32": "0.24.2",
        "@esbuild/win32-x64": "0.24.2"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fastq": {
      "version": "1.18.0",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.18.0.tgz",
      "integrity": "sha512-QKHXPW0hD8g4UET03SdOdunzSouc9N4AuHdsX8XNcTsuz+yYFILVNIX4l9yHABMhiEI9Db0JTTIpu0wB+Y1QQw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/foreground-child": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/foreground-child/-/foreground-child-3.3.0.tgz",
      "integrity": "sha512-Ld2g8rrAyMYFXBhEqMz8ZAHBi4J4uS1i/CxGMDnjyFWddMXLVcDp051DZfu+t7+ab7Wv6SMqpWmyFIj5UbfFvg==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "cross-spawn": "^7.0.0",
        "signal-exit": "^4.0.1"
      },
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/fraction.js": {
      "version": "4.3.7",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-4.3.7.tgz",
      "integrity": "sha512-ZsDfxO51wGAXREY55a7la9LScWpwv9RxIrYABrlvOFBlH/ShPnrtsXeuUIfXKKOVicNxQ+o8JTbJvjS4M89yew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "patreon",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/glob": {
      "version": "10.4.5",
      "resolved": "https://registry.npmjs.org/glob/-/glob-10.4.5.tgz",
      "integrity": "sha512-7Bv8RF0k6xjo7d4A/PxYLbUCfb6c+Vpd2/mB2yRDlew7Jb5hEXiCD9ibfO7wpk8i4sevK6DFny9h7EYbM3/sHg==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "foreground-child": "^3.1.0",
        "jackspeak": "^3.1.2",
        "minimatch": "^9.0.4",
        "minipass": "^7.1.2",
        "package-json-from-dist": "^1.0.0",
        "path-scurry": "^1.11.1"
      },
      "bin": {
        "glob": "dist/esm/bin.mjs"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/globals": {
      "version": "11.12.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-11.12.0.tgz",
      "integrity": "sha512-WOBp/EEGUiIsJSp7wcv/y6MO+lV9UoncWqxuFfm8eBwzWNgyfBd6Gz+IeKQ9jCmyhoH99g15M3T+QaVHFjizVA==",
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.16.1",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.1.tgz",
      "integrity": "sha512-UfoeMA6fIJ8wTYFEUjelnaGI67v6+N7qXJEvQuIGa99l4xsCruSYOVSQ0uPANn4dAzm8lkYPaKLrrijLq7x23w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/jackspeak": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/jackspeak/-/jackspeak-3.4.3.tgz",
      "integrity": "sha512-OGlZQpz2yfahA/Rd1Y8Cd9SIEsqvXkLVoSw/cgwhnhFMDbsQFeZYoJJ7bIZBS9BcamUW96asq/npPWugM+RQBw==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "@isaacs/cliui": "^8.0.2"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      },
      "optionalDependencies": {
        "@pkgjs/parseargs": "^0.11.0"
      }
    },
    "node_modules/jiti": {
      "version": "1.21.7",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.21.7.tgz",
      "integrity": "sha512-/imKNG4EbWNrVjoNC/1H5/9GFy+tqjGBHCaSsN+P2RnPqjsLmv6UD3Ej+Kj8nBWaRAwyk7kK5ZUc+OEatnTR3A==",
      "devOptional": true,
      "license": "MIT",
      "bin": {
        "jiti": "bin/jiti.js"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "license": "MIT"
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/lilconfig": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-3.1.3.tgz",
      "integrity": "sha512-/vlFKAoH5Cgt3Ie+JLhRbwOsCQePABiU3tJ1egGvyQ+33R/vcwM2Zl2QR/LzjsBeItPt3oSVXapn+m4nQDvpzw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/antonk52"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/minimatch": {
      "version": "9.0.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-9.0.5.tgz",
      "integrity": "sha512-G6T0ZX48xgozx7587koeX9Ys2NYy6Gmv//P89sEte9V9whIapMNF4idKxnW2QtCcLiTWlb/wfCabAtAFWhhBow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^2.0.1"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/minipass": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-7.1.2.tgz",
      "integrity": "sha512-qOOzS1cBTWYF4BH8fVePDBOO9iptMnGUEZwNc/cMWnTV2nVLZ7VoNWEPHkYczZA0pdoA7dl6e7FL659nX9S2aw==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/mz": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz",
      "integrity": "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0",
        "object-assign": "^4.0.1",
        "thenify-all": "^1.0.0"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.8",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.8.tgz",
      "integrity": "sha512-WNLf5Sd8oZxOm+TzppcYk8gVOgP+l58xNy58D0nbUnOxOWRWvlcCV4kUF7ltmI6PsrLl/BgKEyS4mqsGChFN0w==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.19",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.19.tgz",
      "integrity": "sha512-xxOWJsBKtzAq7DY0J+DTzuz58K8e7sJbdgwkbMWQe8UYB6ekmsQ45q0M/tJDsGaZmbC+l7n57UV8Hl5tHxO9uw==",
      "license": "MIT"
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/normalize-range": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/normalize-range/-/normalize-range-0.1.2.tgz",
      "integrity": "sha512-bdok/XvKII3nUpklnV6P2hxtMNrCboOjAcyBuQnWEhO665FwrSNRxU+AqpsyvO6LgGYPspN+lu5CLtw4jPRKNA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-hash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
      "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/package-json-from-dist": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/package-json-from-dist/-/package-json-from-dist-1.0.1.tgz",
      "integrity": "sha512-UEZIS3/by4OC8vL3P2dTXRETpebLI2NiI5vIrjaD/5UtrkFX/tNbwjTSRAGC/+7CAo2pIcBaRgWmcBBHcsaCIw==",
      "dev": true,
      "license": "BlueOak-1.0.0"
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/path-scurry": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/path-scurry/-/path-scurry-1.11.1.tgz",
      "integrity": "sha512-Xa4Nw17FS9ApQFJ9umLiJS4orGjm7ZzwUrwamcGQuHSzDyth9boKDaycYdDcZDuqYATXw4HFXgaqWTctW/v1HA==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "lru-cache": "^10.2.0",
        "minipass": "^5.0.0 || ^6.0.2 || ^7.0.0"
      },
      "engines": {
        "node": ">=16 || 14 >=14.18"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/path-scurry/node_modules/lru-cache": {
      "version": "10.4.3",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-10.4.3.tgz",
      "integrity": "sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pify": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
      "integrity": "sha512-udgsAY+fTnvv7kI7aaxbqwWNb0AHiB0qBO89PZKPkoTmGOgdbrHDKD+0B2X4uTfJ/FT1R09r9gTsjUjNJotuog==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/pirates": {
      "version": "4.0.6",
      "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.6.tgz",
      "integrity": "sha512-saLsH7WeYYPiD25LDuLRRY/i+6HaPYr6G1OUlN39otzkSTxKnubR9RTxS3/Kk50s1g2JTgFwWQDQyplC5/SHZg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/postcss": {
      "version": "8.4.49",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.49.tgz",
      "integrity": "sha512-OCVPnIObs4N29kxTjzLfUryOkvZEq+pf8jTF0lg8E7uETuWHA+v7j3c/xJmiqpX450191LlmZfUKkXxkTry7nA==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.7",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-import": {
      "version": "15.1.0",
      "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
      "integrity": "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "postcss-value-parser": "^4.0.0",
        "read-cache": "^1.0.0",
        "resolve": "^1.1.7"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "postcss": "^8.0.0"
      }
    },
    "node_modules/postcss-js": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.0.1.tgz",
      "integrity": "sha512-dDLF8pEO191hJMtlHFPRa8xsizHaM82MLfNkUHdUtVEV3tgTp5oj+8qbEqYM57SLfc74KSbw//4SeJma2LRVIw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "camelcase-css": "^2.0.1"
      },
      "engines": {
        "node": "^12 || ^14 || >= 16"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/postcss/"
      },
      "peerDependencies": {
        "postcss": "^8.4.21"
      }
    },
    "node_modules/postcss-load-config": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-4.0.2.tgz",
      "integrity": "sha512-bSVhyJGL00wMVoPUzAVAnbEoWyqRxkjv64tUl427SKnPrENtq6hJwUojroMz2VB+Q1edmi4IfrAPpami5VVgMQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "lilconfig": "^3.0.0",
        "yaml": "^2.3.4"
      },
      "engines": {
        "node": ">= 14"
      },
      "peerDependencies": {
        "postcss": ">=8.0.9",
        "ts-node": ">=9.0.0"
      },
      "peerDependenciesMeta": {
        "postcss": {
          "optional": true
        },
        "ts-node": {
          "optional": true
        }
      }
    },
    "node_modules/postcss-nested": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.2.0.tgz",
      "integrity": "sha512-HQbt28KulC5AJzG+cZtj9kvKB93CFCdLvog1WFLf1D+xmMvPGlBstkpTEZfK5+AN9hfJocyBFCNiqyS48bpgzQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "postcss-selector-parser": "^6.1.1"
      },
      "engines": {
        "node": ">=12.0"
      },
      "peerDependencies": {
        "postcss": "^8.2.14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "6.1.2",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.1.2.tgz",
      "integrity": "sha512-Q8qQfPiZ+THO/3ZrOrO0cJJKfpYCagtMUkXbnEfmgUjwXg6z/WBeOyS9APBBPCTSiDV+s4SwQGu8yFsiMRIudg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/react": {
      "version": "19.0.0",
      "resolved": "https://registry.npmjs.org/react/-/react-19.0.0.tgz",
      "integrity": "sha512-V8AVnmPIICiWpGfm6GLzCR/W5FXLchHop40W4nXBmdlEceh16rCN8O8LNWm5bh5XUX91fh7KpA+W0TgMKmgTpQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.0.0",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.0.0.tgz",
      "integrity": "sha512-4GV5sHFG0e/0AD4X+ySy6UJd3jVl1iNsNHdpad0qhABJ11twS3TTBnseqsKurKcsNqCEFeGL3uLpVChpIO3QfQ==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.25.0"
      },
      "peerDependencies": {
        "react": "^19.0.0"
      }
    },
    "node_modules/react-refresh": {
      "version": "0.14.2",
      "resolved": "https://registry.npmjs.org/react-refresh/-/react-refresh-0.14.2.tgz",
      "integrity": "sha512-jCvmsr+1IUSMUyzOkRcvnVbX3ZYC6g9TDrDbFuFmRDq7PD4yaGbLKNQL6k2jnArV8hjYxh7hVhAZB6s9HDGpZA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-router": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-7.1.1.tgz",
      "integrity": "sha512-39sXJkftkKWRZ2oJtHhCxmoCrBCULr/HAH4IT5DHlgu/Q0FCPV0S4Lx+abjDTx/74xoZzNYDYbOZWlJjruyuDQ==",
      "license": "MIT",
      "dependencies": {
        "@types/cookie": "^0.6.0",
        "cookie": "^1.0.1",
        "set-cookie-parser": "^2.6.0",
        "turbo-stream": "2.4.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/react-router-dom": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-7.1.1.tgz",
      "integrity": "sha512-vSrQHWlJ5DCfyrhgo0k6zViOe9ToK8uT5XGSmnuC2R3/g261IdIMpZVqfjD6vWSXdnf5Czs4VA/V60oVR6/jnA==",
      "license": "MIT",
      "dependencies": {
        "react-router": "7.1.1"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      }
    },
    "node_modules/read-cache": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.0.tgz",
      "integrity": "sha512-Owdv/Ft7IjOgm/i0xvNDZ1LrRANRfew4b2prF3OWMQLxLfu3bS8FVhCsrSCMK4lR56Y9ya+AThoTpDCTxCmpRA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "pify": "^2.3.0"
      }
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/resolve": {
      "version": "1.22.10",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.10.tgz",
      "integrity": "sha512-NPRy+/ncIMeDlTAsuqwKIiferiawhefFJtkNSW0qZJEqMEb+qBt/77B/jGeeek+F0uOeN05CDa6HXbbIgtVX4w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-core-module": "^2.16.0",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/reusify": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.0.4.tgz",
      "integrity": "sha512-U9nH88a3fc/ekCF1l0/UP1IosiuIjyTh7hBvXVMHYgVcfGvt897Xguj2UOLDeI5BG2m7/uwyaLVT6fbtCwTyzw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/rollup": {
      "version": "4.30.1",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.30.1.tgz",
      "integrity": "sha512-mlJ4glW020fPuLi7DkM/lN97mYEZGWeqBnrljzN0gs7GLctqX3lNWxKQ7Gl712UAX+6fog/L3jh4gb7R6aVi3w==",
      "license": "MIT",
      "dependencies": {
        "@types/estree": "1.0.6"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-android-arm-eabi": "4.30.1",
        "@rollup/rollup-android-arm64": "4.30.1",
        "@rollup/rollup-darwin-arm64": "4.30.1",
        "@rollup/rollup-darwin-x64": "4.30.1",
        "@rollup/rollup-freebsd-arm64": "4.30.1",
        "@rollup/rollup-freebsd-x64": "4.30.1",
        "@rollup/rollup-linux-arm-gnueabihf": "4.30.1",
        "@rollup/rollup-linux-arm-musleabihf": "4.30.1",
        "@rollup/rollup-linux-arm64-gnu": "4.30.1",
        "@rollup/rollup-linux-arm64-musl": "4.30.1",
        "@rollup/rollup-linux-loongarch64-gnu": "4.30.1",
        "@rollup/rollup-linux-powerpc64le-gnu": "4.30.1",
        "@rollup/rollup-linux-riscv64-gnu": "4.30.1",
        "@rollup/rollup-linux-s390x-gnu": "4.30.1",
        "@rollup/rollup-linux-x64-gnu": "4.30.1",
        "@rollup/rollup-linux-x64-musl": "4.30.1",
        "@rollup/rollup-win32-arm64-msvc": "4.30.1",
        "@rollup/rollup-win32-ia32-msvc": "4.30.1",
        "@rollup/rollup-win32-x64-msvc": "4.30.1",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/scheduler": {
      "version": "0.25.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.25.0.tgz",
      "integrity": "sha512-xFVuu11jh+xcO7JOAGJNOXld8/TcEHK/4CituBUeUb5hqxJLj9YuemAEuvm9gQ/+pgXYfbQuqAkiYu+u7YEsNA==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/set-cookie-parser": {
      "version": "2.7.1",
      "resolved": "https://registry.npmjs.org/set-cookie-parser/-/set-cookie-parser-2.7.1.tgz",
      "integrity": "sha512-IOc8uWeOZgnb3ptbCURJWNjWUPcO3ZnTTdzsurqERrP6nPyv+paC55vJM0LpOlT2ne+Ix+9+CRG1MNLlyZ4GjQ==",
      "license": "MIT"
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/signal-exit": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-4.1.0.tgz",
      "integrity": "sha512-bzyZ1e88w9O1iNJbKnOlvYTrWPDl46O1bG0D3XInv+9tkPrxrN8jUUTiFlDkkmKWgn1M6CfIA13SuGqOa9Korw==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/string-width": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-5.1.2.tgz",
      "integrity": "sha512-HnLOCR3vjcY8beoNLtcjZ5/nxn2afmME6lhrDrebokqMap+XbeW8n9TXpPDOqdGK5qcI3oT0GKTW6wC7EMiVqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eastasianwidth": "^0.2.0",
        "emoji-regex": "^9.2.2",
        "strip-ansi": "^7.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/string-width-cjs": {
      "name": "string-width",
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/string-width-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/string-width-cjs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/string-width-cjs/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.1.0.tgz",
      "integrity": "sha512-iq6eVVI64nQQTRYq2KtEg2d2uU7LElhTJwsH4YzIHZshxlgZms/wIc4VoDQTlG/IvVIrBKG06CrZnp0qv7hkcQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^6.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/strip-ansi?sponsor=1"
      }
    },
    "node_modules/strip-ansi-cjs": {
      "name": "strip-ansi",
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/sucrase": {
      "version": "3.35.0",
      "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.35.0.tgz",
      "integrity": "sha512-8EbVDiu9iN/nESwxeSxDKe0dunta1GOlHufmSSXxMD2z2/tMZpDMpvXQGsc+ajGo8y2uYUmixaSRUc/QPoQ0GA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.2",
        "commander": "^4.0.0",
        "glob": "^10.3.10",
        "lines-and-columns": "^1.1.6",
        "mz": "^2.7.0",
        "pirates": "^4.0.1",
        "ts-interface-checker": "^0.1.9"
      },
      "bin": {
        "sucrase": "bin/sucrase",
        "sucrase-node": "bin/sucrase-node"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/tabbable": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/tabbable/-/tabbable-6.2.0.tgz",
      "integrity": "sha512-Cat63mxsVJlzYvN51JmVXIgNoUokrIaT2zLclCXjRd8boZ0004U4KCs/sToJ75C6sdlByWxpYnb5Boif1VSFew==",
      "license": "MIT"
    },
    "node_modules/tailwindcss": {
      "version": "3.4.17",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.17.tgz",
      "integrity": "sha512-w33E2aCvSDP0tW9RZuNXadXlkHXqFzSkQew/aIa2i/Sj8fThxwovwlXHSPXTbAHwEIhBFXAedUhP2tueAKP8Og==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "arg": "^5.0.2",
        "chokidar": "^3.6.0",
        "didyoumean": "^1.2.2",
        "dlv": "^1.1.3",
        "fast-glob": "^3.3.2",
        "glob-parent": "^6.0.2",
        "is-glob": "^4.0.3",
        "jiti": "^1.21.6",
        "lilconfig": "^3.1.3",
        "micromatch": "^4.0.8",
        "normalize-path": "^3.0.0",
        "object-hash": "^3.0.0",
        "picocolors": "^1.1.1",
        "postcss": "^8.4.47",
        "postcss-import": "^15.1.0",
        "postcss-js": "^4.0.1",
        "postcss-load-config": "^4.0.2",
        "postcss-nested": "^6.2.0",
        "postcss-selector-parser": "^6.1.2",
        "resolve": "^1.22.8",
        "sucrase": "^3.35.0"
      },
      "bin": {
        "tailwind": "lib/cli.js",
        "tailwindcss": "lib/cli.js"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/thenify": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz",
      "integrity": "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0"
      }
    },
    "node_modules/thenify-all": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz",
      "integrity": "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "thenify": ">= 3.1.0 < 4"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/ts-interface-checker": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
      "integrity": "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/turbo-stream": {
      "version": "2.4.0",
      "resolved": "https://registry.npmjs.org/turbo-stream/-/turbo-stream-2.4.0.tgz",
      "integrity": "sha512-FHncC10WpBd2eOmGwpmQsWLDoK4cqsA/UT/GqNoaKOQnT8uzhtCbg3EoUDMvqpOSAI0S26mr0rkjzbOO6S3v1g==",
      "license": "ISC"
    },
    "node_modules/update-browserslist-db": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.1.2.tgz",
      "integrity": "sha512-PPypAm5qvlD7XMZC3BujecnaOxwhrtoFR+Dqkk5Aa/6DssiH0ibKoketaj9w8LP7Bont1rYeoV5plxD7RTEPRg==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/vite": {
      "version": "6.0.7",
      "resolved": "https://registry.npmjs.org/vite/-/vite-6.0.7.tgz",
      "integrity": "sha512-RDt8r/7qx9940f8FcOIAH9PTViRrghKaK2K1jY3RaAURrEUbm9Du1mJ72G+jlhtG3WwodnfzY8ORQZbBavZEAQ==",
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.24.2",
        "postcss": "^8.4.49",
        "rollup": "^4.23.0"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^18.0.0 || ^20.0.0 || >=22.0.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^18.0.0 || ^20.0.0 || >=22.0.0",
        "jiti": ">=1.21.0",
        "less": "*",
        "lightningcss": "^1.21.0",
        "sass": "*",
        "sass-embedded": "*",
        "stylus": "*",
        "sugarss": "*",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/wrap-ansi": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-8.1.0.tgz",
      "integrity": "sha512-si7QWI6zUMq56bESFvagtmzMdGOtoxfR+Sez11Mobfc7tm+VkUckk9bW2UeffTGVUbOksxmSw0AA2gs8g71NCQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^6.1.0",
        "string-width": "^5.0.1",
        "strip-ansi": "^7.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs": {
      "name": "wrap-ansi",
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/wrap-ansi-cjs/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "license": "ISC"
    },
    "node_modules/yaml": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/yaml/-/yaml-2.7.0.tgz",
      "integrity": "sha512-+hSoy/QHluxmC9kCIJyL/uyFmLmc+e5CFR5Wa+bpIhIj85LVb9ZH2nVnqrHoSvKogwODv0ClqZkmiSSaIH5LTA==",
      "devOptional": true,
      "license": "ISC",
      "bin": {
        "yaml": "bin.mjs"
      },
      "engines": {
        "node": ">= 14"
      }
    }
  }
}

```

### update/postcss.config.js

```
// postcss.config.js
export default {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
  
```

### update/index.html

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <base href="/" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Internship Tracker</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### update/package.json

```
{
  "name": "internship-tracker-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@heroicons/react": "^2.1.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "recharts": "^2.10.4"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.33",
    "tailwindcss": "^3.4.1",
    "vite": "^5.0.8"
  }
}


```

### update/public/simplify-logo.png

### update/public/simplify-logo.png (Error reading file: 'utf-8' codec can't decode byte 0x89 in position 0: invalid start byte)

### update/public/data/users.json

```
{
    "users": [
      {
        "username": "demo",
        "password": "demo",
        "role": "user"
      },
      {
        "username": "admin",
        "password": "admin123",
        "role": "admin"
      }
    ]
  }
```

### update/src/vite.config.js

```
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      host: `${process.env.CODESPACE_NAME}-5173.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`,
      protocol: 'wss',
      clientPort: 443
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
});
```

### update/src/index.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### update/src/main.jsx

```
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### update/src/App.jsx

```
// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ApplicationProvider } from './context/ApplicationContext';
import Login from './pages/Login';
import Jobs from './pages/Jobs';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <ApplicationProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/jobs"
              element={
                <ProtectedRoute>
                  <Jobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/profile" replace />} />
          </Routes>
        </ApplicationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
```

### update/src/pages/Jobs.jsx

```
// src/pages/Jobs.jsx
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import JobsTable from '../components/jobs/JobsTable';
import SearchBar from '../components/jobs/SearchBar';
import FilterSection from '../components/jobs/FilterSection';
import SortSection from '../components/jobs/SortSection';
import { Icons } from '../components/common/Icons';
import { useJobs } from '../hooks/useJobs';
import { useTableManager } from '../hooks/useTableManager';
import config from '../config';
import { IconButton } from '../components/common/IconButton';

export default function Jobs() {
  const { jobs, loading } = useJobs();
  const {
    paginatedData,
    pageSize,
    setPageSize,
    page,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    searchQuery,
    setSearchQuery,
    searchInFiltered,
    setSearchInFiltered,
    activeFilters,
    setActiveFilters,
    activeSorts,
    setActiveSorts,
    resetFilters,
    resetSorts,
    clearAll,
    totalCount,
    searchedData
  } = useTableManager(jobs, config);

  // Collapsible sections state
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [isSortsOpen, setIsSortsOpen] = useState(true);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="text-gray-400">Loading internships...</span>
          </div>
        </div>
      </Layout>
    );
  }

  // Header actions
  const renderActions = (type) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={type === 'Filter' ? resetFilters : resetSorts}
        className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700"
        title={`Reset ${type}`}
      >
        <Icons.Reset className="w-5 h-5" />
      </button>
      <button
        onClick={type === 'Filter' ? () => setActiveFilters([]) : () => setActiveSorts([])}
        className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700"
        title={`Clear ${type}`}
      >
        <Icons.Clear className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <Layout>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Search Section */}
        <section className="bg-gray-800 rounded-lg">
          <div 
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-750"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <h2 className="text-xl font-bold text-white flex items-center">
              <Icons.Search className="w-6 h-6 mr-2" />
              Search
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">
                {searchQuery ? `Found ${searchedData.length} matches` : `${totalCount} total jobs`}
              </span>
              <Icons.ChevronRight 
                className={`w-5 h-5 text-gray-400 transform transition-transform ${isSearchOpen ? 'rotate-90' : ''}`}
              />
            </div>
          </div>
          {isSearchOpen && (
            <div className="p-6 pt-2">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                searchInFiltered={searchInFiltered}
                setSearchInFiltered={setSearchInFiltered}
              />
            </div>
          )}
        </section>

        {/* Filter Section */}
        <section className="bg-gray-800 rounded-lg">
          <div 
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-750"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <h2 className="text-xl font-bold text-white flex items-center">
              <Icons.Filter className="w-6 h-6 mr-2" />
              Filters
              {activeFilters.length > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
                  {activeFilters.length}
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2">
              <IconButton
                icon={<Icons.Add />}
                label="Add Filter"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingFilter(null);
                  setFilterModalOpen(true);
                }}
                variant="primary"
                size="sm"
              />
              <IconButton
                icon={<Icons.Reset />}
                label="Reset Filters"
                onClick={(e) => {
                  e.stopPropagation();
                  resetFilters();
                }}
                variant="default"
                size="sm"
              />
              <IconButton
                icon={<Icons.Clear />}
                label="Clear Filters"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveFilters([]);
                }}
                variant="default"
                size="sm"
              />
              <Icons.ChevronRight 
                className={`w-5 h-5 text-gray-400 transform transition-transform ${isFiltersOpen ? 'rotate-90' : ''}`}
              />
            </div>
          </div>
          {isFiltersOpen && (
            <div className="p-6 pt-2">
              <FilterSection
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
                filteredCount={searchedData.length}
                totalCount={totalCount}
              />
            </div>
          )}
        </section>

        {/* Sort Section */}
        <section className="bg-gray-800 rounded-lg">
          <div 
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-750"
            onClick={() => setIsSortsOpen(!isSortsOpen)}
          >
            <h2 className="text-xl font-bold text-white flex items-center">
              <Icons.Sort className="w-6 h-6 mr-2" />
              Sort
              {activeSorts.length > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
                  {activeSorts.length}
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2">
              <IconButton
                icon={<Icons.Add />}
                label="Add Sort"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingSort(null);
                  setSortModalOpen(true);
                }}
                variant="primary"
                size="sm"
              />
              <IconButton
                icon={<Icons.Reset />}
                label="Reset Sorts"
                onClick={(e) => {
                  e.stopPropagation();
                  resetSorts();
                }}
                variant="default"
                size="sm"
              />
              <IconButton
                icon={<Icons.Clear />}
                label="Clear Sorts"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSorts([]);
                }}
                variant="default"
                size="sm"
              />
              <Icons.ChevronRight 
                className={`w-5 h-5 text-gray-400 transform transition-transform ${isSortsOpen ? 'rotate-90' : ''}`}
              />
            </div>
          </div>
          {isSortsOpen && (
            <div className="p-6 pt-2">
              <SortSection
                activeSorts={activeSorts}
                setActiveSorts={setActiveSorts}
              />
            </div>
          )}
        </section>

        {/* Results Section */}
        <section className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold text-white">Results</h2>
              <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                {searchedData.length} jobs
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-gray-700 border-gray-600 text-white rounded-md"
              >
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
                <option value="100">100 per page</option>
              </select>
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevPage}
                  disabled={page === 1}
                  className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
                >
                  <Icons.ChevronLeft />
                </button>
                <span className="text-gray-400">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={page === totalPages}
                  className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
                >
                  <Icons.ChevronRight />
                </button>
              </div>
            </div>
          </div>

          <JobsTable 
            jobs={paginatedData}
            pageSize={pageSize}
            currentPage={page}
            onPageChange={goToPage}
            totalPages={totalPages}
            totalCount={searchedData.length}
            sortConfig={activeSorts[0]}
            onSort={(column) => {
              const currentSort = activeSorts.find(s => s.column === column);
              const newOrder = currentSort?.order === 'asc' ? 'desc' : 'asc';
              setActiveSorts([
                { column, order: newOrder },
                ...activeSorts.filter(s => s.column !== column)
              ]);
            }}
          />
        </section>
      </div>
    </Layout>
  );
}
```

### update/src/pages/Home.jsx

```
// src/pages/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Summer 2025 Internships</h1>
      <p className="text-gray-600">
        Find and track the best internship opportunities for Summer 2025.
      </p>
    </div>
  );
};

export default Home;

```

### update/src/pages/Profile.jsx

```
// src/pages/Profile.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useApplications } from '../hooks/useApplications';
import { useJobs } from '../hooks/useJobs';
import Layout from '../components/layout/Layout';

const Profile = () => {
  const { user, logout } = useAuth();
  const { applications } = useApplications();
  const { jobs } = useJobs();

  const userApplications = applications.applications[user?.username] || { applied: [], hidden: [] };
  const appliedJobs = jobs.filter(job => userApplications.applied.includes(job.id));
  const hiddenJobs = jobs.filter(job => userApplications.hidden.includes(job.id));

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 shadow rounded-lg">
          {/* Profile Header */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-white">
              Profile Information
            </h3>
          </div>

          {/* Profile Content */}
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-400">Username</h4>
                <p className="mt-1 text-sm text-white">{user?.username}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400">Application Status</h4>
                <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-gray-700 px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      Total Applications
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-white">
                      {appliedJobs.length}
                    </dd>
                  </div>

                  <div className="bg-gray-700 px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      Hidden Jobs
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-white">
                      {hiddenJobs.length}
                    </dd>
                  </div>

                  <div className="bg-gray-700 px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      Active Jobs
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-white">
                      {jobs.filter(job => job.active).length}
                    </dd>
                  </div>
                </div>
              </div>

              {/* Recent Applications */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-4">Recent Applications</h4>
                <div className="bg-gray-700 shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-600">
                    {appliedJobs.slice(0, 5).map(job => (
                      <li key={job.id}>
                        <div className="px-4 py-4 flex items-center sm:px-6">
                          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                              <div className="flex text-sm">
                                <p className="font-medium text-blue-400 truncate">
                                  {job.company_name}
                                </p>
                                <p className="ml-1 flex-shrink-0 font-normal text-gray-400">
                                  for {job.title}
                                </p>
                              </div>
                              <div className="mt-2 flex">
                                <div className="flex items-center text-sm text-gray-400">
                                  <p>{job.locations}</p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex-shrink-0 sm:mt-0">
                              <a
                                href={job.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-blue-400 hover:text-blue-300"
                              >
                                View job
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    onClick={logout}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
```

### update/src/pages/Login.jsx

```
// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { generateToken } from '../utils/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/data/users.json');
      const data = await response.json();
      
      const user = data.users.find(u => 
        u.username === username && u.password === password
      );

      if (user) {
        const token = generateToken(user);
        localStorage.setItem('jwt_token', token);
        login({ username: user.username });
        navigate('/jobs');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Sign in to Internship Tracker
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### update/src/pages/Analytics.jsx

```
// src/pages/Analytics.jsx
import React from 'react';
import { useJobs } from '../hooks/useJobs';
import { useApplications } from '../hooks/useApplications';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Analytics = () => {
  const { jobs, loading: jobsLoading } = useJobs();
  const { applications } = useApplications();
  const { user } = useAuth();

  if (jobsLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  const userApplications = applications.applications[user?.username] || { applied: [], hidden: [] };
  const appliedJobs = jobs.filter(job => userApplications.applied.includes(job.id));

  // Calculate statistics
  const totalJobs = jobs.length;
  const totalApplied = appliedJobs.length;
  const applicationsPerCompany = appliedJobs.reduce((acc, job) => {
    acc[job.company_name] = (acc[job.company_name] || 0) + 1;
    return acc;
  }, {});

  const companyData = Object.entries(applicationsPerCompany)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const statusData = [
    { name: 'Applied', value: totalApplied },
    { name: 'Not Applied', value: totalJobs - totalApplied }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Jobs"
            value={totalJobs}
            description="Available positions"
          />
          <StatCard
            title="Applied"
            value={totalApplied}
            description="Submitted applications"
          />
          <StatCard
            title="Application Rate"
            value={`${((totalApplied / totalJobs) * 100).toFixed(1)}%`}
            description="Of available positions"
          />
          <StatCard
            title="Companies"
            value={Object.keys(applicationsPerCompany).length}
            description="Applied to"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">
              Applications by Company
            </h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={companyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    stroke="#9CA3AF"
                  />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">
              Application Status
            </h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      percent,
                      name
                    }) => {
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                      const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#fff"
                          textAnchor="middle"
                          dominantBaseline="central"
                        >
                          {`${name} ${(percent * 100).toFixed(1)}%`}
                        </text>
                      );
                    }}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const StatCard = ({ title, value, description }) => (
  <div className="bg-gray-800 rounded-lg p-6">
    <dt className="text-sm font-medium text-gray-400 truncate">{title}</dt>
    <dd className="mt-1 text-3xl font-semibold text-white">{value}</dd>
    <dd className="mt-1 text-sm text-gray-400">{description}</dd>
  </div>
);

export default Analytics;
```

### update/src/config/index.js

```
// src/config/index.js
const config = {
  api: {
    listings: 'https://raw.githubusercontent.com/abhira0/Summer2025-Internships/feature/mern/docs/analytics/cache/listings_parsed.json',
    tracker: 'https://raw.githubusercontent.com/abhira0/Summer2025-Internships/feature/mern/docs/analytics/cache/simplify/parsed.json'
  },
  defaults: {
    filters: [
      { column: 'date', fromDate: '2024-01-01', toDate: '' },
      { column: 'active', active: true },
      {
        column: 'location',
        conditionType: 'AND',
        conditions: [
          { type: 'not-equals', value: 'canada' },
          { type: 'not-equals', value: 'remote in canada' },
          { type: 'not-regex', value: '^[a-zA-Z]+, uk$' },
          { type: 'not-regex', value: '^[a-zA-Z]+(?:, [a-za-z]+)?, canada$' }
        ]
      },
      { column: 'hidden', hidden: false },
      { column: 'applied', applied: false }
    ],
    sorts: [
      { column: 'date_updated', order: 'desc' }
    ],
    pagination: {
      itemsPerPage: 25
    }
  }
};

export default config;
```

### update/src/hooks/useTableManager.js

```
// src/hooks/useTableManager.js
import { useState, useMemo, useCallback, useRef } from 'react';
import { applyFilters } from '../utils/filters';
import { applySorts } from '../utils/sorts';
import { useApplications } from '../context/ApplicationContext';
import { useAuth } from '../context/AuthContext';

export function useTableManager(initialData, config) {
  const { user } = useAuth();
  const { getApplicationStatus } = useApplications();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(config.defaults.pagination.itemsPerPage);
  const [activeFilters, setActiveFilters] = useState(config.defaults.filters);
  const [activeSorts, setActiveSorts] = useState(config.defaults.sorts);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInFiltered, setSearchInFiltered] = useState(true);
  
  // Debounce search
  const searchTimeoutRef = useRef(null);
  const debouncedSetSearchQuery = useCallback((query) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setSearchQuery(query);
      setPage(1); // Reset to first page on new search
    }, 300);
  }, []);
  // Apply filters
  const filteredData = useMemo(() => {
    if (!initialData || !Array.isArray(initialData)) return [];
    return applyFilters(initialData, activeFilters, getApplicationStatus, user?.username);
  }, [initialData, activeFilters, getApplicationStatus, user?.username]);

  // Apply search
  const searchedData = useMemo(() => {
    if (!searchQuery) {
      return searchInFiltered ? filteredData : initialData;
    }

    const dataToSearch = searchInFiltered ? filteredData : initialData;
    const query = searchQuery.toLowerCase();

    return dataToSearch.filter(item => {
      const searchFields = [
        item.company_name,
        item.title,
        item.locations
      ];
      return searchFields.some(field => 
        String(field).toLowerCase().includes(query)
      );
    });
  }, [initialData, filteredData, searchQuery, searchInFiltered]);

  // Apply sorting
  const sortedData = useMemo(() => {
    return applySorts(searchedData, activeSorts);
  }, [searchedData, activeSorts]);

  // Pagination
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, page, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Navigation
  const goToPage = useCallback((newPage) => {
    setPage(Math.min(Math.max(1, newPage), totalPages));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(page + 1);
  }, [page, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(page - 1);
  }, [page, goToPage]);

  // Reset
  const resetFilters = useCallback(() => {
    setActiveFilters(config.defaults.filters);
    setPage(1);
  }, [config.defaults.filters]);

  const resetSorts = useCallback(() => {
    setActiveSorts(config.defaults.sorts);
    setPage(1);
  }, [config.defaults.sorts]);

  const clearAll = useCallback(() => {
    setActiveFilters([]);
    setActiveSorts([]);
    setSearchQuery('');
    setPage(1);
  }, []);

  return {
    // Data
    filteredData,
    searchedData,
    sortedData,
    paginatedData,
    
    // Pagination
    page,
    pageSize,
    totalPages,
    setPageSize: (newSize) => {
      setPageSize(newSize);
      setPage(1); // Reset to first page when changing page size
    },
    goToPage,
    nextPage,
    prevPage,
    
    // Filters
    activeFilters,
    setActiveFilters,
    resetFilters,
    
    // Sorts
    activeSorts,
    setActiveSorts,
    resetSorts,
    
    // Search
    searchQuery,
    setSearchQuery: debouncedSetSearchQuery,
    searchInFiltered,
    setSearchInFiltered,
    
    // Reset
    clearAll,
    
    // Stats
    totalCount: initialData.length,
    filteredCount: filteredData.length,
    displayedCount: sortedData.length
  };
}

```

### update/src/hooks/useJobs.js

```
// src/hooks/useJobs.js
import { useState, useEffect } from 'react';
import config from '../config';

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const [listingsResponse, trackerResponse] = await Promise.all([
          fetch(config.api.listings),
          fetch(config.api.tracker)
        ]);

        if (!listingsResponse.ok || !trackerResponse.ok) {
          throw new Error('Failed to fetch job data');
        }

        const [listings, tracker] = await Promise.all([
          listingsResponse.json(),
          trackerResponse.json()
        ]);

        if (!Array.isArray(listings)) {
          throw new Error('Invalid data format');
        }

        const processedJobs = listings.map(item => ({
          id: item.id,
          company_name: item.company_name,
          title: item.title,
          locations: Array.isArray(item.locations) ? item.locations.join(', ') : item.locations,
          url: item.url,
          date_updated: new Date(item.date_updated * 1000).toLocaleDateString(),
          active: item.active ?? true,
          trackerInfo: tracker.find(t => t.job_posting_id === item.id)
        }));

        setJobs(processedJobs);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, loading, error };
}
```

### update/src/hooks/useDragAndDrop.js

```
// src/hooks/useDragAndDrop.js
export function useDragAndDrop(items, setItems) {
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);
  
    const handleDragStart = (index) => {
      dragItem.current = index;
    };
  
    const handleDragEnter = (index) => {
      dragOverItem.current = index;
    };
  
    const handleDragEnd = () => {
      if (dragItem.current !== null && dragOverItem.current !== null) {
        const newItems = [...items];
        const draggedItem = newItems[dragItem.current];
        newItems.splice(dragItem.current, 1);
        newItems.splice(dragOverItem.current, 0, draggedItem);
        setItems(newItems);
      }
      dragItem.current = null;
      dragOverItem.current = null;
    };
  
    return {
      handleDragStart,
      handleDragEnter,
      handleDragEnd
    };
  }
```

### update/src/hooks/useApplications.js

```
// src/hooks/useApplications.js
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export function useApplications() {
  const [applications, setApplications] = useState({ applications: {} });
  const { user } = useAuth();

  useEffect(() => {
    const loadApplications = () => {
      try {
        const stored = localStorage.getItem('userApplications');
        if (stored) {
          setApplications(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading applications:', error);
      }
    };

    loadApplications();
  }, []);

  const updateApplication = async (userId, jobId, type, value) => {
    try {
      const newApplications = { ...applications };
      if (!newApplications.applications[userId]) {
        newApplications.applications[userId] = { applied: [], hidden: [] };
      }
      
      const typeArray = newApplications.applications[userId][type];
      const index = typeArray.indexOf(jobId);
      
      if (value && index === -1) {
        typeArray.push(jobId);
      } else if (!value && index !== -1) {
        typeArray.splice(index, 1);
      }

      setApplications(newApplications);
      localStorage.setItem('userApplications', JSON.stringify(newApplications));
      
      // Optional: sync with server
      try {
        await fetch('/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newApplications)
        });
      } catch (error) {
        console.warn('Failed to sync with server:', error);
      }

      return newApplications;
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  };

  return { applications, updateApplication };
}
```

### update/src/utils/auth.js

```
// src/utils/auth.js
export const generateToken = (user) => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      user: user.username,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));
    const signature = btoa(header + payload + "your-secret-key");
    return `${header}.${payload}.${signature}`;
  };
  
  export const verifyToken = () => {
    const token = localStorage.getItem('jwt_token');
    if (!token) return false;
  
    try {
      const [, payload] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.exp > Date.now();
    } catch {
      return false;
    }
  };
```

### update/src/utils/filters.js

```
// src/utils/filters.js
export const applyFilters = (jobs, activeFilters, getApplicationStatus, username) => {
    return jobs.filter(job => {
      return activeFilters.every(filter => {
        switch (filter.column) {
          case 'date':
            const jobDate = new Date(job.date_updated);
            const fromDate = filter.fromDate ? new Date(filter.fromDate) : new Date(-8640000000000000);
            const toDate = filter.toDate ? new Date(filter.toDate) : new Date(8640000000000000);
            return jobDate >= fromDate && jobDate <= toDate;
  
          case 'applied':
            return filter.applied === getApplicationStatus(job.id, 'applied');
  
          case 'hidden':
            return filter.hidden === getApplicationStatus(job.id, 'hidden');
  
          case 'active':
            return filter.active === job.active;
  
          default:
            if (!filter.conditions) return true;
            
            const text = String(job[filter.column] || '').toLowerCase();
            const evaluateCondition = (condition) => {
              const conditionValue = condition.value.toLowerCase();
              
              switch (condition.type) {
                case 'contains': return text.includes(conditionValue);
                case 'equals': return text === conditionValue;
                case 'not-equals': return text !== conditionValue;
                case 'not-contains': return !text.includes(conditionValue);
                case 'regex':
                  try {
                    return new RegExp(conditionValue, 'i').test(text);
                  } catch {
                    return false;
                  }
                case 'not-regex':
                  try {
                    return !new RegExp(conditionValue, 'i').test(text);
                  } catch {
                    return true;
                  }
                default:
                  return true;
              }
            };
  
            return filter.conditionType === 'AND'
              ? filter.conditions.every(evaluateCondition)
              : filter.conditions.some(evaluateCondition);
        }
      });
    });
  };
```

### update/src/utils/api.js

```
// src/utils/api.js
import config from '../config';

export const fetchJobs = async () => {
  try {
    const [listingsResponse, trackerResponse] = await Promise.all([
      fetch(config.api.listings),
      fetch(config.api.tracker)
    ]);

    if (!listingsResponse.ok || !trackerResponse.ok) {
      throw new Error('Failed to fetch jobs');
    }

    const [listings, tracker] = await Promise.all([
      listingsResponse.json(),
      trackerResponse.json()
    ]);

    return listings.map(item => ({
      ...item,
        date_updated: new Date(item.date_updated * 1000).toLocaleDateString("en-US", {
          year: "2-digit",
          month: "short",
          day: "2-digit"
        }),
      trackerInfo: tracker.find(t => t.job_posting_id === item.id)
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const loadUserApplications = async () => {
  try {
    const response = await fetch('/api/applications');
    if (!response.ok) throw new Error('Failed to load applications');
    return await response.json();
  } catch (error) {
    console.error('Error loading applications:', error);
    return { applications: {} };
  }
};

export const saveUserApplications = async (applications) => {
  try {
    const response = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applications)
    });
    if (!response.ok) throw new Error('Failed to save applications');
    return true;
  } catch (error) {
    console.error('Error saving applications:', error);
    return false;
  }
};

```

### update/src/utils/sorts.js

```
// src/utils/sorts.js

const getValueForSort = (job, column) => {
  switch (column) {
    case 'date_updated':
      return new Date(job.date_updated).getTime();
    case 'company_name':
    case 'title':
    case 'locations':
      return String(job[column] || '').toLowerCase();
    case 'active':
      return Boolean(job[column]);
    default:
      return job[column];
  }
};

export const applySorts = (jobs, activeSorts) => {
  if (!jobs || !Array.isArray(jobs)) return [];
  if (!activeSorts?.length) return jobs;

  return [...jobs].sort((a, b) => {
    for (const sort of activeSorts) {
      const aValue = getValueForSort(a, sort.column);
      const bValue = getValueForSort(b, sort.column);
      
      if (aValue === bValue) continue;
      
      const direction = sort.order === 'asc' ? 1 : -1;
      if (aValue === null || aValue === undefined) return direction;
      if (bValue === null || bValue === undefined) return -direction;
      
      return aValue < bValue ? -direction : direction;
    }
    return 0;
  });
};
```

### update/src/context/ApplicationContext.jsx

```
// src/context/ApplicationContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ApplicationContext = createContext(null);

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState({ applications: {} });
  const { user } = useAuth();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('userApplications');
      if (stored) {
        setApplications(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading applications:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('userApplications', JSON.stringify(applications));
    } catch (error) {
      console.error('Error saving applications:', error);
    }
  }, [applications]);

  const getApplicationStatus = (jobId, type) => {
    if (!user?.username || !applications.applications[user.username]) return false;
    return applications.applications[user.username][type]?.includes(jobId) || false;
  };

  const updateApplication = async (jobId, type, value) => {
    if (!user?.username) return;

    try {
      const newApplications = { ...applications };
      if (!newApplications.applications[user.username]) {
        newApplications.applications[user.username] = { applied: [], hidden: [] };
      }
      
      const typeArray = newApplications.applications[user.username][type] || [];
      const index = typeArray.indexOf(jobId);
      
      if (value && index === -1) {
        typeArray.push(jobId);
      } else if (!value && index !== -1) {
        typeArray.splice(index, 1);
      }

      newApplications.applications[user.username][type] = typeArray;
      setApplications(newApplications);

      // Optional: sync with server
      try {
        const response = await fetch('/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newApplications)
        });
        if (!response.ok) throw new Error('Failed to sync with server');
      } catch (error) {
        console.warn('Failed to sync with server:', error);
      }

      return newApplications;
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  };

  return (
    <ApplicationContext.Provider 
      value={{ 
        applications, 
        updateApplication, 
        getApplicationStatus 
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
}
```

### update/src/context/AuthContext.jsx

```
// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { verifyToken } from '../utils/auth';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token && verifyToken()) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({ username: payload.user });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
```

### update/src/components/ProtectedRoute.jsx

```
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Update App.jsx routes to use ProtectedRoute
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/jobs" element={
    <ProtectedRoute>
      <Jobs />
    </ProtectedRoute>
  } />
  {/* Other protected routes */}
</Routes>
```

### update/src/components/jobs/VirtualTable.jsx

```
// src/components/jobs/VirtualTable.jsx
import React, { useState, useEffect, useRef } from 'react';

const ROW_HEIGHT = 48; // Adjust based on your actual row height
const BUFFER_SIZE = 10; // Number of extra rows to render above and below viewport

export default function VirtualTable({ data, renderRow, headerContent }) {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, clientHeight } = containerRef.current;
      const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER_SIZE);
      const end = Math.min(
        data.length,
        Math.ceil((scrollTop + clientHeight) / ROW_HEIGHT) + BUFFER_SIZE
      );

      setVisibleRange({ start, end });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial calculation
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [data.length]);

  const totalHeight = data.length * ROW_HEIGHT;
  const visibleData = data.slice(visibleRange.start, visibleRange.end);
  const offsetY = visibleRange.start * ROW_HEIGHT;

  return (
    <div 
      ref={containerRef}
      className="overflow-auto"
      style={{ height: 'calc(100vh - 400px)', position: 'relative' }}
    >
      {headerContent}
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleData.map((item, index) => renderRow(item, visibleRange.start + index))}
        </div>
      </div>
    </div>
  );
}
```

### update/src/components/jobs/ActionButton.jsx

```
// src/components/jobs/ActionButton.jsx
import React from 'react';

export function ActionButton({ onClick, icon, label, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 text-gray-400 hover:text-white transition-colors duration-150 ease-in-out rounded-full
      hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ${className}`}
      title={label}
    >
      {icon}
    </button>
  );
}

// Add these styles to your CSS
const tooltipStyles = `
  .tooltip-cell {
    position: relative;
  }

  .tooltip-content {
    position: absolute;
    z-index: 50;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s ease;
    background-color: #1f2937;
    color: white;
    padding: 0.5rem;
    border-radius: 0.375rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    max-width: 24rem;
    white-space: normal;
    word-break: break-word;
  }

  .tooltip-cell:hover .tooltip-content {
    visibility: visible;
    opacity: 1;
  }

  .table-cell-content {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

// Add a style tag to your HTML
const style = document.createElement('style');
style.textContent = tooltipStyles;
document.head.appendChild(style);
```

### update/src/components/jobs/SectionHeader.jsx

```
// src/components/common/SectionHeader.jsx
import React from 'react';

export default function SectionHeader({ 
  title, 
  icon, 
  actions,
  subtitle,
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex-1 flex justify-center items-center space-x-2">
        {icon && (
          <span className="text-xl" role="img" aria-label={title}>
            {icon}
          </span>
        )}
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {subtitle && (
          <span className="text-sm text-gray-400">
            {subtitle}
          </span>
        )}
      </div>
      {actions && (
        <div className="flex items-center space-x-2">
          {actions}
        </div>
      )}
    </div>
  );
}

// Helper function to get icons for common actions
export const getActionIcon = (type) => {
  switch (type) {
    case 'add':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      );
    case 'reset':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </svg>
      );
    case 'clear':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      );
    default:
      return null;
  }
};
```

### update/src/components/jobs/FilterSection.jsx

```
import React, { useState } from 'react';
import FilterModal from './FilterModal';
import { Icons } from '../common/Icons';
import { IconButton } from '../common/IconButton';

export default function FilterSection({ activeFilters, setActiveFilters, filteredCount, totalCount }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFilter, setEditingFilter] = useState(null);

  const removeFilter = (index) => {
    setActiveFilters(filters => filters.filter((_, i) => i !== index));
  };

  const editFilter = (filter, index) => {
    setEditingFilter({ filter, index });
    setIsModalOpen(true);
  };

  const duplicateFilter = (filter) => {
    setActiveFilters(filters => [...filters, { ...filter }]);
  };

  const getFilterSymbol = (type) => {
    switch (type) {
      case 'contains': return '⊇';
      case 'equals': return '=';
      case 'not-equals': return '≠';
      case 'not-contains': return '⊉';
      case 'regex': return '~';
      case 'not-regex': return '≁';
      default: return type;
    }
  };

  const getFilterDisplay = (filter) => {
    switch (filter.column) {
      case 'date':
        return (
          <span className="font-mono">
            <span className="text-blue-400">{filter.column}</span>
            <span className="text-gray-400"> ∈ [</span>
            <span className="text-green-400">{filter.fromDate || '-∞'}</span>
            <span className="text-gray-400">, </span>
            <span className="text-green-400">{filter.toDate || '∞'}</span>
            <span className="text-gray-400">]</span>
          </span>
        );
      
      case 'applied':
      case 'active':
      case 'hidden':
        return (
          <span className="font-mono">
            <span className="text-blue-400">{filter.column}</span>
            <span className="text-gray-400"> = </span>
            <span className="text-green-400">{filter[filter.column] ? '✓' : '✗'}</span>
          </span>
        );
      
      default:
        if (!filter.conditions) return filter.column;
        
        const conditions = filter.conditions.map((c, i) => (
          <span key={i}>
            {i > 0 && (
              <span className="text-yellow-400">
                {' '}
                {filter.conditionType === 'AND' ? '∧' : '∨'}
                {' '}
              </span>
            )}
            <span className="text-gray-400">{getFilterSymbol(c.type)}</span>
            <span className="text-green-400"> "{c.value}"</span>
          </span>
        ));
        
        return (
          <span className="font-mono">
            <span className="text-blue-400">{filter.column}</span>
            {' '}
            {conditions}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
      {activeFilters.map((filter, index) => (
        <div
          key={index}
          className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg text-sm"
        >
          <span className="text-gray-200">{getFilterDisplay(filter)}</span>
          <div className="flex gap-1">
            <IconButton
              icon={<Icons.Edit />}
              label="Edit"
              onClick={() => editFilter(filter, index)}
              variant="primary"
              size="sm"
            />
            <IconButton
              icon={<Icons.Duplicate />}
              label="Duplicate"
              onClick={() => duplicateFilter(filter)}
              variant="success"
              size="sm"
            />
            <IconButton
              icon={<Icons.Delete />}
              label="Remove"
              onClick={() => removeFilter(index)}
              variant="danger"
              size="sm"
            />
          </div>
        </div>
      ))}
      </div>

      <FilterModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingFilter(null);
        }}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        editingFilter={editingFilter}
      />
    </div>
  );
}
```

### update/src/components/jobs/FilterModal.jsx

```
// src/components/jobs/FilterModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

export default function FilterModal({
  isOpen,
  onClose,
  activeFilters,
  setActiveFilters,
  editingFilter
}) {
  const [column, setColumn] = useState('company');
  const [conditions, setConditions] = useState([{ type: 'contains', value: '' }]);
  const [conditionType, setConditionType] = useState('OR');
  const [dateRange, setDateRange] = useState({ fromDate: '', toDate: '' });
  const [booleanValue, setBooleanValue] = useState(true);

  useEffect(() => {
    if (editingFilter) {
      const { filter } = editingFilter;
      setColumn(filter.column);
      if (filter.column === 'date') {
        setDateRange({ fromDate: filter.fromDate || '', toDate: filter.toDate || '' });
      } else if (['applied', 'active', 'hidden'].includes(filter.column)) {
        setBooleanValue(filter[filter.column]);
      } else if (filter.conditions) {
        setConditions(filter.conditions);
        setConditionType(filter.conditionType || 'OR');
      }
    } else {
      // Reset form when adding new filter
      setColumn('company');
      setConditions([{ type: 'contains', value: '' }]);
      setConditionType('OR');
      setDateRange({ fromDate: '', toDate: '' });
      setBooleanValue(true);
    }
  }, [editingFilter]);

  const handleApply = () => {
    let newFilter = { column };

    if (column === 'date') {
      newFilter = { ...newFilter, ...dateRange };
    } else if (['applied', 'active', 'hidden'].includes(column)) {
      newFilter[column] = booleanValue;
    } else {
      newFilter.conditions = conditions;
      newFilter.conditionType = conditionType;
    }

    if (editingFilter) {
      const newFilters = [...activeFilters];
      newFilters[editingFilter.index] = newFilter;
      setActiveFilters(newFilters);
    } else {
      setActiveFilters([...activeFilters, newFilter]);
    }

    onClose();
  };

  const addCondition = () => {
    setConditions([...conditions, { type: 'contains', value: '' }]);
  };

  const removeCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const updateCondition = (index, field, value) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setConditions(newConditions);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Filter">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Column
          </label>
          <select
            value={column}
            onChange={(e) => setColumn(e.target.value)}
            className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm"
          >
            <option value="company">Company</option>
            <option value="role">Role</option>
            <option value="location">Location</option>
            <option value="date">Date Posted</option>
            <option value="applied">Applied</option>
            <option value="active">Active</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>

        {column === 'date' ? (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                From Date
              </label>
              <input
                type="date"
                value={dateRange.fromDate}
                onChange={(e) =>
                  setDateRange({ ...dateRange, fromDate: e.target.value })
                }
                className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                To Date
              </label>
              <input
                type="date"
                value={dateRange.toDate}
                onChange={(e) =>
                  setDateRange({ ...dateRange, toDate: e.target.value })
                }
                className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm"
              />
            </div>
          </div>
        ) : ['applied', 'active', 'hidden'].includes(column) ? (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Value
            </label>
            <select
              value={booleanValue.toString()}
              onChange={(e) => setBooleanValue(e.target.value === 'true')}
              className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Condition Type
              </label>
              <select
                value={conditionType}
                onChange={(e) => setConditionType(e.target.value)}
                className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm"
              >
                <option value="OR">OR</option>
                <option value="AND">AND</option>
              </select>
            </div>

            {conditions.map((condition, index) => (
              <div key={index} className="flex gap-2">
                <select
                  value={condition.type}
                  onChange={(e) => updateCondition(index, 'type', e.target.value)}
                  className="flex-1 bg-gray-700 border-gray-600 text-white rounded-md shadow-sm"
                >
                  <option value="contains">Contains</option>
                  <option value="equals">Equals</option>
                  <option value="not-equals">Not Equals</option>
                  <option value="not-contains">Not Contains</option>
                  <option value="regex">Regex</option>
                  <option value="not-regex">Not Regex</option>
                </select>
                <input
                  type="text"
                  value={condition.value}
                  onChange={(e) =>
                    updateCondition(index, 'value', e.target.value)
                  }
                  className="flex-1 bg-gray-700 border-gray-600 text-white rounded-md shadow-sm"
                />
                <button
                  onClick={() => addCondition()}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  +
                </button>
                {conditions.length > 1 && (
                  <button
                    onClick={() => removeCondition(index)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </Modal>
  );
}
```

### update/src/components/jobs/SortSection.jsx

```
// src/components/jobs/SortSection.jsx
import React, { useState } from 'react';
import SortModal from './SortModal';
import { Icons } from '../common/Icons';
import { IconButton } from '../common/IconButton';

export default function SortSection({ activeSorts, setActiveSorts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSort, setEditingSort] = useState(null);

  const removeSort = (index) => {
    setActiveSorts(sorts => sorts.filter((_, i) => i !== index));
  };

  const editSort = (sort, index) => {
    setEditingSort({ sort, index });
    setIsModalOpen(true);
  };

  // Handle drag and drop reordering
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
    e.target.classList.add('opacity-50');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('opacity-50');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newIndex) => {
    e.preventDefault();
    const oldIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (oldIndex === newIndex) return;

    setActiveSorts(sorts => {
      const newSorts = [...sorts];
      const [removed] = newSorts.splice(oldIndex, 1);
      newSorts.splice(newIndex, 0, removed);
      return newSorts;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {activeSorts.map((sort, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg text-sm cursor-move"
          >
            <div className="text-gray-200">
              {sort.column}
              <span className="ml-1 text-gray-400">
                {sort.order === 'asc' ? '↑' : '↓'}
              </span>
            </div>
            <div className="flex gap-1">
              <IconButton
                icon={<Icons.Edit />}
                label="Edit"
                onClick={() => editSort(sort, index)}
                variant="primary"
                size="sm"
              />
              <IconButton
                icon={<Icons.Delete />}
                label="Remove"
                onClick={() => removeSort(index)}
                variant="danger"
                size="sm"
              />
            </div>
          </div>
        ))}
      </div>
      
      <SortModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSort(null);
        }}
        activeSorts={activeSorts}
        setActiveSorts={setActiveSorts}
        editingSort={editingSort}
      />
    </div>
  );
}
```

### update/src/components/jobs/JobsTable.jsx

```
// src/components/jobs/JobsTable.jsx
import React from 'react';
import { useApplications } from '../../context/ApplicationContext';

export default function JobsTable({ 
  jobs, 
  pageSize, 
  currentPage, 
  onPageChange, 
  totalPages,
  totalCount, // Add this prop to get total number of jobs
}) {
  const { getApplicationStatus, updateApplication } = useApplications();

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);

  const handleStatusToggle = async (jobId, type) => {
    const currentStatus = getApplicationStatus(jobId, type);
    await updateApplication(jobId, type, !currentStatus);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="overflow-x-hidden border border-gray-700 rounded-lg">
        <div className="w-full">
          <table className="w-full table-fixed divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="w-1/5 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Company
                </th>
                <th className="w-1/5 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="w-1/5 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="w-1/12 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Apply
                </th>
                <th className="w-1/12 px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="w-1/12 px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Applied
                </th>
                <th className="w-1/12 px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Active
                </th>
                <th className="w-1/12 px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Hide
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {jobs.map((job) => (
                <tr 
                  key={job.id}
                  className={getApplicationStatus(job.id, 'hidden') ? 'hidden' : 'hover:bg-gray-700'}
                >
                  <td className="px-4 py-3">
                    <div className="relative group">
                      <div className="text-sm text-gray-200 truncate">
                        {job.company_name}
                      </div>
                      <div className="hidden group-hover:block absolute z-10 bg-gray-800 text-white p-2 rounded shadow-lg whitespace-normal max-w-md">
                        {job.company_name}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative group">
                      <div className="text-sm text-gray-200 truncate">
                        {job.title}
                      </div>
                      <div className="hidden group-hover:block absolute z-10 bg-gray-800 text-white p-2 rounded shadow-lg whitespace-normal max-w-md">
                        {job.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative group">
                      <div className="text-sm text-gray-200 truncate">
                        {job.locations}
                      </div>
                      <div className="hidden group-hover:block absolute z-10 bg-gray-800 text-white p-2 rounded shadow-lg whitespace-normal max-w-md">
                        {job.locations}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Apply
                      </a>
                      <a
                        href={`https://simplify.jobs/p/${job.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="/simplify-logo.png"
                          alt="Simplify"
                          className="h-5 w-5"
                          title="Apply with Simplify"
                        />
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-200 whitespace-nowrap">
                    {job.date_updated}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <button
                      onClick={() => handleStatusToggle(job.id, 'applied')}
                      className={`px-2 py-1 text-xs rounded w-16 ${
                        getApplicationStatus(job.id, 'applied')
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-600 text-gray-200'
                      }`}
                    >
                      {getApplicationStatus(job.id, 'applied') ? 'Yes' : 'No'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded ${
                      job.active ? 'bg-green-600' : 'bg-gray-600'
                    }`}>
                      {job.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <button
                      onClick={() => handleStatusToggle(job.id, 'hidden')}
                      className={`px-2 py-1 text-xs rounded w-16 ${
                        getApplicationStatus(job.id, 'hidden')
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-600 text-gray-200'
                      }`}
                    >
                      {getApplicationStatus(job.id, 'hidden') ? 'Yes' : 'No'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded-lg">
        <div className="text-sm text-gray-400">
          Showing {totalCount > 0 ? startIndex + 1 : 0} to {endIndex} of {totalCount} results
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-3 py-1 text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Mobile Pagination */}
      <div className="mt-4 sm:hidden">
        <select
          value={currentPage}
          onChange={(e) => onPageChange(Number(e.target.value))}
          className="block w-full bg-gray-700 border-gray-600 text-white rounded-md"
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Page {i + 1} of {totalPages}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
```

### update/src/components/jobs/SearchBar.jsx

```
// src/components/jobs/SearchBar.jsx
import React, { useState, useEffect } from 'react';

export default function SearchBar({
  value,
  onChange,
  searchInFiltered,
  setSearchInFiltered
}) {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleSearch = () => {
    onChange(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value); // Real-time search
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Search for internships..."
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="searchFiltered"
          checked={searchInFiltered}
          onChange={(e) => setSearchInFiltered(e.target.checked)}
          className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="searchFiltered" className="text-gray-300">
          Search in filtered results only
        </label>
      </div>
    </div>
  );
}
```

### update/src/components/jobs/SortModal.jsx

```
// src/components/jobs/SortModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

export default function SortModal({
  isOpen,
  onClose,
  activeSorts,
  setActiveSorts,
  editingSort
}) {
  const [column, setColumn] = useState('company_name');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    if (editingSort) {
      const { sort } = editingSort;
      setColumn(sort.column);
      setOrder(sort.order);
    } else {
      setColumn('company_name');
      setOrder('asc');
    }
  }, [editingSort]);

  const handleApply = () => {
    const newSort = { column, order };

    if (editingSort) {
      const newSorts = [...activeSorts];
      newSorts[editingSort.index] = newSort;
      setActiveSorts(newSorts);
    } else {
      setActiveSorts([...activeSorts, newSort]);
    }

    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={editingSort ? 'Edit Sort' : 'Add Sort'}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Column
          </label>
          <select
            value={column}
            onChange={(e) => setColumn(e.target.value)}
            className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="company_name">Company Name</option>
            <option value="title">Job Title</option>
            <option value="locations">Location</option>
            <option value="date_updated">Date Updated</option>
            <option value="active">Status</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Order
          </label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editingSort ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
```

### update/src/components/common/Icons.jsx

```
// src/components/common/Icons.jsx
import React from 'react';

export const Icons = {
  Add: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Reset: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Clear: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Sort: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
    </svg>
  ),
  Filter: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
  Edit: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Delete: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Duplicate: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  SortAsc: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9M3 12h5m0 0v8m0-8l-4 4m4-4l4 4" />
    </svg>
  ),
  SortDesc: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9M3 12h5m0 0V4m0 8l-4-4m4 4l4-4" />
    </svg>
  ),
  DragHandle: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  )
};
```

### update/src/components/common/TableHeader.jsx

```
// src/components/common/TableHeader.jsx
import React from 'react';
import { Icons } from './Icons';

export default function TableHeader({ 
  column, 
  label, 
  sortable = false,
  sortConfig,
  onSort
}) {
  const isSorted = sortConfig?.column === column;
  const sortOrder = isSorted ? sortConfig.order : null;

  return (
    <th 
      className={`px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider ${
        sortable ? 'cursor-pointer hover:bg-gray-700' : ''
      }`}
      onClick={sortable ? () => onSort(column) : undefined}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        {sortable && (
          <span className="text-gray-400">
            {sortOrder === 'asc' ? <Icons.SortAsc /> : 
             sortOrder === 'desc' ? <Icons.SortDesc /> : 
             <Icons.Sort />}
          </span>
        )}
      </div>
    </th>
  );
}
```

### update/src/components/common/Button.jsx

```
// src/components/common/Button.jsx
import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded font-medium focus:outline-none transition-colors';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
  };

  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
```

### update/src/components/common/Tooltip.jsx

```
// src/components/common/Tooltip.jsx
import React from 'react';

export function Tooltip({ children, content, className = '' }) {
  return (
    <div className={`relative group ${className}`}>
      {children}
      <div className="hidden group-hover:block absolute z-50 p-2 bg-gray-900 text-white text-sm rounded shadow-lg whitespace-normal max-w-xs">
        {content}
      </div>
    </div>
  );
}


```

### update/src/components/common/Badge.jsx

```
// src/components/common/Badge.jsx
import React from 'react';

export default function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-gray-600 text-white',
    primary: 'bg-blue-600 text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-600 text-white',
    danger: 'bg-red-600 text-white',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}


```

### update/src/components/common/IconButton.jsx

```
// src/components/common/IconButton.jsx
import React from 'react';
import { Tooltip } from './Tooltip';

export const IconButton = ({ 
  icon, 
  label, 
  onClick, 
  variant = 'default',
  size = 'md',
  className = '',
  disabled = false
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full focus:outline-none transition-colors duration-150 ease-in-out';
  
  const variantClasses = {
    default: 'text-gray-400 hover:text-white hover:bg-gray-700',
    primary: 'text-blue-400 hover:text-white hover:bg-blue-700',
    danger: 'text-red-400 hover:text-white hover:bg-red-700',
    success: 'text-green-400 hover:text-white hover:bg-green-700'
  };

  const sizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  const button = (
    <button
      onClick={disabled ? undefined : onClick}
      className={buttonClasses}
      disabled={disabled}
      type="button"
      aria-label={label}
    >
      {icon}
    </button>
  );

  if (label) {
    return (
      <Tooltip content={label}>
        {button}
      </Tooltip>
    );
  }

  return button;
};
```

### update/src/components/common/Modal.jsx

```
// src/components/common/Modal.jsx
import React, { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75"
          onClick={onClose}
        ></div>

        <div className="inline-block w-full max-w-xl p-6 my-8 text-left align-middle transition-all transform bg-gray-800 rounded-lg shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
```

### update/src/components/layout/Navbar.jsx

```
// src/components/layout/Navbar.jsx
import { Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Internship Tracker
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/jobs"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Jobs
              </Link>
              <Link
                to="/analytics"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Analytics
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-gray-300 mr-4">{user?.username}</span>
            <button
              onClick={logout}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}



```

### update/src/components/layout/Footer.jsx

```

```

### update/src/components/layout/Layout.jsx

```
// src/components/layout/Layout.jsx
import Navbar from './Navbar';
import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

```

### update/src/components/layout/AuthRequired.jsx

```
// src/components/layout/AuthRequired.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAuth } from '../../context/AuthContext';

const AuthRequired = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthRequired;
```
