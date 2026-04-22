import https from 'https';
https.get('https://drive.google.com/uc?export=download&confirm=t&id=10Py2OhYlcUejugir2Fd0ZpOYNTP-PNqC', (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
      console.log('Redirect location:', res.headers.location);
      https.get(res.headers.location, (res2) => {
          console.log('Redirect status:', res2.statusCode);
          console.log('Redirect headers:', res2.headers);
      })
  }
});
