export default class Slider {
    constructor(settings, callback) {
        (this.slider = settings.sliderparent),
            (this.slideables = settings.slideables);
        this.margins = settings.margins;
        this.translation = 0;
        this.translated = 0;
        this.init(callback);
        this.events = {
            resize: [],
        };
    }

    init = (callback) => {
        if (
            this.slideables == null &&
            this.slideables == undefined &&
            this.slider == null &&
            this.slider == undefined
        ) {
            return;
        }

        this.translatewidth =
            this.slideables[0].getBoundingClientRect().width + (this.margins || 0);

        window.addEventListener("resize", () => {
            this.emitEvent("resize");

            this.translatewidth =
                this.slideables[0].getBoundingClientRect().width + (this.margins || 0);
            this.translation = -(this.translated * this.translatewidth);
            this.slider.style.transform = `translateX(${this.translation}px)`;
        });

        if (typeof callback === "function") {
            callback();
        }
    };

    slideForward = (translation, callback, uppercallback) => {
        if (!(this.translated + 1 > this.slideables.length - 1)) {
            if (typeof callback === "function") {
                this.slider.ontransitionend = (e) => {
                    e.stopPropagation();
                    callback(this.translated);
                    this.slider.ontransitionend = null;
                };
            }

            this.translation -= this.translatewidth;
            this.translated++;
            if (translation !== null && translation !== undefined) {
                this.slider.style.transform = `translateX(${translation}px)`;
            } else {
                this.slider.style.transform = `translateX(${this.translation}px)`;
            }

            if (typeof uppercallback === "function") {
                uppercallback(this.translated);
            }
        }
        return this.translated;
    };

    slideBackward = (translation, callback, uppercallback) => {
        if (!(this.translated - 1 < 0)) {
            if (typeof callback === "function") {
                this.slider.ontransitionend = (e) => {
                    e.stopPropagation();
                    callback(this.translated);
                    this.slider.ontransitionend = null;
                };
            }

            this.translation += this.translatewidth;
            this.translated--;

            if (translation !== null && translation !== undefined) {
                this.slider.style.transform = `translateX(${translation}px)`;
            } else {
                this.slider.style.transform = `translateX(${this.translation}px)`;
            }

            if (typeof uppercallback === "function") {
                uppercallback(this.translated);
            }
        }
        return this.translated;
    };

    slideTo = (index, callback, uppercallback) => {
        if (!(index > this.slideables.length - 1) || !(index < 0)) {
            if (typeof callback === "function") {
                this.slider.ontransitionend = (e) => {
                    e.stopPropagation();
                    callback(this.translated);
                    this.slider.ontransitionend = null;
                };
            }

            this.translated = index;
            this.translation = -(this.translated * this.translatewidth);
            this.slider.style.transform = `translateX(${this.translation}px)`;

            if (typeof uppercallback === "function") {
                uppercallback(this.translated);
            }
        }
        return this.translated;
    };

    updateSlider = (childrenquery) => {
        this.slideables = document.querySelectorAll(childrenquery);
        this.slideBackward(0);
        this.translated = 0;
    };

    setSlideables = (slideables) => {
        this.slideables = slideables;
        this.init();
    };

    setMargins = (margins) => {
        this.margins = margins;
    };

    setEvent = (type, callback) => {
        if (typeof callback === "function") {
            this.events[`${type}`].push(callback);
        }
    };

    emitEvent = (event) => {
        this.events[event.toString()].forEach((event) => {
            if (typeof event === "function") {
                event();
            }
        });
    };
}
