// CloudFront Function (cloudfront-js-2.0), viewer-request event, distribution E2D6WU9O27QFEQ.
// Serves each prerendered page from its own file and permanently redirects non-canonical URLs.
// Unknown paths are passed through as `<path>.html`; S3 then returns 403/404, which the
// distribution's custom error responses turn into /404.html with HTTP status 404.

var CANONICAL_HOST = 'ujasper.ca';

// Retired URLs → current canonical paths. Keep in sync with the redirects in src/router/index.ts.
var REDIRECTS = {
  '/teachers': '/join/teachers',
  '/students': '/join/students',
  '/index': '/'
};

function queryString(querystring) {
  var parts = [];
  for (var key in querystring) {
    var param = querystring[key];
    var values = param.multiValue ? param.multiValue : [param];
    for (var i = 0; i < values.length; i++) {
      parts.push(values[i].value === '' ? key : key + '=' + values[i].value);
    }
  }
  return parts.length ? '?' + parts.join('&') : '';
}

function redirect(location) {
  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: {
      location: { value: location },
      'cache-control': { value: 'public, max-age=3600' }
    }
  };
}

function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var host = request.headers.host ? request.headers.host.value : CANONICAL_HOST;
  var query = queryString(request.querystring || {});

  if (host !== CANONICAL_HOST) {
    return redirect('https://' + CANONICAL_HOST + uri + query);
  }

  // /support/ → /support
  if (uri.length > 1 && uri.charAt(uri.length - 1) === '/') {
    var trimmed = uri.replace(/\/+$/, '') || '/';
    return redirect((REDIRECTS[trimmed] || trimmed) + query);
  }

  // Legacy /vision.html → /vision. The 404 page itself is internal and stays reachable.
  if (uri.slice(-5) === '.html' && uri !== '/404.html') {
    var clean = uri.slice(0, -5);
    return redirect((REDIRECTS[clean] || clean) + query);
  }

  if (REDIRECTS[uri]) {
    return redirect(REDIRECTS[uri] + query);
  }

  var lastSegment = uri.substring(uri.lastIndexOf('/') + 1);
  if (uri === '/') {
    request.uri = '/index.html';
  } else if (lastSegment.indexOf('.') === -1) {
    request.uri = uri + '.html';
  }
  return request;
}
