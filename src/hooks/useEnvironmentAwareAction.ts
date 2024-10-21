import { useState, useEffect } from "react";
import { isPWA } from "@/utils";

type ActionResult<T> = T;

interface ActionFunction<T> {
  (): Promise<ActionResult<T>>;
}

class EnvironmentAwareAction<BrowserResult, PWAResult> {
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

  private isPWA(): boolean {
    return isPWA();
  }

  public async performAction(): Promise<
    ActionResult<BrowserResult | PWAResult>
  > {
    if (this.isPWA()) {
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
      setIsLoading(true);

      try {
        const action = EnvironmentAwareAction.getInstance(
          browserAction,
          pwaAction,
          identifier
        );

        const data = await action.performAction();
        setResult(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Error: " + err!.toString())
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [browserAction, pwaAction, identifier]);

  return { result, error, isLoading };
}
