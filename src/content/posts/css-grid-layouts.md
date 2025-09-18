---
title: Modern CSS Grid Layouts
summary: Master CSS Grid to create responsive and flexible layouts without complexity
date: '2024-12-25'
published: true
---

# Modern CSS Grid Layouts

CSS Grid has revolutionized how we approach layout design. Here's how to use it effectively for modern web applications.

## Basic Grid Setup

```css
.container {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 1rem;
}
```

## Common Layout Patterns

### Holy Grail Layout

```css
.page {
	display: grid;
	grid-template-areas:
		'header header header'
		'sidebar main aside'
		'footer footer footer';
	grid-template-rows: auto 1fr auto;
	min-height: 100vh;
}

.header {
	grid-area: header;
}
.sidebar {
	grid-area: sidebar;
}
.main {
	grid-area: main;
}
.aside {
	grid-area: aside;
}
.footer {
	grid-area: footer;
}
```

### Card Grid

```css
.card-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 2rem;
}

.card {
	display: grid;
	grid-template-rows: auto 1fr auto;
}
```

## Advanced Techniques

### Responsive Without Media Queries

```css
.responsive-grid {
	grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
}
```

### Subgrid (when supported)

```css
.parent {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
}

.child {
	display: grid;
	grid-column: span 2;
	grid-template-columns: subgrid;
}
```

## Grid vs Flexbox

- **Grid**: Two-dimensional layouts, precise control
- **Flexbox**: One-dimensional layouts, content-driven

CSS Grid makes complex layouts simple and maintainable!
