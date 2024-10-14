/* global localStorage */

const StorageController = {
  async: 0,

  getItem(path: string): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(path);
  },

  setItem(path: string, value: string) {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(path, value);
    } catch (e) {
      // Quota exceeded, possibly due to Safari Private Browsing mode
      console.log(e.message);
    }
  },

  removeItem(path: string) {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(path);
  },

  getAllKeys() {
    if (typeof localStorage === 'undefined') return [];
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      keys.push(localStorage.key(i) as string);
    }
    return keys;
  },

  clear() {
    if (typeof localStorage === 'undefined') return;
    localStorage.clear();
  },
};

// module.exports = StorageController;
export default StorageController;
