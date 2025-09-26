---
title: Useful unix/linux commands
summary: how to split a large file and send it right away to your cloud data warehouse
date: '2025-09-26'
published: false
---

unix (and linux, of course) systems are widely used in data engineering, and sometimes you have to deal with large files.  
before loading them to your cloud data warehouse (snowflake, bigquery, redshift, etc.), you should process them a bit. it's about money, so read on.

## less is more

is it quite obvious that dealing with a big file is tedious.  
it's like stacking logs on a winter's day. you have to think about logs, not the piles. and don't forget your gloves, your big boots and your merlin to chop wood !

unix commands, like `split`, `xargs`, and `gzip`, are my tools when i work in my forest, i mean my office.  
so, i haven't invented anything new, `split` command have been around since forever (1973), `xargs` in the late 70s, and `gzip` in the early 90s. yes, you're young.

## the art of splitting logs

logs are too big, split them !  
here is a fake file with 100,000 users. nearly 9MB. it is already small but whatever.

```bash
ls -lh
.rw-r--r--@ 8.8M simon 25 Sep 23:59 users_100k.tsv

```

### in lines

you can split the file into chunks of 10,000 lines each. here is how to do it:

```bash
split -l 10000 users_100k.tsv users_chunk_
```

the option `-l` means lines, then you select your file, and finally the prefix for the output files.  
the suffix will be `aa`, `ab`, `ac`, etc. by default. or you can pass `-d -a 3` for numeric suffixes with 3 digits - `000`, `001`, `002`, etc. i'll use this instead.  
the result ?

```bash
.rw-r--r--@ 867k simon 26 Sep 11:08 󰡯 users_chunk_000
.rw-r--r--@ 878k simon 26 Sep 11:08 󰡯 users_chunk_001
[...]
.rw-r--r--@ 878k simon 26 Sep 11:08 󰡯 users_chunk_009
.rw-r--r--@   90 simon 26 Sep 11:08 󰡯 users_chunk_010
```
