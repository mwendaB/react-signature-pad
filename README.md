
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

## Installation

```bash
# npm
npm install react-signature-pad
# yarn
yarn add react-signature-pad
# pnpm
pnpm add react-signature-pad
```

## Usage

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

## API Reference

| Prop              | Type       | Description                                 |
|-------------------|------------|---------------------------------------------|
| `penColor`        | string     | Color of the pen                            |
| `backgroundColor` | string     | Background color of the pad                 |
| `onEnd`           | function   | Callback when drawing ends                  | 
| `onClear`         | function   | Callback when pad is cleared                |
| `disabled`        | boolean    | Disable drawing                            |
| `exportType`      | string     | 'png', 'jpeg', or 'svg'                    |

See [src/components/SignaturePad.tsx](src/components/SignaturePad.tsx) for full prop list.

## Exporting Signatures

You can export the signature as PNG, JPEG, or SVG:

```tsx
const dataUrl = signaturePadRef.current?.toDataURL('image/png');
```

## Customization

- Change pen color, thickness, background
- Customize controls via `SignatureControls` and `SignatureCustomizationPanel`
- Use hooks for advanced features: `useSignature`, `useUndoRedo`

## Examples & Demo

- [React Example](./examples/react-example/src/App.tsx)
- [Next.js Example](./examples/nextjs-example/pages/index.tsx)

## Contributing

Contributions are welcome! Please open issues or pull requests.

## License

MIT


