import { isPlatformBrowser } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  input,
  model,
  OnDestroy,
  OnInit,
  output,
  PLATFORM_ID,
  Renderer2,
  viewChild,
} from '@angular/core';

import {
  backSpaceHtmlChars,
  FADE_OUT_CLASS,
  shuffleStringsIfNeeded,
  typeHtmlChars,
} from './util';

@Component({
  selector: 'ngx-typed-writer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span #typedText> </span>
    @if (showCursor()) {
      <span #cursorRef class="typing-cursor">{{ cursorChar() }} </span>
    }
  `,
  styles: [
    `
      .typing-cursor {
        -webkit-animation: blink 0.7s infinite;
        display: inline-block;
        opacity: 1;
        animation: blink 0.7s infinite;
      }

      @keyframes blink {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      .typed-fade-out {
        opacity: 0;
        transition: opacity 0.25s;
      }
    `,
  ],
})
export class NgxTypedWriterComponent implements OnInit, OnDestroy {
  typedTextRef = viewChild<ElementRef>('typedText');

  cursor = viewChild<ElementRef>('cursorRef');

  strings = model<string[]>([]);

  typeSpeed = input(40);

  startDelay = input(0);

  backSpeed = input(40);

  smartBackspace = input(false, { transform: booleanAttribute });

  shuffle = input(false, { transform: booleanAttribute });

  backDelay = input(1000);

  isHTML = input(false, { transform: booleanAttribute });

  fadeOut = input(false, { transform: booleanAttribute });

  loop = input(true, { transform: booleanAttribute });

  showCursor = input(true, { transform: booleanAttribute });

  cursorChar = input('|');

  fadeOutDelay = input(500);

  private currentStringIndex = 0;
  private currentString = '';
  private currentStringPosition = 0;
  private isTypingPaused = false;
  private timeout!: NodeJS.Timeout;
  private stopNum = 0;

  destroy = output<void>();

  initTyped = output<void>();

  completeLoop = output<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private renderer2: Renderer2,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.init();
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
    this.destroy.emit();
  }

  private init(): void {
    this.strings.set(shuffleStringsIfNeeded(this.shuffle(), this.strings()));
    this.currentString = this.strings()[this.currentStringIndex];

    this.timeout = setTimeout(() => {
      this.typeString();
      this.initTyped.emit();
    }, this.startDelay());
  }

  private typeString(): void {
    if (this.isTypingPaused) return;

    if (this.fadeOut()) {
      const typedElement = this.typedTextRef()
        ?.nativeElement as HTMLSpanElement;
      this.renderer2.removeClass(typedElement, FADE_OUT_CLASS);

      if (this.showCursor()) {
        const cursorElement = this.cursor()?.nativeElement as HTMLSpanElement;
        this.renderer2.removeClass(cursorElement, FADE_OUT_CLASS);
      }
    }

    if (this.currentStringPosition < this.currentString.length) {
      this.typeCharacter();
    } else {
      this.isTypingPaused = true;
      this.timeout = setTimeout(() => {
        this.isTypingPaused = false;
        this.timeout = setTimeout(() => {
          this.backspaceString();
        }, this.backDelay());
      }, this.typeSpeed());
    }
  }

  private typeCharacter(): void {
    this.timeout = setTimeout(() => {
      this.currentStringPosition = typeHtmlChars(
        this.isHTML(),
        this.currentString,
        this.currentStringPosition,
      );

      const nextString = this.currentString.substring(
        0,
        this.currentStringPosition + 1,
      );
      const lastItem = this.strings().at(-1);

      this.typedTextRef()!.nativeElement.innerHTML = nextString;

      this.currentStringPosition++;

      if (nextString === lastItem && !this.loop()) {
        this.completeLoop.emit();
        return;
      }
      this.typeString();
    }, this.typeSpeed());
  }

  private backspaceString(): void {
    if (this.isTypingPaused) return;
    if (this.fadeOut()) {
      this.initFadeOut();
      return;
    }

    if (this.currentStringPosition > this.stopNum) {
      this.backspaceCharacter();
    } else {
      this.isTypingPaused = true;
      this.timeout = setTimeout(() => {
        this.isTypingPaused = false;
        this.currentStringIndex++;

        if (this.currentStringIndex >= this.strings().length) {
          if (this.loop()) {
            this.currentStringIndex = 0;
            // this.typeString();
          } else {
            return; // Finished typing all strings
          }
        }

        this.currentString = this.strings()[this.currentStringIndex];
        this.timeout = setTimeout(() => {
          this.typeString();
        }, this.typeSpeed());
      }, this.typeSpeed());
    }
  }

  private backspaceCharacter(): void {
    const currentString = this.typedTextRef()?.nativeElement.innerHTML;
    this.currentStringPosition = backSpaceHtmlChars(
      this.isHTML(),
      this.currentString,
      this.currentStringPosition,
    );

    const curStringAtPosition = currentString.substring(
      0,
      this.currentStringPosition,
    );

    (this.typedTextRef()!.nativeElement as HTMLElement).innerHTML =
      curStringAtPosition;

    this.timeout = setTimeout(() => {
      //  if smartBack is enabled
      if (this.smartBackspace()) {
        // the remaining part of the current string is equal of the same part of the new string
        const nextStringPartial = this.strings()[this.currentStringIndex + 1];
        const compare =
          curStringAtPosition ===
          nextStringPartial?.substring(0, this.currentStringPosition);

        if (nextStringPartial && compare) {
          this.stopNum = this.currentStringPosition - 1;
        } else {
          this.stopNum = 0;
        }
      }

      if (this.currentStringPosition > this.stopNum) {
        // subtract characters one by one
        this.currentStringPosition--;
        // loop the function
        this.backspaceString();
      } else if (this.currentStringPosition <= this.stopNum) {
        // if the stop number has been reached, increase
        // array position to next string
        this.currentStringIndex++;
        // When looping, begin at the beginning after backspace complete
        if (this.currentStringIndex === this.strings.length) {
          this.currentStringIndex = 0;
        }
        this.typeString();
      }
    }, this.backSpeed());
  }

  private initFadeOut() {
    const typedElement = this.typedTextRef()?.nativeElement as HTMLSpanElement;
    this.renderer2.addClass(typedElement, FADE_OUT_CLASS);

    if (this.showCursor()) {
      const cursorElement = this.cursor()?.nativeElement as HTMLSpanElement;
      this.renderer2.addClass(cursorElement, FADE_OUT_CLASS);
    }

    this.timeout = setTimeout(() => {
      this.currentStringIndex++;
      typedElement.innerHTML = '';

      // Resets current string if end of loop reached
      if (this.strings().length > this.currentStringIndex) {
        this.currentStringPosition = 0;
        this.currentString = this.strings()[this.currentStringIndex];
        this.typeString();
      } else {
        this.currentStringPosition = 0;
        this.currentStringIndex = 0;
        this.currentString = this.strings()[this.currentStringIndex];
        this.typeString(); // this.currentStringIndex++;
      }
    }, this.fadeOutDelay());
  }
}
