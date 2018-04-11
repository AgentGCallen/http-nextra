declare module "http-nextra" {
    import { Server, ServerResponse, IncomingMessage } from "http";

    export const version: string;

    export class APIServer extends Server {
        public constructor(options?: APIServerOptions);

        public router: Router;

        public acl(name: string, condition?: Function, callback?: Function): this;
        public bind(name: string, condition?: Function, callback?: Function): this;
        public checkout(name: string, condition?: Function, callback?: Function): this;
        public connect(name: string, condition?: Function, callback?: Function): this;
        public copy(name: string, condition?: Function, callback?: Function): this;
        public delete(name: string, condition?: Function, callback?: Function): this;
        public get(name: string, condition?: Function, callback?: Function): this;
        public head(name: string, condition?: Function, callback?: Function): this;
        public link(name: string, condition?: Function, callback?: Function): this;
        public lock(name: string, condition?: Function, callback?: Function): this;
        public merge(name: string, condition?: Function, callback?: Function): this;
        public mkactivity(name: string, condition?: Function, callback?: Function): this;
        public mkcalendar(name: string, condition?: Function, callback?: Function): this;
        public mkcol(name: string, condition?: Function, callback?: Function): this;
        public move(name: string, condition?: Function, callback?: Function): this;
        public notify(name: string, condition?: Function, callback?: Function): this;
        public options(name: string, condition?: Function, callback?: Function): this;
        public patch(name: string, condition?: Function, callback?: Function): this;
        public post(name: string, condition?: Function, callback?: Function): this;
        public propfind(name: string, condition?: Function, callback?: Function): this;
        public proppatch(name: string, condition?: Function, callback?: Function): this;
        public purge(name: string, condition?: Function, callback?: Function): this;
        public put(name: string, condition?: Function, callback?: Function): this;
        public rebind(name: string, condition?: Function, callback?: Function): this;
        public report(name: string, condition?: Function, callback?: Function): this;
        public search(name: string, condition?: Function, callback?: Function): this;
        public subscribe(name: string, condition?: Function, callback?: Function): this;
        public trace(name: string, condition?: Function, callback?: Function): this;
        public unbind(name: string, condition?: Function, callback?: Function): this;
        public unlink(name: string, condition?: Function, callback?: Function): this;
        public unlock(name: string, condition?: Function, callback?: Function): this;
        public unsubscribe(name: string, condition?: Function, callback?: Function): this;
    }

    export class Router {
        public constructor(server: APIServer, path: string);

        public server: APIServer;
        public paths: Array<Router | Piece>;
        public _onAll?: Function;
        public _variable: boolean;
        public path: string;

        public add(name: string, method: string, condition?: Function, callback?: Function): this;
        public isPath(parts: string[], request: Request, response: Response, options?: object): any;
        public runPath(parts: string[], request: Request, response: Response, options?: object): any;

        public acl(name: string, condition?: Function, callback?: Function): this;
        public bind(name: string, condition?: Function, callback?: Function): this;
        public checkout(name: string, condition?: Function, callback?: Function): this;
        public connect(name: string, condition?: Function, callback?: Function): this;
        public copy(name: string, condition?: Function, callback?: Function): this;
        public delete(name: string, condition?: Function, callback?: Function): this;
        public get(name: string, condition?: Function, callback?: Function): this;
        public head(name: string, condition?: Function, callback?: Function): this;
        public link(name: string, condition?: Function, callback?: Function): this;
        public lock(name: string, condition?: Function, callback?: Function): this;
        public merge(name: string, condition?: Function, callback?: Function): this;
        public mkactivity(name: string, condition?: Function, callback?: Function): this;
        public mkcalendar(name: string, condition?: Function, callback?: Function): this;
        public mkcol(name: string, condition?: Function, callback?: Function): this;
        public move(name: string, condition?: Function, callback?: Function): this;
        public notify(name: string, condition?: Function, callback?: Function): this;
        public options(name: string, condition?: Function, callback?: Function): this;
        public patch(name: string, condition?: Function, callback?: Function): this;
        public post(name: string, condition?: Function, callback?: Function): this;
        public propfind(name: string, condition?: Function, callback?: Function): this;
        public proppatch(name: string, condition?: Function, callback?: Function): this;
        public purge(name: string, condition?: Function, callback?: Function): this;
        public put(name: string, condition?: Function, callback?: Function): this;
        public rebind(name: string, condition?: Function, callback?: Function): this;
        public report(name: string, condition?: Function, callback?: Function): this;
        public search(name: string, condition?: Function, callback?: Function): this;
        public subscribe(name: string, condition?: Function, callback?: Function): this;
        public trace(name: string, condition?: Function, callback?: Function): this;
        public unbind(name: string, condition?: Function, callback?: Function): this;
        public unlink(name: string, condition?: Function, callback?: Function): this;
        public unlock(name: string, condition?: Function, callback?: Function): this;
        public unsubscribe(name: string, condition?: Function, callback?: Function): this;
    }

    export class Piece {
        public constructor(router: Router, name: string, method: string, condition?: Function, callback: Function);

        public type: string;
        public _variable: boolean;
        public name: string;
        public method: string;
        public _condition?: Function;
        public _callback: Function;

        public run(request: Request, response: Response, options?: object);
        public isPath(parts: string[], request: Request, response: Response, options?: object);
    }

    export class Response extends ServerResponse {
        public json(data: any[] | object): this;
        public statusCode(code: number): this;
        public set(field: string | object, value?: string | string[]): this;
        public get(field: string): string | number | string[];
        public type(type: string): this;
        public send(body: string | number | boolean | object | Buffer): this;
    }

    export class Request extends IncomingMessage {
        public get query(): object;
        public get path(): string;
        public get(name: string): string | string[];
    }

    export const constants: object;

    export function json(req: Request): Promise<boolean>;

    export function cors(req: Request, res: Response): boolean;

    export class Util {
        public static setCharset(type: string, charset: string): object;
    }

    export type APIServerOptions = {
        requestListener?: Function;
        middlewares?: Function[];
    };
}
