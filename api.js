const cors = require('cors');
const express = require('express');
const fs = require('fs');
const glob = require('glob');

const app = express();
const port = 3000;

const getFile = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      const json = getFileName(file);
      err
        ? reject(err)
        : resolve({
            file: json,
            data: JSON.parse(data)
          });
    });
  });
};

const getFileName = file => {
  var startIndex =
    file.indexOf('\\') >= 0 ? file.lastIndexOf('\\') : file.lastIndexOf('/');
  var filename = file.substring(startIndex);
  if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
    filename = filename.substring(1);
  }
  return filename;
};

app.use(cors());

app.use('/api/getPages', (req, res) => {
  try {
    let pages = [];

    return new Promise((resolve, reject) => {
      glob('JSON/config/*.json', (err, files) => {
        err
          ? reject(err)
          : resolve(Promise.all(files.map(file => getFile(file))));
      });
    }).then(json => res.json(json));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error in retrieving pages');
  }
});

app.use('/api/getData/:json', (req, res) => {
  try {
    return getFile(`JSON/data/${req.params.json}`).then(data => res.json(data));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error in retrieving page data');
  }
});

app.use('*', (req, res) => {
  res.status(403).send('Invalid access...');
});

app.listen(port, () => {
  console.log(`app server listening on port: ${port}`);
});
