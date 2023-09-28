import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

function ErrorResponseBody(error: {
  status?: React.Key;
  statusText?: React.Key;
  data?: React.Key;
}) {
  return (
    <html lang="zh">
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    </html>
  );
}
function ErrorBody({ error }: { error: Error }) {
  return (
    <html lang="zh">
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    </html>
  );
}

export function ErrorBoundary(): JSX.Element {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <ErrorResponseBody {...error} />;
  } else if (error instanceof Error) {
    return <ErrorBody error={error} />;
  } else {
    return <h1>unknown</h1>;
  }
}
