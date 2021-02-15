const CronJob = require("cron").CronJob;

const removeDir = require("../utils/removeDir");

const pathToMovies = process.cwd() + "/Movies";

const job = new CronJob(
  "3 0 * * *", // Tous les jours a 03:00
  () => {
    removeDir(pathToMovies);
    console.log("Movies have been autodeleted");
  },
  null,
  true,
  "Europe/Paris",
);

console.log("AUTODELETE JOB STARTED");

module.exports = job;
