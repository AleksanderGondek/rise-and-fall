import { Color, DisplayMode, Engine, Loader } from "excalibur";
import { Promise as DumbPromise } from "excalibur";

import * as TE from 'fp-ts/lib/TaskEither';


const civilizeDumbPromise = function<T>(rp: DumbPromise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    rp.then(
      value => resolve(value),
      rejectReason => reject(rejectReason)
    );
  });
};

export const createDisplayEngine = function(): TE.TaskEither<unknown, Engine> {
  return TE.tryCatch(
    () => {
      try {
        return Promise.resolve(
          new Engine({
            displayMode: DisplayMode.FullScreen,
            backgroundColor: Color.fromRGB(0,0,0,1)
          })
        );
      }
      catch(error) {
        return Promise.reject(error);
      }
    },
    rejectionReason => new Error(String(rejectionReason))
  );
};

export const startDisplayEngine = function(
  displayEngine: Engine,
  assetLoader: Loader
  ): TE.TaskEither<unknown, any> {
    const displayEngineStartedPromise: Promise<any> = civilizeDumbPromise(
      displayEngine.start(assetLoader)
    );

    return TE.tryCatch(
      () => displayEngineStartedPromise,
      rejectionReason => new Error(String(rejectionReason))
    );
};
