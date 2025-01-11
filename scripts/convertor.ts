// Author: Rohan Vashisht
// I used this to convert all flowbite svgs to marko

import { readdir } from "node:fs/promises";
import { join } from "node:path";
import type { BunFile } from "bun";

// Folders to check
const baseOutline = "src/outline";
const baseOutlineOutputAsMarkoFolder = "src2/outline";
const baseSolid = "src/solid";
const baseSolidOutputAsMarkoFolder2 = "src2/solid";

function convertSvgToMarko(input_text: string): string {
  // The first 4 chars are gonna be <svg
  let splitted = input_text.split("\n");
  splitted[0] = '<svg xmlns="http://www.w3.org/2000/svg" ...input>';
  const joined = splitted.join("\n");
  return joined;
}

// Read outline SVGs
const outlineFolders = await readdir(baseOutline);
const solidFolders = await readdir(baseSolid);

for (const folder of outlineFolders) {
  const files = await readdir(join(baseOutline, folder));
  for (const file of files) {
    if (file.endsWith(".svg")) {
      const path = `${baseOutline}/${folder}/${file}`;
      const file_res: BunFile = Bun.file(path);
      const text = await file_res.text();
      const marko_js_string = convertSvgToMarko(text);
      const output_path = `${baseOutlineOutputAsMarkoFolder}/${folder}/${file}`;
      Bun.write(output_path.replace(".svg", ".marko"), marko_js_string);
    }
  }
}

// Read solid SVGs

for (const folder of solidFolders) {
  const files = await readdir(join(baseSolid, folder));
  for (const file of files) {
    if (file.endsWith(".svg")) {
      const path = `${baseSolid}/${folder}/${file}`;
      const file_res: BunFile = Bun.file(path);
      const text = await file_res.text();
      const marko_js_string = convertSvgToMarko(text);
      const output_path = `${baseSolidOutputAsMarkoFolder2}/${folder}/${file}`;
      Bun.write(output_path.replace(".svg", ".marko"), marko_js_string);
    }
  }
}
