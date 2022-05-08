export default class Controller {
  constructor(output, input) {
    this.out = output;
    this.in = input;
  }

  get activeKeys() { return this.out.activKeys; }

  down(e, key, system = true) {
    const { type } = key.option;
    if (type === 'caps') {
      if (key.isActive()) {
        key.active(false);
        this.out.capsLock = false;
        return null;
      }
      key.active();
      this.out.capsLock = true;
      return null;
    }
    if (!system && type === 'sys') {
      if (key.isActive()) {
        key.active(false);
        this.out[key.value] = false;
        return null;
      }
      key.active();
      this.out[key.value] = true;
      if (this.out.localSet.includes(key.code)
      && this.out.getKey(this.out.localSet[0]).isActive()
      && this.out.getKey(this.out.localSet[1]).isActive()
      ) {
        this.out.local = this.out.local === 'en' ? 'ru' : 'en';
      }
      return null;
    }
    if (this.activeKeys.has(key)) {
      return null;
    }
    if (type === 'sys') {
      key.active();
      this.out[key.value] = true;
      if (this.out.localSet.includes(key.code)
          && this.out.getKey(this.out.localSet[0]).isActive()
          && this.out.getKey(this.out.localSet[1]).isActive()
      ) {
        this.out.local = this.out.local === 'en' ? 'ru' : 'en';
      }
      return null;
    }
    if (type === 'key' && this.out.isActiveSys()) {
      key.active();
      return null;
    }
    key.active();
    return { type, code: key.option.code, value: key.value };
  }

  up(e, key, system = true) {
    const { type } = key.option;
    if (type === 'caps') return 1;
    if (!system && type === 'sys') return 2;
    this.activeKeys.delete(key);
    key.active(false);
    if (type === 'sys') this.out[key.value] = false;
    return null;
  }

  push(type, code, value) {
    const event = new CustomEvent('v-key', { detail: { type, code, value } });
    this.in.dispatchEvent(event);
  }
}
