const { createServer } = require('http');

class express {
    constructor() {
        this.routers = {
            get: [],
            post: [],
            all: []
        }
    }

    handleAddRouter(path, handle) {
        let router = {}
        if (typeof path === 'string') {
            router = {
                path,
                handle
            }
        } else {
            router = {
                path: '/',
                handle: path
            }
        }

        return router;
    }

    get(path, handle) {
        const router = this.handleAddRouter(path, handle)
        this.routers.get.push(router)
    }

    post(path, handle) {
        const router = this.handleAddRouter(path, handle);
        this.routers.post.push(router);
    }

    use(path, handle) {
        const router = this.handleAddRouter(path, handle);
        this.routers.all.push(router);
    }

    search(method, url) {
        const matchList = [];
        [...this.routers[method], ...this.routers.all].forEach(item => {
            (item.path === '/' || item.path === url) && matchList.push(item.handle);
        });
        return matchList;
    }

    handle(req, res, matchList) {
        const next = () => {
            const middleware = matchList.shift();
            if (middleware) {
                middleware(req, res, next);
            }
        };
        next();
    }

    cb() {
        return (req, res) => {
            const method = req.method.toLowerCase();
            const url = req.url;
            const matchList = this.search(method, url);
            this.handle(req, res, matchList);
        };
    }
    listen(...args) {
        createServer(this.cb()).listen(...args)
    }
}

module.exports = express;