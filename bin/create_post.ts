import { datetime } from "https://deno.land/x/ptera@v1.0.2/mod.ts";

const date = datetime(new Date()).toISO()
const frontMatter =`---
title:
date: "${date}"
description:
published: false
---
`

const fileName = `content/posts/${date}.md`

Deno.writeTextFile(fileName, frontMatter)

console.log(`Created ${fileName}`)
