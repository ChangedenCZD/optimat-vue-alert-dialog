import { BaseModule, mapGetters } from './lib/BaseModule';

class Component extends BaseModule {
    constructor () {
        super();
        this.setProps(['options']);
        this.setComponent({});
        this.setMethod({
            setOptions () {
                let options = this.options || {};
                this.isShow = !!options.isShow;
                this.title = options.title || '';
                this.content = options.content || '';
                this.onHide = typeof options.onHide === 'function' ? options.onHide : null;
                this.buttonColor = typeof options.buttonColor === 'string' && options.buttonColor.indexOf('#') === 0 ? options.buttonColor : '#00AAEE';
                this.showMask = typeof options.showMask === 'boolean' ? options.showMask : false;
                this.autoDismiss = typeof options.autoDismiss === 'boolean' ? options.autoDismiss : true;
                this.$nextTick(() => {
                    let el = this.$el.querySelector('.dialog-area');
                    if (el) {
                        el.style.marginTop = `${(this.windowHeight - el.offsetHeight) / 2}px`;
                    }
                });
            },
            hide () {
                this.onHide && this.onHide();
            }
        });
        this.setCompute({
            ...mapGetters({
                windowHeight: 'windowHeight',
                windowWidth: 'windowWidth'
            })
        });
        this.setWatch({
            options () {
                this.setOptions();
            },
            shake (value) {
                if (value) {
                    let self = this;
                    if (self.autoDismiss) {
                        self.shake = false;
                        self.hide();
                    } else {
                        setTimeout(() => {
                            self.shake = false;
                        }, 300);
                    }
                }
            }
        });
    }

    getData () {
        return {
            isShow: false,
            title: '',
            content: '',
            onHide: null,
            buttonColor: '00AAEE',
            showMask: false,
            defaultWidth: '',
            defaultHeight: '',
            shake: false,
            autoDismiss: true
        };
    }

    onCreate () {
        let app = this.app;
        app.setOptions();
        app.defaultWidth = window.innerWidth;
        app.defaultHeight = window.innerHeight;
    }

    onMount () {
    }
}

module.exports = Component;
