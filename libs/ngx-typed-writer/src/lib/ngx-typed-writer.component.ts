import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  FADE_OUT_CLASS,
  backSpaceHtmlChars,
  typeHtmlChars,
  shuffleStringsIfNeeded,
} from './util';

@Component({
  selector: 'ngx-typed-writer',
  changeDetection : ChangeDetectionStrategy.OnPush,
  template: `
    <span #typedText> </span>
    <span #cursorRef class="typing-cursor" *ngIf="showCursor"
      >{{ cursorChar }}
    </span>
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
  @ViewChild('typedText', { static: true }) typedTextRef!: ElementRef;
  @ViewChild('cursorRef')
  cursor!: ElementRef;

  @Input()
  strings: string[] = [];

  @Input()
  typeSpeed = 40;

  @Input()
  startDelay = 0;

  @Input()
  backSpeed = 40;

  @Input()
  smartBackspace = false;

  @Input()
  shuffle = false;

  @Input()
  backDelay = 1000;

  @Input()
  isHTML = false;

  @Input()
  fadeOut = false;

  @Input()
  loop = true;

  @Input()
  showCursor = true;

  @Input()
  cursorChar = '|';

  @Input()
  fadeOutDelay = 500;

  private currentStringIndex = 0;
  private currentString = '';
  private currentStringPosition = 0;
  private isTypingPaused = false;
  private timeout!: NodeJS.Timeout;
  private stopNum = 0;

  @Output()
  destroy = new EventEmitter<void>();

  @Output()
  initTyped = new EventEmitter<void>();

  @Output()
  completeLoop = new EventEmitter<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    isPlatformBrowser(this.platformId) && this.init();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
    this.destroy.emit();
  }

  private init(): void {
    this.strings = shuffleStringsIfNeeded(this.shuffle, this.strings);
    this.currentString = this.strings[this.currentStringIndex];

    this.timeout = setTimeout(() => {
      this.typeString();
      this.initTyped.emit();
    }, this.startDelay);
  }

  private typeString(): void {
    if (this.isTypingPaused) return;

    if (this.fadeOut) {
      const typedElement = this.typedTextRef.nativeElement as HTMLSpanElement;
      this.renderer2.removeClass(typedElement, FADE_OUT_CLASS);

      if (this.showCursor) {
        const cursorElement = this.cursor?.nativeElement as HTMLSpanElement;
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
        }, this.backDelay);
      }, this.typeSpeed);
    }
  }

  private typeCharacter(): void {
    this.timeout = setTimeout(() => {
      this.currentStringPosition = typeHtmlChars(
        this.isHTML,
        this.currentString,
        this.currentStringPosition
      );

      const nextString = this.currentString.substring(
        0,
        this.currentStringPosition + 1
      );
      const lastItem = this.strings.at(-1);

      this.typedTextRef.nativeElement.innerHTML = nextString;

      this.currentStringPosition++;

      if (nextString === lastItem && !this.loop) {
        this.completeLoop.emit();
        return;
      }
      this.typeString();
    }, this.typeSpeed);
  }

  private backspaceString(): void {
    if (this.isTypingPaused) return;
    if (this.fadeOut) {
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

        if (this.currentStringIndex >= this.strings.length) {
          if (this.loop) {
            this.currentStringIndex = 0;
            // this.typeString();
          } else {
            return; // Finished typing all strings
          }
        }

        this.currentString = this.strings[this.currentStringIndex];
        this.timeout = setTimeout(() => {
          this.typeString();
        }, this.typeSpeed);
      }, this.typeSpeed);
    }
  }

  private backspaceCharacter(): void {
    const currentString = this.typedTextRef.nativeElement.innerHTML;
    this.currentStringPosition = backSpaceHtmlChars(
      this.isHTML,
      this.currentString,
      this.currentStringPosition
    );

    const curStringAtPosition = currentString.substring(
      0,
      this.currentStringPosition
    );

    this.typedTextRef.nativeElement.innerHTML = curStringAtPosition;

    this.timeout = setTimeout(() => {
      //  if smartBack is enabled
      if (this.smartBackspace) {
        // the remaining part of the current string is equal of the same part of the new string
        const nextStringPartial = this.strings[this.currentStringIndex + 1];
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
    }, this.backSpeed);
  }

  private initFadeOut() {
    const typedElement = this.typedTextRef.nativeElement as HTMLSpanElement;
    this.renderer2.addClass(typedElement, FADE_OUT_CLASS);

    if (this.showCursor) {
      const cursorElement = this.cursor.nativeElement as HTMLSpanElement;
      this.renderer2.addClass(cursorElement, FADE_OUT_CLASS);
    }

    this.timeout = setTimeout(() => {
      this.currentStringIndex++;
      typedElement.innerHTML = '';

      // Resets current string if end of loop reached
      if (this.strings.length > this.currentStringIndex) {
        this.currentStringPosition = 0;
        this.currentString = this.strings[this.currentStringIndex];
        this.typeString();
      } else {
        this.currentStringPosition = 0;
        this.currentStringIndex = 0;
        this.currentString = this.strings[this.currentStringIndex];
        this.typeString(); // this.currentStringIndex++;
      }
    }, this.fadeOutDelay);
  }
}
