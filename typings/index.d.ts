declare module "http-nextra" {
    import { Server, ServerResponse, IncomingMessage } from "http";

    export const version: string;

    export class APIServer extends Server {
        public constructor(options?: APIServerOptions);

        public router: Router;

        public acl<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public bind<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public checkout<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public connect<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public copy<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public delete<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public get<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public head<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public link<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public lock<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public merge<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public mkactivity<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public mkcalendar<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public mkcol<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public move<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public notify<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public options<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public patch<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public post<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public propfind<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public proppatch<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public purge<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public put<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public rebind<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public report<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public search<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public subscribe<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public trace<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public unbind<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public unlink<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public unlock<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public unsubscribe<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
    }

    export class Router {
        public constructor(server: APIServer, path: string);

        public server: APIServer;
        public paths: Array<Router | Piece>;
        private _onAll?: Function;
        private _variable: boolean;
        public path: string;

        public add<T = {}>(name: string, method: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public isPath(parts: string[], request: Request, response: Response, options?: object): any;
        public runPath(parts: string[], request: Request, response: Response, options?: object): any;

        public acl<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public bind<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public checkout<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public connect<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public copy<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public delete<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public get<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public head<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public link<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public lock<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public merge<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public mkactivity<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public mkcalendar<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public mkcol<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public move<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public notify<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public options<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public patch<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public post<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public propfind<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public proppatch<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public purge<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public put<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public rebind<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public report<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public search<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public subscribe<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public trace<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public unbind<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public unlink<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public unlock<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
        public unsubscribe<T = {}>(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
    }

    export class Piece {
        public constructor(router: Router, name: string, method: string, condition?: Function, callback: Function);

        public type: string;
        public _variable: boolean;
        public name: string;
        public method: string;
        private _condition?: Function;
        private _callback: Function;

        public run(request: Request, response: Response, options?: object);
        public isPath(parts: string[], request: Request, response: Response, options?: object);
    }

    export class Response extends ServerResponse {
        public json(data: any[] | object): this;
        public status(code: number): this;
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
        requestListener?: APIServerOptionsFunctions;
        middlewares?: APIServerOptionsFunctions[];
    };

    export type MethodsHandler<T = { [x: string]: string; }> = (req: Request, res: Response, params?: T) => any;
    export type APIServerOptionsFunctions = (req: Request, res: Response) => any;               

}
