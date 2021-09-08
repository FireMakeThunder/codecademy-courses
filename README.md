# codecademy-courses
The collection of my Codecademy projects organized by course

### How I merged my old repos into this monorepo
I had 7 different repositories on Github for some of the projects I had done for the Codecademy Full Stack Engineer course. Since I was newer with Git, having seperate repos didn't seem too problematic until I realized they made my Github profile look cluttered. So I sought a method to merge these into one repo. Here is how I did it.

## These instructions should be called starting at the root of your monorepo directory
1. Create a temporary folder for the repo to merge into your monorepo\
\
  `$ mkdir -p tmp/merging-repo`
> Use `mkdir -p` to create all the directories. This is faster than having to call `mkdir tmp` and then `mkdir tmp/merging-repo` and is used if you haven't yet created the _tmp_ directory
<br/>

2. Clone your repo into the temporary folder\
\
  `$ git clone link-to-merging-repo tmp/merging-repo`
<br/>

3. Move into your temporary folder\
\
  `$ cd tmp/merging-repo`
<br/>

4. Use [git-filter-repo](https://github.com/newren/git-filter-repo) to mutate the commits to all apply to a subdirectory\
\
  `$ git-filter-repo --to-subdirectory-filter merging-repo`
> _If you haven't before, you will need to install this script._\
> This script tool will also move all the files in your merging-repo folder into a directory called, in this case, "merging-repo"
<br/>

5. Move into your monorepo folder\
\
  `$ cd ../../`
<br/>

6. Add a remote link to your merging repo\
\
  `$ git remote add -f merging-repo tmp/merging-repo`
> `-f` is the same as calling `git fetch merging-repo` after this command is entered
<br/>

7. Merge your merging repo into your monorepo\
\
  `$ git merge --allow-unrelated-histories merging-repo/main`
> If your monorepo already has a commit history, then `--allow-unrelated-histories` will likely be required
<br/>

8. Clean up\
\
```
  $ git remote rm merging-repo
  $ rm -rf tmp
```
