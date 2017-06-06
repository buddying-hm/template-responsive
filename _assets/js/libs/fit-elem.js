/**
 * サムネイルなど、縦長か横長か判断してトリミングする
 * 依存: jquery
 */
export default class FitElem {
  constructor(parentSelector, childSelector) {
    var self = this;
    this.boxes = [];
    $(parentSelector).each(function() {
      const box = new Box($(this), childSelector);
      self.boxes.push(box);
    });

    if (this.boxes.length <= 0) return;

    this.setup();
    $(window).on('resize', this.setup.bind(this));
  }

  setup() {
    this.boxes.forEach(box => {
      box.setup();
    });
  }
}

class Box {
  constructor($parent, childSelector) {
    this.parent = new Parent($parent);
    this.child = new Child($(childSelector, $parent));
  }

  setup() {
    if (this.child.isSquare) {
      if (this.parent.isSquare) {
        this.child.fit();
        return;
      }

      if (this.parent.isHorizon) {
        this.child.fitWidth();
      } else {
        this.child.fitHeight();
      }
      return;
    }

    if (this.child.isHorizon) {
      this.child.fitHeight();
      return;
    }
    if (this.child.isVertical) {
      this.child.fitWidth();
      return;
    }
  }
}

class Elem {
  constructor($elem) {
    this.$elem = $elem;
  }

  get isSquare() { return this.$elem.height() === this.$elem.width(); }
  get isHorizon() { return this.$elem.width() - this.$elem.height() > 0; }
  get isVertical() { return this.$elem.height() - this.$elem.width() > 0; }
}

class Parent extends Elem {
  constructor($elem) {
    super($elem);
  }
}

class Child extends Elem {
  constructor($elem) {
    super($elem);
  }

  fit() {
    this.$elem.css({
      width: '100%',
      height: '100%'
    });
  }

  fitWidth() {
    this.$elem.css({
      width: '100%',
      height: 'auto'
    });
  }

  fitHeight() {
    this.$elem.css({
      width: 'auto',
      height: '100%'
    });
  }
}
