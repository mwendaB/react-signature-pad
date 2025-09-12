export const dataURLToBlob = (dataURL: string): Blob => {
  const parts = dataURL.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const uInt8Array = new Uint8Array(raw.length);
  
  for (let i = 0; i < raw.length; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  
  return new Blob([uInt8Array], { type: contentType });
};

export const downloadDataURL = (dataURL: string, filename: string): void => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataURL;
  link.click();
};

export const dataURLToFile = (dataURL: string, filename: string): File => {
  const blob = dataURLToBlob(dataURL);
  return new File([blob], filename, { type: blob.type });
};

export const uploadDataURL = async (
  dataURL: string, 
  url: string, 
  fieldName: string = 'signature'
): Promise<Response> => {
  const formData = new FormData();
  const file = dataURLToFile(dataURL, 'signature.png');
  formData.append(fieldName, file);
  
  return fetch(url, {
    method: 'POST',
    body: formData
  });
};