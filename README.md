# NgxTypedWriter | Angular

Angular component for typing text animation . Angular Universal Friendly.

Based in [Typed.JS](https://github.com/mattboldt/typed.js)

Rewriter native for Angular

# DEMO

See a [live demo](https://skyzerozx.github.io/ngx-typed-writer)

## Basic Usage

Typing a list of strings with tipping text efect

```html
<ngx-typed-writer [strings]="['This a Angular Library', 'Angular Universal Friendly']" [cursorChar]="'_'" [showCursor]="true" [backSpeed]="30" [typeSpeed]="30"> </ngx-typed-writer>
```

## Fade Out Effect

Typing a list of strings with fade out effect enable `fadeOut` and configure `fadeOutDelay`

```html
<ngx-typed-writer [strings]="['This a Angular Library', 'Angular Universal Friendly']" [fadeOut]="true" [fadeOutDelay]="200" [showCursor]="false" [backSpeed]="30" [typeSpeed]="30"> </ngx-typed-writer>
```

## Shuffled

Randomized typing list of string with enable `shuffle`

```html
<ngx-typed-writer
  [strings]="[
        '1 Some <i>strings</i> with',
        '2 Some <strong>HTML</strong>',
        '3 Chars &times; &copy;'
      ]"
  [shuffle]="true"
  [isHTML]="true"
  [backSpeed]="20"
  [typeSpeed]="30"
>
</ngx-typed-writer>
```

## Smart BackSpace

In the following example emable `smartBackspace`, this would only backspace the words after "My List of strings :"

```html
<ngx-typed-writer
  [strings]="[
        'My List of strings : Angular',
        'My List of strings : Universal',
        'My List of strings : <strong>HTML</strong>'
      ]"
  [isHTML]="true"
  [smartBackspace]="true"
  [backSpeed]="20"
  [typeSpeed]="30"
></ngx-typed-writer>
```

# Usage

## Install

`npm install ngx-typed-writer`

## Import into Module

```typescript
import { NgxTypedWriterModule } from 'ngx-typed-writer';

@NgModule({
  imports: [
    ...,
    NgxTypedWriterModule
  ],
  declarations: [...],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

# API

 

# Inputs

| Input          | Type       | Description                                                                 |
|----------------|------------|-----------------------------------------------------------------------------|
| strings        | `string[]` | An array of strings to be typed.                                            |
| typeSpeed      | `number`   | The speed at which the strings are typed, in milliseconds.                  |
| startDelay     | `number`   | The delay before the first string is typed, in milliseconds.                |
| backSpeed      | `number`   | The speed at which the strings are back-spaced, in milliseconds.            |
| smartBackspace | `boolean`  | When use smart backspace, which means that the typing will stop  <br> when the next string starts with the same characters as the current string.          |
| shuffle        | `boolean`  | Whether to shuffle the strings before typing them.                          |
| backDelay      | `number`   | The delay before the back-spacing starts, in milliseconds.                  |
| isHTML         | `boolean`  | Whether the strings contain HTML.                                           |
| fadeOut        | `boolean`  | Whether the component should fade out after each string is typed.           |
| loop           | `boolean`  | When you activate the loop, the list of strings loops infinitely with the typing animation. |
| showCursor     | `boolean`  | Whether to show a cursor while the component is typing.                     |
| cursorChar     | `string`   | The character to use for the cursor.                                        |
| fadeOutDelay   | `number`   | The delay before the component starts to fade out, in milliseconds.         |

# Outputs

| Output       | Description                                                                          |
|--------------|--------------------------------------------------------------------------------------|
| destroy      | Emitted when the component is destroyed.                                             |
| initTyped    | Emitted when the first string is typed.                                              |
| completeLoop | Emitted when the last string is typed and the component loops back to the beginning. |