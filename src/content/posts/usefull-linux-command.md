---
title: Useful unix/linux commands
summary: how to split a large file and send it right away to your cloud data warehouse
date: '2025-09-26'
published: true
---

unix (and linux, of course) systems are widely used in data engineering. there are a lot of nice tools to deal with large files.  
let's see what `split`, `xargs` and `gzip` can do for you.

## less is more

```bash
split -C 100M -d -a 3 large_file.tsv chuck_
ls chuck_* | xargs -I {} -P 4 sh -c 'gzip {}'
gsutil -m cp *.gz gs://my-data-bucket/staging/$(date +%Y%m%d)/

```

_the `-m` option is for parallel upload, otherwise, you can use `&&` operator after the `gzip` command._

## explanation

### split

what is happening here, we split a large file into smaller chunks of 100MB each.

1. `-C` will divide the file into _x_ chunks of the specified size (100MB in this case). the magic here is that it will not break a line in half, so you will always have complete lines in each chunk. that's very important when dealing with csv/tsv files and the big difference with `-b` option.
2. by default, `split` will create files with names like `xaa`, `xab`, etc. the `-d` option will use numeric suffixes instead.
3. the `-a 3` option specifies that the suffix length should be 3 digits, giving you up to 1000 chunks (from `chuck_000` to `chuck_999`).
4. `large_file.tsv` is the input file you want to split.
5. `chuck_` is the prefix for the output files.

easy.

### xargs

let's dive into some parallel processing with `xargs`. it's a bit complex, but very powerful.

1. `ls chuck_*` lists all the files that start with `chuck_`. we might point `gz` files here but you get the idea.
2. `|`, the pipe operator should be your old friend, i won't explain it here.
3. `xargs -I {}` tells `xargs` to replace `{}` (you can use any character but this is a standard use) with each item from the input list (the files listed by `ls`).
4. `-P 4` specifies that up to 4 processes should run in parallel. you can adjust this number based on your CPU cores and system capabilities. so be careful not to overload your system.

### gzip

finally, we have the `gzip` command inside a `sh -c` call, which will execute a shell command for each file.  
`gzip {}` compresses each file, replacing the original file with a compressed version (e.g., `chuck_000` becomes `chuck_000.gz`).  
this algorithm is very efficient for text files, especially large ones, as it can significantly reduce their size. it is not the most efficient compression algorithm out there, but it is fast and widely supported, specially by cloud data warehouses.
