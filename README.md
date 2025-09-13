
# React Signature Pad

A highly customizable signature component for React and Next.js applications.

## Features

- Draw signatures with mouse or touch
- Undo/redo functionality
- Customizable pen styles and colors
- Export to PNG, JPEG, SVG
- Responsive design
- TypeScript support
- Next.js compatible
- Touch and mobile device support
- Signature validation
- Customizable UI
- Optional Tailwind utility theming
- Built-in dark mode toggle (opt-in)

## Installation

```bash
# npm
npm install react-signature-pad
# yarn
yarn add react-signature-pad
# pnpm
pnpm add react-signature-pad
```

## Quick Usage

```tsx
import React from 'react';
import { SignaturePad } from 'react-signature-pad';

export default function App() {
	return (
		<div style={{ maxWidth: 500 }}>
			<SignaturePad
				penColor="#222"
				backgroundColor="#fff"
				onEnd={signature => console.log(signature)}
			/>
		</div>
	);
}
```

## API Reference (Selected)

| Prop              | Type       | Description                                 |
|-------------------|------------|---------------------------------------------|
| `penColor`        | string     | Color of the pen                            |
| `backgroundColor` | string     | Background color of the pad                 |
| `onEnd`           | function   | Callback when drawing ends                  | 
| `onClear`         | function   | Callback when pad is cleared                |
| `disabled`        | boolean    | Disable drawing                            |
| `exportType`      | string     | 'png', 'jpeg', or 'svg'                    |
| `theme`           | 'default' \| 'tailwind' | Switches wrapper styling mode |
| `showDarkModeToggle` | boolean | Shows a small dark mode toggle button |

See [src/components/SignaturePad.tsx](src/components/SignaturePad.tsx) for full prop list.

## Exporting Signatures

You can export the signature as PNG, JPEG, or SVG:

```tsx
const dataUrl = signaturePadRef.current?.toDataURL('image/png');
```

## Tailwind Integration

You can opt into Tailwind-based styling by passing `theme="tailwind"` and ensuring Tailwind is configured in your app.

```tsx
<SignaturePad theme="tailwind" showDarkModeToggle />
```

This adds utility classes for spacing, rounded borders, light/dark surfaces, and transitions while keeping default CSS as a fallback.

### Dark Mode
If `showDarkModeToggle` is true a button toggles `html.dark`. You can also control dark mode externally—Tailwind will pick up class changes automatically.

### Custom Theming
- Extend by wrapping the component and applying your own classes via `className`.
- Use your Tailwind config to customize color scales.

## Customization

- Change pen color, thickness, background
- Customize controls via `SignatureControls` and `SignatureCustomizationPanel`
- Use hooks for advanced features: `useSignature`, `useUndoRedo`

## Examples & Demo

See full guide in [EXAMPLES.md](./EXAMPLES.md)

- React (Vite) playground: `examples/react-example`
- Next.js integration: `examples/nextjs-example`

## Contributing

Contributions are welcome! Please open issues or pull requests.

## License

MIT


