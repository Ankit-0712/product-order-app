# Product Order App

A simple Angular standalone application to create product orders with dynamic rows, quantity selection, and a summary. Includes Text-to-Speech (TTS) support for reading orders aloud.

---

## Features

* Dynamic product rows with add, edit, and remove functionality.
* Quantity selection (1-5) for each product.
* Lock rows once added to the order.
* Display order summary.
* Text-to-Speech (TTS) for reading the order.
* Maximum 8 rows allowed.

---

## Tech Stack

* Angular (Standalone Components)
* Reactive Forms
* TypeScript
* HTML/CSS

---

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Run the application:

```bash
ng serve
```

Open your browser at `http://localhost:4200`.

---

## Usage

1. Select a product from the dropdown.
2. Choose a quantity.
3. Click **Add** to add the row to the order.
4. Optionally, **Edit** or **Remove** a row.
5. Click **Show Order Summary** to view all added products.
6. Click **Read Order (TTS)** to hear the order aloud.

---

## Running Tests

The project includes unit tests for core functionality using Jasmine and Karma.

```bash
ng test
```

---

## File Structure

```
src/app/
│
├── models/
│   ├── product.ts       # Product interface
│   └── orderItem.ts     # OrderItem interface
│
├── service/
│   └── tts.service.ts   # Text-to-Speech service
│
├── app.component.ts     # Main component logic
├── app.component.html   # Template
├── app.component.css    # Styling
└── app.component.spec.ts # Unit tests
```

---

## Notes

* Ensure your browser supports Web Speech API for TTS.
* Maximum 8 product rows can be added at a time.
* Rows are locked after adding to prevent accidental edits.

---

## License

This project is licensed under the MIT License.
