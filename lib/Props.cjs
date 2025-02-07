class Props {
  static #schema = null;

  static #data = { ...this.#schema };

  static init(data) {
    this.#schema = data;
    this.#data = { ...data };
  }

  static get data() {
    return this.#data;
  }

  static create(property, { defaultValue = null, currentValue }) {
    this.#schema[property] = defaultValue;
    this.#data[property] = currentValue;
  }

  static set(property, { defaultValue = null, currentValue }) {
    if (this.#schema.hasOwnProperty(property)) {
      this.#data[property] = currentValue;
    } else {
      this.create(property, { defaultValue, currentValue });
    }
  }

  static reset(properties) {
    if (properties.length > 0) {
      properties.forEach((prop) => {
        if (this.#schema.hasOwnProperty(prop)) {
          this.#data[prop] = this.#schema[prop];
        }
      });
    }
  }
}

module.exports = Props;
