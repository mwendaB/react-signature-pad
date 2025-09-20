
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

## Quick Usage (Basic)

```tsx
import React, { useRef } from 'react';
import { SignaturePad } from 'react-signature-pad';
import type { SignaturePadHandle } from 'react-signature-pad';

export default function App() {
	const padRef = useRef<SignaturePadHandle | null>(null);
	return (
		<div style={{ maxWidth: 600 }}>
			<SignaturePad
				ref={padRef}
				options={{ penColor: '#222', backgroundColor: '#fff', width: 600, height: 250 }}
				onSave={(dataUrl) => console.log('Saved PNG:', dataUrl)}
				saveButton
			/>
			<button onClick={() => {
				const svg = padRef.current?.toSVG();
				if (!svg) return;
				console.log('SVG string length', svg.length);
			}}>Log SVG</button>
		</div>
	);
}
```

## Props (Legacy Wrapper `SignaturePad`)

The wrapper maintains backward compatibility while internally using the enhanced modular system.

Key legacy props (use `options` for drawing configuration):

| Prop | Type | Description |
|------|------|-------------|
| `options` | `Partial<SignatureOptions>` | Drawing config: width, height, penColor, backgroundColor, penWidth, drawingMode etc. |
| `onSave` | `(dataUrl: string) => void` | Fires when user clicks save (PNG Data URL) |
| `onUpload` | `(dataUrl: string) => void` | Optional upload action callback |
| `onChange` | `(isEmpty: boolean) => void` | Notified when pad emptiness changes |
| `saveButton` / `uploadButton` / `clearButton` | `boolean` | Toggle built‑in action buttons |
| `saveText` / `uploadText` / `clearText` | `string` | Customize button labels |
| `showControls` | `boolean` | Show toolbar + action bar |
| `showCustomization` | `boolean` | Enable settings panel toggle |
| `theme` | `'default' | 'tailwind'` | Styling preset |
| `showDarkModeToggle` | `boolean` | Show small dark mode toggle (legacy theme) |

For fully granular UI composition import and use the lower level components directly.

## Imperative API (Recommended)

Accessed via `ref` implementing `SignaturePadHandle`:

| Method | Description |
|--------|-------------|
| `clear()` | Clears canvas & resets history |
| `undo()` / `redo()` | Stroke history navigation (vector-based) |
| `toDataURL(type?, quality?)` | Canvas bitmap export (PNG/JPEG/WebP) |
| `toSVG()` | True vector export generated from captured stroke points |
| `getStrokes()` | Returns structured stroke list for persistence / analytics |
| `loadStrokes(strokes)` | Hydrates previously saved strokes & redraws |

Example SVG download:

```tsx
const handleDownloadSVG = () => {
	const svg = padRef.current?.toSVG();
	if (!svg) return;
	const blob = new Blob([svg], { type: 'image/svg+xml' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'signature.svg';
	a.click();
	URL.revokeObjectURL(url);
};
```

### Stroke Persistence

```tsx
// Save (e.g., to localStorage)
const strokes = padRef.current?.getStrokes();
localStorage.setItem('signature-strokes', JSON.stringify(strokes));

// Restore later
const saved = localStorage.getItem('signature-strokes');
if (saved) padRef.current?.loadStrokes(JSON.parse(saved));
```

## Exporting Signatures

1. Bitmap: `padRef.current?.toDataURL('image/png')`
2. Vector: `padRef.current?.toSVG()` (keeps crisp scaling & allows post-processing)

Helper one-liner to trigger a PNG download:

```tsx
padRef.current?.toDataURL('image/png'); // returns data URL – handle yourself
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

## Customization Layers

1. High-level: `<SignaturePad />` (fast start, batteries included)
2. Mid-level: `<EnhancedSignaturePad />` grouped prop API
3. Low-level primitives: `SignatureCanvas`, `SignatureToolbar`, `SignatureActionBar`, `SignatureSettingsPanel`
4. Hooks: `useSignature` (vector stroke engine), `useSignaturePad` (state + history + export orchestration), `useUndoRedo`

You can progressively drop down to lower layers as requirements grow.

## Examples & Demo

See full guide in [EXAMPLES.md](./EXAMPLES.md)

- React (Vite) playground: `examples/react-example`
- Next.js integration: `examples/nextjs-example`

## Contributing

Contributions are welcome! Please open issues or pull requests.

## License

MIT


