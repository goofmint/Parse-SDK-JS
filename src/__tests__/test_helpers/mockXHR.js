/**
 * Mock an XMLHttpRequest by pre-defining the statuses and results that it
 * return.
 * `results` is an array of objects of the form:
 *   { status: ..., response: ... }
 * where status is a HTTP status number and result is a JSON object to pass
 * alongside it.
 * `upload` can be provided to mock the XMLHttpRequest.upload property.
 */
function mockXHR(results, options = {}) {
  const XHR = function () {};
  let attempts = 0;
  const headers = {};
  XHR.prototype = {
    open: function () {},
    setRequestHeader: jest.fn((key, value) => {
      headers[key] = value;
    }),
    getRequestHeader: function (key) {
      return headers[key];
    },
    upload: function () {},
    send: function () {
      this.status = results[attempts].status;
      this.responseText = JSON.stringify(results[attempts].response || {});
      this.readyState = 4;
      attempts++;
      this.onreadystatechange();

      if (typeof this.onprogress === 'function') {
        this.onprogress(options.progress);
      }

      if (typeof this.upload.onprogress === 'function') {
        this.upload.onprogress(options.progress);
      }
    },
  };
  return XHR;
}

// module.exports = mockXHR;
export default mockXHR;
