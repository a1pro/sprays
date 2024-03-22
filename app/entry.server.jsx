import {PassThrough} from 'stream';
import {RemixServer} from '@remix-run/react';
import {renderToPipeableStream} from 'react-dom/server';
import {Head} from './root';
import {renderHeadToString} from 'remix-island';

const ABORT_DELAY = 5000;
const COMMON_HEAD = `
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
`;

export default function handleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext,
) {
    return new Promise((resolve, reject) => {
        let didError = false;

        const {pipe, abort} = renderToPipeableStream(
            <RemixServer context={remixContext} url={request.url}/>,
            {
                onShellReady() {
                    const head = renderHeadToString({request, remixContext, Head});
                    const body = new PassThrough();

                    responseHeaders.set('Content-Type', 'text/html');

                    resolve(
                        new Response(body, {
                            headers: responseHeaders,
                            status: didError ? 500 : responseStatusCode,
                        }),
                    );

                    body.write(
                        `<!DOCTYPE html><html lang="en"><head>${COMMON_HEAD}${head}</head><body><div id="root">`,
                    );
                    pipe(body);
                    body.write(`</div></body></html>`);
                },
                onShellError(err) {
                    reject(err);
                },
                onError(error) {
                    didError = true;

                    console.error(error);
                },
            },
        );

        setTimeout(abort, ABORT_DELAY);
    });
}