# donmccurdy-photos

To do:
- [x] ~~style gallery view~~
- [x] ~~deployment copies _all_ files~~
- [x] ~~use a license other than CC0~~
- [x] ~~style detail view~~
- [x] ~~swap in original photos where possible~~
- [x] ~~name photos where possible~~
- [ ] display camera + settings

Resources:
- https://macwright.org/2019/02/28/photos.html
- https://github.com/tmcw/bespoke

Setup:

```shell
npm install
npm run build
npm run deploy

# Cloud Storage configuration (first time only)
npm run acl
npm run cors
```

Adding photos:

1. Add "Creator" and "Title to each photo in Lightroom, then export.
2. Add photos to `src/` folder.
3. Run `npm run build` to generate optimized versions and `media.json`.
4. Run `npm run deploy` to push to Cloud Storage. 
    - At last attempt, I had to force `gsutil` to use Python 2.7:
    - `export CLOUDSDK_PYTHON=/usr/bin/python2.7`
    - See: https://github.com/GoogleCloudPlatform/gsutil/issues/961
5. Deploy blog.
