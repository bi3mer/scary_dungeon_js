// currently watch is broken on bun. I don't know why. 

// https://dev.to/jsmccrumb/asynchronous-setinterval-4j69
const asyncIntervals = [];

const runAsyncInterval = async (cb, interval, intervalIndex) => {
  await cb();
  if (asyncIntervals[intervalIndex]) {
    setTimeout(() => runAsyncInterval(cb, interval, intervalIndex), interval);
  }
};

const setAsyncInterval = (cb, interval) => {
  if (cb && typeof cb === "function") {
    const intervalIndex = asyncIntervals.length;
    asyncIntervals.push(true);
    runAsyncInterval(cb, interval, intervalIndex);
    return intervalIndex;
  } else {
    throw new Error('Callback must be a function');
  }
};

async function build() {
  let res = await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './dist'
  });

  if (res.logs.length !== 0) {
    var lines = process.stdout.getWindowSize()[1];
    for (var i = 0; i < lines; i++) {
      console.log('\r\n');
    }

    console.log();
    console.log();
    for (let l of res.logs) {
      console.log(l);
    }
  }
}

setAsyncInterval(build, 750);
