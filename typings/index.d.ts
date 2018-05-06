declare module "http-nextra" {
    import { Server as HTTPServer, ServerResponse, IncomingMessage } from "http";
    import { UrlWithParsedQuery } from "url";

    export const version: string;

    export class Server extends HTTPServer {
        public constructor(options?: APIServerOptions);

        public router: Router;
        public middlewares: MiddlewareFunction[];
        public Request: Request;
        public Response: Response;
        public onError: Function;

        public use(fn: MiddlewareFunction): this;
        public _handler(req: Request, res: Request): void;

        public static _handleMiddleware(middlewares: MiddlewareFunction[], req: Request, res: Response): Promise<any>;

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
        public constructor(router: Router, name: string, method: string, condition?: MethodsHandler, callback: MethodsHandler);

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
        public req: Request;

        public server: APIServer;
        public req: Request;

        public json(data: any[] | object): this;
        public status(code: number): this;
        public set(field: string | object, value?: string | string[]): this;
        public get(field: string): string | number | string[];
        public type(type: string): this;
        public send(body: any): this;
        public location(url: string): this;
        public redirect(url: string): this;
    }

    export class Request extends IncomingMessage {
        public res: Response;

        public server: APIServer;
        public res: Response;

        public readonly get _parsedUrl(): UrlWithParsedQuery;
        public readonly get query(): object;
        public readonly get path(): string;
        public get(name: string): string | string[];
    }

    export const constants: object;

    export function json(req: Request): Promise<boolean>;

    export type APIServerOptions = {
        request?: Request;
        response?: Response;
        onError?: Function;
    };

    export type MethodsHandler<T = { [x: string]: string; }> = (req: Request, res: Response, params?: T) => any;
    export type MiddlewareFunction = (req: Request, res: Response) => any;
}
