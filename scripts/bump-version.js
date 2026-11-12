#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const pushIndex = args.indexOf("--push");
const shouldPush = pushIndex !== -1;
if (shouldPush) args.splice(pushIndex, 1);

const bump = args[0] ?? "patch";
const validBump =
  /^(patch|minor|major|prepatch|preminor|premajor|prerelease|\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?)$/;

if (!validBump.test(bump)) {
  console.error("Usage: npm run bump -- <patch|minor|major|x.y.z> [--push]");
  process.exit(1);
}

const gitStatus = execFileSync("git", ["status", "--porcelain"], {
  encoding: "utf8",
});
if (gitStatus.trim()) {
  console.error(
    "Working tree is dirty. Commit or stash your changes before bumping the version.",
  );
  process.exit(1);
}

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
execFileSync(npm, ["version", bump, "--message", "chore: release v%s"], {
  stdio: "inherit",
});

const { version } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

console.log(
  `\nBumped package.json and package-lock.json to v${version} and created tag v${version}.`,
);

if (shouldPush) {
  execFileSync("git", ["push", "origin", "HEAD", `v${version}`], {
    stdio: "inherit",
  });
  console.log(`Pushed the current branch and tag v${version}.`);
} else {
  console.log(`Push with: git push origin HEAD v${version}`);
}
