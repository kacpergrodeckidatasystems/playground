// assets/js/csvLoader.js - Ładowanie i parsowanie plików CSV w locie

export async function loadCSV(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Nie udało się pobrać pliku: ${filePath}`);
    
    const text = await response.text();
    const lines = text.trim().split('\n');
    if (lines.length === 0) return [];

    // Pierwsza linia to nagłówki kolumn
    const headers = lines[0].split(',').map(h => h.trim());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(',').map(val => val.trim());
      if (currentLine.length !== headers.length) continue;

      const obj = {};
      headers.forEach((header, index) => {
        let val = currentLine[index];
        // Automatyczna konwersja liczb na typ Number
        if (!isNaN(val) && val !== '') {
          val = Number(val);
        }
        obj[header] = val;
      });
      result.push(obj);
    }

    return result;
  } catch (err) {
    console.error("Błąd parsowania CSV:", err);
    return [];
  }
}