---
title: State Management in Svelte 5
description: Explore the new state management patterns and runes in Svelte 5
date: '2024-12-28'
published: true
---

# State Management in Svelte 5

Svelte 5 introduces runes, a new way to handle reactivity and state management. Let's explore these powerful new features.

## Runes Overview

Runes are symbols that tell the Svelte compiler how to handle different types of reactive state:

- `$state()` - Reactive state
- `$derived()` - Computed values
- `$effect()` - Side effects
- `$props()` - Component props

## Basic State

```javascript
let count = $state(0);
let doubled = $derived(count * 2);

$effect(() => {
	console.log(`Count is ${count}`);
});
```

## Component Props

```javascript
// Child component
let { name, age = 0 } = $props();
```

## Advanced Patterns

### Reactive Objects

```javascript
let user = $state({
	name: 'John',
	age: 25,
	preferences: {
		theme: 'dark'
	}
});

// Deep reactivity works automatically
user.preferences.theme = 'light';
```

### Custom Stores

```javascript
function createCounter() {
	let count = $state(0);

	return {
		get count() {
			return count;
		},
		increment: () => count++,
		decrement: () => count--,
		reset: () => (count = 0)
	};
}
```

## Migration from Svelte 4

The migration is straightforward with the provided migration tools. Runes offer better TypeScript integration and more predictable behavior.

Svelte 5's runes make state management more explicit and powerful!
