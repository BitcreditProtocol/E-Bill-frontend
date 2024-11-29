import { useState, useEffect } from "react";
import { isPWA } from "@/utils";

type ActionResult<T> = T;

interface ActionFunction<T> {
  (): Promise<ActionResult<T>>;
}

class EnvironmentAwareAction<BrowserResult, PWAResult> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static instances: Map<string, EnvironmentAwareAction<any, any>> =
    new Map();

  private constructor(
    private browserAction: ActionFunction<BrowserResult>,
    private pwaAction: ActionFunction<PWAResult>,
    private identifier: string
  ) {}

  public static getInstance<B, P>(
    browserAction: ActionFunction<B>,
    pwaAction: ActionFunction<P>,
    identifier: string
  ): EnvironmentAwareAction<B, P> {
    if (!this.instances.has(identifier)) {
      const instance = new EnvironmentAwareAction(
        browserAction,
        pwaAction,
        identifier
      );
      this.instances.set(identifier, instance);
    }
    return this.instances.get(identifier) as EnvironmentAwareAction<B, P>;
  }

  public async performAction(): Promise<
    ActionResult<BrowserResult | PWAResult>
  > {
    if (isPWA()) {
      return await this.pwaAction();
    } else {
      return await this.browserAction();
    }
  }
}

export function useEnvironmentAwareAction<BrowserResult, PWAResult>(
  browserAction: ActionFunction<BrowserResult>,
  pwaAction: ActionFunction<PWAResult>,
  identifier: string
) {
  const [result, setResult] = useState<ActionResult<
    BrowserResult | PWAResult
  > | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const action = EnvironmentAwareAction.getInstance(
        browserAction,
        pwaAction,
        identifier
      );

      return await action.performAction();
    };

    setIsLoading(true);
    fetchData().then((data) => {
      setResult(data);
    }).catch((err: unknown) => {
      setError(
        err instanceof Error ? err : new Error("Error: " + (typeof err === "string" ? err : "Unknown Error"))
      );
    }).finally(() => {
      setIsLoading(false);
    })
  }, [browserAction, pwaAction, identifier]);

  return { result, error, isLoading };
}
