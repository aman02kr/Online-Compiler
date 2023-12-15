
const axios = require('axios');

const apiUrl = 'https://judge0-ce.p.rapidapi.com';

// Function to submit code for compilation and execution with input
async function submitCode(code, languageId, input) {
  const data = {
    source_code: code,
    language_id: languageId,
    stdin: input, // Input for the code
  };

  const headers = {
    'Content-Type': 'application/json',
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    'X-RapidAPI-Key':  process.env.JUDGE_KEY,
  };

  try {
    const response = await axios.post(`${apiUrl}/submissions?base64_encoded=false`, data, { headers });

    if (response.data && response.data.token) {
      return response.data.token;
    } else {
      throw new Error('Invalid response format from Judge0 API');
    }
  } catch (error) {
    console.error('Error submitting code to Judge0 API:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Function to get the result of a submission with a delay
async function getSubmissionResultWithDelay(submissionToken, delayMs) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'X-RapidAPI-Key':  process.env.JUDGE_KEY,
        };

        const response = await axios.get(`${apiUrl}/submissions/${submissionToken}?base64_encoded=false`, { headers });

        if (response.data) {
          resolve(response.data);
        } else {
          throw new Error('Invalid response format from Judge0 API');
        }
      } catch (error) {
        console.error('Error getting submission result from Judge0 API:', error.response ? error.response.data : error.message);
        reject(error);
      }
    }, delayMs);
  });
}

function getLanguageId(language) {
    switch (language) {
        case 'c':
          return 50;
        case 'cpp':
          return 54;
        case 'java':
          return 62;
        case 'py':
          return 71;
        case 'rb':
          return 72;
        case 'cs':
          return 51;
        case 'js':
          return 63;
        case 'go':
          return 60;
        case 'php':
          return 68;
        case 'rs':
          return 73;
        case 'ts':
          return 74;
       
        default:
          // Default to some value or handle the case when the extension is not recognized
          return -1;
      }
    }

module.exports={ submitCode,getLanguageId,getSubmissionResultWithDelay};