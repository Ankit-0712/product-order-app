# 🧪 Unit Test Documentation – Product Order App

## 📌 Overview

This document provides an overview of the unit tests written for the **Product Order App** built with Angular and Reactive Forms. The purpose of these tests is to ensure correctness of core business logic such as adding, removing, editing, and summarizing product orders.

---

## ⚙️ Test Environment

* **Framework**: Angular v17+
* **Testing Tools**: Jasmine + Karma
* **Mocking/Stubs**: Angular TestBed with mock `TtsService`

---

## ✅ Unit Test Cases

### 1. **Component Initialization**

* **Test Case**: Should create the component successfully.
* **Steps**:

  1. Initialize `AppComponent` via TestBed.
  2. Check if the component instance is truthy.
* **Expected Result**: Component should be created without errors.

---

### 2. **Form Initialization**

* **Test Case**: Should initialize form with one empty row.
* **Steps**:

  1. Call `ngOnInit()`.
  2. Check the `rows` FormArray length.
* **Expected Result**: Form should have **1 row**.

---

### 3. **Adding a Row**

* **Test Case**: Should add a new row on `onAdd()`.
* **Steps**:

  1. Fill first row with valid product & quantity.
  2. Call `onAdd(0)`.
  3. Check FormArray length.
* **Expected Result**: FormArray length should increase by **1**.

---

### 4. **Prevent Add with Invalid Data**

* **Test Case**: Should not add row if product or quantity is missing.
* **Steps**:

  1. Keep first row empty.
  2. Call `onAdd(0)`.
* **Expected Result**: Row should not lock or add new row. Alert is triggered.

---

### 5. **Remove a Row**

* **Test Case**: Should remove a row on `onRemoveRow()`.
* **Steps**:

  1. Add 2 rows.
  2. Call `onRemoveRow(0)`.
* **Expected Result**: FormArray length should decrease by **1**.

---

### 6. **Edit a Row**

* **Test Case**: Should unlock a locked row on `onEditRow()`.
* **Steps**:

  1. Add product to row and lock it.
  2. Call `onEditRow(0)`.
* **Expected Result**: Row should be editable again.

---

### 7. **Show Order Summary**

* **Test Case**: Should prepare order summary correctly.
* **Steps**:

  1. Add 2 rows with products.
  2. Call `onShowOrder()`.
  3. Check `orderItem` array.
* **Expected Result**: `orderItem` should contain correct product names and quantities.

---

### 8. **Merge Duplicate Products**

* **Test Case**: Should merge quantities for duplicate product IDs.
* **Steps**:

  1. Add two rows with same product but different quantities.
  2. Call `onShowOrder()`.
* **Expected Result**: Order summary should consolidate into one product with summed quantity.

---

### 9. **TTS - Read Order**

* **Test Case**: Should call TTS service with correct order text.
* **Steps**:

  1. Add product to `orderItem`.
  2. Call `onReadOrder()`.
  3. Spy on `tts.speak()`.
* **Expected Result**: TTS service should be invoked with a valid text string.

---

### 10. **Handle Empty Order**

* **Test Case**: Should show alert if no items exist in order when `onReadOrder()` is called.
* **Steps**:

  1. Ensure `orderItem` is empty.
  2. Call `onReadOrder()`.
* **Expected Result**: Alert "No item in order" is shown.

---

## 📊 Test Coverage

* **AppComponent**: ✅ Covered (logic & UI bindings)
* **Form Handling**: ✅ Covered (Add/Edit/Remove/Validate)
* **Order Summary**: ✅ Covered (Merge & Display)
* **TTS Service Integration**: ✅ Covered (Mock tested)

---

## 🚀 Conclusion

The unit tests validate **all critical user actions** in the Product Order App, ensuring that product selection, order management, and summary generation work as expected. Future enhancements may include:

* Testing edge cases with max rows (8 rows).
* Testing invalid product/quantity data persistence.
* Integration tests for UI rendering.
