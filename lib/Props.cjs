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

  static create(property, defaultValue = null) {
    if (!this.#schema.hasOwnProperty(property)) {
      this.#data[property] = defaultValue;
    } else {
      throw new Error("Propery Already Exist");
    }
  }

  static set(property, value) {
    if (this.#schema.hasOwnProperty(property)) {
      this.#data[property] = value;
    } else {
      throw new Error("Property doesn't exist");
    }
  }

  static reset(properties) {
    if (properties.length > 0) {
      properties.forEach((prop) => {
        if (this.#schema.hasOwnProperty(prop)) {
          this.#data[prop] = this.#schema[prop];
        } else {
          throw new Error("Property Doesn't exist");
        }
      });
    }
  }
}

module.exports = Props;
