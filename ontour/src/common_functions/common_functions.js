export function base64ImgToBlob(base64String) {
    const parts = base64String.split(';base64,');
    if (!parts[0].startsWith('data:')) {
      throw new Error('Invalid base64 string format');
    }
    const contentType = parts[0].split(':')[1];
    const buffer = Buffer.from(parts[1], 'base64');
    const blob = new Blob([buffer], { type: contentType });
    return blob;
  }
  