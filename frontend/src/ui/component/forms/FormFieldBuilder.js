export class FormFieldBuilder {

  withName(name) {
    this.name = name;
    return this;
  }

  withPlaceholder(placeholder) {
    this.placeholder = placeholder;
    return this;
  }

  withType(type) {
    this.type = type;
    return this;
  }

  withPattern(pattern) {
    this.pattern = pattern;
    return this;
  }

  build() {
    return Object.assign({}, {
      name: this.name,
      placeholder: this.placeholder,
      type: this.type,
      pattern: this.pattern
    })
  }
}
