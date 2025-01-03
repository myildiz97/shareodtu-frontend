function base64ToFile(base64String: string, fileName: string): File {
  // Base64 stringindeki "data:image/jpeg;base64," gibi prefixleri kaldır
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');

  // Base64 stringini binary veriye çevir
  const byteCharacters = atob(base64Data);
  const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);

  // Binary veriden bir File objesi oluştur
  return new File([byteArray], fileName, { type: 'image/jpeg' });
}