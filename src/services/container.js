class Container {
  constructor() {
    this._services = new Map();
    this._singletons = new Map();
  }

  register(name, definition, dependencies) {
    this._services.set(name, {
      definition: definition,
      dependencies: dependencies,
    });
  }

  get(name) {
    const c = this._services.get(name);

    if (this._isClass(c.definition)) {
      return this._createInstance(c);
    } else {
      return c.definition;
    }
  }

  _getResolvedDependencies(service) {
    let classDependencies = [];
    if (service.dependencies) {
      classDependencies = service.dependencies.map((dep) => {
        return this.get(dep);
      });
    }
    return classDependencies;
  }

  _createInstance(service) {
    return new service.definition(...this._getResolvedDependencies(service));
  }

  _isClass(definition) {
    return typeof definition === "function";
  }
}

const container = new Container();

module.exports = container;
