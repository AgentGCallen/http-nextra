const cluster = require("cluster");

if (cluster.isMaster) {
    console.log(`[0] Master process started`);

    for (let i = 0; i < require("os").cpus().length; i++) cluster.fork();

    cluster.on("online", worker => console.log(`[${worker.id}] Worker process started`));

    cluster.on("exit", (worker, code, signal) => {
        console.log(`[${worker.id}] Worker process died with code ${code} sending ${signal} signal. Spawning new worker...`);
        cluster.fork();
    });
} else {
    require("./server");
}
