const store = {};
const AsyncStorage = {
  getItem: jest.fn((key) => Promise.resolve(store[key] ?? null)),
  setItem: jest.fn((key, value) => { store[key] = value; return Promise.resolve(); }),
  removeItem: jest.fn((key) => { delete store[key]; return Promise.resolve(); }),
};
// Support both ESM default import and CJS require
module.exports = AsyncStorage;
module.exports.default = AsyncStorage;
module.exports.__esModule = true;
