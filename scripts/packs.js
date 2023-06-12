import * as fs from "node:fs";
import * as path from "node:path";
import { execa } from "execa";

const targets = ["packages"];
const errors = [];

if (!fs.existsSync(path.resolve(process.cwd(), "tarballs"))) {
  fs.mkdirSync(path.resolve(process.cwd(), "tarballs"));
}

/**
 * Load directory/file data.
 * @param {string} directoryOrFile Directory or file path.
 * @return {Promise<void>}
 */
async function load(directoryOrFile) {
  const stat = await fs.promises.stat(directoryOrFile);
  if (
    stat.isDirectory() &&
    fs.statSync(path.resolve(directoryOrFile, "package.json")).isFile()
  ) {
    directoryOrFile = path.resolve(directoryOrFile, "package.json");

    const resolvedJson = await fs.promises
      .readFile(directoryOrFile, {
        encoding: "utf8",
      })
      .catch((r) => ({ err: r.message }))
      .then((r) => JSON.parse(r));
    if (resolvedJson.err) {
      errors.push({
        name: path.basename(directoryOrFile),
        error: resolvedJson.err,
      });
    } else {
      const mainPath = resolvedJson.main;
      if (fs.existsSync(path.resolve(directoryOrFile, "..", "dist"))) {
        resolvedJson.main = "./dist/index.js";
      }

      fs.writeFileSync(directoryOrFile, JSON.stringify(resolvedJson, 0, 2));
      try {
        await execa(
          "npm",
          [
            "pack",
            path.resolve(directoryOrFile, ".."),
            "--pack-destination",
            path.resolve(process.cwd(), "tarballs"),
          ],
          {
            stderr: "inherit",
            stdout: "ignore",
          }
        );
      } catch (e) {
        errors.push({ name: directoryOrFile, error: e });
      }


      resolvedJson.main = mainPath;
      fs.writeFileSync(directoryOrFile, JSON.stringify(resolvedJson, 0, 2));
      return 1;
    }
  }
}

targets.forEach(async (targetDir) => {
  const folders = await fs.promises.readdir(
    path.resolve(process.cwd(), targetDir)
  );

  await Promise.all(
    folders.map((folder) =>
      load(path.resolve(process.cwd(), targetDir, folder))
    )
  );

  console.clear();
  if (errors.length) {
    console.table(errors);
  } else {
    console.log("No errors. Yeay!");
  }
});
