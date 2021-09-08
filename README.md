# codecademy-courses
The collection of my Codecademy projects organized by course

## How I merged my old repos into this repo

### These instructions are begin within your monorepo directory
1. Create a temporary folder for the repo to merge into your monorepo
```mkdir -p tmp/merging-repo```
> use `mkdir -p` to create all the directories. This is faster than having to call `mkdir tmp` and then `mkdir tmp/merging-repo` and is used if you haven't yet created the _tmp_ directory

2. Clone your repo into the temporary folder
```git clone link-to-merging-repo tmp/merging-repo```

3. Move into your temporary folder
```cd tmp/merging-repo```

4. Use [text link with title](https://github.com/newren/git-filter-repo git-filter-repo) to mutate the commits to all apply to a subdirectory
```git-filter-repo --to-subdirectory-filter merging-repo```
> This will move everything within the merging repo into a directory called, in this case, "merging-repo"

5. Move into your monorepo folder
```cd ../../```

6. Add a remote link to your merging repo
```git remote add -f merging-repo tmp/merging-repo```
> `-f` is the same as calling `git fetch merging-repo` after this command is entered

7. Merge your merging repo into your monorepo
```git merge --allow-unrelated-histories merging-repo/main```
> If your monorepo already has a commit history, then `--allow-unrelated-histories` will likely be required

8. Clean up
```
git remote rm merging-repo```
rm -rf tmp
```
