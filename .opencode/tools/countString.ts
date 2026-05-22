import { tool } from "@opencode-ai/plugin";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

export default tool({
  description: "Count lines of code in components and warn if too large (>150 lines)",
  args: {},
  async execute(_args, context) {
    const componentsDir = join(context.worktree, "src/components");
    const files = readdirSync(componentsDir)
      .filter((f) => /\.(tsx?|jsx?)$/.test(f))
      .sort();

    const rows: { name: string; loc: number }[] = [];
    const warnings: string[] = [];

    for (const file of files) {
      const content = readFileSync(join(componentsDir, file), "utf-8");
      const loc = content.split("\n").length;
      const name = file.replace(/\.(tsx?|jsx?)$/, "");
      rows.push({ name, loc });
      if (loc > 150) {
        warnings.push(`⚠️  ${name} (${loc} стр.) — КОМПОНЕНТ СЛИШКОМ БОЛЬШОЙ (>150)`);
      }
    }

    const nameMax = Math.max(...rows.map((r) => r.name.length), "Компонент".length);

    const pad = (s: string, n: number) => s.padEnd(n);
    const header = `${pad("Компонент", nameMax)}  Строки`;
    const sep = "─".repeat(nameMax + 8);
    const body = rows.map((r) => `${pad(r.name, nameMax)}  ${String(r.loc).padStart(5)}`).join("\n");

    return [header, sep, body, sep, ...warnings].join("\n");
  },
});
