function generateInputs() {
    const length = document.getElementById('length').value;
    let inputFields = '';
    for (let i = 0; i < length; i++) {
      inputFields += `<input type="text" id="letter${i}" maxlength="1">`;
    }
    document.getElementById('inputFields').innerHTML = inputFields;
  }
  
  async function solve() {
    const length = document.getElementById('length').value;
    let query = '';
    for (let i = 0; i < length; i++) {
      const letter = document.getElementById(`letter${i}`).value || '?';
      query += letter;
    }
    const response = await fetch(`https://api.datamuse.com/words?sp=${query}&md=dp`);
    const data = await response.json();
    let results = '<h2>Results:</h2>';
  
    if (data.length === 0) {
      results += '<p>No words found.</p>';
    } else {
      results += '<table><thead><tr><th>Word</th><th>Part of Speech</th><th>Definition</th></tr></thead><tbody>';
      for (const word of data) {
        const partOfSpeech = word.tags && word.tags[0] ? word.tags[0] : 'N/A';
        const definition = word.defs && word.defs[0] ? word.defs[0].split('\t')[1] : 'N/A';
        results += `<tr><td>${word.word}</td><td>${partOfSpeech}</td><td>${definition}</td></tr>`;
      }
      results += '</tbody></table>';
    }
  
    document.getElementById('results').innerHTML = results;
  }
  