
const cache = {};

const TTL = 60 * 1000;

function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;
  const entry = cache[key];

  if (entry) {
    const age = Date.now() - entry.createdAt;
    if (age < TTL) {
      res.set('X-Cache', 'HIT');
      return res.json(entry.data);
    }
    delete cache[key];
  }

  res.set('X-Cache', 'MISS');

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    cache[key] = { data: body, createdAt: Date.now() };
    return originalJson(body);
  };

  next();
}
function invalidateCache() {
  for (const key in cache) {
    delete cache[key];
  }
}

module.exports = { cacheMiddleware, invalidateCache };