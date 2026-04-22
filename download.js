import https from 'https';
import fs from 'fs';

async function downloadFile(id, dest) {
  const url = `https://drive.google.com/uc?export=download&id=${id}`;
  
  return new Promise((resolve, reject) => {
    function get(currentUrl, onResponse) {
      https.get(currentUrl, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          get(res.headers.location, onResponse);
        } else {
          onResponse(res);
        }
      }).on('error', reject);
    }

    get(url, (res) => {
      handleResponse(res);

      function handleResponse(response) {
        if (response.headers['content-type']?.includes('text/html')) {
          let html = '';
          response.on('data', chunk => html += chunk);
          response.on('end', () => {
            const match = html.match(/confirm=([0-9A-Za-z_]+)/);
            if (match) {
              const confirmToken = match[1];
              const confirmUrl = `https://drive.google.com/uc?export=download&id=${id}&confirm=${confirmToken}`;
              get(confirmUrl, (finalRes) => {
                 finalPipe(finalRes);
              });
            } else {
              reject(new Error('Could not find confirmation token in HTML response. HTML type: ' + response.headers['content-type']));
            }
          });
        } else {
          finalPipe(response);
        }
      }

      function finalPipe(finalResponse) {
        if (finalResponse.statusCode !== 200) {
          reject(new Error('Final status code: ' + finalResponse.statusCode));
          return;
        }
        const file = fs.createWriteStream(dest);
        finalResponse.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
        file.on('error', reject);
      }
    });
  });
}

const fileId = '10Py2OhYlcUejugir2Fd0ZpOYNTP-PNqC';
const destination = 'public/background.mp4';

if (!fs.existsSync('public')) fs.mkdirSync('public');

console.log('Starting legacy download fix...');
downloadFile(fileId, destination)
  .then(() => {
    const stats = fs.statSync(destination);
    console.log(`Download successful. Size: ${stats.size} bytes`);
  })
  .catch(err => {
    console.error('Download failed:', err.message);
    process.exit(1);
  });
