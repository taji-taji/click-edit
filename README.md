# jQuery Click Edit

to make it editable by clicking

## Usage

```html
<link rel="stylesheet" href="jquery.click-edit.css">
<script src="jquery.min.js"></script>
<script src="jquery.click-edit.js"></script>

<p>edit target</p>
<table>
	<tbody>
		<tr>
			<th>A</th>
			<th>B</th>
			<th>C</th>
		</tr>
		<tr>
			<td>1</td>
			<td>2</td>
			<td>3</td>
		</tr>
		<tr>
			<td>4</td>
			<td>5</td>
			<td>6</td>
		</tr>
	</tbody>
</table>
```

```js
$('p').ce();
$('td').ce({
	width: 'fit',
	height: 'fit'
});
```

## Options

```js
afterChangeVal     : function() {},   // A function run after change target text.
afterShow          : function() {},   // A function run after show edit field.
beforeChangeVal    : function() {},   // A function run before change target text.
cancelButton       : false,           // Create a button to cancel edit
cancelButtonClass  : null,            // Add custom class to cancel button
cancelText         : 'Cancel',        // Text for cancel button
editButton         : false,           // Create a button to start edit
editButtonClass    : null,            // Add custom class to edit button
editText           : 'Edit',          // Text for edit button
finishButton       : false,           // Create a button to finish edit
finishButtonClass  : null,            // Add custom class to finish button
finishText         : 'OK',            // Text for finish button
height             : 'fit',           // 'auto' or 'fit' or a numerical value.
type               : 'input',         // Edit field type. 'input' or 'textarea'
width              : 100              // 'fit' or a numerical value. 'fit' -> fit the target width
```

## Functions

```js
$('p').ce('cancel');    // Cancel edit
$('p').ce('destroy');   // Destroy the bind and give you the raw element.
$('p').ce('show');      // Show edit fields.
```
