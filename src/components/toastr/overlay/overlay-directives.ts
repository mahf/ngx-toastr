import {
    Directive,
    TemplateRef,
    ViewContainerRef,
    OnInit,
    Input,
    OnDestroy,
    ElementRef,
} from '@angular/core';
import {Overlay} from './overlay';
import {OverlayRef} from './overlay-ref';
import {TemplatePortal} from '../portal/portal';


/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
@Directive({
  selector: '[overlay-origin]',
  exportAs: 'overlayOrigin',
})
export class OverlayOrigin {
  constructor(private _elementRef: ElementRef) { }

  get elementRef() {
    return this._elementRef;
  }
}



/**
 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
 */
@Directive({
  selector: '[connected-overlay]',
})
export class ConnectedOverlayDirective implements OnInit, OnDestroy {
  @Input() origin: OverlayOrigin;
  private _overlayRef: OverlayRef;
  private _templatePortal: TemplatePortal;

  constructor(
      private _overlay: Overlay,
      templateRef: TemplateRef<any>,
      viewContainerRef: ViewContainerRef) {
    this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
  }

  get overlayRef() {
    return this._overlayRef;
  }

  /** TODO: internal */
  ngOnInit() {
    this._createOverlay();
  }

  /** TODO: internal */
  ngOnDestroy() {
    this._destroyOverlay();
  }

  /** Creates an overlay and attaches this directive's template to it. */
  private _createOverlay() {
    this._overlay.create().then(ref => {
      this._overlayRef = ref;
      this._overlayRef.attach(this._templatePortal);
    });
  }

  /** Destroys the overlay created by this directive. */
  private _destroyOverlay() {
    this._overlayRef.dispose();
  }
}


export const OVERLAY_DIRECTIVES = [ConnectedOverlayDirective, OverlayOrigin];